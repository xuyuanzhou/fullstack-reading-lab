#!/usr/bin/env python3
"""Track every private source item without exposing its path in the public site."""
import argparse
import json
import sqlite3
import time
from pathlib import Path

import server
from library_config import resolve_library

ROOT = Path(__file__).resolve().parent.parent
REPORT = ROOT / 'private-data' / 'source-progress-summary.json'

CURRICULUM = ('待选题', '已定位主题', '已有草稿', '已发布课程')
ACCURACY = ('待核验', '核验中', '已核验', '不适用')


def track_for(identifier):
    if identifier.startswith('Web前端-面试八股文&面试题库/'):
        return 'frontend'
    if identifier.startswith('Java-面试八股文&面试题库/'):
        return 'java'
    if identifier.startswith('AI-'):
        return 'ai'
    return 'other'


def connect():
    connection = sqlite3.connect(str(server.DB))
    connection.execute('''CREATE TABLE IF NOT EXISTS source_review(
        id TEXT PRIMARY KEY,
        track TEXT NOT NULL,
        extraction_status TEXT NOT NULL,
        curriculum_status TEXT NOT NULL DEFAULT '待选题',
        accuracy_status TEXT NOT NULL DEFAULT '待核验',
        notes TEXT NOT NULL DEFAULT '',
        updated_at REAL NOT NULL
    )''')
    return connection


def sync(connection):
    now = time.time()
    rows = connection.execute('SELECT id,status,chars FROM imports').fetchall()
    for identifier, status, chars in rows:
        extraction = '已有文字' if status == 'ok' and chars > 0 else '待人工处理'
        connection.execute('''INSERT INTO source_review
            (id,track,extraction_status,curriculum_status,accuracy_status,notes,updated_at)
            VALUES(?,?,?,'待选题','待核验','',?)
            ON CONFLICT(id) DO UPDATE SET
              track=excluded.track,
              extraction_status=excluded.extraction_status''',
            (identifier, track_for(identifier), extraction, now))
    connection.commit()
    return len(rows)


def mark(connection, identifier, curriculum, accuracy, note):
    if curriculum not in CURRICULUM:
        raise SystemExit('未知课程状态：' + curriculum)
    if accuracy not in ACCURACY:
        raise SystemExit('未知核验状态：' + accuracy)
    changed = connection.execute('''UPDATE source_review SET
        curriculum_status=?, accuracy_status=?, notes=?, updated_at=? WHERE id=?''',
        (curriculum, accuracy, note, time.time(), identifier)).rowcount
    connection.commit()
    if not changed:
        raise SystemExit('台账中找不到该原件；请先运行 --sync')


def summary(connection):
    result = {'total': connection.execute('SELECT count(*) FROM source_review').fetchone()[0]}
    for column in ('track', 'extraction_status', 'curriculum_status', 'accuracy_status'):
        result[column] = dict(connection.execute(
            f'SELECT {column},count(*) FROM source_review GROUP BY {column} ORDER BY {column}'
        ).fetchall())
    REPORT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    return result


def main():
    parser = argparse.ArgumentParser(description='私人原件全库处理台账')
    parser.add_argument('--sync', action='store_true', help='从导入索引同步所有原件')
    parser.add_argument('--summary', action='store_true', help='输出不含私人路径的汇总')
    parser.add_argument('--mark-source', help='精确的本机原件标识')
    parser.add_argument('--curriculum', choices=CURRICULUM, default='已有草稿')
    parser.add_argument('--accuracy', choices=ACCURACY, default='待核验')
    parser.add_argument('--note', default='')
    parser.add_argument('--library', default=None, help='省略时读 READING_LAB_LIBRARY 或 config/library.path')
    args = parser.parse_args()
    root = resolve_library(args.library)
    server.LIB = server.Library(root)
    server.bind_library(root)
    con = connect()
    if args.sync:
        print('synced', sync(con), 'private source items')
    if args.mark_source:
        mark(con, args.mark_source, args.curriculum, args.accuracy, args.note)
    if args.summary or (not args.sync and not args.mark_source):
        print(json.dumps(summary(con), ensure_ascii=False, indent=2))
    elif args.sync or args.mark_source:
        summary(con)


if __name__ == '__main__':
    main()
