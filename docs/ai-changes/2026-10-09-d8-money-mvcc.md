# D8 续抽：货币小数与 MVCC 两列模型（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 `2026-10-09-d8-join-or-ban.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

约第 104 页“禁止小数存货币”易误伤 DECIMAL；约第 116–118 页把 MVCC 画成创建/删除版本两列。需拆成可核验说法。

## 决策

- 采用：`coverage-java-62.js` 两课；货币挂「表」浮点课旁，MVCC 挂「事务」`mysql-mvcc` 旁。
- 不采用：不重写整节浮点精度课；不以资料表格代替 InnoDB 手册。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-62.js` | 2 课 |
| 图与 `scripts/curriculum.mjs`、`legacy/index.html`、`verify_content.mjs` | 接入 |
| 审计 / 队列 / 校订 / 交接 / README | 台账 D30–D31 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：见交接头数字（导出后填写）。

## 后续

- [x] 货币小数 / MVCC 两列开课
- [ ] D8 其余页继续主题抽查（候选：禁止视图/触发器绝对化；必须 NOT NULL+默认值）
- [ ] 下一空闲号先 ls：`coverage-java-63.js` / `coverage-frontend-32.js`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`coverage-java-62.js`、`mysql-float-ieee-not-8-digits`、`mysql-mvcc`
3. 若续作：空闲号先 ls；勿覆盖 frontend-26/27、java-56
4. 禁区：勿上传库原文；勿全文盖章 206 页
