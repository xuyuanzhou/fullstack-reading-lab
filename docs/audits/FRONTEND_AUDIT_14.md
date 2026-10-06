# 前端资料核验记录：React 面试题.md（批次 14）

续核私人资料 `4-前端八股文-专题分类/6.5.React面试题.md`。本批处理「Context 仍是实验、app 不要用」以及遗留 `getChildContext` / SCU 挡更新。其余通信方式、Intl、JSX 非强制等为题干级抽查，不单开课。公开课程独立撰写。

| 原件位置 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| Context 专节 / 为何不优先 | 仍处实验阶段，app 中不建议用；靠 getChildContext 组合；中间 SCU 返回 false 则更新不可靠 | **过时。** `createContext` 稳定；官方用于主题、当前用户等跨层数据。先 props 后 Context 是设计建议，不是实验警告。现行消费者不受中间 SCU 挡掉。 | `react-context-stable`；边界见既有 `context` |
| 父子/跨级通信 | props、回调、Context | **方向可接受。** 子向父用回调；跨层优先评估 props 提升或 Context。示例里 `onClick={cb("你好!")}` 会立刻调用，属示例笔误，不单开。 | 题干级 |
| React-Intl | FormatJS / 语言包切换 | **方向可接受。** 包名与推荐入口随 FormatJS 演进，不升格为课。 | 题干级 |
| JSX 是否必须 | 可用 createElement | **可接受。** JSX 是语法糖，非运行时强制。 | 题干级 |

## 官方依据

- [React：Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React：useContext](https://react.dev/reference/react/useContext)

高风险说法队列至此抽查完毕。本记录仍不是整份 Markdown 的逐条全文验收。
