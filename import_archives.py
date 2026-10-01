#!/usr/bin/env python3
"""Expand supported archive members into Git-ignored private storage, safely."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import subprocess
import tempfile
from zipfile import ZipFile

import server

LIMIT=128*1024*1024

def safe_member(name):
    path=PurePosixPath(name.replace('\\','/'))
    if path.is_absolute() or not path.parts or any(part in {'.','..'} for part in path.parts):return None
    if any(part.startswith('.') for part in path.parts):return None
    if path.suffix.lower() not in server.SUPPORTED or ('密码' in path.stem and path.suffix.lower()=='.txt'):return None
    return path

def members(path):
    if path.suffix.lower()=='.zip':
        with ZipFile(path) as archive:
            for info in archive.infolist():
                if info.is_dir() or info.file_size>LIMIT:continue
                if (info.external_attr>>16)&0o170000==0o120000:continue
                name=safe_member(info.filename)
                if name:yield str(name),archive.read(info)
    else:
        listing=subprocess.run(['bsdtar','-tf',str(path)],stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True,timeout=120)
        for raw in listing.stdout.splitlines():
            candidate=PurePosixPath(raw.decode('utf-8','surrogateescape').replace('\\','/'))
            if candidate.is_absolute() or '..' in candidate.parts:raise ValueError('压缩包包含不安全路径')
        with tempfile.TemporaryDirectory(dir=str(server.PROFILE)) as folder:
            subprocess.run(['bsdtar','-xf',str(path),'-C',folder],check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=180)
            base=Path(folder).resolve()
            for extracted in base.rglob('*'):
                if not extracted.is_file() or extracted.is_symlink():continue
                try:name=extracted.relative_to(base).as_posix();extracted.resolve().relative_to(base)
                except ValueError:continue
                if safe_member(name) and extracted.stat().st_size<=LIMIT:yield name,extracted.read_bytes()

def import_archives(root):
    root=Path(root).resolve();output=server.PROFILE/'archive-extracted';output.mkdir(parents=True,exist_ok=True)
    manifest={};stats={'archives':0,'members':0,'bytes':0,'errors':[]}
    for archive in sorted(p for p in root.rglob('*') if p.suffix.lower() in {'.rar','.zip'}):
        rel=archive.relative_to(root).as_posix();digest=hashlib.sha256(rel.encode()).hexdigest()[:24]
        stats['archives']+=1
        try:
            for name,data in members(archive):
                stored=Path('archive-extracted')/digest/Path(name)
                target=server.PROFILE/stored;target.parent.mkdir(parents=True,exist_ok=True)
                target.write_bytes(data)
                manifest[rel+'!/'+name]=stored.as_posix()
                stats['members']+=1;stats['bytes']+=len(data)
        except Exception as error:stats['errors'].append({'archive':rel,'error':str(error)[:200]})
    (server.PROFILE/'archive-manifest.json').write_text(json.dumps({'source_root':str(root),'files':manifest},ensure_ascii=False,indent=2),encoding='utf-8')
    (server.PROFILE/'archive-import-report.json').write_text(json.dumps(stats,ensure_ascii=False,indent=2),encoding='utf-8')
    return stats

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--library',required=True)
    options=parser.parse_args()
    print(import_archives(options.library))
