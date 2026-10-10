/* Batch 19: ten short Java PDFs (checksum/JWT/Loom/index kinds/Kafka/CORS/Zabbix/Executors/cache/OS). */
const COVERAGE_JAVA_19 = [
  {
    track:'java', group:'数据库', id:'mysql-pt-checksum-pk',
    title:'主从一致性校验靠分块 checksum，不是直接改从库',
    prompt:'为什么“从库跑 pt-table-sync 把行改对齐”会比 checksum 更危险？',
    promptAnswer:'对照 pt-table-checksum，切块依赖主键或唯一键，没有就难以安全分块。',
    core:'异步复制会让主从短暂不一致，定期核对要用校验而不是凭感觉。Percona pt-table-checksum 在主库按索引把表切成 chunk，计算 checksum，语句进入 binlog 后从库用同一批行再算，结果写入校验表再对比。没有可用索引时切块困难、锁窗口变大，官方也强调表上最好有主键或唯一键。pt-table-sync 会改数据：默认思路是在主库生成能修齐从库的语句再复制过去，而不是在从库就地 UPDATE。跑之前要备份，并确认结构一致。它不同步表结构。',
    why:'在从库上直接把行改对齐，正在追上的 binlog 会再写一次，修完立刻又漂，还可能和主库越差越远。区分信号是 checksum 只对比分块结果，sync 生成的修改要在主库执行再复制下去。',
    example:'pt-table-checksum 按主键把表切成 chunk，主库算出校验，同一批语句经 binlog 到从库再算，结果对不上的块记在校验表里。接着用 sync 时，修复语句在主库产生并复制到从库，而不是在从库就地 UPDATE。没有主键的表切块窗口会变大。',
    task:'对照 pt-table-checksum 文档，写出切块依赖什么键；说明 sync 的变更应走哪一侧。',
    answer:'对照 pt-table-checksum，切块依赖主键或唯一键，没有就难以安全分块。sync 的变更应走主库，再经复制到从库，而不是只改从库本地。跑之前先备份，它只修数据，不同步表结构。只在从库 UPDATE 会和正在应用的 binlog 打架。',
    keywords:'pt-table-checksum pt-table-sync 主从 一致性 Percona',
    points:['checksum 按索引切块后主从用同一批行计算','缺主键或唯一键时切块危险','sync 改的是数据且应经主库复制，先备份'],
    deep:[
      {title:'对账和改写不要做在从库本地',body:'checksum 让主从用同一批行各自计算。发现漂移后，修复语句从主库复制下去，从库正在应用的事件才不会和手改打架。缺主键时锁住的范围难控制。没有主键时不要硬切大块。'},
      {title:'怎样自己验证',body:'对照 checksum 文档，确认分块用的是主键或唯一键。再看 sync 的说明，修复语句应出现在主库并被复制。不要在从库执行 UPDATE 去对齐，先做备份。'},
    ],
    refs:[['pt-table-checksum','https://docs.percona.com/percona-toolkit/pt-table-checksum.html'],['pt-table-sync','https://docs.percona.com/percona-toolkit/pt-table-sync.html']]
  },
  {
    track:'java', group:'安全', id:'jwt-payload-not-encrypted',
    title:'JWT 载荷是编码不是加密，改密钥才算作废所有票',
    prompt:'为什么把 JWT 说成用解密算法逆向解开用户信息？',
    promptAnswer:'未加密 JWT 的 payload 可直接解码阅读，不是密文。踢人靠黑名单或会话，不是“解密观感”。',
    core:'常见的 JWS（RFC 7519）把 header.payload.signature 做 Base64url，载荷谁都能解码，签名用来防篡改，不是把 JSON 加密起来。敏感字段不要放进 payload。无状态 JWT 不能单票作废，除非改签发密钥、维护黑名单，或把会话放到 Redis。资料里的 Redis 存随机 token 是服务端会话，和 JWT 不是同一套。Tomcat 内存复制会话在多节点上会广播，规模大时确实不合适。把请求里的 Origin 原样写成允许源并开 Credentials，等于谁来都带 Cookie，见 `cors-credentials-allowlist`。',
    why:'把 JWT 当成加密令牌，就会把手机号和权限塞进载荷，任何人 Base64url 解码都能看见；当成可以单张踢掉，无状态下登出又不会生效。区分信号是载荷能直接解出来，改的是签名密钥时所有旧票一起验签失败。',
    example:'一段未加密的 access token 取中间一段做 Base64url 解码，得到明文 JSON，里面有 sub 和过期时间。服务端换成新的 HMAC 密钥后，旧票的签名对不上，全部被拒绝。若只想踢掉一张，无状态票做不到，除非把 jti 放进黑名单。',
    task:'解码一段未加密 JWT 的 payload；写出仅改服务端密钥时，旧票怎样。',
    answer:'解码未加密 JWT 的 payload，预测得到可读的 JSON，而不是需要解密的密文。仅改服务端签名密钥时，预测所有旧票验签失败，等于整批作废，而不是只踢当前这一张。敏感字段不要放进载荷。想踢掉一张时要靠黑名单或服务端会话，而不是改载荷的观感。',
    keywords:'JWT JWS Base64 签名 Redis session 登出',
    points:['JWS 载荷是 Base64url，不是密文','无状态票难单张作废','Redis token 与 JWT 是两套会话'],
    deep:[
      {title:'能解开不等于能改内容',body:'JWS 的载荷是编码，签名用来发现被人改过。谁都能解码，所以不要放密钥和手机号。无状态票没有服务端会话可删，改密钥会让所有未过期的票一起失效。解码不需要密钥，验签才需要。'},
      {title:'怎样自己验证',body:'取一段未加密 JWT 的中间段做 Base64url 解码，应看到 JSON。再只更换服务端签名密钥，同一张旧票访问应验签失败。需要单张作废时，应改用黑名单或服务端会话。'},
    ],
    refs:[['RFC 7519 JSON Web Token','https://www.rfc-editor.org/rfc/rfc7519'],['MDN：CORS credentials','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS#requests_with_credentials']]
  },
  {
    track:'java', group:'并发', id:'java-loom-not-absent-coroutine',
    title:'Java 已有虚拟线程，协程也不是“单线程所以不用锁”',
    prompt:'2022 年材料还说 Java 原生没有协程、协程用不了多核。为什么和现在的运行时对不上？',
    promptAnswer:'虚拟线程已由载体调度，可用多核。共享可变结构仍要锁；CPU 密集不会因此自动变快。',
    core:'进程是资源分配单位，线程是调度执行单位，这点教材仍对。用户态可切换的执行流常被叫作协程；它们不是天然异步，也可以同步风格写。Go 的 goroutine 会跑在多个操作系统线程上，能用多核。Java 21 起有虚拟线程（JEP 444）：大量阻塞 I/O 任务可以挂在载体线程上，载体能用到多核。它不是 Go 那种可手动 yield 的栈式协程 API，但不能再说“语法里完全没有”。单线程协程里不抢占写共享变量，仍可能有交错；多载体上的虚拟线程照样要锁。CPU 密集不会因为换虚拟线程变快，见 `java-virtual-threads`。',
    why:'按 Java 没有用户态调度来答题，会错过虚拟线程；按单线程协程不用锁来写共享变量，多个载体上会数据竞争。区分信号是大量阻塞等待可以一任务一条虚拟线程，而两个虚拟线程同时改同一个 HashMap 仍然要同步。',
    example:'Java 21 用每个任务一条虚拟线程去等 JDBC，载体线程可以跑在多个核上，等待时让出载体。两个虚拟线程同时 put 进同一个 HashMap，仍然出现数据竞争。把这段计算改到有界的平台线程池，不会因为换成虚拟线程就变快。',
    task:'对照 JEP 444，划掉“Java 没有用户态调度”；写出虚拟线程仍要锁的一种情况。',
    answer:'对照 JEP 444，划掉 Java 没有用户态调度：虚拟线程由载体调度，载体可以用到多核。虚拟线程仍要锁的一种情况，是两个虚拟线程改同一份非线程安全的共享结构。CPU 密集任务不会因此变快。共享的 HashMap 在两条虚拟线程下仍会竞争。',
    keywords:'进程 线程 协程 虚拟线程 JEP 444',
    points:['进程分配资源，线程是运行单位','Java 21 虚拟线程是用户态调度的载体模型','多载体下共享变量仍要同步，不是天然无锁'],
    deep:[
      {title:'让出载体不等于不用锁',body:'虚拟线程在阻塞时可以换到别的载体上跑，所以不是全部挤在一条操作系统线程里。共享可变状态仍会被并行改到。它也不是要你手写 yield 的那套协程 API。载体可以是多个操作系统线程。'},
      {title:'怎样自己验证',body:'对照 JEP 444 划掉没有用户态调度。用两个虚拟线程同时更新同一个 HashMap，应能观察到数据竞争。给这段共享数据加上同步后，竞争应消失。计算任务仍用有界平台线程池。'},
    ],
    refs:[['JEP 444：Virtual Threads','https://openjdk.org/jeps/444'],['Java：Virtual Threads','https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-covering-not-index-kind',
    title:'覆盖索引是用上了哪些列，不是 CREATE 出来的第六种索引',
    prompt:'为什么把覆盖索引和普通/唯一/主键并列成“功能索引种类”，FULLTEXT 还写成只有 MyISAM？',
    promptAnswer:'Using index 表示这次要用的列已经在索引里，覆盖是访问方式，不是和主键、唯一并列的索引种类。',
    core:'普通、唯一、主键、组合是约束与列集合；覆盖是优化器发现二级索引叶子已包含 SELECT 所需列、Extra 出现 Using index，不必回表。没有 CREATE COVERING INDEX。MySQL 8 还有函数/表达式索引，和这张表不是一回事。InnoDB 从 5.6 就能 FULLTEXT，不能再背“仅 MyISAM”，见 `mysql-innodb-fulltext`。唯一索引允许 NULL，主键不允许。',
    why:'把覆盖索引当成 CREATE 出来的一种新索引，语法并不存在；再把全文只留给 MyISAM，就会无谓避开 InnoDB。区分信号是 EXPLAIN 的 Extra 出现 Using index，表示这次不用回表，而不是多了一种索引类型。',
    example:'二级索引是 (email)，查询 SELECT id, email FROM user WHERE email=?。InnoDB 叶子上带有主键，Extra 出现 Using index，没有回表。改成 SELECT * 后要取出索引里没有的列，计划不再是覆盖，需要回表。并不存在 CREATE COVERING INDEX。',
    task:'对照 EXPLAIN Extra，指出覆盖与索引种类的差别；划掉 FULLTEXT 仅 MyISAM。',
    answer:'对照 EXPLAIN 的 Extra：Using index 表示这次要用的列已经在索引里，覆盖是访问方式，不是和主键、唯一并列的索引种类。划掉 FULLTEXT 仅 MyISAM，InnoDB 也能建全文索引。函数索引是另一回事。SELECT * 预测要回表，不再是 Using index。',
    keywords:'覆盖索引 Using index FULLTEXT 函数索引',
    points:['覆盖看 SELECT 列是否都在索引里','没有单独的 covering 索引种类','InnoDB 支持 FULLTEXT'],
    deep:[
      {title:'覆盖描述的是这次查询',body:'索引种类看你创建时的约束和列。覆盖看 SELECT 的列是否都落在这棵索引里。星号通常要回表。全文索引可以建在 InnoDB 上，不必为了它换引擎。没有单独的 covering 这种创建语法。'},
      {title:'怎样自己验证',body:'对只查索引列的语句看 EXPLAIN，Extra 应有 Using index。改成 SELECT * 后这条标记应消失或改为回表。再确认建的是普通二级索引，没有 covering 这种类型，InnoDB 上可以建 FULLTEXT。'},
    ],
    refs:[['MySQL：EXPLAIN Extra','https://dev.mysql.com/doc/refman/8.4/en/explain-output.html#explain-extra-information'],['MySQL：CREATE INDEX','https://dev.mysql.com/doc/refman/8.4/en/create-index.html']]
  },
  {
    track:'java', group:'消息队列', id:'kafka-producer-does-batch',
    title:'Kafka 会攒批，也不靠 Scala 才能运维',
    prompt:'为什么把 Kafka 的缺点写成“不支持批量、要懂 Scala、文档少”会过时？',
    promptAnswer:'客户端和运维不依赖它。所谓不支持批量是过时缺点，广播靠多个消费者组。',
    core:'Kafka 生产者按分区攒 batch，linger.ms 和 batch.size 就是批量发送；服务端零拷贝追加日志。广播语义用多个订阅组或 fan-out，不是 AMQP 那种交换机名词，但不能说“不支持批量”。客户端和运维不要求写 Scala。文档在 kafka.apache.org。资料里 ActiveMQ 吞吐弱、Rabbit 用 Erlang、RocketMQ 适合堆积，方向可对照 `mq-compare-matrix`，具体以现行手册为准，不要把 2018 年的“社区新生”再当现状。',
    why:'按 Kafka 不支持批量去选型，会为了攒条再堆一套中间件；按必须懂 Scala 去招人，运维条件也会被写错。区分信号是生产者配置里有 batch.size，客户端按分区攒批，不要求用 Scala 写运维脚本。',
    example:'日志生产者把 batch.size 调大并设置 linger.ms，发往同一分区的多条在客户端攒成一批再送出，吞吐上去。运维用发行包里的命令看消费者组滞后，不需要写 Scala。订单要广播时加另一个消费者组，而不是换成别的队列才叫支持批量。',
    task:'对照 producer 配置指出 batch.size；划掉必须掌握 Scala。',
    answer:'对照生产者配置，batch.size 是按分区攒批的字节上限，linger.ms 用来等这一批凑满。划掉必须掌握 Scala：客户端和运维不依赖它。所谓不支持批量是过时缺点，广播靠多个消费者组。linger.ms 是在等这一批，不是说明产品不能批量。',
    keywords:'Kafka batch linger.ms 生产者 对比 RabbitMQ',
    points:['生产者按分区攒批，有 linger.ms 和 batch.size','不要求用 Scala 运维','广播靠消费者组，不是“不支持批量”'],
    deep:[
      {title:'批量发生在发往分区之前',body:'生产者把同一分区的记录放进批次，到大小或等待时间再发送。这和有没有 Scala 无关。多个消费者组可以各自读全量，用来做广播，不必因此否定 Kafka。批次按分区累积，和语言无关。'},
      {title:'怎样自己验证',body:'打开 producer 配置，指到 batch.size 和 linger.ms。把等待时间加大后看发送批次变大。运维命令不需要 Scala 工程就能查看滞后。把必须掌握 Scala 从选型表里划掉。'},
    ],
    refs:[['Kafka producer configs','https://kafka.apache.org/documentation/#producerconfigs'],['Kafka introduction','https://kafka.apache.org/documentation/#introduction']]
  },
  {
    track:'frontend', group:'浏览器', id:'cors-credentials-allowlist',
    title:'带 Cookie 的 CORS 不能回显任意 Origin',
    prompt:'为什么 Spring 拦截器里把 Origin 原样写回并 Allow-Credentials=true，看起来能跨域，其实把登录态让出去了？',
    promptAnswer:'带 Cookie 时不能把 Origin 无校验回写，也不能用 *。Allow-Origin 必须是明确的那一个源。',
    core:'同源看协议、主机、端口。跨源读响应要服务器 CORS 头。带凭据时 Access-Control-Allow-Origin 不能是 *，必须是明确源，且不能把请求头里的任意 Origin 反射回去。否则恶意站点带着用户 Cookie 打你的 API，浏览器会把响应交给那边的脚本。Allow-Headers: * 在预检里对凭据请求也不总是合法。JSONP 只适合 GET 且把信任交给外域脚本。反向代理同源可以避开浏览器 CORS，但服务器自己仍要鉴权。资料把协议/域名/端口写对了，示例代码是反例。',
    why:'拦截器把请求里的 Origin 原样写回，并打开 Allow-Credentials，恶意页面就能带着用户 Cookie 读你的接口。区分信号是带凭据时允许源必须是名单里的那一个；写成星号，浏览器不会把响应交给脚本。',
    example:'允许列表只有 https://app.example。预检和实际响应都写 Access-Control-Allow-Origin: https://app.example，并带 Credentials。恶意站 https://evil.example 把用户引来，若服务端把它的 Origin 原样反射回去，浏览器会把带 Cookie 的响应交给那个页面的脚本。',
    task:'对照 MDN 凭据一节，划掉反射 Origin；写出带 Cookie 时 * 会怎样。',
    answer:'对照凭据一节，划掉把请求 Origin 无校验回写。带 Cookie 时 Access-Control-Allow-Origin 为 * ，预测浏览器拒绝把响应暴露给脚本，必须改成明确的那一个源。JSONP 和反向代理也不能代替服务器自己的鉴权。',
    keywords:'CORS credentials Allow-Origin 预检 JSONP',
    points:['带凭据时允许源不能是星号','不要把请求 Origin 无校验回写','JSONP 只适用于可公开的 GET'],
    deep:[
      {title:'反射来源等于谁来都算自己人',body:'带凭据的响应不能用星号，也不能把任意 Origin 抄回去。名单里有的源才写回那一个，并打开 Credentials。预检里的允许头同样不能图省事写成谁都要。名单之外的源即使带了 Cookie 也不能读。'},
      {title:'怎样自己验证',body:'对照 MDN 凭据说明，把反射 Origin 的代码划掉。用带 Cookie 的跨源请求分别看星号和明确源：星号时脚本应读不到响应，只有名单中的源才能读到。恶意页面不应拿到带登录态的响应正文。'},
    ],
    refs:[['MDN：CORS','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS'],['Fetch：CORS protocol','https://fetch.spec.whatwg.org/#cors-protocol']]
  },
  {
    track:'java', group:'工程实践', id:'zabbix-active-at-scale',
    title:'Zabbix 上千台该让 agent 主动上报，而不是 server 去轮询',
    prompt:'为什么资料写“上千台服务器用被动模式”会把 Server 拖死？',
    promptAnswer:'上千台别让中心被动轮询拖死。大规模用主动检查或 Proxy 分层。',
    core:'Zabbix 被动检查（passive）是 Server/Proxy 连到 agent 拉数据；主动检查（active）是 agent 向 Server 要监控项列表再推数据。默认很多模板是被动，但机器变多时，Server 的并发轮询和网络扇出会先撑不住。上千台应让 agent 走主动检查，或加 Proxy 分层。资料把被动写成 agent 模式、还推荐大规模用被动，和官方规模化方向相反。',
    why:'上千台仍用被动模式，中心要去连每一台 agent 拉数，Server 的轮询和网络会先被打满，监控自己变慢。区分信号是被动时 Server 连 agent，主动时 agent 来取监控项再把数据推上来。',
    example:'一千台都开被动检查，Server 轮流连接各机的 agent 端口，CPU 和延迟一起升高。改成 agent 做主动检查后，Server 只接收推上来的数据。再按机房放 Proxy，中心不再直接扫描这一千个采集端口。',
    task:'对照 Zabbix active/passive 文档，写出大规模该用哪一种，以及被动时谁连谁。',
    answer:'对照主动和被动检查：大规模用主动检查，或加 Proxy 分层，而不是中心轮询全部 agent。被动时是 Server 或 Proxy 连到 agent 去拉数据。默认模板很多是被动，机器变多时要改掉这条方向。被动扫完全网的 agent 端口会先把 Server 打满。',
    keywords:'Zabbix active checks passive agent Proxy',
    points:['被动：Server 连 agent 拉数','主动：agent 向 Server 推数','大规模用主动检查或 Proxy，不是全网被动轮询'],
    deep:[
      {title:'谁发起连接决定中心扛不扛得住',body:'被动检查的扇出在 Server 一侧，机器一多就轮不过来。主动检查由 agent 来要监控项列表并上报。机房里还可以先汇总到 Proxy，中心只和 Proxy 说话。'},
      {title:'怎样自己验证',body:'对照文档写明被动是 Server 连 agent，主动是 agent 推数据。在实验里把多台改成主动检查后，中心不应再轮询每一台的 agent 端口，数据仍能到 Server。'},
    ],
    refs:[['Zabbix：Passive and active agent checks','https://www.zabbix.com/documentation/current/en/manual/appendix/items/activepassive']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_19) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
