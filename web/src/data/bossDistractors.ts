/** Boss 副本上的干扰项。章节题库仍用原来的句子。 */

import type { OptionId } from './drillBank.ts'

export const BOSS_DISTRACTORS: Record<string, Partial<Record<OptionId, { text: string; why: string }>>> = {
  'fs-four-layers': {
    a: {
      text: '页面、接口契约、用例和持久化写成同一个对象，改一处就四处一起对齐。',
      why: '这四件事职责不同。写成同一个对象，改表或改规则仍会把另外三处一起带走。',
    },
  },
  'fs-page-feature': {
    c: {
      text: '接口结果和输入框可以共用同一份 useState，刷新后以最后一次写入为准。',
      why: '服务器状态和表单状态是两份。共用一份时，晚到的 GET 会盖掉还没提交的输入。',
    },
    d: {
      text: '刷新之后浏览器会自动把表单状态写回服务器。',
      why: '刷新丢掉的是页面上还没提交的输入，不会自动写回服务器。',
    },
  },
  'fs-write-ui': {
    a: {
      text: 'HTTP 409 会让 fetch 抛错，所以写在 catch 里就是失败。',
      why: 'fetch 对 4xx 不抛错。409 要看状态码，不能等 catch。',
    },
    b: {
      text: '只要请求发出去了，页面就可以先提示保存成功。',
      why: '成功提示要对上契约里的成功。409 不是保存成功。',
    },
  },
  'fs-frontend-done': {
    b: {
      text: '页面能点通一次成功请求，这六项就算掌握。',
      why: '能点通只覆盖成功路径。任一项还要翻实现才能答，这项就还没掌握。',
    },
    d: {
      text: '失败类型和幂等重试可以等联调时再看。',
      why: '失败 type 与表单状态、传输失败与幂等重试都在这六项里，不能留到联调。',
    },
  },
  'fs-boot-chain': {
    a: {
      text: '控制器里直接 new 实体并 save，接口形状仍然只由注解决定。',
      why: '实体字段会进入请求或响应。改表就会迫使接口契约一起改。',
    },
    c: {
      text: '表字段留在控制器里，用例就不需要知道持久化。',
      why: '表字段应留在持久化。控制器只收 HTTP、调用用例、返回状态码。',
    },
  },
  'fs-write-invariant': {
    b: {
      text: '返回 200 就表示订单已经提交，库存也已经守住。',
      why: '200 只是这次响应的状态码。订单行和库存不小于 0 要在同一次提交里成立。',
    },
    c: {
      text: '库存扣成负数可以等下次读取时再修正。',
      why: '库存不小于 0 是这次提交的不变量，不能留到下次读取。',
    },
  },
  'fs-read-shape': {
    a: {
      text: '详情接口返回整个实体，页面不用的字段可以自己忽略。',
      why: '实体上有契约没约定的字段，序列化时还可能再查关联。详情只返回约定字段。',
    },
    d: {
      text: '刚提交的订单读从库也一定能看见，因为提交已经返回成功。',
      why: '刚提交、页面必须马上看见的，要读主库。从库要写明允许旧多久。',
    },
  },
  'fs-ship-bar': {
    b: {
      text: '前端示例和后端示例各自跑通，就算能独立做这条功能。',
      why: '两边各跑通一个互不相关的示例不算。要的是同一功能从页面到数据库。',
    },
    c: {
      text: '五种失败都算接口契约的事，页面不用区分。',
      why: '字段不合法、业务规则拒绝、唯一约束冲突、事务回滚、请求没到达，要能指出落在页面、接口契约、用例还是持久化。',
    },
  },
  'spring-transaction': {
    c: {
      text: '同类里 this 调用也会走 Spring 代理，所以 @Transactional 仍然生效。',
      why: '同类 this 调用不经过代理，事务包不住。',
    },
    d: {
      text: '方法里 catch 住异常再返回，外层事务仍会回滚。',
      why: '异常被吃掉不再抛出时，外层按成功提交。',
    },
  },
  'mysql-isolation-levels': {
    a: {
      text: 'InnoDB 的每一条 SELECT 都会加间隙锁，所以幻读不会出现。',
      why: 'REPEATABLE READ 下普通 SELECT 是快照读，不锁间隙。不能把这句话套在所有 SELECT 上。',
    },
    d: {
      text: '隔离级别改成 READ UNCOMMITTED 之后，这条说法就可以套在所有 SELECT 上。',
      why: '要分清快照读和当前读。默认是 REPEATABLE READ，普通 SELECT 并不锁间隙。',
    },
  },
  'idempotency': {
    b: {
      text: '按钮禁用之后，同一次下单就不会再发出第二次 HTTP。',
      why: '禁用按钮挡不住超时后的重试。第二次请求仍会到达服务端。',
    },
    c: {
      text: '超时重试换一个新的幂等键，服务端才能认出这是同一次下单。',
      why: '同一下单要带同一个幂等键。换新键会被当成另一张订单。',
    },
  },
  'http-methods': {
    a: {
      text: 'POST 在方法表里也是幂等的，所以超时可以自动再发一次。',
      why: 'POST 在 RFC 9110 的方法表里不幂等，不能按幂等方法自动重试。',
    },
    d: {
      text: 'DELETE 的第二次响应必须和第一次状态码相同，否则就不能重试。',
      why: 'DELETE 的预期效果可以重复，第二次状态码可以不同。只有还没读到响应时才适合自动重试。',
    },
  },
  'spring-mvc-exception': {
    b: {
      text: '业务异常抛出后，容器会按控制器的返回类型自动变成 JSON。',
      why: '没被收成契约 JSON 时，容器会吐 HTML 错误页。',
    },
    d: {
      text: '库存不足用一段 HTML 返回，只要能看见文字就算契约对齐。',
      why: '校验、冲突、未知错误要写成同一形状的 JSON 响应。',
    },
  },
  'mybatis-local-cache': {
    a: {
      text: '一级缓存跟整个进程，所以同一个 Mapper 方法永远只打一条 SQL。',
      why: '一级缓存只跟同一次 SqlSession。会话结束就会再查。',
    },
    d: {
      text: '关掉一级缓存之后，二级缓存会自动替每一次新请求去重。',
      why: '二级缓存要额外打开。没开时，新请求会再查库。',
    },
  },
  'cache-aside-steps': {
    c: {
      text: '更新数据库之后缓存会自己改成新价格，所以不用删键。',
      why: '旁路缓存不会在写库时自动改缓存。写成功后要删键，否则页面继续读旧价格。',
    },
    d: {
      text: '写的时候先改缓存再写库，未命中的读就一定看见新价格。',
      why: '读是先查缓存，未命中再读库并回填。键还在时，页面会继续读到旧价格。',
    },
  },
  'cache-db-double-write-race': {
    a: {
      text: '先写库再删缓存之后，就不会再有读到旧值的窗口。',
      why: '先改库还是先改缓存，并发下都有窗口。不能写到删除缓存就结束。',
    },
    b: {
      text: '两个写入同时进行时，后完成的那次一定同时盖住缓存和数据库。',
      why: '并发下两边完成的顺序不确定。要定失效顺序，并对账。',
    },
  },
  'csrf-boundary': {
    a: {
      text: '配置了 CORS 允许的源之后，跨站表单就不会再带上 Cookie。',
      why: 'CORS 管的是脚本能否读跨源响应。表单带 Cookie 提交走的是另一条路。',
    },
    b: {
      text: '跨站请求只要被 CORS 预检拦住，状态变更就不用再校验来源。',
      why: '简单表单提交可以不走预检。来源要靠 Cookie 的 SameSite 和来源校验。',
    },
  },
  'contract-test-path': {
    a: {
      text: '前端 mock 和后端单测都绿，就说明两边用的是同一份字段。',
      why: '各测各的模拟对象只对得上自己。字段要靠同一份契约断言锁住。',
    },
    c: {
      text: '后端把失败类型改名之后，前端 mock 仍返回成功是对的。',
      why: '类型改名后，前端契约测试应该失败，不能让 mock 继续返回成功。',
    },
  },
  'playwright-user-journey': {
    b: {
      text: '每个函数配一条浏览器测试，分支才算被锁住。',
      why: '浏览器只守一条用户路径。细分支留在单元测试。',
    },
    d: {
      text: '端到端绿了，单元测试就可以不写那些分支。',
      why: '端到端盖不住每个函数的分支。细分支仍要单元测试。',
    },
  },
  'request-trace-one-hop': {
    b: {
      text: '日志、指标、链路各有一段数字，拼在一起就是同一次下单。',
      why: '不是同一条追踪标识，就不是同一次请求。慢要落到某一跳。',
    },
    c: {
      text: '只要总耗时变长，就不用再对上是哪一跳。',
      why: '总耗时落不到某一跳，仍然不知道是网关、应用还是 SQL。',
    },
  },
  'fe-slow-page-where': {
    a: {
      text: '列表一卡，给每行套 memo 就能去掉网络等待。',
      why: '慢在网络时，给行套 memo 不改变等首字节的那一段。',
    },
    b: {
      text: '主线程长任务和等首字节是同一件事，优化一个就行。',
      why: '要先分清是等首字节还是主线程长任务，两段不是同一个耗时。',
    },
  },
  'mysql-slow-sql-locate': {
    b: {
      text: '单次花了 3 秒的语句，累计耗时一定排在高频的 50 毫秒前面。',
      why: '按总耗时排序时，高频的 50 毫秒可以排在偶发的 3 秒前面。',
    },
    d: {
      text: '慢日志里只要有 SQL 文本，就够决定先改哪一条。',
      why: '还要看到次数、累计时间、检查行数和返回行数。',
    },
  },
  'jvm-gc-choice': {
    b: {
      text: '换成 ZGC 之后，接口耗时会跟着暂停一起下降。',
      why: '暂停远小于接口耗时时，瓶颈在 SQL、锁或网络，换回收器没有帮助。',
    },
    d: {
      text: '没抄到同一次抖动的暂停和接口耗时，也可以先换回收器。',
      why: '要先抄同一次抖动里的 GC 暂停和接口耗时，再决定换不换。',
    },
  },
  'arch-monolith-when': {
    a: {
      text: '一上线就拆成六个服务，模块边界会因此先划清。',
      why: '先痛的是分布式调用、排障和跨服务事务。模块之间还可能直接改对方的表。',
    },
    b: {
      text: '小团队拆开之后，跨服务事务比一个进程里的模块调用更少。',
      why: '拆开增加的是分布式调用和跨服务事务。一个进程里边界划清往往更合适。',
    },
  },
  'arch-soa-classic': {
    b: {
      text: '两个远程服务共用一个数据库，就已经是微服务的独立数据。',
      why: '共用一个数据库、走中心总线，是经典 SOA 的常见形态，不是独立数据。',
    },
    d: {
      text: '走了企业服务总线，发布和治理就已经去中心了。',
      why: '中心总线仍是中心治理。微服务还要尽量独立发布、去中心治理。',
    },
  },
  'arch-sync-vs-async': {
    a: {
      text: '全部改成消息之后，跨服务的一次业务就不再需要幂等和对账。',
      why: '消息只是把事务换成状态机、幂等、补偿和对账，问题还在。',
    },
    c: {
      text: '上了消息队列，编排和协同就同时做完了。',
      why: '编排与协同都要这些机制。上了消息不等于协同做完。',
    },
  },
  'distributed-one-db-first': {
    b: {
      text: '订单和库存刚拆开，就该用 Seata 把不变量缝回去。',
      why: '能一次本地提交的不变量先不要拆。刚拆开就上 Seata，是在缝本可同库的约束。',
    },
    c: {
      text: '全局事务是拆分服务的默认起点。',
      why: '全局事务是拆开之后的补洞，不是拆分的默认起点。',
    },
  },
  'distributed-consistency-three-words': {
    a: {
      text: '数据库约束、分区后的读写视图、过一会儿对账成功，都是 CAP 里的同一个 C。',
      why: '这是三种承诺。CAP 的 C 只谈分区下能否读到同一份最新视图。',
    },
    c: {
      text: '约束失败时，改复制策略就能把唯一约束补上。',
      why: '约束失败要改的是数据库约束，不是复制策略。混称会用错修法。',
    },
  },
  'distributed-outbox': {
    b: {
      text: '订单提交之后再发消息，进程崩溃了只要重试发送就能补上。',
      why: '只写了数据库、没写入 Outbox 时，发送意图已经丢了，重试补不回来。',
    },
    c: {
      text: 'Outbox 和业务行分属两个事务也一样，发布器仍能知道这次要发什么。',
      why: '业务行和待发事件要同一次事务写入。分开写就会留下双写空窗。',
    },
  },
  'distributed-idempotent-key': {
    b: {
      text: '补偿重试时换一个新的业务键，才能避开上一次的失败。',
      why: '换新键会被当成另一次扣减。重试要带同一个业务键。',
    },
    d: {
      text: '先改库存，去重记录下次再写，至少一次也不会扣两次。',
      why: '去重和扣减要放进同一次本地提交。先改库存再记去重，会再扣。',
    },
  },
  'mq-consume-idempotent-key': {
    a: {
      text: 'Redis SETNX 占住消息 id 之后，写库前崩溃也不会丢处理。',
      why: '键还在会挡住重投，数据库却没有这次流水，这次处理就丢了。',
    },
    c: {
      text: '占位和过期分成两条命令，和写在同一条 SET NX EX 里效果相同。',
      why: '分成两条时，占位成功、过期没写上，键会一直挡住重投。要写在同一条命令里。',
    },
  },
  'message-delivery': {
    b: {
      text: '至少一次表示服务端保证只投一次，消费者不用再去重。',
      why: '至少一次允许再投。确认前崩溃，或确认没落到服务端，都会再来。',
    },
    c: {
      text: '消费者把同一条消息处理两次也没关系，投递已经保证只做一次。',
      why: '只做一次靠业务键，不靠投递口号。',
    },
  },
  'docker-not-a-vm': {
    b: {
      text: '一台机器上能跑容器，调度、Service 和 Ingress 就已经由 Docker 提供。',
      why: 'Docker 管的是这台机器上的镜像和容器。多机调度、Service 和 Ingress 是 Kubernetes。',
    },
    d: {
      text: '有了 Docker 引擎，集群的副本就不用再单独建。',
      why: '单机容器不是集群。副本调度不在这台机器的 Docker 里。',
    },
  },
  'docker-layer-cache-copy': {
    c: {
      text: '改一行 Java 只让最后一层失效，前面的 apt-get 层会继续用缓存。',
      why: '源码 COPY 放在安装之前时，这一层变了，后面的 apt-get 也会重跑。',
    },
    d: {
      text: '层缓存只看文件名，不看 COPY 的先后顺序。',
      why: 'COPY 的顺序决定后面的层还能否用缓存。',
    },
  },
  'docker-root-not-host-root': {
    b: {
      text: '容器里的 root 就是宿主机 root，提升权限后可以无限制操作机器。',
      why: '容器 root 不等于无限制的宿主机 root。还要看 capabilities、用户命名空间和 rootless。',
    },
    d: {
      text: '只要镜像以 root 启动，用户命名空间和 rootless 就不会再生效。',
      why: '用户命名空间和 rootless 仍然限制容器 root。不能背成一提升权限就无限制。',
    },
  },
  'compose-service-name-dns': {
    a: {
      text: 'Compose 里写 localhost 加宿主机映射端口，就会连到别的服务。',
      why: '容器里的 localhost 是它自己，不是宿主机，也不是别的服务。',
    },
    b: {
      text: '服务名只能在宿主机上解析，容器里要写 IP。',
      why: 'Compose 用服务名做 DNS。容器里应写服务名和容器端口。',
    },
  },
  'jenkins-not-only-ci-tool': {
    a: {
      text: '用了 Jenkins，持续集成的实践就自动成立。',
      why: '持续集成是实践，Jenkins 只是工具之一。装上工具不等于验证链已经在跑。',
    },
    d: {
      text: 'GitHub Actions 和 GitLab CI 跑的不是持续集成，因为它们不是 Jenkins。',
      why: '这些工具也能跑同一条验证链。持续集成不跟某一种工具绑死。',
    },
  },
  'gha-workflow-in-dot-github': {
    a: {
      text: '仓库根目录的 build.yml 推上去就会被 GitHub Actions 执行。',
      why: '工作流必须放在 .github/workflows。根目录的 yml 不会被捡起来跑。',
    },
    d: {
      text: '文件名是 build.yml 就够了，目录只影响编辑器。',
      why: '目录决定它是不是工作流。不在 .github/workflows 里就不会运行。',
    },
  },
  'gha-job-needs-success': {
    b: {
      text: '测试 job 失败后，后面的部署 job 默认仍会启动。',
      why: '默认 needs 要求上游成功。测试失败时部署应跳过。',
    },
    c: {
      text: '测试失败会让整个工作流停止解析，部署不该出现在运行列表里。',
      why: '工作流已经解析。部署启不启动看 needs 和条件，不是解析被打断。',
    },
  },
  'k8s-cluster-enter': {
    a: {
      text: 'Deployment 的 YAML 放进仓库之后，集群就会出现这些 Pod。',
      why: '只写文件、不 kubectl apply，集群不会变。',
    },
    c: {
      text: 'kubectl apply 只检查 YAML 语法，Pod 要等本机 Docker 自己拉起。',
      why: 'apply 把对象交给 API，控制器在节点上创建 Pod。',
    },
  },
  'k8s-pod-share-localhost': {
    a: {
      text: '同一个命名空间里的容器都共用 localhost。',
      why: '共用 localhost 的是同一个 Pod 里的容器，不是同一个命名空间。',
    },
    c: {
      text: '拆成两个 Pod 之后，localhost 会跨 Pod 转发。',
      why: '两个 Pod 要用 IP 或 Service。localhost 不会跨 Pod。',
    },
  },
  'k8s-not-docker-engine': {
    b: {
      text: '集群能跑 Pod，就是本机 Docker 在做调度。',
      why: '调度的是 Kubernetes，不是本机 Docker 引擎。',
    },
    c: {
      text: '浏览器能打开这些副本，是因为 Docker 把容器端口直接映到了主机。',
      why: '从外面进来通常要 Ingress 和它的控制器。集群内用 Service。',
    },
  },
  'k8s-ingress-needs-controller': {
    a: {
      text: 'Ingress 对象 apply 成功，这个主机名就从集群外打开了。',
      why: 'Ingress 对象本身不开通外网。还要有控制器。',
    },
    d: {
      text: '控制器装好之后不用写 class，任何 Ingress 都会接上。',
      why: '还要写对 class 和后端 Service。对象本身不会选中控制器。',
    },
  },
  'k8s-service-clusterip': {
    b: {
      text: '把 Pod IP 写进前端配置，滚动更新后这个 IP 仍然指向新 Pod。',
      why: '滚动更新后 Pod IP 会变。客户端要连 Service。',
    },
    c: {
      text: 'Service 只在集群外提供域名，集群内仍要写 Pod IP。',
      why: '集群里的客户端也连 Service，不要写死 Pod IP。',
    },
  },
  'arch-evolution-stages': {
    c: {
      text: '架构演进的第一句就是上微服务，否则容量和发布都不会变。',
      why: '没有发布冲突、数据库容量打满或必须独立扩缩的信号，就停在现在这一站。',
    },
    d: {
      text: '停在单体说明演进还没开始。',
      why: '停在单体可以是正常结果。演进要分清容量线和服务化线。',
    },
  },
}
