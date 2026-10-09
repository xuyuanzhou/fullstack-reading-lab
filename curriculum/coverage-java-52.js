/* 《分布式高并发》D8 续抽：Cluster 步进发号、NoSQL 标签、千万行拆表口诀。 */
const COVERAGE_JAVA_52 = [
  {
    track:'java', group:'缓存', id:'redis-cluster-incr-not-five-steps',
    title:'Redis Cluster 不会把 INCR 拆成五台步进发号',
    prompt:'为什么资料说开一个五节点集群，把初值设成 1 到 5、步长设成 5，就能并行发号并顺便去掉单点？',
    core:'`INCR` 作用在**一个键**上，原子性也只覆盖这一键。Cluster 按槽把键放到**一个主节点**；同名键不会在五台上各计各的。故障转移把这个键的值交给新主，计数接着涨，不会自动变成五段互不重叠的序列。资料里的「五台初值 1、2、3、4、5，步长都是 5」是**五份独立计数器**，调用方必须钉死自己用哪一份。那是分开的实例或分开的键，不是「连上 Cluster 就自动分号」。全局号还要持久化，进程重启不能从初值再走一遍。单库自增与雪花的边界见 `distributed-unique-id`、`mysql-uuid-not-clustered-pk`。',
    why:'应用随便连集群里任意节点并对同一个键 INCR，五台其实只有一台在加。若每台各记各的、又没有固定步长和钉死的客户端，合并后号会撞。故障转移之后有人把计数器清回初值，已经发出的号会再出现。',
    example:'键 `id:order` 落在槽 9000 的主节点。五个应用都 `INCR id:order`，QPS 仍打在这一槽。要五段号，应是五个键或五台独立 Redis，每段写明起点与步长，客户端按实例固定取号，并把当前值落盘。主从切换后读到的应是切换前的计数值，而不是 1。',
    task:'划掉“Cluster=五台步进发号”。写出：同一个键的 INCR 落在几台主上；五段互不重叠的号要由谁钉死。',
    answer:'同一个键只落在一台主上，故障转移继续这份计数。五段步长是五份独立计数器，客户端要钉死用哪一份，并持久化当前值。连上 Cluster 不会自动把一个 INCR 拆成五段。',
    keywords:'Redis Cluster INCR 发号 槽 步长',
    origin:'《分布式高并发.pdf》约第 196 页：用 Redis 集群按 1..5 初值与步长 5 发全局 ID',
    diagram:'diagrams/redis-cluster-incr-one-slot.svg',
    points:['INCR 的原子性只覆盖一个键','Cluster 把该键放在一个槽、一台主上','五段步长要独立计数器并钉死客户端，故障转移不重置初值'],
    deep:[
      {title:'和代理取模',body:'Twemproxy 一类代理也不是 Cluster 协议，见 `redis-proxy-hash-not-cluster`。发号若走代理，仍要问清键落在哪一台，以及宕机后计数是否还在。'},
      {title:'和全局发号',body:'分库自增与雪花边界见 distributed-unique-id、mysql-uuid-not-clustered-pk。不要把 Cluster 上的单个 INCR 键当成五段步进发号器。'},
      {title:'怎样自己验证',body:'对同一个键连续 INCR，用 `CLUSTER KEYSLOT` 与 `CLUSTER NODES` 看槽位。再在另一节点对同一键 INCR，值应连续，而不是各从 1、2、3 起步。'}
    ],
    refs:[['Redis：INCR','https://redis.io/docs/latest/commands/incr/'],['Redis：集群规范','https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/']]
  },
  {
    track:'java', group:'数据库', id:'nosql-label-not-eventual',
    title:'NoSQL 是分类标签，不是「最终一致、没有 ACID」',
    prompt:'为什么对照表把 NoSQL 写成「最终一致性，而非 ACID」？',
    core:'NoSQL 只表示「这一类系统不把 SQL 当唯一接口」，里面有键值、文档、列族、图，**一致性模型各不相同**。MongoDB 从 4.0 起可以在副本集上做多文档事务，见 `mongo-multi-doc-txn`。Redis 对单个键的命令在主节点上原子完成；从副本读才可能看到复制延迟。Cassandra 一类可以按请求选择一致性级别，不能把「最终一致」写成全部 NoSQL 的定义。反过来，MySQL 主从之间的读也会暂时分叉，见 `mysql-replica-lag`。ACID 里的 C 是约束不被事务弄破，和 CAP 的 C 也不是同一个词，见 `distributed-cap`、`mysql-acid-c-is-consistency`。',
    why:'面试背成「上了 NoSQL 就不要事务、读到旧值也正常」，该用多文档事务的扣款被拆成两次裸写；该接受副本延迟的报表却被要求每次都线性一致。',
    example:'订单与库存两条文档要一起成功：在 MongoDB 副本集里开事务，而不是说「文档库所以最终一致」。Redis 上 `INCR` 库存在主节点是原子的。报表允许读从库时，要写明能接受多少复制延迟，这和选了 MySQL 还是 MongoDB 无关。',
    task:'划掉“NoSQL=最终一致且没有 ACID”。给键值单键、文档多文档、主从只读各写一句：一致性由什么决定。',
    answer:'标签不决定一致性。单键命令看该键在主上的原子性。多文档是否进一个事务看产品与版本（MongoDB 副本集事务）。从副本读要单独写能接受的延迟。MySQL 从库同样可以暂时落后。',
    keywords:'NoSQL ACID 最终一致 MongoDB Redis 事务',
    origin:'《分布式高并发.pdf》约第 57 页：把 NoSQL 概括为最终一致性而非 ACID',
    diagram:'diagrams/nosql-label-not-consistency.svg',
    points:['NoSQL 是接口与模型的分类，不是一致性级别','MongoDB 多文档事务与 Redis 单键原子都存在','从副本读的延迟要单独约定，SQL 库也一样'],
    deep:[
      {title:'和 BASE 口诀',body:'BASE 描述的是有些系统用放松「立刻一致」换吞吐，它不是禁令，也不是一种可执行算法。能不能开事务，以你锁定的数据库版本文档为准。'},
      {title:'怎样自己验证',body:'打开 MongoDB 事务文档，确认副本集上的多文档事务。再对 Redis 主节点执行 INCR，从节点在复制完成前读，观察是否可能落后。两条都成立时，对照表那一行就不能当定义。'}
    ],
    refs:[['MongoDB：事务','https://www.mongodb.com/docs/manual/core/transactions/'],['Redis：INCR','https://redis.io/docs/latest/commands/incr/'],['Redis：复制','https://redis.io/docs/latest/operate/oss_and_stack/management/replication/']]
  },
  {
    track:'java', group:'数据库', id:'mysql-split-not-at-ten-million',
    title:'单表一千万行不是必须拆分的定律',
    prompt:'为什么拆分原则里写着「单表拆到一千万以内」，计数一到就开工分库？',
    core:'InnoDB 没有「一千万行必须拆表」这条服务器限制。行能不能扛住，看行宽、二级索引、缓冲池能否装下热数据、锁与复制延迟、备份和 DDL 窗口，而不是一个整数。点查走主键、热数据集中时，远超过一千万行仍可能只打到少量页。反过来，宽行、大量二级索引或全表扫描，不到这个数也会把缓冲池打满。拆分引入跨库连接、分页和分布式事务，见 `distributed-one-db-first`。原则里「尽量不拆、先进化」比这条整数更接近决策顺序。',
    why:'按行数切库之后，分页和事务先坏掉，缓冲池命中率却几乎没变，因为热数据本来就放得下。',
    example:'订单点查 `WHERE id=?`，热的是近 30 天，缓冲池能装下这些页。表里有两千万历史行也不构成拆分理由。若 `EXPLAIN` 显示大范围扫描、复制延迟随写入上升、备份超过维护窗，再谈按时间或按键拆，并写明跨库查询怎么做。',
    task:'划掉“到一千万必须拆”。列出要先测量的三项：热数据与缓冲池、慢查询形态、复制或备份窗口。',
    answer:'行数本身不是拆分开关。先看热页是否进得了缓冲池、查询是点查还是大扫描、复制延迟和备份是否已经超窗。这三项都健康时，保留单表。拆分后再处理跨库分页与事务。',
    keywords:'分库分表 一千万 InnoDB 缓冲池 拆分',
    origin:'《分布式高并发.pdf》约第 68 页：拆分原则写单表数据到一千万以内',
    diagram:'diagrams/mysql-split-not-ten-million.svg',
    points:['没有「一千万行必须拆」的服务器限制','先测热数据、查询形态、复制与备份窗口','拆分的代价是跨库查询和事务，不是行计数器'],
    deep:[
      {title:'和 UUID 主键',body:'随机主键让插入落在叶子中间，页分裂在行数不大时就会出现，见 `mysql-uuid-not-clustered-pk`。那是键的分布问题，不是「到了一千万」。'},
      {title:'怎样自己验证',body:'看 `information_schema` 或表统计里的行数，同时看缓冲池命中与慢查询。行数过千万但点查仍走主键、命中率健康，就不应按这条口诀拆。'}
    ],
    refs:[['MySQL：InnoDB 限制','https://dev.mysql.com/doc/refman/8.4/en/innodb-limits.html'],['MySQL：缓冲池','https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_52) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
