/* 《分布式高并发》D8：InnoDB count(*)；主键必须自增。 */
const COVERAGE_JAVA_79 = [
  {
    track:'java', group:"数据库", id:"mysql-count-star-innodb-not-always-scan",
    title:"“InnoDB 的 count(*) 一定扫全表”说满了",
    prompt:"为什么资料对比 MyISAM/InnoDB 时写 InnoDB 的 count(*) 要扫全表，MyISAM 直接读计数器？",
    promptAnswer:"无 WHERE 的精确总数昂贵可用汇总；有 WHERE 看索引。别用旧 MyISAM 对比代替计划。",
    core:"MyISAM 维护表级计数、InnoDB 因 MVCC 不能简单回一个数字——旧对比有历史。但 8.x 在条件、覆盖索引、并行与缓冲下，COUNT(*) 不一定等于“慢全表”；有 WHERE 时更是索引问题。把旧对比背成永远扫全表，会误导架构决策。精确总数昂贵时应用近似、汇总表或缓存。",
    why:"仪表盘每次 COUNT(*) 大表被说成引擎命运，从不加条件或汇总。",
    example:"COUNT(*) WHERE shop_id=? 应走索引。全局精确总数用汇总表定时刷新。",
    task:"划掉“InnoDB COUNT 必全表慢”。写出：无 WHERE 与有 WHERE 各怎么办。",
    answer:"划掉命运论。无 WHERE 的精确总数昂贵可用汇总；有 WHERE 看索引。别用旧 MyISAM 对比代替计划。",
    keywords:"COUNT InnoDB MVCC 汇总表",
    origin:"《分布式高并发.pdf》约第 108 页附近：InnoDB count 扫表 vs MyISAM 计数器",
    diagram:"diagrams/mysql-count-star-innodb-not-always-scan.svg",
    points:["MVCC 使表级计数器不简单","有 WHERE 看索引","精确总数可用汇总"],
    deep:[
      {title:"和覆盖索引",body:"COUNT 有时只扫二级索引更窄。看 EXPLAIN。"},
      {title:"怎样自己验证",body:"大表上对比无/有 WHERE 的 COUNT 计划与耗时。"}
    ],
    refs:[["MySQL：COUNT","https://dev.mysql.com/doc/refman/8.4/en/group-by-functions.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"],["MySQL：InnoDB","https://dev.mysql.com/doc/refman/8.4/en/innodb-storage-engine.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-pk-autoinc-not-only-choice",
    title:"“表必须有自增主键”把主键策略收窄了",
    prompt:"为什么规范写表必须有主键并举例自增主键，强调插入性能与避免页分裂？",
    promptAnswer:"自增主键常见，但不是唯一选择。业务键、UUID、号段各有代价。",
    core:"InnoDB 需要聚簇键，短且递增的主键对插入友好——资料对。但必须自增会排除合法策略：业务自然键（慎重）、UUID v7/有序 id、雪花等；无主键时隐藏行 ID 更糟（见引擎对比）。主键要短、稳定、尽量顺序，不等于只能 AUTO_INCREMENT。UUID 乱序插入的代价见既有课。",
    why:"全局唯一已用雪花，被规范逼成双主键；或用无序 UUID 当 PK 却怪分裂。",
    example:"订单用雪花 bigint PK；或 AUTO_INCREMENT 代理键+业务唯一键。避免无序 UUID 做聚簇。",
    task:"划掉“只能自增”。写出：主键要满足什么；自增解决什么。",
    answer:"划掉只能自增。要有聚簇主键且宜短宜稳宜顺。自增是常见实现，不是唯一。乱序 UUID 慎做 PK。",
    keywords:"主键 自增 聚簇索引 雪花",
    origin:"《分布式高并发.pdf》约第 104 页：表必须有主键例如自增",
    diagram:"diagrams/mysql-pk-autoinc-not-only-choice.svg",
    points:["InnoDB 需要聚簇键","宜短宜稳宜顺","自增常见但非唯一"],
    deep:[
      {title:"和隐藏行 ID",body:"无合适 PK 时隐藏 6 字节行 ID，难被业务引用。"},
      {title:"怎样自己验证",body:"对比自增与乱序 UUID 插入的页分裂/耗时（测试）。"}
    ],
    refs:[["MySQL：主键","https://dev.mysql.com/doc/refman/8.4/en/primary-key-optimization.html"],["MySQL：AUTO_INCREMENT","https://dev.mysql.com/doc/refman/8.4/en/example-auto-increment.html"],["MySQL：聚簇索引","https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_79) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
