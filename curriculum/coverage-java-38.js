/* Batch 38: JDBC 有 DataSource, 隐式 super() 只调无参, foreach 不能 list.remove, 裸类型跳过泛型检查. */
const COVERAGE_JAVA_38 = [
  {
    track:'java', group:'工程实践', id:'jdbc-datasource-not-diy-pool',
    title:'连接池用 DataSource，不要手写 synchronized getConnection',
    prompt:'为什么还说“JDBC 没有连接池，只能自己做缓冲池，方法加 synchronized，超时返回 null”？',
    core:'JDBC 2 起就有 `javax.sql.DataSource` 和 `ConnectionPoolDataSource`。应用向池借连接、用完 `close()` 归还，不要自己维护 `ArrayList` 空闲池。借不到应抛 `SQLException`，不要返回 null 让调用方 NPE。池的等待超时和 SQL 超时不是一回事，见 `hikari-pool-timeout`。整方法 `synchronized getConnection` 把借还串行化，现行池用并发结构和连接校验。密码写进资源文件明文也不是现行做法，见 `secrets-not-in-image`。',
    why:'手写池超时返回 null，业务把空连接拿去 `createStatement`，故障被说成“数据库挂了”。',
    example:'Spring Boot 配 `spring.datasource.hikari.*`，注入 `DataSource`。不要在 Servlet `init` 里 `new DBConnectionManager()` 当单例池。',
    task:'划掉“JDBC API 没有连接池”；写出借不到时应抛什么，而不是返回 null。',
    answer:'用 DataSource。close 是归还。超时抛 SQLException。不要手写 synchronized 空闲列表。',
    keywords:'DataSource ConnectionPool Hikari JDBC SQLException',
    points:['JDBC 提供 DataSource，不是没有池 API','借不到连接应抛 SQLException，不要返回 null','不要用一把锁手写空闲 ArrayList 当池'],
    refs:[['DataSource','https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/javax/sql/DataSource.html'],['HikariCP','https://github.com/brettwooldridge/HikariCP']]
  },
  {
    track:'java', group:'Java 基础', id:'java-ctor-implicit-super-noarg',
    title:'构造器里隐式 super() 只调父类无参，不是“总会找到一个父构造器”',
    prompt:'为什么把“子类构造器无论有参无参都会调用父类无参构造”当成永远成立？',
    core:'子类构造器的第一条若不是 `this(...)` 或 `super(...)`，编译器插入 `super()`。父类一旦写了带参构造且没再写无参，`super()` 就不存在，子类必须显式 `super(args)`。抽象类可以有构造器，接口没有实例构造器。JPA/Hibernate 实体常要无参构造给反射，和“每个业务类都要无参”不是一回事，见 `java-record-accessor`。',
    why:'父类只留 `Super(String)`，子类无参构造编译失败，还以为语言要求父类必须再补一个空构造。',
    example:'`class Child extends Super { Child() { super("x"); } }` 合法。只写 `Child() {}` 而父类没有 `Super()` 则编译错误。',
    task:'写出编译器何时插入 super()；划掉“子类一定会调到某个父构造”。',
    answer:'默认只插无参 super()。父类没有无参时必须显式 super(实参)。接口没有构造器。',
    keywords:'constructor super() JLS 8.8 no-arg',
    points:['未写 this/super 时插入的是无参 super()','父类只有带参构造时子类必须显式调用','接口没有实例构造器，抽象类可以有'],
    refs:[['JLS 8.8.7 Constructor Body','https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.8.7'],['Java Tutorial：Using the Keyword super','https://docs.oracle.com/javase/tutorial/java/IandI/super.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-foreach-remove-cme',
    title:'增强 for 里不能直接 list.remove，要用迭代器',
    prompt:'为什么觉得 foreach 就是迭代器，所以循环里 `list.remove(s)` 和 `iter.remove()` 一样？',
    core:'增强 for 在 `Iterable` 上会拿到迭代器并反复 `next()`。循环体里直接改集合结构，fail-fast 迭代器会抛 `ConcurrentModificationException`，见 `java-vector-cme-not-because-sync`。正确做法是 `Iterator.remove()`，且必须先 `next()`。按下标 `remove(i)` 会让后面元素前移，漏删。`removeIf` 或收集后再删也行。并发结构不要用 `ArrayList` 硬撑。',
    why:'foreach 里删“a”看似成功，多元素或继续迭代就 CME，线上当偶发。',
    example:'`for (String s : list) { if (s.equals("a")) list.remove(s); }` 会 CME。`iter.next(); iter.remove();` 才合法。',
    task:'写出 foreach 底层仍会 next；划掉“增强 for 里可以随便 remove”。',
    answer:'增强 for 不能直接改结构。用 Iterator.remove 或 removeIf。按下标删会错位。',
    keywords:'enhanced for Iterator ConcurrentModificationException removeIf',
    points:['增强 for 使用迭代器，直接 list.remove 会 CME','Iterator.remove 必须先 next','按下标循环 remove 会因前移漏元素'],
    refs:[['JLS 14.14.2 The enhanced for statement','https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.14.2'],['Iterator.remove','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Iterator.html#remove()']]
  },
  {
    track:'java', group:'Java 基础', id:'java-raw-type-skips-checks',
    title:'裸类型 List 会跳过泛型检查，不是图省事的写法',
    prompt:'为什么把 `List` 和无界 `List<?>` 当成一回事，往 `List<String>` 里 add 整数？',
    core:'擦除之后运行时集合不带着参数类型，见 `java-generics`。编译器对裸类型几乎放弃检查，`void add(List list, Object o)` 能把 `Integer` 塞进 `List<String>`，取出时 `ClassCastException`。`List<?>` 是未知具体类型，通常不能 `add` 除 null 以外的元素。`List<Object>` 才表示什么对象都能放。新代码不要用裸类型。',
    why:'工具方法收裸 `List`，调用方以为还是 `List<String>`，下一个 get 才炸。',
    example:'`List<String> list = new ArrayList<>(); add(list, 10); String s = list.get(0);` 编译过、运行转型失败。',
    task:'划掉“List 和 List<?> 一样”；写出裸类型、无界通配、List<Object> 各能干什么。',
    answer:'裸类型跳过检查。List<?> 基本不能 add。要装任意对象用 List<Object>。',
    keywords:'raw type unbounded wildcard erasure ClassCastException',
    points:['裸类型绕过泛型检查','List<?> 不是 List<Object>','混入错误类型会在取出时 ClassCastException'],
    refs:[['JLS 4.8 Raw Types','https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.8'],['Java Tutorial：Type Erasure','https://docs.oracle.com/javase/tutorial/java/generics/erasure.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_38) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
