# 资料核验记录（前端批次 17）

本批按官网现行写法新开「UniApp 与 Taro」，不把旧的 Vue 2 工程或 Taro 1/2 的 Nerv 入口写成现在的默认。

| 课程 | 说法 |
| --- | --- |
| `uniapp-x-uts-not-vue-page` | uni-app 新项目用 Vue 3 的 .vue；uni-app x 用 uvue/uts，Android 编成 Kotlin，不能混进旧 vue 页面 |
| `uniapp-pages-json-entry` | 页面登记在 pages.json，第一项是冷启动页；navigateTo 的 query 是字符串；tabBar 页用 switchTab |
| `uniapp-onload-vs-onshow` | onLoad 收一次字符串 query，返回只再走 onShow；子组件用 onPageShow |
| `uniapp-ifdef-stripped` | #ifdef 在编译期删除源码，宏单独成行；运行时 if 仍会把调用打进包 |
| `taro-react-setdata-bridge` | React 提交模拟 DOM 后还要 setData 到静态 wxml；选择器查询等 onReady |
| `taro-pages-in-app-config` | pages 在 app.config；函数组件用 useLoad / useDidShow，不是再走一次 query |
| `taro-4-compiler-choice` | Taro 4 的 framework 和 compiler 是两项；Vite 打 weapp 仍是四件套整包 |
| `taro-and-uniapp-layers` | 打不开看页面数组；返回不刷新分别看 onShow 与 useDidShow 加 setData |

对照过的页面：

- [uni-app x 编译器](https://doc.dcloud.net.cn/uni-app-x/compiler/)、[条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html)、[pages.json](https://uniapp.dcloud.net.cn/collocation/pages.html)、[页面](https://uniapp.dcloud.net.cn/tutorial/page.html)、[Vue3 组合式 API](https://uniapp.dcloud.net.cn/tutorial/vue3-composition-api.html)
- [Taro 全局配置](https://docs.taro.zone/docs/app-config)、[Hooks](https://docs.taro.zone/docs/hooks)、[React 总体](https://docs.taro.zone/docs/react-overall)、[实现原理](https://docs.taro.zone/docs/implement-note)、[编译配置](https://docs.taro.zone/docs/config)

Taro 发布线核对时见到 4.2.0（2026-04）。课里写 Taro 4，不把补丁号写成必须背的版本。
