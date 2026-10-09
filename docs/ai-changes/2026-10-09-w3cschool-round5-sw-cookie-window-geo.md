# W3CSchool 第五轮：SW 缓存 / Cookie 前缀 / 窗口函数 / GEO

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第四轮后续；续 `2026-10-09-w3cschool-round4-async-sse-trigger.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表续扫 SW 缓存策略、Cookie 前缀/Partitioned、窗口函数行数、Redis GEO≠GIS。提交前补记本批台账。

## 决策

- 采用：`coverage-frontend-34.js`（2）+ `coverage-java-65.js`（2）；审计 FRONTEND_AUDIT_34 / JAVA_AUDIT_65。
- 不采用：不覆盖 frontend-33、java-64；不做 GEO/GIS 大全。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-34.js` | SW 策略、Cookie 前缀/Partitioned |
| `curriculum/coverage-java-65.js` | 窗口函数保留行、GEO on ZSET |
| `docs/audits/FRONTEND_AUDIT_34.md`、`JAVA_AUDIT_65.md` | 审计台账 |
| `scripts/curriculum.mjs`、导出 JSON、CROSSWALK | 接入与对照 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：随本批一并提交发布。

## 后续

- [x] 本批四课落盘并进索引
- [x] 下一轮见 `2026-10-09-w3cschool-round6-csp-cors-cte-xtrim.md`（frontend-35 / java-67）
- [ ] CROSSWALK 其余缺口继续扫（Trusted Types / Permissions-Policy / 临时表 vs CTE…）

## 给下一模型

1. 先读本文件与 `docs/audits/W3CSCHOOL_CROSSWALK.md`。
2. 勿覆盖 `coverage-frontend-34.js` / `coverage-java-65.js`。
