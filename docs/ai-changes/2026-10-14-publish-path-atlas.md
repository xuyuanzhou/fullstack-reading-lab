# 提交并发布主线总图与本机待交改动

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | 用户：完成后所有修改提交发布 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

架构师主线总图、关卡弹窗、转场和 Dubbo 专节还在本机，公开站仍是旧的 `main`。

## 决策

- 采用：整批提交并推送到 `origin/main`，由 Pages 工作流校验并部署。
- 不采用：不提交 `.history/`。不拆 PR。不 force-push。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` 等 | 主线、支线、Boss 总图与点进详情 |
| `web/src/components/GateDock.tsx` | 浮动关卡只留下一步 |
| `web/src/transition/` | 进出营地的转场 |
| `curriculum/`、`web/src/data/bodies/java/dubbo-*.json` | Dubbo 专节四课 |
| `docs/ai-changes/` | 本批变更记录 |

## 验证

```bash
cd web && npm run check
```

- 结果：退出码 0。导出、测试、lint、类型检查和构建都通过。

## 后续

- [ ] 看 GitHub Actions「Verify and deploy public course」是否成功
- [ ] 站点：https://xuyuanzhou.github.io/fullstack-reading-lab/

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 若续作：以远端 `main` 与 Actions 结论为准
3. 禁区：不要 force-push `main`，不要把 `.history/` 入库
