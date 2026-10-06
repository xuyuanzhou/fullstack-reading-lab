# Java 资料核验记录：MySQL 专题（批次 07）

本批仅核验私人题库 `6-Java专题分类/MySQL/mysql面试题.pdf` 的以下四个具体说法。PDF 仅用于本机比对，公开课程为独立撰写。课程以 MySQL 8.4 为主要运行基线；JDBC 对照 Java SE 21。本批没有连接可用的 MySQL 8.4 实例：本机客户端是 5.7.31，无密码登录被拒绝，未猜密码、未建库。8.4 手册正文读自 Oracle Documentation Library 上的 MySQL 8.4 Reference Manual 对应页（`dev.mysql.com` 对脚本返回 403）；Connector/J 页面是在浏览器中打开的 `dev.mysql.com` 当前手册。

| 原件位置 | 待核说法（概述） | 核验结论与版本边界 | 已写课程 |
| --- | --- | --- | --- |
| 第 1 页，第 2 题 | PreparedStatement 一般比 Statement 快，因为语句会在服务端做语法检查、语义分析、编译并缓存 | **不能当成总是更快。** 服务端预处理在重复执行时少做解析，结构缓存在会话内，元数据变化会重新准备；占位符只绑定数据值，不覆盖标识符。Connector/J 默认是客户端预处理，服务端路径要另设 `useServerPrepStmts=true`。 | `mysql-prepared-statement` |
| 第 4–5 页，第 13 题 | `innodb_buffer_pool_size` 默认 128M，并应设为物理内存的 3/4 到 4/5；大于 1G 时把缓冲池实例设为大于 1。不用 MyISAM 也要调 `key_buffer_size`，因为内部临时磁盘表是 MyISAM | **默认 128MB 仍成立，固定比例和 MyISAM 理由不成立。** 8.4 默认值是 134217728 字节。专用机手册可以说到物理内存的 80%，同时警告换页，并说明控制结构大约再占一成。`innodb_dedicated_server` 默认 OFF，只适合专用实例，并按内存分档用 128MB、50% 或 75%。缓冲池不大于 1GiB 时实例数默认是 1；大于 1GiB 时按块数与 CPU 的公式默认，范围 1–64，不是必须手工改成大于 1。磁盘内部临时表只用 InnoDB；`key_buffer_size` 默认 8MB，只缓冲 MyISAM 索引。`read_buffer_size` 这一句本批未核。 | `mysql-buffer-pool-size` |
| 第 6 页，第 14 题 | 单列 `VARCHAR(N)`、utf8 时，N 约为 `(65535-1-2)/3`；减 1 是因为存储从第二个字节开始，减 2 是长度，除以 3 是因为 utf8 | **公式不能当标准答案。** 行上限是 65535 字节且含开销。长度前缀在最大字节长度不超过 255 时为 1 字节，否则为 2 字节。手册举例是 latin1、`NOT NULL` 的单列 `VARCHAR(65533)` 成功、`VARCHAR(65535)` 失败，并没有多减的那个 1。8.4 里 `utf8` 仍是已弃用的 `utf8mb3` 别名（每字符最多 3 字节），`utf8mb4` 最多 4 字节。 | `mysql-varchar-row-max` |
| 第 6 页，第 15 题 | 显式列可以建索引优化，`SELECT *` 无法优化；`SELECT *` 要解析数据字典而显式列不需要；字段改名时前者不用改 | **把覆盖索引说成优化器完全不能优化 `SELECT *`。** `WHERE`、连接和排序仍可使用索引。`Extra` 里的 `Using index` 只在查询列都能从同一索引取得时出现。显式列同样要解析元数据。`SELECT *` 的 SQL 文本不含列名，但结果列名、顺序和客户端读取方式仍会随列变更改变。 | `mysql-select-star` |

官方核验依据：

- [MySQL 8.4：Prepared Statements](https://dev.mysql.com/doc/refman/8.4/en/sql-prepared-statements.html)、[PREPARE](https://dev.mysql.com/doc/refman/8.4/en/prepare.html)、[预处理语句缓存](https://dev.mysql.com/doc/refman/8.4/en/statement-caching.html)
- [Connector/J：JDBC API Implementation Notes](https://dev.mysql.com/doc/connector-j/en/connector-j-reference-implementation-notes.html)、[Prepared Statements 连接属性](https://dev.mysql.com/doc/connector-j/en/connector-j-connp-props-prepared-statements.html)
- [Java SE 21：`PreparedStatement`](https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/PreparedStatement.html)
- [MySQL 8.4：InnoDB 参数](https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html)、[Buffer Pool](https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html)、[专用服务器自动配置](https://dev.mysql.com/doc/refman/8.4/en/innodb-dedicated-server.html)
- [MySQL 8.4：服务器系统变量](https://dev.mysql.com/doc/refman/8.4/en/server-system-variables.html)、[内部临时表](https://dev.mysql.com/doc/refman/8.4/en/internal-temporary-tables.html)
- [MySQL 8.4：字符串类型](https://dev.mysql.com/doc/refman/8.4/en/string-type-syntax.html)、[存储需求](https://dev.mysql.com/doc/refman/8.4/en/storage-requirements.html)、[列数与行大小](https://dev.mysql.com/doc/refman/8.4/en/column-count-limit.html)
- [MySQL 8.4：utf8mb3](https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-utf8mb3.html)、[utf8 别名](https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-utf8.html)、[utf8mb4](https://dev.mysql.com/doc/refman/8.4/en/charset-unicode-utf8mb4.html)
- [MySQL 8.4：EXPLAIN 输出](https://dev.mysql.com/doc/refman/8.4/en/explain-output.html)、[索引扩展](https://dev.mysql.com/doc/refman/8.4/en/index-extensions.html)

本记录不是整份 PDF 的正确性背书。第 16 题 WHERE/HAVING 已由第 08 批发布为 `mysql-where-having`。第 13 题里的 Query Cache 不另写课，沿用已发布的 `mysql-query-cache-removal`；`read_buffer_size` 已并入 `mysql-buffer-pool-size`（见第 09 批）。第 05、06 批已发布结论仍然有效。
