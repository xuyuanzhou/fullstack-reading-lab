/* Design patterns: name the varying part, then match it in the JDK and in Spring. */
const COVERAGE_JAVA_43 = [
  {
    track:'java', group:'设计模式', id:'pattern-one-variation',
    title:'先指出哪一块允许变，再决定叫什么模式',
    prompt:'为什么类名写成 DiscountFactory，里面仍是一长串 if，就觉得已经用了工厂？',
    promptAnswer:'类名带 Factory 不够。调用方还要改一长串 if，工厂就没成立；变化应进可替换对象。',
    core:'设计模式的二十三种名字已经列过（见上一课名单）。这一课只做一件事：先指出当前允许替换的那一块变化，再决定打开后面哪一课。模式名称是给「哪一块允许换」起的标签，不是给类名加的后缀。调用方看见的方法可以不变；变的可能是算法、某一步里的实现、外面多包的一层行为、别人接口的形状，或谁来响应这件事。造出哪一个产品、怎样组装可选部件、这一份实例管多大范围，也各是一块变化。指不出这一块时，类名里的 Factory、Manager、Strategy 只是单词。Java 的接口规定调用方能调用哪些方法；这一课接着问：接口后面那一块，到底准备被谁换掉。',
    why:'类名改成工厂之后，新的折扣规则仍然要改同一个方法里的 if。调用方没有少改，测试也仍然要覆盖这条方法里的每一支。名字没有把变化关进一个可以单独替换的对象。',
    example:'结算方法里用 if 区分满减、会员价和优惠券。类改名为 DiscountFactory 之后，这三支 if 还在同一个方法里。新增“限时价”时，仍然打开这个方法加一支。把每种算法做成单独的对象之后，结算方法只保留“选中哪一个对象再调用”，新增规则才不必再编辑这条方法的分支。',
    task:'找出一个名字里带 Factory 或 Manager、方法内部仍在按类型分支的类。写下真正会变的那一块，以及调用方现在还要不要跟着改。',
    answer:'真正会变的是分支里的算法，不是类名。调用方如果还要修改这条 if，或者每加一种规则都要改这个方法，工厂这个名字没有成立。变化应关进可以单独替换的对象，调用方只保留选择和调用。指不出那一块时，不要先起模式的名字。',
    keywords:'设计模式 变化点 工厂 接口',
    diagram:'diagrams/pattern-one-variation.svg',
    points:['模式命名的是允许替换的那一块','类名带 Factory 不能代替方法里的分支','先对上变化点，再打开对应的那一课'],
    deep:[
      {title:'先对上变化点，再打开对应的课',body:'算法是策略，一步的正文是模板，外层行为是装饰器，接口形状是适配器，谁来响应是观察者。创建哪一个产品、可选部件怎样组装、一份实例的范围、能不能碰到目标、子系统收成一次调用、链上停不停、状态自己切换、两个维度不要相乘、叶子和容器用同一接口、不变部分拿来共享，各自是后面的一课。复制一份再改、为了撤销保存快照、在一棵固定的树上加一种新操作，先不要为了凑齐名单再加一层类。'},
      {title:'怎样自己验证',body:'选一个带 Factory 或 Manager 后缀的类，数一数新增一种情况要改几个方法。如果仍然要打开原来的 if 加一支，把变化点记在这支分支上，而不是记在类名上。'}
    ],
    refs:[['Java 教程：接口','https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html'],['Comparator','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-strategy-swap',
    title:'策略换掉的是算法，调用那一行保持不变',
    prompt:'为什么每加一种计价规则，都去结算方法里再写一个 else if？',
    promptAnswer:'策略用同一接口替换算法。结算方法里继续堆 else if，策略就没成立。',
    core:'策略把会变的算法做成同一个接口的不同对象。调用方持有这个接口，调用的方法名不变，换的是对象。上一课要求先指出变化点：这里变化点就是算法本身。如果连步骤的先后顺序都要换，那不是策略，是下一课的模板解决不了、应继续把整个算法换成另一个对象的情况。稳定的两三支判断可以留在原地；会按产品不断加规则时，才值得把每支提出去。',
    why:'规则都写在结算方法里时，新规则必须修改这条已经上线的方法，旧规则的测试也会被一起打开。算法对象分开之后，新规则是一个新类，结算方法仍调用同一个接口方法。',
    example:'settle(order) 里用 else if 处理满减、会员价、优惠券。调用方写成 Discount discount = …; discount.apply(order) 之后，三种规则是三个类，settle 不再出现这三支。再加限时价时，新增一个实现，settle 的调用行仍是 apply。',
    task:'把一段按类型分支的计价改成“同一个方法、不同对象”。写下调用行，以及新增一种规则时哪个文件会变、哪个文件不应再变。',
    answer:'调用行保持为接口上的同一个方法，例如 apply。新增规则时新增一个实现类。结算方法不应再增加 else if。如果新增规则必须改调用顺序或改掉方法名，变化点就不是一个可替换的算法，不要把它叫成策略。',
    keywords:'策略模式 算法 接口 分支',
    diagram:'diagrams/pattern-strategy.svg',
    points:['策略替换的是算法对象','调用方的方法名保持不变','步骤顺序也要变时就不是策略'],
    deep:[
      {title:'选择仍要发生在某处',body:'用哪一个算法，仍要在配置、参数或一张表里决定。策略去掉的是“每种算法的正文都堆在同一个方法里”，不是让选择本身消失。'},
      {title:'怎样自己验证',body:'新增一种规则时，用版本对比看结算方法的 diff。调用行不应增加分支。新的比较逻辑应只出现在新类里。标准库里的同形是给 List.sort 传入不同的 Comparator，下一课单独核对。'}
    ],
    refs:[['Comparator','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html'],['List.sort','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html#sort(java.util.Comparator)']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-template-steps',
    title:'模板定死步骤顺序，只换其中一步的正文',
    prompt:'为什么把打开、计算、关闭都写成子类可以随便重排的方法？',
    promptAnswer:'模板方法固定步骤顺序，子类只替换某一步。需要重排整条流程时改用策略对象。',
    core:'模板把顺序写在一处：先准备，再调用那一步，再收尾。子类或回调只替换其中一步的正文，不能改顺序。上一课的策略是整个算法都可以换；这一课的变化点只是某一步里面做什么。若两种流程的步骤先后不同，应做成两个策略，而不是在子类里重写整个骨架。调用方调用的是骨架那一个方法，不自己串联每一步。',
    why:'每个子类都复制“打开、计算、关闭”时，有人会漏掉关闭，或把关闭写到计算前面。顺序一旦散落，资源泄漏和半成品会按子类不同的方式出现。骨架只留一份时，漏掉的是同一种错误，而不是每种导出各漏一次。',
    example:'导出报表的顺序是打开写入器、写正文、关闭写入器。子类只实现写正文。调用方只调用 export()。如果某个子类把关闭挪到写正文之前，写入还没发生就把写入器关了，这份骨架就被拆掉了。那种流程应另做一个对象，而不是重写 export 的顺序。',
    task:'写一个三步骨架，只把中间一步留给替换。再写一种必须调换前后顺序的需求，说明它为什么不能放进这个骨架。',
    answer:'骨架方法里的顺序固定为准备、替换的那一步、收尾。替换方不能重排这三步。调用方只调用骨架方法。若一种需求必须先收尾再准备，它是另一个算法，应按策略做成另一个对象，而不是在子类里重写整个骨架。',
    keywords:'模板方法 步骤 回调 骨架',
    diagram:'diagrams/pattern-template.svg',
    points:['模板固定的是步骤顺序','子类或回调只替换一步的正文','顺序本身要变时改用策略'],
    deep:[
      {title:'收尾要放在骨架里',body:'关闭、提交或翻译异常若让每个子类自己记得写，就会有人漏。这些步骤属于顺序，不属于那一步的业务正文。'},
      {title:'怎样自己验证',body:'让替换方抛出一次异常，确认骨架里的收尾仍然执行，或者异常按骨架规定的类型抛出。再试一种必须调换顺序的流程，它不应通过重写骨架方法来完成。标准库里 InputStream 用 read 的重复调用实现成块读取，子类替换的是单字节那一步。'}
    ],
    refs:[['InputStream','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/InputStream.html'],['JdbcTemplate','https://docs.spring.io/spring-framework/reference/data-access/jdbc/core.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-decorator-contract',
    title:'装饰器套在同一接口上，调用方的类型不用改',
    prompt:'为什么每加一种能力，就再建一个子类，最后出现缓冲加密文件流这种类？',
    promptAnswer:'装饰器同接口层层加能力，可拆可组合。用子类笛卡尔积会把组合写死。',
    core:'装饰器实现的是和被包装对象同一个接口，把调用转进去之前或之后加上一层行为。调用方变量的类型保持这个接口，可以套一层，也可以再套一层。上一课换的是步骤里的正文；这一课换的是外层行为，核心动作还是那一个方法。它不是适配器：适配器把一个别的形状变成你要的接口，装饰器两边都是同一个接口。',
    why:'用继承叠加能力时，缓冲、加密、计数的组合会变成一批子类，而且每种组合都要重新实现一遍。运行时想先缓冲再计数，继承树里往往没有这个类。套在同一接口上时，组合是包一层，不是新建一种类型。',
    example:'变量类型是 DataSource。先包一层计时，再包一层重试，调用方仍声明为 DataSource，调用的仍是 getConnection。如果改成 TimingRetryFileDataSource 这种子类，下一次只想要计时、不要重试时，又要一个新类。',
    task:'给一个接口加两层行为，调用方变量的类型保持不变。说明为什么不能改成一个同时带两种能力的子类。',
    answer:'两层都实现原来的接口，外层持有内层。调用方的变量类型不变，调用的方法名不变。只需要其中一层时，去掉另一层的包装即可。一个同时继承两种能力的子类会把组合写死，下一次只想要其中一种时还要再开类。若包装之后调用方必须改用另一个接口，那是适配器，不是装饰器。',
    keywords:'装饰器 同一接口 包装 继承',
    diagram:'diagrams/pattern-decorator.svg',
    points:['装饰器与被包装对象是同一个接口','能力用套一层来组合，而不是用子类乘起来','包装后换成另一个接口的是适配器'],
    deep:[
      {title:'外层要转调内层',body:'装饰器加上自己的行为之后，仍要把调用交给里面的对象，否则核心动作丢了。它不是把原对象换掉的另一种算法。'},
      {title:'怎样自己验证',body:'声明变量为接口类型，依次套上两层，确认赋值仍能通过编译。再去掉其中一层，调用方代码除了组装处不应修改。标准库里的同形是 BufferedInputStream 包住另一个 InputStream，下一课核对关闭时会发生什么。'}
    ],
    refs:[['BufferedInputStream','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedInputStream.html'],['FilterInputStream','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/FilterInputStream.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-adapter-shape',
    title:'适配器改变的是接口形状，不添加一层同一接口的行为',
    prompt:'为什么第三方客户端的方法对不上自己的接口，就去改业务代码里的每一个调用？',
    promptAnswer:'适配器对接方法名形状。业务只调自己的接口；缓冲重试别塞进转换类。',
    core:'适配器实现你已经定好的接口，内部去调用一个形状不同、通常也不归你改的类型。调用方只依赖自己的接口。上一课的装饰器两边是同一个接口；这一课两边的方法名和参数可以完全不同。适配器不负责把缓冲、重试这类行为一层层叠上去。那些仍是装饰器，包在适配之后的接口上。',
    why:'业务方法直接调用第三方的 payByXml 时，每换一家渠道都要改结算。把渠道细节留在适配器里之后，结算只调用 charge。若把适配器写成既转换形状又顺手加重试，下一次只想换渠道、不想改重试时，两件事会缠在一个类里。',
    example:'业务接口是 Payment.charge(order)。旧客户端只有 payByXml(String)。适配器实现 Payment，在 charge 里把订单收成对方要的字符串再调用 payByXml。结算代码看不到 payByXml。InputStreamReader 做的是同一类事：外面是字符流，里面是字节流。',
    task:'找一个方法名对不上的现成类型，写一个只做转换的适配器。业务调用点只保留你自己的接口方法。',
    answer:'适配器实现业务接口，内部调用现成类型的那个不同名方法。业务代码只调用自己的方法，例如 charge。现成类型的方法名不应再出现在结算里。缓冲或重试不要写进这个转换类；它们包在适配之后的同一接口上。若两边本来就是同一个接口，就不需要适配器。',
    keywords:'适配器 接口转换 InputStreamReader',
    diagram:'diagrams/pattern-adapter.svg',
    points:['适配器把别的形状收成你要的接口','调用方不出现第三方的方法名','同一接口上叠加行为仍是装饰器'],
    deep:[
      {title:'你定接口，对方定不了',body:'适配器存在，是因为那个类型的源码不归这次需求改，或者它的方法是为另一个调用方设计的。能改原类型时，直接让它实现接口，不必再包一层。'},
      {title:'怎样自己验证',body:'业务类的源码里搜索第三方方法名，应只出现在适配器中。再看适配器的方法列表：它实现的是你的接口。标准库对照是 InputStreamReader，把字节流变成字符流，而不是给同一个 InputStream 加缓冲。'}
    ],
    refs:[['InputStreamReader','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/InputStreamReader.html'],['BufferedInputStream','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedInputStream.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-observer-push',
    title:'观察者自己登记，主体不把每个响应者写进返回值',
    prompt:'为什么每增加一个要通知的模块，就去订单方法里再注入一个服务并调用它？',
    promptAnswer:'旁路通知让下游自己登记。每加一个模块就往业务方法里注入调用，观察者还没成立。',
    core:'观察者先登记，主体在事情发生时通知已登记的各方。订单方法的返回值仍是这次下单的结果，不是审计、邮件、积分各自返回值拼起来的东西。上一课的适配器解决形状不合；这一课的变化点是“谁要知道这件事”，而且这些人会继续增加。主体如果逐个注入并调用，每增加一方就要改主体。登记之后，主体只保留“通知已经发生”。通知默认并不等于换一条线程稍后执行，那是投递方式，后面 Spring 那一课再分开。',
    why:'订单方法里依次调用账单、审计和邮件时，邮件抛错会决定订单方法的成败，而且每加一个下游都要改订单。下游的名单散落在业务方法里，读代码的人无法从登记处看见全部响应者。',
    example:'placeOrder 在保存成功后调用 billing.onPaid 和 mail.onPaid，返回值是 OrderId。增加审计时必须再注入 AuditService 并加一次调用。改成审计自己登记之后，placeOrder 只发出“已支付”这件事，返回值仍是 OrderId，审计的处理结果不写进这个返回值。',
    task:'列出一个业务方法里所有“顺便调用”的下游。说明哪些应该改为登记，以及业务方法的返回值还是什么。',
    answer:'会继续增加、而且不构成这次操作返回值的下游，应改为自己登记。业务方法的返回值保持为这次操作的结果，例如订单号，而不是各个下游的返回值。主体里不应再逐个注入这些下游。若某个调用的结果必须决定本次成功或失败，它就不是旁路通知，应留下来作为这次操作的步骤。',
    keywords:'观察者 登记 通知 返回值',
    diagram:'diagrams/pattern-observer.svg',
    points:['响应者自己登记，主体不逐个点名','主体的返回值不是各方结果的拼接','通知不等于已经改到别的线程执行'],
    deep:[
      {title:'决定成败的调用留在步骤里',body:'库存扣减若失败就必须让下单失败，它是这次操作的一步，不是观察者。观察者适合保存已经成功之后还要告知的那些方。'},
      {title:'怎样自己验证',body:'增加一个下游时，业务方法的 diff 应为空，新代码只出现在登记处。再看业务方法的返回类型，它不应变成下游返回值的列表。JavaBeans 的 PropertyChangeSupport 就是维护监听器名单并转发事件；Spring 里的发布方式在后面的课核对，默认同步这一点不要提前当成异步。'}
    ],
    refs:[['PropertyChangeSupport','https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/java/beans/PropertyChangeSupport.html'],['Spring：应用事件','https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html']]
  },
  {
    track:'java', group:'设计模式', id:'java-comparator-strategy',
    title:'排序规则用 Comparator 传进去，不必改元素类',
    prompt:'为什么要按姓名排序就去改 User 的 compareTo，按编号排序又得再改回来？',
    promptAnswer:'排序规则用 Comparator 传入，不要改元素的 compareTo。第三种顺序只加比较器。',
    core:'List.sort 接受一个 Comparator，用它比较两个元素。比较规则是调用时传进去的策略，元素类不必实现 Comparable，列表类也不必为每种顺序建子类。上一课的策略是“方法名不变、对象替换”；这里方法名就是 sort，替换的是比较器。元素自己的 compareTo 只适合一种自然顺序。第二种顺序应再传一个比较器，而不是改掉第一种。',
    why:'把姓名顺序写进 User.compareTo 之后，报表要按编号排序时，要么改回 compareTo，要么复制一份列表类型。两种顺序会抢同一个方法。调用处传入比较器时，User 保持不变，两处排序各带各的规则。',
    example:'users.sort(Comparator.comparing(User::name)) 按姓名排。另一处 users.sort(Comparator.comparing(User::id)) 按编号排。User 没有 compareTo。两处调用的都是 List.sort，变的是比较器。',
    task:'对同一列表做两种排序，元素类不实现 Comparable。写出两处调用，并说明元素类为什么可以不改。',
    answer:'两处都调用 List.sort，分别传入按姓名和按编号的 Comparator。元素类不实现 Comparable 也能编译通过。新增第三种顺序时只新增比较器，不修改 User，也不新建一种 List 子类。若把规则写进 compareTo，第二种顺序就必须改掉第一种。',
    keywords:'Comparator List.sort 策略 Comparable',
    diagram:'diagrams/java-comparator.svg',
    points:['Comparator 是传给 sort 的比较策略','同一列表可以带不同的比较器','元素的 compareTo 只表示一种自然顺序'],
    deep:[
      {title:'自然顺序不是唯一顺序',body:'Comparable 适合元素自己说得清的那一种顺序，例如编号。界面上的姓名、价格、时间各是一次调用时的策略，不要轮流写进 compareTo。'},
      {title:'怎样自己验证',body:'写一个没有 Comparable 的 User，分别用 comparing(User::name) 和 comparing(User::id) 排序同一列表。两次结果的先后应不同，User 的源码不应出现 compareTo。'}
    ],
    refs:[['Comparator','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html'],['List.sort','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html#sort(java.util.Comparator)']]
  },
  {
    track:'java', group:'设计模式', id:'java-buffered-stream-decorator',
    title:'缓冲流包住原来的流，关闭时里面那一层也会关',
    prompt:'为什么套了 BufferedInputStream 之后，还以为只要关内层的文件流？',
    promptAnswer:'缓冲流是装饰器：关最外层即可连带内层。不要为组合能力去建笛卡尔积子类。',
    core:'BufferedInputStream 实现的仍是 InputStream，构造时收下另一个 InputStream，读取时先填自己的缓冲区。这是装饰器：变量类型不用从 InputStream 改成别的接口。它的关闭会转到被包住的那一层。文件流如果已经交给缓冲流，调用方关闭缓冲流即可，不要再把文件流单独留在外面关一次或忘在缓冲流里面不关。加密、解压如果也是同一接口上的包装，就继续往外或往里套，而不是做成 BufferedEncryptedFileInputStream 这种类。',
    why:'只关闭 FileInputStream、却从缓冲流读取时，谁负责关缓冲区所在的那一层会说不清。反过来，关了缓冲流却以为文件还开着，后面的代码会去用一个已经被一起关掉的文件。组合一旦靠子类起名，缓冲加解密又会再长出一个类。',
    example:'InputStream in = new BufferedInputStream(new FileInputStream(path))。读取用 in.read()。in.close() 会把文件流一起关掉。变量的类型仍然是 InputStream。再包一层同样实现 InputStream 的计数流时，最外层的 close 顺着包装往里关。',
    task:'用缓冲流包住文件流，写出变量类型和应该调用 close 的那一个对象。再说明为什么不建一个带缓冲的文件流子类。',
    answer:'变量类型保持 InputStream。应关闭最外层的 BufferedInputStream，它会把内层文件流一起关掉。不建子类，是因为下一次只想要文件流、不要缓冲时，去掉这一层包装即可，不必再有一种新的文件流类型。若包装之后必须改成 Reader，那是 InputStreamReader 这种适配，不是这一层缓冲。',
    keywords:'BufferedInputStream FilterInputStream 装饰器 close',
    diagram:'diagrams/java-stream-buffer.svg',
    points:['缓冲流的类型仍是 InputStream','关闭外层时会关闭被包住的流','能力靠再包一层组合，不靠子类起名'],
    deep:[
      {title:'关一次就够',body:'FilterInputStream 的关闭转到里面的流。外层已经关闭之后，不要再把内层流交给别人使用。组装时谁创建，就在最外层关闭。'},
      {title:'怎样自己验证',body:'把文件流交给 BufferedInputStream，只调用外层的 close。随后再读内层，应处于已关闭。变量声明保持 InputStream，确认不需要把调用方改成缓冲流类型。'}
    ],
    refs:[['BufferedInputStream','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/BufferedInputStream.html'],['FilterInputStream','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/FilterInputStream.html']]
  },
  {
    track:'java', group:'设计模式', id:'java-proxy-needs-interface',
    title:'JDK 动态代理只能站在接口前面',
    prompt:'为什么对一个没有接口的具体类调用 Proxy.newProxyInstance，期望得到它的子类？',
    promptAnswer:'JDK 动态代理只代理接口，不会给具体类生成子类。没有接口就换别的代理方式。',
    core:'Proxy.newProxyInstance 要的是一组接口和一个 InvocationHandler。生成出来的对象实现这些接口，对接口方法的调用进入 handler 的 invoke。它不是那个具体类的子类，所以不能把类本身放进接口数组。没有接口的类要做子类代理，是另一套生成方式，Spring 在没有接口时会走到那边，不在这一课。你拿到的对象运行时类型也不是你写的那个接口的实现类，而是代理类。',
    why:'把 ArrayList 这类具体类交给 newProxyInstance，运行时直接拒绝，因为数组里必须是接口。之后若按具体类去强转代理对象，也会失败。调用没有进 invoke，多半是调到了接口上不存在的方法，或者根本没有拿到代理。',
    example:'Greeter 是接口。Proxy.newProxyInstance 的接口数组只有 Greeter.class，invoke 里返回拼好的字符串。调用 hello 会进入 invoke。把 ArrayList.class 放进接口数组，会抛出 IllegalArgumentException。代理对象可以赋给 Greeter，不能赋给某个你手写的 Greeter 实现类。',
    task:'为一个接口生成代理并调用它的方法，确认进入 invoke。再把一个具体类放进接口数组，写下拒绝的结果。',
    answer:'接口方法的调用进入 InvocationHandler.invoke。代理对象的编译类型是该接口。具体类放进接口数组时，newProxyInstance 抛出 IllegalArgumentException，不会生成子类。没有接口的类不要用这一支 API 去代理。运行时类名是代理类，不是你写的实现类。',
    keywords:'Proxy InvocationHandler 动态代理 接口',
    diagram:'diagrams/java-proxy-interface.svg',
    points:['JDK 动态代理生成的是接口的实现','调用接口方法会进入 invoke','具体类不能放进接口数组'],
    deep:[
      {title:'拿到的不是你 new 的那个类',body:'调用方若用 getClass 对照自己写的实现类，两者不同。能调用的是接口上的方法。要看子类代理或 Spring 怎么选代理种类，去切面那一课，不要在这里把两种生成方式写成同一种。'},
      {title:'怎样自己验证',body:'对接口方法下断点应停在 invoke，参数里能看见方法名。再执行把具体类放进接口数组的 newProxyInstance，应得到 IllegalArgumentException。Proxy.isProxyClass 对生成类的 Class 应为真。'}
    ],
    refs:[['Proxy','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/reflect/Proxy.html'],['InvocationHandler','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/reflect/InvocationHandler.html']]
  },
  {
    track:'java', group:'设计模式', id:'java-unmodifiable-is-view',
    title:'不可修改列表是视图，原列表一改它就跟着变',
    prompt:'为什么 Collections.unmodifiableList 之后，还往原列表里加元素，只读的那一份也变了？',
    promptAnswer:'不可修改是视图，不是快照。改原列表，视图也会变；要隔离就先拷贝再包视图。',
    core:'unmodifiableList 返回的是原列表的视图，不是拷贝。通过视图去添加或删除会抛出 UnsupportedOperationException。直接改原列表仍然成功，之后从视图读到的是改过的内容，因为查询会透传到原列表。它看起来像一层拒绝写入的装饰，但没有把元素复制出来。要一份后来互不影响的列表，需要自己拷贝元素，再包上不可修改视图。',
    why:'把视图交给别的模块并当作快照之后，原列表继续 add，对方的遍历会看见新元素，校验和缓存都会跟着变。视图上的 add 失败只说明这一条引用不能写，不说明数据已经被冻结。',
    example:'raw 里先有 a。view = Collections.unmodifiableList(raw)。raw.add("b") 之后 view.get(1) 是 b。view.add("c") 抛出 UnsupportedOperationException。raw 和 view 的 size 都变成 2。',
    task:'对一个 ArrayList 做 unmodifiableList。分别从原列表和从视图添加元素，写下哪一次成功、视图的内容是什么。',
    answer:'从原列表添加会成功，视图立刻读到这个新元素，因为视图透传查询。从视图添加抛出 UnsupportedOperationException，原列表不变。若需要互不影响，先把元素拷到一个新列表，再对新列表做不可修改视图。只调用 unmodifiableList 不能得到快照。',
    keywords:'unmodifiableList 视图 拷贝 UnsupportedOperationException',
    diagram:'diagrams/java-unmodifiable-view.svg',
    points:['不可修改列表是原列表的视图','改原列表，视图读到的内容跟着变','视图上的修改会抛 UnsupportedOperationException'],
    deep:[
      {title:'拒绝写入不是复制',body:'装饰器可以拦住某一条引用上的写。拦不住的是别人手里的原列表。快照要先复制元素，再考虑把复制品包成不可修改。'},
      {title:'怎样自己验证',body:'记录 view 的 size，向 raw 添加一个元素，view.size 应加一，并能读到该元素。再调用 view.add，应抛出 UnsupportedOperationException，且 raw 的内容与抛出前相同。'}
    ],
    refs:[['Collections.unmodifiableList','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html#unmodifiableList(java.util.List)'],['List','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html']]
  },
  {
    track:'java', group:'设计模式', id:'java-runnable-is-command',
    title:'把要做的事放进 Runnable，线程池里不写业务',
    prompt:'为什么把发货步骤直接写进线程池的实现，每换一种任务就改池子？',
    promptAnswer:'任务用 Runnable/Callable 提交，池子不写业务步骤。换任务不应改线程池类。',
    core:'Runnable 把一段要执行的工作收成对象，Executor.execute 接收这个对象。池子负责何时在哪条线程上调用 run，不包含订单或邮件的步骤。这是命令：变化点是工作内容，调用方是 execute 那一行。池的队列容量、拒绝策略是另一课，这里不改那些参数。工作对象可以带上这次的订单号，池子的类源码里不应出现订单。',
    why:'发货逻辑写进池的实现之后，发邮件也要改同一份池子，两种业务互相看见。把工作放进 Runnable 之后，换一种任务只是换提交给 execute 的对象，池的类不用打开。',
    example:'executor.execute(() -> ship(orderId))。execute 的参数是这段工作。线程池源码和配置类里没有 ship。另一处 executor.execute(() -> mail(orderId)) 仍调用同一个 execute。orderId 被工作对象带上，而不是写成池子的字段。',
    task:'提交两种工作给同一个 Executor。指出池的类不应修改的原因，以及订单号应放在哪里。',
    answer:'两种工作都通过 execute 提交，各自是一个 Runnable。池的类不出现发货或发邮件的方法。订单号在提交处被工作对象捕获或作为字段保存。若要改队列是不是有界，那是池的构造参数，不是把业务写进池子。换任务时不应出现线程池类的 diff。',
    keywords:'Runnable Executor 命令 线程池',
    diagram:'diagrams/java-runnable-command.svg',
    points:['Runnable 把一次工作收成对象','Executor.execute 不包含业务步骤','任务数据跟工作对象走，不写进池的字段'],
    deep:[
      {title:'池子决定的是何时跑',body:'执行器决定排队和用哪条线程调用 run。跑什么由 Runnable 决定。把业务写进执行器，会让每一种任务都变成执行器的一种子类或一支分支。'},
      {title:'怎样自己验证',body:'提交两种 Runnable 之后，用版本对比确认执行器的类没有 diff。在 run 里打印订单号，确认号码来自提交时带上的值，而不是执行器的实例字段。'}
    ],
    refs:[['Runnable','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Runnable.html'],['Executor','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Executor.html']]
  },
  {
    track:'java', group:'设计模式', id:'spring-factorybean-product',
    title:'FactoryBean 注入出去的是 getObject 的产品',
    prompt:'为什么实现了 FactoryBean，注入时期望拿到的却是工厂自己？',
    promptAnswer:'注入默认拿到 getObject 的产品；要工厂本身才加 &。别把工厂类型写进业务构造器。',
    core:'容器里一个 FactoryBean 占据一个名字时，按这个名字取出的是 getObject 返回的产品，不是工厂实例。要工厂自己，调用 getBean 时在名字前加 &。这和“类名带 Factory”不是一回事：上一组课里的工厂若只是普通对象，注入到的就是它自己；实现了 FactoryBean 之后，同名注入会变成产品。isSingleton 默认返回 true，产品会被容器缓存，不要以为每次注入都会再调用一次 getObject。',
    why:'把 ClientFactory 注入进需要 Client 的构造器时，类型对不上，或者反过来把工厂当成已经连好的客户端去用。名字前面少了 & 时，拿到的永远是产品。多写了 & 时，业务代码拿到工厂，调用的却是客户端的方法。',
    example:'名为 client 的 FactoryBean，getObject 返回 Client。getBean("client") 的运行时类型是 Client。getBean("&client") 的运行时类型是这个 FactoryBean。业务构造器的参数写成 Client，容器给的是产品。',
    task:'写一个返回明确产品类型的 FactoryBean。分别按名字和按 &名字取出，记下两个运行时类型。',
    answer:'不带 & 的名字得到 getObject 的产品，类型是产品类型。带 & 的名字得到 FactoryBean 本身。业务代码的构造器应声明产品类型，不应声明工厂类型，除非这处代码就是要配置工厂。默认 isSingleton 为 true 时，多次按产品类型注入拿到的是同一份产品，而不是每次都新建。',
    keywords:'FactoryBean getObject getBean 产品',
    diagram:'diagrams/spring-factorybean.svg',
    points:['同名 getBean 得到的是产品','工厂实例要在名字前加 &','默认会把产品当作单例缓存'],
    deep:[
      {title:'普通工厂类不会自动变成产品',body:'类名或方法名里的 Factory 不会触发这条规则。只有实现 FactoryBean 并交给容器之后，按名字取出的才是 getObject 的结果。@Bean 方法返回的已经是产品，不要再套一层同名的 FactoryBean 来“更像工厂”。'},
      {title:'怎样自己验证',body:'注册一个 FactoryBean，打印 getBean(名字).getClass 和 getBean("&"+名字).getClass。前者应是产品类，后者应是工厂类。再注入两次产品类型，默认情况下应是同一个实例。'}
    ],
    refs:[['Spring：FactoryBean','https://docs.spring.io/spring-framework/reference/core/beans/factory-extension.html#beans-factory-extension-factorybean'],['Spring：依赖注入','https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html']]
  },
  {
    track:'java', group:'设计模式', id:'spring-event-sync-default',
    title:'Spring 事件默认要等监听器跑完，不是发出去就换线程',
    prompt:'为什么把 ApplicationEvent 当成下单方法返回之后，监听器会在别的线程里慢慢处理？',
    promptAnswer:'默认监听器同步跑在发布调用里。不是下单返回后自动换线程慢慢处理。',
    core:'监听器用 @EventListener 或 ApplicationListener 登记。业务方法调用 publishEvent，不逐个注入监听器。手册写明默认情况下监听器同步接收事件：publishEvent 会阻塞到监听器处理完。这和前面的观察者是同一结构，投递方式却不是“稍后在别的线程”。要换线程，必须另外加上 @Async。监听器方法如果返回一个事件，Spring 会把那个返回值再发布出去，它仍然不是下单方法的返回值。',
    why:'以为发布之后下单方法已经返回、邮件失败不影响这次请求，默认情况下邮件监听器仍在同一次调用里跑。邮件抛出的异常会在 publishEvent 这一行冒出来，事务还没结束。加了 @Async 之后才变成另一条线程，异常也不再沿这条调用栈回来。',
    example:'placeOrder 保存订单后 publishEvent，返回订单号。没有 @Async 的审计监听器在 publishEvent 返回之前执行完。审计若抛异常，placeOrder 这一行能看见。给这个监听器加上 @Async 之后，它改到别的线程，placeOrder 不再等它。',
    task:'写一个不带 @Async 的监听器，在里面睡眠或抛异常。记录 publishEvent 是等它结束，还是马上下单方法已返回。',
    answer:'默认监听器跑在发布方这次调用里，publishEvent 要等它结束才返回。它抛出的异常会出现在发布那一行。下单方法的返回值仍是订单号，不是监听器的返回值。只有显式 @Async 的监听器才改到别的线程，并且不再沿发布方的调用栈把异常抛回来。增加监听器时，下单方法不应再新增注入。',
    keywords:'ApplicationEvent publishEvent EventListener 同步',
    diagram:'diagrams/spring-events.svg',
    points:['监听器登记后由 publishEvent 通知','默认在发布方线程里跑完才返回','@Async 才把这个监听器换到别的线程'],
    deep:[
      {title:'返回事件会再发布一次',body:'监听器可以返回一个新事件，容器会把它再发布出去。那是下一次通知，不是把监听器的业务结果塞进下单方法的返回值。'},
      {title:'怎样自己验证',body:'监听器里先睡眠一秒且不要加 @Async，测量 publishEvent 前后的时间差，应能看见这秒等待。再让监听器抛出运行时异常，发布方应在同一行接到。最后只给这个方法加 @Async，发布方应不再等待这一秒。'}
    ],
    refs:[['Spring：应用事件','https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-functionality-events'],['Spring：@EventListener','https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html']]
  },
  {
    track:'java', group:'设计模式', id:'spring-jdbctemplate-callback',
    title:'JdbcTemplate 固定连接和异常转换，回调只提供 SQL',
    prompt:'为什么用了 JdbcTemplate，服务方法上还在声明 throws SQLException？',
    promptAnswer:'JdbcTemplate 把 SQLException 译成 DataAccessException。服务方法不必再声明 throws SQLException。',
    core:'JdbcTemplate 把 JDBC 的骨架留在模板里：它提供 Connection，调用你传入的回调，并把 SQLException 转成 DataAccessException，不向外传播 SQLException。回调负责 SQL 和怎样读取结果。这是模板方法，顺序不由每个服务重写。服务方法因此不必声明 SQLException，也不要自己再写一套打开连接、捕获 SQLException、关闭语句的流程套在模板外面。',
    why:'服务层继续声明 SQLException 时，调用方会按驱动异常来分支，换数据库或加上模板的翻译之后分支对不上。在回调外面再关闭模板正在使用的连接，会让同一次查询的语句提前失效。骨架被拆开之后，翻译和关闭不再有一处标准顺序。',
    example:'orderService 调用 jdbcTemplate.query(sql, rowMapper)，方法签名没有 SQLException。SQL 写错时，冒出来的是 DataAccessException。rowMapper 只负责从结果行取出字段。服务里没有 Connection 的 try/finally。',
    task:'用 JdbcTemplate 写一次查询。方法签名不要 SQLException。故意写错表名，记下实际抛出的异常类型。',
    answer:'服务方法签名没有 throws SQLException。错误的 SQL 抛出的是 DataAccessException，不是让调用方声明 SQLException。SQL 和行映射留在回调或模板的参数里。打开连接、翻译异常不在服务方法里再写一遍。若要改翻译规则，设置的是模板的 SQLExceptionTranslator，而不是在每个服务里捕获驱动异常。',
    keywords:'JdbcTemplate SQLException DataAccessException 回调',
    diagram:'diagrams/spring-jdbctemplate.svg',
    points:['回调提供 SQL 和结果抽取','模板把 SQLException 转成 DataAccessException','服务方法不必声明 SQLException'],
    deep:[
      {title:'不要在模板外再管连接',body:'连接由模板从数据源取出并交给回调。服务里再保存这条 Connection 并在别的地方关闭，会和模板的收尾叠在一起。事务边界交给事务管理，不在回调里提交。'},
      {title:'怎样自己验证',body:'写一个签名不含 SQLException 的查询方法。把表名改错后调用，捕获到的应是 DataAccessException。再全局搜索这个服务类，不应出现 Connection 的关闭代码。'}
    ],
    refs:[['Spring：JdbcTemplate','https://docs.spring.io/spring-framework/reference/data-access/jdbc/core.html'],['Spring：数据访问异常','https://docs.spring.io/spring-framework/reference/data-access.html']]
  },
  {
    track:'java', group:'设计模式', id:'spring-getbean-hides-deps',
    title:'构造器写出依赖，不要在方法里再 getBean',
    prompt:'为什么字段上已经能注入，业务方法里还是 ApplicationContext.getBean？',
    promptAnswer:'依赖写在构造器上，缺了启动就失败。业务方法里 getBean 会把失败推迟并绑死字符串名。',
    core:'构造器注入是容器把协作者交进来，类的参数列表就是它要的东西。方法里再调用 getBean，类在向容器按名字索取，这是服务定位。容器那一课讲的是启动时怎样把依赖装上；这一课讲的是不要在业务方法里临时索取。getBean 找不到时，失败出现在这次调用，而不是对象构造的时候。参数列表上看不见的依赖，单测也无法在 new 的时候发现少传了什么。',
    why:'下单方法内部 getBean("inventory") 时，OrderService 的构造器仍是空的。测试 new 出这个服务能通过编译，第一次请求才发现容器里没有这个名字。换一个实现时改的是字符串，而不是构造器类型，编译器帮不上忙。',
    example:'OrderService 的构造器接收 InventoryClient。测试传入一个假的客户端就能调用下单。若改成方法里 context.getBean("inventory", InventoryClient.class)，测试必须先有一个装好这个名字的容器，否则失败发生在 getBean 那一行，而不是构造时期。',
    task:'把一处方法内的 getBean 改成构造器参数。说明测试在哪一行会发现依赖没准备好。',
    answer:'依赖写在构造器参数上，类型就是协作者的类型。缺少它时，对象无法构造，测试在 new 或容器启动时失败。getBean 把这个失败推迟到业务方法执行到那一行，而且依赖的是字符串名字。构造器上已经能看见的协作者，不要在方法里再按名字取一次。',
    keywords:'构造器注入 getBean 服务定位 ApplicationContext',
    diagram:'diagrams/spring-constructor-deps.svg',
    points:['构造器参数列出这个类要的协作者','方法里 getBean 把缺失推迟到调用时','按名字索取时编译器看不到类型'],
    deep:[
      {title:'启动失败好过请求中失败',body:'构造器缺依赖时，容器起不来，请求还没进来。方法里临时获取时，前面的请求可能已经成功，到这一条分支才失败。装配问题应停在启动，而不是停在某次 if 里面。'},
      {title:'怎样自己验证',body:'去掉构造器里的那个协作者 Bean，应用应在启动时失败，而不是第一条请求才失败。再改回方法内 getBean，确认测试可以在不启动容器的情况下编译通过，并在调用该方法时才抛出找不到 Bean。'}
    ],
    refs:[['Spring：依赖注入','https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html'],['Spring：ApplicationContext','https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_43) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
