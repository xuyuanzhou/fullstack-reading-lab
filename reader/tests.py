# coding: utf-8
import os
import pathlib
import io
import json
import sqlite3
import tempfile
import unittest
import zipfile
import server
import audit_rules
import import_archives
import import_embedded
import import_library
import library_config
import parsers
import feishu_docx

class ReaderTests(unittest.TestCase):
    def test_library_path_is_configured_not_hardcoded(self):
        with tempfile.TemporaryDirectory() as directory:
            root=pathlib.Path(directory)
            lib=root/'books';lib.mkdir();other=root/'other';other.mkdir()
            previous_file=library_config.CONFIG_FILE
            previous_env=os.environ.pop(library_config.ENV_NAME, None)
            try:
                library_config.CONFIG_FILE=root/'library.path'
                library_config.CONFIG_FILE.write_text('# note\n'+str(lib)+'\n', encoding='utf-8')
                self.assertEqual(library_config.resolve_library(None), lib.resolve())
                self.assertEqual(library_config.resolve_library(str(other)), other.resolve())
                library_config.CONFIG_FILE.write_text('# only a comment\n', encoding='utf-8')
                with self.assertRaises(SystemExit):library_config.resolve_library(None)
            finally:
                library_config.CONFIG_FILE=previous_file
                if previous_env is not None:os.environ[library_config.ENV_NAME]=previous_env
    def test_catalog_is_local_and_classified(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d)
            folder=root/'Java-示例'/'1-基础'
            folder.mkdir(parents=True)
            (folder/'题目.md').write_text('# 示例\nJava 文本')
            lib=server.Library(root)
            self.assertEqual(lib.list(kind='java')['total'],1)
            self.assertEqual(lib.list(query='题目')['items'][0]['stage'],'核心知识')
            with self.assertRaises(FileNotFoundError):lib.resolve('../secret.md')
            for index in range(3):
                (folder/f'补充{index}.md').write_text('补充')
            lib=server.Library(root)
            first=lib.list(kind='java',limit=2,offset=0)
            second=lib.list(kind='java',limit=2,offset=2)
            self.assertEqual(first['total'],4)
            self.assertEqual(len(first['items']),2)
            self.assertTrue(first['hasMore'])
            self.assertEqual(len(second['items']),2)
            self.assertFalse(second['hasMore'])
            self.assertNotEqual(first['items'][0]['id'],second['items'][0]['id'])
    def test_docx_extraction(self):
        with tempfile.TemporaryDirectory() as d:
            path=pathlib.Path(d)/'sample.docx'
            xml='<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>第一题</w:t></w:r></w:p><w:p><w:r><w:t>答案</w:t></w:r></w:p></w:body></w:document>'
            with zipfile.ZipFile(str(path),'w') as z:z.writestr('word/document.xml',xml)
            self.assertEqual(server.extract(path),'第一题\n答案')
    def test_image_is_readable_but_password_notes_are_not_catalogued(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d)
            image=root/'Java-示例'/'机制图.png'
            image.parent.mkdir(parents=True)
            image.write_bytes(b'original-image-bytes')
            (image.parent/'各PDF密码.txt').write_text('不要展示')
            lib=server.Library(root)
            self.assertEqual(lib.list(kind='java')['total'],1)
            self.assertEqual(lib.list(kind='java')['items'][0]['format'],'PNG')
            self.assertEqual(lib.resolve('Java-示例/机制图.png').read_bytes(),b'original-image-bytes')
    def test_subject_keeps_specific_topics_ahead_of_generic_interview_names(self):
        self.assertEqual(server.subject('Java-面试八股文&面试题库/6-Java专题分类/MySQL/mysql面试题.pdf'),'MySQL')
        self.assertEqual(server.subject('Web前端-面试八股文&面试题库/1-前端八股文-多系列/4-前端八股文-专题分类/5.1.Vue3面试真题44页-带答案.pdf'),'Vue')
        self.assertEqual(server.subject('Java-面试八股文&面试题库/4-Java一线大厂面试真题&面经/a.pdf'),'面经')
        self.assertEqual(server.subject('Java-面试八股文&面试题库/1-Java八股文-多系列/1-精简八股文.pdf'),'综合八股')
        self.assertEqual(server.subject('Java-面试八股文&面试题库/6-Java专题分类/Spring/SpringBoot面试.pdf'),'Spring Boot')
        self.assertEqual(server.subject('AI-大模型实战宝典/1-手册/RAG手册.md'),'RAG')
        self.assertEqual(server.subject('AI-大模型实战宝典/1-手册/LangGraph手册.md'),'LangGraph')
        self.assertEqual(server.subject('AI-大模型实战宝典/4-题库/Java全套八股文.md'),'Java八股')
        self.assertEqual(server.subject('AI-大模型实战宝典/4-题库/大模型八股文.md'),'大模型八股')
        self.assertEqual(server.category('AI-大模型实战宝典/1-手册/RAG手册.md'),'ai')
    def test_ai_images_stay_with_the_note_instead_of_the_catalog(self):
        with tempfile.TemporaryDirectory() as directory:
            root=pathlib.Path(directory)
            note=root/'AI-大模型实战宝典'/'1-手册'
            image=note/'images'
            image.mkdir(parents=True)
            (note/'RAG手册.md').write_text('# RAG\n![图 1](images/001.png)\n',encoding='utf-8')
            (image/'001.png').write_bytes(b'png-bytes')
            library=server.Library(root)
            self.assertEqual(library.list(kind='ai')['total'],1)
            self.assertEqual(library.resolve('AI-大模型实战宝典/1-手册/images/001.png').read_bytes(),b'png-bytes')
            with self.assertRaises(FileNotFoundError):library.resolve('AI-大模型实战宝典/1-手册/missing.png')
    def test_text_index(self):
        with tempfile.TemporaryDirectory() as d:
            path=pathlib.Path(d)/'sample.md';path.write_text('闭包与事件循环')
            db=sqlite3.connect(':memory:')
            db.execute('CREATE VIRTUAL TABLE docs USING fts5(id UNINDEXED,title,body)')
            db.execute('CREATE TABLE indexed(id TEXT PRIMARY KEY,mtime REAL,size INTEGER,status TEXT)')
            self.assertTrue(server.index_one(db,'sample.md',path))
            self.assertEqual(db.execute('SELECT title FROM docs WHERE body LIKE ?',(u'%闭包%',)).fetchone()[0],'sample')
            self.assertFalse(server.index_one(db,'sample.md',path))
    def test_feishu_docx_keeps_structure_and_image_order(self):
        payload={
            'id':'page',
            'block_map':{
                'page':{'id':'page','data':{'type':'page','children':['h','p','img','code']}},
                'h':{'id':'h','data':{'type':'heading2','children':[],'text':{'initialAttributedTexts':{'text':{'0':'架构'},'attribs':{'0':''}}}}},
                'p':{'id':'p','data':{'type':'text','children':[],'text':{'initialAttributedTexts':{'text':{'0':'先看流程'},'attribs':{'0':'*0+4'}},'apool':{'numToAttrib':{'0':['bold','true']}}}}},
                'img':{'id':'img','data':{'type':'image','children':[],'image':{'token':'tok','mimeType':'image/png','width':10,'height':10}}},
                'code':{'id':'code','data':{'type':'code','language':'Python','children':[],'text':{'initialAttributedTexts':{'text':{'0':'print(1)'},'attribs':{'0':''}}}}},
            },
        }
        rendered=feishu_docx.render_document(payload,'RAG手册')
        self.assertIn('## 架构',rendered['markdown'])
        self.assertIn('**先看流程**',rendered['markdown'])
        self.assertIn('![图 1](images/001.png)',rendered['markdown'])
        self.assertIn('```Python\nprint(1)\n```',rendered['markdown'])
        self.assertEqual(rendered['images'],[{'name':'001.png','token':'tok','blockId':'img','width':10,'height':10}])
    def test_review_rules_are_leads(self):
        rules={r['id']:pattern for r,pattern in audit_rules.COMPILED}
        self.assertTrue(rules['react-stop-propagation'].search('stopPropagation 无效'))
        self.assertTrue(rules['java-volatile'].search('volatile count++ 线程安全'))
    def test_password_notes_are_private_and_nearest_password_wins(self):
        with tempfile.TemporaryDirectory() as d:
            root=pathlib.Path(d)
            nested=root/'Java-示例'/'专题'
            nested.mkdir(parents=True)
            (root/'各PDF密码.txt').write_text('示例：wrong-password')
            (nested/'各PDF密码.txt').write_text('示例.pdf：example-password')
            pdf=nested/'示例.pdf';pdf.write_bytes(b'%PDF-placeholder')
            previous=server.LIB
            try:
                server.LIB=server.Library(root)
                self.assertEqual(server.LIB.list()['total'],1)
                self.assertEqual(server.password_candidates(pdf)[0],'example-password')
            finally:
                server.LIB=previous
    def test_archive_member_paths_and_private_formats(self):
        self.assertIsNone(import_archives.safe_member('../escape.md'))
        self.assertIsNone(import_archives.safe_member('/absolute.md'))
        self.assertIsNone(import_archives.safe_member('各PDF密码.txt'))
        self.assertEqual(str(import_archives.safe_member('folder/Example.java')),'folder/Example.java')
        legacy=zipfile.ZipInfo('java╦π╖¿┤≤╚½╘┤┬δ░ⁿ/Example.java')
        self.assertIn('算法大全源码包',import_archives.zip_name(legacy))
        with tempfile.TemporaryDirectory() as directory:
            path=pathlib.Path(directory)/'sheet.xlsx'
            with zipfile.ZipFile(str(path),'w') as archive:
                archive.writestr('xl/worksheets/sheet1.xml','<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData><row><c r="A1" t="inlineStr"><is><t>Java 面试</t></is></c></row></sheetData></worksheet>')
            self.assertIn('Java 面试',parsers.xlsx_text(path))
    def test_nested_materials_stay_in_private_profile(self):
        with tempfile.TemporaryDirectory() as directory:
            base=pathlib.Path(directory);root=base/'library';root.mkdir();folder=root/'Java-示例';folder.mkdir()
            nested=io.BytesIO()
            with zipfile.ZipFile(nested,'w') as archive:archive.writestr('word/media/scan.png',b'nested-image')
            with zipfile.ZipFile(str(folder/'sample.zip'),'w') as archive:
                archive.writestr('docs/note.md','可读内容')
                archive.writestr('docs/nested.docx',nested.getvalue())
                archive.writestr('../escape.md','不得写出')
            with zipfile.ZipFile(str(folder/'sample.docx'),'w') as archive:
                archive.writestr('word/media/image1.png',b'image-bytes')
            previous=server.PROFILE
            try:
                server.PROFILE=base/'private-data';server.PROFILE.mkdir()
                self.assertEqual(import_archives.import_archives(root)['members'],2)
                self.assertEqual(import_embedded.import_embedded(root)['images'],2)
                library=server.Library(root)
                self.assertEqual(library.list()['total'],5)
                archived=library.resolve('Java-示例/sample.zip!/docs/note.md')
                embedded=library.resolve('Java-示例/sample.docx!/word/media/image1.png')
                nested_image=library.resolve('Java-示例/sample.zip!/docs/nested.docx!/word/media/scan.png')
                self.assertEqual(archived.read_text(),'可读内容')
                self.assertEqual(embedded.read_bytes(),b'image-bytes')
                self.assertEqual(nested_image.read_bytes(),b'nested-image')
                before=(archived.stat().st_mtime_ns,embedded.stat().st_mtime_ns,nested_image.stat().st_mtime_ns)
                import_archives.import_archives(root);import_embedded.import_embedded(root)
                self.assertEqual((archived.stat().st_mtime_ns,embedded.stat().st_mtime_ns,nested_image.stat().st_mtime_ns),before)
                self.assertFalse((base/'escape.md').exists())
            finally:server.PROFILE=previous
    def test_import_resume_uses_stable_batches(self):
        with tempfile.TemporaryDirectory() as directory:
            base=pathlib.Path(directory);root=base/'library';root.mkdir()
            for name in ('a.md','b.md','c.md'):(root/name).write_text('正文 '+name)
            previous=(server.PROFILE,server.DB,server.LIB)
            try:
                server.PROFILE=base/'private-data';server.PROFILE.mkdir()
                server.DB=server.PROFILE/'index.sqlite3'
                self.assertEqual(import_library.import_all(root,batch_size=2)['total'],2)
                self.assertEqual(import_library.import_all(root,batch_size=2)['total'],1)
                self.assertEqual(import_library.import_all(root,batch_size=2)['total'],0)
                (root/'c.md').unlink()
                self.assertEqual(import_library.import_all(root,batch_size=2)['total'],0)
                with sqlite3.connect(str(server.DB)) as check:
                    self.assertEqual(check.execute('SELECT count(*) FROM imports').fetchone()[0],2)
            finally:server.PROFILE,server.DB,server.LIB=previous
    def test_chm_extracts_join_the_private_catalog(self):
        with tempfile.TemporaryDirectory() as directory:
            base=pathlib.Path(directory)
            root=base/'library'
            folder=root/'Java-面试八股文&面试题库'/'7-其他更多'
            folder.mkdir(parents=True)
            private=base/'private-data'
            extracted=private/'chm-extracted'
            extracted.mkdir(parents=True)
            (extracted/'note.txt').write_text('可见性与安全发布')
            ident='Java-面试八股文&面试题库/7-其他更多/Java五百篇.chm'
            (private/'chm-manifest.json').write_text(json.dumps({
                'source_root':str(root.resolve()),
                'files':[
                    {'path':ident,'status':'ok','text':'chm-extracted/note.txt'},
                    {'path':ident.replace('.chm','.chw'),'status':'skipped','text':None},
                ]
            },ensure_ascii=False),encoding='utf-8')
            previous=server.PROFILE
            try:
                server.PROFILE=private
                library=server.Library(root)
                listed=library.list(kind='java')
                self.assertEqual(listed['total'],1)
                self.assertEqual(listed['items'][0]['title'],'Java五百篇')
                self.assertEqual(listed['items'][0]['format'],'CHM')
                self.assertEqual(listed['items'][0]['subject'],'综合八股')
                self.assertIn('可见性',library.resolve(ident).read_text(encoding='utf-8'))
            finally:
                server.PROFILE=previous
if __name__=='__main__':unittest.main()
