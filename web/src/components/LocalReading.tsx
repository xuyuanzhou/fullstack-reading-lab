import { useMemo } from 'react'
import { localApi } from '@/api/localLibrary'

type Block =
  | { kind: 'heading'; level: number; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'image'; alt: string; id: string }
  | { kind: 'rule' }
  | { kind: 'text'; text: string }

function imageId(docId: string, href: string) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) return ''
  const parts = docId.split('/').slice(0, -1)
  for (const part of href.split('/')) {
    if (part === '..') parts.pop()
    else if (part && part !== '.') parts.push(decodeURIComponent(part))
  }
  const id = parts.join('/')
  if (!id.includes('/images/')) return ''
  return id
}

export function parseReading(docId: string, source: string): Block[] {
  const blocks: Block[] = []
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

export function LocalReading({ docId, text }: { docId: string; text: string }) {
  const blocks = useMemo(() => parseReading(docId, text), [docId, text])
  if (!blocks.length) return <p className="muted">这份资料还没有可显示的正文。</p>
  return (
    <article className="local-reading">
      {blocks.map((block, index) => {
        if (block.kind === 'heading') {
          const Tag = `h${Math.min(block.level, 4)}` as 'h1' | 'h2' | 'h3' | 'h4'
          return <Tag key={index}>{block.text}</Tag>
        }
        if (block.kind === 'code') return <pre key={index}><code>{block.text}</code></pre>
        if (block.kind === 'image') {
          return <figure key={index}><img src={localApi.mediaUrl(block.id, 1)} alt={block.alt} /><figcaption>{block.alt}</figcaption></figure>
        }
        if (block.kind === 'rule') return <hr key={index} />
        return <p key={index}>{block.text}</p>
      })}
    </article>
  )
}
