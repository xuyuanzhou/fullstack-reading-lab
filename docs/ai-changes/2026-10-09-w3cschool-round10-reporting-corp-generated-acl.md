# W3CSchool 第十轮：Reporting/NEL、CORP、生成列、Redis ACL

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第九轮后续；续 `2026-10-09-w3cschool-round9-sri-clearsite-spatial-functions.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表写明续扫 Reporting/NEL、CORP、MySQL 生成列与函数索引、Redis ACL。空闲号先 ls：`frontend-39` / `java-95`。

## 决策

- 采用：`coverage-frontend-39.js`（2）+ `coverage-java-95.js`（2）；加厚 Report-Only、COOP/COEP、WHERE 函数、Lua。
- 不采用：不做 Reporting/ACL 语法大全；不覆盖 java-93/94。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-39.js` | Reporting/NEL、CORP |
| `curriculum/coverage-java-95.js` | 生成列≠WHERE 包函数、ACL≠requirepass |
| `frontend-35/37`、`java-69`、`ops-17` | deep 交叉 |
| `scripts/*`、legacy、审计、CROSSWALK、交接 | 接入与台账 |

## 验证

```bash
cd web && npm run export:curriculum && cd .. && node scripts/verify_content.mjs
```

- 结果：841 课（前端 285 / Java 556），2530 知识点。

## 后续

- [x] Reporting/NEL / CORP / 生成列 / ACL
- [ ] 下一轮见 CROSSWALK（Document-Policy、PNA、CHECK…）
- [ ] 下一空闲号 `coverage-java-96.js` / `coverage-frontend-40.js`（先 ls）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-frontend-39.js`、`coverage-java-95.js`、CROSSWALK
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56～95
4. 禁区：勿上传库原文；W3CSchool 只借目录
