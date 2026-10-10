# Java 基础 / 并发 / JVM 提问可读性过一遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 承接 `2026-10-10-react-vue-prompt-pass.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

前端选型与 React/Vue/主线/微前端已补 `promptAnswer`。Java 轨「为什么」类提问约 475 课仍缺参考答案。本刀先做 Java 基础、并发、JVM 三章。

## 决策

- 采用：上述三章全部「为什么 / 怎么 / 何时 / 哪」提问补上 `promptAnswer`（共 75 课有答案）。约 6 课重写叠句提问。答案点破旧资料说法与现行该看什么，不整段照抄 `answer`。
- 不采用 / 刻意不做：不在这一刀改机制正文。数据库 / 缓存 / 消息 / Spring 等章下一刀再扫。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/lessons.js`、`extra-lessons.js`、多份 `coverage-java-*.js`、`coverage-chapters-10.js`、`coverage-depth-14.js` 等 | 插入 `promptAnswer`；部分改 `prompt` |
| `web/src/data/curriculum-*.json` | `export:curriculum` |

## 验证

```bash
node --input-type=module -e '…统计 Java 基础/并发/JVM withAnswer…'
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：三章 `withAnswer 75 of 75`。导出校验通过。

## 后续

- [x] 下一刀：Spring / MyBatis / JPA → `2026-10-10-java-spring-prompt-pass.md`
- [ ] 仍勿用整段 `answer` 当 `promptAnswer`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-10-react-vue-prompt-pass.md`
2. 筛 `track==='java' && !promptAnswer && /为什么/.test(prompt)`，按章推进
3. 课源里 `id` 常与 `track`/`group` 同行；切课时边界用下一个 `{` + `track:`，勿只搜 `\nid:`
4. 禁区：不要改主线关卡；不要整段复制 `answer`
