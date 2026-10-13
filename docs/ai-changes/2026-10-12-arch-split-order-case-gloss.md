# 下单拆分案例课：提问答案、术语与答案分条

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `arch-split-order-case` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查：缺 promptAnswer；答案成段且末句重复；core 有 magically；预留/补偿/死信/幂等宜释义；deep「与 Outbox」宜「相关课」。

## 决策

- 采用：补 promptAnswer；答案空行并去重；去掉 magically；〔预留〕〔幂等〕〔补偿〕〔死信〕；相关课链 Outbox / sync-async / one-db-first。
- 不采用：改同步预留 / 异步履约主轴。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-08.js` | `arch-split-order-case` |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔预留｜|promptAnswer' web/src/data/curriculum*.json
```

- 结果：通过。

## 后续

- [ ] 勿把本地事务原样写成跨服务大事务

## 给下一模型

1. 先读：本文
2. 再读：`curriculum/coverage-path-08.js` 的本课
3. 禁区：勿写回 magically；勿删序列图要求
