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
  const { AI_SAMPLE_EXTRAS, AI_B1_SAMPLE_KEYS, AI_B2_MODULE_KEYS, withSampleExtras } = await import(
    '../web/src/data/aiSamples.ts'
  )
  const { AI_NOTES } = await import('../web/src/data/aiCatalog.ts')
  const noteKeys = new Set(AI_NOTES.map((note) => note.key))
  assert.equal(noteKeys.size, AI_NOTES.length, 'duplicate AI note keys')
  for (const key of [...AI_B1_SAMPLE_KEYS, ...AI_B2_MODULE_KEYS]) {
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
