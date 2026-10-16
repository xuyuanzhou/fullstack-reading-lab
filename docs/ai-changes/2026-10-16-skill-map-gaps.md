# 技能树补上模式、SQL、库表、微服务和架构印章

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 技能树 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

设计模式挤在语言与运行时的一枚印章里，后面七课还没挂上。SQL 把连接、索引和慢查询混在一起，库表设计也只有「表结构」。微服务组件只有五枚。架构列把领域模型和拆分决策收成三枚，限界上下文、实体、仓储看不见。

## 决策

- 采用：用课库已有课文拆印章，不新写课文。总数 110。
  - Java「设计模式」：模式目录、创建型、结构型、行为型。后三枚前置是模式目录。
  - 数据存储「SQL 生态」：SQL 基础、查询优化、慢查询排查。优化前置基础，排查前置优化。
  - 数据存储「库表设计」：表设计、字段类型、结构迁移。后两枚前置表设计，表设计仍前置 SQL 基础。
  - 中间件「微服务组件」加上配置中心、SchedulerX。SchedulerX 从 Spring Cloud Alibaba 印章挪过来。Nacos、Dubbo、OpenFeign、Seata、网关留在原处。Sentinel 仍在容量与防护。
  - 架构拆成「领域设计」和「架构设计」，因此这一列改为可收起。领域设计：限界上下文、聚合边界、实体与值对象、仓储。架构设计：单体与模块、服务拆分、同步与异步、演进、架构决策。
- 不采用 / 刻意不做：不把 Sentinel 从容量与防护搬走。不给 Eureka、LoadBalancer 单开印章（没有独立成组的课文）。不改点亮规则。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 新技能、课文拆分、组名 |
| `web/src/components/learning/SkillSigil.tsx` | 新印章线稿 |
| `scripts/learning-platform.test.mjs` | 总数 110；架构列改为可收起 |

## 验证

```bash
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：22 项通过。
- `#/skills` 页头 0/110。展开后：设计模式四枚；SQL 生态是 SQL 基础、查询优化、慢查询排查；库表设计是表设计、字段类型、结构迁移；微服务组件七枚，末尾是配置中心、SchedulerX；领域设计四枚；架构设计五枚。点开限界上下文进入 `ddd-same-word-two-contexts`。

## 后续

- [ ] 不要把创建型、结构型、行为型再并回模式目录
- [ ] 不要把慢查询排查并回 SQL 基础
- [ ] 不要把架构列改回只有一个组来禁止收起

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/learningSkills.ts` 的 `pcreate`、`sqlopt`、`slow`、`schema`、`cfg`、`sched`、`ctx`、`mod`
3. 若续作：先有课文再加印章。Sentinel 留在容量与防护。`gateId` 仍在原来的 sql、schema、split、adr 上
4. 禁区：勿改 `gateCleared`；勿把已读课重置；勿恢复 `data-repeat`
