/* Batch 14: ten short Java interview PDFs, claim-level. */
const COVERAGE_JAVA_14 = [
  {
    track:'java', group:'Java 基础', id:'java-calendar-not-singleton',
    title:'Calendar.getInstance 每次新建，不是单例',
    prompt:'为什么把 Calendar 和 Runtime 一起背成 JDK 里的单例例子会错？',
    core:'真正接近“整个 JVM 一份”的是 Runtime.getRuntime()。Calendar.getInstance() 按默认时区和区域设置**每次构造新日历**，里面保存着可变的当前时刻字段；它既不是单例，也不建议在多线程里共用同一实例。资料把单例模式写成“用于 Runtime、Calendar 和其他一些类”，把可变、按调用新建的工厂方法和进程级单例混在一起。Boolean.valueOf 也不是工厂模式的典型产品替换，而是缓存装箱。设计模式题可以举 Runtime、枚举单例、IO 装饰器，不要把 Calendar 塞进单例名单。',
    why:'把 Calendar 和 Runtime 一起背成 JDK 单例，会暴露没有读过 getInstance 的返回契约，并发下还会共享同一本可变日历。区分信号是每次调用都返回新实例，真正的单例例子是 Runtime.getRuntime。',
    example:'两个线程各自 Calendar.getInstance()，互不影响。若把同一个 Calendar 放进静态字段并并发 setTime，字段会互相覆盖。需要不可变时间点用 Instant。',
    task:'打开 Calendar.getInstance 的 JavaDoc，写下它返回的是新实例；对照 Runtime.getRuntime 说明真正的单例例子。',
    answer:'打开 Calendar.getInstance 的说明，它返回的是新建的可变日历，不是容器里唯一的那份，所以不能当单例例子。Runtime.getRuntime 才是每次拿回同一个实例。两处对照之后，单例例子改用 Runtime 或枚举，共享日历的写法划掉。',
    keywords:'Calendar getInstance Runtime 单例 工厂',
    points:['Calendar.getInstance 每次返回新的可变日历','Runtime.getRuntime 才接近进程内单例','不要把装箱缓存或日历工厂写成单例模式'],
    deep:[
      {title:'可变日历不能共享',body:'Calendar 的字段可以被 set 改掉。若误当成单例交给多个线程，一次设置会改掉别人正在读的日期。每次需要日历就新建，或改用不可变的时间类型。不要把可变对象放进单例。'},
      {title:'怎样自己验证',body:'连续调用两次 Calendar.getInstance，用 == 比较，应是两个对象。再对 Runtime.getRuntime 做同样比较，两次应是同一个。共享日历再 set 一次，看另一个引用是否被改掉。'},
    ],
    refs:[['Calendar.getInstance','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Calendar.html#getInstance()'],['Runtime.getRuntime','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Runtime.html#getRuntime()']]
  },
  {
    track:'java', group:'数据库', id:'mysql-unique-change-buffer',
    title:'唯一索引写入通常用不上 change buffer',
    prompt:'为什么“唯一索引一定比普通索引快”不成立，尤其是在更新路径上？',
    core:'查询侧，唯一索引在找到一条后可以停止，普通二级索引还要看下一条是否仍匹配；这点差异通常可忽略。写入侧差别更大：InnoDB 的 change buffer 可以把对**非唯一二级索引**的更新先记在缓冲里，减少立刻读页。唯一索引必须当场判断有没有冲突，往往要把数据页读进内存，因此写多读少时普通二级索引可能更快。这不是“唯一索引更慢”的定律，而是 change buffer 与唯一性检查的机制差。Query Cache 在 8.0 已删除，见既有 `mysql-query-cache-removal`。',
    why:'把唯一索引当成加速开关，写入密集的表会选错索引，也会忽略 change buffer 只帮得上普通二级索引。区分信号是唯一性检查必须先读页，插不进“先缓冲再合并”。写入越密，这个差别越大。',
    example:'日志表按 user_id 建普通二级索引，批量插入可以先进 change buffer，稍后再合并。email 必须唯一时，每次插入都要到索引页上确认没有重复，不能和普通索引一样丢进缓冲就返回。所以唯一索引不一定更快。',
    task:'对照 8.4 手册的 change buffer 说明，划掉“唯一索引一定更快”，写出唯一性检查为什么挡掉合并缓冲。',
    answer:'划掉“唯一索引一定更快”。查询路径上唯一和普通都可能走索引，快慢要看选择性和回表。写入时唯一索引必须做唯一性检查，通常用不上 change buffer；普通二级索引在缓冲池没有那一页时才可能先记下来再合并。对照 8.4 手册的 change buffer 说明，适用条件就在这里。',
    keywords:'InnoDB unique index change buffer 二级索引',
    points:['唯一索引查询少探下一条，收益通常很小','唯一性检查会挡住多数 change buffer 写入合并','写多读少时普通二级索引可能更合适'],
    deep:[
      {title:'检查发生在插入当时',body:'唯一约束要立刻知道有没有重复，所以不能把这次修改先藏进缓冲、等以后再合并。普通二级索引没有这个当场检查，才有机会少做随机读。插入当时就要检查，这才叫唯一。不能延后。'},
      {title:'怎样自己验证',body:'对照 8.4 手册里 change buffer 对唯一索引的说明，把“唯一索引一定更快”划掉。再对比一张普通二级索引的日志表和一张 email 唯一的用户表，看写入时谁还要先探页。'},
    ],
    refs:[['InnoDB change buffer','https://dev.mysql.com/doc/refman/8.4/en/innodb-change-buffer.html'],['InnoDB unique indexes','https://dev.mysql.com/doc/refman/8.4/en/innodb-indexes.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-mvc-restcontroller',
    title:'@RestController 可以替代只返回 JSON 的 @Controller',
    prompt:'为什么说“表现层只能用 @Controller、不能用别的注解代替”不成立？',
    core:'@RestController 等价于 @Controller 加上类级别 @ResponseBody：方法返回值直接写成 HTTP 体，不再走视图名解析。做 JSON API 时它就是推荐写法，不是非法替代。默认控制器仍是单例 bean，可变实例字段会在并发请求间共享；解决办法是把请求数据放在方法参数或请求作用域对象里，不是“控制器里不能有任何字段”——注入的服务字段正是常规做法。DispatcherServlet → HandlerMapping → HandlerAdapter 的骨架见既有 `spring-mvc-dispatch`。资料里的 @Conntroller 是拼写错误。',
    why:'背“表现层只能用 @Controller、别的注解不能代替”，会在只返回 JSON 的接口上拒绝 RestController，也会把单例理解成不能注入协作对象。区分信号是它组合了 Controller 和 ResponseBody。',
    example:'订单查询用 @RestController，方法返回 OrderResponse，响应体就是这份 JSON。当前用户 id 放在方法参数里，从这次请求取。不要写成控制器的实例字段留给下一次请求，因为默认单例会被并发请求共用。',
    task:'对照 Spring Web MVC 文档写出 RestController 的组合关系，并列出一处可以安全保留的注入字段和一处不能放的请求状态。',
    answer:'对照 Web MVC 文档，@RestController 是 @Controller 加 @ResponseBody，专门返回 JSON 这类响应体，可以代替“控制器方法再逐个加 ResponseBody”。控制器默认单例，请求状态不能放实例字段；无状态的协作对象可以注入并安全保留。只返回页面的控制器仍可以用 @Controller。',
    keywords:'RestController Controller ResponseBody Spring MVC 单例',
    points:['RestController 是 Controller 加 ResponseBody','默认单例只禁止可变请求状态，不禁止注入服务','DispatcherServlet 调度不依赖“只能用 Controller”这句口诀'],
    deep:[
      {title:'单例禁的是请求状态',body:'默认单例意味着所有请求共用这一个控制器对象。注入的服务没有请求字段，可以共用。把当前用户、购物车放进字段，下一次请求会读到上一次的值。字段里的用户会串到下一次请求。'},
      {title:'怎样自己验证',body:'对照文档写出 RestController 的组合关系。列一个可以注入的服务字段，再列一个不能放的请求字段。连续两次请求若共用字段里的用户 id，就说明状态放错了地方。'},
    ],
    refs:[['@RestController','https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html'],['Controller stereotype','https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/stereotype/Controller.html']]
  },
  {
    track:'java', group:'数据库', id:'mongo-multi-doc-txn',
    title:'MongoDB 4.0 起有多文档事务，不是“没有事务”',
    prompt:'为什么把 MongoDB 说成“没有锁、没有带回滚的事务、像 MyISAM 自动提交”不能当现行答案？',
    core:'MongoDB 4.0 起在副本集上提供多文档 ACID 事务，4.2 起可跨分片。单文档更新本来就是原子的；需要一次改多个文档并回滚时，用 session 上的 startTransaction / commitTransaction。资料仍停留在“为了轻量而精简事务、类比 MyISAM 自动提交”，那是 4.0 之前的叙事。现行限制仍然存在：事务有运行时间与大小约束，长事务会拖副本；不是“可以当关系数据库随便开跨表事务”。32 位构建、slaveOk、getLastError 旧安全模式也属于过时运维口吻。',
    why:'把 MongoDB 说成没有事务、像自动提交，选型时会以为跨文档无法一起成功，或反过来把长事务开在每次加一上。区分信号是副本集上多文档事务能一起提交或一起取消。次数多了，事务本身变成热点。',
    example:'下单时库存文档和订单文档必须同成同败：在副本集上开多文档事务，任一步失败就中止。热点计数仍用单文档的递增，本来就是原子的，不必为每次加一开多文档事务。旧句“没有事务、像 MyISAM”划掉。版本起点以手册为准，不要再写没有事务。',
    task:'打开现行 Transactions 手册，写下副本集与分片事务的版本起点，划掉“没有事务/像 MyISAM”。',
    answer:'打开现行事务手册：副本集多文档事务从 4.0 起，分片上的事务起点以手册写的版本为准，把“没有事务、像 MyISAM”划掉。单文档写入本来原子。跨文档才需要显式事务，长事务仍有时间和锁的代价，不是默认包住所有写入。热点计数保持单文档原子更新。',
    keywords:'MongoDB ACID 多文档事务 4.0 replica set',
    points:['4.0 副本集、4.2 分片支持多文档事务','单文档更新本身就是原子的','事务有时长和体积限制，不是无限关系数据库替代'],
    deep:[
      {title:'单文档不必升格',body:'一次只改一个文档时，写入本身原子，失败不会留下半个文档。多文档事务解决的是库存和订单要同成同败。把每次加一都放进事务，只会拉长占用。能一条命令做完就不要升格成多文档事务。'},
      {title:'怎样自己验证',body:'打开现行 Transactions 手册，写下副本集与分片事务的版本起点，划掉“没有事务”。再在副本集上让两个文档同成同败，并对比一次单文档递增不需要这层事务。'},
    ],
    refs:[['MongoDB Transactions','https://www.mongodb.com/docs/manual/core/transactions/'],['Atomicity of document writes','https://www.mongodb.com/docs/manual/core/write-operations-atomicity/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'zk-linearizable-not-realtime',
    title:'ZooKeeper 的 timeliness 不是最终一致性',
    prompt:'为什么把 ZooKeeper 保证写成“实时性（最终一致性）”，并把 zkclient 写成自带客户端会错？',
    core:'ZooKeeper 对更新提供线性一致（经 ZAB 过半提交）。官方保证列表是顺序一致性、原子性、单一系统映像、可靠性，以及 **timeliness**：客户端视图在有界时间内跟上，否则会话会断、去连更新的成员。这不是 BASE 里的最终一致性。任意 follower 都可以处理读，因此普通读可能略旧；要线性一致读需要 sync 或连 leader。写请求也不是“同时发给所有机器再投票”，而是交给 leader 提议。官方 Java 客户端在 Apache ZooKeeper 工件里；zkclient 是第三方封装，Curator 才是 Apache 推荐的高层库。每个 znode 约 1MB 上限（jute.maxbuffer）方向成立。',
    why:'把 ZooKeeper 的 timeliness 写成最终一致性，会和“偏 CP”的结论对不上，也会把 zkclient 当成自带客户端。区分信号是写走 leader 且线性一致，未 sync 的读仍可能看到旧值。',
    example:'配置节点变更后，没有先 sync 的读可能仍是旧值，这是有界落后，不是最终一致性那句话。选举和写经过 leader。客户端用官方 API 或 Curator，不要把 zkclient 写成发行版自带。',
    task:'对照 ZooKeeper Overview 与 Programmer 保证一节，划掉“实时性（最终一致性）”和“自带 zkclient”。',
    answer:'对照 Overview 和 Programmer 保证：写是线性一致的，读可能暂时落后，timeliness 是这种有界的落后，不是最终一致性。划掉“实时性（最终一致性）”。客户端划掉“自带 zkclient”，改成官方 API 或 Curator。不要用最终一致去解释选举和写。',
    keywords:'ZooKeeper ZAB 线性一致 timeliness Curator zkclient',
    points:['更新经 ZAB 线性提交，不是最终一致','普通读可走任意节点，线性读要 sync','zkclient 不是官方自带，Curator 是 Apache 高层库'],
    deep:[
      {title:'落后不等于随便收敛',body:'读可能还没跟上最新的写，但保证里的 timeliness 不是“迟早一致、中间不限”。要读到最新，按文档先 sync 再读，而不是把 ZK 说成最终一致系统。要最新值就先 sync。'},
      {title:'怎样自己验证',body:'对照 ZooKeeper Overview 与保证一节，划掉“实时性（最终一致性）”和“自带 zkclient”。写一次配置再立刻读，看未 sync 时是否仍可能是旧值，并确认客户端是官方 API 或 Curator。'},
    ],
    refs:[['ZooKeeper Overview','https://zookeeper.apache.org/doc/current/zookeeperOver.html'],['ZooKeeper guarantees','https://zookeeper.apache.org/doc/r3.9.3/zookeeperProgrammers.html#ch_zkGuarantees']]
  },
  {
    track:'java', group:'工程实践', id:'spring-boot-devtools-restarts',
    title:'DevTools 是快速重启，不是进程永不重启',
    prompt:'为什么“没有 Web 服务器、DevTools 改文件不用重启”两句都不能当准确答案？',
    core:'spring-boot-starter-web 默认**内嵌** Tomcat（或你换成的 Jetty/Undertow）。你不必再单独安装、单独启动一个外部容器，但 JVM 里仍然有 HTTP 服务器在听端口。DevTools 在类路径变化时会做**快速重启**：用重启类加载器丢掉应用类、保留 base 类加载器里的第三方库，比冷启动快，但嵌入式容器还是会停再起。资料把优点写成“没有单独的 Web 服务器需要、不再启动 Tomcat”，又把标题写成“无需重新启动服务器”，正文却承认嵌入式 Tomcat 会 restart——自相矛盾。打包成 fat jar 在生产默认关闭 DevTools。LiveReload 只刷新浏览器，不能代替 JVM 重启。',
    why:'把 DevTools 理解成改文件不用重启、生产也没有 Web 服务器，会在改一行 Java 时期待热替换整个上下文，也会在生产镜像里留下这套依赖。区分信号是日志里的 restart，以及默认内嵌容器的名字。',
    example:'本地加上 spring-boot-devtools，改 Controller 后日志出现 restart，这是重新加载，不是进程永不重启。生产用 java -jar，不要把 DevTools 打进运行镜像。默认内嵌的是 Tomcat，不是“没有 Web 服务器”。',
    task:'对照 DevTools 文档区分 restart 与 LiveReload；对照 Web 文档写出默认内嵌容器的名字。',
    answer:'对照 DevTools 文档：restart 是更快地重启应用上下文，LiveReload 才是浏览器刷新，两者不是“改完不用重启”。对照 Web 文档，默认内嵌容器是 Tomcat，所以“没有 Web 服务器”不成立。生产默认不要带上 DevTools。',
    keywords:'Spring Boot DevTools restart 内嵌 Tomcat LiveReload',
    points:['starter-web 默认内嵌 Tomcat，不是没有 HTTP 服务器','DevTools 用双类加载器做快速重启','生产打包默认禁用 DevTools'],
    deep:[
      {title:'重启和刷新不是一件事',body:'改 Java 类触发的是 restart，类加载器换掉后上下文重新起来。LiveReload 只让浏览器再请求页面。把两者都叫成热替换，会漏掉重启窗口里请求失败。'},
      {title:'怎样自己验证',body:'对照 DevTools 文档分开写 restart 和 LiveReload。本地改一个 Controller，看日志是否出现 restart。再对照 Web 文档写出默认内嵌容器的名字，生产镜像里确认没有 DevTools。'},
    ],
    refs:[['Spring Boot DevTools','https://docs.spring.io/spring-boot/reference/using/devtools.html'],['Spring Boot embedded servlet containers','https://docs.spring.io/spring-boot/reference/web/servlet.html']]
  },
  {
    track:'java', group:'消息队列', id:'rabbit-queue-not-unbounded',
    title:'RabbitMQ 队列有长度和磁盘上限，幂等不能靠内部 inner-msg-id',
    prompt:'为什么“队列只受内存限制、Broker 用 inner-msg-id 做生产幂等”不能当答案？',
    core:'队列可以设置 x-max-length / x-max-length-bytes，溢出策略包括丢弃队头或拒绝新消息；还有磁盘低水位告警、惰性队列与分页。把容量说成“可以认为无限制、只取决于内存”会漏掉这些硬开关。发布确认是信道在消息**路由到匹配队列**（持久化消息还要按策略落盘）之后回 ack，不是业务幂等。RabbitMQ 没有名为 inner-msg-id、保证生产者去重的协议字段；生产者重试要靠业务唯一键或幂等消费者。消费侧用 delivery tag ack，见既有 `rabbit-ack`。镜像队列属于旧 HA 叙述，现行优先 quorum queue。',
    why:'按“队列只受内存限制、Broker 用内部 id 做幂等”去设计支付通知，积压会打满磁盘，重试还会重复入账。区分信号是队列可以设最大长度，确认的是路由而不是业务只处理一次。内存没满也可能因为磁盘写不进去。',
    example:'订单队列设置 max-length，溢出时拒绝发布，生产者能感到背压，而不是无限堆在内存或磁盘上。支付回调把支付单号写成数据库唯一键。publisher confirm 只说明已路由、持久化消息被接受，不说明消费者只会处理一次。',
    task:'对照 maxlength 文档列出两种溢出策略；划掉 inner-msg-id；说明 publisher confirm 确认的是路由而不是业务只处理一次。',
    answer:'对照 maxlength 文档，溢出可以拒绝发布，也可以丢掉队列头，两种都不是“只受内存限制”。inner-msg-id 划掉，幂等键用业务单号。publisher confirm 确认的是消息已被路由并按持久化要求接受，不是消费端只处理一次。磁盘告警仍可能阻塞发布。',
    keywords:'RabbitMQ max-length publisher confirm 幂等 quorum',
    points:['队列可配置最大条数和字节，不是只受内存约束','publisher confirm 确认路由/落盘，不是业务幂等','Broker 没有 inner-msg-id 这种生产去重原语'],
    deep:[
      {title:'确认停在 Broker',body:'发布确认回到生产者，表示 Broker 收下了这条消息。消费者崩溃后重投，确认并不会帮你去掉第二次入账。去重要写在业务存储的唯一键上。业务只处理一次要自己保证。'},
      {title:'怎样自己验证',body:'对照 maxlength 文档列出两种溢出策略，划掉 inner-msg-id。再读 publisher confirm 的说明，确认它不保证业务只处理一次。把支付单号做成数据库唯一键后，重试应撞上同一行。'},
    ],
    refs:[['Queue length limit','https://www.rabbitmq.com/docs/maxlength'],['Publisher confirms','https://www.rabbitmq.com/docs/confirms']]
  },
  {
    track:'java', group:'Java 基础', id:'java-enumeration-not-faster',
    title:'Enumeration 并不比 Iterator 快一倍',
    prompt:'为什么“Enumeration 速度是 Iterator 的两倍、也更省内存”不能当集合框架答案？',
    core:'Iterator 是集合框架的遍历协议，允许 fail-fast 检测并发结构修改，并提供 remove。Enumeration 是遗留接口，主要出现在 Vector、Hashtable、Properties。官方文档从未给出“快一倍、更省内存”的保证；Hashtable/Vector 的同步反而可能更慢。资料把最初集合写成 HashTable（正确类名 Hashtable），把双端队列接口写成 Dequeue（应为 Deque）。需要并发 Map 时用 ConcurrentHashMap，不要推荐 Hashtable。Iterator 也不会“阻止其它线程修改集合”——fail-fast 只是尽量抛 ConcurrentModificationException，不是锁。',
    why:'背“Enumeration 比 Iterator 快一倍、也更省内存”，改造时会舍不得丢掉遗留接口，也会把 fail-fast 理解成互斥锁。区分信号是 JavaDoc 没有这句速度承诺，fail-fast 只是检测并发修改。',
    example:'新代码用 List.iterator() 或 for-each。读 Properties 仍可能碰到 elements()，不要据此比较性能。多线程共享 Map 用 ConcurrentHashMap。',
    task:'对照 Iterator 与 Enumeration 的 JavaDoc，划掉两倍速度；改正 Hashtable/Deque 拼写；写一句 fail-fast 不是锁。',
    answer:'对照 Iterator 和 Enumeration 的说明，划掉“快一倍、更省内存”，没有官方的速度倍数。遍历用 Iterator。Enumeration 是遗留 API。Hashtable 的拼写和“用它做并发”都要改正，现行并发不要靠它。fail-fast 会在迭代中发现结构被改，抛出异常，它不是锁。',
    keywords:'Iterator Enumeration fail-fast Hashtable Deque ConcurrentHashMap',
    points:['没有官方依据说 Enumeration 快一倍','Iterator 的 fail-fast 不是互斥锁','Hashtable/Vector 是遗留同步容器，新代码用并发包'],
    deep:[
      {title:'fail-fast 不是互斥',body:'迭代器发现集合在迭代期间被改了，就尽快失败。这不能阻止两个线程同时改集合，只是让你看见已经坏了。要互斥仍得用并发集合或加锁。两倍速度的说法不在文档里。文档里没有倍数。'},
      {title:'怎样自己验证',body:'对照两份 JavaDoc，划掉两倍速度。在迭代中删除元素，看 fail-fast 抛出的是并发修改，而不是等待锁。再把资料里的 Hashtable、Deque 拼写改正，确认没有“更快”的句子。'},
    ],
    refs:[['Iterator','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Iterator.html'],['Enumeration','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Enumeration.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_14) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
