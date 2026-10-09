# 学习课例子代码块第十批（MySQL / 并发 / 分布式 / 缓存，+39）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch9](2026-10-09-lesson-example-code-batch9.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第九批后 Spring 已基本围栏完毕；剩余 MySQL/DB 边界课、CHM/HashMap、分布式纠偏与缓存/可观测性仍是口头 example。并行批量曾把部分课填成模板围栏（如 `git-default-branch` 误贴 kubectl），本批顺带改对。

## 决策

- 采用：只扩 `curriculum/example-code-blocks.js`，短围栏服务本课结论。
- 不采用：改 core；已有围栏的跳过。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +39 课围栏；修正 `git-default-branch-not-master` 示例 |
| `web/src/data/curriculum*.json` | export 产物 |

本批：`mysql-column-count-thirty-not-law`、`mysql-catch-sql-exception-not-enough`、`db-proxy-layer-not-only-choice`、`db-sequence-batch-not-gapless`、`db-autoinc-offset-step-needs-ops`、`hashmap-treeify-need-capacity`、`chm-iterator-weakly-consistent`、`chm-jdk8-not-segment-lock`、`dns-lb-not-just-round-robin`、`seckill-js-needs-cache-control`、`seckill-client-gate-not-enough`、`dist-lock-owner-not-mac-pid-tid`、`dist-lock-reentrant-not-deadlock-cure`、`lru-capacity-not-ttl-expire`、`base-slogan-not-ban-tx`、`split-vs-cluster-not-interchangeable`、`service-extract-not-only-connection-math`、`select-not-always-business-idempotent`、`cap-label-not-product-tattoo`、`hash-skew-not-only-virtual-nodes`、`message-order-not-always-required`、`sync-replication-not-only-durability`、`snowflake-params-need-capacity-math`、`hot-cold-ratio-not-fixed-one-to-four`、`business-split-db-not-only-path`、`cache`、`message-delivery`、`rate-limit`、`cache-aside-steps`、`cache-penetration-vs-breakdown`、`cache-local-vs-distributed`、`redis-pubsub-not-reliable-queue`、`lru-needs-hash-and-list`、`schema-migration`、`table-constraint-holds-rule`、`jdbc-datasource-not-diy-pool`、`hikari-pool-timeout`、`log-correlation-id`、`otel-three-signals`。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：841 课 / 2530 KP；含 \`\`\` 的 example = **649**；batch10 的 39 个 id 均有围栏；`verify_content` 通过。

## 后续

- [x] 例子下一批：微前端 / CSS / React / 架构（见 [batch11](2026-10-09-lesson-example-code-batch11.md)）
- [ ] 抽查并行模板围栏是否张冠李戴，按课改正
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 先读：本文 + [batch9](2026-10-09-lesson-example-code-batch9.md)
2. 已有 id 见 batch1–10，勿重复
3. 约定：`docs/课程例子代码块约定.md`
