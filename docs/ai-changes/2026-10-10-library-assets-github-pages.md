# 库图入库：GitHub Pages 可显示 library-assets

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [架构决策](../架构决策-公开站点与本机资料.md)；library-sync |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

课上已挂 `library-assets/**/*.png`，但根 `.gitignore` 的 `*.png` 把整棵库图挡在仓外。Actions 无本机题库，构建产物里没有这些文件，`github.io` 上图 404。

## 决策

- 采用：对 `curriculum/library-assets/**` 开忽略例外并入库；导出只复制课上引用 + `AiDiagrams` 手册图到 `web/public/`；`web/public/library-assets` 仍为构建产物不提交。
- 不采用：在 CI 里从私人 PDF 重导页（无资料、违规）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `.gitignore` | `!curriculum/library-assets/**` |
| `scripts/export-curriculum.mjs` | 只拷引用图；缺文件即失败；清理 public 孤儿 |
| `curriculum/library-assets/**` | PNG 入库 |
| 架构 / library-sync README | 写明必须入库 |

## 验证

```bash
git check-ignore -v curriculum/library-assets/illustrated-basics/os-p0122.png   # 应为否定规则、可 add
cd web && npm run check   # CI 同款：export → verify → build
```

- 本地 export 后 `web/public/library-assets` 约 107 张引用图。

## 后续

- [ ] push `main` 后确认 Pages 课页图片 200
- [ ] 新导页进 `curriculum/library-assets/` 后必须 `git add`（勿再被全局 `*.png` 挡住）

## 给下一模型

1. 先读：本文 + `.gitignore` 例外
2. 禁区：勿提交 `private-data/`、`config/library.path`、整本 PDF
