export type RubricKind = 'human' | 'local-pending'

export type LabCheck = {
  id: string
  behavior: string
  next: string
}

export type LearningTask = {
  id: string
  version: number
  gateId: string
  title: string
  objective: string
  inputs: string
  doneWhen: string
  hint: string
  answer: string
  /** 这道题的依据。没有单独依据的题可以不写。 */
  basis?: string
  estimatedMinutes: 15 | 30 | 60
  required: boolean
  skillIds: readonly string[]
  prerequisites: readonly string[]
  rubric: RubricKind
  lab?: {
    command: string
    checks: readonly LabCheck[]
  }
}

const ORDER_LAB_COMMAND = 'cd labs/order-g1g2 && ./mvnw -s maven-settings.xml test'

/** G1 是书写任务。G2 指向本机下单样板，页面只记录学员看到的结果。 */
export const LEARNING_TASKS: readonly LearningTask[] = [
  {
    id: 'g1.write-path',
    basis: '本关「一个功能要同时对上页面、接口契约、用例和持久化」。页面管这次交互，接口契约管失败 type，用例管事务，持久化管唯一约束。',
    version: 1,
    gateId: 'g1',
    title: '写下这一笔订单的四段职责',
    objective: '指出页面、接口契约、用例、持久化各自管什么。',
    inputs: '同一笔下单。不更换例子。',
    doneWhen: '四段职责各有一句，并写出一种失败停在哪一段。',
    hint: '先写按钮能不能点，再写失败 type，最后写事务和唯一约束。',
    answer: [
      '页面管这次交互：请求还在路上时按钮不可再点。',
      '接口契约管双方字段和失败类型：库存不足是 409。课上示例的 type 是 inventory-exhausted，本机样板是 sold-out。',
      '用例管这次业务和事务：库存够不够在事务里判断。',
      '持久化管落盘的行和约束：同一个幂等键只能有一行。',
      '',
      '按钮能不能点停在页面。库存够不够停在用例和持久化。失败文案用哪个 type 停在接口契约。',
      '',
      '```',
      'submit.disabled = pending',
      '',
      'POST /orders',
      '本机样板：409 { "type": "sold-out" }',
      '课上示例：409 { "type": "inventory-exhausted" }',
      '',
      'UNIQUE (idempotency_key)',
      '```',
    ].join('\n'),
    estimatedMinutes: 15,
    required: true,
    skillIds: [],
    prerequisites: [],
    rubric: 'human',
  },
  {
    id: 'g2.concurrency-note',
    basis: 'InnoDB 一致性读不能代替带版本的条件更新。样板在 labs/order-g1g2。',
    version: 1,
    gateId: 'g2',
    title: '写明并发时哪一次提交必须失败',
    objective: '说明库存只剩一件时，后提交的旧版本为什么失败。',
    inputs: '关卡 1 的同一笔下单。命令在本机样板 labs/order-g1g2。',
    doneWhen: '写下库存只剩一件时，后提交的旧版本失败在哪，以及你看到的订单数和库存。',
    hint: '对照 MVCC 的快照读，以及更新语句上的版本条件。',
    answer: [
      '必须失败的是后提交的那一次。它带着已经读过的旧版本。',
      '',
      '库存只剩 1，版本是 0。多个事务都可以用快照读到这一行。先提交的更新是：',
      '',
      '```sql',
      'UPDATE stock',
      'SET quantity = quantity - 1, version = version + 1',
      'WHERE sku = ? AND version = 0 AND quantity >= 1',
      '```',
      '',
      '这条改到 1 行，库存变为 0，版本变为 1，并插入 1 笔订单。',
      '后提交的 WHERE 仍是 version = 0。更新读的是当前行，版本已经是 1，条件对不上，影响 0 行，不能再插入订单。',
      '',
      '因此 20 个买家同时购买，只留下 1 笔订单，库存为 0。用过期版本去更新，改到 0 行。',
      '快照读解释了为什么两边都能先看见库存 1。它不能代替更新语句上的版本条件。没有这个条件时，后写会盖掉先写。',
    ].join('\n'),
    lab: {
      command: ORDER_LAB_COMMAND,
      checks: [
        {
          id: 'twentyBuyersLeaveOneOrderAndZeroStock',
          behavior: '20 个买家同时购买，只留下 1 笔订单，库存为 0',
          next: '核对条件更新是否带版本，失败请求有没有再插入订单。',
        },
        {
          id: 'staleVersionUpdatesNoRow',
          behavior: '过期版本的更新改到 0 行',
          next: '核对 UPDATE 的 WHERE 是否同时限制版本和剩余数量。',
        },
      ],
    },
    estimatedMinutes: 30,
    required: true,
    skillIds: ['J02', 'D01'],
    prerequisites: ['g1.write-path'],
    rubric: 'local-pending',
  },
  {
    id: 'g2.idempotent-retry',
    basis: 'Idempotency-Key：同一键已完成的请求返回上一次的结果。',
    version: 1,
    gateId: 'g2',
    title: '同一幂等键的第二次请求',
    objective: '说明超时重试为什么不能再写一笔。',
    inputs: '一个幂等键，两次相同的创建请求。样板在本机 labs/order-g1g2。',
    doneWhen: '写下同一幂等键的第二次请求是否返回第一次的订单，以及库存有没有再变。',
    hint: '幂等键加唯一约束。方法名本身不够。',
    answer: [
      '第二次请求不能再写一笔。orders.idempotency_key 有唯一约束。',
      '',
      '第一次创建成功，库存减 1，replay 是 false，状态码是 201。',
      '同一个键、同一个商品再请求：读回第一次的订单，返回同一笔，replay 是 true，状态码是 200。库存不再减。',
      '',
      '```http',
      'POST /orders',
      'Idempotency-Key: 8f3c',
      '',
      '201 { "orderId": 41, "replay": false }',
      '',
      'POST /orders',
      'Idempotency-Key: 8f3c',
      '',
      '200 { "orderId": 41, "replay": true }',
      '```',
      '',
      '同一个键重试 20 次，只留下 1 笔订单，库存为 0。',
      '同一个键换成另一个商品：请求摘要和第一次不一致，返回 409，type 是 idempotency-conflict。库存不再变化。',
      '这是本机样板的状态码。草案对同一键、不同载荷写的是 422。草案里的 409 留给还在进行的再试。样板没有单独表示还在进行。',
      '',
      '同一键、同一商品的重试，读回第一次的订单并返回它。同一键、不同商品时，库里能找到第一次的那一行，但摘要不同：响应仍是 409，不要再插入，也不要把第一次的订单当成这次成功返回。方法名本身不够，要靠唯一约束和这次请求的摘要。',
    ].join('\n'),
    lab: {
      command: ORDER_LAB_COMMAND,
      checks: [
        {
          id: 'twentyRetriesOfOneKeyLeaveOneOrder',
          behavior: '同一个幂等键重试 20 次，只留下 1 笔订单',
          next: '核对响应是 409、type 为 idempotency-conflict，并且没有第二次插入。',
        },
        {
          id: 'sameKeyWithAnotherSkuConflictsAndDoesNotChangeStock',
          behavior: '同一幂等键换成另一个商品时拒绝，库存不再变化',
          next: '核对请求摘要不一致时返回冲突，并且没有第二次扣库存。',
        },
        {
          id: 'firstPostCreatesAndReplayReturnsTheSameOrder',
          behavior: '第一次创建，同一键再请求返回同一笔',
          next: '核对第二次是否返回第一次的订单号，并且 replay 为 true。',
        },
      ],
    },
    estimatedMinutes: 60,
    required: true,
    skillIds: ['D01', 'idem'],
    prerequisites: ['g1.write-path'],
    rubric: 'local-pending',
  },
]

export type WrittenPart = {
  label: string
  points: number
  lookFor: string
}

export type WrittenHint = {
  level: 1 | 2 | 3
  text: string
}

export type OralAxis = {
  label: string
  max: 4
  passAt: 3
}

/** 开放笔试。不放进 LEARNING_TASKS，核心挑战仍是三档。本页不打这 10 分。 */
export type WrittenExam = {
  id: string
  version: number
  gateId: string
  code: string
  /**
   * 这道题属于哪几项技能。
   * 只有基础题（当场问答，或题号以 W1 结尾）在本地检查通过时，技能页才多一颗标记。
   * 进阶题可以写下技能，但点不亮。
   */
  skillIds?: readonly string[]
  /** 这道题的依据。页面上写出来，不留在注释里。 */
  basis: string
  question: string
  parts: readonly WrittenPart[]
  hints: readonly WrittenHint[]
  oral: readonly OralAxis[]
  /** 标准答案。有则在「先自己写」之后整段给出，lookFor 仍是阅卷要点。 */
  answer?: string
  /** 相对站点根的图，例如 exam/order-scale-architecture.svg */
  diagram?: string
}

const WRITTEN_ORAL: readonly OralAxis[] = [
  { label: '需求澄清', max: 4, passAt: 3 },
  { label: '机制', max: 4, passAt: 3 },
  { label: '证据', max: 4, passAt: 3 },
  { label: '取舍', max: 4, passAt: 3 },
]

export const G1_WRITTEN_EXAM: WrittenExam = {
  id: 'g1.written-stock',
  version: 1,
  gateId: 'g1',
  code: 'G1-W1',
  skillIds: ['D01', 'J02'],
  basis: '库存数属于持久化和事务，不属于按钮。对照本关「一个功能要同时对上页面、接口契约、用例和持久化」。',
  question: '禁用提交按钮能否保证库存不超卖？',
  parts: [
    { label: '结论', points: 3, lookFor: '不能。禁用按钮保证不了库存不超卖。' },
    { label: '机制', points: 4, lookFor: '按钮只影响这一次页面交互。库存是否超卖由后端约束和事务保住。' },
    { label: '边界', points: 3, lookFor: '脚本和另一个客户端可以绕过按钮。' },
  ],
  hints: [
    { level: 1, text: '先分清按钮管的是这一次点击，还是库存那一行。' },
    { level: 2, text: '画两个客户端同时提交时，请求分别到达哪里。' },
    { level: 3, text: '对照要点：按钮不能代替事务里的条件更新。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据 React useState 的 set 说明，以及 Vue nextTick：DOM 更新在下一次刷新，不在改值的同一句。 */
export const G1_WRITTEN_RENDER: WrittenExam = {
  id: 'g1.written-render',
  version: 1,
  gateId: 'g1',
  code: 'G1-W2',
  skillIds: ['R01', 'V01'],
  basis: 'React useState 的 set 只安排下一次渲染（https://react.dev/reference/react/useState）。Vue nextTick 把 DOM 更新放到下一次刷新（https://vuejs.org/api/general.html#nexttick）。',
  question: 'React 的 state 更新后当前事件里读到什么？Vue ref 更新后何时能读到新 DOM？',
  parts: [
    { label: '结论', points: 3, lookFor: 'React 这次事件里读到的 state 仍是这次渲染的值。Vue 改 ref 之后，新 DOM 要在 nextTick 里才能读到。两边都不能把这次调度当成 DOM 已经更新。' },
    { label: '机制', points: 4, lookFor: 'set 只安排下一次渲染，不改这次函数里的那个变量。Vue 先改响应式值，再把 DOM 更新放进队列，到下一次刷新时一起应用。' },
    { label: '边界', points: 3, lookFor: '在 React 事件里立刻读 state，或在 Vue 里立刻读 DOM，都还不是更新后的界面。' },
  ],
  hints: [
    { level: 1, text: '先分开这次函数里的变量，和页面上已经画出来的节点。' },
    { level: 2, text: 'React 写下 set 之后立刻读那个 state。Vue 写下改 value 之后立刻读 DOM，再写下 nextTick 里读 DOM。' },
    { level: 3, text: '对照要点：React 这次读到的还是旧 state。Vue 的新 DOM 要等 nextTick。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据 Spring Bean Scopes：singleton 是默认作用域，一个容器一份共享实例。prototype 只改变新建次数。 */
export const G1_WRITTEN_USER: WrittenExam = {
  id: 'g1.written-user',
  version: 1,
  gateId: 'g1',
  code: 'G1-W3',
  skillIds: ['spring'],
  basis: 'Spring Bean Scopes：singleton 是默认作用域，一个容器一份共享实例。prototype 只改变新建次数。',
  question: 'Spring 控制器单例中保存“当前用户”字段会怎样？',
  parts: [
    { label: '结论', points: 3, lookFor: '这个字段在请求之间共享。后到的请求会覆盖先到的用户。' },
    { label: '机制', points: 4, lookFor: '控制器默认是 singleton，一个容器里一份实例。当前用户要从这次请求取出来，作为参数传进用例。' },
    { label: '边界', points: 3, lookFor: '把控制器或全部组件改成 prototype，只改变新建几次，没有回答用户数据该放在哪。单例用例里再存同一份字段，覆盖还在。' },
  ],
  hints: [
    { level: 1, text: '先问这个字段是这一次请求的，还是所有请求共用的那一个对象上的。' },
    { level: 2, text: '画两个请求同时进来时，谁后写入这个字段。' },
    { level: 3, text: '对照要点：身份从这次请求拿出来，作为参数传进用例。不要靠每次新建控制器来存放这个字段。' },
  ],
  oral: WRITTEN_ORAL,
}

export const G1_WRITTEN_EXAMS: readonly WrittenExam[] = [G1_WRITTEN_EXAM, G1_WRITTEN_RENDER, G1_WRITTEN_USER]

/** 依据 InnoDB 一致性读：普通 SELECT 不加锁，其他会话仍可同时修改。快照不能代替带版本的条件更新。 */
export const G2_WRITTEN_OVERSELL: WrittenExam = {
  id: 'g2.written-oversell',
  version: 1,
  gateId: 'g2',
  code: 'G2-W1',
  skillIds: ['D01', 'J02'],
  basis: 'InnoDB 一致性读：普通 SELECT 不加锁，其他会话仍可同时修改。快照不能代替带版本的条件更新。',
  question: '为什么两个事务都查到库存 1 仍可能超卖？MVCC 能否替代条件更新？',
  parts: [
    { label: '结论', points: 3, lookFor: '会超卖。两次快照读都看到库存 1，这不等于谁独占了这一行的写入。MVCC 不能替代条件更新。' },
    { label: '机制', points: 4, lookFor: '普通 SELECT 是一致性读，不加锁。扣库存要在同一事务里做条件更新或锁定读，并检查改到了几行。' },
    { label: '边界', points: 3, lookFor: '版本或剩余数量要写在这次更新的 WHERE 里，并且订单插入还在这个事务中。不看受影响行数，后写仍会盖掉先写。' },
  ],
  hints: [
    { level: 1, text: '先分开两件事：这次 SELECT 看见的库存，和谁能把这一行写成 0。' },
    { level: 2, text: '画两个事务都读到 1 之后，各自的 UPDATE 带不带剩余数量或版本条件。' },
    { level: 3, text: '对照要点：快照读不是独占写。条件要在这个事务里，并检查改到了几行。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据 Spring 声明式事务：代理只拦外部调用；默认 RuntimeException 与 Error 回滚。REQUIRES_NEW 使用独立物理事务并另取连接，NESTED 才是保存点。 */
export const G2_WRITTEN_PROPAGATION: WrittenExam = {
  id: 'g2.written-propagation',
  version: 1,
  gateId: 'g2',
  code: 'G2-W2',
  skillIds: ['spring'],
  basis: 'Spring 声明式事务：代理只拦外部调用；默认 RuntimeException 与 Error 回滚。REQUIRES_NEW 使用独立物理事务并另取连接，NESTED 才是保存点。',
  question: 'this 调用、捕获异常、REQUIRES_NEW 各如何影响 Spring 事务？',
  parts: [
    { label: '结论', points: 3, lookFor: 'this 调用不经过代理，被调方法上的事务不会生效。外层若已经在事务里，这次调用仍留在外层事务中。异常在事务方法里被接住并正常返回时，按提交处理。REQUIRES_NEW 是另一笔物理事务，可以单独提交，不是保存点。' },
    { label: '机制', points: 4, lookFor: '默认只有从代理外面进来的调用才会被拦。默认 RuntimeException 和 Error 回滚，受检异常不回滚。REQUIRES_NEW 挂起外层事务，自己再取一条数据库连接。' },
    { label: '边界', points: 3, lookFor: '保存点是 NESTED，仍是同一笔物理事务。外层占着连接、内层再要一条时，连接池可能不够。' },
  ],
  hints: [
    { level: 1, text: '先问这次调用是从代理外面进来的，还是对象自己用 this 调自己。' },
    { level: 2, text: '画出异常有没有再抛出代理，以及 REQUIRES_NEW 和 NESTED 各用几笔物理事务。' },
    { level: 3, text: '对照要点：this 不开始被调方法的事务。接住异常并正常返回会提交。REQUIRES_NEW 单独提交，还要自己的连接。' },
  ],
  oral: WRITTEN_ORAL,
}

export const G2_WRITTEN_EXAMS: readonly WrittenExam[] = [G2_WRITTEN_OVERSELL, G2_WRITTEN_PROPAGATION]

/** 依据 Idempotency-Key 草案：同一键不得配不同载荷；重复且已完成的请求返回上一次的结果。草案对不同载荷给 422，对还在进行的再试给 409。本机样板对不同商品给 409。 */
export const G2_WRITTEN_RETRY: WrittenExam = {
  id: 'g2.written-idempotency',
  version: 1,
  gateId: 'g2',
  code: 'G2-W3',
  skillIds: ['idem'],
  basis: 'Idempotency-Key 草案：同一键不得配不同载荷；重复且已完成的请求返回上一次的结果。草案对同一键、不同载荷给 422，对还在进行的再试给 409。本机样板对同一键、不同商品返回 409，type 是 idempotency-conflict。',
  question: '同幂等键但不同请求体应该返回什么？响应丢失后怎样重试？',
  parts: [
    { label: '结论', points: 3, lookFor: '同一键配上不同请求体，应当拒绝，不要当成新的一笔去执行。响应丢失后用原来的键再请求，读回第一次已经完成的结果，不要新生成一个键。' },
    { label: '机制', points: 4, lookFor: '服务器用请求摘要判断这次是不是同一笔。键的唯一约束和业务效果放在同一事务里。摘要相同且第一次已经完成，就返回那次的结果。' },
    { label: '边界', points: 3, lookFor: '草案对同一键、不同载荷给的是 422。还在进行时再试，草案给的是 409。本机样板对同一键、不同商品返回 409，type 是 idempotency-conflict，没有单独表示还在进行。换一个新键会变成另一笔订单。' },
  ],
  hints: [
    { level: 1, text: '先分开两件事：键相同，和这次请求体是否与第一次相同。' },
    { level: 2, text: '画出响应已经丢了之后，客户端是拿原来的键再请求，还是新造一个键。' },
    { level: 3, text: '对照要点：载荷不同就拒绝。载荷相同就返回第一次的结果。不要新生成键。' },
  ],
  oral: WRITTEN_ORAL,
}

export const G2_RETRY_EXAMS: readonly WrittenExam[] = [G2_WRITTEN_RETRY]

/** 依据课上的键集分页：排序必须稳定且唯一，下一页的比较和 ORDER BY 用同一组键。并发插入或删除让页间漂移，看见哪一版要另外约定。 */
export const G3_WRITTEN_KEYSET: WrittenExam = {
  id: 'g3.written-keyset',
  version: 1,
  gateId: 'g3',
  code: 'G3-W1',
  skillIds: ['sql'],
  basis: '键集分页：排序必须稳定且唯一，下一页的比较和 ORDER BY 用同一组键。并发插入或删除让页间漂移，看见哪一版要另外约定。',
  question: '排序字段不唯一时，keyset 分页为何仍会重复或漏项？',
  parts: [
    { label: '结论', points: 3, lookFor: '只用非唯一的排序列当游标，相同值的行会在相邻两页重复，或被下一页漏掉。排序要带上能分开两行的列，游标带上这一整组键。' },
    { label: '机制', points: 4, lookFor: '下一页的比较要和 ORDER BY 同一组键。先按时间再按主键时，游标是上一页最后一行的时间和主键：时间更大，或时间相同且主键更大。过滤若换成另一组列，比的就不是这一页的边界。' },
    { label: '边界', points: 3, lookFor: '并发插入、更新、删除会让后一页相对第一次查询漂移。唯一排序只避免相邻页因相同键重复或漏项，不自动约定这次分页看见哪一版数据。' },
  ],
  hints: [
    { level: 1, text: '先看排序里有没有一列能把创建时间相同的两行分开。' },
    { level: 2, text: '画出两行时间相同、主键不同时，只用时间当游标，后一页会再取到哪一行，或把哪一行跳过。' },
    { level: 3, text: '对照要点：排序和游标用同一组键，里面要有唯一列。过滤条件和这组排序一致。并发下看见哪一版另外约定。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据 Cache Aside：写提交后删除缓存键。另一次未命中读到的旧行可以在删键之后回填。DEL 只删当时的键，不能挡住之后的写入。 */
export const G3_WRITTEN_STALE: WrittenExam = {
  id: 'g3.written-stale-cache',
  version: 1,
  gateId: 'g3',
  code: 'G3-W2',
  skillIds: ['redis'],
  basis: 'Cache Aside：写提交后删除缓存键。另一次未命中读到的旧行可以在删键之后回填。DEL 只删当时的键，不能挡住之后的写入。',
  question: '写库后删缓存为何仍可能读旧值？',
  parts: [
    { label: '结论', points: 3, lookFor: '仍可能读到旧值。有一次读在缓存未命中时拿到了写提交前的数据库值，写提交并删掉缓存之后，这次读再把旧值放回去。删一次缓存不能保证后面都是新值。' },
    { label: '机制', points: 4, lookFor: '时序是：读未命中，读到旧的数据库行，写提交并删除缓存键，然后这次读把刚才拿到的旧值回填。后面的读命中这份旧缓存。权威数据在数据库，缓存不会跟着这次提交一起变。' },
    { label: '边界', points: 3, lookFor: '要写明这段窗口可以有多长，以及谁是权威。延迟再删一次、回填时核对版本、或按变更再删键，都只是缩小窗口。不能把其中一招说成强一致。删键失败时，键上的旧值还会留着。' },
  ],
  hints: [
    { level: 1, text: '先分开两件事：写提交后删掉的那一下，和另一次读什么时候把值放回缓存。' },
    { level: 2, text: '画出读已经拿到旧行、还没回填时，写把键删掉，然后这次读再回填。' },
    { level: 3, text: '对照要点：旧值是在删键之后被放回去的。窗口可以缩小，不能靠这一招宣称强一致。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据 React effect 清理与 Vue 响应式基础：切换标识时要忽略或取消上一次请求；从 reactive 解构出的基本值不再连接代理。两边不是同一种机制。 */
export const G3_WRITTEN_FRAMEWORKS: WrittenExam = {
  id: 'g3.written-frameworks',
  version: 1,
  gateId: 'g3',
  code: 'G3-W3',
  skillIds: ['R01', 'V01'],
  basis: 'React effect 清理与 Vue 响应式基础：切换标识时要忽略或取消上一次请求；从 reactive 解构出的基本值不再连接代理。两边不是同一种机制。',
  question: 'React 请求闭包与 Vue 解构响应式对象分别会出现什么错误？',
  parts: [
    { label: '结论', points: 3, lookFor: 'React 里慢的响应会把上一次请求的结果写进当前页面。Vue 里从 reactive 对象解构出的数字或字符串不再跟着代理变。这两件要分开修，不是同一种机制。' },
    { label: '机制', points: 4, lookFor: 'React 的 effect 记住这一次渲染的筛选条件。条件变了要先清理上一次：取消请求或丢掉过期响应，并且依赖里要有这个条件。Vue 的追踪发生在代理的属性读写上。解构出的基本值是当时的数，之后改它不会通知模板。要保持连接就继续通过代理访问，或用 toRef、toRefs。' },
    { label: '边界', points: 3, lookFor: '只加 loading 分不清是哪一次请求结束。取消只停还在飞的网络，已经回来的回调仍要核对是不是最新一次。toRefs 保住的是响应式引用，不能用来取消过期请求。两边各写各的修复。' },
  ],
  hints: [
    { level: 1, text: '先分开两件事：React 这次函数记住的请求，和 Vue 从代理上拆下来的那个数字。' },
    { level: 2, text: '画出筛选已经换成新值之后，旧响应才回来；再画出从 reactive 解构出的 count 后来被改了，模板有没有动。' },
    { level: 3, text: '对照要点：React 要在依赖变化时清理并丢掉过期结果。Vue 的基本值要留在代理上，或用 toRef、toRefs。不要用同一句解释两边。' },
  ],
  oral: WRITTEN_ORAL,
}

export const G3_WRITTEN_EXAMS: readonly WrittenExam[] = [G3_WRITTEN_KEYSET, G3_WRITTEN_STALE, G3_WRITTEN_FRAMEWORKS]

/** 依据对象级授权：登录只证明身份。角色管哪一类操作，这一条资源和租户仍要在服务端核对。前端藏起入口不是这层检查。 */
export const G4_WRITTEN_AUTHZ: WrittenExam = {
  id: 'g4.written-authz',
  version: 1,
  gateId: 'g4',
  code: 'G4-W1',
  skillIds: ['S01'],
  basis: '对象级授权：登录只证明身份。角色管哪一类操作，这一条资源和租户仍要在服务端核对。前端藏起入口不是这层检查。',
  question: '登录成功且前端隐藏了按钮，为什么仍不能证明授权正确？',
  parts: [
    { label: '结论', points: 3, lookFor: '不能。登录只证明这次请求是谁。前端把按钮藏起来只影响这一次页面。服务端仍要核对这个身份能不能动这一条资源、这一个租户。' },
    { label: '机制', points: 4, lookFor: '先认证身份，再看角色允许哪一类操作，最后核对这一条的拥有者或租户。水平方向是同一类角色去动别人的那一行。垂直方向是普通身份去做只有另一类角色才允许的操作。列表查询和写入都要带上同一条拥有者或租户条件。' },
    { label: '边界', points: 3, lookFor: '只过滤列表、写入只按资源编号改，写入仍然越过拥有者。相信客户端传来的用户编号，也不能代替这次认证里的身份。网关证明了令牌有效，拥有数据的服务仍要做这一条的核对。' },
  ],
  hints: [
    { level: 1, text: '先分开三件事：这次是谁，这类人允许做什么，这一条资源属不属于这个身份。' },
    { level: 2, text: '画出列表已经按租户过滤，但更新语句的条件里只有资源编号。' },
    { level: 3, text: '对照要点：按钮藏起来不是授权。列表和写入都要带拥有者或租户。角色通过也不等于能改这一条。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据 OAuth 2.0、OpenID Connect 与 JWT：授权框架、身份层、令牌格式分开。CORS 管脚本能否读跨源响应。Cookie 仍可能自动提交，改状态还要 CSRF 防护。未加密 JWT 的载荷不是密文。 */
export const G4_WRITTEN_TOKENS: WrittenExam = {
  id: 'g4.written-tokens',
  version: 1,
  gateId: 'g4',
  code: 'G4-W2',
  skillIds: ['S01'],
  basis: 'OAuth 2.0、OpenID Connect 与 JWT：授权框架、身份层、令牌格式分开。CORS 管脚本能否读跨源响应。Cookie 仍可能自动提交，改状态还要 CSRF 防护。未加密 JWT 的载荷不是密文。',
  question: 'OAuth2、OIDC、JWT 各是什么，CORS 能防 CSRF 吗？',
  parts: [
    { label: '结论', points: 3, lookFor: 'OAuth 2.0 是授权框架，OpenID Connect 是它上面的身份层，JWT 是一种令牌格式。CORS 不能防 CSRF。' },
    { label: '机制', points: 4, lookFor: 'OAuth 2.0 把访问令牌交给资源服务器。OpenID Connect 用 ID Token 向客户端声明这次登录，认证请求的 scope 要有 openid。未加密 JWT 的载荷是编码，签名用来发现改动，默认不是把内容加密。CORS 管脚本能不能读跨源响应。Cookie 在规则允许时会自动带上，改状态的请求还要校验来源或 CSRF 令牌，并收紧 SameSite。' },
    { label: '边界', points: 3, lookFor: '访问令牌有效不等于这次登录的声明，也不等于能改这一条资源。允许的 CORS 源不能代替 CSRF 防护。把 JWT 说成密文，就会把敏感字段放进载荷。公开客户端的授权码还要 PKCE，不能写成框架默认已经打开。' },
  ],
  hints: [
    { level: 1, text: '先分成四件：授权框架、登录身份、令牌格式、浏览器跨源。' },
    { level: 2, text: '画出另一张网页提交表单时，Cookie 会不会自动带上，以及页上的脚本能不能读到响应。' },
    { level: 3, text: '对照要点：OAuth 2.0 发访问令牌，OpenID Connect 用 ID Token 表示登录，JWT 载荷默认可读。CORS 不管 Cookie 自动提交。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据上传核对与 CWE-918：扩展名不能证明内容。服务器代取地址前用完整地址的允许名单核对，并关闭自动跟随重定向。 */
export const G4_WRITTEN_UPLOAD: WrittenExam = {
  id: 'g4.written-upload',
  version: 1,
  gateId: 'g4',
  code: 'G4-W3',
  skillIds: ['S01'],
  basis: '上传核对与 CWE-918：扩展名不能证明内容。服务器代取地址前用完整地址的允许名单核对，并关闭自动跟随重定向。',
  question: '文件上传为什么不能只看扩展名？服务抓取用户 URL 有什么额外风险？',
  parts: [
    { label: '结论', points: 3, lookFor: '扩展名是客户端给出的文件名，不能证明内容。服务器按用户给的地址去取，请求从服务器所在的网络发出，调用方到不了的目标也可能被访问。' },
    { label: '机制', points: 4, lookFor: '上传要核对允许的类型、大小上限、内容和保存路径，读取时仍做访问控制。文件放到隔离存储，名字由服务端生成，不用对方给的路径。目标事先能点名时，取回前用完整地址的允许名单核对，不在名单里就拒绝，请求还没有发出。HTTP 客户端关闭自动跟随重定向。' },
    { label: '边界', points: 3, lookFor: '登录通过不代替抓取目标的核对。只比较主机名，或取回之后再看，都晚于请求已经发出。核对过的地址不能再被重定向带走。扩展名和客户端声明的类型都不能代替内容核对。' },
  ],
  hints: [
    { level: 1, text: '先分成两件：文件名不能证明内容；服务器代取时用的是自己的网络位置。' },
    { level: 2, text: '上传写出类型、大小、内容、路径和谁能读。抓取写出完整地址名单，以及重定向要不要跟着走。' },
    { level: 3, text: '对照要点：扩展名不够。名单外的地址在发出前拒绝。关闭自动跟随重定向。登录不代替这道核对。' },
  ],
  oral: WRITTEN_ORAL,
}

export const G4_WRITTEN_EXAMS: readonly WrittenExam[] = [G4_WRITTEN_AUTHZ, G4_WRITTEN_TOKENS, G4_WRITTEN_UPLOAD]

/** 依据真实数据库测试：内存库或替身证明不了生产引擎的方言、锁、隔离和约束。少量隔离测试用真实引擎，纯计算留在单元测试。 */
export const G5_WRITTEN_ENGINE: WrittenExam = {
  id: 'g5.written-engine',
  version: 1,
  gateId: 'g5',
  code: 'G5-W1',
  skillIds: ['test'],
  basis: '真实数据库测试：内存库或替身证明不了生产引擎的方言、锁、隔离和约束。少量隔离测试用真实引擎，纯计算留在单元测试。',
  question: 'H2 单元测试全绿，为什么 MySQL 并发行为仍可能出错？',
  parts: [
    { label: '结论', points: 3, lookFor: 'H2 全绿只说明替身库里被执行的断言过了。MySQL 的方言、锁、隔离和约束仍可能让并发结果不同。' },
    { label: '机制', points: 4, lookFor: '内存库验证的是接线形状，不是生产引擎的方言、锁、隔离和约束。方言 SQL、行锁、隔离和唯一约束的并发，要在真实 MySQL 上用少量隔离测试证明。Testcontainers 在测试里启动真实引擎，用完扔掉，不拿生产库当夹具。纯计算留在单元测试。接口契约核对请求和响应形状，不代替引擎行为。' },
    { label: '边界', points: 3, lookFor: '切片或 H2 绿了，只说明这一层在替身上说得通。不是每个单元测试都要启动容器，但锁和隔离不能改用 H2 交差。测试结束时回滚，也看不到另一条连接在提交之后能否读到这行。' },
  ],
  hints: [
    { level: 1, text: '先分成三层：单元、真实引擎、接口契约。问这一条绿的是哪一层。' },
    { level: 2, text: '列出必须在 MySQL 上证明的三件：方言、锁或隔离、唯一约束的并发。再列出不该为此启动容器的纯计算。' },
    { level: 3, text: '对照要点：H2 绿了只说明替身。锁和隔离要用真实引擎的少量隔离测试。契约不代替引擎。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据状态职责：地址、未提交输入、服务端响应、跨页客户端数据分开存放。服务端列表只留一处。不按 Context 或 Pinia 的名字归类。 */
export const G5_WRITTEN_STATE: WrittenExam = {
  id: 'g5.written-state',
  version: 1,
  gateId: 'g5',
  code: 'G5-W2',
  skillIds: ['query', 'pinia'],
  basis: '状态职责：地址、未提交输入、服务端响应、跨页客户端数据分开存放。服务端列表只留一处。不按 Context 或 Pinia 的名字归类。',
  question: 'React 全部数据放 Context、Vue 全部数据放 Pinia 有何问题？',
  parts: [
    { label: '结论', points: 3, lookFor: '全部放进 Context 或 Pinia，会把地址、未提交输入、服务端响应和跨页客户端数据混成一处。要按这四种职责分开。' },
    { label: '机制', points: 4, lookFor: '正在看的资源标识放在地址里，刷新和分享仍是这一条。还没提交、只属于这一页的输入留在这一页。服务端列表以成功响应为准，只放在一个缓存里，筛选变了键要变，失效只清这一处。多个页面都要读、而且客户端会继续改的会话，才放进 Context 或 Pinia。' },
    { label: '边界', points: 3, lookFor: '把同一份列表再抄进全局 store，失效时只清了请求，界面仍读旧数组。Context 的 value 每次换成新对象，所有读者都会重渲染，高频输入不该放进去。只属于当前页的请求离开后仍留在 Pinia，除非再写清理。换一个库的名字，重复来源还在。' },
  ],
  hints: [
    { level: 1, text: '先分成四件：地址、还没提交的输入、成功响应、多个页面一起改的客户端数据。' },
    { level: 2, text: '画出列表被请求缓存和全局 store 各存一份时，只清其中一处，表格读的是哪一份。' },
    { level: 3, text: '对照要点：按职责放，不按 Context 或 Pinia 的名字放。服务端列表只留一处。地址上的标识不要再抄进 store。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据测试边界与变异测试：把内部调用都替成成功，只证明替身按假设走通。断言钉住可观察结果。行覆盖率只说明执行过。 */
export const G5_WRITTEN_MOCK: WrittenExam = {
  id: 'g5.written-mock',
  version: 1,
  gateId: 'g5',
  code: 'G5-W3',
  skillIds: ['test'],
  basis: '测试边界与变异测试：把内部调用都替成成功，只证明替身按假设走通。断言钉住可观察结果。行覆盖率只说明执行过。',
  question: '测试都 mock 成成功能证明什么？为什么改实现细节不应让全部测试失效？',
  parts: [
    { label: '结论', points: 3, lookFor: '把内部调用都替成成功，只证明替身按写好的假设走通了。断言应钉住可观察的行为。改一个内部函数的名字，不应让全部测试变红。' },
    { label: '机制', points: 4, lookFor: '替身停在你不拥有的边界，例如网络、时钟和数据库。被测函数自己的计算和分支要真的跑。组件测试断言屏幕上的文字或返回值里的结果。按方法和路径返回状态码与 JSON 形状。行覆盖率只说明这些行被执行过。' },
    { label: '边界', points: 3, lookFor: '断言某个内部方法被调用了几次，封装一改名测试就全红，计算出错时那条断言却可以仍是绿的。覆盖率到了 100%，没有断言的测试仍可能让改掉返回值的变异存活。端到端仍要打真实边界，不要在替身里复制一整套后端规则。' },
  ],
  hints: [
    { level: 1, text: '先问这条绿证明的是替身返回了成功，还是用户看得到的结果。' },
    { level: 2, text: '画出只替掉网络、金额计算真的执行时，故意改错折扣，哪一条断言会红。' },
    { level: 3, text: '对照要点：替身停在边界。断言行为，不断言内部调用次数。覆盖率不等于发现了故障。' },
  ],
  oral: WRITTEN_ORAL,
}

export const G5_WRITTEN_EXAMS: readonly WrittenExam[] = [G5_WRITTEN_ENGINE, G5_WRITTEN_STATE, G5_WRITTEN_MOCK]

/** 依据排队与尾延迟：线程变多、平均变低，仍要看成功吞吐、尾延迟、错误和拒绝，以及 CPU、下游和队列有没有先满。 */
export const G6_WRITTEN_CAPACITY: WrittenExam = {
  id: 'g6.written-capacity',
  version: 1,
  gateId: 'g6',
  code: 'G6-W1',
  skillIds: ['load'],
  basis: '排队与尾延迟：线程变多、平均变低，仍要看成功吞吐、尾延迟、错误和拒绝，以及 CPU、下游和队列有没有先满。',
  question: '线程数翻倍、平均延迟下降就说明容量提升了吗？',
  parts: [
    { label: '结论', points: 3, lookFor: '不能。还要看成功吞吐、尾延迟、错误和拒绝，以及 CPU、下游和队列有没有先满。平均下降说明不了容量提升。' },
    { label: '机制', points: 4, lookFor: '请求先排队再被处理。容量够时延迟接近处理时间。到达快过处理，队列变长，等待主导尾延迟。线程池、连接池和下游都是约束。加线程可能把压力推到 CPU 或下游。成功吞吐是完成且结果正确的速率，超时和拒绝不算成功。' },
    { label: '边界', points: 3, lookFor: '一次平均下降不是同条件的多次运行。超时只通知调用方、不限制入口，池里会堆满已经注定失败的任务。处理时间已经很短时，再削几毫秒救不了排在队列后面的请求。' },
  ],
  hints: [
    { level: 1, text: '先分开四件事：成功吞吐、平均延迟、尾延迟、错误和拒绝。' },
    { level: 2, text: '画出线程变多之后，CPU、下游连接或队列哪一个先满，等待有没有变成尾延迟。' },
    { level: 3, text: '对照要点：平均下降不等于容量提升。排队时间会主导尾延迟。拒绝和错误要单独数。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据容器内存与堆上限：-Xmx 只限制堆。超过容器上限由内核终止进程。先记下退出原因、限制和堆外占用。 */
export const G6_WRITTEN_KILL: WrittenExam = {
  id: 'g6.written-kill',
  version: 1,
  gateId: 'g6',
  code: 'G6-W2',
  skillIds: ['k8s', 'jvm'],
  basis: '容器内存与堆上限：-Xmx 只限制堆。超过容器上限由内核终止进程。先记下退出原因、限制和堆外占用。',
  question: '堆并没满却被容器杀掉，应该收集什么？',
  parts: [
    { label: '结论', points: 3, lookFor: '先分清是 JVM 报了哪一块内存耗尽，还是内核因为容器上限终止了进程。堆没用满，说明不了这次只是堆的问题。' },
    { label: '机制', points: 4, lookFor: '-Xmx 只限制 Java 堆。进程还要元空间、直接内存、线程栈和代码缓存。容器的 memory limit 是整份进程的上限，到了由内核杀掉，日志里可能只有被杀，没有 Java 堆栈。要留下容器限制、退出原因、堆的峰值，以及这几块堆外占用。request 管调度，limit 管能不能继续活。' },
    { label: '边界', points: 3, lookFor: '堆转储回答对象占了哪，回答不了这次是不是内核按上限杀掉。没有 Java 的内存耗尽报错时，先抓一份大堆会停顿，也看不出退出原因。把堆调到等于容器上限，非堆一涨仍会碰到上限。重启后现象消失，就只剩一句内存不够。' },
  ],
  hints: [
    { level: 1, text: '先分开两件事：JVM 有没有报出哪一块内存耗尽，以及容器有没有因为上限终止进程。' },
    { level: 2, text: '列出堆以外还占内存的几块：元空间、直接内存、线程栈。再写下容器限制和退出原因。' },
    { level: 3, text: '对照要点：-Xmx 只限堆。超过容器上限由内核杀。峰值和退出原因要一起留。' },
  ],
  oral: WRITTEN_ORAL,
}

/** 依据 React.memo 与 Vue 编译提示：跳过渲染有前提。比较和缓存都有成本。动态依赖仍要更新。先测量。 */
export const G6_WRITTEN_RENDER: WrittenExam = {
  id: 'g6.written-render',
  version: 1,
  gateId: 'g6',
  code: 'G6-W3',
  skillIds: ['perf'],
  basis: 'React.memo 与 Vue 编译提示：跳过渲染有前提。比较和缓存都有成本。动态依赖仍要更新。先测量。',
  question: 'React memo 与 Vue 编译提示能否保证页面更快？',
  parts: [
    { label: '结论', points: 3, lookFor: '不能。两者都有前提。包上或打开之后，页面不一定更快。先测量这次更新，再决定要不要用。' },
    { label: '机制', points: 4, lookFor: 'memo 用浅比较跳过 props 没变的那次渲染。每次新建的对象或函数会让比较失败，比较本身也有成本。子组件自己的 state 或 context 变了，memo 拦不住。Vue 的补丁标记、静态提升和事件缓存是三个开关，打开框架不等于三个都开。静态部分可以被跳过，动态依赖仍要更新。' },
    { label: '边界', points: 3, lookFor: '优化不能改掉正确结果。捕获循环局部变量的内联监听若被缓存，会读到旧值。没有测量就全包，比较成本加在本来不慢的组件上。包体变小也不等于同一次点击的更新变快。' },
  ],
  hints: [
    { level: 1, text: '先问这次跳过的前提：比较的是什么，依赖有没有变。' },
    { level: 2, text: '画出父组件每次传入新函数时，memo 还跳不跳过。再画出 Vue 监听捕获了循环变量时，缓存还成不成立。' },
    { level: 3, text: '对照要点：先测量。比较和缓存都有成本。动态依赖仍要更新。正确结果不能为了少渲染被换成旧值。' },
  ],
  oral: WRITTEN_ORAL,
}

export const G6_WRITTEN_EXAMS: readonly WrittenExam[] = [G6_WRITTEN_CAPACITY, G6_WRITTEN_KILL, G6_WRITTEN_RENDER]
