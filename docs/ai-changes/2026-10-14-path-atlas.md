# 主线支线总图，点进关卡，核心挑战是 Boss

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-14-path-one-world.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

主线已经是九座石台的路。支线和核心挑战还折在某一关下面，点关卡也不会离开总图。三条线应该先都是这种路，点进去才进这一关。

## 决策

- 采用：`/paths` 没有 `gate`、`side`、`boss` 时是总图。主线九关、支线四条、Boss 一座，都用同一套石台和路。
- 采用：点主线进 `/paths?gate=`，点支线进 `/paths?side=`，点核心挑战进 `/paths?boss=core`。详情页有「回总图」。
- 采用：核心挑战的石台用宝石，状态写成 Boss。详情里是入门、加压、收口三档。
- 不采用：新路由。课文地址仍是 `/:track/:group/:lessonId`。支线不改九关进度。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 总图三张；点进主线、支线或 Boss 详情 |
| `web/src/components/learning/QuestBoard.tsx` | 关卡详情不再折支线和 Boss；支线、Boss 各自一页 |
| `web/src/styles/_reading.scss` | 总图石台收成整卡；Boss 宝石 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：退出码 0。
- 浏览器 `#/paths`：三张图，14 个石台，Boss 上有一颗宝石。748 与 390 都无横向溢出。
- 点第 1 关进入 `#/paths?gate=g1`，标题是下一课，按钮「开始这一场」，没有支线折页。「回总图」回到三张图。
- 点支线进入 `#/paths?side=fe`，标题「前端工程化」。点 Boss 进入 `#/paths?boss=core`，三档为入门、加压、收口。

## 后续

- [ ] 不要把支线和 Boss 再折回某一关的详情
- [ ] 试玩时不要点「记下」或交付印章，那会写关卡进度
- [ ] 未到的课仍可从详情里的链接打开

## 给下一模型

1. 先读：本文
2. 再读：`PathPage.tsx` 的 `CampaignMap`、`QuestBoard` 的 `sideId` / `bossPage`
3. 若续作：总图保持石台；详情用现有 query，不要新路由
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks`、`boss:core` 的任务 id
