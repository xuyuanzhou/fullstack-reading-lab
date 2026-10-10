/* 《分布式高并发》D8 续抽：消息解耦≠消掉不变量；创建不是默认 PUT。 */
const COVERAGE_JAVA_51 = [
  {
    track:'java', group:'分布式与高并发', id:'distributed-mq-not-erase-invariant',
    title:'消息解耦不消掉库存不变量',
    prompt:'为什么资料写「库存挂了也不影响下单」，有人就只写队列就返回成功？',
    promptAnswer:'上了消息也不消掉业务不变量。扣库存、记订单仍要在权威侧守住。',
    core:'把订单写进消息队列，只是把库存扣减**推迟**到消费者，并没有删掉「成功订单数不能超过可售库存」这条不变量。资料里「库存暂时不可用也不影响下单」说的是调用时机解耦，不是业务上可以永久缺库存。用户已看到下单成功时，权威扣减仍必须发生一次，失败要补偿或对账，见 `distributed-outbox`、`distributed-seckill`、`distributed-reconcile-last`。全部改成消息也不会消灭一致性问题，见 `arch-sync-vs-async`。队列长度削峰可以丢掉超额请求，那是限流，不是「写进队列就等于卖出成功」。',
    why:'照资料只写库+入队就返回成功，库存消费失败或积压时，页面上的成功单已经超过库存。事后才发现超卖，却以为解耦已经解决了分布式事务。',
    example:'订单服务落单并投递 `OrderCreated`，接口返回 200。库存消费者宕机一小时，消息堆积。可售库存 10，成功单已到 30。对账按订单号找回多卖的单，而不是改一个总数。若秒杀必须当场知库存够不够，校验仍应同步，不能只靠事后消息。',
    task:'划掉“解耦=可以不管库存”。写出：入队返回成功时，库存侧还必须具备哪三样机制，才谈得上最终一致。',
    answer:'入队只推迟扣减。还要：业务与事件同事务发出（Outbox）、消费幂等与失败补偿、对账把差额落到订单号。没有这三样，成功单可以多于库存。削峰丢弃超额请求是限流，不是写进队列就等于卖出。',
    keywords:'消息队列 解耦 最终一致 Outbox 库存 超卖',
    origin:'《分布式高并发.pdf》约第 27 页：库存不可用也不影响下单的解耦叙述',
    diagram:'diagrams/distributed-mq-not-erase.svg',
    points:['入队只推迟库存动作，不删掉卖出上限','最终一致靠 Outbox、幂等、补偿与对账','削峰丢请求是限流，不是写队列即售出'],
    deep:[
      {title:'和用户当场失败',body:'库存够不够若必须在下单页可见，应同步校验或本地原子扣减。消息适合「已发生事实」的传播，不适合把「是否允许卖」也推迟到用户离开之后。'},
      {title:'邻接点',body:'Outbox 与对账见 distributed-outbox、distributed-reconcile-last。消费幂等键见 distributed-idempotent-key、mq-consume-idempotent-key。削峰限流见 distributed-token-bucket，不是写队列即售出。'},
      {title:'怎样自己验证',body:'造一次：落单入队后停掉库存消费者。看成功单是否继续增加、库存是否不动。恢复消费后核对订单与扣减是否一对一；对不上的单号应出现在对账差额里。'}
    ],
    refs:[['微服务：事务性 Outbox','https://microservices.io/patterns/data/transactional-outbox.html'],['微服务：Saga','https://microservices.io/patterns/data/saga.html']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http-create-post-not-put',
    title:'创建资源默认用 POST，不要把插入背成 PUT',
    prompt:'为什么资料把「插入」写成 PUT，又把 REST 收成「只回 JSON」？',
    promptAnswer:'服务分配 id 的创建用 POST 到集合，返回新 URI。客户端已知最终 URI 时，可对该 URI 做 PUT，效果是创建或覆盖且宜幂等。',
    core:'HTTP 里 **PUT** 表示对**已知 URI** 的整份替换，重复提交的预期效果与一次相同；**POST** 常用于在集合下**创建**由服务分配标识的资源，默认不幂等，见 `http-methods`。资料把 CRUD 的「插入」直接写成 PUT，会和「按 id 覆盖更新」搅在一起。客户端若已选定最终 URI（例如按约定的订单号），创建也可以设计成对该 URI 的 PUT；那是显式约定，不是默认口诀。前后端用 JSON 交换、模板改由前端渲染，是分离部署的常见做法，**不等于** REST 规范本身，更不能用来解释「所以只用 GET/POST」。',
    why:'面试背「插入用 PUT」，网关或客户端按幂等重试 PUT，却打到会新建行的实现上，或者把 POST 创建当成可覆盖写。另一边把 REST 理解成「接口返回 JSON」，方法语义完全没学。',
    example:'`POST /orders` 正文无 id，服务返回 `201` 与 `Location: /orders/9`。对 `/orders/9` 再 `PUT` 整份表示，是覆盖，不是再插入一行。资料若写「插入用 PUT」，新人会对 `/orders` 发 PUT 并期望服务分配 id，和 RFC 里对目标资源的替换语义对不上。',
    task:'划掉“插入=PUT、REST=只回 JSON”。分别写出：服务分配 id 的创建、客户端已知最终 URI 的创建，各更贴近哪种方法。',
    answer:'服务分配 id 的创建用 POST 到集合，返回新 URI。客户端已知最终 URI 时，可对该 URI 做 PUT，效果是创建或覆盖且宜幂等。只用 JSON 做前后端分离，不代替方法语义，也不能解释成只用 GET/POST。',
    keywords:'HTTP POST PUT REST 创建 幂等 JSON',
    origin:'《分布式高并发.pdf》约第 17–18 页 REST 叙述：插入写成 PUT，实践收成只回 JSON',
    diagram:'diagrams/http-create-post-not-put.svg',
    points:['PUT 是对已知 URI 的整份替换','服务分配 id 的创建常用 POST','JSON 前后端分离不等于 REST 方法语义'],
    deep:[
      {title:'和 PATCH',body:'只改部分字段用 PATCH，不要用错当成“小 PUT”。覆盖整份表示才是 PUT。状态码与错误体约定见 `api-error-contract`。'},
      {title:'怎样自己验证',body:'读 MDN 的 PUT/POST。对同一新建接口分别用 POST 与误用的 PUT 各打一次，看是分配新 id、覆盖已有资源，还是 405。再确认文档有没有写“客户端可选用的最终 URI”。'}
    ],
    refs:[['MDN：PUT','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT'],['MDN：POST','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST'],['RFC 9110：HTTP Semantics','https://www.rfc-editor.org/rfc/rfc9110.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_51) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
