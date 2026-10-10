# 401/403、Cookie、SDS、端口、503 专页挂图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [http-net-redis-pages](2026-10-10-library-sync-http-net-redis-pages.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

分章专页首轮后，台账仍列状态码/Cookie/SDS。本回合按页导出并挂课；网络 PDF 文字层差，未强行扫出独立三次握手时序（已有 `http-p0037`）。

## 决策

- 采用：`http-status-auth`←p59；`cookie-credential`←p39；`cookie-set-attributes`←p40（现代属性仍以 MDN 为准）；`redis-string-max-512mb`←SDS p10；`https-port-443-not-80`←network p28；`http-503-unavailable`←p61。
- 不采用：把旧书 Cookie 页当成 SameSite/HttpOnly 规范正文；为握手再挂无时序图的页。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-02.js` 等 | 6 课 diagram/origin |
| `curriculum/library-assets/illustrated-basics/http-p0059.png` 等 | 新导出 |
| 台账 | batch-02 / STATUS |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：958 / 2882；export 与 publication manifest 一致。

## 后续

- [x] 可选：目视扫网络书找纯三次握手时序图再挂 → 已由 [handshake-tls-types](2026-10-10-library-sync-handshake-tls-types.md) 接续（`network-p0080`）
- [ ] AI 工具篇机制图仍无则跳过
- [ ] Cookie 课属性细节以 MDN/RFC 为准，勿把旧书 expires 示例当现代默认

## 给下一模型

1. 先读：`docs/library-sync/STATUS.md`
2. 网络书 `pdftotext` 常失败，用 `export_page_asset` + 读图目视
3. 禁区：STATUS 跳过表；本机绝对路径
