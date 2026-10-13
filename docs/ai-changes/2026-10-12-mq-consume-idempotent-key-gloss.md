# 消费幂等课：至少一次/业务键释义与答案空行

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `mq-consume-idempotent-key`；接续 `2026-10-12-mq-consume-idempotent-key-review.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

再审：答案未空行；core 首处「至少一次」「业务键」宜与邻课统一为 〔〕。

## 决策

- 采用：上述标记；答案空行；Redis 命令释义保留。
- 不采用：把 SETNX 写成完整消费幂等。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-15.js` | `mq-consume-idempotent-key` |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔至少一次｜|〔业务键｜' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿把 SETNX 写成完整消费幂等
- [ ] 勿写回「Java 不能给 SETNX 过期」

## 给下一模型

1. 先读：本文 + `2026-10-12-mq-consume-idempotent-key-review.md`
2. 再读：`curriculum/coverage-java-15.js` 的本课
3. 禁区：勿改「库唯一键为准」主轴
