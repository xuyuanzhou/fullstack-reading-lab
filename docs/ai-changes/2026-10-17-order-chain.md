# 完整链路写出远程调用和按库校验

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [支付到签收分次提交](2026-10-17-pay-ship-done.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

创建、支付、出库、签收已经分开写了谁提交。缺一条能抄的代码：远程调用放在哪一次提交外面，中继怎样发送，以及每个库当时查什么。

## 决策

- 采用：新课 `evo-order-chain`，放在 `evo-order-state-table` 之后。`place` 不加 `@Transactional`。`insertPending` 返回后才用 OpenFeign，头里是同一把幂等键，超时 200/800 毫秒。支付行和待发行在支付库一次提交。中继在这次提交外先发送再改状态。校验按订单库、锁定库、支付库分别查询。
- 采用：选择题 `xevo-16` 紧跟 `xevo-15`，题目总数 1403。课只挂在技能 `saga`。
- 不采用：把 OpenFeign 写进订单的事务方法。不把中继写进 `markPaid`。不把支付、出库、签收收成一次全局事务。不改 `coverage-java-128.js`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-13.js` | 新课；创建课和支付课指向它 |
| `curriculum/diagrams/evo-order-chain.svg` | 六步和每步要查的行 |
| `scripts/curriculum.mjs` | 演进全流程大纲插入该课 |
| `web/src/data/learningSkills.ts` | `saga` 增加该课 |
| `web/src/data/drillEvolution.ts` | 知识点 `xevo-chain`、题目 `xevo-16` |
| `web/src/data/drillOutline.ts` | 关卡 `xevo` 在 `xevo-15` 后插入 `xevo-16` |
| `scripts/drill.test.mjs` | 题目数 1403 |
| `README.md` | 1131 课、3406 个知识点、Java 763 课 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
```

- 结果：导出 1131 课、3406 个知识点（前端 368，Java 763）。内容校验通过。选择题与技能图 36 项通过。页面 `#/java/system-design/evo-order-chain` 打开后，例子里有 `@FeignClient`、`place` 在事务返回后调用、支付库两行一次提交、中继和按库查询的 SQL。演进全流程为 16 课。

## 后续

- [ ] 不要把 OpenFeign 写回订单的 `@Transactional`
- [ ] 不要把这课并进九关 Boss，也不要重跑 `scripts/build-drill-multi.mjs`
- [ ] TCC 仍单独画 Try、Confirm、Cancel。支付等待不进全局事务
- [ ] 不要把 `coverage-java-128.js` 改成画图课

## 给下一模型

1. 先读本文，再读 `curriculum/coverage-path-13.js` 里 `evo-order-chain`
2. 远程预留在 `insertPending` 返回之后。超时再调用仍用同一把幂等键
3. 中继先 `send` 再 `markSent`。重复消息使订单更新影响 0 行
4. 创建返回时支付库计数为 0。签收不再改支付行和扣减数量
5. 入口：`/#/java/system-design/evo-order-chain`
