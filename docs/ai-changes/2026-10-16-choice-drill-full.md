# 选择题另开九关，按课文补到 250 题

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | [选择题每关加到 10 题，并加长路径](2026-10-16-choice-drill-more.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

160 题仍盖不住索引、事务、拆分、缓存命令和回收范围这几块课文结论。进行中的第 1 关不能再加题，否则旧的 10 题进度会被拉长。

## 决策

- 采用：只新增关卡，每关仍是 10 题、至少 8 题正确。系统设计 d6–d8，SQL 优化 s6–s8，服务性能排查 p7–p9。共 25 关、250 题。新题接在 `moreSpread` 已有数组的后面，正确项字母不重排。结论对齐课文 `answer` / `core`。
- 不采用 / 刻意不做：不往 d1–p6 的 `questionIds` 里追加；不重编号已发布题号；不点亮技能树；不并进九道掌握关；不清 `drill.log`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillNextDesign.ts` | d6–d8 的知识点与题目 |
| `web/src/data/drillNextSql.ts` | s6–s8 的知识点与题目 |
| `web/src/data/drillNextPerf.ts` | p7–p9 的知识点与题目 |
| `web/src/data/drillBank.ts` | 新数组接在已有 `moreSpread` 之后，并登记九个新关 |
| `scripts/drill.test.mjs` | 关卡数 25、题数 250 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：8 项通过，类型检查通过。`http://127.0.0.1:5191/#/drill` 上系统设计、SQL 优化是 0/8 关，性能排查是 0/9 关。进行中的系统设计第 1 关仍是「本关 · 6/10」，题干仍是「框图上已经有网关、缓存和消息队列」，第 2 关仍锁着。积分 40、复活 2 未改。

## 后续

- [ ] 再加题用新关卡和新题号，接在 `DESIGN_NEXT` / `SQL_NEXT` / `PERF_NEXT` 末尾，再拼进 `moreSpread` 的最后。
- [ ] 不要把新题插到 `DESIGN_MORE` 前面，否则已作答题的正确项字母会变。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-16-choice-drill-more.md`
2. 再读：`web/src/data/drillBank.ts` 的 `moreSpread` 与 `moreFor`，以及三份 `drillNext*.ts`
3. 若续作：新题的正确项先写成 `b`，由 `spread(..., 3)` 打散。课文结论以 `curriculum-bodies-java.json` 里该课的 `answer` 为准。
4. 禁区：勿改 d1–p6 的题目名单；勿清空本机 `fullstack-learning-lab-v3` 里的 `drill.log`。
