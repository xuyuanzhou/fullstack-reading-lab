# 创建订单只协调订单和资源锁定

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [同一笔订单串起架构演进全流程](2026-10-17-arch-evolution-flow.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

演进全流程已经分开讲了切库、本地消息表、Saga 和 TCC，但没有按订单服务、支付服务、消息服务、资源锁定服务把「创建这一笔」的提交顺序写完。

## 决策

- 采用：新课 `evo-order-create-consistency`，放在 `evo-microservice-order` 之后、`evo-tx-choose` 之前。创建返回前只有两次本地事务：订单库插入待支付，锁定库同步预留并记下幂等键。支付成功才用本地消息表。支付失败用新的释放。短预留必须处理取消先到时，才把那一跳换成 TCC，仍不包住用户支付。
- 采用：选择题 `xevo-13` 插在 `xevo-7` 与 `xevo-8` 之间，题目总数 1400。课挂在技能 `saga`，只出现一次。
- 不采用：把四个服务收成一次 `@GlobalTransactional` / XA / AT。不把远程预留写进订单的 `@Transactional`。不把预留写成跨过支付等待的行锁。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-13.js` | 新课；微服务课和选型课的相关课指向它 |
| `curriculum/diagrams/evo-order-create-consistency.svg` | 创建两次提交；支付和消息在虚线框外 |
| `scripts/curriculum.mjs` | 演进全流程大纲插入该课 |
| `web/src/data/learningSkills.ts` | `saga` 增加该课 |
| `web/src/data/drillEvolution.ts` | 知识点 `xevo-create`、题目 `xevo-13` |
| `web/src/data/drillOutline.ts` | 关卡 `xevo` 题序插入 `xevo-13` |
| `scripts/drill.test.mjs` | 题目数 1400 |
| `README.md` | 1125 课、3388 个知识点、Java 757 课 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
```

- 结果：导出 1125 课（前端 368、Java 757），校验 3388 个知识点通过。选择题与技能图 36 项通过。页面 `http://127.0.0.1:5199/?create=1#/java/system-design/evo-order-create-consistency` 打开后标题、三个要点和机制图可见；图文件返回 200。

## 后续

- [x] 用四个服务名写清创建时谁提交
- [ ] 不要把这课并进九关 Boss，也不要重跑 `scripts/build-drill-multi.mjs`
- [ ] 不要改已有课的选型结论：本地消息表只管已提交的通知，Saga 是新写入，TCC 只替换短预留

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-13.js` 里 `evo-order-create-consistency`
3. 若续作：保持创建返回前只有订单库和锁定库各一次提交
4. 禁区：用户支付不进全局事务；消息服务不决定创建时有没有预留
