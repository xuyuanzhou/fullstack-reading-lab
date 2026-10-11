# 第 2 关：关卡页不泄题并对齐 D2

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | 架构师主线 g2 / 把写入做对 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查第 2 关后发现：关卡页在「先回答」下直接贴出要点；`how` 写「三样」而交付是四条；四课与 D2（并发不变量、失败类型表）脱节；口语与参考答案整段挤在一起。

## 决策

- 采用：关卡页下一节只显示提问；重写 g2 的 how / outputs / pass / job；四课参考答案分条；Cookie 课标题改用顿号以免 `shortTitle` 截断对比半句。
- 不采用：为本关新增第 5 课；不改第 3～6 关结构。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 下一节不再渲染 `points` |
| `web/src/data/learningPaths.ts` | g2 how/outputs/pass/job 对齐 D2 与第 1 关 |
| `curriculum/coverage-path-06.js` | `spring-transaction`、`idempotency` 答案分条 |
| `curriculum/coverage-lessons.js` | `http-methods` 答案分条 |
| `curriculum/coverage-path.js` | `cookie-credential` 标题与答案分条 |
| `curriculum/answer-walkthrough.js` | 事务与幂等答案与上同步 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过（1055 lessons）

## 后续

- [ ] 浏览器打开主线第 2 关：确认「先回答」下无要点列表，Cookie 课标题含 localStorage 半句
- [ ] 勾交付四条与 how「四样」一致
