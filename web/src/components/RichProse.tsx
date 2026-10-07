import { Link } from 'react-router-dom'
import { curriculum, findLesson } from '@/data/curriculum'
import { lessonPath } from '@/data/routes'
import { shortTitle, tokenizeLessonRefs } from '@/data/reading'

const knownIds = new Set(curriculum.lessons.map((lesson) => lesson.id))

/** Render prose with lesson-id backticks (and “见 id”) as titled links. */
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
