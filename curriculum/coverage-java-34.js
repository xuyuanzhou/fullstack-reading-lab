/* Batch 34: RuntimeException 不会被 JVM 吞掉, Major≠Full, List 用 quicklist/listpack, Pattern 点不吃换行. */
const COVERAGE_JAVA_34 = [
  {
    track:'java', group:'Java 基础', id:'java-runtime-ex-not-auto-caught',
    title:'RuntimeException 会抛，JVM 不会替你 catch',
    prompt:'为什么把运行时异常背成“虚拟机会自动抛出并自动捕获，就算没写 catch 也会处理掉”？',
    core:'未检查异常编译器不强制 catch，见 `java-unchecked-not-must-catch`。运行时若真抛出且一路没有 catch，线程会走到未捕获异常处理器，默认打印堆栈，该线程结束，**不是**被虚拟机默默吃掉。Error 同样不会变成“应用不该处理所以已经处理了”。空指针、除零、类转换失败要改逻辑，不要指望 JVM 当 catch 块。',
    why:'按“自动捕获”去省略边界检查，线上线程静默死掉还以为异常已经消化。',
    example:'主线程 `1/0` 没有 try，进程带着 ArithmeticException 退出。线程池任务抛 NPE，该任务失败，池还在，默认会打堆栈。',
    task:'划掉“RuntimeException 会被 JVM 自动捕获”；写出没有 catch 时线程会怎样。',
    answer:'没有 catch 时异常沿栈往上走，线程按未捕获处理器结束。JVM 不会当 catch 用。',
    keywords:'RuntimeException uncaught handler Thread',
    points:['未检查异常仍会抛，只是编译器不强制 catch','没有 catch 会打到未捕获处理器，线程结束','不要把“自动抛出”写成“自动捕获”'],
    refs:[['Thread.UncaughtExceptionHandler','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.UncaughtExceptionHandler.html'],['JLS 11 Exceptions','https://docs.oracle.com/javase/specs/jls/se21/html/jls-11.html']]
  },
  {
    track:'java', group:'JVM', id:'jvm-major-gc-not-always-full',
    title:'Major GC 有时只扫老年代，不等于 Full GC',
    prompt:'为什么把 Minor / Major / Full 三个词当成同一次整堆停顿的别名？',
    core:'Minor/Young GC 只收新生代。CMS 可以单独做一次老年代收集，有人把它叫 Major GC，这时并不是整堆。G1 的 Mixed GC 收整个新生代加**部分**老年代。Full GC 才是整堆（再加方法区/Metaspace 侧的元数据回收），停顿通常更重，见 `jvm-full-gc-not-permgen`。晋升年龄默认 15，但 Survivor 里同龄对象太多时可以提前晋升，见 `jvm-tenuring-threshold-15`。',
    why:'把 CMS 的老年代收集当成 Full，会在日志里找错停顿原因。',
    example:'CMS 日志出现 `CMS Initial Mark` 不是 G1 Full。G1 Mixed 也不是 Full。只有 `Full GC` 或 evacuation failure 升级成整堆时才按 Full 处理。',
    task:'写出 Minor、Major/CMS old、Mixed、Full 各自扫哪些代。',
    answer:'Young 只收新生代。Major 有时只是老年代。Mixed 是新生代加部分老年代。Full 才是整堆。',
    keywords:'Minor GC Major GC Mixed GC Full GC CMS G1',
    diagram:'diagrams/jvm-gc-scope.svg',
    points:['Young/Minor 只收新生代','Major 在 CMS 语境可只收老年代','Full 才是整堆，不要和 Major 混名'],
    refs:[['HotSpot GC Tuning：概念','https://docs.oracle.com/en/java/javase/21/gctuning/garbage-collector-implementation.html'],['G1 Mixed GC','https://docs.oracle.com/en/java/javase/21/gctuning/garbage-first-g1-garbage-collector.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-list-quicklist-listpack',
    title:'List 早已不是“双向链表或压缩列表”二选一那么简单',
    prompt:'为什么还按 Redis 3.0 把 List 背成 ziplist 或 linkedlist？',
    core:'3.2 起 List 底层是 **quicklist**（分段的 ziplist 串起来）。7.0 起 ziplist 被 **listpack** 替换，Hash/Zset 小对象也走 listpack。键空间本身是字典，平均查找很快，最坏仍可能冲突、rehash。不要把 3.0 教材的“压缩列表或双向链表”当成现行默认。命令仍在执行线程排队，见 `redis-single-thread`。',
    why:'按 ziplist/linkedlist 去估大 List 的内存和复杂度，会和现在的 quicklist 对不上。',
    example:'`LRANGE` 一个短 List，内部是几段 listpack。超长 List 分段，不是一根双向链表从头走到尾。',
    task:'写出 3.2 的 quicklist 和 7.0 的 listpack；划掉“List=链表或 ziplist”。',
    answer:'3.2 起 List 用 quicklist。7.0 起小结构用 listpack。别再只背 3.0 的两种实现。',
    keywords:'Redis quicklist listpack ziplist List',
    points:['3.2 之后 List 是 quicklist','7.0 用 listpack 替代 ziplist','键空间哈希平均快，不是绝对最坏 O(1)'],
    refs:[['Redis 7 listpack','https://github.com/redis/redis/blob/unstable/src/listpack.h'],['Redis quicklist','https://redis.io/docs/latest/develop/data-types/lists/']]
  },
  {
    track:'java', group:'Java 基础', id:'java-pattern-dot-not-nl',
    title:'Java 正则的点默认不吃换行',
    prompt:'为什么用 `.*` 去匹配跨行 HTML，结果只吃到第一行？',
    core:'`Pattern` 里 `.` 默认匹配除换行符以外的任意字符。要跨行需要 `(?s)` 或 `Pattern.DOTALL`。`^`/`$` 默认是整个输入的两端，`MULTILINE` 才让它们对齐每行。大小写要用 `CASE_INSENSITIVE`，Unicode 另说。JS 的点同样默认不吃换行，见 `js-regex-dot-not-newline`。',
    why:'按“点就是任意字符”去抽正文，换行处切开，校验和爬虫都会漏。',
    example:'`"a\\nb"` 配 `a.*b` 失败。加上 `Pattern.DOTALL` 才成功。',
    task:'写出 `.` 的默认集合；说明 DOTALL 和 MULTILINE 各改什么。',
    answer:'点默认不含换行。DOTALL 让点跨行。MULTILINE 只改 ^ 和 $。',
    keywords:'Java Pattern DOTALL MULTILINE regex',
    points:['. 默认不匹配换行','DOTALL 才让点跨行','MULTILINE 改的是 ^ 和 $，不是点'],
    refs:[['Pattern','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html'],['Pattern.DOTALL','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html#DOTALL']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_34) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
