# 分段 / 缺页换入换出 / TLB 三课挂图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [paging-page-table](2026-10-10-library-sync-paging-page-table.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

分页与多级页表课后，台账仍列分段、缺页、TLB。继续导出 p131–p135，确认 `os-p0133` 为 TLB 专图后三课一并落地。

## 决策

- 采用：`linux-memory-segmentation`←`os-p0123`；`linux-page-fault-swap`←`os-p0127`；`linux-tlb-cache`←`os-p0133`；OUTLINE 顺序为虚址→分段→分页→多级→缺页→TLB。
- 不采用：本回合不开段页式合用专课（`os-p0133` 页底仅引子）；不扫页硬挂进程/文件章。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-23.js` | 三课 + diagram/origin |
| `curriculum/library-assets/illustrated-basics/os-p0131.png`～`p0135.png` | 新导出；挂图用 133 |
| `scripts/curriculum.mjs` | OUTLINE + 检索标签 |
| `README.md` / 台账 | 955 / 2873 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：955 / 2873；export 与 publication manifest 一致。

## 后续

- [ ] AI 工具篇机制图仍无则继续跳过
- [x] 可选：段页式 / 虚存隔离 / shell 管道 → 已由 [isolation-segpage-pipe](2026-10-10-library-sync-isolation-segpage-pipe.md) 接续
- [ ] 图解 OS 其它章按已有课选题再挂，勿整章扫页

## 给下一模型

1. 先读：`docs/library-sync/STATUS.md`
2. 内存六课均在 `coverage-java-23.js`「发布运维」段
3. 禁区：STATUS 跳过表；本机绝对路径
