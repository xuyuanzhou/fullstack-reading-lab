/* Batch 21: MySQL 8 init, hash probing, pass-by-value, soft ref, no PermGen, HTML form CORS. */
const COVERAGE_JAVA_21 = [
  {
    track:'java', group:'数据库', id:'mysql-initialize-not-install-db',
    title:'8.4 用 mysqld --initialize，不是 mysql_install_db',
    prompt:'为什么按 MySQL 5.6 的 tar 包、scripts/mysql_install_db 在本机装多实例，会对不上现行手册？',
    core:'多实例仍然是：不同 datadir、port、socket、server_id，各用一份配置。但 5.6 的 mysql_install_db 在 8.0 已移除，现行是 mysqld --initialize 或 --initialize-insecure 写数据目录。包名、默认路径和空密码策略都变了。sql_mode 默认也不是当年那串。多实例不要共用一份 my.cnf 却改不全 socket。5.6 的操作记录只能当历史，不能当 8.4 步骤。',
    why:'按 5.6 的 scripts/mysql_install_db 去装 8.4，脚本已经不在，或者初始化出的数据目录用旧步骤登不进去。区分信号是现行初始化命令是 mysqld --initialize，多实例还要各自一份 datadir、端口、socket 和 server_id。',
    example:'在 8.4 的安装里找不到 mysql_install_db。改为 mysqld --initialize --datadir=/var/lib/mysql-3306，再为 3307 换一个数据目录和 defaults-file。两个实例的 port、socket、server_id 都不同，客户端用各自的 socket 连接，不会写进对方的数据目录。',
    task:'对照 8.4 数据目录初始化文档，划掉 mysql_install_db；列出多实例必须分开的四项。',
    answer:'对照 8.4 的数据目录初始化文档，划掉 mysql_install_db，预测现行步骤是 mysqld --initialize 或 --initialize-insecure。多实例必须分开的四项是 datadir、port、socket、server_id。不要把 5.6 的路径和空密码步骤拿来用。',
    keywords:'MySQL initialize mysql_install_db 多实例 datadir',
    points:['8.0 起不再用 mysql_install_db','多实例必须分开数据目录、端口、socket 和 server_id','5.6 安装笔记不能当 8.4 步骤'],
    deep:[
      {title:'每个实例一份身份',body:'初始化写的是这一份数据目录，不是一个全局的旧脚本。端口、socket 和 server_id 有一个共用，客户端或复制就会串到另一个实例。配置文件也要各自指定，不能只改其中一行。'},
      {title:'怎样自己验证',body:'打开 8.4 初始化文档，确认命令是 mysqld --initialize，并把 mysql_install_db 划掉。再列出两套 datadir、port、socket、server_id，用各自的 socket 连接，应进入不同实例。'},
    ],
    refs:[['MySQL：Initializing the Data Directory','https://dev.mysql.com/doc/refman/8.4/en/data-directory-initialization.html'],['MySQL：Multiple Windows Servers','https://dev.mysql.com/doc/refman/8.4/en/multiple-windows-servers.html']]
  },
  {
    track:'java', group:'算法', id:'hash-open-addressing-probe',
    title:'开放定址不是“冲突了就放右边那个空位”',
    prompt:'为什么把 Hash 冲突的开放定址只写成“放到冲突位置的下一个空位”会丢探测序列？',
    core:'开放定址在表内找空槽，探测序列可以是线性探测、二次探测、双重散列，不是固定“下标 +1”。装载因子高时线性探测会堆积。链地址是每个槽一条链表（或树），Java 8 HashMap 在链表过长时转红黑树。AVL 任一节点左右高度差绝对值不超过 1；红黑树保证最长路径不超过最短的两倍，插入删除通常旋转更少。快排、堆排、希尔不稳定，插入/冒泡/归并稳定，见 `algo-stable-sort`。',
    why:'把开放定址只写成放到右边下一个空位，二次探测和双重散列的序列写不出来，也解释不了冲突之后为什么还要另算步长。区分信号是线性探测才是每次加 1，链地址则根本不在表里找下一个空槽。步长变了，下一个槽就不是右边那位。',
    example:'键算出槽 h。线性探测看 h、h+1、h+2。二次探测按平方步长离开 h。双重散列用另一个散列函数当步长，依次是 h、h+h2、h+2h2。Java 的 HashMap 不走这套，同一桶的链太长时变成 TreeNode，空槽探测用不上。',
    task:'写出三种开放定址探测；对照 HashMap 说明链地址在 Java 里何时成树。',
    answer:'三种开放定址探测是线性探测、二次探测和双重散列，预测不只有下标加 1。对照 HashMap：它用链地址，同一桶上的链表过长时转成树，而不是在数组里按探测序列找空槽。AVL 的高度差更严，红黑树的增删通常更便宜。线性探测才是依次加一，另外两种要按自己的步长写出下标。',
    keywords:'开放定址 线性探测 链地址 HashMap AVL 红黑树',
    points:['开放定址有线性、二次、双重散列等探测','链地址是槽上的链表或树','AVL 高度差≤1，红黑树最长不超过最短两倍'],
    deep:[
      {title:'空槽要按序列找',body:'开放定址的下一次位置由探测方法决定，线性、二次和双重散列不是同一个加 1。装载因子高时线性探测会连成一片。链地址把冲突留在槽上的链表或树里。三种序列要能各自写出来。'},
      {title:'怎样自己验证',body:'写下线性、二次、双重散列各看哪些下标。再打开 HashMap 的冲突处理，确认同一桶链表过长会变成树，而不是按开放定址去找下一个空槽。树化发生在桶上的长链表，不是空槽探测。'},
    ],
    refs:[['CLRS：Hash tables','https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/'],['HashMap','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-pass-by-value',
    title:'Java 只有值传递，对象看起来被改是因为复制了引用',
    prompt:'为什么说“对象是引用传递、基本类型是值传递”会和 JLS 打架？',
    core:'方法参数一律复制一份值。基本类型复制的是数值；引用类型复制的是引用，两边指向同一堆对象，所以能改对象字段，但不能让调用方的变量改指向另一个对象。把参数赋成 null 或 new 另一个实例，调用方看不到。这不是引用传递（那种会改变调用方变量本身）。swap 里对调的是方法栈上的两份引用，返回之后调用方的变量指向谁并没有变。能看见的修改只发生在副本和调用方共同指向的那个对象上，例如清空列表里的元素。这和会改写调用方变量本身的引用传递不是同一规则。调用方的那个变量本身不会被改写。',
    why:'把对象说成引用传递，于是写 swap 去交换两个变量，方法里的引用对调了，调用方的两个变量仍指向原来的对象。区分信号是 clear 能改到同一份列表，把参数重新赋值却改不到调用方变量。',
    example:'调用方持有含 "a" 的列表。clear(xs) 里执行 xs.clear()，返回后列表是空的。rebind(xs) 里执行 xs = new ArrayList<>()，返回后调用方仍是原来那份、里面没有被换成新列表。两次传入的都是引用的副本。',
    task:'写一个改字段成功、改绑定失败的例子；对照 JLS 说明复制的是什么。',
    answer:'改字段的例子是对传入的列表 clear，预测调用方看到空列表。改绑定的例子是把参数赋成新的 ArrayList，预测调用方变量仍指向原列表。对照参数求值：复制的是值，引用类型复制的是那个引用，不是调用方变量本身。swap 两个参数预测叫不动调用方的变量。',
    keywords:'Java 值传递 引用 堆 JLS',
    points:['参数传递复制的是值','引用的副本仍指向同一对象','给参数重新赋值不影响调用方变量'],
    deep:[
      {title:'复制的是引用这个值',body:'基本类型复制数值，改参数不影响外面。引用类型复制的是地址，所以字段改动两边都看得见。把参数指到新对象或 null，只改了方法里的那一份地址。null 赋值同样只影响方法里的那一份。'},
      {title:'怎样自己验证',body:'写 clear 和重新赋值两个方法。调用 clear 后原列表应变空。调用重新赋值后，调用方变量应仍指向原来的列表。对照语言规范，传入的是值的副本。两次调用传入的都是引用值的副本。'},
    ],
    refs:[['JLS：Evaluation of Arguments','https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.4.1']]
  },
  {
    track:'java', group:'JVM', id:'java-soft-ref-not-oom-proof',
    title:'软引用会在内存紧时清，但不能写成 OOM 前一定清光',
    prompt:'为什么说“发生 OOM 时肯定已经没有软引用”会过满？',
    core:'强引用可达就不会因 GC 丢掉。软引用适合内存敏感缓存，收集器在快要内存不够时倾向于清掉。弱引用在下一次标记时通常不再保活对象。虚引用用于回收后通知。规范并不保证“OOM 抛出之前软引用集合为空”：分配巨大数组、直接内存、或清软引用仍不够时，仍会 OOM。弱引用也不是“一个 GC 周期后物理内存一定已经还”。真正的堆缓存要有容量和过期，不能只靠软引用。',
    why:'把缓存全换成 SoftReference 就以为不会再 OOM，一次巨大的数组分配或堆外内存照样把进程打满。区分信号是软引用只是内存紧时倾向被清掉，不是抛出 OOM 之前保证已经一个不剩。',
    example:'图片用 SoftReference 缓存，堆变紧时这些图片会先被回收。接着分配一块巨大的 byte 数组，清掉软引用仍然不够，抛出 OutOfMemoryError。直接内存耗尽时同样可以失败，此时不能从软引用集合为空推出一定没有 OOM。',
    task:'对照 SoftReference 文档，划掉“OOM 时必无软引用”；列出一种软引用帮不上的 OOM。',
    answer:'对照 SoftReference 文档，划掉 OOM 时肯定已经没有软引用。一种软引用帮不上的 OOM，是一次分配远远大于剩下的堆，清掉软引用后仍不够，或者失败发生在直接内存而不是这块 Java 堆。直接内存耗尽时，软引用缓存预测帮不上忙。',
    keywords:'SoftReference WeakReference PhantomReference OOM',
    points:['强引用可达则不会因 GC 丢掉','软引用适合内存敏感缓存，不保证消掉一切 OOM','弱引用不保活，也不等于立刻释放'],
    deep:[
      {title:'倾向清除不是事先清光',body:'强引用还在的对象不会因为软引用策略被丢掉。软引用适合可丢的缓存。规范允许在内存不够时清除它们，但巨大分配和堆外内存仍会失败。弱引用连这点缓存语义都不提供。巨大数组在清除软引用后仍可能分配失败。'},
      {title:'怎样自己验证',body:'对照 SoftReference 的说明划掉 OOM 时必无软引用。准备一批软引用缓存后再分配一块远大于剩余堆的数组，预测仍然 OOM。堆外分配打满时，软引用同样挡不住。'},
    ],
    refs:[['SoftReference','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ref/SoftReference.html'],['WeakReference','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ref/WeakReference.html']]
  },
  {
    track:'java', group:'JVM', id:'jvm-no-permgen-hotspot',
    title:'HotSpot 没有永久代了，MaxPermSize 调了也没用',
    prompt:'为什么还把分代写成年轻代、年老代、永久代，并用 -XX:MaxPermSize 防 Hibernate 爆 Perm？',
    core:'年轻代 Eden + 两个 Survivor、老年代，这条还在。HotSpot 的永久代在 JDK 8 去掉，类元数据进 Metaspace，默认可吃本地内存，用 MaxMetaspaceSize 设上限，见 `jvm-method-area-metaspace`。资料里 Survivor“可以配置成多个”不是现行 HotSpot 的默认模型，就是两个。Full GC 不再有 Perm 被写满这一条。Serial/Parallel/G1/ZGC 的停顿模型也不要背成 JDK 5 的增量收集。',
    why:'还用 -XX:MaxPermSize 去防类元数据把永久代写满，这个参数会被忽略，类加载泄漏要看的是元空间。区分信号是 HotSpot 年轻代只有 Eden 和两块 Survivor，没有第三块 Survivor，也没有永久代。',
    example:'Java 21 的启动参数里写 -XX:MaxPermSize，不会再为永久代设出上限。类元数据改看 Metaspace，用 -XX:MaxMetaspaceSize=256m 才设得住。年轻代仍是 Eden 加上两块 Survivor，SurvivorRatio 调整的是这两块和 Eden 的比例，不是再加一块 Survivor。',
    task:'对照 8 以后的 GC 文档，划掉 Perm 和 MaxPermSize；写出 Survivor 在 HotSpot 里有几块。',
    answer:'对照 JDK 8 以后的 GC 文档，划掉永久代和 MaxPermSize。Survivor 在 HotSpot 里有两块，加上 Eden 构成年轻代。类元数据在元空间，上限用 MaxMetaspaceSize。Full GC 不再有永久代被写满这一条。',
    keywords:'PermGen Metaspace MaxPermSize Survivor Eden',
    points:['JDK 8 起没有永久代','类元数据在 Metaspace，用 MaxMetaspaceSize','HotSpot 年轻代是 Eden 和两个 Survivor'],
    deep:[
      {title:'类的元数据不在永久代',body:'永久代去掉之后，类元数据默认可以使用本地内存，所以要单独设 MaxMetaspaceSize。年轻代的布局仍是一块 Eden 和两块 Survivor。旧的增量收集口诀不能拿来描述现在的收集器。'},
      {title:'怎样自己验证',body:'在 JDK 8 以后的 GC 文档里划掉 Perm 和 MaxPermSize。启动参数改成 MaxMetaspaceSize，并确认年轻代是 Eden 加两块 Survivor，而不是可以再配置出第三块。'},
    ],
    refs:[['JEP 122：Remove Permanent Generation','https://openjdk.org/jeps/122'],['HotSpot GC Tuning','https://docs.oracle.com/en/java/javase/21/gctuning/']]
  },
  {
    track:'frontend', group:'浏览器', id:'html-form-cross-origin-navigate',
    title:'表单可以跨源提交，CORS 拦的是脚本读响应',
    prompt:'为什么一道题问“表单可以跨域吗”，用 CORS 的对错去答会偏？',
    core:'HTML 表单 GET/POST 可以提交到另一个源，浏览器会导航或在 frame 里加载结果，这不是 XMLHttpRequest 那套 CORS。跨源表单会带简单内容类型，也是 CSRF 的老路径，要靠 SameSite Cookie 和 CSRF token，见相关安全课。脚本用 fetch 读另一个源的 JSON 才要 CORS。HTTP/1.1 连接复用是持久连接（Keep-Alive），同一连接串行请求；并发多请求靠多连接或 HTTP/2 多路复用，见 `http-connection-reuse`、`http2-multiplex`。',
    why:'用 CORS 的对错去答表单能不能跨域，会以为跨站表单根本发不出去，从而忽略 CSRF；或者给一次普通跳转去加允许头。区分信号是表单会导航到另一个源，fetch 读 JSON 才要 CORS，Keep-Alive 仍是这条连接上串行。',
    example:'页面在 https://shop.example，表单 POST 到 https://bank.example/transfer，浏览器发出请求并导航，不需要 bank 返回 CORS 头。同一页面里的脚本 fetch bank 的 JSON，没有允许头就读不到正文。这条 HTTP/1.1 连接即使复用，下一个请求也要等上一个结束，并不是多路复用。',
    task:'区分表单导航与 fetch 读正文；写出 HTTP/1.1 复用连接并不等于多路复用。',
    answer:'表单导航预测可以跨源提交，浏览器加载结果，不靠 CORS。fetch 读另一个源的正文预测要 CORS，没有允许头就读不到。HTTP/1.1 的持久连接预测仍是串行复用，并发的多路复用是 HTTP/2 的事。跨源表单还要靠 CSRF 防护。',
    keywords:'form CORS CSRF Keep-Alive HTTP/2',
    points:['表单提交可以跨源导航','CORS 针对脚本读响应','HTTP/1.1 持久连接不是多路复用'],
    deep:[
      {title:'导航和脚本读正文不是一道门槛',body:'表单 GET 或 POST 可以发到另一个源，结果是新的导航。脚本要读取那边的响应体，才进入 CORS。同一条 HTTP/1.1 连接上的请求排队发送，复用连接并不等于同时交织多个响应。'},
      {title:'怎样自己验证',body:'提交一个指向另一源的表单，请求应发出并发生导航，不必先有 CORS 头。再用 fetch 读该源的 JSON，没有允许头时应读不到正文。在一条 HTTP/1.1 连接上连续两个请求，应一个结束后才发下一个。'},
    ],
    refs:[['HTML：Form submission','https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission'],['MDN：CORS','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_21) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
