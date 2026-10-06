#!/usr/bin/env python3
"""Record website addresses found in private library text. Nothing is written to Git."""
import argparse
import re
import sqlite3
from pathlib import Path
from urllib.parse import urlsplit

import server

URLS = re.compile(r'https?://[^\s<>"\'\]\)]+', re.I)
SKIP_HOSTS = {
    'localhost', '127.0.0.1', 'example.com', 'www.w3.org', 'w3.org',
    'schemas.microsoft.com', 'schemas.openxmlformats.org', 'purl.org',
}


def website(raw):
    cleaned = raw.rstrip('.,;，。、)）]>')
    try:
        parts = urlsplit(cleaned)
    except ValueError:
        return None
    host = parts.netloc.lower().split('@')[-1].split(':')[0]
    if host.startswith('www.'):
        host = host[4:]
    if parts.scheme not in {'http', 'https'} or not host or host in SKIP_HOSTS:
        return None
    if host.endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg')):
        return None
    return parts.scheme + '://' + host


def mark(limit_per_doc=15):
    connection = server.connect()
    connection.execute('''CREATE TABLE IF NOT EXISTS source_urls(
        id TEXT NOT NULL,
        website TEXT NOT NULL,
        PRIMARY KEY(id, website)
    )''')
    connection.execute('DELETE FROM source_urls')
    documents = 0
    marked = 0
    for ident, body in connection.execute('SELECT id, body FROM docs'):
        documents += 1
        found = []
        seen = set()
        for match in URLS.findall(body or ''):
            site = website(match)
            if not site or site in seen:
                continue
            seen.add(site)
            found.append(site)
            if len(found) >= limit_per_doc:
                break
        if found:
            connection.executemany('INSERT OR IGNORE INTO source_urls(id, website) VALUES(?,?)', ((ident, site) for site in found))
            marked += 1
    connection.commit()
    summary = {
        'documents': documents,
        'with_website': marked,
        'websites': connection.execute('SELECT count(*) FROM source_urls').fetchone()[0],
    }
    connection.close()
    target = Path(server.PROFILE) / 'source-url-summary.json'
    target.write_text(__import__('json').dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')
    return summary


if __name__ == '__main__':
    argparse.ArgumentParser(description='从私有库正文提取来源网站').parse_args()
    print(mark())
