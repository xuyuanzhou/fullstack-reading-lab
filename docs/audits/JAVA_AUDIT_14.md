# Java 资料核验记录：十份短 PDF（批次 14）

十轮说法级核对。PDF 仅本机比对，公开课程独立撰写。不是这十份文件的逐字验收；未点名的句子按题干级处理。

## 1. 设计模式面试专题及答案.pdf

原件：`6-Java专题分类/设计模式/设计模式面试专题及答案.pdf`（2 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 1 | 单例用于 Runtime、Calendar | **错误。** Calendar.getInstance 每次新建可变实例。 | `java-calendar-not-singleton` |
| 1 | Boolean.valueOf 当工厂模式典型 | **牵强。** 更接近装箱缓存。 | 并入该课 |
| 3 | Runtime 单例、enum 单例 | **成立。** | 并入该课 |
| 其余 | IO 装饰器、观察者 | 题干级方向可接受 | 无单开 |

## 2. MySQL高频面试题 10道.pdf

原件：`6-Java专题分类/MySQL/MySQL高频面试题 10道.pdf`（3 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 1 | 唯一索引查询未必更快；写入因 change buffer 可能更慢 | **机制成立。** | `mysql-unique-change-buffer` |
| 3 | 8.0 删除查询缓存 | **成立。** | `mysql-query-cache-removal` |
| 4 | InnoDB 部分版本无全文索引 | **过时。** 现行 InnoDB 有全文索引。 | `mysql-innodb-fulltext` |
| 8 | 2NF=加上主键列 | **不成立。** | `mysql-second-nf` |
| 6 | RR 总是看见启动时快照 | **不完整。** 锁定读与幻读另说。 | `mysql-isolation` |
| 其余 | Server 分层、备份+binlog | 题干级 | 无单开 |

## 3. 微服务面试专题及答案.pdf

原件：`6-Java专题分类/SpringCloud&微服务/微服务面试专题及答案.pdf`（3 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 框架 | Netflix 整套是 Spring Cloud 的核心 | **过时。** 许多 Netflix 组件已维护模式/移出主线；现行常见是 Spring Cloud 202x + Alibaba 等。 | `sca-what`、`sca-component-map` |
| 框架 | Dubbo 仍是阿里服务化框架之一 | **方向可接受**，细节以现行 Dubbo 3 为准。 | `sca-dubbo-or-feign` |
| 后半 | 外链清单（RESTful、CAP、幂等） | 不是可核验正文 | 题干级，不单开 |

## 4. SpringMVC面试题.pdf

原件：`6-Java专题分类/SpringMVC/SpringMVC面试题.pdf`（4 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 8 | 只能用 @Controller，不能代替 | **错误。** JSON API 用 @RestController。 | `spring-mvc-restcontroller` |
| 6 | 控制器是单例，里面不能写字段 | **过绝对。** 不能放请求状态；可以注入协作 bean。 | 并入该课；作用域见 `spring-scopes` |
| 3–4 | DispatcherServlet 调度 | **骨架成立。** | `spring-mvc-dispatch` |
| 2 | 不依赖 Servlet API | **资料已自我打脸**（实现仍依赖）。 | 题干级 |

## 5. MongoDB面试题.pdf

原件：`6-Java专题分类/MongoDB/MongoDB面试题.pdf`（4 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 14 | 没有传统锁/带回滚的事务，像 MyISAM 自动提交 | **过时。** 4.0 起多文档事务。 | `mongo-multi-doc-txn` |
| 6 | 32 位默认关 journaling | **过时产品线。** | 并入该课 |
| 其余 | 命名空间、GridFS、分片块 | 题干级或旧运维口吻 | 无单开 |

## 6. 面试必备之乐观锁与悲观锁.pdf

原件：`6-Java专题分类/乐观锁与悲观锁/面试必备之乐观锁与悲观锁.pdf`（5 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 全文 | 悲观锁先加锁；乐观锁版本号/CAS；写少读多用乐观 | **方向成立。** | `jpa-optimistic-lock`、`java-concurrency` |
| 版本号例子 | 提交时比较 version 相等再更新 | **成立。** | 并入乐观锁课 |
| 其余 | 场景取舍 | 题干级 | 无新课 |

## 7. Zookeeper面试题 20道.pdf

原件：`6-Java专题分类/Zookeeper/Zookeeper面试题 20道.pdf`（6 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 1 | 保证含“实时性（最终一致性）” | **术语混用。** 官方是 timeliness（有界落后），写路径线性一致。 | `zk-linearizable-not-realtime` |
| 1 | 写同时发给所有机器 | **简化过度。** 走 leader / ZAB。 | 并入该课 |
| 3 | 自带 zkclient | **错误。** 官方是 ZooKeeper Java API；zkclient 第三方。 | 并入该课 |
| 5 | znode 约 1MB | **量级成立。** | 并入该课 |

## 8. SpringBoot面试题.pdf

原件：`6-Java专题分类/SpringBoot/SpringBoot面试题.pdf`（6 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 2 | 没有单独 Web 服务器、不再启动 Tomcat | **误导。** 默认内嵌 Tomcat。 | `spring-boot-devtools-restarts` |
| 4 | 标题“无需重启”，正文又写嵌入式 Tomcat 会 restart | **自相矛盾。** DevTools 是快速重启。 | 该课 |
| 5–6 | Actuator 端点默认按角色保护 | **旧安全模型。** 现行是暴露端点 + Spring Security 配置，不能背 ACTUATOR 角色口诀。 | 题干级过时，无单开 |

## 9. 消息中间件--RabbitMQ(20题).pdf

原件：`6-Java专题分类/RabbitMQ消息中间件/消息中间件--RabbitMQ(20题).pdf`（5 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 容量 | 队列可认为无限制，只取决于内存 | **不成立。** 有 max-length、磁盘告警。 | `rabbit-queue-not-unbounded` |
| 幂等 | 生产侧 inner-msg-id 去重 | **不是协议能力。** | 该课 |
| 确认 | 投到队列或落盘后 confirm | **方向近。** 确认的是路由/持久化，不是业务只一次。 | 该课、`rabbit-ack` |
| HA | 镜像队列 | **旧方案。** 现行优先 quorum queue。 | `rabbit-ha-queue` |

## 10. 30个Java经典的集合面试题！.pdf

原件：`6-Java专题分类/集合/30个Java经典的集合面试题！.pdf`（8 页）。

| 题 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 7 | Enumeration 比 Iterator 快一倍、更省内存 | **无官方依据。** | `java-enumeration-not-faster` |
| 7 | Iterator 会阻止其它线程修改集合 | **夸大。** fail-fast 不是锁。 | 该课 |
| 1 | HashTable / Dequeue 拼写 | **类名错误。** Hashtable、Deque。 | 该课 |
| 18 | HashMap 允许 null；Hashtable 同步 | **成立。** 并发请改 ConcurrentHashMap。 | `java-concurrent-map`、`java-collections` |

## 官方依据

- [Calendar.getInstance](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Calendar.html#getInstance())
- [InnoDB change buffer](https://dev.mysql.com/doc/refman/8.4/en/innodb-change-buffer.html)
- [Spring @RequestMapping / REST](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html)
- [MongoDB Transactions](https://www.mongodb.com/docs/manual/core/transactions/)
- [ZooKeeper Overview](https://zookeeper.apache.org/doc/current/zookeeperOver.html)
- [Spring Boot DevTools](https://docs.spring.io/spring-boot/reference/using/devtools.html)
- [RabbitMQ queue length](https://www.rabbitmq.com/docs/maxlength)
- [Iterator](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Iterator.html)
