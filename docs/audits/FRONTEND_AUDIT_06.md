# 前端资料核验记录（第 06 批）

本记录只说明核验范围、结论和公开课程的写作依据，不收录私人题库原文或页面图片。

## 核验范围

- 私人资料：`Web前端-面试八股文&面试题库/1-前端八股文-多系列/4-前端八股文-专题分类/5.1.Vue3面试真题44页-带答案.pdf`
- 人工核对页面：第 1–11 页（组合式 API 对比、mixin 复用、体积/tree-shaking 表述）。
- 公开成果：`coverage-batch-06.js` 中的 2 节前端课程、6 个知识点。

## 结论与修订

| 页码 | 待核验说法或示例 | 结论 | 公开课程处理 |
| --- | --- | --- | --- |
| 1–10 | 用 Composition API 即可解决可读性、复用和 TypeScript 的全部问题，并在小结中写成全面优于 Options API | **过度绝对。** 官方 FAQ 确认组合式 API 在复杂组件组织、组合式函数复用和类型推断上更有优势，同时明确 Options API **没有弃用计划**，低到中等复杂度仍是合理选择。官方也不再推荐 mixin 作为 Vue 3 的主复用方式，原因是来源不清、命名冲突和隐式耦合。 | `vue-composition-options` |
| 11 | 引入 tree-shaking 后无用模块会被剪掉，打包整体变小 | **条件不足。** 树摇需要 ESM bundler 构建、生产模式和无副作用条件。Vue 还通过 `__VUE_OPTIONS_API__` 等编译期标志决定能否删除 Options API 运行时，该标志默认仍为 `true`；依赖若使用 Options API 则不能随意关闭。 | `vue-tree-shake-options` |

判断范围：Vue 官方文档对 API 定位、组合式函数和编译期标志的说明。该 PDF 其余页已提取到 [核对队列](../核对队列.md) 的 V3–V6、V8，尚未核对。

## 官方核对来源

- [Vue：Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue：Composables](https://vuejs.org/guide/reusability/composables.html)
- [Vue：Compile-Time Flags](https://vuejs.org/api/compile-time-flags.html)
