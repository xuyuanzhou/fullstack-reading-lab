# 资料核验记录（前端批次 20）

本批按 Flutter、React Native、Taro、uni-app 的官网现行写法，新开 Flutter，并对照四套的绘制和宿主。不把 Impeller 写成 Web 的现行引擎，也不把小程序页面表写成 Flutter 路由。课程源码在 `coverage-frontend-23.js`。`coverage-frontend-20.js` 是技术选型。

| 课程 | 说法 |
| --- | --- |
| `flutter-widget-not-html` | Widget 是配置，状态在 Element，绘制在 RenderObject；文字用 Text |
| `flutter-impeller-own-pixels` | iOS 只用 Impeller；Android API 29+ 默认 Impeller，否则引擎退回 OpenGL；Web 仍是 Skia |
| `flutter-constraints-down` | Column 给 ListView 无界高度会报 Vertical viewport was given unbounded height；Expanded 分有限剩余高度 |
| `flutter-setstate-rebuilds` | setState 回调同步改字段并标脏，build 在随后的帧 |
| `flutter-gorouter-not-named` | 命名路由接深链会再 push；同一路径用 context.go |
| `cross-four-who-paints` | RN 平台视图还要提交挂载；Flutter 自绘等下一帧 build；Taro 等 setData |
| `cross-four-where-it-fits` | 打不开和返回不刷新各查页面表、go_router、React Navigation、onShow / useDidShow |

对照过的页面：

- [Flutter：Widget 简介](https://docs.flutter.dev/ui/widgets-intro)、[Impeller](https://docs.flutter.dev/perf/impeller)、[理解约束](https://docs.flutter.dev/ui/layout/constraints)、[常见错误](https://docs.flutter.dev/testing/common-errors)、[导航](https://docs.flutter.dev/ui/navigation)
- [React Native：核心组件](https://reactnative.dev/docs/intro-react)
- [Taro：全局配置](https://docs.taro.zone/docs/app-config)、[uni-app：pages.json](https://uniapp.dcloud.net.cn/collocation/pages.html)
