# 总图主线、支线、Boss 收成一套构图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-14-path-atlas.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`#/paths` 总图把主线、支线、Boss 做成三张等权竖卡。主线九关还像一张路，支线四站被拉成同样宽的蛇形，Boss 只剩一颗石台，整页像三块拼贴。

## 决策

- 采用：页首一句总说明。主线独占主视觉。支线与 Boss 并排成副带：支线仍是石台路，Boss 改成宝石 climax 卡（目标句 + 可挑战），不再用单点 CampaignMap。
- 采用：三块共用 `atlas-panel` 边框与「标题 + 一句角色」头。
- 不采用：把三条线画进同一条蛇；不锁课文；不改 query。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 总图层级与 Boss 卡 |
| `web/src/styles/_reading.scss` | 总图 lead、panel、secondary、boss 卡 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：见本会话。
- 浏览器 `#/paths`：主线在上；支线与 Boss 并排；Boss 能读到能力句。

## 后续

- [ ] 窄屏继续上下叠，宽屏保持副带并排
- [ ] 勿把支线再折回某一关详情

## 给下一模型

1. 先读：本文
2. 再读：`PathPage` 的 `path-atlas`、`.atlas-secondary`
3. 若续作：只调比例与文案，不要再拆成三张等权竖卡
4. 禁区：勿改 `gateCleared`、交付 id、支线/Boss query
