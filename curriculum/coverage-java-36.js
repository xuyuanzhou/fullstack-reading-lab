/* Batch 36: 多态不必类继承, 十线程不是十分之一时间, JMM 不是八操作, CHM 不再分段锁. */
const COVERAGE_JAVA_36 = [
  {
    track:'java', group:'Java 基础', id:'java-polymorphism-not-only-extends',
    title:'多态不必先继承一个类，实现接口也算',
    prompt:'为什么把多态背成必须同时满足“继承、重写、父类引用指向子类”三件套？',
    promptAnswer:'接口实现也是多态。不必先 extends 一个类；重载不是运行时多态。',
    core:'多态（Polymorphism）是运行时按对象的实际类型选方法。语言规范里的方法调用（Method Invocation，JLS 15.12）分两步：编译期按引用的静态类型和参数选定签名，这是重载；运行时再按实际对象选实现。List list = new ArrayList() 走的是接口，没有类继承也能多态。不要为了看起来像继承，再加一个抽象父类。默认方法见 `java-interface-contract`。',
    example:'`Runnable r = () -> {}` 和 `new Thread(r)` 是接口多态。`print(int)` / `print(String)` 是重载，编译期就定了。',
    task:'划掉“必须先 extends 一个类”；写出接口引用为什么也是多态。',
    answer:'接口实现也是多态。三件套把接口方案开除了。重载不是运行时多态。',
    keywords:'polymorphism interface override overload dynamic dispatch',
    points:['运行时按实际类型分派方法','接口引用指向实现类也是多态','重载在编译期选定，不是这套分派'],
    refs:[['JLS 15.12 Method Invocation','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.12'],['Java Tutorial：Polymorphism','https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html']]
  },
  {
    track:'java', group:'并发', id:'java-threads-not-linear-speedup',
    title:'十个线程不会把 100 毫秒变成 10 毫秒',
    prompt:'为什么把多线程背成“一个线程 100ms，十个线程只要 10ms”？',
    promptAnswer:'只有能拆开且不抢同一资源时才接近线性。锁、IO、串行段都会让十线程远慢于十分之一。',
    core:'只有工作能拆开、很少共享、又有足够的核，加速才接近线性。抢同一把锁、同一段 IO、同一份结果数组，线程越多越排队。创建和切换也有成本。Amdahl 定律：串行部分会卡住加速比。线程池默认也不是“核数乘十就更快”，见 `java-executors-factory-oom`。',
    why:'按十分之一时间去估接口耗时，上线后 CPU 打满、延迟反而变差。',
    example:'十个线程同时 `synchronized` 写同一个计数器，总时间往往比单线程更长。十个独立的 HTTP 调用才可能接近十路并行。',
    task:'写出什么时候加速接近线性；划掉“线程数等于倍数加速”。',
    answer:'能拆开且不抢同一资源才加速。锁、IO、串行段都会让十线程远慢于十分之一。',
    keywords:'Amdahl thread pool speedup contention',
    origin:'本地库《图解系统》CPU 如何选择线程页',
    diagram:'library-assets/illustrated-basics/os-p0079.png',
    points:['加速比受串行部分限制','共享锁和 IO 会抵消线程数','创建和切换本身有成本'],
    refs:[['Amdahl 定律','https://en.wikipedia.org/wiki/Amdahl%27s_law'],['JLS 17 Threads and Locks','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html']]
  },
  {
    track:'java', group:'JVM', id:'jmm-not-eight-memory-ops',
    title:'现行 JMM 用 happens-before，不是八个内存操作口诀',
    prompt:'为什么还在用 read/load/use/assign/store/write/lock/unlock 八步当现行内存模型？',
    promptAnswer:'八操作是旧模型。现行跨线程可见看 happens-before；运行时数据区是另一张图。',
    core:'那是 JDK 5 之前旧规范里的工作内存故事。JSR-133 起用 happens-before 和同步边，见 `java-happens-before`。它也不是 JVM 运行时那几块区，见 `jvm-jmm-not-runtime-areas`。面试里画主内存、工作内存可以当直觉，但不能当成“虚拟机必须执行这八条指令”。volatile 和锁的语义以 JSR-133 / JLS 17 为准。',
    why:'按八步去对汇编，会找不到对应指令，还会把可见性理解成必须拷来拷去。',
    example:'`volatile` 写 happens-before 后续的读。没有对应一条名叫 store 的字节码。',
    task:'划掉“现行 JMM=八操作”；写出跨线程可见要靠哪类边。',
    answer:'八操作是旧模型。现在看 happens-before。运行时数据区是另一张图。',
    keywords:'JSR-133 happens-before JMM working memory',
    diagram:'diagrams/jvm-happens-before.svg',
    points:['八操作属于 JDK5 前旧模型','现行规范用 happens-before','JMM 不是堆、栈、方法区那张图'],
    refs:[['JSR 133','https://jcp.org/en/jsr/detail?id=133'],['JLS 17.4 Memory Model','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.4']]
  },
  {
    track:'java', group:'Java 基础', id:'chm-jdk8-not-segment-lock',
    title:'JDK 8 起 ConcurrentHashMap 不再靠 16 个 Segment',
    prompt:'为什么还把 CHM 背成“把数组切成若干段，每段一把锁”？',
    promptAnswer:'JDK 8 起是 CAS 加桶级同步，不是再背 Segment 分段锁。迭代器是弱一致。',
    core:'JDK 7 的 ConcurrentHashMap 用 Segment 分段锁。JDK 8 起改成数组加链表或红黑树，写入用 CAS 和桶头上的 synchronized，不再有默认 16 段，concurrencyLevel 也不再是那个旧旋钮。JEP 180 处理的是桶被碰撞拉长之后的争用。它的迭代器是弱一致，size 在并发下是估算。树化条件见 `hashmap-treeify-need-capacity`，迭代器见 `chm-iterator-weakly-consistent`。',
    example:'JDK 21 源码里没有 `Segment` 类当默认结构。冲突严重时是桶级锁，不是 16 把大锁。',
    task:'写出 JDK 7 与 8 的锁粒度；划掉“CHM=16 段锁”。',
    answer:'8 起是 CAS 加桶锁。不要再背 Segment。迭代器弱一致。',
    keywords:'ConcurrentHashMap Segment CAS synchronized JDK8',
    points:['JDK 8 去掉默认 Segment','写入是 CAS 与桶级 synchronized','迭代器弱一致，size 是估算'],
    refs:[['ConcurrentHashMap','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html'],['JEP 180：Map contention','https://openjdk.org/jeps/180']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_36) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
