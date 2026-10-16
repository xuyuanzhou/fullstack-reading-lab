# 选择题再开六关，补到 390 题

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | [选择题再开八关，补到 330 题](2026-10-16-choice-drill-further.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

330 题还没盖住入口怎么选、消息留在哪一套、持久化上下文，以及 Redis 复制和槽。进行中的关不能再加题。

## 决策

- 采用：只新增关卡。系统设计 d11–d12，SQL 优化 s12，服务性能排查 p13–p15。每关 10 题，至少 8 题正确。共 39 关、390 题。新数组接在 `moreSpread` 的最后，已有题的正确项字母不重排。结论对齐课文 `answer`。
- 不采用 / 刻意不做：不往已有关追加题目；不把新题插进 `DESIGN_FURTHER` 中间，否则后面的题字母会变；不点亮技能树；不清 `drill.log`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillLaterDesign.ts` | d11–d12 |
| `web/src/data/drillLaterSql.ts` | s12 |
| `web/src/data/drillLaterPerf.ts` | p13–p15 |
| `web/src/data/drillBank.ts` | 新数组接在 `PERF_FURTHER` 之后，并登记六个新关 |
| `scripts/drill.test.mjs` | 关卡数 39、题数 390 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：8 项通过，类型检查通过。大厅上系统设计 0/12、SQL 优化 0/12、服务性能排查 0/15。系统设计第 1 关仍是「本关 · 6/10」。

## 后续

- [ ] 再加题用新文件或接在三份 `drillLater*.ts` 末尾，并拼到 `moreSpread` 的最后。不要插到更前面的数组里。
- [ ] 知识点 id 先对一下已有 `DRILL_POINTS`，避免重名。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-16-choice-drill-further.md`
2. 再读：`web/src/data/drillBank.ts` 的 `moreSpread`，以及 `drillLaterDesign.ts`、`drillLaterSql.ts`、`drillLaterPerf.ts`
3. 若续作：正确项先写成 `b`。课文以 `curriculum-bodies-java.json` 的 `answer` 为准。
4. 禁区：勿改已经发布的 d1–d10、s1–s11、p1–p12 的题目名单；勿清空本机 `drill.log`。
