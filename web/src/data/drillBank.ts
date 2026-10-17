/** 系统设计、SQL、性能、主线，以及语言、界面、Java 等卷。正确项对齐课文结论。 */
import type { MoreAsk } from './drillMoreDesign.ts'
import { DESIGN_FURTHER, DESIGN_FURTHER_POINTS } from './drillFurtherDesign.ts'
import { DESIGN_LATER, DESIGN_LATER_POINTS } from './drillLaterDesign.ts'
import { DESIGN_MORE, DESIGN_POINTS } from './drillMoreDesign.ts'
import { DESIGN_NEXT, DESIGN_NEXT_POINTS } from './drillNextDesign.ts'
import { PERF_FURTHER, PERF_FURTHER_POINTS } from './drillFurtherPerf.ts'
import { PERF_LATER, PERF_LATER_POINTS } from './drillLaterPerf.ts'
import { PERF_MORE, PERF_POINTS } from './drillMorePerf.ts'
import { PERF_NEXT, PERF_NEXT_POINTS } from './drillNextPerf.ts'
import { SQL_FURTHER, SQL_FURTHER_POINTS } from './drillFurtherSql.ts'
import { SQL_LATER, SQL_LATER_POINTS } from './drillLaterSql.ts'
import { SQL_MORE, SQL_POINTS } from './drillMoreSql.ts'
import { SQL_NEXT, SQL_NEXT_POINTS } from './drillNextSql.ts'
import { SPINE_ASKS, SPINE_POINTS } from './drillSpine.ts'
import { COVER_ASKS, COVER_COURSES, COVER_GATES, COVER_POINTS } from './drillCover.ts'
import { EVO_ASKS, EVO_POINTS } from './drillEvolution.ts'
import { MULTI_COURSES, MULTI_GATES, MULTI_POINTS, MULTI_QUESTIONS } from './drillMulti.ts'
import { BOSS_COURSE, bossGateById, bossPointById, bossQuestionById, installBossExams } from './bossExam.ts'

export type DrillCourseId = 'design' | 'sql' | 'perf' | 'spine' | 'lang' | 'browser' | 'react' | 'vue' | 'client' | 'java' | 'pattern' | 'spring' | 'secure' | 'rest' | 'jvm' | 'conc' | 'cache' | 'nginx' | 'gateway' | 'mq' | 'sca' | 'dist' | 'ship' | 'test' | 'work' | 'evo' | 'boss'
export type OptionId = 'a' | 'b' | 'c' | 'd'

export type DrillCourse = {
  id: DrillCourseId
  title: string
  lead: string
}

export type DrillPoint = {
  id: string
  courseId: DrillCourseId
  title: string
  lessonId: string
  summary: string
}

export type DrillQuestion = {
  id: string
  pointId: string
  stem: string
  options: { id: OptionId; text: string }[]
  answer: OptionId
  /** 两项及以上才是多选。少选、多选都算错。 */
  answers?: OptionId[]
  explain: string
  whyWrong: Partial<Record<OptionId, string>>
}

const OPTION_IDS = ['a', 'b', 'c', 'd'] as const

export function correctChoices(question: DrillQuestion): OptionId[] {
  const many = question.answers?.filter((id): id is OptionId => (OPTION_IDS as readonly string[]).includes(id))
  const unique = many ? [...new Set(many)].sort() : []
  if (unique.length > 1) return unique
  return [question.answer]
}

export function isMultiQuestion(question: DrillQuestion) {
  return correctChoices(question).length > 1
}

export function canonicalChoice(value: string) {
  if (value.length < 1 || value.length > 4) return null
  const letters = [...value]
  if (new Set(letters).size !== letters.length) return null
  if (!letters.every((letter) => (OPTION_IDS as readonly string[]).includes(letter))) return null
  const sorted = [...letters].sort().join('')
  return sorted === value ? sorted : null
}

export function choiceMatches(question: DrillQuestion, choice: string) {
  return canonicalChoice(choice) === correctChoices(question).join('')
}

export type DrillGate = {
  id: string
  courseId: DrillCourseId
  level: number
  title: string
  lead: string
  questionIds: string[]
}

export const DRILL_COURSES: DrillCourse[] = [
  {
    id: 'design',
    title: '系统设计',
    lead: '先写清一条路径和必须成立的事实，再决定要不要拆、要不要加组件。',
  },
  {
    id: 'sql',
    title: 'SQL 优化',
    lead: '先看执行计划和检查行数，再改索引、分页和锁，不用口诀代替计划。',
  },
  {
    id: 'perf',
    title: '服务性能排查',
    lead: '先分开是哪一种资源、哪一跳、哪一种超时，再动堆、池和重试。',
  },
  {
    id: 'spine',
    title: '全栈主线',
    lead: '先走通一笔写入：页面、契约、用例和持久化各管一件事，再谈授权、测试和发布。',
  },
  ...COVER_COURSES,
  ...MULTI_COURSES.map((course) => ({ id: course.id as DrillCourseId, title: course.title, lead: course.lead })),
  {
    id: 'evo',
    title: '演进全流程',
    lead: '同一笔订单从单体走到事务选型。没有量到的瓶颈就停在当前站。',
  },
]

const DRILL_POINT_BASE: DrillPoint[] = [
  { id: 'path', courseId: 'design', title: '一条请求路径', lessonId: 'arch-chapter-aim', summary: '先写清一条路径上的读写、权威数据和失败，再谈拆分与中间件。' },
  { id: 'monolith', courseId: 'design', title: '单体何时够用', lessonId: 'arch-monolith-when', summary: '模块化单体仍是一个进程；边界没划清就拆进程，会变成跨网络的纠缠。' },
  { id: 'scale-out', courseId: 'design', title: '先扩展应用', lessonId: 'arch-scale-before-split', summary: '应用先满、库仍有余量时，给无状态应用加副本，会话放到共享存储。' },
  { id: 'sync-fail', courseId: 'design', title: '失败要当场可见', lessonId: 'arch-sync-vs-async', summary: '用户必须马上看到失败时用同步返回；消息适合传播已经发生的事实。' },
  { id: 'idempotent-key', courseId: 'design', title: '幂等键与唯一约束', lessonId: 'idempotency', summary: '超时和重试会把同一次业务再送进来，要靠幂等键加唯一约束挡住第二次插入。' },
  { id: 'stock', courseId: 'design', title: '库存不变量', lessonId: 'distributed-seckill', summary: '限流和缓存只削峰；成功订单数不能超过可售库存，最终靠原子条件更新。' },
  { id: 'cache-race', courseId: 'design', title: '删缓存后的旧值', lessonId: 'cache-db-double-write-race', summary: '写库成功后删缓存，并发回填仍可能把旧行写回去。' },
  { id: 'cache-aside', courseId: 'design', title: '旁路缓存', lessonId: 'cache-aside-steps', summary: '权威在数据库。未命中时读库回填，写库成功后再删除缓存键。' },
  { id: 'one-db', courseId: 'design', title: '能同库就一次提交', lessonId: 'distributed-one-db-first', summary: '不变量能放进同一个库时，一次本地事务是最便宜的一起成功。' },
  { id: 'redis-authority', courseId: 'design', title: '缓存不是权威', lessonId: 'redis-vs-db-cache', summary: '数据库负责权威状态，Redis 不会自动和库保持一致。' },
  { id: 'bulkhead', courseId: 'design', title: '按下游分开并发', lessonId: 'distributed-bulkhead', summary: '不同下游用分开的并发配额；格子满了就失败，不要无限排队。' },
  { id: 'write-retry', courseId: 'design', title: '写操作的重复调用', lessonId: 'dubbo-timeout-retry-idempotent', summary: '消费方超时不会停掉提供方线程；写入要关重试，或用唯一约束挡住再插。' },
  { id: 'minimum-path', courseId: 'design', title: '最小可行路径', lessonId: 'design-review', summary: '先用条件更新守住不变量。数据库被证明先到顶，才加缓存或队列。' },
  { id: 'evolve', courseId: 'design', title: '有信号才进入下一站', lessonId: 'arch-evolution-stages', summary: '容量线和服务化线不是必走的阶梯；没有可量化瓶颈就停在当前站。' },
  { id: 'retry-step', courseId: 'design', title: '每一步的重试条件', lessonId: 'distributed-seckill', summary: '限流失败可以再进；预扣失败不能再扣；重复回补要被同一个业务键挡住。' },
  { id: 'mysql-role', courseId: 'sql', title: '库负责事务和权威数据', lessonId: 'mysql-what-and-when', summary: 'MySQL 管关系数据上的事务和权威数据，不是搜索引擎或缓存的替代。' },
  { id: 'select-star', courseId: 'sql', title: '星号与覆盖', lessonId: 'mysql-select-star', summary: 'SELECT * 仍可走过滤索引；Using index 要求用到的列都来自同一棵索引。' },
  { id: 'or-in', courseId: 'sql', title: 'OR 与 IN', lessonId: 'mysql-or-not-must-become-in', summary: '同一列上的 OR 和 IN 计划常常相近；跨列 OR 才要单独看计划。' },
  { id: 'join-plan', courseId: 'sql', title: 'JOIN 看计划', lessonId: 'mysql-join-ban-not-absolute', summary: '有合适索引时 JOIN 常常是嵌套循环探查；禁令要落在执行计划上。' },
  { id: 'explain-analyze', courseId: 'sql', title: '估计与实测', lessonId: 'mysql-explain-analyze', summary: 'EXPLAIN 是优化器估计；EXPLAIN ANALYZE 会执行语句并报告实际行数。' },
  { id: 'leftmost', courseId: 'sql', title: '组合索引从左列用起', lessonId: 'mysql-index', summary: '组合索引从左向右匹配。只用最右边的列，用不上这条索引。' },
  { id: 'selectivity', courseId: 'sql', title: '低区分度是成本', lessonId: 'mysql-low-selectivity-index-heuristic', summary: '低区分度单独索引常常帮不上过滤，还要付写维护；是否保留看执行计划。' },
  { id: 'index-write', courseId: 'sql', title: '索引的写维护', lessonId: 'mysql-prefix-index-and-cost', summary: '索引能少扫行，也会让 INSERT、UPDATE、DELETE 多维护一棵树。' },
  { id: 'func-col', courseId: 'sql', title: '函数包住索引列', lessonId: 'mysql-where-func-blocks-index', summary: '对索引列套函数，优化器往往无法把它收成简单范围；计算应留在常量一侧。' },
  { id: 'convert', courseId: 'sql', title: '类型不一致挡住索引', lessonId: 'mysql-implicit-convert-breaks-index', summary: '比较时类型不一致导致转换，会让索引路径变贵或用不上。' },
  { id: 'row-lock', courseId: 'sql', title: '行锁在索引记录上', lessonId: 'mysql-innodb-index-lock', summary: 'InnoDB 行锁加在索引记录和间隙上；扫很多记录仍是记录锁，不是改成了表锁。' },
  { id: 'keyset', courseId: 'sql', title: '深分页用上一页的键', lessonId: 'sql-keyset-page', summary: '大 OFFSET 仍要先产生再丢掉前面的行；深页用上一页最后一行的排序键继续取。' },
  { id: 'n-plus-one', courseId: 'sql', title: '列表上的 N+1', lessonId: 'jpa-session-nplus1', summary: '循环访问延迟关联会再发查询。按这一次用例把要的行一次取齐。' },
  { id: 'deadlock', courseId: 'sql', title: '死锁重试整笔事务', lessonId: 'mysql-deadlock', summary: '死锁会回滚受害事务。从业务入口重试整笔事务，不要只补最后一条语句。' },
  { id: 'real-engine', courseId: 'sql', title: '替身库证明不了生产引擎', lessonId: 'testcontainers-real-db', summary: '内存库验证的是接线。方言、锁和隔离要在真实引擎上用少量测试证明。' },
  { id: 'resource', courseId: 'perf', title: '先看哪种资源饱和', lessonId: 'server-slow-which-resource', summary: '机器慢先看 CPU、磁盘、内存谁在排队。重启前留下利用率和等待。' },
  { id: 'slow-span', courseId: 'perf', title: '改最慢的那一跳', lessonId: 'backend-tune-the-span', summary: '语句慢改 SQL，借连接慢看池，停顿落在回收才动堆。堆缩短不了全表扫描。' },
  { id: 'one-trace', courseId: 'perf', title: '一次请求一条追踪', lessonId: 'request-trace-one-hop', summary: '网关、服务、连接池和 SQL 挂在同一条 trace 上，用 span 分开各跳的时间。' },
  { id: 'pool-wait', courseId: 'perf', title: '借连接超时', lessonId: 'hikari-pool-timeout', summary: 'connectionTimeout 是等池里的连接。查询还没开始，它不限制 SQL 跑多久。' },
  { id: 'gc-pause', courseId: 'perf', title: '回收停顿与分配', lessonId: 'java-gc', summary: '先把接口延迟和 GC 暂停对上时间。回收次数多不等于用户请求变慢。' },
  { id: 'connect-timeout', courseId: 'perf', title: '建连超时', lessonId: 'java-http-timeout', summary: 'connectTimeout 只限制建立新连接，管不到这一次请求等待响应的时间。' },
  { id: 'timeout-chain', courseId: 'perf', title: '超时从外到内变短', lessonId: 'gateway-timeout-chain', summary: '调用方等得最久，里面更短。网关先断开时，上游事务可能还在提交。' },
  { id: 'nginx-wait', courseId: 'perf', title: '代理在等上游', lessonId: 'nginx-proxy-timeout', summary: 'proxy_read_timeout 是两次从上游读取之间的等待，不是 Java 线程池的超时。' },
  { id: 'provider-live', courseId: 'perf', title: '提供方线程还在跑', lessonId: 'dubbo-timeout-retry-idempotent', summary: '消费方放弃等待后，提供方线程默认继续。默认失败后还会再调用。' },
  { id: 'sentinel-block', courseId: 'perf', title: '规则拦截', lessonId: 'sca-sentinel-block', summary: 'Sentinel 按规则拒绝进入，业务方法没执行。这不是下游超时。' },
  { id: 'cache-three', courseId: 'perf', title: '雪崩、击穿与穿透', lessonId: 'distributed-cache', summary: '雪崩是大量键一起失效，击穿是一个热点回源，穿透是请求根本不存在的数据。' },
  { id: 'aside-write', courseId: 'perf', title: '写路径删除缓存键', lessonId: 'cache-aside-steps', summary: '旁路缓存不挡在写路径中间。写数据库成功后再删除缓存键。' },
  { id: 'producer-brake', courseId: 'perf', title: '生产端背压', lessonId: 'mq-backpressure-producer', summary: '积压是生产持续快于消费。分区不够时，只加消费者会空转。' },
  { id: 'dead-letter', courseId: 'perf', title: '死信与积压年龄', lessonId: 'mq-dlq-backlog', summary: '再试也一定失败的消息要离开主队列。积压要看深度和最早一条的年龄。' },
  { id: 'isolate-pool', courseId: 'perf', title: '慢下游占满池', lessonId: 'distributed-bulkhead', summary: '共用一个池时，最慢的下游会堵住所有请求。舱满应失败，而不是无限排队。' },
]

export const DRILL_POINTS: DrillPoint[] = [
  ...DRILL_POINT_BASE,
  ...DESIGN_POINTS,
  ...SQL_POINTS,
  ...PERF_POINTS,
  ...DESIGN_NEXT_POINTS,
  ...SQL_NEXT_POINTS,
  ...PERF_NEXT_POINTS,
  ...DESIGN_FURTHER_POINTS,
  ...SQL_FURTHER_POINTS,
  ...PERF_FURTHER_POINTS,
  ...DESIGN_LATER_POINTS,
  ...SQL_LATER_POINTS,
  ...PERF_LATER_POINTS,
  ...SPINE_POINTS,
  ...MULTI_POINTS.map((point) => ({ ...point, courseId: point.courseId as DrillCourseId })),
  ...COVER_POINTS.map((point) => ({ ...point, courseId: point.courseId as DrillCourseId })),
  ...EVO_POINTS,
]

const OPT = ['a', 'b', 'c', 'd'] as const

function ask(
  id: string,
  pointId: string,
  stem: string,
  texts: [string, string, string, string],
  answer: OptionId,
  explain: string,
  whyWrong: Partial<Record<OptionId, string>>,
): DrillQuestion {
  return {
    id,
    pointId,
    stem,
    options: OPT.map((key, index) => ({ id: key, text: texts[index] })),
    answer,
    explain,
    whyWrong,
  }
}

const designQuestions: DrillQuestion[] = [
  ask(
    'd1-1',
    'path',
    '回答一道系统设计题，第一步应该先写清什么？',
    [
      '先列出准备使用的中间件名称。',
      '先把进程拆到尽量多。',
      '先写清一条用户可见路径上的读写、权威数据和失败。',
      '先给出一个与这条路径无关的全站 QPS。',
    ],
    'c',
    '系统设计这一章要求先写清一条路径的读写、权威数据和失败，再谈拆分与中间件。单体也可以是正确的停留点。',
    {
      a: '中间件名称还不是这条路径。组件名字解决不了读写和失败落在谁身上。',
      b: '还没写清路径就拆进程，边界往往仍缠在一起。',
      d: '容量要落在这条路径上。脱离路径的一个 QPS 说明不了谁先满。',
    },
  ),
  ask(
    'd1-2',
    'monolith',
    '什么情况下应先留在单体或模块化单体，而不是拆成多个进程？',
    [
      '模块和表的边界已经划清，发布也还不必拆开。',
      '日活一超过一千，就必须拆成微服务。',
      '单体不能加应用副本，所以一有流量就要拆进程。',
      '多个进程共用一个库，这就是模块化单体。',
    ],
    'a',
    '模块化单体仍是一个进程、一次部署，靠单向依赖和表归属把边界固定下来。边界没划清就拆进程，调用跨了网络，表却还缠在一起。',
    {
      b: '没有「日活一千必须拆」这条线。没有可量化的发布或容量信号，就停在当前形态。',
      c: '无状态应用可以先加副本。拆进程不是水平扩展的前提。',
      d: '模块化单体仍是单进程。多个进程共享一个库，不是模块化单体。',
    },
  ),
  ask(
    'd1-3',
    'scale-out',
    '应用层的 CPU 先打满，共享数据库仍有余量。下一步优先做什么？',
    [
      '立刻按表把库拆开。',
      '给无状态应用加副本，会话放到共享存储，而不是粘在某一台的内存里。',
      '把每次读都改成跨服务的同步调用。',
      '先上分布式事务，再谈要不要加副本。',
    ],
    'b',
    '水平扩展是加应用副本和负载均衡。前提是实例不保存必须粘在本机的会话。这一题里库还有余量；若瓶颈已经在库的锁、慢查询或连接上，只加副本会把库挤得更紧。',
    {
      a: '库还有余量时，拆库解决不了应用层先满。',
      c: '跨服务同步调用会把延迟叠上去，不是应用 CPU 打满后的第一步。',
      d: '能留在应用层扩展里解决的流量，不必先上分布式事务。',
    },
  ),
  ask(
    'd1-4',
    'sync-fail',
    '用户必须当场知道这次扣减失败了。这段结果应该怎么给？',
    [
      '只发消息，等消费者有空再通知用户。',
      '用同步请求把失败直接返回给这次调用。',
      '先返回成功，库存改由定时任务补。',
      '缓存里已经有数字，就当作扣减成功。',
    ],
    'b',
    '同步请求-响应适合失败必须当场可见的路径。异步消息适合把已经发生的事实传出去、把峰值削平，用户当时等不到这次失败。',
    {
      a: '消息不保证用户还停在这次请求上。当场要看见的失败，不能只放进队列。',
      c: '先返回成功会把失败藏起来，和「当场可见」相反。',
      d: '缓存里的数字不是权威扣减，不能当成已经成功。',
    },
  ),
  ask(
    'd1-5',
    'idempotent-key',
    '超时之后客户端把同一次下单又送了一次。怎样挡住第二张订单？',
    [
      '靠页面把按钮禁用掉。',
      '在某一台进程的内存里记下「已经下过」。',
      '用契约里的幂等键加数据库唯一约束；冲突时读回第一次的结果。',
      '把超时调长，让客户端来不及重试。',
    ],
    'c',
    '同一次业务会被双击、超时重试、网关重试或消息再投送进来。服务端用幂等键加唯一约束认出它。只有先查再插、没有约束，挡不住同时到达的两次。',
    {
      a: '禁用按钮只减少同一次页面上的双击，挡不住超时后的另一次请求。',
      b: '一台进程的内存不能跨副本，重启之后也留不住。',
      d: '把超时调长不会取消重试，已经发出的另一次请求仍会进来。',
    },
  ),
  ask(
    'd2-1',
    'stock',
    '入口已经限流。库存「成功订单数不能超过可售库存」还靠什么成立？',
    [
      '把缓存里的库存减到 0，就可以返回成功。',
      '最终扣减必须是原子的条件更新（或同等强度的事务）；影响行数是 1 才继续写订单。',
      '请求已经在排队，就可以跳过扣减。',
      '每个应用进程各记一份库存，结束时把数字相加。',
    ],
    'b',
    '限流、排队和缓存只减少峰值。成功订单数不能超过可售库存，最终扣减要靠原子条件更新。影响行数不是 1 的那次请求，不应再写出一张新订单。',
    {
      a: '缓存里的数字不是扣减本身，不能代替条件更新。',
      c: '排队没有取消库存不变量。',
      d: '进程内存里的数字挡不住并发，也不是一次原子更新。',
    },
  ),
  ask(
    'd2-2',
    'cache-race',
    '数据库已经写成功，随后删除了缓存键。为什么之后的读仍可能拿到旧值？',
    [
      '删除是同步返回的，所以之后的读一定看见新行。',
      '另一个请求可能读到旧行，又把旧行回填进缓存。',
      '数据库一提交，缓存会自动换成新行。',
      '只有「先删缓存再写库」会见到旧值，反过来不会。',
    ],
    'b',
    '旁路缓存的常见写路径是更新存储再删键。删除失败、删得太早或太晚，以及并发读把旧行写回缓存，旧值都会回来。',
    {
      a: '同步删键挡不住另一个请求在窗口里把旧行写回去。',
      c: '缓存不会因为数据库提交而自动更新。',
      d: '先写再删、先删再写都有窗口，不是只有一种顺序才会旧。',
    },
  ),
  ask(
    'd2-3',
    'cache-aside',
    '旁路缓存（缓存站在数据库旁边，由应用负责读写两边）里，权威状态在哪里？',
    [
      '权威在缓存。缓存写成功就可以不写数据库。',
      '权威在数据库。未命中时读库并回填；写库成功后再删除缓存键。',
      '两边同等权威。写库的同时必须把新值写进缓存，才算写完。',
      '只要缓存不过期，它就和数据库一样权威。',
    ],
    'b',
    '旁路缓存不挡在写路径中间，缓存也不会自己跟着库变。读未命中则读库回填，写库成功后再删键。',
    {
      a: '缓存不是权威状态。不写库，重启或淘汰之后这份状态就没了。',
      c: '这套路径是删除键，不是把写缓存当成和库同等的提交。',
      d: '去掉过期只会让旧值留得更久，不会让缓存变成权威。',
    },
  ),
  ask(
    'd2-4',
    'one-db',
    '订单合计必须等于明细之和，而且这两类行可以放进同一个库。应先怎么做？',
    [
      '先拆成两个服务，再用全局事务把它们包起来。',
      '用一次本地事务一起提交、一起回滚。',
      '分两次远程调用，在内存里记住哪一次成功了。',
      '只发消息，不把合计和明细写进库。',
    ],
    'b',
    '不变量能放进同一个库、用一次本地事务提交和回滚，这是最便宜的一起成功。全局事务是拆开之后用来补洞的，不是拆分的前提。',
    {
      a: '还不必拆开时先上全局事务，是把锁和协调的成本提前付掉。',
      c: '本地事务包不住已经发出去的远程调用，内存里的记号也不是提交。',
      d: '合计等于明细之和要落在同一次提交里，只发消息留不住这个等式。',
    },
  ),
  ask(
    'd2-5',
    'redis-authority',
    'Redis 里有一份订单状态，数据库里也有对应的行。以谁为准？',
    [
      '以延迟更低的那一份为准。',
      '以数据库为准。缓存不会自动和库保持一致。',
      '缓存一旦命中，就可以不再以库为准。',
      '去掉过期时间之后，缓存就是权威。',
    ],
    'b',
    '数据库负责权威状态。Redis 常用来放缓存和热状态，不会因为写进了缓存就自动和库一致。',
    {
      a: '更快只说明读得快，不说明这份值是提交后的权威状态。',
      c: '命中的可能是旧值。命中不能取消数据库的权威。',
      d: '不过期只是让旧值留下，不是把权威从库搬到缓存。',
    },
  ),
  ask(
    'd3-1',
    'bulkhead',
    '库存调用变慢，线程堆在库存上。怎样避免把登录也堵住？',
    [
      '所有下游共用一个无限排队的线程池。',
      '给库存单独的并发配额。这一格满了就失败，不占用登录那一格。',
      '把超时改成 0，让这次调用算成功。',
      '只把超时加长，池子仍然大家共用。',
    ],
    'b',
    '隔离按依赖分开并发：各自的线程池、连接池或舱位。格子满了应失败，而不是无限排队。限流限制速率，隔离限制这一格能占住的资源。',
    {
      a: '共用一个池时，最慢的下游会把所有请求堵住。无限排队只是把堵住藏进内存。',
      c: '超时为 0 不是成功，库存也没有扣成。',
      d: '只加超时而不拆池，慢调用仍占着入口上的线程。',
    },
  ),
  ask(
    'd3-2',
    'write-retry',
    '消费方等待超时后，按默认配置还会再调用提供方。下单写入怎样避免变成多笔订单？',
    [
      '把超时从 1 秒改成 5 秒，提供方已经开始的那次就会停掉。',
      '写入把重试关掉，或者用唯一约束把第二次插入挡住。',
      '消费方超时会中断提供方的业务线程，所以不会重复提交。',
      '读和写都保留默认重试，唯一约束只加在查询上。',
    ],
    'b',
    '超时发生在消费方。提供方那条线程默认还在跑。retries 默认 2，表示第一次之后还可以再调用 2 次。没有唯一业务键时，多次调用就是多笔订单。',
    {
      a: '加长超时只是让消费方多等一会儿，提供方已经开始的那次停不下来，之后默认仍会再试。',
      c: '消费方放弃等待，不会把提供方线程掐掉，插入仍可能提交。',
      d: '读可以保留重试。写要么关掉重试，要么用唯一约束挡住再插。',
    },
  ),
  ask(
    'd3-3',
    'minimum-path',
    '库存不能为负。缓存或队列应该在什么时候加进来？',
    [
      '先在图上写上缓存和队列的名字，不变量以后再补。',
      '先用数据库条件更新守住库存不为负。连接数、锁等待或延迟证明数据库先到顶，才加缓存或队列。',
      '队列可以代替还没写清的容量目标。',
      '缓存可以代替还没写清的一致性要求。',
    ],
    'b',
    '先问清峰值和正确性，画出一次请求碰到的数据，给出守住不变量的最小设计。每加一个组件，都要写明它去掉的瓶颈，以及它自己失败时订单怎样恢复。',
    {
      a: '组件名称不是架构。名字没有守住库存不为负。',
      c: '队列解决不了没定义的容量，只是把请求先堆起来。',
      d: '缓存解决不了没定义的一致性，命中值不会自动等于库。',
    },
  ),
  ask(
    'd3-4',
    'evolve',
    '从单体走到加副本、再谈到拆服务，什么时候才进入下一站？',
    [
      '按名词表逐格往前，每一格都要走到。',
      '有可量化的瓶颈才进入下一站；没有这个信号就停在当前站。',
      '加副本和拆微服务是同一件事。',
      '只要有用户，就应该离开单体。',
    ],
    'b',
    '演进要分成两条线：容量线解决扛不扛得住，服务化线才谈独立的数据和发布。谱系可以画全，但不是人人必走的阶梯。集群是同质副本，不是拆服务。',
    {
      a: '没有信号就逐格往前，会把用不上的形态提前付掉。',
      c: '加副本是容量线上的同质扩展。拆服务要看数据和发布是否已经分开。',
      d: '单体或模块化单体可以是正确的停留点。',
    },
  ),
  ask(
    'd3-5',
    'retry-step',
    '抢购链路里，预扣库存已经失败。同一次业务的重试应该怎样？',
    [
      '用同一个业务键把库存再扣一次。',
      '预扣失败不能再扣。限流失败可以再进；重复回补必须被同一个业务键挡住。',
      '换成一个新的业务键再扣，免得被唯一约束拦住。',
      '回补可以做很多次，库存加多了再靠对账删掉。',
    ],
    'b',
    '每一步的重试条件要分开写。限流失败可以再进；预扣失败不能再扣；回补重复必须被同一业务键挡住。对账用来发现差额，不是允许回补做两次。',
    {
      a: '预扣失败后再扣，会把同一次业务做成两次扣减。',
      c: '换一个新键会绕开「这是同一次业务」的识别，第二次扣减就挡不住了。',
      d: '重复回补会把库存加多。对账是事后核对，不是重复回补的理由。',
    },
  ),
]

const sqlQuestions: DrillQuestion[] = [
  ask(
    's1-1',
    'mysql-role',
    '在这套课程里，MySQL 负责什么？',
    [
      '代替搜索引擎，也代替缓存。',
      '负责关系数据上的事务和权威数据。',
      '只保存会话，事务交给缓存。',
      '作为文档库使用，行只是一种展示。',
    ],
    'b',
    'MySQL 是关系库，管事务和权威数据。搜索和缓存是旁边的系统，不是把它换掉的理由。',
    {
      a: '搜索走倒排索引那条线，缓存放热状态。两者都不接管库里的事务。',
      c: '会话可以外置到缓存，权威行和事务仍在库里。',
      d: 'JSON 列仍是关系行上的一列，不是把库换成文档库。',
    },
  ),
  ask(
    's1-2',
    'select-star',
    'SELECT * 和索引的关系，哪一种说法成立？',
    [
      '写了星号，WHERE 里的索引就一定用不上。',
      '星号仍可以走用来过滤的索引；「不用回表」要求用到的列都来自同一棵索引。',
      '只有星号才能覆盖，写出列名反而必须回表。',
      '星号会让优化器忽略 WHERE。',
    ],
    'b',
    '优化器看 WHERE、连接、GROUP BY 和 ORDER BY 能否用索引缩小范围，不取决于 SELECT 列表是不是星号。Extra 里的 Using index 是另一件事：用到的列都能从同一棵索引取出，才不必回表。星号要每一列，二级索引通常盖不住。',
    {
      a: '过滤索引仍可能被选中。用不上覆盖，不等于用不上过滤。',
      c: '星号要其余列，反而更难只读二级索引就结束。',
      d: 'WHERE 仍参与选择访问路径，不会因为星号被拿掉。',
    },
  ),
  ask(
    's1-3',
    'or-in',
    'WHERE 里出现 OR 时，应怎样判断能不能用上索引？',
    [
      'OR 在现行版本一定不能走索引，必须改成 IN。',
      '同一列上的 OR 和 IN 计划常常相近；跨列的 OR 要单独看执行计划。',
      '把 OR 改成 IN 之后就一定不必回表。',
      '出现 OR 会把这张表上的索引全部关掉。',
    ],
    'b',
    '同一列上的 a=1 OR a=2 和 a IN (1,2) 在现行优化器里常常是相近的计划。不同列上的 OR 才更常走出 index merge 或更差的路径。热点语句看 EXPLAIN，不要把旧版口诀当成永久禁令。',
    {
      a: '「OR 不能命中索引、必须改成 IN」把旧版现象写成了永久规则。',
      c: '改成 IN 只改变写法是否好读、计划是否相近，不保证覆盖、不必回表。',
      d: '一个 OR 不会把表上的索引全部关掉。',
    },
  ),
  ask(
    's1-4',
    'join-plan',
    '「禁止 JOIN」应当怎么用？',
    [
      'SQL 不允许 JOIN，写出来就是错的。',
      '这是容量上的提醒，不是禁用关键字。有没有扫太多行，看执行计划。',
      '优化器一见到 JOIN 就会全表扫描。',
      '两张表只要都有主键，就一定不能 JOIN。',
    ],
    'b',
    'JOIN 可以产生临时表或文件排序，但不是必然。有合适索引时，优化器常用嵌套循环按索引探查。真正危险的是大表对大表、过滤又推得很后。把本可以一次完成的联结拆成 N+1 次往返，往往更慢。',
    {
      a: 'JOIN 是 SQL 里的正常写法，不是语法错误。',
      c: '有索引时不一定全表扫描。计划里的访问类型和行数才是依据。',
      d: '主键的存在不构成「不能 JOIN」。没有可用索引的大表联结才需要警惕。',
    },
  ),
  ask(
    's1-5',
    'explain-analyze',
    'EXPLAIN 和 EXPLAIN ANALYZE 差在哪里？',
    [
      '两者都只是优化器的估计，ANALYZE 只是换成树状格式。',
      'EXPLAIN 是优化器估计；EXPLAIN ANALYZE 会执行语句，并报告实际行数和时间。',
      'EXPLAIN ANALYZE 只更新统计信息，不执行这条语句。',
      'EXPLAIN 会改写数据，ANALYZE 只读、所以更新语句也能对生产随便跑。',
    ],
    'b',
    'EXPLAIN 展示优化器预计的访问路径和估计行数。EXPLAIN ANALYZE 会真正执行可支持的语句，报告实际行数和时间。估计和实际差得远，再检查统计信息和谓词。更新类语句会真的执行，不能拿去对生产随便跑。',
    {
      a: 'ANALYZE 不是同一次估计的另一种排版，它包含实际执行。',
      c: '更新统计信息是 ANALYZE TABLE 那一类操作，不是 EXPLAIN ANALYZE。',
      d: 'EXPLAIN 本身不执行更新；EXPLAIN ANALYZE 会执行，更新语句因此不能对生产随便跑。',
    },
  ),
  ask(
    's2-1',
    'leftmost',
    '组合索引是 (user_id, status, created_at)。语句只有 WHERE status = ?，为什么常常用不上这条索引？',
    [
      '因为 status 写在 WHERE 里，优化器就必须用它。',
      '组合索引从左列用起。条件没有用上左边的 user_id，就用不上这条索引。',
      '因为三列索引最多只能服务 SELECT *。',
      '因为 created_at 在最后，所以整条索引失效。',
    ],
    'b',
    '组合索引按从左向右的列来用。条件用上了左边的列，右边的范围或排序才有机会用到后面的列。只给最右边或中间的列写条件，用不上这条组合索引。',
    {
      a: '写在 WHERE 里不等于优化器选了这条索引。左列没用上，这条路径就不匹配。',
      c: '能不能用这条索引，不取决于 SELECT 是不是星号。',
      d: '失效的原因是左列没有条件，不是因为最右列存在。',
    },
  ),
  ask(
    's2-2',
    'selectivity',
    '某一列取值很少。关于「不要给它建索引」，哪一种说法成立？',
    [
      '取值少的列禁止建任何索引，包括放在组合索引里。',
      '单独用它过滤常常很弱，更新时还要维护这棵树；留不留要看选择性和执行计划，不是看列名。',
      '取值少的列建了索引，优化器就一定会选它。',
      '取值少说明写这种列没有成本。',
    ],
    'b',
    '低区分度索引过滤弱，每次更新还要维护 B+ 树。写成绝对禁止会误伤「和其他列组合之后仍然有用」的情况。决策看选择性、写放大和 EXPLAIN。',
    {
      a: '和等值列组合之后，这一列仍可能放在右边帮忙过滤。绝对禁止会误伤这种用法。',
      c: '优化器按成本选择。区分度很差时，它仍可能不选这条索引。',
      d: '列上有索引，更新就要维护它。取值少不会让写维护消失。',
    },
  ),
  ask(
    's2-3',
    'index-write',
    '给很热的更新列再加一条二级索引，除了可能少扫行，还付出什么？',
    [
      '只多占一个名字，INSERT、UPDATE、DELETE 的成本不变。',
      '写入时要多维护这棵索引；前缀若太短，选择性也差，还撑不起整列排序。',
      '索引一旦建上，所有语句都会变成覆盖，不必回表。',
      '二级索引会代替主键，聚簇索引就可以删掉。',
    ],
    'b',
    '二级索引能减少扫描，有时还能只读索引就结束查询。代价是空间，以及 INSERT、UPDATE、DELETE 都要维护它。TEXT/BLOB 常用前缀索引，前缀太短会失去选择性，也覆盖不了整列的 ORDER BY。',
    {
      a: '多一棵树，写路径就要多维护一次，不是只多一个名字。',
      c: '覆盖取决于这次查询用到的列是否都在这棵索引里，不是建了索引就自动覆盖。',
      d: 'InnoDB 的聚簇索引仍在。二级索引的叶子里指向主键，不是把主键换掉。',
    },
  ),
  ask(
    's2-4',
    'func-col',
    'WHERE DATE(created_at) = ? 这种写法，问题出在哪里？',
    [
      'SQL 里不允许出现任何函数。',
      '函数包住了索引列，优化器通常无法把条件收成对索引键的简单范围。',
      '函数写在常量一侧也一样用不上索引，所以时间条件不能写。',
      '只要表上有索引，包住列的函数会被自动拆开。',
    ],
    'b',
    '对索引列套 DATE(col)、col+1 这类表达式，优化器通常无法把谓词收成对索引键的简单范围。计算应尽量留在常量一侧，例如 created_at >= ? AND created_at < ?。函数索引或生成列是另做的显式建模，不是默认允许在 WHERE 里包住列。',
    {
      a: '禁止的是包住索引列，不是 SQL 里不能出现函数。常量一侧的函数可以留下。',
      c: '把计算挪到常量一侧，正是为了让索引列保持可比较的范围。',
      d: '优化器不会自动把包在列上的函数拆掉再去匹配索引。',
    },
  ),
  ask(
    's2-5',
    'convert',
    '列是整数，条件却拿字符串和它比较，而且类型对不上。索引会怎样？',
    [
      '类型不同没有关系，优化器会忽略转换。',
      '比较时的类型转换会让这条索引路径变贵或用不上。要禁止的是这种挡索引的转换。',
      '转换只影响返回给客户端的显示，不影响访问路径。',
      '只要列上有索引，转换之后仍一定走 range。',
    ],
    'b',
    '「禁止隐式转换」针对的是类型不匹配的比较挡住索引，不是禁止一切类型变化。对列套函数、类型对不上，都会让索引路径变贵或无法用。以 EXPLAIN 里的 key 和检查行数为准。',
    {
      a: '优化器不会忽略转换。转换发生在列上时，范围就收不住。',
      c: '转换若让列上的值无法直接对应索引键，访问路径会变，不只是显示变了。',
      d: '有索引只说明存在这条路径，不说明转换之后仍走它。',
    },
  ),
  ask(
    's3-1',
    'row-lock',
    '一条 UPDATE 没有用上合适的过滤索引，并发时像整表被堵住。InnoDB 的锁应当怎么描述？',
    [
      '没有合适索引就升级成了表锁，记录锁不再参与。',
      '锁仍加在索引记录和间隙上。扫了很多记录，看起来像整表被堵住，机制仍是记录锁。',
      '没有用户建的二级索引时，这张表不加锁。',
      '这种语句只加共享锁，其他更新可以同时改同一行。',
    ],
    'b',
    'InnoDB 的记录锁、间隙锁和 next-key 锁都作用在索引项及其间隙上。没有合适的过滤索引时，锁定读或更新可能锁住大量索引记录，并发上像整表被堵住。真正的表级锁出现在 LOCK TABLES 等场景，不能把「走不了业务索引」说成「升级为表锁」。',
    {
      a: '扫很多索引记录仍是记录级锁，外加意向表锁，不是改成了表锁。',
      c: '即使没有用户定义的二级索引，聚簇索引或隐藏的聚集索引仍在，锁加在那些记录上。',
      d: '更新要的是排他的记录锁。其他事务不能同时改被锁住的同一行。',
    },
  ),
  ask(
    's3-2',
    'keyset',
    '分页翻到很深时，为什么不要靠越来越大的 OFFSET？',
    [
      'OFFSET 越大，服务器仍要先产生并丢掉前面的行，成本随偏移升高。',
      'OFFSET 会关闭这张表上的索引。',
      '深分页必须改成 SELECT * 才能变快。',
      '把 OFFSET 换成一个更长的 IN 列表，就可以直接跳到任意深页且不再扫描。',
    ],
    'a',
    'LIMIT 在大 OFFSET 之后取一页时，前面的行仍要先产生再丢掉。深页改成记住上一页最后一行的排序键，下一页只取比它更大的键。排序必须稳定且唯一，否则相邻页会重复或漏行。这种续页不能直接跳到任意页码。',
    {
      b: '变慢是因为跳过的行仍被产生，不是因为索引被关掉。',
      c: '星号不解决偏移成本，还常常让覆盖更难。',
      d: 'IN 列表不是深分页的替代。跳到任意页码本来就不是键集续页要解决的事。',
    },
  ),
  ask(
    's3-3',
    'n-plus-one',
    '订单列表查了一次，循环里再访问每张订单的明细，SQL 通常会怎样？',
    [
      '持久化上下文会把明细自动折进第一次查询，不会再访问库。',
      '第一次查列表，循环访问延迟关联时再发 N 次查询。应按这一次用例把明细一次取齐。',
      '会话关掉之后再访问关联，会悄悄再打开数据库把明细补上。',
      'N+1 只出现在手写 SQL 里，JPA 的列表不会有。',
    ],
    'b',
    '集合和多对一关联的默认获取常常是延迟的。在列表上循环访问明细，就是 1 次查列表加 N 次查明细。解决办法是按这一次用例写出一次取齐的查询，而不是把延迟加载当成自动的优化。',
    {
      a: '延迟关联在访问时才发 SQL，不会自动折进列表那一次查询。',
      c: '事务提交、会话关闭后再碰延迟关联，会失败，不是悄悄回到数据库。',
      d: 'JPA 列表上循环访问关联，正是典型的 N+1。',
    },
  ),
  ask(
    's3-4',
    'deadlock',
    'InnoDB 检测到死锁，并回滚了其中一个事务。应用应该怎样重试？',
    [
      '只把失败的那条 UPDATE 再执行一次。',
      '从业务入口重试整笔事务，并给重试加上次数上限。',
      '死锁只回滚最后一条语句，前面的写入已经安全提交。',
      '两个事务保持相反的加锁顺序，多试几次就会错开。',
    ],
    'b',
    '死锁会回滚受害事务的整笔工作。应用要从业务入口再读再写，而不是从失败的那条语句续上。重试要有次数上限和退避。相反的加锁顺序不改，重试还会再撞上。',
    {
      a: '只补最后一条语句，会在前面的写入已经作废时把后面的修改再做一次。',
      c: '受害事务整笔作废，不是只丢掉最后一条语句。',
      d: '不加次数上限、不统一加锁顺序，两个事务会反复按相反顺序撞上。',
    },
  ),
  ask(
    's3-5',
    'real-engine',
    'H2 里的测试全绿。为什么 MySQL 上的并发结果仍可能不同？',
    [
      '内存库和 MySQL 的锁、隔离、约束行为一致，方言不影响这条测试。',
      '内存库证明的是接线形状。方言、锁、隔离和约束要在真实引擎上用少量测试证明。',
      '全绿说明生产库上的唯一约束也不会冲突。',
      '每个单元测试都应该启动一个数据库容器，否则结果无效。',
    ],
    'b',
    '换成内存库或 Mock，验证的是接线，不是方言、约束和隔离。真实引擎上的假设用少量容器测试；纯计算不必为此启动数据库。',
    {
      a: '锁、隔离和约束正是内存库模仿不像的部分。',
      c: '替身库里的断言通过，不表示生产引擎上的唯一约束会同样冲突或同样通过。',
      d: '不是每个单元测试都要启动数据库。要分开「这一层的行为」和「对真实引擎的假设」。',
    },
  ),
]

const perfQuestions: DrillQuestion[] = [
  ask(
    'p1-1',
    'resource',
    '一台机器变慢。第一步应先看什么？',
    [
      '先重启，现场留不住也没关系。',
      '先看 CPU、磁盘和内存谁的利用率高、有没有排队、有没有错误。',
      '先把堆调到最大。',
      '先把连接池调到一万。',
    ],
    'b',
    '先分资源，再谈应用参数。CPU 忙、磁盘饱和、内存换页是三种不同的慢。磁盘饱和时 IO 等待高，CPU 可能是空的，负载仍会升高。重启会把现场清掉，先留下利用率、排队和占用最高的进程。',
    {
      a: '重启清掉现场之后，就看不出当时是 CPU、磁盘还是内存。',
      c: '堆只影响回收。机器慢的原因还没分开时，加大堆对不上症结。',
      d: '池的大小解决不了「还不知道是哪种资源饱和」。',
    },
  ),
  ask(
    'p1-2',
    'slow-span',
    '追踪里最慢的一跳是一条仍在大量扫描的 SQL。下一刀应改什么？',
    [
      '把堆加大，扫描会跟着变短。',
      '改这条 SQL 或它的索引，并用同一条链路复测这一跳。',
      '把连接池的等待时间调大。',
      '换一个垃圾回收器的名字。',
    ],
    'b',
    '调优对准已经定位的那一跳。语句时间长就改 SQL。向池借连接的时间长才看池。停顿落在垃圾回收才动堆。堆变大不会缩短一条仍在大量扫描的语句。',
    {
      a: '堆影响的是回收，不是这条扫描要读的行数。',
      c: '连接池等待是借出连接的时间。语句已经在跑时，加长借连接等待不会让扫描变短。',
      d: '回收器只在停顿确实落在回收上时才相关，不能代替改这条 SQL。',
    },
  ),
  ask(
    'p1-3',
    'one-trace',
    '一次下单从网关进到 SQL。追踪应当怎样记？',
    [
      '网关、服务、连接池、SQL 各开一条互不相干的 trace。',
      '同一次请求用同一个 trace id。网关、应用、连接池和 SQL 是这条 trace 上的不同 span。',
      '只在 SQL 打日志，网关不必带上 trace id。',
      '每条 SQL 新建一个 trace id，方便按语句计数。',
    ],
    'b',
    '一次请求进出系统要带同一个追踪标识。span 表示这一跳花了多少时间。日志里写上 trace id，才能从一条投诉跳到那一次调用。指标回答「这一类请求现在怎样」，链路回答「这一次卡在哪」。',
    {
      a: '拆成多条 trace 之后，对不上这是同一次下单。',
      c: '没有从网关传下来的 trace id，服务和 SQL 的日志就拼不回这一次。',
      d: '每条 SQL 换一个 trace id，会把同一次请求切碎。SQL 应是同一个 trace 上的 span。',
    },
  ),
  ask(
    'p1-4',
    'pool-wait',
    '日志是「从池里拿连接超时」。它和一条 SQL 跑了 3 秒，差在哪里？',
    [
      '两者都是 SQL 慢，加索引即可。',
      '前者是线程还在等池里的连接，查询还没开始；后者才是语句本身的时间。',
      '把 connectionTimeout 调大，正在执行的慢 SQL 会因此变快。',
      '拿连接超时说明隔离级别选错了。',
    ],
    'b',
    'connectionTimeout 是从池里拿到一条连接的最长等待。池被占满时，超时抛出的是拿连接失败，查询还没开始。它不限制 SQL 执行多久。语句超时要另设在语句或套接字上。',
    {
      a: '连接还没借到，语句没有开始，不是这条 SQL 的执行时间。',
      c: '把借连接的等待调大，只是让线程在池外排更久，不会让已借出的慢 SQL 更快结束。',
      d: '拿不到连接是池的等待，不是隔离级别的名字。',
    },
  ),
  ask(
    'p1-5',
    'gc-pause',
    '接口变慢，怀疑和垃圾回收有关。第一步应看什么？',
    [
      '只比较回收次数，次数多就说明用户请求变慢。',
      '把接口延迟和 GC 暂停对上时间，同时看分配速率和堆占用。',
      '先重启，暂停自然消失。',
      '回收频繁就一定是一次很长的停顿。',
    ],
    'b',
    '回收器在吞吐、停顿和内存占用之间取舍。只看回收次数无法说明用户请求是否变慢。短命对象可以回收很多次而每次很短；次数少但一次停顿很长，才会出现在尾延迟里。',
    {
      a: '次数多不等于暂停伤害了这次请求。短而勤和少而长，接口延迟完全不同。',
      c: '重启清掉现场，对不上延迟和暂停是否同时抬起。',
      d: '回收频繁时，单次停顿仍可能很短。不能把「勤」直接写成「一次很长」。',
    },
  ),
  ask(
    'p2-1',
    'connect-timeout',
    'Java 11 HttpClient 的 connectTimeout 覆盖哪一段？',
    [
      '从建连到读完整个响应体。',
      '只限制建立新连接。连接可以复用时，这段超时不起作用。',
      '只限制 DNS，不限制握手。',
      '限制服务端业务线程的全部执行时间。',
    ],
    'b',
    'connectTimeout 只限制建立新连接。这一次请求等待响应，用的是请求上的 timeout；不设请求超时，等待就没有上限。DNS、从池借出、响应开始之后的读取，都要单独看。',
    {
      a: '建连超时管不到整次调用，也管不到读完响应体。',
      c: '它限制的是建立新连接，不是单独的 DNS 阶段。DNS 和读取还要各自看。',
      d: '客户端的建连超时停不掉服务端已经在跑的业务线程。',
    },
  ),
  ask(
    'p2-2',
    'timeout-chain',
    '调用方、网关、下游客户端和 SQL 的超时，应当怎样排列？',
    [
      '四处设成同一个数。',
      '从外到内越来越短：调用方等得最久，SQL 最短。正常成功要落在最内层之内。',
      '网关设得比上游整段处理还长，失败的调用就一直占着入口。',
      '只把其中一个超时加长，其余不用看。',
    ],
    'b',
    '网关的响应超时到了，连接会断开并给调用方失败，上游事务可能还在提交。所以外层等得更久、内层更短，正常成功要在最内层超时之内完成。写接口要用原来的幂等键消化这种「外面已失败、里面可能已写入」。',
    {
      a: '设成同一个数时，分不清是入口先失败还是里面先失败。',
      c: '网关比上游处理还长，失败的调用会一直占着入口；网关先断开时，里面却可能还在提交。两种方向都要避免叠在一起乱加。',
      d: '只加长一处没有用。网关先断时，里面的写入仍要靠幂等收场。',
    },
  ),
  ask(
    'p2-3',
    'nginx-wait',
    'Nginx 的 proxy_read_timeout 在限制什么？',
    [
      'Java 线程池里的排队时间。',
      '两次从上游读取之间能等多久。它不是整次请求的总预算，也不是应用线程池的超时。',
      '浏览器把页面画完的时间。',
      '本机垃圾回收的停顿上限。',
    ],
    'b',
    'proxy_connect_timeout 只限制连上上游。proxy_read_timeout 限制两次读取之间的等待。后端一直慢慢写出数据时，这个超时可以一直不触发。Java 侧的池等待、语句超时和应用线程超时仍要单独设置。',
    {
      a: '应用线程池的排队是另一段等待，不会被这个指令直接当成自己的超时。',
      c: '它等的是上游的下一次读取，不是浏览器绘制。',
      d: '垃圾回收的停顿不由 proxy_read_timeout 封顶。',
    },
  ),
  ask(
    'p2-4',
    'provider-live',
    'Dubbo 消费方已经报了超时。提供方的那次调用处于什么状态？',
    [
      '提供方线程被消费方超时立刻停掉，插入不会提交。',
      '提供方线程默认还在跑，插入仍可能提交；默认配置下这次失败后还会再调用。',
      '超时说明提供方还没开始执行。',
      '超时之后框架保证这张订单只会被处理一次。',
    ],
    'b',
    '超时配在消费方。时间到了，消费方放弃等这一次响应。提供方线程默认不会因此中断。retries 默认 2，写操作没有唯一业务键时，多次到达就是多笔订单。',
    {
      a: '客户端不再等待，不会把提供方已经开始的线程停掉。',
      c: '超时常常发生在提供方已经在执行之后，不是「还没开始」的证明。',
      d: '默认还会再试。没有唯一约束时，框架不保证只处理一次。',
    },
  ),
  ask(
    'p2-5',
    'sentinel-block',
    'Sentinel 抛出规则拦截，业务方法没有执行。这次失败说明什么？',
    [
      '下游已经超时。',
      '请求在进入这个资源之前被规则拒绝了，不是下游的超时异常。',
      '数据库死锁，事务已经回滚。',
      '连接已经借出，SQL 执行很慢。',
    ],
    'b',
    '流控按配额拒绝后续进入；熔断在下游异常或过慢时，于时间窗口内直接拒绝。规则拒绝时业务方法没有执行。对拦截再立即重试，只会继续消耗配额。',
    {
      a: '下游超时是调用已经发出去之后的失败。规则拦截发生在业务方法执行之前。',
      c: '死锁是数据库里的等待环。这里业务方法还没跑，谈不上那次事务。',
      d: 'SQL 慢说明语句已经在执行。规则拦截时方法没有执行，连接上也还没有这次查询。',
    },
  ),
  ask(
    'p3-1',
    'cache-three',
    '缓存把数据库打满。三种常见情况应怎样分开？',
    [
      '雪崩、击穿、穿透都是「加一把锁」就能一起解决。',
      '雪崩是大量键在相近时间失效或缓存整体不可用；击穿是一个热点键失效后的并发回源；穿透是请求根本不存在的数据。',
      '穿透是热点键过期，击穿是查询一个不存在的键。',
      '雪崩只和磁盘有关，和过期时间挤在一起无关。',
    ],
    'b',
    '三种情况的根因和保护不同。先看过期时间是否挤在一起、单个键的并发、以及不存在键的空查比例。锁只能减少同一键的重复构建；缓存整体不可用时，热点锁也保不住数据库。',
    {
      a: '三种路径不能共用一句加锁。锁的范围错了，数据库仍会忙。',
      c: '说反了。热点键失效后的并发回源是击穿；根本不存在的数据被反复请求是穿透。',
      d: '大量键的过期时间挤在同一分钟，正是雪崩要先看的分布。',
    },
  ),
  ask(
    'p3-2',
    'aside-write',
    '应用采用旁路缓存。一次更新成功之后，缓存键应怎样处理？',
    [
      '只更新缓存，数据库等淘汰之后再写。',
      '写数据库成功后，删除对应的缓存键。',
      '缓存会在数据库提交时自动删除，应用不必再删。',
      '把新值只放进本进程的变量，其他实例会自动看见。',
    ],
    'b',
    '旁路缓存由应用负责读写两边。未命中时读数据库并回填；写数据库成功后再删除缓存键。缓存不会自己跟着提交变掉。',
    {
      a: '权威在数据库。只写缓存，其他实例和重启之后都看不到这次提交。',
      c: '没有自动删除。应用不删，旧值会留到过期或被回填。',
      d: '本进程的变量不能跨实例。共享缓存要走实例之外的那一层。',
    },
  ),
  ask(
    'p3-3',
    'producer-brake',
    '消息堆着。生产速率一直高于消费速率，分区也不够再分。只加消费者会怎样？',
    [
      '消费者数量上去，积压就一定会消失。',
      '多出来的消费者会空转。生产端还要限速或阻塞，否则磁盘会先满。',
      '积压只看消费者是否还活着。',
      '下游写库已经跟不上时，继续加消费者可以把压力留在原处。',
    ],
    'b',
    '积压是生产持续快于消费。加消费者的前提是分区或队列够分摊，而且下游写库跟得上。分区不够时再加也是空转。生产端要有背压：限速、阻塞发送，或把峰值放进可降级的通道。',
    {
      a: '分区不够时，多出来的消费者分不到工作，积压仍在。',
      c: '消费者还在跑，只说明进程活着，不说明生产速率已经降下来。',
      d: '下游写库跟不上时，多出来的消费者是把压力往后推，不是留在原处。',
    },
  ),
  ask(
    'p3-4',
    'dead-letter',
    '一条消息因为校验永远过不了而失败。它应该放在哪里？',
    [
      '留在主队列里一直抛错，后面的消息等它过去。',
      '离开主队列，进入死信或失败主题。积压要看深度和最早一条的年龄。',
      '靠多试几次变成不会重复，所以不必有业务键。',
      '消费者进程还在，就不算积压。',
    ],
    'b',
    '再试可能成功的失败（例如下游超时）和再试一定失败的失败要分开。后者必须离开主队列，否则堵住后面的消息。重试仍用业务键做幂等。积压看深度和最早一条的年龄，不是看消费者进程是否还在。',
    {
      a: '永远过不了的校验留在主队列，会堵住分区或队列里后面的消息。',
      c: '多试几次不会使重复消失。至少投递一次时，幂等仍要靠业务键。',
      d: '进程还在，最早的那条消息仍可能已经旧了很久。',
    },
  ),
  ask(
    'p3-5',
    'isolate-pool',
    '登录和库存共用一个入口线程池。库存变慢之后，登录也开始超时。原因是什么？',
    [
      '登录自己的 SQL 一定全表扫描。',
      '最慢的下游把共用的池占满了。库存应有自己的配额，满了就失败，不要无限排队。',
      '把共用池的队列改成无限长，登录就会恢复。',
      '这是限流在限制登录的速率，和池无关。',
    ],
    'b',
    '共用一个入口线程池或一个连接池时，最慢的下游会把所有请求堵住。隔离是给不同依赖分开的并发配额；舱满应快速失败。限流限制的是速率，隔离限制的是能被这个依赖占住的资源。',
    {
      a: '登录超时可以只是因为池里的线程被库存占着，不必先认定登录的 SQL 在扫表。',
      c: '无限排队让请求继续堆在内存里，登录仍然等不到自己的线程。',
      d: '这里是并发配额被占光。限流是另一件事，限制的是进入的速率。',
    },
  ),
]

function place(question: DrillQuestion, letter: OptionId): DrillQuestion {
  if (question.answer === letter) return question
  const slots: OptionId[] = ['a', 'b', 'c', 'd']
  const pairs = question.options.map((option) => ({
    text: option.text,
    correct: option.id === question.answer,
    why: question.whyWrong[option.id] ?? '',
  }))
  const correct = pairs.find((item) => item.correct)
  const wrongs = pairs.filter((item) => !item.correct)
  if (!correct || wrongs.length !== 3) return question
  const rest = slots.filter((id) => id !== letter)
  const whyWrong: Partial<Record<OptionId, string>> = {}
  rest.forEach((id, index) => {
    whyWrong[id] = wrongs[index].why
  })
  return {
    ...question,
    answer: letter,
    options: slots.map((id) => ({
      id,
      text: id === letter ? correct.text : wrongs[rest.indexOf(id)].text,
    })),
    whyWrong,
  }
}

const LETTERS: OptionId[] = ['a', 'c', 'd', 'b']

function spread(items: DrillQuestion[], offset: number) {
  return items.map((item, index) => place(item, LETTERS[(index + offset) % LETTERS.length]))
}

const designSpread = spread(designQuestions, 0)
const sqlSpread = spread(sqlQuestions, 1)
const perfSpread = spread(perfQuestions, 2)

function fromMore(item: MoreAsk): DrillQuestion {
  return ask(item.id, item.pointId, item.stem, item.texts, item.answer, item.explain, item.whyWrong)
}

const moreSpread = spread(
  [...DESIGN_MORE, ...SQL_MORE, ...PERF_MORE, ...DESIGN_NEXT, ...SQL_NEXT, ...PERF_NEXT, ...DESIGN_FURTHER, ...SQL_FURTHER, ...PERF_FURTHER, ...DESIGN_LATER, ...SQL_LATER, ...PERF_LATER, ...SPINE_ASKS, ...COVER_ASKS].map(fromMore),
  3,
)

function moreFor(gateId: string) {
  return moreSpread.filter((item) => item.id.startsWith(`${gateId}-`))
}

function multiFor(gateId: string) {
  return MULTI_QUESTIONS.filter((item) => item.id.startsWith(`${gateId}-`))
}

const evoQuestions = EVO_ASKS.map((item) => ask(item.id, item.pointId, item.stem, item.texts, item.answer, item.explain, item.whyWrong))

function buildGate(
  id: string,
  courseId: DrillCourseId,
  level: number,
  title: string,
  lead: string,
  questions: DrillQuestion[],
): DrillGate {
  return { id, courseId, level, title, lead, questionIds: questions.map((item) => item.id) }
}

export const DRILL_GATES: DrillGate[] = [
  buildGate('d1', 'design', 1, '路径与停留', '先写清一条路径，再决定单体够不够、失败要不要当场返回。', [...designSpread.slice(0, 5), ...moreFor('d1')]),
  buildGate('d2', 'design', 2, '不变量与缓存', '库存、合计和权威状态放在哪里，缓存只是旁边的加速。', [...designSpread.slice(5, 10), ...moreFor('d2')]),
  buildGate('d3', 'design', 3, '故障时仍成立', '慢下游、重复调用和没信号的演进，都不能冲掉已经写清的不变量。', [...designSpread.slice(10, 15), ...moreFor('d3')]),
  buildGate('d4', 'design', 4, '拆开之前', '边界、业务能力、下单分工和这一次取舍，都要写在拆进程之前。', moreFor('d4')),
  buildGate('d5', 'design', 5, '跨进程仍是同一件事', '分区、待发事件、读自己的写、补偿和业务键，都要能对上同一次事实。', moreFor('d5')),
  buildGate('d6', 'design', 6, '表、读写与拆分', '一行表示一件事实。读写分离、分库和拆服务，都先回答这次瓶颈在哪。', moreFor('d6')),
  buildGate('d7', 'design', 7, '锁、库存与顺序', '租约、条件更新和补偿各管一件事。限流和队列代替不了库存不变量。', moreFor('d7')),
  buildGate('d8', 'design', 8, '时间、编号与热点', '墙上时钟会偏。编号、分片和幂等键要能在回拨和重试之后仍然对上同一次事实。', moreFor('d8')),
  buildGate('d9', 'design', 9, '决议、顺序与复制', '准备成功还不是提交。顺序、复制和编号都要先写清这次能丢什么、要保哪一个键。', moreFor('d9')),
  buildGate('d10', 'design', 10, '租约、入口与公平', '可重入、定时清表和全局阈值都代替不了租约、过半和分开的两道限额。', moreFor('d10')),
  buildGate('d11', 'design', 11, '先写清再选入口', '六句话没填上就先不加组件。当场要结果、持有者令牌和摘流，都要先写清这一跳。', moreFor('d11')),
  buildGate('d12', 'design', 12, '消息留在哪一套', '已有集群先留下。位点、绑定、复制和刷盘，决定这条消息还会不会再来。', moreFor('d12')),
  buildGate('s1', 'sql', 1, '语句在说什么', '先分清库的职责、星号、OR 和 JOIN，再用估计和实测核对。', [...sqlSpread.slice(0, 5), ...moreFor('s1')]),
  buildGate('s2', 'sql', 2, '索引的列与成本', '左列、区分度、写维护、函数和类型转换，都会改掉优化器的选择。', [...sqlSpread.slice(5, 10), ...moreFor('s2')]),
  buildGate('s3', 'sql', 3, '锁、深页与真实引擎', '堵住、深分页、N+1 和死锁，都要回到引擎实际做的那一步。', [...sqlSpread.slice(10, 15), ...moreFor('s3')]),
  buildGate('s4', 'sql', 4, '条件写在哪一层', 'NULL、外连接、分组、窗口和 UNION，差一个位置，行数就变了。', moreFor('s4')),
  buildGate('s5', 'sql', 5, '类型、大列与容量', '字符集、金额、大列和行数，都不要用一口诀代替这一次的计划。', moreFor('s5')),
  buildGate('s6', 'sql', 6, '索引是访问路径', '覆盖、哈希、唯一和直方图，先分清它改变的是查找路径还是估计。', moreFor('s6')),
  buildGate('s7', 'sql', 7, '慢查询与版本、缓冲、快照', '先按累计耗时定位，再对照缓冲池、隔离级别和这次读视图实际看见的行。', moreFor('s7')),
  buildGate('s8', 'sql', 8, '事务、复制与日志', 'redo、undo 和 binlog 各记一件事。复制落后、预处理和自增，都要按这一次的引擎行为核对。', moreFor('s8')),
  buildGate('s9', 'sql', 9, '约束不是口诀', '未知、外键、主键和浮点，先看这次约束要保住什么，再决定默认值和类型。', moreFor('s9')),
  buildGate('s10', 'sql', 10, '例程、个数与备份', '过程、触发器、索引个数和克隆，都不是自动事务、硬上限或可回档备份。', moreFor('s10')),
  buildGate('s11', 'sql', 11, '数字上限与引擎边界', '列数、表数、冷热比和表空间，先查这次的访问和页大小，不背一个固定数字。', moreFor('s11')),
  buildGate('s12', 'sql', 12, '权威、计数与会话', '权威写入、冗余计数和持久化上下文，都要分清这次谁提交、谁看见。', moreFor('s12')),
  buildGate('p1', 'perf', 1, '先定位', '先分开资源、最慢的一跳、追踪和「还在等连接」。', [...perfSpread.slice(0, 5), ...moreFor('p1')]),
  buildGate('p2', 'perf', 2, '超时不是同一种失败', '建连、网关、代理、提供方线程和规则拦截，失败点不在同一层。', [...perfSpread.slice(5, 10), ...moreFor('p2')]),
  buildGate('p3', 'perf', 3, '缓存与消息把库打满', '雪崩、积压和共用的池，要先看出是哪一种压力。', [...perfSpread.slice(10, 15), ...moreFor('p3')]),
  buildGate('p4', 'perf', 4, '入口这一跳', '转到哪、选哪一台、这个接口让不让过，超时和重试不要并成一句。', moreFor('p4')),
  buildGate('p5', 'perf', 5, '消息到了几次', '确认、位点、分区和重投，决定副作用会留下几次。', moreFor('p5')),
  buildGate('p6', 'perf', 6, '停顿、内存与停机', '先读报错名字和暂停时间，再决定动堆、换收集器，还是排空进程。', moreFor('p6')),
  buildGate('p7', 'perf', 7, '缓存命令与失效', '大命令、热键、穿透和击穿先分开。流水线和脚本只管这一台 Redis 上的往返和插入。', moreFor('p7')),
  buildGate('p8', 'perf', 8, '熔断、再平衡与摘除', '半开、位点、同步副本和被动摘除，各看一种失败，不要并成一个超时。', moreFor('p8')),
  buildGate('p9', 'perf', 9, '回收范围与持久', '先读回收范围和报错名字。复制确认、AOF 和快照命令，也不是同一件持久。', moreFor('p9')),
  buildGate('p10', 'perf', 10, '线程池不是加速倍数', '先写明队列、拒绝和下游容量。核数倍数和虚拟线程都不提高数据库能承受的并发。', moreFor('p10')),
  buildGate('p11', 'perf', 11, '热键、注册与默认负载', '大键和热键分开记。名单延迟、抄走的配置，以及默认的加权随机，都还会打到旧地址。', moreFor('p11')),
  buildGate('p12', 'perf', 12, '重试、全局锁与缓冲', '写接口、短信和等待支付各在事务外面。缓冲、Host 和没有提供者，先看失败落在哪一跳。', moreFor('p12')),
  buildGate('p13', 'perf', 13, '复制、槽与过期', '全量是快照，增量是写命令。槽是拓扑，过期通知不是可靠任务。', moreFor('p13')),
  buildGate('p14', 'perf', 14, '结构、可见性与名单', '列表实现、解锁可见和本地提供者名单，都要按现行行为核对，不按旧口诀。', moreFor('p14')),
  buildGate('p15', 'perf', 15, '窗口、预取与公共池', '心跳窗口、预取和公共池，都会把请求或任务留在不该留的地方。', moreFor('p15')),
  buildGate('m1', 'spine', 1, '四件事各管一层', '按钮、失败类型、事务和唯一约束，先分开再谈这一次下单有没有做成。', moreFor('m1')),
  buildGate('m2', 'spine', 2, '提交之前都不算写成', '同类调用、吞掉的异常、重复的 POST 和先查再插，都还没让不变量提交。', moreFor('m2')),
  buildGate('m3', 'spine', 3, '这一次读到什么', '取齐、折叠、会话缓存和刚提交的详情，决定这次看见的是不是那一行。', moreFor('m3')),
  buildGate('m4', 'spine', 4, '谁能改这一行', '登录态放哪、跨站提交和拥有者，都要在进入用例之前决定。', moreFor('m4')),
  buildGate('m5', 'spine', 5, '一种行为一道锁', '断言看得见的结果。契约锁住失败类型。浏览器只走用户真正走完的一条。', moreFor('m5')),
  buildGate('m6', 'spine', 6, '先写下看见了什么', '状态码、留下的行和同一次标识先写上。一次只改有记录的那一层。', moreFor('m6')),
  buildGate('m7', 'spine', 7, '镜像、流水线与停机', '容器共享内核。打包成功不是三道门。停机先拒绝新请求。', moreFor('m7')),
  buildGate('m8', 'spine', 8, '地址、探活与这个窗口', '调用方连稳定地址。探活分开启动、就绪和存活。这个窗口只做写明的一件事。', moreFor('m8')),
  ...COVER_GATES.map((gate) => buildGate(gate.id, gate.courseId as DrillCourseId, gate.level, gate.title, gate.lead, moreFor(gate.id))),
  ...MULTI_GATES.map((gate) => buildGate(gate.id, gate.courseId as DrillCourseId, gate.level, gate.title, gate.lead, multiFor(gate.id))),
  buildGate('xevo', 'evo', 1, '同一笔订单', '有量到的瓶颈才进入下一站。事务按不变量选，不合成一种默认方案。', evoQuestions),
]

export const DRILL_QUESTIONS: DrillQuestion[] = [...designSpread, ...sqlSpread, ...perfSpread, ...moreSpread, ...MULTI_QUESTIONS, ...evoQuestions]

installBossExams(DRILL_POINTS, DRILL_QUESTIONS)

const questionMap = new Map(DRILL_QUESTIONS.map((item) => [item.id, item]))
const pointMap = new Map(DRILL_POINTS.map((item) => [item.id, item]))
const gateMap = new Map(DRILL_GATES.map((item) => [item.id, item]))

export function questionById(id: string) {
  return questionMap.get(id) ?? bossQuestionById(id)
}

export function pointById(id: string) {
  return pointMap.get(id) ?? bossPointById(id)
}

export function gateById(id: string) {
  return gateMap.get(id) ?? bossGateById(id)
}

export function gatesInCourse(courseId: DrillCourseId) {
  return DRILL_GATES.filter((gate) => gate.courseId === courseId)
}

export function courseById(id: string) {
  return DRILL_COURSES.find((course) => course.id === id) ?? (id === 'boss' ? BOSS_COURSE : undefined)
}
