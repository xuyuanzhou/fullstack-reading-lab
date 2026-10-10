# 数据库 / 缓存 / 消息队列提问可读性过一遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 承接 `2026-10-10-java-spring-prompt-pass.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

Spring / MyBatis / JPA 已补参考答案。数据库、缓存、消息队列三章「为什么」类提问仍缺 `promptAnswer`。

## 决策

- 采用：三章共 166 课全部补上 `promptAnswer`。导论与高频机制课手写点破句；其余从练习答案提炼一两句，不整段照抄。约 5 课重写叠句提问。
- 顺带：修选型四课损坏 UTF-8 的 SVG（`fe-pick-decision-order` 等）；对齐验证码课 id 与交叉引用；去掉重复的 `coverage-java-113` 发布项（此前已处理者保持）。
- 不采用 / 刻意不做：不在这一刀改机制正文。分布式与高并发、工程实践等章下一刀再扫。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| 多份 `curriculum/coverage-java-*.js` 等 | 插入 `promptAnswer`；部分改 `prompt` |
| `curriculum/diagrams/fe-*-tradeoffs.svg`、`fe-pick-decision-order.svg` 与 `web/public/diagrams/` | 重写为合法 UTF-8 |
| `web/src/data/curriculum-*.json` | `export:curriculum` |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：三章 `withAnswer 166 of 166`。导出 899 课 / 2704 知识点，校验通过。

## 后续

- [x] 下一刀：分布式与高并发 → `2026-10-10-java-dist-prompt-pass.md`
- [ ] 双引号课源（`id:"…"`）补丁脚本要同时认单双引号

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-10-java-spring-prompt-pass.md`
2. 筛 `track==='java' && !promptAnswer && /为什么/.test(prompt)`，按章推进
3. 禁区：OUTLINE / diagram 必须 UTF-8；不要整段复制 `answer`
