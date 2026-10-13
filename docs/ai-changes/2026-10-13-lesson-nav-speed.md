# 换课和刷新不再执行整份课表脚本

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | 页面跳转、刷新很慢 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

开发服务器上，刷新文档就绪约 1.6 秒；第一次打开一节 Java 课约 5.8 秒。课表 JSON 被 Vite 编成带 sourcemap 的对象字面量，Java 正文模块约 7.5MB。换到下一节时，侧栏仍为全部课程各建一个链接，同轨再跳一次仍要约 5 秒。

## 决策

- 采用：索引用 `curriculum-index.json?raw`，正文用 `?raw` 再 `JSON.parse`。侧栏只给当前展开的章节建课链接，收起的章节留一个不占高度的占位。已解析的正文用 `peekFullLesson` 同步取出，换课不再先清空成「正在打开课程」。
- 不采用：不把 `json.stringify` 开到全局。试过之后模块变成 9MB 的 `JSON.parse` 加内联 sourcemap，比原来更大。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/curriculum.ts` | 课表改为 raw 字符串解析；增加 `peekFullLesson` |
| `web/src/pages/LessonPage.tsx` | 正文已在内存时直接画 |
| `web/src/components/AppLayout.tsx` | 侧栏只展开当前章节的课 |
| `web/src/styles/_shell.scss` | 占位菜单项不占高度 |
| `web/src/state/progress.tsx` | 最近阅读已是这一节时不重新渲染 |
| `web/src/components/ReadingBoundary.tsx` | 边界捕获后把错误打到控制台 |

## 验证

- 刷新 `#/java/fullstack/fs-write-invariant`：文档就绪约 0.6 秒；Java 正文模块约 1.7MB、约 0.2 秒。
- 同轨换课：约 0.9–1.1 秒，不再出现「正在打开课程」。开发模式里 React 仍有一次约 0.5 秒的长任务。

## 后续

- [ ] 不要把课表改回 `import from '.json'`。那个转换会重新生成数 MB 的对象字面量
- [ ] 不要为了换课把全部章节的课链接再建出来

## 给下一模型

1. 先读：本文
2. 再读：`web/src/data/curriculum.ts`、`web/src/components/AppLayout.tsx` 里 `menuItems`
3. 若续作：占位项 class 是 `menu-hold`，只用于收起的章节，展开后必须换成真正的课链接
4. 禁区：不要开启全局 `json.stringify`
