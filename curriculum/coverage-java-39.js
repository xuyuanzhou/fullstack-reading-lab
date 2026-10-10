/* Batch 39: 默认方法不是类多继承, Set 不必有序, CMS 已移除, Class.newInstance 已弃用. */
const COVERAGE_JAVA_39 = [
  {
    track:'java', group:'Java 基础', id:'java-default-class-wins-conflict',
    title:'默认方法不是 C++ 那种类多继承，冲突时类方法优先（JDK 8）',
    prompt:'为什么把 Java 8 默认方法背成“终于有多继承了，两个接口同名方法随便用”？',
    promptAnswer:'仍是单继承类。两个接口同名默认方法要自己覆盖；类里的方法压过接口默认方法。',
    core:'类仍然只能 extends 一个类。默认方法（Default Methods）是接口上带方法体的方法。两个接口给出同一签名的默认方法时，实现类必须自己覆盖，否则就是无关的默认方法，编不过。继承与覆盖（JLS 9.4.1）规定：父类已有同名实例方法时用父类的，不用接口默认方法。更具体的子接口覆盖祖先接口。接口没有实例字段，这不是把两个类的字段继承到一起。默认方法本身见 `java-interface-contract`。',
    example:'`class C extends Super implements A` 且 Super 和 A 都有 `say()`，调用的是 Super。`interface C extends A,B` 两边都有默认 `say()` 则必须在 C 里覆盖，可写 `A.super.say()`。',
    task:'划掉“Java 8=类多继承”；写出同名默认方法冲突时谁赢。',
    answer:'仍是单继承类。默认方法冲突要自己覆盖。类里的方法压过接口默认方法。',
    keywords:'default method diamond class wins JLS 9.4.1',
    points:['类仍然只能继承一个类','无关的默认方法冲突必须自己覆盖','父类实例方法优先于接口默认方法'],
    refs:[['Java Tutorial：Default Methods','https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html'],['JLS 9.4.1 Inheritance and Overriding','https://docs.oracle.com/javase/specs/jls/se21/html/jls-9.html#jls-9.4.1']]
  },
  {
    track:'java', group:'Java 基础', id:'java-set-not-always-sorted',
    title:'Set 不必有序，Map 也不必无序',
    prompt:'为什么把 Set 背成“内部会排序”，把 Map 背成“数据没有顺序”？',
    promptAnswer:'Hash 系列不保证顺序。要插入序用 Linked，要排序用 Tree；不是 Set 都排序、Map 都无序。',
    core:'HashSet 和 HashMap 不保证迭代顺序，扩容之后顺序还可能变。要记住插入顺序，用 LinkedHashSet 或 LinkedHashMap，它们在哈希表外再串一条链表。要按比较器排序，用 TreeSet 或 TreeMap。Set 去重靠 equals 和 hashCode，有序集靠 compareTo，不是内部排好再给你。',
    example:'两次打印同一个 `HashSet` 的迭代顺序可以不同。`new TreeSet<String>()` 才会按字典序。`LinkedHashMap` 默认记住插入序。',
    task:'划掉“Set 内部排序、Map 都无序”；按需求选出 Hash/Linked/Tree。',
    answer:'Hash 系列不保证顺序。要稳定插入序用 Linked。要排序用 Tree。不要用 Vector 解决并发。',
    keywords:'HashSet TreeSet LinkedHashMap iteration order',
    points:['HashSet/HashMap 不保证迭代顺序','要排序用 Tree，要插入序用 Linked','Set 去重靠 equals/hashCode，不是先排序'],
    refs:[['HashSet','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashSet.html'],['LinkedHashMap','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/LinkedHashMap.html']]
  },
  {
    track:'java', group:'JVM', id:'jvm-cms-removed-g1-default',
    title:'CMS 已经删掉，服务器默认不是它',
    prompt:'为什么还按 CMS 调 `-XX:+UseConcMarkSweepGC` 和 PermSize，当现行低延迟方案？',
    promptAnswer:'服务器默认已是 G1；CMS 已删除。PermSize 也没了，先测暂停再考虑换收集器。',
    core:'JDK 9 起服务器默认 G1，见 `jvm-gc-choice`。CMS 在 JDK 14 移除，再写 `UseConcMarkSweepGC` 会失败。永久代也早换成元空间，见 `jvm-no-permgen-hotspot`。LinkedIn 那篇 2014 文用 Java 7、40G 堆和 CMS，是当时实验，不是 JDK 21 清单。要更短停顿再评估 ZGC/Shenandoah，先确认延迟真是 GC 造成的。',
    why:'把 1.4/Java7 调优单贴到 JDK 17 上，启动直接不认 CMS 和 PermSize。',
    example:'`java -XX:+UseConcMarkSweepGC` 在 JDK 21 不是可选项。`java -XX:+UseG1GC` 在服务器模式通常已是默认。',
    task:'划掉“现行默认 CMS”；写出 JDK 9+ 服务器默认，以及 CMS 哪一版去掉。',
    answer:'默认 G1。CMS 已删除。PermSize 已无。先测暂停再换 ZGC。',
    keywords:'CMS G1 JEP 363 PermGen HotSpot',
    diagram:'diagrams/jvm-cms-gone.svg',
    points:['JDK 9+ 服务器默认 G1','CMS 在 JDK 14 移除','不要把 Java 7 CMS/PermSize 清单当现行参数'],
    refs:[['JEP 363：Remove CMS','https://openjdk.org/jeps/363'],['JEP 248：G1 as Default','https://openjdk.org/jeps/248']]
  },
  {
    track:'java', group:'Java 基础', id:'java-class-newinstance-deprecated',
    title:'不要再用 Class.newInstance，它只能调无参且已弃用',
    prompt:'为什么反射创建对象还写 `clazz.newInstance()`，并当成“随便实例化、不必知道类名”？',
    promptAnswer:'Class.newInstance 已弃用且只走无参。用 Constructor.newInstance；forName 仍需要类名。',
    core:'Class.newInstance() 只能调用公共无参构造，还会把构造器抛出的受检异常再包一层，从 Java 9 起已弃用。要反射创建对象，先 getDeclaredConstructor(参数类型) 拿到 Constructor，再调用它的 newInstance(实参)。没有无参构造时，旧方法直接失败，它绕不过构造器。框架要无参构造是另一件事，见 `java-ctor-implicit-super-noarg`。',
    example:'`String.class.getConstructor(byte[].class, String.class).newInstance(bytes, "UTF-8")`。不要 `String.class.newInstance()`。',
    task:'划掉 Class.newInstance；写出带参构造的反射调用顺序。',
    answer:'forName 仍要类名。用 Constructor.newInstance。Class.newInstance 已弃用且只走无参。',
    keywords:'Class.newInstance Constructor reflection deprecated',
    points:['反射仍需要类的名字或 Class 对象','Class.newInstance 已弃用，只调用公共无参构造','带参用 getDeclaredConstructor().newInstance'],
    refs:[['Class.newInstance','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Class.html#newInstance()'],['Constructor.newInstance','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/reflect/Constructor.html#newInstance(java.lang.Object...)']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_39) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
