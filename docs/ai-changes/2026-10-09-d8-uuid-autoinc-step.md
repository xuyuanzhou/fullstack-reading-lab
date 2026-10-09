# D8 续抽：UUID 形态与多主自增分段（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-registry-sequence-batch.md`；号段竞争后落在 `coverage-java-93.js` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 193–194 页把 UUID 说成无序+字符串，并把多主不同起点/相同步长写成轻松的集群发号方案。

## 决策

- 采用：`coverage-java-93.js`（曾尝试 94/95 被并行占用/重复）；挂在「隔离」。
- 不采用：不以 v4 经验否定 v7/二进制；不以 offset/increment 代替运维契约。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-93.js` | 2 课 + SVG |
| `scripts/curriculum.mjs` 等 | 接入；并恢复并行 `coverage-java-94.js`（空间索引/Functions） |
| 审计 / 队列 D80–D81 / 校订 / 交接 / README | 台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：837 节 / 2518 KP（前端 283 / Java 554）。

## 后续

- [x] UUID 形态 / 多主自增分段开课
- [x] D8 其余页继续主题抽查 → 见 `2026-10-09-d8-jenkins-insert-lease.md`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-93.js`；写前 `ls` 空闲号（并行会抢号）
3. 若续作：勿覆盖 frontend-26/27、java-56～94
4. 禁区：勿上传库原文；勿全文盖章 206 页；勿 `git checkout` 未提交的 curriculum.mjs
