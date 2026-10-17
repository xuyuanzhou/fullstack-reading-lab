# Boss 改成每一课一题

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [关卡通过要加上一场选择题 Boss](2026-10-17-gate-boss-exam.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

一场 Boss 把这一关已有的选择题整份再考一遍。第一关 8 课变成 22 题，开场把同一段规则说了两遍。题一多，进度点就铺成好几行。

## 决策

- 采用：每一课抽一题。这一课有多选就用多选。正确率仍是 80%。超过 12 题时，进度改成一条。关卡上的 Boss 计量显示已答题数。考试结果不再提复活次数。
- 不采用 / 刻意不做：不改章节里的题目名单，也不把章节答题算进这场考试。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/bossExam.ts` | 每一课一题，优先多选 |
| `web/src/pages/PathPage.tsx` | Boss 计量改成题数 |
| `web/src/pages/DrillPage.tsx` | 开场少重复一句；长关用进度条；考试结果不提复活 |
| `web/src/styles/_drill.scss` | 长关进度条 |
| `scripts/drill.test.mjs` | 考试题数不超过这一关的课数 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：测试 34 项通过，类型检查通过。第一关考试是 8 题，至少答对 7 题。第一题是多选，进度是 1/8。关卡计量是 Boss 0/8。没有提交答案。

## 后续

- [x] 「上线后能看见故障」有 7 课还没有选择题，这场考试是 24 题，盖不到那 7 课。见 [Boss 补上缺课并直接开考](2026-10-17-boss-cover-open.md)。

## 给下一模型

1. 先读：本文和 `web/src/data/bossExam.ts` 里怎么抽题
2. 再读：`DrillTrack`，超过 12 题才用进度条
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要把一场考试再铺回这一关的全部选择题；不要改章节题目名单
