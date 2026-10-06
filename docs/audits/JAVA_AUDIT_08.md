# Java 资料核验记录：MySQL 专题（批次 08）

本批仅核验私人题库 `6-Java专题分类/MySQL/mysql面试题.pdf` 第 6 页第 16 题关于 `WHERE` 与 `HAVING` 的四条概括。PDF 仅用于本机比对，公开课程为独立撰写。课程以 MySQL 8.4 为主要运行基线。本批没有连接可用的 MySQL 8.4 实例：本机客户端是 5.7.31。8.4 手册正文读自 Oracle Documentation Library 上的 MySQL 8.4 Reference Manual 对应页。

| 原件位置 | 待核说法（概述） | 核验结论与版本边界 | 已写课程 |
| --- | --- | --- | --- |
| 第 6 页，第 16 题 | 语法上 WHERE 用表中列名，HAVING 用 SELECT 结果别名；WHERE 影响从表读出的行数，HAVING 影响返回客户端的行数；WHERE 可用索引，HAVING 不能用索引、只能在临时结果集操作；WHERE 不能用聚集函数，HAVING 专门用聚集函数 | **方向对一半，四条都不能当绝对公式。** 标准 SQL 不允许在 WHERE 里引用 SELECT 别名，因为求值时尚不确定列值；HAVING、GROUP BY、ORDER BY 可以引用别名。HAVING 并不只能写别名：它可以写分组列、聚集表达式，MySQL 还扩展允许引用 SELECT 列表列和外层子查询列。WHERE 决定哪些行进入分组；HAVING 在分组之后筛选组，手册写明接近最后、在送往客户端之前应用，LIMIT 在 HAVING 之后。没有 GROUP BY、也没有聚集函数时，优化器会把 HAVING 与 WHERE 合并，这时不再是“只能扫临时结果”。手册对带分组的 HAVING 写“with no optimization”，并明确劝人不要把本该写在 WHERE 里的条件放进 HAVING。WHERE 不能引用聚集函数，HAVING 可以；但 HAVING 不是“专门/只能”写聚集函数，非聚集的行级条件应写回 WHERE。 | `mysql-where-having` |

官方核验依据：

- [MySQL 8.4：SELECT Statement](https://dev.mysql.com/doc/refman/8.4/en/select.html)（Oracle 镜像：[select.html](https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/select.html)）
- [MySQL 8.4：Problems with Column Aliases](https://dev.mysql.com/doc/refman/8.4/en/problems-with-alias.html)（Oracle 镜像：[problems-with-alias.html](https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/problems-with-alias.html)）
- [MySQL 8.4：WHERE Clause Optimization](https://dev.mysql.com/doc/refman/8.4/en/where-optimization.html)（Oracle 镜像：[where-optimization.html](https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/where-optimization.html)）
- [MySQL 8.4：MySQL Handling of GROUP BY](https://dev.mysql.com/doc/refman/8.4/en/group-by-handling.html)（Oracle 镜像：[group-by-handling.html](https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/group-by-handling.html)）

本记录不是整份 PDF 的正确性背书。其余待核说法已由第 09 批结案。第 05、06、07 批已发布结论仍然有效。
