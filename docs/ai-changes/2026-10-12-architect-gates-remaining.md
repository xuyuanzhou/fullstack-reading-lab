# 架构师主线：补死信、熔断、Service、迁移，并新开三课

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | 接 [架构师主线：按交付把已有课挂进关卡 2～6](2026-10-12-architect-gates-fill.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

上一轮点名必读停在 42 课，死信积压、熔断与重试、Service 入口、表结构迁移仍未挂上。契约评审、成本取舍、路线图写法课库没有。这次把已有四课挂进关卡，并新开后三课。决策会仍不写范文。

## 决策

- 采用：关卡 4 在消息课之后加 `mq-dlq-backlog`，在 Sentinel 拦截课之后加 `circuit-breaker-not-retry`，并加一条失败处理交付。关卡 5 在 Deployment 之后加 `k8s-service-clusterip`、`schema-migration`，再读错误预算，并加一条发布交付。关卡 6 在一条路径之后加新课 `arch-cost-tradeoff`、`arch-contract-review`、`arch-evolution-roadmap`。点名必读改为 49（消息二选一按 1；演进两课仍是补读）。系统设计大纲增加「职责」节。
- 不采用 / 刻意不做：不为决策会写课或范文。不把 JVM、算法、整章 SCA 或 SETNX 步骤写进这三课。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-10.js` | 三课：成本取舍、契约评审、路线图 |
| `scripts/curriculum.mjs` | 系统设计「职责」节与 `LESSON_SINCE` |
| `web/src/data/learningPaths.ts` | 关卡 4～6 必读、交付与导语（42 → 49） |
| `docs/架构师主线设计.md` | 关卡清单、少而硬、P3、课数核对 |
| `README.md` | 1060 课、3190 个知识点、Java 696 |
| `web/src/data/curriculum*.json`、`legacy/publication-order.js` | 导出 |

## 验证

```bash
cd web && node ../scripts/export-curriculum.mjs && node ../scripts/verify_content.mjs
```

- 结果：1060 课 / 3190 知识点；导出与出版清单一致。关卡槽位：1=8、2=6、3=3、4=19、5=11（含补读 2）、6=4。点名必读 49。

## 后续

- [ ] 决策会仍无课。不要补范文。
- [ ] 新课插在更早的关卡里，未读完的学员会从该关重新算进度。
- [ ] 不要把「职责」三课再拆成新章。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/learningPaths.ts` 的 `architect`，`curriculum/coverage-path-10.js` 末尾三课，`docs/架构师主线设计.md` 课数核对
3. 若续作：只改决策会以外的缺口；完成后更新索引
4. 禁区：不要把决策会写成课内范文；不要改全栈路径
