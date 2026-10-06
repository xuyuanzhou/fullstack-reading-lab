import {
  Breadcrumb,
  Button,
  Card,
  Collapse,
  Input,
  Space,
  Tag,
  Typography,
  Image,
} from 'antd'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  findLesson,
  lessonIndex,
  nextLesson,
} from '@/data/curriculum'
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
      ? { href: reactUrl(lesson.react), title: '在 React Mastery Lab 中追踪源码', detail: 'React v19.3.0' }
      : lesson.vue && VUE_CHAPTERS[lesson.vue]
        ? { href: vueUrl(lesson.vue), title: '在 Vue 3 Mastery Lab 中追踪源码', detail: 'Vue v3.5.43' }
        : null

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      <Breadcrumb
        items={[
          { title: <Link to="/home">学习路线</Link> },
          { title: lesson.group },
          { title: lesson.title },
        ]}
      />

      <div>
        <Typography.Text type="secondary">
          LESSON {String(index + 1).padStart(2, '0')} / {lesson.track.toUpperCase()}
        </Typography.Text>
        <Typography.Title level={2} style={{ marginTop: 8, marginBottom: 8 }}>
          {lesson.title}
        </Typography.Title>
        <Typography.Paragraph style={{ fontSize: 18, marginBottom: 12 }}>
          {lesson.prompt}
        </Typography.Paragraph>
        <Space wrap>
          <Tag>原创课程</Tag>
          <Tag color="blue">{lesson.references.length} 项核对依据</Tag>
          <Tag>{lesson.group}</Tag>
        </Space>
      </div>

      <Card title="本课知识点" size="small">
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          {lesson.points.map((point) => (
            <li key={point} style={{ marginBottom: 6 }}>
              {point}
            </li>
          ))}
        </ol>
      </Card>

      <Card title="01 / 核心模型">
        <div className="lesson-core">{lesson.core}</div>
      </Card>

      {lesson.deep?.length ? (
        <Card title="机制拆解">
          {lesson.diagram ? (
            <Image
              src={`${import.meta.env.BASE_URL}${lesson.diagram}`}
              alt={`${lesson.title} 原创机制图`}
              style={{ marginBottom: 16, maxWidth: '100%' }}
            />
          ) : null}
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            {lesson.deep.map((part) => (
              <div key={part.title}>
                <Typography.Title level={5} style={{ marginTop: 0 }}>
                  {part.title}
                </Typography.Title>
                <Typography.Paragraph style={{ marginBottom: 0 }}>{part.body}</Typography.Paragraph>
              </div>
            ))}
            {lesson.origin ? (
              <Typography.Text type="secondary">
                选题线索：{lesson.origin}。讲解与示意图均重新编写。
              </Typography.Text>
            ) : null}
          </Space>
        </Card>
      ) : null}

      <Card title="02 / 为什么需要理解它">
        <Typography.Paragraph style={{ marginBottom: 0 }}>{lesson.why}</Typography.Paragraph>
      </Card>

      <Card title="03 / 把概念放进具体场景">
        <Typography.Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap' }}>
          {lesson.example}
        </Typography.Paragraph>
      </Card>

      {source ? (
        <Card size="small">
          <a href={source.href} target="_blank" rel="noreferrer">
            ↗ {source.title}
          </a>
          <div className="muted">{source.detail}</div>
        </Card>
      ) : null}

      <Card title="04 / 动手检验理解">
        <Typography.Paragraph>{lesson.task}</Typography.Paragraph>
        <Collapse
          items={[
            {
              key: 'answer',
              label: '先自己回答，再看参考答案',
              children: <Typography.Paragraph style={{ marginBottom: 0 }}>{lesson.answer}</Typography.Paragraph>,
            },
          ]}
        />
      </Card>

      <Card title="05 / 核对依据">
        <Typography.Paragraph type="secondary">
          以官方文档、标准或固定版本源码为准。课程中的简化模型不代替实际运行验证。
        </Typography.Paragraph>
        <Space direction="vertical">
          {lesson.references.length ? (
            lesson.references.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer">
                {label} ↗
              </a>
            ))
          ) : (
            <Typography.Text type="secondary">本节是原创练习，请结合实际系统约束验证。</Typography.Text>
          )}
        </Space>
      </Card>

      <Card title="06 / 用自己的话重述">
        <Input.TextArea
          rows={5}
          value={progress.notes[lesson.id] || ''}
          placeholder="写下你理解的因果关系、仍有疑问的地方和验证方式。"
          onChange={(event) => progress.setNote(lesson.id, event.target.value)}
        />
        <Typography.Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          笔记只保存在当前浏览器。
        </Typography.Paragraph>
      </Card>

      <Space wrap>
        <Button type="primary" onClick={() => progress.toggleDone(lesson.id)}>
          {progress.done.includes(lesson.id) ? '✓ 已掌握 · 撤销' : '标记已掌握'}
        </Button>
        <Button onClick={() => progress.toggleReview(lesson.id)}>
          {progress.review.includes(lesson.id) ? '移出复习清单' : '加入复习清单'}
        </Button>
      </Space>

      {next ? (
        <Card
          hoverable
          onClick={() => {
            progress.remember(next.id)
            navigate(`/lesson/${encodeURIComponent(next.id)}`)
          }}
        >
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <div>
              <Typography.Text type="secondary">下一课</Typography.Text>
              <div>
                <Typography.Text strong>{next.title}</Typography.Text>
              </div>
            </div>
            <span>→</span>
          </Space>
        </Card>
      ) : null}
    </Space>
  )
}
