/* Batch 40: MyBatis 日志、JDBC 上的可执行 SQL、断点、PageHelper、MyBatis-Plus、中间件分层. */
const COVERAGE_JAVA_40 = [
  {
    track:'java', group:'MyBatis', id:'mybatis-log-preparing-parameters',
    title:'打印 SQL 时 DEBUG 打出 Preparing 和 Parameters 两行',
    prompt:'为什么把 Mapper 日志打开了，复制出来的语句里还是问号，贴到客户端就执行不了？',
    core:'MyBatis 把语句日志打在语句自己的 logger 上。名字是 Mapper 接口全名，或 XML 的 namespace，也可以细到某一条 statement。Spring Boot 里把这个包设成 DEBUG。不写 `logImpl` 时会自动发现 SLF4J，Boot 工程走这条。DEBUG 打两行：`Preparing` 是带 `?` 的预编译文本，`Parameters` 是按顺序绑上去的值和 JDBC 类型。结果行在 TRACE，大结果集不要开到这一级。`LOG4J` 从 3.5.9 起已弃用，不要再写进配置。`STDOUT_LOGGING` 仍可用，但绕过日志框架直接打到标准输出，只适合临时看一眼。这两行仍然是分开的，MyBatis 不会替你拼成一条可执行 SQL。要看填好参数、并且已经被插件改写过的文本，用 `mybatis-jdbc-log-inlines`。',
    why:'把 Preparing 那一行贴进客户端，问号还在，语句执行失败。全局开 TRACE，每一行结果都进日志，排查一次把磁盘打满。',
    example:'`logging.level.com.example.order.mapper=debug`。调用 `OrderMapper.findById` 能看到 `Preparing: select ... where id=?` 和 `Parameters: 42(Long)`。改成 info 后这两行消失。logger 写成 `com.example.order.mapper.OrderMapper.findById` 时，只有这一条语句出日志。',
    task:'只把一个 Mapper 包调到 DEBUG，确认同时有 Preparing 和 Parameters。再改回 INFO，确认 SQL 消失。长期配置不要用 STDOUT_LOGGING。',
    answer:'DEBUG 时有带问号的语句，参数在下一行。INFO 时两行都没有。TRACE 还会把结果行打出来。Boot 工程用自动发现的 SLF4J，不要再配已弃用的 LOG4J。标准输出实现不走日志级别。',
    keywords:'MyBatis logging DEBUG Preparing Parameters TRACE',
    points:['DEBUG 打印带问号的语句和单独的参数行','logger 名是 Mapper 全名、namespace 或某一条语句','不写 logImpl 时走 SLF4J，LOG4J 已弃用'],
    deep:[
      {title:'两行日志各管一件事',body:'Preparing 是交给驱动的预编译文本，参数位置仍是问号。Parameters 按绑定顺序列出值和类型。把它们肉眼拼回去只是帮助阅读，日期和 null 的写法不一定能在客户端原样执行。'},
      {title:'怎样自己验证',body:'把目标 Mapper 包设为 DEBUG，调用一次查询，日志里应同时出现 Preparing 和 Parameters。改成 INFO 后再调用，这两行应消失。不要为了看 SQL 把根 logger 调到 TRACE。'},
    ],
    refs:[['MyBatis：Logging','https://mybatis.org/mybatis-3/logging.html'],['MyBatis Spring Boot','https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-jdbc-log-inlines',
    title:'能对着看的 SQL 在 JDBC 日志里，问号行只是预编译文本',
    prompt:'为什么 MyBatis 已经打了 Parameters，数据库里慢日志里的语句却多了 LIMIT？',
    core:'`Preparing` 停在预编译文本。插件改写发生在语句交给驱动之前，分页加上的 LIMIT、租户条件都会出现在驱动收到的那一版里。要看这一版，在 JDBC 外面包一层：p6spy 仍用 `P6SpyDriver` 和 `jdbc:p6spy:`。Druid 在 Spring Boot 3 用 `druid-spring-boot-3-starter`，不要用只适配 Boot 2 的 starter。这个 starter 里 StatFilter 默认不启用，要打开 `filter.stat.enabled` 和 `log-slow-sql`，慢 SQL 的默认阈值是 3000 毫秒。把参数填进语句用 Slf4jLogFilter，不要再把 Log4j 1.x 过滤器当现行配置。IDE 里常见的 MyBatis 日志插件是把 Preparing 和 Parameters 两行再拼一次，它读的仍是 MyBatis 日志，拼出来的文本不一定等于驱动日志。填好的文本给人读，时间、二进制和转义不一定能原样贴回客户端。生产优先慢 SQL 阈值，避免每条语句都带上参数。',
    why:'只看 XML 或只看 Preparing，会漏掉分页插件加上的 LIMIT，把“结果只有 20 行”误判成映射写错。全量打印参数还会把口令、证件号写进日志。',
    example:'列表 XML 里没有 LIMIT。p6spy 或 Druid 的可执行 SQL 日志里，同一条语句末尾有 `limit ?, ?`。关掉分页插件再请求，这段 limit 消失。MyBatis 自己的 Preparing 行可能仍是 XML 里的原文，或是拦截器改写后的文本，以你把日志打在哪一层为准。',
    task:'对同一条分页查询对照三处：XML、MyBatis 的 Preparing、JDBC 或连接池日志。标出 LIMIT 第一次稳定出现在哪一层。',
    answer:'JDBC 或连接池日志里的语句带有分页改写后的 LIMIT。XML 是你写的原文。生产用慢 SQL 阈值过滤，不要把每一条参数都长期打出来。',
    keywords:'p6spy Druid JDBC SQL log slow SQL',
    points:['JDBC 代理或连接池日志能看到改写后的语句','Boot 3 用 druid-spring-boot-3-starter，StatFilter 要显式打开','生产用慢 SQL 阈值，填参文本不一定能原样执行'],
    deep:[
      {title:'日志打在哪一层',body:'MyBatis 的 DEBUG 告诉你映射出了什么语句、参数是什么。驱动或连接池日志告诉你插件改写之后、真正交给数据库的是什么。两层不一致时，以靠近驱动的那一层解释结果行数。'},
      {title:'怎样自己验证',body:'打开分页后请求一次列表，在 JDBC 日志里找 LIMIT。关掉分页插件再请求，LIMIT 应消失。确认慢查询阈值生效时，快查询不再逐条打印参数。'},
    ],
    refs:[['p6spy','https://p6spy.readthedocs.io/en/latest/configandusage.html'],['Druid','https://github.com/alibaba/druid']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-debug-boundsql',
    title:'SQL 断点打在带 BoundSql 的 Executor.query',
    prompt:'为什么在 Mapper 方法上打断点，调试器进不去，也看不到要执行的 SQL？',
    core:'Mapper 接口由 `MapperProxy` 代理，方法没有字节码可以单步。调用会进 `SqlSession`，再到 `Executor`。断点打在 `org.apache.ibatis.executor.BaseExecutor` 里已经带 `BoundSql` 参数的 `query` 或 `update` 上。`MappedStatement.getId()` 是接口全名加方法名，用它做条件断点，避免每条 SQL 都停住。`BoundSql.getSql()` 是插件改写之后的文本，分页的 LIMIT 会出现在这里，XML 原文里可以没有。参数绑定发生在 `ParameterHandler.setParameters`。生产进程不要留这个断点。',
    why:'断在接口上只能停在调用方。XML 也不是可执行的方法，调试器不会按 XML 行号往下走。于是会觉得“SQL 没法断”。',
    example:'条件写成 `ms.getId().endsWith("OrderMapper.findById")`，打在带 `BoundSql` 的那个 `query` 上。停住后 `boundSql.getSql()` 含有 `?`。再单步到 `PreparedStatement`，能看到 `setLong`。对分页查询，同一处的 SQL 末尾已经有 LIMIT，尽管 XML 里没写。',
    task:'给一条已知的查询设条件断点，写下停住时的 statement id，并确认分页查询的 BoundSql 里有没有 LIMIT。',
    answer:'停住时的 id 是接口全名加方法名。BoundSql 是改写后的语句。Mapper 接口没有方法体，XML 也不会被单步执行。',
    keywords:'MyBatis BoundSql MappedStatement BaseExecutor debugger',
    points:['断点打在带 BoundSql 的 Executor.query 或 update','用 statement id 过滤，BoundSql 是改写后的语句','Mapper 接口没有方法体，XML 不能单步'],
    deep:[
      {title:'先看改写后的文本',body:'分页、租户这类拦截器在进 JDBC 之前改 BoundSql。断在业务方法上只能看到入参，看不到 LIMIT 从哪来。和 `mybatis-jdbc-log-inlines` 对得上的，是这里的 BoundSql，以及更下面驱动收到的语句。'},
      {title:'怎样自己验证',body:'在带 BoundSql 的 query 上加条件断点，只命中目标方法。停住后读 getId 和 getSql。再对一条会分页的查询重复一次，SQL 末尾应出现 LIMIT。确认后把断点去掉。'},
    ],
    refs:[['MyBatis：Java API','https://mybatis.org/mybatis-3/java-api.html'],['MyBatis：plugins','https://mybatis.org/mybatis-3/configuration.html#plugins']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-pagehelper-next-query',
    title:'PageHelper.startPage 只分页本线程的下一次查询',
    prompt:'为什么 startPage 写在前面，分页却落到了另一条 SQL 上，或者下一个请求突然多了 LIMIT？',
    core:'现行插件类是 `com.github.pagehelper.PageInterceptor`。顺序是：先 startPage，再执行本线程的下一次查询；分页插件只作用于这一次。边界是：中间若先跑了别的查询，分页会打到那一次上，而不是你以为的那条业务 SQL。`PageHelper` 是默认方言，`startPage` 仍是调用入口，不要再把旧类名 `com.github.pagehelper.PageHelper` 注册成拦截器。Spring Boot 3 用 2.x 的 `pagehelper-spring-boot-starter`（PageHelper 6，JDK 17）；Spring Boot 4 用 4.x starter。两代 starter 不能混用。`startPage` 把页码放进当前线程的 ThreadLocal。紧跟着的第一条 MyBatis 查询会被改成当前数据库方言的 LIMIT，默认再发一条同步 COUNT；异步 count 要另外打开。拦截器跑完会在 finally 里清掉这个 ThreadLocal。若 startPage 之后的分支没有执行查询，拦截器没机会清，参数留在线程上；线程回到池里再接下一个请求时，不该分页的查询会吃掉这一页。安全写法是确认即将查询再 startPage；分支可能跳过查询时，在 finally 里调用 `PageHelper.clearPage`。这和 `mybatis-rowbounds-memory` 不同：RowBounds 默认在内存里截结果，PageHelper 改的是 SQL。不要再叠一套分页拦截器。',
    why:'startPage 之后先查了字典，字典被 LIMIT 成 10 行，订单列表反而没分页。空参数跳过查询又不 clearPage 时，下一个请求会莫名少一页。',
    example:'`startPage(1, 10)` 然后 `dictMapper.findAll()` 再 `orderMapper.list()`。日志里 findAll 带 LIMIT，list 没有。把 startPage 挪到 list 前一行，只有 list 带 LIMIT，并且多一条 COUNT。若 list 被 if 跳过且没有 clearPage，同一工作线程上的下一次查询可能带上这一页。',
    task:'在 startPage 和目标查询之间插入另一条 SELECT，看 LIMIT 落在哪条。再让目标查询不执行且不 clearPage，用同一线程发下一次查询，看 LIMIT 还在不在。',
    answer:'LIMIT 落在 startPage 之后的第一条查询。查询被跳过又不 clearPage，分页参数会留在这个线程上。默认还会多一条同步 COUNT。拦截器注册 PageInterceptor，starter 要和 Spring Boot 的大版本一致。',
    keywords:'PageHelper startPage ThreadLocal clearPage COUNT',
    points:['插件类是 PageInterceptor，startPage 仍是调用入口','查询被跳过时要 clearPage，避免线程池串页','它改写 SQL，默认再发一条同步 COUNT'],
    deep:[
      {title:'参数绑在线程上',body:'页码不在方法参数里，而在 ThreadLocal。查询真的进了执行器，finally 会清掉。查询根本没被调用，这段参数就留给后面复用这条线程的人。这和一次请求里写了几次 startPage 无关，关键是下一条谁先执行。'},
      {title:'怎样自己验证',body:'在目标查询前插入一条别的 SELECT，确认 LIMIT 出现在插入的那条上。再走一条会跳过查询的分支且不调用 clearPage，下一次查询的日志里应出现不该有的 LIMIT。补上 clearPage 后，这条多余的 LIMIT 应消失。'},
    ],
    refs:[['PageHelper：如何使用','https://pagehelper.github.io/docs/howtouse/'],['MyBatis：plugins','https://mybatis.org/mybatis-3/configuration.html#plugins']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-plus-page-argument',
    title:'MyBatis-Plus 用 Page 参数分页，不要再叠 PageHelper',
    prompt:'为什么 Mapper 已经传了 Page，SQL 里却有两段 LIMIT，或者已删除的行还能查出来？',
    core:'Spring Boot 3 用 `mybatis-plus-spring-boot3-starter`。`mybatis-plus-boot-starter` 是 Boot 2 的包。分页写在 `MybatisPlusInterceptor` 上的 `PaginationInnerInterceptor`，多个 InnerInterceptor 时分页放在最后。调用方把 `Page` 或 `IPage` 传进 Mapper，插件按这个对象改写 SQL，并把总数填回 Page。3.4 起不要再配已经换掉的 `PaginationInterceptor`。3.5.9 起分页依赖拆出去：JDK 11 及以上加 `mybatis-plus-jsqlparser`，JDK 8 才用 `mybatis-plus-jsqlparser-4.9`，少了这个包会在运行时缺类。分页参数在方法上，不占用 ThreadLocal。两套拦截器一起改同一条 SQL，会叠两段 LIMIT，或把总数算乱。3.5.9 起通用层文档建议 `IRepository` / `CrudRepository`，`IService` 不再是现行入口；Mapper 仍只放 SQL。`@TableLogic` 自动加到 MyBatis-Plus 生成的语句上，手写 XML 要自己写删除条件。',
    why:'少了 jsqlparser 模块，分页在运行时缺类。旧拦截器和新插件同时改写，列表变成 0 行。逻辑删除只在自动生成的方法上生效时，手写查询仍能查出已删行。',
    example:'`orderMapper.selectPage(new Page<>(1, 20), wrapper)` 的日志里是一条数据 SQL 加一条 COUNT，只有一段 LIMIT。同一调用再 `PageHelper.startPage`，语句里会出现两次 limit。自定义 XML 不写删除标记时，已逻辑删除的订单仍在结果里。',
    task:'去掉 PageHelper，数一次分页查询里的 LIMIT 段数。再对手写 XML 查一条已逻辑删除的行，确认删除条件要自己写。',
    answer:'Boot 3 用 spring-boot3-starter，并另加 mybatis-plus-jsqlparser。分页拦截器放在 InnerInterceptor 链的最后，查询对应一段 LIMIT 和可选的 COUNT。手写 XML 不会自动带上逻辑删除条件。通用层用 IRepository，不要再把 IService 当现行入口。',
    keywords:'MyBatis-Plus PaginationInnerInterceptor Page TableLogic',
    points:['Boot 3 用 spring-boot3-starter，分页要另加 jsqlparser 模块','分页 InnerInterceptor 放在链的最后，不要再叠 PageHelper','逻辑删除只管自动生成的语句，通用层用 IRepository'],
    deep:[
      {title:'参数跟着这次调用',body:'Page 是这次方法的入参，插件从参数里读页码，查完把 records 和 total 写回去。它不依赖“紧跟着的下一条查询”。所以服务里先查字典、再查订单，不会把页码错安到字典上。'},
      {title:'怎样自己验证',body:'只注册 PaginationInnerInterceptor，调用 selectPage，日志里应只有一段 LIMIT。再加上 PageHelper.startPage，看 LIMIT 是否变成两段。最后用一条不带删除条件的手写 XML 查询已删除行，结果应仍能查到。'},
    ],
    refs:[['MyBatis-Plus：分页插件','https://baomidou.com/plugins/pagination/'],['MyBatis-Plus：安装','https://baomidou.com/getting-started/install/'],['MyBatis-Plus：数据层接口','https://baomidou.com/guides/data-interface/']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-middleware-layers',
    title:'中间件按层分工：日志、分页、池、选库、分片',
    prompt:'面试问项目里 MyBatis 用了哪些中间件，为什么报出一串名字，仍然说不清 SQL 是谁改的？',
    core:'先按层说，再说这个项目用了哪一个、和哪一代 Spring Boot 匹配的包。顺序是：选库决定拿哪条连接；拦截器改分页或附加条件；连接池或 JDBC 代理让你看见最终 SQL；分片在数据源之下把逻辑表改成真实表。边界是：Spring 的 `@Transactional` 一开始拿到的连接会用到提交，中途再标 `@DS` 换不了这条连接；`@DSTransactional` 可以按库切换提交，但它不是 XA。MyBatis 3.5 自己把 Mapper 方法绑到语句。分页、租户、乐观锁、禁止无条件更新，都是拦截器：PageHelper 6 的插件类是 `PageInterceptor`，MyBatis-Plus 是 InnerInterceptor，分页那个要放在链的最后，见 `mybatis-pagehelper-next-query` 和 `mybatis-plus-page-argument`。带问号的 SQL 用 MyBatis 的 DEBUG；填好参数的 SQL 用 p6spy，或 Boot 3 的 `druid-spring-boot-3-starter` 打开 StatFilter / Slf4jLogFilter。Boot 3 的选库包是 `dynamic-datasource-spring-boot3-starter`。ShardingSphere-JDBC 在数据源之下改写表名。MyBatis Generator 只在开发时生成代码，不出现在运行链上。',
    why:'把 Druid 说成分页插件，或分页插件和分片各改一次 LIMIT，排障时会对着 XML 找一个运行时才出现的表名。',
    example:'一次订单列表：`@DS("slave")` 选从库，分页拦截器加上 LIMIT，若启用了 ShardingSphere，再把 `t_order` 改成 `t_order_03`。Druid 慢日志里看到的是最终语句。Generator 不出现在这条链上。同一个 `@Transactional` 里先访问主库再标 `@DS("slave")`，第二条仍走事务已经持有的连接。要按库分开提交，用 `@DSTransactional`，不要把它当成一次 XA。',
    task:'画一条查询经过的层：数据源路由、MyBatis 拦截器、连接池或 JDBC 代理、分片改写。每一层只留一个产品，并写上它改的是连接、语句还是表名。',
    answer:'路由决定拿哪个库的连接。Spring 事务里中途换 @DS 换不了已经取出的连接，按库切换提交用 @DSTransactional。拦截器改分页和附加条件，池或 p6spy 负责看见最终 SQL，分片在更下面改表名。Boot 3 用带 boot3 的 starter。代码生成器不在运行链上。',
    keywords:'MyBatis PageHelper Druid dynamic-datasource ShardingSphere',
    points:['分页插件类和 Boot 3 starter 要按现行文档写','Spring 事务里换不了已取出的连接，@DSTransactional 不是 XA','生成器只在开发时用，运行中的 SQL 要看改写之后'],
    deep:[
      {title:'面试时按层对到已有的课',body:'`#{}` 和 `${}` 看 `mybatis-parameters`。一级缓存跟着 SqlSession 看 `mybatis-local-cache`。插件拦的是执行器看 `mybatis-plugin-interceptor`。RowBounds 默认在内存里截看 `mybatis-rowbounds-memory`。打印两行日志、JDBC 上的最终 SQL、Executor 断点、PageHelper 和 MyBatis-Plus 是这一组。'},
      {title:'怎样自己验证',body:'列出项目依赖里和 MyBatis 相关的包，把每个包填进路由、拦截器、池或代理、分片、生成器这五格。两套分页或“分页再加分片分页”同时出现时，留一套，再用 JDBC 日志确认只剩一段 LIMIT。'},
    ],
    refs:[['dynamic-datasource','https://github.com/baomidou/dynamic-datasource-spring-boot-starter'],['ShardingSphere','https://shardingsphere.apache.org/document/current/en/overview/']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_40) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
