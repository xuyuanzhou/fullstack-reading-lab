/* 《分布式高并发》D8：开发规范里的 JOIN/OR 绝对禁令。 */
const COVERAGE_JAVA_61 = [
  {
    track:'java', group:'数据库', id:'mysql-join-ban-not-absolute',
    title:'“禁止 JOIN”是团队容量启发式，不是 SQL 真理',
    prompt:'为什么资料在高并发规范里写死“禁止使用 JOIN 查询，禁止大表使用子查询”，理由是“会产生临时表”？',
    promptAnswer:'有索引、过滤足够的小结果联结可接受。用 EXPLAIN 看是否索引探查、是否危险的 temporary/filesort。',
    core:'JOIN **可以**产生临时表或文件排序，但不是必然；有合适索引时，优化器常用嵌套循环按索引探查，小表/维度表联结很常见，见 MySQL `JOIN` 文档与 `EXPLAIN`。资料把“解放数据库 CPU、计算上移服务层”收成**绝对禁令**，会逼人把本可一次索引联结的查询拆成 N+1 次往返，应用层更慢、更易不一致。大表对大表无约束的笛卡尔式联结、或把过滤推后，才真正危险。规范应写成：热点路径避免无索引的多表联结与相关子查询；用 `EXPLAIN`/`EXPLAIN ANALYZE` 证明，而不是禁止关键字 `JOIN`。视图与计算上移见 `mysql-view-is-stored-query`；外键取舍见 `mysql-fk-redundancy`。',
    why:'规范背成“代码里不准出现 JOIN”，订单详情改成先查单再循环查明细，数据库 QPS 和延迟一起升。',
    example:'`orders o JOIN order_items i ON i.order_id=o.id WHERE o.id=?`，`order_id` 有索引：EXPLAIN 多为 ref/eq_ref，不必为了禁令拆成两次查询。两张亿级表按无索引列 JOIN 且无足够过滤，才应改模型或预聚合。',
    task:'划掉“JOIN=一定临时表=禁止”。写出：何时 JOIN 可接受；要用什么证明该不该拆到应用层。',
    answer:'划掉「JOIN 一律禁止」。有索引、过滤足够的小结果联结可接受。用 EXPLAIN 看是否索引探查、是否危险的 temporary/filesort。无证据时不要把联结拆成 N+1。',
    keywords:'MySQL JOIN 临时表 EXPLAIN 规范',
    origin:'《分布式高并发.pdf》约第 105 页：禁止使用 JOIN、禁止大表子查询',
    diagram:'library-assets/distributed-hc/p0105.png',
    points:['JOIN 不必然产生临时表','无索引大表联结才危险','禁令应落到 EXPLAIN，而不是禁用关键字'],
    deep:[
      {title:'和子查询',body:'相关子查询可能反复执行；半连接/改写后的 IN/EXISTS 有时与 JOIN 等价。同样用计划说话，不要只禁语法外形。'},
      {title:'怎样自己验证',body:'对有索引的订单+明细 JOIN 做 EXPLAIN，记录 type/rows。再改成应用层两次查询循环，比延迟与语句数。'}
    ],
    refs:[['MySQL：JOIN','https://dev.mysql.com/doc/refman/8.4/en/join.html'],['MySQL：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html'],['MySQL：子查询优化','https://dev.mysql.com/doc/refman/8.4/en/subquery-optimization.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-or-not-must-become-in',
    title:'OR 不是“旧版不能走索引、必须改成 IN”',
    prompt:'为什么规范写“禁止使用 OR 条件，必须改为 IN”，并说旧版 MySQL 的 OR 不能命中索引？',
    promptAnswer:'同列多值 IN 更易读，计划常相近。跨列 OR 看 EXPLAIN，必要时 UNION 或补索引。',
    core:'同一列上的 `a=1 OR a=2` 与 `a IN (1,2)` 在现行优化器里常常落到相似计划；**不同列**上的 `col1=? OR col2=?` 才更常触发 index merge 或更差路径，需要看版本与统计信息。资料把“旧版 OR 不能命中索引”写成永久禁令，并要求一律改 IN，会误伤合法语义（跨列 OR、与 AND 混用），也忽略了 5.x/8.x 已能对多项等值做更好的处理。正确做法：对热点 SQL 看 `EXPLAIN`；能写成 IN 且语义相同就写 IN 以提高可读性；跨列 OR 考虑改写、联合索引或拆查询。不要用“OR 耗 CPU”代替计划。邻接的隐式转换与函数挡索引见既有规范课与 `mysql-where-having`。',
    why:'把 `status=1 OR status=2` 强行改成别的怪写法，或禁止一切 OR，评审只抓关键字，线上慢查询其实是跨列 OR 无索引。',
    example:'`WHERE shop_id=9 AND status IN (1,2)` 与 `status=1 OR status=2`（同列）在 8.4 上 EXPLAIN 都可能是 range/IN。`WHERE user_id=? OR order_no=?` 跨列，可能 index merge 或全表，应保证两侧有索引并比较拆成 UNION。',
    task:'划掉“OR 永远不能走索引、必须改 IN”。区分：同列多值；跨列 OR。各写一句怎么验证。',
    answer:'划掉「OR 必须改 IN」。同列多值 IN 更易读，计划常相近。跨列 OR 看 EXPLAIN，必要时 UNION 或补索引。禁令不能代替现行优化器证据。',
    keywords:'MySQL OR IN 索引 EXPLAIN',
    origin:'《分布式高并发.pdf》约第 105 页：禁止 OR，必须改为 IN',
    diagram:'library-assets/distributed-hc/p0105.png',
    points:['同列 OR 与 IN 计划常相近','跨列 OR 才更需警惕','用现行 EXPLAIN，不背旧版口诀'],
    deep:[
      {title:'和“禁止小数存货币”',body:'同份规范还有“禁止小数存货币”。若把 DECIMAL 也禁掉就错了；金额应 DECIMAL 或整数分，不要 FLOAT，见已有浮点精度课。关键字禁令要拆开看对象。'},
      {title:'怎样自己验证',body:'同一列写 OR 与 IN 各 EXPLAIN 一次，对比 type/rows。再写跨列 OR，看是否出现 index merge 或全表，再试 UNION。'}
    ],
    refs:[['MySQL：OR 与索引合并','https://dev.mysql.com/doc/refman/8.4/en/index-merge-optimization.html'],['MySQL：IN','https://dev.mysql.com/doc/refman/8.4/en/comparison-operators.html#operator_in'],['MySQL：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_61) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
