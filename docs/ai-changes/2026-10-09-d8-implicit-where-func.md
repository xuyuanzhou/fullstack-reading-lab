# D8 续抽：隐式转换与 WHERE 列上函数（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-enum-index-five.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 105 页规范禁止属性隐式转换、禁止 WHERE 属性上函数/表达式，例子分别是 `phone=数字` 与 `from_unixtime(day)`。

## 决策

- 采用：`coverage-java-69.js` 两课；挂在数据库「索引」目录。
- 不采用：不以“禁止转换/禁止函数”二字封杀 CAST 常量侧与函数索引。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-69.js` | 2 课 |
| 图与 `scripts/curriculum.mjs`、`legacy/index.html`、`verify_content.mjs` | 接入 |
| 审计 / 队列 / 校订 / 交接 / README | 台账 D36–D37 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：781 节 / 2350 KP（前端 277 / Java 504）；verify 通过。

## 后续

- [x] 隐式转换 / WHERE 函数开课
- [ ] D8 其余页继续主题抽查（候选：负向查询一律全表扫；必须 UTF8≠utf8mb4；微服务=SOA）
- [ ] 下一空闲号先 ls：`coverage-java-70.js` / `coverage-frontend-36.js`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-69.js`、`coverage-java-68.js`
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56～69
4. 禁区：勿上传库原文；勿全文盖章 206 页
