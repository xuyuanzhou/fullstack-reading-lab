import { Empty, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { findLesson } from '@/data/curriculum'
import { shortTitle } from '@/data/reading'
import { lessonPath } from '@/data/routes'
import { useProgress } from '@/state/progress'

export function ReviewPage() {
  const progress = useProgress()
  const saved = progress.review.map((id) => findLesson(id)).filter(Boolean)

  return (
    <div className="article-shell">
      <div>
        <h1 className="hero-title">
          复习清单
        </h1>
        <p className="hero-lead">把还讲不清的概念留在这里。下一次先遮住答案，试着从问题推导机制。</p>
      </div>

      {saved.length ? (
        <div className="lesson-list">
          {saved.map((item) =>
            item ? (
              <Link
                key={item.id}
                className="lesson-row"
                to={lessonPath(item)}
                onClick={() => progress.remember(item.id)}
              >
                <span className="lesson-row-mark">·</span>
                <span>
                  <strong>{shortTitle(item.title)}</strong>
                  <p>{item.prompt}</p>
                </span>
              </Link>
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
