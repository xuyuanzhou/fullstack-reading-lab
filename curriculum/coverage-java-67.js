/* Java 67: W3CSchool 续扫 — CTE 机制；Stream XTRIM 边界。 */
const COVERAGE_JAVA_67 = [
  {
    track:'java', group:'数据库', id:'mysql-cte-named-subquery',
    title:'WITH（CTE）是可复用的命名结果，不是自动物化加速器',
    prompt:'为什么把子查询改成 WITH 之后，有人以为一定更快，EXPLAIN 却差不多？',
    promptAnswer:'CTE 主要命名与复用查询步骤，可读性优先。不一定更快。',
    core:'**公用表表达式（CTE）**用 `WITH name AS (…)` 给一段查询起名，供后续主查询（或其它 CTE）引用，读起来像分步。它首先是**语法与可读性**工具，不保证引擎一定物化成临时表，也不保证比等价子查询更快——优化器可能内联。**递归 CTE**（`WITH RECURSIVE`）用于树/图有界展开，要有终止条件，防止炸行。CTE 不是事务、不是视图持久化，见 `mysql-view-is-stored-query`。复杂报表可拆 CTE 提高可维护性；性能以 `EXPLAIN` 为准，不要神话 WITH。',
    why:'重构时凡子查询都改 WITH，期待自动变快；或递归 CTE 无终止条件拖垮实例。',
    example:'`WITH paid AS (SELECT * FROM orders WHERE status=\'paid\') SELECT … FROM paid JOIN …`。与直接子查询语义相近。组织树用 `WITH RECURSIVE` 逐层展开，必须限制深度或边条件。',
    task:'划掉“WITH=一定物化加速”。写出 CTE 主要解决什么；递归还要防什么。',
    answer:'CTE 主要命名与复用查询步骤，可读性优先。不一定更快。递归要终止条件，防止无限展开。',
    keywords:'MySQL CTE WITH RECURSIVE 子查询',
    points:['CTE 是命名查询步骤，便于复用','不保证物化或更快','递归 CTE 必须可终止'],
    deep:[
      {title:'和视图',body:'VIEW 持久存在数据字典；CTE 只在本条语句内有效。'},
      {title:'和临时表',body:'要跨语句复用中间结果用 TEMPORARY TABLE，见 mysql-temp-table-vs-cte。'},
      {title:'怎样自己验证',body:'同一逻辑分别写 CTE 与子查询，对比 EXPLAIN。递归故意去掉终止条件应被会话限制打断或超时。'}
    ],
    refs:[['MySQL：WITH（CTE）','https://dev.mysql.com/doc/refman/8.4/en/with.html'],['MySQL：递归 CTE','https://dev.mysql.com/doc/refman/8.4/en/with.html#common-table-expressions-recursive']]
  },
  {
    track:'java', group:'缓存', id:'redis-stream-xtrim-bound',
    title:'Stream 要 XTRIM / MAXLEN，否则积压会把内存吃光',
    prompt:'为什么上了 Stream 做下单事件，几个月后 Redis 内存涨到报警，消息却还在？',
    promptAnswer:'XADD 带 MAXLEN，或事后 XTRIM。近似修剪更省，但可能略超上限。',
    core:'Stream 条目会一直留着，直到你 **`XTRIM`** 或在 **`XADD … MAXLEN`** 时限制长度。`MAXLEN ~`（近似修剪）更高效，但条数可能略多于上限。修剪掉的 ID 再也读不回；消费者若还没 `XACK`，要先想好积压与待处理列表（PEL）策略，见 `redis-stream-vs-pubsub`。Stream 不是无限廉价日志；没有保留策略就等于默认可增长到内存上限。按时间保留可用 `MINID` 等修剪形式（版本以手册为准）。',
    why:'只讲了 XADD/XREADGROUP，忘了修剪，磁盘/内存被历史事件撑满；或猛 trim 导致未消费条目消失却当“丢消息怪 Pub/Sub”。',
    example:'`XADD orders MAXLEN ~ 10000 * user 1`。运维定时 `XTRIM orders MAXLEN ~ 10000`。容量规划按峰值写入速率 × 保留窗口估条数。',
    task:'划掉“Stream 会自己淘汰”。写出限制长度的两种常见做法；近似 MAXLEN 的代价。',
    answer:'XADD 带 MAXLEN，或事后 XTRIM。近似修剪更省，但可能略超上限。不修剪就会一直占内存。',
    keywords:'Redis Stream XTRIM MAXLEN 积压',
    points:['Stream 默认不自动删旧条目','用 MAXLEN/XTRIM 限制长度','近似修剪省开销，条数可能略超'],
    deep:[
      {title:'和消费者组',body:'先确认积压可丢的业务语义再 trim。未 ACK 的消息另有 PEL，修剪与认领策略要一起设计。'},
      {title:'怎样自己验证',body:'连续 XADD 超上限但不 trim，XLEN 应持续涨。加 MAXLEN ~ 后再 XADD，长度应在上限附近波动。'}
    ],
    refs:[['Redis：XTRIM','https://redis.io/docs/latest/commands/xtrim/'],['Redis：XADD','https://redis.io/docs/latest/commands/xadd/'],['Redis：Streams','https://redis.io/docs/latest/develop/data-types/streams/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_67) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
