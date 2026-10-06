# Java 资料核验记录：十份短 PDF（批次 16）

十轮说法级核对。PDF 仅本机比对，公开课程独立撰写。

## 1–2. CAS 与 ABA

原件：`阿里专场-能否解释下什么是CAS，存在什么问题.pdf`、`…CAS里面的ABA问题….pdf`（各 1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| CAS 比较再交换；失败自旋 | **成立。** 自旋会占 CPU。 | `java-cas-aba-stamp` |
| 底层公开 Unsafe | **不要当应用答案。** 用原子类/VarHandle。 | 该课 |
| 一定比 synchronized 好 | **绝对化。** | 该课 |
| ABA 用 AtomicStampedReference | **成立。** | 该课 |

## 3. CGLib 与 JDK 动态代理

原件：`阿里专场-Spring里面 CGLib和JDK动态代理区别、选择策略.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| JDK 要接口；CGLIB 是子类；final 不行 | **机制成立。** | `spring-boot-aop-cglib-default`、`spring-aop-proxy-type` |
| 有接口就默认 JDK | **Boot 下过时。** 默认 proxy-target-class=true。 | 该课 |

## 4. BlockingQueue

原件：`阿里专场-你知道阻塞队列BlockingQueue不？….pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| Array 有界；Linked 默认 MAX_VALUE | **成立。** | `java-linked-blocking-unbounded` |
| DelayQueue 要 Delayed | **成立。** | 该课 |
| 满了就会阻塞 | **仅有界队列的 put/take。** | 该课 |

## 5. 手写懒汉式单例

原件：`手写懒汉式单例 .pdf`（1 页，文件名末尾有空格）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| DCL 要 volatile 防重排发布 | **成立。** | `java-dcl-volatile-enum` |
| 这是唯一写法 | **不完整。** 枚举/饿汉更不易写错。 | 该课 |

## 6. String 10 题

原件：`Java基础/10个Java经典的String面试题！.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 不是基本类型；不可变；不可继承 | **成立。** | `java-string-immutability` |
| trim 去掉首尾空白 | **不完整。** 不是全部 Unicode 空白。 | `java-string-strip-not-trim` |
| getBytes / new String(byte[]) | **必须写字符集。** | 该课、`java-charset-default` |
| new String("abc") 一定两个对象 | **依赖常量池。** | 该课 |

## 7. MyBatis 一二级缓存

原件：`Mybatis的一级、二级缓存使用场景和失效策略.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 一级默认、SqlSession；二级 namespace 要打开 | **成立。** Spring 里会话常随事务结束。 | `mybatis-local-cache` |
| 增删改 commit 清空 | **方向成立。** | 该课 |

## 8. 缓存击穿 / 穿透 / 雪崩

原件：`阿里专场-能否说下缓存击穿、穿透、雪崩的区别….pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 穿透=不存在；击穿=单热点过期；雪崩=一片过期 | **分类成立。** | `cache-penetration-vs-breakdown` |
| 空值短 TTL、互斥、TTL 抖动 | **方向成立。** | 该课 |

## 9. HTTP 状态码

原件：`Http状态码里面的1xx_2xx_3xx_4xx_5xx主要应用场景是？.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 401 未写；403=没权限；400/404/405 | 403 方向对；缺 401。 | `http-status-auth` |
| 503=服务器宕机 | **错误。** 503 是暂时不可用。 | `http-503-unavailable` |
| 3xx 浏览器总会自动跳 | **过绝对。** | 该课 |

## 10. RocketMQ 14 题

原件：`RabbitMQ消息中间件/消息中间件--RocketMq(14题).pdf`（4 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 无限内存 Buffer、磁盘 TTL 内可堆积 | **内存无限不成立；** 落盘+保留期成立。 | `rocketmq-store-not-ram-buffer` |
| 不保证恰好一次，要幂等 | **成立。** | 该课、`mq-delivery-semantics` |
| 定时只有 level | **成立。** | 该课、`rocketmq-model` |
| Kafka 用 Scala、功能残缺 | **过时营销对比。** | 题干级 |
| 同步双写可避免单点丢失 | **方向可接受，** 有性能代价。 | 题干级 |

## 官方依据

- [AtomicStampedReference](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/atomic/AtomicStampedReference.html)
- [Spring Boot AOP](https://docs.spring.io/spring-boot/reference/features/spring-aop.html)
- [LinkedBlockingQueue](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/LinkedBlockingQueue.html)
- [JLS happens-before / volatile](https://docs.oracle.com/javase/specs/jls/se25/html/jls-17.html#jls-17.4.5)
- [String.strip](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/String.html#strip())
- [MyBatis cache](https://mybatis.org/mybatis-3/sqlmap-xml.html#cache)
- [RFC 9110 503](https://www.rfc-editor.org/rfc/rfc9110.html#name-503-service-unavailable)
- [RocketMQ concepts](https://rocketmq.apache.org/docs/introduction/02concepts/)
