import { SAMPLE_AGENT, clampFails, clampSteps, type AgentDraft, type AgentTool, type Permission } from './agentLoop.ts'
import { SAMPLE_PROMPT, type PromptDraft } from './promptChecks.ts'

const KEY = 'reading-lab.ai-lab'
const RECOVERY_KEY = `${KEY}.recovery`
const PERMISSIONS = new Set<Permission>(['read', 'write', 'exec', 'net'])

export type LabSnapshot = {
  prompt: PromptDraft
  agent: AgentDraft
  previousPrompt: string
}

export type LabReadResult = {
  snapshot: LabSnapshot
  issue: string
}

export function emptySnapshot(): LabSnapshot {
  return { prompt: SAMPLE_PROMPT, agent: SAMPLE_AGENT, previousPrompt: '' }
}

function asText(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback
}

function asTool(value: unknown, index: number): AgentTool | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const item = value as Record<string, unknown>
  const permission = PERMISSIONS.has(item.permission as Permission) ? item.permission as Permission : 'read'
  return {
    id: asText(item.id, `tool-${index + 1}`),
    name: asText(item.name),
    purpose: asText(item.purpose),
    permission,
    needsConfirm: Boolean(item.needsConfirm),
  }
}

function normalizePrompt(value: unknown): PromptDraft {
  const saved = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {}
  return {
    task: asText(saved.task, SAMPLE_PROMPT.task),
    materials: asText(saved.materials, SAMPLE_PROMPT.materials),
    format: asText(saved.format),
    ifUnknown: asText(saved.ifUnknown),
    limits: asText(saved.limits, SAMPLE_PROMPT.limits),
  }
}

function normalizeAgent(value: unknown): AgentDraft {
  const saved = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {}
  const tools = Array.isArray(saved.tools)
    ? saved.tools.map(asTool).filter((item): item is AgentTool => !!item)
    : []
  const stateFields = Array.isArray(saved.stateFields)
    ? saved.stateFields.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean)
    : SAMPLE_AGENT.stateFields
  return {
    goal: asText(saved.goal, SAMPLE_AGENT.goal),
    instruction: asText(saved.instruction),
    maxSteps: clampSteps(typeof saved.maxSteps === 'number' ? saved.maxSteps : SAMPLE_AGENT.maxSteps),
    failLimit: clampFails(typeof saved.failLimit === 'number' ? saved.failLimit : SAMPLE_AGENT.failLimit),
    stateFields: stateFields.length ? stateFields : SAMPLE_AGENT.stateFields,
    tools: tools.length ? tools : SAMPLE_AGENT.tools,
  }
}

export function normalizeLab(value: unknown): LabSnapshot {
  const saved = value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {}
  return {
    prompt: normalizePrompt(saved.prompt),
    agent: normalizeAgent(saved.agent),
    previousPrompt: asText(saved.previousPrompt),
  }
}

/** True when storage JSON is an object we can open, but fields needed coercion to stay safe. */
export function labNeedsRecovery(value: unknown): boolean {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return true
  const saved = value as Record<string, unknown>
  const prompt = saved.prompt
  if (!prompt || typeof prompt !== 'object' || Array.isArray(prompt)) return true
  const promptFields = prompt as Record<string, unknown>
  for (const key of ['task', 'materials', 'format', 'ifUnknown', 'limits'] as const) {
    if (key in promptFields && typeof promptFields[key] !== 'string') return true
  }
  const agent = saved.agent
  if (!agent || typeof agent !== 'object' || Array.isArray(agent)) return true
  const agentFields = agent as Record<string, unknown>
  if (typeof agentFields.goal !== 'string' && 'goal' in agentFields) return true
  if ('tools' in agentFields && !Array.isArray(agentFields.tools)) return true
  if ('stateFields' in agentFields && !Array.isArray(agentFields.stateFields)) return true
  if ('maxSteps' in agentFields && typeof agentFields.maxSteps !== 'number') return true
  if ('failLimit' in agentFields && typeof agentFields.failLimit !== 'number') return true
  if ('previousPrompt' in saved && typeof saved.previousPrompt !== 'string') return true
  return false
}

function keepRecovery(raw: string) {
  try {
    localStorage.setItem(RECOVERY_KEY, raw)
  } catch {
    /* keep reading */
  }
}

export function readLab(): LabReadResult {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { snapshot: emptySnapshot(), issue: '' }
    try {
      const parsed = JSON.parse(raw)
      const snapshot = normalizeLab(parsed)
      if (labNeedsRecovery(parsed)) {
        keepRecovery(raw)
        return { snapshot, issue: '练习台记录字段异常，已保留原始副本并恢复可用界面。' }
      }
      return { snapshot, issue: '' }
    } catch {
      keepRecovery(raw)
      return { snapshot: emptySnapshot(), issue: '练习台记录格式异常，已保留原始副本并恢复示例。' }
    }
  } catch {
    return { snapshot: emptySnapshot(), issue: '浏览器暂时无法读取练习台记录。' }
  }
}

export function writeLab(snapshot: LabSnapshot) {
  try {
    localStorage.setItem(KEY, JSON.stringify(snapshot))
    return ''
  } catch {
    return '这一版没能存进浏览器。'
  }
}

export function restoreLabBackup(): LabReadResult {
  try {
    const raw = localStorage.getItem(RECOVERY_KEY)
    if (!raw) return { snapshot: emptySnapshot(), issue: '没有可恢复的练习台副本。' }
    const parsed = JSON.parse(raw)
    return { snapshot: normalizeLab(parsed), issue: '已从原始副本恢复。请检查后再保存。' }
  } catch {
    return { snapshot: emptySnapshot(), issue: '原始副本无法读取。' }
  }
}

export function resetLab() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* keep going */
  }
  return emptySnapshot()
}
