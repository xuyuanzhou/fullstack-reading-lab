/* Java 119: Java 基础 / JVM / 并发 是什么。定义课，不单开为什么。 */
const COVERAGE_JAVA_119 = [
  {
    track:'java', group:'Java 基础', id:'java-what-it-is',
    title:'Java 是一门语言，也是一套能跑字节码的平台',
    prompt:'写好的 .java 文件，最后是在哪一层上跑起来的？',
    promptAnswer:'先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。',
    core:'Java 是一门编程语言，也是一套平台。源文件是 .java。编译器 javac 把它变成 .class 里的字节码（bytecode）。Java 虚拟机（JVM）加载这些字节码并执行。语言规范里的基本类型见 `java-eight-primitives`。虚拟机自己的结构见 `jvm-what-it-is`。',
    example:'最小的入口：\n\n```java\nclass Pay {\n  public static void main(String[] args) {\n    System.out.println("ok");\n  }\n}\n```',
    task:'用文档里的说法说明 Java 是什么。源文件、字节码、虚拟机各是哪一步？',
    answer:'Java 是一门语言，也是一套能跑字节码的平台。源文件是 .java，编译成 .class 字节码，由 JVM 执行。',
    keywords:'Java language platform bytecode JVM',
    points:['Java 既是语言也是平台','javac 把源文件编成字节码','JVM 执行这些字节码'],
    deep:[
      {title:'类库也是平台的一部分',body:'String、List、线程这些类型来自标准类库，不是语言正文里的基本类型。集合见 `java-list-set-map`。'},
      {title:'怎样自己验证',body:'打开 JLS 的 Introduction，对上 language 和 platform。把上面的类存成 Pay.java，运行 javac Pay.java 再 java Pay，确认先有 .class 再有输出。'},
    ],
    refs:[['JLS：Introduction','https://docs.oracle.com/javase/specs/jls/se21/html/jls-1.html'],['Java 教程：Getting Started','https://docs.oracle.com/javase/tutorial/getStarted/index.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-enter-main',
    title:'java 命令从 main 启动一个进程',
    prompt:'要把一个类跑起来，命令行里写什么？从哪一个方法开始？',
    promptAnswer:'先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。',
    core:'javac 读入 .java，写出 .class。java 命令启动一个 JVM 进程，加载你给出的类，调用它的 main。main 的签名必须是 public static void main(String[])。启动失败常见于类名和文件名不一致，或 main 写错，见 `java-main-launcher`。包和访问见 `java-package-access`。',
    example:'编译并运行：\n\n```bash\njavac Pay.java\njava Pay\n```',
    task:'写出编译和运行的两条命令。虚拟机从哪一个方法开始？这个方法要满足哪三个修饰？',
    answer:'javac Pay.java 然后 java Pay。从 main 开始。它必须是 public、static、返回 void，参数是 String[]。',
    keywords:'javac java main JVM process',
    points:['javac 编译，java 启动虚拟机','入口是 main','main 必须是 public static void'],
    deep:[
      {title:'一个进程里可以有许多线程',body:'main 所在的线程是第一条用户线程。随后 new Thread 或线程池会再启动别的线程，见 `java-thread-start-run`。'},
      {title:'怎样自己验证',body:'把 main 改成小写或拿掉 static，再 java Pay，确认启动失败。改回正确签名后看到 ok。'},
    ],
    refs:[['JLS：Program Execution','https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html'],['Java 教程：A Closer Look at the Hello World Application','https://docs.oracle.com/javase/tutorial/getStarted/application/index.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-not-javascript',
    title:'Java 不是 JavaScript，旁边是 JVM 和类库',
    prompt:'名字里都有 Java，这两门语言是不是在同一个虚拟机里跑？',
    promptAnswer:'不是。Java 编译成字节码，在 JVM 里跑。JavaScript 在浏览器引擎或 Node.js 里跑。',
    core:'Java 和 JavaScript 是两门语言。Java 的基本类型、类和空引用见后面的类型课。JavaScript 的值见 `js-what-it-is`。这一章学语言和类库。字节码怎么被虚拟机管，去 JVM 章。多线程怎么启动，去并发章。',
    example:'两边各自的入口：\n\n```java\npublic static void main(String[] args) {}\n```\n\n```javascript\n// 浏览器或 Node.js\nconsole.log("ok");\n```',
    task:'说明 Java 和 JavaScript 是不是同一门语言。Java 的字节码在哪一层跑？',
    answer:'不是同一门语言。Java 的字节码在 JVM 里跑。JavaScript 在浏览器引擎或 Node.js 里跑。',
    keywords:'Java JavaScript JVM class library',
    points:['Java 和 JavaScript 不是同一门语言','字节码在 JVM 里跑','类库和并发是旁边的章'],
    deep:[
      {title:'类型在运行时还在',body:'Java 的基本类型和类在虚拟机里还在。TypeScript 的类型编译后消失，见 `ts-not-runtime-check`。不要用另一门语言的擦除来理解 Java。'},
      {title:'怎样自己验证',body:'对同一段「打印 ok」分别写 Java 和 JavaScript。Java 必须先有 class 和 main，并且先 javac。JavaScript 没有这一步。'},
    ],
    refs:[['JLS：Introduction','https://docs.oracle.com/javase/specs/jls/se21/html/jls-1.html'],['JVMS：Introduction','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-1.html']]
  },
  {
    track:'java', group:'JVM', id:'jvm-what-it-is',
    title:'JVM 是执行 Java 字节码的虚拟机',
    prompt:'已经编好的 .class，是操作系统直接执行，还是先交给另一层？',
    promptAnswer:'先交给 Java 虚拟机。JVM 加载字节码，管理内存，再在这条操作系统进程里执行。',
    core:'Java 虚拟机（Java Virtual Machine，JVM）是执行字节码的规范，也是具体实现，常见的是 HotSpot。它加载 .class，校验字节码，在堆和方法区里放对象和类元数据，再执行方法。运行时数据区见 `jvm-areas`。类怎么装进来见 `java-classloading`。',
    example:'一条命令启动虚拟机：\n\n```bash\njava -version\njava Pay\n```',
    task:'用文档里的说法说明 JVM 是什么。它执行的是源文件还是字节码？常见实现叫什么？',
    answer:'JVM 是执行 Java 字节码的虚拟机。它执行的是字节码，不是 .java。常见实现是 HotSpot。',
    keywords:'JVM bytecode HotSpot class file',
    points:['JVM 执行字节码，不是源文件','它是规范，也有 HotSpot 这类实现','加载类、管理内存、执行方法'],
    deep:[
      {title:'其它语言也可以编译到字节码',body:'Kotlin、Scala 也可以出 .class。这一章按 Java 平台和 JVMS 讲。语言语法仍回 Java 基础。'},
      {title:'怎样自己验证',body:'打开 JVMS 的 Introduction，对上 virtual machine 和 class file。运行 javap -c Pay，确认看到的是字节码，不是操作系统的机器指令。'},
    ],
    refs:[['JVMS：Introduction','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-1.html'],['HotSpot：Virtual Machine','https://openjdk.org/groups/hotspot/']]
  },
  {
    track:'java', group:'JVM', id:'jvm-enter-class',
    title:'类加载器把 .class 装进正在跑的虚拟机',
    prompt:'java Pay 的时候，Pay.class 怎样变成虚拟机里可以调用的类？',
    promptAnswer:'类加载器按名字找到字节码，加载、链接，再初始化。main 所在的类先被装进来。',
    core:'虚拟机启动后，类加载器（class loader）按全名找 .class。加载读入字节，链接做校验和解析，初始化跑静态初始化。应用类由平台类加载器和系统类加载器分工，见 `java-classloading`、`jvm-platform-classloader-not-ext`。方法区在 HotSpot 里是元空间，见 `jvm-method-area-metaspace`。',
    example:'看一个类的字节码：\n\n```bash\njavap -c -p Pay\n```',
    task:'说明类进入虚拟机要经过哪三步。main 所在的类什么时候被装进来？',
    answer:'经过加载、链接、初始化。java 命令启动时先装 main 所在的类。',
    keywords:'class loader loading linking initialization',
    points:['类加载器按名字找到字节码','步骤是加载、链接、初始化','启动时先装 main 所在的类'],
    deep:[
      {title:'同一全名在同一加载器里只装一次',body:'两个加载器可以各装一份同名类。日常应用里先认清是哪一个加载器找不到文件，再谈热加载。'},
      {title:'怎样自己验证',body:'把 Pay.class 挪出 classpath 再 java Pay，确认是类加载失败。用 javap 打开存在的 .class，对照方法字节码。'},
    ],
    refs:[['JVMS：Loading, Linking, and Initializing','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-5.html'],['JLS：Execution','https://docs.oracle.com/javase/specs/jls/se21/html/jls-12.html']]
  },
  {
    track:'java', group:'JVM', id:'jvm-not-the-language',
    title:'JVM 不管业务语法，只管字节码和内存',
    prompt:'if 和泛型这些语法问题，是不是该在 JVM 章里查？',
    promptAnswer:'不是。语法在 Java 语言里。JVM 章管运行时数据区、垃圾收集和诊断。',
    core:'语言里的基本类型、类和异常回 Java 基础。JVM 章回答字节码跑起来之后：堆和栈在哪，垃圾收集选哪一种，OOM 和转储怎么看。运行时数据区见 `jvm-areas`。收集器见 `jvm-gc-choice`。JMM 是内存模型，不是运行时数据区的别名，见 `jvm-jmm-not-runtime-areas`。',
    example:'两章各管一句：\n\n```text\nJava 基础   5 / 2 为什么是 2\nJVM        这个 int 在栈帧还是堆上\n```',
    task:'说明 JVM 章不回答哪一类问题。堆、垃圾收集、转储各属于哪一章？',
    answer:'不回答 if、泛型和基本类型这些语法。堆、垃圾收集和转储属于 JVM 章。',
    keywords:'JVM JLS language GC heap',
    points:['语法回 Java 基础','JVM 管字节码、内存和收集器','JMM 不是运行时数据区的别名'],
    deep:[
      {title:'容器内存不是 -Xmx 的别名',body:'进程能用的内存还受容器限制，见 `jvm-xmx-not-container-limit`。调堆之前先认清哪一层在限制。'},
      {title:'怎样自己验证',body:'用 jcmd 或 jtool 看正在跑的进程的 GC 名字和堆大小。这些数字不会出现在 JLS 的类型章节里。'},
    ],
    refs:[['JVMS：Run-Time Data Areas','https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-2.html#jvms-2.5'],['HotSpot：Garbage Collection','https://docs.oracle.com/en/java/javase/21/gctuning/']]
  },
  {
    track:'java', group:'并发', id:'java-concurrency-what',
    title:'Java 并发是同一进程里多条线程一起执行',
    prompt:'main 已经在跑，再要同时做下载和计算，用的是哪一套能力？',
    promptAnswer:'用线程。Java 并发指同一进程里多条线程一起执行，以及 java.util.concurrent 里的工具。',
    core:'并发（concurrency）在 Java 里首先是线程（thread）：同一进程里多条控制流。Thread.start 才真正启动一条线程，见 `java-thread-start-run`。共享变量怎样看见对方的写入，见 `java-happens-before`。线程池见 `java-executor`。这不是多台机器上的分布式协作，那一章见 `dist-chapter-aim`。',
    example:'启动第二条线程：\n\n```java\nThread t = new Thread(() -> System.out.println("work"));\nt.start();\n```',
    task:'说明 Java 并发首先指什么。start 和直接调用 run 有什么差别？这是不是多台机器？',
    answer:'首先指同一进程里的多条线程。start 才启动新线程，直接调用 run 仍在当前线程。这不是多台机器。',
    keywords:'Java concurrency thread Executor',
    points:['并发首先是同一进程里的多条线程','start 才启动新线程','分布式协作是另一章'],
    deep:[
      {title:'工具在 java.util.concurrent',body:'锁、队列、线程池和并发容器在这个包里。synchronized 是语言关键字。先认线程，再认这些工具。'},
      {title:'怎样自己验证',body:'打印 Thread.currentThread().getName()。在 run 里直接调用和 start 各做一次，确认只有 start 出现新的线程名。'},
    ],
    refs:[['JLS：Threads and Locks','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html'],['Java 教程：Concurrency','https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html']]
  },
  {
    track:'java', group:'并发', id:'java-thread-enter',
    title:'新线程从 start 开始，任务也可以交给执行器',
    prompt:'有一份要在后台跑的任务，怎样让它不占用 main 这条线程？',
    promptAnswer:'new Thread(任务).start()，或交给 ExecutorService。直接调用 run 不会换线程。',
    core:'Thread 对象造出来还没有第二条线程。调用 start 之后，虚拟机才创建操作系统线程去执行 run。许多任务应交给执行器（ExecutorService），由线程池复用线程，见 `java-executor`。结果和异常用 Future 接，见 `java-future-errors`。虚拟线程见 `java-virtual-threads`。',
    example:'交给线程池：\n\n```java\ntry (var exec = Executors.newVirtualThreadPerTaskExecutor()) {\n  exec.submit(() -> System.out.println("work"));\n}\n```',
    task:'说明什么时候才出现第二条线程。许多任务为什么更适合交给执行器？',
    answer:'调用 start 之后才出现第二条线程。许多任务交给执行器，由池复用线程，并用 Future 接结果。',
    keywords:'Thread.start ExecutorService Future',
    points:['start 之后才有新线程','任务常交给执行器','结果用 Future 接'],
    deep:[
      {title:'打断不是立刻停',body:'interrupt 只设标志。sleep 或阻塞点会响应。自己写的循环要查 isInterrupted，见 `java-interrupt`。'},
      {title:'怎样自己验证',body:'分别调用 run 和 start，打印线程名。再用 Executors.newFixedThreadPool(1) 提交两个任务，确认复用同一条池线程。'},
    ],
    refs:[['Java：Thread.start','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html#start()'],['Java：ExecutorService','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ExecutorService.html']]
  },
  {
    track:'java', group:'并发', id:'java-concurrency-not-distributed',
    title:'线程共享同一进程的内存，不是另一台机器',
    prompt:'两个服务各跑在自己的进程里，用 Thread 能不能让它们看见同一块内存？',
    promptAnswer:'不能。线程只共享同一进程的内存。跨进程要靠网络、数据库或消息，那是分布式章。',
    core:'同一 JVM 进程里的线程共享堆。happens-before 决定什么时候能看见对方的写入，见 `java-happens-before`。另一个进程、另一台机器没有这块堆。跨服务的一致性和锁见分布式章。数据库事务见 `mysql-isolation`。',
    example:'分界：\n\n```text\n同一进程   synchronized / j.u.c\n两个进程   网络、数据库、消息\n```',
    task:'说明线程共享的是什么。两个进程要不要用 Thread 来同步？跨服务去哪一章？',
    answer:'线程共享同一进程的堆。两个进程不能靠 Thread 看见同一块内存。跨服务去分布式章。',
    keywords:'thread heap process distributed',
    points:['线程共享同一进程的堆','另一进程没有这块内存','跨服务是分布式，不是线程课'],
    deep:[
      {title:'ThreadLocal 也出不了进程',body:'ThreadLocal 只绑在当前线程上，见 `java-thread-local-leak`。不能把它当成分布式上下文，见 `threadlocal-not-distributed-context`。'},
      {title:'怎样自己验证',body:'启动两个 java 进程，各打印 System.identityHashCode(一个静态对象)。两边的数字对不上，因为堆不共享。'},
    ],
    refs:[['JLS：Threads and Locks','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html'],['Java 教程：Memory Consistency','https://docs.oracle.com/javase/tutorial/essential/concurrency/memconsist.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_119) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
