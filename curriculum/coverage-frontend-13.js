/* Batch 13: React.md SSR “fewer HTTP” myth and HOC-as-mixins-replacement. */
const COVERAGE_FRONTEND_13 = [
  {
    track:'frontend', group:'工程实践', id:'react-ssr-not-fewer-http',
    title:'SSR 先给可看的 HTML，并不等于少请求或一份文档带齐数据',
    prompt:'为什么把服务端渲染概括成“一个 HTML 返回所有数据、因此减少 HTTP 请求、首屏不再依赖 JS”会误导？',
    core:'SSR 用服务端生成的标记让用户先看到内容，客户端再用 hydrateRoot 把同一棵树接上交互。官方强调：这是在 JS 到达前展示快照，服务端输出必须与客户端首次渲染一致；不匹配会变慢甚至把事件绑错节点。它并不取消后续的脚本、样式和图片请求，更不保证“一份 HTML 里已经有全部数据”。现行服务端 API 优先流式输出（如 renderToPipeableStream），而不是一次拼完字符串。CSR 的文档也未必是空 body：预渲染、静态导出同样能先有标记。服务端压力、SEO 友好在不少场景成立，但要绑具体爬虫与缓存策略。类组件“服务端只跑到 DidMount 之前”对 Effect 同样适用：useEffect 不在服务端跑；这限制的是副作用时机，不是“第三方库因此都不能用”。水合一致性见既有 `ssr-hydration`；服务端组件与客户端组件分工见 `react-rsc-vs-client`。',
    why:'误以为服务端渲染就是一次 HTML 带回全部数据，从而更少请求。页面仍要下载脚本，两边文案不一致时水合还会出错。区分信号是先有可看的标记，交互要等脚本，水合必须和首次渲染一致，文档之后的脚本、样式和图片请求都仍然会发出。',
    example:'商品页先返回带标题的 HTML，浏览器仍要拉 JS 才能点加入购物车。hydrateRoot 时若客户端用 Date.now() 画出不同文案，就会 mismatch。不要把 ReactDOM.render 当水合入口。',
    task:'对照 hydrateRoot 文档列出仍会发出的静态资源请求，并把资料里“减少 HTTP / 一份 HTML 返回所有数据”划掉，改成“先有标记，再水合”。',
    answer:'对照文档，HTML 之后仍会请求脚本、样式和图片，这些请求没有被取消。划掉减少 HTTP 和一份 HTML 返回所有数据。改成服务端先给出可看的标记，再用 hydrateRoot 接上交互，两边首次输出必须一致。流式输出也不等于数据一次到齐。',
    react:'architecture',
    deep:[
      {title:'先看见的是标记，交互在脚本之后',body:'用户先看到服务端输出的 HTML。脚本到达后，hydrateRoot 按同一棵树绑定事件。两边首次渲染不一致时，可能更慢，也可能把事件绑错节点。后面的脚本、样式和图片请求仍然会发出。'},
      {title:'怎样自己验证',body:'在网络面板里看文档请求之后还有哪些脚本、样式和图片。把资料里的少请求和数据一次到齐划掉。再让服务端和客户端首次输出同一句文案，确认水合不再报不一致。不一致的文案应能在水合时被观察到。'},
    ],
    keywords:'SSR hydrateRoot 水合 HTTP 流式 renderToPipeableStream',
    points:['SSR 是先输出 HTML 快照再水合，不是取消客户端包','一份 HTML 不保证带齐数据，也不等于更少 HTTP','水合时服务端与客户端首次输出必须一致'],
    refs:[['React：hydrateRoot','https://react.dev/reference/react-dom/client/hydrateRoot'],['React：Server React DOM APIs','https://react.dev/reference/react-dom/server']]
  },
  {
    track:'frontend', group:'React', id:'react-hooks-over-hoc',
    title:'复用状态逻辑：自定义 Hook 优先，HOC 不是 mixins 的现行替身',
    prompt:'为什么“class 之后 mixins 不能用了，所以 HOC 是政治正确的替代，效果完全一致”不够当现行答案？',
    core:'mixins 的依赖隐晦、命名冲突、越改越大，这些批评成立，React 也早就不推荐 mixins。但替代路径不是“从此只用 HOC”。官方复用状态逻辑的默认方式是自定义 Hook：把订阅、计时器、窗口宽度等抽成函数，在多个组件顶层调用，依赖关系写在调用处。HOC 仍能装饰组件，也会带来包裹层、displayName、把 props 塞进被装饰组件、以及与 Hooks 叠在一起时的心智负担。资料里 withWindowWidth 把 window 监听塞进类 HOC，用自定义 Hook 更直接。HOC 与 Vue mixins 作用也不等同：Vue 的 mixins / 组合式 API 是另一套模型。需要横切 UI 外壳时仍可用 HOC 或包装组件；需要复用状态时先写 Hook。',
    why:'误以为类组件之后只能用高阶组件替代 mixins，而且效果完全一样。新代码会叠出多层包装，调用处看不出状态从哪来。区分信号是订阅和窗口宽度写成自定义 Hook，在组件顶层直接调用。',
    example:'function useWindowWidth(){ const [w,setW]=useState(innerWidth); useEffect(()=>{ const on=()=>setW(innerWidth); addEventListener("resize",on); return ()=>removeEventListener("resize",on); },[]); return w; } 组件里 const width=useWindowWidth()。不必先包一层 DerivedClass。',
    task:'把资料中的 withWindowWidth 改成自定义 Hook，对比 props 来源是否仍需要 {...state} 打进子组件。',
    answer:'withWindowWidth 改成 useWindowWidth，组件里直接取返回的宽度。宽度不再经展开的 state 打进子组件，来源就是这次 Hook 调用。原来的包装层可以去掉，不必再为了复用状态包一个派生类。props 来源从包装层的展开，变成这次调用的返回值。',
    react:'hooks',
    deep:[
      {title:'依赖应写在调用的地方',body:'高阶组件把监听放在外层，再把量到的宽度塞进 props，来源被包层挡住。自定义 Hook 把同一段订阅留在组件函数顶层，读代码就能看见依赖。需要包一层外壳时仍可用包装组件。'},
      {title:'怎样自己验证',body:'把 withWindowWidth 改成 Hook 后，看组件参数里还有没有被塞进来的宽度。宽度应只来自 Hook 的返回值。改变窗口宽度时界面仍更新，且不再需要把 state 展开到子组件上。'},
    ],
    keywords:'自定义 Hook HOC mixins 复用 装饰器',
    points:['mixins 因隐式依赖和冲突被淘汰','复用状态逻辑的现行默认是自定义 Hook','HOC 仍可用，但不是 mixins 的唯一或首选替身'],
    refs:[['React：Reusing Logic with Custom Hooks','https://react.dev/learn/reusing-logic-with-custom-hooks'],['React：You Might Not Need an Effect','https://react.dev/learn/you-might-not-need-an-effect']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_13) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
