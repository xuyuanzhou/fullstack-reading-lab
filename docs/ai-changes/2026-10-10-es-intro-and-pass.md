# Elasticsearch 导论补齐与搜索章知识点过一遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | Java 大纲「搜索」；侧栏显示 Elasticsearch |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

搜索章原有 10 课全是机制纠偏，缺「是什么 / 能做什么 / 优劣 / 为何用 / 容量怎么估」。

## 决策

- 采用：`coverage-java-103.js` 三课导论；OUTLINE 增加「导论」小节；现有 10 课 deep 回链。
- 不采用：不写死虚假全站 QPS/PB；本轮不并行改 Redis/Kafka/MySQL 全站（同构导论列入后续）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-103.js` | 3 导论课 + SVG |
| `coverage-path-09/02`、`java-13/30`、`batch-03`、`infra-13`、`core-16` | 回链导论 |
| `scripts/curriculum.mjs` 等 | 接入 |
| 审计 / 交接 / README | 台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：862 节 / 2593 KP（前端 289 / Java 573）；搜索章 13 课。

## 后续

- [x] ES 导论 + 过完 10 课
- [x] 同构导论模板下一轮：缓存（Redis）、消息队列、数据库（MySQL）——见 `2026-10-10-redis-mq-mysql-intro.md`

## 给下一模型

1. 搜索章导论 id：`es-what-and-when`、`es-tradeoffs-capacity`、`es-vs-db-search`
2. 容量只讲 sizing 框架，勿编造固定并发
3. 其它技术章照抄「导论小节 + 既有课回链」模式
