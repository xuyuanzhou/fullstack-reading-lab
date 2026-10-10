/* 《分布式高并发》D8：禁止大表子查询；扩展索引优先。 */
const COVERAGE_JAVA_80 = [
  {
    track:'java', group:"数据库", id:"mysql-subquery-ban-not-absolute",
    title:"“禁止大表子查询”要看改写与物化",
    prompt:"为什么规范在禁 JOIN 同时禁止大表使用子查询，理由是临时表？",
    promptAnswer:"子查询不是一律禁止。看优化器能否改写，以及是否该写成连接。",
    core:"相关子查询与拙劣嵌套确实可能物化临时表、放大 CPU——资料风险真实。但绝对禁止会误伤 IN/EXISTS 的合法半连接改写、派生表与 CTE。现行优化器常把子查询变成半连接或物化后优。应用 EXPLAIN ANALYZE 与改写（JOIN/EXISTS）决策，不要背禁子查询。邻接 JOIN 禁令课。",
    why:"把可半连接的 IN 子查询拆成应用循环 N+1。",
    example:"WHERE id IN (SELECT … 可索引) 看是否 semi-join。坏的相关子查询按行执行要改写。",
    task:"划掉“子查询非法”。写出：何时危险；用什么证明。",
    answer:"划掉一律禁止。危险在错误相关/大物化。用计划与改写证明。CTE/半连接是选项。",
    keywords:"子查询 半连接 物化 EXPLAIN",
    origin:"《分布式高并发.pdf》约第 105 页：禁止大表使用子查询",
    diagram:"diagrams/mysql-subquery-ban-not-absolute.svg",
    points:["拙劣子查询会物化放大","优化器常可半连接改写","计划优于口诀"],
    deep:[
      {title:"和 CTE",body:"WITH 提高可读性，不自动保证更快，见 CTE 课。"},
      {title:"怎样自己验证",body:"对同一语义对比子查询与 JOIN 的 EXPLAIN ANALYZE。"}
    ],
    refs:[["MySQL：子查询","https://dev.mysql.com/doc/refman/8.4/en/subqueries.html"],["MySQL：半连接优化","https://dev.mysql.com/doc/refman/8.4/en/semijoins.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-extend-index-before-new",
    title:"“尽量扩展索引、不要新建”是维护启发式",
    prompt:"为什么索引原则写：尽量扩展索引，不要新建索引？",
    promptAnswer:"共享最左前缀则扩展。无关访问路径应新建并控数量。",
    core:"表上索引越多写越贵，把 a 扩成 (a,b) 常比再挂一条 b 更省——资料有理。但绝对化会挤出怪异宽索引：服务无关查询的列被塞进同一索引，或为扩展而破坏最左前缀。该扩展还是新建看查询集合是否共享前缀。邻接索引个数课。",
    why:"硬把互不相关的查询塞进一条十列索引；或每条查询一条新索引到爆炸。",
    example:"已有 (shop_id) 且常查 (shop_id, created_at) → 扩展。另一条按 order_no 等值查 → 单独唯一索引，不要塞进 shop 索引末尾。",
    task:"划掉“禁止新建索引”。给出：扩展的条件；新建的条件。",
    answer:"划掉禁止新建。共享最左前缀则扩展。无关访问路径应新建并控数量。用查询集合决策。",
    keywords:"索引维护 最左前缀 写放大",
    origin:"《分布式高并发.pdf》约第 106 页：尽量扩展索引不要新建",
    diagram:"diagrams/mysql-extend-index-before-new.svg",
    points:["扩展常省写放大","无关路径应新建","宽索引也会废"],
    deep:[
      {title:"和覆盖索引",body:"为覆盖而无限加长列，写放大可能超过收益。"},
      {title:"怎样自己验证",body:"对比扩展前后写入 p99 与目标查询计划。"}
    ],
    refs:[["MySQL：优化索引","https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html"],["MySQL：多列索引","https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_80) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
