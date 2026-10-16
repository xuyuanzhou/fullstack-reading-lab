# 总图不再标「旧版已过」

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-15-gate-edition.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

阅读和交付勾齐、验证证据还没达标时，总图把这一关标成「旧版已过」。这个短标记不需要。

## 决策

- 采用：证据未达标时 `gateEdition` 留空，总图回到原来的「已过」。关卡页不再写「按旧版自评完成。新版待验收。」
- 采用：每一项都是本地检查通过时，仍标「新版已通过」。
- 不采用 / 刻意不做：不改 `gateCleared`。下一关仍按阅读和交付可走。草稿和勾选仍不算新版通过。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/gateVerify.ts` | 去掉「旧版已过」标记和对应说明 |
| `scripts/learning-platform.test.mjs` | 未达标时期望空标记 |

## 验证

```bash
node --experimental-strip-types --test --test-name-pattern "gate verify progress" scripts/learning-platform.test.mjs
```

- 结果：1 项通过。
- 浏览器 `#/paths`：第一关「走通一次下单 已过」，下一关「把写入做对 进行中」。页面上没有「旧版已过」。
- `#/paths?gate=g1`：没有「按旧版自评完成。新版待验收。」阅读和交付仍是已记下。没有点保存。随后回到总图。

## 后续

- [ ] 不要把「已过」改回「旧版已过」
- [ ] 不要改 `gateCleared` 去挡住下一关

## 给下一模型

短标记只剩空和「新版已通过」。空标记时总图用 `gateStatus`，勾齐就是「已过」。
