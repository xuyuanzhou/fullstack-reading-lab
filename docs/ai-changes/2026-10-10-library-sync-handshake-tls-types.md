# 分层 / 握手对比 / HTTPS / 证书链 / Range / Redis 类型

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [status-cookie-sds](2026-10-10-library-sync-status-cookie-sds.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

台账要纯三次握手时序与 HTTPS/TLS。网络 PDF 文字层差，目视扫页后挂机制图；Redis embstr 在亮白数据结构本未单独成页。

## 决策

- 采用：`tcp-is-l4`←`network-p0046`；`http-connection-reuse`←`network-p0080`（1.0/1.1 握手对比）；`https-tls13`←`http-p0149`（注明包数以 TLS 1.3 为准）；`tls-hostname-verify`←`network-p0095`；`http-range`←`http-p0049`；`redis-data-types`←`redis-ds-p0005`。
- 不采用：挂 `network-p0049` 推广插页；编造 embstr 专页。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-20.js` 等 | 6 课 diagram/origin |
| `curriculum/library-assets/illustrated-basics/network-p0080.png` 等 | 新导出 |
| 台账 | STATUS / batch-02 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：958 / 2882；export 与 publication manifest 一致。

## 后续

- [ ] 可选：HTTP 压缩协商页；OS 碎片算例
- [ ] AI 工具篇机制图仍无则跳过
- [ ] HTTPS 旧书图勿当成 TLS 1.3 固定包数证据

## 给下一模型

1. 先读：`docs/library-sync/STATUS.md` 跳过表（含 `network-p0049`）
2. 网络书用 `export_page_asset` + 读图，勿依赖 `pdftotext`
3. 禁区：本机绝对路径；推广插页
