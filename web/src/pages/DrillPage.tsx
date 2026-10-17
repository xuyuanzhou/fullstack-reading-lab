import { useState } from 'react'
import { Link, useLocation, useMatch, useParams } from 'react-router-dom'
import {
  correctChoices,
  courseById,
  DRILL_COURSES,
  gateById,
  gatesInCourse,
  isMultiQuestion,
  pointById,
  questionById,
  type OptionId,
} from '@/data/drillBank'
import {
  describeGate,
  examOutOfReach,
  learningReport,
  neededCorrect,
  type DrillMode,
} from '@/data/drillRules'
import { findLesson } from '@/data/curriculum'
import { DRILL_BLOCKS } from '@/data/drillOutline'
import { lessonPath } from '@/data/routes'
import { shortTitle } from '@/data/reading'
import { useLearningSlice } from '@/state/progress'

type SealStatus = 'locked' | 'open' | 'live' | 'cleared'

function returnTrip(state: unknown): { to: string; label: string } | null {
  if (!state || typeof state !== 'object' || !('drillReturn' in state)) return null
  if (state.drillReturn === 'paths') return { to: '/paths', label: '回总图' }
  if (state.drillReturn === 'gate' && 'gateId' in state && typeof state.gateId === 'string' && /^[a-z0-9-]+$/.test(state.gateId)) {
    return { to: `/paths?gate=${state.gateId}`, label: '回这一关' }
  }
  return null
}

function Seal({ status }: { status: SealStatus }) {
  return (
    <svg className={`drill-seal is-${status}`} viewBox="0 0 48 48" aria-hidden="true">
      <circle className="drill-seal-ring" cx="24" cy="24" r="17" />
      <circle className="drill-seal-core" cx="24" cy="24" r="7" />
      {status === 'cleared' ? <path className="drill-seal-mark" d="M16.5 24.5 21 29l11-12" /> : null}
      {status === 'locked' ? <path className="drill-seal-lock" d="M18 24h12M24 18v12" /> : null}
    </svg>
  )
}

function LessonLink({ lessonId }: { lessonId: string }) {
  const lesson = findLesson(lessonId)
  if (!lesson) return null
  let to = ''
  try {
    to = lessonPath(lesson)
  } catch {
    return null
  }
  return (
    <Link className="drill-lesson" to={to}>
      回到课文：{shortTitle(lesson.title)}
    </Link>
  )
}

function DrillMast() {
  const drill = useLearningSlice((state) => state.drill)
  const report = learningReport(drill)
  const earned = report.badges.filter((badge) => badge.earned).length
  return (
    <header className="drill-mast">
      <div>
        <p className="drill-kicker">选择题闯关</p>
        <h1>按课表分块：全栈主线、前端、Java</h1>
        <p className="drill-lead">
          同一块里按课表排，上一门后面才是下一门。同一章里接到一起。单选只选一项，多选要选全。每关答完这一关的全部题，正确率达到 80% 才通关。通过上一关，才打开下一关。
        </p>
      </div>
      <div className="drill-meters" aria-label="积分与复活">
        <p><b>{report.points}</b><span>积分</span></p>
        <p><b>{report.revives}</b><span>复活</span></p>
        <p><b>{earned}/{report.badges.length}</b><span>徽章</span></p>
        <Link className="drill-report-link" to="/drill/report">学习报告</Link>
      </div>
    </header>
  )
}

function DrillLobby() {
  const drill = useLearningSlice((state) => state.drill)
  const report = learningReport(drill)
  return (
    <div className="drill">
      <DrillMast />
      {DRILL_BLOCKS.map((block) => (
        <section key={block.id} className="drill-block" aria-label={block.title}>
          <h2>{block.title}</h2>
          <ol className="drill-roads">
            {block.courseIds.map((courseId, index) => {
              const course = DRILL_COURSES.find((item) => item.id === courseId)
              if (!course) return null
              const gates = gatesInCourse(course.id)
              const plays = gates.map((gate) => describeGate(drill, gate.id))
              const cleared = plays.filter((play) => play?.cleared).length
              const here = plays.findIndex((play) => !play?.cleared)
              const started = here >= 0 && Boolean(plays[here]?.open)
              const status: SealStatus = cleared === gates.length ? 'cleared' : cleared > 0 || started ? 'live' : 'open'
              const state = status === 'cleared' ? '已通过' : started ? '进行中' : cleared > 0 ? `第 ${here + 1} 关` : '可以开始'
              return (
                <li key={course.id} className={`is-${status}`}>
                  <Link to={`/drill/${course.id}`}>
                    <span className="drill-road-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="drill-road-head">
                      <strong>{course.title}</strong>
                      <b className="drill-state">{state}</b>
                    </span>
                    <em>{course.lead}</em>
                    <span className="drill-pebbles" aria-hidden="true">
                      {gates.map((gate, index) => (
                        <i key={gate.id} className={plays[index]?.cleared ? 'is-done' : index === here ? 'is-here' : undefined} />
                      ))}
                    </span>
                    <span className="drill-sr">{cleared}/{gates.length} 关已通过</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
      <ol className="drill-badges">
        {report.badges.map((badge) => (
          <li key={badge.id} className={badge.earned ? 'is-earned' : 'is-locked'}>
            <span className="drill-crest" aria-hidden="true" />
            <strong>{badge.title}</strong>
            <small>{badge.detail}</small>
          </li>
        ))}
      </ol>
    </div>
  )
}

function DrillCourse({ courseId }: { courseId: string }) {
  const course = courseById(courseId)
  const drill = useLearningSlice((state) => state.drill)
  const location = useLocation()
  const home = returnTrip(location.state)
  if (!course) {
    return (
      <div className="drill">
        <p className="drill-lead">没有这一门。</p>
        <Link className="drill-back" to={home?.to ?? '/drill'}>{home?.label ?? '返回选择题'}</Link>
      </div>
    )
  }
  const gates = gatesInCourse(course.id)
  return (
    <div className="drill">
      <Link className="drill-back" to={home?.to ?? '/drill'}>{home?.label ?? '全部课程'}</Link>
      <header className="drill-mast">
        <div>
          <p className="drill-kicker">选择题 · {gates.length} 关</p>
          <h1>{course.title}</h1>
          <p className="drill-lead">{course.lead}</p>
        </div>
      </header>
      <ol className="drill-path">
        {gates.map((gate, index) => {
          const play = describeGate(drill, gate.id)
          const status: SealStatus = !play?.unlocked ? 'locked' : play.open ? 'live' : play.cleared ? 'cleared' : 'open'
          const state = status === 'locked'
            ? '先通过上一关'
            : status === 'cleared'
              ? `已通过 ${play?.bestPercent}%`
              : status === 'live'
                ? '进行中'
                : '可以开始'
          const body = (
            <>
              <span className="drill-stone" aria-hidden="true">{index + 1}</span>
              <span className="drill-gate-copy">
                <span className="drill-gate-head">
                  <strong>{gate.title}</strong>
                  <b className="drill-state">{state}</b>
                </span>
                <em>{gate.lead}</em>
                {status === 'open' || status === 'live' ? (
                  <small>{gate.questionIds.length} 题 · 至少 {neededCorrect(gate.questionIds.length)} 题正确</small>
                ) : null}
              </span>
            </>
          )
          return (
            <li key={gate.id} className={`is-${status}`}>
              {play?.unlocked ? (
                <Link to={`/drill/${course.id}/${gate.id}`} state={location.state}>{body}</Link>
              ) : (
                <div className="drill-gate-lock">{body}</div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function DrillStage({ courseId, gateId }: { courseId: string; gateId: string }) {
  const course = courseById(courseId)
  const gate = gateById(gateId)
  const drill = useLearningSlice((state) => state.drill)
  const location = useLocation()
  const home = returnTrip(location.state)
  const answerDrill = useLearningSlice((state) => state.answerDrill)
  const restartBoss = useLearningSlice((state) => state.restartBoss)
  const play = course && gate && gate.courseId === course.id ? describeGate(drill, gate.id) : null
  const [holdingId, setHoldingId] = useState<string | null>(null)
  const [picks, setPicks] = useState<OptionId[]>([])
  const [issue, setIssue] = useState('')
  const [armed, setArmed] = useState<DrillMode | null>(null)
  const [heldMode, setHeldMode] = useState<DrillMode>('gate')

  if (!course || !gate || !play) {
    return (
      <div className="drill">
        <p className="drill-lead">没有这一关。</p>
        <Link className="drill-back" to={home?.to ?? '/drill'}>{home?.label ?? '返回选择题'}</Link>
      </div>
    )
  }
  const stageGate = gate

  const held = holdingId ? questionById(holdingId) : undefined
  const heldAnswer = held ? [...drill.log].reverse().find((row) => row.questionId === held.id) : undefined
  const exam = course.id === 'boss'
  const mode: DrillMode = play.open?.mode ?? armed ?? 'gate'
  const lost = Boolean(
    exam && mode !== 'retry' && play.open && examOutOfReach(play.open.correct, play.open.answered, play.open.total),
  )
  const freshExam = exam && play.canStartGate && !play.open && !play.last
  const askingId = held
    ? ''
    : play.open?.nextId
      ?? (armed === 'gate' || freshExam ? gate.questionIds[0] : armed === 'retry' ? play.last?.wrongIds[0] : '')
  const asking = askingId ? questionById(askingId) : undefined
  const point = pointById((held ?? asking)?.pointId ?? '')
  const answered = play.open?.answered ?? 0
  const total = mode === 'retry' ? (play.last?.wrongIds.length ?? 0) : gate.questionIds.length
  const courseGates = gatesInCourse(course.id)
  const gateIndex = courseGates.findIndex((item) => item.id === gate.id)
  const nextGate = courseGates[gateIndex + 1]
  const back = home ?? (exam ? { to: `/paths?gate=${gate.id.slice(3)}`, label: '回这一关' } : null)

  function choose(id: OptionId, multi: boolean) {
    setPicks((current) => {
      if (!multi) return [id]
      return current.includes(id) ? current.filter((item) => item !== id) : [...current, id].sort()
    })
    setIssue('')
  }

  function submit() {
    if (!asking || picks.length === 0) return
    const saved = answerDrill({ gateId: stageGate.id, questionId: asking.id, choice: [...picks].sort().join(''), mode })
    if (!saved.ok) {
      setIssue(saved.issue)
      return
    }
    setIssue('')
    setHeldMode(mode)
    setHoldingId(saved.questionId)
    setArmed(null)
  }

  return (
    <div className="drill">
      <Link className="drill-back" to={back?.to ?? `/drill/${course.id}`} state={back ? undefined : location.state}>{back?.label ?? course.title}</Link>
      <header className="drill-mast">
        <div>
          <p className="drill-kicker">{exam ? 'Boss · 考试' : `第 ${gateIndex + 1} 关`}</p>
          <h1>{gate.title}</h1>
          <p className="drill-lead">{gate.lead}</p>
        </div>
      </header>

      {!play.unlocked ? (
        <section className="drill-sheet">
          <Seal status="locked" />
          <h2>这一关还锁着</h2>
          <p>先通过上一关的全部题目，并且正确率达到 80%。</p>
        </section>
      ) : null}

      {play.unlocked && held && heldAnswer && point ? (
        <section className="drill-sheet" aria-live="polite">
          <p className="drill-progress">
            {heldMode === 'retry' ? '错题重练' : exam ? '考试' : '本关'}
            {exam && heldMode !== 'retry' ? ` · 已对 ${play.open?.correct ?? play.last?.correct ?? 0} · 至少 ${neededCorrect(gate.questionIds.length)} 题` : ' · 已记下这题'}
          </p>
          <p className="drill-kind">{isMultiQuestion(held) ? '多选，选出所有正确项' : '单选，只选一项'}</p>
          <h2>{held.stem}</h2>
          <ol className={`drill-options ${isMultiQuestion(held) ? 'is-multi' : ''}`}>
            {held.options.map((option) => {
              const chosen = picks.length > 0 ? picks : [...heldAnswer.choice]
              const picked = chosen.includes(option.id)
              const right = correctChoices(held).includes(option.id)
              const mark = [picked ? 'is-picked' : '', right ? 'is-right' : '', picked && !right ? 'is-wrong' : ''].filter(Boolean).join(' ')
              return (
                <li key={option.id}>
                  <button type="button" className={`drill-option ${mark}`} aria-pressed={picked} disabled>
                    <i>{option.id.toUpperCase()}</i>
                    <span>{option.text}</span>
                  </button>
                  {!right && held.whyWrong[option.id] ? (
                    <p className="drill-why">{held.whyWrong[option.id]}</p>
                  ) : null}
                </li>
              )
            })}
          </ol>
          <div className={`drill-explain ${heldAnswer.correct ? 'is-right' : 'is-wrong'}`}>
            <p>{heldAnswer.correct ? '这题答对了。' : '这题答错了。'}</p>
            <p>{held.explain}</p>
            <p><strong>{point.title}</strong> {point.summary}</p>
            <LessonLink lessonId={point.lessonId} />
          </div>
          {lost ? <p className="drill-issue">剩下的题全对，也到不了 80%。</p> : null}
          <div className="drill-actions">
            {lost ? (
              <button type="button" className="drill-go" onClick={() => { restartBoss(stageGate.id); setHoldingId(null); setPicks([]) }}>再答一遍</button>
            ) : null}
            <button type="button" className={lost ? 'drill-go is-quiet' : 'drill-go'} onClick={() => { setHoldingId(null); setPicks([]) }}>
              {play.open ? '下一题' : '查看这一关'}
            </button>
          </div>
        </section>
      ) : null}

      {play.unlocked && !held && asking ? (
        <section className="drill-sheet">
          <p className="drill-progress">
            {mode === 'retry' ? '错题重练' : exam ? '考试' : '本关'} · {answered + 1}/{total}
            {exam && mode !== 'retry' ? ` · 已对 ${play.open?.correct ?? 0} · 至少 ${neededCorrect(total)} 题` : ''}
          </p>
          <DrillTrack answered={answered} total={total} />
          <p className="drill-kind">{isMultiQuestion(asking) ? '多选，选出所有正确项' : '单选，只选一项'}</p>
          <h2>{asking.stem}</h2>
          {point ? <p className="drill-point">知识点：{point.title}</p> : null}
          <ol className={`drill-options ${isMultiQuestion(asking) ? 'is-multi' : ''}`}>
            {asking.options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  className={`drill-option ${picks.includes(option.id) ? 'is-picked' : ''}`}
                  aria-pressed={picks.includes(option.id)}
                  onClick={() => choose(option.id, isMultiQuestion(asking))}
                >
                  <i>{option.id.toUpperCase()}</i>
                  <span>{option.text}</span>
                </button>
              </li>
            ))}
          </ol>
          {issue ? <p className="drill-issue">{issue}</p> : null}
          {lost ? <p className="drill-issue">剩下的题全对，也到不了 80%。</p> : null}
          <div className="drill-actions">
            {lost ? (
              <button type="button" className="drill-go" onClick={() => { restartBoss(stageGate.id); setHoldingId(null); setPicks([]) }}>再答一遍</button>
            ) : null}
            <button type="button" className={lost ? 'drill-go is-quiet' : 'drill-go'} disabled={picks.length === 0} onClick={submit}>确认这题</button>
          </div>
        </section>
      ) : null}

      {play.unlocked && !held && !asking && !play.last ? (
        <section className="drill-sheet">
          <Seal status="open" />
          <h2>{exam ? '开始考试' : '开始这一关'}</h2>
          <p>
            共 {gate.questionIds.length} 题，按顺序作答。单选只选一项，多选要选全。至少答对 {neededCorrect(gate.questionIds.length)} 题（80%）才通关。
            {exam ? '没到 80% 可以再答一遍。' : '答错可以稍后重练；整关没通过时，用复活再答一遍。'}
          </p>
          <button type="button" className="drill-go" onClick={() => setArmed('gate')}>开始答题</button>
        </section>
      ) : null}

      {play.unlocked && !held && !asking && play.last ? (
        <section className="drill-sheet">
          <Meter percent={play.last.percent} passed={play.last.passed} />
          <h2>{play.last.passed ? (exam ? '这场考试通过了' : '这一关通过了') : '还没到 80%'}</h2>
          <p>
            这一轮 {play.last.correct}/{play.last.total}，正确率 {play.last.percent}%。
            最好成绩 {play.bestPercent}%。{exam ? '' : `剩余复活 ${play.revives} 次。`}
          </p>
          {play.last.wrongIds.length ? (
            <ul className="drill-misses">
              {play.last.wrongIds.map((id) => {
                const question = questionById(id)
                const itemPoint = pointById(question?.pointId ?? '')
                return (
                  <li key={id}>
                    <strong>{itemPoint?.title}</strong>
                    <span>{question?.stem}</span>
                  </li>
                )
              })}
            </ul>
          ) : <p>这一轮没有答错。</p>}
          <div className="drill-actions">
            {play.canStartRetry ? (
              <button type="button" className="drill-go is-quiet" onClick={() => setArmed('retry')}>重练错题</button>
            ) : null}
            {!play.cleared && play.canStartGate ? (
              <button type="button" className="drill-go" onClick={() => setArmed('gate')}>{exam ? '再答一遍' : '复活，再答这一关'}</button>
            ) : null}
            {!play.cleared && !play.canStartGate ? (
              <p className="drill-issue">复活次数用完了。把这一轮错题全部练对，可以补回 1 次。</p>
            ) : null}
            {play.cleared && exam && back ? (
              <Link className="drill-go" to={back.to}>{back.label}</Link>
            ) : null}
            {play.cleared && !exam && nextGate ? (
              <Link className="drill-go" to={`/drill/${course.id}/${nextGate.id}`} state={location.state}>下一关</Link>
            ) : null}
            {play.cleared && !exam && !nextGate ? <Link className="drill-go" to="/drill/report" state={location.state}>查看学习报告</Link> : null}
          </div>
        </section>
      ) : null}
    </div>
  )
}

function DrillTrack({ answered, total }: { answered: number; total: number }) {
  if (total > 12) {
    return (
      <div className="drill-track" aria-hidden="true">
        <span style={{ width: `${total ? Math.round((answered / total) * 100) : 0}%` }} />
      </div>
    )
  }
  return (
    <div className="drill-dots" aria-hidden="true">
      {Array.from({ length: total }, (_, index) => (
        <i key={index} className={index < answered ? 'is-done' : index === answered ? 'is-now' : ''} />
      ))}
    </div>
  )
}

function Meter({ percent, passed }: { percent: number; passed: boolean }) {
  return (
    <svg className={`drill-meter ${passed ? 'is-passed' : 'is-short'}`} viewBox="0 0 120 120" role="img" aria-label={`正确率 ${percent}%`}>
      <circle className="drill-meter-track" cx="60" cy="60" r="46" />
      <circle
        className="drill-meter-value"
        cx="60"
        cy="60"
        r="46"
        pathLength={100}
        strokeDasharray={`${percent} 100`}
      />
      <text x="60" y="66">{percent}%</text>
    </svg>
  )
}

function DrillReport() {
  const drill = useLearningSlice((state) => state.drill)
  const report = learningReport(drill)
  const location = useLocation()
  const home = returnTrip(location.state)
  return (
    <div className="drill">
      <Link className="drill-back" to={home?.to ?? '/drill'}>{home?.label ?? '返回选择题'}</Link>
      <header className="drill-mast">
        <div>
          <p className="drill-kicker">学习报告</p>
          <h1>薄弱知识点</h1>
          <p className="drill-lead">
            以每道题最近一次作答为准。还没答过的不算薄弱。
            {report.answered ? ` 已答 ${report.answered} 题，最近一次里答对 ${report.correct} 题（${report.percent}%）。` : ' 还没有答题记录。'}
          </p>
        </div>
      </header>
      <ol className="drill-report-courses">
        {report.courses.map((course) => (
          <li key={course.id}>
            <Link to={`/drill/${course.id}`} state={location.state}>
              <strong>{course.title}</strong>
              <span>{course.cleared}/{course.total} 关通过</span>
              <b>{course.answered ? `${course.percent}%` : '未作答'}</b>
            </Link>
          </li>
        ))}
      </ol>
      {report.weak.length ? (
        <ul className="drill-weak">
          {report.weak.map((point) => (
            <li key={point.pointId}>
              <Seal status="live" />
              <div>
                <strong>{point.title}</strong>
                <p>{point.summary}</p>
                <LessonLink lessonId={point.lessonId} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="drill-lead">{report.answered ? '最近一次作答里，没有还答错的知识点。' : '答完一关之后，这里会标出仍然答错的知识点。'}</p>
      )}
    </div>
  )
}

export function DrillPage() {
  const report = useMatch('/drill/report')
  const { courseId = '', gateId = '' } = useParams()
  if (report) return <DrillReport />
  if (gateId && gateById(gateId)) return <DrillStage key={gateId} courseId={courseId} gateId={gateId} />
  if (courseId) return <DrillCourse courseId={courseId} />
  return <DrillLobby />
}
