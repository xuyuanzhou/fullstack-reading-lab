# 资料核验记录（批次 21）

说法级核对。乱码扫描件与星球 PDF 前言标不适用。

## 1. MySQL 多实例安装

原件：`Mysql数据库多实例安装.pdf`（4 页，5.6.31）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 分 datadir/port/socket | **方向成立。** | `mysql-initialize-not-install-db` |
| mysql_install_db、5.6 tar | **8.4 已换 initialize。** | 该课 |

## 2. 数据结构与算法

原件：`数据结构与算法-2025年更新.pdf`（6 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 栈 LIFO、队 FIFO、树遍历、稳定排序名单 | **成立。** | `algo-stable-sort`、`hash-open-addressing-probe` |
| 开放定址=下一个空位 | **不完整。** | 该课 |

## 3. JVM 内存与 GC

原件：两份 `JVM性能调优-JVM内存整理及GC回收.pdf`。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 值传递；Eden/Survivor/老年代 | **值传递成立。** | `java-pass-by-value` |
| OOM 时必无软引用 | **过满。** | `java-soft-ref-not-oom-proof` |
| 永久代、MaxPermSize、多个 Survivor | **过时/不准确。** | `jvm-no-permgen-hotspot` |

## 4. 蚂蚁分布式锁题

原件：两份蚂蚁 Java 高级真题。SETNX 非原子见既有 `redis-lock-setnx-expire-race`；ZK 临时节点方向见 `distributed-lock`。题干级已核验。

## 5. 网易前端 26 问

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 表单能否跨域；HTTP/1.1 如何复用 TCP | **表单可跨源提交；1.1 是 Keep-Alive。** | `html-form-cross-origin-navigate` |

## 6. 不适用

- `如何解决大文件上传问题？.pdf`、`多位骑手抢一个外卖订单….pdf`、`几种典型的系统设计案例….pdf`：提取乱码
- `测试.pdf`：英文 QA 海报，无可靠技术说法
- `（最强八股文）第五版（概述）.pdf`：目录前言，不是说法源
