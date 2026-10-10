# HTTP 压缩与 Content-Type 专页挂图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [handshake-tls-types](2026-10-10-library-sync-handshake-tls-types.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

台账可选下一刀：HTTP 压缩协商与 Content-Type。`http-compression` 无库图；`http-content-type-body` 亦无专页。

## 决策

- 采用：`http-compression`←`http-p0045`（内容编码/gzip 图）；`http-content-type-body`←`http-p0120`（Content-Type 媒体类型；现代 JSON/multipart 以 MDN 为准）。Vary 缓存区分写在课正文与 MDN，不单挂半页 `http-p0115`。
- 不采用：硬挂 Redis embstr（亮白卷无专页）；把 Cookie 页误挂到 Content-Type。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-lessons.js` | `http-compression` origin/diagram |
| `curriculum/coverage-frontend-30.js` | `http-content-type-body` origin/diagram |
| `curriculum/library-assets/illustrated-basics/http-p0045.png` 等 | 新导出（含备用 `p0051`/`p0093`～`p0095`/`p0115`/`p0116`/`p0119`） |
| 台账 | STATUS / batch-02 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：964 / 2900；export 与 publication manifest 一致。

## 后续

- [ ] 可选：OS 碎片算例备用页；Redis embstr 仍跳过
- [ ] 新 PNG 须 `git add curriculum/library-assets/`（全局 `*.png` 例外）

## 给下一模型

1. 先读：`docs/library-sync/STATUS.md` 跳过表
2. 压缩课提问侧重 Vary；图用内容编码页，勿把旧书 gzip 列表当成 br 已覆盖证据
3. 禁区：本机绝对路径；`network-p0049` 推广插页
