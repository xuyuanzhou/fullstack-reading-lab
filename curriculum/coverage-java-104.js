/* 缓存章导论：Redis 是什么；优劣与容量；相对数据库。 */
const COVERAGE_JAVA_104 = [
  {
    track:'java', group:'缓存', id:'redis-what-and-when',
    title:'Redis 是内存数据结构服务，常作缓存与热状态，不是替库',
    prompt:'为什么资料一上来讲 String/Hash，却很少先说清 Redis 到底是什么、什么时候不该用？',
    promptAnswer:'Redis 适合热数据与低延迟结构。权威数据与复杂事务仍在库里。',
    core:'**Redis** 是以内存为主的**数据结构服务器**：提供 String、Hash、List、Set、Sorted Set、Stream 等结构与原子命令，可选持久化与复制。典型用途：**缓存**（热点读）、会话/限流计数、排行榜、短队列与锁等**热状态**。它**不是**通用关系库：默认内存容量受限；持久化与复制语义不同于 InnoDB 事务账本；大对象与复杂多键事务不适合硬塞。结构选型见 `redis-data-types`；旁路缓存见 `cache-aside-steps`。',
    why:'把全部业务表只放 Redis，宕机或淘汰丢权威数据；或反过来以为“有 MySQL 就永远不需要缓存”。',
    example:'商品详情 Cache Aside：DB 权威，Redis 缓存热点。排行榜用 ZSet。订单支付状态仍以 MySQL 事务为准。',
    task:'划掉“Redis=万能数据库”。用两句话：它是什么；三类典型用途各一例。',
    answer:'划掉万能库。Redis 是内存数据结构服务。典型：缓存热点、排行榜/计数、短队列或锁。权威交易状态仍在数据库。',
    keywords:'Redis 缓存 数据结构 内存',
    diagram:'diagrams/redis-what-and-when.svg',
    points:['Redis 是内存数据结构服务','擅长缓存与热状态','不是替关系库做账本'],
    deep:[
      {title:'和本地缓存',body:'进程内缓存更低延迟但难共享与失效；Redis 跨实例共享。见 cache-local-vs-distributed。'},
      {title:'怎样自己验证',body:'对照 Redis 文档 “Introduction”：列出三种结构命令；再写出一个不该只存 Redis 的表。'}
    ],
    refs:[['Redis：Introduction','https://redis.io/docs/latest/get-started/'],['Redis：Data types','https://redis.io/docs/latest/develop/data-types/'],['Redis：Persistence','https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/']]
  },
  {
    track:'java', group:'缓存', id:'redis-tradeoffs-capacity',
    title:'Redis 优缺点与容量看内存、命令与淘汰，没有全站通用 QPS',
    prompt:'为什么面试爱问“Redis 能扛多少并发”，却很难有一句标准答案？',
    promptAnswer:'内存与单线程模型是代价。容量与淘汰策略要按键形态算，不能背固定 QPS。',
    core:'**优点**：单线程命令模型下延迟低、结构贴访问方式、复制/集群可扩展读与分片。**代价**：内存贵；持久化/复制不是免运维；大 key、热 key、错误淘汰策略会放大故障；MULTI/Lua 有边界，见 `redis-transaction`、`redis-lua-atomic`。**容量**：没有全站通用 QPS。粗框架：可用内存、值大小、命令复杂度、网络与是否 Cluster 分片；用压测与 `INFO`/`MEMORY` 定界，背一个固定并发会误导。**为何用**：读多写少或需要原子结构操作、且可接受缓存语义时引入。',
    why:'背“十万 QPS”上线，大 key 与热 key 把实例打满；或不敢上缓存只因说不清数字。',
    example:'缓存实例按工作集体积定 maxmemory 与淘汰策略；对热点 GET/SET 与含 KEYS/重 Lua 的路径分别压测。数字写在容量表，不写在口号。',
    task:'划掉“Redis 并发=固定数”。写出：优点两条、代价两条；容量要看的两个变量。',
    answer:'划掉固定并发。优点如低延迟结构与可扩展缓存；代价如内存与运维。容量看内存与命令形态，用压测。',
    keywords:'Redis 容量 maxmemory 淘汰 压测',
    diagram:'diagrams/redis-tradeoffs-capacity.svg',
    points:['优点是低延迟与结构命令','代价含内存与运维复杂度','容量靠内存与压测没有万能数字'],
    deep:[
      {title:'单线程误解',body:'命令执行侧常是单线程，I/O 与模块可多线程；不等于“永远单核跑满全世界”。见 redis-single-thread。'},
      {title:'怎样自己验证',body:'同一实例对比小 String GET 与大 value / 复杂 Lua 的延迟；改小 maxmemory 观察淘汰与拒绝。'}
    ],
    refs:[['Redis：Memory optimization','https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/memory-optimization/'],['Redis：Benchmark','https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/benchmarks/'],['Redis：Eviction','https://redis.io/docs/latest/develop/reference/eviction/']]
  },
  {
    track:'java', group:'缓存', id:'redis-vs-db-cache',
    title:'数据库负责权威状态，Redis 缓存不能自动保证一致',
    prompt:'为什么“查库慢就加 Redis”之后，用户仍偶发看到旧数据或空窗？',
    promptAnswer:'缓存是加速层，不是第二权威源。旁路读写与失效策略决定会不会读到旧值。',
    core:'**数据库**提供事务与持久权威状态；**Redis 缓存**用延迟换吞吐，默认允许**短暂不一致**。旁路（Cache Aside）要处理未命中回源、写后删/更新缓存与并发回填，见 `cache-aside-steps`、`cache-db-double-write-race`。穿透/击穿/雪崩是另一类故障，见 `cache-penetration-vs-breakdown`。不要把“有缓存”当成“已与 DB 强一致”。边界：钱货账本在 DB；可重建的热点投影可进 Redis。',
    why:'写库成功却读到旧缓存；或缓存当唯一真相源导致对账失败。',
    example:'改价写 MySQL 后删缓存键；读未命中再回源。详情页读 Redis；下单扣库存只信 DB 行锁/事务。',
    task:'划掉“加了 Redis=永远新数据”。写出：DB 仍负责什么；缓存多提供什么；一种仍见旧值的时序。',
    answer:'划掉永远新。DB 负责权威与事务。缓存加速热点读。写后并发回填仍可能短暂旧值，要删键/版本等策略。',
    keywords:'Redis Cache Aside 一致性 数据库',
    diagram:'diagrams/redis-vs-db-cache.svg',
    points:['DB 是权威状态','缓存默认可短暂不一致','旁路要处理回填与失效'],
    deep:[
      {title:'和本地缓存',body:'多级缓存失效更难；先钉 Redis 与 DB 契约再叠加本地。'},
      {title:'怎样自己验证',body:'两线程：写库与读回填交错，观察旧值窗口；再试写后删键是否缩短窗口。'}
    ],
    refs:[['Redis：Cache Aside','https://redis.io/docs/latest/develop/use-cases/cache-aside/'],['Redis：Key eviction','https://redis.io/docs/latest/develop/reference/eviction/'],['MySQL：事务','https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_104) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
