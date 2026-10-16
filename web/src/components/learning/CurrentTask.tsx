import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { G1_WRITTEN_EXAMS, G2_RETRY_EXAMS, G2_WRITTEN_EXAMS, G3_WRITTEN_EXAMS, G4_WRITTEN_EXAMS, G5_WRITTEN_EXAMS, G6_WRITTEN_EXAMS, type WrittenExam, LEARNING_TASKS, type LearningTask } from '@/data/learningTasks'
import { choicesFor } from '@/data/gateChoices'
import { openQuestionById, type GateOpenQuestion } from '@/data/gateOpen'
import { nextVerifyId, verifyTier } from '@/data/gateVerify'
import { ORDER_SCALE_EXAMS } from '@/data/orderScaleGate'
import { RichBlocks } from '@/components/RichBlocks'
import { choicePassEvidence, exportEnvelope, labFailureEvidence, previewImport, selfEvidenceForDraft, taskVerified, type Attempt, type Evidence } from '@/state/learningEvidence'
import { useProgress } from '@/state/progress'

function scoreFor(evidence: readonly Evidence[], task: LearningTask) {
  const saved = evidence.find((item) => item.id === `${task.id}@${task.version}:self` && !item.deleted)
  return saved?.score?.source === 'self' ? saved.score.value : null
}

function latestAttempt(attempts: readonly Attempt[], task: { id: string; version: number }) {
  return [...attempts].reverse().find((item) => item.taskId === task.id && item.taskVersion === task.version && !item.deleted)
}

type ExamView = { draft: string; hint: 0 | 1 | 2 | 3; showParts: boolean }

const WRITTEN_EXAMS = [
  ...G1_WRITTEN_EXAMS,
  ...G2_WRITTEN_EXAMS,
  ...G2_RETRY_EXAMS,
  ...G3_WRITTEN_EXAMS,
  ...G4_WRITTEN_EXAMS,
  ...G5_WRITTEN_EXAMS,
  ...G6_WRITTEN_EXAMS,
  ...ORDER_SCALE_EXAMS,
]

function examView(attempts: readonly Attempt[], exam: WrittenExam): ExamView {
  const level = latestAttempt(attempts, exam)?.hintLevel ?? 0
  return {
    draft: latestAttempt(attempts, exam)?.draft ?? '',
    hint: level === 1 || level === 2 || level === 3 ? level : 0,
    showParts: false,
  }
}

function goToVerify(current: URLSearchParams, id: string) {
  const next = new URLSearchParams(current)
  next.set('verify', id)
  next.delete('deliver')
  return next
}

function ChoicePrompt({ exam }: { exam: WrittenExam }) {
  const progress = useProgress()
  const [params, setParams] = useSearchParams()
  const spec = choicesFor(exam.id)
  const passed = taskVerified(progress.learning.evidence, exam.id)
  const [picked, setPicked] = useState<string | null>(null)
  const nextId = nextVerifyId(exam.gateId, exam.id)
  if (!spec) return <p className="current-task-note">这一题还没有固定选项。</p>
  const answerId = spec.answerId
  function choose(id: string) {
    setPicked(id)
    if (id !== answerId || passed) return
    const saved = choicePassEvidence(exam, id)
    progress.saveLearningDraft(saved.attempt, saved.evidence)
  }
  const wrong = picked != null && picked !== answerId && !passed
  return (
    <div className="choice-list" role="group" aria-label={`${exam.code} 的选项`}>
      {spec.options.map((option) => {
        const right = passed && option.id === answerId
        const miss = wrong && option.id === picked
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={right || option.id === picked}
            className={right ? 'is-right' : miss ? 'is-wrong' : undefined}
            onClick={() => choose(option.id)}
          >
            {option.text}
          </button>
        )
      })}
      {passed ? <p role="status">这一项对上了。记成本地检查通过，过关勾选没有改。</p> : null}
      {passed && nextId ? (
        <button type="button" className="current-task-explained" onClick={() => setParams(goToVerify(params, nextId))}>
          <span>下一题</span>
          <small>这一项已经对上。过关勾选不变。</small>
        </button>
      ) : null}
      {passed && !nextId ? <p className="current-task-note">这一关的题做到这里。回这一关看石台。</p> : null}
      {wrong ? <p role="status">还不是这一项。可以再选。</p> : null}
    </div>
  )
}

function OpenQuestion({ question }: { question: GateOpenQuestion }) {
  const progress = useProgress()
  const [params, setParams] = useSearchParams()
  const attemptId = `${question.id}@1`
  const saved = [...progress.learning.attempts].reverse().find((item) => item.taskId === question.id && item.taskVersion === 1 && !item.deleted)
  const [draft, setDraft] = useState(saved?.draft ?? '')
  const [notice, setNotice] = useState('')
  const nextId = nextVerifyId(question.gateId, question.id)
  const save = () => {
    if (progress.learningReadonly) {
      setNotice('记录版本比本页新，不能改写。')
      return
    }
    const attempt: Attempt = {
      id: saved?.id ?? attemptId,
      taskId: question.id,
      taskVersion: 1,
      status: 'saved',
      hintLevel: 0,
      draft,
    }
    progress.saveLearningDraft(attempt, selfEvidenceForDraft(attempt, null))
    setNotice('已记下这份草稿。结果仍待复核，过关勾选没有改。')
  }
  return (
    <section className="current-task" aria-label={question.title}>
      <h2>{question.title}</h2>
      <p className="current-task-kicker">问答</p>
      <p className="current-task-note">这一道没有固定选项。写下你的比较，再展开参考答案。保存后是待复核，不改过关勾选。</p>
      <p>{question.objective}</p>
      <details className="current-task-answer">
        <summary>先自己写，再看参考答案</summary>
        <RichBlocks text={question.answer} />
      </details>
      <p className="current-task-note">依据：{question.basis}</p>
      <label className="current-task-draft">
        草稿
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={4} />
      </label>
      <div className="current-task-actions">
        <button type="button" className="current-task-explained" onClick={save}>
          <span>保存写下的内容</span>
          <small>记成这一题的证据。结果仍待复核。</small>
        </button>
        {nextId ? (
          <button type="button" className="current-task-explained" onClick={() => setParams(goToVerify(params, nextId))}>
            <span>下一题</span>
            <small>先去下一题。这一道没保存就还是未开始。</small>
          </button>
        ) : null}
      </div>
      {notice ? <p role="status">{notice}</p> : null}
    </section>
  )
}

function WrittenExamBlock({
  exam,
  view,
  evidence,
  onDraft,
  onHint,
  onSave,
  keeps,
  mode = 'written',
}: {
  exam: WrittenExam
  view: ExamView
  evidence: readonly Evidence[]
  onDraft: (draft: string) => void
  onHint: (hint: 0 | 1 | 2 | 3) => void
  onSave: () => void
  keeps: string
  mode?: 'written' | 'choice'
}) {
  const hintLabel = `written-hint-${exam.id}`
  if (mode === 'choice') {
    return (
      <div className="current-task-lab">
        <p className="current-task-kicker">选择 {exam.code}</p>
        <p className="current-task-note">
          {verifyTier('exam', exam.code) === 'advanced'
            ? '四选一，对上固定答案才算这一项。选对标成进阶记下，不计入这一关的通过，也不改过关勾选。'
            : '四选一，对上固定答案才算这一项。选对只记本地检查通过，不改过关勾选。'}
        </p>
        <p>{exam.question}</p>
        <ChoicePrompt exam={exam} />
        <details className="current-task-answer">
          <summary>先自己选，再看参考答案</summary>
          {exam.parts.map((part) => (
            <p key={part.label}>{part.label}：{part.lookFor}</p>
          ))}
        </details>
        <p className="current-task-note">依据：{exam.basis}</p>
      </div>
    )
  }
  return (
    <div className="current-task-lab">
      <p className="current-task-kicker">笔试 {exam.code}</p>
      <p className="current-task-note">题版本 {exam.version}。这一题单独保存，不会改{keeps}，也不会改其他笔试。结论、机制、边界共 10 分由人打，本页不比照下面的要点判对错。</p>
      <RichBlocks text={exam.question} />
      <ol>
        {exam.parts.map((part) => (
          <li key={part.label}>{part.label} {part.points} 分。</li>
        ))}
      </ol>
      <details className="current-task-answer">
        <summary>{exam.answer ? '先自己写，再看标准答案' : '先自己写，再看参考答案'}</summary>
        {exam.diagram ? (
          <figure className="exam-figure">
            <img src={`${import.meta.env.BASE_URL}${exam.diagram}`} alt={`${exam.code} 的标准图`} />
          </figure>
        ) : null}
        {exam.answer ? <RichBlocks text={exam.answer} /> : null}
        <p className="current-task-kicker">阅卷要点</p>
        {exam.parts.map((part) => (
          <p key={part.label}>{part.label}：{part.lookFor}</p>
        ))}
      </details>
      <p className="current-task-note">依据：{exam.basis}</p>
      <p className="current-task-kicker" id={hintLabel}>分级提示</p>
      <p className="current-task-note">点到哪一级，就展开到哪一级。保存时记下这一级。</p>
      <div className="current-task-score" role="group" aria-labelledby={hintLabel}>
        {exam.hints.map((hint) => (
          <button
            key={hint.level}
            type="button"
            aria-pressed={view.hint === hint.level}
            onClick={() => onHint(view.hint === hint.level ? 0 : hint.level)}
          >
            {hint.level} 级
          </button>
        ))}
      </div>
      {exam.hints.filter((hint) => hint.level <= view.hint).map((hint) => (
        <p key={hint.level}>{hint.level} 级：{hint.text}</p>
      ))}
      <p className="current-task-kicker">口述</p>
      <ul>
        {exam.oral.map((axis) => (
          <li key={axis.label}>{axis.label}：0～{axis.max}，至少 {axis.passAt}。本页不打这一分。</li>
        ))}
      </ul>
      <p className="current-task-note">四项都至少 3 才通过。这一分由人打。</p>
      <label className="current-task-draft">
        笔试草稿
        <textarea value={view.draft} onChange={(event) => onDraft(event.target.value)} rows={4} />
      </label>
      <div className="current-task-actions">
        <button type="button" className="current-task-explained" onClick={onSave}>
          <span>保存笔试草稿</span>
          <small>记到 {exam.code}，题版本 {exam.version}。不判这 10 分。</small>
        </button>
      </div>
      {evidence.length ? (
        <ul>
          {evidence.map((item) => (
            <li key={item.id}>{item.summary} 结果是待复核。</li>
          ))}
        </ul>
      ) : <p className="current-task-note">还没有这一道笔试的证据。</p>}
    </div>
  )
}

export function CurrentTask({
  focusId,
  isolate = false,
  onDraftSaved,
}: {
  focusId?: string
  isolate?: boolean
  onDraftSaved?: () => void
}) {
  const progress = useProgress()
  const initialTask = LEARNING_TASKS.find((item) => item.id === focusId)
    ?? LEARNING_TASKS.find((item) => item.estimatedMinutes === 30)
    ?? LEARNING_TASKS[0]
  const [minutes, setMinutes] = useState<LearningTask['estimatedMinutes']>(initialTask.estimatedMinutes)
  const [draft, setDraft] = useState(() => latestAttempt(progress.learning.attempts, initialTask)?.draft ?? '')
  const [score, setScore] = useState<number | null>(() => scoreFor(progress.learning.evidence, initialTask))
  const [checkId, setCheckId] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const [transfer, setTransfer] = useState('')
  const [examViews, setExamViews] = useState<Record<string, ExamView>>(() =>
    Object.fromEntries(WRITTEN_EXAMS.map((exam) => [exam.id, examView(progress.learning.attempts, exam)])),
  )
  const isolatedExam = isolate ? WRITTEN_EXAMS.find((item) => item.id === focusId) : undefined
  const isolatedOpen = isolate ? openQuestionById(focusId) : undefined
  const [trackedFocus, setTrackedFocus] = useState(focusId)
  if (focusId !== trackedFocus) {
    setTrackedFocus(focusId)
    const next = LEARNING_TASKS.find((item) => item.id === focusId)
    if (next) {
      const saved = latestAttempt(progress.learning.attempts, next)
      setMinutes(next.estimatedMinutes)
      setDraft(saved?.draft ?? '')
      setScore(scoreFor(progress.learning.evidence, next))
      setCheckId(null)
    }
  }
  const task = (isolate ? LEARNING_TASKS.find((item) => item.id === focusId) : undefined)
    ?? LEARNING_TASKS.find((item) => item.estimatedMinutes === minutes)
    ?? LEARNING_TASKS[0]
  const attemptId = `${task.id}@${task.version}`
  const latest = latestAttempt(progress.learning.attempts, task)
  const currentId = latest?.id ?? attemptId
  const evidence = progress.learning.evidence.filter((item) => item.taskId === task.id && !item.deleted)
  const patchExam = (id: string, patch: Partial<ExamView>) => {
    setExamViews((current) => ({ ...current, [id]: { ...current[id], ...patch } }))
  }
  const pause = progress.learning.pause
  const latestEvidence = [...progress.learning.evidence].reverse().find((item) => !item.deleted)
  const openAttempt = [...progress.learning.attempts].reverse().find((item) => !item.deleted)
  const openTask = LEARNING_TASKS.find((item) => item.id === openAttempt?.taskId)

  const choose = (value: LearningTask['estimatedMinutes']) => {
    const next = LEARNING_TASKS.find((item) => item.estimatedMinutes === value) ?? LEARNING_TASKS[0]
    const saved = latestAttempt(progress.learning.attempts, next)
    setMinutes(value)
    setDraft(saved?.draft ?? '')
    setScore(scoreFor(progress.learning.evidence, next))
    setCheckId(null)
    setNotice('')
  }

  const writeAttempt = (status: Attempt['status'], id: string, text: string, evidence?: Evidence) => {
    progress.saveLearningDraft({
      id,
      taskId: task.id,
      taskVersion: task.version,
      status,
      hintLevel: 0,
      draft: text,
    }, evidence)
  }

  const save = () => {
    if (progress.learningReadonly) {
      setNotice('记录版本比本页新，不能改写。')
      return
    }
    if (!draft.trim()) {
      setNotice('先写下草稿。空草稿不会记成证据。')
      return
    }
    const kept: Attempt['status'] = task.lab && (latest?.status === 'started' || latest?.status === 'failed') ? latest.status : 'draft'
    const attempt = {
      id: currentId,
      taskId: task.id,
      taskVersion: task.version,
      status: kept,
      hintLevel: 0,
      draft,
    }
    const evidence = selfEvidenceForDraft(attempt, task.rubric === 'human' ? score : null)
    progress.saveLearningDraft(attempt, evidence)
    const scored = evidence.score ? `已记下自评 ${evidence.score.value} / 4，来源是学员自己。` : '已记下草稿。'
    setNotice(progress.storageIssue || `${scored}本站没有运行代码，结果是待复核。`)
    onDraftSaved?.()
  }

  const saveExam = (exam: WrittenExam) => {
    if (progress.learningReadonly) {
      setNotice('记录版本比本页新，不能改写。')
      return
    }
    const view = examViews[exam.id]
    if (!view?.draft.trim()) {
      setNotice('先写下笔试草稿。空草稿不会记成证据。')
      return
    }
    const saved = latestAttempt(progress.learning.attempts, exam)
    const attempt = {
      id: saved?.id ?? `${exam.id}@${exam.version}`,
      taskId: exam.id,
      taskVersion: exam.version,
      status: 'draft' as const,
      hintLevel: view.hint,
      draft: view.draft,
    }
    progress.saveLearningDraft(attempt, selfEvidenceForDraft(attempt, null))
    setNotice(progress.storageIssue || `已记下 ${exam.code} 的草稿，题版本 ${exam.version}。这 10 分由人打，本页没有判对错。`)
    onDraftSaved?.()
  }

  const download = () => {
    const exported = exportEnvelope(progress.learning)
    if (!exported.ok) {
      setNotice(exported.issue)
      setTransfer(draft)
      return
    }
    setTransfer(exported.json)
    setNotice('导出内容在下面。文件还没有替你保管。')
  }

  const startLab = () => {
    if (progress.learningReadonly) {
      setNotice('记录版本比本页新，不能改写。')
      return
    }
    writeAttempt('started', currentId, draft)
    setNotice('已记下开始。命令仍要在本机运行。本站没有运行测试，结果仍是待复核。')
  }

  const recordFailure = () => {
    if (progress.learningReadonly) {
      setNotice('记录版本比本页新，不能改写。')
      return
    }
    const check = task.lab?.checks.find((item) => item.id === checkId)
    if (!latest || (latest.status !== 'started' && latest.status !== 'failed') || !check) {
      setNotice('先按「记为已开始」，再选一条没有成立的。本站不会运行测试。')
      return
    }
    if (!draft.trim()) {
      setNotice('写下你看到的结果。空记录不会记成证据。')
      return
    }
    const attempt = {
      id: currentId,
      taskId: task.id,
      taskVersion: task.version,
      status: 'failed' as const,
      hintLevel: 0,
      draft,
    }
    writeAttempt('failed', currentId, draft, labFailureEvidence(attempt, check))
    setNotice(`已记下未通过。${check.next}其他证据还在。结果是待复核，关卡勾选没有变化。`)
  }

  const retryLab = () => {
    if (progress.learningReadonly) {
      setNotice('记录版本比本页新，不能改写。')
      return
    }
    if (!latest) {
      setNotice('先按「记为已开始」。')
      return
    }
    const count = progress.learning.attempts.filter((item) => item.taskId === task.id && item.taskVersion === task.version).length
    const id = `${attemptId}#${count + 1}`
    writeAttempt('started', id, '')
    setDraft('')
    setCheckId(null)
    setNotice('已另记一次。上一份未通过还在。本站没有运行测试。')
  }

  const continueTask = () => {
    if (progress.learningReadonly) {
      setNotice('记录版本比本页新，不能改写。')
      return
    }
    if (latest?.status !== 'failed') return
    writeAttempt('started', currentId, draft)
    setNotice('已继续这一题。未通过记录还在，其他证据没有减少。')
  }

  const pauseFor = (choice: 'day' | 'week' | 'month') => {
    if (progress.learningReadonly) {
      setNotice('记录版本比本页新，不能改写。')
      return
    }
    progress.setLearningPause(choice)
    setNotice('已暂停。草稿和证据都还在。')
  }

  const resume = () => {
    progress.setLearningPause(null)
    choose(15)
    setNotice('已继续。从 15 分钟这条看起。记录没有减少。')
  }

  const lookAtImport = () => {
    try {
      const preview = previewImport(JSON.parse(transfer), progress.learning)
      setNotice(preview.ok
        ? preview.conflicts.length
          ? `${preview.issue} 冲突 ${preview.conflicts.length} 条，没有合并。`
          : `可以导入。草稿 ${preview.counts.attempts} 条，证据 ${preview.counts.evidence} 条。确认前不会写入。`
        : preview.issue)
    } catch {
      setNotice('这不是一份学习记录。')
    }
  }

  if (isolatedOpen) return <OpenQuestion question={isolatedOpen} />

  if (isolatedExam) {
    const view = examViews[isolatedExam.id] ?? { draft: '', hint: 0 as const, showParts: false }
    return (
      <section className="current-task" aria-label={isolatedExam.question.split('\n')[0]}>
        <WrittenExamBlock
          mode={isolatedExam.gateId === 'g-order-scale' ? 'written' : 'choice'}
          exam={isolatedExam}
          keeps="这一关其它验证的草稿"
          view={view}
          evidence={progress.learning.evidence.filter((item) => item.taskId === isolatedExam.id && !item.deleted)}
          onDraft={(text) => patchExam(isolatedExam.id, { draft: text })}
          onHint={(hint) => patchExam(isolatedExam.id, { hint })}
          onSave={() => saveExam(isolatedExam)}
        />
        {notice ? <p role="status">{notice}</p> : null}
      </section>
    )
  }

  return (
    <section className="current-task" aria-label={isolate ? task.title : '当次任务'}>
      {isolate ? (
        <>
          <h2>{task.title}</h2>
          <p className="current-task-note">这一座只做这一道。保存后是待复核，不会改这一关的过关勾选。</p>
        </>
      ) : (
        <>
          <h2>当次任务</h2>
          <p className="current-task-lead">一次只看一件。九关地图和全部课程仍可直接打开。关卡上的勾选是自评。</p>
        </>
      )}
      {!isolate && pause ? (
        <div className="current-task-pause">
          <p role="status">已暂停{pause.choice === 'day' ? '一天' : pause.choice === 'week' ? '一周' : '一个月'}。草稿和证据都还在，没有扣减。</p>
          <p>最近证据：{latestEvidence?.summary ?? '还没有证据。'}</p>
          <p>未完成：{openTask?.title ?? '还没有开始的草稿。'}</p>
          <button type="button" onClick={resume}>继续，从 15 分钟看起</button>
        </div>
      ) : null}
      {isolate ? null : (
      <div className="current-task-block">
        <p className="current-task-kicker" id="current-task-switch-label">按预计用时换题</p>
        <p className="current-task-note">点一条就换成那道题。时长是预计，不是倒计时。</p>
        <div className="current-task-switch" role="group" aria-labelledby="current-task-switch-label">
          {LEARNING_TASKS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="current-task-option"
              aria-pressed={item.estimatedMinutes === minutes}
              onClick={() => choose(item.estimatedMinutes)}
            >
              <span className="current-task-option-time">{item.estimatedMinutes} 分钟</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
      )}
      {isolate ? <p className="current-task-kicker">问答</p> : null}
      {isolate ? null : <h3>{task.title}</h3>}
      <p>{task.objective}</p>
      <dl className="current-task-facts">
        <dt>输入</dt>
        <dd>{task.inputs}</dd>
        <dt>完成条件</dt>
        <dd>{task.doneWhen}</dd>
        <dt>提示</dt>
        <dd>{task.hint}</dd>
        <dt>题版本</dt>
        <dd>{task.version}</dd>
      </dl>
      <details className="current-task-answer">
        <summary>先自己写，再看参考答案</summary>
        <RichBlocks text={task.answer} />
      </details>
      {task.basis ? <p className="current-task-note">依据：{task.basis}</p> : null}
      {task.lab ? (
        <div className="current-task-lab">
          <p className="current-task-kicker">本机命令</p>
          <p className="current-task-note">在样板目录里运行。本站不执行这条命令。你写下的结果保持待复核。</p>
          <pre className="current-task-command"><code>{task.lab.command}</code></pre>
          <div className="current-task-checks" role="group" aria-labelledby="current-task-checks-label">
            <p className="current-task-kicker" id="current-task-checks-label">哪一条没有成立</p>
            <p className="current-task-note">点一条表示你在本机看到它没有成立。这里不会运行测试。</p>
            {task.lab.checks.map((check) => (
              <button key={check.id} type="button" className="current-task-option" aria-pressed={checkId === check.id} onClick={() => setCheckId(check.id)}>
                <span className="current-task-option-time">{checkId === check.id ? '已选' : '选择'}</span>
                <span>{check.behavior}</span>
              </button>
            ))}
          </div>
          <div className="current-task-actions">
            <button type="button" className="current-task-explained" onClick={startLab}>
              <span>记为已开始</span>
              <small>只在本页记一笔。命令仍要你在本机运行。</small>
            </button>
            <button type="button" className="current-task-explained" onClick={recordFailure}>
              <span>记下没成立</span>
              <small>先选上面一条，并把看到的结果写在下面。</small>
            </button>
            <button type="button" className="current-task-explained" onClick={retryLab}>
              <span>另记一次</span>
              <small>新的一次开始。上一份未通过还留着。</small>
            </button>
            {latest?.status === 'failed' ? (
              <button type="button" className="current-task-explained" onClick={continueTask}>
                <span>继续这一题</span>
                <small>回到同一次。未通过的记录不删。</small>
              </button>
            ) : null}
          </div>
          {latest?.status === 'failed' ? <p>这一题仍在进行。未通过的记录还在。关卡勾选没有变化。</p> : null}
        </div>
      ) : null}
      <label className="current-task-draft">
        {task.lab ? '看到的结果' : '草稿'}
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={4} />
      </label>
      {task.rubric === 'human' ? (
        <div className="current-task-score" role="group" aria-label="自评分数">
          <span>给这份草稿打 0 到 4 分，和草稿一起保存。这不是通过。</span>
          {([0, 1, 2, 3, 4] as const).map((value) => (
            <button key={value} type="button" aria-pressed={score === value} onClick={() => setScore(value)}>
              {value}
            </button>
          ))}
        </div>
      ) : task.lab ? null : <p className="current-task-note">这段代码本站不运行，没有自动评分。</p>}
      <div className="current-task-actions">
        <button type="button" className="current-task-explained" onClick={save}>
          <span>保存写下的内容</span>
          <small>记成这一题的证据。结果仍待复核。</small>
        </button>
      </div>
      {isolate ? null : (task.id === 'g1.write-path' ? G1_WRITTEN_EXAMS : task.id === 'g2.concurrency-note' ? G2_WRITTEN_EXAMS : task.id === 'g2.idempotent-retry' ? G2_RETRY_EXAMS : []).map((exam) => (
        <WrittenExamBlock
          key={exam.id}
          exam={exam}
          keeps={task.id === 'g1.write-path' ? '上面四段职责的草稿' : '上面的实验结果'}
          view={examViews[exam.id] ?? { draft: '', hint: 0, showParts: false }}
          evidence={progress.learning.evidence.filter((item) => item.taskId === exam.id && !item.deleted)}
          onDraft={(draft) => patchExam(exam.id, { draft })}
          onHint={(hint) => patchExam(exam.id, { hint })}
          onSave={() => saveExam(exam)}
        />
      ))}
      {isolate ? null : (
      <>
      <section className="current-task-block" aria-labelledby="g3-written-label">
        <p className="current-task-kicker" id="g3-written-label">第 3 关笔试</p>
        <p className="current-task-note">下面这些题不在 15、30、60 分钟三档里。换题不会把它们收起来。每道题单独保存，也不会写进上面那一题。</p>
        {G3_WRITTEN_EXAMS.map((exam) => (
          <WrittenExamBlock
            key={exam.id}
            exam={exam}
            keeps="上面当次任务的草稿"
            view={examViews[exam.id] ?? { draft: '', hint: 0, showParts: false }}
            evidence={progress.learning.evidence.filter((item) => item.taskId === exam.id && !item.deleted)}
            onDraft={(draft) => patchExam(exam.id, { draft })}
            onHint={(hint) => patchExam(exam.id, { hint })}
            onSave={() => saveExam(exam)}
          />
        ))}
      </section>
      <section className="current-task-block" aria-labelledby="g4-written-label">
        <p className="current-task-kicker" id="g4-written-label">第 4 关笔试</p>
        <p className="current-task-note">下面这些题不在 15、30、60 分钟三档里，也不写进第 3 关笔试。换题不会把它们收起来。每道题单独保存。</p>
        {G4_WRITTEN_EXAMS.map((exam) => (
          <WrittenExamBlock
            key={exam.id}
            exam={exam}
            keeps="上面当次任务和第 3 关笔试的草稿"
            view={examViews[exam.id] ?? { draft: '', hint: 0, showParts: false }}
            evidence={progress.learning.evidence.filter((item) => item.taskId === exam.id && !item.deleted)}
            onDraft={(draft) => patchExam(exam.id, { draft })}
            onHint={(hint) => patchExam(exam.id, { hint })}
            onSave={() => saveExam(exam)}
          />
        ))}
      </section>
      <section className="current-task-block" aria-labelledby="g5-written-label">
        <p className="current-task-kicker" id="g5-written-label">第 5 关笔试</p>
        <p className="current-task-note">下面这些题不在 15、30、60 分钟三档里，也不写进第 3 关或第 4 关笔试。换题不会把它们收起来。每道题单独保存。</p>
        {G5_WRITTEN_EXAMS.map((exam) => (
          <WrittenExamBlock
            key={exam.id}
            exam={exam}
            keeps="上面当次任务和第 3 关、第 4 关笔试的草稿"
            view={examViews[exam.id] ?? { draft: '', hint: 0, showParts: false }}
            evidence={progress.learning.evidence.filter((item) => item.taskId === exam.id && !item.deleted)}
            onDraft={(draft) => patchExam(exam.id, { draft })}
            onHint={(hint) => patchExam(exam.id, { hint })}
            onSave={() => saveExam(exam)}
          />
        ))}
      </section>
      <section className="current-task-block" aria-labelledby="g6-written-label">
        <p className="current-task-kicker" id="g6-written-label">第 6 关笔试</p>
        <p className="current-task-note">下面这些题不在 15、30、60 分钟三档里，也不写进第 3 关到第 5 关笔试。换题不会把它们收起来。每道题单独保存。</p>
        {G6_WRITTEN_EXAMS.map((exam) => (
          <WrittenExamBlock
            key={exam.id}
            exam={exam}
            keeps="上面当次任务和第 3 关到第 5 关笔试的草稿"
            view={examViews[exam.id] ?? { draft: '', hint: 0, showParts: false }}
            evidence={progress.learning.evidence.filter((item) => item.taskId === exam.id && !item.deleted)}
            onDraft={(draft) => patchExam(exam.id, { draft })}
            onHint={(hint) => patchExam(exam.id, { hint })}
            onSave={() => saveExam(exam)}
          />
        ))}
      </section>
      <details className="current-task-more">
        <summary>带走或合并记录</summary>
        <p className="current-task-note">导出把记录显示在下面，不另存文件。检查只看下面这份文本能不能导入，确认前不写入。</p>
        <div className="current-task-actions">
          <button type="button" className="current-task-explained" onClick={download}>
            <span>导出记录</span>
            <small>内容出现在下面的文本框。</small>
          </button>
          <button type="button" className="current-task-explained" onClick={lookAtImport}>
            <span>检查能否导入</span>
            <small>只预览，不会写入当前记录。</small>
          </button>
        </div>
      </details>
      {pause ? null : (
        <div className="current-task-leave">
          <p className="current-task-kicker" id="current-task-pause-label">先离开</p>
          <p className="current-task-note">草稿和证据都还在。回来仍从 15 分钟那题看起。</p>
          <div role="group" aria-labelledby="current-task-pause-label">
            <button type="button" onClick={() => pauseFor('day')}>一天后回来</button>
            <button type="button" onClick={() => pauseFor('week')}>一周后回来</button>
            <button type="button" onClick={() => pauseFor('month')}>一个月后回来</button>
          </div>
        </div>
      )}
      </>
      )}
      <h3>证据</h3>
      {evidence.length ? (
        <ul>
          {evidence.map((item) => (
            <li key={item.id}>
              {item.summary}
              {item.score ? ` 自评 ${item.score.value} / 4，来源是学员自己。` : ''}
              {taskVerified([item], task.id) ? ' 已通过。' : ' 结果是待复核。'}
            </li>
          ))}
        </ul>
      ) : <p className="current-task-note">还没有这一题的证据。</p>}
      {notice ? <p role="status">{notice}</p> : null}
      {transfer ? <textarea readOnly value={transfer} rows={3} aria-label="导出或待导入的记录" /> : null}
    </section>
  )
}
