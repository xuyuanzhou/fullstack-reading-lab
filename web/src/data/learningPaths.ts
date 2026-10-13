/** Delivery paths. Lesson ids match docs/全栈主线精通审查.md. */

import { MASTERY_GATES } from './masteryGates'

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
  const slots = slotsOf(gate.lessons)
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
  const slots = slotsOf(place.gate.lessons)
  const at = slots.findIndex((slot) => slot.includes(lessonId))
  return slots[at + 1]?.[0]
}

export function spinePrevId(lessonId: string): string | undefined {
  const place = spinePlace(lessonId)
  if (!place) return undefined
  const slots = slotsOf(place.gate.lessons)
  const at = slots.findIndex((slot) => slot.includes(lessonId))
  if (at <= 0) return undefined
  return slots[at - 1]?.[0]
}

/** First lesson of the first slot that is still unread. Reading either lesson in a pair clears that slot. */
export function nextInGate(gate: PathGate, doneIds: readonly string[]): string | undefined {
  const done = new Set(doneIds)
  for (const slot of slotsOf(gate.lessons)) {
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
}

/** Consecutive「二选一」lessons are one slot. Other notes, such as 补读, stay separate. */
export function slotsOf(lessons: PathLesson[]): string[][] {
  const slots: string[][] = []
  let group: string[] = []
  for (const lesson of lessons) {
    if (lesson.note?.includes('二选一')) {
      group.push(lesson.id)
      continue
    }
    if (group.length) {
      slots.push(group)
      group = []
    }
    slots.push([lesson.id])
  }
  if (group.length) slots.push(group)
  return slots
}

export type PathGate = {
  id: string
  title: string
  /** 给人看的阶段名，不使用课表分类词。 */
  learnTitle: string
  weeks: string
  /** 读这一关时按顺序做的事。 */
  how: string[]
  deliver: string
  /** 交付物拆开的条目。 */
  outputs: string[]
  pass: string
  /** 这一关在整条路线上的位置。 */
  milestone?: string
  lessons: PathLesson[]
  extra?: string
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
    lead: '九关与全栈同一套课。第 3 关能独立交付一条全栈路径。第 9 关的决策会在工作里完成。',
    done: 'F1～F9',
    gates: MASTERY_GATES,
  },
}
