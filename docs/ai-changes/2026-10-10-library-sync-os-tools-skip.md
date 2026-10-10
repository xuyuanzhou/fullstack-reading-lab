# 图解 OS 续挂三课；工具篇与面经跳过落盘

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [batch-02](../library-sync/batch-02-illustrated-basics.md)、[batch-05](../library-sync/batch-05-long-tail.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

工具篇筛图后无可挂机制图；图解 OS 仍有备用页可对到 Linux/并发课。面经仅题号条目需在台账写清跳过。

## 决策

- 采用：`java-threads-not-linear-speedup`←os-p0079；`linux-bkl-gone`←os-p0111；`linux-fork-copies-one-thread`←os-p0184（管道章 fork，作背景图）。
- 不采用：Codex/Claude/Vibe 宣传封面与 UI 截图进 AI 课页；误用跨课正则把图挂到邻课（已修回 `jmm-not-eight-memory-ops`）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-{23,32,36}.js` | 挂 OS 库图 + origin；36 修回 JMM SVG |
| `curriculum/library-assets/illustrated-basics/os-p*.png` | 续导 |
| `source_review` | 工具三条跳过说明；面经仅题号约 25 条注跳过 |
| `docs/library-sync/batch-02/05` | 台账 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：949 / 2855；export 与 publication manifest 一致。

## 后续

- [ ] 挂图脚本勿用「id 后第一个 diagram」跨课匹配；按课块边界替换
- [x] 读写锁/死锁已挂：见 [os-rwlock-deadlock](2026-10-10-library-sync-os-rwlock-deadlock.md)；虚拟内存仍待定义课

## 给下一模型

1. 先读：本文 + batch-02/05
2. 改课图：在目标课 `keywords` 与 `points` 之间插入，或整块替换该课对象
3. 禁区：工具宣传图；笔试题原卷
