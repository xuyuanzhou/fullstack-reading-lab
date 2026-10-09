/* Batch 17: ten one-page Java PDFs (SOP/datetime/lock/engine/replica/bean/eviction/redis/CAP/locks). */
const COVERAGE_JAVA_17 = [
  {
    track:'frontend', group:'浏览器', id:'same-origin-script-still-runs',
    title:'同源策略拦的是读，不是“外域脚本不能执行”',
    prompt:'为什么把同源策略说成“只有百度自己的脚本才会被执行、浏览器拒收外域响应”会错？',
    core:'同源比较的是协议、主机、端口。它限制的是文档如何**读取**另一个源的数据：DOM、Cookie、多数脚本可读的响应体。从 CDN 引入的 `<script src>` 照样会执行，只是它跑在**当前文档的源**里，不能因此读另一个站点的私有接口。CORS 决定跨源 fetch/XHR 的响应能否交给页面脚本；请求常常已经发出，服务器也已处理。资料把“非同源脚本不会执行、响应收不到”说反了。页面之间的 postMessage、以及带 CORS 的响应，是受控的放行，不是关掉 SOP。',
    why:'把同源策略理解成外域脚本不会执行，就会觉得页面上插一条别人的 script 是安全的，那条脚本其实跑在当前文档里。区分信号是 CDN 脚本会执行，而跨源 fetch 常常已经有响应，只是页面脚本读不到正文。',
    example:'https://app.example 的页面引入 https://cdn.example/lib.js，脚本执行，document.cookie 读到的是 app 的登录态，不是 cdn 的后台。再 fetch https://api.other，网络面板里能看到响应，但没有 CORS 时脚本读 body 抛错，请求本身已经发出。',
    task:'对照同源定义，划掉“只有同源脚本才执行”；写出 CORS 拦的是脚本读响应，还是 TCP 发包。',
    answer:'对照同源定义，划掉只有同源脚本才执行：外域 script src 会执行，权限属于当前文档的源。CORS 拦的是脚本读取跨源响应，不是拦 TCP 发包。没有允许头时，预测请求可能已经到达服务器，页面只是拿不到正文。CDN 上的脚本预测会执行，并且使用当前页面的源。',
    keywords:'同源策略 CORS script src Origin',
    points:['同源看协议、主机和端口','跨源 script 会执行，权限是当前文档的源','CORS 常常是响应已回、脚本读不到，不是没发出请求'],
    deep:[
      {title:'执行和读取不是同一道门',body:'协议、主机、端口相同才叫同源。script 标签跨源照样下载执行，但跑在引入它的文档里。CORS 决定这段响应能不能交给页面脚本，不表示浏览器没把请求发出去。外域脚本执行后权限仍属于当前页面。'},
      {title:'怎样自己验证',body:'引入另一主机上的脚本，它应执行并能读当前文档。再对没有 CORS 头的接口发 fetch，网络面板里应能看到响应，脚本读 body 应失败。把只有同源脚本才执行划掉。'},
    ],
    refs:[['MDN：Same-origin policy','https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy'],['MDN：CORS','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS']]
  },
  {
    track:'java', group:'数据库', id:'mysql-datetime-vs-timestamp',
    title:'DATETIME 不是 8 字节，TIMESTAMP 仍有 2038',
    prompt:'为什么把 DATETIME 背成 8 字节、与时区无关所以永远更好，会过时？',
    core:'MySQL 5.6.4 起 DATETIME 打包存储，不含小数秒时是 5 字节不是 8；TIMESTAMP 不含小数秒仍是 4 字节。TIMESTAMP 按会话时区转成 UTC 再存，读出再转回；DATETIME 按字面存，不随会话时区换算。TIMESTAMP 传统上限约 2038-01-19 UTC；DATETIME 可到 9999。选谁取决于要不要随会话时区转换、要不要越过 2038，而不是“4 字节一定省、8 字节一定阔”。小数秒会再加字节。时区表未加载时转换会错。',
    why:'按 DATETIME 占 8 字节去算行宽，容量账会偏；会话时间用 TIMESTAMP 又不提 2038，到期后写入会失败。区分信号是无小数秒时一个 5 字节且按字面存放，另一个 4 字节且随会话时区换算。',
    example:'无小数秒的 DATETIME 列占 5 字节，写入 2039-01-01 00:00:00 仍可保存，换会话时区读出来还是这个字面值。TIMESTAMP 占 4 字节，按会话时区转成 UTC 再存，传统上限约 2038-01-19 UTC，再晚的时刻写不进去。',
    task:'对照 8.4 存储需求表，写出无小数秒时 DATETIME 与 TIMESTAMP 的字节数和 TIMESTAMP 上限。',
    answer:'对照 8.4 存储需求表：无小数秒时 DATETIME 是 5 字节，不是 8 字节；TIMESTAMP 是 4 字节。TIMESTAMP 的上限约 2038-01-19 UTC，并且读写会按会话时区与 UTC 互转。DATETIME 存字面值，可到 9999。',
    keywords:'MySQL DATETIME TIMESTAMP 2038 时区 存储',
    points:['现行 DATETIME 无小数秒是 5 字节不是 8','TIMESTAMP 按会话时区与 UTC 互转，上限约 2038','DATETIME 存字面值，不随会话时区改写'],
    deep:[
      {title:'字节和时区是两件事',body:'现行打包后的 DATETIME 不再按 8 字节估算。TIMESTAMP 省的那一字节换来的是时区换算和 2038 上限。日历上的某一天若不能被会话时区挪走，应存字面值。小数秒还会再加字节。'},
      {title:'怎样自己验证',body:'打开 8.4 的日期时间存储表，核对无小数秒时 DATETIME 为 5 字节、TIMESTAMP 为 4 字节，并看到 TIMESTAMP 上限约 2038-01-19。改会话时区后，只有 TIMESTAMP 的显示应跟着变。'},
    ],
    refs:[['MySQL：Date and Time Type Storage','https://dev.mysql.com/doc/refman/8.4/en/storage-requirements.html#data-types-storage-reqs-date-time'],['MySQL：DATETIME and TIMESTAMP','https://dev.mysql.com/doc/refman/8.4/en/datetime.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'redis-lock-setnx-expire-race',
    title:'SETNX 再 EXPIRE 不是原子加锁',
    prompt:'为什么“SETNX 加锁再 expire 自动释放”会在进程崩溃时把锁锁死，或让别人抢到未过期的锁？',
    core:'SETNX 成功之后、EXPIRE 执行之前崩溃，键会永远留下，所有人拿不到锁。两条命令之间别人也插得进。现行做法是一条 SET key token NX EX seconds（或 PX），用唯一 token 再按值删除。锁仍是租约：业务跑得比 TTL 长，旧持有者可能覆盖新持有者，还要版本或 fencing，见 `distributed-lock`。资料里的 ZooKeeper 临时有序节点方向可接受，细节以 Curator 互斥锁为准，不要手写“听前一个节点”却漏掉羊群效应。',
    why:'SETNX 成功后、EXPIRE 执行前进程被杀，键永远留着，所有人拿不到锁。区分信号是两条命令中间有崩溃窗口，而 SET key token NX EX 在一条命令里同时写上过期。',
    example:'客户端 SETNX lock:order:1 返回成功，还没执行 EXPIRE 就被杀死。键没有 TTL，别的实例一直加锁失败。改成 SET lock:order:1 <uuid> NX EX 30 后，崩溃也会在 30 秒后消失。释放时用脚本比较 uuid 再 DEL，避免删掉别人的锁。',
    task:'画出 SETNX 成功、尚未 EXPIRE、进程被杀的时间线；对照 SET 文档写出 NX+EX 一条命令。',
    answer:'时间线是 SETNX 成功、EXPIRE 尚未执行、进程被杀，预测键永久留下。对照 SET 文档，一条命令写成 SET key token NX EX 秒数，预测加锁和过期同时完成。TTL 到了仍只是租约，业务跑超时还要用版本拦住旧持有者。',
    keywords:'Redis SETNX SET NX EX 分布式锁 租约',
    points:['SETNX 与 EXPIRE 分开执行会在崩溃时留下死锁键','应用 SET key token NX EX 一次完成','TTL 到期后旧持有者仍可能写，要业务版本校验'],
    deep:[
      {title:'过期必须和占位同一条命令',body:'SETNX 只负责没有键时写入，不管 TTL。崩溃发生在下一条 EXPIRE 之前，锁就死了。现行写法是带唯一 token 的 SET NX EX。过期后旧持有者仍可能写，所以还要业务版本。'},
      {title:'怎样自己验证',body:'画出 SETNX 成功后、EXPIRE 前被杀的时间线，键应没有 TTL。再对照 SET 文档写成 SET key token NX EX 30，中途杀掉进程，键应在 30 秒后消失。释放必须先比对 token。'},
    ],
    refs:[['Redis SET','https://redis.io/docs/latest/commands/set/'],['Redis SETNX','https://redis.io/docs/latest/commands/setnx/']]
  },
  {
    track:'java', group:'数据库', id:'mysql-replica-parallel-applier',
    title:'从库应用不再只能是一条 SQL 线程（MySQL 8.0+）',
    prompt:'为什么把复制延迟只归因于“主从复制是单线程”，在 8.4 上会过时？',
    core:'异步复制确实会让从库落后，读自己的写入仍要读主库或等位点，见 `mysql-replica-lag`。但“从库只能单线程应用 binlog”不是现行全貌：**MySQL 8.0/8.4** 可用 replica_parallel_workers 做基于逻辑时钟的并行应用，前提是事务在主库上也能并行提交。大事务、行锁冲突、磁盘和网络仍会造成延迟。一主多从能摊读，摊不掉单条大事务。强制关键读走主库、缓存刚写的键，比只加硬件更对症。',
    why:'把复制延迟只归咎于从库单线程，就会漏掉并行回放，也会以为多加一台从库就能消灭大事务的落后。区分信号是 replica_parallel_workers 大于 1 时事务可以并行应用，但一条大事务或行锁冲突仍然追不上。',
    example:'从库把 replica_parallel_workers 设成多个，主库上本来就能并行提交的小事务在从库并行回放，延迟下降。接着主库提交一个改动几百万行的事务，从库延迟再次拉大。下单后的我的订单仍读主库，不读这台还在追的从库。',
    task:'对照 8.4 复制线程与 replica_parallel_workers，划掉“复制只能单线程”；写出并行仍然追不上的两类负载。',
    answer:'对照 8.4 的复制线程和 replica_parallel_workers，划掉复制只能单线程：从库可以用多个 worker 按逻辑时钟并行应用。并行仍然追不上的两类负载是单条大事务，以及回放时的行锁冲突。关键读仍走主库。加从库摊不掉单条大事务造成的落后。',
    keywords:'MySQL replica_parallel_workers 复制延迟 逻辑时钟',
    points:['异步复制会落后，这点没变','8.4 可用多 worker 并行应用事务','大事务、锁冲突和硬件仍会造成延迟'],
    deep:[
      {title:'并行回放也追不上大事务',body:'异步复制会落后这一点没变。多个 worker 只说明不再只能一条 SQL 线程。大事务要等它自己放完，锁冲突会让可以并行的事务互相等。一主多从摊的是读，不是这一条大事务。'},
      {title:'怎样自己验证',body:'对照 replica_parallel_workers 划掉只能单线程。把 worker 调大后跑一批互不冲突的小事务，延迟应能下降。再跑一条大事务或互相冲突的更新，从库仍应明显落后。'},
    ],
    refs:[['replica_parallel_workers','https://dev.mysql.com/doc/refman/8.4/en/replication-options-replica.html#sysvar_replica_parallel_workers'],['MySQL：Replication Threads','https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-fifo-not-maxmemory',
    title:'Redis 淘汰没有名叫 FIFO 的官方策略',
    prompt:'为什么把缓存淘汰背成 FIFO、LRU、LFU 三种，并当成 Redis maxmemory-policy 会错位？',
    core:'教科书里的 FIFO/LRU/LFU 是通用页面置换思路。Redis 在 maxmemory 时用的是 noeviction、allkeys-/volatile- 搭配 lru、lfu、random、ttl，以及较新的 lrm；没有一项官方政策叫 FIFO。LRU/LFU 还是近似抽样，不是精确链表。把 FIFO 当 Redis 答案会在配置项里找不到。通用缓存组件可以自己实现 FIFO，那是另一套产品。完整菜单见 `redis-eviction-policy-menu`。',
    why:'把淘汰背成 FIFO、LRU、LFU，到 redis.conf 里找不到名叫 FIFO 的 maxmemory-policy。区分信号是政策名是 allkeys 或 volatile 再加 lru、lfu、random、ttl，而不是先进先出。',
    example:'内存打满后配置 allkeys-lfu，Redis 按近似 LFU 挑键删除，配置列表里没有 FIFO。若改成 volatile-lru，只有带 TTL 的键才会被抽样淘汰；所有键都没有过期时间时，它腾不出空间，写入会像 noeviction 一样失败。',
    task:'打开 eviction 文档列出政策名，划掉 FIFO 作为 Redis 选项；说明 volatile-lru 在没有 TTL 时怎样。',
    answer:'打开淘汰文档，政策名是 noeviction、allkeys/volatile 搭配 lru、lfu、random、ttl 等，把 FIFO 划掉，它不是 Redis 选项。volatile-lru 在没有 TTL 时预测无键可淘汰，内存仍满，后续写入失败。LRU/LFU 在这里还是近似抽样。',
    keywords:'Redis maxmemory-policy FIFO LRU LFU',
    points:['FIFO 是通用置换思路，不是 Redis 政策名','Redis 淘汰名是 allkeys/volatile 加 lru lfu random ttl','LRU/LFU 在 Redis 里是近似抽样'],
    deep:[
      {title:'政策名要能在配置里对上',body:'FIFO 是教科书里的页面置换，不是 Redis 的 maxmemory-policy。volatile 开头的策略只考虑设了过期的键。没有 TTL 却选了 volatile-lru，结果接近不许淘汰。'},
      {title:'怎样自己验证',body:'打开 eviction 文档把政策名抄下来，其中应没有 FIFO。再在所有键都没有 TTL 时设 volatile-lru 并写到内存上限，预测写入失败；改成 allkeys-lru 后应开始淘汰已有的键。'},
    ],
    refs:[['Redis：Key eviction','https://redis.io/docs/latest/develop/reference/eviction/']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_17) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
