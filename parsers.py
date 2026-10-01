"""Small standard-library parsers for private source-library formats."""
import base64
import html
import io
import json
from pathlib import Path
import re
import subprocess
import sys
import urllib.parse
from xml.etree import ElementTree as ET
from zipfile import ZipFile
import zlib

EXTRA_FORMATS={'.xmind','.drawio','.xlsx','.wps','.js','.java','.form'}

def plain(value):
    return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',str(value or '')))).strip()

def read_text(path):
    raw=Path(path).read_bytes()
    for encoding in ('utf-8-sig','gb18030','utf-16'):
        try:return raw.decode(encoding)
        except UnicodeError:pass
    return raw.decode('utf-8','replace')

def xmind_text(path):
    with ZipFile(path) as archive:
        if 'content.json' not in archive.namelist():raise ValueError('旧版 XMind 暂无可用 JSON 内容')
        sheets=json.loads(archive.read('content.json'))
    lines=[]
    def visit(topic,depth=0):
        if not isinstance(topic,dict):return
        title=plain(topic.get('title'))
        if title:lines.append('  '*depth+title)
        notes=topic.get('notes') or {}
        if isinstance(notes,dict):
            for value in notes.values():
                if isinstance(value,dict):value=value.get('content','')
                note=plain(value)
                if note:lines.append('  '*(depth+1)+note)
        children=topic.get('children') or {}
        if isinstance(children,dict):
            for branch in children.values():
                if isinstance(branch,list):
                    for item in branch:visit(item,depth+1)
    for sheet in sheets if isinstance(sheets,list) else [sheets]:
        name=plain(sheet.get('title'))
        if name:lines.append('# '+name)
        visit(sheet.get('rootTopic'))
    return '\n'.join(lines)

def drawio_text(path):
    root=ET.parse(path).getroot()
    lines=[]
    for diagram in root.iter('diagram'):
        name=plain(diagram.get('name'))
        if name:lines.append('# '+name)
        if list(diagram):content=diagram
        else:
            packed=base64.b64decode((diagram.text or '').strip())
            content=ET.fromstring(urllib.parse.unquote(zlib.decompress(packed,-15).decode('utf-8','replace')))
        for cell in content.iter():
            value=plain(cell.get('value'))
            if value:lines.append(value)
    return '\n'.join(lines)

def xlsx_text(path,passwords=()):
    with Path(path).open('rb') as source:
        encrypted=source.read(8)==bytes.fromhex('d0cf11e0a1b11ae1')
    spreadsheet=path
    if encrypted:
        dependency_dir=Path(__file__).resolve().parent/'private-data'/'deps'
        if dependency_dir.exists() and str(dependency_dir) not in sys.path:sys.path.insert(0,str(dependency_dir))
        try:import msoffcrypto
        except ImportError as error:
            raise ValueError('加密 Excel 需要 msoffcrypto-tool；请安装到 private-data/deps') from error
        spreadsheet=None
        for password in passwords:
            try:
                with Path(path).open('rb') as source:
                    office=msoffcrypto.OfficeFile(source)
                    office.load_key(password=password,verify_password=True)
                    data=io.BytesIO();office.decrypt(data)
                data.seek(0);spreadsheet=data;break
            except (ValueError,RuntimeError,KeyError):pass
        if spreadsheet is None:raise ValueError('加密 Excel 未在附近密码说明中找到可用密码')
    ns='{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
    lines=[]
    with ZipFile(spreadsheet) as archive:
        names=archive.namelist()
        shared=[]
        if 'xl/sharedStrings.xml' in names:
            root=ET.fromstring(archive.read('xl/sharedStrings.xml'))
            shared=[''.join(t.text or '' for t in item.iter(ns+'t')) for item in root.findall(ns+'si')]
        for name in sorted(n for n in names if re.fullmatch(r'xl/worksheets/sheet\d+\.xml',n)):
            lines.append('# '+name.rsplit('/',1)[-1])
            root=ET.fromstring(archive.read(name))
            for row in root.iter(ns+'row'):
                cells=[]
                for cell in row.findall(ns+'c'):
                    value=cell.find(ns+'v')
                    text=value.text if value is not None and value.text is not None else ''
                    if cell.get('t')=='s' and text.isdigit() and int(text)<len(shared):text=shared[int(text)]
                    if cell.get('t')=='inlineStr':text=''.join(n.text or '' for n in cell.iter(ns+'t'))
                    if text:cells.append((cell.get('r') or '')+' '+text)
                if cells:lines.append(' | '.join(cells))
    return '\n'.join(lines)

def parse_special(path,passwords=()):
    path=Path(path);extension=path.suffix.lower()
    if extension in {'.js','.java','.form'}:return read_text(path)
    if extension=='.xmind':return xmind_text(path)
    if extension=='.drawio':return drawio_text(path)
    if extension=='.xlsx':return xlsx_text(path,passwords)
    if extension=='.wps':
        result=subprocess.run(['textutil','-convert','txt','-stdout',str(path)],stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=90)
        if result.returncode:raise RuntimeError(result.stderr.decode('utf-8','replace')[:300])
        return result.stdout.decode('utf-8','replace')
    raise ValueError('暂不支持该格式')
