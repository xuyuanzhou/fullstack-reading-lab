/* 《分布式高并发》D8：微服务=SOA；禁库内计算特性。 */
const COVERAGE_JAVA_77 = [
  {
    track:'java', group:"分布式与高并发", id:"microservices-not-just-soa-relabel",
    title:"“微服务本质还是 SOA”抹掉了关键差别",
    prompt:"为什么资料写微服务从本质意义上看还是 SOA，只是不绑定技术、靠 REST 拼起来？",
    promptAnswer:"微服务不是给 SOA 换名。要独立部署与清晰边界，不是拆成更多进程就算。",
    core:"微服务与 SOA 都谈服务化拆分，资料指出谱系关系不算错。但本质还是 SOA 会抹掉 Fowler 等人强调的差别：团队与发布独立性、去中央化治理、接口与数据所有权、避免企业总线式中心化。多语言与 REST 也不是微服务定义的充分条件。对照原文 https://martinfowler.com/articles/microservices.html，应说清相同点与分叉点，而不是一句本质相同。",
    why:"面试背本质是 SOA，却答不出独立部署、数据所有权与避免共享大库。",
    example:"把用户与订单拆成两服务、各自数据库、独立发版：这是微服务常见形态。仅把单体模块换成 SOAP/ESB 调用仍是经典 SOA 味道。",
    task:"划掉“本质=SOA 就结束”。列出至少两条微服务相对经典 SOA 的分叉。",
    answer:"划掉一句本质相同。谱系相关，但微服务强调独立部署与去中心治理等。多语言/REST 不是充分条件。",
    keywords:"微服务 SOA Fowler 独立部署",
    origin:"《分布式高并发.pdf》约第 17 页：微服务本质还是 SOA",
    diagram:"diagrams/microservices-not-just-soa-relabel.svg",
    points:["谱系相关不等于定义等同","独立部署与数据所有权是分叉","REST/多语言不是充分条件"],
    deep:[
      {title:"和拆分动机",body:"连接数平方、共用业务提取是动机之一，见拆分课；不等于完成微服务。"},
      {title:"怎样自己验证",body:"对照 Fowler 文：独立部署、去中心化、产品型团队等条目自检架构。"}
    ],
    refs:[["Martin Fowler：Microservices","https://martinfowler.com/articles/microservices.html"],["SOA 与微服务对比讨论","https://martinfowler.com/articles/microservices.html#AreMicroservicesJustSOA"],["CNCF 词汇","https://glossary.cncf.io/"]]
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
    diagram:"diagrams/mysql-db-features-ban-not-absolute.svg",
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
