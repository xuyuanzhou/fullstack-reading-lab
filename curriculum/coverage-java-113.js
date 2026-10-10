/* Java 113: W3CSchool 续扫 — SKIP LOCKED；CLIENT NO-TOUCH。 */
const COVERAGE_JAVA_113 = [
  {
    track:'java', group:'数据库', id:'mysql-skip-locked-not-queue',
    title:'SKIP LOCKED 是跳过已锁行，不是开箱即用的任务队列',
    prompt:'用 SELECT … FOR UPDATE SKIP LOCKED 抢任务行之后，为什么还不能说“我们已经有 MQ 了”？',
    promptAnswer:'SKIP LOCKED 只是锁定读跳过已锁行。状态机、超时与幂等要自建，不是开箱 MQ。',
    core:'**`FOR UPDATE SKIP LOCKED`**（MySQL 8+）在锁定读时**跳过已被别的事务锁住的行**，让多个工人互不阻塞地领取不同行，适合简易「库表任务」抢占。它提供的是**行锁语义下的并发领取**，不是带 ACK、重试退避、死信、跨语言消费组的消息队列。崩溃、长事务、未正确更新状态都会造成重复处理或任务卡死，要自己设计状态机与可见超时。可靠异步仍常看 MQ/Outbox，见 `distributed-outbox`、`mq-dlq-backlog`。不要把 SKIP LOCKED 背成 Kafka。',
    why:'任务行只改 status=running 无超时回收；或当 MQ 用却无幂等，重放双扣库存。',
    example:'`SELECT id FROM jobs WHERE status=\'ready\' ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED` 后更新为 running。工人崩溃要用 lease/超时把 running 抢回。订单领域事件仍走 Outbox+MQ。',
    task:'划掉“SKIP LOCKED=消息队列”。写出：它解决什么并发；队列还要自建哪两样。',
    answer:'它让锁定读跳过已锁行以便并发领取。状态机、超时回收与幂等要自建；不是完整 MQ。',
    keywords:'MySQL SKIP LOCKED FOR UPDATE 任务表',
    points:['SKIP LOCKED 跳过已锁行','适合简易抢占不是 MQ','要状态机与超时/幂等'],
    deep:[
      {title:'和 NOWAIT',body:'NOWAIT 遇锁即报错；SKIP LOCKED 跳过继续看下一行。选型看要失败还是领别的任务。'},
      {title:'怎样自己验证',body:'两会话同时 SKIP LOCKED 应领到不同行；对照无 SKIP 时第二会话阻塞。'}
    ],
    refs:[['MySQL：锁定读','https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html'],['MySQL：SELECT … FOR UPDATE','https://dev.mysql.com/doc/refman/8.4/en/select.html'],['MySQL 8.0：SKIP LOCKED','https://dev.mysql.com/doc/refman/8.0/en/innodb-locking-reads.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-client-no-touch-not-expire-off',
    title:'CLIENT NO-TOUCH 是别碰键的空闲时间，不是关掉过期',
    prompt:'开了 CLIENT NO-TOUCH 做只读扫描。为什么有人以为键就再也不会过期了？',
    promptAnswer:'NO-TOUCH 避免访问刷新热度/空闲。过期仍由 TTL 与淘汰策略决定。',
    core:'**`CLIENT NO-TOUCH`**（及命令修饰）让此后访问**不刷新键的 LRU/LFU/空闲时间**，避免只读扫描把热度/空闲统计打歪，影响淘汰。它**不**取消 `EXPIRE`/`TTL`，也不等于 `PERSIST`。键到点仍过期；要永不过期需显式改过期策略。邻接 `redis-expire`、`redis-eviction-policy-menu`。不要把 NO-TOUCH 背成“只读永不删”。',
    why:'运维扫描大键开 NO-TOUCH 后以为备份窗口内不会过期；或与只读副本语义混淆。',
    example:'对从库/`CLIENT NO-TOUCH ON` 后 `SCAN`+`GET` 做冷热分析，不抬升空闲键的热度。键上原有 TTL 仍倒计时。',
    task:'划掉“NO-TOUCH=不过期”。写出：它影响什么统计；过期仍看什么。',
    answer:'NO-TOUCH 避免访问刷新空闲/热度。过期仍由 TTL 与淘汰策略决定，不自动关闭。',
    keywords:'Redis CLIENT NO-TOUCH LRU TTL',
    points:['NO-TOUCH 不刷新空闲/热度','不取消 TTL','服务扫描与淘汰公平'],
    deep:[
      {title:'和只读命令',body:'只读也可能 TOUCH 空闲时间；NO-TOUCH 专治这类副作用。'},
      {title:'怎样自己验证',body:'键设短 TTL，NO-TOUCH 下反复 GET，OBJECT IDLETIME/TTL 对照：TTL 仍减，空闲不一定被刷新。'}
    ],
    refs:[['Redis：CLIENT NO-TOUCH','https://redis.io/docs/latest/commands/client-no-touch/'],['Redis：OBJECT IDLETIME','https://redis.io/docs/latest/commands/object-idletime/'],['Redis：EXPIRE','https://redis.io/docs/latest/commands/expire/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_113) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
