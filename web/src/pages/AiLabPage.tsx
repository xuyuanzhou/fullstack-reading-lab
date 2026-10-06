import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  PERMISSION_LABEL,
  SAMPLE_AGENT,
  advance,
  clampFails,
  clampSteps,
  exportAgent,
  initialLoop,
  mustConfirm,
  type AgentDraft,
  type AgentTool,
  type LoopState,
  type Permission,
} from '@/labs/agentLoop'
import { readLab, writeLab, type LabSnapshot } from '@/labs/labStorage'
import { applyPromptFixes, assemblePrompt, promptDiff, reviewPrompt, type PromptDraft } from '@/labs/promptChecks'

export function AiLabPage() {
  const { tool = 'prompt' } = useParams()
  const navigate = useNavigate()
  const [snapshot, setSnapshot] = useState<LabSnapshot>(() => readLab())
  const [loop, setLoop] = useState<LoopState>(() => initialLoop())
  const [notice, setNotice] = useState('')
  const [saveNote, setSaveNote] = useState('')

  useEffect(() => {
    setSaveNote(writeLab(snapshot))
  }, [snapshot])

  if (tool !== 'prompt' && tool !== 'agent') return <Navigate to="/ai/lab/prompt" replace />

  function patchPrompt(partial: Partial<PromptDraft>) {
    setSnapshot((current) => ({ ...current, prompt: { ...current.prompt, ...partial } }))
  }

  function patchAgent(partial: Partial<AgentDraft>, resetLoop = false) {
    setSnapshot((current) => ({ ...current, agent: { ...current.agent, ...partial } }))
    if (resetLoop) setLoop(initialLoop())
  }

  function patchTool(id: string, partial: Partial<AgentTool>) {
    setSnapshot((current) => ({
      ...current,
      agent: {
        ...current.agent,
        tools: current.agent.tools.map((item) => (item.id === id ? { ...item, ...partial } : item)),
      },
    }))
    setLoop(initialLoop())
  }

  return (
    <div className="article-shell">
      <div className="page-kicker">
        <Link to="/ai/intro">AI</Link>
        <span className="dot" />
        <span>练习台</span>
      </div>
      <h1 className="hero-title">{tool === 'prompt' ? '把提示词改到能检查' : '按你的规则走一遍 agent'}</h1>
      <p className="hero-lead">
        {tool === 'prompt'
          ? '这里不调用模型。它检查任务、材料、格式，以及材料里没有答案时的出口。缺的字段可以一键补上，措辞仍由你改。'
          : '这里不连接模型。左侧「走一步」按声明顺序演示确认和停止，每个工具一次。导出的 runAgent 才把下一步交给模型，同一工具可以再用。'}
      </p>
      <div className="lab-switch">
        <Link to="/ai/lab/prompt" aria-current={tool === 'prompt' ? 'page' : undefined}>优化提示词</Link>
        <Link to="/ai/lab/agent" aria-current={tool === 'agent' ? 'page' : undefined}>开发 agent</Link>
      </div>
      {notice && <p className="lab-note" role="status">{notice}</p>}
      {saveNote && <p className="lab-note is-bad" role="status">{saveNote}</p>}
      {tool === 'prompt' ? (
        <PromptBench
          draft={snapshot.prompt}
          previous={snapshot.previousPrompt}
          onChange={patchPrompt}
          onFix={() => patchPrompt(applyPromptFixes(snapshot.prompt))}
          onSaveVersion={() => {
            setSnapshot((current) => ({ ...current, previousPrompt: assemblePrompt(current.prompt) }))
            setNotice('已留下这一版，用来和下一版对照。')
          }}
          onCarry={() => {
            const instruction = assemblePrompt(snapshot.prompt)
            setSnapshot((current) => ({ ...current, agent: { ...current.agent, instruction } }))
            setNotice('已写成 agent 的指令。模型每次请求都会附上这段文字。')
            navigate('/ai/lab/agent')
          }}
        />
      ) : (
        <AgentBench
          draft={snapshot.agent}
          prompt={snapshot.prompt}
          loop={loop}
          onChange={patchAgent}
          onTool={patchTool}
          onAdd={() =>
            patchAgent({
              tools: [
                ...snapshot.agent.tools,
                { id: `tool-${Date.now()}`, name: '', purpose: '', permission: 'read', needsConfirm: false },
              ],
            }, true)
          }
          onRemove={(id) => patchAgent({ tools: snapshot.agent.tools.filter((item) => item.id !== id) }, true)}
          onLoop={(action) => setLoop((current) => advance(snapshot.agent, current, action))}
          onRestart={() => setLoop(initialLoop())}
          onReset={() => {
            setSnapshot((current) => ({ ...current, agent: SAMPLE_AGENT }))
            setLoop(initialLoop())
          }}
        />
      )}
    </div>
  )
}

function PromptBench({
  draft,
  previous,
  onChange,
  onFix,
  onSaveVersion,
  onCarry,
}: {
  draft: PromptDraft
  previous: string
  onChange: (partial: Partial<PromptDraft>) => void
  onFix: () => void
  onSaveVersion: () => void
  onCarry: () => void
}) {
  const checks = reviewPrompt(draft)
  const assembled = assemblePrompt(draft)
  const diff = promptDiff(previous, assembled)
  const missing = checks.filter((item) => !item.ok).length
  return (
    <div className="lab-grid">
      <div className="lab-fields">
        <Field label="任务" value={draft.task} rows={2} onChange={(task) => onChange({ task })} />
        <Field label="只能依据的材料" value={draft.materials} onChange={(materials) => onChange({ materials })} />
        <Field label="输出格式" value={draft.format} rows={2} onChange={(format) => onChange({ format })} />
        <Field label="材料里没有答案时" value={draft.ifUnknown} rows={2} onChange={(ifUnknown) => onChange({ ifUnknown })} />
        <Field label="不要做" value={draft.limits} rows={2} onChange={(limits) => onChange({ limits })} />
        <div className="lab-actions">
          <Button type="primary" onClick={onFix} disabled={checks.find((item) => item.id === 'format')?.ok && checks.find((item) => item.id === 'unknown')?.ok}>
            补上格式和不知道时的出口
          </Button>
          <Button onClick={onSaveVersion}>留下这一版</Button>
          <Button onClick={onCarry}>把这一版写成 agent 的指令</Button>
          <CopyButton text={assembled} />
        </div>
      </div>
      <aside className="lab-side">
        <h2 className="page-title">检查 {checks.length - missing}/{checks.length}</h2>
        <ul className="lab-checks">
          {checks.map((item) => (
            <li key={item.id} className={item.ok ? 'is-ok' : 'is-bad'}>
              <span className="lab-mark">{item.ok ? '过' : '缺'}</span>
              <strong>{item.label}</strong>
              {!item.ok && <span>{item.detail}</span>}
            </li>
          ))}
        </ul>
        <h2 className="page-title">拼好的提示词</h2>
        <pre className="lab-code">{assembled}</pre>
        {diff.added.length + diff.removed.length > 0 && (
          <>
            <h2 className="page-title">和留下的那一版</h2>
            <ul className="lab-diff">
              {diff.added.map((line, index) => (
                <li key={`add-${index}`} className="is-add">加上 {line}</li>
              ))}
              {diff.removed.map((line, index) => (
                <li key={`drop-${index}`} className="is-drop">拿掉 {line}</li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  )
}

function AgentBench({
  draft,
  prompt,
  loop,
  onChange,
  onTool,
  onAdd,
  onRemove,
  onLoop,
  onRestart,
  onReset,
}: {
  draft: AgentDraft
  prompt: PromptDraft
  loop: LoopState
  onChange: (partial: Partial<AgentDraft>, resetLoop?: boolean) => void
  onTool: (id: string, partial: Partial<AgentTool>) => void
  onAdd: () => void
  onRemove: (id: string) => void
  onLoop: (action: 'step' | 'allow' | 'deny' | 'fail') => void
  onRestart: () => void
  onReset: () => void
}) {
  const spec = exportAgent(draft)
  const assembled = assemblePrompt(prompt)
  const missing = reviewPrompt(prompt).filter((item) => !item.ok).length
  const usingCurrent = draft.instruction === assembled
  const waiting = Boolean(loop.waitingId)
  return (
    <div className="lab-grid">
      <div className="lab-fields">
        <Field label="目标" value={draft.goal} rows={2} onChange={(goal) => onChange({ goal })} />
        <Field
          label="每次请求附上的指令"
          value={draft.instruction}
          rows={6}
          onChange={(instruction) => onChange({ instruction })}
        />
        <p className={usingCurrent ? (missing === 0 ? 'lab-note is-ok' : 'lab-note is-bad') : 'lab-note'}>
          {usingCurrent
            ? missing === 0
              ? '这段就是当前提示词，检查都过了。'
              : `这段就是当前提示词，还有 ${missing} 项检查没过。`
            : '模型每次只看见这段文字和当前状态。改提示词改的是这段，不是模型本身。'}
        </p>
        <div className="lab-inline">
          <label>
            最大步数
            <input
              type="number"
              min={1}
              max={12}
              value={draft.maxSteps}
              onChange={(event) => onChange({ maxSteps: clampSteps(Number(event.target.value)) }, true)}
            />
          </label>
          <label>
            同一工具失败上限
            <input
              type="number"
              min={1}
              max={5}
              value={draft.failLimit}
              onChange={(event) => onChange({ failLimit: clampFails(Number(event.target.value)) }, true)}
            />
          </label>
        </div>
        <Field
          label="状态字段，用逗号分开"
          value={draft.stateFields.join('，')}
          rows={2}
          onChange={(value) => onChange({ stateFields: value.split(/[,，]/).map((item) => item.trim()) })}
        />
        <p className="lab-note">
          导出时会按这些名字初始化状态。execute 返回的对象只用这些键，不会用工具名当字段。
        </p>
        <p className="lab-kicker">工具</p>
        <div className="lab-tools">
          {draft.tools.map((tool) => (
            <article key={tool.id} className="lab-tool">
              <div className="lab-tool-head">
                <label>
                  工具名
                  <input value={tool.name} onChange={(event) => onTool(tool.id, { name: event.target.value })} />
                </label>
                <label>
                  权限
                  <select
                    value={tool.permission}
                    onChange={(event) => onTool(tool.id, { permission: event.target.value as Permission })}
                  >
                    {(Object.keys(PERMISSION_LABEL) as Permission[]).map((permission) => (
                      <option key={permission} value={permission}>{PERMISSION_LABEL[permission]}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                它做什么
                <input value={tool.purpose} onChange={(event) => onTool(tool.id, { purpose: event.target.value })} />
              </label>
              <div className="lab-tool-foot">
                <label className="lab-checkline">
                  <input
                    type="checkbox"
                    checked={mustConfirm(tool)}
                    disabled={tool.permission !== 'read'}
                    onChange={(event) => onTool(tool.id, { needsConfirm: event.target.checked })}
                  />
                  <span>执行前等人确认{tool.permission !== 'read' ? '（改、执行、联网一定会停）' : ''}</span>
                </label>
                <Button onClick={() => onRemove(tool.id)}>移出</Button>
              </div>
            </article>
          ))}
        </div>
        <div className="lab-actions">
          <Button onClick={onAdd}>添加工具</Button>
          <Button onClick={onReset}>恢复示例</Button>
        </div>
      </div>
      <aside className="lab-side">
        <h2 className="page-title">循环（按声明顺序走一遍）</h2>
        <div className="lab-actions">
          <Button type={waiting ? 'default' : 'primary'} onClick={() => onLoop('step')} disabled={loop.done || waiting}>走一步</Button>
          <Button type={waiting ? 'primary' : 'default'} onClick={() => onLoop('allow')} disabled={!waiting}>允许</Button>
          <Button onClick={() => onLoop('deny')} disabled={!waiting}>拒绝</Button>
          <Button onClick={() => onLoop('fail')} disabled={!waiting}>这一步失败</Button>
          <Button onClick={onRestart}>重走</Button>
        </div>
        <ol className="lab-log">
          {loop.log.length === 0 && (
            <li className="is-wait">
              {draft.instruction.trim()
                ? '指令已经附上。先走一步：读会直接执行，改和联网会停下来等你。'
                : '还没开始。先走一步，读会直接执行，改和联网会停下来等你。'}
            </li>
          )}
          {loop.log.map((item) => (
            <li key={item.id} className={`is-${item.tone}`}>{item.text}</li>
          ))}
        </ol>
        <h2 className="page-title">可复制的规格</h2>
        <p className="lab-note">接模型时用这份。propose 可再次挑选已经用过的工具；失败次数按工具名累计。</p>
        <pre className="lab-code">{spec}</pre>
        <CopyButton text={spec} />
      </aside>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
}) {
  return (
    <label className="lab-field">
      {label}
      <textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'blocked'>('idle')
  return (
    <span className="lab-copy">
      <Button
        onClick={() => {
          const write = navigator.clipboard?.writeText(text)
          if (!write) {
            setState('blocked')
            return
          }
          void write.then(() => {
            setState('done')
            window.setTimeout(() => setState('idle'), 1600)
          }).catch(() => setState('blocked'))
        }}
      >
        {state === 'done' ? '已复制' : '复制'}
      </Button>
      {state === 'blocked' && <span className="muted">浏览器没有允许写入剪贴板，请选中文字复制。</span>}
    </span>
  )
}
