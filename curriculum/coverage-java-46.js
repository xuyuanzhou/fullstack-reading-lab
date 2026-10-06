/* java.png + 8张图异常树：Cloneable 检查异常、Builder 不是 Buffer、switch 箭头不贯穿。 */
const COVERAGE_JAVA_46 = [
  {
    track:'java', group:'Java 基础', id:'java-clone-exception-checked',
    title:'CloneNotSupportedException 是检查异常，Cloneable 不会公开 clone',
    prompt:'为什么图画了 Cloneable，有人就以为每个对象都有公开 clone，失败时还当成运行时异常？',
    core:'`Cloneable` 是空标记，文档写明它不包含 `clone` 方法。`Object.clone` 是 **protected**，默认浅拷贝；子类要拷贝，得自己公开并调用 `super.clone()`。未实现标记时，这次调用抛 `CloneNotSupportedException`。该类 **extends Exception**，是检查异常，编译器要求处理或声明，不要把它画进 `RuntimeException` 那一列。NPE、`ClassCastException` 才在运行时异常树下。新代码更常用拷贝构造或工厂，见 `java-not-every-class-clone-serializable`。',
    why:'implements Cloneable 之后直接 `obj.clone()`，编译不过还以为接口坏了。把 CloneNotSupportedException 当 RuntimeException，漏写 throws 才发现它是检查异常。',
    example:'`class Tag implements Cloneable {}` 在包外仍不能 `new Tag().clone()`，因为可见性还在 Object 上。覆盖 `public Tag clone()` 时方法签名要处理检查异常，或改成不抛。',
    task:'划掉“实现 Cloneable 就有公开 clone”。写出 clone 的可见性，以及 CloneNotSupportedException 挂在 Exception 还是 RuntimeException 下。',
    answer:'Cloneable 没有方法。Object.clone 是 protected。CloneNotSupportedException 是检查异常，挂在 Exception 下。需要拷贝时自己公开并处理这个异常，或改用拷贝构造。',
    keywords:'Cloneable clone CloneNotSupportedException checked Exception',
    origin:'本地库 Java 基础导图的标识接口枝，以及「8张图解java」异常树把 CloneNotSupportedException 画在 Exception 下',
    diagram:'diagrams/java-clone-checked.svg',
    points:['Cloneable 是空标记，不含 clone 方法','Object.clone 是 protected，默认浅拷贝','CloneNotSupportedException 是检查异常，不是 RuntimeException'],
    deep:[
      {title:'和 Serializable 一样不要当装饰',body:'两个都是标记。盖上 Cloneable 不会改变字段怎么复制。共享可变字段被浅拷贝后，两边改的是同一块。需要深拷贝就显式复制，不要指望标记替你做。'},
      {title:'怎样自己验证',body:'打开 CloneNotSupportedException 的 JavaDoc，父类应是 Exception。写一个只 implements Cloneable 的类，在另一个包调用 clone，应看不见这个方法。对照异常树：它和 IOException 一类，不和 NPE 一类。'}
    ],
    refs:[['Cloneable','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Cloneable.html'],['CloneNotSupportedException','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/CloneNotSupportedException.html'],['Object.clone','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#clone()']]
  },
  {
    track:'java', group:'Java 基础', id:'java-stringbuilder-not-buffer',
    title:'同一线程拼字符串用 StringBuilder，不要默认换 StringBuffer',
    prompt:'为什么导图写“多线程就用 StringBuffer”，局部循环拼接也跟着换？',
    core:'`String` 不可变，见 `java-string-immutability`。同一线程里反复改缓冲区，用 `StringBuilder`。编译器把相邻字面量和 `+` 也收成 Builder。`StringBuffer` 的公开修改方法带 `synchronized`，只保证**这一次方法调用**互斥，并不给出跨线程谁先写、何时可见的协议。多个线程共享一块可变缓冲，仍要另定所有权或改成不可变 `String` 传递。不要把“出现过线程”写成默认 Buffer。',
    why:'循环里 `new StringBuffer()` 只为口诀，单线程热路径白加锁。共享 Buffer 却只靠方法同步，拼接顺序和对端读到半截字符的问题还在。',
    example:'方法内 `StringBuilder out = new StringBuilder(); for (var part : parts) out.append(part); return out.toString();` 不要换成 Buffer。两个线程往同一块 Buffer append，同步挡不住交错字符。',
    task:'划掉“有线程就用 StringBuffer”。分别写出局部拼接和跨线程共享各自该用什么。',
    answer:'局部拼接用 StringBuilder，最后得到 String。跨线程不要共享可变缓冲当协议；要共享就先定谁写完、用不可变结果传递。StringBuffer 的 synchronized 只锁单次调用。',
    keywords:'StringBuilder StringBuffer String synchronized',
    origin:'本地库 Java 基础导图把 StringBuffer 标成多线程默认',
    diagram:'diagrams/java-stringbuilder-buffer.svg',
    points:['同一线程改缓冲区用 StringBuilder','StringBuffer 的同步只覆盖单次方法调用','跨线程先定所有权，不要把 Buffer 当协议'],
    deep:[
      {title:'不可变结果仍然是 String',body:'Builder 和 Buffer 都是拼完再 `toString`。池和字面量那一套只作用于 String，见 `java-string-new-vs-pool`。不要为了进池先 new StringBuffer。'},
      {title:'怎样自己验证',body:'打开两个类的 JavaDoc：Builder 写明非同步，Buffer 写明线程安全指方法同步。把局部循环从 Buffer 改成 Builder，行为应相同。两个线程共享一块 Buffer 时，观察交错 append，说明还缺协议。'}
    ],
    refs:[['StringBuilder','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuilder.html'],['StringBuffer','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuffer.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-switch-arrow-no-fall',
    title:'冒号分支会贯穿，箭头分支不会',
    prompt:'为什么笔试题还在问没写 break 会打印哪几行，有人就把所有 switch 都背成必须 break？',
    core:'传统 `switch` 语句里，`case 1:` 匹配之后**没有 `break`（或 `return`）会落到下一支**，`default` 也会被贯穿进来。这是笔试题常见陷阱。Java 14 起的 **switch 表达式**用 `case 1 ->` 或 `yield`：匹配的那一支结束就离开，**不会贯穿**。多个标签写成 `case 1, 2 ->`。表达式必须穷尽，漏掉枚举常量编不过。不要把两种语法合成一句“switch 都要 break”。',
    why:'把箭头语法也塞上 break，或者在冒号语法里省掉 break，输出会连到下一支，题目里的 default 也会执行。',
    example:'`switch (n) { case 1: System.out.print("a"); case 2: System.out.print("b"); }` 在 n 为 1 时打印 ab。`switch (n) { case 1 -> "a"; case 2 -> "b"; default -> "z"; }` 在 n 为 1 时只得到 "a"。',
    task:'同一组输入分别用冒号语句和箭头表达式写出输出。划掉“所有 switch 都必须写 break”。',
    answer:'冒号分支没有 break 会贯穿。箭头分支只跑匹配的那一支。新代码优先箭头或显式 yield。笔试题若给的是 case 1: 仍按贯穿算。',
    keywords:'switch fall through break switch expression yield',
    origin:'本地库笔试题照片里的 switch 贯穿题，对照现行 switch 表达式',
    diagram:'diagrams/java-switch-arrow.svg',
    points:['case 标签用冒号时，没有 break 会贯穿','箭头分支匹配结束就离开，不会落到下一支','switch 表达式必须穷尽，漏枚举编不过'],
    deep:[
      {title:'穷尽不是装饰',body:'对枚举做表达式时，每个常量都要有支，或写 default。加新枚举常量时，漏支会在编译期暴露。语句版的 switch 没有这层保护，漏掉只是走进 default 或什么都不做。'},
      {title:'怎样自己验证',body:'写一个 n=1 的冒号 switch，中间那支不写 break，确认打印了后面的分支。同一输入改成箭头表达式，确认只得到这一支。再拿一个枚举，删掉其中一支，确认表达式编不过。'}
    ],
    refs:[['JLS：switch','https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.11'],['Java 语言：switch 表达式','https://docs.oracle.com/en/java/javase/21/language/switch-expressions.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_46) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
