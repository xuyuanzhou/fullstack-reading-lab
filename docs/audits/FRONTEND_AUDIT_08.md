# 前端资料核验记录（第 08 批）

本记录只说明核验范围、结论和公开课程的写作依据，不收录私人题库原文或页面图片。

## 核验范围

- 私人资料：`Web前端-面试八股文&面试题库/1-前端八股文-多系列/4-前端八股文-专题分类/5.1.Vue3面试真题44页-带答案.pdf`
- 人工核对页面：第 10–16 页（设计目标、monorepo、Proxy 惰性深层）、第 32–36 页（`defineProperty` 与 Proxy）、第 39–44 页（Tree shaking 专节与「更快」）。
- 公开成果：`coverage-frontend-08.js` 中的 3 节前端课程。

## 结论与修订

| 页码 | 待核验说法或示例 | 结论 | 公开课程处理 |
| --- | --- | --- | --- |
| 10–16 | 设计目标概括为更小、更快、更友好；源码用 monorepo；Proxy 监听整个对象所以不必深度遍历，未访问的嵌套属性在 getter 里才递归 | **口号方向对，边界要写清。** 「更小更快更友好」是资料的概括，不是官方唯一的版本主题句；官方渲染机制文档把体积与更新成本落到编译期静态缓存、补丁标记、树扁平化等具体机制。`vuejs/core` 根 `package.json` 为 private monorepo（pnpm），`packages/` 下分模块，`@vue/reactivity` 可独立使用，这一句成立。Proxy 拦截的是对象属性访问；深层嵌套不会在创建时无脑走完，依赖在读取时追踪，嵌套对象在被访问时再变为代理——资料「getter 里才递归」与官方深度响应式说明一致。不能据此说「完全不必处理深层」，只是不必在初始化时遍历整棵树。 | `vue-design-goals-proxy` |
| 32–36 | `Object.defineProperty` 不能检测新增和删除，深层需要递归；手写 `reactive` 用 Proxy 拦截整个对象 | **主体成立，示例边界已由 V7 覆盖。** Vue 2 用 getter/setter 是因为浏览器支持限制；Vue 3 对响应式对象用 Proxy，对 ref 仍用 getter/setter。Proxy 可拦截增删、数组索引与 `length` 等；`defineProperty` 只能作用在已有属性上，新增/删除要另做辅助。深层仍要在访问路径上建立代理，不是「Proxy 一次就永久盖住任意深度」。手写 get/set 日志不等于 Vue 的依赖收集。第 37、39 页反例已由 `vue-proxy-null-guard`、`vue-array-raw-proxy` 发布。 | `vue-defineproperty-proxy` |
| 39–44 | Tree shaking 定义、Vue 2 / Vue 3 打包对比，以及摇掉代码后体积变小、执行变快 | **「更小」有条件，「更快」不能从死代码删除直接推出。** 树摇是 Dead Code Elimination，依赖 ESM 静态结构与生产构建；第 11 页的绝对化说法已由 `vue-tree-shake-options` 发布。Vue 2 默认全局构建/单例用法确实更难按 API 裁剪；Vue 3 具名导出与编译期标志让未用运行时更可能被去掉，但依赖若仍用 Options API 就不能随意关 `__VUE_OPTIONS_API__`。删掉未执行的代码主要减小下载与解析成本；运行路径上的 CPU 时间取决于实际执行的代码与编译优化，不能把「摇掉了」写成「一定执行更快」。 | `vue-tree-shake-faster` |

判断范围：当前 vuejs.org 与 `vuejs/core` main（根包版本字段 3.5.43）。未再展开该 PDF 其余已发布页。

## 官方核对来源

- [Vue：Rendering Mechanism](https://vuejs.org/guide/extras/rendering-mechanism.html)
- [Vue：Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Vue：Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue：Compile-Time Flags](https://vuejs.org/api/compile-time-flags.html)
- [Vue：Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [vuejs/core package.json](https://raw.githubusercontent.com/vuejs/core/main/package.json)
- [MDN：Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN：Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

本记录不是整份 PDF 的正确性背书。第 05、06、07 批已发布结论仍然有效。
