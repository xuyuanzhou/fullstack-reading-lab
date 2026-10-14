# 总图和这一站的按钮进同一屏

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-14-path-map-full.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

九关总图整张铺开之后，主按钮还在目标句和进度条下面，短窗口里要滚一下才走得了。总图不能再砍成半截滚动。

## 决策

- 采用：主按钮放进 `.here-row`，和关名、短标题同一行；目标句和进度条留在按钮下面。
- 采用：总图继续 `max-height: none`，九关整张看见。
- 不采用：把总图再压回 `320px` 滚动窗。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | `.encounter-go` 挪到标题右侧，去掉单独的 `.encounter-actions` |
| `web/src/styles/_reading.scss` | `.here-row` 左右排开，窄屏允许换行 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：`tsc` 退出码 0。
- 浏览器 `#/paths`，748×915：总图高 445，九站都在，按钮底边 589，在第一屏内。
- 390×844：总图高 567，整张在屏内，按钮底边 777，无横向溢出。阅读阶段按钮是「开始这一场」，没有交付卡片，步骤没有「未解锁」。

## 后续

- [ ] 更矮的手机（视口低于约 780）若按钮掉出第一屏，只收紧总图行距，不要再限高
- [ ] 不要点「开始这一场」做核对，那会写阅读记录

## 给下一模型

1. 先读：本文 + `2026-10-14-path-map-full.md`
2. 再读：`PathPage.tsx` 的 `.here-row`、`.path-world .path-map-scroll`
3. 若续作：总图保持整张；按钮留在标题行
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks`；勿把 `#quest-map` 铺回 `/paths`
