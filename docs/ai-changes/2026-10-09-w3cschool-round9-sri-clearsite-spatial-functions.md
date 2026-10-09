# W3CSchool 第九轮：SRI、Clear-Site-Data、SPATIAL、Redis Functions

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第八轮后续；续 `2026-10-09-w3cschool-round8-coop-referrer-json-csc.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表写明续扫 SRI、Clear-Site-Data、MySQL 空间索引边界、Redis 7 Functions。`java-93` 已被 D8（UUID / 多主自增）占用，本轮 Java 用 `java-94`。

## 决策

- 采用：`coverage-frontend-38.js`（2）+ `coverage-java-94.js`（2）；加厚 CSP、browser-storage、Lua、GEO。
- 不采用：不覆盖 java-93；不做 SRI/SPATIAL 语法大全。
- 误覆盖恢复：曾误把 W3C 写入 `java-93`，已从导出 JSON 恢复 D8 两课，W3C 改挂 `java-94`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-38.js` | SRI、Clear-Site-Data |
| `curriculum/coverage-java-94.js` | SPATIAL≠GIS、Functions≠EVAL |
| `curriculum/coverage-java-93.js` | 恢复 D8 UUID / 多主自增 |
| `coverage-core-16` / `coverage-lessons` / `ops-17` / `java-65` | deep 交叉 |
| `scripts/*`、legacy、审计、CROSSWALK、交接 | 接入与台账 |

## 验证

```bash
cd web && npm run export:curriculum && cd .. && node scripts/verify_content.mjs
```

- 结果：837 课（前端 283 / Java 554），2518 知识点。

## 后续

- [x] SRI / Clear-Site-Data / SPATIAL / Functions
- [x] 下一轮见 `2026-10-09-w3cschool-round10-reporting-corp-generated-acl.md`
- [x] `frontend-39` / `java-95`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-frontend-38.js`、`coverage-java-94.js`、CROSSWALK；D8 的 `coverage-java-93.js` 勿覆盖
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56～94
4. 禁区：勿上传库原文；W3CSchool 只借目录
