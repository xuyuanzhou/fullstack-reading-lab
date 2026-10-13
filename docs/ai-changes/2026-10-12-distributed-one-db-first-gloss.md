# 同库不变量课：术语点击释义与答案分条

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `distributed-one-db-first`；接续 `2026-10-11-distributed-one-db-first-review.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查结论主体正确；需补 Seata / Outbox / XID / 不变量点击释义，答案空行分条，并可选加 MonolithFirst 引用。

## 决策

- 采用：`〔不变量｜…〕`、`〔Seata｜…〕`、`〔XID｜…〕`、`〔Outbox｜…〕`；答案 `.join` 空行；refs 加 Fowler MonolithFirst。
- 不采用：本课展开 Seata AT/TCC。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-48.js` | `distributed-one-db-first`：不变量/Seata/XID；答案空行；MonolithFirst |
| `curriculum/example-code-blocks.js` | 示例区补 〔Outbox｜…〕（导出覆盖 `example` 字段） |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔Seata｜|MonolithFirst' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿把 Seata 模式细节搬进本课
- [ ] why 里二次出现的 Seata 可不重复标记

## 给下一模型

1. 先读：本文 + `2026-10-11-distributed-one-db-first-review.md`
2. 再读：`curriculum/coverage-java-48.js` 的本课
3. 禁区：勿改提问口径（不该刚拆就上 Seata）
