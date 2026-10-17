/* 系统设计：已发货后退货、单体一次提交。主从、静态和事务选型在 coverage-java-130.js。 */
const COVERAGE_JAVA_131 = [
  {
    track:'java', group:'系统设计', id:'draw-uml-state-return',
    title:'已发货后退货要新状态和新事件',
    prompt:'已发货之后的退货，能不能复用「退款完成」？',
    promptAnswer:'不能。退款完成只从已支付到已退款。已发货经「退货入库」到新状态「已退货」。',
    core:'货已经离开仓库，就不能再用退款完成离开已发货。另加状态「已退货」，事件写「退货入库」，箭头从已发货指向已退货。退款完成仍只连接已支付和已退款：还没出库，没有货可入库。已支付也不使用退货入库。取消仍只从待支付到已取消。签收仍从已发货到已完成。待支付不能指向已退货。',
    example:'在退款那张图上再追加一条：\n\n```text\n[*] --> 待支付\n待支付 --> 已支付 : 支付成功\n待支付 --> 已取消 : 取消\n已支付 --> 已发货 : 出库\n已支付 --> 已退款 : 退款完成\n已发货 --> 已完成 : 签收\n已发货 --> 已退货 : 退货入库\n```',
    task:'画出含已退货的订单状态机。写明退货入库的起点和终点，并写出哪两条箭头不能出现。',
    answer:[
      '```text',
      '[*] --> 待支付',
      '待支付 --> 已支付 : 支付成功',
      '待支付 --> 已取消 : 取消',
      '已支付 --> 已发货 : 出库',
      '已支付 --> 已退款 : 退款完成',
      '已发货 --> 已完成 : 签收',
      '已发货 --> 已退货 : 退货入库',
      '```',
      '',
      '1. 退货入库从已发货到已退货。',
      '2. 没有已发货到已退款的箭头。',
      '3. 没有已支付到已退货的箭头，也没有待支付到已退货的箭头。',
    ].join('\n'),
    keywords:'UML state return after shipment',
    diagram:'diagrams/draw-uml-state-return.svg',
    points:['已发货之后的退货使用新状态已退货和新事件退货入库','退款完成仍然只从已支付到已退款','已发货不使用退款完成，已支付不使用退货入库'],
    deep:[
      {title:'签收之后是另一条',body:'已完成之后的退货见 `draw-uml-state-done`：事件是顾客退回，终点仍是已退货。不要把退货入库接到已完成或已支付上。'},
      {title:'怎样自己验证',body:'从已发货出发，应能看见签收和退货入库，看不见退款完成。从已支付出发，应能看见退款完成，看不见退货入库。'},
    ],
    refs:[['OMG：UML 2.5.1','https://www.omg.org/spec/UML/2.5.1/About-UML'],['UML：State machine diagrams','https://www.uml-diagrams.org/state-machine-diagrams.html']]
  },
  {
    track:'java', group:'系统设计', id:'draw-monolith',
    title:'单体图画一个进程和一次提交',
    prompt:'订单和库存在同一个进程里，图上该画几个数据库、几次提交？',
    promptAnswer:'一个数据库、一次提交。订单模块和库存模块在同一个虚线框里互相调方法。支付等待画在这次提交的外面。',
    core:'单体图回答的是这次下单还在不在一次〔本地事务｜同一个数据库上的一次提交或回滚〕里。虚线框表示一次部署、一个进程。框里是订单模块和库存模块，箭头写方法调用，不出进程。框下只有一个数据库，一条连接，括号写从扣库存到插入待支付、到方法返回前结束。任一步失败，两张表都回到提交前。\n\n支付页画在框外。用户还在付款时，这次事务已经结束。不要把支付等待画进括号里。\n\n出现负载均衡和三份相同应用，是集群图。出现两个数据库，是 SOA 图或微服务图。见 `evo-monolith-one-tx`。',
    example:'一个进程、一次提交：\n\n```text\n浏览器 --> 一个进程\n  订单模块 --方法调用--> 库存模块\n  BEGIN --> 扣库存 --> 插入待支付 --> COMMIT\n一个进程 --> 一个数据库\n支付页在框外\n```',
    task:'画出浏览器、一个进程里的订单与库存、一个数据库。标出事务从哪一步开始、到方法返回前结束。写出这张图上不能出现的框。',
    answer:[
      '```text',
      '浏览器 --> 一个进程（订单模块、库存模块）',
      'BEGIN --> 扣库存 --> 插入待支付 --> COMMIT',
      '一个进程 --> 一个数据库',
      '支付页在框外',
      '```',
      '',
      '1. 只有一个数据库、一次提交。',
      '2. 支付等待不在这次提交里面。',
      '3. 没有负载均衡，也没有第二个数据库。',
    ].join('\n'),
    keywords:'monolith diagram one local transaction',
    diagram:'diagrams/draw-monolith.svg',
    points:['单体图画一个进程和一次本地事务，订单与库存一起提交或一起回滚','支付等待画在这次提交的外面','三份副本或两个数据库不是这张图'],
    deep:[
      {title:'和集群图怎么分',body:'虚线框里若变成三份相同的下单应用，前面再加负载均衡，就换成集群图。模块仍在一个进程里时，不要画成三个服务。'},
      {title:'怎样自己验证',body:'数数据库框，应只有一个。数提交括号，应只有一对。支付页若画在括号里面，就把等待算进了这次事务。'},
    ],
    refs:[['Martin Fowler：Monolith First','https://martinfowler.com/bliki/MonolithFirst.html'],['Spring Framework：事务管理','https://docs.spring.io/spring-framework/reference/data-access/transaction.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_131) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
