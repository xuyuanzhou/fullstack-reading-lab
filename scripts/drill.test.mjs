import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import {
  DRILL_COURSES,
  DRILL_GATES,
  DRILL_POINTS,
  DRILL_QUESTIONS,
  correctChoices,
  gateById,
  gatesInCourse,
  isMultiQuestion,
  pointById,
  questionById,
} from '../web/src/data/drillBank.ts'
import { DRILL_BLOCKS, DRILL_ROADS, drillRoadFaces } from '../web/src/data/drillOutline.ts'
import {
  DRILL_REVIVE_START,
  acceptAnswer,
  badgesOf,
  describeGate,
  dropOpenAttempt,
  emptyDrill,
  examOutOfReach,
  learningReport,
  mergeDrill,
  neededCorrect,
  normalizeDrill,
  pathExamCleared,
  percentOf,
  pointsOf,
  revivesLeft,
} from '../web/src/data/drillRules.ts'
import { bossGates } from '../web/src/data/bossExam.ts'
import { MASTERY_GATES } from '../web/src/data/masteryGates.ts'
import { gateCleared } from '../web/src/data/learningPaths.ts'
import { createLearningStore } from '../web/src/state/learningStore.ts'
import { mergeForWrite, normalizeProgress } from '../web/src/state/progressStorage.ts'

const groups = () => ['全栈主线']

test('each gate has four choices, one answer, and a lesson', () => {
  const nav = JSON.parse(readFileSync(new URL('../web/src/data/curriculum-nav.json', import.meta.url), 'utf8'))
  const lessons = new Set(nav.lessons.map((lesson) => lesson.id))
  assert.equal(DRILL_COURSES.length, 25)
  assert.equal(DRILL_GATES.length, 134)
  assert.equal(DRILL_QUESTIONS.length, 1387)
  assert.equal(neededCorrect(5), 4)
  assert.equal(neededCorrect(10), 8)
  const answers = { a: 0, b: 0, c: 0, d: 0 }
  const multiMarks = { a: 0, b: 0, c: 0, d: 0 }
  let multiCount = 0
  const points = new Set()
  const ids = new Set()
  for (const gate of DRILL_GATES) {
    assert.ok(gate.questionIds.length >= 1, gate.id)
    assert.equal(new Set(gate.questionIds).size, gate.questionIds.length, gate.id)
    if (!gate.id.startsWith('x')) assert.equal(gate.questionIds.length, 10, gate.id)
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
    const right = correctChoices(question)
    assert.ok(right.length >= 1 && right.length <= 3, question.id)
    if (right.length > 1) {
      multiCount += 1
      assert.equal(question.stem.startsWith('选出所有正确的说法'), true, question.id)
      for (const id of right) multiMarks[id] += 1
    } else answers[question.answer] += 1
    for (const option of question.options) {
      if (right.includes(option.id)) assert.equal(question.whyWrong[option.id], undefined)
      else assert.ok(question.whyWrong[option.id]?.length > 8, `${question.id} ${option.id}`)
    }
    points.add(question.pointId)
    assert.equal(ids.has(question.id), false, question.id)
    ids.add(question.id)
  }
  assert.equal(ids.size, DRILL_QUESTIONS.length)
  assert.equal(points.size, DRILL_POINTS.length)
  assert.ok(multiCount > 0)
  const counts = Object.values(answers)
  assert.ok(Math.max(...counts) - Math.min(...counts) <= 4, JSON.stringify(answers))
  const spread = Object.values(multiMarks)
  assert.ok(Math.max(...spread) - Math.min(...spread) <= Math.ceil(multiCount / 5), JSON.stringify(multiMarks))
})

test('multi choice counts only when every correct option is selected', () => {
  const gate = DRILL_GATES.find((item) => gatesInCourse(item.courseId)[0]?.id === item.id && isMultiQuestion(questionById(item.questionIds[0])))
  const question = questionById(gate.questionIds[0])
  const mark = correctChoices(question).join('')
  assert.ok(mark.length >= 2)
  const saved = acceptAnswer(emptyDrill(), { gateId: gate.id, questionId: question.id, choice: mark, mode: 'gate' }, 3)
  assert.equal(saved.ok, true)
  assert.equal(saved.drill.log[0].correct, true)
  const missing = acceptAnswer(emptyDrill(), { gateId: gate.id, questionId: question.id, choice: mark[0], mode: 'gate' }, 4)
  assert.equal(missing.ok, true)
  assert.equal(missing.drill.log[0].correct, false)
  const extraLetter = ['a', 'b', 'c', 'd'].find((id) => !mark.includes(id))
  const extra = acceptAnswer(emptyDrill(), { gateId: gate.id, questionId: question.id, choice: [...mark, extraLetter].sort().join(''), mode: 'gate' }, 5)
  assert.equal(extra.ok, true)
  assert.equal(extra.drill.log[0].correct, false)
  const unsorted = acceptAnswer(emptyDrill(), { gateId: gate.id, questionId: question.id, choice: [...mark].reverse().join(''), mode: 'gate' }, 6)
  assert.equal(unsorted.ok, false)
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

test('choice courses stay in curriculum blocks so neighbors continue', () => {
  const ids = DRILL_BLOCKS.flatMap((block) => [...block.courseIds])
  assert.deepEqual([...ids].sort(), DRILL_ROADS.map((road) => road.id).sort())
  assert.equal(new Set(ids).size, ids.length)
  const java = DRILL_BLOCKS.find((block) => block.id === 'java')
  assert.deepEqual(
    java?.courseIds,
    ['java', 'pattern', 'jvm', 'conc', 'sql', 'cache', 'spring', 'secure', 'nginx', 'gateway', 'mq', 'sca', 'design', 'dist', 'ship'],
  )
  const front = DRILL_BLOCKS.find((block) => block.id === 'front')
  assert.deepEqual(front?.courseIds, ['lang', 'browser', 'react', 'vue', 'client'])
})

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

test('each path gate has a boss exam, and passing it is what clears the gate', () => {
  const exams = bossGates()
  const published = new Set(DRILL_QUESTIONS.map((question) => question.id))
  assert.equal(exams.length, MASTERY_GATES.length)
  for (const gate of MASTERY_GATES) {
    const exam = exams.find((item) => item.id === `xb-${gate.id}`)
    assert.ok(exam, gate.id)
    assert.equal(exam.courseId, 'boss')
    assert.ok(exam.questionIds.length >= 1 && exam.questionIds.length <= gate.lessons.length, gate.id)
    assert.equal(DRILL_GATES.some((item) => item.id === exam.id), false)
    for (const id of exam.questionIds) {
      assert.equal(published.has(id), false, id)
      assert.ok(questionById(id), id)
    }
    assert.equal(pathExamCleared(gate.id, []), false)
    assert.equal(
      gateCleared(gate, gate.lessons.map((lesson) => lesson.id), gate.outputs.map((_, index) => `${gate.id}:${index}`), false),
      false,
    )
  }
  const g1Gate = MASTERY_GATES.find((gate) => gate.id === 'g1')
  const g5Gate = MASTERY_GATES.find((gate) => gate.id === 'g5')
  assert.equal(gateById('xb-g1').questionIds.length, g1Gate.lessons.length)
  assert.equal(gateById('xb-g5').questionIds.length, g5Gate.lessons.length)
  const covered = gateById('xb-g5').questionIds.map((id) => pointById(questionById(id).pointId).lessonId)
  for (const lesson of g5Gate.lessons) assert.ok(covered.includes(lesson.id), lesson.id)
  for (const id of gateById('xb-g5').questionIds) {
    const question = questionById(id)
    if (!question.pointId.startsWith('xb-')) continue
    assert.equal(question.options.length, 4, id)
    assert.ok(question.explain.length > 20, id)
    for (const option of question.options) {
      if (correctChoices(question).includes(option.id)) continue
      assert.ok(question.whyWrong[option.id]?.length > 8, `${id} ${option.id}`)
    }
  }
  assert.ok(gateById('xb-g1').questionIds.some((id) => isMultiQuestion(questionById(id))))
  const exam = gateById('xb-g6')
  let missed = emptyDrill()
  let at = 7000
  for (const id of exam.questionIds) {
    const question = questionById(id)
    const wrong = question.options.find((option) => !correctChoices(question).includes(option.id)).id
    const saved = acceptAnswer(missed, { gateId: exam.id, questionId: id, choice: wrong, mode: 'gate' }, at)
    assert.equal(saved.ok, true, saved.issue)
    missed = saved.drill
    at += 1
  }
  assert.equal(pathExamCleared('g6', missed.log), false)
  assert.equal(describeGate(missed, exam.id).canStartGate, true)
  let passed = emptyDrill()
  at = 8000
  for (const id of exam.questionIds) {
    const question = questionById(id)
    const saved = acceptAnswer(passed, {
      gateId: exam.id,
      questionId: id,
      choice: correctChoices(question).join(''),
      mode: 'gate',
    }, at)
    assert.equal(saved.ok, true, saved.issue)
    passed = saved.drill
    at += 1
  }
  const g6 = MASTERY_GATES.find((gate) => gate.id === 'g6')
  assert.equal(pathExamCleared('g6', passed.log), true)
  assert.equal(describeGate(passed, exam.id).cleared, true)
  assert.equal(
    gateCleared(g6, g6.lessons.map((lesson) => lesson.id), g6.outputs.map((_, index) => `${g6.id}:${index}`), pathExamCleared('g6', passed.log)),
    true,
  )
  assert.equal(describeGate(emptyDrill(), exam.id).unlocked, true)
})

test('a boss exam can restart once the remaining questions cannot reach 80%', () => {
  const exam = gateById('xb-g6')
  let state = emptyDrill()
  let at = 9000
  for (let index = 0; index < 2; index += 1) {
    const question = questionById(exam.questionIds[index])
    const wrong = question.options.find((option) => !correctChoices(question).includes(option.id)).id
    const saved = acceptAnswer(state, { gateId: exam.id, questionId: question.id, choice: wrong, mode: 'gate' }, at)
    assert.equal(saved.ok, true, saved.issue)
    state = saved.drill
    at += 1
  }
  const play = describeGate(state, exam.id)
  assert.equal(examOutOfReach(play.open.correct, play.open.answered, play.open.total), true)
  const dropped = dropOpenAttempt(state, exam.id)
  assert.equal(describeGate(dropped, exam.id).open, null)
  assert.equal(describeGate(dropped, exam.id).canStartGate, true)
  assert.equal(dropOpenAttempt(state, 'd1').log.length, state.log.length)
})
