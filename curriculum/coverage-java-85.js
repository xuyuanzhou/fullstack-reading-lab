/* 《分布式高并发》D8：中间代理层；冷热比 1:4。 */
const COVERAGE_JAVA_85 = [
  {
    track:'java', group:"数据库", id:"db-proxy-layer-not-only-choice",
    title:"“中间代理层统一数据源”不是分库唯一解",
    prompt:"为什么资料在分库手段里写通过中间代理层统一管理所有数据源、对应用透明？",
    promptAnswer:"代理层是一种拆分手段，不是唯一架构。先证明单库瓶颈再引入。",
    core:"代理层（中间件）可集中路由、降连接，资料方案成立。但不是唯一：应用侧分片 SDK、只读入口、按领域拆库也常见。透明代理会把路由复杂度与故障集中到代理；应用感知分片则要改代码。选型看团队与多语言约束。",
    why:"上了代理以为应用永不用改，跨片 JOIN 与分布式事务仍爆。",
    example:"ProxySQL/自研中间层做读写分离；或 ShardingSphere 应用侧。跨片查询仍要设计。",
    task:"划掉“必须代理才算分库”。对比代理透明与应用感知各一条代价。",
    answer:"划掉唯一解。代理集中路由也集中故障；应用感知要改代码但边界清晰。跨片问题两种都躲不开。",
    keywords:"分库 代理 读写分离",
    origin:"《分布式高并发.pdf》约第 60 页附近：中间代理层管理数据源",
    diagram:'library-assets/distributed-hc/p0060.png',
    points:["代理可降连接与集中路由","不是唯一分片形态","跨片复杂度仍在"],
    deep:[
      {title:"和连接平方",body:"代理常是降连接的先手，见连接课。"},
      {title:"怎样自己验证",body:"列跨片查询清单，看代理是否真透明。"}
    ],
    refs:[["ProxySQL","https://proxysql.com/"],["MySQL：复制","https://dev.mysql.com/doc/refman/8.4/en/replication.html"],["Martin Fowler：Microservices","https://martinfowler.com/articles/microservices.html"]]
  },
  {
    track:'java', group:"数据库", id:"hot-cold-ratio-not-fixed-one-to-four",
    title:"“冷热数据比约 1:4”不是通用定律",
    prompt:"为什么资料在历史存取场景写冷热比例约为 1:4？",
    promptAnswer:"用访问频率与合规留存定热温冷。比例是结果不是公理。",
    core:"用比例提醒分层存储有价值，但 1:4 随业务变化：社交 feed、财务归档、日志管道比例完全不同。应用访问统计与生命周期策略（热→温→冷）决定，不要背比例。",
    why:"按 1:4 采购容量，实际热数据远超预算。",
    example:"订单 90 天热、两年温、更早冷备；比例用查询统计校准，不是 1:4。",
    task:"划掉“通用 1:4”。写出：如何用访问数据定分层。",
    answer:"划掉通用比。用访问频率与合规留存定热温冷。比例是结果不是公理。",
    keywords:"冷热分层 归档 生命周期",
    origin:"《分布式高并发.pdf》约第 60 页附近：冷热比约 1:4",
    diagram:'library-assets/distributed-hc/p0060.png',
    points:["比例随业务变","用访问统计校准","分层策略重于数字"],
    deep:[
      {title:"和分区表",body:"按时间分区便于摘冷数据。"},
      {title:"怎样自己验证",body:"按时间桶统计访问，画出真实热温冷。"}
    ],
    refs:[["MySQL：分区","https://dev.mysql.com/doc/refman/8.4/en/partitioning.html"],["MySQL：归档引擎讨论见手册存储引擎","https://dev.mysql.com/doc/refman/8.4/en/storage-engines.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_85) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
