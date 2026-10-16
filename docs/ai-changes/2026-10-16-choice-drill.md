# 系统设计、SQL、性能排查做成选择题闯关

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 选择题闯关：系统设计、SQL 优化、服务性能排查 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

三门课已有课文，缺一套按难度递进的选择题。学员要能按关作答、看错因、重练错题、用复活再闯，并在报告里看到仍然答错的知识点。

## 决策

- 采用：独立路由 `#/drill`，不并入九道掌握关，也不并入 `g-order-scale`。三门课各 3 关、每关 5 题，共 45 题。每题 4 个选项、1 个正确项，解析写明错项原因并链回课文。同门必须答完上一关且正确率达到 80%（5 题至少 4 题）才打开下一关；三门课互不阻挡。只持久化 `drill.log`。积分、通关、复活、徽章、报告都从日志推导，避免多标签合并时重复加分。首次整关作答不耗复活；之后每一次有作答的整关重开耗 1 次。复活从 2 次起，上限 3。一组错题在该次作答之后、下一次整关之前全部练对，补回 1 次。已通过的关不能再刷分。薄弱点只看每题最近一次；没答过的不算薄弱。大厅先排课程卡，徽章放在下面。
- 不采用 / 刻意不做：不点亮技能树；不改已发布题目编号（未知题号在归一化时丢掉，进度会少掉对应记录）；不把操作系统关或这套选择题写进掌握关。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillBank.ts` | 三门课、45 个知识点、45 题、9 关；正确项字母打散 |
| `web/src/data/drillRules.ts` | 归一化、合并、80% 通关、解锁、积分、复活、徽章、报告 |
| `web/src/pages/DrillPage.tsx` | 大厅、课程关卡、答题、解析、结果、报告 |
| `web/src/styles/_drill.scss` | 闯关画面（印、进度环）；徽章在课程卡下方 |
| `web/src/App.tsx` | `/drill`、`/drill/report`、课程与关卡路由 |
| `web/src/components/AppLayout.tsx` | 顶栏「选择题」；本页显示积分并收起右侧进度栏 |
| `web/src/styles/main.scss` | 引入闯关样式 |
| `web/src/types/curriculum.ts` | `ProgressState.drill` |
| `web/src/state/progressStorage.ts` | 读入归一化；合并日志后再抬版本 |
| `web/src/state/progressSnapshot.ts` | 快照带上 `drill` |
| `web/src/state/learningState.ts` | `answerDrill` |
| `web/src/state/slices/businessSlice.ts` | 写入答案；记录版本更新时拒绝改写 |
| `web/src/state/progress.tsx` | 对外状态带上 `drill` |
| `web/package.json` | 测试脚本加入 `scripts/drill.test.mjs` |
| `scripts/drill.test.mjs` | 题库、80%、顺序、复活、重练补回、合并、只读拒绝 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
```

- 结果：8 项通过。浏览器在 `http://127.0.0.1:5191/#/drill`：三门课程卡在徽章之上；系统设计 1/3 已通过。`#/drill/design` 第 2 关可以开始，第 3 关仍是「先通过上一关」。第 1 关 4/5、正确率 80%、积分 60、复活 2。错题重练把「单体何时够用」答对后，解析写出三个错项原因并链到「单体与模块化单体」；复活补到 3，积分 64。`#/drill/report` 显示已答 5 题、最近一次 5 题全对，没有剩余薄弱点。

## 后续

- [x] 大厅课程卡放在徽章前面。
- [ ] 不要重编号已发布的 `d1-1` 这类题号；改题干可以，改编号会让旧日志对不上。
- [ ] 不要让这套选择题点亮技能树，也不要把它并进九道掌握关。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/drillBank.ts`、`web/src/data/drillRules.ts`、`web/src/pages/DrillPage.tsx`
3. 若续作：正确项字母由 `place()` / `spread()` 打散，改题时不要把答案写死成某一个字母。积分和复活不要另存一份计数。
4. 禁区：勿改九道掌握关与 `g-order-scale`；勿清空学员本机 `fullstack-learning-lab-v3` 里已有的 `drill.log`。
