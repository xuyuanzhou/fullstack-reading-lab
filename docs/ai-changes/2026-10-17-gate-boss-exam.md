# 关卡通过要加上一场选择题 Boss

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [选择题按章节排，不再凑满 10 题](2026-10-17-drill-by-chapter.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

九关是否通过只看必读和交付勾选。总图上的核心挑战是另一条记录，不改变这九关。

## 决策

- 采用：每一关一场 Boss，用选择题闯关来考。题目从这一关课文里已有的选择题复制出来，单独记分。答完这一场，正确率达到 80%，再加上必读和交付都齐，这一关才算通过。没到 80% 可以再答一遍，不消耗选择题的复活次数。
- 不采用 / 刻意不做：不改已有选择题的题目名单，也不把章节里答过的题算进这场考试。总图上的核心挑战三档仍单独记。验证石台仍不单独决定通过。不写成认证。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/bossExam.ts` | 九关各一场考试 |
| `web/src/data/drillBank.ts` | 考试题可以查到，不进章节列表 |
| `web/src/data/drillRules.ts` | 考试是否通过；Boss 不锁、重答不耗复活 |
| `web/src/data/learningPaths.ts` | `gateCleared` 加上这场考试 |
| `web/src/data/skillCycle.ts` | 称号跟着关卡通过走 |
| `web/src/data/gateVerify.ts` | 说明改成阅读、交付和 Boss 都要齐 |
| `web/src/pages/PathPage.tsx` | 关卡页增加 Boss 石台 |
| `web/src/pages/DrillPage.tsx` | 考试页沿用选择题，答完回这一关 |
| `web/src/components/ProgressAside.tsx` | 阅读和交付都齐之后，提示去打 Boss |
| `scripts/drill.test.mjs` | 九场考试，以及通过后关卡才算过 |
| `scripts/learning-platform.test.mjs` | 没有考试记录时关卡不算过 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：测试 34 项通过，类型检查通过。浏览器 `#/paths?gate=g1` 有「打 Boss」，状态是「可以开始」。考试页写明 22 题、至少 18 题（80%）。没有提交答案。

## 后续

- [ ] 关卡 5 里有 7 课还没有选择题，这场考试盖不到它们。
- [ ] 题数跟着这一关已有的选择题走，不凑 10 题。最短是关卡 6 的 7 题。

## 给下一模型

1. 先读：本文和 `web/src/data/bossExam.ts`
2. 再读：`gateCleared` 的第四个参数，以及 `pathExamCleared`
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要把章节答题记录算成这场考试已通过；不要改已发布选择题的题目名单；不要把通过写成认证
