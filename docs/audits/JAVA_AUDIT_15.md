# Java 资料核验记录：十份短 PDF（批次 15）

十轮说法级核对。PDF 仅本机比对，公开课程独立撰写。未点名句子按题干级处理。

## 1. 线程池不允许使用 Executors

原件：`Java面试-2020年更新/阿里专场-线程池不允许使用 Executors 去创建，要通过 ThreadPoolExecutor的方式原因？.pdf`（2 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 工厂底层仍是 ThreadPoolExecutor，参数不当会耗尽资源 | **成立。** | `java-executors-factory-oom` |
| Fixed/Single 用无界 LinkedBlockingQueue | **成立。** | 该课 |
| Cached/Scheduled 最大线程 Integer.MAX_VALUE | **成立。** | 该课 |

## 2. synchronized 理解

原件：`阿里专场-对synchronized了解不….pdf`（2 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 方法 ACC_SYNCHRONIZED，代码块 monitorenter | **成立。** | `java-synchronized-monitor` |
| 可重入、默认非公平 | **成立。** | 该课 |
| 现行默认偏向锁→轻量→重量 | **过时。** JEP 374 起偏向锁默认关。 | 该课 |

## 3. 消息重复消费

原件：`阿里专场-业务系统有没做消息的重复消费处理….pdf`（2 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 队列不保证不重复，消费要幂等 | **成立。** | `mq-consume-idempotent-key`、`mq-delivery-semantics` |
| Java SETNX 不能设过期 | **过时。** SET 可 NX+EX。 | 该课 |
| 唯一索引去重表 | **方向成立**，且比只 SETNX 可靠。 | 该课 |

## 4. 10 个 Main 方法面试题

原件：`Java基础/10个Java经典的Main方法面试题！.pdf`（2 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 入口是 public static void main(String[]) | **成立。** | `java-main-launcher` |
| Java 7 前可用静态初始化当入口 | **不能当现行答案。** | 该课 |
| 可重载；静态不能覆盖 | **方向成立**（隐藏而非覆盖）。 | 该课 |
| main 可以终结 | **无对应机制。** | 该课划掉 |

## 5. AQS

原件：`阿里专场-知道AQS吗？….pdf`（2 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| int state + CAS + 等待队列 | **成立。** | `java-aqs-not-futuretask` |
| ReentrantLock / Semaphore / CountDownLatch / 读写锁基于 AQS | **成立。** | 该课 |
| FutureTask 也基于 AQS | **过时。** 现行实现独立状态机。 | 该课 |
| state 类似 GC 回收计数器 | **类比不当。** | 并入该课 |

## 6. ReentrantReadWriteLock

原件：`阿里专场-知道ReentrantReadWriteLock吗？….pdf`（2 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 读共享写独占；可降级不可升级 | **成立。** 示例来自 JavaDoc。 | `java-rwlock-no-upgrade` |
| 读多写少才划算 | **方向成立。** | 该课 |

## 7. 10 个 List 面试题

原件：`集合/10个Java经典的List面试题！.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| asList 不支持 add、固定大小 | **成立。** 但它是数组视图，set 会写回。 | `java-arrays-aslist-fixed` |
| LinkedList 插入一定更快 | **口诀过度。** | `java-arraylist-linkedlist` |
| JDK7 后 ArrayList 默认大小 0 | **不完整。** 空构造延迟分配，首次 add 到 10。 | 并入 asList 课 |
| Vector 才线程安全 | **字面成立，** 现行并发用并发包。 | `java-collections` |

## 8. Http Method

原件：`常见的Http Method有哪些，使用场景分别是？.pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| HTTP/1.0：GET POST HEAD | **成立。** | `http-methods` |
| HTTP/1.1 定义六种且含 PATCH | **错误分层。** PATCH 是 RFC 5789。 | `http-patch-rfc5789` |
| PUT=全量更新个人信息 | **过业务化。** PUT 是替换资源。 | 该课 |

## 9. volatile

原件：`说说volatile关键字 .pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 可见性、禁止重排；++ 非原子 | **成立。** | `java-happens-before` |
| volatile 对象的字段不自动可见 | **方向对：** 可见的是引用发布。 | 并入 happens-before，无新课 |

## 10. ActiveMQ 面试题

原件：`ActiveMQ消息中间件/ActiveMQ消息中间件面试题.pdf`（4 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 默认预取导致一个消费者吃掉一批 | **机制成立**（队列默认 prefetch 较大）。 | `activemq-prefetch-limit` |
| 重试多次进 DLQ | **方向成立**，次数可配。 | 该课 |
| 最流行的企业总线 | **营销句，过时。** | `activemq-jms-model` |
| 非持久化堆临时文件可能把服务挂死 | 运维实验，题干级 | 无单开 |

## 官方依据

- [Executors.newFixedThreadPool](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/Executors.html#newFixedThreadPool(int))
- [JEP 374](https://openjdk.org/jeps/374)
- [Redis SET](https://redis.io/docs/latest/commands/set/)
- [JLS 12.1.4](https://docs.oracle.com/javase/specs/jls/se25/html/jls-12.html#jls-12.1.4)
- [AbstractQueuedSynchronizer](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/AbstractQueuedSynchronizer.html)
- [ReentrantReadWriteLock](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/ReentrantReadWriteLock.html)
- [Arrays.asList](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Arrays.html#asList(T...))
- [RFC 5789 PATCH](https://www.rfc-editor.org/rfc/rfc5789)
- [ActiveMQ prefetch](https://activemq.apache.org/components/classic/documentation/what-is-the-prefetch-limit-for)
