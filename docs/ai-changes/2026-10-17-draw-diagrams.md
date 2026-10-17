# 系统设计补上五张必须会画的图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | 同一笔下单的架构图、时序图、ER 图 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

系统设计有拆分和容量的结论，没有教一张图该怎么画。笔试要交架构图，库表和订单状态也没有可对照的示例。

## 决策

- 采用：在「系统设计 / 画图」放五课，都用同一笔下单。架构图用 C4 容器图。时序图和状态图、部署图用 UML。ER 图用鸦脚记法，并说明 Chen 的矩形菱形是另一种画法。每课有示意图、可抄的文本图和练习答案。
- 不采用 / 刻意不做：不把类图、用例图放进这一组。不改已有选择题。不改九关通过规则。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-123.js` | 五课正文 |
| `curriculum/diagrams/draw-*.svg` | 五张示意图 |
| `scripts/curriculum.mjs` | 发布清单和「画图」小节 |
| `legacy/index.html` | 按同样顺序挂上脚本 |
| `web/src/data/learningSkills.ts` | 架构决策技能带上这五课 |
| `README.md` | 课数改为 1091 / 3284，Java 723 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
```

- 结果：导出 1091 课。内容校验通过。浏览器打开 C4 容器图和鸦脚 ER 图，示意图能显示。课表「系统设计 / 画图」列出这五课。

## 后续

- [x] 类图、用例图另开一课，见 `2026-10-17-draw-diagrams-more.md`。不要塞进这五张的图例
- [x] 已支付之后的退款另加状态和事件，见 `2026-10-17-draw-state-fragment.md`

## 给下一模型

1. 先读：本文 + `curriculum/coverage-java-123.js`
2. 再读：`scripts/curriculum.mjs` 里系统设计的「画图」
3. 改课之后跑 `node scripts/export-curriculum.mjs` 和 `node scripts/verify_content.mjs`，并让 `legacy/index.html` 的脚本顺序与发布清单一致
