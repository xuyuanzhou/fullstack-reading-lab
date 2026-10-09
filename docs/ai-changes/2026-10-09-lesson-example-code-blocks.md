# 学习课「例子」支持代码块，并补 12 课试点

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：学习课程也缺少代码示例 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

课次 `example` 全是叙述；约 130 课口头描述代码，但页面没有代码块样式，也无法写 \`\`\` 围栏。

## 决策

- 采用：`example`/`answer` 内 Markdown 围栏 + `RichBlocks` 渲染；试点内容集中在 `curriculum/example-code-blocks.js`（导出末尾覆盖）。
- 不采用：新加 `snippets[]` 字段（要动校验与全量 schema）；一次重写 700+ 课。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/reading.ts` | `splitFencedBlocks` |
| `web/src/components/RichBlocks.tsx` | 新建：散文 + `<pre class="lesson-code">` |
| `web/src/pages/LessonPage.tsx` | 例子与参考答案用 `RichBlocks` |
| `web/src/styles/_reading.scss` | `.lesson-code` / `.rich-blocks` |
| `scripts/polish-readability.mjs` | 围栏内不做口语/课 id 改写 |
| `curriculum/example-code-blocks.js` | 12 课试点 example |
| `scripts/curriculum.mjs` | 注册该脚本 |
| `docs/课程例子代码块约定.md` | 写作约定 |
| `web/src/data/curriculum*.json` | export 产物 |

## 验证

```bash
cd web && npm run export:curriculum && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：导出 773 课；含围栏 example = 12；tsc 通过。
- 抽查：`eventloop` / `js-equality` / `css-cascade` / `mysql-mvcc` 的 example 含 \`\`\`。

## 后续

- [ ] 按章节继续往 `example-code-blocks.js`（或各 coverage）加围栏，优先语言基础 / React / Java 基础
- [ ] 不需要代码的场景课保持纯叙述即可
- [ ] 勿为排版去改 core 机制句

## 给下一模型

1. 约定：`docs/课程例子代码块约定.md`
2. 渲染入口：`RichBlocks` + `splitFencedBlocks`
3. 加内容：改 `curriculum/example-code-blocks.js` 后 `cd web && npm run export:curriculum`
4. 作者工具填写你正在用的产品名
