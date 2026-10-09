# 学习课例子代码块第五批（+25，合计 113）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch4](2026-10-09-lesson-example-code-batch4.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第四批后，Redis / MQ / 幂等 / HTTP / 测试课仍有大量口头代码 example。

## 决策

- 采用：继续只扩 `curriculum/example-code-blocks.js`。
- 不采用：改 core；纯场景叙述课跳过。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +25 课围栏 example |
| `web/src/data/curriculum*.json` | export 产物 |

本批：`redis-lock-setnx-expire-race`、`redis-lua-atomic`、`redis-pipeline`、`redis-pubsub-pattern-subscribe`、`redis-stream-vs-pubsub`、`redis-stream-xtrim-bound`、`redis-single-thread`、`redis-hash-field-update`、`redis-multi-vs-lua-pick`、`mq-consume-idempotent-key`、`mq-delete-not-always-idempotent`、`distributed-outbox`、`distributed-kafka-order`、`distributed-idempotent-key`、`idempotency`、`msw-http-mock`、`test-mock-boundary`、`test-one-behavior`、`playwright-user-journey`、`http-methods`、`http-patch-rfc5789`、`http-503-unavailable`、`http-create-post-not-put`、`tcp-is-l4-not-http-handshake`、`mysql-binlog-format`。

## 验证

```bash
cd web && npm run export:curriculum
```

- 结果：829 课；含 \`\`\` 的 example = **113**；抽查 Redis 锁 / Lua / Outbox / MSW / HTTP methods 正常。
- 备注：导出曾因并行大纲改动短暂失败，重跑已通过。

## 后续

- [x] 下一刀：Elasticsearch、Nginx、更多 Spring Security / 网关、算法（见 [batch6](2026-10-09-since-restore-example-batch6.md)）
- [x] JVM / K8s / Docker / SCA（见 [batch7](2026-10-09-lesson-example-code-batch7.md)）
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 已有 id 见 batch1–5，勿重复
2. 追加后 export，核对 fenced count
3. 约定：`docs/课程例子代码块约定.md`
