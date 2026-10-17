/* 系统设计：退款状态、接口实现、时序图的 opt 与 loop。仍是同一笔下单。 */
const COVERAGE_JAVA_126 = [
  {
    track:'java', group:'系统设计', id:'draw-uml-state-refund',
    title:'已支付后退款要新状态和新事件',
    prompt:'已支付之后的退款，能不能复用「取消」？',
    promptAnswer:'不能。取消只从待支付出发。已支付经「退款完成」到新状态「已退款」。',
    core:'状态图里没有箭头，就不允许这次迁移。取消的起点仍是待支付，终点仍是已取消。已支付之后若要退款，另加状态「已退款」，事件写「退款完成」，箭头从已支付指向已退款。已发货不接这条箭头：货已经出库，不能用同一个事件离开。出库和签收仍保留。待支付也不能指向已退款，还没支付就没有这笔退款。',
    example:'在原来的迁移上追加一条：\n\n```text\n[*] --> 待支付\n待支付 --> 已支付 : 支付成功\n待支付 --> 已取消 : 取消\n已支付 --> 已发货 : 出库\n已支付 --> 已退款 : 退款完成\n已发货 --> 已完成 : 签收\n```',
    task:'画出含已退款的订单状态机。写明退款完成的起点和终点，并写出哪两条箭头不能出现。',
    answer:[
      '```text',
      '[*] --> 待支付',
      '待支付 --> 已支付 : 支付成功',
      '待支付 --> 已取消 : 取消',
      '已支付 --> 已发货 : 出库',
      '已支付 --> 已退款 : 退款完成',
      '已发货 --> 已完成 : 签收',
      '```',
      '',
      '1. 退款完成从已支付到已退款。',
      '2. 没有已支付到已取消的箭头。',
      '3. 没有已发货到已退款的箭头，也没有待支付到已退款的箭头。',
    ].join('\n'),
    keywords:'UML state refund new transition',
    diagram:'diagrams/draw-uml-state-refund.svg',
    points:['退款使用新状态已退款和新事件退款完成','取消的起点仍然只是待支付','已发货不使用退款完成这条迁移'],
    deep:[
      {title:'出库之后是另一件事',body:'已发货之后的退货见 `draw-uml-state-return`：新状态已退货，事件退货入库。不能把退款完成同时接到已支付和已发货上。'},
      {title:'怎样自己验证',body:'从已支付出发，数离开它的箭头。应能看见出库和退款完成，看不见取消。从待支付出发，应能看见取消，看不见退款完成。'},
    ],
    refs:[['OMG：UML 2.5.1','https://www.omg.org/spec/UML/2.5.1/About-UML'],['UML：State machine diagrams','https://www.uml-diagrams.org/state-machine-diagrams.html']]
  },
  {
    track:'java', group:'系统设计', id:'draw-uml-realize',
    title:'实现用虚线空心三角指向端口',
    prompt:'MySQL 适配器指向库存端口，该用实线空心三角还是虚线空心三角？',
    promptAnswer:'虚线空心三角。三角指向库存端口，这是实现。实线空心三角是泛化，用来指向父类。',
    core:'〔接口｜一组操作的约定，调用方只依赖这组操作〕用带 «interface» 的框，或单独写在端口上。〔实现｜某个类型答应提供接口里的操作〕是虚线加大空心三角，三角指向接口。MySQL 适配器实现库存端口。下单应用只使用这个端口，所以仍是依赖：虚线开口箭头，从下单应用指向库存端口，没有三角。泛化是实线空心三角，三角指向父类，例如在线支付指向支付方式。不要把实现画成实线。',
    example:'端口、适配器和调用方：\n\n```text\n«interface» 库存端口\n  按条件扣减()\nMySQL适配器 ..|> 库存端口\n下单应用 ..> 库存端口\n在线支付 --|> 支付方式\n```\n\n..|> 的三角指向库存端口。--|> 的三角指向支付方式。',
    task:'画出库存端口、MySQL 适配器、下单应用和支付方式。标出哪一条是实现，哪一条是依赖，哪一条是泛化。',
    answer:[
      '```text',
      '«interface» 库存端口',
      'MySQL适配器 ..|> 库存端口',
      '下单应用 ..> 库存端口',
      '在线支付 --|> 支付方式',
      '```',
      '',
      '1. 实现是虚线空心三角，指向库存端口。',
      '2. 下单应用到端口是依赖，没有三角。',
      '3. 在线支付到支付方式是实线空心三角。',
    ].join('\n'),
    keywords:'UML interface realization generalization',
    diagram:'diagrams/draw-uml-realize.svg',
    points:['实现是虚线加大空心三角，三角指向接口','使用端口的一方画依赖，不画实现','泛化是实线空心三角，三角指向父类'],
    deep:[
      {title:'实现不是部署',body:'MySQL 适配器实现库存端口，只说明它提供这组操作。它和订单服务是不是同一个可部署单元，看组件图，不看这条虚线。'},
      {title:'怎样自己验证',body:'三角若是实线，问它是不是父类。库存端口不是 MySQL 适配器的父类，这条线应改成虚线。下单应用若也画成实现，就变成它自己去扣库存。'},
    ],
    refs:[['OMG：UML 2.5.1','https://www.omg.org/spec/UML/2.5.1/About-UML'],['UML：Realization','https://www.uml-diagrams.org/realization.html']]
  },
  {
    track:'java', group:'系统设计', id:'draw-uml-fragment',
    title:'时序图用 opt 和 loop 分开可选与重复',
    prompt:'「带了券才核销」该放进 opt 还是 alt？',
    promptAnswer:'opt。只有一支，守卫成立才核销，不成立就跳过，提交仍继续。alt 用来分开互斥的两支。',
    core:'组合片段圈出一段消息。opt 只有一个操作数，守卫写在方括号里；守卫为真才执行，为假就跳过，后面的消息照常走。alt 至少两支，互斥，至多走一支，库存足够和不足用它。〔loop｜按守卫重复同一段消息的组合片段〕在守卫为真时把框里的消息再做一遍。出库可以按订单行循环：还有未出库的行，就再发一次「出库一行」。不要用 loop 把整次提交订单再插入一遍。',
    example:'券是可选，出库按行重复：\n\n```text\n页面 -> 订单服务 : 提交订单\nopt [用户带了券码]\n  订单服务 -> 优惠 : 核销\n  优惠 --> 订单服务 : 已核销\n订单服务 -> 数据库 : 条件更新库存并插入订单\nloop [还有未出库的订单行]\n  订单服务 -> 仓储 : 出库一行\n  仓储 --> 订单服务 : 该行已出库\n```',
    task:'画出核销优惠券的 opt，以及按订单行出库的 loop。两个守卫都要写上。',
    answer:[
      '```text',
      'opt [用户带了券码]',
      '  订单服务 -> 优惠 : 核销',
      '  优惠 --> 订单服务 : 已核销',
      'loop [还有未出库的订单行]',
      '  订单服务 -> 仓储 : 出库一行',
      '  仓储 --> 订单服务 : 该行已出库',
      '```',
      '',
      '1. 没有券时跳过核销，不另画一支「不核销」。',
      '2. loop 只重复出库这一段。',
      '3. 库存足够或不足仍用 alt，不要改成 loop。',
    ].join('\n'),
    keywords:'UML sequence opt loop combined fragment',
    diagram:'diagrams/draw-uml-fragment.svg',
    points:['opt 只有一支，守卫不成立就跳过','alt 的分支互斥，至多执行一支','loop 按守卫重复框内的消息，不重复整次提交'],
    deep:[
      {title:'跳过不是另一支',body:'opt 不要为守卫为假再画一个空分支。那种互斥的两支是 alt。没有券码时，核销的消息不出现，提交订单继续。'},
      {title:'怎样自己验证',body:'问守卫为假时图上还剩什么。opt 应只少了框里的消息。loop 应能指出重复的是哪几条消息，而不是从「提交订单」重新开始。'},
    ],
    refs:[['OMG：UML 2.5.1','https://www.omg.org/spec/UML/2.5.1/About-UML'],['UML：Sequence combined fragments','https://www.uml-diagrams.org/sequence-diagrams-combined-fragment.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_126) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
