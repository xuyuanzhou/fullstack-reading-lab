/* Elasticsearch 导论：是什么与何时用；优劣与容量框架；与 DB 检索边界。 */
const COVERAGE_JAVA_103 = [
  {
    track:'java', group:'搜索', id:'es-what-and-when',
    title:'Elasticsearch 是分布式搜索与分析引擎，不是替库',
    prompt:'为什么一说“全文搜索、日志检索”，资料就推 Elasticsearch，却又不能把它当订单主库？',
    promptAnswer:'ES 适合全文检索与分析。订单主账本仍在数据库，不能当万能库。',
    core:'**Elasticsearch（ES）**是建立在 **Apache Lucene** 之上的**分布式搜索与分析引擎**：把文档建成**倒排索引**，用**分片与副本**组成集群，对外提供 **HTTP/JSON API** 做检索、过滤与聚合。它擅长：商品/内容**全文检索**、日志与指标的**检索与聚合**、带 facet 的筛选列表。它**不是**通用关系库：没有替你保证跨文档 ACID 账本、不是“任意 SQL 都更快”的替身。主交易数据仍放数据库；ES 常做**可重建的检索投影**。层次见 `es-lucene-not-btree`；倒排见 `es-inverted-index`。',
    why:'把订单、库存直接只写 ES，对账与强一致写挂掉；或反过来以为“有 MySQL 就不该有搜索引擎”。',
    example:'商品标题/详情同步到 ES 供搜索与类目筛选；下单、支付、库存变更仍走 MySQL 事务。日志管道写入 ES 做排查检索，权威业务状态不在 ES。',
    task:'划掉“ES=万能数据库”。用两句话：它是什么；典型三类用途各举一例。',
    answer:'划掉万能库。ES 是分布式搜索与分析引擎（倒排+分片+HTTP API）。典型：全文搜商品、检日志、做筛选聚合。主账本仍在数据库。',
    keywords:'Elasticsearch Lucene 搜索引擎 分片',
    diagram:'diagrams/es-what-and-when.svg',
    points:['ES 是搜索与分析引擎不是替库','建立在 Lucene 与分片集群之上','全文、日志检索、筛选聚合是典型用途'],
    deep:[
      {title:'和 OpenSearch',body:'OpenSearch 是兼容生态的分叉发行版；本课机制以 Elasticsearch 官方文档为准，选型时单独核对版本与许可。'},
      {title:'怎样自己验证',body:'对照官方 “What is Elasticsearch”：写出索引、文档、分片各一句；再列出一个不该只放 ES 的业务表。'}
    ],
    refs:[['Elasticsearch：What is Elasticsearch','https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html'],['Elasticsearch：文档','https://www.elastic.co/guide/en/elasticsearch/reference/current/documents-indices.html'],['Apache Lucene','https://lucene.apache.org/']]
  },
  {
    track:'java', group:'搜索', id:'es-tradeoffs-capacity',
    title:'优缺点与容量要按分片和查询形态估，没有全站通用并发数',
    prompt:'为什么面试常问“ES 并发多少、能撑多少数据”，却很难有一句标准答案？',
    promptAnswer:'没有固定的并发/容量口号。看分片体积与查询形态，用压测。',
    core:'**优点**：检索可水平扩展；默认**近实时**可见（见 `es-refresh-visibility`）；过滤与**聚合**适合列表与看板。**代价**：映射变更常要 **reindex**（见 `es-mapping-reindex`）；搜索不是强一致读己之写；集群要管分片、副本、磁盘与脑裂风险；深分页与重聚合很贵。**容量**：没有“全站通用 QPS/PB”。粗框架是：数据量 ≈ 分片数 × 单分片可接受体积；吞吐取决于查询复杂度、堆与文件系统缓存、副本与协调节点。官方用 **shard sizing** 与压测定界，背一个并发数字会误导。**为何用**：当检索/分析形态与 OLTP 正交、DB `LIKE` 扛不住时再引入，并接受同步与运维成本。',
    why:'背“百万 QPS、PB 级”上线，复杂聚合把集群打满；或不敢上 ES 只因说不清一个固定并发。',
    example:'商品索引：先定单分片目标体积与峰值搜索 QPS，压测 term + filter + 一两个 agg；日志索引按时间滚动索引控制分片膨胀。数字写在容量表里，不写在面试口号里。',
    task:'划掉“ES 并发=某个固定数”。写出：优点两条、代价两条；容量要测量的两个变量。',
    answer:'划掉固定并发。优点如水平检索与近实时聚合；代价如映射重建与运维。容量看分片体积与查询形态，用压测，不背口号。',
    keywords:'Elasticsearch 容量 分片 近实时 权衡',
    diagram:'diagrams/es-tradeoffs-capacity.svg',
    points:['优点是扩展检索与近实时分析','代价含映射重建与运维复杂度','容量靠分片与压测没有万能数字'],
    deep:[
      {title:'分片经验',body:'单分片过大难恢复；分片过多空耗管理。以官方 size-your-shards 为起点，再按业务查询压测。'},
      {title:'怎样自己验证',body:'同一数据集对比：简单 term 与重聚合的延迟；把分片数减半再测，观察吞吐与恢复时间变化。'}
    ],
    refs:[['Elasticsearch：Size your shards','https://www.elastic.co/guide/en/elasticsearch/reference/current/size-your-shards.html'],['Elasticsearch：近实时搜索','https://www.elastic.co/guide/en/elasticsearch/reference/current/near-real-time.html'],['Elasticsearch：集群','https://www.elastic.co/guide/en/elasticsearch/reference/current/scalability.html']]
  },
  {
    track:'java', group:'搜索', id:'es-vs-db-search',
    title:'DB 的 LIKE 与 ES 检索解决的不是同一类问题',
    prompt:'为什么商品名用 `LIKE \'%手机%\'` 能出结果，却仍常把搜索放到 Elasticsearch？',
    promptAnswer:'LIKE 能出结果也不等于检索系统。ES 提供分词相关性与规模化筛选，是可重建投影。',
    core:'关系库擅长**事务与按键/索引点查**；`LIKE \'%…%\'` 或简易全文往往缺**相关性排序**、灵活**分词**、大规模**聚合/facet**与可控的深分页（ES 侧见 `es-search-after`、`es-aggregations`、`elastic-analysis`）。ES 把文档当**检索投影**：主数据在 DB 提交后，经同步/Outbox 写入索引；索引可重建，权威状态以 DB 为准。不要把“能模糊匹配”等同于“已经有搜索引擎”。边界：强一致读己之写、多行事务仍在 DB；相关性与探索式检索在 ES。',
    why:'全站模糊搜打爆 MySQL；或 ES 当唯一真相源导致对账失败。',
    example:'下单改库存只写 MySQL；异步把可搜字段 upsert 到 ES。搜索页打 ES；订单详情按 id 回源 DB。重建索引时别名切换，用户无感。',
    task:'划掉“LIKE=搜索引擎”。列出：DB 仍负责什么；ES 多提供哪三类能力。',
    answer:'划掉等价。DB 负责事务与权威状态。ES 多提供分词相关性、规模化筛选聚合、更合适的检索分页。ES 是可重建投影。',
    keywords:'Elasticsearch MySQL LIKE 检索投影',
    diagram:'diagrams/es-vs-db-search.svg',
    points:['LIKE 不是搜索引擎','ES 补相关性分词与聚合','主数据在 DB，ES 是投影'],
    deep:[
      {title:'和同步',body:'双写竞态、延迟与重建策略要单独设计；本课只钉职责边界，不展开整条管道。'},
      {title:'怎样自己验证',body:'同一批标题：DB 前缀/后缀 LIKE 与 ES match 对比排序是否按相关度；加类目聚合看 DB 是否要另写一堆 SQL。'}
    ],
    refs:[['Elasticsearch：搜索','https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html'],['MySQL：全文搜索','https://dev.mysql.com/doc/refman/8.4/en/fulltext-search.html'],['Elasticsearch：可搜索的字段类型','https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_103) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
