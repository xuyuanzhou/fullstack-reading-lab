import { Button, Collapse, Input, Radio, Space } from 'antd'
import { useEffect, useState } from 'react'
import { Link, Navigate, useOutletContext, useParams } from 'react-router-dom'
import { AiDiagram } from '@/components/AiDiagrams'
import { AiPrereqGate } from '@/components/AiPrereqGate'
import { AiRouteMap } from '@/components/AiRouteMap'
import { InterviewWorkbench } from '@/components/InterviewWorkbench'
import { L1Workbench } from '@/components/L1Workbench'
import { L2Workbench } from '@/components/L2Workbench'
import { L3Workbench } from '@/components/L3Workbench'
import { AI_MOCK_INTERVIEWS } from '@/data/aiInterviewBank'
import {
  aiNote,
  aiProgressId,
  aiSection,
  noteNeighbors,
  notesInSection,
  sectionKeyForNote,
  type AiExperiment,
  type AiNote,
  type AiQuiz,
} from '@/data/aiCatalog'
import { AI_DIAGNOSTIC, AI_PATHS, scoreDiagnostic } from '@/data/aiDiagnostic'
import { L0_CASES, L0_MATERIALS, gradeL0Pack } from '@/labs/l0Verify'
import { useProgress } from '@/state/progress'

type OutletCtx = { localReady: boolean | null }

const LAB_LINK: Record<string, { to: string; label: string }> = {
  'prompt-once': { to: '/ai/lab/prompt', label: '到练习台改这一次的提示词' },
  'find-then-answer': { to: '/ai/lab/prompt', label: '到练习台把材料写进这一次' },
  'one-success': { to: '/ai/lab/prompt', label: '到练习台写下没有答案时的出口' },
  'hallucination-cite': { to: '/ai/lab/prompt', label: '到练习台写下没有依据时的出口' },
  'model-proposes': { to: '/ai/lab/agent', label: '到练习台声明工具并走一遍' },
  permissions: { to: '/ai/lab/agent', label: '到练习台把确认写进循环' },
  'prompt-injection': { to: '/ai/lab/agent', label: '到练习台给危险动作标确认' },
  'agent-interview': { to: '/ai/lab/agent', label: '到练习台按节点走查班次与确认' },
  'you-own': { to: '/ai/lab/agent', label: '到练习台写下停点并导出' },
  'skill-place': { to: '/ai/lab/agent', label: '到练习台给这条命令标权限' },
}

const EXPERIMENT_MODE: Record<AiExperiment['mode'], string> = {
  explain: '讲解 / 纸面推演（不调用模型）',
  mock: '可运行 mock（假供应商，非真实模型）',
  live: '真实模型（需你自配密钥与服务）',
}

export function AiPage() {
  const { sectionKey } = useParams()
  const section = aiSection(sectionKey)
  const notes = notesInSection(section.key)
  return (
    <div className="article-shell">
      <div className="page-kicker">
        <span>公开学习路线</span>
        <span className="dot" />
        <span>AI</span>
      </div>
      <h1 className="hero-title">{section.pageTitle || 'AI，从结构走到能运行的应用'}</h1>
      <p className="hero-lead">
        {section.pageLead ||
          '每篇都可以在公开站读完。文末链接开放许可的材料和官方文档。已购手册的全文和配图只在本机阅读器连上时打开。'}
      </p>
      {!section.pageLead && <p className="muted">{section.lead}</p>}
      {section.key === 'intro' ? <AiRouteMap /> : null}
      <div className="lesson-list">
        {notes.map((note, index) => (
          <Link key={note.key} className="lesson-row" to={`/ai/${section.key}/${note.key}`}>
            <span className="lesson-row-mark" aria-hidden>
              {index + 1}
            </span>
            <span>
              <strong>{note.title}</strong>
              <p>{note.scope}</p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function AiNotePage() {
  const { sectionKey, noteKey } = useParams()
  const section = aiSection(sectionKey)
  const note = aiNote(section.key, noteKey)
  const { localReady } = useOutletContext<OutletCtx>()
  const progress = useProgress()
  if (!note || note.section !== section.key) return <Navigate to={`/ai/${section.key}`} replace />
  const progressId = aiProgressId(note)
  const showL1 = ['retrieve-baseline', 'rag-pipeline', 'eval-runner', 'l1-kb'].includes(note.key)
  const showL2 = ['controlled-agent', 'ai-security', 'ai-serving', 'l2-agent'].includes(note.key)
  const showInterview = [
    'project-defense',
    'interview-bank',
    'mock-interview-basic',
    'mock-interview-debug',
    'mock-interview-design',
  ].includes(note.key)
  const interviewFilter =
    note.key === 'mock-interview-basic'
      ? [...AI_MOCK_INTERVIEWS[0].questionIds]
      : note.key === 'mock-interview-debug'
        ? [...AI_MOCK_INTERVIEWS[1].questionIds]
        : note.key === 'mock-interview-design'
          ? [...AI_MOCK_INTERVIEWS[2].questionIds]
          : undefined

  useEffect(() => {
    progress.rememberAi(progressId)
  }, [progressId, progress.rememberAi])

  return (
    <div className="article-shell">
      <div className="page-kicker">
        <Link to={`/ai/${section.key}`}>{section.label}</Link>
        <span className="dot" />
        <span>公开阅读</span>
      </div>
      <h1 className="hero-title">{note.title}</h1>
      <p className="hero-lead">{note.scope}</p>
      {note.outcomes?.length ? (
        <section className="ai-outcomes">
          <h2 className="page-title">学完会什么</h2>
          <ul>
            {note.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {note.prerequisites?.length ? (
        <p className="muted">
          先修：
          {note.prerequisites.map((key, index) => (
            <span key={key}>
              {index ? '、' : ''}
              <Link to={`/ai/${sectionKeyForNote(key)}/${key}`}>{key}</Link>
            </span>
          ))}
        </p>
      ) : null}
      <AiPrereqGate noteKey={note.key} />
      {note.terms?.length ? (
        <section>
          <h2 className="page-title">术语</h2>
          <ul className="ai-term-list">
            {note.terms.map((term) => (
              <li key={term.en}>
                <strong>
                  {term.zh}（{term.en}）
                </strong>
                ：{term.meaning}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <AiDiagram name={note.key} />
      <div className="reading-copy">
        {note.reading.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {note.key === 'ai-map' ? <DiagnosticPanel /> : null}
      {note.key === 'l0-verify' ? <L0VerifyPanel /> : null}
      {showL1 ? <L1Workbench compact={note.key === 'retrieve-baseline'} /> : null}
      {showL2 ? <L2Workbench compact={note.key !== 'l2-agent'} /> : null}
      {note.key === 'l3-finetune' ? <L3Workbench /> : null}
      {showInterview ? (
        <InterviewWorkbench
          filterIds={interviewFilter}
          compact={note.key === 'project-defense'}
        />
      ) : null}
      {note.experiment ? <ExperimentBlock experiment={note.experiment} /> : null}
      {note.sources.length > 0 && (
        <section>
          <h2 className="page-title">对照阅读</h2>
          <div className="source-list">
            {note.sources.map((source) => (
              <a key={source.href} className="source-row" href={source.href} target="_blank" rel="noreferrer">
                <strong>{source.title}</strong>
                <small>{source.terms}</small>
              </a>
            ))}
          </div>
        </section>
      )}
      {note.practice && (
        <section>
          <h2 className="page-title">自己做一次</h2>
          <div className="reading-copy">
            <p>{note.practice}</p>
            {LAB_LINK[note.key] && (
              <p>
                <Link to={LAB_LINK[note.key].to}>{LAB_LINK[note.key].label}</Link>
              </p>
            )}
          </div>
        </section>
      )}
      {note.practiceItems?.length ? (
        <section>
          <h2 className="page-title">练习与参考答案</h2>
          <Collapse
            bordered={false}
            style={{ background: 'transparent' }}
            items={note.practiceItems.map((item, index) => ({
              key: `practice-${index}`,
              label: `练习 ${index + 1}：先自己做，再展开答案`,
              children: (
                <div className="reading-copy">
                  <p>
                    <strong>题：</strong>
                    {item.prompt}
                  </p>
                  <p>
                    <strong>参考答案：</strong>
                    {item.answer}
                  </p>
                  {item.scoring?.length ? (
                    <p className="muted">评分点：{item.scoring.join('；')}</p>
                  ) : null}
                </div>
              ),
            }))}
          />
        </section>
      ) : null}
      {note.quizzes?.length ? (
        <section>
          <h2 className="page-title">面试追问</h2>
          {note.quizzes.map((quiz, index) => (
            <QuizBlock key={quiz.question} quiz={quiz} index={index} />
          ))}
        </section>
      ) : null}
      {note.verifiedAt ? <p className="muted">内容核查日期：{note.verifiedAt}</p> : null}
      <section>
        <h2 className="page-title">笔记与进度（仅 AI 路线）</h2>
        <Space wrap style={{ marginBottom: 12 }}>
          <Button type="primary" onClick={() => progress.toggleAiDone(progressId)}>
            {progress.aiDone.includes(progressId) ? '已掌握 · 撤销' : '标记已掌握'}
          </Button>
          <Button onClick={() => progress.toggleAiReview(progressId)}>
            {progress.aiReview.includes(progressId) ? '移出复习清单' : '加入复习清单'}
          </Button>
        </Space>
        <Input.TextArea
          rows={4}
          aria-label="AI 课笔记"
          value={progress.aiNotes[progressId] || ''}
          placeholder="写下你还讲不清的地方；只保存在本浏览器，不与前端/Java 笔记混用。"
          onChange={(event) => progress.setAiNote(progressId, event.target.value)}
        />
      </section>
      <LocalCopy note={note} localReady={localReady} />
      <NoteNav note={note} />
    </div>
  )
}

function DiagnosticPanel() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ReturnType<typeof scoreDiagnostic> | null>(null)
  const answered = AI_DIAGNOSTIC.every((item) => answers[item.id])

  return (
    <section className="ai-experiment">
      <h2 className="page-title">学习诊断（不计排名）</h2>
      <p className="muted">选最接近现状的一项。结果只推荐路径，不是能力证明或录用预测。</p>
      <div className="ai-diagnostic-list">
        {AI_DIAGNOSTIC.map((question, index) => (
          <div key={question.id} className="ai-quiz">
            <p>
              <strong>
                {index + 1}. {question.prompt}
              </strong>
            </p>
            <Radio.Group
              value={answers[question.id]}
              onChange={(event) => {
                setResult(null)
                setAnswers((prev) => ({ ...prev, [question.id]: event.target.value }))
              }}
            >
              <Space direction="vertical">
                {question.choices.map((choice) => (
                  <Radio key={choice.id} value={choice.id}>
                    {choice.text}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        ))}
      </div>
      <Button
        type="primary"
        disabled={!answered}
        onClick={() => setResult(scoreDiagnostic(answers))}
        style={{ marginTop: 12 }}
      >
        查看路径建议
      </Button>
      {result ? (
        <div className="reading-copy" style={{ marginTop: 16 }}>
          <p>
            <strong>主推荐：</strong>
            {AI_PATHS[result.primary].label} — {AI_PATHS[result.primary].next}
          </p>
          <p>
            <strong>次推荐：</strong>
            {AI_PATHS[result.secondary].label} — {AI_PATHS[result.secondary].skipHint}
          </p>
          <p className="muted">
            分项（仅供对照）：使用 {result.totals.use} · 补编程 {result.totals.code} · 应用{' '}
            {result.totals.app} · 算法 {result.totals.algo}
          </p>
        </div>
      ) : null}
    </section>
  )
}

function L0VerifyPanel() {
  const report = gradeL0Pack()
  return (
    <section className="ai-experiment">
      <h2 className="page-title">L0 校验包（样例，非现场模型）</h2>
      <p>
        <strong>材料：</strong>
      </p>
      <ol>
        {L0_MATERIALS.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>
      {L0_CASES.map((item) => {
        const row = report.find((entry) => entry.id === item.id)
        return (
          <div key={item.id} className="ai-quiz">
            <p>
              <strong>
                {item.id}：{item.question}
              </strong>
            </p>
            <p className="muted">样例输出（预录）：{JSON.stringify(item.sampleOutput)}</p>
            <ul>
              {row?.sample.map((check) => (
                <li key={check.id}>
                  {check.ok ? '通过' : '失败'} · {check.detail}
                </li>
              ))}
            </ul>
            {item.badSample ? (
              <>
                <p className="muted">坏例（预录）：{JSON.stringify(item.badSample)}</p>
                <p>错因：{item.badSample.whyWrong}</p>
                <ul>
                  {row?.bad.map((check) => (
                    <li key={check.id}>
                      {check.ok ? '仍通过' : '已抓住'} · {check.detail}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        )
      })}
    </section>
  )
}

function ExperimentBlock({ experiment }: { experiment: AiExperiment }) {
  return (
    <section className="ai-experiment">
      <h2 className="page-title">实验</h2>
      <p>
        <strong>状态：</strong>
        {EXPERIMENT_MODE[experiment.mode]}
        {experiment.unverified ? ' · 本环境未代跑真实 API，结果勿伪装成现场实测' : ''}
      </p>
      <div className="reading-copy">
        <p>
          <strong>材料：</strong>
          {experiment.materials}
        </p>
        <ol>
          {experiment.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p>
          <strong>预期：</strong>
          {experiment.expected}
        </p>
        {experiment.commonErrors?.length ? (
          <p>
            <strong>常见报错：</strong>
            {experiment.commonErrors.join('；')}
          </p>
        ) : null}
      </div>
    </section>
  )
}

function QuizBlock({ quiz, index }: { quiz: AiQuiz; index: number }) {
  return (
    <div className="ai-quiz">
      <p>
        <strong>
          主问题 {index + 1}：{quiz.question}
        </strong>
      </p>
      <Collapse
        bordered={false}
        style={{ background: 'transparent' }}
        items={[
          {
            key: 'short',
            label: '30 秒结论（先自己答再展开）',
            children: <p>{quiz.answerShort}</p>,
          },
          {
            key: 'deep',
            label: '2–3 分钟机制版',
            children: <p>{quiz.answerDeep}</p>,
          },
          {
            key: 'follow',
            label: '两层追问',
            children: (
              <div className="reading-copy">
                {quiz.followUps.map((item, followIndex) => (
                  <div key={item.question}>
                    <p>
                      <strong>
                        追问 {followIndex + 1}：{item.question}
                      </strong>
                    </p>
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {item.counterexample ? <p className="muted">反例：{item.counterexample}</p> : null}
                    {item.boundary ? <p className="muted">边界：{item.boundary}</p> : null}
                  </div>
                ))}
              </div>
            ),
          },
          ...(quiz.commonMistakes?.length
            ? [
                {
                  key: 'mistakes',
                  label: '常见错答',
                  children: (
                    <ul>
                      {quiz.commonMistakes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                },
              ]
            : []),
        ]}
      />
      {quiz.scoring?.length ? <p className="muted">评分点：{quiz.scoring.join('；')}</p> : null}
    </div>
  )
}

function NoteNav({ note }: { note: AiNote }) {
  const { prev, next } = noteNeighbors(note)
  return (
    <nav className="note-nav" aria-label="前后文">
      {prev ? <Link to={`/ai/${prev.section}/${prev.key}`}>上一节 · {prev.title}</Link> : <span />}
      {next ? <Link to={`/ai/${next.section}/${next.key}`}>下一节 · {next.title}</Link> : <span />}
    </nav>
  )
}

function LocalCopy({ note, localReady }: { note: AiNote; localReady: boolean | null }) {
  if (!note.localId) return null
  if (localReady) {
    return (
      <p className="muted">
        <Link to={`/local/item/${encodeURIComponent(note.localId)}`}>打开本机保存的全文和配图</Link>
      </p>
    )
  }
  if (localReady === false) {
    return <p className="muted">已购全文在本机资料里。当前没有连上阅读器，所以这里不打开原文。</p>
  }
  return null
}
