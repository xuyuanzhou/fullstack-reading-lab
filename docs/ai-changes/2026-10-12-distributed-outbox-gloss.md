# Outbox 课：术语点击释义与答案空行

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `distributed-outbox`；接续 `2026-10-12-distributed-outbox-review.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

再审：答案未空行；双写空窗 / Outbox / 至少一次 / CDC / 幽灵事件宜点击释义，且幽灵事件须与「先消息后库」挂钩。

## 决策

- 采用：上述 〔〕 标记；答案空行；deep CDC 段不再重复展开全称。
- 不采用：改「至少一次不是恰好一次」主轴；课上写事务消息同义词。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/distributed-lessons.js` | `distributed-outbox` core / answer / deep |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔双写空窗｜|〔幽灵事件｜' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿声称 Outbox=恰好一次
- [ ] 勿写回「事务消息」当 Outbox 同义词

## 给下一模型

1. 先读：本文 + `2026-10-12-distributed-outbox-review.md`
2. 再读：`curriculum/distributed-lessons.js` 的本课
3. 禁区：勿改至少一次主轴
