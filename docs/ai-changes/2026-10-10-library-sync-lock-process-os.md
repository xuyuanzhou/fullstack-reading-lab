# 分布式锁挂图；用户态 / 进程五态 / 上下文切换三课

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [STATUS](../library-sync/STATUS.md)；前序 [public-and-os-frag](2026-10-10-library-assets-public-and-os-frag.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

批 1 台账 `distributed-lock` / `outbox` 仍缺图；图解 OS 进程章尚未进公开课。扫 HC 与亮白系统卷后补锁页与三节定义课。

## 决策

- 采用：`distributed-lock`←`distributed-hc/p0201`（注明现行 SET NX PX）；新建 `linux-user-kernel-syscall`←`os-p0112`、`linux-process-states`←`os-p0148`、`linux-process-context-switch`←`os-p0154`。
- 不采用：硬挂 Outbox（卷内无专页）；把教材五态挂到 `java-thread-six-states`（易混）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/distributed-lessons.js` | lock diagram/origin |
| `curriculum/coverage-java-23.js` | 三课 OS 定义 |
| `curriculum/library-assets/**` | `p0201` 等；`os-p0112`/`p0148`/`p0154` |
| `scripts/curriculum.mjs` | OUTLINE（OS 三课 + 各章「是什么」收口）+ 标签 |
| `curriculum/coverage-frontend-5{6,7,8}.js` 等 | 并行定义课接入发布清单 |
| 台账 | batch-01/02、STATUS |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：1045 / 3143（含并行接入的各章「是什么」定义课）；export 与 publication manifest 一致。

## 后续

- [ ] `distributed-outbox` 仍无专页则保持 origin + 官方 Outbox 引用
- [ ] Redis embstr / AI 工具篇机制图仍无则跳过
- [ ] OS 文件与 IO 多路复用章按已有课再选题

## 给下一模型

1. 先读：STATUS 跳过表；锁课勿把旧 getset 写成现行默认
2. 进程五态课必须交叉链到 `java-thread-six-states`
3. 禁区：整本 PDF；`network-p0049`；本机绝对路径
