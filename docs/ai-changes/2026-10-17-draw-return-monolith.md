# 画图补上退货状态和单体一次提交

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [画图补上主从、静态资源和事务选型](2026-10-17-draw-replica-cdn-tx.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

退款状态图写明已发货不能复用退款完成，但还没有退货入库这一条。单体的一次本地事务也还没有可抄的画法。主从、静态和事务选型已在 `coverage-java-130.js`。

## 决策

- 采用：两课放在「系统设计 / 画图」末尾，文件是 `coverage-java-131.js`。已发货经退货入库到已退货。退款完成仍只从已支付到已退款。单体图是一个虚线框、一个数据库、一次提交，支付页在框外。
- 采用：`draw-static-cdn.svg` 和 `draw-tx-choose.svg` 按 130 的正文画出。创建订单不进 CDN。用户支付在 TCC 框外。
- 不采用：不改 `coverage-java-128.js`，那是 Redis 过载下一课。不改 `coverage-java-130.js` 的三课结论。不另开通信图或数据流图。不改选择题。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-131.js` | 退货状态、单体图 |
| `curriculum/diagrams/draw-uml-state-return.svg`、`draw-monolith.svg` | 两张示意图 |
| `curriculum/diagrams/draw-static-cdn.svg`、`draw-tx-choose.svg` | 补上 130 两课的示意图 |
| `curriculum/coverage-java-126.js` | 退款课指向退货课 |
| `scripts/curriculum.mjs`、`legacy/index.html`、`web/src/data/learningSkills.ts` | 发布 131 |
| `README.md` | 课数 1124 / 3385，Java 756 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：导出 1124 课、3385 个知识点（前端 368，Java 756）。内容校验通过。技能课文 id 能在索引里找到。浏览器打开退货状态图和单体图，课表「系统设计 / 画图」为 0/24。取消、退款完成、退货入库三条箭头没有接错起点。支付页在单体虚线框外。静态图和事务选型图能打开。

## 后续

- [x] 已完成之后若还要退货，再加一条事件，不要把退货入库接到已支付上。见 [画图补上完成后退货、本地消息表和 Saga](2026-10-17-draw-done-outbox-saga.md)
- [ ] 不要把 `coverage-java-128.js` 改成画图课
- [ ] 通信图、数据流图不单开
- [ ] 半同步不要写成「从库已能查到」。CSDN 不要画成源站

## 给下一模型

1. 先读本文，再读 `curriculum/coverage-java-131.js` 和 `coverage-java-130.js`
2. 退款完成只连接已支付和已退款。退货入库只连接已发货和已退货
3. 单体图只有一个数据库。支付等待不进这次提交
4. 示意图用 UTF-8 写入。改课之后跑导出和 `node scripts/verify_content.mjs`
5. 入口：`/#/java/system-design/draw-uml-state-return`
