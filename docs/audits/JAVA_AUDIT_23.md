# 资料核验记录（批次 23）

短链/QQ 去重扫描件乱码，标不适用。

## 1. 正则表达式（CS-Notes）

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| `.` 是元字符；多数实现不匹配换行 | **默认成立。** 有 DOTALL。 | `js-regex-dot-not-newline` |
| `\\d` 等价 `[0-9]` | **看引擎和 Unicode 开关。** | 该课 |

## 2. Redis 面试专题（二）

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 内存数据库、可持久化、STRING/LIST 等 | **方向成立。** | `redis-data-types` |
| value 最大 1GB；又写字符串 512M；Codis 最多 | **1GB 错；512MB 对；Codis 过时。** | `redis-string-max-512mb` |

## 3. 网易 2015 笔试 / 多线程高并发

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| RuntimeException 必须 catch | **错误。** | `java-unchecked-not-must-catch` |
| stop/suspend 危险；sleep 不释放监视器 | **成立。** | `java-wait-sleep` |

## 4. 腾讯 Java 高级

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| Lua 保 Redis 多命令原子；Dubbo 客户端负载；Eureka 30/90 | **方向成立。** | `redis-lua-atomic`、`eureka-lease-30-90` |
| Netflix 全家桶当永恒内核；Kafka 没有回溯 | **过时/过贬。** | `sca-circuit-not-only-hystrix` |

## 5. java虚拟机 2025

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 五区划分；pc 不抛 OOM；8 起元空间 | **pc 与元空间成立。** 不要叫 JMM。 | `jvm-pc-no-oom`、`jvm-jmm-not-runtime-areas` |

## 6. Linux 面试题

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 自旋锁忙等、信号量可睡 | **方向成立。** | `linux-bkl-gone` |
| 大内核锁、2.4 内核不可抢占当现状 | **过时。** | 该课 |

## 7. 题干 / 不适用

- 挖财 24 问：仅题干
- `如何设计一个短链系统？.pdf`、`40亿个QQ号….pdf`：乱码
