# 学习课例子代码块第十五批（润色错配模板围栏，32 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch14](2026-10-09-lesson-example-code-batch14.md) 后续「润色模板」 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

公开课 example 已全部带围栏，但并行 `batch-complete` 留下大量「对照本课断言…」模板：并发课共用线程池片段、Node 课共用 `http.createServer`、Query 课误贴 Router 等。

## 决策

- 采用：在 `example-code-blocks.js` **末尾覆盖**同 id（后写覆盖先写），按 coverage 原文 example 重写短围栏。
- 不采用：一次性清空全部模板（约 290 条仍带套话，分批润色）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | 覆盖 32 课错配模板 + 顺带去掉 2 课套话前缀 |
| `web/src/data/curriculum*.json` | export 产物 |

本批含：`java-happens-before`、`java-interrupt`、`java-reentrant-lock`、`java-virtual-threads`、`java-executor`、`java-concurrency`、`java-collections`、`java-exceptions`、`java-priority-queue`、`java-barrier-latch`、`node-emitter`、`node-buffer`、`node-nexttick`、`node-stream`、`query-cache-not-http-client`、`xss`、若干 MySQL/Redis/MQ/HTTP/`spring-legacy-config`。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：857 课；fenced **857**；本批 32 个 id 均无「对照本课断言」；`verify_content` 通过。
- 剩余：仍含套话前缀约 **290** 课（待下一批）。

## 后续

- [x] MySQL `SHOW ENGINE` / VARCHAR 错配簇（见 [batch16](2026-10-10-lesson-example-code-batch16.md)）
- [ ] 继续润色：MyBatis / Spring Boot / 并发 / Node 共用片段
- [ ] 新课入库勿再用「对照本课断言」套话生成器

## 给下一模型

1. 先读：本文 + [batch14](2026-10-09-lesson-example-code-batch14.md)
2. 覆盖写法：往 `EXAMPLE_CODE_BLOCKS` **文件末尾**追加同 id
3. 对照原文：加载时排除 `example-code-blocks.js` 再读 `lesson.example`
4. 约定：`docs/课程例子代码块约定.md`
