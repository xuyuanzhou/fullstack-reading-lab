# 课上代码块按语言上色

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | 例子里的围栏代码 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

例子和答案里的围栏只渲染成纯文本。语言标签只用来显示 JAVA、HTTP，没有按关键字上色。

## 决策

- 采用：用 highlight.js 的 core，只注册课上出现的语言。颜色跟站点浅色、深色变量走，不套一套独立主题。
- 不采用：不对没有语言标签的围栏和 `text` 图做自动识别，避免把箭头图染乱。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/package.json` | 增加 highlight.js |
| `web/src/data/highlightCode.ts` | 按围栏语言上色；Vue、Redis 用站内小语法 |
| `web/src/components/RichBlocks.tsx` | 例子和答案的代码块走着色 |
| `web/src/styles/_tokens.scss` | 浅色、深色的代码颜色 |
| `web/src/styles/_reading.scss` | `.lesson-code` 里的 token 颜色 |

## 验证

```bash
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json && npx oxlint src/components/RichBlocks.tsx src/data/highlightCode.ts
```

- 结果：类型检查和 lint 通过。浏览器打开异常映射课，注解、字符串、状态码颜色不同；切到深色后仍分开。React 课的 `function` 和标签也有颜色。

## 后续

- [ ] 新增围栏语言时，在 `highlightCode.ts` 注册，否则该语言保持纯文本

## 给下一模型

1. 先读：本文 + `web/src/data/highlightCode.ts`
2. 再读：`web/src/components/RichBlocks.tsx`
3. 禁区：不要对 `text` 或未标语言的围栏做自动识别
