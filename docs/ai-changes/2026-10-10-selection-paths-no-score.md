# 选型类路线去掉查表：已有系统先留下

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 用户：所有学习路线按「没有打分公式、已有系统先留下」来改 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

前端选型已改成「仓库和团队 → 运行时 → 该库自己的方案」。微前端、消息队列、架构演进仍用查表：同栈换成 Federation、发邮件换成 RabbitMQ、日订单一千就必须走到某一级。

## 决策

- 采用：已有加载器、已有消息集群、已有 HTTP、默认 G1 先留下。只有它做不到的那一条才加第二种，并写范围。架构四级不是必经阶梯；课文里的订单数字只是例子。
- 不采用：不把 Nginx 选 location、Redis 选结构这类机制课改成选型课。它们描述的是组件怎么工作。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-27.js` | 微前端三课 |
| `curriculum/coverage-path-04.js` | `mq-pick-workload` |
| `curriculum/coverage-path-07.js` | 消息对照、架构演进 |
| `curriculum/coverage-path-09.js` | GC：先对暂停和耗时 |
| `curriculum/coverage-sca-12.js` | 已有 HTTP 不因 Nacos 改 Dubbo |
| `curriculum/example-code-blocks.js` | 上述课程的例子与正文一致 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

## 后续

- [ ] 不要把「埋点 → Kafka、关单 → RocketMQ」写回例子
- [ ] 机制课（选 location、选 Redis 结构）不要改成产品打分

## 给下一模型

1. 选型顺序都是：已有系统 → 它做不到的那一条 → 只加那一条。
2. `example-code-blocks.js` 会覆盖课文 `example`，两处要一起改。
