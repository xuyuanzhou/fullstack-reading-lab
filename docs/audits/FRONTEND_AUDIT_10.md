# 前端资料核验记录：React 面试题.md（批次 10）

续核私人资料 `4-前端八股文-专题分类/6.5.React面试题.md`。本批取 Fiber、虚拟 DOM 性能叙事，以及 Hooks「props 拷进 state」三处高风险说法。公开课程独立撰写。基线：react.dev 与 React 19.3.0。

| 原件位置 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| Fiber 专节 | Fiber 即协程/纤程；可让出 CPU，并附带让浏览器 JIT、修正 reflow | **过度叙事。** 可中断协调与优先级调度成立；不宜背成 OS 协程，也不把 JIT/reflow 写成 Fiber 合同能力。 | `react-fiber-interrupt` |
| 虚拟 DOM 专节前半 | 用事务/diff「有效减少渲染」从而推高为一定更快 | **绝对化。** 同文后半已承认小改动与首次大量插入时未必更快；应以“保下限 / 声明式”为准。 | `react-vdom-perf-bound` |
| Hooks 注意点（3） | `useState(props)` 只第一次生效，后期必须 `useEffect` 同步 | **错误默认。** 可派生则渲染期计算；重置用 key；Effect 同步 props→state 常制造双重真相。同段称 class 里 mutate+setState「没问题」也不可靠。 | `react-props-state-sync` |

## 官方依据

- [React：Render and Commit](https://react.dev/learn/render-and-commit)
- [React：You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React：Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React 19.3.0：ReactFiberWorkLoop](https://github.com/facebook/react/blob/v19.3.0/packages/react-reconciler/src/ReactFiberWorkLoop.js)

本记录不是整份 Markdown 的全文验收。key / PureComponent / 生命周期废弃原因等条目方向大体可接受或已有公开课（如 `identity`、`react-memo-when`），不在本批单开。
