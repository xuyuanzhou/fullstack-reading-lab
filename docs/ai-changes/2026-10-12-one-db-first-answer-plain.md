# 同库不变量课：参考答案首句改可读

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `distributed-one-db-first`；接续 `2026-10-12-distributed-one-db-first-gloss.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

「不变量先写成句子，再标能否同库一次提交」过密，学员要追问才能懂。

## 决策

- 采用：展开为「先写成句子 → 逐句标能否同库一次提交 → 不要先选工具」；举例句加引号并对齐「能同库」箭头。
- 不采用：在答案里展开 Seata 模式。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-48.js` | `distributed-one-db-first` 的 `answer` |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '先把必须一直成立的事实写成句子' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 若 task 仍嫌抽象，可与 answer 首句再对齐一次

## 给下一模型

1. 先读：本文
2. 再读：`curriculum/coverage-java-48.js` 的本课 `answer`
3. 禁区：勿改提问口径（不该刚拆就上 Seata）
