/**
 * 学习进度文件。只带走事实：已读、笔记、勾选、掌握关草稿和选择题作答。
 * 技能树亮灭、积分和徽章在导入后按这些事实重算。
 */
import { emptyDrill, learningReport, mergeDrill, normalizeDrill } from '../data/drillRules.ts'
import { questionById } from '../data/drillBank.ts'
import { deliverableKey } from '../data/learningPaths.ts'
import { skillBoardState } from '../data/learningSkills.ts'
import { MASTERY_GATES } from '../data/masteryGates.ts'
import { mergeQuestRecords } from '../data/questBoard.ts'
import type { ProgressState } from '../types/curriculum.ts'
import {
  LEARNING_SCHEMA_VERSION,
  emptyEnvelope,
  migrateProgress,
  type Attempt,
  type Evidence,
  type LearningEnvelope,
  type SelfCheck,
} from './learningEvidence.ts'

export const PROGRESS_FORMAT = 'reading-lab.progress'
export const PROGRESS_VERSION = 1

export type ProgressBackupMode = 'merge' | 'replace'

export type ProgressCatalog = {
  lesson: (id: string) => boolean
  aiLesson: (id: string) => boolean
}

const SECRET = /(api[_-]?key|password|secret|token)\s*[:=]\s*\S+/i

const CHECKS = new Set<string>()
const GATE_IDS = new Set<string>()
for (const gate of MASTERY_GATES) {
  GATE_IDS.add(gate.id)
  gate.outputs.forEach((_, index) => CHECKS.add(deliverableKey(gate.id, index)))
}

export type ProgressFacts = {
  done: string[]
  review: string[]
  recent: string[]
  notes: Record<string, string>
  audit: ProgressState['audit']
  pathChecks: string[]
  skipVerify: string[]
  aiDone: string[]
  aiReview: string[]
  aiRecent: string[]
  aiNotes: Record<string, string>
  aiSkippedPrereq: string[]
  aiDrillScores: Record<string, number>
  skillScene: ProgressState['skillScene']
  learning: LearningEnvelope
  drill: ProgressState['drill']
}

export type ProgressPreview = {
  ok: boolean
  issue: string
  unknownLessons: string[]
  unknownQuestions: number
  unknownChecks: string[]
  noteConflicts: string[]
  done: number
  notes: number
  lit: number
  drillAnswers: number
  attempts: number
  gatesCleared: number
}

type Prepared =
  | { ok: false; issue: string }
  | {
    ok: true
    state: ProgressState
    unknownLessons: string[]
    unknownQuestions: number
    unknownChecks: string[]
    noteConflicts: string[]
  }

const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

function strings(value: unknown) {
  return Array.isArray(value)
    ? [...new Set(value.filter((item): item is string => typeof item === 'string' && !!item))]
    : []
}

function knownLesson(id: string, catalog: ProgressCatalog) {
  return catalog.lesson(id) || catalog.aiLesson(id)
}

function splitKnown(ids: string[], known: (id: string) => boolean) {
  const kept: string[] = []
  const dropped: string[] = []
  for (const id of ids) {
    if (known(id)) kept.push(id)
    else dropped.push(id)
  }
  return { kept, dropped }
}

function notesOf(value: unknown) {
  if (!object(value)) return {}
  return Object.fromEntries(Object.entries(value).filter(([, note]) => typeof note === 'string')) as Record<string, string>
}

function scoresOf(value: unknown) {
  if (!object(value)) return {}
  const scores: Record<string, number> = {}
  for (const [id, score] of Object.entries(value)) {
    if (typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 4) scores[id] = Math.round(score)
  }
  return scores
}

function auditOf(value: unknown): ProgressState['audit'] {
  if (!object(value)) return {}
  const audit: ProgressState['audit'] = {}
  for (const [id, item] of Object.entries(value)) {
    if (object(item) && typeof item.note === 'string' && typeof item.status === 'string') {
      audit[id] = { note: item.note, status: item.status }
    }
  }
  return audit
}

function sceneOf(value: unknown): ProgressState['skillScene'] {
  return value === 'browser' || value === 'java' || value === 'ai' ? value : 'all'
}

export function progressFacts(state: ProgressState): ProgressFacts {
  return {
    done: [...state.done],
    review: [...state.review],
    recent: [...state.recent],
    notes: { ...state.notes },
    audit: { ...state.audit },
    pathChecks: [...state.pathChecks],
    skipVerify: [...state.skipVerify],
    aiDone: [...state.aiDone],
    aiReview: [...state.aiReview],
    aiRecent: [...state.aiRecent],
    aiNotes: { ...state.aiNotes },
    aiSkippedPrereq: [...state.aiSkippedPrereq],
    aiDrillScores: { ...state.aiDrillScores },
    skillScene: state.skillScene,
    learning: state.learning,
    drill: state.drill,
  }
}

function litOf(
  done: readonly string[],
  aiDone: readonly string[],
  scene: ProgressState['skillScene'],
  catalog: ProgressCatalog,
) {
  const read = new Set([...done, ...aiDone])
  const { glow } = skillBoardState(read, (id) => knownLesson(id, catalog), scene)
  return Object.values(glow).filter((item) => item === 'lit').length
}

function gatesCleared(drill: ProgressState['drill']) {
  return learningReport(drill).courses.reduce((sum, course) => sum + course.cleared, 0)
}

function fileOf(state: ProgressState, catalog: ProgressCatalog) {
  const payload = progressFacts(state)
  return {
    format: PROGRESS_FORMAT,
    version: PROGRESS_VERSION,
    exportedAt: new Date().toISOString(),
    preview: {
      done: payload.done.length,
      notes: Object.keys(payload.notes).length,
      lit: litOf(payload.done, payload.aiDone, payload.skillScene, catalog),
      drillAnswers: payload.drill.log.length,
      gatesCleared: gatesCleared(payload.drill),
    },
    payload,
  }
}

export function buildProgressFile(
  state: ProgressState,
  catalog: ProgressCatalog,
): { ok: true; json: string } | { ok: false; issue: string } {
  if (state.learningReadonly) return { ok: false, issue: '记录版本比本页新，不能改写。' }
  const file = fileOf(state, catalog)
  if (SECRET.test(JSON.stringify(file.payload))) return { ok: false, issue: '导出里有疑似密钥，已停止。' }
  return { ok: true, json: JSON.stringify(file, null, 2) }
}

function mergeIds(current: string[], incoming: string[], mode: ProgressBackupMode) {
  if (mode === 'replace') return incoming
  return [...new Set([...current, ...incoming])]
}

function mergeRecent(current: string[], incoming: string[], mode: ProgressBackupMode) {
  const next = mode === 'replace' ? incoming : [...current, ...incoming.filter((id) => !current.includes(id))]
  return next.slice(0, 12)
}

function noteConflicts(current: Record<string, string>, incoming: Record<string, string>, mode: ProgressBackupMode) {
  const conflicts: string[] = []
  if (mode === 'replace') {
    for (const [id, note] of Object.entries(current)) {
      if (note.trim() && (incoming[id] ?? '') !== note) conflicts.push(id)
    }
    return conflicts
  }
  for (const [id, note] of Object.entries(incoming)) {
    const local = current[id] ?? ''
    if (local.trim() && local !== note) conflicts.push(id)
  }
  return conflicts
}

function mergeNotes(current: Record<string, string>, incoming: Record<string, string>, mode: ProgressBackupMode) {
  const conflicts = noteConflicts(current, incoming, mode)
  if (mode === 'replace') return { notes: { ...incoming }, conflicts }
  const notes = { ...current }
  for (const [id, note] of Object.entries(incoming)) {
    const local = notes[id] ?? ''
    if (local.trim() && local !== note) continue
    if (note) notes[id] = note
  }
  return { notes, conflicts }
}

function mergeScores(current: Record<string, number>, incoming: Record<string, number>, mode: ProgressBackupMode) {
  if (mode === 'replace') return incoming
  const scores = { ...current }
  for (const [id, score] of Object.entries(incoming)) {
    if (id in scores && scores[id] !== score) continue
    scores[id] = score
  }
  return scores
}

function mergeAudit(current: ProgressState['audit'], incoming: ProgressState['audit'], mode: ProgressBackupMode) {
  if (mode === 'replace') return incoming
  const audit = { ...current }
  for (const [id, item] of Object.entries(incoming)) {
    const local = audit[id]
    if (local && (local.note !== item.note || local.status !== item.status)) continue
    audit[id] = item
  }
  return audit
}

function unionChecks(current: SelfCheck[], incoming: SelfCheck[]) {
  const seen = new Set(current.map((item) => item.deliverableId))
  return [...current, ...incoming.filter((item) => !seen.has(item.deliverableId))]
}

function mergeAttempts(current: Attempt[], incoming: Attempt[], mode: ProgressBackupMode) {
  if (mode === 'replace') {
    const ids = new Set(incoming.map((item) => item.id))
    const removed = current
      .filter((item) => !ids.has(item.id) && !item.deleted)
      .map((item) => ({ ...item, deleted: true }))
    return [...incoming, ...removed]
  }
  const map = new Map<string, Attempt>()
  for (const item of incoming) map.set(item.id, item)
  for (const item of current) {
    if (item.deleted) {
      map.set(item.id, { ...item, deleted: true })
      continue
    }
    if (map.get(item.id)?.deleted) continue
    map.set(item.id, item)
  }
  return [...map.values()]
}

function mergeEvidence(current: Evidence[], incoming: Evidence[], mode: ProgressBackupMode) {
  if (mode === 'replace') {
    const ids = new Set(incoming.map((item) => item.id))
    const removed = current
      .filter((item) => !ids.has(item.id) && !item.deleted)
      .map((item) => ({ ...item, deleted: true }))
    return [...incoming, ...removed]
  }
  const map = new Map<string, Evidence>()
  for (const item of incoming) map.set(item.id, item)
  for (const item of current) {
    if (item.deleted) {
      map.set(item.id, { ...item, deleted: true })
      continue
    }
    if (map.get(item.id)?.deleted) continue
    map.set(item.id, item)
  }
  return [...map.values()]
}

function combineLearning(current: LearningEnvelope, incoming: LearningEnvelope, mode: ProgressBackupMode): LearningEnvelope {
  return {
    schemaVersion: LEARNING_SCHEMA_VERSION,
    revision: Math.max(current.revision, incoming.revision) + 1,
    done: mergeIds(current.done, incoming.done, mode),
    notes: mergeNotes(current.notes, incoming.notes, mode).notes,
    recent: mergeRecent(current.recent, incoming.recent, mode),
    selfChecks: mode === 'replace' ? incoming.selfChecks : unionChecks(current.selfChecks, incoming.selfChecks),
    attempts: mergeAttempts(current.attempts, incoming.attempts, mode),
    evidence: mergeEvidence(current.evidence, incoming.evidence, mode),
    unresolvedLegacy: mode === 'replace'
      ? incoming.unresolvedLegacy
      : [...new Set([...current.unresolvedLegacy, ...incoming.unresolvedLegacy])],
    pause: mode === 'replace' ? incoming.pause : (current.pause ?? incoming.pause),
    quests: mergeQuestRecords(current.quests ?? [], incoming.quests ?? []),
  }
}

function readFacts(payload: unknown, catalog: ProgressCatalog): { ok: false; issue: string } | {
  ok: true
  facts: ProgressFacts
  unknownLessons: string[]
  unknownQuestions: number
  unknownChecks: string[]
} {
  if (!object(payload)) return { ok: false, issue: '导入文件缺少进度正文。' }
  if (SECRET.test(JSON.stringify(payload))) return { ok: false, issue: '导入文件含疑似密钥，未合并。' }
  const migrated = payload.learning == null ? { readonly: false, envelope: emptyEnvelope() } : migrateProgress(payload.learning)
  if (migrated.readonly) return { ok: false, issue: '记录版本比本页新，不能改写。' }
  const dropped: string[] = []
  const lessons = (value: unknown) => {
    const split = splitKnown(strings(value), (id) => knownLesson(id, catalog))
    dropped.push(...split.dropped)
    return split.kept
  }
  const aiLessons = (value: unknown) => {
    const split = splitKnown(strings(value), (id) => catalog.aiLesson(id))
    dropped.push(...split.dropped)
    return split.kept
  }
  const lessonNotes = (value: unknown) => {
    const notes = notesOf(value)
    const kept: Record<string, string> = {}
    for (const [id, note] of Object.entries(notes)) {
      if (knownLesson(id, catalog)) kept[id] = note
      else dropped.push(id)
    }
    return kept
  }
  const aiNotes = (value: unknown) => {
    const notes = notesOf(value)
    const kept: Record<string, string> = {}
    for (const [id, note] of Object.entries(notes)) {
      if (catalog.aiLesson(id)) kept[id] = note
      else dropped.push(id)
    }
    return kept
  }
  const checks = splitKnown(strings(payload.pathChecks), (id) => CHECKS.has(id))
  const skips = splitKnown(strings(payload.skipVerify), (id) => GATE_IDS.has(id))
  const rawLog = object(payload.drill) && Array.isArray(payload.drill.log) ? payload.drill.log : []
  const unknownQuestions = rawLog.filter((row) => {
    if (!object(row) || typeof row.questionId !== 'string' || !row.questionId) return false
    return !questionById(row.questionId)
  }).length
  const facts: ProgressFacts = {
    done: lessons(payload.done),
    review: lessons(payload.review),
    recent: lessons(payload.recent).slice(0, 12),
    notes: lessonNotes(payload.notes),
    audit: auditOf(payload.audit),
    pathChecks: checks.kept,
    skipVerify: skips.kept,
    aiDone: aiLessons(payload.aiDone),
    aiReview: aiLessons(payload.aiReview),
    aiRecent: aiLessons(payload.aiRecent).slice(0, 12),
    aiNotes: aiNotes(payload.aiNotes),
    aiSkippedPrereq: strings(payload.aiSkippedPrereq),
    aiDrillScores: scoresOf(payload.aiDrillScores),
    skillScene: sceneOf(payload.skillScene),
    learning: migrated.envelope,
    drill: normalizeDrill(payload.drill),
  }
  return {
    ok: true,
    unknownLessons: [...new Set(dropped)],
    unknownQuestions,
    unknownChecks: [...checks.dropped, ...skips.dropped],
    facts,
  }
}

function kept(current: ProgressState): ProgressState {
  return {
    track: current.track,
    group: current.group,
    done: current.done,
    review: current.review,
    recent: current.recent,
    notes: current.notes,
    theme: current.theme,
    query: current.query,
    audit: current.audit,
    localQuery: current.localQuery,
    localTopic: current.localTopic,
    localCategory: current.localCategory,
    aiDone: current.aiDone,
    aiReview: current.aiReview,
    aiRecent: current.aiRecent,
    aiNotes: current.aiNotes,
    aiQuery: current.aiQuery,
    aiSkippedPrereq: current.aiSkippedPrereq,
    aiDrillScores: current.aiDrillScores,
    pathChecks: current.pathChecks,
    skipVerify: current.skipVerify,
    learning: current.learning,
    learningReadonly: current.learningReadonly,
    learningHeld: current.learningHeld,
    revision: current.revision,
    skillScene: current.skillScene,
    drill: current.drill,
  }
}

function prepare(current: ProgressState, raw: unknown, mode: ProgressBackupMode, catalog: ProgressCatalog): Prepared {
  if (current.learningReadonly) return { ok: false, issue: '记录版本比本页新，不能改写。' }
  if (!object(raw) || Array.isArray(raw)) return { ok: false, issue: '导入文件不是这份学习记录。' }
  if (raw.format !== PROGRESS_FORMAT || raw.version !== PROGRESS_VERSION) {
    return { ok: false, issue: '导入文件不是这份学习记录。' }
  }
  const read = readFacts(raw.payload, catalog)
  if (!read.ok) return read
  const facts = read.facts
  const lessonNotes = mergeNotes(current.notes, facts.notes, mode)
  const aiNotes = mergeNotes(current.aiNotes, facts.aiNotes, mode)
  const drill = mode === 'replace' ? facts.drill : mergeDrill(facts.drill, current.drill, emptyDrill())
  const state: ProgressState = {
    ...kept(current),
    done: mergeIds(current.done, facts.done, mode),
    review: mergeIds(current.review, facts.review, mode),
    recent: mergeRecent(current.recent, facts.recent, mode),
    notes: lessonNotes.notes,
    audit: mergeAudit(current.audit, facts.audit, mode),
    pathChecks: mergeIds(current.pathChecks, facts.pathChecks, mode),
    skipVerify: mergeIds(current.skipVerify, facts.skipVerify, mode),
    aiDone: mergeIds(current.aiDone, facts.aiDone, mode),
    aiReview: mergeIds(current.aiReview, facts.aiReview, mode),
    aiRecent: mergeRecent(current.aiRecent, facts.aiRecent, mode),
    aiNotes: aiNotes.notes,
    aiSkippedPrereq: mergeIds(current.aiSkippedPrereq, facts.aiSkippedPrereq, mode),
    aiDrillScores: mergeScores(current.aiDrillScores, facts.aiDrillScores, mode),
    skillScene: mode === 'replace' ? facts.skillScene : current.skillScene,
    learning: combineLearning(current.learning, facts.learning, mode),
    drill,
  }
  return {
    ok: true,
    state,
    unknownLessons: read.unknownLessons,
    unknownQuestions: read.unknownQuestions,
    unknownChecks: read.unknownChecks,
    noteConflicts: [...new Set([...lessonNotes.conflicts, ...aiNotes.conflicts])],
  }
}

const emptyPreview = {
  unknownLessons: [] as string[],
  unknownQuestions: 0,
  unknownChecks: [] as string[],
  noteConflicts: [] as string[],
  done: 0,
  notes: 0,
  lit: 0,
  drillAnswers: 0,
  attempts: 0,
  gatesCleared: 0,
}

export function previewProgress(
  raw: unknown,
  current: ProgressState,
  mode: ProgressBackupMode,
  catalog: ProgressCatalog,
): ProgressPreview {
  const prepared = prepare(current, raw, mode, catalog)
  if (!prepared.ok) return { ok: false, issue: prepared.issue, ...emptyPreview }
  const issue = prepared.noteConflicts.length
    ? '有笔记和本机不同。合并会留下本机这份。'
    : ''
  return {
    ok: true,
    issue,
    unknownLessons: prepared.unknownLessons,
    unknownQuestions: prepared.unknownQuestions,
    unknownChecks: prepared.unknownChecks,
    noteConflicts: prepared.noteConflicts,
    done: prepared.state.done.length,
    notes: Object.keys(prepared.state.notes).length,
    lit: litOf(prepared.state.done, prepared.state.aiDone, prepared.state.skillScene, catalog),
    drillAnswers: prepared.state.drill.log.length,
    attempts: prepared.state.learning.attempts.filter((item) => !item.deleted).length,
    gatesCleared: gatesCleared(prepared.state.drill),
  }
}

export function applyProgress(
  current: ProgressState,
  raw: unknown,
  mode: ProgressBackupMode,
  catalog: ProgressCatalog,
): { ok: true; state: ProgressState } | { ok: false; issue: string } {
  const prepared = prepare(current, raw, mode, catalog)
  if (!prepared.ok) return prepared
  return { ok: true, state: prepared.state }
}
