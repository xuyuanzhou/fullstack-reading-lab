#!/usr/bin/env python3
"""Create private, explicitly unverified OCR candidates in manageable batches."""
import argparse
import hashlib
import json
from pathlib import Path
import sqlite3
import subprocess
import time

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

import server

def candidates(root,con):
    server.LIB=server.Library(root)
    con.execute('CREATE TABLE IF NOT EXISTS ocr_review(id TEXT PRIMARY KEY, result TEXT, candidate_chars INTEGER, reviewed_at REAL)')
    pending=[]
    for ident, in con.execute("SELECT id FROM imports WHERE status='ok' AND chars=0 ORDER BY id"):
        if ident not in server.LIB.files or server.LIB.files[ident].suffix.lower() not in server.IMAGES:continue
        previous=con.execute('SELECT result FROM ocr_review WHERE id=?',(ident,)).fetchone()
        if previous and previous[0]!='需要重新识别':continue
        path=server.LIB.files[ident]
        try:
            with Image.open(path) as image:width,height=image.size
        except Exception:width=height=0
        priority=0 if width>=500 and height>=250 else 1 if width>=200 and height>=100 else 2
        pending.append((priority,ident,path,width,height))
    return sorted(pending,key=lambda item:(item[0],item[1]))

def enhanced_candidate(path):
    digest=hashlib.sha256(path.read_bytes()).hexdigest()
    image_path=server.PROFILE/'ocr-enhanced-images'/(digest+'.png')
    image_path.parent.mkdir(exist_ok=True)
    with Image.open(path) as source:
        image=ImageOps.autocontrast(source.convert('L'),cutoff=1)
        image=ImageEnhance.Contrast(image).enhance(2.1)
        image=image.filter(ImageFilter.UnsharpMask(radius=2,percent=220,threshold=2))
        image.save(image_path)
    tessdata=server.PROFILE/'tessdata'
    if not (tessdata/'chi_sim.traineddata').exists():tessdata=server.PROFILE
    if not (tessdata/'chi_sim.traineddata').exists():raise RuntimeError('缺少 chi_sim 中文 OCR 语言包')
    command=['tesseract',str(image_path),'stdout','--tessdata-dir',str(tessdata),'-l','chi_sim','--psm','6']
    result=subprocess.run(command,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=120)
    if result.returncode:raise RuntimeError(result.stderr.decode('utf-8','replace')[:200])
    return server.safe_text(result.stdout.decode('utf-8','replace'))

def review_batch(root,batch_size):
    con=server.connect();queue=candidates(root,con);selected=queue[:batch_size]
    folder=server.PROFILE/'ocr-enhanced-candidates';folder.mkdir(exist_ok=True)
    report={'remaining_before':len(queue),'selected':len(selected),'candidate':0,'still_empty':0,'failed':0,'items':[]}
    for _,ident,path,width,height in selected:
        try:
            body=enhanced_candidate(path)
            target=folder/(hashlib.sha256(ident.encode()).hexdigest()+'.txt')
            target.write_text(body,encoding='utf-8')
            status='待人工校对' if body.strip() else '增强后仍无文字'
            report['candidate' if body.strip() else 'still_empty']+=1
            con.execute('INSERT OR REPLACE INTO ocr_review VALUES(?,?,?,?)',(ident,status,len(body),time.time()))
            report['items'].append({'id':ident,'width':width,'height':height,'candidate_chars':len(body),'status':status})
        except Exception as error:
            con.execute('INSERT OR REPLACE INTO ocr_review VALUES(?,?,?,?)',(ident,'增强识别失败',0,time.time()))
            report['failed']+=1
            report['items'].append({'id':ident,'width':width,'height':height,'status':'增强识别失败','error':str(error)[:120]})
        con.commit()
        print('reviewed',len(report['items']),'/',len(selected),flush=True)
    report['remaining_after']=len(queue)-len(selected)
    (server.PROFILE/'ocr-review-progress.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    con.close();return report

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--library',required=True)
    parser.add_argument('--batch-size',type=int,default=10)
    options=parser.parse_args()
    result=review_batch(Path(options.library),options.batch_size)
    print({key:value for key,value in result.items() if key!='items'})
