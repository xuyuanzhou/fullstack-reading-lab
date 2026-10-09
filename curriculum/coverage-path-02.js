/* Second path pass: mechanisms the first 128 lessons still left unconnected. */
const COVERAGE_PATH_02 = [
  {
    track:'frontend', group:'浏览器', id:'dom-event-flow',
    title:'事件先捕获，再到达目标，然后冒泡',
    prompt:'点在按钮上，为什么父元素的监听器也会执行？',
    core:'一次 DOM 事件先从 window 走到目标（捕获），在目标上触发，再按原路返回（冒泡）。eventPhase 用 1、2、3 区分这三段。监听器默认在冒泡阶段。stopPropagation 阻止事件继续传到别的节点，同一节点上其余监听器仍会运行。stopImmediatePropagation 还会停掉当前节点上尚未运行的监听器。focus、blur 等事件不冒泡，不能靠父元素监听它们来做事件委托。',
    why:'学习者会以为点在按钮上就只有按钮自己的监听会跑。父元素和文档上的点击也执行了，弹层关闭和列表选中叠在同一次点击里，于是他把两边的监听都删掉。捕获阶段的日志早于目标、冒泡阶段晚于目标，才说明该拦在传播的哪一段。',
    example:'文档上监听 click 可以处理后来插入的按钮。把监听器写成捕获阶段，它会在按钮自己的 click 之前运行。按钮里调用 stopPropagation 后，文档上的冒泡监听器不再运行。',
    task:'在祖先、目标和文档上分别注册捕获与冒泡监听，记录顺序；再分别调用两种 stop 方法，看同一节点上的第二个监听器是否还在。',
    answer:'祖先上的捕获监听最先执行，接着是目标上的监听，最后才是祖先和文档上的冒泡监听。stopPropagation 之后，其他节点不再收到这次事件，但同一按钮上还没跑的第二个监听仍然执行。改成 stopImmediatePropagation 后，当前节点剩下的监听也不再跑。focus 这类不冒泡的事件，父元素上的委托一次都不会出现。',
    keywords:'DOM eventPhase capture bubble stopPropagation 事件委托',
    points:['事件按捕获、目标、冒泡三段传播','stopPropagation 不停掉同一节点的其他监听器','不冒泡的事件不能用父元素做委托'],
    deep:[
      {title:'捕获、目标与冒泡',body:'一次点击先从 window 走到目标，再原路返回。阶段用 1、2、3 区分。默认监听在冒泡。stopPropagation 只挡住后续节点，同一节点上其余监听仍会运行；立即停止才会连当前节点剩下的监听一起停掉。'},
      {title:'和默认行为',body:'preventDefault 阻止浏览器默认动作（如提交导航、链接跳转），与 stopPropagation 不同。表单提交前校验见 html5-constraint-before-submit；拖放默认见 html5-drop-prevent-default。'},
      {title:'怎样自己验证',body:'在祖先、按钮和文档上分别注册捕获与冒泡，点一次按钮，按控制台顺序记下三段。再在按钮里分别调用两种 stop，看同一节点上的第二个监听还打不打印。不冒泡的 focus 再点一次，父元素不应有日志。'}
    ],
    refs:[['MDN：eventPhase','https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase'],['MDN：stopPropagation','https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation']]
  },
  {
    track:'frontend', group:'CSS 与布局', id:'css-containing-block',
    title:'fixed 不一定相对视口',
    prompt:'元素写了 position:fixed，为什么没有贴在窗口上？',
    core:'绝对定位和固定定位的参照物是包含块，不是永远是视口。position 不是 static 的祖先可以成为包含块。transform、filter、perspective、contain 或 will-change 为 transform 的祖先也会成为 fixed 元素的包含块。这时 fixed 相对那个祖先，而不是窗口。top、right、bottom、left 的百分比也相对这个包含块。',
    why:'学习者会以为写了 fixed 就一定贴在窗口上。卡片上有位移后，对话框跟着卡片滚动，被裁在卡片里面，于是他把 z-index 越调越大，弹层仍不相对视口。开发者工具里包含块变成了那个祖先，而不是视口，才说明参照物被改掉了。',
    example:'对话框写 position:fixed 且四边为 0。外层卡片没有特殊属性时，它铺满窗口。给卡片加上 translateZ(0) 后，对话框改成铺满卡片，页面滚动时它跟着卡片走，不再钉在视口上。去掉这层属性后，它又回到窗口。',
    task:'给固定定位元素的某一层祖先分别加上 transform 和 position:relative，用开发者工具看包含块变成了谁。',
    answer:'给固定定位元素的祖先加上 transform 后，开发者工具里的包含块从视口变成这个祖先，对话框相对卡片而不是窗口。只加 position:relative 时，fixed 的包含块通常仍是视口，absolute 才会改到这个祖先。先挪开造成包含块的属性，再谈相对窗口定位。',
    keywords:'CSS containing block position fixed transform 包含块',
    points:['绝对定位和固定定位参照包含块','transform 等属性会让 fixed 脱离视口','偏移的百分比相对包含块计算'],
    deep:[
      {title:'包含块',body:'绝对定位和固定定位的参照物是包含块。非 static 的祖先可以成为绝对定位的包含块。transform、filter、perspective 或 will-change 为 transform 的祖先，也会把 fixed 的包含块从视口改到自己身上。'},
      {title:'怎样自己验证',body:'选中 fixed 元素，在开发者工具里看它的包含块是谁。给某一层祖先加上 transform，再看包含块是否变成该祖先；去掉后再看是否回到视口。百分比偏移也跟着这个框变。'}
    ],
    refs:[['MDN：包含块','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Containing_block'],['MDN：position','https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http-status-auth',
    title:'401 是没证明身份，403 是不许做',
    prompt:'登录失败和登录后没有权限，为什么不该都返回 403？',
    core:'401 表示请求缺少可被接受的认证，或认证未被接受。响应可以带 WWW-Authenticate，告诉客户端用什么方式再证明身份。403 表示服务器已经理解请求，但拒绝执行。用户已经登录、只是没有该操作的权限时，用 403，而不是再要求登录。把两种失败都写成 200 再在 JSON 里塞错误码，缓存和中间层就看不出这次调用失败了。',
    why:'学习者会把登录失败和没有权限都写成 403。未登录用户看到的是无权限文案，前端不会去要登录，网关的失败图表也分不出两种调用。状态码是 401 还是 403，才决定客户端下一步是证明身份，还是停在已拒绝的操作上。',
    example:'没有会话访问管理接口，响应是 401，并带有认证方式说明，页面转到登录。普通用户调用停用账号，响应是 403，页面只显示无权限，不再要求重新登录。字段不合法返回 400，正文指出哪个字段，状态不是 200。',
    task:'为未登录、已登录但缺权限、参数不合法三种请求各选一个状态码，并说明客户端下一步做什么。',
    answer:'未登录应返回 401，客户端下一步是按认证方式重新证明身份。已登录但缺权限应返回 403，下一步是停止该操作而不是再登录。参数不合法返回 400，并在正文里说明字段。这三种都不能写成 200 再在 JSON 里塞错误码。三种状态码不能合并成一个 200。',
    keywords:'HTTP 401 403 WWW-Authenticate 认证 授权',
    points:['401 表示需要或拒绝了认证','403 表示已理解请求但拒绝授权','失败不要伪装成 200'],
    deep:[
      {title:'认证失败与授权拒绝',body:'401 表示缺少可接受的认证，或认证未被接受，响应可以说明该用什么方式再证明。403 表示服务器已经理解请求但拒绝执行。用户已经登录却没有该操作权限时，用的是后者。'},
      {title:'怎样自己验证',body:'用未登录、已登录但缺权限、字段不合法三种请求各打一次。记下状态码分别是 401、403、400，并看页面下一步是去登录、显示无权限，还是标出字段。页面下一步也要和状态码对得上。'}
    ],
    refs:[['MDN：401','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401'],['MDN：403','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/403']]
  },
  {
    track:'frontend', group:'网络与安全', id:'fetch-credentials',
    title:'跨源 Cookie 要两边一起允许',
    prompt:'fetch 写了 credentials:include，为什么 Cookie 还是没带到另一个源？',
    core:'fetch 的 credentials 默认是 same-origin，只在同源请求上带 Cookie。include 才会在跨源请求里带上。浏览器要读到这个跨源响应，服务器必须返回 Access-Control-Allow-Credentials: true，并且 Access-Control-Allow-Origin 是具体源，不能是星号。预检请求也要允许这一点。只改前端、不改响应头，脚本仍然读不到响应。',
    why:'学习者会以为前端写了携带凭证，跨源请求就会带上登录 Cookie。请求发出去仍像匿名，响应也读不到，于是他反复改前端的参数。请求头里有没有 Cookie，以及响应是具体源还是星号，才说明缺的是哪一边。',
    example:'页面在 app.example，接口在 api.example。fetch 使用 include。接口响应 Allow-Origin 为 https://app.example，并带上 Allow-Credentials。',
    task:'分别用默认 credentials、include 加星号源、include 加具体源，记录请求是否带 Cookie、脚本是否读得到正文。',
    answer:'默认凭证只在同源请求带 Cookie，跨源请求头里没有。改成 include 后请求会带上 Cookie，但响应若是星号源，脚本仍然读不到正文。改成具体源并允许凭证后，请求头有 Cookie，脚本也能读到正文。星号和允许凭证不能同时成立。星号源那一次正文仍读不到。',
    keywords:'fetch credentials CORS Access-Control-Allow-Credentials Cookie',
    points:['credentials 默认只在同源发送 Cookie','跨源携带凭证时 Allow-Origin 不能是星号','响应还要显式允许凭证'],
    deep:[
      {title:'跨源凭证的两边',body:'fetch 的凭证默认只在同源发送 Cookie。include 才在跨源请求里附带。服务器还必须返回允许凭证，并且允许的源是具体源，不能是星号。只改前端或只改其中一个响应头，脚本仍然读不到。'},
      {title:'和 Cookie 属性',body:'浏览器会不会附带，还受 HttpOnly/Secure/SameSite 约束，见 cookie-set-attributes。CORS 允许名单见 cors-credentials-allowlist。'},
      {title:'怎样自己验证',body:'在网络面板做三次：默认凭证、include 加星号源、include 加具体源并允许凭证。记录每次请求头有没有 Cookie，以及脚本能否读到正文。只有第三次两件都成立。'}
    ],
    refs:[['MDN：使用 Fetch','https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'],['MDN：Access-Control-Allow-Credentials','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Credentials']]
  },
  {
    track:'frontend', group:'React', id:'react-error-boundary',
    title:'错误边界只管渲染，不管点击里的异步（React 16）',
    prompt:'组件出错了，为什么错误边界有时完全看不到？',
    core:'React 的错误边界（**React 16** 起）是类组件，用 getDerivedStateFromError 或 componentDidCatch 接住子树在渲染、生命周期和构造函数里抛出的错误。它接不住事件处理函数、异步回调、服务端渲染，也接不住边界自己渲染时抛出的错误。点击里的请求失败要在事件或 Promise 路径上处理。渲染期间读到坏数据，才由边界换成备用界面。',
    why:'学习者会以为根上套一个错误边界，组件里任何错误都会换成备用界面。按钮点击里的请求失败仍变成未处理拒绝，备用界面没有出现，于是他再往边界里加逻辑，点击路径依旧进不去。抛错发生在渲染期间还是在事件回调里，才分得清边界能不能看见。',
    example:'子组件在渲染时读取空对象的 name，边界接住并显示这段暂时不可用，页面其余部分还在。按钮 onClick 里的 await 失败时，边界不更新，控制台是未处理拒绝。在点击函数里捕获后，界面显示请求失败，边界的备用界面没有被用到。',
    task:'分别在渲染期间、点击回调和 Promise 拒绝里抛错，记录哪一次能被错误边界接住。',
    answer:'渲染期间抛错会被错误边界接住，子树换成备用界面。点击回调里抛错，边界看不到，必须在事件路径上处理。Promise 拒绝同样不进边界，要在该次异步链上捕获。边界自己渲染时抛错，需要更外层的边界，这一层接不住自己。三次抛错只有渲染那一次进入边界。',
    keywords:'React error boundary componentDidCatch 渲染错误 事件处理',
    points:['错误边界接住子树渲染和生命周期中的异常','事件处理和异步代码不经过边界','边界自身的渲染错误需要上层边界'],
    deep:[
      {title:'渲染错误与事件错误',body:'错误边界接住的是子树在渲染、生命周期和构造函数里抛出的错误。事件处理函数、异步回调、服务端渲染，以及边界自己的渲染错误，都不经过这一层。点击里的请求失败要留在事件或 Promise 上。'},
      {title:'怎样自己验证',body:'在子组件渲染、按钮点击和一次被拒绝的 Promise 里各抛一次。看备用界面只在第一次出现。后两次应在控制台留下未处理错误，直到你在各自的调用路径里捕获。后两次在捕获前不应出现备用界面。'}
    ],
    refs:[['React：错误边界','https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-props-one-way',
    title:'子组件改 prop，父组件不会跟着变',
    prompt:'在子组件里给 props 赋值，为什么父组件的数据没变，控制台却出现警告？',
    core:'Vue 的 prop 是单向的：父组件把数据传下来，子组件把它当输入。直接改 prop 会触发警告，也不能当成修改父状态的办法。子组件用 emit 发出事件，由父组件决定是否改自己的状态，再把新值传下来。需要一份可编辑的本地副本时，用本地状态接初始值，并在父数据变化时同步；不要把 prop 本身当成子组件的私有可变状态。',
    why:'学习者会以为子组件给 prop 赋值，父组件的数据就会一起变。控制台出现变异警告，父组件显示的标题却不动，于是他改成直接改对象字段，两边悄悄串改，父组件解释不了谁写的。警告还在、父状态不变，才说明输入没有变成可写状态。',
    example:'子组件收到 title 为旧标题。直接给这个 prop 赋值时，控制台出现警告，父组件界面仍是旧标题。改成发出更新事件后，父组件写入自己的状态，再传下来，两边都变成新标题，警告消失。直接改对象 prop 的某个字段时，父组件会跟着变，但警告说明这不是约定的写法。',
    task:'在子组件直接改一个对象 prop 的字段，再改成 emit。比较父组件是否更新，以及有没有变异警告。',
    answer:'在子组件直接改 prop，父组件不更新，并出现变异警告。改对象 prop 的字段时，父组件可能因为同一对象而看见新值，警告仍在。改成 emit 后，父组件决定写入自己的状态，再把新值传下来，警告消失，来源只剩父组件。对象字段被直接改时警告仍然要出现。',
    vue:'props',
    keywords:'Vue props emit 单向数据流 v-model',
    points:['prop 从父组件流向子组件','子组件用事件请求变更，不直接写 prop','本地副本要在父数据变化时再同步'],
    deep:[
      {title:'单向数据流',body:'prop 从父组件流下来，子组件把它当输入。直接赋值会警告，也不能当成修改父状态的办法。子组件发出事件，由父组件决定是否改自己的状态。本地副本要在父数据变化时再同步，不能把 prop 当成私有可变状态。'},
      {title:'怎样自己验证',body:'先在子组件直接改一个对象 prop 的字段，看父组件是否被带改、控制台有没有变异警告。再改成 emit，由父组件写入，确认警告消失且父组件的值是它自己更新的。emit 之后父组件的值来自它自己的写入。'}
    ],
    refs:[['Vue：Props 单向数据流','https://vuejs.org/guide/components/props.html'],['Vue：组件事件','https://vuejs.org/guide/components/events.html']]
  },
  {
    track:'frontend', group:'工程实践', id:'web-vitals',
    title:'先看三次用户可见的等待',
    prompt:'打包体积小了，就能说明页面变快了吗？',
    core:'Core Web Vitals 量的是用户看得见的结果。LCP 是视口里最大内容绘制出来的时间。INP 是交互到下一次绘制的延迟，用来代替已经退出主指标的 FID。CLS 是意外布局偏移的累计。它们不由包体积直接决定。大图、字体、长任务和没有尺寸的图片会分别拉高这三项。实验数据说明一次访问，现场数据说明真实用户分布。顺序是先用一次访问的记录指出最大内容元素、一次交互的长任务和造成偏移的节点，再逐项修改并复测。实验数据只说明这一次，现场数据才是真实用户的分布。边界是这三项互不替代：图的发现时间、主线程长任务和未声明尺寸要分开看，包体积不是其中任何一项的读数。',
    why:'学习者会以为打包体积变小，用户就能更快看到页面。实验室里分数上升了，首屏大图仍晚，点击后主线程还被长任务占着，布局也在跳。体积数字和这三项对不上，才说明要分别看最大内容、交互延迟和偏移，而不是只比构建产物的大小。',
    example:'首屏英雄图没有宽高，加载后把下面的文字顶下去，累计偏移升高。点击按钮时主线程跑一段 300 毫秒的长任务，交互到下一次绘制变慢。图很大且发现得晚，最大内容绘制超过数秒。把包再压小 20KB，这三项记录仍分开超标。',
    task:'用一次性能记录指出 LCP 元素、一次交互的长任务，以及造成偏移的节点，再分别改一项并复测。',
    answer:'性能记录里先指出视口中最大的那一块何时绘制，这是最大内容。再指出一次交互里的长任务，它拉高的是交互到下一次绘制的延迟。最后指出没有尺寸而后来撑开的节点，它计入的是意外偏移。三项分开改、分开复测，包体积变小不会同时修好这三处。三次复测各自只应改善对应的一项。',
    keywords:'Core Web Vitals LCP INP CLS 性能',
    points:['LCP 衡量最大内容何时绘制','INP 衡量交互到下一次绘制','CLS 累计意外的布局偏移'],
    deep:[
      {title:'三项用户可见结果',body:'最大内容看视口里最大一块何时画出来。交互延迟看从操作到下一次绘制。累计偏移看意外的布局跳动。它们不由包体积直接决定。大图、字体、长任务和没有尺寸的图片会分别拉高不同的一项。'},
      {title:'怎样自己验证',body:'做一次性能记录，标出最大内容元素、一次点击中的长任务、以及后来把布局撑开的节点。每次只改一项再录一次，看只有对应的那一项下降，另外两项可以不变。包体积那一次下降不能代替这三项记录。'}
    ],
    refs:[['MDN：LCP','https://developer.mozilla.org/en-US/docs/Glossary/Largest_contentful_paint'],['MDN：INP','https://developer.mozilla.org/en-US/docs/Glossary/Interaction_to_next_paint'],['MDN：CLS','https://developer.mozilla.org/en-US/docs/Glossary/CLS']]
  },
  {
    track:'frontend', group:'安全', id:'client-env-public',
    title:'打进前端包里的变量不是秘密',
    prompt:'把数据库密码写成 VITE_DB_PASSWORD，构建之后它还安全吗？',
    core:'Vite 只会把以 VITE_ 开头的环境变量静态替换进客户端代码，通过 import.meta.env 读取。替换发生在构建时，产物是任何打开页面的人都能下载的脚本。模式文件和 .env.local 决定构建时读到哪一组值，不提供运行时保密。密钥、数据库口令和私钥只能留在服务器。前端可以持有的是公开的站点地址、分析编号，以及设计成可公开的客户端标识。',
    why:'学习者会以为环境变量只要不写进源码仓库就仍然是秘密。构建之后在产物里能搜到明文口令，任何人下载脚本就能看见，于是他把变量改个名字继续放。产物里有这段明文、而没有前缀的变量搜不到，才说明前缀是暴露开关，不是加密。',
    example:'把数据库口令写成带 VITE_ 前缀的变量后执行构建，在生成的脚本里能搜到这串明文。去掉前缀再构建，客户端产物里不再出现该值，服务端进程的环境里仍然能读到。公开的接口地址可以留在带前缀的变量里，下载脚本的人本来就需要它。',
    task:'构建后在产物里搜索一个 VITE_ 变量的值，确认它已经是明文；再确认没有 VITE_ 前缀的变量不会出现在客户端代码里。',
    answer:'构建产物里能搜到带前缀变量的明文，说明它已经写进可下载的脚本。没有该前缀的变量不会出现在客户端代码里，只会留在构建机器或服务端环境。口令因此不能加这个前缀。前缀只决定是否暴露，不会把值加密。搜到明文就说明这个值已经随脚本公开，没有前缀的口令不应出现在产物里。',
    keywords:'Vite import.meta.env VITE_ 环境变量 前端密钥',
    points:['只有 VITE_ 前缀会进入客户端代码','这些值在构建时被写进可下载的脚本','密钥不能放进前端环境变量'],
    deep:[
      {title:'构建时替换',body:'只有约定前缀的环境变量会被静态替换进客户端代码。替换发生在构建时，产物是打开页面的人都能下载的脚本。模式文件决定构建时读哪一组值，不提供运行时保密。密钥和数据库口令只能留在服务器。'},
      {title:'怎样自己验证',body:'构建后在产物里搜索一个带前缀变量的值，应能看到明文。再搜索一个没有前缀的变量值，客户端文件里不应出现。口令只留在服务端进程环境中。口令字符串只应出现在服务端环境，不应出现在下载下来的脚本中。'}
    ],
    refs:[['Vite：环境变量与模式','https://vite.dev/guide/env-and-mode.html']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-worker-cluster',
    title:'多核要拆进程或工作线程，不是把事件循环变并行',
    prompt:'开了 cluster，主线程里的一个大循环就会用满所有 CPU 吗？',
    core:'Node 的 JavaScript 默认在一个线程的事件循环上运行。cluster 是多个进程，各自有自己的堆和事件循环，可以共享一个服务器端口。worker_threads 是同一进程里的额外线程，各自有自己的 JavaScript 堆，可以通过转移 ArrayBuffer 或消息传递数据，普通对象不会变成共享内存。两种方式都要明确任务怎么切分。一个进程里的死循环仍然占满它自己的那个线程。',
    why:'学习者会以为开了多进程，主线程里的大循环就会占满所有核。请求在死循环期间一直没有响应，其他核是空的，于是他再增加进程数，这个循环仍卡在原来的那一个线程上。请求在循环移入工作线程后恢复返回，才说明并行发生在另一条堆和循环上。',
    example:'主线程里跑死循环时，同时发出的 HTTP 请求一直挂起，没有状态码。把同一段循环放进工作线程并用消息回传结果后，主线程上的请求在循环仍在跑时就能返回 200。多进程各自接受连接，但每个进程自己的死循环仍然只堵住那一个进程。',
    task:'用一个死循环占住主线程，同时发一个 HTTP 请求，记录它是否被堵住；再把死循环放进 Worker，比较请求是否还能返回。',
    answer:'死循环放在主线程时，同时发出的 HTTP 请求被堵住，因为同步代码占住了这一个事件循环。把死循环放进工作线程后，请求可以返回，结果靠消息或转移的内存回来。多进程是各自的堆和循环，不会让同一个循环里的同步代码跑到多个核上。同一个事件循环里的死循环不会因为多进程而让出请求。',
    keywords:'Node.js cluster worker_threads 事件循环 多核',
    points:['一个事件循环不会把同步代码跑到多个核上','cluster 是多进程，各自有独立的堆','worker_threads 用消息或转移内存交换数据'],
    deep:[
      {title:'进程与工作线程',body:'JavaScript 默认在一个线程的事件循环上运行。多进程是多个进程，各自有自己的堆，可以共享监听端口。工作线程在同一进程里另有堆，用消息或转移的缓冲区交换数据，普通对象不会变成共享内存。'},
      {title:'怎样自己验证',body:'先在主线程跑死循环并同时发一个 HTTP 请求，确认请求被堵住。再把循环放进工作线程，看请求是否还能返回 200，以及结果是不是靠消息回来而不是共享同一个对象。'}
    ],
    refs:[['Node.js：worker_threads','https://nodejs.org/api/worker_threads.html'],['Node.js：cluster','https://nodejs.org/api/cluster.html']]
  },
  {
    track:'java', group:'数据库', id:'sql-outer-join-where',
    title:'外连接的条件写进 WHERE，就变成内连接',
    prompt:'LEFT JOIN 之后为什么有的左表行消失了？',
    core:'LEFT JOIN 先保留左表每一行，右表没有匹配时用 NULL 补齐。若随后在 WHERE 里判断右表列等于某个值，NULL 的比较不是 TRUE，这些补齐行会被丢掉，结果和内连接一样。右表的匹配条件应写在 ON 里。左表自己的过滤可以写在 WHERE，因为它本来就不是要保留的“缺失”。选了右表列却用 WHERE 排除 NULL，就是在要回那些行。',
    why:'学习者会以为左连接写了，左表的每一行就都会留下。没有订单的客户从报表里消失了，行数变得和内连接一样，于是他去查客户是不是没插入。把月份条件从 WHERE 挪到 ON 后这些客户又出现，才说明是条件位置把补齐行滤掉了。',
    example:'两个客户，一个有 5 月订单，一个没有任何订单。月份条件写在 ON 里时，结果仍是两行，没有订单的客户右表列为 NULL。把同一条件放进 WHERE 后，结果只剩一行，没有 5 月订单的客户消失，效果和内连接相同。',
    task:'准备有订单和没订单的客户，把月份条件分别放在 ON 和 WHERE，比较客户是否还在结果里。',
    answer:'月份条件放在 ON 里时，没有订单的客户仍在结果中，右表是 NULL。把月份放进 WHERE 后，这些补齐行因为 NULL 比较不是真而被丢掉，客户消失，行数变得和内连接一样。左表自己的过滤可以留在 WHERE，右表的匹配条件要放在 ON。',
    keywords:'SQL LEFT JOIN ON WHERE 外连接 NULL',
    points:['左连接会用 NULL 补上没有匹配的右表','WHERE 里的比较会丢掉这些 NULL 行','右表条件放在 ON，才留得住左表'],
    deep:[
      {title:'ON 与 WHERE',body:'左连接先保留左表每一行，右表没有匹配时用 NULL 补齐。WHERE 里判断右表列等于某值时，NULL 比较不是真，补齐行会被丢掉。右表的匹配条件写在 ON 里，才留得住要保留的那一侧。'},
      {title:'怎样自己验证',body:'准备有订单和没订单的客户各一名。把月份条件先写在 ON 里查询，再挪到 WHERE。比较没订单的客户还在不在，两次行数应分别是全部客户和只有匹配订单的客户。没有订单的客户只应出现在 ON 那一次。'}
    ],
    refs:[['MySQL 8.4：JOIN','https://dev.mysql.com/doc/refman/8.4/en/join.html'],['MySQL 8.4 手册镜像：JOIN','https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/join.html']]
  },
  {
    track:'java', group:'数据库', id:'mysql-replica-lag',
    title:'从库读到的是已经追上的数据吗',
    prompt:'主库刚提交的订单，为什么立刻读从库会读不到？',
    core:'MySQL 异步复制时，主库提交并写入二进制日志之后，从库才去拉取并应用。应用完成前，从库上没有这笔提交。同一用户先写主库、再读从库，会看不到自己刚写的数据。Seconds_Behind_Source 是估计，日志还在中继、或从库时钟不同，它都可以是 0 而数据仍未应用完。要读到自己的写入，读主库，或等复制位置至少到达这次写入的位点。',
    why:'学习者会以为主库提交成功，从库立刻就能读到同一行。用户看到提交成功但列表里没有这张订单，于是他当成写入失败又提交一次。主库查得到、从库查不到，延迟读数却可能仍是 0，才说明从库还没应用这次提交。',
    example:'在从库暂停应用后，向主库插入一行订单，主库查询立刻能看到，从库查询行数为 0。延迟秒数的估计可以仍显示 0。恢复应用并等到复制位置超过这次写入之后，从库才出现这一行。这笔列表若改查主库，暂停期间也能看到刚提交的订单。',
    task:'在从库暂停 SQL 线程，向主库插入一行，再分别查主库、从库和 Seconds_Behind_Source。',
    answer:'暂停从库应用后，主库插入的行在主库查得到，从库查不到。延迟秒数是估计，可以是 0 而数据仍未应用完。要读到自己刚写的行，应查主库，或确认从库复制位置已经超过这次写入的位点。恢复应用前，从库列表不会包含该订单。延迟估计为 0 也不能代替复制位点已经超过这次写入。',
    keywords:'MySQL replica lag Seconds_Behind_Source 读写分离 复制延迟',
    points:['异步复制在提交之后才把事件应用到从库','从库延迟期间读不到刚提交的行','延迟秒数是估计，不能代替复制位点'],
    deep:[
      {title:'异步复制的可见性',body:'主库提交并写入二进制日志之后，从库才去拉取并应用。应用完成前，从库上没有这笔提交。延迟秒数是估计，日志还在中继或时钟不同时，它可以是 0 而数据仍未跟上。读自己的写入要读主库或对准位点。'},
      {title:'怎样自己验证',body:'暂停从库的应用线程，向主库插入一行，分别查询主库、从库和延迟估计。主库有行、从库没有，才恢复应用。再次查询从库，行应在位点追上之后出现。恢复应用前从库行数应保持为 0。'}
    ],
    refs:[['MySQL 8.4 手册镜像：复制实现','https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/replication-implementation.html'],['MySQL 8.4 手册镜像：复制延迟排错','https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/replication-problems.html']]
  },
  {
    track:'java', group:'框架', id:'spring-bean-lifecycle',
    title:'Bean 先造出来，再注入，然后才初始化',
    prompt:'构造器里调用另一个 Bean 的方法，为什么有时对象还没准备好？',
    core:'Spring 创建单例时，先调用构造器，再注入依赖，然后才执行初始化回调和 BeanPostProcessor 的后置处理。构造器里只能依赖已经作为构造参数传入的对象。用字段或 setter 注入时，构造器执行期间那些依赖还没有赋上。构造器循环依赖不能靠提前暴露半成品解决，容器会失败。初始化回调才适合在依赖齐全之后做检查或注册。',
    why:'学习者会以为构造器一开始就能用上所有依赖。字段注入的依赖在构造期间仍是空，调用就空指针，于是他把获取依赖的代码挪来挪去，启动期的循环依赖也变成运行期故障。构造参数里的对象已经可用、字段仍为空，才说明注入还没发生。',
    example:'用构造器传入配置对象时，构造器里打印该参数不是空，对象创建完成后配置已经可用。改成字段注入后，构造器里打印该字段仍是空，要到注入之后才有值。两个构造器互相要对方时，容器启动失败，不会先交出一个半成品再补上。',
    task:'用构造器注入和字段注入各写一个 Bean，在构造器里打印依赖是否为 null，再把两个构造器互相依赖，看容器是否能启动。',
    answer:'构造器注入时，构造器里打印的依赖不是空，因为只有构造参数在这一阶段存在。字段注入时，构造器里打印为 null，注入发生在构造之后。两个构造器互相依赖时容器不能启动。初始化回调才适合在依赖齐全之后做检查，不能在构造器里使用尚未注入的字段。字段在构造器里为空是预期，不是容器随机失败。',
    keywords:'Spring Bean 生命周期 构造器注入 循环依赖',
    points:['顺序是构造、注入、初始化','构造器里还没有字段注入的依赖','构造器循环依赖不能靠半成品提前暴露'],
    deep:[
      {title:'构造、注入、初始化',body:'创建单例时先调用构造器，再注入依赖，然后才执行初始化回调。构造器里只能使用已经作为参数传入的对象。字段或 setter 注入的依赖在构造期间还没有赋上。构造器循环依赖不能靠提前暴露半成品解决。'},
      {title:'怎样自己验证',body:'用构造器注入和字段注入各写一个 Bean，在构造器里打印依赖是否为空。再让两个构造器互相依赖，看容器是否在启动时失败，而不是运行到第一次调用才空指针。循环依赖应在启动日志里失败，而不是第一次调用才空指针。'}
    ],
    refs:[['Spring Framework：Bean 概述','https://docs.spring.io/spring-framework/reference/core/beans/definition.html'],['Spring Framework：循环依赖','https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html']]
  },
  {
    track:'java', group:'框架', id:'spring-mvc-dispatch',
    title:'过滤器、拦截器和控制器不是同一层',
    prompt:'在 Filter 里抛出的异常，为什么 @ControllerAdvice 接不到？',
    core:'Servlet Filter 在进入 DispatcherServlet 之前或之后包住整个请求。DispatcherServlet 才查找 HandlerMapping、调用拦截器的 preHandle、用 HandlerAdapter 进入控制器，再走 postHandle。@ControllerAdvice 处理的是控制器及其返回值这一段抛出的异常。过滤器在更外面，它的异常不会自动变成控制器通知。拦截器可以拦下请求，让控制器不执行。三者的顺序决定了认证、日志和异常各自能看见什么。',
    why:'学习者会以为控制器通知能接住所有层抛出的异常。过滤器里抛错时通知没有日志，响应也不是契约里的错误体，于是他在通知里再加分支，过滤器这段仍然进不去。异常日志出现在过滤器而不是通知里，才说明它还在分发器外面。',
    example:'过滤器里抛错时，过滤器日志有一行，控制器通知没有日志，响应由外层写出。拦截器里抛错或直接返回时，控制器方法没有日志。控制器里抛错时，通知打出日志并写成约定的状态码。三层的日志不会同时出现在同一次失败里。',
    task:'在过滤器、拦截器和控制器里各打一条日志并各抛一次异常，记录哪些通知看得到、响应是谁写的。',
    answer:'过滤器里抛异常时，控制器通知看不到，响应由过滤器这一层决定。拦截器抛异常或拦住请求时，控制器可以不执行，通知也不一定接到。控制器里抛异常时，通知能看见并写成契约里的响应。认证和链路标识因此要按这三层各自能看见的范围来放。三层日志不要期望在同一次失败里一起出现。',
    keywords:'Spring MVC Filter Interceptor ControllerAdvice DispatcherServlet',
    points:['过滤器在 DispatcherServlet 之外','拦截器在控制器前后','控制器通知接不住过滤器里的异常'],
    deep:[
      {title:'过滤器、拦截器与通知',body:'过滤器在进入分发器之前或之后包住整个请求。分发器才查找映射、调用拦截器，再进入控制器。控制器通知只处理控制器及其返回值这一段的异常。过滤器在更外面，它的异常不会自动变成通知。'},
      {title:'怎样自己验证',body:'在过滤器、拦截器和控制器里各打一条日志并各抛一次。看哪一次通知有日志、响应是谁写的。过滤器那一次应只有过滤器日志，控制器那一次才出现通知日志。控制器那一次才应看到通知写下的状态码。'}
    ],
    refs:[['Spring Framework：MVC 处理顺序','https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/sequence.html'],['Spring Framework：过滤器','https://docs.spring.io/spring-framework/reference/web/webmvc/filters.html']]
  },
  {
    track:'java', group:'消息队列', id:'kafka-producer-acks',
    title:'生产者发出去，还不等于副本都记下了',
    prompt:'acks 设成 1，领导者返回成功后，消息就一定不会丢吗？',
    core:'acks=0 时生产者不等待确认。acks=1 时只要领导者把记录写入本地日志就返回。acks=all 时要等所有同步副本确认。领导者在确认后、跟随者复制前宕机，acks=1 的记录可能丢。当前 Kafka 生产者默认 acks=all，并可以开启幂等生产者，使同一生产者会话内的重试不重复写入。分区仍是顺序边界。确认级别不代替消费端的幂等。',
    why:'学习者会以为领导者返回成功，消息就不会丢。领导者在跟随者复制前宕机后，下游说没收到，发送调用本身却没有抛错，于是他只查消费者。确认级别是 1 还是全部副本，才说明成功返回时记录到达了哪一层。',
    example:'acks 为 1 时，领导者把记录写入本地日志就返回成功。它在跟随者复制前宕机，跟随者上可以没有这条记录，生产者却已经认为成功。改成 acks 为 all 后，要等同步副本都确认才返回；同一时刻的失败会让发送以错误结束，而不是静默丢掉。',
    task:'分别用 acks=1 和 acks=all 描述领导者在确认后立即失败时，跟随者可能有没有这条记录。',
    answer:'acks 为 1 时，领导者确认后立即失败，跟随者可能还没有这条记录，发送方已经拿到成功。acks 为 all 时，要等同步副本确认，领导者单独写下还不算完成。两种级别都不代替消费端按业务键处理重复。分区仍然是顺序边界。跟随者没有记录时，级别 1 的成功并不能证明消息还在。',
    keywords:'Kafka acks producer idempotence ISR 副本',
    points:['acks=1 只等领导者本地日志','acks=all 等所有同步副本','生产者确认不等于消费端只处理一次'],
    deep:[
      {title:'确认级别',body:'acks 为 0 时生产者不等待。为 1 时只要领导者写入本地日志。为 all 时要等所有同步副本。领导者在确认后、复制前宕机，级别 1 的记录可能丢。生产者确认也不等于消费端只处理一次。'},
      {title:'怎样自己验证',body:'对照两种确认级别写下领导者在返回成功后立刻失败时，跟随者日志里有没有这条记录。级别 1 可以没有；级别 all 在未确认前发送方不应拿到成功。级别 all 在副本未确认前不应给发送方成功。'}
    ],
    refs:[['Kafka：acks','https://kafka.apache.org/documentation/#producerconfigs_acks'],['Kafka：幂等生产者','https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence']]
  },
  {
    track:'java', group:'搜索', id:'es-refresh-visibility',
    title:'写入成功后，搜索仍可能看不到',
    prompt:'索引请求返回 201，下一次搜索为什么还查不到这篇文档？',
    core:'Elasticsearch 的索引成功表示文档已被接受。搜索看见它，要等 refresh 把新的段打开。默认大约每一秒刷新一次，所以搜索是近实时的。按 id 获取可以读到尚未刷新、但已经进 translog 的文档，这和搜索不是同一条路径。把 refresh 设成立即发生，写入会变慢。刷新也不是磁盘上的 fsync，进程崩溃时还要靠 translog 恢复。',
    why:'学习者会以为索引返回 201，下一次搜索就一定能查到这篇文档。测试里写入后马上搜索偶发失败，他当成写入丢了又重试。按标识能读到正文、按词搜索仍是 0 条，才说明差在刷新，不是文档没被接受。',
    example:'关闭自动刷新后索引一篇文档，响应是成功。立刻按标识获取，正文已经能读到。按标题词搜索，命中数是 0。手动刷新后再搜索，命中数变成 1。刷新前的搜索失败并不是索引请求被拒绝。刷新前命中数为 0，刷新后变为 1。',
    task:'关闭自动刷新，索引一篇文档，比较按 id 获取和按词搜索的结果，再手动 refresh 后重试搜索。',
    answer:'关闭自动刷新并索引后，按标识获取可以读到尚未对搜索打开的文档，按词搜索则是 0 条。手动刷新后，同一次搜索变为命中。索引成功只表示文档被接受，搜索要等新的段打开。刷新也不是磁盘上的强制落盘，崩溃恢复还要靠事务日志。按标识获取成功并不能推出搜索已经可见。',
    keywords:'Elasticsearch refresh translog near real-time 近实时',
    points:['索引成功不等于已经可被搜索','refresh 让新段对搜索可见','按 id 获取和搜索不是同一条可见性路径'],
    deep:[
      {title:'近实时搜索',body:'索引成功表示文档已被接受。搜索看见它，要等刷新把新的段打开。默认大约每秒一次，所以搜索是近实时的。按标识获取可以读到已进事务日志但尚未刷新的文档。把刷新设成立即发生，写入会变慢。'},
      {title:'怎样自己验证',body:'关闭自动刷新，索引一篇文档，立刻做按标识获取和按词搜索。获取应有正文，搜索应为 0 条。手动刷新后再搜索，命中数应为 1。刷新后再搜同一标题，命中数应从 0 变成 1。'}
    ],
    refs:[['Elasticsearch：近实时搜索','https://www.elastic.co/docs/manage-data/data-store/near-real-time-search'],['Elasticsearch：refresh','https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-refresh']]
  },
  {
    track:'java', group:'工程实践', id:'hikari-pool-timeout',
    title:'池里借不到连接，和 SQL 跑得慢，不是同一个超时',
    prompt:'Hikari 的 connectionTimeout 设成 3 秒，慢查询就会在 3 秒失败吗？',
    core:'connectionTimeout 是从池里拿到一条连接的最长等待。池被占满时，超时抛出的是拿连接失败，查询还没开始。它不限制 SQL 执行多久。语句超时要设在 Statement.setQueryTimeout 或驱动的 socket 超时上。maxLifetime 让连接在被数据库或中间网络掐掉之前归还。把连接超时调大，只会让线程在池外排更久，不会让慢 SQL 更快结束。',
    why:'学习者会以为借连接的超时设成 3 秒，慢查询也会在 3 秒失败。池被占满时新请求很快失败，已经借出的查询却继续跑了几十秒，于是他把这个超时越调越大，慢查询更久不回来。失败发生在拿到连接之前还是语句执行中，才分得清是哪一种超时。',
    example:'池里 20 条连接都卡在未提交的查询上。新请求在借连接超时内失败，异常是拿不到连接，查询还没开始。已经借出的那 20 条不受这个超时影响，仍要靠语句超时或取消才会归还。把借连接超时调到 30 秒，只是让新请求在池外多排一会。',
    task:'占满池并不归还，观察新请求的失败时间。再单独把一条查询挂起，确认它不受 connectionTimeout 控制。',
    answer:'占满池并不归还时，新请求在借连接超时到达时失败，失败点是拿连接，SQL 还没执行。单独把一条已经借出的查询挂起，它不会在这个超时上失败，要另设语句超时或套接字超时才会停。调大借连接等待不会让已借出的慢查询更快结束。已借出的慢查询要靠语句超时回来，而不是靠池的等待时间。',
    keywords:'HikariCP connectionTimeout query timeout maxLifetime 连接池',
    points:['connectionTimeout 是等待池中连接的时间','查询超时要另设在语句或套接字上','调大借连接等待不会取消已借出的慢查询'],
    deep:[
      {title:'借连接与语句执行',body:'借连接超时是从池里拿到一条连接的最长等待。池被占满时，超时抛出的是拿连接失败，查询还没开始。它不限制 SQL 执行多久。语句超时要设在语句或驱动的套接字上。把借连接超时调大，只会让线程在池外排更久。'},
      {title:'怎样自己验证',body:'占满池并且不归还，看新请求是否在借连接超时附近失败、异常是不是还没执行 SQL。再单独挂起一条已借出的查询，确认它不会被同一个超时打断，直到你设置语句超时。新请求的失败应发生在 SQL 开始之前。'}
    ],
    refs:[['HikariCP：配置项','https://github.com/brettwooldridge/HikariCP/blob/dev/README.md']]
  },
  {
    track:'java', group:'工程实践', id:'spring-graceful-shutdown',
    title:'停机时先停新请求，再等手里的请求做完',
    prompt:'滚动发布时，旧进程一收到停止信号就退出，正在处理的请求会怎样？',
    core:'Spring Boot 打开优雅停机后，Web 服务器先停止接收新请求，再等待已经接受的请求结束，等待上限是停机阶段的超时。超时后仍可能中断剩余请求。这不包含已经在后台线程池里、却没有和这次请求绑定的任务。Kubernetes 要让停止宽限长于这个等待，并让就绪探针先把 Pod 移出服务，这样负载均衡才会停止送入新流量。',
    why:'学习者会以为进程收到停止信号就可以马上退出。滚动发布时正在写的请求被切断，客户端只看到连接断开，新请求却还在往旧进程上送。已接受的慢请求能在超时前返回、新请求被拒绝，才说明停机分了两段，而不是直接杀进程。',
    example:'就绪检查失败后，新请求不再转到这个进程，直接被拒绝或转到其他实例。已经在处理的慢请求在停机等待时间内写完响应并返回。等待超时后仍在跑的请求会被中断。没有和这次请求绑在一起的后台任务，不在这段等待里收尾。',
    task:'停机期间同时发出一个已在处理的慢请求和一个新请求，记录哪个被拒绝、哪个能在超时前返回。',
    answer:'停机期间，新请求应被拒绝或不再进入该实例，因为它已经停止接收。已经接受的慢请求应在停机超时前返回。超时后剩余请求仍可能被中断。后台线程池里没有绑定到这次请求的任务不会自动做完，要单独收尾。就绪检查要先于进程退出把流量摘掉。新请求和在途请求要得到不同的结果。',
    keywords:'Spring Boot graceful shutdown readiness 优雅停机',
    points:['优雅停机先停止接受新请求','已接受的请求只等待有限时间','就绪探针要先于进程退出把流量摘掉'],
    deep:[
      {title:'停新请求与等待在途',body:'打开优雅停机后，服务器先停止接收新请求，再等待已经接受的请求结束，等待有上限。超时后仍可能中断剩余请求。这不包含已经在后台线程池里、却没有和这次请求绑定的任务。负载均衡要先通过就绪检查把实例移出。'},
      {title:'怎样自己验证',body:'停机时同时发出一个已经在处理的慢请求和一个新请求。记录新请求被拒绝，慢请求在超时前返回。把慢请求拖过等待上限，再看它是否被中断。拖过等待上限的那条请求应被中断，而不是无限等下去。'}
    ],
    refs:[['Spring Boot：优雅停机','https://docs.spring.io/spring-boot/reference/web/graceful-shutdown.html'],['Kubernetes：容器生命周期','https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/']]
  },
  {
    track:'java', group:'安全', id:'password-adaptive-hash',
    title:'口令只存慢哈希，不存原文，也不存快哈希',
    prompt:'把口令做一次 SHA-256 再入库，为什么仍然不够？',
    core:'口令不能可逆地存，也不能只做一次快速散列。应使用带唯一盐的自适应口令哈希，例如 Argon2id、bcrypt 或 scrypt。盐让相同口令的结果不同。工作因子把每次猜测变慢，数据库泄露后才买得到时间。SHA-256 这类快哈希适合校验文件，不适合单独保存口令。登录时用同样的参数重算并比较结果，不要在日志、异常或接口响应里输出口令或哈希。',
    why:'学习者会以为做一次快速散列再入库，口令就已经不可逆因而安全。库泄露后相同口令得到相同结果，并行猜测可以在短时间里试完常见口令，于是他再在外面套一层可逆加密，密钥一起泄露时仍然能还原。每个结果都带不同的盐、并且单次计算明显变慢，才说明这是口令方案。',
    example:'两个用户使用同一口令。只做一次快速散列时，库里两行结果相同，猜测程序可以按常见口令表批量比对。改成带随机盐的自适应慢哈希后，两行结果不同，每次猜测都要按该行的盐和工作因子重算。登录时取出盐和参数重算并比较，日志里不出现口令或结果。',
    task:'说明盐、工作因子和比较方式各自防止什么，并指出为什么把 SHA-256 结果再加密存库仍然不该当口令方案。',
    answer:'盐让相同口令得到不同结果，防止直接对照表。工作因子把每次猜测变慢，泄露后才买得到时间。比较必须用同样的参数重算，不能把结果解密回原文。把快速散列的结果再加密存库，密钥一泄露就能还原或继续快猜，所以仍然不该当口令方案。可逆加密加上快速散列，密钥泄露后仍然能还原或继续快猜。',
    keywords:'Argon2 bcrypt scrypt password hash salt 口令',
    points:['口令用带盐的自适应慢哈希保存','盐让相同口令不会得到相同结果','SHA-256 这类快哈希不能单独保存口令'],
    deep:[
      {title:'盐与工作因子',body:'口令不能可逆地存，也不能只做一次快速散列。应使用带唯一盐的自适应慢哈希。盐让相同口令的结果不同。工作因子把每次猜测变慢。快速散列适合校验文件，不适合单独保存口令。验证时重算并比较，不要把口令或结果写进日志。'},
      {title:'怎样自己验证',body:'用同一口令注册两次，看库存的两行结果是否不同。再把工作因子调高，测量单次校验变慢。确认登录比较的是重算结果，接口日志里搜不到口令原文。两次注册的库存结果应不同，日志里也搜不到口令。'}
    ],
    refs:[['OWASP：口令存储','https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_PATH_02) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
