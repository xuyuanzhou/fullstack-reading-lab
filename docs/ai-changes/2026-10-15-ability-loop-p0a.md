# P0a：能力目标与验证进度（不改过关门闩）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/闯关模式能力闭环改进-2026-10-14.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

设计要求先做能力闭环展示：每关一句能力目标，进度分成阅读 / 交付 / 验证；验证挂现有当场题与笔试证据，暂不改 `gateCleared`。

## 决策

- 采用：`pass` 升格为能力目标展示；`gateVerify.ts` 汇总该关 `LEARNING_TASKS` + 笔试的 idle / 待复核 / 本地检查通过。
- 采用：关卡详情与场次页露出三段进度；`?focus=verify` 展开验证清单并挂 `CurrentTask`（G1 起有题的关）。
- 采用：浮动关卡条增加验证计数与能力句。
- 不采用：把验证并进 `gateCleared`；不锁课文；不写认证话术。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/gateVerify.ts` | 能力句、验证项与进度统计 |
| `web/src/pages/PathPage.tsx` | 关卡详情能力条、三段进度、验证区 |
| `web/src/components/GateDock.tsx` | 验证计数与能力句 |
| `web/src/styles/_reading.scss` | 能力条与验证列表样式 |
| `scripts/learning-platform.test.mjs` | 验证进度与旧过关仍成立 |
| `docs/闯关模式能力闭环改进-2026-10-14.md` | 勾选 P0a |

## 验证

```bash
node --test scripts/learning-platform.test.mjs
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：见本会话命令输出。

## 后续

- [ ] P0b：双口径「旧版已过 / 新版已通过」后再动过关门闩
- [ ] 浏览器 `#/paths?gate=g1`：能看见能力目标与验证按钮；点开后有笔试与当场题
- [ ] 勿改冻结交付 id；勿把草稿标成本地检查通过

## 给下一模型

1. 先读：本文 + `docs/闯关模式能力闭环改进-2026-10-14.md`
2. 再读：`gateVerify.ts`、`PathPage` 的 `ability-strip` / `gate-verify`
3. 若续作：从 P0b 或为其余关补验证题
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks` 语义；勿锁课文
