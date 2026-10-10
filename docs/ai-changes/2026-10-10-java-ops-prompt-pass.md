# 设计模式 / 工程实践 / 交付与运行提问可读性过一遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 承接 `2026-10-10-java-dist-prompt-pass.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

分布式与高并发已补参考答案。设计模式、工程实践、交付与运行仍有「为什么」类提问无 `promptAnswer`。

## 决策

- 采用：三章共 63 课全部补上 `promptAnswer`；约 7 课重写叠句提问。答案点破「类名/口号」与「现行机制」两件事，不整段照抄 `answer`。
- 不采用 / 刻意不做：不在这一刀改模式正文或流水线示例。Spring Cloud Alibaba、搜索、Nginx 等章下一刀再扫。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| 多份 `curriculum/coverage-*.js`、`lessons.js` 等 | 插入 `promptAnswer`；部分改 `prompt` |
| `web/src/data/curriculum-*.json` | `export:curriculum` |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：三章 `withAnswer 63 of 63`。导出 907 课 / 2729 知识点，校验通过。

## 后续

- [x] 下一刀收尾 → `2026-10-10-java-rest-prompt-pass.md`（SCA / 搜索 / Nginx 等 90 课）
- [ ] 可选扫前端轨同类提问

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-10-java-dist-prompt-pass.md`
2. 筛 `track==='java' && !promptAnswer && /为什么/.test(prompt)`，按章推进
3. 禁区：不要整段复制 `answer`；OUTLINE id 与课源必须一致
