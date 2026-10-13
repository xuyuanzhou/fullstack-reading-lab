# 架构师主线补上数据库与 MyBatis

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | 架构师主线；[全栈主线精通审查.md](../全栈主线精通审查.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

架构师主线的持久化课只有 `jpa-optimistic-lock` 和 `jpa-session-nplus1`。数据库机制主要是 MVCC、版本脚本、深分页和关卡 6 的慢 SQL，主线上没有 MyBatis。

## 决策

- 采用：沿用现有课，加进共享的 `MASTERY_GATES`（页面读的就是 `PATHS.architect`，与全栈同一套关）。关卡 2 在 MVCC 后加 `mysql-innodb-index-lock`，在 JPA 乐观锁后加 `mybatis-not-jpa`。关卡 3 在 N+1 后加 `mybatis-resultmap`、`mybatis-local-cache`，再读深分页和旁路缓存。两套都必读，笔记里不要写成「二选一」（那会并成一个槽）。
- 不采用 / 刻意不做：不新写 MyBatis 整章，不把 `mybatis-what-it-is`、动态 SQL、二级缓存、PageHelper 排进默认顺序。不改交付勾选的既有下标（`gateId:index`），所以没有在 `outputs` 中间插入新行。不改关卡 id。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/masteryGates.ts` | 关卡 2、3 的怎么读和必读课 |
| `docs/全栈主线精通审查.md` | 关卡 2、3 必读 id |
| `docs/架构师主线设计.md` | 文首注明现行课单以审查文和 `masteryGates.ts` 为准 |

## 验证

- 浏览器打开 `http://127.0.0.1:5174/#/paths?gate=g2`：关卡 2 阅读 10 节，顺序里有「InnoDB 行锁加在索引记录上」「MyBatis 不托管实体生命周期」。交付仍是 5 条。
- 同一页切到关卡 3：阅读 6 节，顺序里有「结果映射决定列怎么变成对象图」「一级缓存只活在同一次会话里」，后面仍是深分页和旁路缓存。

## 后续

- [ ] 若要把 MyBatis 乐观锁写成独立交付物，追加到该关 `outputs` 末尾，不要插到中间。
- [ ] 不要把这四节改成「二选一」。
