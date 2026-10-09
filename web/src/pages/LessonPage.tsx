import { Breadcrumb, Button, Collapse, Image, Input, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { findLesson, lessonIndex, loadFullLesson, nextLesson } from '@/data/curriculum'
import { deliverableKey, slotsOf, spineNextId, spinePlace, spinePrevId } from '@/data/learningPaths'
import { groupKeyForLabel, groupPath, groupTitle, isTrack, lessonPath } from '@/data/routes'
import { shortTitle, splitProse, structureCore } from '@/data/reading'
import { REACT_CHAPTERS, VUE_CHAPTERS, reactUrl, vueUrl } from '@/data/meta'
import { useProgress } from '@/state/progress'
import { LessonOutline } from '@/components/LessonOutline'
import { RichBlocks } from '@/components/RichBlocks'
import { RichProse } from '@/components/RichProse'
import type { Lesson } from '@/types/curriculum'

export function LessonPage() {
  const { track = '', groupKey = '', lessonId = '' } = useParams()
  const progress = useProgress()
  const summary = findLesson(lessonId)
  const [lesson, setLesson] = useState<Lesson | null | undefined>(undefined)

  useEffect(() => {
    if (!lessonId || !summary || !isTrack(summary.track)) {
      setLesson(null)
      return
    }
    let cancelled = false
    setLesson(undefined)
    void loadFullLesson(lessonId).then((full) => {
      if (!cancelled) setLesson(full ?? null)
    })
    return () => {
      cancelled = true
    }
  }, [lessonId, summary?.id, summary?.track])

  if (!summary || !isTrack(summary.track)) return <Navigate to="/" replace />
  const chapterKey = groupKeyForLabel(summary.track, summary.group)
  if (track !== summary.track || groupKey !== chapterKey) {
    return <Navigate to={lessonPath(summary)} replace />
  }
  if (lesson === undefined) {
    return (
      <div className="route-loading" role="status">
        正在打开课程…
      </div>
    )
  }
  if (!lesson) return <Navigate to="/" replace />

  const chapterPath = groupPath(lesson.track, chapterKey)
  const index = lessonIndex(lesson.track, lesson.id)
  const next = nextLesson(lesson.track, lesson.id)
  const onSpine = spinePlace(lesson.id)
  const spineSlots = onSpine ? slotsOf(onSpine.gate.lessons) : []
  const spineSlot = spineSlots.findIndex((slot) => slot.includes(lesson.id))
  const spineNext = findLesson(spineNextId(lesson.id) || '')
  const spinePrev = findLesson(spinePrevId(lesson.id) || '')
  const core = structureCore(lesson.core)
  const references = lesson.references || []
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
      {onSpine ? (
        <section className="path-strip">
          <p className="path-strip-kicker">
            <Link to="/paths">
              第 {onSpine.index + 1} 关 · {onSpine.gate.learnTitle}
            </Link>
            <span>
              第 {spineSlot + 1}/{spineSlots.length} 节
            </span>
            <span>
              交付 {onSpine.gate.outputs.filter((_, outputIndex) => (progress.pathChecks ?? []).includes(deliverableKey(onSpine.gate.id, outputIndex))).length}/{onSpine.gate.outputs.length}
            </span>
            {spineNext ? (
              <Link to={lessonPath(spineNext)} onClick={() => progress.remember(spineNext.id)}>
                下一节 · {shortTitle(spineNext.title)}
              </Link>
            ) : progress.done.includes(lesson.id) ? (
              <Link to="/paths?focus=deliver">回主线交交付物</Link>
            ) : (
              <span>文末记为已读，再交交付物</span>
            )}
          </p>
          {onSpine.gate.lessons[onSpine.step]?.job ? <p>{onSpine.gate.lessons[onSpine.step].job}</p> : null}
        </section>
      ) : null}

      <Breadcrumb
        items={[
          { title: <Link to={chapterPath}>学习路线</Link> },
          { title: <Link to={chapterPath}>{groupTitle(lesson.track, chapterKey)}</Link> },
          { title: shortTitle(lesson.title) },
        ]}
      />

      <header className="lesson-hero">
        <div className="eyebrow">
          第 {String(index + 1).padStart(2, '0')} 课 · {groupTitle(lesson.track, chapterKey)}
        </div>
        <h1>{lesson.title}</h1>
        <p className="prompt-box">{lesson.prompt}</p>
        {lesson.promptAnswer ? (
          <Collapse
            bordered={false}
            style={{ background: 'transparent', marginTop: 8 }}
            items={[
              {
                key: 'prompt-answer',
                label: '先自己回答，再看参考答案',
                children: <p className="body">{lesson.promptAnswer}</p>,
              },
            ]}
          />
        ) : null}
        <div className="meta-line">
          {lesson.since ? <span className="since-badge" title="引入或定稿版本">自 {lesson.since}</span> : null}
          <span>原创课程</span>
          <span>{references.length} 项依据</span>
        </div>
      </header>

      <details className="compact-outline">
        <summary>本课目录</summary>
        <LessonOutline lesson={lesson} />
      </details>

      <div className="lesson-with-outline">
      <LessonOutline lesson={lesson} />
      <div className="lesson-body">

      <section className="section-block" id="lesson-points" tabIndex={-1}>
        <span className="section-index">01</span>
        <h2>要点</h2>
        <ul className="point-list">
          {lesson.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="core-panel" id="lesson-model" tabIndex={-1}>
        <span className="panel-label">02 / 核心模型</span>
        {lesson.diagram ? (
          <figure className="concept-figure">
            <Image
              src={`${import.meta.env.BASE_URL}${lesson.diagram}`}
              alt={`${lesson.title} 机制图`}
              preview={{ cover: '放大' }}
            />
          </figure>
        ) : null}
        <div className="lesson-core">
          {core.lead ? <RichProse text={core.lead} className="core-lead" /> : null}
          {core.facets.length ? (
            <div className="core-facets">
              {core.facets.map((facet, facetIndex) => (
                <div className="core-facet" key={`${facet.label}-${facetIndex}`}>
                  <span className="core-facet-label">{facet.label}</span>
                  <RichProse text={facet.body} as="p" />
                </div>
              ))}
            </div>
          ) : null}
          {core.beats.length ? (
            <ol className="core-beats">
              {core.beats.map((beat, beatIndex) => (
                <RichProse key={`beat-${beatIndex}`} text={beat} as="li" />
              ))}
            </ol>
          ) : null}
        </div>
        {lesson.map?.length ? (
          <table className="model-map">
            <caption>职责对照</caption>
            <thead>
              <tr>
                <th scope="col">这件事</th>
                <th scope="col">谁负责</th>
              </tr>
            </thead>
            <tbody>
              {lesson.map.map((row) => (
                <tr key={row.title}>
                  <th scope="row">{row.title}</th>
                  <td>{row.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </section>

      {lesson.deep?.length ? (
        <section className="section-block" id="lesson-mechanism" tabIndex={-1}>
          <span className="section-index">03</span>
          <h2>细节</h2>
          <div className="deep-stack">
            {lesson.deep.map((part) => (
              <div className="deep-item" key={part.title}>
                <h3>{part.title}</h3>
                {splitProse(part.body).map((para) => (
                  <RichProse key={para.slice(0, 40)} text={para} />
                ))}
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
        <span className="section-index">04</span>
        <h2>为什么</h2>
        {splitProse(lesson.why || '').map((part) => (
          <RichProse key={part.slice(0, 40)} text={part} />
        ))}
      </section>

      <section className="section-block" id="lesson-example" tabIndex={-1}>
        <span className="section-index">05</span>
        <h2>例子</h2>
        <div className="example-box">
          <RichBlocks text={lesson.example || ''} />
        </div>
      </section>

      {source ? (
        <a className="next-card" href={source.href} target="_blank" rel="noreferrer">
          <div>
            <small>源码</small>
            <strong>{source.title}</strong>
            <div className="muted" style={{ marginTop: 4 }}>
              {source.detail}
            </div>
          </div>
          <span>↗</span>
        </a>
      ) : null}

      <section className="section-block" id="lesson-practice" tabIndex={-1}>
        <span className="section-index">06</span>
        <h2>练习</h2>
        <p style={{ marginBottom: 14 }}>{lesson.task}</p>
        <Collapse
          bordered={false}
          style={{ background: 'transparent' }}
          items={[
            {
              key: 'answer',
              label: '先自己回答，再看参考答案',
              children: <RichBlocks text={lesson.answer || ''} className="body" />,
            },
          ]}
        />
      </section>

      <section className="section-block" id="lesson-references" tabIndex={-1}>
        <span className="section-index">07</span>
        <h2>依据</h2>
        <p className="muted" style={{ marginBottom: 8 }}>
          以官方文档、标准或固定版本源码为准。课程中的简化模型不代替实际运行验证。
        </p>
        <div className="ref-list">
          {references.length ? (
            references.map(([label, href]) => (
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
        <span className="section-index">08</span>
        <h2>笔记</h2>
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

      {onSpine ? (
        <div className="path-turn">
          {spinePrev ? (
            <Link className="path-turn-prev" to={lessonPath(spinePrev)} onClick={() => progress.remember(spinePrev.id)}>
              上一节 · {shortTitle(spinePrev.title)}
            </Link>
          ) : (
            <Link className="path-turn-prev" to="/paths">
              返回这一关
            </Link>
          )}
          {spineNext ? (
            <Link
              className="next-card"
              to={lessonPath(spineNext)}
              onClick={() => {
                if (!progress.done.includes(lesson.id)) progress.toggleDone(lesson.id)
                progress.remember(spineNext.id)
              }}
            >
              <div>
                <small>{progress.done.includes(lesson.id) ? '主线下一节' : '记为已读，下一节'}</small>
                <strong>{shortTitle(spineNext.title)}</strong>
              </div>
              <span>→</span>
            </Link>
          ) : (
            <Link
              className="next-card"
              to="/paths?focus=deliver"
              onClick={() => {
                if (!progress.done.includes(lesson.id)) progress.toggleDone(lesson.id)
              }}
            >
              <div>
                <small>{progress.done.includes(lesson.id) ? '本关读完' : '记为已读'}</small>
                <strong>回去交交付物</strong>
              </div>
              <span>→</span>
            </Link>
          )}
        </div>
      ) : next ? (
        <Link
          className="next-card"
          to={lessonPath(next)}
          onClick={() => progress.remember(next.id)}
        >
          <div>
            <small>下一课</small>
            <strong>{shortTitle(next.title)}</strong>
          </div>
          <span>→</span>
        </Link>
      ) : null}
      </div>
      </div>
    </article>
  )
}
