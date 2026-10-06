import { Button, Space, Typography } from 'antd'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { findLesson, lessonsFor, lessonsInGroup, outlineFor, totals } from '@/data/curriculum'
import { TRACK_INTRO, TRACK_LABEL } from '@/data/meta'
import { groupLabel, isTrack, lessonPath, resumePath } from '@/data/routes'
import { useProgress } from '@/state/progress'
import type { Lesson } from '@/types/curriculum'

function LessonRows({
  items,
  doneIds,
  onOpen,
}: {
  items: Lesson[]
  doneIds: string[]
  onOpen: (id: string) => void
}) {
  return (
    <div className="lesson-list">
      {items.map((item) => {
        const done = doneIds.includes(item.id)
        return (
          <Link
            key={item.id}
            className={`lesson-row${done ? ' is-done' : ''}`}
            to={lessonPath(item)}
            onClick={() => onOpen(item.id)}
          >
            <span className="lesson-row-mark">{done ? '✓' : ''}</span>
            <span>
              <strong>{item.title}</strong>
              <p>{item.prompt}</p>
            </span>
          </Link>
        )
      })}
    </div>
  )
}

export function HomePage() {
  const { track: trackParam = '', groupKey = '' } = useParams()
  const progress = useProgress()
  const navigate = useNavigate()
  const track = isTrack(trackParam) ? trackParam : undefined
  const label = track ? groupLabel(track, groupKey) : ''
  if (!track || !label) return <Navigate to={resumePath(progress.track, progress.group)} replace />

  const current = lessonsFor(track)
  const visible = lessonsInGroup(track, label)
  const sections = outlineFor(track, label)
  const next = current.find((item) => !progress.done.includes(item.id)) || current[0]
  const doneCount = current.filter((item) => progress.done.includes(item.id)).length
  const reviewCount = current.filter((item) => progress.review.includes(item.id)).length
  const chapterDone = visible.filter((item) => progress.done.includes(item.id)).length
  const listed = new Set(sections.flatMap((section) => section.ids))
  const remainder = visible.filter((item) => !listed.has(item.id))

  return (
    <div className="article-shell">
      <div className="page-kicker">
        <span>公开原创课程</span>
        <span className="dot" />
        <span>
          {totals.lessons} 节 · {totals.points} 知识点
        </span>
      </div>

      <div>
        <h1 className="hero-title">{TRACK_LABEL[track]}，从原理走向实践</h1>
        <p className="hero-lead">{TRACK_INTRO[track]}</p>
        <Space wrap size={12}>
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              if (!next) return
              progress.remember(next.id)
              navigate(lessonPath(next))
            }}
          >
            继续学习 →
          </Button>
          <Button onClick={() => navigate('/knowledge')}>
            浏览知识库
          </Button>
        </Space>
      </div>

      <div className="metric-line">
        <span>
          本章 <strong>{visible.length}</strong> 课
        </span>
        <span>
          已掌握 <strong>{doneCount}</strong>
        </span>
        <span>
          待复习 <strong>{reviewCount}</strong>
        </span>
        <span>
          全路线 <strong>{current.length}</strong>
        </span>
      </div>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
          <Typography.Title level={3} className="page-title" style={{ margin: 0 }}>
            {label}
          </Typography.Title>
          <Typography.Text type="secondary">
            {chapterDone}/{visible.length} 已掌握
          </Typography.Text>
        </div>
        {sections.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {sections.map((section) => {
              const items = section.ids
                .map((id) => findLesson(id))
                .filter((item): item is Lesson => !!item && item.track === track && item.group === label)
              if (!items.length) return null
              return (
                <div key={section.title}>
                  <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                    {section.title}
                  </Typography.Text>
                  <LessonRows items={items} doneIds={progress.done} onOpen={progress.remember} />
                </div>
              )
            })}
            {remainder.length ? (
              <div>
                <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                  本章其他
                </Typography.Text>
                <LessonRows items={remainder} doneIds={progress.done} onOpen={progress.remember} />
              </div>
            ) : null}
          </div>
        ) : (
          <LessonRows items={visible} doneIds={progress.done} onOpen={progress.remember} />
        )}
      </section>
    </div>
  )
}
