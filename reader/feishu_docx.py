"""Turn a Feishu docx client_vars payload into Markdown plus an image manifest.

The private library keeps the rendered notes. This module does not fetch the network
or store share passwords.
"""
import re
import urllib.parse

HEADING = {
    'heading1': '#',
    'heading2': '##',
    'heading3': '###',
    'heading4': '####',
    'heading5': '#####',
    'heading6': '######',
    'heading7': '######',
    'heading8': '######',
    'heading9': '######',
}
SKIP_TYPES = {'page', 'table_cell', 'grid_column'}


def render_document(data, title):
    """Return markdown text, image jobs, and a histogram of block types."""
    block_map = data.get('block_map') or {}
    root_id = data.get('id')
    state = {'images': [], 'types': {}, 'sheets': 0}
    lines = [f'# {title}'.rstrip(), '']
    if root_id and root_id in block_map:
        _walk_children(block_map, [root_id], lines, state, depth=0, quote=False)
    else:
        _walk_children(block_map, list(block_map), lines, state, depth=0, quote=False)
    text = re.sub(r'\n{3,}', '\n\n', '\n'.join(lines)).strip() + '\n'
    return {'markdown': text, 'images': state['images'], 'types': state['types'], 'sheets': state['sheets']}


def _walk_children(block_map, ids, lines, state, depth, quote):
    ordered = 0
    for block_id in ids or []:
        block = block_map.get(block_id) or {}
        payload = block.get('data') or {}
        kind = payload.get('type') or 'unknown'
        state['types'][kind] = state['types'].get(kind, 0) + 1
        if kind == 'ordered':
            ordered += 1
        else:
            ordered = 0
        if kind == 'page':
            _walk_children(block_map, payload.get('children') or [], lines, state, 0, quote)
            continue
        _emit(block_map, block_id, payload, kind, lines, state, depth, quote, ordered)


def _emit(block_map, block_id, payload, kind, lines, state, depth, quote, ordered):
    children = payload.get('children') or []
    if kind in HEADING:
        _add(lines, f'{HEADING[kind]} {_plain(payload)}', quote)
        _walk_children(block_map, children, lines, state, depth, quote)
        return
    if kind == 'bullet':
        _add(lines, f'{"  " * depth}- {_plain(payload)}', quote)
        _walk_children(block_map, children, lines, state, depth + 1, quote)
        return
    if kind == 'ordered':
        _add(lines, f'{"  " * depth}{ordered}. {_plain(payload)}', quote)
        _walk_children(block_map, children, lines, state, depth + 1, quote)
        return
    if kind == 'code':
        language = payload.get('language') or ''
        if not re.fullmatch(r'[A-Za-z0-9_+#.-]*', str(language)):
            language = ''
        body = _plain(payload).replace('\r\n', '\n')
        fence = '`' * max(3, _fence_size(body))
        _add(lines, f'{fence}{language}\n{body}\n{fence}', quote)
        return
    if kind == 'divider':
        _add(lines, '---', quote)
        return
    if kind == 'image':
        image = payload.get('image') or {}
        token = image.get('token') or ''
        if token:
            number = len(state['images']) + 1
            mime = str(image.get('mimeType') or 'image/png')
            suffix = '.jpg' if 'jpeg' in mime else '.webp' if 'webp' in mime else '.gif' if 'gif' in mime else '.png'
            name = f'{number:03d}{suffix}'
            state['images'].append({
                'name': name,
                'token': token,
                'blockId': block_id,
                'width': image.get('width') or 0,
                'height': image.get('height') or 0,
            })
            caption = _rich(image.get('caption') or {}) or f'图 {number}'
            _add(lines, f'![{caption}](images/{name})', quote)
        _walk_children(block_map, children, lines, state, depth, quote)
        return
    if kind == 'sheet':
        state['sheets'] += 1
        _add(lines, '（此处原文档有一张嵌入表格）', quote)
        return
    if kind in {'quote', 'quote_container', 'callout'}:
        _walk_children(block_map, children, lines, state, depth, True)
        return
    if kind in SKIP_TYPES or children:
        text = _plain(payload)
        if text:
            _add(lines, text, quote)
        _walk_children(block_map, children, lines, state, depth, quote)
        return
    text = _plain(payload)
    if text:
        _add(lines, text, quote)


def _add(lines, text, quote):
    if text is None:
        return
    body = str(text).strip('\n')
    if not body:
        return
    if quote:
        body = '\n'.join(f'> {line}' if line else '>' for line in body.split('\n'))
    if lines and lines[-1] != '':
        lines.append('')
    lines.append(body)
    lines.append('')


def _plain(payload):
    return _rich(payload.get('text') or {}).strip()


def _rich(text_obj):
    if not isinstance(text_obj, dict):
        return ''
    zones = text_obj.get('initialAttributedTexts') or {}
    raw_map = zones.get('text') or {}
    attrib_map = zones.get('attribs') or {}
    pool = (text_obj.get('apool') or {}).get('numToAttrib') or {}
    if not isinstance(raw_map, dict):
        return ''
    parts = []
    for key in sorted(raw_map, key=lambda item: int(item) if str(item).isdigit() else 0):
        parts.append(_apply(str(raw_map.get(key) or ''), str(attrib_map.get(key) or ''), pool))
    return '\n'.join(part for part in parts if part)


def _apply(text, attribs, pool):
    if not attribs:
        return text
    active = set()
    pieces = []
    index = 0
    cursor = 0
    while index < len(attribs) and cursor <= len(text):
        mark = attribs[index]
        if mark not in '*+':
            index += 1
            continue
        index += 1
        number, index = _read_number(attribs, index)
        if mark == '*':
            if number in active:
                active.remove(number)
            else:
                active.add(number)
            continue
        count = int(number or '0')
        chunk = text[cursor:cursor + count]
        cursor += count
        pieces.append(_decorate(chunk, active, pool))
    if cursor < len(text):
        pieces.append(text[cursor:])
    return ''.join(pieces)


def _read_number(attribs, index):
    start = index
    while index < len(attribs) and attribs[index].isdigit():
        index += 1
    return attribs[start:index], index


def _decorate(chunk, active, pool):
    if not chunk:
        return ''
    names = {}
    for number in active:
        pair = pool.get(number) or pool.get(str(number))
        if isinstance(pair, (list, tuple)) and pair:
            names[str(pair[0])] = pair[1] if len(pair) > 1 else True
    body = chunk
    if names.get('inlineCode') or names.get('code'):
        body = '`' + chunk.replace('`', '\\`') + '`'
    else:
        if names.get('bold') in (True, 'true', '1'):
            body = f'**{body}**'
        if names.get('italic') in (True, 'true', '1'):
            body = f'*{body}*'
    link = names.get('link') or names.get('href') or ''
    if isinstance(link, str) and link:
        url = urllib.parse.unquote(link)
        body = f'[{body}]({url})'
    return body


def _fence_size(body):
    longest = 0
    current = 0
    for char in body:
        if char == '`':
            current += 1
            longest = max(longest, current)
        else:
            current = 0
    return longest + 1
