# 技能树前置只保留读得懂

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | docs/技能树结构-2026-10-15.md |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`allOf` 把「缺了它就读不懂」和「全栈通常接着学」写在一起。Redis、消息队列、分布式一致要等整章 MySQL；Sentinel 在中间件，它的前置限流熔断在右边一列；「其他」把 Vite、Angular、微前端放在同一组；架构三项没有前置，HTML 未读时也可以成为正在点亮。

## 决策

- 采用：前置最多两个，只表示缺了它就读不懂。Redis、Elasticsearch、消息队列、分布式一致、幂等去掉 MySQL 前置。限流熔断去掉 Spring 前置。Sentinel 仍要限流熔断，并挪到分布式「容量与防护」。密钥改等安全。持续集成要 Git 和测试都点亮。错误预算要可观测。聚合边界要分布式一致。小程序要 JavaScript。前端取消「其他」：构建与渲染、界面进阶、Angular、服务端 JS、跨端界面分开。Netty 排到 Spring 前面。AI 列先画应用叉（提示词 → 大语言模型 → 代理 → LangChain），再画机制叉（Transformer → 嵌入 → 检索增强）。
- 不采用 / 刻意不做：不合并赛道；不改 `gateCleared`；不加 Next / Svelte 空节点；不把场景切换写进 `allOf`；不把 `aiDone` 并进关卡进度。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 改 `allOf` 与 `SKILL_VIEWS` 分组、顺序 |
| `scripts/learning-platform.test.mjs` | 分组、Sentinel 赛道、前置断言；MySQL 未点亮时 Redis 可为 ready |
| `docs/技能树结构-2026-10-15.md` | 目录与前置摘要 |
| `docs/技能树加页设计-2026-10-15.md` | 分组说明 |

## 验证

```bash
node --test --test-name-pattern "graph rejects" scripts/learning-platform.test.mjs
```

- 结果：图校验 1 项通过。`#/skills` 上前端出现构建与渲染、界面进阶、Angular、服务端 JS、跨端界面；Netty 在 Spring 之前；Sentinel 在限流熔断下面且要等它点亮；Redis、分布式一致可以开始；持续集成要 Git 和测试；密钥要安全；聚合边界要分布式一致；AI 先是应用结构里的代理，再是模型机制里的 Transformer。

## 后续

- [ ] 场景切换另做：只改变「正在点亮」的候选，不把未选场景的印章打暗。
- [ ] 勿把 Redis 再绑回 MySQL，勿把 Sentinel 放回中间件列。
