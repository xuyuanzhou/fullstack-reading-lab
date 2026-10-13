# 三个「一致」课：术语释义、答案空行与练习对齐

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `distributed-consistency-three-words`；接续 `2026-10-12-consistency-three-words-review.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

再审：答案未空行；线性化/ACID/最终一致宜点击释义；练习「两侧都显示已售完」与答案「写应拒绝」不对齐。

## 决策

- 采用：`〔线性化〕`、`〔ACID〕`、`〔最终一致〕`；答案空行；练习/答案改为「两侧都对同一库存返回下单成功」。
- 不采用：重写三层定义；改标题。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-48.js` | promptAnswer / core / task / answer |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔ACID｜|两侧都对同一库存返回下单成功' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿把三层「一致」合成 CAP 一句写回 core

## 给下一模型

1. 先读：本文 + `2026-10-12-consistency-three-words-review.md`
2. 再读：`curriculum/coverage-java-48.js` 的本课
3. 禁区：勿改「三者是不同承诺」主轴
