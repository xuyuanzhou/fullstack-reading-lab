/* Batch 11: React.md Router v4 APIs + “latest = 16.x” narrative. */
const COVERAGE_FRONTEND_11 = [
  {
    track:'frontend', group:'React 生态', id:'react-router-element-api',
    title:'现行 React Router：Routes + element，不是 Switch + component（RR 6）',
    prompt:'为什么把 Switch、Route 的 component={About}、Redirect、activeClassName 当作现行默认 API 会过时？',
    promptAnswer:'现行默认是 Routes、element 和 Navigate。Switch、component={About}、Redirect、activeClassName 是旧 API。',
    core:'资料大量示例来自 React Router v5 及更早：用 Switch 包一层、Route 用 component 或 render、重定向写 Redirect、NavLink 用 activeClassName。**React Router 6** 起声明式用法以 Routes / Route 的 `element` 为主；重定向常用 Navigate；NavLink 的活跃样式通过 className / style 的函数参数根据 isActive 计算。hash 与 history 两种客户端路由思想仍成立，但不要把旧组件名当新项目的默认菜单。数据路由、loader 等能力见既有 `react-router-loader`，本课只纠正路由声明与链接 API 的版本漂移。',
    why:'误以为 Switch 和 component 属性仍是现行默认写法。新项目里对不上文档示例，活跃样式也读不到旧的类名属性。区分信号是路由用 element 放元素，重定向用 Navigate，活跃类名由函数拿到 isActive。',
    example:'旧：<Switch><Route path="/about" component={About} /></Switch>。新：<Routes><Route path="/about" element={<About />} /></Routes>。跳转：<Navigate to="/" replace />。NavLink：className={({isActive}) => isActive ? "active" : undefined}。',
    task:'把资料里一段 Switch/component/Redirect 配置改写成 Routes/element/Navigate，并核对官方 Routing 文档中的 NavLink 函数式 className。',
    answer:'改写后外层是 Routes，About 放在 element 上，不再使用 Switch 和 component。重定向写成 Navigate 并 replace。NavLink 的 className 改成函数，isActive 为真时返回 active。旧属性留在旧版叙事里并注明版本。',
    deep:[
      {title:'元素和组件类型不是同一个属性',body:'component 接收组件类型，element 接收已经创建的元素。Switch 按旧规则选一条，Routes 按现行方式匹配。活跃样式不再读一个类名字符串，而要看函数参数里的 isActive。hash 与 history 的分工仍在。'},
      {title:'怎样自己验证',body:'把资料里的 Switch、component 和 Redirect 改成 Routes、element 和 Navigate，页面应仍能打开 About 并完成跳转。再对照 NavLink 文档，确认 className 的参数里有 isActive。'},
    ],
    keywords:'React Router Routes Route element Navigate Switch component NavLink',
    points:['Routes + element 是现行声明式默认','Navigate 替代常见 Redirect 写法','NavLink 用函数式 className/style 表达活跃态'],
    refs:[['React Router：Routing','https://reactrouter.com/start/library/routing'],['React Router：NavLink','https://reactrouter.com/api/components/NavLink']]
  },
  {
    track:'frontend', group:'React', id:'react-version-checklist',
    title:'不要把 React 16 特性清单当成“最新版答卷”',
    prompt:'为什么背「最新 React = Time Slicing + Suspense + Hooks，再加 useMutationEffect」对 React 19 不够？',
    promptAnswer:'useMutationEffect 等已不在现行清单。留下 createRoot、函数组件加 Hooks，以及 lazy、Suspense 与错误边界。',
    core:'资料“最新版本”一节停在 16.x 营销叙事：Time Slicing、Suspense、Hooks，并罗列 useMutationEffect、useImperativeMethods 等已更名或退出日常文档的实验名。对今天的学习者，更稳的坐标是：用 createRoot 挂载（不要再默认 ReactDOM.render）、函数组件 + Hooks 为默认写法、并发与 Suspense 按现行文档理解、错误用错误边界（getDerivedStateFromError / componentDidCatch）且清楚边界接不住事件与异步。Suspense 也不是任意 Effect 请求的通用开关，见既有 `suspense` 课。回答“新版本解决了什么”应绑定具体主版本与官方升级说明，而不是背一份 16 时代清单。',
    why:'误以为最新版本就是时间切片、Suspense 和一份实验钩子清单。审查里会写出已经退出日常文档的名字。区分信号是对照现行文档：挂载用 createRoot，特性要绑到具体主版本的升级说明。',
    example:'新应用：createRoot(el).render(<App />)。列表过滤用 startTransition 标低优先级。代码分割用 lazy + Suspense。不要在答案里出现 useMutationEffect。',
    task:'对照 react.dev 的 createRoot 与 Suspense 页，划掉资料中的 useMutationEffect / Factory 组件等条目，并写出三条仍成立的现行要点。',
    answer:'划掉 useMutationEffect、useImperativeMethods 和 Factory 组件。三条仍成立：用 createRoot 挂载；函数组件加 Hooks 是默认写法；代码分割用 lazy 配合 Suspense，错误用错误边界，边界接不住事件和异步。',
    react:'architecture',
    deep:[
      {title:'实验名字已经离开日常文档',body:'时间切片和早期 Suspense 的宣传，不能代替现在的挂载方式和错误边界。useMutationEffect 一类名字已不在日常文档里。回答新版本解决了什么，要指到具体主版本和官方升级说明，而不是背一份旧清单。'},
      {title:'怎样自己验证',body:'打开 createRoot 与 Suspense 的文档，把资料里对不上的实验钩子和 Factory 组件划掉。再写出三条能在这两页或错误边界说明里指认的做法，不要凭记忆补已经退出的 API。'},
    ],
    keywords:'React 19 createRoot Concurrent Suspense Hooks 版本',
    points:['挂载默认讲 createRoot，不再默认 ReactDOM.render','不要背已退出文档的实验钩子名','特性清单必须绑定主版本与官方说明'],
    refs:[['React：createRoot','https://react.dev/reference/react-dom/client/createRoot'],['React：Suspense','https://react.dev/reference/react/Suspense'],['React：版本说明','https://react.dev/blog']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_11) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
