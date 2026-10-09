# D8 续抽：Cluster 发号、NoSQL 标签、千万行拆表（3 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》核对队列 D8；续 `2026-10-09-d8-mq-http-put.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

D1–D7 与 D9–D10 已校订。本轮从约第 196、57、68 页再抽三条高风险口误，改写成原创课。雪花回拨与分库自增已有课，不重做。

## 决策

- 采用：新建 `coverage-java-52.js`（缓存 1、数据库 2）；原 PDF 不进站点。
- 不采用：不把 206 页标成逐页已核验；不覆盖 frontend-26/27。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-52.js` | 3 课 |
| `curriculum/diagrams/*`、`web/public/diagrams/` | 三张 UTF-8 SVG |
| `scripts/curriculum.mjs`、`legacy/index.html`、`scripts/verify_content.mjs` | 接入与断言 |
| `docs/audits/JAVA_AUDIT_52.md`、校订记录、核对队列、核对交接 | 台账 D11–D13 |
| `README.md`、`web/src/data/*` | 课数与导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：724 课（前端 257 / Java 467），2179 知识点。

## 后续

- [x] D11–D13 发布
- [ ] D8 其余页继续主题抽查，勿全文盖章
- [ ] 下一空闲号 `coverage-java-53.js` / `coverage-frontend-29.js`
- [x] 约第 92 页 DNS 轮询 / TTL → 见 `2026-10-09-d8-dns-lb-ttl.md`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`docs/核对队列.md` D8、`docs/分布式高并发校订记录.md`
3. 若续作：从 PDF 未校订页再抽；空闲号 java-53 / frontend-29；DNS 轮询可作下一刀
4. 禁区：勿上传库原文；勿覆盖 frontend-26/27；勿把 206 页标成逐页已核验；勿重做雪花回拨与分库自增
