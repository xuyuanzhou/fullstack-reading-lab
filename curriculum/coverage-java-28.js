/* Batch 28: Boot 3 auto-config file, ACID C, tenuring 15, singleton controller. */
const COVERAGE_JAVA_28 = [
  {
    track:'java', group:'Spring', id:'spring-boot3-autoconfig-imports',
    title:'Boot 3 自动配置不再靠 spring.factories 那一张清单',
    prompt:'为什么还把 Starter 原理背成“启动时去 Maven 里读每个 starter 的 spring.factories，把里面的 bean 全塞进容器”？',
    core:'自动配置类由 `@EnableAutoConfiguration` 导入，条件注解决定是否生效，不是把 factories 里写过的类无条件 new 出来。Spring Boot 2 用 `META-INF/spring.factories` 登记 `EnableAutoConfiguration`。Boot 3 改成 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`，一行一个配置类。自己写 starter 要对齐这个文件，再配 `spring-autoconfigure-metadata.properties` 做预过滤。排除用 `exclude = { DataSourceAutoConfiguration.class }` 这类方式，不是改 Maven 仓库。日志默认 Logback，见官方 logging。热重启是 devtools，不是改完代码进程自己变新。可以打成 jar 内嵌 Tomcat，也可以打 war，见 `spring-boot-war-still-ok`。',
    why:'按 spring.factories 去给 Boot 3 starter 排“为什么没装配”，文件根本不在那个位置。',
    example:'新建 starter：在 AutoConfiguration.imports 写上 `com.example.FooAutoConfiguration`。Boot 2 项目才去 spring.factories 找 EnableAutoConfiguration。',
    task:'对照 Boot 3 迁移指南，写出自动配置清单文件名；划掉“启动时读 Maven 里的 spring.factories 把 bean 全注入”。',
    answer:'Boot 3 用 AutoConfiguration.imports 登记自动配置。条件不满足就不会创建。不是读 Maven 把 factories 里的类全塞进容器。',
    keywords:'Spring Boot 3 AutoConfiguration.imports spring.factories starter',
    points:['Boot 3 自动配置清单是 AutoConfiguration.imports','条件注解决定是否生效，不是全量注入','Boot 2 才用 spring.factories 登记自动配置'],
    refs:[['Spring Boot 3.0 Migration Guide','https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide'],['Developing Auto-configuration','https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-acid-c-is-consistency',
    title:'ACID 的 C 是一致性，隔离也不是永远串行',
    prompt:'为什么把事务四要素的 C 写成 Correspondence，又把隔离性说成“同一时间只能有一个请求碰同一数据”？',
    core:'ACID 是原子性、一致性、隔离性、持久性。C 是 Consistency：事务结束时完整性约束仍成立，不是 Correspondence。隔离性让并发事务少看见彼此的中间态，级别从读未提交到可串行化，InnoDB 默认可重复读并用 MVCC 和间隙锁减轻幻读，见 `mysql-isolation-levels`。把隔离说成全程串行，等于否定了读已提交和可重复读。Query Cache 从 8.0 移除，不要再当优化第一招，见 `mysql-query-cache-removal`。ORDER BY RAND() 会对整表算随机值再排序，大表别用。',
    why:'把隔离背成单线程写库，会拒绝一切合理并发，还会把 C 的英文写错。',
    example:'两个会话在可重复读下各改不同行可以同时提交。转账结束时余额约束仍成立，这是一致性，不是“通信”。',
    task:'写出 ACID 四个英文全称；划掉 Correspondence 和“同一时间只能一个请求”。',
    answer:'C 是 Consistency。隔离有级别，默认不是全程串行。Query Cache 已移除。大表不要 ORDER BY RAND()。',
    keywords:'ACID Consistency Isolation MVCC Query Cache',
    points:['C 是 Consistency 不是 Correspondence','隔离有级别，InnoDB 默认 RR 加 MVCC','不要把 Query Cache 当 8.0 优化项'],
    refs:[['MySQL Glossary：ACID','https://dev.mysql.com/doc/refman/8.4/en/glossary.html#glos_acid'],['MySQL：Isolation','https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html']]
  },
  {
    track:'java', group:'JVM', id:'jvm-tenuring-threshold-15',
    title:'晋升年龄默认是 15，不是“挨过 16 次 Minor GC”',
    prompt:'为什么把 Survivor 预筛选说成“必须经历 16 次 Minor GC 才进老年代”？',
    core:'对象在 Survivor 里每熬过一次 Minor GC 年龄加 1，达到 `-XX:MaxTenuringThreshold` 就晋升。HotSpot 默认是 15，不是 16。动态年龄：Survivor 里一批对象的总大小超过阈值，会提前晋升，不一定等到 15。大对象可能直接进老年代。方法区现行是元空间，不要再把持久代当成堆的一部分，见 `jvm-no-permgen-hotspot`。Eden:S0:S1 常见 8:1:1，由 SurvivorRatio 控制。栈深度不够是 StackOverflowError，线程太多建栈失败才可能 OOM。',
    why:'按 16 次去对 MaxTenuringThreshold，参数和口诀差一岁。',
    example:'默认 15。某次 Minor GC 后 Survivor 里年龄 ≥3 的对象已经占满一半，可能这批提前进老年代。',
    task:'对照 GC 调优文档，写出默认晋升阈值；划掉“必须 16 次”。',
    answer:'默认 MaxTenuringThreshold=15。动态年龄可提前晋升。持久代不是现行堆布局。',
    keywords:'MaxTenuringThreshold Survivor Minor GC Metaspace',
    points:['默认晋升年龄是 15 不是 16','Survivor 占用过高会提前晋升','方法区现行是元空间不是持久代'],
    refs:[['HotSpot GC Tuning：Generations','https://docs.oracle.com/en/java/javase/21/gctuning/introduction-garbage-collection-tuning.html'],['MaxTenuringThreshold','https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-mvc-controller-singleton',
    title:'Controller 默认单例，可变字段会串请求',
    prompt:'为什么发现并发串数据，就给 Controller 方法加 synchronized，或者改成多例？',
    core:'DispatcherServlet 把请求交给映射到的 Handler。`@Controller` / `@RestController` 默认单例，所有请求共享同一实例。实例字段会在请求之间串掉。正确做法是状态放方法参数、请求属性或注入的线程安全协作对象，而不是把 Controller 改成 prototype 当缓存。加 synchronized 会把接口打成单线程。拦截器和过滤器不是同一层，见 `spring-filter-vs-interceptor`。返回体用 `@RestController` 或 `@ResponseBody`，见 `spring-mvc-restcontroller`。',
    why:'用同步锁 Controller，吞吐量先塌；改成多例又把依赖生命周期搞乱。',
    example:'字段 `private User current;` 在 login 里赋值，下一个请求可能读到别人的用户。改成方法参数或 SecurityContext。',
    task:'检查一个 Controller 有没有实例可变字段；说明默认作用域。',
    answer:'Controller 默认单例。别在上面放可变请求状态，也别用 synchronized 包整个方法。',
    keywords:'Spring MVC Controller singleton DispatcherServlet',
    points:['Controller 默认单例共享实例','请求状态不要放实例字段','不要用 synchronized 解决串请求'],
    refs:[['Spring Web MVC','https://docs.spring.io/spring-framework/reference/web/webmvc.html'],['Bean scopes','https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_28) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
