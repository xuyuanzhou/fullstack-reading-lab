#!/usr/bin/env python3
"""Export a library PDF page (or copy a library image) into curriculum/library-assets.

Usage:
  python3 reader/export_page_asset.py \\
    --doc 'Java-面试八股文&面试题库/6-Java专题分类/分布式高并发/分布式高并发.pdf' \\
    --page 19 \\
    --slug distributed-hc \\
    --name p0019

  # Nested media extracted from docx/zip (id contains "!/"):
  python3 reader/export_page_asset.py \\
    --doc '…/improve_build.docx!/word/media/rId39.png' \\
    --slug frontend-local --name webpack-devtool-2

Writes curriculum/library-assets/<slug>/<name>.png
Does not print absolute library paths. Nested ids resolve via Library manifests.
"""
from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))

import server  # noqa: E402
from library_config import resolve_library  # noqa: E402


def main():
    parser = argparse.ArgumentParser(description='导出本机资料页图到 curriculum/library-assets')
    parser.add_argument('--doc', required=True, help='相对资料库的文档 id（与 index 一致）')
    parser.add_argument('--page', type=int, default=1, help='PDF 物理页（从 1 起）；图片文件忽略')
    parser.add_argument('--slug', required=True, help='资产子目录名，如 distributed-hc')
    parser.add_argument('--name', help='文件名（不含扩展名），默认 pXXXX')
    parser.add_argument('--library', help='本机资料库根目录（可选）')
    parser.add_argument('--scale', type=int, default=1600, help='pdftoppm -scale-to（默认 1600）')
    args = parser.parse_args()

    library = resolve_library(args.library)
    # Nested ids (docx!/word/media/...) live under private-data manifests.
    try:
        source = server.Library(library).resolve(args.doc)
    except (FileNotFoundError, PermissionError):
        source = (library / args.doc).resolve()
        if not source.is_file():
            raise SystemExit(f'找不到资料：{args.doc}')
    if not source.is_file():
        raise SystemExit(f'找不到资料：{args.doc}')

    out_dir = ROOT / 'curriculum' / 'library-assets' / args.slug
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = args.name or f'p{args.page:04d}'
    out_path = out_dir / f'{stem}.png'

    suffix = source.suffix.lower()
    if suffix == '.pdf':
        # Reuse server renderer but allow custom scale via local call.
        import subprocess
        import tempfile

        password, total = server.pdf_access(source)
        if args.page < 1 or args.page > total:
            raise SystemExit(f'页码超出范围：{args.page} / {total}')
        with tempfile.TemporaryDirectory() as directory:
            prefix = Path(directory) / 'page'
            cmd = [
                'pdftoppm',
                '-f', str(args.page),
                '-l', str(args.page),
                '-scale-to', str(args.scale),
                '-png',
                '-singlefile',
            ]
            if password is not None:
                cmd.extend(['-upw', password])
            cmd.extend([str(source), str(prefix)])
            completed = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=90)
            if completed.returncode:
                raise SystemExit('PDF 页面渲染失败')
            out_path.write_bytes(prefix.with_suffix('.png').read_bytes())
    elif suffix in {'.png', '.jpg', '.jpeg', '.gif', '.webp'}:
        shutil.copyfile(source, out_path)
    else:
        raise SystemExit(f'不支持的格式：{suffix}')

    rel = out_path.relative_to(ROOT).as_posix()
    print(rel)


if __name__ == '__main__':
    main()
