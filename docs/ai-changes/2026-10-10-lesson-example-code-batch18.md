# 学习课例子代码块第十八批（润色 Kafka / RocketMQ / Redis / CSP / EXPLAIN / MQ，56 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch17](2026-10-10-lesson-example-code-batch17.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

套话模板剩余里，MySQL 索引启发式共用 `EXPLAIN SELECT ...`、Kafka 共用 `producer → broker (acks) → ISR`、Redis 共用 `SET k v EX 60` / `MULTI`、MQ 共用投递语义口诀、CSP/CORP 共用同一组响应头、RocketMQ 共用 `topic / queue`、MySQL CTE/JSON/VIEW 共用 `WITH paid AS`，均与原文 example 不对齐。

## 决策

- 采用：在 `example-code-blocks.js` 末尾覆盖同 id，按 coverage 原文重写。
- 不采用：一次清空全部剩余套话。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | 覆盖 56 课（12 MySQL 索引启发式 + 8 Kafka + 7 Redis 结构/淘汰 + 7 MQ + 6 CSP·CORP + 6 MySQL CTE/JSON/VIEW + 5 Redis ACL/锁 + 5 RocketMQ） |
| `web/src/data/curriculum*.json` | export 产物 |
| `README.md` | 课数对齐当前导出（899 / 2704；前端 301 / Java 598） |
| `scripts/curriculum.mjs` | 顺手：安全章补回 captcha/bot 大纲 id；去掉重复 LESSON_SINCE 键 |
| `curriculum/diagrams/fe-pick-decision-order.svg` 等 4 图 + `web/public/...` | 损坏非 UTF-8 → 按课重写（决策顺序 + 三张对照表） |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：899 课 / 2704 KP；本批 56 个 id 均无套话；仍含套话约 **167**（并行新课带套话尾）；`verify_content` 通过。

## 后续

- [ ] 继续润色：RabbitMQ / Redis Cluster·持久化 / React Router·RN / 网络与安全散课 / 新课套话尾部
- [ ] 新课勿再用「对照本课断言」套话生成器

## 给下一模型

1. 先读：本文 + [batch17](2026-10-10-lesson-example-code-batch17.md)
2. 覆盖写在 `EXAMPLE_CODE_BLOCKS` 文件末尾；对照原文时排除 `example-code-blocks.js`
3. 课数变了同步 `README.md`；并行改课源后务必重新 `export:curriculum`
