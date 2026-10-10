/* Java 92: W3CSchool 续扫 — MySQL JSON≠文档库；Redis 客户端缓存需失效。 */
const COVERAGE_JAVA_92 = [
  {
    track:'java', group:'数据库', id:'mysql-json-not-document-db',
    title:'MySQL JSON 类型仍是关系行上的一列，不是文档库换皮',
    prompt:'为什么加了 JSON 列、会用 JSON_EXTRACT，还不能说“我们已经是 Mongo 那套文档库”？',
    promptAnswer:'JSON 列在关系行上存半结构化字段。事务、表结构、备份仍是 MySQL。',
    core:'MySQL 的 **`JSON` 类型**（及 `JSON_EXTRACT` / `->` / `JSON_TABLE` 等）让**关系表的一列**能存半结构化文档，并在 SQL 里取值、建生成列/二次索引。引擎、事务、备份、权限模型仍是 **InnoDB + SQL**，不是独立文档存储：多文档事务边界、灵活 schema 演进、按任意嵌套字段水平扩展，都不因“会 JSON 函数”自动对齐 MongoDB / 文档库。选型：偶发扩展属性、与强一致行同事务 → JSON 列合理；文档为主、频繁按深层路径查询与多文档聚合 → 认真评估文档库或拆表，而不是只加一列 JSON。邻接 `mysql-wide-column-split`、`nosql-label-not-consistency`。',
    why:'面试背“MySQL 支持 JSON=已上文档库”；或把整份业务对象塞进一列却指望任意路径都像集合查询一样快。',
    example:'`ALTER TABLE user ADD profile JSON;` 后 `profile->>\'$.city\'` 可过滤。用户行仍与订单表做 JOIN/事务。换成“每个用户一个文档集合、无固定表”是另一产品模型，不是同一列 JSON 的别名。',
    task:'划掉“有 JSON 列=文档数据库”。写出：JSON 列解决什么；仍由关系引擎保证什么。',
    answer:'JSON 列在关系行上存半结构化字段。事务、表结构、备份仍是 MySQL。文档库是另一套存储与查询模型，不是 JSON 函数的同义词。',
    keywords:'MySQL JSON JSON_EXTRACT 文档库 InnoDB',
    points:['JSON 是关系表上的列类型','JSON 函数≠文档数据库产品','事务与表模型仍是 SQL/InnoDB'],
    deep:[
      {title:'和生成列',body:'把高频路径抽成生成列再 B-Tree 索引，是关系侧常见做法；仍不是集合级灵活索引的全部能力。'},
      {title:'怎样自己验证',body:'建含 JSON 的表，同事务改 JSON 与另一表行并回滚，观察两者一起回退。对照：文档库多文档事务能力与 API 是否同一套。'}
    ],
    refs:[['MySQL：JSON 函数','https://dev.mysql.com/doc/refman/8.4/en/json-function-reference.html'],['MySQL：JSON 数据类型','https://dev.mysql.com/doc/refman/8.4/en/json.html'],['MySQL：JSON_TABLE','https://dev.mysql.com/doc/refman/8.4/en/json-table-functions.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-client-side-cache-invalidate',
    title:'客户端缓存省的是往返，失效路径不能省',
    prompt:'为什么进程内再囤一份 Redis 读结果之后，库已更新、页面却长时间仍是旧值？',
    promptAnswer:'本地是第二份副本。失效要覆盖：库→Redis→各实例本地（TTL/删除/tracking）。',
    core:'**客户端缓存**（进程内 Map、Caffeine，或 Redis 6+ **client-side caching / tracking**）把热点键留在应用侧，少打 Redis。收益是延迟；代价是**第二份副本**。服务端键被 SET/DEL/过期后，若客户端不知失效，会一直读旧值。自管本地缓存要有：**TTL、主动删、或订阅失效信号**。Redis tracking（常配合 RESP3）可在键变更时推送 invalidate，仍要处理连接断开、未订阅时段与本地容量。这与旁路缓存“写库后删 Redis 键”同构，见 `cache-aside-steps`：多一层就要多一条失效路径。不要把“开了本地缓存”当成强一致读。',
    why:'只加本地缓存降 QPS，改价后用户长时间看到旧价；或以为 Redis CSC 自动等于全网实时一致。',
    example:'详情先读本地，未命中再读 Redis。管理端改价：写库成功 → 删 Redis 键 → 广播/tracking 让各实例丢掉本地副本。只删 Redis、不通知本地，其它实例本地仍可能命中旧值直到 TTL。',
    task:'划掉“本地缓存只是更快的 Redis”。写出：多出哪一层副本；失效至少要覆盖哪几步。',
    answer:'本地是第二份副本。失效要覆盖：库→Redis→各实例本地（TTL/删除/tracking）。断线与未订阅窗口仍可能短暂旧读。',
    keywords:'Redis 客户端缓存 tracking RESP3 失效',
    points:['客户端缓存是多出来的副本','键变更必须有失效或短 TTL','tracking 仍要处理断线窗口'],
    deep:[
      {title:'和旁路缓存',body:'cache-aside 管应用↔Redis；客户端缓存再叠一层时，删 Redis 不够，还要打到本地。'},
      {title:'和 WAIT',body:'副本确认见 redis-wait-replicas-not-durability；与本地缓存失效是不同层。'},
      {title:'怎样自己验证',body:'两实例开本地缓存，一实例写后只删 Redis；观察另一实例在通知前是否仍吐旧值，再对比开启 invalidate 之后。'}
    ],
    refs:[['Redis：Client-side caching','https://redis.io/docs/latest/develop/reference/client-side-caching/'],['Redis：CLIENT TRACKING','https://redis.io/docs/latest/commands/client-tracking/'],['Redis：RESP3','https://redis.io/docs/latest/develop/reference/protocol-spec/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_92) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
