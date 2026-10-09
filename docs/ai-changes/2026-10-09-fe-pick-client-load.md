# 写明 client:load 怎么把岛的脚本挂上

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 课 `fe-pick-by-surface` 例子里的 `<Search client:load />` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

例子里出现 `<Search client:load />`，课里只说「会再下载脚本」，没有写这行是谁执行、页面加载时发生什么。

## 决策

- 采用：按 Astro 模板指令文档说明。`client:load` 写在 `.astro` 里，交给编译器，优先级为页面一加载就取该组件的脚本。服务端先把 Search 画成 HTML。脚本随后挂到这个已经画好的框上。查看网页源代码看不到 `client:load` 这两个字。没有 `client:` 指令的组件只留 HTML。依据页加上 client 指令文档。
- 不采用 / 刻意不做：不展开 `client:idle`、`client:visible`、`client:only` 和服务端岛。不把 `<astro-island>` 的内部属性写进课文。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 岛屿一节补加载顺序；自查与依据链接 |
| `curriculum/example-code-blocks.js` | 例子前后说明改成编译器指令与页面加载 |
| `web/src/data/curriculum-*.json` | `export:curriculum` 导出 |

## 验证

```bash
cd web && npm run export:curriculum
```

- 结果：导出 849 课。`http://127.0.0.1:5192/#/frontend/selection/fe-pick-by-surface` 的细节含「client:load 是交给 Astro 编译器的指令」，例子代码块仍是退款文章加 `<Search client:load />`。

## 后续

- [ ] 其它 `client:*` 仍不写进这一课
- [ ] 指令语义以 https://docs.astro.build/en/reference/directives-reference/#clientload 为准

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-09-fe-pick-html-islands.md`
2. 再读：`curriculum/coverage-frontend-20.js` 里 `fe-pick-by-surface` 的「岛屿架构」
3. 若续作：只在读者追问某条指令时再补那一条，不要把指令表整页搬进课文
4. 禁区：不要改主线关卡
