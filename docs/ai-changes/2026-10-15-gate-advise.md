# 关卡页写出先修建议，反馈只说明记下了什么

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/闯关模式能力闭环改进-2026-10-14.md` §4.2、§4.3 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

九关已经能标旧版已过和新版已通过，但前置只写在设计里，记下一项时也没有说明这不算通过。

## 决策

- 采用：`requires` 只生成关卡页的建议句和验证石台短状态。跳过写入 `skipVerify`，不改勾选。
- 采用：记下交付或保存草稿时，旁边一行写明「这是自评，待复核」，约 2 秒。本地检查通过时写还剩几项。整关通过时顶条用 `pass`，不超过 2 秒。
- 不采用：技能树、锁课文、用 `requires` 改 `gateCleared` 或 `openIndex`、经验或徽章。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/masteryGates.ts` | 九关直接前置 |
| `web/src/data/gateVerify.ts` | `gateAdvise`、`passFlashLine` |
| `web/src/state/progressStorage.ts` | `skipVerify` 读入与合并 |
| `web/src/pages/PathPage.tsx` | 建议句、跳过按钮、三下反馈 |
| `web/src/components/learning/CurrentTask.tsx` | 草稿保存成功后通知关卡页 |
| `scripts/learning-platform.test.mjs` | 前置、建议、跳过和顶条文案 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
node --test scripts/learning-platform.test.mjs
```

- 结果：类型检查退出码 0。学习平台测试 20 项通过。
- `#/paths?gate=g3`：建议先完成「把写入做对」，有「跳过建议，直接验证」。三座验证石台写「建议先完成」，阅读和交付仍可点。没有点跳过，也没有保存草稿。
- `#/paths?gate=g2`：前置已满足，验证石台是「可挑战」，没有跳过按钮。
- `#/paths?gate=g-auth`：没有验证石台，也没有跳过按钮。
- `#/paths`：第一关仍是「旧版已过」，下一关仍是「进行中」。

## 后续

- [ ] P3 基础 / 进阶验证。进阶只加标记，不挡主线
- [ ] 不要把 `skipVerify` 算进「新版已通过」
- [ ] 阶段雷达和成就柜仍不做

## 给下一模型

1. 先读：本文 + `docs/闯关模式能力闭环改进-2026-10-14.md` §4.4
2. 再读：`gateAdvise` 与 `skipGateVerify`
3. 若续作：只加基础 / 进阶两套题，进阶不改 `gateCleared`
4. 禁区：勿锁课文；勿把跳过或自评写成认证；勿加经验、徽章
