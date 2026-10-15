/** 闯关用的固定选项。正确项取自笔试「结论」，错项是同一题里已经否定的做法。 */

export type GateChoice = {
  id: string
  text: string
}

export type GateChoiceSet = {
  options: readonly GateChoice[]
  answerId: string
}

export const GATE_CHOICES: Readonly<Record<string, GateChoiceSet>> = {
  'g1.written-stock': {
    answerId: 'b',
    options: [
      { id: 'a', text: '能。按钮禁用后请求发不出去，库存就不会超卖。' },
      { id: 'b', text: '不能。按钮只挡住这一次点击，库存要靠事务和约束。' },
      { id: 'c', text: '能。前端把库存数和按钮绑在一起，就不需要后端再判断。' },
      { id: 'd', text: '不能。把按钮改成每个请求一份，库存就自然分开了。' },
    ],
  },
  'g1.written-render': {
    answerId: 'a',
    options: [
      { id: 'a', text: 'React 这次读到的仍是这次渲染的 state。Vue 的新 DOM 要等 nextTick。' },
      { id: 'b', text: '两边都会在这次调用里立刻读到新界面。' },
      { id: 'c', text: 'React 立刻读到新 state，Vue 要等 nextTick。' },
      { id: 'd', text: 'Vue 立刻读到新 DOM，React 要等下一次事件。' },
    ],
  },
  'g1.written-user': {
    answerId: 'c',
    options: [
      { id: 'a', text: '控制器字段按请求复制，后到的用户写不进去。' },
      { id: 'b', text: '改成 prototype 之后，用户仍可以放在控制器字段里。' },
      { id: 'c', text: '字段在请求之间共享，后到的请求会盖掉先到的用户。' },
      { id: 'd', text: '单例只在启动时有一份，请求进来之后字段就是这次私有的。' },
    ],
  },
  'g2.written-oversell': {
    answerId: 'd',
    options: [
      { id: 'a', text: '不会超卖。两次快照都看到库存 1，说明这一行已经被锁住。' },
      { id: 'b', text: '不会超卖。MVCC 会替后提交的那次自动失败。' },
      { id: 'c', text: '会超卖。快照读本身就会把库存减两次。' },
      { id: 'd', text: '会超卖。快照读不等于独占写入，还要有条件更新。' },
    ],
  },
  'g2.written-propagation': {
    answerId: 'b',
    options: [
      { id: 'a', text: '同类 this 调用仍会套上被调方法的事务。异常被接住就回滚。' },
      { id: 'b', text: 'this 调用不走代理，事务不生效。异常被接住并正常返回，按提交处理。REQUIRES_NEW 是另一笔事务。' },
      { id: 'c', text: 'REQUIRES_NEW 是当前事务里的保存点，外层回滚会一起撤掉。' },
      { id: 'd', text: '只要方法上写了事务注解，同类内部调用也会生效。' },
    ],
  },
  'g2.written-idempotency': {
    answerId: 'a',
    options: [
      { id: 'a', text: '同一键配不同请求体应拒绝。响应丢了，用原来的键读回第一次的结果。' },
      { id: 'b', text: '同一键配不同请求体应当成新的一笔执行。' },
      { id: 'c', text: '响应丢了就新生成一个键，避免和第一次冲突。' },
      { id: 'd', text: '方法名叫 createOnce 就够了，键可以每次重新生成。' },
    ],
  },
  'g3.written-keyset': {
    answerId: 'c',
    options: [
      { id: 'a', text: '只用排序列当游标就行，相同的值会自然落到同一页。' },
      { id: 'b', text: '键集分页和 OFFSET 一样，重复值不会漏、也不会重。' },
      { id: 'c', text: '只用非唯一的排序列，相同值会重复或漏掉。游标要带上能分开两行的整组键。' },
      { id: 'd', text: '把 LIMIT 加大一页，重复值就不会出现。' },
    ],
  },
  'g3.written-stale-cache': {
    answerId: 'b',
    options: [
      { id: 'a', text: '删一次缓存之后，后面的读一定是新值。' },
      { id: 'b', text: '仍可能读到旧值。未命中时拿到写提交前的库值，删缓存之后又被放回去。' },
      { id: 'c', text: '先更新数据库再删缓存，旧值就不可能回来。' },
      { id: 'd', text: '缓存未命中只会读到已提交的新值。' },
    ],
  },
  'g3.written-frameworks': {
    answerId: 'd',
    options: [
      { id: 'a', text: '两边都是同一种机制，修掉响应顺序就同时修好解构。' },
      { id: 'b', text: 'Vue 解构出的数字仍跟着 reactive 代理变。' },
      { id: 'c', text: 'React 慢响应不会盖掉当前页，因为 setState 会丢弃过期结果。' },
      { id: 'd', text: 'React 慢响应会把上一次结果写进当前页。Vue 解构出的数字或字符串不再跟着代理变。两件分开修。' },
    ],
  },
  'g4.written-authz': {
    answerId: 'a',
    options: [
      { id: 'a', text: '不能。登录只证明是谁，藏起按钮只影响页面。服务端仍要核对这条资源。' },
      { id: 'b', text: '能。登录成功就说明这个人可以改每一条数据。' },
      { id: 'c', text: '能。前端不渲染按钮，请求就不会发到这条资源。' },
      { id: 'd', text: '不能。只要换了 JWT 库，服务端就不用再核对资源。' },
    ],
  },
  'g4.written-tokens': {
    answerId: 'c',
    options: [
      { id: 'a', text: 'OAuth 2.0、OpenID Connect 和 JWT 是同一个东西的三个名字。' },
      { id: 'b', text: 'CORS 配好了，跨站请求伪造就不会发生。' },
      { id: 'c', text: 'OAuth 2.0 是授权框架，OpenID Connect 是身份层，JWT 是令牌格式。CORS 不能防 CSRF。' },
      { id: 'd', text: 'JWT 是授权框架，OAuth 2.0 是令牌格式。' },
    ],
  },
  'g4.written-upload': {
    answerId: 'b',
    options: [
      { id: 'a', text: '扩展名能证明文件内容。服务器按用户给的地址去取，只访问调用方自己能访问的目标。' },
      { id: 'b', text: '扩展名是客户端给的文件名，不能证明内容。按用户给的地址去取，会从服务器所在的网络发出。' },
      { id: 'c', text: '只要限制了扩展名白名单，内容就不用再看。' },
      { id: 'd', text: '服务器代拉地址时，目标必须是调用方浏览器也能打开的。' },
    ],
  },
  'g5.written-engine': {
    answerId: 'd',
    options: [
      { id: 'a', text: 'H2 全绿就说明 MySQL 上的并发结果也成立。' },
      { id: 'b', text: 'H2 和 MySQL 的锁、隔离、约束行为一致，方言不影响这条测试。' },
      { id: 'c', text: '全绿只说明测试没编译过，和数据库无关。' },
      { id: 'd', text: 'H2 全绿只说明替身库里的断言过了。MySQL 的方言、锁、隔离和约束仍可能不同。' },
    ],
  },
  'g5.written-state': {
    answerId: 'a',
    options: [
      { id: 'a', text: '不能全部放进 Context 或 Pinia。地址、未提交输入、服务端响应和跨页数据要分开。' },
      { id: 'b', text: '全部放进 Context 或 Pinia，四种数据就有了同一个更新时机。' },
      { id: 'c', text: '地址栏和未提交输入都该放进服务端响应那一处。' },
      { id: 'd', text: 'Pinia 和 Context 只保存跨页数据，另外三种不会被放进去。' },
    ],
  },
  'g5.written-mock': {
    answerId: 'c',
    options: [
      { id: 'a', text: '把内部调用都替成成功，就证明这条业务行为成立。' },
      { id: 'b', text: '改一个内部函数的名字，全部测试变红才说明测到了行为。' },
      { id: 'c', text: '内部调用都替成成功，只证明替身按假设走通。断言要钉住可观察的行为。' },
      { id: 'd', text: '替身返回成功时，不需要再断言外面看得到的结果。' },
    ],
  },
  'g6.written-capacity': {
    answerId: 'b',
    options: [
      { id: 'a', text: '能。平均响应时间下降，就说明容量提升了。' },
      { id: 'b', text: '不能。还要看成功吞吐、尾延迟、错误和拒绝，以及 CPU、下游和队列有没有先满。' },
      { id: 'c', text: '能。只要 QPS 变大，尾延迟和错误可以不看。' },
      { id: 'd', text: '不能。容量只看 CPU，吞吐和延迟都不算。' },
    ],
  },
  'g6.written-kill': {
    answerId: 'd',
    options: [
      { id: 'a', text: '堆没用满，就可以确定是堆内存的问题。' },
      { id: 'b', text: '进程消失就是 JVM 堆耗尽，内核不会因为容器上限终止进程。' },
      { id: 'c', text: '两种都叫内存不够，处理步骤相同。' },
      { id: 'd', text: '先分清是 JVM 哪一块耗尽，还是内核因为容器上限终止了进程。堆没用满说明不了只是堆的问题。' },
    ],
  },
  'g6.written-render': {
    answerId: 'a',
    options: [
      { id: 'a', text: '不能。包上或打开之后不一定更快。先测量这次更新，再决定用不用。' },
      { id: 'b', text: '能。React.memo 和 Vue 的缓存包上就一定更快。' },
      { id: 'c', text: '能。只要组件重渲染了，加上缓存就不会再有代价。' },
      { id: 'd', text: '不能。这两种写法官方已经不建议使用。' },
    ],
  },
}

export function choicesFor(examId: string): GateChoiceSet | undefined {
  return GATE_CHOICES[examId]
}
