import { Breadcrumb, Button, Collapse, Image, Input, Space, Typography } from 'antd'
import { Link, Navigate, useParams } from 'react-router-dom'
import { findLesson, lessonIndex, nextLesson } from '@/data/curriculum'
import { groupKeyForLabel, groupPath, isTrack, lessonPath } from '@/data/routes'
import { REACT_CHAPTERS, VUE_CHAPTERS, reactUrl, vueUrl } from '@/data/meta'
import { useProgress } from '@/state/progress'
import { LessonOutline } from '@/components/LessonOutline'

export function LessonPage() {
  const { track = '', groupKey = '', lessonId = '' } = useParams()
  const lesson = findLesson(lessonId)
  const progress = useProgress()

  if (!lesson || !isTrack(lesson.track)) return <Navigate to="/" replace />
  const chapterKey = groupKeyForLabel(lesson.track, lesson.group)
  if (track !== lesson.track || groupKey !== chapterKey) return <Navigate to={lessonPath(lesson)} replace />
  const chapterPath = groupPath(lesson.track, chapterKey)

  const index = lessonIndex(lesson.track, lesson.id)
  const next = nextLesson(lesson.track, lesson.id)
  const source =
    lesson.react && REACT_CHAPTERS[lesson.react]
      ? {
          href: reactUrl(lesson.react),
          title: '在 React Mastery Lab 中追踪源码',
          detail: 'React v19.3.0',
        }
      : lesson.vue && VUE_CHAPTERS[lesson.vue]
        ? {
            href: vueUrl(lesson.vue),
            title: '在 Vue 3 Mastery Lab 中追踪源码',
            detail: 'Vue v3.5.43',
          }
        : null

  return (
    <article className="article-shell">
      <Breadcrumb
        items={[
          { title: <Link to={chapterPath}>学习路线</Link> },
          { title: <Link to={chapterPath}>{lesson.group}</Link> },
          { title: lesson.title },
        ]}
      />

      <header className="lesson-hero">
        <div className="eyebrow">
          Lesson {String(index + 1).padStart(2, '0')} · {lesson.group}
        </div>
        <h1>{lesson.title}</h1>
        <p className="prompt-box">{lesson.prompt}</p>
        <div className="meta-line">
          <span>原创课程</span>
          <span>{lesson.references.length} 项核对依据</span>
        </div>
      </header>

      <details className="compact-outline">
        <summary>本课目录 · 快速跳转</summary>
        <LessonOutline lesson={lesson} />
      </details>

      <div className="lesson-with-outline">
      <LessonOutline lesson={lesson} />
      <div className="lesson-body">

      <section className="section-block" id="lesson-points" tabIndex={-1}>
        <span className="section-index">Knowledge points</span>
        <h2>本课知识点</h2>
        <ul className="point-list">
          {lesson.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="core-panel" id="lesson-model" tabIndex={-1}>
        <span className="panel-label">01 / 核心模型</span>
        <p className="lesson-core">{lesson.core}</p>
      </section>

      {lesson.deep?.length ? (
        <section className="section-block" id="lesson-mechanism" tabIndex={-1}>
          <span className="section-index">Deep dive</span>
          <h2>机制拆解</h2>
          {lesson.diagram ? (
            <Image
              src={`${import.meta.env.BASE_URL}${lesson.diagram}`}
              alt={`${lesson.title} 原创机制图`}
              style={{ marginBottom: 16, maxWidth: '100%', borderRadius: 10 }}
            />
          ) : null}
          <div className="deep-stack">
            {lesson.deep.map((part) => (
              <div className="deep-item" key={part.title}>
                <h3>{part.title}</h3>
                <p>{part.body}</p>
              </div>
            ))}
          </div>
          {lesson.origin ? (
            <Typography.Paragraph type="secondary" style={{ marginTop: 16, marginBottom: 0 }}>
              选题线索：{lesson.origin}。讲解与示意图均重新编写。
            </Typography.Paragraph>
          ) : null}
        </section>
      ) : null}

      <section className="section-block" id="lesson-why" tabIndex={-1}>
        <span className="section-index">02</span>
        <h2>为什么需要理解它</h2>
        <p>{lesson.why}</p>
      </section>

      <section className="section-block" id="lesson-example" tabIndex={-1}>
        <span className="section-index">03</span>
        <h2>把概念放进具体场景</h2>
        <div className="example-box">{lesson.example}</div>
      </section>

      {source ? (
        <a className="next-card" href={source.href} target="_blank" rel="noreferrer">
          <div>
            <small>Source lab</small>
            <strong>{source.title}</strong>
            <div className="muted" style={{ marginTop: 4 }}>
              {source.detail}
            </div>
          </div>
          <span>↗</span>
        </a>
      ) : null}

      <section className="section-block" id="lesson-practice" tabIndex={-1}>
        <span className="section-index">04</span>
        <h2>动手检验理解</h2>
        <p style={{ marginBottom: 14 }}>{lesson.task}</p>
        <Collapse
          bordered={false}
          style={{ background: 'transparent' }}
          items={[
            {
              key: 'answer',
              label: '先自己回答，再看参考答案',
              children: <p className="body">{lesson.answer}</p>,
            },
          ]}
        />
      </section>

      <section className="section-block" id="lesson-references" tabIndex={-1}>
        <span className="section-index">05</span>
        <h2>核对依据</h2>
        <p className="muted" style={{ marginBottom: 8 }}>
          以官方文档、标准或固定版本源码为准。课程中的简化模型不代替实际运行验证。
        </p>
        <div className="ref-list">
          {lesson.references.length ? (
            lesson.references.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer">
                {label} ↗
              </a>
            ))
          ) : (
            <Typography.Text type="secondary">本节是原创练习，请结合实际系统约束验证。</Typography.Text>
          )}
        </div>
      </section>

      <section className="section-block" id="lesson-notes" tabIndex={-1}>
        <span className="section-index">06</span>
        <h2>用自己的话重述</h2>
        <Input.TextArea
          rows={5}
          aria-label="本课学习笔记"
          value={progress.notes[lesson.id] || ''}
          placeholder="写下你理解的因果关系、仍有疑问的地方和验证方式。"
          onChange={(event) => progress.setNote(lesson.id, event.target.value)}
          style={{ marginTop: 4 }}
        />
        <Typography.Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          笔记只保存在当前浏览器。
        </Typography.Paragraph>
      </section>

      <Space wrap size={12}>
        <Button type="primary" onClick={() => progress.toggleDone(lesson.id)}>
          {progress.done.includes(lesson.id) ? '已掌握 · 撤销' : '标记已掌握'}
        </Button>
        <Button onClick={() => progress.toggleReview(lesson.id)}>
          {progress.review.includes(lesson.id) ? '移出复习清单' : '加入复习清单'}
        </Button>
      </Space>

      {next ? (
        <Link
          className="next-card"
          to={lessonPath(next)}
          onClick={() => progress.remember(next.id)}
        >
          <div>
            <small>下一课</small>
            <strong>{next.title}</strong>
          </div>
          <span>→</span>
        </Link>
      ) : null}
      </div>
      </div>
    </article>
  )
}
