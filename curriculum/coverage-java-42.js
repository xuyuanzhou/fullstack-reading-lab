/* Computer-composition mind map: cache line vs heap, rewritten. */
const COVERAGE_JAVA_42 = [
  {
    track:'java', group:'工程实践', id:'cpu-cache-line-sharing',
    title:'两个字段各改各的，仍可能抢同一条缓存行',
    prompt:'为什么计数器没有锁、也没有数据竞争，两个线程还是一起变慢？',
    promptAnswer:'没有锁也会因伪共享变慢。单位是缓存行，相邻写会互相失效。',
    core:'CPU 以缓存行为单位搬主存，x86 上常见 64 字节，不是按 Java 字段搬运。同一对象里相邻的 `long a` 和 `long b` 常常落在一行里。线程 A 写 a、线程 B 写 b，逻辑上互不读对方字段，硬件仍要使整行在核之间失效，这叫伪共享。它不是 JLS 里的数据竞争，也不是 `-Xmx` 能消掉的。HotSpot 用 `@jdk.internal.vm.annotation.Contended`（JEP 142）给字段填间隔；自己对齐填充也可以。把「缓存对程序员完全透明」写进组成导图会漏掉这一层。见 `java-long-atomic-on-64bit`、`backend-tune-the-span`。',
    why:'把变慢当成锁或 GC，会去加 synchronized 或加大堆。相邻计数器填开间隔之后，CPU 计数里的一致性失效下降，才说明慢在缓存行。',
    example:'class Counters { volatile long a; volatile long b; } 两个线程分别自增 a 和 b。逻辑没有竞争。把两个 long 分到两个对象或中间插入填充后，同样的自增更快。',
    task:'划掉「没有锁就不会因为缓存变慢」。写出伪共享的单位是缓存行，以及一种隔开字段的办法。',
    answer:'单位是缓存行，不是字段。相邻写仍会使整行失效。隔开用填充或 Contended。这不是数据竞争，也不是把堆调大能修好的。',
    keywords:'false sharing cache line Contended JEP 142 CPU',
    origin:'本地库「计算机组成」导图里把缓存画成对程序员透明',
    diagram:'diagrams/cpu-cache-line.svg',
    points:['缓存按行移动，常见 64 字节，不是按字段','相邻字段的无锁写入仍可能伪共享','间隔或 Contended 隔开行，不要靠加大堆'],
    deep:[
      {title:'和可见性不是一件事',body:'volatile 保证可见性和有序性，不把两个字段拆到不同缓存行。伪共享是性能，不是 JMM 正确性。没有 volatile 的并发写字段仍可能是数据竞争，那是另一课。'},
      {title:'怎样自己验证',body:'写两个相邻 volatile long，两线程各加一个。再用填充或两个独立对象重复。对比同样时间内的次数，而不是看有没有锁。'}
    ],
    refs:[['JEP 142：Contended','https://openjdk.org/jeps/142'],['JVMS：堆','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5.3']]
  },
  {
    track:'java', group:'工程实践', id:'cpu-heap-not-cpu-cache',
    title:'-Xmx 限制的是堆，不是 L3',
    prompt:'为什么组成导图把「缓存」和「内存」画在一起，有人就把 -Xmx 当成 CPU 缓存大小？',
    promptAnswer:'-Xmx 调的是堆在 DRAM 上的大小，不是 CPU 的 L1–L3。两列不能用同一个参数。',
    core:'处理器的 L1、L2、L3 是硬件缓存，容量由 CPU 决定，JVM 参数调不到。Java 堆在主存里，由 `-Xmx` / `-Xms` 限制，规范里叫 heap，见 `jvm-areas`。对象分配在堆上（或逃逸后的标量替换），被反复访问的字段会进缓存行，但「堆有 8G」不等于「L3 有 8G」。把组成课里的存储层次和 JVM 运行时区域画成同一枝，会把 GC 停顿、缓存未命中和堆溢出混成一个旋钮。调堆见 `jvm-oom-signals`；慢在哪一层见 `server-slow-which-resource`。',
    why:'把 Full GC 当成 L3 不够，会把堆越调越大。缓存未命中却去加 -Xmx，停顿更长，命中率也不因此变成硬件缓存变大。',
    example:'-Xmx2g 的进程里，L3 仍是这颗 CPU 的几 MB 到几十 MB。缩小工作集、避免伪共享，才能让热点留在缓存里。堆溢出抛的是 OutOfMemoryError，不是缓存规格错误。',
    task:'画出 L1–L3 与 DRAM/堆两列。写出 -Xmx 作用在哪一列，以及伪共享作用在哪一列。',
    answer:'-Xmx 在 DRAM 上的堆。L1–L3 是硬件。伪共享发生在缓存行。两列不能用同一个参数调。',
    keywords:'CPU cache L3 heap -Xmx memory hierarchy JVM',
    origin:'本地库「计算机组成」导图的存储层次',
    diagram:'diagrams/cpu-dram-heap.svg',
    points:['L1 L2 L3 是硬件缓存，没有 JVM 参数可改容量','-Xmx 限制的是主存里的堆','热点字段进缓存行，不等于堆容量等于缓存容量'],
    deep:[
      {title:'和运行时区域',body:'程序计数器、虚拟机栈、堆、方法区是 JVM 规范里的逻辑区域。L1–L3 是芯片上的存储器。不要把 PC 画成 CPU 寄存器，也不要把方法区画进 L3。'},
      {title:'怎样自己验证',body:'读一遍正在用的 JVM 启动参数，确认只有堆、元空间等运行时上限。CPU 的缓存大小用 lscpu 或系统信息看，两者对不上才说明不是同一旋钮。'}
    ],
    refs:[['JVMS：运行时数据区','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5'],['Java 工具：java 命令','https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_42) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
