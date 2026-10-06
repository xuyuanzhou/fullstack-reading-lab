/* Batch 31: protected access, anonymous class, XmlBeanFactory gone, String new. */
const COVERAGE_JAVA_31 = [
  {
    track:'java', group:'Java 基础', id:'java-protected-other-pkg-subclass',
    title:'protected 对别的包里的子类可见，不是“出了包就全看不见”',
    prompt:'为什么权限表把 protected 的“其他 package”打叉，又把“子孙类”打勾，让人以为跨包子类不能用？',
    core:'`public` 到处可见。`protected` 对本包可见，也对**其他包中的子类**可见，但子类里通常通过继承来的成员访问，不能拿着无关父类实例当公共字段用。包可见（无修饰符，旧称 friendly/default）只对本包可见，子类若在别的包则看不见。`private` 只限本类。把四列画成互斥，会把跨包继承的 `protected` 画没。',
    why:'按“其他包全看不见”去改字段，子类编译失败还以为语言改了。',
    example:'`pkg.b.Child extends pkg.a.Parent` 可以读继承来的 `protected int x`。同文件里的无关类 `pkg.b.Other` 不能通过 Parent 引用去读 x。',
    task:'对照 JLS 6.6，写出 protected 跨包时谁能访问；划掉 friendly 当正式关键字。',
    answer:'protected 给本包和跨包子类。无修饰符只给本包。Java 没有 friendly 关键字。',
    keywords:'Java protected default package-private JLS',
    points:['protected 对本包和跨包子类可见','无修饰符不是 friendly 关键字，只限本包','private 只限本类'],
    refs:[['JLS 6.6 Access Control','https://docs.oracle.com/javase/specs/jls/se21/html/jls-6.html#jls-6.6'],['Java Tutorial：Controlling Access','https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-anonymous-extends-or-implements',
    title:'匿名类要么继承一个类，要么实现一个接口',
    prompt:'为什么说匿名内部类“不能 extends 其它类，只能当接口让别人实现”？',
    core:'`new Parent() { ... }` 就是继承 Parent 的匿名子类。`new Runnable() { public void run() {} }` 就是实现接口。两者只能选一种超类型，不能再另写 `extends` 关键字，也没有名字，但不能说“不能继承”。静态嵌套类不持有外部实例；内部类持有。`&` 对整数是按位与，对 boolean 是不短路的逻辑与，`&&` 才短路。',
    why:'按“不能继承”去背，看到 `new Thread() { }` 会对不上。',
    example:'`button.addActionListener(new ActionListener() { public void actionPerformed(ActionEvent e) {} });` 就是匿名实现。`new HashMap<String,Integer>() {}` 是匿名子类。',
    task:'各写一个继承类、实现接口的匿名类；划掉“不能 extends”。',
    answer:'匿名类继承一个类或实现一个接口。没有名字，不是不能有父类型。静态嵌套类不抓外部 this。',
    keywords:'anonymous class inner class implements extends',
    points:['匿名类有且只有一个超类型：类或接口','静态嵌套类不需要外部实例','& 对 boolean 不短路，&& 才短路'],
    refs:[['JLS 15.9.5 Anonymous Class Declarations','https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.9.5'],['Java Tutorial：Anonymous Classes','https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-xmlbeanfactory-removed',
    title:'XmlBeanFactory 已删除，别把容器说成只有延迟工厂',
    prompt:'为什么还把 XmlBeanFactory 当“最常用 BeanFactory”，又说 ApplicationContext 一定会在启动时把所有 Bean 建完？',
    core:'`XmlBeanFactory` 在 Spring 3.1 弃用，5.x 删除。现行用 `ApplicationContext`（Boot 里是 `AnnotationConfigServletWebServerApplicationContext` 一类）。默认单例会在刷新时预实例化，`lazy-init` / `@Lazy` / prototype 仍是第一次用才建。DI 是 IoC 的一种实现：容器创建对象时把依赖塞进去，不是和 IoC 并列的另一套框架。Struts 模块早已离开 Spring 主线。',
    why:'去源码里找 XmlBeanFactory，Boot 3 工程里根本没有这个类。',
    example:'`SpringApplication.run` 刷新上下文时创建单例。标了 `@Lazy` 的 Bean 第一次注入才实例化。',
    task:'对照现行 Spring，写出替代 XmlBeanFactory 的入口；说明哪些 Bean 启动时不会建。',
    answer:'用 ApplicationContext，不要 XmlBeanFactory。默认单例启动时建，懒加载和 prototype 例外。',
    keywords:'XmlBeanFactory ApplicationContext @Lazy IoC DI',
    points:['XmlBeanFactory 已从现行 Spring 删除','默认单例预实例化，懒加载和 prototype 除外','DI 是 IoC 的注入方式不是另一套容器'],
    refs:[['Spring：The IoC Container','https://docs.spring.io/spring-framework/reference/core/beans.html'],['BeanFactory vs ApplicationContext','https://docs.spring.io/spring-framework/reference/core/beans/introduction.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-string-new-vs-pool',
    title:'new String("xyz") 不一定正好两个对象',
    prompt:'为什么把 `String s = new String("xyz");` 固定背成“一定创建两个对象”？',
    core:'字面量 `"xyz"` 在类加载时进入字符串池，池里已有则复用。`new String(...)` 再在堆上做一个新的 String 实例，内容共享字符数组（实现细节因版本而异）。若池里已经有 `"xyz"`，这次字面量不新建，只多一个堆上的 String，总数是 1 个新对象加 1 个已有池对象。不要靠这题数对象，拷贝构造几乎没必要，直接用字面量。`s1 = s1 + 1` 会把 short 抬成 int，`s1 += 1` 含隐藏转换。`Math.round(-11.5)` 在 Java 里是 -11，因为先加 0.5 再 floor。',
    why:'面试按“永远两个”对，和运行时池状态一对就错。',
    example:'先执行过 `"xyz"`，再 `new String("xyz")` 只保证多一个堆实例。`s1 += 1` 能编译，`s1 = s1 + 1` 不能。',
    task:'写出字面量进池和 new 出堆实例的差别；划掉“一定两个对象”。',
    answer:'字面量进池，new 再造一个 String。池里已有时不是“新建两个”。日常不要 new String。',
    keywords:'String intern pool new String round +=',
    points:['字面量在池里，new String 另有堆实例','池命中时不会再为字面量新建','short+=1 合法，short=short+1 要转换'],
    refs:[['JLS 3.10.5 String Literals','https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.5'],['String(String)','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#%3Cinit%3E(java.lang.String)']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_31) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
