# 前端资料核验记录：React 面试题.md（批次 09）

本批开始处理私人资料 `4-前端八股文-专题分类/6.5.React面试题.md`。该文件条目多，本批只核验知识准确性审查中已点名、且仍高风险的三处说法；其余标题进入 [核对队列](../核对队列.md) 的 React 段，状态为待核验。公开课程独立撰写。基线：React 19.3.0 源码与 react.dev。

| 原件位置 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| 事件机制开篇 | 事件统一绑在 `document`；不想冒泡应 `preventDefault`，`stopPropagation` 无效 | **错误/过时。** React 17+ 委托到根容器；`createRoot` 在根上监听。`stopPropagation` 停止传播，`preventDefault` 阻止默认行为，二者不可互换。 | `react-event-root` |
| setState 同步/异步 | 用 `isBatchingUpdates` 解释；生命周期与合成事件异步，原生/`setTimeout` 同步 | **旧实现语境。** React 18+ 默认更多批处理；应用层应按“更新入队、渲染快照、批处理”理解，不能把 `isBatchingUpdates` 当现代 Hooks 标准答案。 | `react-setstate-batch` |
| Effect 时序（`useEffect` 与 `useLayoutEffect` 专节） | `useEffect` 总在像素变化之后，且总晚于 `useLayoutEffect`；两者底层完全一致可直接替换 | **绝对化。** 常见客户端路径上 layout 在绘制前、effect 在绘制后；SSR、重计算与官方“先试 useEffect”建议使“总是/可直接替换”不成立。 | `react-effect-timing` |

## 官方依据

- [React：Responding to Events](https://react.dev/learn/responding-to-events)
- [React 19.3.0：DOMPluginEventSystem](https://github.com/facebook/react/blob/v19.3.0/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js)
- [React：State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React：Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React：useEffect](https://react.dev/reference/react/useEffect)
- [React：useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)

本记录不是整份 Markdown 的全文验收。
