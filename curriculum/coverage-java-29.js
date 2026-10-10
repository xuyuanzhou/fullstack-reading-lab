/* Batch 29: quicksort cost, HTTPS port, Tomcat NIO default, long atomicity. */
const COVERAGE_JAVA_29 = [
  {
    track:'java', group:'算法', id:'quicksort-average-nlogn',
    title:'快排平均是 n log n，最坏仍是平方，不是线性',
    prompt:'有人把快速排序复杂度直接写成 O(n)，当成最优秀所以一定是线性。为什么不对？',
    promptAnswer:'快排平均是 O(n log n)，最坏可到 O(n²)，不是线性。稳定需求不要默认这种原地划分。',
    core:'一轮分区把数组扫一遍，这一轮是 O(n)。排完还要递归左边和右边，总代价是每一层的线性扫描乘上层数。枢轴每次都把数组切成比较均衡的两半时，层数大约是 log n，平均和最好常见是 O(n log n)。枢轴每次都切在最边上，例如数组已经有序、又总拿一端当枢轴，层数变成 n，比较次数按 n² 涨。所以“最优秀”不会把整次排序变成 O(n)。原地的这种划分通常也不稳定：相等元素的先后可能变。JDK 的 Arrays.sort(int[]) 用的是双轴快排，文档说明它在许多会让单轴快排退化的数据上仍是 n log n 这一类，不能拿“对已排序的 int 数组调用 Arrays.sort”去观察教科书里的平方退化。Arrays.sort(Object[]) 用的是稳定的 TimSort，最坏也是 n log n，和基本类型不是同一套。',
    why:'按 O(n) 去估一百万个数的排序，会少算一个大约二十次的对数因子，时间预算会短一截。用 Arrays.sort 对已排序整数计时，又看不到平方，于是反过来以为教科书里的最坏情况不存在。',
    example:'八个已经有序的数，枢轴固定取第一个。第一次分区几乎没把数组切开，剩下七个还要再扫，比较次数顺着 8、7、6 往下加。同一数组若改成随机枢轴或三数取中，层数会接近三次对半。Arrays.sort 对这八个 int 不会按这个单轴走法退化。',
    task:'写出平均和最坏阶；划掉“快排复杂度是 O(n)”。',
    answer:'划掉“快排复杂度是 O(n)”。一轮分区是线性的，整次排序不是。平均、以及每次都切得比较均衡时，是 O(n log n)。枢轴总切在最边上时是 O(n²)。需要稳定顺序时不要默认这种原地划分。JDK 对对象用 TimSort，对基本类型用双轴快排，不能用 Arrays.sort 的耗时代替教科书最坏情况。',
    keywords:'quicksort n log n worst n² TimSort 稳定',
    points:['平均和最好常见 O(n log n)，不是 O(n)','最坏可退化成 O(n²)','对象排序在 JDK 里常用 TimSort'],
    deep:[
      {title:'线性的是一层，不是整棵递归',body:'每一层把当前这段扫一遍，代价跟这段长度成正比。均衡时同一层各段加起来仍是 O(n)，一共大约 log n 层。退化时每层只去掉一个元素，层数变成 n，n 乘 n 就是平方。把“分区是线性”说成“排序是线性”，少算的就是这些层。'},
      {title:'怎样自己验证',body:'写一个枢轴固定取左端的划分，对已经有序的 n 个数计数比较次数，n 取 100 和 200，次数应大约变成四倍，而不是两倍。再把枢轴改成随机或三数取中，同样的有序输入，次数应更接近 n 乘 log n 的增长。最后看 Arrays.sort 的文档：int 数组是双轴快排，对象数组是稳定归并，不要用它们的耗时否定上面那个计数。'}
    ],
    refs:[['Arrays.sort','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html#sort(int%5B%5D)'],['CLRS：Quicksort','https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/']]
  },
  {
    track:'frontend', group:'网络与安全', id:'https-port-443-not-80',
    title:'HTTPS 默认 443，HTTP 才是 80，握手也不是 HTTP 自己三次',
    prompt:'为什么把端口背成“HTTPS 80、HTTP 443”，又把 TCP 三次握手写成 HTTP 三次握手？',
    promptAnswer:'HTTP 默认 TCP 80，HTTPS 默认 TCP 443。划掉“HTTP 三次握手”：三次握手是 TCP 建连，发生在请求行之前。',
    core:'上一课已经把三次握手放在 TCP：先连上，才有后面的 TLS 和 HTTP。这一课对的是默认端口。IANA 里 http 是 TCP 80，https 是 TCP 443。浏览器或 curl 看到 https:// 且没写端口，连的就是 443；看到 http://，连的才是 80。连上 443 之后才是 TLS 的 ClientHello，不是 HTTP 请求行里再做三次握手。把 HTTPS 服务开在 80 上，对端仍按明文 HTTP 去讲，TLS 记录对不上。把明文服务开在 443 上，客户端会先发 ClientHello，服务端若当 HTTP 来读，同样对不上。握手失败时抓包应先看到 TCP 建连，再看有没有 ClientHello，而不是在 HTTP 头里找 SYN。',
    why:'按 80 去开 HTTPS 监听，证书和 ClientHello 都到不了真正在听的那个端口，现象像证书或握手坏了。端口对调之后，改密钥不会让 80 上的明文服务突然变成 TLS。',
    example:'curl -v https://example.com 的连接行是端口 443，随后出现 ClientHello。curl -v http://example.com 的连接行是端口 80，没有 ClientHello。把一个只讲 HTTP 的进程绑在 443 上，https:// 客户端会在 TLS 这一步失败。',
    task:'写出 HTTP 与 HTTPS 默认端口；划掉“HTTP 三次握手”。',
    answer:'HTTP 默认 TCP 80，HTTPS 默认 TCP 443。划掉“HTTP 三次握手”：三次握手是 TCP 建连，发生在请求行之前。TLS 在 TCP 连上 443 之后才开始。端口写反时，应看到连错端口或 ClientHello 对不上，而不是 HTTP 状态码。',
    keywords:'HTTPS 443 HTTP 80 TLS TCP handshake',
    origin:'本地库《图解网络》TCP 报文与默认端口页',
    diagram:'library-assets/illustrated-basics/network-p0028.png',
    points:['HTTP 默认 80，HTTPS 默认 443','三次握手属于 TCP 不是 HTTP','TLS 发生在 TCP 连接建立之后'],
    deep:[
      {title:'没写端口时，方案名决定连哪里',body:'https:// 默认补 443，http:// 默认补 80。地址栏里写了 :8443 这种端口，才不再用默认值。所以“服务已启动”仍要问它听的是哪一个端口，以及对端是按哪个方案去连的。两个都对，才进得了 TLS。'},
      {title:'怎样自己验证',body:'curl -v https://example.com，确认 Connected 的端口是 443，并且在 HTTP 状态之前出现 TLS 握手。再 curl -v http://example.com，端口应是 80，输出里没有 ClientHello。最后用其中一条显式写成 https://example.com:80，连接应失败在 TLS，而不是返回一张普通网页。'}
    ],
    refs:[['MDN：HTTPS','https://developer.mozilla.org/en-US/docs/Glossary/HTTPS'],['IANA Service Name and Transport Protocol Port Number Registry','https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml']]
  },
  {
    track:'java', group:'Spring', id:'tomcat-nio-not-bio-default',
    title:'现行 Tomcat HTTP 连接器默认是 NIO，不是 BIO 150 线程那套（8.5+）',
    prompt:'为什么还把 Connector 默认背成 HTTP/1.1 等于 BIO，并把 maxSpareThreads 当成必须项？',
    promptAnswer:'HTTP/1.1 默认是 NIO，不是 BIO。BIO 已移除；不要再背 maxSpareThreads 当必须项。',
    core:'Tomcat 10.1 的 HTTP 连接器文档写明：protocol 的默认值 HTTP/1.1 使用基于 Java NIO 的连接器，实现类是 Http11NioProtocol。BIO 那套 Http11Protocol 从 **8.5** 起移除，配置里不再有“默认 BlockingIO”，也没有 Tomcat 4/5 的 maxProcessors、旧 BIO 池的 maxSpareThreads。NIO 在这里管的是接受连接、用轮询挂住很多套接字。同步 Servlet 在处理期间仍要一条工作线程，直到这次请求返回。文档写的是：每个非异步请求在处理期间需要一条线程。maxThreads 默认 200，决定同时能处理多少请求。maxConnections 默认 8192，决定同时能挂住多少连接。连接可以多于线程；正在执行的同步请求不能多于 maxThreads。线程不够时，新连接还可以接到 maxConnections，再多则进 acceptCount 的操作系统队列。这和 Netty 里一条 EventLoop 把业务也轮询掉不是同一件事。把 maxThreads 调成个位数，慢请求会把能处理的并发打满，即使连接器名字里有 nio。',
    why:'按 BIO 默认去找 maxSpareThreads 或 maxProcessors，10.1 的连接器上没有这些字段，还会以为线程数就是最大连接数。把 Netty 的“一条线程很多连接”套过来，把 maxThreads 调得很小，两百个慢请求里只有几条能执行。',
    example:'Spring Boot 内嵌 Tomcat 启动日志里的 ProtocolHandler 是 http-nio-端口。同时挂上远多于 200 的空闲连接可以成功。若有 200 个请求各自在 Servlet 里不返回，第 201 个同步请求会等到有线程空出来，而不是再创建第 201 条工作线程。',
    task:'对照当前 Connector 文档，写出默认协议实现；划掉“默认 BlockingIO”。',
    answer:'划掉“默认 BlockingIO”。Tomcat 10.1 上 protocol="HTTP/1.1" 的默认实现是 Http11NioProtocol。BIO 从 8.5 起已移除，不要再配 maxSpareThreads 或 maxProcessors。同步请求处理期间仍占一条工作线程：maxThreads 默认 200，maxConnections 默认 8192。连接数可以更大，同时执行的同步请求不能超过 maxThreads。',
    keywords:'Tomcat Connector NIO Http11NioProtocol maxThreads',
    points:['Tomcat 8.5+ 默认 HTTP 连接器是 NIO','同步请求处理期间仍占一条工作线程','maxThreads 默认 200，maxConnections 默认 8192'],
    deep:[
      {title:'nio 是套接字怎么等，不是业务不用线程',body:'轮询让空闲连接不必各睡在一条线程上，所以连接数的上限看 maxConnections。请求真正进了同步 Servlet，就要从工作线程池拿一条，拿不到就等。异步 Servlet 可以在等待外部结果时把线程还回去，那是另一条写法。没写成异步时，不要用连接器的 NIO 名字推断业务已经不占线程。'},
      {title:'怎样自己验证',body:'启动当前用的 Tomcat 或 Spring Boot，日志里应出现 http-nio，而不是 bio。打开 Tomcat 10.1 的 HTTP Connector 文档，确认 HTTP/1.1 对应 Java NIO，maxThreads 默认 200，maxConnections 默认 8192，页面上没有 maxSpareThreads。再让超过 200 个请求同时停在 Servlet 里，多出来的请求应等待，而不是继续增加工作线程超过 maxThreads。'}
    ],
    refs:[['Tomcat：HTTP Connector','https://tomcat.apache.org/tomcat-10.1-doc/config/http.html'],['Tomcat 8.5 changelog','https://tomcat.apache.org/tomcat-8.5-doc/changelog.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-long-atomic-on-64bit',
    title:'64 位 Java 里 long 赋值是原子的，不要一律按两次 32 位写',
    prompt:'为什么把“32 位机器上 long 要写两次”推广成所有 JVM 里 long 都可能撕成两半？',
    promptAnswer:'规范允许把非 volatile 的 long 拆成两次写，但 64 位 HotSpot 单次写是原子的。跨线程可见仍要同步。',
    core:'语言规范 17.7（Non-Atomic Treatment of double and long）允许把一次非 volatile 的 long 或 double 写入拆成两次 32 位写，别的线程可能看见两半拼出来的第三个数。同一节规定 volatile 的 long 和 double 是原子读写。这主要留给 32 位实现。现行 64 位 HotSpot 对这两种类型的单次读写就是一次原子存储。原子只保证看见的是某一次完整写入；没有先行发生关系（JLS 17.4）时，另一个线程仍可以一直看见旧值。',
    example:'64 位 HotSpot 上两个线程无同步地写 0L 和 -1L。读到的应是这两个值之一，不应是只改了一半比特的第三个数。若读线程在写入之后仍一直打印 0L，缺的是可见性，把字段改成 volatile long 后应能看见 -1L。',
    task:'对照 JLS 17.7，写出 long 写在何种实现上可能非原子；说明 64 位服务该怎么同步。',
    answer:'JLS 17.7 允许实现把非 volatile 的 long 或 double 拆成两次 32 位写，这不是 64 位 HotSpot 的现行写法。64 位 HotSpot 上单次写是原子的，读到的应是某个线程完整写入过的值。跨线程仍要 volatile 或锁建立 happens-before，否则可以一直看见旧值。volatile long 在规范里本身就要求原子。i++ 不是单次写。',
    keywords:'JLS 17.7 long double atomic 64-bit volatile',
    points:['规范允许非 volatile 的 long 写拆成两次 32 位','64 位 HotSpot 上 long 写通常原子','可见性仍要同步，不只靠字宽'],
    deep:[
      {title:'撕裂和看不见新值留下的数不一样',body:'撕裂会造出从未存储过的比特组合，例如两个写入分别是全 0 和全 1，读到既不是 0 也不是 -1。64 位 HotSpot 上不应出现这种值。一直读到 0，说明写入没有对这个读建立可见性，数值本身仍是某一次完整写。修可见性用 volatile 或锁。不要为了第一种现象在 64 位服务里改算法，也不要因为第二种现象没出现就去掉同步。'},
      {title:'怎样自己验证',body:'java -version 应显示 64-Bit。起两个线程，一个反复把 long 字段写成 0L 和 -1L，另一个读取。读到的数应只有这两个。去掉 volatile 时，读线程可以在写入发生后仍停留在旧值上。加上 volatile 后，应能看到新值，且仍然不会出现第三个数。'}
    ],
    refs:[['JLS 17.7 Non-Atomic Treatment of double and long','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.7'],['JLS 17.4 Memory Model','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.4']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_29) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
