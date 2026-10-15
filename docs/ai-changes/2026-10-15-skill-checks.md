# 基础验证标上技能，进阶题不点亮

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/技能树加页设计-2026-10-15.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

技能页的本地检查标记只认三道书写任务里的两道。选择题选对也会写成本地检查通过，但题目没有技能 id，印章不会多一颗石。进阶题如果也点亮，就会把不计入过关的题当成这项能力的证据。

## 决策

- 采用：每道笔试写下 `skillIds`。`skillHasLocalCheck` 只在基础题（当场任务，或题号以 W1 结尾）本地检查通过时返回真。同一幂等键的实验任务同时标 MySQL 和幂等。
- 采用：G2-W1 点亮 MySQL 与 Java 并发，G3-W1 点亮 SQL，G4-W1 点亮安全，G5-W1 点亮测试，G6-W1 点亮压测。进阶题也写下对应技能，但本地检查通过不点亮。
- 不采用：不改 `gateCleared`。不把阅读数或自评草稿点亮印章。书写任务「四段职责」仍不单挂一项技能。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningTasks.ts` | 笔试题的 `skillIds`；幂等实验加上 `idem` |
| `web/src/data/learningSkills.ts` | 基础题的本地检查才点亮 |
| `scripts/learning-platform.test.mjs` | 基础题点亮，进阶题不点亮；双框架按 id 查找 |
| `docs/技能树加页设计-2026-10-15.md` | 切片 3 标成已落地 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：类型检查通过，学习平台测试 20 项通过。
- 浏览器 `#/skills`：76 枚印章都在，当前没有本地检查标记（`data-boost` 为 0）。没有点印章。总图仍是「走通一次下单 · 旧版已过」「把写入做对 · 进行中」。

## 后续

- [x] 基础验证标上技能，进阶题不点亮
- [ ] 课库以后再补的课，同步挂进对应技能
- [ ] 没有课文的路线图单元先不要画成节点

## 给下一模型

1. 先读：本文与 `docs/技能树加页设计-2026-10-15.md`
2. 再读：`learningTasks.ts` 的 `skillIds`，`learningSkills.ts` 的 `skillHasLocalCheck`
3. 若续作：新的基础题要写 `skillIds`。进阶题可以写，但不要让它通过 `verifyTier === 'base'` 这一关
4. 禁区：勿改 `gateCleared`；勿把进阶记下或自评点亮印章；勿把已点亮写成认证
