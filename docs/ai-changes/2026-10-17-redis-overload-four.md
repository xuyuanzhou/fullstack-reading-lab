# Redis 过载先分清四项

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | 缓存章已有的大键、热键、过期和淘汰 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

实例已经变慢或开始拒绝写入时，连接、内存、慢命令和过期挤在一起都会表现为延迟升高。已有课分别讲过其中一项，还没有一课规定先看哪四个计数、每一项的第一动作是什么。

## 决策

- 采用：在缓存章「键与类型」里、大键那一课之后，加 `redis-overload-four`。先读 `INFO` 和 `SLOWLOG GET`。拒绝连接先收紧连接池；内存到顶先看 `maxmemory-policy`；慢命令先停掉那条命令；过期跳升先打散 TTL。热键、单线程和过期课只作相关课。
- 不采用 / 刻意不做：不把加节点或 `FLUSHALL` 写成第一动作。不在已经过载的主节点上先跑 `KEYS`。不改九关，不改选择题。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-127.js` | 新课 |
| `scripts/curriculum.mjs` | 发布清单、缓存小节和短名 |
| `legacy/index.html` | 按同样顺序挂上脚本 |
| `README.md` | 课数改为 1115 / 3357，Java 747 |
| `curriculum/diagrams/evo-*.svg` | 演进全流程 12 课已引用这些图但文件不在，按各课「图怎么读」补上，导出才能通过 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
```

- 结果：导出 1115 课、3357 个知识点（前端 368，Java 747）。内容校验通过。浏览器打开 `#/java/cache/redis-overload-four`，课表「键与类型」里能看到这一课，要点四条都在。点开 `rejected_connections` 的释义是「因客户端数量达到 maxclients 而被拒绝的次数」。没有标记已掌握。

## 后续

- [x] 演进全流程的图归 [同一笔订单串起架构演进全流程](2026-10-17-arch-evolution-flow.md)。认清四项之后怎么处理见 [认清 Redis 过载之后先停掉还在灌的那一路](2026-10-17-redis-overload-next.md)

## 给下一模型

1. 先读：本文和 `curriculum/coverage-java-127.js`
2. 再读：`redis-big-hot-key`、`redis-single-thread`、`redis-expire`
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要把加节点写成这四项的第一动作；不要改已发布的选择题
