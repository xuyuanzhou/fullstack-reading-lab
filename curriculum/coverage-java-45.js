/* Patterns people confuse with the first six: name the varying part, then the neighbor it is not. */
const COVERAGE_JAVA_45 = [
  {
    track:'java', group:'设计模式', id:'pattern-factory-method',
    title:'工厂方法换的是创建哪一个产品',
    prompt:'为什么调用方已经不写 new，方法里却还在按类型 if，就叫工厂方法？',
    promptAnswer:'工厂方法把创建推给子类/创建者。create 里继续按类型 if，名字不成立。',
    core:'工厂方法把“创建哪一个具体产品”关进可替换的创建者。调用方依赖产品接口，自己的代码里不出现具体类的 new。创建者的方法直接返回那一种产品。上一课那个 DiscountFactory 里仍是一长串 if，变化点还在同一个方法里，名字不成立。多种产品必须成套、不能混用时，才由一个创建者同时给出这一套：账单和回执一起给，调用方不能自己拼一个 JSON 账单配 XML 回执。只换一种产品时，不要先做两层工厂。策略换的是已经造好的对象怎么算；这一课换的是这一次造出哪一个。',
    why:'每加一种折扣，仍打开同一个 create 加 else if。调用方虽然不写 new，测试仍要覆盖这条方法的每一支，新增规则也仍改这个类。',
    example:'create 里 if 满减、会员、优惠券。改成每个规则一个创建者，方法直接返回自己的产品。结算方只拿 Discount。再加限时价时新增一个创建者，原来的 create 不再加分支。NumberFormat.getInstance 按地区返回格式器，调用方不 new DecimalFormat。Calendar.getInstance 每次返回新日历，那是工厂方法，不是单例，见 java-calendar-not-singleton。',
    task:'找出一个名为 Factory、内部仍按类型分支的 create。改成一种产品一个创建者。写下新增一种产品时哪个文件变，哪个文件不应再出现 else if。',
    answer:'调用方只依赖产品接口。每种产品由自己的创建者返回，create 里不再按类型分支。新增产品时新增创建者，原来的 create 不应再加 else if。只有必须成套创建、禁止混搭时，才让一个创建者同时返回这一套。一个方法里继续 if，工厂方法这个名字没有成立。',
    keywords:'工厂方法 抽象工厂 创建者 NumberFormat',
    diagram:'diagrams/pattern-factory-method.svg',
    points:['工厂方法替换的是创建哪一个产品','创建方法里继续按类型分支就还没分开','必须成套、不能混搭时才让一个创建者同时给出这一套'],
    deep:[
      {title:'和策略分开',body:'产品造好之后如果还要换算法，那一块是策略，不要把算法正文写进 create。工厂方法结束在返回产品。调用方拿到产品之后怎么用，不由创建者再分支。'},
      {title:'怎样自己验证',body:'新增一种产品时看 diff。应出现新的创建者，旧的 create 不应增加 if。调用方文件不应出现新的具体类名。若还要同时保证两种产品来自同一套，再看创建者是不是一次给出这一对，而不是调用方自己各 new 一个。'}
    ],
    refs:[['NumberFormat.getInstance','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/NumberFormat.html#getInstance()'],['Calendar.getInstance','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Calendar.html#getInstance()']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-builder-assemble',
    title:'建造者把可选部件留在组装过程，build 才交出产品',
    prompt:'为什么参数可有可无时，就去加一套越来越长的构造器？',
    promptAnswer:'可选部件用建造者分步放，缺必填在 build 失败。不要靠越来越长的构造器重载。',
    core:'建造者让调用方按需要设置部件，最后一次 build 才得到产品。build 之前的对象还不能当成品用。工厂方法是一次调用就返回成品，没有地方逐步放可选部件。一长串构造器靠参数位置传值，漏一个超时仍能编译。一串 setter 改的是已经交出去的对象，别的代码能在中途读到它。HttpRequest 没有把全部可选项塞进一个构造器：newBuilder 之后按需 header、timeout，build 才得到请求。建造过程本身不是请求。',
    why:'八个可选参数写成八个构造器，调用方靠顺序传值，漏掉超时就用了默认还编译得过。把未完成的对象先返回，别的代码可能拿去发送。',
    example:'下单要有地址，优惠券和备注可空。new Order(address, coupon, note, timeout) 里调用方必须记住四个位置。改成 builder.address(...).coupon(...).build()，缺地址时 build 失败，而不是先得到一个能被发送的空地址订单。HttpRequest.newBuilder().uri(uri).header(...).build() 同样：没写的头不占一个构造器参数位。',
    task:'把一个参数超过四个、其中有可选项的构造器改成建造者。写下 build 之前能不能拿到成品，以及缺必填项时失败发生在哪一次调用。',
    answer:'设置方法只记录部件。build 检查必填并返回成品。缺必填时失败在 build，不在更早一次 new。工厂方法一次调用就要交出成品，不适合把可选部件分步放进去。build 返回的对象不再提供会改掉部件的方法。',
    keywords:'建造者 Builder build HttpRequest',
    diagram:'diagrams/pattern-builder-assemble.svg',
    points:['可选部件留在建造过程，build 才交出成品','工厂方法一次调用就返回成品','缺必填项应在 build 失败，而不是先交出半成品'],
    deep:[
      {title:'成品不再逐项改',body:'需要不可变产品时，build 返回的对象上不再提供改地址、改超时的方法。要改就再走一次建造。调用方拿到的引用在发出去之后，别的代码不能从侧面把部件换掉。'},
      {title:'怎样自己验证',body:'不调用 build，确认拿不到可发送的产品。漏掉必填项调用 build，应失败。对照 HttpRequest：可选项在 Builder 上，成品来自 build。'}
    ],
    refs:[['HttpRequest.Builder','https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpRequest.Builder.html'],['HttpRequest.newBuilder','https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpRequest.html#newBuilder()']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-singleton-scope',
    title:'单例先写明这一份的范围',
    prompt:'为什么类上有 getInstance，就把 Calendar、Spring Bean 和进程级对象都叫成同一个单例？',
    promptAnswer:'进程级一份、容器一份、每次 new 不是同一种单例。范围内唯一也不保护可变字段。',
    core:'单例承诺两件事：在说好的范围里只有一份实例，并且调用方用一个固定入口拿到它。范围不写明，这个名字就没有内容。Runtime.getRuntime 的范围是这个进程。Spring 默认 singleton 的范围是这一个容器，两个容器就是两份，见 spring-scope-catalog。Calendar.getInstance 每次新对象，是工厂方法，见 java-calendar-not-singleton。懒加载手写双重检查要 volatile，枚举常量由类初始化发布，见 java-dcl-volatile-enum。一份实例还不等于字段安全：上面的可变字段，所有调用方一起改。能放进构造器的协作者，不要为了少写一个参数改成 getInstance，测试会从参数上看不见这份依赖。',
    why:'把容器里的用户服务当成全 JVM 只有一个，测试再起一个容器就对不上。把可变的日历放进静态字段，后一次 set 会改掉前一次还在用的日期。',
    example:'同一进程里 Runtime.getRuntime 两次拿到的是同一对象。同一 Spring 容器里无状态的 InventoryClient 默认一份。再起一个容器，同名 Bean 是另一份。静态字段里放一个 Calendar，两个请求先后 setTime，后一个请求看见的是前一个改过的日期。',
    task:'给一个 getInstance 写下范围：进程、容器，还是每次调用都新建。再写下这份实例上有没有会被并发改掉的字段。',
    answer:'进程级才是 Runtime 这种一份。Spring 默认 singleton 是每个容器一份。每次 new 的工厂方法不是单例。范围内唯一也不保护字段，可变状态不要放在这份共享实例上。双重检查和枚举怎么发布，用已有的那一课，不在这里再写一套锁。',
    keywords:'单例 作用域 Runtime Spring singleton',
    diagram:'diagrams/pattern-singleton-scope.svg',
    points:['单例要同时有唯一实例和固定入口','先写范围：进程一份和容器一份不是同一种承诺','一份实例不保证字段的并发安全'],
    deep:[
      {title:'入口会藏起依赖',body:'调用方不经过构造器就能拿到这份对象。测试 new 出业务类时，编译器不会要求你提供它。依赖应优先写在构造器参数上，固定入口只留给范围确实是进程或容器的那一份。'},
      {title:'怎样自己验证',body:'对 Runtime 连续取两次，确认是同一引用。对 Spring 在两个容器里各取同名 Bean，确认不是同一引用。再读那份实例的字段，标出哪些会被请求改写。'}
    ],
    refs:[['Runtime.getRuntime','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Runtime.html#getRuntime()'],['Spring：Bean 作用域','https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-proxy-stand-in',
    title:'代理决定你能不能碰到目标，装饰器在外面加行为',
    prompt:'代理和装饰器都是同一接口再包一层。为什么不能当成同一个模式？',
    promptAnswer:'代理可以跳过或推迟目标；装饰器总是转发再加行为。同接口包一层不等于同一模式。',
    core:'两者都实现同一接口，并且里面持有另一个对象。差别在包这一层的原因。装饰器假定目标动作会发生，它在前后加上可拆掉的行为，例如缓冲；这层拆掉之后，目标仍按原样执行。代理决定调用方能不能、以及何时碰到目标：还没创建就先拦住、没有权限就拒绝、目标在另一台机器上就由代理转发。被拒绝时目标方法没有运行。JDK 的 Proxy.newProxyInstance 只是生成这种替身的一种办法，而且只能代理接口，见 java-proxy-needs-interface。生成方式不能代替“这一层在控制什么”。目标内部自己调自己的方法时，调用不经过外面的代理，见 spring-aop-self-invocation。',
    why:'把权限检查写成总是转发的一层，失败时仍然调用了扣款。把缓冲说成代理，调用方以为关掉外层就读不到文件，其实只是少了一层缓冲。',
    example:'读文件外面包 BufferedInputStream，read 仍会读到文件，这是装饰器。下单前面放一个检查登录的替身，未登录时 place 没有被调用，这是代理。两者的字段都是里面那个对象，只看字段区分不开。',
    task:'选一个包了一层的类。写下里面那个方法在什么条件下不会被调用。一次都不跳过，就不要叫代理。',
    answer:'装饰器每次都把调用转进去，加上的行为可以拆掉，目标动作仍发生。代理至少有一条路径不把调用转给目标，或推迟到第一次真正需要时才创建目标。类名带 Proxy，或用了动态代理生成，只说明有一层替身，还要再看这条路径会不会跳过目标。',
    keywords:'代理 装饰器 访问控制 JDK Proxy',
    diagram:'diagrams/pattern-proxy-stand-in.svg',
    points:['代理和装饰器都是同一接口再包一层','装饰器每次都把动作转给目标','代理可以拒绝或推迟，目标方法不一定运行'],
    deep:[
      {title:'和适配器分开',body:'适配器改的是方法形状，为了接上一个已经存在、对不上的类型。代理保持调用方已经认识的方法，换的是能不能碰到目标。形状和访问是两块，不要用一层同时假装解决。'},
      {title:'怎样自己验证',body:'在目标方法里打日志。装饰器路径上日志每次都有。代理的拒绝路径上日志没有。懒加载时，第一次调用前目标对象还不存在。目标内部的自调用若没有日志，说明没经过外面这一层。'}
    ],
    refs:[['Proxy','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/reflect/Proxy.html'],['Spring：代理','https://docs.spring.io/spring-framework/reference/core/aop/proxying.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-facade-entry',
    title:'外观把子系统的顺序收成一次调用',
    prompt:'为什么调用方要按顺序自己调用库存、支付和写单，还说这是三个策略？',
    promptAnswer:'外观收成一次调用，子系统顺序留在里面。调用方还在选算法时，那一块仍是策略。',
    core:'外观给一组必须按顺序协作的对象一个粗粒度入口。调用方调用这一次，不再自己持有这几个子系统，也不再记住谁先谁后。它不换算法，所以不是策略。它不把别人的方法改成你的方法名，所以不是适配器。子系统仍保留自己的接口，给需要细粒度的代码用。外观只多一个入口，不是把无关的查询、报表、退款都收进同一个上帝类。JdbcTemplate 把连接、语句和结果集的开关收进模板，SQL 仍由回调给出，那是模板方法加一个窄入口，见 spring-jdbctemplate-callback。业务上的 place(order) 若把库存、支付、写单藏进这一次调用，控制器里就不应再出现这三行。',
    why:'三个调用散落在控制器里，下一处下单忘了先占库存。改顺序时要改每一处调用方。',
    example:'控制器里依次 inventory.reserve、payment.charge、orders.save。抽成 Checkout.place(order) 之后，控制器只留这一行。库存失败时支付不应被调用，这个判断留在 place 里面。控制器的 diff 里不再出现 payment。',
    task:'找出一处按固定顺序调用三个以上协作者的方法。收成一次调用后，写下调用方还剩哪一行，以及失败时哪一个子系统不应再被碰到。',
    answer:'调用方只调用外观的一个方法。子系统的顺序和失败时停在哪一步，留在外观里。调用方文件不再出现那些协作者。调用方仍要选择其中一种算法时，那一块是策略，留在外面。细粒度接口还在，外观不是唯一还能碰到子系统的地方。',
    keywords:'外观 Facade 子系统 入口',
    diagram:'diagrams/pattern-facade-entry.svg',
    points:['外观把固定顺序收成一次调用','调用方不再持有这些子系统','它不替换算法，也不改别人的方法形状'],
    deep:[
      {title:'一条协作一个入口',body:'外观只隐藏这一条稳定顺序。把无关操作继续加进同一个类，调用方又面对一个巨大入口。退款如果是另一条顺序，给它另一个入口，不要塞回 place。'},
      {title:'怎样自己验证',body:'看调用方的 import。收成外观之后，库存和支付的类型不应再出现在控制器里。让第一步失败，确认后面的子系统没有被调用。'}
    ],
    refs:[['Spring：JdbcTemplate','https://docs.spring.io/spring-framework/reference/data-access/jdbc/core.html'],['Java 教程：接口','https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-chain-stop',
    title:'责任链上的一环可以选择不往后传',
    prompt:'为什么每个处理者都调用下一个，就和装饰器分不开？',
    promptAnswer:'责任链可以中途停下不往后传。每一环都无条件转发，更像装饰器。',
    core:'责任链把处理者排成一列，每个处理者决定自己处理之后还要不要把请求交给下一个。停下来是这个模式的内容：不调用下一个，后面的处理者和最终目标都不会运行。装饰器通常总是把调用转进去，加的是行为。过滤器里调用 chain.doFilter 就是继续；不调用就是停。Spring Security 的过滤链用的是这件事：未登录的请求在链上被拒绝，控制器不会执行。认证放在哪一层、和拦截器差在哪，见 spring-security-filter-chain 和 spring-filter-vs-interceptor。这一课只核对“停”和“继续”是谁的责任。观察者是事情已经发生、多方各自响应；链是请求还在路上，下一环可能根本到不了。',
    why:'每个过滤器都无条件 doFilter，权限失败仍会进控制器。把“不继续”写成总是转发的一层，读代码的人会以为目标动作仍然发生。',
    example:'日志过滤器调用 chain.doFilter，请求继续。认证过滤器在没有身份时直接写 401，不调用下一个，控制器没有日志。两条都实现同一接口，差别只在有没有把请求交出去。',
    task:'在一列处理者里标出哪一环可以不调用下一个。写出不调用时，后面哪一段代码不会运行。',
    answer:'能停的那一环在拒绝时不把请求交给下一个。后面的处理者和最终动作都没有运行。每一环都无条件往后传，这条链没有使用“可以停”，更接近总是转发的装饰器。换一种算法用策略，不要靠调整链的顺序来换算法。',
    keywords:'责任链 Filter doFilter 停住',
    diagram:'diagrams/pattern-chain-stop.svg',
    points:['链上的一环可以不把请求交给下一个','不往后传时，后面的处理者和目标都不运行','每一环都无条件转发，就没有使用责任链的停'],
    deep:[
      {title:'停要显式',body:'处理完自己的部分之后，继续还是停止要写在这一个处理者里。靠抛一个别人没约定的异常来“停”，后面的代码仍可能在 catch 里把请求放行。拒绝的路径应不调用下一个。'},
      {title:'怎样自己验证',body:'在最终动作上打日志。让第一环拒绝并且不调用下一个，日志不应出现。再改成调用下一个，日志出现。'}
    ],
    refs:[['FilterChain.doFilter','https://docs.oracle.com/javaee/7/api/javax/servlet/FilterChain.html'],['Spring Security：过滤器链','https://docs.spring.io/spring-security/reference/servlet/architecture.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-state-transition',
    title:'状态自己决定这一步能不能做，以及下一步是谁',
    prompt:'为什么订单用一个字符串 status，每个方法开头都写一遍 if？',
    promptAnswer:'状态对象持有允许的动作并切换下一状态。用字符串 status 到处 if，状态模式没成立。',
    core:'状态把“现在处于哪一种，以及这一步之后变成哪一种”放进状态对象。订单对外的方法名不变，方法体只把调用交给当前状态。未支付的 pay 得到已支付；已支付的 pay 拒绝，并且不改状态。策略也是换一个对象，但选择来自外部，选中之后通常保持，算法自己不把自己换成另一个算法。状态会在动作之后替换当前对象。用字符串 status 在 pay、ship、refund 里各写一套 if，每加一种状态就改这三个方法。状态种类很少而且已经封闭时，可以用带方法的枚举常量表达同一种委托，订单方法里仍然不写 if (status)。',
    why:'新增“已退款”时，三个方法都要加分支，漏掉的那个方法会允许不该发生的动作。测试要记住每一处字符串比较。',
    example:'order.pay() 在未支付时把当前状态换成已支付。再次 pay 时已支付状态直接拒绝，订单方法里没有 if ("PAID")。新增已退款时新增一个状态类，pay 和 ship 的旧分支不用打开。策略的折扣对象不会因为算完一次就把自己换成另一种折扣。',
    task:'把一处按 status 字符串分支的动作改成当前状态对象的方法。写下这个动作之后当前对象会不会换成另一个，以及新增一种状态要改几个旧方法。',
    answer:'对外方法只委托给当前状态。允许的动作在状态里完成，并把当前状态换成下一状态。不允许的动作在这个状态里拒绝，订单类不再增加 if (status)。新增状态是新的状态类型，旧的 pay、ship 不应再加分支。对象由外部一次选定、动作之后不替换，那是策略。',
    keywords:'状态模式 策略 迁移 status',
    diagram:'diagrams/pattern-state-transition.svg',
    points:['当前状态决定动作能不能做，以及下一步是谁','对外方法不再按状态字符串分支','外部选定且动作之后不替换，那是策略'],
    deep:[
      {title:'状态只接收这一步要的数据',body:'状态对象根据这一步的输入返回下一个状态。它去改订单里无关的字段，就会变成另一个什么都碰的类。订单保存当前状态，状态不反过来持有整个订单的全部字段。'},
      {title:'怎样自己验证',body:'新增一种状态时看 diff。应出现新的状态类型。旧的业务方法不应新增字符串比较。对不允许的动作，目标副作用的日志不应出现。'}
    ],
    refs:[['枚举可以带方法','https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html'],['Java 教程：接口','https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-bridge-two-axes',
    title:'两个都会变的维度不要乘成子类',
    prompt:'为什么消息种类再乘上发送通道，子类就变成普通加急短信、普通加急邮件这一串？',
    promptAnswer:'两个变化维度分开继承。种类×通道用桥接，避免普通加急短信邮件那种子类爆炸。',
    core:'桥接把两个独立变化的维度拆开：一边是要做的事，一边是用什么完成。消息是普通还是加急，通道是短信还是邮件，各自增加时不应再乘出子类。消息持有发送者。加急只是在调用发送之前多做一步，不继承短信发送者。适配器是事后把一个已经存在、形状不合的类型套上你的接口。桥接是一开始就让两边分开长。只有一边会变时，一个接口就够，不必先拆两套继承。JDBC 里应用代码依赖 Connection 上的操作，具体数据库由驱动实现；新增一种数据库，应用侧不新增 Connection 的子类。',
    why:'每加一种通道就要复制普通和加急两套类。改加急规则时要改每一个通道子类。',
    example:'PlainSms、PlainMail、UrgentSms、UrgentMail 四个类里，加急的重试复制了两份。改成 Message 持有 Sender。加急消息在 send 前先记一条标记，再调用 sender.send。新增推送时只新增一个 Sender，消息类不变。两种消息、三种通道，相乘是六，拆开是二加三。',
    task:'找出两层继承相乘的类名。拆成“事情”持有“做法”。写下新增一种做法时要新增几个类，事情那边的类应不应改。',
    answer:'新增通道只新增发送者。普通和加急不跟着复制。消息类的 diff 里不出现新通道的类名。只是一个已有类型的方法名对不上时，用适配器。只有一个维度会变时，不要先做桥接。',
    keywords:'桥接 两个维度 适配器 JDBC Connection',
    diagram:'diagrams/pattern-bridge-two-axes.svg',
    points:['桥接拆开两个独立变化的维度','新增一边时，另一边的类不跟着复制','事后补一个形状不合的类型，那是适配器'],
    deep:[
      {title:'先数会变的边',body:'只有通道会变、消息不会变，一个发送者接口就够。桥接要出现的信号是两边都会加，而且加的时候不应相乘。先拆继承，再决定要不要两套类型。'},
      {title:'怎样自己验证',body:'数类的个数。两种消息、三种通道，继承相乘是六，桥接是二加三。再加一种通道，类的增量是一，不是消息种类的个数。'}
    ],
    refs:[['Connection','https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/Connection.html'],['Driver','https://docs.oracle.com/en/java/javase/21/docs/api/java.sql/java/sql/Driver.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-composite-tree',
    title:'叶子和容器用同一接口，调用方不用先判断是不是目录',
    prompt:'为什么算总价时先 if 这是单品还是套装，套装里再写一遍？',
    promptAnswer:'叶子与容器同一接口，容器转发给子节点。靠 instanceof 判断单品/套装，组合还没成立。',
    core:'组合让叶子和容器实现同一接口。容器持有子节点，并把操作转给它们再汇总。调用方对根调用一次，不用先问这是叶子还是容器。装饰器包的是一个对象，加上可选行为；组合放的是多个子节点，做的是汇总。AWT 里 Container 自己也是 Component，并且能再装 Component，绘制时按组件走，不必先判断里面是按钮还是另一层容器。调用方用的接口上如果有 add，叶子的 add 只能拒绝。把 add 只放在容器上，调用方就要先知道这是容器。先决定任意节点要不要 add，再定接口。',
    why:'套装里还能套套装时，每一层的类型判断会漏掉更深的一层。叶子和套装的方法名不一样，调用方每一层都要转型。',
    example:'单品 price 返回自己的价格。套装 price 把每个子节点的 price 加起来。订单对根调用 price，不出现 instanceof。一个套装里放单品和另一个套装，仍是这一次调用。给单品包一层打折，子节点个数仍是一，那是装饰器。',
    task:'写一个叶子和一个容器的同一方法。容器里放一个叶子和一个容器。调用方计算总价时不应出现类型判断。',
    answer:'叶子和容器的方法签名相同。容器把调用转给子节点再汇总。调用方只持有根的接口。出现 instanceof 或先判断是不是目录，组合就还没成立。只包一个对象并加上行为，那是装饰器。',
    keywords:'组合模式 叶子 容器 Component',
    diagram:'diagrams/pattern-composite-tree.svg',
    points:['叶子和容器实现同一接口','容器把操作转给子节点再汇总','只包一个对象并加行为，那是装饰器'],
    deep:[
      {title:'add 放在哪',body:'任意节点都能 add 时，叶子要明确拒绝，调用方才不用转型。只有容器能 add 时，接口更窄，调用方在加入子节点之前要知道自己拿着的是容器。两种都成立，按调用方是否对整棵树一视同仁来选。'},
      {title:'怎样自己验证',body:'构造三层：套装里有单品和套装。对根调用一次。任何一层都不写 instanceof。再包一层折扣，确认那一层没有子节点列表。'}
    ],
    refs:[['Container','https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/java/awt/Container.html'],['Component','https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/java/awt/Component.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-flyweight-share',
    title:'享元共享的是不变的那一部分，变化的部分调用时再传入',
    prompt:'为什么很多相同的商品规格各 new 一份，就把共享一份叫成单例？',
    promptAnswer:'享元共享不变字段，变化靠参数传入。范围内只能有一份对象那是单例，不是享元。',
    core:'享元把很多逻辑对象里相同且不变的内部状态共享成一份，把每次不同的外部状态留在调用参数里。共享的那份不能被某一次调用改掉，否则所有逻辑对象一起变。单例是整个对象在范围内只有一份。享元通常有很多个逻辑对象，只是它们的不变部分指向同一份。Integer.valueOf 对一小段整数返回缓存实例，这是库里的共享；这段缓存不是数值相等的定义，比较包装值仍看值，见 java-autoboxing-cache。不要为了省对象去共享一个还会改的订单。',
    why:'一万行订单明细各带一份相同的币种、单位和展示名，这些不变字段重复占用。把整个明细做成单例，数量和单价就会串。',
    example:'币种 CNY 的代码和符号是一份共享对象。每一行的金额是调用时传入的，不写进共享对象。两个明细的币种是同一引用，金额各是各的。有人改了共享对象的符号，所有 CNY 行的符号一起变，这一份就不能再共享。',
    task:'标出一份会被很多对象用到的数据里，哪些字段创建后不再变，哪些每次调用都不同。只把不变的那一份共享。',
    answer:'共享对象只放不变字段。变化的数量、金额、坐标由方法参数传入。逻辑对象可以有很多个，共享的内部状态只有一份。整个对象范围内只能有一份，那是单例。共享对象上出现会改字段的方法，就不要再把它分给多个逻辑对象。',
    keywords:'享元 内部状态 外部状态 Integer 缓存',
    diagram:'diagrams/pattern-flyweight-share.svg',
    points:['享元共享的是不变的内部状态','每次不同的数据由调用时传入','整个对象只有一份，那是单例'],
    deep:[
      {title:'要改就换一份',body:'内部状态发布之后不能再改。展示名要变时，新建一份共享对象，让新的逻辑对象指向它。已经发出去的引用继续指向旧的一份。'},
      {title:'怎样自己验证',body:'造出两个业务对象，确认它们的共享部分是同一引用，各自的金额不是。共享对象上不应存在会改字段的方法。若存在，一次修改会同时改变两个业务对象的读取结果。'}
    ],
    refs:[['Integer.valueOf','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html#valueOf(int)'],['Java 教程：接口','https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_45) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
