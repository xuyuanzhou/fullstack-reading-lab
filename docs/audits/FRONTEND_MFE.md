# 微前端

新开「微前端」。放在技术选型之后：先判断要不要拆、组合发生在构建时/运行时/服务端哪一步，再讲 Module Federation、共享依赖、生命周期、路由前缀、样式与登录态、独立发布与契约版本。

| 课 id | 要点 |
| --- | --- |
| `mfe-when-to-split` | 先写清所有权、独立发版、失败可见性 |
| `mfe-not-for-everything` | 同仓同发优先包边界与懒加载 |
| `mfe-composition-models` | 三种组合时机不要并成一句 |
| `mfe-module-federation` | host/remote/exposes，不是自动挂全部页面 |
| `mfe-shared-deps` | React 等必须约定 singleton |
| `mfe-runtime-lifecycle` | mount/unmount，离开要卸监听 |
| `mfe-routing-one-history` | 一条 history，子应用用 basename |
| `mfe-style-isolation` | 全局 CSS 会串 |
| `mfe-shared-auth` | 身份通道有主，不用 window 全局变量 |
| `mfe-independent-deploy` | 不可变产物 + 指针回滚 |
| `mfe-perf-cost` | 按路由加载，查重复框架 |
| `mfe-contract-version` | 导出、前缀、shared 都是契约 |

源文件：`curriculum/coverage-frontend-26.js`。依据以 webpack Module Federation、single-spa、MDN 平台 API 为准。
