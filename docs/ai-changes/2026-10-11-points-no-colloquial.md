# 契约：知识点不用口语；清掉现有口语

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | 契约第 11 节；用户：所有知识点都不要用口语 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

知识点（`points`）与课上正文仍有「连发」「库里」「各守」「踩坑」「翻车」「语义坑」「对不上」「搞定」等口语。公开课用词原先主要禁自造分类名，未写明知识点禁止口语。

## 决策

- 采用：契约第 11 节增加「知识点不用口语」及禁词样例；`verify_content` 对导出后的 `points` 做禁词检查。
- 采用：清掉当前命中的知识点与同批课上正文/图中的口语（踩坑/翻车/搞定/连发/对不上/语义坑等）。
- 不采用：本轮整库替换正文里所有「对不上」（量大；契约已禁止当术语，后续分批）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/AI契约-变更记录规范.md` | §11、验收清单 |
| `AGENTS.md` | 公开课用词指针含知识点 |
| `scripts/verify_content.mjs` | `points` 口语禁词断言 |
| `curriculum/coverage-*.js` 等 | 知识点与相关提问/正文/图去口语 |
| `curriculum/diagrams/mysql-money-decimal-not-ban.svg` 等 | 图上用词 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：`1055 lessons / 3173 knowledge points`；verify 通过。

## 后续

- [ ] 正文里剩余「对不上」（读文档/排障语境）分批改成「不一致」或更具体的说法
- [ ] 不要把「踩坑」「翻车」「库里」「连发」写回知识点

## 给下一模型

1. 先读：契约 §11「知识点不用口语」+ 本文
2. 改 `points` 后必须跑 `verify_content.mjs`
3. 禁区：不为好读把口语写进与术语并列的位置
