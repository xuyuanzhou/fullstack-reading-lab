/* 《分布式高并发》D8：禁止属性隐式转换；禁止 WHERE 列上函数。 */
const COVERAGE_JAVA_69 = [
  {
    track:'java', group:'数据库', id:'mysql-implicit-convert-breaks-index',
    title:'“禁止隐式转换”针对的是错类型比较挡索引',
    prompt:'为什么规范写“禁止使用属性隐式转换”，并用 phone=13800000000 解释全表扫描？',
    core:'资料例子方向对：`phone` 若是字符串列，字面量写成**无引号数字**时，优化器常把**列**转成数值再比，索引上的字符串键对不上，计划容易退化成扫表——线上确实常见。但把整条规范背成“禁止一切隐式转换 / 禁止 CAST”会过宽：绑定参数与列同类型、字面量加引号、或把 `CAST`/`CONVERT` 放在**常量侧**，都是合法修法；同类型之间的无害折叠也不该背成罪。正确做法：谓词两侧与列定义一致；热点 SQL 用 `EXPLAIN` 看 `key`；不要用口诀代替计划。邻接见 `mysql-where-func-blocks-index`、`mysql-or-not-must-become-in`。',
    why:'只背“禁止隐式转换”，却继续写 `phone=138…`；或把必要的 CAST(常量) 也删掉，类型对不齐仍扫表。',
    example:'`phone VARCHAR(20)`，坏：`WHERE phone=13800000000`。好：`WHERE phone=\'13800000000\'` 或 JDBC 绑字符串。用 EXPLAIN 对比 `key` 是否命中 phone 索引。',
    task:'划掉“转换二字一律违法”。写出：资料例子坏在哪一侧；怎样改才能让索引有机会被选中。',
    answer:'划掉一律禁止转换。坏在字符串列对数字字面量，列被转换。改为同类型字面量/绑定，或 CAST 常量侧。用 EXPLAIN 证明 key。',
    keywords:'MySQL 隐式转换 索引 类型 手机号',
    origin:'《分布式高并发.pdf》约第 105 页：禁止使用属性隐式转换；phone=数字字面量',
    diagram:'diagrams/mysql-implicit-convert-breaks-index.svg',
    points:['错类型比较常让列被转换从而挡索引','对齐字面量/绑定类型是正解','CAST 放常量侧不等于犯规'],
    deep:[
      {title:'和字符集校对规则',body:'同是字符串，字符集/校对规则不同也可能触发转换或无法用索引。连接条件两边对齐 charset/collation，与数字/字符串问题同类。'},
      {title:'怎样自己验证',body:'建 VARCHAR 索引列，分别用数字字面量与加引号字符串查同一值，对比 EXPLAIN 的 type/key/rows。'}
    ],
    refs:[['MySQL：类型转换','https://dev.mysql.com/doc/refman/8.4/en/type-conversion.html'],['MySQL：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html'],['MySQL：索引条件推送','https://dev.mysql.com/doc/refman/8.4/en/index-condition-pushdown-optimization.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-where-func-blocks-index',
    title:'WHERE 里函数包住索引列，不是“SQL 里不许出现函数”',
    prompt:'为什么规范禁止在 WHERE 条件的属性上使用函数或表达式，并举 from_unixtime(day) 的例子？',
    core:'对**索引列**套 `from_unixtime(day)`、`DATE(col)`、`col+1` 这类表达式，优化器通常无法把谓词收成对索引键的简单范围，计划容易变差——资料改写 `day >= unix_timestamp(...)` 把计算挪到常量侧，这是对的。但“禁止函数”若理解成 SQL 里不能出现任何函数，会误伤：`WHERE day >= unix_timestamp(?)`、`WHERE id IN (SELECT …)` 外侧函数、以及对**非索引列**的展示型转换。MySQL 8.0+ 还可用**函数索引 / 生成列**显式索引表达式，那是有意建模，不是默认可乱用列上函数。邻接见 `mysql-implicit-convert-breaks-index`、`mysql-index`。',
    why:'把禁令背成“WHERE 里不许写函数”，把常量侧的 unix_timestamp 也删掉，或反过来继续 DATE(created_at) 扫大表。',
    example:'坏：`WHERE from_unixtime(day) >= \'2017-01-15\'`。好：`WHERE day >= unix_timestamp(\'2017-01-15 00:00:00\')`。若业务总按日期查，可考虑生成列 `day_date` 并建索引，而不是每次包函数。',
    task:'划掉“WHERE 禁止一切函数”。写出：什么叫包住索引列；常量侧函数为什么通常可接受。',
    answer:'划掉一律禁函数。禁的是包住索引列导致无法范围匹配。把变换挪到常量侧，或用生成列/函数索引显式建模。用 EXPLAIN 核对。',
    keywords:'MySQL sargable 函数 索引 WHERE',
    origin:'《分布式高并发.pdf》约第 105 页：禁止在 WHERE 属性上使用函数或表达式',
    diagram:'diagrams/mysql-where-func-blocks-index.svg',
    points:['函数包住索引列常挡范围扫描','计算应尽量留在常量侧','函数索引是例外需显式设计'],
    deep:[
      {title:'和前导模糊',body:'`LIKE \'%x\'` 也是谓词形态问题，不是函数，却同样难用 B+ 树最左。见既有模糊/前缀索引课。'},
      {title:'和生成列',body:'真要按表达式查，用生成列或函数索引显式建模，见 mysql-generated-column-not-where-wrap。不是 WHERE 临时包一层就自动有索引。'},
      {title:'怎样自己验证',body:'对同一列建索引，对比列上 DATE() 与常量侧截断两种写法的 EXPLAIN key/rows。'}
    ],
    refs:[['MySQL：优化器','https://dev.mysql.com/doc/refman/8.4/en/optimization.html'],['MySQL：函数索引','https://dev.mysql.com/doc/refman/8.4/en/create-index.html#create-index-functional-key-parts'],['MySQL：生成列','https://dev.mysql.com/doc/refman/8.4/en/create-table-generated-columns.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_69) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
