import { useEffect, useState } from 'react'
import { RichProse } from '@/components/RichProse'
import { splitFencedBlocks } from '@/data/reading'

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function proseParagraphs(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/u)
    .map((part) => part.trim())
    .filter(Boolean)
}

function LessonCode({ lang, text }: { lang: string; text: string }) {
  const [html, setHtml] = useState(() => escapeHtml(text))
  useEffect(() => {
    let cancel = false
    void import('@/data/highlightCode').then((mod) => {
      if (!cancel) setHtml(mod.highlightLessonCode(lang, text))
    })
    return () => {
      cancel = true
    }
  }, [lang, text])
  return (
    <pre className="lesson-code" data-lang={lang || undefined}>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  )
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
              <LessonCode key={index} lang={block.lang} text={block.text} />,
            ]
          : proseParagraphs(block.text).map((para, paraIndex) => (
              <RichProse key={`${index}-${paraIndex}`} text={para} />
            )),
      )}
    </div>
  )
}
