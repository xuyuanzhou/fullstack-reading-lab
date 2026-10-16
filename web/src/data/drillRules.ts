/**
 * 选择题闯关的规则。积分、通关、复活和徽章都从 log 推导，便于两页合并。
 *
 * - 每关必须按题号答完，正确率达到 80% 才通关。
 * - 上一关通关后才解锁下一关。三门课互不挡。
 * - 第一次整关尝试不消耗复活。再开一关尝试消耗 1 次。
 * - 错题按上一轮答错的顺序重练。这一轮错题全部练对，补回 1 次复活（总数不超过上限）。
 */
import {
  DRILL_COURSES,
  DRILL_GATES,
  DRILL_POINTS,
  DRILL_QUESTIONS,
  courseById,
  gateById,
  gatesInCourse,
  pointById,
  questionById,
  type DrillCourseId,
  type OptionId,
} from './drillBank.ts'

export const DRILL_PASS_PERCENT = 80
export const DRILL_REVIVE_START = 2
export const DRILL_REVIVE_CAP = 3
export const DRILL_LOG_CAP = 480
export const DRILL_POINT_FIRST = 10
export const DRILL_POINT_LATER = 6
export const DRILL_POINT_PRACTICE = 4
export const DRILL_POINT_CLEAR = 20
export const DRILL_POINT_PERFECT = 10

export type DrillMode = 'gate' | 'retry'

export type DrillAnswer = {
  questionId: string
  choice: OptionId
  correct: boolean
  mode: DrillMode
  attempt: number
  at: number
}

export type DrillState = {
  log: DrillAnswer[]
}

export type DrillAttemptInput = {
  gateId: string
  questionId: string
  choice: string
  mode: DrillMode
}

export type DrillBadge = {
  id: string
  title: string
  detail: string
  earned: boolean
}

export type GateSnapshot = {
  unlocked: boolean
  cleared: boolean
  completedAttempts: number
  bestPercent: number
  revives: number
  canStartGate: boolean
  canStartRetry: boolean
  nextGateAttempt: number
  nextRetryAttempt: number
  open: { mode: DrillMode; attempt: number; nextId: string; answered: number; total: number } | null
  last: { correct: number; total: number; percent: number; passed: boolean; wrongIds: string[] } | null
}

const OPTIONS = new Set<OptionId>(['a', 'b', 'c', 'd'])

export function emptyDrill(): DrillState {
  return { log: [] }
}

export function neededCorrect(total: number) {
  let count = 0
  while (count * 100 < total * DRILL_PASS_PERCENT) count += 1
  return count
}

export function percentOf(correct: number, total: number) {
  if (total <= 0) return 0
  return Math.floor((correct * 100) / total)
}

export function ratePassed(correct: number, total: number) {
  return total > 0 && correct * 100 >= total * DRILL_PASS_PERCENT
}

function isOption(value: string): value is OptionId {
  return OPTIONS.has(value as OptionId)
}

function isMode(value: unknown): value is DrillMode {
  return value === 'gate' || value === 'retry'
}

export function normalizeDrill(value: unknown): DrillState {
  const saved = value && typeof value === 'object' ? value as { log?: unknown } : {}
  const rows = Array.isArray(saved.log) ? saved.log : []
  const parsed: unknown[] = [...rows]
  parsed.sort((left, right) => {
    const leftAt = left && typeof left === 'object' && typeof (left as { at?: unknown }).at === 'number' ? (left as { at: number }).at : 0
    const rightAt = right && typeof right === 'object' && typeof (right as { at?: unknown }).at === 'number' ? (right as { at: number }).at : 0
    return leftAt - rightAt
  })
  const kept: DrillAnswer[] = []
  const seen = new Set<string>()
  for (const row of parsed) {
    if (!row || typeof row !== 'object') continue
    const item = row as Partial<DrillAnswer>
    const question = typeof item.questionId === 'string' ? questionById(item.questionId) : undefined
    if (!question || !isMode(item.mode) || typeof item.choice !== 'string' || !isOption(item.choice)) continue
    if (typeof item.attempt !== 'number' || !Number.isInteger(item.attempt) || item.attempt < 1 || item.attempt > 99) continue
    if (typeof item.at !== 'number' || !Number.isFinite(item.at)) continue
    const key = `${item.mode}:${item.attempt}:${question.id}`
    if (seen.has(key)) continue
    seen.add(key)
    kept.push({
      questionId: question.id,
      choice: item.choice,
      correct: question.answer === item.choice,
      mode: item.mode,
      attempt: item.attempt,
      at: item.at,
    })
  }
  kept.sort((left, right) => left.at - right.at || left.questionId.localeCompare(right.questionId))
  const capped = kept.length > DRILL_LOG_CAP ? kept.slice(kept.length - DRILL_LOG_CAP) : kept
  return { log: capped }
}

function sameLog(left: DrillAnswer[], right: DrillAnswer[]) {
  return JSON.stringify(left) === JSON.stringify(right)
}

export function mergeDrill(local: DrillState, remote: DrillState, base: DrillState): DrillState {
  const left = normalizeDrill(local)
  const right = normalizeDrill(remote)
  const prior = normalizeDrill(base)
  if (sameLog(left.log, prior.log)) return right
  const seen = new Set(right.log.map(answerKey))
  const baseKeys = new Set(prior.log.map(answerKey))
  const extra = left.log.filter((row) => !baseKeys.has(answerKey(row)) && !seen.has(answerKey(row)))
  return normalizeDrill({ log: [...right.log, ...extra] })
}

function answerKey(row: DrillAnswer) {
  return `${row.mode}:${row.attempt}:${row.questionId}:${row.at}`
}

function rowsFor(log: DrillAnswer[], gateId: string, mode: DrillMode) {
  const gate = gateById(gateId)
  if (!gate) return []
  const ids = new Set(gate.questionIds)
  return log.filter((row) => row.mode === mode && ids.has(row.questionId))
}

function byAttempt(rows: DrillAnswer[]) {
  const map = new Map<number, DrillAnswer[]>()
  for (const row of rows) {
    const list = map.get(row.attempt) ?? []
    list.push(row)
    map.set(row.attempt, list)
  }
  return [...map.entries()].sort((left, right) => left[0] - right[0])
}

function covers(rows: DrillAnswer[], ids: string[]) {
  if (!ids.length) return false
  const have = new Set(rows.map((row) => row.questionId))
  return ids.every((id) => have.has(id))
}

function correctCount(rows: DrillAnswer[], ids: string[]) {
  const byId = new Map(rows.map((row) => [row.questionId, row]))
  return ids.reduce((sum, id) => sum + (byId.get(id)?.correct ? 1 : 0), 0)
}

function wrongIds(rows: DrillAnswer[], ids: string[]) {
  const byId = new Map(rows.map((row) => [row.questionId, row]))
  return ids.filter((id) => byId.get(id)?.correct === false)
}

function minAt(rows: DrillAnswer[]) {
  return rows.reduce((min, row) => Math.min(min, row.at), Number.POSITIVE_INFINITY)
}

function maxAt(rows: DrillAnswer[]) {
  return rows.reduce((max, row) => Math.max(max, row.at), 0)
}

function completedPairs(log: DrillAnswer[], gateId: string) {
  const gate = gateById(gateId)
  if (!gate) return []
  return byAttempt(rowsFor(log, gateId, 'gate')).filter(([, rows]) => covers(rows, gate.questionIds))
}

function refundCount(log: DrillAnswer[], gateId: string) {
  const gate = gateById(gateId)
  if (!gate) return 0
  const completed = completedPairs(log, gateId)
  const retries = byAttempt(rowsFor(log, gateId, 'retry'))
  let count = 0
  for (let index = 0; index < completed.length; index += 1) {
    const wrong = wrongIds(completed[index][1], gate.questionIds)
    if (!wrong.length) continue
    const start = maxAt(completed[index][1])
    const end = completed[index + 1] ? minAt(completed[index + 1][1]) : Number.POSITIVE_INFINITY
    const hit = retries.find(([, rows]) => minAt(rows) > start && minAt(rows) < end && wrong.every((id) => rows.some((row) => row.questionId === id && row.correct)))
    if (hit) count += 1
  }
  return count
}

export function revivesLeft(state: DrillState) {
  const log = state.log
  let extra = 0
  let refunds = 0
  for (const gate of DRILL_GATES) {
    extra += Math.max(0, byAttempt(rowsFor(log, gate.id, 'gate')).length - 1)
    refunds += refundCount(log, gate.id)
  }
  return Math.min(DRILL_REVIVE_CAP, Math.max(0, DRILL_REVIVE_START - extra + refunds))
}

export function pointsOf(state: DrillState) {
  let points = 0
  for (const gate of DRILL_GATES) {
    const pairs = byAttempt(rowsFor(state.log, gate.id, 'gate'))
    const first = pairs[0]?.[0]
    for (const [attempt, rows] of pairs) {
      for (const row of rows) {
        if (row.correct) points += attempt === first ? DRILL_POINT_FIRST : DRILL_POINT_LATER
      }
    }
    const completed = pairs.filter(([, rows]) => covers(rows, gate.questionIds))
    if (completed.some(([, rows]) => ratePassed(correctCount(rows, gate.questionIds), gate.questionIds.length))) {
      points += DRILL_POINT_CLEAR
    }
    if (completed.some(([, rows]) => correctCount(rows, gate.questionIds) === gate.questionIds.length)) {
      points += DRILL_POINT_PERFECT
    }
    const retries = byAttempt(rowsFor(state.log, gate.id, 'retry'))
    for (let index = 0; index < completed.length; index += 1) {
      const wrong = wrongIds(completed[index][1], gate.questionIds)
      if (!wrong.length) continue
      const start = maxAt(completed[index][1])
      const end = completed[index + 1] ? minAt(completed[index + 1][1]) : Number.POSITIVE_INFINITY
      const seen = new Set<string>()
      for (const [, rows] of retries) {
        for (const row of [...rows].sort((left, right) => left.at - right.at)) {
          if (row.at <= start || row.at >= end || !wrong.includes(row.questionId) || !row.correct || seen.has(row.questionId)) continue
          seen.add(row.questionId)
          points += DRILL_POINT_PRACTICE
        }
      }
    }
  }
  return points
}

function isCleared(log: DrillAnswer[], gateId: string) {
  const gate = gateById(gateId)
  if (!gate) return false
  return completedPairs(log, gateId).some(([, rows]) => ratePassed(correctCount(rows, gate.questionIds), gate.questionIds.length))
}

export function gateUnlocked(state: DrillState, gateId: string) {
  const gate = gateById(gateId)
  if (!gate) return false
  const list = gatesInCourse(gate.courseId)
  const index = list.findIndex((item) => item.id === gateId)
  if (index < 0) return false
  if (index === 0) return true
  return isCleared(state.log, list[index - 1].id)
}

export function describeGate(raw: DrillState, gateId: string): GateSnapshot | null {
  const gate = gateById(gateId)
  if (!gate) return null
  const state = raw.log ? raw : emptyDrill()
  const log = state.log
  const total = gate.questionIds.length
  const unlocked = gateUnlocked(state, gateId)
  const pairs = byAttempt(rowsFor(log, gateId, 'gate'))
  const completed = completedPairs(log, gateId)
  const cleared = isCleared(log, gateId)
  const lastPair = completed.at(-1)
  const last = lastPair
    ? {
        correct: correctCount(lastPair[1], gate.questionIds),
        total,
        percent: percentOf(correctCount(lastPair[1], gate.questionIds), total),
        passed: ratePassed(correctCount(lastPair[1], gate.questionIds), total),
        wrongIds: wrongIds(lastPair[1], gate.questionIds),
      }
    : null
  const bestCorrect = completed.reduce((best, [, rows]) => Math.max(best, correctCount(rows, gate.questionIds)), 0)
  const completeNumbers = new Set(completed.map(([attempt]) => attempt))
  const highestComplete = completeNumbers.size ? Math.max(...completeNumbers) : 0
  const openGate = [...pairs].reverse().find(([attempt, rows]) => attempt > highestComplete && !covers(rows, gate.questionIds))
  const retries = byAttempt(rowsFor(log, gateId, 'retry'))
  const lastEnd = lastPair ? maxAt(lastPair[1]) : 0
  const openRetry = last && last.wrongIds.length
    ? [...retries].reverse().find(([, rows]) => minAt(rows) > lastEnd && !covers(rows, last.wrongIds))
    : undefined
  const open = openGate
    ? {
        mode: 'gate' as const,
        attempt: openGate[0],
        nextId: gate.questionIds.find((id) => !openGate[1].some((row) => row.questionId === id)) || gate.questionIds[0],
        answered: openGate[1].length,
        total,
      }
    : openRetry
      ? {
          mode: 'retry' as const,
          attempt: openRetry[0],
          nextId: last!.wrongIds.find((id) => !openRetry[1].some((row) => row.questionId === id)) || last!.wrongIds[0],
          answered: openRetry[1].length,
          total: last!.wrongIds.length,
        }
      : null
  const revives = revivesLeft(state)
  const nextGateAttempt = pairs.length ? Math.max(...pairs.map(([attempt]) => attempt)) + 1 : 1
  const nextRetryAttempt = retries.length ? Math.max(...retries.map(([attempt]) => attempt)) + 1 : 1
  return {
    unlocked,
    cleared,
    completedAttempts: completed.length,
    bestPercent: completed.length ? percentOf(bestCorrect, total) : 0,
    revives,
    canStartGate: unlocked && !cleared && !open && (completed.length === 0 || revives > 0),
    canStartRetry: Boolean(last && last.wrongIds.length && !open),
    nextGateAttempt,
    nextRetryAttempt,
    open,
    last,
  }
}

function uniqueAt(log: DrillAnswer[], at: number) {
  const used = new Set(log.map((row) => row.at))
  let next = Number.isFinite(at) ? Math.trunc(at) : 0
  if (next < 1) next = 1
  while (used.has(next)) next += 1
  return next
}

export function acceptAnswer(raw: DrillState, input: DrillAttemptInput, now: number) {
  const state = normalizeDrill(raw)
  const question = questionById(input.questionId)
  const gate = gateById(input.gateId)
  if (!question || !gate || !gate.questionIds.includes(question.id) || !isOption(input.choice)) {
    return { ok: false as const, issue: input.choice && isOption(input.choice) ? '题目和这一关对不上。' : '选项无效。', questionId: '' }
  }
  const play = describeGate(state, gate.id)
  if (!play || !play.unlocked) return { ok: false as const, issue: '这一关还锁着。', questionId: '' }

  let attempt = 0
  let expected = ''
  if (input.mode === 'gate') {
    if (play.cleared) return { ok: false as const, issue: '这一关已经通过。', questionId: '' }
    if (play.open?.mode === 'retry') return { ok: false as const, issue: '请先答完正在进行的题目。', questionId: '' }
    if (play.open?.mode === 'gate') {
      attempt = play.open.attempt
      expected = play.open.nextId
    } else if (play.canStartGate) {
      attempt = play.nextGateAttempt
      expected = gate.questionIds[0]
    } else if (play.completedAttempts > 0 && play.revives < 1) {
      return { ok: false as const, issue: '复活次数已经用完。', questionId: '' }
    } else {
      return { ok: false as const, issue: '请按顺序作答。', questionId: '' }
    }
  } else {
    if (play.open?.mode === 'gate') return { ok: false as const, issue: '请先答完正在进行的题目。', questionId: '' }
    if (!play.last?.wrongIds.length) return { ok: false as const, issue: '没有可重练的错题。', questionId: '' }
    if (play.open?.mode === 'retry') {
      attempt = play.open.attempt
      expected = play.open.nextId
    } else if (play.canStartRetry) {
      attempt = play.nextRetryAttempt
      expected = play.last.wrongIds[0]
    } else {
      return { ok: false as const, issue: '没有可重练的错题。', questionId: '' }
    }
  }
  if (question.id !== expected) return { ok: false as const, issue: '请按顺序作答。', questionId: '' }

  const answer: DrillAnswer = {
    questionId: question.id,
    choice: input.choice,
    correct: question.answer === input.choice,
    mode: input.mode,
    attempt,
    at: uniqueAt(state.log, now),
  }
  return { ok: true as const, issue: '', questionId: question.id, drill: normalizeDrill({ log: [...state.log, answer] }) }
}

export function badgesOf(state: DrillState): DrillBadge[] {
  const cleared = (courseId: DrillCourseId) => gatesInCourse(courseId).every((gate) => isCleared(state.log, gate.id))
  const anyClear = DRILL_GATES.some((gate) => isCleared(state.log, gate.id))
  const perfect = DRILL_GATES.some((gate) => completedPairs(state.log, gate.id).some(([, rows]) => correctCount(rows, gate.questionIds) === gate.questionIds.length))
  const refunded = DRILL_GATES.some((gate) => refundCount(state.log, gate.id) > 0)
  const specs = [
    { id: 'first', title: '第一关', detail: '任一关达到 80%。', earned: anyClear },
    { id: 'design', title: '系统设计', detail: '系统设计三关都已通过。', earned: cleared('design') },
    { id: 'sql', title: 'SQL 优化', detail: 'SQL 优化三关都已通过。', earned: cleared('sql') },
    { id: 'perf', title: '性能排查', detail: '服务性能排查三关都已通过。', earned: cleared('perf') },
    { id: 'all', title: '三卷', detail: '三门课全部通过。', earned: cleared('design') && cleared('sql') && cleared('perf') },
    { id: 'perfect', title: '全对', detail: '有一关全部答对。', earned: perfect },
    { id: 'refund', title: '错题回补', detail: '一组错题全部练对，补回过复活。', earned: refunded },
    { id: 'hundred', title: '一百分', detail: '积分达到 100。', earned: pointsOf(state) >= 100 },
  ]
  return specs
}

export type PointReport = {
  pointId: string
  title: string
  courseId: DrillCourseId
  lessonId: string
  summary: string
  answered: number
  correct: number
  weak: boolean
}

export function learningReport(raw: DrillState) {
  const state = normalizeDrill(raw)
  const latest = new Map<string, DrillAnswer>()
  for (const row of state.log) latest.set(row.questionId, row)
  const points: PointReport[] = DRILL_POINTS.map((point) => {
    const questions = DRILL_QUESTIONS.filter((item) => item.pointId === point.id)
    const answers = questions.map((item) => latest.get(item.id)).filter((item): item is DrillAnswer => Boolean(item))
    const correct = answers.filter((item) => item.correct).length
    return {
      pointId: point.id,
      title: point.title,
      courseId: point.courseId,
      lessonId: point.lessonId,
      summary: point.summary,
      answered: answers.length,
      correct,
      weak: answers.some((item) => !item.correct),
    }
  })
  const answered = points.reduce((sum, point) => sum + point.answered, 0)
  const correct = points.reduce((sum, point) => sum + point.correct, 0)
  const courses = DRILL_COURSES.map((course) => {
    const gates = gatesInCourse(course.id)
    const coursePoints = points.filter((point) => point.courseId === course.id)
    const courseAnswered = coursePoints.reduce((sum, point) => sum + point.answered, 0)
    const courseCorrect = coursePoints.reduce((sum, point) => sum + point.correct, 0)
    return {
      id: course.id,
      title: course.title,
      cleared: gates.filter((gate) => isCleared(state.log, gate.id)).length,
      total: gates.length,
      answered: courseAnswered,
      correct: courseCorrect,
      percent: percentOf(courseCorrect, courseAnswered),
    }
  })
  return {
    answered,
    correct,
    percent: percentOf(correct, answered),
    points: pointsOf(state),
    revives: revivesLeft(state),
    badges: badgesOf(state),
    courses,
    weak: points.filter((point) => point.weak),
    pending: points.filter((point) => point.answered === 0).length,
  }
}

export function courseTitle(id: string) {
  return courseById(id)?.title || ''
}

export function pointTitle(id: string) {
  return pointById(id)?.title || ''
}
