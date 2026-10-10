/* Batch 10: next high-risk React.md claims (Fiber / VDOM / props→state Effect). */
const COVERAGE_FRONTEND_10 = [
  {
    track:'frontend', group:'React', id:'react-fiber-interrupt',
    title:'Fiber：可中断的渲染工作，不是操作系统协程',
    prompt:'为什么把 Fiber 背成「操作系统协程，并顺便做 JIT、修正 reflow」容易误导？',
    promptAnswer:'Fiber 让渲染阶段可中断；提交阶段才改 DOM。它不是操作系统协程，也不负责 JIT 或修正 reflow。',
    core:'Fiber 是 React 协调器里的工作单元与树结构：把更新拆成可调度、可中断、可恢复的片段，并按优先级安排，避免长时间同步占用主线程。渲染阶段可以在提交 DOM 前让出；提交阶段对 DOM 的改动仍应尽快完成。资料里把 Fiber 直接等同操作系统协程、并宣称“给浏览器喘息去做 JIT / 修正 reflow”属于叙事加成，不是应用层应背的 API 合同。学习时抓住三点：工作可切片、更新有优先级、双缓冲（current / workInProgress）用于构造下一棵树，而不是背“假象性能魔法”。',
    why:'误以为它等于操作系统协程，并会让浏览器去做 JIT 和修正重排。于是说不清为什么渲染可以让出，提交却仍要快。区分信号是渲染阶段可中断并重来，提交阶段才把一致结果写进 DOM，尚未提交的半成品可以被丢掉并从头再协调。',
    example:'连续打字时，低优先级的列表过滤渲染到一半，被新的一次输入打断并丢弃，稍后再从头协调。最后只有一次提交把输入值和列表一起写进文档。浏览器不会因此自动做 JIT 或重算重排。输入框里连续按下两个键，第一次过滤的协调不会被提交。',
    task:'对照 Render and Commit：标出哪一段可中断、哪一段提交 DOM；划掉资料里 JIT/reflow 那两句“附赠好处”。',
    answer:'渲染阶段可以把工作切片、中断并恢复；提交阶段才改 DOM，应尽快做完。current 与 workInProgress 用来准备下一棵树。资料里等于操作系统协程，以及顺便做 JIT、修正 reflow 两句应划掉。划掉之后只保留可中断的渲染，以及尽快写完的提交。',
    react:'fiber',
    deep:[
      {title:'丢掉的是尚未提交的半成品',body:'渲染可以做到一半被更高优先级的更新打断，没提交的那棵树可以扔掉重来。提交一旦开始，对 DOM 的修改要尽快做完，避免界面停在撕开的状态。这是协调器里的工作单元，不是操作系统线程。'},
      {title:'怎样自己验证',body:'对照渲染与提交的说明，标出哪一段可以让出、哪一段才写 DOM。再把资料里 JIT 和修正 reflow 两句划掉，剩下的应只是可调度的协调，以及要尽快完成的提交。'},
    ],
    keywords:'React Fiber 可中断 调度 Concurrent commit workInProgress',
    points:['Fiber 是可调度的协调工作单元与树结构','渲染可中断，提交 DOM 仍应尽快完成','不要把 JIT/reflow 修正写成 Fiber 的合同能力'],
    refs:[['React：Render and Commit','https://react.dev/learn/render-and-commit'],['React 19.3.0：ReactFiberWorkLoop','https://github.com/facebook/react/blob/v19.3.0/packages/react-reconciler/src/ReactFiberWorkLoop.js']]
  },
  {
    track:'frontend', group:'React', id:'react-vdom-perf-bound',
    title:'虚拟 DOM 保证的是下限，不是永远更快',
    prompt:'为什么“上了虚拟 DOM 就一定比直接操作 DOM 更快”不能当面试标准答案？',
    promptAnswer:'虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。小改文案和海量插入都要以实测为准。',
    core:'虚拟 DOM / 元素树首先是用普通对象描述 UI，便于跨环境描述界面并配合声明式更新。协调会算出需要改动的宿主节点，再在提交阶段改 DOM；React 在结果相同时可以不碰 DOM。但这不等于“任何场景都比手写 DOM 或一次 innerHTML 更快”：多了一层 JS 计算，小改动或首次灌入大量节点时，直接操作有时更省。官方卖点也不是“虚拟 DOM 性能碾压”，而是用声明式模型在多数应用里保住可维护的性能下限。资料前半若写成“有效减少渲染次数所以一定更快”，后半又承认不一定更快，应以场景讨论为准。',
    why:'误以为有了虚拟 DOM，更新就一定比直接改文档更快。单改一处文案时，多出来的协调可能更贵，长列表却没去测。区分信号是结果相同时可以不碰文档，但多一层计算并不保证每一次都更短，同一次改文案的耗时才是该拿来比较的证据。',
    example:'把按钮文案从“提交”改成“已提交”：一次 textContent 赋值通常短于先渲染子树再协调。换成一次替换一千个列表项时，直接灌入有时更短。虚拟 DOM 说明的是用对象描述界面。两组都要记下耗时，不能只凭页面看起来还流畅。',
    task:'写两组更新：单节点改文案，与替换一千个列表项。对比直接 DOM 与 React 更新的耗时，并写一句结论：VDOM 保下限，不保证每次都更快。',
    answer:'单节点改文案时，直接改文本通常短于一次渲染加协调。替换一千个列表项时，直接灌入仍可能更短，协调只在结果相同的部分省下 DOM 操作。结论是虚拟 DOM 保住下限，不保证每次都更快。耗时以这两组测量为准，小改动和海量插入都可能让直接操作更短，所以不能写成永远更快。',
    react:'diff',
    deep:[
      {title:'省下的是重复的 DOM 写入',body:'描述相同时可以不改宿主节点，这是可维护的下限。单次替换文本本身很便宜，前面的渲染和比较可能更贵。第一次插入大量节点时，直接写入有时更短，因为没有那一层对象比较。'},
      {title:'怎样自己验证',body:'准备两组更新：单节点改文案，以及一次替换一千个列表项。分别量直接操作和 React 更新的耗时。结论写成保住下限，耗时以这次测量为准，而不是每一次都更快。记下两组的数字再写结论。'},
    ],
    keywords:'虚拟 DOM Virtual DOM 性能 diff commit 声明式',
    points:['元素树是 UI 的对象描述，便于声明式更新与跨环境','协调后按需改 DOM，结果相同可不碰 DOM','小更新或海量首次插入时，直接 DOM 仍可能更快'],
    refs:[['React：Render and Commit','https://react.dev/learn/render-and-commit'],['React：Preserving and Resetting State','https://react.dev/learn/preserving-and-resetting-state']]
  },
  {
    track:'frontend', group:'React', id:'react-props-state-sync',
    title:'props 变了不必先拷进 state 再 useEffect',
    prompt:'为什么「useState(props) 只在第一次生效，所以必须用 useEffect 同步 props」常常是错的？',
    promptAnswer:'多数情况应在渲染期直接用 props，或用 key 换身份重置。用 Effect 把 props 抄进 state，容易先闪旧值再被覆盖。',
    core:'useState 的初始值只在挂载时用一次，这是事实；但把传入的 props 再拷一份进 state，再用 Effect 每次同步，往往制造双重真相来源。能在渲染中从 props 直接算出来的值，应在渲染时派生，不要存一份再同步。需要在 props 标识变化时重置整块 UI 与状态，更稳妥的是给组件加 key，让 React 以新身份挂载。Effect 适合同步外部系统，不适合当“把 props 灌进 state”的默认管道。资料里“class 里 push 同一数组再 setState 没问题”也不可靠：同一引用的更新在两种模型里都容易踩浅比较与批处理的坑，应创建新数组或新对象。',
    why:'误以为初始状态只生效一次，所以必须用副作用把 props 再同步进 state。列配置会多渲染一次，本地排序还会被父组件的新数组盖掉。区分信号是渲染时能算出来的值不要另存，整块重置用 key。',
    example:'父组件传入 columns。子组件直接用 columns 渲染，或 const visible = columns.filter(...)；不要 useState(columns)+useEffect 再 set。切换不同表格时用 key={tableId} 重置内部排序状态。',
    task:'找一处 props→state→Effect 同步，改成渲染期派生或 key 重置；确认行为一致且少一次中间状态。',
    answer:'列配置改为渲染期直接使用 columns，或先 filter 出可见列，不再经 state 和 Effect。切换表格时用 key 换成新身份来重置排序。界面与改前一致，但少掉先显示旧列、再被副作用写回的中间状态。本地排序不再被父组件后来的数组覆盖。',
    react:'effects',
    deep:[
      {title:'派生值不要再存一份',body:'父组件已经持有 columns。子组件在渲染时直接用或过滤，数据只有一处。拷进 state 再靠 Effect 拉平，会多一次渲染，本地排序还可能被新的 props 覆盖。整张表要换身份时，给组件换 key。'},
      {title:'怎样自己验证',body:'找一处从 props 拷到 state 的 Effect，改成渲染期计算，或用 key 重置。打开渲染高亮，确认少了那次只为同步而发生的渲染，筛选和排序行为仍与改前一致。'},
    ],
    keywords:'React props state useEffect 派生状态 key 重置',
    points:['useState 初始值只在挂载使用一次','可派生的值应在渲染中计算，避免 Effect 同步','重置内部状态优先用 key 换身份'],
    refs:[['React：You Might Not Need an Effect','https://react.dev/learn/you-might-not-need-an-effect'],['React：Preserving and Resetting State','https://react.dev/learn/preserving-and-resetting-state']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_10) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
