/* Frontend 20: how to choose a UI stack and keep one ecosystem per slot.
   Facts follow current official docs. Mechanism lessons stay in React / Vue / RN / uni-app. */
const COVERAGE_FRONTEND_20 = [
  {
    track:'frontend', group:'技术选型', id:'fe-pick-decision-order',
    title:'选型没有打分公式：先看仓库和团队，再看打开方式',
    prompt:'会上给 React、Vue、Angular、Svelte 各打一分，再乘上「要不要服务端渲染」，为什么这样定不下来？',
    promptAnswer:'没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。人从微信打开，换的是小程序运行时，不是把 Vue 换成 React。正文要出现在源代码里时，用这个库自己的服务端方案。',
    core:'没有一张表能算出该选谁。会议按下面四条写事实，不要把它们乘成一个分数。\n\n1. 仓库和团队。产品已经用 Vue 交付，新的浏览器页面就留 Vue。没有人交付过的库，不要因为一份全球问卷里「用过的人更多」就换。问卷的样本和城市每年都在变，不能当成系数。仓库还是空的、也没有人维护过这四者时，才留下团队招得到人、也能维护的一种。招人看你们城市最近的职位，不看仓库星数。\n\n2. 谁打开。浏览器、微信小程序、手机 App 是不同运行时。对不上时换 uni-app、Taro、Flutter 或 React Native，见 `fe-pick-by-surface`。不要为了小程序把已经在用的 Web 界面库改成另一种。\n\n3. 源代码里要不要正文。登录后的表格可以是浏览器里的空壳。文章标题必须出现在「查看网页源代码」里时，用第 1 步那个库自己的方案：Vue 的应用页用 Nuxt，文档站可以用 VitePress；React 用文档列出的 Next.js 或 React Router 框架模式；Svelte 用 SvelteKit；Angular 默认在浏览器里渲染，要 HTML 时执行 ng add @angular/ssr，按路由选 RenderMode。交互很少的内容站，Astro 文档把自己定位成内容站。见 `fe-meta-framework-tradeoffs`。\n\n4. 路由和数据只装这一套。Vue 就是 Vue Router 和 Pinia，不要再装 react-router。这是装包规则，不是给四个库打分。见 `fe-ecosystem-slot-tradeoffs`。\n\n改数字时要写的那一行，是选定之后的写法，见 `fe-ui-update-model`。它不参与上面四条。',
    why:'把「谁更流行」和「要不要服务端渲染」乘在一起，空仓库会同时建出 Next 和 Nuxt。已经用 Vue 的仓库，会为了一篇帮助文章改去 React。',
    example:'帮助中心《如何退款》。仓库已经是 Vue，没有人维护 React：\n\n```text\n仓库和团队：继续 Vue。不因为问卷里 React 用过的人更多就换。\n谁打开：浏览器。不做小程序，不做 App。\n源代码：要有标题「如何退款」。用 Nuxt，不用 Next。\n路由和数据：useAsyncData。登录态用 Pinia。不装 react-router。\n```',
    task:'拿一个真实需求写四行：仓库里已有的界面库、谁打开、源代码里要不要标题、路由和数据用哪个包。不要写分数。',
    answer:'四行都是事实。已有仓库继续用原来的界面库。小程序和 App 换运行时。标题要进源代码时，用这个库自己的服务端方案。路由和数据只装这一套。没有可乘的分数。',
    keywords:'前端选型 仓库 团队 运行时 服务端 HTML',
    diagram:'diagrams/fe-pick-decision-order.svg',
    map:[
      {title:'1 仓库和团队',body:'已经在交付的界面库继续用；问卷使用率不是系数'},
      {title:'2 谁打开',body:'小程序和 App 换运行时，不换已有的 Web 界面库'},
      {title:'3 源代码',body:'要标题时用这个库自己的服务端方案'},
      {title:'4 装包',body:'路由和数据只装这一套，不给四个库打分'}
    ],
    points:['没有可乘的分数；已有仓库继续用原来的界面库','小程序和 App 换的是运行时，不是把 Vue 换成 React','正文要进源代码时，用这个库自己的服务端方案'],
    deep:[
      {title:'问卷为什么不能当系数',body:'Stack Overflow 2025 向站内渠道招募，约 4.9 万份答卷，问的是过去一年用过哪些技术。它不是各公司选型会议的记录，也不能乘上「要不要服务端渲染」。State of JavaScript 同样是自愿填写的满意度，留名字时不看那份排名。'},
      {title:'后面几课各讲什么',body:'谁打开见 `fe-pick-by-surface`。源代码里的标题见 `fe-meta-framework-tradeoffs`。选定之后官方带什么包见 `fe-framework-tradeoffs`。路由和列表各留一处见 `fe-ecosystem-slot-tradeoffs`。改数字的那一行见 `fe-ui-update-model`，那是写法，不是打分项。'},
      {title:'怎样自己验证',body:'结论里如果出现分数、星数，或「因为用过的人更多所以换库」，就还没写完。已有 Vue 仓库的文章页应写 Nuxt 或 VitePress，不应写 Next。'}
    ],
    refs:[['Vue：怎么用','https://vuejs.org/guide/extras/ways-of-using-vue.html'],['React：创建应用','https://react.dev/learn/creating-a-react-app'],['Angular：服务端渲染','https://angular.dev/guide/ssr'],['Stack Overflow 2025：方法','https://survey.stackoverflow.co/2025/methodology/']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-pick-by-surface',
    title:'人从哪打开、源代码里要不要正文',
    prompt:'公司已经在用 React。为什么这句还是决定不了：这次要新建的是浏览器里的内容站、微信小程序，还是手机 App？',
    promptAnswer:'React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。小程序和 App 要换运行时。Nuxt 是 Vue 的方案，不是从「用 React」推出来的。',
    core:'仓库里已经在用的界面库先留下，见 `fe-pick-decision-order`。这一课只写人从哪打开，以及源代码里要不要正文。打开方式对不上时，换的是运行时，不是把会用的 Vue 换成 React。\n\n浏览器里的后台或工具页、要在「查看网页源码」里就有正文的内容页、微信小程序、手机 App，是四个入口。第一屏 HTML 是浏览器菜单「查看网页源代码」里的那份，脚本还没把数据请求回来。正文是人要读的段落、标题和价格。浏览器后台可以做成纯客户端应用，首屏允许先是空壳。文章、商品页要在源码里就有正文时，用已经选定的那个库自己的服务端方案：Vue 用 Nuxt，React 用 Next 或 React Router 框架模式，Svelte 用 SvelteKit，Angular 用 @angular/ssr。交互很少的内容站可以用 Astro：整页先是这份 HTML，只有标了 client:load 的组件才把脚本送到浏览器。微信小程序要单独登记页面并交出该端模板，见 `uniapp-pages-json-entry`、`taro-pages-in-app-config`。没有 DOM 的手机界面分两支：自己画像素、两端外观一致时用 Flutter，见 `flutter-widget-not-html`；要系统原生控件时用 React Native，见 `rn-view-not-div`。四个目标端可以是四个产品；同一个页面不要同时承诺四种运行时。谁负责画这一帧，见 `cross-four-who-paints`。',
    why:'「公司都在用 React」只确定了浏览器里的界面库。人从浏览器、微信还是手机 App 打开，这句话没有写。先按热度选定框架，再发现小程序没有页面登记、手机上还在找 div。Nuxt 是 Vue 的内容站，不是从 React 推出来的。',
    example:'后台表格：浏览器应用，首屏可以是壳。帮助中心文章《如何退款》的第一屏要能在源码里读到正文。客服入口只上微信：单独的小程序工程。已有 App 里要系统列表：React Native 的 View 和 FlatList，见 `rn-flatlist-window`。两端按钮必须长得一样、由引擎来画：Flutter。四句需求各留一个工程，不把四个脚手架装进同一个 package.json。',
    task:'给手上的功能写四格：谁打开、首屏 HTML 要不要正文、有没有小程序页面、有没有原生视图。每一格只留一个框架名，空着的格写「这次不做」。',
    answer:'四格示例：谁打开写成浏览器后台，界面库留下仓库里已有的那一种，小程序和原生两格写「这次不做」。首屏 HTML 要正文时，用这个库自己的服务端方案，不另起一个别的库的脚手架。有小程序页面时留 uni-app 或 Taro。有原生视图时留 React Native 或 Flutter。',
    keywords:'前端选型 目标端 第一屏 HTML 岛屿架构 小程序 React Native Astro',
    diagram:'diagrams/fe-pick-surface.svg',
    map:[
      {title:'内容页正文',body:'写进第一屏 HTML。Nuxt、Next、Astro 都能做'},
      {title:'Nuxt',body:'整页交给 Vue，数据用 useAsyncData'},
      {title:'Next',body:'整页交给 React，从文档列出的框架起'},
      {title:'Astro',body:'整页是 HTML，只有标了 client: 的岛带脚本'},
      {title:'Svelte',body:'整页交给 SvelteKit'},
      {title:'Angular',body:'路由、HTTP、表单用自己的包'},
      {title:'登录后的表格',body:'一整棵应用，首屏可以是空壳'},
      {title:'两种界面框架同页',body:'只放在 .astro。新岛留一种，旧组件标保留'}
    ],
    points:['打开方式决定运行时；已有的 Web 界面库不为此换成另一种','正文要进第一屏 HTML 时，用这个库自己的服务端方案','小程序和原生界面各自一个运行时'],
    deep:[
      {title:'第一屏 HTML 里的正文',body:'第一屏 HTML 是浏览器菜单「查看网页源代码」里的那份文字。页面刚交到浏览器，脚本还没把数据请求回来。开发者工具里后来插入的节点，要等脚本跑完才出现。\n\n正文是人要读的内容：文章段落、商品标题和价格。按钮、空的 div，以及「加载中」这三个字，留在交互那一格。文章和商品页写下「要」。登录后的后台表格写下「不要」，首屏可以是空壳。'},
      {title:'Astro 这一页怎么交出去',body:'页面在 src/pages/ 的 .astro 里。上方 --- 在产出 HTML 的那一侧运行，浏览器不执行。默认构建时预渲染。某一页要每次请求再算，就装上适配器，并写 export const prerender = false。整站大多按请求算时，配置改成 output: \'server\'。\n\n--- 下面的标题和段落进入第一屏。没有 client: 的组件只留下 HTML。写上 client:load 后，查看网页源代码里这一处是 astro-island：client=\"load\" 表示页面一加载就取 component-url，renderer-url 是框架运行时，标签里面是已经画好的搜索框，末尾有 astro:end。xxxx 是这次构建的文件名，旁边还可能有 uid、opts、before-hydration-url。\n\n浏览器先显示这整份 HTML。脚本挂上搜索框之后，输入才有反应。再打开另一篇，是再要一份 HTML。岛上的脚本只管自己这块。'},
      {title:'表上的名字各留一个',body:'上表按谁管整页来留。Nuxt 见 `fe-vue-official-slots`，Next 见 `fe-react-framework-first`，服务端组件和客户端组件的边界见 `react-rsc-vs-client`。Svelte 见 `fe-sveltekit-runes`，Angular 见 `fe-angular-first-party`。\n\n2026 年 Nuxt、Next、Astro 都还在发版。State of JavaScript 2025 里，元框架用过的人最多的是 Next.js，满意度最高的是 Astro。留名字时看上表，不看这份排名。'},
      {title:'混用停在 .astro',body:'同一个 .astro 可以同时放 React、Preact、Vue、Svelte、Solid、Alpine，官方包是 @astrojs/react、@astrojs/vue、@astrojs/svelte、@astrojs/solid-js、@astrojs/preact、@astrojs/alpinejs。按文件后缀选择渲染器。React 和 Preact 都是 JSX 时，要在集成配置里分开。两座 Vue 岛只下载一份 Vue。一座 Vue 再加一座 React，两份运行时都下载。\n\n.vue 里不能 import .jsx，.jsx 里不能 import .astro。.astro 组件不能写 client:。新岛只留一种界面库，见 `fe-ui-update-model`。已有的另一种写成「旧组件保留」。小程序和手机 App 不写进这个文件。'},
      {title:'怎样自己验证',body:'打开页面源码。正文已经在 HTML 里，搜索框在 astro-island 里且带 client=\"load\"，才算内容页按 Astro 交到了浏览器。同一页有 .vue 和 .jsx 时，记录里写明哪一种是这次的模型。源码只有空壳，就是客户端应用。再看仓库里有没有第二套小程序或原生工程。'}
    ],
    refs:[['Astro：服务端先产出 HTML','https://docs.astro.build/en/concepts/why-astro/'],['Astro：默认预渲染','https://docs.astro.build/en/guides/on-demand-rendering/'],['Astro：岛屿架构','https://docs.astro.build/en/concepts/islands/'],['Astro：client:load','https://docs.astro.build/en/reference/directives-reference/#clientload'],['Astro：混用界面框架','https://docs.astro.build/en/guides/framework-components/#mixing-frameworks'],['State of JavaScript 2025：元框架','https://2025.stateofjs.com/en-US/libraries/meta-frameworks'],['React：创建应用','https://react.dev/learn/creating-a-react-app']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-ui-update-model',
    title:'改一个数字时，四种框架各自要写哪一行',
    prompt:'按钮一点，页面上的数字加一。React、Vue、Angular、Svelte 各自要改哪一行，数字才会变？',
    promptAnswer:'React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。Vue 在脚本里改 ref 的 .value。Angular 调用 signal 的 set，并且模板要读到这个 signal。Svelte 5 先用 $state 声明变量，再给它赋值。同一个按钮只留其中一种。',
    core:'四种都能做「数字加一」，差别是你必须写哪一句，画面才会变。下面每句都能在对应文档里对上。\n\nReact：const [count, setCount] = useState(0)。要点按钮时调用 setCount(count + 1)，或 setCount(n => n + 1)。React 会用新的 count 把这个组件再画一遍。直接写 count = count + 1 不会触发重画。见 React 文档 State。\n\nVue 3：数字用 const count = ref(0)。脚本里写 count.value++。模板里写 count++ 即可，因为模板会自动去掉 .value。Vue 在第一次渲染时记下模板用过哪些 ref，之后这个 ref 变了，就重新渲染用到它的组件。对象可以用 reactive()，返回值是原对象的 Proxy，改它的字段也会更新。文档仍把 ref() 当作声明状态的主要写法。见 Vue 响应式基础。\n\nAngular：count = signal(0)，模板里读 count()，改的时候调用 count.set(count() + 1)。模板读过的 signal 被更新后，Angular 会安排变更检查。从 v21 起，新应用默认不再靠 zone.js 在每次异步之后扫整棵组件树。不要再写 provideZoneChangeDetection 把默认改回去。已有旧工程可能仍带着 zone.js。见 Angular Zoneless。\n\nSvelte 5：let count = $state(0)，然后 count++。$state 不用 import，它是编译器认的语法，不是可以传给别的函数的运行时函数。只在 .svelte、.svelte.js、.svelte.ts 里、出现在允许的位置才有效。编译结果会去更新绑定了这个变量的 DOM。见 Svelte Runes。\n\n一个产品只留上面一种写法。这四行是选定之后怎么写，不是给四个库打分的依据。选型先看仓库和团队，见 `fe-pick-decision-order`。路由和请求怎么配，见 `fe-framework-tradeoffs`。',
    why:'四种写法堆在同一个按钮上时，数字不变，你不知道该看 setCount、count.value、signal.set，还是 $state。先选定一种，另外三种这次不引入。',
    example:'只留你选定的那一种：\n\n```js\n// React\nconst [count, setCount] = useState(0)\nsetCount(count + 1)\n\n// Vue 3（脚本里要 .value；模板里可以 count++）\nconst count = ref(0)\ncount.value++\n\n// Angular\ncount = signal(0)\ncount.set(count() + 1)\n\n// Svelte 5（不用 import $state）\nlet count = $state(0)\ncount++\n```',
    task:'选一种实现「点击加一」。另外三种各写一句「这次不用」，并写上上面的那一行代码，用来对照，不新建另外三个工程。',
    answer:'留下一种。React 调 setCount。Vue 在脚本里改 ref 的 .value。Angular 调 signal 的 set，模板读 count()。Svelte 5 给 $state 声明的变量赋值。同一个按钮不混四种。',
    keywords:'React useState Vue ref Angular signal Svelte $state',
    diagram:'diagrams/fe-ui-update-model.svg',
    map:[
      {title:'React',body:'setCount(...) 之后才会重画；count = 1 不会'},
      {title:'Vue 3',body:'脚本里 count.value++；模板里的 ref 会自动去掉 .value'},
      {title:'Angular',body:'模板读 count()，再用 count.set 改；v21 起新应用默认不用 zone.js'},
      {title:'Svelte 5',body:'let count = $state(0) 之后才能 count++；$state 不用 import'}
    ],
    points:['React 必须调用 setCount 一类修改函数，直接赋值不会重画','Vue 3 在脚本里改 ref 的 .value；reactive() 返回的是 Proxy','Angular 用 signal.set，模板要读过这个 signal；v21 起新应用默认不用 zone.js','Svelte 5 的 $state 是编译器语法，不用 import，然后直接赋值'],
    deep:[
      {title:'四个名字分别是什么',body:'useState 是 React 的函数，返回「当前值」和「修改函数」。ref 是 Vue 包一层对象，脚本通过 .value 读写。signal 是 Angular 的函数，用 count() 读取、用 set 写入。$state 是 Svelte 5 写在源码里的标记，编译器看见它才把这个变量当成会更新界面的状态。'},
      {title:'zone.js 是什么',body:'旧的 Angular 常用 zone.js 包住浏览器异步，异步结束就扫组件树看要不要重画。Angular 文档写明：v21 起新应用默认不再这样，改由「模板读到的 signal 更新、组件输入、模板事件」等通知来安排检查。这不是「Angular 不用检测变化了」。'},
      {title:'怎样自己验证',body:'在选定的那一种里点按钮，数字加一。把 React 的 setCount 换成 count = count + 1，数字应不变。Vue 若只改了普通 let 变量、没有 ref，模板也不应跟着变。'}
    ],
    refs:[['React：State','https://react.dev/learn/state-a-components-memory'],['Vue：响应式基础','https://vuejs.org/guide/essentials/reactivity-fundamentals.html'],['Angular：Zoneless','https://angular.dev/guide/zoneless'],['Svelte：Runes','https://svelte.dev/docs/svelte/what-are-runes']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-react-framework-first',
    title:'新的 React 应用从文档列出的框架起',
    prompt:'只装了 Vite、react 和 react-dom，开发服务器已经能开。为什么还要再决定路由和取数用谁？',
    promptAnswer:'React 文档把路由、取数和打包放在已经集成好的框架里。只有这两个包时，路由和数据获取还没选定，要自己选定，或改用文档列出的 Next.js、React Router 框架模式。',
    core:'React 文档推荐新项目使用已集成路由、数据获取和打包的框架。页面上列出的是 Next.js 的 App Router，以及可与 Vite 搭配的 React Router 框架模式，创建命令分别是 create-next-app 和 create-react-router。Create React App 已经日落，见 retired-frontend-stack。服务端组件和客户端组件的边界见 react-rsc-vs-client。loader 只在数据模式和框架模式里、于渲染前执行，见 rr-mode-gates-data、react-router-loader。用 Vite 从零组装是允许的，文档同时写明你要自己选定路由和数据获取，那相当于自建框架。原生方向文档把 Expo 和这两个 Web 框架并列，视图模型仍是 React Native，见 rn-view-not-div。',
    why:'把「能打开开发服务器」当成选型结束。下一周补路由、再下一周补服务端数据，仓库里出现第二套路由和手写的请求缓存，文档里的框架本来已经带了路由和数据获取。',
    example:'新的全栈页面用 create-next-app，或用 create-react-router 的框架模式。已有特殊约束、必须自己控制打包时，用 Vite 模板，并在同一天写上唯一的路由库和唯一的数据获取库。不要再执行已经日落的 create-react-app。',
    task:'写出本次的创建命令。若命令是 Vite 模板，在旁边写上路由库和数据获取各一个名字。若命令是文档列出的框架，这两项写「框架自带」。',
    answer:'新项目的创建命令来自 React 文档列出的框架，或明确写成 Vite 自建并补上路由库和数据获取库。Create React App 不再是起点。原生界面另走 Expo 所接的 React Native 视图，不把 Web 框架当成手机运行时。',
    keywords:'Next.js React Router create-react-app Vite Expo',
    points:['新项目用文档列出的 Next.js 或 React Router 框架模式','Vite 从零组装要自己选定路由和数据获取','Create React App 已日落，不再作为创建命令'],
    deep:[
      {title:'框架模式和组件路由',body:'React Router 可以只做声明式组件路由，也可以用带 loader 和 action 的数据模式，或再用 Vite 插件收成框架模式。选型要写明用到哪一档。只装了组件路由，却以为服务端数据、错误边界和打包约定都已经有了，后面会再引进第二个框架。'},
      {title:'怎样自己验证',body:'看 package.json 的创建痕迹和依赖。存在 next 或框架模式的 React Router 插件时，路由算框架自带。只有 react 和 react-dom 时，列出你另外选定的那一个路由库。'}
    ],
    refs:[['React：创建应用','https://react.dev/learn/creating-a-react-app'],['React：从零搭建','https://react.dev/learn/build-a-react-app-from-scratch'],['React：Create React App 日落','https://react.dev/blog/2025/02/14/sunsetting-create-react-app']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-vue-official-slots',
    title:'Vue 新项目：Vite 构建，Vue Router 管地址，Pinia 管跨页状态',
    prompt:'新的 Vue 3 工程里，为什么还能看到 Vue CLI、Vuex，以及自己写的 history？',
    promptAnswer:'官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。Vue CLI、Vuex 和手写 history 是旧仓库留下的，或误加的第二套。',
    core:'构建、路由、跨页状态各留一个库。官方脚手架 **create-vue**（Vue 3）基于 Vite。创建时可选 Vue Router、Pinia、Vitest 和端到端测试。迁移说明里的现行默认是：构建用 Vite，Vue CLI 只维护旧项目；跨页状态用 Pinia，Vuex 只维护已有仓库，见 pinia-not-vuex；编辑器用 Vue 官方扩展。需要文件路由、服务端渲染和把数据放进首屏 HTML 时用 Nuxt，取数走 useFetch 或 useAsyncData，见 nuxt-payload。Nuxt 默认用 Vite，不再附带 Vuex。页面级路由在 SPA 里是 Vue Router，不要再平行装一个 history 库去管同一批 URL。',
    why:'三套构建和两套 store 同时在依赖里，热更新走的是哪一条、退出登录该清哪一份状态，都要对着两份文档。新项目按脚手架的选项各留一个，旧项目才保留 Vuex 或 Vue CLI。',
    example:'管理后台：create-vue，勾上 Vue Router 和 Pinia。文章站要看源码里的正文：Nuxt，数据用 useAsyncData。两份 package.json 都不要新增 vuex，也不要同时用 vue-cli-service 和 vite 作为开发命令。',
    task:'打开创建选项或 package.json，列出构建、路由、跨页状态各一个包名。出现 vuex 或 @vue/cli 时，写明这是旧仓库保留，还是这次误加的第二个库。',
    answer:'新的 Vue 单页应用用 Vite、Vue Router 和 Pinia。要服务端 HTML 时换 Nuxt，仍然用 Pinia，数据进 payload。Vuex 和 Vue CLI 只留在已经使用它们的仓库。同一批 URL 只交给一个路由实现。',
    keywords:'create-vue Vite Vue Router Pinia Nuxt Vuex',
    diagram:'diagrams/fe-ecosystem-slots.svg',
    points:['create-vue 的构建是 Vite，可选 Router 和 Pinia','Nuxt 负责文件路由和首屏数据，状态库仍是 Pinia','Vuex 与 Vue CLI 只维护旧项目'],
    deep:[
      {title:'各留一个库',body:'构建、路由、跨页状态各留一个库。同一职责写了两个包名，就是第二个库。'},
      {title:'和机制课的分工',body:'路由复用、守卫和 Pinia 的 storeToRefs 在 Vue 与 Vue 生态那两章。这里只决定各留哪一个库。选定 Pinia 之后，不要为了「更简单」再导出一份 reactive({}) 当第二份全局会话。'},
      {title:'怎样自己验证',body:'npm run dev 实际执行的应是 Vite 或 Nuxt，而不是同时还有 vue-cli-service。store 目录的定义来自 defineStore。搜索 new Vuex.Store，新代码路径上应当没有。'}
    ],
    refs:[['Vue：快速上手','https://vuejs.org/guide/quick-start'],['Vue 3 迁移：框架级建议','https://v3-migration.vuejs.org/recommendations'],['Nuxt：简介','https://nuxt.com/docs/getting-started/introduction']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-angular-first-party',
    title:'Angular 的路由、HTTP 和表单用自己的包（v21）',
    prompt:'新的 Angular 工程为什么还要再装 React Query、Redux 和 react-router？',
    promptAnswer:'Angular 的路由、HTTP、表单都在 @angular 自己的包里。React 的请求缓存和路由接不上这套变更检测，装上之后会出现两套跳转和两份列表缓存。',
    core:'**Angular v21** 起，新应用默认采用无 Zone 的变更检测（不用 zone.js 扫整棵树，改由信号安排检查），引导配置里不要再用 provideZoneChangeDetection 把它改回去。模板读取的信号更新、markForCheck、组件输入和模板事件会安排检查。信号用 signal、computed 和 effect 描述状态和派生。HttpClient 从 v21 起默认可注入；更早的工程用 provideHttpClient，而不是再引入已不推荐的 HttpClientModule 当现行写法。路由用 provideRouter 和 RouterOutlet。表单是应用主体时用响应式表单，模型放在组件类里。这些包都在 @angular 下。输入钩子何时触发见 angular-ngonchanges-primitives。已有工程可以仍带着 zone.js，那是迁移状态，不是新项目的默认。',
    why:'把 React 生态的请求缓存和路由再装一份之后，同一次跳转既走 Angular Router 又走另一个 history，列表既在 HttpClient 的流里又在第二份缓存里。取消订阅和刷新列表会对不上。',
    example:'订单请求和地址都来自 @angular，不另装 React 的包：\n\n```ts\n// 路由\nprovideRouter(routes)\n\n// 列表：订阅才发请求\nthis.http.get<Order[]>(\'/api/orders\')\n\n// 模板\n<a routerLink="/orders">订单</a>\n```\n\n不要添加 @tanstack/react-query 或 react-router-dom。',
    task:'在新工程的依赖里确认路由、HTTP、表单都来自 @angular。若 zone.js 还在，写明这是 v21 之前的工程还是有意覆盖了默认。',
    answer:'新应用保持无 Zone 默认，状态用信号，请求用 HttpClient，地址用 provideRouter，复杂表单用响应式表单。不要把 React 的路由和请求库当成 Angular 的对应生态。旧工程里的 Zone 是待迁移项。',
    keywords:'Angular zoneless HttpClient provideRouter 响应式表单 信号',
    points:['Angular v21 新应用默认无 Zone，状态用信号','HttpClient 与 provideRouter 是请求和路由的官方入口','响应式表单表达表单模型，不另装 React 的数据栈'],
    deep:[
      {title:'无 Zone 指什么',body:'旧默认靠 zone.js 包住异步，再扫整棵树做变更检测。v21 新应用默认不装这条路径，模板读到的信号变化、输入和事件会安排检查。'},
      {title:'Observable 要有订阅者',body:'HttpClient 的方法返回冷 Observable，订阅才发出请求，同一 Observable 订阅两次会请求两次。选 Angular 的 HttpClient，就要按这个时机处理取消和重复，而不是再包一层只认 hook 的缓存库。'},
      {title:'怎样自己验证',body:'新建工程看 polyfills 或依赖里没有 zone.js，引导处没有 provideZoneChangeDetection。发一次 GET 只出现在 HttpClient 的服务里。路由表是 provideRouter 的那一份。'}
    ],
    refs:[['Angular：Zoneless','https://angular.dev/guide/zoneless'],['Angular：HttpClient','https://angular.dev/guide/http/setup'],['Angular：Router','https://angular.dev/guide/routing/router-reference']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-sveltekit-runes',
    title:'Svelte 应用用 SvelteKit，状态用 runes（Svelte 5）',
    prompt:'选了 Svelte，为什么又装上 Vue Router，编译却仍然不管那些路由组件？',
    promptAnswer:'Svelte 页面要先由 Svelte 编译。Vue Router 出口里的 .svelte 没有走这条编译链。新应用用官方的 SvelteKit 管路由和取数；状态用 runes（如 $state）在编译期标出依赖。',
    core:'Svelte 把组件编译成直接更新 DOM 的代码，运行时没有一份虚拟 DOM 库负责 diff。**Svelte 5** 用 runes 告诉编译器哪些值要追踪：$state 声明状态，$derived 声明派生，$effect 声明副作用。它们是编译期语法，不是可以 import 的函数，也能用在 .svelte.js 和 .svelte.ts 里共享状态。官方应用框架是 SvelteKit，负责文件路由、加载数据和适配部署，开发服务器基于 Vite。新项目用 sv create。只做组件库时可以用 vite-plugin-svelte，路由和加载数据就不再由 SvelteKit 提供，要另选并写明。',
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
    title:'React 里路由、接口列表、登录态各只留一个库',
    prompt:'新仓库里为什么会同时出现 Redux、Zustand、React Query，以及两套路由？',
    promptAnswer:'每个职责只留一个库。路由一格、服务端列表缓存一格、客户端会话一格。热门库都装上时，同一份订单会有两套失效写法。',
    core:'应用框架占用「路由 + 打包 + 数据入口」时，不要再装第二个路由。自建时文档建议的路由是 React Router 或 TanStack Router，二选一，加载器见 react-router-loader。服务端列表的缓存用 TanStack Query：它保存的是请求结果，组件里调用的仍然是你的请求函数，见 query-cache-not-http-client、query-fn-calls-the-client。多个页面共享、而且只存在于客户端的会话，才考虑 Redux Toolkit，见 redux-rtk-today。同一份订单列表不要既进 Query 又进 slice。主题、弹层、列表、购物车各住哪里，见 state-kind-picks-home。样式同样只留一条进入组件的路径。测试断言用 Testing Library 的角色查询，见 react-enzyme-not-default。',
    why:'每个热门库都装上之后，失效订单列表要记两个 API，路由参数有两套钩子。新人无法从目录判断该改哪一个文件。',
    example:'Next 应用：路由和服务器数据入口用框架的。浏览器里复用的 GET 用 Query，queryKey 包含筛选条件。登录态若必须全局可读，用一份 Toolkit store，里面不复制订单数组。包管理文件里不应同时有 react-router 和 @tanstack/react-router，除非写明一个只用于遗留页面并有删除日期。',
    task:'画五格：应用框架、路由、服务端缓存、客户端全局状态、样式。每格一个名字或「不需要」。两格写了同一个职责时删到一格。',
    answer:'框架自带的路由不要再配第二个路由库。服务端列表留在 Query 或路由加载器。Redux Toolkit 只放客户端共享状态。样式和测试各一条路径。同一份服务器数据只放在一个地方，见 fe-server-state-one-owner。',
    keywords:'TanStack Query Redux Toolkit React Router',
    points:['路由只留框架自带或单独一个路由库','服务端缓存用 Query 或加载器，不再复制进 store','客户端全局状态和样式各自一条路径'],
    deep:[
      {title:'RTK Query 也是服务端缓存',body:'Toolkit 可以带 RTK Query。它和 TanStack Query 都是服务端缓存。选定一个来放列表。两个都装上时，失效和重试策略会各写一遍。'},
      {title:'怎样自己验证',body:'搜索 Routes 与 createBrowserRouter 与 createRouter。新功能路径上只应命中一种。再搜索订单类型：缓存更新函数只应来自 useQuery 或加载器，slice 里没有同一数组。'}
    ],
    refs:[['TanStack Query：概述','https://tanstack.com/query/latest/docs/framework/react/overview'],['Redux：为何今天用 Toolkit','https://redux.js.org/introduction/why-rtk-is-redux-today'],['React：从零搭建','https://react.dev/learn/build-a-react-app-from-scratch']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-server-state-one-owner',
    title:'同一份订单列表只放在一个地方',
    prompt:'接口已经返回新订单，为什么页面仍显示改之前的列表？',
    promptAnswer:'同一份列表被放进了两个地方。网络里新响应已经回来，模板绑的是没有跟着失效的那一份旧缓存。',
    core:'GET 回来的列表是服务端状态。它只放在一个地方：Query 的 queryKey、路由加载器、Nuxt 的 useAsyncData、Angular 服务里的那一次流，或仅属于当前页的组件状态。Pinia 和 Redux 放的是客户端还要继续改、并且多个页面一起读的数据，见 pinia-not-vuex。把同一列表再提交进 store，失效时只清了请求库，store 里仍是旧数组，界面继续读旧的那份。这一处负责键：筛选条件变了，键要变，否则会把上一页的结果留在下一页。',
    why:'为了「保险」写两份缓存。刷新按钮清掉其中一份，绑定在模板上的是另一份。用户看到的仍是旧订单，网络面板里新响应已经回来了。',
    example:'订单页的列表只放在 useQuery({ queryKey: ["orders", status] })。状态筛选变了，键跟着变。不要在 onSuccess 里再 dispatch(setOrders)。Vue 页同理：要么页面内的请求，要么 Pinia 里一份，不要两份一起绑定到表格。',
    task:'找到表格的数据表达式，向上追到唯一的赋值点。若还有第二处把同一响应写进全局 store，删掉第二处，再改筛选条件确认不会留下上一份列表。',
    answer:'表格只读一个缓存。键包含会改变结果的参数。全局 store 不复制这份服务端列表。刷新和失效只调用这一处的那一个 API。',
    keywords:'服务端状态 queryKey Pinia 失效',
    points:['服务端列表只放在一个缓存里','缓存键要包含会改变结果的参数','全局 store 不保存同一份请求结果'],
    deep:[
      {title:'页面里的状态也算这一处',body:'只用一次、离开就丢的列表可以留在组件里，不必先升级成 Query 或 Pinia。它一旦被复制到全局，就变成两处。升级时是搬走，不是再抄一份。'},
      {title:'怎样自己验证',body:'改筛选后看网络请求的查询参数，以及表格第一行。第一行必须属于新参数。若第一行仍是旧数据，说明绑定读的是没有跟着键失效的那一份。'}
    ],
    refs:[['TanStack Query：查询键','https://tanstack.com/query/latest/docs/framework/react/guides/query-keys'],['Pinia：介绍','https://pinia.vuejs.org/introduction.html'],['Nuxt：数据获取','https://nuxt.com/docs/getting-started/data-fetching']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-cross-end-one-runtime',
    title:'跨端先选定一个运行时',
    prompt:'同一份 React 组件打进了网页。为什么还期望小程序和手机 App 都不用改？',
    promptAnswer:'网页画到 DOM，小程序和 App 是另外的运行时。同一份带 document 或 div 的组件不能同时当这三端的唯一实现。每一端只留一个运行时。',
    core:'运行时决定组件最后画到什么上。浏览器应用画到 DOM，用前面选定的 Web 框架。小程序要在逻辑层和视图层之间交数据：uni-app 改的是 Vue 数据，Taro 把模拟树 setData 到模板，两边的页面清单和钩子不能互换，见 taro-and-uniapp-layers。**小程序栈取舍**：团队已会 Vue 时偏 uni-app；已会 React 时偏 Taro；只留其中一个，不要两个脚手架并行。要编成 Android 原生语言的新工程是 uni-app x，页面是 uvue，不能把旧的 .vue 直接混进去，见 uniapp-x-uts-not-vue-page。没有 DOM 时再分宿主：像素自己画、用 Dart 和 Widget，选 Flutter（适合强一致自绘 UI，代价是要学 Dart/Widget，路由见 flutter-gorouter-not-named）；要系统控件与 React 技能复用，选 React Native 的 View、Text 和 Pressable（适合贴系统观感，代价是两端仍有平台差），见 rn-view-not-div、rn-pressable-not-click。React 文档把 Expo 列为原生应用的推荐框架，它接的仍是 React Native 的视图。四套各自的宿主见 cross-four-where-it-fits。一个产品面只留一个运行时。营销页和小程序可以是两个仓库。',
    why:'用条件编译把三套运行时缝进一个组件。网页上的 div、小程序的 view 和原生 View 在同一个文件里各写一支，布局和事件只要改一处就会漏端。',
    example:'活动 H5 用 Vite 的 Web 应用。微信里的同一活动若必须是小程序，另开 uni-app 或 Taro，只保留一个。两端外观要由引擎画成一样：Flutter。已上架 App 要系统控件：Expo 所接的 React Native 组件。这些工程不要共用一个写着 document 的入口。',
    task:'列出这次要上的端。每个端写下运行时和页面登记文件，并写一句适合/代价。超过一个运行时时，拆成多个工程，或写明只有一个编译目标、其余端本次不做。',
    answer:'浏览器、小程序、自绘 App、系统视图各用自己的运行时。小程序只留 uni-app 或 Taro 其中一个。自绘留 Flutter，系统控件留 React Native。uni-app x 是另一套工程。不要把 DOM 组件编译进后面三种。',
    keywords:'运行时 uni-app Taro React Native Expo 跨端',
    diagram:'diagrams/fe-cross-end-runtime.svg',
    map:[
      {title:'Web SPA / 元框架',body:'画到 DOM；首屏正文见元框架对照课'},
      {title:'uni-app',body:'适合 Vue 栈多小程序；不是 RN 原生视图'},
      {title:'Taro',body:'适合 React 栈多小程序；与 uni-app 二选一'},
      {title:'Flutter',body:'自绘一致 UI；要学 Dart，不是 HTML'},
      {title:'React Native / Expo',body:'系统控件 + React 技能；两端仍有平台差'}
    ],
    points:['浏览器、小程序、自绘和系统视图是不同运行时','小程序工程只留 uni-app 或 Taro，并写清适合团队的哪一栈','Flutter 自己画像素，React Native 使用平台视图'],
    deep:[
      {title:'一套源码的真实含义',body:'uni-app 或 Taro 能把同一套页面编译到多个小程序端和 H5，条件编译在出包前裁剪。这仍然是一个运行时家族。它不自动获得 React Native 的原生视图，也不把浏览器的 document 带进小程序。'},
      {title:'和决策顺序',body:'跨端是目标端里的手机/小程序格，仍要先写「本次做不做」，再选运行时，见 `fe-pick-decision-order`。'},
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
