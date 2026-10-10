/* 《分布式高并发》D8：手机号 varchar(20)；INSERT 列清单。 */
const COVERAGE_JAVA_72 = [
  {
    track:'java', group:"数据库", id:"mysql-phone-varchar-length-not-twenty",
    title:"“手机号必须 varchar(20)”把长度钉死了",
    prompt:"为什么规范写必须用 varchar(20) 存手机号，并举区号、不做数学、可模糊查？",
    promptAnswer:"手机号长度没有固定“必须 20”的定律。按实际号码与扩展字段定，别背死数字。",
    core:"方向对的一半：别用数值类型存电话（前导 0、+、-、()、不做算术）。但 20 不是国际标准长度：E.164 建议存储形态、分机号、历史脏数据都可能超过 20；过短会截断，过长则是业务校验问题。应用层格式校验、唯一索引（规范化后的号码）与模糊查询前缀索引要分开设计，不能用 varchar(20) 代替。",
    why:"海外号码或带分机被 20 截断；或反过来以为加长到 20 就完成校验。",
    example:"存 E.164 规范化字符串（含国家码），显示层再格式化。长度按产品最大形态留余量，唯一约束打在规范化列上。不要 BIGINT 存手机号。",
    task:"划掉“必须 20”。写出：为何不用数值类型；长度与校验各谁负责。",
    answer:"划掉钉死 20。不用数值类型。长度按最大合法形态与规范化策略定；格式与唯一性在应用/约束，不靠魔法 20。",
    keywords:"MySQL 手机号 VARCHAR E.164",
    origin:"《分布式高并发.pdf》约第 104 页：必须 varchar(20) 存手机号",
    diagram:"diagrams/mysql-phone-varchar-length-not-twenty.svg",
    points:["电话别用数值类型","20 不是国际硬上限","规范化与显示要分开"],
    deep:[
      {title:"和隐式转换",body:"字符串列对数字字面量会挡索引，见隐式转换课。"},
      {title:"怎样自己验证",body:"试插入带 + 与分机的号码到 VARCHAR(20) 与更长列，观察截断。"}
    ],
    refs:[["ITU E.164 概述","https://www.itu.int/rec/T-REC-E.164"],["MySQL：字符串类型","https://dev.mysql.com/doc/refman/8.4/en/string-types.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-insert-must-name-columns",
    title:"INSERT 不写列名会在加列时悄悄错位",
    prompt:"为什么规范禁止 INSERT INTO t VALUES(...)，要求必须写出列清单？",
    promptAnswer:"INSERT 应写清列名，避免表结构变更后错位。不是语法强制，是可维护性要求。",
    core:"INSERT INTO t VALUES (…) 依赖当前表列顺序。中间加列、调整顺序后，旧语句可能把值塞进错误列且仍成功——资料说的程序 BUG 真实存在。强制列清单是可维护性约定，不是引擎禁令；临时脚本、与 SELECT 列序严格对齐的批导可以例外，但应用代码默认应写列名。INSERT … SET 或 ORM 显式字段同类。",
    why:"发版加了 created_at 默认列，旧 VALUES 插入把金额写进状态列，金额校验却过了。",
    example:"坏：INSERT INTO orders VALUES (NULL,1,100,…)。好：INSERT INTO orders (user_id,amount,status) VALUES (1,100,'new')。",
    task:"划掉“VALUES 语法非法”。写出：应用代码默认怎么写；何种批导可例外。",
    answer:"划掉语法非法。应用默认写列清单。批导仅在列序契约锁定且有校验时可例外。加列是错位的常见触发点。",
    keywords:"MySQL INSERT 列清单 模式演进",
    origin:"《分布式高并发.pdf》约第 105 页：禁止 INSERT VALUES 不写列",
    diagram:"diagrams/mysql-insert-must-name-columns.svg",
    points:["VALUES 依赖列序","加列会导致静默错位","应用代码应写列名"],
    deep:[
      {title:"和 SELECT *",body:"都是暗含表结构的味道，见 select-star 课。"},
      {title:"怎样自己验证",body:"建表插入 VALUES，再中间加列，重放旧语句，观察错位。"}
    ],
    refs:[["MySQL：INSERT","https://dev.mysql.com/doc/refman/8.4/en/insert.html"],["MySQL：ALTER TABLE","https://dev.mysql.com/doc/refman/8.4/en/alter-table.html"],["MySQL：生成列","https://dev.mysql.com/doc/refman/8.4/en/create-table-generated-columns.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_72) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
