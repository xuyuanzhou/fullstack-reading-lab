# AI 笔记页的记阅读钩子挪到提前返回之前

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 发布前的校验 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

公开站发布要跑 `npm run check`。AI 笔记页在确认笔记存在之后才调用 `useEffect`，lint 把这次条件调用当成错误，构建过不去。

## 决策

- 采用：先无条件调用记阅读的钩子；笔记不存在时不写入。提前返回仍留在钩子后面。
- 不采用 / 刻意不做：不改 AI 进度的含义。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/AiPage.tsx` | `rememberAi` 的 effect 移到提前返回之前 |

## 验证

- `npm run lint` 不再报这条条件钩子

## 后续

- [ ] 不要把这个 effect 再放回 `if (!note) return` 后面

## 给下一模型

1. 先读：本文
2. 再读：`web/src/pages/AiPage.tsx` 的 `AiNotePage`
3. 禁区：不要在提前返回之后再加 Hook
