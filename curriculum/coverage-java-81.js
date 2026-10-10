/* 《分布式高并发》D8：AND 可乱序；右模糊可用索引。 */
const COVERAGE_JAVA_81 = [
  {
    track:'java', group:"数据库", id:"mysql-and-order-optimizer-reorders",
    title:"“AND 条件可乱序”靠的是优化器，不是不用管列序",
    prompt:"为什么索引原则写 and 之间可以乱序，优化器会调成索引能识别的形式？",
    promptAnswer:"等值 AND 常可重排匹配索引。索引物理序、范围与 OR 仍关键。",
    core:"同一层 AND 等值条件，优化器常会重排以匹配索引——资料这句话对查询书写有安慰作用。但组合索引物理列序仍决定最左前缀；范围条件位置、OR、函数包列不会因为 AND 乱序而自动变好。不要写成“SQL 里列序完全无所谓”。",
    why:"以为 AND 乱序万能，把范围列写在中间仍怪优化器。",
    example:"WHERE b=1 AND a=1 常仍能用 (a,b)。但 a>1 AND b=1 对 (a,b) 的利用不同于等值。",
    task:"划掉“列序完全无所谓”。写出：优化器能重排什么；什么仍由索引序决定。",
    answer:"划掉完全无所谓。等值 AND 常可重排匹配索引。索引物理序、范围与 OR 仍关键。用 EXPLAIN 看。",
    keywords:"优化器 最左前缀 AND",
    origin:"《分布式高并发.pdf》约第 106 页：and 之间可以乱序",
    diagram:'library-assets/distributed-hc/p0106.png',
    points:["等值 AND 常可重排","索引物理序仍重要","范围/OR/函数不靠乱序拯救"],
    deep:[
      {title:"和 OR",body:"资料也写 OR 会遍历全表——过绝对，见 OR 课。"},
      {title:"怎样自己验证",body:"交换等值 AND 顺序，对比 EXPLAIN key。"}
    ],
    refs:[["MySQL：优化索引","https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html"],["MySQL：多列索引","https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-right-fuzzy-like-can-use-index",
    title:"右模糊（前缀%）常常可走索引，不是“模糊都扫表”",
    prompt:"为什么同一页既禁 % 开头，又写右模糊 321% 会使用索引？",
    promptAnswer:"前缀%（右模糊）常可范围；前导%难最左。选择性差仍可能放弃索引。",
    core:"资料内部其实已区分：前导 % 难用最左，前缀匹配可范围扫描。面试若只背模糊查询不能用索引，会把 LIKE 'prefix%' 错杀。仍要用 EXPLAIN 确认；前缀太短、选择性差时优化器仍可能放弃索引。",
    why:"搜索框前缀补全被改成全表；或以为任何 LIKE 都安全。",
    example:"LIKE '138%' 对手机号前缀索引友好。LIKE '%138' 应换方案，见前导 % 课。",
    task:"划掉“模糊=不能用索引”。区分两种 % 位置。",
    answer:"划掉一刀切。前缀%（右模糊）常可范围；前导%难最左。选择性差仍可能放弃索引。",
    keywords:"LIKE 前缀匹配 索引",
    origin:"《分布式高并发.pdf》约第 106 页：右模糊会使用索引",
    diagram:'library-assets/distributed-hc/p0106.png',
    points:["前缀匹配可走 B+ 范围","前导 % 另案","选择性仍可能放弃索引"],
    deep:[
      {title:"和前缀索引",body:"列很长时用前缀索引长度权衡，见前缀索引课。"},
      {title:"怎样自己验证",body:"对同一列对比 prefix% 与 %suffix 的 key。"}
    ],
    refs:[["MySQL：优化索引","https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"],["MySQL：模式匹配","https://dev.mysql.com/doc/refman/8.4/en/pattern-matching.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_81) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
