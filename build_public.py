#!/usr/bin/env python3
"""Build the public React site into web/dist (and mirror into ./dist for compatibility)."""
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parent
WEB = ROOT / 'web'
DIST = ROOT / 'dist'
WEB_DIST = WEB / 'dist'
NPM = shutil.which('npm')
if not NPM:
    raise SystemExit('npm is required to build the public React course')

subprocess.check_call([NPM, 'run', 'build'], cwd=WEB)
if DIST.exists():
    shutil.rmtree(DIST)
shutil.copytree(WEB_DIST, DIST)
print('Public site:', WEB_DIST)
print('Compatibility copy:', DIST)
