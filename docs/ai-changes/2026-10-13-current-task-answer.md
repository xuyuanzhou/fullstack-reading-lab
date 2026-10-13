# 当次任务可以展开参考答案

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | [当次任务的按钮写明按下之后做什么](2026-10-13-current-task-button-purpose.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

当次任务有提示，没有参考答案。15 分钟的四段职责、30 分钟的旧版本更新、60 分钟的幂等重试，都要打开才能看见结论。

## 决策

- 采用：三道题各写一份参考答案，放在「先自己写，再看参考答案」里，默认收起。30 分钟写明后提交的旧版本必须失败，并写出带版本和剩余数量的 UPDATE。60 分钟写明同一幂等键第二次返回第一次的订单。答案依据课上的四段职责，以及 `labs/order-g1g2` 的更新语句和测试。
- 不采用 / 刻意不做：不默认摊开答案。不把参考答案记成已通过。不改任务 version，避免已有草稿对不上。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningTasks.ts` | 三道题补上 `answer` |
| `web/src/components/learning/CurrentTask.tsx` | 提示下面可展开参考答案 |
| `web/src/styles/_reading.scss` | 答案按换行显示 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json && npx oxlint src/components/learning/CurrentTask.tsx src/data/learningTasks.ts
```

- 结果：`tsc --noEmit` 与 `oxlint` 通过。浏览器 `http://127.0.0.1:5183/#/paths` 打开 30 分钟题的「先自己写，再看参考答案」，能看到后提交失败和带版本条件的 UPDATE。
- 未执行：本机 Maven。

## 后续

- [ ] 不要把展开参考答案写成证据或已通过。
- [ ] 改评分要求时才增加 `version`。

## 给下一模型

1. 先读本文和 `web/src/data/learningTasks.ts` 的 `answer`
2. 30 分钟的 UPDATE 以 `OrderStore.decrementIfVersion` 为准
3. 若续作：答案仍默认收起
4. 禁区：不要把样板测试结果写进 `gateCleared`
