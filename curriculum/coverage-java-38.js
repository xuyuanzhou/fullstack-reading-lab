/* Batch 38: JDBC 有 DataSource, 隐式 super() 只调无参, foreach 不能 list.remove, 裸类型跳过泛型检查. */
const COVERAGE_JAVA_38 = [
  {
    track:'java', group:'工程实践', id:'jdbc-datasource-not-diy-pool',
    title:'连接池用 DataSource，不要手写 synchronized getConnection',
    prompt:'旧资料说 JDBC 没有连接池，只能自己做缓冲池。为什么这不能当现行答案？',
    promptAnswer:'连接池走 DataSource。close 是归还；不要手写 synchronized 空闲列表当 JDBC 标准答案。',
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
    promptAnswer:'编译器默认只插无参 super()。父类没有无参时必须显式 super(实参)，不是永远会调到某个父构造。',
    core:'构造器体（Constructor Body，JLS 8.8.7）的第一条若不是 this(...) 或 super(...)，编译器会插入 super()，也就是调用父类的无参构造。父类如果只写了带参构造，这个无参 super() 就不存在，子类必须自己写 super(参数)。抽象类可以有构造器，接口没有实例构造器。JPA 实体常要无参构造给反射，那是框架约定，不是每个类都必须再留一个空构造。和 record 的差别见 `java-record-accessor`。',
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
    promptAnswer:'增强 for 底层仍在 next，循环里直接 list.remove 会坏结构。用 Iterator.remove 或 removeIf。',
    core:'增强 for（JLS 14.14.2，The enhanced for statement）在集合上会拿迭代器反复调用 next。循环体里直接 add 或 remove，快速失败的迭代器发现结构被改过，就抛 ConcurrentModificationException。要删当前元素，用迭代器自己的 remove，而且必须先 next。也可以用 removeIf。按下标 remove(i) 会让后面的元素前移，容易漏掉下一个。同步列表也一样，见 `java-vector-cme-not-because-sync`。',
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
    promptAnswer:'裸类型 List 跳过泛型检查。List<?> 元素未知，基本不能 add；要装任意对象用 List<Object>。',
    core:'裸类型（Raw Types，JLS 4.8）是丢掉类型参数的写法，例如 List 而不是 List<String>。擦除之后运行时本来就不带参数，编译器对裸类型几乎不再检查，于是可以把 Integer 塞进本来声明成 List<String> 的集合，取出时才 ClassCastException。List<?> 表示元素类型未知，除了 null 不能 add。List<Object> 才表示什么对象都能放。擦除本身见 `java-generics`。',
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
