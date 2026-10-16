# 点开一页时不再转圈

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `2026-10-14-game-only-transition.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

点知识库、课文或其它非营地页面时，正文区会空出一大块，中间只剩 Ant Design 的四个圆点和「正在打开…」。

## 决策

- 采用：占位落在正文将出现的位置。一行「正在打开」，一条短尺，三道墨线对齐标题和段落。系统要求减少动态效果时，墨线停住。
- 不采用 / 刻意不做：不给章节和课文补穿梭遮罩。营地进出仍用原来的转场。顶栏导航图标不动。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/RouteSkeleton.tsx` | 去掉 Spin，改成正文占位 |
| `web/src/styles/main.scss` | 占位对齐正文栏宽 |
| `web/src/transition/scenes.ts` | 注释改为交给正文占位 |
| `web/src/transition/RouteTransition.tsx` | 同上 |

## 验证

- 浏览器：慢网下打开 `#/java/java-jvm/jvm-areas`，正文区是「正在打开」和三道线，没有四个圆点。网速恢复后标题换成「JVM 运行时数据区：规范与实现」。

## 后续

- [ ] 不要把章节首页和课文之间的转场改回拼接遮罩。
- [ ] 顶栏在窄屏只剩图标。若要改那排图标，单独做，不要塞进这个占位。

## 给下一模型

1. 先读：本文和 `web/src/components/RouteSkeleton.tsx`
2. 再读：`web/src/transition/scenes.ts` 的 `transitionKind`
3. 若续作：营地特效仍只在进出 `/paths` 与课文时出现
4. 禁区：勿改 `pointsOf` 和 `drill.log`
