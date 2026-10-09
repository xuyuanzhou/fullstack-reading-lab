# JAVA_AUDIT_51 — 《分布式高并发》D8 续抽

| 原件位置 | 易错说法 | 公开课 |
| --- | --- | --- |
| 约第 27 页，消息解耦 | 库存挂了也不影响下单 → 只入队就返回成功 | `distributed-mq-not-erase-invariant` |
| 约第 17–18 页，REST | 插入写成 PUT；REST 收成只回 JSON | `http-create-post-not-put` |

结论为说法级，**不是** 206 页逐页验收。原 PDF 不进站点。对照：Outbox / Saga 模式文、MDN PUT/POST、RFC 9110。
