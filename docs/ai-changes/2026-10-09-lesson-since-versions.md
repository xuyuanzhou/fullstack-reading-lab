# 基础课标注引入版本（since）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 基础章教学审查后续；用户要求如 Stream → JDK 8 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

基础章重组后，读者仍难从侧栏看出「这是哪一版引入的 API」。需要在目录与课页标清引入/定稿版本，且只写官方基线，不编造知识点。

## 决策

- 采用：可选字段 `since`（如 `JDK 8`、`ES2015`）；集中表 `LESSON_SINCE` 在 `scripts/curriculum.mjs` 注入；课页显示「自 …」，侧栏显示 chip。
- 关键课在标题/核心句补版本（Stream、Optional、record、java.time、默认方法、switch 箭头、strip、虚拟线程、satisfies、React 18 批处理），与已有「JDK 8 起 CHM…」风格一致。
- 不采用：不为「一直存在」的语言规则硬贴版本（如 `this`、值传递）；不把 JDK 18 默认 UTF-8 当成「字符集课」的 since。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `scripts/curriculum.mjs` | `LESSON_SINCE`（基础 + 并发/JVM/React/Vue/Node/Spring/数据；第六轮至 273 条） |
| `scripts/export-curriculum.mjs` | index 导出 `since` |
| `web/src/types/curriculum.ts` 等 | 类型与摘要含 `since` |
| `LessonPage` / `AppLayout` / SCSS | 展示徽章与 chip |
| 若干 coverage / extra | 标题或核心点明版本 |
| `legacy/index.html` | 补载 `example-code-blocks.js`（与 `publishedSources` 对齐） |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：773 课；`LESSON_SINCE` **273** 条。样例：`java-stream → JDK 8`、`react-memo-when → React 16.6`、`fe-sveltekit-runes → Svelte 5`、`redis-list-quicklist-listpack → Redis 3.2/7`。

## 后续

- [x] 并发虚拟线程 JDK 21、Spring Boot 3、React/Vue/Node/Kafka 等继续补进表
- [x] 再扫一轮：RFC / TLS / RR loader / TS bundler / MySQL 8.4 手册基线 / HttpClient 等
- [x] 第三轮：MySQL 8.0 自增/初始化、Mongo 4.0 事务、Redis 5 Stream、Tomcat NIO、ForkJoin、CHM compute*
- [x] 第四轮：CompletableFuture、Suspense、Angular v21、MySQL 并行复制、Hermes、JUnit 5、Kafka lag.time、TanStack Query / RTK 等
- [x] 第五轮：Vue create-vue 槽位、SC CircuitBreaker、TPE/Lock/CAS、TS unknown/模板字面量、Kafka/Rabbit/RocketMQ 模型、Playwright/MSW、CWV/INP 等
- [x] 第六轮：React memo/Context/gDSFP/Fiber、Svelte 5 runes、Vue 3 Proxy 叙事、动态 import ES2020、DCL volatile JDK 5、Redis quicklist/listpack、RestController Spring 4；并补 `legacy/index.html` 对 `example-code-blocks.js` 的脚本序
- [ ] 课文仅顺带提到版本、主题并非「引入界」的课不要硬贴（如 `Thread.start` 勿标 JDK 21；MySQL 课仅手册链接写 8.4 也不要一律贴）
- [ ] 勿把预览版年份当定稿（record 写 JDK 16，不写 14 preview）

## 给下一模型

1. 先读：本文与 `LESSON_SINCE`
2. 新课若有明确引入版：在源课写 `since`，或补进 `LESSON_SINCE`
3. 禁区：勿臆造版本号；对照 JEP / MDN / Oracle API「Since」栏
4. 导出后若 verify 报 legacy 脚本序：按 `publishedSources` 同步 `legacy/index.html`
