# HTTP / 网络 / Redis 分章专页换挂（告别封面）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；[batch-02](../library-sync/batch-02-illustrated-basics.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

批 2 里 HTTP/网络/Redis 多课仍挂第 1 页封面。台账下一刀是分章专页；用关键词定位页码后导出并换挂。

## 决策

- 采用：9 课换/新挂专页——`http-methods`←p34；`http-connection-reuse`/`tcp-is-l4-not-http-handshake`←p37；`http-cache`←p69；`tcp-stream-needs-framing`←network p66；`tcp-reliable-not-never-lose`←network p25；`redis-list-quicklist-listpack`←p35；`redis-hash-field-update`←p20；`redis-zset-rank-range`←p30。
- 不采用：整本扫 776 页网络书；封面页继续当主图。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-lessons.js` 等 | 9 课 `diagram`/`origin` |
| `curriculum/library-assets/illustrated-basics/http-*` `network-*` `redis-ds-*` | 新导出专页 |
| `private-data` `source_review` | 三本图解回写「已发布课程」 |
| 台账 | batch-02 / STATUS |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：958 / 2882；export 与 publication manifest 一致（课数未增）。

## 后续

- [x] 可选：HTTP 状态码/Cookie、Redis SDS → 已由 [status-cookie-sds](2026-10-10-library-sync-status-cookie-sds.md) 接续
- [ ] 可选：纯三次握手时序专图（目视扫网络书）
- [ ] AI 工具篇机制图仍无则跳过
- [ ] 勿再把 `*-p0001` 封面当主图挂回这 9 课

## 给下一模型

1. 先读：`docs/library-sync/batch-02-illustrated-basics.md` 备用页表
2. 换图只改对应 coverage/`extra-lessons`，勿跨课正则
3. 禁区：STATUS 跳过表；本机绝对路径
