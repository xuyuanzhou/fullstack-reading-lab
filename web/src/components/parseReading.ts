export type ReadingBlock =
  | { kind: 'heading'; level: number; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'image'; alt: string; id: string }
  | { kind: 'rule' }
  | { kind: 'text'; text: string }

function decodeHrefPart(part: string) {
  const trimmed = part.split('#')[0].split('?')[0]
  try {
    return decodeURIComponent(trimmed)
  } catch {
    return trimmed
  }
}

function imageId(docId: string, href: string) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) return ''
  const parts = docId.split('/').slice(0, -1)
  for (const part of href.split('/')) {
    if (part === '..') parts.pop()
    else if (part && part !== '.') parts.push(decodeHrefPart(part))
  }
  const id = parts.join('/')
  if (!id.includes('/images/')) return ''
  if (id.split('/').includes('..')) return ''
  return id
}

export function parseReading(docId: string, source: string): ReadingBlock[] {
  const blocks: ReadingBlock[] = []
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  let index = 0
  let paragraph: string[] = []
  const flush = () => {
    if (!paragraph.length) return
    blocks.push({ kind: 'text', text: paragraph.join('\n') })
    paragraph = []
  }
  while (index < lines.length) {
    const line = lines[index]
    const fence = line.match(/^(`{3,})(.*)$/)
    if (fence) {
      flush()
      const closer = fence[1]
      const body: string[] = []
      index += 1
      while (index < lines.length && lines[index] !== closer) {
        body.push(lines[index])
        index += 1
      }
      blocks.push({ kind: 'code', text: body.join('\n') })
      index += 1
      continue
    }
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (heading || image || line.trim() === '---' || !line.trim()) {
      flush()
      if (heading) blocks.push({ kind: 'heading', level: heading[1].length, text: heading[2] })
      else if (image) {
        const id = imageId(docId, image[2])
        if (id) blocks.push({ kind: 'image', alt: image[1] || '配图', id })
        else blocks.push({ kind: 'text', text: `图片未显示：${image[2]}` })
      } else if (line.trim() === '---') blocks.push({ kind: 'rule' })
      index += 1
      continue
    }
    paragraph.push(line)
    index += 1
  }
  flush()
  return blocks
}
