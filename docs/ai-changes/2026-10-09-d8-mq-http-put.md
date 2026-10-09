# D8 续抽：消息解耦与 PUT 创建口误（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》核对队列 D8；导图战役已收口后改做 PDF 主题抽查 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

独立导图可教学说法已抽尽。交接指出 D8（《分布式高并发》未列入校订表的其余页）仍是说法级待核验。从约第 27、17–18 页抽出两条高风险口误并改写成原创课。

## 决策

- 采用：新建 `coverage-java-51.js`（Java 分布式 1 课 + 前端 HTTP 1 课）；原图/原文不进站点。
- 不采用：不把整份 206 页标成逐页已核验；不覆盖 frontend-26/27。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-51.js` | 新增 2 课 |
| `curriculum/diagrams/*`、`web/public/diagrams/` | 两张 UTF-8 SVG |
| `scripts/curriculum.mjs`、`legacy/index.html`、`scripts/verify_content.mjs` | 接入与断言 |
| `docs/audits/JAVA_AUDIT_51.md`、`分布式高并发校订记录.md`、`核对队列.md`、`核对交接.md` | 台账 |
| `README.md` | 课数 721 / 2170 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：721 课（前端 257 / Java 464），2170 知识点。

## 后续

- [x] D8 两主题发布
- [ ] D8 其余页继续主题抽查，勿全文盖章
- [ ] 下一空闲号 `coverage-java-52.js` / `coverage-frontend-29.js`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`docs/核对队列.md` D8、`docs/分布式高并发校订记录.md`
3. 若续作：从 PDF 未校订页再抽高风险说法；空闲号 java-52 / frontend-29
4. 禁区：勿上传库原文；勿覆盖 frontend-26/27；勿把 206 页标成逐页已核验
