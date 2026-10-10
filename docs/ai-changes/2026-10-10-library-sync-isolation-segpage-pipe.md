# 虚存隔离 / 段页式 / shell 管道三课挂图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [seg-fault-tlb](2026-10-10-library-sync-seg-fault-tlb.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

内存主线齐后，台账剩段页式、为何虚存，以及进程章可对上课。扫备用页：`os-p0121`/`p0135`/`p0187` 可选题；前言与哲学家就餐代码页跳过。

## 决策

- 采用：`linux-virtual-memory-isolation`←`os-p0121`；`linux-segmented-paging`←`os-p0135`；`linux-shell-pipe-fds`←`os-p0187`（紧挨 fork 课）。
- 不采用：挂 `os-p0001`（推广）、`os-p0231`（代码摘录）；不整章扫 OS 其余页。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-23.js` | 三课 |
| `scripts/curriculum.mjs` | OUTLINE 顺序（隔离在虚址前；管道在 fork 后） |
| `README.md` / 台账 | 958 / 2882 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：958 / 2882；export 与 publication manifest 一致。

## 后续

- [x] HTTP/Redis/网络分章专页按已有课选题 → 已由 [http-net-redis-pages](2026-10-10-library-sync-http-net-redis-pages.md) 接续
- [ ] AI 工具篇机制图仍无则跳过
- [ ] 勿挂 STATUS 跳过表中的 OS 页

## 给下一模型

1. 先读：`docs/library-sync/STATUS.md` 跳过表
2. 内存与管道新课均在 `coverage-java-23.js`
3. 禁区：本机绝对路径；前言/哲学家就餐页
