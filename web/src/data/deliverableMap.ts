/** Frozen on 2026-10-13 from mastery gate output order. Do not renumber. */

export type FrozenDeliverable = {
  id: string
  gateId: string
  index: number
  legacyKey: string
}

/** 步骤条上的短名。完整交付句仍在 outputs / objective。 */
export const DELIVERABLE_SHORT: Readonly<Record<string, string>> = {
  'g1.four-roles': '四段职责',
  'g1.write-path': '写路径',
  'g1.explain': '能讲清',
  'g2.runnable-write': '能跑的写路径',
  'g2.concurrency-test': '并发只成一笔',
  'g2.idempotent-retry': '同键不双写',
  'g2.json-errors': '失败是 JSON',
  'g2.versioned-schema': '版本化表结构',
  'g3.read-shape': '读路径形状',
  'g3.n-plus-one': 'N+1 前后',
  'g3.cache-race': '删缓存竞态',
  'g3.pagination': '列表分页',
  'g-auth.anonymous': '未登录拒绝',
  'g-auth.not-owner': '非拥有者拒绝',
  'g-auth.csrf': '跨站拒绝',
  'g-auth.cookie': '登录态存放',
  'g-test.invariant': '不变量测试',
  'g-test.contract': '契约测试',
  'g-test.browser': '浏览器路径',
  'g-test.object': '对象级授权测',
  'g-triage.symptom': '用户看见什么',
  'g-triage.database': '库里留下什么',
  'g-triage.correlation': '相关 id',
  'g-triage.excluded': '排除哪一层',
  'g-triage.remeasure': '改后怎么变',
  'g-triage.leave': '先不动的层',
  'g4.adr': '拆或不拆 ADR',
  'g4.outbox': 'Outbox 演示',
  'g4.outcome': '超时对用户',
  'g4.failure-handling': '死信与熔断',
  'g5.health': '健康检查',
  'g5.budget': '延迟预算',
  'g5.fault': '压测/注入',
  'g5.service': '连服务名',
  'g5.release': '发布与密钥',
  'g5.pipeline': '流水线',
  'g6.quality': '质量属性',
  'g6.review': '契约评审',
  'g6.roadmap': '只做一件事',
  'g6.decision': '决策记录',
}

export function deliverableShort(id: string, fallback: string) {
  return DELIVERABLE_SHORT[id] ?? fallback
}

const ROWS: readonly (readonly [gateId: string, id: string])[] = [
  ['g1', 'g1.four-roles'],
  ['g1', 'g1.write-path'],
  ['g1', 'g1.explain'],
  ['g2', 'g2.runnable-write'],
  ['g2', 'g2.concurrency-test'],
  ['g2', 'g2.idempotent-retry'],
  ['g2', 'g2.json-errors'],
  ['g2', 'g2.versioned-schema'],
  ['g3', 'g3.read-shape'],
  ['g3', 'g3.n-plus-one'],
  ['g3', 'g3.cache-race'],
  ['g3', 'g3.pagination'],
  ['g-auth', 'g-auth.anonymous'],
  ['g-auth', 'g-auth.not-owner'],
  ['g-auth', 'g-auth.csrf'],
  ['g-auth', 'g-auth.cookie'],
  ['g-test', 'g-test.invariant'],
  ['g-test', 'g-test.contract'],
  ['g-test', 'g-test.browser'],
  ['g-test', 'g-test.object'],
  ['g-triage', 'g-triage.symptom'],
  ['g-triage', 'g-triage.database'],
  ['g-triage', 'g-triage.correlation'],
  ['g-triage', 'g-triage.excluded'],
  ['g-triage', 'g-triage.remeasure'],
  ['g-triage', 'g-triage.leave'],
  ['g4', 'g4.adr'],
  ['g4', 'g4.outbox'],
  ['g4', 'g4.outcome'],
  ['g4', 'g4.failure-handling'],
  ['g5', 'g5.health'],
  ['g5', 'g5.budget'],
  ['g5', 'g5.fault'],
  ['g5', 'g5.service'],
  ['g5', 'g5.release'],
  ['g5', 'g5.pipeline'],
  ['g6', 'g6.quality'],
  ['g6', 'g6.review'],
  ['g6', 'g6.roadmap'],
  ['g6', 'g6.decision'],
]

const indexByGate = new Map<string, number>()

export const FROZEN_DELIVERABLES: readonly FrozenDeliverable[] = ROWS.map(([gateId, id]) => {
  const index = indexByGate.get(gateId) ?? 0
  indexByGate.set(gateId, index + 1)
  return { id, gateId, index, legacyKey: `${gateId}:${index}` }
})

const byLegacy = new Map(FROZEN_DELIVERABLES.map((row) => [row.legacyKey, row]))
const byId = new Map(FROZEN_DELIVERABLES.map((row) => [row.id, row]))

export const OUTPUT_ORDER_SHA256 = 'ddc1175216fea8eb658791e2e1dfb0bb52bfbf3b2bee244209d1695272aa1c17'

export function deliverableByLegacy(key: string) {
  return byLegacy.get(key)
}

export function deliverableById(id: string) {
  return byId.get(id)
}
