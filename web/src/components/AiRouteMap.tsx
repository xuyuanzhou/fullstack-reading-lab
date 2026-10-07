import { Link } from 'react-router-dom'
import { sectionKeyForNote } from '@/data/aiCatalog'
import { stageProgress } from '@/data/aiPrereq'
import { useProgress } from '@/state/progress'

const MILESTONES: { key: string; label: string; blurb: string }[] = [
  { key: 'ai-map', label: '诊断与全景', blurb: 'M01 · 选路径' },
  { key: 'l0-verify', label: 'L0 无密钥', blurb: '第一次成功' },
  { key: 'first-model-call', label: '第一次调用', blurb: 'M04 · mock' },
  { key: 'retrieve-baseline', label: '检索基线', blurb: 'M06' },
  { key: 'l1-kb', label: 'L1 知识库', blurb: '评测 · ACL' },
  { key: 'controlled-agent', label: '受控 Agent', blurb: 'M08' },
  { key: 'l2-agent', label: 'L2 出行助手', blurb: '审批 · 幂等' },
  { key: 'interview-bank', label: '60 题训练', blurb: 'M12 · 模拟面' },
  { key: 'algo-track', label: '算法支线', blurb: 'A01–A08 · L3' },
]

export function AiRouteMap() {
  const progress = useProgress()
  const stages = stageProgress(progress.aiDone)
  const done = new Set(progress.aiDone)

  return (
    <section className="ai-experiment" style={{ marginBottom: 24 }}>
      <h2 className="page-title">主线地图</h2>
      <p className="muted">
        应用线优先 L0→L1→L2；面试与算法支线可并行。真实 GPU/LLM 需自配，课内 mock 不冒充现场运行。
      </p>
      <div className="lesson-list" style={{ marginBottom: 16 }}>
        {MILESTONES.map((item, index) => {
          const id = `ai:${item.key}`
          const marked = done.has(id)
          return (
            <Link
              key={item.key}
              className={`lesson-row${marked ? ' is-done' : ''}`}
              to={`/ai/${sectionKeyForNote(item.key)}/${item.key}`}
            >
              <span className="lesson-row-mark" aria-hidden>
                {marked ? '✓' : index + 1}
              </span>
              <span>
                <strong>{item.label}</strong>
                <p>{item.blurb}</p>
              </span>
            </Link>
          )
        })}
      </div>
      <p className="muted">
        阶段：{' '}
        {stages.map((stage, index) => (
          <span key={stage.id}>
            {index ? ' · ' : ''}
            {stage.label} {stage.completed}/{stage.total}
          </span>
        ))}
      </p>
      <p>
        <Link to="/ai/lab/prompt">提示词练习台</Link>
        {' · '}
        <Link to="/ai/lab/agent">Agent 练习台</Link>
        {' · '}
        <Link to="/ai/interview/interview-bank">题库训练台</Link>
      </p>
    </section>
  )
}
