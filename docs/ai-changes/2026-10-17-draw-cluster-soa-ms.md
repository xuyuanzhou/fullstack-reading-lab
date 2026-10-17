# 画图补上集群、SOA 和微服务

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [画图补上退款状态、实现和 opt/loop](2026-10-17-draw-state-fragment.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

演进全流程里已有这三站的示意图，画图专章还没有可抄的画法。演进课的微服务图把「支付成功」画成从库存指向支付。

## 决策

- 采用：三课放在「系统设计 / 画图」末尾。集群图是同一程序的多份副本，会话和主库各一个，一次只换一台。SOA 图里调用方只连企业服务总线，两个服务指向同一个库、两次提交。微服务图一个服务一个库；实线是同步预留，虚线从支付服务指向订单服务。
- 采用：`coverage-java-128.js` 仍是 Redis 过载下一课。画图三课写在 `coverage-java-129.js`。
- 不采用：不把这三课收进演进全流程，不另开通信图或数据流图，不改选择题。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-129.js` | 三课正文 |
| `curriculum/coverage-java-125.js` | 选图课带上这三种图 |
| `curriculum/diagrams/draw-cluster.svg` 等 | 三张示意图，并改选图 |
| `curriculum/diagrams/evo-microservice-order.svg` | 支付成功的虚线改到从支付指向订单 |
| `curriculum/coverage-path-13.js` | 三站相关课指向画法 |
| `scripts/curriculum.mjs`、`legacy/index.html` | 发布 `coverage-java-129.js` |
| `web/src/data/learningSkills.ts` | 架构决策技能带上这三课 |
| `README.md` | 课数 1119 / 3370，Java 751 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：导出 1119 课、3370 个知识点（前端 368，Java 751）。内容校验通过。技能课文 id 能在索引里找到。浏览器打开三课，课表「系统设计 / 画图」为 0/19。集群图三份副本汇到同一个会话和一个主库。SOA 图调用方只进总线。微服务图虚线从支付到订单。

## 后续

- [x] 已发货之后的退货仍不要复用「退款完成」。见 [画图补上退货、单体、主从、静态和事务选型](2026-10-17-draw-return-monolith.md)
- [ ] 不要把 `coverage-java-128.js` 改成画图课，那是 `redis-overload-next`
- [ ] 通信图、数据流图不单开

## 给下一模型

1. 先读本文，再读 `curriculum/coverage-java-129.js`
2. 集群图不出现第二个业务服务。SOA 图不把调用方画到库上。微服务图的虚线起点是支付服务
3. 示意图用 UTF-8 写入。改课之后跑导出和 `node scripts/verify_content.mjs`
4. 入口：`/#/java/system-design/draw-cluster`
