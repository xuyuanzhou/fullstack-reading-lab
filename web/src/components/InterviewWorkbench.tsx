import { Button, Collapse, Radio, Select, Typography } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  AI_DRILL_AREAS,
  AI_DRILL_DISCLAIMER,
  AI_DRILL_EDITOR_TARGET,
  AI_DRILL_QUESTIONS,
  AI_MOCK_INTERVIEWS,
  AI_SCORE_RUBRIC,
  countDrillsByArea,
  drillArea,
  drillById,
  drillsInArea,
  type AiDrillArea,
} from '@/data/aiInterviewBank'
import { sectionKeyForNote } from '@/data/aiCatalog'
import { useProgress } from '@/state/progress'

export function InterviewWorkbench({
  filterIds,
  compact = false,
}: {
  filterIds?: string[]
  compact?: boolean
}) {
  const progress = useProgress()
  const [searchParams] = useSearchParams()
  const drillParam = searchParams.get('drill') || ''
  const appliedDrill = useRef('')
  const [area, setArea] = useState<AiDrillArea | 'all'>('all')
  const areaCounts = useMemo(() => countDrillsByArea(), [])

  const questions = useMemo(() => {
    const pool = filterIds?.length
      ? (filterIds.map((id) => drillById(id)).filter(Boolean) as typeof AI_DRILL_QUESTIONS)
      : drillsInArea(area)
    return pool
  }, [filterIds, area])

  const [activeId, setActiveId] = useState(questions[0]?.id || '')
  useEffect(() => {
    if (drillParam && drillParam !== appliedDrill.current && drillById(drillParam)) {
      appliedDrill.current = drillParam
      setArea('all')
      setActiveId(drillParam)
      return
    }
    if (!questions.some((item) => item.id === activeId)) {
      setActiveId(questions[0]?.id || '')
    }
  }, [questions, activeId, drillParam])

  const active = drillById(activeId) || questions[0]
  if (!active) return null

  const scored = Object.keys(progress.aiDrillScores).filter((id) =>
    AI_DRILL_QUESTIONS.some((item) => item.id === id),
  ).length

  return (
    <section className="ai-experiment">
      <h2 className="page-title">面试题训练台（原创模拟）</h2>
      <p className="muted">
        {AI_DRILL_DISCLAIMER} 当前 {AI_DRILL_QUESTIONS.length}/{AI_DRILL_EDITOR_TARGET} 题 · 已自评{' '}
        {scored} 题。
      </p>
      <p className="muted">评分参考：{AI_SCORE_RUBRIC.join('；')}</p>
      {!compact ? (
        <div style={{ marginBottom: 12 }}>
          <Typography.Text type="secondary">三套模拟：</Typography.Text>
          <ul>
            {AI_MOCK_INTERVIEWS.map((mock) => (
              <li key={mock.id}>
                <strong>{mock.title}</strong>（约 {mock.durationMin} 分钟）— {mock.focus}
              </li>
            ))}
          </ul>
          <Typography.Text type="secondary">七域题量：</Typography.Text>
          <ul>
            {AI_DRILL_AREAS.map((name) => (
              <li key={name}>
                {name}：{areaCounts[name]}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        {!filterIds?.length ? (
          <Select
            value={area}
            style={{ minWidth: 220 }}
            onChange={setArea}
            options={[
              { value: 'all', label: `全部域（${AI_DRILL_QUESTIONS.length}）` },
              ...AI_DRILL_AREAS.map((name) => ({
                value: name,
                label: `${name}（${areaCounts[name]}）`,
              })),
            ]}
          />
        ) : null}
        <Select
          value={active.id}
          style={{ minWidth: 280 }}
          onChange={setActiveId}
          options={questions.map((item) => ({
            value: item.id,
            label: `${item.id} · ${drillArea(item)}`,
          }))}
        />
        <Button
          onClick={() => {
            const next = questions[Math.floor(Math.random() * questions.length)]
            if (next) setActiveId(next.id)
          }}
        >
          随机一题
        </Button>
      </div>
      <Typography.Paragraph>
        <strong>{active.prompt}</strong>
      </Typography.Paragraph>
      <p className="muted">
        域 {drillArea(active)} · 路线 {active.track} · 难度 {active.difficulty} · 先修{' '}
        {active.prerequisites.map((key, index) => (
          <span key={key}>
            {index ? '、' : ''}
            <Link to={`/ai/${sectionKeyForNote(key)}/${key}`}>{key}</Link>
          </span>
        ))}
      </p>
      <Collapse
        bordered={false}
        style={{ background: 'transparent', marginBottom: 12 }}
        items={[
          {
            key: 'short',
            label: '先自己答，再展开：30 秒结论',
            children: <p>{active.answerShort}</p>,
          },
          {
            key: 'deep',
            label: '2–3 分钟机制',
            children: <p>{active.answerDeep}</p>,
          },
          {
            key: 'follow',
            label: '追问与边界',
            children: (
              <ul>
                {active.followUps.map((item) => (
                  <li key={item.question}>
                    <strong>{item.question}</strong>
                    <div>要点：{item.points.join('；')}</div>
                    {item.counterexample ? <div>反例：{item.counterexample}</div> : null}
                    {item.boundary ? <div>边界：{item.boundary}</div> : null}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            key: 'mistakes',
            label: '常见错误与评分点',
            children: (
              <div>
                <p>错因：{active.commonMistakes.join('；')}</p>
                <p>必须说到：{active.mustSay.join('；')}</p>
                <p>评分点：{active.scoring.join('；')}</p>
                <p>
                  补课：
                  {active.lessonKeys.map((key, index) => (
                    <span key={key}>
                      {index ? '、' : ''}
                      <Link to={`/ai/${sectionKeyForNote(key)}/${key}`}>{key}</Link>
                    </span>
                  ))}
                </p>
              </div>
            ),
          },
        ]}
      />
      <div>
        <Typography.Text>本题自评（0–4）：</Typography.Text>
        <Radio.Group
          style={{ marginLeft: 8 }}
          value={progress.aiDrillScores[active.id]}
          onChange={(event) => progress.setAiDrillScore(active.id, event.target.value)}
          options={[0, 1, 2, 3, 4].map((value) => ({ label: String(value), value }))}
        />
      </div>
    </section>
  )
}
