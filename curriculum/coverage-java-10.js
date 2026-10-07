/* Batch 10: concurrency PDF + JVM method area corrections. */
const COVERAGE_JAVA_10 = [
  {
    track:'java', group:'并发', id:'java-lock-flexibility',
    title:'Lock 的优势不是“自带读写锁”',
    prompt:'为什么把 Lock 接口的最大优势说成“读写分开的锁，好写 ConcurrentHashMap”不准确？',
    core:'java.util.concurrent.locks.Lock 相对 synchronized，多了几条获取与释放方式。可以在不同代码块里 lock/unlock。可以用 tryLock 做非阻塞尝试，也可以限时获取，获取过程还可以中断。另外还能 newCondition()。读写分离属于 ReadWriteLock（及其 ReadLock/WriteLock），不是 Lock 接口的默认语义。ReentrantLock 仍是互斥锁。ConcurrentHashMap 的并发结构是专门实现，不能概括成“外面套一把读写锁”。需要多读者单写者时，应显式选择 ReadWriteLock 或并发容器，并说明释放锁仍要放在 finally。',
    why:'把 Lock 背成“自带读写锁、用来写 ConcurrentHashMap”，只要互斥时会选错接口，也会把并发容器讲成外层加锁。区分信号是读写分离在 ReadWriteLock 上，ReentrantLock 仍然是互斥锁。',
    example:'缓存更新用 ReentrantLock + tryLock 做超时失败；多读少写的树用 ReentrantReadWriteLock。统计表用 ConcurrentHashMap.computeIfAbsent，而不是自己持有写锁去 get/put。',
    task:'列出 Lock 相对 synchronized 的四条能力，并标明哪一条其实属于 ReadWriteLock；再写一句为何不能说 ConcurrentHashMap=读写锁。',
    answer:'相对 synchronized，Lock 可以跨块加解锁、tryLock 非阻塞或限时、获取时可中断，以及 newCondition。读写分开不在这四条里，它属于 ReadWriteLock。ConcurrentHashMap 用自己的结构，不能说成外面套一把读写锁。',
    keywords:'Java Lock ReentrantLock ReadWriteLock tryLock Condition ConcurrentHashMap synchronized',
    points:['Lock 支持 tryLock、限时与可中断获取','读写锁是 ReadWriteLock，不是 Lock 默认能力','ConcurrentHashMap 不能概括成外层读写锁'],
    deep:[
      {title:'释放仍要放进 finally',body:'显式锁不会随代码块结束而自动放开。tryLock 成功后若忘记 unlock，后面的线程会一直等。临界区抛错时，解锁要写在 finally 里，和 synchronized 的隐式释放不同。'},
      {title:'怎样自己验证',body:'对照 Lock 的说明列出四条获取方式，再打开 ReadWriteLock，确认读写分离不在 Lock 里。最后看 ConcurrentHashMap 的更新方法，它不是先拿写锁再 get/put。'},
    ],
    refs:[['Java SE 25：Lock','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/Lock.html'],['Java SE 25：ReadWriteLock','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/ReadWriteLock.html']]
  },
  {
    track:'java', group:'并发', id:'java-wait-sleep',
    title:'wait 释放监视器，sleep 不释放',
    prompt:'为什么“wait 会释放锁，sleep 一直持有锁”必须先说清楚是哪一把锁？',
    core:'Object.wait 只能在已持有该对象监视器的线程里调用；进入等待集时会释放这把监视器，被 notify/notifyAll 或中断等方式唤醒后，还要重新竞争同一监视器才能从 wait 返回。Thread.sleep 只是让当前线程暂停计时，不释放它已经持有的任何监视器；若 sleep 写在 synchronized 块内，其他线程仍进不来。Lock 上的等待应使用 Condition.await，语义对应的是那把显式锁，而不是 Object.wait。把“阻塞就会不会放锁”说成通用规则会误导 I/O 阻塞和 Lock 场景。',
    why:'把“睡一会儿就会让出锁”当成通用规则，sleep 写在 synchronized 里时，别的线程仍然进不了同一监视器。区分信号是 wait 放开的是当前这把监视器，sleep 哪一把都不放。',
    example:'synchronized(queue){ while(empty) queue.wait(); } 等待时别人可以入队并 notify。若在持锁时 Thread.sleep(1000)，持锁期间其他线程无法进入同一临界区。',
    task:'写两个线程：一个在 synchronized 里 wait，一个在 synchronized 里 sleep；观察另一线程能否进入同一监视器，并改用 Condition 重述一遍。',
    answer:'第一个线程在 synchronized 里 wait：进入等待时释放这把监视器，另一个线程可以进来，notify 之后还要重新抢到锁才返回。第二个线程在同一把锁里 sleep：计时期间不释放，另一个线程进不去。换成显式锁时，等待应写 Condition.await，不是 Object.wait。',
    keywords:'Java Object.wait Thread.sleep monitor Condition.await notify 监视器',
    points:['wait 必须持有监视器，等待时释放','sleep 不释放已持有的监视器','显式锁的等待用 Condition，不是 Object.wait'],
    deep:[
      {title:'醒来还不等于拿到锁',body:'wait 返回之前要重新竞争原来的监视器。被唤醒只是离开等待集，临界区里可能又被别人改过，所以要用 while 再检查条件，不能 if 一次就继续。条件要用循环再看。'},
      {title:'怎样自己验证',body:'两个线程抢同一对象：一个 wait，看另一个能否进入并 notify；一个在锁里 sleep，看另一个是否一直进不去。再改成 Condition.await，确认等的是那把显式锁。'},
    ],
    refs:[['Java SE 25：Object','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Object.html'],['Java SE 25：Thread.sleep','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Thread.html#sleep(long)']]
  },
  {
    track:'java', group:'并发', id:'java-barrier-latch',
    title:'CountDownLatch 一次性，CyclicBarrier 可循环',
    prompt:'为什么只说“一个能复用一个不能”还不够区分 Latch 和 Barrier？',
    core:'CountDownLatch 构造时给定计数，线程 countDown，其他线程 await 直到到零；计数不能重置，是一次性闸门，常用于“启动信号”或“等 N 个任务结束”。CyclicBarrier 让固定数量的当事人都 await 到同一屏障点，然后一起继续，并可在下一轮再次汇合；还可注册 barrier action，由最后一个到达的线程执行。Barrier 在中断、超时或重置时可能进入破损状态，等待方收到 BrokenBarrierException。选择时看协作形状：一人开门多人过门用 Latch；一群人反复在同一点碰头用 Barrier。',
    why:'只背“一个能复用、一个不能”，会在主线程等工人结束时硬套 Barrier，或在分阶段迭代里把 Latch 用完却无法再倒数。区分信号是一次性开门，还是一群人反复在同一点汇合。人数和轮次对不上就会卡死。',
    example:'主线程 new CountDownLatch(n)，每个工人结束 countDown，主线程 await。并行分治每轮结束用 CyclicBarrier(n, mergeRunnable)，进入下一轮。',
    task:'分别用 Latch 与 Barrier 实现“等齐 3 个工人再打印一次”；说明哪一个能直接跑两轮，哪一个要新建实例。',
    answer:'等齐 3 个工人再打印：Latch 用计数 3，每人 countDown，等待方 await，到零打印一次；计数不能重置，第二轮必须新建实例。Barrier 用当事人 3，三人都 await 后打印，并可带上汇合动作；同一对象能直接跑第二轮。中断或超时会让 Barrier 破损。',
    keywords:'Java CountDownLatch CyclicBarrier await countDown BrokenBarrierException 同步辅助',
    points:['Latch 计数到零后不能重置','Barrier 可重复进入下一轮汇合','Barrier 有破损模型与可选 barrier action'],
    deep:[
      {title:'协作方向不同',body:'Latch 常是工人报完成、别人等门开。Barrier 是固定人数互相等齐再一起走。人数中途变化、或只想等“至少几个结束”，Barrier 的破损和固定人数会对不上。'},
      {title:'怎样自己验证',body:'用计数 3 的 Latch 跑两轮打印：第二轮若不新建，计数已是零，不会再等。再用同一个 CyclicBarrier 跑两轮，两轮都应打印；中途打断一个线程，等待方会看到破损。'},
    ],
    refs:[['Java SE 25：CountDownLatch','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/CountDownLatch.html'],['Java SE 25：CyclicBarrier','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/CyclicBarrier.html']]
  },
  {
    track:'java', group:'JVM', id:'jvm-method-area-metaspace',
    title:'方法区是规范概念，不是永久代别名',
    prompt:'为什么还把“方法区 = 永久代，JDK7 后常量池挪走了”当成现行标准答案？',
    core:'JVMS 规定方法区由所有线程共享，存放每个类的结构信息等；它不要求必须叫永久代，也不固定某块堆内区域。HotSpot 曾用永久代实现方法区相关存储，但从 JDK 8 起类元数据转到 Metaspace（本地内存），调参与 OOM 文案都变为 Metaspace。资料里“JDK7 之后运行时常量池移出永久代”混进了字符串常量池迁堆等历史步骤，不能代替“现行默认实现是 Metaspace”这一判断。方法区是否回收、何时回收由实现决定；递归导致的溢出更常见于栈，不能写成方法区一调用就 OOME 的通式。',
    why:'继续按永久代背参数，会在 JDK 8 及以后找错区域、改错旗标，类元数据打满时对不上日志。区分信号是 OOM 文案写 Metaspace 还是 Java heap space。文案已经换成 Metaspace。',
    example:'类元数据打满时日志是 Metaspace，应看 MaxMetaspaceSize，而不是永久代大小。堆对象打满是 Java heap space。递归把栈打满则是另一句栈溢出，不能写成方法区一调用就耗尽。',
    task:'对照 JVMS 方法区定义与当前 HotSpot 文档，列出“规范名 / 旧实现名 / 现行实现名”，并解释一处 OOM 文案该查哪块区域。',
    answer:'规范名是方法区，JVMS 只说线程共享、存放类结构，不规定叫永久代。旧实现名是 HotSpot 的永久代。现行实现名是 Metaspace，类元数据在本地内存。看到 Metaspace 就查元数据上限；看到 Java heap space 才查堆。常量池怎么迁移要按版本分开，不能并成一句。',
    keywords:'JVM 方法区 Metaspace 永久代 JVMS 运行时常量池 HotSpot',
    diagram:'diagrams/jvm-method-area.svg',
    points:['方法区是 JVMS 共享区域，不是固定商品名','HotSpot JDK 8+ 用 Metaspace 承载类元数据','不要把永久代参数当现行默认图'],
    deep:[
      {title:'三套名字不要叠成一个',body:'方法区是规范里的区域。永久代是旧的 HotSpot 实现。Metaspace 是 JDK 8 起的类元数据实现。调参和 OOM 文案跟的是实现名，不是规范里的“方法区”三个字。'},
      {title:'怎样自己验证',body:'对照 JVMS 的运行时数据区写出规范名，再对照 HotSpot 文档写出旧的永久代和现行 Metaspace。拿一条 OOM 日志对文案：Metaspace 查元数据，heap space 查堆。'},
    ],
    refs:[['JVMS SE 25：Runtime Data Areas','https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-2.html#jvms-2.5']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_10) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
