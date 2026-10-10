/* Frontend 26: micro-frontends — when to split, how to compose, runtime seams, ship contracts.
   Facts follow webpack Module Federation, single-spa, and platform APIs. Not a framework bake-off. */
const COVERAGE_FRONTEND_26 = [
  {
    track:'frontend', group:'微前端', id:'mfe-when-to-split',
    title:'先写清谁独立发版，再决定要不要拆应用',
    prompt:'为什么两个业务线共用一个仓库、同一次发版，却要上微前端？',
    promptAnswer:'共用仓库、同一次发版时，微前端解决不了独立发版。先写清团队、节奏和失败可见性，写不出就这次不拆。',
    core:'微前端解决的是「多个前端应用要能独立构建、独立发布，再在运行时或构建时拼成一个产品」，不是把目录拆成 src/orders 就算完成。动手前先写下三句：谁拥有哪一块页面、谁可以在别人不发版时上线、失败时用户看见什么。若答案是「同一支小队、同一流水线、同一发版窗口」，拆应用只会换来重复依赖、路由打架和联调成本，见 mfe-not-for-everything。若答案是「订单组与营销组各有发版节奏，或必须允许不同框架长期并存」，才进入组合方式，见 mfe-composition-models。选型课里「同一产品留一套界面库」仍然成立：微前端是多应用边界，不是在同一按钮里混四套状态库，见 fe-ecosystem-follows-model。',
    why:'把「仓库变大了」当成必须拆壳。拆完之后仍同一次打镜像、同一次回滚，用户却多付了首屏和治理成本。',
    example:'后台：商品组每周发、结算组两周一发，事故要能只回滚结算。写成「两个可独立部署的前端，壳应用只负责登录与导航」。同一小队维护的设置页与个人中心，继续留在一个应用里，不单独立成 remote。',
    task:'给手上的产品写三句：谁拥有哪条菜单、谁能单独上线、失败时用户看见什么。三句都指向同一小队同一次发版时，写下「这次不拆」。',
    answer:'三句分别落到团队、发版节奏和失败可见性。同一小队、同一次流水线就写「这次不拆」。只有独立发版或长期异构栈写清之后，才进入组合方式。',
    keywords:'微前端 独立发布 团队边界 发版节奏',
    diagram:'diagrams/mfe-when-to-split.svg',
    points:['微前端先问独立发版，不是先问目录怎么切','同一小队同一次发版不必拆成多个前端应用','多应用边界不等于在同一组件里混多套状态库'],
    deep:[
      {title:'和微服务的类比停在边界',body:'后端拆服务看的是数据与事务边界。前端拆应用看的是页面所有权与发布节奏。两边都不是「拆得越碎越好」。'},
      {title:'怎样自己验证',body:'画出最近四次发版：若两个目录总是同一 commit 上线，它们还不需要两个 remote。若某一目录曾单独回滚而另一目录保持，才具备拆分信号。'}
    ],
    refs:[['webpack：Module Federation 概念','https://webpack.js.org/concepts/module-federation/'],['single-spa：Getting started','https://single-spa.js.org/docs/getting-started-overview']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-not-for-everything',
    title:'小团队同仓同发，不要为了时髦上微前端',
    prompt:'是不是前端一超过十万行就必须上微前端？',
    promptAnswer:'不是。行数本身不是拆应用的理由。同小队、同发版窗口时，模块边界和构建拆分通常更便宜。',
    core:'仓库变大可以先用包边界、路由懒加载和清晰的模块目录解决，见 build-code-splitting、vite-module-graph。微前端额外买下的是：多份构建产物、跨应用契约、共享依赖治理、样式与路由隔离。这些成本在「一人维护、一天发几次」时往往高于收益。优先信号是独立发布与组织边界，见 mfe-when-to-split。反信号是：为了简历关键词拆壳、把每个页面做成一个 remote、还没有契约就先上运行时加载。能用构建时组合或单体加懒加载讲清时，先别上运行时容器。',
    why:'行数一过阈值就拆壳。联调要起五个开发服务器，线上多加载几份 React，故障却仍要整站回滚。',
    example:'十五人小队、一个 Git 仓、一条 CI，设置与列表总是一起发。保留一个应用，用动态 import 切开路由包。营销活动页由另一公司外包且要自己发版，才给它一个 remote 或独立域名的 iframe。',
    task:'列出「上微前端」的三条成本：构建、联调、运行时。再写出一条更便宜的替代：包边界、懒加载或独立域名。',
    answer:'成本写构建次数、联调进程数、重复框架体积。替代优先写包边界或路由懒加载。只有独立发版成立时才保留微前端。',
    keywords:'微前端 反模式 懒加载 包边界',
    points:['行数大不等于必须微前端','同仓同发优先模块边界和懒加载','微前端买的是独立发布，不是目录美感'],
    deep:[
      {title:'构建拆分不是微前端',body:'把路由打成多个 chunk，仍是一个应用、一次发版。微前端是多个应用的生命周期与发布管道。'},
      {title:'怎样自己验证',body:'统计本地要起几个 dev server 才能点通一条用户路径。超过两个还讲不清谁单独上线，先停拆分。'}
    ],
    refs:[['MDN：动态 import','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import'],['webpack：Code Splitting','https://webpack.js.org/guides/code-splitting/']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-composition-models',
    title:'组合发生在构建时、运行时还是服务端，不是同一种集成',
    prompt:'把子应用的 JS 用 script 标签挂上，和发版前打进同一个包，解决的是同一件事吗？',
    promptAnswer:'不是。构建时组合在发版前锁定版本；运行时组合在浏览器里再加载；服务端或边缘组合在返回 HTML 时拼接。失败点和回滚面不同。',
    core:'三种常见组合不要并成一句「接入微前端」。构建时组合：发版流水线把多个包编进同一产物或同一版本清单，运行时不再去拉别人的入口，版本在发布时已钉死。运行时组合：壳在浏览器里加载 remoteEntry、single-spa 应用或 iframe，子应用可单独换 URL，见 mfe-module-federation、mfe-runtime-lifecycle。服务端或边缘组合：网关或 BFF 把多个片段 HTML 拼进一页再返回，浏览器拿的是已拼好的文档。选哪一种，看「子应用能否在壳不发版时上线」和「首屏能不能接受额外网络往返」。iframe 属于强隔离的运行时组合，通信走 postMessage，见 mfe-style-isolation。',
    why:'把三种集成画成同一张「子应用箭头」。回滚时有人改壳、有人改 CDN 上的 remote，对不上是哪一次发布坏的。',
    example:'内部后台、版本必须一起验收：构建时把设计系统包打进各应用，或发版清单钉死三个版本号。运营活动页每天换：壳运行时加载活动 remote 的 remoteEntry。内容门户要 SEO：边缘把头尾 HTML 与中间片段拼好再输出。',
    task:'给三个子页面各选一种组合：构建时、运行时、服务端。写出「壳不发版时它能不能上线」。',
    answer:'必须一起验收的选构建时，壳不发版也能上线的选运行时，要在 HTML 里先有正文的选服务端或边缘。三种不要画成同一支箭头。',
    keywords:'微前端 构建时组合 运行时组合 服务端组合',
    diagram:'diagrams/mfe-composition.svg',
    map:[
      {title:'构建时组合',body:'发版前钉死版本，运行时不再拉远程入口'},
      {title:'运行时组合',body:'浏览器加载 remote / 子应用 / iframe，可单独换入口'},
      {title:'服务端或边缘',body:'返回前拼 HTML，首屏少一次客户端拼装'}
    ],
    points:['构建时、运行时、服务端组合的失败点不同','能不能壳不发版就上线，决定选哪一种','iframe 是强隔离运行时，不是 Module Federation 的替身名词'],
    deep:[
      {title:'一种产品可以混用',body:'核心交易走构建时钉版本，活动位走运行时 remote。混用时在架构图上分开标注，避免运维按同一种回滚手册处理。'},
      {title:'怎样自己验证',body:'关掉壳的发版权限，只换子应用产物 URL 或片段服务。用户路径仍更新的是运行时或服务端组合；完全不动则是构建时钉死。'}
    ],
    refs:[['webpack：Module Federation','https://webpack.js.org/concepts/module-federation/'],['MDN：iframe','https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-module-federation',
    title:'Module Federation：host 消费 remote，暴露的是模块不是整站复制（Webpack 5）',
    prompt:'配了 ModuleFederationPlugin 之后，是不是子应用的所有页面都会自动挂到主应用？',
    promptAnswer:'不是。只有 exposes 声明并被 host 的 remotes 引用的模块才会在运行时加载。没有声明的路由不会自动出现。',
    core:'**Webpack 5** 的 Module Federation 让多个独立构建在运行时共享模块。remote 用 exposes 声明可被加载的模块路径，并产出 remoteEntry。host 在 remotes 里写明容器名与入口 URL，再按约定的模块名异步导入。两边都可以声明 shared，把 React 这类必须单例的库放进共享作用域；singleton 为 true 时作用域里只保留一个实例，见 mfe-shared-deps。每个构建需要唯一的 output.uniqueName，同名会在运行时碰撞。Federation 不负责你的业务路由表，也不自动挂载子应用的全部页面；路由与卸载见 mfe-routing-one-history、mfe-runtime-lifecycle。Rspack 等实现沿用同一套 host/remote/shared 语义，核对时以你正在用的打包器文档为准。',
    why:'以为插件一配，子应用菜单就出现在壳上。实际 exposes 只暴露了 Button，host 从未 import，用户路径上什么都没有。',
    example:'remote 的 exposes 写 ./OrderList → src/OrderList.jsx，filename 为 remoteEntry.js。host 的 remotes 写 orders@https://cdn.example/orders/remoteEntry.js，页面里 import("orders/OrderList")。未写入 exposes 的结算页不会被加载。',
    task:'写出 host 的 remote 名与 URL、remote 的一个 expose 键、以及 host 里对应的 import 字符串。缺任何一项就标「还没接通」。',
    answer:'三项对齐：remote 容器名与 remoteEntry URL、exposes 的键、host 的 import("容器/键")。只配插件不写这三项，页面上不会出现子模块。',
    keywords:'Module Federation host remote exposes remoteEntry',
    diagram:'diagrams/mfe-federation.svg',
    points:['remote 只暴露 exposes 里的模块','host 通过 remotes 与异步 import 消费','shared 的 singleton 要双方约定，uniqueName 必须唯一'],
    deep:[
      {title:'容器接口是 init 与 get',body:'host 初始化共享作用域后交给 remote 的 init；再 get 暴露的模块工厂。动态 remotes 也走这套接口，而不是再发明一套全局变量。'},
      {title:'怎样自己验证',body:'去掉 exposes 里的键，host 的 import 应失败。只改 CDN 上的 remoteEntry 而不改壳，能更新的才是运行时 Federation。'}
    ],
    refs:[['webpack：Module Federation 概念','https://webpack.js.org/concepts/module-federation/'],['webpack：ModuleFederationPlugin','https://webpack.js.org/plugins/module-federation-plugin/']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-shared-deps',
    title:'共享依赖要约定单例和版本，否则会加载两份 React',
    prompt:'host 和 remote 的 package.json 都写了 react，运行时是不是自动只用一份？',
    promptAnswer:'不是。未配置 shared，或双方版本进不了同一共享策略时，运行时可以同时存在多份 React，钩子与上下文会坏掉。',
    core:'Federation 的 shared 把指定包登记进共享作用域。React、react-dom 这类带内部全局状态的库通常设 singleton: true，并写 requiredVersion。策略不匹配时，可能回退到各自打包的副本，于是出现两个 React：钩子报错、Context 穿不透、各持一份状态。不要把整个 node_modules 甩进 shared；只共享必须单例或体积很大的约定清单。构建时组合若已把设计系统打进各包，运行时就不要再各加载一份。版本升级要两边的 requiredVersion 都能接受，或安排同窗口升级，见 mfe-contract-version。',
    why:'两边都「有 React」却在控制台看到 invalid hook call。根因是两份 React，不是业务组件写错一行。',
    example:'host 与 remote 都声明 react、react-dom 为 singleton，requiredVersion 为 ^19.0.0。remote 私自升到不兼容的主版本且 strictVersion 拒绝共享时，应在加载期失败，而不是静默起第二份。',
    task:'列出必须 singleton 的包名三到五个，写出双方的 requiredVersion。再预测少配 shared 时控制台会出现哪类症状。',
    answer:'React 与 react-dom 必写 singleton。版本写双方都能接受的范围。少配 shared 时预期钩子无效或 Context 为空，而不是「自动去重」。',
    keywords:'shared singleton requiredVersion React 重复',
    points:['shared 不会因为 package.json 同名就自动单例','React 等带内部状态的库必须约定 singleton','版本对不上时要失败可见，不要静默双实例'],
    deep:[
      {title:'eager 与首屏',body:'eager 会把共享模块打进初始块，减少异步等待，但抬高壳的首包。按首屏路径选择，不要默认全部 eager。'},
      {title:'怎样自己验证',body:'在两个构建里各打印 React 的版本与模块对象身份。应为同一引用。去掉 shared 后再打印，应变成两个身份，并复现钩子报错。'}
    ],
    refs:[['webpack：ModuleFederationPlugin shared','https://webpack.js.org/plugins/module-federation-plugin/'],['React：Rules of Hooks','https://react.dev/reference/rules/rules-of-hooks']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-runtime-lifecycle',
    title:'子应用要有加载、挂载和卸载，离开后不能留下监听',
    prompt:'用户从订单页切到商品页，订单子应用的定时器和全局监听会不会自己消失？',
    promptAnswer:'不会。没有卸载钩子时，定时器、window 监听和残留 DOM 会留在壳里，表现为泄漏或串扰。',
    core:'运行时组合里，子应用是一段可挂载的生命周期，不是「script 执行过一次就永远在」。single-spa 等框架把应用分成 load、bootstrap、mount、unmount；qiankun 在此模型上增加 HTML 入口与样式沙箱等能力。Module Federation 加载的是模块，挂载与卸载仍要你在路由层调用：进入时 createRoot().render，离开时 unmount，并拆掉订阅。iframe 切换可以用移除 iframe 换强隔离，代价是状态与通信更重。无论哪一种，离开路由后子应用占用的全局监听、自定义元素与样式节点都要有明确释放点。',
    why:'只写了加载，没写卸载。切走之后滚动监听还在，埋点重复上报，下一个子应用点到了上一个的全局函数。',
    example:'壳路由匹配 /orders/* 时 mount 订单应用，匹配离开时 unmount 并 clearInterval。单页内 tab 切换若仍属同一子应用，由子应用自己处理；跨应用切换必须走到壳的 unmount。',
    task:'写出子应用的 mount 与 unmount 各做哪三件事。再指出一条用户路径上何时调用 unmount。',
    answer:'mount：挂 DOM、注册路由或监听、拉首屏数据。unmount：卸 DOM、移除监听与定时器、释放共享事件订阅。跨应用路由离开时由壳调用 unmount。',
    keywords:'single-spa mount unmount qiankun 生命周期',
    points:['运行时子应用要有挂载和卸载','Federation 加载模块不等于自动管理生命周期','离开后监听与定时器必须显式释放'],
    deep:[
      {title:'沙箱不是免责声明',body:'样式或 JS 沙箱降低碰撞概率，不替代 unmount。泄漏的定时器在沙箱里照样跑。'},
      {title:'怎样自己验证',body:'进入子应用后登记一个 window 监听，切走后触发同一事件：不应再进入该回调。没有 unmount 时回调仍会执行。'}
    ],
    refs:[['single-spa：Applications API','https://single-spa.js.org/docs/api/'],['qiankun：指南','https://qiankun.umijs.org/guide']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-routing-one-history',
    title:'浏览器只有一条历史栈，子应用要挂在约定前缀下',
    prompt:'壳用 BrowserRouter，子应用再创建一个自己的 BrowserRouter 监听整站路径，会怎样？',
    core:'一个页面对应一条 history。两个路由库同时监听 popstate 或各自 pushState，会出现抢导航、返回键行为错乱、或一方读不到对方写的路径。约定由壳拥有顶层路由表：哪些前缀交给哪个子应用。子应用使用 basename（或等价的路由前缀），只处理自己那一段，例如壳匹配 /orders/*，子应用 basename 为 /orders。hash 路由与 history 路由不要在同一产品里混用两套而不写清边界。Federation 只加载模块，不替你合并路由表，见 mfe-module-federation。',
    why:'两边都「能跳转」，联调时返回键跳到陌生页，或刷新子路径 404，因为服务器只配了壳的回退。',
    example:'壳路由：/、/orders/*、/goods/*。订单 remote 内的路由写 basename="/orders"，内部路径是 /list、/detail/:id，对外仍是 /orders/list。服务器把 /orders/* 回退到壳的 index.html，再由壳挂载订单应用。',
    task:'画出三条路径各由谁处理。再写出子应用的 basename。缺服务器回退时标出刷新会怎样。',
    answer:'壳处理总览与前缀分发；子应用只处理 basename 下的相对路径。服务器要对壳做 SPA 回退。子应用再造一套顶层 BrowserRouter 监听整站时，返回键与刷新会乱。',
    keywords:'basename history BrowserRouter 微前端路由',
    diagram:'diagrams/mfe-routing.svg',
    points:['一页一条 history，壳拥有顶层前缀','子应用用 basename 只消化自己的一段','服务器回退与路由前缀要一起配'],
    deep:[
      {title:'软导航与硬刷新',body:'壳内切换应走客户端路由。整页刷新后仍要能根据 URL 挂载正确的子应用，所以前缀登记必须在壳的启动配置里，而不是只在内存菜单里。'},
      {title:'怎样自己验证',body:'打开 /orders/list 后点返回，应回到壳记录的上一页。子应用再 new 一个无 basename 的顶层 Router 后，同一操作应能复现错乱。'}
    ],
    refs:[['MDN：History API','https://developer.mozilla.org/en-US/docs/Web/API/History'],['React Router：basename','https://reactrouter.com/en/main/router-components/browser-router']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-style-isolation',
    title:'样式隔离要靠边界，全局 CSS 会串到别人的按钮',
    prompt:'两个子应用都写了 .button { color: red }，上线后会不会各管各的？',
    promptAnswer:'不会。同一文档里未隔离的全局选择器会互相覆盖，后加载的往往赢。',
    core:'微前端常见样式事故是全局选择器、标签选择器与裸组件类名冲突。隔离手段按强度分：约定前缀或 CSS Modules 把类名编成唯一；Shadow DOM 把样式作用域限制在 shadow root；iframe 用独立文档，样式默认不穿透，通信走 postMessage。运行时沙箱可以重写样式插入，但不能代替命名纪律。组件库应作为 shared 或构建时版本钉死，避免一页里两套主题变量。选择器越宽，串扰概率越高：避免子应用写 body、html 或通配重置而不收敛到自己的挂载根。',
    why:'本地单独打开都好看，拼到壳里按钮颜色闪一下又变。根因是全局 CSS 顺序，不是设计稿。',
    example:'订单应用根节点 #orders-root，样式都写在该根下或用 CSS Modules。营销应用用 Web Component 的 shadow root 包住活动页。第三方报表用 iframe 嵌入，避免它的 Bootstrap 洗掉壳的导航。',
    task:'给三个子应用各选一种隔离：前缀或 Modules、Shadow DOM、iframe。写出为什么那一档强度足够。',
    answer:'自有团队可控的用前缀或 CSS Modules；需强样式边界的用 Shadow DOM；不信任的第三方用 iframe。裸 .button 全局类不要进子应用。',
    keywords:'CSS Modules Shadow DOM iframe 样式隔离',
    points:['全局类名在同一文档会串','隔离强度从命名、Shadow 到 iframe 递增','组件库版本与主题变量要统一来源'],
    deep:[
      {title:'弹层挂到 body 时',body:'Modal 挂到 document.body 会逃出子应用根，样式前缀要覆盖传送门目标，或约定统一的挂载点。'},
      {title:'怎样自己验证',body:'两个子应用都定义 .button，先后挂载，检查计算样式谁赢。改成 Modules 或 Shadow 后，两边颜色应互不影响。'}
    ],
    refs:[['MDN：Shadow DOM','https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM'],['webpack：css-loader modules','https://webpack.js.org/loaders/css-loader/#modules']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-shared-auth',
    title:'登录态跨应用靠约定通道，不要靠 window 上的全局变量',
    prompt:'壳登录后把 token 挂到 window.__TOKEN__，子应用直接读，这样可以吗？',
    core:'跨应用共享身份有三条常见通道：同站 Cookie（注意 Domain、Path、Secure、HttpOnly）、壳通过 props 或框架约定的上下文注入、受控的自定义事件或短生命周期的 postMessage。window 全局变量没有所有权、难卸载、易被其它脚本读写，不适合当长期契约。Token 进 localStorage 仍受 XSS 面影响，见 xss、cookie-credential。子应用不要各自再弹一套登录，除非它是独立域名的真正独立产品。权限判断仍要在各自后端做，壳带过「已登录」不等于对象级授权，见 object-level-authz。',
    why:'全局变量在联调能通。上线后广告脚本或残留子应用改写了同一字段，订单请求带着别人的 token。',
    example:'同站点壳与子应用：会话 Cookie 设在父域，HttpOnly。Federation 模块由壳在 mount 时传入 getAccessToken 函数。跨域 iframe：用 postMessage 交接一次性授权码，不传长期密码。',
    task:'写出身份从壳到子应用的通道、存放位置、以及子应用卸载后通道还在不在。出现 window.__ 就划掉。',
    answer:'优先 Cookie 或壳注入的函数/上下文。卸载后不应留下可写的全局 token 字段。划掉 window.__TOKEN__ 这类无主全局变量。',
    keywords:'微前端 登录态 Cookie postMessage token',
    points:['跨应用身份要有明确通道与所有权','不要用长期 window 全局变量传 token','壳的登录态不替代后端对象级鉴权'],
    deep:[
      {title:'和 CSRF、CORS 的边界',body:'Cookie 会话要配好 CSRF，见 csrf-boundary。跨域接口仍要 CORS，见 cors。微前端不自动解决这两件事。'},
      {title:'怎样自己验证',body:'壳登录后挂载子应用，子应用应能发起已认证请求。卸载子应用后，全局对象上不应再有可枚举的 token 字段。'}
    ],
    refs:[['MDN：document.cookie','https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie'],['MDN：window.postMessage','https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-independent-deploy',
    title:'独立发布要有可回滚的入口地址与兼容窗口',
    prompt:'子应用一发版就改掉 CDN 上的 remoteEntry.js，壳不发版，为什么有时全站白屏？',
    promptAnswer:'覆盖同一个 remoteEntry.js 无法回滚。产物要带版本，壳要能捕获加载失败并降级。',
    core:'运行时组合的好处是壳不发版也能换子应用；前提是入口 URL 与导出契约在兼容窗口内。每次发布应落到带版本或不可变哈希的路径，再原子更新「当前指针」，而不是直接覆盖唯一的 remoteEntry.js 让新旧壳半截引用。回滚是把指针拨回上一份不可变产物，而不是在已覆盖的文件上祈祷缓存过期。壳要能显示子应用加载失败的降级，而不是未捕获异常掀翻整页。构建时组合没有「只发子应用」这条路径，不要用运行时回滚手册去处理它，见 mfe-composition-models。',
    why:'覆盖同一文件名后，用户有的命中旧壳缓存、有的拉到新 remote，exposes 改名即白屏，且无法指认该回滚哪一次。',
    example:'上传 /orders/remoteEntry.a1b2.js 与对应 chunk，确认探活后再把 orders 的当前指针改为该 URL。出问题把指针改回 remoteEntry.9f3c.js。壳 catch 加载失败时展示「订单模块暂不可用」而不是空白。',
    task:'写出子应用产物的不可变路径、当前指针更新步骤、以及失败时壳上的降级文案。',
    answer:'产物带哈希或版本目录；指针更新与回滚可逆；壳捕获加载失败并显示降级。不要只覆盖同一个 remoteEntry.js。',
    keywords:'独立发布 remoteEntry 回滚 不可变产物',
    points:['运行时入口要用不可变产物加指针','回滚是拨指针，不是覆盖同一文件','壳要有子应用加载失败的降级'],
    deep:[
      {title:'缓存与指针',body:'remoteEntry 的指针文件可以短缓存；带哈希的 chunk 长缓存。两者调反了会出现指针对了、chunk 仍旧的半新半旧。'},
      {title:'怎样自己验证',body:'发一版坏的 expose 改名，只拨指针应能复现白屏；拨回旧指针应恢复。整站回滚壳不应是唯一手段。'}
    ],
    refs:[['webpack：Module Federation','https://webpack.js.org/concepts/module-federation/'],['MDN：HTTP 缓存','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-perf-cost',
    title:'微前端的首屏成本要单独立账：重复框架与多次加载',
    prompt:'拆成三个子应用之后，首屏变慢，是不是只能怪业务组件太重？',
    promptAnswer:'不是。先核对是否加载了多份框架、是否串行拉多个 remoteEntry，再查业务组件。',
    core:'微前端额外的性能账包括：多个 remoteEntry 与公共依赖的网络往返、shared 未生效时的重复框架、首屏挂载了当前路由不需要的子应用、以及沙箱或 HTML 入口解析的开销。优化顺序与单体类似，但多一步「按路由只加载当前子应用」，见 mfe-runtime-lifecycle。shared 单例生效后，体积账应下降；若 Network 面板仍看到两份 react，先回到 mfe-shared-deps。预加载可以加速下一跳，不要在首屏把所有 remote 都 eager 拉齐。量测用同一条用户路径的 LCP 与 JS 字节，对比拆分前后，见 web-vitals。',
    why:'把变慢一律归咎于业务代码。实际上首屏串行加载了三个 remoteEntry，其中两个路由用不到。',
    example:'进入 /orders/list 时只加载订单 remote。商品 remote 在用户点到商品菜单时再拉。共享 React 在 Network 里只出现一次。',
    task:'记录首屏请求里有几个 remoteEntry、几份 React。写出一条「当前路由不该加载」的子应用名。',
    answer:'首屏只保留当前前缀的 remoteEntry；React 应一份。出现用不到的子应用入口就划掉。重复 React 先修 shared。',
    keywords:'微前端 性能 remoteEntry LCP shared',
    points:['按路由加载当前子应用，不要首屏拉齐','重复框架先查 shared','用同一路径对比拆分前后的字节与 LCP'],
    deep:[
      {title:'和构建拆分对比',body:'单体的路由懒加载也有异步 chunk，但只有一份运行时。微前端多出来的是容器初始化与可能的重复依赖，必须单独出现在性能记录里。'},
      {title:'怎样自己验证',body:'Performance 与 Network 里标出 remoteEntry 起点与 React 下载次数。禁掉非当前路由的 remote 后 LCP 应改善。'}
    ],
    refs:[['web.dev：LCP','https://web.dev/articles/lcp'],['webpack：Module Federation shared','https://webpack.js.org/plugins/module-federation-plugin/']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-contract-version',
    title:'跨应用契约要版本化：导出名称、路由前缀与共享依赖',
    prompt:'remote 把 exposes 的 ./OrderList 改成 ./OrderTable，壳没改，为什么只在部分用户那里炸？',
    promptAnswer:'导出路径是契约的一部分。remote 改名而壳未跟上时，只有加载到新产物的用户会炸。',
    core:'微前端的契约至少三份清单：导出模块名与 props 形状、路由前缀与 basename、shared 的包名与版本范围。改名或删导出属于破坏性变更，要走版本窗口：新 remote 同时暴露旧名与新名，或壳与 remote 同窗口发布，见 mfe-independent-deploy。契约变更记在可检索的文件里，而不是聊天记录。消费方应在加载失败时有降级，生产环境用可观测性看到「哪个 remote 的哪个导出」失败。TypeScript 类型可以共享，但运行时仍以实际导出为准，不要假设类型包更新等于 CDN 已更新。',
    why:'以为「内部重构」不影响别人。旧壳缓存还在引用旧导出名，只有部分地区的用户白屏。',
    example:'契约文件写明 orders 暴露 ./OrderList，props 为 { id: string }，前缀 /orders，react ^19。改名为 ./OrderTable 的发布周期内，exposes 临时同时保留两个键；壳切到新键后再删旧键。',
    task:'写出一份最小契约：一个导出名、一个路由前缀、一个 shared 包版本。再写出一次破坏性改名的两步发布。',
    answer:'契约含导出、前缀、shared 范围。破坏性改名先双导出或同窗口发布，再删旧名。不能只改 remote 不管壳。',
    keywords:'微前端 契约 版本 兼容 导出',
    points:['导出名、路由前缀、shared 范围都是契约','破坏性变更要双轨或同窗口','失败要能定位到哪个 remote 的哪个导出'],
    deep:[
      {title:'契约测试',body:'CI 可对 remoteEntry 的导出列表做快照对比，防止静默删键。壳的集成测试应 mock 加载失败路径。'},
      {title:'怎样自己验证',body:'只发改名后的 remote，旧壳应走降级或双导出仍可用。删掉旧键且壳未改，应稳定复现失败。'}
    ],
    refs:[['webpack：Module Federation','https://webpack.js.org/concepts/module-federation/'],['semver：Semantic Versioning','https://semver.org/']]
  }
];

for (const {points, refs, map, ...lesson} of COVERAGE_FRONTEND_26) {
  const row = map ? {...lesson, map} : lesson;
  window.LESSONS.push(row);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
