# 交付勾上之后才打开下一关

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | [文末进入下一节时，把这一节记为已读](2026-10-09-path-mark-on-next.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

主线按「课是否已读」切换当前关。课读完就会进入下一关，交付物没有地方勾。

## 决策

- 采用：当前关的每条交付是一个勾选，存在 `pathChecks`（如 `g1:0`）。本关必读都已读，并且条目都勾上，才把下一关当成现在。第 6 关没有课，勾完四项即过。
- 不采用 / 刻意不做：只勾交付、课还没读完，不能跳关。后面几关的列表不加勾选。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/types/curriculum.ts` | `pathChecks` |
| `web/src/state/progressStorage.ts` | 读出、合并勾选 |
| `web/src/state/progress.tsx` | `togglePathCheck` |
| `web/src/data/learningPaths.ts` | `gateCleared` |
| `web/src/pages/PathPage.tsx` | 当前关交付可勾选 |
| `web/src/styles/_reading.scss` | `.path-check` |
| `docs/学习路线分层设计.md` | 第 4 节写明勾完才开下一关 |

## 验证

- `tsc --noEmit -p web/tsconfig.app.json` 通过
- `node --test scripts/architecture.test.mjs` 10 项通过
- `/#/paths` 第 1 关三条交付可勾、可取消。只勾一条时仍停在第 1 关（课还是 0/8）
- 验证后 `pathChecks` 为空

## 后续

- [ ] 不要把关卡再做回侧栏第二套菜单
- [ ] 多标签同时改勾选时，取消勾选可能被另一标签加回来（与已读列表同一套合并）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`web/src/data/learningPaths.ts` 的 `gateCleared`，`web/src/pages/PathPage.tsx`
3. 若续作：当前关用 `gateCleared`，不要只看已读课数
4. 禁区：不要改课文正文
