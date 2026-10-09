/* React ecosystem: router mode, nested outlet, and where a value lives. */
const COVERAGE_FRONTEND_21 = [
  {
    track:'frontend', group:'React 生态', id:'rr-mode-gates-data',
    title:'loader 只在数据模式和框架模式里生效',
    prompt:'为什么路由上已经写了 loader，进入页面时组件仍然先空着？',
    core:'React Router 有三档，由最外层的入口决定。声明式用 BrowserRouter，负责把 URL 配到组件、用 Link 或 useNavigate 切换，并给出当前地址。数据模式把路由表挪到渲染之外，用 createBrowserRouter 得到路由器，再用 RouterProvider 挂上；这一档才加上 loader、action 和 useFetcher。框架模式在数据模式之上加 Vite 插件和路由模块，类型安全的 href、按路由拆包，以及 SPA、SSR、静态生成都在这一档。官方的 API 表里，useLoaderData 只出现在数据模式和框架模式。声明式那一列是空的。所以在 BrowserRouter 里面给 Route 写 loader，不会变成渲染前加载。',
    why:'开发者看到文档里的 loader，就把它抄进现有的 BrowserRouter。订单页仍然先挂上，再在 effect 里请求。他会以为是 loader 写错了参数，于是去改 fetch，入口档位一直没换。',
    example:'入口是 <BrowserRouter> 时，订单路由上的 loader 函数不会在渲染前运行。改成 const router = createBrowserRouter([{ path: "/orders", loader: loadOrders, Component: Orders }])，再交给 <RouterProvider router={router} />。Orders 里的 useLoaderData() 读到的是 loadOrders 的返回值。',
    task:'看应用最外层是 BrowserRouter 还是 RouterProvider。若是前者，把订单 loader 挪到 createBrowserRouter 的路由对象上，确认 useLoaderData 在组件函数体里已经有数据。',
    answer:'原入口是 BrowserRouter 时，loader 不在渲染前执行，页面仍会先空。换成 createBrowserRouter 和 RouterProvider 之后，loadOrders 的返回值能在 Orders 里用 useLoaderData 读到。框架模式是在这一档之上再加 Vite 插件，不是另做一套没有 loader 的路由。',
    keywords:'React Router BrowserRouter createBrowserRouter loader 框架模式',
    diagram:'diagrams/rr-mode-gates-data.svg',
    points:['声明式入口是 BrowserRouter，负责匹配和导航','数据模式用 createBrowserRouter 才有 loader 和 action','框架模式在数据模式上增加 Vite 插件和路由模块'],
    deep:[
      {title:'三档是往上加能力',body:'官方说明从声明式到数据模式再到框架模式，能力是叠加的。框架模式不会拿掉 loader。已经在 v6.4 的数据路由上、并且想自己管打包的项目，文档建议留在数据模式。只想要 URL 和组件对应时，留在声明式。'},
      {title:'怎样自己验证',body:'在入口确认根组件。BrowserRouter 下面的页面，给组件第一行打日志，应先看到组件执行，而不是先看到 loader 的返回值。换成 RouterProvider 后，useLoaderData 在函数体开头就能读到订单，网络请求发生在这次渲染之前。'}
    ],
    refs:[['React Router：选择模式','https://reactrouter.com/start/modes'],['React Router：数据模式路由','https://reactrouter.com/start/data/routing']]
  },
  {
    track:'frontend', group:'React 生态', id:'rr-outlet-keeps-layout',
    title:'子路由画进父级的 Outlet，布局不用复制',
    prompt:'为什么从仪表盘进到设置页，侧栏的折叠状态会丢？',
    core:'父路由的路径会自动算进子路由。path 为 /dashboard 的父级加上 path 为 settings 的子级，地址是 /dashboard/settings。子级画在父组件里的 Outlet 上。父组件自己的 state，例如侧栏是否折叠，留在父级这次挂载上。index: true 且不写 path 的路由，画在父级 Outlet 里，地址就是父级地址，这种索引路由不能再带 children。不写 path、只写组件的父级是布局路由，它不给 URL 增加一段。',
    why:'开发者把仪表盘和设置写成两条各自带侧栏的平级路由。地址一变，整棵树换掉，侧栏重新挂载，折叠恢复成展开。他会去给侧栏做全局状态，其实父级根本没有留下来。',
    example:'createBrowserRouter([{ path: "/dashboard", Component: Dashboard, children: [{ index: true, Component: Home }, { path: "settings", Component: Settings }] }])。Dashboard 返回侧栏和 <Outlet />。打开 /dashboard/settings 时，侧栏仍是 Dashboard 的那一次 state，Outlet 里换成 Settings。',
    task:'把设置页从「再画一遍侧栏」改成仪表盘的子路由。在侧栏里记下折叠，再进入设置，确认折叠还在，并且地址是 /dashboard/settings。',
    answer:'设置是 dashboard 的子路由，画在 Dashboard 的 Outlet 里。进入 /dashboard/settings 时侧栏不重新挂载，折叠保持。索引路由占据父级地址那一格，不能再挂子路由。两条平级、各自复制侧栏的写法，才会在切换时丢掉折叠。',
    keywords:'React Router Outlet 嵌套路由 索引路由 布局',
    diagram:'diagrams/rr-outlet-keeps-layout.svg',
    points:['子路由的地址包含父级路径','子页面通过父组件里的 Outlet 渲染','索引路由占用父级地址，并且不能再有子路由'],
    deep:[
      {title:'没有组件的 path 只是前缀',body:'只写 path、不写组件的路由，会给子级加上这一段地址，不会多出一个布局。设置页若还要共用侧栏，父级必须有组件，并在里面放 Outlet。'},
      {title:'怎样自己验证',body:'先在 /dashboard 把侧栏折起来。点到 settings 后，地址应为 /dashboard/settings，折叠仍在，Outlet 内的标题换成设置。若折叠弹回展开，说明设置页是另一条带侧栏的路由，没有渲染进原来的父级。'}
    ],
    refs:[['React Router：嵌套路由','https://reactrouter.com/start/data/routing'],['React Router：声明式嵌套','https://reactrouter.com/start/declarative/routing']]
  },
  {
    track:'frontend', group:'React 生态', id:'rr-redirect-before-render',
    title:'未登录时在 loader 里抛出重定向（RR 6.4+）',
    prompt:'为什么未登录打开订单页，会先闪一下订单骨架，再进登录页？',
    core:'`redirect`（**React Router 6.4+** 数据/框架模式）返回一个带 Location 的响应，默认状态码是 302。文档示例在 loader 里写 `throw redirect("/login")`。这次导航在渲染对应组件之前就转走，订单组件不会为这次未登录的导航执行。声明式模式没有 redirect，也没有 loader。把登录检查放进订单组件的 useEffect，再调用 navigate，组件函数已经执行过，骨架会先画出来。',
    why:'开发者在订单组件挂载后才发现没有会话，然后跳登录。慢机器上骨架和空表会闪一下。他去加一个 loading 布尔值盖住闪动，检查仍然发生在渲染之后。',
    example:'orders 的 loader 里：if (!isLoggedIn(request)) throw redirect("/login")。未登录直接打开 /orders 时，浏览器到登录页，Orders 函数不被调用。把同一判断挪进 Orders 的 useEffect，函数会先执行，再离开。',
    task:'未登录时打开 /orders。在 Orders 第一行打日志。确认 loader 抛出 redirect 时没有这条日志，并且停在登录页。再改成 effect 里导航，看日志是否出现。',
    answer:'未登录时 loader 抛出 redirect("/login")，默认是 302，Orders 的日志不出现。改到 useEffect 里再 navigate，日志会先出现，然后才离开订单页。声明式的 BrowserRouter 没有这个 redirect。登录检查要放在会先于组件执行的 loader 里。',
    keywords:'React Router redirect loader 302 登录',
    diagram:'diagrams/rr-redirect-before-render.svg',
    points:['redirect 只存在于数据模式和框架模式','文档示例在 loader 里 throw redirect','默认状态码是 302，组件不会为这次导航执行'],
    deep:[
      {title:'地址要经过校验',body:'redirect 接受绝对 URL，也能指向外站。跳转目标如果来自查询参数，先限定成站内路径，再抛出。用户随便给的地址不能直接当成 Location。'},
      {title:'怎样自己验证',body:'清掉登录态后打开 /orders。loader 抛出重定向时，订单组件第一行的日志不应出现，页面停在 /login。把判断移进 useEffect 后，同一行日志应先出现，随后才离开。'}
    ],
    refs:[['React Router：redirect','https://reactrouter.com/api/utils/redirect'],['React Router：选择模式','https://reactrouter.com/start/modes']]
  },
  {
    track:'frontend', group:'React 生态', id:'state-kind-picks-home',
    title:'先分清这个值属于谁，再决定进哪个库',
    prompt:'为什么订单列表、主题和弹层开关进了同一个 store，备注却不更新？',
    core:'能在渲染时算出来的值不要再存一份。React 把互相矛盾、重复保存的状态当成结构问题。只传几层的数据用 props；中间层完全不用、只负责转发时，可以把 JSX 当 children 传下去。这两种都做不到，才用 Context。文档列出的用途包括主题和当前账号。服务端状态放在你不拥有的地方，要异步读取，别人也会改，并且会过期。TanStack Query 管的是这一类。Redux 管的是多处都要的客户端状态，而且更新频繁、逻辑复杂、代码库已经由很多人一起改。文档同时写明：不是每个应用都需要 Redux。选定 Redux 之后，新代码用 Toolkit，见 redux-rtk-today。订单列表的缓存主人见 query-server-state。',
    why:'开发者把「要共享」理解成都放进一个 store。订单数组进了 slice 之后，没有过期和重新请求。另一台机器改了备注，这边侧栏仍是旧的。弹层开关并不被很多页面读取，它只是被一起放进来了。',
    example:'主题用 Context。订单弹层的开关用页面里的 useState。订单数组只放在 queryKey 为 ["orders", status] 的查询里。页头和结算页都要改、而且规则要一起变的购物车，才拿去对照 Redux 的四条。购物车若只在一个页面里改，留在该页的 state。',
    task:'拿一个真实页面写出四个值各住在哪：主题、弹层、订单列表、购物车规则。订单数组在 slice 里出现时删掉，只保留查询缓存。',
    answer:'主题留在 Context，弹层开关留在页面 state，订单列表只留在 Query。购物车要同时满足多处需要、更新频繁、逻辑复杂、并且代码由多人维护，才放进 Redux。只在一个页面修改的购物车留在该页。订单 id 已经在地址上时，不再用 state 存同一份。',
    keywords:'Context TanStack Query Redux 状态分类 props',
    diagram:'diagrams/state-kind-picks-home.svg',
    points:['能算出来的值不要再存一份','主题和当前账号用 Context，服务端列表用 Query','Redux 用于多处共享且更新逻辑复杂的客户端状态'],
    deep:[
      {title:'props 先于 Context',body:'文档要求先尝试 props，以及把 JSX 作为 children 交给中间层。中间层如果并不读这份数据，抽出子树比新建一个全局 Context 更直接。当前账号这种到处要读的值，才是 Context 的例子。'},
      {title:'怎样自己验证',body:'改另一处数据源里的订单备注并重新请求。表格应跟着查询结果变。若表格不变，说明它读的是 slice 里的数组。弹层开关只应出现在该页的 useState，主题只应出现在对应 Context。'}
    ],
    refs:[['React：组织状态','https://react.dev/learn/choosing-the-state-structure'],['TanStack Query：概览','https://tanstack.com/query/latest/docs/framework/react/overview'],['Redux：何时使用','https://redux.js.org/tutorials/essentials/part-1-overview-concepts']]
  },
  {
    track:'frontend', group:'React 生态', id:'state-reducer-context-screen',
    title:'一屏里多处改同一份列表时，用 reducer 和 Context',
    prompt:'为什么一个任务页就要新建 Redux store？',
    core:'React 的放大方式是把 reducer 和 Context 合在一起。reducer 集中「这份列表怎样改」。再准备两个 Context：一个提供当前列表，一个提供 dispatch。任一深层组件用自定义 Hook 读取。官方任务表示例里，某一行是否正在编辑留在该行自己的 useState，不放进共享列表。应用变大时可以有许多组这样的配对。Redux 仍然只在多处共享、更新频繁、逻辑复杂、并且由多人维护时更有用。这一屏任务不符合那四条时，不需要 store。',
    why:'开发者一看到两处按钮都能改列表，就创建 store 和 slice。编辑框的开关也进了全局状态。换一行时，上一行的编辑态要靠额外 action 清掉，因为那本是这一行自己的界面状态。',
    example:'TasksProvider 里 useReducer(tasksReducer, initialTasks)，分别提供列表和 dispatch。Task 里 const [isEditing, setIsEditing] = useState(false)。点删除时 dispatch({ type: "deleted", id })。页头和列表读的是同一份 tasks。',
    task:'把任务页的增删改收成一个 reducer，用两个 Context 提供列表和 dispatch。行内编辑开关留在该行的 useState。确认没有为这一页新建 store。',
    answer:'增删改都变成对 tasksReducer 的 dispatch，深层按钮通过 useTasksDispatch 发出。正在编辑哪一行只存在该行的 useState。这一页没有 Redux store。列表被页头、结算和其他模块同时改、而且规则已经复杂时，再按 Toolkit 建 store。',
    keywords:'useReducer Context dispatch Redux 任务列表',
    diagram:'diagrams/state-reducer-context-screen.svg',
    points:['一屏的共享列表用 reducer 描述怎么改','列表和 dispatch 分成两个 Context 往下传','行内编辑开关留在该行的 state'],
    deep:[
      {title:'可以有很多组',body:'文档说明应用变大后会有许多组 Context 和 reducer。每一组只包住自己那一块屏幕。不要把任务、主题和订单合成一个巨大的 Context，否则任一块变化都会通知所有读者。'},
      {title:'怎样自己验证',body:'从列表和页头各删除一项，两处应看到同一份剩余任务。点开某一行的编辑时，其他行不应进入编辑。仓库里这一页的目录不应出现 configureStore。'}
    ],
    refs:[['React：用 reducer 和 Context 放大','https://react.dev/learn/scaling-up-with-reducer-and-context'],['Redux：何时使用','https://redux.js.org/tutorials/essentials/part-1-overview-concepts']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_21) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
