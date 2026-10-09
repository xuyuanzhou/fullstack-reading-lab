# D8 续抽：漏桶/ZK 奇数 + Xmx/缓存竞态（4 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 《分布式高并发》D8；`java-99`（漏桶/ZK）+ `java-100`（Xmx/双写） |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

并行会话写入 java-99 漏桶与 ZK 奇数说法，但 SVG 非 UTF-8 导致 load 失败；本会话重写 SVG，并另开 java-100 讲容器 Xmx 与 Cache Aside 竞态。

## 决策

- 采用：保留 java-99 主题；修复 SVG；java-100 两课。
- 不采用：不全文盖章 206 页。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `coverage-java-99.js` / `100.js` | 4 课 |
| 两枚损坏 SVG | 重写 UTF-8 |
| 队列 D86–D89 / 校订 / 审计 | 台账 |

## 验证

见同日 W3C round12 变更记录。

## 后续

- [x] D8 其余页继续主题抽查 → 见 `2026-10-09-d8-seckill-mq-vnode.md`

## 给下一模型

1. diagram 必须合法 UTF-8；写后 `python3 -c "open(...).read().decode()"`
2. 空闲号先 ls
3. 禁区：勿上传原 PDF
