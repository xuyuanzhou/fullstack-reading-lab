/* Batch 07: independently written Java/MySQL lessons from page-specific review. */
const COVERAGE_JAVA_07 = [
  {
    track:'java', group:'数据库', id:'mysql-prepared-statement',
    title:'PreparedStatement 不总是比 Statement 更快',
    prompt:'为什么“用了 PreparedStatement 就会在服务端编译并缓存，所以总是更快”不能当结论？',
    core:'Java SE 21 的 PreparedStatement 表示一条可重复执行的预编译语句，问号只用来绑定数据值。MySQL 8.4 的服务端预处理走二进制协议：同一会话里把语句转成内部结构并缓存，重复执行时少做解析；SQL 层的 PREPARE 不如二进制协议高效。这条缓存属于当前会话，不与其他会话共享，总数受 max_prepared_stmt_count 限制（默认 16382，设为 0 则关闭）。表或视图的元数据变化，以及表定义被刷出缓存时，服务器会自动重新准备，状态变量 Com_stmt_reprepare 会增加；普通的数据增删改不会因此让结构过期。Connector/J 实现说明写明默认使用客户端预处理，因为早期服务器对服务端预处理支持不完整；要改用服务端，须设置 useServerPrepStmts=true。客户端路径在驱动里转义和替换参数后再把完整 SQL 发给服务器，服务器仍要按普通语句解析，并不会因为 Java 类型叫 PreparedStatement 就自动缓存。占位符只能出现在数据值的位置，不能代替关键字或表名、列名；动态标识符必须来自白名单，再拼进 SQL。',
    why:'把默认的 JDBC 调用当成服务端已经缓存了执行计划，会漏掉准备阶段多出来的往返，也会误以为拼接表名同样安全。真正的信号在通用日志：默认仍是文本协议，问号只能绑定数据值，类名相同也不代表走了服务端预处理。',
    example:'同一连接上反复执行 WHERE id = ? 时，打开 useServerPrepStmts 后才使用服务端预处理。只执行一次的语句要比较准备与执行的总耗时。表名来自请求参数时，先对照允许的名字，再拼 SQL，不能写成 FROM ?。',
    task:'在测试连接上分别用默认 URL 和 useServerPrepStmts=true 执行同一条带参数的查询多次。用性能库或通用日志区分文本协议与服务端预处理，并写出为什么列名不能绑定到问号。',
    answer:'默认 URL 多次执行仍是客户端预处理，日志里是文本协议，服务端不复用这份计划。加上 useServerPrepStmts=true，且语句重复、元数据没变，才是服务端预处理。问号只绑定数据值，列名和表名是标识符，绑不进去，必须白名单后再拼。',
    keywords:'MySQL 8.4 JDBC PreparedStatement useServerPrepStmts 客户端预处理 服务端预处理 占位符 标识符 max_prepared_stmt_count',
    points:['重复执行的服务端预处理才少做解析','Connector/J 默认是客户端预处理','问号只绑定数据值，不绑定表名或列名','会话内结构缓存遇元数据变化会重新准备'],
    deep:[
      {title:'更快要同时满足',body:'服务端预处理要真的打开，同一条语句反复执行，并且表结构没变到重新准备。少一条，准备往返可能比直接执行更慢，不能只看 Java 类型名。只执行一次时，准备往返往往划不来。'},
      {title:'怎样自己验证',body:'同一条带问号的查询，用默认 URL 和 useServerPrepStmts=true 各跑多次。看通用日志：前者是完整 SQL，后者才有服务端准备。再把列名放进问号，应直接失败。'},
    ],
    refs:[['MySQL 8.4：Prepared Statements','https://dev.mysql.com/doc/refman/8.4/en/sql-prepared-statements.html'],['MySQL 8.4：PREPARE','https://dev.mysql.com/doc/refman/8.4/en/prepare.html'],['MySQL 8.4：预处理语句缓存','https://dev.mysql.com/doc/refman/8.4/en/statement-caching.html'],['Connector/J：JDBC API Implementation Notes','https://dev.mysql.com/doc/connector-j/en/connector-j-reference-implementation-notes.html'],['Connector/J：Prepared Statements 属性','https://dev.mysql.com/doc/connector-j/en/connector-j-connp-props-prepared-statements.html'],['Java SE 21：PreparedStatement','https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/PreparedStatement.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-buffer-pool-size',
    title:'Buffer Pool 默认 128MB，比例只属于专用机',
    prompt:'为什么不能把“缓冲池设成物理内存的四分之三到五分之四”当成 MySQL 8.4 的默认调法？',
    core:'innodb_buffer_pool_size 是 InnoDB 缓存表数据和索引的内存大小。MySQL 8.4 默认是 128MB（134217728 字节），不会随机器内存自动变成某个百分比。顺序是：先记住默认 128MB；再分清「专用机建议」和「混部机器」；最后才看 dedicated_server 自动分档，以及 key_buffer、read_buffer 各自服务谁。边界是：大约 80% 或自动配置里的 50%/75% 只属于专用库机器；混部不要先套这个比例。key_buffer_size 默认 8MB，只缓冲 MyISAM 索引；read_buffer_size 默认 128KB，不是 InnoDB 全表扫描的通用旋钮。缓冲池不大于 1GiB 时，instances 默认是 1；大于 1GiB 时，默认值取「缓冲池块数的一半」和「逻辑处理器数的四分之一」里较小的那个，范围 1 到 64，且只能在启动时设置。innodb_dedicated_server 默认 OFF。只有在只跑 MySQL 的专用机上打开它、又没有手工指定缓冲池时，才会按探测内存自动设置：不足 1GB 仍是 128MB，1GB 到 4GB 为 50%，大于 4GB 为 75%。8.4 的内部临时表在内存里默认用 TempTable，落盘只用 InnoDB；MyISAM 不再承担这个用途。',
    why:'把专用机的比例套到混部机器上会挤占操作系统和其他进程；再用过时的 MyISAM 临时表理由去放大 key buffer，或拿 read_buffer_size 去“加速” InnoDB 扫描，会占着用不到的内存。',
    example:'专用 32GB 机器若启用 innodb_dedicated_server 且未手工指定缓冲池，自动值约为 24GB，并仍要给控制结构和操作系统留余量。同一台机器还跑应用进程时，应从 128MB 这个默认值出发，按缓冲池命中和换页情况调整，而不是先乘 80%。InnoDB 慢扫描应先看索引与缓冲池，而不是先调 read_buffer_size。',
    task:'在测试实例执行 SELECT VERSION()，再查看 innodb_buffer_pool_size、innodb_dedicated_server、key_buffer_size、read_buffer_size 和 internal_tmp_mem_storage_engine。对照手册确认磁盘内部临时表引擎，并说明混部时为什么不直接套 75% 或 80%，以及为何不能靠加大 read_buffer_size 优化 InnoDB 扫描。',
    answer:'默认缓冲池是 128MB。50%、75% 和大约 80% 只属于专用服务器的自动配置或容量建议，而且自动配置默认关闭。8.4 的磁盘内部临时表是 InnoDB，key_buffer_size 只服务 MyISAM 索引。read_buffer_size 默认 128KB，主要不是 InnoDB 全表扫描旋钮。',
    keywords:'MySQL 8.4 innodb_buffer_pool_size 128MB innodb_dedicated_server key_buffer_size read_buffer_size TempTable InnoDB 内部临时表 混部',
    points:['缓冲池默认值是 134217728 字节','专用机自动配置默认关闭且按内存分档','大于 1GiB 时实例数按公式默认，不必手工改成大于 1','混部不要套固定的内存百分比','磁盘内部临时表是 InnoDB，key buffer 服务 MyISAM','read_buffer_size 默认 128KB，不能当 InnoDB 通用扫描加速旋钮'],
    deep:[
      {title:'比例不是默认值',body:'缓冲池默认 128MB，不会随机器内存自动变成百分之八十。75% 只在专用机打开自动配置、又没手工指定时才出现。混部套这个比例会把操作系统挤去换页。先看命中和换页，再决定加多少。'},
      {title:'怎样自己验证',body:'查版本、innodb_buffer_pool_size 和 innodb_dedicated_server。混部应看到自动配置关闭。再看 key_buffer_size 与 read_buffer_size：加大后者改变不了 InnoDB 扫描，磁盘临时表仍是 InnoDB。'},
    ],
    refs:[['MySQL 8.4：InnoDB 参数','https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html'],['MySQL 8.4：Buffer Pool','https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html'],['MySQL 8.4：专用服务器自动配置','https://dev.mysql.com/doc/refman/8.4/en/innodb-dedicated-server.html'],['MySQL 8.4：服务器系统变量','https://dev.mysql.com/doc/refman/8.4/en/server-system-variables.html'],['MySQL 8.4：read_buffer_size','https://dev.mysql.com/doc/refman/8.4/en/server-system-variables.html#sysvar_read_buffer_size'],['MySQL 8.4：内部临时表','https://dev.mysql.com/doc/refman/8.4/en/internal-temporary-tables.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-varchar-row-max',
    title:'单列 VARCHAR 上限由行字节和字符集一起决定',
    prompt:'utf8 的单列 VARCHAR，能不能直接用 (65535-1-2)/3 当作最大字符数？',
    core:'MySQL 8.4 对表的内部行表示有 65535 字节上限，长度前缀和其他行开销都算在里面，与存储引擎是否还能放更大的行无关。VARCHAR 和 VARBINARY 的存储是实际字节数再加前缀：该列可能占用的最大字节数不超过 255 时前缀为 1 字节，可能超过 255 时为 2 字节。手册的可复现例子是 latin1、NOT NULL、没有其他列时，VARCHAR(65533) 可以创建，VARCHAR(65535) 会报行大小超过 65535，因为还要两个长度字节。这里没有再减 1，也没有“从第二个字节开始存”这条规则。MyISAM 的可空列另有空值位图：每个可空列 1 位，再向上取整到字节；InnoDB 的空值开销在行格式文档里另行说明。8.4 中 utf8 仍是 utf8mb3 的弃用别名，显示时会写成 utf8mb3，每个字符最多 3 字节；utf8mb4 最多 4 字节，并且是手册推荐的字符集。因此同一条除以 3 的公式不能挪到 utf8mb4。按“单列、NOT NULL、只减 2 字节前缀”从手册规则推导，utf8mb3 的字符数上限是 21844（21844×3+2=65534），utf8mb4 是 16383。这是推导，不是手册印出的标准答案；可空列、其他列和 InnoDB 页内行长还会再收紧。',
    why:'把 (65535-1-2)/3 背成唯一上限，改成 utf8mb4 或再加一列就会报 1118。多减的 1 不是长度前缀。信号是同样结构下 utf8mb3 能建成、utf8mb4 失败。',
    example:'手册已经给出对照：latin1 单列 NOT NULL 用 65533 成功、用 65535 失败。utf8mb3 的 VARCHAR(255) 因为 255×3 超过 255 字节，长度前缀是 2 字节，单值最多 767 字节。换成 utf8mb4 后，每个字符按 4 字节计入同一条 65535 预算。',
    task:'在 MySQL 8.4 测试库分别用 utf8mb3 和 utf8mb4 创建只有一列 VARCHAR 的表，从推导出的上限附近试 NOT NULL 与可空两种定义，记录第一条成功和第一条 1118 错误。解释多减的 1 为什么不是长度前缀。',
    answer:'先确认字符集是 3 字节还是 4 字节，再把长度前缀和空值开销算进行字节上限。latin1 的手册例子是减 2 得到 65533。utf8 在 8.4 仍是 utf8mb3 的别名；(65535-1-2)/3 不是标准答案。',
    keywords:'MySQL 8.4 VARCHAR 65535 长度前缀 utf8 utf8mb3 utf8mb4 行大小 21844 16383',
    points:['行大小上限是 65535 字节并包含开销','超过 255 字节的 VARCHAR 使用 2 字节长度前缀','utf8 在 8.4 仍是 utf8mb3 别名，utf8mb4 按 4 字节计','多减的 1 不是手册给出的长度规则'],
    deep:[
      {title:'1118 在量整行',body:'报错量的是 65535 字节的行上限，不是声明里的字符数。长度前缀、可空位和其他列都占这笔预算。除以 3 只在单列、utf8mb3、NOT NULL 时接近推导。'},
      {title:'怎样自己验证',body:'在 8.4 用 utf8mb3 和 utf8mb4 各建只有一列的 VARCHAR，从推导上限附近试 NOT NULL 和可空。记下第一条成功和第一条 1118。多出的 1 字节对得上可空开销，不是长度前缀。'},
    ],
    refs:[['MySQL 8.4：列数与行大小','https://dev.mysql.com/doc/refman/8.4/en/column-count-limit.html'],['MySQL 8.4：字符串存储需求','https://dev.mysql.com/doc/refman/8.4/en/storage-requirements.html'],['MySQL 8.4：字符串类型语法','https://dev.mysql.com/doc/refman/8.4/en/string-type-syntax.html'],['MySQL 8.4：utf8mb3','https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-utf8mb3.html'],['MySQL 8.4：utf8 别名','https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-utf8.html'],['MySQL 8.4：utf8mb4','https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-utf8mb4.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-select-star',
    title:'SELECT * 仍可走过滤索引，只是很难覆盖',
    prompt:'为什么“显式列出列才能用索引，SELECT * 优化器完全不能优化”是错的？',
    core:'优化器选择索引时看的是 WHERE、连接、GROUP BY 和 ORDER BY 能否用索引缩小范围或避免排序，不取决于 SELECT 列表是不是星号。EXPLAIN 的 type 仍可以是 ref 或 range。Extra 中的 Using index 是另一件事：查询用到的列都能从同一棵索引树取出，于是不必再回表。SELECT * 需要每一列，二级索引通常盖不住；InnoDB 会把主键列附在二级索引末尾，所以“索引列加主键列”的显式列表有时可以覆盖，星号仍然还要其余列。聚簇索引本身就是整行，type 为 index 且 key 为 PRIMARY 时，即使没有 Using index，也可能正在扫聚簇索引。两种写法都要解析表的列定义。预处理语句的内部结构会把 SELECT * 展开成当时的列清单，列集合一旦被 ALTER TABLE 改变，这条语句会过期并重新准备；显式列名同样要在数据字典里解析。星号的结果顺序跟表定义一致，显式列表跟书写顺序一致。字段改名时，星号的 SQL 文本不必写出旧名字，但结果集的列名变了，按名或按位置读取的客户端都要跟着改；显式列表则要修改 SQL。少写星号是为了稳定结果契约和让覆盖索引成为可能，不是因为优化器看到星号就放弃索引。',
    why:'把“别写星号”理解成过滤和排序也不能用索引，会在已有 WHERE 索引时仍去扫全表。信号是两条 EXPLAIN 的 type 和 key 相同，只有 Using index 不同。',
    example:'orders(id 主键, user_id, status, note)，在 user_id 上有二级索引。SELECT * FROM orders WHERE user_id = 7 仍可用该索引定位，但要回表取 note。SELECT id, user_id FROM orders WHERE user_id = 7 才可能出现 Using index，因为主键列已经附在二级索引上。把 note 改名为 remark 后，星号的 SQL 不用改字，但读取 note 列的客户端会失败。',
    task:'对同一条带 WHERE 和 ORDER BY 的查询分别 EXPLAIN SELECT * 和只含索引列、主键列的显式列表。记录 type、key 和 Extra，再 ALTER 改一个未出现在显式列表中的列名，说明哪一侧的客户端会坏。',
    answer:'两条 EXPLAIN 的 type 和 key 可以相同，说明过滤和排序都用了索引。星号的 Extra 通常没有 Using index；只含索引列和主键列才可能覆盖。再改一个没出现在显式列表里的列名：星号 SQL 不用改字，但按该列名或位置读的客户端会坏；显式这条 SQL 没选该列，仍然能执行。',
    keywords:'MySQL 8.4 SELECT * 覆盖索引 Using index EXPLAIN 二级索引 主键扩展 数据字典 列改名',
    points:['WHERE 和排序仍可使用索引','Using index 要求列都来自同一索引','显式列同样要解析数据字典','列改名后客户端的列名或位置仍要更新'],
    deep:[
      {title:'Using index 不是用了索引',body:'type 和 key 才说明过滤或排序用了哪条索引。Extra 里的 Using index 只表示不用回表。星号几乎总会回表取其余列，这和“完全不能用索引”不是一回事。'},
      {title:'怎样自己验证',body:'对同一 WHERE 和 ORDER BY 分别 EXPLAIN 星号和覆盖列，记下 type、key、Extra。再改一个只有星号才选出的列名，看按名读取的客户端哪一侧报未知列。'},
    ],
    refs:[['MySQL 8.4：EXPLAIN 输出','https://dev.mysql.com/doc/refman/8.4/en/explain-output.html'],['MySQL 8.4：索引扩展','https://dev.mysql.com/doc/refman/8.4/en/index-extensions.html'],['MySQL 8.4：预处理语句缓存','https://dev.mysql.com/doc/refman/8.4/en/statement-caching.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_07) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
