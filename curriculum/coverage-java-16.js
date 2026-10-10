/* Batch 16: ten short Java PDFs (CAS/AOP/queue/singleton/String/MyBatis/cache/HTTP/RocketMQ). */
const COVERAGE_JAVA_16 = [
  {
    track:'java', group:'并发', id:'java-cas-aba-stamp',
    title:'CAS 比的是此刻的值，ABA 要用版本戳',
    prompt:'为什么“内存里还是 A，CAS 就一定安全”以及“原子类底层就是公开 Unsafe”都不能当答案？',
    promptAnswer:'值变回 A 仍可能中间发生过变化。要用带戳的引用；业务代码走原子类或 VarHandle，不要直接 Unsafe。',
    core:'CAS 用当前值与期望值比较，相等才换成新值。它提供的是单次变量的原子更新，不是整段业务的事务。失败重试会自旋，长时间争用会占 CPU，不能笼统说一定比 synchronized 快。ABA 是值从 A 变到 B 再变回 A，CAS 会当成没人动过；无锁栈弹出再压入同一节点就会踩中。避免办法是带版本的引用，如 AtomicStampedReference，或用不复用的新对象。公开 API 是 java.util.concurrent.atomic 与 VarHandle；sun.misc.Unsafe 不是应用代码该依赖的入口。',
    why:'只背比较交换，链表节点从 A 变到 B 再变回 A，CAS 仍当没人动过，无锁栈会把已弹出的节点再接上。区分信号是值仍是 A 但 stamp 已经加过，带版本的 CAS 失败，而不带版本的成功。',
    example:'栈顶引用是 A、stamp 为 1。另一线程弹出 A 再压回同一个节点，引用仍是 A，stamp 变成 2。原来的 CAS 仍拿期望值 A 和 stamp 1 去换，比较失败。余额上的 AtomicInteger 只保护这一个 int，转账不能靠它代替业务约束。',
    task:'对照 AtomicStampedReference，画出 ABA 三次赋值，并写出 stamp 不相等时 CAS 失败。划掉业务代码里的 Unsafe。',
    answer:'对照 AtomicStampedReference：A 变成 B 再变回 A 是三次赋值，引用看起来没变。stamp 不相等时这次 CAS 预测失败。业务代码里的 sun.misc.Unsafe 划掉，公开入口用原子类或 VarHandle。长时间自旋仍会占满 CPU。',
    keywords:'CAS ABA AtomicStampedReference VarHandle Unsafe 自旋',
    points:['CAS 比较的是当前值，不是对象经历过的历史','ABA 要用 stamp 或不可复用身份来拆穿','公开入口是原子类和 VarHandle，不是 Unsafe'],
    deep:[
      {title:'值没变不等于经历没变',body:'CAS 只比较这一次的期望值和当前值。中间被改走又改回来，没有版本就看不出来。AtomicStampedReference 把版本和引用一起比，版本不同就失败。'},
      {title:'怎样自己验证',body:'画出引用 A 到 B 再回到 A，同时 stamp 从 1 加到 2。用旧 stamp 做 CAS，预测失败。在业务代码里搜索 Unsafe，这些调用应改成原子类或 VarHandle。'},
    ],
    refs:[['AtomicInteger','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html'],['AtomicStampedReference','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/atomic/AtomicStampedReference.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-boot-aop-cglib-default',
    title:'Spring Boot 默认按类做 CGLIB 代理',
    prompt:'为什么还背“有接口就一定 JDK 动态代理”会在 Boot 项目里说错？',
    promptAnswer:'Boot 默认常走 CGLIB，不是“有接口就一定 JDK”。final 方法切不中，因为子类覆盖不了。',
    core:'Spring Framework 在未强制时，目标实现了接口常生成 JDK 代理，否则用 CGLIB 子类。Spring Boot 默认 spring.aop.proxy-target-class=true，即便有接口也按目标类做 CGLIB 代理，便于注入具体类型。CGLIB 不能代理 final 类/方法，private、static 也拦不到。JDK 代理只能看到接口方法。切面仍然只拦经过代理的调用，同类 this 调用见 `spring-aop-self-invocation`。资料把 Boot 默认策略写成“有接口就 JDK”过时。',
    why:'还背有接口就一定是 JDK 动态代理，Boot 里注入的却是目标类的 CGLIB 子类，按接口代理去强转会对不上 class 名。区分信号是打印出来的 class 带 CGLIB，而不是 $Proxy；final 方法仍然切不中。',
    example:'OrderService 实现了 OrderOps，在 Boot 里注入后打印 class，名字带 CGLIB 子类而不是 JDK 代理。调用被代理的公开方法能进切面。把该方法改成 final 后，CGLIB 无法覆盖，调用不再进切面。同类里的 this 调用同样不经过代理。',
    task:'打印注入 Bean 的 class。对照 Boot AOP 说明，划掉“有接口就一定 JDK”，列出 final 方法切不中的原因。',
    answer:'打印注入 Bean 的 class，预测是 CGLIB 增强的目标类，不是 JDK 的接口代理。对照 Boot 的 AOP 说明，划掉有接口就一定 JDK。final 方法切不中，是因为 CGLIB 要生成子类去覆盖方法，final 不能覆盖。',
    keywords:'Spring Boot AOP CGLIB JDK proxy proxy-target-class',
    points:['Spring Boot 默认 proxy-target-class=true','有接口也不再默认走 JDK 代理','final、private、static 以及 this 调用仍拦不到'],
    deep:[
      {title:'默认按类生成子类',body:'Boot 默认 proxy-target-class 为 true，有接口也按目标类做 CGLIB。JDK 代理只能看到接口方法，而且要显式关掉这个开关才走那条路。private 和 static 同样不经过可覆盖的实例方法。'},
      {title:'怎样自己验证',body:'打印注入 Bean 的 class，名字应带 CGLIB。划掉有接口就一定 JDK。把一个切点方法改成 final 再调用，预测切面不再执行，因为子类覆盖不了 final。'},
    ],
    refs:[['Spring Boot：AOP','https://docs.spring.io/spring-boot/reference/features/spring-aop.html'],['Spring：Proxying mechanisms','https://docs.spring.io/spring-framework/reference/core/aop/proxying.html']]
  },
  {
    track:'java', group:'并发', id:'java-linked-blocking-unbounded',
    title:'未指定容量的 LinkedBlockingQueue 几乎无界',
    prompt:'为什么把 BlockingQueue 背成“满了就会阻塞”，却用 new LinkedBlockingQueue() 仍可能先把内存吃光？',
    promptAnswer:'无参 LinkedBlockingQueue 容量几乎无限，可能先把内存吃光。背压要用有界队列。',
    core:'BlockingQueue 的 put/take 在有界且满/空时才会阻塞。ArrayBlockingQueue 必须给容量。LinkedBlockingQueue 无参构造把容量设为 Integer.MAX_VALUE，生产者几乎不会因为“满”而阻塞，任务会先堆到内存里，这和 Executors.newFixedThreadPool 的队列是同一风险。PriorityBlockingQueue、DelayQueue 也是无界的。DelayQueue 元素必须实现 Delayed，到期前 take 会等待。选队列先写容量和拒绝/阻塞策略，再谈 FIFO。',
    why:'口头说队列满了会阻塞，代码却 new LinkedBlockingQueue()，容量是 Integer.MAX_VALUE，生产者先把任务堆进内存。区分信号是无参链表队列几乎不会因为满而停，ArrayBlockingQueue 写明容量后 put 才会在满时堵住。',
    example:'生产者往 new LinkedBlockingQueue() 里连续 put，队列长度一直涨，进程先 OOM，put 并没有堵住。换成 new ArrayBlockingQueue<>(256)，第 257 次 put 停在调用里；同一时刻 offer 立刻返回 false，调用方可以走拒绝逻辑。',
    task:'对照 LinkedBlockingQueue 无参构造的容量，对比 ArrayBlockingQueue 必须指定容量；写出满时 put 与 offer 的差别。',
    answer:'对照无参 LinkedBlockingQueue，容量是 Integer.MAX_VALUE，预测几乎不会因为满而阻塞。ArrayBlockingQueue 必须在构造时写出容量。队列真正满时，put 预测阻塞，offer 预测马上返回 false。背压要用这种有界队列。',
    keywords:'LinkedBlockingQueue ArrayBlockingQueue Integer.MAX_VALUE DelayQueue',
    points:['无参 LinkedBlockingQueue 容量接近无界','ArrayBlockingQueue 必须指定容量','put 满时阻塞，offer 满时返回 false'],
    deep:[
      {title:'不写容量就接近无界',body:'无参构造把上限设成 Integer.MAX_VALUE，满之前内存会先耗尽。ArrayBlockingQueue 没有无参的有界默认值，容量必须自己给。DelayQueue 也是无界，而且 take 还要等延迟到期。'},
      {title:'怎样自己验证',body:'打开无参 LinkedBlockingQueue 的构造说明，容量应是 Integer.MAX_VALUE。再构造容量 256 的 ArrayBlockingQueue，填满后 put 应停住，offer 应返回 false。'},
    ],
    refs:[['LinkedBlockingQueue','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/LinkedBlockingQueue.html'],['ArrayBlockingQueue','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/ArrayBlockingQueue.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-dcl-volatile-enum',
    title:'双重检查单例要 volatile，枚举更不容易写错（JDK 5）',
    prompt:'为什么手写懒汉双重检查却漏掉 volatile，运行时仍可能看到半初始化实例？',
    promptAnswer:'无 volatile 时引用可能先可见、构造未完成。枚举常量由类初始化安全发布，不必自己再套双重检查。',
    core:'语言规范里的 volatile 字段：对它的写，先行发生于之后对同一字段的读。new Singleton() 不是一次原子发布，引用可能先写进 instance，字段还是默认值。把 instance 标成 volatile 才能避免这个窗口。枚举类型（enum）的每个常量在类初始化时发布，虚拟机保证只初始化一次，不必自己写双重检查。',
    example:'线程 1 执行 new Singleton()，引用已写入 instance，构造器里的 name 还是 null。线程 2 在外层看见非 null 就返回，接着调用 name 出现空指针。把 instance 标成 volatile 后，线程 2 不会看见这次半初始化。改用枚举常量则不必再写这套检查。',
    task:'画出无 volatile 的 DCL 下“引用先于构造完成可见”的交错；对照枚举初始化写一句为什么不必自己加锁。',
    answer:'无 volatile 的双重检查下，预测交错是引用先对外可见、构造尚未完成，读到的字段还是默认值。对照枚举初始化：常量由类初始化安全发布，JVM 保证这一步的线程安全，所以不必自己再加锁。单例仍不保护业务字段的并发写。漏掉 volatile 时，预测能看见默认字段。',
    keywords:'双重检查 volatile 枚举单例 安全发布',
    points:['无 volatile 的 DCL 可能读到半初始化对象','枚举常量初始化由 JVM 保证线程安全','单例只保证一份实例，不保证字段并发安全'],
    deep:[
      {title:'引用可见不等于构造完成',body:'new 可能先把引用放进静态字段，再跑完构造器。外层读到非 null 就返回，会看到默认字段。volatile 建立安全发布。枚举常量走类初始化，不必手写这套双重检查。'},
      {title:'怎样自己验证',body:'画出无线程安全发布时，引用先被看见、字段仍是默认值的交错。再对照枚举常量的初始化，写明它由类初始化发布，因此不必自己加锁。若仍写双重检查，字段必须是 volatile。'},
    ],
    refs:[['JLS：volatile','https://docs.oracle.com/javase/specs/jls/se25/html/jls-17.html#jls-17.4.5'],['Enum types','https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-string-strip-not-trim',
    title:'trim 清的不是全部空白，getBytes 必须写字符集（JDK 11 strip）',
    prompt:'旧资料常把 trim、无参 getBytes、new String(byte[]) 连成一套。为什么在现行 JDK 里会翻车？',
    promptAnswer:'trim 去不掉部分 Unicode 空白；strip 按 Unicode 空白。字节转换要写明字符集，不要靠默认。',
    core:'trim 去掉码点小于等于 U+0020 的字符，不间断空格（U+00A0）去不掉。Java 11 起的 strip、stripLeading、stripTrailing 按 Character.isWhitespace 判断，能去掉这类空白。无参 getBytes() 和 new String(byte[]) 走默认字符集；要稳定就写明 StandardCharsets，不要赌 file.encoding。',
    example:'字符串两端是 U+00A0。trim() 之后这些字符还在，长度不变。strip() 之后两端空白消失。同一中文用无参 getBytes() 得到的字节随默认字符集变化，getBytes(StandardCharsets.UTF_8) 得到的字节序列稳定。',
    task:'对比 trim 与 strip 对 U+00A0 的结果；再分别用无参 getBytes 和 UTF_8 编码同一中文。',
    answer:'对比 U+00A0：trim 预测去不掉，strip 预测去掉。同一中文再用无参 getBytes，预测字节随默认字符集变化；改用 UTF_8，预测字节序列稳定。无参 getBytes 不能当成跨环境的稳定编码。',
    keywords:'String trim strip getBytes UTF-8 intern',
    points:['trim 只去掉 U+0020 及以下，strip 才按 Unicode 空白','无参 getBytes/new String(byte[]) 走默认字符集','契约要写明字符集，不要赌运行环境的默认值'],
    deep:[
      {title:'空白和字符集都要写明',body:'trim 只去掉代码点不大于 U+0020 的字符。strip 按 Unicode 空白判断。无参 getBytes 和新的 String(byte[]) 走默认字符集，接口契约应写 StandardCharsets，而不是赌运行环境。'},
      {title:'怎样自己验证',body:'对含 U+00A0 的字符串分别调用 trim 和 strip，只有 strip 应去掉它。再对同一中文调用无参 getBytes 和 UTF_8，显式 UTF_8 的字节应稳定，无参结果随默认字符集变化。'},
    ],
    refs:[['String.strip','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/String.html#strip()'],['String.getBytes','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/String.html#getBytes()']]
  },
  {
    track:'java', group:'缓存', id:'cache-penetration-vs-breakdown',
    title:'穿透是根本没有，击穿是热点刚好过期',
    prompt:'资料常把缓存穿透和击穿写进同一句对策。为什么要拆开看？',
    promptAnswer:'穿透是查不存在的键打穿到库；击穿是热点键失效瞬间打穿。对策不同，不要并成一句。',
    core:'穿透：缓存和库都没有，每次都打到存储；防护是参数校验、空值短 TTL、布隆过滤器。击穿（热点失效）：这一个热 key 过期，并发都去回源；防护是互斥回源、逻辑过期、把热 key TTL 错开或不过期由任务刷新。雪崩：大量 key 同一时刻失效或缓存进程挂掉；防护是 TTL 加随机抖动、多级缓存、降级。三者都不是“Redis 再快一点就好”。空值缓存要短 TTL，避免把误删的真实数据长期挡住。热 key 体积问题见 `redis-big-hot-key`。',
    why:'把不存在的 id 和热 key 一起过期都叫雪崩，就会给攻击 id 加互斥、给热点只加布隆，两边都治不对。区分信号是库里根本没有、单个热点刚好过期、还是一大片同时失效。药方和现象对不上时，缓存仍会被打穿。',
    example:'请求 id=-1，缓存和库都没有，每次都打到存储，这是穿透。秒杀 SKU 的键刚好过期，同一瞬间大量请求回源，这是击穿。一批配置键设了同一个 TTL，一起消失导致请求全落库，这是雪崩。三种现象要三种手段。',
    task:'给穿透、击穿、雪崩各写一列：现象、一个有效手段、一个无效手段。',
    answer:'穿透：缓存和库都没有；有效手段是校验或空值短 TTL；互斥回源治不好它。击穿：一个热 key 过期；有效手段是单飞回源；布隆过滤器治不好它。雪崩：大量键同时失效；有效手段是 TTL 加抖动；只给某一个不存在的 id 加锁治不好它。三列的手段不能互换，否则现象还在。',
    keywords:'缓存穿透 击穿 雪崩 空值 TTL 互斥',
    points:['穿透是缓存和库都没有，要挡非法键','击穿是单个热 key 失效后的并发回源','雪崩是同时失效或缓存整体不可用'],
    deep:[
      {title:'三种失效不是同一味药',body:'穿透要挡住根本没有的键。击穿要让这一个热点只有一个人回源。雪崩要避免同一时刻大面积失效，或缓存进程挂掉时有降级。空值缓存必须短 TTL，避免把后来写上的真数据挡住。'},
      {title:'怎样自己验证',body:'做三列：不存在的 id、单个热 key 过期、一批键同时到期。分别写现象、一个对症手段和一个对不上的手段。互斥锁不应出现在穿透那一列，布隆不应当成击穿的药。对不上的手段应单独写出来。'},
    ],
    refs:[['Redis：Cache-aside','https://redis.io/docs/latest/develop/use-cases/cache-aside/'],['Redis：Key eviction','https://redis.io/docs/latest/develop/reference/eviction/']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http-503-unavailable',
    title:'503 是暂时不可用，不是“服务器宕机”的同义词（RFC 9110）',
    prompt:'为什么把 5xx 背成“500 内部错误、503 宕机”，以及把 3xx 说成浏览器总会自动跳，会误导排障？',
    promptAnswer:'500 是处理过程中出现未抓住的错误，503 是此刻暂时不能服务，可以带 Retry-After。',
    core:'503 Service Unavailable 表示此刻不能处理，常见于过载、维护、依赖熔断，响应可带 Retry-After；进程崩溃更常表现为连接失败或代理 502，而不是一张保证出现的 503。500 是服务器在处理中遇到未抓住的错误。401/403 见既有 `http-status-auth`。3xx 里 Location 引导重定向；浏览器对页面导航会跟，但 fetch 默认对非 301/302/303 等有自己的跟随规则，API 客户端不应假定“拿到 302 就一定换域名打开新页”。301 永久、302 历史里常被当临时，现行语义以 **RFC 9110** 为准。',
    why:'把 503 背成宕机就去重启机器，过载和维护其实只要限流或等依赖恢复。区分信号是 503 仍有 HTTP 响应，还可以带 Retry-After；进程崩溃常常是连接失败，客户端根本没有状态码。',
    example:'发布窗口返回 503，头里 Retry-After 为 30，进程仍在听端口。数据库把请求处理到一半抛错，更常是 500。直接把进程杀掉，客户端看到的是连接被拒绝或重置，抓包里没有 503 这一行。此时端口已经不再监听。',
    task:'对照 RFC 9110 写出 500 与 503 的差别，并说明什么情况下客户端根本拿不到状态码。',
    answer:'对照 RFC 9110：500 是处理过程中出现未抓住的错误，503 是此刻暂时不能服务，可以带 Retry-After。客户端根本拿不到状态码的情况，是连接失败、拒绝或中途断开，代理有时给 502，但源头崩溃并不保证有一张 503。连接被拒绝时，预测抓包里没有状态行。',
    keywords:'HTTP 503 500 Retry-After 302 502',
    points:['503 表示过载或维护等暂时不可用','连接失败往往没有 5xx 状态码','3xx 跟随行为取决于客户端，不是一律跳转'],
    deep:[
      {title:'有响应才谈得上 503',body:'503 表示过载、维护或依赖熔断，服务还在用 HTTP 回答。连接建不起来时没有状态行。3xx 会不会被自动跟随，还要看是页面导航还是这个客户端的 fetch，不是一律跳转。'},
      {title:'怎样自己验证',body:'对照 503 与 500 的定义，维护窗口应返回 503 并可带 Retry-After。再把监听进程停掉后重试，客户端应是连接失败，抓包里不应出现一张保证送达的 503。'},
    ],
    refs:[['RFC 9110：503','https://www.rfc-editor.org/rfc/rfc9110.html#name-503-service-unavailable'],['MDN：503','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/503']]
  },
  {
    track:'java', group:'消息队列', id:'rocketmq-store-not-ram-buffer',
    title:'RocketMQ 把消息落盘，不是无限内存 Buffer',
    prompt:'为什么说“RocketMQ 没有内存 Buffer、队列无限长，所以既不丢也不重复”不成立？',
    promptAnswer:'对照存储和重试文档，划掉无限内存 Buffer 和恰好一次。预测消息落在磁盘上，超过保留时间被删除。',
    core:'Broker 以提交日志和 ConsumeQueue 把消息落到磁盘，并按保留时间删除；“看起来无限”只是磁盘和 TTL 之内可堆积，不是内存里永远装得下，磁盘满或刷盘失败仍会挡生产者。消费是至少一次：先拉取再 ack，失败会重投，业务必须幂等。资料里的“只消费一次”自己也写了做不到。定时消息只支持固定 delay level，不是任意时刻。Kafka 现行主语言是 Java，不是只能 Scala。可靠性随同步刷盘、副本数变化，单盘损坏仍可能丢未复制的数据。模型见 `rocketmq-model`。',
    why:'按无限内存队列估容量，磁盘打满时生产才被堵住；按恰好一次去扣款，失败重投会再扣一次。区分信号是消息在 CommitLog 里按保留时间删除，消费失败会再次投递，直到业务确认。磁盘满时生产者会被挡住。',
    example:'主题保留 3 天，消息写在磁盘上的 CommitLog，不是堆里的无限 Buffer。消费端处理失败没有 ack，同一条从重试主题再来。关单只能选固定 delay level，不能指定任意毫秒。磁盘满时发送被挡住，而不是继续堆在内存里。',
    task:'对照 RocketMQ 存储与消费重试文档，划掉无限内存 Buffer 和恰好一次；写出 TTL 删除与至少一次 ack。',
    answer:'对照存储和重试文档，划掉无限内存 Buffer 和恰好一次。预测消息落在磁盘上，超过保留时间被删除。消费是先拉取再确认，失败会重投，所以至少一次，业务必须幂等。定时消息只有固定 level。保留期之外的消息会被删掉，重投的那一次仍然要靠业务键幂等。',
    keywords:'RocketMQ CommitLog 至少一次 delay level 刷盘',
    points:['消息持久化在磁盘并按保留时间删除，不是无限内存队列','消费失败会重投，不保证恰好一次','定时消息只有固定 level，不是任意时间精度'],
    deep:[
      {title:'堆积的上限是磁盘和保留期',body:'看起来能堆很多，是因为 CommitLog 还在保留时间内。磁盘满或刷盘失败会挡住生产者。消费失败进入重试，不存在做得到的只消费一次。未复制的单盘损坏仍可能丢。'},
      {title:'怎样自己验证',body:'对照存储文档划掉无限内存，写出按保留时间删除。再对照消费重试：处理失败且不确认时，同一条应再次投递。扣款必须用业务键挡住第二次。不确认的消息应再次出现在消费里。'},
    ],
    refs:[['RocketMQ：存储','https://rocketmq.apache.org/docs/introduction/02concepts/'],['RocketMQ：消费重试','https://rocketmq.apache.org/docs/featureBehavior/10retryonfail/']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_16) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
