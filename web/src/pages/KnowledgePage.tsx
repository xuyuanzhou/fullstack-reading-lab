import { Button, Input, Typography } from 'antd'
import { useMemo } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { AI_SECTIONS, searchAiNotes } from '@/data/aiCatalog'
import { drillArea, searchAiDrills } from '@/data/aiInterviewBank'
import { groupsFor, lessonsFor } from '@/data/curriculum'
import { shortTitle } from '@/data/reading'
import { groupKeyForLabel, groupTitle, lessonPath } from '@/data/routes'
import { useProgress } from '@/state/progress'

type OutletCtx = { localReady: boolean | null }

export function KnowledgePage() {
  const progress = useProgress()
  const navigate = useNavigate()
  const { localReady } = useOutletContext<OutletCtx>()
  const onAi = progress.localCategory === 'ai'
  const q = (onAi ? progress.aiQuery : progress.query).trim().toLocaleLowerCase()

  const aiCards = useMemo(() => (onAi ? searchAiNotes(q) : []), [onAi, q])
  const aiDrills = useMemo(() => (onAi && q ? searchAiDrills(q).slice(0, 12) : []), [onAi, q])
  const cards = useMemo(
    () =>
      onAi
        ? []
        : lessonsFor(progress.track).filter((item) => {
            if (!q) return true
            const hay = [item.title, item.prompt, item.core, item.keywords, ...item.points]
              .join(' ')
              .toLocaleLowerCase()
            return hay.includes(q)
          }),
    [onAi, progress.track, q],
  )
  const pointCount = onAi
    ? aiCards.reduce((sum, item) => sum + (item.outcomes?.length || 0) + (item.quizzes?.length || 0), 0) +
      aiDrills.length
    : cards.reduce((sum, item) => sum + item.points.length, 0)

  return (
    <div className="article-shell">
      <div>
        <h1 className="hero-title">知识点目录</h1>
        <p className="hero-lead">
          {onAi
            ? '当前路线：AI。搜索标题、术语、成果与题目；不会退回前端/Java 课表。'
            : '当前路线：前端或 Java。按要点找到对应课。切换顶栏 AI 可搜 AI 路线。'}
        </p>
        <div className="toolbar">
          <Input.Search
            className="toolbar-search"
            allowClear
            placeholder={onAi ? '搜索 KV Cache、引用、幂等…' : '搜索知识点、概念或问题…'}
            aria-label="搜索知识点"
            value={onAi ? progress.aiQuery : progress.query}
            onChange={(event) =>
              onAi ? progress.setAiQuery(event.target.value) : progress.setQuery(event.target.value)
            }
          />
          <span className="toolbar-meta">
            {onAi
              ? `${aiCards.length} 篇${aiDrills.length ? ` · ${aiDrills.length} 题` : ''}`
              : `${cards.length} 课`}{' '}
            · {pointCount} 个要点
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

      {onAi && aiDrills.length ? (
        <section className="knowledge-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
            <h2 className="page-title" style={{ margin: 0 }}>
              模拟题（原创）
            </h2>
            <Typography.Text type="secondary">{aiDrills.length} 题</Typography.Text>
          </div>
          {aiDrills.map((item) => (
            <Link
              key={item.id}
              className="knowledge-row"
              to={`/ai/interview/interview-bank?drill=${encodeURIComponent(item.id)}`}
            >
              <strong>
                {item.id} · {drillArea(item)}
              </strong>
              <ul>
                <li>{item.prompt}</li>
              </ul>
            </Link>
          ))}
        </section>
      ) : null}

      {onAi
        ? AI_SECTIONS.map((section) => {
            const items = aiCards.filter((item) => item.section === section.key)
            if (!items.length) return null
            return (
              <section className="knowledge-group" key={section.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
                  <h2 className="page-title" style={{ margin: 0 }}>
                    {section.label}
                  </h2>
                  <Typography.Text type="secondary">{items.length} 篇</Typography.Text>
                </div>
                {items.map((item) => (
                  <Link
                    key={item.key}
                    className="knowledge-row"
                    to={`/ai/${item.section}/${item.key}`}
                    onClick={() => progress.rememberAi(`ai:${item.key}`)}
                  >
                    <strong>{item.title}</strong>
                    <ul>
                      {(item.outcomes || [item.scope]).slice(0, 3).map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </Link>
                ))}
              </section>
            )
          })
        : groupsFor(progress.track).map((group) => {
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

      {(onAi ? !aiCards.length : !cards.length) ? (
        <Typography.Text type="secondary">没有找到匹配知识点，试试更短的关键词。</Typography.Text>
      ) : null}
    </div>
  )
}
