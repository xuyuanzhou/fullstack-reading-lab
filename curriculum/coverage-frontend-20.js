/* Frontend 20: how to choose a UI stack and keep one ecosystem per slot.
   Facts follow current official docs. Mechanism lessons stay in React / Vue / RN / uni-app. */
const COVERAGE_FRONTEND_20 = [
  {
    track:'frontend', group:'技术选型', id:'fe-pick-by-surface',
    title:'先定目标端，再决定留哪一个框架',
    prompt:'为什么「公司都在用 React」还是选不出该新建 Nuxt、小程序还是原生 App？',
    core:'选型先定这次交到哪一端：浏览器里的后台或工具页、要在「查看网页源码」里就有正文的内容页、微信小程序，还是手机 App。再写下第一屏 HTML 里要不要有正文，以及团队已经会调试哪一种界面更新方式。浏览器后台可以做成纯客户端应用，首屏允许先是空壳。文章、商品页要在源码里就有正文，用会在服务端取数的框架（如 Nuxt、Next），或用 Astro 把静态 HTML 和少量可交互组件分开。微信小程序要单独登记页面并交出该端模板，见 `uniapp-pages-json-entry`、`taro-pages-in-app-config`。没有 DOM 的手机界面分两支：自己画像素、两端外观一致时用 Flutter，见 `flutter-widget-not-html`；要系统原生控件时用 React Native，见 `rn-view-not-div`。四个目标端可以是四个产品；同一个页面不要同时承诺四种运行时。谁负责画这一帧，见 `cross-four-who-paints`。',
    why:'先按热度选定框架，再发现正文不在 HTML 里、小程序没有页面登记、手机上还在找 div。目标端写在前面时，框架只是该端的实现，换一句需求才会换框架。',
    example:'后台表格：浏览器应用，首屏可以是壳。帮助中心文章：源码里要有正文。客服入口只上微信：单独的小程序工程。已有 App 里要系统列表：React Native 的 View 和 FlatList，见 `rn-flatlist-window`。两端按钮必须长得一样、由引擎来画：Flutter。四句需求各留一个工程，不把四个脚手架装进同一个 package.json。',
    task:'给手上的功能写四格：谁打开、首屏 HTML 要不要正文、有没有小程序页面、有没有原生视图。每一格只留一个框架名，空着的格写「这次不做」。',
    answer:'四格示例：谁打开写成浏览器后台，框架留 Vue 或 React 客户端应用；小程序和原生两格写「这次不做」。首屏 HTML 要正文时换成 Nuxt、Next 或 Astro。有小程序页面时留 uni-app 或 Taro，浏览器格写这次不做。有原生视图时留 React Native 或 Flutter。每一格只一个名字。',
    keywords:'前端选型 目标端 SSR 小程序 React Native Astro',
    diagram:'diagrams/fe-pick-surface.svg',
    points:['先写打开方式和首屏里有没有正文','内容页用服务端 HTML 或少量可交互组件，后台可以是客户端应用','小程序和原生界面各自一个运行时'],
    deep:[
      {title:'静态页里的可交互组件和整页应用',body:'Astro 先给出静态 HTML，只把标成可交互的组件送去客户端执行。整页都是登录后的表格和表单时，路由、数据和权限是一整棵应用，用该 UI 模型自己的应用框架，而不是把每个按钮都单独拆成一块客户端代码。'},
      {title:'怎样自己验证',body:'打开页面源码。正文已经在 HTML 里，才算内容页交到了浏览器。源码只有空壳、数据在浏览器请求回来，就是客户端应用。再看仓库是不是还夹着第二套小程序或原生工程。'}
    ],
    refs:[['Astro：岛屿架构','https://docs.astro.build/en/concepts/islands/'],['React：创建应用','https://react.dev/learn/creating-a-react-app']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-ui-update-model',
    title:'框架之间比的是谁负责更新界面',
    prompt:'为什么把 React、Vue、Angular、Svelte 排成先进程度，仍然决定不了调试时先看哪一行？',
    core:'React 里界面是状态的函数，下一次画面要等你提交的更新，状态队列见 state-queue。Vue 用代理拦截读写，模板在编译期绑好依赖，改数据就会通知用到它的效果，见 vue-defineproperty-proxy。Angular 从 v21 起新应用默认无 Zone，模板里读到的信号变化会安排检查，见 fe-angular-first-party。Svelte 5 的 $state、$derived、$effect 是编译器指令，编译结果直接更新对应 DOM，应用框架是 SvelteKit。四种模型都能做表格。选型留下团队能指出「这次赋值为什么会或不会重画」的那一种。星数、招聘广告和去年的路线图不参与这句判断。',
    why:'按先进程度各装一套之后，同一个字段在仓库里既有 setState，又有代理，又有信号。线上少画一次时，没有人知道该打断点的是哪一种通知。',
    example:'计数器：React 写 setCount。Vue 改 ref 或 reactive 字段。Angular 写 signal.set。Svelte 写 count++，前提是 count 来自 $state。四种写法都不要出现在同一个按钮组件里。',
    task:'选一个已经会讲清楚的更新模型，用它实现计数。另外三种只写出「这次不引入」和对应的官方应用框架名字，不新建工程。',
    answer:'留下一种更新模型，并留下它的官方应用框架。React 看提交的更新，Vue 看代理通知，Angular 新应用看信号，Svelte 看编译期标出的依赖。同一个组件不混四种赋值方式。',
    keywords:'React Vue Angular Svelte 更新模型 信号 runes',
    diagram:'diagrams/fe-ui-update-model.svg',
    points:['React 的下一次画面来自你提交的更新','Vue 用代理通知，Angular 新应用用信号安排检查','Svelte 5 用编译期 runes 标出依赖，四种写法不进同一个组件'],
    deep:[
      {title:'模型和生态是两笔',body:'选定谁负责更新之后，路由、跨页状态和请求缓存跟着这个模型走，见 fe-ecosystem-follows-model。先装齐四个生态、再决定用哪个模型，槽位会重复。'},
      {title:'怎样自己验证',body:'在选定的模型里改计数，确认只有一种赋值会让数字变化。仓库搜索另外三种入口：setState 与 signal( 与 $state 与 ref( 不应同时成为这个按钮的写法。'}
    ],
    refs:[['React：状态','https://react.dev/learn/state-a-components-memory'],['Vue：响应式基础','https://vuejs.org/guide/essentials/reactivity-fundamentals.html'],['Svelte：Runes','https://svelte.dev/docs/svelte/what-are-runes']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-react-framework-first',
    title:'新的 React 应用从文档列出的框架起',
    prompt:'为什么只用 Vite 配上 react 和 react-dom，路由和取数仍然要自己再做一套框架？',
    core:'React 文档推荐新项目使用已集成路由、数据获取和打包的框架。页面上列出的是 Next.js 的 App Router，以及可与 Vite 搭配的 React Router 框架模式，创建命令分别是 create-next-app 和 create-react-router。Create React App 已经日落，见 retired-frontend-stack。服务端组件和客户端组件的边界见 react-rsc-vs-client。loader 只在数据模式和框架模式里、于渲染前执行，见 rr-mode-gates-data、react-router-loader。用 Vite 从零组装是允许的，文档同时写明你要自己选定路由和数据获取，那相当于自建框架。原生方向文档把 Expo 和这两个 Web 框架并列，视图模型仍是 React Native，见 rn-view-not-div。',
    why:'把「能打开开发服务器」当成选型结束。下一周补路由、再下一周补服务端数据，仓库里出现第二套路由和手写的请求缓存，文档里的框架本来已经带了这些槽位。',
    example:'新的全栈页面用 create-next-app，或用 create-react-router 的框架模式。已有特殊约束、必须自己控制打包时，用 Vite 模板，并在同一天写上唯一的路由库和唯一的服务端数据槽位。不要再执行已经日落的 create-react-app。',
    task:'写出本次的创建命令。若命令是 Vite 模板，在旁边写上路由库和数据获取各一个名字。若命令是文档列出的框架，这两个槽位写「框架自带」。',
    answer:'新项目的创建命令来自 React 文档列出的框架，或明确写成 Vite 自建并补上路由和数据两个槽位。Create React App 不再是起点。原生界面另走 Expo 所接的 React Native 视图，不把 Web 框架当成手机运行时。',
    keywords:'Next.js React Router create-react-app Vite Expo',
    points:['新项目用文档列出的 Next.js 或 React Router 框架模式','Vite 从零组装要自己选定路由和数据获取','Create React App 已日落，不再作为创建命令'],
    deep:[
      {title:'框架模式和组件路由',body:'React Router 可以只做声明式组件路由，也可以用带 loader 和 action 的数据模式，或再用 Vite 插件收成框架模式。选型要写明用到哪一档。只装了组件路由，却以为服务端数据、错误边界和打包约定都已经有了，后面会再引进第二个框架。'},
      {title:'怎样自己验证',body:'看 package.json 的创建痕迹和依赖。存在 next 或框架模式的 React Router 插件时，路由槽位算框架自带。只有 react 和 react-dom 时，列出你另外选定的那一个路由库。'}
    ],
    refs:[['React：创建应用','https://react.dev/learn/creating-a-react-app'],['React：从零搭建','https://react.dev/learn/build-a-react-app-from-scratch'],['React：Create React App 日落','https://react.dev/blog/2025/02/14/sunsetting-create-react-app']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-vue-official-slots',
    title:'Vue 新项目的槽位是 Vite、Router 和 Pinia（Vue 3）',
    prompt:'为什么 Vue 3 工程里又出现 Vue CLI、Vuex 和一套手写 history？',
    core:'官方脚手架 **create-vue**（Vue 3）基于 Vite。创建时可选 Vue Router、Pinia、Vitest 和端到端测试。迁移说明里的现行默认是：构建用 Vite，Vue CLI 只维护旧项目；跨页状态用 Pinia，Vuex 只维护已有仓库，见 pinia-not-vuex；编辑器用 Vue 官方扩展。需要文件路由、服务端渲染和把数据放进首屏 HTML 时用 Nuxt，取数走 useFetch 或 useAsyncData，见 nuxt-payload。Nuxt 默认用 Vite，不再附带 Vuex。页面级路由在 SPA 里是 Vue Router，不要再平行装一个 history 库去管同一批 URL。',
    why:'三套构建和两套 store 同时在依赖里，热更新走的是哪一条、退出登录该清哪一份状态，都要对着两份文档。新项目按脚手架的选项各留一个，旧项目才保留 Vuex 或 Vue CLI。',
    example:'管理后台：create-vue，勾上 Vue Router 和 Pinia。文章站要看源码里的正文：Nuxt，数据用 useAsyncData。两份 package.json 都不要新增 vuex，也不要同时用 vue-cli-service 和 vite 作为开发命令。',
    task:'打开创建选项或 package.json，列出构建、路由、跨页状态各一个包名。出现 vuex 或 @vue/cli 时，写明这是旧仓库保留，还是这次误加的第二槽位。',
    answer:'新的 Vue 单页应用用 Vite、Vue Router 和 Pinia。要服务端 HTML 时换 Nuxt，仍然用 Pinia，数据进 payload。Vuex 和 Vue CLI 只留在已经使用它们的仓库。同一批 URL 只交给一个路由实现。',
    keywords:'create-vue Vite Vue Router Pinia Nuxt Vuex',
    diagram:'diagrams/fe-ecosystem-slots.svg',
    points:['create-vue 的构建是 Vite，可选 Router 和 Pinia','Nuxt 负责文件路由和首屏数据，状态库仍是 Pinia','Vuex 与 Vue CLI 只维护旧项目'],
    deep:[
      {title:'和机制课的分工',body:'路由复用、守卫和 Pinia 的 storeToRefs 在 Vue 与 Vue 生态那两章。这里只决定槽位留谁。选定 Pinia 之后，不要为了「更简单」再导出一份 reactive({}) 当第二份全局会话。'},
      {title:'怎样自己验证',body:'npm run dev 实际执行的应是 Vite 或 Nuxt，而不是同时还有 vue-cli-service。store 目录的定义来自 defineStore。搜索 new Vuex.Store，新代码路径上应当没有。'}
    ],
    refs:[['Vue：快速上手','https://vuejs.org/guide/quick-start'],['Vue 3 迁移：框架级建议','https://v3-migration.vuejs.org/recommendations'],['Nuxt：简介','https://nuxt.com/docs/getting-started/introduction']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-angular-first-party',
    title:'Angular 的路由、HTTP 和表单用自己的包（v21）',
    prompt:'为什么新的 Angular 工程还要再装一套 React Query、Redux 和 react-router？',
    core:'**Angular v21** 起，新应用默认采用无 Zone 的变更检测，引导配置里不要再用 provideZoneChangeDetection 把它改回去。模板读取的信号更新、markForCheck、组件输入和模板事件会安排检查。信号用 signal、computed 和 effect 描述状态和派生。HttpClient 从 v21 起默认可注入；更早的工程用 provideHttpClient，而不是再引入已不推荐的 HttpClientModule 当现行写法。路由用 provideRouter 和 RouterOutlet。表单是应用主体时用响应式表单，模型放在组件类里。这些包都在 @angular 下。输入钩子何时触发见 angular-ngonchanges-primitives。已有工程可以仍带着 zone.js，那是迁移状态，不是新项目的默认。',
    why:'把 React 生态的请求缓存和路由再装一份之后，同一次跳转既走 Angular Router 又走另一个 history，列表既在 HttpClient 的流里又在第二份缓存里。取消订阅和刷新列表会对不上。',
    example:'订单 API 放在可注入的服务里，组件订阅 HttpClient 返回的 Observable，或按文档用资源把异步数据接进信号。地址用 routerLink。不要为这个工程添加 @tanstack/react-query 或 react-router-dom。',
    task:'在新工程的依赖里确认路由、HTTP、表单都来自 @angular。若 zone.js 还在，写明这是 v21 之前的工程还是有意覆盖了默认。',
    answer:'新应用保持无 Zone 默认，状态用信号，请求用 HttpClient，地址用 provideRouter，复杂表单用响应式表单。不要把 React 的路由和请求库当成 Angular 的对应生态。旧工程里的 Zone 是待迁移项。',
    keywords:'Angular zoneless HttpClient provideRouter 响应式表单 信号',
    points:['Angular v21 新应用默认无 Zone，状态用信号','HttpClient 与 provideRouter 是请求和路由的官方入口','响应式表单表达表单模型，不另装 React 的数据栈'],
    deep:[
      {title:'Observable 要有订阅者',body:'HttpClient 的方法返回冷 Observable，订阅才发出请求，同一 Observable 订阅两次会请求两次。选 Angular 的数据槽位，就要按这个时机处理取消和重复，而不是再包一层只认 hook 的缓存库。'},
      {title:'怎样自己验证',body:'新建工程看 polyfills 或依赖里没有 zone.js，引导处没有 provideZoneChangeDetection。发一次 GET 只出现在 HttpClient 的服务里。路由表是 provideRouter 的那一份。'}
    ],
    refs:[['Angular：Zoneless','https://angular.dev/guide/zoneless'],['Angular：HttpClient','https://angular.dev/guide/http/setup'],['Angular：Router','https://angular.dev/guide/routing/router-reference']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-sveltekit-runes',
    title:'Svelte 应用用 SvelteKit，状态用 runes',
    prompt:'为什么选了 Svelte 又装上 Vue Router，编译却仍然不管那些路由组件？',
    core:'Svelte 把组件编译成直接更新 DOM 的代码，运行时没有一份虚拟 DOM 库负责 diff。Svelte 5 用 runes 告诉编译器哪些值要追踪：$state 声明状态，$derived 声明派生，$effect 声明副作用。它们是编译期语法，不是可以 import 的函数，也能用在 .svelte.js 和 .svelte.ts 里共享状态。官方应用框架是 SvelteKit，负责文件路由、加载数据和适配部署，开发服务器基于 Vite。新项目用 sv create。只做组件库时可以用 vite-plugin-svelte，路由和加载数据就不再由 SvelteKit 提供，要另选并写明。',
    why:'Svelte 的单文件组件进了 Vue 或 React 的路由出口，编译器没有参与那些页面的依赖追踪。交互要么不更新，要么又引进第二套运行时。',
    task:'决定这次是 SvelteKit 应用还是只发布组件。应用的话，路由和 load 都留在 SvelteKit；组件库的话，写出嵌入方是谁，以及 .svelte 文件由谁编译。',
    example:'文章页是 src/routes 下的 +page.svelte，数据在对应的 load。计数写 let count = $state(0)。不要把这个页面改成 vue-router 的一个 component 选项，也不要在同一仓库再初始化 createRoot。',
    answer:'新应用用 SvelteKit。状态和派生用 runes，由编译器生成更新。组件库嵌入别的应用时，写明谁负责路由，以及 Svelte 编译发生在哪一步。不要用 Vue Router 或 React Router 去承载未编译的 .svelte 页面。',
    keywords:'SvelteKit runes $state Vite sv create',
    points:['Svelte 5 用 runes 在编译期标出依赖','SvelteKit 是官方应用框架，并基于 Vite','组件库模式要单独写明路由和编译由谁负责'],
    deep:[
      {title:'runes 不是运行时函数',body:'$state 不能传给另一个函数当作回调。它只在 Svelte 编译的文件里、出现在允许的位置时才有意义。把响应式寄托在一份手写的发布订阅上，等于放弃这次选型要的编译期更新。'},
      {title:'怎样自己验证',body:'sv create 之后，路由文件在 src/routes。改 $state 字段，页面上绑定的文本应变化，依赖列表里不应再出现 vue 或 react-dom。'}
    ],
    refs:[['Svelte：Runes','https://svelte.dev/docs/svelte/what-are-runes'],['SvelteKit：简介','https://svelte.dev/docs/kit/introduction']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-react-one-slot',
    title:'React 每个生态槽位只留一个库',
    prompt:'为什么 Redux、Zustand、React Query 和两套路由会同时出现在一个新仓库？',
    core:'槽位按职责拆开。应用框架占用「路由 + 打包 + 数据入口」时，不要再装第二个路由。自建时文档建议的路由是 React Router 或 TanStack Router，二选一，加载器见 react-router-loader。服务端列表的缓存用 TanStack Query：它保存的是请求结果，组件里调用的仍然是你的请求函数，见 query-cache-not-http-client、query-fn-calls-the-client。多个页面共享、而且只存在于客户端的会话，才考虑 Redux Toolkit，见 redux-rtk-today。同一份订单列表不要既进 Query 又进 slice。主题、弹层、列表、购物车各住哪里，见 state-kind-picks-home。样式同样只留一条进入组件的路径。测试断言用 Testing Library 的角色查询，见 react-enzyme-not-default。',
    why:'每个热门库都装上之后，失效订单列表要记两个 API，路由参数有两套钩子。新人无法从目录判断该改哪一个文件。',
    example:'Next 应用：路由和服务器数据入口用框架的。浏览器里复用的 GET 用 Query，queryKey 包含筛选条件。登录态若必须全局可读，用一份 Toolkit store，里面不复制订单数组。包管理文件里不应同时有 react-router 和 @tanstack/react-router，除非写明一个只用于遗留页面并有删除日期。',
    task:'画五格：应用框架、路由、服务端缓存、客户端全局状态、样式。每格一个名字或「不需要」。两格写了同一个职责时删到一格。',
    answer:'框架自带的路由不要再配第二个路由库。服务端列表留在 Query 或路由加载器。Redux Toolkit 只放客户端共享状态。样式和测试各一条路径。同一份服务器数据只有一个缓存主人，见 fe-server-state-one-owner。',
    keywords:'TanStack Query Redux Toolkit React Router 槽位',
    points:['路由只留框架自带或单独一个路由库','服务端缓存用 Query 或加载器，不再复制进 store','客户端全局状态和样式各自一条路径'],
    deep:[
      {title:'RTK Query 也占数据槽',body:'Toolkit 可以带 RTK Query。它和 TanStack Query 都是服务端缓存。选定一个作为列表的主人。两个都装上时，失效和重试策略会各写一遍。'},
      {title:'怎样自己验证',body:'搜索 Routes 与 createBrowserRouter 与 createRouter。新功能路径上只应命中一种。再搜索订单类型：缓存更新函数只应来自 useQuery 或加载器，slice 里没有同一数组。'}
    ],
    refs:[['TanStack Query：概述','https://tanstack.com/query/latest/docs/framework/react/overview'],['Redux：为何今天用 Toolkit','https://redux.js.org/introduction/why-rtk-is-redux-today'],['React：从零搭建','https://react.dev/learn/build-a-react-app-from-scratch']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-server-state-one-owner',
    title:'同一份服务端数据只留一个缓存主人',
    prompt:'为什么接口已经返回新订单，页面仍显示改之前的列表？',
    core:'GET 回来的列表是服务端状态。它的缓存主人只能有一个：Query 的 queryKey、路由加载器、Nuxt 的 useAsyncData、Angular 服务里的那一次流，或仅属于当前页的组件状态。Pinia 和 Redux 放的是客户端还要继续改、并且多个页面一起读的数据，见 pinia-not-vuex。把同一列表再提交进 store，失效时只清了请求库，store 里仍是旧数组，界面继续读旧的那份。主人负责键：筛选条件变了，键要变，否则会把上一页的结果留在下一页。',
    why:'为了「保险」写两份缓存。刷新按钮清掉其中一份，绑定在模板上的是另一份。用户看到的仍是旧订单，网络面板里新响应已经回来了。',
    example:'订单页的列表只放在 useQuery({ queryKey: ["orders", status] })。状态筛选变了，键跟着变。不要在 onSuccess 里再 dispatch(setOrders)。Vue 页同理：要么页面内的请求，要么 Pinia 里一份，不要两份一起绑定到表格。',
    task:'找到表格的数据表达式，向上追到唯一的赋值点。若还有第二处把同一响应写进全局 store，删掉第二处，再改筛选条件确认不会留下上一份列表。',
    answer:'表格只读一个缓存。键包含会改变结果的参数。全局 store 不复制这份服务端列表。刷新和失效只调用主人的那一个 API。',
    keywords:'服务端状态 queryKey Pinia 缓存主人 失效',
    points:['服务端列表只放在一个缓存里','缓存键要包含会改变结果的参数','全局 store 不保存同一份请求结果'],
    deep:[
      {title:'页面内状态也算主人',body:'只用一次、离开就丢的列表可以留在组件里，不必先升级成 Query 或 Pinia。它一旦被复制到全局，就变成两个主人。升级时是搬走，不是再抄一份。'},
      {title:'怎样自己验证',body:'改筛选后看网络请求的查询参数，以及表格第一行。第一行必须属于新参数。若第一行仍是旧数据，说明绑定读的是没有跟着键失效的那一份。'}
    ],
    refs:[['TanStack Query：查询键','https://tanstack.com/query/latest/docs/framework/react/guides/query-keys'],['Pinia：介绍','https://pinia.vuejs.org/introduction.html'],['Nuxt：数据获取','https://nuxt.com/docs/getting-started/data-fetching']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-cross-end-one-runtime',
    title:'跨端先选定一个运行时',
    prompt:'为什么同一份 React 组件既打进网页，又期望小程序和 App 都不用改？',
    core:'运行时决定组件最后画到什么上。浏览器应用画到 DOM，用前面选定的 Web 框架。小程序要在逻辑层和视图层之间交数据：uni-app 改的是 Vue 数据，Taro 把模拟树 setData 到模板，两边的页面清单和钩子不能互换，见 taro-and-uniapp-layers。要编成 Android 原生语言的新工程是 uni-app x，页面是 uvue，不能把旧的 .vue 直接混进去，见 uniapp-x-uts-not-vue-page。没有 DOM 时再分宿主：像素自己画、用 Dart 和 Widget，选 Flutter，路由见 flutter-gorouter-not-named；要系统控件，选 React Native 的 View、Text 和 Pressable，见 rn-view-not-div、rn-pressable-not-click。React 文档把 Expo 列为原生应用的推荐框架，它接的仍是 React Native 的视图。四套各自的宿主见 cross-four-where-it-fits。一个产品面只留一个运行时。营销页和小程序可以是两个仓库。',
    why:'用条件编译把三套运行时缝进一个组件。网页上的 div、小程序的 view 和原生 View 在同一个文件里各写一支，布局和事件只要改一处就会漏端。',
    example:'活动 H5 用 Vite 的 Web 应用。微信里的同一活动若必须是小程序，另开 uni-app 或 Taro，只保留一个。两端外观要由引擎画成一样：Flutter。已上架 App 要系统控件：Expo 所接的 React Native 组件。这些工程不要共用一个写着 document 的入口。',
    task:'列出这次要上的端。每个端写下运行时和页面登记文件。超过一个运行时时，拆成多个工程，或写明只有一个编译目标、其余端本次不做。',
    answer:'浏览器、小程序、自绘 App、系统视图各用自己的运行时。小程序只留 uni-app 或 Taro 其中一个。自绘留 Flutter，系统控件留 React Native。uni-app x 是另一套工程。不要把 DOM 组件编译进后面三种。',
    keywords:'运行时 uni-app Taro React Native Expo 跨端',
    diagram:'diagrams/fe-cross-end-runtime.svg',
    points:['浏览器、小程序、自绘和系统视图是不同运行时','小程序工程只留 uni-app 或 Taro','Flutter 自己画像素，React Native 使用平台视图'],
    deep:[
      {title:'一套源码的真实含义',body:'uni-app 或 Taro 能把同一套页面编译到多个小程序端和 H5，条件编译在出包前裁剪。这仍然是一个运行时家族。它不自动获得 React Native 的原生视图，也不把浏览器的 document 带进小程序。'},
      {title:'怎样自己验证',body:'在选定工程里搜索 document. 和 <div。小程序或 React Native 的源码路径上不应依赖它们。页面打不开时先看该运行时的页面清单，而不是先看另一端的路由表。'}
    ],
    refs:[['React：Create React App 日落','https://react.dev/blog/2025/02/14/sunsetting-create-react-app'],['uni-app：条件编译','https://uniapp.dcloud.net.cn/tutorial/platform.html'],['Taro：实现原理','https://docs.taro.zone/docs/implement-note']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_20) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
