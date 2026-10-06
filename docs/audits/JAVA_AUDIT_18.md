# Java 资料核验记录：十份一页 PDF（批次 18）

十轮说法级核对。PDF 仅本机比对，公开课程独立撰写。

## 1. Dubbo 负载均衡

原件：`Dubbo的负载均衡策略有哪些？ .pdf`（1 页，文件名末空格）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 默认 random，另有 RoundRobin、LeastActive、ConsistentHash | **成立。** 还有 ShortestResponse。 | `dubbo-loadbalance-random-default` |
| 轮询会在慢节点堆积；最少活跃看调用前后计数差 | **方向成立。** LeastActive 是进行中调用数。 | 该课 |

## 2. 创建索引

原件：`阿里专场-你创建索引的时候主要考虑啥…pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 减扫描、费空间和写维护 | **成立。** | `mysql-prefix-index-and-cost`、`mysql-index` |
| TEXT/BLOG 前缀索引 | **BLOB 误写成 BLOG。** 前缀还要够选择性。 | 该课 |

## 3. 消息堆积

原件：`阿里专场-线上消息队列故障了，消息堆积了几千万条…pdf`（2 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 只修 Consumer 慢慢追会来不及；并行受 queue 数限制 | **成立。** | `mq-backlog-expand-queues`、`mq-dlq-backlog` |
| 临时更宽 topic 再扩消费者 | **应急方向成立。** | 该课 |

## 4. MySQL 日志

原件：`阿里专场-Mysql有多少种常见的日志…pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| redo 持久性、undo 回滚+MVCC、relay 从库回放 | **成立。** | `mysql-redo-undo-binlog` |
| binlog 只用于主从 | **不完整。** 还有 PITR。 | 该课 |
| 慢日志只记录执行成功 | **过简。** 记的是超阈值语句。 | 该课 |

## 5. MQ 发送方式

原件：`阿里专场-消息队列的发送方式有哪几种…pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| SYNC / ASYNC / ONEWAY | **与 RocketMQ Producer API 对应。** | `rocketmq-send-oneway-may-drop` |
| 同步异步“不丢失” | **过满。** 还看刷盘、复制、消费 ACK。 | 该课、`rocketmq-flush-ha` |

## 6. MQ 可靠性

原件：`阿里专场-消息队列如何保证消息的可靠性传输_.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 不用 oneway；Broker 刷盘/主从；消费 ACK+幂等 | **方向成立。** “同步双写、异步刷盘”用词混了多款产品。 | 该课、`mq-consume-idempotent-key` |

## 7. 线程池使用

原件：`说说你在平时的开发中，如何使用线程池？ .pdf`（1 页，文件名末空格）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 用 ThreadPoolExecutor 而不是乱 new | **方向成立。** | `java-tpe-execute-order`、`java-executors-factory-oom` |
| 未 prestart 则队列里任务不执行；max 计算公式 | **错误/写乱。** 以 Javadoc execute 三段为准。 | `java-tpe-execute-order` |

## 8. 本地缓存 vs 分布式缓存

原件：`说下分布式缓存和本地缓存的区别，如何选择_.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 本地最快不共享；Redis/Memcached 可共享；常组合使用 | **成立。** | `cache-local-vs-distributed` |
| Redis 本地单机也算本地缓存 | **易混。** 仍是独立服务。 | 该课 |

## 9. Nginx 负载均衡

原件：`Nginx常见的负载均衡策略有哪些-使用场景是怎样的_.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 默认轮询、weight、ip_hash | **成立。** 还有 least_conn 等。 | `nginx-ip-hash-session` |
| 轮询可靠性低、只适合静态文件 | **过贬。** | 该课 |

## 10. CNAME 与 A 记录

原件：`域名配置中cname和a记录的作用是_.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| A 指 IPv4 地址，CNAME 是别名 | **成立。** 题干级，不单开课。 | RFC 1034/1035 常识 |
