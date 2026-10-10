# React、Vue 章先说明它们是什么

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 定义课已写到函数组件和单文件组件，章首仍没有「这是什么」 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

React 章从函数组件进入，Vue 章从单文件组件进入。读完不知道 React 是渲染用户界面的库、Vue 是构建用户界面的框架，也不知道路由和取数在旁边的包里。

## 决策

- 采用：两章最前加「是什么」，各 3 课，不写「为什么」。React：库与组件、createRoot、新应用从框架开始（Next.js、React Router、Expo）。Vue：框架与声明式渲染 / 响应式、createApp().mount、Vue Router / Pinia / Nuxt。用官方文档里的 library、framework、component、JSX、declarative rendering、reactivity，中文先解释。
- 不采用 / 刻意不做：不改原有组件课正文。不把技术选型那章的对照搬进这里。不给 Angular、Svelte 再开章。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-55.js` | 6 课 |
| `scripts/curriculum.mjs` | 发布清单、目录、PATH_LEAD、since |
| `legacy/index.html` | 按同样顺序加载 |
| `README.md`、`docs/核对交接.md` | 964 课 / 2900 知识点；下一前端文件 56 |
| `web/src/data/curriculum*.json`、`legacy/publication-order.js` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：964 lessons / 2900 knowledge points；导出与发布清单一致。引用 URL 均为 HTTP 200。

## 后续

- [ ] 下一空闲文件是 `coverage-frontend-56.js`。
- [ ] 不要把这 6 课收成对照表，也不要改回从函数组件开头。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-frontend-55.js`、`scripts/curriculum.mjs` 里 React / Vue 的 OUTLINE
3. 若续作：React 章第一组标题是「是什么」，课号 `react-what-it-is`、`react-dom-mount`、`react-app-around-library`。Vue 是 `vue-what-it-is`、`vue-create-app-mount`、`vue-app-around-core`。
4. 禁区：不要把 React 或 Vue 写成「更新模型」。React 用文档里的库，Vue 用文档里的框架。
