# 选择题每关加到 10 题，并加长路径

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | [系统设计、SQL、性能排查做成选择题闯关](2026-10-16-choice-drill.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

三门课各 3 关、每关 5 题，一共 45 题，一条路径太短。已经作答的题号不能改，否则旧日志会对不上。

## 决策

- 采用：每关 10 题，正确率仍是 80%（10 题至少 8 题）。系统设计、SQL 优化各 5 关，服务性能排查 6 关，共 160 题。新题接在原题号后面（`d1-6` 起），正确项仍由 `spread` 打散。新题的结论对齐课文里已经写明的说法。日志上限从 480 提到 4000，避免加长之后把早期作答裁掉。徽章文案改成「每一关都已通过」。
- 不采用 / 刻意不做：不重编号 `d1-1` 到 `p3-5`；不把选择题并进掌握关或技能树；不把已经答过的 5 题算作 10 题关卡已经通过。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillMoreDesign.ts` | 系统设计加题与新知识点 |
| `web/src/data/drillMoreSql.ts` | SQL 优化加题与新知识点 |
| `web/src/data/drillMorePerf.ts` | 性能排查加题与新知识点 |
| `web/src/data/drillBank.ts` | 关卡拼上新题；新增 d4、d5、s4、s5、p4、p5、p6 |
| `web/src/data/drillRules.ts` | 日志上限 4000；徽章不再写死「三关」 |
| `web/src/styles/_drill.scss` | 进度点可以换行 |
| `scripts/drill.test.mjs` | 按 10 题和 80% 断言 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
./web/node_modules/.bin/tsc --noEmit -p web/tsconfig.app.json
```

- 结果：8 项通过，类型检查通过。`#/drill` 上系统设计、SQL 优化是 0/5 关，性能排查是 0/6 关。已答过前 5 题的第 1 关显示进行中，打开后是「本关 · 6/10」，第 2 关仍锁着。

## 后续

- [ ] 不要重编号已发布题号。再加题用新的 id，接在该关 `questionIds` 末尾。
- [ ] 不要把这套选择题点亮技能树，也不要并进九道掌握关。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-16-choice-drill.md`
2. 再读：`web/src/data/drillMoreDesign.ts`、`drillMoreSql.ts`、`drillMorePerf.ts`、`drillBank.ts` 里的 `moreFor`
3. 若续作：新题先按课文 `promptAnswer` 写对，再写三个错项。`place` / `spread` 会改正确项字母，不要在页面里写死字母。
4. 禁区：勿改 `d1-1` 至 `p3-5` 的编号和原有选项顺序；勿清空本机 `drill.log`。加题之后，只答过旧题的关卡会变成进行中，下一关会重新锁上，直到这一关对新题也达到 80%。
