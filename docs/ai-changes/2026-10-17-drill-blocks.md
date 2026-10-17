# 选择题按课表分成大块

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [选择题按章节排，不再凑满 10 题](2026-10-17-drill-by-chapter.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

总图把 25 门选择题排成一条编号路。系统设计后面是 SQL 优化、服务性能排查、全栈主线、语言与类型。课表里这些并不相邻，上一门和下一门接不上。

## 决策

- 采用：总图和大厅都按 `DRILL_BLOCKS` 分块。块内顺序跟课表 `groupOrder`。全栈主线单独一块。前端是语言与类型、浏览器与样式、React、Vue、跨端与选型。Java 从 Java 基础排到交付与运行，SQL 优化在并发和缓存之间，系统设计在 Spring Cloud Alibaba 和分布式与高并发之间。测试与工程、服务性能排查、其余各成一块。剑客只站在正在进行的那一块；其它块不连号。
- 不采用 / 刻意不做：不改 `DRILL_ROADS` 和 `DRILL_COURSES` 的生成顺序，测试仍要求这两份名单一致。不拆「安全与 Netty」「Spring 与数据访问」这两门合并课。不清 `drill.log`。过关仍只看同一门里的上一关。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/drillOutline.ts` | `DRILL_BLOCKS` 和 `drillBlockFaces` |
| `web/src/pages/PathPage.tsx` | 选择题一块一路；没人站的路不放剑客。只有一颗石台时，剑客直接站上石台 |
| `web/src/pages/DrillPage.tsx` | 大厅按同样的块排 |
| `web/src/styles/_reading.scss` | 块与块之间留开 |
| `web/src/styles/_drill.scss` | 大厅块标题 |
| `scripts/drill.test.mjs` | 每门课恰好进一块，Java 和前端的顺序写死 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：选择题测试 11 项通过。类型检查仍有一处原有报错：`ProgressAside.tsx` 里 `exam.id` 被收成 `never`，这次没改那个文件。浏览器 `#/paths` 选择题分成六块，块内从 01 重新编号。前端是语言与类型、浏览器与样式、React、Vue、跨端与选型。Java 里 SQL 优化在并发和缓存之间，系统设计在 Spring Cloud Alibaba 和分布式与高并发之间。点系统设计进 `#/drill/design`，返回是「回总图」。`#/drill` 大厅是同样六块。窄屏两列，石台和课名没有叠在一起。

## 后续

- [ ] 新增一门课时，把它插进 `DRILL_BLOCKS` 里课表对应的位置，不要接到数组末尾。
- [ ] 安全与 Netty 仍放在 Nginx 前面，因为安全在课表里先出现。不要为了 Netty 再把这门课挪到网关后面。

## 给下一模型

1. 先读：本文和 `web/src/data/drillOutline.ts` 的 `DRILL_BLOCKS`
2. 再读：`web/src/data/curriculum-nav.json` 的 `groupOrder`
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要把选择题再画回一条 01 到 25 的路；不要改 d/s/p/m 的题目名单
