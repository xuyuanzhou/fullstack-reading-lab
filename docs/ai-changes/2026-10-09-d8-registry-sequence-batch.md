# D8 续抽：Docker Registry 与 sequence 批量断号（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-twenty-rounds-71-90.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 187 页混称仓储；约第 194–195 页 sequence 乐观锁又批量取 500 却仍强调连续。

## 决策

- 采用：`coverage-java-91.js` 两课；挂在「镜像」与「隔离」。
- 不采用：不以 Hub 代替 Registry 概念；不以批量当连续。
- 修复：误 `git checkout scripts/curriculum.mjs` 后，已从 `legacy/index.html` 与磁盘 coverage 恢复 `publishedSources`（java-67～91、frontend-35～37）及 OUTLINE；并去掉尚未成课的 OUTLINE 悬空 id。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-91.js` | 2 课 + SVG |
| `scripts/curriculum.mjs` 等 | 接入 |
| 审计 / 队列 D78–D79 / 校订 / 交接 / README | 台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：829 节 / 2494 KP（前端 281 / Java 548）。

## 后续

- [x] Registry/Repository 与 sequence 批量开课
- [ ] D8 其余页继续主题抽查（先 ls `coverage-java-92.js`）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-91.js`
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56～91
4. 禁区：勿上传库原文；勿全文盖章 206 页
