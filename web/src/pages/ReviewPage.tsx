import { Empty, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { findLesson } from '@/data/curriculum'
import { useProgress } from '@/state/progress'

export function ReviewPage() {
  const progress = useProgress()
  const navigate = useNavigate()
  const saved = progress.review.map((id) => findLesson(id)).filter(Boolean)

  return (
    <div className="article-shell">
      <div>
        <h1 className="hero-title" style={{ fontSize: '2rem' }}>
          复习清单
        </h1>
        <p className="hero-lead">把还讲不清的概念留在这里。下一次先遮住答案，试着从问题推导机制。</p>
      </div>

      {saved.length ? (
        <div className="lesson-list">
          {saved.map((item) =>
            item ? (
              <button
                key={item.id}
                type="button"
                className="lesson-row"
                onClick={() => {
                  progress.remember(item.id)
                  navigate(`/lesson/${encodeURIComponent(item.id)}`)
                }}
              >
                <span className="lesson-row-mark">·</span>
                <span>
                  <strong>{item.title}</strong>
                  <p>{item.prompt}</p>
                </span>
              </button>
            ) : null,
          )}
        </div>
      ) : (
        <Empty description="暂无待复习课程。学习时可点击“加入复习清单”。" />
      )}

      {!saved.length ? null : (
        <Typography.Text type="secondary">{saved.length} 个待复习知识单元</Typography.Text>
      )}
    </div>
  )
}
