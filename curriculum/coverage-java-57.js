/* Java 57: W3CSchool 续扫 — MySQL 视图机制；Redis PSUBSCRIBE 边界。 */
const COVERAGE_JAVA_57 = [
  {
    track:'java', group:'数据库', id:'mysql-view-is-stored-query',
    title:'视图是存起来的查询，不是默认物化的第二份表',
    prompt:'为什么建了视图之后，基表一改，有人以为视图里还是旧快照？',
    core:'普通 **VIEW** 存的是**查询定义**。读视图时，优化器通常把视图展开成对基表（或其它视图）的查询再执行，所以基表提交后的新数据，下次读视图一般就能看见。它不是默认落盘的第二份数据副本。**物化**（把结果存成表或临时结果）是另一条能力，要单独建表、缓存层或特定引擎特性，不能从“建了 VIEW”自动推出。视图可简化权限与复杂连接的入口，但复杂视图、可更新视图有限制，写入往往仍应落基表。不要把视图当成自动刷新的报表库。',
    why:'把视图当快照表，基表更新后还去“刷新视图”，或以为删基表行视图里还在。',
    example:'`CREATE VIEW v_paid AS SELECT * FROM orders WHERE status=\'paid\'`。插入新的 paid 订单后 `SELECT * FROM v_paid` 能看到。没有单独的“刷新视图”步骤。若需要昨日冻结报表，应写入报表表或导出文件，而不是指望普通 VIEW。',
    task:'划掉“视图=自动存好的结果表”。写出：普通 VIEW 存的是什么；要冻结快照应怎么做。',
    answer:'普通 VIEW 存查询定义，读时对基表现算。冻结快照要物化表、导出或专用方案。不要默认当第二份表。',
    keywords:'MySQL VIEW 视图 物化 基表',
    points:['普通视图存的是查询定义','读视图通常展开到基表现算','快照要单独物化，不能从 CREATE VIEW 自动得到'],
    deep:[
      {title:'可更新视图',body:'简单视图有时可 INSERT/UPDATE，带聚合、DISTINCT、多表等常不可更新。以手册与 EXPLAIN 为准，写路径优先基表。'},
      {title:'怎样自己验证',body:'建视图后改基表一行，再查视图应见新值。SHOW CREATE VIEW 应看到 SELECT 文本而不是一份数据转储。'}
    ],
    refs:[['MySQL：视图','https://dev.mysql.com/doc/refman/8.4/en/views.html'],['MySQL：可更新视图','https://dev.mysql.com/doc/refman/8.4/en/view-updatability.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-pubsub-pattern-subscribe',
    title:'PSUBSCRIBE 是频道模式匹配，不是给历史消息做通配查询',
    prompt:'为什么用 PSUBSCRIBE order.* 仍然收不到消费者离线期间的下单？',
    core:'`SUBSCRIBE` / `PSUBSCRIBE` 仍然是 **Pub/Sub**：只把**此后**发布的消息推给**当时在线**的订阅者。`PSUBSCRIBE` 只是用 glob 模式匹配**频道名**，不改变“无持久、无积压、无确认”。离线补历史、至少处理一次，仍要 Stream 或外部消息系统，见 `redis-stream-vs-pubsub`。模式订阅会收到名字匹配的多个频道，流量可能比单频道更大，要按前缀设计频道名，避免误匹配。',
    why:'以为 PSUBSCRIBE 像 SQL 的 LIKE 能翻历史，重启消费者后补单失败。',
    example:'在线时 `PSUBSCRIBE order.*` 能收到 `PUBLISH order.created ...`。进程挂掉期间的发布，重启后的订阅者拿不到。改成 `XADD orders * ...` + 消费者组才能补。',
    task:'划掉“P* = 能查历史”。写出 PSUBSCRIBE 多出来的能力，以及和 Stream 在持久上的差别。',
    answer:'P* 只多了频道名模式匹配。仍不持久、不积压。要历史与确认用 Stream。',
    keywords:'Redis PSUBSCRIBE Pub/Sub Stream 模式',
    points:['PSUBSCRIBE 只匹配频道名模式','仍然无历史、无确认','业务补单用 Stream，不要用模式订阅冒充'],
    deep:[
      {title:'和键空间通知',body:'键事件通知也是 Pub/Sub 通道，同样不保证离线补发。过期监听不能当可靠工作队列。'},
      {title:'怎样自己验证',body:'PSUBSCRIBE 后 PUBLISH 应收到。停订阅再 PUBLISH，重启订阅后不应出现那条。对照 XADD 离线仍可 XREADGROUP。'}
    ],
    refs:[['Redis：Pub/Sub','https://redis.io/docs/latest/develop/pubsub/'],['Redis：PSUBSCRIBE','https://redis.io/docs/latest/commands/psubscribe/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_57) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
