# 关卡弹窗标出进度，子任务仍不单独开页

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | docs/子任务展示路由评估-2026-10-13.md |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

右侧关卡弹窗只列出标题和两个计数。子任务如果再做一层路由，会和 `/paths?gate=`、课文地址叠在一起，选关时还得离开正在读的课。

## 决策

- 采用：弹窗内展示。每一关标已过、进行中、未到、可补，并画一条阅读加交付的进度。展开后的每一节标未读、当前、已读。未到的关和未读的课仍可打开。
- 不采用 / 刻意不做：不新增子任务路由。不因为未到而禁用按钮。不把进度动画放进减少动态效果。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/子任务展示路由评估-2026-10-13.md` | 四个维度的结论：不新增路由 |
| `web/src/data/learningPaths.ts` | `gateFace` / `gateFaceLabel` |
| `web/src/components/GateDock.tsx` | 关卡状态、进度条、子任务标记 |
| `web/src/styles/_reading.scss` | 选中、进行中、未到，以及减少动态效果 |
| `scripts/learning-platform.test.mjs` | 未到不是锁 |

```ts
if (cleared) return 'cleared'
if (index === progressIndex) return 'live'
if (index > progressIndex) return 'ahead'
return 'resume'
```

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：类型检查通过。学习平台测试 17 项通过，含「未到不是锁」。浏览器在 `http://127.0.0.1:5175`：弹窗九关可点，第 1 关为进行中并选中，其余为未到；第 4 关进度条 20%（阅读 2/6）。点第 2 关后子任务标为当前/未读，链接进入 `#/java/spring/spring-transaction`。减少动态效果时序号动画和进度条过渡为 none。390px 宽下面板宽 366，展开后列表收起、子任务仍可点。

## 后续

- [ ] 不要为子任务再加 `/paths/:gate/...` 路由。课文地址保持 `/:track/:group/:lessonId`。
- [ ] 「未到」「未读」只做标识，不要把按钮设成 disabled。
