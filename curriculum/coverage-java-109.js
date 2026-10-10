/* Java 109: W3CSchool 续扫 — 降序索引；Redis ACL DRYRUN。 */
const COVERAGE_JAVA_109 = [
  {
    track:'java', group:'数据库', id:'mysql-descending-index-not-sort-law',
    title:'降序索引是索引键方向选项，不是 “ORDER BY 随便写都免排序”',
    prompt:'为什么资料写 MySQL 8 支持降序索引后，有人就认为所有 ORDER BY col DESC 都不再 filesort？',
    promptAnswer:'降序索引让索引顺序与某些 ORDER BY 对齐。是否免排序仍看计划与前缀匹配，要用 EXPLAIN 核对。',
    core:'MySQL 8.0 起二级索引可声明 **DESC/ASC 混合方向**（降序索引），让某些 **ORDER BY** 与索引顺序一致时避免额外排序。它不是定律：是否走索引、是否还能 filesort，仍看最左前缀、过滤选择性、回表与优化器代价，见 `mysql-explain-analyze`、`mysql-composite-selectivity-order-heuristic`。旧版把 DESC 当语法糖、实际仍按 ASC 存的说法不能套在现行 8.x 上；反过来以为“有降序索引=一切降序查询免费”也会翻车。',
    why:'给所有排序列建 DESC 索引却从不看 EXPLAIN；或升到 8.0 后仍背“DESC 无效”。',
    example:'`INDEX (created_at DESC)` 支撑 `ORDER BY created_at DESC LIMIT 20` 时常更贴。若 `WHERE` 无法用上最左前缀，仍可能排序或扫更多行——用 EXPLAIN 证明。',
    task:'划掉“有降序索引=ORDER BY DESC 永免排序”。写出：它解决什么匹配；还要核对什么。',
    answer:'降序索引让索引顺序与某些 ORDER BY 对齐。是否免排序仍看计划与前缀匹配，要用 EXPLAIN 核对。',
    keywords:'MySQL descending index ORDER BY',
    points:['DESC 索引是键方向选项','服务匹配的 ORDER BY','不保证一切降序查询免排序'],
    deep:[
      {title:'和覆盖索引',body:'即便顺序匹配，回表成本仍可能让优化器另选计划。'},
      {title:'怎样自己验证',body:'同查询在有/无 DESC 索引下对比 EXPLAIN Extra 是否 Using filesort。'}
    ],
    refs:[['MySQL：Descending Indexes','https://dev.mysql.com/doc/refman/8.4/en/descending-indexes.html'],['MySQL：ORDER BY 优化','https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html'],['MySQL：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-acl-dryrun-not-enforce',
    title:'ACL DRYRUN 是演练命令是否被允许，不是已经生效的授权',
    prompt:'为什么安全同学跑了 ACL DRYRUN 显示允许，就以为生产连接已经按该规则收紧？',
    promptAnswer:'DRYRUN 模拟某用户是否被允许某命令。落地要让应用真用该用户连接，并实测危险命令被拒。',
    core:'**`ACL DRYRUN`** 对指定用户模拟执行某命令，返回是否会被 ACL 拒绝——用于**验证规则**，不改变连接身份，也不代替把应用连到正确用户。真正生效的是连接时认证的用户及其规则，见 `redis-acl-not-just-requirepass`。DRYRUN 通过但应用仍用 `default` 超管，线上权限依旧过大。不要把「演练通过」写成「已强制执行」。',
    why:'只在运维机 DRYRUN 一遍就关工单；或 DRYRUN 用错用户名与应用不一致。',
    example:'`ACL DRYRUN order GET order:1` 返回 OK，只说明用户 `order` 的规则允许该命令。应用数据源必须 `AUTH order ***`（或 ACL 文件用户），并再实测 `FLUSHALL` 应失败。',
    task:'划掉“DRYRUN 通过=已授权落地”。写出：DRYRUN 测什么；落地还要改什么。',
    answer:'DRYRUN 模拟某用户是否被允许某命令。落地要让应用真用该用户连接，并实测危险命令被拒。',
    keywords:'Redis ACL DRYRUN 最小权限',
    points:['DRYRUN 是规则演练','不切换连接身份','应用必须落到对应用户'],
    deep:[
      {title:'和 ACL SETUSER',body:'改规则后应用 DRYRUN 回归；发布配置与客户端用户要同一变更单。'},
      {title:'怎样自己验证',body:'DRYRUN 允许后，用错误用户连接应仍能越权；换对用户后危险命令失败。'}
    ],
    refs:[['Redis：ACL DRYRUN','https://redis.io/docs/latest/commands/acl-dryrun/'],['Redis：ACL','https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/'],['Redis：ACL SETUSER','https://redis.io/docs/latest/commands/acl-setuser/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_109) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
