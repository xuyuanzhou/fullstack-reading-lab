# 补上 Astro 从页面到浏览器的整条路径

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 课 `fe-pick-by-surface` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

这一课已经分开写了第一屏 HTML、岛屿和 `astro-island` 的样子。读者还缺 Astro 从写页面到浏览器的整条顺序。

## 决策

- 采用：细节增加「Astro 从页面到浏览器」。顺序是：`src/pages` 的 `.astro`；`---` 在产出 HTML 的一侧运行；默认构建时预渲染；单页 `export const prerender = false` 且已装适配器时按请求渲染；`output: 'server'` 把默认改成按请求。模板里的正文进入第一屏。没有 `client:` 的组件只留 HTML。`client:load` 才打出脚本并包进 `astro-island`。浏览器先显示 HTML，再挂上 Search。再打开另一篇是再要一份 HTML。整页后台表格仍用 Vue 或 React。例子第一段改成带 `---` 的页面，第二段仍是填好的源码。依据加上 Why Astro 与按需渲染文档。
- 不采用 / 刻意不做：不新开 Astro 课。不写内容集合、视图过渡、适配器清单和其它 `client:*`。不删掉已有的「岛屿架构」小节。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 新增细节「Astro 从页面到浏览器」和两条依据 |
| `curriculum/example-code-blocks.js` | 例子先给出 `.astro` 的 `---`，再给出查看源代码 |
| `web/src/data/curriculum-*.json` | `export:curriculum` 导出 |

## 验证

```bash
cd web && npm run export:curriculum
```

- 结果：导出 857 课。课页细节标题为「第一屏 HTML 里的正文」「Astro 从页面到浏览器」「岛屿架构」「怎样自己验证」。例子第一段以 `---` 和 `const title` 开头。

## 后续

- [ ] 预渲染默认值以 https://docs.astro.build/en/guides/on-demand-rendering/ 为准
- [ ] 不要把内容集合或视图过渡补进这一课，除非读者单独问起

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-09-fe-pick-island-html.md`
2. 再读：`curriculum/coverage-frontend-20.js` 里 `fe-pick-by-surface` 的 `deep`
3. 若续作：整条路径留在「Astro 从页面到浏览器」，岛的标签细节留在例子和「岛屿架构」
4. 禁区：不要改主线关卡
