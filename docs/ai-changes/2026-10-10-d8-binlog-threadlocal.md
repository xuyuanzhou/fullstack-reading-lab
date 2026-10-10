# D8 续抽：binlog≠事件总线；ThreadLocal≠分布式上下文（2 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；`coverage-java-110.js` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

资料把 binlog 监听夸成事件平台，并把 ThreadLocal 写成全链路上下文。

## 决策

- 采用：挂「一致性」「隔离」；队列 D94–D95。
- 不采用：不全文盖章 206 页。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-110.js` | 2 课 + SVG |
| 队列 / 校订 / 审计 | 台账 |

## 验证

见同日 W3C round14 变更记录。

## 后续

- [ ] D8 其余页继续主题抽查（先 ls `coverage-java-111.js`）

## 给下一模型

1. diagram 必须 UTF-8
2. 禁区：勿上传原 PDF
