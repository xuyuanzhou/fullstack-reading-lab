/* Deeper Spring Cloud Alibaba: discovery, config overlay, Feign, Sentinel, Seata, Stream. */
const COVERAGE_SCA_12 = [
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-nacos-ephemeral',
    title:'临时实例靠心跳，保护阈值会把坏地址留下',
    prompt:'一半实例已经挂了，调用方为什么还在打到它们？',
    core:'Nacos 里常见的是临时实例：客户端和服务器保持连接并报心跳，心跳断了才从健康列表拿掉。持久实例不会因为心跳停止自动消失，适合不能常驻心跳的客户端，业务服务一般不要用。消费方手里还有一份名单缓存，摘除不会瞬间传遍。另外还有保护阈值：当健康实例占比掉到阈值以下，Nacos 会把不健康实例也返回，避免名单空了谁都调不到。阈值保护的是“至少有地址可调”，不是“地址一定活着”。所以实例挂了仍被打到，可能是心跳还没超时、缓存还没刷新，也可能是保护阈值故意把坏地址留在名单里。',
    why:'只看控制台绿点，解释不了下线后仍打到死实例的那一小段，也会把保护阈值当成发现坏了。区分信号是心跳还没超时、消费方缓存还没刷新，还是健康占比掉到阈值后故意留下坏地址。',
    example:'库存四台挂了三台。保护阈值若是一半，健康占比低于它，不健康地址仍会返回，调用打到死实例上。这段时间里必须有连接超时，失败再换下一台，不能等名单自己变干净。把这一跳的输入、输出和失败留下的状态同时记下来，不要只看最后没有报错。',
    task:'关掉一台临时实例，记下心跳超时、消费方缓存刷新、保护阈值三个数字。预测哪一段时间里请求仍会打到它。',
    answer:'关掉临时实例后，心跳超时之前它还在健康列表里，请求仍会打到它。消费方缓存刷新之前，即使服务端已摘除，本地名单仍可能选中它。健康实例占比掉到保护阈值以下时，坏地址会被故意返回。这三段都可能打到它，调用侧仍要超时和换实例。预测先写下来再对照链路，对不上就停在这一格，不要改邻接的组件。',
    keywords:'Nacos 临时实例 持久实例 保护阈值 心跳',
    points:['临时实例心跳停止后才离开健康列表','保护阈值会在健康实例过少时仍返回不健康地址','消费方缓存让摘除不会立刻传到每一个调用'],
    deep:[
      {title:'和优雅下线',body:'进程被杀之前，应先从 Nacos 注销，再停止接请求。直接杀进程，只能等心跳超时。'},
      {title:'持久实例',body:'网关或不能发心跳的客户端才考虑持久实例。业务服务用持久实例，挂掉后名单会一直指向死地址。'}
    ],
    refs:[['Nacos：概念','https://nacos.io/docs/latest/concepts/'],['Nacos 与 Spring Cloud','https://nacos.io/docs/latest/ecology/use-nacos-with-spring-cloud/']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-nacos-shared-config',
    title:'共享配置按顺序叠上去，后加载的覆盖先加载的',
    prompt:'应用自己的 yaml 里写了超时，为什么运行时用的是另一份数字？',
    core:'Nacos 配置客户端可以拉多份 dataId：共享配置、扩展配置，再加上本应用的 dataId。它们按文档约定的顺序合并。后面那份里出现的同名键，会盖住前面的值。profile 对应的 dataId，例如 order-prod.yaml，不要和没有 profile 后缀的那份弄混。改共享配置会影响所有订阅它的应用；改应用自己的 dataId 只影响这一份。密钥不要放进共享配置再提交到公共命名空间。',
    why:'超时对不上本应用 yaml 里的数字时，只看这一份文件，会漏掉后加载的共享配置把同名键盖住。区分信号是按 dataId 的加载顺序，同一个键最终来自最后那一份。',
    example:'shared-configs 先加载 redis.yaml，应用自己的 order-prod.yaml 再加载。order-prod.yaml 里的连接池大小会盖住 redis.yaml 里的同名项。',
    task:'列出这个应用实际订阅的每一份 dataId，按加载顺序写下来，标出同一个键最终以哪一份为准。',
    answer:'先列出实际订阅的每一份 dataId，按加载顺序写：共享、扩展、再是应用自己的。同一个键预测以后加载的那份为准，先加载的被盖住。改共享配置等于改所有订阅者；只想改这一个应用，就改它自己的 dataId，不要改共享那份。预测先写下来再对照链路，对不上就停在这一格，不要改邻接的组件。',
    keywords:'Nacos shared-configs extension-configs dataId 覆盖顺序',
    points:['一份应用可以订阅多个 dataId 并按顺序合并','后加载的同名键覆盖先加载的','共享配置的变更会打到所有订阅它的应用'],
    deep:[
      {title:'顺序决定谁赢',body:'多份配置叠在一起，不是合并成并集就结束。后出现的同名键盖住前面的值。profile 那份和没有后缀的那份不是同一个 dataId，看错文件就会对着旧数字改。边界不满足时就停，不要把这次失败算到下一格头上。'},
      {title:'怎样自己验证',body:'列出这个应用订阅的每一份 dataId 和加载顺序。找一个两边都有的键，改共享那份再改应用那份，确认运行时用的是后加载的数字。'},
    ],
    refs:[['Spring Cloud Alibaba：Nacos 配置','https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-config'],['Nacos：配置管理','https://nacos.io/docs/latest/guide/user/config/']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-feign-timeout-retry',
    title:'Feign 只负责发出 HTTP，超时和重试要自己写清',
    prompt:'OpenFeign 调库存超时了，是 Nacos 的问题还是客户端的问题？',
    core:'OpenFeign 按接口发出 HTTP。地址从 Nacos 名单来，由 LoadBalancer 选一台。连接超时、读取超时写在客户端，不写在注册中心。默认重试策略若打开，超时后会再打一次；写接口没有幂等键时，重试可能下两单。实例刚从名单拿走时，客户端缓存里可能还有旧地址，第一次失败应换下一台，而不是把失败当成业务 409。网关超时、Feign 超时、库存自己的处理超时是三口钟，要对齐，不能只加长其中一个。',
    why:'超时全怪注册中心，就改不好客户端这口钟，打开重试后写接口还会变成两笔订单。区分信号是 Nacos 只给名单，连接和读取超时写在 Feign 上，库存可能还在提交。',
    example:'Feign 读取超时 2 秒，库存 SQL 要 5 秒。调用方先超时返回，库存事务仍在提交。没有幂等键时再重试会下第二单。应把语句超时放进客户端超时之内，或接受超时后的补偿，而不是把 Nacos 健康当成这次调用没问题。',
    task:'画出 Feign 一次调用：拿名单、选实例、连接、读取。给每一步写超时。再说明写接口应不应该自动重试。',
    answer:'一次调用的顺序是拿名单、选实例、连接、读取。名单来自 Nacos，没有单独的业务超时；选实例是负载均衡；连接和读取的超时写在客户端。写接口预测不应自动重试，除非有幂等键。读超时后可以换下一台，业务上的冲突不要换实例再打。预测先写下来再对照链路，对不上就停在这一格，不要改邻接的组件。',
    keywords:'OpenFeign LoadBalancer 超时 重试 幂等',
    points:['Feign 发出 HTTP，不负责保存实例名单','连接超时和读取超时是客户端配置','写接口的自动重试必须有幂等键'],
    deep:[
      {title:'和 Ribbon',body:'当前栈用 Spring Cloud LoadBalancer，不要再配 Ribbon 的重试键。两套选择器叠在一起，超时行为说不清。'},
      {title:'换实例',body:'同一台连不上时换下一台。业务 409 不要换实例重试，那是库存不足，不是这台机器坏了。'}
    ],
    refs:[['Spring Cloud OpenFeign','https://docs.spring.io/spring-cloud-openfeign/reference/'],['Spring Cloud LoadBalancer','https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/loadbalancer.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-sentinel-circuit-state',
    title:'熔断有关闭、打开、半开三个状态',
    prompt:'熔断已经打开，为什么过一会儿请求又打到了下游？',
    core:'熔断看的是一个时间窗口里的慢调用比例或异常比例。没到阈值时是关闭，请求照常进入资源。达到阈值后打开，新请求直接被拦截，不再调用下游，好让下游喘口气。打开持续一段时间后进入半开：放进少量探测请求。探测成功就回到关闭，失败则再次打开。所以“过一会儿又打到下游”是半开在探测，不是熔断坏了。流控和熔断不是同一件事：流控是还没执行就按配额拒绝；熔断是已经看到下游不健康才暂停。',
    why:'把熔断当成永远挡住，半开探测放行时会误判规则失效，从而把熔断规则关掉；把熔断当成流控，又会用 QPS 去解释慢调用比例。区分信号是打开之后过一段时间会放进少量探测，成功才回到关闭。',
    example:'库存接口在窗口里一半调用超过慢调用阈值，熔断打开，新请求不再进下游。窗口过后进入半开，放行一个探测。库存仍慢，探测失败，再次打开。这段“又打到下游”是探测，不是规则丢了。把这一跳的输入、输出和失败留下的状态同时记下来，不要只看最后没有报错。',
    task:'写三个状态各允许什么：关闭时进不进下游，打开时调用方看到什么，半开时成功和失败下一步去哪。',
    answer:'关闭时请求进入下游。打开时调用方直接被拦截，看不到下游结果。半开时放少量探测：成功就回到关闭，失败再打开。所以过一会儿又打到下游，预测是半开在探测。熔断看的是慢调用或异常比例，不是配额。预测先写下来再对照链路，对不上就停在这一格，不要改邻接的组件。',
    keywords:'Sentinel 熔断 半开 慢调用比例 异常比例',
    points:['熔断关闭时请求进入资源，打开时直接拦截','半开会放少量探测，成功才恢复关闭','熔断依据慢调用或异常，不是单纯的 QPS 计数'],
    deep:[
      {title:'半开不是故障',body:'打开是为了让下游喘口气。到时间必须放探测，否则永远不知道下游好了没有。探测失败再打开，是规则在工作。用 QPS 解释这段，会去改流控而不是慢调用阈值。边界不满足时就停，不要把这次失败算到下一格头上。'},
      {title:'怎样自己验证',body:'把下游拖慢到超过慢调用比例，确认进入打开、请求不再到达下游。等到半开，看是否放行少量探测；探测仍失败时，应再次打开而不是一直放行。'},
    ],
    refs:[['Sentinel：熔断降级','https://sentinelguard.io/zh-cn/docs/circuit-breaking.html'],['Spring Cloud Alibaba：Sentinel','https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-sentinel-block-fallback',
    title:'规则挡住走拦截处理，业务抛错走降级方法',
    prompt:'@SentinelResource 上同时写了 blockHandler 和 fallback，超限时会进哪一个？',
    core:'规则拒绝（流控、熔断打开、系统保护）抛出的是拦截异常，走 blockHandler。业务方法自己抛出的异常，例如空指针或下游 500，走 fallback。两个方法的参数列表要能接住原方法和异常，名字写错就会落到默认处理，调用方只看到 500。拦截处理应返回约定的降级结果或 429，不要在里面再调一次被限流的方法。fallback 可以记日志或返回兜底数据，但不能把失败假装成下单成功。',
    why:'把 blockHandler 和 fallback 收成一个 catch，就分不清是配额到了还是业务真的抛错，重试和告警都会打错。区分信号是超限进拦截处理，业务异常进降级方法，两种返回都是失败。',
    example:'下单资源 QPS 超了，进入 blockHandler，返回请稍后，下游方法没有执行。库存服务抛出异常时进入 fallback，返回暂时无法下单，订单表没有新行。若在拦截处理里再调一次原方法，等于又打了一次被限流的资源。',
    task:'分别制造规则拦截和业务异常，确认进入的方法不同，并且两种返回都符合契约里的失败 type。',
    answer:'制造规则拦截，预测进入 blockHandler，返回契约里的失败 type，而不是成功。制造业务异常，预测进入 fallback，同样是失败 type，订单表没有新行。两种方法不能合成一个。拦截处理里不要再调用原方法。预测先写下来再对照链路，对不上就停在这一格，不要改邻接的组件。',
    keywords:'Sentinel blockHandler fallback BlockException @SentinelResource',
    points:['规则拦截走 blockHandler，不是业务 fallback','业务方法抛出的异常才走 fallback','拦截处理禁止再次调用被限流的方法'],
    deep:[
      {title:'失败不能写成成功',body:'拦截和降级都是这次没做成。返回体若变成下单成功，调用方会去展示一个不存在的订单。参数列表接不住原方法时，会落到默认处理，外面只看到 500。边界不满足时就停，不要把这次失败算到下一格头上。'},
      {title:'怎样自己验证',body:'分别把 QPS 打超和让业务方法抛错。确认进的方法不同，两种响应的 type 都是失败。在 blockHandler 里不要再调用被限流的方法，订单表不应多出一行。'},
    ],
    refs:[['Sentinel：注解支持','https://sentinelguard.io/zh-cn/docs/annotation-support.html'],['Spring Cloud Alibaba：Sentinel','https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-sentinel-flow-mode',
    title:'流控可以按自己、按关联、按调用链来数',
    prompt:'下单被限流了，为什么查商品的接口也一起慢下来才有用？',
    core:'直接模式只数这个资源自己的 QPS 或并发。关联模式看的是另一个资源：下单太猛时，先把查询也限住，避免查询把库打满、下单更做不成。链路模式只统计从某一条入口进来的调用，同一方法被内部任务调用时可以不占这个配额。预热模式让阈值从较小值爬到目标值，避免冷启动时突然灌满。匀速排队把到来的请求排开，而不是瞬间拒绝，适合需要尽量做成、但必须限制处理速度的接口。选错模式，就会出现“下单限了、查询把库打死”或“内部调用把用户配额用光”。',
    why:'只会给下单写一个 QPS，解释不了查询为什么要一起慢下来，大促第一秒查询仍会把库打穿，下单跟着失败。区分信号是直接数自己、关联数另一个资源、链路只数某一条入口，这三种模式数的根本不是同一个计数对象。',
    example:'下单资源限在一个 QPS 上。查询和它关联：下单过热时查询也降速，避免查询把库占满。用户入口用链路统计；定时对账走另一条入口，不占用户配额。预热则让阈值从较小值爬上去，而不是第一秒就放满。把这一跳的输入、输出和失败留下的状态同时记下来，不要只看最后没有报错。',
    task:'给下单、查询、内部对账各选一种流控模式，用一句话说清数的是谁。',
    answer:'下单用直接模式，数的是下单自己的量。查询用关联模式，数的是下单有多热，下单过热时查询也降速。内部对账用另一条链路，不占用户入口的配额。预热和匀速排队改的是流量怎么进入，不是再加一种计数对象。预测先写下来再对照链路，对不上就停在这一格，不要改邻接的组件。',
    keywords:'Sentinel 流控 关联 链路 预热 匀速排队',
    points:['直接模式统计本资源，关联模式看另一个资源的量','链路模式按入口计数，内部调用可以分开','预热和匀速排队改变流量怎么进入，不只改阈值'],
    deep:[
      {title:'数错对象就会打穿',body:'只限下单、不限被它拖住的查询，查询仍会把库打满，下单更做不成。链路若把内部任务算进用户配额，对账会把用户请求挤掉。模式要先回答数的是谁。边界不满足时就停，不要把这次失败算到下一格头上。'},
      {title:'怎样自己验证',body:'给下单、查询、内部对账各选一种模式，并用一句话说清数的是谁。把下单打热，看关联的查询是否也降速；对账走另一条入口时，不应占掉用户配额。'},
    ],
    refs:[['Sentinel：流量控制','https://sentinelguard.io/zh-cn/docs/flow-control.html'],['Sentinel：流量控制（匀速排队）','https://sentinelguard.io/zh-cn/docs/flow-control.html#rate-limiter']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-seata-tcc-empty',
    title:'TCC 要能空回滚，也要挡住悬挂',
    prompt:'确认还没执行，取消先到了，下一次尝试还会预留库存吗？',
    core:'TCC 分尝试、确认、取消。网络乱序时，取消可能比尝试先到，这叫空回滚：取消必须发现还没有尝试过，直接成功返回，不能去扣已经不存在的预留。若空回滚之后尝试才到达，必须拒绝这次尝试，否则预留了却没有对应的确认或取消，库存会悬挂在预留态。所以尝试开始要先看这笔全局事务有没有被取消过。确认和取消都要能重复执行，结果不变。AT 省了这些接口，但管不到非 SQL 的副作用；TCC 能管预留库存、冻结金额，代价是这些分支都要业务自己写对。',
    why:'只实现尝试、确认、取消的快乐路径，取消先到时会去回滚一份并不存在的预留，随后才到达的尝试又把这笔库存挂在预留态。区分信号是按全局事务的 XID 记下已取消，后到的尝试必须直接拒绝。',
    example:'取消先到，库存服务记下这笔 XID 已取消并返回成功，预留行数仍是零。随后尝试看到这个标记，不再扣预留，库存行数不变。确认若重复到达，预留只转成扣减一次，不能扣两次。把这一跳的输入、输出和失败留下的状态同时记下来，不要只看最后没有报错。',
    task:'画出尝试、确认、取消三种乱序：取消先到、确认重复、尝试在取消之后。分别写库存表应有的行数。',
    answer:'取消先到：预测空回滚成功，库存没有预留行。确认重复：预测只生效一次，行数不因第二次确认再变。尝试在取消之后：预测被拒绝，不再新增预留，避免悬挂。三种乱序都靠 XID 状态，确认和取消都要能重复执行。预测先写下来再对照链路，对不上就停在这一格，不要改邻接的组件。',
    keywords:'Seata TCC 空回滚 悬挂 幂等',
    points:['取消先于尝试到达时必须空回滚成功','空回滚之后到达的尝试要拒绝，避免悬挂','确认和取消都必须可重复执行'],
    deep:[
      {title:'悬挂比超卖更难查',body:'空回滚之后如果仍允许尝试，预留留下了，却没有人再来确认或取消。库存停在预留态，对账才发现。尝试一开始就要先看这笔全局事务是不是已经取消。边界不满足时就停，不要把这次失败算到下一格头上。'},
      {title:'怎样自己验证',body:'按三种乱序各做一次：取消先到、确认重复、尝试在取消之后。分别记下库存预留行数。取消先到应为零行，后到的尝试不应再增加预留。'},
    ],
    refs:[['Seata：TCC 模式','https://seata.apache.org/docs/user/mode/tcc/'],['Seata：什么是 Seata','https://seata.apache.org/docs/overview/what-is-seata/']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-seata-lock-timeout',
    title:'AT 的全局锁会挡住别人改同一行',
    prompt:'另一笔订单也要扣同一件商品，为什么一直拿不到锁？',
    core:'AT 在分支提交前给相关行加全局锁，避免别的全局事务同时改这些行。本地事务可能已经提交，但全局事务还没结束时，别人改同一行会被挡住，等到锁超时。这不是 MySQL 行锁的别名：数据库行锁在本地事务结束时释放，全局锁跟的是 Seata 的全局事务。全局事务拖得很长，锁就会占很久，秒杀热点行会排队。所以 AT 只包必须一起成功的短写入。锁冲突时要看是全局锁等待，还是本地死锁，不要一律加大超时。',
    why:'把全局事务套在扣库存、写订单再等待用户支付上，热点行的全局锁会一直占到超时，别人的订单拿不到锁。区分信号是锁跟着全局事务走，比本地事务更长，支付等待必须出事务。',
    example:'两笔订单同时扣同一 sku。第一笔的全局事务还没结束，第二笔在全局锁上等待。第一笔若在事务里打开支付页，锁会跨过整个等待。应在扣库存和写订单之后马上提交或回滚，支付放在事务外面。把这一跳的输入、输出和失败留下的状态同时记下来，不要只看最后没有报错。',
    task:'给“扣库存+写订单”和“等待用户支付”画边界：哪一段可以进 AT，哪一段必须出事务。',
    answer:'扣库存加写订单可以放进 AT，预测这段短事务持有全局锁，结束就放。等待用户支付必须出事务，预测不应占着热点行的全局锁。第二笔因此不用等到支付页面结束。锁冲突时先缩短事务，不要只加超时。预测先写下来再对照链路，对不上就停在这一格，不要改邻接的组件。',
    keywords:'Seata AT 全局锁 undo_log 锁超时',
    points:['AT 用全局锁避免并发改同一行','全局锁在全局事务结束前一直占着，短于本地行锁不够','锁冲突时先缩短全局事务，不要只加超时'],
    deep:[
      {title:'全局锁比行锁活得长',body:'本地事务提交后，数据库行锁会放。AT 的全局锁要等到全局事务结束。所以本地已经提交，别人仍可能改不了同一行。把等待用户算进事务，锁会跨过这段无人操作的时间。边界不满足时就停，不要把这次失败算到下一格头上。'},
      {title:'怎样自己验证',body:'让两笔订单扣同一行。第一笔停在事务里不提交，看第二笔是否一直拿不到锁。把支付等待移出事务后，第一笔应很快结束，第二笔不再跟着等支付。'},
    ],
    refs:[['Seata：AT 模式','https://seata.apache.org/docs/user/mode/at/'],['Seata：什么是 Seata','https://seata.apache.org/docs/overview/what-is-seata/']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-dubbo-or-feign',
    title:'同步调用选 HTTP 还是 Dubbo，先看契约和团队边界',
    prompt:'已经有 Nacos 和 Sentinel，服务之间是不是必须上 Dubbo？',
    core:'Nacos 可以给 HTTP 实例用，也可以给 Dubbo 实例用。Sentinel 两种调用都能包成资源。选择的是传输和接口形状，不是发现组件。OpenFeign 走 HTTP，契约就是路径、状态码和 JSON，前端、网关和外部系统都看得懂，排障用普通抓包。Dubbo 走 RPC，接口是 Java 方法，序列化更紧，适合内网大量同步调用；跨语言和浏览器不能直接调它。不要两个栈调同一种业务还共用一份会变的内部模型。超时、重试、幂等在两种传输上都要单独写。',
    why:'把 Dubbo 当成有了 Nacos 和 Sentinel 就必须上的传输，会把给浏览器和网关的 HTTP 契约改成内部二进制协议。区分信号是对外和跨语言必须 HTTP，内网 Java 之间的大量同步调用才评估 Dubbo。',
    example:'浏览器和网关继续走 HTTP，路径和状态码外面看得懂。订单调库存若两边都是 Java、调用又极多，可以评估 Dubbo。对外回调和文件上传仍用 HTTP。两种都要单独写超时、重试和幂等，发现和限流不替你决定传输。',
    task:'列出三条现有调用：哪条必须 HTTP，哪条可以 Dubbo，理由各写一句。',
    answer:'三条里，浏览器或外部系统调用必须 HTTP，因为对方不是 Java 接口。文件上传和回调也必须 HTTP。订单到库存这种内网 Java 同步调用可以评估 Dubbo，理由是调用多且双方都是 Java。超时和幂等两种传输都要有，Nacos 和 Sentinel 不决定这一条。',
    keywords:'Dubbo OpenFeign Nacos RPC HTTP',
    points:['Nacos 和 Sentinel 同时支持 HTTP 与 Dubbo','对外契约和浏览器走 HTTP','Dubbo 适合内网 Java 之间的同步调用，不是默认必选项'],
    deep:[
      {title:'发现不是传输',body:'Nacos 可以登记 HTTP 实例，也可以登记 Dubbo 实例。Sentinel 两种都能包成资源。选的是路径和状态码，还是 Java 方法。不要两个栈调同一业务还共用一份会变的内部模型。'},
      {title:'怎样自己验证',body:'列出三条现有调用，各写必须 HTTP 或可以 Dubbo 的一句理由。浏览器、回调、上传应落在 HTTP。只有内网 Java 对 Java 的高频同步调用才标成可以评估 Dubbo。'},
    ],
    refs:[['Apache Dubbo：概述','https://dubbo.apache.org/zh-cn/overview/what/'],['Spring Cloud OpenFeign','https://docs.spring.io/spring-cloud-openfeign/reference/']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-stream-binding',
    title:'Stream 绑定只接到主题，顺序和幂等还在消息模型里',
    prompt:'用 Spring Cloud Stream 发了 RocketMQ，为什么还是会乱序、还会重复？',
    core:'Spring Cloud Alibaba 用 Stream 的 destination 对应 RocketMQ 主题，binding 把发送和监听变成 Spring 的输入输出。它不改变队列、消费组和至少一次投递。同一订单要有序，仍要按订单号进入同一队列。监听方法失败时，框架可能再投，业务键去重不能省。事务消息、延迟消息要走 RocketMQ 自己的能力，不是 Stream 注解的默认项。把绑定名当成队列名，改了配置就会发到另一个主题还以为代码没错。',
    why:'以为换成 Stream 注解就换掉了至少一次和队列模型，同一订单仍会乱序，失败重投仍会重复扣减库存。区分信号是绑定只把 destination 接到主题，顺序看分区键，重复看幂等键。',
    example:'binding 的 destination 是 order。发货组集群消费。订单号哈希到同一队列。监听里按订单号做幂等。同一条再投递一次不应再扣。延迟关单用 RocketMQ 延迟消息，不在监听里 sleep。',
    task:'写出 Stream 配置里的 destination、消费组，以及业务上的分区键和幂等键。四项对不上就回去改。',
    answer:'destination 是主题，配置里写的是 order 这种名字，不是队列本身。消费组决定谁一起分消息。分区键用订单号，预测同一订单进同一队列才有序。幂等键也用订单号，预测重复投递不会扣两次。四项对不上就要改配置或业务键。延迟和事务消息仍看 RocketMQ 自己的能力，不是注解的默认。',
    keywords:'Spring Cloud Stream RocketMQ binding 消费组 幂等',
    points:['Stream 的 destination 对应主题，不改变投递语义','顺序仍靠同一队列，重复仍靠业务键','延迟消息和事务消息不是 Stream 默认能力'],
    deep:[
      {title:'注解不改变投递',body:'绑定把发送和监听收进 Spring。至少一次、消费组和队列都还在。同一订单要有序，仍要按订单号进同一队列。监听失败可能再投，业务键去重不能省。在监听里 sleep 也不是延迟消息。'},
      {title:'怎样自己验证',body:'写出 destination、消费组、分区键和幂等键。同一订单号应总进同一队列。把同一条消息投递两次，幂等键应让第二次不再扣减。延迟关单不要写在监听里空等。'},
    ],
    refs:[['Spring Cloud Stream','https://docs.spring.io/spring-cloud-stream/reference/spring-cloud-stream.html'],['Spring Cloud Alibaba：RocketMQ','https://github.com/alibaba/spring-cloud-alibaba/wiki/RocketMQ']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-deregister-shutdown',
    title:'停机先从名单拿走，再停接收，最后才杀进程',
    prompt:'发布时直接杀旧实例，为什么网关和 Feign 还会打过来？',
    core:'调用方用的是 Nacos 名单加本地缓存。进程已经死了，名单和缓存里还在，请求就会打到拒绝连接。正确顺序是：先从 Nacos 注销并等缓存刷新，或等心跳超时之前留出窗口；入口网关和负载均衡不再选它；进程把已接收的请求做完；再退出。Spring Boot 的优雅停机处理的是“已接请求做完”，不代替服务发现的注销。Sentinel 规则、Nacos 配置订阅也要在退出时停干净，避免停机过程中还在拉配置。',
    why:'只配了进程优雅停机、没有先从 Nacos 注销，发布时网关和 Feign 仍按缓存里的地址打到已经拒绝连接的旧实例。区分信号是日志里这个 IP 先消失，然后才杀进程。',
    example:'订单实例发布：先从 Nacos 注销，等消费方缓存刷新，网关日志里不再出现这个 IP，再发 SIGTERM 排空已经接上的请求。若直接杀进程，名单和缓存里还有它，接下来一段连接失败都打在这个地址上。把这一跳的输入、输出和失败留下的状态同时记下来，不要只看最后没有报错。',
    task:'写三步发布清单：注销发现、排空请求、杀进程。给每一步标出现有配置项在哪。',
    answer:'第一步注销发现，预测配置在 Nacos 注销或下线，而不是杀进程。第二步排空请求，预测用的是优雅停机，把已接请求做完。第三步才杀进程。优雅停机不会自动从名单摘除。还要等多久，由调用方缓存的刷新时间决定。预测先写下来再对照链路，对不上就停在这一格，不要改邻接的组件。',
    keywords:'Nacos 注销 优雅停机 服务发现 发布',
    points:['调用方按名单和缓存找地址，死进程仍可能被打到','停机前应先注销实例，再排空请求','Spring 优雅停机不代替从注册中心摘除'],
    deep:[
      {title:'三步不能倒着做',body:'先杀进程，名单还在，新请求继续进来并失败。先注销并等缓存刷新，新请求不再选它，再停接收、做完已接的，最后退出。Spring 的优雅停机只覆盖已接请求，不覆盖发现。'},
      {title:'怎样自己验证',body:'按注销发现、排空请求、杀进程写清单，并标出每一步的配置在哪。发布时看网关日志：这个 IP 应在进程退出之前就不再被选中。'},
    ],
    refs:[['Spring Boot：优雅停机','https://docs.spring.io/spring-boot/reference/web/graceful-shutdown.html'],['Nacos：服务发现','https://nacos.io/docs/latest/guide/user/open-api/']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-one-call',
    title:'一次下单：把发现、限流、事务和消息放回各自的位置',
    prompt:'下单失败时，应该先查 Nacos、Sentinel、Seata 还是 RocketMQ？',
    core:'按请求走过的位置查，不要按组件名猜。请求进网关：鉴权和入口配额在这里。进订单进程：Sentinel 看这个资源放不放行。要调库存：先问 Nacos 名单，LoadBalancer 选一台，Feign 带着超时发出去。两库要一起成功：Seata 的 XID 必须传到库存，否则库存自己提交。下单已成立再通知发货：消息在提交之后发，或用事务消息/Outbox，消费方幂等。文件、定时、短信不在这条同步链上。失败现象要对应位置：连不上是名单或超时，429 是限流，两边数据不一致是事务边界，发货重复是消息再投。',
    why:'把下单失败都归成微服务不稳，会同时改 Nacos、Sentinel 和 Seata，真正断开的那一跳被盖住。区分信号是链路停在六格的哪一格：429 是限流，504 停在读库存是这次 HTTP，两库对不上才查事务。',
    example:'调用方看到 504。链路停在 Feign 读库存，读超时已到，库存线程池打满仍在跑 SQL。网关已放进订单，Sentinel 没有拦截，Nacos 上该实例仍健康，两库没有各写一半，发货消息也没发。六格里只勾 Feign。',
    task:'拿一次真实失败，按网关、Sentinel、名单、Feign、Seata、消息六格打勾，只允许一格是根因。',
    answer:'六格按顺序只留一个根因。网关：请求已进订单，不是入口拒绝。Sentinel：没有拦截记录，不是配额。名单：实例仍健康，地址没丢。Feign：504 停在读库存，这一格打勾。Seata：没有两库各写一半。消息：订单未提交，通知还没发。所以只处理超时或库存容量。',
    keywords:'Spring Cloud Alibaba 排障 调用链 Nacos Sentinel Seata',
    points:['失败要对应到请求经过的那一跳','连不上、被限流、两库不一致、消息重复是四类不同问题','同步链路上不要塞文件、定时和短信'],
    deep:[
      {title:'六格各是一种失败',body:'网关失败发生在进订单之前。Sentinel 拦截时没有下游调用。名单问题是地址错或空。Feign 超时是这次 HTTP，下游可能还在写。Seata 是两库一边有一边无。消息问题出现在订单已经提交之后。'},
      {title:'怎样自己验证',body:'拿一次 504，按网关、Sentinel、名单、Feign、Seata、消息六格对日志。只有读库存超时对得上时间，就只勾 Feign，其余五格打叉，不要改 Seata 或重发消息。'},
    ],
    refs:[['Spring Cloud Alibaba README','https://github.com/alibaba/spring-cloud-alibaba/blob/2023.x/README-zh.md'],['Spring Cloud：LoadBalancer','https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/loadbalancer.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_SCA_12) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
