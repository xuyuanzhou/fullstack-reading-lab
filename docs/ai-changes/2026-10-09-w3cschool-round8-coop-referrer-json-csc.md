# W3CSchool 第八轮：COOP/COEP、Referrer-Policy、JSON≠文档库、客户端缓存

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第七轮后续；续 `2026-10-09-w3cschool-round7-tt-pp-temptable-keyspace.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表写明续扫 COOP/COEP、Referrer-Policy、MySQL JSON≠文档库、Redis 客户端缓存。`java-91` 已被 D8（Registry / sequence）占用，本轮 Java 用 `java-92`；前端用已写好的 `frontend-37`。

## 决策

- 采用：`coverage-frontend-37.js`（2）+ `coverage-java-92.js`（2）；加厚 CORS、Permissions-Policy、Cookie、cache-aside 交叉。
- 不采用：不覆盖 java-91；不做 COOP/JSON 语法大全。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-37.js` | COOP/COEP、Referrer-Policy（既有） |
| `curriculum/coverage-java-92.js` | JSON≠文档库、客户端缓存失效 |
| `extra-lessons` / `frontend-30/36` / `path-09` | deep 交叉（既有） |
| `scripts/curriculum.mjs`、verify、legacy | 接入 + since |
| 审计 / CROSSWALK / 交接 / README | 台账 |

## 验证

```bash
cd web && npm run export:curriculum && cd .. && node scripts/verify_content.mjs
```

- 结果：831 课（前端 281 / Java 550），2500 知识点。

## 后续

- [x] COOP/COEP / Referrer / JSON / 客户端缓存
- [x] 下一轮见 `2026-10-09-w3cschool-round9-sri-clearsite-spatial-functions.md`
- [x] `frontend-38` / `java-94`（93 为 D8 UUID/自增）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-frontend-37.js`、`coverage-java-92.js`、CROSSWALK
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56～92
4. 禁区：勿上传库原文；W3CSchool 只借目录
