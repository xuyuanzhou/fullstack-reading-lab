# coding: utf-8
import pathlib
import sqlite3
import tempfile
import unittest
import zipfile
import server
import audit_rules
import import_archives
import import_embedded
import import_library
import parsers

class ReaderTests(unittest.TestCase):
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
    def test_text_index(self):
        with tempfile.TemporaryDirectory() as d:
            path=pathlib.Path(d)/'sample.md';path.write_text('闭包与事件循环')
            db=sqlite3.connect(':memory:')
            db.execute('CREATE VIRTUAL TABLE docs USING fts5(id UNINDEXED,title,body)')
            db.execute('CREATE TABLE indexed(id TEXT PRIMARY KEY,mtime REAL,size INTEGER,status TEXT)')
            self.assertTrue(server.index_one(db,'sample.md',path))
            self.assertEqual(db.execute('SELECT title FROM docs WHERE body LIKE ?',(u'%闭包%',)).fetchone()[0],'sample')
            self.assertFalse(server.index_one(db,'sample.md',path))
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
        with tempfile.TemporaryDirectory() as directory:
            path=pathlib.Path(directory)/'sheet.xlsx'
            with zipfile.ZipFile(str(path),'w') as archive:
                archive.writestr('xl/worksheets/sheet1.xml','<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData><row><c r="A1" t="inlineStr"><is><t>Java 面试</t></is></c></row></sheetData></worksheet>')
            self.assertIn('Java 面试',parsers.xlsx_text(path))
    def test_nested_materials_stay_in_private_profile(self):
        with tempfile.TemporaryDirectory() as directory:
            base=pathlib.Path(directory);root=base/'library';root.mkdir();folder=root/'Java-示例';folder.mkdir()
            with zipfile.ZipFile(str(folder/'sample.zip'),'w') as archive:
                archive.writestr('docs/note.md','可读内容')
                archive.writestr('../escape.md','不得写出')
            with zipfile.ZipFile(str(folder/'sample.docx'),'w') as archive:
                archive.writestr('word/media/image1.png',b'image-bytes')
            previous=server.PROFILE
            try:
                server.PROFILE=base/'private-data';server.PROFILE.mkdir()
                self.assertEqual(import_archives.import_archives(root)['members'],1)
                self.assertEqual(import_embedded.import_embedded(root)['images'],1)
                library=server.Library(root)
                self.assertEqual(library.list()['total'],3)
                self.assertEqual(library.resolve('Java-示例/sample.zip!/docs/note.md').read_text(),'可读内容')
                self.assertEqual(library.resolve('Java-示例/sample.docx!/word/media/image1.png').read_bytes(),b'image-bytes')
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
            finally:server.PROFILE,server.DB,server.LIB=previous
if __name__=='__main__':unittest.main()
