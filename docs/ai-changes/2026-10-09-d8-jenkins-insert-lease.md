# D8 续抽：Jenkins≠CI；唯一插入+cron≠租约（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-uuid-autoinc-step.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 193 页持续集成专节把好处绑在 Jenkins；约第 199–200 页用唯一插入做锁，并以定时清超时、while 重插补租约与阻塞。

## 决策

- 采用：`coverage-java-96.js`（95 为并行 W3CSchool）；挂在「CI」与「一致性」。
- 不采用：不以 Jenkins 否定 CI 实践；不以「库表锁一律不能用」吓退权宜方案，但要求租约与 fencing。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-96.js` | 2 课 + SVG |
| `web/public/diagrams/*.svg` | 同步图 |
| `scripts/curriculum.mjs` / `verify_content.mjs` / `legacy/index.html` | 接入 |
| 审计 / 队列 D82–D83 / 校订 / 交接 / README | 台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：843 节 / 2536 KP（前端 285 / Java 558）。

## 后续

- [x] Jenkins≠CI / 唯一插入+cron≠租约开课
- [ ] D8 其余页继续主题抽查（先 ls `coverage-java-97.js`）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-96.js`；写前 `ls` 空闲号（并行会抢号）
3. 若续作：勿覆盖 frontend-26/27、java-56～96；候选可看漏桶绝对化、ZK「弱一致必 sync」等未点名页
4. 禁区：勿上传库原文；勿全文盖章 206 页；勿 `git checkout` 未提交的 curriculum.mjs
