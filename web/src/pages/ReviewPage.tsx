import { Empty, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { AI_NOTES, aiNote, sectionKeyForNote } from '@/data/aiCatalog'
import { findLesson } from '@/data/curriculum'
import { shortTitle } from '@/data/reading'
import { lessonPath } from '@/data/routes'
import { useProgress } from '@/state/progress'

export function ReviewPage() {
  const progress = useProgress()
  const onAi = progress.localCategory === 'ai'
  const saved = onAi
    ? progress.aiReview
        .map((id) => {
          const key = id.replace(/^ai:/, '')
          const section = sectionKeyForNote(key)
          return aiNote(section, key) || AI_NOTES.find((item) => item.key === key)
        })
        .filter(Boolean)
    : progress.review.map((id) => findLesson(id)).filter(Boolean)

  return (
    <div className="article-shell">
      <div>
        <h1 className="hero-title">复习清单</h1>
        <p className="hero-lead">
          {onAi
            ? '当前是 AI 路线的待复习。答案默认折叠在各课里；前端/Java 清单互不混入。'
            : '把还讲不清的概念留在这里。下一次先遮住答案，试着从问题推导机制。'}
        </p>
      </div>

      {saved.length ? (
        <div className="lesson-list">
          {onAi
            ? saved.map((item) =>
                item && 'section' in item ? (
                  <Link
                    key={item.key}
                    className="lesson-row"
                    to={`/ai/${item.section}/${item.key}`}
                    onClick={() => progress.rememberAi(`ai:${item.key}`)}
                  >
                    <span className="lesson-row-mark">·</span>
                    <span>
                      <strong>{item.title}</strong>
                      <p>{item.scope}</p>
                    </span>
                  </Link>
                ) : null,
              )
            : saved.map((item) =>
                item && 'id' in item ? (
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
        <Empty description={onAi ? '暂无 AI 待复习。在 AI 课里点“加入复习清单”。' : '暂无待复习课程。学习时可点击“加入复习清单”。'} />
      )}

      {!saved.length ? null : (
        <Typography.Text type="secondary">{saved.length} 个待复习知识单元</Typography.Text>
      )}
    </div>
  )
}
