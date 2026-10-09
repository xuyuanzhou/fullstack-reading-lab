# D8 续抽：线程池公式与读写分离（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；续 java-96（Jenkins / 库表锁）；同会话修 SVG UTF-8 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

线程池核数倍数口诀与「读写分离=强一致」在资料中常见省略条件。另：并行落地的 `db-insert-unique-cron-not-lease.svg` 曾损坏非 UTF-8，已重写。

## 决策

- 采用：`coverage-java-98.js`；挂「线程池」「表」。
- 不采用：不给出唯一正确池大小数字；不以同步复制口号代替会话读策略。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-98.js` | 2 课 + SVG |
| `diagrams/db-insert-unique-cron-not-lease.svg` | 修复 UTF-8 |
| 队列 D84–D85 / 校订 / 审计 | 台账 |

## 验证

见同日 W3C round11 变更记录的 export 命令。

## 后续

- [x] D8 其余页继续主题抽查 → 见 `2026-10-09-d8-leaky-zk-odd.md`

## 给下一模型

1. 先读：本文 + `JAVA_AUDIT_98.md`
2. 空闲号先 ls；diagram 必须合法 UTF-8
3. 禁区：勿全文盖章 206 页；勿上传原 PDF
