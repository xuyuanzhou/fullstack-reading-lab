# JAVA_AUDIT_54 — 《分布式高并发》D8 分布式锁口误

| 原件位置 | 易错说法 | 公开课 |
| --- | --- | --- |
| 约第 201 页 | setnx/get/getset + 本机时间判断锁过期 | `redis-lock-getset-wall-clock` |
| 约第 200 页 | SELECT FOR UPDATE 当成跨机分布式锁 | `mysql-for-update-not-dist-lease` |

说法级结案。与已有 `redis-lock-setnx-expire-race`、`distributed-lock` 互补，不重复。原 PDF 不进站点。
