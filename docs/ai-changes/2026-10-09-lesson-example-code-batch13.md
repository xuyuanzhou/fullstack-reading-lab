# 学习课例子代码块第十三批（JS / 网络 / 生态 / 测试，+48）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch12](2026-10-09-lesson-example-code-batch12.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第十二批后剩余未围栏集中在语言基础、网络与安全、React/Vue 生态、测试与 TypeScript。

## 决策

- 采用：只扩 `curriculum/example-code-blocks.js`。
- 不采用：改 core；纯选型对照矩阵课可留到下一批。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +48 课围栏 example |
| `web/src/data/curriculum*.json` | export 产物 |

本批：13 JS 语言基础 + 9 网络与安全 + 7 React 生态 + 7 Vue 生态 + 5 测试 + 4 TypeScript + 3 前端安全。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：849 课 / 2554 KP；含 \`\`\` 的 example = **787**；batch13 的 48 个 id 均有围栏；`verify_content` 通过。

## 后续

- [x] 例子下一批：选型 / 微前端 / Flutter / Java 收尾（见 [batch14](2026-10-09-lesson-example-code-batch14.md)；公开课围栏已清零）
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 先读：本文 + [batch12](2026-10-09-lesson-example-code-batch12.md)
2. 已有 id 见 batch1–13，勿重复
3. 约定：`docs/课程例子代码块约定.md`
