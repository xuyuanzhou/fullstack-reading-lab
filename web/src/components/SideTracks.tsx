import { useState } from 'react'
import { Link } from 'react-router-dom'
import { findLesson } from '@/data/curriculum'
import { SIDE_TRACKS } from '@/data/sideTracks'
import { lessonPath } from '@/data/routes'

export function SideTrackLinks({ id }: { id: string }) {
  const track = SIDE_TRACKS.find((item) => item.id === id.replace(/^side:/, '')) ?? SIDE_TRACKS[0]
  return (
    <ul>
      {track.items.map((item) => {
        const lessons = item.lessons.flatMap((lessonId) => {
          const lesson = findLesson(lessonId)
          return lesson ? [lesson] : []
        })
        return (
          <li key={item.label}>
            <span>{item.label}</span>
            {lessons.length > 0 ? (
              <span className="path-side-links">
                {lessons.map((lesson) => (
                  <Link key={lesson.id} className="text-link" to={lessonPath(lesson)}>
                    {lesson.title}
                  </Link>
                ))}
              </span>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

export function SideTracks({
  activeId,
  onPick,
  stepLabel,
}: {
  /** `side:fe` 或 `fe`。 */
  activeId?: string
  onPick?: (trackId: string) => void
  /** 当前这条的进度，例如「2/6」。 */
  stepLabel?: string
} = {}) {
  const initial = (activeId ?? SIDE_TRACKS[0].id).replace(/^side:/, '')
  const [id, setId] = useState(initial)
  const trackId = onPick ? initial : id
  const track = SIDE_TRACKS.find((item) => item.id === trackId) ?? SIDE_TRACKS[0]
  return (
    <section className="path-sides" aria-label="支线">
      <p className="path-sides-lead">
        九关之外四条补强。求职先挑最贴岗位的两条；读完要在作品里留下证据，不能只刷课。
      </p>
      <div className="path-side-tabs" role="tablist" aria-label="四条支线">
        {SIDE_TRACKS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === track.id}
            onClick={() => {
              if (onPick) onPick(item.id)
              else setId(item.id)
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <article className="path-side" role="tabpanel">
        <h3>{track.title}</h3>
        <p className="path-side-objective">{track.objective}</p>
        <p className="path-side-when">{track.when}</p>
        {stepLabel ? <p className="path-side-step">进度 {stepLabel}</p> : null}
        <SideTrackLinks id={track.id} />
        <p className="path-side-evidence">结束要交出：{track.evidence.join('；')}。</p>
        <p className="path-side-hold">{track.hold}</p>
      </article>
    </section>
  )
}
