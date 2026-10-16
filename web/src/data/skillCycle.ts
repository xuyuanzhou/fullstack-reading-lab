import { gateCleared } from './learningPaths.ts'
import { MASTERY_GATES } from './masteryGates.ts'
import {
  LEARNING_SKILLS,
  SKILL_SCENES,
  SKILL_VIEWS,
  type SkillGlow,
  type SkillSceneId,
} from './learningSkills.ts'

/** 读完是点亮。练过要再有本地检查，或这项挂着的关已经交付。不是岗位认证。 */
export type SkillRank = 'ahead' | 'ready' | 'research' | 'read' | 'practiced'

export const SKILL_RANK_LABEL: Record<SkillRank, string> = {
  ahead: '未走到',
  ready: '可以开始',
  research: '正在点亮',
  read: '读完',
  practiced: '练过',
}

export function skillRank(light: SkillGlow, practiced: boolean): SkillRank {
  if (light === 'lit') return practiced ? 'practiced' : 'read'
  if (light === 'research') return 'research'
  if (light === 'ready') return 'ready'
  return 'ahead'
}

export function fillPercent(done: number, total: number) {
  if (total <= 0) return 0
  return Math.round((done / total) * 100)
}

/**
 * 报告里的主干。星图仍是九列，不把节点挪列。
 * DevOps 只收容器、测试、持续集成。部署运维收接入、观测、排查、安全和密钥。
 */
export const SKILL_TRUNKS = [
  { id: 'base', title: '通识', hint: '网络、算法、Linux、Git' },
  { id: 'fe', title: '前端', hint: 'Web 入门到跨端' },
  { id: 'be', title: '后端', hint: 'Java、中间件、分布式' },
  { id: 'db', title: '数据库', hint: 'SQL 与库' },
  { id: 'devops', title: 'DevOps', hint: '容器、测试、持续集成' },
  { id: 'ops', title: '部署运维', hint: '接入、观测、排查、安全' },
  { id: 'ai', title: 'AI', hint: '提示词到服务交付' },
  { id: 'arch', title: '架构', hint: '边界、拆分、决策' },
] as const

export type SkillTrunkId = (typeof SKILL_TRUNKS)[number]['id']

const DEVOPS_IDS = new Set(['docker', 'compose', 'k8s', 'test', 'ci'])
const OPS_IDS = new Set(['nginx', 'cdn', 'oss', 'otel', 'triage', 'slo', 'S01', 'secrets'])

const LANE_TRUNK: Record<string, SkillTrunkId> = {
  计算机基础: 'base',
  前端: 'fe',
  Java: 'be',
  数据存储: 'db',
  中间件: 'be',
  分布式与高并发: 'be',
  工程与运维: 'ops',
  AI: 'ai',
  架构: 'arch',
}

export function skillTrunkId(id: string): SkillTrunkId {
  if (DEVOPS_IDS.has(id)) return 'devops'
  if (OPS_IDS.has(id)) return 'ops'
  const lane = SKILL_VIEWS.find((item) => item.id === id)?.lane ?? ''
  return LANE_TRUNK[lane] ?? 'base'
}

export type TrunkFill = {
  id: SkillTrunkId
  title: string
  hint: string
  lit: number
  total: number
  practiced: number
}

export function trunkFills(glow: Record<string, SkillGlow>, practiced: ReadonlySet<string>): TrunkFill[] {
  return SKILL_TRUNKS.map((trunk) => {
    const cards = SKILL_VIEWS.filter((item) => skillTrunkId(item.id) === trunk.id)
    return {
      id: trunk.id,
      title: trunk.title,
      hint: trunk.hint,
      lit: cards.filter((item) => glow[item.id] === 'lit').length,
      total: cards.length,
      practiced: cards.filter((item) => practiced.has(item.id)).length,
    }
  })
}

/** 这一项点亮之后，直接子项里已经可以开始的名字。 */
export function readyChildTitles(id: string, glow: Record<string, SkillGlow>): string[] {
  const titles = new Map(SKILL_VIEWS.map((item) => [item.id, item.title]))
  return LEARNING_SKILLS
    .filter((item) => item.allOf?.includes(id) && (glow[item.id] === 'ready' || glow[item.id] === 'research'))
    .map((item) => titles.get(item.id) ?? item.id)
}

/** 四枚称号。只读关卡是否交付，不改 gateCleared。 */
export const SKILL_MILESTONES = [
  { id: 'slice', gateId: 'g1', mark: '竖切', title: '写路径能讲清' },
  { id: 'ship', gateId: 'g3', mark: '交付', title: '能交付的全栈' },
  { id: 'see', gateId: 'g5', mark: '看见', title: '上线后能看见' },
  { id: 'arch', gateId: 'g6', mark: '架构', title: '有架构材料' },
] as const

export function clearedGateIds(doneIds: readonly string[], checks: readonly string[]) {
  const ids = new Set<string>()
  for (const gate of MASTERY_GATES) {
    if (gateCleared(gate, doneIds, checks)) ids.add(gate.id)
  }
  return ids
}

export function practicedIds(
  glow: Record<string, SkillGlow>,
  localOf: (id: string) => boolean,
  cleared: ReadonlySet<string>,
) {
  const ids = new Set<string>()
  for (const view of SKILL_VIEWS) {
    if (glow[view.id] !== 'lit') continue
    if (localOf(view.id) || (view.gateId !== undefined && cleared.has(view.gateId))) ids.add(view.id)
  }
  return ids
}

const ROAD_ORDER = ['browser', 'java', 'ai'] as const

function roadOf(scene: SkillSceneId) {
  const picked = SKILL_SCENES.find((item) => item.id === scene)
  if (!picked || !('steps' in picked)) return null
  return picked
}

function roadOpen(steps: readonly (readonly string[])[], glow: Record<string, SkillGlow>) {
  return steps.some((step) => step.some((id) => glow[id] !== 'lit'))
}

function roadBlocker(steps: readonly (readonly string[])[], glow: Record<string, SkillGlow>) {
  const titles = new Map(SKILL_VIEWS.map((item) => [item.id, item.title]))
  for (const step of steps) {
    const open = step.filter((id) => glow[id] !== 'lit')
    if (!open.length) continue
    const ready = open.some((id) => glow[id] === 'ready' || glow[id] === 'research')
    if (ready) return null
    const id = open[0] ?? ''
    const parent = (LEARNING_SKILLS.find((item) => item.id === id)?.allOf ?? []).find((item) => glow[item] !== 'lit')
    return {
      skill: titles.get(id) ?? id,
      parent: parent ? titles.get(parent) ?? parent : '',
    }
  }
  return null
}

/**
 * 全图只指出完成度最低的主干，不改场景。
 * 选定的路走完后，建议下一条仍有暗星的路。卡住时留在原地，并写出缺的前置。
 */
export function skillPathAdvice(
  scene: SkillSceneId,
  glow: Record<string, SkillGlow>,
): { scene: SkillSceneId; line: string } {
  if (scene === 'all') {
    const fills = trunkFills(glow, new Set()).filter((item) => item.total > 0)
    if (fills.every((item) => item.lit === 0)) {
      const current = SKILL_VIEWS.find((item) => glow[item.id] === 'research')
      return {
        scene: 'all',
        line: current
          ? `正在点亮「${current.title}」。还没有一项读完。全图仍按前置点亮。`
          : '八条主干都还没点亮。全图仍按前置点亮。',
      }
    }
    const open = fills.filter((item) => item.lit < item.total)
    open.sort((a, b) => a.lit / a.total - b.lit / b.total)
    const gap = open[0]
    return {
      scene: 'all',
      line: gap ? `完成度最低的是「${gap.title}」${gap.lit}/${gap.total}。全图仍按前置点亮。` : '八条主干都点亮了。',
    }
  }
  const road = roadOf(scene)
  if (!road) return { scene, line: '' }
  const blocked = roadBlocker(road.steps, glow)
  if (blocked) {
    const parent = blocked.parent ? `先点亮「${blocked.parent}」。` : ''
    return { scene, line: `「${road.title}」还走不到「${blocked.skill}」。${parent}课仍可打开。` }
  }
  if (!roadOpen(road.steps, glow)) {
    const nextId = ROAD_ORDER.find((id) => {
      const next = roadOf(id)
      return next ? roadOpen(next.steps, glow) : false
    })
    if (!nextId) return { scene, line: `「${road.title}」上能开始的都点亮了。` }
    const next = roadOf(nextId)
    return { scene: nextId, line: `「${road.title}」上能开始的都点亮了。下一条是「${next?.title ?? nextId}」。` }
  }
  return { scene, line: '' }
}
