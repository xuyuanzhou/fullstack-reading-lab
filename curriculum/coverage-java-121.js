/* Java 121: Nginx / 网关 / Netty。前两章用产品导论，Netty 用框架三格。 */
const COVERAGE_JAVA_121 = [
  {
    track:'java', group:'Nginx', id:'nginx-what-and-when',
    title:'Nginx 是事件驱动的 HTTP 服务器和反向代理',
    prompt:'为什么静态文件和把请求转到后面的应用，资料常先写 Nginx，而不是再写一个 Java 服务？',
    promptAnswer:'Nginx 擅长接连接、回静态文件、把请求转到上游。应用进程留给业务。',
    core:'Nginx 是事件驱动的 HTTP 服务器，也常用作反向代理（reverse proxy）。它接住客户端连接，按配置把请求回给本地文件，或转到后面的上游。请求阶段见 `nginx-request-phases`。上游超时见 `nginx-proxy-timeout`。它不是 Java 应用容器，也不代替业务里的鉴权规则。',
    why:'把页面和接口都丢给应用去接连接，静态文件和应用超时缠在一起。或反过来以为装了 Nginx 就不需要应用。',
    example:'静态页由 Nginx 回，/api 转到后面的 Spring 进程。TLS 可以在这一层结束。',
    task:'用两句话说明 Nginx 是什么、典型两件事。它是不是 Java 应用容器？',
    answer:'Nginx 是事件驱动的 HTTP 服务器和反向代理。典型是回静态文件、把请求转到上游。它不是 Java 应用容器。',
    keywords:'Nginx reverse proxy HTTP server',
    points:['Nginx 是 HTTP 服务器和反向代理','擅长静态文件和转到上游','不是 Java 应用容器'],
    deep:[
      {title:'同一进程可以兼任几问',body:'反向代理、负载均衡和一部分限速可以写在同一份配置的不同段。三问仍要分开，见 `mw-proxy-lb-gateway`。'},
      {title:'怎样自己验证',body:'打开 nginx 文档的 What is nginx，对上 HTTP server 和 reverse proxy。写一段 root 和一段 proxy_pass，分别打静态路径和 /api，确认两段配置各回各的。'},
    ],
    refs:[['nginx：What is nginx','https://nginx.org/en/docs/beginners_guide.html'],['nginx：反向代理','https://nginx.org/en/docs/http/ngx_http_proxy_module.html']]
  },
  {
    track:'java', group:'Nginx', id:'nginx-tradeoffs-capacity',
    title:'Nginx 的容量看连接和工作进程，不看一句全站并发',
    prompt:'为什么很难用一句话回答「这台 Nginx 能抗多少 QPS」？',
    promptAnswer:'没有固定全站并发。看工作进程、连接、上游超时和响应体大小，用压测。',
    core:'优点：事件驱动，适合大量连接和静态响应；配置把 TLS、静态和上游分开。代价：业务规则不在这里；配置错误会让所有流量一起偏；缓冲和超时要按上游调，见 `nginx-proxy-timeout`、`nginx-buffer-body`。容量没有万能 QPS。粗框架是：worker 进程 × 每进程连接，再减去上游变慢和响应体变大的部分。限速见 `nginx-limit-req`。',
    why:'背一个「几万并发」上线，大响应体和慢上游把工作进程占满；或不敢用 Nginx 只因说不清一个数字。',
    example:'静态页和 20 KB 的 JSON 不是同一条容量曲线。先定响应体和上游 P99，再压测，数字写在容量表里。',
    task:'写出优点两条、代价两条。容量要测量的两个变量是什么？',
    answer:'优点如大量连接和静态响应。代价如不管业务规则、超时配错影响整站。容量看连接与上游形态，用压测，不背口号。',
    keywords:'Nginx worker connection timeout capacity',
    points:['优点是连接和静态响应','代价是不管业务、配错影响面大','容量看进程、连接和上游，没有万能 QPS'],
    deep:[
      {title:'限速不是防火墙循环',body:'limit_req 在 HTTP 层按键限速，见 `nginx-limit-req-not-iptables-loop`。它不代替上游自己的配额。'},
      {title:'怎样自己验证',body:'对同一条 proxy_pass 分别回 1 KB 和 1 MB，看活跃连接和工作进程 CPU。数字应写进容量表，不写进面试口号。'},
    ],
    refs:[['nginx：Connections','https://nginx.org/en/docs/ngx_core_module.html#worker_connections'],['nginx：proxy 超时','https://nginx.org/en/docs/http/ngx_http_proxy_module.html']]
  },
  {
    track:'java', group:'Nginx', id:'nginx-vs-gateway',
    title:'Nginx 转上游，网关问这个接口让不让过',
    prompt:'已经用 Nginx 把请求转到后面，还要不要 API 网关？',
    promptAnswer:'还要看第三问：这个接口让不让过。只转上游、只选实例，还不是接口级鉴权和限流。',
    core:'反向代理回答转到哪。负载均衡回答选哪一台。API 网关回答这个接口让不让过。三问可以写在同一个程序的不同配置里，也可以拆开，见 `mw-proxy-lb-gateway`。CDN 是边缘缓存，不是源站反代的别名，见 `cdn-not-just-reverse-proxy-cache`。网关章展开路由和鉴权，见 `gateway-what-and-when`。',
    why:'装了 Nginx 就被写成已经有网关。鉴权失败和实例不健康缠在同一段配置里，排障时对不上。',
    example:'TLS 和静态文件在 Nginx。令牌校验和按路径限流在网关。实例健康检查在均衡器。',
    task:'写出三问各是什么。Nginx 默认先回答哪一问？接口级鉴权去哪一章？',
    answer:'三问是转到哪、选哪一台、接口让不让过。Nginx 默认先回答转到哪，也可以兼任后两问。接口级鉴权展开见网关章。',
    keywords:'Nginx reverse proxy load balancer API gateway',
    points:['反代回答转到哪','均衡回答选哪一台','网关回答接口让不让过'],
    deep:[
      {title:'一个程序兼任时仍要两段配置',body:'答了两问的盒子要写得出两段配置名，不能只写产品名，见 `mw-proxy-lb-gateway`。'},
      {title:'怎样自己验证',body:'画当前入口。静态 404、上游 502、令牌 401 应能标到不同段。标不到就还没把三问分开。'},
    ],
    refs:[['nginx：负载均衡','https://nginx.org/en/docs/http/load_balancing.html'],['Spring Cloud Gateway','https://docs.spring.io/spring-cloud-gateway/reference/']]
  },
  {
    track:'java', group:'网关', id:'gateway-what-and-when',
    title:'API 网关按接口做路由、鉴权和限流',
    prompt:'为什么入口除了反向代理，还常再放一个网关进程？',
    promptAnswer:'网关问的是这个 API 让不让过：按路径路由、校验令牌、按接口限流。不是只转到一台机器。',
    core:'API 网关是入口上按接口处理请求的那一跳。它按路径或谓词选路由，做鉴权、限流，再转到后面的服务。Spring Cloud Gateway 的谓词见 `gateway-route-predicate`。一跳不要既当网关又当服务内授权的全部，见 `gateway-one-hop`。和反代、均衡的三问见 `mw-proxy-lb-gateway`。',
    why:'把网关当成「又一个 Nginx」。超时、鉴权和选实例缠在一起，401 和 502 对不上。',
    example:'/orders/** 校验令牌后转到订单服务。静态 /assets 仍由前面的 Nginx 回。',
    task:'用两句话说明网关是什么、典型三件事。它是不是只负责选一台机器？',
    answer:'网关按接口做路由、鉴权和限流。典型是按路径选服务、校验令牌、按接口配额。不只是选一台机器。',
    keywords:'API gateway routing auth rate-limit',
    points:['网关按接口处理入口请求','典型是路由、鉴权、限流','不是只做选实例'],
    deep:[
      {title:'网关不在 SCA 组件清单里',body:'Spring Cloud Gateway 是独立进程。Spring Cloud Alibaba 的 BOM 不会把它装进业务服务，见 `sca-what`。'},
      {title:'怎样自己验证',body:'打开 Spring Cloud Gateway 参考首页，对上 predicates 和 filters。打一条不带令牌的 /orders，确认拦在网关，订单服务日志没有这次请求。'},
    ],
    refs:[['Spring Cloud Gateway','https://docs.spring.io/spring-cloud-gateway/reference/'],['Spring Cloud Gateway：Routing','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway/request-predicates-factories.html']]
  },
  {
    track:'java', group:'网关', id:'gateway-tradeoffs-capacity',
    title:'网关的代价是多一跳，容量按路由和过滤器估',
    prompt:'是不是入口加上网关就一定更快、更安全？',
    promptAnswer:'不是。多一跳就多一次超时和失败面。安全取决于过滤器和令牌校验，不是进程名字。',
    core:'优点：鉴权、限流和路由集中在入口；服务可以少重复写这些。代价：多一跳延迟；过滤器读 body 会缓冲，见 `gateway-body-buffer`；重试必须幂等，见 `gateway-retry-idempotent`；超时要和上下游串起来，见 `gateway-timeout-chain`。容量没有全站万能 QPS，看路由数、过滤器是否读正文、WebSocket 升级，见 `gateway-websocket-upgrade`。',
    why:'把网关画上去就当容量和安全完成。读 body 的过滤器把内存打满，或重试把写请求执行两次。',
    example:'只校验头字段的路由和必须读正文做验签的路由，不是同一条容量曲线。',
    task:'写出优点两条、代价两条。容量要看的两个变量是什么？',
    answer:'优点是集中路由和鉴权。代价是多一跳、读正文和重试。容量看路由形态和过滤器是否读 body，用压测。',
    keywords:'API gateway hop timeout filter capacity',
    points:['优点是集中路由鉴权','代价是多一跳和读正文','容量看路由和过滤器，没有万能 QPS'],
    deep:[
      {title:'鉴权仍可能要在服务内再问一次',body:'网关能拦未登录。这条订单是不是当前用户的，仍是对象级授权，见 `object-level-authz`、`gateway-auth-where`。'},
      {title:'怎样自己验证',body:'给一条路由加上读 body 的过滤器，对比延迟和内存。再给 POST 打开重试，确认只对幂等方法打开。'},
    ],
    refs:[['Spring Cloud Gateway：Global Filters','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway/global-filters.html'],['Spring Cloud Gateway：Timeout','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway/http-timeouts.html']]
  },
  {
    track:'java', group:'网关', id:'gateway-vs-proxy',
    title:'代理转连接，网关问接口，服务内还要问对象',
    prompt:'Nginx 已经转到订单服务，网关也校验了令牌，对象级权限还要不要问？',
    promptAnswer:'还要问。代理回答转到哪，网关回答这个接口让不让过，对象是不是你的仍在服务内。',
    core:'三层不要并成一句。反向代理和均衡见 Nginx 章与 `mw-proxy-lb-gateway`。网关做接口级决定。服务内授权看这条记录，见 `object-level-authz`、`gateway-one-hop`。WebSocket 升级必须在同一跳完成，见 `gateway-websocket-upgrade`。',
    why:'入口 200 就被写成「权限已经做完」。别人的订单 id 仍能读到。',
    example:'未带令牌 401 在网关。令牌有效但订单属于别人，403 在订单服务。上游挂了 502 在代理或网关的上游段。',
    task:'写出 401、403、502 各应出现在哪一问。对象级权限能不能只放在网关？',
    answer:'401 在接口鉴权，403 常在服务内对象权限，502 在转到上游失败。对象级权限不能只放在网关。',
    keywords:'reverse proxy API gateway object authorization',
    points:['代理转连接','网关问接口','对象级权限在服务内'],
    deep:[
      {title:'小系统可以兼任，三问仍要标得出',body:'一个 Nginx 或一个 Gateway 进程可以答两问。配置段必须对得上，见 `mw-proxy-lb-gateway`。'},
      {title:'怎样自己验证',body:'用别人的订单 id 带自己的令牌打接口。网关 200、服务 403，才说明两问分开了。两边都 200，对象级还没写。'},
    ],
    refs:[['Spring Cloud Gateway','https://docs.spring.io/spring-cloud-gateway/reference/'],['Spring Security：Authorization','https://docs.spring.io/spring-security/reference/servlet/authorization/index.html']]
  },
  {
    track:'java', group:'Netty', id:'netty-what-it-is',
    title:'Netty 是异步事件驱动的网络应用框架',
    prompt:'要在 Java 里自己管连接、字节和编解码，而不是先上一个 HTTP 框架，用的是哪一套？',
    promptAnswer:'用 Netty。它是异步、事件驱动的网络应用框架，用来写协议和连接，不是现成的业务 HTTP 服务器。',
    core:'Netty 是异步事件驱动的网络应用框架。它用事件循环处理连接，用管道上的处理器做编解码和业务，用 ByteBuf 管字节。事件循环见 `netty-event-loop`。管道见 `netty-pipeline-handler`。NIO 不是一条线程一个请求，见 `nio-not-one-thread-per-request`。',
    example:'管道上先解码、再处理：\n\n```text\nEventLoop → Pipeline：LengthField → 业务 Handler\n```',
    task:'用文档里的说法说明 Netty 是什么。它是不是一个开箱即用的 HTTP 业务服务器？',
    answer:'Netty 是异步事件驱动的网络应用框架。它用来写连接和协议。不是开箱即用的业务 HTTP 服务器。',
    keywords:'Netty event loop pipeline ByteBuf',
    points:['Netty 是异步事件驱动的网络框架','事件循环处理连接','管道上的处理器做编解码'],
    deep:[
      {title:'很多中间件底下是它',body:'HTTP 客户端、部分 RPC 和部分消息客户端会嵌入 Netty。业务应用通常先用 Spring 的 HTTP，而不是直接 Bootstrap。'},
      {title:'怎样自己验证',body:'打开 Netty 项目介绍，对上 asynchronous event-driven network application framework。看一份示例的 ServerBootstrap，确认先有 EventLoopGroup 再有 Channel。'},
    ],
    refs:[['Netty：Introduction','https://netty.io/wiki/user-guide-for-4.x.html'],['Netty 项目','https://netty.io/']]
  },
  {
    track:'java', group:'Netty', id:'netty-enter-bootstrap',
    title:'Bootstrap 绑定事件循环和管道，才开始接连接',
    prompt:'写好了 Handler，怎样让它开始在某个端口上收连接？',
    promptAnswer:'用 ServerBootstrap 配上 EventLoopGroup、Channel 类型和管道，再 bind 端口。',
    core:'服务端用 ServerBootstrap：指定 boss 和 worker 两组事件循环、Channel 类型，以及 ChannelInitializer 里的管道。bind 之后才接连接。事件循环线程见 `netty-event-loop`。ByteBuf 要释放，见 `netty-bytebuf-leak`。空闲检测见 `netty-idle-heartbeat`。',
    example:'绑定端口：\n\n```text\nServerBootstrap\n  group(boss, worker)\n  channel(NioServerSocketChannel)\n  childHandler(initializer)\n  bind(8080)\n```',
    task:'说明谁绑定端口。Handler 要挂在什么结构上？事件循环是什么？',
    answer:'ServerBootstrap.bind 绑定端口。Handler 挂在管道上。事件循环是处理这条连接上事件的线程。',
    keywords:'ServerBootstrap EventLoopGroup ChannelPipeline',
    points:['ServerBootstrap 绑定端口','Handler 挂在管道上','事件循环处理连接上的事件'],
    deep:[
      {title:'编解码器不要共享可变状态',body:'标注 @Sharable 的处理器必须线程安全，见 `netty-codec-shareable`。每个连接一份的解码器不要标成可共享。'},
      {title:'怎样自己验证',body:'按用户指南跑一个 echo 服务。bind 之后用客户端连上，确认 Handler 被调用。不 bind 只 new Handler，确认端口没被占用。'},
    ],
    refs:[['Netty：User guide','https://netty.io/wiki/user-guide-for-4.x.html'],['Netty：ServerBootstrap','https://netty.io/4.1/api/io/netty/bootstrap/ServerBootstrap.html']]
  },
  {
    track:'java', group:'Netty', id:'netty-not-spring-mvc',
    title:'Netty 不管控制器和事务，Spring MVC 不管字节流',
    prompt:'已经有 Spring MVC，是不是就不需要理解 Netty？反过来能不能用 Netty 代替 @GetMapping？',
    promptAnswer:'不是一回事。MVC 处理 HTTP 请求和控制器。Netty 处理连接和字节。多数业务先用 MVC；要自己写协议再下到 Netty。',
    core:'Spring MVC 的 DispatcherServlet 处理的是已经成帧的 HTTP 请求，见 `spring-mvc-dispatch`。Netty 从字节开始：拆包、心跳、水位，见 `netty-length-field-frame`、`netty-watermark-backpressure`。Tomcat 的 I/O 模型见 `tomcat-nio-not-bio-default`。不要在控制器里直接操作 ByteBuf。',
    example:'分工：\n\n```text\n订单 HTTP API     Spring MVC\n自定义二进制协议  Netty\n```',
    task:'说明 MVC 和 Netty 各从哪一层开始。业务 HTTP API 默认用哪一边？',
    answer:'MVC 从已成帧的 HTTP 请求开始。Netty 从连接和字节开始。业务 HTTP API 默认用 MVC。',
    keywords:'Netty Spring MVC HTTP protocol',
    points:['MVC 处理 HTTP 请求','Netty 处理连接和字节','业务 API 默认不直接上 Netty'],
    deep:[
      {title:'WebFlux 底下可以是 Netty',body:'反应式栈会嵌入 Netty。那是运行时选择，控制器仍按 WebFlux 的模型写，不是让你在业务方法里管 EventLoop。'},
      {title:'怎样自己验证',body:'在一个 @GetMapping 里搜 ByteBuf，不应出现。在 Netty 示例里搜 @GetMapping，也不应出现。'},
    ],
    refs:[['Spring Web MVC','https://docs.spring.io/spring-framework/reference/web/webmvc.html'],['Netty：User guide','https://netty.io/wiki/user-guide-for-4.x.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_121) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
