# Java 资料核验记录：MySQL 专题（批次 05）

本批仅核验私人题库 `6-Java专题分类/MySQL/MySQL面试题.pdf` 的以下四个具体说法。PDF 及页面图片仅用于本机比对，公开课程为独立撰写，未移植题库原文、图像或答案结构。课程以 MySQL 8.4 为主要运行基线；涉及移除时间时查 MySQL 8.0 官方记录。

| 原件位置 | 待核说法（概述） | 核验结论与版本边界 | 已写课程 |
| --- | --- | --- | --- |
| 第 2 页，第 7 题 | MySQL 默认按语句复制，必要时自动改为行复制 | **旧说法不能泛用。** MySQL 8.4 的默认 `binlog_format` 是 `ROW`。先语句、必要时切换描述的是 `MIXED` 模式；运行实例还应检查 `log_bin`。 | `mysql-binlog-format` |
| 第 3 页，第 8 题 | InnoDB 不支持全文索引 | **已过时。** 官方功能表注明 InnoDB 从 MySQL 5.6 起支持 `FULLTEXT`；MySQL 8.4 官方文档给出 InnoDB 全文索引及 `MATCH ... AGAINST` 用法。 | `mysql-innodb-fulltext` |
| 第 3 页，第 9 题 | `VARCHAR(50)` 限制 50 字节 | **错误。** MySQL 8.4 的 `VARCHAR(M)` 中 `M` 表示最大字符数；实际字节数受字符集、内容和行大小等因素影响。 | `mysql-varchar-length` |
| 第 4—5 页，第 13 题 | 把 Query Cache 参数作为一般调优项 | **需要版本限定。** `query_cache_size` 等在 MySQL 8.0.3 移除；MySQL 8.0+ 不能照此调参。旧结果缓存与 InnoDB Buffer Pool 不同。 | `mysql-query-cache-removal` |

官方核验依据：

- [MySQL 8.4：复制格式](https://dev.mysql.com/doc/refman/8.4/en/replication-formats.html)、[二进制日志格式设置](https://dev.mysql.com/doc/refman/8.4/en/binary-log-setting.html)
- [MySQL 8.4：InnoDB 功能表](https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html)、[InnoDB 全文索引](https://dev.mysql.com/doc/refman/8.4/en/innodb-fulltext-index.html)
- [MySQL 8.4：字符串类型语法](https://dev.mysql.com/doc/refman/8.4/en/string-type-syntax.html)、[行大小限制](https://dev.mysql.com/doc/refman/8.4/en/column-count-limit.html)
- [MySQL 8.0：已移除变量](https://dev.mysql.com/doc/refman/8.0/en/added-deprecated-removed.html)、[MySQL 8.4：Buffer Pool](https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html)

后续选题已并入 [核对队列](../核对队列.md) 的 M2a、M13、M14、M15、M16，状态仍是待核验，不得直接作为公开结论：

| 原件位置 | 选题 | 首要核验方向 |
| --- | --- | --- |
| 第 1 页，第 2 题 | PreparedStatement 的性能与安全边界 | 参数化、防注入与执行计划复用是否可一概而论 |
| 第 5 页，第 13 题 | Buffer Pool 大小如何定 | 避免固定百分比调参，核对当前版本默认值与观测指标 |
| 第 6 页，第 14 题 | `VARCHAR(N)` 上限如何计算 | `utf8mb3`／`utf8mb4`、行格式、长度前缀的边界 |
| 第 6 页，第 15 题 | `SELECT *` 与显式列的取舍 | 覆盖索引、列新增、传输量，而非绝对不可优化 |
| 第 6 页，第 16 题 | WHERE、HAVING 与优化器下推 | 别名、聚合过滤和索引使用的具体条件 |

本记录不是整份 PDF 的正确性背书；余下内容按上述队列继续处理。
