# 学习课例子代码块第十二批（浏览器 / 工程 / Vue / 全栈主线，+43）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch11](2026-10-09-lesson-example-code-batch11.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第十一批后剩余未围栏集中在浏览器 HTML5、前端工程实践、Vue 与前后端全栈主线。导出校验还要求 `legacy/index.html` 与 `publishedSources` 同步（frontend-40、java-97/98）。

## 决策

- 采用：只扩 `curriculum/example-code-blocks.js`；补 legacy script 标签与 README 计数。
- 不采用：改 core。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +43 课围栏 example |
| `legacy/index.html` | 接入 `coverage-frontend-40.js`、`coverage-java-97/98.js` |
| `web/src/data/curriculum*.json` | export 产物 |
| `README.md` | 课数对齐 849 / 2554（前端 287 / Java 562） |

本批：12 浏览器 + 12 工程实践 + 11 Vue + 8 全栈主线（前后端各 4）。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：849 课 / 2554 KP；含 \`\`\` 的 example = **733**；batch12 的 43 个 id 均有围栏；`verify_content` 通过。

## 后续

- [x] 例子下一批：JS / 网络 / 生态 / 测试（见 [batch13](2026-10-09-lesson-example-code-batch13.md)）
- [ ] 新 coverage 接入时同步 `publishedSources` + `legacy/index.html` + README 计数
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 先读：本文 + [batch11](2026-10-09-lesson-example-code-batch11.md)
2. 已有 id 见 batch1–12，勿重复
3. 约定：`docs/课程例子代码块约定.md`
