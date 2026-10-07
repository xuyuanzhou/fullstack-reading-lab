# 新增前端「微前端」章节（12 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-07 |
| 状态 | 已完成 |
| 关联 | 用户请求：以微前端专家视角添加章节 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

公开课此前有技术选型与跨端，但缺少「多应用如何组合、何时不该拆」的微前端专章。需要按仓库既有课体（问题 / 模型 / 练习 / 依据）补齐，并接入侧栏大纲与导出校验。

## 决策

- 采用：在 `技术选型` 之后、`React Native` 之前新增组 `微前端`；12 课分四节（边界 / 集成 / 运行时 / 交付）；事实锚定 webpack Module Federation、single-spa、平台 API，不当成框架选美。
- 不采用：不把 qiankun / wujie 写成互斥赢家课；不把「目录切开」当成微前端完成定义。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-26.js` | 12 课正文与知识点、依据 |
| `curriculum/diagrams/mfe-*.svg` + `web/public/diagrams/mfe-*.svg` | 4 张机制图；曾因写入损坏 UTF-8 导致浏览器裂图，已用 UTF-8 重写 |
| `scripts/curriculum.mjs` | publishedSources、GROUP_ORDER、GROUP_LABEL、OUTLINE |
| `web/src/data/routes.ts` | 路由键 `micro-frontends` |
| `web/src/data/meta.ts` | 前端路线介绍补微前端 |
| `legacy/index.html` | 加载 frontend-26 |
| `scripts/verify_content.mjs` | 断言新源文件 |
| `README.md` / `docs/课程选题与编辑记录.md` | 课数与路线叙述 |
| `docs/audits/FRONTEND_MFE.md` / `docs/核对交接.md` | 审查台账行 |
| 导出产物 | `curriculum.json` / index / bodies / public diagrams |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：706 课（前端 245 / Java 461），2125 知识点；outline 含微前端四节。
- 裂图修复：四张 `mfe-*.svg` 用 Python 按 UTF-8 重写后，课页与直链均可显示。
- 顺带：同编码损坏的另外 8 张（`react-flow-ts`、`react-enzyme-rtl`、`java-clone-checked`、`java-collection-collections`、`java-stringbuilder-buffer`、`java-switch-arrow`、`redis-aof-rdb`、`redis-cluster-cli`）一并重写；`validateLessons` 对所有 diagram 做 UTF-8 fatal 校验。

## 后续

- [x] 已补 `docs/audits/FRONTEND_MFE.md` 与核对交接行
- [x] 已修复微前端 SVG 非 UTF-8 裂图（及同因的 8 张旧图）
- [ ] 勿把「行数阈值」写成必须上微前端的硬规则
- [ ] 写含中文的 SVG 时用显式 UTF-8 落盘（Python/Node `write_bytes`/`writeFileSync`，勿走会损坏多字节的写入路径）

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`curriculum/coverage-frontend-26.js`、`scripts/curriculum.mjs` 中 `微前端` 段、`curriculum/diagrams/mfe-*.svg`
3. 若续作：补 iframe/Web Component 专课，保持「先边界后集成」顺序
4. 禁区：勿把私人资料原文拷进公开课；改课数必须同步 README 与 verify；含中文 SVG 必须是合法 UTF-8
