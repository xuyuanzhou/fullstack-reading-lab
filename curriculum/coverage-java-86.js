/* 《分布式高并发》D8：业务分库；数据倾斜。 */
const COVERAGE_JAVA_86 = [
  {
    track:'java', group:"数据库", id:"business-split-db-not-only-path",
    title:"“常用拆分是业务分库”不是分片终点",
    prompt:"为什么资料写常用数据库拆分手段是业务分库，把不同业务部署到不同物理服务器？",
    promptAnswer:"业务分库清边界。单表写/数据量仍热点再水平拆。",
    core:"按业务域拆库（订单库、用户库）是清晰默认，资料对。但不是终点：单业务仍可能要水平分片；反向也忌过度拆碎导致分布式事务横飞。先按边界拆，热点再水平拆。邻接 split-not-at-ten-million。",
    why:"每个小模块一个库，跨库事务满天飞；或单库到瓶颈仍不分片。",
    example:"交易域一个库；其中订单表按 shop_id 哈希分片。用户域另一库。",
    task:"划掉“拆分=业务分库结束”。写出下一步何时水平拆。",
    answer:"划掉终点论。业务分库清边界。单表写/数据量仍热点再水平拆。避免过碎。",
    keywords:"业务分库 水平分片 边界",
    origin:"《分布式高并发.pdf》约第 14 页附近：业务分库",
    diagram:"diagrams/business-split-db-not-only-path.svg",
    points:["业务分库清边界","热点再水平拆","过碎引入分布式事务"],
    deep:[
      {title:"和千万行",body:"行数不是唯一扳机，见拆分课。"},
      {title:"怎样自己验证",body:"画域边界与跨库事务边，数有多少必须跨库。"}
    ],
    refs:[["MySQL：分区","https://dev.mysql.com/doc/refman/8.4/en/partitioning.html"],["Martin Fowler：Microservices","https://martinfowler.com/articles/microservices.html"],["分布式事务边界课邻接","https://dev.mysql.com/doc/refman/8.4/en/xa.html"]]
  },
  {
    track:'java', group:"分布式与高并发", id:"hash-skew-not-only-virtual-nodes",
    title:"“数据分配不一定均匀”不只靠虚拟节点收尾",
    prompt:"为什么资料在哈希分片处反复提到数据分配不一定均匀？",
    promptAnswer:"热点不只靠加虚拟节点。业务键设计、本地缓存与拆分热键也要上场。",
    core:"哈希与热点键都会倾斜，资料提醒对。虚拟节点改善节点增减与分布（见 consistent-hash 课），但不解决单键热点（秒杀商品）。还要键设计、本地缓存、热点拆分。不要以为上了一致性哈希就均匀。",
    why:"热点 SKU 打到同一分片，虚拟节点帮不上。",
    example:"用户 id 哈希较匀；秒杀 item_id 要隔离热点键。",
    task:"划掉“有虚拟节点就均匀”。区分节点倾斜与键热点。",
    answer:"划掉万能虚拟节点。节点分布与单键热点是两问题。后者要键设计与隔离。",
    keywords:"倾斜 热点键 一致性哈希",
    origin:"《分布式高并发.pdf》约第 60、94 页附近：数据分配不一定均匀",
    diagram:"diagrams/hash-skew-not-only-virtual-nodes.svg",
    points:["分布倾斜≠单键热点","虚拟节点管节点分布","热点键要另治"],
    deep:[
      {title:"和令牌桶",body:"热点入口还要限流，见 token-bucket。"},
      {title:"怎样自己验证",body:"统计分片 QPS 与单键 QPS，看哪一种炸。"}
    ],
    refs:[["一致性哈希课邻接","https://en.wikipedia.org/wiki/Consistent_hashing"],["Redis 集群","https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_86) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
