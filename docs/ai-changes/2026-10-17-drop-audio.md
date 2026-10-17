# 去掉转场音效

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | 顶栏喇叭开关 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

顶栏喇叭只播几声合成短音，默认关着。换页和换站画面已经说明状态，这颗按钮占着主导航。

## 决策

- 采用：删掉音效模块、顶栏开关，以及营地换站、转场、点亮技能树时的出声。画面转场保留。
- 不采用 / 刻意不做：不改剑客石门、课表纸页和正文占位。不清理浏览器里已记下的 `fs-transition-audio`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/transition/audio.ts` | 删除 |
| `web/src/transition/RouteTransition.tsx` | 去掉音效按钮和出声 |
| `web/src/components/AppLayout.tsx` | 顶栏不再挂开关 |
| `web/src/pages/PathPage.tsx` | 点亮技能树不再出声 |
| `web/src/styles/_transition.scss` | 去掉 `.fx-audio` |

## 验证

- `#/paths` 顶栏没有「打开转场音效」，页面上也没有 `.fx-audio`。点最近阅读「JVM 运行时数据区」后打开课文「JVM 运行时数据区：规范与实现」，转场测试 3 项通过，类型检查通过。

## 后续

- [ ] 不要把喇叭或 `audio.ts` 加回顶栏
- [ ] 画面转场仍只在总图进课文、窄屏以上的课表纸页播放

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/transition/RouteTransition.tsx`、`web/src/components/AppLayout.tsx` 的 `header-tools`
3. 禁区：不要恢复 Web Audio，也不要为了这次改动去动 `localStorage` 里的学习记录
