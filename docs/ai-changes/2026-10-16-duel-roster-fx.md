# 闯关改成剑客走向石门，课表在正文栏展开

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `#/paths` 进课文；总图打开课表 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

从总图进课文是左右两扇幕拉开，看不出有人在闯关。从总图打开课表是整屏拉远，窄屏上铺满，顶栏也被盖住。

## 决策

- 采用：总图进课文（`splice`）改成剑客走向石门，举剑，门开。宽屏从左走向右侧石门。720px 及更窄时石门在上方，剑客从下方走上去，两边留 16px，不横穿出屏幕。总图打开课表改成 `catalog`：顶栏留着，纸页落在正文那一栏，窄屏左右各 16px，高度不超过约 36dvh。课表点进总图仍然直接切换。
- 不采用 / 刻意不做：不把课表进总图改回雾面。不恢复幕布拼接。回总图仍用原来的拉远。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/transition/scenes.ts` | 总图进课表返回 `catalog`，时长 900ms；闯关 1200ms |
| `web/src/transition/ChallengeFx.tsx` | 剑客与石门、课表纸页 |
| `web/src/transition/RouteTransition.tsx` | 按种类挂上这两层，幕布和粒子去掉 |
| `web/src/transition/audio.ts` | 闯关和课表各一声，仍默认不开 |
| `web/src/styles/_transition.scss` | 走位、窄屏上下排列、纸页对齐正文栏 |
| `scripts/page-transition.test.mjs` | 总图进课表断言为 `catalog` |

## 验证

```bash
node --experimental-strip-types --test scripts/page-transition.test.mjs
```

- 结果：3 项通过。浏览器从 `#/paths` 进课文，宽屏剑客在石门左侧，390px 宽时石门在上、剑客在下，都在屏内。打开课表时顶栏还在，纸页在 390px 宽时左右各 16px，没有横向溢出。

## 后续

- [x] 闯关转场改成剑客去挑战
- [x] 打开课表不再整屏拉远
- [ ] 不要把 `home → levels` 改回 `warp`
- [ ] 不要把闯关改回左右幕布

## 给下一模型

1. 先读：本文和 `web/src/transition/scenes.ts` 的 `transitionKind`
2. 再读：`web/src/styles/_transition.scss` 的 `.fx-duel` 与 `.fx-roster`
3. 窄屏闯关是上下走，不要改回横穿。课表纸页跟正文栏对齐，不要再铺满整屏
4. 禁区：勿改 `drill.log`、九关过关和 `home → levels` 的直接切换
