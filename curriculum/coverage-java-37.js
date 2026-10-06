/* Batch 37: Java 不是 C++ 手动释放堆, Vector 同步不是 CME 原因, Stack 让位 Deque, 不是每个类都要 Cloneable. */
const COVERAGE_JAVA_37 = [
  {
    track:'java', group:'JVM', id:'java-heap-not-cpp-manual',
    title:'Java 堆不是 C++ 那套 new 完必须 delete',
    prompt:'为什么把“值类型在栈、引用类型在堆、堆上必须手动释放”直接当成 Java 内存模型？',
    core:'那是 C/C++ 教材里的堆与调用栈。Java 规范里对象通常落在堆上，线程有自己的 Java 虚拟机栈装帧；局部变量里的引用在栈帧，对象本身不随 `delete` 消失。回收看可达性，见 `java-memory`。JIT 还可能做逃逸分析，把未逃逸对象标量替换掉，不等于“每个 `new` 都在堆上留一块直到你 free”。进程也不是只有一个 malloc 堆：有分代、TLAB。`finalize` 更不是析构函数，见 `java-finalize-not-guaranteed`。',
    why:'按 delete 去写 Java，会空等析构，或把栈上局部引用当成对象已经从堆里抹掉。',
    example:'`new byte[16]` 在方法返回后仍可能被 JIT 放在栈上的标量里。C++ 的 `delete[] pBuffer` 在 Java 里没有对应语句。',
    task:'划掉“Java 堆必须手动 free”；写出对象通常在哪、谁决定回收。',
    answer:'对象通常在堆，局部引用在栈帧。没有 delete。回收看 GC 根。逃逸分析可以不在堆上留对象。',
    keywords:'heap stack escape analysis TLAB GC JVM spec',
    diagram:'diagrams/jvm-no-delete.svg',
    points:['Java 没有 C++ 式 delete 释放堆对象','对象通常在堆，引用在栈帧','逃逸分析可以不给每个 new 留堆块'],
    refs:[['JVMS 2.5 Run-Time Data Areas','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5'],['HotSpot 性能增强（逃逸分析）','https://docs.oracle.com/en/java/javase/21/vm/java-hotspot-virtual-machine-performance-enhancements.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-vector-cme-not-because-sync',
    title:'Vector 方法同步，并不能解释迭代器的 ConcurrentModificationException',
    prompt:'为什么把 Vector 的 fail-fast 说成“因为它是同步的，别的线程一改就会抛异常”？',
    core:'Vector 的公开方法大多加了 `synchronized`，同一把实例锁。迭代器仍是 fail-fast：靠 `modCount`，结构被改过（含本线程在迭代外 `add`/`remove`）就可能抛 `ConcurrentModificationException`。ArrayList 不同步，迭代器一样 fail-fast。同步不能当互斥遍历协议，见 `java-enumeration-not-faster`。并发结构修改用并发集合，CHM 迭代器还是弱一致，见 `chm-iterator-weakly-consistent`。',
    why:'以为换成 Vector 迭代就线程安全，生产里仍 CME，还会在单线程里被自己的 add 打脸。',
    example:'单线程对 Vector 做 for-each，循环里 `list.add(x)` 同样可以 CME。Hashtable 的 Enumeration 反而不走这套 fail-fast。',
    task:'写出 CME 看的是结构修改计数，不是“类声明了同步”。',
    answer:'Vector 同步的是方法。迭代器 fail-fast 和 ArrayList 同一类机制。要并发遍历换并发集合。',
    keywords:'Vector fail-fast ConcurrentModificationException synchronized ArrayList',
    points:['Vector 的 synchronized 管方法，不管迭代协议','fail-fast 看 modCount，单线程乱改也会 CME','并发遍历不要指望 Vector'],
    refs:[['Vector','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Vector.html'],['ConcurrentModificationException','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ConcurrentModificationException.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-stack-prefer-deque',
    title:'栈和队列请用 Deque，不要新写 java.util.Stack',
    prompt:'为什么一提到栈就 `new Stack()`，还觉得它继承 Vector 是优点？',
    core:'`Stack` 继承 `Vector`，五个方法凑 LIFO，锁粒度和容量都跟着动态数组走。文档写明更完整、一致的 LIFO 在 `Deque`，实现优先 `ArrayDeque`。队列同样不要默认 `LinkedList` 当唯一答案，两端操作用 `Deque`。`Stack` 仍存在是兼容，不是新代码首选。并发场景另看阻塞队列，见 `java-linked-blocking-unbounded`。',
    why:'用 Stack 当栈，会把 Vector 的同步和扩容成本带进单线程热路径。',
    example:'`Deque<Integer> stack = new ArrayDeque<>(); stack.push(1); stack.pop();` 即可。不要 `new Stack()` 只为了名字里有 Stack。',
    task:'划掉“栈结构=Stack 类”；写出应用该用哪个接口。',
    answer:'新代码用 Deque/ArrayDeque。Stack 是遗留 Vector 子类。',
    keywords:'Stack Vector Deque ArrayDeque LIFO',
    points:['Stack 继承 Vector，是遗留 API','文档推荐 Deque 做 LIFO','单线程栈用 ArrayDeque，不要图名字'],
    refs:[['Stack','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Stack.html'],['ArrayDeque','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-not-every-class-clone-serializable',
    title:'不是每个类都要 equals、clone 和 Serializable',
    prompt:'为什么把“经典形式”背成每个类都要实现 equals、hashCode、toString、Cloneable、Serializable？',
    core:'`equals`/`hashCode` 只在该类会按值比较或当 Map 键时才成对覆盖，见 `java-equals-contract`。`toString` 便于排障，不是契约。`Cloneable` 是弱类型标记，`clone` 默认浅拷贝、易碎，新代码更常用拷贝构造或工厂。`Serializable` 是长期二进制契约，默认机制脆弱，不要给每个 DTO 盖章。清理资源用 try-with-resources，不要靠 `finalize` 和已删除的 `runFinalizersOnExit`。',
    why:'每个实体都 Cloneable 加 Serializable，拷贝时改到共享可变字段，序列化一升级就坏。',
    example:'不可变的值对象可以写 equals。Servlet、Spring Bean、一次性请求体不要 `implements Cloneable, Serializable`。',
    task:'划掉“每个类五件套”；写出什么时候才覆盖 equals，什么时候不要序列化。',
    answer:'按需 equals。不要默认 Cloneable。Serializable 是承诺，不是装饰。finalize 不是析构。',
    keywords:'equals Cloneable Serializable finalize Effective Java',
    points:['equals 与 hashCode 只在按值比较时成对覆盖','Cloneable 不是新代码的拷贝方案','Serializable 是契约，不是每个类的标配'],
    refs:[['Cloneable','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Cloneable.html'],['Serializable','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Serializable.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_37) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
