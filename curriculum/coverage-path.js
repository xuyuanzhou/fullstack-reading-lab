/* Path completion: original lessons for gaps between the existing groups. */
const COVERAGE_PATH = [
  {
    track:'frontend', group:'CSS 与布局', id:'css-box-sizing',
    title:'width 含不含 padding',
    prompt:'元素设了 width:100%，为什么一加 padding 就溢出父元素？',
    promptAnswer:'content-box 的 padding/border 加在 width 外。border-box 把它们算进设定宽度。',
    core:'CSS 的初始 box-sizing 是 content-box。这时 width 和 height 只约束内容盒，padding 和 border 加在外面，margin 再在更外面。改成 border-box 后，width 和 height 把内容和内边距、边框一起算进去，margin 仍然不算。百分比宽度相对于包含块的宽度，不是相对于视口。',
    why:'学习者会把 width 当成边框外沿。100% 宽的输入加上 16px 内边距后，父级出现横向滚动条，于是去改 overflow。开发者工具里内容宽加上 padding 和 border 超过设定宽度，才说明内边距加在内容盒外面。',
    example:'父元素宽 320px。子元素 width:100%、padding:16px、border:1px solid，在 content-box 下总宽度会超过 320px。同一组数值在 border-box 下，内容区变窄，外边仍是 320px。',
    task:'在两种 box-sizing 下用开发者工具读出内容宽度、padding、border 和总宽度，确认 margin 始终在设定宽度之外。',
    answer:'content-box 下内容宽等于设定的 width，左右 padding 和 border 都加在外面，总宽度超出父元素。border-box 下这几项之和等于设定宽度，内容区被挤窄。两种模式读出的 margin 都在设定宽度之外，所以改盒模型消不掉外边距造成的空隙。',
    keywords:'CSS box-sizing content-box border-box padding width 盒模型',
    points:['content-box 的 width 只含内容','border-box 把 padding 和 border 算进 width','margin 不进入 width 或 height'],
    deep:[
      {title:'内容盒与边框盒',body:'width 在 content-box 里只锁内容，padding 和 border 向外加，百分比相对包含块。改成 border-box 后，设定宽度改锁内容加内边距加边框，margin 仍留在这道宽度之外。'},
      {title:'怎样自己验证',body:'在开发者工具里选中子元素，切换 box-sizing，读 Computed 的 width、padding 和 border。content-box 时三者相加大于父宽；border-box 时相加等于设定宽度，margin 两种都不计入。'}
    ],
    refs:[['MDN：box-sizing','https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing'],['MDN：CSS 盒模型','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction']]
  },
  {
    track:'frontend', group:'CSS 与布局', id:'css-grid-flex',
    title:'Flex 排一条轴，Grid 排行列',
    prompt:'页面布局是不是都应该改成 Grid？',
    core:'Flexbox 沿一条主轴分配空间，交叉轴负责对齐，适合导航、工具栏和单行卡片。Grid 同时定义行和列，适合页面分区和二维对齐。二者可以嵌套：外层用 Grid 划分区域，区域内部再用 Flex 排一行控件。换成 Grid 不会自动解决内容最小尺寸和溢出。顺序上先决定这一层是一条轴还是一组行列，再写对齐和间距。容器变窄时，Flex 按换行和基准宽度把多出来的子项挪到下一行，Grid 按轨道模板决定列是否塌掉。边界是子项的最小内容尺寸：长单词和未缩放的图片仍会撑破轨道，换成 Grid 不会自动把它们缩小，溢出要单独处理。溢出要在这一层单独写规则，不能指望换模型就消失。',
    why:'学习者会以为页面布局都该换成 Grid。导航被写成单列轨道后，按钮不再靠交叉轴两端对齐，缩窄窗口时整栏被拉成竖排，调 gap 也回不到一行。子项是沿一条轴分剩余空间，还是同时锁住行和列，才分得清该用哪一层。',
    example:'同一组四个按钮，容器从 640px 收到 280px。Flex 一行在放不下时落到第二行，主轴间距仍在，顺序仍是从左到右。两列 Grid 把轨道压窄，四个按钮仍是两列，不会自动变成一行工具栏。列数保持为 2。',
    task:'用同一组子项分别做一行 Flex 和两列 Grid，改变容器宽度，记录换行和轨道各自怎么变。',
    answer:'四个按钮做成一行时，容器收到 280px 后按 Flex 换行落到第二行，主轴仍在分配剩余空间。做成两列 Grid 时轨道数仍是 2，变的只是列宽。外层 Grid 划分侧栏和主区后，主区里的筛选条仍用 Flex 排一条轴，换模型不会取消子项的最小宽度。',
    keywords:'CSS Grid Flexbox 一维 二维 布局',
    points:['Flex 在一条主轴上分配空间','Grid 同时定义行和列','两种布局可以嵌套，互不替代'],
    deep:[
      {title:'轴与轨道',body:'Flex 先定主轴方向，剩余空间按伸展系数分，交叉轴只负责对齐。Grid 先定行轨道和列轨道，子项按格子落位。嵌套时外层轨道不会改写内层主轴上的分配方式。最小内容尺寸仍可能撑破轨道。'},
      {title:'怎样自己验证',body:'用同一组子项各做一份 Flex 和两列 Grid，把容器从 640px 拖到 280px。记录 Flex 是否换行、Grid 的列数是否还是两列，以及长单词有没有把轨道撑出横向滚动条。'}
    ],
    refs:[['MDN：Grid 与其他布局的关系','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Relationship_with_other_layout_methods'],['MDN：Flexbox 基本概念','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http-connection-reuse',
    title:'一次握手不等于一个资源',
    prompt:'页面有六张图，浏览器就一定做六次完整的 TCP 握手吗？',
    core:'HTTP/1.1 默认使用持久连接，同一条连接上可以连续发送多个请求。浏览器对同一源的并发连接数有上限，多出来的请求会等待空闲连接。HTTP/2 在一条连接上用多个流复用请求。若缓存仍然新鲜，对应资源可能根本不再发请求。资源个数、请求个数和握手次数是三件不同的事。顺序是先查缓存，新鲜则不发请求；要发时才找空闲连接，没有才握手。HTTP/1.1 在这条连接上一个接一个发，同域并发有上限，超出的请求在队列里等。HTTP/2 把多个请求拆成同一连接上的流。边界是连接被关掉、协议降级，或资源来自另一个源，才会重新握手，缓存命中则连请求都没有。另一源的图片仍会单独握手。',
    why:'学习者会把瀑布图里每一行都当成一次新的握手。六张图排队时，他把等待算成握手慢，于是去减图片体积，延迟却仍卡在同一条连接的队头。同一连接标识上连续出现多个请求，才说明这次慢在复用后的排队。',
    example:'同一源六张图，前几张连接标识相同，状态都是 200，后一张要等前一张发送完才开始。第六张的等待在已有连接的队列里，计时没有新的初始连接。若一张来自磁盘缓存，请求行只剩五条，握手次数仍远少于六。排队行没有握手段。',
    task:'在网络面板里对同一源的多张图记录连接 ID，区分复用、排队和缓存命中。',
    answer:'同一源多张图应记下相同的连接标识，表示复用而不是各握一次手。超出并发上限的请求状态仍是排队，计时里没有新的握手段。缓存仍新鲜的那张没有请求行，所以资源数、请求数和握手次数要分三列记，不能按图片张数推断握手。不能按图片张数推断握手次数，要分开计。',
    keywords:'HTTP keep-alive HTTP/2 connection reuse 持久连接 瀑布图',
    points:['HTTP/1.1 默认可在同一连接上连续请求','同域并发连接有上限，超出的请求会排队','缓存命中时不再为该资源建立请求'],
    deep:[
      {title:'连接复用与排队',body:'持久连接上可以连续发多个请求。同域并发达到上限后，后来的请求等空闲连接，而不是再做一次握手。HTTP/2 则在一条连接里用多个流并行。缓存新鲜时这一行根本不出现。'},
      {title:'怎样自己验证',body:'打开网络面板，先禁用缓存刷新，再启用缓存刷新。对同一源图片记下连接标识、是否排队、有没有初始连接。第二次来自磁盘缓存的行不应再占一条新连接。缓存行不应出现新的连接标识。'}
    ],
    refs:[['MDN：HTTP/1.x 连接管理','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x'],['MDN：HTTP/2','https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2']]
  },
  {
    track:'frontend', group:'安全', id:'cookie-credential',
    title:'Cookie 自动带上，localStorage 不会',
    prompt:'登录令牌放进 localStorage，和放进 Cookie，浏览器的行为有什么不同？',
    core:'Cookie 按域、路径、Secure、HttpOnly 和 SameSite 决定是否自动附在后续请求上。HttpOnly 的 Cookie 不能通过 document.cookie 读取。没有 Max-Age 或 Expires 时，它是会话 Cookie，会话结束即删除。SameSite=None 必须同时标记 Secure。localStorage 只留在该源的页面存储里，不会自动随请求发送，但同源脚本可以读到它。',
    why:'学习者会以为只要刷新后还在，两种存放就一样。令牌放进 localStorage 后接口返回 401，因为浏览器没有自动带上它；若改成脚本手动加头，页面里任何脚本都能把这串值读出来。请求头里有没有 Cookie、脚本能不能读到，才把两种存放分开。',
    example:'登录响应设置了带 HttpOnly 的会话 Cookie。随后请求的请求头里自动出现 Cookie，控制台读 document.cookie 却没有这项。把同一令牌写入 localStorage 后，请求头里没有它，状态是 401；页面脚本却能直接读出整串令牌。',
    task:'分别设置 HttpOnly Cookie 和 localStorage 项，检查 document.cookie、请求头和关闭浏览器后的残留。',
    answer:'HttpOnly Cookie 会出现在匹配请求的请求头里，document.cookie 读不到它；没有过期时间时关掉浏览器后会话消失。localStorage 刷新还在，但请求头里不会自动出现，同源脚本可以读到。自动提交和脚本可读是两道分开的检查。',
    keywords:'Cookie HttpOnly SameSite Secure localStorage 会话',
    points:['Cookie 按属性自动附在匹配的请求上','HttpOnly 阻止脚本读取该 Cookie','localStorage 不自动发送，同源脚本可以读取'],
    deep:[
      {title:'自动附带与脚本可读',body:'Cookie 按域、路径和 SameSite 决定是否附在请求上。HttpOnly 挡住脚本读取。localStorage 只留在该源页面里，请求不会自动带上，同源脚本却能读到这项。'},
      {title:'怎样自己验证',body:'分别设置 HttpOnly Cookie 和一项 localStorage。在控制台读 document.cookie，在网络面板看下一请求的请求头，再关掉浏览器重开。Cookie 看得到头、读不到脚本；存储项相反。'}
    ],
    refs:[['MDN：Set-Cookie','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie'],['MDN：localStorage','https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage']]
  },
  {
    track:'frontend', group:'安全', id:'csrf-boundary',
    title:'CORS 管不了跨站带凭证提交',
    prompt:'接口已经配置了 CORS，为什么状态变更仍要防跨站请求？',
    promptAnswer:'脚本读跨源响应这条路归 CORS：没有允许的源，脚本拿不到响应体。表单把 Cookie 提交到你的源这条路归 Cookie 的 SameSite 和来源校验，CORS 白名单不会取消自动附带。',
    core:'CORS 决定浏览器里的脚本能否读取跨源响应，并不阻止浏览器发出请求。用户已经持有 Cookie 时，另一个网站上的表单仍可能把 Cookie 带到你的源，只要 Cookie 的 SameSite 等规则允许。跨站请求伪造防的是“浏览器替已登录用户提交”，不是防响应被脚本读走。防护包括收紧 SameSite、校验来源，以及不把会改状态的操作做成 GET。允许的 CORS 源列表不能代替这些措施。',
    why:'学习者会以为接口配了 CORS 就不会被别的网站改数据。另一个站点上的表单仍把会话 Cookie 提交过来，转账已经成功，而那个页面的脚本其实读不到银行的 JSON。响应能不能被脚本读走，和请求会不会自动带上 Cookie，要用两道信号分开。',
    example:'已登录用户打开另一站点，该页表单向银行发起转账 POST。请求状态 200，请求头里带有银行 Cookie，余额减少。该页脚本读响应时被 CORS 拦住。银行允许自家前端读 JSON，并没有挡住这次表单提交。',
    task:'画出“脚本读跨源响应”和“表单把 Cookie 提交到你的源”两条路径，分别标出 CORS 和 SameSite 各自管哪一条。',
    answer:'脚本读跨源响应这条路归 CORS：没有允许的源，脚本拿不到响应体。表单把 Cookie 提交到你的源这条路归 Cookie 的 SameSite 和来源校验，CORS 白名单不会取消自动附带。改状态仍要校验来源，并且不能改成靠 GET 完成。',
    keywords:'CSRF CORS SameSite Cookie 跨站请求',
    points:['CORS 限制脚本读取跨源响应','浏览器仍可能自动带上符合规则的 Cookie','改状态的接口不能只靠 CORS 白名单'],
    deep:[
      {title:'读响应与带凭证提交',body:'CORS 只决定页面脚本能不能读跨源响应，浏览器照样把请求发出去。Cookie 是否附上，看域、路径和 SameSite。表单可以提交成功，发起页却仍然读不到响应体。'},
      {title:'怎样自己验证',body:'用两个源。一页用脚本去读接口，看控制台是否因跨源读失败。另一页放会改数据的表单指向该接口，在网络面板看请求是否带上 Cookie、状态是否为 200。两条路径的状态码要分开记。'}
    ],
    refs:[['MDN：跨站请求伪造','https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF'],['MDN：CORS','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-unhandled-rejection',
    title:'请求里的错误不要交给进程兜底',
    prompt:'异步函数里抛出的错误，和没人接收的 Promise 拒绝，都会变成同一种请求失败吗？',
    core:'同步异常若冒泡到事件循环之外，会触发 uncaughtException，默认行为可能结束进程。Promise 拒绝且没有拒绝处理函数时，会触发 unhandledRejection。Node 从 15 起，未处理的拒绝默认导致进程以非零状态退出。请求处理函数应在该请求路径上捕获错误并写回响应。进程级事件只适合记录和决定是否退出，不能代替每一个请求的错误边界。',
    why:'学习者会把进程退出当成这一次请求的 500。数据库拒绝没人接住时，当前连接没有写回状态码，随后进程以非零状态退出，别的请求一起被掐断。日志里先出现未处理拒绝，而不是一条写好的 500，才说明错误逃出了这条请求。',
    example:'路由里查询失败且没有捕获。该请求没有状态码写回，日志先打出未处理拒绝，退出码非 0，另一个正在处理的请求被中断。加上捕获后，同一失败只让这一条返回 500，进程仍在，另一条得到 200。退出前没有 500 响应体。',
    task:'分别在请求处理函数内外抛出同步异常和 Promise 拒绝，记录响应是否写回、进程是否退出。',
    answer:'在请求函数里捕获同步异常或拒绝时，应只给这一条写回 500，进程保持运行，另一条并发请求仍返回 200。函数外面的同步异常和没人接收的拒绝是进程级事件；后者默认让进程以非零状态退出，其他连接一起中断，没有单独的失败响应。进程事件不能冒充这一条请求的失败响应。',
    keywords:'Node.js unhandledRejection uncaughtException Promise 错误边界',
    points:['未捕获同步异常和未处理拒绝走不同的进程事件','Node 15 起未处理拒绝默认会使进程退出','每个请求要有自己的错误响应，不能靠进程事件兜底'],
    deep:[
      {title:'请求边界与进程事件',body:'同步异常冒出事件循环会触发未捕获异常。没有拒绝处理函数的 Promise 触发未处理拒绝。二者都是进程级事件，默认可能结束进程。只有请求路径上的捕获才能把这一次失败写成响应。'},
      {title:'怎样自己验证',body:'起一个同时处理两个请求的进程。一个路由去掉捕获让查询拒绝，另一个正常返回。看第一条有没有状态码、进程是否退出，以及第二条是被中断还是仍返回 200。两条请求的状态码要同时看。'}
    ],
    refs:[['Node.js：unhandledRejection','https://nodejs.org/api/process.html#event-unhandledrejection'],['Node.js：uncaughtException','https://nodejs.org/api/process.html#event-uncaughtexception']]
  },
  {
    track:'frontend', group:'工程实践', id:'ssr-hydration',
    title:'水合要求两边第一次画出同一棵树',
    prompt:'服务端已经返回 HTML，为什么客户端仍提示 hydration mismatch？',
    promptAnswer:'故意让两边首次文本不同时，警告出现在水合阶段，DOM 会被改写成客户端那一版，点击落到新节点上。',
    core:'水合是在服务端已经输出的标记上挂上客户端的事件和状态，不是再渲染一棵不同的树。服务端首次输出和客户端首次渲染必须一致。只在浏览器存在的 API、渲染期间的随机数或当前时间、以及不合法的 HTML 嵌套，都会让两边不一致。Vue 和 React 都会对此发出警告，并可能按客户端结果改写 DOM。顺序是服务端先写出 HTML，客户端在这棵树上挂事件，而不是另画一棵。两边第一次渲染必须得到同一段标记。边界是水合完成之后：那时再用浏览器的时间、随机数或窗口宽度更新，警告就不会出现。嵌套不合法的标签会在解析时被浏览器改树，同样对不上服务端输出。水合前改写文本会让点击落到另一棵树。',
    why:'学习者会以为服务端已经给了 HTML，客户端再渲染一次也没差。两边首次各算一次时间后，控制台报水合不一致，按钮点下去改的是另一段文本。警告指向的那段文字在两边首次输出里不同，才说明不是事件没绑上。',
    example:'服务端把时间渲染成固定的 12:00，客户端首次渲染得到 12:01。水合时报不一致，页面文本被改成 12:01，点击改的是后一棵树。把取时间挪到水合完成之后，首次两边都是 12:00，警告消失，随后才变成本地时间。',
    task:'故意让服务端和客户端的一段文本不同，记录警告出现的位置，再把差异移到水合之后。',
    answer:'故意让两边首次文本不同时，警告出现在水合阶段，DOM 会被改写成客户端那一版，点击落到新节点上。把这段差异移到水合完成之后再更新，首次标记都是同一句文案，警告不再出现。浏览器专有的时间和随机数不能写进第一次渲染。随后的更新才允许使用浏览器时间。',
    keywords:'SSR hydration mismatch Vue React 水合',
    points:['水合挂在已有 HTML 上，不是再造一棵不同的树','首次服务端标记和客户端标记必须一致','浏览器专有数据放到水合完成之后'],
    deep:[
      {title:'首次标记一致',body:'水合是在已有 HTML 上挂事件和状态。服务端首次输出和客户端首次渲染若不同，框架会警告，并可能按客户端结果改写 DOM，之后的点击就会落到另一棵树上。事件这时才挂到原有节点上。'},
      {title:'怎样自己验证',body:'让服务端输出固定文案，客户端首次渲染用当前时间。看控制台警告指向哪一段文字。再把取时间移到水合之后的更新里，刷新后警告应消失，文本随后才变。警告消失后才改文本。'}
    ],
    refs:[['Vue：服务端渲染','https://vuejs.org/guide/scaling-up/ssr.html'],['React：hydrateRoot','https://react.dev/reference/react-dom/client/hydrateRoot']]
  },
  {
    track:'java', group:'数据库', id:'mysql-null-comparison',
    title:'NULL 不是空字符串，等号也筛不出它',
    prompt:'WHERE name = NULL 为什么找不到空着的名字？',
    promptAnswer:'= NULL 得不到真。空值要用 IS NULL；空字符串和 UNKNOWN 不是一回事。',
    core:'在 SQL 里，NULL 表示未知，不是空字符串，也不是 0。NULL = NULL 的结果不是 TRUE。WHERE 只保留判断结果为 TRUE 的行，所以等号和不等号都筛不出 NULL。要写 IS NULL 或 IS NOT NULL。COUNT(列) 不计入该列为 NULL 的行，COUNT(*) 计入每一行。NOT IN 的列表里若出现 NULL，整个判断可能变成未知，结果会空。',
    why:'学习者会把 NULL 当成没填的空字符串。于是等号条件返回 0 行，按列计数也少算一行，报表变成没有空名字。同一列上 IS NULL 能命中、等号不能，才说明这是未知，不是一个可以相等的值。',
    example:'三行名字分别是 Alice、空字符串和 NULL。name = \'\' 只命中空字符串。name IS NULL 只命中 NULL。COUNT(name) 比 COUNT(*) 少 1。',
    task:'建一张含 NULL 和空字符串的表，分别用等号、IS NULL、COUNT(列) 和带 NULL 的 NOT IN 查询，记下各自的行数。',
    answer:'等号只命中空字符串那一行，命中不了 NULL，因为比较结果不是真，WHERE 不会留下它。IS NULL 只命中 NULL 那一行。按列计数比按行计数少 1。NOT IN 列表里若有 NULL，判断变成未知，结果行数可以是 0。空字符串和未知值各占一行。',
    keywords:'MySQL NULL IS NULL COUNT NOT IN 三值逻辑',
    points:['NULL 表示未知，和空字符串不同','WHERE 的等号保留不了 NULL 行','COUNT(列) 跳过 NULL，COUNT(*) 计入行'],
    deep:[
      {title:'和导论',body:'MySQL 是什么、容量框架与相对缓存/搜索见 mysql-what-and-when、mysql-tradeoffs-capacity、mysql-vs-cache-search。本课专讲 NULL 三值逻辑。'},
      {title:'三值逻辑',body:'NULL 与任何值比较，包括与另一个 NULL，结果都不是真。WHERE 只留下结果为真的行。按列计数不计 NULL，按行计数会计入。NOT IN 碰上 NULL 会让整个条件变成未知。'},
      {title:'怎样自己验证',body:'建三行：一个名字、一个空字符串、一个 NULL。依次跑等号、IS NULL、按列计数、按行计数，以及列表里带 NULL 的 NOT IN。四次行数不应把空字符串和 NULL 算进同一次结果。'}
    ],
    refs:[['MySQL 8.4：NULL 的问题','https://dev.mysql.com/doc/refman/8.4/en/problems-with-null.html'],['MySQL 8.4 手册镜像：NULL','https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/problems-with-null.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-data-types',
    title:'先选 Redis 结构，再谈过期',
    prompt:'会话、排行榜和消息流水，都能塞进一个 String 吗？',
    core:'Redis 为不同访问方式提供不同结构。String 适合把一个小值整体读写。Hash 适合在一个键下更新单个字段。List 按插入顺序做两端操作。Set 做无序去重。Sorted Set 按分数排序，适合排行榜。Stream 适合追加并按游标读取的日志。把排行榜存成一整段 JSON String，每次改一名次都要重写整个值。过期和持久化是另外的机制，不能用来代替结构选择。',
    why:'学习者会以为字符串结构能装下会话、排行榜和流水，过期以后再说。排行榜存成一整段 JSON 后，改一个名次就要重写整个值，并发更新互相覆盖。命令是改一个字段、按分数取范围，还是追加一条，才说明该用哪种结构。',
    example:'用户资料只改邮箱，名字字段仍在，不必重写整个值。排行榜写入一条分数后取前十，顺序按分数而不是写入先后。审计流水追加一条，再按上次的位置继续读，只返回这条新记录，状态是新增而不是整段覆盖。三次写入的命令各不相同。',
    task:'为会话、排行榜和审计流水各选一种结构，写出要支持的读法和为什么不用 String 包一层 JSON。',
    answer:'会话若只是整个替换的小值，用字符串结构一次读写。要按字段改邮箱，用哈希，避免重写整份资料。排行榜要按分数取前十，用有序集合，而不是把 JSON 取回来自己排。审计流水要追加并按游标往后读，用流。过期解决不了这三种读法。三种读法对应三种结构，不能共用一段 JSON。',
    keywords:'Redis String Hash Sorted Set Stream 数据结构',
    points:['String 适合整体读写一个值','Hash、Set、Sorted Set 对应字段、去重和按分数排序','Stream 适合追加日志，过期不能代替结构'],
    deep:[
      {title:'和导论',body:'Redis 是什么、容量框架与相对 DB 见 redis-what-and-when、redis-tradeoffs-capacity、redis-vs-db-cache。本课专讲结构选型。'},
      {title:'按访问方式选结构',body:'字符串一次读写整个值。哈希只改键下的一个字段。有序集合按分数取一段范围。流只追加，并用上次的游标接着读。过期和持久化不改变这些命令每次要动多少数据。整段重写会盖掉并发改过的其他字段。'},
      {title:'展开课',body:'Hash 字段更新见 redis-hash-field-update。ZSet 排行与范围见 redis-zset-rank-range。近似 UV 用 HyperLogLog 见 redis-hyperloglog-approx，它列不出成员。'},
      {title:'怎样自己验证',body:'对同一份排行先存成一整段字符串，改一名次要整段重写，看写入长度。再改成按分数写入并取前十名，返回应已按分数排好，且不会把其他成员重新写一遍。前十名的顺序应来自分数而不是写入时刻。'}
    ],
    refs:[['Redis：数据类型','https://redis.io/docs/latest/develop/data-types/']]
  },
  {
    track:'java', group:'安全', id:'spring-authn-authz',
    title:'登录成功还不等于可以调用',
    prompt:'用户已经登录，为什么管理接口仍可能返回拒绝？',
    promptAnswer:'登录是认证，管理接口还要授权。已登录仍可能因缺权限被拒绝。',
    core:'认证回答请求来自谁，授权回答这个身份能否做该操作。Spring Security 在进入控制器之前用过滤器链处理这两步。匿名、已认证但权限不足、以及持有所需权限，是不同的授权结果。控制器里只判断对象非空，覆盖不了过滤器链上的规则，也覆盖不了方法上的权限表达式。顺序是过滤器链先认证、再按规则授权，然后才进控制器。匿名请求没有身份；已登录但缺权限是另一种拒绝；权限够了才执行业务。边界是控制器里判断对象非空，看不出过滤器已经拒绝的那一次，也代替不了方法上的权限表达式，两种拒绝要分开记录。匿名、权限不足和允许执行要在日志里分成三种结果，不能只留一个失败码给调用方。',
    why:'学习者会把登录成功当成可以调用所有接口。普通用户打管理接口仍被拒绝，他却去查密码对不对，账号其实一直是已认证。响应是未认证，还是已认证但缺权限，才分得清该补登录，还是该补一条授权规则。',
    example:'同一用户访问自己的订单，认证通过，授权只要求已登录，返回 200，业务日志有一行。再访问停用他人账号，认证仍通过，但因缺少管理员权限被拒绝，业务方法没有日志。匿名访问订单则停在认证之前。三次的状态码分别是拒绝、200 和拒绝。',
    task:'为同一用户设计两个接口：一个只要已认证，一个还要特定权限。分别用匿名、普通用户和管理员访问，记录结果。',
    answer:'匿名访问应在认证阶段被拒绝，业务方法没有日志。普通用户访问只要已认证的接口时，两步都通过并返回 200。同一用户访问还要特定权限的接口时，认证已通过，授权因缺少该权限而拒绝。控制器里判断对象非空代替不了过滤器上的这两步。三次访问要得到三种不同的结果。',
    keywords:'Spring Security authentication authorization 认证 授权 过滤器链',
    points:['认证确定身份，授权确定能否操作','已认证用户仍可能权限不足','过滤器链上的规则不能只靠控制器判空代替'],
    deep:[
      {title:'认证与授权',body:'认证回答请求是谁。授权回答这个身份能否做这一次操作。已认证仍可能权限不足。过滤器链上的规则在控制器之前执行，方法上的权限表达式也要单独再满足一次。缺权限和未登录不是同一种拒绝。'},
      {title:'怎样自己验证',body:'用匿名、普通用户、管理员各打两个接口：一个只要求已认证，一个还要管理员权限。记下状态码，并在业务方法入口打日志，确认被拒绝的请求没有走进方法。管理员访问第二个接口应进入方法并返回成功。'}
    ],
    refs:[['Spring Security：认证架构','https://docs.spring.io/spring-security/reference/servlet/authentication/architecture.html'],['Spring Security：授权','https://docs.spring.io/spring-security/reference/servlet/authorization/index.html']]
  },
  {
    track:'java', group:'系统设计', id:'sql-keyset-page',
    title:'深分页不要靠越来越大的 OFFSET',
    prompt:'为什么第 1 页很快，翻到第 10000 页就越来越慢？',
    promptAnswer:'深分页用键集续取。巨大 OFFSET 要扫前面的行再丢掉，还会受并发插入影响。',
    core:'LIMIT 在大 OFFSET 之后取一页时，服务器仍要先产生并丢弃前面的行，偏移越大成本越高。并发插入和删除还会让同一页码对应的行集合前后漂移。基于上一页最后一条排序键继续取“更大的键”，每次只扫描下一页，代价稳定，但不能直接跳到任意页码。两种方式都要有唯一且稳定的排序，否则相邻页会重复或漏行。顺序是先用稳定且唯一的排序取出第一页，记住最后一行的排序键，下一页只查比它更大的键。偏移则每次都从第一行数起，再丢掉前面的行。边界是键集续页不能直接跳到任意页码；排序里若没有唯一列，相同时间的两行会在相邻两页里重复出现或被漏掉。页码只适合浅页，深页改用上一页末行的键继续取。',
    why:'学习者会以为翻得越深越慢，是单行查询变贵了。第 10000 页用很大的偏移时，数据库先产生并丢掉前面的行，耗时随偏移上涨，同一页码还会因插入而换成另一批行。下一页只比上一页最后的排序键更大，扫描仍是一页，才说明慢在被丢掉的前缀。',
    example:'按创建时间和主键排序，每页 20 行。偏移 0 很快。偏移 100000 仍要先越过十万行再取 20，耗时变长，并发插入后同一页码的主键和上次不同。改成时间更大、或时间相同且主键更大再取 20，与上一页不重叠，耗时接近第一页。',
    task:'对同一张大表分别测 OFFSET 0、OFFSET 100000 和按最后一条键继续取下一页的耗时与返回是否重叠。',
    answer:'偏移 0 很快并返回第一页。偏移 100000 变慢，因为前面的行仍要产生再丢掉，并发插入还会让同一页码的主键集合和上次不同。按最后一条的创建时间和主键续取时，耗时接近第一页，返回与上一页不重叠。排序里若没有唯一列，相邻页会重复或漏行。页码不能代替排序键。',
    keywords:'MySQL LIMIT OFFSET keyset pagination 深分页',
    points:['大 OFFSET 仍要先产生被丢弃的行','排序键续页的代价不随页码线性变大','翻页排序必须稳定且唯一'],
    deep:[
      {title:'偏移分页与键集分页',body:'大偏移先生成再丢弃前面的行，页码也会因插入和删除而漂移。键集分页用上一页最后的排序键继续取，代价不随页码变大，但不能直接跳到任意页码。排序必须稳定且唯一。偏移越大，被丢掉的行越多。'},
      {title:'怎样自己验证',body:'对同一张大表分别测偏移 0 和偏移 100000 的耗时，再按最后一行的排序键取下一页。对比三次耗时，并核对后两次结果的主键有没有重叠或漏行。键集那一页的主键应紧接上一页末行。'}
    ],
    refs:[['MySQL 8.4：SELECT 与 LIMIT','https://dev.mysql.com/doc/refman/8.4/en/select.html'],['MySQL 8.4 手册镜像：SELECT','https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/select.html']]
  },
  {
    track:'java', group:'工程实践', id:'java-http-timeout',
    title:'建连超时管不到整次调用（Java 11 HttpClient）',
    prompt:'HttpClient 的连接超时设成 3 秒，这次请求就一定会在 3 秒内结束吗？',
    core:'Java HttpClient（**JDK 11** 起，`java.net.http`）的 connectTimeout 只限制建立新连接。连接可以复用时，这段超时不起作用。HttpRequest 的 timeout 限制这一次请求等待响应的时间，到点仍未收到响应就抛出 HttpTimeoutException。不设置请求超时时，等待时间没有上限。DNS、从连接池借出、以及响应开始之后的读取，都要单独看对应的超时，不能用一个建连数字代表整条调用。',
    why:'学习者会以为连接超时设成 3 秒，整次调用就一定在 3 秒内结束。下游接受连接后一直不写响应，线程仍占着，调用方以为已经设过失败上限。异常是建连失败，还是等待响应超时，才分得清是端口没通，还是响应等待没有单独设限。',
    example:'建连超时和请求超时都是 3 秒。端口拒绝时，约 3 秒内建连失败，请求超时还没开始计。连接成功后对端不返回正文，建连已完成，大约再过 3 秒抛出等待响应超时。若去掉请求超时，第二次会一直阻塞，没有异常。',
    task:'分别让端口拒绝连接，以及连接成功后不返回响应。记录哪一个超时先触发。',
    answer:'端口拒绝连接时先触发建连超时，因为新连接建不起来，请求超时还没开始计。连接成功后不返回响应时，建连已经完成，要等这次请求的响应超时才失败。没设请求超时的那次会一直阻塞，没有异常。复用已有连接时，建连超时不再参与这一次调用。两次失败的异常类型应当不同。',
    keywords:'Java HttpClient connectTimeout HttpRequest timeout 超时',
    points:['connectTimeout 只限制建立新连接','请求 timeout 限制等到响应的时间','不设请求超时就会一直阻塞'],
    deep:[
      {title:'建连超时与请求超时',body:'建连超时只限制建立新连接，复用已有连接时它不起作用。请求上的超时限制这次等到响应的时间。不设请求超时，等待就没有上限。解析域名和从池里借连接要另外计时。借到连接之后，建连计时已经结束。'},
      {title:'怎样自己验证',body:'一次连拒绝连接的端口，一次连上后让对端不写任何响应。日志里记下哪一个超时先抛、耗时接近哪一项设置。再去掉请求超时，确认第二次一直不返回。第二次应在请求超时附近失败，而不是在建连超时附近。'}
    ],
    refs:[['Java SE 21：HttpClient.Builder','https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.Builder.html'],['Java SE 21：HttpRequest.Builder','https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpRequest.Builder.html']]
  },
  {
    track:'java', group:'测试', id:'junit-instance-lifecycle',
    title:'测试要能单独跑、换序也能跑（JUnit 5）',
    prompt:'第二个测试方法为什么看得到第一个测试放进 List 的数据？',
    promptAnswer:'默认每方法新实例只隔离实例字段。静态/共享集合会让测试互相看见数据。',
    core:'**JUnit Jupiter（JUnit 5）** 默认对每个测试方法创建新的测试实例，实例字段因此不会自动带到下一个方法。静态字段、单例、没关闭的外部资源和静态替换过的依赖仍然跨方法保留。若把生命周期改成每个类一个实例，实例字段也会在方法之间留下来。测试应能单独运行，也能按任意顺序运行。顺序是每个测试方法开始前创建新实例，方法结束就丢弃，所以实例字段不会带到下一个方法。静态字段、单例和没关掉的外部资源不在这条生命周期里。边界是若改成每个类一个实例，实例字段也会留下来；单独运行第二个方法时没有第一次写入，依赖顺序的断言就会失败。全量通过而单跑失败，说明断言依赖了别的方法留下的静态数据。',
    why:'学习者会以为测试按类从上到下跑，后一个方法可以接着用前一个放进列表的数据。单独重跑第二个时列表是空的，断言失败，全量却能通过，失败也指不出是哪条规格坏了。第二个方法单独运行仍失败，改成方法内数据后换序也通过，才说明泄漏的是静态状态。',
    example:'静态列表在第一个测试里加入一项，断言大小为 1，通过。第二个断言列表为空，全量运行失败，实际大小是 1。只运行第二个时列表为空，这个断言反而通过。改成每个方法自己的局部列表后，两种顺序都通过。顺序一换，通过和失败对调。',
    task:'写两个测试共用一个静态集合，单独运行第二个。再改成每个测试自己的数据，确认顺序变化不影响结果。',
    answer:'两个测试共用静态集合时，单独运行第二个看不到第一个加入的那一项，断言为空会失败或碰巧通过，结果取决于有没有先跑第一个。默认的新实例只隔离实例字段。改成每个测试自己的局部数据后，交换方法顺序两次都通过，测试之间不能再有顺序依赖。全量和单跑的差异就是顺序依赖。',
    keywords:'JUnit 5 TestInstance PER_METHOD 测试隔离',
    points:['默认每个测试方法使用新实例','静态字段和外部单例仍会泄漏','测试必须能单独运行且与顺序无关'],
    deep:[
      {title:'实例生命周期',body:'默认每个测试方法一个新实例，实例字段不会自动带到下一个方法。静态字段、单例、未关闭的资源和被替换的静态依赖仍会跨方法留下。改成每个类一个实例后，实例字段也会留下来。'},
      {title:'怎样自己验证',body:'写两个测试共用一个静态列表，第一个加入一项，第二个断言为空。先跑全类，再只跑第二个，比较两次结果。然后改成方法内的局部列表，交换顺序再跑，两次都应通过。单跑与全量的结果必须一致。'}
    ],
    refs:[['JUnit 5：测试实例生命周期','https://junit.org/junit5/docs/current/user-guide/#writing-tests-test-instance-lifecycle']]
  },
  {
    track:'java', group:'工程实践', id:'otel-three-signals',
    title:'日志、指标、链路回答不同的问题',
    prompt:'服务已经打了很多日志，为什么仍看不出一次请求慢在哪一段？',
    promptAnswer:'指标看整体，链路看这一次哪一跳，日志看失败原因。只堆日志对不出跨服务耗时。',
    core:'OpenTelemetry 把观测分成三类信号。Trace 由 Span 组成，描述一次操作经过哪些服务、每段花了多久。Metric 是可聚合的数字，用来看趋势和告警。Log 是带时间的事件。只有日志时，跨服务的因果关系要靠人去对时间。把同一条 trace 的标识写进日志，才能从一条慢请求跳到对应的事件。三类信号互相补充，不能用更多日志代替另外两类。',
    why:'学习者会以为日志打得够多，就能看出一次请求慢在哪一段。结账变慢时，两边服务只有时间戳，对不出是哪一次调用占了大头，于是继续加日志，告警却没有一个可聚合的数字。先看到耗时分位上升，再按追踪标识跳到同一次请求，才分得清整体慢还是这一次路径慢。',
    example:'结账接口的慢请求分位从 200 毫秒升到 2 秒，指标先报警。打开其中一条追踪，支付那段占了 1.8 秒，订单那段只有 40 毫秒。用这条追踪的标识过滤支付日志，得到该次超时的错误行。只看时间线时两段对不到同一次请求。',
    task:'为一次跨两个服务的请求标出：哪个数字适合做指标，哪段耗时适合做 Span，哪条失败原因适合写日志。',
    answer:'跨两个服务时，请求次数和慢请求分位适合做指标，用来看整体是不是变慢。每一跳的耗时适合做一段追踪，用来看这一次慢在订单服务还是支付服务。失败原因适合写日志，并用同一个追踪标识和这条链路连起来。只加日志对不出同一次请求的两段耗时。三类信号回答的是三个不同的问题。',
    keywords:'OpenTelemetry trace metric log span 可观测性',
    points:['Trace 描述一次操作穿过的路径和耗时','Metric 是可聚合的趋势和告警数据','日志记录事件，并用 trace 标识和链路关联'],
    deep:[
      {title:'三种信号',body:'指标是可聚合的趋势，用来告警。追踪由一段段跨度组成，描述一次操作穿过哪些服务、每段花了多久。日志是带时间的事件。把追踪标识写进日志，才能从一条慢请求跳到对应现场。'},
      {title:'怎样自己验证',body:'打一次跨两个服务的慢请求。在指标里看慢请求分位，在链路里点开各段看哪一段最长，再用该追踪标识去过滤日志。三处应指向同一次请求，而不是只靠时间戳硬对。过滤条件用追踪标识，不用大约的时间范围。'}
    ],
    refs:[['OpenTelemetry：信号','https://opentelemetry.io/docs/concepts/signals/'],['OpenTelemetry：上下文传播','https://opentelemetry.io/docs/concepts/context-propagation/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_PATH) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
