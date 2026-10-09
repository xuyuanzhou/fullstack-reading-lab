# 基础课标注引入版本（since）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 基础章教学审查后续；用户要求如 Stream → JDK 8；后要求全量补完 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

基础章重组后，读者仍难从侧栏看出「这是哪一版引入的 API」。需要在目录与课页标清引入/定稿版本或技术基线。用户后续要求把公开课 `since` **补满**（当时口头说 773，现公开课为 781）。

## 决策

- 采用：可选字段 `since`（如 `JDK 8`、`ES2015`）；集中表 `LESSON_SINCE` 在 `scripts/curriculum.mjs` 注入；课页显示「自 …」，侧栏显示 chip。
- 关键课在标题/核心句补版本（Stream、Optional、record、java.time、默认方法、switch 箭头、strip、虚拟线程、satisfies、React 18 批处理）。
- **全量覆盖（本轮）**：凡无明确「引入界」年份的课，用**产品/技术基线**标签（如 `MySQL 8.4`、`Redis`、`Java`、`GoF`、`distributed`），与表内既有软标签（`Spring`、`Vue`、`TanStack Query`）一致；**不编造**具体 JDK/ES 年份。
- 刻意不做：把 `Thread.start` 标成 JDK 21；把「一直存在」的规则伪造成某个小版本号。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `scripts/curriculum.mjs` | `LESSON_SINCE` 全量 **781** 条（引入界 + 章节/前缀基线） |
| `scripts/export-curriculum.mjs` | index 导出 `since` |
| `web/src/types/curriculum.ts` 等 | 类型与摘要含 `since` |
| `LessonPage` / `AppLayout` / SCSS | 展示徽章与 chip |
| 若干 coverage | 关键课标题/核心点明版本 |
| `legacy/index.html` | 与 `publishedSources` 对齐 |
| `README.md` / `docs/核对交接.md` | 课数与 since 全量同步 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：781 课；每课均有 `since`（`LESSON_SINCE` 781 条）。样例：`java-stream → JDK 8`、`react-router-element-api → RR 6`、`mysql-null-comparison → MySQL 8.4`、`java-pass-by-value → Java`、`java-thread-start-run → Java threads`（非 JDK 21）。

## 后续

- [x] 引入界轮次（JDK/ES/React/Vue/RR/MF 等）
- [x] 全量基线补完（曾 781；现公开课 831，见恢复记录）
- [x] 收紧语义：侧栏/课页只展示带数字或 RFC/JEP/HTTP/TLS/ES6 的 chip（见 [2026-10-09-since-chip-version-only.md](2026-10-09-since-chip-version-only.md)）
- [x] `curriculum.mjs` 恢复后基线丢失 → 已重补（见 [2026-10-09-since-restore-example-batch6.md](2026-10-09-since-restore-example-batch6.md)）
- [ ] 新课入库时同步写 `since`（引入界优先，否则章节基线）

## 给下一模型

1. 先读：本文与 `LESSON_SINCE`
2. 新课：有明确引入版写具体版本；否则用同章基线，**勿编造年份**
3. 禁区：`Thread.start` ≠ JDK 21；`bloom` 勿因含 loom 误标；导出后同步 README 课数
