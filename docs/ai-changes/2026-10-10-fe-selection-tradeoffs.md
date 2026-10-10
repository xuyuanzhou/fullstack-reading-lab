# 技术选型补「怎么选 / 优缺点 / 生态槽位」

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 用户：选型章缺少怎么选、优缺点、生态怎么选 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

「技术选型」原课偏「一格一个库 / 官方槽位」，能防混装，但缺少决策顺序与适合/代价对照，读者仍不知道为何选 A 不选 B。

## 决策

- 采用：`fe-pick-decision-order` 落在 `coverage-frontend-20.js`；对照三课落在 `coverage-frontend-46.js`（44/45 已被 W3CSchool 占用）。OUTLINE 增加「怎么选」「对照」；跨端课补适合/代价 map。
- 不采用：不删旧「一槽位」课；不做星数排行榜；不覆盖 frontend-44/45。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 决策顺序课 + 回链；更新模型/跨端 map |
| `curriculum/coverage-frontend-46.js` | 框架优缺点、元框架、生态槽位三课 |
| `curriculum/coverage-frontend-25.js` | 生态课回链对照 |
| `curriculum/diagrams/fe-*-tradeoffs.svg` 等 | 图（同步 `web/public/diagrams/`） |
| `scripts/curriculum.mjs` / `verify_content.mjs` | 发布源、OUTLINE、断言 |
| `docs/audits/FRONTEND_SELECTION.md` | 台账 |

## 验证

```bash
node --check curriculum/coverage-frontend-46.js
cd web && npm run export:curriculum
node ../scripts/verify_content.mjs
```

- 结果：899 课 / 2704 知识点（前端 301 / Java 598）；校验通过。

## 后续

- [ ] 可选：为对照课补 example 代码块试点
- [ ] 下一空闲号先 ls：`coverage-frontend-47.js`

## 给下一模型

1. 先读：本文 + `docs/audits/FRONTEND_SELECTION.md`
2. 再读：`curriculum/coverage-frontend-46.js`、`fe-pick-decision-order`（在 20）
3. 若续作：机制仍写在 React/Vue 章；选型章只加对照与决策
4. 禁区：不要用满意度排名当选型依据；勿覆盖 frontend-44/45
