# 同库不变量课：对齐提问并补释义

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | `distributed-one-db-first` 审查 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查发现提问「为什么…第一件事就是上 Seata」与回答「先做单库」不对题；「不变量」缺括注；示例被订单+明细代码冲淡；答案未分条。

## 决策

- 采用：提问改为是否该上 Seata；回答直接说「不该」并点明补洞；括注不变量；理顺明细/库存两例；示例与答案分条；链邻课。
- 不采用：改短名（现短名「能放进一个库的不变量」可用）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-48.js` | 提问/回答/core/why/example/task/answer/deep |
| `curriculum/example-code-blocks.js` | 示例改回同库 vs 硬拆对照 |
| `web/src/data/learningPaths.ts` | 主线 job 对齐 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过

## 后续

- [ ] 浏览器打开本课扫一眼提问与参考答案
- [ ] 勿在本课展开 Seata AT/TCC 细节（后续课）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-java-48.js` 中 `distributed-one-db-first`
3. 若续作：从「后续」勾选
4. 禁区：勿把 Seata 模式细节搬进本课正文
