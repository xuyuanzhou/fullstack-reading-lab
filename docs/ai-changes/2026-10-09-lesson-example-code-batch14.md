# 学习课例子代码块第十四批（选型 / 微前端 / Flutter / Java 收尾，+68）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch13](2026-10-09-lesson-example-code-batch13.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第十三批后约 68 课仍无围栏：技术选型、微前端落地 API、Flutter、DDD/架构、工程可观测与若干分布式纠偏。本批一次补齐。

## 决策

- 采用：只扩 `curriculum/example-code-blocks.js`，短围栏服务本课结论。
- 不采用：改 core；不为「全有代码」而编造与课无关的片段。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +68 课围栏（选型 / MFE / Flutter / DDD / 工程 / 分布式等） |
| `web/src/data/curriculum*.json` | export 产物 |
| `README.md` | 课数对齐 857 / 2578（前端 289 / Java 568） |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：857 课 / 2578 KP；含 \`\`\` 的 example = **857**（无围栏 **0**）；`verify_content` 通过。

## 后续

- [x] 抽查润色错配模板（见 [batch15](2026-10-09-lesson-example-code-batch15.md)；仍约 290 课带套话）
- [ ] 新课入库时同步写围栏 + `LESSON_SINCE` + OUTLINE + legacy + README 计数
- [ ] 纯场景叙述课若新增，仍可按约定跳过围栏

## 给下一模型

1. 先读：本文 + [batch13](2026-10-09-lesson-example-code-batch13.md)
2. 公开课 example 已全部带围栏；续作以润色与新课为主
3. 约定：`docs/课程例子代码块约定.md`
