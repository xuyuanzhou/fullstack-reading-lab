# D8 续抽：getset 墙钟锁与 FOR UPDATE 租约（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-dns-lb-ttl.md` 候选 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

变更记录提示约第 201 页 getset+墙钟锁尚未与已有 SETNX+EXPIRE 课区分开课。并行侧已把 DNS 两课合并为 `dns-lb-not-just-round-robin`（`coverage-java-53.js`），本轮只做锁主题，并修好 OUTLINE 里残留的旧 DNS id 与重复 script。

## 决策

- 采用：新建 `coverage-java-54.js`（`redis-lock-getset-wall-clock`、`mysql-for-update-not-dist-lease`）。
- 不采用：不重做 SETNX+EXPIRE；不恢复已合并的 `dns-lb-not-live-health` / `dns-ttl-not-instant-failover`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-54.js` | 2 课 |
| `curriculum/diagrams/*`、`web/public/diagrams/` | 两张 SVG |
| `scripts/curriculum.mjs` | 一致性接入；网关去掉失效 DNS id |
| `legacy/index.html`、`scripts/verify_content.mjs` | 去重 java-53、接入 54 |
| `docs/audits/JAVA_AUDIT_53.md`、`JAVA_AUDIT_54.md`、队列、校订、交接 | 台账 |
| `README.md` | 741 / 2230（含并行前端增量） |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：741 课（前端 266 / Java 475），2230 知识点。

## 后续

- [x] getset 墙钟锁与 FOR UPDATE 开课
- [x] 清理失效 DNS id / 重复 script
- [ ] D8 其余页继续主题抽查
- [x] 下一号已用：见 `2026-10-09-d8-delete-cdn.md`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-53.js`（含合并后的 DNS）、`coverage-java-54.js`
3. 若续作：空闲号先 `ls curriculum/coverage-java-5*.js`；勿恢复已废弃 DNS 双课 id
4. 禁区：勿上传库原文；勿覆盖 frontend-26/27；勿全文盖章 206 页
