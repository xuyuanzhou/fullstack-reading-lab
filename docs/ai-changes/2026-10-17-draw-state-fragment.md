# 画图补上退款状态、实现和 opt/loop

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [画图再补上下文图、包图、对象图和选图](2026-10-17-draw-diagrams-next.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

状态图还把已支付之后说成只能出库。类图有泛化和依赖，没有实现。时序图只讲了 alt，没有可选和重复。

## 决策

- 采用：仍用同一笔下单，加三课。已支付经退款完成到已退款，取消仍只从待支付出发。MySQL 适配器以虚线空心三角实现库存端口。核销优惠券用 opt，按行出库用 loop。
- 不采用 / 刻意不做：不把退款完成接到已发货。不用 loop 重试整次提交。不另开通信图和数据流图。不改选择题。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-123.js` | 原状态图不再把已支付说成只能出库 |
| `curriculum/coverage-java-126.js` | 三课正文 |
| `curriculum/diagrams/draw-uml-state-refund.svg` 等三张 | 示意图 |
| `scripts/curriculum.mjs` | 发布清单和「画图」小节 |
| `legacy/index.html` | 按同样顺序挂上脚本 |
| `web/src/data/learningSkills.ts` | 架构决策技能带上这三课 |
| `README.md` | 课数改为 1102 / 3317，Java 734 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：导出 1102 课、3317 个知识点（前端 368，Java 734）。内容校验通过。技能课文 id 能在索引里找到。浏览器打开退款状态图和 opt/loop，课表「系统设计 / 画图」为 0/16。

## 后续

- [ ] 已发货之后的退货要再加状态和事件，不要复用「退款完成」
- [ ] 通信图、数据流图不单开
- [ ] 不要把空心菱形写成删除规则

## 给下一模型

1. 先读：本文 + `curriculum/coverage-java-126.js`
2. 再读：`draw-uml-state` 的正文，取消仍只从待支付出发
3. 示意图必须用 UTF-8 写入。改课之后跑导出和 `node scripts/verify_content.mjs`
