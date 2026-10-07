# 核心模型分条展示（structureCore）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-07 |
| 状态 | 已完成 |
| 关联 | `.cursor/plans/core_model_layout_03502267.plan.md`（勿改 plan；实现已落地） |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`lesson.core` 经 `splitProse` 仍偏大段；约 145+ 课已写「顺序是…」「边界是…」，版式未利用，扫读成本高。

## 决策

- 采用：**展示层**解析 `structureCore(core)` → `lead` / `facets` / `beats`；**不改** coverage 源文。
- 不采用：折叠展开、重写课文、改 JSON 正文。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/reading.ts` | 新增 `structureCore`；`LESSON_NAV` model 标签改为「核心模型」；facet 支持句中「顺序是/边界是/区分信号是」 |
| `web/src/pages/LessonPage.tsx` | `#lesson-model` 渲染 lead / facets / beats；面板「02 / 核心模型」 |
| `web/src/styles/_reading.scss` | `.core-lead` / `.core-facets`（两列）/ `.core-beats` |

## 验证

```bash
cd web && npx tsc --noEmit
```

- 结果：通过。
- 抽样：`css-cascade` 有顺序/边界块；无标记课（如 `fs-four-layers`）为 lead + beats。
- 脚本核对：含标记的 core 句均可抽出 facet（当时 157 课 missed=0）。

## 后续

- [ ] 若产品上要调 facet 文案（「信号」vs「区分信号」）或单 facet 通栏，只改展示层
- [ ] 不要为了排版去改 `curriculum` / coverage 源文里的「顺序是」句式

## 给下一模型

1. 入口函数：`structureCore`（`web/src/data/reading.ts`）
2. UI：`LessonPage` 中 `const core = structureCore(lesson.core)`
3. 样式：`_reading.scss` 的 `.core-*`；窄屏 facets 单列
4. 续作优先读本条；契约见 `docs/AI契约-变更记录规范.md`
