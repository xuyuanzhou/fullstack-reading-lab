# 缓存 / 消息 / 数据库同构导论（Redis / MQ / MySQL）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | Java 大纲「缓存」「消息队列」「数据库」；接续 ES 导论模板 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

ES 章已补「是什么 / 权衡容量 / 相对边界」导论。缓存、消息、数据库章同样缺章首定位课。

## 决策

- 采用：`coverage-java-104/105/106.js` 各三课；OUTLINE 各加「导论」；PATH_LEAD 前置；章首既有课 light 回链。
- 不采用：不写死虚假全站 QPS/TPS/行数；本轮不做全章逐课过完（只章首回链）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-104.js` | Redis 导论 3 课 + SVG |
| `curriculum/coverage-java-105.js` | MQ 导论 3 课 + SVG |
| `curriculum/coverage-java-106.js` | MySQL 导论 3 课 + SVG |
| `coverage-path.js` / `path-07` / `path-09` | 章首回链 |
| `scripts/curriculum.mjs`、legacy、verify | 接入 |
| 审计 / 交接 / README | 台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：871 节 / 2620 KP（前端 289 / Java 582）。

## 后续

- [x] Redis / MQ / MySQL 导论三章
- [ ] 可选：各章机制课再过一遍补回链（不改纠偏结论）

## 给下一模型

1. Redis：`redis-what-and-when`、`redis-tradeoffs-capacity`、`redis-vs-db-cache`
2. MQ：`mq-what-and-when`、`mq-tradeoffs-capacity`、`mq-vs-sync-call`
3. MySQL：`mysql-what-and-when`、`mysql-tradeoffs-capacity`、`mysql-vs-cache-search`
4. 容量只讲 sizing 框架；下一空闲号先 `ls curriculum/coverage-java-107.js`
