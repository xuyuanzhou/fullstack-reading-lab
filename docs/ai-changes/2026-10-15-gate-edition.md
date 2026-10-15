# 旧版已过和新版已通过分开标

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/闯关模式能力闭环改进-2026-10-14.md` P0b；`docs/全栈主线轻量游戏化设计-2026-10-13.md` §3.2 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

阅读和交付勾齐之后，总图把这一关标成「已过」。验证题做没做，不改变这个标记，旧进度看起来像新版已经验收。

## 决策

- 采用：`gateCleared` 仍只看阅读和交付，下一关照旧可走。有验证题且旧勾选已齐时，另标「旧版已过」或「新版已通过」。
- 采用：新版已通过要求每一项都是本地检查通过。草稿、自评和交付勾选不算。
- 不采用：没有验证题的关不改「已过」。不增加会改写存储的口径开关。不把自评写成认证。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/gateVerify.ts` | `gateEdition` 给出短标记和关卡页说明 |
| `web/src/pages/PathPage.tsx` | 总图状态和关卡页说明 |
| `web/src/components/GateDock.tsx` | 关卡条状态用同一套短标记 |
| `scripts/learning-platform.test.mjs` | 四种口径 |
| `docs/闯关模式能力闭环改进-2026-10-14.md` | 勾选 P0b |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
node --test scripts/learning-platform.test.mjs
```

- 结果：类型检查退出码 0。学习平台测试 20 项通过。
- 浏览器 `#/paths`：第一关「走通一次下单」标「旧版已过」，下一关仍是「进行中」。
- `#/paths?gate=g1`：说明是「按旧版自评完成。新版待验收。草稿和勾选不算新版通过。」阅读 8/8、交付 3/3 还在。没有保存草稿。

## 后续

- [ ] 站内还没有非自评的「本地检查通过」证据时，界面不会出现「新版已通过」
- [ ] 不要改 `gateCleared` 去挡住下一关
- [ ] 不要把草稿或勾选改成 `verification: 'passed'`

## 给下一模型

1. 先读：本文 + `docs/全栈主线轻量游戏化设计-2026-10-13.md` §3.2
2. 再读：`gateVerify.ts` 的 `gateEdition`，`learningPaths.ts` 的 `gateCleared`
3. 若续作：只有受控检查或已登记的人工评审可以让 `passed` 等于 `total`
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks`；勿锁课文
