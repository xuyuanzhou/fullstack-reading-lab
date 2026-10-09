/* 《分布式高并发》D8：查询天然幂等；Pub/Sub 时间依赖。 */
const COVERAGE_JAVA_83 = [
  {
    track:'java', group:"分布式与高并发", id:"select-not-always-business-idempotent",
    title:"“SELECT 天然幂等”不等于业务读可随便重试",
    prompt:"为什么资料在消息幂等处写 select 是天然幂等操作？",
    core:"在数据不变时，同一 SELECT 结果相同——SQL 层说法成立。但业务读可能带审计、限流计数、一次性令牌校验，重试并不“无副作用”。消息消费幂等要对写路径设计键，不能靠“查询天然幂等”跳过。邻接 mq-delete 与 idempotent-key 课。",
    why:"消费逻辑先 SELECT 再决定，却把读当无事，漏了读侧计量。",
    example:"SELECT 库存可重试；但 SELECT 并标记“已展示券”就有副作用，需幂等键。",
    task:"划掉“凡查询均可随便重试”。区分无副作用读与有副作用读。",
    answer:"划掉凡查询皆可。SQL SELECT 在数据不变时结果稳定，但业务读可能有副作用。写路径仍要幂等键。",
    keywords:"幂等 SELECT 消息消费",
    origin:"《分布式高并发.pdf》约第 32 页：select 是天然幂等操作",
    diagram:"diagrams/select-not-always-business-idempotent.svg",
    points:["SQL 层与业务层幂等不同","读也可能有副作用","写路径仍要键"],
    deep:[
      {title:"和删除幂等",body:"删除更不是天然幂等，见 delete 课。"},
      {title:"怎样自己验证",body:"给读路径列副作用清单：日志、计数、外部调用。"}
    ],
    refs:[["幂等概念","https://developer.mozilla.org/en-US/docs/Glossary/Idempotent"],["HTTP 幂等","https://www.rfc-editor.org/rfc/rfc9110.html#name-idempotent-methods"],["MySQL：查询","https://dev.mysql.com/doc/refman/8.4/en/select.html"]]
  },
  {
    track:'java', group:"缓存", id:"redis-pubsub-not-reliable-queue",
    title:"Pub/Sub 的时间依赖说明它不是可靠队列",
    prompt:"为什么资料写发布订阅有时间依赖：必须先订阅再发布，订阅者还得保持运行？",
    core:"Redis Pub/Sub 不持久化给离线订阅者，晚订阅就丢历史——资料时间依赖描述正确。由此推出：不能把 Pub/Sub 当订单队列或任务队列；需要积压、确认、重放应用 Stream/专业 MQ。邻接 redis-pubsub 与 XTRIM 课。",
    why:"用 Pub/Sub 做下单异步，订阅者重启丢消息。",
    example:"配置变更通知可用 Pub/Sub；订单履约用 Stream/Kafka。",
    task:"划掉“订阅发布=队列”。写出：Pub/Sub 适合什么；丢什么保证。",
    answer:"划掉当队列。Pub/Sub 适合在线广播。无持久、无积压给晚到者。要可靠投递换 Stream/MQ。",
    keywords:"Redis Pub/Sub Stream 可靠投递",
    origin:"《分布式高并发.pdf》约第 30 页：发布订阅时间依赖",
    diagram:"diagrams/redis-pubsub-not-reliable-queue.svg",
    points:["晚订阅丢失历史","不是任务队列","可靠投递换 Stream/MQ"],
    deep:[
      {title:"和键空间通知",body:"键事件也是信号，不是业务队列。"},
      {title:"怎样自己验证",body:"先 PUBLISH 再 SUBSCRIBE，观察收不到历史。"}
    ],
    refs:[["Redis Pub/Sub","https://redis.io/docs/latest/develop/pubsub/"],["Redis Streams","https://redis.io/docs/latest/develop/data-types/streams/"],["Redis 键空间通知","https://redis.io/docs/latest/develop/pubsub/keyspace-notifications/"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_83) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
