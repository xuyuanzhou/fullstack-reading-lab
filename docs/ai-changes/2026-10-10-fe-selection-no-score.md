# 选型去掉打分公式，改成仓库、运行时、该库自己的服务端方案

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 用户：业界是不是都这样选；考量和计算写得不对 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

决策课把「谁打开 → 选一个界面库 → 配官方包」写成固定算法，又把「标题要进 HTML」当成能算出 Next / Nuxt / Astro 的查表。这和官方文档、公开问卷的用法都不一致。

## 决策

- 采用：已有仓库继续用原来的界面库。小程序和 App 只换运行时。正文要进源代码时，用这个库自己的方案（Vue→Nuxt 或 VitePress，React→Next 或 React Router 框架模式，Svelte→SvelteKit，Angular 默认浏览器渲染、要 HTML 时 `ng add @angular/ssr`）。交互很少的内容站才单独立 Astro。改数字的那一行移出「怎么选」。
- 不采用：不把 Stack Overflow 或 State of JavaScript 的使用率、满意度乘进公式。问卷只在深读里说明「不能当系数」。不写具体百分比。

## 核对

- Vue《Ways of Using Vue》：没有一种用法适用所有网站；SPA、SSR、SSG（含 VitePress、Astro 岛屿）是不同用法。https://vuejs.org/guide/extras/ways-of-using-vue.html
- React《Creating a React App》：新项目用框架；列出 Next.js 与 React Router 框架模式。https://react.dev/learn/creating-a-react-app
- Angular《Server-side and hybrid-rendering》：应用默认在浏览器渲染；`ng add @angular/ssr`，路由用 `RenderMode`。https://angular.dev/guide/ssr
- Astro《Why Astro》：把自己定位成内容站，并和 Next / Nuxt / SvelteKit 的整页应用分开说。https://docs.astro.build/en/concepts/why-astro/
- Stack Overflow 2025 方法说明：约 4.9 万份答卷，主要从站内渠道招募，问的是用过什么。https://survey.stackoverflow.co/2025/methodology/

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 决策课与打开方式课 |
| `curriculum/coverage-frontend-46.js` | 官方包、源代码两课改成「选定之后」 |
| `scripts/curriculum.mjs` | `fe-ui-update-model` 从「怎么选」挪到「对照」 |
| `curriculum/diagrams/fe-pick-decision-order.svg` | 四条事实，无分数 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

## 后续

- [ ] 不要把使用率百分比写回决策课
- [ ] 空仓库「能不能招到人」只写「看本地职位」，不要填一份全球数字

## 给下一模型

1. 选型顺序是：仓库和团队 → 运行时 → 该库的服务端方案 → 只装一套包。
2. `fe-ui-update-model` 是写法对照，不是打分项。
3. 改图用 UTF-8，并复制到 `web/public/diagrams/`。
