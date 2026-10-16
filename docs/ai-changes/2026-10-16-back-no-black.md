# 浏览器返回总图不再黑一下

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 课文回 `#/paths` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

从课文按浏览器返回，回到架构师主线时整屏会黑一下。这一跳走 `pullback`，遮罩底色是 `#121614`，停大约 0.9 秒。

## 决策

- 采用：课文（`sub`）回总图（`levels`）不再返回转场种类。浏览器返回和页内回营地都直接看见总图。
- 不采用 / 刻意不做：不改从总图进课文的闯关，也不改总图打开课表的展开。`pullback` 的镜头样式先留着，这一跳不再调用。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/transition/scenes.ts` | 课文回总图返回 `null` |
| `web/src/transition/RouteTransition.tsx` | 注释与上面一致 |
| `scripts/page-transition.test.mjs` | 断言这一跳没有特效 |

## 验证

```bash
node --test scripts/page-transition.test.mjs
```

- 结果：3 项通过。
- 浏览器：从 `#/paths` 进入课文再 `history.back()`，地址回到 `#/paths`，标题是「架构师主线」。返回后没有 `.route-fx`。进课文时的遮罩是舞台浅色，不是近黑。

## 后续

- [x] 课文回总图不再铺近黑遮罩
- [ ] 不要把 `sub → levels` 改回 `pullback`

## 给下一模型

1. 先读：本文和 `web/src/transition/scenes.ts` 的 `transitionKind`
2. 课文回 `#/paths` 应直接出现总图，不要全屏近黑
3. 禁区：勿把这一跳改回 `pullback`；勿改九关过关规则
