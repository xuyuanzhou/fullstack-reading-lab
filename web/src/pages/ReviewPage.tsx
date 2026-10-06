import { Card, Empty, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { findLesson } from '@/data/curriculum'
import { useProgress } from '@/state/progress'

export function ReviewPage() {
  const progress = useProgress()
  const navigate = useNavigate()
  const saved = progress.review.map((id) => findLesson(id)).filter(Boolean)

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ marginBottom: 8 }}>
          复习清单
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          把还讲不清的概念留在这里。下一次先遮住答案，试着从问题推导机制。
        </Typography.Paragraph>
      </div>

      {saved.length ? (
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          {saved.map((item) =>
            item ? (
              <Card
                key={item.id}
                hoverable
                size="small"
                onClick={() => {
                  progress.remember(item.id)
                  navigate(`/lesson/${encodeURIComponent(item.id)}`)
                }}
              >
                <Typography.Text strong>{item.title}</Typography.Text>
                <div className="muted">{item.prompt}</div>
              </Card>
            ) : null,
          )}
        </Space>
      ) : (
        <Empty description="暂无待复习课程。学习时可点击“加入复习清单”。" />
      )}
    </Space>
  )
}
