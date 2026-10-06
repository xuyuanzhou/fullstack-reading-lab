import { Breadcrumb, Button, Collapse, Image, Input, Space, Tag, Typography } from 'antd'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { findLesson, lessonIndex, nextLesson } from '@/data/curriculum'
import { REACT_CHAPTERS, VUE_CHAPTERS, reactUrl, vueUrl } from '@/data/meta'
import { useProgress } from '@/state/progress'

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const id = decodeURIComponent(lessonId)
  const lesson = findLesson(id)
  const progress = useProgress()
  const navigate = useNavigate()

  if (!lesson) return <Navigate to="/home" replace />

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
          { title: <Link to="/home">学习路线</Link> },
          { title: lesson.group },
          { title: lesson.title },
        ]}
      />

      <header className="lesson-hero">
        <div className="eyebrow">
          Lesson {String(index + 1).padStart(2, '0')} / {lesson.track}
        </div>
        <h1>{lesson.title}</h1>
        <p className="prompt-box">{lesson.prompt}</p>
        <Space wrap size={[8, 8]}>
          <Tag color="success">原创课程</Tag>
          <Tag>{lesson.references.length} 项核对依据</Tag>
          <Tag>{lesson.group}</Tag>
        </Space>
      </header>

      <section className="section-block">
        <span className="section-index">KNOWLEDGE POINTS</span>
        <h2>本课知识点</h2>
        <ul className="point-list">
          {lesson.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="core-panel">
        <span className="panel-label">01 / 核心模型</span>
        <p className="lesson-core">{lesson.core}</p>
      </section>

      {lesson.deep?.length ? (
        <section className="section-block">
          <span className="section-index">DEEP DIVE</span>
          <h2>机制拆解</h2>
          {lesson.diagram ? (
            <Image
              src={`${import.meta.env.BASE_URL}${lesson.diagram}`}
              alt={`${lesson.title} 原创机制图`}
              style={{ marginBottom: 16, maxWidth: '100%', borderRadius: 12 }}
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
            <Typography.Paragraph type="secondary" style={{ marginTop: 14, marginBottom: 0 }}>
              选题线索：{lesson.origin}。讲解与示意图均重新编写。
            </Typography.Paragraph>
          ) : null}
        </section>
      ) : null}

      <section className="section-block">
        <span className="section-index">02</span>
        <h2>为什么需要理解它</h2>
        <p>{lesson.why}</p>
      </section>

      <section className="section-block">
        <span className="section-index">03</span>
        <h2>把概念放进具体场景</h2>
        <div className="example-box">{lesson.example}</div>
      </section>

      {source ? (
        <a className="next-card" href={source.href} target="_blank" rel="noreferrer">
          <div>
            <small>SOURCE LAB</small>
            <strong>{source.title}</strong>
            <div className="muted" style={{ marginTop: 4 }}>
              {source.detail}
            </div>
          </div>
          <span>↗</span>
        </a>
      ) : null}

      <section className="section-block">
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

      <section className="section-block">
        <span className="section-index">05</span>
        <h2>核对依据</h2>
        <p className="muted" style={{ marginBottom: 12 }}>
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

      <section className="section-block">
        <span className="section-index">06</span>
        <h2>用自己的话重述</h2>
        <Input.TextArea
          rows={5}
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
        <Button type="primary" size="large" onClick={() => progress.toggleDone(lesson.id)}>
          {progress.done.includes(lesson.id) ? '已掌握 · 撤销' : '标记已掌握'}
        </Button>
        <Button size="large" onClick={() => progress.toggleReview(lesson.id)}>
          {progress.review.includes(lesson.id) ? '移出复习清单' : '加入复习清单'}
        </Button>
      </Space>

      {next ? (
        <button
          type="button"
          className="next-card"
          onClick={() => {
            progress.remember(next.id)
            navigate(`/lesson/${encodeURIComponent(next.id)}`)
          }}
        >
          <div>
            <small>下一课</small>
            <strong>{next.title}</strong>
          </div>
          <span>→</span>
        </button>
      ) : null}
    </article>
  )
}
