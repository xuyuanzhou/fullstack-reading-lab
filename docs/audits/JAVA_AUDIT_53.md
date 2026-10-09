# JAVA_AUDIT_53 — Redis/MySQL 结构缺口 + D8 DNS

| 原件 / 线索 | 易错或缺口 | 公开课 |
| --- | --- | --- |
| Redis 类型使用 | 对象只存 JSON String；排行榜拉回应用 sort；HLL 当可枚举 Set | `redis-hash-field-update`、`redis-zset-rank-range`、`redis-hyperloglog-approx` |
| SQL 联结 / 分组 | INNER 丢行不察；聚合门槛塞进 WHERE | `mysql-inner-join-match`、`mysql-group-by-having` |
| 《分布式高并发》约第 92 页 | DNS=简单轮询 + 拧小 TTL 即实时 | `dns-lb-not-just-round-robin` |

说明：曾拆成 `dns-lb-not-live-health` / `dns-ttl-not-instant-failover` 的草案已合并进 `dns-lb-not-just-round-robin`，勿再接入 OUTLINE。原 PDF / 库原文不进站点。
