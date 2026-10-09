# W3CSchool 第三轮：Generator、Fetch 流、存储过程与 MULTI/Lua

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | `W3CSCHOOL_CROSSWALK.md` 第二轮后续；续 `2026-10-09-w3cschool-round2-proxy-pubsub.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表写明续扫 Iterator/Generator、Fetch 流、存储过程「不是自动事务」、Redis 事务 vs Lua。`js-iteration-protocol` / `redis-transaction` / `redis-lua-atomic` 已有，本轮补细边界并交叉。

## 决策

- 采用：`coverage-frontend-32.js`（2）+ `coverage-java-62.js`（2）；加厚迭代协议、fetch-abort、MULTI、Lua。
- 不采用：不覆盖 java-58～61（D8 占用）；不做存储过程语法大全；不把 Pipeline 误写成事务。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-32.js` | Generator、Fetch body 一次 |
| `curriculum/coverage-java-62.js` | 存储过程、MULTI vs Lua |
| `coverage-core-16` / `coverage-lessons` / `batch-03` / `ops-17` | deep 交叉 |
| `scripts/curriculum.mjs`、`verify_content.mjs`、`legacy/index.html` | 接入 + since |
| 审计 / CROSSWALK / 交接 / 本文件 / 索引 | 台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：以命令输出为准（预期 +4 课）。

## 后续

- [x] Generator / Fetch 流 / 过程 / MULTI-Lua
- [ ] 下一轮：async generator、SSE、触发器副作用、Pipeline≠原子（见 CROSSWALK）
- [ ] 下一空闲号 `coverage-java-63.js` / `coverage-frontend-33.js`（先 ls）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-frontend-32.js`、`coverage-java-62.js`、CROSSWALK
3. 若续作：空闲号先 ls；勿覆盖 java-56～61、frontend-26/27
4. 禁区：勿上传库原文；W3CSchool 只借目录
