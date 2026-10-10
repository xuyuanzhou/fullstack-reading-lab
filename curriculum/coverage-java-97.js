/* Java 97: W3CSchool 续扫 — CHECK 约束边界；Redis WAIT≠持久化。 */
const COVERAGE_JAVA_97 = [
  {
    track:'java', group:'数据库', id:'mysql-check-enforced-not-parsed-only',
    title:'CHECK 约束在现行 MySQL 会强制，不是“写了等于没写”',
    prompt:'为什么老资料说 MySQL 的 CHECK 只解析不执行，新人却在 8.0 上撞上约束失败？',
    promptAnswer:'8.0.16+ 起 InnoDB 强制 CHECK。它挡非法写入，不代替索引与查询优化。',
    core:'历史上不少资料写：**CHECK 语法接受但不强制**。从 **MySQL 8.0.16** 起，InnoDB 对 **CHECK 约束会真正强制**（违反则语句失败）。把“MySQL 没有 CHECK”背成定律会在现行版本翻车；反过来以为任意表达式都能当高性能过滤也不对——CHECK 是写路径校验，不是替代索引与 WHERE 计划。迁移时要核对版本：旧库“能写入的脏行”在升级后可能插不进去。邻接 `mysql-not-null-default-not-absolute`、`table-constraint-holds-rule`。',
    why:'按老博客关掉应用侧校验，靠“数据库反正不管 CHECK”；或升级到 8.0.16+ 后批量导入突然全失败。',
    example:'`ALTER TABLE t ADD CONSTRAINT chk_qty CHECK (qty >= 0);` 在 8.0.16+ 插入 qty=-1 应失败。在更早版本同一 DDL 可能“成功”却仍写入 -1——不要用旧行为当现行手册。',
    task:'划掉“MySQL CHECK 永不生效”。写出：从哪代起强制；它解决什么、不解决什么。',
    answer:'8.0.16+ 起 InnoDB 强制 CHECK。它挡非法写入，不代替索引与查询优化。版本与脏数据迁移要单独核对。',
    keywords:'MySQL CHECK 约束 8.0.16',
    points:['旧“只解析”说法已过时','8.0.16+ 会强制 CHECK','校验≠查询加速'],
    deep:[
      {title:'和触发器',body:'复杂跨表规则仍常放应用或触发器；CHECK 适合单行可表达的不变量。'},
      {title:'怎样自己验证',body:'在 ≥8.0.16 实例建 CHECK，插入违规值应报错；对照发行说明中的 enforce 起点。'}
    ],
    refs:[['MySQL：CHECK','https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html'],['MySQL 8.0.16：CHECK 强制','https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-16.html'],['MySQL：约束','https://dev.mysql.com/doc/refman/8.4/en/constraints.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-wait-replicas-not-durability',
    title:'WAIT 等的是副本确认，不是把 AOF/RDB 耐久承诺一次性买齐',
    prompt:'为什么写完关键命令后调用 WAIT 1，磁盘挂了或主库掉电，面试还说“已经 WAIT 了应该不丢”？',
    promptAnswer:'WAIT 等到副本复制确认。落盘看 AOF/RDB 与 fsync 策略。',
    core:'**`WAIT numreplicas timeout`** 阻塞到至少 N 个副本**确认复制了此前写**（或超时）。它提高的是**复制可见/冗余副本数**，降低主挂后未复制写入丢失的窗口，见复制语义。它**不是**：等 AOF fsync 完成、不是跨机房强同步提交的全部定义、也不是业务“已持久化到磁盘”的同义词。耐久要看 **appendfsync / RDB 策略**与部署拓扑；副本确认与落盘是两层。客户端缓存失效见 `redis-client-side-cache-invalidate`。不要把 WAIT 背成“Redis 事务已提交到磁盘”。',
    why:'金融流水只 WAIT 1 就回成功，主从都在同盘柜掉电仍丢；或超时当成功。',
    example:'`INCR order:seq` 后 `WAIT 1 1000`：至少一副本确认复制或 1s 超时。持久化仍取决于 AOF/RDB。要更强耐久需同步复制产品语义或外部共识，而不是单靠 WAIT。',
    task:'划掉“WAIT=已落盘”。写出：WAIT 等到什么；落盘还看什么。',
    answer:'WAIT 等到副本复制确认。落盘看 AOF/RDB 与 fsync 策略。复制冗余≠磁盘耐久。',
    keywords:'Redis WAIT 复制 持久化 AOF',
    points:['WAIT 等副本复制确认','不代替 AOF/RDB 落盘','超时与成功要分开处理'],
    deep:[
      {title:'和 MULTI/EXEC',body:'事务排队与 WAIT 复制是不同阶段；WAIT 通常放在写之后。'},
      {title:'怎样自己验证',body:'写后 WAIT，在副本上 GET 应可见；对照只 WAIT、关掉持久化时主クラッシュ的数据后果（实验环境）。'}
    ],
    refs:[['Redis：WAIT','https://redis.io/docs/latest/commands/wait/'],['Redis：持久化','https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/'],['Redis：复制','https://redis.io/docs/latest/operate/oss_and_stack/management/replication/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_97) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
