# 画图补上完成后退货、本地消息表和 Saga

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [画图补上退货状态和单体一次提交](2026-10-17-draw-return-monolith.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

已发货的退货已经有「退货入库」。签收之后还要退货，不能复用这条事件。本地消息表和 Saga 只有演进课里的叙述，画图一节还没有可抄的图。

## 决策

- 采用：三课放在「系统设计 / 画图」末尾，文件是 `coverage-java-132.js`。已完成经「顾客退回」到已退货。退货入库仍只从已发货出发。本地消息表图里，支付行和待发行同一次提交，中继在框外，订单库是另一次提交。Saga 图的下排是新写入，不画回滚。
- 不采用：不把退货入库接到已完成或已支付上。不把支付库和订单库画成一次提交。不改 `coverage-java-128.js`。不另开通信图或数据流图。TCC 的三套接口和空回滚仍留在演进课，不并进 Saga 图。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-132.js` | 完成后退货、本地消息表、Saga |
| `curriculum/diagrams/draw-uml-state-done.svg`、`draw-tx-outbox.svg`、`draw-tx-saga.svg` | 三张示意图 |
| `curriculum/coverage-java-131.js` | 退货课指向完成后的事件 |
| `curriculum/coverage-java-125.js` | 选题课补上这三种图 |
| `curriculum/coverage-path-13.js` | 演进课指向画法 |
| `scripts/curriculum.mjs`、`legacy/index.html`、`web/src/data/learningSkills.ts` | 发布 132 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：导出与内容校验通过，当时为 1130 课、3403 个知识点（前端 368，Java 762）。技能课文 id 能在索引里找到。浏览器打开三课。课表「系统设计 / 画图」为 0/27。顾客退回从已完成进入已退货右侧。本地消息表的中继在虚线框外，箭头标着经消息。Saga 的两条箭头从支付失败分别进入释放预留和取消订单，不穿过方框。

## 后续

- [ ] TCC 另开一张图：Try、Confirm、Cancel，取消先到时空成功。支付等待画在框外
- [ ] 不要把 `coverage-java-128.js` 改成画图课
- [ ] 通信图、数据流图不单开
- [ ] 退货入库只从已发货出发。顾客退回只从已完成出发
- [ ] 半同步不要写成「从库已能查到」。CSDN 不要画成源站

## 给下一模型

1. 先读本文，再读 `curriculum/coverage-java-132.js`
2. 顾客退回的起点是已完成，终点是已退货。不要把退货入库接到已完成上
3. 本地消息表只有支付库的两行在同一次提交里。订单库是另一次
4. Saga 的反向步骤写成新写入。不写 rollback，也不写 undo
5. 示意图用 UTF-8 写入。改课之后跑导出和 `node scripts/verify_content.mjs`
6. 入口：`/#/java/system-design/draw-uml-state-done`
