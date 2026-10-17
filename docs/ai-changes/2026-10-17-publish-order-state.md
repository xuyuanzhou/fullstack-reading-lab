# 提交并发布订单状态、预留行和本机待交改动

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | 用户：所有修改提交并发布 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

订单状态竞争、预留行迁移，以及画图、技能树、选择题的本机改动还没进 `main`。公开站仍是上一笔提交。

## 决策

- 采用：整批提交并推送到 `origin/main`，由 Pages 工作流「Verify and deploy public course」校验并部署。
- 不采用：不提交 `.history/`。不拆 PR。不 force-push。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-13.js` | 同一起点先成功、预留行状态 |
| `curriculum/coverage-java-133.js`、`coverage-java-134.js` | 三只钟、TCC 画图 |
| `web/src/data/learningSkills.ts` | 技能树续挂 |
| `web/src/pages/DrillPage.tsx`、`PathPage.tsx` | 选择题保留选项、未通过的路保持淡线 |

## 验证

```bash
cd web && npm run check
```

- 结果：`cd web && npm run check` 退出码 0。导出 1135 课，测试 76 项通过，构建完成。推送后看 Actions「Verify and deploy public course」。

## 后续

- [ ] 看 GitHub Actions 是否部署成功
- [ ] 不要把 `.history/` 补进仓库

## 给下一模型

1. 先读本文。公开站以 `origin/main` 的 Pages 部署为准。
2. 新课仍先导出再提交，否则 `verify:committed` 会失败。
3. 禁区：不提交 `.history/`，不对 `main` force-push。
