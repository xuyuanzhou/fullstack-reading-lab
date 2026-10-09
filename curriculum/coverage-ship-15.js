/* Gateway, Netty, shipping, clocks/IDs, Java time, HTTP/2, browser cache. */
const COVERAGE_SHIP_15 = [
  {
    track:'java', group:'网关', id:'gateway-auth-where',
    title:'网关证明“是谁”，对象级“能不能改这行”仍在服务里',
    prompt:'网关已经校验了 JWT，订单服务是不是可以不再检查用户？',
    core:'网关适合做全站统一的身份：令牌是否有效、有没有登录、是不是这个租户的入口。它看不到订单行属不属于这个用户，也不该为了做对象级授权去查每张业务表。顺序是先在网关证明是谁，再把主体传到服务，由服务核对这行订单的所有者。边界是网关 401 表示没证明身份，服务 403 表示这个身份不许动这份资源。把鉴权只做在网关，内部调用被绕过时就会没有第二道。服务不能只信任“请求是从网关进来的”。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。',
    why:'只在网关验一次令牌，内部调用和对象级权限会漏，别人的订单号也能被改。区分信号是网关看令牌，服务看这行数据属不属于这个用户。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'网关拒绝没有令牌的请求。GET /orders/99 即使令牌有效，订单服务仍要确认 99 属于当前用户，不能只因为网关放行就返回。网关 401 是没证明身份，服务 403 是这个身份不许动这行。把输入、输出和失败时留下的那一行同时记下来，不要只看最后没有报错。',
    task:'画出登录请求经过网关和服务的两道检查。标出哪一道看令牌，哪一道看行数据。',
    answer:'第一道在网关：看令牌是否有效、是谁。第二道在订单服务：看这行订单的所有者是不是这个主体。预测只做网关时，内部路径或别人的订单号会通过。对象级授权留在拥有数据的服务，内部调用也要带上主体。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'API Gateway JWT 认证 对象级授权',
    points:['网关适合校验令牌和统一入口','改某一行仍要在拥有数据的服务里核对','内部调用被绕过时，只靠网关等于没有授权'],
    deep:[
      {title:'401 和 403 不是一层',body:'401 表示没证明你是谁，出在入口。403 表示这个身份不许动这份资源，出在拥有订单行的服务。把第二道也放进网关，网关就得去查每张业务表。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'画出请求经过网关和服务的两道检查。拿别人的订单号、带自己的合法令牌去访问，网关应放行，服务应拒绝。去掉令牌时，应在网关就被拒绝。'},
    ],
    refs:[['Spring Cloud Gateway：Security','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway/security.html'],['Spring Security：Authorization','https://docs.spring.io/spring-security/reference/servlet/authorization/index.html']]
  },
  {
    track:'java', group:'网关', id:'gateway-body-buffer',
    title:'改请求体先要读进内存，大上传不要当 JSON 过滤器',
    prompt:'网关里改一下 JSON 再转发，为什么大文件上传会内存暴涨或失败？',
    core:'要改 body，网关必须先把流读完、改完、再发给上游。改写请求体一类过滤器会缓冲。顺序是读完、修改、重新发出。小 JSON 可以。边界是几 GB 的上传和 multipart 会把内存或磁盘打满，也会超过缓冲上限。上传应走不改 body 的路由，或直传对象存储。读 body 还会让流只能消费一次，后面的过滤器再读会是空的。不要把这个过滤器挂到全部路径上。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。',
    why:'把改字段的过滤器套到所有路径，上传会先被网关读进内存或临时文件，大文件因此失败或把内存打满。区分信号是改 body 的过滤器只挂在小 JSON 上，上传路径不挂。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'登录 JSON 可以在网关补一个跟踪字段，因为体很小，读完再转发。/files 上传不要挂改写请求体的过滤器，让流直接到存储服务。同一个过滤器若匹配到上传，文件会先被缓冲，超过上限就失败。把输入、输出和失败时留下的那一行同时记下来，不要只看最后没有报错。',
    task:'对照 ModifyRequestBody 文档，列出它适用的内容类型，并写出上传路径为什么要排除。',
    answer:'对照改写请求体的文档，它适用小的 JSON 一类内容，因为必须先读完、改完、再发给上游。上传路径预测要排除，否则文件先进网关内存。大上传不要进改写过滤器，流只能消费一次，后面再读会是空的。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'Spring Cloud Gateway ModifyRequestBody 缓冲 上传',
    points:['改请求体必须先读完整段流','缓冲不适合大文件和 multipart','读取一次之后，后面不能再当原始流去读'],
    deep:[
      {title:'读完才能改',body:'要改 body，网关必须先把流读完。小 JSON 可以。几 GB 的上传和 multipart 会打满缓冲。上传应走不改 body 的路由，或直接传到对象存储。'},
      {title:'怎样自己验证',body:'对照改写请求体的文档，列出它适用的内容类型。把上传路径排除后传一个大文件，应不再在网关里被整段缓冲。小 JSON 仍能补上跟踪字段。'},
    ],
    refs:[['Spring Cloud Gateway：ModifyRequestBody','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway/gatewayfilter-factories/modify-request-body-factory.html'],['Spring Cloud Gateway：GatewayFilter','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway/gatewayfilter-factories.html']]
  },
  {
    track:'java', group:'网关', id:'gateway-websocket-upgrade',
    title:'WebSocket 是升级后的长连接，超时和负载不能抄 HTTP',
    prompt:'给接口设了 3 秒超时，聊天长连接为什么总被网关掐掉？',
    core:'WebSocket 先用 HTTP 升级，成功后变成这条连接上的双向帧，不再是一次请求响应。顺序是握手、升级、然后按帧收发。网关要单独配置升级、空闲和代理超时。边界是把短 HTTP 超时套上去，空闲几秒就会断开。负载均衡还要考虑连接粘在哪一台，重试不能按幂等 GET 那样自动再发一遍握手。心跳应由协议帧或空闲检测处理。聊天和短 JSON 不要共用同一档超时。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。',
    why:'用接口的 3 秒超时去管聊天长连接，空闲一会儿就会被网关掐掉，表现为随机掉线。区分信号是升级成功之后要单独的空闲超时，而且要大于心跳间隔。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'通知走 /ws，网关打开 WebSocket 代理，空闲超时大于心跳间隔，连接可以留着。下单的 JSON 仍用短超时。把短 HTTP 超时套到 /ws 上，几秒没有数据帧就会断开。握手之后的帧不再是一次请求响应。',
    task:'对照网关的 WebSocket 说明，把 HTTP 超时和 WebSocket 空闲超时写成两行配置意图。',
    answer:'HTTP 那一行是短超时，只管普通请求。WebSocket 这一行是升级之后的空闲和代理超时，预测必须大于心跳，否则长连接被掐。负载还要考虑连接粘在哪一台，重试不能按幂等的 GET 自动再握一次手。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'WebSocket Gateway Upgrade 空闲超时',
    points:['WebSocket 先升级，再在同一连接上发帧','短 HTTP 超时会掐掉空闲的长连接','长连接的重试和选路不能当幂等 GET'],
    deep:[
      {title:'升级之后不再是短请求',body:'先用 HTTP 升级，成功后变成这条连接上的双向帧。短超时套上去，空闲几秒就断开。心跳用协议帧或空闲检测，不要用接口超时代替。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'对照网关的 WebSocket 说明，把 HTTP 超时和 WebSocket 空闲超时写成两行。让连接空闲超过短超时但小于空闲超时，短超时那套应不再把它掐掉。'},
    ],
    refs:[['Spring Cloud Gateway：WebSocket','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway/websocket.html'],['MDN：Writing WebSocket servers','https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers']]
  },
  {
    track:'java', group:'Netty', id:'netty-watermark-backpressure',
    title:'写不出去时要停手，水位就是连接的背压',
    prompt:'往慢客户端狂 write，为什么内存涨而 EventLoop 看起来还在跑？',
    core:'write 把数据放进待发送缓冲，不等于对端已经收完。缓冲超过高水位，Channel 变为不可写，应停止继续写，等 writabilityChanged 再恢复。不管水位一直 write，堆外或堆内缓冲会涨，连接被慢客户端拖死。低水位用于恢复。这是这条连接的背压，不是线程池队列。读侧要用 autoRead 或手动读来配对。',
    why:'把 write 当成已经发出去，慢客户端会让待写数据堆在内存里，EventLoop 看起来还在跑。区分信号是 isWritable 变成 false 时你有没有停手。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'下发日志流时先看 isWritable。不可写就暂停从数据库继续读。水位降下来、再次可写，再继续。不检查时，慢客户端仍在连着，堆里的待写缓冲会一直涨，直到内存告警。把输入、输出和失败时留下的那一行同时记下来，不要只看最后没有报错。',
    task:'给一条故意很慢的客户端写数据。观察 isWritable 何时变 false，以及不检查时内存如何涨。',
    answer:'故意很慢的客户端一直写，预测高水位之后 isWritable 为 false。这时若继续 write，内存上涨。停下读上游并等可写事件，预测缓冲回落。write 只是进了缓冲，不是发送完成。不要无界堆积。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'Netty WRITE_BUFFER_WATER_MARK isWritable 背压',
    points:['write 进入待发送缓冲，不是对端已收到','超过高水位后 Channel 不可写，应停写','可写状态变化时再恢复，避免无界缓冲'],
    deep:[
      {title:'可写是水位不是成功',body:'不可写表示待写字节超过高水位。继续写只会再堆。降到低水位才会再通知可写。业务要在不可写时停止生产，而不是把 write 的返回当成对方已经收到。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'给一条故意很慢的客户端连续写。观察 isWritable 何时变 false，以及不检查时内存如何涨。加上暂停之后，内存应停在水位附近，而不是一直向上。'},
    ],
    refs:[['Netty：WriteBufferWaterMark','https://netty.io/4.1/api/io/netty/channel/WriteBufferWaterMark.html'],['Netty：Channel.isWritable','https://netty.io/4.1/api/io/netty/channel/Channel.html#isWritable()']]
  },
  {
    track:'java', group:'Netty', id:'netty-length-field-frame',
    title:'TCP 是字节流，拆包要靠长度或分隔，不能靠睡一会儿',
    prompt:'一次 read 拿到半个 JSON，为什么“再等 10 毫秒”不是解法？',
    core:'TCP 不保证一次 read 对应一条业务消息。可能粘在一起，也可能拆开。顺序是先按长度、分隔符或协议帧把字节拼成消息，再交给业务解码。长度字段解码器先读长度，再读那么多字节，不够就等下一次 read。边界是睡一会儿、或假设这次一定是整包，在负载变化时必然拆错，而且错一帧会让后面全部错位。半包要留在这条连接自己的解码器里。拆完再交给业务，业务不要自己再等 10 毫秒。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。',
    why:'用睡一会儿等待“整包到齐”，负载一变就会把半个 JSON 交给业务，后面的解码全部错位。区分信号是有长度解码时，业务只看见完整的一帧。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'每条消息前 4 字节是大端长度。服务端故意分两次 write 半包。没有帧解码时，业务第一次看到的是半个 JSON。加上长度解码后，两次 write 会被拼成一帧，业务只收到完整 JSON，不再依赖中间那 10 毫秒。',
    task:'写服务端故意分两次 write 半包。没有帧解码时业务看到什么，加上长度解码后呢。',
    answer:'没有帧解码时，分两次 write 预测业务看到半包或粘在一起的两段，因为 TCP 是字节流。加上长度解码后，预测业务只看见按长度切好的完整消息。不要用睡眠模拟整包到齐。拆完再交给后面的解码。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'Netty 粘包 拆包 LengthFieldBasedFrameDecoder TCP',
    points:['一次 read 不等于一条消息','用长度字段或分隔符拆帧','睡眠不能代替协议边界'],
    deep:[
      {title:'半包和粘包是同一件事',body:'一次 read 可能少于一条消息，也可能多于一条。长度或分隔符才能切出边界。睡一会儿只是碰运气，下一次仍可能切在半个 JSON 上，而且会污染后面所有帧。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'写服务端分两次 write 半包。没有帧解码时看业务收到的是不是半个 JSON。加上长度字段解码后再写同样两次，业务应只看到一条完整消息。'},
    ],
    refs:[['Netty：LengthFieldBasedFrameDecoder','https://netty.io/4.1/api/io/netty/handler/codec/LengthFieldBasedFrameDecoder.html'],['Netty User Guide','https://netty.io/wiki/user-guide-for-4.x.html']]
  },
  {
    track:'java', group:'Netty', id:'netty-file-region',
    title:'发文件尽量走零拷贝，不要整文件读进堆再 write',
    prompt:'下载 1GB 文件为什么不能先 Files.readAllBytes 再写到 Channel？',
    core:'把整个文件读进 byte[] 或堆上的 ByteBuf，会占堆、多一次拷贝，大文件还会直接撑爆内存。DefaultFileRegion / FileRegion 可以把文件区间交给操作系统发送，常见路径是 sendfile，少一次用户态拷贝。范围下载只传 offset 和 count。加密或要改内容的响应仍然要经过用户态缓冲，不能假装零拷贝。',
    why:'下载按先把整个文件读进堆再 write 来写，并发几个大文件就会把堆打满。区分信号是能用 FileRegion 时堆里没有那 1GB，要改内容时才走用户态缓冲。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'静态包从偏移 0 发到文件长度，用 FileRegion 指向文件、位置和长度，不调用把全部字节读进内存的那种读法。若要在发出前改文件内容，才读进 ByteBuf。并发下载时，堆应稳在缓冲大小，而不是随文件大小上涨。',
    task:'对照 DefaultFileRegion，写出它需要的文件、位置和长度。说明什么时候仍必须经过 ByteBuf。',
    answer:'FileRegion 需要文件、起始位置和长度，预测数据可以不经过把整文件放进堆。先读全部字节再写，预测堆随文件变大，并发几个 1GB 会失败。只有要修改内容时才走用户态缓冲。能直接送文件就不要整文件进堆。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'Netty DefaultFileRegion sendfile 零拷贝',
    points:['不要把整个文件读进堆再发送','FileRegion 按区间把文件交给系统发送','需要改字节内容时才走用户态缓冲'],
    deep:[
      {title:'零拷贝的边界',body:'文件区域描述的是内核可以送出的那一段。要加密、要改字节、要插进别的内容，就得走用户态缓冲。不要为了省事对所有下载都先读进堆。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'对照 DefaultFileRegion，写出文件、位置和长度。下载时看堆是否随文件大小上涨。再做一次必须改内容的发送，确认这时才使用 ByteBuf。'},
    ],
    refs:[['Netty：DefaultFileRegion','https://netty.io/4.1/api/io/netty/channel/DefaultFileRegion.html'],['Netty：FileRegion','https://netty.io/4.1/api/io/netty/channel/FileRegion.html']]
  },
  {
    track:'frontend', group:'工程实践', id:'vite-env-client-prefix',
    title:'VITE_ 变量会打进前端包，密钥不能叫这个前缀',
    prompt:'把数据库密码写进 .env 再 import.meta.env.VITE_DB_PASSWORD，为什么等于公开？',
    core:'Vite 只把以 VITE_ 开头的变量替换进客户端代码，构建时变成字面量，任何人打开包都能看见。顺序是读环境文件、替换进源码、打进静态产物。没有此外前缀的变量不会进前端，那是给 Node 构建脚本用的。边界是运行时机密应放在服务端环境，由接口转发，不要起这个前缀。改 .env 之后要重新构建，不是刷新页面就变。模式文件也会被打进对应的包。密钥一旦进了产物，就当作已经公开。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。',
    why:'把数据库密码写成带 VITE_ 前缀的变量，构建时会变成前端包里的字面量，任何人打开静态资源都能看见。区分信号是产物里能搜到带前缀的值，搜不到不带前缀的值。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'VITE_API_BASE 写成公开的接口地址，可以出现在包里。数据库密码只放服务端环境，名字绝不带这个前缀。构建后在产物里搜索，带前缀的地址能找到，密码不应出现。改 .env 之后要重新构建，刷新页面不会换值。',
    task:'在 .env 里放一个 VITE_ 和一个不带前缀的变量，构建后在产物里搜索两者。',
    answer:'带 VITE_ 的变量预测能在构建产物里搜到，它会进浏览器。不带前缀的预测搜不到，那是给构建脚本用的。密钥不要这个前缀。改环境文件后要重新构建，不是刷新就能换。模式文件也会按同样规则打进对应的包。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'Vite import.meta.env VITE_ 环境变量 密钥',
    points:['只有 VITE_ 前缀会进入客户端包','构建时替换成字面量，包里能搜到','运行时机密放服务端，前端只拿公开基址'],
    deep:[
      {title:'前缀就是公开开关',body:'只有约定前缀会被替换进客户端代码。没有前缀的变量不会进前端。运行时机密放在服务端，由接口转发。不要指望文件名是 .env 就不会被打进包。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'在环境文件里放一个带前缀和一个不带前缀的值，构建后在产物里搜索。带前缀的应出现，不带的不应出现。再只刷新页面、不重新构建，确认值不会变。'},
    ],
    refs:[['Vite：Env Variables','https://vite.dev/guide/env-and-mode.html'],['Vite：envPrefix','https://vite.dev/config/shared-options.html#envprefix']]
  },
  {
    track:'frontend', group:'工程实践', id:'ci-gate-not-only-build',
    title:'CI 要拦住类型和测试，而不是只证明能打包',
    prompt:'为什么“构建成功”不能当合并条件？',
    core:'打包成功只说明打包器能产出文件。类型错误、单测失败、关键路径挂了，仍可能打出一份能部署的包。顺序是合并前先跑类型检查，再跑单元测试，再跑一条最短的浏览器路径，失败就挡住合并。边界是把检查只放在本地，下一台机器和 CI 环境会对不上。构建缓存不能跳过测试任务本身。能 build 不是这三道里的任何一道。用户打开页面才发现的错误，说明门放错了地方。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。再核对一次现象。',
    why:'只看构建变绿就合并，类型错误和失败的测试仍能打出一份可部署的包，问题要等用户打开页面才出现。区分信号是类型检查或测试失败时，合并被挡住，而不是只看打包成功。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'合并前跑三道：类型检查、单元测试、一条浏览器登录路径。打包成功但类型失败时，流水线仍是红的，不能合并。把检查只放在本地，下一台机器和 CI 会对不上。构建缓存也不能跳过测试任务本身。把输入、输出和失败时留下的那一行同时记下来，不要只看最后没有报错。',
    task:'列出当前仓库合并前应跑的三道门，并标明哪一道不能用“能 build”代替。',
    answer:'三道门是类型检查、单元测试、一条真实浏览器路径。预测“能 build”代替不了其中任何一道，尤其代替不了类型和那条真实路径。失败就挡住合并。打包成功只说明打包器产出了文件，不说明这三道通过。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'CI GitHub Actions typecheck Playwright 合并门',
    points:['构建成功不证明类型和测试通过','合并前要跑类型检查和测试','至少守住一条用户能走完的路径'],
    deep:[
      {title:'绿的打包不是绿的行为',body:'打包器能产出文件，类型错误和测试失败仍可能留在那份包里。CI 要在合并前跑类型、单元测试和一条最短路径。失败挡住合并，而不是只在本地提醒。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'列出仓库合并前的三道门，标明哪一道不能用能打包代替。故意留一个类型错误，确认构建即使还能产出文件，合并仍被这一道挡住。'},
    ],
    refs:[['GitHub Actions：持续集成','https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/about-continuous-integration'],['Playwright：CI','https://playwright.dev/docs/ci']]
  },
  {
    track:'java', group:'工程实践', id:'k8s-memory-limit',
    title:'容器内存上限到了会被杀，JVM 要按限制来，不要只看机器内存',
    prompt:'Pod 写着 512Mi，JVM 却按 8G 机器去占堆，最后会怎样？',
    core:'Kubernetes 的 limits 是容器用超就杀。JVM 若按宿主机或默认堆去分配，会在容器里先碰到 cgroup 上限，变成 OOMKilled，而不是一次友好的 Java OOM。requests 影响调度，limits 影响杀不杀。应让堆跟容器内存走，例如按比例设置最大堆，并给元空间和直接内存留余量。没设 limit 时，节点内存被吃光会波及别的 Pod。',
    why:'Pod 限制 512Mi，JVM 却按整台机器去占堆，内核会先杀掉进程，日志里只有 Killed，没有 Java 堆栈。区分信号是限制到了由内核杀，堆必须按容器限制来设并给非堆留空。',
    example:'limits.memory 设为 512Mi。启动用按容器限制计算的最大堆，而不是按 8G 机器写一个更大的堆。request 只影响调度，不阻止进程用到超过限制的内存。超过 limit 时进程被杀，堆栈来不及打出来。',
    task:'对照资源文档区分 request 与 limit。写出 JVM 堆为什么必须小于 limit。',
    answer:'request 是调度时预留，limit 是运行时上限。预测堆如果按机器内存设置、大于 limit，内核会杀掉进程。JVM 最大堆必须小于这份限制，并给元空间、线程栈和直接内存留空。不要只看节点有多少内存。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'Kubernetes memory limit OOMKilled MaxRAMPercentage',
    points:['超过 memory limit 会被内核杀掉','JVM 堆必须按容器限制估算','request 管调度，limit 管能不能继续活'],
    deep:[
      {title:'request 不会杀死进程',body:'request 让调度器找得下的节点。limit 到了，内核才杀。只写 request、不写 limit，进程仍可能吃掉节点。堆只是容器内存的一部分，非堆还要占。'},
      {title:'怎样自己验证',body:'对照资源文档分开写 request 和 limit。把最大堆设成大于 limit 的数，看进程是否被杀且没有普通的堆溢出栈。再把堆降到限制之内并留出非堆，确认能稳住。'},
    ],
    refs:[['Kubernetes：Resource Management','https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/'],['Kubernetes：OOM','https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/']]
  },
  {
    track:'java', group:'工程实践', id:'secrets-not-in-image',
    title:'密钥在运行时注入，不要烤进镜像和仓库',
    prompt:'把数据库密码写在 Dockerfile ENV 或 application.yml 再提交，会怎样？',
    core:'镜像层、Git 历史、构建日志都能留下明文。密钥应在部署时注入：编排的 Secret 挂卷或运行时环境，由平台发到进程。顺序是镜像里只有程序和非机密配置，密钥在启动时才出现。边界是轮换密钥不应要求重打业务镜像。误提交后要当作已泄露：改密钥、清历史，而不是再提交一次删除行。环境变量和挂载文件都算运行时，写进 Dockerfile 的 ENV 不算。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。再核对一次现象。',
    why:'把密码写进 Dockerfile 或提交到仓库，旧的镜像层和 Git 历史会一直带着明文，删掉那一行也还在。区分信号是镜像里没有密码，进程从运行时注入的文件或环境里读。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'镜像构建日志和层里都没有数据库密码。Pod 用 Secret 挂成文件或环境变量，进程启动时读取。轮换密码只改这份 Secret，不重新打业务镜像。若密码曾经进过提交，要当作已经泄露去轮换，而不是再提交一次删除。',
    task:'检查 Dockerfile 和仓库里有没有密码、令牌。写出应改成运行时注入的位置。',
    answer:'检查 Dockerfile 和仓库，预测不应有密码和令牌。应改成运行时由平台注入：编排的 Secret 挂卷或环境变量。镜像只含程序和非机密默认配置。泄露过的密钥要轮换，并清历史，不能只删当前文件里的一行。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'Kubernetes Secret 镜像 环境变量 密钥轮换',
    points:['镜像层和 Git 都会留下明文','密钥在部署时注入，不烤进镜像','泄露后要轮换，删掉提交不够'],
    deep:[
      {title:'删行清不掉历史',body:'镜像层、Git 历史和构建日志都能留下明文。再提交一次把密码删掉，旧提交里仍有。要当作已经泄露：换一把密钥，并清理历史，而不是只改工作区。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'在 Dockerfile 和仓库里搜密码、令牌。改成运行时注入后，镜像里应搜不到。轮换时只改 Secret，确认不用重打业务镜像，进程重启后读到新值。'},
    ],
    refs:[['Kubernetes：Secrets','https://kubernetes.io/docs/concepts/configuration/secret/'],['12-factor：Config','https://12factor.net/config']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-clock-skew',
    title:'机器时间会偏，不要用墙上时钟当全局顺序',
    prompt:'两台机器都用 System.currentTimeMillis 比先后，为什么会把旧事件当成新的？',
    core:'每台机器的时钟会快会慢，NTP 回拨会让时间突然倒退。用墙上时钟比较谁后写会弄反。顺序要用因果线索：版本号、逻辑时钟，或存储自己的递增，而不是两台机器各自的毫秒。边界是租约超时若完全相信本地时间，锁可能提前或延后释放。展示给用户的时间用绝对时刻存下来再格式化，但不要拿它当分布式互斥的依据。三件事要分开：给人看的时间、谁后写、锁什么时候失效。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。再核对一次现象。',
    why:'两台机器用本地毫秒比谁后写，时钟回拨会把旧事件当成新的，更新被盖掉。区分信号是顺序用版本或逻辑时钟，墙上时间只用于展示。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来，钟面只负责展示。',
    example:'两地写同一份配置。比较版本号，不比较各自的本地毫秒。显示时再格式化成当地时区。若用墙上时钟覆盖，快的那台会把慢的那台刚写的新值盖成旧值。锁的租约也不能只信本机倒计时。把输入、输出和失败时留下的那一行同时记下来，不要只看最后没有报错。',
    task:'写出三件不能只靠本机毫秒时间的事：锁租约、谁后写、跨机去重。各给一个替代。',
    answer:'锁租约不能只靠本机毫秒，要用存储或租约服务自己的超时。谁后写不能靠两台机器的 currentTimeMillis，用版本号。跨机去重不能靠时间戳相等，用业务键。墙上时钟会偏、会回拨，展示时间用绝对时刻再格式化，不拿它当互斥依据。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'时钟回拨 NTP 逻辑时钟 版本号 租约',
    points:['本机毫秒时间不能当全局先后','租约和后写覆盖会被回拨打乱','跨节点用版本或逻辑顺序，展示再用 UTC'],
    deep:[
      {title:'快慢和回拨都会反序',body:'一台钟快，它的“现在”比另一台的新事件还大。NTP 把钟拨回去时，后发生的事会得到更小的时间戳。所以先后不能从毫秒大小读出来。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'写出三件不能只靠本机毫秒的事：锁租约、谁后写、跨机去重，各给一个替代。把一台机器的时间拨回，看按时间戳覆盖是否会丢掉较新的写入。'},
    ],
    refs:[['Java：Clock','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Clock.html'],['Java：Instant','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Instant.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-unique-id',
    title:'多库多机不要用一张表的自增当全局主键',
    prompt:'订单表在每个分片里都从 1 自增，合并报表时为什么会撞号？',
    core:'数据库自增只在这一个库、这一张表里唯一。分库、合表、多活之后会重复。UUID 随机值碰撞概率极低，但无序写入会让 B+ 树页分裂更碎。按时间排序的 UUID（RFC 9562 的 v7）更适合做主键趋势。雪花类算法要处理时钟回拨和机器号分配，不能只抄 64 位位图。先问 ID 要不要趋势有序、要不要能从号反推时间，再选。',
    why:'每个分片都从 1 自增，合并报表时会撞号，双写还会静默盖掉另一笔订单。区分信号是标识在全局唯一，自增只在单库里唯一。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来，合并时会丢行。',
    example:'两个分片都插入 id 为 100。报表按 id 去重会丢掉一单。改成全局唯一并且大致有序的标识后，两行能同时留下。完全随机的值不好做按时间的范围扫描，依赖时钟的算法则要处理回拨。把输入、输出和失败时留下的那一行同时记下来，不要只看最后没有报错。',
    task:'列出分库后自增会失败的两个场景，再给 UUID v7 和雪花各写一条适用条件。',
    answer:'分库后自增会失败的两个场景：合并时撞号，双写时互相覆盖。UUID 第 7 版适合要全局唯一、又大致按时间有序的标识。雪花一类适合能接受时钟和机器号约定的高并发发号。自增只保证单库里不重复，不能当全局主键。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'分布式 ID UUID v7 雪花 自增主键',
    points:['表自增不是跨库全局唯一','随机 UUID 唯一但写入更碎','时间有序 ID 还要处理时钟和机器号'],
    deep:[
      {title:'有序和唯一要分开要',body:'全局唯一不等于好分页。完全随机的标识散落在索引里。大致有序的标识方便按时间扫，但要处理时钟回拨，不能假装它和单库自增一样简单。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'列出分库后自增会撞车的两个场景。再给大致有序的全局标识和依赖时钟的发号各写一条适用条件。用两个库插入相同自增号，看报表去重是否丢行。'},
    ],
    refs:[['RFC 9562：UUID','https://www.rfc-editor.org/rfc/rfc9562.html'],['MySQL：AUTO_INCREMENT','https://dev.mysql.com/doc/refman/8.4/en/example-auto-increment.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'distributed-bulkhead',
    title:'下游隔离要分开池子，一个慢调用不该占光全部线程',
    prompt:'库存接口变慢，为什么登录也开始超时？',
    core:'隔离舱把不同依赖的并发隔开：各自的线程池、连接池或舱位。顺序是请求进入自己那一格，格子满了就失败，不占用别的格子。库存占满自己那一格，登录仍有自己的格子。边界是共用一个入口线程池或一个连接池时，最慢的下游会把所有请求堵住。舱位满了应快速失败，而不是无限排队。这和限流不同：限流限制速率，隔离限制能被这个依赖占住的资源。不要只加超时而不拆池。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。再核对一次现象。',
    why:'所有出站共用一套线程，库存一慢，登录也开始超时，一次下游事故变成整站超时。区分信号是最慢的下游有自己的池和上限，舱满了快速失败。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'调用库存用单独的 20 个线程，超时就失败，不再占登录的连接。登录走另一组。库存全部堵住时，登录仍能完成。若共用一个池，库存的慢调用会把入口线程占光，登录排不进去。把输入、输出和失败时留下的那一行同时记下来，不要只看最后没有报错。',
    task:'画出当前进程里有哪些共享池。给最慢的一个下游单独设池和上限。',
    answer:'画出进程里的共享池。预测最慢的下游要单独的线程或连接上限。舱满时快速失败，而不是无限排队。登录不应再超时。这和限流不同：限流限制速率，隔离限制能被这个依赖占住的资源。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。库存被拖慢时，登录走自己的池仍应返回。',
    keywords:'bulkhead 隔离舱 线程池 快速失败',
    points:['不同下游使用分开的并发配额','舱满应失败，而不是无限排队','隔离限制占用，限流限制速率，两者不同'],
    deep:[
      {title:'满了就失败，不要再排队',body:'隔离舱把不同依赖的并发隔开。库存占满自己那一格，登录仍有格子。共用一个池时，最慢的下游把所有请求堵住。舱位满了应马上失败，把线程还给别人。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'画出当前进程里有哪些共享池。给最慢的下游单独设池和上限。把这个下游拖慢，看登录是否仍能返回，而不是一起超时。'},
    ],
    refs:[['Resilience4j：Bulkhead','https://resilience4j.readme.io/docs/bulkhead'],['Resilience4j：线程池隔离','https://resilience4j.readme.io/docs/bulkhead#threadpoolbulkhead']]
  },
  {
    track:'java', group:'Java 基础',     id:'java-time-instant',
    title:'Instant 是时间线上的一点，LocalDateTime 没有时区（JDK 8）',
    prompt:'用 LocalDateTime.now() 存到库里，夏令时切换那天会怎样？',
    core:'`java.time.Instant`（JDK 8 起）表示 UTC 时间线上的一个点，适合存库和跨机比较。LocalDateTime 只有日期和钟面时间，没有时区，不能确定是哪一个瞬时。ZonedDateTime / OffsetDateTime 才带区。展示给用户时，用存下来的 Instant 按用户时区格式化。now() 若不指定时钟和区，测试和跨机都会漂。比较先后用 Instant，不要用去掉时区的本地时间相减。',
    why:'把没有时区的钟面时间当绝对时刻存进库，夏令时或跨时区对账会错一小时甚至错一天。区分信号是库存的是时间线上的一点，展示时才放进时区。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'下单时间存绝对时刻。页面用上海时区格式化给用户看。不要把“2026-03-08 02:30”这种没有区的字符串当唯一真相。两台机器打印本地日期时间，即使表示同一瞬间，钟面也可能不同，不能拿来比先后。把输入、输出和失败时留下的那一行同时记下来，不要只看最后没有报错。',
    task:'分别打印 Instant.now 和 LocalDateTime.now。解释为什么后者不能当跨机顺序。',
    answer:'Instant.now 预测是时间线上的一点，可以跨机器比较瞬间。LocalDateTime.now 预测没有时区，同一串钟面在不同地区不是同一个瞬间，不能当跨机顺序。库里存绝对时刻，展示时再放进时区。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'java.time Instant LocalDateTime 时区 UTC',
    points:['Instant 是时间线上的一点，适合存储','LocalDateTime 没有时区，不能确定瞬时','展示时按用户时区格式化，比较用 Instant'],
    deep:[
      {title:'钟面不是瞬间',body:'本地日期时间只有年月日时分秒，没有偏移。夏令时重复或跳过的那一小时，同一串数字可能对应两个瞬间或零个。绝对时刻没有这个歧义。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'分别打印 Instant.now 和 LocalDateTime.now。把本地时间放到两个时区里解析，看是不是两个瞬间。库存和比较只用绝对时刻。'},
    ],
    refs:[['Java：Instant','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/Instant.html'],['Java：LocalDateTime','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDateTime.html']]
  },
  {
    track:'java', group:'Java 基础', id:'java-charset-default',
    title:'读写字节必须写明字符集，不要碰默认编码',
    prompt:'同一份文件在开发机正常、在 CI 里乱码，缺的是哪一步？',
    core:'字节变成字符要按字符集解码。不写明时走 Charset.defaultCharset()，随操作系统和启动参数变。开发机 UTF-8、CI GBK，同一组字节会读出不同字符串。HTTP 体、文件、数据库连接都要明确 UTF-8（或协议规定的那一种）。new String(bytes) 和 FileReader 无参构造都踩这个坑。编码和解码必须成对。',
    why:'开发机不乱码不代表契约，换到默认编码不同的 CI 上，同一份中文字节会解成另一串。区分信号是读写都写明 UTF-8，而不是碰默认字符集。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'用明确的 UTF-8 读含中文的字节，得到原来的字。用平台默认字符集再读一次，在默认不是 UTF-8 的机器上会乱码。HTTP 的 Content-Type 带上 charset=utf-8。CI 应固定读写两侧都是 UTF-8，而不是依赖镜像里的地区设置。',
    task:'用明确 UTF-8 和默认字符集各读一次含中文的字节，对比结果，并写出 CI 应固定哪一侧。',
    answer:'明确 UTF-8 读中文，预测得到原文字。默认字符集再读，预测在另一台机器上可能不同。CI 应固定两侧都写明 UTF-8，不要依赖默认编码。编码和解码要成对，响应头也要带上字符集。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'Charset UTF-8 defaultCharset 乱码',
    points:['无参解码走默认字符集，随环境而变','文件和 HTTP 都要写明字符集','编码与解码必须使用同一套'],
    deep:[
      {title:'默认跟着机器走',body:'不写字符集时，用的是这台 JVM 的默认。开发机、CI 和容器的默认可以不同。文件和 HTTP 正文一旦按错编码解读，后面的业务看到的就不是原来的字。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'用明确 UTF-8 和默认字符集各读一次含中文的字节。在默认不是 UTF-8 的环境里，两次结果应不同。CI 脚本里把两侧都写成 UTF-8，再跑一次应稳定。'},
    ],
    refs:[['Charset.defaultCharset','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/charset/Charset.html#defaultCharset()'],['StandardCharsets','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/nio/charset/StandardCharsets.html']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http2-multiplex',
    title:'HTTP/2 一条连接上多路并行，队头阻塞改到了 TCP',
    prompt:'换成 HTTP/2 之后，是不是再也不用担心一张慢图挡住别的请求？',
    core:'HTTP/1.1 同一条连接上通常要等前一个响应完。HTTP/2 在一条 TCP 连接上用流并行，小请求不再等一张大图的整段 HTTP/1 队头。TCP 丢包仍会卡住这条连接上的所有流，这是更下层的队头阻塞。HTTP/3 改走 QUIC/UDP，把这个问题再往下解。更多连接不一定更快，浏览器对同一主机连接数也有限。缓存、压缩、优先级仍然要做。',
    why:'以为换成 HTTP/2 就再也不怕一张慢图挡住别的请求，丢包时同一条连接上的流仍会一起停。区分信号是它解决的是 HTTP 层的队头阻塞，TCP 丢包那一层还在。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'同一主机上的页面、样式和接口走一条 HTTP/2 连接并行，不再为每个请求排一条 HTTP/1 的队。一次严重丢包时，这些流都会停，因为下面仍是一条 TCP。换协议没有取消这一层。把输入、输出和失败时留下的那一行同时记下来，不要只看最后没有报错。',
    task:'对照 HTTP/2 多路复用说明，写出它解决的是哪一层的队头阻塞，哪一层还在。',
    answer:'多路复用解决的是应用层：一条连接上多个流可以并行，慢的响应不再挡住同连接上别的 HTTP 请求排队。TCP 丢包仍会拖住这条连接上的所有流，这一层还在。所以不是什么阻塞都消失，拆不拆域名也不能只凭“已经是 HTTP/2”。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'HTTP/2 多路复用 队头阻塞 HTTP/3 QUIC',
    points:['HTTP/2 用流在一条连接上并行请求','它去掉的是 HTTP/1 那一层队头阻塞','TCP 丢包仍可能拖住这条连接上的所有流'],
    deep:[
      {title:'两层队头不是一个',body:'HTTP/1 在一条连接上要等前一个响应完。HTTP/2 把多个流叠在一条连接上，这一层的排队没了。丢包重传仍在 TCP 上，所有流共享这次等待。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'对照 HTTP/2 多路复用的说明，写出它解决的是哪一层，哪一层还在。在一条连接上并行请求，确认不必等前一个响应；再在丢包时看这些流是否一起停。'},
    ],
    refs:[['MDN：HTTP/2','https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2'],['RFC 9113：HTTP/2','https://httpwg.org/specs/rfc9113.html']]
  },
  {
    track:'frontend', group:'网络与安全', id:'tls-hostname-verify',
    title:'HTTPS 要核对名字，加密不等于找对了那台服务器',
    prompt:'网站有锁标志，为什么还可能连到别人的机器？',
    core:'TLS 先协商密钥，再让浏览器核对证书是否由信任的机构签发、是不是正在访问的主机名。顺序是加密信道，然后验名字。边界是只加密不验名字，中间人可以拿另一张合法证书跟你聊。过期、名字不匹配、自签被点了继续，保护都失效。HTTPS 也不保证页面里的脚本可信，那是内容和供应链的问题。混合内容会把 HTTPS 页里的明文请求暴露出去。锁标志只表示这条页面连接做了这两步。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。',
    why:'把锁标志当成服务一定是正版且安全，会忽略证书名字不匹配和页面里再请求明文。区分信号是证书必须盖住正在访问的那个主机名，加密只说明信道被保护。看走眼时会把旁边那一层一起改掉，真正的差别要能单独指出来。',
    example:'打开 https://pay.example.com，证书必须盖住这个名字。证书若是别的名字，浏览器应拒绝，即使链路是加密的。页面里再去请求 http:// 的脚本，则是混合内容，锁解决不了这段明文。过期证书同样不该继续。',
    task:'列出证书过期、名字不匹配、页面里再请求 http:// 三种情况各自坏在哪一层。',
    answer:'证书过期：预测坏在证书有效期，浏览器不应信任。名字不匹配：预测坏在主机名核对，加密仍可能完成但找错了服务器。页面里再请求 http://：预测坏在混合内容，主页面的 TLS 盖不住这段明文。锁标志不等于业务安全。预测先写下来再对照日志或界面，对不上就停在这一步，不要改邻接的配置。',
    keywords:'TLS 证书 主机名校验 HTTPS 混合内容',
    points:['HTTPS 要加密并且核对主机名','点过“继续”的自签等于放弃核对','页面里的明文请求仍会漏出内容'],
    deep:[
      {title:'加密和找对人是两步',body:'TLS 先协商密钥，再核对证书是不是信任的机构签发、是不是正在访问的主机名。只加密不验名字，中间人可以拿另一张合法证书跟你说话。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'列出证书过期、名字不匹配、页面里再请求 http:// 三种情况各自坏在哪一层。用一张名字不符的证书访问，浏览器应拒绝，而不是只显示锁就继续。'},
    ],
    refs:[['MDN：Transport Layer Security','https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security'],['MDN：混合内容','https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content']]
  },
  {
    track:'frontend', group:'浏览器', id:'bfcache-pageshow',
    title:'后退可能整页从往返缓存里拿出来，脚本不一定重跑',
    prompt:'用户点后退，为什么有的页面还是离开前的滚动位置，onLoad 却没再执行？',
    core:'往返缓存把整页快照留下来，后退时直接恢复，滚动和表单往往还在。顺序是离开页面、快照被保留、后退时 pageshow 触发且 persisted 为真，这时不是重新加载。边界是 load 不会再走一遍。页面若绑了 unload，或占用未关的连接，可能进不了这层缓存，后退就变成普通加载。恢复后要检查登录和数据是否过期，不要假设启动代码一定会再跑。刷新和后退不是同一条路径。沿顺序看，前一步的输出是后一步的输入。边界不满足就停在这一步，不要把失败算到旁边的组件上，也不要几处一起改。改之前先写下这一步单独的预测。只改对得上的那一步。现象对不上就停在这一步，不要把邻接的配置一起改掉。',
    why:'把逻辑只放在 load 里，用户点后退时页面从往返缓存恢复，脚本不重跑，屏幕上仍是离开前的过期状态。区分信号是 pageshow 的 persisted 为真，而 load 没有第二次。',
    example:'离开结算页再后退。pageshow 里 persisted 为 true，这时应重新校验购物车，而不是等 load。直接刷新时 persisted 为 false，load 会走。若页面占用了未关的连接，可能根本进不了这层缓存，后退就变成重新加载。',
    task:'写 pageshow 监听，打印 event.persisted。用后退对比刷新，看 load 是否第二次触发。',
    answer:'写 pageshow 并打印 persisted。后退预测 persisted 为真，load 不一定再跑，滚动和表单还在。刷新预测 persisted 为假，load 会再走。所以恢复后要自己检查登录和数据是否过期，不要假设启动代码一定会再执行。',
    keywords:'bfcache pageshow persisted unload 往返缓存',
    points:['往返缓存恢复的是整页快照，不是重新请求文档','persisted 为真时 load 不会按新加载再走','恢复后要自己检查过期状态'],
    deep:[
      {title:'恢复的是整页快照',body:'往返缓存留下整页，后退时直接拿出来。滚动和表单往往还在。load 不会再走一遍。页面若绑了 unload 或占着未关的连接，可能进不了这层缓存。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'怎样自己验证',body:'写 pageshow，打印 persisted。用后退对比刷新：后退应为真且 load 不第二次触发，刷新应为假。恢复后检查购物车或登录是否仍有效。'},
    ],
    refs:[['MDN：bfcache','https://developer.mozilla.org/en-US/docs/Glossary/bfcache'],['web.dev：bfcache','https://web.dev/articles/bfcache']]
  },
  {
    track:'frontend', group:'浏览器', id:'service-worker-stale',
    title:'Service Worker 能先给旧缓存，更新代码不等于用户立刻看见',
    prompt:'部署了新前端，为什么有人还在用昨天的脚本？',
    core:'Service Worker 可以拦截 fetch，按缓存策略给响应。cache-first 会先给旧文件。新 Worker 安装后，默认等旧页面都关掉才激活。skipWaiting 和客户端刷新要显式做。开发时关掉 SW 或开 Bypass，否则会以为构建坏了。SW 不是浏览器 HTTP 缓存的替代说明，两者叠在一起更难排。只给静态带哈希的资源做缓存，API 默认走网络。',
    why:'部署了新前端，有人仍在用昨天的脚本，因为 Service Worker 可以先把旧缓存交出去，新版本还在等待。区分信号是用户仍看旧脚本的那段是 waiting，而不是服务器上没有新包。',
    example:'带内容哈希的脚本可以缓存优先。订单接口不要进这层缓存。新的 Worker 安装后常常停在 waiting，要等旧页面关掉才 activated。这时用户看到的仍是旧脚本。发版后提示刷新，才能让新的 Worker 接管。',
    task:'对照 Service Worker 生命周期，写出 installing、waiting、activated。标出用户仍看旧脚本的那一段。',
    answer:'installing 是在装新的 Worker。waiting 是装好了但还没接管，预测用户仍看旧脚本，这就是那段。activated 之后才由新的 Worker 控制后续页面。API 不要默认缓存优先。更新代码不等于当前已打开的页面立刻换成新脚本。',
    keywords:'Service Worker cache-first skipWaiting 生命周期',
    points:['cache-first 会先给旧响应','新 Worker 默认等待旧页面关闭才激活','接口请求不要默认走静态缓存策略'],
    deep:[
      {title:'等待不是没部署',body:'新版本可以已经安装，只是旧页面还占着控制权。服务器上的新包是在的。排查却在源站找文件，会错过浏览器里这份旧缓存。接口若也缓存优先，连数据都是旧的。边界不满足时就停，不要把这次失败算到下一层头上。'},
      {title:'策略怎么选',body:'静态与 API 不要同一套 cache-first。选型口诀见 sw-cache-strategy-pick。'},
      {title:'怎样自己验证',body:'对照生命周期写出 installing、waiting、activated。标出用户仍看旧脚本的 waiting。更新后不要关旧页，确认界面不变；关掉再开，才应看到新脚本。接口响应不应来自这份缓存。'},
    ],
    refs:[['MDN：Service Worker API','https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API'],['MDN：Service Worker 生命周期','https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_SHIP_15) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
