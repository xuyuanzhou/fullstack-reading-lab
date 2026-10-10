# 本机知识库同步：收口状态（2026-10-10）

## 已完成

| 批 | 状态 |
| --- | --- |
| 0 政策与管道 | 原图可进站；`export_page_asset`（含 `docx!/`）；LessonPage 来源 |
| 1 分布式高并发 | 机制课 + D8 + 分布式锁页；Outbox 仍无专页 |
| 2 图解基础 | OS + HTTP/网络/Redis；含用户态/进程/内存、VFS、select/epoll、零拷贝、压缩、Content-Type |
| 3 Java 专题 | MySQL 口诀页、8 图解、Redis/Kafka/JVM 导图等 |
| 4 前端 | 原型链、React 路线图、BOM 定时器、webpack devtool |
| 5 面经/AI | 面经导图；AI 走 `/ai` 挂 `ai-handbook`（非 curriculum track） |

## 明确跳过（勿再硬挂）

| 项 | 原因 |
| --- | --- |
| `java-switch-arrow-no-fall` | 笔试题原卷不进站 |
| `binlog-not-change-event-bus` / `cache-db-double-write-race` | HC/MySQL 短卷无专页；保留纠错 SVG |
| AI 工具篇 Codex/Claude/Vibe | 宣传封面与 UI 截图，无机制架构图 |
| 面经仅题号/无答案/同文副本 | 不整卷进站；台账已注跳过 |
| OS `os-p0001` | 前言/公众号推广页，非机制图 |
| OS `os-p0231` | 哲学家就餐代码摘录，无独立机制图；勿硬挂 |
| 网络 `network-p0049` | 公众号推广插页，非机制图 |

## 指标（最近一次 verify）

- 公开课约 1047 课 / 3149 知识点（以 `verify_content.mjs` 为准）
- curriculum 带 `origin` 且未挂库图：上表 2 课（binlog / cache-db 双写）

## 下一刀（有需要再开）

1. AI 工具篇若日后出现机制架构图再挂
2. 可选：Redis embstr（亮白数据结构本未单独成页）；`distributed-outbox` 仍无专页
3. 图解 OS 网络发包 / inode 细部按已有课再选题；跳过表勿碰
