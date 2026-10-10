# 移动端样式：主线下一节与壳层溢出

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 用户：移动端查看有样式问题 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

窄屏（约 390px）打开主线页时，「下一节」按钮 `white-space: nowrap` 把标题撑破 `.path-now` 卡片，出现横向溢出。课页面包屑、顶栏图标、英雄区 CTA、目录 Drawer 在 ≤720 也偏挤。

## 决策

- 采用：下一节改成纵向两行（kicker + 标题）、按钮与卡片 `max-width: 100%` / `overflow-x: clip`；壳层加 safe-area、40px 触控目标、面包屑 ellipsis；窄屏 `html/body` 禁横向滚动。
- 采用：`.core-panel` / `.lesson-hero h1` / `.prompt-box` 的 ≤720 覆盖写在基样式**之后**，避免被后面的桌面规则盖掉。
- 不采用：单独做一套移动顶栏（仍用现有图标导航）；不改课程正文结构。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 「下一节」拆成 `.path-next-kicker` / `.path-next-title` |
| `web/src/pages/HomePage.tsx` | 英雄区 CTA 使用 `hero-actions` 便于窄屏铺满 |
| `web/src/data/learningPaths.ts` | 第 1 关 how 文案去掉与 `ol` 重复的「8 课」序号感 |
| `web/src/styles/_reading.scss` | path-now / path-next-btn / hero-actions / path-rest；移动端 panel、标题、prompt 覆盖置后 |
| `web/src/styles/_shell.scss` | ≤860/720：safe-area、触控 40px、抽屉菜单二三级缩进 |
| `web/src/styles/main.scss` | 面包屑 ellipsis；≤720 `overflow-x: clip` |

关键片段：

```scss
.path-next-btn.ant-btn {
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: auto !important;
  white-space: normal;
}
```

## 验证

```bash
cd web && npx tsc --noEmit
# 浏览器 Emulation 390×844：
# http://127.0.0.1:5173/#/paths
# http://127.0.0.1:5173/#/frontend/vue/vue-what-it-is
```

- 结果：`tsc` 通过。
- `#/paths`：`documentElement.scrollWidth === 390`；`.path-now` / `.path-next-btn` 的 `scrollWidth ≤ clientWidth`；下一节为两行且不撑破卡片。
- 章首页英雄 CTA：前两钮并排、第三钮满宽。
- 课页：面包屑末段 ellipsis；代码块可横向滚、页面本身不横滚。

## 后续

- [ ] 顶栏仍有 5 个导航图标 + 主题，极窄屏（≤360）若再挤可考虑收进「更多」
- [ ] 不要把「下一节」标题改回单行 nowrap

## 给下一模型

1. 先读：本文 + `web/src/styles/_reading.scss` 里 `.path-next-btn` 与文件末尾 `@media (max-width: 720px)`
2. 壳层断点：1100 藏 ProgressAside；860 藏侧栏改 Drawer；720 收紧顶栏与正文
3. 若改移动端 panel/标题样式：覆盖必须写在对应基选择器之后
4. 禁区：勿为修溢出去改 coverage 源文；勿用版权理由拒绝库图
