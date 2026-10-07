/**
 * U06：AI 进度导出/导入。带版本；导入须显式模式，禁止静默覆盖。
 */
import type { ProgressState } from '@/types/curriculum'

export const AI_BACKUP_FORMAT = 'reading-lab.ai-progress'
export const AI_BACKUP_VERSION = 1 as const

export type AiBackupPayload = {
  aiDone: string[]
  aiReview: string[]
  aiRecent: string[]
  aiNotes: Record<string, string>
  aiQuery: string
  aiSkippedPrereq: string[]
  aiDrillScores: Record<string, number>
}

export type AiBackupFile = {
  format: typeof AI_BACKUP_FORMAT
  version: typeof AI_BACKUP_VERSION
  exportedAt: string
  payload: AiBackupPayload
}

export type ImportMode = 'merge' | 'replace'

export type ImportResult =
  | { ok: true; mode: ImportMode; next: AiBackupPayload; warnings: string[] }
  | { ok: false; error: string }

function asStrings(value: unknown) {
  return Array.isArray(value)
    ? [...new Set(value.filter((item): item is string => typeof item === 'string' && !!item))]
    : []
}

function asNotes(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter(([, note]) => typeof note === 'string'),
  ) as Record<string, string>
}

function asScores(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const out: Record<string, number> = {}
  for (const [key, score] of Object.entries(value as Record<string, unknown>)) {
    if (typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 4) {
      out[key] = Math.round(score)
    }
  }
  return out
}

export function extractAiPayload(state: ProgressState): AiBackupPayload {
  return {
    aiDone: [...state.aiDone],
    aiReview: [...state.aiReview],
    aiRecent: [...state.aiRecent],
    aiNotes: { ...state.aiNotes },
    aiQuery: state.aiQuery,
    aiSkippedPrereq: [...(state.aiSkippedPrereq || [])],
    aiDrillScores: { ...(state.aiDrillScores || {}) },
  }
}

export function buildAiBackup(state: ProgressState): AiBackupFile {
  return {
    format: AI_BACKUP_FORMAT,
    version: AI_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    payload: extractAiPayload(state),
  }
}

export function parseAiBackup(raw: unknown): ImportResult {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: '不是有效的 JSON 对象' }
  }
  const file = raw as Record<string, unknown>
  if (file.format !== AI_BACKUP_FORMAT) {
    return { ok: false, error: `格式须为 ${AI_BACKUP_FORMAT}` }
  }
  if (file.version !== AI_BACKUP_VERSION) {
    return { ok: false, error: `仅支持 version=${AI_BACKUP_VERSION}，当前为 ${String(file.version)}` }
  }
  const payloadRaw = file.payload
  if (!payloadRaw || typeof payloadRaw !== 'object' || Array.isArray(payloadRaw)) {
    return { ok: false, error: '缺少 payload' }
  }
  const p = payloadRaw as Record<string, unknown>
  const payload: AiBackupPayload = {
    aiDone: asStrings(p.aiDone),
    aiReview: asStrings(p.aiReview),
    aiRecent: asStrings(p.aiRecent).slice(0, 12),
    aiNotes: asNotes(p.aiNotes),
    aiQuery: typeof p.aiQuery === 'string' ? p.aiQuery : '',
    aiSkippedPrereq: asStrings(p.aiSkippedPrereq),
    aiDrillScores: asScores(p.aiDrillScores),
  }
  return { ok: true, mode: 'merge', next: payload, warnings: [] }
}

export function applyAiBackup(
  current: ProgressState,
  incoming: AiBackupPayload,
  mode: ImportMode,
): { state: ProgressState; warnings: string[] } {
  const warnings: string[] = []
  if (mode === 'replace') {
    warnings.push('已按替换模式写入 AI 进度字段（frontend/java 进度未动）')
    return {
      state: {
        ...current,
        aiDone: incoming.aiDone,
        aiReview: incoming.aiReview,
        aiRecent: incoming.aiRecent,
        aiNotes: incoming.aiNotes,
        aiQuery: incoming.aiQuery,
        aiSkippedPrereq: incoming.aiSkippedPrereq,
        aiDrillScores: incoming.aiDrillScores,
      },
      warnings,
    }
  }
  const aiNotes = { ...current.aiNotes }
  for (const [id, note] of Object.entries(incoming.aiNotes)) {
    if (id in aiNotes && aiNotes[id] !== note && aiNotes[id].trim()) {
      warnings.push(`笔记 ${id} 本地已有内容，合并时保留本地，未覆盖`)
      continue
    }
    aiNotes[id] = note
  }
  const aiDrillScores = { ...current.aiDrillScores }
  for (const [id, score] of Object.entries(incoming.aiDrillScores)) {
    if (id in aiDrillScores && aiDrillScores[id] !== score) {
      warnings.push(`自评 ${id} 保留本地分数 ${aiDrillScores[id]}`)
      continue
    }
    aiDrillScores[id] = score
  }
  return {
    state: {
      ...current,
      aiDone: [...new Set([...current.aiDone, ...incoming.aiDone])],
      aiReview: [...new Set([...current.aiReview, ...incoming.aiReview])],
      aiRecent: [...new Set([...incoming.aiRecent, ...current.aiRecent])].slice(0, 12),
      aiNotes,
      aiQuery: current.aiQuery || incoming.aiQuery,
      aiSkippedPrereq: [...new Set([...current.aiSkippedPrereq, ...incoming.aiSkippedPrereq])],
      aiDrillScores,
    },
    warnings,
  }
}
