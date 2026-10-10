/* Frontend 57: RN / Flutter / UniApp·Taro / 微前端是什么。 */
const COVERAGE_FRONTEND_57 = [
  {
    track:'frontend', group:'React Native', id:'rn-what-it-is',
    title:'React Native 用 React 组件画出平台原生界面',
    prompt:'同一套 React 组件，在手机上落到的是网页，还是平台自己的视图？',
    promptAnswer:'落到平台自己的视图。React Native 用 React 组件描述界面，再画成 iOS、Android 上的原生视图。',
    core:'React Native 是用 React 做原生应用的框架。组件仍是返回标记的函数，但这份标记不是 HTML。框架把它画成各平台的原生视图：iOS 上常见的是 UIView 一类，Android 上是 View 一类。文档写的是 Learn once, write anywhere：同一套 React，不是把一份网页塞进 WebView。容器和文字用 View、Text，见 `rn-view-not-div`。',
    example:'一个原生文本组件：\n\n```jsx\nimport { Text, View } from "react-native";\n\nfunction Price() {\n  return (\n    <View>\n      <Text>100</Text>\n    </View>\n  );\n}\n```',
    task:'用文档里的说法说明 React Native 是什么。View 和 Text 落到的是 HTML 还是原生视图？',
    answer:'React Native 是用 React 做原生应用的框架。View 和 Text 落到平台原生视图，不是 HTML 元素。',
    keywords:'React Native native views React',
    points:['React Native 用 React 组件描述原生界面','落到的是平台视图，不是网页','View 和 Text 不是 HTML 元素'],
    deep:[
      {title:'Learn once 不是 Write once 的网页',body:'同一套组件思想可以在 iOS 和 Android 上用。样式、导航和原生模块仍要按平台核对。整页嵌网页用 WebView，那是另一条路。'},
      {title:'怎样自己验证',body:'打开 React Native 文档 Introduction，对上它用 React 创建原生应用。在示例里确认导入来自 react-native，而不是 react-dom。'},
    ],
    refs:[['React Native：Introduction','https://reactnative.dev/docs/getting-started'],['React Native：View','https://reactnative.dev/docs/view']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-enter-app',
    title:'新的原生应用从 Expo 开始',
    prompt:'文档建议新的 React Native 应用用哪一套工具创建？',
    promptAnswer:'用 Expo。它是建立在 React Native 上的框架，负责创建、运行和一部分原生能力。',
    core:'React 文档和 React Native 文档都把 Expo 列为新应用的起点。Expo 提供创建命令、开发客户端，以及常用原生模块。入口组件仍是 React 函数，只是注册到 AppRegistry 或 Expo 的入口，而不是 createRoot。手机上的导航见 `rn-navigate-not-push`。取数用 fetch，没有 document，见 `rn-fetch-not-document`。',
    example:'文档给出的创建命令：\n\n```bash\nnpx create-expo-app@latest\n```',
    task:'说明新的 React Native 应用文档建议从哪一个框架开始。入口还是不是 createRoot？',
    answer:'文档建议从 Expo 开始。入口不是浏览器里的 createRoot，而是原生应用的注册入口。',
    keywords:'Expo create-expo-app React Native',
    points:['新应用文档建议从 Expo 开始','Expo 建立在 React Native 上','入口不是 createRoot'],
    deep:[
      {title:'可以只用 React Native CLI',body:'需要自己管原生工程时，可以用社区 CLI。那是另一条创建路径，不是「不用 React Native 了」。日常新项目先走 Expo。'},
      {title:'怎样自己验证',body:'打开 React Native 的 Set up your environment，对上 Expo 作为推荐起点。再看 React 文档 Creating a React App 里的 Expo 一条。'},
    ],
    refs:[['React Native：Set up your environment','https://reactnative.dev/docs/set-up-your-environment'],['Expo：Create a project','https://docs.expo.dev/get-started/create-a-project/']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-not-webview-app',
    title:'React Native 不是把网站装进 WebView',
    prompt:'手机里已经能用 WebView 打开现有网站，还要不要 React Native？',
    promptAnswer:'要原生控件、原生导航和平台能力时才用。只是打开一个网址，用 WebView 就够，不必整页都当 React Native。',
    core:'WebView 显示的是一份网页。React Native 的 View 是原生容器，没有 DOM，也没有 CSS 选择器。样式是 StyleSheet 里的数字对象。只有某一块要嵌网址时才用 WebView，见 `rn-view-not-div`。和 Flutter 的差别是：这边组件落到平台视图，那边由引擎自己画像素，见 `flutter-what-it-is`。',
    example:'卡片用 View，帮助页才嵌网址：\n\n```jsx\n<View>\n  <Text>订单</Text>\n</View>\n<WebView source={{ uri: "https://help.example" }} />\n```',
    task:'说明 View 和 WebView 各显示什么。整页网站要不要写成 React Native？',
    answer:'View 是原生容器。WebView 显示网页。整页只是打开网址时，不必写成 React Native。',
    keywords:'React Native WebView native StyleSheet',
    points:['View 是原生容器，不是网页','WebView 只用来嵌网址','没有 DOM 和 CSS 选择器'],
    deep:[
      {title:'和浏览器分工',body:'同一套业务如果已经是网站，继续做网站。要状态栏、推送、文件系统这些平台能力，并且界面要跟系统控件一致，再进 React Native。'},
      {title:'怎样自己验证',body:'在应用里搜 document 和 className，界面文件里不应有落点。帮助页单独用 WebView，订单卡片仍是 View 和 Text。'},
    ],
    refs:[['React Native：WebView','https://github.com/react-native-webview/react-native-webview'],['React Native：Style','https://reactnative.dev/docs/style']]
  },
  {
    track:'frontend', group:'Flutter', id:'flutter-what-it-is',
    title:'Flutter 用一份 Dart 代码在多平台上自绘界面',
    prompt:'Flutter 的按钮是平台原生控件，还是引擎自己画出来的？',
    promptAnswer:'引擎自己画出来的。Flutter 用 Dart 写出 Widget，由引擎画到一块自绘表面上。',
    core:'Flutter 是用一份代码库做多平台应用的框架。界面用 Dart 写成 Widget。引擎（当前默认 Impeller）把这些 Widget 画到自己的像素表面上，不是把一个 Button 交给系统去当原生控件。没有 HTML，也没有 DOM。Widget 是什么见 `flutter-widget-not-html`。像素由谁画见 `flutter-impeller-own-pixels`。',
    example:'一个自绘文本：\n\n```dart\nclass Price extends StatelessWidget {\n  Widget build(BuildContext context) {\n    return const Text("100");\n  }\n}\n```',
    task:'用文档里的说法说明 Flutter 是什么。按钮是系统原生控件，还是引擎画出来的？语言是哪一门？',
    answer:'Flutter 是用一份代码库做多平台应用的框架。语言是 Dart。按钮由引擎画在自绘表面上，不是系统原生控件。',
    keywords:'Flutter Dart Widget Impeller',
    points:['Flutter 用一份 Dart 代码做多平台应用','界面是 Widget，由引擎自绘','不是 HTML，也不是系统原生控件'],
    deep:[
      {title:'和 React Native 的落点不同',body:'React Native 的 View 落到平台原生视图。Flutter 的 Widget 是配置，像素由引擎画。两边都可以做手机应用，不要写成同一种宿主。'},
      {title:'怎样自己验证',body:'打开 Flutter 文档 Introduction，对上 multi-platform 和 Dart。在示例里确认导入的是 package:flutter/material.dart，而不是 react-native。'},
    ],
    refs:[['Flutter：Introduction','https://docs.flutter.dev/get-started/install'],['Flutter：Widget intro','https://docs.flutter.dev/ui']]
  },
  {
    track:'frontend', group:'Flutter', id:'flutter-enter-app',
    title:'flutter create 做出可以跑起来的工程',
    prompt:'要把一份 Flutter 应用在设备上跑起来，先用哪一条命令建工程？',
    promptAnswer:'用 flutter create。它生成 Dart 工程和各平台目录。再用 flutter run 跑在连接的设备或模拟器上。',
    core:'官方入门从安装 Flutter SDK 开始，再用 flutter create 生成工程。lib/main.dart 里的 main 调用 runApp，把根 Widget 交给引擎。随后 flutter run 把它跑到连接的设备、模拟器或 Chrome。导航用 go_router 这一类包，见 `flutter-gorouter-not-named`。约束怎么往下传，见 `flutter-constraints-down`。',
    example:'创建并运行：\n\n```bash\nflutter create pay\ncd pay\nflutter run\n```',
    task:'写出创建工程和跑起来的两条命令。入口函数要把根 Widget 交给谁？',
    answer:'创建用 flutter create，跑起来用 flutter run。main 里调用 runApp，把根 Widget 交给引擎。',
    keywords:'flutter create runApp Dart',
    points:['flutter create 生成工程','runApp 把根 Widget 交给引擎','flutter run 跑到设备或模拟器'],
    deep:[
      {title:'平台目录是宿主，不是界面',body:'android/ 和 ios/ 是打包用的宿主工程。日常改的是 lib/ 里的 Dart。不要在这些目录里用 XML 布局去代替 Widget。'},
      {title:'怎样自己验证',body:'按官方 Get started 建一个工程，确认 lib/main.dart 里有 runApp。flutter run 之后设备上出现计数示例，而不是一个空的原生 Activity 布局。'},
    ],
    refs:[['Flutter：Get started','https://docs.flutter.dev/get-started/install'],['Flutter：runApp','https://api.flutter.dev/flutter/widgets/runApp.html']]
  },
  {
    track:'frontend', group:'Flutter', id:'flutter-not-html',
    title:'Flutter 没有文档树，也不是 React Native',
    prompt:'把网页里的 div 和 className 写进 build，能不能当成 Flutter 界面？',
    promptAnswer:'不能。build 返回的是 Widget。没有 div，没有 className，也没有 document。',
    core:'Flutter 的界面文件里没有 HTML 元素。build 返回新的 Widget 配置，状态在 Element 上，像素在 RenderObject 上，见 `flutter-widget-not-html`。和 React Native 比，那边 View 是原生视图，这边是自绘。跨端四套谁在画，见 `cross-four-who-paints`。',
    example:'文字写成 Text，不是 p：\n\n```dart\nColumn(\n  children: const [Text("订单号")],\n)\n```',
    task:'说明 build 返回的是什么。div 和 className 在 Flutter 里有没有落点？',
    answer:'build 返回 Widget。div 和 className 没有落点。没有 document。',
    keywords:'Flutter Widget HTML React Native',
    points:['build 返回 Widget，不是 HTML','没有 document 和 className','和 React Native 的宿主不是同一套'],
    deep:[
      {title:'主题也不是全局 CSS',body:'字体和颜色从 Theme 或构造参数走进 Widget，不会因为外层写了字号就沿一棵文档继承下去。'},
      {title:'怎样自己验证',body:'在 lib/ 里搜 div 和 className，不应有编译得过的界面用法。把 Text 改成 HTML 标签，确认分析器报错。'},
    ],
    refs:[['Flutter：Introduction to widgets','https://docs.flutter.dev/ui/widgets-intro'],['Flutter：FAQ','https://docs.flutter.dev/resources/faq']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'uniapp-what-it-is',
    title:'uni-app 用 Vue 写出一套代码，再编译到各端',
    prompt:'uni-app 的页面在源码里是哪一种文件，编译之后还是不是同一套运行时？',
    promptAnswer:'常用 Vue 的 .vue 页面。不是同一套运行时：编译器按目标端出小程序、H5 或 App 的产物。',
    core:'uni-app 是用 Vue 写一套代码、再编译到多个端的框架。新项目的页面是 .vue，运行时仍是 Vue。编译器按目标端出不同产物：H5 是网页，微信等小程序是该端的模板和脚本，App 走对应的原生容器。条件编译和页面入口见 `uniapp-pages-json-entry`、`uniapp-ifdef-stripped`。uni-app x 是另一套工程，见 `uniapp-x-uts-not-vue-page`。',
    example:'一份 Vue 页面：\n\n```vue\n<template>\n  <view>{{ price }}</view>\n</template>\n```',
    task:'说明 uni-app 是什么。源码页面常用哪一种文件？编译到各端之后运行时还一样吗？',
    answer:'uni-app 用 Vue 写一套代码再编译到各端。源码常用 .vue。各端产物的运行时不同，不是把同一份 Vue 原样塞进所有端。',
    keywords:'uni-app Vue 小程序 H5',
    points:['uni-app 用 Vue 写一套代码再编译到各端','源码页面常用 .vue','各端产物运行时不同'],
    deep:[
      {title:'标签要写成各端认识的那一套',body:'小程序里常见 view、text，不是浏览器的 div、span。框架会在编译时对上目标端。不要假设 document 在所有端都存在。'},
      {title:'怎样自己验证',body:'打开 DCloud 的 uni-app 介绍，对上 Vue 和多端。看 pages.json 里的页面路径，再分别打到 H5 和微信开发者工具，确认一份源码两套产物。'},
    ],
    refs:[['uni-app：介绍','https://uniapp.dcloud.net.cn/'],['uni-app：页面','https://uniapp.dcloud.net.cn/tutorial/page.html']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'taro-what-it-is',
    title:'Taro 用 React 写出一套代码，再编译到各端',
    prompt:'Taro 里写的 JSX，在微信小程序里直接跑 React DOM 吗？',
    promptAnswer:'不直接跑 React DOM。Taro 把 React 树桥到小程序的 setData 和模板上。',
    core:'Taro 是用 React（也可以用 Vue）写一套代码、再编译到多个端的框架。小程序端并不是浏览器。React 的更新要经过框架桥到 setData，见 `taro-react-setdata-bridge`。页面列在 app.config 里，见 `taro-pages-in-app-config`。Taro 4 的编译器选择见 `taro-4-compiler-choice`。',
    example:'一个 React 组件被编译到小程序：\n\n```jsx\nfunction Price() {\n  return <View>{price}</View>;\n}\n```',
    task:'说明 Taro 是什么。小程序端是不是 React DOM？更新要经过哪一步？',
    answer:'Taro 用 React 写一套代码再编译到各端。小程序端不是 React DOM。更新要经过框架桥到 setData。',
    keywords:'Taro React 小程序 setData',
    points:['Taro 用 React 写一套代码再编译到各端','小程序端不是 React DOM','更新要桥到 setData'],
    deep:[
      {title:'和 uni-app 的源码习惯不同',body:'uni-app 默认 Vue，Taro 默认 React。两边都是编译到各端，不是同一个运行时。层次对照见 `taro-and-uniapp-layers`。'},
      {title:'怎样自己验证',body:'打开 Taro 文档介绍，对上多端 React。在微信开发者工具里看编译产物，确认是 wxml / js，而不是一份 react-dom。'},
    ],
    refs:[['Taro：介绍','https://docs.taro.zone/docs/'],['Taro：React','https://docs.taro.zone/docs/react']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'uniapp-taro-not-same-runtime',
    title:'uni-app 和 Taro 都是编译层，不是同一种运行时',
    prompt:'两个框架都能出微信小程序，是不是选一个就等于另一个？',
    promptAnswer:'不是。源码习惯、页面配置和桥到原生或小程序的方式都不同。它们是两条编译层。',
    core:'uni-app 和 Taro 都把一份前端源码编译到小程序、H5 或 App，但源码习惯不同：一边默认 Vue 和 pages.json，一边默认 React 和 app.config。编译之后各端仍用该端的运行时。不要把它们写成「同一个跨端运行时换了个名字」。层次见 `taro-and-uniapp-layers`。原生自绘或平台视图见 Flutter、React Native。',
    example:'同一张订单页：\n\n```text\nuni-app  pages/order/order.vue   + pages.json\nTaro     pages/order/index.jsx   + app.config\n```',
    task:'说明两个框架相同的是哪一层、不同的是哪一层。它们是不是同一个运行时？',
    answer:'相同的是「源码编译到各端」。不同的是源码习惯和桥接方式。不是同一个运行时。',
    keywords:'uni-app Taro 编译 小程序',
    points:['两者都是编译到各端的框架','源码习惯分别是 Vue 和 React','各端仍用该端运行时'],
    deep:[
      {title:'不要跨框架复制页面后缀',body:'把 .vue 丢进 Taro，或把 React 页丢进 uni-app，都过不了该框架的入口配置。先认页面清单，再写组件。'},
      {title:'怎样自己验证',body:'对照两份官方介绍的「支持的端」表格。再看各自工程里的页面清单文件名字，确认不是同一套配置。'},
    ],
    refs:[['uni-app：介绍','https://uniapp.dcloud.net.cn/'],['Taro：介绍','https://docs.taro.zone/docs/']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-what-it-is',
    title:'微前端是多个可独立发布的前端，在运行时或构建时拼成一个产品',
    prompt:'把仓库拆成 src/orders 和 src/pay，算不算已经做了微前端？',
    promptAnswer:'不算。微前端要能独立构建、独立发布，再拼成一个产品。只拆目录、仍同一次发版，还不是。',
    core:'微前端（micro-frontends）是一种把前端产品拆成多个可独立构建、独立发布的应用，再在运行时或构建时组合起来的做法。webpack 的 Module Federation、single-spa、qiankun、无界和 iframe 都是组合手段，不是「拆目录」本身。动手前先写清谁独立发版，见 `mfe-when-to-split`。不必拆的情况见 `mfe-not-for-everything`。',
    example:'结算组单独构建 remote，壳应用只负责登录和导航。商品组发版时不必等结算组。',
    why:'仓库变大就被写成必须上微前端。拆完仍同一次打镜像，用户却多付了首屏和治理成本。',
    task:'用一句话说明微前端是什么。只拆目录、仍同一次发版，算不算？',
    answer:'微前端是多个可独立构建、独立发布的前端，再拼成一个产品。只拆目录、仍同一次发版，不算。',
    keywords:'micro-frontends independent deploy Module Federation',
    points:['微前端是可独立发布的多个前端再组合','拆目录本身不是微前端','组合手段和要不要拆是两件事'],
    deep:[
      {title:'先问发版，再问框架',body:'独立发版写不清时，先不要选 Module Federation 或 qiankun。选型见 `mfe-pick-by-constraint`。'},
      {title:'怎样自己验证',body:'画出最近四次发版。两个目录总是同一 commit 上线，就还不是微前端。某一目录曾单独回滚，才具备拆分信号。'},
    ],
    refs:[['webpack：Module Federation','https://webpack.js.org/concepts/module-federation/'],['single-spa：Getting started','https://single-spa.js.org/docs/getting-started-overview']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_57) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
