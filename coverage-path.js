/* Path completion: original lessons for gaps between the existing groups. */
const COVERAGE_PATH = [
  {
    track:'frontend', group:'CSS 与布局', id:'css-box-sizing',
    title:'width 含不含 padding',
    prompt:'元素设了 width:100%，为什么一加 padding 就溢出父元素？',
    core:'CSS 的初始 box-sizing 是 content-box。这时 width 和 height 只约束内容盒，padding 和 border 加在外面，margin 再在更外面。改成 border-box 后，width 和 height 把内容和内边距、边框一起算进去，margin 仍然不算。百分比宽度相对于包含块的宽度，不是相对于视口。',
    why:'表单、卡片和栅格溢出时，先分清内容盒、边框盒和外边距，再决定改宽度还是改盒模型。',
    example:'父元素宽 320px。子元素 width:100%、padding:16px、border:1px solid，在 content-box 下总宽度会超过 320px。同一组数值在 border-box 下，内容区变窄，外边仍是 320px。',
    task:'在两种 box-sizing 下用开发者工具读出内容宽度、padding、border 和总宽度，确认 margin 始终在设定宽度之外。',
    answer:'content-box 的 width 不含 padding 和 border。border-box 把二者算进 width。margin 两种模式都不算进 width。',
    keywords:'CSS box-sizing content-box border-box padding width 盒模型',
    points:['content-box 的 width 只含内容','border-box 把 padding 和 border 算进 width','margin 不进入 width 或 height'],
    refs:[['MDN：box-sizing','https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing'],['MDN：CSS 盒模型','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction']]
  },
  {
    track:'frontend', group:'CSS 与布局', id:'css-grid-flex',
    title:'Flex 排一条轴，Grid 排行列',
    prompt:'页面布局是不是都应该改成 Grid？',
    core:'Flexbox 沿一条主轴分配空间，交叉轴负责对齐，适合导航、工具栏和单行卡片。Grid 同时定义行和列，适合页面分区和二维对齐。二者可以嵌套：外层用 Grid 划分区域，区域内部再用 Flex 排一行控件。换成 Grid 不会自动解决内容最小尺寸和溢出。',
    why:'选错布局模型后，对齐和换行规则会对不上设计，调 gap 和宽度也解释不了结果。',
    example:'顶栏左 logo、右按钮用 Flex。下面的侧栏加主内容用两列 Grid。主内容里的筛选条再回到 Flex。',
    task:'用同一组子项分别做一行 Flex 和两列 Grid，改变容器宽度，记录换行和轨道各自怎么变。',
    answer:'一维分配用 Flex，二维区域用 Grid。嵌套时每一层只负责自己的轴或轨道。',
    keywords:'CSS Grid Flexbox 一维 二维 布局',
    points:['Flex 在一条主轴上分配空间','Grid 同时定义行和列','两种布局可以嵌套，互不替代'],
    refs:[['MDN：Grid 与其他布局的关系','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Relationship_with_other_layout_methods'],['MDN：Flexbox 基本概念','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http-connection-reuse',
    title:'一次握手不等于一个资源',
    prompt:'页面有六张图，浏览器就一定做六次完整的 TCP 握手吗？',
    core:'HTTP/1.1 默认使用持久连接，同一条连接上可以连续发送多个请求。浏览器对同一源的并发连接数有上限，多出来的请求会等待空闲连接。HTTP/2 在一条连接上用多个流复用请求。若缓存仍然新鲜，对应资源可能根本不再发请求。资源个数、请求个数和握手次数是三件不同的事。',
    why:'看瀑布图时，把每个资源都理解成一次新连接，会误判延迟来自握手还是来自排队。',
    example:'同一主机的 HTML、CSS 和图片可以共用连接。第六个以后的 HTTP/1.1 请求可能在排队，而不是各自再握手。',
    task:'在网络面板里对同一源的多张图记录连接 ID，区分复用、排队和缓存命中。',
    answer:'持久连接和 HTTP/2 复用都会让多个资源共享连接。缓存命中则连请求都没有。',
    keywords:'HTTP keep-alive HTTP/2 connection reuse 持久连接 瀑布图',
    points:['HTTP/1.1 默认可在同一连接上连续请求','同域并发连接有上限，超出的请求会排队','缓存命中时不再为该资源建立请求'],
    refs:[['MDN：HTTP/1.x 连接管理','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x'],['MDN：HTTP/2','https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2']]
  },
  {
    track:'frontend', group:'安全', id:'cookie-credential',
    title:'Cookie 自动带上，localStorage 不会',
    prompt:'登录令牌放进 localStorage，和放进 Cookie，浏览器的行为有什么不同？',
    core:'Cookie 按域、路径、Secure、HttpOnly 和 SameSite 决定是否自动附在后续请求上。HttpOnly 的 Cookie 不能通过 document.cookie 读取。没有 Max-Age 或 Expires 时，它是会话 Cookie，会话结束即删除。SameSite=None 必须同时标记 Secure。localStorage 只留在该源的页面存储里，不会自动随请求发送，但同源脚本可以读到它。',
    why:'选凭证存放位置时，要同时看“会不会自动提交”和“页面脚本能不能读到”，不能只看能不能跨刷新保留。',
    example:'接口靠浏览器自动带上会话 Cookie。若把同一令牌写入 localStorage，请求代码必须自己放进头部，任何能在页面执行的脚本也能读到这个值。',
    task:'分别设置 HttpOnly Cookie 和 localStorage 项，检查 document.cookie、请求头和关闭浏览器后的残留。',
    answer:'Cookie 会按属性自动附带，HttpOnly 挡住脚本读取。localStorage 不自动发送，但脚本可读。',
    keywords:'Cookie HttpOnly SameSite Secure localStorage 会话',
    points:['Cookie 按属性自动附在匹配的请求上','HttpOnly 阻止脚本读取该 Cookie','localStorage 不自动发送，同源脚本可以读取'],
    refs:[['MDN：Set-Cookie','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie'],['MDN：localStorage','https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage']]
  },
  {
    track:'frontend', group:'安全', id:'csrf-boundary',
    title:'CORS 管不了跨站带凭证提交',
    prompt:'接口已经配置了 CORS，为什么状态变更仍要防跨站请求？',
    core:'CORS 决定浏览器里的脚本能否读取跨源响应，并不阻止浏览器发出请求。用户已经持有 Cookie 时，另一个网站上的表单仍可能把 Cookie 带到你的源，只要 Cookie 的 SameSite 等规则允许。跨站请求伪造防的是“浏览器替已登录用户提交”，不是防响应被脚本读走。防护包括收紧 SameSite、校验来源，以及不把会改状态的操作做成 GET。允许的 CORS 源列表不能代替这些措施。',
    why:'把跨源读响应和跨站提交凭证混成同一个开关，会留下改数据的入口，或者误伤正常的跨源读取。',
    example:'银行接口允许前端脚本读取 JSON。另一个网站上的表单 POST 仍然可能带上用户的会话 Cookie，而发起页的脚本读不到银行的响应。',
    task:'画出“脚本读跨源响应”和“表单把 Cookie 提交到你的源”两条路径，分别标出 CORS 和 SameSite 各自管哪一条。',
    answer:'CORS 管脚本能否读响应。跨站提交要靠 Cookie 策略、来源校验，以及安全的方法语义。',
    keywords:'CSRF CORS SameSite Cookie 跨站请求',
    points:['CORS 限制脚本读取跨源响应','浏览器仍可能自动带上符合规则的 Cookie','改状态的接口不能只靠 CORS 白名单'],
    refs:[['MDN：跨站请求伪造','https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF'],['MDN：CORS','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-unhandled-rejection',
    title:'请求里的错误不要交给进程兜底',
    prompt:'异步函数里抛出的错误，和没人接收的 Promise 拒绝，都会变成同一种请求失败吗？',
    core:'同步异常若冒泡到事件循环之外，会触发 uncaughtException，默认行为可能结束进程。Promise 拒绝且没有拒绝处理函数时，会触发 unhandledRejection。Node 从 15 起，未处理的拒绝默认导致进程以非零状态退出。请求处理函数应在该请求路径上捕获错误并写回响应。进程级事件只适合记录和决定是否退出，不能代替每一个请求的错误边界。',
    why:'把进程崩溃当成普通的 500，会让一个请求的漏洞拖垮所有正在处理的连接。',
    example:'路由里 await 数据库失败后，捕获异常并返回 500。若忘记捕获，拒绝先变成未处理拒绝，进程随后退出，其他请求一起中断。',
    task:'分别在请求处理函数内外抛出同步异常和 Promise 拒绝，记录响应是否写回、进程是否退出。',
    answer:'请求错误留在请求路径里变成响应。未捕获异常和未处理拒绝是进程级事件，默认可能结束进程。',
    keywords:'Node.js unhandledRejection uncaughtException Promise 错误边界',
    points:['未捕获同步异常和未处理拒绝走不同的进程事件','Node 15 起未处理拒绝默认会使进程退出','每个请求要有自己的错误响应，不能靠进程事件兜底'],
    refs:[['Node.js：unhandledRejection','https://nodejs.org/api/process.html#event-unhandledrejection'],['Node.js：uncaughtException','https://nodejs.org/api/process.html#event-uncaughtexception']]
  },
  {
    track:'frontend', group:'工程实践', id:'ssr-hydration',
    title:'水合要求两边第一次画出同一棵树',
    prompt:'服务端已经返回 HTML，为什么客户端仍提示 hydration mismatch？',
    core:'水合是在服务端已经输出的标记上挂上客户端的事件和状态，不是再渲染一棵不同的树。服务端首次输出和客户端首次渲染必须一致。只在浏览器存在的 API、渲染期间的随机数或当前时间、以及不合法的 HTML 嵌套，都会让两边不一致。Vue 和 React 都会对此发出警告，并可能按客户端结果改写 DOM。',
    why:'不一致时，用户先看到的 HTML 和随后可交互的树不是同一份，点击和输入会落到错误的节点上。',
    example:'服务端用固定文案渲染时间，客户端在水合完成后再显示本地时间。若两边在首次渲染就各算一次 Date.now()，标记对不上。',
    task:'故意让服务端和客户端的一段文本不同，记录警告出现的位置，再把差异移到水合之后。',
    answer:'首次标记必须一致。依赖浏览器环境的内容放到水合完成之后，而不是写进首次渲染。',
    keywords:'SSR hydration mismatch Vue React 水合',
    points:['水合挂在已有 HTML 上，不是再造一棵不同的树','首次服务端标记和客户端标记必须一致','浏览器专有数据放到水合完成之后'],
    refs:[['Vue：服务端渲染','https://vuejs.org/guide/scaling-up/ssr.html'],['React：hydrateRoot','https://react.dev/reference/react-dom/client/hydrateRoot']]
  },
  {
    track:'java', group:'数据库', id:'mysql-null-comparison',
    title:'NULL 不是空字符串，等号也筛不出它',
    prompt:'WHERE name = NULL 为什么找不到空着的名字？',
    core:'在 SQL 里，NULL 表示未知，不是空字符串，也不是 0。NULL = NULL 的结果不是 TRUE。WHERE 只保留判断结果为 TRUE 的行，所以等号和不等号都筛不出 NULL。要写 IS NULL 或 IS NOT NULL。COUNT(列) 不计入该列为 NULL 的行，COUNT(*) 计入每一行。NOT IN 的列表里若出现 NULL，整个判断可能变成未知，结果会空。',
    why:'把 NULL 当成“没有填的普通值”，统计、过滤和子查询都会在不知不觉中少行。',
    example:'三行名字分别是 Alice、空字符串和 NULL。name = \'\' 只命中空字符串。name IS NULL 只命中 NULL。COUNT(name) 比 COUNT(*) 少 1。',
    task:'建一张含 NULL 和空字符串的表，分别用等号、IS NULL、COUNT(列) 和带 NULL 的 NOT IN 查询，记下各自的行数。',
    answer:'未知值用 IS NULL。等号比的是值。聚合计数要分清是在数行还是在数非 NULL 的列。',
    keywords:'MySQL NULL IS NULL COUNT NOT IN 三值逻辑',
    points:['NULL 表示未知，和空字符串不同','WHERE 的等号保留不了 NULL 行','COUNT(列) 跳过 NULL，COUNT(*) 计入行'],
    refs:[['MySQL 8.4：NULL 的问题','https://dev.mysql.com/doc/refman/8.4/en/problems-with-null.html'],['MySQL 8.4 手册镜像：NULL','https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/problems-with-null.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-data-types',
    title:'先选 Redis 结构，再谈过期',
    prompt:'会话、排行榜和消息流水，都能塞进一个 String 吗？',
    core:'Redis 为不同访问方式提供不同结构。String 适合把一个小值整体读写。Hash 适合在一个键下更新单个字段。List 按插入顺序做两端操作。Set 做无序去重。Sorted Set 按分数排序，适合排行榜。Stream 适合追加并按游标读取的日志。把排行榜存成一整段 JSON String，每次改一名次都要重写整个值。过期和持久化是另外的机制，不能用来代替结构选择。',
    why:'结构选错以后，命令的复杂度和并发更新方式都会错，加机器也补不回。',
    example:'用户资料里只改邮箱，用 Hash 的单字段写入。在线排行用 Sorted Set 按分数取前十名。事件流水追加到 Stream。',
    task:'为会话、排行榜和审计流水各选一种结构，写出要支持的读法和为什么不用 String 包一层 JSON。',
    answer:'按字段更新、按分数排序、按追加读取分别对应 Hash、Sorted Set 和 Stream。整体替换的小值才用 String。',
    keywords:'Redis String Hash Sorted Set Stream 数据结构',
    points:['String 适合整体读写一个值','Hash、Set、Sorted Set 对应字段、去重和按分数排序','Stream 适合追加日志，过期不能代替结构'],
    refs:[['Redis：数据类型','https://redis.io/docs/latest/develop/data-types/']]
  },
  {
    track:'java', group:'安全', id:'spring-authn-authz',
    title:'登录成功还不等于可以调用',
    prompt:'用户已经登录，为什么管理接口仍可能返回拒绝？',
    core:'认证回答请求来自谁，授权回答这个身份能否做该操作。Spring Security 在进入控制器之前用过滤器链处理这两步。匿名、已认证但权限不足、以及持有所需权限，是不同的授权结果。控制器里只判断对象非空，覆盖不了过滤器链上的规则，也覆盖不了方法上的权限表达式。',
    why:'把“能登录”当成“能做所有事”，管理接口和普通接口会共用同一条过高的权限。',
    example:'用户登录后可以读取自己的订单。调用停用他人账号的接口时，认证已经通过，授权仍因缺少管理员权限而拒绝。',
    task:'为同一用户设计两个接口：一个只要已认证，一个还要特定权限。分别用匿名、普通用户和管理员访问，记录结果。',
    answer:'认证建立身份。授权按规则决定能否执行。两者都要在进入业务代码前成立。',
    keywords:'Spring Security authentication authorization 认证 授权 过滤器链',
    points:['认证确定身份，授权确定能否操作','已认证用户仍可能权限不足','过滤器链上的规则不能只靠控制器判空代替'],
    refs:[['Spring Security：认证架构','https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html'],['Spring Security：授权','https://docs.spring.io/spring-security/reference/servlet/authorization/index.html']]
  },
  {
    track:'java', group:'系统设计', id:'sql-keyset-page',
    title:'深分页不要靠越来越大的 OFFSET',
    prompt:'为什么第 1 页很快，翻到第 10000 页就越来越慢？',
    core:'LIMIT 在大 OFFSET 之后取一页时，服务器仍要先产生并丢弃前面的行，偏移越大成本越高。并发插入和删除还会让同一页码对应的行集合前后漂移。基于上一页最后一条排序键继续取“更大的键”，每次只扫描下一页，代价稳定，但不能直接跳到任意页码。两种方式都要有唯一且稳定的排序，否则相邻页会重复或漏行。',
    why:'管理后台的翻页变慢，常常是分页方式在惩罚深度，不是单行查询本身变贵。',
    example:'按 (created_at, id) 排序。下一页条件是 created_at 更大，或时间相同且 id 更大，再 LIMIT 20。不要用 OFFSET 200000。',
    task:'对同一张大表分别测 OFFSET 0、OFFSET 100000 和按最后一条键继续取下一页的耗时与返回是否重叠。',
    answer:'深页用稳定排序键续取。OFFSET 适合浅页。页与页之间要靠唯一排序避免重复和遗漏。',
    keywords:'MySQL LIMIT OFFSET keyset pagination 深分页',
    points:['大 OFFSET 仍要先产生被丢弃的行','排序键续页的代价不随页码线性变大','翻页排序必须稳定且唯一'],
    refs:[['MySQL 8.4：SELECT 与 LIMIT','https://dev.mysql.com/doc/refman/8.4/en/select.html'],['MySQL 8.4 手册镜像：SELECT','https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/select.html']]
  },
  {
    track:'java', group:'工程实践', id:'java-http-timeout',
    title:'建连超时管不到整次调用',
    prompt:'HttpClient 的连接超时设成 3 秒，这次请求就一定会在 3 秒内结束吗？',
    core:'Java HttpClient 的 connectTimeout 只限制建立新连接。连接可以复用时，这段超时不起作用。HttpRequest 的 timeout 限制这一次请求等待响应的时间，到点仍未收到响应就抛出 HttpTimeoutException。不设置请求超时时，等待时间没有上限。DNS、从连接池借出、以及响应开始之后的读取，都要单独看对应的超时，不能用一个建连数字代表整条调用。',
    why:'只调连接超时会让慢响应一直占着线程，调用方以为已经设过“3 秒失败”。',
    example:'下游接受了连接，但 30 秒不返回正文。connectTimeout 已满足，请求仍一直等到请求超时；若没设请求超时，就一直阻塞。',
    task:'分别让端口拒绝连接，以及连接成功后不返回响应。记录哪一个超时先触发。',
    answer:'建连超时只覆盖新连接。单次请求还要设置响应超时。复用连接时建连超时不再生效。',
    keywords:'Java HttpClient connectTimeout HttpRequest timeout 超时',
    points:['connectTimeout 只限制建立新连接','请求 timeout 限制等到响应的时间','不设请求超时就会一直阻塞'],
    refs:[['Java SE 21：HttpClient.Builder','https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.Builder.html'],['Java SE 21：HttpRequest.Builder','https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpRequest.Builder.html']]
  },
  {
    track:'java', group:'测试', id:'junit-instance-lifecycle',
    title:'测试要能单独跑、换序也能跑',
    prompt:'第二个测试方法为什么看得到第一个测试放进 List 的数据？',
    core:'JUnit Jupiter 默认对每个测试方法创建新的测试实例，实例字段因此不会自动带到下一个方法。静态字段、单例、没关闭的外部资源和静态替换过的依赖仍然跨方法保留。若把生命周期改成每个类一个实例，实例字段也会在方法之间留下来。测试应能单独运行，也能按任意顺序运行。',
    why:'依赖上一个测试留下的数据，会让本地全量通过、单独重跑失败，失败也无法定位。',
    example:'静态 List 在第一个测试里 add 一项。第二个测试断言列表为空就会失败。改成方法内的局部列表后，两个测试互不影响。',
    task:'写两个测试共用一个静态集合，单独运行第二个。再改成每个测试自己的数据，确认顺序变化不影响结果。',
    answer:'默认的新实例只隔离实例字段。静态和外部状态要自己清理。测试之间不能有顺序依赖。',
    keywords:'JUnit 5 TestInstance PER_METHOD 测试隔离',
    points:['默认每个测试方法使用新实例','静态字段和外部单例仍会泄漏','测试必须能单独运行且与顺序无关'],
    refs:[['JUnit 5：测试实例生命周期','https://junit.org/junit5/docs/current/user-guide/#writing-tests-test-instance-lifecycle']]
  },
  {
    track:'java', group:'工程实践', id:'otel-three-signals',
    title:'日志、指标、链路回答不同的问题',
    prompt:'服务已经打了很多日志，为什么仍看不出一次请求慢在哪一段？',
    core:'OpenTelemetry 把观测分成三类信号。Trace 由 Span 组成，描述一次操作经过哪些服务、每段花了多久。Metric 是可聚合的数字，用来看趋势和告警。Log 是带时间的事件。只有日志时，跨服务的因果关系要靠人去对时间。把同一条 trace 的标识写进日志，才能从一条慢请求跳到对应的事件。三类信号互相补充，不能用更多日志代替另外两类。',
    why:'排障时先选对信号：个别请求用链路，整体变慢用指标，具体现场用日志。',
    example:'结账 P99 上升先看指标。点开一条慢请求的 Span，看到支付调用占了大部分时间。再用这条 trace 的标识过滤支付服务的日志。',
    task:'为一次跨两个服务的请求标出：哪个数字适合做指标，哪段耗时适合做 Span，哪条失败原因适合写日志。',
    answer:'指标看整体，链路看单次路径，日志看事件细节。用同一个 trace 标识把链路和日志连起来。',
    keywords:'OpenTelemetry trace metric log span 可观测性',
    points:['Trace 描述一次操作穿过的路径和耗时','Metric 是可聚合的趋势和告警数据','日志记录事件，并用 trace 标识和链路关联'],
    refs:[['OpenTelemetry：信号','https://opentelemetry.io/docs/concepts/signals/'],['OpenTelemetry：上下文传播','https://opentelemetry.io/docs/concepts/context-propagation/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_PATH) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
