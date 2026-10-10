/* Frontend 58: 安全一课 + React/Vue 生态与工程实践章旨。 */
const COVERAGE_FRONTEND_58 = [
  {
    track:'frontend', group:'安全', id:'browser-security-what',
    title:'浏览器安全管的是谁能读凭证、谁能跑脚本',
    prompt:'Cookie、XSS 和 CSP 这几课，共同在回答哪一件事？',
    promptAnswer:'谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。',
    core:'浏览器安全这一章不讲操作系统补丁，而讲页面里的两问：谁能读到 Cookie 或令牌，谁能在页面里执行脚本。Cookie 怎么当凭证，见 `cookie-credential`。会话和 JWT 的差别见 `auth-session-vs-jwt`。别人的站点怎样借你的登录态发请求，见 `csrf-boundary`。不信任的字符串进了页面，见 `xss`。限制脚本从哪来，见 `csp-script-src`。',
    example:'三句对照：\n\n```text\nCookie  HttpOnly  脚本读不到凭证\n同源     别人的站点不能读你的文档\nCSP      页面只能跑你允许的脚本\n```',
    task:'写出这一章共同回答的两问。HttpOnly、同源、CSP 各挡住哪一问？',
    answer:'两问是谁能读凭证、谁能跑脚本。HttpOnly 挡住脚本读凭证。同源挡住别人读你的文档。CSP 限制脚本从哪来。',
    keywords:'Cookie XSS CSP credential script',
    points:['浏览器安全回答谁读凭证、谁跑脚本','Cookie 属性和同源管凭证','CSP 限制脚本从哪来'],
    deep:[
      {title:'构建时写进前端的值都是公开的',body:'VITE_ 这类前缀会进浏览器，见 `client-env-public`。密钥不能靠「藏在前端代码里」保密。'},
      {title:'怎样自己验证',body:'打开开发工具 Application 看 Cookie 是否 HttpOnly。再看一份会执行的脚本，对照 CSP 的 script-src 是否允许它的来源。'},
    ],
    refs:[['MDN：Cookie','https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies'],['MDN：Content Security Policy','https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP']]
  },
  {
    track:'frontend', group:'React 生态', id:'react-eco-chapter-aim',
    title:'React 生态章回答地址、客户端状态和服务器状态各放哪',
    prompt:'react 包本身不管地址和取数，这一章补的是哪三类工具？',
    promptAnswer:'补路由、客户端状态和服务器状态。react 包只负责组件和把组件放进页面。',
    core:'react 与 react-dom 负责组件和页面节点，见 `react-what-it-is`。这一章补三块旁边的工具。地址和渲染前取数用 React Router，见 `react-router-loader`。客户端界面状态和服务器返回的列表不是同一个家，见 `state-kind-picks-home`、`query-server-state`。不要在这一章里重做技术选型对照。',
    example:'三句话：\n\n```text\n地址    React Router\n界面状态  useState / reducer\n列表数据  TanStack Query 这一类缓存\n```',
    task:'说明 react 包不管哪两件事。这一章的路由、界面状态、服务器列表各指向哪一类工具？',
    answer:'react 包不管地址和向服务器取数。路由用 React Router，界面状态用组件状态或 reducer，服务器列表用 Query 这一类缓存。',
    keywords:'React Router server state TanStack Query',
    points:['react 包不管地址和取数','路由用 React Router','服务器列表和界面状态不是同一个家'],
    deep:[
      {title:'先认模式再抄 loader',body:'loader 只在数据模式和框架模式里生效，见 `rr-mode-gates-data`。入口仍是 BrowserRouter 时，先换入口，不要先改 fetch。'},
      {title:'怎样自己验证',body:'打开 package.json。只有 react 和 react-dom 时，地址切换还没有对应的库。有 react-router 或 @tanstack/react-query 时，回到对应的一课。'},
    ],
    refs:[['React Router：安装','https://reactrouter.com/start/framework/installation'],['TanStack Query：Overview','https://tanstack.com/query/latest/docs/framework/react/overview']]
  },
  {
    track:'frontend', group:'Vue 生态', id:'vue-eco-chapter-aim',
    title:'Vue 生态章回答换地址、跨页状态和首屏数据各用谁',
    prompt:'vue 包负责组件和响应式，换地址和跨页状态要去哪一章？',
    promptAnswer:'去这一章。换地址用 Vue Router，跨页状态用 Pinia，首屏 HTML 里的数据常见于 Nuxt。',
    core:'vue 包负责组件、模板和响应式，见 `vue-what-it-is`。这一章展开旁边的库。路由复用与守卫见 `vue-router-reuse`、`vue-router-guard`。Pinia 和 Vuex 怎么选见 `pinia-not-vuex`。Nuxt 随首屏交给浏览器的数据见 `nuxt-payload`。',
    example:'三个依赖各管一件事：\n\n```json\n{\n  "vue-router": "地址",\n  "pinia": "跨页状态",\n  "nuxt": "首屏 HTML 里的数据"\n}\n```',
    task:'指出 vue 包负责什么。换地址、跨页状态、首屏 HTML 数据各用哪个名字？',
    answer:'vue 包负责组件、模板和响应式。换地址用 Vue Router，跨页状态用 Pinia，首屏 HTML 数据常见于 Nuxt。',
    keywords:'Vue Router Pinia Nuxt',
    points:['vue 包不管地址和跨页状态','换地址用 Vue Router','跨页状态用 Pinia，首屏数据常见于 Nuxt'],
    deep:[
      {title:'可以先只挂一块',body:'后端已经输出大部分 HTML 时，不必先上路由和 Nuxt。应用要自己管整页导航时，再进这一章。'},
      {title:'怎样自己验证',body:'看 package.json 有没有 vue-router 或 pinia。只有 vue 时，地址栏变化还没有对应的库。'},
    ],
    refs:[['Vue Router：入门','https://router.vuejs.org/guide/'],['Pinia：Introduction','https://pinia.vuejs.org/introduction.html']]
  },
  {
    track:'frontend', group:'工程实践', id:'fe-eng-chapter-aim',
    title:'前端工程实践章回答构建、度量和发布各停在哪一层',
    prompt:'页面慢或发布失败时，这一章先让你分清哪三件事？',
    promptAnswer:'构建怎样拆包、用户看见的指标是什么、发布和密钥停在哪一层。不要先换框架。',
    core:'这一章不教新的界面库。构建看模块图和拆包，见 `vite-module-graph`、`build-code-splitting`。用户看见的快慢用 Web Vitals，见 `web-vitals`。慢在哪一层见 `fe-slow-page-where`。环境变量进不进浏览器见 `vite-env-client-prefix`。CI 不能只看构建通过，见 `ci-gate-not-only-build`。',
    example:'三句：\n\n```text\n构建   模块图和拆包\n度量   LCP / INP / CLS\n发布   环境变量前缀和 CI 门禁\n```',
    task:'说明这一章不回答哪一类问题。构建、用户指标、发布各回到哪一类课？',
    answer:'不回答该用 React 还是 Vue。构建回模块图和拆包，用户指标回 Web Vitals，发布回环境变量和 CI 门禁。',
    keywords:'Vite Web Vitals CI sourcemap',
    points:['这一章不换界面库','构建看模块图和拆包','用户指标用 Web Vitals，发布看门禁'],
    deep:[
      {title:'先定位再调',body:'同一慢页可能在网络、渲染或脚本。先看 `fe-slow-page-where`，再只调一层，见 `fe-tune-one-layer`。'},
      {title:'怎样自己验证',body:'打开一次构建的模块图或统计，确认最大的包从哪来。再用开发工具 Performance 对上 LCP 元素，而不是先换框架。'},
    ],
    refs:[['Vite：Features','https://vite.dev/guide/features.html'],['web.dev：Web Vitals','https://web.dev/articles/vitals']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_58) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
