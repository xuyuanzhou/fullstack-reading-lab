# 窄屏打开课表不再被纸页盖住

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [闯关改成剑客走向石门，课表在正文栏展开](2026-10-16-duel-roster-fx.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

手机上点顶栏「课表」，课表标题要等整章链接画完才出现，接着一张纸页和一层遮罩再盖住刚打开的页。夜间遮罩用的是浅墨色，整页发白，像还在加载。

## 决策

- 采用：视口不超过 720px 时不播课表纸页，直接看见课表。课表标题先出来，课程行下一帧再画。宽屏纸页的遮罩改用石台阴影色，夜间不再洗白，并且不挡住点击。
- 不采用 / 刻意不做：不取消宽屏课表纸页。不改总图进课文的剑客石门。不改九关和通关规则。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/transition/scenes.ts` | `transitionPlayback`：窄屏不播 `catalog` |
| `web/src/transition/RouteTransition.tsx` | 按视口宽度决定播不播 |
| `web/src/styles/_transition.scss` | 课表遮罩改阴影色，纸页不接点击 |
| `web/src/pages/HomePage.tsx` | 标题先画，课程行下一帧再画 |
| `scripts/page-transition.test.mjs` | 390 与 720 不播，721 仍播 |

## 验证

```bash
node --experimental-strip-types --test scripts/page-transition.test.mjs
```

- 结果：3 项通过。390px 宽、夜间，从 `#/paths` 点「课表」没有 `.route-fx`。标题先出现，随后 109 行课都在，导语没有被纸页截断。

## 后续

- [ ] 宽屏仍播课表纸页，不要把 `transitionKind` 的 `catalog` 改成永远不播
- [ ] 窄屏进课文仍是剑客石门，不要一并拿掉
