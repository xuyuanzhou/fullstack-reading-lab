import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

function run(checks) {
  return spawnSync('./run.sh', [], {
    cwd: root,
    env: { ...process.env, CHECKS: checks },
    encoding: 'utf8',
  })
}

test('two passing checks finish with regression ok', () => {
  const result = run('pass-a,pass-b')
  assert.equal(result.status, 0)
  assert.match(result.stdout, /pass-a/)
  assert.match(result.stdout, /pass-b/)
  assert.match(result.stdout, /regression ok/)
})

test('a failed check stops the run', () => {
  const result = run('pass-a,fail-contract,after-fail')
  assert.equal(result.stdout.includes('regression ok'), false, result.stdout)
  assert.equal(result.stdout.includes('after-fail'), false, result.stdout)
  assert.notEqual(result.status, 0)
})
