/* 《分布式高并发》D8：低区分度索引；组合列顺序。 */
const COVERAGE_JAVA_76 = [
  {
    track:'java', group:"数据库", id:"mysql-low-selectivity-index-heuristic",
    title:"“禁止低区分度/热更新列建索引”是成本提示",
    prompt:"为什么规范禁止在更新频繁、区分度不高的属性上建索引，并举性别例子？",
    promptAnswer:"单独低基数列常废。组合索引里低基数列可靠后若前缀已筛窄。",
    core:"低区分度索引过滤弱，还要为每次更新维护 B+ 树，资料方向对。但写成绝对禁止会误伤：性别+其它列的组合索引、或过滤后仍有用的中等基数列。决策看选择性公式、写放大与 EXPLAIN，不是看列名是不是性别。邻接索引个数课。",
    why:"把 status 低基数列单独索引却从不查；或拒绝任何含性别的组合索引。",
    example:"单独 INDEX(gender) 常无用。(shop_id, status, created_at) 若查询总是带 shop_id，则 status 可以靠后。用 count(distinct)/count(*) 估选择性。",
    task:"划掉“性别列永远不能进索引”。写出：单独低基数列为何常废；组合里何时可出现。",
    answer:"划掉列名禁令。单独低基数列常废。组合索引里低基数列可靠后若前缀已筛窄。用选择性与计划证明。",
    keywords:"选择性 写放大 组合索引",
    origin:"《分布式高并发.pdf》约第 105 页：禁止低区分度/热更新列建索引",
    diagram:"diagrams/mysql-low-selectivity-index-heuristic.svg",
    points:["低区分度单独索引常废","写放大是真实成本","组合位置与计划说了算"],
    deep:[
      {title:"和热更新",body:"热点计数器列每次 UPDATE 都改索引，代价高于区分度问题。"},
      {title:"怎样自己验证",body:"对低基数列建/删索引，对比 EXPLAIN 与更新耗时。"}
    ],
    refs:[["MySQL：优化索引","https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html"],["MySQL：多列索引","https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-composite-selectivity-order-heuristic",
    title:"“区分度高的列必须在前”要服从查询形态",
    prompt:"为什么规范写建立组合索引必须把区分度高的字段放在前面？",
    promptAnswer:"先看最左前缀与谓词，再用区分度在合法前缀内微调。范围列后置。",
    core:"高区分度靠前常能更快缩小范围，是有用启发式。但组合索引列序首先服从最左前缀与真实 WHERE/ORDER BY，而不是只按区分度排序：若查询总是先等值 shop_id 再过滤，即使 shop_id 区分度低于 sku_id，也应 shop_id 在前。范围条件位置还会截断后续列使用。用 EXPLAIN 与慢查询证明，不要只背区分度。",
    why:"把区分度最高的 user_uuid 放第一列，但所有 SQL 只按 shop_id 查，索引形同虚设。",
    example:"查询 WHERE shop_id=? AND created_at>? 应用 (shop_id, created_at)。不要只因为 created_at 更“乱”就颠倒。",
    task:"划掉“永远高区分度在前”。写出：列序先看什么；区分度何时参与。",
    answer:"划掉绝对顺序。先看最左前缀与谓词，再用区分度在合法前缀内微调。范围列后置。EXPLAIN 验证。",
    keywords:"组合索引 最左前缀 区分度",
    origin:"《分布式高并发.pdf》约第 105 页：组合索引区分度高的在前",
    diagram:"diagrams/mysql-composite-selectivity-order-heuristic.svg",
    points:["列序先服从查询","区分度是微调不是唯一规则","范围条件截断后续列"],
    deep:[
      {title:"和扩展索引",body:"已有 a 索引时改成 (a,b) 常优于再挂一条 b。"},
      {title:"怎样自己验证",body:"对两种列序建索引，跑同一 SQL 看 key 与 rows。"}
    ],
    refs:[["MySQL：多列索引","https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html"],["MySQL：优化索引","https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_76) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
