# 学习课例子代码块第十六批（润色 MySQL 错配模板，38 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch15](2026-10-09-lesson-example-code-batch15.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

仍约 290 课带「对照本课断言」套话。其中 28 课共用错误的 `SHOW ENGINE INNODB STATUS` 片段，另有 VARCHAR/覆盖索引等启发式课共用口诀模板。

## 决策

- 采用：在 `example-code-blocks.js` 末尾覆盖同 id，按 coverage 原文重写。
- 不采用：一次清空全部剩余模板。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | 覆盖 38 课 MySQL 错配模板 |
| `web/src/data/curriculum*.json` | export 产物 |
| `README.md` | 课数对齐 877 / 2638（前端 291 / Java 586） |

本批：原 `SHOW ENGINE` 错配簇（表空间、FK、宽列、DATETIME、并行复制、redo/undo/binlog、checksum、initialize、无用户 HASH、自增持久化、FLOAT、ACID C、拆分阈值、JOIN、FOR UPDATE、金额、MVCC、禁令启发式、复制延迟、慢 SQL 等）+ VARCHAR/覆盖/前缀/change buffer 等。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：877 课 / 2638 KP；本批 38 个 id 均无套话；含 `SHOW ENGINE`+套话的剩余 **0**；仍含套话约 **252**；`verify_content` 通过。

## 后续

- [x] MyBatis / Spring / 并发 / Node / JPA 共用簇（见 [batch17](2026-10-10-lesson-example-code-batch17.md)）
- [ ] 新课勿再用套话生成器

## 给下一模型

1. 先读：本文 + [batch15](2026-10-09-lesson-example-code-batch15.md)
2. 覆盖写在 `EXAMPLE_CODE_BLOCKS` 文件末尾
3. 对照原文：加载时排除 `example-code-blocks.js`
4. 课数变了同步 `README.md`
