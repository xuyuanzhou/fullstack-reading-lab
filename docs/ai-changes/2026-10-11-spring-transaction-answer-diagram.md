# 事务课参考答案补箭头图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | spring-transaction / 第 2 关 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

练习要求画控制器→代理→目标与 this 两条箭头，参考答案原先只有文字，对不上题目。

## 决策

- 采用：在 `answer` 里用 ` ```text ` 画出两条路径，再写异常吞掉后的提交预测；契约补充「练习要求画图时答案须有图」。
- 不采用：另挂 PNG diagram（本题箭头用文本图足够）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | `spring-transaction` 答案加箭头图 |
| `curriculum/answer-walkthrough.js` | 同步 |
| `docs/AI契约-变更记录规范.md` | §11 练习要求画图时答案须有图 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过

## 后续

- [x] 其它「画箭头 / 时序」类练习扫一遍 → 见 [2026-10-11-answer-diagrams-sweep.md](2026-10-11-answer-diagrams-sweep.md)
