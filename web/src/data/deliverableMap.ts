/** Frozen on 2026-10-13 from mastery gate output order. Do not renumber. */

export type FrozenDeliverable = {
  id: string
  gateId: string
  index: number
  legacyKey: string
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
