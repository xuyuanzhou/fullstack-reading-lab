# 分布式与高并发提问可读性过一遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 承接 `2026-10-10-java-data-prompt-pass.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

数据库 / 缓存 / 消息已补参考答案。分布式与高并发章「为什么」类提问仍缺 `promptAnswer`。

## 决策

- 采用：全章 54 课补上 `promptAnswer`；约 9 课重写叠句提问。答案点破口号与机制两件事，不整段照抄 `answer`。
- 顺带：对齐 OUTLINE 与课源 id（RWS / bounce tracking / Redis 复制链路 / MySQL Clone）。
- 不采用 / 刻意不做：不在这一刀改机制正文。设计模式、工程实践、交付与运行、搜索等章下一刀再扫。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| 多份 `curriculum/coverage-java-*.js` 等 | 插入 `promptAnswer`；部分改 `prompt` |
| `scripts/curriculum.mjs`、`example-code-blocks.js` | 悬空大纲 id 对齐已有课 |
| `README.md`、`web/src/data/curriculum-*.json` | 公开计数与导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：`withAnswer 54 of 54`。导出 903 课 / 2717 知识点，校验通过。

## 后续

- [x] 下一刀：设计模式 / 工程实践 / 交付与运行 → `2026-10-10-java-ops-prompt-pass.md`
- [ ] 并行会话加课务必 OUTLINE id 与课源 id 一致后再挂

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-10-java-data-prompt-pass.md`
2. 筛剩余 `track==='java' && !promptAnswer && /为什么/`，按章推进
3. 禁区：不要整段复制 `answer`；修 OUTLINE 时优先对齐课源 id，勿删已有课
