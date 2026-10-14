# 架构师主线收成一张地图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-14-path-map-back.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

页上同时有一张遭遇卡、一张九关总图、再一张把九关重画一遍的关卡节点图。三套界面在讲同一件事。

## 决策

- 采用：九关总图是这一页的世界，开页就看见。站在哪一站，下面只展开这一站的子关，外加收起的支线和核心挑战。点另一站，总图留着，这一站换成那一关。
- 不采用 / 刻意不做：不再在总图下面铺第二张九关节点图；不再把总图收到第二屏。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 总图在上，当前这一场贴在图下 |
| `web/src/components/learning/QuestBoard.tsx` | 传入 `gateId` 时只渲染这一站 |
| `web/src/styles/_reading.scss` | 总图和这一场接成一块 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：类型检查通过。
- 浏览器 `/paths`：总图距顶 76px、高 445px、9 站。没有第二张节点总图。这一站 的子关在图下，支线默认收起。切到 `?gate=g-auth` 后，这一站变成「谁能改这一行」。没有点进课文。

## 后续

- [x] 一张地图，一站一件事
- [ ] 不要再把九关节点图铺回总图下面

## 给下一模型

1. 先读：本文
2. 再读：`web/src/pages/PathPage.tsx` 的 `.path-world`，`QuestBoard` 的 `gateId`
3. 若续作：总图保持开页可见；换站只改 `?gate=`
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks`
