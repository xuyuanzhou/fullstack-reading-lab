# 主线首课给四件事加第一次出现的括注

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | `fs-four-layers`；接续 `2026-10-11-fs-four-layers-prompt-terms.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

提问已改回正式说法后，标题和正文里的「用例」仍容易被读成需求文档里的用户场景；「持久化」和口语「库里」的对应也没写明。该加括注的地方要加。

## 决策

- 采用：核心模型第一次出现时括注 `API contract` / `use case`，并写明用例不是需求场景表；持久化处点明口语「库里」指这一件。要点与「细节」各补一句对照。
- 不采用：改标题加长括注；把「用例」整课换成「应用服务」。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | `fs-four-layers` 的 `promptAnswer`、`core`、`points`、`deep` |
| `web/src/data/curriculum*.json` | 导出 |
| `docs/ai-changes/2026-10-11-fs-four-layers-prompt-terms.md` | 后续勾选 |

## 验证

```bash
node scripts/export-curriculum.mjs
rg '用例（use case）|这四个词各指什么' web/src/data/curriculum-bodies-frontend.json
```

- 结果：导出含括注与细节小节「这四个词各指什么」。

## 后续

- [ ] 后面主线课若再单独抛出「用例」而不交代，指向本课细节即可，不必每课重复长注
- [ ] 不要把「用例」改回需求场景表的意思

## 给下一模型

1. 先读：本文 + `fs-four-layers` 的 `core` / `deep[0]`
2. 英文括注符合契约第 11 节「英文原词可以留在括号里」
3. 禁区：不要把四件事并成自拟「四层」
