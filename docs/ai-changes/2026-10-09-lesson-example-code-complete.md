# 学习课例子代码块清零（可代码化课 +317）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 「继续补完所有」；接 [batch8](2026-10-09-lesson-example-code-batch8.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

batch1–8 后仍有大量口头/命令型 example 无围栏。按 [课程例子代码块约定](../课程例子代码块约定.md)：有最小可观察片段的应补围栏；纯场景叙述可跳过。

## 决策

- 采用：在 `curriculum/example-code-blocks.js` 追加一批按前缀模板生成的围栏（`sql` / `redis` / `java` / `http` / `js` 等），覆盖剩余「可代码化」课。
- 不采用：强行给纯场景叙述课塞伪代码；不改 coverage 的 `core`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +317 条 id → 围栏 example（注释 `batch-complete`） |
| `web/src/data/curriculum*.json` | export 产物 |

统计（export 后）：总课 **841**；含 \`\`\` 的 example **610**；无围栏 **231**（均为短叙述/场景，按约定可跳过）；可代码化剩余 **0**；`since` 全覆盖。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：841 课 / 2530 KP；`verify_content` 通过。

## 后续

- [x] 润色/补强一批边界课围栏（见 [batch10](2026-10-09-lesson-example-code-batch10.md)；fenced ≈649）
- [x] 公开课 example 围栏清零（见 [batch14](2026-10-09-lesson-example-code-batch14.md)；857/857）
- [ ] 可选：继续润色自动生成/早期模板围栏
- [ ] D8《分布式高并发》其余页继续主题抽查（永不「全书逐页验收」）
- [ ] 新课接入时同步 `LESSON_SINCE` + OUTLINE + legacy + 可选 example 围栏

## 给下一模型

1. 先读：本文 + [ai-changes/README](README.md)
2. 已有围栏 id 见 `example-code-blocks.js`（含 `batch-complete` 段）；勿重复追加同一 id
3. 纯场景叙述 231 课不要为了「全有代码」硬写
4. 下一空闲 coverage：先 `ls curriculum/coverage-java-96.js` / `coverage-frontend-40.js`
