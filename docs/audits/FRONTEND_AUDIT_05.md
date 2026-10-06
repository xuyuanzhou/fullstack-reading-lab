# 前端资料核验记录（第 05 批）

本记录只说明核验范围、结论和公开课程的写作依据，不收录私人题库原文或页面图片。

## 核验范围

- 私人资料：`Web前端-面试八股文&面试题库/1-前端八股文-多系列/4-前端八股文-专题分类/5.1.Vue3面试真题44页-带答案.pdf`
- 人工核对页面：第 37、39 页（已检查页面渲染及示例）。
- 公开成果：`coverage-frontend-05.js` 的 2 节原创课程、6 个知识点。

## 结论与修订

| 页码 | 待核验说法或示例 | 结论 | 公开课程处理 |
| --- | --- | --- | --- |
| 37、39 | 手写 `reactive` 对非对象值的判断使用 `typeof value !== 'object' && value != null`，之后直接构造 Proxy | **代码错误**。`typeof null` 为 `object`，该判断不会排除 `null`；`new Proxy(null,{})` 抛出 `TypeError`。 | `vue-proxy-null-guard` 让学习者对照 `&&` 和 `||`，并说明手写代理不能等同于完整的 Vue 响应式系统。 |
| 39 | 在已创建数组代理后，对原数组调用 `push`，以此说明代理能监听数组变化 | **示例不能支持结论**。原数组写入不会经过该代理；页面上的方法名还存在拼写错误。 | `vue-array-raw-proxy` 让学习者分别操作原数组和代理，检查陷阱与依赖触发。 |

判断有明确范围：Proxy 的行为由 JavaScript 定义；Vue `reactive()` 的深层代理、依赖追踪和更新行为由 Vue 官方文档说明。原生 Proxy 的 set 日志不是 Vue 更新机制的完整实现。运行了一个独立的小实验：`new Proxy(null,{})` 抛 `TypeError`，原始数组 `push` 的代理 set 计数为 0，代理数组 `push` 才进入 set 路径。

## 官方核对来源

- [MDN：Proxy() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)：目标必须是对象。
- [Vue：Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)：只有代理是响应式的；直接修改原对象不会触发更新；嵌套对象在访问时也会转为代理。
- [Vue：Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)：区分拦截读写、依赖追踪与触发更新。

这里只核验上述页码和命题，不表示整份私人资料已完成审校。
