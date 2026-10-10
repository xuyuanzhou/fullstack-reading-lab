# AI 路线续挂：实战 / 项目 / 面试手册图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [library-sync-ai-diagrams](2026-10-10-library-sync-ai-diagrams.md)；台账 batch-05 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

手册五篇已挂图后，续挂实战、项目与面试篇；并保证内嵌 CSS 示意不被手册图盖掉。

## 决策

- 采用：`AiDiagram` 先示意、后手册 PNG；新增 agent-practice / harness / 三项目 / 面试对照。
- 不采用：llm-interview 挂无关云盘架构图；工具篇宣传/UI 截图进课页。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/library-assets/ai-handbook/*` | 续导实战/项目/面试图 |
| `web/src/components/AiDiagrams.tsx` | LIBRARY 扩键；示意与库图并存 |
| `docs/library-sync/batch-05-long-tail.md` | 台账 |
| `source_review` | 对应手册/项目「已有草稿」 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：949 / 2855；curriculum origin 无库图仍为约定 3 课。

## 后续

- [x] 工具篇无机制图可挂，已跳过：见 [library-sync-os-tools-skip](2026-10-10-library-sync-os-tools-skip.md)
- [x] 面经「仅题号」已注跳过整卷

## 给下一模型

1. 先读：`docs/library-sync/batch-05-long-tail.md`
2. 加图：只改 `LIBRARY`，勿删 `FIGURES` 里已有示意
3. 禁区：笔试题原卷；本机绝对路径
