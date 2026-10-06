# 前端资料核验记录：React 面试题.md（批次 12）

续核私人资料 `4-前端八股文-专题分类/6.5.React面试题.md`。本批处理生命周期里把 props 拷进 state、把 createClass 当现行写法，以及 Redux 手写 store 当默认。公开课程独立撰写。

| 原件位置 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| GDSFP 示例 / CWRP 专节 | 用 GDSFP 在 props 与 state 不等时写回；CWRP 里更新 state「安全且不多一次 render」，并可放数据请求 | **反模式 / 过时。** GDSFP 不是常规同步器，该示例会覆盖本地 setState。CWRP 已 `UNSAFE_`，不适合当请求入口。 | `react-gdsfp-copy` |
| 声明组件三种方式 | 函数组件、createClass、extends Component 并列 | **过时。** createClass 已不在 react 核心包；函数组件默认且可用 Hooks 持有状态。 | `react-createclass-gone` |
| Redux 原理与异步 | createStore + applyMiddleware(thunk) / 手写 switch 当标准 | **过时入口。** 核心模型仍成立；新代码默认 Redux Toolkit 的 configureStore / createSlice。 | `redux-rtk-today` |

## 官方依据

- [React：getDerivedStateFromProps](https://react.dev/reference/react/Component#static-getderivedstatefromprops)
- [React：You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React：UNSAFE_componentWillReceiveProps](https://react.dev/reference/react/Component#unsafe_componentwillreceiveprops)
- [Redux：Why RTK is Redux Today](https://redux.js.org/introduction/why-rtk-is-redux-today)

本记录不是整份 Markdown 的全文验收。Redux 单向数据流、单一 store 等方向可接受，不另开课。
