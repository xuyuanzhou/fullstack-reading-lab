# Boss 干扰项改成这一问的误解

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [Boss 到不了 80% 可以重开](2026-10-17-boss-restart.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

Boss 优先抽多选。这 45 道多选的错项是别的课的正确结论，讲评只说「这一句是另一课的结论」。知道那一课的人会把它当成这一问也该选。

## 决策

- 采用：只改 Boss 副本的错项和错因，写成对这一问的误解。正确项、题干和答案字母不动。九场考试里借来的错项都换掉。
- 不采用 / 刻意不做：不改章节题库，不重跑生成脚本，不把章节里答过的题算进考试。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/bossDistractors.ts` | 45 课的错项 |
| `web/src/data/bossExam.ts` | 组考试时套上这些错项，不改正确项 |
| `scripts/drill.test.mjs` | 错因不再提别的课；正确项与章节原题一致 |
| `docs/ai-changes/2026-10-17-boss-restart.md` | 勾掉这一项 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：选择题测试 14 项通过，类型检查通过。浏览器打开「走通一次下单」，第一题仍是多选。错项 A 是「写成同一个对象，改一处就四处一起对齐」，不再是别的课那句「服务器状态、表单状态、请求状态是三份数据」。B 和 C 可以同时点住。没有提交答案。章节原题 `xsp1-1` 的第一项仍是那句旧错项。

## 后续

- [ ] 章节多选的错项仍是别的课的正确结论。要按关手改副本或另存，不要重跑 `build-drill-multi.mjs` 覆盖已发布题目

## 给下一模型

1. 先读：本文和 `web/src/data/bossDistractors.ts`
2. 再读：`bossExam.ts` 的 `withDistractors`
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要改章节题库里的题干和选项；不要重跑多选生成脚本；不要改 Boss 正确项的文字和字母
