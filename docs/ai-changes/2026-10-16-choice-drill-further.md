# 选择题再开八关，补到 330 题

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | [选择题另开九关，按课文补到 250 题](2026-10-16-choice-drill-full.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

250 题还没盖住约束口诀、跨进程决议、线程池界限和注册发现这几块课文。进行中的关不能再加题。

## 决策

- 采用：只新增关卡。SQL 优化 s9–s11，系统设计 d9–d10，服务性能排查 p10–p12。每关 10 题，至少 8 题正确。共 33 关、330 题。新题接在 `moreSpread` 已有数组的最后，正确项字母不重排。结论对齐课文 `answer`。
- 不采用 / 刻意不做：不往已有关的 `questionIds` 里追加；不重编号；不点亮技能树；不清 `drill.log`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillFurtherSql.ts` | s9–s11 |
| `web/src/data/drillFurtherDesign.ts` | d9–d10 |
| `web/src/data/drillFurtherPerf.ts` | p10–p12 |
| `web/src/data/drillBank.ts` | 新数组接在 `PERF_NEXT` 之后，并登记八个新关 |
| `scripts/drill.test.mjs` | 关卡数 33、题数 330 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：8 项通过，类型检查通过。大厅上系统设计 0/10、SQL 优化 0/11、服务性能排查 0/12。系统设计第 1 关仍是「本关 · 6/10」。

## 后续

- [ ] 再加题用新关和新题号，接在三份 `drillFurther*.ts` 末尾，再拼进 `moreSpread` 的最后。
- [ ] 不要把新题插到已有数组前面。`p10` 这样的题号不会被 `moreFor('p1')` 误收。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-16-choice-drill-full.md`
2. 再读：`web/src/data/drillBank.ts` 的 `moreSpread`，以及 `drillFurtherSql.ts`、`drillFurtherDesign.ts`、`drillFurtherPerf.ts`
3. 若续作：正确项先写成 `b`。知识点 id 不能和已有 `DRILL_POINTS` 重复。课文以 `curriculum-bodies-java.json` 的 `answer` 为准。
4. 禁区：勿改已经发布的 d1–d8、s1–s8、p1–p9 的题目名单；勿清空本机 `drill.log`。
