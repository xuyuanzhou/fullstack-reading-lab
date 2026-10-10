/* Batch 28: Boot 3 auto-config file, ACID C, tenuring 15, singleton controller. */
const COVERAGE_JAVA_28 = [
  {
    track:'java', group:'Spring', id:'spring-boot3-autoconfig-imports',
    title:'Boot 3 自动配置不再靠 spring.factories 那一张清单',
    prompt:'有人把 Starter 原理背成：启动时去 Maven 里读每个 starter 的 spring.factories，把里面的 bean 全塞进容器。为什么在 Boot 3 会说错？',
    promptAnswer:'Boot 3 的清单在 AutoConfiguration.imports。不是启动时去 Maven 读 spring.factories 把 bean 全塞进容器。',
    core:'自动配置仍由 @EnableAutoConfiguration 导入。清单里写的是配置类，不是“把类里每个 bean 无条件 new 出来”。类上的条件注解不满足，这份配置不会生效。Spring Boot 2.7 开始用新文件登记：META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports，一行一个配置类的全名。2.7 仍会读 spring.factories 里的 EnableAutoConfiguration，两处都写了会去重。Boot 3 删掉了从 spring.factories 读取这个键的能力，只认 imports 文件。spring.factories 里其他键不受影响。自己写的 starter 要给 Boot 3 用，就把配置类写进这份 imports。spring-autoconfigure-metadata.properties 只是在缺类时提前跳过，不是另一张必填清单。不想要某份自动配置，用 exclude 或配置项 spring.autoconfigure.exclude 指到那个类，而不是去改 Maven 仓库里的 jar。',
    why:'在 Boot 3 的 starter 里找 spring.factories 的 EnableAutoConfiguration，文件里没有这一条，会以为自动配置没注册。类已经写在 imports 里却没有 bean 时，该看的是条件没有匹配，不是清单漏了。',
    example:'新建 starter，在 AutoConfiguration.imports 写上 com.example.FooAutoConfiguration，并给它加上 @ConditionalOnClass。运行时缺那个类，启动的条件报告里它是未匹配，容器里没有对应的 bean。Boot 2.6 及更早才只看 spring.factories。2.7 两个文件都看。Boot 3 只看 imports。',
    task:'对照 Boot 3 迁移指南，写出自动配置清单文件名；划掉“启动时读 Maven 里的 spring.factories 把 bean 全注入”。',
    answer:'Boot 3 的自动配置清单是 META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports。划掉“读 Maven 里的 spring.factories 把 bean 全注入”：spring.factories 的 EnableAutoConfiguration 键在 Boot 3 不再被读取，而且列出来的配置类还要条件成立才会创建 bean。2.7 会同时读两个位置并去重。排除用 exclude，不改仓库里的 jar。',
    keywords:'Spring Boot 3 AutoConfiguration.imports spring.factories starter',
    points:['Boot 3 自动配置清单是 AutoConfiguration.imports','条件注解决定是否生效，不是全量注入','2.7 两个位置都读，Boot 3 不再读 factories 里的这个键'],
    deep:[
      {title:'清单和条件是先后两步',body:'imports 只回答“有哪些配置类可以参与”。条件注解回答“这次运行为什么跳过”。缺一个类、缺一个 bean、配置项是 false，都会让该类里的 @Bean 不创建。先确认类名在 imports 里，再看条件报告，不要两步并成“没注入就是文件写错了”。'},
      {title:'怎样自己验证',body:'在 spring-boot-autoconfigure 的 jar 里找 META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports，应能看到配置类全名，而不是一串已经实例化的 bean。用 Boot 3 启动并打开条件报告，挑一个因缺少类而未匹配的自动配置，确认它在 imports 里，但容器里没有它的 bean。再在一份只给 Boot 3 用的 starter 里只写 spring.factories 的 EnableAutoConfiguration，这份配置不应再生效。'}
    ],
    refs:[['Spring Boot 3.0 Migration Guide','https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide'],['Developing Auto-configuration','https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-acid-c-is-consistency',
    title:'ACID 的 C 是一致性，隔离也不是永远串行',
    prompt:'为什么把事务四要素的 C 写成 Correspondence，又把隔离性说成“同一时间只能有一个请求碰同一数据”？',
    promptAnswer:'四个全称是 Atomicity、Consistency、Isolation、Durability。',
    core:'ACID 四个字母是 Atomicity、Consistency、Isolation、Durability。C 是 Consistency：事务提交时，库要满足它声明的完整性约束，从一个合法状态到下一个合法状态。它不是 Correspondence，也不是分布式里 CAP 的那个 C。原子性说的是这次事务要么全部留下，要么全部撤销。持久性说的是提交之后崩溃还能找回。隔离性说的是并发事务能看见彼此的哪些中间状态，由隔离级别决定，不是“全世界同一时间只许一个请求碰数据”。级别从读未提交、读已提交、可重复读到可串行化。InnoDB 默认是可重复读。两个会话各自修改不同的行，可以同时提交。把隔离背成单线程，等于把读已提交和可重复读都否定了。幻读、MVCC 和间隙锁是隔离级别那一课的机制，这里只用来记住：默认可重复读已经是并发，不是串行。',
    why:'把 C 写成 Correspondence，约束失败时会去查通信或复制，而不是查这次提交打破了哪条完整性规则。把隔离背成单线程之后，会拒绝两个会话同时改不同行，或者在可重复读上加一把盖住整库的锁。',
    example:'转账事务结束时，转出与转入之后的余额仍满足非负和收支相抵，这是一致性。两个会话分别更新订单 1 和订单 2，隔离级别是可重复读，两边都能提交。若把隔离做成同一时间只有一个请求，第二笔订单会无故排队。',
    task:'写出 ACID 四个英文全称；划掉 Correspondence 和“同一时间只能一个请求”。',
    answer:'四个全称是 Atomicity、Consistency、Isolation、Durability。划掉 Correspondence：C 是 Consistency，指提交时完整性约束仍成立。划掉“同一时间只能一个请求”：隔离由级别决定，InnoDB 默认是可重复读，不同行的事务可以同时提交。可串行化才是最强的那一档，不是默认。',
    keywords:'ACID Consistency Isolation 可重复读',
    points:['C 是 Consistency 不是 Correspondence','隔离有级别，InnoDB 默认 RR 加 MVCC','不同行可以同时提交，隔离不是单线程'],
    deep:[
      {title:'约束失败和并发看见中间态不是同一句',body:'余额变成负数、外键对不上，是一致性没保住，发生在这一次事务该不该提交。读到了别人还没提交的行，是隔离级别太弱。两个问题的修法不同：一个补约束或让事务自己回滚，一个调整隔离或缩短事务。不要用“加锁直到全世界串行”同时应付这两句。'},
      {title:'怎样自己验证',body:'SHOW VARIABLES LIKE \'transaction_isolation\'，InnoDB 默认应是 REPEATABLE-READ。开两个会话，分别更新不同主键的行，两边都应提交成功。再写一个会打破约束的修改，例如把有检查的余额减成负数，这次提交应失败。失败的是一致性，不是因为还有另一个会话。'}
    ],
    refs:[['MySQL Glossary：ACID','https://dev.mysql.com/doc/refman/8.4/en/glossary.html#glos_acid'],['MySQL：Isolation','https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html']]
  },
  {
    track:'java', group:'JVM', id:'jvm-tenuring-threshold-15',
    title:'晋升年龄默认是 15，不是“挨过 16 次 Minor GC”',
    prompt:'为什么把 Survivor 预筛选说成“必须经历 16 次 Minor GC 才进老年代”？',
    promptAnswer:'默认晋升阈值看 MaxTenuringThreshold，常见默认 15。不是必须经历 16 次 Minor GC。',
    core:'对象头里的年龄只有 4 位，最大记到 15。-XX:MaxTenuringThreshold 是晋升阈值的上限，合法最大值是 15。Java 21 的手册写明：Parallel 收集器的默认值是 15。年轻代回收拷贝对象时，如果当前年龄已经达到阈值，就晋升到老年代；还没达到，就拷进 Survivor 并把年龄加 1。新生对象年龄是 0。阈值若从始至终都是 15，年龄要先被加到 15，下一次年轻代回收才晋升，于是有人把次数数成 16。这个 16 不是参数，也不能写成必须。PrintFlagsFinal 里的 MaxTenuringThreshold 是 15，写成 16 不会被接受。自适应还会把当前阈值降到 15 以下。TargetSurvivorRatio 默认 50，期望留在 Survivor 里的体积大约是该空间的一半。年龄从 1 往上累加，体积一旦超过这个目标，当前阈值就降到这个年龄，更年轻的对象在这次回收就会晋升。',
    why:'按“必须 16 次”去对 MaxTenuringThreshold，配置和 GC 日志都对不上，日志里的最大阈值是 15。Survivor 已经装不下时仍死等 16 次，对象会在更小的当前阈值上提前进老年代，老年代涨了也找不到那 16 次。',
    example:'PrintFlagsFinal 里 MaxTenuringThreshold = 15。一次年轻代回收的年龄表显示新阈值变成 3：从高年龄累加的体积已经超过 Survivor 目标。年龄大于等于 3 的对象这次就晋升，不会再在 Survivor 里等到年龄 15。',
    task:'对照 GC 调优文档，写出默认晋升阈值；划掉“必须 16 次”。',
    answer:'默认晋升阈值看 MaxTenuringThreshold。Parallel 收集器的手册默认是 15，最大值也是 15。划掉“必须经历 16 次 Minor GC”：16 只是阈值一直保持 15 时，把“加到 15”和“下一次才晋升”数在一起的次数，不是必经次数，也不是能写进参数的值。Survivor 占用超过目标时，当前阈值会降到 15 以下并提前晋升。',
    keywords:'MaxTenuringThreshold Survivor 年龄 15',
    diagram:'diagrams/jvm-tenuring.svg',
    points:['默认晋升年龄上限是 15 不是 16','年龄达到当前阈值就晋升','Survivor 超过目标会把当前阈值降到 15 以下'],
    deep:[
      {title:'参数 15 和次数 16 差在什么时候加年龄',body:'回收开始时年龄已经大于等于当前阈值，这次就去老年代，年龄不再加。年龄还小，就留在 Survivor 并加 1。所以阈值保持 15 时，第 15 次活下来年龄变成 15，第 16 次才晋升。把 16 写进配置是错的。线上更常见的是当前阈值被降到 3 或 4，对象远没走到 15。'},
      {title:'怎样自己验证',body:'java -XX:+PrintFlagsFinal -version，看 MaxTenuringThreshold，Parallel 收集器应为 15。再跑一个会触发年轻代回收的小程序，打开年龄分布日志，看 Desired survivor size 和 new threshold。new threshold 可以小于 15。不要把“熬满 16 次”当成日志里应该出现的计数。'}
    ],
    refs:[['HotSpot GC Tuning：Generations','https://docs.oracle.com/en/java/javase/21/gctuning/introduction-garbage-collection-tuning.html'],['MaxTenuringThreshold','https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-mvc-controller-singleton',
    title:'Controller 默认单例，可变字段会串请求',
    prompt:'为什么发现并发串数据，就给 Controller 方法加 synchronized，或者改成多例？',
    promptAnswer:'Controller 默认单例，请求状态不能放实例字段。加 synchronized 或改成多例都治不好串数据，状态放参数或请求作用域。',
    core:'@Controller 和 @RestController 是 Spring 管理的 bean，默认作用域是 singleton。整个应用一个实例，所有请求进的是同一批字段。在字段里写 private User current，登录方法把它赋成当前用户，下一个请求若读这个字段，会读到上一个用户。请求自己的数据应放在方法参数、方法里的局部变量，或框架已经按请求隔离的上下文里。给处理方法加 synchronized，锁的是这一个实例，所有请求排队，接口变成单线程，多开一个进程之后各有各的锁，串数据仍在。把作用域改成 prototype，只是换了实例怎么创建，没有回答“这份用户数据该活在哪”。请求状态仍然不要放在 Controller 的字段上。',
    why:'串数据时若先加 synchronized，吞吐先掉，第二个请求仍可能在另一台机器上读到那台机器自己的字段。改成多例又会把依赖的创建和销毁搅进同一次事故。先看字段是不是被请求写过。',
    example:'login 把字段 current 设成 alice。紧接着另一个请求调用“当前用户”，没有再登录，返回的仍是 alice。两个请求甚至不用真的并行，先后调用就能看见。把 current 改成方法参数或局部变量之后，第二个请求不会再读到 alice。',
    task:'检查一个 Controller 有没有实例可变字段；说明默认作用域。',
    answer:'默认作用域是 singleton，所有请求共享同一个 Controller 实例。实例上的可变字段会把上一请求的数据留给下一请求。不要用 synchronized 包住整个方法，那只是让这个实例上的请求排队。也不要把作用域改成 prototype 来存放请求数据。状态放在方法参数或局部变量里。',
    keywords:'Spring MVC Controller singleton DispatcherServlet',
    points:['Controller 默认单例共享实例','请求状态不要放实例字段','不要用 synchronized 解决串请求'],
    deep:[
      {title:'锁住实例解决不了字段的归属',body:'synchronized 让同一时刻只有一个请求能跑这个方法，所以碰巧看不见交错写入。请求一结束锁就放了，字段里的值还在，下一个请求照样读到。负载均衡后面每台进程各有一个单例，锁也互不相干。要消除的是“请求数据放在共享实例上”，不是把并发度降成 1。'},
      {title:'怎样自己验证',body:'在一个测试 Controller 里放一个实例字段，第一个请求写入自己的标识，第二个请求只读取并返回。两次普通调用，第二次应看到第一次写下的值。把这个字段改成方法内的局部变量后再调用两次，第二次不应再看到第一次的标识。加上 synchronized 之后，第二次在第一次返回后仍然能读到旧字段。'}
    ],
    refs:[['Spring Web MVC','https://docs.spring.io/spring-framework/reference/web/webmvc.html'],['Bean scopes','https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_28) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
