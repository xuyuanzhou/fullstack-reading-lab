# 同步异步课：术语释义、答案分条与引用

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `arch-sync-vs-async`；审查后用户确认「需要」 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查认为主体符合业界口径，需小修：答案空行、RPC/Saga/编排/协同首次释义、同步勿绑死成「同步 RPC」、补 Richardson Saga 引用。

## 决策

- 采用：正文改为「同步请求-响应（常见 HTTP 或 RPC）」；编排/协同/Saga/RPC 用 `〔｜〕`；答案 `.join` 空行分条；refs 增加 microservices.io Saga；deep 链到 `distributed-saga-who-drives`。
- 不采用：大改提问或拆课。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-08.js` | `arch-sync-vs-async` 正文/答案/deep/refs；深文「与网关」补扇出、BFF 点击释义 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔Saga｜|microservices.io/patterns/data/saga' web/src/data/curriculum-bodies-java.json
```

- 结果：导出与校验通过；正文含 Saga/编排/协同/RPC 点击释义与 microservices.io Saga 引用。

## 后续

- [x] 「与网关」补〔扇出｜…〕、〔BFF｜Backend for Frontend…〕点击释义（BFF 释义写清面向哪类前端、聚合下游）
- [ ] 邻课（Zabbix/Redis 等）若裸抛「扇出」，同课首次补释义
- [ ] 勿把编排等同于必须同步等待

## 给下一模型

1. 先读：本文 + 审查结论（编排≠上消息；Saga 可编排可协同）
2. 再读：`curriculum/coverage-path-08.js` 的 `arch-sync-vs-async`
3. 若续作：对照图 `diagrams/arch-sync-async.svg` 是否仍与正文一致
4. 禁区：勿把「全部消息化消灭事务」写回课上
