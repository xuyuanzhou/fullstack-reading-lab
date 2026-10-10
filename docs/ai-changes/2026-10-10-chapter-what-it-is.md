# 各章补「是什么」导论

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 计划：各章是什么导论；接续 React/Vue、ES/Redis/MQ/MySQL 导论 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

多数章从机制纠偏进门，章主题本身没有定义。读者先碰到 `js-value-kinds`、`spring-ioc-wiring`、`rn-view-not-div`，还不知道这一章的东西是什么。

## 决策

- 采用：按章类型两套模板。语言/运行时/框架用「是什么 · 怎么进门 · 不是什么/旁边是谁」。产品/中间件用「是什么与何时用 · 权衡 · 相对边界」。单课章旨并进已有小节，避免 `ids.length < 2` 被目录滤掉。
- 不采用 / 刻意不做：不重做 React/Vue、ES/Redis/MQ/MySQL、SCA 总览、设计模式总览、全栈主线、技术选型。不改原有纠偏结论。不编容量数字。语言章不单开「为什么」。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-56.js` | JS / TS / CSS / 浏览器 / HTTP / Node 各 3 课 |
| `curriculum/coverage-frontend-57.js` | RN / Flutter / UniApp·Taro 各 3 课；微前端「是什么」1 课 |
| `curriculum/coverage-frontend-58.js` | 浏览器安全 1 课；React/Vue 生态与前端工程章旨 |
| `curriculum/coverage-java-119.js` | Java / JVM / 并发各 3 课 |
| `curriculum/coverage-java-120.js` | Spring / JPA / MyBatis / Security / JUnit 各 3 课 |
| `curriculum/coverage-java-121.js` | Nginx / 网关导论；Netty 是什么 |
| `curriculum/coverage-java-122.js` | GHA / Docker / K8s 各 3 课；分布式 / 系统设计 / 工程实践章旨 |
| `scripts/curriculum.mjs` | 发布清单、OUTLINE 章首 |
| `scripts/verify_content.mjs` | 发布清单断言补 56–58、119–122 |
| `legacy/index.html` | 按同样顺序加载 |
| `README.md`、`docs/核对交接.md` | 1045 课 / 3143 知识点；下一空闲 59 / 123 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：1045 lessons / 3143 knowledge points（前端 364 / Java 681）。

## 后续

- [ ] 下一空闲文件是 `coverage-frontend-59.js`、`coverage-java-123.js`。
- [ ] 不要把这些定义课收成对照表，也不要改回从机制纠偏开头。
- [ ] 原有机制课的回链可在空闲时补一行 `deep`，不改结论。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-frontend-56.js` 起、`scripts/curriculum.mjs` 里各章 OUTLINE 第一组
3. 若续作：语言章模板对齐 `react-what-it-is`；产品章对齐 `es-what-and-when`
4. 禁区：不要给 JavaScript 或 CSS 编容量数字；不要把 React/Vue 写成「更新模型」；单课不要单独占一个 `ids.length === 1` 的小节
