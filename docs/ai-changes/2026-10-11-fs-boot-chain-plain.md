# 写接口分段课标题与提问改可读

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | `fs-boot-chain`；用户：写的不好，看不懂 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

标题「沿着…往下走」、提问「表结构漏到 HTTP」、参考答案「堆在控制器里」语义不清，也不符合公开课不用口语套话的约定。

## 决策

- 采用：标题改为「写接口分成校验、用例、事务和响应」；提问点明「直接 new 实体并 save → 改表/改规则会迫使 HTTP 契约一起改」；答案与练习参考答案对齐。
- 不采用：改分段职责本身（校验 / 用例 / 持久化 / 响应）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | `fs-boot-chain` 标题、提问、参考答案、core/why/answer |
| `curriculum/answer-walkthrough.js` | 与 coverage `answer` 同步 |
| `web/src/data/learningPaths.ts` | 第 1 关课注 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
rg '写接口分成校验' web/src/data/curriculum-index.json
```

- 结果：索引标题与提问已更新；无「漏到 HTTP」「堆在控制器」。

## 后续

- [ ] 主线其它课若再出现「往下走 / 漏到 / 堆在」，同样改成可核对说法
- [ ] 不要把「漏到 HTTP」写回提问

## 给下一模型

1. 先读：本文 + `fs-boot-chain` 的 `prompt` / `promptAnswer`
2. 教学点：控制器不直接操作实体，避免表结构进入接口契约
