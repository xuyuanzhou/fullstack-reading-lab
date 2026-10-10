/* 《分布式高并发》D8：getset+墙钟锁；FOR UPDATE 当跨机租约。 */
const COVERAGE_JAVA_54 = [
  {
    track:'java', group:'分布式与高并发', id:'redis-lock-getset-wall-clock',
    title:'用本机墙钟做 Redis 锁过期会偏',
    prompt:'为什么资料在 SETNX 之后改用 get/getset，把「当前时间+超时」写进 value，再和本机系统时间比较？',
    promptAnswer:'靠 GETSET 与墙钟比过期不可靠。时钟漂移会误删别人的锁；应用租约与令牌。',
    core:'这种写法把**过期判定交给各客户端的系统时钟**。机器 A 比 B 快几秒，B 会以为锁已超时并 `GETSET` 抢走；A 仍按自己的表认为锁有效，两边同时进临界区。时钟回拨或 NTP 跳跃同样会让「未到期」和「已到期」对不上。现行做法是 `SET key token NX EX seconds`（或 `PX`），**TTL 由 Redis 服务端倒数**，释放时比对 token 再删，见 `redis-lock-setnx-expire-race`、`distributed-lock`。资料里的 getset 链并不能修好 SETNX+EXPIRE 的崩溃窗口，只是换了一种更容易被时钟打穿的协议。',
    why:'两台机器时钟差几秒，库存扣减被跑了两次，日志里两边都「合法拿到了锁」。排障却去查业务代码，不查 NTP。',
    example:'实例 A 写入 value=`nowA+30s`。实例 B 的时钟快 10 秒，读到 value 后判定已过期，`GETSET` 成功。A 仍在跑，B 也进了同一订单号的临界区。改成 `SET lock:order:9 <uuid> NX EX 30` 后，过期只看 Redis 的 TTL；释放用脚本确认 uuid 再 `DEL`。',
    task:'划掉“getset+本机时间=更稳的锁”。写出：过期应由谁计时；两台时钟不一致时旧写法会发生什么。',
    answer:'过期应由 Redis 服务端的 TTL 计时，用 SET NX EX 加唯一 token。旧写法用各机系统时间比较，时钟一偏会双持有或误判未过期。getset 链修不好 SETNX 与 EXPIRE 之间的崩溃窗口。',
    keywords:'Redis 分布式锁 GETSET 墙钟 SET NX EX NTP',
    origin:'《分布式高并发.pdf》约第 201 页：setnx/get/getset 与本机时间比较的锁',
    diagram:'diagrams/redis-lock-getset-clock.svg',
    points:['过期时间写进 value 再和本机时间比，依赖墙钟','时钟偏差会导致双持有或误判超时','应用 SET key token NX EX，由服务端 TTL 计时'],
    deep:[
      {title:'和 Redlock',body:'多节点算法另有争议与前提，见 Redis 文档分布式锁章节。单实例锁先把 NX+EX 与 token 释放做对，再讨论多主。'},
      {title:'邻接点',body:'SETNX 与 EXPIRE 分开的崩溃窗口见 redis-lock-setnx-expire-race。租约与临界区见 distributed-lock。不要用墙钟 value 代替服务端 TTL。'},
      {title:'怎样自己验证',body:'两台客户端故意把系统时间拨开几十秒，按资料步骤抢同一锁，应能出现双持有。改成 SET NX EX 后，在 TTL 内第二台应拿不到；拨时钟不应改变 Redis 上的剩余 TTL。'}
    ],
    refs:[['Redis：分布式锁','https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/'],['Redis：SET','https://redis.io/docs/latest/commands/set/'],['Redis：GETSET','https://redis.io/docs/latest/commands/getset/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'mysql-for-update-not-dist-lease',
    title:'FOR UPDATE 是事务行锁，不是跨机租约',
    prompt:'为什么资料把 SELECT … FOR UPDATE 当成分布式锁，还说宕机后数据库会自己释放？',
    promptAnswer:'FOR UPDATE 握在事务连接上，不是跨机租约。长事务会撑连接池，也不能防持锁进程失踪。',
    core:'`SELECT … FOR UPDATE` 在**当前事务**里锁住行（InnoDB 在能走索引时尽量行锁），提交或回滚后锁才没。它回答的是「这条连接上的这段事务谁改这行」，不是「集群里哪个进程持有跨机租约」。资料说的「宕机后数据库释放」来自连接断开、事务回滚，这点对。但把远程调用、发消息、等人脸识别都塞进这段未提交事务，连接一直占着，池子会被撑满；优化器若没用上索引还可能锁更大范围。跨服务互斥应靠短事务里的约束更新、Outbox，或 Redis/ZK 令牌租约，见 `distributed-lock`、`distributed-one-db-first`。同库、短临界区保护一行可以；不要把 FOR UPDATE 握到业务走完才当「分布式锁」。',
    why:'下单接口 FOR UPDATE 住库存行后去调支付，支付一慢，别的下单全堵在等锁，连接池告警，却以为自己在做标准分布式锁。',
    example:'事务里 `SELECT * FROM stock WHERE sku=? FOR UPDATE`，本地把库存减 1 后立刻 `COMMIT`，这是同库短保护。若在持锁期间 HTTP 调支付网关再回来提交，持锁时间变成网络 RTT，连接数随并发线性涨。改成条件更新 `UPDATE stock SET qty=qty-1 WHERE sku=? AND qty>=1`，或短事务扣减后再异步支付，连接立刻归还。',
    task:'划掉“FOR UPDATE=分布式锁”。写出：它锁在什么对象上；长业务握锁时先坏的是什么。',
    answer:'它锁在当前事务与连接触及的行（或更糟，更大范围）上。长业务不提交会占满连接、拖住别的事务。跨机租约用令牌+TTL 或业务约束；同库短事务里保护一行才合适。宕机回滚能放行锁，不能证明握锁做远程调用是对的。',
    keywords:'MySQL FOR UPDATE 行锁 连接池 分布式锁 事务',
    origin:'《分布式高并发.pdf》约第 200 页：用数据库排他锁 / FOR UPDATE 做分布式锁',
    diagram:'diagrams/mysql-for-update-not-lease.svg',
    points:['FOR UPDATE 锁在当前事务的连接上','长临界区会占满连接池并扩大锁范围风险','跨机互斥用租约或短事务约束，不要握锁调远程'],
    deep:[
      {title:'和锁定读文档',body:'InnoDB 锁定读是为事务内一致性读改服务的。秒杀库存的权威扣减可以是带条件的 UPDATE，见 `distributed-seckill`，不必把整段用户旅程放进一个 FOR UPDATE。'},
      {title:'和 SKIP LOCKED',body:'多 worker 抢行可用 FOR UPDATE SKIP LOCKED，那是跳过正被锁的行，不是消息队列，见 mysql-skip-locked-not-queue。'},
      {title:'邻接点',body:'同库优先与短事务见 distributed-one-db-first。跨服务互斥用租约见 distributed-lock。DNS 入口摘流见 dns-lb-not-just-round-robin，与行锁不是一层。'},
      {title:'怎样自己验证',body:'开两个会话：A FOR UPDATE 一行不提交，B 更新同一行应等待。看 A 占用连接不归还。A 在持锁时 sleep 模拟远程调用，连接池活跃数应上升。改成短 UPDATE 后立即提交，活跃连接应回落。'}
    ],
    refs:[['MySQL：锁定读','https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html'],['MySQL：InnoDB 锁','https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html'],['Redis：分布式锁','https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/']]
  }
];


for (const {points, refs, ...lesson} of COVERAGE_JAVA_54) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
