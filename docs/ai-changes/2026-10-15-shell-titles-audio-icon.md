# 壳页标题、页面描述和音效图标

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | 对站点审查的落地范围：只做标题、描述、音效图标 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

课文和 AI 课会改浏览器标题，学习路线、知识库、知识核验、复习清单仍停在「全栈学习实验室」。静态页没有 description。顶栏音效只有「音效关 / 音效开」两个字。

## 决策

- 采用：按现有导航和页标题写 `document.title`；`index.html` 加一条 description；音效按钮改成喇叭图标，保留原来的 `aria-label` 和 `aria-pressed`。
- 不采用：改 HashRouter、预渲染、sitemap、虚拟列表。这些和当前 GitHub Pages 部署不符，或仓库里已经有。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/AppLayout.tsx` | `shellPageName` 给路线、知识库、核验、复习、本机资料和章节首页单独标题 |
| `web/index.html` | 增加 `meta name="description"` |
| `web/src/transition/RouteTransition.tsx` | 音效按钮改为 Volume 图标 |
| `web/src/styles/_transition.scss` | 按钮尺寸与顶栏其它图标按钮对齐 |

## 验证

在 `http://127.0.0.1:5173` 打开过这些地址，标题分别为：

- `#/paths` → 学习路线 · 全栈学习实验室
- `#/knowledge` → 知识库 · 全栈学习实验室
- `#/audit` → 知识核验 · 全栈学习实验室
- `#/review` → 复习清单 · 全栈学习实验室
- `#/local` → 我的资料 · 全栈学习实验室
- `#/java/database` → Java · 学习路线 · 全栈学习实验室
- `#/java/database/mysql-what-and-when` → MySQL 是关系库 · 全栈学习实验室
- `#/ai/intro` → 入门 · AI · 全栈学习实验室

音效按钮可在「打开转场音效」和「关闭转场音效」之间切换，测完已关回。窄屏和桌面顶栏都能看见喇叭图标。

## 后续

- [ ] 不要把音效改回纯文字
- [ ] 不要为了搜索收录改掉 HashRouter

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/components/AppLayout.tsx` 的 `shellPageName`，`web/src/transition/RouteTransition.tsx` 的 `TransitionAudioButton`
3. 若续作：新壳页要在 `shellPageName` 里加分支，否则标题会落回站点名
4. 禁区：不要改 HashRouter，不要为预渲染改 `base: './'`
