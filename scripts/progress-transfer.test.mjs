import assert from 'node:assert/strict'
import test from 'node:test'
import { DRILL_QUESTIONS } from '../web/src/data/drillBank.ts'
import { SKILL_LESSONS } from '../web/src/data/learningSkills.ts'
import { createLearningStore } from '../web/src/state/learningStore.ts'
import { normalizeProgress } from '../web/src/state/progressStorage.ts'
import { applyProgress, buildProgressFile, previewProgress } from '../web/src/state/progressTransfer.ts'

const groups = () => ['全栈主线']
const htmlLessons = [...SKILL_LESSONS.html]
const known = new Set(['js-what-it-is', 'closure', ...htmlLessons])
const catalog = {
  lesson: (id) => known.has(id),
  aiLesson: () => false,
}

function bank(seed) {
  let current = normalizeProgress(seed, groups)
  return {
    read() {
      return { state: structuredClone(current), issue: '' }
    },
    write(_key, state) {
      current = structuredClone(state)
      return ''
    },
    get() {
      return current
    },
  }
}

function openStore(seed = {}) {
  const memory = bank(seed)
  const store = createLearningStore({
    groups,
    read: memory.read,
    write: memory.write,
    readDraft: () => null,
    probe: async () => false,
    persist: 'manual',
  })
  return { store, memory }
}

function answer(question) {
  return {
    questionId: question.id,
    choice: question.answer,
    correct: false,
    mode: 'gate',
    attempt: 1,
    at: 10,
  }
}

test('export refuses a secret, and a foreign or newer file is not applied', () => {
  const secret = openStore({ notes: { 'js-what-it-is': 'password: hunter2' } })
  assert.equal(buildProgressFile(secret.store.getState(), catalog).ok, false)
  const current = openStore().store.getState()
  assert.equal(previewProgress({ format: 'reading-lab.ai-progress', version: 1, payload: {} }, current, 'merge', catalog).ok, false)
  assert.equal(previewProgress({
    format: 'reading-lab.progress',
    version: 2,
    payload: {},
  }, current, 'merge', catalog).ok, false)
  assert.equal(previewProgress({
    format: 'reading-lab.progress',
    version: 1,
    payload: { learning: { schemaVersion: 9, done: ['keep'] }, notes: { 'js-what-it-is': 'token: abc' } },
  }, current, 'merge', catalog).ok, false)
  const applied = applyProgress(current, { format: 'reading-lab.progress', version: 1, payload: { notes: { x: 'api_key: abc' } } }, 'replace', catalog)
  assert.equal(applied.ok, false)
  assert.equal(current.done.length, 0)
})

test('merge keeps the local note, drops unknown ids, and survives the revision write', () => {
  const question = DRILL_QUESTIONS[0]
  const { store, memory } = openStore({
    revision: 2,
    done: ['js-what-it-is'],
    notes: { 'js-what-it-is': '本机笔记' },
    theme: 'dark',
    learning: {
      schemaVersion: 2,
      revision: 1,
      selfChecks: [],
      attempts: [{ id: 'a1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '本机草稿' }],
      evidence: [],
      quests: [],
    },
  })
  const built = buildProgressFile(store.getState(), catalog)
  assert.equal(built.ok, true)
  const file = JSON.parse(built.json)
  assert.equal(file.format, 'reading-lab.progress')
  assert.equal(file.version, 1)
  assert.equal(Object.hasOwn(file.payload, 'theme'), false)
  assert.equal(Object.hasOwn(file.payload, 'revision'), false)
  file.payload.done = [...htmlLessons, 'not-a-lesson']
  file.payload.notes = { 'js-what-it-is': '文件笔记', 'not-a-lesson': '丢掉' }
  file.payload.pathChecks = ['g1:0', 'nope:9']
  file.payload.skillScene = 'java'
  file.payload.drill = { log: [answer(question), { ...answer(question), questionId: 'missing-question', at: 11 }] }
  file.payload.learning = {
    schemaVersion: 2,
    selfChecks: [{ deliverableId: 'g2.runnable-write', legacyKey: 'g2:0', source: 'self' }],
    attempts: [],
    evidence: [],
    quests: [],
  }
  file.preview = { lit: 999 }
  const preview = previewProgress(file, store.getState(), 'merge', catalog)
  assert.equal(preview.ok, true)
  assert.ok(preview.unknownLessons.includes('not-a-lesson'))
  assert.equal(preview.unknownQuestions, 1)
  assert.ok(preview.unknownChecks.includes('nope:9'))
  assert.deepEqual(preview.noteConflicts, ['js-what-it-is'])
  assert.ok(preview.lit >= 1)
  const applied = applyProgress(store.getState(), file, 'merge', catalog)
  assert.equal(applied.ok, true)
  assert.equal(store.getState().importProgress(applied.state).ok, true)
  store.getState().flushPersist()
  const saved = memory.get()
  for (const id of htmlLessons) assert.ok(saved.done.includes(id), id)
  assert.equal(saved.done.includes('js-what-it-is'), true)
  assert.equal(saved.done.includes('not-a-lesson'), false)
  assert.equal(saved.notes['js-what-it-is'], '本机笔记')
  assert.equal(saved.notes['not-a-lesson'], undefined)
  assert.deepEqual(saved.pathChecks, ['g1:0'])
  assert.equal(saved.drill.log.length, 1)
  assert.equal(saved.drill.log[0].questionId, question.id)
  assert.equal(saved.drill.log[0].correct, true)
  assert.equal(saved.learning.selfChecks.some((item) => item.deliverableId === 'g2.runnable-write'), true)
  assert.equal(saved.learning.attempts.find((item) => item.id === 'a1')?.draft, '本机草稿')
  assert.equal(saved.learning.attempts.find((item) => item.id === 'a1')?.deleted, undefined)
  assert.equal(saved.theme, 'dark')
  assert.equal(saved.skillScene, 'all')
  assert.ok(saved.revision > 2)
})

test('replace swaps lessons and keeps a removed draft marked deleted', () => {
  const question = DRILL_QUESTIONS[0]
  const { store, memory } = openStore({
    revision: 3,
    done: ['js-what-it-is'],
    notes: { 'js-what-it-is': '本机笔记' },
    skillScene: 'all',
    pathChecks: ['g1:0'],
    drill: { log: [answer(question)] },
    learning: {
      schemaVersion: 2,
      revision: 1,
      selfChecks: [{ deliverableId: 'g2.runnable-write', legacyKey: 'g2:0', source: 'self' }],
      attempts: [{ id: 'a1', taskId: 'g1.write-path', taskVersion: 1, status: 'draft', hintLevel: 0, draft: '本机草稿' }],
      evidence: [],
      quests: [],
    },
  })
  const built = buildProgressFile(openStore({ done: ['closure'], skillScene: 'java' }).store.getState(), catalog)
  assert.equal(built.ok, true)
  const file = JSON.parse(built.json)
  const preview = previewProgress(file, store.getState(), 'replace', catalog)
  assert.equal(preview.ok, true)
  assert.ok(preview.noteConflicts.includes('js-what-it-is'))
  const applied = applyProgress(store.getState(), file, 'replace', catalog)
  assert.equal(applied.ok, true)
  assert.equal(store.getState().importProgress(applied.state).ok, true)
  store.getState().flushPersist()
  const saved = memory.get()
  assert.deepEqual(saved.done, ['closure'])
  assert.equal(saved.notes['js-what-it-is'], undefined)
  assert.deepEqual(saved.pathChecks, [])
  assert.deepEqual(saved.drill.log, [])
  assert.equal(saved.skillScene, 'java')
  assert.deepEqual(saved.learning.selfChecks, [])
  assert.equal(saved.learning.attempts.find((item) => item.id === 'a1')?.deleted, true)
  assert.equal(saved.theme, 'light')
})
