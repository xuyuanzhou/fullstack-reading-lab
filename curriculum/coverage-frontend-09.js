/* Batch 09: high-risk React.md claims already spotted in accuracy review. */
const COVERAGE_FRONTEND_09 = [
  {
    track:'frontend', group:'React', id:'react-event-root',
    title:'React 事件委托在根上，stopPropagation 仍有意义',
    prompt:'为什么“事件都绑在 document 上，所以要用 preventDefault 代替 stopPropagation”不能当 React 19 的答案？',
    core:'旧资料常写把监听挂到 document。从 React 17 起，委托目标是应用根容器；createRoot(container) 会在该根上注册支持的事件。合成事件包装原生事件，但 stopPropagation 与 preventDefault 语义仍然分开：前者停止传播，后者取消默认动作。把“不想冒泡”写成必须 preventDefault、并宣称 stopPropagation 无效，是概念错误。混用原生监听与 React 事件时，若在更内层原生 handler 里停冒泡，可能让根上的 React 监听收不到事件，这是混用问题，不是 stopPropagation 本身无效。',
    why:'误以为监听都挂在 document 上，于是要用取消默认来代替停止冒泡。这样会误取消链接跳转，外层点击却还在。区分信号是委托挂在根容器上，停止传播和取消默认动作各管一件事，原生截断若发生在根之前，根内处理都不会执行。',
    example:'按钮 onClick 里 event.stopPropagation() 可阻止外层 div 的 onClick；阻止链接跳转才用 preventDefault。用 createRoot 挂到 #app 时，监听在 #app 而不是必然在 document。',
    task:'在根容器内外各挂一个 React onClick，再在中层用原生 addEventListener 调用 stopPropagation，记录谁还能收到事件；并纠正资料里 preventDefault/stopPropagation 的互换。',
    answer:'中层原生监听调用 stopPropagation 之后，事件到不了根容器，根内的 React onClick 收不到；根外的监听不靠这次委托。停止冒泡仍用 stopPropagation。取消链接跳转才用 preventDefault，二者不能互换，委托也不在 document 上。',
    react:'events',
    deep:[
      {title:'根上的监听负责再派发',body:'根容器上的监听先接到原生事件，再派发到组件树里的处理函数。stopPropagation 切断传播，preventDefault 取消浏览器默认动作。在目标和根之间用原生监听截断后，根上的派发不会发生。'},
      {title:'怎样自己验证',body:'在根容器内、外各放一个 React onClick，再在中层原生监听里调用 stopPropagation，记下谁还执行。然后只把 preventDefault 换上去，链接或提交的默认动作应消失，冒泡路径却不应被当成已经切断。'},
    ],
    keywords:'React 19 事件委托 createRoot stopPropagation preventDefault SyntheticEvent',
    points:['React 17+ 委托到根容器，不是必然 document','stopPropagation 与 preventDefault 职责不同','原生停冒泡可能让根上的 React 监听收不到'],
    refs:[['React：Responding to Events','https://react.dev/learn/responding-to-events'],['React 19.3.0：DOMPluginEventSystem','https://github.com/facebook/react/blob/v19.3.0/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js']]
  },
  {
    track:'frontend', group:'React', id:'react-setstate-batch',
    title:'setState 批处理：别再背 isBatchingUpdates（React 18）',
    prompt:'为什么用“合成事件里异步、setTimeout 里同步”加上 isBatchingUpdates 解释 React 19 不够用？',
    core:'状态更新先进入队列，按渲染快照应用；同一事件里的多次更新可以批处理合并。**React 18** 起在更多场景默认批处理，不能再把“原生事件 / setTimeout 一定同步刷 DOM”当稳定定律。资料里的 isBatchingUpdates、dirtyComponents 属于旧协调器叙事，不适合作为 Hooks 与并发渲染的标准讲解。setter 调用后，当前这次渲染里读到的变量仍是旧快照；要基于前值计算应使用更新函数形式。性能上的“少 render”来自批处理与跳过更新，而不是“setState 天生异步函数”。',
    why:'误以为合成事件里异步、定时器里一定同步。定时器或 Promise 里连续两次自增，仍可能只渲染一次，中间值看不到。区分信号是更新进入队列后按快照应用，而不是 isBatchingUpdates 那个旧开关。',
    example:'点击处理器里 setCount(c=>c+1) 两次，一次渲染里累加两次。把同样两次更新放到 Promise 回调里，在 React 18+ 仍可能批处理，不能默认假设一定看到中间态。',
    task:'在 onClick、setTimeout、async 回调里各写两次基于旧值的自增，记录 render 次数与最终值；再用更新函数重写，说明为何不再提 isBatchingUpdates。',
    answer:'onClick、setTimeout 和 async 里各写两次基于旧 count 的自增，最终都只加 1，后两处在默认批处理下也常常只有一次渲染。改成更新函数后，同一队列里两次都基于前值，最终加 2。解释它靠入队和快照即可。三次试验都不要再拿 isBatchingUpdates 预测中间态会不会出现。',
    react:'state',
    deep:[
      {title:'同一次渲染共用一张快照',body:'渲染函数里的 count 在这次渲染期间不变。连续两次用这个旧值计算，会写成同一个结果，所以只加 1。更新函数从队列里的前一个结果接着算，才能累加两次。批处理决定中间态会不会单独出现。'},
      {title:'怎样自己验证',body:'在点击、setTimeout 和 async 里各做两次旧值自增，记下渲染次数和最终数字。再改成更新函数重跑。最终应从加 1 变成加 2，并且不必到源码里寻找旧的批处理开关。'},
    ],
    keywords:'React 19 setState 批处理 快照 isBatchingUpdates useState 更新函数',
    points:['更新先入队，渲染读的是快照','React 18+ 默认批处理不能按旧同步表背','不要用 isBatchingUpdates 解释现代 Hooks'],
    refs:[['React：State as a Snapshot','https://react.dev/learn/state-as-a-snapshot'],['React：Queueing a Series of State Updates','https://react.dev/learn/queueing-a-series-of-state-updates'],['React 19.3.0：ReactFiberHooks','https://github.com/facebook/react/blob/v19.3.0/packages/react-reconciler/src/ReactFiberHooks.js']]
  },
  {
    track:'frontend', group:'React', id:'react-effect-timing',
    title:'useLayoutEffect 在绘制前，但不是无条件定理',
    prompt:'为什么“useEffect 总在改变像素之后、且总比 useLayoutEffect 晚”不能写成绝对规则？',
    core:'官方建议：需要在浏览器重新绘制前测量或同步改 DOM 时用 useLayoutEffect；其余副作用优先 useEffect。常见客户端路径里，layout effect 的 setup 在 DOM 更新后、绘制前同步运行；passive 的 useEffect 在绘制后异步运行，因此多数情况下 layout 先于 effect。但不能把“像素一定已经变了 / 一定还没变”当成与调度、Strict Mode 双调用、SSR 水合无关的物理定律。useLayoutEffect 在服务器渲染时会告警，服务端没有布局可测。资料里“两者底层完全一致、基本可直接替换”也不成立：签名相似，提交阶段的调度时机不同。分不清就先用 useEffect；出现闪烁或测量不准再改 layout，并避免在 layout 里做重计算。',
    why:'误以为绘制之后像素一定已经变完，两个钩子可以互换。服务端没有布局可测，放在绘制前的钩子会告警，在里面发请求还会堵住绘制。区分信号是测量并同步改 DOM 才放绘制前，其余副作用放绘制后。',
    example:'根据子节点高度设置父容器样式：在 useLayoutEffect 里读 getBoundingClientRect 再 setState，避免先绘错误高度再闪一下。拉数用 useEffect，不要堵在 layout 阶段。',
    task:'分别用 useEffect 与 useLayoutEffect 在更新后读布局并改样式，录屏对比是否闪烁；再在文档中核对 SSR 对 useLayoutEffect 的说明。',
    answer:'useEffect 在绘制之后改高度，录屏里常先闪一帧错误尺寸。useLayoutEffect 在绘制前读完布局并改完，这一帧不闪。文档说明服务端没有布局，那时使用它会告警。默认副作用仍用 useEffect。只有测量后要同步改 DOM、并且怕闪烁时，才把逻辑放进 useLayoutEffect。',
    react:'effects',
    deep:[
      {title:'绘制前改完，用户看不到中间帧',body:'浏览器在布局和绘制之前还有机会改 DOM。这段时间里量高度并写回样式，用户看不到错误的一帧。绘制之后再改，错误尺寸会先出现。服务端没有布局阶段，所以不能在那里做这件事。'},
      {title:'怎样自己验证',body:'同一个“读高度再改样式”分别放进两个钩子，录屏看第一帧是否闪动。再到 useLayoutEffect 的文档核对服务端渲染说明，确认告警来自没有布局可测，而不是来自拼写。'},
    ],
    keywords:'React useEffect useLayoutEffect 绘制 paint SSR 副作用',
    points:['layout effect 面向绘制前的 DOM 测量与同步修改','useEffect 适合绘制后的普通副作用','SSR 与重计算场景不能无脑互换两个 API'],
    refs:[['React：useEffect','https://react.dev/reference/react/useEffect'],['React：useLayoutEffect','https://react.dev/reference/react/useLayoutEffect']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_09) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
