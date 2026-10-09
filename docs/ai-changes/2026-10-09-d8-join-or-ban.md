# D8 续抽：开发规范 JOIN/OR 绝对禁令（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-lru-base.md` 候选 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 105 页规范写死禁止 JOIN（因临时表）、禁止 OR 必须改 IN。需拆成可核验说法。

## 决策

- 采用：`coverage-java-61.js` 两课，挂在数据库「表」目录、JOIN 课旁。
- 不采用：不重做 FLOAT/DECIMAL 金额课；同页「禁止小数存货币」仅在 OR 课 deep 点名。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-61.js` | 2 课 |
| 图与 `scripts/curriculum.mjs`、`legacy/index.html`、`verify_content.mjs` | 接入 |
| 审计 / 队列 / 校订 / 交接 / README | 台账 D28–D29 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：758 课（前端 269 / Java 489），2281 知识点。

## 后续

- [x] JOIN / OR 禁令开课
- [ ] D8 其余页继续主题抽查（候选：禁止小数存货币若需单开；禁止视图/触发器绝对化）
- [ ] 下一空闲号先 ls：`coverage-java-62.js` / `coverage-frontend-32.js`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-61.js`、`mysql-inner-join-match`
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56
4. 禁区：勿上传库原文；勿全文盖章 206 页
