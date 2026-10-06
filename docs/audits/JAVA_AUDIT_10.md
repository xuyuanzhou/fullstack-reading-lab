# Java 资料核验记录：并发与 JVM 内存区（批次 10）

本批结案两份已处于「核验中」的原件：`并发&多线程/并发编程面试题.pdf`（3 页）与 `JVM&内存&GC垃圾回收/JVM内存区域划分.pdf`（8 页）。PDF 仅用于本机比对，公开课程独立撰写。基线：Java SE 25 API 与 JVMS SE 25。

## 并发编程面试题.pdf

| 题号 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 1 | 用 `join` 保证 T2 在 T1 后、T3 在 T2 后执行 | **方向成立。** `join` 等待目标线程终止；也可用更明确的同步原语，但题干级答案可接受。 | 无（题干级） |
| 2 | Lock 最大优势是读写分开的锁，便于写 ConcurrentHashMap | **过度简化。** `Lock` 相对 `synchronized` 的要点是可中断/限时获取、`tryLock`、非块结构加解锁、`Condition`；读写分离属于 `ReadWriteLock`，不是 `Lock` 接口本身。`ConcurrentHashMap` 也不等于“用一把读写锁实现”。 | `java-lock-flexibility` |
| 3 | wait 会释放锁，sleep 一直持有锁 | **在监视器语境下大体对。** `Object.wait` 必须持有监视器，等待时释放该监视器；`Thread.sleep` 不释放任何监视器。不能推广到所有“阻塞”都这样。 | `java-wait-sleep` |
| 4–7、9、14–15 | 阻塞队列、生产者消费者、死锁、原子操作、竞争条件、不可变、常见问题 | **题干级开放题**，摘录未给出可独立证伪的绝对公式；不单开课。原子性/可见性边界沿用已有 `java-concurrency`。 | 无 |
| 8 | volatile 作用及与 synchronized 区别 | **已有课覆盖。** 可见性/有序性与复合操作非原子，见 `java-concurrency`。 | `java-concurrency` |
| 10 | UNIX `kill -3`、Windows Ctrl+Break 打 thread dump | **过时但不完全错。** 现代常用 `jcmd <pid> Thread.print`、`jstack`；信号方式因平台与容器而异。不单开课。 | 无 |
| 11 | 直接调 `run()` 不会执行任务代码 | **已核验为错误。** 见既有 `java-thread-start-run`。 | `java-thread-start-run` |
| 12 | IO 阻塞难中止；wait/sleep/join 可用中断唤醒 | **方向对。** 中断是协作信号，见 `java-interrupt`。 | `java-interrupt` |
| 13 | CyclicBarrier 可重复使用，CountDownLatch 不能 | **成立。** Latch 是一次性计数；Barrier 在各方到达后可循环，另有 barrier action 与破损模型。 | `java-barrier-latch` |

## JVM内存区域划分.pdf

| 位置 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| §1 程序计数器 | 写成 CPU 取指/加一，又夹带 JVM 规范句 | **已核验。** 混淆硬件 PC 与每线程 JVM pc；见 `jvm-areas`。 | `jvm-areas` |
| §2–3 虚拟机栈/本地方法栈 | 栈帧内容、SOE/OOME；HotSpot 把本地方法栈与 Java 栈合一 | **大体可接受。** 栈帧含局部变量表、操作数栈、常量池引用、返回地址等与规范方向一致；实现细节因 VM 而异。 | 无（并入 `jvm-areas` 语义） |
| §4 堆 | 对象与数组在堆；逃逸分析/标量替换使“绝对在堆”不成立 | **方向对。** | 无（既有分配/GC 课可覆盖） |
| §5 方法区 | 用永久代实现方法区；JDK7 后运行时常量池移出永久代 | **过时表述需校正。** 方法区是规范概念；HotSpot 在 JDK 8 起用 Metaspace 实现类元数据，不再是“永久代=方法区”的现行默认图。字符串常量池迁堆是另一条时间线，不能一句概括全部常量。 | `jvm-method-area-metaspace` |
| §6 直接内存 | NIO DirectBuffer 堆外，受 OS 限制 | **方向对。** OOM 文案见 `jvm-oom-signals`。 | `jvm-oom-signals`（既有） |
| 对象访问 / TLAB | 句柄 vs 直接指针；TLAB 减少分配竞争 | **方向对。** HotSpot 常见直接指针（另有压缩指针）；TLAB 是实现优化。不单开课。 | 无 |

## 官方依据

- [Java SE 25：Object（wait）](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Object.html)
- [Java SE 25：Thread](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Thread.html)
- [Java SE 25：Lock](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/Lock.html)
- [Java SE 25：CyclicBarrier](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/CyclicBarrier.html)
- [Java SE 25：CountDownLatch](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/CountDownLatch.html)
- [JVMS SE 25 §2.5 Runtime Data Areas](https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-2.html#jvms-2.5)

本批完成后，上述两份 PDF 文件级可标「已核验」。
