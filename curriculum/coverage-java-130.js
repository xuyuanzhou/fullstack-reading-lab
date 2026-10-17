/* 系统设计：主从图、静态与 CDN 图、事务选型图。仍是同一笔下单。 */
const COVERAGE_JAVA_130 = [
  {
    track:'java', group:'系统设计', id:'draw-replica',
    title:'主从图把刚写完的读留在主库',
    prompt:'商品详情把主库读满了。图上能不能把刚创建的订单也指到从库？',
    promptAnswer:'不能。写和刚写完的读进主库。列表和详情可以进从库。半同步只表示从库收到了日志，不是已经能查到这行。',
    core:'主从图回答的是读和写分别打到哪一台。〔主库｜source：接受写入并记下二进制日志〕接创建订单、扣库存，以及用户刚提交后马上要看见的那一笔。〔从库｜replica：重放日志的只读副本〕接商品详情和订单列表。两条读不要并成一个箭头。\n\n〔半同步｜主库等到至少一个从库把事件写入中继日志并刷盘，再完成提交〕写在主库到从库的箭头旁边。它不表示从库的查询已经能看见这行。超时会退回异步，不要把这条箭头写成永远强一致。\n\n从库会把主库上的误删除也重放掉，所以不要标成备份。备份是可以按时间点恢复的另一份，不画在这张读写箭头上。见 `evo-replica-read-write`。',
    example:'写和刚写完的读分开：\n\n```text\n写、刚创建的订单 --> 主库\n商品详情、订单列表 --> 从库\n主库 --二进制日志--> 从库\n半同步：至少一个从库写入中继日志并刷盘\n超时退回异步；从库不是备份\n```\n\n刚支付成功的那次查询不指向从库。',
    task:'画出写、刚写完的读、列表读分别打到哪一台。再写半同步保证了什么、没有保证什么。',
    answer:[
      '```text',
      '写、刚创建的订单 --> 主库',
      '商品详情、订单列表 --> 从库',
      '主库 --二进制日志--> 从库',
      '```',
      '',
      '1. 半同步保证提交返回时，至少一个从库已经把事件写入中继日志并刷盘。',
      '2. 它不保证从库的查询已经能看见这行。刚写完的读仍走主库。',
      '3. 从库会重放误删除，不能标成备份。',
    ].join('\n'),
    keywords:'primary replica diagram semisynchronous replication',
    diagram:'diagrams/draw-replica.svg',
    points:['写和刚写完的读进主库，可延迟的列表和详情进从库','半同步等的是从库写入中继日志，不是从库已经能查到这行','从库会重放误删除，不能标成备份'],
    deep:[
      {title:'和集群图怎么分',body:'集群图展开的是同一套下单程序的多份副本，主库仍只有一个。主从图才把读分到从库。两张图不要画成加了应用副本就等于读写分离。'},
      {title:'怎样自己验证',body:'从「刚创建的订单」出发，下一框只能是主库。从库那一侧只应接到详情或列表。箭头上若写着「从库已能查到」，这张图就画错了。'},
    ],
    refs:[['MySQL 8.4：复制','https://dev.mysql.com/doc/refman/8.4/en/replication.html'],['MySQL 8.4：半同步复制','https://dev.mysql.com/doc/refman/8.4/en/replication-semisync.html']]
  },
  {
    track:'java', group:'系统设计', id:'draw-static-cdn',
    title:'静态图把脚本和图片分出下单接口',
    prompt:'商品图和下单接口挤在同一台机器上。图上该把接口也送进 CDN 的长缓存吗？',
    promptAnswer:'不送。哈希过的脚本和图片走对象存储和 CDN。创建订单仍走应用集群，不设成长缓存。',
    core:'这张图回答的是静态字节和下单接口是不是同一条路。〔对象存储｜按键存放文件的存储，不是数据库表〕放商品图和带内容哈希的脚本。〔CDN｜把内容缓存在离用户更近的边缘节点〕用独立域名接这些文件。命中就在边缘返回，未命中才回源到对象存储。\n\n创建订单的箭头单独进应用集群，响应不设成一年缓存。HTML 入口要能拿到新的哈希地址，所以用短缓存或每次向源站再验证。角上写发布顺序：先上传新哈希文件并保留旧文件，再改 HTML。\n\nCSDN 是技术内容社区，画在这条路外面。它没有桶、上传凭证和回源。不要把它画成源站。见 `evo-static-cdn`。',
    example:'两类流量分开：\n\n```text\n浏览器 --脚本和图片--> CDN --未命中--> 对象存储\n浏览器 --创建订单--> 应用集群\n哈希文件：长期缓存\nHTML：no-cache\n先上传新哈希文件，再改 HTML\nCSDN 在这条路外面\n```\n\n没有从创建订单指向 CDN 的箭头。',
    task:'画出静态域名上的文件、下单接口、哈希文件和 HTML 的缓存，以及发布时先做哪一步。说明 CSDN 画在哪里。',
    answer:[
      '```text',
      '脚本和图片 --> CDN --> 对象存储',
      '创建订单 --> 应用集群',
      '哈希文件长期缓存；HTML 用 no-cache',
      '先上传新哈希文件，再改 HTML',
      '```',
      '',
      '1. 下单接口不进这层长缓存。',
      '2. CSDN 画在路外，它不是对象存储，也不是 CDN。',
      '3. 先改 HTML 再上传，图上的顺序就反了。',
    ].join('\n'),
    keywords:'CDN object storage cache control diagram',
    diagram:'diagrams/draw-static-cdn.svg',
    points:['哈希静态文件走对象存储和 CDN，下单接口仍走应用集群','HTML 短缓存，哈希文件才长期缓存，并且先上传再改入口','CSDN 不是对象存储或 CDN，不画进这条源站'],
    deep:[
      {title:'和集群图怎么分',body:'集群图回答的是下单程序有几份副本。静态图把图片和脚本从那些副本上拿开。不要把 CDN 画成订单服务的第二个副本。'},
      {title:'怎样自己验证',body:'从创建订单出发，下一框应是应用集群，不应是 CDN。CSDN 若连着回源箭头，这张图就把内容社区当成了源站。'},
    ],
    refs:[['MDN：Cache-Control','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control'],['Amazon CloudFront：简介','https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html'],['七牛云：对象存储','https://developer.qiniu.com/kodo']]
  },
  {
    track:'java', group:'系统设计', id:'draw-tx-choose',
    title:'事务选型图先问还在不在一个库',
    prompt:'订单、库存、支付已经分库。能不能画一个全局事务把支付等待也框进去？',
    promptAnswer:'不能。先问不变量还在不在一个库。出了库再分三条：只通知、要补偿、要短预留。用户支付不进 TCC 的全局事务。',
    core:'这张图回答的是这一次不变量用哪一种提交，不是再画一种架构。还在同一个数据库的规则，箭头停在本地事务，不先画协调器。\n\n出了库分三条，不要并成一个框。〔本地消息表｜业务行和待发消息行在同一个数据库事务里提交，提交后再投递〕只管可靠通知。支付行和待发记录在支付库的同一次提交里，订单库是消费时的另一次提交。〔Saga｜一串已提交的本地事务，失败时用补偿向前纠正〕用于已经提交的长流程。释放预留是新写入，不要画成把原事务倒回去。用户支付的等待放在这一侧。〔TCC｜Try 预留，Confirm 确认，Cancel 取消〕只框住短的预留。〔空回滚｜取消先到、还没有预留时，取消仍要成功并记下已取消〕写在取消那一支。支付等待画在这个框外面。\n\n短信和外部支付不画进数据库的 undo。见 `evo-tx-choose`。',
    example:'先分库，再分三条：\n\n```text\n不变量还在一个库 --> 本地事务\n只通知下游 --> 本地消息表（支付库一次提交，订单库另一次）\n预留已提交、支付失败 --> Saga（释放是新写入）\n短预留、要空回滚 --> TCC（框外是用户支付）\n```\n\n没有一个框同时写着这三种名字。',
    task:'给创建订单、支付成功通知、支付失败释放库存、库存短预留各画一条，并写出用户支付落在哪一条的外面。',
    answer:[
      '```text',
      '创建订单 --> 订单库本地事务',
      '支付成功通知 --> 支付库本地消息表',
      '支付失败释放库存 --> Saga，释放是新写入',
      '库存短预留 --> TCC，框外是用户支付',
      '```',
      '',
      '1. 三条不并成一种默认事务。',
      '2. 本地消息表不把支付库和订单库收成一次提交。',
      '3. 空回滚写在 TCC 的取消支，不写在 Saga 上。',
    ].join('\n'),
    keywords:'transaction choice outbox saga tcc diagram',
    diagram:'diagrams/draw-tx-choose.svg',
    points:['还在一个库的不变量画本地事务，不先画协调器','可靠通知、长流程补偿、短预留分三条，不并成一种默认事务','用户支付画在 TCC 的全局事务外面'],
    deep:[
      {title:'和微服务图怎么分',body:'微服务图回答谁写哪一个库、哪一段同步。事务选型图回答分库之后这一次提交用哪一种。不要在微服务图上再套一个盖住支付等待的全局事务框。'},
      {title:'怎样自己验证',body:'数框。本地消息表、Saga、TCC 应是三个框。用户支付若画在 TCC 框内，这张图就把数分钟的等待留在了短预留里。'},
    ],
    refs:[['microservices.io：Saga','https://microservices.io/patterns/data/saga.html'],['microservices.io：事务性发件箱','https://microservices.io/patterns/data/transactional-outbox.html'],['Seata：TCC 模式','https://seata.apache.org/docs/user/mode/tcc/']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_130) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
