# 关卡 2 在事务边界后补上 ACID 与隔离级别

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | [2026-10-13-architect-path-mybatis.md](2026-10-13-architect-path-mybatis.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

关卡 2 的事务顺序是 Spring 代理边界，下一节直接是 MVCC。ACID 四项承诺和隔离级别已有课，没有排进主线。

## 决策

- 采用：在 `spring-transaction` 之后、`mysql-mvcc` 之前加入已有课 `mysql-acid-c-is-consistency`、`mysql-isolation-levels`。两节都必读。
- 不采用 / 刻意不做：不新写一课。不把 `mysql-isolation`（隔离级别不能代替唯一约束）再排进来，那一层由后面的幂等和唯一约束承接。不在 `outputs` 中间插入新行。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/masteryGates.ts` | 关卡 2 怎么读和两节必读 |
| `docs/全栈主线精通审查.md` | 关卡 2 必读 id |
| `docs/架构师主线设计.md` | 文首课单说明 |

## 验证

- 浏览器打开关卡 2，顺序为 Spring 事务边界、ACID、隔离级别、MVCC。

## 后续

- [ ] 不要把这两节改成「二选一」。
- [ ] 若要交付物单独写出四个字母和默认隔离级别，追加到该关 `outputs` 末尾。
