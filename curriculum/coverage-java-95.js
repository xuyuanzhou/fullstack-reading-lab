/* Java 95: W3CSchool 续扫 — 生成列/函数索引；Redis ACL≠只 requirepass。 */
const COVERAGE_JAVA_95 = [
  {
    track:'java', group:'数据库', id:'mysql-generated-column-not-where-wrap',
    title:'生成列 / 函数索引是显式建模，不是 WHERE 里乱包函数的许可证',
    prompt:'为什么规范禁止 WHERE 对索引列套函数，有人却说“MySQL 8 有函数索引，所以 DATE(created_at) 随便写”？',
    promptAnswer:'生成列/函数索引是结构上为表达式建好的访问路径。WHERE 临时包列上函数不会自动获得它们。',
    core:'对索引列写 `DATE(created_at)` 仍常让优化器难以走普通 B-tree，见 `mysql-where-func-blocks-index`。**生成列**（`GENERATED … AS …`，VIRTUAL/STORED）和 **函数索引（functional key parts）**是把表达式**建进表结构/索引定义**的显式建模：你声明“我要按这个表达式查”，并付出存储或维护成本。它们**不**等于“WHERE 里临时包一层函数就自动有索引”。没有对应生成列/函数索引时，列上函数照样可能扫表。选型：高频、稳定的表达式 → 生成列或函数索引 + EXPLAIN；偶发查询 → 把计算挪到常量侧。邻接 `mysql-json-not-document-db`（JSON 路径也可用生成列落地）。',
    why:'听说有函数索引就继续 DATE(col)，计划依旧差；或到处建生成列却从不核对是否被用到。',
    example:'坏：无额外索引时 `WHERE DATE(created_at)=\'2026-10-09\'`。好：`WHERE created_at >= \'2026-10-09\' AND created_at < \'2026-10-10\'`；或 `created_day DATE AS (DATE(created_at)) STORED` 再 `INDEX(created_day)`，查询打生成列。',
    task:'划掉“有函数索引=WHERE 可乱包函数”。写出：生成列/函数索引解决什么；和临时包函数差在哪。',
    answer:'生成列/函数索引是结构上为表达式建好的访问路径。WHERE 临时包列上函数不会自动获得它们。要用就显式建，并用 EXPLAIN 证明。',
    keywords:'MySQL 生成列 函数索引 sargable',
    points:['生成列/函数索引是显式建模','不自动拯救 WHERE 列上函数','高频表达式才值得建并核对计划'],
    deep:[
      {title:'和隐式转换',body:'类型不对齐也会挡索引，见 mysql-implicit-convert-breaks-index。生成列同样要对齐类型与校对规则。'},
      {title:'怎样自己验证',body:'对比：列上 DATE()、常量侧范围、生成列三种写法的 EXPLAIN key/rows。未建生成列时前一种应明显更差。'}
    ],
    refs:[['MySQL：生成列','https://dev.mysql.com/doc/refman/8.4/en/create-table-generated-columns.html'],['MySQL：函数索引','https://dev.mysql.com/doc/refman/8.4/en/create-index.html#create-index-functional-key-parts'],['MySQL：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-acl-not-just-requirepass',
    title:'Redis ACL 按用户裁命令与键，不是只设一个 requirepass',
    prompt:'为什么只配了 requirepass，应用账号仍能 FLUSHALL、也能读到别的业务前缀？',
    promptAnswer:'ACL 可按用户限制命令集与键/频道模式。单 requirepass 通常进门后权限过大。',
    core:'旧式 **`requirepass` / `AUTH` 密码**大致是“知道口令就进门”，进门后能力接近管理员。**Redis 6+ ACL** 用**多个用户**分别授予命令类别、键模式、发布频道等（`ACL SETUSER`），可让业务账号只能 `+@read +@write ~app:order:*`，禁止 `@dangerous` 与无关前缀。它补的是**最小权限**，不是替换网络隔离、TLS 与密钥轮换。Lua/Functions 仍在服务端执行，授权模型要覆盖脚本相关命令，见 `redis-lua-atomic`、`redis-functions-not-just-eval`。不要把“设了密码”写成“已做 ACL”。',
    why:'生产共用一个强密码，任意微服务都能 KEYS * / FLUSHALL；或 ACL 写了用户却仍用 default 超管连接。',
    example:'`ACL SETUSER order on >*** ~order:* +@read +@write -@dangerous`。订单服务用该用户；运维另用管理用户。`requirepass`  alone 时，同一密码连上即可 FLUSHALL。',
    task:'划掉“有密码=已授权”。写出 ACL 比单口令多裁了哪两类能力。',
    answer:'ACL 可按用户限制命令集与键/频道模式。单 requirepass 通常进门后权限过大。业务连接应落在最小权限用户，而不是 default 超管。',
    keywords:'Redis ACL requirepass 最小权限',
    points:['requirepass 多是整库大门','ACL 按用户裁命令与键模式','业务账号应避开危险命令与无关键'],
    deep:[
      {title:'和网络安全',body:'ACL 不代替私网、安全组与 TLS。口令泄露仍危险，要轮换与分环境用户。'},
      {title:'和 DRYRUN',body:'改规则后可用 ACL DRYRUN 预演某命令是否放行，并不执行，见 redis-acl-dryrun-not-enforce。'},
      {title:'怎样自己验证',body:'建只读用户后尝试 SET/FLUSHALL 应失败；用管理用户应成功。对比仅 requirepass 时同一密码的能力。'}
    ],
    refs:[['Redis：ACL','https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/'],['Redis：ACL SETUSER','https://redis.io/docs/latest/commands/acl-setuser/'],['Redis：AUTH','https://redis.io/docs/latest/commands/auth/']]
  }
];


for (const {points, refs, ...lesson} of COVERAGE_JAVA_95) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
