/* Batch 27: Kafka ISR lag time, MyBatis lazy proxy, NIO threads, CHM iterators. */
const COVERAGE_JAVA_27 = [
  {
    track:'java', group:'消息队列', id:'kafka-isr-lag-time-not-count',
    title:'踢出 ISR 看落后时间，不是数差了四千条',
    prompt:'为什么还把 replica.lag.max.messages=4000 当成现行 ISR 踢人条件？',
    core:'上一课说过，acks=all 等的是当时的 ISR，不是机房里每一台副本。副本怎样被划出这个集合，现行看的是时间，不是条数。replica.lag.max.messages 已经从 broker 配置里去掉，不能再按差 4000 条来踢。现在的配置是 replica.lag.time.max.ms，默认 30000 毫秒。官方条件有两句：follower 超过这段时间没有发起 fetch，或者超过这段时间还没有消费到领导者的日志末端（log end offset），领导者就把它移出 ISR。所以“还在 fetch”本身不够。高峰时健康副本也会瞬间落后几千条，只要在这 30 秒里追上末端，就留在 ISR；旧的 4000 条规则会在这种高峰误踢。反过来，一直在拉、但超过 30 秒仍没到达末端，同样离开。离开之后，acks=all 不再等它。',
    why:'按四千条去看监控，高峰会把还追得上的副本赶出 ISR，acks=all 更难凑齐。只盯着“有没有 fetch”也会漏掉另一种落后：请求还在发，日志末端却一直没追上，30 秒一到照样被移出。',
    example:'高峰里 follower 落后 5000 条，两秒后追上领导者的日志末端，ISR 里还有它。若按 4000 条，这台会被踢。另一台每隔一会儿就 fetch 一次，但超过 30 秒仍没消费到末端，领导者把它移出 ISR，acks=all 不再等它。第三台超过 30 秒根本没有 fetch，同样离开。',
    task:'对照 broker 配置，写出现行 ISR 滞后条件；划掉 replica.lag.max.messages。',
    answer:'现行条件是 replica.lag.time.max.ms，默认 30000 毫秒。超过这段时间没有 fetch，或者还没有消费到领导者的 log end offset，就离开 ISR。划掉 replica.lag.max.messages，也不要按 4000 条踢人。短时间差几千条、又在时限内追上末端的副本留在 ISR。acks=all 等的是踢人之后还留在 ISR 里的副本。',
    deep:[
      {title:'条数会抖，时间看的是有没有追上末端',body:'吞吐一高，健康副本的落后条数会瞬间到几千，然后又回到末端。用固定条数当健康标准，高峰就会误踢。时间窗口量的是它有没有在默认 30 秒内到达领导者当时的日志末端。窗口内追上就留下；窗口用完仍在末端之后，fetch 次数不等于还在 ISR 里。'},
      {title:'怎样自己验证',body:'打开现行 broker 配置，应能看到 replica.lag.time.max.ms，默认 30000，不应再把 replica.lag.max.messages 当踢人条件。有测试集群时，kafka-topics 的 describe 能看到 Isr。把一台 follower 停几秒再恢复并让它追上，它应留在或回到 Isr。停超过 30 秒，它应从 Isr 消失。不要用当前落后条数代替这次计时。'}
    ],
    keywords:'Kafka ISR replica.lag.time.max.ms KRaft',
    points:['现行踢出 ISR 看滞后时间不是条数阈值','条数差会随吞吐抖动','acks=all 等 ISR 不是全部 replica'],
    refs:[['replica.lag.time.max.ms','https://kafka.apache.org/documentation/#brokerconfigs_replica.lag.time.max.ms'],['Kafka：Replication','https://kafka.apache.org/documentation/#replication']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-lazy-javassist-not-cglib',
    title:'延迟加载默认不是 CGLIB，空关联才会再发 SQL',
    prompt:'为什么把 MyBatis 延迟加载背成“一定用 CGLIB 代理，一 get 就再查”？',
    core:'延迟加载只包 association 和 collection，普通列在第一条 SQL 里已经有了。总开关 lazyLoadingEnabled 默认是 false，不打开时关联会跟着主查询一起加载。也可以只在某一个 association 上写 fetchType="lazy"，这一条不受全局关闭的影响。代理工厂默认是 JAVASSIST，3.3 起就是这个默认；CGLIB 仍能写进配置，但从 3.5.10 起标记为过时。不要按缺 CGLIB 包去查现行项目。aggressiveLazyLoading 默认 false（3.4.1 及更早默认 true）。false 时，读姓名这种普通属性不会把订单查出来，第一次调用还没加载的 getOrders() 才会发第二条 SQL。有一组方法例外：lazyLoadTriggerMethods 默认包含 equals、hashCode、toString、clone。日志里打印对象、或把对象放进 HashSet，都会调用到它们，从而把延迟属性一起加载。aggressiveLazyLoading 设为 true 时，任意方法调用都会加载全部延迟属性。',
    why:'按 CGLIB 去对依赖，3.3 以后的默认工厂对不上，缺包信息会找错。再把每个 getter 都当成一次查询，看到 getName 没有 SQL 就以为延迟加载坏了；真正把第二条 SQL 打出来的，常常是一行 toString 日志，而不是业务上的 getOrders。',
    example:'lazyLoadingEnabled 打开，aggressiveLazyLoading 保持 false。user.getName() 只有第一条用户 SQL。接着 log 打印 user，因为 toString 在默认触发方法里，订单 SQL 出现了。若去掉这种打印、只调用 getOrders()，订单 SQL 应出现在这次调用上。把 aggressiveLazyLoading 改成 true 后，只读姓名也会打出订单 SQL。',
    task:'对照 settings，写出默认代理工厂；说明何时才发关联查询。',
    answer:'默认 proxyFactory 是 JAVASSIST，不是 CGLIB。关联 SQL 出现在延迟加载已经打开、并且访问到尚未加载的 association 或 collection 时。aggressiveLazyLoading 默认 false，所以普通 getter 不会把延迟字段一起查出来。equals、hashCode、toString、clone 默认仍会触发加载。全局开关默认是关的，不打开或没写 fetchType="lazy" 时，根本不会有这次按需查询。',
    deep:[
      {title:'第二条 SQL 要同时满足开关和触发点',body:'全局关闭且没有 fetchType="lazy" 时，关联在主查询里就已经加载，不存在“稍后那条 SQL”。打开之后，普通属性按需加载，触发方法列表里的调用会一次加载全部延迟属性。排查时先看 settings 里这两个开关和 lazyLoadTriggerMethods，再看是哪一行 Java 碰到了关联。'},
      {title:'怎样自己验证',body:'打开 SQL 日志。lazyLoadingEnabled 设为 true，aggressiveLazyLoading 保持 false。先读普通字段，不应出现关联 SQL。调用 toString 或把对象放进 HashSet，应出现关联 SQL。换一个没被打印的对象，只调用关联 getter，SQL 应出现在这次调用上。再把 aggressiveLazyLoading 改成 true，只读普通字段也应打出关联 SQL。'}
    ],
    keywords:'MyBatis lazyLoading Javassist aggressiveLazyLoading',
    points:['延迟加载覆盖 association 和 collection','默认代理是 Javassist，CGLIB 已标记过时','aggressiveLazyLoading 默认 false，toString 等仍会触发加载'],
    refs:[['MyBatis settings','https://mybatis.org/mybatis-3/configuration.html#settings'],['MyBatis：Result Maps','https://mybatis.org/mybatis-3/sqlmap-xml.html']]
  },
  {
    track:'java', group:'Netty', id:'nio-not-one-thread-per-request',
    title:'NIO 是一条线程盯多个通道，不是一个请求一条线程',
    prompt:'为什么把 NIO 说成“一个请求一个线程，只是先注册到多路复用器”？',
    core:'EventLoop 那一课里，少量线程轮值很多连接。这一课区分两种等法。BIO 在某个连接上调用 accept 或 read 时，这条线程就停在这个调用里，连接上没数据它也不会去看别的连接，于是容量往往按连接数去开线程。NIO 把 Channel 注册到 Selector 上，关心的是“可读”这种就绪事件。线程调用一次 select，同时等着已注册的许多通道；返回的是就绪的 SelectionKey，不是一条新线程。没有数据的连接不会占住这次等待。读就绪之后，同一条线程才把字节拷走，然后继续 select。Netty 的 EventLoop 就是一条线程在循环里做这件事。线程数是你创建的那几条，不是当前连接数。完成后再回调的 NIO.2 是另一套模型，Java 服务端很少用它来替代这个 Selector。',
    why:'把“先注册到 Selector”理解成每个请求仍占一条线程，容量规划会按连接数去加线程。线程数和连接数一样大时，阻塞模型的成本还在，多路复用没有发生。空闲连接很多、跑事件的线程仍然只有那几条，才说明等待的是就绪事件。',
    example:'一个接受连接的 EventLoop，加上少数 worker。用循环建立一千个连接，连上之后不发送数据。这一千个 Channel 都注册在这几条线程的 Selector 上。线程停在 select，而不是停在某一条连接的 read。其中一条连接有数据时，select 返回它的键，这条线程把字节读走，其余连接仍由同一次循环照看。',
    task:'对照 Selector 文档，写出谁在等就绪事件；划掉 NIO 一请求一线程。',
    answer:'等就绪事件的是调用 Selector.select 的那几条线程。select 返回就绪的 SelectionKey，不为每个请求 new Thread。划掉“NIO 也是一请求一线程”。BIO 才把一条线程阻塞在某个连接的 read 上。Netty 的 EventLoop 复用的是前面这种循环，线程数不随连接数增长。',
    deep:[
      {title:'注册不是再开一条线程',body:'Channel.register 只是把通道和它关心的操作交给已有的 Selector。之后阻塞的是那一次 select，它同时覆盖已注册的通道。就绪之后的 read 才占用线程一小段时间，读完就回到 select。若在这条线程里睡眠或同步查库，同一轮上的其他连接都会等，那是 EventLoop 那一课的边界。'},
      {title:'怎样自己验证',body:'用 Netty 或一段自己注册 Selector 的服务，循环接上一批空闲连接，数量远大于线程数。jcmd 的 Thread.print 里，停在 select 的线程应仍是 EventLoop 或你创建的那几条，不应接近连接数。作为对照，一连接一线程的 BIO 在同样连接数下，会看到接近连接数的线程停在 read。'}
    ],
    keywords:'NIO Selector Reactor EventLoop BIO',
    points:['BIO 阻塞模型才是连接占用线程','NIO Selector 一条线程可盯多个 Channel','Netty EventLoop 是 Reactor 不是一请求一线程'],
    refs:[['Selector','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/channels/Selector.html'],['Netty EventLoop','https://netty.io/wiki/new-and-noteworthy-in-4.0.html']]
  },
  {
    track:'java', group:'Java 基础', id:'chm-iterator-weakly-consistent',
    title:'ConcurrentHashMap 的迭代器不是整表拷贝的 fail-safe',
    prompt:'为什么把 java.util.concurrent 一律说成“迭代时拷贝一份，所以永远不抛 ConcurrentModificationException”？',
    core:'三种迭代不要合成一句。ArrayList 这类 java.util 集合的迭代器是 fail-fast：同一个线程在遍历时改了结构，经常抛 ConcurrentModificationException。这是用来暴露误用的检测，不是跨线程的同步手段，别的线程并发修改时也不保证一定抛。CopyOnWriteArrayList 才在每次写入时复制底层数组。它的迭代器拿着创建那一刻的数组，所以一定看不到遍历开始之后的 add，也不会抛 ConcurrentModificationException。ConcurrentHashMap 的迭代器是弱一致，文档的意思是：不抛 ConcurrentModificationException，会遍历迭代器创建时已经存在的元素，之后的更新可能看得到，但不保证看得到。它不会为了这次遍历去复制整张表。按“迭代就拷贝一份”去估内存，估到的是 CopyOnWrite 的写入代价，不是 ConcurrentHashMap。',
    why:'把并发集合都说成遍历时复制整表，会按 map 的大小再留一份内存，也会以为遍历期间一定看不见新 put 的键。真正在写入时复制的是 CopyOnWriteArrayList。ConcurrentHashMap 上新键时有时无，才和文档里的 weakly consistent 对得上。',
    example:'ConcurrentHashMap 里先放键 1，开始迭代后再 put 键 2。这次循环不抛 ConcurrentModificationException，键 2 可能出现，也可能不出现。CopyOnWriteArrayList 先放 1，拿到迭代器后再 add 2，这次循环只有 1。ArrayList 在同一个线程里先拿到迭代器再 add，通常抛 ConcurrentModificationException。',
    task:'对照 ConcurrentHashMap 文档，写出迭代器语义；区分 CopyOnWrite 快照。',
    answer:'ConcurrentHashMap 的迭代器是弱一致：不抛 ConcurrentModificationException，不保证是一份冻结快照，可能看到迭代开始之后的部分更新。CopyOnWriteArrayList 在写入时复制数组，迭代器看到的是开始时那一份，不含后来的 add。ArrayList 的 fail-fast 是同一个线程在遍历中改结构时常用的检测，不是整张表的并发快照。',
    deep:[
      {title:'复制发生在写入，不是发生在遍历 ConcurrentHashMap',body:'CopyOnWrite 的名字指每次 add 或 set 都换一份新数组，迭代器一直指着旧的那份，所以内存峰值跟在写入后面。ConcurrentHashMap 的迭代器和更新一起进行，不为遍历再分配一张同等大小的表。需要“开始这一瞬之后谁也不能改我看见的内容”时，自己复制一份，或改用按快照迭代的集合。'},
      {title:'怎样自己验证',body:'ArrayList 在同一个线程里拿到迭代器再 add，应抛 ConcurrentModificationException。ConcurrentHashMap 先放键 1，迭代开始后 put 键 2，不应抛这个异常，并且键 2 不保证出现。CopyOnWriteArrayList 在拿到迭代器之后 add 2，这次循环应只有原来的元素。三次结果对不上时，不要把三种集合记成同一句“并发就拷贝”。'}
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
