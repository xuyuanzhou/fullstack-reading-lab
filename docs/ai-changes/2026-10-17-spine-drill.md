# 选择题补上全栈主线八关

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [选择题再开六关，补到 390 题](2026-10-16-choice-drill-later.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

选择题原来只有系统设计、SQL 优化和服务性能排查。主线要先分清的四层、写入、读取、授权、测试、定位和发布，不在这三卷里。

## 决策

- 采用：新增课程「全栈主线」，八关 m1–m8，每关 10 题，共 47 关、470 题。结论对齐课文 `answer`。新题接在 `moreSpread` 最后。大厅和总图在宽屏排四列，1100px 以下两列，800px 以下一列。「三卷」仍只计原来的三门。
- 不采用 / 刻意不做：不往已有关加题；不改 d1–d12、s1–s12、p1–p15 的题目名单；不清 `drill.log`；不把主线并进「三卷」徽章。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillSpine.ts` | 主线八关的知识点和题目 |
| `web/src/data/drillBank.ts` | 登记课程、关卡，并接在数组最后 |
| `web/src/data/drillOutline.ts` | 总图补上这一卷的关号 |
| `web/src/data/drillRules.ts` | 增加「主线」徽章 |
| `web/src/styles/_drill.scss` | 大厅四列，窄屏两列再收成一列 |
| `web/src/styles/_reading.scss` | 总图上的选择题同样排 |
| `scripts/drill.test.mjs` | 课程 4、关卡 47、题目 470 |
| `web/src/pages/DrillPage.tsx` | 大厅标题写上主线 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：9 项通过，类型检查通过。浏览器 `#/drill` 有四门课，徽章 0/9。1280px 宽四列，390px 宽一列，没有横向溢出。`#/drill/spine` 有八关，第一关是「四件事各管一层」。

## 后续

- [ ] 再加题用新文件，拼到 `moreSpread` 的最后。不要插进 `SPINE_ASKS` 前面的数组。
- [ ] 关号不要用会和 `m1-` 这种前缀撞车的写法；`m10-` 不会被 `m1-` 吃掉，但仍应先看 `moreFor`。
- [ ] 知识点 id 用 `sp-` 前缀，先对一下已有 `DRILL_POINTS`。

## 给下一模型

1. 先读：本文和 `web/src/data/drillBank.ts` 的 `moreSpread`
2. 再读：`web/src/data/drillSpine.ts`
3. 若续作：正确项先写成 `b`。课文以各课 `answer` 为准
4. 禁区：勿改已经发布的三卷题目名单；勿清空本机 `drill.log`；勿把 `home → levels` 改回雾面
