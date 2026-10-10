# Spring / MyBatis / JPA 提问可读性过一遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 承接 `2026-10-10-java-core-prompt-pass.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

Java 基础 / 并发 / JVM 已补参考答案。Spring、MyBatis、JPA 仍有「为什么」类提问无 `promptAnswer`。

## 决策

- 采用：三章共 42 课补上 `promptAnswer`；约 5 课重写叠句提问。答案点破代理/会话/占位符等叠在一起的两件事，不整段照抄 `answer`。
- 顺带：修 `example-code-blocks.js` 双逗号语法错误；大纲里挂了尚未落课的 `fe-pick-decision-order` 等选型 ID，先从 OUTLINE 拿掉并去掉课内悬空交叉引用，否则导出校验不过。
- 不采用 / 刻意不做：不在这一刀新写选型对照四课；数据库 / 缓存 / 消息下一刀再扫。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| 多份 `curriculum/coverage-*.js`、`lessons.js` 等 | Spring / MyBatis / JPA 插入 `promptAnswer` |
| `curriculum/example-code-blocks.js` | 去掉 `].join('\n'),,` |
| `scripts/curriculum.mjs`、`coverage-frontend-20.js` | 技术选型大纲与悬空链接回退到已有课 |
| `README.md`、`web/src/data/curriculum-*.json` | 公开计数与导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：三章 `withAnswer 42 of 42`。导出 890 课，校验通过。

## 后续

- [x] 下一刀：数据库 / 缓存 / 消息 → `2026-10-10-java-data-prompt-pass.md`
- [x] 选型对照课已由并行会话落盘；本刀修了其 SVG UTF-8

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-10-java-core-prompt-pass.md`
2. 筛 `track==='java' && !promptAnswer && /为什么/.test(prompt)`，按章推进
3. 禁区：OUTLINE 里不要挂尚未存在的课 id；不要整段复制 `answer`
