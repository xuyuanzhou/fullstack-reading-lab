# 幂等业务键课：术语点击释义与答案空行

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `distributed-idempotent-key`；接续 `2026-10-12-distributed-idempotent-key-review.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

再审：答案未空行；业务键 / 至少一次 / 恰好一次 / Outbox / Saga 宜 〔〕 点击释义，与 Outbox 课口径对齐。

## 决策

- 采用：上述标记；答案空行；promptAnswer 首处标至少一次。
- 不采用：改「至少一次 + 同键同提交」主轴；声称端到端恰好一次。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-48.js` | `distributed-idempotent-key` |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔业务键｜|〔Saga｜' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿写回「最终一致=只靠业务键」
- [ ] 勿声称端到端恰好一次

## 给下一模型

1. 先读：本文 + `2026-10-12-distributed-idempotent-key-review.md`
2. 再读：`curriculum/coverage-java-48.js` 的本课
3. 禁区：勿改同事务去重主轴
