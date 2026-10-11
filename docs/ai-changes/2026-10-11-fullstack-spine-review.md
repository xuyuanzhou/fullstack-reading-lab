# 全栈主线八课审查：去口语并对齐参考答案

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | 全栈主线 8 课；用户：审查并优化有问题的表述 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

主线前几课已局部改过，仍有「库里 / 没送到 / 转圈 / 抹掉 / 赶上 / 换组件库 / 两个示例 / 算会」等不清或口语说法；部分课 coverage 与 `answer-walkthrough` 答案不一致。

## 决策

- 采用：通读 `fs-four-layers`～`fs-ship-bar`，统一规范用语；竖切补英文括注；参考答案与 walkthrough 对齐。
- 不采用：改八课教学顺序或交付标准本身。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | 八课标题/提问/正文/练习/要点用语；补 `promptAnswer` |
| `curriculum/answer-walkthrough.js` | 与 coverage 练习答案同步 |
| `web/src/data/learningPaths.ts` | 架构师关卡 1 课注 |
| `web/src/data/curriculum*.json` | 导出 |

主要用词对照：没送到→请求未送达；没做成→未成功；转圈→加载指示；抹掉→覆盖；换组件库→更换界面组件库；两个示例→前后端各一个互不相关的示例；竖切→竖切（vertical slice）。

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：1055 lessons / 3173 knowledge points；verify 通过。
- 知识点含 `vertical slice` 括注；索引无「没送到」「换组件库」「两个示例」。

## 后续

- [ ] 主线以外课里的「没送到 / 对不上」可按契约分批改
- [ ] 不要把「库里」「算会」写回主线

## 给下一模型

1. 先读：本文 + `coverage-path-06.js` 前八课
2. 改主线练习答案时同步 `answer-walkthrough.js`
3. 禁区：四件事与竖切标准不要改成自拟「四层」
