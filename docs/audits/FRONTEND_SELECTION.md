# 技术选型

新开「技术选型」。先定目标端（浏览器后台、内容页、小程序、手机 App），再留下一种界面更新模型，以及该模型对应的应用框架、路由、跨页状态和服务端数据。机制仍在 React、Vue、Flutter、React Native、uni-app 各章。

| 课程 | 说法 |
| --- | --- |
| `fe-pick-by-surface` | 后台、要进 HTML 的内容、小程序、手机 App 各是一个目标端。第一屏 HTML 是「查看网页源代码」里的那份；岛屿是内容页上标了 client:load 的那几块 |
| `fe-ui-update-model` | React 提交更新，Vue 用代理，Angular 新应用用信号，Svelte 用 runes |
| `fe-react-framework-first` | 新项目用文档列出的 Next.js 或 React Router 框架模式 |
| `fe-vue-official-slots` | 新项目用 Vite、Vue Router、Pinia；要首屏 HTML 时用 Nuxt |
| `fe-angular-first-party` | v21 起新应用默认无 Zone；路由、HTTP、表单用 Angular 自己的包 |
| `fe-sveltekit-runes` | Svelte 5 用 runes，应用框架是 SvelteKit |
| `fe-react-one-slot` | 路由、服务端缓存、客户端状态、样式各留一个 |
| `fe-server-state-one-owner` | 同一份服务端列表只有一个缓存主人 |
| `fe-cross-end-one-runtime` | 浏览器、小程序、Flutter 自绘、React Native 系统视图各留一个运行时 |
| `fe-ecosystem-follows-model` | 选定更新模型后，框架、路由、客户端状态、服务端缓存跟这一套 |
| `fe-vue-data-one-slot` | Nuxt 列表走 useAsyncData；Pinia 不复制同一份 GET |
| `fe-angular-resource-not-ngrx` | GET 走 HttpClient 或 httpResource；NgRx 不是新应用默认 |
| `fe-svelte-load-not-store` | 页面数据从 load 返回；不要在 load 里写全局状态 |
| `fe-expo-router-one-nav` | 新 Expo 应用路由用 Expo Router，不要再挂第二套导航 |
| `fe-flutter-state-one-approach` | 深链用 go_router；跨页状态只留文档里的一种做法 |

对照过的页面：

- [React：创建应用](https://react.dev/learn/creating-a-react-app)、[从零搭建](https://react.dev/learn/build-a-react-app-from-scratch)、[Create React App 日落](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)
- [Vue：快速上手](https://vuejs.org/guide/quick-start)、[框架级建议](https://v3-migration.vuejs.org/recommendations)、[Nuxt 简介](https://nuxt.com/docs/getting-started/introduction)
- [Angular：Zoneless](https://angular.dev/guide/zoneless)、[HttpClient](https://angular.dev/guide/http/setup)、[Router](https://angular.dev/guide/routing/router-reference)
- [Svelte：Runes](https://svelte.dev/docs/svelte/what-are-runes)、[SvelteKit](https://svelte.dev/docs/kit/introduction)
- [Astro：岛屿](https://docs.astro.build/en/concepts/islands/)、[TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)、[Pinia](https://pinia.vuejs.org/introduction.html)
- [Angular：httpResource](https://angular.dev/guide/http/http-resource)、[SvelteKit：load](https://svelte.dev/docs/kit/load)、[Expo Router](https://docs.expo.dev/router/introduction/)、[Flutter：状态管理](https://docs.flutter.dev/data-and-backend/state-mgmt/options)
