/* Spring request/AOP, JVM diagnostics, concurrency, security, tests; frontend TS/Node/ecosystem. */
const COVERAGE_DEPTH_14 = [
  {
    track:'java', group:'Spring', id:'spring-filter-vs-interceptor',
    title:'Filter 包住 Servlet，Interceptor 只跟着 DispatcherServlet',
    prompt:'登录校验写在 Filter 和写在 HandlerInterceptor，差在哪一层？',
    core:'Filter 是 Servlet 规范里的包装：请求进入容器后、到达任何 Servlet 之前就能看见。静态资源、错误页、不是 Spring MVC 处理的路径，只要还走这套 Filter 链，它都能拦。HandlerInterceptor 挂在 DispatcherServlet 的处理链上，只对它映射到的 Handler 生效：preHandle 在控制器之前，postHandle 在返回视图之前，afterCompletion 在整次处理结束之后。已经在 Filter 里改过的字符编码、包装过的 Request，Interceptor 看到的是改完的结果。鉴权若必须覆盖上传、静态和 MVC，放 Filter 或 Security 过滤器链；只跟控制器和 ModelAndView 有关的计时、再放 Interceptor。',
    why:'只在 Interceptor 做登录校验，不经过 DispatcherServlet 的入口会漏掉，静态资源或别的 Servlet 仍能进来。区分信号是 Filter 包住整个 Servlet，Interceptor 只跟着控制器那一条 Handler。',
    example:'安全过滤写在 Filter 链里，请求还没进 Servlet 就被挡住。给控制器记访问日志用 Interceptor 的 preHandle 和 afterCompletion，它看不到不进 DispatcherServlet 的静态资源。两条链不要合成一个钩子。',
    task:'画“容器 → Filter → Servlet → DispatcherServlet → Interceptor → 控制器”。标出静态资源和控制器各经过哪几层。',
    answer:'顺序是容器、Filter、Servlet、DispatcherServlet、Interceptor、控制器。静态资源经过 Filter，不一定进 Interceptor。控制器两者都经过。Filter 包住 Servlet，Interceptor 只跟着 DispatcherServlet 的 Handler。覆盖面不同，不能当成同一个钩子。',
    keywords:'Spring Filter HandlerInterceptor DispatcherServlet 过滤器',
    points:['Filter 在 Servlet 前后工作，不限于 Spring MVC','Interceptor 只处理 DispatcherServlet 映射到的 Handler','更早的 Filter 改过的请求，Interceptor 看到的是改完的结果'],
    deep:[
      {title:'漏掉的是不进 MVC 的请求',body:'Interceptor 挂在 DispatcherServlet 找到 Handler 之后。直接由容器处理的资源、或另一个 Servlet，不会走 preHandle。登录若只写在这里，这些入口没有校验。'},
      {title:'怎样自己验证',body:'画出容器到控制器的链，标出静态资源和控制器各经过哪几层。对一个不进 DispatcherServlet 的路径发请求，确认 Interceptor 没执行，Filter 仍执行。'},
    ],
    refs:[['Spring：Filters','https://docs.spring.io/spring-framework/reference/web/webmvc/filters.html'],['Spring：Interceptors','https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-config/interceptors.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-validation-binding',
    title:'校验发生在绑定之后，失败要变成 400 而不是业务异常',
    prompt:'请求体缺了必填字段，为什么有时进了服务方法，有时直接 400？',
    core:'参数先被绑到对象，再按 Bean Validation 约束检查。控制器参数上的 @Valid / @Validated 触发这次检查。紧挨着的 BindingResult 可以自己处理错误；没有它，失败通常变成 MethodArgumentNotValidException，由异常解析器变成 400。服务层再标 @Validated，检查的是方法参数，进不了控制器的异常解析，容易变成 500。分组校验用来区分“创建”和“更新”不是同一套必填。校验只保证形状和约束，不保证这笔订单在业务上能成立。',
    why:'把校验失败当成服务内部错误，客户端只能看到 500，字段旁也无法按契约提示哪一项缺了。区分信号是控制器上带 Valid 且没有 BindingResult 时方法根本不执行，直接 400。',
    example:'创建订单的请求体缺了 sku。方法参数有 Valid，又没有 BindingResult，控制器方法不会进入，响应是 400 和字段错误。若自己接住 BindingResult 却仍调用服务，失败就进了业务。服务方法上的校验则是另一套异常。',
    task:'给 DTO 加 @NotBlank，分别写带 BindingResult 和不带的控制器，对比状态码。再在服务方法上加 @Validated，看异常类型。',
    answer:'带 Valid 且不写 BindingResult 时，缺字段预测为 400，服务方法不执行。自己声明 BindingResult 时，方法会进入，要自己把错误收成 400，否则可能继续执行。服务层上的校验失败是另一类异常，不要和控制器的 400 混成 500。',
    keywords:'Spring @Valid Bean Validation BindingResult 400',
    points:['先绑定对象，再按约束校验','控制器上校验失败通常是 400','服务方法上的 @Validated 不会自动变成字段级 400'],
    deep:[
      {title:'绑定之后才校验',body:'约束检查发生在请求已经绑到对象上之后。类型都转不成时，还没到这些注解。把两种失败都收成业务异常，客户端就分不清字段错和用例错。类型转换失败时，还到不了这些字段注解。'},
      {title:'怎样自己验证',body:'给 DTO 加 NotBlank，分别写带 BindingResult 和不带的控制器。不带时应直接 400 且方法不执行。再在服务方法上校验，看异常类型是否和服务入口不同。'},
    ],
    refs:[['Spring：Bean Validation','https://docs.spring.io/spring-framework/reference/core/validation/beanvalidation.html'],['Spring：Method validation','https://docs.spring.io/spring-framework/reference/core/validation/beanvalidation.html#validation-beanvalidation-spring-method']]
  },
  {
    track:'java', group:'Spring', id:'spring-aop-proxy-type',
    title:'切面加在代理上，接口走 JDK 代理，类走 CGLIB',
    prompt:'同类里两个方法，为什么事务切面有时根本套不上？',
    core:'Spring AOP 默认用运行时代理。目标类实现了接口，常常生成 JDK 动态代理，调用方拿到的是接口类型。没有合适接口时，用 CGLIB 子类代理。切面、事务、安全注解拦的是“经过代理的调用”，不是源码里随便一次 this 调用。final 类或 final 方法无法被子类代理。要确认当前是哪种代理，看运行时对象的类名，不要背死“一定是 CGLIB”。',
    why:'以为注解写在方法上就一定生效，调用若没经过代理，事务和日志都不会套上。区分信号是运行时类名是 JDK 代理还是 CGLIB 子类，而不是源码里有没有注解。运行时类名才告诉你代理是哪一种。',
    example:'OrderService 实现接口时，注入进来的对象类名常常是 JDK 代理。只有具体类、没有接口时，更常见 CGLIB 生成的子类。打印 getClass 就能分开。同类内部自己调用，两种代理都不会再套一层。',
    task:'打印注入 Bean 的 class。给一个接口实现和一个具体类分别加 @Transactional，对比代理类型。',
    answer:'先打印注入 Bean 的运行时类。有接口的实现预测多半是 JDK 代理，只有类时预测是 CGLIB。两种都只拦截从外面进来的调用。注解是否生效，先看这次调用有没有经过这个代理，再谈代理是哪一种。从类里面自己调用时，两种代理都不会再套上事务。',
    keywords:'Spring AOP JDK proxy CGLIB 动态代理',
    points:['Spring AOP 默认是运行时代理，不是改源码','接口实现常用 JDK 代理，类代理常用 CGLIB','final 类或方法无法按子类方式代理'],
    deep:[
      {title:'类型决定代理种类',body:'JDK 代理只能拦接口上的方法。没有接口时才用子类代理，私有方法和 final 方法仍拦不到。先看运行时类型，避免在拦不到的方法上排事务。final 和私有方法仍然拦不到。'},
      {title:'怎样自己验证',body:'打印注入 Bean 的 class。给一个接口实现和一个具体类分别加上事务，对比代理类型。再从类内部调用带注解的方法，确认日志或事务没有套上。类名里能看出是代理还是你写的类。'},
    ],
    refs:[['Spring：Proxying mechanisms','https://docs.spring.io/spring-framework/reference/core/aop/proxying.html'],['Spring：AOP','https://docs.spring.io/spring-framework/reference/core/aop.html']]
  },
  {
    track:'java', group:'Spring', id:'spring-aop-self-invocation',
    title:'同类里 this.方法() 不会再进一次代理',
    prompt:'save() 上有事务，内部再调 this.publish()，publish 上的事务为什么可能没有？',
    core:'代理只包住从外面进来的那一次调用。对象内部用 this 调另一个方法，调用的是目标实例自己，不再经过代理，事务、权限、重试这些切面都不会再套一层。顺序是：外部调用先进入代理，代理决定要不要开事务，再进目标方法；目标方法里的 this 调用直接进第二个方法，中间没有代理。边界是需要独立事务或独立权限的协作必须拆到另一个 Bean，从外面注入再调用，或在本 Bean 里注入自己的代理后再调。不要靠两个注解写在同一个类里来假设有两次拦截。私有方法和自己 new 出来的对象同样不走容器里的代理。排障时按这个顺序往下看，边界条件不满足就停在这一步，不要把前后两段并成一个原因。',
    why:'同类里 this 再调一个带事务的方法，是事务和方法安全最常见的“注解写了却没生效”。区分信号是从外面调第一个方法时，第二个方法的切面日志不出现。第二个方法的日志不出现，就是没进代理。',
    example:'OrderService.save 调 this.sendEvent。sendEvent 上的 @Transactional(REQUIRES_NEW) 不会开启新事务。把发事件放到 EventPublisher Bean。',
    task:'在同类两个方法上都打日志切面，从外面调第一个，看第二个日志在不在。再拆成两个 Bean 对比。',
    answer:'两个方法都在同一个类、都有日志切面。从外面调第一个，预测只有第一段日志，this 调到的第二个不经过代理。拆成两个 Bean，从外面注入再调，预测两段日志都在。需要独立事务时就按拆开的写法，或显式走代理。拆开之后外面调用时两段日志都应该出现。',
    keywords:'Spring AOP self-invocation 代理 事务',
    points:['代理只拦截从外部进入的调用','this.方法() 不会再次套上切面','要独立事务或权限时，拆 Bean 或走注入的代理'],
    deep:[
      {title:'代理只包外面那一次',body:'切面在代理上。对象内部用 this 调用，走的是目标实例自己的方法，不会再进代理，事务、权限、重试都不会再套一层。两个注解写在同一个类里不等于有两次拦截。自己 new 出来的对象也不走代理。'},
      {title:'怎样自己验证',body:'在同类两个方法上都打日志切面，从外面调第一个，看第二个日志在不在。再拆成两个 Bean 用注入调用，两段日志都应出现。this 那次应只有一段。this 那次应只有外面那一段日志。'},
    ],
    refs:[['Spring：Understanding AOP proxies','https://docs.spring.io/spring-framework/reference/core/aop/proxying.html#aop-understanding-aop-proxies']]
  },
  {
    track:'java', group:'JVM', id:'jvm-safepoint',
    title:'停顿发生在安全点，线程要跑到约定位置才能停',
    prompt:'为什么堆很大时，有的线程迟迟不进入 GC，整次停顿被它拖长？',
    core:'HotSpot 做 Stop-The-World 一类操作时，要等 Java 线程到达安全点：没有正在执行的、无法安全检查根和栈的指令。循环计数、超大无调用的计数循环可能延迟进入安全点，让已经停下的线程空等。GC、部分去优化、部分诊断操作都会用到安全点。看到停顿长，不要只怪堆大小，也要看是不是有线程迟迟不到安全点。日志里的 safepoint 时间要把“等到齐”和“真正干活”分开。',
    why:'把所有停顿都解释成回收算法慢，会错过失控循环迟迟不进安全点、别人空等的时间。区分信号是停顿要分成“等到所有线程停下”和“停下之后的工作”两段。第一段是空等，第二段才是真正在回收对象。',
    example:'一个纯计数、长时间不调用方法的循环迟迟到不了安全点。Young GC 日志里等到齐的时间明显变长，真正清扫未必更慢。把这段循环改成能走到安全点之后，等到齐的时间应降下来。日志里要把两段时间分开抄下来。',
    task:'对照 HotSpot 对 safepoint 的说明，列出两类时间：等到所有线程停、以及停下来之后的工作。',
    answer:'停顿先等所有线程到达安全点，再做回收。有线程迟到，其他线程就空等，所以总时间是两段相加。预测：数清楚的循环会拉长第一段；算法本身慢拉长的是第二段。不要把两段都叫成 GC 算法。两段相加才是你看到的停顿，不能把空等也算成回收器变慢，两段要分开记。',
    keywords:'JVM safepoint STW Time to safepoint HotSpot',
    points:['需要全局停顿时，线程先到达安全点','失控循环可能拖长到达安全点的时间','要把等到齐的时间和停顿内的工作分开'],
    deep:[
      {title:'等到齐才开始回收',body:'安全点是约定可以停下来的位置。线程还在算、没走到那个位置，虚拟机就不能动堆。这段等待会算进停顿，但不是回收器在拷贝对象。线程还在数数时，虚拟机就不能开始回收堆。'},
      {title:'怎样自己验证',body:'对照 HotSpot 对安全点的说明，从一次停顿日志里分出等到齐和真正回收。再跑一个长时间纯计数循环，看第一段是否变长，改掉循环后再比一次。改掉长循环后，第一段时间应降下来。'},
    ],
    refs:[['OpenJDK：Safepoints','https://wiki.openjdk.org/display/HotSpot/Safepoints'],['Oracle：HotSpot 性能增强','https://docs.oracle.com/en/java/javase/21/vm/java-hotspot-virtual-machine-performance-enhancements.html']]
  },
  {
    track:'java', group:'JVM', id:'jvm-jit-tiered',
    title:'先解释执行，热点再编译成机器码',
    prompt:'刚启动时接口慢，跑一会儿又快了，一定是缓存热了吗？',
    core:'字节码先由解释器执行。方法或循环够热，分层编译会把它编译成机器码，必要时还会再优化或去优化。启动阶段大量代码还在解释执行，延迟和 CPU 会差一截。这和业务缓存变热是两件事。基准测试要先预热，再测稳定段；用启动后前几秒的延迟去对比 GC 或框架，会把编译过程当成业务回归。编译并不保证永远更快：假设失效时会去优化，回到较慢路径。',
    why:'把刚启动的慢全部推给框架或数据库，会漏掉热点还在解释执行、尚未编译成机器码。区分信号是丢掉预热之后同一段计算变快，而数据库的数据页并没有因此变热。同一段计算预热后变快，库并没有变。',
    example:'压测开头几十秒 P99 很高，同一计算在预热后再测一窗口就稳定。这更像分层编译：先解释执行，热点再编译。用冷启动那一秒和预热后那一秒对比，才会把编译和业务缓存分开。第一秒里包含的是编译，不是稳定吞吐。',
    task:'对一个计算热点分别测冷启动前 1 秒和预热后 1 秒。说明为什么对比要用预热后的窗口。',
    answer:'冷启动前 1 秒预测更慢，因为还在解释执行。预热后再测 1 秒，热点已经编译，预测变快且更稳。对比必须用预热后的窗口。冷启动慢不能直接写成缓存没热或数据库变慢。把第一秒算进平均值，比出来的是编译过程，不是稳定下来的性能，预热窗口要单独算清楚。',
    keywords:'JVM JIT 分层编译 解释器 预热',
    points:['字节码先解释执行，热点再编译','测稳定性能要先预热','编译假设失效时可能去优化'],
    deep:[
      {title:'预热是在等编译',body:'解释器先跑，调用次数够了才编译。预热不是把数据库页碰巧放进缓存的别名。测性能若把第一秒算进去，比的是编译过程，不是稳定吞吐。调用次数够了，解释器才会把热点编译成机器码。'},
      {title:'怎样自己验证',body:'对一个计算热点分别测冷启动前 1 秒和预热后 1 秒。预热后应更快。再说明为什么两段不能合成一个平均值，否则编译时间会掩盖稳定性能。两段要分开记，不能合成一个数。'},
    ],
    refs:[['Oracle：Java HotSpot VM 性能','https://docs.oracle.com/en/java/javase/21/vm/java-hotspot-virtual-machine-performance-enhancements.html'],['OpenJDK：Compiler synopses','https://wiki.openjdk.org/display/HotSpot/Compiler+Synopses']]
  },
  {
    track:'java', group:'JVM', id:'jvm-thread-vs-heap-dump',
    title:'卡住先看线程，内存涨先看堆，两份快照不要混着用',
    prompt:'接口超时，先 dump 堆还是先看线程栈？',
    core:'线程转储看到每个线程在干什么：锁在等谁、是不是卡在网络或数据库。堆转储看到对象占了哪些内存、谁引用着它们。顺序是先判断现象：超时、死锁、线程池耗尽，先抓线程；堆持续涨、回收之后回不来，再抓堆。边界是堆转储很大、会停顿，不要在还没判断是不是内存问题的时候先抓一份。jcmd 可以按需生成这两类诊断数据，生产上要配合权限和磁盘。两份快照不能互相代替：栈上看不到谁占着老年代，堆上也看不到当前卡在哪一把锁。排障时按这个顺序往下看，边界条件不满足就停在这一步，不要把前后两段并成一个原因。超时和死锁先抓线程转储，内存回不来再抓堆，两份快照不要一起抓，还要留出磁盘空间。',
    why:'每次超时都先抓堆，文件巨大，还会停顿，却看不出当前是谁堵住了请求。区分信号是卡住看线程栈，内存只涨不回才看堆里的引用。堆文件很大，也回答不了工作线程卡在谁身上，栈才能回答这次卡住。',
    example:'接口超时且 CPU 不高时，线程转储里所有工作线程卡在同一把锁，能看到谁持有。内存持续上涨、回收之后不回来，才抓堆看是哪条缓存还被引用。先抓错，文件大且对不上故障。先分清是请求卡住，还是内存回收后不回来。',
    task:'对一次“接口超时”和一次“内存持续涨”分别写出该抓哪一种快照，以及不该先抓哪一种。',
    answer:'接口超时预测先抓线程转储，看阻塞链，不该先抓堆。内存持续涨预测抓堆转储，看谁占着对象，不该先用线程栈解释泄漏。先判断是卡住还是涨内存，再抓对应的那一种快照。抓错文件既停顿，文件对不上这次故障，还让进程停一下，所以先选对快照，不要两份一起抓。',
    keywords:'JVM thread dump heap dump jcmd 死锁 内存泄漏',
    points:['线程转储解释阻塞和死锁','堆转储解释对象保留和泄漏','不要用堆转储去查超时原因'],
    deep:[
      {title:'两份快照回答两个问题',body:'线程转储回答谁在等谁。堆转储回答内存被谁引用。超时、死锁、线程池耗尽用前者。堆涨、回收后不回来用后者。混用会得到一份对不上现象的大文件。栈上看不到老年代里的引用链。'},
      {title:'怎样自己验证',body:'对一次接口超时写出该抓线程、不该先抓堆。对一次内存持续上涨写出该抓堆。确认堆转储更大、会停顿，所以没有内存现象时不要先抓。没有内存现象时不要先付出堆转储的停顿。'},
    ],
    refs:[['Oracle：诊断工具','https://docs.oracle.com/en/java/javase/21/troubleshoot/diagnostic-tools.html'],['Oracle：jcmd','https://docs.oracle.com/en/java/javase/21/docs/specs/man/jcmd.html']]
  },
  {
    track:'java', group:'并发', id:'java-thread-local-leak',
    title:'线程池会复用线程，ThreadLocal 用完必须清掉',
    prompt:'把用户 id 放进 ThreadLocal，为什么下一个请求有时还能读到上一个用户？',
    core:'ThreadLocal 的值挂在当前线程上。线程池里的工作线程会处理很多个请求，值不会在请求结束时自动消失。用完在 finally 里 remove。只 set 不 remove，下一个任务就会看到脏数据，类加载器泄漏也常从这里来。虚拟线程虽然通常一任务一线程，仍然不要依赖“线程结束就消失”来省略清理。能当方法参数传递的上下文，就不要放进 ThreadLocal。',
    why:'过滤器里 set 了用户、业务里忘了 remove，池线程被下一个任务复用时会读到上一个用户，也会把大对象留在线程上。区分信号是第二个任务不 set 却能读到第一个任务的值。第二个任务没 set，却读到了第一个用户。',
    example:'固定大小的池里，第一个任务 set 用户 A。没有 remove 时，第二个任务在同一线程上 get，读到的仍是 A。finally 里 remove 之后，第二个任务读到的是空。异步任务若跑在池线程上，也会踩到上一个请求留下的值。',
    task:'在固定大小线程池里连续两个任务 set 不同值。对比有 remove 和没有 remove 时第二个任务读到什么。',
    answer:'没有 remove 时，第二个任务预测读到第一个任务 set 的值，因为池线程被复用，ThreadLocal 还在。有 remove 时，预测第二个任务读不到。所以用完必须清掉，不能把它当隐式的全局变量传到下一个任务。finally 里 remove 之后，第二个任务应读到空。',
    keywords:'ThreadLocal 线程池 remove 内存泄漏 上下文',
    points:['ThreadLocal 的值跟着线程，不跟着请求','线程池复用线程，必须在 finally 里 remove','能显式传参就不要靠 ThreadLocal'],
    deep:[
      {title:'池线程不会替你清',body:'请求结束不会销毁池里的线程。ThreadLocal 的条目还挂在这条线程上，下一次任务若忘记 set，读到的就是上一次。大对象因此也迟迟到不了可回收。请求结束不会销毁池里的那条线程。'},
      {title:'怎样自己验证',body:'在固定大小线程池里连续两个任务 set 不同的值。去掉 remove，看第二个任务是否读到第一个。加上 finally remove，第二个应读不到。再故意让第二个不 set，确认是空。'},
    ],
    refs:[['ThreadLocal','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ThreadLocal.html'],['ThreadLocal.remove','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ThreadLocal.html#remove()']]
  },
  {
    track:'java', group:'并发', id:'java-fork-join-pool',
    title:'ForkJoin 适合可拆分的计算，不适合堵住工作线程的 IO',
    prompt:'在 parallelStream 里调远程接口，为什么有时整个公共池都卡住？',
    core:'ForkJoinPool 用工作窃取处理可以拆开再合并的任务。parallelStream 默认走公共池，池大小和 CPU 相关。任务里如果阻塞等 IO，工作线程就被占住，别的计算也排队。阻塞式 IO 用普通线程池或异步客户端，把 ForkJoin 留给 CPU 计算。公共池还被 JVM 自己的一些任务共用，不要在里面做长时间阻塞。需要独立隔离时，自建 ForkJoinPool 再提交，不要默认挤公共池。',
    why:'在 parallelStream 里调远程接口，下游一慢，公共池里的工作线程都堵在网络上，同进程其他并行计算一起停。区分信号是纯计算能铺开，阻塞 sleep 或 HTTP 会把池占死。',
    example:'对集合 parallelStream 去调库存 HTTP。下游变慢后，公共池的工作线程都停在网络读，别的 parallelStream 也排不上。同样的集合若只做 CPU 计算，线程会忙在计算上，而不是全部等 I/O。阻塞任务应离开公共池。',
    task:'对比 CPU 计算和阻塞 sleep 两种任务在 parallelStream 下的耗时。写出哪一种不该用公共池。',
    answer:'CPU 计算预测能用满工作线程并较快结束。阻塞 sleep 或远程调用预测把公共池占住，耗时接近最慢的等待，其他并行任务也被拖住。所以阻塞 I/O 不该用 parallelStream 的公共池。ForkJoin 留给可拆分的计算。远程调用按阻塞这一类处理，不要放进公共池。',
    keywords:'ForkJoinPool parallelStream 工作窃取 公共池',
    points:['ForkJoin 用工作窃取处理可拆分任务','parallelStream 默认使用公共池','不要在公共池里做阻塞 IO'],
    deep:[
      {title:'公共池是进程一份',body:'parallelStream 默认用的公共池被所有这种调用共享。一个请求把工作线程耗在下游，另一个请求的并行计算没有线程可用。隔离要换池，而不是再套一层 parallelStream。'},
      {title:'怎样自己验证',body:'对比同一批数据上的 CPU 计算和阻塞 sleep。sleep 那组应把公共池拖住。再在 sleep 期间启动另一段 parallelStream，看它是否明显变慢。远程调用按 sleep 这一类处理。'},
    ],
    refs:[['ForkJoinPool','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ForkJoinPool.html'],['java.util.stream 并行','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html']]
  },
  {
    track:'java', group:'安全', id:'spring-csrf-spa',
    title:'Cookie 会话的浏览器请求仍要防 CSRF，SPA 也不能省',
    prompt:'前后端分离了，是不是可以关掉 CSRF？',
    core:'CSRF 利用浏览器自动带上的 Cookie。只要会话还放在 Cookie 里，跨站表单或请求就可能借用户的登录态改数据。前后端分离只换了页面怎么部署，没有取消自动带 Cookie。常见做法是 Cookie 标 SameSite，再配合 CSRF 令牌或自定义请求头；纯 Bearer Token 放 Authorization、不靠 Cookie 时，浏览器不会自动带这个头，CSRF 面不同。不要用“我们是 SPA”直接 disable csrf。',
    why:'前后端分离就关掉 CSRF，恶意页面仍可借浏览器自动带上的 Cookie 去改数据。区分信号是会话在 Cookie 里就要防，不自动带上的 Authorization 头不是同一条攻击面。',
    example:'会话 Cookie 未设 SameSite。恶意站点发 POST /orders。浏览器带上原站 Cookie。开启 CSRF 或 SameSite=Lax/Strict 后这类请求失败。',
    task:'对照 Spring Security 的 CSRF 说明，列出 Cookie 会话和 Authorization 头两种登录，各自还要不要 CSRF。',
    answer:'Cookie 会话：浏览器会自动带上，预测仍要 CSRF 令牌，SPA 不是豁免。Authorization 头要脚本自己加，恶意页面读不到也不自动带，预测不走同一条 CSRF。对照说明把两种登录分开写，不要因为前后端分离就整站关掉。恶意页面能发出带 Cookie 的请求，但写不出令牌。',
    keywords:'CSRF SameSite Cookie SPA Spring Security',
    points:['CSRF 利用浏览器自动携带的 Cookie','前后端分离不能单独作为关闭 CSRF 的理由','Bearer 头不会被浏览器跨站自动带上'],
    deep:[
      {title:'自动携带才是攻击面',body:'CSRF 靠的是浏览器替你附上 Cookie。攻击页面发得出请求，但写不出你的令牌。若改成攻击者必须读到的头，浏览器的同源策略会挡住读取，这条自动提交就走不通。'},
      {title:'怎样自己验证',body:'对照 Spring Security 的 CSRF 说明，列出 Cookie 会话和 Authorization 头。用浏览器打开另一个源的页面去提交改数据，Cookie 方案应被拒绝，直到带上 CSRF 令牌。'},
    ],
    refs:[['Spring Security：CSRF','https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html'],['MDN：SameSite cookies','https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite']]
  },
  {
    track:'java', group:'安全', id:'spring-security-cors',
    title:'CORS 是浏览器的跨源限制，不能代替服务端鉴权',
    prompt:'网关配了允许的 Origin，是不是就等于接口安全了？',
    core:'CORS 让浏览器决定：这个前端源能不能用 XHR/fetch 读另一个源的响应。它不检查移动端、服务器脚本或 curl。允许的 Origin、方法和头要明确列出，不要用反射任意 Origin 再配 credentials。预检 OPTIONS 失败时，浏览器不会发出那次带凭证的请求。真正能不能改数据，仍靠认证和授权。CORS 只减少浏览器里的跨源读，不是防火墙。',
    why:'把允许的 Origin 当成登录，非浏览器客户端不看 CORS，带上 Cookie 或令牌仍能直接打接口。区分信号是浏览器跨源被拦，curl 同样的凭证却可以成功。curl 不发预检，照样能带上凭证。',
    example:'只允许一个前端源。浏览器里别的源读不到带 Cookie 的响应。用 curl 带上同样的 Cookie 调用，CORS 不管它，所以仍要登录和授权。允许源写明白，也不能写成星号再带凭证。星号配合凭证也不是合法的允许方式。',
    task:'对一个需 Cookie 的接口分别用浏览器跨源和 curl 调用。记录 CORS 拦的是哪一种。',
    answer:'浏览器跨源：预测 CORS 会按允许的源决定读不读得响应。curl 不走这套限制，预测同样的 Cookie 仍可能成功。所以 CORS 只约束浏览器，鉴权要约束所有客户端。允许的源不能代替登录。通过预检只说明网页可以读响应，不说明有权改数据。',
    keywords:'CORS Origin credentials 预检 Spring Security',
    points:['CORS 只约束浏览器的跨源读写','非浏览器客户端不受 CORS 保护','带 Cookie 时不能随意反射 Origin'],
    deep:[
      {title:'预检不是鉴权',body:'浏览器先问服务器允不允许这个源和方法。通过只说明这个网页可以读响应，不说明这个人有权改数据。没有 Origin 的客户端根本不发这道预检。没有 Origin 的客户端根本不问这道问题。'},
      {title:'怎样自己验证',body:'对需要 Cookie 的接口，用浏览器从另一个源调用，记下 CORS 是否拦住读取。再用 curl 带同样 Cookie 调用，确认不受 CORS 限制，因此仍要服务端鉴权。'},
    ],
    refs:[['Spring Security：CORS','https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html'],['Fetch：CORS protocol','https://fetch.spec.whatwg.org/#http-cors-protocol']]
  },
  {
    track:'java', group:'测试', id:'spring-test-transaction-rollback',
    title:'测试里的事务回滚，证明不了提交后别人能不能读到',
    prompt:'@Transactional 测试跑完库是干净的，为什么还不能说写入路径没问题？',
    core:'Spring 测试常在方法外再包一层事务，结束时回滚，避免弄脏数据库。顺序是：测试开始前打开事务，测试方法里的保存和查询都在这层里，方法结束时回滚而不是提交。这能验证这段代码在事务里跑得通。边界是看不到提交之后的触发器、监听和 afterCommit，也看不到别的连接是否真的读到了。要证明提交后的可见性，需要真正提交，再用另一条连接查询，或者用会提交的夹具并自己清理。默认回滚是方便，不是生产提交语义。同事务里能查到，只说明隔离级别下自己看得见。排障时按这个顺序往下看，边界条件不满足就停在这一步，不要把前后两段并成一个原因。回滚只证明事务里跑得通，提交后的回调和另一条连接要另测。',
    why:'只靠默认回滚的测试，提交之后的回调和别的连接能不能读到都没跑过，线上会表现为消息没发出去。区分信号是 afterCommit 在回滚测试里不执行，真正提交时才执行。库是干净的，不代表提交后的消息发出去了。',
    example:'订单测试方法带事务，save 之后同一事务里能查到。方法结束回滚，库是干净的，afterCommit 里发消息的代码没有跑。另写一个真正提交的测试，回调会执行，再用另一条连接才能看到这行。另一条连接在回滚测试里应什么都看不到。',
    task:'写一个带 afterCommit 回调的保存。分别在回滚测试和真正提交的测试里看回调有没有执行。',
    answer:'回滚测试里，预测 afterCommit 不执行，同事务内却能查到，这只证明代码在事务里跑得通。真正提交的测试里，预测回调执行，并且另一条连接能读到。可见性和提交后的动作要另测，默认回滚不是生产提交。同事务能查到，只说明自己看得见自己的写入。',
    keywords:'Spring Test @Transactional rollback afterCommit',
    points:['测试事务结束时常回滚，避免脏库','回滚看不到提交后的回调和跨连接可见性','要证明提交，就得真正提交再查'],
    deep:[
      {title:'回滚测不到提交之后',body:'测试外面包的事务在结束时撤销，是为了不弄脏库。提交后的监听、触发器和别的连接的可见性都发生在提交之后，这条路径被撤销跳过了。绿了也不等于写成功别人能看见。绿了也不等于别的连接已经能读到这行。'},
      {title:'怎样自己验证',body:'写一个带 afterCommit 的保存。在默认回滚的测试里看回调有没有执行，应没有。再在真正提交并用另一条连接查询的测试里看，回调和行都应在。真正提交的那次，回调和行都应该在。'},
    ],
    refs:[['Spring：Test transaction','https://docs.spring.io/spring-framework/reference/testing/testcontext-framework/tx.html'],['Spring：@Rollback','https://docs.spring.io/spring-framework/reference/testing/annotations/integration-spring/annotation-rollback.html']]
  },
  {
    track:'java', group:'测试', id:'testcontainers-real-db',
    title:'真实数据库的测试要隔离，不要拿生产库当夹具',
    prompt:'切片测试过了，换到 PostgreSQL 就失败，缺的是哪一层证明？',
    core:'替换成内存库或 Mock，验证的是接线形状，不是方言、约束和事务隔离。Testcontainers 在测试里启动真实数据库或中间件，用完扔掉，适合 SQL 方言、锁、JSON 类型这些内存库模仿不像的行为。它更慢，要在 CI 里有容器。不是每个单元测试都要启动 Postgres。把“这一层行为”和“对真实引擎的假设”拆开：前者用切片，后者用少量容器测试。',
    why:'H2 上绿、生产用的 PostgreSQL 上翻车，常常是唯一约束、JSON 查询或方言对不上。区分信号是这三件事必须在真实引擎上证明，价格计算则不该为此启动容器。替身库的方言和约束名可能和生产不同。',
    example:'JSONB 查询放在 Testcontainers 拉起的 PostgreSQL 里跑一条，和图上生产的类型一致。价格计算仍用纯单元测试，不启动数据库。不要把生产库当夹具，也不要让每一条小测试都等容器。',
    task:'列出三个必须用真实数据库才能证明的行为，再列出三个不该启动容器的测试。',
    answer:'必须用真实库的三件：方言 SQL、唯一约束的并发、生产才有的类型或 JSON 查询。不该启动容器的三件：纯计算、已经隔离的分支判断、不碰 SQL 的映射拼装。切片测试证明这一层；容器证明引擎。不要绑生产库。容器用来补引擎差异，不是用来跑价格计算。',
    keywords:'Testcontainers PostgreSQL 集成测试 方言',
    points:['内存库证明不了生产方言和约束','容器测试适合少量真实引擎假设','不是每个测试都要启动数据库'],
    deep:[
      {title:'切片和引擎各证明一段',body:'切片绿了，只说明这一层的协作在替身库上说得通。换引擎后约束名、JSON 函数和锁可能不同。容器用来补这层差异，不是用来代替所有单元测试。切片绿了，只说明这一层在替身上说得通。'},
      {title:'怎样自己验证',body:'列出三个必须用真实数据库才能证明的行为，再列出三个不该启动容器的测试。确认 JSON 或唯一约束那条跑在容器里，价格计算没有等待数据库。JSON 那条应跑在容器里，纯计算不应等待数据库。'},
    ],
    refs:[['Testcontainers','https://java.testcontainers.org/'],['Spring Boot：动态属性','https://docs.spring.io/spring-boot/reference/testing/testcontainers.html']]
  },
  {
    track:'frontend', group:'TypeScript', id:'ts-satisfies',
    title:'satisfies 核对形状，但不把字面量放宽成宽类型',
    prompt:'给主题对象加 as Theme，为什么会丢掉“这个键一定是这几个颜色”？',
    core:'as 是断言：编译器按目标类型看待这个值，字面量里更窄的信息可能被丢掉。satisfies 先检查值符合约定的类型，再保留字面量上的具体键和字面量类型。顺序是先写对象，再用 satisfies 核对形状，后面的访问仍按具体键检查。边界是它只在编译期，替代不了对外部 JSON 的运行时校验；断言则可能让拼错的键不再报错。对象既要符合约定，又要让后面的代码仍能按具体键自动补全时，用 satisfies。不要为了消掉报错而改成断言，那会把键放宽成宽类型。排障时按这个顺序往下看，边界条件不满足就停在这一步，不要把前后两段并成一个原因。satisfies 只在编译期核对，外部 JSON 仍要另做校验。',
    why:'用 as 把主题断言成宽类型，配色表的键会变成宽的索引，写错键也不再报错。区分信号是 satisfies 之后，拼错的键仍然报错，as 之后可能不报。拼错的键在断言之后可能悄悄通过编译。',
    example:'const colors = { primary: "#09f", danger: "#f00" } satisfies Record<string, string>。colors.primary 仍是这个字面量字符串。',
    task:'分别用 as 和 satisfies 标注同一份配色。看访问拼错的键时，哪一种还能报错。',
    answer:'同一份配色，as 按目标类型看待，预测访问拼错的键时可能不再报错，具体键被放宽。satisfies 先核对符合约定，再保留字面量上的键，预测拼错的键仍然报错。它是编译期检查，替代不了对外部 JSON 的校验。外部 JSON 仍要在运行时校验，编译期挡不住它。',
    keywords:'TypeScript satisfies as 字面量 类型断言',
    points:['satisfies 检查值是否符合目标类型','字面量的具体键和值类型可以保留','satisfies 不做运行时校验'],
    deep:[
      {title:'核对形状却不放宽',body:'satisfies 让这份对象必须能当成约定的类型，同时后面的代码仍按具体键补全。as 是你告诉编译器“就按那个类型看”，更窄的键信息可以就此丢掉。为了消掉报错改成断言，键就会被放宽。'},
      {title:'怎样自己验证',body:'分别用 as 和 satisfies 标注同一份配色。访问一个拼错的键：satisfies 应报错，as 可能不报。再确认外部 JSON 仍要做运行时校验，satisfies 不会在运行时拦它。'},
    ],
    refs:[['TypeScript 4.9：satisfies','https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator'],['TypeScript：More on Objects','https://www.typescriptlang.org/docs/handbook/2/objects.html']]
  },
  {
    track:'frontend', group:'TypeScript', id:'ts-utility-types',
    title:'Partial、Pick、Omit 是改形状，不是改运行时对象',
    prompt:'为什么把更新接口写成 Partial<User> 之后，id 也会变成可选？',
    core:'工具类型按声明生成新类型。Partial 让每个字段可选；Pick 抽出若干键；Omit 去掉若干键。更新接口常常应该是 Omit<User,"id"> 再 Partial，而不是直接 Partial<User>，否则调用方可以不传 id、也可以把 id 改掉。这些都只存在于类型层，编译后消失，不会帮你删掉多余字段。运行时仍要自己挑允许写入的键。',
    why:'图省事把更新接口写成整个实体的 Partial，主键和创建时间也会变成可写可选，补丁就能改 id。区分信号是更新类型排除 id 之后，把 id 放进补丁会报错。补丁里出现 id 时，类型应直接报错。',
    example:'更新类型先 Omit 掉 id 和 createdAt，再 Partial。补丁对象可以只带昵称，不能带 id。创建类型则另写，可以要求必填字段，而不是把更新和创建合成同一个 Partial。创建和更新不要合成同一个 Partial。',
    task:'给 User 写出创建、更新两种类型。更新必须排除 id。故意把 id 放进补丁，确认报错。',
    answer:'创建类型按需要必填的字段来，不直接等于整个 User。更新类型必须排除 id，预测把 id 放进补丁会报错。Partial、Pick、Omit 只改编译期形状。运行时仍要自己挑字段，类型挡不住已经进来的 JSON。请求里多出来的 id 不会因为 Omit 自己消失。',
    keywords:'TypeScript Partial Pick Omit 工具类型',
    points:['Partial 让全部字段可选','Pick 和 Omit 按键增减字段','工具类型不在运行时删除多余字段'],
    deep:[
      {title:'类型不会过滤请求体',body:'工具类型只影响编译你自己写的对象。请求 JSON 在运行时仍是普通对象，多出来的 id 不会因为 Omit 消失。入库前还要按允许的字段拷贝。入库前仍要按允许的字段拷贝一份。'},
      {title:'怎样自己验证',body:'给 User 写出创建和更新两种类型，更新排除 id。故意把 id 放进补丁，确认报错。再发一份带 id 的 JSON，确认运行时仍要自己丢掉这个字段。编译报错和运行时多字段是两道关。'},
    ],
    refs:[['TypeScript：Utility Types','https://www.typescriptlang.org/docs/handbook/utility-types.html'],['TypeScript：Mapped Types','https://www.typescriptlang.org/docs/handbook/2/mapped-types.html']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-event-loop-phases',
    title:'定时器、poll、check 是不同阶段，不要按浏览器那张图排顺序',
    prompt:'setTimeout(0) 和 setImmediate 谁先跑，为什么有时答案会换？',
    core:'Node 的事件循环分阶段：到期定时器、pending、poll 取 IO、check 跑 setImmediate、close 回调。process.nextTick 和 Promise 微任务穿插在这些阶段之间，能推迟进入下一阶段。setTimeout(0) 进定时器阶段，setImmediate 进 check。在 I/O 回调里，setImmediate 通常更先；在纯启动脚本里，顺序可能反过来。不要用一张浏览器微任务图解释 Node 服务器。',
    why:'把浏览器和 Node 的队列当成同一张图，日志里 timeout 和 immediate 的先后会对不上，有时还会换序。区分信号是在启动顶层和在 I/O 回调里，两者顺序不一样。换一个注册位置，同一对回调的先后会变。',
    example:'在读文件的回调里同时安排 setTimeout(0) 和 setImmediate，通常 immediate 先打印，因为它排在 check，而这次 poll 已经结束。在启动顶层两者的先后不稳定。nextTick 会插在阶段之间，比这两者都更早插入。',
    task:'分别在启动顶层和 IO 回调里跑 timeout 与 immediate，记录两次顺序，对照官方阶段图。',
    answer:'启动顶层：timeout 和 immediate 的先后预测不稳定，要当场记下来。I/O 回调里：预测 immediate 先于 timeout(0)。对照官方阶段图，定时器在 timers，immediate 在 check，不是同一阶段。nextTick 会插在阶段之间，不要按浏览器那张图排。',
    keywords:'Node event loop setImmediate setTimeout poll nextTick',
    points:['事件循环按定时器、poll、check 等阶段推进','setImmediate 在 check 阶段，timeout 在定时器阶段','nextTick 和微任务会插入阶段之间'],
    deep:[
      {title:'阶段不是一条队列',body:'事件循环按阶段走。定时器到期的回调、poll 里的 I/O、check 里的 immediate 不在同一格。谁先排上，取决于你在哪一个阶段里注册，所以同一对调用换个位置顺序会变。'},
      {title:'怎样自己验证',body:'分别在启动顶层和读文件回调里安排 timeout(0) 与 immediate，各跑几次，记下顺序。回调里 immediate 应稳定更早。再插一个 nextTick，看它是否抢在两者前面。'},
    ],
    refs:[['Node：事件循环','https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick'],['Node：setImmediate','https://nodejs.org/api/timers.html#setimmediatecallback-args']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-libuv-threadpool',
    title:'看起来异步的 fs 和 crypto，背后常占用线程池',
    prompt:'大量加密和读文件同时进行，为什么事件循环自己没堵，延迟却上去了？',
    core:'事件循环线程应尽快把回调交回去。dns.lookup、部分 fs、crypto 的 CPU 密集路径会排到 libuv 的线程池，默认大约四条。池满了，这些“异步”调用其实在排队，事件循环看起来空闲，请求却变慢。真正的 CPU 死循环仍会堵住循环本身。耗 CPU 的工作应限制并发、换 worker，或调大 UV_THREADPOOL_SIZE 并测量。不要把所有 async 都理解成“不占线程”。',
    why:'入口全是 await 的文件和加密，事件循环没被死循环堵住，延迟却随并发上升，因为线程池排满了。区分信号是短的网络回调仍能跑，新的加密要等池里的位置。池排满时加密在等，循环还能处理短回调。',
    example:'同时发起很多口令哈希。默认线程池排满后，新的哈希要等，延迟上升。同一进程里很短的网络回调仍能被循环处理。若在循环里做同步的大计算，则连网络回调也进不来，那是堵住了循环本身。同步死循环则连网络回调也进不来。',
    task:'对照“不要阻塞事件循环”文档，列出走线程池的操作和会堵住循环的操作各两项。',
    answer:'走线程池的例如某些文件操作和加密。会堵住循环本身的是同步死循环和长时间的纯计算。预测：池耗尽时加密延迟上升，短网络回调仍能执行。死循环则两者都停。不要把池等待说成事件循环被堵死。池等待和循环被堵死，池满时短请求还能返回，死循环则全部停下来。',
    keywords:'libuv threadpool UV_THREADPOOL_SIZE fs crypto Node',
    points:['部分 fs、dns、crypto 使用 libuv 线程池','线程池耗尽时异步调用会排队','死循环阻塞的是事件循环线程本身'],
    deep:[
      {title:'异步仍要占池里的位置',body:'看起来没有阻塞函数，工作却在 libuv 的线程池里做。池的大小有限，第几个之后就要排队。排队的时间会计进这次异步操作，循环本身还可以处理别的短回调。第几个之后就要排队，延迟会计进这次调用。'},
      {title:'怎样自己验证',body:'对照不要阻塞事件循环的文档，列出两项走线程池的操作和两项会堵住循环的操作。同时发起大量哈希，看延迟上升时短网络回调是否还能返回。大量哈希时，短请求应仍能很快返回。'},
    ],
    refs:[['Node：不要阻塞事件循环','https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop'],['Node：UV_THREADPOOL_SIZE','https://nodejs.org/api/cli.html#uv_threadpool_sizesize']]
  },
  {
    track:'frontend', group:'Vue 生态', id:'vue-router-guard',
    title:'导航守卫决定去不去，不是在页面里再偷偷改路由',
    prompt:'登录校验写在页面 onMounted 里跳转，为什么会先闪一下再回来？',
    core:'全局、路由、组件上的导航守卫在确认这次导航之前运行。beforeEach 里可以检查登录并改到登录页，目标组件还没挂载。放在 onMounted 再 push，组件已经渲染一帧，用户会看到闪屏。守卫必须最终调用 next 一次，或返回明确的位置/false；调用多次会乱。异步拉用户信息时，要在守卫里等结果，而不是先放行再补救。',
    why:'把登录校验放进页面的 onMounted 再跳转，未登录用户会先执行受保护页的 setup，闪一下才离开。区分信号是守卫拦住时受保护页的 setup 不运行。未登录时受保护页的 setup 不应先跑。',
    example:'beforeEach 发现没有 token，返回 { name: "login", query: { redirect: to.fullPath } }。受保护页根本不会 setup。',
    task:'对比守卫拦截和 onMounted 里 redirect 两种写法，记录受保护页有没有执行 setup。',
    answer:'守卫在确认导航前拦截，预测受保护页的 setup 不执行，也不会闪内容。onMounted 里再 redirect，预测 setup 已经跑过，页面先出现再跳走。next 或返回值只应决定这一次导航，不要在页面里再改一次路由。导航只能决定一次，页面里不要再改路由。',
    keywords:'Vue Router navigation guard beforeEach next',
    points:['守卫在导航确认前运行，组件还没挂载','挂载后再跳会先渲染一帧','守卫必须明确放行、取消或改到新位置一次'],
    deep:[
      {title:'页面里跳已经晚了',body:'组件开始建立，说明导航已经确认。这时再换路由，用户会看到一帧受保护内容，请求也可能已经发出。守卫要在确认之前把导航改掉。组件已经建立，说明这次导航已经被确认了。'},
      {title:'怎样自己验证',body:'对比守卫拦截和 onMounted 里跳转。未登录时，守卫应让受保护页的 setup 不执行。生命周期里跳转则 setup 会执行，并能看到闪一下。闪一下就说明校验写得太晚。'},
    ],
    refs:[['Vue Router：导航守卫','https://router.vuejs.org/guide/advanced/navigation-guards.html'],['Vue Router：beforeEach','https://router.vuejs.org/api/interfaces/Router.html#beforeEach']]
  },
  {
    track:'frontend', group:'Vue 生态', id:'vue-keep-alive',
    title:'keep-alive 缓存的是实例，切走不是销毁',
    prompt:'列表滚到一半进详情，回来为什么有时从头开始，有时还在原地？',
    core:'keep-alive 把被包住的组件实例留下来，切走时走 deactivated，再进来走 activated，而不是重新 created。滚动位置、局部状态还在。include/exclude 和 max 决定缓存谁、缓存几个。需要每次进页都重新拉数时，不要把该页包进 keep-alive，或在 activated 里按需要刷新。把它当成“自动让所有页都快”，会留下过期表单和看不见的后台定时器。',
    why:'以为切走就是销毁，定时器和订阅仍在缓存的实例上跑，回来时滚动位置有时还在、有时被重建打回开头。区分信号是第二次进入触发 activated，而不是再走 created。回来时若再走 created，说明实例被销毁重建了。',
    example:'路由视图包在 keep-alive 里。列表第一次进入走 created。切到详情再回来，created 不再走，activated 会走，滚动位置还在。没有缓存时，回来会重新 created，滚动回到开头。',
    task:'给列表页加 keep-alive，切到详情再回来。分别观察 created 和 activated 谁在第二次触发。',
    answer:'加上缓存后，第一次预测 created。切走再回来，预测 created 不触发，activated 触发，实例还是原来那一个，滚动还在。要每次重新拉数，就不要缓存，或在 activated 里刷新。切走是停用，不是销毁。定时器若只在卸载时取消，缓存之后会一直跑。',
    keywords:'Vue keep-alive activated deactivated 缓存',
    points:['keep-alive 留下实例，走停用/激活而不是销毁','滚动和局部状态会随实例留下','不该缓存的页面不要包进去'],
    deep:[
      {title:'停用仍占着订阅',body:'失活的实例不卸载，定时器和监听还在。只在 created 里注册、在卸载时取消，缓存之后取消不会发生，回来还会重复注册。成对的清理要放在失活时。失活时也要成对取消监听。'},
      {title:'怎样自己验证',body:'给列表页加 keep-alive，切到详情再回来。第一次应看到 created，第二次应看到 activated 而不是 created。去掉缓存再回来，created 会再次出现，滚动回到开头。'},
    ],
    refs:[['Vue：keep-alive','https://vuejs.org/guide/built-ins/keep-alive.html'],['Vue：KeepAlive API','https://vuejs.org/api/built-in-components.html#keepalive']]
  },
  {
    track:'frontend', group:'React 生态', id:'query-invalidate',
    title:'变更成功后让查询失效，不要手工去改每一份缓存',
    prompt:'改完订单备注，列表还显示旧备注，该 setQueryData 还是 invalidate？',
    core:'服务器状态以查询键为缓存。变更成功后 invalidateQueries 让相关键重新变脏，下次或立即按配置重新请求，列表和详情会一起对齐。setQueryData 适合你已经确切知道新形状、想先画出来的乐观更新；写错形状会让缓存和服务器分叉。失效的范围按查询键来，不要清掉整个客户端缓存。失败时要回滚乐观结果，而不是留下假数据。',
    why:'每个页面自己改一份本地状态，详情改了备注，列表、侧栏和别的缓存仍是旧的。区分信号是按查询键失效后，列表会重新请求并跟上；只改详情缓存则列表不变。只改详情那一份缓存时，列表仍显示旧备注。',
    example:'updateOrder 成功后 queryClient.invalidateQueries({ queryKey: ["orders"] })。列表和详情只要键以 orders 开头，就会重拉。',
    task:'写一次更新。分别用 invalidate 和只改当前详情的 setQueryData。看列表是否跟上。',
    answer:'更新成功后 invalidate 相关查询，预测列表和详情都会重拉，备注跟着变。只对当前详情 setQueryData，预测详情变了，列表仍是旧备注。精确改缓存只在你已经知道每一份新数据时用，否则就失效重拉。键取得太粗，无关页面也会被一起打回服务器。',
    keywords:'TanStack Query invalidateQueries setQueryData 查询键',
    points:['查询键决定哪一份服务器状态','失效会让相关查询重新变脏并重拉','手工改缓存要能回滚，否则会和服务器分叉'],
    deep:[
      {title:'键要盖住所有读者',body:'失效按查询键匹配。只失效详情的键，列表那条查询不会重拉。键若取得太粗，又会把无关页面一起打回服务器。先写出谁显示了这句备注。先列出哪些界面还显示着这句旧的备注。'},
      {title:'怎样自己验证',body:'写一次更新。只用 setQueryData 改详情，看列表是否仍是旧备注。再改成 invalidate 列表和详情的键，两者应先后跟上服务器的新备注。失效之后应看到新的请求，而不是只改内存。'},
    ],
    refs:[['TanStack Query：Invalidation','https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation'],['TanStack Query：Query Keys','https://tanstack.com/query/latest/docs/framework/react/guides/query-keys']]
  },
  {
    track:'frontend', group:'React 生态', id:'react-router-error-element',
    title:'路由错误要画在这一层的 errorElement，不要靠窗口级崩溃',
    prompt:'loader 抛错之后，为什么整页白屏，而不是只坏这一段路由？',
    core:'数据路由里，loader 或 action 抛错会交给最近的 errorElement。这一层可以读 useRouteError、展示重试或返回。没有 errorElement，错误继续往上冒，可能崩到根。它和 React 的 Error Boundary 解决的都是“别让整棵树死掉”，但路由错误常发生在渲染之前的加载阶段。根上放一个兜底，子路由再放更具体的提示。不要用 window.onerror 去代替路由约定。',
    why:'详情的 loader 抛错却没有这一层的错误元素，失败会冒到根上，整页空白，用户回不了列表。区分信号是有 errorElement 时只有这一段被替换，侧栏还在。失败冒到根上时，列表和侧栏一起消失。',
    example:'详情路由写上自己的错误元素。订单不存在时只替换详情区域，侧栏和布局还在。没有它时，同一次抛错会落到根上的空白或整页崩溃。错误对象里还能读到状态，用来区分不存在和服务器失败。错误对象里的状态用来区分不存在和服务器失败。',
    task:'让 loader 抛错。分别在有无 errorElement 时看界面范围。读出错误对象里的状态信息。',
    answer:'没有 errorElement 时，loader 抛错预测整页进入错误或空白。配上这一层的 errorElement 后，预测只替换这段路由，周围布局还在。根上再留一个兜底。从错误对象读出状态，不要让加载失败变成整页崩溃。错误元素写在哪一层，失败就停在哪一层。',
    keywords:'React Router errorElement useRouteError loader',
    points:['loader/action 抛错交给最近的 errorElement','缺了就会继续往上冒，可能崩到根','路由错误常发生在渲染前的加载阶段'],
    deep:[
      {title:'错误停在声明的那一层',body:'路由把加载错误交给最近的错误元素。这一层没写，就继续往父路由找，直到根。所以详情失败会不会拆掉整页，取决于你把错误元素写在哪一层。这一层没写，就会继续往父路由找。'},
      {title:'怎样自己验证',body:'让详情 loader 抛错。没有 errorElement 时看是不是整页坏掉。加上之后，确认只有详情区域被替换，并读出错误对象里的状态码或状态文本。加上之后，布局应留着，只有详情被替换。'},
    ],
    refs:[['React Router：errorElement','https://reactrouter.com/en/main/route/error-element'],['React Router：useRouteError','https://reactrouter.com/en/main/hooks/useRouteError']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_DEPTH_14) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
