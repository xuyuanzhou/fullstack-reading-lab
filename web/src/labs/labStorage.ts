import { SAMPLE_AGENT, type AgentDraft } from './agentLoop'
import { SAMPLE_PROMPT, type PromptDraft } from './promptChecks'

const KEY = 'reading-lab.ai-lab'

export type LabSnapshot = {
  prompt: PromptDraft
  agent: AgentDraft
  previousPrompt: string
}

export function emptySnapshot(): LabSnapshot {
  return { prompt: SAMPLE_PROMPT, agent: SAMPLE_AGENT, previousPrompt: '' }
}

export function readLab(): LabSnapshot {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptySnapshot()
    const parsed = JSON.parse(raw) as Partial<LabSnapshot>
    if (!parsed.prompt || !parsed.agent || !Array.isArray(parsed.agent.tools)) return emptySnapshot()
    return {
      prompt: { ...SAMPLE_PROMPT, ...parsed.prompt },
      agent: {
        ...SAMPLE_AGENT,
        ...parsed.agent,
        instruction: typeof parsed.agent.instruction === 'string' ? parsed.agent.instruction : '',
        tools: parsed.agent.tools.length ? parsed.agent.tools : SAMPLE_AGENT.tools,
      },
      previousPrompt: typeof parsed.previousPrompt === 'string' ? parsed.previousPrompt : '',
    }
  } catch {
    return emptySnapshot()
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
