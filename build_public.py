#!/usr/bin/env python3
"""Build only the reviewed, original static lessons for public hosting."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent
PUBLIC_FILES = ('index.html', 'styles.css', 'app.js', 'lessons.js', 'extra-lessons.js', 'distributed-lessons.js', 'knowledge-points.js')
PUBLIC_DIAGRAMS = ('cap-partition.svg', 'kafka-order.svg', 'bloom-filter.svg', 'seckill-flow.svg')
DIST = ROOT / 'dist'

if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir()
for name in PUBLIC_FILES:
    shutil.copy2(ROOT / name, DIST / name)
diagram_dir = DIST / 'diagrams'
diagram_dir.mkdir()
for name in PUBLIC_DIAGRAMS:
    shutil.copy2(ROOT / 'diagrams' / name, diagram_dir / name)
print('Public site:', DIST)
print('Files:', ', '.join(PUBLIC_FILES), 'and', len(PUBLIC_DIAGRAMS), 'original diagrams')
