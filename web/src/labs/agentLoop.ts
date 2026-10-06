export type Permission = 'read' | 'write' | 'exec' | 'net'

export type AgentTool = {
  id: string
  name: string
  purpose: string
  permission: Permission
  needsConfirm: boolean
}

export type AgentDraft = {
  goal: string
  instruction: string
  maxSteps: number
  failLimit: number
  stateFields: string[]
  tools: AgentTool[]
}

export type LoopLog = {
  id: string
  tone: 'plain' | 'wait' | 'stop'
  text: string
}

export type LoopState = {
  step: number
  failures: Record<string, number>
  doneIds: string[]
  log: LoopLog[]
  waitingId?: string
  done: boolean
}

export const PERMISSION_LABEL: Record<Permission, string> = {
  read: '读',
  write: '改',
  exec: '执行',
  net: '联网',
}

export const SAMPLE_AGENT: AgentDraft = {
  goal: '只根据材料回答报销问题。材料里没有的，不要编。',
  instruction: '',
  maxSteps: 4,
  failLimit: 2,
  stateFields: ['材料', '回答', '已引用的原句'],
  tools: [
    {
      id: 'search',
      name: '查找材料',
      purpose: '从已提供的材料里找出和问题相关的段落。',
      permission: 'read',
      needsConfirm: false,
    },
    {
      id: 'draft',
      name: '写下回答',
      purpose: '把引用到的原句写成回答。',
      permission: 'write',
      needsConfirm: true,
    },
  ],
}

export function mustConfirm(tool: AgentTool) {
  return tool.needsConfirm || tool.permission !== 'read'
}

export function initialLoop(): LoopState {
  return { step: 0, failures: {}, doneIds: [], log: [], done: false }
}

function line(state: LoopState, tone: LoopLog['tone'], text: string): LoopLog {
  return { id: `${state.log.length}-${tone}`, tone, text }
}

export function advance(draft: AgentDraft, state: LoopState, action: 'step' | 'allow' | 'deny' | 'fail'): LoopState {
  if (state.done) return state
  if (state.waitingId) {
    const tool = draft.tools.find((item) => item.id === state.waitingId)
    if (!tool) return { ...state, waitingId: undefined }
    if (action === 'step') return state
    if (action === 'deny') {
      return {
        ...state,
        waitingId: undefined,
        done: true,
        log: [...state.log, line(state, 'stop', `人拒绝了「${tool.name}」。循环停在副作用之前。`)],
      }
    }
    if (action === 'fail') return failTool(draft, state, tool)
    return {
      ...state,
      waitingId: undefined,
      step: state.step + 1,
      doneIds: [...state.doneIds, tool.id],
      log: [...state.log, line(state, 'plain', `程序执行了「${tool.name}」，把结果写回状态。`)],
    }
  }
  if (action !== 'step') return state
  if (state.step >= clampSteps(draft.maxSteps)) {
    return { ...state, done: true, log: [...state.log, line(state, 'stop', '达到最大步数，循环停止。')] }
  }
  const tool = draft.tools.find((item) => item.name.trim() && !state.doneIds.includes(item.id))
  if (!tool) {
    return { ...state, done: true, log: [...state.log, line(state, 'stop', '声明过的工具都走完了。')] }
  }
  if (mustConfirm(tool)) {
    return {
      ...state,
      waitingId: tool.id,
      log: [...state.log, line(state, 'wait', `模型提议「${tool.name}」（${PERMISSION_LABEL[tool.permission]}）。等待人确认。`)],
    }
  }
  return {
    ...state,
    step: state.step + 1,
    doneIds: [...state.doneIds, tool.id],
    log: [
      ...state.log,
      line(state, 'plain', `模型提议「${tool.name}」。这是读，程序直接执行，并把结果写回状态。`),
    ],
  }
}

function failTool(draft: AgentDraft, state: LoopState, tool: AgentTool): LoopState {
  const count = (state.failures[tool.id] || 0) + 1
  const failures = { ...state.failures, [tool.id]: count }
  if (count >= clampFails(draft.failLimit)) {
    return {
      ...state,
      failures,
      waitingId: undefined,
      done: true,
      log: [...state.log, line(state, 'stop', `「${tool.name}」已失败 ${count} 次，达到上限，循环停止。`)],
    }
  }
  return {
    ...state,
    failures,
    log: [...state.log, line(state, 'wait', `「${tool.name}」失败 ${count} 次。还没有到上限，仍停在确认。`)],
  }
}

export function clampSteps(value: number) {
  if (!Number.isFinite(value)) return 4
  return Math.min(12, Math.max(1, Math.round(value)))
}

export function clampFails(value: number) {
  if (!Number.isFinite(value)) return 2
  return Math.min(5, Math.max(1, Math.round(value)))
}

export function exportAgent(draft: AgentDraft) {
  const tools = draft.tools
    .filter((tool) => tool.name.trim())
    .map((tool) => ({
      name: tool.name.trim(),
      purpose: tool.purpose.trim(),
      permission: tool.permission,
      needsConfirm: mustConfirm(tool),
    }))
  const spec = {
    goal: draft.goal.trim(),
    instruction: draft.instruction.trim() || draft.goal.trim(),
    maxSteps: clampSteps(draft.maxSteps),
    stopAfterRepeatedFailures: clampFails(draft.failLimit),
    state: draft.stateFields.map((field) => field.trim()).filter(Boolean),
    tools,
  }
  return `// 练习台左侧的「走一步」只按声明顺序演示确认和停止，每个工具走一次。
// 这份 runAgent 才是可接模型的循环：propose 决定下一步，同一工具可以再用。
// propose 只返回 { name: 工具名 }，或 { name: 'stop' }。
// execute(tool, proposal, state) 返回要写入声明字段的对象，例如 { 材料: '...' }。未知键丢掉。
// confirm 在改、执行、联网之前由人决定。返回 false 就停，不执行。
export const agent = ${JSON.stringify(spec, null, 2)}

export async function runAgent(propose, execute, confirm) {
  const state = Object.fromEntries(agent.state.map((field) => [field, null]))
  const failures = {}
  for (let step = 0; step < agent.maxSteps; step += 1) {
    const proposal = await propose({ instruction: agent.instruction, state, tools: agent.tools.map((item) => item.name) })
    if (!proposal || proposal.name === 'stop') return { stop: '模型选择停止', state }
    const tool = agent.tools.find((item) => item.name === proposal.name)
    if (!tool) return { stop: '未知工具', state }
    if (tool.needsConfirm && !(await confirm(tool))) return { stop: '人拒绝了这一步', state }
    try {
      const patch = await execute(tool, proposal, state)
      if (patch && typeof patch === 'object' && !Array.isArray(patch)) {
        for (const field of agent.state) {
          if (Object.prototype.hasOwnProperty.call(patch, field)) state[field] = patch[field]
        }
      }
    } catch {
      const count = (failures[tool.name] || 0) + 1
      failures[tool.name] = count
      if (count >= agent.stopAfterRepeatedFailures) return { stop: '同一工具失败次数达到上限', state }
    }
  }
  return { stop: '达到最大步数', state }
}
`
}
