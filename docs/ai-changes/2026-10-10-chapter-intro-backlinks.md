# 各章首机制课回链到「是什么」

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | `2026-10-10-chapter-what-it-is.md` 后续项 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

章首「是什么」导论已上。原有机制课仍从纠偏进门，读者看不到回链。

## 决策

- 采用：各章**第一个机制课**的 `deep` 最前加一行「和导论」，指向该章导论 id；不改 `core` / `answer` / 纠偏结论。
- 不采用：不批量改全章每一课；不重写导论正文。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `coverage-frontend-49/51/52/17/18/23/26.js` | JS / TS / CSS / 小程序 / RN / Flutter / 微前端首课回链 |
| `coverage-path.js` / `path-02` / `path-04` / `path-05` / `path-07` / `path-09` | Cookie、DOM、Router、Vite、Node、Security、JUnit、trace、架构、网关 |
| `coverage-lessons.js` / `batch-04.js` / `java-117.js` / `chapters-10.js` / `java-47.js` / `distributed-lessons.js` | HTTP、JVM、并发、Spring/JPA/MyBatis/Nginx/Netty、交付、CAP |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：以 verify 输出为准（本轮只加 `deep`，不新增课）。

## 后续

- [x] 章首机制课回链
- [ ] 不要把导论收成对照表
- [ ] 下一空闲仍是 `coverage-frontend-59.js`、`coverage-java-123.js`

## 给下一模型

1. 先读：本文 + `2026-10-10-chapter-what-it-is.md`
2. 回链写法：`{title:'和导论',body:'…见 id1、id2。本课专讲…。'}`
3. 禁区：不改原课纠偏结论；不为语言章编容量数字
