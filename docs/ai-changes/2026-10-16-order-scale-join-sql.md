# 连表超时题改成五处慢点和优化后的 SQL

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 笔试专关 OS-W3；`docs/高并发下单笔试关-2026-10-16.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

OS-W3 原先只要求看检查行数并加一条组合索引。题面要改成带 `u.level = '500'` 的连表语句，并写出至少五个性能问题、优化步骤和优化后的 SQL。

## 决策

- 采用：题干放原 SQL。标准答案列五点：锁等待与执行时间分开；订单缺 `(user_id, status, created_at, id)`；`user_id` 已确定一个用户，`level` 仍可能让优化器先扫该等级的全部用户；`'500'` 对整数列是隐式转换；`status IN` 两个值时 `created_at` 不能跨状态有序，排序后才 `LIMIT`，每个候选行再读 `users`。优化后先点查 `users`，不匹配就不查订单；两个状态各等值 `LIMIT 20`，`UNION ALL` 后再 `LIMIT 20`。题版本改为 2。
- 不采用 / 刻意不做：不把这条题放进九关；不把缓存或拆表写成第一步；不把单条 JOIN 派生表写成唯一答案，因为派生表仍可能先扫订单。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/orderScaleGate.ts` | OS-W3 题干、阅卷要点和标准答案 |
| `web/src/components/learning/CurrentTask.tsx` | 笔试题干按围栏渲染 SQL |
| `curriculum/diagrams/order-scale-sql.svg` | 五个慢点和先点查用户 |
| `web/public/exam/order-scale-sql.svg` | 与课程图同一份 |
| `docs/高并发下单笔试关-2026-10-16.md` | 阅卷要点改成这五点 |
| `scripts/learning-platform.test.mjs` | 断言题面含 level、答案含 UNION ALL |

## 验证

```bash
node --test scripts/learning-platform.test.mjs
```

- 结果：21 项测试通过。浏览器打开 OS-W3，题干 SQL 含 `u.level = '500'`，标准图列出五个慢点，答案里的索引和 `UNION ALL` 按代码块显示。

## 后续

- [x] 题干、答案、图一致
- [ ] 不要把 OS-W3 并回九关，也不要让 OS- 点亮技能树

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/orderScaleGate.ts` 里 `OS-W3`，以及两份 `order-scale-sql.svg`
3. 若续作：中文 SVG 用 Python 按 UTF-8 写入，不要用会破坏中文的写入
4. 禁区：勿把 `g-order-scale` 放进 `MASTERY_GATES`；库存权威仍是条件更新，不是缓存扣减
