import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import {
  DRILL_COURSES,
  DRILL_GATES,
  DRILL_POINTS,
  DRILL_QUESTIONS,
  gateById,
  pointById,
  questionById,
} from '../web/src/data/drillBank.ts'
import { DRILL_ROADS, drillRoadFaces } from '../web/src/data/drillOutline.ts'
import {
  DRILL_REVIVE_START,
  acceptAnswer,
  badgesOf,
  describeGate,
  emptyDrill,
  learningReport,
  mergeDrill,
  neededCorrect,
  normalizeDrill,
  percentOf,
  pointsOf,
  revivesLeft,
} from '../web/src/data/drillRules.ts'
import { createLearningStore } from '../web/src/state/learningStore.ts'
import { mergeForWrite, normalizeProgress } from '../web/src/state/progressStorage.ts'

const groups = () => ['全栈主线']

test('each gate has four choices, one answer, and a lesson', () => {
  const nav = JSON.parse(readFileSync(new URL('../web/src/data/curriculum-nav.json', import.meta.url), 'utf8'))
  const lessons = new Set(nav.lessons.map((lesson) => lesson.id))
  assert.equal(DRILL_COURSES.length, 4)
  assert.equal(DRILL_GATES.length, 47)
  assert.equal(DRILL_QUESTIONS.length, 470)
  assert.equal(neededCorrect(5), 4)
  assert.equal(neededCorrect(10), 8)
  const answers = { a: 0, b: 0, c: 0, d: 0 }
  const points = new Set()
  const ids = new Set()
  for (const gate of DRILL_GATES) {
    assert.equal(gate.questionIds.length, 10, gate.id)
    assert.equal(new Set(gate.questionIds).size, 10, gate.id)
  }
  for (const question of DRILL_QUESTIONS) {
    assert.equal(question.options.length, 4, question.id)
    assert.deepEqual(question.options.map((option) => option.id), ['a', 'b', 'c', 'd'])
    assert.ok(question.options.every((option) => option.text.length > 4), question.id)
    assert.equal(new Set(question.options.map((option) => option.text)).size, 4, question.id)
    const point = pointById(question.pointId)
    assert.ok(point, question.pointId)
    assert.equal(lessons.has(point.lessonId), true, point.lessonId)
    assert.ok(question.explain.length > 20, question.id)
    for (const option of question.options) {
      if (option.id === question.answer) assert.equal(question.whyWrong[option.id], undefined)
      else assert.ok(question.whyWrong[option.id]?.length > 8, `${question.id} ${option.id}`)
    }
    answers[question.answer] += 1
    points.add(question.pointId)
    assert.equal(ids.has(question.id), false, question.id)
    ids.add(question.id)
  }
  assert.equal(ids.size, DRILL_QUESTIONS.length)
  assert.equal(points.size, DRILL_POINTS.length)
  const counts = Object.values(answers)
  assert.ok(Math.max(...counts) - Math.min(...counts) <= 4, JSON.stringify(answers))
})

function answerWrong(question, wrong) {
  if (!wrong) return question.answer
  return question.options.find((option) => option.id !== question.answer).id
}

function runGate(state, gateId, wrongIndexes, mode = 'gate') {
  const gate = gateById(gateId)
  const ids = mode === 'retry' ? describeGate(state, gateId).last.wrongIds : gate.questionIds
  let current = state
  let at = 1000 + current.log.length * 3
  for (let index = 0; index < ids.length; index += 1) {
    const question = questionById(ids[index])
    const saved = acceptAnswer(current, {
      gateId,
      questionId: question.id,
      choice: answerWrong(question, wrongIndexes.includes(index)),
      mode,
    }, at)
    assert.equal(saved.ok, true, saved.issue)
    current = saved.drill
    at += 1
  }
  return current
}

test('80% clears a gate and unlocks only the next one', () => {
  let state = emptyDrill()
  assert.equal(describeGate(state, 'd2').unlocked, false)
  const total = gateById('d1').questionIds.length
  const passWrong = total - neededCorrect(total)
  state = runGate(state, 'd1', Array.from({ length: passWrong }, (_, index) => index))
  const play = describeGate(state, 'd1')
  assert.equal(play.cleared, true)
  assert.equal(play.last.correct, neededCorrect(total))
  assert.equal(play.last.percent, percentOf(neededCorrect(total), total))
  assert.equal(describeGate(state, 'd2').unlocked, true)
  assert.equal(describeGate(state, 'd3').unlocked, false)
  assert.equal(describeGate(state, 'd4').unlocked, false)
  assert.equal(describeGate(state, 's1').unlocked, true)
  const blocked = acceptAnswer(state, {
    gateId: 'd3',
    questionId: gateById('d3').questionIds[0],
    choice: 'a',
    mode: 'gate',
  }, 50)
  assert.equal(blocked.ok, false)
  assert.match(blocked.issue, /锁/)
})

test('below 80% does not clear or unlock', () => {
  const total = gateById('d1').questionIds.length
  const failWrong = total - neededCorrect(total) + 1
  const state = runGate(emptyDrill(), 'd1', Array.from({ length: failWrong }, (_, index) => index))
  const play = describeGate(state, 'd1')
  assert.equal(play.last.correct, total - failWrong)
  assert.equal(play.cleared, false)
  assert.equal(describeGate(state, 'd2').unlocked, false)
  assert.equal(revivesLeft(state), DRILL_REVIVE_START)
})

test('questions are answered in order, and a cleared gate cannot be farmed', () => {
  const first = gateById('d1').questionIds[0]
  const second = gateById('d1').questionIds[1]
  const skipped = acceptAnswer(emptyDrill(), { gateId: 'd1', questionId: second, choice: 'a', mode: 'gate' }, 3)
  assert.equal(skipped.ok, false)
  assert.match(skipped.issue, /顺序/)
  const state = runGate(emptyDrill(), 'd1', [])
  const total = gateById('d1').questionIds.length
  assert.equal(pointsOf(state), total * 10 + 20 + 10)
  const again = acceptAnswer(state, { gateId: 'd1', questionId: first, choice: 'a', mode: 'gate' }, 80)
  assert.equal(again.ok, false)
  assert.match(again.issue, /通过/)
})

test('a failed gate spends a revive on the retake and stops when none remain', () => {
  let state = runGate(emptyDrill(), 's1', [0, 1, 2])
  assert.equal(describeGate(state, 's1').canStartGate, true)
  state = runGate(state, 's1', [0, 1, 2])
  assert.equal(revivesLeft(state), 1)
  state = runGate(state, 's1', [0, 1, 2])
  assert.equal(revivesLeft(state), 0)
  assert.equal(describeGate(state, 's1').canStartGate, false)
  const blocked = acceptAnswer(state, {
    gateId: 's1',
    questionId: gateById('s1').questionIds[0],
    choice: 'a',
    mode: 'gate',
  }, 400)
  assert.equal(blocked.ok, false)
  assert.match(blocked.issue, /复活/)
})

test('a perfect retry refunds one revive and marks the point once it is answered correctly', () => {
  let state = runGate(emptyDrill(), 'p1', [0])
  const total = gateById('p1').questionIds.length
  assert.equal(describeGate(state, 'p1').cleared, true)
  assert.equal(describeGate(state, 'p1').canStartRetry, true)
  const before = learningReport(state)
  assert.equal(before.weak.length, 1)
  state = runGate(state, 'p1', [], 'retry')
  assert.equal(revivesLeft(state), 3)
  assert.equal(pointsOf(state), (total - 1) * 10 + 20 + 4)
  const after = learningReport(state)
  assert.equal(after.weak.length, 0)
  assert.equal(badgesOf(state).find((badge) => badge.id === 'refund').earned, true)
  assert.equal(badgesOf(state).find((badge) => badge.id === 'first').earned, true)
})

test('stored answers recompute correctness and merge without double counting', () => {
  const question = questionById('d1-1')
  const wrong = question.options.find((option) => option.id !== question.answer).id
  const normalized = normalizeDrill({
    log: [
      { questionId: 'd1-1', choice: wrong, correct: true, mode: 'gate', attempt: 1, at: 5 },
      { questionId: 'missing', choice: 'a', correct: true, mode: 'gate', attempt: 1, at: 6 },
      { questionId: 'd1-1', choice: question.answer, correct: true, mode: 'gate', attempt: 1, at: 9 },
    ],
  })
  assert.equal(normalized.log.length, 1)
  assert.equal(normalized.log[0].correct, false)
  assert.equal(normalized.log[0].choice, wrong)
  const base = emptyDrill()
  const first = acceptAnswer(base, { gateId: 'd1', questionId: 'd1-1', choice: question.answer, mode: 'gate' }, 1)
  assert.equal(first.ok, true)
  const secondId = gateById('d1').questionIds[1]
  const second = questionById(secondId)
  const local = acceptAnswer(first.drill, { gateId: 'd1', questionId: secondId, choice: second.answer, mode: 'gate' }, 2)
  assert.equal(local.ok, true)
  const merged = mergeDrill(local.drill, first.drill, first.drill)
  assert.equal(merged.log.length, 2)
  assert.equal(pointsOf(mergeDrill(local.drill, local.drill, local.drill)), pointsOf(local.drill))
  const groupsState = normalizeProgress({}, groups)
  const written = mergeForWrite(
    { ...groupsState, drill: local.drill, revision: 1 },
    { ...groupsState, drill: first.drill, revision: 3 },
    { ...groupsState, drill: first.drill, revision: 1 },
  )
  assert.equal(written.drill.log.length, 2)
  assert.equal(written.revision, 4)
})

test('the store records an answer and refuses a newer read-only record', () => {
  let current = normalizeProgress({}, groups)
  const store = createLearningStore({
    groups,
    read: () => ({ state: structuredClone(current), issue: '' }),
    write(_key, state) {
      current = structuredClone(state)
      return ''
    },
    readDraft: () => null,
    probe: async () => false,
    persist: 'manual',
  })
  const question = questionById(gateById('d1').questionIds[0])
  const saved = store.getState().answerDrill({
    gateId: 'd1',
    questionId: question.id,
    choice: question.answer,
    mode: 'gate',
  })
  assert.equal(saved.ok, true)
  store.getState().flushPersist()
  assert.equal(current.drill.log.length, 1)
  assert.equal(current.drill.log[0].correct, true)
  store.setState({ learningReadonly: true })
  const blocked = store.getState().answerDrill({
    gateId: 'd1',
    questionId: gateById('d1').questionIds[1],
    choice: 'a',
    mode: 'gate',
  })
  assert.equal(blocked.ok, false)
  assert.equal(current.drill.log.length, 1)
})

function lobbyWord(state, courseId) {
  const gates = DRILL_GATES.filter((gate) => gate.courseId === courseId)
  const plays = gates.map((gate) => describeGate(state, gate.id))
  const cleared = plays.filter((play) => play?.cleared).length
  const here = plays.findIndex((play) => !play?.cleared)
  const started = here >= 0 && Boolean(plays[here]?.open)
  if (cleared === gates.length) return '已通过'
  if (started) return '进行中'
  if (cleared > 0) return `第 ${here + 1} 关`
  return '可以开始'
}

test('the atlas roads match the lobby and do not carry question stems', () => {
  assert.deepEqual(
    DRILL_ROADS.map((course) => ({
      id: course.id,
      title: course.title,
      gates: course.gates.map((gate) => [gate.id, ...gate.questionIds]),
    })),
    DRILL_COURSES.map((course) => ({
      id: course.id,
      title: course.title,
      gates: DRILL_GATES.filter((gate) => gate.courseId === course.id).map((gate) => [gate.id, ...gate.questionIds]),
    })),
  )
  assert.equal(JSON.stringify(DRILL_ROADS).includes('stem'), false)
  const samples = [
    emptyDrill(),
    acceptAnswer(emptyDrill(), {
      gateId: 'd1',
      questionId: gateById('d1').questionIds[0],
      choice: questionById(gateById('d1').questionIds[0]).answer,
      mode: 'gate',
    }, 5).drill,
    runGate(emptyDrill(), 'd1', Array.from({ length: gateById('d1').questionIds.length - neededCorrect(gateById('d1').questionIds.length) }, (_, index) => index)),
  ]
  for (const state of samples) {
    for (const face of drillRoadFaces(state.log)) {
      assert.equal(face.state, lobbyWord(state, face.id), face.id)
    }
  }
})
