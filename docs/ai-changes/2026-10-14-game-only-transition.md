# 只有进出营地才播转场特效

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | 学习路径转场；架构师主线 `/paths` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

章节课表与课文之间的转场不应再铺穿梭/拼接遮罩；特效应只服务游戏感的架构师主线营地。非游戏跳转的加载用 Ant Design Spin。

## 决策

- 采用：`transitionKind` 仅在起点或终点是 `levels`（`/paths`）时返回 `warp` / `splice` / `pullback`；章节首页 ↔ 课文返回 `null`。
- 采用：Suspense / 课文未就绪仍用 `RouteSkeleton`（antd `Spin`）。
- 不采用：全部关掉特效；也不再对任意 `home`↔`sub` 播拼接。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/transition/scenes.ts` | 游戏相关才返回特效种类 |
| `web/src/transition/RouteTransition.tsx` | 恢复营地特效与音效按钮；无 kind 时不遮罩 |
| `web/src/components/RouteSkeleton.tsx` | 保持 antd Spin |
| `web/src/styles/main.scss` | 居中 `.route-loading`；去掉旧 skeleton 动画 |
| `scripts/page-transition.test.mjs` | 断言非营地跳转为 null |

## 验证

```bash
node --test scripts/page-transition.test.mjs
```

- 结果：见本会话命令输出。

## 后续

- [ ] 浏览器：首页进 `#/paths` 仍见穿梭；章节进课文只见 Spin
- [ ] 勿把章节↔课文再加回 splice

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/transition/scenes.ts`、`RouteTransition.tsx`
3. 若续作：从「后续」勾选未完成项
4. 禁区：勿改 coverage 源文；勿动私人资料路径
