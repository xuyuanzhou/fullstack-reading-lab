# 新建分页与多级页表定义课并挂 OS 图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [virtual-addr-mmu](2026-10-10-library-sync-virtual-addr-mmu.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

虚拟地址课已挂 `os-p0122`。台账下一刀是分页/页表；从亮白本导出 p123–p130 后选题挂图。

## 决策

- 采用：`linux-memory-paging`←`os-p0128`（页号/偏移翻译）；`linux-multilevel-page-table`←`os-p0130`；亮白本 `source_review` 标「已发布课程」。
- 不采用：本回合不开分段/碎片/缺页专课（`os-p0123`～`p0127`、`p0129` 留备用）；不硬挂 JVM 结构课；不编 TLB（书中本段无独立 TLB 专图）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-23.js` | 两课正文 + diagram/origin |
| `curriculum/library-assets/illustrated-basics/os-p0123.png`～`p0130.png` | 新导出；挂图用 128/130 |
| `scripts/curriculum.mjs` | OUTLINE + 检索标签 |
| `private-data/index.sqlite3` `source_review` | 亮白本两条回写 |
| `README.md` / 台账 / 核对交接 | 952 / 2864 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：952 / 2864；export 与 publication manifest 一致。

## 后续

- [x] 可选：分段 / 缺页 / TLB → 已由 [seg-fault-tlb](2026-10-10-library-sync-seg-fault-tlb.md) 接续
- [ ] AI 工具篇机制图仍无则继续跳过
- [ ] 勿把分页页挂到 JVM 运行时区课

## 给下一模型

1. 先读：`docs/library-sync/STATUS.md` 与 `batch-02-illustrated-basics.md` 备用页表
2. 新课在 `coverage-java-23.js`，OUTLINE 紧挨 `linux-virtual-addr-mmu`
3. 禁区：STATUS 跳过表；本机绝对路径
