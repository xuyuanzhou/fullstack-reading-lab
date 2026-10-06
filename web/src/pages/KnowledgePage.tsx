import { Button, Input, Typography } from 'antd'
import { useMemo } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { groupsFor, lessonsFor } from '@/data/curriculum'
import { shortTitle } from '@/data/reading'
import { groupKeyForLabel, groupTitle, lessonPath } from '@/data/routes'
import { useProgress } from '@/state/progress'

type OutletCtx = { localReady: boolean | null }

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
        <h1 className="hero-title">
          知识点目录
        </h1>
        <p className="hero-lead">
          按要点找到对应课。当前目录只覆盖已写好的公开课，不代表本机题库已全部核验。
        </p>
        <div className="toolbar">
          <Input.Search
            className="toolbar-search"
            allowClear
            placeholder="搜索知识点、概念或问题…"
            aria-label="搜索知识点"
            value={progress.query}
            onChange={(event) => progress.setQuery(event.target.value)}
          />
          <span className="toolbar-meta">
            {cards.length} 课 · {pointCount} 个知识点
          </span>
        </div>
      </div>

      {localReady ? (
        <div className="notice-bar">
          <div>
            <strong>已连接本机资料</strong>
            <p>你可以额外阅读自己的 PDF/Word，并逐页核验原始内容。</p>
          </div>
          <Button onClick={() => navigate('/local')}>打开本机资料</Button>
        </div>
      ) : null}

      {groupsFor(progress.track).map((group) => {
        const items = cards.filter((item) => item.group === group)
        if (!items.length) return null
        return (
          <section className="knowledge-group" key={group}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
              <h2 className="page-title" style={{ margin: 0 }}>
                {groupTitle(progress.track, groupKeyForLabel(progress.track, group))}
              </h2>
              <Typography.Text type="secondary">
                {items.length} 课 · {items.reduce((sum, item) => sum + item.points.length, 0)} 点
              </Typography.Text>
            </div>
            {items.map((item) => (
              <Link
                key={item.id}
                className="knowledge-row"
                to={lessonPath(item)}
                onClick={() => progress.remember(item.id)}
              >
                <strong>{shortTitle(item.title)}</strong>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Link>
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
