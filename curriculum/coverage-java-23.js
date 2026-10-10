/* Batch 23: regex DOTALL, Redis 512MB, unchecked exceptions, Eureka lease, PC no OOM, Linux BKL. */
const COVERAGE_JAVA_23 = [
  {
    track:'frontend', group:'语言基础', id:'js-regex-dot-not-newline',
    title:'. 默认不匹配换行，\\d 也不总等于 0-9 的全部数字',
    prompt:'为什么把正则背成“. 匹配任意单个字符、\\d 就是 [0-9]”会在开了 Unicode 或 DOTALL 时翻车？',
    promptAnswer:'默认点号不匹配换行。要跨行开 s/DOTALL；\\d 也不等于永远 [0-9]。',
    core:'多数引擎里 `.` 是元字符，默认不匹配换行；要匹配换行需 `(?s)`、`/s`、Pattern.DOTALL 或 `[^]` 这类写法。匹配字面点用 `\\.`。`\\d` 在 JavaScript 默认是 `[0-9]`；在 Java 开 UNICODE_CHARACTER_CLASS、或 Python 的 Unicode 模式下可以匹配其他数字字符。`[^0-9]` 是否等于“最后一个不是数字”还取决于锚点和量词，资料里的 `abc[^0-9]` 只会再吃一个非数字字符。正则嵌在宿主语言里，flag 决定语义。',
    why:'把 . 背成任意单个字符，多行日志会在第一处换行停住；把 \\d 背成永远等于 [0-9]，开了 Unicode 时全角数字会判断反。区分信号是点号要 DOTALL 或 s 标志才跨行，\\d 的宽度看 flag。',
    example:'JS 默认 `/a.b/` 匹配 `a\\nb` 失败，加上 `s` 才成功。Java `Pattern.compile("\\\\d", UNICODE_CHARACTER_CLASS)` 可能吃到非 ASCII 数字。',
    task:'对照所在语言的 flag 列表，写出让 `.` 匹配换行的开关；试一个 `\\d` 与 `[0-9]` 不一致的输入。',
    answer:'对照所在语言的 flag 列表，让 . 匹配换行的开关是 JavaScript 的 s、Java 的 Pattern.DOTALL，或内联 (?s)。默认点号不跨行。一个 \\d 与 [0-9] 不一致的输入是非 ASCII 数字：Java 开 UNICODE_CHARACTER_CLASS，或 Python 的 Unicode 模式下 \\d 能吃到，[0-9] 吃不到。字面点要转义。',
    keywords:'正则 DOTALL 换行 \\d Unicode',
    points:['默认点号不匹配换行，要开 DOTALL 或等价 flag','\\\\d 在 Unicode 模式下可能宽于 [0-9]','字面元字符必须转义'],
    deep:[
      {title:'旗标决定点号和数字',body:'默认的点号在换行处停下，所以多行日志用它会只吃到第一行。要跨行得打开 DOTALL、JavaScript 的 s，或写 (?s)。\\d 在 JavaScript 里默认就是 [0-9]；Java 开了 UNICODE_CHARACTER_CLASS、Python 走 Unicode 模式时，它可以吃到别的数字字符。字面量的点必须转义。'},
      {title:'怎样自己验证',body:'在所用语言里找出让点号匹配换行的那个 flag，用含换行的 a 换行 b 试一次，默认应失败，打开 flag 后应成功。再拿一个非 ASCII 数字分别交给 \\d 和 [0-9]，只有开了 Unicode 相关开关时两者才分开。'},
    ],
    refs:[['MDN：Regular expressions','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions'],['Pattern.DOTALL','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html#DOTALL']]
  },
  {
    track:'java', group:'缓存', id:'redis-string-max-512mb',
    title:'Redis 字符串上限是 512MB，淘汰策略也不止那六项',
    prompt:'为什么同一份资料先写 value 最大 1GB，后面又写字符串 512MB，并把集群方案写成 Codis 最多？',
    promptAnswer:'除 noeviction、lru、random、ttl 外还有 LFU。',
    core:'协议里 STRING 的上限是 512MB，不是 1GB。工作集放内存，持久化是快照或 AOF，不是“整个库定期 flush 一次就完”。淘汰除 noeviction/lru/random/ttl 外还有 LFU 等，见 `redis-eviction-policy-menu`。官方提供 Windows 构建说明，只是不以 Windows 为第一平台。Cluster 用 16384 槽，不是一致性哈希；Codis 已不再是“用得最多”的默认答案。List 是双向链表结构，不等于开箱即用的消息队列。Lua 能把多条命令放进一次脚本做到原子，见 `redis-lua-atomic`。',
    why:'按 value 最大 1GB 去估容量，STRING 写到超过 512MB 会失败；把集群默认写成 Codis，会选到已经不再是现行答案的方案。区分信号是协议上限 512MB，官方分片是 16384 个槽。',
    example:'把一张图或一段 JSON 放进 STRING 之前，先确认远小于 512MB，而不是按 1GB 预留。分片用 Redis Cluster 的哈希槽；淘汰名单里要有 LFU，不能只背旧的六项。上限以 SET 为准。',
    task:'对照 SET 文档写出 STRING 上限；从淘汰名单里划掉“只有六项、没有 LFU”。',
    answer:'对照 SET 文档，STRING 上限是 512MB，不是资料前半段写的 1GB。从淘汰名单里划掉“只有六项、没有 LFU”：除 noeviction、lru、random、ttl 外还有 LFU。集群优先官方 Cluster 的 16384 槽，Codis 不是现行默认。',
    keywords:'Redis 512MB eviction LFU Cluster Codis',
    points:['STRING 上限 512MB 不是 1GB','淘汰策略包含 LFU 等，不是旧六项','官方集群是 hash slot，Codis 不是现行默认'],
    deep:[
      {title:'上限和淘汰不是旧清单',body:'协议里一条 STRING 到 512MB 为止，按 1GB 预留会在写入时失败。淘汰除了 noeviction、lru、random 和 ttl，还有 LFU。官方集群按 16384 个槽划分，不是再把 Codis 当成默认，也不是一致性哈希。'},
      {title:'怎样自己验证',body:'打开 SET 的命令文档，确认 STRING 上限写的是 512MB，并把 1GB 划掉。再打开淘汰策略列表，确认里面有 LFU，不是只有旧的六项。集群说明里应能看到 16384 个槽。'},
    ],
    refs:[['Redis：SET','https://redis.io/docs/latest/commands/set/'],['Redis Cluster spec','https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/']]
  },
  {
    track:'java', group:'Java 基础', id:'java-unchecked-not-must-catch',
    title:'RuntimeException 不必写进 catch，Error 更不是业务必捕',
    prompt:'笔试题常写：RuntimeException 必须 try/catch，非 RuntimeException 都是外部错误。为什么这不能当标准答案？',
    promptAnswer:'RuntimeException 是未检查异常，编译器不强制 catch。必须处理的是检查异常；Error 不该当业务分支。',
    core:'异常的种类（Kinds of Exceptions）从 Throwable 分成 Error 和 Exception。RuntimeException 及其子类是未检查异常，编译器不要求 catch 或声明 throws。IOException 这类检查异常才必须处理。Error 表示虚拟机内部错误和资源耗尽，应用代码通常不要接住后假装恢复。',
    example:'Integer.parseInt 抛出的 NumberFormatException 可以不写 catch。Files.readAllBytes 的 IOException 必须处理或在方法上声明。OutOfMemoryError 不要收进来当业务分支恢复。',
    task:'对照 JLS 异常分类，划掉“RuntimeException 必须 catch”；写出 Error 为什么不该当业务分支。',
    answer:'对照 JLS 的异常分类，划掉“RuntimeException 必须 catch”：它和子类是未检查异常，编译器不要求捕获或声明 throws。必须处理或声明的是 IOException 一类检查异常。Error 不该当业务分支，因为它表示 JVM 内部错误或资源耗尽，捕捉后假装恢复会掩盖进程已经不行。',
    keywords:'RuntimeException checked Error Throwable',
    points:['RuntimeException 是未检查异常，不必必须 catch','IOException 等检查异常必须处理或声明','Error 表示严重故障，不要当普通业务分支'],
    deep:[
      {title:'编译器只强迫检查异常',body:'RuntimeException 及其子类不用写 catch，也不用 throws，空指针包一层只会把故障藏起来。IOException 这类检查异常漏了处理，编译直接不过。Error 表示虚拟机或资源已经不行，收进业务分支再假装恢复，调用方会以为这次失败可以重试成功。'},
      {title:'怎样自己验证',body:'对照语言规范里的异常分类，把“RuntimeException 必须 catch”划掉。写一个 parseInt，确认不捕获也能编译；写一个读文件的方法，确认 IOException 不处理就编不过。Error 留在分类说明里，不要放进业务 catch 清单。'},
    ],
    refs:[['JLS：Kinds of Exceptions','https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html#jls-11.1.1'],['Throwable','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Throwable.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'eureka-lease-30-90',
    title:'Eureka 默认 30 秒心跳、90 秒摘除，但发现不只有这一家',
    prompt:'为什么把服务发现只背成 Eureka 心跳 30/90，还把 Zuul、Hystrix、Ribbon 当成永久内核？',
    promptAnswer:'30/90 是可改默认，不是定律。Spring Cloud 也不再把 Zuul/Hystrix/Ribbon 当永久内核。',
    core:'Eureka 客户端默认约 30 秒续约，服务端在约 90 秒没续约后摘除，客户端会缓存注册表，注册中心全挂时短时间还能用旧地址。这些数字是默认租约，可配，不是物理定律。现行 Spring Cloud 常用 Spring Cloud LoadBalancer、Gateway，断路器见 `sca-circuit-not-only-hystrix`。注册中心还可以是 Nacos、Consul、ZK。Dubbo 负载均衡在客户端，默认 random，见既有 Dubbo 课。',
    why:'把 30 秒心跳、90 秒摘除写成不能改的物理定律，租约调大之后仍按 90 秒等摘除，会把还活着的实例判成故障。区分信号是这两个数是默认可配的租约，发现组件也不只有 Eureka。',
    example:'本地 Eureka 用默认租约做演示。生产若改 leaseRenewalIntervalInSeconds，摘除时间要一起改。新项目优先 Nacos 或 Consul，而不是只装 Netflix 全家桶。',
    task:'写出 Eureka 默认续约和摘除秒数；列出两种非 Eureka 的发现组件。',
    answer:'Eureka 默认约 30 秒续约一次，约 90 秒没有续约就摘除，这两个秒数可以改，不是固定定律。客户端还会缓存注册表，注册中心短时全挂仍可能用旧地址。两种非 Eureka 的发现组件是 Nacos 和 Consul。网关也不只有 Zuul。',
    keywords:'Eureka lease 30 90 Nacos Gateway',
    points:['Eureka 默认约 30 秒续约、90 秒摘除','客户端会缓存实例列表','网关和发现都有非 Netflix 的现行选项'],
    deep:[
      {title:'30 和 90 是默认租约',body:'客户端大约每 30 秒续一次约，服务端大约 90 秒收不到续约才摘除。把秒数写进预案之后又调大续约间隔，摘除阈值不一起改，活着的实例会被提前拿走。客户端本地还有一份注册表，注册中心短时不可用时旧地址仍可能能用。'},
      {title:'怎样自己验证',body:'在 Eureka 的续约说明里确认默认大约 30 秒心跳、90 秒摘除，并标出这两项可以配置。再列出 Nacos 和 Consul 两种不是 Eureka 的发现组件，网关不要只剩下 Zuul。'},
    ],
    refs:[['Eureka：Understanding Eureka','https://github.com/Netflix/eureka/wiki/Understanding-Eureka-Client-server-communication'],['Spring Cloud Netflix','https://spring.io/projects/spring-cloud-netflix']]
  },
  {
    track:'java', group:'JVM', id:'jvm-pc-no-oom',
    title:'程序计数器不会 OOM，方法区也不再等于永久代',
    prompt:'为什么把“JVM 内存模型”五个区背完之后，还说程序计数器可能和栈一样撑爆？',
    promptAnswer:'程序计数器不抛 OOM。那五个区是运行时数据区，不要和 JMM 混成一张图。',
    core:'规范里每个线程有 pc：执行 Java 方法时指向字节码，native 时未定义。HotSpot 的 pc 不抛 StackOverflowError 也不抛 OutOfMemoryError。虚拟机栈和本地方法栈才可能 SOE，可扩展时还可能 OOM。堆用 -Xms/-Xmx。方法区在 8 之后由元空间实现，见 `jvm-no-permgen-hotspot`。运行时常量池和字符串池位置随版本变过，JDK 7 起字符串进堆。直接内存用 DirectByteBuffer，不受 -Xmx 管，见 `jvm-oom-signals`。资料把运行时数据区叫成内存模型，和 JMM 重名，见 `jvm-jmm-not-runtime-areas`。',
    why:'把程序计数器和栈当成都会撑爆，就会去给 pc 加 -Xss 或按 OOM 查它，栈溢出和元空间泄漏会查错地方。区分信号是 HotSpot 的 pc 不抛 StackOverflowError，也不抛 OutOfMemoryError。',
    example:'无限递归看到的是虚拟机栈的 StackOverflowError，不是程序计数器。类加载泄漏去看元空间，而不是去查 pc。堆外的 DirectByteBuffer 看直接内存，它不受 -Xmx 单独封顶。',
    task:'对照规范列出哪个区不抛 OOM；划掉“内存模型五个区=JMM”。',
    answer:'对照规范，不抛 OutOfMemoryError、也不抛 StackOverflowError 的是程序计数器：执行 Java 方法时它指向字节码，native 时未定义。划掉“内存模型五个区等于 JMM”，这五个是运行时数据区。栈帧过深才是栈溢出。方法区在 8 之后由元空间实现。',
    keywords:'程序计数器 OOM 方法区 元空间 DirectByteBuffer',
    diagram:'diagrams/jvm-pc-no-oom.svg',
    points:['程序计数器不抛 OOM 或栈溢出','栈帧过深才是 SOE','方法区现行实现是元空间，字符串池在堆'],
    deep:[
      {title:'计数器没有容量可爆',body:'每个线程有自己的程序计数器，执行 Java 方法时指向当前字节码，执行 native 时规范里是未定义。它不占用你会用 -Xss 或 -Xmx 去调的那块空间，所以既不是栈溢出也不是堆溢出的来源。真正会栈溢出的是虚拟机栈；方法区在 8 之后看元空间。'},
      {title:'怎样自己验证',body:'对照虚拟机规范的运行时数据区，标出程序计数器不抛 OutOfMemoryError。用一段无限递归，确认抛的是栈溢出而不是 pc。再把“五个区等于 JMM”划掉，JMM 是另一套内存模型。'},
    ],
    refs:[['JVM Spec：pc Register','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5.1'],['JVM Spec：Run-Time Data Areas','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5']]
  },
  {
    track:'java', group:'工程实践', id:'linux-bkl-gone',
    title:'Linux 已经没有大内核锁，内核也不再“绝对不能抢占”',
    prompt:'为什么还按 2.4/2.6 入门文把内核锁背成自旋锁加信号量加大内核锁，并说内核代码不能缺页、不能被抢占？',
    promptAnswer:'大内核锁已从主线移除。中断上下文不能睡；短临界区用自旋锁，能睡用 mutex。',
    core:'早期有过 BKL（大内核锁），主线早已去掉。现行内核同步是自旋锁、mutex、rwsem、RCU、seqlock、原子操作等，按能否睡眠、是否在中断上下文选用。2.6 引入内核抢占，后面还有实时补丁；不是 2.4 那种内核态一直占着 CPU。内核某些路径仍不能阻塞或不能缺页，但不是“内核模式一律不许缺页”。用户态与内核态、系统调用进内核，这些边界还在。申请大块连续物理内存仍然难，那是 CMA/启动预留的问题，不是再去搬 BKL 例程。',
    why:'按大内核锁去读现行 kernel/locking，lock_kernel 已经不在；再按内核绝对不能抢占去解释延迟，会对不上 2.6 起的抢占。区分信号是按能否睡眠选自旋锁或 mutex，中断上下文不能睡。',
    example:'驱动里很短、不能睡眠的临界区用 spinlock_irqsave。可能睡眠的路径用 mutex。读多写少用 RCU。中断里不要用会睡眠的信号量。不要再把 lock_kernel() 写进现行内核代码。',
    task:'对照现行内核锁定文档，划掉 BKL 作为必考现状；写出中断上下文为什么不能用会睡眠的信号量。',
    answer:'对照现行内核锁定文档，划掉 BKL 作为必考现状：大内核锁已从主线移除。中断上下文不能用会睡眠的信号量，因为睡眠会把这段中断处理停住，还可能在不可调度的路径上阻塞。短临界区用自旋锁，能睡眠的路径用 mutex。内核抢占从 2.6 起就有，不是 2.4 一直占着 CPU。',
    keywords:'BKL spinlock mutex RCU 内核抢占',
    points:['大内核锁已经从主线移除','中断上下文不能用会睡眠的锁','2.6 起内核可抢占，不是绝对占着 CPU'],
    deep:[
      {title:'按能不能睡来选锁',body:'自旋锁占着 CPU 等，适合很短、不能睡眠的临界区，中断上下文里也只能用这种。mutex 允许睡眠，用在可能阻塞的路径。读多写少可以用 RCU。大内核锁和 lock_kernel 已经不在主线里，不能再当成必考的第三把锁。'},
      {title:'怎样自己验证',body:'打开现行内核的锁定文档，确认没有大内核锁这一项，并把 BKL 从现状清单划掉。再写下一句：中断上下文不能调用会睡眠的信号量，因为睡眠会停住这段处理。2.6 起的抢占说明用来对照“内核绝对不能抢占”。'},
    ],
    refs:[['kernel：locking','https://docs.kernel.org/locking/index.html'],['kernel：preempt','https://docs.kernel.org/scheduler/preempt.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_23) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
