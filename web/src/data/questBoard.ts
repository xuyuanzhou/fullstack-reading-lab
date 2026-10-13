import { FROZEN_DELIVERABLES } from './deliverableMap.ts'
import { LEARNING_TASKS } from './learningTasks.ts'
import { MASTERY_GATES } from './masteryGates.ts'
import { SIDE_TRACKS } from './sideTracks.ts'

/** 地图上的三类。主线组本身不单独记进度，进度在它下面的子关。 */
export type QuestKind = 'main' | 'sub' | 'side' | 'boss'

export type QuestTier = 'node' | 'clear' | 'boss'

export type QuestReward = {
  id: string
  title: string
  detail: string
  tier: QuestTier
}

export type QuestMilestone = {
  id: string
  title: string
  /** 小 boss 的这一档对应哪一道当次任务。 */
  taskId?: string
  rewardId: string
}

export type QuestDef = {
  id: string
  kind: Exclude<QuestKind, 'main'>
  title: string
  objective: string
  /** 全部完成才可记进度。支线和小 boss 为空，不跟主线勾选。 */
  unlock: readonly string[]
  trigger: string
  parentId?: string
  milestones: readonly QuestMilestone[]
  rewards: readonly QuestReward[]
}

export type QuestRecord = {
  id: string
  step: number
  status: 'active' | 'cleared'
  rewardIds: string[]
  marks: string[]
}

export type QuestStatus = 'locked' | 'available' | 'active' | 'cleared'

export type QuestAction =
  | { type: 'start'; id: string }
  | { type: 'advance'; id: string; mark: string }

export type QuestAttempt = {
  taskId: string
  draft: string
  deleted?: boolean
}

export type QuestResult = {
  ok: boolean
  issue: string
  changed: boolean
  records: QuestRecord[]
  granted: QuestReward[]
}

export type MainLane = {
  id: string
  gateId: string
  title: string
  learnTitle: string
  subs: QuestDef[]
}

const MARK = '这是本机标记，不是能力认证，也不改变九关勾选。'

function clip(text: string, max: number) {
  const flat = text.replace(/\s+/g, '')
  return flat.length > max ? `${flat.slice(0, max)}…` : flat
}

function subReward(id: string, title: string): QuestReward {
  return {
    id: `reward:${id}`,
    title: `记下${title}`,
    detail: `完成这一子关。${MARK}`,
    tier: 'clear',
  }
}

function nodeReward(id: string, title: string): QuestReward {
  return {
    id,
    title,
    detail: `到达这一节点。${MARK}`,
    tier: 'node',
  }
}

function buildSubs(): QuestDef[] {
  const defs: QuestDef[] = []
  let previous: string | null = null
  for (const gate of MASTERY_GATES) {
    const rows = FROZEN_DELIVERABLES.filter((row) => row.gateId === gate.id)
    rows.forEach((row, index) => {
      const id = `sub:${row.id}`
      const objective = gate.outputs[row.index] ?? row.id
      const title = `第 ${index + 1} 项 · ${clip(objective, 16)}`
      const reward = subReward(id, title)
      const milestoneId = `${id}:done`
      defs.push({
        id,
        kind: 'sub',
        title,
        objective,
        unlock: previous ? [previous] : [],
        trigger: previous ? '上一子关记下之后，这一项才可以记进度。课仍可直接打开。' : '主线第一项，随时可以记。',
        parentId: `main:${gate.id}`,
        milestones: [{ id: milestoneId, title: '记下这一项', rewardId: reward.id }],
        rewards: [reward],
      })
      previous = id
    })
  }
  return defs
}

function buildSides(): QuestDef[] {
  return SIDE_TRACKS.map((track) => {
    const id = `side:${track.id}`
    const milestones = track.items.map((item, index) => {
      const rewardId = `reward:${id}:node:${index}`
      return { id: `${id}:node:${index}`, title: item.label, rewardId }
    })
    const clear: QuestReward = {
      id: `reward:${id}:clear`,
      title: `支线完成：${track.title}`,
      detail: `四条可以同时做。${track.evidence[0] ?? '留下作品里的记录'}。${MARK}不计入九关必读。`,
      tier: 'clear',
    }
    return {
      id,
      kind: 'side' as const,
      title: track.title,
      objective: track.when,
      unlock: [],
      trigger: '不看九关进度。想做哪条就做哪条，可以同时进行。',
      milestones,
      rewards: [
        ...milestones.map((item) => nodeReward(item.rewardId, item.title)),
        clear,
      ],
    }
  })
}

function buildBoss(): QuestDef {
  const id = 'boss:core'
  const grades = ['入门', '加压', '收口'] as const
  const milestones = LEARNING_TASKS.map((task, index) => {
    const rewardId = `reward:${id}:node:${task.id}`
    return {
      id: `${id}:${task.id}`,
      title: `${grades[index] ?? '加压'} · ${task.title}`,
      taskId: task.id,
      rewardId,
    }
  })
  const clear: QuestReward = {
    id: `reward:${id}:clear`,
    title: '通过核心挑战',
    detail: `三档都已记下，并带上每档的阶段标记。比单独一个子关多这些阶段标记。${MARK}`,
    tier: 'boss',
  }
  return {
    id,
    kind: 'boss',
    title: '核心挑战',
    objective: '当次三题按入门、加压、收口依次记下。不能跳档。每一档要先保存该题草稿。',
    unlock: [],
    trigger: '随时可进。难度在三档里面升高，不靠主线勾选把门。',
    parentId: 'main:g2',
    milestones,
    rewards: [
      ...milestones.map((item) => nodeReward(item.rewardId, item.title)),
      clear,
    ],
  }
}

const SUBS = buildSubs()
const SIDES = buildSides()
const BOSS = buildBoss()

export const QUEST_DEFS: readonly QuestDef[] = [...SUBS, ...SIDES, BOSS]

const byId = new Map(QUEST_DEFS.map((item) => [item.id, item]))

export function questById(id: string) {
  return byId.get(id)
}

export function mainLanes(): MainLane[] {
  return MASTERY_GATES.map((gate) => ({
    id: `main:${gate.id}`,
    gateId: gate.id,
    title: gate.title,
    learnTitle: gate.learnTitle,
    subs: SUBS.filter((item) => item.parentId === `main:${gate.id}`),
  }))
}

export function sideQuests() {
  return SIDES
}

export function bossQuest() {
  return BOSS
}

export function emptyQuestRecords(): QuestRecord[] {
  return []
}

function rowOf(records: readonly QuestRecord[], id: string) {
  return records.find((item) => item.id === id)
}

export function isUnlocked(def: QuestDef, records: readonly QuestRecord[]) {
  return def.unlock.every((id) => rowOf(records, id)?.status === 'cleared')
}

export function questStatus(def: QuestDef, records: readonly QuestRecord[]): QuestStatus {
  const row = rowOf(records, def.id)
  if (row?.status === 'cleared') return 'cleared'
  if (!isUnlocked(def, records)) return 'locked'
  if (row) return 'active'
  return 'available'
}

export function mainStatus(lane: MainLane, records: readonly QuestRecord[]): QuestStatus {
  const statuses = lane.subs.map((item) => questStatus(item, records))
  if (statuses.length > 0 && statuses.every((item) => item === 'cleared')) return 'cleared'
  if (statuses.some((item) => item === 'active' || item === 'cleared')) return 'active'
  if (statuses.some((item) => item === 'available')) return 'available'
  return 'locked'
}

export function statusLabel(status: QuestStatus) {
  if (status === 'cleared') return '已记下'
  if (status === 'active') return '进行中'
  if (status === 'available') return '可开始'
  return '未解锁'
}

/** 界面上的五态。三星是笔记写满，存储里仍是 cleared。 */
export type QuestFace = 'locked' | 'available' | 'active' | 'cleared' | 'starred'

export type QuestDifficulty = '入门' | '标准' | '加压' | '选修' | '挑战'

/** 每一句笔记至少这么多字，通关才显示三星。 */
export const QUEST_STAR_NOTE = 8

export function questStars(def: QuestDef, records: readonly QuestRecord[]): 0 | 1 | 2 | 3 {
  const row = rowOf(records, def.id)
  if (!row || row.step <= 0) return 0
  if (row.status !== 'cleared') return 1
  const notes = row.marks.slice(0, def.milestones.length)
  const full = notes.length === def.milestones.length && notes.every((mark) => mark.trim().length >= QUEST_STAR_NOTE)
  return full ? 3 : 2
}

export function questFace(def: QuestDef, records: readonly QuestRecord[]): QuestFace {
  const status = questStatus(def, records)
  if (status === 'cleared' && questStars(def, records) === 3) return 'starred'
  return status
}

export function faceLabel(face: QuestFace) {
  if (face === 'starred') return '三星通关'
  if (face === 'cleared') return '已通关'
  if (face === 'active') return '进行中'
  if (face === 'available') return '可开始'
  return '未解锁'
}

export function mainFace(lane: MainLane, records: readonly QuestRecord[]): QuestFace {
  const faces = lane.subs.map((item) => questFace(item, records))
  if (faces.length > 0 && faces.every((item) => item === 'starred')) return 'starred'
  if (faces.length > 0 && faces.every((item) => item === 'cleared' || item === 'starred')) return 'cleared'
  if (faces.some((item) => item === 'active' || item === 'cleared' || item === 'starred')) return 'active'
  if (faces.some((item) => item === 'available')) return 'available'
  return 'locked'
}

export function mainStars(lane: MainLane, records: readonly QuestRecord[]): 0 | 1 | 2 | 3 {
  const stars = lane.subs.map((item) => questStars(item, records))
  if (stars.length > 0 && stars.every((item) => item === 3)) return 3
  if (stars.length > 0 && stars.every((item) => item >= 2)) return 2
  if (stars.some((item) => item >= 1)) return 1
  return 0
}

export function questDifficulty(def: QuestDef, index: number, total: number): QuestDifficulty {
  if (def.kind === 'boss') return '挑战'
  if (def.kind === 'side') return '选修'
  if (total <= 1) return '标准'
  const band = Math.ceil(total / 3)
  if (index < band) return '入门'
  if (index >= total - band) return '加压'
  return '标准'
}

export function newlyAvailable(advancedId: string, records: readonly QuestRecord[]) {
  return QUEST_DEFS.find((item) => item.unlock.includes(advancedId) && questStatus(item, records) === 'available')?.id ?? null
}

function upsert(records: readonly QuestRecord[], next: QuestRecord) {
  const without = records.filter((item) => item.id !== next.id)
  return [...without, next]
}

function blank(id: string): QuestRecord {
  return { id, step: 0, status: 'active', rewardIds: [], marks: [] }
}

function fail(records: readonly QuestRecord[], issue: string): QuestResult {
  return { ok: false, issue, changed: false, records: [...records], granted: [] }
}

/** 记一笔关卡进度。奖励 id 只发一次。小 boss 的下一档要该题已有未删除草稿。 */
export function reduceQuests(
  records: readonly QuestRecord[],
  action: QuestAction,
  attempts: readonly QuestAttempt[] = [],
): QuestResult {
  const def = questById(action.id)
  if (!def) return fail(records, '没有这一关。')
  if (!isUnlocked(def, records)) return fail(records, '这一关还没解锁。先记下上一子关。课可以先读。')
  const current = rowOf(records, def.id)
  if (action.type === 'start') {
    if (current?.status === 'cleared') return fail(records, '这一关已经记下。')
    if (current) return { ok: true, issue: '', changed: false, records: [...records], granted: [] }
    return { ok: true, issue: '', changed: true, records: upsert(records, blank(def.id)), granted: [] }
  }
  if (current?.status === 'cleared') {
    return { ok: true, issue: '', changed: false, records: [...records], granted: [] }
  }
  const mark = action.mark.trim().slice(0, 80)
  if (!mark) return fail(records, '先写下一句这次做到哪。空记录不发奖励。')
  const base = current ?? blank(def.id)
  if (base.step >= def.milestones.length) {
    return { ok: true, issue: '', changed: false, records: [...records], granted: [] }
  }
  const milestone = def.milestones[base.step]
  if (def.kind === 'boss') {
    const ready = attempts.some((item) => item.taskId === milestone.taskId && !item.deleted && item.draft.trim().length > 0)
    if (!ready) return fail(records, '这一档要先保存该题草稿。本站不运行测试。')
  }
  const rewardIds = [...base.rewardIds]
  const granted: QuestReward[] = []
  const node = def.rewards.find((item) => item.id === milestone.rewardId)
  if (node && !rewardIds.includes(node.id)) {
    rewardIds.push(node.id)
    granted.push(node)
  }
  const step = base.step + 1
  const cleared = step >= def.milestones.length
  if (cleared) {
    const fin = def.rewards.find((item) => item.tier === 'clear' || item.tier === 'boss')
    if (fin && !rewardIds.includes(fin.id)) {
      rewardIds.push(fin.id)
      granted.push(fin)
    }
  }
  const next: QuestRecord = {
    id: def.id,
    step,
    status: cleared ? 'cleared' : 'active',
    rewardIds,
    marks: [...base.marks, mark],
  }
  return { ok: true, issue: '', changed: true, records: upsert(records, next), granted }
}

/** 不同关卡各留各的。同一关取走得更远的一步，奖励取并集，不按时间覆盖。 */
export function mergeQuestRecords(local: readonly QuestRecord[], remote: readonly QuestRecord[]) {
  const ids = new Set([...local, ...remote].map((item) => item.id))
  const merged: QuestRecord[] = []
  for (const id of ids) {
    const left = rowOf(local, id)
    const right = rowOf(remote, id)
    if (!left || !right) {
      const only = left ?? right
      if (only && questById(only.id)) merged.push(only)
      continue
    }
    const def = questById(id)
    if (!def) continue
    const step = Math.min(def.milestones.length, Math.max(left.step, right.step))
    const primary = left.step >= right.step ? left : right
    const secondary = primary === left ? right : left
    const marks = Array.from({ length: step }, (_, index) => primary.marks[index] || secondary.marks[index] || '')
    const allowed = new Set(def.rewards.map((item) => item.id))
    const rewardIds = [...new Set([...left.rewardIds, ...right.rewardIds])].filter((item) => allowed.has(item))
    merged.push({
      id,
      step,
      status: step >= def.milestones.length ? 'cleared' : 'active',
      rewardIds,
      marks,
    })
  }
  return merged
}

export function questGraphIssues() {
  const issues: string[] = []
  const ids = new Set<string>()
  for (const def of QUEST_DEFS) {
    if (ids.has(def.id)) issues.push(`duplicate ${def.id}`)
    ids.add(def.id)
    if (def.milestones.length === 0) issues.push(`empty ${def.id}`)
    for (const need of def.unlock) {
      if (!ids.has(need) && !QUEST_DEFS.some((item) => item.id === need)) issues.push(`dangling ${def.id} -> ${need}`)
    }
  }
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const walk = (id: string) => {
    if (visited.has(id)) return
    if (visiting.has(id)) {
      issues.push(`cycle ${id}`)
      return
    }
    visiting.add(id)
    const def = questById(id)
    for (const need of def?.unlock ?? []) walk(need)
    visiting.delete(id)
    visited.add(id)
  }
  for (const def of QUEST_DEFS) walk(def.id)
  return issues
}
