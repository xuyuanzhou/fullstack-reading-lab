#!/usr/bin/env python3
"""Privately import complete extractable text; never include output in a public build."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import sqlite3
import time

import server
from library_config import resolve_library
from parsers import read_text

def image_text(path):
    digest=hashlib.sha256(path.read_bytes()).hexdigest()
    cached=server.DB.parent/'ocr-cache'/(digest+'.txt')
    if cached.exists():return cached.read_text(encoding='utf-8')
    try:body=server.ocr_file(path)
    except RuntimeError:
        # Keep the purchased original untouched; repair only a private OCR copy.
        from PIL import Image, ImageFile
        ImageFile.LOAD_TRUNCATED_IMAGES=True
        repaired=server.DB.parent/'ocr-repaired'/(digest+'.png')
        repaired.parent.mkdir(exist_ok=True)
        with Image.open(path) as image:image.convert('RGB').save(repaired)
        body='[原图片文件截断；以下为容错识别，请对照原件核查]\n'+server.ocr_file(repaired)
    cached.parent.mkdir(exist_ok=True)
    cached.write_text(body,encoding='utf-8')
    return body

def complete_text(path,ident,con,image_futures=None):
    ext=path.suffix.lower()
    if ext=='.pdf':
        password,pages=server.pdf_access(path)
        args=['pdftotext','-layout']
        if password is not None:args+=['-upw',password]
        body=server.run(args+[str(path),'-'],600)
        if len(body.strip())<20 and pages<=50:
            body='\n\n'.join(server.ocr_page(path,page,path.stat().st_mtime) for page in range(1,pages+1))
            return body,pages,'OCR 扫描 PDF'
        return body,pages,'PDF 完整文字层'
    if ext in server.IMAGES:
        if image_futures and ident in image_futures:return image_futures[ident].result(),1,'图片 OCR'
        old=con.execute('SELECT body FROM docs WHERE id=?',(ident,)).fetchone()
        if old and old[0].strip():return old[0],1,'已有图片 OCR'
        return (image_futures[ident].result() if image_futures and ident in image_futures else image_text(path)),1,'图片 OCR'
    if ext in {'.md','.txt'}:return read_text(path),1,'完整文本'
    if ext in {'.docx','.doc'}:
        stat=path.stat()
        old_index=con.execute('SELECT mtime,size,status FROM indexed WHERE id=?',(ident,)).fetchone()
        old=con.execute('SELECT body FROM docs WHERE id=?',(ident,)).fetchone()
        if old_index and old_index[:2]==(stat.st_mtime,stat.st_size) and old_index[2]=='全文' and old and old[0].strip():
            return old[0],1,'已有文档文字'
    return server.extract(path),1,'完整文档文字'

def import_all(root,limit=0,ocr_workers=2,batch_size=0,retry_failed=False):
    server.LIB=server.Library(root)
    server.bind_library(root)
    output=server.DB.parent/'parsed'
    output.mkdir(parents=True,exist_ok=True)
    con=server.connect()
    con.execute('CREATE TABLE IF NOT EXISTS imports(id TEXT PRIMARY KEY, mtime REAL, size INTEGER, chars INTEGER, pages INTEGER, method TEXT, status TEXT, text_path TEXT, imported_at REAL)')
    con.commit()
    known=set(server.LIB.files)
    stale=[ident for (ident,) in con.execute('SELECT id FROM imports') if ident not in known]
    for start in range(0,len(stale),400):
        batch=stale[start:start+400];marks=','.join('?' for _ in batch)
        con.execute('DELETE FROM docs WHERE id IN ('+marks+')',batch)
        con.execute('DELETE FROM indexed WHERE id IN ('+marks+')',batch)
        con.execute('DELETE FROM imports WHERE id IN ('+marks+')',batch)
    if stale:con.commit()
    items=[]
    for ident,path in sorted(server.LIB.files.items()):
        try:server.LIB.resolve(ident)
        except (FileNotFoundError,PermissionError):continue
        items.append((ident,path))
    if limit:items=items[:limit]
    if batch_size:
        pending=[]
        for ident,path in items:
            stat=path.stat()
            row=con.execute('SELECT mtime,size,status FROM imports WHERE id=?',(ident,)).fetchone()
            target=output/(hashlib.sha256(ident.encode()).hexdigest()+'.txt')
            fresh=row and row[:2]==(stat.st_mtime,stat.st_size) and row[2]=='ok' and target.exists()
            if fresh:continue
            if row and row[:2]==(stat.st_mtime,stat.st_size) and row[2]!='ok' and not retry_failed:continue
            pending.append((ident,path))
        items=pending[:batch_size]
    pool=ThreadPoolExecutor(max_workers=max(1,ocr_workers))
    image_futures={}
    for ident,path in items:
        if path.suffix.lower() not in server.IMAGES:continue
        stat=path.stat();previous=con.execute('SELECT mtime,size,status FROM imports WHERE id=?',(ident,)).fetchone()
        if previous and previous[:2]==(stat.st_mtime,stat.st_size) and previous[2]=='ok':continue
        image_futures[ident]=pool.submit(image_text,path)
    result={'total':len(items),'done':0,'cached':0,'ok':0,'failed':0,'running':True,'updated':time.time(),'mode':'batch' if batch_size else 'all'}
    progress=server.DB.parent/'import-progress.json'
    def report():
        result['updated']=time.time()
        temporary=progress.with_suffix('.tmp')
        temporary.write_text(json.dumps(result,ensure_ascii=False,indent=2))
        temporary.replace(progress)
    report()
    for ident,path in items:
        stat=path.stat();name=hashlib.sha256(ident.encode()).hexdigest()+'.txt';target=output/name
        previous=con.execute('SELECT mtime,size,status FROM imports WHERE id=?',(ident,)).fetchone()
        if previous and previous[:2]==(stat.st_mtime,stat.st_size) and previous[2]=='ok' and target.exists():
            result['cached']+=1
        else:
            try:
                body,pages,method=complete_text(path,ident,con,image_futures)
                body=server.safe_text(body)
                temporary=target.with_suffix('.tmp')
                temporary.write_text(body,encoding='utf-8')
                temporary.replace(target)
                if con.execute('SELECT 1 FROM indexed WHERE id=?',(ident,)).fetchone():con.execute('DELETE FROM docs WHERE id=?',(ident,))
                con.execute('INSERT INTO docs(id,title,body) VALUES(?,?,?)',(ident,server.presentation(ident,path)[0],body))
                con.execute('INSERT OR REPLACE INTO indexed VALUES(?,?,?,?)',(ident,stat.st_mtime,stat.st_size,'完整导入'))
                con.execute('INSERT OR REPLACE INTO imports VALUES(?,?,?,?,?,?,?,?,?)',(ident,stat.st_mtime,stat.st_size,len(body),pages,method,'ok',str(target.relative_to(server.PROFILE)),time.time()))
                con.commit()
                result['ok']+=1
            except Exception as error:
                con.execute('INSERT OR REPLACE INTO imports VALUES(?,?,?,?,?,?,?,?,?)',(ident,stat.st_mtime,stat.st_size,0,0,'',type(error).__name__+': '+str(error)[:300],'',time.time()))
                con.commit();result['failed']+=1
        result['done']+=1
        if result['done']%10==0 or result['done']==len(items):
            report();print('imported',result['done'],'/',len(items),'ok',result['ok'],'cached',result['cached'],'failed',result['failed'],flush=True)
    pool.shutdown(wait=True)
    result['running']=False;report();con.close()
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser(description='把个人题库完整解析到本项目被 Git 忽略的 private-data/parsed')
    parser.add_argument('--library',default=None,help='省略时读 READING_LAB_LIBRARY 或 config/library.path')
    parser.add_argument('--limit',type=int,default=0,help='只在测试时限制文件数量')
    parser.add_argument('--ocr-workers',type=int,default=2,help='并行识别图片的数量，默认 2')
    parser.add_argument('--batch-size',type=int,default=0,help='按稳定路径顺序只处理下一批未导入文件')
    parser.add_argument('--retry-failed',action='store_true',help='批次模式下重试此前失败的文件')
    args=parser.parse_args()
    print(import_all(resolve_library(args.library),args.limit,args.ocr_workers,args.batch_size,args.retry_failed))
