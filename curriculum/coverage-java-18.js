/* Batch 18: ten one-page Java PDFs (Dubbo/Nginx LB, index, MQ backlog/send/reliability, TPE, cache, MySQL logs). */
const COVERAGE_JAVA_18 = [
  {
    track:'java', group:'并发', id:'java-tpe-execute-order',
    title:'ThreadPoolExecutor 是 execute 时才建线程，不是队列里先堆着不动',
    prompt:'为什么说“没调用 prestartAllCoreThreads 时，工作队列里已有任务也不会执行”会误导？',
    core:'ThreadPoolExecutor 的常规入口是 execute/submit。任务数少于 corePoolSize 时会新建线程；否则尝试入队；队列满且线程数仍小于 maximumPoolSize 时再新建；再不行走拒绝策略。prestartAllCoreThreads 只是提前把核心线程拉起来，不是“否则队列里的任务永远不跑”。资料把“当前任务数减队列容量”算最大线程的公式写乱了，不要背。工作队列里出现任务，是因为已经有过 execute，核心线程通常已经在跑。',
    why:'按没调用 prestart 队列里的任务也不会跑去理解线程池，会在已经 execute 的任务上干等，或把队列和 max 设反。区分信号是第 13 个任务在队列满之后才新建超出 core 的线程，而不是先把队列堆满却不执行。',
    example:'core 为 2、队列 10、max 为 4。前两个 execute 各建一条线程并开始跑。第 3 到第 12 个进入队列，由已有线程取走。第 13、14 个因队列已满且线程数还小于 max，再新建线程。第 15 个走拒绝。全程没有调用 prestart。',
    task:'对照 Javadoc 的 execute 三段，划掉“队列有任务也不会执行”；写出队列满之后才涨到 max 的条件。',
    answer:'对照 execute 的三段，划掉队列里已有任务也不会执行。预测先建到 core，再入队，队列满并且当前线程数仍小于 maximumPoolSize 时才涨到 max，再满才拒绝。prestartAllCoreThreads 只是预热，不是任务会不会跑的开关。',
    keywords:'ThreadPoolExecutor execute corePoolSize 工作队列 拒绝策略',
    points:['任务经 execute/submit 进入池，不是凭空堆在队列里','先建到 core，再入队，队列满才涨到 max','prestartAllCoreThreads 只是预热，不是开关'],
    deep:[
      {title:'队列满了才继续加人',body:'任务只能从 execute 或 submit 进来。核心线程还没满就先建线程，满了才进队列。队列还有空位时不会为了加速去建到 max。prestart 只是提前把核心线程拉起来。'},
      {title:'怎样自己验证',body:'按 core、有界队列、max 的顺序提交任务。队列未满时应保持 core 条线程。队列满后再提交，线程数才应涨到 max。再多一个应被拒绝。不要先调用 prestart。'},
    ],
    refs:[['ThreadPoolExecutor','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'dubbo-loadbalance-random-default',
    title:'Dubbo 默认是加权随机，轮询会在慢节点上堆积',
    prompt:'为什么只背 RoundRobin，或把 LeastActive 说成“响应最短”，会对不上 Dubbo 的负载均衡？',
    core:'Apache Dubbo 常见策略是 RandomLoadBalance（默认、可加权）、RoundRobinLoadBalance、LeastActiveLoadBalance、ConsistentHashLoadBalance，较新版本还有 ShortestResponseLoadBalance。LeastActive 看的是进行中的调用数，不是直接比 RT。轮询会把请求打到已经变慢但未摘除的提供者上，调用被拖住后后续仍轮到它，形成堆积。一致性哈希用虚拟节点降低增减节点时的剧烈迁移。用 loadbalance 参数在服务或方法上指定。',
    why:'只背 RoundRobin，或把 LeastActive 当成响应最短，线上会去拧错误的旋钮。区分信号是默认策略是加权随机；一台变慢但还活着时，轮询仍按次序把请求打过去，调用在那台上面堆积。',
    example:'未写 loadbalance 的服务，提供者按权重被随机选中，不是依次轮询。把一台提供者的处理拖慢但不摘除，roundrobin 仍轮到它，进行中的调用变多。改成 leastactive 后，新请求更少分给这台进行中调用已经很多的节点。',
    task:'对照 Dubbo LoadBalance 文档列出默认策略；说明 roundrobin 在一台变慢未挂时会发生什么。',
    answer:'对照 LoadBalance 文档，默认是加权的 RandomLoadBalance。一台变慢但未摘除时，roundrobin 预测继续按轮次把请求打到它上面，调用在该节点堆积。LeastActive 看的是进行中的调用数，不是直接比较响应时间。',
    keywords:'Dubbo loadbalance Random RoundRobin LeastActive ConsistentHash',
    points:['默认 RandomLoadBalance，可加权','LeastActive 统计活跃调用数，不是直接最短响应','RoundRobin 会在慢但未摘除的节点上堆积'],
    deep:[
      {title:'慢但还活着仍会被轮到',body:'轮询不看这台现在有多慢，只要还在列表里就按次序分配。最少活跃统计的是进行中调用，响应变长通常会让活跃数变高，但名字不是最短响应。一致性哈希用虚拟节点减轻迁移。未摘除就会继续按轮次分配。'},
      {title:'怎样自己验证',body:'对照文档确认未配置时是加权随机。再把一台提供者人为变慢且不摘除，roundrobin 下这台的进行中调用应继续增加。换成 leastactive 后，新增调用应少分给它。'},
    ],
    refs:[['Dubbo：Load Balance','https://dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/loadbalance/intro/']]
  },
  {
    track:'java', group:'数据库', id:'mysql-prefix-index-and-cost',
    title:'索引能少扫行，也会拖慢写；前缀索引还可能覆盖不了排序',
    prompt:'为什么把“TEXT/BLOB 建前缀索引就更快、变动少就多建几个”当成无条件优化？',
    core:'二级索引减少扫描，覆盖索引有时只读索引就能结束查询。代价是磁盘、以及 INSERT/UPDATE/DELETE 要维护。TEXT/BLOB 不能整列做普通索引，可用前缀索引，但前缀太短选择性差，也撑不起 ORDER BY 整列。列顺序要跟等值、范围、排序一致，不是“查询相关就往组合索引里堆”。写多读少的列谨慎加索引。资料把 BLOB 写成 BLOG，以官方类型名为准。',
    why:'把 TEXT 上的短前缀索引当成无条件加速，选择性不够时仍然扫很多行，写入还要多维护一棵索引。区分信号是前缀太短时区分度很差，组合索引的列顺序对不上时 ORDER BY 仍要额外排序。',
    example:'邮箱前 8 个字符几乎都落在同一个域名上，前缀索引区分不了用户，优化器仍读很多行。用户表改成 email 整列唯一索引才有选择性。另一条索引是 (name, created_at)，查询 WHERE name=? ORDER BY id，id 不在索引里，执行计划仍要 filesort。',
    task:'对照列索引文档，写出 BLOB/TEXT 为何常用前缀；列出一条组合索引被 ORDER BY 用不上的情况。',
    answer:'对照列索引文档：BLOB/TEXT 通常不能整列做普通索引，所以用前缀，前缀必须够长才有选择性。组合索引 (name, created_at) 遇到 ORDER BY id 用不上这个顺序，预测要额外排序。写多读少的列还要算上维护索引的代价。',
    keywords:'MySQL 前缀索引 覆盖索引 BLOB 维护成本',
    points:['索引减少扫描但增加写维护和空间','TEXT/BLOB 常用前缀索引，前缀太短会没选择性','组合索引列顺序要匹配等值、范围和排序'],
    deep:[
      {title:'前缀短了等于没索引',body:'TEXT 和 BLOB 用前缀是因为整列不能按普通索引来建。前缀若都是相同的开头，读路径省不下。组合索引要先等值、再范围和排序，把无关列堆进去不会让 ORDER BY 自动用上。'},
      {title:'怎样自己验证',body:'对照文档写明 BLOB/TEXT 为何用前缀。建一条 (name, created_at)，执行 WHERE name=? ORDER BY id，Extra 里应出现 filesort。把邮箱前缀放到几乎相同的域名上，应看到区分度很差。'},
    ],
    refs:[['MySQL：Column Indexes','https://dev.mysql.com/doc/refman/8.4/en/column-indexes.html'],['MySQL：Multiple-Column Indexes','https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html']]
  },
  {
    track:'java', group:'消息队列', id:'mq-backlog-expand-queues',
    title:'堆积时加消费者，受分区或队列数上限',
    prompt:'为什么“Consumer 修好了再慢慢消费”和“只加进程不加队列”都消化不了几千万堆积？',
    core:'先修好不消费的原因，避免继续写坏数据。并行度通常受 Kafka 分区数或 RocketMQ 队列数限制，消费者多于分区/队列会空转。应急可以扩分区/队列，或把旧 topic 的消息转发到队列更多的临时 topic，再拉起成倍消费者；追上后再缩回。新消息若不能丢，要评估是否暂停生产或另开通道。死信和重试见 `mq-dlq-backlog`。这是运维应急，不是日常靠堆积当缓冲。',
    why:'堆积几千万时只加消费者进程、不加队列，多出来的进程没有分区可领，吞吐仍卡在原来的队列数。区分信号是消费者数已经大于队列数时，新增实例空转，把积压转到更宽的主题后才会一起被领走。空转的进程不会把吞吐提上去。',
    example:'RocketMQ 主题 8 个队列、堆积 3 千万，消费者从 8 加到 64，只有 8 个分到队列，其余空闲。新建 64 队列的临时主题，把旧主题里的消息转发过去，64 个消费者都能领到，积压下降。追上后再把宽度缩回。Kafka 同样受分区数限制。',
    task:'写出消费者数大于队列数时多出来的实例在做什么；给出一种不丢积压的扩并行办法。',
    answer:'消费者数大于队列数时，多出来的实例预测空转，领不到分区或队列。不丢积压的办法是先修好不消费的原因，再把消息转发到队列更多的临时主题，或增加分区，让更多消费者并行追赶，追上后再缩回。多出来的消费者应处于没有队列可领的状态，积压要靠加宽后再追。',
    keywords:'消息堆积 扩容 队列数 分区 RocketMQ Kafka',
    points:['先修复不消费，再谈追赶','消费者并行度受分区或队列数限制','应急用更宽的临时主题或扩分区，追上再缩容'],
    deep:[
      {title:'并行度跟队列走',body:'一个队列或分区同一时刻主要由一个消费者处理。进程再多，没有对应的队列就只能闲着。扩容是把积压搬到更宽的主题或增加分区，不是把坏消息继续写下去。没有队列的进程应一直空闲。'},
      {title:'怎样自己验证',body:'在 8 个队列上把消费者加到 64，多出来的实例应没有分配到队列。再转发到 64 队列的临时主题，积压应开始下降，且转发过程中旧消息没有被丢弃。追平之前不要丢掉尚未转发的消息。'},
    ],
    refs:[['RocketMQ：Consumer progress','https://rocketmq.apache.org/docs/bestPractice/04log/'],['Kafka：Consumer groups','https://kafka.apache.org/documentation/#intro_consumers']]
  },
  {
    track:'java', group:'数据库', id:'mysql-redo-undo-binlog',
    title:'redo/undo/binlog 不是同一本日记',
    prompt:'为什么把 binlog 只说成“主从同步”，或把慢日志说成“只记录执行成功”会漏场景？',
    core:'InnoDB redo 保证崩溃后能重做已提交变更，服务持久性。undo 用于回滚，并给 MVCC 读旧版本。binlog 是 Server 层逻辑日志，复制、时间点恢复都靠它，不只是主从。从库先把事件写成 relay log 再回放。error log 记实例诊断；slow query log 记超过 long_query_time 的语句，阈值可配，不是“失败就不记、成功才记”这么简单。general log 默认关，打开会明显拖性能。',
    why:'把 binlog 只当成主从同步，误删之后想不到用它做时间点恢复；把慢日志当成只记成功语句，长耗时的失败也会漏看。区分信号是 redo 管崩溃重做，undo 管回滚和旧版本，binlog 是 Server 层的逻辑日志。',
    example:'事务提交时 InnoDB 用 redo 保证已提交变更能在崩溃后重做，undo 留着回滚和 MVCC 读旧版本。同一事务的逻辑事件写入 binlog。从库 IO 线程把这些事件写成 relay log，再由应用线程回放。四本日志不能互相代替。',
    task:'对照 8.4 文档，给 redo、undo、binlog、relay log 各写一句不可互换的用途。',
    answer:'对照 8.4 文档：redo 用于崩溃后重做已提交变更，不可换成复制日志。undo 用于回滚和 MVCC，不可换成 redo。binlog 用于复制和时间点恢复，不只是主从。relay log 是从库本地先收下的那份事件，再被回放。慢日志也不是只有成功语句才记录。',
    keywords:'MySQL redo undo binlog relay log slow query',
    points:['redo 服务持久性与崩溃恢复','undo 服务回滚和 MVCC','binlog 用于复制和时间点恢复，不只是主从'],
    deep:[
      {title:'四本日志各管一段',body:'redo 服务持久性。undo 让事务能撤销，也给一致性读提供旧版本。binlog 在 Server 层，主从和时间点恢复都读它。从库不能直接改 binlog 文件来回放，中间还有 relay log。'},
      {title:'怎样自己验证',body:'给 redo、undo、binlog、relay log 各写一句用途，四句应不能互换。再打开慢查询日志说明，确认超过阈值的语句会被记下，而不是只有执行成功才记。'},
    ],
    refs:[['MySQL：InnoDB redo log','https://dev.mysql.com/doc/refman/8.4/en/innodb-redo-log.html'],['MySQL：Binary Log','https://dev.mysql.com/doc/refman/8.4/en/binary-log.html'],['MySQL：Slow Query Log','https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html']]
  },
  {
    track:'java', group:'消息队列', id:'rocketmq-send-oneway-may-drop',
    title:'同步/异步发送仍可能失败，单向发送本来就不保证',
    prompt:'为什么把 SYNC/ASYNC 对比表里的“不丢失”当成队列保证了可靠投递？',
    core:'RocketMQ Producer 有同步 send、异步 send 加回调、以及 oneway。oneway 不等待应答、没有回调，适合可丢的日志，不能当订单通道。同步和异步能拿到成功或失败，失败要按业务重试，并且消息键要稳定以便幂等，见 `mq-consume-idempotent-key`。Broker 侧还要刷盘与主从：异步刷盘断电可丢，同步刷盘更稳更慢，见 `rocketmq-flush-ha`。表上的“不丢失”忽略了超时、切换主、刷盘方式和未确认消费。',
    why:'把同步发送的有回执当成端到端不丢，出账时会发现刷盘或主从切换仍然少了消息。区分信号是 oneway 根本没有应答和回调，同步成功之后若仍是异步刷盘，断电还是可能丢。调用方甚至不会收到失败通知。',
    example:'访问日志用 sendOneway，调用立刻返回，Broker 没答应，这条可以消失。积分发放用异步发送，只在成功回调里把状态写成已发送。订单用同步发送且 Broker 异步刷盘，send 已经返回成功，断电后这条仍可能不在磁盘上。',
    task:'对照三种发送，写出 oneway 缺什么；列出同步成功之后 Brokers 仍可能丢的一种配置。',
    answer:'对照三种发送：oneway 预测没有应答、没有回调，失败也不会告诉你。同步或异步拿到成功之后，Broker 若配置成异步刷盘，预测断电仍可能丢掉尚未落盘的消息。关键业务还要复制和消费端幂等。订单不要走 oneway，异步刷盘的成功返回仍要按可能丢失来设计。',
    keywords:'RocketMQ send sendAsync oneway 刷盘 可靠性',
    points:['三种发送：同步、异步回调、oneway','oneway 适合可丢日志，不适合关键业务','有回执不等于端到端不丢，还看刷盘、复制和 ACK'],
    deep:[
      {title:'有回执只说明当时这一跳',body:'oneway 连这一跳的结果都没有，只适合可丢的日志。同步和异步能看到成功或失败，失败才谈得上重试。Broker 侧的刷盘和主从没配好，成功返回之后仍可能丢。日志可以丢，订单不可以。'},
      {title:'怎样自己验证',body:'对照三种发送，确认 oneway 没有回调。再把 Broker 设成异步刷盘，同步 send 返回成功后模拟断电，重启后这条消息应可能不在。订单路径不要用 oneway。'},
    ],
    refs:[['RocketMQ：Producer best practice','https://rocketmq.apache.org/docs/bestPractice/01bestpractice/'],['RocketMQ：Message storage','https://rocketmq.apache.org/docs/introduction/02quickstart/']]
  },
  {
    track:'java', group:'Nginx', id:'nginx-ip-hash-session',
    title:'Nginx 默认轮询，ip_hash 只是按客户端地址粘滞',
    prompt:'为什么把默认轮询说成“可靠性低、只适合静态文件”，或把 ip_hash 当成通用会话方案？',
    core:'ngx_http_upstream_module 默认 round-robin，可加 weight。ip_hash 按客户端地址哈希，同一地址尽量落到同一台，用于本机 session 或本地缓存亲和。客户端经多层 NAT、或地址变化，粘滞会失效；要稳定会话更常见的是上游无状态或共享存储。还有 least_conn、hash 等。轮询不会天生“不可靠”，健康检查失败才会摘除。weight 按权重摊流量，适合机器规格不同。',
    why:'把默认轮询说成只适合静态文件，就会把动态接口改成 ip_hash，公司出口 NAT 后大量用户粘在同一台上，流量打偏。区分信号是默认算法按权重轮询，ip_hash 只看客户端地址，不看登录会话。',
    example:'upstream 不写 ip_hash 时按 round-robin 加 weight 分发，某台健康检查失败才被摘除。改成 ip_hash 后，整栋楼共用一个出口地址的用户都落到同一台。这个地址一变，粘滞也消失。登录态放到 Redis 后，回到默认轮询仍然认得出用户。',
    task:'对照 upstream 文档写出默认算法；说明 ip_hash 在公司出口 NAT 下会怎样。',
    answer:'对照 upstream 文档，默认算法是加权轮询。ip_hash 在公司出口 NAT 下预测许多用户共用一个地址，全部粘到同一台，流量打偏；地址变化时粘滞还会断。会话应放到共享存储，而不是靠客户端地址。无状态接口应回到加权轮询，会话放在共享存储。',
    keywords:'Nginx upstream round-robin ip_hash weight least_conn',
    points:['默认 round-robin，可用 weight','ip_hash 按客户端地址粘滞，NAT 下不可靠','轮询本身不等于低可靠，摘除靠健康检查'],
    deep:[
      {title:'粘滞看的是地址不是登录态',body:'ip_hash 让同一客户端地址尽量落到同一台，给本机 session 用。NAT 后面的人会挤在一起。轮询本身不表示不可靠，摘除靠健康检查。机器规格不同时用 weight。'},
      {title:'怎样自己验证',body:'对照 upstream 文档，不写 ip_hash 或 least_conn 时应是加权轮询。再从同一个 NAT 出口访问 ip_hash 的上游，多个用户应落到同一台。把会话改到 Redis 后，轮询仍应认得出用户。'},
    ],
    refs:[['nginx：ngx_http_upstream_module','https://nginx.org/en/docs/http/ngx_http_upstream_module.html']]
  },
  {
    track:'java', group:'缓存', id:'cache-local-vs-distributed',
    title:'本地缓存最快但不能跨进程，Redis 单机也不是“本地缓存”的同义词',
    prompt:'为什么把 Redis 单机和 MyBatis 一级缓存都列进“本地缓存”，选择时会混？',
    core:'进程内缓存（Caffeine、Guava、堆上 Map、MyBatis 一级缓存）和请求同进程，无网络，但不能跨节点共享，节点间会不一致。Redis/Memcached 是独立服务，多应用可共享，有网络和序列化成本。本机起一个 Redis 进程仍是外部服务，不是 Caffeine 那种本地缓存。高并发常见是本地短 TTL 加分布式缓存，本地抗热点、Redis 抗穿透与共享，见 `cache-aside-steps`。MyBatis 二级缓存跨 SqlSession，语义和进程内 Caffeine 也不同。',
    why:'把本机 Redis 当成 Caffeine 那种本地缓存，会以为重启应用缓存就没了，其实 Redis 进程还在；多实例只放进程内缓存，又会各自一份。区分信号是进程内没有网络、不跨 JVM，Redis 即使用在本机也是独立服务。',
    example:'两台应用各自用 Caffeine 把 SKU 名缓存 30 秒。A 更新了名字，B 在这 30 秒内仍返回旧值。库存改放到 Redis 后，A 写入、B 立刻读到同一份。本机再起一个 Redis 进程，应用重启后键还在，说明它不是堆里的那份本地缓存。',
    task:'给“进程内”和“独立缓存服务”各举一个产品；写出多实例只用本地缓存时的一致性问题。',
    answer:'进程内举例是 Caffeine，独立缓存服务举例是 Redis。多实例只用本地缓存时，预测各 JVM 一份，一台更新后其它台在 TTL 内仍是旧值。本机 Redis 仍走自己的协议，重启应用不会把它一起清掉。MyBatis 一级缓存也只在当前会话。',
    keywords:'Caffeine Guava Redis 本地缓存 分布式缓存 MyBatis',
    points:['进程内缓存无网络、不跨节点','Redis/Memcached 是独立服务，可共享','本机 Redis 仍是远程协议，不是 Caffeine'],
    deep:[
      {title:'本机进程不等于进程内',body:'Caffeine、堆上的 Map 和应用同生共死，别的节点看不见。Redis 哪怕和数据库装在一台机器上，也是另一个进程里的共享数据。本地短 TTL 可以挡热点，共享的那份仍要单独失效。'},
      {title:'怎样自己验证',body:'起两个进程各放一份 Caffeine，在其中一个更新，另一个在 TTL 内应仍看到旧值。再改读 Redis，另一个进程应看到新值。重启应用后，Redis 里的键应还在。'},
    ],
    refs:[['Caffeine','https://github.com/ben-manes/caffeine'],['Redis','https://redis.io/docs/latest/develop/']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_18) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
