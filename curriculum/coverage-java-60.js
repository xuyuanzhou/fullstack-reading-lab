/* 《分布式高并发》D8：带过期的 LRU 名实不符；BASE 不是禁事务的定理。 */
const COVERAGE_JAVA_60 = [
  {
    track:'java', group:'分布式与高并发', id:'lru-capacity-not-ttl-expire',
    title:'题叫“带过期时间的 LRU”，正文往往只做容量淘汰',
    prompt:'为什么资料标题写「设计一个带有过期时间的 LRU 缓存」，后面却只讲 HashMap + 链表把尾巴踢掉？',
    promptAnswer:'LRU 看容量淘汰，TTL 看时间过期。两套机制，不要并成一句。',
    core:'**容量 LRU**回答：容量满了踢最久未用。**TTL/绝对过期**回答：这条记录到点失效，即使容量还没满。两者可以叠在同一实现里，但不是同一机制。资料标题带“过期时间”，正文却停在 O(1) 的 get/set + 链表头插、满则删尾——这是容量维，没有 per-entry deadline，也没有到期懒删/定时扫。面试若只画链表，答不出：未满时过期键是否还应命中、过期与 LRU 谁先踢、写时带 `expireAt` 还是读时校验。生产缓存常见是容量策略（近似 LRU/LFU）与 TTL 并行，见 `redis-eviction-policy-menu`、`distributed-cache`；Redis 的 `volatile-lru` 更是“先限定在带 TTL 的键里再近似 LRU”，说明两维正交。',
    why:'实现只做链表 LRU，上线后键永不过期，活动价在容量未满时一直命中旧值；标题里的“过期”从没落地。',
    example:'`set(k,v)` 只移到链表头；满了删尾。没有 `expireAt`。键 A 写入后 10 分钟业务要求失效，但缓存只装了 100 条、当前 40 条，A 会一直命中。补上：节点带 `deadline`；`get` 若已过期则删并返回未命中；容量满时仍按 LRU 踢未过期的尾节点。',
    task:'划掉“讲完链表 LRU = 答完带过期的 LRU”。分别用一句话定义容量淘汰与 TTL 失效；写出未满容量时过期键应怎样。',
    answer:'划掉「讲完链表 LRU = 答完带过期」。容量满踢最久未用；TTL 到点失效即使未满。未满时过期键在 get/扫时删除并视为未命中。两维都要设计，标题有过期就不能只画链表。',
    keywords:'LRU TTL 过期 容量淘汰 缓存',
    origin:'《分布式高并发.pdf》约第 197–198 页：带有过期时间的 LRU 缓存',
    diagram:'diagrams/lru-capacity-not-ttl-expire.svg',
    points:['容量 LRU 与 per-entry TTL 是两维','只画链表满删尾不等于实现了过期','未满时过期键仍应失效并视为未命中'],
    deep:[
      {title:'和 Redis 政策名',body:'allkeys-lru 在满内存时近似 LRU；键的 TTL 由 EXPIRE 另管。volatile-lru 只在带 TTL 的集合里挑牺牲品。不要把政策名里的 lru 当成“已经有过期语义”。'},
      {title:'怎样自己验证',body:'写一个容量 2 的 LRU：插入 3 个键应踢最旧。再给键设 1 秒 TTL，容量未满等待后 get 应未命中。若只实现链表，第二步会失败。'}
    ],
    refs:[['Redis：Eviction','https://redis.io/docs/latest/develop/reference/eviction/'],['Redis：EXPIRE','https://redis.io/docs/latest/commands/expire/'],['MDN：HTTP Caching','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching']]
  },
  {
    track:'java', group:'分布式与高并发', id:'base-slogan-not-ban-tx',
    title:'BASE 是工程口号，不是“禁止分布式事务”的定理',
    prompt:'资料把 BASE 写成定理，并说大型系统不可能用分布式事务、必须靠 BASE。为什么这两句都不成立？',
    promptAnswer:'BASE 是权衡口号，不是禁止分布式事务的定理。大型系统仍可按边界选用本地事务、Outbox 或协调协议。',
    core:'**BASE**（Basically Available / Soft state / Eventually consistent）是对一类互联网实践的概括口号，**不是**像 Gilbert–Lynch 那样对 CAP 的形式化定理。它说的是：有些读写路径可以接受短暂不一致与中间态，以换吞吐与分区下的继续服务，见 `distributed-cap`、`distributed-consistency-three-words`。资料写成“不可能采用分布式事务……BASE 就是办法”，会把口号收成禁令。库存扣减、支付记账仍常用**本地事务**、约束更新、Outbox，必要时 XA/Saga，见 `distributed-xa`、`distributed-outbox`、`distributed-mq-not-erase-invariant`。软状态指同步过程中允许中间态，不是“错多久都行”；最终一致要约定收敛条件与对账，不是放下不管。',
    why:'架构评审听见“我们是 BASE 系统”就删掉订单库事务，超卖和对账缺口一起出现。',
    example:'详情页缓存、粉丝数展示可以最终一致。下单扣库存仍在同一库事务里条件更新，或 Outbox 后异步扣并幂等对账。不会因为背了 BASE 三个字母就关掉事务。',
    task:'划掉“BASE=定理且禁止分布式/本地事务”。写出：口号允许放松什么；哪些路径仍要事务或不变量。',
    answer:'划掉「BASE=定理且禁事务」。口号允许部分路径放松立刻一致与接受中间态。钱货不变量、唯一约束、Outbox 仍要事务或同等强度。最终一致要有收敛与对账，不是放弃正确性。',
    keywords:'BASE CAP 最终一致 分布式事务 Outbox',
    origin:'《分布式高并发.pdf》约第 19–20 页：BASE 定理与不可能用分布式事务',
    diagram:'diagrams/base-slogan-not-ban-tx.svg',
    points:['BASE 是实践口号不是形式化定理','放松立刻一致不等于禁止事务','最终一致仍要收敛条件与对账'],
    deep:[
      {title:'和 CAP 贴标签',body:'同页把库分成 CA/CP/AP 也过粗，见 distributed-cap。BASE 不能用来给产品盖永久 AP 章。'},
      {title:'怎样自己验证',body:'列三条接口：详情缓存、扣库存、跨库转账。标哪些可最终一致、哪些必须本地事务或 Saga/对账。背 BASE 不应删掉扣库存的事务。'}
    ],
    refs:[['Gilbert–Lynch：CAP','https://www.cs.princeton.edu/courses/archive/spr22/cos418/papers/cap.pdf'],['微服务：事务性 Outbox','https://microservices.io/patterns/data/transactional-outbox.html'],['MySQL：XA','https://dev.mysql.com/doc/refman/8.4/en/xa.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_60) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
