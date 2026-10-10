# OS 文件/网络续挂：inode 图、扇区块、ss 队列与网卡指标

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | [os-inode-net](2026-10-10-library-sync-os-inode-net.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

inode 课宜挂关系图；扇区/逻辑块、ss 队列列、四指标、MTU/接口计数有专页但未成课。部分新课曾漏挂 OUTLINE，导出断言失败。

## 决策

- 采用：`linux-inode-dentry`←`os-p0286`；新建 `linux-fs-sector-block`←`p0285`、`linux-ss-recvq-sendq`←`p0382`、`linux-net-four-metrics`←`p0379`、`linux-nic-mtu-rx-errors`←`p0381`；全部接入「发布运维」。
- 不采用：硬挂 `os-p0377`；不把 mindmap 硬塞给 `jvm-areas`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-23.js` | 换图 + 四课 |
| `curriculum/library-assets/illustrated-basics/os-p0286.png` 等 | 入库 |
| `scripts/curriculum.mjs` | OUTLINE + 标签 |
| 台账 / STATUS | 同步 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：以 verify 输出为准。

## 后续

- [ ] Outbox / embstr / AI 工具篇仍无机制图则跳过
- [ ] `jvm-areas` 仍宜自绘 SVG（专题 PDF 无总图）

## 给下一模型

1. 先读：STATUS 跳过表；LISTEN 下 Recv-Q 以 `linux-ss-recvq-sendq` 为准
2. 下一空闲仍是 `coverage-frontend-59.js`、`coverage-java-123.js`
3. 禁区：整本 PDF；`os-p0377`；本机绝对路径
