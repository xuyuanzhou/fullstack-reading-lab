/** 从课文 promptAnswer 生成还没进选择题的卷。正确项是该课结论，不改已经发布的题。 */
import { readFileSync, writeFileSync } from 'node:fs'

const index = JSON.parse(readFileSync(new URL('../web/src/data/curriculum-index.json', import.meta.url), 'utf8'))
const usedSrc = [
  'drillBank.ts',
  'drillSpine.ts',
  'drillMoreDesign.ts',
  'drillMoreSql.ts',
  'drillMorePerf.ts',
  'drillNextDesign.ts',
  'drillNextSql.ts',
  'drillNextPerf.ts',
  'drillFurtherDesign.ts',
  'drillFurtherSql.ts',
  'drillFurtherPerf.ts',
  'drillLaterDesign.ts',
  'drillLaterSql.ts',
  'drillLaterPerf.ts',
].map((name) => readFileSync(new URL(`../web/src/data/${name}`, import.meta.url), 'utf8')).join('\n')
const used = new Set([...usedSrc.matchAll(/lessonId: '([^']+)'/g)].map((match) => match[1]))

const courses = [
  { id: 'lang', title: '语言与类型', lead: '先分清这门语言在哪跑、值怎么存、名字能不能再赋值，再谈类型标注。', prefix: 'k', groups: ['frontend / 语言基础', 'frontend / TypeScript'] },
  { id: 'browser', title: '浏览器与样式', lead: '先分清文档、事件和样式各做哪一步，再谈弹层、表单和滚动。', prefix: 'br', groups: ['frontend / 浏览器', 'frontend / CSS 与布局'] },
  { id: 'react', title: 'React', lead: '组件、参数和状态各管一件事。Hook 按调用顺序挂上，更新不会当场改掉这一次的值。', prefix: 're', groups: ['frontend / React', 'frontend / React 生态'] },
  { id: 'vue', title: 'Vue', lead: '模板描述要输出的 HTML。脚本里改的是 ref 的 value，页面绑的是代理上的属性。', prefix: 'vu', groups: ['frontend / Vue', 'frontend / Vue 生态'] },
  { id: 'client', title: '跨端与选型', lead: '先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。', prefix: 'cx', groups: ['frontend / 技术选型', 'frontend / 微前端', 'frontend / React Native', 'frontend / Flutter', 'frontend / UniApp 与 Taro', 'frontend / Node.js'] },
  { id: 'java', title: 'Java 基础', lead: '字节码在虚拟机里跑。基本类型存的是值，局部变量必须先赋值。', prefix: 'jb', groups: ['java / Java 基础'] },
  { id: 'pattern', title: '模式与算法', lead: '先指出变化落在创建、结构还是行为，再谈某一种模式或某一种查找。', prefix: 'pt', groups: ['java / 设计模式', 'java / 算法'] },
  { id: 'spring', title: 'Spring 与数据访问', lead: '容器负责把对象接上。超卖、映射和检索仍要按这一次的写入和查询核对。', prefix: 'sg', groups: ['java / Spring', 'java / MyBatis', 'java / 搜索'] },
  { id: 'secure', title: '安全与 Netty', lead: '先分清谁校验、谁持有连接、字节在哪一层被读走。', prefix: 'nx', groups: ['frontend / 安全', 'java / 安全', 'java / Netty'] },
  { id: 'rest', title: '其余课程', lead: '这些结论还没有单独成卷。每一题仍只回答这一问。', prefix: 'rs', groups: [] },
]

function sentence(text) {
  const flat = text.replace(/\s+/g, ' ').trim()
  let end = 0
  let count = 0
  for (let index = 0; index < flat.length && count < 2; index += 1) {
    if ('。！？'.includes(flat[index])) {
      count += 1
      end = index + 1
      if (end >= 28) break
    }
  }
  if (end >= 12) return flat.slice(0, Math.min(end, 140)).trim()
  return flat.slice(0, 120).trim()
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

const lessons = []
for (const lesson of index.lessons) {
  const key = `${lesson.track} / ${lesson.group}`
  if (used.has(lesson.id)) continue
  const answer = (lesson.promptAnswer || '').replace(/\s+/g, ' ').trim()
  if (answer.length < 24) continue
  const line = sentence(answer)
  if (line.length < 8) continue
  lessons.push({
    group: key,
    id: lesson.id,
    title: lesson.title,
    prompt: lesson.prompt.replace(/\s+/g, ' ').trim(),
    answer,
    line,
  })
}

const pools = new Map(courses.filter((course) => course.id !== 'rest').map((course) => [course.id, []]))
const leftover = []
for (const course of courses) {
  if (course.id === 'rest') continue
  const rows = lessons.filter((lesson) => course.groups.includes(lesson.group))
  const keep = Math.floor(rows.length / 10) * 10
  pools.set(course.id, rows.slice(0, keep))
  leftover.push(...rows.slice(keep))
}
const restKeep = Math.floor(leftover.length / 10) * 10
pools.set('rest', leftover.slice(0, restKeep))
const omitted = leftover.slice(restKeep)

function distractors(line, pool) {
  const ranked = pool
    .filter((item) => item.line !== line)
    .map((item) => ({ item, score: similar(line, item.line) }))
    .filter((item) => item.score < 0.62)
    .sort((left, right) => left.score - right.score)
  const picked = []
  for (const candidate of ranked) {
    if (picked.some((item) => item.line === candidate.item.line)) continue
    if (candidate.item.line.includes(line) || line.includes(candidate.item.line)) continue
    picked.push(candidate.item)
    if (picked.length === 3) break
  }
  return picked
}

const points = []
const asks = []
const gates = []
const roads = []

for (const course of courses) {
  const rows = pools.get(course.id) || []
  const roadGates = []
  for (let offset = 0; offset < rows.length; offset += 10) {
    const slice = rows.slice(offset, offset + 10)
    const level = offset / 10 + 1
    const gateId = `${course.prefix}${level}`
    const groupName = slice[0].group.split(' / ')[1]
    const title = rows.length > 10 ? `${groupName} ${level}` : groupName
    const questionIds = []
    slice.forEach((lesson, index) => {
      const others = distractors(lesson.line, rows.length > 12 ? rows : lessons)
      if (others.length < 3) throw new Error(`not enough distractors for ${lesson.id}`)
      const questionId = `${gateId}-${index + 1}`
      const pointId = `cv-${lesson.id}`
      questionIds.push(questionId)
      points.push({
        id: pointId,
        courseId: course.id,
        title: lesson.title.length > 28 ? `${lesson.title.slice(0, 27)}…` : lesson.title,
        lessonId: lesson.id,
        summary: lesson.line,
      })
      asks.push({
        id: questionId,
        pointId,
        stem: lesson.prompt,
        texts: [others[0].line, lesson.line, others[1].line, others[2].line],
        answer: 'b',
        explain: lesson.answer.length > 24 ? lesson.answer : `${lesson.title}。${lesson.answer}`,
        whyWrong: {
          a: `这一句是「${others[0].title}」的结论，答的不是这一问。`,
          c: `这一句是「${others[1].title}」的结论，答的不是这一问。`,
          d: `这一句是「${others[2].title}」的结论，答的不是这一问。`,
        },
      })
    })
    gates.push({
      id: gateId,
      courseId: course.id,
      level,
      title,
      lead: course.lead,
      questionIds,
    })
    roadGates.push({ id: gateId, questionIds })
  }
  if (roadGates.length) roads.push({ id: course.id, title: course.title, gates: roadGates })
}

const asksText = asks.map((ask) => `  ${JSON.stringify(ask)}`).join(',\n')
const cover = `/** 由 scripts/build-drill-cover.mjs 生成。正确项是课文结论，接在已有卷之后。 */
import type { MoreAsk } from './drillMoreDesign.ts'

export const COVER_COURSES = ${JSON.stringify(courses.filter((course) => pools.get(course.id)?.length).map(({ id, title, lead }) => ({ id, title, lead })), null, 2)} as const

export const COVER_POINTS = ${JSON.stringify(points, null, 2)}

export const COVER_ASKS: MoreAsk[] = [
${asksText},
]

export const COVER_GATES = ${JSON.stringify(gates, null, 2)}
`
const roadFile = `/** 总图用的卷号和题号，不含题干。由 scripts/build-drill-cover.mjs 生成。 */
export const COVER_ROADS = ${JSON.stringify(roads, null, 2)}
`
writeFileSync(new URL('../web/src/data/drillCover.ts', import.meta.url), cover)
writeFileSync(new URL('../web/src/data/drillCoverRoads.ts', import.meta.url), roadFile)
console.log(JSON.stringify({
  courses: roads.length,
  gates: gates.length,
  questions: asks.length,
  omitted: omitted.map((lesson) => lesson.id),
}, null, 2))
