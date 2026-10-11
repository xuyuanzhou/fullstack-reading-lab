import { RichProse } from '@/components/RichProse'
import { splitFencedBlocks } from '@/data/reading'

function proseParagraphs(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/u)
    .map((part) => part.trim())
    .filter(Boolean)
}

/** Render lesson prose with optional ``` fenced code blocks. */
export function RichBlocks({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const blocks = splitFencedBlocks(text)
  const wrapClass = className ? `rich-blocks ${className}` : 'rich-blocks'

  if (blocks.length === 1 && blocks[0].kind === 'prose') {
    const paragraphs = proseParagraphs(blocks[0].text)
    if (paragraphs.length <= 1) {
      return <RichProse text={paragraphs[0] || ''} className={className} />
    }
    return (
      <div className={wrapClass}>
        {paragraphs.map((para, index) => (
          <RichProse key={index} text={para} className="body" />
        ))}
      </div>
    )
  }

  return (
    <div className={wrapClass}>
      {blocks.flatMap((block, index) =>
        block.kind === 'code'
          ? [
              <pre key={index} className="lesson-code" data-lang={block.lang || undefined}>
                <code>{block.text}</code>
              </pre>,
            ]
          : proseParagraphs(block.text).map((para, paraIndex) => (
              <RichProse key={`${index}-${paraIndex}`} text={para} />
            )),
      )}
    </div>
  )
}
