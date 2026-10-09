# 把选型课的开头问句写成能直接读的话

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 课 `fe-pick-by-surface` 的提问 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

原提问是「为什么『公司都在用 React』还是选不出该新建 Nuxt、小程序还是原生 App」。两个「还是」叠在一起，Nuxt 又不是 React，读者读不出它在问什么。

## 决策

- 采用：提问改成「公司已经在用 React。为什么这句还是决定不了：这次要新建的是浏览器里的内容站、微信小程序，还是手机 App？」`promptAnswer` 写明：React 只说明界面怎么更新；打开方式是另一件事；Nuxt 是 Vue 的内容站。「为什么」第一节也写这三句。
- 不采用 / 刻意不做：不改这一课的职责表和四格目标端。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | `prompt`、`promptAnswer`、`why` |
| `curriculum/diagrams/seckill-mq-not-only-db-valve.svg` | 原文件不是合法 UTF-8，导出被拦住。按该课正文补了一份可显示的图，便于 `export:curriculum` 通过 |
| `web/src/data/curriculum-index.json` 等 | `export:curriculum` 导出 |

## 验证

```bash
cd web && npm run export:curriculum
```

- 结果：导出 859 课。课页提问已是改写后的两句，「为什么」开头是「『公司都在用 React』只确定了界面库」。

## 后续

- [ ] 秒杀那张图若原作者另有定稿，以定稿替换这次为了解开导出而补的文字
- [ ] 提问保持「打开方式」和「界面库」两件事分开

## 给下一模型

1. 先读：本文
2. 再读：`curriculum/coverage-frontend-20.js` 里 `fe-pick-by-surface` 的 `prompt` 与 `why`
3. 若续作：不要把 Nuxt 写回「因为用了 React 所以选 Nuxt」
4. 禁区：不要改主线关卡
