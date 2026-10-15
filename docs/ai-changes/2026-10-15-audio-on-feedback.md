# 打开音效立刻试听，营地换站也有轻响

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | 顶栏音效开关；转场只在进出 `/paths` 播 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

点开音效只写 localStorage 并 `resume` AudioContext，不播任何声。营地里大量跳转只改 query，不改 pathname，转场音永远不触发，用户会以为坏了。

## 决策

- 采用：打开开关时在同一次点击里播确认音。
- 采用：`/paths` 内 query 变化时播轻响（不铺遮罩）。
- 采用：转场 cue 音量略抬高，仍克制。
- 不采用：全站导航都播音乐；不为 reduced-motion 用户强行播转场音（确认音除外）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/transition/audio.ts` | `playToggleCue` / `playCampTick`；音量 |
| `web/src/transition/RouteTransition.tsx` | 监听 `location.search` |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 浏览器：点喇叭应立刻听到一声；再在 `#/paths` 点进一关应有轻响。

## 后续

- [ ] 若仍无声，查系统静音与浏览器站点权限
- [ ] 勿把音效默认改成开

## 给下一模型

1. 先读：本文
2. 再读：`audio.ts`、`RouteTransition.tsx`
3. 若续作：确认音必须留在用户手势回调里
4. 禁区：勿自动开音效；勿给非营地页加遮罩特效
