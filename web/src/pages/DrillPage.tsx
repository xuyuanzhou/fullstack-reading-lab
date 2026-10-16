import { useState } from 'react'
import { Link, useMatch, useParams } from 'react-router-dom'
import {
  courseById,
  DRILL_COURSES,
  DRILL_GATES,
  gateById,
  gatesInCourse,
  pointById,
  questionById,
  type OptionId,
} from '@/data/drillBank'
import {
  describeGate,
  learningReport,
  neededCorrect,
  type DrillMode,
} from '@/data/drillRules'
import { findLesson } from '@/data/curriculum'
import { lessonPath } from '@/data/routes'
import { shortTitle } from '@/data/reading'
import { useLearningSlice } from '@/state/progress'

type SealStatus = 'locked' | 'open' | 'live' | 'cleared'

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
        <h1>系统设计、SQL、性能排查</h1>
        <p className="drill-lead">
          每关答完所有题，正确率达到 80% 才通关。通过上一关，才打开下一关。
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
      <ol className="drill-roads">
        {DRILL_COURSES.map((course) => {
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
      <ol className="drill-badges">
        {report.badges.map((badge) => (
          <li key={badge.id} className={badge.earned ? 'is-earned' : 'is-locked'}>
            <Seal status={badge.earned ? 'cleared' : 'locked'} />
            <span>
              <strong>{badge.title}</strong>
              <small>{badge.detail}</small>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function DrillCourse({ courseId }: { courseId: string }) {
  const course = courseById(courseId)
  const drill = useLearningSlice((state) => state.drill)
  if (!course) {
    return (
      <div className="drill">
        <p className="drill-lead">没有这一门。</p>
        <Link className="drill-back" to="/drill">返回选择题</Link>
      </div>
    )
  }
  const gates = gatesInCourse(course.id)
  return (
    <div className="drill">
      <Link className="drill-back" to="/drill">全部课程</Link>
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
                <Link to={`/drill/${course.id}/${gate.id}`}>{body}</Link>
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
  const answerDrill = useLearningSlice((state) => state.answerDrill)
  const play = course && gate && gate.courseId === course.id ? describeGate(drill, gate.id) : null
  const [holdingId, setHoldingId] = useState<string | null>(null)
  const [pick, setPick] = useState<OptionId | null>(null)
  const [issue, setIssue] = useState('')
  const [armed, setArmed] = useState<DrillMode | null>(null)
  const [heldMode, setHeldMode] = useState<DrillMode>('gate')

  if (!course || !gate || !play) {
    return (
      <div className="drill">
        <p className="drill-lead">没有这一关。</p>
        <Link className="drill-back" to="/drill">返回选择题</Link>
      </div>
    )
  }
  const stageGate = gate

  const held = holdingId ? questionById(holdingId) : undefined
  const heldAnswer = held ? [...drill.log].reverse().find((row) => row.questionId === held.id) : undefined
  const mode: DrillMode = play.open?.mode ?? armed ?? 'gate'
  const askingId = held
    ? ''
    : play.open?.nextId
      ?? (armed === 'gate' ? gate.questionIds[0] : armed === 'retry' ? play.last?.wrongIds[0] : '')
  const asking = askingId ? questionById(askingId) : undefined
  const point = pointById((held ?? asking)?.pointId ?? '')
  const answered = play.open?.answered ?? 0
  const total = mode === 'retry' ? (play.last?.wrongIds.length ?? 0) : gate.questionIds.length
  const courseGates = gatesInCourse(course.id)
  const gateIndex = courseGates.findIndex((item) => item.id === gate.id)
  const nextGate = courseGates[gateIndex + 1]

  function submit() {
    if (!asking || !pick) return
    const saved = answerDrill({ gateId: stageGate.id, questionId: asking.id, choice: pick, mode })
    if (!saved.ok) {
      setIssue(saved.issue)
      return
    }
    setIssue('')
    setHeldMode(mode)
    setHoldingId(saved.questionId)
    setPick(null)
    setArmed(null)
  }

  return (
    <div className="drill">
      <Link className="drill-back" to={`/drill/${course.id}`}>{course.title}</Link>
      <header className="drill-mast">
        <div>
          <p className="drill-kicker">第 {gateIndex + 1} 关</p>
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
          <p className="drill-progress">{heldMode === 'retry' ? '错题重练' : '本关'} · 已记下这题</p>
          <h2>{held.stem}</h2>
          <ol className="drill-options">
            {held.options.map((option) => {
              const picked = option.id === heldAnswer.choice
              const right = option.id === held.answer
              const mark = right ? 'is-right' : picked ? 'is-wrong' : ''
              return (
                <li key={option.id}>
                  <button type="button" className={`drill-option ${mark}`} disabled>
                    <i>{option.id.toUpperCase()}</i>
                    <span>{option.text}</span>
                  </button>
                  {option.id !== held.answer && held.whyWrong[option.id] ? (
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
          <button type="button" className="drill-go" onClick={() => { setHoldingId(null); setPick(null) }}>
            {play.open ? '下一题' : '查看这一关'}
          </button>
        </section>
      ) : null}

      {play.unlocked && !held && asking ? (
        <section className="drill-sheet">
          <p className="drill-progress">
            {mode === 'retry' ? '错题重练' : '本关'} · {answered + 1}/{total}
          </p>
          <div className="drill-dots" aria-hidden="true">
            {Array.from({ length: total }, (_, index) => (
              <i key={index} className={index < answered ? 'is-done' : index === answered ? 'is-now' : ''} />
            ))}
          </div>
          <h2>{asking.stem}</h2>
          {point ? <p className="drill-point">知识点：{point.title}</p> : null}
          <ol className="drill-options">
            {asking.options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  className={`drill-option ${pick === option.id ? 'is-picked' : ''}`}
                  aria-pressed={pick === option.id}
                  onClick={() => { setPick(option.id); setIssue('') }}
                >
                  <i>{option.id.toUpperCase()}</i>
                  <span>{option.text}</span>
                </button>
              </li>
            ))}
          </ol>
          {issue ? <p className="drill-issue">{issue}</p> : null}
          <button type="button" className="drill-go" disabled={!pick} onClick={submit}>确认这题</button>
        </section>
      ) : null}

      {play.unlocked && !held && !asking && !play.last ? (
        <section className="drill-sheet">
          <Seal status="open" />
          <h2>开始这一关</h2>
          <p>
            共 {gate.questionIds.length} 题，按顺序作答。至少答对 {neededCorrect(gate.questionIds.length)} 题（80%）才通关。
            答错可以稍后重练；整关没通过时，用复活再答一遍。
          </p>
          <button type="button" className="drill-go" onClick={() => setArmed('gate')}>开始答题</button>
        </section>
      ) : null}

      {play.unlocked && !held && !asking && play.last ? (
        <section className="drill-sheet">
          <Meter percent={play.last.percent} passed={play.last.passed} />
          <h2>{play.last.passed ? '这一关通过了' : '还没到 80%'}</h2>
          <p>
            这一轮 {play.last.correct}/{play.last.total}，正确率 {play.last.percent}%。
            最好成绩 {play.bestPercent}%。剩余复活 {play.revives} 次。
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
              <button type="button" className="drill-go" onClick={() => setArmed('gate')}>复活，再答这一关</button>
            ) : null}
            {!play.cleared && !play.canStartGate ? (
              <p className="drill-issue">复活次数用完了。把这一轮错题全部练对，可以补回 1 次。</p>
            ) : null}
            {play.cleared && nextGate ? (
              <Link className="drill-go" to={`/drill/${course.id}/${nextGate.id}`}>下一关</Link>
            ) : null}
            {play.cleared && !nextGate ? <Link className="drill-go" to="/drill/report">查看学习报告</Link> : null}
          </div>
        </section>
      ) : null}
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
  return (
    <div className="drill">
      <Link className="drill-back" to="/drill">返回选择题</Link>
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
            <Link to={`/drill/${course.id}`}>
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
  if (gateId && DRILL_GATES.some((gate) => gate.id === gateId)) return <DrillStage key={gateId} courseId={courseId} gateId={gateId} />
  if (courseId) return <DrillCourse courseId={courseId} />
  return <DrillLobby />
}
