# 总图最下面接上选择题

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | 架构师主线、选择题大厅 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

选择题只在顶栏。总图上的笔试专关是人打分的开放题，和答对 80% 的选择题不是同一件事。

## 决策

- 采用：笔试专关下面单独一块。一块石台，每门课一颗石子。词和大厅相同：可以开始、进行中、第 n 关、已通过。点一门进 `#/drill/:courseId`。从总图进去的，课程页写「回总图」。
- 不采用 / 刻意不做：不画成剑客石门，也不把选择题算进九关。题干不进总图，只留课名、关号和题号。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillOutline.ts` | 四门课的关号和题号，以及和大厅一致的状态 |
| `web/src/pages/PathPage.tsx` | 总图底部的选择题入口 |
| `web/src/pages/DrillPage.tsx` | 从总图进来时，返回链回总图 |
| `web/src/styles/_reading.scss` | 石子和状态 |
| `scripts/drill.test.mjs` | 总图状态必须和大厅一致，索引里不能出现题干 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：9 项测试通过，类型检查通过。浏览器 `#/paths` 上系统设计是「进行中」，SQL 优化和服务性能排查、全栈主线是「可以开始」。点 SQL 优化进入 `#/drill/sql`，返回是「回总图」；点进第一关再退回课程，仍是「回总图」，点它回到总图。没有作答。

## 后续

- [ ] 题库加减关时，同步 `drillOutline.ts`。测试会拦住漏改。
- [ ] 不要把这四门课画进九关石门，也不要改 80% 和 `drill.log`。

## 给下一模型

1. 先读：本文和 `web/src/data/drillOutline.ts` 的 `drillRoadFaces`
2. 再读：`web/src/pages/PathPage.tsx` 里 `aria-label="选择题"` 的那一块
3. 若续作：大厅仍用 `describeGate`。总图只用题号判断通关和是否答到一半
4. 禁区：勿改 `pointsOf` 和通关百分比
