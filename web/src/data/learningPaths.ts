/** Delivery paths. Lesson ids match docs/全栈主线精通审查.md. */

import { pathSlots } from './learningGraph.ts'
import { MASTERY_GATES } from './masteryGates.ts'

/** One slot is one required read. Lessons that share a note are alternatives and count as one slot. */
export function deliverableKey(gateId: string, index: number) {
  return `${gateId}:${index}`
}

/** Path page for one gate. Omit the id to land on the first gate that is not yet cleared. */
export function gatePath(gateId?: string, focus?: 'deliver') {
  const params = new URLSearchParams()
  if (gateId) params.set('gate', gateId)
  if (focus) params.set('focus', focus)
  const query = params.toString()
  return query ? `/paths?${query}` : '/paths'
}

/** Lessons in the gate are read, and every deliverable line is checked. */
export function gateCleared(gate: PathGate, doneIds: readonly string[], checks: readonly string[]) {
  const done = new Set(doneIds)
  const marked = new Set(checks)
  const slots = requiredSlotsOf(gate.lessons)
  const lessonsDone = slots.length === 0 || slots.every((slot) => slot.some((id) => done.has(id)))
  const delivered = gate.outputs.every((_, index) => marked.has(deliverableKey(gate.id, index)))
  return lessonsDone && delivered
}

export function lessonSlots(kind: PathKind): string[][] {
  return PATHS[kind].gates.flatMap((gate) => slotsOf(gate.lessons))
}

export function spinePlace(lessonId: string): { index: number; step: number; gate: PathGate } | undefined {
  const index = PATHS.architect.gates.findIndex((gate) => gate.lessons.some((lesson) => lesson.id === lessonId))
  if (index < 0) return undefined
  const gate = PATHS.architect.gates[index]
  return { index, step: gate.lessons.findIndex((lesson) => lesson.id === lessonId), gate }
}

/** Next required lesson inside the same stage. A 二选一 pair is one step, so the other lesson is skipped. */
export function spineNextId(lessonId: string): string | undefined {
  const place = spinePlace(lessonId)
  if (!place) return undefined
  const slots = requiredSlotsOf(place.gate.lessons)
  const at = slots.findIndex((slot) => slot.includes(lessonId))
  return slots[at + 1]?.[0]
}

export function spinePrevId(lessonId: string): string | undefined {
  const place = spinePlace(lessonId)
  if (!place) return undefined
  const slots = requiredSlotsOf(place.gate.lessons)
  const at = slots.findIndex((slot) => slot.includes(lessonId))
  if (at <= 0) return undefined
  return slots[at - 1]?.[0]
}

/** First lesson of the first slot that is still unread. Reading either lesson in a pair clears that slot. */
export function nextInGate(gate: PathGate, doneIds: readonly string[]): string | undefined {
  const done = new Set(doneIds)
  for (const slot of requiredSlotsOf(gate.lessons)) {
    if (slot.some((id) => done.has(id))) continue
    return slot[0]
  }
  return undefined
}

export type PathKind = 'fullstack' | 'architect'

export type PathLesson = {
  id: string
  /** 这节在这一关里要解决的一件事。 */
  job?: string
  note?: string
  requirement?: 'required' | 'supplement'
  alternativeGroup?: string
}

export function isSupplement(lesson: PathLesson) {
  return lesson.requirement === 'supplement' || (lesson.note?.includes('补读') ?? false)
}

/** Required slots only. 补读 stays on the gate list but does not block the next required lesson. */
export function requiredSlotsOf(lessons: PathLesson[]) {
  return pathSlots(lessons, true)
}

/** Consecutive「二选一」or the same alternativeGroup are one slot. */
export function slotsOf(lessons: PathLesson[]): string[][] {
  return pathSlots(lessons, false)
}

export type PathGate = {
  id: string
  title: string
  /** 给人看的阶段名，不使用课表分类词。 */
  learnTitle: string
  /** 直接前置关卡 id。只用于建议，不参与 gateCleared。 */
  requires: readonly string[]
  weeks: string
  /** 读这一关时按顺序做的事。 */
  how: string[]
  deliver: string
  /** 交付物拆开的条目。 */
  outputs: string[]
  pass: string
  /** 这一关在整条路线上的位置。给人看的句子。 */
  milestone?: string
  /** 地图上的短标记。不要用句子里的词来判断。 */
  milestoneKind?: 'fullstack' | 'architect'
  lessons: PathLesson[]
  extra?: string
}

export type GateFace = 'cleared' | 'live' | 'ahead' | 'resume'

/** 已过、进行中、还没走到、前面有缺口。未到仍可打开，不锁课。 */
export function gateFace(index: number, progressIndex: number, cleared: boolean): GateFace {
  if (cleared) return 'cleared'
  if (index === progressIndex) return 'live'
  if (index > progressIndex) return 'ahead'
  return 'resume'
}

export function gateFaceLabel(face: GateFace) {
  if (face === 'cleared') return '已过'
  if (face === 'live') return '进行中'
  if (face === 'ahead') return '未到'
  return '可补'
}

export type EncounterPhase = 'ready' | 'playing' | 'deliver' | 'resume' | 'cleared'

/** 这一场该怎么标。未读完仍可出发。课读完但交付未勾，进入待验收。 */
export function encounterPhase(
  index: number,
  progressIndex: number,
  cleared: boolean,
  readSlots: number,
  totalSlots: number,
): EncounterPhase {
  if (cleared) return 'cleared'
  if (totalSlots === 0 || readSlots >= totalSlots) return 'deliver'
  if (index < progressIndex) return 'resume'
  if (readSlots > 0) return 'playing'
  return 'ready'
}

export function encounterPhaseLabel(phase: EncounterPhase) {
  if (phase === 'cleared') return '已过'
  if (phase === 'deliver') return '待验收'
  if (phase === 'resume') return '可补'
  if (phase === 'playing') return '进行中'
  return '可开始'
}

export function encounterAction(phase: EncounterPhase) {
  if (phase === 'cleared') return '看下一场'
  if (phase === 'deliver') return '交上这一份'
  if (phase === 'resume') return '补上这一场'
  if (phase === 'playing') return '继续这一场'
  return '开始这一场'
}

/** First sentence, keeping its closing mark. */
export function sceneSentence(text: string) {
  const trimmed = text.trim()
  const end = trimmed.search(/[。！？]/u)
  if (end < 0) return trimmed
  return trimmed.slice(0, end + 1)
}

/** Where this gate's current scene sits. step is 1-based; lessonId is empty once every required slot is read. */
export function campScene(gate: PathGate, doneIds: readonly string[]) {
  const slots = requiredSlotsOf(gate.lessons)
  const done = new Set(doneIds)
  const at = slots.findIndex((slot) => !slot.some((id) => done.has(id)))
  return {
    total: slots.length,
    step: at < 0 ? slots.length : at + 1,
    lessonId: at < 0 ? undefined : slots[at]?.[0],
  }
}

export function missingOutput(gate: PathGate, checks: readonly string[]) {
  const marked = new Set(checks)
  return gate.outputs.find((_, index) => !marked.has(deliverableKey(gate.id, index)))
}

/** Spine lessons return to camp. Other lessons keep their own next link. */
export function sceneExitPath(lessonId: string) {
  const place = spinePlace(lessonId)
  if (!place) return undefined
  return gatePath(place.gate.id)
}

/** One line after 记下这一场. Empty unless that lesson is already in the read list and belongs to this gate. */
export function settleLine(
  settledId: string | undefined,
  gateLessonIds: readonly string[],
  doneIds: readonly string[],
  nextName: string | undefined,
) {
  if (!settledId || !gateLessonIds.includes(settledId) || !doneIds.includes(settledId)) return ''
  if (!nextName) return '本关课文已记下。'
  return `上一场已记下。下一场是 ${nextName}。`
}

/** Gate 1 shows only the scene until the first required read is stored. */
export function campShowsChrome(progressIndex: number, readSlots: number) {
  return !(progressIndex === 0 && readSlots === 0)
}

export function gateMark(stage: PathGate) {
  if (stage.milestoneKind === 'fullstack') return '全栈'
  if (stage.milestoneKind === 'architect') return '职责'
  return ''
}

export const PATHS: Record<
  PathKind,
  { title: string; lead: string; done: string; gates: PathGate[] }
> = {
  fullstack: {
    title: '全栈交付线',
    lead: '九关按同一条订单走到能上线、能定位、能留下决策。毕业看 F1～F9，不看课数。',
    done: 'F1～F9',
    gates: MASTERY_GATES,
  },
  architect: {
    title: '架构师主线',
    lead: '九关与全栈同一套课。第 3 关能独立交付一条全栈路径。第 9 关的决策会在工作里完成。支线另计，不改变这九关的必读。',
    done: 'F1～F9',
    gates: MASTERY_GATES,
  },
}
