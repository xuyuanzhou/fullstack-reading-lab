"""Resolve the private document library without a machine-specific default."""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG_FILE = ROOT / 'config' / 'library.path'
ENV_NAME = 'READING_LAB_LIBRARY'


def resolve_library(explicit=None):
    """CLI flag, then environment variable, then config/library.path."""
    if explicit:
        return Path(explicit).expanduser().resolve()
    env = os.environ.get(ENV_NAME, '').strip()
    if env:
        return Path(env).expanduser().resolve()
    if CONFIG_FILE.is_file():
        for line in CONFIG_FILE.read_text(encoding='utf-8').splitlines():
            text = line.strip()
            if text and not text.startswith('#'):
                return Path(text).expanduser().resolve()
    raise SystemExit(
        '未配置本机资料库。任选一种方式：\n'
        '  python3 reader/server.py --library /path/to/library\n'
        f'  export {ENV_NAME}=/path/to/library\n'
        f'  把路径写入 {CONFIG_FILE}（可复制 config/library.path.example）'
    )
