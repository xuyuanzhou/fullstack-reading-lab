# 学习课例子代码块第九批（分布式 / Spring / MySQL，+36）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch8](2026-10-09-lesson-example-code-batch8.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第八批后，分布式主线、Spring 回滚/传播/校验、MySQL 索引与隔离等高频课仍是口头 example。

## 决策

- 采用：只扩 `curriculum/example-code-blocks.js`。
- 不采用：改 core；已有围栏的 `spring-transaction` / `spring-aop-self-invocation` 跳过。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +36 课围栏 example |
| `web/src/data/curriculum*.json` | export 产物 |
| `README.md` | 公开课数与 KP 对齐 841 / 2530（前端 285 / Java 556） |

本批：`distributed-cap`、`distributed-consistency-three-words`、`distributed-bloom`、`distributed-xa`、`distributed-cache`、`distributed-token-bucket`、`distributed-consistent-hash`、`distributed-seckill`、`distributed-lock`、`zk-linearizable-not-realtime`、`mysql-uuid-not-clustered-pk`、`distributed-one-db-first`、`distributed-tx-not-cover-rpc`、`distributed-xid-must-travel`、`distributed-at-sees-before-global`、`distributed-saga-is-new-action`、`distributed-saga-who-drives`、`distributed-read-your-writes`、`distributed-reconcile-last`、`distributed-mq-not-erase-invariant`、`spring-rollback`、`spring-propagation`、`spring-scopes`、`spring-external-config`、`spring-mvc-exception`、`spring-validation-binding`、`mysql-index`、`mysql-isolation`、`mysql-deadlock`、`mysql-explain-analyze`、`mysql-select-star`、`mysql-where-having`、`mysql-upsert`、`mysql-isolation-levels`、`mysql-index-kinds`、`mysql-prepared-statement`。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：841 课 / 2530 KP；含 \`\`\` 的 example = **293**；batch9 的 36 个 id 均有围栏。

## 后续

- [x] 例子下一批：MySQL/DB 边界、并发、分布式纠偏、缓存（见 [batch10](2026-10-09-lesson-example-code-batch10.md)）
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 先读：本文 + [batch8](2026-10-09-lesson-example-code-batch8.md)
2. 已有 id 见 batch1–9，勿重复
3. 课数变了要同步 `README.md` 两处计数句
4. 约定：`docs/课程例子代码块约定.md`
