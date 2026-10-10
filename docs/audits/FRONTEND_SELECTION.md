# 技术选型

新开「技术选型」。没有打分公式：已有仓库继续用原来的界面库；小程序和 App 换运行时；正文要进源代码时用这个库自己的服务端方案；路由和数据只装一套。改数字的那一行是写法，不是得分。机制仍在 React、Vue、Flutter、React Native、uni-app 各章。

2026-10-10 加厚：补「怎么选」决策顺序（`fe-pick-decision-order` 在 frontend-20），以及框架 / 元框架 / 生态取舍对照（`coverage-frontend-46.js`）。旧课仍强调「各留一个库」；对照课回答「为什么留这个、不留那个」。

| 课程 | 说法 |
| --- | --- |
| `fe-pick-decision-order` | 没有打分公式：仓库和团队 → 打开方式（换运行时）→ 该库自己的服务端方案 → 只装一套包 |
| `fe-pick-by-surface` | 后台、要进 HTML 的内容、小程序、手机 App 各是一个目标端。第一屏 HTML 是「查看网页源代码」里的那份；岛屿是内容页上标了 client:load 的那几块 |
| `fe-ui-update-model` | 选定之后的写法：setCount / ref.value / signal.set / $state。不参与选型打分 |
| `fe-framework-tradeoffs` | 界面库选定之后，官方自带什么、还要自己装什么。包更全不是得分 |
| `fe-meta-framework-tradeoffs` | 源代码里有没有标题只用来核对需求；脚手架跟已选的库（含 Angular SSR），不按「要 SSR」同时建多套 |
| `fe-react-framework-first` | 新项目用文档列出的 Next.js 或 React Router 框架模式 |
| `fe-vue-official-slots` | 新项目用 Vite、Vue Router、Pinia；要首屏 HTML 时用 Nuxt |
| `fe-angular-first-party` | v21 起新应用默认无 Zone；路由、HTTP、表单用 Angular 自己的包 |
| `fe-sveltekit-runes` | Svelte 5 用 runes，应用框架是 SvelteKit |
| `fe-ecosystem-follows-model` | 选定界面库后，框架、路由、客户端状态、服务端缓存跟这一套 |
| `fe-ecosystem-slot-tradeoffs` | 同一套里：路由 / 服务端列表 / 客户端共享按职责取舍；会失效的归缓存 |
| `fe-react-one-slot` | 路由、服务端缓存、客户端状态、样式各留一个 |
| `fe-server-state-one-owner` | 同一份服务端列表只放一处 |
| `fe-vue-data-one-slot` | Nuxt 列表走 useAsyncData；Pinia 不复制同一份 GET |
| `fe-angular-resource-not-ngrx` | GET 走 HttpClient 或 httpResource；NgRx 不是新应用默认 |
| `fe-svelte-load-not-store` | 页面数据从 load 返回；不要在 load 里写全局状态 |
| `fe-cross-end-one-runtime` | 浏览器、小程序、Flutter 自绘、React Native 系统视图各留一个运行时；表上写适合/代价 |
| `fe-expo-router-one-nav` | 新 Expo 应用路由用 Expo Router，不要再挂第二套导航 |
| `fe-flutter-state-one-approach` | 深链用 go_router；跨页状态只留文档里的一种做法 |

对照过的页面：

- [React：创建应用](https://react.dev/learn/creating-a-react-app)、[从零搭建](https://react.dev/learn/build-a-react-app-from-scratch)、[Create React App 日落](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)
- [Vue：快速上手](https://vuejs.org/guide/quick-start)、[框架级建议](https://v3-migration.vuejs.org/recommendations)、[Nuxt 简介](https://nuxt.com/docs/getting-started/introduction)
- [Angular：Zoneless](https://angular.dev/guide/zoneless)、[HttpClient](https://angular.dev/guide/http/setup)、[Router](https://angular.dev/guide/routing/router-reference)
- [Svelte：Runes](https://svelte.dev/docs/svelte/what-are-runes)、[SvelteKit](https://svelte.dev/docs/kit/introduction)
- [Astro：岛屿](https://docs.astro.build/en/concepts/islands/)、[TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)、[Pinia](https://pinia.vuejs.org/introduction.html)
- [Angular：httpResource](https://angular.dev/guide/http/http-resource)、[SvelteKit：load](https://svelte.dev/docs/kit/load)、[Expo Router](https://docs.expo.dev/router/introduction/)、[Flutter：状态管理](https://docs.flutter.dev/data-and-backend/state-mgmt/options)
