/* 《分布式高并发》D8：binlog≠业务事件总线；ThreadLocal≠分布式上下文。 */
const COVERAGE_JAVA_110 = [
  {
    track:'java', group:'分布式与高并发', id:'binlog-not-change-event-bus',
    title:'binlog 是复制与恢复的日志，不是开箱即用的业务事件总线',
    prompt:'为什么资料写“监听 binlog 就能解耦所有下游”，评审却把它当成正式领域事件平台？',
    promptAnswer:'binlog 是存储复制流，不是正式领域事件总线。下游契约、版本与重放要另建事件平台。',
    core:'**binlog** 记录存储引擎可复制的数据变更，首要服务**复制、点备恢复、审计**。用 Canal/Debezium 等做变更捕获（CDC）可以驱动缓存失效、搜素引、数仓，方向成立，但要把坑写清： schema 演进、乱序/重复、回放位点、多表事务边界、与业务语义（“订单已支付”）不对齐的行级变更。它不是带契约版本、权限与重放策略的领域事件总线；关键事件仍常走 Outbox + MQ，见 `distributed-outbox`。不要把「能订阅 binlog」写成「已有事件驱动架构」。',
    why:'下游直接解析 binlog 字段当 API，表一改全挂；或缺少幂等与位点监控导致重复扣减。',
    example:'缓存失效可订订单表变更删键。履约通知用 Outbox 写 `OrderPaid` 事件进 MQ，而不是让每个消费者自己猜哪一行 UPDATE 算支付成功。',
    task:'划掉“binlog=业务事件总线”。写出：CDC 适合什么；领域事件还要补什么。',
    answer:'划掉等价。binlog/CDC 适合复制级变更驱动。领域事件要契约、语义与投递保证，常用 Outbox+MQ，不能只靠行变更猜测。',
    keywords:'binlog CDC Outbox 事件驱动',
    origin:'《分布式高并发.pdf》数据变更驱动架构常见夸大',
    diagram:'diagrams/binlog-not-change-event-bus.svg',
    points:['binlog 服务复制与恢复','CDC 可用但有位点与语义坑','领域事件常用 Outbox+MQ'],
    deep:[
      {title:'和缓存删键',body:'CDC 删缓存是旁路失效手段之一，仍有延迟与乱序，见 cache-db-double-write-race。'},
      {title:'怎样自己验证',body:'一次事务改两表，观察下游是否按行拆成两次“业务事件”；对照 Outbox 一笔业务一事。'}
    ],
    refs:[['MySQL：二进制日志','https://dev.mysql.com/doc/refman/8.4/en/binary-log.html'],['Debezium 文档','https://debezium.io/documentation/'],['Outbox 模式','https://microservices.io/patterns/data/transactional-outbox.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'threadlocal-not-distributed-context',
    title:'ThreadLocal 是线程内便签，不是跨进程的分布式上下文',
    prompt:'用 ThreadLocal 存用户上下文后，跨服务却丢了。为什么？',
    promptAnswer:'ThreadLocal 只在本线程。跨进程要把上下文显式放进请求头或消息。',
    core:'**ThreadLocal** 把值绑在**当前线程**，同线程后续代码能取到；线程池复用时要清理，否则泄漏或串数据，见既有线程池课。它**不**自动跨越进程、机器或异步线程：**HTTP 调下游、MQ 消费、切线程**都不会带上 ThreadLocal。全链路要显式传递：请求头/baggage、trace context、消息属性，见 `request-trace-one-hop`、`log-correlation-id`。不要把「网关过滤器 set ThreadLocal」写成分布式会话。',
    why:'线程池复用串到别人的用户 id；或异步 `@Async` 后上下文为空却当鉴权通过。',
    example:'过滤器 `UserContext.set(uid)` 仅本 JVM 请求线程有效。调用下游时放 `X-User-Id` 或 token；子线程用装饰器传递或改用框架上下文传播。',
    task:'划掉“ThreadLocal=分布式上下文”。写出：它作用在哪；跨服务要靠什么。',
    answer:'划掉。ThreadLocal 只在本线程。跨服务靠头/令牌/消息属性等显式传递，并注意线程池清理。',
    keywords:'ThreadLocal 上下文 链路 传播',
    origin:'《分布式高并发.pdf》上下文传递常见缩写',
    diagram:'library-assets/distributed-hc/p0127.png',
    points:['ThreadLocal 绑当前线程','不跨进程与随意切线程','全链路要显式传播'],
    deep:[
      {title:'和虚拟线程',body:'仍是每任务自己的线程局部；不代替跨服务传播。'},
      {title:'怎样自己验证',body:'ThreadLocal set 后提交到另一线程池任务再 get，应为空或需手动传。'}
    ],
    refs:[['Java：ThreadLocal','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ThreadLocal.html'],['OpenTelemetry：Context','https://opentelemetry.io/docs/concepts/context-propagation/'],['SLF4J MDC','https://www.slf4j.org/manual.html#mdc']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_110) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
