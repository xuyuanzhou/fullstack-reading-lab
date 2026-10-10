# 技术选型审查：句子对上文档，该有代码的地方补代码

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 用户：重新审查选型课，要可读、正确，不要文不对题，该补代码要补 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照课仍用「槽位 / 更新模型 / 招聘面 / 星数」。图上的字和正文不一致。例子多是口号，没有可对照的代码。

## 决策

- 采用：决策顺序写成「谁打开 / 界面库 / 路由和数据」。框架课只写官方文档里的脚手架和包。元框架课改成「查看网页源代码里有没有标题」，并给出空 div 与 `<h1>` 的对照。列表课给出 useQuery 与 useAsyncData 的代码，写明不要再抄进 Redux 或 Pinia。图上的招聘、槽位字样换成与正文相同的话。Angular 例子补上 provideRouter 和 HttpClient。
- 不采用：不把招聘人数、星数、满意度写成选型依据。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 决策顺序、界面库四行、Angular 例子；三课标题改成「Vite / 各留一个库 / 列表只放一处」 |
| `curriculum/coverage-frontend-46.js` | 三课正文与代码 |
| `curriculum/example-code-blocks.js` | `fe-pick-decision-order` 的例子与正文一致 |
| `curriculum/diagrams/fe-*.svg` | 四张图与正文对齐 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

## 后续

- [x] 旧课标题里的「槽位」「缓存主人」已改成「各留一个库」「列表只放一处」。见 `2026-10-10-no-coined-terms.md`。
- [ ] 不要把招聘或星数写回图或正文

## 给下一模型

1. 事实只引用 react.dev 创建应用、Vue 快速上手、Angular Zoneless、SvelteKit、Astro 岛屿。
2. 例子里要有围栏代码；围栏外不要用页面不会渲染的 Markdown 链接。
3. 改图必须用 UTF-8 重写，并复制到 `web/public/diagrams/`。
