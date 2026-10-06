import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { groupsFor, lessonsFor, lessonsInGroup, totals } from '@/data/curriculum'
import { TRACK_INTRO, TRACK_LABEL } from '@/data/meta'
import { useProgress } from '@/state/progress'

export function HomePage() {
  const progress = useProgress()
  const navigate = useNavigate()
  const current = lessonsFor(progress.track)
  const visible = current.filter((item) => !progress.group || item.group === progress.group)
  const groups = groupsFor(progress.track)
  const next = current.find((item) => !progress.done.includes(item.id)) || current[0]

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <div>
        <Tag color="processing">公开原创课程</Tag>
        <Typography.Title level={2} style={{ marginTop: 12, marginBottom: 8 }}>
          {TRACK_LABEL[progress.track]}，从原理走向实践
        </Typography.Title>
        <Typography.Paragraph style={{ maxWidth: 720, fontSize: 16 }}>
          {TRACK_INTRO[progress.track]}
        </Typography.Paragraph>
        <Space>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              if (!next) return
              progress.remember(next.id)
              navigate(`/lesson/${encodeURIComponent(next.id)}`)
            }}
          >
            继续学习 →
          </Button>
          <Button size="large" onClick={() => navigate('/knowledge')}>
            浏览知识库
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Typography.Text type="secondary">学习章节</Typography.Text>
            <Typography.Title level={3} style={{ margin: '8px 0 0' }}>
              {current.length}
            </Typography.Title>
            <Typography.Text type="secondary">全站 {totals.lessons} 节 · {totals.points} 知识点</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Typography.Text type="secondary">已掌握</Typography.Text>
            <Typography.Title level={3} style={{ margin: '8px 0 0' }}>
              {current.filter((item) => progress.done.includes(item.id)).length}
            </Typography.Title>
            <Typography.Text type="secondary">按自己的节奏推进</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Typography.Text type="secondary">待复习</Typography.Text>
            <Typography.Title level={3} style={{ margin: '8px 0 0' }}>
              {current.filter((item) => progress.review.includes(item.id)).length}
            </Typography.Title>
            <Typography.Text type="secondary">把疑问留给下一轮</Typography.Text>
          </Card>
        </Col>
      </Row>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {groups.map((group, index) => {
          const count = lessonsInGroup(progress.track, group).length
          return (
            <Button
              key={group}
              type={progress.group === group ? 'primary' : 'default'}
              onClick={() => progress.setGroup(group)}
            >
              {String(index + 1).padStart(2, '0')} {group}
              <Typography.Text
                type={progress.group === group ? undefined : 'secondary'}
                style={{ marginLeft: 8, color: progress.group === group ? 'inherit' : undefined }}
              >
                {count}
              </Typography.Text>
            </Button>
          )
        })}
      </div>

      <div>
        <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 12 }}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {progress.group || '课程路线'}
          </Typography.Title>
          <Typography.Text type="secondary">{visible.length} 个知识单元</Typography.Text>
        </Space>
        <Space direction="vertical" size={10} style={{ width: '100%' }}>
          {visible.map((item) => (
            <Card
              key={item.id}
              hoverable
              size="small"
              onClick={() => {
                progress.remember(item.id)
                navigate(`/lesson/${encodeURIComponent(item.id)}`)
              }}
            >
              <Space align="start">
                <Typography.Text>{progress.done.includes(item.id) ? '✓' : '·'}</Typography.Text>
                <div>
                  <Typography.Text strong>{item.title}</Typography.Text>
                  <div className="muted">{item.prompt}</div>
                </div>
              </Space>
            </Card>
          ))}
        </Space>
      </div>
    </Space>
  )
}
