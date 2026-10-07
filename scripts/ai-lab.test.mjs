import { test } from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { applyPromptFixes, assemblePrompt, promptDiff, reviewPrompt, SAMPLE_PROMPT } from '../web/src/labs/promptChecks.ts'
import { SAMPLE_AGENT, advance, exportAgent, initialLoop, mustConfirm, toolIssues } from '../web/src/labs/agentLoop.ts'
import { labNeedsRecovery, normalizeLab, readLab, restoreLabBackup } from '../web/src/labs/labStorage.ts'

test('prompt review asks for a format and an unknown-answer exit', () => {
  const checks = reviewPrompt(SAMPLE_PROMPT)
  assert.equal(checks.find((item) => item.id === 'format').ok, false)
  assert.equal(checks.find((item) => item.id === 'unknown').ok, false)
  const fixed = reviewPrompt(applyPromptFixes(SAMPLE_PROMPT))
  assert.equal(fixed.find((item) => item.id === 'format').ok, true)
  assert.equal(fixed.find((item) => item.id === 'unknown').ok, true)
})

test('prompt review rejects pretending the prompt can open a desktop', () => {
  const checks = reviewPrompt({ ...SAMPLE_PROMPT, task: '查看桌面上的文件' })
  assert.equal(checks.find((item) => item.id === 'tool').ok, false)
})

test('prompt review does not treat 根据常识 as a missing-document task', () => {
  const checks = reviewPrompt({ ...SAMPLE_PROMPT, task: '根据常识写一首诗', materials: '' })
  assert.equal(checks.find((item) => item.id === 'materials').ok, true)
})

test('agent loop runs a read tool and waits before a write', () => {
  const read = advance(SAMPLE_AGENT, initialLoop(), 'step')
  assert.match(read.log.at(-1).text, /直接执行/)
  const waiting = advance(SAMPLE_AGENT, read, 'step')
  assert.equal(waiting.waitingId, 'draft')
  assert.equal(mustConfirm(SAMPLE_AGENT.tools[1]), true)
  const allowed = advance(SAMPLE_AGENT, waiting, 'allow')
  assert.match(allowed.log.at(-1).text, /程序执行了/)
  const denied = advance(SAMPLE_AGENT, waiting, 'deny')
  assert.equal(denied.done, true)
  assert.match(denied.log.at(-1).text, /拒绝/)
})

test('prompt diff lists the lines a fix adds and the placeholders it removes', () => {
  const before = assemblePrompt(SAMPLE_PROMPT)
  const after = assemblePrompt(applyPromptFixes(SAMPLE_PROMPT))
  const diff = promptDiff(before, after)
  assert.ok(diff.added.some((line) => line.includes('短句')))
  assert.ok(diff.removed.some((line) => line.includes('还没有规定格式')))
})

test('repeated failures stop the loop before another side effect', () => {
  const read = advance(SAMPLE_AGENT, initialLoop(), 'step')
  const waiting = advance(SAMPLE_AGENT, read, 'step')
  const once = advance(SAMPLE_AGENT, waiting, 'fail')
  assert.equal(once.done, false)
  assert.equal(once.waitingId, 'draft')
  const twice = advance(SAMPLE_AGENT, once, 'fail')
  assert.equal(twice.done, true)
  assert.equal(twice.waitingId, undefined)
  assert.match(twice.log.at(-1).text, /上限/)
})

test('exported agent spec forces confirmation for writes and carries the instruction', () => {
  const spec = exportAgent({ ...SAMPLE_AGENT, instruction: '只根据材料回答。' })
  assert.match(spec, /"permission": "write"/)
  assert.match(spec, /"needsConfirm": true/)
  assert.match(spec, /"instruction": "只根据材料回答。"/)
  assert.match(spec, /runAgent/)
  assert.match(spec, /人拒绝了这一步/)
})

test('exported runAgent initializes declared fields and allows the same tool twice', () => {
  const spec = exportAgent(SAMPLE_AGENT)
  assert.match(spec, /Object.fromEntries\(agent.state.map/)
  assert.match(spec, /execute\(tool, proposal, state\)/)
  assert.equal(spec.includes('这个工具已经用过'), false)
  assert.match(spec, /hasOwnProperty.call\(patch, field\)/)
  assert.match(spec, /"材料"/)
})

test('lab storage coerces null prompt fields and keeps a recovery copy', () => {
  const broken = { prompt: { task: null, materials: '材料', format: '', ifUnknown: '', limits: '' }, agent: { tools: [] } }
  assert.equal(labNeedsRecovery(broken), true)
  const snapshot = normalizeLab(broken)
  assert.equal(typeof snapshot.prompt.task, 'string')
  assert.ok(snapshot.prompt.task.length > 0)
  assert.doesNotThrow(() => snapshot.prompt.task.trim())

  const data = new Map([['reading-lab.ai-lab', JSON.stringify(broken)]])
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key) => data.get(key) ?? null,
        setItem: (key, value) => data.set(key, value),
      },
    })
    const loaded = readLab()
    assert.match(loaded.issue, /异常|副本/)
    assert.equal(typeof loaded.snapshot.prompt.task, 'string')
    assert.ok(data.get('reading-lab.ai-lab.recovery'))
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor)
    else delete globalThis.localStorage
  }
})

test('duplicate and reserved tool names are reported and stop exported runAgent', async () => {
  const duplicate = [
    { id: 'a', name: '查找材料', purpose: 'a', permission: 'read', needsConfirm: false },
    { id: 'b', name: '查找材料', purpose: 'b', permission: 'write', needsConfirm: true },
    { id: 'c', name: 'stop', purpose: 'c', permission: 'read', needsConfirm: false },
  ]
  const issues = toolIssues(duplicate)
  assert.ok(issues.some((item) => item.includes('重复')))
  assert.ok(issues.some((item) => item.includes('stop')))
  const spec = exportAgent({ ...SAMPLE_AGENT, tools: duplicate, maxSteps: 4, failLimit: 2 })
  const source = spec.replace('export const agent', 'const agent').replace('export async function runAgent', 'async function runAgent')
  const result = await vm.runInNewContext(`${source}\nrunAgent(async () => ({ name: '查找材料' }), async () => ({}), async () => true)`)
  assert.equal(result.stop, '工具名重复')
})

test('exported runAgent counts failures for toString without inheriting Object methods', async () => {
  const draft = {
    ...SAMPLE_AGENT,
    maxSteps: 4,
    failLimit: 2,
    tools: [{ id: 't', name: 'toString', purpose: 'fail', permission: 'read', needsConfirm: false }],
  }
  const spec = exportAgent(draft)
  const source = spec.replace('export const agent', 'const agent').replace('export async function runAgent', 'async function runAgent')
  const result = await vm.runInNewContext(
    `${source}\nrunAgent(async () => ({ name: 'toString' }), async () => { throw new Error('fail') }, async () => true)`,
  )
  assert.equal(result.stop, '同一工具失败次数达到上限')
})

test('AI sample lessons expose practice answers and two follow-ups', async () => {
  const {
    AI_SAMPLE_EXTRAS,
    AI_B1_SAMPLE_KEYS,
    AI_B2_MODULE_KEYS,
    AI_B3_MODULE_KEYS,
    AI_B4_MODULE_KEYS,
    AI_B5_MODULE_KEYS,
    AI_B6_MODULE_KEYS,
    withSampleExtras,
  } = await import('../web/src/data/aiSamples.ts')
  const { AI_NOTES, searchAiNotes } = await import('../web/src/data/aiCatalog.ts')
  const noteKeys = new Set(AI_NOTES.map((note) => note.key))
  assert.equal(noteKeys.size, AI_NOTES.length, 'duplicate AI note keys')
  for (const key of [
    ...AI_B1_SAMPLE_KEYS,
    ...AI_B2_MODULE_KEYS,
    ...AI_B3_MODULE_KEYS,
    ...AI_B4_MODULE_KEYS,
    ...AI_B5_MODULE_KEYS,
    ...AI_B6_MODULE_KEYS,
  ]) {
    assert.ok(noteKeys.has(key), `missing base note ${key}`)
    const extra = AI_SAMPLE_EXTRAS[key]
    assert.ok(extra?.outcomes?.length, key)
    assert.ok(extra.practiceItems?.length >= 1, key)
    assert.ok(extra.experiment?.mode, key)
    assert.equal(extra.experiment.unverified, true, key)
    const merged = withSampleExtras({
      key,
      section: 'intro',
      title: 't',
      scope: 's',
      reading: ['r'],
      sources: [],
    })
    assert.ok(merged.outcomes?.length)
  }
  for (const key of AI_B1_SAMPLE_KEYS) {
    const extra = AI_SAMPLE_EXTRAS[key]
    assert.ok(extra.practiceItems?.length >= 2, key)
    assert.ok(extra.quizzes?.[0]?.followUps?.length >= 2, key)
  }
  const hits = searchAiNotes('KV Cache')
  assert.ok(hits.some((note) => note.key === 'kv-cache'))
  for (const note of AI_NOTES) {
    const merged = withSampleExtras(note)
    for (const pre of merged.prerequisites || []) {
      assert.ok(noteKeys.has(pre), `${note.key} missing prereq ${pre}`)
    }
    assert.equal(
      (merged.reading || []).some((line) => /^占位：见/.test(line.trim())),
      false,
      `${note.key} still has placeholder reading`,
    )
  }
  const { mainlineProgress } = await import('../web/src/data/aiPrereq.ts')
  const empty = mainlineProgress([])
  assert.equal(empty.completed, 0)
  assert.ok(empty.total >= 8)
  assert.equal(empty.percent, 0)
  const full = mainlineProgress(empty.stages.flatMap((stage) => stage.keys.map((key) => `ai:${key}`)))
  assert.equal(full.percent, 100)
})

test('L1 eval has zero ACL failures on hybrid mock path', async () => {
  const { runL1Eval, compareRetrieveModes } = await import('../web/src/labs/l1EvalRunner.ts')
  const { L1_EVAL, L1_DOCS } = await import('../web/src/data/l1Corpus.ts')
  assert.ok(L1_DOCS.length >= 20)
  assert.equal(L1_EVAL.length, 30)
  const report = runL1Eval('hybrid')
  assert.equal(report.aclFailures, 0)
  assert.equal(report.generator, 'mock-rules')
  assert.equal(report.unverifiedLiveModel, true)
  assert.ok(report.answerOkRate > 0.8)
  assert.equal(compareRetrieveModes().length, 3)
})

test('L2 fault suite covers approval idempotency and workflow contrast', async () => {
  const { runL2FaultSuite, compareAgentVsWorkflow, resetL2Ledger, runL2 } = await import(
    '../web/src/labs/l2Agent.ts'
  )
  const suite = runL2FaultSuite()
  assert.ok(suite.length >= 10)
  assert.ok(suite.every((item) => item.ok), suite.filter((item) => !item.ok).map((item) => item.fault).join(','))
  resetL2Ledger()
  const denied = runL2({
    goal: '去杭州出差',
    user: { id: 'u1', role: 'employee', budgetCents: 200_000 },
    mode: 'agent',
    fault: 'deny_approval',
  })
  assert.equal(denied.stop, 'denied')
  assert.equal(denied.bookedTripId, null)
  assert.equal(denied.generator, 'mock-rules')
  assert.equal(denied.unverifiedLiveModel, true)
  const compare = compareAgentVsWorkflow()
  assert.equal(compare.sameBooking, true)
  assert.ok(compare.agent.trace.some((event) => event.kind === 'approve_wait' || event.kind === 'approve'))
})

test('B5 interview bank has twelve drills linked to lessons', async () => {
  const {
    AI_DRILL_QUESTIONS,
    AI_MOCK_INTERVIEWS,
    AI_DRILL_DISCLAIMER,
    AI_DRILL_BATCH1_SIZE,
    AI_DRILL_EDITOR_TARGET,
    AI_DRILL_AREA_TARGETS,
    AI_DRILL_AREAS,
    countDrillsByArea,
    drillArea,
  } = await import('../web/src/data/aiInterviewBank.ts')
  const { AI_NOTES, searchAiNotes } = await import('../web/src/data/aiCatalog.ts')
  const noteKeys = new Set(AI_NOTES.map((note) => note.key))
  assert.equal(AI_DRILL_BATCH1_SIZE, 12)
  assert.equal(AI_DRILL_EDITOR_TARGET, 60)
  assert.equal(AI_DRILL_QUESTIONS.length, AI_DRILL_EDITOR_TARGET)
  assert.equal(new Set(AI_DRILL_QUESTIONS.map((item) => item.id)).size, AI_DRILL_EDITOR_TARGET)
  const areaCounts = countDrillsByArea()
  let areaSum = 0
  for (const area of AI_DRILL_AREAS) {
    assert.ok(areaCounts[area] >= AI_DRILL_AREA_TARGETS[area], `${area} ${areaCounts[area]}`)
    areaSum += areaCounts[area]
  }
  assert.equal(areaSum, AI_DRILL_EDITOR_TARGET)
  assert.equal(drillArea(AI_DRILL_QUESTIONS[0]), '基础、数据与机器学习')
  assert.equal(AI_MOCK_INTERVIEWS.length, 3)
  assert.ok(AI_DRILL_DISCLAIMER.includes('不冒充'))
  for (const question of AI_DRILL_QUESTIONS) {
    assert.ok(question.followUps.length >= 2, question.id)
    assert.ok(question.answerShort.length > 10, question.id)
    assert.ok(question.answerDeep.length > 20, question.id)
    assert.ok(question.lessonKeys.every((key) => noteKeys.has(key)), question.id)
    assert.ok(question.prerequisites.every((key) => noteKeys.has(key)), question.id)
  }
  for (const mock of AI_MOCK_INTERVIEWS) {
    assert.ok(mock.questionIds.length >= 4)
    assert.ok(mock.questionIds.every((id) => AI_DRILL_QUESTIONS.some((item) => item.id === id)))
    assert.equal(new Set(mock.questionIds).size, mock.questionIds.length, mock.id)
  }
  const hits = searchAiNotes('幂等')
  assert.ok(
    hits.some((note) => note.key === 'interview-bank' || note.key === 'controlled-agent' || note.key === 'l2-agent'),
  )
  const { searchAiDrills } = await import('../web/src/data/aiInterviewBank.ts')
  const drillHits = searchAiDrills('幂等')
  assert.ok(drillHits.some((item) => item.id === 'q06-timeout-idempotent'))
})

test('U03 prereq gaps are skippable and U06 backup refuses silent overwrite', async () => {
  const { missingPrereqs, findPrereqCycles } = await import('../web/src/data/aiPrereq.ts')
  const {
    buildAiBackup,
    parseAiBackup,
    applyAiBackup,
    AI_BACKUP_FORMAT,
    AI_BACKUP_VERSION,
  } = await import('../web/src/labs/aiBackup.ts')
  assert.equal(findPrereqCycles().length, 0)
  const blocked = missingPrereqs('rag-pipeline', [], [])
  assert.equal(blocked.ready, false)
  assert.ok(blocked.missing.length > 0)
  const skipped = missingPrereqs('rag-pipeline', [], ['rag-pipeline'])
  assert.equal(skipped.ready, true)
  const state = {
    track: 'frontend',
    group: '',
    done: [],
    review: [],
    recent: [],
    notes: {},
    theme: 'light',
    query: '',
    audit: {},
    localQuery: '',
    localTopic: '',
    localCategory: 'ai',
    aiDone: ['ai:l0-verify'],
    aiReview: [],
    aiRecent: [],
    aiNotes: { 'ai:l0-verify': 'local note' },
    aiQuery: '',
    aiSkippedPrereq: [],
    aiDrillScores: { 'q01-prompt-rag-ft': 3 },
    revision: 1,
  }
  const file = buildAiBackup(state)
  assert.equal(file.format, AI_BACKUP_FORMAT)
  assert.equal(file.version, AI_BACKUP_VERSION)
  const parsed = parseAiBackup(file)
  assert.equal(parsed.ok, true)
  if (!parsed.ok) return
  const incoming = {
    ...parsed.next,
    aiNotes: { 'ai:l0-verify': 'imported should not win' },
    aiDrillScores: { 'q01-prompt-rag-ft': 1 },
  }
  const merged = applyAiBackup(state, incoming, 'merge')
  assert.equal(merged.state.aiNotes['ai:l0-verify'], 'local note')
  assert.equal(merged.state.aiDrillScores['q01-prompt-rag-ft'], 3)
  assert.ok(merged.warnings.length >= 1)
  const bad = parseAiBackup({ format: 'nope', version: 1, payload: {} })
  assert.equal(bad.ok, false)
})

test('L0 pack marks good samples pass and bad samples fail', async () => {
  const { gradeL0Pack, L0_CASES } = await import('../web/src/labs/l0Verify.ts')
  const report = gradeL0Pack()
  assert.equal(report.length, L0_CASES.length)
  for (const row of report) {
    assert.ok(row.sample.every((item) => item.ok), row.id)
    assert.ok(row.bad.some((item) => !item.ok), row.id)
  }
})

test('AI diagnostic scores a complete answer sheet', async () => {
  const { AI_DIAGNOSTIC, scoreDiagnostic } = await import('../web/src/data/aiDiagnostic.ts')
  const answers = Object.fromEntries(AI_DIAGNOSTIC.map((item) => [item.id, item.choices[0].id]))
  const result = scoreDiagnostic(answers)
  assert.ok(result.primary)
  assert.ok(result.secondary)
  assert.equal(AI_DIAGNOSTIC.length, 10)
})

test('restoreLabBackup reads the recovery copy', () => {
  const data = new Map([['reading-lab.ai-lab.recovery', JSON.stringify({ prompt: { task: '从副本恢复', materials: '', format: '', ifUnknown: '', limits: '' }, agent: SAMPLE_AGENT })]])
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key) => data.get(key) ?? null,
        setItem: (key, value) => data.set(key, value),
      },
    })
    const recovered = restoreLabBackup()
    assert.equal(recovered.snapshot.prompt.task, '从副本恢复')
    assert.match(recovered.issue, /副本/)
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor)
    else delete globalThis.localStorage
  }
})
