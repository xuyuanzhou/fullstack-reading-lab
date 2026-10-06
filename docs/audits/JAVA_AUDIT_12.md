# Java 资料核验记录：Nginx / MyBatis / Kafka 短 PDF（批次 12）

本批结案三份 3 页私人题单。PDF 仅用于本机比对，公开课程独立撰写。

## Nginx面试题.pdf

原件：`6-Java专题分类/Nginx/Nginx面试题.pdf`。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| Q15 | 用 gunzip 把请求压缩到上游 | **方向反了。** gunzip 解压带 gzip 的响应给不支持 gzip 的客户端。 | `nginx-gunzip-not-compress` |
| Q18 | 模块只能编译时选择，不支持运行时 | **过时。** 1.9.11 起 `load_module` 可加载已构建的动态模块。 | `nginx-load-module` |
| Q1、8 | Web/反向代理；master 读配置、worker 处理请求 | **方向可接受。** 事件驱动是多 worker 各跑事件循环，不宜理解成整个进程只有一条线程。 | 题干级 |
| Q5、11、12 | 444、merge_slashes、upstream 模块 | **方向可接受**，配置细节随版本，不单开。 | 题干级 |
| 其余 | Apache 对比空题、C10K 口号 | 题干级或过时口号 | 无 |

## Mybatis面试题（含答案）.pdf

原件：`6-Java专题分类/MyBatis/Mybatis面试题（含答案）.pdf`（与半角括号那份内容相同）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| Q1 | `#{}` 预编译、`${}` 字符串替换 | **成立。** 已有 `mybatis-parameters`。 | `mybatis-parameters` |
| Q3 | RowBounds 是内存分页，插件才拼物理分页 | **成立，且易被当成默认方案。** | `mybatis-rowbounds-memory` |
| Q2 | Mapper 按全名+方法名绑定，不能靠重载区分 | **方向成立**（XML id 冲突）。 | 并入 `mybatis-mapper-bound` 语义 |
| Q6–7 | 插件四接口；一级 Session / 二级 Namespace | **方向成立。** 见既有插件与缓存课。 | `mybatis-plugin-interceptor`、`mybatis-local-cache` |
| Q8 | 延迟加载用 CGLIB 代理 | **实现细节过时/不完整。** 现行可配置 Javassist 等；不单开。 | 无 |
| 其余 | ResultMap、动态 SQL 标签、include 二遍解析 | **方向可接受。** | 既有映射/动态 SQL 课 |

## Kafka面试题.pdf

原件：`6-Java专题分类/Kafka&消息队列/Kafka面试题.pdf`。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| Q3 | broker 活着必须维持 ZooKeeper 心跳 | **过时。** 现行默认 KRaft，无 ZK。 | `kafka-kraft-not-zk` |
| Q13 | acks=-1 等所有 follower 收到才 ack，这样不会丢 | **不完整。** `all` 等的是 ISR，不是每一个副本；领导者确认前失败仍有窗口。 | `kafka-producer-acks`、`kafka-isr-hwm` |
| Q2、6 | 三种投递语义；producer push / consumer pull | **方向可接受。** Exactly-once 需幂等与事务配置，不是默认定律。 | `mq-delivery-semantics` |
| Q16 | 一个消费组内部有序、组间无序 | **不精确。** 顺序边界是分区，不是消费组。 | `distributed-kafka-order` |
| 其余 | topic/partition/segment、pull 轮询 | 题干级或过时存储头格式 | 无 |

## 官方依据

- [nginx：ngx_http_gunzip_module](https://nginx.org/en/docs/http/ngx_http_gunzip_module.html)
- [nginx：load_module](https://nginx.org/en/docs/ngx_core_module.html#load_module)
- [MyBatis：plugins](https://mybatis.org/mybatis-3/configuration.html#plugins)
- [Kafka：KRaft](https://kafka.apache.org/documentation/#kraft)
- [Kafka：acks](https://kafka.apache.org/documentation/#producerconfigs_acks)
