# D8 续抽：ENUM 禁令与索引个数 5（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-notnull-text.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 104–105 页规范禁止 ENUM、并把单表索引/组合列个数钉死为 5。需拆成可核验说法。

## 决策

- 采用：`coverage-java-68.js` 两课（67 已被 CTE/XTRIM 占用）；挂在数据库「表」目录。
- 不采用：不以个数硬上限代替 EXPLAIN；不把 TINYINT 魔法数当完成品。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-68.js` | 2 课 |
| 图与 `scripts/curriculum.mjs`、`legacy/index.html`、`verify_content.mjs` | 接入 |
| 审计 / 队列 / 校订 / 交接 / README | 台账 D34–D35 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：779 节 / 2344 KP（前端 277 / Java 502）；verify 通过。

## 后续

- [x] ENUM / 索引个数 5 开课
- [ ] D8 其余页继续主题抽查（候选：微服务=SOA 本质；隐式转换禁令细节）
- [ ] 下一空闲号先 ls：`coverage-java-69.js` / `coverage-frontend-36.js`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-68.js`、`mysql-text-ban-not-absolute`
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56～67
4. 禁区：勿上传库原文；勿全文盖章 206 页
