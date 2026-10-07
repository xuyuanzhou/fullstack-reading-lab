import { Empty, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { AI_NOTES, aiNote, sectionKeyForNote } from '@/data/aiCatalog'
import { AI_DRILL_QUESTIONS, drillById, drillArea } from '@/data/aiInterviewBank'
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
  const weakDrills = onAi
    ? Object.entries(progress.aiDrillScores)
        .filter(([id, score]) => typeof score === 'number' && score <= 2 && drillById(id))
        .sort((a, b) => a[1] - b[1])
    : []

  return (
    <div className="article-shell">
      <div>
        <h1 className="hero-title">复习清单</h1>
        <p className="hero-lead">
          {onAi
            ? '当前是 AI 路线的待复习与低分模拟题。答案默认折叠；前端/Java 清单互不混入。'
            : '把还讲不清的概念留在这里。下一次先遮住答案，试着从问题推导机制。'}
        </p>
      </div>

      {onAi && weakDrills.length ? (
        <section style={{ marginBottom: 24 }}>
          <h2 className="page-title">面试自评 ≤2 分</h2>
          <div className="lesson-list">
            {weakDrills.map(([id, score]) => {
              const item = drillById(id)!
              return (
                <Link
                  key={id}
                  className="lesson-row"
                  to={`/ai/interview/interview-bank?drill=${encodeURIComponent(id)}`}
                >
                  <span className="lesson-row-mark">{score}</span>
                  <span>
                    <strong>
                      {id} · {drillArea(item)}
                    </strong>
                    <p>{item.prompt}</p>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}

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
        <Empty
          description={
            onAi
              ? weakDrills.length
                ? '课内待复习为空；可先练上方低分题。'
                : '暂无 AI 待复习。在 AI 课里点“加入复习清单”，或在题库自评。'
              : '暂无待复习课程。学习时可点击“加入复习清单”。'
          }
        />
      )}

      {saved.length || (onAi && weakDrills.length) ? (
        <Typography.Text type="secondary">
          {saved.length} 个待复习课
          {onAi && weakDrills.length ? ` · ${weakDrills.length} 道低分模拟题` : ''}
          {!onAi ? '' : ` · 题库共 ${AI_DRILL_QUESTIONS.length} 题`}
        </Typography.Text>
      ) : null}
    </div>
  )
}
