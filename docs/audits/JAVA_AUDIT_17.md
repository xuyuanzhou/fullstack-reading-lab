# Java 资料核验记录：十份一页 PDF（批次 17）

十轮说法级核对。PDF 仅本机比对，公开课程独立撰写。

## 1. 浏览器同源策略

原件：`你是否知道什么是浏览器同源策略.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 只有同源脚本才会被执行 | **错误。** 跨源 script 会执行，权限属当前文档。 | `same-origin-script-still-runs` |
| 请求发出但浏览器拒收响应 | **对 CORS 读取的简化。** 不是 TCP 没回来。 | 该课、`cors` |

## 2. DATETIME vs TIMESTAMP

原件：`MySQL中的datetime和timestamp有什么区别.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| DATETIME 8 字节 | **过时。** 无小数秒打包为 5 字节。 | `mysql-datetime-vs-timestamp` |
| TIMESTAMP 4 字节、随会话时区、2038 | **方向成立。** | 该课 |
| DATETIME 与时区无关 | **按字面存储，** 不是“更好”。 | 该课 |

## 3. 分布式锁

原件：`说说如何实现分布式锁 .pdf`（1 页，文件名末空格）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| SETNX 再 expire | **非原子。** 崩溃会留下死键。 | `redis-lock-setnx-expire-race` |
| Redis 主从可能双锁 | **方向成立。** | `distributed-lock` |
| ZK 临时有序节点 | **方向可接受**，细节用 Curator。 | 题干级 |

## 4. InnoDB vs MyISAM

原件：`阿里专场-Mysql的Innodb和MyISAM引擎的区别.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| InnoDB 事务/行锁/外键；MyISAM 表锁无事务 | **成立。** 8.4 默认 InnoDB。 | `mysql-myisam-innodb` |
| InnoDB 全文靠插件/ES | **过时。** InnoDB 有全文索引。 | `mysql-innodb-fulltext` |

## 5. 主从延迟

原件：`阿里专场-Mysql搭建数据库主从复制,会有同步延迟问题….pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 从库读不到刚写入 | **成立。** | `mysql-replica-lag` |
| 复制是单线程 | **不完整。** 8.4 可并行应用。 | `mysql-replica-parallel-applier` |
| 关键读走主库/缓存 | **成立。** | 该课 |

## 6. Bean 默认单例

原件：`Spring IOC容器里面的Bean默认是单例还是多例.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 默认 singleton；prototype 每次新实例 | **成立。** 单例≠线程安全。 | `spring-scopes`、`spring-scope-catalog` |

## 7. FIFO / LRU / LFU

原件：`阿里专场-缓存淘汰策略你知道有哪些_解释下 FIFO、LRU、LFU.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 三种通用置换 | **教材级。** | `redis-fifo-not-maxmemory` |
| 当作 Redis policy | **FIFO 不是官方 maxmemory-policy。** | 该课、`redis-eviction-policy-menu` |

## 8. Redis 为什么快 / 持久化

原件：`阿里专场-Redis为啥什这么快？有哪些持久化方式？….pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 内存、非阻塞 IO、命令单线程；6 后 I/O 多线程默认关 | **方向成立。** | `redis-single-thread` |
| RDB 快照、AOF 写日志 | **成立。** 仍有 fsync 窗口。 | `redis-persistence` |

## 9. CAP

原件：`说说CAP原理 .pdf`（1 页，文件名末空格）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 三者最多取二 | **口诀过度。** 分区是前提。 | `distributed-cap` |
| ZK=CP、Redis=AP | **标签过粗。** | 该课、`distributed-lock` |

## 10. ReentrantLock vs synchronized

原件：`阿里专场-ReentrantLock和synchronized使用的场景….pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 都是可重入互斥；Lock 要手动 finally | **成立。** | `java-reentrant-lock`、`java-lock-flexibility` |
| synchronized 只能非公平、不能 tryLock | **方向成立。** | `java-synchronized-monitor` |
| 偏向锁 mark word 细节 | 见监视器课，不背过时升级口诀。 | 该课 |

## 官方依据

- [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [MySQL date/time storage](https://dev.mysql.com/doc/refman/8.4/en/storage-requirements.html#data-types-storage-reqs-date-time)
- [Redis SET](https://redis.io/docs/latest/commands/set/)
- [replica_parallel_workers](https://dev.mysql.com/doc/refman/8.4/en/replication-options-replica.html#sysvar_replica_parallel_workers)
- [Redis eviction](https://redis.io/docs/latest/develop/reference/eviction/)
