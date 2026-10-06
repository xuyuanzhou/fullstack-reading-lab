# 资料核验记录（前端批次 18）

本批是 React Native 题干、机制和答案的加细，id 未改。不把 View 写成 DOM，也不把 navigate 写成 react-native 包里的 API。

| 课程 | 说法 |
| --- | --- |
| `rn-view-not-div` | View / Text 是原生视图，样式是 StyleSheet 数字对象；嵌网页才用 WebView |
| `rn-text-not-under-view` | 文本节点直接放 View 下会抛异常；fontFamily 只在 Text 套 Text 时继承 |
| `rn-flex-defaults` | View 默认就是 flex 容器；flexDirection 默认 column，flexShrink 默认 0，flex 只接受一个数字 |
| `rn-pressable-not-click` | 按压走 Pressable 的 onPressIn / onPress；View 的 onClick 不是触摸路径 |
| `rn-flatlist-window` | FlatList 只挂渲染窗口；行卸载后内部 state 丢掉；keyExtractor 用稳定 id |
| `rn-image-needs-size` | 网络图和 data 图必须写宽高；onLoad 成功不等于已经占住矩形 |
| `rn-dimensions-not-cached` | 不要把 Dimensions.get 存进模块常量；旋转后用 useWindowDimensions |
| `rn-platform-extension` | 整份实现不同拆 .ios.js / .android.js；一个数值才用 Platform.select |
| `rn-hermes-default` | 默认引擎是 Hermes；换 JSC 是退出；浏览器引擎不是应用运行时 |
| `rn-jsi-not-json-bridge` | 0.76 起 JSI 默认；setState 之后仍要渲染、提交、挂载 |
| `rn-navigate-not-push` | 已在该屏时 navigate 不压栈也不换 params；push 才加层；包是 React Navigation |
| `rn-fetch-not-document` | fetch 在补齐列表里，document 和 localStorage 不在 |

对照过的页面：

- [核心组件](https://reactnative.dev/docs/intro-react)、[View](https://reactnative.dev/docs/view)、[Text](https://reactnative.dev/docs/text)、[Flexbox](https://reactnative.dev/docs/flexbox)、[Pressable](https://reactnative.dev/docs/pressable)
- [FlatList](https://reactnative.dev/docs/flatlist)、[Image](https://reactnative.dev/docs/image)、[useWindowDimensions](https://reactnative.dev/docs/usewindowdimensions)、[平台相关代码](https://reactnative.dev/docs/platform-specific-code)
- [Hermes](https://reactnative.dev/docs/hermes)、[JavaScript 环境](https://reactnative.dev/docs/javascript-environment)、[新架构](https://reactnative.dev/architecture/landing-page)
- [React Navigation：跳转](https://reactnavigation.org/docs/navigating)
