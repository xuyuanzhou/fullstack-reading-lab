/* Batch 32: Feign is not the load balancer, HashMap capacity, fork threads, EPOLLET. */
const COVERAGE_JAVA_32 = [
  {
    track:'java', group:'Spring Cloud Alibaba', id:'spring-cloud-feign-not-lb',
    title:'OpenFeign 是声明式客户端，负载均衡是另一层',
    prompt:'为什么把 Spring Cloud 背成 Feign 解决负载均衡、Zuul 解决跨域？',
    promptAnswer:'Feign 编 HTTP；选实例是 LoadBalancer。跨域是 CORS，不是 Zuul 专属职责。',
    core:'OpenFeign 把一个 Java 接口编成 HTTP 调用：方法、路径和参数变成请求，响应再编回返回值。它不决定这一次打到哪一台机器。按服务名调用时，现行 Spring Cloud 用 LoadBalancer 从实例名单里挑一台，更早的项目里这一层叫 Ribbon。名单从哪来是注册中心的事。网关（现行是 Gateway，旧入口是 Zuul）站在所有服务前面做路由：这条路径转到哪个服务。浏览器跨域看的是响应里的 CORS 头，例如 Access-Control-Allow-Origin。网关可以顺便加上这些头，但那不是它的本职，没经过网关的服务自己也要能发出同样的头。',
    why:'去 Feign 的注解里找负载算法，找不到。算法和实例名单在 spring.cloud.loadbalancer 上。浏览器报跨域时去改 Zuul 的路由表，Origin 对不上的那条响应头还是没有，预检依然失败。',
    example:'@FeignClient("order") 的 place 方法发出的是 HTTP。order 有三台实例时，LoadBalancer 挑其中一台，Feign 只负责把请求写到选中的地址。浏览器从另一个源调用同一接口，成功与否取决于响应有没有允许这个 Origin 的 CORS 头，而不是取决于前面有没有 Zuul。',
    task:'划掉“Feign=负载均衡、Zuul=跨域”；写出谁选实例、谁发 HTTP。',
    answer:'划掉“Feign 解决负载均衡、Zuul 解决跨域”。OpenFeign 把接口编成 HTTP 请求。选哪一台实例的是 LoadBalancer，旧项目是 Ribbon。Gateway 或 Zuul 做的是入口路由。跨域是 CORS 响应头，谁发出响应谁就要带上，不是网关的专属职责。',
    keywords:'OpenFeign LoadBalancer Ribbon Zuul Gateway CORS',
    points:['Feign 是 HTTP 客户端不是负载均衡器','选实例是 LoadBalancer（或旧 Ribbon）','Zuul/Gateway 主职是路由不是跨域'],
    deep:[
      {title:'三次失败分别停在哪一层',body:'服务名解析不到实例，查注册名单和 LoadBalancer。请求打到了某一台但路径或状态码不对，查 Feign 编出来的 HTTP。浏览器控制台写 CORS，查响应头里的 Allow-Origin 和 Allow-Methods，不要改负载算法。三层的配置项不在同一个前缀下。'},
      {title:'怎样自己验证',body:'打开一个 @FeignClient，确认方法上没有选择实例的代码。把同一服务注册成两个实例，改 spring.cloud.loadbalancer 的策略或暂时摘掉一台，看请求落到哪台，Feign 接口不用改。再用浏览器从另一个源访问，失败信息应是 CORS，响应里缺少允许该 Origin 的头；给这个响应加上该头后，负载均衡配置可以保持不动。'}
    ],
    refs:[['Spring Cloud OpenFeign','https://docs.spring.io/spring-cloud-openfeign/reference/'],['Spring Cloud LoadBalancer','https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/loadbalancer.html']]
  },
  {
    track:'java', group:'Java 基础', id:'hashmap-initial-16-not-max',
    title:'HashMap 默认容量 16，不是最大只能 16',
    prompt:'为什么把 HashMap 背成“最大承载量是 16，由 Entry[] 控制”？',
    promptAnswer:'16 只是默认初始容量。上限远更大，装载因子触发扩容后还可以继续翻倍。',
    core:'HashMap 的默认初始容量 DEFAULT_INITIAL_CAPACITY 是 16，这是桶数组一开始的长度，不是最多只能放 16 个键。最大容量 MAXIMUM_CAPACITY 是 1 左移 30 位。new HashMap<>() 刚创建时表还是空的，第一次 put 才按 16 分配。默认装载因子 0.75，所以 16 个桶在放进第 13 个键时扩到 32。能放多少受堆内存限制。',
    example:'空的 new HashMap<>() 还没有桶数组。放入第 1 个键后，表长是 16。放入第 12 个键时仍是 16。放入第 13 个键时 size 超过阈值 12，表长变成 32。继续放入不会停在 16。',
    task:'写出 DEFAULT_INITIAL_CAPACITY 与 MAXIMUM_CAPACITY；划掉“最大承载 16”。',
    answer:'DEFAULT_INITIAL_CAPACITY 是 16，只是默认初始容量。MAXIMUM_CAPACITY 是 1 << 30。划掉“最大承载 16”。第一次放入才按 16 建表，装载因子 0.75 使阈值成为 12，第 13 个键会扩到 32。之后还可以继续翻倍，上限是这个最大容量，实际还受内存限制。',
    keywords:'HashMap initial capacity 16 MAXIMUM_CAPACITY 装载因子',
    points:['16 是初始容量不是上限','上限是 2^30，超过阈值 0.75 就翻倍','第一次 put 才分配桶数组'],
    deep:[
      {title:'阈值看的是 size，不是桶的个数',body:'容量是桶数组的长度，必须是 2 的幂。阈值大约是容量乘 0.75。size 是已经放入的键数。扩容比较的是 size 和阈值，不是“某个桶里有多少个节点”。桶很长是树化那一课的条件，容量不够 64 时先扩容，两件事都说明 16 不是终点。'},
      {title:'怎样自己验证',body:'用反射读 HashMap 的 table 字段。new HashMap<>() 时它应是 null。put 第 1 个键后长度应为 16，put 到第 12 个仍为 16，第 13 个之后应为 32。源码里的 MAXIMUM_CAPACITY 应是 1 << 30。不要把第 16 个键当成放不进去的那一个。'}
    ],
    refs:[['HashMap','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html'],['OpenJDK HashMap','https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/HashMap.java']]
  },
  {
    track:'java', group:'工程实践', id:'linux-fork-copies-one-thread',
    title:'多线程进程里 fork 只复制调用它的那条线程',
    prompt:'为什么以为一个进程 20 个线程，某个线程 fork 之后子进程也有 20 条线程？',
    promptAnswer:'fork 只复制调用线程。其它线程消失后锁可能残留，子进程应尽快 exec。',
    core:'POSIX 的 fork 会复制调用时刻的地址空间，但子进程里只留下调用 fork 的那一条线程。其余线程不会在子进程里继续跑，它们正持有的互斥锁却会以“已经锁上”的状态出现在子进程里，而锁的持有者已经不在了。子进程再去要同一把锁，就会一直等。所以多线程进程里如果要 fork，子进程应马上 exec，换一套新程序。在 exec 之前只做异步信号安全的调用。单线程阶段再 fork，没有“别的线程留下的锁”这个问题。Java 里启动外部程序常用 ProcessBuilder。现行 HotSpot 在不少系统上走 posix_spawn，而不是在多线程 JVM 里裸 fork。不要用 Java 拉起的子进程去数“是不是还剩 20 条线程”，那个实验对不上这条 POSIX 规则。',
    why:'按 20 条线程去想子进程，会在子进程里等一个永远不会释放的锁，表现是莫名卡住，而不是报“线程数不对”。父进程若只看到子进程还在，也看不出消失的是哪 19 条。',
    example:'线程 A 正持有分配器的锁，线程 B 调用 fork。子进程里只剩 B。A 的锁被复制成锁定状态，却没有 A 来解锁。子进程下一次分配内存就会死等。B 若在 fork 之后立刻 exec，新程序不继承这把锁，也不会继续跑 B 的 Java 或 C 栈。',
    task:'对照 fork(2)，写出子进程有几条线程；说明为什么要尽快 exec。',
    answer:'子进程只有调用 fork 的那一条线程，不会留下原来的 20 条。其他线程消失后，它们持有的锁还在，所以子进程里再要这些锁可能死锁。应尽快 exec，在此之前只做异步信号安全的调用。这条结论来自 POSIX fork，不要用 ProcessBuilder 的子进程线程数来代替。',
    keywords:'fork thread POSIX zombie exec',
    points:['子进程只保留调用 fork 的线程','其他线程的锁可能留在子进程里','多线程里 fork 之后应尽快 exec'],
    deep:[
      {title:'地址空间复制了，线程没有',body:'子进程拿到的是调用瞬间的内存副本，所以锁变量的“已锁定”也被复制了。线程是内核调度的执行流，fork 不把其他执行流带进子进程。于是子进程看见锁，看不见会解锁的人。exec 换成新程序之后，旧地址空间连同这些锁一起消失。'},
      {title:'怎样自己验证',body:'在 Linux 上写一个 C 程序，先 pthread_create 若干线程，再在其中一条里 fork。子进程读 /proc/self/status 的 Threads，应为 1。父进程在 fork 之前应大于 1。不要在子进程里再做复杂的库调用。Java 的 ProcessBuilder 另测：它不能用来证明子进程仍有 20 条线程。'}
    ],
    refs:[['fork(2)','https://man7.org/linux/man-pages/man2/fork.2.html'],['pthreads：fork','https://man7.org/linux/man-pages/man7/pthreads.7.html']]
  },
  {
    track:'java', group:'Netty', id:'epoll-et-must-drain',
    title:'边沿触发要把缓冲读干，剩下的不会再敲门',
    prompt:'为什么在 EPOLLET 下读了 200 字节还有 300 字节，就以为剩下的会再来一次可读事件？',
    promptAnswer:'边缘触发只在状态变化时通知一次。必须非阻塞读到 EAGAIN，剩下的不会再敲门。',
    core:'epoll 默认是水平触发：套接字缓冲里只要还有数据，epoll_wait 就会再次把它放进就绪列表。加上 EPOLLET 变成边沿触发：只在状态变化时通知一次，例如缓冲从没有数据变成有数据。手册里的例子是管道里写了 2KB，第一次 epoll_wait 返回，读走 1KB，再等一次就可能一直阻塞，尽管还剩 1KB。所以 ET 要配合非阻塞描述符，一直 read，直到返回 EAGAIN，才可以回到 epoll_wait。你若规定只读 200 字节就去处理业务，剩下的 300 字节还在内核缓冲里，这次边沿已经消费掉了，不会因为“里面还有”再敲一次门。对流来说，如果你请求读的长度大于缓冲里剩下的，返回的字节数更少，说明这一下已经读干；主动只读 200 时，不能把“正好返回 200”当成读干。',
    why:'按“剩下 300 会再通知”去写 ET，连接停在半包上，对端还在等响应，epoll_wait 却不再返回这个描述符。水平触发下同样的读法还会再次就绪，所以把 LT 的经验搬到 ET 上就会静默卡住。',
    example:'套接字里有 500 字节，描述符是非阻塞的，并且注册了 EPOLLIN | EPOLLET。一次 read 只要 200 字节就返回处理业务，随后 epoll_wait 在超时内不应再报告它。循环 read 直到 EAGAIN，才能把剩下的 300 字节拿完。去掉 EPOLLET 后，只读 200 再等，epoll_wait 会马上再次返回。',
    task:'对照 epoll(7) 的 ET，写出读到何时才能停；划掉“剩下的以后会再通知”。',
    answer:'划掉“剩下的以后会再通知”。EPOLLET 只在状态变化时通知一次。描述符要非阻塞，读到 read 返回 EAGAIN 才能停。只读出 200 字节、缓冲里还留着数据，就回到 epoll_wait，剩下的不会再敲门。不加 EPOLLET 时才是只要缓冲里还有数据就继续通知。',
    keywords:'epoll EPOLLET EPOLLIN EAGAIN LT',
    points:['LT 有数据就持续通知，ET 只在状态沿上通知','ET 必须循环读到 EAGAIN','半包留在内核里不会自己再敲门'],
    deep:[
      {title:'短读有两种',body:'缓冲里只有 200 字节，你要读 500，read 返回 200，对流来说这一下已经空了。缓冲里有 500，你只要 200，read 也返回 200，里面还剩 300。ET 不会替你区分这两种返回值。停的条件是 EAGAIN，不是“这次 read 成功返回过”。'},
      {title:'怎样自己验证',body:'用非阻塞套接字注册 EPOLLIN | EPOLLET。对端一次写入 500 字节。本端只 read 200，再 epoll_wait 一个短超时，不应再次就绪。接着循环 read 到 EAGAIN，总字节数应为 500。去掉 EPOLLET 重做只读 200 的那一步，epoll_wait 应马上返回。'}
    ],
    refs:[['epoll(7)','https://man7.org/linux/man-pages/man7/epoll.7.html'],['epoll_ctl(2)','https://man7.org/linux/man-pages/man2/epoll_ctl.2.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_32) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
