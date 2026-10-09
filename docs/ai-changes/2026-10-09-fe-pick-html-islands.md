# 把第一屏 HTML 和岛屿架构写进选型课

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 课 `fe-pick-by-surface`；读者读到「第一屏 HTML」「岛屿架构」时课里没有展开 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`fe-pick-by-surface` 要求写下第一屏 HTML 里要不要有正文，并用 Astro 把静态 HTML 和少量可交互组件分开。课里没有说明第一屏 HTML、正文、岛屿各指什么。

## 决策

- 采用：在核心模型里定义第一屏 HTML（查看网页源代码、脚本请求数据之前）和正文（段落、标题、价格）。细节新增「第一屏 HTML 里的正文」「岛屿架构」，用帮助中心《如何退款》说明：正文已在 HTML 里，搜索框和「这篇文章有用吗」标 `client:load` 才是岛。整页表格和表单写成 Vue 或 React 应用。例子改成同一段 HTML。图上文章格改为「少量组件才跑脚本」。
- 不采用 / 刻意不做：不新开一课。不改其它选型课。不把 `client:idle`、`client:visible` 和服务端岛写进这一课。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | `fe-pick-by-surface` 的 core、points、deep |
| `curriculum/example-code-blocks.js` | 该课例子换成退款文章 HTML 与 `client:load` |
| `curriculum/diagrams/fe-pick-surface.svg` | 文章格第二行 |
| `docs/audits/FRONTEND_SELECTION.md` | 该课说法补上两个定义 |
| `web/src/data/curriculum-*.json`、`web/public/diagrams/fe-pick-surface.svg` | `export:curriculum` 导出 |

## 验证

```bash
cd web && npm run export:curriculum
```

- 结果：导出 843 课。打开 `http://127.0.0.1:5192/#/frontend/selection/fe-pick-by-surface`，细节三节为「第一屏 HTML 里的正文」「岛屿架构」「怎样自己验证」，例子代码块含 `<h1>如何退款</h1>` 与 `<Search client:load />`。

## 后续

- [ ] 不要把岛屿讲成「每个按钮一座岛」
- [ ] `client:load` 以 Astro 岛屿文档为准；这一课不展开其它 client 指令

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-frontend-20.js` 里 `fe-pick-by-surface` 的 `deep`
3. 若续作：解释留在这一课的细节，不要再抽成独立术语课
4. 禁区：不要改主线关卡、不要把例子代码块改回占位注释
