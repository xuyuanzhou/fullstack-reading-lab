# 同一起点的两条箭头先成功的生效

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [订单状态图和状态表收成同一份名单](2026-10-17-order-state-table.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

状态表已经列出签收和退货入库都能从已发货出发。两条几乎同时到达时，谁写订单状态、后到的那条怎样停住，还没有单独写成一课。

## 决策

- 采用：新课 `evo-order-event-race`，放在 `evo-order-chain` 之后。两条都要求当前是已发货。先提交成功的留下，后到的 `UPDATE` 影响 0 行。订单状态只由订单服务按迁移表写。签收已经成功之后的退货改用顾客退回。锁定数量另成一份状态，签收不改它。
- 采用：选择题 `xevo-17` 紧跟 `xevo-16`，题目总数 1404。课只挂在技能 `adr`。
- 不采用：先改成已完成再执行退货入库。不让支付服务直接改订单行。不把退款完成接到已完成上。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-13.js` | 新课；完整链路课指向它 |
| `curriculum/diagrams/evo-order-event-race.svg` | 先成功的实线，后到的虚线，顾客退回从已完成向下 |
| `scripts/curriculum.mjs` | 演进全流程大纲插入该课 |
| `web/src/data/learningSkills.ts` | `adr` 增加该课 |
| `web/src/data/drillEvolution.ts` | 知识点 `xevo-race`、题目 `xevo-17` |
| `web/src/data/drillOutline.ts` | 关卡 `xevo` 在 `xevo-16` 后插入 `xevo-17` |
| `scripts/drill.test.mjs` | 题目数 1404 |
| `README.md` | 1132 课、3409 个知识点、Java 764 课 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
```

- 结果：导出 1132 课（前端 368、Java 764），校验 3409 个知识点通过。选择题与技能图 36 项通过。页面 `http://127.0.0.1:5199/?race=1#/java/system-design/evo-order-event-race` 打开后，标题、三条要点和练习可见，演进全流程为 17 课。

## 后续

- [x] 写清同一起点两条箭头谁生效
- [ ] 不要把这课并进九关 Boss，也不要重跑 `scripts/build-drill-multi.mjs`
- [ ] 不要把退货入库的起点改成已完成，也不要让支付服务写订单状态

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-13.js` 里 `evo-order-event-race`
3. 若续作：新的竞争箭头仍用原来的状态当 `UPDATE` 条件，影响 0 行就停
4. 禁区：签收之后的退货用顾客退回；锁定数量不写进订单 `status`
