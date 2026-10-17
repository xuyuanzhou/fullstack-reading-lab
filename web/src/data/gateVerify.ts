/** 关卡能力闭环：验证进度只读证据，不改 gateCleared。 */

import {
  G1_WRITTEN_EXAMS,
  G2_RETRY_EXAMS,
  G2_WRITTEN_EXAMS,
  G3_WRITTEN_EXAMS,
  G4_WRITTEN_EXAMS,
  G5_WRITTEN_EXAMS,
  G6_WRITTEN_EXAMS,
  LEARNING_TASKS,
  type LearningTask,
  type WrittenExam,
} from './learningTasks.ts'
import { openQuestionsForGate } from './gateOpen.ts'
import { ORDER_SCALE_EXAMS } from './orderScaleGate.ts'
import { taskVerified, type Attempt, type Evidence } from '../state/learningEvidence.ts'

export type VerifyFace = 'idle' | 'pending' | 'passed'

export type VerifyTier = 'base' | 'advanced'

export type VerifyItem = {
  id: string
  title: string
  kind: 'task' | 'exam'
  /** 基础计入这一关的验证条。进阶只加标记，不挡通过。 */
  tier: VerifyTier
}

/** 当场问答和每关第一道选择题是基础。其余选择题换了一个约束，算进阶。OS- 是笔试专关的六题，全部计入该关。 */
export function verifyTier(kind: VerifyItem['kind'], code: string): VerifyTier {
  if (kind === 'task') return 'base'
  if (code.startsWith('OS-')) return 'base'
  return code.endsWith('-W1') ? 'base' : 'advanced'
}

const EXAMS_BY_GATE: Readonly<Record<string, readonly WrittenExam[]>> = {
  g1: G1_WRITTEN_EXAMS,
  g2: [...G2_WRITTEN_EXAMS, ...G2_RETRY_EXAMS],
  g3: G3_WRITTEN_EXAMS,
  g4: G4_WRITTEN_EXAMS,
  g5: G5_WRITTEN_EXAMS,
  g6: G6_WRITTEN_EXAMS,
  'g-order-scale': ORDER_SCALE_EXAMS,
}

/** 关卡能力目标：复用 pass，不做第二套文案源。 */
export function abilityGoal(gate: { pass: string }) {
  return gate.pass
}

export function verifyTasksForGate(gateId: string): readonly LearningTask[] {
  return LEARNING_TASKS.filter((item) => item.gateId === gateId && item.required)
}

export function verifyExamsForGate(gateId: string): readonly WrittenExam[] {
  return EXAMS_BY_GATE[gateId] ?? []
}

export function nextVerifyId(gateId: string, currentId: string): string | undefined {
  const items = verifyItemsForGate(gateId)
  const index = items.findIndex((item) => item.id === currentId)
  if (index < 0 || index + 1 >= items.length) return undefined
  return items[index + 1].id
}

export function writtenExam(id: string): WrittenExam | undefined {
  for (const list of Object.values(EXAMS_BY_GATE)) {
    const found = list.find((item) => item.id === id)
    if (found) return found
  }
  return undefined
}

export function verifyItemsForGate(gateId: string): readonly VerifyItem[] {
  return [
    ...verifyTasksForGate(gateId).map((item) => ({
      id: item.id,
      title: item.title,
      kind: 'task' as const,
      tier: verifyTier('task', ''),
    })),
    ...openQuestionsForGate(gateId).map((item) => ({
      id: item.id,
      title: item.title,
      kind: 'task' as const,
      tier: verifyTier('task', ''),
    })),
    ...verifyExamsForGate(gateId).map((item) => ({
      id: item.id,
      title: `笔试 ${item.code}`,
      kind: 'exam' as const,
      tier: verifyTier('exam', item.code),
    })),
  ]
}

export function verifyFace(
  taskId: string,
  attempts: readonly Attempt[],
  evidence: readonly Evidence[],
): VerifyFace {
  if (taskVerified(evidence, taskId)) return 'passed'
  const drafted = attempts.some((item) => item.taskId === taskId && !item.deleted && item.draft.trim().length > 0)
  if (drafted) return 'pending'
  const noted = evidence.some((item) => item.taskId === taskId && !item.deleted)
  if (noted) return 'pending'
  return 'idle'
}

export function verifyFaceLabel(face: VerifyFace) {
  if (face === 'passed') return '本地检查通过'
  if (face === 'pending') return '自评完成，待复核'
  return '未开始'
}

export type GateVerifyFill = {
  total: number
  passed: number
  pending: number
  /** 进度条分子：已动手的基础项（待复核 + 本地检查通过）。 */
  started: number
  advancedTotal: number
  /** 进阶里已经有草稿或本地检查的项。不计入 passed。 */
  advancedNoted: number
  label: string
  note: string
}

export function gateVerifyFill(
  gateId: string,
  attempts: readonly Attempt[],
  evidence: readonly Evidence[],
): GateVerifyFill {
  const items = verifyItemsForGate(gateId)
  const base = items.filter((item) => item.tier === 'base')
  const advanced = items.filter((item) => item.tier === 'advanced')
  if (items.length === 0) {
    return {
      total: 0,
      passed: 0,
      pending: 0,
      started: 0,
      advancedTotal: 0,
      advancedNoted: 0,
      label: '本关暂无站内验证题',
      note: '阅读与交付仍按旧口径记过关。验证题上线后再计这一段。',
    }
  }
  let passed = 0
  let pending = 0
  for (const item of base) {
    const face = verifyFace(item.id, attempts, evidence)
    if (face === 'passed') passed += 1
    else if (face === 'pending') pending += 1
  }
  let advancedNoted = 0
  for (const item of advanced) {
    if (verifyFace(item.id, attempts, evidence) !== 'idle') advancedNoted += 1
  }
  const started = passed + pending
  const label = base.length === 0
    ? '本关基础验证还未挂上'
    : passed === base.length
      ? `${passed}/${base.length} 本地检查通过`
      : pending > 0
        ? `${pending} 项待复核 · ${passed}/${base.length} 本地检查通过`
        : `0/${base.length} · 还未做验证`
  const core = '验证不冒充认证。有草稿只算待复核；只有站内可重跑检查通过才算本地检查通过。这一关通过要阅读、交付和 Boss 考试都齐。'
  const extra = advanced.length
    ? `进阶 ${advancedNoted}/${advanced.length} 已记下，不计入通过，也不是认证。`
    : ''
  return {
    total: base.length,
    passed,
    pending,
    started,
    advancedTotal: advanced.length,
    advancedNoted,
    label,
    note: extra ? `${core}${extra}` : core,
  }
}

export type GateEdition = {
  /** 总图上的短标记。没有验证题，或勾选已齐但证据未达标时留空，仍显示原来的「已过」。 */
  mark: '' | '新版已通过'
  note: string
}

export type GateAdvise = {
  unmet: { id: string; title: string }[]
  /** 验证石台在还没有证据时的短状态。没有验证题时留空。 */
  stone: '' | '可挑战' | '建议先完成'
  skipNote: string
  canSkip: boolean
}

/** 前置只决定建议文案。satisfied 由调用方用旧过关或「新版已通过」算好。 */
export function gateAdvise(input: {
  requires: readonly string[]
  titles: Readonly<Record<string, string>>
  satisfied: ReadonlySet<string>
  skipped: boolean
  hasVerify: boolean
}): GateAdvise {
  const unmet = input.requires
    .filter((id) => !input.satisfied.has(id))
    .slice(0, 3)
    .map((id) => ({ id, title: input.titles[id] || id }))
  if (unmet.length === 0) {
    return { unmet, stone: input.hasVerify ? '可挑战' : '', skipNote: '', canSkip: false }
  }
  if (input.skipped) {
    return {
      unmet,
      stone: input.hasVerify ? '可挑战' : '',
      skipNote: '已跳过建议先修。通过只记这一关。',
      canSkip: false,
    }
  }
  return {
    unmet,
    stone: input.hasVerify ? '建议先完成' : '',
    skipNote: '',
    canSkip: input.hasVerify,
  }
}

/** 整关新版通过时的顶条。能力句里已有「不是精通」时不再重复。 */
export function passFlashLine(pass: string) {
  const body = pass.trim().replace(/。$/, '')
  const modest = body.includes('不是精通') ? `${body}。` : `${body}。这一关不是精通。`
  return `新版已通过。${modest}`
}

/** 旧版过关不改。证据未达标时不另标。每一项都是本地检查通过才标「新版已通过」。 */
export function gateEdition(legacyCleared: boolean, fill: Pick<GateVerifyFill, 'total' | 'passed'>): GateEdition {
  if (!legacyCleared || fill.total === 0 || fill.passed !== fill.total) return { mark: '', note: '' }
  return {
    mark: '新版已通过',
    note: '新版已通过。每一项都是本地检查通过。阅读和交付的勾选还在。',
  }
}
