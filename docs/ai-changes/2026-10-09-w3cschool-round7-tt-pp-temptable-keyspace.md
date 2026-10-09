# W3CSchool 第七轮：Trusted Types、Permissions-Policy、临时表、Keyspace

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第六轮后续；续 `2026-10-09-w3cschool-round6-csp-cors-cte-xtrim.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表写明续扫 Trusted Types、Permissions-Policy、临时表 vs CTE、Keyspace 通知。`java-68/69` 已被 D8 占用，本轮用 `frontend-36` / `java-70`。

## 决策

- 采用：`coverage-frontend-36.js`（2）+ `coverage-java-70.js`（2）；加厚 CSP、CTE、PSUBSCRIBE。
- 不采用：不覆盖 D8 的 68/69；不做 Trusted Types 语法大全。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-36.js` | Trusted Types、Permissions-Policy |
| `curriculum/coverage-java-70.js` | 临时表 vs CTE、Keyspace |
| 相关 deep / `scripts/*` / legacy | 交叉与接入 |
| 审计 / CROSSWALK / 交接 / 本文件 | 台账 |

## 验证

```bash
cd web && npm run export:curriculum && cd .. && node scripts/verify_content.mjs
```

- 结果：785 课（前端 279 / Java 506），2362 知识点。

## 后续

- [x] TT / PP / 临时表 / Keyspace
- [x] 下一轮见 `2026-10-09-w3cschool-round8-coop-referrer-json-csc.md`
- [x] `frontend-37` / `java-92`（71～91 为 D8 等占用）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-frontend-36.js`、`coverage-java-70.js`、CROSSWALK
3. 若续作：空闲号先 ls；勿覆盖 java-68～70、frontend-26/27
4. 禁区：勿上传库原文；W3CSchool 只借目录
