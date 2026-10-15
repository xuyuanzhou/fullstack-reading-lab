import { FROZEN_DELIVERABLES, deliverableByLegacy } from '../data/deliverableMap.ts'
import {
  emptyQuestRecords,
  mergeQuestRecords,
  questById,
  reduceQuests,
  type QuestAction,
  type QuestRecord,
  type QuestReward,
} from '../data/questBoard.ts'

export const LEARNING_SCHEMA_VERSION = 2

export type SelfCheck = {
  deliverableId: string
  legacyKey: string
  source: 'self'
}

export type Attempt = {
  id: string
  taskId: string
  taskVersion: number
  status: 'draft' | 'saved' | 'started' | 'failed'
  hintLevel: number
  draft: string
  deleted?: boolean
}

export type ScoreSource = 'self' | 'local' | 'human'

export type Evidence = {
  id: string
  attemptId: string
  taskId: string
  taskVersion: number
  kind: 'self' | 'local-check' | 'review'
  verification: 'pending' | 'passed' | 'failed'
  source: ScoreSource
  summary: string
  /** 0～4。来源是学员自己时，不表示已通过。 */
  score?: { value: number; source: ScoreSource }
  deleted?: boolean
}

export type PauseChoice = 'day' | 'week' | 'month'

export type LearningPause = {
  choice: PauseChoice
  since: string
}

export type LearningEnvelope = {
  schemaVersion: number
  revision: number
  done: string[]
  notes: Record<string, string>
  recent: string[]
  selfChecks: SelfCheck[]
  attempts: Attempt[]
  evidence: Evidence[]
  unresolvedLegacy: string[]
  pause: LearningPause | null
  /** 子关、支线和核心挑战的进度。不改九关勾选。 */
  quests: QuestRecord[]
}

export type MigrateResult = {
  envelope: LearningEnvelope
  backup: unknown
  issue: string
  readonly: boolean
}

const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const strings = (value: unknown) => Array.isArray(value)
  ? [...new Set(value.filter((item): item is string => typeof item === 'string' && item.length > 0))]
  : []

export function emptyEnvelope(): LearningEnvelope {
  return {
    schemaVersion: LEARNING_SCHEMA_VERSION,
    revision: 0,
    done: [],
    notes: {},
    recent: [],
    selfChecks: [],
    attempts: [],
    evidence: [],
    unresolvedLegacy: [],
    pause: null,
    quests: emptyQuestRecords(),
  }
}

function notesOf(value: unknown) {
  if (!object(value)) return {}
  return Object.fromEntries(Object.entries(value).filter(([, note]) => typeof note === 'string')) as Record<string, string>
}

function selfChecksFromLegacy(keys: string[]) {
  const selfChecks: SelfCheck[] = []
  const unresolvedLegacy: string[] = []
  for (const key of keys) {
    const row = deliverableByLegacy(key)
    if (!row) {
      unresolvedLegacy.push(key)
      continue
    }
    selfChecks.push({ deliverableId: row.id, legacyKey: key, source: 'self' })
  }
  return { selfChecks, unresolvedLegacy }
}

export function migrateProgress(raw: unknown): MigrateResult {
  const backup = raw
  if (!object(raw)) {
    return { envelope: emptyEnvelope(), backup, issue: '学习记录格式异常，已保留原始副本。', readonly: false }
  }
  const version = raw.schemaVersion
  if (typeof version === 'number' && version > LEARNING_SCHEMA_VERSION) {
    return {
      envelope: emptyEnvelope(),
      backup,
      issue: `记录版本 ${version} 比本页新，只可阅读备份，不能改写。`,
      readonly: true,
    }
  }
  if (version === LEARNING_SCHEMA_VERSION && Array.isArray(raw.selfChecks)) {
    return { envelope: normalizeEnvelope(raw), backup, issue: '', readonly: false }
  }
  const legacy = selfChecksFromLegacy(strings(raw.pathChecks))
  return {
    envelope: {
      ...emptyEnvelope(),
      revision: typeof raw.revision === 'number' && raw.revision >= 0 ? Math.floor(raw.revision) : 0,
      done: strings(raw.done),
      notes: notesOf(raw.notes),
      recent: strings(raw.recent).slice(0, 12),
      selfChecks: legacy.selfChecks,
      unresolvedLegacy: legacy.unresolvedLegacy,
    },
    backup,
    issue: legacy.unresolvedLegacy.length ? '有旧勾选不在冻结的交付物名单里，已留在 unresolvedLegacy，没有当成通过。' : '',
    readonly: false,
  }
}

function normalizeEnvelope(raw: Record<string, unknown>): LearningEnvelope {
  const base = emptyEnvelope()
  const attempts = Array.isArray(raw.attempts) ? raw.attempts.filter(object) as Attempt[] : []
  const evidence = evidenceOf(raw.evidence)
  const selfChecks = Array.isArray(raw.selfChecks)
    ? raw.selfChecks.filter((item): item is SelfCheck => object(item) && item.source === 'self' && typeof item.deliverableId === 'string')
    : []
  return {
    ...base,
    revision: typeof raw.revision === 'number' && raw.revision >= 0 ? Math.floor(raw.revision) : 0,
    done: strings(raw.done),
    notes: notesOf(raw.notes),
    recent: strings(raw.recent).slice(0, 12),
    selfChecks,
    attempts,
    evidence,
    unresolvedLegacy: strings(raw.unresolvedLegacy),
    pause: pauseOf(raw.pause),
    quests: questsOf(raw.quests),
  }
}

function questsOf(value: unknown): QuestRecord[] {
  if (!Array.isArray(value)) return []
  const items: QuestRecord[] = []
  for (const item of value) {
    if (!object(item) || typeof item.id !== 'string') continue
    const def = questById(item.id)
    if (!def) continue
    const step = typeof item.step === 'number' && item.step >= 0
      ? Math.min(def.milestones.length, Math.floor(item.step))
      : 0
    const allowed = new Set(def.rewards.map((reward) => reward.id))
    const rewardIds = strings(item.rewardIds).filter((id) => allowed.has(id))
    const marks = Array.isArray(item.marks)
      ? item.marks.filter((mark): mark is string => typeof mark === 'string').slice(0, step).map((mark) => mark.slice(0, 80))
      : []
    items.push({
      id: item.id,
      step,
      status: step >= def.milestones.length && def.milestones.length > 0 ? 'cleared' : 'active',
      rewardIds,
      marks,
    })
  }
  return [...new Map(items.map((item) => [item.id, item])).values()]
}

function pauseOf(value: unknown): LearningPause | null {
  if (!object(value)) return null
  if (value.choice !== 'day' && value.choice !== 'week' && value.choice !== 'month') return null
  if (typeof value.since !== 'string' || value.since.length === 0) return null
  return { choice: value.choice, since: value.since }
}

function scoreOf(value: unknown): Evidence['score'] | undefined {
  if (!object(value) || typeof value.value !== 'number' || value.value < 0 || value.value > 4) return undefined
  const source: ScoreSource = value.source === 'local' || value.source === 'human' ? value.source : 'self'
  return { value: Math.floor(value.value), source }
}

function evidenceOf(value: unknown): Evidence[] {
  if (!Array.isArray(value)) return []
  const items: Evidence[] = []
  for (const item of value) {
    if (!object(item) || typeof item.id !== 'string' || typeof item.attemptId !== 'string' || typeof item.taskId !== 'string') continue
    const source: ScoreSource = item.source === 'local' || item.source === 'human' ? item.source : 'self'
    const kind = item.kind === 'local-check' || item.kind === 'review' ? item.kind : 'self'
    let verification: Evidence['verification'] = item.verification === 'passed' || item.verification === 'failed' ? item.verification : 'pending'
    if (source === 'self' || kind === 'self') verification = 'pending'
    const score = scoreOf(item.score)
    items.push({
      id: item.id,
      attemptId: item.attemptId,
      taskId: item.taskId,
      taskVersion: typeof item.taskVersion === 'number' && item.taskVersion >= 1 ? Math.floor(item.taskVersion) : 1,
      kind,
      verification,
      source,
      summary: typeof item.summary === 'string' ? item.summary : '',
      ...(score ? { score } : {}),
      ...(item.deleted === true ? { deleted: true } : {}),
    })
  }
  return items
}

export function verifiedFromReading(_doneCount: number): Evidence[] {
  return []
}

export function selfEvidenceForDraft(attempt: Attempt, score: number | null): Evidence {
  const safeScore = score != null && score >= 0 && score <= 4 ? Math.floor(score) : null
  return {
    id: `${attempt.id}:self`,
    attemptId: attempt.id,
    taskId: attempt.taskId,
    taskVersion: attempt.taskVersion,
    kind: 'self',
    verification: 'pending',
    source: 'self',
    summary: `草稿 ${attempt.draft.trim().length} 字。本站没有运行代码。`,
    ...(safeScore == null ? {} : { score: { value: safeScore, source: 'self' as const } }),
  }
}

/** 选择题对上固定项。来源是站内比对，只记本地检查，不改过关勾选。 */
export function choicePassEvidence(exam: { id: string; version: number }, optionId: string): { attempt: Attempt; evidence: Evidence } {
  const attemptId = `${exam.id}@${exam.version}:choice`
  return {
    attempt: {
      id: attemptId,
      taskId: exam.id,
      taskVersion: exam.version,
      status: 'saved',
      hintLevel: 0,
      draft: optionId,
    },
    evidence: {
      id: `${attemptId}:local`,
      attemptId,
      taskId: exam.id,
      taskVersion: exam.version,
      kind: 'local-check',
      verification: 'passed',
      source: 'local',
      summary: `选择题对上固定答案。只记本地检查，不改过关勾选。`,
    },
  }
}

/** 学员记下的样板失败。来源仍是学员自己，不能变成已通过。 */
export function labFailureEvidence(attempt: Attempt, check: { id: string; next: string }): Evidence {
  const seen = attempt.draft.trim().replace(/\s+/g, ' ')
  const brief = seen.length > 180 ? `${seen.slice(0, 180)}…` : seen
  return {
    id: `${attempt.id}:fail:${check.id}`,
    attemptId: attempt.id,
    taskId: attempt.taskId,
    taskVersion: attempt.taskVersion,
    kind: 'self',
    verification: 'pending',
    source: 'self',
    summary: `记下未通过：${check.id}。看到：${brief}。其他证据还在。下一步：${check.next}`,
  }
}

/** 阅读数和学员自报都不能变成已通过。 */
export function taskVerified(evidence: readonly Evidence[], taskId: string) {
  return evidence.some((item) =>
    item.taskId === taskId && !item.deleted && item.verification === 'passed' && item.source !== 'self' && item.kind !== 'self')
}

export type SaveResult = { ok: true; envelope: LearningEnvelope } | { ok: false; issue: string; envelope: LearningEnvelope }

export function rememberAttempt(envelope: LearningEnvelope, attempt: Attempt): SaveResult {
  const without = envelope.attempts.filter((item) => item.id !== attempt.id)
  return {
    ok: true,
    envelope: { ...envelope, revision: envelope.revision + 1, attempts: [...without, attempt] },
  }
}

export function rememberEvidence(envelope: LearningEnvelope, evidence: Evidence): SaveResult {
  const [normalized] = evidenceOf([evidence])
  if (!normalized) return { ok: false, issue: '证据缺少编号。', envelope }
  const without = envelope.evidence.filter((item) => item.id !== normalized.id)
  return {
    ok: true,
    envelope: { ...envelope, revision: envelope.revision + 1, evidence: [...without, normalized] },
  }
}

export function rememberPause(envelope: LearningEnvelope, choice: PauseChoice): SaveResult {
  return {
    ok: true,
    envelope: {
      ...envelope,
      revision: envelope.revision + 1,
      pause: { choice, since: new Date().toISOString() },
    },
  }
}

export function resumeLearning(envelope: LearningEnvelope): SaveResult {
  return { ok: true, envelope: { ...envelope, revision: envelope.revision + 1, pause: null } }
}

export type QuestSave = {
  ok: boolean
  issue: string
  envelope: LearningEnvelope
  granted: QuestReward[]
}

/** 只改 quests。不写证据，也不把自评改成已通过。 */
export function applyQuestAction(envelope: LearningEnvelope, action: QuestAction): QuestSave {
  const result = reduceQuests(envelope.quests ?? [], action, envelope.attempts)
  if (!result.ok || !result.changed) {
    return { ok: result.ok, issue: result.issue, envelope, granted: [] }
  }
  return {
    ok: true,
    issue: '',
    granted: result.granted,
    envelope: { ...envelope, revision: envelope.revision + 1, quests: result.records },
  }
}

export function failSave(envelope: LearningEnvelope): SaveResult {
  return { ok: false, issue: '未保存到本机', envelope }
}

const SECRET = /(api[_-]?key|password|secret|token)\s*[:=]\s*\S+/i

export function exportEnvelope(envelope: LearningEnvelope) {
  const json = JSON.stringify(envelope)
  if (SECRET.test(json)) return { ok: false as const, issue: '导出里有疑似密钥，已停止。' }
  return { ok: true as const, json }
}

export type ImportPreview = {
  ok: boolean
  issue: string
  schemaVersion: number | null
  counts: { attempts: number; evidence: number; selfChecks: number }
  conflicts: string[]
}

export function previewImport(raw: unknown, current: LearningEnvelope): ImportPreview {
  if (!object(raw) || raw.schemaVersion !== LEARNING_SCHEMA_VERSION) {
    return { ok: false, issue: '导入文件不是本版学习记录。', schemaVersion: typeof raw === 'object' && raw && 'schemaVersion' in raw ? Number((raw as { schemaVersion: unknown }).schemaVersion) : null, counts: { attempts: 0, evidence: 0, selfChecks: 0 }, conflicts: [] }
  }
  if (SECRET.test(JSON.stringify(raw))) {
    return { ok: false, issue: '导入文件含疑似密钥，未合并。', schemaVersion: LEARNING_SCHEMA_VERSION, counts: { attempts: 0, evidence: 0, selfChecks: 0 }, conflicts: [] }
  }
  const incoming = normalizeEnvelope(raw)
  const conflicts = incoming.attempts.filter((attempt) => {
    const prior = current.attempts.find((item) => item.id === attempt.id)
    return prior && prior.draft !== attempt.draft && !prior.deleted
  }).map((attempt) => attempt.id)
  const deleted = new Set(current.attempts.filter((item) => item.deleted).map((item) => item.id))
  for (const attempt of incoming.attempts) {
    if (deleted.has(attempt.id) && !attempt.deleted) conflicts.push(attempt.id)
  }
  return {
    ok: true,
    issue: conflicts.length ? '有同一条记录的冲突，确认前不会覆盖撤销。' : '',
    schemaVersion: LEARNING_SCHEMA_VERSION,
    counts: { attempts: incoming.attempts.length, evidence: incoming.evidence.length, selfChecks: incoming.selfChecks.length },
    conflicts: [...new Set(conflicts)],
  }
}

export function mergeEnvelopes(local: LearningEnvelope, remote: LearningEnvelope): LearningEnvelope {
  const byId = new Map<string, Attempt>()
  for (const attempt of [...remote.attempts, ...local.attempts]) {
    const prior = byId.get(attempt.id)
    if (prior?.deleted) continue
    byId.set(attempt.id, attempt)
  }
  const evidence = new Map<string, Evidence>()
  for (const item of [...remote.evidence, ...local.evidence]) {
    const prior = evidence.get(item.id)
    if (prior?.deleted) continue
    evidence.set(item.id, item)
  }
  return {
    ...remote,
    revision: Math.max(local.revision, remote.revision) + 1,
    done: [...new Set([...remote.done, ...local.done])],
    notes: { ...remote.notes, ...local.notes },
    attempts: [...byId.values()],
    evidence: [...evidence.values()],
    selfChecks: remote.selfChecks,
    quests: mergeQuestRecords(local.quests ?? [], remote.quests ?? []),
  }
}

export function dualFrameworkEarned(passedSkillIds: ReadonlySet<string>) {
  return passedSkillIds.has('R01') && passedSkillIds.has('V01')
}

export function frozenDeliverableCount() {
  return FROZEN_DELIVERABLES.length
}
