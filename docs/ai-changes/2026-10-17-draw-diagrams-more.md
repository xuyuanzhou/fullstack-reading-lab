# 画图再补类图、用例图、活动图和组件图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [系统设计补上五张必须会画的图](2026-10-17-draw-diagrams.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

上一组有容器图、时序图、ER 图、状态图和部署图。类图、用例图还没教，活动图和容器内部的组件图也没有可照着画的例子。

## 决策

- 采用：仍用同一笔下单，在「系统设计 / 画图」末尾加四课。类图写组合、关联、泛化和依赖。用例图写 include 与 extend 的箭头方向。活动图写判断、分叉、活动终点和流终点。组件图放大订单服务，MySQL 和消息留在边界外。
- 不采用 / 刻意不做：不改前五课的图例。不把空心菱形写成删除规则。不单开对象图、通信图、包图。不改选择题。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-124.js` | 四课正文 |
| `curriculum/diagrams/draw-uml-class.svg` 等四张 | 示意图 |
| `scripts/curriculum.mjs` | 发布清单和「画图」小节 |
| `legacy/index.html` | 按同样顺序挂上脚本 |
| `web/src/data/learningSkills.ts` | 架构决策技能带上这四课 |
| `README.md` | 课数改为 1095 / 3296，Java 727 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
```

- 结果：导出 1095 课、3296 个知识点（前端 368，Java 727）。内容校验通过。浏览器打开类图、用例图、活动图和组件图，课表「系统设计 / 画图」为 0/9。

## 后续

- [x] 对象图、包图已另开，见 `2026-10-17-draw-diagrams-next.md`。通信图仍不单开，先后用时序图
- [x] 已支付之后的退款另加状态，见 `2026-10-17-draw-state-fragment.md`
- [ ] 不要把空心菱形写成「删除用户则订单消失」

## 给下一模型

1. 先读：本文 + `curriculum/coverage-java-124.js`
2. 再读：`scripts/curriculum.mjs` 里系统设计的「画图」
3. 改课之后跑导出和 `node scripts/verify_content.mjs`。示意图要用 UTF-8 写入，写坏中文时导出会拒绝
