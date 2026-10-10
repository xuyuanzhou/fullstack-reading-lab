/* Frontend 55: React / Vue 是什么。定义课，不单开为什么。 */
const COVERAGE_FRONTEND_55 = [
  {
    track:'frontend', group:'React', id:'react-what-it-is',
    title:'React 是渲染用户界面的 JavaScript 库',
    prompt:'页面上的按钮和整页，在 React 里由什么拼起来？',
    promptAnswer:'由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。标记用 JSX 写。',
    core:'React 是用来渲染用户界面（user interface，UI）的 JavaScript 库。界面由小组件拼成：组件（component）是一段有自己的逻辑和外观的界面，小到一个按钮，大到整页。在代码里，组件是一个可以带上标记的 JavaScript 函数。这份标记用 JSX 来写。JSX 是写在 JavaScript 里、看起来像 HTML 的语法。函数怎么返回元素、组件名为什么要大写，见 `react-function-component`。',
    example:'一个组件就是一个返回标记的函数：\n\n```jsx\nfunction Price() {\n  return <p>100</p>;\n}\n```',
    task:'用文档里的说法说明 React 是什么，以及组件在代码里是哪一种函数。JSX 写在什么里面？',
    answer:'React 是用来渲染用户界面的 JavaScript 库。组件是一段有自己的逻辑和外观的界面，代码里是返回标记的函数。JSX 写在 JavaScript 里，用来表示这份标记。函数的写法见 `react-function-component`。',
    keywords:'React library component JSX user interface',
    points:['React 是渲染用户界面的 JavaScript 库','界面由组件拼成','组件是返回标记的函数，标记用 JSX 写'],
    deep:[
      {title:'库负责描述界面',body:'你交给 React 的是这一次要显示的组件。按钮上的字、整页的结构，都是组件返回的标记。样式文件怎么引进工程，库没有规定，由构建工具或框架决定。'},
      {title:'怎样自己验证',body:'打开 React 文档 Describing the UI，对上第一句：它是渲染用户界面的 JavaScript 库，界面由组件组成。再看 Quick Start 里的函数，确认组件就是返回标记的函数。'},
    ],
    refs:[['React：Describing the UI','https://react.dev/learn/describing-the-ui'],['React：Quick Start','https://react.dev/learn']]
  },
  {
    track:'frontend', group:'React', id:'react-dom-mount',
    title:'react-dom 把组件放进已有的页面节点',
    prompt:'组件写好之后，怎样出现在浏览器页面上已经存在的那个节点里？',
    promptAnswer:'从 react-dom/client 取出 createRoot，对这个节点建根，再调用 root.render，把组件画进节点内部。',
    core:'浏览器里显示组件，用的是 react-dom。createRoot(domNode) 给页面上已经存在的一个 DOM 节点建立根（root）。随后 root.render 把组件画进这个节点内部，React 接管节点里面的 DOM。整页都由 React 做的应用，通常只调用一次 createRoot。页面上只有几块用 React，就可以各建一个根。组件函数本身怎么写，见 `react-what-it-is`。',
    example:'对页面上的 root 建根再渲染：\n\n```jsx\nimport { createRoot } from "react-dom/client";\nimport App from "./App.js";\n\nconst domNode = document.getElementById("root");\nconst root = createRoot(domNode);\nroot.render(<App />);\n```',
    task:'指出 createRoot 的参数是页面上的哪一种东西，root.render 把组件画到哪里。整页应用通常调用几次 createRoot？',
    answer:'参数是页面上已经存在的一个 DOM 节点。root.render 把组件画进这个节点内部，React 接管节点里面的 DOM。整页应用通常只调用一次 createRoot。',
    keywords:'react-dom createRoot root.render DOM',
    since:'React 18',
    points:['createRoot 给已有的 DOM 节点建立根','root.render 把组件画进该节点内部','整页应用通常只调用一次 createRoot'],
    deep:[
      {title:'react 和 react-dom 是两个包',body:'react 提供组件和状态。react-dom 负责浏览器里的这个根。入口文件从 react-dom/client 引入 createRoot，再从 react 引入你的组件。'},
      {title:'怎样自己验证',body:'在 HTML 里放一个 id 为 root 的空元素，按上面三行建根并 render。确认内容出现在这个元素内部。再把 getElementById 的 id 改成页面上不存在的名字，确认建根失败。'},
    ],
    refs:[['React：createRoot','https://react.dev/reference/react-dom/client/createRoot'],['React：Describing the UI','https://react.dev/learn/describing-the-ui']]
  },
  {
    track:'frontend', group:'React', id:'react-app-around-library',
    title:'新的网站从框架开始，react 包负责界面',
    prompt:'只装了 react 和 react-dom，页面地址和向服务器取数要自己找哪一类工具？',
    promptAnswer:'文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。手机原生界面用 Expo。',
    core:'react 和 react-dom 负责组件，以及把组件放进页面节点。文档建议新的网站或应用从框架开始。它列出的是 Next.js 的 App Router，以及可以配上 Vite 的 React Router 框架模式。React Router 是 React 用得最多的路由库。手机上的原生界面用 Expo，它是基于 React Native 的框架。从头自己搭可以，路由、取数这些就要自己选，等于自己做框架。地址上的数据见 `react-router-loader`，服务器返回的列表见 `query-server-state`，原生视图见 `rn-view-not-div`。',
    example:'新项目文档给出的两条命令：\n\n```bash\nnpx create-next-app@latest\nnpx create-react-router@latest\n```',
    task:'说明 react 包负责什么。新的网站文档建议从哪两个名字开始？手机原生界面用哪一个框架？',
    answer:'react 和 react-dom 负责组件和把组件放进页面节点。新的网站文档建议从 Next.js 或 React Router 框架模式开始。手机原生界面用 Expo。只装 react 时，路由和取数要另外选定。',
    keywords:'Next.js React Router Expo React Native framework',
    points:['react 与 react-dom 负责组件和页面节点','新应用文档建议从 Next.js 或 React Router 开始','手机原生界面用基于 React Native 的 Expo'],
    deep:[
      {title:'框架可以只在浏览器里跑',body:'这些框架都支持在浏览器里渲染，也能放到静态托管上。需要时再按路由打开服务端渲染。选框架不是为了必须准备一台渲染用的服务器。'},
      {title:'怎样自己验证',body:'打开 React 文档 Creating a React App，对上开头的建议，以及 Next.js、React Router、Expo 三个名字。再在自己的 package.json 里看有没有 react-router 或 next；只有 react 和 react-dom 时，地址切换还没有对应的库。'},
    ],
    refs:[['React：Creating a React App','https://react.dev/learn/start-a-new-react-project'],['React Router：安装','https://reactrouter.com/start/framework/installation']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-what-it-is',
    title:'Vue 是构建用户界面的 JavaScript 框架',
    prompt:'Vue 用什么描述要显示的 HTML，数据变了之后谁去改 DOM？',
    promptAnswer:'模板按当前的 JavaScript 状态描述要输出的 HTML。Vue 跟踪这些状态，状态变了就更新 DOM。',
    core:'Vue 是用来构建用户界面的 JavaScript 框架。它建立在 HTML、CSS 和 JavaScript 上。文档写明两件核心能力。声明式渲染（declarative rendering）：用模板语法，按当前的 JavaScript 状态描述要输出的 HTML。响应式（reactivity）：Vue 跟踪这些状态，状态变了就更新 DOM。模板和脚本放在同一个 .vue 文件里的写法见 `vue-sfc-template`。脚本里怎样改一个会通知模板的值，见 `vue-ref-value`。',
    example:'模板按状态描述按钮上的字：\n\n```html\n<div id="app">\n  <button>Count is: {{ count }}</button>\n</div>\n```',
    task:'用文档里的说法说明 Vue 是什么。声明式渲染和响应式各做哪一件事？',
    answer:'Vue 是用来构建用户界面的 JavaScript 框架，建立在 HTML、CSS 和 JavaScript 上。声明式渲染用模板按当前状态描述要输出的 HTML。响应式在状态变化时更新 DOM。',
    keywords:'Vue framework declarative rendering reactivity',
    points:['Vue 是构建用户界面的 JavaScript 框架','模板按当前状态描述要输出的 HTML','状态变化时 Vue 更新 DOM'],
    deep:[
      {title:'同一个核心，两种写法',body:'组件可以用选项式 API，把数据放进 data；也可以用组合式 API，在 script setup 里声明。两套写法下面是同一套响应式。这一课先记住框架在做什么，写法见后面的单文件组件。'},
      {title:'怎样自己验证',body:'打开 Vue 文档 Introduction 的 What is Vue，对上框架定义，以及 Declarative Rendering 和 Reactivity 两条。页面上的数字应来自状态，而不是写死在 HTML 里的一句话。'},
    ],
    refs:[['Vue：Introduction','https://vuejs.org/guide/introduction.html'],['Vue：Template Syntax','https://vuejs.org/guide/essentials/template-syntax.html']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-create-app-mount',
    title:'createApp 把应用挂到已有的页面节点',
    prompt:'一个 Vue 应用挂到页面上的哪一块？',
    promptAnswer:'createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。之后这一块内部由 Vue 更新。',
    core:'Vue 应用从 createApp 开始。createApp(根组件) 返回应用实例，mount 把它挂到页面上已经存在的一个元素。选择器写成 "#app" 时，页面里要先有 id 为 app 的元素。挂上之后，Vue 更新的是这个元素内部。模板里的插值怎样读到状态，见 `vue-what-it-is`。',
    example:'创建应用并挂到 #app：\n\n```js\nimport { createApp } from "vue";\nimport App from "./App.vue";\n\ncreateApp(App).mount("#app");\n```\n\n```html\n<div id="app"></div>\n```',
    task:'说明 createApp 和 mount 各做一步什么。#app 必须先出现在哪里？',
    answer:'createApp 创建应用实例。mount 把应用挂到页面上已经存在的元素。#app 必须先写在 HTML 里。挂上之后，Vue 更新这个元素内部。',
    keywords:'Vue createApp mount application',
    since:'Vue 3',
    points:['createApp 创建应用实例','mount 挂到页面上已有的元素','Vue 更新的是这个元素内部'],
    deep:[
      {title:'入口和组件不是同一个文件',body:'main.js 里调用 createApp 和 mount。根组件放在 App.vue。入口负责挂到哪个节点，组件负责这个节点里显示什么。'},
      {title:'怎样自己验证',body:'HTML 里放 div#app，入口调用 createApp(App).mount("#app")。确认组件出现在这个 div 里面。把选择器改成页面上没有的 id，确认挂载没有落到别的元素上。'},
    ],
    refs:[['Vue：createApp','https://vuejs.org/api/application.html#createapp'],['Vue：Introduction','https://vuejs.org/guide/introduction.html']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-app-around-core',
    title:'换地址和跨页状态用 Vue 旁边的库',
    prompt:'换页面地址、多个页面共用的状态、正文要出现在服务端发出的 HTML 里，各用什么？',
    promptAnswer:'地址用 Vue Router，多个页面共用的状态用 Pinia。正文要出现在服务端发出的 HTML 里，用 Nuxt 这一类框架。vue 包负责组件、模板和响应式。',
    core:'vue 包负责组件、模板和响应式。单页应用里换地址、又不用整页重新加载，用 Vue Router。多个页面都要、而且会在客户端改的状态，用 Pinia。正文要出现在服务端发出的 HTML 里，用建立在 Vue 之上的框架，常见的是 Nuxt。文档站可以用 VitePress。路由参数变了组件会不会重建，见 `vue-router-reuse`。Pinia 和 Vuex 怎么选，见 `pinia-not-vuex`。首屏 HTML 里的数据见 `nuxt-payload`。',
    example:'单页应用里常见的三个依赖：\n\n```json\n{\n  "dependencies": {\n    "vue": "^3.5.0",\n    "vue-router": "^4.5.0",\n    "pinia": "^2.3.0"\n  }\n}\n```',
    task:'指出 vue 包负责的三件事。换地址、跨页状态、服务端 HTML 各对应哪个名字？',
    answer:'vue 包负责组件、模板和响应式。换地址用 Vue Router，跨页状态用 Pinia，服务端 HTML 用 Nuxt 这一类框架。文档站可以用 VitePress。',
    keywords:'Vue Router Pinia Nuxt VitePress',
    points:['vue 包负责组件、模板和响应式','换地址用 Vue Router，跨页状态用 Pinia','服务端 HTML 用 Nuxt 这一类框架'],
    deep:[
      {title:'可以先只挂一块到现成页面上',body:'后端已经输出大部分 HTML 时，可以用独立脚本把 Vue 挂到页面的一块上，不必先上路由和 Nuxt。应用要自己管整页导航时，再加 Vue Router。'},
      {title:'怎样自己验证',body:'打开 Vue 文档 Ways of Using Vue 的 SPA 和 Fullstack / SSR 两节，对上客户端路由和更高层框架。再看 package.json：只有 vue 时，地址栏变化还没有 Vue Router。'},
    ],
    refs:[['Vue：Ways of Using Vue','https://vuejs.org/guide/extras/ways-of-using-vue.html'],['Vue Router：入门','https://router.vuejs.org/guide/']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_55) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
