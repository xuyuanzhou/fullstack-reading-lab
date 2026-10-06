import { Button, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { lessonsFor, lessonsInGroup, totals } from '@/data/curriculum'
import { TRACK_INTRO, TRACK_LABEL } from '@/data/meta'
import { useProgress } from '@/state/progress'

export function HomePage() {
  const progress = useProgress()
  const navigate = useNavigate()
  const current = lessonsFor(progress.track)
  const group = progress.group || current[0]?.group || ''
  const visible = current.filter((item) => item.group === group)
  const next = current.find((item) => !progress.done.includes(item.id)) || current[0]
  const doneCount = current.filter((item) => progress.done.includes(item.id)).length
  const reviewCount = current.filter((item) => progress.review.includes(item.id)).length

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
        <h1 className="hero-title">{TRACK_LABEL[progress.track]}，从原理走向实践</h1>
        <p className="hero-lead">{TRACK_INTRO[progress.track]}</p>
        <Space wrap size={12}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              if (!next) return
              progress.remember(next.id)
              navigate(`/lesson/${encodeURIComponent(next.id)}`)
            }}
          >
            继续学习 →
          </Button>
          <Button size="large" onClick={() => navigate('/knowledge')}>
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
            {group || '课程路线'}
          </Typography.Title>
          <Typography.Text type="secondary">
            {lessonsInGroup(progress.track, group).filter((item) => progress.done.includes(item.id)).length}/
            {visible.length} 已掌握
          </Typography.Text>
        </div>
        <Typography.Paragraph type="secondary" style={{ marginTop: 0, marginBottom: 8 }}>
          用左侧目录切换阶段。这里只展示当前阶段的知识单元。
        </Typography.Paragraph>
        <div className="lesson-list">
          {visible.map((item) => {
            const done = progress.done.includes(item.id)
            return (
              <button
                key={item.id}
                type="button"
                className={`lesson-row${done ? ' is-done' : ''}`}
                onClick={() => {
                  progress.remember(item.id)
                  navigate(`/lesson/${encodeURIComponent(item.id)}`)
                }}
              >
                <span className="lesson-row-mark">{done ? '✓' : ''}</span>
                <span>
                  <strong>{item.title}</strong>
                  <p>{item.prompt}</p>
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
