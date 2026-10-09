# 导图续抽：定时器、webpack eval map、Redis 代理/SAVE（4 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 续微前端提交后工作区未接入的导图课；曾误覆盖 `coverage-frontend-27.js` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

工作区已有 `coverage-java-50.js` 与四张 SVG，以及把导图课写进 `coverage-frontend-27.js` 的半成品。该文件号已用于微前端选型/方案 9 课，不能覆盖。需要恢复微前端正文，并把导图课另开文件号接入。

## 决策

- 采用：恢复 `coverage-frontend-27.js`（微前端）；新建 `coverage-frontend-28.js`（定时器 + webpack eval map）；接入已有 `coverage-java-50.js`（代理取模 ≠ Cluster、SAVE vs BGSAVE）。
- 不采用：不把导图课塞进 frontend-27；原图不进站点。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-27.js` | 从 HEAD 恢复微前端 9 课 |
| `curriculum/coverage-frontend-28.js` | 新增 2 课 |
| `curriculum/coverage-java-50.js` | 接入公开清单 |
| `curriculum/diagrams/*` + `web/public/diagrams/` | 四张 UTF-8 图 |
| `scripts/curriculum.mjs` | publishedSources + OUTLINE 四个 id |
| `legacy/index.html`、`scripts/verify_content.mjs` | 加载与断言 |
| `docs/audits/FRONTEND_AUDIT_28.md`、`JAVA_AUDIT_50.md`、`核对交接.md` | 台账 |
| `README.md`、`web/src/data/*` | 课数与导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：719 课（前端 256 / Java 463），2164 知识点。

## 后续

- [x] 恢复微前端 frontend-27，导图改 frontend-28
- [ ] 下一刀导图续抽勿复用已占用的 coverage 文件号
- [ ] 勿把 Twemproxy 画成现行默认 Cluster

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-frontend-28.js`、`coverage-java-50.js`、`scripts/curriculum.mjs` 中对应 OUTLINE
3. 若续作：新导图课用下一个空文件号；改课体后 export + verify 并更新 README
4. 禁区：勿覆盖 `coverage-frontend-26/27` 微前端正文；勿非 UTF-8 写 SVG
