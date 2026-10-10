/* Distributed transaction consistency: name the promise, then the neighbor it is not. */
const COVERAGE_JAVA_48 = [
  {
    track:'java', group:'分布式与高并发', id:'distributed-consistency-three-words',
    title:'三个「一致」不是同一个承诺',
    prompt:'为什么把库的约束、分区后的读写视图、过一会儿对账成功，都叫成 CAP 的 C？',
    promptAnswer:'库约束、分区视图、对账成功不是同一种 C。CAP 的 C 指分区下线性一致那种，不要三词混用。',
    core:'「一致」在三处各说一件事。ACID 的 C 是这一次事务提交时，库声明的约束仍然成立，见 `mysql-acid-c-is-consistency`。CAP 的 C 是网络分区已经发生时，读写还能不能对着同一份最新结果，见 `distributed-cap`。最终一致是两边先各自提交，允许中间分开，再靠重试、幂等和对账收敛。把三个词合成一句，就会用分区策略去修余额为负，或用对账成功去证明分区时读到的就是刚写入的那一行。比较方案时先写出这次承诺的是约束、最新视图，还是过一会儿对得上。',
    why:'库存分区时一侧继续写，恢复后用“最终会一致”带过，超卖已经发生。约束失败时去改复制确认级别，余额为负仍然能提交。',
    example:'转账提交时余额不能为负，这是 ACID 的 C，和有没有分区无关。两地断联后库存写必须避免冲突，一侧返回失败，这是 CAP 的取舍。下单成功后发货服务稍后才追上，对账时订单数等于已发货数，这是最终一致。三种失败的修法不同。',
    task:'给“余额为负”“分区时两侧都显示已售完”“详情页晚两秒才出现订单”各标一个词：约束、最新视图、最终收敛。不要都写成 CAP。',
    answer:'余额为负是约束没守住，是 ACID 的 C。分区时两侧都当已售完，是没有为这次写选择拒绝或等待，是 CAP 的 C。详情晚两秒出现是最终收敛，中间允许读到旧值。对账成功不能证明分区时读到的就是最新写入。',
    keywords:'一致性 CAP ACID 最终一致',
    diagram:'diagrams/distributed-consistency-three.svg',
    points:['ACID 的 C 是提交时约束成立','CAP 的 C 是分区后能不能对着同一份最新结果','最终一致允许中间分开，靠重试和对账收敛'],
    deep:[
      {title:'线性一致是 CAP 那一支的强形式',body:'每次读都读到最新一次已完成的写，才接近 CAP 讨论里的 C。从库落后、缓存未失效、投影未追上，都不是“违背了数据库约束”。不要用可重复读去解释分区后的双主写入。'},
      {title:'怎样自己验证',body:'各造一次失败：插入会打破外键的行、分区后两侧都返回成功、消息延迟后详情仍空。三种失败分别停在约束、分区策略和对账，不要只调一个超时。'}
    ],
    refs:[['Gilbert 与 Lynch：Brewer 猜想','https://www.cs.princeton.edu/courses/archive/spr22/cos418/papers/cap.pdf'],['MySQL Glossary：ACID','https://dev.mysql.com/doc/refman/8.4/en/glossary.html#glos_acid']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-one-db-first',
    title:'能放进一个库的不变量，先不要拆成分布式事务',
    prompt:'为什么订单和库存刚拆到两个服务，第一件事就是上 Seata？',
    promptAnswer:'能单库本地事务先做单库。分布式事务与多写是额外成本，不是默认起点。',
    core:'一次本地事务能一起提交、一起回滚的，是最便宜的一致性。订单和明细的合计等于明细之和，应留在同一个聚合、同一个库，见 `ddd-aggregate-transaction-boundary`。拆成两个服务之后，每个库只保证自己那一段，中间的空窗要用全局事务、消息或对账来补，锁和补偿都是后来的成本。拆开的信号应是独立扩缩、独立发布或明确的团队边界，不是先准备一个全局事务注解。库存若必须和下单同时成功，先问这两张表能不能还在一个库里。秒杀那种成功订单数不能超过可售库存，权威扣减仍要落在一次原子更新上，见 `distributed-seckill`。',
    why:'为了微服务名单把本可同库的两张表拆开，再用 Seata 把它们缝回去。热点行的全局锁和 XID 传递都成了日常故障，不变量却没有比拆之前更强。',
    example:'订单和明细在一个库、一次 `@Transactional` 里写入，失败则两张表都没有新行。拆到订单服务和库存服务之后，库存先提交、订单超时，就出现已扣无单。这时才需要 Outbox、补偿或 Seata。若库存表仍可由订单服务所在的库访问，先不要拆。',
    task:'列出下单必须同时成立的几句话。标出哪些能在一个库的一次提交里检查，哪些必须跨服务。跨服务的那几句再选 Seata 或消息，不要反过来。',
    answer:'合计等于明细、订单行存在，应在一个库里一次提交。库存是否属于另一个团队、必须独立扩缩，才跨服务。跨服务之后才在全局事务、Outbox 和对账里选。没有拆开的理由时，不要先上 Seata。',
    keywords:'本地事务 聚合 分布式事务 拆分',
    diagram:'diagrams/distributed-one-db.svg',
    points:['一次本地提交是最便宜的一起成功','拆服务之前先问不变量能不能还在一个库','全局事务是拆开之后的补洞，不是拆分的前提'],
    deep:[
      {title:'同库跨表仍是本地事务',body:'只要还在同一个数据库、一次连接里提交，就不是分布式事务。换一张表、加一个聚合，不等于要上协调器。真正跨的是两个资源管理器：两个库、库加消息、库加外部支付。'},
      {title:'怎样自己验证',body:'把订单和库存先放回一次提交，失败时两边行数都是 0。再人为拆成两次提交并在中间杀进程，一边有一边无。只有第二种才需要这一章后面的课。'}
    ],
    refs:[['Spring：声明式事务','https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative.html'],['Martin Fowler：DDD Aggregate','https://martinfowler.com/bliki/DDD_Aggregate.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-tx-not-cover-rpc',
    title:'本地事务包不住已经发出去的远程调用',
    prompt:'为什么在 @Transactional 里调 Feign，库存已经扣了、订单却回滚了？',
    promptAnswer:'分布式事务协调的是资源管理器，不是任意 RPC。远程调用失败要另有补偿与超时。',
    core:'Spring 的声明式事务占的是这一条数据库连接。方法返回前连接不放，远程调用的时间也算在事务里。Feign、Dubbo、发消息一旦离开本进程，对面的提交不跟着这条连接回滚。调用超时后本地回滚，库存服务可能已经成功。调用成功后本地再抛错，库存同样收不回来。远程调用应放在本地提交之后；对面的成功靠同一业务键只生效一次，失败靠补偿，见 `distributed-idempotent-key` 和 `distributed-saga-is-new-action`。同类 this 调用绕过代理是另一课，见 `spring-transaction`。这里只核对：事务边界到连接为止，不到 HTTP。',
    why:'把下单、调库存、写订单写进同一个 `@Transactional`，库存接口慢的时候连接池被占满，超时后又留下已扣无单。看起来像事务没生效，其实生效的只有订单这一边。',
    example:'place() 打开事务，先 insert 订单草稿，再 Feign 扣库存，最后把草稿改成已确认。库存在 2 秒内提交。订单这边 3 秒超时回滚，草稿消失，库存已扣。把 Feign 挪到事务方法外面：先扣库存且带订单号当幂等键，再开短事务写订单；写失败则发补偿回补库存。',
    task:'把一处事务方法里的远程调用挪到提交之后。写下超时回滚时对面还在不在，以及对面成功时你用什么键避免扣两次。',
    answer:'本地回滚只撤本库。远程调用已经成功时，对面的行还在。调用应在提交之后发出，或改成 Outbox。对面用订单号做幂等，重复到达不扣第二次。不要用加长事务超时去等 HTTP。',
    keywords:'@Transactional Feign 远程调用 连接',
    diagram:'diagrams/distributed-tx-rpc.svg',
    points:['声明式事务占的是本库连接，不是远程调用','对面已经提交的写入，本地回滚收不回来','远程调用放在本地提交之后，再用幂等和补偿'],
    deep:[
      {title:'连接被占着的副作用',body:'事务里等 HTTP，池里的连接不还给别人。下游一慢，本库也跟着排队。就算对面最后失败，本库已经被拖长时间。短事务先提交自己的行，再发调用。'},
      {title:'怎样自己验证',body:'在事务方法里调一个 sleep 超过超时的下游。下游先提交再超时。本库应回滚，下游行仍在。把调用挪出事务后，本库提交与否不再拖着连接等 HTTP。'}
    ],
    refs:[['Spring：Using @Transactional','https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html'],['Spring：声明式事务','https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-xid-must-travel',
    title:'全局编号传不到下游，就是两笔互不相干的本地提交',
    prompt:'为什么入口开了全局事务，库存服务还是自己提交成功？',
    promptAnswer:'全局事务号要在参与者之间传递。丢了 XID，分支对不上，协调器无法收口。',
    core:'Seata 把多个分支收成一笔，靠的是同一个 XID。发起方申请到编号之后，必须把它放到这一次 RPC 的上下文里带到下游。下游的数据源代理看到编号，才向协调器登记分支。编号没到，下游按普通本地事务提交，入口再回滚也撤不掉它。过滤器、网关、自己拼的 HTTP 客户端，都可能把上下文丢掉。先在两边日志里找同一个编号，再谈 AT 还是 TCC。注解加在入口方法上，不等于下游自动加入。协调器、发起方、资源方的分工见 `sca-seata-intro`。',
    why:'只在订单服务上加全局事务注解，库存的 Feign 调用用了不传递上下文的客户端。库存成功、订单失败，两边日志里没有同一个 XID，却去调 undo 超时。',
    example:'入口日志打印 XID=a1。库存服务同一请求的日志里没有这个号，分支表也没有它。库存按本地事务提交。入口稍后回滚，订单行消失，库存行还在。换成分发上下文的拦截器之后，库存日志出现 a1，失败时两边一起回滚。',
    task:'打一笔跨两个服务的全局事务。在下游日志里找出 XID。若没有，标出这一跳用的客户端，不要先改超时。',
    answer:'下游日志必须出现与入口相同的 XID，分支才能登记。没有这个号，下游就是另一笔本地提交，入口回滚撤不掉它。先修传递，再看模式。网关若剥掉头，也要在这里接上。',
    keywords:'Seata XID 上下文 传递 分支',
    diagram:'diagrams/distributed-xid-travel.svg',
    points:['同一笔全局事务靠同一个 XID 认出分支','编号必须出现在这一次 RPC 上','下游看不到编号时，回滚只发生在入口这一边'],
    deep:[
      {title:'异步线程会丢掉上下文',body:'编号默认跟当前线程走。提交后另起线程去调库存，新线程里没有 XID，又变成两笔。要传就在提交前、同一调用栈上走完必须一起成功的写入，或显式把上下文拷到新线程。'},
      {title:'怎样自己验证',body:'入口和下游各打一行 XID。对得上再制造下游失败，两边都应回滚。对不上时只回滚入口，下游行仍在。不要用这个结果去加大全局锁超时。'}
    ],
    refs:[['Seata：什么是 Seata','https://seata.apache.org/docs/overview/what-is-seata/'],['Spring Cloud Alibaba：Seata','https://github.com/alibaba/spring-cloud-alibaba/wiki/Seata']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-at-sees-before-global',
    title:'AT 第一阶段本地已经提交，别人可以先看见',
    prompt:'为什么全局事务还没结束，另一个查询已经读到扣过的库存？',
    promptAnswer:'AT 模式可能先看到分支本地提交。全局未决时读侧要接受中间态或换隔离策略。',
    core:'Seata AT 在第一阶段就把分支的本地事务提交掉，同时留下 undo，并用全局锁挡住别人再改同一行。本地提交之后，普通 SELECT 可以读到新值。全局还没决议时，这个新值稍后可能被 undo 改回去。所以 AT 不是跨服务的可串行化，也不是 XA。XA 的准备阶段通常还没有最终提交，别的会话常常读不到这次写入；代价是锁持有到决议，见 `distributed-xa`。全局锁挡住的是再写入，不是所有读，见 `sca-seata-lock-timeout`。业务若不能容忍“先看见、再消失”，不要用 AT 去包这次读路径，或改成 TCC 那种先预留、确认后才真正扣。',
    why:'把 AT 当成两个库一起进入不可见的准备态。库存页在全局回滚前展示已售完，回滚后又变回可售，用户下单失败却说系统骗人。',
    example:'全局事务里库存从 1 改成 0 并完成本地提交。另一个服务查库存得到 0。随后订单分支失败，undo 把库存改回 1。全程没有 XA 的准备态。改成 TCC 时，尝试阶段只增加预留，可售数量对查询另算，确认后才真正扣。',
    task:'在 AT 全局事务未结束时，从另一个连接读被改的那一行。记下能不能读到新值。再让全局回滚，确认这一行是否回到旧值。',
    answer:'AT 第一阶段后普通读可以读到新值。全局回滚后这一行回到旧值。不要把这次读到的新值当成已经不可撤销。XA 准备阶段不是这个可见性。查询若必须看到最终结果，应等全局结束，或改预留模型。',
    keywords:'Seata AT 可见性 全局锁 XA undo',
    diagram:'diagrams/distributed-at-visible.svg',
    points:['AT 第一阶段会提交本地事务并留下 undo','全局结束前别人可以读到这次写入','这不是 XA 的准备态，也不是跨服务串行化'],
    deep:[
      {title:'读自己的写入',body:'发起方在全局未结束时读下游，也可能读到第一阶段的新值。用这个值去给用户展示成功，随后全局回滚，展示就撒谎了。对外成功只能在全局决议之后。'},
      {title:'怎样自己验证',body:'开一个未提交完的 AT 全局事务，第二个会话 SELECT 同一行，应能读到新值。再让全局回滚，新值消失。对照 XA：准备后、决议前，第二个会话通常仍读旧值或被锁住。'}
    ],
    refs:[['Seata：AT 模式','https://seata.apache.org/docs/user/mode/at/'],['MySQL 8.4：XA Transactions','https://dev.mysql.com/doc/refman/8.4/en/xa.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-saga-is-new-action',
    title:'补偿是一笔新业务，不是把提交倒回去',
    prompt:'为什么 Saga 的反向步骤失败了，就以为协调器会像数据库一样自动撤？',
    promptAnswer:'Saga 补偿是新动作，不是回滚原事务。每一步都要可逆或可对账。',
    core:'Saga 把长流程拆成已经提交的正向步骤，失败时再跑反向步骤。反向步骤是一次新的写入：回补库存、把订单标成取消、通知客服。它不是 undo 日志，也不是 XA 的回滚。正向已经对别的会话可见，补偿到来之前世界按新值运行过。补偿本身会失败、会重复、会乱序，所以必须幂等，空补偿要能成功，见 `sca-seata-tcc-empty` 的同类问题。补偿停住时，不变量不会自己恢复，见 `distributed-reconcile-last`。AT 能按镜像把行改回去，只限于它记录过的 SQL，见 `sca-seata-at-boundary`。等用户支付、发短信、调外部支付，都应当成补偿模型，不要把数据库锁跨过等待。',
    why:'支付超时后补偿接口 500，库存仍是已扣，订单仍是已创建。运维以为“事务会回滚”，没有可回滚的全局阶段了。',
    example:'扣库存已提交，写订单已提交，用户取消。补偿应回补库存并把订单改成取消。回补接口超时重试，第二次必须发现已经回补过，库存不能加两次。短信已经发出，补偿发不出“收回”，只能再发一封取消说明或记到对账。',
    task:'写出一笔下单的正向两步和反向两步。标出哪一步已经提交可见，反向失败时哪一张表还停在新值。',
    answer:'正向两步各自提交后就可见。反向是新的更新，不是倒放。反向失败时对应的表仍停在正向结果。重试必须幂等。短信一类副作用没有反向，只能另发说明或进对账。不要等待补偿像数据库回滚那样自动完成。',
    keywords:'Saga 补偿 回滚 幂等 最终一致',
    diagram:'diagrams/distributed-saga-action.svg',
    points:['补偿是已经提交之后的一次新写入','它不是 undo，也不是 XA 回滚','补偿失败要重试或对账，不会自动再撤一次'],
    deep:[
      {title:'可见窗口是产品问题',body:'正向提交到补偿完成之间，别人可以按下单成功来读。查询和客服工具要能表示“取消进行中”，不能只显示已创建或已删除。'},
      {title:'怎样自己验证',body:'让正向两步都成功，再让补偿第一次失败。两张表都应仍是正向结果。补偿成功后对得上。再发一次同样的补偿，行数不应再变。'}
    ],
    refs:[['微服务：Saga','https://microservices.io/patterns/data/saga.html'],['Seata：Saga 模式','https://seata.apache.org/docs/user/mode/saga/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-saga-who-drives',
    title:'下一步由谁决定：一个编排者，还是各方听事件',
    prompt:'为什么每个服务都自己听“已扣库存”再往下走，排障时却找不到这笔单卡在哪？',
    promptAnswer:'编排与协同是两种驱动。谁推进、超时谁管、失败谁补，要写清由谁负责。',
    core:'长流程有两种驱动。编排是一个地方保存当前步骤：它调用库存、再调用订单、失败时按顺序发补偿。协同是每个服务订阅上一步的事件，自己决定下一步，没有一份总进度。编排好查、中心会变厚。协同解耦、卡点分散在各个消费组的位点上。全部改成消息不会消灭一致性问题，只是换了驱动，见 `arch-sync-vs-async`。选哪种之前先问：这笔单停住时，你要打开哪一份记录才能知道下一步该补偿还是该重试。',
    why:'库存、订单、积分各自听事件往下走，积分消费组卡住，客服只能在三个库里对时间戳。没有一笔流程号，补偿也不知道该从哪一步倒。',
    example:'下单编排者表里有 orderId、当前步骤=已扣库存、下一步=写订单。失败时编排者对已完成的步骤发补偿。改成协同后，库存发出 StockReserved，订单服务自己写单；订单服务挂了，StockReserved 还在，没有一张表告诉你写单没做。这时要靠订单号去各主题查，或补一份进度投影。',
    task:'给同一笔下单各画编排和协同。写下“写订单失败”时，你分别打开哪一张表或哪一个消费组，才能决定是否回补库存。',
    answer:'编排打开流程表的当前步骤，对已完成步骤发补偿。协同打开订单是否写成，以及库存事件是否已消费；没有总进度时必须按业务键去两侧查。两种都能最终一致。先决定排障时看哪里，再选驱动。',
    keywords:'Saga 编排 协同 状态机 事件',
    diagram:'diagrams/distributed-saga-driver.svg',
    points:['编排把当前步骤放在一个地方','协同让各方听事件自己推进，卡点分散','选驱动之前先问失败时打开哪一份记录'],
    deep:[
      {title:'协同也可以补一份只读进度',body:'没有中心编排时，仍可用订单号投影一张进度，只供查询和告警，不发命令。这不是把协同改回编排，而是让人找得到卡点。'},
      {title:'怎样自己验证',body:'在写订单处制造失败。编排路径应能只凭流程表决定回补。协同路径若找不到消费位点和订单行，就补业务键查询或进度投影，不要假装编排者存在。'}
    ],
    refs:[['微服务：Saga','https://microservices.io/patterns/data/saga.html'],['系统设计：同步还是异步','https://microservices.io/patterns/communication-style/messaging.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-idempotent-key',
    title:'最终一致靠同一业务键只生效一次',
    prompt:'为什么补偿和消息都重试了，库存却被扣了两次？',
    promptAnswer:'至少一次下要用业务幂等键去重。重试带新键等于没做幂等。',
    core:'跨服务之后没有端到端恰好一次。Outbox、事务消息、Feign 重试、补偿重试，都是至少一次。结果要仍是一次，必须让同一业务键的副作用只留下一行：唯一约束、状态机从可扣转到已扣、或去重表与这次写入在同一个本地提交里。先改库存再另表记去重，中间崩溃会做成两次或零次。消费者幂等见系统设计的 `idempotency`；这里核对的是分布式提交里的那把键，通常是订单号加步骤名。没有这把键，AT 回滚、Saga 补偿都会在重试时把数加错。',
    why:'扣库存接口按请求次数减一。超时重试第二次又减一，对账时成功订单 1、已扣 2。加了去重缓存却和 UPDATE 不在同一事务，缓存丢了再扣一次。',
    example:'同一本地事务里：先 `INSERT INTO processed(order_id, step) VALUES (?, \'deduct\')`，表上有 `(order_id, step)` 唯一约束；插入成功再 `UPDATE stock SET qty = qty - 1 WHERE sku=? AND qty >= 1`。第二次同一键插入冲突，跳过 UPDATE，影响行数是 0。不要把 last_order 写在 sku 行上，第二笔订单会盖掉第一笔的键。去重行和扣减必须一起提交，先改库存再另表记去重，中间崩溃会做成两次或零次。',
    task:'给扣库存选一把业务键。写出第一次和第二次去重插入的结果，以及库存各少几件。再画出去重记录与 UPDATE 必须在同一个提交里。',
    answer:'键是订单号加扣减这一步。第一次去重插入成功，库存少 1。第二次唯一约束冲突，库存不再变。去重行的插入和库存更新在同一本地事务。键只存在缓存里，或写在 sku 的 last_order 列上，多笔订单或重启都会再扣。恰好一次不存在，至少一次加上这把键，结果才是一次。',
    keywords:'幂等 唯一约束 至少一次 补偿 重试',
    diagram:'diagrams/distributed-idempotent-key.svg',
    points:['跨服务投递是至少一次，不是恰好一次','同一业务键的副作用只留下一次写入','去重和这次更新必须在同一个本地提交里'],
    deep:[
      {title:'状态机比计数器稳',body:'用订单维度的 status=RESERVED 这类转移，比 qty=qty-1 再靠调用方不重试更稳。这一单已经是已扣时，再来的请求返回成功且不再减。调用方才能放心重试。'},
      {title:'怎样自己验证',body:'同一订单号连续调两次扣减。库存只少 1，第二次返回的是已处理而不是再减。杀掉去重与更新之间的进程，重启后结果仍是 1，不能是 0 或 2。'}
    ],
    refs:[['微服务：幂等消费者','https://microservices.io/patterns/communication-style/idempotent-consumer.html'],['事务性 Outbox','https://microservices.io/patterns/data/transactional-outbox.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-read-your-writes',
    title:'写成功之后的下一次读，可能还看不到',
    prompt:'为什么下单接口返回成功，立刻刷新详情却还是待创建？',
    promptAnswer:'写后立刻读从库可能看不见。读己之写要打主库、会话粘滞或等复制追上。',
    core:'最终一致允许写已经提交，读却打到另一份还没追上的数据：从库、缓存、列表投影、搜索索引。用户刚写成功的那一次读，若不能对着主库或带上写时的版本，就会以为失败。这不是事务回滚，也不是 CAP 分区，见 `distributed-consistency-three-words`。处理办法是读自己的写入：详情走主库或按主键读刚写的那一行；列表可以稍后追上，但页面要区分“已下单、列表刷新中”。写后立刻用从库校验库存，会把刚扣掉的行读成旧值，再扣一次或提示失败。',
    why:'下单成功跳转到详情，详情读从库，复制延迟 2 秒，页面 404。用户再点一次下单，幂等没做好就成了两笔。',
    example:'下单写主库并返回订单号。详情用这个订单号在主库按主键读，应立刻有行。列表页读投影表，2 秒内可以没有这一笔，但标题写“订单已接受”。若详情也走投影，就会 404。',
    task:'标出下单后用户立刻会打开的那一次读。写下它读的是主库主键、从库，还是投影。立刻需要看见时改到哪一份。',
    answer:'用户立刻打开的详情应按主键读刚写入的那一份，通常是主库。列表和搜索可以落后，但要说明正在更新，不能当成下单失败。用从库去校验刚做完的写，会把成功读成没有。',
    keywords:'读己之写 最终一致 主从延迟 投影',
    diagram:'diagrams/distributed-read-after.svg',
    points:['写已提交不等于下一次读能看见','用户立刻要看的读应对着刚写的那一份','列表投影可以落后，但不能把落后显示成失败'],
    deep:[
      {title:'会话粘滞只是一种手段',body:'把同一用户的读打到刚才那台写库，能减少这种窗口。换设备、换接口、读缓存时仍然会旧。主键直读主库比粘滞更直接。'},
      {title:'怎样自己验证',body:'写入后立刻读详情和读列表。详情应有行。列表可以空，但页面不能当失败。把详情改成读延迟从库，应能复现 404，再改回来。'}
    ],
    refs:[['Jepsen：一致性模型','https://jepsen.io/consistency'],['微服务：CQRS','https://microservices.io/patterns/data/cqrs.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-reconcile-last',
    title:'对账是最后一层不变量，不是运维手工活',
    prompt:'为什么补偿消息丢了就永远对不上，还说最终一致会自己好？',
    promptAnswer:'最终一致靠对账收口。没有对账任务，口头“最终”落不了地。',
    core:'最终一致会收敛，前提是每一步至少还会再被处理一次，并且同一键只生效一次。补偿消息丢了、消费组停了、人工改过一行，收敛就停住。对账按业务不变量比较两侧权威：成功订单数不能超过已扣库存，已支付金额应等于已确认订单金额。差额要落到订单号，而不是只改一个总数。对账任务自己也要幂等，见 `distributed-idempotent-key`。它不代替 Outbox 和补偿，只在那些机制停住之后把不变量重新说一遍。秒杀里对账修正跨服务失败，见 `distributed-seckill`。',
    why:'补偿 topic 堆积被清空，库存少了 30 件，没有订单号。只能把库存加回去，加错的是另一批 sku。最终一致被理解成“过两天会好”，两天之后更差。',
    example:'每天比对订单已确认数和库存已扣数，按 sku 和订单号列出差额。发现订单 1001 已确认、库存无对应扣减，则重放扣减或把订单改回失败，按已写明的规则来，不要静默改总数。对账重跑同一天，差额表不应再长出重复行。',
    task:'写出一条不变量，两侧各是哪张表。再写补偿被清空后，对账应列出什么键，禁止只改总数。',
    answer:'不变量例如已确认订单与已扣库存按订单号一一对应。对账列出缺了扣减的订单号，按规则重放或回滚订单。禁止只给库存加一个总数。对账重跑必须幂等。最终一致在消息停住时不会自己好。',
    keywords:'对账 最终一致 不变量 补偿 幂等',
    diagram:'diagrams/distributed-reconcile.svg',
    points:['最终一致在重试停住时不会自己收敛','对账按不变量比对两侧权威，差额落到业务键','对账任务必须幂等，不能只改一个总数'],
    deep:[
      {title:'对账不是第三种事务',body:'它不包住两次提交。它读已经提交的事实，发出新的补偿或告警。发出去的修复仍要走幂等键，否则对账自己会扣两次。'},
      {title:'怎样自己验证',body:'人为丢掉一笔补偿，让两侧对不上。对账应打出那一个订单号。执行修复后再跑同一天，差额消失且没有第二行。只改库存总数的做法划掉。'}
    ],
    refs:[['微服务：Saga','https://microservices.io/patterns/data/saga.html'],['事务性 Outbox','https://microservices.io/patterns/data/transactional-outbox.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_48) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
