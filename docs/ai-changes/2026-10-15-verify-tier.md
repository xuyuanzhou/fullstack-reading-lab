# 进阶题只记标记，不计入这一关的通过

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/闯关模式能力闭环改进-2026-10-14.md` §4.4 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

验证石台把当场问答和全部选择题算进同一个分母。换了一个约束的题也会挡住「新版已通过」。

## 决策

- 采用：当场问答和每关第一道选择题（编号以 W1 结尾）是基础，计入验证条。
- 采用：其余选择题是进阶。石台写「进阶」，记下后标「进阶记下」。不进分母，不挡下一关，也不是认证。
- 不采用：不做自动难度。不把进阶并进 `gateCleared`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/gateVerify.ts` | `verifyTier`；验证条只数基础项 |
| `web/src/pages/PathPage.tsx` | 进阶石台和进阶说明 |
| `web/src/components/learning/CurrentTask.tsx` | 进阶选择题写明不计入通过 |
| `scripts/learning-platform.test.mjs` | 进阶选对不增加 passed |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
node --test scripts/learning-platform.test.mjs
```

- 结果：类型检查退出码 0。学习平台测试 20 项通过。
- `#/paths?gate=g1`：验证条是 0/2。问答和选择 G1-W1 是「可挑战」。选择 G1-W2、G1-W3 标「进阶」。说明写着进阶 0/2 已记下，不计入通过。打开 G1-W2 能看到「这一道是进阶」。没有点选项，没有保存。

## 后续

- [ ] 阶段雷达和成就柜仍不做
- [ ] 不要把进阶记下并进 `gateCleared` 或「新版已通过」

## 给下一模型

1. 先读：本文 + `gateVerify.ts` 的 `verifyTier`
2. 再读：`gateVerifyFill` 的 `total` 只数基础项
3. 若续作：新的选择题若不是该关第一道，默认进阶
4. 禁区：勿锁课文；勿把进阶写成认证
