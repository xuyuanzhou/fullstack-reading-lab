# 提交并发布本机待交的课源与选型课改写

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：提交所有代码到仓库并发布 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

本机积累了选型课 `fe-pick-by-surface` 的说明改写、例子代码批、W3CSchool / D8 新课与图、since 侧栏等，尚未进 `main`。

## 决策

- 采用：整批提交并推送到 `origin/main`，由 Pages 工作流导出、校验并部署。
- 不采用 / 刻意不做：不拆成多个 PR。不 force-push。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/`、`web/src/data/`、`docs/`、`legacy/`、`scripts/` 等 | 本机未提交改动一并入库 |
| 本文件 | 发布台账 |

## 验证

```bash
node scripts/verify_content.mjs
cd web && npm run check
```

- 结果：859 课 / 2584 知识点；`npm run check`（含 build）通过。

## 后续

- [ ] 看 GitHub Actions「Verify and deploy public course」是否成功
- [ ] 站点：https://xuyuanzhou.github.io/fullstack-reading-lab/

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 若续作：以远端 `main` 与 Actions 结论为准
3. 禁区：不要 force-push `main`
