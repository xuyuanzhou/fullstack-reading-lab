# coding: utf-8
import pathlib
import sqlite3
import tempfile
import unittest
import zipfile
import server
import audit_rules

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
if __name__=='__main__':unittest.main()
