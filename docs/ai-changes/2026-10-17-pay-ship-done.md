# 支付到签收分次提交

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [创建订单只协调订单和资源锁定](2026-10-17-order-create-consistency.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

创建订单那一课停在预留提交。支付成功、出库、用户签收直到订单完成，还没有按时间写出谁提交、消息投递什么。

## 决策

- 采用：新课 `evo-order-pay-ship-done`，放在 `evo-order-create-consistency` 之后。支付成功是支付库的本地消息表。订单改成已支付、预留变成扣减、出库改成已发货，是后来各自的本地事务。签收只把订单从已发货改成已完成。支付失败停在释放预留和已取消。
- 采用：选择题 `xevo-14` 紧跟 `xevo-13`，题目总数 1401。课只挂在技能 `saga`。
- 不采用：把支付、出库、签收收成一次全局事务。不在履约事务里直接改订单库。签收不再写支付库和锁定库。已发货后退货仍用退货入库，已完成之后仍用顾客退回。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-13.js` | 新课；创建课的相关课指向它 |
| `curriculum/diagrams/evo-order-pay-ship-done.svg` | 四段提交加支付失败底栏 |
| `scripts/curriculum.mjs` | 演进全流程大纲插入该课 |
| `web/src/data/learningSkills.ts` | `saga` 增加该课 |
| `web/src/data/drillEvolution.ts` | 知识点 `xevo-fulfill`、题目 `xevo-14` |
| `web/src/data/drillOutline.ts` | 关卡 `xevo` 在 `xevo-13` 后插入 `xevo-14` |
| `scripts/drill.test.mjs` | 题目数 1401 |
| `README.md` | 1129 课、3400 个知识点、Java 761 课 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
```

- 结果：导出 1129 课（前端 368、Java 761），校验 3400 个知识点通过。选择题与技能图 36 项通过。页面 `http://127.0.0.1:5199/?ship=1#/java/system-design/evo-order-pay-ship-done` 打开后，要点和四段机制图可见，演进全流程为 14 课。

## 后续

- [x] 把支付成功、出库、签收写到订单完成
- [ ] 不要把这课并进九关 Boss，也不要重跑 `scripts/build-drill-multi.mjs`
- [ ] 不要改状态图：退款完成只从已支付出发，退货入库只从已发货出发，顾客退回只从已完成出发

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-13.js` 里 `evo-order-pay-ship-done`
3. 若续作：签收只写订单库；出库前先确认锁定库已经扣减
4. 禁区：用户支付、出库、签收不进同一个全局事务
