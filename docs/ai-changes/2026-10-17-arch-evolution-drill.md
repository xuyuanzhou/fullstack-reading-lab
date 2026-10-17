# 演进全流程单独一门选择题

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [同一笔订单串起架构演进全流程](2026-10-17-arch-evolution-flow.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

12 课已进课表，选择题还没有按这 12 课出题。放进已有的系统设计卷会排在十几关后面，不通过前面的关就打不开。

## 决策

- 采用：Java 块里、系统设计后面新增「演进全流程」一门，一关 12 题，每课一题。正确项是该课结论。错项是这一问的误解。关号 `xevo` 以 `x` 开头，所以不必凑满或截成 10 题。
- 不采用 / 刻意不做：不改九关 Boss 的通过条件，不把这 12 课塞进关卡 8。不重跑 `build-drill-multi.mjs`。不改课上的选型结论，不把 CSDN 写成对象存储。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillEvolution.ts` | 12 个知识点和 12 道单选 |
| `web/src/data/drillBank.ts` | 课程 `evo`、关卡 `xevo` |
| `web/src/data/drillOutline.ts` | 总图和 Java 块接上这门 |
| `web/src/data/drillRules.ts` | 学习报告增加「演进」 |
| `scripts/drill.test.mjs` | 课程 26、关卡 135、题目 1399 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：选择题测试 14 项通过，类型检查通过。浏览器打开 `/#/drill/evo/xevo`，第一题选对后显示「这题答对了」和三条错因；第二题选错后显示「这题答错了」，并链回单体那一课。大厅 Java 块里「演进全流程」在系统设计后面，状态为进行中。

## 后续

- [ ] 不要重跑 `build-drill-multi.mjs` 覆盖已发布题目。
- [ ] 不要把这 12 题并进关卡 8 的 Boss，除非同时改通过条件和 `xb-g5` 的覆盖断言。
- [ ] 半同步仍以 MySQL 8.4 为准：等的是中继日志，不是从库已经能查到。

## 给下一模型

1. 先读本文，再读 `web/src/data/drillEvolution.ts`。
2. 入口：`/#/drill/evo/xevo`。这门只有一关，打开就能答。
3. 改题时保持四选项、唯一正确项，错因不要写成「这是另一课的结论」。
4. 禁区：不要改 `curriculum/coverage-path-13.js` 的选型结论来迁就题目。
