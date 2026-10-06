# Java 资料核验记录：MySQL 专题（批次 09）

本批核验私人题库 `6-Java专题分类/MySQL/mysql面试题.pdf` 中仍待核验的说法。PDF 仅用于本机比对，公开课程为独立撰写。课程以 MySQL 8.4 为主要运行基线。本批没有连接可用的 MySQL 8.4 实例：本机客户端是 5.7.31。8.4 手册正文读自 Oracle Documentation Library 镜像。

| 原件位置 | 待核说法（概述） | 核验结论与版本边界 | 已写课程 |
| --- | --- | --- | --- |
| 第 1 页，M2b | 程序能保证完整性就去掉外键；主题帖回复数等允许冗余 | **取舍题，不能写成默认最佳实践。** 外键在 InnoDB 提供声明式约束与级联，写入与 DDL 有额外检查成本；应用层校验不能自动获得同样的跨连接、跨版本保证。受控冗余（计数、最后回复时间）是常见反规范化，必须写明谁更新、失败如何补偿。 | `mysql-fk-redundancy` |
| 第 1 页，M3–M4 | 索引只有普通/唯一/主键/组合；实现通常是 B 树及 B+ 树 | **分类过窄，实现表述需收紧。** `CREATE INDEX` 还有 `FULLTEXT`、`SPATIAL`；`USING HASH`/`BTREE` 因引擎而异，MEMORY 可用 HASH。InnoDB 聚簇索引与二级索引的数据结构手册按 B-tree 描述；把“数据库索引=B 树”当成唯一实现会漏掉哈希与全文/空间索引。主键是一种约束，聚簇索引选择规则另有优先级。 | `mysql-index-kinds` |
| 第 1–2 页，M5 | `service mysql`/`mysqld`、登录、`show databases`、`describe` | **命令题，版本与发行版敏感。** `SHOW DATABASES`、`USE`、`SHOW TABLES`、`DESCRIBE`/`SHOW COLUMNS` 仍是有效 SQL。用 `service` 启停属于旧式 SysV 习惯，现代发行版多为 `systemctl`；包名是 `mysql` 还是 `mysqld` 因发行版而异。不单开公开课。 | 无（低优先级操作题） |
| 第 2 页，M6 | 主库写 binlog，从库拷到中继日志再重做；文中写作 replay log | **三步骨架对，术语与并发模型要更新。** 源端 Binary log dump 线程发送；副本 I/O（receiver）写入 **relay log**（不是 replay log）；SQL（applier）应用，且可并行 worker。默认异步；还有 GTID、半同步等。 | `mysql-replication-flow` |
| 第 2–3 页，M8a | MyISAM/InnoDB：事务、表锁、MVCC、外键、无主键时 6 字节主键 | **对比方向大体对，默认引擎与措辞要校正。** 8.4 默认 InnoDB。MyISAM：无事务、表锁、无 MVCC、无外键；InnoDB：事务、行锁、MVCC、外键。无合适主键时 InnoDB 生成隐藏聚簇索引，行 ID 为 6 字节，与手册一致。MyISAM「每次查询更快」不能当通则；全文索引对比以已发布的 `mysql-innodb-fulltext` 为准（InnoDB 已支持）。 | `mysql-myisam-innodb` |
| 第 3–4 页，M10 | 四隔离级别；InnoDB 用 MVCC+间隙锁解决幻读 | **级别名称对，机制要按读类型拆开。** 默认 `REPEATABLE READ`。普通一致性读用读视图；锁定读/`UPDATE`/`DELETE` 在 RR 下对范围用 gap/next-key 锁。不能说「MVCC 加间隙锁」笼统解决一切幻读：RC 下间隙锁基本关闭，普通 SELECT 与锁定读所见状态也可能不一致。 | `mysql-isolation-levels` |
| 第 4 页，M11 | 大字段拆子表，因为 16KB 页，拆后热点查询更小 | **可能有益，不是定理。** 默认页大小常见为 16KB，但 `innodb_page_size` 可配置。`TEXT`/`BLOB` 在 DYNAMIC 等行格式下本就可溢出到页外；拆表减少的是行内与缓冲池中的热点宽度，代价是关联查询与多表更新。 | `mysql-wide-column-split` |
| 第 5 页，M13d | `read_buffer_size` 是顺序扫描读缓冲，扫得慢就加大 | **过度简化。** 默认 131072。手册说明主要用于 MyISAM 顺序扫描等场景；对其他引擎的若干缓存用途写明 **InnoDB 除外**。不能当成 InnoDB 全表扫描的通用调大旋钮。并入既有 `mysql-buffer-pool-size` 表述，不单开新课。 | `mysql-buffer-pool-size`（增补） |
| 第 6 页，M17 | 不存在插入、存在更新写成 `INSERT ... ON DUPLICATE KEY UPDATE` | **语法成立，语义要带唯一约束。** 冲突触发条件是 `PRIMARY`/`UNIQUE`。受影响行数：插入 1、更新 2、值未变可为 0。多唯一索引时行为复杂；新写法推荐行别名，`VALUES(col)` 已弃用。 | `mysql-upsert` |
| 第 6 页，M18 | `INSERT ... SELECT` 与带 JOIN 的 `UPDATE` 示例 | **语法方向正确。** `INSERT ... SELECT` 与多表 `UPDATE ... JOIN` 均为 8.4 合法形式；复制时无 `ORDER BY` 的 `INSERT ... SELECT` 可能不安全。示例级题目，不单开公开课。 | 无（低优先级语法题） |

官方核验依据：

- [MySQL 8.4：FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html)
- [MySQL 8.4：CREATE INDEX](https://dev.mysql.com/doc/refman/8.4/en/create-index.html)
- [MySQL 8.4：Replication](https://dev.mysql.com/doc/refman/8.4/en/replication.html)、[Replication Threads](https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html)
- [MySQL 8.4：MyISAM](https://dev.mysql.com/doc/refman/8.4/en/myisam-storage-engine.html)、[InnoDB 聚簇索引](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html)、[Multi-Versioning](https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html)
- [MySQL 8.4：Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)
- [MySQL 8.4：InnoDB Row Formats](https://dev.mysql.com/doc/refman/8.4/en/innodb-row-format.html)
- [MySQL 8.4：`read_buffer_size`](https://dev.mysql.com/doc/refman/8.4/en/server-system-variables.html#sysvar_read_buffer_size)
- [MySQL 8.4：INSERT ... ON DUPLICATE KEY UPDATE](https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html)
- [MySQL 8.4：INSERT ... SELECT](https://dev.mysql.com/doc/refman/8.4/en/insert-select.html)、[UPDATE](https://dev.mysql.com/doc/refman/8.4/en/update.html)

本批完成后，该 PDF 队列中的待核验行已清空。第 05–08 批已发布结论仍然有效。
