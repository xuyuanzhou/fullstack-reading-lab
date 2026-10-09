# 把选型课的框架对照收成一张表

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 课 `fe-pick-by-surface` 的细节栏 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第一屏 HTML、Astro 路径、和 Nuxt/Next 的对比、混用、岛屿标签，在细节里各写了一节，同一句「整页表格用 Vue 或 React」出现多次。读者要在一栏里看完谁管整页。

## 决策

- 采用：核心模型下用职责对照表。行是内容页正文、Nuxt、Next、Astro、Svelte、Angular、登录后的表格、两种界面框架同页。细节收成五节：正文定义、Astro 这一页怎么交出去、表上的名字各留一个、混用停在 .astro、怎样自己验证。例子里的三段代码保留。课内链接仍放在「表上的名字各留一个」，因为表的单元格不解析课 id。
- 不采用 / 刻意不做：不删掉例子里的 `.astro`、`astro-island` 和 Vue/JSX 同页片段。不改四格目标端的图。不把满意度排名放进表。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 增加 `map`，重写 `deep`，去掉重复的六节 |
| `web/src/data/curriculum-bodies-frontend.json` | `export:curriculum` 导出 |

## 验证

```bash
node --check curriculum/coverage-frontend-20.js
cd web && npm run export:curriculum
```

- 结果：语法通过，导出 857 课。课页有「职责对照」八行。细节标题为「第一屏 HTML 里的正文」「Astro 这一页怎么交出去」「表上的名字各留一个」「混用停在 .astro」「怎样自己验证」。页面上不再出现「Astro 从页面到浏览器」。

## 后续

- [ ] 表的单元格保持短句；机制仍写在细节，不把 `astro-island` 属性塞回表里
- [ ] 排名过时只改「表上的名字各留一个」第二段

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-09-fe-pick-astro-compare.md`
2. 再读：`curriculum/coverage-frontend-20.js` 里 `fe-pick-by-surface` 的 `map` 和 `deep`
3. 若续作：新事实先进表或进对应的一节，不要再并列一节重复
4. 禁区：不要改主线关卡
