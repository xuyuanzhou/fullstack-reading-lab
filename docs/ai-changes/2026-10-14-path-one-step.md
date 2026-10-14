# 一站只展开当前这一步

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-14-path-one-world.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

总图下面把这一站的每一项交付都摊成完整卡片：状态、触发、进度、奖励预览叠在一起。站在一站上仍像在填表。

## 决策

- 采用：这一站用一排步骤。默认打开还没记下的那一项，只留目标、进度和记下。点其他步骤才看那一项。
- 不采用 / 刻意不做：不在这一站同时展开全部子关卡片；「未解锁」只是还不能记进度，课文仍可从总图进入。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/learning/QuestBoard.tsx` | `gateId` 下只渲染当前一步；卡片可收成简表 |
| `web/src/styles/_reading.scss` | 步骤条 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：类型检查通过。
- 浏览器 `/paths`：九站还在。这一站 3 个步骤、1 张卡片。点第 2 步后卡片换成「第 2 项」。没有点「记下这一步」。

## 后续

- [x] 一站一步
- [ ] 不要把这一站的全部子关卡片再同时摊开

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-14-path-one-world.md`
2. 再读：`QuestBoard` 里 `place-steps` 与 `brief`
3. 若续作：总图保持开页可见
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks`；勿用步骤锁课文
