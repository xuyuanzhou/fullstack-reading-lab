# 认清 Redis 过载之后先停掉还在灌的那一路

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [Redis 过载先分清四项](2026-10-17-redis-overload-four.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

上一课把过载分成拒绝连接、内存到顶、慢命令和过期跳升。认清之后如果先重启或加节点，同一个键和同一条命令还会回来。只看整机 CPU 的告警也会在单线程已经堵住时仍然安静。

## 决策

- 采用：紧挨上一课再加 `redis-overload-next`。已经在执行的慢命令会跑完，断开连接只阻止下一次。连接上涨先看 `CLIENT LIST` 再收紧池。内存到顶到副本上查大键；改成淘汰等于允许删键。过期跳升先在入口限流。`latency-monitor-threshold` 为 0 时 `LATENCY LATEST` 是空的。告警看这四项的增量。
- 不采用 / 刻意不做：不把重启或加节点写成恢复。不在线上实例教堵住服务器的调试命令。不改九关，不改选择题。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-128.js` | 新课 |
| `scripts/curriculum.mjs` | 发布清单、缓存小节和短名 |
| `legacy/index.html` | 按同样顺序挂上脚本 |
| `README.md` | 课数改为 1116 / 3361，Java 748 |
| `docs/ai-changes/2026-10-17-redis-overload-four.md` | 后续改指向本文 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
```

- 结果：导出 1116 课、3361 个知识点（前端 368，Java 748）。内容校验通过。浏览器打开 `#/java/cache/redis-overload-next`，课表「键与类型」里排在四项那一课后面。点开 `CLIENT LIST` 的释义是「列出当前客户端的地址、空闲时间和正在执行的命令」。没有标记已掌握。

## 后续

- [ ] 无

## 给下一模型

1. 先读：本文和 `curriculum/coverage-java-128.js`
2. 再读：`redis-overload-four`
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要把重启或加节点写成这一课的第一动作；不要改已发布的选择题
