/* 《分布式高并发》D8：漏桶≠天生无临界；ZK 奇数台≠法定人数定律。 */
const COVERAGE_JAVA_99 = [
  {
    track:'java', group:'分布式与高并发', id:'leaky-bucket-not-no-critical-edge',
    title:'漏桶整形出口速率，并不“天生消灭临界问题”',
    prompt:'为什么资料对比固定窗口计数器的临界突发后，写漏桶“天生不会出现临界问题”，还能保证接口常速处理？',
    core:'**固定窗口计数器**在窗口边界可叠出约两倍突发，资料批评成立。**漏桶**约束的是**出水（处理/转发）速率**上限，满则溢出或排队——它解决的是整形，不是把“临界问题”这个词消掉。入口仍可能瞬时灌满桶；若把漏桶放在网关之后，上游连接与队列照样会在边界或尖峰堆积。资料后文也承认**令牌桶允许突发**、业界更常用，见 `distributed-token-bucket`：速率与突发容量是两维，不是“漏桶完美、令牌桶将就”。选型问：要削平下游、还是允许短突发；桶放在哪一层；溢出是拒还是排。',
    why:'面试背“漏桶无临界问题”就上漏桶，用户体感变成均匀排队超时；或以为令牌桶一定更差。',
    example:'下游 DB 只能稳 200 QPS：网关漏桶按 200/s 出水，桶深限制排队。秒杀开闸若要短时 500 再回到 200，用令牌桶（补充速率 200、桶容 500）更贴业务，而不是宣称漏桶“天生无临界”。',
    task:'划掉“漏桶天生无临界问题”。写出：漏桶真正限制什么；固定窗口临界与漏桶溢出分别是什么现象。',
    answer:'划掉天生。漏桶限制出口平均速率；固定窗口临界是计数边界叠突发。漏桶仍有满桶溢出/排队，不能代替突发与速率两维设计。',
    keywords:'漏桶 令牌桶 限流 临界',
    origin:'《分布式高并发.pdf》约第 89–91 页：漏桶天生不会出现临界问题；常速处理',
    diagram:'diagrams/leaky-bucket-not-no-critical-edge.svg',
    points:['漏桶约束出水速率','满桶仍会溢出或排队','突发与速率要分开选型'],
    deep:[
      {title:'和滑动窗口',body:'滑动窗口降低固定窗口边界误差，仍是计数窗口族；与漏/令牌桶的整形模型不同。'},
      {title:'怎样自己验证',body:'同一尖峰负载分别用漏桶与令牌桶，对比通过曲线是平顶还是允许短突发。'}
    ],
    refs:[['Wikipedia：Leaky bucket','https://en.wikipedia.org/wiki/Leaky_bucket'],['Wikipedia：Token bucket','https://en.wikipedia.org/wiki/Token_bucket'],['Redis：Rate Limiting','https://redis.io/docs/latest/develop/use-cases/rate-limiter/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'zk-odd-count-not-quorum-law',
    title:'“半数存活所以要奇数台”把法定人数推错了',
    prompt:'为什么资料写 ZooKeeper 半数以上机器存活集群才可用，并因此得出“适合装在奇数台机器上”？',
    core:'ZooKeeper（ZAB）要**过半法定人数（quorum）**才能选主与提交，方向对：容错常见写成 **2f+1** 台容 f 台故障。但“过半 ⇒ 必须奇数台”不成立——**偶数集群也有 quorum**（如 4 台过半为 3），只是同样容 1 故障时 4 台比 3 台更费机器，性价比通常更差，所以工程上**偏好奇数**。把奇数写成可用性定律，会忽略：奇数也防不了错误配置、磁盘、网络分区；扩到 6/8 台时要重算多数与观测，而不是背“奇数就对”。邻接 `zk-linearizable-not-realtime`（读可能旧、线性读要 sync）。',
    why:'死背“必须 3/5/7”，加第四台观测机却说“偶数非法”；或以为奇数台就永不脑裂。',
    example:'生产常用 3 或 5。临时加第 4 台做迁移可以，但要明白 quorum 变成 3，容错仍约 1，性价比变差。不要把“奇数”当成协议字段。',
    task:'划掉“过半所以必须奇数”。写出：quorum 怎么算；为何常选 2f+1。',
    answer:'划掉必须奇数。quorum 是过半，偶数也成立。选 2f+1 是为了用更少机器容 f 故障，属于部署习惯不是禁偶定律。',
    keywords:'ZooKeeper quorum 奇数 2f+1',
    origin:'《分布式高并发.pdf》约第 144 页：半数机制故适合奇数台',
    diagram:'diagrams/zk-odd-count-not-quorum-law.svg',
    points:['可用要过半法定人数','偶数集群也有 quorum','奇数是性价比习惯'],
    deep:[
      {title:'和观察者',body:'有的部署用观察者/旁路节点不进 quorum，那是角色分工，不是“偶数非法”的补丁口诀。'},
      {title:'怎样自己验证',body:'对照官方 Admin 文档：集群规模与多数；用四节点演练算出需要几票。'}
    ],
    refs:[['ZooKeeper：Admin（集群）','https://zookeeper.apache.org/doc/current/zookeeperAdmin.html'],['ZooKeeper：Overview','https://zookeeper.apache.org/doc/current/zookeeperOver.html'],['ZooKeeper：Programmer 保证','https://zookeeper.apache.org/doc/current/zookeeperProgrammers.html#ch_zkGuarantees']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_99) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
