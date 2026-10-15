# 首屏不再等外部字体，课目卡片延后加载

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 公开站 `https://xuyuanzhou.github.io/fullstack-reading-lab/` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

页面在 `<head>` 里同步请求 Google Fonts，字体样式表挡住第一次绘制。课库索引把提示、知识点和关键词跟导航标题打在同一个首屏脚本里，闯关页用不到这些字段也要先下载。

## 决策

- 采用：去掉 Google Fonts。正文字体用系统里已有的苹方、宋体和微软雅黑。深色主题在脚本跑起来之前就从本机进度里读出，避免先闪一层浅色。代码高亮改成遇到围栏代码再加载。导航用 `curriculum-nav.json`，提示和知识点放在 `curriculum-cards.json`，只在课程列表、课文、知识库和复习页挂上。
- 不采用 / 刻意不做：不把 Ant Design 从壳层拆掉。不把课库索引再拆成按章请求。没有单独的预发环境，公开站仍由推送到 `main` 的 Pages 工作流发布。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/index.html` | 去掉字体外链，先画背景色，并尽早标上深色主题 |
| `web/src/styles/_tokens.scss`、`web/src/App.tsx`、`web/src/styles/main.scss` | 字体改为系统字体，去掉整页 `optimizeLegibility` |
| `web/src/components/RichBlocks.tsx` | 高亮语言包改为动态引入 |
| `scripts/export-curriculum.mjs` | 索引导出为紧凑 JSON，并写出导航与卡片两份 |
| `web/src/data/curriculum.ts`、`curriculumCards.ts`、`curriculum-nav.json`、`curriculum-cards.json` | 壳层只解析导航 |
| `web/src/pages/HomePage.tsx`、`LessonPage.tsx`、`KnowledgePage.tsx`、`ReviewPage.tsx` | 这些页再挂上卡片字段 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
cd web && npx vite build
node --test --test-name-pattern "graph rejects" scripts/learning-platform.test.mjs
```

- 结果：类型检查和技能图测试通过。生产构建里壳层 `progress` 脚本约 126KB（gzip），原先约 297KB。卡片脚本约 193KB（gzip），闯关页不请求它。本机预览 `http://127.0.0.1:4181/#/paths` 的加载事件约 229ms，且没有 Google Fonts 请求。这是本机未限速的结果，不是线上 75 分位。

## 后续

- [ ] 线上 LCP 要用真实访问看，不能用本机预览代替
- [ ] 不要把 `curriculum-cards.json` 再并回壳层入口

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/curriculum.ts`、`web/src/data/curriculumCards.ts`、`web/index.html`
3. 若续作：课程列表、课文、知识库、复习页必须先执行 `curriculumCards` 的挂载，否则 `prompt` 和 `points` 是空的。
4. 禁区：勿把已点亮写成认证；勿改 `gateCleared`。
