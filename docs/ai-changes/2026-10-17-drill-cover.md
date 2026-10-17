# 选择题补上语言、浏览器、框架和 Java 等卷

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [选择题补上全栈主线八关](2026-10-17-spine-drill.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

原来只有系统设计、SQL 优化、服务性能排查和全栈主线四卷。语言、浏览器、React、Vue、跨端、Java 基础、设计模式、算法、Spring、MyBatis、安全和 Netty 几乎没有题。

## 决策

- 采用：用 `scripts/build-drill-cover.mjs` 从课文 `promptAnswer` 生成新卷。正确项取该课结论里够表达判断的一两句。三个干扰项是同卷其它课的结论，错因写明那是另一课的结论。新题接在 `moreSpread` 最后。现在 14 门课、91 关、910 题。新卷 10 门、44 关、440 题。总图只挂关号，不带题干。
- 不采用 / 刻意不做：不改 d1–d12、s1–s12、p1–p15、m1–m8 的题目名单；不清 `drill.log`；不把新卷并进「三卷」徽章。凑不满 10 题的三节 Netty（水位与背压、长度域拆包、FileRegion）没有单独成关。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `scripts/build-drill-cover.mjs` | 按课文结论生成未覆盖课程的卷 |
| `web/src/data/drillCover.ts` | 十门新课的知识点、题目和关卡 |
| `web/src/data/drillCoverRoads.ts` | 总图用的关号，不含题干 |
| `web/src/data/drillBank.ts` | 登记课程、知识点、关卡，题目接在数组最后 |
| `web/src/data/drillOutline.ts` | 总图补上这十卷 |
| `web/src/data/drillRules.ts` | 增加语言、浏览器、React、Vue、跨端、Java、模式、Spring、安全、其余徽章 |
| `web/src/pages/DrillPage.tsx` | 大厅标题写上语言、界面和 Java |
| `scripts/drill.test.mjs` | 课程 14、关卡 91、题目 910 |

## 验证

```bash
node scripts/build-drill-cover.mjs
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：生成 10 门课、44 关、440 题。测试 9 项通过，类型检查通过。浏览器 `#/drill` 大厅列出十四门课，徽章 0/19。`#/drill/java/jb1` 能开题，正确项是该课结论。`#/paths` 选择题一栏有同样十四卷。没有提交答案，所以没有写入 `drill.log`。

## 后续

- [ ] 再生成时跑 `node scripts/build-drill-cover.mjs`，不要手改 `drillCover.ts`。
- [ ] 新题继续接在 `COVER_ASKS` 之后，不要插进 `SPINE_ASKS` 前面。
- [ ] 干扰项是别的课的正确结论。要写成针对这一问的误解，按关手改，不要整卷重写。
- [ ] `promptAnswer` 太短的课会被跳过。补课文字后再跑生成脚本，才能进卷。

## 给下一模型

1. 先读：本文和 `scripts/build-drill-cover.mjs`
2. 再读：`web/src/data/drillBank.ts` 的 `moreSpread`、`web/src/data/drillCoverRoads.ts`
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要改已发布的 d/s/p/m 题目名单；不要把题干写进 `drillOutline.ts` 或 `drillCoverRoads.ts`；「三卷」仍只计系统设计、SQL 优化和性能排查
