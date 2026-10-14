# 进主线转场：修好 WebGL 画布尺寸

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | [2026-10-14-warp-ease.md](2026-10-14-warp-ease.md)；首页「按主线学」→ `#/paths` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

点「按主线学」时，转场遮罩看起来像被拉糊的黑块，而不是雾面。采样发现 `.route-fx-gl` 的 CSS 已铺满视口（约 748×749），但 `canvas.width/height` 一直停在浏览器默认的 **300×150**，整段动画都没有真正画满。

## 决策

- 采用：卸载时不再对正式转场画布调用 `loseContext()`（React Strict Mode 会二次挂载；丢掉上下文后 `getContext` 失败，绘制循环起不来）。`runWarp` 在启动时同步画第一帧；失败返回 `null`，`WarpView` 改用 CSS 雾面。画布未就绪时用深色底，避免透出空画布。
- 不采用 / 刻意不做：不改 1500ms 时长和淡入淡出曲线；不改 splice / pullback。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/transition/warp.ts` | 同步首帧；清理时只取消 rAF；失败返回 null |
| `web/src/transition/RouteTransition.tsx` | WarpView 用 useLayoutEffect；GL 失败时用 fallback |
| `web/src/styles/_transition.scss` | warp 画布深色底 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json && node --experimental-strip-types --test ../scripts/page-transition.test.mjs
```

- 结果：类型检查与转场测试通过。浏览器从 `#/java/fullstack` 点「按主线学」：首帧起 canvas 为约 1122×1123（dpr），不再出现 300×150；`allSizedOk` 为 true。

## 后续

- [ ] 正式转场画布不要再在 cleanup 里 `loseContext`
- [ ] 预热用的离屏 canvas 仍可 loseContext

## 给下一模型

1. 先读：本文 + `2026-10-14-warp-ease.md`
2. 再读：`web/src/transition/warp.ts`、`RouteTransition.tsx` 的 `WarpView`
3. 若续作：中途截一张 opacity≈1 的雾面图核对着色
4. 禁区：不要把 `fract` / `atan` 加回 `WARP_FRAGMENT`
