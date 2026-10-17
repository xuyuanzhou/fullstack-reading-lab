/* 系统设计：已完成后的退货、本地消息表、Saga。仍是同一笔下单。 */
const COVERAGE_JAVA_132 = [
  {
    track:'java', group:'系统设计', id:'draw-uml-state-done',
    title:'已完成后退货要另一条事件',
    prompt:'已完成之后的退货，能不能复用「退货入库」？',
    promptAnswer:'不能。退货入库只从已发货到已退货。已完成经「顾客退回」到已退货。',
    core:'签收之后货在顾客手里。离开已完成要用新事件「顾客退回」，箭头指向已退货。退货入库仍只连接已发货和已退货，表示货还没签收就回到仓库。不要把退货入库再接到已完成上，也不要接到已支付上。退款完成仍只从已支付到已退款。取消仍只从待支付到已取消。签收仍从已发货到已完成。',
    example:'在退货那张图上再追加一条：\n\n```text\n已发货 --> 已退货 : 退货入库\n已发货 --> 已完成 : 签收\n已完成 --> 已退货 : 顾客退回\n已支付 --> 已退款 : 退款完成\n```',
    task:'画出已完成后的退货。写明顾客退回的起点和终点，并写出退货入库不能从哪两个状态出发。',
    answer:[
      '```text',
      '已发货 --> 已退货 : 退货入库',
      '已发货 --> 已完成 : 签收',
      '已完成 --> 已退货 : 顾客退回',
      '已支付 --> 已退款 : 退款完成',
      '待支付 --> 已取消 : 取消',
      '```',
      '',
      '1. 顾客退回从已完成到已退货。',
      '2. 退货入库不从已完成出发，也不从已支付出发。',
      '3. 没有已完成到已退款的箭头。',
    ].join('\n'),
    keywords:'UML state return after completion',
    diagram:'diagrams/draw-uml-state-done.svg',
    points:['已完成之后的退货使用事件顾客退回，终点仍是已退货','退货入库仍然只从已发货出发','已支付不使用退货入库，已完成不使用退款完成'],
    deep:[
      {title:'两条事件可以进同一个状态',body:'已发货和已完成都可以到达已退货，但事件不同。盖住事件名之后，两条箭头不应能互换。'},
      {title:'怎样自己验证',body:'从已完成出发，应只看见顾客退回，看不见退货入库。从已发货出发，应能看见退货入库和签收，看不见顾客退回。'},
    ],
    refs:[['OMG：UML 2.5.1','https://www.omg.org/spec/UML/2.5.1/About-UML'],['UML：State machine diagrams','https://www.uml-diagrams.org/state-machine-diagrams.html']]
  },
  {
    track:'java', group:'系统设计', id:'draw-tx-outbox',
    title:'本地消息表图画同一次提交里的两行',
    prompt:'支付库和订单库，能不能画成同一次提交？',
    promptAnswer:'不能。支付行和待发行在支付库同一次提交。订单库是消费时的另一次提交。',
    core:'这张图回答的是可靠通知，不是两个库的一次提交。〔本地消息表｜业务更新和一条待发记录在同一个数据库的同一次提交〕画在支付库里面：支付行改成已支付，待发行写成 NEW，外面一对提交括号。〔中继｜提交之后才扫描待发行并投递的进程〕画在括号外面，经消息到达订单库。\n\n订单库单独一个框、单独一次提交，把订单改成已支付。不要画一条线把支付库和订单库收成一个事务。同一支付单号再次到达时，订单状态不再改变。见 `evo-tx-outbox`。',
    example:'两行在左，另一次提交在右：\n\n```text\n支付库 BEGIN\n  payment = 已支付\n  outbox = NEW\nCOMMIT\n中继 --> 消息 --> 订单服务\n订单库：另一次提交，订单 = 已支付\n```',
    task:'画出支付库中的两行、中继和订单库。标明哪两行同一次提交。写出两个库之间不能出现的箭头。',
    answer:[
      '```text',
      '支付库：payment = 已支付 与 outbox = NEW，同一次 COMMIT',
      '中继 --> 消息 --> 订单服务',
      '订单库：另一次提交，订单 = 已支付',
      '```',
      '',
      '1. 括号只框住支付库的两行。',
      '2. 没有把支付库和订单库连成一次提交的箭头。',
      '3. 同一支付单号再到一次，订单状态不再改变。',
    ].join('\n'),
    keywords:'outbox diagram one local commit',
    diagram:'diagrams/draw-tx-outbox.svg',
    points:['支付行和待发行在支付库的同一次提交里','订单库的更新是另一次提交，两个库不连成一个事务','同一支付单号再次到达时，订单状态只改变一次'],
    deep:[
      {title:'和 Saga 图怎么分',body:'这张图只保证通知能发出。预留已经提交之后的释放，画在 Saga 图上，不画进这个提交括号。'},
      {title:'怎样自己验证',body:'数提交括号，应有两个，而且分属两个库。中继若画在支付库的括号里面，发送就被算进了数据库提交。'},
    ],
    refs:[['microservices.io：事务性发件箱','https://microservices.io/patterns/data/transactional-outbox.html']]
  },
  {
    track:'java', group:'系统设计', id:'draw-tx-saga',
    title:'Saga 图画新的写入，不画回滚',
    prompt:'预留已经提交，支付失败，能不能画一条回滚箭头？',
    promptAnswer:'不能。回滚盖不住已经提交的预留。释放预留和把订单改成已取消，都是新的写入。',
    core:'〔Saga｜一串已经提交的本地事务，失败时用新的业务动作向前纠正〕的图分成上下两排。上排是已经提交的正向步骤：插入待支付订单，预留库存，然后支付失败停住。下排箭头写释放预留、订单改成已取消，旁边标「新写入」。不要把下排画成数据库回滚，也不要画成把上排的提交倒回去。\n\n补偿按订单号只生效一次。第二次释放不再改变预留数量。用户支付的等待画在上排的末端，不画进一个还开着的全局事务。短预留要三套接口和空回滚时，换成 TCC，见 `evo-tx-tcc`。本图见 `evo-tx-saga`。',
    example:'正向已提交，反向是新动作：\n\n```text\n插入待支付（已提交） --> 预留库存（已提交） --> 支付失败\n支付失败 --> 释放预留（新写入）\n支付失败 --> 订单改成已取消（新写入）\n```',
    task:'画出正向两步和反向两步。标明哪些已经提交，哪些是新写入。写出这张图上不能出现的箭头。',
    answer:[
      '```text',
      '正向：插入待支付（已提交） --> 预留库存（已提交） --> 支付失败',
      '反向：释放预留（新写入）',
      '反向：订单改成已取消（新写入）',
      '```',
      '',
      '1. 没有从支付失败指回「回滚预留」的箭头。',
      '2. 释放重复到达时，预留数量只加回一次。',
      '3. 支付等待不在一个还开着的全局事务里。',
    ].join('\n'),
    keywords:'saga diagram compensating write',
    diagram:'diagrams/draw-tx-saga.svg',
    points:['正向的订单和预留都已经提交，支付失败不能画成回滚','释放预留和取消订单是新的写入','补偿按订单号只生效一次'],
    deep:[
      {title:'和 TCC 图怎么分',body:'能接受「已预留」被看见，并用一次释放纠正，就停在这张图。必须画 Try、Confirm、Cancel，并画出取消先到时的空成功，才另开 TCC。'},
      {title:'怎样自己验证',body:'上排每一步都应标着已提交。下排若写成 rollback 或 undo，就还是在倒放已经结束的事务。'},
    ],
    refs:[['microservices.io：Saga','https://microservices.io/patterns/data/saga.html'],['Microsoft：Saga','https://learn.microsoft.com/en-us/azure/architecture/patterns/saga']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_132) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
