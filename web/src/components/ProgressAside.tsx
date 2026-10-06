import { Button, Progress, Space, Typography } from 'antd'
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
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <div>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          YOUR PROGRESS
        </Typography.Text>
        <Typography.Title level={4} style={{ margin: '4px 0 12px' }}>
          学习状态
        </Typography.Title>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {percent}%
        </Typography.Title>
        <Typography.Text type="secondary">
          {completed} / {current.length} 章已掌握
        </Typography.Text>
        <Progress percent={percent} showInfo={false} style={{ marginTop: 12 }} />
      </div>

      <div>
        <Typography.Title level={5}>下一步</Typography.Title>
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

      <div>
        <Typography.Title level={5}>最近阅读</Typography.Title>
        {recent.length ? (
          <Space direction="vertical" size={4}>
            {recent.map((item) =>
              item ? (
                <Button
                  key={item.id}
                  type="link"
                  style={{ paddingInline: 0, height: 'auto', whiteSpace: 'normal', textAlign: 'left' }}
                  onClick={() => {
                    progress.remember(item.id)
                    navigate(`/lesson/${encodeURIComponent(item.id)}`)
                  }}
                >
                  {item.title}
                </Button>
              ) : null,
            )}
          </Space>
        ) : (
          <Typography.Text type="secondary">打开课程后会显示在这里。</Typography.Text>
        )}
      </div>

      {localReady ? (
        <div>
          <Typography.Title level={5}>我的本机资料</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
            已连接本地阅读服务，可逐页查看你的 PDF 与 Word。
          </Typography.Paragraph>
          <Button onClick={() => navigate('/local')}>浏览本机题库 →</Button>
        </div>
      ) : null}

      <div>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          OPEN LEARNING
        </Typography.Text>
        <Typography.Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
          知识卡与练习为原创内容。购买资料和 PDF 密码不会进入网站。学习记录只存在当前浏览器。
        </Typography.Paragraph>
      </div>
    </Space>
  )
}
