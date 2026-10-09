/* Batch 41: synchronized 不锁全部方法, 线程不止四态, final 类没有五成加速, 不要用移位当 2*8. */
const COVERAGE_JAVA_41 = [
  {
    track:'java', group:'并发', id:'java-sync-not-all-methods',
    title:'进入一个 synchronized 方法，挡不住同一对象上的普通方法',
    prompt:'为什么说“一个线程进了某对象的一个同步方法，别的线程就不能进这个对象的其它方法”？',
    core:'`synchronized` 实例方法锁的是 `this`，静态方法锁的是 Class，见 `java-synchronized-monitor`。同一监视器上的同步方法/块互斥。没有 `synchronized` 的方法不进监视器，别的线程随时可以进。两个线程锁不同实例也不互斥。要互斥的代码才加锁，见 `java-lock-flexibility`。',
    why:'按“整个对象被锁死”去排并发 bug，会漏掉未同步的 getter 把半成品读走。',
    example:'线程 A 在 `synchronized void set()` 里，线程 B 仍能调没有 synchronized 的 `get()`。两个 `Foo` 实例可以同时进各自的 `synchronized` 方法。',
    task:'划掉“进一个同步方法就锁死该对象全部方法”；写出谁和谁互斥。',
    answer:'互斥的是同一把监视器。未同步方法不参与。不同实例各有各的 this。',
    keywords:'synchronized monitor this unsynchronized method',
    points:['同一对象上的同步方法互斥','未同步方法不经过监视器','不同实例的 this 不是一把锁'],
    refs:[['JLS 17.1 Synchronization','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html#jls-17.1'],['Java Tutorial：Synchronized Methods','https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html']]
  },
  {
    track:'java', group:'并发', id:'java-thread-six-states',
    title:'Thread.State 有六个值，不是运行就绪挂起结束（JDK 5）',
    prompt:'为什么还把 Java 线程背成“运行、就绪、挂起、结束”四种状态？',
    core:'`Thread.getState()`（**JDK 5** 起的 `Thread.State`）返回 `NEW`、`RUNNABLE`、`BLOCKED`、`WAITING`、`TIMED_WAITING`、`TERMINATED`。RUNNABLE 包含可运行和正在占用 CPU，没有单独的“就绪”。没有 API 叫挂起；`suspend`/`stop` 已废弃且危险。等待分无限等（`wait`/`join`/`park`）和限时等（`sleep`/`wait(timeout)`），见 `java-wait-sleep`。创建线程不只有继承 Thread 和实现 Runnable，还有 `Executor`、`Callable`、虚拟线程，见 `java-executor`、`java-virtual-threads`。启动仍是 `start()` 不是 `run()`，见 `java-thread-start-run`。',
    why:'按四态去读 `jstack`，会对不上 BLOCKED 和 TIMED_WAITING，还会去调已经废弃的 suspend。',
    example:'`Thread.sleep(1000)` 是 TIMED_WAITING。抢不到 `synchronized` 是 BLOCKED。`Object.wait()` 无超时是 WAITING。',
    task:'对照 Thread.State 枚举划掉四态口诀；写出 sleep 和抢锁分别是哪一个。',
    answer:'六个状态。没有挂起。sleep 是 TIMED_WAITING。抢 synchronized 是 BLOCKED。',
    keywords:'Thread.State NEW RUNNABLE BLOCKED WAITING TIMED_WAITING TERMINATED',
    points:['枚举是六个值，没有单独的就绪或挂起','sleep 是 TIMED_WAITING，抢锁是 BLOCKED','stop/suspend 已废弃，不要当状态机'],
    refs:[['Thread.State','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.State.html'],['Java Tutorial：Thread States','https://docs.oracle.com/javase/tutorial/essential/concurrency/states.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-final-not-fifty-percent',
    title:'给类加 final 不会让程序快百分之五十',
    prompt:'为什么优化清单写“类声明成 final，编译器内联所有方法，性能平均提高 50%”？',
    core:'`final` 类不能被继承，这是语言规则，见 `java-string-immutability`。HotSpot 本来就能对单态调用做内联，不要求类或方法写 final。没有任何规范承诺“平均快 50%”。该 final 的是 API 契约（不可变、禁止子类），不是当加速开关。过期对象赋 `null` 也不会立刻 GC，见 `java-memory`。`clone()` 代替 `new` 更不是现行工厂，见 `java-not-every-class-clone-serializable`。',
    why:'把业务基类改成 final 只为冲 50%，子类测试立刻编不过，基准测试也看不出那一半。',
    example:'`String` 是 final 因为契约，不是因为它“快一半”。给 `OrderService` 加 final，JIT 日志里内联情况和加之前可以一样。',
    task:'划掉“final 类=快 50%”；写出 final 真正禁止的是什么。',
    answer:'final 禁止继承。内联是 JIT 的事。没有五成加速的规范。不要靠赋 null 催 GC。',
    keywords:'final class inlining HotSpot performance myth',
    points:['final 类不能被继承，这是契约不是加速比','JIT 内联不依赖你把类写成 final','没有官方的平均快 50% 承诺'],
    refs:[['JLS 8.1.1.2 final Classes','https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.1.1.2'],['HotSpot 内联','https://wiki.openjdk.org/display/HotSpot/PerformanceTechniques']]
  },
  {
    track:'java', group:'Java 基础', id:'java-shift-not-times-eight',
    title:'2 左移 3 不是“算出 2 乘 8”的正经答案',
    prompt:'为什么面试把 `2<<3` 当成“最有效率的 2×8”，生产代码也跟着用移位代替乘除？',
    core:'`2 << 3` 的值确实是 16，这是移位语义，见 JLS 15.19。HotSpot 会把乘 8 这种常数乘法自己强度折减，手写移位几乎赢不到可测的时间，还更难读。负数、溢出、对 long 与 int 的位移距离都容易写错。优先写 `2 * 8` 或直接 `16`。同步范围应尽量小，不要听“尽量用方法同步代替代码块同步”，见 `java-synchronized-monitor`。',
    why:'为了口算题把业务里的 `price * 8` 改成 `price << 3`，负数价格和代码评审一起炸。',
    example:'`Math.round(11.5)` 是 12，`Math.round(-11.5)` 是 -11，这才是该记的。容量对齐写成有名字的常数，而不是一串 `<<`。',
    task:'划掉“移位一定比乘法快”；写出何时才用移位（位图、对齐掩码）。',
    answer:'乘除写乘除。JIT 会折减常数。移位留给位运算。方法级 synchronized 不是更快。',
    keywords:'shift multiply strength reduction JLS 15.19',
    points:['左移 3 等于乘 8 只是值相等','常数乘法由 JIT 折减，手写移位不自动更快','同步应缩小范围，不是整方法一定更快'],
    refs:[['JLS 15.19 Shift Operators','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.19'],['JLS 15.17 Multiplicative Operators','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.17']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_41) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
