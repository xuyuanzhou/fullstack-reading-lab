/**
 * U03：先修缺口与阶段门槛。可跳过，不强制锁课。
 */
import { AI_NOTES, aiProgressId } from './aiCatalog.ts'
import { withSampleExtras } from './aiSamples.ts'

export type PrereqGap = {
  key: string
  title: string
  done: boolean
}

export type PrereqStatus = {
  noteKey: string
  missing: PrereqGap[]
  ready: boolean
  /** 主线阶段标签，仅作提示 */
  stageHint: string
}

const STAGE_ORDER = [
  { id: 'intro', label: '入门', keys: ['ai-map', 'l0-verify', 'first-model-call'] },
  { id: 'retrieve', label: '检索与 RAG', keys: ['retrieve-baseline', 'rag-pipeline', 'l1-kb'] },
  { id: 'agent', label: '受控 Agent', keys: ['controlled-agent', 'l2-agent'] },
  { id: 'interview', label: '表达与面试', keys: ['project-defense', 'interview-bank'] },
  { id: 'algo', label: '算法支线', keys: ['algo-track', 'pytorch-train', 'l3-finetune'] },
] as const

function noteMap() {
  return new Map(AI_NOTES.map((note) => [note.key, withSampleExtras(note)]))
}

export function missingPrereqs(noteKey: string, aiDone: string[], skipped: string[] = []): PrereqStatus {
  const notes = noteMap()
  const note = notes.get(noteKey)
  const prereqs = note?.prerequisites || []
  const doneSet = new Set(aiDone)
  const skippedThis = skipped.includes(noteKey)
  const gaps: PrereqGap[] = prereqs.map((key) => {
    const target = notes.get(key)
    return {
      key,
      title: target?.title || key,
      done: doneSet.has(aiProgressId({ key })),
    }
  })
  const missing = skippedThis ? [] : gaps.filter((item) => !item.done)
  const stage = STAGE_ORDER.find((item) => (item.keys as readonly string[]).includes(noteKey))
  return {
    noteKey,
    missing,
    ready: skippedThis || missing.length === 0,
    stageHint: stage?.label || '自由阅读',
  }
}

/** 检测先修是否成环（U07 也用） */
export function findPrereqCycles(): string[] {
  const notes = noteMap()
  const cycles: string[] = []
  const visiting = new Set<string>()
  const visited = new Set<string>()

  function dfs(key: string, stack: string[]) {
    if (visiting.has(key)) {
      const start = stack.indexOf(key)
      cycles.push([...stack.slice(start), key].join(' → '))
      return
    }
    if (visited.has(key)) return
    visiting.add(key)
    const note = notes.get(key)
    for (const pre of note?.prerequisites || []) {
      if (!notes.has(pre)) continue
      dfs(pre, [...stack, key])
    }
    visiting.delete(key)
    visited.add(key)
  }

  for (const key of notes.keys()) dfs(key, [])
  return [...new Set(cycles)]
}

export function stageProgress(aiDone: string[]) {
  const done = new Set(aiDone)
  return STAGE_ORDER.map((stage) => {
    const total = stage.keys.length
    const completed = stage.keys.filter((key) => done.has(aiProgressId({ key }))).length
    return { id: stage.id, label: stage.label, completed, total, keys: stage.keys }
  })
}
