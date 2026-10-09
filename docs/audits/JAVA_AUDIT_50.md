# 资料核验记录（批次 50）

Redis 思维导图把 Twemproxy 取模与「集群」画在同一枝，并把 SAVE / BGSAVE 并排成可随便选用。对照 Redis Cluster 规范与持久化文档改写，原图不进站点。

| 原件 | 说法 | 课程 |
| --- | --- | --- |
| Redis 思维导图 | 代理 + Hash 取模 = 集群 | `redis-proxy-hash-not-cluster` |
| 同上 | SAVE 与 BGSAVE 一样随便用 | `redis-save-blocks-bgsave` |
