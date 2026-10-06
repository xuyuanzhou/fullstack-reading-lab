import { Alert, Card, Col, Row, Space, Typography } from 'antd'
import { AUDIT_CASES } from '@/data/meta'

export function AuditPage() {
  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ marginBottom: 8 }}>
          知识核验
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          面试资料的说法需要绑定版本、上下文和证据。下面是已经人工确认的典型问题；它们并不代表整份资料都错误。
        </Typography.Paragraph>
      </div>

      <Row gutter={[12, 12]}>
        {[
          ['01', '定位原话', '记录原句、章节、页码与适用版本。'],
          ['02', '交叉验证', '查官方文档、标准或固定版本源码。'],
          ['03', '重写解释', '给出反例、边界条件和可复现实验。'],
        ].map(([index, title, body]) => (
          <Col xs={24} md={8} key={index}>
            <Card size="small">
              <Typography.Text type="secondary">{index}</Typography.Text>
              <Typography.Title level={5} style={{ marginTop: 4 }}>
                {title}
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                {body}
              </Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      <Typography.Title level={3}>已核对的典型说法</Typography.Title>
      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        {AUDIT_CASES.map((item, index) => (
          <Card key={item.title} size="small">
            <Typography.Text type="secondary">{String(index + 1).padStart(2, '0')}</Typography.Text>
            <Typography.Title level={4} style={{ marginTop: 4 }}>
              {item.title}
            </Typography.Title>
            <Typography.Paragraph type="danger">{item.wrong}</Typography.Paragraph>
            <Typography.Paragraph>{item.right}</Typography.Paragraph>
            <a href={item.href} target="_blank" rel="noreferrer">
              查看官方依据 ↗
            </a>
          </Card>
        ))}
      </Space>

      <Alert
        type="warning"
        showIcon
        message="自动关键词扫描只能给出待复核线索，不能替代逐条人工判断。线上课程只发布经过独立编写和核对的解释。"
      />
    </Space>
  )
}
