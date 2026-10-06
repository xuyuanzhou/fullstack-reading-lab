# Java 资料核验记录：ES 七题与 Redis 短 PDF（批次 13）

本批结案三份短私人题单。PDF 仅用于本机比对，公开课程独立撰写。

## 精选7道Elastic Search面试题！.pdf

原件：`6-Java专题分类/ElasticSearch/精选7道Elastic Search面试题！.pdf`（2 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| Q2 | Lucene 用 B+ 树、一个库、遍历搜；ES 才倒排、才集群 | **错误分层。** Lucene 即倒排索引；ES 在其上做分片与 HTTP。 | `es-lucene-not-btree` |
| Q2 末 | ES 没有事务，删除不能恢复 | **绝对化。** 可见性看 refresh/副本；有快照与乐观并发。 | 并入该课 |
| Q5 | 用版本号保证线程安全 | **方向可接受。** 现行更常用 if_seq_no / if_primary_term。 | 题干级 |
| Q4 | bulk 建议 5–15MB，http.max_content_length 默认 100mb | **量级可接受**，最佳值仍取决于硬件与文档。 | 题干级 |
| Q7 | `_default_` 映射、默认 string | **过时。** `_default_` 已移除；text/keyword 取代默认 string。 | 题干级过时，无单开 |

倒排结构本身见既有 `es-inverted-index`；本课专纠 B+ 树对比。

## Redis篇(带答案).pdf

原件：`6-Java专题分类/Redis & Memcache/Redis篇(带答案).pdf`（5 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 10.1.0 | 事务=全部执行或全部不执行 | **不成立。** MULTI 无回滚。 | `redis-transaction` |
| 10.1.4 | 自建 VM；value 最大 1GB | **过时/错误。** VM 已废；STRING 上限 512MB。 | `redis-legacy-vm-limits` |
| 10.1.3 | 只有旧六种淘汰，且写成 no-enviction | **过时清单。** 另有 LFU 等；拼写应为 noeviction。 | `redis-eviction-policy-menu` |
| 10.1.1 | Redis 比 Memcached 快很多 | **绝对化。** 视数据大小与实现，不能当定律。 | 并入体积课 |
| 10.1.8 | Sentinel 高可用、Cluster 分片 | **方向成立。** | `redis-sentinel-cluster` |
| 其余 | 主库不要持久化、链表从库 | 运维偏好，不是协议定理 | 题干级 |

## 分布式缓存 Redis + Memcached 经典面试题！.pdf

原件：`6-Java专题分类/Redis & Memcache/分布式缓存 Redis + Memcached 经典面试题！.pdf`（4 页）。与上一份大量重复。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 4 | 回收就是 LRU | **不完整。** 见淘汰策略课。 | `redis-eviction-policy-menu` |
| 9 | Redis key 最长 512k | **错误。** 文档上限按 STRING 512MB 量级理解。 | `redis-legacy-vm-limits` |
| 1、9 | Redis 一定更快；单核 vs 多核 | **场景题。** 不单开速度课。 | 并入体积课 |
| 3、8 | twemproxy / session 四种方案 | 题干级架构选项 | 无 |
| 其余 | 与 Redis 篇重复的类型、持久化 | 并入既有课 | `redis-data-types`、`redis-persistence` |

## 官方依据

- [Redis：Key eviction](https://redis.io/docs/latest/develop/reference/eviction/)
- [Redis：Strings](https://redis.io/docs/latest/develop/data-types/strings/)
- [Redis：Transactions](https://redis.io/docs/latest/develop/using-commands/transactions/)
- [Elasticsearch：Index API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html)
- [Lucene：index 包](https://lucene.apache.org/core/9_11_1/core/org/apache/lucene/index/package-summary.html)
