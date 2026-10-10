# 语言基础、TypeScript、CSS、React、Vue 补上定义课

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | Java 基础类型与语法已写完；这些章仍从纠错课开头 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

Java 基础补了能写出普通类的类型和语法。语言基础、TypeScript、CSS、React、Vue 仍从相等、unknown、盒模型、Fiber、代理这些纠错课进入，读完写不出对应的第一段代码。

## 决策

- 采用：各章前面加定义课，不写「为什么」。语言基础 11 课：值的种类、let/const、number、字符串、数组、对象、函数、if 的假值、循环、try/throw、switch。TypeScript 3 课：类型标注、对象和数组类型、联合类型。CSS 2 课：规则、简单选择器。React 3 课：函数组件、props、useState。Vue 2 课：单文件组件模板、ref。原有纠错课留在后面，新课用课号指过去。
- 不采用 / 刻意不做：不改原课正文。Spring、JVM、并发、数据库、缓存、消息队列已有机制课或导论，这轮不另写一层概述。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-49.js` 至 `54.js` | 21 课 |
| `scripts/curriculum.mjs` | 发布清单、目录、PATH_LEAD |
| `legacy/index.html` | 按同样顺序加载 |
| `README.md`、`docs/核对交接.md` | 949 课 / 2855 知识点；下一前端文件 55 |
| `web/src/data/curriculum*.json`、`legacy/publication-order.js` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：949 lessons / 2855 knowledge points；导出与发布清单一致。

## 后续

- [ ] 下一空闲文件是 `coverage-frontend-55.js` 与 `coverage-java-119.js`。
