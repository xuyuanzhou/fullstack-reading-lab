# 图解 OS：读写锁与死锁课挂图；同步台账收口

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [os-tools-skip](2026-10-10-library-sync-os-tools-skip.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

批 1～5 主体与 AI 手册图已落地。本回合补 OS「读者-写者 / 交叉加锁」对上课，并写收口清单避免下一模型重复硬挂。

## 决策

- 采用：`java-rwlock-no-upgrade`←os-p0233；`mysql-deadlock`←os-p0245（加锁顺序对照；InnoDB 重试语义仍以官方文档为准）；`docs/library-sync/STATUS.md` 收口。
- 不采用：把虚拟地址页硬挂到 JVM 运行时区课；跨课正则改 diagram。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-15.js` | 读写锁课挂 OS 读者-写者页 |
| `curriculum/coverage-lessons.js` | `mysql-deadlock` 挂交叉加锁示例 |
| `curriculum/library-assets/illustrated-basics/os-p0233.png` 等 | 导页 |
| `docs/library-sync/STATUS.md` | 收口状态 |
| `docs/library-sync/batch-02-*.md` | 台账行 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：949 / 2855；export 与 publication manifest 一致。

## 后续

- [x] 虚拟内存定义课选题后再挂 `os-p0122` → 已由 [library-sync-virtual-addr-mmu](2026-10-10-library-sync-virtual-addr-mmu.md) 接续
- [ ] 其余缺口见 STATUS「明确跳过」

## 给下一模型

1. 先读：`docs/library-sync/STATUS.md`
2. 有新图：按课块手工插入 `origin`/`diagram`，勿用「id 后第一个 diagram」正则
3. 禁区：STATUS 跳过表；本机绝对路径
