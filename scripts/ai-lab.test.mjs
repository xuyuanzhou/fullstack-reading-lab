import { test } from 'node:test'
import assert from 'node:assert/strict'
import { applyPromptFixes, assemblePrompt, promptDiff, reviewPrompt, SAMPLE_PROMPT } from '../web/src/labs/promptChecks.ts'
import { SAMPLE_AGENT, advance, exportAgent, initialLoop, mustConfirm } from '../web/src/labs/agentLoop.ts'

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
