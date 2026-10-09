# D8 续抽：可重入身份与“可重入=避免死锁”（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-redirect-config-poll.md` 候选 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 202 页用 MAC+PID+TID 做可重入身份；约第 199 页把可重入括注成“避免死锁”。需拆成可核验说法。

## 决策

- 采用：`coverage-java-59.js` 两课，挂在分布式「一致性」、锁课旁。
- 不采用：不重做 SETNX/getset/FOR UPDATE；不以硬件/OS 编号代替随机 token。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-59.js` | 2 课 |
| 图与 `scripts/curriculum.mjs`、`legacy/index.html`、`verify_content.mjs` | 接入 |
| 审计 / 队列 / 校订 / 交接 / README | 台账 D24–D25 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：754 课（前端 269 / Java 485），2269 知识点。

## 后续

- [x] 可重入身份 / 死锁括注开课
- [ ] D8 其余页继续主题抽查
- [ ] 下一空闲号先 ls：`coverage-java-60.js` / `coverage-frontend-32.js`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-59.js`、`distributed-lock`
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56
4. 禁区：勿上传库原文；勿全文盖章 206 页
