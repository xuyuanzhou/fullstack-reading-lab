/* Java 62: W3CSchool 续扫 — 存储过程≠自动事务；MULTI 与 Lua 对照课。 */
const COVERAGE_JAVA_62 = [
  {
    track:'java', group:'数据库', id:'mysql-procedure-not-auto-txn',
    title:'存储过程是例程，不会自动给你一整段事务',
    prompt:'为什么把几条 UPDATE 放进 PROCEDURE 里，中途报错后有的行已经改掉了？',
    promptAnswer:'过程只是可调用的例程。事务仍靠 autocommit、显式 START/COMMIT/ROLLBACK 或调用方事务。',
    core:'**存储过程**是库里存好的 SQL 例程（`CREATE PROCEDURE` + `CALL`），方便复用与权限收口。它**默认不会**把过程体包成“全部成功或全部回滚”的事务。是否开启事务、是否提交，仍看会话的 `autocommit`、过程里有没有显式 `START TRANSACTION` / `COMMIT` / `ROLLBACK`，以及语句自身的隐式提交（DDL 等）。应用层事务（Spring `@Transactional`）也不会因为“调用了过程”就自动覆盖过程内部的提交点。不要把“写进过程”当成分布式或本地事务的替代品。',
    why:'以为 CALL 失败就会整段撤销，对账发现过程前半段已提交，后半段没跑。',
    example:'过程里先扣库存再写订单，中间抛错；若 autocommit=1 且无显式事务，库存已扣、订单没有。应在过程或调用方显式开事务，错误路径 ROLLBACK；或把关键路径留在应用事务里、过程只做单语句辅助。',
    task:'划掉“存储过程=自动事务”。写出：过程提供什么；事务边界还靠什么决定。',
    answer:'过程只是可调用的例程。事务仍靠 autocommit、显式 START/COMMIT/ROLLBACK 或调用方事务。中途失败不自动整段回滚。',
    keywords:'MySQL 存储过程 事务 autocommit CALL',
    points:['存储过程是例程，不是事务包装器','默认不自动全部回滚','事务边界仍靠显式事务或会话设置'],
    deep:[
      {title:'和视图',body:'VIEW 存查询定义，见 mysql-view-is-stored-query。PROCEDURE 存可执行语句序列。两者都不是“自动正确的业务封装”。'},
      {title:'怎样自己验证',body:'写一个中途故意失败的过程：不开事务时前半应已生效；包进 START TRANSACTION 并 ROLLBACK 后应全无。'}
    ],
    refs:[['MySQL：存储程序','https://dev.mysql.com/doc/refman/8.4/en/stored-programs-defining.html'],['MySQL：事务','https://dev.mysql.com/doc/refman/8.4/en/commit.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-multi-vs-lua-pick',
    title:'MULTI 排队与 Lua 脚本：原子缝不同，都不是 SQL 回滚',
    prompt:'为什么 WATCH+MULTI 老是 EXEC 失败，有人建议改成 Lua，有人又说 MULTI 就够了？',
    promptAnswer:'无分支批量写可用 MULTI；读后分支用 Lua；跨库仍要 Outbox/业务事务，不在 MULTI/Lua 里。',
    core:'**MULTI/EXEC** 把命令入队，EXEC 时连续执行，中间不插别人的命令；**WATCH** 在 EXEC 前发现键被改则整批放弃。批内某条运行时失败**不会**按 SQL 方式回滚已执行的兄弟命令，见 `redis-transaction`。**Lua EVAL** 在服务端把脚本当一段连续逻辑跑完，读改可写在同一脚本里，适合“读库存再决定是否 DECR”这种带分支的原子，见 `redis-lua-atomic`。选型：无分支的一小撮写命令、可接受乐观重试 → MULTI/WATCH；必须在服务端根据读结果分支且不想客户端往返 → Lua。两者都**不是**跨 Redis 与 MySQL 的分布式事务。',
    why:'把 MULTI 当数据库事务，失败以为前面已写入会撤销；或凡并发都上 Lua，简单递增也写成难维护的脚本。',
    example:'两个客户端 WATCH 同一库存，交错改，后 EXEC 的失败——这是乐观冲突，重读再试。秒杀“读完再减”用 EVAL 一次判断，避免 GET 与 DECR 之间的缝。单纯 INCR 计数器用一条命令，不必 MULTI 也不必 Lua。',
    task:'划掉“MULTI=SQL 事务、Lua=更强的同一种事务”。给：无分支批量写、读后分支扣减、跨库扣减，各选哪一层。',
    answer:'无分支批量写可用 MULTI；读后分支用 Lua；跨库仍要 Outbox/业务事务，不在 MULTI/Lua 里。两者都不提供 SQL 式回滚。',
    keywords:'Redis MULTI Lua WATCH 原子 回滚',
    points:['MULTI 保证批内不插队，不保证 SQL 回滚','Lua 适合服务端读改一体的短脚本','跨库一致性不在这两层解决'],
    deep:[
      {title:'和 Pipeline',body:'Pipeline 只减网络往返，不提供原子。不要把 pipeline 当成 MULTI。'},
      {title:'怎样自己验证',body:'WATCH 冲突应整批不执行。Lua 并发扣库存为 1 时应只有一次成功。确认失败命令不会“撤销”同批已执行写入（对照手册）。'}
    ],
    refs:[['Redis：Transactions','https://redis.io/docs/latest/develop/using-commands/transactions/'],['Redis：EVAL','https://redis.io/docs/latest/commands/eval/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_62) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
