# 下单拆分案例课：补库存预留库表设计

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `arch-split-order-case`；接续 `2026-10-12-arch-split-order-case-gloss.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

学员问：预留库存库表怎么设计、如何判断够不够、是否必须单独预留表。

## 决策

- 采用：deep「预留与扣减」写清两表型（列区分 / 预留流水）与 `WHERE available >= n` 影响行数判定；points 补一条；相关课加幂等键。
- 不采用：在本课展开秒杀热点行全部细节。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-08.js` | deep / points |
| `README.md` | 知识点 3180→3181 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg 'inventory_reservation|available >= :n' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿写成「先查再改」判库存

## 给下一模型

1. 先读：本文
2. 再读：本课 deep「预留与扣减」
3. 禁区：订单库勿直接 UPDATE 库存表
