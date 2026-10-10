/* Java 111: W3CSchool 续扫 — 多值索引；COMMAND GETKEYS。 */
const COVERAGE_JAVA_111 = [
  {
    track:'java', group:'数据库', id:'mysql-multi-valued-index-not-json-db',
    title:'多值索引给 JSON 数组做倒排入口，不是把 MySQL 变成文档库',
    prompt:'为什么建了多值索引能按 JSON 数组元素查，有人就说“我们已经是 Elasticsearch/Mongo 了”？',
    promptAnswer:'多值索引加速数组元素类查找。事务与表仍是 MySQL。',
    core:'MySQL 8 的 **multi-valued index** 可对 JSON 数组一类多值表达式建索引，加速“数组包含某元素”等谓词。它仍是 **InnoDB 表上的二级索引**，事务、备份与表模型不变，见 `mysql-json-not-document-db`。它不提供完整文档检索、分析器或任意嵌套聚合；复杂检索仍可能要生成列、拆表或专用搜索引擎。不要把“会 CAST(... AS UNSIGNED ARRAY)”写成文档库迁移完成。',
    why:'整份业务文档塞进 JSON+多值索引，却指望全文相关性与任意路径查询；或忽视写入时数组维护成本。',
    example:'`CAST(tags AS CHAR(32) ARRAY)` 上建多值索引后，`WHERE tags MEMBER OF(...)` 类查询可走索引。用户行与订单事务仍是关系模型；全文商品搜索另看 ES。',
    task:'划掉“多值索引=文档库”。写出：它加速什么；仍缺文档引擎的哪类能力。',
    answer:'多值索引加速数组元素类查找。事务与表仍是 MySQL。全文分析、灵活文档查询不是它自动附赠。',
    keywords:'MySQL multi-valued index JSON 数组',
    points:['多值索引服务数组元素查找','仍是 InnoDB 二级索引','不是文档库换皮'],
    deep:[
      {title:'和生成列',body:'稳定标量路径可抽生成列再普通索引；数组包含场景才看多值索引。'},
      {title:'怎样自己验证',body:'有/无多值索引对比 MEMBER OF 查询的 EXPLAIN key。'}
    ],
    refs:[['MySQL：Multi-Valued Indexes','https://dev.mysql.com/doc/refman/8.4/en/create-index.html#create-index-multi-valued'],['MySQL：JSON','https://dev.mysql.com/doc/refman/8.4/en/json.html'],['MySQL：MEMBER OF','https://dev.mysql.com/doc/refman/8.4/en/json-search-functions.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-command-getkeys-not-acl',
    title:'COMMAND GETKEYS 解析的是命令里的键，不是 ACL 授权结论',
    prompt:'为什么有人用 COMMAND GETKEYS 看出键名，就以为“已经按键做了权限控制”？',
    promptAnswer:'GETKEYS 解析命令涉及的键。权限由 ACL 与连接用户决定。',
    core:'**`COMMAND GETKEYS`**（及相关 GETKEYS AND FLAGS）根据命令参数**解析出涉及哪些 key**，供集群重定向、代理路由、只读分析等使用。它回答「这条命令动哪些键」，**不**回答「当前用户是否被允许」。授权是 **ACL** 的规则与连接用户，见 `redis-acl-not-just-requirepass`、`redis-acl-dryrun-not-enforce`。代理若只做 GETKEYS 分片而不做 ACL，权限仍可能过大。',
    why:'网关日志打了 GETKEYS 就当安全审计完成；或自定义命令未登记 key 规格导致解析错误。',
    example:'`COMMAND GETKEYS EVAL ...` 可列出脚本触及的键（取决于声明）。是否允许 `DEL` 仍看 `ACL DRYRUN user DEL key`。',
    task:'划掉“GETKEYS=已授权”。写出：GETKEYS 解决什么；权限还看什么。',
    answer:'GETKEYS 解析命令涉及的键。权限由 ACL 与连接用户决定。解析键 ≠ 放行或拒绝。',
    keywords:'Redis COMMAND GETKEYS ACL 路由',
    points:['GETKEYS 解析键位置','服务路由与分析','授权看 ACL 不是 GETKEYS'],
    deep:[
      {title:'和 Cluster',body:'MOVED/ASK 依赖键槽；GETKEYS 帮中间层找键，仍要配合正确用户。'},
      {title:'怎样自己验证',body:'同一条 DEL：GETKEYS 有键名；换无权限用户应仍被 ACL 拒绝。'}
    ],
    refs:[['Redis：COMMAND GETKEYS','https://redis.io/docs/latest/commands/command-getkeys/'],['Redis：COMMAND','https://redis.io/docs/latest/commands/command/'],['Redis：ACL','https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_111) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
