# 前端资料核验记录（第 07 批）

本记录只说明核验范围、结论和公开课程的写作依据，不收录私人题库原文或页面图片。

## 核验范围

- 私人资料：`Web前端-面试八股文&面试题库/1-前端八股文-多系列/4-前端八股文-专题分类/5.1.Vue3面试真题44页-带答案.pdf`
- 人工核对页面：第 16–25 页（编程式 Modal）、第 26–30 页（编译期补丁标记、静态提升、事件缓存、静态树字符串化）。
- 公开成果：`coverage-frontend-07.js` 中的 2 节前端课程、6 个知识点。

## 结论与修订

| 页码 | 待核验说法或示例 | 结论 | 公开课程处理 |
| --- | --- | --- | --- |
| 27 | 用一份 PatchFlags 枚举说明“静态标记”，并认为已标记的静态节点在 diff 中不再比较 | **过度简化。** 正数标记标的是动态更新种类；块只遍历带标记的后代，静态部分因此被跳过。列出的数值在当前 main 上仍对应，但 `HYDRATE_EVENTS` 已改名为 `NEED_HYDRATION`（32），`HOISTED` 已改名为 `CACHED`（仍是 -1），并多了开发环境根片段 2048。 | `vue-patch-hoist` |
| 27–28、30 | 静态 vnode 提到 render 外并打上 -1；静态内容够大就用 `createStaticVNode` 走 innerHTML | **方向正确，但条件不足。** `@vue/compiler-core` 的 `hoistStatic` 默认 false；单文件 `compileTemplate` 和完整构建的运行时编译会打开它。-1 现名 `CACHED`。innerHTML 字符串化只在 Node 编译器里、对已提升的连续节点生效，节点数达到 20 或带绑定元素计数达到 5，插槽内容会放弃。 | `vue-patch-hoist` |
| 29 | 打开事件缓存后按钮不再带 PROPS 标记，下次 diff 直接复用 | **过度简化。** 这是 `cacheHandlers`，编译器核心默认 false，且依赖 `prefixIdentifiers`；浏览器运行时编译不能用。单文件 `compileTemplate` 会打开，Vite 插件不另行改写，工程仍可覆盖。内联函数、稳定方法、组件上的方法引用和 v-for 闭包条件不同；click 以外的事件即使缓存仍可能带水合标记。没有补丁标记表示块更新不遍历它，并不等于静态提升那种 vnode 复用。 | `vue-patch-hoist` |
| 19–22 | Vue 3 移除 `Vue.extend`，改用 `createVNode` + `render` 挂到 body；`Teleport to="body"`；setup 没有 this，改挂 `app.config.globalProperties` | **方向正确，但示例不完整。** `Vue.extend` 与 `Vue.prototype` 已不能当现代写法。迁移指南的挂载示例是 `createApp().mount()`；`createVNode` 与 `render` 仍从运行时导出，文档中的 vnode 工厂是 `h()`。示例缺少导入、props、应用上下文，也没有 `render(null, 容器)` 卸载。Teleport 的官方模态示例就是传到 body，只改 DOM 位置，目标挂载时必须已存在。`globalProperties` 出现在模板和选项式 `this` 上，不会变成 setup 里的局部变量。 | `vue-modal-programmatic` |
| 17–25 | 遮罩、标题、按钮和编程式挂载构成一个完整 Modal | **示例不完整。** 资料有可点击遮罩，但没有把焦点移入、Tab 圈定、Escape 关闭和 `role="dialog"` / `aria-modal` 写成完成条件。挂到 body 不等于无障碍对话框完成。 | `vue-modal-programmatic` |

判断范围：Vue 官方渲染机制、Teleport、应用配置、setup 与迁移指南，以及 vuejs/core 的 main（`4ab865a`，2026-09-18；`patchFlags.ts` 最后改动 `4aa7a4a`，2025-06-05）。未核验该 PDF 其余页。

## 官方核对来源

- [Vue：Rendering Mechanism](https://vuejs.org/guide/extras/rendering-mechanism.html)
- [Vue 3 源码：PatchFlags](https://github.com/vuejs/core/blob/main/packages/shared/src/patchFlags.ts)
- [Vue 3 源码：编译器选项](https://github.com/vuejs/core/blob/main/packages/compiler-core/src/options.ts)
- [Vue 3 源码：compileTemplate](https://github.com/vuejs/core/blob/main/packages/compiler-sfc/src/compileTemplate.ts)
- [Vue：Render Function APIs](https://vuejs.org/api/render-function.html)
- [Vue 3 迁移：Global API](https://v3-migration.vuejs.org/breaking-changes/global-api.html)
- [Vue：Teleport](https://vuejs.org/guide/built-ins/teleport.html)
- [Vue：Application API](https://vuejs.org/api/application.html)
- [Vue：setup()](https://vuejs.org/api/composition-api-setup.html)
- [WAI-ARIA：Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
