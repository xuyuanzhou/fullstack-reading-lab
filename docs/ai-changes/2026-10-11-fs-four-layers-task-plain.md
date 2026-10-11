# 主线首课练习题与答案去掉「守」句式

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | `fs-four-layers`；用户：问题和答案很别扭 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

练习题写「各守的一句话」，参考答案连用「页面守 / 接口契约守 / 用例守 / 持久化守」，读起来像硬译，不像能直接做的题。

## 决策

- 采用：改成「管什么」句式；题干拆成四句话说明 + 三件事归属；答案与参考答案同步。
- 顺带：开头参考答案、例子导语、主线交付文案里的「各守」改成「各自管」。
- 不采用：改教学目标或换例子。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | `promptAnswer`、`task`、`answer` |
| `curriculum/answer-walkthrough.js` | 同步 `answer` |
| `curriculum/example-code-blocks.js` | 例子导语 |
| `web/src/data/learningPaths.ts` | 第 1 关 how / deliver / outputs 用词 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
rg '页面管这次交互|四句话分别说明' web/src/data/curriculum-bodies-frontend.json
```

- 结果：导出已是新文案；源文件无「页面守这次交互」。

## 后续

- [ ] 同章其它课若再出现「X 守 Y」套话，按同样方式改成「管 / 负责」
- [ ] 不要把「管」再改回「守」

## 给下一模型

1. 先读：本文 + `fs-four-layers` 的 `task` / `answer`
2. `deliverableKey` 按 index，改 outputs 文案不会清掉勾选
3. 禁区：术语仍用页面、接口契约、用例、持久化
