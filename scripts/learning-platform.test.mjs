import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { FROZEN_DELIVERABLES, OUTPUT_ORDER_SHA256 } from '../web/src/data/deliverableMap.ts'
import { pathSlots, requiredMet, skillSatisfied, supplementIds, validateLessons, validateSkills } from '../web/src/data/learningGraph.ts'
import { LEARNING_SKILLS } from '../web/src/data/learningSkills.ts'
import { MASTERY_GATES } from '../web/src/data/masteryGates.ts'
import {
  dualFrameworkEarned,
  emptyEnvelope,
  exportEnvelope,
  mergeEnvelopes,
  migrateProgress,
  previewImport,
  labFailureEvidence,
  rememberAttempt,
  rememberEvidence,
  applyQuestAction,
  rememberPause,
  resumeLearning,
  selfEvidenceForDraft,
  taskVerified,
  verifiedFromReading,
} from '../web/src/state/learningEvidence.ts'
import { gateFace, gateFaceLabel } from '../web/src/data/learningPaths.ts'
import { bossQuest, faceLabel, mainLanes, mergeQuestRecords, questDifficulty, questFace, questGraphIssues, questStars, questStatus, reduceQuests, sideQuests } from '../web/src/data/questBoard.ts'
import { adoptLearningDraft, mergeForWrite, normalizeProgress, readProgress, writeProgress } from '../web/src/state/progressStorage.ts'

const groups = () => ['全栈主线']

test('frozen deliverable ids match the current output order', () => {
  const live = MASTERY_GATES.flatMap((gate) => gate.outputs.map((_, index) => `${gate.id}:${index}`))
  assert.deepEqual(FROZEN_DELIVERABLES.map((row) => row.legacyKey), live)
  assert.equal(new Set(FROZEN_DELIVERABLES.map((row) => row.id)).size, FROZEN_DELIVERABLES.length)
  const hash = createHash('sha256').update(JSON.stringify(MASTERY_GATES.map((gate) => [gate.id, ...gate.outputs]))).digest('hex')
  assert.equal(hash, OUTPUT_ORDER_SHA256)
})

test('supplement does not block, and an alternative group is one slot', () => {
  const lessons = [
    { id: 'a', requirement: 'required' },
    { id: 'b', requirement: 'supplement' },
    { id: 'c', alternativeGroup: 'mq' },
    { id: 'd', alternativeGroup: 'mq' },
  ]
  assert.deepEqual(supplementIds(lessons), ['b'])
  assert.equal(requiredMet(lessons, new Set(['a', 'c'])), true)
  assert.equal(requiredMet(lessons, new Set(['a'])), false)
  const gate = MASTERY_GATES.find((item) => item.id === 'g-triage')
  assert.ok(gate)
  assert.equal(pathSlots(gate.lessons, true).some((slot) => slot.includes('web-vitals')), false)
  assert.equal(pathSlots(gate.lessons, false).some((slot) => slot.includes('web-vitals')), true)
  const split = MASTERY_GATES.find((item) => item.id === 'g4')
  const pair = pathSlots(split.lessons).find((slot) => slot.includes('mq-consume-idempotent-key'))
  assert.deepEqual(pair, ['mq-consume-idempotent-key', 'message-delivery'])
})

test('graph rejects duplicates, empty groups, dangling refs, and cycles', () => {
  assert.ok(validateLessons([{ id: 'a' }, { id: 'a' }]).some((issue) => issue.kind === 'duplicate-id'))
  assert.ok(validateLessons([{ id: 'a', alternativeGroup: '' }]).some((issue) => issue.kind === 'empty-group'))
  assert.ok(validateLessons([{ id: 'missing' }], new Set(['known'])).some((issue) => issue.kind === 'dangling'))
  const skills = [
    { id: 'a', allOf: ['b'] },
    { id: 'b', allOf: ['a'] },
    { id: 'c', anyOf: [] },
    { id: 'd', allOf: ['gone'] },
  ]
  const issues = validateSkills(skills)
  assert.ok(issues.some((issue) => issue.kind === 'cycle'))
  assert.ok(issues.some((issue) => issue.kind === 'empty-group'))
  assert.ok(issues.some((issue) => issue.kind === 'dangling'))
  assert.equal(validateSkills(LEARNING_SKILLS).length, 0)
  assert.equal(skillSatisfied(LEARNING_SKILLS[5], new Set(['R01']), LEARNING_SKILLS), false)
  assert.equal(skillSatisfied(LEARNING_SKILLS[5], new Set(['R01', 'V01']), LEARNING_SKILLS), true)
})

test('old checks become self-assessments and reading does not verify', () => {
  const raw = { done: ['fs-four-layers'], notes: { 'fs-four-layers': '记了一笔' }, recent: ['fs-four-layers'], pathChecks: ['g2:0', 'nope:9'], revision: 3 }
  const first = migrateProgress(raw)
  assert.deepEqual(first.envelope.done, ['fs-four-layers'])
  assert.equal(first.envelope.notes['fs-four-layers'], '记了一笔')
  assert.deepEqual(first.envelope.selfChecks, [{ deliverableId: 'g2.runnable-write', legacyKey: 'g2:0', source: 'self' }])
  assert.deepEqual(first.envelope.unresolvedLegacy, ['nope:9'])
  assert.equal(first.envelope.evidence.length, 0)
  assert.deepEqual(verifiedFromReading(first.envelope.done.length), [])
  const second = migrateProgress({ schemaVersion: 2, ...first.envelope })
  assert.deepEqual(second.envelope.selfChecks, first.envelope.selfChecks)
  assert.equal(second.readonly, false)
})

test('corrupt and future records stay readable without being rewritten as empty success', () => {
  const corrupt = migrateProgress('not-json')
  assert.match(corrupt.issue, /格式异常/)
  assert.equal(corrupt.backup, 'not-json')
  const future = migrateProgress({ schemaVersion: 9, done: ['keep-me'] })
  assert.equal(future.readonly, true)
  assert.match(future.issue, /只可阅读/)
  assert.deepEqual(future.backup, { schemaVersion: 9, done: ['keep-me'] })
})

test('a deleted attempt is not restored by another tab or an import', () => {
  const base = emptyEnvelope()
  const saved = rememberAttempt(base, { id: 'a1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '第一份' }).envelope
  const other = rememberAttempt(base, { id: 'b1', taskId: 'g2.concurrency-note', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '另一件' }).envelope
  const merged = mergeEnvelopes(saved, other)
  assert.deepEqual(merged.attempts.map((item) => item.id).sort(), ['a1', 'b1'])
  const revoked = { ...saved, attempts: saved.attempts.map((item) => ({ ...item, deleted: true })) }
  const stale = { ...saved, attempts: [{ ...saved.attempts[0], draft: '旧稿复活', deleted: false }] }
  const kept = mergeEnvelopes(stale, revoked)
  assert.equal(kept.attempts.find((item) => item.id === 'a1')?.deleted, true)
  const preview = previewImport({ schemaVersion: 2, ...stale }, revoked)
  assert.ok(preview.conflicts.includes('a1'))
})

test('secret-looking export and import stop, and only both frameworks earn the mark', () => {
  const envelope = rememberAttempt(emptyEnvelope(), {
    id: 'a1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: 'password = hunter2',
  }).envelope
  assert.equal(exportEnvelope(envelope).ok, false)
  const preview = previewImport({ schemaVersion: 2, attempts: [], evidence: [], selfChecks: [], notes: { x: 'token: abc' } }, emptyEnvelope())
  assert.equal(preview.ok, false)
  assert.equal(dualFrameworkEarned(new Set(['R01'])), false)
  assert.equal(dualFrameworkEarned(new Set(['R01', 'V01'])), true)
})

test('progress merge keeps a deleted draft, and a future record is not rewritten', () => {
  const base = normalizeProgress({ revision: 4 }, groups)
  const saved = rememberAttempt(base.learning, {
    id: 'a1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '第一份',
  }).envelope
  const remote = normalizeProgress({
    revision: 5,
    learning: { ...saved, attempts: saved.attempts.map((item) => ({ ...item, deleted: true })) },
  }, groups)
  const local = normalizeProgress({ revision: 4, learning: saved }, groups)
  const merged = mergeForWrite(local, remote, base)
  assert.equal(merged.learning.attempts.find((item) => item.id === 'a1')?.deleted, true)
  const edited = rememberAttempt(saved, {
    id: 'a1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '改过的草稿',
  }).envelope
  const again = mergeForWrite(
    normalizeProgress({ revision: 4, learning: edited }, groups),
    normalizeProgress({ revision: 4, learning: saved }, groups),
    normalizeProgress({ revision: 4, learning: saved }, groups),
  )
  assert.equal(again.learning.attempts.find((item) => item.id === 'a1')?.draft, '改过的草稿')

  const future = { schemaVersion: 9, marker: 'keep-me' }
  const readonly = normalizeProgress({ learning: future, notes: { a: '笔记' } }, groups)
  assert.equal(readonly.learningReadonly, true)
  const store = new Map()
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: { getItem: (key) => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) },
    })
    const changed = { ...readonly, notes: { a: '改过' } }
    assert.equal(writeProgress('progress', changed), '')
    const written = JSON.parse(store.get('progress'))
    assert.equal(written.learning.schemaVersion, 9)
    assert.equal(written.learning.marker, 'keep-me')
    assert.equal(written.learningHeld, undefined)
    assert.equal(written.notes.a, '改过')
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor)
    else delete globalThis.localStorage
  }
})

test('the first read of an old progress file keeps one backup and maps old checks', () => {
  const raw = JSON.stringify({ version: 1, pathChecks: ['g2:0'], notes: { a: '旧' }, revision: 1 })
  const store = new Map([['progress', raw]])
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: { getItem: (key) => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) },
    })
    const loaded = readProgress('progress', groups)
    assert.equal(store.get('progress.learning-backup'), raw)
    assert.equal(loaded.state.learning.selfChecks[0]?.deliverableId, 'g2.runnable-write')
    assert.equal(loaded.state.notes.a, '旧')
    store.set('progress', JSON.stringify({ version: 1, pathChecks: ['g1:0'], revision: 2 }))
    readProgress('progress', groups)
    assert.equal(store.get('progress.learning-backup'), raw)
    const adopted = adoptLearningDraft(normalizeProgress({}, groups), JSON.stringify({
      schemaVersion: 2,
      selfChecks: [],
      attempts: [{ id: 'a1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '另存' }],
      evidence: [],
    }))
    assert.equal(adopted.learning.attempts[0]?.draft, '另存')
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor)
    else delete globalThis.localStorage
  }
})

test('a self-report stays pending, and reading does not create a pass', () => {
  assert.deepEqual(verifiedFromReading(1063), [])
  const migrated = migrateProgress({ pathChecks: ['g1:0'], done: ['one', 'two', 'three'] })
  assert.equal(migrated.envelope.evidence.length, 0)
  assert.equal(migrated.envelope.selfChecks[0]?.source, 'self')
  const attempt = { id: 'g1.write-path@1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '四段职责' }
  const claimed = rememberEvidence(emptyEnvelope(), {
    ...selfEvidenceForDraft(attempt, 3),
    verification: 'passed',
    source: 'self',
  }).envelope
  const stored = claimed.evidence[0]
  assert.equal(stored.verification, 'pending')
  assert.equal(stored.score?.value, 3)
  assert.equal(stored.score?.source, 'self')
  assert.equal(taskVerified(claimed.evidence, 'g1.write-path'), false)
  const localPass = rememberEvidence(emptyEnvelope(), {
    id: 'lab-1', attemptId: 'g2.concurrency-note@1', taskId: 'g2.concurrency-note', taskVersion: 1,
    kind: 'local-check', verification: 'passed', source: 'local', summary: '本地测试通过',
  }).envelope
  assert.equal(taskVerified(localPass.evidence, 'g2.concurrency-note'), true)
  const tooHigh = rememberEvidence(emptyEnvelope(), { ...selfEvidenceForDraft(attempt, 9) }).envelope
  assert.equal(tooHigh.evidence[0]?.score, undefined)
})

test('a recorded lab failure stays pending, and retry keeps it', () => {
  const attempt = {
    id: 'g2.concurrency-note@1',
    taskId: 'g2.concurrency-note',
    taskVersion: 1,
    status: 'failed',
    hintLevel: 0,
    draft: '看到两笔订单',
  }
  const check = { id: 'twentyBuyersLeaveOneOrderAndZeroStock', next: '核对版本条件。' }
  const recorded = rememberEvidence(
    rememberAttempt(emptyEnvelope(), attempt).envelope,
    labFailureEvidence(attempt, check),
  ).envelope
  assert.equal(recorded.evidence[0]?.verification, 'pending')
  assert.match(recorded.evidence[0]?.summary ?? '', /twentyBuyersLeaveOneOrderAndZeroStock/)
  assert.equal(taskVerified(recorded.evidence, 'g2.concurrency-note'), false)
  const forged = rememberEvidence(emptyEnvelope(), {
    ...labFailureEvidence(attempt, check),
    verification: 'passed',
    source: 'self',
  }).envelope
  assert.equal(forged.evidence[0]?.verification, 'pending')
  const retry = rememberAttempt(recorded, {
    id: 'g2.concurrency-note@1#2',
    taskId: 'g2.concurrency-note',
    taskVersion: 1,
    status: 'started',
    hintLevel: 0,
    draft: '',
  }).envelope
  assert.equal(retry.attempts.length, 2)
  assert.equal(retry.evidence.length, 1)

  const started = rememberAttempt(emptyEnvelope(), { ...attempt, status: 'started' }).envelope
  const failed = rememberAttempt(started, attempt).envelope
  const base = normalizeProgress({ revision: 4, learning: started }, groups)
  const merged = mergeForWrite(
    normalizeProgress({ revision: 4, learning: failed }, groups),
    normalizeProgress({ revision: 4, learning: started }, groups),
    base,
  )
  assert.equal(merged.learning.attempts.find((item) => item.id === attempt.id)?.status, 'failed')
  assert.equal(merged.learning.attempts.find((item) => item.id === attempt.id)?.draft, '看到两笔订单')
})

test('pause keeps the draft and evidence, and an unknown pause is dropped', () => {
  const attempt = { id: 'a1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '还在' }
  const drafted = rememberAttempt(emptyEnvelope(), attempt).envelope
  const recorded = rememberEvidence(drafted, selfEvidenceForDraft(attempt, 2)).envelope
  const paused = rememberPause(recorded, 'week').envelope
  assert.equal(paused.pause?.choice, 'week')
  assert.equal(paused.attempts[0]?.draft, '还在')
  assert.equal(paused.evidence[0]?.verification, 'pending')
  const resumed = resumeLearning(paused).envelope
  assert.equal(resumed.pause, null)
  assert.equal(resumed.attempts[0]?.draft, '还在')
  assert.equal(resumed.evidence.length, 1)
  const bogus = migrateProgress({ schemaVersion: 2, selfChecks: [], pause: { choice: 'year', since: 'x' } })
  assert.equal(bogus.envelope.pause, null)
})

test('sub levels unlock in order, and rewards are granted once', () => {
  assert.deepEqual(questGraphIssues(), [])
  const lanes = mainLanes()
  assert.equal(lanes.flatMap((lane) => lane.subs).length, FROZEN_DELIVERABLES.length)
  assert.equal(sideQuests().length, 4)
  const first = lanes[0].subs[0]
  const second = lanes[0].subs[1]
  const nextGate = lanes[1].subs[0]
  assert.equal(questStatus(first, []), 'available')
  assert.equal(questStatus(second, []), 'locked')
  assert.equal(questStatus(nextGate, []), 'locked')
  assert.equal(reduceQuests([], { type: 'advance', id: second.id, mark: '太早' }).ok, false)
  const cleared = reduceQuests([], { type: 'advance', id: first.id, mark: '四段已经分开' })
  assert.equal(cleared.ok, true)
  assert.equal(cleared.records[0]?.status, 'cleared')
  assert.equal(cleared.records[0]?.rewardIds.length, 1)
  assert.equal(questStatus(second, cleared.records), 'available')
  assert.equal(questStatus(nextGate, cleared.records), 'locked')
  const again = reduceQuests(cleared.records, { type: 'advance', id: first.id, mark: '再记一次' })
  assert.deepEqual(again.granted, [])
  assert.equal(again.changed, false)
  assert.equal(again.records[0]?.rewardIds.length, 1)
  const saved = applyQuestAction(emptyEnvelope(), { type: 'advance', id: first.id, mark: '四段已经分开' })
  assert.equal(saved.envelope.evidence.length, 0)
  assert.equal(saved.envelope.revision, 1)
  const quiet = applyQuestAction(saved.envelope, { type: 'advance', id: first.id, mark: '再记一次' })
  assert.equal(quiet.envelope.revision, 1)
})

test('side quests stay open beside the main line and can advance together', () => {
  const [fe, cloud] = sideQuests()
  assert.equal(questStatus(fe, []), 'available')
  assert.equal(questStatus(cloud, []), 'available')
  assert.equal(fe.unlock.length, 0)
  const one = reduceQuests([], { type: 'advance', id: fe.id, mark: '类型收窄看过' })
  const two = reduceQuests(one.records, { type: 'advance', id: cloud.id, mark: '入口转发看过' })
  assert.equal(two.records.find((item) => item.id === fe.id)?.status, 'active')
  assert.equal(two.records.find((item) => item.id === cloud.id)?.status, 'active')
  const firstSub = mainLanes()[0].subs[1]
  assert.equal(questStatus(firstSub, two.records), 'locked')
  const boss = bossQuest()
  const withDraft = {
    ...emptyEnvelope(),
    attempts: [{ id: 'g1.write-path@1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '四段职责' }],
    quests: two.records,
  }
  const blocked = applyQuestAction(withDraft, { type: 'advance', id: boss.id, mark: '' })
  assert.equal(blocked.ok, false)
  assert.equal(blocked.envelope.quests.length, 2)
  const bossStep = applyQuestAction(withDraft, { type: 'advance', id: boss.id, mark: '入门档写完' })
  assert.equal(bossStep.ok, true)
  assert.equal(bossStep.granted.length, 1)
  assert.equal(bossStep.envelope.quests.length, 3)
  const skipped = applyQuestAction(bossStep.envelope, { type: 'advance', id: boss.id, mark: '还没保存加压档' })
  assert.equal(skipped.ok, false)
  assert.equal(skipped.envelope.quests.find((item) => item.id === boss.id)?.step, 1)
})

test('parallel quest lines merge by id and a boss clear is richer than one sub level', () => {
  const fe = sideQuests()[0]
  const boss = bossQuest()
  const sideOnly = reduceQuests([], { type: 'advance', id: fe.id, mark: '支线第一步' }).records
  let bossRecords = []
  const tasks = [
    ['g1.write-path', '入门'],
    ['g2.concurrency-note', '加压'],
    ['g2.idempotent-retry', '收口'],
  ]
  for (const [taskId, mark] of tasks) {
    const next = reduceQuests(bossRecords, { type: 'advance', id: boss.id, mark }, [{ taskId, draft: '已保存', deleted: false }])
    assert.equal(next.ok, true, next.issue)
    bossRecords = next.records
  }
  const bossRow = bossRecords.find((item) => item.id === boss.id)
  assert.equal(bossRow?.status, 'cleared')
  assert.equal(bossRow?.rewardIds.length, 4)
  const subRewardCount = mainLanes()[0].subs[0].rewards.length
  assert.ok(bossRow.rewardIds.length > subRewardCount)
  const merged = mergeQuestRecords(sideOnly, bossRecords)
  assert.equal(merged.find((item) => item.id === fe.id)?.step, 1)
  assert.equal(merged.find((item) => item.id === boss.id)?.rewardIds.length, 4)
  const remote = { ...emptyEnvelope(), quests: sideOnly, revision: 2 }
  const local = { ...emptyEnvelope(), quests: bossRecords, revision: 2 }
  const envelope = mergeEnvelopes(local, remote)
  assert.equal(envelope.quests.length, 2)
  const base = normalizeProgress({ revision: 1, learning: emptyEnvelope() }, groups)
  const written = mergeForWrite(
    normalizeProgress({ revision: 1, learning: local }, groups),
    normalizeProgress({ revision: 1, learning: remote }, groups),
    base,
  )
  assert.equal(written.learning.quests.length, 2)
  const stale = mergeQuestRecords(
    [{ ...bossRow, step: 1, status: 'active', rewardIds: bossRow.rewardIds.slice(0, 1) }],
    [bossRow],
  )
  assert.equal(stale[0]?.step, 3)
  assert.equal(stale[0]?.rewardIds.length, 4)
})

test('stars, difficulty, and faces stay distinct from a plain clear', () => {
  const lane = mainLanes()[0]
  const [first, second, third] = lane.subs
  assert.equal(questDifficulty(first, 0, 3), '入门')
  assert.equal(questDifficulty(second, 1, 3), '标准')
  assert.equal(questDifficulty(third, 2, 3), '加压')
  assert.equal(questDifficulty(sideQuests()[0], 0, 1), '选修')
  assert.equal(questDifficulty(bossQuest(), 0, 1), '挑战')
  assert.equal(questStars(first, []), 0)
  assert.equal(questFace(first, []), 'available')
  assert.equal(faceLabel('starred'), '三星通关')
  const short = reduceQuests([], { type: 'advance', id: first.id, mark: '短' })
  assert.equal(questStars(first, short.records), 2)
  assert.equal(questFace(first, short.records), 'cleared')
  assert.equal(faceLabel(questFace(first, short.records)), '已通关')
  const long = reduceQuests([], { type: 'advance', id: first.id, mark: '按钮和契约已经分开' })
  assert.equal(questStars(first, long.records), 3)
  assert.equal(questFace(first, long.records), 'starred')
  assert.equal(questFace(second, long.records), 'available')
  assert.equal(questStars(second, long.records), 0)
})

test('a later gate stays openable, and its label is not a lock', () => {
  assert.equal(gateFace(0, 2, true), 'cleared')
  assert.equal(gateFaceLabel('cleared'), '已过')
  assert.equal(gateFace(2, 2, false), 'live')
  assert.equal(gateFaceLabel('live'), '进行中')
  assert.equal(gateFace(4, 2, false), 'ahead')
  assert.equal(gateFaceLabel('ahead'), '未到')
  assert.equal(gateFace(1, 2, false), 'resume')
  assert.equal(gateFaceLabel('resume'), '可补')
})
