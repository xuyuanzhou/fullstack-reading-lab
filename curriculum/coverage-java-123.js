/* 系统设计：五张必须会画的图，都用同一笔下单。 */
const COVERAGE_JAVA_123 = [
  {
    track:'java', group:'系统设计', id:'draw-c4-container',
    title:'架构图用 C4 容器图画下单',
    prompt:'画下单的架构图时，方框和箭头各必须写出什么？',
    promptAnswer:'方框是能单独部署的容器。箭头写清协议、交换的数据，以及调用方是不是还在等。',
    core:'这里的架构图用 C4 的容器图。〔容器｜能单独部署、单独跑的应用或数据存储〕人不是容器。订单页面、订单服务、MySQL、消息各是一个容器。箭头不是装饰：写上协议和这一次交换的数据。调用方还在等的，写成实线，并写明不变量在哪一次事务里成立。事实已经成立、稍后才做的副作用，写成虚线，并写「异步」。先写清路径再画框，见 `arch-design-one-path`。',
    example:'同一笔下单：\n\n```text\n下单用户 --HTTPS--> 订单页面\n订单页面 --HTTPS 提交订单--> 订单服务\n订单服务 --SQL 同一事务：扣库存并插入订单--> MySQL\n订单服务 --异步 订单已创建--> 消息\n```',
    task:'画出这一笔下单的容器图。标出谁还在等，以及库存不变量在哪一个容器的哪一次事务里成立。',
    answer:[
      '```text',
      '下单用户 --HTTPS--> 订单页面',
      '订单页面 --HTTPS 提交订单--> 订单服务',
      '订单服务 --SQL 同一事务：扣库存并插入订单--> MySQL',
      '订单服务 --异步 订单已创建--> 消息',
      '```',
      '',
      '库存不变量在 MySQL 那一次事务里成立。发货走消息，调用方不再等。',
    ].join('\n'),
    keywords:'C4 container diagram architecture',
    diagram:'diagrams/draw-c4-container.svg',
    points:['C4 容器是能单独部署的应用或数据存储','箭头写明协议、数据和调用方是否还在等','同步不变量与异步副作用分成两种箭头'],
    deep:[
      {title:'容器不是类',body:'页面里的一个函数、服务里的一个包，都不是容器。容器要能单独部署。类之间的关系用类图，不画进这张架构图。'},
      {title:'怎样自己验证',body:'拿掉箭头上的字。若看不出协议、数据、以及调用方是否还在等，这张图还不能交。'},
    ],
    refs:[['C4 model：Container diagram','https://c4model.com/diagrams/container'],['C4 model：Notation','https://c4model.com/diagrams/notation']]
  },
  {
    track:'java', group:'系统设计', id:'draw-uml-sequence',
    title:'时序图用生命线和同步消息写下单',
    prompt:'下单时序图里，实线箭头和虚线箭头各表示什么？',
    promptAnswer:'实线实心箭头是同步消息，调用方还在等。虚线是返回。库存够不够用 alt 分成两支。',
    core:'UML 时序图从上到下是时间。每个参与者下面一条虚线是〔生命线｜这个对象在这段交互里一直在〕。同步消息是实线、实心箭头，名字写在线上方。返回是虚线、开口箭头。库存这一次可能成功也可能失败，用组合片段 alt，守卫写在方括号里。不要把架构图上的方框再画一遍来代替消息顺序。',
    example:'页面、订单服务、数据库：\n\n```text\n页面 -> 订单服务 : 提交订单\n订单服务 -> 数据库 : 条件更新库存并插入订单\n数据库 --> 订单服务 : 影响行数\nalt 影响行数 = 1\n  订单服务 --> 页面 : 订单号\nalt 影响行数 = 0\n  订单服务 --> 页面 : 库存不足\n```',
    task:'按 UML 时序图画出提交订单。写明同步消息、返回，以及影响行数为 1 和为 0 的两支。',
    answer:[
      '```text',
      '页面 -> 订单服务 : 提交订单',
      '订单服务 -> 数据库 : 条件更新库存并插入订单',
      '数据库 --> 订单服务 : 影响行数',
      'alt [影响行数 = 1]',
      '  订单服务 --> 页面 : 订单号',
      'alt [影响行数 = 0]',
      '  订单服务 --> 页面 : 库存不足',
      '```',
      '',
      '实线是同步调用。虚线是返回。两支不能并成一句「然后返回结果」。',
    ].join('\n'),
    keywords:'UML sequence diagram lifeline alt',
    diagram:'diagrams/draw-uml-sequence.svg',
    points:['生命线表示参与者在这段交互中存在','同步消息是实线实心箭头，返回是虚线','互斥结果放在 alt 的守卫里'],
    deep:[
      {title:'返回不是另一条业务',body:'影响行数、订单号、库存不足都是对上一条同步消息的返回。不要画成数据库再主动调用页面。'},
      {title:'怎样自己验证',body:'沿生命线从上往下读。任何一条实线箭头，下一眼要能找到它的虚线返回，或一个还没画完的 alt。'},
    ],
    refs:[['OMG：UML 2.5.1','https://www.omg.org/spec/UML/2.5.1/About-UML'],['UML：Sequence diagrams','https://www.uml-diagrams.org/sequence-diagrams.html']]
  },
  {
    track:'java', group:'系统设计', id:'draw-er-crow',
    title:'ER 图用鸦脚记法画订单',
    prompt:'一条订单和它的用户，两端的基数各是多少？',
    promptAnswer:'一条订单恰好一个用户。一个用户可以有零条或多条订单。记号画在靠着那个实体的一端。',
    core:'这里用鸦脚记法（crow\'s foot，Information Engineering）画 ER 图。实体是方框，联系是线。〔基数｜这一端最少几条、最多几条〕的记号贴在靠着该实体的那一端。双竖线是恰好 1，圆圈加竖线是 0 或 1，竖线加鸦脚是 1 或多，圆圈加鸦脚是 0 或多。Chen 的 ER 图用矩形、菱形和椭圆；要落到表和列时，用鸦脚，列名写在实体框里。一条订单行同时属于恰好一个订单和恰好一个商品。',
    example:'用户、订单、订单行、商品：\n\n```text\n用户 ||--o< 订单 ||--o< 订单行 >o--|| 商品\n用户     user_id\n订单     order_id, user_id\n订单行   order_id, sku_id, qty\n商品     sku_id\n```',
    task:'用鸦脚记法画出用户、订单、订单行、商品。写明每一端是恰好 1，还是 0 或多。',
    answer:[
      '```text',
      '用户 ||--o< 订单 ||--o< 订单行 >o--|| 商品',
      '```',
      '',
      '1. 订单靠用户的一端是 ||：一条订单恰好一个用户。',
      '2. 用户靠订单的一端是 o<：一个用户有零条或多条订单。',
      '3. 订单行靠订单、靠商品都是恰好 1；订单和商品那端都是 0 或多。',
    ].join('\n'),
    keywords:'ER crow\'s foot cardinality',
    diagram:'diagrams/draw-er-crow.svg',
    points:['鸦脚记号画在靠着该实体的一端','恰好 1 是双竖线，0 或多是圆圈加鸦脚','订单行同时引用恰好一个订单和恰好一个商品'],
    deep:[
      {title:'Chen 图不写列',body:'Chen 用菱形表示联系，属性画成椭圆。评审表结构时改用鸦脚，外键列要出现在多方的框里。'},
      {title:'怎样自己验证',body:'指着订单上的 user_id，应能说它指向恰好一个用户。指着用户，应能说订单可以是零条。'},
    ],
    refs:[['MySQL Workbench：Relationship Notation','https://dev.mysql.com/doc/workbench/en/wb-data-modeling-menus.html'],['Peter Chen：The Entity-Relationship Model','https://dl.acm.org/doi/10.1145/320434.320440']]
  },
  {
    track:'java', group:'系统设计', id:'draw-uml-state',
    title:'状态图写出订单允许的迁移',
    prompt:'「已支付」能直接变成「已取消」吗？',
    promptAnswer:'不能。取消只从待支付出发。已支付要退款，须另加状态和事件，不能写成取消。',
    core:'UML 状态机图里，圆角矩形是状态，实心圆是初始伪状态。迁移画成箭头，线上写触发它的事件。守卫要写就放在方括号里。没有这条箭头，就不存在这次迁移。下单这一张先保留：待支付经支付成功到已支付，待支付经取消到已取消，已支付经出库到已发货，已发货经签收到已完成。退款不画在这一张，也不能把取消的箭头改到已支付上。',
    example:'允许的迁移：\n\n```text\n[*] --> 待支付\n待支付 --> 已支付 : 支付成功\n待支付 --> 已取消 : 取消\n已支付 --> 已发货 : 出库\n已发货 --> 已完成 : 签收\n```',
    task:'画出订单状态机。列出每条迁移的起点、事件和终点。',
    answer:[
      '```text',
      '[*] --> 待支付',
      '待支付 --> 已支付 : 支付成功',
      '待支付 --> 已取消 : 取消',
      '已支付 --> 已发货 : 出库',
      '已发货 --> 已完成 : 签收',
      '```',
      '',
      '已支付没有指向已取消的箭头。没有画出的迁移不能在接口里偷偷做。',
    ].join('\n'),
    keywords:'UML state machine transition',
    diagram:'diagrams/draw-uml-state.svg',
    points:['状态是圆角矩形，初始伪状态是实心圆','迁移必须写触发事件','未画出的迁移不被允许'],
    deep:[
      {title:'退款是另一条迁移',body:'若已支付之后允许退款，要另加状态和事件，例如已支付经退款完成到已退款。不能把「取消」复用到已支付上。'},
      {title:'怎样自己验证',body:'对每个状态问：有哪些事件可以离开它。接口里多出来的状态变化，图上必须有对应箭头。'},
    ],
    refs:[['OMG：UML 2.5.1','https://www.omg.org/spec/UML/2.5.1/About-UML'],['UML：State machine diagrams','https://www.uml-diagrams.org/state-machine-diagrams.html']]
  },
  {
    track:'java', group:'系统设计', id:'draw-uml-deploy',
    title:'部署图写出进程跑在哪一台机器',
    prompt:'两份订单服务副本算几个节点、几份制品？',
    promptAnswer:'它们可以画在同一个应用主机节点里。制品是两份订单服务，通信路径仍要写 JDBC 和消息。',
    core:'UML 部署图回答代码跑在哪里。〔节点｜执行环境或设备，进程跑在它上面〕画成带顶面的框。〔制品｜部署进去的那一份，例如页面、jar、数据文件〕画在节点内部。节点之间的线是通信路径，写上协议。浏览器节点里是订单页面。应用主机节点里放两份订单服务制品。数据库主机里是 MySQL 的数据文件。消息主机另画一个节点。容器图说有哪些块，部署图说这些块这次落在哪几台机器上。',
    example:'四台机器上的这一笔下单：\n\n```text\n节点 浏览器\n  制品 订单页面\n  --HTTPS--\n节点 应用主机\n  制品 订单服务 jar\n  制品 订单服务 jar\n  --JDBC-- 节点 数据库主机 / MySQL 数据文件\n  --消息-- 节点 消息主机\n```',
    task:'画出浏览器、应用主机、数据库主机、消息主机。写明每个节点里的制品，以及节点之间的协议。',
    answer:[
      '```text',
      '浏览器 / 订单页面 --HTTPS-- 应用主机 / 两份订单服务 jar',
      '应用主机 --JDBC-- 数据库主机 / MySQL 数据文件',
      '应用主机 --消息-- 消息主机',
      '```',
      '',
      '两份 jar 是同一个节点里的两份制品。MySQL 不画进应用主机。',
    ].join('\n'),
    keywords:'UML deployment node artifact',
    diagram:'diagrams/draw-uml-deploy.svg',
    points:['节点是跑进程的设备或执行环境','制品放在节点内部','通信路径写协议，数据库与消息各是一个节点'],
    deep:[
      {title:'副本不是新的一种图',body:'两份订单服务仍是同一种制品的两个实例。要强调机器分开，就把它们画进两个节点，并各自连上数据库。'},
      {title:'怎样自己验证',body:'指着一个进程，能说出它的节点和制品名。指着一条线，能说出协议。说不出的线删掉。'},
    ],
    refs:[['OMG：UML 2.5.1','https://www.omg.org/spec/UML/2.5.1/About-UML'],['UML：Deployment diagrams','https://www.uml-diagrams.org/deployment-diagrams.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_123) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
