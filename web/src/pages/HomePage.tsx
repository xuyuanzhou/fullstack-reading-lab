import { Button, Space, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { groupsFor, lessonsFor, lessonsInGroup, totals } from '@/data/curriculum'
import { TRACK_INTRO, TRACK_LABEL } from '@/data/meta'
import { useProgress } from '@/state/progress'

export function HomePage() {
  const progress = useProgress()
  const navigate = useNavigate()
  const current = lessonsFor(progress.track)
  const visible = current.filter((item) => !progress.group || item.group === progress.group)
  const groups = groupsFor(progress.track)
  const next = current.find((item) => !progress.done.includes(item.id)) || current[0]
  const doneCount = current.filter((item) => progress.done.includes(item.id)).length
  const reviewCount = current.filter((item) => progress.review.includes(item.id)).length

  return (
    <div className="article-shell">
      <div className="page-kicker">
        <Tag color="success">公开原创课程</Tag>
        <Typography.Text type="secondary">
          {totals.lessons} 节 · {totals.points} 知识点
        </Typography.Text>
      </div>

      <div>
        <h1 className="hero-title">
          {TRACK_LABEL[progress.track]}，从原理走向实践
        </h1>
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

      <div className="stat-strip">
        <div className="stat-card">
          <small>学习章节</small>
          <strong>{current.length}</strong>
          <span>分层建立知识体系</span>
        </div>
        <div className="stat-card">
          <small>已掌握</small>
          <strong>{doneCount}</strong>
          <span>按自己的节奏推进</span>
        </div>
        <div className="stat-card">
          <small>待复习</small>
          <strong>{reviewCount}</strong>
          <span>把疑问留给下一轮</span>
        </div>
      </div>

      <div className="stage-rail" aria-label="学习阶段">
        {groups.map((group, index) => {
          const count = lessonsInGroup(progress.track, group).length
          const active = progress.group === group
          return (
            <Button
              key={group}
              className={`stage-chip${active ? ' is-active' : ''}`}
              onClick={() => progress.setGroup(group)}
            >
              {String(index + 1).padStart(2, '0')} {group}
              <small>{count}</small>
            </Button>
          )
        })}
      </div>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
          <Typography.Title level={3} style={{ margin: 0, fontFamily: 'var(--font-serif)' }}>
            {progress.group || '课程路线'}
          </Typography.Title>
          <Typography.Text type="secondary">{visible.length} 个知识单元</Typography.Text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
