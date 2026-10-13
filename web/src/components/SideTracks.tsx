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

export function SideTracks() {
  const [id, setId] = useState(SIDE_TRACKS[0].id)
  const track = SIDE_TRACKS.find((item) => item.id === id) ?? SIDE_TRACKS[0]
  return (
    <section className="path-sides" aria-label="并行补强">
      <p className="path-sides-lead">
        九关仍是默认入口。四条按进入时机来补，求职先选最贴岗位的两条。读完不代替作品里的证据。
      </p>
      <div className="path-side-tabs" role="tablist" aria-label="四条补强">
        {SIDE_TRACKS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === track.id}
            onClick={() => setId(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <article className="path-side" role="tabpanel">
        <h3>{track.title}</h3>
        <p>{track.when}</p>
        <SideTrackLinks id={track.id} />
        <p className="path-side-evidence">结束要交出：{track.evidence.join('；')}。</p>
        <p className="path-side-hold">{track.hold}</p>
      </article>
    </section>
  )
}
