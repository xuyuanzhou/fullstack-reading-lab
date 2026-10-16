# 笔试专关补上标准答案和架构图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | [高并发下单笔试关-2026-10-16.md](../高并发下单笔试关-2026-10-16.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

六题只有阅卷要点，没有可对照的标准答案。架构要求停在文字箭头，卷面上看不见同步、异步和读路径怎么分开。

## 决策

- 采用：每题增加 `answer`。OS-W1 / OS-W2 / OS-W6 共用架构图；OS-W3 / OS-W4 / OS-W5 共用访问路径图。图放在 `curriculum/diagrams/`，站点从 `web/public/exam/` 读取，避免导出课程时清掉 `web/public/diagrams/` 里未被课文引用的文件。
- 不采用：把图挂进某一课的 `diagram` 字段；用文字箭头代替架构图。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningTasks.ts` | `WrittenExam` 增加可选 `answer`、`diagram` |
| `web/src/data/orderScaleGate.ts` | 六题标准答案 |
| `web/src/components/learning/CurrentTask.tsx` | 笔试展开标准答案和图 |
| `curriculum/diagrams/order-scale-architecture.svg` | 下单架构图 |
| `curriculum/diagrams/order-scale-sql.svg` | 连表与索引图 |
| `web/public/exam/*.svg` | 站点副本 |
| `docs/高并发下单笔试关-2026-10-16.md` | 指向标准答案和图 |

## 验证

```bash
node --test scripts/learning-platform.test.mjs
```

- 结果：学习平台测试 21 项通过。浏览器打开 OS-W1 标准答案，架构图能显示：限流、同步事务、读路径、Outbox 四段都在。

## 后续

- [ ] 改图要同时改 `curriculum/diagrams/` 和 `web/public/exam/`，不要只改一边
- [ ] 不要把这两张图放进 `web/public/diagrams/` 却不给课文引用，导出时会被删掉

## 给下一模型

1. 先读：本文 + `web/src/data/orderScaleGate.ts`
2. 标准答案在各题 `answer`，阅卷要点仍是 `parts.lookFor`
3. 禁区：不要把缓存扣减画成库存权威
