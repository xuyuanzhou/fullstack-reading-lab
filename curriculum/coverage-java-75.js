/* 《分布式高并发》D8：表数 500；列数 30。 */
const COVERAGE_JAVA_75 = [
  {
    track:'java', group:"数据库", id:"mysql-instance-table-count-not-500",
    title:"“单实例表数必须<500”是容量启发式",
    prompt:"为什么规范写单实例表数目必须小于 500？",
    promptAnswer:"表数量没有“超过 500 就完蛋”的定律。要看元数据与运维成本。",
    core:"实例上表过多会放大数据字典、备份与元数据操作成本，500 作团队红线有运维意义。但 500 不是引擎硬上限。分库分表、多租户一表一户会轻松越过，应靠治理（归档、合并、实例拆分、改模型）而不是背数字。",
    why:"多租户按租户建表被数字卡死，或以为 <500 就无需治理。",
    example:"SaaS 一租户一表冲到数千：应改共享表+租户键，或按实例拆分，而不是改规范数字。",
    task:"划掉“500 是引擎上限”。写出：数字在管什么；越过时怎么治。",
    answer:"划掉硬上限。500 管元数据与运维复杂度。越过就归档/合并/拆实例，或改数据模型。",
    keywords:"MySQL 元数据 表数量 治理",
    origin:"《分布式高并发.pdf》约第 104 页：单实例表数目必须小于 500",
    diagram:"diagrams/mysql-instance-table-count-not-five-hundred.svg",
    points:["500 是治理红线不是上限","表过多伤元数据运维","模型与拆分比改数字重要"],
    deep:[
      {title:"和信息模式",body:"元数据查询本身也会变慢，监控要分开。"},
      {title:"怎样自己验证",body:"统计实例 table_count，结合备份时长看是否该拆。"}
    ],
    refs:[["MySQL：数据字典","https://dev.mysql.com/doc/refman/8.4/en/data-dictionary.html"],["MySQL：INFORMATION_SCHEMA","https://dev.mysql.com/doc/refman/8.4/en/information-schema.html"],["MySQL：InnoDB","https://dev.mysql.com/doc/refman/8.4/en/innodb-storage-engine.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-column-count-thirty-not-law",
    title:"“单表列数必须<30”不是行格式定律",
    prompt:"为什么规范写单表列数目必须小于 30？",
    promptAnswer:"列数三十不是硬上限。宽表代价在行宽与变更，不是魔法数字。",
    core:"列过多常意味着宽表与错误建模，30 作审查阈值有用。但 InnoDB 列数上限远大于 30；宽表问题应用垂直拆分、JSON/侧表，而不是把 30 当物理定律。报表宽表可超过 30，只要热点不 SELECT *。",
    why:"正当的 35 列主数据表被强制拆成难 JOIN 的碎片；或 29 列宽表仍 SELECT *。",
    example:"用户画像 40 个稀疏属性：侧表/JSON；订单核心 12 列主表保持窄。",
    task:"划掉“30 列违法”。写出：宽表真正风险；如何拆。",
    answer:"划掉硬上限。风险是宽投影与疏稀属性。用垂直拆分/侧表/JSON，热点不 SELECT *。",
    keywords:"宽表 列数 垂直拆分",
    origin:"《分布式高并发.pdf》约第 104 页：单表列数目必须小于 30",
    diagram:"diagrams/mysql-column-count-thirty-not-law.svg",
    points:["30 是审查阈值","宽表风险在投影与疏稀","拆分比背数字重要"],
    deep:[
      {title:"和行大小",body:"列类型与字符集比列数更能触发行大小上限。"},
      {title:"怎样自己验证",body:"对宽表热点 SQL 缩窄投影，测 IO。"}
    ],
    refs:[["MySQL：列数与行大小","https://dev.mysql.com/doc/refman/8.4/en/column-count-limit.html"],["MySQL：JSON","https://dev.mysql.com/doc/refman/8.4/en/json.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_75) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
