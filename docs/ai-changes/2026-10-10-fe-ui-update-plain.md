# 把「谁负责更新界面」改成能直接读的四行代码

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 课 `fe-ui-update-model`；用户：看不懂，且不要捏造 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

提问把招聘排序、断点、代理、信号、`$state` 叠成一句。正文用「更新模型」代替「要写哪一行」，读者对不上文档。

## 决策

- 采用：提问改成「数字加一，各自要写哪一行」。正文只写文档里能对上的 API：React `setCount`、Vue `ref` 的 `.value`、Angular `signal.set`（v21 起新应用默认不用 zone.js）、Svelte 5 `$state`。图改成同样四行。
- 不采用：不写招聘广告排序、星数、生态宽窄。那些不是这四份文档里的事实。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 重写 `fe-ui-update-model` |
| `curriculum/diagrams/fe-ui-update-model.svg` | 四行代码对照 |
| `docs/audits/FRONTEND_SELECTION.md` | 这一行台账 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：899 课 / 2705 知识点。标题为「改一个数字时，四种框架各自要写哪一行」。

## 后续

- [ ] 对照课 `fe-framework-tradeoffs` 里「招聘面宽 / 组件库更少」同样不是文档事实，下一刀改成只保留官方能力差异
- [ ] 不要把「更新模型」「槽位」写回这一课的提问

## 给下一模型

1. 先读本文。
2. 事实只来自：react.dev State、Vue 响应式基础、angular.dev/guide/zoneless、Svelte Runes。
3. 禁区：不要用招聘、星数、满意度当这一课的论据。
