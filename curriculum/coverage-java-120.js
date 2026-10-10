/* Java 120: Spring / JPA / MyBatis / Spring Security / JUnit 是什么。 */
const COVERAGE_JAVA_120 = [
  {
    track:'java', group:'Spring', id:'spring-what-it-is',
    title:'Spring 是给 Java 应用装配对象的应用框架',
    prompt:'订单服务、库存客户端这些对象，是谁在启动时创建并接上依赖的？',
    promptAnswer:'是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。',
    core:'Spring Framework 是给 Java 应用提供编程和配置模型的应用框架。核心是控制反转（Inversion of Control，IoC）：容器创建对象，再按类型或名字注入依赖。你写的是业务类和配置，对象图由容器在启动时接好。装配见 `spring-ioc-wiring`。Bean 的生命周期见 `spring-bean-lifecycle`。',
    example:'一个会被容器创建的服务：\n\n```java\n@Service\nclass OrderService {\n  OrderService(InventoryClient inventory) {}\n}\n```',
    task:'用文档里的说法说明 Spring 是什么。谁在启动时创建对象并注入依赖？',
    answer:'Spring 是给 Java 应用装配对象的应用框架。容器在启动时创建对象并按类型或名字注入依赖。',
    keywords:'Spring IoC container dependency injection',
    points:['Spring 是装配对象的应用框架','核心是控制反转','容器在启动时创建并注入依赖'],
    deep:[
      {title:'模块按需用',body:'Web 请求用 Spring MVC，切面用 AOP，事务用声明式事务。它们建立在同一套容器上，不是另三个框架。'},
      {title:'怎样自己验证',body:'打开 Spring Framework 概述，对上 programming and configuration model。写一个带构造器依赖的 @Service，启动后确认依赖已经被注入，而不是在请求里自己 new。'},
    ],
    refs:[['Spring Framework：Overview','https://docs.spring.io/spring-framework/reference/overview.html'],['Spring：IoC 容器','https://docs.spring.io/spring-framework/reference/core/beans.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-enter-boot',
    title:'Spring Boot 启动一个已经装配好的应用',
    prompt:'现在新建一个 Web 应用，文档建议用哪一套来启动 Spring 容器？',
    promptAnswer:'用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。',
    core:'日常新应用用 Spring Boot 启动。@SpringBootApplication 标在主类上，SpringApplication.run 创建容器、刷新，并按 classpath 上的 starter 自动配置。内嵌 Tomcat 默认用 NIO，见 `tomcat-nio-not-bio-default`。外部配置见 `spring-external-config`。容器装配本身见 `spring-what-it-is`。',
    example:'入口：\n\n```java\n@SpringBootApplication\nclass PayApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(PayApplication.class, args);\n  }\n}\n```',
    task:'说明谁启动容器。自动配置根据什么来决定装哪些 Bean？',
    answer:'SpringApplication.run 启动容器。自动配置根据 classpath 上的 starter 和条件来装 Bean。',
    keywords:'Spring Boot SpringApplication autoconfiguration',
    points:['新应用用 Spring Boot 启动容器','主类调用 SpringApplication.run','自动配置看 classpath 和条件'],
    deep:[
      {title:'Boot 不是另一套容器',body:'跑起来的仍是 Spring 容器。Boot 负责启动、自动配置和默认约定。手工 new AnnotationConfigApplicationContext 也能装配，只是现在不是默认入口。'},
      {title:'怎样自己验证',body:'用 start.spring.io 生成一个 Web 项目，运行主类。确认日志里出现 Tomcat started，并在 /actuator 或一个 @GetMapping 上看到容器已经响应。'},
    ],
    refs:[['Spring Boot：Getting Started','https://docs.spring.io/spring-boot/reference/using/index.html'],['Spring Boot：SpringApplication','https://docs.spring.io/spring-boot/reference/using/spring-boot-applications.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-not-the-business',
    title:'Spring 装配对象，不代替业务规则和 SQL',
    prompt:'容器启动成功了，是不是订单能不能超卖也已经由框架保证？',
    promptAnswer:'不是。容器只保证对象被接上。超卖、库存和事务边界仍要你写清楚。',
    core:'容器解决的是谁创建对象、依赖从哪来。请求怎么进控制器见 `spring-mvc-dispatch`。事务边界见 `spring-transaction`。对象怎么落到表上，去 JPA 或 MyBatis。业务规则不在 @Service 这三个音节里。',
    example:'装配成功，规则仍在你的方法里：\n\n```java\n@Transactional\npublic void pay(Order order) {\n  if (order.paid()) throw new IllegalStateException();\n}\n```',
    task:'说明容器保证什么、不保证什么。超卖和 SQL 该去哪一类课？',
    answer:'容器保证对象被创建并注入。不保证超卖和 SQL 正确。事务回 Spring 事务课，SQL 回 JPA 或 MyBatis。',
    keywords:'Spring container transaction business rule',
    points:['容器只管装配','业务规则仍在你的方法里','SQL 去 JPA 或 MyBatis'],
    deep:[
      {title:'注解不是魔法',body:'@Transactional 要经过代理才生效，见 `spring-aop-self-invocation`。自己类里 this.pay() 不会开事务，不是容器没启动。'},
      {title:'怎样自己验证',body:'写一个 @Service 方法里故意抛业务异常。启动成功，调用失败。说明装配和业务是两步。'},
    ],
    refs:[['Spring：Data Access','https://docs.spring.io/spring-framework/reference/data-access.html'],['Spring：Transaction Management','https://docs.spring.io/spring-framework/reference/data-access/transaction.html']]
  },
  {
    track:'java', group:'JPA', id:'jpa-what-it-is',
    title:'JPA 是管理关系数据与实体的持久化规范',
    prompt:'对象上的字段要和表上的列对上，Java 这边用的是哪一份规范？',
    promptAnswer:'用 Jakarta Persistence，也就是 JPA。它规定实体、持久化上下文和怎样把对象与表对应起来。',
    core:'Jakarta Persistence（JPA）是管理关系数据的持久化规范。实体（entity）是有主键的对象，身份靠主键，见 `jpa-entity-identity`。Hibernate 是常见实现。你操作的是持久化上下文里的实体，不是随手拼的一行 SQL 快照。会话里为什么会 N+1，见 `jpa-session-nplus1`。',
    example:'一个实体：\n\n```java\n@Entity\nclass Order {\n  @Id Long id;\n  String status;\n}\n```',
    task:'用文档里的说法说明 JPA 是什么。实体的身份靠什么？它是规范还是某一种实现？',
    answer:'JPA 是管理关系数据与实体的持久化规范。实体身份靠主键。Hibernate 是常见实现，不是规范本身。',
    keywords:'JPA Jakarta Persistence entity Hibernate',
    points:['JPA 是持久化规范','实体身份靠主键','Hibernate 是常见实现'],
    deep:[
      {title:'持久化上下文不是连接本身',body:'同一上下文里同一个主键是同一个对象。提交时按脏检查生成 SQL，见 `jpa-dirty-check`、`jpa-flush-transaction`。'},
      {title:'怎样自己验证',body:'打开 Jakarta Persistence 规范概述，对上 entity 和 persistence context。用同一主键在一次会话里查两次，确认得到同一个 Java 对象。'},
    ],
    refs:[['Jakarta Persistence','https://jakarta.ee/specifications/persistence/3.2/'],['Spring Data JPA','https://docs.spring.io/spring-data/jpa/reference/']]
  },
  {
    track:'java', group:'JPA', id:'jpa-enter-entity',
    title:'实体进持久化上下文，才被会话管理',
    prompt:'new 出来的 Order 什么时候才会被当成这张表上的一行来管？',
    promptAnswer:'persist 或由查询加载之后。它进入持久化上下文，会话结束前的改动会被刷到数据库。',
    core:'new Order() 只是普通对象。persist、merge 或查询把它放进持久化上下文（persistence context）之后，才由会话管理。提交时 flush 对照快照生成 SQL，见 `jpa-flush-transaction`。OSIV 把会话拉到请求结束，见 `jpa-osiv-boundary`。',
    example:'保存一个新订单：\n\n```java\norderRepository.save(order);\n```',
    task:'说明 new 出来的对象什么时候被会话管理。提交时谁去生成 SQL？',
    answer:'persist 或查询加载之后进入持久化上下文，才被会话管理。提交时 flush 按脏检查生成 SQL。',
    keywords:'persist persistence context flush',
    points:['new 出来的对象还不是托管实体','进入持久化上下文后才被会话管理','提交时 flush 生成 SQL'],
    deep:[
      {title:'会话关闭后再点关联会失败',body:'懒加载要在会话还在时发生。把实体当 DTO 传出层外，关联可能在渲染时才被点到，见 `jpa-session-nplus1`。'},
      {title:'怎样自己验证',body:'persist 一个新实体，不提交就查同一主键，确认会话里能看见。关掉会话再点懒关联，确认失败。'},
    ],
    refs:[['Jakarta Persistence：Entity Operations','https://jakarta.ee/specifications/persistence/3.2/jakarta-persistence-spec-3.2#entity-operations'],['Hibernate：Flushing','https://docs.jboss.org/hibernate/orm/6.6/userguide/html_single/Hibernate_User_Guide.html#flushing']]
  },
  {
    track:'java', group:'JPA', id:'jpa-not-mybatis',
    title:'JPA 管实体，MyBatis 管你写的 SQL',
    prompt:'要把一条手写的复杂报表 SQL 原样发出去，该先找 JPA 还是 MyBatis？',
    promptAnswer:'先找 MyBatis。JPA 的主模型是实体和持久化上下文。原样写 SQL 是 MyBatis 的路。',
    core:'JPA 让你操作实体，由实现生成或配合 JPQL 访问表。MyBatis 让你写 SQL，再把结果映射到对象，见 `mybatis-what-it-is`。两者都可以接 Spring 事务，但对象模型和 SQL 的归属不同。不要在同一张订单表上同时用两套当成同一条会话。',
    example:'分工：\n\n```text\n改订单状态、维护关联   JPA 实体\n报表、复杂 JOIN 列表   MyBatis SQL\n```',
    task:'说明 JPA 和 MyBatis 各把什么当作主模型。手写报表 SQL 去哪一边？',
    answer:'JPA 的主模型是实体和持久化上下文。MyBatis 的主模型是你写的 SQL。手写报表 SQL 去 MyBatis。',
    keywords:'JPA MyBatis SQL entity',
    points:['JPA 主模型是实体','MyBatis 主模型是 SQL','不要把两套当成同一条会话'],
    deep:[
      {title:'可以在一个应用里并存',body:'事务仍由 Spring 管。并存时按用例选模型：写聚合用实体，读报表用手写 SQL。不要在同一次 flush 里混两套脏检查。'},
      {title:'怎样自己验证',body:'打开两个官方首页：一边是 entity / persistence context，一边是 SQL mapping。对照你要写的那条语句落在哪一句定义里。'},
    ],
    refs:[['Jakarta Persistence','https://jakarta.ee/specifications/persistence/3.2/'],['MyBatis：Introduction','https://mybatis.org/mybatis-3/index.html']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-what-it-is',
    title:'MyBatis 把你写的 SQL 映射到对象',
    prompt:'接口方法一调用，谁去执行那条 SQL，并把列填进对象？',
    promptAnswer:'是 MyBatis。它是 SQL 映射框架：语句写在映射里，运行时绑定参数并映射结果。',
    core:'MyBatis 是 SQL 映射框架。你写出语句，再通过映射器（mapper）接口调用。参数怎么进 SQL 见 `mybatis-parameters`。列怎么进对象见 `mybatis-resultmap`。它不维护 JPA 那样的持久化上下文，也不是把实体当主模型。',
    example:'一个映射器方法：\n\n```java\n@Select("SELECT id, status FROM orders WHERE id = #{id}")\nOrder findById(long id);\n```',
    task:'用文档里的说法说明 MyBatis 是什么。SQL 写在哪？谁把列填进对象？',
    answer:'MyBatis 是 SQL 映射框架。SQL 写在映射里，通过映射器接口调用。框架绑定参数并把列填进对象。',
    keywords:'MyBatis SQL mapper ResultMap',
    points:['MyBatis 是 SQL 映射框架','语句写在映射里，经映射器调用','结果按映射填进对象'],
    deep:[
      {title:'#{} 和字符串拼接不是一回事',body:'参数占位由框架绑定，见 `mybatis-parameters`。自己拼字符串会走到 SQL 注入。动态 SQL 有专门的写法，见 `mybatis-dynamic-sql`。'},
      {title:'怎样自己验证',body:'打开 MyBatis 介绍，对上 SQL mapping。调用一个 @Select 方法，在日志里看 Preparing 和 Parameters，确认语句是你写的那条。'},
    ],
    refs:[['MyBatis：Introduction','https://mybatis.org/mybatis-3/index.html'],['MyBatis：Mapper XML','https://mybatis.org/mybatis-3/sqlmap-xml.html']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-enter-mapper',
    title:'映射器接口绑到一条语句，调用才执行',
    prompt:'只写了一个 Java 接口，没有写实现类，谁在运行时执行 SQL？',
    promptAnswer:'MyBatis 给这个接口做绑定。方法对应一条语句，调用时才执行。',
    core:'映射器是接口。XML 或注解把方法绑到一条语句，见 `mybatis-mapper-bound`。Spring 里把接口声明为 Bean，业务代码注入接口。本地缓存和执行器见 `mybatis-local-cache`、`mybatis-batch-executor`。',
    example:'接口与语句同名：\n\n```java\ninterface OrderMapper {\n  Order findById(long id);\n}\n```',
    task:'说明映射器是类还是接口。方法什么时候才执行 SQL？谁提供实现？',
    answer:'映射器是接口。调用方法时才执行 SQL。MyBatis 按映射提供运行时绑定，不是你手写实现类。',
    keywords:'mapper interface binding SQL',
    points:['映射器是接口不是实现类','方法绑到一条语句','调用时才执行'],
    deep:[
      {title:'命名空间要对上',body:'XML 的 namespace 是接口全名，id 是方法名。对不上就不是这条语句，见 `mybatis-mapper-bound`。'},
      {title:'怎样自己验证',body:'把 XML 里的 id 改错，调用时确认绑定失败。改回之后日志里出现你写的 SQL。'},
    ],
    refs:[['MyBatis：Mapper Interfaces','https://mybatis.org/mybatis-3/java-api.html'],['MyBatis：Getting started','https://mybatis.org/mybatis-3/getting-started.html']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-not-jpa',
    title:'MyBatis 不托管实体生命周期',
    prompt:'查出一个对象、改了字段还没 update，MyBatis 会不会在提交时自动写出 UPDATE？',
    promptAnswer:'不会。MyBatis 没有 JPA 那样的脏检查。要改库，再调用一条更新语句。',
    core:'MyBatis 执行你写出的语句。没有持久化上下文，也没有按快照自动生成 UPDATE。脏检查和 flush 属于 JPA，见 `jpa-dirty-check`。本地一级缓存只缓存同一会话里的查询结果，见 `mybatis-local-cache`。',
    example:'改状态要写更新：\n\n```java\norderMapper.updateStatus(id, "PAID");\n```',
    task:'说明 MyBatis 会不会在提交时按字段变化自动 UPDATE。要改库该怎么办？',
    answer:'不会自动 UPDATE。要改库再调用一条更新语句。脏检查属于 JPA。',
    keywords:'MyBatis dirty checking update SQL',
    points:['MyBatis 没有脏检查','改库要再写更新语句','一级缓存不是持久化上下文'],
    deep:[
      {title:'二级缓存更要小心',body:'跨会话的二级缓存容易和对象身份缠在一起，见 `mybatis-second-cache`。默认先把一级缓存和语句本身搞清楚。'},
      {title:'怎样自己验证',body:'查出对象，改字段，提交，再查库。没有 update 语句时库里的值不变。JPA 托管实体在同一次事务里改字段，提交后库会变。'},
    ],
    refs:[['MyBatis：Introduction','https://mybatis.org/mybatis-3/index.html'],['MyBatis：Mapper XML update','https://mybatis.org/mybatis-3/sqlmap-xml.html']]
  },
  {
    track:'java', group:'安全', id:'spring-security-what',
    title:'Spring Security 是认证和授权的框架',
    prompt:'HTTP 请求进应用之后，谁先问「你是谁」和「你能不能做这件事」？',
    promptAnswer:'是 Spring Security。它用过滤器链做认证和授权，不是只提供一个登录页。',
    core:'Spring Security 是给 Java 应用做认证（authentication）和授权（authorization）的框架。请求经过过滤器链，先确认主体，再看这个主体能不能访问这个资源。过滤器链见 `spring-security-filter-chain`。认证和授权不是同一个词，见 `spring-authn-authz`。对象级授权见 `object-level-authz`。',
    example:'一条链上的两问：\n\n```text\n认证   这个请求的主体是谁\n授权   这个主体能不能访问 /orders/1\n```',
    task:'用文档里的说法说明 Spring Security 是什么。认证和授权各问哪一句？',
    answer:'Spring Security 是认证和授权框架。认证问你是谁，授权问你能不能访问这个资源。',
    keywords:'Spring Security authentication authorization filter',
    points:['Spring Security 是认证和授权框架','请求走过滤器链','认证和授权是两问'],
    deep:[
      {title:'登录页只是认证的一种入口',body:'表单、HTTP Basic、OAuth2 资源服务器都是在回答「你是谁」。不要把框架理解成「自带一个 /login」。'},
      {title:'怎样自己验证',body:'打开 Spring Security 概述，对上 authentication 和 authorization。访问一个受保护路径不带凭证，确认被过滤器拦下，还没进控制器。'},
    ],
    refs:[['Spring Security：Introduction','https://docs.spring.io/spring-security/reference/servlet/getting-started.html'],['Spring Security：Architecture','https://docs.spring.io/spring-security/reference/servlet/architecture.html']]
  },
  {
    track:'java', group:'安全', id:'spring-security-enter-chain',
    title:'过滤器链在控制器之前拦住请求',
    prompt:'没带登录态的请求，是在控制器方法里才失败，还是更早？',
    promptAnswer:'更早。Security 过滤器链在 DispatcherServlet 之前处理，未认证就回 401 或登录页。',
    core:'Spring Security 的过滤器排在 Servlet 过滤器链里，通常在 MVC 的 DispatcherServlet 之前。未认证的请求到不了 @GetMapping。授权失败是 403，不是 401，见 `http-status-auth` 的语义。CSRF 对浏览器会话见 `spring-csrf-spa`。',
    example:'顺序：\n\n```text\n过滤器链 → 认证 / 授权 → DispatcherServlet → 控制器\n```',
    task:'说明未认证请求停在哪一层。401 和 403 哪一个是「没通过认证」？',
    answer:'停在 Security 过滤器链，到不了控制器。401 是没通过认证，403 是已认证但没权限。',
    keywords:'SecurityFilterChain DispatcherServlet 401 403',
    points:['过滤器链在控制器之前','未认证到不了 @GetMapping','401 和 403 不是同一问'],
    deep:[
      {title:'方法上的注解是第二道',body:'@PreAuthorize 在进入方法前再问一次。对象级授权不能只靠 URL，见 `object-level-authz`。'},
      {title:'怎样自己验证',body:'给一个接口加上认证要求，不带 Cookie 访问。确认响应在过滤器阶段返回，控制器里的日志没有出现。'},
    ],
    refs:[['Spring Security：Filter Chain','https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-securityfilterchain'],['Spring Security：Authorization','https://docs.spring.io/spring-security/reference/servlet/authorization/index.html']]
  },
  {
    track:'java', group:'安全', id:'spring-security-not-only-login',
    title:'Spring Security 不管口令存哪一种哈希以外的业务',
    prompt:'框架接上了，是不是用户表、对象级权限和前端 Cookie 都已经自动正确？',
    promptAnswer:'不是。框架提供过滤器和 API。口令怎么存、这条记录谁能改、浏览器怎么带 Cookie，仍要分开写清。',
    core:'口令要用自适应哈希，见 `password-adaptive-hash`。对象是不是当前用户的，见 `object-level-authz`。前端 Cookie 和 CSRF 见 `cookie-credential`、`spring-csrf-spa`。JWT 的载荷默认不是加密，见 `jwt-payload-not-encrypted`。',
    example:'三件仍然要你写：\n\n```text\n口令     PasswordEncoder\n对象权限  这条订单的 userId\n浏览器   Cookie 属性与 CSRF\n```',
    task:'说明框架自动保证什么。口令、对象级权限、浏览器 Cookie 各回哪一类课？',
    answer:'框架自动提供过滤器和 API，不自动保证这三件。口令回哈希课，对象权限回对象级授权，Cookie 回浏览器安全与 CSRF。',
    keywords:'PasswordEncoder object authorization CSRF',
    points:['框架提供过滤器不是整套业务安全','口令要自适应哈希','对象级权限和 Cookie 要另写'],
    deep:[
      {title:'资源服务器不是登录页',body:'OAuth2 资源服务器校验访问令牌，见 `spring-oauth2-resource`。它不问浏览器表单，也不代替对象级检查。'},
      {title:'怎样自己验证',body:'登录成功后用另一个用户的 id 打 /orders/1。若只靠「已认证」就 200，对象级授权还没写。'},
    ],
    refs:[['Spring Security：Password Storage','https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html'],['Spring Security：Authorization Architecture','https://docs.spring.io/spring-security/reference/servlet/authorization/architecture.html']]
  },
  {
    track:'java', group:'测试', id:'junit-what-it-is',
    title:'JUnit 是在 JVM 上跑断言的测试框架',
    prompt:'要验证一段 Java 代码的结果，常用哪一个框架来发现和执行测试方法？',
    promptAnswer:'用 JUnit。它发现测试方法，在 JVM 上执行，并用断言对照结果。',
    core:'JUnit 是 Java 的测试框架。JUnit 5 的编程模型在 jupiter：用 @Test 标方法，用断言对照可观察的结果。测试实例的生命周期见 `junit-instance-lifecycle`。一条测试只验证一种行为，见 `test-one-behavior`。',
    example:'一个测试方法：\n\n```java\n@Test\nvoid priceKeepsCents() {\n  assertEquals("1.00", Price.format(100));\n}\n```',
    task:'用文档里的说法说明 JUnit 是什么。测试方法用什么注解标出？断言对照的是什么？',
    answer:'JUnit 是在 JVM 上跑测试的框架。方法用 @Test 标出。断言对照可观察的结果。',
    keywords:'JUnit Jupiter @Test assertion',
    points:['JUnit 是 Java 测试框架','@Test 标出要执行的方法','断言对照可观察结果'],
    deep:[
      {title:'JUnit 不是 Spring',body:'它负责发现和执行测试。要装一部分 Spring 容器，用切片测试，见 `spring-test-slice`。'},
      {title:'怎样自己验证',body:'打开 JUnit 5 用户指南的 Overview。写一个会失败的断言，确认构建失败信息指向这个方法，而不是主类。'},
    ],
    refs:[['JUnit 5：Overview','https://docs.junit.org/current/user-guide/#overview'],['JUnit 5：Writing Tests','https://docs.junit.org/current/user-guide/#writing-tests']]
  },
  {
    track:'java', group:'测试', id:'junit-enter-test',
    title:'构建工具发现测试类，JUnit 执行方法',
    prompt:'写好 @Test 方法之后，谁去找到它并在 JVM 里跑起来？',
    promptAnswer:'Maven 或 Gradle 的测试任务发现测试类，再把执行交给 JUnit 平台。',
    core:'src/test/java 里的测试类由构建工具编译。mvn test 或 gradle test 启动 JUnit 平台，按引擎发现 @Test 方法并执行。默认生命周期里，每个测试方法常对应一个新实例，见 `junit-instance-lifecycle`。可观察结果见 `test-observable-result`。',
    example:'跑全部测试：\n\n```bash\nmvn test\n```',
    task:'说明谁发现测试类、谁执行方法。测试源码通常放在哪一个目录？',
    answer:'构建工具的测试任务发现测试类。JUnit 平台执行方法。源码通常在 src/test/java。',
    keywords:'Maven Gradle JUnit Platform src/test',
    points:['构建工具发现并启动测试','JUnit 平台执行 @Test 方法','测试源码在 src/test/java'],
    deep:[
      {title:'IDE 里的绿条也是同一套',body:'IDE 调用的仍是 JUnit 平台。不要把「点一下运行」理解成另一套不走断言的魔法。'},
      {title:'怎样自己验证',body:'写一个必失败的测试，运行 mvn test。确认报告里有这个方法名和断言信息。删掉 @Test 后再跑，确认它不再被执行。'},
    ],
    refs:[['JUnit 5：Running Tests','https://docs.junit.org/current/user-guide/#running-tests'],['Maven Surefire','https://maven.apache.org/surefire/maven-surefire-plugin/']]
  },
  {
    track:'java', group:'测试', id:'junit-not-the-app',
    title:'测试验证行为，不代替应用进程',
    prompt:'测试绿了，是不是生产里的 Spring 进程和数据库也已经在跑？',
    promptAnswer:'不是。JUnit 跑的是测试进程。生产进程、真实库和容器要另起，或用切片和 Testcontainers。',
    core:'测试进程里可以只测纯函数，也可以用 Spring 切片装一部分容器，见 `spring-test-slice`。要真实数据库方言，用 Testcontainers，见 `testcontainers-real-db`。绿条只说明被执行的那些断言过了，不说明线上进程已经启动。',
    example:'三层不要并成一句：\n\n```text\n单元     纯函数 + JUnit\n切片     @WebMvcTest\n真实引擎  Testcontainers\n```',
    task:'说明测试绿了代表什么。生产进程和真实库分别要什么？',
    answer:'绿了只代表被执行的断言过了。生产进程要另起。真实库用 Testcontainers 或外部实例，不是 JUnit 自带的。',
    keywords:'JUnit Spring test slice Testcontainers',
    points:['JUnit 跑的是测试进程','绿条不表示生产已启动','真实库要用切片或容器'],
    deep:[
      {title:'事务回滚是测试夹具',body:'切片测试里的回滚避免弄脏库，见 `spring-test-transaction-rollback`。它不是生产事务策略。'},
      {title:'怎样自己验证',body:'只跑纯函数测试，确认没有 Tomcat started。再跑一个 @SpringBootTest，确认这次才在测试进程里起了容器。'},
    ],
    refs:[['Spring：Testing','https://docs.spring.io/spring-framework/reference/testing.html'],['Testcontainers：Java','https://java.testcontainers.org/']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_120) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
