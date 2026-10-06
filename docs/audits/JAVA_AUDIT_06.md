# Java 资料核验记录：MySQL 专题（批次 06）

本批仅核验私人题库 `6-Java专题分类/MySQL/MySQL面试题.pdf` 的以下四个具体说法。PDF 及页面图片仅用于本机比对，公开课程为独立撰写。课程以 MySQL 8.4 为主要运行基线。

| 原件位置 | 待核说法（概述） | 核验结论与版本边界 | 已写课程 |
| --- | --- | --- | --- |
| 第 1 页，第 1 题 | 把第二范式说成“每行可唯一区分/加上主键”；第三范式说成“表中不含其他表已有的非主键信息” | **定义不准确。** 2NF 要求非主属性完全函数依赖于每个候选键，禁止对复合键的部分依赖。加代理主键不能自动满足 2NF。3NF 针对的是非主属性对候选键的传递依赖。 | `mysql-second-nf` |
| 第 1 页，第 2 题 | UNION 会按字段顺序排序，UNION ALL 只合并不排序 | **错误。** MySQL 8.4 中 UNION 默认 DISTINCT，作用是去重。集合运算结果默认无序；要对整体排序须在最后写 `ORDER BY`。 | `mysql-union-distinct` |
| 第 4 页，第 12 题 | 只有走索引才用行锁，否则 InnoDB 使用表锁 | **过度简化。** 行锁加在索引记录上；无用户二级索引时仍通过聚簇索引或隐藏 `GEN_CLUST_INDEX` 加记录锁。无合适过滤条件可能锁住大量记录，看起来像锁表，但不是改用 MyISAM 式表锁。 | `mysql-innodb-index-lock` |
| 第 3 页，第 8 题 | InnoDB 表大小一般受限于 2GB | **过时。** MySQL 8.4 在默认 16KB 页下内部表空间上限约 64TB，实际还受文件系统单文件限制。2GB/4GB 属于特定文件系统或旧环境的文件上限，不是当前 InnoDB 的一般表容量。 | `mysql-innodb-tablespace` |

官方核验依据：

- [Second normal form](https://en.wikipedia.org/wiki/Second_normal_form)、[Third normal form](https://en.wikipedia.org/wiki/Third_normal_form)
- [MySQL 8.4：UNION](https://dev.mysql.com/doc/refman/8.4/en/union.html)、[集合运算](https://dev.mysql.com/doc/refman/8.4/en/set-operations.html)
- [MySQL 8.4：InnoDB 锁](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html)、[聚簇与二级索引](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html)
- [MySQL 8.4：InnoDB 限制](https://dev.mysql.com/doc/refman/8.4/en/innodb-limits.html)

本记录不是整份 PDF 的正确性背书。第 05 批已发布的复制格式、VARCHAR、全文索引与 Query Cache 结论仍然有效。其余说法已标记在 [核对队列](../核对队列.md)，尚未继续核对。
