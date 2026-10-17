# 预留行从已预留走向扣减或释放

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [同一起点的两条箭头先成功的生效](2026-10-17-order-event-race.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

订单状态表已经定下来。锁定数量只被说成「另一份状态」，没有自己的状态图、迁移表，也没有写明退货上架和签收各改哪一列。

## 决策

- 采用：新课 `evo-lock-state-table`，放在 `evo-order-event-race` 之后。预留行状态是已预留、已扣减、已释放。确认和释放都从已预留出发，先提交成功的留下，后到的影响 0 行且不再改数量。退货上架按退货单号增加可售，不把已扣减改回已预留。签收和出库不改锁定数量。
- 采用：选择题 `xevo-18` 紧跟 `xevo-17`，题目总数 1405。课只挂在技能 `adr`。
- 不采用：签收时把已扣减改回已预留。不在出库时再减可售。不把预留行和订单行收成一次提交。已释放之后不再确认。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-13.js` | 新课；竞争箭头课指向它 |
| `curriculum/diagrams/evo-lock-state-table.svg` | 已预留分出确认和释放，入库画在框外 |
| `scripts/curriculum.mjs` | 演进全流程大纲插入该课 |
| `web/src/data/learningSkills.ts` | `adr` 增加该课 |
| `web/src/data/drillEvolution.ts` | 知识点 `xevo-lock`、题目 `xevo-18` |
| `web/src/data/drillOutline.ts` | 关卡 `xevo` 在 `xevo-17` 后插入 `xevo-18` |
| `scripts/drill.test.mjs` | 题目数 1405 |
| `README.md` | 1135 课、3418 个知识点、Java 767 课 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
```

- 结果：导出 1135 课（前端 368、Java 767），校验 3418 个知识点通过。选择题与技能图 36 项通过。页面 `http://127.0.0.1:5199/?lock=1#/java/system-design/evo-lock-state-table` 打开后，三条要点和预留行机制图可见，演进全流程为 18 课。

## 后续

- [x] 把预留行的允许箭头和入库分开
- [ ] 不要把这课并进九关 Boss，也不要重跑 `scripts/build-drill-multi.mjs`
- [ ] 不要让已扣减回到已预留，也不要让签收改锁定数量

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-13.js` 里 `evo-lock-state-table`
3. 若续作：数量列只在预留行更新行数为 1 时改动
4. 禁区：入库不改预留行状态；确认和释放的起点只是已预留
