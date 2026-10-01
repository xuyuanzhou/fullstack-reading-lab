/* Independently written lessons prompted by topics in a privately owned PDF.
   No purchased text or artwork is included in the public curriculum. */
window.LESSONS.push(
{
track:'java',group:'分布式与高并发',id:'distributed-cap',title:'CAP：先定义分区，再谈取舍',
prompt:'发生网络分区时，一个写入请求究竟应该成功还是等待？',
core:'CAP 讨论的是分布式系统发生网络分区时，一致性与可用性的取舍。一致性在这里指单一、最新的读写视图；可用性指非故障节点对请求给出响应。不能把一个产品永久贴成“CP”或“AP”，还要看具体操作、部署和故障策略。',
why:'“CAP 三选二”容易让人忽略分区是问题发生的前提，也掩盖读、写、故障恢复的不同语义。',
example:'两地节点断联后，订单库存写入若必须避免冲突，某一侧可能拒绝写入；若两侧继续接受写入，则需要定义恢复后的冲突处理。',
task:'画出两个节点失联后的写请求路径，并明确你会向用户返回成功、失败还是等待，以及恢复后如何收敛。',
answer:'依据业务不变量选择。关键订单或库存可牺牲部分可用性；允许暂时分歧的资料可继续服务并设计合并规则。不能单凭产品名称给出结论。',
keywords:'CAP consistency availability partition Redis MongoDB 分区 一致性 可用性',origin:'《分布式高并发.pdf》第 19 页的 CAP 讨论',diagram:'diagrams/cap-partition.svg',
deep:[{title:'前置：什么叫网络分区',body:'节点还在运行，但节点间消息无法在可接受时间内到达。分区期间，系统无法同时证明另一侧已接受什么。'},{title:'边界：一致性不是所有语境中的同一个词',body:'CAP 的 C 通常按线性一致性理解，和数据库 ACID 的一致性约束不同。比较方案时应写清读写操作、故障模型与用户可见保证。'},{title:'常见误区',body:'“Redis 是 CP”“MongoDB 是 AP”都过于笼统。复制、确认级别、主节点选举和客户端读偏好会改变具体行为。'}]
},
{
track:'java',group:'分布式与高并发',id:'distributed-kafka-order',title:'Kafka 顺序：分区内有序',
prompt:'想保证同一订单事件的顺序，整个 Topic 只能有一个分区吗？',
core:'Kafka 为每个分区维护有序日志；消费者在该分区内按偏移量读取。将同一业务键稳定映射到同一分区，可以在保留多个分区的同时维护该键的日志顺序。跨分区没有全局顺序保证。',
why:'把“同一实体有序”误解为“全局单队列”会过早牺牲吞吐，并忽略消费者重试导致的业务处理乱序。',
example:'以 orderId 作为消息键，同一订单的创建、支付、取消事件进入同一分区；不同订单可并行。',
task:'设计四个分区的订单事件流，说明同一订单如何保持顺序，以及失败重试时消费者如何避免后续事件越过前一事件。',
answer:'生产者稳定使用 orderId 为键，消费者按分区顺序处理并定义失败阻塞、重试或停车场策略；如果分区数改变，还需评估键的映射变化。',
keywords:'Kafka topic partition key order offset 消息顺序',origin:'《分布式高并发.pdf》第 33 页的消息顺序建议',diagram:'diagrams/kafka-order.svg',
deep:[{title:'顺序的范围',body:'偏移量只在同一分区内可比较。多个分区让不同业务键并行，并不形成全局序列。'},{title:'业务顺序还需消费者维护',body:'消费端如果把同一分区任务无约束并行化，或者失败后跳过消息，日志顺序也不等于副作用执行顺序。'},{title:'常见误区',body:'“一个 Topic 只能有一个队列”并非保持单个订单顺序的必要条件；先定义究竟按订单、账户还是全局排序。'}]
},
{
track:'java',group:'分布式与高并发',id:'distributed-bloom',title:'布隆过滤器：可能存在，确定不存在',
prompt:'为什么布隆过滤器命中后还要查询真正的数据？',
core:'布隆过滤器用位数组与多个哈希函数表示集合。查询若有任一目标位为 0，就能判定元素未被加入；若所有位为 1，只表示可能加入，存在假阳性。普通布隆过滤器不能安全地直接清除共享的位。',
why:'把它当作精确索引，或将哈希值直接逐个比较，会导致错误的缓存穿透防护和删除逻辑。',
example:'请求一个不存在的商品 ID：过滤器说“确定没有”即可挡在数据库外；说“可能有”时仍需查权威数据。',
task:'用 12 位位数组和两个哈希位置模拟插入 A、B；若两者共享一位，直接删除 A 的位会发生什么？',
answer:'B 可能被错误判为不存在，即假阴性。普通布隆过滤器不支持这样删除；可重建、使用计数布隆或换可删除的数据结构，并评估各自代价。',
keywords:'Bloom filter 布隆过滤器 false positive 位图 删除 缓存穿透',origin:'《分布式高并发.pdf》第 79–82 页的布隆过滤器图解',diagram:'diagrams/bloom-filter.svg',
deep:[{title:'插入与查询',body:'插入时将 k 个哈希位置设为 1。查询时重算位置；全部为 1 才进入“可能存在”分支。哈希碰撞让不同元素可能共用位。'},{title:'容量与误判',body:'误判率受位数组长度、哈希函数数量及插入量共同影响。容量满后不能继续沿用最初的误判率估算。'},{title:'常见误区',body:'比较两个 URL 的哈希值并不是布隆过滤器的成员测试；普通位数组上的直接清零也不是安全删除。'}]
},
{
track:'java',group:'分布式与高并发',id:'distributed-xa',title:'XA 与两阶段提交的边界',
prompt:'XA、2PC 和 3PC 是同一个协议的三个名字吗？',
core:'XA 是事务管理器与资源管理器交互的一套接口规范，常用于两阶段提交：先准备，再提交或回滚。3PC 是另一个理论协议，不应写成“XA 的第三阶段”；超时本身不能保证分布式故障后自动安全提交。',
why:'架构评审若把“超时自动提交”当成可靠恢复策略，会忽略协调者故障、资源锁持有和未知结果。',
example:'订单库和账户库参与 XA 事务。准备阶段一方已锁定资源、另一方失联时，系统需要恢复与决策机制，不能随意把已准备事务当作成功。',
task:'标出协调者崩溃在准备前、准备后和提交中的状态，说明业务何时可对外宣称成功。',
answer:'只有决议持久化并按协议恢复后才能判断整体结果；准备成功不等于最终提交。应检查数据库与事务管理器的具体实现和故障恢复策略。',
keywords:'XA 2PC 3PC two phase commit transaction 分布式事务',origin:'《分布式高并发.pdf》第 71、77 页的 XA 与 3PC 说明',
deep:[{title:'前置：原子性',body:'跨资源事务想让相关状态共同提交或共同回滚。单库事务不能自然覆盖两个独立资源。'},{title:'两阶段的作用',body:'准备阶段询问参与者是否可以提交，决议阶段通知参与者执行。协议解决的是协同决策，不消除网络故障和阻塞成本。'},{title:'常见误区',body:'“XA 包括 2PC 和 3PC”及“3PC 一超时就能自动提交”都需要更正；具体产品支持范围要看官方文档。'}]
},
{
track:'java',group:'分布式与高并发',id:'distributed-cache',title:'缓存雪崩、击穿与穿透',
prompt:'很多请求突然落到数据库，先确认是哪一种失效路径？',
core:'雪崩通常指大量键在相近时间失效或缓存整体故障；击穿偏向单个热点键失效后的并发回源；穿透则是请求根本不存在的数据。三种情形的根因和保护手段不同。',
why:'统一回答“加分布式锁”可能锁错范围，还可能让所有请求阻塞；要先观察请求键分布、缓存命中率与数据库压力。',
example:'凌晨整点批量导入的键同时过期是集中失效；热卖商品详情失效是热点回源；随机伪造 ID 是不存在数据的请求。',
task:'给三种场景分别指定一个观测指标、一种主要保护手段和一个副作用。',
answer:'集中失效可错开 TTL 并限流；热点可单次回源或允许短暂旧值；不存在数据可做参数校验、空值缓存或过滤器。每种方案都要界定陈旧、误判和回源峰值。',
keywords:'Redis cache avalanche stampede penetration TTL 缓存雪崩 击穿 穿透',origin:'《分布式高并发.pdf》第 25 页的缓存失效方案',
deep:[{title:'先定义正确性',body:'决定缓存可容忍多久的旧值、如何失效、数据库能承受多大峰值，再选择锁、预热或限流。'},{title:'不要把锁当万能答案',body:'锁可减少同一键的重复构建，却可能造成排队和超时；缓存服务整体不可用时，仅有热点锁也保不住数据库。'}]
},
{
track:'java',group:'分布式与高并发',id:'distributed-token-bucket',title:'令牌桶：速率与突发分别控制',
prompt:'允许每秒 100 个请求，是否意味着任何 100 毫秒都最多 10 个？',
core:'令牌桶按设定速率补充令牌，并以桶容量限制可积累的额度。它允许短时突发，长期平均速率则受补充速率约束；这与严格固定子窗口上限不是同一个保证。',
why:'选择限流算法时要区分“保护平均负载”和“禁止突发”。错误参数可能让下游瞬时过载。',
example:'补充速率 100 令牌/秒、桶容量 200 时，空闲足够久后可能短时通过 200 个请求。',
task:'为数据库最多承受 50 个并发查询的接口选用令牌桶或并发信号量，并解释为什么。',
answer:'并发容量应由信号量、连接池等机制限制；令牌桶限制到达速率，两者可组合。桶容量还需按下游可承受突发配置。',
keywords:'token bucket rate limiting burst capacity 限流 令牌桶',origin:'《分布式高并发.pdf》第 89–91 页的限流章节',
deep:[{title:'两个独立参数',body:'补充速率决定长期可通过的工作量；桶容量决定闲置后可积累的最大突发。'},{title:'分布式实现',body:'多实例共享额度需要原子状态更新和明确的时间/故障语义；每实例各限 100 次不等于整个系统只限 100 次。'}]
},
{
track:'java',group:'分布式与高并发',id:'distributed-consistent-hash',title:'一致性哈希与虚拟节点',
prompt:'为什么加一台缓存节点后，不应让所有键都重新映射？',
core:'一致性哈希把键和节点映射到同一环上，键顺时针落到目标节点。节点增减通常只影响环上的一部分键；虚拟节点可改善节点分布不均，但无法自动解决热点键。',
why:'扩缩容会改变缓存命中、数据迁移和负载。理解映射机制才能估算故障时受影响的范围。',
example:'环上新增节点 N，主要接管它与前一个节点之间的键；原来集中访问的单个热键仍可能集中到 N。',
task:'画出三个节点和六个键的环，加入第四节点后逐个标记迁移的键，再指定热点键保护措施。',
answer:'只迁移新节点接管区间中的键；热点键可结合复制、拆分、局部缓存或业务层限流，虚拟节点本身不消除单键热点。',
keywords:'consistent hashing virtual nodes hotspot 一致性哈希 虚拟节点',origin:'《分布式高并发.pdf》第 94 页的一致性哈希讨论',
deep:[{title:'解决的问题',body:'相比对节点数取模，节点变化时减少键的大规模重映射。实际迁移量仍依赖环分布与实现。'},{title:'代价与边界',body:'虚拟节点会增加元数据与管理复杂度；副本、故障转移及数据迁移一致性必须另行设计。'}]
},
{
track:'java',group:'分布式与高并发',id:'distributed-seckill',title:'秒杀：先守住库存不变量',
prompt:'十万个请求争最后一件商品，怎样证明不会超卖？',
core:'先定义库存不变量：成功订单数不能超过可售库存。入口限流、排队和缓存可以削峰，但最终扣减必须依赖原子条件更新或同等强度的事务机制。支付超时与取消还要有补偿或释放规则。',
why:'“用 Redis 扣库存”只描述一个步骤；数据库订单、支付和回补之间的失败边界才决定是否真正可靠。',
example:'数据库执行带条件的库存扣减，只有受影响行数为 1 才继续创建订单；重复下单由业务唯一约束拦住。',
task:'画出请求限流、资格校验、库存预扣、订单创建、支付超时和库存回补的状态机，并指出每一步重试条件。',
answer:'每个操作使用业务幂等键；把库存成功扣减作为有条件的原子操作，明确预占与真实库存的权威来源，并用对账修正跨服务失败。',
keywords:'秒杀 seckill inventory overselling atomic update MySQL Redis',origin:'《分布式高并发.pdf》的秒杀设计相关章节',diagram:'diagrams/seckill-flow.svg',
deep:[{title:'性能与正确性分层',body:'限流决定多少流量进入；队列缓解峰值；事务和唯一约束守住业务不变量。不能用排队来代替原子扣减。'},{title:'失败注入',body:'模拟扣库存成功而订单创建失败、支付回调重复、取消后回补重复，检查库存与订单最终能否对账。'}]
},
{
track:'java',group:'分布式与高并发',id:'distributed-outbox',title:'事务消息与 Outbox：消除双写空窗',
prompt:'订单已经提交，但发消息时进程崩溃，怎样恢复？',
core:'将业务状态与待发布事件写入同一个本地事务的 Outbox 表，由独立发布器持续发送。它缩小了数据库提交与消息发布之间的丢失窗口，但发布器可能重复发送，消费者仍要幂等。',
why:'直接“先写库、再发消息”存在不可原子化的空窗；反过来先发消息又可能让消费者看不到尚未提交的订单。',
example:'订单事务同时插入订单行和 OrderCreated 事件行；发布器读取未投递事件并推送 Kafka，成功后更新处理标记。',
task:'在发布成功但标记未更新时让进程崩溃，预测重启后的消息次数及消费者处理方式。',
answer:'事件可能再发送一次。消费者用事件 ID 或业务键去重，并让去重记录与业务副作用共享可靠事务边界。',
keywords:'transactional outbox Debezium CDC 双写 事务消息 幂等',origin:'《分布式高并发.pdf》的分布式事务与消息可靠性相关章节',
deep:[{title:'边界与成本',body:'Outbox 解决本地数据库与发送意图的原子记录；不自动实现端到端恰好一次，也需要清理、重试、顺序和监控。'},{title:'CDC 变体',body:'可以由变更数据捕获读取 Outbox 表，再写入消息系统；设计时仍要明确键、重复消息和发布延迟。'}]
},
{
track:'java',group:'分布式与高并发',id:'distributed-lock',title:'分布式锁：租约不是永久所有权',
prompt:'拿到 Redis 锁后，执行时间超过过期时间会怎样？',
core:'常见 Redis 锁用唯一令牌和过期时间构成租约，释放时只删除自己持有的令牌。锁过期后原持有者仍可能继续运行；因此对关键资源的最终写入，还需检查所有权、版本或业务层不变量。',
why:'把“拿到锁”当作数据库一致性的最终证明，会忽略进程暂停、网络延迟和租约过期。',
example:'工作者 A 持锁后暂停，租约过期；B 获得新锁并更新记录。A 恢复后若不校验版本，可能覆盖 B 的结果。',
task:'模拟 A 暂停、B 获取新锁、A 恢复写入，提出避免旧持有者覆盖的状态校验。',
answer:'用数据库版本条件更新、唯一约束或单调 fencing token 校验新旧持有者；释放锁时比较唯一令牌，不能直接 DEL 他人的锁。',
keywords:'Redis distributed lock lease fencing token 分布式锁 租约',origin:'《分布式高并发.pdf》的分布式锁相关章节',
deep:[{title:'锁的适用边界',body:'租约可减少并发工作，但不能让已经执行中的旧工作者自动停止。需要按写入目标的能力设计防旧写措施。'},{title:'常见误区',body:'过期时间越长不等于越安全；它影响故障恢复速度与误并发窗口。续期也需要明确工作者失联时的行为。'}]
}
);
Object.assign(window.LESSON_REFERENCES,{
 'distributed-cap':[['Gilbert 与 Lynch：Brewer 猜想的形式化讨论','https://www.cs.princeton.edu/courses/archive/spr22/cos418/papers/cap.pdf']],
 'distributed-kafka-order':[['Apache Kafka：官方文档','https://kafka.apache.org/documentation/']],
 'distributed-bloom':[['Redis：Bloom Filter','https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/'],['Redis：Cuckoo Filter','https://redis.io/docs/latest/develop/data-types/probabilistic/cuckoo-filter/']],
 'distributed-xa':[['MySQL 8.4：XA Transactions','https://dev.mysql.com/doc/refman/8.4/en/xa.html']],
 'distributed-cache':[['Redis：Cache Aside','https://redis.io/docs/latest/develop/use-cases/cache-aside/']],
 'distributed-token-bucket':[['Redis：Rate Limiting','https://redis.io/docs/latest/develop/use-cases/rate-limiter/']],
 'distributed-consistent-hash':[['Karger 等：Consistent Hashing and Random Trees','https://people.csail.mit.edu/karger/Papers/web.pdf']],
 'distributed-seckill':[['MySQL 8.4：Locking Reads','https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html'],['MySQL 8.4：UPDATE','https://dev.mysql.com/doc/refman/8.4/en/update.html']],
 'distributed-outbox':[['Debezium：Outbox Event Router','https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html']],
 'distributed-lock':[['Redis：Distributed Locks','https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/']]
});
