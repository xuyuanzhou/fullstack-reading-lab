/* Batch 31: protected access, anonymous class, XmlBeanFactory gone, String new. */
const COVERAGE_JAVA_31 = [
  {
    track:'java', group:'Java 基础', id:'java-protected-other-pkg-subclass',
    title:'protected 对别的包里的子类可见，不是“出了包就全看不见”',
    prompt:'为什么权限表把 protected 的“其他 package”打叉，又把“子孙类”打勾，让人以为跨包子类不能用？',
    promptAnswer:'protected 对本包可见，也允许其他包的子类访问继承成员。Java 没有 friendly 关键字。',
    core:'访问控制（Access Control，JLS 6.6）决定谁能看见一个成员。public 任何包都能访问。private 只在声明它的类里。不写修饰符是包访问，只限同一个包；Java 没有 friendly 这个关键字，旧资料里的 friendly 就是不写修饰符。protected 比包访问多一条：其他包里的子类可以访问继承来的成员，但必须通过子类自己的类型，不能拿一个编译类型只是父类的引用去读。',
    example:'pkg.a.Parent 有 protected int x。pkg.b.Child 继承它，在 Child 的方法里写 x = 1，或者写另一个 Child 引用的 x，可以通过编译。同在 pkg.b 的无关类 Other，以及 Child 里一个参数类型是 Parent 的引用，都不能读这个 x。',
    task:'对照 JLS 6.6，写出 protected 跨包时谁能访问；划掉 friendly 当正式关键字。',
    answer:'protected 对本包可见，也允许其他包中的子类访问继承来的成员。跨包时要通过子类类型访问，不能拿父类类型的引用当公共字段。划掉 friendly：Java 没有这个关键字，不写修饰符只表示包访问，别的包里的子类看不见。private 只限本类。',
    keywords:'Java protected default package-private JLS',
    points:['protected 对本包和跨包子类可见','跨包时要通过子类类型访问父类成员','无修饰符不是 friendly 关键字，只限本包'],
    deep:[
      {title:'子类能看见，不等于任意父类引用都能点',body:'JLS 把跨包的 protected 限制在子类的实现里，是为了不让别的包拿着父类引用随便碰这个成员。Child 自己的 x、类型是 Child 的其他实例，属于子类在实现自己。类型只写成 Parent 的对象，编译器拒绝。本包里的类没有这条限制，它们本来就能访问同包的 protected。'},
      {title:'怎样自己验证',body:'建两个包。父类放 protected 字段。另一个包里写子类，方法里直接用这个字段，javac 应通过。在子类里再写一个参数类型是父类的方法，用这个参数去读字段，javac 应报错。同包外再写一个不继承的类去读，也应报错。源码里不要出现 friendly 这个词。'}
    ],
    refs:[['JLS 6.6 Access Control','https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html#jls-6.6'],['Java Tutorial：Controlling Access','https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-anonymous-extends-or-implements',
    title:'匿名类要么继承一个类，要么实现一个接口',
    prompt:'为什么说匿名内部类“不能 extends 其它类，只能当接口让别人实现”？',
    promptAnswer:'匿名类可以 new 父类(){}，就是在继承。只是没有名字，不能再写 extends/implements 关键字。',
    core:'匿名类（Anonymous Class，JLS 15.9.5）没有名字，所以写不出 extends 或 implements。超类型写在 new 后面：new 父类(参数) { ... } 是这个父类的子类，new 接口() { ... } 是实现这个接口并继承 Object。一次 new 只能指定这一个超类型。new Thread() { ... } 的直接父类就是 Thread。要同时继承一个类并实现接口，写有名字的类。',
    example:'button 上 new ActionListener() { public void actionPerformed(ActionEvent e) {} }，这个对象的接口列表里有 ActionListener，父类是 Object。new HashMap<String,Integer>() {} 的父类是 HashMap，它不是接口。两种都没有类名。',
    task:'各写一个继承类、实现接口的匿名类；划掉“不能 extends”。',
    answer:'划掉“不能 extends”。new 父类() { } 就是在继承这个类，new 接口() { } 就是在实现这个接口。匿名类没有名字，因此不能再写 extends 或 implements 关键字，一次也只能有这一个超类型。需要父类再加接口时，改成有名字的类。',
    keywords:'anonymous class inner class implements extends',
    points:['匿名类有且只有一个超类型：类或接口','new 父类就是继承，new 接口就是实现','没有名字，所以写不出 extends 关键字'],
    deep:[
      {title:'关键字缺失，是因为超类型已经写在 new 里',body:'有名字的类用 extends 和 implements 声明超类型。匿名类的超类型由类实例创建表达式给出，JLS 不再允许它另写一份声明。所以“不能写 extends 这两个字”是语法，“不能有父类”是把语法记反了。'},
      {title:'怎样自己验证',body:'写 new HashMap<String,Integer>() {}，打印 getClass().getSuperclass()，应是 HashMap。再写 new Runnable() { public void run() {} }，打印 getClass().getInterfaces()，应包含 Runnable，getSuperclass() 应是 Object。试着在匿名类上再写 implements 另一个接口，编译应失败。'}
    ],
    refs:[['JLS 15.9.5 Anonymous Class Declarations','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.9.5'],['Java Tutorial：Anonymous Classes','https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-xmlbeanfactory-removed',
    title:'XmlBeanFactory 已删除，别把容器说成只有延迟工厂',
    prompt:'旧资料把 XmlBeanFactory 当最常用 BeanFactory，又说 ApplicationContext 一定会在启动时把所有 Bean 建完。为什么这两句都不成立？',
    promptAnswer:'入口是 ApplicationContext。XmlBeanFactory 已删除；非懒加载单例在刷新时创建，不是“一定会建完所有 Bean”的口诀。',
    core:'XmlBeanFactory 在 Spring 3.1 弃用，Spring Framework 5 起这个类已经删除。现行容器用 ApplicationContext。它是 BeanFactory 的子接口，多了事件、国际化和与 Web 应用的集成。Boot 里 SpringApplication.run 刷新的就是一个 ApplicationContext。刷新时会预实例化非懒加载的单例：普通 @Component 的构造在启动过程中就会执行。不是所有 Bean 都这样。标了 @Lazy 或 lazy-init 的单例，第一次被用到才创建。prototype 每次取用才创建，启动时不会先造一个放着。依赖注入是 IoC 的一种做法：对象不自己 new 依赖，容器在创建它时把依赖放进来。它不是另一套和容器并列的框架。',
    why:'在 Boot 3 工程里搜索 XmlBeanFactory，spring-beans 里没有这个类，按旧教程去 new 它会编译失败。以为 ApplicationContext 会在启动时建完全部 Bean，又会漏看 @Lazy 的构造其实还没执行，第一次调用才暴露创建失败。',
    example:'一个普通 @Service 在构造里打印“创建”。SpringApplication.run 返回之前这行就会出现。另一个同样的类加上 @Lazy，启动日志里没有这行，直到某个方法第一次注入并调用它。prototype 的 Bean 启动时也不打印，每次 getBean 各打印一次。',
    task:'对照现行 Spring，写出替代 XmlBeanFactory 的入口；说明哪些 Bean 启动时不会建。',
    answer:'入口是 ApplicationContext，Boot 里由 SpringApplication.run 刷新。不要再使用 XmlBeanFactory，这个类从 Spring Framework 5 起已经删除。默认的非懒加载单例在刷新时创建。@Lazy 和 lazy-init 的单例第一次使用才创建，prototype 每次取用才创建。依赖注入是容器实现 IoC 的方式，不是另一个容器。',
    keywords:'XmlBeanFactory ApplicationContext @Lazy IoC DI',
    points:['XmlBeanFactory 已从现行 Spring 删除','默认单例预实例化，懒加载和 prototype 除外','DI 是 IoC 的注入方式不是另一套容器'],
    deep:[
      {title:'预实例化只覆盖非懒加载单例',body:'刷新上下文的目的，是把启动后就会用到的单例的创建失败提前暴露。懒加载故意把创建推迟到第一次使用，所以启动成功不等于这个 Bean 的构造能通过。prototype 没有一个可以提前造好的实例。查“启动时建了谁”，看作用域和有没有 @Lazy，而不是看它是不是写在配置里。'},
      {title:'怎样自己验证',body:'在当前使用的 spring-beans jar 里搜索 XmlBeanFactory，不应再有这个类。写两个组件，构造里各打印一行，只给其中一个加 @Lazy。启动应用，只有没加 @Lazy 的那行出现在启动完成之前。第一次调用懒加载的那个 Bean 时，另一行才出现。'}
    ],
    refs:[['Spring：The IoC Container','https://docs.spring.io/spring-framework/reference/core/beans.html'],['BeanFactory vs ApplicationContext','https://docs.spring.io/spring-framework/reference/core/beans/introduction.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-string-new-vs-pool',
    title:'new String("xyz") 不一定正好两个对象',
    prompt:'为什么把 `String s = new String("xyz");` 固定背成“一定创建两个对象”？',
    promptAnswer:'字面量进池；new 再多一个堆上的 String。池里已有该字面量时，新增的是那一个实例，不是固定两个。',
    core:'语言规范把源码里的 "xyz" 叫字符串字面量（String Literals，JLS 3.10.5），相同内容放进字符串池，再次出现用的是池里那一个。new String("xyz") 走 String(String) 构造器，一定会再造一个内容相同、引用不同的对象。池里那份可能在类加载时就建好了，所以这一行不一定正好新建两个。构造器文档写明：除非需要显式拷贝，否则不必这么写。== 比引用，intern() 才回到池里那一个。',
    example:'先执行 String pooled = "xyz"，池里已经有它。再 String created = new String("xyz")。pooled == created 是 false，created.equals(pooled) 是 true，pooled == created.intern() 是 true。日常写 "xyz" 即可，不要为了进池而 new 一次再 intern。',
    task:'写出字面量进池和 new 出堆实例的差别；划掉“一定两个对象”。',
    answer:'字面量进入字符串池，相同字面量复用池中的引用。new String("xyz") 额外构造一个新的 String，和池里的不是同一个对象。划掉“一定两个对象”：池里已经有这个字面量时，这一行新增加的是那一个堆实例。不需要拷贝时直接用字面量。用 == 判断是不是同一个引用，用 equals 判断内容。',
    keywords:'String intern pool new String 字面量',
    points:['字面量在池里，new String 另有堆实例','池命中时不会再为字面量新建','== 比的是引用，intern 才回到池里那一个'],
    deep:[
      {title:'要数的是这一行新造了谁',body:'“两个对象”把字面量进池和构造函数混成了同一次执行。进池发生在字面量被解析、池里还没有它的时候，可能早于这一行。构造函数每次调用都新造一个 String，这一条才稳定。所以计数之前先问池里有没有，而不是背一个固定的 2。'},
      {title:'怎样自己验证',body:'先把 "xyz" 赋给一个变量，再 new String("xyz") 赋给另一个。用 == 比较二者，应是 false；用 equals 应是 true。再比较第一个变量和第二个变量的 intern()，应是 true。在此之前不要假设这一行的字节码新分配了两个 String。'}
    ],
    refs:[['JLS 3.10.5 String Literals','https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.5'],['String(String)','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#%3Cinit%3E(java.lang.String)']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_31) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
