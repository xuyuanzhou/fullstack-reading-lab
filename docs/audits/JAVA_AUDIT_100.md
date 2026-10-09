# JAVA_AUDIT_100 — 《分布式高并发》D8 Xmx≠cgroup 与缓存双写竞态

| 原件位置 | 易错说法 | 公开课 |
| --- | --- | --- |
| 容器/JVM 内存口诀 | -Xmx=容器限额 | `jvm-xmx-not-container-limit` |
| 缓存更新步骤 | 写库删缓存即无旧读 | `cache-db-double-write-race` |

说法级结案。原 PDF 不进站点。
