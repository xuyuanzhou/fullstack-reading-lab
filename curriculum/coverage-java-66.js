/* 《分布式高并发》D8：必须 NOT NULL+默认值；禁止 TEXT 绝对化。 */
const COVERAGE_JAVA_66 = [
  {
    track:'java', group:'数据库', id:'mysql-not-null-default-not-absolute',
    title:'“一律 NOT NULL 再塞默认值”会伪造未知',
    prompt:'为什么规范写“必须把字段定义为 NOT NULL 并且提供默认值”，还列 NULL 难优化、占空间？',
    promptAnswer:'必填用不变量约束；可选允许 NULL，勿用空串/0 冒充未知。默认值只表示明确的业务默认，不是填洞。',
    core:'**有业务含义的必填**（订单金额、用户 id）应 NOT NULL，用约束挡住脏写，见 `table-constraint-holds-rule`。但“未知/未采集/可选”本身就是合法状态时，硬 NOT NULL 再塞 `\'\'`、`0`、`1970-01-01`，会把**未知伪装成已知**，报表与三值逻辑一起坏，见 `mysql-null-comparison`。资料把 NULL 的比较、统计复杂度说成必须消灭 NULL，夸张了：InnoDB 对可空列有开销，但用魔法默认值换来的语义错误通常更贵。正确做法：必填列 NOT NULL（默认值仅当“插入时省略=明确业务默认”才设）；可选列允许 NULL，查询用 `IS NULL`；不要为了规范把所有列填满假值。',
    why:'手机号未知被写成空串，统计“有手机号用户”把空串算进去；或用 0 当地址 id，外键/关联全乱。',
    example:'`middle_name` 允许 NULL 表示未填。规范强迫 `DEFAULT \'\'` 后，`WHERE middle_name IS NULL` 永远空，业务无法区分“没有中间名”和“没采集”。`amount` 则必须 NOT NULL，禁止用 NULL 表示未计价。',
    task:'划掉“所有列必须 NOT NULL+默认值”。给必填金额、可选中间名各写：是否允许 NULL，默认值代表什么。',
    answer:'划掉一律 NOT NULL。必填用不变量约束；可选允许 NULL，勿用空串/0 冒充未知。默认值只表示明确的业务默认，不是填洞。',
    keywords:'NOT NULL 默认值 NULL 三值逻辑 约束',
    origin:'《分布式高并发.pdf》约第 104 页：必须 NOT NULL 并且提供默认值',
    diagram:'diagrams/mysql-not-null-default-not-absolute.svg',
    points:['必填用 NOT NULL 挡脏写','可选未知应允许 NULL','魔法默认值会伪造已知'],
    deep:[
      {title:'和性能口诀',body:'NULL 比较要用 IS NULL，索引与统计确实要多考虑。这是写对 SQL 的理由，不是把所有列改成假值的理由。'},
      {title:'怎样自己验证',body:'建可选列可空与强制 DEFAULT \'\' 两表，插入“未采集”行后用 IS NULL 统计。假默认值表应统计失败。'}
    ],
    refs:[['MySQL：NULL','https://dev.mysql.com/doc/refman/8.4/en/problems-with-null.html'],['MySQL：CREATE TABLE','https://dev.mysql.com/doc/refman/8.4/en/create-table.html'],['MySQL：数据默认值','https://dev.mysql.com/doc/refman/8.4/en/data-type-defaults.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-text-ban-not-absolute',
    title:'“禁止 TEXT/BLOB”禁的是乱查大列，不是禁类型',
    prompt:'为什么规范写死“禁止使用 TEXT、BLOB”，理由是浪费空间、淘汰热数据？',
    promptAnswer:'长正文用 TEXT（或等价）合理。禁止的是热点路径投影大列、无必要的大字段进缓冲。',
    core:'TEXT/BLOB 适合存**真正的长内容**（文章正文、二进制附件元数据旁的大对象策略另说）。绝对禁止会逼人把长文塞进过短的 VARCHAR，或拆到对象存储却无主键关联。资料担心的点对的是：**列表/热点路径 `SELECT *` 把大列读进缓冲池**，挤掉热行，见 `mysql-select-star`、`mysql-wide-column-split`。InnoDB 常把长大字段放溢出页，列表不选中该列时未必读全；该拆表、该 OSS、该禁止的是无过滤的大列扫描，不是类型名。规范应写成：热点查询不要投影 TEXT/BLOB；正文与列表字段分离；需要时用前缀索引而不是幻想整列普通索引，见前缀索引课。',
    why:'规范背成“表里不能有 TEXT”，CMS 正文改成 VARCHAR(500) 被截断；或全文搜索另上引擎只因为不敢建 TEXT。',
    example:'`posts` 有 `title VARCHAR`、`body TEXT`。列表 `SELECT id,title` 不碰 body。详情再查 body。禁止的是列表 `SELECT *` 把 body 打进结果集，不是禁止 body 列存在。',
    task:'划掉“禁止 TEXT 类型”。写出：类型何时合理；查询上要禁止哪一类用法。',
    answer:'划掉禁止类型。长正文用 TEXT（或等价）合理。禁止的是热点路径投影大列、无必要的大字段进缓冲。列表与正文分离，用 EXPLAIN/列清单证明。',
    keywords:'TEXT BLOB SELECT 缓冲池 规范',
    origin:'《分布式高并发.pdf》约第 104 页：禁止使用 TEXT、BLOB',
    diagram:'diagrams/mysql-text-ban-not-absolute.svg',
    points:['TEXT 适合真正的长内容','危险是热点查询拖出大列','拆列表字段，不要禁用类型名'],
    deep:[
      {title:'和 ENUM 禁令',body:'同页禁 ENUM 改 TINYINT：DDL 增枚举值痛苦是真问题，但 TINYINT 无含义时要靠字典表。同样是启发式，不是语法禁令。'},
      {title:'怎样自己验证',body:'同表列表选/不选 TEXT 列，对比 handler read 与耗时。确认列表不投影大列后缓冲压力下降。'}
    ],
    refs:[['MySQL：BLOB 与 TEXT','https://dev.mysql.com/doc/refman/8.4/en/blob.html'],['MySQL：InnoDB 行格式','https://dev.mysql.com/doc/refman/8.4/en/innodb-row-format.html'],['MySQL：SELECT','https://dev.mysql.com/doc/refman/8.4/en/select.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_66) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
