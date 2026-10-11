/* 《分布式高并发》D8：微服务=SOA；禁库内计算特性。 */
const COVERAGE_JAVA_77 = [
  {
    track:'java', group:"分布式与高并发", id:"microservices-not-just-soa-relabel",
    title:"SOA 与微服务的标准差别",
    prompt:"已经拆成多个远程服务，又用了 REST，为什么还不能说做成了微服务？",
    promptAnswer:"不够。标准差别看独立部署、数据所有权、智能端点与哑管道、围绕业务能力与去中心治理。REST 只是通信方式之一。",
    core:"先给可核对的说法（以 Fowler / Lewis《Microservices》一文为准，而不是某份讲义的“本质还是 SOA”）。\n\nSOA（面向服务架构）：把能力做成可远程调用的服务。历史上“SOA”含义很宽；业界常见落地（下文称经典 SOA）往往是：较粗的服务、经企业服务总线（ESB）做集成与编排、治理偏中心、多个应用仍共享数据库或强依赖中心组件。\n\n微服务：把一个产品做成一套小服务，各自跑在自己的进程里，围绕业务能力划分，用轻量机制通信（常见 HTTP API），由自动化部署做到独立发布，中心化管理尽量少；存储技术也可按服务选择。\n\n标准对照（经典 SOA → 微服务）：\n1. 部署：常要协调多服务同窗口发版 → 目标是单服务可独立部署；必须捆绑发版的，不算做成微服务风格。\n2. 数据：共享企业库或强共库很常见 → 去中心数据管理，服务尽量拥有自己的数据（Database per service 是常见形态）。\n3. 集成：ESB 上堆路由、转换、编排（智能管道）→ 智能端点、哑管道：业务逻辑在服务内，管道只做传输。\n4. 划分：常按技术层或既有系统集成切开 → 按业务能力（订单、库存）组织团队与边界。\n5. 治理：企业级中心规范与总线管控 → 中心管理尽量少，契约与演进在服务边界上完成。\n\n相同点：都谈服务化、远程调用、复用能力。因此有人说微服务是“一种 SOA”或“SOA 做对的子集”——谱系相关可以承认。错误的是把“本质相同”当成定义，或以为 REST、多语言、多进程齐了就等于微服务。PDF 里“本质还是 SOA、靠 REST 拼起来”不能当标准答案。系统设计章经典 SOA 站见 `arch-soa-classic`。",
    why:"讲义写本质相同，学习者就背 REST 与多进程，答不出独立部署和数据归属。对照标准条目后，才能判断系统停在经典 SOA 还是已进入微服务风格。",
    example:"订单与库存都是远程服务，经 ESB 互调，并写同一个 trade 库，发版必须同一窗口：经典 SOA。订单只写 order 库、库存只写 inventory 库，库存可单独发版，服务间 HTTP 或事件直连、总线不承载业务编排：更接近微服务。",
    task:"用五条对照表各写一句：部署、数据、集成管道、划分方式、治理。标出你们系统（或例子）更接近经典 SOA 还是微服务。不要用“用了 REST”当作唯一依据。",
    answer:[
      '五条标准对照（经典 SOA → 微服务）：',
      '',
      '1. 部署：协调同窗口发版 → 单服务可独立部署。',
      '2. 数据：共享写库常见 → 服务尽量自有数据。',
      '3. 集成：ESB 智能管道 → 智能端点、哑管道。',
      '4. 划分：技术层/系统集成 → 按业务能力。',
      '5. 治理：中心总线与企业规范为主 → 中心管理尽量少。',
      '',
      'REST / 多语言 / 多进程都不是充分条件。',
      '“本质还是 SOA”不能当定义；谱系相关不等于定义等同。',
    ].join('\n'),
    keywords:"微服务 SOA 独立部署 数据所有权 ESB",
    origin:"纠正《分布式高并发.pdf》约第 17 页“本质还是 SOA”的简写；标准对照见 Fowler",
    diagram:'diagrams/soa-vs-microservices.svg',
    points:["经典 SOA 与微服务谱系相关，定义不能一句等同","分叉在独立部署、数据所有权、哑管道与业务能力边界","REST 与多语言不是做成微服务的充分条件"],
    deep:[
      {title:"Fowler 怎么说 SOA",body:"SOA 一词被用得太杂；常见落地是 ESB 去粘合单体。有人把微服务看作 SOA 的一种，有人拒绝 SOA 标签。有价值的是用微服务这个更利落的名字标出独立部署、轻量通信、去中心数据等特征。原文：martinfowler.com/articles/microservices.html 一节 Are Microservices Just SOA?"},
      {title:"和系统设计章",body:"经典 SOA 站见 `arch-soa-classic`；演进两条线见 `arch-evolution-stages`；按能力拆开见 `arch-microservice-split`。"},
      {title:"怎样自己验证",body:"列一张表：上次发版是否只动一个服务、写库存是否必须进共享库、有没有 ESB 承载业务编排。三项里任一偏经典 SOA，就不要自称微服务已完成。"}
    ],
    refs:[["Martin Fowler：Microservices","https://martinfowler.com/articles/microservices.html"],["Are Microservices Just SOA?","https://martinfowler.com/articles/microservices.html#AreMicroservicesJustSOA"],["Microsoft：微服务架构风格","https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices"]]
  },
  {
    track:'java', group:"数据库", id:"mysql-db-features-ban-not-absolute",
    title:"“禁止存储过程/视图/触发器/Event”是算力上移策略",
    prompt:"为什么规范一把禁止存储过程、视图、触发器、Event，理由是解放数据库 CPU？",
    promptAnswer:"禁用触发器/存储过程等是团队启发式，不是引擎能力过时。",
    core:"高并发下把复杂业务逻辑堆进库内例程，确实难扩容、难观测——算力上移服务层是合理默认。但四种对象要拆开：视图是存储的查询（见 mysql-view-is-stored-query）；过程不自动事务（见 procedure 课）；触发器藏副作用（见 trigger 课）；Event 是库内调度。绝对禁止会逼出重复 SQL 与失去受控只读视图。策略应是：默认不上库内逻辑；例外要有拥有者、监控与迁移计划。",
    why:"只读报表视图被禁，应用复制三份 JOIN；或反过来用触发器偷偷改库存。",
    example:"允许报表只读视图；禁止用触发器维护库存。夜间归档用应用调度，而不是默认 Event——若用 Event 需当生产任务管理。",
    task:"划掉“四种一刀切非法”。各用一句话：默认态度与例外条件。",
    answer:"划掉一刀切。默认算力上移。视图/过程/触发器/Event 风险不同；例外要拥有者与观测。禁止藏副作用，不是禁止一切对象。",
    keywords:"视图 触发器 Event 存储过程 扩展性",
    origin:"《分布式高并发.pdf》约第 104 页：禁止存储过程、视图、触发器、Event",
    diagram:'library-assets/distributed-hc/p0104.png',
    points:["算力上移是默认策略","四种对象风险不同","例外要拥有者与观测"],
    deep:[
      {title:"和 Event",body:"Event Scheduler 适合库内维护任务，但要当生产作业看，不是隐藏 cron。"},
      {title:"怎样自己验证",body:"列出环境中过程/触发器/Event，标拥有者与失败告警是否存在。"}
    ],
    refs:[["MySQL：视图","https://dev.mysql.com/doc/refman/8.4/en/views.html"],["MySQL：Event Scheduler","https://dev.mysql.com/doc/refman/8.4/en/event-scheduler.html"],["MySQL：存储程序","https://dev.mysql.com/doc/refman/8.4/en/stored-programs-defining.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_77) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
