# 技术选型整章提问可读性过一遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 用户：其他的课程也要检查（承接 `fe-pick-by-surface` 的说明标准） |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`fe-pick-by-surface` 已按「提问能直接读、术语在课内有定义」改过。同章其余课和微前端入口课仍有叠句提问，且缺少 `promptAnswer`。

## 决策

- 采用：技术选型 15 课全部补上 `promptAnswer`；难读的提问改写成两句（先给事实，再问缺口）。在课内定义「槽位」「runes」「无 Zone」「payload」。`fe-ui-update-model` 增加职责对照表。同模式的 `mfe-pick-by-constraint` 一并改写。
- 不采用 / 刻意不做：不在这一刀重写 800+ 课的正文。其它章只扫「为什么「…」仍然选不出」这类叠句；全库下一刀再按章推进。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 选型课提问、答案、术语深挖、更新模型表 |
| `curriculum/coverage-frontend-25.js` | 生态/数据/Expo/Flutter 课提问与答案 |
| `curriculum/coverage-frontend-27.js` | `mfe-pick-by-constraint` 提问与答案 |
| `docs/audits/FRONTEND_SELECTION.md` | 可读性备注 |
| `web/src/data/curriculum-*.json` | `export:curriculum` |

## 验证

```bash
node --check curriculum/coverage-frontend-20.js
node --check curriculum/coverage-frontend-25.js
cd web && npm run export:curriculum
node ../scripts/verify_content.mjs
```

- 结果：选型 15 课均有 `promptAnswer`。全库仅余的同类叠句提问已改掉。导出 871 课，校验通过。

## 后续

- [ ] 下一刀可按同一清单扫「React / Vue / Java 主线」各章提问
- [ ] 不要把 `promptAnswer` 做成空套话；必须点破提问里叠在一起的两件事

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-09-fe-pick-prompt.md`
2. 再读：`docs/audits/FRONTEND_SELECTION.md`
3. 若续作：用脚本扫 `prompt` 里的「为什么「」仍然 / 先进程度 / 无 Zone 应用」类叠句，按章改写
4. 禁区：不要改主线关卡顺序
