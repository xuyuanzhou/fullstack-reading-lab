# 订单状态图和状态表收成同一份名单

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [支付到签收分次提交](2026-10-17-pay-ship-done.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

退款、退货、签收已经分成几张画图课，每张只追加一条箭头。缺一张把七个状态、允许的迁移和订单行更新条件放在一起的课。

## 决策

- 采用：新课 `evo-order-state-table`，放在 `evo-order-pay-ship-done` 之后。状态图只画允许的箭头。订单行只存当前状态。`UPDATE` 的条件写起点，影响 0 行就保持原状态。
- 采用：允许的迁移与已有状态课一致。取消只从待支付到已取消。退款完成只从已支付到已退款。退货入库只从已发货到已退货。顾客退回只从已完成到已退货。已取消、已退款、已退货没有离开的箭头。
- 采用：选择题 `xevo-15` 紧跟 `xevo-14`，题目总数 1402。课只挂在技能 `adr`。
- 不采用：已支付改成已取消。已发货使用退款完成。已完成使用退货入库。不为每个状态单独建一列。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-13.js` | 新课；支付到签收课的相关课指向它 |
| `curriculum/diagrams/evo-order-state-table.svg` | 七状态，箭头上写事件 |
| `scripts/curriculum.mjs` | 演进全流程大纲插入该课 |
| `web/src/data/learningSkills.ts` | `adr` 增加该课 |
| `web/src/data/drillEvolution.ts` | 知识点 `xevo-state`、题目 `xevo-15` |
| `web/src/data/drillOutline.ts` | 关卡 `xevo` 在 `xevo-14` 后插入 `xevo-15` |
| `scripts/drill.test.mjs` | 题目数 1402 |
| `README.md` | 1130 课、3403 个知识点、Java 762 课 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
```

- 结果：导出 1130 课（前端 368、Java 762），校验 3403 个知识点通过。选择题与技能图 36 项通过。页面 `http://127.0.0.1:5199/?state=1#/java/system-design/evo-order-state-table` 打开后，七个状态、迁移条件和机制图可见，演进全流程为 15 课。

## 后续

- [x] 把允许和禁止的迁移收成一张图、一张表
- [ ] 不要把这课并进九关 Boss，也不要重跑 `scripts/build-drill-multi.mjs`
- [ ] 不要改已有画图课的事件归属：退款完成、退货入库、顾客退回各只从一个起点出发

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-13.js` 里 `evo-order-state-table`
3. 若续作：新迁移先加箭头和迁移表的同一行，再改 `UPDATE` 的起点条件
4. 禁区：已取消、已退款、已退货不向外转；签收的起点只是已发货
