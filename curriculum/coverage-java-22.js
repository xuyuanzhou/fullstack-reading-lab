/* Batch 22: InnoDB hash, Hystrix, Boot WAR, Dubbo Hessian/ZK, TLS 1.3. */
const COVERAGE_JAVA_22 = [
  {
    track:'java', group:'数据库', id:'mysql-innodb-no-user-hash',
    title:'InnoDB 没有用户可建的 Hash 索引',
    prompt:'为什么把“MySQL 常见 Hash 和 B+ 树两种，InnoDB 默认 B+”说成可以给业务表建 Hash 索引？',
    promptAnswer:'主键和二级索引都是 B+ 树，CREATE INDEX ... USING HASH 不是合法的业务 DDL。',
    core:'InnoDB 二级索引和主键都是 B+ 树。用户不能 CREATE INDEX ... USING HASH 用在 InnoDB 表上。引擎内部的自适应哈希是缓冲池里的加速结构，建不出来、也关不掉成普通索引。MEMORY/HEAP 和 NDB 才提供 Hash 索引，等值快、不能按序扫描、对范围和排序无助。范围查询走 B+ 叶子链表，这点对比成立。联合索引最左前缀是 B+ 的规则，不要安到 Hash 上。',
    why:'把 InnoDB 说成可以给业务表建 Hash 索引，CREATE INDEX ... USING HASH 会写不合法。区分信号是用户索引都是 B+ 树，Hash 只出现在 MEMORY 和 NDB，自适应哈希建不出来。',
    example:'InnoDB 用户表上 KEY (email) 走的是 B+ 树：等值查找和 BETWEEN 都在同一棵有序叶子上。不要写 USING HASH，范围查询也不会因此变快。自适应哈希写不进这条 DDL。',
    task:'对照 8.4 索引类型，写出哪些引擎允许 Hash；划掉 InnoDB 用户 Hash 索引。',
    answer:'对照 8.4 的索引类型，允许用户建 Hash 索引的引擎是 MEMORY（HEAP）和 NDB。划掉 InnoDB 用户 Hash 索引：主键和二级索引都是 B+ 树，CREATE INDEX ... USING HASH 不是合法的业务 DDL。自适应哈希是缓冲池里的内部加速，建不出来，也不是第二种业务索引。',
    keywords:'InnoDB B+ Hash 自适应哈希 MEMORY',
    points:['InnoDB 用户索引是 B+ 树','Hash 索引属于 MEMORY/NDB 等，不是 InnoDB DDL','自适应哈希是内部结构，不是第二种业务索引'],
    deep:[
      {title:'B+ 和 Hash 不是可切换的 DDL',body:'InnoDB 的等值和范围都走同一棵 B+ 树的有序叶子。Hash 等值快，但不能按序扫描，所以范围和排序用不上。自适应哈希只在缓冲池里，关不掉成普通索引，也写不进建表语句。'},
      {title:'怎样自己验证',body:'打开 8.4 的 B-Tree 与 Hash 对照，确认 Hash 属于 MEMORY、NDB 一类引擎。在 InnoDB 表上尝试 USING HASH，应被拒绝。再看自适应哈希的说明，它不是 CREATE INDEX 能建出来的那种。'},
    ],
    refs:[['MySQL：Comparison of B-Tree and Hash Indexes','https://dev.mysql.com/doc/refman/8.4/en/index-btree-hash.html'],['MySQL：CREATE INDEX','https://dev.mysql.com/doc/refman/8.4/en/create-index.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-circuit-not-only-hystrix',
    title:'Spring Cloud 不是 Hystrix 说明书，断路器已换代（CircuitBreaker）',
    prompt:'为什么把 Spring Cloud 定义成 Stream 启动器，并把容错只背 Hystrix？',
    promptAnswer:'Spring Cloud 不是 Stream 启动器别名；容错也不只有 Hystrix，还有 CircuitBreaker/Resilience4j/Sentinel。',
    core:'Spring Cloud 是一套分布式系统工具（配置、发现、网关、负载均衡、熔断抽象），不是 Spring Cloud Stream 的别名，更不是 Task 的别名。Netflix Hystrix 已进入维护模式，现行常用 **Resilience4j 或 Spring Cloud CircuitBreaker**，阿里栈用 Sentinel，见既有 Sentinel 课。Eureka、Ribbon、Zuul 也大量被 Spring Cloud LoadBalancer、Gateway 替代。Feign 仍在，但是 OpenFeign。服务发现还可以是 Nacos、Consul，不是只有 Eureka。',
    why:'按 Netflix 全家桶去搭现行工程，Hystrix、Ribbon、Zuul 会停在维护模式，新依赖对不上文档。区分信号是熔断已换成 CircuitBreaker 或 Sentinel，发现也可以是 Nacos 或 Consul。',
    example:'新项目用 Spring Cloud LoadBalancer + Gateway + CircuitBreaker（Resilience4j）或 Sentinel。不要把 Hystrix 当默认作业。',
    task:'对照当前 Spring Cloud 项目页，划掉“Spring Cloud = Stream 启动器”；列出一种现行断路器。',
    answer:'对照当前 Spring Cloud 项目页，划掉“Spring Cloud = Stream 启动器”：它是配置、发现、网关、负载均衡和熔断抽象的一套工具，也不是 Task 的别名。一种现行断路器是 Spring Cloud CircuitBreaker，实现可以是 Resilience4j；阿里栈用 Sentinel。Hystrix 已进入维护模式，不要再当默认作业。',
    keywords:'Spring Cloud Hystrix Resilience4j Sentinel Eureka',
    points:['Spring Cloud 不是 Stream 或 Task 的别名','Hystrix 维护模式，改用 CircuitBreaker 或 Sentinel','发现与负载均衡也不只有 Eureka/Ribbon'],
    deep:[
      {title:'全家桶已经拆开',body:'容错不再只有 Hystrix 这一个实现。负载均衡有 Spring Cloud LoadBalancer，网关有 Gateway，发现还可以是 Nacos 或 Consul。Feign 仍在，但是 OpenFeign。把 Stream 启动器当成整个 Spring Cloud，会漏掉这些独立项目。'},
      {title:'怎样自己验证',body:'打开 Spring Cloud 项目页，确认它不是 Stream 的别名，并把 Hystrix 从默认清单划掉。再点开 CircuitBreaker 或 Sentinel 其中一页，能指出一种现行断路器即可。'},
    ],
    refs:[['Spring Cloud','https://spring.io/projects/spring-cloud'],['Spring Cloud Circuit Breaker','https://spring.io/projects/spring-cloud-circuitbreaker'],['Hystrix maintenance mode','https://github.com/Netflix/Hystrix']]
  },
  {
    track:'java', group:'Spring', id:'spring-boot-war-still-ok',
    title:'Boot 能内嵌 Tomcat，也可以打 WAR 外置',
    prompt:'为什么把“不需要独立容器、完全不需要 XML”理解成不能打 WAR、不能写任何配置文件？',
    promptAnswer:'默认可执行 jar，需要外置容器时仍可打 WAR。自动配置也可用 exclude 关掉；不是“完全不能 XML/配置文件”。',
    core:'常见路径是可执行 jar，内嵌 Tomcat/Jetty/Undertow。仍然可以把应用打成 WAR 放到外置容器，只要继承 SpringBootServletInitializer。自动配置能排除，不是永远零配置。YAML 和 properties 都支持，优先级以现行 Externalized Configuration 为准，1.x 那张九条列表会漏 config data、profile-specific 文件。start.spring.io 仍是起步方式。@SpringBootApplication 含 @SpringBootConfiguration、@EnableAutoConfiguration、@ComponentScan，这点资料写对了。',
    why:'把“不需要独立容器”理解成不能打 WAR，外置 Tomcat 集群就被拒掉；把“不需要 XML”理解成不能写配置，application.yml 也不敢放。区分信号是默认可执行 jar，WAR 仍要 SpringBootServletInitializer。',
    example:'默认用 java -jar 跑内嵌 Tomcat。要进已有的外置 Tomcat 时，改成 war 打包，并提供一个继承 SpringBootServletInitializer 的入口，自动配置仍可用 exclude 关掉。',
    task:'对照 Boot 部署文档，写出 jar 与 war 两条路径；说明 auto-config 可以用 exclude 关掉。',
    answer:'对照部署文档，两条路径是：默认可执行 jar，内嵌 Tomcat、Jetty 或 Undertow；需要外置容器时打 WAR，并继承 SpringBootServletInitializer。自动配置不是永远零配置，可以用 exclude 关掉某一项。YAML 和 properties 都支持，不是禁止写配置文件。',
    keywords:'Spring Boot 内嵌 Tomcat WAR SpringBootServletInitializer',
    points:['默认可执行 jar 内嵌容器','WAR + SpringBootServletInitializer 仍可用','自动配置可排除，YAML 与 properties 都支持'],
    deep:[
      {title:'内嵌和外置是两条打包',body:'可执行 jar 把容器打进去，java -jar 就能起。外置容器要的是 WAR，入口类继承 SpringBootServletInitializer，由容器拉起应用。自动配置可以排除，YAML 与 properties 都是配置，不是退回全部手写 XML。'},
      {title:'怎样自己验证',body:'对照 Boot 的打包文档，写出 jar 与 war 各自由谁启动。再在自动配置上加一处 exclude，确认该项不再生效，而不是整份配置被禁止。'},
    ],
    refs:[['Spring Boot：Packaging','https://docs.spring.io/spring-boot/reference/packaging/'],['Spring Boot：Externalized Configuration','https://docs.spring.io/spring-boot/reference/features/external-config.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'dubbo-hessian-zk-not-frozen',
    title:'Dubbo 默认不再是 Hessian 加 ZooKeeper 这一套',
    prompt:'为什么还把 Dubbo 写成孵化器项目、默认 Hessian、注册中心主要是 ZK？',
    promptAnswer:'Dubbo 已是 Apache 顶级项目；注册中心不只有 ZK，序列化也不只 Hessian。',
    core:'Dubbo 已是 Apache 顶级项目。RPC 默认协议和序列化随 3.x 演进，Hessian2 是旧默认，现行常见 Triple/protobuf 等，不要只背 Hessian。注册中心可以是 Nacos、ZK、Multicast，国内新项目更多 Nacos，见 `sca-nacos-register`。负载均衡默认 random 仍对，见 `dubbo-loadbalance-random-default`。分布式事务可与 Seata 等配合，不能再说“暂时不支持、以后上 XA”。check=true 启动检查、kill -9 跳过优雅停机这些行为方向仍对。',
    why:'还按孵化器、默认 Hessian、注册中心主要是 ZK 去选型，协议和依赖会对不上现行文档，事务也会被说成以后才有。区分信号是已是 Apache 顶级项目，注册可以是 Nacos，事务可配 Seata。',
    example:'一个 Dubbo 3 服务用 Triple 暴露，注册到 Nacos，而不是只写 Hessian 加 ZooKeeper。跨服务扣减库存用 Seata 的 AT，不要等 Dubbo 自己实现一套 XA。',
    task:'对照 Apache Dubbo 现状，划掉孵化器和“无分布式事务”；写出一种非 ZK 注册中心。',
    answer:'对照 Apache Dubbo 现状，划掉孵化器：它已是顶级项目。划掉“暂时不支持分布式事务”：可以与 Seata 配合，不是以后再上 XA。一种非 ZK 注册中心是 Nacos，Multicast 也行。Hessian2 是旧默认，现行常见 Triple，不要只背 Hessian。',
    keywords:'Dubbo Hessian Triple Nacos Seata 优雅停机',
    points:['Dubbo 已是 Apache 顶级项目','Hessian 是旧默认序列化，不是唯一现状','注册中心和分布式事务都有现行方案，不只有 ZK 和“暂不支持”'],
    deep:[
      {title:'默认协议已经换过',body:'Hessian2 是旧的默认序列化，不是现状的唯一答案。注册中心可以是 Nacos、ZooKeeper 或 Multicast。分布式事务走 Seata 一类方案，Dubbo 自己不内置 XA，也不等于不支持事务。负载均衡默认 random 这点仍在。'},
      {title:'怎样自己验证',body:'打开 Apache Dubbo 的项目说明，确认已不是孵化器，并把“无分布式事务”划掉。再在注册中心列表里指出 Nacos 或 Multicast 其中一种，不要只剩 ZooKeeper。'},
    ],
    refs:[['Apache Dubbo','https://dubbo.apache.org/zh-cn/'],['Dubbo 3 Triple','https://dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/protocol/triple/']]
  },
  {
    track:'frontend', group:'网络与安全', id:'https-tls13-not-12-packets',
    title:'HTTPS 不是固定比 HTTP 多 9 个握手包',
    prompt:'为什么把 HTTP 与 HTTPS 的差别背成“三次握手 3 包对上 SSL 9 包一共 12 包，所以 HTTP 一定更快”？',
    promptAnswer:'TLS 1.3 握手包数不是固定“SSL 9 包再加三次握手 12 包”。别用旧包数口诀比快慢。',
    core:'HTTPS 是 HTTP over TLS。端口常见 443，证书要校验主机名，见 `tls-hostname-verify`。TLS 1.3 是 1-RTT 握手，会话恢复还可以 0-RTT，不是固定 9 个包。应用数据加密会增加 CPU 和一点体积，但延迟差主要来自握手和证书，不是“12 减 3”。HTTP/2 和 HTTP/3 几乎都跑在加密连接上。明文 HTTP 没有机密性。免费证书早已普及，不再是“一定要花钱才有 HTTPS”。',
    why:'把 HTTPS 背成固定比 HTTP 多 9 个包、一共 12 包，就会用包数拒绝 TLS，也解释不了会话恢复为什么不再付那笔固定税。区分信号是 TLS 1.3 是 1-RTT，恢复还可以 0-RTT。',
    example:'浏览器打开 https://example.com，先完成 TLS 1.3 握手，之后才有 HTTP。同一站点再次打开可以走会话恢复，不必再数成固定的 12 个包。真正多出来的两件事是加密和证书校验。',
    task:'对照 TLS 1.3，划掉“SSL 固定 9 包”；写出 HTTPS 相对 HTTP 真正多的两件事：加密和证书校验。',
    answer:'对照 TLS 1.3，划掉“SSL 固定 9 包、三次握手再加起来 12 包”。握手是 1-RTT，会话恢复还可以 0-RTT，不是一笔固定包数。HTTPS 相对 HTTP 真正多的两件事是应用数据加密，以及校验证书里的主机名。明文 HTTP 没有机密性。',
    keywords:'HTTPS TLS 1.3 HTTP 443 证书',
    points:['HTTPS 是 HTTP over TLS，常见端口 443','TLS 1.3 握手不是固定 9 个包','免费证书普及，明文 HTTP 没有机密性'],
    deep:[
      {title:'包数不是安全税',body:'延迟差主要来自握手和证书校验，不是 12 减 3。TLS 1.3 一轮就能握手，会话恢复还可以零轮。HTTP/2 和 HTTP/3 几乎都跑在加密连接上，免费证书也已普及，内网不能再用包数把 TLS 关掉。'},
      {title:'怎样自己验证',body:'对照 TLS 1.3 的握手说明，把“固定 9 个包”划掉，并标出 1-RTT 和会话恢复的 0-RTT。再写出相对明文 HTTP 多出的两件事：加密和主机名校验。'},
    ],
    refs:[['RFC 8446 TLS 1.3','https://www.rfc-editor.org/rfc/rfc8446'],['MDN：HTTPS','https://developer.mozilla.org/en-US/docs/Glossary/HTTPS']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_22) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
