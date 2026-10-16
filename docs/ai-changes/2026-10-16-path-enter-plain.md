# 课表进总图不再铺雾面

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `#/paths`；课表「按主线学」 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

课表点「按主线学」会铺满一层约 1.5 秒的深色雾。雾在中间完全不透明，课表和总图都被挡住，点下去像先卡住再揭开。

## 决策

- 采用：课表（`home`）进总图（`levels`）不再返回转场种类，页面直接换成架构师主线。
- 不采用 / 刻意不做：不改从总图进课文的拼接，也不改回总图的拉远。雾面着色器先留着，这一下不再调用。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/transition/scenes.ts` | 课表进总图返回 `null` |
| `web/src/transition/RouteTransition.tsx` | 注释与上面一致 |
| `scripts/page-transition.test.mjs` | 断言这一跳没有特效 |

## 验证

```bash
node --test scripts/page-transition.test.mjs
```

- 结果：3 项通过。浏览器从 `#/java/spring` 点「按主线学」，地址变为 `#/paths`，标题是「架构师主线」，期间没有 `.route-fx`。

## 后续

- [x] 课表进总图不再播雾面
- [ ] 不要把这一跳又改回 `warp`

## 给下一模型

1. 先读：本文和 `web/src/transition/scenes.ts` 的 `transitionKind`
2. 课表进 `#/paths` 应直接出现总图
3. 禁区：勿把 `home → levels` 改回 `warp`；勿改九关过关规则
