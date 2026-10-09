/* Request spine: one order from browser to database, plus the failures around it. */
const COVERAGE_PATH_05 = [
  {
    track:'frontend', group:'网络与安全', id:'api-error-contract',
    title:'失败必须是一份契约，不能只靠状态码口头约定（RFC 9457）',
    prompt:'接口返回 400，前端为什么仍可能把失败当成成功，或把校验错误显示成系统崩溃？',
    core:'一次业务请求的成功与失败要写进双方共用的契约。HTTP 状态码区分大类：2xx 表示这次操作按约定完成，4xx 表示调用方要改请求，5xx 表示服务端这次没做成。状态码不够：同一 409 可能是库存不足或幂等键冲突。响应体应有稳定的机器可读类型，例如 **RFC 9457** 的 application/problem+json：type、title、status、detail，以及业务自己的 code。前端只解析这份结构，不要靠 message 字符串包含中文来分支。网络断开、超时、CORS 失败发生在到达应用之前，没有这份 JSON，必须当成传输失败，不能假装成业务 400。',
    why:'学习者会以为返回了 400，前端就一定走进失败分支。后端改一句文案后，页面把校验错误显示成系统崩溃，网关超时的 HTML 还被当成下单成功。超时没有正文、因此进不了库存分支，才说明失败要靠状态码和类型，不能靠文案字符串。',
    example:'POST /orders 库存不足返回 409，body 的 type 指向 inventory-exhausted。幂等键重复且首次已成功，返回 200 和第一次的订单。fetch 抛 TypeError 时页面显示“没送到”，不显示“库存不足”。',
    task:'列出下单的三种失败：校验字段、库存不足、网关超时。为每一种写下状态码、body 的 type，以及页面上该出现的文案。确认超时没有 body 时不会走进库存分支。',
    answer:'校验字段用 400，正文类型指向字段错误，页面指到该字段。库存不足用 409，类型指向库存耗尽，页面显示缺货。网关超时没有 JSON 正文，页面显示没送到，不能走进库存分支。同一幂等键若首次已成功，应再次返回第一次的订单，而不是变成另一种错误。',
    keywords:'HTTP problem+json RFC9457 API 错误契约 幂等',
    points:['状态码只分大类，业务原因写在稳定字段里','没有到达应用的失败没有 JSON，不能当业务错误解析','幂等冲突和业务冲突要用不同的 type 区分'],
    deep:[
      {title:'和前端状态的关系',body:'页面上的错误提示来自契约里的 type，而不是随便 catch 后的 e.message。国际化文案由前端按 type 映射。把后端中文 detail 直接展示给用户，换语言和换实现都会碎。'},
      {title:'和 Java 课的对应',body:'服务端用同一份问题详情生成这些字段，见 spring-mvc-exception。两边必须对同一组 type。契约测试课会锁住这份形状。'}
    ],
    refs:[['RFC 9457：Problem Details','https://www.rfc-editor.org/rfc/rfc9457.html'],['MDN：HTTP 状态码','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status']]
  },
  {
    track:'frontend', group:'安全', id:'auth-session-vs-jwt',
    title:'浏览器里的登录态优先用 Cookie 会话，不要把访问令牌塞进 localStorage',
    prompt:'把 JWT 存进 localStorage，每次请求自己带头，为什么仍不是当前浏览器应用的默认做法？',
    core:'浏览器应用的默认登录态是服务端会话：登录成功后 Set-Cookie，后续请求由浏览器自动带上，Cookie 标 HttpOnly、Secure、SameSite。脚本读不到这份 Cookie，XSS 不能直接把会话令牌抄走。JWT 作为访问令牌出现在 Authorization 头时，前端必须自己存放。放进 localStorage 或普通 JS 可读的 Cookie，任何 XSS 都能偷走并在别处重放，直到过期。JWT 适合服务与服务之间，或原生应用自己保管令牌。刷新令牌若也落到 JS 可读存储，危害比短时访问令牌更大。对象级授权仍在服务端按这条身份检查资源，登录成功不等于能读任意 id。',
    why:'学习者会把令牌放进本地存储并自己加头，当成更现代的无状态登录。脚本能读到长期令牌，过期后页面仍拿着旧值去请求，注销也只是删掉本地一项。浏览器会话里脚本读不到令牌、服务间令牌却可以短时传递，才说明三种路径不是同一个存放位置。',
    example:'Web 下单：会话 Cookie 自动带上，CSRF 靠 SameSite 和防伪字段。内部库存服务之间用短时 JWT。不要在 React 里 window.localStorage.setItem("token", jwt) 再手动加 Authorization。',
    task:'画三条路径：浏览器会话 Cookie、浏览器 localStorage 里的 JWT、服务间 JWT。标出谁能读到令牌、过期后怎样失效、XSS 能做什么。',
    answer:'浏览器会话 Cookie 由浏览器自动带上，脚本读不到 HttpOnly 的值，过期或注销由服务端会话失效。localStorage 里的 JWT 脚本能读到，XSS 可以拿走，过期只能靠前端自己删。服务间 JWT 不经过浏览器，短时使用，调用方能读到它是因为它们不是页面脚本。三条不能合成“把令牌交给前端存”。',
    keywords:'Cookie HttpOnly JWT localStorage 会话 XSS SameSite',
    points:['浏览器会话默认用 HttpOnly Cookie，由浏览器自动携带','JS 能读到的 JWT 可被 XSS 抄走并重放','对象授权仍按服务端身份检查，不看前端是否“已登录”'],
    deep:[
      {title:'无状态的代价',body:'服务端不存会话时，撤销一个已发出的 JWT 直到它过期，或维持一份黑名单，那份名单仍是状态。把“无状态”当成不必做撤销，被盗令牌会一直有效。'},
      {title:'和 CSRF 的关系',body:'Cookie 会在同站请求里自动带上，所以写操作还要 CSRF 防护。Authorization 头不会被普通表单跨站带上，这不是改用 JWT 塞进 localStorage 的理由，而是两种攻击面不同。'}
    ],
    refs:[['MDN：Cookie','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies'],['MDN：Set-Cookie','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie']]
  },
  {
    track:'frontend', group:'工程实践', id:'vite-module-graph',
    title:'新项目的构建默认是 Vite，按模块图拆包，而不是先学 webpack 配置',
    prompt:'新的 React 或 Vue 项目还该先写一份 webpack.config.js 吗？',
    core:'Vite 在开发时用浏览器原生 ESM，按模块图按需编译，改一个文件不必打包整个应用。生产构建用 Rollup 把图打成产物。代码分割的边界是动态 import()，和 webpack 课里的思想相同，但现行脚手架默认走 Vite，不是 Create React App 或手写 webpack。依赖预构建、环境变量前缀、以及哪些文件算静态资源，都以 Vite 的模块图为准。旧仓库可以继续用 webpack；新课的默认步骤不再从 webpack loader 写起。拆包过多仍会变成许多小请求，边界要按路由和低频大模块来画。',
    why:'学习者会在新项目里先写一份打包配置，把已经退出主线的脚手架当成当前工程结构。改一个组件时整包重编，路由拆分也只看配置行数，首屏却没变小。开发时只重编当前模块、生产包里重组件单独成块，才说明边界在模块图上，不在那份旧配置。',
    example:'用现行脚手架建最小应用，改一个组件时开发服务器只编译当前图里的模块，而不是整包重编。给图表路由加上动态导入后，生产包里出现单独的块文件，图表不在首屏那一块里。把同一导入写成顶层静态导入后，这个文件名又回到首屏块。',
    task:'用现行脚手架建一个最小应用，改一个组件看开发时是否整包重编。再给一个路由加动态 import，对比生产包里的 chunk 文件名。',
    answer:'新项目用现行工具的模块图，不必先写旧的打包配置。改一个组件时，开发过程不应整包重编。某个路由改成动态导入后，生产包里应出现对应的块文件名，首屏字节下降。分割是否有效看首屏和路由切换，不看配置文件有多少行。旧仓库可以继续用原来的打包器。首屏块的文件名不应再包含那个改成动态导入的图表。',
    keywords:'Vite ESM Rollup 代码分割 模块图 webpack',
    points:['Vite 开发时走原生 ESM，生产构建再打包','代码分割边界是动态 import，按路由和低频模块划分','webpack 是存量构建器，不是新项目的默认起点'],
    deep:[
      {title:'和已有 webpack 课',body:'动态 import、缓存失效、chunk 失败恢复这些机制仍然成立。那一课改成“存量 webpack 仓库如何理解分割”，新建步骤以这一课为准。'},
      {title:'环境变量',body:'只有约定前缀的变量会进入客户端包。没有前缀的密钥若被写进前端代码，构建时就会进包。这和“打进前端包里的变量不是秘密”是同一条规则。'}
    ],
    refs:[['Vite：指南','https://vite.dev/guide/'],['Vite：功能','https://vite.dev/guide/features.html']]
  },
  {
    track:'java', group:'框架', id:'jpa-session-nplus1',
    title:'JPA 会话里的对象不是 SQL 行，N+1 是一次循环里的下一次查询',
    prompt:'在循环里调用订单.getItems()，为什么日志里会出现几十条一模一样的 SELECT？',
    core:'JPA 的持久化上下文按身份管理实体。事务内第一次按 id 加载的实例，再次通过同一上下文访问还是它，字段改动会在 flush 时变成 UPDATE。集合和多对一关联的默认获取常是延迟的：打印或 JSON 序列化碰到未加载的关联，会再发一条 SELECT。在订单列表上循环访问 items，就是典型的 N+1：1 次查列表，N 次查明细。事务已经提交、会话关闭后再碰延迟关联，会失败，而不是悄悄回到数据库。解决办法是按这次用例写查询（join fetch 或专门的查询），而不是把懒加载当成“自动的 SQL 优化”。',
    why:'学习者会以为实体上的集合字段随时都在，循环里取值只是读内存。列表接口的日志里冒出几十条相同的查询，页面超时，他却去加机器。改成一次取出明细后重复查询消失、会话关闭后不再访问该集合，才说明那些查询是用到关联时才发出的。',
    example:'GET /orders 返回 50 张订单。每张订单序列化 items。日志里 1 条订单查询加 50 条明细查询。改成按订单 id 一次取出明细，或 DTO 查询只要列表需要的列。',
    task:'打开一个列表接口的 SQL 日志，数循环里的 SELECT。用一次 join fetch 或一条专用查询消掉重复，再确认会话关闭后不再访问延迟集合。',
    answer:'打开列表的 SQL 日志，循环访问每张订单的明细时，会在一条订单查询之后再看到几十条相同的明细查询。用一次联接取出或一条按订单标识的专用查询后，重复的那几十条消失。会话关闭后再碰延迟集合会失败，所以视图层不能再访问还没加载的集合。按用例取列，而不是等序列化时现查。',
    keywords:'JPA Hibernate persistence context N+1 lazy fetch',
    points:['持久化上下文按 id 管理实体，flush 时写出变更','延迟关联在访问时发 SQL，会话关闭后再访问会失败','列表循环访问关联是 N+1，要用这次用例的查询一次取齐'],
    deep:[
      {title:'和 Spring 事务',body:'典型的是事务划在服务方法上，控制器返回实体时会话可能已关。把实体直接丢给 JSON，延迟字段会在错误的时刻加载。对外返回 DTO 或在事务内取完这次需要的图。'},
      {title:'不是所有关联都 EAGER',body:'把所有关系改成立即加载，只是把 N+1 变成一张更大、更难缓存的笛卡尔积。默认懒加载，查询按接口需要写，才是可控的。'}
    ],
    refs:[['Jakarta Persistence：实体','https://jakarta.ee/specifications/persistence/3.2/jakarta-persistence-spec-3.2#entities'],['Hibernate：获取策略','https://docs.hibernate.org/orm/6.6/userguide/html_single/Hibernate_User_Guide.html#fetching']]
  },
  {
    track:'java', group:'框架', id:'spring-mvc-exception',
    title:'控制器里抛出的异常要变成契约里的 HTTP 响应，不要变成默认的 HTML 错误页',
    prompt:'服务方法抛了库存不足，为什么浏览器收到的是一段 Tomcat 的 HTML？',
    core:'Spring MVC 在控制器方法返回之后，由异常解析器把未捕获的异常变成响应。@ExceptionHandler 或 ProblemDetail 应输出与前端约定的状态码和 JSON，而不是容器的 HTML 错误页。校验失败、找不到资源、业务冲突、未处理的服务器错误，要分成不同的处理器，并写上稳定的 type。异常处理器自己再抛错，才会落到容器默认页。过滤器里的失败发生在控制器之前，也要有同一形状的响应，否则网关和浏览器仍会看到另一种 body。这节负责生成契约；前端 api-error-contract 负责消费。',
    why:'学习者会以为服务里抛出了明确的业务异常，浏览器就会收到约定的错误。用户看到的是容器的 HTML 错误页，联调把前后端一起判成接口坏了。三种失败的类型都是 JSON 而不是 HTML，才说明异常在离开容器前被映射成了契约。',
    example:'InventoryExhaustedException → 409 + problem+json，type 为 inventory-exhausted。未捕获的空指针 → 500，type 为 about:blank 或内部错误，不把堆栈返回给浏览器。',
    task:'分别触发校验失败、业务冲突和空指针。记录状态码、Content-Type 和 body 的 type。确认三种都不是 HTML。',
    answer:'校验失败应是 400 和约定的类型，业务冲突应是 409 和对应类型，空指针应是 500 且不把堆栈返回浏览器。三种响应的内容类型都是 JSON，不是 HTML。未知错误可以给一个笼统类型，但不能泄露内部栈。过滤器和控制器要写成同一形状，否则某一层仍会吐出错误页。',
    keywords:'Spring MVC ExceptionHandler ProblemDetail RFC9457',
    points:['异常解析器把控制器异常变成 HTTP 响应','业务冲突和未知故障要分处理器，body 形状保持问题详情','过滤器阶段的失败也必须输出同一契约，不能落到 HTML 错误页'],
    deep:[
      {title:'事务回滚',body:'运行时异常默认让事务回滚。映射成 409 的业务异常如果被吃掉并返回 200，数据库可能已经回滚，客户端却以为成功。返回失败响应时，要确认事务边界和异常类型一致。'},
      {title:'不要翻译成空 200',body:'catch 之后返回空对象或 null，前端会走成功分支。失败就失败，用契约里的状态码。'}
    ],
    refs:[['Spring：ExceptionHandler','https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-exceptionhandler.html'],['Spring：REST 异常与 ProblemDetail','https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html']]
  },
  {
    track:'java', group:'工程实践', id:'request-trace-one-hop',
    title:'一次下单只应有一条追踪，从网关进到 SQL 出',
    prompt:'用户说下单慢，日志、指标、链路各有一段数字，为什么仍定位不到是哪一跳？',
    core:'一次请求进出系统要带同一个追踪标识。W3C Trace Context 用 traceparent 在进程间传递。网关、订单服务、数据库访问都应挂在同一条 trace 上，span 表示这一跳花了多少时间。日志里写入 trace id，才能从一条用户投诉跳到那一次调用。指标回答“这一类请求现在怎样”，链路回答“这一次卡在哪”。Nginx 超时、网关超时、HTTP 客户端超时、连接池等待、SQL 执行是不同的 span，不能共用一个数字。没有传播时，服务 A 和服务 B 的日志对不上同一笔订单。',
    why:'学习者会把日志、指标和链路分成三张互不认识的截图，每张都有一个数字。用户说下单慢时，对不出是网关、连接池还是语句。同一笔请求在三处出现同一个追踪标识，变慢的那一段是借连接而不是语句，才说明定位的是这一跳。',
    example:'浏览器发出带幂等键的下单，耗时约 3 秒。网关、服务日志和 SQL 日志里是同一个追踪标识。跨度显示网关只有几毫秒，订单服务将近 3 秒，其中获取连接占了绝大部分，语句只有几十毫秒。把池调小后，变慢的仍是借连接这一段，而不是语句。',
    task:'从浏览器发出一笔带幂等键的下单，在网关、服务日志和 SQL 日志里找到同一个 trace id。再人为把池变小，确认变慢的 span 是借连接而不是语句。',
    answer:'从浏览器到网关、服务日志和 SQL 日志应找到同一个追踪标识，否则三份数字不是同一次下单。人为把池变小后，变慢的跨度应是获取连接，语句跨度仍短。指标说明整体变慢，链路说明这一次慢在哪一跳。网关很快时不能把 504 或总耗时算到入口上。池变小之后，语句那一段的耗时不应跟着变成三秒。',
    keywords:'OpenTelemetry traceparent span W3C Trace Context',
    points:['同一请求用同一个 trace id 穿过网关和服务','span 分开记录网关、应用、连接池和 SQL','日志必须带上 trace id，才能从投诉跳到那一次调用'],
    deep:[
      {title:'采样',body:'全量追踪在高峰很贵。错误和慢请求应提高采样，正常请求可以降。没有错误采样时，你正好要查的那次可能没被记下。'},
      {title:'和超时课的关系',body:'java-http-timeout、nginx-proxy-timeout、hikari-pool-timeout 描述的是不同时钟。这一课要求它们作为同一条 trace 上相邻的 span 出现，而不是三份孤立配置。'}
    ],
    refs:[['W3C Trace Context','https://www.w3.org/TR/trace-context/'],['OpenTelemetry：Traces','https://opentelemetry.io/docs/concepts/signals/traces/']]
  },
  {
    track:'frontend', group:'React 生态', id:'react-rsc-vs-client',
    title:'服务端组件负责这次要渲染的数据，客户端组件负责这次要交互的状态',
    prompt:'已经有 React Router 的 loader，为什么还要理解服务端组件？',
    core:'React 19 的服务端组件在服务端运行，可以直接取数并输出 UI，默认不把这部分代码打进浏览器包。需要点击、输入、useState 的部分才标为客户端组件。这和 SPA 里用 loader 在导航前取数不是同一层：loader 仍把页面当客户端树来水合；服务端组件可以把不交互的树留在服务端。两者可以同时存在于不同的应用形态里，不要把 2023 年的数据路由写成 2026 年唯一的数据层。浏览器专用 API、事件处理、本地 state 不能放进服务端组件。密钥和环境侧数据也不要传到客户端组件的 props 里。',
    why:'学习者会以为已经有路由装载数据，现行文档里的服务端组件就可以不看。没有交互的标题和库存仍被打进客户端包，进入页面后再请求一次。块上没有事件、却必须标成客户端才能编译通过的那一块，才说明它不该在客户端再取已经渲染过的数据。',
    example:'商品标题和库存数字由服务端组件取数后出现在首屏里，客户端包里没有第二次请求它们的代码。加入购物车的按钮因为有点击和本地状态，必须标成客户端组件。若把库存数字也放进该按钮所在的客户端树里再发请求，网络面板会看到重复的那一次获取。',
    task:'在一份现行 React 文档里标出哪些例子是服务端组件、哪些必须 use client。对照自己的列表页：哪些块没有交互，却仍打进了客户端包。',
    answer:'现行文档里没有交互、只取数渲染的例子是服务端组件，带本地状态和事件的例子必须是客户端组件。自己的列表页里，没有交互的块不应打进客户端包，也不应再用效果请求一份已经渲染过的数据。有按钮和输入的那一块才进入客户端。重复出现在网络面板里的那一次获取，就是不该打进客户端的数据。',
    keywords:'React Server Components use client 数据层 React 19',
    points:['服务端组件在服务端取数并渲染，默认不进浏览器包','事件和本地 state 才需要客户端组件','客户端 loader 不是 React 19 里唯一的数据路径'],
    deep:[
      {title:'和水合',body:'服务端输出的 HTML 若再被客户端用另一份数据画一遍，就会出现水合失败。服务端组件减少了需要水合的树。仍走 SPA 时，继续遵守“两边第一次画出同一棵树”。'},
      {title:'和 Query 的分工',body:'客户端还要在交互后刷新的数据，可以用 Query。服务端已经写进 HTML 的首屏内容，不要在挂载时再无条件请求一次。'}
    ],
    refs:[['React：Server Components','https://react.dev/reference/rsc/server-components'],['React：use client','https://react.dev/reference/rsc/use-client']]
  },
  {
    track:'java', group:'数据库', id:'schema-migration',
    title:'表结构跟版本走，不要在生产上随手 ALTER',
    prompt:'应用新版本依赖新列，数据库还是旧结构，启动后会怎样？',
    core:'模式迁移把每一次结构变化写成带版本号的脚本，按顺序在目标库执行。Flyway 一类工具记录已应用的版本，启动时只跑尚未应用的脚本。脚本必须可在空库和已有库上得到同一结果，禁止手改生产表却不入库。破坏性变更要分开发布：先加新列并双写，再切读，再删旧列。回滚应用版本时，数据库迁移往往不能对称倒退，回滚计划要单独写。本地、测试、生产必须跑同一套脚本，不要靠“我记得生产已经改过”。',
    why:'学习者会在生产控制台随手加列，仓库里的脚本却还是旧的。新实例从空库启动失败，故障时分不清是代码新还是库旧。空库能跑到当前版本、故意跳过一条脚本就停在该版本，才说明表结构跟版本走，而不是跟某次手工操作走。',
    example:'从空库按顺序跑到当前版本，应用能启动。故意跳过增加幂等键的那条脚本后再启动，失败点在缺列或然约束，而不是跑到一半才在请求里爆出。回填旧数据的迁移若和删除旧列放在同一次发布，回滚应用也变不回原来的表。仓库脚本落后于控制台时，新环境会在缺列处启动失败。',
    task:'从空库跑到当前版本，再故意跳过一条脚本启动应用。记录失败点。写一条需要回填数据的迁移，说明为何不能和删列放在同一次发布。',
    answer:'从空库按版本跑到当前，应用才能启动。跳过一条脚本时，失败点应在启动或迁移检查，而不是线上第一笔请求。需要回填数据的变更不能和删列放在同一次发布，因为回滚应用不会自动把列和数据加回去。生产控制台加过的列必须写回仓库里的脚本。手工加列而脚本没改时，下一套空库会在同一步失败。',
    keywords:'Flyway schema migration 数据库迁移 版本',
    points:['每次结构变化是带版本的脚本，按顺序应用','空库和旧库跑完同一套脚本后结构应一致','删列和改语义要拆发布，回滚应用不能假设库会自动退回'],
    deep:[
      {title:'和 JPA ddl-auto',body:'开发期自动更新结构不能拿到生产。生产只跑迁移脚本。实体和脚本不一致时，以脚本为权威，实体跟着改。'},
      {title:'锁',body:'大表加索引或改列会锁表。迁移要写预计锁时间和是否在线 DDL。把它当成普通发版步骤，而不是启动时的惊喜。'}
    ],
    refs:[['Flyway：Migrations','https://documentation.red-gate.com/flyway/flyway-concepts/migrations'],['Spring Boot：数据库迁移','https://docs.spring.io/spring-boot/reference/data/sql.html']]
  },
  {
    track:'java', group:'安全', id:'spring-security-filter-chain',
    title:'认证发生在过滤链上，控制器里的 if 登录不能代替这一层',
    prompt:'控制器第一行写了 if (user == null) return 401，为什么未登录请求仍可能进到业务方法？',
    core:'Spring Security 的过滤链包在 Servlet 过滤器里，在到达控制器之前运行。链上的过滤器依次处理安全上下文、认证、CSRF、授权。请求通过链之后，控制器用 SecurityContext 里的身份，而不是自己再解析一个头。漏配的路径会直接进控制器，这时你在方法里写的检查才是最后一道，而且很容易忘。授权规则应按路径和方法声明：哪些匿名可访问，哪些要角色，哪些要到对象级。对象级授权仍在拥有数据的服务里，过滤链不能根据订单 id 知道这张订单属不属于该用户。',
    why:'学习者会在控制器第一行判断用户是否为空来代替登录。新增一个接口忘了这行判断，未登录请求仍进入业务方法并写库。新接口在配规则之前就被匿名拒绝、配上规则后才进入方法，才说明默认拒绝在过滤链上，不在某一行 if。',
    example:'健康检查允许匿名，返回成功。订单路径必须认证，未登录请求在进入控制器前被拒绝。新增一个 GET 却不配规则时，若默认是拒绝未匹配路径，匿名访问到不了业务方法。登录页和错误页若被同一条链挡死，连失败响应都打不开。',
    task:'增加一个新的 GET 接口但不配规则，用未登录请求打它。再把默认改成拒绝未匹配路径，确认新接口在配规则之前不能被匿名访问。',
    answer:'新增的 GET 在还没配规则时，未登录请求应被拒绝，业务方法没有日志。把默认改成拒绝未匹配路径后，这个结果保持，直到你为它写上认证规则。认证在过滤链完成，控制器读的是已经建立的安全上下文。这张订单属于谁，仍要在服务里再查一次。对象是否属于当前用户，不能靠过滤链上的“已登录”代替。',
    keywords:'Spring Security SecurityFilterChain SecurityContext 授权',
    points:['过滤链在控制器之前建立安全上下文','未配置的路径不能默认放行','对象级归属不在链上按 id 猜测，而在服务里检查'],
    deep:[
      {title:'和网关的分工',body:'网关可以拒绝没有令牌的请求。服务内的链仍要建立身份并做对象检查。只信网关转发的请求头而不校验，内网被绕过时就会变成匿名管理员。'},
      {title:'线程',body:'安全上下文默认绑在线程上。换线程处理异步请求时要明确传递，否则异步线程里会变成未认证。'}
    ],
    refs:[['Spring Security：架构','https://docs.spring.io/spring-security/reference/servlet/architecture.html'],['Spring Security：授权','https://docs.spring.io/spring-security/reference/servlet/authorization/index.html']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-http-cookie',
    title:'Node 自己返回会话时，也要会写 Cookie 和读 Cookie，而不是只讲 Stream',
    prompt:'用 Node 写一个登录接口，为什么把 token 放进 JSON 交给前端存，仍会回到 JWT 塞 localStorage 的模型？',
    core:'Node 的 http 模块接收请求、写出响应头和正文。会话登录应在响应里 Set-Cookie，标 HttpOnly、Secure、SameSite，并在后续请求的 Cookie 头里读回会话标识。JSON 正文里返回可读的访问令牌，等于让浏览器把令牌交给脚本。请求体要限制大小，否则上传或 JSON 会占满内存。未处理的拒绝仍应落到这一次响应，而不是进程退出，这和 unhandled-rejection 课是同一条纪律。Node 可以当 BFF：对浏览器发 Cookie 会话，对上游 Java 服务使用短时服务凭证。',
    why:'学习者会让登录接口把令牌放进 JSON，再由前端存起来。脚本因此读得到会话，模型和把令牌放进本地存储是同一条路，只是换成了自己写的服务。浏览器登录后请求自动带上 Cookie、脚本却读不到该值，才说明会话留在了浏览器的 Cookie 而不是响应正文。',
    example:'POST /login 校验通过后 Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax。GET /me 从 Cookie 读会话，不从 Authorization 读前端带来的 JWT。',
    task:'写一个最小登录和读取当前用户的处理器。用浏览器登录后查看 Cookie 是否 HttpOnly。用脚本读 document.cookie，确认读不到会话值。',
    answer:'登录成功后，响应应设置 HttpOnly 的会话 Cookie，而不是在 JSON 里给一段让脚本保存的令牌。随后读取当前用户的请求带上这个 Cookie，处理器从 Cookie 读会话。在控制台读 document.cookie 应看不到该会话值。不要再从授权头读取前端自己带来的令牌。',
    keywords:'Node.js http Set-Cookie HttpOnly BFF 会话',
    points:['http 处理器负责状态码、响应头和正文','浏览器会话用 Set-Cookie，而不是 JSON 里的 token','请求体要限额；错误要回到这一次响应'],
    deep:[
      {title:'框架',body:'Express 或 Fastify 把这些头封装了，语义不变。先能在原始 http 上写出正确的 Cookie，再用框架，才不会把封装当成另一种登录模型。'},
      {title:'和 Java 会话',body:'BFF 上的 Cookie 会话与 Java 服务上的 Security 上下文是两跳。BFF 终止浏览器会话，再以服务身份调用上游，不要把浏览器 Cookie 原样转发到内网。'}
    ],
    refs:[['Node.js：http','https://nodejs.org/docs/latest/api/http.html'],['MDN：Set-Cookie','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie']]
  },
  {
    track:'java', group:'消息队列', id:'mq-dlq-backlog',
    title:'处理不了的消息要进死信，积压要能看见，不能靠消费者一直抛错',
    prompt:'一条毒药消息每次都让消费者抛错，为什么整个队列会停住，而监控却只显示“有重试”？',
    core:'消息至少投递一次。业务失败分两类：再试可能成功（下游超时），和再试一定失败（校验永远过不了）。后者必须离开主队列，进入死信或失败主题，否则会堵住分区或队列的后续消息。重试要有次数和间隔，并继续用业务键幂等。积压是积压的深度和最早一条的年龄，不是“消费者还在跑”。Kafka 看落后的位点，RabbitMQ 看队列长度和死信交换器，RocketMQ 看消费位点与重试队列。告警应在用户发现丢单之前响起。',
    why:'学习者会把每次抛错都当成还会重试的正常情况，监控只显示有重试。一条必失败的消息让后面的成功消息也不再前进，队列停住。成功消息仍被消费、死信里只有那一条、积压年龄单独告警，才说明坏消息离开了主路径。',
    example:'投入一条必失败消息和九条成功消息。必失败的那条重试几次后进入死信，主队列继续把九条成功消息消费完，没有被它按顺序堵死。积压深度回来后，若死信没人处理，年龄仍会涨，超过阈值就告警。重试期间同一业务键的幂等仍然有效，成功的那九条不会因为重试变成双份。',
    task:'向队列投入一条必失败消息和九条成功消息。确认成功消息没有被毒药挡住，死信里有那一条，监控能量出积压。',
    answer:'九条成功消息应被消费完，不被必失败的那条挡住。死信里应有那一条，主队列不再反复抛它。监控要能量出积压的深度和年龄，而不是只显示有重试。可恢复的错误才重试，不可恢复的离开主路径。幂等键在重试期间仍然认得同一条业务。告警看的是积压年龄，不是消费者日志里出现过几次重试。',
    keywords:'dead letter 积压 重试 Kafka RabbitMQ RocketMQ',
    points:['再试无意义的消息必须离开主队列进入死信','积压看深度和最早消息的年龄，不只看消费者是否存活','重试仍按业务键幂等，不能靠“多试几次就会不重复”'],
    deep:[
      {title:'顺序队列更危险',body:'单分区或单队列要保序时，一条毒药会挡住后面所有同键消息。死信和跳过策略要在设计顺序时一起写，不能上线后再说。'},
      {title:'和 Outbox',body:'本地事务提交后消息发不出去，是另一类失败，用 Outbox。消费端死信不代替发送端的 Outbox。'}
    ],
    refs:[['RabbitMQ：Dead Lettering','https://www.rabbitmq.com/docs/dlx'],['Kafka：Consumer lag','https://kafka.apache.org/documentation/#basic_ops_consumer_lag']]
  },
  {
    track:'frontend', group:'测试', id:'contract-test-path',
    title:'前后端测的是同一份契约，而不是各测各的模拟对象',
    prompt:'前端用 mock 绿了，后端单测也绿了，联调时为什么字段对不上？',
    core:'契约测试锁住共享的请求与响应形状：路径、状态码、problem+json 的 type、幂等键放在哪个头。前端测试消费这份契约，而不是手写一份永远成功的 mock。后端测试提供这份契约，而不是只断言内部服务方法被调用。端到端只跑一条真实下单路径：登录（Cookie 会话）、创建订单、失败库存、超时。单元测试继续测纯函数和组件；契约测的是边界；端到端测的是这条路径还通。三层都绿但契约没锁字段时，联调仍会碎。',
    why:'学习者会让前端 mock 永远成功、后端单测也只断言自己的对象，两边都绿。联调时失败类型对不上，页面把缺货画成崩溃或成功。故意改掉后端的类型后前端契约测试变红，才说明锁住的是同一份字段，而不是各自的模拟对象。',
    example:'契约规定 POST /orders 409 的 type 为 inventory-exhausted。前端按 type 显示缺货。后端处理器必须产出该 type。改名时两边的契约测试一起红。',
    task:'给下单成功和库存不足各写一条契约断言。故意把后端 type 改掉，确认前端契约测试失败。再用 Playwright 跑通一次真实 Cookie 登录下单。',
    answer:'下单成功和库存不足各有一条契约断言，锁住状态码和失败类型。把后端的类型改名后，前端契约测试应失败，而不是 mock 仍返回成功。再用浏览器跑通一次真实的 Cookie 登录下单，只保留这一条端到端路径。前端不能用永远成功的替身代替这份契约。',
    keywords:'contract test OpenAPI problem+json Playwright 联调',
    points:['契约锁定路径、状态码和失败 type','前端 mock 不能代替这份契约','端到端只覆盖一条真实用户路径，字段问题应在契约层失败'],
    deep:[
      {title:'OpenAPI 可以当文本来源',body:'把问题详情和字段写进 OpenAPI，从同一文件生成或校验两侧测试。不要前端一份 README、后端一份 Wiki。'},
      {title:'和切片测试',body:'Spring 切片测试证明控制器能把异常映射出去。契约测试证明映射后的 JSON 仍是前端依赖的那一份。两层都要。'}
    ],
    refs:[['OpenAPI 规范','https://spec.openapis.org/oas/latest.html'],['Playwright：入门','https://playwright.dev/docs/intro']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_PATH_05) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
