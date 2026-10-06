/* Batch 29: quicksort cost, HTTPS port, Tomcat NIO default, long atomicity. */
const COVERAGE_JAVA_29 = [
  {
    track:'java', group:'算法', id:'quicksort-average-nlogn',
    title:'快排平均是 n log n，最坏仍是平方，不是线性',
    prompt:'为什么把快速排序的复杂度直接写成 O(n)，当成“最优秀所以一定是线性”？',
    core:'一轮分区是 O(n)，但还要递归左右两边。平均、最好常见是 O(n log n)，枢轴总切到最偏时退化成 O(n²)。原地快排通常不稳定，见 `algo-stable-sort`。Java 的 `Arrays.sort` 对基本类型用双轴快排变体，对对象用 TimSort（归并），不是同一套。海量外排要用归并，内存里小数组插入排序可能更快，见 `complexity`。',
    why:'按 O(n) 去估百万级排序时间，会比真实少一个对数因子，线上会卡死。',
    example:'已经有序的数组、枢轴总取第一个元素，递归深度约 n，比较次数约 n²/2。随机枢轴或三数取中才能把平均拉回 n log n。',
    task:'写出平均和最坏阶；划掉“快排复杂度是 O(n)”。',
    answer:'快排平均 O(n log n)，最坏 O(n²)。一轮分区是线性，整棵递归树不是。需要稳定排序时不要默认快排。',
    keywords:'quicksort n log n worst n² TimSort 稳定',
    points:['平均和最好常见 O(n log n)，不是 O(n)','最坏可退化成 O(n²)','对象排序在 JDK 里常用 TimSort'],
    refs:[['Arrays.sort','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html#sort(int%5B%5D)'],['CLRS：Quicksort','https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/']]
  },
  {
    track:'frontend', group:'网络与安全', id:'https-port-443-not-80',
    title:'HTTPS 默认 443，HTTP 才是 80，握手也不是 HTTP 自己三次',
    prompt:'为什么把端口背成“HTTPS 80、HTTP 443”，又把 TCP 三次握手写成 HTTP 三次握手？',
    core:'明文 HTTP 默认 TCP 80，HTTPS 默认 TCP 443。TLS 在 TCP 连上之后协商，见 `https-tls13-not-12-packets`。浏览器地址栏的跳转 302 看响应 Location。关闭连接是 TCP 四次挥手，FIN 不是 SYN。把三次握手安在 HTTP 头上会去抓 HTTP 包里的 syn 标志，什么都没有，见 `tcp-is-l4-not-http-handshake`。粘包仍要应用分帧，见 `tcp-stream-needs-framing`。',
    why:'按 80 口去开 HTTPS 监听，证书握手直接失败。',
    example:'curl https://example.com 连的是 443。http:// 才是 80。抓包先 TCP 三次握手，再 ClientHello。',
    task:'写出 HTTP 与 HTTPS 默认端口；划掉“HTTP 三次握手”。',
    answer:'HTTP 80、HTTPS 443。三次握手是 TCP 的。TLS 在 TCP 之后。',
    keywords:'HTTPS 443 HTTP 80 TLS TCP handshake',
    points:['HTTP 默认 80，HTTPS 默认 443','三次握手属于 TCP 不是 HTTP','TLS 发生在 TCP 连接建立之后'],
    refs:[['MDN：HTTPS','https://developer.mozilla.org/en-US/docs/Glossary/HTTPS'],['IANA Service Name and Transport Protocol Port Number Registry','https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml']]
  },
  {
    track:'java', group:'Spring', id:'tomcat-nio-not-bio-default',
    title:'现行 Tomcat HTTP 连接器默认是 NIO，不是 BIO 150 线程那套',
    prompt:'为什么还把 Connector 默认背成 HTTP/1.1 等于 BIO，并把 maxSpareThreads 当成必须项？',
    core:'Tomcat 8.5 / 9 / 10 的 HTTP/1.1 默认已经是 NIO（`Http11NioProtocol`），BIO 协议已移除。`maxThreads` 限制工作线程，不是“操作系统 Linux 只能 1000 连接”。`maxSpareThreads` 属于旧 BIO 池，NIO 下不要按那张 Tomcat 4/5 表去抄。APR/Native 可加速静态与 TLS，不是唯一高性能开关。Spring Boot 内嵌 Tomcat 同样走这套连接器。NIO 仍是少量线程多路复用，见 `nio-not-one-thread-per-request`。',
    why:'按 BIO 默认去把 maxProcessors 调到 800，在 10.x 配置里找不到字段，还误判阻塞模型。',
    example:'server.xml 里 protocol="HTTP/1.1" 在 8.5+ 就是 NIO。要显式阻塞得换回已被移除的 BIO。',
    task:'对照当前 Connector 文档，写出默认协议实现；划掉“默认 BlockingIO”。',
    answer:'8.5 起 HTTP 连接器默认 NIO。BIO 已移除。线程数按 maxThreads，不要抄 Tomcat 4 的 maxProcessors。',
    keywords:'Tomcat Connector NIO Http11NioProtocol maxThreads',
    points:['Tomcat 8.5+ 默认 HTTP 连接器是 NIO','BIO 协议已移除','maxSpareThreads 是旧 BIO 池参数'],
    refs:[['Tomcat：HTTP Connector','https://tomcat.apache.org/tomcat-10.1-doc/config/http.html'],['Tomcat 8.5 changelog','https://tomcat.apache.org/tomcat-8.5-doc/changelog.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-long-atomic-on-64bit',
    title:'64 位 Java 里 long 赋值是原子的，不要一律按两次 32 位写',
    prompt:'为什么把“32 位机器上 long 要写两次”推广成所有 JVM 里 long 都可能撕成两半？',
    core:'JLS 规定：非 volatile 的 long、double 的写，实现可以分成两次 32 位写。这主要影响 32 位 JVM。现行 64 位 HotSpot 上 long/double 的写是原子的。需要跨线程立刻看见完整 64 位值时，用 volatile、LongAdder 或锁，不要只靠“现在是 64 位所以一定可见”。可见性仍要 happens-before，见 `java-happens-before`。int 赋值本身原子，但 read-modify-write 不是。',
    why:'在 64 位服务上用撕裂去解释偶发错数，会漏掉真正的竞态。',
    example:'32 位 JVM 两个线程无同步写同一个 long，可能看到一半新一半旧。64 位 HotSpot 写本身原子，若还读到旧值，是可见性不是撕裂。',
    task:'对照 JLS 17.7，写出 long 写在何种实现上可能非原子；说明 64 位服务该怎么同步。',
    answer:'规范允许把 long 写成两次 32 位。64 位 HotSpot 写是原子的。跨线程仍要 volatile 或锁保证可见。',
    keywords:'JLS 17.7 long double atomic 64-bit volatile',
    points:['规范允许非 volatile 的 long 写拆成两次 32 位','64 位 HotSpot 上 long 写通常原子','可见性仍要同步，不只靠字宽'],
    refs:[['JLS 17.7 Non-Atomic Treatment of double and long','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.7'],['JLS 17.4 Memory Model','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.4']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_29) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
