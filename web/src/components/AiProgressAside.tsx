import { Button, Progress, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { AiBackupPanel } from '@/components/AiBackupPanel'
import { AI_NOTES, aiNote, sectionKeyForNote } from '@/data/aiCatalog'
import { AI_DRILL_QUESTIONS, drillById } from '@/data/aiInterviewBank'
import { mainlineProgress, stageProgress } from '@/data/aiPrereq'
import { useProgress } from '@/state/progress'

const AI_MILESTONE_KEYS = [
  'ai-map',
  'l0-verify',
  'first-model-call',
  'retrieve-baseline',
  'l1-kb',
  'controlled-agent',
  'l2-agent',
  'interview-bank',
  'algo-track',
] as const

export function AiProgressAside({ localReady }: { localReady: boolean }) {
  const progress = useProgress()
  const navigate = useNavigate()
  const mainline = mainlineProgress(progress.aiDone)
  const libraryDone = progress.aiDone.length
  const libraryTotal = AI_NOTES.length
  const milestoneNext = AI_MILESTONE_KEYS.map((key) => aiNote(sectionKeyForNote(key), key)).find(
    (note) => note && !progress.aiDone.includes(`ai:${note.key}`),
  )
  const next =
    milestoneNext ||
    AI_NOTES.map((note) => aiNote(note.section, note.key)).find(
      (note) => note && !progress.aiDone.includes(`ai:${note.key}`),
    )
  const recent = progress.aiRecent
    .map((id) => {
      const key = id.replace(/^ai:/, '')
      return aiNote(sectionKeyForNote(key), key)
    })
    .filter(Boolean)
    .slice(0, 4)
  const stages = stageProgress(progress.aiDone)
  const drillScored = Object.keys(progress.aiDrillScores).filter((id) =>
    AI_DRILL_QUESTIONS.some((item) => item.id === id),
  ).length
  const weakDrills = Object.entries(progress.aiDrillScores)
    .filter(([id, score]) => typeof score === 'number' && score <= 2 && drillById(id))
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)

  return (
    <div className="aside-stack">
      <div className="aside-block">
        <span className="aside-label">AI 主线进度</span>
        <div className="progress-figure">{mainline.percent}%</div>
        <Typography.Text type="secondary">
          主线 {mainline.completed}/{mainline.total} · 全库 {libraryDone}/{libraryTotal}
        </Typography.Text>
        <Progress
          percent={mainline.percent}
          showInfo={false}
          strokeColor="var(--lab-accent)"
          railColor="var(--lab-line)"
          size="small"
          style={{ marginTop: 12 }}
        />
      </div>
      <div className="aside-block">
        <h5>阶段</h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {stages.map((stage) => (
            <Typography.Text key={stage.id} type="secondary">
              {stage.label} {stage.completed}/{stage.total}
            </Typography.Text>
          ))}
        </div>
      </div>
      <div className="aside-block">
        <h5>面试自评</h5>
        <Typography.Text type="secondary">
          {drillScored} / {AI_DRILL_QUESTIONS.length} 题已打分
        </Typography.Text>
        {weakDrills.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
            <Typography.Text type="secondary">待补（≤2 分）</Typography.Text>
            {weakDrills.map(([id, score]) => (
              <Link
                key={id}
                className="text-link"
                to={`/ai/interview/interview-bank?drill=${encodeURIComponent(id)}`}
              >
                {id} · {score} 分
              </Link>
            ))}
          </div>
        ) : null}
        <div style={{ marginTop: 8 }}>
          <Link className="text-link" to="/ai/interview/interview-bank">
            打开题库训练台 →
          </Link>
        </div>
      </div>
      <div className="aside-block">
        <h5>下一步</h5>
        {next ? (
          <Link
            className="text-link"
            to={`/ai/${next.section}/${next.key}`}
            onClick={() => progress.rememberAi(`ai:${next.key}`)}
          >
            {next.title} →
          </Link>
        ) : (
          <Typography.Text type="secondary">AI 路线卡片已标记完成，可去复习清单。</Typography.Text>
        )}
      </div>
      <div className="aside-block">
        <h5>最近阅读</h5>
        {recent.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {recent.map((item) =>
              item ? (
                <Link
                  key={item.key}
                  className="text-link"
                  to={`/ai/${item.section}/${item.key}`}
                  onClick={() => progress.rememberAi(`ai:${item.key}`)}
                >
                  {item.title}
                </Link>
              ) : null,
            )}
          </div>
        ) : (
          <Typography.Text type="secondary">打开 AI 课后会显示在这里。</Typography.Text>
        )}
      </div>
      <AiBackupPanel />
      {localReady ? (
        <div className="aside-block">
          <h5>我的本机资料</h5>
          <Button size="small" onClick={() => navigate('/local')}>
            浏览本机题库 →
          </Button>
        </div>
      ) : null}
    </div>
  )
}
