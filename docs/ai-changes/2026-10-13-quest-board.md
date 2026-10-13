# 子关、支线和核心挑战分成三路

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | 游戏化关卡：子任务独立成关、并行补强改支线、当次任务改小 boss |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

九关地图能点开任意关。当次任务是三道按时长换的题，四条并行补强只是静态入口，没有各自的目标、解锁、进度和奖励。

## 决策

- 采用：在九关交付物上拆出子关，一条主线按顺序解锁。四条补强改成支线，随时可做，可同时进行，不看九关进度。当次三题收成核心挑战，分入门、加压、收口；每一档要先保存该题草稿，不能跳档。通关多发三枚阶段标记和一枚专属标记。地图用「全部 / 主线 / 支线 / 小 boss」分开看。奖励只是本机标记。完成动画尊重 `prefers-reduced-motion`。
- 不采用 / 刻意不做：不提高 `schemaVersion`。不把支线写进 `MASTERY_GATES`，不改九关勾选，不把标记写成已通过或能力认证。课仍然可以直接打开。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/questBoard.ts` | 子关、支线、核心挑战的目标、解锁、节点、奖励，以及合并规则 |
| `web/src/state/learningEvidence.ts` | 学习记录增加 `quests`；记进度不写证据 |
| `web/src/state/progressStorage.ts` | 保存和跨标签合并带上 `quests` |
| `web/src/state/progress.tsx` | `applyQuest` |
| `web/src/components/learning/QuestBoard.tsx` | 关卡地图、子关、支线、核心挑战和通关动画 |
| `web/src/components/learning/CurrentTask.tsx` | 核心挑战可以指定打开哪一档 |
| `web/src/components/SideTracks.tsx` | 支线课链可按一条渲染 |
| `web/src/pages/PathPage.tsx` | 页内位置改成地图、子关、支线、核心挑战 |
| `web/src/styles/_reading.scss` | 三类节点和通关动画；减少动效时关掉动画 |
| `scripts/learning-platform.test.mjs` | 解锁、一次奖励、支线并行、合并不丢进度 |

## 验证

```bash
cd web && npm test
npx tsc --noEmit -p tsconfig.app.json
```

- 结果：44 条测试通过，类型检查通过。
- 浏览器 `http://127.0.0.1:5178/#/paths`：第一子关记下后第二项可记、第三项仍锁着；前端工程化和云与平台可以各进一步，主线第二关仍未解锁。核心挑战在没有草稿时提示先保存。三档都保存后再记，出现「成就解开 / 通过核心挑战」，并列出三档标记。选「支线」后主线和核心挑战从地图上拿开。九关状态没有被改成已过。核对用的进度已从本机记录去掉，原有笔试草稿还在。

## 后续

- [ ] 不要把这四条支线写进 `MASTERY_GATES`，也不要用关卡奖励改 `pathChecks`。
- [ ] 奖励 id 只发一次。同一关合并时取走得更远的一步，不要按保存时间覆盖。
- [ ] 核心挑战的下一档要该题已有未删除草稿。空句子不发奖励。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/questBoard.ts`、`web/src/components/learning/QuestBoard.tsx`、`web/src/state/learningEvidence.ts` 的 `quests`
3. 若续作：新子关继续用冻结交付物 id，形如 `sub:g1.four-roles`。支线 id 是 `side:` 加 `sideTracks.ts` 的 id。
4. 禁区：不要提高 `schemaVersion` 来塞这批字段；旧的 schema 2 记录没有 `quests` 时读成空数组。不要把本机标记显示成已通过。
