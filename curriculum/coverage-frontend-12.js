/* Batch 12: React.md GDSFP/CWRP copy-state, createClass as current, Redux createStore as default. */
const COVERAGE_FRONTEND_12 = [
  {
    track:'frontend', group:'React', id:'react-gdsfp-copy',
    title:'getDerivedStateFromProps 不是把 props 再存一份的默认通道（React 16.3）',
    prompt:'为什么用 getDerivedStateFromProps 把 props 写回 state，或把请求放进 componentWillReceiveProps，不能当现行默认？',
    promptAnswer:'派生时会把本地更新打回 props。请求也不该放进已标 UNSAFE 的接收 props 方法；渲染期用 props 或用 key 重置。',
    core:'`getDerivedStateFromProps`（**React 16.3** 起）会在挂载和后续更新（含 setState、forceUpdate）里、render 之前调用，返回对象合并进 state 或返回 null。它是少数“状态必须随 props 身份变化而重置”的逃生口，不是把传入值再拷一份的常规管道。资料示例一旦 props 与本地 state 不等就写回 counter，会把用户刚 setState 加上的值立刻打回 props，形成双重真相。官方更稳的路径：能派生就渲染期计算；要整块重置就给组件换 key。componentWillReceiveProps 已标 UNSAFE，还会在一次更新里被打断后再次进入；把数据请求放在这里既过时也不安全。需要副作用用 componentDidMount / componentDidUpdate 或函数组件的 useEffect，并区分“外部系统”与“把 props 灌进 state”。',
    why:'误以为这个生命周期就是把 props 再存进 state 的作业。点击自增后，不等的值会被写回父组件传入的计数，像随机重置。区分信号是它在渲染前合并返回值，用户刚改的本地状态会被盖掉。',
    example:'父传入 userId。子组件用 key={userId} 重置还没提交的输入；或直接渲染 props.user。不要 GDSFP 里 if (props.counter !== state.counter) return {counter: props.counter}，那会吃掉点击自增。',
    task:'按资料示例点一次自增，看 state 是否被 props 打回；再改成渲染期派生或 key 重置，确认本地更新能留下。',
    answer:'按资料点一次自增，本地计数先加一，随即在派生时被 props 里的 counter 打回，界面停在父传入值。改成渲染期直接用 props，或用 key 换身份之后，本地更新能留下。请求不要放进已标 UNSAFE 的接收 props 方法。componentWillReceiveProps 已标 UNSAFE，不要把请求放进去。',
    react:'lifecycle',
    deep:[
      {title:'返回的对象会盖住刚写入的状态',body:'这个静态方法在挂载和后续更新里、render 之前运行，返回的对象并进 state。只要判断成和 props 不等就返回父级计数，用户刚 setState 的增量会在绘制前被抹掉。能算出来的值不必存，整块重置用 key。'},
      {title:'怎样自己验证',body:'按资料在不等时写回 counter，点一次自增，看界面是否回到 props 的值。再改成直接渲染 props 或给组件换 key，确认这次本地更新能留下，不再被下一次派生打回。'},
    ],
    keywords:'getDerivedStateFromProps componentWillReceiveProps UNSAFE 派生状态 key',
    points:['GDSFP 在 render 前调用，不是常规的 props→state 管道','示例里按不等就写回会覆盖本地 setState','CWRP 已标 UNSAFE，不适合当请求生命周期'],
    refs:[['React：getDerivedStateFromProps','https://react.dev/reference/react/Component#static-getderivedstatefromprops'],['React：You Might Not Need an Effect','https://react.dev/learn/you-might-not-need-an-effect'],['React：UNSAFE_componentWillReceiveProps','https://react.dev/reference/react/Component#unsafe_componentwillreceiveprops']]
  },
  {
    track:'frontend', group:'React', id:'react-createclass-gone',
    title:'React.createClass 不是现行三种声明方式之一',
    prompt:'为什么把“函数组件、createClass、extends Component”并列为今天声明组件的三种方式会过时？',
    promptAnswer:'createClass 已移出核心包。今天默认是函数组件加 Hooks；类组件是仍支持的遗留写法。',
    core:'现行默认是函数组件加 Hooks。类组件仍可用，但官方建议新代码用函数组件。React.createClass 早年已从 react 包移除，只存在于独立的 create-react-class；新项目清单里不应再把它和函数组件、class 并列成“三种主流写法”。资料里“无状态函数组件不能用生命周期、不能有 state”也过时：Hooks 让函数组件持有状态与副作用。createClass 的自动绑定 this、getInitialState、mixins 属于历史包袱，面试若提到，应说明它已不在 React 19 的导出里。',
    why:'误以为今天仍有函数、createClass 和类这三种并列写法。新文件会去导入核心包里不存在的工厂，也会把函数组件当成不能有状态。区分信号是新代码用函数组件和 Hooks，类组件只算仍可编译的遗留。',
    example:'新文件写 function Hello({name}){ const [n,setN]=useState(0); return <p>{name}{n}</p>; }。遗留类组件 extends Component。不要写 React.createClass({ getInitialState(){...} })。',
    task:'在 React 19 的类型定义或文档导出里确认没有 createClass；把资料“三种方式”改成“函数组件默认，类组件遗留，createClass 已移出核心包”。',
    answer:'现行 react 的导出和文档里没有 createClass。三种方式应改成：函数组件加 Hooks 是默认，类组件是仍支持的遗留，createClass 已移出核心包。函数组件可以用 useState，不再等于无状态展示组件。新项目的清单里不要再把它和另外两种写法并列。',
    react:'components',
    deep:[
      {title:'函数组件早已能保存状态',body:'早期函数组件没有实例，也没有状态和生命周期。Hooks 让函数组件在顶层持有状态和副作用。createClass 的自动绑定、getInitialState 和 mixins 留在独立包里，不再从 react 导出。'},
      {title:'怎样自己验证',body:'在现行文档或类型导出里搜索 createClass，确认核心包没有这个名字。再写一个带 useState 的函数组件代替资料里的 getInitialState，状态应能随点击变化。'},
    ],
    keywords:'React.createClass 函数组件 Hooks 类组件 create-react-class',
    points:['新代码默认函数组件加 Hooks','createClass 已移出 react 核心包','函数组件不再等于无状态展示组件'],
    refs:[['React：Your First Component','https://react.dev/learn/your-first-component'],['React：Component','https://react.dev/reference/react/Component']]
  },
  {
    track:'frontend', group:'React 生态', id:'redux-rtk-today',
    title:'今天写 Redux 默认走 Toolkit，不是手写 createStore',
    prompt:'为什么把 createStore + 手写 switch reducer + 自行 applyMiddleware(thunk) 当作现行标准答案不够？',
    promptAnswer:'今天写 Redux 用 Toolkit：configureStore 和 createSlice。手写 createStore、switch 和自行拼 thunk 不是现行默认。',
    core:'Redux 还是那三件事：一个 store、dispatch 一个普通对象、reducer 做不可变更新。\n\n新代码请用 Redux Toolkit。configureStore 一次配好合并 reducer、thunk、DevTools。createSlice 生成 action 和 reducer。\n\ncreateStore 还能跑，但官方已经把它当成过时入口。副作用优先用 Toolkit 自带的 thunk，或按需用 RTK Query，不要先手搭中间件再抄一份 axios thunk。',
    why:'误以为现行标准仍是手写 createStore，再自己接上 thunk。答案会停在旧的样板文件，开发态的防突变检查也接不上。区分信号是新代码用 configureStore 和 createSlice，直接改状态会被检查抓住。',
    example:'export const store = configureStore({ reducer: { todos: todosReducer } }); createSlice 里写 todoToggled(state, action){ const t=state.find(...); t.completed=!t.completed }。不要先 createStore(reducer, compose(applyMiddleware(thunk)))。',
    task:'把资料中的 createStore+thunk 示例改写成 configureStore + createSlice，并对照官方 “Why RTK is Redux today” 划掉“必须手写 action type 常量”。',
    answer:'示例改成 configureStore 配上 todos 的 reducer，切换动作放进 createSlice，不必手写 action type 常量。官方说明把 Toolkit 当作今天写 Redux 的方式。createStore 再自己套中间件仍能跑，但不是现行默认入口。',
    deep:[
      {title:'默认配置收走了样板',body:'configureStore 合并 reducer，并带上 thunk、开发工具和开发态的防突变检查。createSlice 用可突变的写法描述不可变更新，并生成 action。核心仍是单一 store、纯 action 和纯 reducer，变的是入口。'},
      {title:'怎样自己验证',body:'把资料中的 createStore 加 thunk 改成 configureStore 和 createSlice，切换一项待办应仍能更新。再对照官方为何今天用 Toolkit 的说明，划掉必须手写 action type 常量的句子。'},
    ],
    keywords:'Redux Toolkit configureStore createSlice createStore redux-thunk',
    points:['官方推荐新代码用 Redux Toolkit','configureStore 默认带 thunk 与 DevTools','createStore 手写样板视为过时入口'],
    refs:[['Redux：Why RTK is Redux Today','https://redux.js.org/introduction/why-rtk-is-redux-today'],['Redux：configureStore','https://redux-toolkit.js.org/api/configureStore']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_12) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
