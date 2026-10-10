/* Batch 20: JVM/Mongo/Git/Effective Java/SSH/Nginx/TCP 五层. */
const COVERAGE_JAVA_20 = [
  {
    track:'java', group:'JVM', id:'jvm-platform-classloader-not-ext',
    title:'扩展类加载器在 JDK 9 起叫平台类加载器',
    prompt:'为什么还把三层加载器背成 Bootstrap / Extension / Application？',
    promptAnswer:'现行中间层叫平台类加载器，不是 Extension。jhat 也不是 Java 21 标配诊断工具。',
    core:'双亲委派仍是常见查找顺序：先问父加载器，父找不到才自己定义，避免核心类型被重复加载。JDK 9 起 Extension ClassLoader 改名为 Platform ClassLoader，负责加载平台模块，不再是 lib/ext 目录那套。Bootstrap 仍加载核心模块，App ClassLoader 加载类路径。方法区语义还在，HotSpot 里静态变量随类，和堆对象不是同一块调优旋钮，见 `jvm-method-area-metaspace`。jhat 在 JDK 9 移除，现行用 jcmd、jmap、MAT。引用计数不是 HotSpot 的存活判定。',
    why:'还把三层背成 Bootstrap、Extension、Application，到模块化 JDK 里去找 lib/ext 和 ExtClassLoader，路径已经对不上。区分信号是现行中间层叫平台类加载器；jhat 也不再是随 JDK 带上的诊断工具。',
    example:'在 Java 21 上打印 ClassLoader.getPlatformClassLoader()，得到的是平台类加载器，而不是 ExtClassLoader。应用类在系统类加载器里，核心类型仍由引导加载器定义。再输入 jhat，现行 JDK 里没有这个命令，堆转储改用 jcmd 或 jmap。',
    task:'对照 ClassLoader 文档写出三层现行名字；划掉 jhat 作为 21 的标配工具。',
    answer:'对照 ClassLoader 文档，三层现行名字是引导类加载器、平台类加载器、应用类加载器。划掉 jhat 作为 Java 21 的标配工具，诊断改用 jcmd、jmap 或 MAT。查找顺序仍是先问父加载器。不要再把 ExtClassLoader 写成现行中间层的名字。',
    keywords:'ClassLoader PlatformClassLoader 双亲委派 JDK 9 jhat',
    diagram:'diagrams/jvm-classloaders.svg',
    points:['常见查找仍先委派给父加载器','JDK 9+ 是 Platform ClassLoader 不是 Extension','jhat 已移除，存活判定不是引用计数'],
    deep:[
      {title:'中间层换了名字也换了目录',body:'双亲委派的查找顺序还在。JDK 9 起不再用扩展目录那一套，平台类加载器负责平台模块。把 jhat 写进运维手册会在现行 JDK 上找不到命令。lib/ext 那套目录已经不该出现在步骤里。'},
      {title:'怎样自己验证',body:'打印平台类加载器和应用类加载器，中间层名字应是 Platform 而不是 Extension。在 Java 21 的环境里执行 jhat，应找不到这个标配命令。堆转储改用 jcmd 或 jmap。'},
    ],
    refs:[['ClassLoader','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ClassLoader.html'],['JEP 261：Module System','https://openjdk.org/jeps/261']]
  },
  {
    track:'java', group:'JVM', id:'jvm-jmm-not-runtime-areas',
    title:'JMM 不是堆、栈、方法区那张图',
    prompt:'为什么把“主内存和本地内存”画进 JVM 运行时数据区会混？',
    promptAnswer:'运行时数据区是堆、栈、方法区等；JMM 的主内存/工作内存是另一套抽象。-Xmx 对应的是堆。',
    core:'运行时数据区（pc、虚拟机栈、堆、方法区）是 JVM 规范里的内存结构，见 `jvm-areas`。Java 内存模型（JMM）规定共享变量如何在线程之间变得可见：抽象的主内存与每线程工作内存、happens-before、禁止哪些重排序。工作内存对应缓存、寄存器和编译器优化，不是再分出去的第三块堆。两者可以同时考，但不能画成一张“JVM 内存模型 = 堆+栈+主内存”。线程通信是刷新到主内存再读，这是 JMM 的可见性故事，不是 malloc 分区。',
    why:'把主内存画进堆、栈、方法区那张图，调大 -Xmx 也解决不了别的线程看不见写入；用 JMM 去解释栈溢出，也对不上栈帧。区分信号是 -Xmx 只对应堆，工作内存不是再划出来的一块堆。',
    example:'线程 A 写一个没有安全发布的共享标志，线程 B 仍看见旧值，这是 JMM 的可见性，不是堆太小。把 -Xmx 加大后，B 还是可能看不见。StackOverflowError 来自虚拟机栈的帧太深，对不上主内存和工作内存那两个抽象。',
    task:'分别列出运行时数据区的名字和 JMM 的主内存/工作内存；标出哪一组能对应 -Xmx。',
    answer:'运行时数据区列出程序计数器、虚拟机栈、堆、方法区。JMM 列出抽象的主内存和每线程工作内存。能对应 -Xmx 的是堆，属于运行时数据区，不是工作内存。不要把这两组画成同一张分区图。加大堆也解决不了另一个线程看不见这次共享写入的问题，可见性仍在。',
    keywords:'JMM happens-before 运行时数据区 主内存',
    diagram:'diagrams/jvm-jmm-split.svg',
    points:['运行时数据区是 pc、栈、堆、方法区','JMM 是可见性与重排序的抽象','工作内存不是第三块堆'],
    deep:[
      {title:'一张图只画一种东西',body:'运行时数据区回答对象和帧放在哪。JMM 回答写入何时对别的线程可见、哪些重排被禁止。工作内存对应缓存、寄存器和编译器的优化，不能当成第三块用 -Xmx 调整的堆。'},
      {title:'怎样自己验证',body:'一边写下 pc、栈、堆、方法区，另一边写下主内存和工作内存。标出 -Xmx 只落在堆上。再写一个缺少可见性的标志位，加大堆后另一个线程仍可能看不见这次写入。栈溢出要对虚拟机栈，不要对工作内存。'},
    ],
    refs:[['JLS：Memory Model','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.4'],['JVM Spec：Run-Time Data Areas','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5']]
  },
  {
    track:'java', group:'数据库', id:'mongo-bson-use-lazy',
    title:'MongoDB 存的是 BSON，use 也不会立刻建库',
    prompt:'为什么把 Mongo 说成“JSON 文档、use 即建库、数据都在内存里”会偏？',
    promptAnswer:'BSON 是带有日期、二进制等类型的二进制文档，JSON 只是给人看的文本投影。',
    core:'磁盘上的文档是 BSON，JSON 只是人看的投影。use mydb 只是切换当前库名，真正创建发生在第一次写入集合。WiredTiger 有缓存，不是整库常驻内存。不是任意字段都能建任意索引，文本、通配、TTL 各有限制。多文档事务见 `mongo-multi-doc-txn`。S3 是对象存储，不能当 Mongo 同类的 Key-Value 数据库例子。mongod 默认端口 27017、数据目录可配，这些题干仍对。',
    why:'把 Mongo 说成存 JSON、use 就建库，空库在 show dbs 里找不到，日期字段也会被当成普通字符串来比。区分信号是 use 之后没有写入时库还不存在，第一次 insert 之后才出现，磁盘上是 BSON。',
    example:'mongo shell 里执行 use demo，接着 show dbs，列表里没有 demo。再执行 db.c.insertOne({})，show dbs 出现 demo。同一文档里的日期用 BSON Date 保存，而不是一段 JSON 文本；WiredTiger 的缓存也不是整库都在内存里。',
    task:'对照手册写出 BSON 与 JSON 的差别；说明 use 之后何时出现在 show dbs。',
    answer:'对照手册：BSON 是带有日期、二进制等类型的二进制文档，JSON 只是给人看的文本投影。use 只切换当前库名，预测 show dbs 里还没有它；第一次写入集合之后，预测这个库才出现。空库不会因为 use 就出现，日期也不是 JSON 字符串。',
    keywords:'MongoDB BSON use WiredTiger 索引',
    points:['磁盘文档是 BSON 不是 JSON 文本','use 只切换名字，第一次写入才建库','WiredTiger 缓存 ≠ 全部数据只在内存'],
    deep:[
      {title:'名字切换不会产生库',body:'use 只改变 shell 当前要操作的库名。真正创建发生在第一次插入或其他写入。磁盘格式是 BSON，所以有 JSON 里没有的类型。缓存页在内存里，不表示整库常驻内存。'},
      {title:'怎样自己验证',body:'对照 BSON 类型表，指出日期不是 JSON 字符串。在空实例上 use demo 后立刻 show dbs，不应出现 demo。insertOne 一个文档后再 show dbs，demo 应出现。'},
    ],
    refs:[['MongoDB：BSON','https://www.mongodb.com/docs/manual/reference/bson-types/'],['MongoDB：use','https://www.mongodb.com/docs/manual/reference/mongo-shell/']]
  },
  {
    track:'java', group:'工程实践', id:'git-restore-over-checkout',
    title:'恢复文件用 git restore，checkout 不再一身二职',
    prompt:'为什么还把“git checkout 文件”当成恢复工作区的标准答案？',
    promptAnswer:'还原文件用 restore，切分支用 switch。checkout 旧写法仍能跑，不再当标准答案。',
    core:'旧资料用 checkout 兼做切换分支和还原文件，容易把未提交改动弄丢。Git 2.23 起用 git switch 切分支、git restore 还原工作区或暂存区。git restore --staged 对应旧的 git reset 文件；git restore 工作区对应旧的 checkout 文件。git add -A 包含删除，git add . 不一定同样范围。config --global 与 --local 分层仍对。',
    why:'还用 checkout 既切分支又还原文件，还原文件的写法容易把未提交的改动弄丢，或把文件路径当成了分支名。区分信号是改乱工作区用 restore，换分支用 switch，两件事不再共用一个命令。',
    example:'README 有未提交的修改，执行 git restore README.md，工作区回到已跟踪的内容，当前分支不变。git restore --staged README.md 只取消暂存。要离开当前分支时执行 git switch main，而不是再靠 checkout 兼做这两件事。',
    task:'对照 Git 2.23 发行说明，写出 restore 与 switch 分别替换 checkout 的哪一类用途。',
    answer:'对照 Git 2.23 的说明：restore 替换的是 checkout 里还原工作区或暂存区文件的那一类用途。switch 替换的是 checkout 里切换分支的那一类用途。旧的 checkout 仍能执行，但不要再当标准答案。checkout 旧写法仍能跑，但不要再当成标准步骤。',
    keywords:'git restore git switch checkout add -A',
    points:['2.23 起 restore 还原、switch 切分支','checkout 旧命令仍在，但职责混杂','add -A 与 add . 范围不同'],
    deep:[
      {title:'还原和切分支拆开',body:'restore 默认改工作区，加 --staged 才动暂存区。switch 只负责分支。继续用 checkout 做这两件事，参数一混就会动到没打算动的文件或分支。'},
      {title:'怎样自己验证',body:'改乱一个已跟踪文件，用 git restore 文件名，分支应不变、工作区回到原内容。再用 git switch 换到另一分支，文件还原不应靠这次切换来完成。对照 2.23 说明核对这两类替换。'},
    ],
    refs:[['Git 2.23 release notes','https://github.blog/2019-08-16-highlights-from-git-2-23/'],['git restore','https://git-scm.com/docs/git-restore']]
  },
  {
    track:'java', group:'Java 基础', id:'java-finalize-not-guaranteed',
    title:'finalize 不保证会跑，资源用 try-with-resources',
    prompt:'为什么 Effective Java 里“避免终结方法、用 try/finally”在现行 JDK 还要再改一刀？',
    promptAnswer:'finalize 不保证会跑。释放资源用 try-with-resources（AutoCloseable），不要靠终结方法。',
    core:'终结（finalization）指 Object.finalize。JEP 421 把它标成弃用并准备移除：不保证会跑，也不保证及时，还可能把对象重新救活。释放资源用 try-with-resources，资源实现 AutoCloseable，离开 try 就调用 close。Cleaner 只能当后备。空集合返回 List.of() 或 Collections.emptyList()，不要返回 null。',
    example:'用 try (InputStream in = Files.newInputStream(path)) 读完，离开代码块时 close 被调用，描述符马上释放。若改成重写 finalize 里 close，循环打开大量文件时，终结还没跑，进程先抛出打开文件过多。JEP 421 已把这条路标成要移除。',
    task:'对照 JEP 421，划掉 finalize 作为释放资源的方案；写出 try-with-resources 的接口约束。',
    answer:'对照 JEP 421，划掉 finalize 作为释放资源的方案，它不保证会跑，也不能保证及时。try-with-resources 要求资源实现 AutoCloseable，离开块时调用 close。空集合返回空实例，不要返回 null。',
    keywords:'finalize JEP 421 try-with-resources AutoCloseable Cleaner',
    points:['finalize 不保证执行，已被弃用','资源用 try-with-resources','返回空集合而不是 null'],
    deep:[
      {title:'关闭发生在离开代码块时',body:'AutoCloseable 的 close 由 try-with-resources 调用，和对象何时被回收无关。finalize 可能很晚、可能不跑，还可能把对象重新救活。Cleaner 只能当后备，不能当主路径。'},
      {title:'怎样自己验证',body:'对照 JEP 421 把 finalize 从释放方案里划掉。写一段 try-with-resources 打开文件，离开块后描述符应已关闭。资源类型应实现 AutoCloseable，而不是依赖终结方法。'},
    ],
    refs:[['JEP 421：Deprecate Finalization for Removal','https://openjdk.org/jeps/421'],['AutoCloseable','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/AutoCloseable.html']]
  },
  {
    track:'java', group:'安全', id:'sshd-rate-limit-not-lastb',
    title:'SSH 防爆破用 sshd 和限流，不要靠 lastb 对时分',
    prompt:'为什么“每分钟 lastb 计数超过 10 就 iptables DROP”看起来能用，其实不可靠？',
    promptAnswer:'靠 lastb 计数再 iptables 不可靠。先关密码登录并限 MaxAuthTries，再用 Fail2ban 一类组件。',
    core:'公开 SSH 应先禁密码、改用密钥、关掉 root 密码登录，再用 sshd 的 MaxAuthTries、登录限速或 Fail2ban 一类工具按日志封禁。用 lastb 拼当前 locale 日期再 grep，时区和格式一变就失效，也赶不上突发。iptables 与 firewalld 混用会互相覆盖。不要把“写一段扫描失败日志的脚本”当成唯一防线。配置层限流即可，不必手写解析器。',
    why:'每分钟用 lastb 对日期再去封 IP，脚本漏跑或日期格式一变就封不到人，爆破可以在这一分钟里完成。区分信号是 sshd 自己限制认证次数，封禁看现成的失败日志组件，而不是 grep 当前时分。',
    example:'lastb 在另一种 locale 下日期格式变了，grep 今天的月日匹配不到任何行，iptables 什么也没封。同一台把 PasswordAuthentication 设为 no，PermitRootLogin 设为 prohibit-password，并启用 Fail2ban 的 sshd jail，失败登录按 jail 规则封禁，不再解析 lastb 的日期。',
    task:'列出比 lastb 脚本更稳的两层：sshd 配置与现成封禁工具；说明日期 grep 会在哪失效。',
    answer:'比 lastb 脚本更稳的两层：sshd 关掉密码登录并限制 MaxAuthTries；再用 Fail2ban 或同等组件按日志封禁。日期 grep 会在时区或 locale 把 lastb 的时间格式改掉时失效，一分钟对不上就永远封不到。',
    keywords:'sshd MaxAuthTries Fail2ban 密钥登录',
    points:['先密钥登录，关掉密码和 root 密登','用 sshd 限次或 Fail2ban，不要 grep lastb 日期','iptables 与 firewalld 不要混用'],
    deep:[
      {title:'认证策略比扫日志更早生效',body:'先只允许密钥，root 不要密码登录。次数限制放在 sshd 里，封禁交给专门读失败日志的工具。自己拼日期去改防火墙，格式一变就空转，还会和 firewalld 互相覆盖。'},
      {title:'怎样自己验证',body:'写下 sshd 的密钥登录和次数限制，以及 Fail2ban 一类封禁，这两层不应依赖 lastb。把系统 locale 改掉后再 grep lastb 的日期，原来的匹配应失效。'},
    ],
    refs:[['sshd_config','https://man.openbsd.org/sshd_config'],['Fail2ban','https://github.com/fail2ban/fail2ban']]
  },
  {
    track:'java', group:'Nginx', id:'nginx-limit-req-not-iptables-loop',
    title:'刷接口用 limit_req，不要每分钟 reload 防火墙',
    prompt:'为什么“tail 日志按分钟统计，超 200 就 firewall-cmd --reload”会把站点打得更卡？',
    promptAnswer:'应用层限流用 limit_req，不要靠扫日志再 reload 防火墙当第一刀。',
    core:'Nginx 应用层用 limit_req、limit_conn 按 IP 限速，失败直接 503，不必动主机防火墙。资料脚本每封一个 IP 就 --permanent 再 --reload，控制面抖动比攻击还卡。tail -n5000 会漏掉更大日志，日期 grep 也脆。WAF 或前面的 CDN 限流更适合公网。已有 `nginx-limit-req` 讲令牌桶；这里强调不要用防火墙循环当第一刀。',
    why:'按分钟 tail 日志，超了就 firewall-cmd --reload，每次重载都会冲击正常连接，站点比被刷时更卡。区分信号是 limit_req 在 Nginx 里直接对超额请求回 503，防火墙规则不用按分钟重载。',
    example:'脚本每分钟统计访问日志，把一个 IP 写进 firewalld 再 --reload，正在使用的连接被打断。改成 limit_req_zone 按地址限速，超额请求直接 503，正常 IP 的连接不被重载切断。tail 固定行数时，更大的日志还会把更早的攻击漏掉。',
    task:'对照 ngx_http_limit_req_module，写出比 firewall reload 循环更合适的一层。',
    answer:'对照 limit_req 模块，更合适的一层是在 Nginx 按客户端地址限速，超额直接拒绝，而不是循环把 IP 写进防火墙再 reload。应用层限流失败时返回 503。公网边缘还可以放到 CDN，但仍不要靠重载防火墙当第一刀。正常连接不应因为一次封禁而被 reload 打断。',
    keywords:'Nginx limit_req firewalld 限流',
    points:['应用限流用 limit_req，不是 iptables 循环','每次 --reload 会冲击正常连接','tail 固定行数会漏日志'],
    deep:[
      {title:'限速发生在反向代理上',body:'limit_req 用共享区记每个地址的速率，超过的请求就地拒绝。firewall reload 动的是主机连接表，正常用户会被一起打断。固定 tail 行数还会漏掉更早的日志。'},
      {title:'怎样自己验证',body:'对照 ngx_http_limit_req_module 写上按地址的速率和突发。对同一 IP 打超限请求，应收到拒绝，且没有执行 firewall reload。其它 IP 的已有连接应保持。'},
    ],
    refs:[['ngx_http_limit_req_module','https://nginx.org/en/docs/http/ngx_http_limit_req_module.html']]
  },
  {
    track:'frontend', group:'网络与安全', id:'tcp-is-l4-not-http-handshake',
    title:'TCP 在传输层，三次握手不是 HTTP 的七层',
    prompt:'为什么把“HTTP 的七层实现（或者叫三次握手）”写在同一道题里会错位？',
    promptAnswer:'五层里 TCP 在传输层，HTTP 在应用层。划掉 HTTP 七层实现叫三次握手：三次握手建立的是 TCP 连接，发生在请求行之前。',
    core:'TCP 属于传输层。常见教学用四层或五层（物理、链路、网络、传输、应用）把 HTTP 放在应用层；OSI 才是七层，且 HTTP 不是第七层的别名。三次握手是 TCP 连接建立，四次挥手是断开，发生在 HTTP 请求之前。TLS 在传输之上再包一层。不要把 OSI 七层、TCP 握手和 HTTP 方法背成同一件事。资料里“TCP 属于传输层、HTTP 在应用层”那句是对的。',
    why:'把 HTTP 的七层实现和三次握手写成同一件事，端口、证书和请求行会搅在一起，握手失败时还去查 HTTP 状态码。区分信号是连 443 时先完成 TCP，再有 TLS 和 GET；握手没完成时根本没有状态码。',
    example:'浏览器访问 https 页面，先在传输层做 TCP 三次握手连上 443，再握手 TLS，最后才发送 GET /。把 SYN 丢掉，连接建不起来，开发者工具里没有 200 或 500。四次挥手也是这条 TCP 连接的断开，不是 HTTP 方法。',
    task:'画出五层里 TCP 与 HTTP 的位置；划掉“HTTP 七层实现叫三次握手”。',
    answer:'五层里 TCP 在传输层，HTTP 在应用层。划掉 HTTP 七层实现叫三次握手：三次握手建立的是 TCP 连接，发生在请求行之前。OSI 的七层是另一套模型，不能当成 HTTP 的别名。握手失败时，预测还没有任何 HTTP 状态码可以看。',
    keywords:'TCP 三次握手 OSI 五层 HTTP',
    points:['TCP 是传输层协议','三次握手建立 TCP 连接，不是 HTTP 语义','OSI 七层与教学五层不要混成 HTTP 的别名'],
    deep:[
      {title:'先有连接，才有请求行',body:'教学上的五层把 TCP 放在传输层，把 HTTP 放在应用层。三次握手和四次挥手都属于这条连接。TLS 夹在中间。没有连接时，应用层的状态码还不存在。TLS 也在请求行之前，不属于 HTTP 方法。'},
      {title:'怎样自己验证',body:'画出物理、链路、网络、传输、应用，把 TCP 标在传输层、HTTP 标在应用层。再抓一次失败的握手，确认没有 HTTP 状态码。把七层实现叫三次握手那句划掉。失败的握手里不应出现 200 或 500。'},
    ],
    refs:[['RFC 9293 TCP','https://www.rfc-editor.org/rfc/rfc9293'],['MDN：OSI model vs TCP/IP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Protocol_overview']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_20) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
