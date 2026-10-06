/* Batch 27: Kafka ISR lag metric, MyBatis lazy proxy, NIO vs one-thread-per-request. */
const COVERAGE_JAVA_27 = [
  {
    track:'java', group:'消息队列', id:'kafka-isr-lag-time-not-count',
    title:'踢出 ISR 看落后时间，不是数差了四千条',
    prompt:'为什么还把 replica.lag.max.messages=4000 当成现行 ISR 踢人条件？',
    core:'旧版本曾用条数差把慢 follower 踢出 ISR。这条配置早已去掉，现行看 replica.lag.time.max.ms：follower 超过该时间不发起 fetch，或落后超过可接受窗口，才离开 ISR。条数差会随流量抖动，高吞吐时正常副本也会短暂差几千条。acks=all 等的是 ISR，不是磁盘上每一个 replica，见 `kafka-producer-acks`。Kafka 4.x 默认 KRaft，不要把集群存活绑在 ZooKeeper 上，见 `kafka-kraft-not-zk`。min.insync.replicas 过低时 ISR 收缩会把耐久降下去。',
    why:'按四千条去调 ISR，现行 broker 配置里已经没有 replica.lag.max.messages。高峰时正常副本也会短暂差几千条，按条数踢人会把还在 fetch 的副本赶出 ISR，acks=all 反而更难凑齐。区分信号是 follower 多久没有发起 fetch，不是当前差了多少条。',
    example:'高峰每秒写入上万条，follower 落后 5000 条但仍在持续 fetch，不应离开 ISR。另一台超过 replica.lag.time.max.ms 没有 fetch，才离开 ISR，acks=all 不再等它。',
    task:'对照 broker 配置，写出现行 ISR 滞后条件；划掉 replica.lag.max.messages。',
    answer:'现行条件是 replica.lag.time.max.ms：超过这段时间不 fetch，或落后超过可接受窗口，才离开 ISR。划掉按 4000 条踢人。高峰差几千条但一直在 fetch 的副本留在 ISR。acks=all 等的是当时的 ISR，不是磁盘上每一个副本。',
    deep:[
      {title:'条数差会骗人',body:'吞吐一高，正常 follower 也会瞬间差几千条，随后就追上。用条数当健康标准，会在高峰把好副本踢出去。时间看的是它还在不在追。'},
      {title:'怎样自己验证',body:'在 broker 配置里搜索 replica.lag.max.messages，现行文档不应再把它当踢人条件。再看 replica.lag.time.max.ms。压测时对比“落后条数”和“最后一次 fetch”，只有停 fetch 的那台离开 ISR。'}
    ],
    keywords:'Kafka ISR replica.lag.time.max.ms KRaft',
    points:['现行踢出 ISR 看滞后时间不是条数阈值','条数差会随吞吐抖动','acks=all 等 ISR 不是全部 replica'],
    refs:[['replica.lag.time.max.ms','https://kafka.apache.org/documentation/#brokerconfigs_replica.lag.time.max.ms'],['Kafka：Replication','https://kafka.apache.org/documentation/#replication']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-lazy-javassist-not-cglib',
    title:'延迟加载默认不是 CGLIB，空关联才会再发 SQL',
    prompt:'为什么把 MyBatis 延迟加载背成“一定用 CGLIB 代理，一 get 就再查”？',
    core:'association / collection 才支持延迟加载，要打开 lazyLoadingEnabled。3.5 起默认 proxyFactory 是 JAVASSIST，CGLIB 是旧默认。访问尚未加载的属性才会发第二条 SQL，不是每个 getter 都查库。aggressiveLazyLoading 为 true 时，触碰任意属性会把延迟字段一起加载，现行默认是 false。#{} 预编译，${} 拼字符串，见 `mybatis-parameters`。RowBounds 大偏移会在内存里切，见 `mybatis-rowbounds-memory`。',
    why:'按“一定是 CGLIB”去查缺包，3.5 起默认代理工厂已经是 Javassist，依赖对不上。再把每个 getter 都当成会再查一次，会误判普通字段访问触发了关联 SQL。区分信号是有没有访问那条还没加载的 association 或 collection。',
    example:'user.getName() 在 aggressiveLazyLoading=false 时不打订单表。第一次 user.getOrders() 才发出关联 SELECT。aggressiveLazyLoading=true 时，读姓名也会把订单一起加载。',
    task:'对照 settings，写出默认代理工厂；说明何时才发关联查询。',
    answer:'settings 里默认 proxyFactory 是 JAVASSIST，不是 CGLIB。关联查询发生在访问尚未加载的 association 或 collection 时。aggressiveLazyLoading 默认 false，所以只读普通字段不会把延迟字段一起查出来。',
    deep:[
      {title:'不是每个 getter 都查库',body:'延迟加载只包 association 和 collection。主键和普通列已经在第一条 SQL 里。再查一次，是因为碰到了还没加载的关联。'},
      {title:'怎样自己验证',body:'打开 SQL 日志。先读普通字段，确认没有第二条查询。再调用关联的 getter，这时才应出现关联 SQL。把 aggressiveLazyLoading 改成 true 后重试，读普通字段也会打出关联 SQL。'}
    ],
    keywords:'MyBatis lazyLoading Javassist aggressiveLazyLoading',
    points:['延迟加载覆盖 association 和 collection','3.5 默认代理是 Javassist 不是 CGLIB','aggressiveLazyLoading 默认 false'],
    refs:[['MyBatis settings','https://mybatis.org/mybatis-3/configuration.html#settings'],['MyBatis：Result Maps','https://mybatis.org/mybatis-3/sqlmap-xml.html']]
  },
  {
    track:'java', group:'Netty', id:'nio-not-one-thread-per-request',
    title:'NIO 是一条线程盯多个通道，不是一个请求一条线程',
    prompt:'为什么把 NIO 说成“一个请求一个线程，只是先注册到多路复用器”？',
    core:'BIO 才是连接（或请求）占用一条阻塞线程。NIO 用 Selector 在少量线程上轮询一堆 Channel 的就绪事件，读就绪才拷数据，不是为每个请求再 new Thread。AIO/NIO.2 是完成后再回调，Java 服务端用得少。Netty 的 EventLoop 正是“一条线程跑多个连接的就绪事件”，见 `netty-event-loop`。TCP 仍是字节流，粘包要应用分帧，见 `tcp-stream-needs-framing`。',
    why:'把 NIO 理解成“每个请求仍占一条线程，只是先注册一下”，容量规划会按连接数去开线程。线程数和连接数一样大时，阻塞模型的成本还在，多路复用没有发生。区分信号是等待的是就绪事件，不是每个连接上的 read 调用卡住一条线程。',
    example:'一个接受连接的 EventLoop，加上少数 worker。每个 worker 用 Selector 盯一组 Channel。一万个连接仍然是这几条线程在等可读，读就绪才拷贝数据，不会为每个请求 new Thread。',
    task:'对照 Selector 文档，写出谁在等就绪事件；划掉 NIO 一请求一线程。',
    answer:'等就绪事件的是 Selector 上的少量线程，不是每个请求一条线程。划掉“NIO 也是一请求一线程”。BIO 才在连接上阻塞一条线程。Netty 的 EventLoop 复用这套模型。TCP 粘包仍要应用自己分帧，多路复用不负责切消息。',
    deep:[
      {title:'就绪才拷贝',body:'Channel 没数据时，线程不必停在这个连接上。Selector 报告可读之后，线程才把字节读走，然后继续看别的通道。'},
      {title:'怎样自己验证',body:'用 Netty 或一个 Selector 接住远超线程数的连接，看线程数是否仍是 EventLoop 的数量。对照 Selector 文档：select 返回的是就绪键，不是新线程。'}
    ],
    keywords:'NIO Selector Reactor EventLoop BIO',
    points:['BIO 阻塞模型才是连接占用线程','NIO Selector 一条线程可盯多个 Channel','Netty EventLoop 是 Reactor 不是一请求一线程'],
    refs:[['Selector','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/channels/Selector.html'],['Netty EventLoop','https://netty.io/wiki/new-and-noteworthy-in-4.0.html']]
  },
  {
    track:'java', group:'Java 基础', id:'chm-iterator-weakly-consistent',
    title:'ConcurrentHashMap 的迭代器不是整表拷贝的 fail-safe',
    prompt:'为什么把 java.util.concurrent 一律说成“迭代时拷贝一份，所以永远不抛 ConcurrentModificationException”？',
    core:'ArrayList 等 java.util 集合的 fail-fast 迭代器在结构修改时可能抛 ConcurrentModificationException。CopyOnWriteArrayList 才是快照。ConcurrentHashMap 的迭代器是弱一致：遍历时可能看到部分后来的更新，不保证快照，也不以 CME 当正确性信号。多线程结构修改不要用 HashMap/ArrayList 硬撑，见 `java-concurrent-map`。Vector/Hashtable 的同步粒度粗，不是现行首选。',
    why:'把 java.util.concurrent 都说成“迭代时拷贝一份”，会按整表复制去估 ConcurrentHashMap 的内存，也会以为遍历期间一定看不见新写入。真正拷贝的是 CopyOnWriteArrayList。区分信号是文档写的 weakly consistent，不是 snapshot。',
    example:'遍历 ConcurrentHashMap 时另一个线程 put 一个新键。这次循环可能看见它，也可能看不见，通常不抛 ConcurrentModificationException。同一时刻遍历 CopyOnWriteArrayList，看到的是开始时的那份快照，不含遍历期间的新元素。',
    task:'对照 ConcurrentHashMap 文档，写出迭代器语义；区分 CopyOnWrite 快照。',
    answer:'文档中 ConcurrentHashMap 的迭代器是弱一致：不保证快照，可能看到部分后续更新，也不靠 ConcurrentModificationException 保证正确。CopyOnWrite 才是遍历开始时的快照。ArrayList 这类 java.util 集合才是 fail-fast。',
    deep:[
      {title:'弱一致不是没并发',body:'弱一致表示遍历和更新可以同时进行，结果不保证是某一瞬间的整表。需要冻结视图时，自己复制或换用按快照遍历的集合。'},
      {title:'怎样自己验证',body:'一边遍历 ConcurrentHashMap 一边 put，看是否抛 ConcurrentModificationException，以及新键是否稳定出现。再对 CopyOnWriteArrayList 做同样的事，新元素不应出现在已经开始的那次遍历里。'}
    ],
    keywords:'ConcurrentHashMap weakly consistent fail-fast CopyOnWrite',
    points:['fail-fast 常见于 java.util 集合','CHM 迭代器弱一致，不是快照拷贝','CopyOnWrite 才按快照遍历'],
    refs:[['ConcurrentHashMap','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html'],['CopyOnWriteArrayList','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/CopyOnWriteArrayList.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_27) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
