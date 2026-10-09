# JAVA_AUDIT_52 — 《分布式高并发》D8 续抽

| 原件位置 | 易错说法 | 公开课 |
| --- | --- | --- |
| 约第 196 页，Redis 发号 | 五节点集群按初值 1..5、步长 5 并行 INCR，并当作去掉单点 | `redis-cluster-incr-not-five-steps` |
| 约第 57 页，NoSQL | 「最终一致性，而非 ACID」写成 NoSQL 的定义 | `nosql-label-not-eventual` |
| 约第 68 页，拆分原则 | 单表到一千万行以内就必须拆 | `mysql-split-not-at-ten-million` |

结论为说法级，**不是** 206 页逐页验收。原 PDF 不进站点。对照：Redis INCR 与集群规范、MongoDB 事务、InnoDB 限制。雪花时钟回拨与分库自增已有课，本批不重做。
