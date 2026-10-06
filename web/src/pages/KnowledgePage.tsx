import { Alert, Button, Input, Space, Typography } from 'antd'
import { useMemo } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { groupsFor, lessonsFor } from '@/data/curriculum'
import { useProgress } from '@/state/progress'

type OutletCtx = { localReady: boolean }

export function KnowledgePage() {
  const progress = useProgress()
  const navigate = useNavigate()
  const { localReady } = useOutletContext<OutletCtx>()
  const q = progress.query.trim().toLocaleLowerCase()
  const cards = useMemo(
    () =>
      lessonsFor(progress.track).filter((item) => {
        if (!q) return true
        const hay = [item.title, item.prompt, item.core, item.keywords, ...item.points]
          .join(' ')
          .toLocaleLowerCase()
        return hay.includes(q)
      }),
    [progress.track, q],
  )
  const pointCount = cards.reduce((sum, item) => sum + item.points.length, 0)

  return (
    <div className="article-shell">
      <div>
        <h1 className="hero-title" style={{ fontSize: '2rem' }}>
          知识点目录
        </h1>
        <p className="hero-lead">
          按知识点找到对应课程，再阅读解释、动手练习和核对依据。当前目录覆盖已编写的原创课程，不代表本机题库已全部核验。
        </p>
        <Space style={{ width: '100%', justifyContent: 'space-between' }} wrap>
          <Input.Search
            allowClear
            placeholder="搜索知识点、概念或问题…"
            value={progress.query}
            onChange={(event) => progress.setQuery(event.target.value)}
            style={{ maxWidth: 420 }}
          />
          <Typography.Text type="secondary">
            {cards.length} 课 · {pointCount} 个知识点
          </Typography.Text>
        </Space>
      </div>

      {localReady ? (
        <Alert
          type="info"
          showIcon
          message="已连接本机资料"
          description="你可以额外阅读自己的 PDF/Word，并逐页核验原始内容。"
          action={
            <Button size="small" onClick={() => navigate('/local')}>
              打开本机资料
            </Button>
          }
        />
      ) : null}

      {groupsFor(progress.track).map((group) => {
        const items = cards.filter((item) => item.group === group)
        if (!items.length) return null
        return (
          <section className="knowledge-group" key={group}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
              <h2 className="page-title" style={{ margin: 0 }}>
                {group}
              </h2>
              <Typography.Text type="secondary">
                {items.length} 课 · {items.reduce((sum, item) => sum + item.points.length, 0)} 点
              </Typography.Text>
            </div>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                className="knowledge-row"
                onClick={() => {
                  progress.remember(item.id)
                  navigate(`/lesson/${encodeURIComponent(item.id)}`)
                }}
              >
                <strong>{item.title}</strong>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </button>
            ))}
          </section>
        )
      })}

      {!cards.length ? (
        <Typography.Text type="secondary">没有找到匹配知识点，试试更短的关键词。</Typography.Text>
      ) : null}
    </div>
  )
}
