/* Batch 04: independently written lessons from page-specific accuracy review. */
const COVERAGE_BATCH_04 = [
{
    track:'java',
    group:'并发',
    id:'java-thread-start-run',
    title:'Thread.start 与直接调用 run 的区别',
    prompt:'直接调用 thread.run() 会不会执行任务？它和 start() 到底差在哪里？',
    core:'对用 Runnable 创建的平台线程，直接调用 run() 是一次普通方法调用：任务会在当前调用线程中同步执行，不会启动新线程。start() 才会安排该 Thread 独立执行；同一个 Thread 实例不能启动两次。Java 21 之后的虚拟线程有额外边界：直接调用其 run() 不会运行任务，应按对应版本 API 分别讨论。',
    why:'错把“不会启动新线程”记成“run 不会执行任务”，日志、耗时和线程安全都会判错：任务其实在调用者线程里同步跑完了。能分开的信号是：打印出来的线程名是主线程，还是新线程。看线程名，不要看方法有没有被调用到。',
    example:'主线程执行 t.run() 时，Runnable 中打印的是主线程名；随后执行 t.start() 并 join()，任务在新线程中再次运行。这个例子只针对用 Runnable 创建的平台线程。',
    task:'写一个带线程名输出的 Runnable，依次调用 t.run()、t.start()、t.join()，说明每次任务运行在哪个线程；再尝试第二次 start()。',
    answer:'对用 Runnable 创建的平台线程，t.run() 在调用者线程里同步执行，打印的是调用者的线程名。t.start() 才让任务在新线程里再跑一次，打印新线程名。t.join() 等到这个新线程结束才继续。对同一实例第二次 start() 抛出 IllegalThreadStateException。虚拟线程直接调用 run 的行为要按对应版本另看，不能把这次平台线程的结果抄过去。',
    keywords:'Java Thread start run Runnable platform thread virtual thread 调用线程',
    points:['直接 run 是普通方法调用','start 安排独立线程执行','平台线程与虚拟线程的版本边界'],
    refs:[['Oracle Java 25：Thread','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Thread.html']],
    deep:[
      {
        title:'同步调用和启动',
        body:'run 是普通方法，调用栈停在当前线程，任务做完才返回。start 安排线程执行，调用本身很快返回，任务可能还在跑。join 用来等它结束。同一个 Thread 实例不能成功启动两次。'
      },
      {
        title:'怎样自己验证',
        body:'Runnable 里打印线程名。依次调用 run、start、join，确认 run 印出主线程名，start 之后印出另一个名字，join 返回时新线程已结束。再 start 第二次，应看到 IllegalThreadStateException。'
      }
    ]
  },
{
    track:'java',
    group:'框架',
    id:'spring-legacy-config',
    title:'Spring 旧配置题的版本边界',
    prompt:'旧资料推荐 XmlBeanFactory 和 @Required，今天还能作为通用答案吗？',
    core:'先区分历史 API 和当前项目选择。XmlBeanFactory 在 Spring 5.3 文档中已标记为自 3.1 起弃用；@Required 在 5.3 文档中标记为自 5.1 起弃用。XML 配置本身仍是可用方式，但不应把这两个旧 API 当成现代应用的默认入口。常规应用使用 ApplicationContext；必需依赖优先通过构造器表达。',
    why:'错把旧资料里的 XmlBeanFactory 和 @Required 写成今天的默认做法，新项目会多一套已经弃用的入口。能分开的信号是：这段 API 出现在遗留代码里，还是被推荐给没有版本前提的新服务。',
    example:'维护旧 XML 项目时先确认 Spring 版本与现有 BeanDefinition 加载方式；新服务的必需 Repository 通过构造器注入，而不是为了校验 setter 再引入 @Required。',
    task:'把一段“最常用 XmlBeanFactory、必需字段加 @Required”的答题稿改写成带版本条件的说明，并写出新项目的构造器注入方案。',
    answer:'答题要写明版本：XmlBeanFactory 在 Spring 5.3 文档中已标为自 3.1 起弃用，@Required 标为自 5.1 起弃用，它们只用于认出遗留代码。XML 配置本身仍可用，但不是把这两个 API 捡回来。新项目用 ApplicationContext 管理上下文，必需依赖放进构造器，创建时就缺不了，而不是靠 @Required 去检查 setter。',
    keywords:'Spring XmlBeanFactory Required ApplicationContext constructor injection deprecated XML',
    points:['XmlBeanFactory 的弃用边界','@Required 与构造器注入','XML 配置仍可用但不是旧 API 复活'],
    refs:[['Spring 5.3：XmlBeanFactory API','https://docs.spring.io/spring-framework/docs/5.3.x/javadoc-api/org/springframework/beans/factory/xml/XmlBeanFactory.html'],['Spring 5.3：弃用 API 列表','https://docs.spring.io/spring-framework/docs/5.3.x/javadoc-api/deprecated-list.html'],['Spring：基于注解的容器配置','https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html']],
    deep:[
      {
        title:'弃用不是用法推荐',
        body:'能编译或旧项目里还见得到，不等于新代码应该继续用。先写清从哪个版本起弃用，再写当前项目的入口。必需依赖用构造器表达，创建对象时就看得见缺了什么。文档里的弃用说明要写进答案，不能只说旧。'
      },
      {
        title:'怎样自己验证',
        body:'在依赖的 Spring 版本的 API 文档里查 XmlBeanFactory 和 @Required 的弃用说明，把版本写进答案。再在一个新配置里只用构造器注入必需的 Repository，确认不需要 @Required 也能在启动时发现缺少这个依赖。'
      }
    ]
  }
];

for (const {points,refs,...lesson} of COVERAGE_BATCH_04) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
