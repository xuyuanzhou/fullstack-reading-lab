#!/usr/bin/env python3
"""Local-only reader for a separately owned document library. Standard library server."""
import argparse
from functools import lru_cache
import hashlib
import html
import json
import mimetypes
import os
import pathlib
import re
import shutil
import sqlite3
import subprocess
import tempfile
import threading
import time
import unicodedata
import urllib.parse
import webbrowser
import zipfile
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from xml.etree import ElementTree as ET
from audit_rules import scan as scan_audit
from parsers import EXTRA_FORMATS, parse_special

HERE = pathlib.Path(__file__).resolve().parent
IMAGES = {'.png','.jpg','.jpeg','.webp'}
SUPPORTED = {'.pdf','.docx','.doc','.md','.txt'} | IMAGES | EXTRA_FORMATS
PROFILE = HERE / 'private-data'
PROFILE.mkdir(exist_ok=True)
DB = PROFILE / 'index.sqlite3'
MAX_READ = 4_000_000
lock = threading.Lock()

def safe_text(value):
    return ''.join(c for c in value if c == '\n' or c == '\t' or ord(c) >= 32)

def docx_text(path):
    with zipfile.ZipFile(path) as archive:
        xml=archive.read('word/document.xml')
    decoded=xml.decode('utf-8','replace')
    def legal_reference(match):
        value=match.group(1)
        code=int(value[1:],16) if value.lower().startswith('x') else int(value)
        valid=code in (9,10,13) or 32<=code<=0xD7FF or 0xE000<=code<=0xFFFD or 0x10000<=code<=0x10FFFF
        return match.group(0) if valid else ''
    decoded=re.sub(r'&#(x[0-9a-fA-F]+|[0-9]+);',legal_reference,decoded)
    decoded=re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]','',decoded)
    root=ET.fromstring(decoded)
    ns='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
    blocks=[]
    for p in root.iter(ns+'p'):
        parts=[]
        for el in p.iter():
            if el.tag==ns+'t' and el.text: parts.append(el.text)
            elif el.tag==ns+'tab': parts.append('\t')
            elif el.tag==ns+'br': parts.append('\n')
        if parts: blocks.append(''.join(parts))
    return '\n'.join(blocks)

def run(args,timeout=90):
    p=subprocess.run(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=timeout)
    if p.returncode: raise RuntimeError(p.stderr.decode('utf-8','replace')[:300] or '转换失败')
    return p.stdout.decode('utf-8','replace')

def password_candidates(path):
    """Read nearby password notes at runtime; never copy their contents to the project."""
    candidates=[]
    stem=path.stem
    if '密码：' in stem or '密码:' in stem:
        candidates.append(re.split(r'密码[:：]',stem,1)[1].strip())
    boundary=LIB.root if LIB is not None else path.parent
    folder=path.parent
    while True:
        for note in folder.glob('*密码*.txt'):
            try:
                lines=note.read_text(encoding='utf-8-sig',errors='replace').splitlines()
            except OSError:
                continue
            ranked=[]
            for line in lines:
                if not re.search(r'[:：]',line):continue
                label,value=re.split(r'[:：]',line,1)
                value=value.strip()
                if not value:continue
                label=label.strip()
                if label.lower().endswith('.pdf'):label=label[:-4]
                score=2 if label==stem else 1 if label in stem or label in str(path.parent) else 0
                ranked.append((score,value))
            candidates.extend(value for _,value in sorted(ranked,key=lambda item:-item[0]))
        if folder==boundary or folder==folder.parent or boundary not in folder.parents:break
        folder=folder.parent
    return list(dict.fromkeys(c for c in candidates if c))

@lru_cache(maxsize=512)
def pdf_access(path):
    """Return password and page count, caching only in this process's memory."""
    try:
        info=run(['pdfinfo',str(path)],20)
        password=None
    except RuntimeError as original:
        info=None;password=None
        for candidate in password_candidates(path):
            try:
                info=run(['pdfinfo','-upw',candidate,str(path)],20)
                password=candidate
                break
            except RuntimeError:pass
        if info is None:raise RuntimeError('PDF 需要密码；未在附近密码说明中找到可用密码') from original
    match=re.search(r'^Pages:\s+(\d+)',info,re.M)
    return password,int(match.group(1)) if match else 1

def render_pdf_page(path,page):
    password,total=pdf_access(path)
    if page<1 or page>total:raise ValueError('页码超出范围')
    with tempfile.TemporaryDirectory() as directory:
        prefix=pathlib.Path(directory)/'page'
        args=['pdftoppm','-f',str(page),'-l',str(page),'-scale-to','2400','-png','-singlefile']
        if password is not None:args.extend(['-upw',password])
        completed=subprocess.run(args+[str(path),str(prefix)],stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=60)
        if completed.returncode:raise RuntimeError('PDF 页面渲染失败，请检查 Poppler 与文件完整性')
        return prefix.with_suffix('.png').read_bytes()

def ocr_bytes(png):
    if not shutil.which('tesseract'):raise RuntimeError('复制图片文字需要安装 Tesseract OCR')
    tessdata=PROFILE/'tessdata'
    if (tessdata/'chi_sim.traineddata').exists():
        language=['--tessdata-dir',str(tessdata),'-l','chi_sim']
    elif (PROFILE/'chi_sim.traineddata').exists():
        language=['--tessdata-dir',str(PROFILE),'-l','chi_sim']
    else:
        available=run(['tesseract','--list-langs'],20)
        if 'chi_sim' not in available:raise RuntimeError('复制中文图片文字需要 Tesseract 的 chi_sim 语言包')
        language=['-l','chi_sim+eng']
    with tempfile.TemporaryDirectory() as directory:
        file=pathlib.Path(directory)/'input.png';file.write_bytes(png)
        return run(['tesseract',str(file),'stdout']+language,60)

@lru_cache(maxsize=64)
def ocr_page(path,page,mtime):
    if path.suffix.lower()=='.pdf':return ocr_bytes(render_pdf_page(path,page))
    if path.suffix.lower() in IMAGES:
        # Tesseract reads PNG reliably; image formats are converted by pdftoppm only for PDF.
        return ocr_file(path)
    raise ValueError('此格式不支持图片 OCR')

def ocr_file(path):
    if not shutil.which('tesseract'):raise RuntimeError('复制图片文字需要安装 Tesseract OCR')
    tessdata=PROFILE/'tessdata'
    if (tessdata/'chi_sim.traineddata').exists():language=['--tessdata-dir',str(tessdata),'-l','chi_sim']
    elif (PROFILE/'chi_sim.traineddata').exists():language=['--tessdata-dir',str(PROFILE),'-l','chi_sim']
    else:
        available=run(['tesseract','--list-langs'],20)
        if 'chi_sim' not in available:raise RuntimeError('复制中文图片文字需要 Tesseract 的 chi_sim 语言包')
        language=['-l','chi_sim+eng']
    try:
        from PIL import Image
    except ImportError:
        return run(['tesseract',str(path),'stdout']+language,60)
    with Image.open(path) as image:
        width,height=image.size
        if width<=4000 and height<=4000:
            return run(['tesseract',str(path),'stdout']+language,60)
        # Long mind maps can exceed Tesseract's practical single-image limit.
        # OCR tiles at native resolution while /api/media keeps the original bytes.
        parts=[]
        with tempfile.TemporaryDirectory() as directory:
            for top in range(0,height,3800):
                for left in range(0,width,3800):
                    tile=pathlib.Path(directory)/('tile-%d-%d.png'%(top,left))
                    image.crop((left,top,min(left+3800,width),min(top+3800,height))).save(tile)
                    parts.append(run(['tesseract',str(tile),'stdout']+language,60))
        return '\n'.join(parts)

def extract(path,page=1):
    ext=path.suffix.lower()
    if ext in EXTRA_FORMATS:return parse_special(path,password_candidates(path))
    if ext=='.pdf':
        # Single-page extraction keeps reading responsive even for large books.
        password,_=pdf_access(path)
        args=['pdftotext','-layout','-f',str(page),'-l',str(page)]
        if password is not None:args.extend(['-upw',password])
        return run(args+[str(path),'-'],45)
    if ext in IMAGES:return ocr_page(path,1,path.stat().st_mtime)
    if ext=='.docx':return docx_text(path)
    if ext=='.doc':
        if shutil.which('textutil'):return run(['textutil','-convert','txt','-stdout',str(path)],45)
        office=shutil.which('soffice') or shutil.which('libreoffice')
        if office:
            with tempfile.TemporaryDirectory() as out:
                run([office,'--headless','--convert-to','txt:Text','--outdir',out,str(path)],90)
                return (pathlib.Path(out)/(path.stem+'.txt')).read_text(errors='replace')
        raise RuntimeError('读取 .doc 需要 macOS textutil 或 LibreOffice')
    if ext in {'.md','.txt'}:
        raw=path.read_bytes()[:MAX_READ]
        for encoding in ('utf-8-sig','gb18030','utf-16'):
            try:return raw.decode(encoding)
            except UnicodeError:pass
        return raw.decode('utf-8','replace')
    raise ValueError('暂不支持直接阅读该格式')

def page_count(path):
    if path.suffix.lower()!='.pdf':return 1
    try:
        return pdf_access(path)[1]
    except Exception:return 1

JAVA_SUBJECTS=(
    ('MySQL',('mysql',)),
    ('Redis',('redis','memcache')),
    ('JVM',('jvm','垃圾回收')),
    ('并发',('并发','多线程','juc')),
    ('Spring Cloud',('springcloud','spring-cloud','微服务')),
    ('Spring Boot',('springboot','spring-boot')),
    ('Spring MVC',('springmvc','spring-mvc')),
    ('MyBatis',('mybatis',)),
    ('Spring',('spring',)),
    ('消息队列',('kafka','rabbitmq','rabbit','activemq','消息队列','消息中间件')),
    ('Dubbo',('dubbo',)),
    ('ZooKeeper',('zookeeper',)),
    ('Elasticsearch',('elasticsearch','elastic')),
    ('MongoDB',('mongodb',)),
    ('容器与部署',('docker','k8s','kubernetes','nginx','tomcat')),
    ('网络',('netty','网络')),
    ('算法',('算法','leetcode','数据结构')),
    ('设计模式',('设计模式',)),
    ('综合八股',('面试题集合','五百篇')),
    ('集合',('集合',)),
    ('Java 基础',('java基础',)),
    ('操作系统',('linux','操作系统','git')),
    ('Hive',('hive',)),
    ('Spark',('spark','sparksql','sparkstreaming','sparkcore','sparkmllib')),
    ('Flink',('flink',)),
    ('Hadoop',('hadoop','hdfs','mapreduce')),
    ('HBase',('hbase',)),
    ('Flume',('flume',)),
    ('Sqoop',('sqoop',)),
    ('Storm',('storm',)),
    ('Scala',('scala',)),
    ('大数据',('大数据',)),
    ('分布式',('分布式','高并发','乐观锁','悲观锁')),
    ('源码',('源码解析','源码')),
    ('计算机基础',('图解','计算机必备')),
    ('正则',('正则',)),
    ('性能',('性能优化','性能')),
    ('面经',('面经','真题')),
    ('数据库',('数据库',)),
    ('J2EE',('j2ee',)),
    ('反射',('反射',)),
    ('场景题',('场景题',)),
    ('HR',('hr',)),
    ('综合八股',('八股文','面试指南','面试突击','面试宝典','面试题集合','五百篇')),
)
FRONTEND_SUBJECTS=(
    ('Vue',('vue',)),
    ('React',('react',)),
    ('TypeScript',('typescript',)),
    ('JavaScript',('javascript','js相关','/js','es6')),
    ('CSS',('css',)),
    ('HTML与浏览器',('html','浏览器','dom','bom')),
    ('工程化',('webpack','vite','工程化','构建','npm')),
    ('Node.js',('node','nodejs')),
    ('网络',('http','网络','tcp')),
    ('性能',('性能',)),
    ('算法',('算法','leetcode','数据结构')),
    ('小程序',('小程序',)),
    ('计算机基础',('图解','计算机必备')),
    ('Git',('git',)),
    ('操作系统',('linux','操作系统')),
    ('设计模式',('设计模式',)),
    ('面经',('面经','真题')),
    ('HR',('hr',)),
    ('综合八股',('八股文','面试宝典','面试题整合')),
)

def library_track(rel):
    s=str(rel).replace('\\','/').lower()
    if s.startswith('java-') or '/java-' in s:return 'java'
    if s.startswith('web前端-') or '/web前端-' in s:return 'frontend'
    return 'common'

def _subject_hit(text,key):
    if any(ord(c)>127 for c in key):return key.lower() in text
    # Allow Vue3 / CSS3 style suffixes, but do not treat "js" as part of "json".
    return re.search(r'(^|[^a-z0-9])'+re.escape(key)+r'($|[^a-z])',text) is not None

def subject(rel):
    """Group a private-library path by topic. More specific topics win over 面经 and 八股文."""
    text=str(rel).replace('\\','/').lower()
    rules=JAVA_SUBJECTS if library_track(text)=='java' else FRONTEND_SUBJECTS
    for name,keys in rules:
        if any(_subject_hit(text,key) for key in keys):return name
    return '其他'

def category(rel):
    s=str(rel).replace('\\','/')
    if s.startswith('Java-') or '/Java-' in s:return 'java'
    if s.startswith('Web前端-') or '/Web前端-' in s:return 'frontend'
    return 'common'

def stage(rel):
    parts=rel.parts
    if len(parts)<2:return '其他'
    second=parts[1]
    if second.startswith('0-'):return '基础'
    if second.startswith('1-'):return '核心知识'
    if second.startswith('2-'):return '场景与项目'
    if second.startswith('3-'):return '算法'
    if second.startswith('4-'):return '面经'
    if second.startswith('5-'):return '进阶与源码'
    return '专题资料'

def presentation(ident,path):
    if str(ident).lower().endswith('.chm'):
        return pathlib.PurePosixPath(str(ident)).stem,'CHM'
    return path.stem,path.suffix.lower()[1:].upper()

def source_url(rel):
    # Links point only to lessons and locally rendered items, never a raw file endpoint.
    return str(rel).replace('\\','/')

def websites_for(ident):
    con=connect()
    try:rows=con.execute('SELECT website FROM source_urls WHERE id=? ORDER BY website',(ident,)).fetchall()
    except sqlite3.OperationalError:rows=[]
    finally:con.close()
    return [row[0] for row in rows]

class Library:
    def __init__(self,root):
        self.root=root.resolve()
        if not self.root.is_dir():raise SystemExit('题库目录不存在：'+str(self.root))
        self.files={}
        self.scan()
    def scan(self):
        self.files.clear()
        for p in self.root.rglob('*'):
            if not p.is_file() or p.suffix.lower() not in SUPPORTED:continue
            if p.suffix.lower()=='.txt' and '密码' in p.stem:continue
            try:
                rel=p.relative_to(self.root)
                if any(x.startswith('.') for x in rel.parts):continue
                ident=source_url(rel)
                self.files[ident]=p
            except ValueError:pass
        for filename,folder in [('archive-manifest.json','archive-extracted'),('embedded-manifest.json','embedded-extracted')]:
            manifest=PROFILE/filename
            if not manifest.exists():continue
            catalog=json.loads(manifest.read_text(encoding='utf-8'))
            for ident,stored in (catalog.get('files',{}) if catalog.get('source_root')==str(self.root) else {}).items():
                path=(PROFILE/stored).resolve()
                try:path.relative_to((PROFILE/folder).resolve())
                except ValueError:continue
                if path.is_file() and path.suffix.lower() in SUPPORTED:self.files[ident]=path
        manifest=PROFILE/'chm-manifest.json'
        if manifest.exists():
            catalog=json.loads(manifest.read_text(encoding='utf-8'))
            if catalog.get('source_root')==str(self.root):
                for item in catalog.get('files') or []:
                    if not isinstance(item,dict) or item.get('status')!='ok' or not item.get('path') or not item.get('text'):continue
                    path=(PROFILE/item['text']).resolve()
                    try:path.relative_to((PROFILE/'chm-extracted').resolve())
                    except ValueError:continue
                    if path.is_file():self.files[item['path']]=path
    def label(self,ident,path):
        if '!/' in ident:return pathlib.PurePosixPath(ident.replace('\\','/'))
        try:return path.relative_to(self.root)
        except ValueError:return pathlib.PurePosixPath(ident)
    def list(self,kind='',query='',limit=120,offset=0,topic=''):
        items=[];q=query.casefold().strip()
        for ident,path in self.files.items():
            rel=self.label(ident,path)
            if kind and category(rel)!=kind:continue
            topic_name=subject(rel)
            if topic and topic_name!=topic:continue
            if q and q not in ident.casefold():continue
            title,fmt=presentation(ident,path)
            items.append({'id':ident,'title':title,'category':category(rel),'stage':stage(rel),'subject':topic_name,'format':fmt,'path':ident,'size':path.stat().st_size})
        items.sort(key=lambda x:(x['category'],x['subject'],x['title'].casefold()))
        return {'total':len(items),'items':items[offset:offset+limit]}
    def subjects(self,kind=''):
        counts={}
        for ident,path in self.files.items():
            rel=self.label(ident,path)
            if kind and category(rel)!=kind:continue
            name=subject(rel)
            counts[name]=counts.get(name,0)+1
        rows=[{'subject':name,'count':count} for name,count in counts.items()]
        rows.sort(key=lambda row:(-row['count'],row['subject']))
        return {'total':sum(counts.values()),'subjects':rows}
    def resolve(self,ident):
        p=self.files.get(ident)
        if p is None:raise FileNotFoundError('未找到资料')
        # Reject symlinks pointing out of the configured library.
        location=p.resolve()
        allowed=[self.root,(PROFILE/'archive-extracted').resolve(),(PROFILE/'embedded-extracted').resolve(),(PROFILE/'chm-extracted').resolve()]
        if not any(location==base or base in location.parents for base in allowed):raise PermissionError('资料位于题库之外')
        return p

LIB=None

def connect():
    con=sqlite3.connect(str(DB),timeout=30)
    con.execute('CREATE VIRTUAL TABLE IF NOT EXISTS docs USING fts5(id UNINDEXED, title, body, tokenize="unicode61")')
    con.execute('CREATE TABLE IF NOT EXISTS indexed(id TEXT PRIMARY KEY, mtime REAL, size INTEGER, status TEXT)')
    return con

def index_one(con,ident,path):
    stat=path.stat();old=con.execute('SELECT mtime,size,status FROM indexed WHERE id=?',(ident,)).fetchone()
    if old and old[:2]==(stat.st_mtime,stat.st_size) and not old[2].startswith('无法索引'):return False
    try:
        if path.suffix.lower()=='.pdf':
            # Bounded for very large books; document title and first 80 pages remain searchable.
            password,total_pages=pdf_access(path)
            pages=min(total_pages,80)
            args=['pdftotext','-layout','-f','1','-l',str(pages)]
            if password is not None:args.extend(['-upw',password])
            body=run(args+[str(path),'-'],90)[:400000]
            status='前80页' if total_pages>80 else '全文'
        else:body=extract(path)[:400000];status='全文' if len(body)<400000 else '前40万字符'
        con.execute('DELETE FROM docs WHERE id=?',(ident,))
        con.execute('INSERT INTO docs(id,title,body) VALUES(?,?,?)',(ident,presentation(ident,path)[0],body))
    except Exception as e:
        status='无法索引：'+str(e)[:100]
    con.execute('INSERT OR REPLACE INTO indexed VALUES(?,?,?,?)',(ident,stat.st_mtime,stat.st_size,status))
    return True

index_state={'running':False,'done':0,'total':0,'error':None}
def build_index():
    global index_state
    with lock:
        if index_state['running']:return
        index_state={'running':True,'done':0,'total':len(LIB.files),'error':None}
    try:
        import import_archives, import_embedded, import_library
        import_archives.import_archives(LIB.root)
        import_embedded.import_embedded(LIB.root)
        LIB.scan()
        result=import_library.import_all(LIB.root,batch_size=200)
        index_state['done']=result['done'];index_state['total']=result['total']
        if result['failed']:index_state['error']=str(result['failed'])+' 份资料导入失败，查看 private-data/index.sqlite3 的 imports 表'
        scan_audit(DB,PROFILE/'audit-candidates.json')
    except Exception as e:index_state['error']=str(e)
    finally:index_state['running']=False

class Handler(BaseHTTPRequestHandler):
    def local_request(self):
        host=self.headers.get('Host','').split(':',1)[0].lower()
        if host not in {'127.0.0.1','localhost'}:return False
        origin=self.headers.get('Origin','')
        if origin:
            parsed=urllib.parse.urlsplit(origin)
            if parsed.hostname not in {'127.0.0.1','localhost'}:return False
        return True
    def send_json(self,data,status=200):
        payload=json.dumps(data,ensure_ascii=False).encode()
        self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Content-Length',str(len(payload)));self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.end_headers();self.wfile.write(payload)
    def error(self,error,status=400):self.send_json({'error':str(error)},status)
    def serve_web(self,path):
        """Serve the React build from web/dist; fall back to legacy root assets."""
        web_root=(HERE/'web'/'dist').resolve()
        name='index.html' if path in {'/','/index.html'} else path.lstrip('/')
        candidates=[]
        if web_root.is_dir():
            candidates.append((web_root/name).resolve())
            if not name.endswith(('.js','.css','.svg','.png','.jpg','.jpeg','.webp','.ico','.map','.woff','.woff2','.ttf')):
                candidates.append((web_root/'index.html').resolve())
        candidates.append((HERE/name).resolve())
        for target in candidates:
            try:
                if web_root.is_dir() and str(target).startswith(str(web_root)):
                    allowed=True
                else:
                    target.relative_to(HERE.resolve());allowed=True
            except ValueError:
                allowed=False
            if not allowed or not target.is_file():
                continue
            data=target.read_bytes()
            mime=mimetypes.guess_type(target.name)[0] or 'application/octet-stream'
            if target.suffix=='.js':mime='text/javascript'
            if target.suffix=='.css':mime='text/css'
            if target.suffix=='.svg':mime='image/svg+xml'
            if target.suffix in {'.html','.js','.css','.svg','.json'}:mime=mime+'; charset=utf-8'
            self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Content-Length',str(len(data)));self.send_header('Cache-Control','no-cache');self.send_header('X-Content-Type-Options','nosniff');self.end_headers();self.wfile.write(data)
            return True
        return False
    def do_GET(self):
        if not self.local_request():return self.error('仅允许本机访问',403)
        url=urllib.parse.urlsplit(self.path);args=urllib.parse.parse_qs(url.query)
        get=lambda k,d='':args.get(k,[d])[0]
        try:
            if url.path=='/api/media':
                p=LIB.resolve(get('id'))
                if p.suffix.lower()=='.pdf':
                    payload=render_pdf_page(p,int(get('page','1')));mime='image/png'
                elif p.suffix.lower() in IMAGES:
                    payload=p.read_bytes();mime=mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
                else:raise ValueError('只支持 PDF 页面或图片原件')
                self.send_response(200);self.send_header('Content-Type',mime);self.send_header('Content-Length',str(len(payload)));self.send_header('Cache-Control','private, no-store');self.send_header('X-Content-Type-Options','nosniff');self.end_headers();self.wfile.write(payload);return
            if url.path=='/api/ocr':
                p=LIB.resolve(get('id'));n=int(get('page','1'))
                return self.send_json({'text':safe_text(ocr_page(p,n,p.stat().st_mtime))})
            if url.path=='/api/parsed':
                ident=get('id');LIB.resolve(ident)
                con=connect()
                try:row=con.execute('SELECT text_path FROM imports WHERE id=? AND status=?',(ident,'ok')).fetchone()
                except sqlite3.OperationalError:row=None
                finally:con.close()
                if not row:raise FileNotFoundError('尚未完成全文导入')
                path=(PROFILE/row[0]).resolve()
                try:path.relative_to(PROFILE.resolve())
                except ValueError:raise PermissionError('全文路径不在本机资料区')
                return self.send_json({'text':path.read_text(encoding='utf-8')})
            if url.path=='/api/subjects':return self.send_json(LIB.subjects(get('category')))
            if url.path=='/api/catalog':return self.send_json(LIB.list(get('category'),get('q'),min(200,max(1,int(get('limit','80')))),max(0,int(get('offset','0'))),get('topic')))
            if url.path=='/api/item':
                ident=get('id');p=LIB.resolve(ident);n=max(1,min(page_count(p),int(get('page','1'))))
                candidate=''
                if p.suffix.lower() in IMAGES:
                    # Show original artwork immediately; OCR is an explicit action.
                    con=connect()
                    try:cached=con.execute('SELECT text_path FROM imports WHERE id=? AND status=?',(ident,'ok')).fetchone()
                    except sqlite3.OperationalError:cached=None
                    row=None if cached else con.execute('SELECT body FROM docs WHERE id=?',(ident,)).fetchone()
                    con.close()
                    text=(PROFILE/cached[0]).read_text(encoding='utf-8') if cached else row[0] if row else ''
                    ocr_error='' if text else '点击“识别页面图片中的文字”后可复制识别结果。'
                    if not text:
                        con=connect()
                        try:review=con.execute('SELECT result FROM ocr_review WHERE id=?',(ident,)).fetchone()
                        except sqlite3.OperationalError:review=None
                        finally:con.close()
                        if review and review[0]=='待人工校对':
                            draft=PROFILE/'ocr-enhanced-candidates'/(hashlib.sha256(ident.encode()).hexdigest()+'.txt')
                            if draft.exists():candidate=draft.read_text(encoding='utf-8')
                            if candidate:ocr_error='以下为增强 OCR 候选稿，未经人工校对。请对照原图，勿直接用于公开课程。'
                else:
                    text=extract(p,n);ocr_error=''
                con=connect()
                try:has_full=bool(con.execute('SELECT 1 FROM imports WHERE id=? AND status=? AND chars>0',(ident,'ok')).fetchone())
                except sqlite3.OperationalError:has_full=False
                finally:con.close()
                title,fmt=presentation(ident,p)
                return self.send_json({'id':ident,'title':title,'text':safe_text(text),'candidateText':safe_text(candidate),'page':n,'pages':page_count(p),'format':fmt,'path':ident,'subject':subject(ident),'empty':not bool(text.strip()),'ocrError':ocr_error,'hasFullText':has_full,'websites':websites_for(ident)})
            if url.path=='/api/stats':
                progress=PROFILE/'import-progress.json'
                con=connect()
                try:imported,empty,failed=con.execute("SELECT sum(status='ok'),sum(status='ok' AND chars=0),sum(status!='ok') FROM imports").fetchone()
                except sqlite3.OperationalError:imported=empty=failed=0
                finally:con.close()
                return self.send_json({'count':len(LIB.files),'index':index_state,'import':json.loads(progress.read_text()) if progress.exists() else None,'imported':imported or 0,'emptyText':empty or 0,'failed':failed or 0})
            if url.path=='/api/audit':
                f=PROFILE/'audit-candidates.json'
                return self.send_json(json.loads(f.read_text()) if f.exists() else {'rules':[],'items':[],'truncated':False})
            if url.path=='/api/search':
                q=get('q').strip()
                if len(q)<2:return self.send_json({'items':[]})
                con=connect()
                # LIKE supports short Chinese substrings; unicode61 FTS would
                # otherwise treat a whole Chinese phrase as one token.
                needle='%'+q.replace('\\','\\\\').replace('%','\\%').replace('_','\\_')+'%'
                category_filter=get('category')
                limit=min(100,max(1,int(get('limit','80'))));offset=max(0,int(get('offset','0')))
                rows=con.execute('SELECT id,title,substr(body,max(1,instr(lower(body),lower(?))-60),140) FROM docs WHERE (title LIKE ? ESCAPE "\\" OR body LIKE ? ESCAPE "\\") AND (?=? OR id LIKE ?) LIMIT ? OFFSET ?',(q,needle,needle,category_filter,'',('Java-%' if category_filter=='java' else 'Web前端-%' if category_filter=='frontend' else '%'),limit+1,offset)).fetchall();con.close()
                return self.send_json({'items':[{'id':a,'title':b,'snippet':c} for a,b,c in rows[:limit]],'hasMore':len(rows)>limit})
            if self.serve_web(url.path):
                return
            self.error('路径不存在',404)
        except FileNotFoundError as e:self.error(e,404)
        except Exception as e:self.error(e,400)
    def do_POST(self):
        if not self.local_request():return self.error('仅允许本机访问',403)
        if self.path=='/api/reindex':
            pdf_access.cache_clear();ocr_page.cache_clear();LIB.scan();threading.Thread(target=build_index,daemon=True).start();self.send_json({'started':True,'total':len(LIB.files)});return
        self.error('路径不存在',404)
    def log_message(self,fmt,*args):pass

if __name__=='__main__':
    parser=argparse.ArgumentParser(description='在浏览器中阅读自己的全栈题库')
    parser.add_argument('--library',default=str(HERE.parent/'全栈面试'/'全栈面试题库'))
    parser.add_argument('--port',type=int,default=4180)
    parser.add_argument('--no-browser',action='store_true')
    opts=parser.parse_args();LIB=Library(pathlib.Path(opts.library))
    server=ThreadingHTTPServer(('127.0.0.1',opts.port),Handler)
    url='http://127.0.0.1:'+str(opts.port)
    print('全栈学习阅读器 '+url+' · 已发现 '+str(len(LIB.files))+' 个可阅读文件',flush=True)
    if not opts.no_browser:threading.Timer(.5,lambda:webbrowser.open(url)).start()
    try:server.serve_forever()
    except KeyboardInterrupt:pass
    finally:server.server_close()
