#!/usr/bin/env python3
"""Expose DOCX embedded pictures as private local-reader items for OCR and viewing."""
import argparse
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile

import server

LIMIT=128*1024*1024

def import_embedded(root):
    root=Path(root).resolve();manifest={};stats={'documents':0,'images':0,'bytes':0,'errors':[]}
    sources=[(path.relative_to(root).as_posix(),path) for path in root.rglob('*.docx')]
    archive_manifest=server.PROFILE/'archive-manifest.json'
    if archive_manifest.exists():
        archive_catalog=json.loads(archive_manifest.read_text(encoding='utf-8'))
        if archive_catalog.get('source_root')==str(root):
            for ident,stored in archive_catalog.get('files',{}).items():
                path=(server.PROFILE/stored).resolve()
                try:path.relative_to((server.PROFILE/'archive-extracted').resolve())
                except ValueError:continue
                if path.is_file() and path.suffix.lower()=='.docx':sources.append((ident,path))
    for rel,path in sorted(sources):
        digest=hashlib.sha256(rel.encode()).hexdigest()[:24]
        stats['documents']+=1
        try:
            with ZipFile(path) as archive:
                for info in archive.infolist():
                    name=Path(info.filename)
                    if info.is_dir() or info.file_size>LIMIT or not info.filename.startswith('word/media/') or name.suffix.lower() not in server.IMAGES:continue
                    if '..' in name.parts:continue
                    stored=Path('embedded-extracted')/digest/name.name
                    target=server.PROFILE/stored;target.parent.mkdir(parents=True,exist_ok=True)
                    data=archive.read(info)
                    if not target.exists() or target.read_bytes()!=data:target.write_bytes(data)
                    manifest[rel+'!/'+info.filename]=stored.as_posix()
                    stats['images']+=1;stats['bytes']+=len(data)
        except Exception as error:stats['errors'].append({'document':rel,'error':str(error)[:200]})
    (server.PROFILE/'embedded-manifest.json').write_text(json.dumps({'source_root':str(root),'files':manifest},ensure_ascii=False,indent=2),encoding='utf-8')
    (server.PROFILE/'embedded-import-report.json').write_text(json.dumps(stats,ensure_ascii=False,indent=2),encoding='utf-8')
    return stats

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--library',required=True)
    args=parser.parse_args()
    print(import_embedded(args.library))
