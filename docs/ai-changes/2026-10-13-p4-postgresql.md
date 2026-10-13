# P4-05 补上 PostgreSQL 默认隔离与 VACUUM 课

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成这一节课；P4-05 整项未勾选 |
| 关联 | [全栈学习平台实施总计划-2026-10-13.md](../全栈学习平台实施总计划-2026-10-13.md) P4-05；续 [2026-10-13-p4-teleport.md](2026-10-13-p4-teleport.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

能力差距清单按课名检索时，PostgreSQL 为 0。已有 `mysql-isolation-levels` 讲 InnoDB 默认是可重复读，不能套到 PostgreSQL。

## 决策

- 采用：在 Java 数据库组「事务」中、`mysql-isolation-levels` 之后新增 `postgresql-read-committed-vacuum`。依据 PostgreSQL 事务隔离和日常 VACUUM 两页。例子写出 `SHOW default_transaction_isolation`、同一事务里的两次 `SELECT`，以及常规 `VACUUM`。
- 不采用 / 刻意不做：不把 MySQL 实验改成 PostgreSQL。不跑 VACUUM FULL。不把这节放进九关必读。不勾选 P4-05。不写 Next.js、Helm、Terraform、等保。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-09.js` | 新增 `postgresql-read-committed-vacuum`，3 个知识点 |
| `scripts/curriculum.mjs` | 事务目录 |
| `README.md` | 课数改为 1072、知识点 3227、Java 704 |
| `web/src/data/curriculum*.json` | 导出结果 |
| `docs/全栈学习平台实施总计划-2026-10-13.md` | P4-05 记入新课，仍不勾选 |

## 验证

```bash
node ../scripts/export-curriculum.mjs
node ../scripts/verify_content.mjs
```

- 结果：导出 1072 课，前端 368、Java 704。验证通过：`1072 lessons / 3227 knowledge points`。
- 未执行：没有启动 PostgreSQL，也没有跑 `VACUUM`。

## 后续

- [ ] 38 个单元仍缺实验。不要用这一节课把 P4-05 勾上。
- [x] k6 已续写到 [2026-10-13-p4-k6.md](2026-10-13-p4-k6.md)，课号 `k6-threshold-not-check`。
- [ ] 差距表里还有课名检索为 0 的条目，例如 JMeter。补课时仍要有权威依据和代码，再导出验证。
- [ ] 不要为了凑齐课数去写 Next.js、Helm、Terraform、等保专章。
- [ ] 不要勾选 P4-02。不要把订单实验从 MySQL 8.4 换成 PostgreSQL。

## 给下一模型

1. 先读本文和 `curriculum/coverage-java-09.js` 里的 `postgresql-read-committed-vacuum`
2. 课已在 Java 数据库组的事务目录。九关没有这条 id。InnoDB 默认隔离仍是 `mysql-isolation-levels`
3. 若续作：写 k6，或做 P4-06。不要把这一节标成 P4-05 全部完成
4. 禁区：不手改导出 JSON 当源，不把 MySQL 实验改成 PostgreSQL，不部署
