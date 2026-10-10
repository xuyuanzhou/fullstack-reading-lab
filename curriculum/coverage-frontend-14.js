/* Batch 14: React.md “Context is experimental / getChildContext / SCU blocks it”. */
const COVERAGE_FRONTEND_14 = [
  {
    track:'frontend', group:'React', id:'react-context-stable',
    title:'Context 已是稳定 API，不是实验功能（React 16.3）',
    prompt:'旧资料说 Context 还在实验、中间 shouldComponentUpdate 为 false 会丢更新。为什么这不能当 React 19 的答案？',
    promptAnswer:'现行写法是 createContext、Provider 和 useContext。中间组件跳过渲染时，深层仍能读到新的 Context 值。',
    core:'现行 Context（**React 16.3** 起的 `createContext`）是 Provider 与 useContext（类组件用 Context.Consumer 或 contextType）。它用来把主题、当前用户、路由一类跨层数据交给任意深层消费者，而不必逐层传 props。官方仍建议：能用 props 说清楚就先用 props；Context 适合许多组件都要读的稳定数据，不是实验开关。旧的 childContextTypes / getChildContext 是遗留 API。createContext 出现后，中间祖先即使 shouldComponentUpdate 返回 false，消费者仍会在 Provider 的 value 变化时更新——资料里“不可靠、会被 SCU 挡掉”描述的是更早的旧 Context。不要把 Context 当成全局 Redux：value 用新对象字面量会导致所有消费者重渲染；高频输入仍应留在局部 state。Provider 边界与重渲染见既有 `context` 课。',
    why:'误以为 Context 仍是实验功能，中间组件一旦跳过更新就会丢掉。新项目会避开主题这类官方用法，或继续写已经退役的子上下文方法。区分信号是消费者跟的是 Provider 的 value，不跟中间组件是否跳过更新。',
    example:'const ThemeContext = createContext("light"); 根上 <ThemeContext.Provider value={theme}>，深层 const theme = useContext(ThemeContext)。不要写 getChildContext(){ return {color} }。',
    task:'对照 Passing Data Deeply with Context，划掉资料里“实验阶段、app 不要用”；再用一个 SCU 返回 false 的中间组件，确认 useContext 消费者仍能收到新 theme。',
    answer:'资料里实验阶段、应用里不要用这两句划掉。中间组件的 shouldComponentUpdate 返回 false 时，深层 useContext 仍能读到 Provider 上的新 theme。现行写法是 createContext、Provider 和 useContext。能用 props 说清楚的仍先用 props。',
    react:'architecture',
    deep:[
      {title:'消费者订阅的是提供方的值',body:'现行 Context 在 Provider 的 value 变化时通知 useContext。中间类组件即使跳过自己的更新，也挡不住这条通知。旧的 getChildContext 才会表现成资料里那种不可靠。能用 props 说清的数据不必放进 Context。'},
      {title:'怎样自己验证',body:'在中间放一个 shouldComponentUpdate 恒为 false 的类组件，改变 Provider 的 theme。深层 useContext 应仍显示新值。再把资料里的实验阶段和应用里不要用划掉，并确认没有 getChildContext。'},
    ],
    keywords:'React Context createContext useContext getChildContext shouldComponentUpdate',
    points:['createContext / useContext 是现行稳定 API','getChildContext 属于遗留 Context','中间 SCU 挡不住现行 Context 消费者更新'],
    refs:[['React：Passing Data Deeply with Context','https://react.dev/learn/passing-data-deeply-with-context'],['React：useContext','https://react.dev/reference/react/useContext']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_14) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
