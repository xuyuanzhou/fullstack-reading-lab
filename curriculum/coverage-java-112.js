/* 《分布式高并发》D8：优雅停机≠零丢失；连接池≠线程池。 */
const COVERAGE_JAVA_112 = [
  {
    track:'java', group:'分布式与高并发', id:'graceful-shutdown-not-zero-loss',
    title:'优雅停机减少粗暴断开，不是业务零丢失保证书',
    prompt:'资料把优雅停机写成零丢失。为什么仍可能丢在途请求？',
    promptAnswer:'优雅停机减少在途丢失，不等于零丢失。还要排空、拒绝新请求与下游超时。',
    core:'**优雅停机**通常：停止接新流量 → 等在途请求结束（有超时）→ 再关连接/进程。它降低的是**杀进程式截断**，见 `spring-graceful-shutdown`。它不保证：超时后仍被杀掉的在途写、已响应但下游未确认、MQ 未 ACK、客户端重试造成的重复。零丢失要靠**幂等、事务边界、Outbox、排水与就绪/存活探针配合**，不是一个 `server.shutdown=graceful` 开关。邻接 `distributed-outbox`、`select-not-always-business-idempotent`。',
    why:'K8s 滚动发布只开 graceful，未留 sleep/preStop，探针与排水不同步；或把超时内失败当成“不应发生”。',
    example:'preStop 先从 LB 摘流，等 15s 在途；超时仍强制结束。支付回调必须幂等键；停机窗口重复投递要能安全。',
    task:'划掉“优雅停机=零丢失”。写出：它减少什么；零丢失还要哪两类手段。',
    answer:'划掉。优雅停机减少粗暴截断。零丢失还要幂等/事务与排水编排，并接受超时强制退出。',
    keywords:'优雅停机 graceful shutdown 幂等',
    origin:'《分布式高并发.pdf》发布与停机口诀常见夸大',
    diagram:'diagrams/graceful-shutdown-not-zero-loss.svg',
    points:['优雅停机减少粗暴断开','有超时仍可能截断','零丢失靠幂等与排水'],
    deep:[
      {title:'和探针',body:'readiness 摘流与进程退出要编排；只靠 JVM shutdown hook 不够。'},
      {title:'怎样自己验证',body:'发布中打慢请求：观察是否仍被 502/截断；对照幂等键是否挡住重复提交。'}
    ],
    refs:[['Spring Boot：Graceful shutdown','https://docs.spring.io/spring-boot/reference/web/graceful-shutdown.html'],['Kubernetes：Pod 终止','https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination'],['Google SRE：发布','https://sre.google/sre-book/release-engineering/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'connection-pool-not-thread-pool',
    title:'连接池限制的是下游连接，不是应用线程数的同义词',
    prompt:'线程池开到 100，连接池也配成 100。为什么这不是定律？',
    promptAnswer:'连接池按数据库容量与持有时长定，不是跟线程池 1:1。',
    core:'**线程池**限制并发执行的任务数；**连接池**（如 Hikari）限制同时持有的**数据库连接**数，见 `hikari-pool-timeout`、`java-executor`。二者容量没有“必须相等”的定律：线程可以阻塞等连接；连接也可以被少量线程复用。把连接池开到等于或大于无界线程数，常把瓶颈转移到数据库 `max_connections`。容量要按下游承受、持有时长与超时来定，并用池指标（活跃、等待、超时）校准。邻接 `thread-pool-formula-not-law`、`qps-formula-not-capacity`。',
    why:'Tomcat 线程 200、Hikari 200，数据库 max_connections 150 被打爆；或连接池过小导致线程全堵在借连接。',
    example:'IO 型接口：线程 100，连接池 20～40（看 SQL 耗时与 DB 限额），借不到快速失败而不是无限等。压测看连接等待与 DB 线程。',
    task:'划掉“连接池=线程池”。写出：各限制什么；相等为什么不是默认正解。',
    answer:'划掉同义。线程池限任务并发；连接池限下游连接。相等常拖垮 DB 或浪费连接，要用超时与压测定。',
    keywords:'连接池 线程池 Hikari 容量',
    origin:'《分布式高并发.pdf》池化参数口诀常见绑定',
    diagram:'diagrams/connection-pool-not-thread-pool.svg',
    points:['连接池限下游连接','线程池限任务并发','两者不必等大'],
    deep:[
      {title:'和虚拟线程',body:'可多挂起等待，更要防止把连接池打满；连接仍是稀缺资源。'},
      {title:'怎样自己验证',body:'固定 DB max_connections，抬高应用连接池与线程，观察 DB 拒绝与应用等待超时。'}
    ],
    refs:[['HikariCP','https://github.com/brettwooldridge/HikariCP'],['Java：Executor','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html'],['MySQL：max_connections','https://dev.mysql.com/doc/refman/8.4/en/server-system-variables.html#sysvar_max_connections']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_112) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
