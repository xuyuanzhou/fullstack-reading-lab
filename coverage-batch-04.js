/* Batch 04: independently written lessons from page-specific accuracy review. */
const COVERAGE_BATCH_04 = [
  {
    track:'java', group:'并发', id:'java-thread-start-run',
    title:'Thread.start 与直接调用 run 的区别',
    prompt:'直接调用 thread.run() 会不会执行任务？它和 start() 到底差在哪里？',
    core:'对用 Runnable 创建的平台线程，直接调用 run() 是一次普通方法调用：任务会在当前调用线程中同步执行，不会启动新线程。start() 才会安排该 Thread 独立执行；同一个 Thread 实例不能启动两次。Java 21 之后的虚拟线程有额外边界：直接调用其 run() 不会运行任务，应按对应版本 API 分别讨论。',
    why:'把“不创建新线程”误记成“不执行代码”，会让调试日志、耗时和线程安全推理都出错。',
    example:'主线程执行 t.run() 时，Runnable 中打印的是主线程名；随后执行 t.start() 并 join()，任务在新线程中再次运行。这个例子只针对用 Runnable 创建的平台线程。',
    task:'写一个带线程名输出的 Runnable，依次调用 t.run()、t.start()、t.join()，说明每次任务运行在哪个线程；再尝试第二次 start()。',
    answer:'直接 run() 在调用者线程同步执行；start() 启动独立线程，join() 等待它结束；对同一实例再次 start() 会抛出 IllegalThreadStateException。',
    keywords:'Java Thread start run Runnable platform thread virtual thread 调用线程',
    points:['直接 run 是普通方法调用','start 安排独立线程执行','平台线程与虚拟线程的版本边界'],
    refs:[['Oracle Java 25：Thread','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Thread.html']]
  },
  {
    track:'java', group:'框架', id:'spring-legacy-config',
    title:'Spring 旧配置题的版本边界',
    prompt:'旧资料推荐 XmlBeanFactory 和 @Required，今天还能作为通用答案吗？',
    core:'先区分历史 API 和当前项目选择。XmlBeanFactory 在 Spring 5.3 文档中已标记为自 3.1 起弃用；@Required 在 5.3 文档中标记为自 5.1 起弃用。XML 配置本身仍是可用方式，但不应把这两个旧 API 当成现代应用的默认入口。常规应用使用 ApplicationContext；必需依赖优先通过构造器表达。',
    why:'面试资料若不标版本，容易把“旧项目可能遇到”变成“新项目应采用”，影响迁移与代码评审。',
    example:'维护旧 XML 项目时先确认 Spring 版本与现有 BeanDefinition 加载方式；新服务的必需 Repository 通过构造器注入，而不是为了校验 setter 再引入 @Required。',
    task:'把一段“最常用 XmlBeanFactory、必需字段加 @Required”的答题稿改写成带版本条件的说明，并写出新项目的构造器注入方案。',
    answer:'旧 API 只作为遗留代码识别；说明对应的弃用版本。新项目选择 ApplicationContext 管理上下文，并用构造器让必需依赖在创建时明确。',
    keywords:'Spring XmlBeanFactory Required ApplicationContext constructor injection deprecated XML',
    points:['XmlBeanFactory 的弃用边界','@Required 与构造器注入','XML 配置仍可用但不是旧 API 复活'],
    refs:[['Spring 5.3：XmlBeanFactory API','https://docs.spring.io/spring-framework/docs/5.3.x/javadoc-api/org/springframework/beans/factory/xml/XmlBeanFactory.html'],['Spring 5.3：弃用 API 列表','https://docs.spring.io/spring-framework/docs/5.3.x/javadoc-api/deprecated-list.html'],['Spring：基于注解的容器配置','https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_BATCH_04) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
