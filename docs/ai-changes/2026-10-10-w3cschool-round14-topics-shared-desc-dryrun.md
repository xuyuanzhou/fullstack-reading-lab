# W3CSchool 第十四轮：Topics / Shared Storage / 降序索引 / ACL DRYRUN

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第十三轮后续；续 `2026-10-10-w3cschool-round13-saa-fedcm-histogram-spub.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

续扫 Topics API、Shared Storage、MySQL descending index、Redis ACL DRYRUN。空闲号先 ls：`frontend-43` / `java-109`。

## 决策

- 采用：`coverage-frontend-43.js`（2）+ `coverage-java-109.js`（2）；加厚 FedCM/SAA、索引种类、ACL。
- 不采用：隐私沙盒 API 大全；不以 DESC 索引保证永免 filesort。
- 并行冲突：课 id 以落地文件为准（`topics-api-not-cookie-segments` 等），交叉链接已对齐。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-43.js` | Topics、Shared Storage |
| `curriculum/coverage-java-109.js` | 降序索引、ACL DRYRUN |
| `frontend-42` / `java-09` / `java-95` | deep 交叉 |
| `scripts/*`、legacy、审计、CROSSWALK、交接 | 接入与台账 |

## 验证

```bash
cd web && npm run export:curriculum && cd .. && node scripts/verify_content.mjs
```

- 结果：883 课（前端 293 / Java 590），2656 知识点。

## 后续

- [x] Topics / Shared Storage / descending / DRYRUN
- [ ] 下一轮见 CROSSWALK（Private State Tokens、multi-valued index…）
- [ ] 下一空闲号 `coverage-java-111.js` / `coverage-frontend-45.js`（先 ls）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-frontend-43.js`、`coverage-java-109.js`、CROSSWALK
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56～110
4. 禁区：勿上传库原文；W3CSchool 只借目录
