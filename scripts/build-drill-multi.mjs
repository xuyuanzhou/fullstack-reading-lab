/** 从课文结论生成多选题。正确项是同一课的两句或三句，不改已经发布的单选。 */
import { readFileSync, writeFileSync } from 'node:fs'

const index = JSON.parse(readFileSync(new URL('../web/src/data/curriculum-index.json', import.meta.url), 'utf8'))

/** 按课文分组进已有章节。不够 10 题也成关，不另开「多选」卷。 */
const CHAPTERS = [
  { id: 'lang', existing: true, prefix: 'xla', groups: ['frontend / 语言基础', 'frontend / TypeScript'] },
  { id: 'browser', existing: true, prefix: 'xbr', groups: ['frontend / 浏览器', 'frontend / CSS 与布局'] },
  { id: 'react', existing: true, prefix: 'xre', groups: ['frontend / React', 'frontend / React 生态'] },
  { id: 'vue', existing: true, prefix: 'xvu', groups: ['frontend / Vue', 'frontend / Vue 生态'] },
  { id: 'client', existing: true, prefix: 'xcx', groups: ['frontend / 技术选型', 'frontend / 微前端', 'frontend / React Native', 'frontend / Flutter', 'frontend / UniApp 与 Taro', 'frontend / Node.js'] },
  { id: 'java', existing: true, prefix: 'xjb', groups: ['java / Java 基础'] },
  { id: 'pattern', existing: true, prefix: 'xpt', groups: ['java / 设计模式', 'java / 算法'] },
  { id: 'jvm', existing: false, prefix: 'xjv', title: 'JVM', lead: '先分清栈上的帧、堆上的对象，以及这次停顿落在哪一次回收。', groups: ['java / JVM'] },
  { id: 'conc', existing: false, prefix: 'xcc', title: '并发', lead: '先写清这次谁先看到写入，再谈锁、池和可见性。', groups: ['java / 并发'] },
  { id: 'sql', existing: true, prefix: 'xsq', groups: ['java / 数据库'] },
  { id: 'cache', existing: false, prefix: 'xca', title: '缓存', lead: '权威在数据库。缓存只保留这次读得到、删得掉的那一份。', groups: ['java / 缓存'] },
  { id: 'spring', existing: true, prefix: 'xsg', groups: ['java / Spring', 'java / MyBatis', 'java / JPA', 'java / 搜索'] },
  { id: 'secure', existing: true, prefix: 'xnx', groups: ['frontend / 安全', 'frontend / 网络与安全', 'java / 安全', 'java / Netty'] },
  { id: 'nginx', existing: false, prefix: 'xng', title: 'Nginx', lead: '先分清这次是在等上游，还是在本机把请求转走。', groups: ['java / Nginx'] },
  { id: 'gateway', existing: false, prefix: 'xgw', title: '网关', lead: '超时从外到内变短。网关先断开时，里面的事务可能还在提交。', groups: ['java / 网关'] },
  { id: 'mq', existing: false, prefix: 'xmq', title: '消息队列', lead: '先写清这条消息会到几次，失败后留在哪。', groups: ['java / 消息队列'] },
  { id: 'sca', existing: false, prefix: 'xsc', title: 'Spring Cloud Alibaba', lead: '注册、配置和限流各看这一次调用，不并成一个超时。', groups: ['java / Spring Cloud Alibaba', 'java / Sentinel'] },
  { id: 'design', existing: true, prefix: 'xdg', groups: ['java / 系统设计'] },
  { id: 'dist', existing: false, prefix: 'xdi', title: '分布式与高并发', lead: '先写清这一次不变量落在哪一个库，再谈拆开之后怎么对上同一次事实。', groups: ['java / 分布式与高并发'] },
  { id: 'ship', existing: false, prefix: 'xsh', title: '交付与运行', lead: '镜像、流水线和这次发布要看见的失败，先分开再谈上线。', groups: ['java / 交付与运行'] },
  { id: 'test', existing: false, prefix: 'xte', title: '测试', lead: '一道断言锁住一种看得见的结果。替身库证明不了生产引擎。', groups: ['frontend / 测试', 'java / 测试'] },
  { id: 'spine', existing: true, prefix: 'xsp', groups: ['frontend / 全栈主线', 'java / 全栈主线'] },
  { id: 'work', existing: false, prefix: 'xwk', title: '工程实践', lead: '这次提交、这次排障和这次协作，先写清看见了什么。', groups: ['frontend / 工程实践', 'java / 工程实践'] },
  { id: 'rest', existing: true, prefix: 'xrs', groups: [] },
]
const PATTERNS = [
  ['a', 'b'],
  ['c', 'd'],
  ['a', 'c'],
  ['b', 'd'],
  ['a', 'd'],
  ['b', 'c'],
  ['a', 'b', 'c'],
  ['b', 'c', 'd'],
]

function chapterOf(lesson) {
  const key = `${lesson.track} / ${lesson.group}`
  return CHAPTERS.find((chapter) => chapter.groups.includes(key)) ?? CHAPTERS.find((chapter) => chapter.id === 'rest')
}

function grams(text) {
  const compact = text.replace(/\s/g, '')
  const set = new Set()
  for (let index = 0; index < compact.length - 1; index += 1) set.add(compact.slice(index, index + 2))
  return set
}

function similar(left, right) {
  const a = grams(left)
  const b = grams(right)
  let shared = 0
  for (const item of a) if (b.has(item)) shared += 1
  return shared / (a.size + b.size - shared || 1)
}

function sentences(text) {
  const flat = text.replace(/\s+/g, ' ').trim()
  const parts = []
  let start = 0
  for (let index = 0; index < flat.length; index += 1) {
    if ('。！？'.includes(flat[index])) {
      const piece = flat.slice(start, index + 1).trim()
      if (piece.length >= 16 && piece.length <= 140) parts.push(piece)
      start = index + 1
    }
  }
  const kept = []
  for (const part of parts) {
    if (kept.some((item) => similar(item, part) >= 0.72)) continue
    if (kept.some((item) => item.includes(part) || part.includes(item))) continue
    kept.push(part)
    if (kept.length === 3) break
  }
  return kept
}

const lessons = []
const pool = []
for (const lesson of index.lessons) {
  const truths = sentences(lesson.promptAnswer || '')
  if (truths.length < 2) continue
  const row = {
    courseId: chapterOf(lesson).id,
    track: lesson.track,
    group: lesson.group,
    id: lesson.id,
    title: lesson.title,
    prompt: (lesson.prompt || '').replace(/\s+/g, ' ').trim(),
    answer: (lesson.promptAnswer || '').replace(/\s+/g, ' ').trim(),
    truths,
  }
  lessons.push(row)
  for (const text of truths) pool.push({ lessonId: lesson.id, title: lesson.title, text })
}

function overlaps(left, right) {
  return left === right || left.includes(right) || right.includes(left)
}

function distractors(corrects, lessonId, count) {
  const ranked = pool
    .filter((item) => item.lessonId !== lessonId)
    .map((item) => ({ item, score: Math.max(...corrects.map((line) => similar(line, item.text))) }))
    .filter((item) => item.score < 0.58 && !corrects.some((line) => overlaps(line, item.item.text)))
    .sort((left, right) => left.score - right.score)
  const picked = []
  const seen = new Set()
  const allowSameSource = [false, true]
  for (const relaxed of allowSameSource) {
    for (const candidate of ranked) {
      if (seen.has(candidate.item.text)) continue
      if (!relaxed && picked.some((item) => item.lessonId === candidate.item.lessonId)) continue
      picked.push(candidate.item)
      seen.add(candidate.item.text)
      if (picked.length === count) return picked
    }
  }
  return picked
}

let serial = 0
function choosePattern(truthCount) {
  const index = serial
  serial += 1
  const preferred = PATTERNS[index % PATTERNS.length]
  if (truthCount >= preferred.length) return preferred
  return PATTERNS[index % 6]
}

function buildQuestion(lesson, id, pointId) {
  const pattern = choosePattern(lesson.truths.length)
  const corrects = lesson.truths.slice(0, pattern.length)
  const wrongs = distractors(corrects, lesson.id, 4 - pattern.length)
  if (wrongs.length < 4 - pattern.length) {
    serial -= 1
    return null
  }
  const letters = ['a', 'b', 'c', 'd']
  const options = letters.map((letter) => ({ id: letter, text: '' }))
  const whyWrong = {}
  let wrongIndex = 0
  for (const letter of letters) {
    if (pattern.includes(letter)) {
      options.find((option) => option.id === letter).text = corrects[pattern.indexOf(letter)]
    } else {
      const wrong = wrongs[wrongIndex]
      wrongIndex += 1
      options.find((option) => option.id === letter).text = wrong.text
      whyWrong[letter] = `这一句是「${wrong.title}」的结论，不是这一问要选的说法。`
    }
  }
  const prompt = lesson.prompt || lesson.title
  const stem = prompt.length > 160 ? `选出所有正确的说法。${lesson.title}` : `选出所有正确的说法。${prompt}`
  const explain = lesson.answer.length > 24 ? lesson.answer.slice(0, 360).trim() : corrects.join('')
  return {
    id,
    pointId,
    stem,
    options,
    answer: pattern[0],
    answers: [...pattern].sort(),
    explain: explain.length > 24 ? explain : `${lesson.title}。${explain}`,
    whyWrong,
  }
}

const points = []
const questions = []
const gates = []
const roads = []
const skipped = []

function takeAll(list) {
  const built = []
  for (const lesson of list) {
    const question = buildQuestion(lesson, 'tmp', `mx-${lesson.id}`)
    if (!question) {
      skipped.push(lesson.id)
      continue
    }
    built.push({ lesson, question })
  }
  return built
}

function commit(course, built, title, level, roadGates) {
  const gateId = `${course.prefix}${level}`
  const questionIds = []
  built.forEach((item, index) => {
    const questionId = `${gateId}-${index + 1}`
    item.question.id = questionId
    questionIds.push(questionId)
    questions.push(item.question)
    points.push({
      id: item.question.pointId,
      courseId: course.id,
      title: item.lesson.title.length > 28 ? `${item.lesson.title.slice(0, 27)}…` : item.lesson.title,
      lessonId: item.lesson.id,
      summary: item.lesson.truths[0],
    })
  })
  gates.push({
    id: gateId,
    courseId: course.id,
    level,
    title,
    lead: '选出所有正确项。少选或多选都算错。',
    questionIds,
  })
  roadGates.push({ id: gateId, questionIds })
}

const extra = []

function gateTitle(course, group, track) {
  const tracks = new Set(lessons.filter((lesson) => lesson.courseId === course.id && lesson.group === group).map((lesson) => lesson.track))
  if (tracks.size < 2) return group
  return `${track === 'frontend' ? '前端' : 'Java'} · ${group}`
}

for (const course of CHAPTERS) {
  const rows = lessons.filter((lesson) => lesson.courseId === course.id)
  const byGroup = new Map()
  for (const lesson of rows) {
    const key = `${lesson.track} / ${lesson.group}`
    const list = byGroup.get(key) ?? []
    list.push(lesson)
    byGroup.set(key, list)
  }
  const ordered = course.groups.length ? course.groups.filter((key) => byGroup.has(key)) : [...byGroup.keys()]
  const roadGates = []
  let level = 0
  for (const key of ordered) {
    const built = takeAll(byGroup.get(key))
    if (!built.length) continue
    level += 1
    commit(course, built, gateTitle(course, built[0].lesson.group, built[0].lesson.track), level, roadGates)
  }
  if (!roadGates.length) continue
  const road = { id: course.id, title: course.title, gates: roadGates }
  if (course.existing) extra.push({ id: course.id, gates: roadGates })
  else roads.push(road)
}

const courses = roads.map(({ id, title }) => {
  const chapter = CHAPTERS.find((item) => item.id === id)
  return { id, title, lead: chapter.lead }
})
const questionText = questions.map((question) => `  ${JSON.stringify(question)}`).join(',\n')
const body = `/** 由 scripts/build-drill-multi.mjs 生成。正确项是同一课的结论，至少两项。 */
import type { DrillQuestion } from './drillBank.ts'

export const MULTI_COURSES = ${JSON.stringify(courses, null, 2)} as const

export const MULTI_POINTS = ${JSON.stringify(points, null, 2)}

export const MULTI_QUESTIONS: DrillQuestion[] = [
${questionText},
]

export const MULTI_GATES = ${JSON.stringify(gates, null, 2)}
`
const roadFile = `/** 总图用的章节关号，不含题干。由 scripts/build-drill-multi.mjs 生成。 */
export const MULTI_EXTRA = ${JSON.stringify(extra, null, 2)}

export const MULTI_ROADS = ${JSON.stringify(roads, null, 2)}
`
writeFileSync(new URL('../web/src/data/drillMulti.ts', import.meta.url), body)
writeFileSync(new URL('../web/src/data/drillMultiRoads.ts', import.meta.url), roadFile)
const sizes = gates.map((gate) => gate.questionIds.length)
console.log(JSON.stringify({
  newCourses: courses.map((course) => course.id),
  extra: extra.map((item) => item.id),
  gates: gates.length,
  questions: questions.length,
  shortest: Math.min(...sizes),
  longest: Math.max(...sizes),
  skipped: skipped.length,
}, null, 2))
