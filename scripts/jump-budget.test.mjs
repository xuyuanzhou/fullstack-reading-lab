import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { LESSON_BODY_BUDGET_BYTES } from '../web/src/transition/jumpBudget.ts'

const dataDir = path.join(import.meta.dirname, '../web/src/data')
const index = JSON.parse(fs.readFileSync(path.join(dataDir, 'curriculum-index.json'), 'utf8'))
const packs = {
  frontend: JSON.parse(fs.readFileSync(path.join(dataDir, 'curriculum-bodies-frontend.json'), 'utf8')),
  java: JSON.parse(fs.readFileSync(path.join(dataDir, 'curriculum-bodies-java.json'), 'utf8')),
}

test('each lesson body is its own file and stays under the slow-network budget', () => {
  assert.equal(index.lessons.length > 0, true)
  for (const lesson of index.lessons) {
    const file = path.join(dataDir, 'bodies', lesson.track, `${lesson.id}.json`)
    const bytes = fs.statSync(file).size
    assert.equal(bytes <= LESSON_BODY_BUDGET_BYTES, true, `${lesson.id} is ${bytes} bytes`)
    assert.deepEqual(JSON.parse(fs.readFileSync(file, 'utf8')), packs[lesson.track][lesson.id])
  }
})
