/* TypeScript modules, Node fetch, MyBatis cache, Redis Lua/streams, EntityGraph, Host header. */
const COVERAGE_OPS_17 = [
  {
    track:'frontend', group:'TypeScript', id:'ts-module-resolution',
    title:'moduleResolution 决定怎么找到 .js，bundler 和 Node 不是同一套',
    prompt:'本地能编译，CI 里却说找不到模块，常常差在哪一项配置？',
    core:'TypeScript 按 moduleResolution 去猜导入路径。node10/node 跟旧 Node 的文件查找走；bundler 更贴近 Vite/webpack：允许扩展名省略、也更认 package.json 的 exports。两边混用会出现“编辑器绿、构建红”。路径别名要和打包器、测试运行器写成同一份。不要用 paths 去映射到不存在的发行文件。改这项之后要清缓存再编。',
    why:'把官网示例里的 moduleResolution 原样抄进 Vite 项目，编辑器按 bundler 能解析，CI 按 Node 的文件查找就报找不到模块。区分信号是同一条相对导入，bundler 允许省略扩展名，node/node10 要落到真实文件。',
    example:'本地 tsconfig 写 moduleResolution 为 bundler，import "./api" 能过。流水线改用 Node 那套解析后，同一行报找不到模块；把导入改成带扩展名的真实文件，或让 CI 也用 bundler，报错消失。',
    task:'打开当前 tsconfig 的 moduleResolution。对照 Vite 或 Node 文档，标出它允许省略的扩展名。',
    answer:'打开 tsconfig，moduleResolution 若是 bundler，相对导入允许省略 .ts/.js 这类扩展名。对照 Node 的查找，node/node10 通常要写到真实文件，省略扩展名会在 CI 报找不到模块。别名还要和打包器、测试运行器写成同一份。',
    keywords:'TypeScript moduleResolution bundler Node exports tsconfig',
    points:['moduleResolution 决定导入如何落到文件','bundler 和 Node 的查找规则不同','路径别名要和打包器、测试共用'],
    deep:[
      {title:'编辑器绿不等于 CI 绿',body:'bundler 按打包器的习惯找文件，允许省略扩展名，也更认 package.json 的 exports。Node 那套按文件查找，相对路径对不上就直接失败。两边各用一份 tsconfig，不要用 paths 指到不存在的发行文件。'},
      {title:'怎样自己验证',body:'打开当前 tsconfig 的 moduleResolution。用 bundler 时省略扩展名应能编译；改成 Node 的查找后再编同一条相对导入，应报找不到模块。改回与 Vite 或 Node 一致的那一项后，报错应消失。'},
    ],
    refs:[['TSConfig：moduleResolution','https://www.typescriptlang.org/tsconfig/#moduleResolution'],['TypeScript：Modules','https://www.typescriptlang.org/docs/handbook/modules/reference.html']]
  },
  {
    track:'frontend', group:'TypeScript', id:'ts-template-literal-types',
    title:'模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败',
    prompt:'事件名必须是 on 加字段名，为什么还要用 string 然后运行时再检查？',
    core:'模板字面量类型把字符串字面量拼起来，例如 `on${Capitalize<K>}`。对象键、路由路径、CSS 变量这种有固定模式的字符串，可以用它把非法组合挡在编译期。它仍是类型，不会在运行时生成函数。模式太宽（`${string}`）就等于没限制。和联合、映射类型一起用时，先写出有限的键集合。键集合先收成有限联合再映射，拼出来的每个路径都能点名。模式放宽成任意字符串之后，编译器不再拒绝多出来的字符。类型擦除后没有这段检查，拼错的名字仍要到运行时才暴露。先写出有限的键再去拼。',
    why:'事件名写成 string，onClick 拼成 onClik 仍能通过编译，要点击才发现没有处理函数。区分信号是键集合有限时，"/api/users" 这种多余的 s 会在赋值处报错，而不是等到请求发出。',
    example:'type ApiPath = `/api/${"user" | "order"}`，得到 "/api/user" | "/api/order"。把变量写成 "/api/users" 再赋给 ApiPath，编译失败；改回 "/api/user" 才通过。运行时不会凭这个类型去拼接字符串。',
    task:'给 "user" | "order" 拼出 "/api/user" | "/api/order"。故意写 "/api/users" 看报错。',
    answer:'用 `/api/${"user" | "order"}` 得到 "/api/user" | "/api/order"。故意写 "/api/users" 赋给这个类型，预测编译报错，因为 users 不在键集合里。它只在编译期挡非法组合，不会在运行时生成路径。',
    keywords:'TypeScript template literal types Capitalize 映射类型',
    points:['模板字面量类型拼接字符串字面量','非法组合会在编译期失败','太宽的 ${string} 等于没有约束'],
    deep:[
      {title:'有限键才会挡住拼错',body:'模板字面量类型只是把已知字面量拼起来。键是 "user" | "order" 时，多一个 s 的路径过不了检查。模式写成任意字符串，就和普通 string 一样宽，编译期不再拒绝 onClik。'},
      {title:'怎样自己验证',body:'给 "user" | "order" 拼出 "/api/user" | "/api/order"。再把 "/api/users" 赋给这个类型，预测出现类型错误。改回两个合法路径之一，错误应消失，且运行时没有被类型生成的函数。'},
    ],
    refs:[['TypeScript：Template Literal Types','https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html'],['TypeScript：Capitalize','https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#capitalizestringtype']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-global-fetch',
    title:'Node 18 起有全局 fetch，超时和代理不能照搬浏览器默认',
    prompt:'在服务端写 fetch(url) 不传 AbortSignal，慢上游会怎样？',
    core:'Node 18+ 提供全局 fetch（Undici）。默认没有浏览器那种“用户关页就停”，也没有无限等你以为的短超时。服务端必须自己设 AbortSignal.timeout 或封装截止时间，并处理连接错误。相对 URL 没有网页基址，必须用绝对地址。Cookie 不会按浏览器同源策略自动带；要当 HTTP 客户端显式设置。它适合出站调用，不代替 IncomingMessage 读入站请求体。',
    why:'把浏览器里的 fetch(url) 原样放到 Node，慢上游没有页面关闭来取消，等待中的请求会一直占着。区分信号是同一条慢接口，不带 AbortSignal 时进程停在 await，带上很短的 timeout 会抛超时而不是无限挂起。',
    example:'脚本 await fetch(慢接口) 且不传 signal，进程停在这一行不退出。改成 signal: AbortSignal.timeout(100) 后，约 100 毫秒抛超时，调用方可以结束或重试。相对地址没有网页基址，必须写成绝对 URL。',
    task:'分别不带超时和带 100ms 超时请求一个慢接口。记下 Node 进程是否一直挂起。',
    answer:'不带超时请求慢接口，预测 Node 进程停在这次 await 上，一直挂起。带 100 毫秒 AbortSignal.timeout 时，预测到点抛超时，进程不必再等上游。地址要用绝对 URL，也不要指望浏览器那套 Cookie 自动带上。',
    keywords:'Node fetch Undici AbortSignal.timeout',
    points:['Node 18 起全局 fetch 基于 Undici','服务端必须显式超时和绝对 URL','不会自动带浏览器 Cookie，也不读入站请求'],
    deep:[
      {title:'服务端没有人关页',body:'Node 的全局 fetch 不会在用户离开时取消。慢上游会让这次调用一直占着，事件循环里未完成的请求越积越多。截止时间要自己用 AbortSignal.timeout 或等价封装写上。'},
      {title:'怎样自己验证',body:'对一个慢接口先不带超时 await fetch，进程应一直停着不退出。再带 100 毫秒的 AbortSignal.timeout，应在到点后抛超时。把地址改成相对路径，应因没有网页基址而失败。'},
    ],
    refs:[['Node：fetch','https://nodejs.org/api/globals.html#fetch'],['MDN：AbortSignal.timeout','https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-http-close',
    title:'停进程要先 server.close，等已有请求结束，再退出',
    prompt:'kill 之后为什么有的请求写到一半，有的新请求还被接进来？',
    core:'HTTP server.close 停止接受新连接，已建立的请求要等它们结束（或再设超时强拆）。只 process.exit 会切断进行中的写。SIGTERM 里应：停止接新流量、关健康检查、等队列清空、再关数据库。keep-alive 连接会让 close 的回调迟迟不来，需要设超时或关闭空闲套接字。这和 Spring 优雅停机是同一件事，只是钩子在 Node 进程上。',
    why:'滚动发布时直接 process.exit 或 SIGKILL，正在写的响应会被切成半截 JSON。区分信号是同一条慢请求收到 SIGTERM 时，只 exit 的连接中途断开，先 server.close 的那条能把已接受的响应写完。',
    example:'慢接口已开始写响应时发 SIGTERM。只 process.exit 的客户端收到半截正文。先 server.close，不再接受新连接，等这条请求写完再 db.end 和 exit，客户端拿到完整 JSON。keep-alive 拖住回调时用超时兜底。',
    task:'对一个慢接口发请求，期间 SIGTERM。对比只 exit 和先 close 的响应完整性。',
    answer:'慢接口进行中收到 SIGTERM：只 exit，预测响应写到一半被切断。先 server.close 再退出，预测不再接受新连接，已接受的这条把正文写完。keep-alive 会拖住 close 回调，所以还要有超时，最后再关数据库。半截正文只应出现在直接退出的那一次。',
    keywords:'Node server.close SIGTERM graceful shutdown keep-alive',
    points:['server.close 拒绝新连接，不立刻杀掉旧请求','keep-alive 会拖住 close 回调，要有超时','退出顺序：流量、健康检查、依赖、进程'],
    deep:[
      {title:'先停新的，再等旧的',body:'server.close 停止接受新连接，已经进来的请求继续写完。直接 exit 会把套接字掐掉，客户端看到半截 JSON。keep-alive 让回调迟迟不来，要另设超时再关依赖。'},
      {title:'怎样自己验证',body:'对慢接口发请求，写到一半时发 SIGTERM。只 exit 时响应应不完整。改成先 server.close、等回调再退出，同一条请求应拿到完整正文，期间新连接不应再被接受。'},
    ],
    refs:[['Node：server.close','https://nodejs.org/api/http.html#serverclosecallback'],['Node：signal events','https://nodejs.org/api/process.html#signal-events']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-second-cache',
    title:'二级缓存跨会话，默认往往得不偿失',
    prompt:'打开 mapper 的 cache 之后，别的事务改了行，为什么这边还读到旧的？',
    core:'一级缓存是同一个 SqlSession。二级缓存挂在 namespace 上，跨会话，事务提交后才对其他会话可见。多表联查、别的 mapper 改了相关行、未提交读，都容易脏。分布式部署时它还不是进程间缓存，除非接外部实现。默认更稳的是不用二级缓存，把跨请求缓存放到 Redis 并自己定失效。要开也必须把关联表的改写算进失效，不能当免费加速。',
    why:'给所有 mapper 打开 cache，库存 mapper 已经改了行，订单详情仍返回提交前的旧库存。区分信号是一级缓存只活在当前 SqlSession，二级缓存跨会话，而且要等事务提交后别的会话才看得见。',
    example:'订单 namespace 开了二级缓存。会话 A 提交后把订单详情放进缓存。会话 B 用库存 mapper 把库存改成 0 并提交。再查订单详情仍是旧库存，直到这条缓存过期或被同一 namespace 的写入清掉。',
    task:'对照 MyBatis cache 文档，列出一级和二级的范围。写出一个不应开二级缓存的联表查询。',
    answer:'对照 cache 文档：一级缓存只在同一个 SqlSession，二级缓存挂在 namespace 上，跨会话且提交后才对其它会话可见。订单联表带出库存不应开二级缓存，因为库存由另一个 mapper 改写，订单这边不会因此失效。库存被别的 mapper 改掉后，订单缓存仍会返回旧值。',
    keywords:'MyBatis 二级缓存 SqlSession namespace',
    points:['一级缓存只在同一个 SqlSession','二级缓存跨会话，提交后才可见','联表和多 mapper 写入很容易脏读缓存'],
    deep:[
      {title:'提交之后别的会话才看得到',body:'二级缓存不是进程间的 Redis。别的 mapper 改了联表里的行，这个 namespace 不会自动失效。多表查询和未提交读都会把旧结果留下，所以默认更稳的是关掉它。'},
      {title:'怎样自己验证',body:'对照 cache 文档写下一级只在当前 SqlSession、二级跨会话。再写一条订单联库存的查询并打开二级缓存，用另一个 mapper 改库存后重查，详情应仍是旧库存。'},
    ],
    refs:[['MyBatis：cache','https://mybatis.org/mybatis-3/sqlmap-xml.html#cache'],['MyBatis：settings cacheEnabled','https://mybatis.org/mybatis-3/configuration.html#settings']]
  },
  {
    track:'java', group:'MyBatis', id:'mybatis-type-handler',
    title:'Java 类型和 JDBC 类型对不上时，用 TypeHandler，不要在 SQL 里乱转',
    prompt:'库里是 JSON 字符串，实体是对象，为什么有时写出的是 toString()？',
    core:'TypeHandler 负责 Java 值 ↔ JDBC。默认能处理常见标量。JSON、枚举、自定义值对象要对指定列或类型注册处理器。不注册时，MyBatis 可能按未知类型走，写出无用的字符串或读成错误类型。处理器要同时实现设参和取列，空值走 JDBC 的 wasNull。不要在 XML 里写数据库方言函数代替所有转换，那会把移植和测试绑死在一种库上。',
    why:'枚举不注册 TypeHandler，写入可能变成 name 或 toString()，读出来又按另一个规则解，列表和详情对不上。区分信号是同一列：空值走 JDBC 空，已知 code 能来回，未知 code 不应被静默写成无意义字符串。',
    example:'OrderStatus 的 TypeHandler 把 PAID 写成 TINYINT 1，读 1 得到 PAID。插入 null 时 setNull，读回 wasNull 得到 Java 的 null。库里出现未知 code 9 时处理器显式失败，而不是变成 "9" 或枚举的 toString()。',
    task:'给一个枚举写 TypeHandler，分别测空值、已知 code、未知 code。',
    answer:'枚举 TypeHandler 要同时写设参和取列。空值预测写成 JDBC NULL，读回是 null。已知 code 预测枚举和整数来回一致。未知 code 预测显式失败或落到你写明的分支，而不是默认 toString()。不要用方言函数代替这层转换。',
    keywords:'MyBatis TypeHandler JDBC JSON 枚举',
    points:['TypeHandler 连接 Java 类型和 JDBC 类型','读写两侧都要处理，包括空值','不要用方言函数代替所有类型转换'],
    deep:[
      {title:'读写两侧都要认同一套 code',body:'只在插入时转成整数、查询仍用默认枚举，列表会解错。空值要走 setNull 和 wasNull。JSON 列同理，不用处理器时对象常被写成无用的 toString()。'},
      {title:'怎样自己验证',body:'给枚举写 TypeHandler 后插入 null、已知 code、未知 code 各一行。null 应读回空，已知 code 应还原成原枚举，未知 code 应走你写明的失败分支，而不是变成 toString()。'},
    ],
    refs:[['MyBatis：TypeHandlers','https://mybatis.org/mybatis-3/configuration.html#typeHandlers'],['MyBatis：sqlMap typeHandler','https://mybatis.org/mybatis-3/sqlmap-xml.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-lua-atomic',
    title:'多步 Redis 命令要原子时用 Lua，并声明读过的键',
    prompt:'先 GET 再 SET 判断库存，为什么两个请求还是都减成功了？',
    core:'每个 Redis 命令自己原子，两个命令之间别人能插进来。EVAL 把脚本放在服务端一次跑完，中间不会插入别的命令。脚本里要用到的键放 KEYS，参数放 ARGV，方便集群把脚本送到正确节点。脚本应短、可重入、不要在里面做随机长时间循环。持久化与复制按脚本整体效果走。能用单条命令（INCR、SET NX）就不要上脚本。',
    why:'客户端先 GET 再 SET 减库存，两条命令之间另一个请求插进来，两边都读到大于 0，秒杀超卖。区分信号是同一库存键，GET+SET 并发会减成负数，EVAL 里读完再 DECR 则只有一个请求成功。',
    example:'库存键是 1。两个客户端都 GET 到 1，再各自 SET 0，最后库存是 0 但两笔都下单。改成 EVAL：KEYS[1] 是库存键，脚本里小于 1 就返回 0，否则 DECR 返回 1。并发时只有一个返回 1。',
    task:'对照 Lua eval 文档，写出 KEYS 和 ARGV 的分工。用 GET+SET 并发和脚本并发对比超卖。',
    answer:'对照 EVAL：要访问的键放 KEYS，方便送到正确节点；数量这类参数放 ARGV。GET 再 SET 的并发预测超卖。同一逻辑放进脚本再并发，预测只有库存足够的那一次返回成功，因为中间插不进别的命令。库存只有 1 时，脚本并发应只有一次成功。',
    keywords:'Redis EVAL Lua KEYS ARGV 原子',
    points:['单条命令原子，两条命令之间可被插入','Lua 脚本在服务端连续执行','用到的键必须声明在 KEYS 里'],
    deep:[
      {title:'两条命令中间有缝',body:'每条 Redis 命令自己是原子的，GET 和 SET 之间别人仍能插进来。EVAL 在服务端把这段连续跑完。键必须放进 KEYS，能用 INCR 或 SET NX 一条命令完成时不必写脚本。'},
      {title:'怎样自己验证',body:'对照 EVAL 写下 KEYS 放键、ARGV 放参数。库存为 1 时并发 GET+SET，预测两笔都成功。改成脚本里判断再 DECR，同样并发应只有一笔返回成功。'},
    ],
    refs:[['Redis：EVAL','https://redis.io/docs/latest/commands/eval/'],['Redis：Lua programming','https://redis.io/docs/latest/develop/programmability/eval-intro/']]
  },
  {
    track:'java', group:'缓存', id:'redis-stream-vs-pubsub',
    title:'要积压和确认用 Stream，Pub/Sub 不记得历史',
    prompt:'用 SUBSCRIBE 发下单事件，消费者重启后为什么丢了那段时间的消息？',
    core:'Pub/Sub 是当时在线的订阅者才收得到，不持久、不确认、没积压。Stream 把条目追加到列表，有 ID，消费者组用 XREADGROUP 领取，XACK 确认。离线期间的消息还在，直到修剪。它仍不是 Kafka 那种多分区日志的全集，但比 Pub/Sub 适合“至少处理一次”。只做瞬时通知（踢人、刷缓存）才用 Pub/Sub。',
    why:'用 SUBSCRIBE 接下单事件，消费者重启的那段时间没有人在线上，消息不会被补发，表现为丢单。区分信号是 Pub/Sub 没有积压和确认，Stream 用 XADD 留下的条目在重启后仍能被消费者组 XREADGROUP 领走。',
    example:'下单执行 XADD orders * user 1 amount 9 后消费者进程退出。重启后用消费者组 cg1 执行 XREADGROUP，仍能领到这条，处理完 XACK。同一时段用 PUBLISH 发出的踢人通知，离线的订阅者收不到，也没有 ID 可补。',
    task:'列出 Pub/Sub 和 Stream 在持久化、确认、积压上的差别。给下单和“踢下线”各选一种。',
    answer:'Pub/Sub 不持久、不确认、没有积压，只投递给当时在线的订阅者。Stream 把条目留下，有 ID，消费者组领取后再 XACK，离线期间的消息还在。下单选 Stream。踢下线这种瞬时通知选 Pub/Sub。重启后的订阅者补不回离线期间的频道消息。',
    keywords:'Redis Stream Pub/Sub XREADGROUP XACK',
    points:['Pub/Sub 只投递给当时在线的订阅者','Stream 可积压、可确认、有消费者组','业务事件不要默认走 Pub/Sub'],
    deep:[
      {title:'频道不记得刚才那条',body:'SUBSCRIBE 当时不在线，重启后没有历史可补。Stream 的条目留到修剪为止，消费者组用 XACK 表示处理过。只做踢人或刷缓存，才用 Pub/Sub。'},
      {title:'怎样自己验证',body:'先 XADD 一条下单再停掉消费者，重启后 XREADGROUP 应仍能领到并 XACK。同样停掉订阅者期间 PUBLISH 一条踢人消息，重启后的订阅者应拿不到那一条。'},
    ],
    refs:[['Redis：Streams','https://redis.io/docs/latest/develop/data-types/streams/'],['Redis：Pub/Sub','https://redis.io/docs/latest/develop/pubsub/']]
  },
  {
    track:'java', group:'JPA', id:'jpa-entity-graph',
    title:'这一次要加载的关联用实体图声明，不要改成全局 EAGER',
    prompt:'详情页要订单行，列表页不要，为什么不能把 items 改成 EAGER？',
    core:'EAGER 对所有用例生效，列表会变成固定的联接或二次查询。实体图或 @EntityGraph 按这次查询声明要 fetch 的路径，其它关联保持懒加载。它比在每个 JPQL 里写 join fetch 更可复用，但仍是这次查询的形状，不能当任意深度的自动图。动态图适合可选字段。和 N+1、OSIV 那两课一起看：列表用一张浅图，详情用一张深图。',
    why:'为了详情页不报懒加载，把 items 改成 EAGER，列表页每个订单都会再去拉明细。区分信号是同一实体两张图：列表 SQL 只有订单头，详情才带出 items。全局 EAGER 会让列表的 SQL 也带上明细。',
    example:'findAll 不挂实体图，SQL 只查订单头，没有订单行的连接或二次查询。findById 使用 attributePaths 含 items，这条 SQL 才把明细一起取出或按图加载。列表若改成全局 EAGER，每条订单都会多一次明细查询。',
    task:'给同一实体写两张图：列表只要头，详情带头+items。对比两条查询的 SQL。',
    answer:'列表图只要订单头，预测 SQL 不碰 items。详情图带头加 items，预测这条查询才会加载明细。两张图都是这一次的形状。不要把 items 改成 EAGER，否则列表也被带成固定的联接或逐条二次查询。列表和详情的 SQL 必须能各自对上那一张图。',
    keywords:'JPA EntityGraph EAGER fetch 用例',
    points:['EAGER 影响所有查询，不适合只在详情需要的关联','实体图声明这一次要 fetch 的路径','列表和详情用不同的图，而不是改映射默认值'],
    deep:[
      {title:'图只描述这一次',body:'EAGER 写在映射上，所有查询都受影响。实体图或 attributePaths 只让当前这次把指定路径 fetch 出来，其它关联保持懒加载。列表用浅图，详情用深图。'},
      {title:'怎样自己验证',body:'给同一实体写列表图和详情图。打开 SQL：列表应只有订单头，详情应出现 items。再把映射改成 EAGER 后重跑列表，应看到每个订单都去拉明细。列表结果里不应出现订单行。'},
    ],
    refs:[['Spring Data JPA：EntityGraph','https://docs.spring.io/spring-data/jpa/reference/jpa/entity-graphs.html'],['Jakarta Persistence：EntityGraph','https://jakarta.ee/specifications/persistence/3.1/jakarta-persistence-spec-3.1#entity-graph']]
  },
  {
    track:'java', group:'Nginx', id:'nginx-proxy-host',
    title:'反代要把 Host 指向上游认的名字，默认可能不是你想的',
    prompt:'上游按虚拟主机选站点，为什么经 nginx 之后总落到默认站？',
    core:'proxy_set_header Host 决定上游看到的主机名。不设置时，常见默认是 $proxy_host（upstream 里写的地址）。上游若按 Host 选站点、校验回调 URL 或生成重定向，就会和浏览器地址栏不一致。需要用户看到的域名时，设 Host $host。转发协议用 X-Forwarded-Proto，否则上游以为自己是 http。改 Host 不等于改 TLS 证书校验对象。',
    why:'反代不改 Host，上游看到的是 upstream 地址，按虚拟主机选站时全部落到默认站，登录回调也会跳到内网主机名。区分信号是上游访问日志里的 Host：设成 $host 后是浏览器地址栏的名字，不设时多半是 $proxy_host。',
    example:'浏览器访问 shop.example。未写 proxy_set_header Host 时，上游日志的 Host 是 upstream 里的内网主机，站点落到 default_server。加上 Host $host 和 X-Forwarded-Proto $scheme 后，日志里的 Host 变成 shop.example，重定向也保持 https。',
    task:'对照 proxy_set_header 文档，写出 $host 和 $proxy_host 各是什么。抓上游日志看 Host。',
    answer:'对照 proxy_set_header：$host 是请求里的主机名，$proxy_host 是 upstream 写的地址。不改头时，上游日志预测出现 $proxy_host，虚拟主机进默认站。写成 Host $host 后，日志预测变成浏览器带来的公网名，并应同时传协议。',
    keywords:'Nginx proxy_set_header Host X-Forwarded-Proto 虚拟主机',
    points:['上游看到的 Host 由 proxy_set_header 决定','$host 是浏览器带来的名字，$proxy_host 是 upstream 地址','还要传 X-Forwarded-Proto，否则重定向会错方案'],
    deep:[
      {title:'上游认的是它看见的 Host',body:'虚拟主机、回调地址和重定向都看 Host，不看浏览器地址栏。不设置时常见默认是 upstream 的地址。要公网名就传 $host，再用 X-Forwarded-Proto 避免上游以为自己是 http。'},
      {title:'怎样自己验证',body:'对照文档写下 $host 与 $proxy_host。抓上游访问日志：不设 Host 时应看到 upstream 地址并进默认站；设成 $host 后应看到浏览器里的域名。'},
    ],
    refs:[['nginx：proxy_set_header','https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header'],['nginx：proxy_pass','https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass']]
  },
  {
    track:'java', group:'测试', id:'spring-dirties-context',
    title:'@DirtiesContext 会扔掉整个容器，不要当默认清理手段',
    prompt:'每个测试都标 DirtiesContext，为什么套件比业务代码还慢？',
    core:'Spring 测试会缓存应用上下文。DirtiesContext 宣布这份上下文脏了，下一例要重建，启动成本又来一次。只有测试真的改了单例 bean、改了静态全局或嵌入环境时才需要。数据清理用事务回滚、@Sql 或专用库，不要靠重建容器。类级和和方法级的脏时机不同，看完再标。类上标脏会让后面的用例都不再复用这份上下文，方法上标脏通常波及下一例，两种时机不一样。普通仓库测试动的是行数据，回滚或 @Sql 就能还原。只有容器里的单例、静态全局或嵌入环境被改掉，才值得付一次重建。重建一次的成本接近再启动应用。',
    why:'每个测试方法都标 DirtiesContext，上下文缓存被作废，套件从大约一分钟变成反复启动容器。区分信号是只改表数据的用例用回滚就够，只有改了单例 bean 或静态全局的那一例才需要重建。',
    example:'一套切片测试靠事务回滚，整类复用同一个上下文，耗时短。给每个方法加上 DirtiesContext 后，下一例都重新启动，时间明显变长。去掉这些标记、只在改了 EnvironmentPostProcessor 的那一例上保留，耗时回到原来的量级。',
    task:'给一套切片测试计时。再给每个方法加 DirtiesContext 计时。写出哪一例才真正需要它。',
    answer:'先给切片测试计时，预测整类复用缓存的上下文。再给每个方法加 DirtiesContext，预测下一例都重建，套件明显变慢。真正需要它的是改了单例 bean、静态全局或嵌入环境的那一例；普通仓库测试用事务回滚或 @Sql 清理。改表数据的用例预测不需要重建容器。',
    keywords:'@DirtiesContext Spring Test 上下文缓存',
    points:['测试默认复用缓存的应用上下文','DirtiesContext 会强制下一例重建容器','清数据不要用重建容器代替'],
    deep:[
      {title:'脏的是容器不是表',body:'DirtiesContext 宣布应用上下文不能再复用，下一例要重新启动。表里的行用事务回滚或 @Sql 清掉即可。类级和方法级何时算脏并不相同，标之前先看清影响的是哪一例。'},
      {title:'怎样自己验证',body:'给一套切片测试计时，再给每个方法加上 DirtiesContext 重计时，第二次应明显更慢。去掉标记后，只保留改了单例或静态全局的那一例，其余用例应再次复用上下文。'},
    ],
    refs:[['Spring：@DirtiesContext','https://docs.spring.io/spring-framework/reference/testing/annotations/integration-spring/annotation-dirtiescontext.html'],['Spring：Context caching','https://docs.spring.io/spring-framework/reference/testing/testcontext-framework/ctx-management/caching.html']]
  },
  {
    track:'frontend', group:'工程实践', id:'vite-sourcemap-prod',
    title:'生产 source map 会把源码交给浏览器，默认不要公开挂出去',
    prompt:'为了线上好看堆栈，把 source map 放到 CDN，会泄露什么？',
    core:'source map 把压缩后的行列映回源文件。开发要用。生产若把 .map 和 js 一起公开，等于交出仓库里的业务代码和注释。需要线上排障时，把 map 放到仅内部可访问的位置，或上传给错误监控，不要让匿名用户下载。hidden 生成 map 但不在文件尾写 //# sourceMappingURL。debug 包和对外包分开。',
    why:'为了线上堆栈好看，把 .map 和脚本一起放到 CDN，匿名用户能下到源码、注释和内部域名。区分信号是产物里有没有 sourceMappingURL：hidden 仍生成 .map，但脚本尾部不写出这个地址。',
    example:'build.sourcemap 为 true 时，输出里既有 .map，js 尾部也有 sourceMappingURL，浏览器能拉取源码。false 时两者都没有。hidden 时磁盘上仍有 .map，但 js 里没有 sourceMappingURL，把 map 只上传到错误监控后，CDN 上只有 js 和 css。',
    task:'打开 Vite sourcemap 选项。对比 true、false、hidden 产物里有没有 sourceMappingURL 和 .map 文件。',
    answer:'打开 Vite 的 build.sourcemap。true 预测既有 .map 也有 sourceMappingURL。false 预测两者都没有。hidden 预测仍生成 .map，但脚本里不写 sourceMappingURL。生产不要把 map 公开挂到 CDN，要对齐堆栈就走私有通道。',
    keywords:'Vite sourcemap hidden sourceMappingURL 生产',
    points:['source map 能还原到源码','公开 map 等于公开仓库内容','hidden 生成 map 但不在脚本里声明地址'],
    deep:[
      {title:'map 能把压缩代码映回仓库',body:'source map 里有源文件和行列对应关系，公开下载就等于交出业务代码。开发构建可以公开在本地。生产若需要排障，用 hidden 生成文件，再只交给错误监控，不写进脚本尾部。'},
      {title:'怎样自己验证',body:'分别用 true、false、hidden 构建。true 的脚本尾部应有 sourceMappingURL 且存在 .map；false 两者都没有；hidden 应有 .map 文件，但脚本里没有 sourceMappingURL。'},
    ],
    refs:[['Vite：build.sourcemap','https://vite.dev/config/build-options.html#build-sourcemap'],['MDN：Source map','https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map']]
  },
  {
    track:'frontend', group:'浏览器', id:'html-dialog-modal',
    title:'模态对话框用 dialog.showModal，不要自己用 div 挡滚动',
    prompt:'用绝对定位的 div 做弹层，为什么焦点还能跑到后面的按钮上？',
    core:'dialog 加上 showModal 打开模态层：背景进入惰性，焦点锁在对话框内，Esc 会触发 cancel。关要用 close。自己做的蒙层常常忘了锁焦点、忘了关滚动、忘了恢复焦点。role=dialog 和 aria-modal 仍要写对标签和标题。不是所有旧浏览器行为一致，关键路径要查支持度。它解决焦点和模态语义，不替代路由级的页面切换。',
    why:'用绝对定位的 div 当弹层，Tab 仍能走到背后的删除按钮，读屏也不知道背景已经惰性。区分信号是 showModal 之后焦点循环停在 dialog 里，Esc 关闭；div 蒙层做不到这两点。',
    example:'确认框调用 dialog.showModal() 后连续按 Tab，焦点在框内的按钮之间打转，按 Esc 触发 cancel 并关闭。换成只盖住页面的 div，Tab 会落到背后的删除按钮上，Esc 也没有对话框的关闭行为。确认时用 close 把结果交回去。',
    task:'用 dialog.showModal 做确认框。Tab 循环应停在框内。Esc 关闭。对比 div 蒙层的焦点。',
    answer:'用 dialog.showModal 打开确认框，预测 Tab 只在框内循环，Esc 关闭，背景不再接受焦点。同样操作用 div 蒙层，预测焦点仍能落到背后的按钮。关闭要用 close，不要只靠自己写的遮罩。背后的删除按钮只应在 div 蒙层里被 Tab 到。',
    keywords:'HTML dialog showModal 焦点 惰性 Esc',
    points:['showModal 打开模态并锁焦点','背景变为惰性，Esc 触发 cancel','自定义 div 蒙层很容易漏掉焦点循环'],
    deep:[
      {title:'模态会把背景变成惰性',body:'showModal 把焦点锁在 dialog 里，背后的控件不再参与 Tab。Esc 走 cancel。自己盖一层 div 常常只挡住点击，键盘和读屏仍能操作后面的删除。'},
      {title:'怎样自己验证',body:'用 showModal 打开确认框，连续 Tab，焦点应停在框内；按 Esc 应关闭。换成 div 蒙层再 Tab，焦点应能到达背后的按钮。确认按钮应调用 close 而不是只隐藏 div。'},
    ],
    refs:[['MDN：dialog','https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog'],['HTML Living Standard：dialog','https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element']]
  },
  {
    track:'frontend', group:'CSS 与布局', id:'css-aspect-ratio',
    title:'给图片和视频先写高宽比，减少加载时把页面撑开',
    prompt:'图片没设高度，加载完成后为什么整页往下跳？',
    core:'宽高比让浏览器在图片字节到达前就留出高度。aspect-ratio 或 width/height 属性都能算。布局稳定（CLS）常坏在没有占位的图和广告。只写 width:100% 高度 auto，在真实高度出来前是 0。固定像素高度在不同屏会裁切。ratio 是占位，不是代替压缩和懒加载。标签上的 width 和 height 也能算出同一块占位，和 aspect-ratio 是两条路。广告位同样要先占住，否则标题会在资源到达时被顶出视口。比例稳定之后仍要压缩和懒加载，它不减小文件，只避免高度从 0 撑开。',
    why:'图片只写 width:100% 和 height:auto，字节到达前高度是 0，加载完把标题顶出视口。区分信号是加上 aspect-ratio 或宽高属性后，同一张图加载时标题不再跳动。',
    example:'文章标题下面一张 16:9 的图没有占位，网络变慢时标题先出现，图一到整段下移。给 img 写 width:100% 和 aspect-ratio:16/9 后，灰盒先占住高度，图填进这块区域，标题留在原处。固定像素高度则会在窄屏裁切。',
    task:'对比有无 aspect-ratio 的图片加载。用布局偏移看标题是否跳动。',
    answer:'不写 aspect-ratio、只等图片决定高度时，预测标题在加载完成时向下跳。写上高宽比或 width/height 后，预测浏览器先留出高度，布局偏移里标题不再被顶走。占位不等于已经压缩或做了懒加载。有占位时布局偏移里的标题应停在原处。',
    keywords:'CSS aspect-ratio CLS width height 图片',
    points:['高宽比让未加载的图也占高度','只设宽度时高度在加载前常是 0','占位不代替压缩和懒加载'],
    deep:[
      {title:'高度要在字节到达前就留出',body:'只设宽度时，真实高度出来之前盒子常常是 0。aspect-ratio 或宽高属性让浏览器先按比例占位。固定死像素高度会在不同屏裁切，占位也不能代替压缩。字节未到时盒子也不应为 0。'},
      {title:'怎样自己验证',body:'同一张图先不写 aspect-ratio，放慢加载，标题应向下跳。写上 16/9 或 width/height 后再加载，标题应留在原处。布局偏移里应能看到第一次有位移、第二次没有。'},
    ],
    refs:[['MDN：aspect-ratio','https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio'],['web.dev：Optimize Cumulative Layout Shift','https://web.dev/articles/optimize-cls']]
  },
  {
    track:'java', group:'Java 基础', id:'java-record-accessor',
    title:'record 按分量生成 equals，适合不可变数据，不适合当 JPA 实体',
    prompt:'为什么把实体改成 record 之后，懒加载和脏检查都乱了？',
    core:'record 声明分量后，编译器生成 final 字段、取值方法、按全部分量的 equals/hashCode/toString。它默认不可变，适合作为 API 返回、Map 键、模式匹配的数据载体。JPA 实体需要可变字段、无参构造、代理子类，和 record 的约束冲突。不要把 record 当“更短的 Lombok 实体”。分量名称就是取值方法名，没有 JavaBean 的 get 前缀也可以，但和部分框架的属性解析要核对。',
    why:'把订单实体改成 record 图省事，Hibernate 要无参构造和可写字段，代理也做不出来，懒加载和脏检查对不上。区分信号是两个 Money(100,"CNY") 按分量相等，而订单实体仍必须是可被代理的 class。',
    example:'public record Money(long cents, String currency) {}。new Money(100,"CNY") 与另一个同分量实例 equals 为 true，取值方法就是 cents() 而不是 getCents()。把 OrderEntity 改成 record 后，会话无法按可写字段做脏检查，也不能生成所需的代理子类。',
    task:'写一个 record 看生成的 equals。再列出 JPA 实体需要、record 默认没有的三项能力。',
    answer:'写一个 record，预测 equals 和 hashCode 按全部分量比较，同分量的两个实例相等。JPA 实体还需要、record 默认没有的三项是无参构造、可变字段、可被继承的代理子类。值对象用 record，要脏检查的实体用 class。',
    keywords:'Java record equals 不可变 JPA 实体',
    points:['record 按所有分量生成 equals 和取值方法','默认不可变，适合值对象和响应体','JPA 实体需要可变与代理，不要用 record 充当'],
    deep:[
      {title:'分量相等不是持久化身份',body:'record 的字段是 final，取值方法没有 JavaBean 的 get 前缀。实体要无参构造、可写字段和代理子类，这三样 record 默认都没有。API 返回和 Map 键适合用它。'},
      {title:'怎样自己验证',body:'写一个两分量的 record，构造两个同值实例，equals 应为 true。再列出实体所需的无参构造、可变字段和代理子类，确认 record 默认都没有，订单实体应仍是 class。'},
    ],
    refs:[['Java：Record','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Record.html'],['JEP 395：Records','https://openjdk.org/jeps/395']]
  },
  {
    track:'java', group:'工程实践', id:'log-correlation-id',
    title:'每条日志带上同一条请求的相关 id，排障才对得上',
    prompt:'三台机器各打了一堆 ERROR，怎样确认它们是同一次下单？',
    core:'相关 id（trace id / correlation id）在入口生成或从上游头里取出，放进 MDC，日志格式带上这个字段，再传到下游的 HTTP 头。同一请求的网关、服务、SQL 日志才能搜到一起。没有它就只能靠时间戳近似对齐。id 不要用用户手机号。采样和级别仍按环境配，相关 id 不是把 DEBUG 全打开。和 OpenTelemetry 链路是一家：日志字段应对齐 trace id。',
    why:'只按下午两点去对三台机器的 ERROR，会把别人的失败拼进这次下单。区分信号是网关、服务和下游日志里同一个 requestId 能一次搜出这三行，时间接近但 id 不同的行不属于这次。',
    example:'网关生成 X-Request-Id 为 8f3a，写入访问日志，并传给订单服务。订单服务放进 MDC，自己的 ERROR 和发给支付的下游日志都带 8f3a。搜索 8f3a 得到这三行；同一分钟里 requestId 为 11b0 的错误是另一次请求。',
    task:'给一次请求从网关到服务打三行日志。确认能用同一个 id 查出这三行。',
    answer:'从网关到服务打三行日志，预测三行带同一个在入口生成或透传的 id，用这个值能同时搜到。没有这列时只能按时间戳凑，会混进别的请求。id 用随机或追踪标识，不要用手机号，也不必为此把 DEBUG 全打开。时间接近但 requestId 不同的错误不应算进这次下单。',
    keywords:'MDC correlation id trace id 日志',
    points:['相关 id 让一次请求的日志能搜到一起','从入口放入 MDC 并传给下游','id 不要用个人身份信息'],
    deep:[
      {title:'一次请求一条可搜的线',body:'相关 id 在入口生成或从上游头取出，放进 MDC，日志格式带上，再放进下游 HTTP 头。三台机器用这个值对齐。它不代替采样和日志级别。三行日志要用同一个值才能算对上。'},
      {title:'怎样自己验证',body:'发起一次下单，在网关、订单服务和下游各打一行。用同一个 requestId 搜索，应正好得到这三行。换一个时间接近但 id 不同的错误，不应出现在这次结果里。别的请求即使同一分钟也不应混进来。'},
    ],
    refs:[['SLF4J：MDC','https://www.slf4j.org/manual.html#mdc'],['OpenTelemetry：Logs','https://opentelemetry.io/docs/concepts/signals/logs/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_OPS_17) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
