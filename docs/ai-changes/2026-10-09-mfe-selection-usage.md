# 微前端补选型矩阵与各方案具体用法（9 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 续 `2026-10-07-micro-frontends-chapter.md`；用户：先提交再补选型与具体使用 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

首批微前端 12 课已覆盖边界/集成/运行时/交付。需要补「怎么选」与「每个方案怎么落地」：Module Federation、Vite/Rspack Federation、single-spa、qiankun、无界、iframe，避免按热度排星。

## 决策

- 采用：在 `coverage-frontend-27.js` 增加 9 课；大纲在「边界」与「集成」之间插入「选型」「方案」两节；对照表与 qiankun 各一张 UTF-8 SVG。
- 不采用：不当成框架选美；不把五种方案写成互斥赢家；不叠第二种运行时容器当默认。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-27.js` | 9 课：三问、对照表、主路径、MF host、Vite Federation、single-spa、qiankun、无界、iframe |
| `curriculum/diagrams/mfe-compare.svg`、`mfe-qiankun.svg` + `web/public/diagrams/` | UTF-8 机制图 |
| `scripts/curriculum.mjs` | publishedSources + OUTLINE 选型/方案 |
| `legacy/index.html`、`scripts/verify_content.mjs` | 加载与断言 frontend-27 |
| `web/src/data/*` | export 生成 |
| `README.md`、`docs/audits/FRONTEND_MFE.md`、`docs/核对交接.md` | 课数与台账 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：715 课（前端 254 / Java 461），2152 知识点；outline 含选型、方案两节。

## 后续

- [x] 接入 outline / 导出 / README / 变更记录
- [ ] 勿把「公司都在用 X」写成选型结论
- [ ] 勿在同一产品默认叠两套运行时容器

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-frontend-27.js`、`scripts/curriculum.mjs` 中 `微前端` 段、`curriculum/diagrams/mfe-compare.svg`
3. 若续作：从「后续」未勾项开始；改课体后必须 export + verify，并更新 README 课数
4. 禁区：勿用非 UTF-8 写入 SVG；勿改私人原件路径
