# 连表超时题去掉并不存在的 user_id 条件

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 笔试专关 OS-W3；`docs/高并发下单笔试关-2026-10-16.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

上一版把 `o.user_id = ?` 写进了题面，并按「先点查这一个用户」作答。原题没有这个条件。过滤只剩 `status IN ('paid', 'shipped')` 和 `u.level = '500'`，再按时间取 20 行。

## 决策

- 采用：题面去掉 `user_id`。五个慢点改为：锁与执行分开；以 `user_id` 开头的索引用不上；没有 `(status, created_at, id)` 时 `LIMIT` 在全量排序之后；`'500'` 对整数列是隐式转换；每个候选订单都按主键读 `users`。优化后的索引是 `(status, created_at, id, user_id)`，两个状态各等值并带 `u.level = 500`，凑满 20 行再 `UNION ALL`。不能先 `LIMIT 20` 再过滤等级。题版本改为 3。
- 不采用 / 刻意不做：不把 OS-W4 的 `(user_id, status)` 拿掉。有 `user_id` 的查询仍走那一条。不把宽报表索引留在下单主库。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/orderScaleGate.ts` | OS-W3 题干、答案、阅卷要点；W4 图注；W5 另留的索引 |
| `curriculum/diagrams/order-scale-sql.svg` | 没有 user_id 的访问路径 |
| `web/public/exam/order-scale-sql.svg` | 与课程图同一份 |
| `docs/高并发下单笔试关-2026-10-16.md` | 阅卷要点改成没有 user_id |
| `scripts/learning-platform.test.mjs` | 题面不得含 `o.user_id`，答案含 `idx_status_created` |

## 验证

```bash
node --test scripts/learning-platform.test.mjs
```

- 结果：21 项测试通过。浏览器打开 OS-W3，题版本 3，题干 WHERE 只有 `status IN` 和 `u.level = '500'`。标准图按 status、created_at 往回走。

## 后续

- [x] 题面、答案、图都按没有 user_id 写
- [ ] 不要把 `g-order-scale` 放进九关，也不要让 OS- 点亮技能树

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/orderScaleGate.ts` 的 `OS-W3`
3. 若续作：OS-W3 的 WHERE 只有 `status` 和 `u.level`。有 `user_id = ?` 的是 OS-W4
4. 禁区：勿把缓存扣减写成库存权威；中文 SVG 用 UTF-8 写入
