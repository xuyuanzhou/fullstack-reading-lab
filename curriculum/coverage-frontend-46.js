/* Frontend 46: 技术选型对照。只写官方文档能对上的能力，并给出最小代码。 */
const COVERAGE_FRONTEND_46 = [
  {
    track:'frontend', group:'技术选型', id:'fe-framework-tradeoffs',
    title:'四种界面库：官方自带什么，你还要自己装什么',
    prompt:'界面库已经选定。为什么还要打开官方文档，看路由和请求是自带的，还是要再装？',
    promptAnswer:'选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。Vue 新项目用 Vite、Vue Router、Pinia。Angular 的路由、HTTP、表单都在 @angular 里。Svelte 的应用框架是 SvelteKit。这些句子不能反过来当成「谁的包更全就选谁」。',
    core:'选界面库看仓库和团队，见 `fe-pick-decision-order`。这一课只写选定之后，官方应用里已经带了什么。改数字的那一行见 `fe-ui-update-model`，那也不是打分项。\n\nReact：库本身是组件和状态。创建应用的文档推荐新项目使用已经带上路由、数据获取和打包的框架，列出的是 Next.js，以及可搭配 Vite 的 React Router 框架模式。只用 react 和 react-dom 时，路由和取数要自己选定。\n\nVue 3：create-vue 基于 Vite，创建时可选 Vue Router 和 Pinia。Vue CLI、Vuex 只维护已经在用的旧仓库。要在服务端输出 HTML 时用 Nuxt。文档站可以用 VitePress。\n\nAngular：路由、HTTP、表单都在 @angular 包里。新应用默认在浏览器里渲染；正文要进 HTML 时用 @angular/ssr，不是改去 Next。v21 起新应用默认不用 zone.js。不要把只认 React 组件的 react-router 或 React Query 装进这个工程。\n\nSvelte 5：$state 只在 Svelte 编译的文件里有效。新应用用 SvelteKit 管文件路由和 load。把 .svelte 页面塞进 Vue Router，编译器不会处理那些页面。',
    why:'按流行程度把四套路由都装上之后，地址既走 Vue Router 又走 react-router。官方包是选定之后的安装清单，不是四个库的得分。',
    example:'官方起点各留一行，不要四个一起装进同一个 package.json：\n\n```bash\n# React：文档列出的框架（路由和取数在框架里）\nnpx create-next-app@latest\n\n# Vue 3 后台：Vite，勾上 Vue Router 和 Pinia\nnpm create vue@latest\n\n# 文章要在源代码里看到正文，且界面是 Vue\nnpx nuxi@latest init\n\n# Svelte 应用\nnpx sv create\n```\n\n```ts\n// Angular：路由和请求来自 @angular，不另装 react-router\nprovideRouter(routes)\nhttp.get<Order[]>(\'/api/orders\')\n```',
    task:'画四行：React、Vue、Angular、Svelte。每行写官方创建方式，以及路由是框架自带还是要自己选一个库。不要写星数或招聘。',
    answer:'React 用 Next.js 或 React Router 框架模式，否则路由和取数自己选。Vue 新项目用 Vite、Vue Router、Pinia；要服务端 HTML 时用 Nuxt。Angular 用 provideRouter 和 HttpClient。Svelte 用 SvelteKit 和 $state。一个产品只留一行。',
    keywords:'React Vue Angular Svelte 官方脚手架 路由',
    diagram:'diagrams/fe-framework-tradeoffs.svg',
    map:[
      {title:'React',body:'本身不带路由；新项目用 Next 或 React Router 框架模式'},
      {title:'Vue 3',body:'create-vue：Vite + Router + Pinia；正文进 HTML 用 Nuxt'},
      {title:'Angular',body:'路由、HTTP、表单都在 @angular；v21 起默认不用 zone.js'},
      {title:'Svelte 5',body:'应用用 SvelteKit；$state 只在 Svelte 编译的文件里'}
    ],
    points:['React 库本身不带路由和取数，文档让新项目用列出的框架','Vue 新项目是 Vite、Vue Router、Pinia；Angular 的路由和 HTTP 在 @angular','Svelte 应用用 SvelteKit，$state 不能交给 Vue Router 去编译'],
    deep:[
      {title:'这一课不打分',body:'包更全不是选型分数。仓库和招人见 `fe-pick-decision-order`。正文要不要出现在源代码里，见 `fe-meta-framework-tradeoffs`。'},
      {title:'怎样自己验证',body:'打开选定框架的「创建应用」文档，对照 package.json 里的路由包是不是文档写的那一个。出现第二种界面库的路由包，就多装了。'}
    ],
    refs:[['React：创建应用','https://react.dev/learn/creating-a-react-app'],['Vue：快速上手','https://vuejs.org/guide/quick-start'],['Vue 3 迁移：框架级建议','https://v3-migration.vuejs.org/recommendations'],['Angular：Zoneless','https://angular.dev/guide/zoneless'],['SvelteKit：简介','https://svelte.dev/docs/kit/introduction']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-meta-framework-tradeoffs',
    title:'查看网页源代码时，正文在不在 HTML 里',
    prompt:'都说要服务端渲染。为什么有的页面用 Next，有的用 Astro，登录后的表格用 Vite 就够？',
    promptAnswer:'先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。文章标题必须已经写在这份 HTML 里时，用这个库自己的服务端方案。不要因为「要服务端渲染」这五个字，同时建出 Next、Nuxt 和 Astro。',
    core:'「查看网页源代码」是浏览器菜单里的那份文字，脚本还没跑。它用来核对需求，不能单独算出脚手架的名字。\n\nVite 加上只在浏览器里渲染的 React 或 Vue：HTML 里通常只有一个空的 div，id 是 root 或 app。标题是脚本请求数据之后才画出来的。登录后的后台可以接受这样。Angular 新应用默认也是在浏览器里渲染。\n\n已经是 React，标题要在 HTML 里：用 Next.js，或 React Router 的框架模式。服务端组件和客户端组件的边界见 `react-rsc-vs-client`。\n\n已经是 Vue：应用页用 Nuxt，useAsyncData 或 useFetch 的结果会放进随 HTML 交给浏览器的那份数据，见 `fe-vue-data-one-slot`。文档站可以用 VitePress。\n\n已经是 Svelte：用 SvelteKit。数据从 load 返回，页面读 data，见 `fe-svelte-load-not-store`。\n\n已经是 Angular：执行 ng add @angular/ssr。一条路由可以是 RenderMode.Prerender（构建时生成 HTML）或 RenderMode.Server（请求进来时生成）。不要为此新建 Next。\n\n交互很少的文章站：Astro 文档把自己定位成内容站。整页先是 HTML，只有写了 client:load 的组件才把脚本送到浏览器。岛上的组件留仓库已经在用的那一种。见 `fe-pick-by-surface`。\n\n已经选定 Vue，就不要再初始化一个 Next 工程。',
    why:'口头要服务端渲染，仓库却是只有空 div 的 Vite 应用，源代码里没有文章标题。或者 Next、Nuxt、Astro 三个都建了，同一篇文章有三套路由。',
    example:'两种源代码，对的是需求。脚手架跟已经选定的界面库，不是三个都建：\n\n```html\n<!-- 登录后的表格：浏览器里渲染，源代码里可以没有业务标题 -->\n<div id="app"></div>\n\n<!-- 帮助文章：源代码里已经有标题 -->\n<h1>如何退款</h1>\n```\n\n```ts\n// 已经是 Angular，标题要进 HTML。不要为此新建 Next\n// ng add @angular/ssr\n{ path: "help", renderMode: RenderMode.Prerender }\n```\n\n```astro\n---\nconst title = "如何退款"\n---\n<h1>{title}</h1>\n<Search client:load />\n```',
    task:'打开目标页的「查看网页源代码」，写下标题在不在。再写仓库里已有的界面库，以及这个库自己的服务端方案。登录后台可以写「浏览器里渲染即可」。',
    answer:'标题可以不在源代码里时，用浏览器里渲染的应用。标题必须在时：React 用 Next 或 React Router 框架模式，Vue 用 Nuxt 或 VitePress，Svelte 用 SvelteKit，Angular 用 @angular/ssr。交互很少的内容站可以用 Astro。只留一个。',
    keywords:'查看网页源代码 Next Nuxt Astro SvelteKit Vite',
    diagram:'diagrams/fe-meta-framework-tradeoffs.svg',
    map:[
      {title:'浏览器里渲染',body:'源代码常只有空 div；登录后的表格可以接受'},
      {title:'跟着已选的库',body:'React 用 Next 或 React Router；Vue 用 Nuxt；Angular 用 @angular/ssr'},
      {title:'SvelteKit',body:'已经是 Svelte 时，数据从 load 返回'},
      {title:'Astro',body:'内容站。整页先是 HTML；client:load 的组件才带脚本'}
    ],
    points:['源代码里有没有标题，用来核对需求，不能单独算出脚手架','标题要进 HTML 时，用已经选定的库自己的服务端方案','一个产品只初始化一个应用脚手架'],
    deep:[
      {title:'三个都会出 HTML 的词',body:'请求进来时在服务器上生成 HTML，常叫服务端渲染。构建时先生成 HTML，常叫预渲染。Astro 默认整页是 HTML，只有标了 client: 的块带框架脚本。三种都可能让标题出现在源代码里，选型时写明用哪一种。'},
      {title:'怎样自己验证',body:'对文章页使用「查看网页源代码」，搜索标题文字。搜不到，就还是客户端空壳。再看 package.json 里是 next、nuxt、@sveltejs/kit 还是 astro，只能有一个。'}
    ],
    refs:[['Angular：服务端渲染','https://angular.dev/guide/ssr'],['Astro：为什么用 Astro','https://docs.astro.build/en/concepts/why-astro/'],['Nuxt：简介','https://nuxt.com/docs/getting-started/introduction'],['SvelteKit：简介','https://svelte.dev/docs/kit/introduction'],['React：创建应用','https://react.dev/learn/creating-a-react-app']]
  },
  {
    track:'frontend', group:'技术选型', id:'fe-ecosystem-slot-tradeoffs',
    title:'路由、接口列表、登录态，各只留一个地方',
    prompt:'已经选定 React。为什么接口列表不能同时放进 React Query 和 Redux？',
    promptAnswer:'这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。列表留在 Query 或路由加载器里的一处。Redux 只放登录态这类不来自这一次 GET 的数据。',
    core:'界面库选定之后，还有三样要各留一个地方。\n\n地址：框架自带路由就不要再装第二个。React 自己组装时，在 React Router 和 TanStack Router 里留一个。Vue 用 Vue Router。Angular 用 provideRouter。SvelteKit 用 src/routes 里的文件当路由。\n\n接口返回的列表只放一处：React 的 useQuery，或路由的 loader；Vue 的 useAsyncData；Angular 的 HttpClient 或 httpResource；SvelteKit 的 load 返回值。筛选条件要写进 queryKey 或请求参数里。不要在请求成功后再 dispatch(setOrders)，也不要写进 Pinia。见 `fe-server-state-one-owner`。\n\n登录态和主题不是上面那份订单列表。React 可以放一份 Redux Toolkit store，Vue 用 Pinia。里面不要再存同一份订单数组。\n\nTanStack Query 和 RTK Query 都能缓存接口结果。订单列表只选其中一个。',
    why:'两处都存订单。点「已发货」之后网络请求是对的，表格读的是没有清掉的那一份旧数组。',
    example:'列表只读 Query。登录态另放，不要复制订单数组：\n\n```tsx\nconst { data } = useQuery({\n  queryKey: ["orders", status],\n  queryFn: () => fetchOrders(status),\n})\n// 表格只读 data\n// 不要：dispatch(setOrders(data))\n```\n\n```ts\n// Vue / Nuxt：表格只读 data，不要再写进 Pinia\nconst { data } = await useAsyncData(\n  "orders-" + status,\n  () => $fetch("/api/orders", { query: { status } }),\n)\n```',
    task:'找到订单表格读的是哪个变量。如果 Query（或 useAsyncData）和 Redux（或 Pinia）里各有一份订单数组，删掉全局状态里的那一份。',
    answer:'表格只读一个来源：useQuery 的 data、useAsyncData 的 data、HttpClient 的结果，或 load 返回的 data。queryKey 或请求参数里要有筛选条件。Redux 或 Pinia 不保存这份列表。路由只留一个实现。',
    keywords:'useQuery queryKey useAsyncData Pinia 路由',
    diagram:'diagrams/fe-ecosystem-slot-tradeoffs.svg',
    map:[
      {title:'地址',body:'一个路由实现：框架自带，或 React Router / Vue Router'},
      {title:'订单列表',body:'useQuery 或 useAsyncData 或 HttpClient 或 load，只一处'},
      {title:'登录态',body:'Redux Toolkit 或 Pinia；不要再存同一份订单数组'}
    ],
    points:['地址只由一个路由实现','接口列表只放在 Query、useAsyncData、HttpClient 或 load 的一处','登录态可以进 Redux 或 Pinia，但不复制这份列表'],
    deep:[
      {title:'Query 和 RTK Query',body:'两个库都会缓存 GET 结果。订单列表选定一个。两个都装上时，失效要记两套 API。'},
      {title:'怎样自己验证',body:'改筛选后看网络请求的查询参数和表格第一行。第一行必须属于新参数。若第一行仍是旧订单，说明表格读的是另一份没被清掉的数组。'}
    ],
    refs:[['TanStack Query：查询键','https://tanstack.com/query/latest/docs/framework/react/guides/query-keys'],['Pinia：介绍','https://pinia.vuejs.org/introduction.html'],['Nuxt：useAsyncData','https://nuxt.com/docs/api/composables/use-async-data'],['SvelteKit：加载数据','https://svelte.dev/docs/kit/load']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_46) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
