/* 《分布式高并发》D8：秒杀 MQ 顶住≠控库；虚拟节点数 32 非定律。 */
const COVERAGE_JAVA_102 = [
  {
    track:'java', group:'分布式与高并发', id:'seckill-mq-not-only-db-valve',
    title:'“MQ 排队顶住就能控住数据库”把削峰说满了',
    prompt:'为什么资料在秒杀流程里写：压力最大在 MQ，只要排队服务顶住，后面下单与扣库存压力都能靠调节消费者数量自己控制？',
    promptAnswer:'MQ 削峰不等于控住库存。库表扣减与幂等才是硬阀门。',
    core:'层层过滤、用 MQ **削峰**方向对，见 `distributed-seckill`、`distributed-mq-not-erase-invariant`。但把“MQ 顶住 ⇒ 下游全可控”说满会漏掉：积压会打满磁盘/内存与重平衡；**消费者个数**受连接池、行锁、幂等与库存原子约束，不是自由旋钮；超时未支付回滚、重复投递、毒消息都会反压数据库。入口限流、缓存预减/预扣、失败快速拒绝与 MQ 要同设计，不能把宝压在“队列先扛住”。',
    why:'只加消费者清 backlog，把库打挂；或 MQ 磁盘满了整条链路停写却仍以为“后面可控”。',
    example:'开抢：网关限流 + 库存预扣；过线请求入队。消费者数按 DB 池与 P99 定，并设最大 lag 告警与拒收新单。积压超阈值时 fail-fast，而不是无限加 consumer。',
    task:'划掉“MQ 顶住=下游随便控”。写出：调节消费者还受哪两类约束；积压本身会怎样反噬。',
    answer:'划掉说满。消费者受连接池、锁与幂等约束。积压会打满 MQ 存储并拖垮可用性。削峰要和限流、预扣、告警一起设计。',
    keywords:'秒杀 MQ 削峰 消费者 积压',
    origin:'《分布式高并发.pdf》约第 53 页：MQ 顶住即可控下单与扣库存',
    diagram:'library-assets/distributed-hc/p0053.png',
    points:['MQ 削峰成立但不能说满','消费者数不是自由旋钮','积压会反噬存储与可用性'],
    deep:[
      {title:'和库存不变量',body:'入队不等于卖出；超时释放与超卖防护仍要原子扣减，见秒杀与 MQ 不变量课。'},
      {title:'怎样自己验证',body:'压测：固定消费者时观察 DB 与 MQ lag；盲目加倍消费者看库连接与锁等待是否先炸。'}
    ],
    refs:[['Kafka：消费者','https://kafka.apache.org/documentation/#intro_consumers'],['RabbitMQ：流控与告警','https://www.rabbitmq.com/docs/alarms'],['秒杀架构邻接（Redis 限流）','https://redis.io/docs/latest/develop/use-cases/rate-limiter/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'consistent-hash-vnode-count-not-law',
    title:'“虚拟节点设成 32”是经验起点，不是均匀定律',
    prompt:'为什么资料写一致性哈希通常把虚拟节点数设为 32 甚至更大，就认为很少的服务节点也能相对均匀？',
    promptAnswer:'虚拟节点数没有万能常数。太少不均，太多元数据与计算变贵。',
    core:'**虚拟节点**把每个物理节点映射到环上多点，减轻“节点太少时弧长不均”，资料方向对，见 `distributed-consistent-hash`。把 **32**（或任意固定数）写成定律会过时：合适数量取决于节点数、键分布、迁移成本与实现（有的系统用数百到上千 vnode）。虚拟节点也**治不好单键热点**，见 `hash-skew-not-only-virtual-nodes`。选型应测分片负载方差与扩缩迁移量，而不是背 32。',
    why:'三节点背 32 仍倾斜却不敢加 vnode；或 vnode 上万导致元数据与重建过重。',
    example:'缓存集群先按负载方差选 vnode 密度，扩节点时对比迁移键比例。热点 SKU 另做隔离，不指望把 32 改成 128 就匀。',
    task:'划掉“虚拟节点=32 就均匀”。写出：32 解决的是哪类不均；解决不了哪类。',
    answer:'划掉定律。虚拟节点改善节点弧长不均，数量要按实测调。单键热点不靠加大 32 解决。',
    keywords:'一致性哈希 虚拟节点 倾斜',
    origin:'《分布式高并发.pdf》约第 100 页：虚拟节点通常设为 32 甚至更大',
    diagram:'library-assets/distributed-hc/p0100.png',
    points:['虚拟节点减轻节点弧长不均','固定 32 只是经验起点','单键热点要另治'],
    deep:[
      {title:'和一致性哈希论文',body:'经典动机是变更时少搬数据；均匀性与 vnode 密度相关，但没有普适魔法整数。'},
      {title:'怎样自己验证',body:'固定键集，对比 vnode=8/32/256 时各物理节点键数方差与模拟扩容迁移量。'}
    ],
    refs:[['Consistent Hashing 论文入口','https://www.cs.princeton.edu/courses/archive/fall09/cos518/papers/karger-consistent-hashing.pdf'],['Redis Cluster 规格','https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/'],['Nginx：一致性哈希 upstream','https://nginx.org/en/docs/http/ngx_http_upstream_module.html#hash']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_102) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
