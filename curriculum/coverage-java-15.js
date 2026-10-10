/* Batch 15: ten short Java PDFs (Alibaba 2020 snippets + List/HTTP/ActiveMQ). */
const COVERAGE_JAVA_15 = [
  {
    track:'java', group:'并发', id:'java-executors-factory-oom',
    title:'Executors 工厂常带无界队列或无线程上限',
    prompt:'为什么手册要求不要用 Executors.newFixedThreadPool 这类工厂，而要自己 new ThreadPoolExecutor？',
    promptAnswer:'固定池常用无界队列，缓存池线程数无上限。生产要自己写 ThreadPoolExecutor，写清队列和拒绝策略。',
    core:'工厂方法底层仍是 ThreadPoolExecutor，但参数被藏起来。newFixedThreadPool / newSingleThreadExecutor 使用容量 Integer.MAX_VALUE 的 LinkedBlockingQueue，任务会在队列里无限堆积直到内存耗尽。newCachedThreadPool / newScheduledThreadPool 的最大线程数是 Integer.MAX_VALUE，请求突发时会创建过多线程。自己构造 ThreadPoolExecutor 时必须同时给出核心数、最大数、有界队列和拒绝策略。无界积压的一般后果见既有 `java-executor`。虚拟线程场景另论，不能反过来把无界平台线程池正当化。',
    why:'只背“不要用 Executors”，却说不出无界的是队列还是线程数，线上会先把内存堆满，再谈拒绝策略。区分信号是 Fixed 的队列没有上限，Cached 的线程数没有上限。任务对象或线程栈会先把进程打满。',
    example:'对外 HTTP 处理用有界 ArrayBlockingQueue 和 AbortPolicy 或 CallerRunsPolicy。不要 newFixedThreadPool(8) 承接不可控流量。',
    task:'对照 Executors.newFixedThreadPool 与 newCachedThreadPool 的 JavaDoc，写出各自无界的是队列还是线程数。',
    answer:'对照 newFixedThreadPool 和 newSingleThreadExecutor，它们的工作队列是无界的，任务来得比处理快就会把队列堆到内存耗尽。newCachedThreadPool 和可缓存的调度工厂则是线程数没有上限，来一个任务就可以再开线程。生产用显式的 ThreadPoolExecutor，写上有界队列、最大线程和拒绝策略。',
    keywords:'Executors ThreadPoolExecutor LinkedBlockingQueue OOM AbortPolicy',
    points:['newFixedThreadPool 使用无界 LinkedBlockingQueue','newCachedThreadPool 最大线程数是 Integer.MAX_VALUE','生产应显式给出队列容量和拒绝策略'],
    deep:[
      {title:'无界堆在不同地方',body:'队列无界时，堆里是任务对象。线程无界时，堆外还有线程栈。两种都会在拒绝策略生效前先耗尽资源。只换工厂名字、不写容量，问题还在。队列容量和最大线程要写进构造参数才算数。'},
      {title:'怎样自己验证',body:'打开 newFixedThreadPool 和 newCachedThreadPool 的说明，写出各自无界的是队列还是最大线程。再 new 一个 ThreadPoolExecutor，把队列容量和拒绝策略写进构造参数，确认工厂默认值被盖住。'},
    ],
    refs:[['Executors.newFixedThreadPool','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/Executors.html#newFixedThreadPool(int)'],['ThreadPoolExecutor','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html']]
  },
  {
    track:'java', group:'并发', id:'java-synchronized-monitor',
    title:'synchronized 仍是监视器，不要把偏向锁当现行默认',
    prompt:'为什么把 synchronized 的现行故事讲成“偏向锁→轻量级锁→重量级锁”会过时？',
    promptAnswer:'方法和代码块都是进对象监视器。偏向锁从 JDK 15 起默认关闭，不能再当现行默认故事。',
    core:'synchronized 方法带 ACC_SYNCHRONIZED，代码块编译为 monitorenter/monitorexit，语义都是对象监视器：可重入、同一监视器互斥、默认不公平。这些仍然成立。JDK 6 引入的偏向锁在 JDK 15 起默认关闭（JEP 374），后续版本进一步移除；不能再当现行 HotSpot 的必考路径。重量级监视器仍可能进入操作系统等待，但优化故事要换成现行实现（如轻量锁、锁粗化），而不是背 2010 年的三级升级口诀。可见性边见既有 `java-happens-before`。',
    why:'把现行 synchronized 讲成“默认先走偏向锁”，跟到 JDK 15 以后会直接对不上 JEP 374。区分信号是语义仍是对象监视器，偏向锁不再是默认故事。先问锁的是 this 还是 Class。',
    example:'实例方法上的 synchronized 锁的是 this，静态方法锁的是那个 Class 对象。两个线程锁不同实例不会互斥。在现行版本上不要把偏向锁到轻量级再到重量级当成默认升级路径。两个不同实例可以同时进入。',
    task:'对照 JVMS 的 monitorenter 与 JEP 374，划掉“现行默认偏向锁”，写出方法和代码块锁的是哪个对象。',
    answer:'对照 JVMS 的 monitorenter：方法和代码块都是进入对象监视器，可重入，默认不保证公平，只是字节码形态不同。对照 JEP 374，偏向锁从 JDK 15 起默认关闭，不能再当现行默认。划掉“现行默认偏向锁”。锁的是哪个对象，要看方法是实例还是静态。',
    keywords:'synchronized monitorenter ACC_SYNCHRONIZED 偏向锁 JEP 374',
    points:['方法和代码块都通过对象监视器互斥','可重入，默认不保证公平唤醒','偏向锁从 JDK 15 起默认关闭，不能当现行口诀'],
    deep:[
      {title:'锁对象决定谁互斥',body:'同一实例上的实例方法互斥。两个不同实例互不相关。静态方法互斥的是类对象，和某个 this 不是一把锁。讲升级顺序之前，先写清锁的是谁。讲锁升级之前，先写清锁的是哪一个对象。'},
      {title:'怎样自己验证',body:'对照 JVMS 的 monitorenter 写出监视器语义，再对照 JEP 374 划掉“现行默认偏向锁”。用两个实例各进一个 synchronized 方法，确认它们可以同时进入。'},
    ],
    refs:[['JVMS：monitorenter','https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-6.html#jvms-6.5.monitorenter'],['JEP 374：Disable and Deprecate Biased Locking','https://openjdk.org/jeps/374']]
  },
  {
    track:'java', group:'消息队列', id:'mq-consume-idempotent-key',
    title:'消费幂等要落可靠存储，SETNX 不是完整方案',
    prompt:'为什么“用 Redis SETNX 做消息 id 去重，Java 还不能设过期”不能当现行答案？',
    promptAnswer:'至少一次投递下，消费端要用业务键去重。删消息本身不等于幂等。',
    core:'队列只保证至少一次时，重复投递要靠业务键。可靠做法是把处理结果和去重记录放进同一事务或唯一约束（如订单号唯一索引）。SET key NX 只能占位，崩溃在 SET 成功与写业务之间会丢处理或卡死键；需要原子 SET NX EX、补偿和最终以数据库为准。现行 Redis SET 支持 NX 与 EX/PX 同时给出；“Java 客户端不能给 SETNX 设过期”过时。INCR 当去重同样有过期与崩溃窗口。投递语义见 `mq-delivery-semantics`。',
    why:'只靠 SETNX 占住消息 id，消费者在写库前崩溃后，重投会被挡住，这笔业务却没做成。区分信号是唯一约束在可靠存储里，Redis 过期之后仍以数据库为准。重投被挡时，账本仍是空的。',
    example:'积分入账用订单号做唯一键插入流水。第一次 SETNX 成功后、写库前进程退出：占位还在，重投进不来，账却是空的。数据库唯一约束让重投再插入时撞上同一订单号。Redis 只做短时防抖，并可以在同一条 SET 里写上 NX 和过期。',
    task:'画出 SETNX 成功后写库前崩溃的两条路径，对照 Redis SET 文档写出 NX+EX 的一条命令。',
    answer:'路径一：SETNX 成功，写库前崩溃，占位键还在，重投被拒绝，库里没有流水。路径二：占位若已过期或没设成，重投会再写一次。对照 SET 文档，NX 和过期可以写在同一条命令里，不要说 Java 不能给占位键过期。幂等的最终依据是带唯一约束的流水，不是单独的 SETNX。',
    keywords:'幂等 SETNX SET NX EX 唯一索引 至少一次',
    points:['至少一次投递必须用业务键做幂等','SET NX 与写库之间仍有崩溃窗口','SET 可同时 NX 和 EX，SETNX 不能设过期的说法过时'],
    deep:[
      {title:'占位成功还没入账',body:'先占位再写库，中间崩溃会留下“已经处理过”的假象。先写带唯一键的流水再做别的事，重投撞键就能认出是同一笔。Redis 适合挡短时间的重复，不适合当唯一账本。账本必须能认出同一笔业务。'},
      {title:'怎样自己验证',body:'画出 SETNX 成功后、写库前崩溃的两条路：占位还在则重投被挡且库为空；占位丢失则可能写两次。对照 Redis SET 文档写出一条同时带 NX 和过期的命令，再靠订单号唯一键挡住第二次插入。'},
    ],
    refs:[['Redis SET','https://redis.io/docs/latest/commands/set/'],['Kafka delivery semantics','https://kafka.apache.org/documentation/#semantics']]
  },
  {
    track:'java', group:'Java 基础', id:'java-main-launcher',
    title:'启动入口是 public static void main(String[])',
    prompt:'有人说没有 main 也能靠静态初始化块跑起来，还有人说 main 可以终结。为什么这两句都不能当现行启动答案？',
    promptAnswer:'启动契约要的是标准签名的 main。静态块会跑，但不是入口；别的签名的 main 只是重载。',
    core:'语言规范（JLS，Java Language Specification）的执行一章规定程序怎样启动。java 启动器要调用某个类的 public static void main(String[])，或等价的 String...。没有这个方法就直接失败，静态初始化块不是入口。其它签名的 main 只是重载。static 方法不能按实例方法那样覆盖，子类同签名的 main 是隐藏。资料里的“可以终结 main”没有对应的语言机制。',
    example:'java com.example.App 要求 App 里有 public static void main(String[] args)。另写 public static void main(int n) 不会被启动器调用。',
    task:'对照 JLS 启动一节，列出启动器要求的修饰符、返回类型和参数类型；划掉静态块入口和“终结 main”。',
    answer:'对照 JLS 启动一节：启动器要求的是 public、static、返回 void、参数是 String 数组的 main。静态初始化块会在类初始化时运行，但不是官方入口，划掉“没有 main 也能靠静态块跑起来”。其他签名的 main 只是重载，不会被当成这次启动。也划掉“main 可以终结”这类不在启动契约里的说法。',
    keywords:'main String[] public static launcher JLS',
    points:['启动器调用 public static void main(String[])','其它签名的 main 只是重载，不是入口','静态初始化块不能代替现行启动器'],
    deep:[
      {title:'重载不会被启动',body:'参数换成别的类型，或少了 static、public，方法可以存在，启动器却不认。静态块里的代码会在类加载时跑，失败方式和没有 main 不是同一条错误。签名差一个字，启动器就不认。'},
      {title:'怎样自己验证',body:'对照 JLS 启动一节，列出修饰符、返回类型和参数类型。写一个参数不同的 main，看启动器是否仍找 String 数组那个。去掉标准 main 后，确认不会改由静态块接管启动。'},
    ],
    refs:[['JLS：Execution','https://docs.oracle.com/javase/specs/jls/se25/html/jls-12.html#jls-12.1.4'],['java launcher','https://docs.oracle.com/en/java/javase/25/docs/specs/man/java.html']]
  },
  {
    track:'java', group:'并发', id:'java-aqs-not-futuretask',
    title:'AQS 管 state 和等待队列，FutureTask 已不是它',
    prompt:'为什么说“搞懂 AQS 就搞懂 J.U.C 全部，包括 FutureTask”会过时？',
    promptAnswer:'AQS 仍是许多同步器的模板，但 FutureTask 现行实现已不基于它。搞懂队列模板不等于搞懂全部 J.U.C。',
    core:'AbstractQueuedSynchronizer 用 int state（可扩展为 long）加 CLH 变体等待队列，通过 CAS 管理独占或共享同步。ReentrantLock、Semaphore、CountDownLatch、ReentrantReadWriteLock 建立在它上面。子类实现 tryAcquire/tryRelease 或共享变体，模板方法负责排队与唤醒。FutureTask 在早期实现里用过 AQS，现行 JDK 已改为独立的 CAS 状态机，不能再列入 AQS 家族。SynchronousQueue 的 Transferer 也不是“背一遍 AQS 就等于会用”。state 不是 GC 引用计数。',
    why:'把 FutureTask 当成 AQS 的例题，源码题会翻到对不上的父类，也会以为搞懂 AQS 就覆盖了 J.U.C 全部。区分信号是锁和闩的父类路径里有 AQS，FutureTask 现行实现不再是。',
    example:'自定义锁把 state 从 0 改到 1 表示占用，tryAcquire 用 CAS，失败的线程进入等待队列。CountDownLatch、Semaphore、ReentrantLock、ReentrantReadWriteLock 仍按这个模板。FutureTask 看自己的状态枚举，不要在它里面找 AQS 的内部类。',
    task:'列出四个现行基于 AQS 的同步器，划掉 FutureTask；说明 state 和等待队列各做什么。',
    answer:'现行基于 AQS 的四个例子可以写 ReentrantLock、ReentrantReadWriteLock、Semaphore、CountDownLatch：state 表示同步状态，等待队列挂住还没拿到的线程。划掉 FutureTask。它现在的实现不再基于 AQS，搞懂队列模板也不等于搞懂全部并发工具。',
    keywords:'AQS AbstractQueuedSynchronizer CLH ReentrantLock FutureTask',
    points:['AQS 用 CAS 管理 state 并把失败线程排进等待队列','ReentrantLock、Semaphore、CountDownLatch、读写锁基于 AQS','现行 FutureTask 不再建立在 AQS 上'],
    deep:[
      {title:'state 和队列各管一段',body:'state 用一个整数表达占用、许可或剩余计数，靠 CAS 改。没改成功的线程进等待队列，被释放时再唤醒。FutureTask 的完成、取消是另一套状态，不要套这个模板。'},
      {title:'怎样自己验证',body:'打开 ReentrantLock、Semaphore、CountDownLatch 和读写锁的继承关系，确认能走到 AQS。再打开 FutureTask，划掉它。说明 state 管资源，队列管还在等的线程。'},
    ],
    refs:[['AbstractQueuedSynchronizer','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/AbstractQueuedSynchronizer.html'],['FutureTask','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/FutureTask.html']]
  },
  {
    track:'java', group:'并发', id:'java-rwlock-no-upgrade',
    title:'读写锁可以降级，不能从读锁升级成写锁',
    prompt:'为什么“有了 ReadWriteLock，读也不用管互斥，读锁还能升成写锁”不成立？',
    promptAnswer:'读锁不能直接升成写锁。降级可以（先拿写再拿读再放写）；升级必须先放读锁再重读条件。',
    core:'ReentrantReadWriteLock 读锁共享、写锁独占：读-读并发，读-写、写-写互斥。持写锁的线程可以再获读锁，形成降级；先持读锁再申请写锁会死锁式等待，官方示例要求先放读锁再抢写锁，并在写锁内复查条件。读多写少才划算；写多时读写锁的获取成本可能高于一把互斥锁。Lock 接口本身不是读写锁，见 `java-lock-flexibility`。',
    why:'以为持有读锁还能再升级成写锁，会在读锁里申请写锁，自己和其他读者互相等死。区分信号是 JavaDoc 允许先拿写锁再拿读锁的降级，禁止反过来升级。读者还拿着读锁时，写锁永远等不到。',
    example:'缓存未命中时不能在读锁里直接要写锁。按说明的顺序：先放开读锁，再获取写锁，重新检查，仍缺才填充，然后先拿读锁再放写锁。这和 CachedData 示例同一形状。复查是为了防止放开锁之后条件已经变了，所以要复查。',
    task:'对照 ReentrantReadWriteLock JavaDoc，写出降级三步和禁止升级的原因。',
    answer:'读锁可以多个一起持有，写锁独占。降级三步是：已经持有写锁，再获取读锁，然后释放写锁，期间不把数据暴露成没锁。禁止升级：持有读锁时再获取写锁不会成功，必须先释放读锁，重新检查条件，再决定是否写入。放开读锁之后必须重读，不能沿用刚才读到的判断。',
    keywords:'ReentrantReadWriteLock 降级 升级 读锁 写锁',
    points:['读锁共享，写锁独占','允许写锁降级到读锁','持读锁时申请写锁不能升级，须先释放再复查'],
    deep:[
      {title:'升级会死锁的原因',body:'读锁不独占，别人也可以持有读锁。你在读锁里等写锁，写锁又要等所有读者放开，其中包括你自己。所以文档要求先放读锁，再抢写锁，并在写入前再读一次。自己也是还没放开的读者。'},
      {title:'怎样自己验证',body:'对照 ReentrantReadWriteLock 的说明，按降级三步写下来，并标出禁止升级的那句。在持有读锁时尝试获取写锁，应失败或一直等待；先释放再获取，才能写。'},
    ],
    refs:[['ReentrantReadWriteLock','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/ReentrantReadWriteLock.html'],['ReadWriteLock','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/ReadWriteLock.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-arrays-aslist-fixed',
    title:'Arrays.asList 返回固定大小的列表，不是 ArrayList',
    prompt:'为什么 asList 之后 add 会失败，也不能把它当成可变 ArrayList？',
    promptAnswer:'asList 是固定大小视图：set 会改底层数组，add/remove 会失败。要增删就拷进真正的 ArrayList。',
    core:'Arrays.asList 返回的是包住原数组的固定列表，和 java.util.ArrayList 不是一个类。set 会改对应下标并写回数组；add 和 remove 抛 UnsupportedOperationException，因为长度跟原数组走。要一份能增删的副本，写成 new ArrayList<>(Arrays.asList(...))。',
    example:'String[] ids = {"a","b"}; List<String> view = Arrays.asList(ids); view.set(0,"x") 会改 ids[0]；view.add("y") 失败。',
    task:'写一段 asList 后 set、add、再包一层 java.util.ArrayList 的实验，记录哪一步改原数组、哪一步抛异常。',
    answer:'asList 之后 set 会成功，并改掉底层数组里对应位置，所以它不是只读视图。接着 add 或 remove 会抛出不支持的操作，因为大小固定。若要增删，把元素拷进 new java.util.ArrayList 再改，这份新列表不再写回原数组。',
    keywords:'Arrays.asList ArrayList UnsupportedOperationException 固定大小',
    points:['asList 返回固定大小视图，不支持 add/remove','set 会写回底层数组','可变独立副本要 new ArrayList<>(asList(...))'],
    deep:[
      {title:'视图和拷贝不是一份',body:'asList 没有把元素复制出来，只是给数组包了一层列表。要一份能增删、且不改原数组的列表，必须再构造一个真正的 ArrayList。只改包装类型的名字解决不了固定长度。'},
      {title:'怎样自己验证',body:'对 asList 的结果先 set，打印原数组应被改掉；再 add，应抛异常。包进 java.util.ArrayList 之后再 add，应成功，并且原数组长度不变。'},
    ],
    refs:[['Arrays.asList','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Arrays.html#asList(T...)'],['ArrayList','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/ArrayList.html']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http-patch-rfc5789',
    title:'PATCH 不是 HTTP/1.1 核心那六个方法里的一个',
    prompt:'为什么把 PATCH 背成“HTTP/1.1 新定义的六种方法之一”不准确？',
    promptAnswer:'PATCH 来自 RFC 5789，不是 HTTP/1.1 核心六方法之一。别把方法注册表背成“六种含 PATCH”。',
    core:'HTTP/1.0 规范化了 GET、POST、HEAD。HTTP/1.1 增加 PUT、DELETE、OPTIONS、TRACE、CONNECT 等。PATCH 由 RFC 5789 单独定义，用来对资源做部分修改；现行 HTTP 语义在 RFC 9110，方法集合是可扩展的，不靠“1.1 一共六种”这种闭口清单。PUT 语义是用请求体替换目标资源，不是“更新个人信息”的同义词。安全与幂等约定见既有 `http-methods`。',
    why:'把 PATCH 闭口背成 HTTP/1.1 那六种方法之一，会说错它的出处，也会把局部修改和 PUT 的整份替换混在一起。区分信号是 PATCH 来自单独的 RFC 5789，方法注册表里再对一下。',
    example:'只改昵称一个字段，用 PATCH 配 JSON Merge Patch 或 JSON Patch，描述的是这一处修改。整份个人资料换成新文档用 PUT。查询仍用 GET。不要把 PATCH 算进 HTTP/1.1 核心方法表里的六种。',
    task:'对照 RFC 9110 方法注册与 RFC 5789，划掉“1.1 定义了含 PATCH 的六种”，写出 PUT 与 PATCH 的差别。',
    answer:'对照 RFC 9110 的方法注册和 RFC 5789，划掉“HTTP/1.1 定义了含 PATCH 的六种方法”。PATCH 的语义在它自己的 RFC 里。PUT 用请求体替换目标资源的当前表示；PATCH 描述的是对当前表示做哪些局部修改。两者都不是安全方法，但替换范围不同。',
    keywords:'HTTP PATCH PUT RFC 5789 RFC 9110 OPTIONS',
    points:['HTTP/1.1 核心未把 PATCH 列进那张闭口表','PATCH 由 RFC 5789 定义部分修改','PUT 是替换目标资源，不是 PATCH 的别名'],
    deep:[
      {title:'局部修改要写清补丁格式',body:'PATCH 只说明“这是一组修改”，具体格式还要看 Content-Type。不写清补丁格式，服务端无法知道改的是一个字段还是整份文档，就会和 PUT 混用。补丁的媒体类型要一起约定。'},
      {title:'怎样自己验证',body:'对照 RFC 9110 的方法名单和 RFC 5789，确认 PATCH 不在 HTTP/1.1 核心六种里。用 PUT 替换整份文档，用 PATCH 只改一个字段，比较两次之后资源还剩下哪些原字段。'},
    ],
    refs:[['RFC 9110：Methods','https://www.rfc-editor.org/rfc/rfc9110.html#name-methods'],['RFC 5789：PATCH','https://www.rfc-editor.org/rfc/rfc5789']]
  },
  {
    track:'java', group:'消息队列', id:'activemq-prefetch-limit',
    title:'ActiveMQ 预取会让消息堆在一个消费者里',
    prompt:'为什么开两个消费者却只有一台在干活，还把这说成负载均衡失效？',
    promptAnswer:'对照预取文档，队列有一个默认的预取条数，broker 会提前把这么多未确认消息交给一个消费者。',
    core:'Classic ActiveMQ 默认给队列消费者较大的 prefetch（文档默认 1000）。Broker 一次把一批未确认消息分给某个连接，在 ack 之前其它消费者拿不到这批。慢消费者会看起来“独占”队列。处理失败且 AUTO_ACK 下可退回，重试耗尽进入 DLQ（默认 ActiveMQ.DLQ，次数可配，常与 6 次相关）。这是 JMS 实现细节，不是“最流行的企业总线”定律；现行选型常转向其它中间件。JMS 模型见 `activemq-jms-model`。',
    why:'不看预取，水平加上消费者也分摊不了长任务，未确认的消息会堆在先连上的那一台。区分信号是确认之前，这批消息不会改分给别人。未确认的一批已经记在某个消费者名下，后来连上的消费者拿不到这批。',
    example:'每条消息要处理 2 秒，预取仍是队列默认的一大批时，先连上的消费者会一次拿走很多条，后连上的闲着。把预取调到 1，十个消费者才能轮流取。超过重试次数的进死信队列，不要无限重新投递。默认预取很大时，慢任务会把队列提前搬空到一台机器上。',
    task:'对照 ActiveMQ prefetch 文档写出队列默认值，并说明 ack 前消息为何不改分给别人。',
    answer:'对照预取文档，队列有一个默认的预取条数，broker 会提前把这么多未确认消息交给一个消费者。确认之前这些消息不会分给其他消费者，所以慢任务看起来像负载均衡失效。把预取降到 1 才能一条条分。重试用尽后进入死信队列。所以“负载均衡失效”其实是预取还没确认。',
    keywords:'ActiveMQ prefetch JMS DLQ AUTO_ACK',
    points:['队列默认预取一批未确认消息给单个消费者','ack 前这批不会转给其它消费者','重试耗尽进入死信队列，次数可配'],
    deep:[
      {title:'预取是提前分配',body:'预取让消费者少等下一次拉取，代价是消息已经记在它名下。处理很慢时，这批消息既不在队列里等别人，也不会因为你加了消费者就自动重新平衡。慢消费者会把预取配额提前占满。'},
      {title:'怎样自己验证',body:'对照 ActiveMQ 预取文档写出队列默认值。开两个消费者处理很慢的任务，看未确认的消息是否堆在一个上面。把预取改为 1 再观察是否轮流取走，失败超过次数后应进入死信队列。'},
    ],
    refs:[['ActiveMQ prefetch','https://activemq.apache.org/components/classic/documentation/what-is-the-prefetch-limit-for'],['ActiveMQ message redelivery','https://activemq.apache.org/components/classic/documentation/redelivery-policy']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_15) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
