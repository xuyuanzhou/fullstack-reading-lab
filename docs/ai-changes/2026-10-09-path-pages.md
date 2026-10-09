# 站内全栈交付线与架构师主线页

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 架构师主线 P1；学习路线分层 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

审查结论已在文档。继续做产品入口，避免路线只存在于 Markdown。

## 决策

- 采用：`/#/paths/fullstack` 与 `/#/paths/architect`，课链到现有课文；首页两个入口；轨道介绍加一句「课数不等于毕业」
- 不采用：本轮改侧栏三模式、进度百分比语义、新写验收课

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningPaths.ts` | 关卡与课 id |
| `web/src/pages/PathPage.tsx` | 路线页 |
| `web/src/App.tsx` | 路由 |
| `web/src/pages/HomePage.tsx` | 入口按钮 |
| `web/src/data/meta.ts` | 轨道介绍补一句 |
| `web/src/styles/_reading.scss` | 关卡样式 |
| `docs/架构师主线设计.md` | P1 标为页面已做 |
| `docs/学习路线分层设计.md` | 注明入口地址 |

## 验证

```bash
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：通过。页面打开 `/#/paths/fullstack` 与 `/#/paths/architect` 核对课链。

## 后续

- [ ] 侧栏「全栈交付 / 架构师 / 索引」三模式
- [ ] 进度改成 F/D 勾选，而不是课数百分比
- [ ] 勿把关卡 6 做成可打卡的假课

## 给下一模型

1. 先读：`docs/架构师主线设计.md` 与 `web/src/data/learningPaths.ts`（两边课 id 要一起改）
2. 路由必须写在 `:track/:groupKey` 之前
