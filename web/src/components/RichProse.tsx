import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { curriculum, findLesson } from '@/data/curriculum'
import { lessonPath } from '@/data/routes'
import { shortTitle, tokenizeLessonRefs } from '@/data/reading'

const knownIds = new Set(curriculum.lessons.map((lesson) => lesson.id))

function TermGloss({ term, gloss }: { term: string; gloss: string }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number; place: 'above' | 'below' } | null>(
    null,
  )
  const rootRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLSpanElement>(null)
  const panelId = useId()

  useLayoutEffect(() => {
    if (!open || !buttonRef.current || !popupRef.current) return

    const place = () => {
      const button = buttonRef.current
      const popup = popupRef.current
      if (!button || !popup) return
      const rect = button.getBoundingClientRect()
      const popupRect = popup.getBoundingClientRect()
      const gap = 8
      const pad = 12
      let placeAbove = rect.top >= popupRect.height + gap + pad
      let top = placeAbove ? rect.top - gap : rect.bottom + gap
      let left = rect.left + rect.width / 2 - popupRect.width / 2
      left = Math.min(Math.max(pad, left), window.innerWidth - popupRect.width - pad)
      if (!placeAbove && top + popupRect.height > window.innerHeight - pad) {
        placeAbove = true
        top = rect.top - gap
      }
      setCoords({
        top: placeAbove ? top - popupRect.height : top,
        left,
        place: placeAbove ? 'above' : 'below',
      })
    }

    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, gloss, term])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node) && !popupRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <span className="term-gloss" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="term-gloss__term"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={`${term}：显示释义`}
        onClick={() => setOpen((value) => !value)}
      >
        {term}
      </button>
      {open ? (
        <span
          ref={popupRef}
          id={panelId}
          className={`term-gloss__popup term-gloss__popup--${coords?.place ?? 'above'}`}
          role="dialog"
          aria-label={`${term} 的释义`}
          style={
            coords
              ? { top: coords.top, left: coords.left, visibility: 'visible' }
              : { visibility: 'hidden', top: 0, left: 0 }
          }
        >
          <span className="term-gloss__popup-term">{term}</span>
          <span className="term-gloss__popup-body">{gloss}</span>
        </span>
      ) : null}
    </span>
  )
}

/** Render prose with lesson-id links and 〔术语｜释义〕 click popovers. */
export function RichProse({
  text,
  as: Tag = 'p',
  className,
}: {
  text: string
  as?: 'p' | 'span' | 'li'
  className?: string
}) {
  const tokens = tokenizeLessonRefs(text, knownIds)
  return (
    <Tag className={className}>
      {tokens.map((token, index) => {
        if (token.type === 'text') return <span key={index}>{token.value}</span>
        if (token.type === 'gloss') {
          return <TermGloss key={index} term={token.term} gloss={token.gloss} />
        }
        const lesson = findLesson(token.id)
        if (!lesson) return <span key={index}>{token.id}</span>
        return (
          <Link key={index} to={lessonPath(lesson)} className="lesson-ref">
            {shortTitle(lesson.title)}
          </Link>
        )
      })}
    </Tag>
  )
}
