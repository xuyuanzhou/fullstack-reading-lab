# 前端资料核验记录：React 面试题.md（批次 11）

续核私人资料 `4-前端八股文-专题分类/6.5.React面试题.md`。本批处理 React Router 旧 API 示例，以及「最新 React = 16.x 清单」叙事。公开课程独立撰写。

| 原件位置 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| React-Router 配置专节 | `Switch` + `component={}`、`Redirect`、`activeClassName` 当默认写法 | **版本过时。** 现行声明式以 `Routes` / `element`、`Navigate`、函数式 `NavLink` className 为主。 | `react-router-element-api` |
| 「最新版本」专节 | Time Slicing / Suspense / Hooks 再加 `useMutationEffect` 等作最新答卷 | **过时清单。** 应绑定现行主版本：`createRoot`、Hooks 默认、Suspense 边界准确；实验钩子名勿背。 | `react-version-checklist` |

## 官方依据

- [React Router：Routing](https://reactrouter.com/start/library/routing)
- [React Router：NavLink](https://reactrouter.com/api/components/NavLink)
- [React：createRoot](https://react.dev/reference/react-dom/client/createRoot)
- [React：Suspense](https://react.dev/reference/react/Suspense)

本记录不是整份 Markdown 的全文验收。Redux 概要段方向大体可接受，未在本批单开；数据路由见既有 `react-router-loader`。
