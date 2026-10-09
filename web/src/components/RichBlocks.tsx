import { RichProse } from '@/components/RichProse'
import { splitFencedBlocks } from '@/data/reading'

/** Render lesson prose with optional ``` fenced code blocks. */
export function RichBlocks({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const blocks = splitFencedBlocks(text)
  if (blocks.length === 1 && blocks[0].kind === 'prose') {
    return <RichProse text={blocks[0].text} className={className} />
  }
  return (
    <div className={className ? `rich-blocks ${className}` : 'rich-blocks'}>
      {blocks.map((block, index) =>
        block.kind === 'code' ? (
          <pre key={index} className="lesson-code" data-lang={block.lang || undefined}>
            <code>{block.text}</code>
          </pre>
        ) : (
          <RichProse key={index} text={block.text} />
        ),
      )}
    </div>
  )
}
