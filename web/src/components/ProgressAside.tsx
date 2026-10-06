import { Button, Progress, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { findLesson, lessonsFor } from '@/data/curriculum'
import { useProgress } from '@/state/progress'

export function ProgressAside({ localReady }: { localReady: boolean }) {
  const progress = useProgress()
  const navigate = useNavigate()
  const current = lessonsFor(progress.track)
  const completed = current.filter((lesson) => progress.done.includes(lesson.id)).length
  const percent = current.length ? Math.round((100 * completed) / current.length) : 0
  const next = current.find((lesson) => !progress.done.includes(lesson.id))
  const recent = progress.recent
    .map((id) => findLesson(id))
    .filter((item) => item && item.track === progress.track)
    .slice(0, 4)

  return (
    <div className="aside-stack">
      <div className="aside-block">
        <span className="aside-label">Your progress</span>
        <div className="progress-figure">{percent}%</div>
        <Typography.Text type="secondary">
          {completed} / {current.length} 章已掌握
        </Typography.Text>
        <Progress
          percent={percent}
          showInfo={false}
          strokeColor="var(--lab-accent)"
          trailColor="var(--lab-line)"
          size="small"
          style={{ marginTop: 12 }}
        />
      </div>

      <div className="aside-block">
        <h5>下一步</h5>
        {next ? (
          <Button
            type="link"
            style={{ paddingInline: 0, whiteSpace: 'normal', textAlign: 'left', height: 'auto' }}
            onClick={() => {
              progress.remember(next.id)
              navigate(`/lesson/${encodeURIComponent(next.id)}`)
            }}
          >
            {next.title} →
          </Button>
        ) : (
          <Typography.Text type="secondary">当前路线全部完成，可以进入复习清单。</Typography.Text>
        )}
      </div>

      <div className="aside-block">
        <h5>最近阅读</h5>
        {recent.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {recent.map((item) =>
              item ? (
                <Button
                  key={item.id}
                  type="link"
                  style={{
                    paddingInline: 0,
                    height: 'auto',
                    whiteSpace: 'normal',
                    textAlign: 'left',
                  }}
                  onClick={() => {
                    progress.remember(item.id)
                    navigate(`/lesson/${encodeURIComponent(item.id)}`)
                  }}
                >
                  {item.title}
                </Button>
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
