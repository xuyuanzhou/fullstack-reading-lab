# OS inode 与网络：dentry、多级索引、协议栈、accept 队列

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [os-io-epoll](2026-10-10-library-sync-os-io-epoll.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

台账下一刀：图解 OS inode 细部与网络发包。已有 IO/VFS 课，缺名字/块指针与 listen 队列机制页。

## 决策

- 采用：新建 `linux-inode-dentry`←`os-p0286`（关系图；`p0285` 文案页改备用）、`linux-inode-block-pointers`←`os-p0299`、`linux-network-stack-layers`←`os-p0378`、`linux-tcp-listen-queues`←`os-p0383`。
- 不采用：硬挂 `os-p0377`（公众号推广）；`os-p0285`/`p0291`/`p0379`/`p0381`/`p0382` 暂作备用。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-23.js` | 四课 + VFS deep 回链 |
| `curriculum/library-assets/illustrated-basics/os-p0285.png` 等 | 入库 |
| `scripts/curriculum.mjs` | OUTLINE + 标签 |
| 台账 | STATUS / batch-02 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：1051 / 3161；export 与 publication manifest 一致。

## 后续

- [ ] Outbox / embstr / AI 工具篇仍无机制图则跳过
- [x] 备用 OS 页有专课再挂——见 `2026-10-11-library-sync-os-fs-net-ops.md`

## 给下一模型

1. 先读：STATUS 跳过表（含 `os-p0377`）
2. LISTEN 下 Recv-Q 与 ESTABLISHED 下含义不同，以 `linux-tcp-listen-queues` 为准
3. 禁区：整本 PDF；推广插页；本机绝对路径
