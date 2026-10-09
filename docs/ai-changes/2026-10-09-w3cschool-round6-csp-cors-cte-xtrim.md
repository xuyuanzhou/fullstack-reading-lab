# W3CSchool 第六轮：CSP Report-Only、CORS Max-Age、CTE、Stream 修剪

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第五轮后续；续 `2026-10-09-w3cschool-round5-sw-cookie-window-geo.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表写明续扫 CSP report-only、CORS preflight 缓存、MySQL CTE、Stream 修剪。`csp-script-src` / `cors` / `redis-stream-vs-pubsub` 已有，本轮补细边界。

## 决策

- 采用：`coverage-frontend-35.js`（2）+ `coverage-java-67.js`（2）；加厚 CSP、CORS、Stream 对照课。
- 不采用：不做 CTE/CSP 语法大全；不覆盖 java-66（D8）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-35.js` | Report-Only、预检 Max-Age |
| `curriculum/coverage-java-67.js` | CTE、XTRIM |
| `coverage-core-16` / `extra-lessons` / `ops-17` | deep 交叉 |
| `scripts/*`、legacy、审计、CROSSWALK、交接 | 接入与台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：777 课（前端 277 / Java 500），2338 知识点。

## 后续

- [x] CSP Report-Only / Max-Age / CTE / XTRIM
- [x] 下一轮见 `2026-10-09-w3cschool-round7-tt-pp-temptable-keyspace.md`
- [x] `frontend-36` / `java-70`（68/69 为 D8）；再下 `frontend-37` / `java-71`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-frontend-35.js`、`coverage-java-67.js`、CROSSWALK
3. 若续作：空闲号先 ls；勿覆盖已占用批次
4. 禁区：勿上传库原文；W3CSchool 只借目录
