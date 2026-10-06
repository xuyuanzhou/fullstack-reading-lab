/* Design patterns: name the roster first, then go deep by family. */
const COVERAGE_JAVA_49 = [
  {
    track:'java', group:'设计模式', id:'pattern-gof-catalog',
    title:'先把二十三种名字列全，再打开后面的课',
    prompt:'为什么一上来就写策略模式，却说不清这一章一共有哪些名字？',
    core:'设计模式是给反复出现的那一块变化起的名字，不是一份必须背完才许写代码的咒语。Gamma、Helm、Johnson、Vlissides 那本书把对象结构里最常被点名的解法收成二十三种，按三族分开：创建型五个、结构型七个、行为型十一个。创建型管“这一次造出哪一份、怎么组装、范围是不是一份”：工厂方法、抽象工厂、建造者、原型、单例。结构型管“对象怎么接在一起还不把调用方绑死”：适配器、桥接、组合、装饰器、外观、享元、代理。行为型管“一次请求或一次算法怎么走”：责任链、命令、解释器、迭代器、中介者、备忘录、观察者、状态、策略、模板方法、访问者。这一课只列名单。后面按族深入已经有单独课的那些；名单上还有、但还没写成整课的七个，下一课之后的 `pattern-gof-rest` 先写清变化点。没有名单就先写策略，是在用一个名字代替目录。',
    why:'面试或改代码时直接说“上个策略”，对方问还有哪些、这一次为什么不是工厂或装饰器，答不上来。名字成了口头禅，目录从未打开。',
    example:'结算要换计价规则，变化点是已经造好的对象怎么算，对应行为型里的策略，深入课是 `pattern-strategy-swap`。渠道客户端方法名对不上自己的 Payment，变化点是接口形状，对应结构型里的适配器，深入课是 `pattern-adapter-shape`。HttpRequest 有一堆可选项，变化点是组装过程，对应创建型里的建造者，深入课是 `pattern-builder-assemble`。三件事不是同一个模式，但都属于这一份二十三的名单。',
    task:'不看后面的课，先按创建、结构、行为三列写出二十三个中文名。再各举一件本周会碰到的需求，标上它落在哪一列、哪一个名字。不要先写类图。',
    answer:'创建型五个：工厂方法、抽象工厂、建造者、原型、单例。结构型七个：适配器、桥接、组合、装饰器、外观、享元、代理。行为型十一个：责任链、命令、解释器、迭代器、中介者、备忘录、观察者、状态、策略、模板方法、访问者。计价规则换算法是策略；第三方方法名对不上是适配器；可选项分步放进成品是建造者。写不出三列时，不要开始画某一个模式的类。',
    keywords:'设计模式 GoF 创建型 结构型 行为型',
    diagram:'diagrams/pattern-gof-catalog.svg',
    points:['二十三种按创建、结构、行为三族列出','这一课只列名单，不代替后面的深入课','先对上族和名字，再打开对应那一课'],
    deep:[
      {title:'抽象工厂不是另一种工厂方法',body:'工厂方法换的是“这一个产品由谁创建”。抽象工厂换的是“必须成套出现的一组产品由同一创建者给出”，账单和回执不能混配。深入时两件事写在 `pattern-factory-method` 里，名单上仍是两个名字。'},
      {title:'怎样自己验证',body:'合上这一页，在纸上写出 5、7、11 三个数字和每一列的中文名。缺一个就对照本课补上，不要用 Manager、Helper 这种项目里的类名去凑数。'}
    ],
    refs:[['Wikipedia：Design Patterns','https://en.wikipedia.org/wiki/Design_Patterns'],['Wikipedia：Software design pattern','https://en.wikipedia.org/wiki/Software_design_pattern']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-family-test',
    title:'先问这一次变的是创建、连接，还是请求怎么走',
    prompt:'为什么分不清该用工厂还是策略，就把两个类都建上？',
    core:'对着二十三个名字挑选之前，先用三句问把族定下来。造出哪一个、可选部件怎么放、这一份实例的范围，是创建型。把一个已经存在的对象接到你要的接口上、叠一层同一接口的行为、用替身挡住目标，是结构型。已经有对象之后，换算法、换某一步正文、沿链传递、按状态切换、通知谁来响应，是行为型。工厂方法结束在返回产品；策略开始在产品已经在手里、只换怎么算。两个类都建上，通常是族还没问。Java 的接口只规定调用方能调用哪些方法，见基础课 `java-interface-contract`；族决定的是接口后面那一块准备被谁替换。',
    why:'既写 DiscountFactory.create 又在 create 里 new 三种算法对象，再让结算去调用 apply。新增规则时两个类一起改。选择发生了两次，变化点却仍糊在一起。',
    example:'NumberFormat.getInstance 按地区返回格式器，调用方不 new DecimalFormat，这是创建。BufferedInputStream 包住另一个 InputStream，变量类型仍是 InputStream，这是结构。List.sort 传入不同 Comparator，排序过程的比较算法被换掉，这是行为。三处都可以说“用了模式”，但族不同，后面打开的课也不同。',
    task:'给三件事各标一个族：按地区得到日期格式器；给已有数据源套一层超时；结算时换成会员价算法。不要同时写工厂和策略两个类。',
    answer:'按地区得到格式器是创建，打开工厂方法那一课。给数据源套超时是结构，打开装饰器那一课。结算换成会员价是行为，打开策略那一课。create 里如果还在写算法正文，族就还没分开。',
    keywords:'创建型 结构型 行为型 工厂 策略',
    diagram:'diagrams/pattern-family-test.svg',
    points:['挑选名字之前先定创建、结构或行为','工厂结束在交出产品，策略开始在产品已经在手里','两个类都建上通常是族还没问'],
    deep:[
      {title:'同一需求会跨族，但每一块仍要分开',body:'先用工厂造出支付渠道，再用适配器接到 Payment，最后用策略换手续费算法。三块可以同时出现，但每一块的变化点不同，不要塞进一个 Manager。'},
      {title:'怎样自己验证',body:'在纸上只允许勾选一个族。若必须勾两个，把需求拆成两句话再各标一次。拆不开时，先写变化点，不要先起两个模式名。'}
    ],
    refs:[['Java 教程：对象','https://docs.oracle.com/javase/tutorial/java/concepts/object.html'],['Java 教程：接口','https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html']]
  },
  {
    track:'java', group:'设计模式', id:'pattern-gof-rest',
    title:'名单上还有七个：先写清变化点，再决定要不要单独立课',
    prompt:'为什么二十三里只记住策略和单例，其余都说“用不到可以不看”？',
    core:'名单要完整，不等于每一个都值得立刻加一层类。这一课只给还没有单独深入课的七个写出变化点。原型：用一份已有实例当样本，复制后改不同的那几项，而不是每次从零装配。命令：把一次请求收成对象，让它能排队、撤销或记日志，Runnable 是标准库里的同形，见 `java-runnable-is-command`。迭代器：在不暴露内部结构的前提下按顺序取出元素，调用方用的是 Iterator，不是底层数组。中介者：一群对象不再两两引用，改成只和同一个协调者说话。备忘录：把对象内部状态存成一份快照，供之后恢复，且快照不把私有字段公开给调用方。访问者：在一棵固定的元素类型上加一种新操作，而不去改那些元素类。解释器：把一种小语言的文法收成对象树再求值，SQL 或正则不是让你手写解释器的理由。这七个先认得，再决定后面要不要单独立课；不要为了凑齐二十三就先加一层。',
    why:'为了在笔记里写满二十三，给每个按钮请求包一个 Command 接口，队列里却只有同步调用。名字齐了，变化点并不存在。',
    example:'编辑器的撤销需要恢复光标和正文，这是备忘录，不是把整个窗口再 new 一次。文件系统树要加“统计体积”且不能改 Directory 和 File 的类，这是访问者。菜单项被点之后既要执行又要写操作历史，这是命令。若只是当场调一个方法、不要排队也不要撤销，就不要先做 Command。',
    task:'给“撤销一次编辑”“遍历列表但不暴露数组”“按钮点击要记历史”“一棵不能改的树上加导出 XML”各标一个名字。再写下哪一件其实只是普通方法调用，不该为了凑数加接口。',
    answer:'撤销是备忘录。遍历不暴露数组是迭代器。点击要记历史是命令。不能改的树上加导出是访问者。只当场调一个方法、没有排队或撤销，不要加 Command。原型、中介者、解释器同样：指不出那一块变化时，不要先建类。',
    keywords:'原型 命令 迭代器 中介者 备忘录 访问者 解释器',
    diagram:'diagrams/pattern-gof-rest.svg',
    points:['七个未单独立课的名字也要写得出变化点','Runnable 和 Iterator 是命令与迭代器在标准库里的同形','凑齐二十三不是先加一层类的理由'],
    deep:[
      {title:'和已经立课的邻居分开',body:'命令不是策略：策略换的是怎么算，命令收的是这一次要做的事。访问者不是装饰器：装饰器叠的是同一接口上的行为，访问者在固定元素类型上加操作。备忘录不是原型：备忘录是为了恢复，原型是为了从样本再造一份。'},
      {title:'怎样自己验证',body:'每写一个名字，用一句话说“换掉的是哪一块”。说不出就从名单上划掉这一次的使用，而不是划掉这个名字本身。标准库能对上的，打开 Java 标准库那一组课核对，不要另写一套接口。'}
    ],
    refs:[['Iterator','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Iterator.html'],['Runnable','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Runnable.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_49) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
