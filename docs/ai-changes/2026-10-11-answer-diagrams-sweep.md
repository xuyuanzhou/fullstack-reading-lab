# 练习要求画图的课：参考答案统一补图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | 契约「练习要求画图时答案须有图」 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`spring-transaction` 补箭头图后，扫全库：练习写「画出 / 画一条…」但参考答案无 fenced 图的共 46 课。

## 决策

- 采用：新增 `curriculum/answer-diagrams.js`，在 walkthrough 之后为缺图答案前置 ` ```text ` 图；`verify_content.mjs` 对画图类练习做断言。
- 不采用：为每课另挂 PNG；不把「箭头函数 / 状态机三步事件」等非画图题算进缺图。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/answer-diagrams.js` | 新建，46 课图示 |
| `scripts/curriculum.mjs` | 纳入 publication 清单 |
| `legacy/index.html` | 同步加载 |
| `scripts/verify_content.mjs` | 画图练习须有图 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过；缺图列表为 0

## 后续

- [ ] 新增「画出…」类练习时，同步在 `answer-diagrams.js` 加图，或直接把图写进该课 `answer`
