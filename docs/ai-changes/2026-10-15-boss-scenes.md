# Boss 有几档就几座石台，一点进一场

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-15-boss-redesign.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

核心挑战挤在一张卡 / 一页里：三档、真题、记下叠在一起。用户要求有几档就几座关卡或场景，不要全挤一块。

## 决策

- 采用：总图 Boss 用石台路，一档一座。点进 `#/paths?boss=core&scene=<taskId>` 只开这一档。
- 采用：`?boss=core` 无 scene 时先看三档石台；单档页只挂该题 `CurrentTask` 与记下。
- 不采用：再把三档列表和全部真题摊在同一屏。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | Boss 石台路与单档详情 |
| `web/src/components/learning/QuestBoard.tsx` | 去掉挤在一起的 `bossPage` |
| `web/src/styles/_reading.scss` | 副带等宽；Boss 单档区 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：见本会话（若另有无关笔试类型错误，不阻塞本改动核对）。

## 后续

- [ ] 浏览器：总图 Boss 三座；点入门只见入门题
- [ ] 记下仍按顺序；可预览后面档但不跳档记进度

## 给下一模型

1. 先读：本文
2. 再读：`PathPage` 的 `bossNodes` / `bossPick`
3. 若续作：里程碑增减只改 `bossQuest().milestones`
4. 禁区：勿改 `boss:core` id 与任务 id；勿把三档再挤回一页
