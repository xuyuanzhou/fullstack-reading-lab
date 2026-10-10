# OS 续挂：扇区/块、ss 队列列、四指标与 MTU

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [inode-dentry-p0286](2026-10-11-inode-dentry-diagram-p0286.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

inode/网络四课后仍有备用导出页。台账下一刀把可成课的机制页挂完，弱导言与推广页跳过。

## 决策

- 采用：`linux-inode-dentry` 改挂关系图 `os-p0286`；新建 `linux-fs-sector-block`←`os-p0285`、`linux-ss-recvq-sendq`←`os-p0382`、`linux-net-four-metrics`←`os-p0379`、`linux-nic-mtu-rx-errors`←`os-p0381`。
- 不采用：`os-p0377`（推广）；`os-p0291`（连续存放弱导言）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-23.js` | 四课 + inode 换图 |
| `curriculum/library-assets/illustrated-basics/os-p0286.png` 等 | 入库 |
| `scripts/curriculum.mjs` | OUTLINE + 标签 |
| 台账 | STATUS / batch-02 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：1055 / 3173；export 与 publication manifest 一致。

## 后续

- [ ] Outbox / embstr / AI 工具篇仍无机制图则跳过
- [x] 勿硬挂 `os-p0291` / `os-p0377`
- [x] HTTP 导论 / WebSocket 专页 ——见 `2026-10-11-library-sync-http-what-websocket.md`

## 给下一模型

1. 先读：STATUS 跳过表；LISTEN 下 Recv-Q 以 `linux-ss-recvq-sendq` 为准
2. inode 关系图是 `os-p0286`，扇区/块是 `os-p0285`，勿再对调
3. 禁区：推广插页；整本 PDF；本机绝对路径
