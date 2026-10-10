# OS 文件/IO：VFS、select/epoll、零拷贝与 ET 挂图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [lock-process-os](2026-10-10-library-sync-lock-process-os.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

台账下一刀：图解 OS 文件/IO 章按已有课选题。Netty 侧 NIO / ET / FileRegion 仍无库图。

## 决策

- 采用：`nio-not-one-thread-per-request`←`os-p0309`；`epoll-et-must-drain`←`os-p0360`；`netty-file-region`←`os-p0340`；新建 `linux-vfs-unified-api`←`os-p0287`、`linux-epoll-vs-select`←`os-p0358`。
- 不采用：硬挂 Redis embstr；Outbox 仍无专页则跳过。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-27.js` 等 | 三课 diagram/origin |
| `curriculum/coverage-java-23.js` | VFS + epoll vs select 定义课 |
| `curriculum/library-assets/illustrated-basics/os-p0287.png` 等 | 新导出 |
| `scripts/curriculum.mjs` | OUTLINE + 标签 |
| 台账 | STATUS / batch-02 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：1047 / 3149；export 与 publication manifest 一致。

## 后续

- [ ] Outbox / embstr / AI 工具篇仍无机制图则跳过
- [ ] OS 网络发包章可按已有课再选题

## 给下一模型

1. 先读：STATUS 跳过表；ET 细节以 `epoll-et-must-drain` 为准
2. FileRegion 课勿把旧书拷贝次数当成所有网卡路径的固定数字
3. 禁区：整本 PDF；本机绝对路径
