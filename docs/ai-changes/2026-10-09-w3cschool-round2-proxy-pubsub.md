# W3CSchool 第二轮：Proxy / Class 边界与 Pub/Sub、视图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | `docs/audits/W3CSCHOOL_CROSSWALK.md` 下一轮；续 `2026-10-09-w3cschool-gap-fill.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表写明续扫 Proxy/Class、Redis 发布订阅细命令、MySQL 视图机制。`js-prototype-chain` 已覆盖 class 原型，本轮补 Proxy、`extends`/`super`、`#` 私有，以及 PSUBSCRIBE 与 VIEW 边界。

## 决策

- 采用：`coverage-frontend-31.js`（3 课）+ `coverage-java-57.js`（2 课）；加厚 `js-prototype-chain`、`redis-stream-vs-pubsub`。
- 不采用：不覆盖已占用的 `coverage-java-56.js`（秒杀 CDN/门闩）；不做存储过程语法大全；不重写 Class 总览。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-31.js` | Proxy / extends / `#` 三课 |
| `curriculum/coverage-java-57.js` | VIEW、PSUBSCRIBE |
| `curriculum/coverage-java-56.js` | 恢复秒杀两课（曾被误写覆盖） |
| `curriculum/coverage-path-04.js`、`coverage-ops-17.js` | deep 交叉链接 |
| `scripts/curriculum.mjs`、`verify_content.mjs`、`legacy/index.html` | 接入 31 / 57 |
| `docs/audits/FRONTEND_AUDIT_31.md`、`JAVA_AUDIT_57.md`、`W3CSCHOOL_CROSSWALK.md` | 台账与对照 |
| `docs/核对交接.md`、本文件、索引 | 交接 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：750 课（前端 269 / Java 481），2257 知识点。

## 后续

- [x] Proxy / extends / 私有 / VIEW / PSUBSCRIBE
- [x] 下一轮见 `2026-10-09-w3cschool-round3-generator-fetch-proc.md`
- [x] `coverage-frontend-32` / `coverage-java-62` 已占用；再下 `frontend-33` / `java-64`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-frontend-31.js`、`coverage-java-57.js`、`W3CSCHOOL_CROSSWALK.md`
3. 若续作：空闲号先 ls；**勿覆盖** `java-56`（秒杀）与 frontend-26/27
4. 禁区：勿上传库原文；W3CSchool 只借目录不抄页
