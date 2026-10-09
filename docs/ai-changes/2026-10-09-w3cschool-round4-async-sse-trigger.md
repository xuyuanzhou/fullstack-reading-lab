# W3CSchool 第四轮：async generator、SSE、触发器

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第三轮后续；续 `2026-10-09-w3cschool-round3-generator-fetch-proc.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表写明续扫 async generator、SSE vs Fetch 流、触发器副作用、Pipeline≠原子。`redis-pipeline` 已有独立课，本轮只交叉加厚。

## 决策

- 采用：`coverage-frontend-33.js`（2）+ `coverage-java-64.js`（1 触发器）；加厚 generator / long-poll / fetch body / pipeline。
- 不采用：不新开 Pipeline 重复课；不做触发器语法大全；不覆盖 java-56～63。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-33.js` | async generator、SSE |
| `curriculum/coverage-java-64.js` | 触发器副作用 |
| `coverage-frontend-30/32`、`coverage-infra-13` | deep 交叉 |
| `scripts/curriculum.mjs` 等 | 接入 + since |
| 审计 / CROSSWALK / 交接 / 本文件 | 台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：767 课（前端 273 / Java 494），2308 知识点。

## 后续

- [x] async gen / SSE / 触发器；Pipeline 加厚
- [x] 下一轮见 `2026-10-09-w3cschool-round5-sw-cookie-window-geo.md`
- [x] `frontend-34` / `java-65` 已占用；再下 `frontend-35` / `java-67`（66 为 D8）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-frontend-33.js`、`coverage-java-64.js`、CROSSWALK
3. 若续作：空闲号先 ls；勿覆盖已占用批次
4. 禁区：勿上传库原文；W3CSchool 只借目录
