# 学习课例子代码块第十一批（微前端 / CSS / React / 架构，+41）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch10](2026-10-09-lesson-example-code-batch10.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第十批后剩余未围栏多为前端微前端 / CSS / React 核心，以及系统设计演进课。导出时被并行 `coverage-java-96` 的损坏 SVG（非 UTF-8）挡住。

## 决策

- 采用：只扩 `curriculum/example-code-blocks.js`；顺带重写两张坏 SVG 为合法 UTF-8。
- 不采用：改 core。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +41 课围栏 example |
| `curriculum/diagrams/db-insert-unique-cron-not-lease.svg` 等 | 重写为 UTF-8（含 `web/public` 副本） |
| `web/src/data/curriculum*.json` | export 产物 |
| `README.md` | 课数对齐 843 / 2536（前端 285 / Java 558） |

本批：12 微前端（`mfe-*`）+ 9 CSS + 12 React 核心 + 8 架构演进（`arch-*`）。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：843 课 / 2536 KP；含 \`\`\` 的 example = **690**；batch11 的 41 个 id 均有围栏。

## 后续

- [x] 例子下一批：浏览器 / 工程 / Vue / 全栈主线（见 [batch12](2026-10-09-lesson-example-code-batch12.md)）
- [ ] 新 SVG 写入后务必 UTF-8 校验再 export
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 先读：本文 + [batch10](2026-10-09-lesson-example-code-batch10.md)
2. 已有 id 见 batch1–11，勿重复
3. 课数变了同步 `README.md` 计数句
4. 约定：`docs/课程例子代码块约定.md`
