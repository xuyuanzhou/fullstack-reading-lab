/* Batch 09: independently written Java/MySQL lessons from remaining page-specific review. */
const COVERAGE_JAVA_09 = [
  {
    track:'java', group:'数据库', id:'mysql-fk-redundancy',
    title:'外键与冗余：性能借口不能代替约束决策',
    prompt:'为什么“程序能保证完整性就删掉外键，回复数之类字段尽管冗余”不能当成默认优化结论？',
    core:'InnoDB 外键把引用完整性写进引擎：插入、更新、删除会按定义做检查，也可配置级联。代价是额外查找与锁，批量导入和某些在线 DDL 更麻烦。把校验只放在应用进程里，无法自动覆盖并发写入、绕过 ORM 的 SQL、以及多服务同时改库的情况。主题帖上的回复数、最后回复时间属于受控反规范化：读路径更短，但每次回帖、删帖、审核都要约定谁更新计数、失败如何重试或对账。允许冗余的前提是一致性策略写清楚，不是“反正读多就可以随便存两份”。',
    why:'把“程序能保证，所以删掉外键”背成性能必选项，漏写或并发交错时脏引用会先落库，要等到对账才发现。区分信号是数据库当场拒绝这次写入，还是行已经写下、事后才靠补偿去补，而且往往已经影响下游。',
    example:'帖子表存 reply_count：发帖事务里更新计数，或异步重建；对账任务定期用 COUNT(*) 校准。父子订单行若去掉外键，删除父订单时必须有同等严格的应用规则，并考虑并发插入子行。',
    task:'选一个“计数字段”和一个“父子引用”，分别写出保留外键、去掉外键、以及冗余计数的更新与对账方案，并标明哪一种失败会留下脏数据。',
    answer:'计数字段去掉外键并不能保完整性，要写清每次增减和定期对账，漏一次就会留下和明细对不上的数字。父子引用保留外键时，删父或插入悬空子会被拒绝；去掉之后这些写入会成功，脏数据留下。冗余计数换的是读放大和同步成本，两者都能选，但不能用“程序会保证”跳过。',
    keywords:'MySQL 8.4 外键 InnoDB 反规范化 冗余字段 完整性 对账',
    points:['外键提供引擎级引用检查，也有写入与 DDL 成本','应用层校验覆盖不了所有写入路径','冗余计数必须有更新与对账规则'],
    deep:[
      {title:'两条成本不要并成一句',body:'外键用声明式检查换运维和写入成本。冗余字段用少读几行换每次更新都要同步。删掉约束却不做对账，脏数据没有最后一道拒绝。选之前先写出会留下哪一种脏数据。拒绝和补数不是一回事。'},
      {title:'怎样自己验证',body:'对父子引用分别试保留外键和去掉外键：插入不存在的父键，前者应失败，后者会留下悬空行。计数字段再故意漏一次更新，看表里的数是否已经和明细偏离。两种失败都要能在表里指出来。'},
    ],
    refs:[['MySQL 8.4：FOREIGN KEY Constraints','https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-index-kinds',
    title:'索引不止四种，InnoDB 默认走 B-tree 形态',
    prompt:'为什么只答“普通、唯一、主键、组合，实现是 B 树或 B+ 树”不够？',
    core:'CREATE INDEX 还可以指定 FULLTEXT、SPATIAL；USING BTREE 或 HASH 是否可用取决于存储引擎，MEMORY 表可以使用 HASH。主键与唯一约束定义的是键值规则，真正的访问路径还要看引擎如何选聚簇索引：有 PRIMARY KEY 就用它；否则用第一个全部 NOT NULL 的 UNIQUE；再否则 InnoDB 生成隐藏行 ID 聚簇索引。InnoDB 表数据与二级索引在手册中按 B-tree 组织；不能把“所有 MySQL 索引都是 B+ 树”写死，也不能漏掉全文与空间索引。组合索引的价值在于最左前缀与覆盖，而不只是“多列绑在一起更快”。',
    why:'只背普通、唯一、主键、组合四种，遇到全文、空间或 MEMORY 哈希就说不出可选项。信号是 EXPLAIN 走了哪条索引，而主键并不等于“唯一的那棵 B 树”。名字背全了，计划仍可能走错。',
    example:'InnoDB 订单表上 (shop_id, created_at) 二级索引；MEMORY 会话表上的 HASH 查找；文章表上的 FULLTEXT。没有主键的 InnoDB 表仍有隐藏聚簇索引，二级索引并不保存“行地址”那种 MyISAM 图像。',
    task:'对同一张业务表列出：主键/唯一/二级/全文中你真正需要的种类，并用 EXPLAIN 证明一条组合索引的最左前缀查询，再写一句为何不能再说“索引实现只有 B 树”。',
    answer:'业务表先列真正需要的：主键或聚簇、唯一约束、服务查询的二级索引，全文只在要分词时才加。组合索引按最左前缀，EXPLAIN 里 key 能对上这条查询。不能再说实现只有 B 树：InnoDB 常用 B-tree 形态，FULLTEXT、SPATIAL、HASH 是并列选项。',
    keywords:'MySQL 8.4 索引 FULLTEXT SPATIAL HASH BTREE 聚簇索引 组合索引',
    points:['索引种类包括全文与空间，算法因引擎而异','主键约束不等于聚簇索引选择的全部规则','InnoDB 主要用 B-tree 组织，不能排除其他索引类型'],
    deep:[
      {title:'约束和算法分开',body:'主键、唯一是约束，聚簇和二级是 InnoDB 里的摆放。全文和空间索引解决的是另一类查找。把它们都叫成“一种 B 树”会选错。先问查找方式，再选索引种类。EXPLAIN 的 key 才算数。'},
      {title:'怎样自己验证',body:'对同一张表列出主键、唯一、二级、全文里你真正要的几种。用 EXPLAIN 跑一条只用组合索引最左列的查询，确认 key 命中；再写一句为何全文不能叫成同一棵树。'},
    ],
    refs:[['MySQL 8.4：CREATE INDEX','https://dev.mysql.com/doc/refman/8.4/en/create-index.html'],['MySQL 8.4：Clustered and Secondary Indexes','https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-replication-flow',
    title:'复制三步：dump、relay、applier，不是 replay log',
    prompt:'为什么把复制说成“主库写日志、从库拷到中继再重做”时，还要改掉 replay log 并补上线程模型？',
    core:'MySQL 复制默认是异步的。源服务器先把更新写入二进制日志。副本连上之后，源上的 Binlog Dump 线程发送事件；副本的 I/O（receiver）线程把事件写入本地中继日志（relay log）；SQL（applier）线程再读取中继日志并应用。副本并行复制时，协调线程把事务分给多个 worker。资料里的 replay log 是误称。基于位点的复制要对齐文件与位置；GTID 用事务标识简化故障转移。还有半同步、延迟复制等变体，不能把三步示意图当成唯一拓扑。',
    why:'把复制说成 replay log，排障时对不上手册里的 dump 和 applier，也会把并行应用和 GTID 想成单线程重做。信号是线程名和日志文件名对得上哪一章，而不是口头的“重做日志”。',
    example:'SHOW REPLICA STATUS 里看接收与应用是否落后；源上 PROCESSLIST 可见 Binlog Dump。切换应用只读到副本前，要确认应用位点或 GTID 集合，而不是假设“能连上就一致”。',
    task:'画出源与一个异步副本的三条线程和两类日志文件，标出 relay 与 binary 的区别，并写一句半同步比默认异步多等的是什么。',
    answer:'源库写 binary log，dump 线程把它送给副本，副本写入 relay log，再由 applier 应用。relay 是中继，不是 binary 的别名。默认是异步，源库不等副本应用完；半同步多等的是副本收到日志，不是等所有查询都执行完。并行 applier 和 GTID 是常见增强，不否定这三步。',
    keywords:'MySQL 8.4 复制 binary log relay log Binlog Dump applier GTID 异步',
    points:['源写 binary log，副本经 dump/I/O/applier 应用','中继日志是 relay log，不是 replay log','默认异步，另有 GTID 与半同步等选项'],
    deep:[
      {title:'中继和二进制不是一份',body:'binary log 在源上，供复制和恢复。relay log 在副本上，是已经拷过来、等待应用的那一份。删错文件会把“还没应用”和“已经归档”混掉。排障先分清文件在哪一台。'},
      {title:'怎样自己验证',body:'在源和一台异步副本上列出 dump、IO、applier 三条线程，以及 binary 与 relay 两个文件。再看半同步是否打开：打开时源库会多等副本确认收到，而不是多等业务提交。'},
    ],
    refs:[['MySQL 8.4：Replication','https://dev.mysql.com/doc/refman/8.4/en/replication.html'],['MySQL 8.4：Replication Threads','https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-myisam-innodb',
    title:'MyISAM 与 InnoDB：默认引擎与隐藏行 ID',
    prompt:'对比 MyISAM 和 InnoDB 时，哪些句子还能用，哪些已经过时？',
    core:'MySQL 8.4 默认存储引擎是 InnoDB。MyISAM 不支持事务、外键和 MVCC，锁粒度是表级，并在特定条件下支持并发插入；InnoDB 支持事务、外键、行级锁与多版本读。若表没有 PRIMARY KEY，也没有合适的全部 NOT NULL 唯一索引，InnoDB 会生成隐藏聚簇索引，行 ID 为 6 字节——这句与手册一致。不能再说 InnoDB 不支持全文索引；也不能把“MyISAM 查询一定更快”写成通则。MyISAM 表的数据与索引文件扩展名仍是 .MYD/.MYI，表定义在数据字典中；InnoDB 表空间上限与文件布局以表空间文档为准，而不是笼统的 2GB。',
    why:'用过时对比表答题，会在默认 InnoDB 上推荐无事务引擎，或重复“InnoDB 没有全文”。信号是建表不写引擎时 SHOW ENGINES 与默认值都指向 InnoDB。默认引擎已经不是那张旧表。',
    example:'新建业务表不写 ENGINE，默认就是 InnoDB。故意建一张无主键的 InnoDB 表，二级索引仍能靠隐藏的行 ID 回表。需要能迁移、能引用的主键时，应自己声明，不要依赖这 6 字节隐藏键。对照 SHOW ENGINES 的默认一行。',
    task:'用 SHOW ENGINES 与建表默认值确认当前默认引擎；再列出事务、外键、锁粒度、MVCC、隐藏主键五项对比，划掉资料里过时的全文句。',
    answer:'SHOW ENGINES 和建表默认值应看到 InnoDB。对比五项：InnoDB 有事务、外键、行锁、MVCC，无主键时生成 6 字节行 ID 做聚簇；MyISAM 这几项都没有。资料里“InnoDB 不支持全文”应划掉，全文以现行手册为准。',
    keywords:'MySQL 8.4 InnoDB MyISAM 默认引擎 MVCC 外键 隐藏主键 GEN_CLUST_INDEX',
    points:['8.4 默认引擎是 InnoDB','MyISAM 无事务、外键与 MVCC，锁主要是表级','无合适主键时 InnoDB 用 6 字节行 ID 做隐藏聚簇索引'],
    deep:[
      {title:'隐藏行 ID 不是主键',body:'没声明主键时，InnoDB 仍要一棵聚簇索引，于是生成隐藏行 ID。它不能当业务键引用，复制和导入也不会替你保住这个号码。业务表应显式写出引擎和主键。不要靠它做外键。'},
      {title:'怎样自己验证',body:'执行 SHOW ENGINES，再看一张不写 ENGINE 的新表。列出事务、外键、锁粒度、MVCC、隐藏主键五项，把资料里过时的全文句划掉。隐藏键不能拿来当业务主键。'},
    ],
    refs:[['MySQL 8.4：MyISAM','https://dev.mysql.com/doc/refman/8.4/en/myisam-storage-engine.html'],['MySQL 8.4：Clustered and Secondary Indexes','https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html'],['MySQL 8.4：InnoDB Multi-Versioning','https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-isolation-levels',
    title:'隔离级别：RR 默认，幻读要分清读法',
    prompt:'为什么“InnoDB 用 MVCC 加间隙锁解决幻读”不能整句套在所有 SELECT 上？',
    core:'InnoDB 实现 SQL 标准的四个隔离级别，默认是 REPEATABLE READ。READ UNCOMMITTED 可能脏读；READ COMMITTED 每次一致性读用新快照，锁定读通常不加 gap，因而更易出现幻影行；REPEATABLE READ 下，同一事务里普通一致性读复用第一次读建立的读视图；对锁定读、UPDATE、DELETE，唯一等值命中只锁记录，范围条件会用 gap 或 next-key 锁挡住插入。SERIALIZABLE 在关闭自动提交时把普通 SELECT 当成 FOR SHARE。多版本便于构造历史版本，但不是“有了 MVCC 就没有幻读”；资料把 MVCC 与间隙锁揉成一句，容易掩盖“普通读看快照、锁定读看当前并加锁”的分工。',
    why:'不区分快照读和当前读，会在 RR 下用普通 SELECT 以为锁住了间隙，或在 RC 下期待没有幻影。信号是同一插入，普通 SELECT 看不见，FOR UPDATE 会等待或挡住。',
    example:'事务 A 在 RR 下两次普通 SELECT 计数应看到同一快照；若改用 SELECT ... FOR UPDATE 扫描范围，其他会话向间隙插入会被挡住。RC 下同样的锁定读通常不加 gap。',
    task:'两个会话分别演示 RR 下普通 SELECT 与 FOR UPDATE 对插入的不同反应，并写出默认隔离级别名称。',
    answer:'默认隔离级别是 REPEATABLE READ。RR 下普通 SELECT 是快照读，别的会话插入的行不会出现在这次读视图里，也没有锁住间隙。同一条件下 FOR UPDATE 是当前读，靠间隙或临键锁挡住插入。不要把 MVCC 说成防止幻读的唯一机制。',
    keywords:'MySQL 8.4 隔离级别 REPEATABLE READ MVCC 间隙锁 next-key 幻读 一致性读',
    points:['InnoDB 默认 REPEATABLE READ','普通一致性读与锁定读用不同策略','幻读控制不能只归因于 MVCC 一句话'],
    deep:[
      {title:'两种读不要并成一句',body:'一致性读看的是事务开始时的读视图。锁定读和会改数据的语句才拿间隙锁。把“InnoDB 用 MVCC 解决幻读”套在所有 SELECT 上，普通查询并没有锁。演示时把两条 SELECT 分开做。'},
      {title:'怎样自己验证',body:'开两个会话，确认隔离级别是 REPEATABLE READ。一边普通 SELECT，另一边插入并提交，看第一个会话是否仍是旧快照。再改成 FOR UPDATE，看插入是否被挡住。'},
    ],
    refs:[['MySQL 8.4：Transaction Isolation Levels','https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html'],['MySQL 8.4：InnoDB Multi-Versioning','https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-wide-column-split',
    title:'大字段拆表：页内更瘦，不是自动更快',
    prompt:'为什么“TEXT 不常更新就拆到子表，因为 InnoDB 页是 16KB”不能当必赢方案？',
    core:'InnoDB 把行放进页里，默认页大小常见为 16KB，但 innodb_page_size 在初始化时可配置。行越宽，同一页能放下的行越少，缓冲池命中与扫描成本都可能变差。DYNAMIC 等行格式本来就可以把长变长列放到溢出页，列表查询不一定每次都读出全文。把大列拆到子表，能让热点小行更密，但详情读取要连接或二次查询，更新也要跨表。值不在于“有大字段就拆”，而在于列表路径是否真的更常走、测量是否支持。',
    why:'没有测量就因为 InnoDB 页是 16KB 去拆表，可能只是把溢出页上的读取换成一次 JOIN，列表并不会因此变快。区分信号是列表语句根本没有选中大列，这时拆与不拆的执行计划几乎一样。',
    example:'文章列表只要 id、标题、摘要：这些列留在主表，正文确认已在页外且列表没选它。若列表仍取出正文，拆到子表前后都要读那一列，差异会很小，还多一次按主键的关联。用 EXPLAIN 看有没有额外回表。先量再决定拆不拆。',
    task:'对含 TEXT 的表分别 EXPLAIN/对比“列表不取正文”与“列表取出正文”，再评估拆表后的 JOIN 计划，写出何时值得拆。',
    answer:'先看默认行格式是否已经把 TEXT 放在页外，再看列表 SQL 有没有选中大列。列表不取正文时，不必为了 16KB 先拆表。列表仍取出正文，拆表只是把读大列换成 JOIN，要用 EXPLAIN 和耗时证明值得，而不是页的大小本身。页是 16KB 不是拆表的理由。',
    keywords:'MySQL 8.4 InnoDB 页大小 TEXT BLOB 溢出页 拆表 DYNAMIC',
    points:['默认页大小常见 16KB，但可以配置','长列可能已在溢出页，列表未必读到','拆表换行宽，也换来 JOIN 与多表更新'],
    deep:[
      {title:'页外不等于已经拆开',body:'行格式可以把大列放到溢出页，主记录仍然比较瘦。这时列表只要不选该列，就碰不到正文。拆表是再加一次关联，不是溢出页的别名。先确认列表语句碰到了哪一列。没选中就不必拆。'},
      {title:'怎样自己验证',body:'对含 TEXT 的表分别 EXPLAIN“列表不取正文”和“列表取出正文”，再 EXPLAIN 拆表后的 JOIN。只有列表确实不读大列、JOIN 又更便宜时，才值得拆。'},
    ],
    refs:[['MySQL 8.4：InnoDB Row Formats','https://dev.mysql.com/doc/refman/8.4/en/innodb-row-format.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-upsert',
    title:'ON DUPLICATE KEY UPDATE 依赖唯一约束',
    prompt:'为什么“不存在就插入、存在就更新”不能只背语句，不提唯一索引？',
    core:'INSERT ... ON DUPLICATE KEY UPDATE 在新行会与 PRIMARY KEY 或 UNIQUE 索引冲突时，改为更新旧行。没有这类约束时，语句不会“按业务键魔法合并”，只会一直插入。受影响行数按行计：插入为 1，更新为 2，新旧值相同可为 0。表上有多个唯一索引时，冲突匹配与更新对象容易出人意料，手册建议尽量避免。引用将插入的新值时，优先用行别名；VALUES(col) 写法已弃用。并发下仍要靠唯一约束保证不会插入两行同一业务键。',
    why:'先查再改会在两个事务交错时各插入一行；只背 upsert 的句子却不建唯一索引，冲突检测根本不会发生，语句只会再插入。区分信号是没有唯一键的表行数增加，有唯一键的表仍是原来那一行。',
    example:'UNIQUE(user_id, date) 的签到表：INSERT 一行 ON DUPLICATE KEY UPDATE streak = streak + 1。用 AS new 引用新值，而不是旧的 VALUES()。',
    task:'建一张带唯一键与不带唯一键的表，各执行同一条 upsert，观察行数与受影响行计数；再查手册确认 1/2/0 的含义。',
    answer:'带主键或唯一键的表执行 upsert，冲突时更新原行，行数不增加；受影响行数要按手册看是 1、2 还是 0。没有唯一键的表同一条语句会再插入，行数变多，合并不会发生。多个唯一索引时可能更新到意料外的行。新值用行别名引用，不要依赖已废弃的写法。',
    keywords:'MySQL 8.4 upsert ON DUPLICATE KEY UPDATE 唯一索引 受影响行数 行别名',
    points:['冲突条件是主键或唯一索引','受影响行数区分插入、更新与未改值','多唯一索引与 VALUES() 旧写法都有陷阱'],
    deep:[
      {title:'受影响行数不是成败',body:'插入成功、更新成功、值没有变化，受影响行数可能是 1、2 或 0，不能只看语句没报错。没有唯一键时合并不会发生，每次执行都多出一行，行数才是漏了约束的直接证据。'},
      {title:'怎样自己验证',body:'建一张有唯一键和一张没有的表，各执行同一条 upsert。比较行数和受影响行计数，再对照手册里 1、2、0 的含义。没有唯一键的那张应多出一行。有唯一键的那张行数应保持不变。'},
    ],
    refs:[['MySQL 8.4：INSERT ... ON DUPLICATE KEY UPDATE','https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_09) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
