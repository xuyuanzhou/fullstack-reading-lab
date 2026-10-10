# React / Vue / 全栈主线 / 微前端提问可读性过一遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 承接 `2026-10-10-selection-prompt-pass.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

技术选型 15 课已带参考答案。React、Vue、全栈主线、微前端里带「为什么」的提问大多没有 `promptAnswer`，部分旧资料式提问叠句难读。

## 决策

- 采用：上述四章（含 React 生态、Vue 生态）里所有「为什么 / 怎么 / 何时 / 哪」提问共 59 课全部补上 `promptAnswer`。约十余课重写提问，拆开「旧资料说法」和「现行该看什么」。答案点破提问里叠在一起的两件事，不整段照抄 `answer`。
- 不采用 / 刻意不做：不在这一刀改机制正文或例子代码。Java 轨下一刀再扫。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/lessons.js`、`extra-lessons.js`、多份 `coverage-*.js` | 插入 `promptAnswer`；部分改 `prompt` |
| `web/src/data/curriculum-*.json` | `export:curriculum` |

## 验证

```bash
node --experimental-strip-types -e '…统计 withAnswer…'
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：目标四章 `withAnswer 59 of 59`。导出 877 课，校验通过。

## 后续

- [x] 下一刀扫 Java 轨同模式提问 → `2026-10-10-java-core-prompt-pass.md`（Java 基础 / 并发 / JVM）
- [ ] 浏览器抽查 `linked-list`、`rr-mode-gates-data`、`fs-four-layers` 标题下可展开参考答案

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-10-selection-prompt-pass.md`
2. 用脚本筛 `!promptAnswer && /为什么/.test(prompt)`，按章推进
3. 禁区：不要改主线关卡；不要用整段 `answer` 当 `promptAnswer`
