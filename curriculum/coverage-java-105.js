/* 消息队列章导论：中间件是什么；优劣与容量；相对同步调用。 */
const COVERAGE_JAVA_105 = [
  {
    track:'java', group:'消息队列', id:'mq-what-and-when',
    title:'消息中间件解耦时间与消费，不是“异步 HTTP”',
    prompt:'为什么订单服务不直接调发货，却要引入 Kafka/Rabbit 一类中间件？',
    core:'**消息中间件**把“业务事实已成立”写入**可持久（或按产品语义保留）的通道**，让消费方在自己节奏下处理。它解耦的是**时间与地址**：生产者不必此刻握住下游；多个消费者可订阅同类事件。典型：异步通知、削峰、日志/事件管道。它**不是**把同步 HTTP 换个名字：默认常**至少一次**投递，要幂等；顺序与延迟按产品模型设计（Kafka 分区、Rabbit 队列等）。解耦动机展开见 `mq-why-decouple`；Kafka 日志模型见 `kafka-model`。',
    why:'背产品名却说不清为何不能同步调；或以为上了 MQ 就自动 Exactly-once、全局有序。',
    example:'下单成功发“订单已创建”；发货宕机时消息积压，恢复后消费。必须当场返回运单号时，仍要同步或同步+补偿，不能只靠事后消费。',
    task:'划掉“MQ=异步 HTTP”。用两句话：解耦什么；三类典型用途各一例。',
    answer:'划掉异步 HTTP。MQ 解耦时间与消费地址。典型：异步通知、削峰、事件/日志管道。投递与顺序要单独设计。',
    keywords:'消息中间件 解耦 异步 投递',
    diagram:'diagrams/mq-what-and-when.svg',
    points:['解耦时间与消费方地址','典型异步通知削峰事件管','不是换皮的同步 HTTP'],
    deep:[
      {title:'和产品名',body:'Kafka/Rabbit/RocketMQ 模型不同，先问工作负载再选型，见 mq-pick-workload、mq-compare-matrix。'},
      {title:'怎样自己验证',body:'画同步调用与入队两条时序：下游宕机时用户可见结果有何不同。'}
    ],
    refs:[['Kafka：Introduction','https://kafka.apache.org/documentation/#introduction'],['RabbitMQ：Tutorials','https://www.rabbitmq.com/tutorials'],['微服务：异步消息','https://microservices.io/patterns/communication-style/messaging.html']]
  },
  {
    track:'java', group:'消息队列', id:'mq-tradeoffs-capacity',
    title:'消息系统优缺点与容量看积压、分区与磁盘，没有万能 TPS',
    prompt:'为什么不能背一句“Kafka 百万 TPS”就当容量规划？',
    core:'**优点**：削峰、多订阅、可重放（视产品）、生产消费独立扩缩。**代价**：至少一次与乱序/延迟；积压打满磁盘；运维分区/副本/消费组；排障链路变长。**容量**：没有全站通用 TPS。粗框架：消息大小、分区/队列并行度、磁盘与网络、消费者处理时间与幂等成本；用压测与 lag 告警定界。积压治理见 `mq-dlq-backlog`、`mq-backlog-expand-queues`。**为何用**：可接受异步可见结果、需要削峰或多订阅时再引入。',
    why:'口号百万 TPS 上线，单分区或慢消费者把 lag 堆爆；或因说不清数字拒用消息。',
    example:'订单事件按业务键分区；压测生产者批大小与消费者处理 P99；设最大 lag 与死信。数字进容量表。',
    task:'划掉“中间件 TPS=固定数”。写出：优点两条、代价两条；容量两个变量。',
    answer:'划掉固定 TPS。优点如削峰与多订阅；代价如积压与至少一次。容量看并行度、消息大小与消费耗时，用压测。',
    keywords:'消息队列 容量 积压 分区 压测',
    diagram:'diagrams/mq-tradeoffs-capacity.svg',
    points:['优点是削峰与多订阅','代价含积压与投递语义','容量靠并行与压测无万能 TPS'],
    deep:[
      {title:'和秒杀',body:'MQ 顶住不等于下游可控，见 seckill-mq-not-only-db-valve。'},
      {title:'怎样自己验证',body:'固定消费者数灌入超速生产，观察 lag 与磁盘；加倍消费者看库/下游是否先炸。'}
    ],
    refs:[['Kafka：Operations','https://kafka.apache.org/documentation/#operations'],['RabbitMQ：Alarms','https://www.rabbitmq.com/docs/alarms'],['Kafka：Consumer lag','https://kafka.apache.org/documentation/#basic_ops_consumer_lag']]
  },
  {
    track:'java', group:'消息队列', id:'mq-vs-sync-call',
    title:'同步调用要当场结果，消息适合事后处理',
    prompt:'什么时候必须继续用 HTTP/RPC，而不是“全部改成发消息”？',
    core:'**同步调用**适合：需要**同一次响应**里的下游结果、强交互式错误立刻返回、事务边界仍在同一请求内（或明确的分布式事务方案）。**消息**适合：事实已提交、允许稍后处理、要削峰或多消费者。把同步改消息却仍要求“页面立刻拿到下游单号”，会设计自相矛盾。投递语义与幂等见 `mq-delivery-semantics`、`mq-consume-idempotent-key`。边界写进产品前提，而不是先选品牌。',
    why:'全部异步化后客服要当场运单号却拿不到；或该削峰的链路仍同步把库存服务打挂。',
    example:'支付回调验签后同步更新支付状态；发货履约发消息异步执行。库存预扣若必须在下单响应前完成，不能只靠事后消费。',
    task:'划掉“能异步就全异步”。列出：必须同步的一条前提；适合消息的一条前提。',
    answer:'划掉全异步。必须同步：同一次响应要下游结果。适合消息：事实已成立且可事后处理/削峰。前提先于产品名。',
    keywords:'同步调用 消息 异步 幂等',
    diagram:'diagrams/mq-vs-sync-call.svg',
    points:['同步要同一次响应结果','消息适合事后与削峰','前提先于中间件品牌'],
    deep:[
      {title:'和 Outbox',body:'本地事务与发消息的一致性用 Outbox 等模式，见 distributed-outbox，不在本课展开。'},
      {title:'怎样自己验证',body:'写两列用户故事：当场要结果 vs 可稍后；每列只允许同步或消息一种。'}
    ],
    refs:[['微服务：同步与异步','https://microservices.io/patterns/communication-style/messaging.html'],['Kafka：Delivery semantics','https://kafka.apache.org/documentation/#semantics'],['RabbitMQ：Reliability','https://www.rabbitmq.com/docs/reliability']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_105) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
