# 新建虚拟地址/MMU 定义课并挂 os-p0122

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [os-rwlock-deadlock](2026-10-10-library-sync-os-rwlock-deadlock.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

台账将 `os-p0122` 标为「已导出备用、待地址翻译定义课」。本回合补定义课并挂图，不再硬挂 JVM 运行时区课。

## 决策

- 采用：新建 `linux-virtual-addr-mmu`（工程实践 · 发布运维），挂 `library-assets/illustrated-basics/os-p0122.png`；用语仅用虚拟地址、物理地址、MMU、分段、分页。
- 不采用：把该页挂到 `jvm-areas` / `java-memory`；不扩 AI curriculum track。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-23.js` | 新增定义课 + diagram/origin |
| `scripts/curriculum.mjs` | OUTLINE 插入 id；检索标签 `engineering` |
| `README.md` / `docs/核对交接.md` / `docs/library-sync/*` | 课数与台账 |
| `web/src/data/curriculum*.json` | export |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：950 / 2858；export 与 publication manifest 一致。

## 后续

- [ ] AI 工具篇若出现机制架构图再挂（封面/UI 仍跳过）
- [x] 可选：分页/页表定义课再挂图解 OS 后续页 → 已由 [paging-page-table](2026-10-10-library-sync-paging-page-table.md) 接续
- [ ] 勿重做：STATUS 跳过表；勿把虚拟地址页挂回 JVM 结构课

## 给下一模型

1. 先读：`docs/library-sync/STATUS.md`
2. 新课在 `coverage-java-23.js`，OUTLINE「发布运维」里紧挨 `linux-bkl-gone`
3. 禁区：本机绝对路径；STATUS 跳过项
