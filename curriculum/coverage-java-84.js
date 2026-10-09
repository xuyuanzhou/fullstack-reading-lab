/* 《分布式高并发》D8：CAP 贴标签；MySQL 扩展性差绝对化。 */
const COVERAGE_JAVA_84 = [
  {
    track:'java', group:"分布式与高并发", id:"cap-label-not-product-tattoo",
    title:"“Redis/Mongo=CP、网站=AP”这种纹身不可靠",
    prompt:"为什么资料在 CAP 处直接写 CA=Oracle、AP=大多数网站、CP=Redis/Mongodb？",
    core:"用产品名贴死 CP/AP 是常见八股，资料也中招。CAP 先要定义分区与一致性含义；同一产品不同部署（集群模式、写关注、会话模型）表现不同。Redis 单机与集群、Mongo 写关注与读偏好都会变。对照 distributed-cap：先定义再取舍，不要纹身。",
    why:"面试背 Redis=CP，却说不清集群分区时行为。",
    example:"Mongo 多数写关注偏 C；主读偏好下读可能旧。不要一句 CP 盖棺。",
    task:"划掉产品纹身表。写出：讨论 CAP 前要先问的两个问题。",
    answer:"划掉纹身。先问分区场景与一致性定义。再谈具体部署的取舍。产品名不是标签。",
    keywords:"CAP Redis Mongo 标签",
    origin:"《分布式高并发.pdf》约第 19–20 页：CA/AP/CP 产品对照表",
    diagram:"diagrams/cap-label-not-product-tattoo.svg",
    points:["先定义分区与 C","部署改变取舍","产品名不能纹身"],
    deep:[
      {title:"和 BASE",body:"BASE 口号也不禁事务，见 base 课。"},
      {title:"怎样自己验证",body:"读所选产品的一致性文档一节，用部署参数改写标签。"}
    ],
    refs:[["CAP twelve years later","https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/"],["distributed-cap 课邻接","https://dev.mysql.com/doc/refman/8.4/en/"],["Mongo 写关注","https://www.mongodb.com/docs/manual/reference/write-concern/"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-scalability-not-hopeless",
    title:"“MySQL 扩展性差”不能当 NoSQL 唯一理由",
    prompt:"为什么资料在 NoSQL 动机里强调关系数据库扩展性差、需要复杂技术？",
    core:"单机关系库确有扩展边界，分库分表与中间件有成本——动机真实。但写成 MySQL 扩展性差当真理，会忽略只读副本、分区表、分布式中间件与云托管形态，也会忽略 NoSQL 自身一致性与查询代价。选型看访问模型与团队能力，不是站队。邻接 nosql-label 与 split-not-at-ten-million。",
    why:"QPS 未打满就迁文档库，失去事务与联结，团队不会运维新系统。",
    example:"读多先加副本与缓存；写热点再分片。文档模型适合疏稀属性，不是因为 MySQL 差。",
    task:"划掉“关系库不能扩展”。列出两条 MySQL 侧扩展手段与一条换引擎的正当理由。",
    answer:"划掉绝望论。副本、缓存、分片都是路。换引擎因模型契合，不是因为口号扩展性差。",
    keywords:"扩展性 副本 分片 NoSQL",
    origin:"《分布式高并发.pdf》约第 57 页附近：关系数据库扩展性差",
    diagram:"diagrams/mysql-scalability-not-hopeless.svg",
    points:["单机有边界但可扩展","NoSQL 也有代价","按访问模型选"],
    deep:[
      {title:"和一千万拆分",body:"行数阈值不可靠，见 split 课。"},
      {title:"怎样自己验证",body:"画读写下瓶颈在 CPU/IO/锁哪一层，再选手段。"}
    ],
    refs:[["MySQL：复制","https://dev.mysql.com/doc/refman/8.4/en/replication.html"],["MySQL：分区","https://dev.mysql.com/doc/refman/8.4/en/partitioning.html"],["NoSQL 概述","https://martinfowler.com/articles/nosqlIntro.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_84) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
