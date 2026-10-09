/** Delivery paths. Lesson ids match docs/架构师主线设计.md and docs/学习路线分层设计.md. */

/** One slot is one required read. Lessons that share a note are alternatives and count as one slot. */
export function deliverableKey(gateId: string, index: number) {
  return `${gateId}:${index}`
}

/** Lessons in the gate are read, and every deliverable line is checked. */
export function gateCleared(gate: PathGate, doneIds: readonly string[], checks: readonly string[]) {
  const done = new Set(doneIds)
  const marked = new Set(checks)
  const slots = slotsOf(gate.lessons)
  const lessonsDone = slots.length === 0 || slots.every((slot) => slot.some((id) => done.has(id)))
  const delivered = gate.outputs.every((_, index) => marked.has(deliverableKey(gate.id, index)))
  return lessonsDone && delivered
}

export function lessonSlots(kind: PathKind): string[][] {
  return PATHS[kind].gates.flatMap((gate) => slotsOf(gate.lessons))
}

export function spinePlace(lessonId: string): { index: number; step: number; gate: PathGate } | undefined {
  const index = PATHS.architect.gates.findIndex((gate) => gate.lessons.some((lesson) => lesson.id === lessonId))
  if (index < 0) return undefined
  const gate = PATHS.architect.gates[index]
  return { index, step: gate.lessons.findIndex((lesson) => lesson.id === lessonId), gate }
}

/** Next required lesson inside the same stage. A 二选一 pair is one step, so the other lesson is skipped. */
export function spineNextId(lessonId: string): string | undefined {
  const place = spinePlace(lessonId)
  if (!place) return undefined
  const slots = slotsOf(place.gate.lessons)
  const at = slots.findIndex((slot) => slot.includes(lessonId))
  return slots[at + 1]?.[0]
}

export function spinePrevId(lessonId: string): string | undefined {
  const place = spinePlace(lessonId)
  if (!place) return undefined
  const slots = slotsOf(place.gate.lessons)
  const at = slots.findIndex((slot) => slot.includes(lessonId))
  if (at <= 0) return undefined
  return slots[at - 1]?.[0]
}

/** First lesson of the first slot that is still unread. Reading either lesson in a pair clears that slot. */
export function nextInGate(gate: PathGate, doneIds: readonly string[]): string | undefined {
  const done = new Set(doneIds)
  for (const slot of slotsOf(gate.lessons)) {
    if (slot.some((id) => done.has(id))) continue
    return slot[0]
  }
  return undefined
}

export type PathKind = 'fullstack' | 'architect'

export type PathLesson = {
  id: string
  /** 这节在这一关里要解决的一件事。 */
  job?: string
  note?: string
}

/** Consecutive lessons that share a note are one slot, kept in reading order. */
export function slotsOf(lessons: PathLesson[]): string[][] {
  const slots: string[][] = []
  let group: string[] = []
  for (const lesson of lessons) {
    if (lesson.note) {
      group.push(lesson.id)
      continue
    }
    if (group.length) {
      slots.push(group)
      group = []
    }
    slots.push([lesson.id])
  }
  if (group.length) slots.push(group)
  return slots
}

export type PathGate = {
  id: string
  title: string
  /** 给人看的阶段名，不使用课表分类词。 */
  learnTitle: string
  weeks: string
  /** 读这一关时按顺序做的事。 */
  how: string[]
  deliver: string
  /** 交付物拆开的条目。 */
  outputs: string[]
  pass: string
  /** 这一关在整条路线上的位置。 */
  milestone?: string
  lessons: PathLesson[]
  extra?: string
}

export const PATHS: Record<
  PathKind,
  { title: string; lead: string; done: string; gates: PathGate[] }
> = {
  fullstack: {
    title: '全栈交付线',
    lead: '同一条业务先走通两侧主线，再按缺口补课。毕业看 F1～F3，不看课数。其余章节是索引。',
    done: 'F1 + F2 + F3',
    gates: [
      {
        id: 'spine',
        title: '全栈主线',
        learnTitle: '走通一次下单',
        weeks: '先读完',
        how: ['同一笔业务读完这 8 课。'],
        deliver: 'F1：四层归属表，外加一条能演示的写路径（含失败 type，不要求并发压测套件）。',
        outputs: ['四层归属表', '一条含失败 type 的写路径'],
        pass: '不看资料能讲清按钮态、契约 type、事务、唯一约束各管什么。',
        lessons: [
          { id: 'fs-four-layers' },
          { id: 'fs-page-feature' },
          { id: 'fs-write-ui' },
          { id: 'fs-frontend-done' },
          { id: 'fs-boot-chain' },
          { id: 'fs-write-invariant' },
          { id: 'fs-read-shape' },
          { id: 'fs-ship-bar' },
        ],
      },
      {
        id: 'gap',
        title: '缺口补刀',
        learnTitle: '把读写做对',
        weeks: '最多再加 10 课',
        how: ['按缺口补这几课，不按章刷完。'],
        deliver: 'F2：读路径，加上缓存失效或 N+1 其中一项证据。F3：幂等重试不双写，或一种简化异步。',
        outputs: ['读路径加缓存失效或 N+1', '幂等重试不双写，或一种简化异步'],
        pass: '能指出成功是不变量已提交。完整 Outbox 和拆服务留到架构师线。',
        lessons: [
          { id: 'spring-transaction' },
          { id: 'idempotency' },
          { id: 'http-methods' },
          { id: 'cookie-credential' },
          { id: 'jpa-session-nplus1' },
          { id: 'cache-aside-steps' },
        ],
      },
    ],
  },
  architect: {
    title: '架构师主线',
    lead: '六关按顺序交付。点名必读 28 课，加上选读后仍不超过 35。学完公开课不等于架构师，关卡 6 在课外。',
    done: 'D1～D6',
    gates: [
      {
        id: 'g1',
        title: '关卡 1 · 单笔业务竖切',
        learnTitle: '走通一次下单',
        weeks: '1～2 周',
        how: [
          '用同一笔下单或你手头的一个功能贯穿这 8 课，不要每课换例子。',
          '每课先用自己的话回答开头的问题，再对照三个要点，把讲不清的写进笔记。',
          '8 课读完就停。画出四层归属表和成功路径，再打开第 2 关。',
        ],
        deliver: 'D1：四层归属表，加上一条成功路径说明。',
        outputs: [
          '四层归属表：按钮是否可点、失败 type、事务、唯一约束各在哪一层。',
          '一条真实或仿真业务的成功路径：谁在哪一层做了什么。',
          '不看资料能讲清上面四件事。',
        ],
        pass: '不看资料能讲清按钮态、契约 type、事务、唯一约束各管什么。',
        lessons: [
          { id: 'fs-four-layers', job: '把按钮态、契约 type、事务、唯一约束分到四层。后面每课都挂在这张表上。' },
          { id: 'fs-page-feature', job: '页面上分清路由、草稿、服务器状态和请求过程，不要用一份状态同时当列表和输入。' },
          { id: 'fs-write-ui', job: '4xx 不是成功。按契约的 type 画失败，重试时带原来的幂等键。' },
          { id: 'fs-frontend-done', job: '用失败、刷新、重试、失败文案和登录态存放位置验收前端，答不出就回到对应的一课。' },
          { id: 'fs-boot-chain', job: '写接口按校验、用例、事务、响应往下走。控制器不直接保存实体。' },
          { id: 'fs-write-invariant', job: '200 不等于写入成功。成功是不变量已经提交。' },
          { id: 'fs-read-shape', job: '查询返回契约要的字段，并说明这份数据有多新。' },
          { id: 'fs-ship-bar', job: '用一条页面到数据库的路径收口。五种失败各能指出拒绝它的那一层。' },
        ],
      },
      {
        id: 'g2',
        title: '关卡 2 · 正确性',
        learnTitle: '把写入做对',
        weeks: '2～3 周',
        how: [
          '把第 1 关那条写路径真正跑起来，还是同一笔业务。',
          '四课分别补事务边界、重试、HTTP 方法和登录态，不要改去刷 Spring 整章。',
          '交得出下面三样再进第 3 关。',
        ],
        deliver: 'D2：可运行的写路径，含并发不变量测试、幂等重试不双写、失败类型表。',
        outputs: [
          '一条能跑的写路径。',
          '并发不变量测试：不能先查再改。',
          '同一个幂等键重试，不产生第二笔写入。',
          '失败类型表：校验失败、业务冲突、超时分别是什么。',
        ],
        pass: '「200」和「不变量已提交」不再说成同一件事。',
        lessons: [
          { id: 'spring-transaction', job: '事务包住的是进入代理的外部调用。同类 this 调用、以及把异常吞掉，都会让提交照样发生。' },
          { id: 'idempotency', job: '超时重试会把同一次业务再送进来。幂等键加唯一约束，冲突时返回第一次的结果。' },
          { id: 'http-methods', job: '分清方法是否安全、是否幂等。业务副作用以实现为准，不能只看方法名。' },
          { id: 'cookie-credential', job: '登录态放 Cookie 还是 localStorage，决定浏览器会不会自动带上、脚本能不能读到。' },
        ],
      },
      {
        id: 'g3',
        title: '关卡 3 · 读、库、缓存',
        learnTitle: '把读取做对',
        weeks: '2～3 周',
        milestone: '做到这里，是能交付的全栈。',
        how: [
          '还是同一条业务，这一关改看读取。',
          '两课都要做：N+1 前后的 SQL 对比，以及写成功后删缓存仍可能读到旧值的那一步。',
          '穿透、热点或索引从侧栏按缺口再读，最多 2 课，不进默认顺序。',
        ],
        deliver: 'D3：读路径与缓存失效，N+1 前后对比，一次读到旧数据的复盘。',
        outputs: [
          '读路径，并说明数据有多新。',
          'N+1：循环访问关联前后的 SQL 对比。',
          '写成功后删除缓存，标出仍可能读到旧值的那一步。',
          '一次读到旧数据的复盘。',
        ],
        pass: '能画出写成功到再读的时序，并标出唯一可能脏的一步。',
        lessons: [
          { id: 'jpa-session-nplus1', job: '持久化上下文里的对象不是 SQL 行。循环里访问关联会再发查询，要用这一次用例的查询一次取齐。' },
          { id: 'cache-aside-steps', job: '未命中时读库并回填，写成功后再删缓存。缓存不会跟着数据库自己变。' },
        ],
        extra: '穿透、热点或索引约束最多再读 2 课。',
      },
      {
        id: 'g4',
        title: '关卡 4 · 分布与边界',
        learnTitle: '决定拆不拆',
        weeks: '3～4 周',
        how: [
          '先读何时不拆，再读拆开之后的成本。顺序不要倒过来。',
          '消息两课二选一，读完其中一课即可。',
          '限流只读 Sentinel 这一课，不啃整章 Spring Cloud Alibaba。',
          '写出拆或不拆的决定，并演示 Outbox 或等价方案加消费幂等，再进第 5 关。',
        ],
        deliver: 'D4：拆或不拆的 ADR，Outbox 或等价方案加消费幂等，并写清超时或分区时对用户是成功、失败还是等待。',
        outputs: [
          '一篇 ADR：这个业务拆还是不拆，放弃了哪个方案。',
          'Outbox 或等价方案，加上消费幂等，能演示。',
          '写清超时或分区时，对用户是成功、失败还是等待。',
        ],
        pass: '不会把上了微服务写成架构能力。',
        lessons: [
          { id: 'arch-monolith-when', job: '单体共享进程和库，事务和排障简单。痛的是发布耦合。模块化单体先固化边界。' },
          { id: 'arch-modular-boundary', job: '可拆的模块有自己的接口、表和测试。循环依赖和直连对方的表是拆分红灯。' },
          { id: 'arch-scale-before-split', job: '先水平扩展无状态应用。库已经是瓶颈时，加应用副本可能更差。' },
          { id: 'arch-microservice-split', job: '按业务能力和数据归属拆，不按 Controller、Service、Dao 拆仓库。' },
          { id: 'arch-sync-vs-async', job: '当场要看见失败的走同步。已经发生的事实走异步。改成消息不会让分布式事务消失。' },
          { id: 'distributed-one-db-first', job: '不变量还能放进一个库时，先不要拆成分布式事务。全局事务是拆开之后的补洞。' },
          { id: 'distributed-cap', job: '先定义网络分区，再决定这次写入是成功还是等待。CAP 不能代替平时的设计。' },
          { id: 'distributed-consistency-three-words', job: '提交时约束成立、分区后能否读到同一份最新结果、过一会儿对账成功，是三件不同的事。' },
          { id: 'distributed-outbox', job: '业务状态和待发事件放进同一次提交，避免订单已提交、消息没发出的空窗。消费者仍要幂等。' },
          { id: 'distributed-idempotent-key', job: '跨服务投递是至少一次。同一个业务键的副作用只留下一次写入，并且和去重在同一个本地提交里。' },
          { id: 'mq-consume-idempotent-key', note: '与下一课二选一', job: '消费幂等要落在可靠存储。先 SETNX 再写库，中间崩溃仍会重复。' },
          { id: 'message-delivery', note: '与上一课二选一', job: '至少一次允许重复。去重记录和状态修改要在同一个事务里。' },
          { id: 'sca-sentinel-block', job: '被限流挡住是配额拒绝，不是下游超时。不要按超时去重试。' },
        ],
      },
      {
        id: 'g5',
        title: '关卡 5 · 运行与演进',
        learnTitle: '上线后能看见故障',
        weeks: '2～3 周',
        how: [
          '先读演进顺序，再读拆开之后一次下单怎么走。',
          '观测、配置、发布从侧栏工程实践和交付章按缺口补，合计最多 7 课，不按章刷完。',
          '交健康检查、一种延迟或错误率、一次压测或故障注入结论。',
        ],
        deliver: 'D5：健康检查，至少一种延迟或错误率指标，一次压测或故障注入结论。',
        outputs: [
          '健康检查。',
          '至少一种延迟或错误率。',
          '一次压测或故障注入：瓶颈在哪一层。',
        ],
        pass: '架构图能对应到怎么发布、怎么看见坏了。',
        lessons: [
          { id: 'arch-evolution-stages', job: '演进按瓶颈分级：单体、模块化单体、水平扩展，最后才是微服务。' },
          { id: 'arch-split-order-case', job: '用户必须当场知道的结果走同步。订单成立后的副作用走异步并幂等，用补偿和对账，不共享对方的表。' },
        ],
        extra: '交付与运行最多 4 课，工程实践里观测、配置、发布最多 3 课。',
      },
      {
        id: 'g6',
        title: '关卡 6 · 架构职责',
        learnTitle: '到工作里推动',
        weeks: '3～4 周 · 课外',
        milestone: '做到这里，才有架构师的材料。课库代替不了这一关。',
        how: [
          '这一关没有下一节课。',
          '四件事都要有书面结果，而且要发生在工作或等价场景里。',
          '别人能按你的 ADR 和路线图干活，这一关才算过。缺它仍是资深个人贡献者。',
        ],
        deliver: 'D6：质量属性一页、你主导的契约评审纪要、3～6 个月只做一件事的路线图、一次有反对意见记录的决策会。',
        outputs: [
          '一页质量属性：SLO、容量粗算或成本，写一样即可。',
          '你主导的一份接口或事件契约评审纪要。',
          '3～6 个月只做一件事的路线图。',
          '一次有结论、也记下反对意见的决策会。',
        ],
        pass: '别人能按 ADR 和路线图干活。缺这一关仍是资深个人贡献者。',
        lessons: [],
        extra: '课库盖不住这一关，必须在工作或等价场景完成。',
      },
    ],
  },
}
