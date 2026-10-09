/* Frontend 25: ecosystem slots that follow the UI model chosen in 技术选型. */
const COVERAGE_FRONTEND_25 = [
  {
    track:'frontend', group:'技术选型', id:'fe-ecosystem-follows-model',
    title:'选定更新模型之后，生态跟着这一套走',
    prompt:'为什么已经选定 Vue，仓库里还会同时出现 React Router、Pinia 和 HttpClient？',
    core:'更新模型决定后面四个槽位跟谁：应用框架、路由、只存在于客户端的共享状态、服务端列表的缓存。React 新项目是 Next.js 或 React Router 框架模式，路由不要再配第二个；客户端会话才考虑 Redux Toolkit，列表缓存用 Query 或框架加载器，见 fe-react-one-slot。Vue 新项目是 Vite、Vue Router、Pinia，要首屏 HTML 时换 Nuxt，见 fe-vue-official-slots。Angular 的路由、HTTP、表单都在 @angular 下，见 fe-angular-first-party。Svelte 应用是 SvelteKit，状态用 runes，见 fe-sveltekit-runes。四个模型可以各做一张订单表，但同一张表不要从四套文档里各抄一个库。跨端运行时另算一笔，见 fe-cross-end-one-runtime。',
    why:'按热度把各生态的明星库装齐。同一次跳转既改 history 又走 Vue Router，列表既在 Pinia 又在 Query 里。线上少画一次时，没有一份文档能同时解释这两套通知。',
    example:'后台表格选定 Vue：create-vue 勾上 Vue Router 和 Pinia。不要再添加 react-router-dom、@angular/router 或 SvelteKit。文章站要源码里有正文：同一模型下换 Nuxt，仍然用 Pinia，不要为了「更像 React」再装一套 Next。',
    task:'写出这次留下的更新模型，再填四格：应用框架、路由、客户端共享状态、服务端列表。每格一个名字。出现另一模型的包名时划掉。',
    answer:'这次留下 Vue。四格：应用框架 Vite（要首屏 HTML 时换 Nuxt）；路由 Vue Router；客户端共享状态 Pinia；服务端列表用该模型的加载器或查询库。出现 React Router、Redux、@tanstack/react-query、@angular/router 时划掉。',
    keywords:'技术选型 生态槽位 React Vue Angular Svelte',
    diagram:'diagrams/fe-ecosystem-map.svg',
    points:['路由、客户端状态和服务端缓存跟着选定的更新模型','四个模型不要在同一张表上各装一套库','跨端运行时是另一笔，不跟 Web 框架混进一个组件'],
    deep:[
      {title:'官方入口不是热度榜',body:'Vue 的跨页状态官方入口是 Pinia，不是仓库里 star 更多的那一个 React 状态库。Angular 的请求入口是 HttpClient，不是把 React Query 的钩子抄进独立组件。SvelteKit 的页面数据入口是 load，不是再引入一个只会在 React 树里工作的缓存。'},
      {title:'怎样自己验证',body:'在 package.json 里搜索另一模型的路由包和请求缓存包。新功能路径上只应命中选定模型的那一套。再打开一张订单页，表格的数据表达式只能追到一个赋值点，见 fe-server-state-one-owner。'}
    ],
    refs:[['React：创建应用','https://react.dev/learn/creating-a-react-app'],['Vue 3 迁移：框架级建议','https://v3-migration.vuejs.org/recommendations'],['SvelteKit：简介','https://svelte.dev/docs/kit/introduction']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-vue-data-one-slot',
    title:'Vue 的服务端列表不要再抄进 Pinia',
    prompt:'为什么 Nuxt 页已经用了 useAsyncData，表格却仍显示 Pinia 里那份旧订单？',
    core:'Vue 单页应用里，只用一次、离开就丢的列表可以放在页面里请求。需要文件路由和首屏 HTML 时，Nuxt 用 useAsyncData 或 useFetch 把结果放进 payload，水合时不再打同一枪，见 nuxt-payload。Pinia 是客户端还要继续改、并且多个页面一起读的状态，官方推荐取代 Vuex，见 pinia-not-vuex、fe-vue-official-slots。同一份 GET 列表不要在 onSuccess 里再写入 store。TanStack Vue Query 也可以做服务端缓存，它和 useAsyncData 不要同时当表格的主人。筛选条件变了，键或 watch 的来源要变。',
    why:'为了「全局都能读」把 payload 再抄进 Pinia。刷新只清了 useAsyncData，模板绑的是 store 里的数组。网络面板里新响应已经回来，格子上仍是上一份。',
    example:'订单页：const { data } = await useAsyncData("orders-"+status, () => $fetch("/api/orders", { query: { status } }))。表格只读 data。登录态、主题这种客户端共享值才进 defineStore。不要在请求成功后再 store.orders = data。',
    task:'找到表格绑定。若同时出现 useAsyncData 或 useFetch，以及 Pinia 里的同一数组，删掉 store 那一份，改筛选后确认第一行属于新参数。',
    answer:'Nuxt 页的列表主人是 useAsyncData 或 useFetch。Pinia 不保存同一份 GET 结果。单页应用同样只留一个请求缓存。Vue Query 和 useAsyncData 只选一个当主人。',
    keywords:'Nuxt useAsyncData Pinia Vue Query payload',
    points:['Nuxt 的列表走 useAsyncData 或 useFetch，结果进 payload','Pinia 放客户端共享状态，不复制同一份 GET 列表','Vue Query 与 useAsyncData 不要同时当表格主人'],
    deep:[
      {title:'键和筛选在一起',body:'useAsyncData 的第一个参数是去重键。筛选变了，键要跟着变，或者把筛选放进 watch。键不变时，换了查询参数仍可能拿到上一份 payload。'},
      {title:'怎样自己验证',body:'改状态筛选后看网络请求的查询参数和表格第一行。第一行必须属于新参数。若第一行仍是旧数据，说明绑定读的是没有跟着键失效的那一份 store。'}
    ],
    refs:[['Nuxt：数据获取','https://nuxt.com/docs/getting-started/data-fetching'],['Nuxt：useAsyncData','https://nuxt.com/docs/3.x/api/composables/use-async-data'],['Pinia：介绍','https://pinia.vuejs.org/introduction.html']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-angular-resource-not-ngrx',
    title:'Angular 的 GET 用 HttpClient 这一路，不必先装 NgRx',
    prompt:'为什么新的无 Zone 应用还没写出第一张订单表，就已经加了 Store、Effects 和 React Query？',
    core:'Angular v21 新应用默认无 Zone，状态用信号，路由用 provideRouter，见 fe-angular-first-party。读列表时走 HttpClient 这一路：订阅返回的 Observable，或用文档里已标成开发者稳定的 httpResource，把请求结果暴露成信号。httpResource 会在依赖的信号变化时发新请求，未完成的旧请求会被取消；它会立刻发出请求，和「订阅才发出」的 HttpClient 方法不同。改服务端数据的 POST、PUT 仍用 HttpClient，文档写明不要用 httpResource 做变更。NgRx 是独立的状态库，不是 @angular 下的默认槽位。多处都要改、规则已经复杂的客户端状态，才考虑另选一个状态库。不要把 @tanstack/react-query 装进这个工程。',
    why:'把 React 生态的缓存和 NgRx 一起当作 Angular 的标配。同一份订单既在 Store 里，又在 httpResource 的 value 里。失效只打了其中一个 API，表格读的是另一个。',
    example:'订单编号来自信号 id。const orders = httpResource(() => `/api/orders/${id()}`)。模板读 orders.value()。提交备注用 HttpClient.post。依赖里不要出现 ngrx/store，除非写明这是已有大应用的客户端规则，并且表格不从 Store 再读同一数组。',
    task:'新建订单页：GET 只走 HttpClient 或 httpResource。确认没有为这一页添加 Store。提交用 HttpClient。再搜索 react-query，新路径上应当没有。',
    answer:'新应用的列表走 HttpClient 或 httpResource。变更用 HttpClient。NgRx 不是新项目默认。不要混入 React 的请求钩子。复杂的客户端共享状态才另开一个库，并且不复制这份列表。',
    keywords:'Angular httpResource HttpClient NgRx 信号',
    diagram:'diagrams/fe-angular-http-slot.svg',
    points:['GET 走 HttpClient 或 httpResource，结果用信号读','httpResource 不做 POST、PUT，变更仍用 HttpClient','NgRx 不是新应用的默认数据槽位'],
    deep:[
      {title:'两种发出时机',body:'HttpClient 的方法返回冷 Observable，订阅才请求，同一对象订阅两次会请求两次。httpResource 会主动发出，依赖变了会取消未完成的那一次。选型要写明用哪一种时机，不要两种同时绑到同一张表。'},
      {title:'怎样自己验证',body:'改 id 信号，应只看到新编号的请求，表格第一行属于新编号。Store 里不应再有同一数组。提交备注的网络记录应来自 HttpClient，而不是另一次 httpResource。'}
    ],
    refs:[['Angular：httpResource','https://angular.dev/guide/http/http-resource'],['Angular：HttpClient','https://angular.dev/guide/http/setup'],['Angular：Zoneless','https://angular.dev/guide/zoneless']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-svelte-load-not-store',
    title:'SvelteKit 的页面数据从 load 返回，不要在 load 里写全局状态（SvelteKit）',
    prompt:'为什么 load 里已经取到订单，组件里的全局 store 在服务端却串到别人的请求？',
    core:'**SvelteKit** 在渲染 +page.svelte 之前运行 `load`。和页面同目录的 +page.js 在服务端和浏览器都会跑；必须碰数据库或私密环境变量时用 +page.server.js，只在服务端跑。返回值作为 data 传给页面。文档要求 load 保持纯粹：不要在里面给全局 store 赋值。需要在树里别处读取时，用 data 往下传，或读 $app/state 里只读的 page.data。现行文档不再把页面数据写成要订阅的 $page store。筛选这类应出现在地址上的值，放进查询参数，load 从 url 读取。客户端还要继续改的共享状态，才用 runes 写在 .svelte.js 里，并且不要去保存同一份 GET 列表。',
    why:'在 load 里写入模块级 store，服务端的那一次赋值会留到下一次请求。A 用户的订单出现在 B 的 HTML 里。开发者会去查接口，其实是把请求作用域的数据放进了进程里的全局变量。',
    example:'src/routes/orders/+page.server.js 导出 load，用 url.searchParams 读 status，返回 { orders }。+page.svelte 里 let { data } = $props()，表格读 data.orders。不要在 load 里调用 orders.set(list)。登录后仍要在多页显示的用户名，才放到用 runes 声明的共享模块，里面没有这份订单数组。',
    task:'把订单列表的赋值从 load 里的 store 改成 return。页面只读 data。用两个状态筛选打开页面，确认 HTML 里的第一行属于该次查询参数。',
    answer:'列表由 load 返回，页面读 data 或 page.data。load 不写全局状态。查询参数才是筛选的来源。runes 模块不保存同一份 GET 结果。',
    keywords:'SvelteKit load page.data $app/state 查询参数',
    diagram:'diagrams/fe-svelte-load.svg',
    points:['load 的返回值通过 data 进页面，渲染前已经有','不要在 load 里写入全局 store','筛选放进 URL，从 load 的 url 读取'],
    deep:[
      {title:'通用 load 和仅服务端 load',body:'+page.js 的 load 在客户端导航时也会跑。只能在服务端做的事放进 +page.server.js。两边都写时，服务端的返回值会成为通用 load 参数里的 data。选型要写明数据从哪一层来，不要再在组件 onMount 里打同一枪。'},
      {title:'怎样自己验证',body:'在 load 开头打印查询参数。改筛选后应看到新参数，表格第一行跟着变。把赋值改回全局 store 再开两个会话，应能复现串数据；改回 return 之后不应再串。'}
    ],
    refs:[['SvelteKit：加载数据','https://svelte.dev/docs/kit/load'],['SvelteKit：状态','https://svelte.dev/docs/kit/state-management'],['SvelteKit：$app/state','https://svelte.dev/docs/kit/$app-state']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-expo-router-one-nav',
    title:'新的 Expo 应用路由槽位是 Expo Router',
    prompt:'为什么 create-expo-app 之后又装了一套 React Navigation，两个地方都在改同一条地址？',
    core:'React Native 核心包不带导航。React 文档把 Expo 列为原生应用的推荐框架，视图仍是 View 和 Text，见 rn-view-not-div。Expo 文档写明：新项目在 Expo 里一般在 React Navigation 和 Expo Router 里选一个。create-expo-app 的现行模板默认带上 Expo Router，按 app 目录生成路由，并接好深链和打包。Expo Router 建立在 React Navigation 之上，但应用代码里只应有一个地址主人。不用 Expo 的仓库，才直接用 React Navigation；react-native 文档也把 React Navigation 当作入门导航。navigate 已经停在该屏时不会再压栈，见 rn-navigate-not-push。不要把 Next.js 或 Vue Router 当成原生路由。',
    why:'模板已经用文件生成路由，又在根组件里再挂一个 NavigationContainer。一次点击走了两套栈，返回键回到的不是用户以为的上一屏。',
    example:'npx create-expo-app 之后，订单页是 app/orders/[id].tsx。跳转用 Expo Router 的路由 API。不要再包一层独立的 NavigationContainer 去登记同一批屏幕。已有只用 React Navigation 的仓库，保持那一套，直到明确迁到 Expo Router。',
    task:'看入口是 Expo Router 的 app 目录，还是自己写的导航容器。两套都在改 URL 时删掉后加的那一套。确认从列表进详情再返回，停在原来的列表位置。',
    answer:'新的 Expo 应用把路由留给 Expo Router。不用 Expo 时才直接用 React Navigation。同一产品不要两个导航容器。Web 框架的路由不是原生槽位。',
    keywords:'Expo Router React Navigation create-expo-app 深链',
    diagram:'diagrams/fe-expo-nav.svg',
    points:['React Native 核心包不带导航，要另选一个库','Expo 新项目默认用 Expo Router 做文件路由','不要同时再挂一套独立的 React Navigation 当地址主人'],
    deep:[
      {title:'两个库不是互斥的内核',body:'Expo Router 用 React Navigation 实现栈和标签。选型写的是应用层只认哪一个入口。新 Expo 应用认文件路由；已有代码配置的导航可以继续用 React Navigation，直到迁移完成。'},
      {title:'怎样自己验证',body:'搜索 NavigationContainer 和 app 目录里的 _layout。新功能路径上只应命中一种。从详情返回时，列表滚动位置应还在。出现 Next.js 的 App Router 文件时，那是 Web 工程，不是这个原生槽位。'}
    ],
    refs:[['Expo：应用导航','https://docs.expo.dev/develop/app-navigation/'],['Expo Router：简介','https://docs.expo.dev/router/introduction/'],['React Native：导航','https://reactnative.dev/docs/navigation']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-flutter-state-one-approach',
    title:'Flutter 深链用 go_router，共享状态只留一种做法',
    prompt:'为什么同一份订单既进了 Provider，又进了 Riverpod，深链打开却再叠一层页面？',
    core:'像素由引擎自己画，见 flutter-widget-not-html。只属于当前 Widget 的瞬时值，用 setState，见 flutter-setstate-rebuilds。需要深链、多个 Navigator 或 Web 上直接打开路径时，用 go_router：context.go 按路径声明配栈，不要只靠命名路由再 push，见 flutter-gorouter-not-named。跨多个路由仍要读的值，从文档列出的做法里留一种：InheritedWidget、provider、Riverpod、BLoC 等。官方把状态管理写成有多条路，没有指定唯一赢家。同一份订单数组不要进两个包。go_router 不是网页的 React Router，也不是小程序的 pages.json。',
    why:'每个热门状态包都加依赖，失效订单要记两套 API。深链仍走命名路由，每次分享都在栈上再压一层。',
    example:'MaterialApp.router 接 GoRouter。订单路径是 /order/:id，打开用 context.go。列表页的展开开关留在该页 setState。购物车这种多页都要改的客户端值，只放进选定的那一个方案里。pubspec 不要同时出现 provider 和 flutter_riverpod，除非写明一个只用于遗留页并有删除日期。',
    task:'写出路由包名和共享状态方案各一个。瞬时开关确认在 setState。用同一深链打开两次，确认栈没有叠两层订单。',
    answer:'深链和 Web 路径用 go_router 的 context.go。瞬时值用 setState。跨页状态只留文档里的一种做法。同一列表不要进两个状态包。',
    keywords:'Flutter go_router setState Provider Riverpod',
    diagram:'diagrams/fe-flutter-slots.svg',
    points:['深链用 go_router 的 context.go，不要只靠命名路由再压栈','当前页的瞬时值用 setState','跨页状态从文档列出的做法里只留一种'],
    deep:[
      {title:'先分短暂和共享',body:'文档把 setState 标成组件自己的短暂状态。主题、当前购物车这种被很多路由读取的值，才进入共享方案。把展开开关也放进全局，切换路由回来会和用户刚才的手势对不上。'},
      {title:'怎样自己验证',body:'命名路由打开同一深链两次，栈应多两层。换成 context.go 后应仍是声明的那一组。再搜索订单类型：更新函数只应来自选定的那一个状态方案，第二个包的文件里没有同一数组。'}
    ],
    refs:[['Flutter：导航与路由','https://docs.flutter.dev/ui/navigation'],['Flutter：状态管理做法','https://docs.flutter.dev/data-and-backend/state-mgmt/options'],['Flutter：setState','https://api.flutter.dev/flutter/widgets/State/setState.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_25) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
