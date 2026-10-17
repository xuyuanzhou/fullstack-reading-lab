# 选择题按章节排，不再凑满 10 题

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [选择题加上多选，单选保留](2026-10-17-drill-multi.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

多选被单独放成「前端多选」这类卷，总图上也是一列方块，和主路的石台不是一套。凑不满 10 题的分组被整组丢掉。

## 决策

- 采用：多选按课文分组接进对应章节。已有章节的新关排在原来的关后面。JVM、并发、缓存、Nginx、网关、消息队列、Spring Cloud Alibaba、分布式与高并发、交付与运行、测试、工程实践单独成章。一组课文一关，题数不凑 10。总图选择题改成和主路一样的石台。现在 25 门课、134 关、1387 题。
- 不采用 / 刻意不做：不改 d1–d12、s1–s12、p1–p15、m1–m8 和已生成单选关的题目名单；不清 `drill.log`。「三卷」仍只计系统设计、SQL 优化和性能排查，但这两门若接上了新关，通关要连新关一起过。服务性能排查这次没有新关。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `scripts/build-drill-multi.mjs` | 按章节生成，一组一关 |
| `web/src/data/drillMulti.ts` | 新章节和各章后补的关 |
| `web/src/data/drillMultiRoads.ts` | 总图关号，已有章用 `MULTI_EXTRA` |
| `web/src/data/drillBank.ts` | 新章登记在单选章之后，新关接在每章末尾 |
| `web/src/data/drillOutline.ts` | 总图把新关接到原章后面 |
| `web/src/data/drillRules.ts` | 徽章按章节，去掉「前端多选」这类 |
| `web/src/pages/DrillPage.tsx` | 大厅标题改成按章节 |
| `web/src/pages/PathPage.tsx` | 总图选择题改用石台 |
| `web/src/styles/_reading.scss` | 去掉总图上那一列方块 |
| `scripts/drill.test.mjs` | 课程 25、关卡 134、题目 1387；只有旧关仍必须 10 题 |

## 验证

```bash
node scripts/build-drill-multi.mjs
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：43 个新关、477 题，最短 1 题，最长 42 题，没有因为不够 10 题被丢掉。测试 10 项通过，类型检查通过。浏览器 `#/paths` 选择题是石台，站名是系统设计、SQL 优化、Java 基础、JVM，没有「前端多选」。`#/drill/java` 先是原来的 6 关，最后一关是这一章的多选。没有提交答案。

## 后续

- [ ] 再生成时跑 `node scripts/build-drill-multi.mjs`，不要手改 `drillMulti.ts`。
- [ ] 搜索这一组在「Spring 与数据访问」里，课表上的名字是 Elasticsearch。
- [ ] 结论拆不出两句的课仍然进不了多选。

## 给下一模型

1. 先读：本文和 `scripts/build-drill-multi.mjs` 的 `CHAPTERS`
2. 再读：`web/src/data/drillOutline.ts` 末尾怎么把 `MULTI_EXTRA` 接到原章
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要把题再拆成「单选卷 / 多选卷」；不要把不够 10 题的分组丢掉；不要改已发布单选关的题目名单
