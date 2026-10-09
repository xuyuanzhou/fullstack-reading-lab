/* 《分布式高并发》D8：消息必须有序；同步复制才可靠。 */
const COVERAGE_JAVA_87 = [
  {
    track:'java', group:"分布式与高并发", id:"message-order-not-always-required",
    title:"“必须竭尽全力保证严格有序”要先问要不要",
    prompt:"为什么资料在消息顺序处问：一定要使出所有力气保证严格有序吗？",
    core:"资料自己提出了好问题：严格全局有序极贵。多数业务只要分区/业务键有序或可乱序补偿。Kafka 分区内有序已够常见（见 kafka-order 课）。不要默认上全局单分区。",
    why:"为全局有序把吞吐打没，业务其实只按订单号有序。",
    example:"同一 orderId 进同分区；不同订单可并行。对账修复偶发乱序。",
    task:"划掉“消息系统必须全局有序”。写出：你的业务键有序范围。",
    answer:"划掉全局必须。按业务键分区有序通常够用。全局有序是极端选项。",
    keywords:"消息顺序 分区 吞吐",
    origin:"《分布式高并发.pdf》约第 33 页：是否必须严格有序",
    diagram:"diagrams/message-order-not-always-required.svg",
    points:["全局有序极贵","业务键有序常见","可乱序则补偿"],
    deep:[
      {title:"和幂等",body:"乱序时更要幂等与版本号。"},
      {title:"怎样自己验证",body:"写清“同一键内有序”契约，压测分区数。"}
    ],
    refs:[["Kafka 文档：排序","https://kafka.apache.org/documentation/#intro_concepts_and_terms"],["分布式课邻接","https://kafka.apache.org/documentation/"],["Martin Fowler：Microservices","https://martinfowler.com/articles/microservices.html"]]
  },
  {
    track:'java', group:"分布式与高并发", id:"sync-replication-not-only-durability",
    title:"“要可靠就必须同步复制”忽略了半同步与丢失窗口",
    prompt:"为什么资料写要想保证，一方面要同步复制，不能异步？",
    core:"异步复制有丢失窗口，资料强调同步有道理。但绝对同步复制会牺牲可用性与延迟；半同步、法定人数、多 AZ 同步是光谱。要的是 RPO/RTO 目标，不是口号同步。MySQL 半同步、磁盘落盘与应用确认层次不同。",
    why:"为绝对同步把跨城延迟打进所有写入；或异步当永不丢。",
    example:"同城半同步满足秒级 RPO；跨城异步+补偿。明确 RPO。",
    task:"划掉“只能同步复制”。用 RPO 选异步/半同步/同步。",
    answer:"划掉只能同步。按 RPO 选复制语义。异步有窗口；同步有延迟与可用代价。",
    keywords:"复制 RPO 半同步",
    origin:"《分布式高并发.pdf》约第 33 页附近：同步复制才能保证",
    diagram:"diagrams/sync-replication-not-only-durability.svg",
    points:["异步有丢失窗口","同步有延迟代价","用 RPO 选型"],
    deep:[
      {title:"和消息投递",body:"MQ 的 at-least-once 与复制确认是另一层。"},
      {title:"怎样自己验证",body:"写出可接受丢失秒数，对照复制模式。"}
    ],
    refs:[["MySQL：半同步","https://dev.mysql.com/doc/refman/8.4/en/replication-semisync.html"],["MySQL：复制","https://dev.mysql.com/doc/refman/8.4/en/replication.html"],["CAP twelve years later","https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_87) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
