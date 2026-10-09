/* Batch 39: 默认方法不是类多继承, Set 不必有序, CMS 已移除, Class.newInstance 已弃用. */
const COVERAGE_JAVA_39 = [
  {
    track:'java', group:'Java 基础', id:'java-default-class-wins-conflict',
    title:'默认方法不是 C++ 那种类多继承，冲突时类方法优先（JDK 8）',
    prompt:'为什么把 Java 8 默认方法背成“终于有多继承了，两个接口同名方法随便用”？',
    core:'类仍然只能 `extends` 一个类。默认方法是接口上的行为，见 `java-interface-contract`。两个接口声明了同一签名的默认方法，实现类或子接口必须自己覆盖，或写成 abstract。父类已有同名实例方法时，用父类的，不用接口默认方法。更具体的子接口覆盖祖先接口。没有字段、没有构造器冲突，这不是 C++ 多继承。',
    why:'按“随便用两个默认实现”去编译，会卡在 unrelated defaults；按类多继承去加字段，接口上也加不上。',
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
    core:'`HashSet`/`HashMap` 不保证迭代顺序，且可能随容量重哈希而变。要插入序用 `LinkedHashSet`/`LinkedHashMap`。要按比较器排序用 `TreeSet`/`TreeMap`。`Set` 去重靠 `equals`/`hashCode`（有序集靠 `compareTo`），不是“内部排好再给你”。多线程不要改用 `Vector`/`Hashtable` 当答案，见 `java-enumeration-not-faster`。',
    why:'对 HashSet 写“第一个就是最小的”，或对 HashMap 假设 entry 顺序稳定，对账和分页会错。',
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
    core:'`Class.forName` 仍然要全限定名。`Class.newInstance` 只能走公共无参构造，把受检异常包成 `InstantiationException`/`IllegalAccessException`，Java 9 起弃用。应 `getDeclaredConstructor(参数类型).newInstance(实参)`，无参也要先拿到 `Constructor`。模块和封装下还可能要 `setAccessible`。实体框架要无参构造，见 `java-ctor-implicit-super-noarg`，那是框架约定，不是反射 API 的推荐写法。',
    why:'类只有带参构造时 `newInstance` 直接失败，还以为反射能绕过构造器。',
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
