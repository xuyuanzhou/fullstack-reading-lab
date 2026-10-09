# D8 续抽：NOT NULL 默认值与 TEXT 禁令（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-money-mvcc.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 104 页规范要求一律 NOT NULL+默认值，并禁止 TEXT/BLOB。需拆成可核验说法。

## 决策

- 采用：落在 `coverage-java-66.js`（`coverage-java-65.js` 已被并行占用：窗口函数 + Redis GEO）；挂在数据库「表」目录。
- 不采用：不覆盖 java-65；不以类型禁令代替查询投影纪律。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-66.js` | D8 两课 |
| `scripts/curriculum.mjs` | 接入 java-66；并为 java-65 的窗口/GEO 补 OUTLINE |
| 图 / legacy / verify / 审计 / 队列 / 校订 / 交接 / README | 台账 D32–D33 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：见交接头数字（导出后填写）。

## 后续

- [x] NOT NULL / TEXT 禁令开课
- [ ] D8 其余页继续主题抽查（候选：禁止 ENUM；微服务 vs SOA）
- [ ] 下一空闲号先 ls：`coverage-java-67.js` / `coverage-frontend-34.js`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-66.js`、`mysql-null-comparison`、`mysql-select-star`
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56～65
4. 禁区：勿上传库原文；勿全文盖章 206 页
