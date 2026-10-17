# 画图补上主从、静态资源和事务选型

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [画图补上集群、SOA 和微服务](2026-10-17-draw-cluster-soa-ms.md)、[同一笔订单串起架构演进全流程](2026-10-17-arch-evolution-flow.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

演进全流程里主从、静态资源和事务选型已有结论，画图专章还没有可抄的画法。集群、SOA 和微服务的画法已经另开。

## 决策

- 采用：三课放在「系统设计 / 画图」末尾。主从图把写和刚写完的读留在主库，半同步只写到中继日志。静态图把脚本和图片送进 CDN 与对象存储，下单接口留在应用集群，CSDN 画在路外。事务选型图先问还在不在一个库，本地消息表、Saga、TCC 分三个框，用户支付在 TCC 框外。
- 不采用 / 刻意不做：不把这三课收进演进全流程。不另开通信图或数据流图。不改选择题，不改九关 Boss。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-130.js` | 三课正文 |
| `curriculum/diagrams/draw-replica.svg` 等 | 三张示意图，并改选图 |
| `curriculum/coverage-java-125.js` | 选图课带上这三种图 |
| `curriculum/coverage-path-13.js` | 三站相关课指向画法 |
| `scripts/curriculum.mjs`、`legacy/index.html` | 发布 `coverage-java-130.js` |
| `web/src/data/learningSkills.ts` | 架构决策技能带上这三课 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：导出后课表与 README 计数一致（1124 课、3385 个知识点，前端 368、Java 756）。内容校验通过。技能课文 id 能在索引里找到。浏览器打开主从课，示意图来自 `draw-replica.svg`，要点写明半同步等的是中继日志。下一课进入静态图，正文写出 CSDN 是内容社区。再进入事务选型图，本地事务、本地消息表、Saga、TCC 都在，支付在框外。课表「系统设计 / 画图」列出这三课。

## 后续

- [x] 已发货之后的退货仍不要复用「退款完成」。见 [画图补上退货状态和单体一次提交](2026-10-17-draw-return-monolith.md)
- [ ] 不要把 `coverage-java-128.js` 改成画图课
- [ ] 通信图、数据流图不单开
- [ ] 半同步不要写成「从库已能查到」。CSDN 不要画成源站

## 给下一模型

1. 先读本文，再读 `curriculum/coverage-java-130.js`
2. 主从图的刚写完的读只进主库。静态图的创建订单不进 CDN。事务选型图三个名字不写进同一个框
3. 示意图必须是合法 UTF-8。改课之后跑导出和 `node scripts/verify_content.mjs`
4. 入口：`/#/java/system-design/draw-replica`
