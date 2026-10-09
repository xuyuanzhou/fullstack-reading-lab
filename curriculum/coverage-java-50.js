/* Redis mind map: proxy hash mod ≠ Cluster; SAVE blocks vs BGSAVE. */
const COVERAGE_JAVA_50 = [
  {
    track:'java', group:'缓存', id:'redis-proxy-hash-not-cluster',
    title:'Twemproxy 取模分片不是 Redis Cluster',
    prompt:'为什么导图把 Twitter 的代理、Hash 取模和「Redis 集群」画在同一枝上？',
    core:'Twemproxy、Codis 一类方案在客户端或代理上按哈希（常是取模）把键分到多台**彼此不知道对方**的 Redis。官方 **Redis Cluster** 从 3.0 起用 **16384 槽**、节点互知、`MOVED`/`ASK` 重定向；运维入口是 `redis-cli --cluster`，见 `redis-cluster-cli-not-trib`。槽不是一致性哈希环，见 `redis-string-max-512mb`。哨兵只做主从切换，不分片，见 `redis-sentinel-cluster`。导图上的代理不能当现行默认集群答案。',
    why:'按取模代理去扩容，加减节点几乎整表搬家，还以为自己开了官方 Cluster。客户端只连代理时，也学不会处理重定向。',
    example:'三台独立 Redis 前面挂 Twemproxy，键 `user:1` 落在第 2 台。加第四台后取模结果变了，大量键要迁移。Cluster 里同一键对应固定槽，迁移按槽进行，客户端收到 MOVED 再换节点。',
    task:'划掉“集群=代理+取模”。分别写出代理方案和 Cluster 的分片单位、客户端是否要处理重定向。',
    answer:'代理取模分的是独立实例，客户端常只看见代理。Cluster 分的是 16384 槽，节点互知，客户端要跟 MOVED/ASK。新部署不要把 Twemproxy 画成默认。',
    keywords:'Redis Cluster Twemproxy Codis 16384 槽 取模',
    origin:'本地库 Redis 思维导图把 Twemproxy、Hash 取模与集群画在一起',
    diagram:'diagrams/redis-proxy-hash.svg',
    points:['代理取模后面是多台互不知晓的 Redis','Cluster 用 16384 槽和客户端重定向','加减节点时取模几乎整表搬家，槽迁移只动受影响的键'],
    deep:[
      {title:'和 Codis',body:'Codis 也是旧分片代理路线。官方文档讲集群时不再把它当默认。看见「代理用户读写」要先问是不是 Cluster 协议。'},
      {title:'怎样自己验证',body:'对照 Redis Cluster 规范：槽数、MOVED。再看 Twemproxy 说明：它不实现 Cluster 协议。本机用 redis-cli --cluster nodes 应看到槽分配，而不是代理配置文件里的取模列表。'}
    ],
    refs:[['Redis：集群规范','https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/'],['Redis：缩放集群','https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/']]
  },
  {
    track:'java', group:'缓存', id:'redis-save-blocks-bgsave',
    title:'SAVE 堵住命令处理，BGSAVE 才是线上快照',
    prompt:'为什么导图把 SAVE 和 BGSAVE 并排，有人就在高峰直接 SAVE？',
    core:'`SAVE` 在**当前服务线程**里把数据集写成 RDB，写完之前**不处理别的命令**。`BGSAVE` **fork 子进程**去做快照，父进程继续接命令；配置文件里的 `save` 规则触发的也是 BGSAVE。fork 瞬间仍可能有短停顿，写时拷贝会占额外内存，但不会像 SAVE 那样整段堵死。AOF 打开后 RDB 仍可并存，见 `redis-aof-keeps-rdb`。持久化窗口见 `redis-persistence`。',
    why:'高峰执行 SAVE，所有读写卡在快照写盘上，延迟尖刺被当成「Redis 挂了」。',
    example:'凌晨维护可以 `SAVE`。白天流量里应 `BGSAVE` 或靠 `save 900 1` 一类规则。子进程写 dump.rdb 时，父进程仍能 `GET`。',
    task:'划掉“两种快照一样、随便用”。写出 SAVE 与 BGSAVE 谁堵住命令循环，配置里的 save 走哪条。',
    answer:'SAVE 堵住命令处理。BGSAVE 用子进程，父进程继续服务。配置自动快照走 BGSAVE。fork 仍有短停顿和内存代价，但不是整段堵死。',
    keywords:'Redis SAVE BGSAVE RDB fork copy-on-write',
    origin:'本地库 Redis 思维导图把 SAVE 与 BGSAVE 并列为两种产生 RDB 的方式',
    diagram:'diagrams/redis-save-bgsave.svg',
    points:['SAVE 在服务线程写完快照，期间不接命令','BGSAVE fork 子进程，父进程继续服务','配置里的 save 规则触发的是 BGSAVE'],
    deep:[
      {title:'写时拷贝不是免费的',body:'子进程与父进程共享页，父进程一改页就复制。大实例上 BGSAVE 仍要盯内存和 fork 耗时，只是不必用 SAVE 堵死流量。'},
      {title:'怎样自己验证',body:'读 Redis 持久化文档里 SAVE 与 BGSAVE。在测试实例高峰模拟 SAVE，观察其他客户端是否阻塞；改 BGSAVE 后父进程应仍能响应。'}
    ],
    refs:[['Redis：持久化','https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/'],['Redis：SAVE','https://redis.io/docs/latest/commands/save/'],['Redis：BGSAVE','https://redis.io/docs/latest/commands/bgsave/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_50) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
