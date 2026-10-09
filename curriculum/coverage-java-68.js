/* 《分布式高并发》D8：禁止 ENUM；索引个数硬上限。 */
const COVERAGE_JAVA_68 = [
  {
    track:'java', group:'数据库', id:'mysql-enum-ban-not-absolute',
    title:'“禁止 ENUM 改 TINYINT”是运维启发式，不是类型真理',
    prompt:'为什么规范写“禁止使用 ENUM，可使用 TINYINT 代替”，并强调 ENUM 内部其实是整数？',
    core:'ENUM 在 MySQL 里确实用**整数下标**存成员，字符串是定义映射；新增成员常常要改表定义（DDL），在大表上代价高——这是资料说对的一半。但**一律禁止**会漏掉：取值集合小且稳定时，ENUM 有声明式约束与可读性；改成 `TINYINT` 若没有字典表/应用枚举，会留下无含义的魔法数。8.x 对 ENUM 的修改限制仍要以现行手册为准，但选型应问“集合是否常变、谁维护含义”，而不是背“禁 ENUM”。邻接的类型启发式见 `mysql-money-decimal-not-ban`、`mysql-text-ban-not-absolute`。',
    why:'状态机只有三态且两年不变，也被改成 TINYINT 1/2/3，半年后没人记得 3 是什么；或反过来大表每周加 ENUM 值卡死发布。',
    example:'`status ENUM(\'draft\',\'paid\',\'cancelled\')` 稳定三年可用。支付渠道每周新增时，用 `TINYINT` + `pay_channel` 字典表，或字符串码表，避免周周 DDL。不要用裸数字却无文档。',
    task:'划掉“ENUM 永远禁止”。写出：何时 ENUM 可接受；改 TINYINT 时还缺什么。',
    answer:'划掉一律禁止。集合小且稳定可用 ENUM。常变集合用码表/字典；TINYINT 必须有含义来源，不能只剩魔法数。内部存整数不构成禁用理由。',
    keywords:'MySQL ENUM TINYINT DDL 字典表',
    origin:'《分布式高并发.pdf》约第 104 页：禁止使用 ENUM，可使用 TINYINT 代替',
    diagram:'diagrams/mysql-enum-ban-not-absolute.svg',
    points:['ENUM 内部是整数下标加映射','新增成员常要 DDL，大表成本高','禁令是启发式；TINYINT 要有字典含义'],
    deep:[
      {title:'和字符串状态列',body:'VARCHAR 状态码免 DDL，但缺引擎级枚举约束，要靠 CHECK（8.0.16+）或应用校验。权衡写入灵活性与非法值。'},
      {title:'怎样自己验证',body:'建 ENUM 列看 information_schema 与插入非法字符串的行为。对比 TINYINT 无字典时查询结果的可读性。'}
    ],
    refs:[['MySQL：ENUM','https://dev.mysql.com/doc/refman/8.4/en/enum.html'],['MySQL：ALTER TABLE','https://dev.mysql.com/doc/refman/8.4/en/alter-table.html'],['MySQL：CHECK','https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-index-count-five-not-law',
    title:'“单表索引≤5、组合列≤5”不是引擎定律',
    prompt:'为什么规范写死单表索引控制在 5 个以内、单索引字段数不允许超过 5 个？',
    core:'索引有**写放大与空间**成本，组合索引过宽、区分度不够时收益也差——资料方向对。但 **5** 不是 InnoDB 的硬上限，也不存在“第 6 个索引一定无效”“第 6 列一定滤不动”的定律。该不该加索引看：查询是否走得到、选择性、写路径频率、`EXPLAIN`/`EXPLAIN ANALYZE` 与线上慢查询，见前缀/组合索引课。低区分度列（如性别）单独建索引常常没用，这是选择性问题，不是“列数到了 5”。宽组合索引应先保证最左前缀与真实谓词匹配，而不是先数到 5 就停或硬凑满 5。',
    why:'第六条真正服务核心列表的索引被规范卡掉，全表扫留下；或为了凑“不超过 5”删掉唯一约束索引。',
    example:'订单表已有主键、`(shop_id,created_at)`、`order_no` 唯一。再为客服按手机号查单加 `(mobile)` 前缀/专用索引：用 EXPLAIN 证明列表与写放大可接受，不要因为“已经 3 个了接近 5”就拒绝。`(a,b,c,d,e,f)` 六列却从不按最左查询，应删掉而不是因为“刚好 5”保留。',
    task:'划掉“超过 5 个索引/列就违法”。写出：用什么证据决定加或删；低区分度列为什么常不该单独建索引。',
    answer:'划掉个数硬上限。用查询计划、选择性与写放大决定。低区分度单独索引常无效。组合列数服从谓词与最左前缀，不服从数字 5。',
    keywords:'MySQL 索引 选择性 EXPLAIN 组合索引',
    origin:'《分布式高并发.pdf》约第 104–105 页：单表索引 5 个以内、单索引字段不超过 5',
    diagram:'diagrams/mysql-index-count-five-not-law.svg',
    points:['5 是团队启发式不是引擎上限','加索引看计划与选择性','低区分度与错最左前缀才是常见废索引'],
    deep:[
      {title:'和覆盖索引',body:'为了 Using index 加长组合索引会加重写。覆盖收益要用 EXPLAIN Extra 证明，不能用“还没到 5 列”当理由。'},
      {title:'怎样自己验证',body:'对拟加索引的语句 EXPLAIN，记下 rows/key。压一波写入看 p99。删掉从不匹配最左前缀的宽索引后，写应更轻、读不应变差。'}
    ],
    refs:[['MySQL：优化索引','https://dev.mysql.com/doc/refman/8.4/en/optimization-indexes.html'],['MySQL：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html'],['MySQL：多列索引','https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_68) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
