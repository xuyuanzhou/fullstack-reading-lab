# 客户端状态改用 Zustand

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | docs/客户端状态管理-2026-10-13.md、docs/AI契约-变更记录规范.md 第 12 节 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

学习记录已经有 revision 合并和只读备份，但整份挂在一个 React context 上，主题和继续阅读也会跟着任意笔记重绘。需要一块可单独订阅的状态，同时不能换掉现有的写回规则。

## 决策

- 采用：Zustand 5.0.15。用户、业务、全局三块动作写进同一个仓库。写回仍走 `mergeForWrite`。主题和继续阅读只订自己的字段。本机资料探测放在全局切片。
- 不采用 / 刻意不做：不引入 Redux Toolkit。不用 Zustand 自带的 `persist`。不抬高学习记录的 schema 版本。不把关卡奖励写成证据。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/AI契约-变更记录规范.md` | 新增第 12 节 |
| `AGENTS.md` | 增加指向第 12 节的短指针 |
| `docs/客户端状态管理-2026-10-13.md` | 选型、架构、用法、性能 |
| `web/package.json` | 增加 zustand，测试加入 learning-store |
| `web/src/state/learningStore.ts` | 仓库工厂 |
| `web/src/state/slices/*.ts` | 三块动作 |
| `web/src/state/revisionPersist.ts` | 合并写回 |
| `web/src/state/progress.tsx` | 原有 `useProgress` 改订这个仓库 |
| `web/src/App.tsx` | 主题和继续阅读改为窄订阅 |
| `web/src/components/AppLayout.tsx` | 本机资料连接改走全局切片 |
| `scripts/learning-store.test.mjs` | 读写、异步探测、合并和失败 |

```ts
if (saved.envelope !== state.learning) set({ learning: saved.envelope })
```

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json && npm test
```

- 结果：类型检查通过。51 项测试通过，其中 6 项覆盖用户切片、空关卡记录、只读拒绝、探测竞态、跨页合并和写盘失败。

## 后续

- [ ] 新界面订字段用 `useLearningSlice`，不要为了一个字段调用 `useProgress()`。
- [ ] 不要把学习记录改成 Zustand `persist`。
- [ ] 不要添加 Redux Toolkit。
