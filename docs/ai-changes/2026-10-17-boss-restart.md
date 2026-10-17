# Boss 到不了 80% 可以重开

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [Boss 补上缺课，打开就直接出题](2026-10-17-boss-cover-open.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

一场 Boss 一旦开始就必须按题答完。长考试里错题已经多到剩下全对也到不了 80% 时，还得把后面的题点完才能重开。答题过程里也看不到已经对了几题。

## 决策

- 采用：考试进度写成「已对 n · 至少 m 题」。未完成的 Boss 如果剩下的题全对也到不了 80%，讲评页和下一题页都给出「再答一遍」，丢掉这一场还没答完的记录后从第一题重开。
- 不采用 / 刻意不做：不给章节闯关中途放弃。不把没答的题记成错题。不改已经发布的题目。不把章节里答过的题算进考试。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillRules.ts` | 进行中的一场带上已对题数；Boss 可丢掉未完成的一场 |
| `web/src/state/learningState.ts` | 增加重开 Boss 的动作 |
| `web/src/state/slices/businessSlice.ts` | 重开只删这场未完成的 Boss |
| `web/src/pages/DrillPage.tsx` | 进度写已对题数；到不了 80% 时可以重开 |
| `scripts/drill.test.mjs` | 「到工作里推动」错两题后可以重开，章节记录不动 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：选择题测试 13 项通过，类型检查通过。浏览器打开「上线后能看见故障」，第一题进度是「考试 · 1/31 · 已对 0 · 至少 25 题」。选了一项之后「确认这题」才可点。没有提交答案，所以没有在页面上点到「再答一遍」。

## 后续

- [x] 多选干扰项仍是别的课的正确结论。Boss 副本已按关改写，见 [Boss 干扰项改成这一问的误解](2026-10-17-boss-distractors.md)。章节题库未改。

## 给下一模型

1. 先读：本文，以及 `drillRules.ts` 的 `examOutOfReach`、`dropOpenAttempt`
2. 再读：`DrillPage.tsx` 里 `lost`
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要把没答的题记成错；不要让章节闯关中途放弃；不要改已经发布的题目
