/* 《分布式高并发》D8：负向查询与前导模糊。 */
const COVERAGE_JAVA_73 = [
  {
    track:'java', group:"数据库", id:"mysql-negative-predicate-not-always-scan",
    title:"“负向查询一定全表扫”不是现行定律",
    prompt:"为什么规范把 NOT、!=、<>、NOT IN、NOT LIKE 一律说成会导致全表扫描？",
    promptAnswer:"负向常因选择性差而慢。用 EXPLAIN/行数证明。",
    core:"负向谓词常常选择性差、优化器更爱扫表或大范围读，资料当风险提示有用。但写成一定全表扫过时：在合适索引、统计信息与版本下，!= / NOT IN（注意 NULL 语义）仍可能走索引或 index range；是否扫表看 EXPLAIN，不是看运算符字形。NOT IN 遇 NULL 的三值逻辑陷阱与性能是两件事。邻接 OR/隐式转换课。",
    why:"有可用索引的冷数据反选被规范逼成应用层过滤；或反过来以为改成 IN 就一定快。",
    example:"status 低基数列 != 'deleted' 可能仍扫表——那是选择性问题。高基数列按主键 id NOT IN (…短列表) 仍可能合理。用 EXPLAIN 对比改写前后。",
    task:"划掉“负向=全表扫”。写出：何时负向危险；用什么证据决策。",
    answer:"划掉一律全表扫。负向常因选择性差而慢。用 EXPLAIN/行数证明。NULL 与 NOT IN 语义另审。",
    keywords:"MySQL NOT IN 选择性 EXPLAIN",
    origin:"《分布式高并发.pdf》约第 105 页：禁止负向查询",
    diagram:"diagrams/mysql-negative-predicate-not-always-scan.svg",
    points:["负向常慢但不是定律","选择性与计划说了算","NOT IN 与 NULL 语义独立"],
    deep:[
      {title:"和覆盖索引",body:"即便 type=range，若回表太多仍慢。看 rows 与 Extra。"},
      {title:"怎样自己验证",body:"对高/低基数列各写 != 条件，对比 EXPLAIN。"}
    ],
    refs:[["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"],["MySQL：优化索引","https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html"],["MySQL：NULL","https://dev.mysql.com/doc/refman/8.4/en/problems-with-null.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-leading-percent-like-heuristic",
    title:"“禁止 % 开头模糊查”说的是 B+ 树最左匹配",
    prompt:"为什么规范禁止 % 开头的模糊查询，并说一定全表扫描？",
    promptAnswer:"前导 % 难用 B+ 最左；尾随 % 常可范围扫。尾缀需求用冗余列或搜索引擎。",
    core:"LIKE '%尾缀' 确实很难用上普通 B+ 树索引的最左前缀，资料方向对。但一定全表扫仍绝对：小表、优化器选其它索引、或改用全文/倒排/专门检索引擎时路径不同；LIKE '前缀%' 才是同一棵 B+ 树上更常见的可范围扫描形态。规范应推动：前缀搜索、倒排/ES、或生成列，而不是背禁止百分号。",
    why:"产品必须尾缀搜索，被规范卡成全表；或误以为 LIKE 'a%' 也被禁。",
    example:"用户名 LIKE 'alex%' 可走索引范围。邮箱域名尾缀搜应倒排/ES，或冗余 email_domain 列索引，而不是指望 %@gmail.com。",
    task:"划掉“有 % 就全表扫”。区分前导 % 与尾随 %；给出尾缀搜索的一条正经出路。",
    answer:"划掉一律全表扫。前导 % 难用 B+ 最左；尾随 % 常可范围扫。尾缀需求用冗余列或搜索引擎。",
    keywords:"MySQL LIKE 前缀 全文 索引",
    origin:"《分布式高并发.pdf》约第 105 页：禁止 % 开头模糊查询",
    diagram:"diagrams/mysql-leading-percent-like-heuristic.svg",
    points:["前导 % 难用 B+ 最左","尾随 % 常可范围","尾缀需求换引擎或冗余列"],
    deep:[
      {title:"和全文索引",body:"InnoDB FULLTEXT 解决的是分词检索，不是给所有 LIKE 垫背。"},
      {title:"怎样自己验证",body:"对同一索引列对比 a% 与 %a 的 EXPLAIN key。"}
    ],
    refs:[["MySQL：优化索引","https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html"],["MySQL：全文","https://dev.mysql.com/doc/refman/8.4/en/fulltext-search.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_73) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
