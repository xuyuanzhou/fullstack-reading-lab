# CAP 课：术语释义、答案分条与知识点收口

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `distributed-cap`；接续 `2026-10-11-distributed-cap-authority.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查：权威口径正确；答案空行、线性化/网络分区点击释义、首句可读、deep「和导论」、知识点首条口号需收口。

## 决策

- 采用：`〔网络分区｜…〕`、`〔线性化｜…〕`；答案空行与首句「先确认…这才叫网络分区」；deep「相关课」；知识点改为可核对命题。
- 不采用：改提问/取舍口径；重写 Gilbert–Lynch 论述。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/distributed-lessons.js` | core / answer / deep |
| `curriculum/knowledge-points.js` | 首条知识点 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔网络分区｜|取舍前须先确认网络分区' web/src/data/curriculum-bodies-java.json web/src/data/curriculum-index.json
```

- 结果：通过。

## 后续

- [ ] 勿把产品永久 CP/AP 写回 core
- [ ] deep 勿再写「本地资料怎么用」

## 给下一模型

1. 先读：本文 + `2026-10-11-distributed-cap-authority.md`
2. 再读：`curriculum/distributed-lessons.js` 的 `distributed-cap`
3. 禁区：勿改「分区已发生才谈 C/A 取舍」的主轴
