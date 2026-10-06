# 资料核验记录（批次 22）

乱码的延时任务/订单超时 PDF 标不适用。

## 1. 阿里索引面经

原件：`阿里面试中关于索引有关的问题以及知识点.pdf`（8 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 索引是加速检索的数据结构；InnoDB 默认 B+ | **成立。** | `mysql-index`、`mysql-innodb-no-user-hash` |
| MySQL 常见 Hash 与 B+，Hash 不能范围查询 | **引擎要分开。** InnoDB 用户建不了 Hash。 | 该课 |

## 2. Spring Cloud 面试题

原件：`SpringCloud面试题.pdf`（6 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 发现、负载、容错是分布式痛点 | **方向成立。** | `sca-what` |
| 开篇把 Spring Cloud 说成 Stream 启动器；容错=Hystrix | **过时/错位。** | `sca-circuit-not-only-hystrix` |

## 3. Spring Boot 30 问

原件：`SpringBoot面试题 30道.pdf`（7 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| @SpringBootApplication 三注解；可内嵌 Tomcat | **成立。** | `spring-boot-war-still-ok` |
| 不需要独立容器；配置九条优先级 | **可打 WAR；优先级以现行文档为准。** | 该课、`spring-external-config` |

## 4. Dubbo 手册 / 41 题

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 默认 random、check、kill -9 无优雅停机 | **方向成立。** | `dubbo-loadbalance-random-default` |
| 孵化器、默认 Hessian、无分布式事务、注册主要 ZK | **过时。** | `dubbo-hessian-zk-not-frozen` |

## 5. 字节 Java 初级

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| HTTP 明文、HTTPS=TLS、80/443 | **成立。** | `https-tls13-not-12-packets` |
| HTTPS 固定 12 包所以更慢 | **过时。** TLS 1.3 不是 9 包税。 | 该课 |

## 6. 不适用 / 题干

- `如何基于 Redis 实现延时任务？.pdf`、`订单超时自动取消如何实现？.pdf`：乱码
- `Spark调优.pdf`：OCR 差，不做说法核验
- 有赞 24 问：仅题干，无答案；Linux 754 指向不明
