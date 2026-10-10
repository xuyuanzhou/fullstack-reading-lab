import { Button } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { findLesson } from '@/data/curriculum'
import { PATHS, deliverableKey, gateCleared, nextInGate, slotsOf, type PathGate } from '@/data/learningPaths'
import { lessonPath } from '@/data/routes'
import { shortTitle } from '@/data/reading'
import { useProgress } from '@/state/progress'

const stages = PATHS.architect.gates

export function PathPage() {
  const progress = useProgress()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  useEffect(() => {
    if (params.get('focus') !== 'deliver') return
    document.getElementById('path-deliver')?.scrollIntoView({ block: 'start' })
  }, [params])
  const done = new Set(progress.done)
  const openIndex = stages.findIndex((stage) => !gateCleared(stage, progress.done, progress.pathChecks))
  const currentIndex = openIndex === -1 ? stages.length - 1 : openIndex
  const current = stages[currentIndex]
  const next = findLesson(nextInGate(current, progress.done) || '')

  return (
    <div className="article-shell path-page">
      <div className="page-kicker">
        <span>一条主线</span>
        <span className="dot" />
        <span>侧栏只用来查课</span>
      </div>
      <h1 className="hero-title">一次只做一关</h1>
      <p className="hero-lead">
        先按顺序读当前这一关。每节先回答开头的问题，再对照三个要点。读完就停下来做交付物，做完再进下一关。第 3 关是能交付的全栈，第 6 关才是架构师材料。
      </p>

      <StageDetail
        stage={current}
        index={currentIndex}
        done={done}
        nextId={next?.id}
        checks={new Set(progress.pathChecks ?? [])}
        onToggleCheck={(key) => progress.togglePathCheck(key)}
        onOpenNext={
          next
            ? () => {
                progress.remember(next.id)
                navigate(lessonPath(next))
              }
            : undefined
        }
      />

      <h2 className="path-later-title">六关都要交什么</h2>
      <ol className="path-rest">
        {stages.map((stage, index) => {
          const finished = gateCleared(stage, progress.done, progress.pathChecks)
          const mark = index === currentIndex ? '现在' : finished ? '已交付' : index === 2 ? '到这里是全栈交付' : '之后'
          return (
            <li key={stage.id} className={index === currentIndex ? 'is-current' : undefined}>
              <div className="path-rest-head">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{stage.learnTitle}</strong>
                <em>{stage.weeks}</em>
                <em>{mark}</em>
              </div>
              <ul>
                {stage.outputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function StageDetail({
  stage,
  index,
  done,
  nextId,
  checks,
  onToggleCheck,
  onOpenNext,
}: {
  stage: PathGate
  index: number
  done: Set<string>
  nextId?: string
  checks: Set<string>
  onToggleCheck: (key: string) => void
  onOpenNext?: () => void
}) {
  const slots = slotsOf(stage.lessons)
  const readSlots = slots.filter((slot) => slot.some((id) => done.has(id))).length
  const lessonsDone = slots.length === 0 || readSlots === slots.length
  const nextTitle = shortTitle(findLesson(nextId || '')?.title || '')
  const nextControl = onOpenNext ? (
    <Button type="primary" className="path-next-btn" onClick={onOpenNext}>
      <span className="path-next-kicker">下一节</span>
      {nextTitle ? <span className="path-next-title">{nextTitle}</span> : null}
    </Button>
  ) : null
  const handInNote = onOpenNext ? null : (
    <p>
      {stage.lessons.length === 0
        ? '这一关没有课。勾上这一关的交付，这一关才算过。'
        : lessonsDone
          ? '这关的课已经读完。勾上交付之后，下一关才会打开。'
          : '这一关没有下一节课。按上面的条目做完，再进入后面的关卡。'}
    </p>
  )

  return (
    <section className="path-now">
      <p className="path-now-kicker">
        现在 · 第 {index + 1} 关 · {stage.weeks}
        {slots.length ? ` · 已读 ${readSlots}/${slots.length}` : ''}
      </p>
      <h2>{stage.learnTitle}</h2>
      {stage.milestone ? <p className="path-milestone">{stage.milestone}</p> : null}

      <h3>这一关怎么读</h3>
      <ol className="path-how">
        {stage.how.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>

      {nextControl}

      {stage.lessons.length ? (
        <>
          <h3>按这个顺序</h3>
          <ol className="path-lessons">
            {slots.map((slot, slotIndex) => {
              const rows = slot.flatMap((id) => {
                const item = stage.lessons.find((lesson) => lesson.id === id)
                const lesson = findLesson(id)
                return item && lesson ? [{ item, lesson }] : []
              })
              if (!rows.length) return null
              const read = slot.some((id) => done.has(id))
              const upcoming = !read && slot.includes(nextId || '')
              const lead = rows[0].lesson
              return (
                <li key={slot.join('+')} className={read ? 'is-read' : upcoming ? 'is-next' : undefined}>
                  {rows.map(({ item, lesson }, rowIndex) => (
                    <div key={lesson.id}>
                      <p className="path-lesson-title">
                        <span>{rowIndex === 0 ? String(slotIndex + 1).padStart(2, '0') : '或'}</span>
                        <Link to={lessonPath(lesson)}>{shortTitle(lesson.title)}</Link>
                        {item.note ? <em>{item.note}</em> : null}
                      </p>
                      {item.job ? <p>{item.job}</p> : null}
                    </div>
                  ))}
                  {upcoming ? (
                    <>
                      <p className="path-lesson-ask">先回答：{lead.prompt}</p>
                      <ul>
                        {lead.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </li>
              )
            })}
          </ol>
          {nextControl}
        </>
      ) : null}

      <h3 id="path-deliver">读完要交出</h3>
      <ul className="path-outputs">
        {stage.outputs.map((item, outputIndex) => {
          const key = deliverableKey(stage.id, outputIndex)
          return (
            <li key={key}>
              <label className="path-check">
                <input type="checkbox" checked={checks.has(key)} onChange={() => onToggleCheck(key)} />
                <span>{item}</span>
              </label>
            </li>
          )
        })}
      </ul>
      <p className="muted">过关：{stage.pass}</p>
      {stage.extra ? <p className="muted">{stage.extra}</p> : null}
      {handInNote}
    </section>
  )
}
