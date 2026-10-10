# 学习课例子代码块第十七批（润色 MyBatis / Spring / 并发 / Node / JPA，53 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch16](2026-10-10-lesson-example-code-batch16.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

套话模板剩余里，MyBatis 共用 `resultMap` 片段、Spring 共用 `@SpringBootApplication`、并发共用 `FixedThreadPool`、Node 共用 `createServer`、JPA 共用 `@Entity` 骨架，均与原文 example 不对齐。

## 决策

- 采用：在 `example-code-blocks.js` 末尾覆盖同 id。
- 不采用：一次清空全部剩余套话。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | 覆盖 53 课（14 MyBatis + 13 Spring + 11 并发 + 7 Node + 8 JPA） |
| `web/src/data/curriculum*.json` | export 产物 |
| `README.md` | 课数对齐 883 / 2656（前端 293 / Java 590） |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：883 课 / 2656 KP；本批 53 个 id 均无套话；仍含套话约 **204**；`verify_content` 通过。

## 后续

- [x] Kafka / RocketMQ / Redis / CSP·CORS / EXPLAIN 索引启发式（见 [batch18](2026-10-10-lesson-example-code-batch18.md)）
- [ ] 新课勿再用「对照本课断言」套话生成器

## 给下一模型

1. 先读：本文 + [batch16](2026-10-10-lesson-example-code-batch16.md)
2. 覆盖写在文件末尾；对照原文时排除 `example-code-blocks.js`
3. 课数变了同步 `README.md`
