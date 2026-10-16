import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { FROZEN_DELIVERABLES, OUTPUT_ORDER_SHA256 } from '../web/src/data/deliverableMap.ts'
import { pathSlots, requiredMet, skillSatisfied, supplementIds, validateLessons, validateSkills } from '../web/src/data/learningGraph.ts'
import { AI_NOTES } from '../web/src/data/aiCatalog.ts'
import { LEARNING_SKILLS, SKILL_LANES, SKILL_LESSONS, SKILL_VIEWS, skillBoardState, skillFocusId, skillGlows, skillGroupFold, skillHasLocalCheck, skillLaneFolds, skillLessonIds, skillOpenIds, skillProgress, skillReturnId, skillReturnState, skillReturnTo, skillTitleHit } from '../web/src/data/learningSkills.ts'
import { SKILL_MILESTONES, SKILL_TRUNKS, clearedGateIds, practicedIds, readyChildTitles, skillPathAdvice, skillRank, skillTrunkId, trunkFills } from '../web/src/data/skillCycle.ts'
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
import { campScene, campShowsChrome, encounterAction, encounterPhase, encounterPhaseLabel, gateCleared, gateFace, gateFaceLabel, gatePath, missingOutput, PATHS, sceneExitPath, sceneSentence, settleLine, spineNextId } from '../web/src/data/learningPaths.ts'
import { abilityGoal, gateAdvise, gateEdition, gateVerifyFill, nextVerifyId, passFlashLine, verifyFace, verifyFaceLabel, verifyItemsForGate, verifyTier } from '../web/src/data/gateVerify.ts'
import { ORDER_SCALE_EXAMS, ORDER_SCALE_GATE, ORDER_SCALE_RUBRIC } from '../web/src/data/orderScaleGate.ts'
import { openSideLessonIds } from '../web/src/data/sideTracks.ts'
import { bossQuest, faceLabel, mainLanes, mergeQuestRecords, questDifficulty, questFace, questGraphIssues, questStars, questStatus, reduceQuests, sideQuests } from '../web/src/data/questBoard.ts'
import { adoptLearningDraft, mergeForWrite, normalizeProgress, readProgress, writeProgress } from '../web/src/state/progressStorage.ts'

const groups = () => ['全栈主线']

test('order-scale exam stays off the nine-gate spine', () => {
  assert.equal(MASTERY_GATES.some((gate) => gate.id === ORDER_SCALE_GATE.id), false)
  assert.equal(PATHS.architect.gates.some((gate) => gate.id === ORDER_SCALE_GATE.id), false)
  assert.equal(ORDER_SCALE_EXAMS.length, 6)
  assert.equal(ORDER_SCALE_EXAMS.reduce((sum, exam) => sum + exam.parts.reduce((partSum, part) => partSum + part.points, 0), 0), ORDER_SCALE_RUBRIC.total)
  assert.deepEqual(ORDER_SCALE_EXAMS.map((exam) => exam.code), ['OS-W1', 'OS-W2', 'OS-W3', 'OS-W4', 'OS-W5', 'OS-W6'])
  for (const exam of ORDER_SCALE_EXAMS) assert.equal(verifyTier('exam', exam.code), 'base')
  assert.equal(verifyTier('exam', 'G3-W2'), 'advanced')
  const items = verifyItemsForGate(ORDER_SCALE_GATE.id)
  assert.equal(items.length, 6)
  assert.equal(items.every((item) => item.tier === 'base'), true)
  assert.equal(gateVerifyFill(ORDER_SCALE_GATE.id, [], []).total, 6)
  assert.equal(ORDER_SCALE_EXAMS.every((exam) => (exam.answer ?? '').length > 80), true)
  assert.equal(ORDER_SCALE_EXAMS.filter((exam) => exam.diagram === 'exam/order-scale-architecture.svg').length, 3)
  assert.equal(ORDER_SCALE_EXAMS.filter((exam) => exam.diagram === 'exam/order-scale-sql.svg').length, 3)
  const joinExam = ORDER_SCALE_EXAMS.find((exam) => exam.code === 'OS-W3')
  assert.equal(joinExam.version, 3)
  assert.doesNotMatch(joinExam.question, /o\.user_id = \?/)
  assert.match(joinExam.question, /u\.level = '500'/)
  assert.match(joinExam.answer, /idx_status_created/)
  assert.match(joinExam.answer, /id 紧跟 created_at/)
  assert.match(joinExam.answer, /STRAIGHT_JOIN/)
  assert.match(joinExam.answer, /UNION ALL/)
})

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
  const dual = LEARNING_SKILLS.find((item) => item.id === 'dual-framework')
  assert.ok(dual)
  assert.equal(skillSatisfied(dual, new Set(['R01']), LEARNING_SKILLS), false)
  assert.equal(skillSatisfied(dual, new Set(['R01', 'V01']), LEARNING_SKILLS), true)
  const present = () => true
  const data = skillProgress(skillLessonIds('D01'), new Set(['mysql-mvcc']), present)
  assert.equal(data.total, skillLessonIds('D01').length)
  assert.ok(data.total >= 10)
  assert.equal(data.read, 1)
  assert.equal(data.nextId, 'mysql-what-and-when')
  const finished = skillProgress(skillLessonIds('D01'), new Set(skillLessonIds('D01')), present)
  assert.equal(finished.nextId, 'mysql-what-and-when')
  assert.equal(skillProgress(['missing-lesson'], new Set(), () => false).total, 0)
  assert.equal(skillOpenIds('dual-framework')[0], 'react-what-it-is')
  assert.ok(skillLessonIds('js').length >= 8)
  assert.ok(skillLessonIds('R01').length >= 8)
  assert.ok(skillLessonIds('spring').length >= 8)
  assert.equal(SKILL_VIEWS.length, 88)
  assert.equal(skillLaneFolds('前端'), true)
  assert.equal(skillLaneFolds('中间件'), true)
  assert.equal(skillLaneFolds('Java'), true)
  assert.equal(skillLaneFolds('AI'), true)
  assert.equal(skillLaneFolds('架构'), false)
  assert.equal(skillGroupFold('前端', ['R01', 'query'], 'html', '', '', undefined, ['React', '服务端状态']), 'shut')
  assert.equal(skillGroupFold('前端', ['html'], 'html', '', '', undefined, ['HTML']), 'open')
  assert.equal(skillGroupFold('Java', ['spring'], 'html', '', '', undefined, ['Spring']), 'shut')
  assert.equal(skillGroupFold('Java', ['spring'], 'spring', '', '', undefined, ['Spring']), 'open')
  assert.equal(skillGroupFold('架构', ['ddd'], 'html', '', '', undefined, ['聚合边界']), 'open')
  assert.equal(skillGroupFold('前端', ['R01'], 'html', 'R01', '', false, ['React']), 'open')
  assert.equal(skillGroupFold('前端', ['R01'], 'html', '', '', true, ['React']), 'open')
  assert.equal(skillGroupFold('前端', ['V01'], 'html', '', 'vue', undefined, ['Vue']), 'open')
  assert.equal(skillGroupFold('前端', ['R01'], 'html', '', 'vue', undefined, ['React']), 'hide')
  assert.equal(skillTitleHit('LoRA', 'lora'), true)
  assert.equal(skillTitleHit('Redis', '  '), true)
  assert.equal(skillTitleHit('Kubernetes', 'k8s'), true)
  assert.equal(skillTitleHit('Kubernetes', 'k'), false)
  assert.equal(skillTitleHit('持续集成', 'ci'), true)
  assert.equal(skillTitleHit('消息队列', 'mq'), true)
  assert.equal(skillTitleHit('PostgreSQL', 'pg'), true)
  assert.equal(SKILL_LANES[0], '计算机基础')
  assert.equal(SKILL_LANES.at(-1), '架构')
  assert.equal(SKILL_LANES.at(-2), 'AI')
  assert.ok(SKILL_VIEWS.every((item) => item.group))
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'java')?.lane, 'Java')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'redis')?.lane, '中间件')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'tcp')?.lane, '计算机基础')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'spring')?.group, 'Spring 生态')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'R01')?.group, 'React')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'query')?.group, 'React')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'V01')?.group, 'Vue')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'pinia')?.group, 'Vue')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'ng')?.group, 'Angular')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'ssr')?.group, '构建与渲染')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'node')?.group, '服务端 JS')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'sentinel')?.lane, '分布式与高并发')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'sentinel')?.group, '容量与防护')
  assert.ok(SKILL_VIEWS.findIndex((item) => item.id === 'netty') < SKILL_VIEWS.findIndex((item) => item.id === 'spring'))
  assert.ok(!SKILL_VIEWS.some((item) => item.group === '其他'))
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'ai-rag')?.group, '模型机制')
  const lessonIds = new Set(JSON.parse(readFileSync(new URL('../web/src/data/curriculum-index.json', import.meta.url), 'utf8')).lessons.map((item) => item.id))
  const aiKeys = new Set(AI_NOTES.map((note) => `ai:${note.key}`))
  for (const id of Object.values(SKILL_LESSONS).flat()) {
    if (String(id).startsWith('ai:')) assert.ok(aiKeys.has(id), id)
    else assert.ok(lessonIds.has(id), id)
  }
  for (const view of SKILL_VIEWS) assert.ok(LEARNING_SKILLS.some((item) => item.id === view.id), view.id)
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'dual-framework')?.bridge, true)
  const parentsOf = (id) => LEARNING_SKILLS.find((item) => item.id === id)?.allOf ?? []
  const glowOf = (done) => skillGlows(
    SKILL_VIEWS.map((item) => item.id),
    parentsOf,
    (id) => skillProgress(skillLessonIds(id), done, present),
  )
  const partial = glowOf(new Set(['mysql-mvcc']))
  assert.equal(partial.glow.D01, 'dim')
  assert.equal(partial.glow.tcp, 'research')
  assert.equal(partial.activeId, 'tcp')
  assert.equal(partial.glow.redis, 'ready')
  assert.equal(partial.glow.k8s, 'dim')
  assert.equal(partial.glow.js, 'dim')
  assert.equal(partial.glow.html, 'ready')
  const mysqlDone = glowOf(new Set([...skillLessonIds('sql'), ...skillLessonIds('D01')]))
  assert.equal(mysqlDone.glow.D01, 'lit')
  assert.equal(mysqlDone.glow.redis, 'ready')
  assert.deepEqual(LEARNING_SKILLS.find((item) => item.id === 'ci')?.allOf, ['git', 'test'])
  assert.deepEqual(LEARNING_SKILLS.find((item) => item.id === 'ddd')?.allOf, ['dist'])
  assert.deepEqual(LEARNING_SKILLS.find((item) => item.id === 'secrets')?.allOf, ['S01'])
  assert.equal(LEARNING_SKILLS.find((item) => item.id === 'redis')?.allOf, undefined)
  const both = glowOf(new Set([
    ...skillLessonIds('html'),
    ...skillLessonIds('js'),
    ...skillLessonIds('R01'),
    ...skillLessonIds('V01'),
  ]))
  assert.equal(both.glow['dual-framework'], 'lit')
  const aiLit = glowOf(new Set(skillLessonIds('ai-prompt')))
  assert.equal(aiLit.glow['ai-prompt'], 'lit')
  assert.equal(aiLit.glow['ai-llm'], 'ready')
  assert.equal(aiLit.glow['ai-agent'], 'dim')
  const none = new Set()
  const browser = skillBoardState(none, present, 'browser')
  assert.equal(browser.activeId, 'html')
  assert.equal(browser.glow.tcp, 'ready')
  assert.equal(browser.glow.redis, 'ready')
  const javaScene = skillBoardState(new Set([...skillLessonIds('java'), ...skillLessonIds('spring'), 'redis-what']), present, 'java')
  assert.equal(javaScene.activeId, 'sql')
  assert.equal(javaScene.glow.redis, 'ready')
  const aiScene = skillBoardState(new Set([...skillLessonIds('ai-prompt'), ...skillLessonIds('ai-llm')]), present, 'ai')
  assert.equal(aiScene.activeId, 'ai-agent')
  assert.equal(aiScene.glow['ai-rag'], 'dim')
  assert.equal(aiScene.glow['ai-transformer'], 'ready')
  assert.equal(aiScene.glow['ai-lora'], 'dim')
  assert.equal(aiScene.glow['ai-serving'], 'ready')
  assert.deepEqual(LEARNING_SKILLS.find((item) => item.id === 'ai-lora')?.allOf, ['ai-transformer'])
  assert.deepEqual(LEARNING_SKILLS.find((item) => item.id === 'ai-serving')?.allOf, ['ai-llm'])
  const served = skillBoardState(new Set([
    ...skillLessonIds('ai-prompt'),
    ...skillLessonIds('ai-llm'),
    ...skillLessonIds('ai-agent'),
    ...skillLessonIds('ai-guard'),
  ]), present, 'ai')
  assert.equal(served.activeId, 'ai-serving')
  assert.equal(served.glow['ai-lora'], 'dim')
  assert.equal(skillBoardState(none, present, 'all').activeId, 'tcp')
  assert.equal(skillReturnTo('redis'), '/skills?skill=redis')
  assert.equal(skillReturnId({ skillReturn: 'redis' }), 'redis')
  assert.equal(skillReturnId({ skillReturn: 'missing' }), '')
  assert.equal(skillFocusId('html'), 'html')
  assert.deepEqual(skillReturnState({ skillReturn: 'redis' }), { skillReturn: 'redis' })
  assert.equal(skillReturnState({}), undefined)
  const passed = {
    id: 'e1',
    attemptId: 'a1',
    taskId: 'g2.concurrency-note',
    taskVersion: 1,
    kind: 'local-check',
    verification: 'passed',
    source: 'local',
    summary: '本地检查通过。',
  }
  assert.equal(skillHasLocalCheck('J02', [passed]), true)
  assert.equal(skillHasLocalCheck('D01', [passed]), true)
  assert.equal(skillHasLocalCheck('S01', [passed]), false)
  assert.equal(skillHasLocalCheck('R01', [passed]), false)
  assert.equal(skillHasLocalCheck('J02', [{ ...passed, kind: 'self', verification: 'pending', source: 'self' }]), false)
  const baseExam = { ...passed, id: 'e2', taskId: 'g2.written-oversell' }
  assert.equal(skillHasLocalCheck('D01', [baseExam]), true)
  assert.equal(skillHasLocalCheck('J02', [baseExam]), true)
  const advancedExam = { ...passed, id: 'e3', taskId: 'g3.written-stale-cache' }
  assert.equal(skillHasLocalCheck('redis', [advancedExam]), false)
  const idemPass = { ...passed, id: 'e4', taskId: 'g2.idempotent-retry' }
  assert.equal(skillHasLocalCheck('idem', [idemPass]), true)
  const g2 = MASTERY_GATES.find((item) => item.id === 'g2')
  assert.ok(g2)
  assert.equal(gateCleared(g2, skillLessonIds('D01'), []), false)
})

test('skill cycle rolls trunks up without moving lanes or locking lessons', () => {
  const seen = new Map()
  for (const view of SKILL_VIEWS) {
    const trunk = skillTrunkId(view.id)
    assert.ok(SKILL_TRUNKS.some((item) => item.id === trunk), view.id)
    seen.set(view.id, trunk)
  }
  assert.equal(seen.size, SKILL_VIEWS.length)
  const dim = Object.fromEntries(SKILL_VIEWS.map((item) => [item.id, 'dim']))
  const fills = trunkFills(dim, new Set())
  assert.equal(fills.reduce((sum, item) => sum + item.total, 0), SKILL_VIEWS.length)
  assert.equal(skillTrunkId('docker'), 'devops')
  assert.equal(skillTrunkId('k8s'), 'devops')
  assert.equal(skillTrunkId('ci'), 'devops')
  assert.equal(skillTrunkId('nginx'), 'ops')
  assert.equal(skillTrunkId('otel'), 'ops')
  assert.equal(skillTrunkId('S01'), 'ops')
  assert.equal(skillTrunkId('D01'), 'db')
  assert.equal(skillTrunkId('R01'), 'fe')
  assert.equal(skillTrunkId('dual-framework'), 'fe')
  assert.equal(skillTrunkId('spring'), 'be')
  assert.equal(skillTrunkId('redis'), 'be')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'nginx')?.lane, '中间件')
  assert.equal(SKILL_VIEWS.find((item) => item.id === 'docker')?.lane, '工程与运维')
  for (const view of SKILL_VIEWS) {
    if (view.bridge) {
      assert.equal(skillLessonIds(view.id).length, 0)
      assert.ok(skillOpenIds(view.id).length > 0)
    } else {
      assert.ok(skillLessonIds(view.id).length > 0, view.id)
    }
  }
  assert.equal(skillRank('lit', true), 'practiced')
  assert.equal(skillRank('lit', false), 'read')
  assert.equal(skillRank('dim', true), 'ahead')
  const g1 = MASTERY_GATES.find((item) => item.id === 'g1')
  assert.ok(g1)
  const done = g1.lessons.map((item) => item.id)
  const checks = g1.outputs.map((_, index) => `g1:${index}`)
  const cleared = clearedGateIds(done, checks)
  assert.equal(cleared.has('g1'), true)
  assert.equal(cleared.has('g3'), false)
  assert.deepEqual(SKILL_MILESTONES.filter((item) => cleared.has(item.gateId)).map((item) => item.id), ['slice'])
  const glow = Object.fromEntries(SKILL_VIEWS.map((item) => [item.id, 'ready']))
  glow.http = 'lit'
  glow.tcp = 'lit'
  const practiced = practicedIds(glow, () => false, new Set(['g2']))
  assert.equal(practiced.has('http'), true)
  assert.equal(practiced.has('tcp'), false)
  assert.deepEqual(readyChildTitles('http', glow), ['HTTPS', 'WebSocket'])
  const blocked = Object.fromEntries(SKILL_VIEWS.map((item) => [item.id, 'dim']))
  blocked['ai-prompt'] = 'lit'
  blocked['ai-llm'] = 'lit'
  blocked['ai-agent'] = 'lit'
  blocked['ai-rag'] = 'dim'
  const stuck = skillPathAdvice('ai', blocked)
  assert.equal(stuck.scene, 'ai')
  assert.match(stuck.line, /检索增强/)
  assert.match(stuck.line, /嵌入/)
  const javaDone = Object.fromEntries(SKILL_VIEWS.map((item) => [item.id, 'dim']))
  for (const id of ['java', 'spring', 'sql', 'D01', 'redis', 'mq', 'idem', 'dist', 'docker', 'otel']) javaDone[id] = 'lit'
  const onward = skillPathAdvice('java', javaDone)
  assert.equal(onward.scene, 'browser')
  assert.match(onward.line, /浏览器应用/)
  const allLit = Object.fromEntries(SKILL_VIEWS.map((item) => [item.id, 'lit']))
  assert.equal(skillPathAdvice('all', allLit).line, '八条主干都点亮了。')
  assert.match(skillPathAdvice('all', dim).line, /都还没点亮/)
  const researching = { ...dim, idem: 'research' }
  assert.match(skillPathAdvice('all', researching).line, /幂等/)
  const one = { ...dim, html: 'lit' }
  assert.match(skillPathAdvice('all', one).line, /完成度最低/)
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

test('an encounter stays one step, and a finished read still waits on delivery', () => {
  assert.equal(encounterPhase(0, 0, false, 0, 4), 'ready')
  assert.equal(encounterAction('ready'), '开始这一场')
  assert.equal(encounterPhaseLabel('ready'), '可开始')
  assert.equal(encounterPhase(0, 0, false, 1, 4), 'playing')
  assert.equal(encounterAction('playing'), '继续这一场')
  assert.equal(encounterPhase(0, 0, false, 4, 4), 'deliver')
  assert.equal(encounterPhaseLabel('deliver'), '待验收')
  assert.equal(encounterAction('deliver'), '交上这一份')
  assert.equal(encounterPhase(0, 2, false, 1, 4), 'resume')
  assert.equal(encounterAction('resume'), '补上这一场')
  assert.equal(encounterPhase(0, 2, true, 4, 4), 'cleared')
  assert.equal(encounterAction('cleared'), '看下一场')
})

test('a spine lesson returns to camp, and the settle line needs a stored read', () => {
  const gate = PATHS.architect.gates[0]
  const first = 'fs-four-layers'
  const next = spineNextId(first)
  assert.equal(sceneExitPath(first), gatePath('g1'))
  assert.equal(sceneExitPath(first)?.includes(next), false)
  assert.equal(sceneExitPath('not-on-the-spine'), undefined)
  assert.equal(campScene(gate, []).lessonId, first)
  assert.equal(campScene(gate, []).step, 1)
  assert.equal(campScene(gate, gate.lessons.map((lesson) => lesson.id)).lessonId, undefined)
  assert.equal(missingOutput(gate, []), gate.outputs[0])
  assert.equal(missingOutput(gate, [`${gate.id}:0`]), gate.outputs[1])
  assert.equal(sceneSentence('先看这一句。后面先不放上营地。'), '先看这一句。')
  assert.equal(settleLine(first, [first], [], '下一场'), '')
  assert.equal(settleLine(first, [first], [first], '下一场'), '上一场已记下。下一场是 下一场。')
  assert.equal(settleLine(first, [first], [first], undefined), '本关课文已记下。')
  assert.equal(settleLine('other', [first], ['other'], '下一场'), '')
  assert.equal(campShowsChrome(0, 0), false)
  assert.equal(campShowsChrome(0, 1), true)
  assert.equal(campShowsChrome(1, 0), true)
  assert.equal(openSideLessonIds([])[0], 'ts-narrowing')
  assert.equal(openSideLessonIds(['ts-narrowing'])[0], 'ts-generics')
})

test('gate verify progress stays pending for drafts and does not clear the gate', () => {
  const gate = PATHS.architect.gates[0]
  assert.equal(abilityGoal(gate), gate.pass)
  const items = verifyItemsForGate('g1')
  assert.ok(items.some((item) => item.id === 'g1.write-path' && item.tier === 'base'))
  assert.ok(items.some((item) => item.id === 'g1.written-stock' && item.tier === 'base'))
  assert.ok(items.some((item) => item.id === 'g1.written-render' && item.tier === 'advanced'))
  const empty = gateVerifyFill('g1', [], [])
  assert.equal(empty.started, 0)
  assert.equal(empty.passed, 0)
  assert.equal(empty.total, 2)
  assert.equal(empty.advancedTotal, 2)
  assert.equal(empty.advancedNoted, 0)
  assert.match(empty.note, /不计入通过/)
  const reading = verifyItemsForGate('g3')
  assert.equal(reading[0]?.id, 'g3.open-keyset')
  assert.equal(reading[0]?.tier, 'base')
  assert.equal(nextVerifyId('g3', 'g3.open-keyset'), 'g3.written-keyset')
  assert.equal(nextVerifyId('g1', 'g1.written-user'), undefined)
  const advancedOnly = gateVerifyFill('g1', [], [{
    id: 'g1.written-render@1',
    attemptId: 'g1.written-render@1',
    taskId: 'g1.written-render',
    taskVersion: 1,
    kind: 'local-check',
    verification: 'passed',
    source: 'local',
    summary: '选对',
  }])
  assert.equal(advancedOnly.passed, 0)
  assert.equal(advancedOnly.advancedNoted, 1)
  assert.equal(gateEdition(true, advancedOnly).mark, '旧版已过')
  assert.match(empty.note, /不冒充认证/)
  const drafted = gateVerifyFill(
    'g1',
    [{ id: 'g1.write-path@1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '四段职责' }],
    [],
  )
  assert.equal(drafted.pending, 1)
  assert.equal(drafted.passed, 0)
  assert.equal(
    verifyFace(
      'g1.write-path',
      [{ id: 'g1.write-path@1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '四段' }],
      [],
    ),
    'pending',
  )
  assert.equal(verifyFaceLabel('pending'), '自评完成，待复核')
  assert.equal(verifyFaceLabel('passed'), '本地检查通过')
  const later = PATHS.architect.gates.find((item) => item.id === 'g-auth')
  assert.ok(later)
  assert.equal(gateVerifyFill(later.id, [], []).total, 0)
  assert.equal(gateEdition(true, { total: 0, passed: 0 }).mark, '')
  assert.equal(gateEdition(false, { total: 4, passed: 4 }).mark, '')
  assert.equal(gateEdition(true, { total: 4, passed: 0 }).mark, '旧版已过')
  assert.match(gateEdition(true, { total: 4, passed: 1 }).note, /新版待验收/)
  assert.equal(gateEdition(true, { total: 4, passed: 4 }).mark, '新版已通过')
  const byId = Object.fromEntries(MASTERY_GATES.map((item) => [item.id, item.requires]))
  assert.deepEqual(byId.g1, [])
  assert.deepEqual(byId.g2, ['g1'])
  assert.deepEqual(byId['g-auth'], ['g1'])
  assert.deepEqual(byId['g-triage'], ['g2', 'g3'])
  assert.deepEqual(byId.g6, ['g4', 'g5'])
  const seen = new Set()
  for (const item of MASTERY_GATES) {
    for (const id of item.requires) assert.equal(seen.has(id), true, `${item.id} 指向了后面的关`)
    seen.add(item.id)
  }
  const open = gateAdvise({
    requires: ['g2', 'g3'],
    titles: { g2: '把写入做对', g3: '把读取做对' },
    satisfied: new Set(['g2']),
    skipped: false,
    hasVerify: true,
  })
  assert.equal(open.stone, '建议先完成')
  assert.equal(open.canSkip, true)
  assert.deepEqual(open.unmet.map((item) => item.title), ['把读取做对'])
  const skipped = gateAdvise({
    requires: ['g2'],
    titles: { g2: '把写入做对' },
    satisfied: new Set(),
    skipped: true,
    hasVerify: true,
  })
  assert.equal(skipped.stone, '可挑战')
  assert.match(skipped.skipNote, /通过只记这一关/)
  assert.equal(skipped.canSkip, false)
  const ready = gateAdvise({
    requires: ['g1'],
    titles: { g1: '走通一次下单' },
    satisfied: new Set(['g1']),
    skipped: false,
    hasVerify: true,
  })
  assert.equal(ready.stone, '可挑战')
  assert.equal(ready.unmet.length, 0)
  const quiet = gateAdvise({
    requires: ['g1'],
    titles: { g1: '走通一次下单' },
    satisfied: new Set(),
    skipped: false,
    hasVerify: false,
  })
  assert.equal(quiet.stone, '')
  assert.equal(quiet.canSkip, false)
  assert.equal(passFlashLine('能讲清这条路径。这一关不是精通。'), '新版已通过。能讲清这条路径。这一关不是精通。')
  assert.match(passFlashLine('测试失败不改正在跑的副本。'), /这一关不是精通。$/)
  assert.deepEqual(normalizeProgress({ skipVerify: ['g3', 'g3', ''] }, groups).skipVerify, ['g3'])
  assert.equal(
    gateCleared(
      gate,
      gate.lessons.map((lesson) => lesson.id),
      gate.outputs.map((_, index) => `${gate.id}:${index}`),
    ),
    true,
  )
})

