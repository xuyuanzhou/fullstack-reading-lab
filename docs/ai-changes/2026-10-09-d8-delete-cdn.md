# D8 续抽：删除幂等与 CDN/反代（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续锁主题之后 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 32 页把删除与 SELECT 并列称天然幂等；约第 13 页把 CDN 与反向代理收成一句「都是缓存」。两条都会在重放与入口选型上误导。

## 决策

- 采用：`coverage-java-55.js`（消息队列 1、Nginx 1）。
- 不采用：不全文盖章 206 页；不否定 CDN/反代都可以做缓存。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-55.js` | 2 课 |
| `curriculum/diagrams/*`、`web/public/diagrams/` | 两张 SVG |
| `scripts/curriculum.mjs`、`legacy/index.html`、`scripts/verify_content.mjs` | 接入 |
| `docs/audits/JAVA_AUDIT_55.md`、队列、校订、交接 | D18–D19 |
| `README.md` | 743 / 2236 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：743 课（前端 266 / Java 477），2236 知识点。

## 后续

- [x] 删除幂等与 CDN/反代开课
- [ ] D8 其余页继续主题抽查
- [x] java-56 见 `2026-10-09-d8-seckill-client-cdn.md`
- [x] 秒杀 JS / 客户端门闩 → `2026-10-09-d8-seckill-client-cdn.md`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-55.js`、核对队列 D8
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27
4. 禁区：勿上传库原文；勿全文盖章 206 页
