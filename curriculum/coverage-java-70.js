/* Java 70: W3CSchool 续扫 — 临时表 vs CTE；Keyspace 通知≠队列。 */
const COVERAGE_JAVA_70 = [
  {
    track:'java', group:'数据库', id:'mysql-temp-table-vs-cte',
    title:'TEMPORARY TABLE 能跨语句复用，CTE 只活在这一条语句里',
    prompt:'为什么有人把 WITH 结果当成会话级临时表，下一条 SELECT 却找不到？',
    core:'**`CREATE TEMPORARY TABLE`** 在**当前会话**内创建表，可被后续多条语句读写，会话结束（或显式 DROP）才消失；可建索引、可 INSERT 多轮。**CTE（`WITH`）**只在**定义它的那一条语句**内可见，供同句引用，见 `mysql-cte-named-subquery`。优化器内部也可能为排序/去重建**内部临时表**，那是实现细节，既不是 `TEMPORARY TABLE`，也不是 CTE。选型：同会话多步加工、要索引中间结果 → 临时表；单句内分步可读 → CTE。不要混成同一种“临时”。',
    why:'在 WITH 之后另开查询取同名结果失败；或以为 CTE 一定落盘成可复用表。',
    example:'`CREATE TEMPORARY TABLE t AS SELECT …; SELECT * FROM t;` 第二条仍可见。`WITH t AS (…) SELECT …;` 结束后 `SELECT * FROM t` 报不存在（除非另有基表 t）。',
    task:'划掉“临时表=CTE”。写出：跨语句复用、单句分步，各用哪一种。',
    answer:'跨语句复用用 TEMPORARY TABLE。单句内命名步骤用 CTE。内部临时表是优化器细节，不要当业务表。',
    keywords:'MySQL TEMPORARY TABLE CTE WITH 会话',
    points:['TEMPORARY TABLE 会话内跨语句可见','CTE 只在本条语句内有效','内部临时表≠显式临时表≠CTE'],
    deep:[
      {title:'和视图',body:'VIEW 在字典中持久；临时表与 CTE 都不是长期共享给其它会话的结构。'},
      {title:'怎样自己验证',body:'同连接建临时表后第二条查询应命中。同连接跑完 WITH 后再查同名应失败。'}
    ],
    refs:[['MySQL：CREATE TEMPORARY TABLE','https://dev.mysql.com/doc/refman/8.4/en/create-temporary-table.html'],['MySQL：WITH（CTE）','https://dev.mysql.com/doc/refman/8.4/en/with.html'],['MySQL：内部临时表','https://dev.mysql.com/doc/refman/8.4/en/internal-temporary-tables.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-keyspace-notify-not-queue',
    title:'键空间通知是 Pub/Sub 信号，不是可靠工作队列',
    prompt:'为什么用过期键通知做“订单超时关单”，消费者一重启就漏关？',
    core:'**键空间通知**（`notify-keyspace-events`）在键被删、过期等时，往 Pub/Sub 频道发事件。订阅者仍遵循 Pub/Sub：**当时在线才收得到**，无持久、无积压、无确认，见 `redis-stream-vs-pubsub`、`redis-pubsub-pattern-subscribe`。过期通知还有时机与懒删除/定时删除的细节，不能当成精确闹钟。业务“至少处理一次”的超时关单，应用 **Stream / 延时队列 / 数据库扫描** 等可补历史方案，不要只靠键空间通知。',
    why:'文档里看到 expired 事件就当工作流引擎；进程重启或订阅断线后，过期单永远关不上。',
    example:'订单键设 TTL，订阅 `__keyevent@0__:expired`。消费者宕机期间过期的键不会补发。改成到期时间写入 ZSet/Stream，由消费者组领取并 XACK。',
    task:'划掉“过期通知=可靠延时任务”。写出它和 Stream 在持久/确认上的差别。',
    answer:'键空间通知走 Pub/Sub，无历史无确认。要可靠处理用 Stream 或可扫描的到期结构。',
    keywords:'Redis 键空间通知 Pub/Sub 过期 队列',
    points:['键空间通知基于 Pub/Sub','离线期间事件不补发','超时关单不要只靠过期通知'],
    deep:[
      {title:'和 PSUBSCRIBE',body:'可用模式订阅一批事件频道，仍无持久，见 redis-pubsub-pattern-subscribe。'},
      {title:'怎样自己验证',body:'订阅后 EXPIRE 短键应收到。停订阅再过期一批，重启订阅后不应出现那些事件。'}
    ],
    refs:[['Redis：Keyspace notifications','https://redis.io/docs/latest/manual/keyspace-notifications/'],['Redis：Pub/Sub','https://redis.io/docs/latest/develop/pubsub/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_70) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
