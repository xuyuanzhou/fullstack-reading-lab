/* Batch 05: independently written Java/MySQL lessons based on page-specific review. */
const COVERAGE_JAVA_05 = [
  {
    track:'java', group:'数据库', id:'mysql-binlog-format',
    title:'Binlog 复制格式：ROW 才是当前默认值',
    prompt:'面试题说 MySQL 默认按 SQL 语句复制，为什么新环境中看到的却是 ROW？',
    promptAnswer:'binlog 格式影响复制与回放。ROW/STATEMENT/MIXED 不是随便换一句就完事。',
    core:'二进制日志（binary log，binlog）记录供复制和恢复使用的事件。STATEMENT 记录原 SQL，ROW 记录行变化，MIXED 在特定情形间切换。MySQL 8.4 的默认 binlog_format 是 ROW；只有配置为 MIXED 时，才可说通常先按语句记录并在必要时切换。日志格式和是否开启 binlog 是两个独立问题，讨论具体实例时应检查版本与变量。',
    why:'把 MIXED“必要时才换行”当成每个版本的默认，会把日志量、可见列和不确定语句都估错。新实例上的信号是 binlog_format 为 ROW，而不是手册里 MIXED 的切换说明。',
    example:'在测试实例执行 SELECT VERSION(), @@global.binlog_format, @@session.binlog_format, @@global.log_bin；前两项说明版本与格式，log_bin 单独说明日志是否开启。',
    task:'分别写出一条 UPDATE 在 STATEMENT 和 ROW 格式下记录的“语句/行变化”差异，再检查测试实例的实际变量值。',
    answer:'STATEMENT 记下这条 UPDATE 的原 SQL，从库再执行，不确定函数可能和源库不一致。ROW 记下被改行的前后变化，不再跑原句。测试实例要看版本和 binlog_format，现行常见默认是 ROW。MIXED 的切换只在配成 MIXED 时成立，log_bin 只说明日志开没开。',
    keywords:'MySQL 8.4 binary log binlog_format ROW STATEMENT MIXED 复制格式 默认值',
    points:['ROW 是 MySQL 8.4 默认日志格式','STATEMENT、ROW 与 MIXED 的记录粒度','binlog_format 与 log_bin 分别检查'],
    deep:[
      {title:'格式和开关分开看',body:'格式决定记语句还是记行变化。log_bin 只决定记不记。只改格式而日志没开，复制和按时间点恢复都没有事件可读，排障会找错文件。讨论某台机器时先读变量，再谈格式差异。'},
      {title:'怎样自己验证',body:'在测试库查 VERSION()、全局和会话的 binlog_format，以及 log_bin。显示为 ROW 时，不要用 MIXED 的切换规则解释这台机器的日志量。'},
    ],
    refs:[['MySQL 8.4：复制格式','https://dev.mysql.com/doc/refman/8.4/en/replication-formats.html'],['MySQL 8.4：设置二进制日志格式','https://dev.mysql.com/doc/refman/8.4/en/binary-log-setting.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-varchar-length',
    title:'VARCHAR(50)：50 是字符数，不是字节数',
    prompt:'为什么 VARCHAR(50) 可以存下 50 个汉字，却不能简单地说只占 50 字节？',
    promptAnswer:'utf8mb4 的 VARCHAR(50) 里，50 个 ASCII 和 50 个汉字都能插入。',
    core:'在 MySQL 8.4 中，VARCHAR(M) 的 M 表示可存储的最大字符数；实际字节数取决于列字符集和具体内容。VARCHAR 值另有 1 或 2 字节的长度前缀。声明上限仍受整行最大字节数等限制，不能把“50 字符”推导成“任意 50 字符总能在任意表结构里创建并存储”。BINARY/VARBINARY 的 M 才以字节计。',
    why:'把 50 当成字节上限，字段设计、索引预算和应用校验会变成三套数。utf8mb4 下的信号是 CHAR_LENGTH 仍按字符，LENGTH 才随汉字变大。应用按字节截断时，库里仍按字符接受，两边会各写各的。',
    example:'同是 VARCHAR(50)，ASCII 文本与 utf8mb4 汉字的实际字节用量不同；可在测试库用 CHAR_LENGTH(col) 与 LENGTH(col) 分别观察字符数和字节数。',
    task:'建一个 utf8mb4 的 VARCHAR(50) 列，分别插入 ASCII 与中文，查询 CHAR_LENGTH 和 LENGTH；解释两列为何可能不同。',
    answer:'utf8mb4 的 VARCHAR(50) 里，50 个 ASCII 和 50 个汉字都能插入。ASCII 那行 CHAR_LENGTH 与 LENGTH 接近；汉字那行 CHAR_LENGTH 仍是字符数，LENGTH 按每字最多 4 字节变大。两列不同是因为一个计字符、一个计字节，另加长度前缀和行大小约束。',
    keywords:'MySQL VARCHAR CHAR_LENGTH LENGTH utf8mb4 characters bytes 字符 字节 行大小',
    points:['VARCHAR(M) 的 M 以字符计','LENGTH 与 CHAR_LENGTH 的计量差异','实际字节数和整行上限仍需考虑'],
    deep:[
      {title:'和索引预算',body:'二级索引按字节估长度。同样是 VARCHAR(50)，汉字比 ASCII 更早顶到前缀上限。应用若按字节截断，会和列上的字符上限互相打架。设计时把字符上限和字节预算写成两行。'},
      {title:'怎样自己验证',body:'建 utf8mb4 的 VARCHAR(50)，插入同样个数的英文和汉字，对比 CHAR_LENGTH 与 LENGTH。汉字那行只有 LENGTH 变大，且 CHAR_LENGTH 不超过 50。'},
    ],
    refs:[['MySQL 8.4：字符串类型语法','https://dev.mysql.com/doc/refman/8.4/en/string-type-syntax.html'],['MySQL 8.4：列数与行大小限制','https://dev.mysql.com/doc/refman/8.4/en/column-count-limit.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-innodb-fulltext',
    title:'InnoDB 全文索引：先确定版本再回答',
    prompt:'“只有 MyISAM 支持 FULLTEXT，InnoDB 不支持”现在还成立吗？',
    core:'这属于过时的版本结论。MySQL 官方说明 InnoDB 自 MySQL 5.6 起支持 FULLTEXT 索引；在 MySQL 8.4 中，可为 InnoDB 表的 CHAR、VARCHAR、TEXT 列建立全文索引，并用 MATCH(...) AGAINST(...) 查询。全文索引适合分词搜索类需求，但分词器、停用词与语言支持会影响匹配结果；它不能代替普通 B-tree 索引处理所有精确过滤。',
    why:'把“只有 MyISAM 有全文”当成现状，团队会避开 InnoDB，或为标题搜索再上一套引擎。信号是当前版本的 InnoDB 表能建 FULLTEXT，并用 MATCH 命中。旧限制已经对不上现行手册。',
    example:'记下版本后，给 InnoDB 文章表的正文加 FULLTEXT。MATCH(body) AGAINST 能命中分词后的词；WHERE body 等于整句或普通二级索引只做等值和前缀，分词搜索对不上，两条计划不能互相代替。',
    task:'查当前 MySQL 版本，建一张 InnoDB 文章表及 FULLTEXT 索引，用 MATCH ... AGAINST 做一次搜索，并解释普通索引为何不是同一功能。',
    answer:'先查出版本。8.4 的 InnoDB 可以给 CHAR、VARCHAR、TEXT 建全文索引，MATCH AGAINST 能搜到分词结果。普通 B-tree 做等值和范围，不做分词，所以 EXPLAIN 不会把两条当同一功能。停用词和分词器会改变命中，还要记下字符集。',
    keywords:'MySQL InnoDB FULLTEXT MATCH AGAINST 全文索引 MyISAM 版本 分词',
    points:['InnoDB 自 MySQL 5.6 支持 FULLTEXT','MATCH AGAINST 与普通索引用途不同','分词配置与版本决定实际效果'],
    deep:[
      {title:'全文替不了过滤',body:'状态、时间范围仍走普通索引。全文只回答正文里有没有这些词。把两条查询合成“有索引就行”，精确过滤和分词搜索会同时失准。先记下版本和分词配置，再谈能不能搜。不要用等值计划代替它。'},
      {title:'怎样自己验证',body:'建一张 InnoDB 文章表和 FULLTEXT，分别 EXPLAIN 一条 MATCH AGAINST 和一条等值条件。前者走全文，后者走普通索引或全表，用途就分开了。'},
    ],
    refs:[['MySQL 8.4：InnoDB 简介与功能表','https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html'],['MySQL 8.4：InnoDB 全文索引','https://dev.mysql.com/doc/refman/8.4/en/innodb-fulltext-index.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-query-cache-removal',
    title:'MySQL Query Cache：旧调优题的失效边界',
    prompt:'为什么在 MySQL 8.0+ 里调 query_cache_size 并不能优化 SELECT？',
    promptAnswer:'改写后的顺序是：确认已是 8.4、没有 query_cache_size；抓出慢查询；看执行计划、索引和数据分布。',
    core:'旧版 MySQL 的 Query Cache 曾缓存部分 SELECT 结果，但相关功能与 query_cache_size 等变量在 MySQL 8.0.3 被移除。MySQL 8.0 后不能再把“增大 Query Cache”作为通用优化方案。InnoDB Buffer Pool 缓存数据页和索引页，与旧的 SQL 结果缓存不是同一机制；应用侧缓存也需要单独设计一致性和失效策略。',
    why:'照搬“加大 Query Cache”会在 8.0 之后改一个已经不存在的变量，慢查询仍在。信号是版本里没有 query_cache_size，慢在执行计划或缓冲池。配置改了，计划却没人看。',
    example:'慢 SQL 先查 VERSION()。8.4 上不再找 query_cache_size，接着用 EXPLAIN ANALYZE 看有没有走索引。重复结果若要缓存，写在应用里，并规定键、TTL，以及哪一次写入必须让它失效。',
    task:'把“调整 query_cache_size 提速”的建议改写成适用于 MySQL 8.4 的排查顺序，并解释 Buffer Pool 与旧 Query Cache 的区别。',
    answer:'改写后的顺序是：确认已是 8.4、没有 query_cache_size；抓出慢查询；看执行计划、索引和数据分布。Buffer Pool 缓存数据页和索引页，旧 Query Cache 缓存的是 SELECT 结果，8.0.3 起已移除。结果缓存放到应用，并单独写失效。',
    keywords:'MySQL 8.0 8.4 query cache query_cache_size removed InnoDB Buffer Pool SQL 优化',
    points:['Query Cache 及参数在 8.0.3 移除','结果缓存与 Buffer Pool 缓存对象不同','优化应从实际执行计划和瓶颈出发'],
    deep:[
      {title:'两种缓存不是一层',body:'缓冲池让下次读少碰磁盘页。旧查询缓存存的是整句结果，表一写就失效。后者已经移除，加大它不会让 8.4 的 SELECT 变快。慢查询应回到计划和索引，而不是结果缓存。'},
      {title:'怎样自己验证',body:'在 8.4 执行 SHOW VARIABLES LIKE \'query_cache%\'。看不到可调的 query_cache_size。慢查询改看 EXPLAIN ANALYZE 和缓冲池，而不是结果缓存开关。'},
    ],
    refs:[['MySQL 8.0：新增、弃用与移除的变量','https://dev.mysql.com/doc/refman/8.0/en/added-deprecated-removed.html'],['MySQL 8.4：InnoDB Buffer Pool','https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html'],['MySQL 8.4：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_05) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
