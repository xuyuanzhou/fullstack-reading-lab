/* Path completion: message middleware ladder + architecture evolution with diagrams. */
const COVERAGE_PATH_07 = [
  {
    track:'java', group:'消息队列', id:'mq-why-decouple',
    title:'消息中间件先解耦时间，再谈选型',
    prompt:'订单服务直接 HTTP 调发货服务，和先发一条消息，差在哪里？',
    core:'同步调用要求下游此刻可用、立刻给出结果，并把对方的延迟和故障直接叠进自己的超时。消息中间件把“业务事实已经成立”先写入可持久的通道，消费方在自己空闲或恢复后再处理。生产者不再持有消费者的地址列表，多个消费者可以各自订阅同一类事件。代价是：调用方拿不到同一次返回里的下游结果；投递默认至少一次，业务必须幂等；顺序和延迟要按产品模型单独设计。没有这些约束，中间件只是把同步失败换成异步积压。',
    why:'学习者会一上来背产品名词，却说不清为什么不能继续同步调用。发货一挂，下单接口也失败或一直等待，他却去加消息产品。订单在下游宕机时仍然成立、恢复后才消费积压，才说明解耦的是时间，不是把业务正确性交给通道。',
    example:'下单接口提交成功后发出“订单已创建”。发货服务宕机时，下单仍返回成功，消息留在通道里，恢复后才被消费。若改成同步调用，发货不可用会让下单失败或一直等到超时。用户若必须当场拿到发货单号，这条就不能改成事后消费。',
    task:'写出同步与异步各自不可妥协的前提：要不要当场返回发货单号、能否容忍重复发货、下游挂掉时订单是否仍算成功。',
    answer:'要当场返回发货单号时，必须同步，因为消息拿不到同一次返回里的下游结果。能容忍重复、并且下游挂掉时订单仍算成功，才可以用消息，恢复后消费积压。重复发货要事先写成幂等。没有这些前提，中间件只是把同步失败换成异步积压。同步失败和异步积压要事先写成两种不同的用户可见结果。',
    keywords:'消息中间件 解耦 异步 同步调用 幂等',
    points:['消息把业务事实与下游处理拆到不同时间','生产者不依赖消费者此刻在线','异步要求明确成功语义、幂等和失败可见性'],
    deep:[
      {title:'和导论',body:'消息中间件是什么、容量框架与相对同步调用见 mq-what-and-when、mq-tradeoffs-capacity、mq-vs-sync-call。本课展开解耦时间。'},
      {title:'不是万能总线',body:'查询库存余额、读取订单详情这类要立刻回答用户的读路径，仍用同步接口。把读请求塞进队列只会增加延迟。'},
      {title:'和数据库事务',body:'“库写成功但消息没发出”是另一类问题，用事务消息或 Outbox，见分布式课。本课只建立异步边界。'}
    ],
    refs:[['RabbitMQ：可靠性','https://www.rabbitmq.com/docs/reliability'],['Kafka：介绍','https://kafka.apache.org/documentation/#introduction']]
  },
  {
    track:'java', group:'消息队列', id:'mq-delivery-semantics',
    title:'投递语义只有三种说法，业务语义另算',
    prompt:'中间件说“恰好一次”，业务就一定只执行一次吗？',
    core:'投递语义描述的是 Broker 与客户端之间的消息副本关系。至多一次：失败时可能丢，不重投。至少一次：失败会重投，可能重复。恰好一次：在指定配置与事务边界内，日志侧或端到端侧尽量避免重复写入；它不等于“业务副作用只发生一次”。消费端仍要用业务键做幂等，或把去重与状态修改放进同一可靠边界。面试里把三种语义背成产品彩页，却不画崩溃窗口，等于没学。',
    why:'学习者会把产品说的“恰好一次”当成业务只会执行一次。写库后、确认前崩溃，积分被加了两次，重试和再平衡都留下双扣。同一订单号的唯一约束挡住第二次写入，才说明业务只执行一次靠的是幂等，不是口号。',
    example:'生产者加上事务和幂等配置后，同一条记录较少重复写入分区。消费者在写完积分、提交位点之前崩溃，恢复后会再处理一次，积分表若没有订单号唯一约束就会多一行。确认之后才崩溃，这条不会因为这次崩溃再投。确认之后崩溃不应再把同一笔积分写第二次。',
    task:'对“写库前崩溃、写库后确认前崩溃、确认后崩溃”三种时点，分别标出至多一次与至少一次会丢还是会重。',
    answer:'写库前崩溃：至多一次可能把消息丢掉不再投，至少一次会重投所以可能再执行。写库后、确认前崩溃：至多一次若已经确认就可能不再投，至少一次会重投，业务可能执行两次。确认后崩溃：两种都不应再因为这次崩溃重做。业务只执行一次仍要靠幂等键。三种时点的丢或重不能用一句恰好一次带过。',
    keywords:'at-most-once at-least-once exactly-once 投递语义 幂等',
    points:['至多一次可能丢，至少一次可能重','恰好一次是配置与边界下的端到端努力，不是业务魔法','业务副作用只执行一次要靠幂等键'],
    deep:[
      {title:'Kafka 的 EOS',body:'Kafka 的 exactly-once 语义绑定在幂等生产者、事务和读已提交隔离等配置上，且有版本与场景边界。把它说成“装上 Kafka 就不会重复扣款”是错的。'},
      {title:'和死信',body:'重复与毒药消息是两类问题。重复用幂等；永远失败用死信离开主队列。'}
    ],
    refs:[['Kafka：Exactly-once semantics','https://kafka.apache.org/documentation/#semantics'],['RabbitMQ：Consumer Acknowledgements','https://www.rabbitmq.com/docs/confirms']]
  },
  {
    track:'java', group:'消息队列', id:'mq-compare-matrix',
    title:'五种消息中间件的模型纵览',
    prompt:'只问“Kafka 还是 RocketMQ 更先进”。为什么仍然选不出该用哪一个？',
    promptAnswer:'不是按谁更先进。已经在运维的那一套先留下。表只写这套做不到什么。例如 RabbitMQ 确认后消息离队，做不到按位点把上周的流水再读一遍。',
    core:'这张表写每种产品的存储模型，以及它做不到什么。不能把「埋点」换成 Kafka、「发邮件」换成 RabbitMQ、「关单」换成 RocketMQ。已经在运维的那一套先留下，见 `mq-pick-workload`。\n\nKafka 是分区追加日志，消费靠位点，保留期内可以重放。确认后消息还在。RabbitMQ 是交换器加绑定进队列，确认后消息离开队列，所以它做不到按位点把上周的流水再读一遍。RocketMQ 用主题下的队列组织，产品里带延迟消息和事务消息。ActiveMQ 实现经典 JMS，常见于已经在用 JMS 的遗留系统。Pulsar 把计算与存储分层，强调多租户和地理复制。模型不同，不表示一种业务必须换一家。',
    why:'学习者会把五家都叫成消息队列，然后按业务名称各装一套。邮件和关单可以留在已经在跑的 Kafka 上，用消费逻辑和到期任务完成。换产品时要比的是现有集群做不到的那一条，不是名字新不新。',
    example:'仓库已经在运维 Kafka。表只用来核对它做不到什么：\n\n```text\nKafka 做得到：按位点重放流水。新流水继续进它。\n发邮件、到点关单：用现有消费者和订单表上的到期时间。不为此新装 RabbitMQ 或 RocketMQ。\n它做不到：已有 JMS 客户端只能认 javax.jms。这一段才评估 ActiveMQ 或适配层。\n```',
    task:'用五列写出：存储单位、顺序范围、消费进度形态、独特能力、不适合的负载。每列只写一句。',
    answer:'存储单位分别是分区日志、队列、主题下的队列、JMS 队列或主题、以及分层后的段。这五句说明模型，不把埋点、发信、关单换成五家产品。已经在运维的集群先留下。同一种消息不要并行维护五套。',
    keywords:'Kafka RabbitMQ RocketMQ ActiveMQ Pulsar 消息中间件比较',
    diagram:'diagrams/mq-compare.svg',
    points:['表写存储模型，不把业务名称换成产品名','已经在运维的集群先留下','确认后离队的队列做不到按位点重放'],
    deep:[
      {title:'和 Spring Cloud Alibaba',body:'RocketMQ 出现在 SCA 绑定里，只说明可以这样接入。已有集群先留下，见 `mq-pick-workload`。SCA 课讲的是接入方式。'},
      {title:'运维成本',body:'多一套集群就多一套监控、权限、容量与故障演练。纵览的目的是减少套数，不是凑齐名词。'}
    ],
    refs:[['Kafka：介绍','https://kafka.apache.org/documentation/#introduction'],['RabbitMQ：交换器','https://www.rabbitmq.com/docs/exchanges'],['RocketMQ：基本概念','https://rocketmq.apache.org/docs/introduction/02concepts/'],['ActiveMQ：JMS','https://activemq.apache.org/components/classic/documentation/jms'],['Pulsar：概念','https://pulsar.apache.org/docs/concepts-overview/']]
  },
  {
    track:'java', group:'消息队列', id:'kafka-model',
    title:'Kafka：主题、分区与消费组',
    prompt:'为什么说 Kafka 是日志，而不是“一个叫队列的盒子”？',
    promptAnswer:'三分区主题里，每条记录在一个消费组内只由分到该分区的成员处理，另一个组从自己的位点再读一遍。',
    core:'生产者把记录追加到主题。主题按分区切开：分区是有序的字节日志，每条记录有偏移量。同一分区内有序；跨分区没有全局顺序。需要同键有序时，用业务键映射到同一分区。消费者以消费组加入：组内成员分摊分区，一条记录在组内只被一个成员处理；另一个消费组从自己的位点再读一整份。已提交位点决定故障恢复从哪继续。日志在保留策略内可重放，这是它和“确认后删除”的队列的根本差别。',
    why:'学习者会把这种日志当成确认后就删除的队列。重放时没有位点可拨，也误以为主题天然全局有序。两个消费组各自处理同一条、回放只动其中一组的位点，才说明它是按分区保留的日志，不是一个盒子。',
    example:'主题分成三个分区，两个消费组各自维护位点。同一条记录在每个组里只由一个成员处理，另一组会再读一遍。把其中一个组的位点拨回昨天的偏移量，只有这一组重放，另一组的进度不动。跨分区的两条记录没有全局先后。跨分区没有一条全局的先后顺序。',
    task:'画一个三分区主题和两个消费组。标出每条记录在每个组里由谁处理，以及重放时动的是哪一组的位点。',
    answer:'三分区主题里，每条记录在一个消费组内只由分到该分区的成员处理，另一个组从自己的位点再读一遍。重放时拨回的是某一组的位点，另一组不变。顺序只在同一分区内成立，同键要固定到同一分区，不能按整个主题保证全局顺序。拨位点只影响被回放的那一组，另一组继续从自己的进度读。',
    keywords:'Kafka topic partition consumer group offset 日志',
    points:['主题由分区组成，分区是有序追加日志','消费组内分摊分区，组间各自一份位点','保留期内可重放，顺序只在分区内成立'],
    deep:[
      {title:'和副本',body:'分区有首领与追随者副本，生产者确认策略决定等到几份副本。副本提高耐久，不改变“分区内有序”的模型。'},
      {title:'和下两课',body:'生产者 acks 与消费者提交位点的时序，在后续两课展开。'}
    ],
    refs:[['Kafka：介绍','https://kafka.apache.org/documentation/#introduction'],['Kafka：Consumer','https://kafka.apache.org/documentation/#consumerconfigs']]
  },
  {
    track:'java', group:'消息队列', id:'rabbit-model',
    title:'RabbitMQ：交换器、队列与确认',
    prompt:'为什么说 RabbitMQ 的核心不是“队列名”，而是路由？',
    promptAnswer:'路径是生产者到交换器，再按绑定进入两个队列，然后消费者确认。确认之后消息离开队列，可以删除或在拒绝时重投。',
    core:'生产者把消息发给交换器，并带路由键。队列通过绑定声明自己要哪些键。direct、fanout、topic 决定匹配方式。消息进入队列后，消费者领取并处理，再用确认告诉 Broker 可以删除或重投。预取数量限制未确认的在途消息，避免一个慢消费者囤积。死信交换器承接被拒绝或过期的消息。与 Kafka 不同：默认模型不是长期可重放的分区日志，确认后消息离开队列；需要审计回放时要另建存储，不能假定队列里永远留着历史。',
    why:'学习者会只记连接和队列名，把核心当成往队列里放。同一条消息进了两个队列，或者发出后队列仍是空的，他却去查消费者代码。生产者只写交换器、两个绑定都收到或都收不到，才说明路由发生在交换器和绑定上。',
    example:'订单交换器按主题匹配。邮件队列绑定一种键，审计队列绑定更宽的键。发送支付事件时两个队列都收到，生产者没有写队列名。再发一个没有任何绑定能接住的键，两个队列的消息数都不增加，这条不会留在队列里等以后。无法路由的那条不会变成队列里的历史记录。',
    task:'画出生产者→交换器→两个绑定队列→消费者 ack 的路径，并标出无法路由时的结果。',
    answer:'路径是生产者到交换器，再按绑定进入两个队列，然后消费者确认。确认之后消息离开队列，可以删除或在拒绝时重投。没有任何绑定能接住时，消息不会静默留在某个队列里。历史回放不是默认能力，需要回放就要另存。确认后消息离开队列，不能假定以后还能把昨天的消息再读出来。',
    keywords:'RabbitMQ exchange queue binding ack prefetch',
    points:['生产者面向交换器与路由键','绑定决定队列如何接收','确认与预取管消费侧可靠性，不提供默认日志重放'],
    deep:[
      {title:'默认交换器',body:'路由键等于队列名的 direct 特例，方便入门，也让人误以为“直接发队列”是唯一模型。'},
      {title:'与下一课',body:'交换器类型与绑定细节见 rabbit-exchange-binding；ack 时序见 rabbit-ack。'}
    ],
    refs:[['RabbitMQ：交换器','https://www.rabbitmq.com/docs/exchanges'],['RabbitMQ：可靠性','https://www.rabbitmq.com/docs/reliability']]
  },
  {
    track:'java', group:'消息队列', id:'rocketmq-model',
    title:'RocketMQ：主题、队列、延迟与事务消息',
    prompt:'RocketMQ 相对 Kafka 和 RabbitMQ，多出来的能力主要解决什么业务？',
    core:'RocketMQ 用主题分类事件，主题下有多个队列；队列是并行与顺序单位，类似 Kafka 分区。消费组集群模式下分摊队列，广播模式下组内各收全量。标签在订阅时过滤，不替代队列选择。延迟或定时消息由服务端到点再投递，适合超时关单。事务消息用半消息把本地数据库提交与“消息可见”绑在一起，解决“库写了但消息没发出”；它不回滚下游服务。Java 业务里常见的“事件 + 延迟 + 本地事务衔接”是它的主场；超高吞吐可重放日志仍更常看 Kafka，灵活交换器路由仍更常看 RabbitMQ。',
    why:'学习者会只在绑定名字里见过这种产品，说不清队列、延迟和事务消息各管哪一段。超时关单和本地事务衔接被当成普通发送，下游一失败就以为消息会把库一起回滚。三种业务各用不同发送方式、同一订单号仍固定队列，才说明多出来的是这些能力。',
    example:'下单通知用事务消息，本地库提交后消息才可见。三十分钟未支付用延迟消息，到点才投递关单检查。同一订单的创建、支付、关闭用订单号固定到同一队列，消费顺序与发送一致。三种都可能重复，下游仍要用业务键跳过第二次。',
    task:'给“下单通知”“超时关单”“状态机三步事件”各选：普通、延迟还是事务消息，并写队列选择键。',
    answer:'下单通知选事务消息，用来把本地库提交和消息可见绑在一起，队列选择键用订单号。超时关单选延迟消息，到点才投递，不必占着同一队列睡觉。状态机三步事件选普通消息但固定同一队列，保证顺序。下游仍然要幂等，事务消息不会回滚已经执行的下游。延迟消息到点才可见，事务消息也不负责回滚已经完成的下游。',
    keywords:'RocketMQ topic queue 延迟消息 事务消息 消费组',
    points:['队列是顺序与并行单位，标签只做过滤','延迟消息由服务端推迟投递','事务消息绑定本地事务与发送，不代替下游幂等'],
    deep:[
      {title:'和 SCA 课',body:'sca-rocketmq-intro 讲接入与概念入口；本课放进消息队列分级，和 Kafka、RabbitMQ 对照。'},
      {title:'顺序课',body:'同一主题乱序的原因与按键固定队列，见 rocketmq-queue-order。'}
    ],
    refs:[['RocketMQ：基本概念','https://rocketmq.apache.org/docs/introduction/02concepts/'],['RocketMQ：事务消息','https://rocketmq.apache.org/docs/featureBehavior/04transactionmessage/']]
  },
  {
    track:'java', group:'消息队列', id:'activemq-jms-model',
    title:'ActiveMQ：JMS 的队列与主题',
    prompt:'遗留系统开口就要 JMS ConnectionFactory，该怎么理解 ActiveMQ？',
    promptAnswer:'点对点队列通常由一个消费者拿走一条，这一点像任务分发，但编程接口和进度形态不同。',
    core:'ActiveMQ Classic 实现 JMS：点对点用 Queue，一条消息通常由一个消费者拿走；发布订阅用 Topic，多个订阅者各收一份。应用通过 ConnectionFactory、Session、MessageProducer/Consumer 编程，而不是先背 Kafka 分区。它擅长对接仍使用 JMS API 的企业集成与旧模块。吞吐、分区重放、云原生运维不是它的主叙事；新系统若无 JMS 约束，应回到工作负载表在 Kafka、RabbitMQ、RocketMQ、Pulsar 里选。ActiveMQ Artemis 是另一套实现与配置，迁移时不要混手册。',
    why:'学习者会把遗留系统要的连接工厂当成又一种分布式日志。新架构若默认选它，吞吐和重放都对不上；完全不讲，对接旧系统时又说不出队列和主题的差别。旧客户端仍走原来的接口、新业务按负载另选，才说明它承接的是遗留而不是默认新架构。',
    example:'旧系统用点对点队列发库存变更，一条消息被一个消费者拿走。另一个主题则让多个订阅者各收一份。新服务可以暂时接住这些消息，再桥到按负载选定的产品，而不是把分区位点的模型套进这套接口名字里。新服务不应把位点回放写进这套旧接口的名字里。',
    task:'用两列表对比 JMS Queue 与 Topic，以及它们和 Kafka 消费组、RabbitMQ fanout 的相似点与不同点。',
    answer:'点对点队列通常由一个消费者拿走一条，这一点像任务分发，但编程接口和进度形态不同。发布订阅主题让多个订阅者各收一份，相似于广播，却不是消费组各自维护可回放位点。新业务没有这套遗留约束时按负载另选。不要把接口名字当成分区日志。没有遗留客户端时，不要把它当成新系统的默认日志。',
    keywords:'ActiveMQ JMS Queue Topic ConnectionFactory 企业集成',
    points:['JMS Queue 点对点，Topic 发布订阅','适合遗留 JMS 客户端与企业集成','新系统无 JMS 约束时应按工作负载另选产品'],
    deep:[
      {title:'协议',body:'ActiveMQ 支持多种协议与客户端。能力多不等于每一条链路都按同一可靠性配置，要按连接与目的地单独看持久化与确认。'},
      {title:'与纵览表',body:'纵览课把它放在“遗留 JMS”列；本课只展开到能对接和能拒绝误用。'}
    ],
    refs:[['ActiveMQ：JMS','https://activemq.apache.org/components/classic/documentation/jms'],['Jakarta Messaging','https://jakarta.ee/specifications/messaging/']]
  },
  {
    track:'java', group:'消息队列', id:'pulsar-segment-model',
    title:'Pulsar：计算与存储分离的流',
    prompt:'已经会了 Kafka，为什么还要知道 Pulsar？',
    promptAnswer:'相似的是都可以按位点消费和重放。不同的是服务和持久化段分开，并强调租户、命名空间和地理复制。',
    core:'Pulsar 的主题也按位点消费，可重放，这一点像日志系统。差别在架构：Broker 负责服务，持久化段交给 BookKeeper 等存储层，计算与存储分离，扩容时可以更独立地加服务或加存储。它强调多租户、命名空间隔离、地理复制和统一的流与队列语义。选型上，它和 Kafka 争的是大规模流与云原生多租户场景，而不是替换 RabbitMQ 的交换器路由，也不是替换 RocketMQ 的延迟/事务消息故事。团队已有成熟 Kafka 时，换 Pulsar 要有明确的多租户或存储分层诉求，而不是“更新潮”。',
    why:'学习者会把另一种流平台说成“类似日志系统”就结束。面试时说不清计算和存储是不是分开、多租户配额在哪。已有单一流水线时换过去并没有更简单，才说明知道它是为了分层和租户，不是为了换一个名字。',
    example:'多个业务线共享一套流平台时，用租户和命名空间隔开配额，冷数据进分层存储，Broker 和存储可以分开扩。单一埋点流水线没有这些诉求时，继续用现有日志系统，主题数和运维都更少。两边都可以按位点重放。没有租户隔离诉求时，主题和运维都会更多。',
    task:'用三句话对比 Pulsar 与 Kafka：相似的消费模型、不同的存储拓扑、什么时候值得迁移。',
    answer:'相似的是都可以按位点消费和重放。不同的是服务和持久化段分开，并强调租户、命名空间和地理复制。没有多租户或存储分层诉求时不值得为换而换。它也不取代任务路由或延迟事务那两种模型。相似的是位点重放，不同的是服务和存储可以分开扩，没有这个诉求就不必替换。',
    keywords:'Pulsar BookKeeper 多租户 分层存储 位点',
    points:['Pulsar 消费模型接近可重放日志','Broker 与持久化存储分层，利于独立扩容','多租户与地理复制是常见选型理由，不是默认优于 Kafka'],
    deep:[
      {title:'与 Kafka 生态',body:'连接器、流处理与团队经验也是成本。模型相近不等于运维手册可以互换。'},
      {title:'在路线中的位置',body:'先掌握 Kafka 模型，再读本课作对照；落地仍按工作负载课选择。'}
    ],
    refs:[['Pulsar：概念概览','https://pulsar.apache.org/docs/concepts-overview/'],['Pulsar：架构','https://pulsar.apache.org/docs/concepts-architecture-overview/']]
  },
  {
    track:'java', group:'系统设计', id:'arch-evolution-stages',
    title:'架构演进看两条线，不是一张名词表',
    prompt:'为什么不能把“上微服务”当成架构演进的第一句？',
    promptAnswer:'没有发布冲突、库打满或必须独立扩缩的信号，就停在现在这一站。演进要分清容量线与服务化线；停在单体是正常结果。',
    core:'资料里常见的完整谱系往往是：单体（常含分层 / N-tier）→ 垂直扩展（scale-up：换更大机器）→ 模块化单体 → 集群 / 水平扩展（同质副本）→ 经典 SOA → 微服务。本课要求画全这条谱系，但不要把它当成人人必走的分数阶梯；每一站只在有可量化瓶颈时进入。\n\n把谱系拆成两条线，才不会漏掉 SOA、也不至于把集群和拆分说成一回事：\n\n容量线（解决“扛得住吗”）：单体 → 垂直扩展 → 水平扩展 / 集群（多副本 + 负载均衡，会话外置）。瓶颈在共享库时，加应用副本往往更差，见 `arch-scale-before-split`。拆分与集群不可互换，见 `split-vs-cluster-not-interchangeable`。\n\n服务化线（解决“边界清不清、能否独立演进”）：单体糊边界 → 模块化单体（仍是一个进程，API 与表归属划清）→ 经典 SOA（面向服务架构：能力远程可调，常有 ESB / 中心治理，服务较粗，数据归属常仍纠缠）→ 微服务（独立部署、尽量独立数据、去中心治理）。SOA 与微服务谱系相关但不是换名，见 `microservices-not-just-soa-relabel`。\n\n事件驱动是协作方式，可叠在模块化单体、SOA 或微服务上，见 `arch-sync-vs-async`。跳级（边界未清就上远程服务）会把模块债变成分布式事务。',
    why:'学习者会把“上微服务”当成第一句，或以为单体之后直接微服务、中间没有集群与 SOA。没有延迟、发布冲突或库负载信号时拆开，只是把没理清的边界变成跨网络事务。能标出自己在容量线与服务化线各停在哪一站，才说明演进是按瓶颈，不是按名词表跳格。',
    example:'两条线一起标：\n\n```text\n容量线：单体 →（可）换大机 → 多副本集群；库忙先治库\n服务化线：模块化单体 → 经典 SOA（ESB/共享库常见）→ 微服务（独立库与发版）\n现在：一仓库一部署、无发布冲突 → 两条线都可停在单体/模块化单体\n已有远程调用但仍共享库、靠总线编排 → 服务化线停在经典 SOA，不是微服务完成\n```',
    task:'在纸上画出容量线与服务化线。标出你们项目现在各停在哪一站，以及催你进入下一站的可量化信号（延迟、发布冲突、团队数、库 CPU）。若已有远程服务，写清更接近经典 SOA 还是微服务。',
    answer:[
      '先画两条线，不要只背“上微服务”：',
      '',
      '容量线：单体 → 垂直扩展 → 水平扩展/集群。库忙时加应用副本往往更差。',
      '服务化线：单体/模块化单体 → 经典 SOA → 微服务。',
      '',
      '没有可量化信号就停在当前站；停在单体是正常结果。',
      '已有远程服务但共享库、中心总线、不能独立发版 → 经典 SOA，对照 `microservices-not-just-soa-relabel`。',
      '集群（同质副本）与拆分（异质边界）不是同一句话，见 `split-vs-cluster-not-interchangeable`。',
      '跳级会把尚未划清的模块变成跨网络事务。',
    ].join('\n'),
    keywords:'架构演进 单体 模块化单体 水平扩展 集群 SOA 微服务',
    diagram:'diagrams/arch-evolution.svg',
    points:['演进分容量线与服务化线，不是一张名词跳格表','集群是同质副本；SOA 到微服务看独立数据与发布','没有可量化信号就停在当前站'],
    deep:[
      {title:'图怎么读',body:'上半两条线是谱系；下半是容量线「水平扩展站」的常见拓扑：负载均衡、应用集群、本地与分布式缓存、文件服务、主从读写分离。仍是同一套应用，不是微服务。更细的拓扑见 `arch-scale-before-split`。'},
      {title:'为什么要两条线',body:'只讲单体到微服务，会漏掉集群与经典 SOA，也会把“加机器”和“拆领域”混成一步。容量线回答扛流量；服务化线回答边界与自治。'},
      {title:'垂直扩展放哪',body:'换更大机器能救急，但有上限且单点风险仍在。本课重点仍是：无状态后的水平扩展，以及库瓶颈不能靠加应用副本解决。'},
      {title:'SOA 与微服务',body:'都谈服务化。经典 SOA 专课见 `arch-soa-classic`；与微服务分叉补充见 `microservices-not-just-soa-relabel`。'},
      {title:'拆分与集群',body:'见 `split-vs-cluster-not-interchangeable`。先拆后簇是常见组合，但不能互相替代。'},
      {title:'和导论',body:'系统设计章先写一条路径，再谈拆分和容量，见 `arch-chapter-aim`。'},
      {title:'和消息',body:'事件驱动见 `arch-sync-vs-async`；可叠在服务化线的后几站上。'}
    ],
    refs:[['Microsoft：Architecture styles','https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/'],['Martin Fowler：Monolith First','https://martinfowler.com/bliki/MonolithFirst.html'],['Martin Fowler：Microservices（含与 SOA）','https://martinfowler.com/articles/microservices.html']]
  },
  {
    track:'java', group:'系统设计', id:'arch-monolith-when',
    title:'单体与模块化单体：何时足够',
    prompt:'小团队一上线就拆六个服务，会先痛在哪里？',
    promptAnswer:'先痛在分布式调用、排障和跨服务事务，模块之间却还在直接改对方的表。模块化单体（仍是一个进程，但模块与表边界已划清）往往更合适。',
    core:'单体把页面、API 与领域逻辑放在同一进程，本地调用与单库事务简单，排障看一条日志链路即可。代价是发布耦合、技术栈锁定、某一热点模块只能整包扩容。模块化单体（modular monolith）仍是一个进程、一次部署，但强制模块边界：依赖单向、数据库表按模块归属、禁止跨模块直连内部表。它足够支撑多数中早期产品，也是拆微服务前的体检：边界没划清就拆进程，只会变成分布式泥球（big ball of mud 的分布式版——调用跨网络，表归属仍纠缠）。',
    why:'学习者会把单体当成落伍，一上线就拆成六个服务。先痛的是分布式调用、排障和事务，模块之间却还在直接改对方的表。改成只通过模块接口访问之后，表归属清楚了，才说明还没到该付分布式成本的时候。',
    example:'早期下单、库存和支付在同一个应用里，用包隔开。库存变慢时先看索引和缓存，而不是先拆三个仓库。若订单代码直接 UPDATE 库存表，说明模块边界已经破了：先改成订单只调库存模块的公开 API（调用仍在进程内），边界收干净之后，才评估要不要拆成独立服务。',
    task:'画出当前仓库（或一个熟悉业务）的模块与表归属。找出一处跨模块直接改对方表的路径，改成模块 API。',
    answer:[
      '小团队、边界未稳、事务仍在一个库里时，单体或模块化单体足够。',
      '模块化单体：仍是一个进程；依赖单向、表按模块归属、模块之间只走公开接口。',
      '先画出模块和表的归属，把跨模块直接改表改成模块接口。',
      '独立部署和独立扩缩的痛还没出现时，不要先支付网络故障和分布式一致性的成本。',
      '六个服务先带来的是分布式调用和排障成本，不是更清晰的表归属。',
    ].join('\n'),
    keywords:'单体架构 模块化单体 部署耦合 本地事务',
    diagram:'diagrams/arch-monolith.svg',
    points:['单体共享进程与库，事务与排障简单','痛点是发布耦合与整包扩容','模块化单体仍是单进程，先固化模块与表边界再考虑拆进程'],
    deep:[
      {title:'模块化单体是什么',body:'和单体一样单进程部署；和微服务不同，调用仍在进程内。差别在纪律：公开 API、表归属、禁止直连对方内部表。见下一课体检清单。'},
      {title:'模块 API',body:'模块之间只通过公开应用服务调用，不共享内部实体。测试可以按模块装配。'},
      {title:'何时不够',body:'多团队独立发布节奏、模块资源画像差异巨大、或必须独立扩缩写库时，再看同章 `arch-microservice-split`（按业务能力拆微服务，并接受分布式成本）。'}
    ],
    refs:[['Martin Fowler：Monolith First','https://martinfowler.com/bliki/MonolithFirst.html'],['Microsoft：模块化单体','https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures']]
  },
  {
    track:'java', group:'系统设计', id:'arch-scale-before-split',
    title:'瓶颈在应用再水平扩展，再谈拆服务',
    prompt:'数据库已经 CPU 打满，再多加几个应用副本有用吗？',
    promptAnswer:'没用，往往更差。库已是瓶颈时，加应用副本会放大对库的连接与查询压力。先治理查询、索引和事务。',
    core:'水平扩展（horizontal scaling：加更多应用副本与负载均衡，而不是先换更大单机）是在单体或模块化单体之上，让无状态（stateless：实例不保存必须粘在本机的会话）应用层吃流量。前提：会话外置（session 放到 Redis 等共享存储，而不是粘在某一台内存里）、配置外置、健康检查与优雅下线。\n\n若瓶颈在共享数据库的锁、慢查询或连接数，只加应用副本会更差：副本越多，对库的连接与并发查询越多，CPU 与锁等待更挤。这时先缩短事务、治理查询与索引；仍不够再评估读副本或分片（行数不是唯一扳机，见 `mysql-split-not-at-ten-million`），而不是先拆微服务。拆服务若仍共享一个库，只是把本地争用换成网络争用，瓶颈还在。\n\n决策看压测拐点（throughput 不再随负载上升、延迟陡升的那一点）落在应用 CPU、库 CPU 还是锁等待，再决定加副本还是先治理库。',
    why:'学习者会在库已经很忙时继续加应用副本，或者从单体直接跳到拆服务。副本一多，库的锁等待更高，接口仍慢。压测拐点在库而不在应用 CPU 时加副本无效，才说明这一级是先扩无状态层，不是先拆名词。',
    example:'应用 CPU 高、库很闲时，加副本后吞吐上升，拐点移走。库的行锁等待高、应用很闲时，再加副本，连接与锁等待更长，吞吐不升——应先缩短事务和查询。拆成多个服务却仍写同一个库，瓶颈还在原来的锁上。',
    task:'用一次压测曲线标出拐点在应用 CPU、库 CPU 还是锁等待。写出“只加副本”是否有效。',
    answer:[
      '拐点在应用 CPU：只加副本有效（无状态应用 + 会话外置为前提）。',
      '拐点在库 CPU 或锁等待：只加副本无效，甚至更糟——副本↑ → 对库连接与并发查询↑。',
      '先治理查询、索引和事务；仍不够再评估读副本或分片，不是立刻拆微服务。',
      '共享同一个库的服务拆分不会自动消除这个库瓶颈。',
      '无状态应用层的容量才是副本解决的问题。',
    ].join('\n'),
    keywords:'水平扩展 负载均衡 无状态 数据库瓶颈',
    diagram:'diagrams/arch-cluster-topology.svg',
    points:['水平扩展依赖无状态应用与会话外置','库瓶颈时加副本会放大连接与锁争用','拆服务前先确认瓶颈不在共享数据'],
    deep:[
      {title:'图怎么读',body:'负载均衡把请求分到无状态应用副本；本地缓存只在本进程，跨实例共享走分布式缓存；文件独立部署；写主库、读从库，主从复制会有延迟。这是集群拓扑，不是按业务拆开的微服务。决策对照仍见：应用忙加副本有效，库忙先治库。'},
      {title:'为何库忙时加副本更差',body:'每个应用副本各自持有到数据库的连接池。副本从 2 增到 8，对库的并发会话大致按份数放大；慢查询与行锁冲突也会叠加。应用 CPU 下来了，库更堵。'},
      {title:'会话外置',body:'粘滞会话能让有状态应用暂时扩展，但故障迁移差。优先把会话放到 Redis 等外置存储，副本才可互换。'},
      {title:'与限流',body:'扩展不是无限。入口限流与背压保护库，见 `distributed-token-bucket`；进程内限流见 `sca-sentinel-intro`。'},
      {title:'和演进课',body:'容量线与服务化线见 `arch-evolution-stages`。本课专讲容量线上的水平扩展。'}
    ],
    refs:[['Microsoft：水平扩展','https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out'],['Nginx：负载均衡','https://nginx.org/en/docs/http/load_balancing.html']]
  },
  {
    track:'java', group:'系统设计', id:'arch-soa-classic',
    title:'经典 SOA：远程服务化，常停在共享库与中心总线',
    prompt:'已经把订单和库存拆成两个远程服务，还共用一个库、走企业服务总线，算不算做成微服务了？',
    promptAnswer:'不算。那是经典 SOA（面向服务架构）常见形态。微服务还要尽量独立数据、独立发布与去中心治理。',
    core:'SOA（Service-Oriented Architecture，面向服务架构）把业务能力做成可远程调用的服务，而不是永远挤在一个进程里。经典形态里常见：服务粒度偏粗、通过企业服务总线（ESB）或中心编排互通、治理偏中心化、多个服务仍共享同一套数据库或强依赖中心组件。\n\n它解决的是「能力可复用、可远程调用」，不等于已经走到微服务。微服务与 SOA 谱系相关，但分叉在：独立部署节奏、数据所有权、避免企业总线式中心化。详见 `microservices-not-just-soa-relabel`。集群（同质副本）解决容量，见 `arch-scale-before-split` 与 `split-vs-cluster-not-interchangeable`；SOA 解决的是服务化边界，两者不要并成一句。\n\n何时停在经典 SOA：组织仍接受中心治理与共享库、服务刚远程化、数据归属尚未切开。何时该往微服务走：多团队发布冲突、必须独立扩缩写库、共享库与中心总线已成为变更瓶颈——且模块边界体检已过，见 `arch-modular-boundary`。',
    why:'学习者看见远程调用和“服务”字样，就报微服务完成。其实仍共享库、仍靠总线编排时，失败与发版还绑在一起。能说出「远程有了，但数据和治理仍中心化」才说明停在经典 SOA，而不是名词跳格。',
    example:'订单服务与库存服务通过 ESB 互调，两边都写同一个 trade 库。库存发版必须和订单同一窗口，因为改表会互相影响。这是经典 SOA 味道。改成库存只写 inventory 库、订单只写 order 库、各自发版、无强制总线，才进入微服务常见形态。',
    task:'对照你们系统（或一个熟悉业务）勾三项：是否远程调用、是否仍共享写库、是否依赖中心总线/统一编排。写出更接近经典 SOA 还是微服务，并给一句理由。',
    answer:[
      '三项对照：',
      '1. 已有远程调用 → 已离开纯进程内模块调用。',
      '2. 仍共享写库 → 数据所有权未切开，更接近经典 SOA。',
      '3. 依赖 ESB/中心编排、不能独立发版 → 经典 SOA 味道更重。',
      '',
      '远程服务 + 共享库 + 中心总线 = 经典 SOA，不是微服务已完成。',
      '微服务还要：尽量独立数据、独立发布、治理去中心（对照下一课与 `microservices-not-just-soa-relabel`）。',
    ].join('\n'),
    keywords:'SOA 面向服务 ESB 共享库 微服务',
    diagram:'diagrams/arch-soa.svg',
    points:['SOA 是远程服务化，经典形态常含 ESB 与共享库','有远程调用不等于微服务已完成','独立数据与独立发布才是迈向微服务的分叉'],
    deep:[
      {title:'ESB 是什么',body:'企业服务总线：服务之间经中心通道做路由、转换与编排。好懂、好管控，也容易变成变更与故障的单点。微服务常见做法是服务间直接协作或事件，而不是万事经总线。'},
      {title:'和演进课',body:'服务化线上：模块化单体 → 经典 SOA → 微服务。见 `arch-evolution-stages`。'},
      {title:'和分布式课',body:'“本质还是 SOA”会抹掉分叉，纠正见 `microservices-not-just-soa-relabel`。'},
      {title:'下一课',body:'按业务能力拆微服务、接受分布式成本，见 `arch-microservice-split`。'}
    ],
    refs:[['Martin Fowler：Microservices（含与 SOA）','https://martinfowler.com/articles/microservices.html'],['Microsoft：Architecture styles','https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/']]
  },
  {
    track:'java', group:'系统设计', id:'arch-microservice-split',
    title:'按业务能力拆微服务，并接受分布式成本',
    prompt:'按 Controller、Service、Dao 三层拆成三个仓库，算微服务吗？',
    promptAnswer:'不算。微服务按业务能力与数据归属拆；按技术层拆只会让一次下单变成三次发布还要共享库。',
    core:'微服务按业务能力（business capability：订单、库存、支付这类可独立交付的业务职责，不是 Controller / Service / Dao 技术层）划边界：各自可独立部署、独立扩缩，并尽量拥有自己的数据（数据归属：写路径只落在本服务库，不 join / 不直接改对方表）。按技术层切开只会让一次下单变成三次发布还要共享库。\n\n拆开之后，本地事务变成跨服务协作：同步 RPC 要处理超时与重试；异步消息要处理重复与积压；链路要能追踪。失败时用补偿（compensating action：用明确的后续操作抵消已做的一步，而不是指望跨库大事务自动回滚）。网关、发现、配置、限流是支撑，不是业务边界本身。没有模块化阶段的边界，微服务会放大混乱。若只有远程调用却仍共享库、靠中心总线，停在经典 SOA，见上一课 `arch-soa-classic`。下单序列见下一课 `arch-split-order-case`；Outbox、CAP、单库优先见分布式与高并发章。',
    why:'学习者会按控制器、服务、数据访问三层拆成三个仓库，当成已经是微服务。一次下单要三次发布，表还是共享的，失败时谁补偿说不清。服务拥有自己的表、跨服务依赖写明同步或异步、失败有补偿，才说明拆的是业务能力而不是技术层。',
    example:'订单服务只写订单库，库存服务只写库存库。用户必须当场知道库存够不够时，订单同步调用库存做预留（带超时与幂等）；支付成功后再异步履约。支付失败或超时未支付时，由明确的补偿释放预留，而不是三个仓库共享一次本地事务，也不是默认上分布式大事务。',
    task:'选一个准备拆出的能力，写出：① 独立数据表（写库归属）；② 同步依赖（用户当场要结果的调用）；③ 若有跨服务副作用：异步事件与失败补偿。①② 写不出就还没准备好拆；有副作用却写不出③ 也不要拆。',
    answer:[
      '① 独立数据表：写路径只落在本服务库。',
      '② 同步依赖：用户当场要结果的调用写清超时与失败返回。',
      '③ 有跨服务副作用时：异步事件 + 失败补偿都要写得出。',
      '①② 缺一项，或有副作用却缺③ → 还没准备好拆。',
      '按控制器、服务和数据访问分层不是边界。',
      '只有远程调用、仍共享库 → 先回看 `arch-soa-classic`，不要自称微服务完成。',
      '拆开之后超时、幂等、补偿和观测都要设计，不能把一次本地事务假装还在，也不要把分布式大事务当默认项。',
    ].join('\n'),
    keywords:'微服务 业务能力 数据归属 补偿 独立部署',
    diagram:'diagrams/arch-microservices.svg',
    points:['边界是业务能力与数据归属，不是技术分层','独立部署后本地事务升级为同步或异步协作与补偿','网关与中间件是支撑，不能代替领域边界'],
    deep:[
      {title:'数据归属',body:'服务不能随便 join 对方库。要数据就通过 API 或复制的只读模型，并接受延迟。'},
      {title:'和 SOA',body:'上一课 `arch-soa-classic`。远程 + 共享库 + 中心总线不是微服务完成。分叉补充见 `microservices-not-just-soa-relabel`。'},
      {title:'与通信课',body:'同步 / 异步怎么选见 `arch-sync-vs-async`；消息何时用见 `mq-what-and-when`；Outbox 在分布式课。'},
      {title:'下一课',body:'下单链路怎样从单体拆开，见 `arch-split-order-case`。'}
    ],
    refs:[['Microsoft：微服务架构风格','https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices'],['Martin Fowler：Microservices','https://martinfowler.com/articles/microservices.html']]
  }
];

for (const {points, refs, diagram, ...lesson} of COVERAGE_PATH_07) {
  const row = diagram ? {...lesson, diagram} : lesson;
  window.LESSONS.push(row);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
