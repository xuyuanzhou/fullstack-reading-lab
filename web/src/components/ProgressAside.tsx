import { Button, Progress, Typography } from 'antd'
import { lazy, Suspense } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { findLesson, lessonsFor } from '@/data/curriculum'
import { PATHS, deliverableKey, gateCleared, spineNextId, spinePlace } from '@/data/learningPaths'
import { shortTitle } from '@/data/reading'
import { lessonPath } from '@/data/routes'
import { useProgress } from '@/state/progress'

const AiProgressAside = lazy(() =>
  import('@/components/AiProgressAside').then((m) => ({ default: m.AiProgressAside })),
)

export function ProgressAside({ localReady }: { localReady: boolean }) {
  const progress = useProgress()
  const navigate = useNavigate()
  const location = useLocation()
  const onPath = location.pathname === '/paths' || location.pathname.startsWith('/paths/')
  const pathParts = location.pathname.split('/').filter(Boolean)
  const readingId = pathParts.length === 3 && (pathParts[0] === 'frontend' || pathParts[0] === 'java') ? pathParts[2] : ''
  const spine = readingId ? spinePlace(readingId) : undefined
  const spineNext = spine ? findLesson(spineNextId(readingId) || '') : undefined
  const onCourse = onPath || pathParts[0] === 'frontend' || pathParts[0] === 'java'
  const onAiRoute = location.pathname === '/ai' || location.pathname.startsWith('/ai/')
  const onAi = onAiRoute || (!onCourse && progress.localCategory === 'ai')

  if (onAi) {
    return (
      <Suspense fallback={<div className="aside-stack"><Typography.Text type="secondary">加载 AI 进度…</Typography.Text></div>}>
        <AiProgressAside localReady={localReady} />
      </Suspense>
    )
  }

  const checks = progress.pathChecks ?? []
  const openIndex = PATHS.architect.gates.findIndex((stage) => !gateCleared(stage, progress.done, checks))
  const gateIndex = spine ? spine.index : openIndex === -1 ? PATHS.architect.gates.length - 1 : openIndex
  const focus = spine?.gate ?? (onPath ? PATHS.architect.gates[gateIndex] : undefined)
  const current = lessonsFor(progress.track)
  const lessonDone = focus ? focus.lessons.filter((item) => progress.done.includes(item.id)).length : 0
  const lessonTotal = focus?.lessons.length ?? 0
  const checkDone = focus ? focus.outputs.filter((_, index) => checks.includes(deliverableKey(focus.id, index))).length : 0
  const checkTotal = focus?.outputs.length ?? 0
  const completed = focus ? lessonDone : current.filter((lesson) => progress.done.includes(lesson.id)).length
  const total = focus ? lessonTotal : current.length
  const percent = focus
    ? (lessonTotal ? Math.round((100 * lessonDone) / lessonTotal) : checkTotal ? Math.round((100 * checkDone) / checkTotal) : 0)
    : total ? Math.round((100 * completed) / total) : 0
  const unreadInGate = focus?.lessons.map((item) => findLesson(item.id)).find((lesson) => lesson && !progress.done.includes(lesson.id))
  const next = spine ? spineNext : focus ? unreadInGate : current.find((lesson) => !progress.done.includes(lesson.id))
  const waitingOnDelivery = Boolean(focus && !unreadInGate && checkDone < checkTotal)
  const recent = progress.recent
    .map((id) => findLesson(id))
    .filter((item) => item && item.track === progress.track)
    .slice(0, 4)

  return (
    <div className="aside-stack">
      <div className="aside-block">
        <span className="aside-label">{focus ? `第 ${gateIndex + 1} 关` : '进度'}</span>
        <div className="progress-figure">{percent}%</div>
        <Typography.Text type="secondary">
          {focus
            ? lessonTotal
              ? `已读 ${lessonDone}/${lessonTotal} · 交付 ${checkDone}/${checkTotal}`
              : `交付 ${checkDone}/${checkTotal}`
            : `${completed} / ${total} 课已掌握`}
        </Typography.Text>
        <Progress
          percent={percent}
          showInfo={false}
          strokeColor="var(--lab-accent)"
          railColor="var(--lab-line)"
          size="small"
          style={{ marginTop: 12 }}
        />
      </div>

      <div className="aside-block">
        <h5>下一步</h5>
        {waitingOnDelivery ? (
          spine ? (
            <Link className="text-link" to="/paths?focus=deliver">
              回去勾这一关的交付 →
            </Link>
          ) : (
            <Typography.Text type="secondary">勾上这一关的交付，下一关才会打开。</Typography.Text>
          )
        ) : spine && !next ? (
          <Link className="text-link" to="/paths?focus=deliver">
            回去交这一关的交付物 →
          </Link>
        ) : next ? (
          <Link
            className="text-link"
            to={lessonPath(next)}
            onClick={() => progress.remember(next.id)}
          >
            {shortTitle(next.title)} →
          </Link>
        ) : (
          <Typography.Text type="secondary">
            {onPath ? '点名必读已读完。过关仍看交付物。' : '当前路线全部完成，可以进入复习清单。'}
          </Typography.Text>
        )}
      </div>

      <div className="aside-block">
        <h5>最近阅读</h5>
        {recent.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {recent.map((item) =>
              item ? (
                <Link
                  key={item.id}
                  className="text-link"
                  to={lessonPath(item)}
                  onClick={() => progress.remember(item.id)}
                >
                  {shortTitle(item.title)}
                </Link>
              ) : null,
            )}
          </div>
        ) : (
          <Typography.Text type="secondary">打开课程后会显示在这里。</Typography.Text>
        )}
      </div>

      {localReady ? (
        <div className="aside-block">
          <h5>我的本机资料</h5>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 10, fontSize: 13 }}>
            已连接本地阅读服务。
          </Typography.Paragraph>
          <Button size="small" onClick={() => navigate('/local')}>
            浏览本机题库 →
          </Button>
        </div>
      ) : null}

      <div className="aside-block">
        <span className="aside-label">Open learning</span>
        <Typography.Paragraph style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }} type="secondary">
          知识卡与练习为原创内容。购买资料和 PDF 密码不会进入网站。学习记录只存在当前浏览器。
        </Typography.Paragraph>
      </div>
    </div>
  )
}
