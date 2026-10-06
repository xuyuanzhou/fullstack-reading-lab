/* Batch 05: independently written Java/MySQL lessons based on page-specific review. */
const COVERAGE_JAVA_05 = [
  {
    track:'java', group:'数据库', id:'mysql-binlog-format',
    title:'Binlog 复制格式：ROW 才是当前默认值',
    prompt:'面试题说 MySQL 默认按 SQL 语句复制，为什么新环境中看到的却是 ROW？',
    core:'二进制日志（binary log，binlog）记录供复制和恢复使用的事件。STATEMENT 记录原 SQL，ROW 记录行变化，MIXED 在特定情形间切换。MySQL 8.4 的默认 binlog_format 是 ROW；只有配置为 MIXED 时，才可说通常先按语句记录并在必要时切换。日志格式和是否开启 binlog 是两个独立问题，讨论具体实例时应检查版本与变量。',
    why:'把 MIXED 的行为误当作 MySQL 的全局默认值，会误判复制链路的日志量、可观察内容和不确定性语句的处理。',
    example:'在测试实例执行 SELECT VERSION(), @@global.binlog_format, @@session.binlog_format, @@global.log_bin；前两项说明版本与格式，log_bin 单独说明日志是否开启。',
    task:'分别写出一条 UPDATE 在 STATEMENT 和 ROW 格式下记录的“语句/行变化”差异，再检查测试实例的实际变量值。',
    answer:'STATEMENT 侧重原 SQL；ROW 侧重受影响行的变化事件。MySQL 8.4 默认 ROW，MIXED 的切换规则不能冒充默认配置；应以实际版本与变量为准。',
    keywords:'MySQL 8.4 binary log binlog_format ROW STATEMENT MIXED 复制格式 默认值',
    points:['ROW 是 MySQL 8.4 默认日志格式','STATEMENT、ROW 与 MIXED 的记录粒度','binlog_format 与 log_bin 分别检查'],
    refs:[['MySQL 8.4：复制格式','https://dev.mysql.com/doc/refman/8.4/en/replication-formats.html'],['MySQL 8.4：设置二进制日志格式','https://dev.mysql.com/doc/refman/8.4/en/binary-log-setting.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-varchar-length',
    title:'VARCHAR(50)：50 是字符数，不是字节数',
    prompt:'为什么 VARCHAR(50) 可以存下 50 个汉字，却不能简单地说只占 50 字节？',
    core:'在 MySQL 8.4 中，VARCHAR(M) 的 M 表示可存储的最大字符数；实际字节数取决于列字符集和具体内容。VARCHAR 值另有 1 或 2 字节的长度前缀。声明上限仍受整行最大字节数等限制，不能把“50 字符”推导成“任意 50 字符总能在任意表结构里创建并存储”。BINARY/VARBINARY 的 M 才以字节计。',
    why:'字符数和字节数混淆，会导致字段设计、索引预算与应用校验不一致，尤其在多字节字符集下。',
    example:'同是 VARCHAR(50)，ASCII 文本与 utf8mb4 汉字的实际字节用量不同；可在测试库用 CHAR_LENGTH(col) 与 LENGTH(col) 分别观察字符数和字节数。',
    task:'建一个 utf8mb4 的 VARCHAR(50) 列，分别插入 ASCII 与中文，查询 CHAR_LENGTH 和 LENGTH；解释两列为何可能不同。',
    answer:'CHAR_LENGTH 以字符计，LENGTH 以字节计；字段声明的 50 限制字符数，实际存储字节与字符集、内容、长度前缀及行大小约束有关。',
    keywords:'MySQL VARCHAR CHAR_LENGTH LENGTH utf8mb4 characters bytes 字符 字节 行大小',
    points:['VARCHAR(M) 的 M 以字符计','LENGTH 与 CHAR_LENGTH 的计量差异','实际字节数和整行上限仍需考虑'],
    refs:[['MySQL 8.4：字符串类型语法','https://dev.mysql.com/doc/refman/8.4/en/string-type-syntax.html'],['MySQL 8.4：列数与行大小限制','https://dev.mysql.com/doc/refman/8.4/en/column-count-limit.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-innodb-fulltext',
    title:'InnoDB 全文索引：先确定版本再回答',
    prompt:'“只有 MyISAM 支持 FULLTEXT，InnoDB 不支持”现在还成立吗？',
    core:'这属于过时的版本结论。MySQL 官方说明 InnoDB 自 MySQL 5.6 起支持 FULLTEXT 索引；在 MySQL 8.4 中，可为 InnoDB 表的 CHAR、VARCHAR、TEXT 列建立全文索引，并用 MATCH(...) AGAINST(...) 查询。全文索引适合分词搜索类需求，但分词器、停用词与语言支持会影响匹配结果；它不能代替普通 B-tree 索引处理所有精确过滤。',
    why:'把旧限制当作现状，可能让团队错误地回避 InnoDB 或为简单搜索引入不必要的新组件。',
    example:'在测试库为文章正文建立 FULLTEXT 索引，比较 MATCH(body) AGAINST(关键词) 与等值条件的用途；同时记录 MySQL 版本、字符集与分词配置。',
    task:'查当前 MySQL 版本，建一张 InnoDB 文章表及 FULLTEXT 索引，用 MATCH ... AGAINST 做一次搜索，并解释普通索引为何不是同一功能。',
    answer:'MySQL 8.4 的 InnoDB 支持全文索引。应在具体版本、列类型和分词配置下验证搜索效果；FULLTEXT 与 B-tree 面向的查询模式不同。',
    keywords:'MySQL InnoDB FULLTEXT MATCH AGAINST 全文索引 MyISAM 版本 分词',
    points:['InnoDB 自 MySQL 5.6 支持 FULLTEXT','MATCH AGAINST 与普通索引用途不同','分词配置与版本决定实际效果'],
    refs:[['MySQL 8.4：InnoDB 简介与功能表','https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html'],['MySQL 8.4：InnoDB 全文索引','https://dev.mysql.com/doc/refman/8.4/en/innodb-fulltext-index.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-query-cache-removal',
    title:'MySQL Query Cache：旧调优题的失效边界',
    prompt:'为什么在 MySQL 8.0+ 里调 query_cache_size 并不能优化 SELECT？',
    core:'旧版 MySQL 的 Query Cache 曾缓存部分 SELECT 结果，但相关功能与 query_cache_size 等变量在 MySQL 8.0.3 被移除。MySQL 8.0 后不能再把“增大 Query Cache”作为通用优化方案。InnoDB Buffer Pool 缓存数据页和索引页，与旧的 SQL 结果缓存不是同一机制；应用侧缓存也需要单独设计一致性和失效策略。',
    why:'照搬旧调优清单会让新版本配置无效，还会把查询计划、索引与真实瓶颈掩盖掉。',
    example:'遇到慢 SQL 时先确认 SELECT VERSION()，再用 EXPLAIN ANALYZE 检查实际访问路径；如需重复结果缓存，明确其在应用层的键、TTL 与失效条件。',
    task:'把“调整 query_cache_size 提速”的建议改写成适用于 MySQL 8.4 的排查顺序，并解释 Buffer Pool 与旧 Query Cache 的区别。',
    answer:'先确认版本和慢查询，再检查执行计划、索引与数据分布；根据瓶颈评估 Buffer Pool 或应用缓存。MySQL 8.0.3 起已没有 query_cache_size。',
    keywords:'MySQL 8.0 8.4 query cache query_cache_size removed InnoDB Buffer Pool SQL 优化',
    points:['Query Cache 及参数在 8.0.3 移除','结果缓存与 Buffer Pool 缓存对象不同','优化应从实际执行计划和瓶颈出发'],
    refs:[['MySQL 8.0：新增、弃用与移除的变量','https://dev.mysql.com/doc/refman/8.0/en/added-deprecated-removed.html'],['MySQL 8.4：InnoDB Buffer Pool','https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html'],['MySQL 8.4：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_05) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
