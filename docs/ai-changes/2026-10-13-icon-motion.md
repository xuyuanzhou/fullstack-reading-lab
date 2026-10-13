# 关卡页改用 Lucide 和 Motion

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | docs/图标与动画库选型-2026-10-13.md |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

关卡界面需要自己的图标和短动效。导航壳已经用 Ant Design 图标，不适合把关卡图形也绑在那一套上。静态页不能靠图标 CDN，也不能无视系统的减少动效设置。

## 决策

- 采用：`lucide-react@1.56.0` 画关卡图标；`motion@14.1.1` 只在路线页用 `LazyMotion`、`domAnimation` 和 `m`。进度用 `scaleX`。减少动效时不挂 Motion。
- 不采用 / 刻意不做：不换壳层的 `@ant-design/icons`。不装 GSAP、Lottie、Phosphor、`@iconify/react`、unplugin-icons。不使用 `motion@14.2.0`，该版本依赖尚未发布的 `framer-motion@14.2.0`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/图标与动画库选型-2026-10-13.md` | 选型、实测体积、接入方式和示例 |
| `web/package.json` | 增加 lucide-react；motion 锁在 14.1.1 |
| `web/package-lock.json` | 锁定上述依赖 |
| `web/src/components/learning/questMotion.tsx` | 图标和减少动效分支 |
| `web/src/components/learning/QuestBoard.tsx` | 关卡地图、折叠、卡片改用上述组件 |
| `web/src/styles/_reading.scss` | 星标、折叠箭头、减少动效 |

```tsx
if (reduce) return children
return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>
```

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json && npx oxlint src/components/learning/questMotion.tsx src/components/learning/QuestBoard.tsx && npm test
```

- 结果：`tsc`、oxlint 和 45 项测试通过。路线页 `/#/paths` 上星标是 `lucide-star`；折叠打开时箭头旋转 180 度，收起后恢复。进度条用 `scaleX`。390px 宽没有横向溢出。系统减少动效时进度条改为静态 `width`，不再做缩放。

## 后续

- [ ] 不要把 `motion` 改成 `^14.2.0`，除非 `npm view framer-motion@14.2.0 version` 有结果。
- [ ] 继续按名字从 `lucide-react` 引入。不要改用 `dynamicIconImports`。
- [ ] 导航图标仍用 `@ant-design/icons`，不要在这次范围外替换。
