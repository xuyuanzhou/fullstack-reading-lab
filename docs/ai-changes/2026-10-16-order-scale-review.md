# 审查笔试六题的答案是否成立

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 笔试专关 OS-W1 至 OS-W6；`docs/高并发下单笔试关-2026-10-16.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

OS-W3 去掉 `user_id` 等值之后，标准答案仍有几处会判错：把五个可能原因写成已经发生；把 `LIMIT 20` 说成加索引后一定停下；没说明 `id` 必须紧跟 `created_at`；图上把 OS-W3 标成没有排序列。OS-W4 把「只建 status 索引」说成一律不合格，和 OS-W3 冲突。

## 决策

- 采用：五个慢点写成可能原因，用 `EXPLAIN ANALYZE` 和慢日志确认。索引保持 `(status, created_at, id, user_id)`。省略 `id` 时 InnoDB 会把主键补到末尾，`ORDER BY created_at, id` 用不上。两支等值查询合并后，计划必须是 orders 驱动、users 为 eq_ref、没有对整个状态做 filesort；驱动表错了再用 `STRAIGHT_JOIN`。`level` 字面量与列类型一致。不能先 `LIMIT` 再过滤等级。OS-W4 只否定「用 status 索引回答某一个用户」。OS-W5 写明拿掉两条在线索引各自的后果。OS-W1 的库存更新、订单、Outbox 写在同一个事务里，影响行数不是 1 就回滚。
- 不采用 / 刻意不做：不把库存扣减改成只发消息。不把五千万行写成拆表开关。不改题面 SQL。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/orderScaleGate.ts` | OS-W1 事务、OS-W3 列序与计划、OS-W4 / OS-W5 的边界 |
| `curriculum/diagrams/order-scale-sql.svg` | 改正「OS-W3 没有排序列」 |
| `web/public/exam/order-scale-sql.svg` | 与课程图同一份 |
| `docs/高并发下单笔试关-2026-10-16.md` | 阅卷要点与答案对齐 |
| `scripts/learning-platform.test.mjs` | 断言列序说明和 `STRAIGHT_JOIN` |

## 验证

```bash
node --test scripts/learning-platform.test.mjs
```

- 结果：22 项测试通过。页面上的 OS-W3 题面没有 `user_id` 等值，标准答案写明五个可能原因、`id` 紧跟 `created_at`，以及驱动表不对时用 `STRAIGHT_JOIN`。标准图 XML 有效，排序列不再被标成不存在。

## 后续

- [x] 六题里互相打架的句子已改
- [ ] 不要把 `g-order-scale` 放进九关

## 给下一模型

1. 先读：本文 + `web/src/data/orderScaleGate.ts` 的 `OS-W3`
2. OS-W3 的 WHERE 没有 `user_id = ?`。有这个等值的是 OS-W4
3. `(status, created_at, user_id)` 不能代替 `(status, created_at, id, user_id)`
4. 禁区：缓存扣减不是库存权威；中文 SVG 用 UTF-8 写入
