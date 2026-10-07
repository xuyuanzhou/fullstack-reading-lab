import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { sectionKeyForNote } from '@/data/aiCatalog'
import { missingPrereqs, stageProgress } from '@/data/aiPrereq'
import { useProgress } from '@/state/progress'

export function AiPrereqGate({ noteKey }: { noteKey: string }) {
  const progress = useProgress()
  const status = missingPrereqs(noteKey, progress.aiDone, progress.aiSkippedPrereq)
  const stages = stageProgress(progress.aiDone)

  return (
    <section className="ai-experiment" style={{ marginBottom: 16 }}>
      <h2 className="page-title">先修与阶段</h2>
      <p className="muted">
        阶段提示：{status.stageHint}。缺前置时可跳过，不锁课；熟手请自行判断。
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {stages.map((stage) => (
          <Typography.Text key={stage.id} type="secondary">
            {stage.label} {stage.completed}/{stage.total}
          </Typography.Text>
        ))}
      </div>
      {status.ready ? (
        <Typography.Text>先修已满足（或已跳过）。</Typography.Text>
      ) : (
        <>
          <p>你还缺：</p>
          <ul>
            {status.missing.map((item) => (
              <li key={item.key}>
                <Link to={`/ai/${sectionKeyForNote(item.key)}/${item.key}`}>{item.title}</Link>
                <span className="muted">（{item.key}）</span>
              </li>
            ))}
          </ul>
          <Button size="small" onClick={() => progress.skipAiPrereq(noteKey)}>
            跳过先修，继续读本课
          </Button>
        </>
      )}
    </section>
  )
}
