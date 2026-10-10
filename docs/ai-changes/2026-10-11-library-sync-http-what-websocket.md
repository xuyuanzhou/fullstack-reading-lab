# HTTP 导论与 WebSocket 课挂图解专页

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [os-fs-net-ops](2026-10-11-library-sync-os-fs-net-ops.md)；批 4 后续 HTTP 专页 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

OS 续挂收口后，批 4 后续是 HTTP/CSS 专页。`http-what-it-is`、`long-poll-vs-websocket` 无库图；图解 HTTP 有报文结构与 WebSocket 握手页。SPDY / 2012 HTTP/2 讨论稿不能挂到现行多路复用课。

## 决策

- 采用：`http-what-it-is`←`http-p0043`；`long-poll-vs-websocket`←`http-p0171`。
- 不采用：硬挂 `http-p0168`～`p0169`/`p0173`（SPDY/旧稿）到 `http2-multiplex`；旧书「网关=协议转换」页不改挂 `mw-proxy-lb-gateway`（与现行三问分工冲突）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-56.js` | HTTP 导论 diagram/origin |
| `curriculum/coverage-frontend-30.js` | WebSocket 课 diagram/origin |
| `curriculum/library-assets/illustrated-basics/http-p0043.png` 等 | 入库 / 备用 |
| 台账 | STATUS / batch-02 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：1055 / 3173；export 与 publication manifest 一致。

## 后续

- [ ] `http2-multiplex` 找到现行 HTTP/2 机制图再挂
- [ ] Outbox / embstr / AI 工具篇仍无机制图则跳过
- [ ] Comet 页 `http-p0167` 有专课再挂

## 给下一模型

1. 先读：STATUS 跳过表（含 HTTP SPDY 旧稿）
2. WebSocket 握手图是 `http-p0171`；长轮询对照可用备用 `http-p0167`
3. 禁区：整本 PDF；推广插页；本机绝对路径；勿把 SPDY 写成现行 HTTP/2
