/* 数据库章导论：MySQL/RDBMS 是什么；优劣与容量；相对缓存与搜索。 */
const COVERAGE_JAVA_106 = [
  {
    track:'java', group:'数据库', id:'mysql-what-and-when',
    title:'MySQL 是关系库，管事务与权威数据，不是搜索/缓存引擎',
    prompt:'为什么业务一上来先落 MySQL，却又不能拿它当 Elasticsearch 或 Redis 用？',
    promptAnswer:'MySQL 管事务和权威数据。全文搜索与通用缓存要交给专用系统，不能把库当 ES 或 Redis 用。',
    core:'**MySQL（InnoDB）**是**关系型数据库**：表、约束、事务（ACID 语义）、索引与 SQL。它擅长：**权威业务状态**、多行一致性写、按键/索引的点查与关联。默认引擎与边界见 `mysql-innodb-default-not-ban-others`、`mysql-acid-c-is-consistency`。它**不是**全文搜索引擎（见 `es-what-and-when`），也**不是**通用内存缓存（见 `redis-what-and-when`）。复杂探索式检索、海量日志分析、纯热点缓存应考虑专用组件。',
    why:'用 `LIKE \'%词%\'` 扛商城搜索；或把会话与排行榜硬塞进表却抱怨慢；或反过来不敢用事务库。',
    example:'订单/库存/支付在 MySQL 事务内提交；商品搜索走 ES；详情热点走 Redis。三套职责分开。',
    task:'划掉“一个 MySQL 搞定搜索和缓存”。用两句话：它是什么；最适合的两类工作负载。',
    answer:'划掉万能。MySQL 是关系库，管事务与权威数据。适合一致性写与按索引查询。搜索与通用缓存交给专用系统。',
    keywords:'MySQL InnoDB 事务 权威数据',
    diagram:'diagrams/mysql-what-and-when.svg',
    points:['MySQL 是关系库与事务引擎','适合权威状态与索引查询','不是搜索引擎或通用缓存'],
    deep:[
      {title:'和其他库',body:'PostgreSQL/等也是 RDBMS 家族；本课以 MySQL 8.x 文档为核对基线。'},
      {title:'怎样自己验证',body:'对照 InnoDB 事务文档写一句 ACID 边界；再列一个不该只靠 MySQL 的检索场景。'}
    ],
    refs:[['MySQL：InnoDB','https://dev.mysql.com/doc/refman/8.4/en/innodb-storage-engine.html'],['MySQL：事务','https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html'],['MySQL：优化概述','https://dev.mysql.com/doc/refman/8.4/en/optimization.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-tradeoffs-capacity',
    title:'MySQL 优缺点与容量看缓冲池、查询与复制，没有万能 QPS',
    prompt:'有人背“单库多少 QPS、单表多少行”当容量定律。为什么不能？',
    promptAnswer:'没有固定的“单库 QPS / 单表行数”定律。容量看缓冲池、查询形态与复制，要用压测。',
    core:'**优点**：事务与约束、成熟生态、按索引的稳定点查。**代价**：错误索引/SQL 放大锁与 IO；大表变更与备份窗口；水平扩展有分片/分布式事务成本，见 `mysql-scalability-not-hopeless`、`mysql-split-not-at-ten-million`。**容量**：没有全站通用 QPS/行数阈值。粗框架：缓冲池命中、行与索引体积、查询形态（点查 vs 扫）、复制延迟与硬件；用压测与 `EXPLAIN`/监控定界。千万行拆表不是铁律。**为何用**：需要事务权威源时作为默认主存。',
    why:'背“单表一千万必拆”或“QPS 五万”上线；复杂报表打满实例却怪“MySQL 不行”。',
    example:'订单库按真实 QPS 与 P99 压测；慢查询用 EXPLAIN；只读报表可走副本并接受 lag。行数只是输入之一。',
    task:'划掉“单表行数/QPS=固定上限”。写出：优点两条、代价两条；容量两个变量。',
    answer:'划掉固定上限。优点如事务与索引点查；代价如坏 SQL 与扩展成本。容量看缓冲池、查询形态与复制，用压测。',
    keywords:'MySQL 容量 缓冲池 EXPLAIN 压测',
    diagram:'diagrams/mysql-tradeoffs-capacity.svg',
    points:['优点是事务与成熟 OLTP','代价含坏 SQL 与扩展成本','容量靠压测没有万能行数'],
    deep:[
      {title:'和读写分离',body:'副本摊读负载，不自动强一致读己之写，见 rw-split-not-strong-consistency。'},
      {title:'怎样自己验证',body:'同一表对比主键点查与无索引扫的 EXPLAIN/耗时；观察缓冲池命中变化。'}
    ],
    refs:[['MySQL：InnoDB Buffer Pool','https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html'],['MySQL：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html'],['MySQL：复制','https://dev.mysql.com/doc/refman/8.4/en/replication.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-vs-cache-search',
    title:'库、缓存、搜索分工：权威、加速、检索投影',
    prompt:'什么时候该加 Redis 或 Elasticsearch，而不是继续只加 MySQL 索引？',
    core:'**MySQL** 保权威与事务；**Redis** 加速热点读与结构型热状态（`redis-vs-db-cache`）；**Elasticsearch** 做相关性检索与聚合投影（`es-vs-db-search`）。继续堆索引解决不了：跨字段相关性排序、海量日志检索、跨实例共享的微秒级缓存。反过来，缓存/搜索**不能**单独当账本。选型顺序：先写清一致性与查询形态，再决定是否引入第二系统及同步方式。',
    why:'商城搜索死撑 LIKE；详情页每次打库却拒缓存；或 ES/Redis 当唯一真相。',
    example:'下单事务只写 MySQL；异步同步可搜字段到 ES；详情 Cache Aside 进 Redis。重建索引不影响订单表权威。',
    task:'划掉“加索引=搜索引擎/缓存”。为权威写、热点读、全文搜各指定一种系统。',
    answer:'划掉等价。权威写用 MySQL。热点读用 Redis。全文/聚合检索用 ES。三者职责分开，投影可重建。',
    keywords:'MySQL Redis Elasticsearch 职责分工',
    diagram:'diagrams/mysql-vs-cache-search.svg',
    points:['库管权威与事务','缓存加速热点','搜索引擎做检索投影'],
    deep:[
      {title:'和 NoSQL 标签',body:'“NoSQL”不是最终一致的同义词，见 nosql-label-not-eventual。'},
      {title:'怎样自己验证',body:'同一需求写三列：一致性、延迟、查询形态；每列只允许一种主系统。'}
    ],
    refs:[['MySQL：全文搜索','https://dev.mysql.com/doc/refman/8.4/en/fulltext-search.html'],['Redis：Cache Aside','https://redis.io/docs/latest/develop/use-cases/cache-aside/'],['Elasticsearch：What is','https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_106) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
