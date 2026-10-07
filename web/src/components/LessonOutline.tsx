import { useEffect, useState } from 'react'
import type { Lesson } from '@/types/curriculum'
import { lessonNav } from '@/data/reading'

const sectionsFor = (lesson: Lesson) => lessonNav(Boolean(lesson.deep?.length))

export function LessonOutline({ lesson }: { lesson: Lesson }) {
  const sections = sectionsFor(lesson)
  const [active, setActive] = useState(sections[0][0])

  useEffect(() => {
    const nodes = sections
      .map(([id]) => document.getElementById(`lesson-${id}`))
      .filter((node): node is HTMLElement => !!node)
    if (!nodes.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const current = visible[0]?.target.id.replace(/^lesson-/, '') as typeof active | undefined
        if (current) setActive(current)
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: [0, 1] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [lesson.id, lesson.deep?.length])

  return (
    <nav className="lesson-outline" aria-label="本课目录">
      {sections.map(([id, label], index) => (
        <button
          key={id}
          type="button"
          className={active === id ? 'is-current' : undefined}
          aria-current={active === id ? 'true' : undefined}
          onClick={() => {
            const target = document.getElementById(`lesson-${id}`)
            setActive(id)
            target?.scrollIntoView({ behavior: 'auto', block: 'start' })
            target?.focus({ preventScroll: true })
          }}
        >
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          {label}
        </button>
      ))}
    </nav>
  )
}
