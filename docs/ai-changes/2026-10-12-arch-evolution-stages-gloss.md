# 架构演进课：术语释义、答案空行与相关课收口

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `arch-evolution-stages`；接续 `2026-10-11-arch-system-design-review-fixes.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

再审：答案空行不足；垂直/水平扩展、模块化单体、经典 SOA、ESB、N-tier 宜 〔〕；deep「和导论/和消息」宜并「相关课」；开篇「资料里」略像纠资料。

## 决策

- 采用：上述标记与空行；deep 合并相关课；开篇改为「常见完整谱系往往是」。
- 不采用：改两条线主轴。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-07.js` | `arch-evolution-stages` |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔垂直扩展｜|相关课' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿把演进写成人人必走的分数阶梯

## 给下一模型

1. 先读：本文
2. 再读：`curriculum/coverage-path-07.js` 的本课
3. 禁区：勿把 SOA 与微服务写成换名
