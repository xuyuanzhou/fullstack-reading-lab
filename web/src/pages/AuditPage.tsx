import { Alert, Typography } from 'antd'
import { AUDIT_CASES } from '@/data/meta'

export function AuditPage() {
  return (
    <div className="article-shell">
      <div>
        <h1 className="hero-title" style={{ fontSize: '2rem' }}>
          知识核验
        </h1>
        <p className="hero-lead">
          面试资料的说法需要绑定版本、上下文和证据。下面是已经人工确认的典型问题；它们并不代表整份资料都错误。
        </p>
      </div>

      <div className="audit-steps">
        {[
          ['01', '定位原话', '记录原句、章节、页码与适用版本。'],
          ['02', '交叉验证', '查官方文档、标准或固定版本源码。'],
          ['03', '重写解释', '给出反例、边界条件和可复现实验。'],
        ].map(([index, title, body]) => (
          <div className="audit-step" key={index}>
            <small>{index}</small>
            <strong>{title}</strong>
            <p>{body}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="page-title">已核对的典型说法</h2>
        {AUDIT_CASES.map((item, index) => (
          <article className="audit-case" key={item.title}>
            <Typography.Text type="secondary">{String(index + 1).padStart(2, '0')}</Typography.Text>
            <h3 style={{ margin: '6px 0 0', fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>
              {item.title}
            </h3>
            <p className="wrong">{item.wrong}</p>
            <p className="right">{item.right}</p>
            <a href={item.href} target="_blank" rel="noreferrer">
              查看官方依据 ↗
            </a>
          </article>
        ))}
      </section>

      <Alert
        type="warning"
        showIcon
        message="自动关键词扫描只能给出待复核线索，不能替代逐条人工判断。线上课程只发布经过独立编写和核对的解释。"
      />
    </div>
  )
}
