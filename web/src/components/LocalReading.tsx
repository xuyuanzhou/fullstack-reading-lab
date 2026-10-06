import { useMemo } from 'react'
import { localApi } from '@/api/localLibrary'
import { parseReading } from '@/components/parseReading'

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
