# 写明 Astro 与 Nuxt、Next 的分工，以及岛上混用的边界

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 课 `fe-pick-by-surface` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

读者要知道 Astro 和 Nuxt、Next 各管什么，以及同一个页面能不能混用 React、Vue 等界面框架。

## 决策

- 采用：细节增加「和 Nuxt、Next 各管什么」「同一个 .astro 里可以放多种界面框架」。Nuxt 的页面是 Vue，Next 的页面是 React，Astro 的页面是 HTML、交互在岛上。Svelte 指向 SvelteKit，Angular 指向自己的包。State of JavaScript 2025 只作一句排名：使用人数 Next.js 最多，满意度 Astro 最高；选型仍按谁管整页留一个。混用按 Astro 框架组件文档：同一个 `.astro` 可以同时放官方集成里的 React、Preact、Vue、Svelte、Solid、Alpine。同一框架多座岛只下一份运行时，两种框架就下两份。只有 `.astro` 能同时包含它们。`.vue` 不能 import `.jsx`，`.jsx` 不能 import `.astro`，`.astro` 不能写 `client:`。新岛只留一种更新模型，见 `fe-ui-update-model`；旧组件标「旧组件保留」。例子末尾加 Vue 与 JSX 同页的片段。
- 不采用 / 刻意不做：不把小程序或 React Native 算进 Astro 的混用。不展开每条 `client:*`。不按下载量改这一课的推荐顺序。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 两节细节、要点、自查、依据 |
| `curriculum/example-code-blocks.js` | 例子增加同页 `Search.vue` 与 `Vote.jsx` |
| `web/src/data/curriculum-*.json` | `export:curriculum` 导出 |

## 验证

```bash
cd web && node --check ../curriculum/coverage-frontend-20.js && npm run export:curriculum
```

- 结果：导出 857 课。课页细节含「和 Nuxt、Next 各管什么」「同一个 .astro 里可以放多种界面框架」，文中课名链到 Vue、React、服务端组件、SvelteKit、Angular、界面更新模型。例子含 `Vote.jsx`。

## 后续

- [ ] 混用规则以 https://docs.astro.build/en/guides/framework-components/#mixing-frameworks 为准
- [ ] 满意度排名过时后，改「和 Nuxt、Next 各管什么」第一段，不要改谁管整页

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-09-fe-pick-astro-flow.md`
2. 再读：`curriculum/coverage-frontend-20.js` 里这两个新 `deep` 标题
3. 若续作：新岛仍只留一种更新模型；混用只说明官方允许的文件边界
4. 禁区：不要改主线关卡，不要把四种目标端收成一个 Astro 工程
