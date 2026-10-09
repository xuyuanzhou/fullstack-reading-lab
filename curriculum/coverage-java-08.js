/* Batch 08: independently written Java/MySQL lessons from page-specific review. */
const COVERAGE_JAVA_08 = [
  {
    track:'java', group:'数据库', id:'mysql-where-having',
    title:'HAVING 不是带别名的 WHERE',
    prompt:'为什么“WHERE 用列名能走索引，HAVING 用别名不能走索引、专门写聚集函数”不能当标准答案？',
    core:'WHERE 在分组前筛选行，不能引用 SELECT 列表别名，也不能引用 COUNT、SUM 一类聚集函数；标准 SQL 这样规定，是因为写 WHERE 时这些结果列往往还没算出来。HAVING 在分组之后筛选组，可以写聚集表达式，MySQL 还允许它引用 SELECT 列表别名、分组列，以及外层子查询列。手册对带分组的 HAVING 写明：接近最后才应用，LIMIT 在它之后，并且没有这一层优化。没有 GROUP BY、也没有聚集函数时，优化器会把 HAVING 并进 WHERE，这时它不再是“只能扫临时结果”。因此不要把本该过滤单行的条件写成 HAVING col > 0；应写回 WHERE，才有机会用上索引与早期过滤。HAVING 的典型用途是 COUNT(*) > 1 或 MAX(salary) > 10 这类组条件，不是“凡是别名都放 HAVING”，也不是“HAVING 只能写聚集函数”。',
    why:'把行级过滤塞进 HAVING，会丢掉 WHERE 侧的索引与下推；把“能写别名”记成 HAVING 的唯一语法，又会漏掉聚集条件和无 GROUP BY 时的合并行为。',
    example:'orders(user_id, amount)，要查下单超过 3 次的用户：WHERE 里可以按时间或状态先砍行，GROUP BY user_id 之后用 HAVING COUNT(*) > 3。把 user_id = 7 写成 HAVING 而表上有该列索引时，手册明确劝你改回 WHERE。SELECT COUNT(*) AS cnt ... HAVING cnt > 3 在 MySQL 里合法，是扩展；同一别名不能写进 WHERE。',
    task:'在 MySQL 8.4 测试库对同一张带索引的表分别 EXPLAIN：WHERE 过滤、无分组的 HAVING 过滤、以及 GROUP BY 后的 HAVING COUNT(*)。对照 Extra 与 type，说明哪一种还会并进 WHERE，哪一种是分组后筛选。',
    answer:'WHERE 过滤可以使用索引，type 和 key 按这条行级条件来。无分组、无聚集的 HAVING 会被并进 WHERE，计划接近第一条。GROUP BY 之后的 HAVING COUNT(*) 在分组完成后才筛，接近最后执行，手册写明没有这一层优化。所以只有第三条是分组后筛选。',
    keywords:'MySQL 8.4 WHERE HAVING 别名 聚集函数 GROUP BY 无优化 合并 WHERE',
    points:['WHERE 不能引用别名和聚集函数','HAVING 筛组，并可引用别名与聚集','无 GROUP BY 且无聚集时 HAVING 并进 WHERE','行级条件应写 WHERE，不要塞进 HAVING'],
    deep:[
      {title:'别名不是走不走索引的原因',body:'走不走索引，看条件能不能在分组前用上索引，不是看写的是列名还是别名。无分组的 HAVING 常常被改写成 WHERE，这时它不再是“只能扫临时结果”。行级条件写回 WHERE，才有机会早过滤。'},
      {title:'和 GROUP BY 流程',body:'WHERE → GROUP BY → 聚合 → HAVING 的顺序与门槛写法见 mysql-group-by-having。INNER/LEFT 保留谁见 mysql-inner-join-match。'},
      {title:'怎样自己验证',body:'在 8.4 对带索引的表分别 EXPLAIN 三条：WHERE、无分组 HAVING、GROUP BY 后的 HAVING COUNT(*)。对比 type 和 Extra，看第二条是否并进 WHERE，第三条是否仍在分组之后。'},
    ],
    refs:[['MySQL 8.4：SELECT Statement','https://dev.mysql.com/doc/refman/8.4/en/select.html'],['MySQL 8.4：Problems with Column Aliases','https://dev.mysql.com/doc/refman/8.4/en/problems-with-alias.html'],['MySQL 8.4：WHERE Clause Optimization','https://dev.mysql.com/doc/refman/8.4/en/where-optimization.html'],['MySQL 8.4：GROUP BY 处理','https://dev.mysql.com/doc/refman/8.4/en/group-by-handling.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_08) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
