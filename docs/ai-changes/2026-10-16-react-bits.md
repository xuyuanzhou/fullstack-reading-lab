# 已点亮数字用 React Bits 的 CountUp

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 技能树、闯关总图入口 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照 [React Bits](https://reactbits.dev) 的文字动效、动画和背景目录，看技能树和闯关总图哪里值得接一块现成动效。库不是 npm 包，是拷进仓库的源码；本应用已有 `motion` 14，没有 Tailwind。

## 决策

- 采用：只接入 CountUp（TS + CSS）。技能页抬头和总图「点燃」卡上的「已点亮」分子从 0 滚到当前数，分母不动。时长 0.7 秒。系统开了减少动态效果时，组件直接落到终值。
- 不采用 / 刻意不做：
  - StarBorder。它自带深色按钮底和描边，套上印章或场景按钮会盖住本页的印章。
  - ShinyText。字用透明填充靠渐变显形，扫光停在「正在点亮」的名字上，渐变没画上时名字会空。正在点亮已经有印章的燃烧和总图上的余烬色。
  - 粒子、极光、光流一类背景。星图板已有尘点，再铺一层 WebGL 会压住赛道文字，还要另引 three 或 ogl。
  - 光标拖尾、点击火花、准星。它们不说明哪枚印章亮了、哪一关在走。
  - 不给每一枚印章的已读分数各挂一个计数器。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/bits/CountUp.tsx` | 收入 React Bits CountUp 源码，去掉 `'use client'` |
| `web/src/pages/SkillsPage.tsx` | 抬头「已点亮」的分子改走 CountUp |
| `web/src/pages/PathPage.tsx` | 总图点燃卡上的分子改走 CountUp |

## 验证

```bash
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
cd web && npx oxlint src/components/bits/CountUp.tsx src/pages/SkillsPage.tsx src/pages/PathPage.tsx
```

- 结果：tsc 通过。oxlint 只剩 PathPage 里原有的 effect setState 警告，CountUp 无新告警。
- 浏览器 `http://127.0.0.1:5173/#/skills`：页标题「技能 · 全栈学习实验室」，抬头读作「0/110 已点亮 · 正在点亮「幂等」」，计数节点 `font-variant-numeric` 为 `tabular-nums`。未点印章、未保存。
- `#/paths`：点燃卡读作「0/110 已点亮 · 正在点亮「幂等」」，石台仍是「走通一次下单 旧版已过」「把写入做对 进行中」。随后回到 `#/skills`。

## 后续

- [ ] 已点亮数大于 0 时再看一遍 0.7 秒滚动；当前这份进度分子是 0，滚动落在 0 上。
- [ ] 不要把 StarBorder、ShinyText 或 WebGL 背景铺回印章和石台。

## 给下一模型

CountUp 只包页级「已点亮」分子。印章几何仍在 `SkillSigil`，石台仍是总图自己的 SVG。新动效先问它是否在报一个已有状态；报不了就不要加。
