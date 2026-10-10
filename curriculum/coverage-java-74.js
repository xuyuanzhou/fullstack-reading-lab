/* 《分布式高并发》D8：必须 InnoDB；禁止库内大文件。 */
const COVERAGE_JAVA_74 = [
  {
    track:'java', group:"数据库", id:"mysql-innodb-default-not-ban-others",
    title:"“必须 InnoDB”是默认选型，不是引擎清零",
    prompt:"为什么规范写必须使用 InnoDB，并列举事务、行锁、缓存页？",
    promptAnswer:"InnoDB 是默认引擎，不等于其它引擎一律禁止。按事务与特性选型。",
    core:"业务表默认 InnoDB 在 8.x 正确且与官方默认一致，资料理由成立。但“必须”若理解成集群里不允许任何其它引擎，会误伤系统表、遗留迁移与特殊场景。选型问事务与恢复需求，不是背引擎名。对照 mysql-myisam-innodb。",
    why:"把规范当成提到 MyISAM 就不及格，说不清默认引擎与隐藏行 ID。",
    example:"新建订单表不写 ENGINE 即为 InnoDB。迁移遗留 MyISAM 前先确认是否依赖表级特性，再改引擎并校验。",
    task:"划掉“其它引擎非法”。写出：默认引擎；业务表为何优先 InnoDB。",
    answer:"划掉清零。8.x 默认 InnoDB。业务表要事务/行锁/崩溃恢复就选它。特殊引擎是例外要论证。",
    keywords:"InnoDB 默认引擎 MySQL",
    origin:"《分布式高并发.pdf》约第 104 页：必须使用 InnoDB",
    diagram:'library-assets/distributed-hc/p0104.png',
    points:["8.x 默认 InnoDB","业务表优先事务引擎","其它引擎是例外需论证"],
    deep:[
      {title:"和全文",body:"勿再背 InnoDB 无全文；见引擎对比课。"},
      {title:"怎样自己验证",body:"SHOW ENGINES；建表不写 ENGINE 看 SHOW CREATE TABLE。"}
    ],
    refs:[["MySQL：InnoDB","https://dev.mysql.com/doc/refman/8.4/en/innodb-storage-engine.html"],["MySQL：存储引擎","https://dev.mysql.com/doc/refman/8.4/en/storage-engines.html"],["MySQL：MyISAM","https://dev.mysql.com/doc/refman/8.4/en/myisam-storage-engine.html"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-db-not-blob-store",
    title:"“禁止存大文件”禁的是把库当网盘",
    prompt:"为什么规范禁止在数据库存大文件或大照片，并说存 URI？",
    promptAnswer:"大文件不宜当通用 Blob 仓库。库管元数据，对象存对象存储。",
    core:"把多 MB 图片/视频塞进单元格，会放大备份、缓冲池与复制流量——库存 URI、文件走对象存储是主流。但禁令对象是把数据库当网盘，不是禁止一切 BINARY/BLOB：小图标、短密钥材料仍可能合理。与 TEXT 禁令课相同：拆体量与投影，不是类型名。",
    why:"头像 URL 方案被背成表里不能有 BLOB，连短指纹也不敢存。",
    example:"avatar_url 指向对象存储；库内可留 sha256。不要把 10MB 原图放行里还 SELECT *。",
    task:"划掉“禁止 BLOB 类型”。写出：大文件应放哪；库内可留什么。",
    answer:"划掉禁类型。大文件进对象存储，库存 URI 与元数据。短二进制可论证。热点勿投影大列。",
    keywords:"对象存储 BLOB URI 备份",
    origin:"《分布式高并发.pdf》约第 104 页：禁止存储大文件或大照片",
    diagram:'library-assets/distributed-hc/p0104.png',
    points:["库不适合当网盘","URI+对象存储是常路","短二进制另议"],
    deep:[
      {title:"和 TEXT 禁令",body:"同属体量与投影问题，见 text-ban 课。"},
      {title:"怎样自己验证",body:"对比库存 5MB 与存 URL 的备份体积（测试环境）。"}
    ],
    refs:[["MySQL：BLOB/TEXT","https://dev.mysql.com/doc/refman/8.4/en/blob.html"],["MySQL：字符串类型","https://dev.mysql.com/doc/refman/8.4/en/string-types.html"],["MySQL：EXPLAIN","https://dev.mysql.com/doc/refman/8.4/en/explain.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_74) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
