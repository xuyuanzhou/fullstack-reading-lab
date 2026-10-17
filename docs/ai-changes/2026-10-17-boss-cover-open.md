# Boss 补上缺课，打开就直接出题

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [Boss 改成每一课一题](2026-10-17-boss-one-each.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

「上线后能看见故障」有 7 课还没有选择题，这场考试盖不到。进考试还要再点一次「开始答题」，规则在关卡页已经写过。

## 决策

- 采用：这 7 课各补一题，只放进这一关的考试，不进章节题库。结论对齐课文。打开一场还没开始的考试，直接是第一题，进度写明至少答对几题。
- 不采用 / 刻意不做：不改已经发布的章节题目。不把章节里答过的题算进考试。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/bossExam.ts` | 7 课的考试题 |
| `web/src/data/drillBank.ts` | 这些题的知识点可以查到 |
| `web/src/pages/DrillPage.tsx` | 新考试直接出第一题，并写明至少答对几题 |
| `scripts/drill.test.mjs` | 「上线后能看见故障」每一课都有题 |
| `docs/ai-changes/2026-10-17-boss-one-each.md` | 勾掉缺课这一项 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：选择题测试通过，类型检查通过。浏览器打开「上线后能看见故障」的考试，直接是第 1 题，进度为「考试 · 1/31 · 至少答对 25 题」。没有提交答案。

## 后续

- [ ] 无

## 给下一模型

1. 先读：本文和 `web/src/data/bossExam.ts` 的 `GAPS`
2. 再读：`DrillPage` 里 `freshExam`
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要把这 7 题写进章节题库；不要改已经发布的章节题目
