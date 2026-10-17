/** 由 scripts/build-drill-multi.mjs 生成。正确项是同一课的结论，至少两项。 */
import type { DrillQuestion } from './drillBank.ts'

export const MULTI_COURSES = [
  {
    "id": "jvm",
    "title": "JVM",
    "lead": "先分清栈上的帧、堆上的对象，以及这次停顿落在哪一次回收。"
  },
  {
    "id": "conc",
    "title": "并发",
    "lead": "先写清这次谁先看到写入，再谈锁、池和可见性。"
  },
  {
    "id": "cache",
    "title": "缓存",
    "lead": "权威在数据库。缓存只保留这次读得到、删得掉的那一份。"
  },
  {
    "id": "nginx",
    "title": "Nginx",
    "lead": "先分清这次是在等上游，还是在本机把请求转走。"
  },
  {
    "id": "gateway",
    "title": "网关",
    "lead": "超时从外到内变短。网关先断开时，里面的事务可能还在提交。"
  },
  {
    "id": "mq",
    "title": "消息队列",
    "lead": "先写清这条消息会到几次，失败后留在哪。"
  },
  {
    "id": "sca",
    "title": "Spring Cloud Alibaba",
    "lead": "注册、配置和限流各看这一次调用，不并成一个超时。"
  },
  {
    "id": "dist",
    "title": "分布式与高并发",
    "lead": "先写清这一次不变量落在哪一个库，再谈拆开之后怎么对上同一次事实。"
  },
  {
    "id": "ship",
    "title": "交付与运行",
    "lead": "镜像、流水线和这次发布要看见的失败，先分开再谈上线。"
  },
  {
    "id": "test",
    "title": "测试",
    "lead": "一道断言锁住一种看得见的结果。替身库证明不了生产引擎。"
  },
  {
    "id": "work",
    "title": "工程实践",
    "lead": "这次提交、这次排障和这次协作，先写清看见了什么。"
  }
] as const

export const MULTI_POINTS = [
  {
    "id": "mx-js-what-it-is",
    "courseId": "lang",
    "title": "JavaScript 是给网页加行为的编程语言",
    "lessonId": "js-what-it-is",
    "summary": "它是网页里用来写行为的编程语言。"
  },
  {
    "id": "mx-js-run-in-page",
    "courseId": "lang",
    "title": "脚本通过 script 进入已经打开的文档",
    "lessonId": "js-run-in-page",
    "summary": "写在 script 元素里，或用 src 指向一个 .js 文件。"
  },
  {
    "id": "mx-js-not-java-around",
    "courseId": "lang",
    "title": "JavaScript 不是 Java，旁边是 HTML…",
    "lessonId": "js-not-java-around",
    "summary": "JavaScript 和 Java 是两门语言。"
  },
  {
    "id": "mx-js-value-kinds",
    "courseId": "lang",
    "title": "值分成原始值和对象，typeof 报告大类",
    "lessonId": "js-value-kinds",
    "summary": "原始值是 undefined、null、boolean、number、bigint、string、symbol。"
  },
  {
    "id": "mx-js-let-const-decl",
    "courseId": "lang",
    "title": "let 可以再赋值，const 不能把名字指到别处",
    "lessonId": "js-let-const-decl",
    "summary": "名字不能再指向别的值就用 const。"
  },
  {
    "id": "mx-js-array-grows",
    "courseId": "lang",
    "title": "数组按下标存放值，length 会随 push 变大",
    "lessonId": "js-array-grows",
    "summary": "push 把元素加到末尾并增大 length。"
  },
  {
    "id": "mx-js-object-property",
    "courseId": "lang",
    "title": "对象用属性名存放值，点号和方括号都能读",
    "lessonId": "js-object-property",
    "summary": "点号读取标识符属性，方括号用表达式当属性名。"
  },
  {
    "id": "mx-js-function-return",
    "courseId": "lang",
    "title": "function 划出一段可调用的代码，return …",
    "lessonId": "js-function-return",
    "summary": "调用时圆括号里的值按顺序对上参数。"
  },
  {
    "id": "mx-js-for-while-break",
    "courseId": "lang",
    "title": "while 和 for 重复一块代码，break 离开…",
    "lessonId": "js-for-while-break",
    "summary": "for 或 while 在条件为真时重复。"
  },
  {
    "id": "mx-js-try-catch-throw",
    "courseId": "lang",
    "title": "throw 抛出一个值，catch 接住它",
    "lessonId": "js-try-catch-throw",
    "summary": "throw 抛出一个值，通常是 Error。"
  },
  {
    "id": "mx-js-switch-strict",
    "courseId": "lang",
    "title": "switch 用严格相等匹配，没有 break 会继续…",
    "lessonId": "js-switch-strict",
    "summary": "switch 用 === 匹配。"
  },
  {
    "id": "mx-es6-const-binding",
    "courseId": "lang",
    "title": "const 锁住的是绑定，对象里的字段仍能改",
    "lessonId": "es6-const-binding",
    "summary": "const 管的是绑定不能换目标，不冻结对象字段。"
  },
  {
    "id": "mx-es6-destructure-copies",
    "courseId": "lang",
    "title": "解构取出的是当时的值，缺省才用默认值",
    "lessonId": "es6-destructure-copies",
    "summary": "解构出的基本类型是拷贝；对象/数组取出的是同一引用。"
  },
  {
    "id": "mx-js-scope-tdz",
    "courseId": "lang",
    "title": "作用域和暂时性死区",
    "lessonId": "js-scope-tdz",
    "summary": "let/const 有暂时性死区，声明前读取抛错。"
  },
  {
    "id": "mx-js-class-extends-super",
    "courseId": "lang",
    "title": "extends 接上原型链，构造里先 super 再碰…",
    "lessonId": "js-class-extends-super",
    "summary": "子类构造必须先 super 再碰 this。"
  },
  {
    "id": "mx-es6-symbol-key",
    "courseId": "lang",
    "title": "Symbol 是不会和字符串键撞名的键",
    "lessonId": "es6-symbol-key",
    "summary": "Symbol 键互不相等，Object.keys 看不见。"
  },
  {
    "id": "mx-js-optional-chaining",
    "courseId": "lang",
    "title": "可选链 ?. 只短路属性访问，不吞掉业务错误",
    "lessonId": "js-optional-chaining",
    "summary": "?. 只在中间为 null/undefined 时短路。"
  },
  {
    "id": "mx-eventloop",
    "courseId": "lang",
    "title": "事件循环与微任务",
    "lessonId": "eventloop",
    "summary": "微任务在同步之后、宏任务之前清空。"
  },
  {
    "id": "mx-js-microtask-vs-macrotask",
    "courseId": "lang",
    "title": "then 是微任务，setTimeout 是后续任务，…",
    "lessonId": "js-microtask-vs-macrotask",
    "summary": "两者都叫异步但分属微任务与宏任务队列。"
  },
  {
    "id": "mx-js-iteration-protocol",
    "courseId": "lang",
    "title": "for-of 走的是可迭代协议，不是下标从 0 数到 …",
    "lessonId": "js-iteration-protocol",
    "summary": "能 for-of 的对象要实现迭代器方法。"
  },
  {
    "id": "mx-ts-what-it-is",
    "courseId": "lang",
    "title": "TypeScript 是带类型语法的 JavaScri…",
    "lessonId": "ts-what-it-is",
    "summary": "它是带类型语法的 JavaScript。"
  },
  {
    "id": "mx-ts-compile-to-js",
    "courseId": "lang",
    "title": "tsc 把 TypeScript 编译成 JavaSc…",
    "lessonId": "ts-compile-to-js",
    "summary": "执行的是 JavaScript。"
  },
  {
    "id": "mx-ts-type-annotation",
    "courseId": "lang",
    "title": "冒号后面写类型，编译器按它检查赋值",
    "lessonId": "ts-type-annotation",
    "summary": "在名字后面写 : number。"
  },
  {
    "id": "mx-ts-object-array-type",
    "courseId": "lang",
    "title": "对象类型写出字段，数组类型写出元素",
    "lessonId": "ts-object-array-type",
    "summary": "对象写成 { amount: number }。"
  },
  {
    "id": "mx-ts-union-annotation",
    "courseId": "lang",
    "title": "竖线表示值可以是列出的类型之一",
    "lessonId": "ts-union-annotation",
    "summary": "写成 number | null。"
  },
  {
    "id": "mx-ts-satisfies",
    "courseId": "lang",
    "title": "satisfies 核对形状，但不把字面量放宽成宽类型…",
    "lessonId": "ts-satisfies",
    "summary": "satisfies 核对类型又保留字面量键。"
  },
  {
    "id": "mx-ts-structural",
    "courseId": "lang",
    "title": "结构类型与多余属性检查",
    "lessonId": "ts-structural",
    "summary": "TypeScript 是结构类型。"
  },
  {
    "id": "mx-ts-utility-types",
    "courseId": "lang",
    "title": "Partial、Pick、Omit 是改形状，不是改运…",
    "lessonId": "ts-utility-types",
    "summary": "Partial 会让所有键可选。"
  },
  {
    "id": "mx-browser-not-node",
    "courseId": "browser",
    "title": "浏览器里有文档和窗口，Node.js 里没有",
    "lessonId": "browser-not-node",
    "summary": "Node.js 没有窗口，也没有文档。"
  },
  {
    "id": "mx-dom-event-flow",
    "courseId": "browser",
    "title": "事件先捕获，再到达目标，然后冒泡",
    "lessonId": "dom-event-flow",
    "summary": "祖先上的捕获监听最先执行，接着是目标上的监听，最后才是祖先和文档上的冒泡监听。"
  },
  {
    "id": "mx-html-dialog-modal",
    "courseId": "browser",
    "title": "模态对话框用 dialog.showModal，不要自…",
    "lessonId": "html-dialog-modal",
    "summary": "普通绝对定位 div 不会自动困住焦点。"
  },
  {
    "id": "mx-html5-constraint-before-submit",
    "courseId": "browser",
    "title": "校验没过时不会触发 submit",
    "lessonId": "html5-constraint-before-submit",
    "summary": "按钮和 requestSubmit() 在校验失败时不触发 submit。"
  },
  {
    "id": "mx-html5-media-play-promise",
    "courseId": "browser",
    "title": "带声音的自动播放会被拒绝，play() 要看 Prom…",
    "lessonId": "html5-media-play-promise",
    "summary": "带声音的 autoplay 被拒绝，元素停住。"
  },
  {
    "id": "mx-html5-canvas-buffer",
    "courseId": "browser",
    "title": "canvas 的宽高属性才是像素缓冲",
    "lessonId": "html5-canvas-buffer",
    "summary": "只改 CSS 时缓冲仍是 300×150，位图被拉伸。"
  },
  {
    "id": "mx-html5-pushstate-popstate",
    "courseId": "browser",
    "title": "pushState 改地址，这次调用不触发 popst…",
    "lessonId": "html5-pushstate-popstate",
    "summary": "pushState 只改当前文档的地址和历史，不触发 popstate。"
  },
  {
    "id": "mx-html5-drop-prevent-default",
    "courseId": "browser",
    "title": "dragover 不取消默认行为，drop 就不会发生",
    "lessonId": "html5-drop-prevent-default",
    "summary": "没有取消 dragover 的默认行为时，drop 不发生。"
  },
  {
    "id": "mx-miniprogram-wx-if-not-wxif",
    "courseId": "browser",
    "title": "小程序条件渲染是 wx:if，不是 wx-if，也没有…",
    "lessonId": "miniprogram-wx-if-not-wxif",
    "summary": "if，冒号是指令前缀，不是 wx-if；列表是 wx:for。"
  },
  {
    "id": "mx-browser-event-loop-frame",
    "courseId": "browser",
    "title": "一帧里：脚本、样式、布局、绘制",
    "lessonId": "browser-event-loop-frame",
    "summary": "用性能记录标出脚本、布局和绘制谁最长。"
  },
  {
    "id": "mx-session-storage-tab-only",
    "courseId": "browser",
    "title": "sessionStorage 跟标签页走，不是跟用户账…",
    "lessonId": "session-storage-tab-only",
    "summary": "session 不跨标签；刷新常保留；关标签清空。"
  },
  {
    "id": "mx-indexeddb-when-needed",
    "courseId": "browser",
    "title": "IndexedDB 给结构化大数据，不是默认缓存层",
    "lessonId": "indexeddb-when-needed",
    "summary": "开关用 Web Storage。"
  },
  {
    "id": "mx-bfcache-pageshow",
    "courseId": "browser",
    "title": "后退可能整页从往返缓存里拿出来，脚本不一定重跑",
    "lessonId": "bfcache-pageshow",
    "summary": "后退常从往返缓存恢复，不一定再跑 load。"
  },
  {
    "id": "mx-service-worker-stale",
    "courseId": "browser",
    "title": "Service Worker 能先给旧缓存，更新代码不…",
    "lessonId": "service-worker-stale",
    "summary": "新脚本装好后可能还在 waiting，旧 Worker 仍在接管。"
  },
  {
    "id": "mx-sw-cache-strategy-pick",
    "courseId": "browser",
    "title": "Service Worker 缓存策略要按资源选，不是…",
    "lessonId": "sw-cache-strategy-pick",
    "summary": "带哈希静态：cache-first。"
  },
  {
    "id": "mx-cors-credentials-allowlist",
    "courseId": "browser",
    "title": "带 Cookie 的 CORS 不能回显任意 Orig…",
    "lessonId": "cors-credentials-allowlist",
    "summary": "带 Cookie 时不能把 Origin 无校验回写，也不能用 *。"
  },
  {
    "id": "mx-cors-preflight-max-age",
    "courseId": "browser",
    "title": "Access-Control-Max-Age 只缓存预…",
    "lessonId": "cors-preflight-max-age",
    "summary": "Max-Age 只缓存预检（OPTIONS）结论。"
  },
  {
    "id": "mx-same-origin-script-still-runs",
    "courseId": "browser",
    "title": "同源策略拦的是读，不是“外域脚本不能执行”",
    "lessonId": "same-origin-script-still-runs",
    "summary": "外域 script src 会执行，权限属于当前文档的源。"
  },
  {
    "id": "mx-html-form-cross-origin-navigate",
    "courseId": "browser",
    "title": "表单可以跨源提交，CORS 拦的是脚本读响应",
    "lessonId": "html-form-cross-origin-navigate",
    "summary": "表单跨源提交是导航，不靠 CORS。"
  },
  {
    "id": "mx-css-what-it-is",
    "courseId": "browser",
    "title": "CSS 是描述文档怎么呈现的样式语言",
    "lessonId": "css-what-it-is",
    "summary": "CSS 是描述文档怎么呈现的样式语言。"
  },
  {
    "id": "mx-css-rule-syntax",
    "courseId": "browser",
    "title": "一条规则用选择器选中元素，用声明设置属性",
    "lessonId": "css-rule-syntax",
    "summary": "选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"
  },
  {
    "id": "mx-css-selector-simple",
    "courseId": "browser",
    "title": "类型、类和 id 选择器匹配的范围不同",
    "lessonId": "css-selector-simple",
    "summary": ".price 匹配带这个类的元素。"
  },
  {
    "id": "mx-css-box-sizing",
    "courseId": "browser",
    "title": "width 含不含 padding",
    "lessonId": "css-box-sizing",
    "summary": "content-box 的 padding/border 加在 width 外。"
  },
  {
    "id": "mx-css-stacking",
    "courseId": "browser",
    "title": "层叠上下文与 z-index",
    "lessonId": "css-stacking",
    "summary": "先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。"
  },
  {
    "id": "mx-css-grid-flex",
    "courseId": "browser",
    "title": "Flex 排一条轴，Grid 排行列",
    "lessonId": "css-grid-flex",
    "summary": "不是所有布局都该改成 Grid。"
  },
  {
    "id": "mx-css-container-query",
    "courseId": "browser",
    "title": "容器查询按组件自己的宽度换布局，不是只看视口",
    "lessonId": "css-container-query",
    "summary": "两处都用媒体查询时，主栏和侧栏的卡片跟着视口一起变，窄侧栏里也会横排。"
  },
  {
    "id": "mx-react-app-around-library",
    "courseId": "react",
    "title": "新的网站从框架开始，react 包负责界面",
    "lessonId": "react-app-around-library",
    "summary": "文档建议新的网站或应用从框架开始。"
  },
  {
    "id": "mx-react-function-component",
    "courseId": "react",
    "title": "函数组件返回要显示的元素",
    "lessonId": "react-function-component",
    "summary": "写成一个大写开头的函数，return 里放要显示的元素。"
  },
  {
    "id": "mx-react-props-argument",
    "courseId": "react",
    "title": "props 是调用组件时传入的参数",
    "lessonId": "react-props-argument",
    "summary": "调用时写成 cents={100}。"
  },
  {
    "id": "mx-react-usestate-pair",
    "courseId": "react",
    "title": "useState 返回当前值和一个安排更新的函数",
    "lessonId": "react-usestate-pair",
    "summary": "用 useState(0) 取出当前值和更新函数。"
  },
  {
    "id": "mx-linked-list",
    "courseId": "react",
    "title": "链表、树与位运算",
    "lessonId": "linked-list",
    "summary": "Hook 按调用顺序挂在链表上。"
  },
  {
    "id": "mx-controlled-input",
    "courseId": "react",
    "title": "受控输入与数据流",
    "lessonId": "controlled-input",
    "summary": "受控输入的画面只听 value。"
  },
  {
    "id": "mx-effects",
    "courseId": "react",
    "title": "Effect、清理与提交时序",
    "lessonId": "effects",
    "summary": "切换 id 后，上一次请求仍可能返回。"
  },
  {
    "id": "mx-react-effect-timing",
    "courseId": "react",
    "title": "useLayoutEffect 在绘制前，但不是无条件…",
    "lessonId": "react-effect-timing",
    "summary": "要在绘制前量布局、避免闪一帧时用 useLayoutEffect。"
  },
  {
    "id": "mx-react-context-stable",
    "courseId": "react",
    "title": "Context 已是稳定 API，不是实验功能（Rea…",
    "lessonId": "react-context-stable",
    "summary": "现行写法是 createContext、Provider 和 useContext。"
  },
  {
    "id": "mx-react-props-state-sync",
    "courseId": "react",
    "title": "props 变了不必先拷进 state 再 useEf…",
    "lessonId": "react-props-state-sync",
    "summary": "多数情况应在渲染期直接用 props，或用 key 换身份重置。"
  },
  {
    "id": "mx-react-gdsfp-copy",
    "courseId": "react",
    "title": "getDerivedStateFromProps 不是…",
    "lessonId": "react-gdsfp-copy",
    "summary": "派生时会把本地更新打回 props。"
  },
  {
    "id": "mx-react-hooks-over-hoc",
    "courseId": "react",
    "title": "复用状态逻辑：自定义 Hook 优先，HOC 不是 m…",
    "lessonId": "react-hooks-over-hoc",
    "summary": "复用状态的现行默认是 Hook。"
  },
  {
    "id": "mx-react-event-root",
    "courseId": "react",
    "title": "React 事件委托在根上，stopPropagati…",
    "lessonId": "react-event-root",
    "summary": "委托在根容器，不在 document。"
  },
  {
    "id": "mx-react-fiber-interrupt",
    "courseId": "react",
    "title": "Fiber：可中断的渲染工作，不是操作系统协程",
    "lessonId": "react-fiber-interrupt",
    "summary": "Fiber 让渲染阶段可中断；提交阶段才改 DOM。"
  },
  {
    "id": "mx-react-vdom-perf-bound",
    "courseId": "react",
    "title": "虚拟 DOM 保证的是下限，不是永远更快",
    "lessonId": "react-vdom-perf-bound",
    "summary": "虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。"
  },
  {
    "id": "mx-react-version-checklist",
    "courseId": "react",
    "title": "不要把 React 16 特性清单当成“最新版答卷”",
    "lessonId": "react-version-checklist",
    "summary": "useMutationEffect 等已不在现行清单。"
  },
  {
    "id": "mx-react-createclass-gone",
    "courseId": "react",
    "title": "React.createClass 不是现行三种声明方…",
    "lessonId": "react-createclass-gone",
    "summary": "createClass 已移出核心包。"
  },
  {
    "id": "mx-react-eco-chapter-aim",
    "courseId": "react",
    "title": "React 生态章回答地址、客户端状态和服务器状态各放哪",
    "lessonId": "react-eco-chapter-aim",
    "summary": "补路由、客户端状态和服务器状态。"
  },
  {
    "id": "mx-react-router-element-api",
    "courseId": "react",
    "title": "现行 React Router：Routes + el…",
    "lessonId": "react-router-element-api",
    "summary": "现行默认是 Routes、element 和 Navigate。"
  },
  {
    "id": "mx-react-router-error-element",
    "courseId": "react",
    "title": "路由错误要画在这一层的 errorElement，不要…",
    "lessonId": "react-router-error-element",
    "summary": "loader 抛错若没有 errorElement，会整页失败。"
  },
  {
    "id": "mx-rr-mode-gates-data",
    "courseId": "react",
    "title": "loader 只在数据模式和框架模式里生效",
    "lessonId": "rr-mode-gates-data",
    "summary": "loader 只在 createBrowserRouter 这一档、于渲染前执行。"
  },
  {
    "id": "mx-rr-outlet-keeps-layout",
    "courseId": "react",
    "title": "子路由画进父级的 Outlet，布局不用复制",
    "lessonId": "rr-outlet-keeps-layout",
    "summary": "子路由画在父级的 Outlet 里，父级不卸载，侧栏状态才能留下。"
  },
  {
    "id": "mx-rr-redirect-before-render",
    "courseId": "react",
    "title": "未登录时在 loader 里抛出重定向（RR 6.4+）",
    "lessonId": "rr-redirect-before-render",
    "summary": "在 loader 里 redirect，组件不会先渲染。"
  },
  {
    "id": "mx-state-kind-picks-home",
    "courseId": "react",
    "title": "先分清这个值属于谁，再决定进哪个库",
    "lessonId": "state-kind-picks-home",
    "summary": "主题、弹层、服务端列表不是同一种状态。"
  },
  {
    "id": "mx-state-reducer-context-screen",
    "courseId": "react",
    "title": "一屏里多处改同一份列表时，用 reducer 和 Co…",
    "lessonId": "state-reducer-context-screen",
    "summary": "单页任务列表用 reducer 加 Context 就够。"
  },
  {
    "id": "mx-query-cache-not-http-client",
    "courseId": "react",
    "title": "TanStack Query 缓存服务器结果，自己不发…",
    "lessonId": "query-cache-not-http-client",
    "summary": "Query 管缓存和重试，不代替发请求。"
  },
  {
    "id": "mx-query-fn-calls-the-client",
    "courseId": "react",
    "title": "queryFn 里要让 HTTP 失败变成抛错，并带上…",
    "lessonId": "query-fn-calls-the-client",
    "summary": "不检查 ok 时，404 也会进 data。"
  },
  {
    "id": "mx-query-server-state",
    "courseId": "react",
    "title": "服务器状态不要再抄进 useState",
    "lessonId": "query-server-state",
    "summary": "Query 里已有列表就不要再 setUsers 抄一份。"
  },
  {
    "id": "mx-redux-rtk-today",
    "courseId": "react",
    "title": "今天写 Redux 默认走 Toolkit，不是手写 …",
    "lessonId": "redux-rtk-today",
    "summary": "今天写 Redux 用 Toolkit：configureStore 和 createSlice。"
  },
  {
    "id": "mx-vue-what-it-is",
    "courseId": "vue",
    "title": "Vue 是构建用户界面的 JavaScript 框架",
    "lessonId": "vue-what-it-is",
    "summary": "模板按当前的 JavaScript 状态描述要输出的 HTML。"
  },
  {
    "id": "mx-vue-create-app-mount",
    "courseId": "vue",
    "title": "createApp 把应用挂到已有的页面节点",
    "lessonId": "vue-create-app-mount",
    "summary": "createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。"
  },
  {
    "id": "mx-vue-app-around-core",
    "courseId": "vue",
    "title": "换地址和跨页状态用 Vue 旁边的库",
    "lessonId": "vue-app-around-core",
    "summary": "地址用 Vue Router，多个页面共用的状态用 Pinia。"
  },
  {
    "id": "mx-vue-sfc-template",
    "courseId": "vue",
    "title": "单文件组件用 template 写要显示的结构",
    "lessonId": "vue-sfc-template",
    "summary": "template 写结构和插值。"
  },
  {
    "id": "mx-vue-proxy-null-guard",
    "courseId": "vue",
    "title": "手写 Proxy 要先守住 null 与类型边界",
    "lessonId": "vue-proxy-null-guard",
    "summary": "null 的 typeof 是 object，但仍不能作为 Proxy 目标。"
  },
  {
    "id": "mx-vue-array-raw-proxy",
    "courseId": "vue",
    "title": "数组 push 改的是原数组还是代理",
    "lessonId": "vue-array-raw-proxy",
    "summary": "raw.push 走原生数组，不通知依赖。"
  },
  {
    "id": "mx-vue-nexttick",
    "courseId": "vue",
    "title": "Vue 更新批次与 nextTick",
    "lessonId": "vue-nexttick",
    "summary": "状态更新后 DOM 在微任务里才刷。"
  },
  {
    "id": "mx-vue-props-one-way",
    "courseId": "vue",
    "title": "子组件改 prop，父组件不会跟着变",
    "lessonId": "vue-props-one-way",
    "summary": "props 由父传入，子组件直接赋值会警告且父数据不变。"
  },
  {
    "id": "mx-vue-list-key",
    "courseId": "vue",
    "title": "Vue 列表 key 与输入状态",
    "lessonId": "vue-list-key",
    "summary": "没有稳定 key 时，输入状态按位置复用。"
  },
  {
    "id": "mx-vue-composition-options",
    "courseId": "vue",
    "title": "组合式 API 与选项式 API：复杂组件怎么组织",
    "lessonId": "vue-composition-options",
    "summary": "Composition 便于按功能拆函数，不是淘汰 Options。"
  },
  {
    "id": "mx-vue-teleport-dom-not-logical",
    "courseId": "vue",
    "title": "Teleport 把片段搬到组件 DOM 之外，逻辑父…",
    "lessonId": "vue-teleport-dom-not-logical",
    "summary": "祖先若有 transform、perspective 或 filter，position: fixed 不再相对视口。"
  },
  {
    "id": "mx-vue-vnode-not-fragment",
    "courseId": "vue",
    "title": "Vue 的虚拟 DOM 不是 DocumentFrag…",
    "lessonId": "vue-vnode-not-fragment",
    "summary": "虚拟 DOM 是 JS 对象描述的 VNode；DocumentFragment 是真实 DOM 容器。"
  },
  {
    "id": "mx-vue-design-goals-proxy",
    "courseId": "vue",
    "title": "更小更快：落到编译提示与惰性深层代理",
    "lessonId": "vue-design-goals-proxy",
    "summary": "未访问的嵌套对象不会立刻变成代理。"
  },
  {
    "id": "mx-vue-tree-shake-options",
    "courseId": "vue",
    "title": "Vue 体积：树摇依赖构建条件，不是框架名称",
    "lessonId": "vue-tree-shake-options",
    "summary": "树摇要 ESM、生产构建和无副作用标记。"
  },
  {
    "id": "mx-vue-patch-hoist",
    "courseId": "vue",
    "title": "编译期补丁标记：更快有前提，不是框架保证",
    "lessonId": "vue-patch-hoist",
    "summary": "标记和缓存有条件：监听捕获局部变量时不能缓存。"
  },
  {
    "id": "mx-vue-router-reuse",
    "courseId": "vue",
    "title": "只改路由参数时，组件可能不会重建",
    "lessonId": "vue-router-reuse",
    "summary": "同一组件实例会被复用，setup 不重跑。"
  },
  {
    "id": "mx-vue-router-guard",
    "courseId": "vue",
    "title": "导航守卫决定去不去，不是在页面里再偷偷改路由",
    "lessonId": "vue-router-guard",
    "summary": "守卫在确认导航前拦截，页面不会先出现。"
  },
  {
    "id": "mx-vue-router-scroll",
    "courseId": "vue",
    "title": "换页后的滚动位置要自己约定，浏览器不会总回到顶部",
    "lessonId": "vue-router-scroll",
    "summary": "滚动位置由 scrollBehavior 决定。"
  },
  {
    "id": "mx-vue-keep-alive",
    "courseId": "vue",
    "title": "keep-alive 缓存的是实例，切走不是销毁",
    "lessonId": "vue-keep-alive",
    "summary": "缓存时实例不销毁，回来走 activated，滚动能留下。"
  },
  {
    "id": "mx-fe-pick-decision-order",
    "courseId": "client",
    "title": "选型没有打分公式：先看仓库和团队，再看打开方式",
    "lessonId": "fe-pick-decision-order",
    "summary": "仓库已经在用 Vue，新的浏览器页面就继续用 Vue。"
  },
  {
    "id": "mx-fe-pick-by-surface",
    "courseId": "client",
    "title": "人从哪打开、源代码里要不要正文",
    "lessonId": "fe-pick-by-surface",
    "summary": "React 只说明浏览器里的界面用什么来更新。"
  },
  {
    "id": "mx-fe-meta-framework-tradeoffs",
    "courseId": "client",
    "title": "查看网页源代码时，正文在不在 HTML 里",
    "lessonId": "fe-meta-framework-tradeoffs",
    "summary": "先看仓库里已经是哪种界面库，再打开「查看网页源代码」。"
  },
  {
    "id": "mx-fe-framework-tradeoffs",
    "courseId": "client",
    "title": "四种界面库：官方自带什么，你还要自己装什么",
    "lessonId": "fe-framework-tradeoffs",
    "summary": "React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"
  },
  {
    "id": "mx-fe-ui-update-model",
    "courseId": "client",
    "title": "改一个数字时，四种框架各自要写哪一行",
    "lessonId": "fe-ui-update-model",
    "summary": "React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"
  },
  {
    "id": "mx-fe-ecosystem-slot-tradeoffs",
    "courseId": "client",
    "title": "路由、接口列表、登录态，各只留一个地方",
    "lessonId": "fe-ecosystem-slot-tradeoffs",
    "summary": "筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"
  },
  {
    "id": "mx-fe-react-framework-first",
    "courseId": "client",
    "title": "新的 React 应用从文档列出的框架起",
    "lessonId": "fe-react-framework-first",
    "summary": "React 文档把路由、取数和打包放在已经集成好的框架里。"
  },
  {
    "id": "mx-fe-vue-official-slots",
    "courseId": "client",
    "title": "Vue 新项目：Vite 构建，Vue Router …",
    "lessonId": "fe-vue-official-slots",
    "summary": "官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。"
  },
  {
    "id": "mx-fe-angular-first-party",
    "courseId": "client",
    "title": "Angular 的路由、HTTP 和表单用自己的包（v…",
    "lessonId": "fe-angular-first-party",
    "summary": "Angular 的路由、HTTP、表单都在 @angular 自己的包里。"
  },
  {
    "id": "mx-fe-sveltekit-runes",
    "courseId": "client",
    "title": "Svelte 应用用 SvelteKit，状态用 ru…",
    "lessonId": "fe-sveltekit-runes",
    "summary": "Svelte 页面要先由 Svelte 编译。"
  },
  {
    "id": "mx-fe-ecosystem-follows-model",
    "courseId": "client",
    "title": "选定界面库之后，生态跟着这一套走",
    "lessonId": "fe-ecosystem-follows-model",
    "summary": "选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。"
  },
  {
    "id": "mx-fe-react-one-slot",
    "courseId": "client",
    "title": "React 里路由、接口列表、登录态各只留一个库",
    "lessonId": "fe-react-one-slot",
    "summary": "路由一格、服务端列表缓存一格、客户端会话一格。"
  },
  {
    "id": "mx-fe-angular-resource-not-ngrx",
    "courseId": "client",
    "title": "Angular 的 GET 用 HttpClient …",
    "lessonId": "fe-angular-resource-not-ngrx",
    "summary": "列表走 HttpClient 或 httpResource 即可。"
  },
  {
    "id": "mx-fe-svelte-load-not-store",
    "courseId": "client",
    "title": "SvelteKit 的页面数据从 load 返回，不要…",
    "lessonId": "fe-svelte-load-not-store",
    "summary": "load 跑在服务端时，写入模块级 store 会留到下一次请求。"
  },
  {
    "id": "mx-fe-cross-end-one-runtime",
    "courseId": "client",
    "title": "跨端先选定一个运行时",
    "lessonId": "fe-cross-end-one-runtime",
    "summary": "网页画到 DOM，小程序和 App 是另外的运行时。"
  },
  {
    "id": "mx-fe-expo-router-one-nav",
    "courseId": "client",
    "title": "新的 Expo 应用用 Expo Router 做路由",
    "lessonId": "fe-expo-router-one-nav",
    "summary": "Expo 新模板默认用 Expo Router 做文件路由。"
  },
  {
    "id": "mx-mfe-what-it-is",
    "courseId": "client",
    "title": "微前端是多个可独立发布的前端，在运行时或构建时拼成一个…",
    "lessonId": "mfe-what-it-is",
    "summary": "微前端要能独立构建、独立发布，再拼成一个产品。"
  },
  {
    "id": "mx-mfe-when-to-split",
    "courseId": "client",
    "title": "先写清谁独立发版，再决定要不要拆应用",
    "lessonId": "mfe-when-to-split",
    "summary": "共用仓库、同一次发版时，微前端解决不了独立发版。"
  },
  {
    "id": "mx-mfe-compare-matrix",
    "courseId": "client",
    "title": "对照表：按约束选组合方式，不要按星数",
    "lessonId": "mfe-compare-matrix",
    "summary": "表只写每种方案的主缝和做不到的事。"
  },
  {
    "id": "mx-mfe-qiankun-html-entry",
    "courseId": "client",
    "title": "qiankun：HTML entry，路由登记与手动 …",
    "lessonId": "mfe-qiankun-html-entry",
    "summary": "单独能开只说明子应用自己的入口在。"
  },
  {
    "id": "mx-mfe-independent-deploy",
    "courseId": "client",
    "title": "独立发布要有可回滚的入口地址与兼容窗口",
    "lessonId": "mfe-independent-deploy",
    "summary": "覆盖同一个 remoteEntry.js 无法回滚。"
  },
  {
    "id": "mx-rn-not-webview-app",
    "courseId": "client",
    "title": "React Native 不是把网站装进 WebView",
    "lessonId": "rn-not-webview-app",
    "summary": "要原生控件、原生导航和平台能力时才用。"
  },
  {
    "id": "mx-rn-text-not-under-view",
    "courseId": "client",
    "title": "文字必须包在 Text 里，字体也不会从 View 继…",
    "lessonId": "rn-text-not-under-view",
    "summary": "<View>请登录</View> 会抛异常。"
  },
  {
    "id": "mx-rn-flex-defaults",
    "courseId": "client",
    "title": "Flexbox 能用，但四项默认和网页不一样",
    "lessonId": "rn-flex-defaults",
    "summary": "View 默认就是 flex 容器，不需要 display:flex。"
  },
  {
    "id": "mx-rn-pressable-not-click",
    "courseId": "client",
    "title": "按压用 Pressable 的 onPress，不是 …",
    "lessonId": "rn-pressable-not-click",
    "summary": "日志应出现在 Pressable 的 onPress。"
  },
  {
    "id": "mx-rn-flatlist-window",
    "courseId": "client",
    "title": "长列表用 FlatList，它不会把每一行都挂上",
    "lessonId": "rn-flatlist-window",
    "summary": "长列表用 FlatList，传入 data 和 renderItem。"
  },
  {
    "id": "mx-rn-dimensions-not-cached",
    "courseId": "client",
    "title": "窗口尺寸会变，不要把第一次读到的宽高存死",
    "lessonId": "rn-dimensions-not-cached",
    "summary": "模块顶层存下的宽度在旋转后仍是旧值。"
  },
  {
    "id": "mx-rn-hermes-default",
    "courseId": "client",
    "title": "默认引擎是 Hermes，不是手机浏览器里的那一个（R…",
    "lessonId": "rn-hermes-default",
    "summary": "默认引擎是 Hermes，文档写明不必再配置才能启用。"
  },
  {
    "id": "mx-rn-fetch-not-document",
    "courseId": "client",
    "title": "环境补上了 fetch，没有因此补上 document",
    "lessonId": "rn-fetch-not-document",
    "summary": "fetch 和 XMLHttpRequest 在补齐列表里，可以用来发请求。"
  },
  {
    "id": "mx-flutter-enter-app",
    "courseId": "client",
    "title": "flutter create 做出可以跑起来的工程",
    "lessonId": "flutter-enter-app",
    "summary": "用 flutter create。"
  },
  {
    "id": "mx-flutter-not-html",
    "courseId": "client",
    "title": "Flutter 没有文档树，也不是 React Nat…",
    "lessonId": "flutter-not-html",
    "summary": "build 返回的是 Widget。"
  },
  {
    "id": "mx-flutter-widget-not-html",
    "courseId": "client",
    "title": "Flutter 的界面是 Widget，不是 HTML…",
    "lessonId": "flutter-widget-not-html",
    "summary": "外层用 Column 或 Container，文字用 Text。"
  },
  {
    "id": "mx-flutter-impeller-own-pixels",
    "courseId": "client",
    "title": "Flutter 自己画像素，iOS 上只用 Impel…",
    "lessonId": "flutter-impeller-own-pixels",
    "summary": "界面是引擎画在自己表面上的像素，不是 OEM 控件，也不是 WebView。"
  },
  {
    "id": "mx-flutter-constraints-down",
    "courseId": "client",
    "title": "约束向下传，尺寸向上报，位置由父级决定",
    "lessonId": "flutter-constraints-down",
    "summary": "Column 给普通孩子的竖直最大高度是无穷。"
  },
  {
    "id": "mx-flutter-gorouter-not-named",
    "courseId": "client",
    "title": "多数应用用 go_router，不要只靠命名路由",
    "lessonId": "flutter-gorouter-not-named",
    "summary": "命名路由收到深链会再 push 一页，并且没有浏览器前进。"
  },
  {
    "id": "mx-cross-four-where-it-fits",
    "courseId": "client",
    "title": "先看宿主：小程序、自绘 App，还是系统视图",
    "lessonId": "cross-four-where-it-fits",
    "summary": "小程序打不开先看 pages.json 或 app.config。"
  },
  {
    "id": "mx-uniapp-what-it-is",
    "courseId": "client",
    "title": "uni-app 用 Vue 写出一套代码，再编译到各端",
    "lessonId": "uniapp-what-it-is",
    "summary": "常用 Vue 的 .vue 页面。"
  },
  {
    "id": "mx-uniapp-x-uts-not-vue-page",
    "courseId": "client",
    "title": "uni-app x 用 uts 和 uvue，旧的 v…",
    "lessonId": "uniapp-x-uts-not-vue-page",
    "summary": "uni-app 继续用 Vue 3 的 .vue。"
  },
  {
    "id": "mx-taro-react-setdata-bridge",
    "courseId": "client",
    "title": "Taro 跑的是真 React，小程序界面仍靠 set…",
    "lessonId": "taro-react-setdata-bridge",
    "summary": "setState 先改逻辑层的模拟 DOM。"
  },
  {
    "id": "mx-taro-pages-in-app-config",
    "courseId": "client",
    "title": "Taro 的页面在 app.config 的 page…",
    "lessonId": "taro-pages-in-app-config",
    "summary": "没写进 pages 的组件不是页面，第一项才是冷启动首页。"
  },
  {
    "id": "mx-node-not-browser",
    "courseId": "client",
    "title": "Node.js 提供进程和文件，不提供页面文档",
    "lessonId": "node-not-browser",
    "summary": "Node.js 没有 document。"
  },
  {
    "id": "mx-node-http-close",
    "courseId": "client",
    "title": "停进程要先 server.close，等已有请求结束，…",
    "lessonId": "node-http-close",
    "summary": "SIGTERM 后应先 server.close 拒新连接并排空在途。"
  },
  {
    "id": "mx-node-nexttick",
    "courseId": "client",
    "title": "Node 的 nextTick 与微任务",
    "lessonId": "node-nexttick",
    "summary": "先标出同步打印，它一定在两个队列之前。"
  },
  {
    "id": "mx-node-libuv-threadpool",
    "courseId": "client",
    "title": "看起来异步的 fs 和 crypto，背后常占用线程池",
    "lessonId": "node-libuv-threadpool",
    "summary": "走线程池的例如某些文件操作和加密。"
  },
  {
    "id": "mx-node-buffer",
    "courseId": "client",
    "title": "Buffer 的字节与初始化边界",
    "lessonId": "node-buffer",
    "summary": "Buffer.alloc(8) 会把 8 个字节填成 0，读出来是确定的。"
  },
  {
    "id": "mx-java-what-it-is",
    "courseId": "java",
    "title": "Java 是一门语言，也是一套能跑字节码的平台",
    "lessonId": "java-what-it-is",
    "summary": "先编译成字节码，再交给 Java 虚拟机执行。"
  },
  {
    "id": "mx-java-enter-main",
    "courseId": "java",
    "title": "java 命令从 main 启动一个进程",
    "lessonId": "java-enter-main",
    "summary": "先 javac 编译，再 java 加上类名。"
  },
  {
    "id": "mx-java-not-javascript",
    "courseId": "java",
    "title": "Java 不是 JavaScript，旁边是 JVM …",
    "lessonId": "java-not-javascript",
    "summary": "Java 编译成字节码，在 JVM 里跑。"
  },
  {
    "id": "mx-java-wrapper-type",
    "courseId": "java",
    "title": "包装类把基本类型包成对象",
    "lessonId": "java-wrapper-type",
    "summary": "Integer 是 int 的包装类。"
  },
  {
    "id": "mx-java-array-length",
    "courseId": "java",
    "title": "数组的长度在创建时定下，下标从 0 开始",
    "lessonId": "java-array-length",
    "summary": "长度在 new 的时候定下，放在 length 里。"
  },
  {
    "id": "mx-java-string-type",
    "courseId": "java",
    "title": "String 是类，字面量的类型就是 String",
    "lessonId": "java-string-type",
    "summary": "String 是类，变量里是指向字符串对象的引用。"
  },
  {
    "id": "mx-java-list-set-map",
    "courseId": "java",
    "title": "List 按位置放元素，Set 不放重复，Map 用键…",
    "lessonId": "java-list-set-map",
    "summary": "要顺序、也允许重复，用 List。"
  },
  {
    "id": "mx-java-if-else",
    "courseId": "java",
    "title": "if 的条件必须是 boolean，else 配最近的…",
    "lessonId": "java-if-else",
    "summary": "if 的条件必须是 boolean。"
  },
  {
    "id": "mx-java-switch-colon",
    "courseId": "java",
    "title": "冒号 switch 匹配之后继续往下执行，直到 bre…",
    "lessonId": "java-switch-colon",
    "summary": "冒号形式匹配之后会继续执行后面的语句，这叫落入。"
  },
  {
    "id": "mx-java-method-overload",
    "courseId": "java",
    "title": "方法由名字和参数类型一起区分，返回类型不算",
    "lessonId": "java-method-overload",
    "summary": "参数个数或类型不同，就是重载，可以共存。"
  },
  {
    "id": "mx-java-class-new-this",
    "courseId": "java",
    "title": "class 声明类型，new 调用构造器，this 是…",
    "lessonId": "java-class-new-this",
    "summary": "new 创建对象，并调用参数匹配的构造器。"
  },
  {
    "id": "mx-java-package-access",
    "courseId": "java",
    "title": "类放在包里，访问权限分四档",
    "lessonId": "java-package-access",
    "summary": "不写修饰符就是包访问，只有同一个包能用。"
  },
  {
    "id": "mx-java-interface-implements",
    "courseId": "java",
    "title": "interface 规定方法，implements 由…",
    "lessonId": "java-interface-implements",
    "summary": "一个类只能 extends 一个父类。"
  },
  {
    "id": "mx-java-try-catch-throws",
    "courseId": "java",
    "title": "throw 现在抛出异常，throws 声明可能交给调…",
    "lessonId": "java-try-catch-throws",
    "summary": "throw 是现在抛出一个异常对象。"
  },
  {
    "id": "mx-java-main-launcher",
    "courseId": "java",
    "title": "启动入口是 public static void ma…",
    "lessonId": "java-main-launcher",
    "summary": "启动契约要的是标准签名的 main。"
  },
  {
    "id": "mx-java-string-immutability",
    "courseId": "java",
    "title": "String 不可变，拼接在循环里要换思路",
    "lessonId": "java-string-immutability",
    "summary": "每次 + 都在造新串并复制旧字符。"
  },
  {
    "id": "mx-java-string-new-vs-pool",
    "courseId": "java",
    "title": "new String(\"xyz\") 不一定正好两个对象",
    "lessonId": "java-string-new-vs-pool",
    "summary": "字面量进池；new 再多一个堆上的 String。"
  },
  {
    "id": "mx-java-generics",
    "courseId": "java",
    "title": "泛型、类型擦除与运行时",
    "lessonId": "java-generics",
    "summary": "擦除之后运行时看不见元素类型，instanceof 区分不了。"
  },
  {
    "id": "mx-java-record-accessor",
    "courseId": "java",
    "title": "record 按括号里的名字生成 equals，不适合…",
    "lessonId": "java-record-accessor",
    "summary": "record 按圆括号里列出的名字比较相等。"
  },
  {
    "id": "mx-java-protected-other-pkg-subclass",
    "courseId": "java",
    "title": "protected 对别的包里的子类可见，不是“出了包…",
    "lessonId": "java-protected-other-pkg-subclass",
    "summary": "protected 对本包可见，也允许其他包的子类访问继承成员。"
  },
  {
    "id": "mx-java-anonymous-extends-or-implements",
    "courseId": "java",
    "title": "匿名类要么继承一个类，要么实现一个接口",
    "lessonId": "java-anonymous-extends-or-implements",
    "summary": "匿名类可以 new 父类(){}，就是在继承。"
  },
  {
    "id": "mx-java-ctor-implicit-super-noarg",
    "courseId": "java",
    "title": "构造器里隐式 super() 只调父类无参，不是“总会…",
    "lessonId": "java-ctor-implicit-super-noarg",
    "summary": "编译器默认只插无参 super()。"
  },
  {
    "id": "mx-java-unchecked-not-must-catch",
    "courseId": "java",
    "title": "RuntimeException 不必写进 catch…",
    "lessonId": "java-unchecked-not-must-catch",
    "summary": "RuntimeException 是未检查异常，编译器不强制 catch。"
  },
  {
    "id": "mx-java-runtime-ex-not-auto-caught",
    "courseId": "java",
    "title": "RuntimeException 会抛，JVM 不会替…",
    "lessonId": "java-runtime-ex-not-auto-caught",
    "summary": "没有 catch 时异常沿栈往上走，线程按未捕获处理器结束。"
  },
  {
    "id": "mx-java-clone-exception-checked",
    "courseId": "java",
    "title": "CloneNotSupportedException …",
    "lessonId": "java-clone-exception-checked",
    "summary": "Cloneable 没有公开方法；Object.clone 是 protected。"
  },
  {
    "id": "mx-java-stack-prefer-deque",
    "courseId": "java",
    "title": "栈和队列请用 Deque，不要新写 java.util…",
    "lessonId": "java-stack-prefer-deque",
    "summary": "栈结构用 Deque/ArrayDeque。"
  },
  {
    "id": "mx-java-collection-vs-collections",
    "courseId": "java",
    "title": "Collection 是接口，Collections …",
    "lessonId": "java-collection-vs-collections",
    "summary": "Collection 是接口；Collections 和 Arrays 是静态工具类。"
  },
  {
    "id": "mx-java-arrays-aslist-fixed",
    "courseId": "java",
    "title": "Arrays.asList 返回固定大小的列表，不是 …",
    "lessonId": "java-arrays-aslist-fixed",
    "summary": "asList 是固定大小视图：set 会改底层数组，add/remove 会失败。"
  },
  {
    "id": "mx-java-foreach-remove-cme",
    "courseId": "java",
    "title": "增强 for 里不能直接 list.remove，要用…",
    "lessonId": "java-foreach-remove-cme",
    "summary": "增强 for 底层仍在 next，循环里直接 list.remove 会坏结构。"
  },
  {
    "id": "mx-hashmap-treeify-need-capacity",
    "courseId": "java",
    "title": "链表变红黑树不只看长度 8，还要桶数组够大",
    "lessonId": "hashmap-treeify-need-capacity",
    "summary": "链表够长还不够，表容量也要达到树化门槛。"
  },
  {
    "id": "mx-chm-iterator-weakly-consistent",
    "courseId": "java",
    "title": "ConcurrentHashMap 的迭代器不是整表拷…",
    "lessonId": "chm-iterator-weakly-consistent",
    "summary": "ConcurrentHashMap 迭代不抛 CME，也不保证冻结快照。"
  },
  {
    "id": "mx-java-stringbuilder-not-buffer",
    "courseId": "java",
    "title": "同一线程拼字符串用 StringBuilder，不要默…",
    "lessonId": "java-stringbuilder-not-buffer",
    "summary": "局部拼接用 StringBuilder。"
  },
  {
    "id": "mx-java-string-strip-not-trim",
    "courseId": "java",
    "title": "trim 清的不是全部空白，getBytes 必须写字…",
    "lessonId": "java-string-strip-not-trim",
    "summary": "trim 去不掉部分 Unicode 空白；strip 按 Unicode 空白。"
  },
  {
    "id": "mx-java-calendar-not-singleton",
    "courseId": "java",
    "title": "Calendar.getInstance 每次新建，不…",
    "lessonId": "java-calendar-not-singleton",
    "summary": "Calendar.getInstance 每次新建可变实例。"
  },
  {
    "id": "mx-java-dcl-volatile-enum",
    "courseId": "java",
    "title": "双重检查单例要 volatile，枚举更不容易写错（J…",
    "lessonId": "java-dcl-volatile-enum",
    "summary": "无 volatile 时引用可能先可见、构造未完成。"
  },
  {
    "id": "mx-jdk-feature-release-six-months",
    "courseId": "java",
    "title": "现行 JDK 功能版大约半年一发，不是三年对三月",
    "lessonId": "jdk-feature-release-six-months",
    "summary": "功能版大约半年一发，LTS 隔几年一个。"
  },
  {
    "id": "mx-java-not-every-class-clone-serializable",
    "courseId": "java",
    "title": "不是每个类都要 equals、clone 和 Seri…",
    "lessonId": "java-not-every-class-clone-serializable",
    "summary": "equals/hashCode/toString 按需覆盖。"
  },
  {
    "id": "mx-java-raw-type-skips-checks",
    "courseId": "java",
    "title": "裸类型 List 会跳过泛型检查，不是图省事的写法",
    "lessonId": "java-raw-type-skips-checks",
    "summary": "裸类型 List 跳过泛型检查。"
  },
  {
    "id": "mx-java-class-newinstance-deprecated",
    "courseId": "java",
    "title": "不要再用 Class.newInstance，它只能调…",
    "lessonId": "java-class-newinstance-deprecated",
    "summary": "Class.newInstance 已弃用且只走无参。"
  },
  {
    "id": "mx-java-final-not-fifty-percent",
    "courseId": "java",
    "title": "给类加 final 不会让程序快百分之五十",
    "lessonId": "java-final-not-fifty-percent",
    "summary": "final 禁止继承，没有“平均快 50%”的规范。"
  },
  {
    "id": "mx-java-shift-not-times-eight",
    "courseId": "java",
    "title": "2 左移 3 不是“算出 2 乘 8”的正经答案",
    "lessonId": "java-shift-not-times-eight",
    "summary": "乘除就写乘除，JIT 会折减常数。"
  },
  {
    "id": "mx-java-switch-arrow-no-fall",
    "courseId": "java",
    "title": "冒号分支会贯穿，箭头分支不会（JDK 14）",
    "lessonId": "java-switch-arrow-no-fall",
    "summary": "冒号分支没有 break 会贯穿；箭头分支只跑匹配那一支。"
  },
  {
    "id": "mx-pattern-gof-catalog",
    "courseId": "pattern",
    "title": "先把二十三种名字列全，再打开后面章节",
    "lessonId": "pattern-gof-catalog",
    "summary": "先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。"
  },
  {
    "id": "mx-pattern-gof-rest",
    "courseId": "pattern",
    "title": "名单上还有七个：先写清允许变的那一块，再决定要不要单独…",
    "lessonId": "pattern-gof-rest",
    "summary": "策略和单例之外仍有撤销、遍历、命令等场景。"
  },
  {
    "id": "mx-pattern-factory-method",
    "courseId": "pattern",
    "title": "工厂方法换的是创建哪一个产品",
    "lessonId": "pattern-factory-method",
    "summary": "工厂方法把创建推给子类/创建者。"
  },
  {
    "id": "mx-pattern-facade-entry",
    "courseId": "pattern",
    "title": "外观把子系统的顺序收成一次调用",
    "lessonId": "pattern-facade-entry",
    "summary": "外观收成一次调用，子系统顺序留在里面。"
  },
  {
    "id": "mx-pattern-composite-tree",
    "courseId": "pattern",
    "title": "叶子和容器用同一接口，调用方不用先判断是不是目录",
    "lessonId": "pattern-composite-tree",
    "summary": "叶子与容器同一接口，容器转发给子节点。"
  },
  {
    "id": "mx-pattern-flyweight-share",
    "courseId": "pattern",
    "title": "享元共享的是不变的那一部分，变化的部分调用时再传入",
    "lessonId": "pattern-flyweight-share",
    "summary": "享元共享不变字段，变化靠参数传入。"
  },
  {
    "id": "mx-pattern-template-steps",
    "courseId": "pattern",
    "title": "模板定死步骤顺序，只换其中一步的正文",
    "lessonId": "pattern-template-steps",
    "summary": "模板方法固定步骤顺序，子类只替换某一步。"
  },
  {
    "id": "mx-pattern-state-transition",
    "courseId": "pattern",
    "title": "状态自己决定这一步能不能做，以及下一步是谁",
    "lessonId": "pattern-state-transition",
    "summary": "状态对象持有允许的动作并切换下一状态。"
  },
  {
    "id": "mx-java-buffered-stream-decorator",
    "courseId": "pattern",
    "title": "缓冲流包住原来的流，关闭时里面那一层也会关",
    "lessonId": "java-buffered-stream-decorator",
    "summary": "缓冲流是装饰器：关最外层即可连带内层。"
  },
  {
    "id": "mx-spring-jdbctemplate-callback",
    "courseId": "pattern",
    "title": "JdbcTemplate 固定连接和异常转换，回调只提…",
    "lessonId": "spring-jdbctemplate-callback",
    "summary": "JdbcTemplate 把 SQLException 译成 DataAccessException。"
  },
  {
    "id": "mx-spring-getbean-hides-deps",
    "courseId": "pattern",
    "title": "构造器写出依赖，不要在方法里再 getBean",
    "lessonId": "spring-getbean-hides-deps",
    "summary": "依赖写在构造器上，缺了启动就失败。"
  },
  {
    "id": "mx-algo-stable-sort",
    "courseId": "pattern",
    "title": "对象排序稳定，基本类型排序不稳定，相等元素会不会换位要…",
    "lessonId": "algo-stable-sort",
    "summary": "稳定排序保住相等元素的相对顺序。"
  },
  {
    "id": "mx-hash-open-addressing-probe",
    "courseId": "pattern",
    "title": "开放定址不是“冲突了就放右边那个空位”",
    "lessonId": "hash-open-addressing-probe",
    "summary": "开放定址有线性、二次、双重散列，不是只有“下一个空位”。"
  },
  {
    "id": "mx-bfs",
    "courseId": "pattern",
    "title": "BFS、队列与最短步数",
    "lessonId": "bfs",
    "summary": "无权图边权都是 1 时，BFS 首次到达就是最少步数。"
  },
  {
    "id": "mx-jvm-method-area-metaspace",
    "courseId": "jvm",
    "title": "方法区是规范概念，不是永久代别名",
    "lessonId": "jvm-method-area-metaspace",
    "summary": "规范叫方法区；旧实现是永久代；现行 HotSpot 是 Metaspace。"
  },
  {
    "id": "mx-jvm-platform-classloader-not-ext",
    "courseId": "jvm",
    "title": "扩展类加载器在 JDK 9 起叫平台类加载器",
    "lessonId": "jvm-platform-classloader-not-ext",
    "summary": "现行中间层叫平台类加载器，不是 Extension。"
  },
  {
    "id": "mx-java-heap-not-cpp-manual",
    "courseId": "jvm",
    "title": "Java 堆不是 C++ 那套 new 完必须 del…",
    "lessonId": "java-heap-not-cpp-manual",
    "summary": "对象通常在堆，没有手动 free。"
  },
  {
    "id": "mx-jvm-gc-choice",
    "courseId": "jvm",
    "title": "先看暂停和接口耗时对不对得上，再谈换回收器",
    "lessonId": "jvm-gc-choice",
    "summary": "先抄同一次抖动里的 GC 暂停和接口耗时。"
  },
  {
    "id": "mx-java-soft-ref-not-oom-proof",
    "courseId": "jvm",
    "title": "软引用会在内存紧时清，但不能写成 OOM 前一定清光",
    "lessonId": "java-soft-ref-not-oom-proof",
    "summary": "软引用清掉仍可能不够，或失败发生在直接内存。"
  },
  {
    "id": "mx-jvm-tenuring-threshold-15",
    "courseId": "jvm",
    "title": "晋升年龄默认是 15，不是“挨过 16 次 Minor…",
    "lessonId": "jvm-tenuring-threshold-15",
    "summary": "默认晋升阈值看 MaxTenuringThreshold，常见默认 15。"
  },
  {
    "id": "mx-jvm-full-gc-not-permgen",
    "courseId": "jvm",
    "title": "Full GC 清的是堆，不是“永久代还在 HotSp…",
    "lessonId": "jvm-full-gc-not-permgen",
    "summary": "Full GC 收的是整个 Java 堆。"
  },
  {
    "id": "mx-jvm-major-gc-not-always-full",
    "courseId": "jvm",
    "title": "Major GC 有时只扫老年代，不等于 Full GC",
    "lessonId": "jvm-major-gc-not-always-full",
    "summary": "Young、Major/Old、Mixed、Full 扫的范围不同。"
  },
  {
    "id": "mx-jvm-cms-removed-g1-default",
    "courseId": "jvm",
    "title": "CMS 已经删掉，服务器默认不是它",
    "lessonId": "jvm-cms-removed-g1-default",
    "summary": "服务器默认已是 G1；CMS 已删除。"
  },
  {
    "id": "mx-jvm-safepoint",
    "courseId": "jvm",
    "title": "停顿发生在安全点，线程要跑到约定位置才能停",
    "lessonId": "jvm-safepoint",
    "summary": "停顿先等所有线程到安全点，再做回收。"
  },
  {
    "id": "mx-java-concurrency",
    "courseId": "conc",
    "title": "线程、可见性与原子性",
    "lessonId": "java-concurrency",
    "summary": "volatile 只保证看见这次写，不把读改写收成一步。"
  },
  {
    "id": "mx-java-lock-flexibility",
    "courseId": "conc",
    "title": "Lock 的优势不是“自带读写锁”",
    "lessonId": "java-lock-flexibility",
    "summary": "Lock 的优势是跨块、tryLock、可中断、Condition。"
  },
  {
    "id": "mx-java-wait-sleep",
    "courseId": "conc",
    "title": "wait 释放监视器，sleep 不释放",
    "lessonId": "java-wait-sleep",
    "summary": "wait 释放的是当前监视器；sleep 计时期间不放锁。"
  },
  {
    "id": "mx-java-barrier-latch",
    "courseId": "conc",
    "title": "CountDownLatch 一次性，CyclicBa…",
    "lessonId": "java-barrier-latch",
    "summary": "Latch 到零不能重置，第二轮要新建。"
  },
  {
    "id": "mx-java-aqs-not-futuretask",
    "courseId": "conc",
    "title": "AQS 管 state 和等待队列，FutureTas…",
    "lessonId": "java-aqs-not-futuretask",
    "summary": "AQS 仍是许多同步器的模板，但 FutureTask 现行实现已不基于它。"
  },
  {
    "id": "mx-java-cas-aba-stamp",
    "courseId": "conc",
    "title": "CAS 比的是此刻的值，ABA 要用版本戳",
    "lessonId": "java-cas-aba-stamp",
    "summary": "值变回 A 仍可能中间发生过变化。"
  },
  {
    "id": "mx-java-thread-six-states",
    "courseId": "conc",
    "title": "Thread.State 有六个值，不是运行就绪挂起结…",
    "lessonId": "java-thread-six-states",
    "summary": "Thread.State 是六个状态，没有“挂起”。"
  },
  {
    "id": "mx-java-executors-factory-oom",
    "courseId": "conc",
    "title": "Executors 工厂常带无界队列或无线程上限",
    "lessonId": "java-executors-factory-oom",
    "summary": "固定池常用无界队列，缓存池线程数无上限。"
  },
  {
    "id": "mx-java-tpe-execute-order",
    "courseId": "conc",
    "title": "ThreadPoolExecutor 是 execut…",
    "lessonId": "java-tpe-execute-order",
    "summary": "execute 会先建到 core、再入队，队列满才涨到 max。"
  },
  {
    "id": "mx-java-loom-not-absent-coroutine",
    "courseId": "conc",
    "title": "Java 已有虚拟线程，协程也不是“单线程所以不用锁”",
    "lessonId": "java-loom-not-absent-coroutine",
    "summary": "虚拟线程已由载体调度，可用多核。"
  },
  {
    "id": "mx-java-threads-not-linear-speedup",
    "courseId": "conc",
    "title": "十个线程不会把 100 毫秒变成 10 毫秒",
    "lessonId": "java-threads-not-linear-speedup",
    "summary": "只有能拆开且不抢同一资源时才接近线性。"
  },
  {
    "id": "mx-thread-pool-formula-not-law",
    "courseId": "conc",
    "title": "“线程数 = CPU×2”是启发式，不是容量定律",
    "lessonId": "thread-pool-formula-not-law",
    "summary": "核数×2 缺等待比和队列/拒绝策略。"
  },
  {
    "id": "mx-mysql-tradeoffs-capacity",
    "courseId": "sql",
    "title": "MySQL 优缺点与容量看缓冲池、查询与复制，没有万能…",
    "lessonId": "mysql-tradeoffs-capacity",
    "summary": "没有固定的“单库 QPS / 单表行数”定律。"
  },
  {
    "id": "mx-mysql-not-null-default-not-absolute",
    "courseId": "sql",
    "title": "“一律 NOT NULL 再塞默认值”会伪造未知",
    "lessonId": "mysql-not-null-default-not-absolute",
    "summary": "必填用不变量约束；可选允许 NULL，勿用空串/0 冒充未知。"
  },
  {
    "id": "mx-mysql-check-enforced-not-parsed-only",
    "courseId": "sql",
    "title": "CHECK 约束在现行 MySQL 会强制，不是“写了…",
    "lessonId": "mysql-check-enforced-not-parsed-only",
    "summary": "8.0.16+ 起 InnoDB 强制 CHECK。"
  },
  {
    "id": "mx-sql-outer-join-where",
    "courseId": "sql",
    "title": "外连接的条件写进 WHERE，就变成内连接",
    "lessonId": "sql-outer-join-where",
    "summary": "月份条件放在 ON 里时，没有订单的客户仍在结果中，右表是 NULL。"
  },
  {
    "id": "mx-mysql-join-ban-not-absolute",
    "courseId": "sql",
    "title": "“禁止 JOIN”是团队容量启发式，不是 SQL 真理",
    "lessonId": "mysql-join-ban-not-absolute",
    "summary": "有索引、过滤足够的小结果联结可接受。"
  },
  {
    "id": "mx-mysql-or-not-must-become-in",
    "courseId": "sql",
    "title": "OR 不是“旧版不能走索引、必须改成 IN”",
    "lessonId": "mysql-or-not-must-become-in",
    "summary": "同列多值 IN 更易读，计划常相近。"
  },
  {
    "id": "mx-mysql-where-having",
    "courseId": "sql",
    "title": "HAVING 不是带别名的 WHERE",
    "lessonId": "mysql-where-having",
    "summary": "WHERE 过滤可以使用索引，type 和 key 按这条行级条件来。"
  },
  {
    "id": "mx-mysql-text-ban-not-absolute",
    "courseId": "sql",
    "title": "“禁止 TEXT/BLOB”禁的是乱查大列，不是禁类型",
    "lessonId": "mysql-text-ban-not-absolute",
    "summary": "长正文用 TEXT（或等价）合理。"
  },
  {
    "id": "mx-mysql-float-ieee-not-8-digits",
    "courseId": "sql",
    "title": "FLOAT 不是八位十进制精度，DOUBLE 也不是十…",
    "lessonId": "mysql-float-ieee-not-8-digits",
    "summary": "FLOAT 大约 4 字节，十进制有效数字大约 7 位，划掉 8 位。"
  },
  {
    "id": "mx-mysql-json-not-document-db",
    "courseId": "sql",
    "title": "MySQL JSON 类型仍是关系行上的一列，不是文档…",
    "lessonId": "mysql-json-not-document-db",
    "summary": "JSON 列在关系行上存半结构化字段。"
  },
  {
    "id": "mx-mysql-view-is-stored-query",
    "courseId": "sql",
    "title": "视图是存起来的查询，不是默认物化的第二份表",
    "lessonId": "mysql-view-is-stored-query",
    "summary": "普通 VIEW 存查询定义，读时对基表现算。"
  },
  {
    "id": "mx-mysql-utf8-alias-not-utf8mb4",
    "courseId": "sql",
    "title": "“必须 UTF8”在 8.x 应对齐 utf8mb4",
    "lessonId": "mysql-utf8-alias-not-utf8mb4",
    "summary": "资料说的 UTF8 应对齐 utf8mb4。"
  },
  {
    "id": "mx-mysql-fk-ban-not-absolute",
    "courseId": "sql",
    "title": "“禁止外键”是并发启发式，不是完整性过时",
    "lessonId": "mysql-fk-ban-not-absolute",
    "summary": "高并发路径上外键有成本，但是启发式。"
  },
  {
    "id": "mx-mysql-phone-varchar-length-not-twenty",
    "courseId": "sql",
    "title": "“手机号必须 varchar(20)”把长度钉死了",
    "lessonId": "mysql-phone-varchar-length-not-twenty",
    "summary": "手机号长度没有固定“必须 20”的定律。"
  },
  {
    "id": "mx-mysql-catch-sql-exception-not-enough",
    "courseId": "sql",
    "title": "“必须捕获 SQL 异常”不够，还要可重试语义",
    "lessonId": "mysql-catch-sql-exception-not-enough",
    "summary": "只 catch SQLException 不够。"
  },
  {
    "id": "mx-table-design-from-facts",
    "courseId": "sql",
    "title": "表从一次提交后必须成立的事实长出来",
    "lessonId": "table-design-from-facts",
    "summary": "三件事实应能落到订单、明细和幂等键上，每件对应一种行。"
  },
  {
    "id": "mx-table-row-one-grain",
    "courseId": "sql",
    "title": "一行只表示一种东西，自增主键改变不了粒度",
    "lessonId": "table-row-one-grain",
    "summary": "订单一行、明细两行时，第三件商品是再插入一行明细，表结构不变。"
  },
  {
    "id": "mx-table-constraint-holds-rule",
    "courseId": "sql",
    "title": "不变量放进约束，不能只放在某一段 Java 判断里",
    "lessonId": "table-constraint-holds-rule",
    "summary": "只有 Java 查询时，两笔都可能插入，行数是 2。"
  },
  {
    "id": "mx-mysql-unique-change-buffer",
    "courseId": "sql",
    "title": "唯一索引写入通常用不上 change buffer",
    "lessonId": "mysql-unique-change-buffer",
    "summary": "查询路径上唯一和普通都可能走索引，快慢要看选择性和回表。"
  },
  {
    "id": "mx-mysql-implicit-convert-breaks-index",
    "courseId": "sql",
    "title": "“禁止隐式转换”针对的是错类型比较挡索引",
    "lessonId": "mysql-implicit-convert-breaks-index",
    "summary": "坏在字符串列对数字字面量，列被转换。"
  },
  {
    "id": "mx-mysql-where-func-blocks-index",
    "courseId": "sql",
    "title": "WHERE 里函数包住索引列，不是“SQL 里不许出现…",
    "lessonId": "mysql-where-func-blocks-index",
    "summary": "禁的是包住索引列导致无法范围匹配。"
  },
  {
    "id": "mx-mysql-generated-column-not-where-wrap",
    "courseId": "sql",
    "title": "生成列 / 函数索引是显式建模，不是 WHERE 里乱…",
    "lessonId": "mysql-generated-column-not-where-wrap",
    "summary": "生成列/函数索引是结构上为表达式建好的访问路径。"
  },
  {
    "id": "mx-mysql-count-star-innodb-not-always-scan",
    "courseId": "sql",
    "title": "“InnoDB 的 count(*) 一定扫全表”说满了",
    "lessonId": "mysql-count-star-innodb-not-always-scan",
    "summary": "无 WHERE 的精确总数昂贵可用汇总；有 WHERE 看索引。"
  },
  {
    "id": "mx-mysql-and-order-optimizer-reorders",
    "courseId": "sql",
    "title": "“AND 条件可乱序”靠的是优化器，不是不用管列序",
    "lessonId": "mysql-and-order-optimizer-reorders",
    "summary": "等值 AND 常可重排匹配索引。"
  },
  {
    "id": "mx-mysql-descending-index-not-sort-law",
    "courseId": "sql",
    "title": "降序索引是索引键方向选项，不是 “ORDER BY 随…",
    "lessonId": "mysql-descending-index-not-sort-law",
    "summary": "降序索引让索引顺序与某些 ORDER BY 对齐。"
  },
  {
    "id": "mx-mysql-slow-sql-locate",
    "courseId": "sql",
    "title": "慢 SQL 先按累计耗时定位，再拿去看执行计划",
    "lessonId": "mysql-slow-sql-locate",
    "summary": "按总耗时排序时，高频的 50 毫秒应排在偶发的 3 秒前面。"
  },
  {
    "id": "mx-mysql-resource-group-not-os-cgroup",
    "courseId": "sql",
    "title": "Resource Group 是线程 CPU/优先级绑…",
    "lessonId": "mysql-resource-group-not-os-cgroup",
    "summary": "Resource Group 管的是服务器内线程与 CPU 亲和/优先级。"
  },
  {
    "id": "mx-mysql-mvcc-not-two-version-columns",
    "courseId": "sql",
    "title": "InnoDB MVCC 不是“行尾两个创建/删除版本列…",
    "lessonId": "mysql-mvcc-not-two-version-columns",
    "summary": "旧版本主要在 undo；一致性读用 Read View 判断可见性。"
  },
  {
    "id": "mx-mysql-isolation-levels",
    "courseId": "sql",
    "title": "隔离级别：RR 默认，幻读要分清读法",
    "lessonId": "mysql-isolation-levels",
    "summary": "默认隔离级别是 REPEATABLE READ。"
  },
  {
    "id": "mx-postgresql-read-committed-vacuum",
    "courseId": "sql",
    "title": "PostgreSQL 默认是读已提交，旧行要等 VAC…",
    "lessonId": "postgresql-read-committed-vacuum",
    "summary": "〔读已提交｜一条语句只看见它开始之前已经提交的数据〕是 PostgreSQL 的默认隔离级别。"
  },
  {
    "id": "mx-mysql-skip-locked-not-queue",
    "courseId": "sql",
    "title": "SKIP LOCKED 是跳过已锁行，不是开箱即用的任…",
    "lessonId": "mysql-skip-locked-not-queue",
    "summary": "SKIP LOCKED 只是锁定读跳过已锁行。"
  },
  {
    "id": "mx-mysql-upsert",
    "courseId": "sql",
    "title": "ON DUPLICATE KEY UPDATE 依赖唯…",
    "lessonId": "mysql-upsert",
    "summary": "冲突时更新还是忽略，要写清语义。"
  },
  {
    "id": "mx-mysql-myisam-innodb",
    "courseId": "sql",
    "title": "MyISAM 与 InnoDB：默认引擎与隐藏行 ID",
    "lessonId": "mysql-myisam-innodb",
    "summary": "SHOW ENGINES 和建表默认值应看到 InnoDB。"
  },
  {
    "id": "mx-mysql-binlog-format",
    "courseId": "sql",
    "title": "Binlog 复制格式：ROW 才是当前默认值",
    "lessonId": "mysql-binlog-format",
    "summary": "binlog 格式影响复制与回放。"
  },
  {
    "id": "mx-mysql-replica-parallel-applier",
    "courseId": "sql",
    "title": "从库应用不再只能是一条 SQL 线程（MySQL 8.…",
    "lessonId": "mysql-replica-parallel-applier",
    "summary": "从库可以用多个 worker 按逻辑时钟并行应用。"
  },
  {
    "id": "mx-mysql-redo-undo-binlog",
    "courseId": "sql",
    "title": "redo/undo/binlog 不是同一本日记",
    "lessonId": "mysql-redo-undo-binlog",
    "summary": "redo 用于崩溃后重做已提交变更，不可换成复制日志。"
  },
  {
    "id": "mx-mysql-autoinc-persists-8",
    "courseId": "sql",
    "title": "InnoDB 自增重启后不再从空洞里捡号，是 8.0 …",
    "lessonId": "mysql-autoinc-persists-8",
    "summary": "8.0 起最大计数值写入 redo，并在检查点进入数据字典。"
  },
  {
    "id": "mx-redis-geo-on-zset-not-gis",
    "courseId": "cache",
    "title": "GEO 是经纬度索引的快捷命令，不是完整空间数据库",
    "lessonId": "redis-geo-on-zset-not-gis",
    "summary": "GEO 擅长点与半径/盒的近似附近查。"
  },
  {
    "id": "mx-redis-hyperloglog-approx",
    "courseId": "cache",
    "title": "HyperLogLog 只估基数，不保存每个元素",
    "lessonId": "redis-hyperloglog-approx",
    "summary": "近似 UV 用 HyperLogLog。"
  },
  {
    "id": "mx-cache-aside-steps",
    "courseId": "cache",
    "title": "旁路缓存（Cache Aside）：读时回填，写时删掉",
    "lessonId": "cache-aside-steps",
    "summary": "旁路缓存（Cache Aside）常见用 Redis（或 Memcached）作缓存服务，应用用客户端管 GET/SET/DEL。"
  },
  {
    "id": "mx-cache-db-double-write-race",
    "courseId": "cache",
    "title": "先写库再删缓存仍可能读到旧值，双写要谈竞态",
    "lessonId": "cache-db-double-write-race",
    "summary": "先改库还是先改缓存，并发下都会有窗口。"
  },
  {
    "id": "mx-redis-hello-resp3-not-just-version",
    "courseId": "cache",
    "title": "HELLO/RESP3 换的是协议能力面，不是“版本号…",
    "lessonId": "redis-hello-resp3-not-just-version",
    "summary": "RESP3 需 HELLO 等协商，且链路组件都要支持。"
  },
  {
    "id": "mx-redis-client-no-touch-not-expire-off",
    "courseId": "cache",
    "title": "CLIENT NO-TOUCH 是别碰键的空闲时间，不…",
    "lessonId": "redis-client-no-touch-not-expire-off",
    "summary": "NO-TOUCH 避免访问刷新热度/空闲。"
  },
  {
    "id": "mx-redis-eviction-policy-menu",
    "courseId": "cache",
    "title": "内存满了不是只会 LRU，也不是只有旧的六种名字",
    "lessonId": "redis-eviction-policy-menu",
    "summary": "对照现行淘汰文档列出政策名，不要停在旧的六项。"
  },
  {
    "id": "mx-cache-local-vs-distributed",
    "courseId": "cache",
    "title": "本地缓存最快但不能跨进程，Redis 单机也不是“本地…",
    "lessonId": "cache-local-vs-distributed",
    "summary": "进程内举例是 Caffeine，独立缓存服务举例是 Redis。"
  },
  {
    "id": "mx-redis-list-quicklist-listpack",
    "courseId": "cache",
    "title": "List 早已不是“双向链表或压缩列表”二选一那么简单…",
    "lessonId": "redis-list-quicklist-listpack",
    "summary": "3.2 起 List 用 quicklist。"
  },
  {
    "id": "mx-redis-sentinel-cluster",
    "courseId": "cache",
    "title": "哨兵管主从故障切换，集群才把键拆到多台",
    "lessonId": "redis-sentinel-cluster",
    "summary": "先写下当前是单机、哨兵还是集群。"
  },
  {
    "id": "mx-redis-repl-psync-not-sql",
    "courseId": "cache",
    "title": "主从复制传的是 RDB 和命令流，不是 MySQL 的…",
    "lessonId": "redis-repl-psync-not-sql",
    "summary": "全量传的是 RDB 快照，增量传的是快照之后的 Redis 写命令。"
  },
  {
    "id": "mx-redis-repl-link-down-not-fatal",
    "courseId": "cache",
    "title": "复制链路 down 是断线重连窗口，不是进程 FATA…",
    "lessonId": "redis-repl-link-down-not-fatal",
    "summary": "master_link_status:down 是复制连接断开，进程常仍在。"
  },
  {
    "id": "mx-redis-aof-keeps-rdb",
    "courseId": "cache",
    "title": "打开 AOF 不会让 RDB 退役",
    "lessonId": "redis-aof-keeps-rdb",
    "summary": "重启时若 AOF 开着就优先 AOF。"
  },
  {
    "id": "mx-redis-proxy-hash-not-cluster",
    "courseId": "cache",
    "title": "Twemproxy 取模分片不是 Redis Clus…",
    "lessonId": "redis-proxy-hash-not-cluster",
    "summary": "代理取模分的是独立实例，客户端常只看见代理。"
  },
  {
    "id": "mx-redis-cluster-incr-not-five-steps",
    "courseId": "cache",
    "title": "Redis Cluster 不会把 INCR 拆成五台…",
    "lessonId": "redis-cluster-incr-not-five-steps",
    "summary": "同一个键只落在一台主上，故障转移继续这份计数。"
  },
  {
    "id": "mx-redis-functions-not-just-eval",
    "courseId": "cache",
    "title": "Redis Functions 是注册后的库，不是每次…",
    "lessonId": "redis-functions-not-just-eval",
    "summary": "Functions 先注册进服务端库再 FCALL，可随持久化带走。"
  },
  {
    "id": "mx-redis-acl-not-just-requirepass",
    "courseId": "cache",
    "title": "Redis ACL 按用户裁命令与键，不是只设一个 r…",
    "lessonId": "redis-acl-not-just-requirepass",
    "summary": "ACL 可按用户限制命令集与键/频道模式。"
  },
  {
    "id": "mx-redis-acl-dryrun-not-enforce",
    "courseId": "cache",
    "title": "ACL DRYRUN 是演练命令是否被允许，不是已经生…",
    "lessonId": "redis-acl-dryrun-not-enforce",
    "summary": "DRYRUN 模拟某用户是否被允许某命令。"
  },
  {
    "id": "mx-redis-command-getkeys-not-acl",
    "courseId": "cache",
    "title": "COMMAND GETKEYS 解析的是命令里的键，不…",
    "lessonId": "redis-command-getkeys-not-acl",
    "summary": "GETKEYS 解析命令涉及的键。"
  },
  {
    "id": "mx-redis-keyspace-notify-not-queue",
    "courseId": "cache",
    "title": "键空间通知是 Pub/Sub 信号，不是可靠工作队列",
    "lessonId": "redis-keyspace-notify-not-queue",
    "summary": "键空间通知走 Pub/Sub，无历史无确认。"
  },
  {
    "id": "mx-redis-sharded-pubsub-not-cluster-queue",
    "courseId": "cache",
    "title": "分片 Pub/Sub 摊的是发布路径，不是把 Pub/…",
    "lessonId": "redis-sharded-pubsub-not-cluster-queue",
    "summary": "它优化 Cluster 上的发布扇出。"
  },
  {
    "id": "mx-spring-ioc-wiring",
    "courseId": "spring",
    "title": "容器先造对象，再按类型或名字注入依赖",
    "lessonId": "spring-ioc-wiring",
    "summary": "找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"
  },
  {
    "id": "mx-spring-scope-catalog",
    "courseId": "spring",
    "title": "Spring 内建作用域：别背 global-sess…",
    "lessonId": "spring-scope-catalog",
    "summary": "现行内建作用域是 singleton、prototype，Web 还有 request、session、application、websocket。"
  },
  {
    "id": "mx-spring-boot-war-still-ok",
    "courseId": "spring",
    "title": "Boot 能内嵌 Tomcat，也可以打 WAR 外置",
    "lessonId": "spring-boot-war-still-ok",
    "summary": "默认可执行 jar，需要外置容器时仍可打 WAR。"
  },
  {
    "id": "mx-spring-boot3-autoconfig-imports",
    "courseId": "spring",
    "title": "Boot 3 自动配置不再靠 spring.facto…",
    "lessonId": "spring-boot3-autoconfig-imports",
    "summary": "Boot 3 的清单在 AutoConfiguration.imports。"
  },
  {
    "id": "mx-tomcat-nio-not-bio-default",
    "courseId": "spring",
    "title": "现行 Tomcat HTTP 连接器默认是 NIO，不…",
    "lessonId": "tomcat-nio-not-bio-default",
    "summary": "HTTP/1.1 默认是 NIO，不是 BIO。"
  },
  {
    "id": "mx-spring-xmlbeanfactory-removed",
    "courseId": "spring",
    "title": "XmlBeanFactory 已删除，别把容器说成只有…",
    "lessonId": "spring-xmlbeanfactory-removed",
    "summary": "入口是 ApplicationContext。"
  },
  {
    "id": "mx-spring-mvc-dispatch",
    "courseId": "spring",
    "title": "过滤器、拦截器和控制器不是同一层",
    "lessonId": "spring-mvc-dispatch",
    "summary": "Filter 在 DispatcherServlet 之外。"
  },
  {
    "id": "mx-spring-mvc-exception",
    "courseId": "spring",
    "title": "控制器里抛出的异常要变成契约里的 HTTP 响应，不要…",
    "lessonId": "spring-mvc-exception",
    "summary": "业务异常若没被收成契约 JSON，容器会吐 HTML 错误页。"
  },
  {
    "id": "mx-spring-validation-binding",
    "courseId": "spring",
    "title": "校验发生在绑定之后，失败要变成 400 而不是业务异常",
    "lessonId": "spring-validation-binding",
    "summary": "有 @Valid 且不接 BindingResult 时，缺字段直接 400。"
  },
  {
    "id": "mx-spring-mvc-restcontroller",
    "courseId": "spring",
    "title": "@RestController 可以替代只返回 JSO…",
    "lessonId": "spring-mvc-restcontroller",
    "summary": "@RestController 就是 @Controller 加 @ResponseBody，可以返回 JSON。"
  },
  {
    "id": "mx-spring-mvc-controller-singleton",
    "courseId": "spring",
    "title": "Controller 默认单例，可变字段会串请求",
    "lessonId": "spring-mvc-controller-singleton",
    "summary": "Controller 默认单例，请求状态不能放实例字段。"
  },
  {
    "id": "mx-spring-aop-self-invocation",
    "courseId": "spring",
    "title": "同类里 this.方法() 不会再进一次代理",
    "lessonId": "spring-aop-self-invocation",
    "summary": "this.方法() 不经过代理，上面的事务/切面可能没有。"
  },
  {
    "id": "mx-spring-boot-aop-cglib-default",
    "courseId": "spring",
    "title": "Spring Boot 默认按类做 CGLIB 代理",
    "lessonId": "spring-boot-aop-cglib-default",
    "summary": "Boot 默认常走 CGLIB，不是“有接口就一定 JDK”。"
  },
  {
    "id": "mx-spring-transaction",
    "courseId": "spring",
    "title": "Spring 事务边界",
    "lessonId": "spring-transaction",
    "summary": "同类 this 调用另一个 @Transactional 方法时不经过代理，事务包不住。"
  },
  {
    "id": "mx-mybatis-enter-mapper",
    "courseId": "spring",
    "title": "映射器接口绑到一条语句，调用才执行",
    "lessonId": "mybatis-enter-mapper",
    "summary": "MyBatis 给这个接口做绑定。"
  },
  {
    "id": "mx-mybatis-dynamic-sql",
    "courseId": "spring",
    "title": "动态 SQL 用标签拼结构，值仍走占位符",
    "lessonId": "mybatis-dynamic-sql",
    "summary": "可选条件用动态标签拼结构，值仍用占位符。"
  },
  {
    "id": "mx-mybatis-type-handler",
    "courseId": "spring",
    "title": "Java 类型和 JDBC 类型对不上时，用 Type…",
    "lessonId": "mybatis-type-handler",
    "summary": "库类型和 Java 类型之间要成对的 TypeHandler。"
  },
  {
    "id": "mx-mybatis-lazy-javassist-not-cglib",
    "courseId": "spring",
    "title": "延迟加载默认不是 CGLIB，空关联才会再发 SQL",
    "lessonId": "mybatis-lazy-javassist-not-cglib",
    "summary": "默认代理工厂是 JAVASSIST，不是一定 CGLIB。"
  },
  {
    "id": "mx-mybatis-local-cache",
    "courseId": "spring",
    "title": "一级缓存只活在同一次会话里，二级缓存要额外打开",
    "lessonId": "mybatis-local-cache",
    "summary": "一级缓存跟同一次 SqlSession。"
  },
  {
    "id": "mx-mybatis-batch-executor",
    "courseId": "spring",
    "title": "批量执行器把多条写语句收在一起发",
    "lessonId": "mybatis-batch-executor",
    "summary": "BATCH 把写语句攒到 flush 再发，减少往返。"
  },
  {
    "id": "mx-mybatis-rowbounds-memory",
    "courseId": "spring",
    "title": "RowBounds 默认是结果集上跳过，不是数据库 L…",
    "lessonId": "mybatis-rowbounds-memory",
    "summary": "默认 RowBounds 仍可能先把大结果读回再跳过。"
  },
  {
    "id": "mx-mybatis-second-cache",
    "courseId": "spring",
    "title": "二级缓存跨会话，默认往往得不偿失",
    "lessonId": "mybatis-second-cache",
    "summary": "二级缓存在 namespace 上跨会话，提交后才对其它会话可见。"
  },
  {
    "id": "mx-mybatis-log-preparing-parameters",
    "courseId": "spring",
    "title": "打印 SQL 时 DEBUG 打出 Preparing…",
    "lessonId": "mybatis-log-preparing-parameters",
    "summary": "DEBUG 下语句带问号，参数在下一行。"
  },
  {
    "id": "mx-mybatis-debug-boundsql",
    "courseId": "spring",
    "title": "SQL 断点打在带 BoundSql 的 Execut…",
    "lessonId": "mybatis-debug-boundsql",
    "summary": "Mapper 接口没有方法体，断点打在接口上进不去。"
  },
  {
    "id": "mx-mybatis-pagehelper-next-query",
    "courseId": "spring",
    "title": "PageHelper.startPage 只分页本线程…",
    "lessonId": "mybatis-pagehelper-next-query",
    "summary": "startPage 只影响之后第一条查询。"
  },
  {
    "id": "mx-mybatis-plus-page-argument",
    "courseId": "spring",
    "title": "MyBatis-Plus 用 Page 参数分页，不要…",
    "lessonId": "mybatis-plus-page-argument",
    "summary": "分页拦截器与手写 LIMIT 叠在一起会双 LIMIT。"
  },
  {
    "id": "mx-mybatis-middleware-layers",
    "courseId": "spring",
    "title": "中间件按层分工：日志、分页、池、选库、分片",
    "lessonId": "mybatis-middleware-layers",
    "summary": "先分清谁改连接、谁改 SQL、谁让你看见最终语句。"
  },
  {
    "id": "mx-jpa-what-it-is",
    "courseId": "spring",
    "title": "JPA 是管理关系数据与实体的持久化规范",
    "lessonId": "jpa-what-it-is",
    "summary": "用 Jakarta Persistence，也就是 JPA。"
  },
  {
    "id": "mx-jpa-enter-entity",
    "courseId": "spring",
    "title": "实体进持久化上下文，才被会话管理",
    "lessonId": "jpa-enter-entity",
    "summary": "persist 或由查询加载之后。"
  },
  {
    "id": "mx-jpa-not-mybatis",
    "courseId": "spring",
    "title": "JPA 管实体，MyBatis 管你写的 SQL",
    "lessonId": "jpa-not-mybatis",
    "summary": "JPA 的主模型是实体和持久化上下文。"
  },
  {
    "id": "mx-jpa-entity-identity",
    "courseId": "spring",
    "title": "实体身份靠主键，不等于数据库里的一行快照",
    "lessonId": "jpa-entity-identity",
    "summary": "同一上下文里同号实体是同一个；事务外 new 两个同号仍不相等。"
  },
  {
    "id": "mx-jpa-page-vs-slice",
    "courseId": "spring",
    "title": "Page 会再查一遍总数，只要下一页有没有时用 Sli…",
    "lessonId": "jpa-page-vs-slice",
    "summary": "Page 会多一次 COUNT。"
  },
  {
    "id": "mx-jpa-modifying-clear",
    "courseId": "spring",
    "title": "@Modifying 的批量改写不会自动更新内存里的实体",
    "lessonId": "jpa-modifying-clear",
    "summary": "批量 @Query 改的是库，内存里的托管实体不会自动变。"
  },
  {
    "id": "mx-es-vs-db-search",
    "courseId": "spring",
    "title": "DB 的 LIKE 与 ES 检索解决的不是同一类问题",
    "lessonId": "es-vs-db-search",
    "summary": "LIKE 能出结果也不等于检索系统。"
  },
  {
    "id": "mx-elastic-analysis",
    "courseId": "spring",
    "title": "全文检索的分词与映射",
    "lessonId": "elastic-analysis",
    "summary": "匹配不到先看 mapping 与分析器。"
  },
  {
    "id": "mx-es-search-after",
    "courseId": "spring",
    "title": "深分页不要用 from 跳过前面的命中",
    "lessonId": "es-search-after",
    "summary": "深分页用 search_after，不要巨大 from。"
  },
  {
    "id": "mx-es-custom-routing",
    "courseId": "spring",
    "title": "自定义 routing 把相关文档放到同一分片，查错分…",
    "lessonId": "es-custom-routing",
    "summary": "写入用的 routing 读取也要用。"
  },
  {
    "id": "mx-browser-security-what",
    "courseId": "secure",
    "title": "浏览器安全管的是谁能读凭证、谁能跑脚本",
    "lessonId": "browser-security-what",
    "summary": "谁能读到登录凭证，谁能在页面里跑脚本。"
  },
  {
    "id": "mx-csrf-boundary",
    "courseId": "secure",
    "title": "CORS 管不了跨站带凭证提交",
    "lessonId": "csrf-boundary",
    "summary": "脚本读跨源响应这条路归 CORS：没有允许的源，脚本拿不到响应体。"
  },
  {
    "id": "mx-csp-script-src",
    "courseId": "secure",
    "title": "CSP 白名单限制脚本从哪来，不是代替转义 HTML",
    "lessonId": "csp-script-src",
    "summary": "只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。"
  },
  {
    "id": "mx-csp-report-only-not-enforce",
    "courseId": "secure",
    "title": "Report-Only 只上报违例，不会替你拦住脚本",
    "lessonId": "csp-report-only-not-enforce",
    "summary": "Report-Only 只报告不拦截。"
  },
  {
    "id": "mx-trusted-types-sink-guard",
    "courseId": "secure",
    "title": "Trusted Types 卡住危险汇点，不是替你洗掉…",
    "lessonId": "trusted-types-sink-guard",
    "summary": "卡住未经策略包装的危险汇点赋值。"
  },
  {
    "id": "mx-document-policy-not-permissions-policy",
    "courseId": "secure",
    "title": "Document-Policy 管文档行为预算，不是 …",
    "lessonId": "document-policy-not-permissions-policy",
    "summary": "Permissions-Policy 按来源开关能力。"
  },
  {
    "id": "mx-referrer-policy-leak-bound",
    "courseId": "secure",
    "title": "Referrer-Policy 管带多少来源信息，不是…",
    "lessonId": "referrer-policy-leak-bound",
    "summary": "主要限制 Referer 泄露多少。"
  },
  {
    "id": "mx-clear-site-data-not-full-logout",
    "courseId": "secure",
    "title": "Clear-Site-Data 清浏览器存的数据，不是…",
    "lessonId": "clear-site-data-not-full-logout",
    "summary": "清的是浏览器侧该源的 Cookie/存储/缓存等。"
  },
  {
    "id": "mx-pna-private-network-access",
    "courseId": "secure",
    "title": "公网站点访问内网要过 Private Network …",
    "lessonId": "pna-private-network-access",
    "summary": "PNA 拦的是更公开上下文访问更私有网络。"
  },
  {
    "id": "mx-fenced-frame-embed-boundary",
    "courseId": "secure",
    "title": "Fenced Frame 是更严的嵌入边界，不是 if…",
    "lessonId": "fenced-frame-embed-boundary",
    "summary": "Fenced Frame 强调与嵌入方的信息隔离，服务隐私广告等场景。"
  },
  {
    "id": "mx-attribution-reporting-not-cookie",
    "courseId": "secure",
    "title": "Attribution Reporting 是浏览器归…",
    "lessonId": "attribution-reporting-not-cookie",
    "summary": "ARA 交付受约束的归因报告（常含延迟与噪声）。"
  },
  {
    "id": "mx-storage-access-api-not-cookie-restore",
    "courseId": "secure",
    "title": "Storage Access API 是嵌入方按需申请…",
    "lessonId": "storage-access-api-not-cookie-restore",
    "summary": "嵌入第三方在用户手势等条件下申请自己的存储访问。"
  },
  {
    "id": "mx-fedcm-not-oauth-popup",
    "courseId": "secure",
    "title": "FedCM 是浏览器中介的联合登录，不是自家 OAut…",
    "lessonId": "fedcm-not-oauth-popup",
    "summary": "FedCM 由浏览器中介联合登录流程。"
  },
  {
    "id": "mx-topics-api-not-cookie-segments",
    "courseId": "secure",
    "title": "Topics API 给的是粗兴趣主题，不是旧 Coo…",
    "lessonId": "topics-api-not-cookie-segments",
    "summary": "Topics 交付粗粒度、受约束的兴趣主题。"
  },
  {
    "id": "mx-shared-storage-not-third-party-cookie",
    "courseId": "secure",
    "title": "Shared Storage 是受限跨站存储工作台，不…",
    "lessonId": "shared-storage-not-third-party-cookie",
    "summary": "Shared Storage 是受限跨站存储与选择/聚合工作台。"
  },
  {
    "id": "mx-private-state-tokens-not-cookie",
    "courseId": "secure",
    "title": "Private State Tokens 是有限信任凭…",
    "lessonId": "private-state-tokens-not-cookie",
    "summary": "PST 证明有限的信任/检查结果。"
  },
  {
    "id": "mx-protected-audience-not-cookie-remarketing",
    "courseId": "secure",
    "title": "Protected Audience 是设备侧兴趣群组…",
    "lessonId": "protected-audience-not-cookie-remarketing",
    "summary": "PA 以设备侧兴趣群组与受限竞价为核心。"
  },
  {
    "id": "mx-related-website-sets-not-cookie-restore",
    "courseId": "secure",
    "title": "Related Website Sets 只降低同组申…",
    "lessonId": "related-website-sets-not-cookie-restore",
    "summary": "RWS 降低同组内 Storage Access 申请的提示摩擦。"
  },
  {
    "id": "mx-bounce-tracking-mitigation-not-session-bug",
    "courseId": "secure",
    "title": "跳转追踪缓解会清短访站点的状态，不是浏览器随机登出",
    "lessonId": "bounce-tracking-mitigation-not-session-bug",
    "summary": "缓解针对短访跳转追踪链上的状态。"
  },
  {
    "id": "mx-reduced-ua-not-stable-device-id",
    "courseId": "secure",
    "title": "削减后的 User-Agent 字符串还在，但不能当稳…",
    "lessonId": "reduced-ua-not-stable-device-id",
    "summary": "削减后 UA 仍可能存在但更粗、更不适合当设备主键。"
  },
  {
    "id": "mx-http-request-enters",
    "courseId": "secure",
    "title": "fetch 发出请求，响应体按 Content-Typ…",
    "lessonId": "http-request-enters",
    "summary": "它发出 HTTP 请求，返回响应。"
  },
  {
    "id": "mx-http-methods",
    "courseId": "secure",
    "title": "HTTP 方法：安全与幂等",
    "lessonId": "http-methods",
    "summary": "POST 在 RFC 9110 的方法表里不幂等。"
  },
  {
    "id": "mx-http-create-post-not-put",
    "courseId": "secure",
    "title": "创建资源默认用 POST，不要把插入背成 PUT",
    "lessonId": "http-create-post-not-put",
    "summary": "服务分配 id 的创建用 POST 到集合，返回新 URI。"
  },
  {
    "id": "mx-http-content-type-body",
    "courseId": "secure",
    "title": "Content-Type 要和请求体格式一致",
    "lessonId": "http-content-type-body",
    "summary": "JSON：application/json + stringify。"
  },
  {
    "id": "mx-http-status-auth",
    "courseId": "secure",
    "title": "401 是没证明身份，403 是不许做",
    "lessonId": "http-status-auth",
    "summary": "未登录应返回 401，客户端下一步是按认证方式重新证明身份。"
  },
  {
    "id": "mx-fetch-credentials",
    "courseId": "secure",
    "title": "跨源 Cookie 要两边一起允许",
    "lessonId": "fetch-credentials",
    "summary": "默认凭证只在同源请求带 Cookie，跨源请求头里没有。"
  },
  {
    "id": "mx-api-error-contract",
    "courseId": "secure",
    "title": "失败必须是一份契约，不能只靠状态码口头约定（RFC 9…",
    "lessonId": "api-error-contract",
    "summary": "校验字段用 400，正文类型指向字段错误，页面指到该字段。"
  },
  {
    "id": "mx-http-patch-rfc5789",
    "courseId": "secure",
    "title": "PATCH 不是 HTTP/1.1 核心那六个方法里的…",
    "lessonId": "http-patch-rfc5789",
    "summary": "PATCH 来自 RFC 5789，不是 HTTP/1.1 核心六方法之一。"
  },
  {
    "id": "mx-cookie-prefix-partitioned",
    "courseId": "secure",
    "title": "__Host- / __Secure- 前缀与 Par…",
    "lessonId": "cookie-prefix-partitioned",
    "summary": "__Host- 还要求无 Domain、Path=/。"
  },
  {
    "id": "mx-ajax-page-update-not-a-library",
    "courseId": "secure",
    "title": "Ajax 是不刷新整页的请求，不是库名",
    "lessonId": "ajax-page-update-not-a-library",
    "summary": "链接跳转时地址变了，当前文档卸载。"
  },
  {
    "id": "mx-fetch-method-body-timeout",
    "courseId": "secure",
    "title": "一次 fetch 要写明方法、JSON 正文和截止时间",
    "lessonId": "fetch-method-body-timeout",
    "summary": "错误写法的方法是 GET，或正文不是 JSON 字符串，服务器读不到 sku。"
  },
  {
    "id": "mx-fetch-response-body-once",
    "courseId": "secure",
    "title": "响应体是一次性流，读过就不能再 json() 一遍",
    "lessonId": "fetch-response-body-once",
    "summary": "每种读取方法都会消费掉 body 流。"
  },
  {
    "id": "mx-axios-rejects-http-errors",
    "courseId": "secure",
    "title": "Axios 把非 2xx 收成拒绝，数据在 respo…",
    "lessonId": "axios-rejects-http-errors",
    "summary": "200 进 then，订单 id 在 data.id，不在返回值顶层。"
  },
  {
    "id": "mx-tcp-is-l4-not-http-handshake",
    "courseId": "secure",
    "title": "TCP 在传输层，三次握手不是 HTTP 的七层",
    "lessonId": "tcp-is-l4-not-http-handshake",
    "summary": "五层里 TCP 在传输层，HTTP 在应用层。"
  },
  {
    "id": "mx-https-port-443-not-80",
    "courseId": "secure",
    "title": "HTTPS 默认 443，HTTP 才是 80，握手也…",
    "lessonId": "https-port-443-not-80",
    "summary": "HTTP 默认 TCP 80，HTTPS 默认 TCP 443。"
  },
  {
    "id": "mx-tcp-reliable-not-never-lose",
    "courseId": "secure",
    "title": "TCP 尽力可靠，不是应用层永不丢包",
    "lessonId": "tcp-reliable-not-never-lose",
    "summary": "连接存活时，TCP 用校验和、序号、确认和重传，把字节流按顺序交给应用。"
  },
  {
    "id": "mx-spring-security-what",
    "courseId": "secure",
    "title": "Spring Security 是认证和授权的框架",
    "lessonId": "spring-security-what",
    "summary": "是 Spring Security。"
  },
  {
    "id": "mx-spring-oauth2-resource",
    "courseId": "secure",
    "title": "资源服务器校验令牌，不是再做一遍登录表单",
    "lessonId": "spring-oauth2-resource",
    "summary": "Bearer API 是资源服务器校验令牌。"
  },
  {
    "id": "mx-oidc-id-token-pkce",
    "courseId": "secure",
    "title": "OpenID Connect 用 ID Token 表…",
    "lessonId": "oidc-id-token-pkce",
    "summary": "登录结果在〔ID Token｜发给客户端、声明这次登录的 JWT〕里。"
  },
  {
    "id": "mx-sshd-rate-limit-not-lastb",
    "courseId": "secure",
    "title": "SSH 防爆破用 sshd 和限流，不要靠 lastb…",
    "lessonId": "sshd-rate-limit-not-lastb",
    "summary": "靠 lastb 计数再 iptables 不可靠。"
  },
  {
    "id": "mx-spring-csrf-spa",
    "courseId": "secure",
    "title": "Cookie 会话的浏览器请求仍要防 CSRF，SPA…",
    "lessonId": "spring-csrf-spa",
    "summary": "Cookie 会话仍要 CSRF。"
  },
  {
    "id": "mx-spring-session-stateless",
    "courseId": "secure",
    "title": "无状态 API 不要再为每次 Bearer 请求创建会话",
    "lessonId": "spring-session-stateless",
    "summary": "STATELESS 不再发会话 Cookie。"
  },
  {
    "id": "mx-jwt-payload-not-encrypted",
    "courseId": "secure",
    "title": "JWT 载荷是编码不是加密，改密钥才算作废所有票",
    "lessonId": "jwt-payload-not-encrypted",
    "summary": "未加密 JWT 的 payload 可直接解码阅读，不是密文。"
  },
  {
    "id": "mx-netty-not-spring-mvc",
    "courseId": "secure",
    "title": "Netty 不管控制器和事务，Spring MVC 不…",
    "lessonId": "netty-not-spring-mvc",
    "summary": "MVC 处理 HTTP 请求和控制器。"
  },
  {
    "id": "mx-netty-bytebuf-leak",
    "courseId": "secure",
    "title": "ByteBuf 要释放，泄漏会吃掉堆外内存",
    "lessonId": "netty-bytebuf-leak",
    "summary": "Direct buffer 在堆外。"
  },
  {
    "id": "mx-epoll-et-must-drain",
    "courseId": "secure",
    "title": "边沿触发要把缓冲读干，剩下的不会再敲门",
    "lessonId": "epoll-et-must-drain",
    "summary": "边缘触发只在状态变化时通知一次。"
  },
  {
    "id": "mx-nginx-vs-gateway",
    "courseId": "nginx",
    "title": "Nginx 转上游，网关问这个接口让不让过",
    "lessonId": "nginx-vs-gateway",
    "summary": "还要看第三问：这个接口让不让过。"
  },
  {
    "id": "mx-nginx-request-phases",
    "courseId": "nginx",
    "title": "请求在 Nginx 里先选 server，再选 loc…",
    "lessonId": "nginx-request-phases",
    "summary": "location 有匹配优先级。"
  },
  {
    "id": "mx-nginx-ip-hash-session",
    "courseId": "nginx",
    "title": "Nginx 默认轮询，ip_hash 只是按客户端地址…",
    "lessonId": "nginx-ip-hash-session",
    "summary": "ip_hash 在 NAT 下会粘偏。"
  },
  {
    "id": "mx-gateway-one-hop",
    "courseId": "gateway",
    "title": "网关是明确的一跳，不是所有服务旁边各做一遍",
    "lessonId": "gateway-one-hop",
    "summary": "网关挡入口，对象级授权仍在服务里。"
  },
  {
    "id": "mx-mq-pick-workload",
    "courseId": "mq",
    "title": "已经在运维的消息集群先留下",
    "lessonId": "mq-pick-workload",
    "summary": "仓库已经在跑 Kafka 时，发信和关单先留在这一套里：发信用业务键幂等，关单用订单表的到期时间。"
  },
  {
    "id": "mx-mq-consume-idempotent-key",
    "courseId": "mq",
    "title": "消费幂等靠库唯一键不要只靠 SETNX",
    "lessonId": "mq-consume-idempotent-key",
    "summary": "占位成功后、写库前若崩溃：键还在会挡住重投，库里却没流水（丢处理）；键过期了又可能写两次。"
  },
  {
    "id": "mx-mq-backlog-expand-queues",
    "courseId": "mq",
    "title": "堆积时加消费者，受分区或队列数上限",
    "lessonId": "mq-backlog-expand-queues",
    "summary": "消费者数大于队列数时，多出来的实例预测空转，领不到分区或队列。"
  },
  {
    "id": "mx-kafka-isr-hwm",
    "courseId": "mq",
    "title": "Kafka 的 ISR 与高水位",
    "lessonId": "kafka-isr-hwm",
    "summary": "图上要标出仍在同步集合里的副本，以及被踢出的落后副本。"
  },
  {
    "id": "mx-kafka-rebalance",
    "courseId": "mq",
    "title": "Kafka 消费组再平衡会暂停拉取",
    "lessonId": "kafka-rebalance",
    "summary": "成员加入、离开和会话超时都会触发再平衡，期间暂停拉取。"
  },
  {
    "id": "mx-kafka-kraft-not-zk",
    "courseId": "mq",
    "title": "现行 Kafka 用 KRaft 管元数据，活着不再等…",
    "lessonId": "kafka-kraft-not-zk",
    "summary": "现行集群用 KRaft 控制器管元数据，副本是否跟上看 ISR。"
  },
  {
    "id": "mx-rabbit-model",
    "courseId": "mq",
    "title": "RabbitMQ：交换器、队列与确认",
    "lessonId": "rabbit-model",
    "summary": "路径是生产者到交换器，再按绑定进入两个队列，然后消费者确认。"
  },
  {
    "id": "mx-rabbit-ha-queue",
    "courseId": "mq",
    "title": "RabbitMQ 集群不等于队列已冗余",
    "lessonId": "rabbit-ha-queue",
    "summary": "先查清关键队列的类型和复制成员。"
  },
  {
    "id": "mx-rocketmq-store-not-ram-buffer",
    "courseId": "mq",
    "title": "RocketMQ 把消息落盘，不是无限内存 Buffer",
    "lessonId": "rocketmq-store-not-ram-buffer",
    "summary": "对照存储和重试文档，划掉无限内存 Buffer 和恰好一次。"
  },
  {
    "id": "mx-rocketmq-send-oneway-may-drop",
    "courseId": "mq",
    "title": "同步/异步发送仍可能失败，单向发送本来就不保证",
    "lessonId": "rocketmq-send-oneway-may-drop",
    "summary": "oneway 预测没有应答、没有回调，失败也不会告诉你。"
  },
  {
    "id": "mx-pulsar-segment-model",
    "courseId": "mq",
    "title": "Pulsar：计算与存储分离的流",
    "lessonId": "pulsar-segment-model",
    "summary": "相似的是都可以按位点消费和重放。"
  },
  {
    "id": "mx-activemq-queue-competing-consumers",
    "courseId": "mq",
    "title": "点对点队列可以有多个消费者争抢，不是两人专线",
    "lessonId": "activemq-queue-competing-consumers",
    "summary": "一个队列可以有多个发送者和多个消费者，每条消息只被其中一个消费者取走。"
  },
  {
    "id": "mx-sca-nacos-intro",
    "courseId": "sca",
    "title": "Nacos 用命名空间隔开环境，用服务名和 dataI…",
    "lessonId": "sca-nacos-intro",
    "summary": "发现与配置虽都在 Nacos，键与订阅对象不同。"
  },
  {
    "id": "mx-sca-nacos-register",
    "courseId": "sca",
    "title": "Nacos 负责找到实例，负载均衡才负责选中一个",
    "lessonId": "sca-nacos-register",
    "summary": "注册中心有摘除延迟，客户端还有名单缓存。"
  },
  {
    "id": "mx-sca-nacos-shared-config",
    "courseId": "sca",
    "title": "共享配置按顺序叠上去，后加载的覆盖先加载的",
    "lessonId": "sca-nacos-shared-config",
    "summary": "共享配置后加载会盖住应用自己的同键。"
  },
  {
    "id": "mx-sca-deregister-shutdown",
    "courseId": "sca",
    "title": "停机先从名单拿走，再停接收，最后才杀进程",
    "lessonId": "sca-deregister-shutdown",
    "summary": "发布先注销发现再排空，最后杀进程。"
  },
  {
    "id": "mx-eureka-lease-30-90",
    "courseId": "sca",
    "title": "Eureka 默认 30 秒心跳、90 秒摘除，但发现…",
    "lessonId": "eureka-lease-30-90",
    "summary": "30/90 是可改默认，不是定律。"
  },
  {
    "id": "mx-spring-cloud-feign-not-lb",
    "courseId": "sca",
    "title": "OpenFeign 是声明式客户端，负载均衡是另一层",
    "lessonId": "spring-cloud-feign-not-lb",
    "summary": "Feign 编 HTTP；选实例是 LoadBalancer。"
  },
  {
    "id": "mx-dubbo-serialize-allowlist",
    "courseId": "sca",
    "title": "反序列化默认 STRICT，只放行白名单里的类",
    "lessonId": "dubbo-serialize-allowlist",
    "summary": "3.3.5 默认序列化检查级别是 STRICT。"
  },
  {
    "id": "mx-dubbo-spring-expose",
    "courseId": "sca",
    "title": "用 @DubboService 暴露，用 @Dubbo…",
    "lessonId": "dubbo-spring-expose",
    "summary": "不写 version 时按 0.0.0 匹配。"
  },
  {
    "id": "mx-dubbo-register-mode",
    "courseId": "sca",
    "title": "register-mode 默认是 all，接口级和应…",
    "lessonId": "dubbo-register-mode",
    "summary": "3.3.5 里 register-mode 的代码默认是 all。"
  },
  {
    "id": "mx-dubbo-zk-ephemeral",
    "courseId": "sca",
    "title": "ZooKeeper 为 Dubbo 保存临时节点，不执…",
    "lessonId": "dubbo-zk-ephemeral",
    "summary": "接口级注册在 dynamic 为 true 时写入临时节点。"
  },
  {
    "id": "mx-dubbo-loadbalance-random-default",
    "courseId": "sca",
    "title": "Dubbo 默认是加权随机，轮询会在慢节点上堆积",
    "lessonId": "dubbo-loadbalance-random-default",
    "summary": "Dubbo 默认常见是加权随机。"
  },
  {
    "id": "mx-dubbo-cluster-failover",
    "courseId": "sca",
    "title": "默认集群容错是 failover，非幂等写入要改成 f…",
    "lessonId": "dubbo-cluster-failover",
    "summary": "失败后还会不会再叫另一台，由集群容错决定。"
  },
  {
    "id": "mx-dubbo-tag-router",
    "courseId": "sca",
    "title": "标签路由按 dubbo.tag 选提供者，force …",
    "lessonId": "dubbo-tag-router",
    "summary": "version 是服务匹配键，两边不一致就找不到提供者。"
  },
  {
    "id": "mx-dubbo-thread-pool",
    "courseId": "sca",
    "title": "dubbo 协议的业务线程池默认 200，队列为 0 …",
    "lessonId": "dubbo-thread-pool",
    "summary": "默认是 fixed 线程池，200 条线程，queues 为 0，底层是 SynchronousQueue。"
  },
  {
    "id": "mx-dubbo-qos-offline",
    "courseId": "sca",
    "title": "发布前用 QOS offline 注销，默认端口 22…",
    "lessonId": "dubbo-qos-offline",
    "summary": "进程被立刻杀掉时，注册中心上的地址还要等会话或心跳超时才消失。"
  },
  {
    "id": "mx-dubbo-no-provider",
    "courseId": "sca",
    "title": "找不到提供者时核对 version、group 和启动…",
    "lessonId": "dubbo-no-provider",
    "summary": "先核对 version、group 和协议是否与提供方一致。"
  },
  {
    "id": "mx-dubbo-beside-stack",
    "courseId": "sca",
    "title": "下单链路里 Dubbo 只负责 Java 进程之间的同…",
    "lessonId": "dubbo-beside-stack",
    "summary": "Nginx 接 HTTP 入口。"
  },
  {
    "id": "mx-sca-sentinel-block-fallback",
    "courseId": "sca",
    "title": "规则挡住走拦截处理，业务抛错走降级方法",
    "lessonId": "sca-sentinel-block-fallback",
    "summary": "超限走 blockHandler。"
  },
  {
    "id": "mx-arch-evolution-stages",
    "courseId": "design",
    "title": "架构演进看两条线，不是一张名词表",
    "lessonId": "arch-evolution-stages",
    "summary": "没有发布冲突、库打满或必须独立扩缩的信号，就停在现在这一站。"
  },
  {
    "id": "mx-arch-monolith-when",
    "courseId": "design",
    "title": "单体与模块化单体：何时足够",
    "lessonId": "arch-monolith-when",
    "summary": "先痛在分布式调用、排障和跨服务事务，模块之间却还在直接改对方的表。"
  },
  {
    "id": "mx-arch-soa-classic",
    "courseId": "design",
    "title": "经典 SOA：远程服务化，常停在共享库与中心总线",
    "lessonId": "arch-soa-classic",
    "summary": "那是经典 SOA（面向服务架构）常见形态。"
  },
  {
    "id": "mx-arch-sync-vs-async",
    "courseId": "design",
    "title": "同步异步怎么选，兼谈编排与协同",
    "lessonId": "arch-sync-vs-async",
    "summary": "全部改成消息驱动只是把事务换成状态机、幂等、补偿和对账，问题还在。"
  },
  {
    "id": "mx-idempotency",
    "courseId": "design",
    "title": "接口幂等与重试",
    "lessonId": "idempotency",
    "summary": "禁用按钮挡不住超时后的第二次 HTTP。"
  },
  {
    "id": "mx-cache",
    "courseId": "design",
    "title": "缓存一致性与失效",
    "lessonId": "cache",
    "summary": "删缓存只缩短窗口；并发回填仍可能把旧值写回。"
  },
  {
    "id": "mx-message-delivery",
    "courseId": "design",
    "title": "消息重试与消费幂等",
    "lessonId": "message-delivery",
    "summary": "至少一次允许再投；确认前崩溃，或确认没落到服务端，都会再来。"
  },
  {
    "id": "mx-k6-threshold-not-check",
    "courseId": "design",
    "title": "k6 的阈值失败才让进程失败，check 不改变退出码",
    "lessonId": "k6-threshold-not-check",
    "summary": "〔check｜记下断言是否成立、本身不改变进程退出码的函数〕不决定成败。"
  },
  {
    "id": "mx-jmeter-cli-continue-on-error",
    "courseId": "design",
    "title": "JMeter 负载用命令行跑，断言失败后可以继续",
    "lessonId": "jmeter-cli-continue-on-error",
    "summary": "线程组在取样错误或断言失败后可以选择 Continue。"
  },
  {
    "id": "mx-ddd-repository-one-entry",
    "courseId": "design",
    "title": "仓储只从聚合根进出，不给每张明细表一个随便改的入口",
    "lessonId": "ddd-repository-one-entry",
    "summary": "别的模块不要直接 UPDATE 订单明细。"
  },
  {
    "id": "mx-base-slogan-not-ban-tx",
    "courseId": "dist",
    "title": "BASE 是工程口号，不是“禁止分布式事务”的定理",
    "lessonId": "base-slogan-not-ban-tx",
    "summary": "BASE 是权衡口号，不是禁止分布式事务的定理。"
  },
  {
    "id": "mx-distributed-consistency-three-words",
    "courseId": "dist",
    "title": "三个「一致」不是同一个承诺",
    "lessonId": "distributed-consistency-three-words",
    "summary": "混称会用错修法：约束失败去改复制策略，分区冲突用「最终会一致」带过。"
  },
  {
    "id": "mx-distributed-outbox",
    "courseId": "dist",
    "title": "Outbox 消除双写空窗",
    "lessonId": "distributed-outbox",
    "summary": "若业务行与待发事件已同事务写入 Outbox：靠发布器重试投递，消费端按事件键幂等。"
  },
  {
    "id": "mx-binlog-not-change-event-bus",
    "courseId": "dist",
    "title": "binlog 是复制与恢复的日志，不是开箱即用的业务事…",
    "lessonId": "binlog-not-change-event-bus",
    "summary": "binlog 是存储复制流，不是正式领域事件总线。"
  },
  {
    "id": "mx-zk-linearizable-not-realtime",
    "courseId": "dist",
    "title": "ZooKeeper 的 timeliness 不是最终…",
    "lessonId": "zk-linearizable-not-realtime",
    "summary": "ZooKeeper 提供的是线性一致读写语义，不是“实时=最终一致”那句混写。"
  },
  {
    "id": "mx-zk-odd-count-not-quorum-law",
    "courseId": "dist",
    "title": "“半数存活所以要奇数台”把法定人数推错了",
    "lessonId": "zk-odd-count-not-quorum-law",
    "summary": "可用看多数派法定人数，不是“必须奇数台”本身。"
  },
  {
    "id": "mx-redis-lock-setnx-expire-race",
    "courseId": "dist",
    "title": "SETNX 再 EXPIRE 不是原子加锁",
    "lessonId": "redis-lock-setnx-expire-race",
    "summary": "SETNX 与 EXPIRE 拆成两步会中途崩溃锁死。"
  },
  {
    "id": "mx-redis-lock-getset-wall-clock",
    "courseId": "dist",
    "title": "用本机墙钟做 Redis 锁过期会偏",
    "lessonId": "redis-lock-getset-wall-clock",
    "summary": "靠 GETSET 与墙钟比过期不可靠。"
  },
  {
    "id": "mx-mysql-for-update-not-dist-lease",
    "courseId": "dist",
    "title": "FOR UPDATE 是事务行锁，不是跨机租约",
    "lessonId": "mysql-for-update-not-dist-lease",
    "summary": "FOR UPDATE 握在事务连接上，不是跨机租约。"
  },
  {
    "id": "mx-snowflake-clock-rollback",
    "courseId": "dist",
    "title": "雪花 ID 怕的是时钟回拨，不是“改一下位数就永远安全”",
    "lessonId": "snowflake-clock-rollback",
    "summary": "时钟回拨会让时间部分倒退从而撞号。"
  },
  {
    "id": "mx-distributed-one-db-first",
    "courseId": "dist",
    "title": "能放进一个库的不变量，先不要拆成分布式事务",
    "lessonId": "distributed-one-db-first",
    "summary": "刚拆开就上 Seata，是在用全局事务缝本可同库的不变量。"
  },
  {
    "id": "mx-distributed-at-sees-before-global",
    "courseId": "dist",
    "title": "AT 第一阶段本地已经提交，别人可以先看见",
    "lessonId": "distributed-at-sees-before-global",
    "summary": "AT 模式可能先看到分支本地提交。"
  },
  {
    "id": "mx-distributed-idempotent-key",
    "courseId": "dist",
    "title": "至少一次下同一业务键只生效一次",
    "lessonId": "distributed-idempotent-key",
    "summary": "跨服务投递是〔至少一次｜at-least-once：同一条可能再投，不能假定只到一次〕。"
  },
  {
    "id": "mx-graceful-shutdown-not-zero-loss",
    "courseId": "dist",
    "title": "优雅停机减少粗暴断开，不是业务零丢失保证书",
    "lessonId": "graceful-shutdown-not-zero-loss",
    "summary": "优雅停机减少在途丢失，不等于零丢失。"
  },
  {
    "id": "mx-dns-lb-not-just-round-robin",
    "courseId": "dist",
    "title": "DNS 负载均衡不是“调小 TTL 的简单轮询”就够",
    "lessonId": "dns-lb-not-just-round-robin",
    "summary": "DNS 负载还有缓存与 TTL。"
  },
  {
    "id": "mx-threadlocal-not-distributed-context",
    "courseId": "dist",
    "title": "ThreadLocal 是线程内便签，不是跨进程的分布…",
    "lessonId": "threadlocal-not-distributed-context",
    "summary": "ThreadLocal 只在本线程。"
  },
  {
    "id": "mx-docker-not-a-vm",
    "courseId": "ship",
    "title": "容器不是虚拟机，也不是集群",
    "lessonId": "docker-not-a-vm",
    "summary": "Docker 管这台机器上的镜像和容器。"
  },
  {
    "id": "mx-k8s-cluster-enter",
    "courseId": "ship",
    "title": "kubectl 对上控制面，节点才跑你的 Pod",
    "lessonId": "k8s-cluster-enter",
    "summary": "kubectl apply 把它交给 API。"
  },
  {
    "id": "mx-k8s-not-docker-engine",
    "courseId": "ship",
    "title": "Kubernetes 不是 Docker 引擎，也不是…",
    "lessonId": "k8s-not-docker-engine",
    "summary": "从外面进来通常要 Ingress 和它的控制器。"
  },
  {
    "id": "mx-gha-workflow-in-dot-github",
    "courseId": "ship",
    "title": "流水线写在 .github/workflows，靠 o…",
    "lessonId": "gha-workflow-in-dot-github",
    "summary": "工作流必须在 .github/workflows。"
  },
  {
    "id": "mx-gha-job-needs-success",
    "courseId": "ship",
    "title": "后一个 job 默认要等前一个成功",
    "lessonId": "gha-job-needs-success",
    "summary": "默认 needs 要求上游成功。"
  },
  {
    "id": "mx-jenkins-not-only-ci-tool",
    "courseId": "ship",
    "title": "Jenkins 是一种持续集成工具，不是 CI 的同义词",
    "lessonId": "jenkins-not-only-ci-tool",
    "summary": "CI 是实践，Jenkins 只是工具之一。"
  },
  {
    "id": "mx-docker-layer-cache-copy",
    "courseId": "ship",
    "title": "COPY 一变，后面的层全部重做",
    "lessonId": "docker-layer-cache-copy",
    "summary": "COPY 顺序决定缓存是否失效。"
  },
  {
    "id": "mx-compose-service-name-dns",
    "courseId": "ship",
    "title": "服务之间用服务名和容器端口，不用 localhost",
    "lessonId": "compose-service-name-dns",
    "summary": "Compose 里用服务名做 DNS。"
  },
  {
    "id": "mx-one-container-one-service-heuristic",
    "courseId": "ship",
    "title": "“一个容器一种服务”是可运维启发式",
    "lessonId": "one-container-one-service-heuristic",
    "summary": "一服务一主容器是启发式，允许 sidecar。"
  },
  {
    "id": "mx-k8s-pod-share-localhost",
    "courseId": "ship",
    "title": "同一个 Pod 里的容器共用 IP，用 localho…",
    "lessonId": "k8s-pod-share-localhost",
    "summary": "同一 Pod 内才共享 localhost。"
  },
  {
    "id": "mx-k8s-service-clusterip",
    "courseId": "ship",
    "title": "Service 给一组会换 IP 的 Pod 一个稳定…",
    "lessonId": "k8s-service-clusterip",
    "summary": "客户端连 Service，不要写死 Pod IP。"
  },
  {
    "id": "mx-k8s-ingress-needs-controller",
    "courseId": "ship",
    "title": "只创建 Ingress 对象不会打开外网，要有控制器",
    "lessonId": "k8s-ingress-needs-controller",
    "summary": "Ingress 对象本身不开通外网。"
  },
  {
    "id": "mx-vue-test-utils-mount",
    "courseId": "test",
    "title": "Vue 组件测试用 mount 挂上组件，Vitest…",
    "lessonId": "vue-test-utils-mount",
    "summary": "〔Vitest｜Vue 官方测试指南推荐的测试运行器〕只调用测试函数。"
  },
  {
    "id": "mx-test-mock-boundary",
    "courseId": "test",
    "title": "只替掉边界，不要替掉正在测的逻辑",
    "lessonId": "test-mock-boundary",
    "summary": "找出全是替身的测试，改成只替掉网络，让金额计算真的执行。"
  },
  {
    "id": "mx-test-fake-timers",
    "courseId": "test",
    "title": "假时钟推进定时器，不要在测试里真的 sleep 三秒",
    "lessonId": "test-fake-timers",
    "summary": "假时钟下输入后推进 300 毫秒，搜索请求立刻发出，用例几乎不占等待。"
  },
  {
    "id": "mx-react-enzyme-not-default",
    "courseId": "test",
    "title": "组件测试默认 Testing Library，不是 E…",
    "lessonId": "react-enzyme-not-default",
    "summary": "现行默认是 Testing Library：按用户能看见的角色和名字查。"
  },
  {
    "id": "mx-playwright-user-journey",
    "courseId": "test",
    "title": "端到端只覆盖一条真正的用户路径",
    "lessonId": "playwright-user-journey",
    "summary": "不是每个函数都该配一条浏览器测试。"
  },
  {
    "id": "mx-contract-test-path",
    "courseId": "test",
    "title": "前后端测的是同一份契约，而不是各测各的模拟对象",
    "lessonId": "contract-test-path",
    "summary": "下单成功和库存不足各有一条契约断言，锁住状态码和失败类型。"
  },
  {
    "id": "mx-msw-http-mock",
    "courseId": "test",
    "title": "组件测试拦的是 HTTP，不要把 fetch 整个替换…",
    "lessonId": "msw-http-mock",
    "summary": "按路径返回 JSON 之后，页面应显示 paid。"
  },
  {
    "id": "mx-junit-instance-lifecycle",
    "courseId": "test",
    "title": "测试要能单独跑、换序也能跑（JUnit 5）",
    "lessonId": "junit-instance-lifecycle",
    "summary": "默认每方法新实例只隔离实例字段。"
  },
  {
    "id": "mx-pit-mutation-killed",
    "courseId": "test",
    "title": "变异测试看测试能否杀掉改过的代码",
    "lessonId": "pit-mutation-killed",
    "summary": "〔行覆盖率｜测试执行过的行占源码行的比例〕只说明这些行被跑过。"
  },
  {
    "id": "mx-fs-four-layers",
    "courseId": "spine",
    "title": "一个功能要同时对上页面、接口契约、用例和持久化",
    "lessonId": "fs-four-layers",
    "summary": "会写框架不等于这四件事已经对齐。"
  },
  {
    "id": "mx-fs-page-feature",
    "courseId": "spine",
    "title": "页面上要分清 URL 状态、表单状态、服务器状态和请求…",
    "lessonId": "fs-page-feature",
    "summary": "服务器状态、表单状态、请求状态是三份数据。"
  },
  {
    "id": "mx-fs-write-ui",
    "courseId": "spine",
    "title": "写操作要把契约里的成功和失败画成确定的界面",
    "lessonId": "fs-write-ui",
    "summary": "fetch 对 4xx 不抛错。"
  },
  {
    "id": "mx-fs-frontend-done",
    "courseId": "spine",
    "title": "前端这一侧做完，要能不看资料回答六件事",
    "lessonId": "fs-frontend-done",
    "summary": "用六项验收：资源标识、请求形状、成功字段、失败 type 与表单状态、传输失败与幂等重试、登录态存放位置。"
  },
  {
    "id": "mx-fs-boot-chain",
    "courseId": "spine",
    "title": "写接口分成校验、用例、事务和响应",
    "lessonId": "fs-boot-chain",
    "summary": "控制器只接收 HTTP、调用用例，并返回状态码与问题详情。"
  },
  {
    "id": "mx-fs-write-invariant",
    "courseId": "spine",
    "title": "写入成功的定义是不变量已经提交",
    "lessonId": "fs-write-invariant",
    "summary": "200 只说明这次响应的状态码。"
  },
  {
    "id": "mx-fs-read-shape",
    "courseId": "spine",
    "title": "详情接口只返回约定的字段，并写明读主库还是允许延迟的副本",
    "lessonId": "fs-read-shape",
    "summary": "实体上有契约没约定的字段，序列化时还可能再查关联。"
  },
  {
    "id": "mx-fs-ship-bar",
    "courseId": "spine",
    "title": "能独立做全栈，是能改一条路径并解释每一种失败",
    "lessonId": "fs-ship-bar",
    "summary": "标准是一条竖切（vertical slice）：同一功能从页面到数据库。"
  },
  {
    "id": "mx-react-ssr-not-fewer-http",
    "courseId": "work",
    "title": "SSR 先给可看的 HTML，并不等于少请求或一份文档…",
    "lessonId": "react-ssr-not-fewer-http",
    "summary": "SSR 交出的 HTML 之后仍要拉脚本样式图片。"
  },
  {
    "id": "mx-angular-ngonchanges-primitives",
    "courseId": "work",
    "title": "ngOnChanges 不单是引用变了才跑，也不是整棵…",
    "lessonId": "angular-ngonchanges-primitives",
    "summary": "ngOnChanges 在首次绑定就会进，不限对象引用。"
  },
  {
    "id": "mx-fe-slow-page-where",
    "courseId": "work",
    "title": "页面慢先分清是在等网络、脚本还是布局",
    "lessonId": "fe-slow-page-where",
    "summary": "卡顿要先分清是等首字节还是主线程长任务。"
  },
  {
    "id": "mx-vite-env-client-prefix",
    "courseId": "work",
    "title": "VITE_ 变量会打进前端包，密钥不能叫这个前缀",
    "lessonId": "vite-env-client-prefix",
    "summary": "带 VITE_ 的变量会进浏览器包，能被搜到。"
  },
  {
    "id": "mx-eslint-error-not-warning",
    "courseId": "work",
    "title": "ESLint 的 error 让进程失败，warn 默…",
    "lessonId": "eslint-error-not-warning",
    "summary": "warn 默认不改变〔退出码｜进程结束时交给调用方的整数〕。"
  },
  {
    "id": "mx-request-trace-one-hop",
    "courseId": "work",
    "title": "一次下单只应有一条追踪，从网放进到 SQL 出",
    "lessonId": "request-trace-one-hop",
    "summary": "慢要落到同一追踪标识下的某一跳。"
  },
  {
    "id": "mx-jdbc-datasource-not-diy-pool",
    "courseId": "work",
    "title": "连接池用 DataSource，不要手写 synchr…",
    "lessonId": "jdbc-datasource-not-diy-pool",
    "summary": "连接池走 DataSource。"
  },
  {
    "id": "mx-git-restore-over-checkout",
    "courseId": "work",
    "title": "恢复文件用 git restore，checkout …",
    "lessonId": "git-restore-over-checkout",
    "summary": "还原文件用 restore，切分支用 switch。"
  },
  {
    "id": "mx-linux-virtual-memory-isolation",
    "courseId": "work",
    "title": "多进程不能共用绝对物理地址，要用虚拟地址做隔离",
    "lessonId": "linux-virtual-memory-isolation",
    "summary": "没有操作系统的直访模型里地址就是物理位置。"
  },
  {
    "id": "mx-linux-multilevel-page-table",
    "courseId": "work",
    "title": "单级页表按进程占满地址空间会太大，要用多级页表按需展开",
    "lessonId": "linux-multilevel-page-table",
    "summary": "32 位、4KB 页时单级页表可到约 4MB/进程。"
  },
  {
    "id": "mx-linux-page-fault-swap",
    "courseId": "work",
    "title": "缺页时内核补页或换入，内存紧时可以把页换出到磁盘",
    "lessonId": "linux-page-fault-swap",
    "summary": "可以先建映射、访问时再缺页补页。"
  },
  {
    "id": "mx-k8s-runtime-not-only-docker",
    "courseId": "work",
    "title": "节点上跑的不必是 Docker，kubelet 才对接…",
    "lessonId": "k8s-runtime-not-only-docker",
    "summary": "kubelet 走 CRI，不绑定 Docker。"
  },
  {
    "id": "mx-linux-root-group-not-root",
    "courseId": "work",
    "title": "加进 root 组不等于得到 root，清日志也不要从…",
    "lessonId": "linux-root-group-not-root",
    "summary": "进 root 组不等于 uid 0。"
  },
  {
    "id": "mx-linux-process-states",
    "courseId": "work",
    "title": "教材进程五态是调度模型，不是 Java Thread.…",
    "lessonId": "linux-process-states",
    "summary": "那是操作系统教材里的进程调度模型。"
  },
  {
    "id": "mx-linux-process-context-switch",
    "courseId": "work",
    "title": "进程上下文切换要保存 CPU 上下文，并换上另一进程的…",
    "lessonId": "linux-process-context-switch",
    "summary": "CPU 上下文包括寄存器与 PC。"
  },
  {
    "id": "mx-linux-epoll-vs-select",
    "courseId": "work",
    "title": "epoll 用就绪链表避免每次扫全部描述符",
    "lessonId": "linux-epoll-vs-select",
    "summary": "select/poll 每次要带着整份集合进内核并线性扫。"
  },
  {
    "id": "mx-linux-inode-dentry",
    "courseId": "work",
    "title": "inode 记元数据与数据位置，dentry 记名字",
    "lessonId": "linux-inode-dentry",
    "summary": "名字在目录项（dentry）里；元数据与数据块位置在 inode 里。"
  },
  {
    "id": "mx-linux-inode-block-pointers",
    "courseId": "work",
    "title": "inode 用直接与多级间接指针找数据块",
    "lessonId": "linux-inode-block-pointers",
    "summary": "inode 里既有直接指向数据块的指针，也有一到三级间接索引。"
  },
  {
    "id": "mx-linux-nic-mtu-rx-errors",
    "courseId": "work",
    "title": "MTU 限制单帧载荷，接口计数区分丢包原因",
    "lessonId": "linux-nic-mtu-rx-errors",
    "summary": "链路有 MTU，超长 IP 包要在 IP 层分片。"
  },
  {
    "id": "mx-docker-root-not-host-root",
    "courseId": "work",
    "title": "容器里的 root 不等于一定能当宿主机 root",
    "lessonId": "docker-root-not-host-root",
    "summary": "容器 root 不等于无限制的宿主机 root。"
  },
  {
    "id": "mx-etcd-v3-grpc-not-rest",
    "courseId": "work",
    "title": "etcd v3 走 gRPC，不要再背 HTTP+JS…",
    "lessonId": "etcd-v3-grpc-not-rest",
    "summary": "现行 etcd v3 走 gRPC。"
  },
  {
    "id": "mx-git-default-branch-not-master",
    "courseId": "work",
    "title": "仓库默认分支常常是 main，不必再叫 master",
    "lessonId": "git-default-branch-not-master",
    "summary": "默认分支名可配，现在常见 main。"
  }
]

export const MULTI_QUESTIONS: DrillQuestion[] = [
  {"id":"xla1-1","pointId":"mx-js-what-it-is","stem":"选出所有正确的说法。HTML 画出结构、CSS 画出样子之后，按钮被点、列表被改，是哪一门语言在做？","options":[{"id":"a","text":"它是网页里用来写行为的编程语言。"},{"id":"b","text":"语言标准叫 ECMAScript。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"是 JavaScript。它是网页里用来写行为的编程语言。语言标准叫 ECMAScript。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-2","pointId":"mx-js-run-in-page","stem":"选出所有正确的说法。一段 JavaScript 怎样出现在浏览器已经打开的那份 HTML 里？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"写在 script 元素里，或用 src 指向一个 .js 文件。"},{"id":"d","text":"模块脚本把 type 写成 module。"}],"answer":"c","answers":["c","d"],"explain":"写在 script 元素里，或用 src 指向一个 .js 文件。模块脚本把 type 写成 module。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-3","pointId":"mx-js-not-java-around","stem":"选出所有正确的说法。名字里有 Java，是不是同一门语言？类型标注要写在哪一层？","options":[{"id":"a","text":"JavaScript 和 Java 是两门语言。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"类型标注写在 TypeScript 里，编译后仍是 JavaScript。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"不是。JavaScript 和 Java 是两门语言。类型标注写在 TypeScript 里，编译后仍是 JavaScript。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-4","pointId":"mx-js-value-kinds","stem":"选出所有正确的说法。一段数据放进变量之后，怎样知道它是数字、字符串还是对象？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"原始值是 undefined、null、boolean、number、bigint、string、symbol。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"其余日常用的数组、函数和普通对象都是对象。"}],"answer":"b","answers":["b","d"],"explain":"原始值是 undefined、null、boolean、number、bigint、string、symbol。其余日常用的数组、函数和普通对象都是对象。typeof 返回这一大类的名字。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-5","pointId":"mx-js-let-const-decl","stem":"选出所有正确的说法。声明一个会变的计数，和声明一个不能换掉的名字，各用哪个？","options":[{"id":"a","text":"名字不能再指向别的值就用 const。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"const 并不冻住对象里的字段。"}],"answer":"a","answers":["a","d"],"explain":"会再赋值就用 let。名字不能再指向别的值就用 const。const 并不冻住对象里的字段。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-6","pointId":"mx-js-array-grows","stem":"选出所有正确的说法。创建一个空数组之后，怎样放进第一个元素？越界读取会抛错吗？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"push 把元素加到末尾并增大 length。"},{"id":"c","text":"越过末尾去读，得到 undefined，不抛错。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"下标从 0 开始。push 把元素加到末尾并增大 length。越过末尾去读，得到 undefined，不抛错。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-7","pointId":"mx-js-object-property","stem":"选出所有正确的说法。订单号和金额怎样放在同一个值里？","options":[{"id":"a","text":"点号读取标识符属性，方括号用表达式当属性名。"},{"id":"b","text":"没有这个属性时得到 undefined。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。没有这个属性时得到 undefined。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-8","pointId":"mx-js-function-return","stem":"选出所有正确的说法。怎样把“按分算金额”写成可以反复调用的一段？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"调用时圆括号里的值按顺序对上参数。"},{"id":"d","text":"return 把结果交回调用处。"}],"answer":"c","answers":["c","d"],"explain":"用 function 声明。调用时圆括号里的值按顺序对上参数。return 把结果交回调用处。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-9","pointId":"mx-js-for-while-break","stem":"选出所有正确的说法。想把 0、1、2 加起来，但跳过 1，循环该怎么写？","options":[{"id":"a","text":"for 或 while 在条件为真时重复。"},{"id":"b","text":"continue 跳过这一轮剩下的语句，break 离开整个循环。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"for 或 while 在条件为真时重复。continue 跳过这一轮剩下的语句，break 离开整个循环。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-10","pointId":"mx-js-try-catch-throw","stem":"选出所有正确的说法。读金额失败时，怎样把失败交到调用这段代码的地方？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"throw 抛出一个值，通常是 Error。"},{"id":"d","text":"try 外面的 catch 接到它。"}],"answer":"c","answers":["c","d"],"explain":"throw 抛出一个值，通常是 Error。try 外面的 catch 接到它。函数签名上不用写 throws。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-11","pointId":"mx-js-switch-strict","stem":"选出所有正确的说法。case 1 里没有 break，为什么 case 2 的赋值也执行了？","options":[{"id":"a","text":"switch 用 === 匹配。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"匹配之后会继续执行后面的语句，直到 break。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"switch 用 === 匹配。匹配之后会继续执行后面的语句，直到 break。这一支要停住，就写 break。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-12","pointId":"mx-es6-const-binding","stem":"选出所有正确的说法。为什么 const 声明的订单改了金额，运行却没有报错？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"const 管的是绑定不能换目标，不冻结对象字段。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"要字段不可改用 freeze 或只读类型。"}],"answer":"b","answers":["b","d"],"explain":"const 管的是绑定不能换目标，不冻结对象字段。要字段不可改用 freeze 或只读类型。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-13","pointId":"mx-es6-destructure-copies","stem":"选出所有正确的说法。为什么从对象里解构出 price 之后，再改对象，变量却不变？","options":[{"id":"a","text":"解构出的基本类型是拷贝；对象/数组取出的是同一引用。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"默认值只替换 undefined。"}],"answer":"a","answers":["a","d"],"explain":"解构出的基本类型是拷贝；对象/数组取出的是同一引用。默认值只替换 undefined。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-14","pointId":"mx-js-scope-tdz","stem":"选出所有正确的说法。为什么在 let 声明前读取会报错，而 var 却是 undefined？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"let/const 有暂时性死区，声明前读取抛错。"},{"id":"c","text":"var 提升后是 undefined。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"let/const 有暂时性死区，声明前读取抛错。var 提升后是 undefined。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-15","pointId":"mx-js-class-extends-super","stem":"选出所有正确的说法。为什么子类构造函数里先写 this.name = x 会直接报错？","options":[{"id":"a","text":"子类构造必须先 super 再碰 this。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"静态里 super 指向父类构造函数。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"子类构造必须先 super 再碰 this。静态里 super 指向父类构造函数。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-16","pointId":"mx-es6-symbol-key","stem":"选出所有正确的说法。为什么加了一个描述也叫 id 的 Symbol，Object.keys 却看不见它？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Symbol 键互不相等，Object.keys 看不见。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"要用 getOwnPropertySymbols 或 for。"}],"answer":"b","answers":["b","d"],"explain":"Symbol 键互不相等，Object.keys 看不见。要用 getOwnPropertySymbols 或 for。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-17","pointId":"mx-js-optional-chaining","stem":"选出所有正确的说法。写了 user?.profile?.name 之后，接口 500 也看不见了。为什么可选链代替不了错误处理？","options":[{"id":"a","text":"?. 只在中间为 null/undefined 时短路。"},{"id":"b","text":"方法不是函数仍抛错；也不代替 Promise.catch。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"?. 只在中间为 null/undefined 时短路。方法不是函数仍抛错；也不代替 Promise.catch。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-18","pointId":"mx-eventloop","stem":"选出所有正确的说法。Promise.then 里的日志，为什么总在当前函数的日志之后、setTimeout 之前？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"微任务在同步之后、宏任务之前清空。"},{"id":"d","text":"then 早于 setTimeout(0)。"}],"answer":"c","answers":["c","d"],"explain":"微任务在同步之后、宏任务之前清空。then 早于 setTimeout(0)。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-19","pointId":"mx-js-microtask-vs-macrotask","stem":"选出所有正确的说法。为什么 Promise.then 里的日志总比 setTimeout(0) 早，有人却说两者都是“异步”？","options":[{"id":"a","text":"两者都叫异步但分属微任务与宏任务队列。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"then 通常早于 setTimeout(0)。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"两者都叫异步但分属微任务与宏任务队列。then 通常早于 setTimeout(0)。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla1-20","pointId":"mx-js-iteration-protocol","stem":"选出所有正确的说法。为什么有的对象能 for-of，有的却报不是 iterable？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"能 for-of 的对象要实现迭代器方法。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"普通对象默认不是 iterable。"}],"answer":"b","answers":["b","d"],"explain":"能 for-of 的对象要实现迭代器方法。普通对象默认不是 iterable。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla2-1","pointId":"mx-ts-what-it-is","stem":"选出所有正确的说法。要在编写时标出参数和返回值的类型，用的是哪一层？","options":[{"id":"a","text":"它是带类型语法的 JavaScript。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"类型在编译时检查，不代替运行时的值。"}],"answer":"a","answers":["a","d"],"explain":"用 TypeScript。它是带类型语法的 JavaScript。类型在编译时检查，不代替运行时的值。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla2-2","pointId":"mx-ts-compile-to-js","stem":"选出所有正确的说法。浏览器和 Node 要执行的是哪一种文件？.ts 怎样变成它？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"执行的是 JavaScript。"},{"id":"c","text":"tsc 读取 .ts，检查类型，写出 .js。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"执行的是 JavaScript。tsc 读取 .ts，检查类型，写出 .js。类型标注在这一步被拿掉。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla2-3","pointId":"mx-ts-type-annotation","stem":"选出所有正确的说法。怎样让一个变量只能放数字，放字符串时在运行前就失败？","options":[{"id":"a","text":"在名字后面写 : number。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"这些标注不会留在生成的 JavaScript 里。"}],"answer":"a","answers":["a","d"],"explain":"在名字后面写 : number。对不上的赋值会在编译时失败。这些标注不会留在生成的 JavaScript 里。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla2-4","pointId":"mx-ts-object-array-type","stem":"选出所有正确的说法。订单要有一个数字金额，列表里的每一项都是字符串，类型怎么写？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"对象写成 { amount: number }。"},{"id":"c","text":"多写的字段能不能过，还要看是不是对象字面量。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"对象写成 { amount: number }。数组写成 string[]。多写的字段能不能过，还要看是不是对象字面量。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla2-5","pointId":"mx-ts-union-annotation","stem":"选出所有正确的说法。金额有时是数字，有时还没有，类型怎么写才不会把它当成永远有数？","options":[{"id":"a","text":"写成 number | null。"},{"id":"b","text":"可选字段读出来会带上 undefined。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"写成 number | null。使用之前要先判断是哪一种。可选字段读出来会带上 undefined。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla2-6","pointId":"mx-ts-satisfies","stem":"选出所有正确的说法。给主题对象加 as Theme，为什么会丢掉“这个键一定是这几个颜色”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"satisfies 核对类型又保留字面量键。"},{"id":"d","text":"as 会放宽，拼错键可能不再报错。"}],"answer":"c","answers":["c","d"],"explain":"satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla2-7","pointId":"mx-ts-structural","stem":"选出所有正确的说法。两个类型名称不同，但字段相同，为何仍可赋值？","options":[{"id":"a","text":"TypeScript 是结构类型。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"字段够用就能赋；对象字面量另有多余属性检查。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xla2-8","pointId":"mx-ts-utility-types","stem":"选出所有正确的说法。为什么把更新接口写成 Partial<User> 之后，id 也会变成可选？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Partial 会让所有键可选。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"更新补丁应 Omit id，运行时仍要自己挑字段。"}],"answer":"b","answers":["b","d"],"explain":"Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-1","pointId":"mx-browser-not-node","stem":"选出所有正确的说法。同一段调用 document.getElementById 的脚本，放到 node 命令下跑，会怎样？","options":[{"id":"a","text":"Node.js 没有窗口，也没有文档。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"文件和 HTTP 服务用 Node 自己的模块。"}],"answer":"a","answers":["a","d"],"explain":"会失败。Node.js 没有窗口，也没有文档。文件和 HTTP 服务用 Node 自己的模块。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-2","pointId":"mx-dom-event-flow","stem":"选出所有正确的说法。点在按钮上，为什么父元素的监听器也会执行？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"祖先上的捕获监听最先执行，接着是目标上的监听，最后才是祖先和文档上的冒泡监听。"},{"id":"c","text":"stopPropagation 之后，其他节点不再收到这次事件，但同一按钮上还没跑的第二个监听仍然执行。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"祖先上的捕获监听最先执行，接着是目标上的监听，最后才是祖先和文档上的冒泡监听。stopPropagation 之后，其他节点不再收到这次事件，但同一按钮上还没跑的第二个监听仍然执行。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-3","pointId":"mx-html-dialog-modal","stem":"选出所有正确的说法。用绝对定位的 div 做弹层，为什么焦点还能跑到后面的按钮上？","options":[{"id":"a","text":"普通绝对定位 div 不会自动困住焦点。"},{"id":"b","text":"用 dialog.showModal，Tab 留在框内，Esc 可关，背景不再点。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"普通绝对定位 div 不会自动困住焦点。用 dialog.showModal，Tab 留在框内，Esc 可关，背景不再点。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-4","pointId":"mx-html5-constraint-before-submit","stem":"选出所有正确的说法。为什么邮箱格式不对，提交按钮的监听却一次都没执行？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"按钮和 requestSubmit() 在校验失败时不触发 submit。"},{"id":"d","text":"novalidate 或 formnovalidate 跳过校验。"}],"answer":"c","answers":["c","d"],"explain":"按钮和 requestSubmit() 在校验失败时不触发 submit。novalidate 或 formnovalidate 跳过校验。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-5","pointId":"mx-html5-media-play-promise","stem":"选出所有正确的说法。为什么写了 autoplay，桌面上仍要点一下才有声音？","options":[{"id":"a","text":"带声音的 autoplay 被拒绝，元素停住。"},{"id":"b","text":"muted 和 playsinline 之后可以无声、页内播放。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"带声音的 autoplay 被拒绝，元素停住。muted 和 playsinline 之后可以无声、页内播放。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-6","pointId":"mx-html5-canvas-buffer","stem":"选出所有正确的说法。为什么把 canvas 的 CSS 拉到 600 像素，线却发糊，点击也对不准？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"只改 CSS 时缓冲仍是 300×150，位图被拉伸。"},{"id":"d","text":"设置 width 和 height 属性后缓冲变大，已绘内容被清空，要重画。"}],"answer":"c","answers":["c","d"],"explain":"只改 CSS 时缓冲仍是 300×150，位图被拉伸。设置 width 和 height 属性后缓冲变大，已绘内容被清空，要重画。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-7","pointId":"mx-html5-pushstate-popstate","stem":"选出所有正确的说法。为什么地址已经变成 /orders/2，监听 popstate 的函数却没运行？","options":[{"id":"a","text":"pushState 只改当前文档的地址和历史，不触发 popstate。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"后退或前进才触发，state 是存进去的那份克隆。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"pushState 只改当前文档的地址和历史，不触发 popstate。后退或前进才触发，state 是存进去的那份克隆。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-8","pointId":"mx-html5-drop-prevent-default","stem":"选出所有正确的说法。为什么 dragstart 里已经 setData，松手时 drop 监听却不执行？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"没有取消 dragover 的默认行为时，drop 不发生。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"取消之后，getData 能取回同一类型的文本。"}],"answer":"b","answers":["b","d"],"explain":"没有取消 dragover 的默认行为时，drop 不发生。取消之后，getData 能取回同一类型的文本。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-9","pointId":"mx-miniprogram-wx-if-not-wxif","stem":"选出所有正确的说法。为什么把小程序和 Vue 的差别写成“wx-if / 没有 body / getUserInfo 拿 unionId”会过时？","options":[{"id":"a","text":"if，冒号是指令前缀，不是 wx-if；列表是 wx:for。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"任一项须查实现才能回答，则该项尚未掌握。"},{"id":"d","text":"划掉 getUserInfo 拿 unionId：用户身份现行是 wx.login 的 code 去换 openid 或 unionid，旧的弹窗授权已经废弃。"}],"answer":"a","answers":["a","d"],"explain":"if，冒号是指令前缀，不是 wx-if；列表是 wx:for。划掉 getUserInfo 拿 unionId：用户身份现行是 wx.login 的 code 去换 openid 或 unionid，旧的弹窗授权已经废弃。","whyWrong":{"b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。","c":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-10","pointId":"mx-browser-event-loop-frame","stem":"选出所有正确的说法。为什么有时脚本不长，页面仍然掉帧？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"用性能记录标出脚本、布局和绘制谁最长。"},{"id":"c","text":"脚本最长是长任务占住主线程，输入和绘制都要等。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"用性能记录标出脚本、布局和绘制谁最长。脚本最长是长任务占住主线程，输入和绘制都要等。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-11","pointId":"mx-session-storage-tab-only","stem":"选出所有正确的说法。为什么换一个标签打开同站，刚才 sessionStorage 里的向导进度没了？","options":[{"id":"a","text":"session 不跨标签；刷新常保留；关标签清空。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"local 同源共享且靠 storage 事件通知别人。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"session 不跨标签；刷新常保留；关标签清空。local 同源共享且靠 storage 事件通知别人。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-12","pointId":"mx-indexeddb-when-needed","stem":"选出所有正确的说法。为什么一上来就用 IndexedDB 存三个开关，最后读写比 localStorage 还难查？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"开关用 Web Storage。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"可查询离线大数据用 IndexedDB。"}],"answer":"b","answers":["b","d"],"explain":"开关用 Web Storage。可查询离线大数据用 IndexedDB。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-13","pointId":"mx-bfcache-pageshow","stem":"选出所有正确的说法。用户点后退，为什么有的页面还是离开前的滚动位置，onLoad 却没再执行？","options":[{"id":"a","text":"后退常从往返缓存恢复，不一定再跑 load。"},{"id":"b","text":"用 pageshow 看 persisted，别假定每次都重新挂载。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"后退常从往返缓存恢复，不一定再跑 load。用 pageshow 看 persisted，别假定每次都重新挂载。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-14","pointId":"mx-service-worker-stale","stem":"选出所有正确的说法。部署了新前端，为什么有人还在用昨天的脚本？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"新脚本装好后可能还在 waiting，旧 Worker 仍在接管。"},{"id":"d","text":"用户会继续跑昨天的脚本，直到激活策略换人。"}],"answer":"c","answers":["c","d"],"explain":"新脚本装好后可能还在 waiting，旧 Worker 仍在接管。用户会继续跑昨天的脚本，直到激活策略换人。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-15","pointId":"mx-sw-cache-strategy-pick","stem":"选出所有正确的说法。为什么静态脚本用缓存优先没问题，订单列表也 cache-first 就会出事？","options":[{"id":"a","text":"带哈希静态：cache-first。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"订单 API：网络优先/只网络。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"带哈希静态：cache-first。订单 API：网络优先/只网络。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-16","pointId":"mx-cors-credentials-allowlist","stem":"选出所有正确的说法。为什么 Spring 拦截器里把 Origin 原样写回并 Allow-Credentials=true，看起来能跨域，其实把登录态让出去了？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"带 Cookie 时不能把 Origin 无校验回写，也不能用 *。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"Allow-Origin 必须是明确的那一个源。"}],"answer":"b","answers":["b","d"],"explain":"带 Cookie 时不能把 Origin 无校验回写，也不能用 *。Allow-Origin 必须是明确的那一个源。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-17","pointId":"mx-cors-preflight-max-age","stem":"选出所有正确的说法。为什么加了 Access-Control-Max-Age=86400 之后，有人以为以后都不用再配 CORS？","options":[{"id":"a","text":"Max-Age 只缓存预检（OPTIONS）结论。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"实际响应仍要正确的 CORS 允许头。"}],"answer":"a","answers":["a","d"],"explain":"Max-Age 只缓存预检（OPTIONS）结论。实际响应仍要正确的 CORS 允许头。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-18","pointId":"mx-same-origin-script-still-runs","stem":"选出所有正确的说法。为什么把同源策略说成“只有百度自己的脚本才会被执行、浏览器拒收外域响应”会错？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"外域 script src 会执行，权限属于当前文档的源。"},{"id":"c","text":"CORS 拦的是脚本读取跨源响应，不是拦 TCP 发包。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"外域 script src 会执行，权限属于当前文档的源。CORS 拦的是脚本读取跨源响应，不是拦 TCP 发包。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr1-19","pointId":"mx-html-form-cross-origin-navigate","stem":"选出所有正确的说法。为什么一道题问“表单可以跨域吗”，用 CORS 的对错去答会偏？","options":[{"id":"a","text":"表单跨源提交是导航，不靠 CORS。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"任一项须查实现才能回答，则该项尚未掌握。"},{"id":"d","text":"fetch 读跨源正文才要 CORS 允许头。"}],"answer":"a","answers":["a","d"],"explain":"表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xbr2-1","pointId":"mx-css-what-it-is","stem":"选出所有正确的说法。一份 HTML 已经有标题和按钮，字号、颜色和排列写在哪一种语言里？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"CSS 是描述文档怎么呈现的样式语言。"},{"id":"c","text":"一条规则由选择器和一组声明组成。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。一条规则由选择器和一组声明组成。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr2-2","pointId":"mx-css-rule-syntax","stem":"选出所有正确的说法。想把段落文字改成蓝色，样式表里要写哪几部分？","options":[{"id":"a","text":"选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"},{"id":"b","text":"后面的规则怎样盖过前面的，由层叠决定。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。后面的规则怎样盖过前面的，由层叠决定。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr2-3","pointId":"mx-css-selector-simple","stem":"选出所有正确的说法。页面上有很多价格，只想给带 price 类的那几个上色，选择器怎么写？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":".price 匹配带这个类的元素。"},{"id":"d","text":"#order 匹配这一个 id。"}],"answer":"c","answers":["c","d"],"explain":"p 匹配所有段落。 .price 匹配带这个类的元素。#order 匹配这一个 id。谁更优先见层叠。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr2-4","pointId":"mx-css-box-sizing","stem":"选出所有正确的说法。元素设了 width:100%，为什么一加 padding 就溢出父元素？","options":[{"id":"a","text":"content-box 的 padding/border 加在 width 外。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"border-box 把它们算进设定宽度。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"content-box 的 padding/border 加在 width 外。border-box 把它们算进设定宽度。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr2-5","pointId":"mx-css-stacking","stem":"选出所有正确的说法。子元素 z-index:9999 为什么仍盖不过旁边的弹层？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"子元素的 9999 只在 A 内部竞争，不能越过 A 去跟 B 比。"}],"answer":"b","answers":["b","d"],"explain":"先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。子元素的 9999 只在 A 内部竞争，不能越过 A 去跟 B 比。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr2-6","pointId":"mx-css-grid-flex","stem":"选出所有正确的说法。页面布局是不是都应该改成 Grid？","options":[{"id":"a","text":"不是所有布局都该改成 Grid。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"一条轴上的控件用 Flex，二维轨道用 Grid。"}],"answer":"a","answers":["a","d"],"explain":"不是。不是所有布局都该改成 Grid。一条轴上的控件用 Flex，二维轨道用 Grid。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xbr2-7","pointId":"mx-css-container-query","stem":"选出所有正确的说法。卡片在侧栏里变窄了，为什么媒体查询还按整页宽度给宽屏样式？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"两处都用媒体查询时，主栏和侧栏的卡片跟着视口一起变，窄侧栏里也会横排。"},{"id":"c","text":"改成容器查询后，宽主栏里的卡片横排，窄于阈值的侧栏仍上下排。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"两处都用媒体查询时，主栏和侧栏的卡片跟着视口一起变，窄侧栏里也会横排。改成容器查询后，宽主栏里的卡片横排，窄于阈值的侧栏仍上下排。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-1","pointId":"mx-react-app-around-library","stem":"选出所有正确的说法。只装了 react 和 react-dom，页面地址和向服务器取数要自己找哪一类工具？","options":[{"id":"a","text":"文档建议新的网站或应用从框架开始。"},{"id":"b","text":"列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。"},{"id":"c","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。手机原生界面用 Expo。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-2","pointId":"mx-react-function-component","stem":"选出所有正确的说法。页面上的一段价格，在 React 里写成什么？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"写成一个大写开头的函数，return 里放要显示的元素。"},{"id":"d","text":"JSX 会变成创建元素的调用，不是一段 HTML 字符串。"}],"answer":"c","answers":["c","d"],"explain":"写成一个大写开头的函数，return 里放要显示的元素。JSX 会变成创建元素的调用，不是一段 HTML 字符串。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-3","pointId":"mx-react-props-argument","stem":"选出所有正确的说法。同一个价格组件要显示 100 和 200，数字从哪里来？","options":[{"id":"a","text":"调用时写成 cents={100}。"},{"id":"b","text":"函数的参数 props.cents 就是这个值。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"调用时写成 cents={100}。函数的参数 props.cents 就是这个值。不要在组件里改 props。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-4","pointId":"mx-react-usestate-pair","stem":"选出所有正确的说法。按钮每点一次，数字要加 1，这个数字放在哪里？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"用 useState(0) 取出当前值和更新函数。"},{"id":"d","text":"调用更新函数会安排组件再执行一次，这一次函数里的值不会当场变成新的。"}],"answer":"c","answers":["c","d"],"explain":"用 useState(0) 取出当前值和更新函数。调用更新函数会安排组件再执行一次，这一次函数里的值不会当场变成新的。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-5","pointId":"mx-linked-list","stem":"选出所有正确的说法。为什么 Hook 顺序会影响 state 身份？","options":[{"id":"a","text":"Hook 按调用顺序挂在链表上。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"中间少调或多调一次，后面的 state 会对错节点。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"Hook 按调用顺序挂在链表上。中间少调或多调一次，后面的 state 会对错节点。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-6","pointId":"mx-controlled-input","stem":"选出所有正确的说法。输入框已经绑了 value，为什么打字打不进去？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"受控输入的画面只听 value。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"变更函数不写回 state，或晚到的详情覆盖表单状态，字都留不住。"}],"answer":"b","answers":["b","d"],"explain":"受控输入的画面只听 value。变更函数不写回 state，或晚到的详情覆盖表单状态，字都留不住。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-7","pointId":"mx-effects","stem":"选出所有正确的说法。获取详情的请求写在 useEffect 里，为什么快速切换 id 后屏幕上是上一条的数据？","options":[{"id":"a","text":"切换 id 后，上一次请求仍可能返回。"},{"id":"b","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"没有清理时，慢请求会写进已经离开的那一页。"}],"answer":"a","answers":["a","d"],"explain":"切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-8","pointId":"mx-react-effect-timing","stem":"选出所有正确的说法。为什么不能写成：useEffect 总在改完像素之后，而且一定比 useLayoutEffect 晚？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"要在绘制前量布局、避免闪一帧时用 useLayoutEffect。"},{"id":"c","text":"默认副作用仍用 useEffect；服务端没有布局。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"b","answers":["b","c"],"explain":"要在绘制前量布局、避免闪一帧时用 useLayoutEffect。默认副作用仍用 useEffect；服务端没有布局。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-9","pointId":"mx-react-context-stable","stem":"选出所有正确的说法。旧资料说 Context 还在实验、中间 shouldComponentUpdate 为 false 会丢更新。为什么这不能当 React 19 的答案？","options":[{"id":"a","text":"现行写法是 createContext、Provider 和 useContext。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"中间组件跳过渲染时，深层仍能读到新的 Context 值。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"现行写法是 createContext、Provider 和 useContext。中间组件跳过渲染时，深层仍能读到新的 Context 值。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-10","pointId":"mx-react-props-state-sync","stem":"选出所有正确的说法。为什么「useState(props) 只在第一次生效，所以必须用 useEffect 同步 props」常常是错的？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"多数情况应在渲染期直接用 props，或用 key 换身份重置。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"用 Effect 把 props 抄进 state，容易先闪旧值再被覆盖。"}],"answer":"b","answers":["b","d"],"explain":"多数情况应在渲染期直接用 props，或用 key 换身份重置。用 Effect 把 props 抄进 state，容易先闪旧值再被覆盖。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-11","pointId":"mx-react-gdsfp-copy","stem":"选出所有正确的说法。为什么用 getDerivedStateFromProps 把 props 写回 state，或把请求放进 componentWillReceiveProps，不能当现行默认？","options":[{"id":"a","text":"派生时会把本地更新打回 props。"},{"id":"b","text":"请求也不该放进已标 UNSAFE 的接收 props 方法；渲染期用 props 或用 key 重置。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","b"],"explain":"派生时会把本地更新打回 props。请求也不该放进已标 UNSAFE 的接收 props 方法；渲染期用 props 或用 key 重置。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-12","pointId":"mx-react-hooks-over-hoc","stem":"选出所有正确的说法。为什么「class 之后 mixins 不能用了，所以 HOC 完全等价替代」不够当现行答案？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"fetch 对 4xx 不抛错。"},{"id":"c","text":"复用状态的现行默认是 Hook。"},{"id":"d","text":"HOC 会多一层包装并展开 props；Hook 在组件里直接取返回值。"}],"answer":"c","answers":["c","d"],"explain":"复用状态的现行默认是 Hook。HOC 会多一层包装并展开 props；Hook 在组件里直接取返回值。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-13","pointId":"mx-react-event-root","stem":"选出所有正确的说法。为什么「事件都绑在 document 上，所以要用 preventDefault 代替 stopPropagation」不能当 React 19 的答案？","options":[{"id":"a","text":"委托在根容器，不在 document。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"停止冒泡仍用 stopPropagation；取消默认行为才用 preventDefault。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"委托在根容器，不在 document。停止冒泡仍用 stopPropagation；取消默认行为才用 preventDefault。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-14","pointId":"mx-react-fiber-interrupt","stem":"选出所有正确的说法。为什么把 Fiber 背成「操作系统协程，并顺便做 JIT、修正 reflow」容易误导？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Fiber 让渲染阶段可中断；提交阶段才改 DOM。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"它不是操作系统协程，也不负责 JIT 或修正 reflow。"}],"answer":"b","answers":["b","d"],"explain":"Fiber 让渲染阶段可中断；提交阶段才改 DOM。它不是操作系统协程，也不负责 JIT 或修正 reflow。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-15","pointId":"mx-react-vdom-perf-bound","stem":"选出所有正确的说法。为什么“上了虚拟 DOM 就一定比直接操作 DOM 更快”不能当面试标准答案？","options":[{"id":"a","text":"虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"小改文案和海量插入都要以实测为准。"}],"answer":"a","answers":["a","d"],"explain":"虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。小改文案和海量插入都要以实测为准。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-16","pointId":"mx-react-version-checklist","stem":"选出所有正确的说法。为什么背「最新 React = Time Slicing + Suspense + Hooks，再加 useMutationEffect」对 React 19 不够？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"useMutationEffect 等已不在现行清单。"},{"id":"c","text":"留下 createRoot、函数组件加 Hooks，以及 lazy、Suspense 与错误边界。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"useMutationEffect 等已不在现行清单。留下 createRoot、函数组件加 Hooks，以及 lazy、Suspense 与错误边界。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre1-17","pointId":"mx-react-createclass-gone","stem":"选出所有正确的说法。为什么把“函数组件、createClass、extends Component”并列为今天声明组件的三种方式会过时？","options":[{"id":"a","text":"createClass 已移出核心包。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"今天默认是函数组件加 Hooks；类组件是仍支持的遗留写法。"}],"answer":"a","answers":["a","d"],"explain":"createClass 已移出核心包。今天默认是函数组件加 Hooks；类组件是仍支持的遗留写法。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-1","pointId":"mx-react-eco-chapter-aim","stem":"选出所有正确的说法。react 包本身不管地址和取数，这一章补的是哪三类工具？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"补路由、客户端状态和服务器状态。"},{"id":"c","text":"react 包只负责组件和把组件放进页面。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"b","answers":["b","c"],"explain":"补路由、客户端状态和服务器状态。react 包只负责组件和把组件放进页面。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-2","pointId":"mx-react-router-element-api","stem":"选出所有正确的说法。为什么把 Switch、Route 的 component={About}、Redirect、activeClassName 当作现行默认 API 会过时？","options":[{"id":"a","text":"现行默认是 Routes、element 和 Navigate。"},{"id":"b","text":"Switch、component={About}、Redirect、activeClassName 是旧 API。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"现行默认是 Routes、element 和 Navigate。Switch、component={About}、Redirect、activeClassName 是旧 API。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-3","pointId":"mx-react-router-error-element","stem":"选出所有正确的说法。loader 抛错之后，为什么整页白屏，而不是只坏这一段路由？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"loader 抛错若没有 errorElement，会整页失败。"},{"id":"d","text":"错误元素写在哪一层，失败就停在哪一层。"}],"answer":"c","answers":["c","d"],"explain":"loader 抛错若没有 errorElement，会整页失败。错误元素写在哪一层，失败就停在哪一层。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-4","pointId":"mx-rr-mode-gates-data","stem":"选出所有正确的说法。为什么路由上已经写了 loader，进入页面时组件仍然先空着？","options":[{"id":"a","text":"loader 只在 createBrowserRouter 这一档、于渲染前执行。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"外层仍是 BrowserRouter 时，组件会先空着。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"loader 只在 createBrowserRouter 这一档、于渲染前执行。外层仍是 BrowserRouter 时，组件会先空着。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-5","pointId":"mx-rr-outlet-keeps-layout","stem":"选出所有正确的说法。为什么从仪表盘进到设置页，侧栏的折叠状态会丢？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"子路由画在父级的 Outlet 里，父级不卸载，侧栏状态才能留下。"},{"id":"c","text":"它是网页里用来写行为的编程语言。"},{"id":"d","text":"两条平级各自复制侧栏，切换就会丢。"}],"answer":"b","answers":["b","d"],"explain":"子路由画在父级的 Outlet 里，父级不卸载，侧栏状态才能留下。两条平级各自复制侧栏，切换就会丢。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-6","pointId":"mx-rr-redirect-before-render","stem":"选出所有正确的说法。为什么未登录打开订单页，会先闪一下订单骨架，再进登录页？","options":[{"id":"a","text":"在 loader 里 redirect，组件不会先渲染。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"放到 useEffect 里再跳转，会先闪订单骨架。"}],"answer":"a","answers":["a","d"],"explain":"在 loader 里 redirect，组件不会先渲染。放到 useEffect 里再跳转，会先闪订单骨架。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-7","pointId":"mx-state-kind-picks-home","stem":"选出所有正确的说法。为什么订单列表、主题和弹层开放进了同一个 store，备注却不更新？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"主题、弹层、服务端列表不是同一种状态。"},{"id":"c","text":"塞进同一个 store 后，备注更新可能打不到真正存放它的地方。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"b","answers":["b","c"],"explain":"主题、弹层、服务端列表不是同一种状态。塞进同一个 store 后，备注更新可能打不到真正存放它的地方。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-8","pointId":"mx-state-reducer-context-screen","stem":"选出所有正确的说法。为什么一个任务页就要新建 Redux store？","options":[{"id":"a","text":"单页任务列表用 reducer 加 Context 就够。"},{"id":"b","text":"多页多人同时改、规则已经复杂时，再上 Redux Toolkit。"},{"id":"c","text":"按钮能不能点、库存够不够、失败文案用哪个 type，都要能指出归属其中一件。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"单页任务列表用 reducer 加 Context 就够。多页多人同时改、规则已经复杂时，再上 Redux Toolkit。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-9","pointId":"mx-query-cache-not-http-client","stem":"选出所有正确的说法。为什么装了 TanStack Query，组件里仍要写 fetch 或 Axios？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"Query 管缓存和重试，不代替发请求。"},{"id":"d","text":"queryFn 里仍要调用 fetch 或 Axios。"}],"answer":"c","answers":["c","d"],"explain":"Query 管缓存和重试，不代替发请求。queryFn 里仍要调用 fetch 或 Axios。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-10","pointId":"mx-query-fn-calls-the-client","stem":"选出所有正确的说法。为什么 404 的页面仍显示成功，而且网络面板里同一条查询打了四次？","options":[{"id":"a","text":"不检查 ok 时，404 也会进 data。"},{"id":"b","text":"默认还会重试多次；失败要 throw，并按需要关掉 retry。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"不检查 ok 时，404 也会进 data。默认还会重试多次；失败要 throw，并按需要关掉 retry。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-11","pointId":"mx-query-server-state","stem":"选出所有正确的说法。请求结果已经在 Query 缓存里，为什么还要 setUsers 存一份？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"Query 里已有列表就不要再 setUsers 抄一份。"},{"id":"d","text":"两份缓存失效时只清一个，界面会读到旧数组。"}],"answer":"c","answers":["c","d"],"explain":"Query 里已有列表就不要再 setUsers 抄一份。两份缓存失效时只清一个，界面会读到旧数组。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xre2-12","pointId":"mx-redux-rtk-today","stem":"选出所有正确的说法。为什么把 createStore + 手写 switch reducer + 自行 applyMiddleware(thunk) 当作现行标准答案不够？","options":[{"id":"a","text":"今天写 Redux 用 Toolkit：configureStore 和 createSlice。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"手写 createStore、switch 和自行拼 thunk 不是现行默认。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"今天写 Redux 用 Toolkit：configureStore 和 createSlice。手写 createStore、switch 和自行拼 thunk 不是现行默认。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-1","pointId":"mx-vue-what-it-is","stem":"选出所有正确的说法。Vue 用什么描述要显示的 HTML，数据变了之后谁去改 DOM？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"模板按当前的 JavaScript 状态描述要输出的 HTML。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"Vue 跟踪这些状态，状态变了就更新 DOM。"}],"answer":"b","answers":["b","d"],"explain":"模板按当前的 JavaScript 状态描述要输出的 HTML。Vue 跟踪这些状态，状态变了就更新 DOM。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-2","pointId":"mx-vue-create-app-mount","stem":"选出所有正确的说法。一个 Vue 应用挂到页面上的哪一块？","options":[{"id":"a","text":"createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。"},{"id":"b","text":"按钮能不能点、库存够不够、失败文案用哪个 type，都要能指出归属其中一件。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"之后这一块内部由 Vue 更新。"}],"answer":"a","answers":["a","d"],"explain":"createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。之后这一块内部由 Vue 更新。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-3","pointId":"mx-vue-app-around-core","stem":"选出所有正确的说法。换页面地址、多个页面共用的状态、正文要出现在服务端发出的 HTML 里，各用什么？","options":[{"id":"a","text":"按钮能不能点、库存够不够、失败文案用哪个 type，都要能指出归属其中一件。"},{"id":"b","text":"地址用 Vue Router，多个页面共用的状态用 Pinia。"},{"id":"c","text":"正文要出现在服务端发出的 HTML 里，用 Nuxt 这一类框架。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"b","answers":["b","c"],"explain":"地址用 Vue Router，多个页面共用的状态用 Pinia。正文要出现在服务端发出的 HTML 里，用 Nuxt 这一类框架。vue 包负责组件、模板和响应式。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-4","pointId":"mx-vue-sfc-template","stem":"选出所有正确的说法。一个显示数字的 Vue 组件，模板和脚本各写什么？","options":[{"id":"a","text":"template 写结构和插值。"},{"id":"b","text":"script setup 里声明的名字可以直接写在模板里。"},{"id":"c","text":"选项式和组合式怎么拆大组件是另一课。"},{"id":"d","text":"会写框架不等于这四件事已经对齐。"}],"answer":"a","answers":["a","b","c"],"explain":"template 写结构和插值。script setup 里声明的名字可以直接写在模板里。选项式和组合式怎么拆大组件是另一课。","whyWrong":{"d":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-5","pointId":"mx-vue-proxy-null-guard","stem":"选出所有正确的说法。为什么 typeof null 是 object，却不能 new Proxy(null)？手写 reactive 示例还缺什么？","options":[{"id":"a","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"b","text":"null 的 typeof 是 object，但仍不能作为 Proxy 目标。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"示例若只有日志陷阱，也不等于依赖追踪与触发更新。"}],"answer":"b","answers":["b","d"],"explain":"null 的 typeof 是 object，但仍不能作为 Proxy 目标。示例若只有日志陷阱，也不等于依赖追踪与触发更新。","whyWrong":{"a":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-6","pointId":"mx-vue-array-raw-proxy","stem":"选出所有正确的说法。raw 数组传给 reactive 后，为什么 raw.push() 与 proxy.push() 不是同一条响应式路径？","options":[{"id":"a","text":"raw.push 走原生数组，不通知依赖。"},{"id":"b","text":"只有对代理的写入才会触发已经读过代理的 effect。"},{"id":"c","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"raw.push 走原生数组，不通知依赖。只有对代理的写入才会触发已经读过代理的 effect。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-7","pointId":"mx-vue-nexttick","stem":"选出所有正确的说法。修改 ref 后立刻读取 DOM，为什么可能还是旧内容？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"fetch 对 4xx 不抛错。"},{"id":"c","text":"状态更新后 DOM 在微任务里才刷。"},{"id":"d","text":"同步立刻量到的仍是旧内容；要等 nextTick。"}],"answer":"c","answers":["c","d"],"explain":"状态更新后 DOM 在微任务里才刷。同步立刻量到的仍是旧内容；要等 nextTick。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-8","pointId":"mx-vue-props-one-way","stem":"选出所有正确的说法。在子组件里给 props 赋值，为什么父组件的数据没变，控制台却出现警告？","options":[{"id":"a","text":"props 由父传入，子组件直接赋值会警告且父数据不变。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"要改应 emit，由父写入自己的状态。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","c"],"explain":"props 由父传入，子组件直接赋值会警告且父数据不变。要改应 emit，由父写入自己的状态。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-9","pointId":"mx-vue-list-key","stem":"选出所有正确的说法。列表重排后输入值为什么可能留在原位置？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"没有稳定 key 时，输入状态按位置复用。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"重排后字会留在原格子上，串到另一项。"}],"answer":"b","answers":["b","d"],"explain":"没有稳定 key 时，输入状态按位置复用。重排后字会留在原格子上，串到另一项。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-10","pointId":"mx-vue-composition-options","stem":"选出所有正确的说法。复杂组件里，为什么不能把“改用 Composition API”说成解决所有问题？Options API 会被淘汰吗？","options":[{"id":"a","text":"Composition 便于按功能拆函数，不是淘汰 Options。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"Options 仍受支持；不能说换 API 就解决所有问题。"}],"answer":"a","answers":["a","d"],"explain":"Composition 便于按功能拆函数，不是淘汰 Options。Options 仍受支持；不能说换 API 就解决所有问题。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-11","pointId":"mx-vue-teleport-dom-not-logical","stem":"选出所有正确的说法。对话框已经写在按钮旁边，为什么固定定位还会被外层挡住？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"祖先若有 transform、perspective 或 filter，position: fixed 不再相对视口。"},{"id":"c","text":"〔Teleport｜把模板片段渲染到组件 DOM 层次之外的内置组件〕把片段搬到 body。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"祖先若有 transform、perspective 或 filter，position: fixed 不再相对视口。〔Teleport｜把模板片段渲染到组件 DOM 层次之外的内置组件〕把片段搬到 body。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-12","pointId":"mx-vue-vnode-not-fragment","stem":"选出所有正确的说法。为什么「Vue 2 用 DocumentFragment 建虚拟 DOM，再用 defineProperty 完成全部响应式」对不上源码？","options":[{"id":"a","text":"虚拟 DOM 是 JS 对象描述的 VNode；DocumentFragment 是真实 DOM 容器。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"响应式也不止 defineProperty 那一句。"}],"answer":"a","answers":["a","d"],"explain":"虚拟 DOM 是 JS 对象描述的 VNode；DocumentFragment 是真实 DOM 容器。响应式也不止 defineProperty 那一句。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-13","pointId":"mx-vue-design-goals-proxy","stem":"选出所有正确的说法。为什么「Vue 3 更小更快，而且 Proxy 监听整个对象所以完全不用管深层」不够准确？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"未访问的嵌套对象不会立刻变成代理。"},{"id":"c","text":"体积、更新和首屏要分开看，不能收成一句更快。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"未访问的嵌套对象不会立刻变成代理。体积、更新和首屏要分开看，不能收成一句更快。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-14","pointId":"mx-vue-tree-shake-options","stem":"选出所有正确的说法。为什么“用了 Composition API 就会自动剪掉无用代码”并不完整？","options":[{"id":"a","text":"树摇要 ESM、生产构建和无副作用标记。"},{"id":"b","text":"Options API 相关代码默认保留，除非显式关掉且工程里已无选项式组件。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"树摇要 ESM、生产构建和无副作用标记。Options API 相关代码默认保留，除非显式关掉且工程里已无选项式组件。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu1-15","pointId":"mx-vue-patch-hoist","stem":"选出所有正确的说法。为什么「用了静态标记，更新就不再比较、按钮事件也会直接复用」并不完整？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"标记和缓存有条件：监听捕获局部变量时不能缓存。"},{"id":"d","text":"静态提升与补丁标记要分开看编译结果。"}],"answer":"c","answers":["c","d"],"explain":"标记和缓存有条件：监听捕获局部变量时不能缓存。静态提升与补丁标记要分开看编译结果。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu2-1","pointId":"mx-vue-router-reuse","stem":"选出所有正确的说法。从 /orders/1 进到 /orders/2，为什么 setup 没有再次执行？","options":[{"id":"a","text":"同一组件实例会被复用，setup 不重跑。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"参数变了要 watch params，或靠守卫之外的数据重载。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"同一组件实例会被复用，setup 不重跑。参数变了要 watch params，或靠守卫之外的数据重载。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu2-2","pointId":"mx-vue-router-guard","stem":"选出所有正确的说法。登录校验写在页面 onMounted 里跳转，为什么会先闪一下再回来？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"守卫在确认导航前拦截，页面不会先出现。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"写在 onMounted 里再跳转，会先闪一下内容。"}],"answer":"b","answers":["b","d"],"explain":"守卫在确认导航前拦截，页面不会先出现。写在 onMounted 里再跳转，会先闪一下内容。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu2-3","pointId":"mx-vue-router-scroll","stem":"选出所有正确的说法。从详情返回列表，为什么有时停在半页、有时冲到顶？","options":[{"id":"a","text":"滚动位置由 scrollBehavior 决定。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"后退用 savedPosition，新开模块滚到顶，不能指望浏览器默认每次一样。"}],"answer":"a","answers":["a","d"],"explain":"滚动位置由 scrollBehavior 决定。后退用 savedPosition，新开模块滚到顶，不能指望浏览器默认每次一样。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xvu2-4","pointId":"mx-vue-keep-alive","stem":"选出所有正确的说法。列表滚到一半进详情，回来为什么有时从头开始，有时还在原地？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"缓存时实例不销毁，回来走 activated，滚动能留下。"},{"id":"c","text":"未缓存则重新创建，列表从头开始。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"缓存时实例不销毁，回来走 activated，滚动能留下。未缓存则重新创建，列表从头开始。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-1","pointId":"mx-fe-pick-decision-order","stem":"选出所有正确的说法。会上给 React、Vue、Angular、Svelte 各打一分，再乘上「要不要服务端渲染」，为什么这样定不下来？","options":[{"id":"a","text":"仓库已经在用 Vue，新的浏览器页面就继续用 Vue。"},{"id":"b","text":"人从微信打开，换的是小程序运行时，不是把 Vue 换成 React。"},{"id":"c","text":"正文要出现在源代码里时，用这个库自己的服务端方案。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","b","c"],"explain":"没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。人从微信打开，换的是小程序运行时，不是把 Vue 换成 React。正文要出现在源代码里时，用这个库自己的服务端方案。","whyWrong":{"d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-2","pointId":"mx-fe-pick-by-surface","stem":"选出所有正确的说法。公司已经在用 React。为什么这句还是决定不了：这次要新建的是浏览器里的内容站、微信小程序，还是手机 App？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"React 只说明浏览器里的界面用什么来更新。"},{"id":"c","text":"内容站、微信小程序、手机 App 是人从哪里打开。"},{"id":"d","text":"Nuxt 是 Vue 的方案，不是从「用 React」推出来的。"}],"answer":"b","answers":["b","c","d"],"explain":"React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。小程序和 App 要换运行时。Nuxt 是 Vue 的方案，不是从「用 React」推出来的。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-3","pointId":"mx-fe-meta-framework-tradeoffs","stem":"选出所有正确的说法。都说要服务端渲染。为什么有的页面用 Next，有的用 Astro，登录后的表格用 Vite 就够？","options":[{"id":"a","text":"先看仓库里已经是哪种界面库，再打开「查看网页源代码」。"},{"id":"b","text":"登录后的表格可以只有一个空的 div。"},{"id":"c","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。文章标题必须已经写在这份 HTML 里时，用这个库自己的服务端方案。不要因为「要服务端渲染」这五个字，同时建出 Next、Nuxt 和 Astro。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-4","pointId":"mx-fe-framework-tradeoffs","stem":"选出所有正确的说法。界面库已经选定。为什么还要打开官方文档，看路由和请求是自带的，还是要再装？","options":[{"id":"a","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"},{"id":"d","text":"Vue 新项目用 Vite、Vue Router、Pinia。"}],"answer":"c","answers":["c","d"],"explain":"选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。Vue 新项目用 Vite、Vue Router、Pinia。Angular 的路由、HTTP、表单都在 @angular 里。Svelte 的应用框架是 SvelteKit。这些句子不能反过来当成「谁的包更全就选谁」。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-5","pointId":"mx-fe-ui-update-model","stem":"选出所有正确的说法。按钮一点，页面上的数字加一。React、Vue、Angular、Svelte 各自要改哪一行，数字才会变？","options":[{"id":"a","text":"React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"Vue 在脚本里改 ref 的 .value。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。Vue 在脚本里改 ref 的 .value。Angular 调用 signal 的 set，并且模板要读到这个 signal。Svelte 5 先用 $state 声明变量，再给它赋值。同一个按钮只留其中一种。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-6","pointId":"mx-fe-ecosystem-slot-tradeoffs","stem":"选出所有正确的说法。已经选定 React。为什么接口列表不能同时放进 React Query 和 Redux？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"列表留在 Query 或路由加载器里的一处。"}],"answer":"b","answers":["b","d"],"explain":"这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。列表留在 Query 或路由加载器里的一处。Redux 只放登录态这类不来自这一次 GET 的数据。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-7","pointId":"mx-fe-react-framework-first","stem":"选出所有正确的说法。只装了 Vite、react 和 react-dom，开发服务器已经能开。为什么还要再决定路由和取数用谁？","options":[{"id":"a","text":"React 文档把路由、取数和打包放在已经集成好的框架里。"},{"id":"b","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"只有这两个包时，路由和数据获取还没选定，要自己选定，或改用文档列出的 Next.js、React Router 框架模式。"}],"answer":"a","answers":["a","d"],"explain":"React 文档把路由、取数和打包放在已经集成好的框架里。只有这两个包时，路由和数据获取还没选定，要自己选定，或改用文档列出的 Next.js、React Router 框架模式。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-8","pointId":"mx-fe-vue-official-slots","stem":"选出所有正确的说法。新的 Vue 3 工程里，为什么还能看到 Vue CLI、Vuex，以及自己写的 history？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。"},{"id":"c","text":"Vue CLI、Vuex 和手写 history 是旧仓库留下的，或误加的第二套。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"b","answers":["b","c"],"explain":"官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。Vue CLI、Vuex 和手写 history 是旧仓库留下的，或误加的第二套。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-9","pointId":"mx-fe-angular-first-party","stem":"选出所有正确的说法。新的 Angular 工程为什么还要再装 React Query、Redux 和 react-router？","options":[{"id":"a","text":"Angular 的路由、HTTP、表单都在 @angular 自己的包里。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"React 的请求缓存和路由接不上这套变更检测，装上之后会出现两套跳转和两份列表缓存。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","c"],"explain":"Angular 的路由、HTTP、表单都在 @angular 自己的包里。React 的请求缓存和路由接不上这套变更检测，装上之后会出现两套跳转和两份列表缓存。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-10","pointId":"mx-fe-sveltekit-runes","stem":"选出所有正确的说法。选了 Svelte，为什么又装上 Vue Router，编译却仍然不管那些路由组件？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Svelte 页面要先由 Svelte 编译。"},{"id":"c","text":"Vue Router 出口里的 .svelte 没有走这条编译链。"},{"id":"d","text":"新应用用官方的 SvelteKit 管路由和取数；状态用 runes（如 $state）在编译期标出依赖。"}],"answer":"b","answers":["b","c","d"],"explain":"Svelte 页面要先由 Svelte 编译。Vue Router 出口里的 .svelte 没有走这条编译链。新应用用官方的 SvelteKit 管路由和取数；状态用 runes（如 $state）在编译期标出依赖。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-11","pointId":"mx-fe-ecosystem-follows-model","stem":"选出所有正确的说法。已经选定 Vue。为什么仓库里还会同时出现 React Router、Pinia 和 HttpClient？","options":[{"id":"a","text":"选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。"},{"id":"b","text":"React Router 和 Angular 的 HttpClient 是另一套框架的包，不应出现在同一张表的路径上。"},{"id":"c","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","b"],"explain":"选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。React Router 和 Angular 的 HttpClient 是另一套框架的包，不应出现在同一张表的路径上。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-12","pointId":"mx-fe-react-one-slot","stem":"选出所有正确的说法。新仓库里为什么会同时出现 Redux、Zustand、React Query，以及两套路由？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"路由一格、服务端列表缓存一格、客户端会话一格。"},{"id":"d","text":"热门库都装上时，同一份订单会有两套失效写法。"}],"answer":"c","answers":["c","d"],"explain":"每个职责只留一个库。路由一格、服务端列表缓存一格、客户端会话一格。热门库都装上时，同一份订单会有两套失效写法。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-13","pointId":"mx-fe-angular-resource-not-ngrx","stem":"选出所有正确的说法。新的 Angular 应用（默认不用 zone.js）还没写出第一张订单表，为什么已经加了 Store、Effects 和 React Query？","options":[{"id":"a","text":"列表走 HttpClient 或 httpResource 即可。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"React Query 是 React 生态的钩子，装进这个工程和 Angular 的变更检测不是一套。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"列表走 HttpClient 或 httpResource 即可。NgRx 不是新应用默认。React Query 是 React 生态的钩子，装进这个工程和 Angular 的变更检测不是一套。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-14","pointId":"mx-fe-svelte-load-not-store","stem":"选出所有正确的说法。load 里已经取到订单。为什么组件里的全局 store 在服务端会串到别人的请求？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"load 跑在服务端时，写入模块级 store 会留到下一次请求。"},{"id":"c","text":"任一项须查实现才能回答，则该项尚未掌握。"},{"id":"d","text":"列表应由 load return，页面读 data，不要在 load 里给全局 store 赋值。"}],"answer":"b","answers":["b","d"],"explain":"load 跑在服务端时，写入模块级 store 会留到下一次请求。列表应由 load return，页面读 data，不要在 load 里给全局 store 赋值。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-15","pointId":"mx-fe-cross-end-one-runtime","stem":"选出所有正确的说法。同一份 React 组件打进了网页。为什么还期望小程序和手机 App 都不用改？","options":[{"id":"a","text":"网页画到 DOM，小程序和 App 是另外的运行时。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"同一份带 document 或 div 的组件不能同时当这三端的唯一实现。"}],"answer":"a","answers":["a","d"],"explain":"网页画到 DOM，小程序和 App 是另外的运行时。同一份带 document 或 div 的组件不能同时当这三端的唯一实现。每一端只留一个运行时。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx1-16","pointId":"mx-fe-expo-router-one-nav","stem":"选出所有正确的说法。create-expo-app 之后又装了一套 React Navigation。为什么两个地方都在改同一条地址？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Expo 新模板默认用 Expo Router 做文件路由。"},{"id":"c","text":"再挂一套独立的 React Navigation 去管同一条地址，同一次点击会走两套栈。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"Expo 新模板默认用 Expo Router 做文件路由。再挂一套独立的 React Navigation 去管同一条地址，同一次点击会走两套栈。应用层只留一个入口。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx2-1","pointId":"mx-mfe-what-it-is","stem":"选出所有正确的说法。把仓库拆成 src/orders 和 src/pay，算不算已经做了微前端？","options":[{"id":"a","text":"微前端要能独立构建、独立发布，再拼成一个产品。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"只拆目录、仍同一次发版，还不是。"}],"answer":"a","answers":["a","d"],"explain":"不算。微前端要能独立构建、独立发布，再拼成一个产品。只拆目录、仍同一次发版，还不是。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx2-2","pointId":"mx-mfe-when-to-split","stem":"选出所有正确的说法。为什么两个业务线共用一个仓库、同一次发版，却要上微前端？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"共用仓库、同一次发版时，微前端解决不了独立发版。"},{"id":"c","text":"先写清团队、节奏和失败可见性，写不出就这次不拆。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"共用仓库、同一次发版时，微前端解决不了独立发版。先写清团队、节奏和失败可见性，写不出就这次不拆。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx2-3","pointId":"mx-mfe-compare-matrix","stem":"选出所有正确的说法。Module Federation、single-spa、qiankun、无界、iframe 是不是越新越好？","options":[{"id":"a","text":"表只写每种方案的主缝和做不到的事。"},{"id":"b","text":"仓库里已有的加载方式先留下，不按发布时间换成更新的那一个。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"不是。表只写每种方案的主缝和做不到的事。仓库里已有的加载方式先留下，不按发布时间换成更新的那一个。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx2-4","pointId":"mx-mfe-qiankun-html-entry","stem":"选出所有正确的说法。子应用已经能单独打开，为什么挂到 qiankun 主应用后白屏，控制台却在抱怨 container？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"单独能开只说明子应用自己的入口在。"},{"id":"d","text":"挂到壳上还要正确的 HTML entry、真正的 container 元素，以及 URL 激活或手动挂载二选一。"}],"answer":"c","answers":["c","d"],"explain":"单独能开只说明子应用自己的入口在。挂到壳上还要正确的 HTML entry、真正的 container 元素，以及 URL 激活或手动挂载二选一。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx2-5","pointId":"mx-mfe-independent-deploy","stem":"选出所有正确的说法。子应用一发版就改掉 CDN 上的 remoteEntry.js，壳不发版，为什么有时全站白屏？","options":[{"id":"a","text":"覆盖同一个 remoteEntry.js 无法回滚。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"产物要带版本，壳要能捕获加载失败并降级。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"覆盖同一个 remoteEntry.js 无法回滚。产物要带版本，壳要能捕获加载失败并降级。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx3-1","pointId":"mx-rn-not-webview-app","stem":"选出所有正确的说法。手机里已经能用 WebView 打开现有网站，还要不要 React Native？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"要原生控件、原生导航和平台能力时才用。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"只是打开一个网址，用 WebView 就够，不必整页都当 React Native。"}],"answer":"b","answers":["b","d"],"explain":"要原生控件、原生导航和平台能力时才用。只是打开一个网址，用 WebView 就够，不必整页都当 React Native。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx3-2","pointId":"mx-rn-text-not-under-view","stem":"选出所有正确的说法。为什么 View 里直接写「请登录」会抛异常，给根 View 设了 fontFamily 里面的字却还是默认字体？","options":[{"id":"a","text":"<View>请登录</View> 会抛异常。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"合法结构是 View 里面再放 Text。"}],"answer":"a","answers":["a","d"],"explain":"<View>请登录</View> 会抛异常。合法结构是 View 里面再放 Text。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx3-3","pointId":"mx-rn-flex-defaults","stem":"选出所有正确的说法。为什么 display:flex; flex-direction:row 贴进 StyleSheet 之后，三个子 View 仍从上往下排，挤在一起也不缩小？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"View 默认就是 flex 容器，不需要 display:flex。"},{"id":"c","text":"不写方向时主轴是 column，子节点竖排。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"View 默认就是 flex 容器，不需要 display:flex。不写方向时主轴是 column，子节点竖排。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx3-4","pointId":"mx-rn-pressable-not-click","stem":"选出所有正确的说法。为什么把提交写成 View 的 onClick，手指按下去日志一条都没有？","options":[{"id":"a","text":"日志应出现在 Pressable 的 onPress。"},{"id":"b","text":"按下在 onPressIn，抬起且仍在热区内才 onPress。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"日志应出现在 Pressable 的 onPress。按下在 onPressIn，抬起且仍在热区内才 onPress。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx3-5","pointId":"mx-rn-flatlist-window","stem":"选出所有正确的说法。为什么 ScrollView 里 map 出一千行会卡，而且行里输入框的字滑出屏幕再回来就没了？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"长列表用 FlatList，传入 data 和 renderItem。"},{"id":"d","text":"它只挂渲染窗口里的行，不像 ScrollView 一次挂出全部。"}],"answer":"c","answers":["c","d"],"explain":"长列表用 FlatList，传入 data 和 renderItem。它只挂渲染窗口里的行，不像 ScrollView 一次挂出全部。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx3-6","pointId":"mx-rn-dimensions-not-cached","stem":"选出所有正确的说法。为什么把手机横过来之后，按启动时存下的 window.width 排的卡片还是竖屏那一列的宽度？","options":[{"id":"a","text":"模块顶层存下的宽度在旋转后仍是旧值。"},{"id":"b","text":"每次渲染重新读 Dimensions.get(\"window\")，或直接用 useWindowDimensions。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"模块顶层存下的宽度在旋转后仍是旧值。每次渲染重新读 Dimensions.get(\"window\")，或直接用 useWindowDimensions。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx3-7","pointId":"mx-rn-hermes-default","stem":"选出所有正确的说法。为什么在 Chrome 里能跑的写法，到了默认的 React Native 工程却对不上？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"默认引擎是 Hermes，文档写明不必再配置才能启用。"},{"id":"d","text":"换成 JavaScriptCore 是退出 Hermes，不是默认路径。"}],"answer":"c","answers":["c","d"],"explain":"默认引擎是 Hermes，文档写明不必再配置才能启用。换成 JavaScriptCore 是退出 Hermes，不是默认路径。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx3-8","pointId":"mx-rn-fetch-not-document","stem":"选出所有正确的说法。为什么登录请求用 fetch 已经成功，紧接着 localStorage.setItem 存令牌却没有这个对象？","options":[{"id":"a","text":"fetch 和 XMLHttpRequest 在补齐列表里，可以用来发请求。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"document 和 localStorage 不在这份列表里，不能用来查界面或存令牌。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"fetch 和 XMLHttpRequest 在补齐列表里，可以用来发请求。document 和 localStorage 不在这份列表里，不能用来查界面或存令牌。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx4-1","pointId":"mx-flutter-enter-app","stem":"选出所有正确的说法。要把一份 Flutter 应用在设备上跑起来，先用哪一条命令建工程？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"用 flutter create。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"它生成 Dart 工程和各平台目录。"}],"answer":"b","answers":["b","d"],"explain":"用 flutter create。它生成 Dart 工程和各平台目录。再用 flutter run 跑在连接的设备或模拟器上。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx4-2","pointId":"mx-flutter-not-html","stem":"选出所有正确的说法。把网页里的 div 和 className 写进 build，能不能当成 Flutter 界面？","options":[{"id":"a","text":"build 返回的是 Widget。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"没有 div，没有 className，也没有 document。"}],"answer":"a","answers":["a","d"],"explain":"不能。build 返回的是 Widget。没有 div，没有 className，也没有 document。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx4-3","pointId":"mx-flutter-widget-not-html","stem":"选出所有正确的说法。为什么 build 里写了 div 和 className，卡片既编不过，也没有一棵文档可以查？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"外层用 Column 或 Container，文字用 Text。"},{"id":"c","text":"build 交出的是新的 Widget 配置，状态在 Element 上，布局和绘制在 RenderObject 上。"},{"id":"d","text":"任一项须查实现才能回答，则该项尚未掌握。"}],"answer":"b","answers":["b","c"],"explain":"外层用 Column 或 Container，文字用 Text。build 交出的是新的 Widget 配置，状态在 Element 上，布局和绘制在 RenderObject 上。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xcx4-4","pointId":"mx-flutter-impeller-own-pixels","stem":"选出所有正确的说法。为什么按钮长得不像系统控件，可页面也不是一个 WebView？","options":[{"id":"a","text":"界面是引擎画在自己表面上的像素，不是 OEM 控件，也不是 WebView。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"iOS 只用 Impeller。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"界面是引擎画在自己表面上的像素，不是 OEM 控件，也不是 WebView。iOS 只用 Impeller。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx4-5","pointId":"mx-flutter-constraints-down","stem":"选出所有正确的说法。为什么 Column 里放了 ListView，报的是高度无界，而不是子组件写错了宽度？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Column 给普通孩子的竖直最大高度是无穷。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"ListView 因此抛出 Vertical viewport was given unbounded height。"}],"answer":"b","answers":["b","d"],"explain":"Column 给普通孩子的竖直最大高度是无穷。ListView 因此抛出 Vertical viewport was given unbounded height。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx4-6","pointId":"mx-flutter-gorouter-not-named","stem":"选出所有正确的说法。为什么分享链接每次打开，订单页都会在当前栈上再压一层？","options":[{"id":"a","text":"命名路由收到深链会再 push 一页，并且没有浏览器前进。"},{"id":"b","text":"同一链接要用 go_router 的 context.go，让栈按路径声明配好。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"命名路由收到深链会再 push 一页，并且没有浏览器前进。同一链接要用 go_router 的 context.go，让栈按路径声明配好。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx4-7","pointId":"mx-cross-four-where-it-fits","stem":"选出所有正确的说法。为什么四套都能做移动界面，页面打不开或返回不刷新时却要查不同的文件？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"小程序打不开先看 pages.json 或 app.config。"},{"id":"d","text":"Flutter 打不开先看 go_router 的路径或这次有没有 Navigator.push。"}],"answer":"c","answers":["c","d"],"explain":"小程序打不开先看 pages.json 或 app.config。Flutter 打不开先看 go_router 的路径或这次有没有 Navigator.push。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx5-1","pointId":"mx-uniapp-what-it-is","stem":"选出所有正确的说法。uni-app 的页面在源码里是哪一种文件，编译之后还是不是同一套运行时？","options":[{"id":"a","text":"常用 Vue 的 .vue 页面。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"不是同一套运行时：编译器按目标端出小程序、H5 或 App 的产物。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"常用 Vue 的 .vue 页面。不是同一套运行时：编译器按目标端出小程序、H5 或 App 的产物。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx5-2","pointId":"mx-uniapp-x-uts-not-vue-page","stem":"选出所有正确的说法。为什么把现有 uni-app 工程的编译目标改成 Android，原来的 .vue 页面却编译不过？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"uni-app 继续用 Vue 3 的 .vue。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"uni-app x 只认 .uvue 和 uts：Android 产物是 Kotlin，iOS 是 Swift，鸿蒙 Next 是 ArkTS，Web 和小程序才是 JavaScript。"}],"answer":"b","answers":["b","d"],"explain":"uni-app 继续用 Vue 3 的 .vue。uni-app x 只认 .uvue 和 uts：Android 产物是 Kotlin，iOS 是 Swift，鸿蒙 Next 是 ArkTS，Web 和小程序才是 JavaScript。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx5-3","pointId":"mx-taro-react-setdata-bridge","stem":"选出所有正确的说法。为什么 setState 已经返回，滚动区却要再等一拍才换上新列表？","options":[{"id":"a","text":"setState 先改逻辑层的模拟 DOM。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"界面要等序列化结果 setData 到视图层，静态模板才画出新节点。"}],"answer":"a","answers":["a","d"],"explain":"setState 先改逻辑层的模拟 DOM。界面要等序列化结果 setData 到视图层，静态模板才画出新节点。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx5-4","pointId":"mx-taro-pages-in-app-config","stem":"选出所有正确的说法。为什么订单组件已经 export，小程序里仍然没有 /pages/order/order 这条路由？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"没写进 pages 的组件不是页面，第一项才是冷启动首页。"},{"id":"c","text":"url 形如 /pages/order/order?id=42。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"没写进 pages 的组件不是页面，第一项才是冷启动首页。url 形如 /pages/order/order?id=42。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx6-1","pointId":"mx-node-not-browser","stem":"选出所有正确的说法。在 Node.js 里写登录态，是不是也可以用 document.cookie？","options":[{"id":"a","text":"Node.js 没有 document。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"HTTP 服务里的 Cookie 写在请求和响应的头字段上。"}],"answer":"a","answers":["a","d"],"explain":"不是。Node.js 没有 document。HTTP 服务里的 Cookie 写在请求和响应的头字段上。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx6-2","pointId":"mx-node-http-close","stem":"选出所有正确的说法。kill 之后为什么有的请求写到一半，有的新请求还被接进来？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"SIGTERM 后应先 server.close 拒新连接并排空在途。"},{"id":"c","text":"只 exit 会把写到一半的响应切断。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"SIGTERM 后应先 server.close 拒新连接并排空在途。只 exit 会把写到一半的响应切断。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx6-3","pointId":"mx-node-nexttick","stem":"选出所有正确的说法。把 nextTick 理解成浏览器微任务，为什么会误判执行顺序？","options":[{"id":"a","text":"先标出同步打印，它一定在两个队列之前。"},{"id":"b","text":"再分别看 nextTick 队列和 Promise 微任务队列，不要把它们合成浏览器那一张图。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"先标出同步打印，它一定在两个队列之前。再分别看 nextTick 队列和 Promise 微任务队列，不要把它们合成浏览器那一张图。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx6-4","pointId":"mx-node-libuv-threadpool","stem":"选出所有正确的说法。大量加密和读文件同时进行，为什么事件循环自己没堵，延迟却上去了？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"走线程池的例如某些文件操作和加密。"},{"id":"d","text":"会堵住循环本身的是同步死循环和长时间的纯计算。"}],"answer":"c","answers":["c","d"],"explain":"走线程池的例如某些文件操作和加密。会堵住循环本身的是同步死循环和长时间的纯计算。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcx6-5","pointId":"mx-node-buffer","stem":"选出所有正确的说法。Buffer.allocUnsafe(10) 的十个字节为什么不能直接发给客户端？","options":[{"id":"a","text":"Buffer.alloc(8) 会把 8 个字节填成 0，读出来是确定的。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"Buffer.allocUnsafe(8) 只分配，不保证清掉原来的内存，未写满就发给别人可能带出残留字节，所以对外使用前要写满，或再 fill。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"Buffer.alloc(8) 会把 8 个字节填成 0，读出来是确定的。Buffer.allocUnsafe(8) 只分配，不保证清掉原来的内存，未写满就发给别人可能带出残留字节，所以对外使用前要写满，或再 fill。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-1","pointId":"mx-java-what-it-is","stem":"选出所有正确的说法。写好的 .java 文件，最后是在哪一层上跑起来的？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"先编译成字节码，再交给 Java 虚拟机执行。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"Java 既指这门语言，也指这套平台。"}],"answer":"b","answers":["b","d"],"explain":"先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-2","pointId":"mx-java-enter-main","stem":"选出所有正确的说法。要把一个类跑起来，命令行里写什么？从哪一个方法开始？","options":[{"id":"a","text":"先 javac 编译，再 java 加上类名。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"虚拟机从 public static void main(String[]) 开始。"}],"answer":"a","answers":["a","d"],"explain":"先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-3","pointId":"mx-java-not-javascript","stem":"选出所有正确的说法。名字里都有 Java，这两门语言是不是在同一个虚拟机里跑？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Java 编译成字节码，在 JVM 里跑。"},{"id":"c","text":"JavaScript 在浏览器引擎或 Node.js 里跑。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"不是。Java 编译成字节码，在 JVM 里跑。JavaScript 在浏览器引擎或 Node.js 里跑。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-4","pointId":"mx-java-wrapper-type","stem":"选出所有正确的说法。已经有 int，为什么还要 Integer？","options":[{"id":"a","text":"Integer 是 int 的包装类。"},{"id":"b","text":"两个 Integer 是否同一个对象，见整数缓存那一课。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"List 和泛型要的是对象。Integer 是 int 的包装类。两个 Integer 是否同一个对象，见整数缓存那一课。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-5","pointId":"mx-java-array-length","stem":"选出所有正确的说法。new int[3] 之后，为什么不能再把长度改成 4？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"长度在 new 的时候定下，放在 length 里。"},{"id":"d","text":"合法下标是 0 到 length - 1。"}],"answer":"c","answers":["c","d"],"explain":"长度在 new 的时候定下，放在 length 里。合法下标是 0 到 length - 1。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-6","pointId":"mx-java-string-type","stem":"选出所有正确的说法。String 为什么能写 s.length()，int 却不能？","options":[{"id":"a","text":"String 是类，变量里是指向字符串对象的引用。"},{"id":"b","text":"字面量 \"CNY\" 的类型就是 String。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"String 是类，变量里是指向字符串对象的引用。字面量 \"CNY\" 的类型就是 String。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-7","pointId":"mx-java-list-set-map","stem":"选出所有正确的说法。订单行、去重后的用户号、订单号到金额，各该用哪一种？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"要顺序、也允许重复，用 List。"},{"id":"d","text":"只要每个元素出现一次，用 Set。"}],"answer":"c","answers":["c","d"],"explain":"要顺序、也允许重复，用 List。只要每个元素出现一次，用 Set。要用键查出值，用 Map。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-8","pointId":"mx-java-if-else","stem":"选出所有正确的说法。为什么 if (n = 0) 编不过？","options":[{"id":"a","text":"if 的条件必须是 boolean。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"n = 0 是赋值，n 是 int，结果也是 int。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"if 的条件必须是 boolean。n = 0 是赋值，n 是 int，结果也是 int。比较要写 n == 0。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-9","pointId":"mx-java-switch-colon","stem":"选出所有正确的说法。case 1 里面没有 break，为什么 case 2 的代码也跑了？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"冒号形式匹配之后会继续执行后面的语句，这叫落入。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"这一支要停住，就写 break。"}],"answer":"b","answers":["b","d"],"explain":"冒号形式匹配之后会继续执行后面的语句，这叫落入。这一支要停住，就写 break。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-10","pointId":"mx-java-method-overload","stem":"选出所有正确的说法。两个都叫 add 的方法，为什么有的能同时存在，有的编不过？","options":[{"id":"a","text":"参数个数或类型不同，就是重载，可以共存。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"参数一样、只改返回类型，签名相同，不能共存。"}],"answer":"a","answers":["a","d"],"explain":"参数个数或类型不同，就是重载，可以共存。参数一样、只改返回类型，签名相同，不能共存。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-11","pointId":"mx-java-class-new-this","stem":"选出所有正确的说法。new Order(10) 调用的是哪一段代码？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"new 创建对象，并调用参数匹配的构造器。"},{"id":"c","text":"构造器里的 this 就是正在创建的这个对象。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"new 创建对象，并调用参数匹配的构造器。构造器里的 this 就是正在创建的这个对象。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-12","pointId":"mx-java-package-access","stem":"选出所有正确的说法。字段什么修饰符都不写，别的包为什么读不到？","options":[{"id":"a","text":"不写修饰符就是包访问，只有同一个包能用。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"另外三档是 public、protected 和 private。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"不写修饰符就是包访问，只有同一个包能用。另外三档是 public、protected 和 private。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-13","pointId":"mx-java-interface-implements","stem":"选出所有正确的说法。类已经可以 extends，为什么还要 interface？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"一个类只能 extends 一个父类。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"interface 规定调用方能用哪些方法，一个类可以实现多个接口。"}],"answer":"b","answers":["b","d"],"explain":"一个类只能 extends 一个父类。interface 规定调用方能用哪些方法，一个类可以实现多个接口。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-14","pointId":"mx-java-try-catch-throws","stem":"选出所有正确的说法。方法签名上的 throws 和方法里的 throw 各做什么？","options":[{"id":"a","text":"throw 是现在抛出一个异常对象。"},{"id":"b","text":"throws 写在方法上，表示这个方法可能把异常交给调用方。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"throw 是现在抛出一个异常对象。throws 写在方法上，表示这个方法可能把异常交给调用方。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-15","pointId":"mx-java-main-launcher","stem":"选出所有正确的说法。有人说没有 main 也能靠静态初始化块跑起来，还有人说 main 可以终结。为什么这两句都不能当现行启动答案？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"启动契约要的是标准签名的 main。"},{"id":"d","text":"静态块会跑，但不是入口；别的签名的 main 只是重载。"}],"answer":"c","answers":["c","d"],"explain":"启动契约要的是标准签名的 main。静态块会跑，但不是入口；别的签名的 main 只是重载。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-16","pointId":"mx-java-string-immutability","stem":"选出所有正确的说法。在循环里用 + 拼字符串，为什么又慢又产生大量临时对象？","options":[{"id":"a","text":"每次 + 都在造新串并复制旧字符。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"循环里积累文本要用可变缓冲，短的固定拼接可以继续用加号。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"每次 + 都在造新串并复制旧字符。循环里积累文本要用可变缓冲，短的固定拼接可以继续用加号。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-17","pointId":"mx-java-string-new-vs-pool","stem":"选出所有正确的说法。为什么把 `String s = new String(\"xyz\");` 固定背成“一定创建两个对象”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"字面量进池；new 再多一个堆上的 String。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"池里已有该字面量时，新增的是那一个实例，不是固定两个。"}],"answer":"b","answers":["b","d"],"explain":"字面量进池；new 再多一个堆上的 String。池里已有该字面量时，新增的是那一个实例，不是固定两个。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-18","pointId":"mx-java-generics","stem":"选出所有正确的说法。为什么 List<String> 和 List<Integer> 不能用 instanceof 区分？","options":[{"id":"a","text":"擦除之后运行时看不见元素类型，instanceof 区分不了。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"List<?> 元素类型未知，基本不能往里 add 非 null。"}],"answer":"a","answers":["a","d"],"explain":"擦除之后运行时看不见元素类型，instanceof 区分不了。List<?> 元素类型未知，基本不能往里 add 非 null。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-19","pointId":"mx-java-record-accessor","stem":"选出所有正确的说法。为什么把实体改成 record 之后，懒加载和脏检查都乱了？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"record 按圆括号里列出的名字比较相等。"},{"id":"c","text":"这些名字在 JEP 395 里叫 component。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"record 按圆括号里列出的名字比较相等。这些名字在 JEP 395 里叫 component。它默认不可变，不适合当要代理的 JPA 实体。值对象用 record，要脏检查的实体用 class。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-20","pointId":"mx-java-protected-other-pkg-subclass","stem":"选出所有正确的说法。为什么权限表把 protected 的“其他 package”打叉，又把“子孙类”打勾，让人以为跨包子类不能用？","options":[{"id":"a","text":"protected 对本包可见，也允许其他包的子类访问继承成员。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"Java 没有 friendly 关键字。"}],"answer":"a","answers":["a","d"],"explain":"protected 对本包可见，也允许其他包的子类访问继承成员。Java 没有 friendly 关键字。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-21","pointId":"mx-java-anonymous-extends-or-implements","stem":"选出所有正确的说法。为什么说匿名内部类“不能 extends 其它类，只能当接口让别人实现”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"匿名类可以 new 父类(){}，就是在继承。"},{"id":"c","text":"只是没有名字，不能再写 extends/implements 关键字。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"匿名类可以 new 父类(){}，就是在继承。只是没有名字，不能再写 extends/implements 关键字。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-22","pointId":"mx-java-ctor-implicit-super-noarg","stem":"选出所有正确的说法。为什么把“子类构造器无论有参无参都会调用父类无参构造”当成永远成立？","options":[{"id":"a","text":"编译器默认只插无参 super()。"},{"id":"b","text":"父类没有无参时必须显式 super(实参)，不是永远会调到某个父构造。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"编译器默认只插无参 super()。父类没有无参时必须显式 super(实参)，不是永远会调到某个父构造。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-23","pointId":"mx-java-unchecked-not-must-catch","stem":"选出所有正确的说法。笔试题常写：RuntimeException 必须 try/catch，非 RuntimeException 都是外部错误。为什么这不能当标准答案？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"RuntimeException 是未检查异常，编译器不强制 catch。"},{"id":"d","text":"必须处理的是检查异常；Error 不该当业务分支。"}],"answer":"c","answers":["c","d"],"explain":"RuntimeException 是未检查异常，编译器不强制 catch。必须处理的是检查异常；Error 不该当业务分支。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-24","pointId":"mx-java-runtime-ex-not-auto-caught","stem":"选出所有正确的说法。为什么把运行时异常背成“虚拟机会自动抛出并自动捕获，就算没写 catch 也会处理掉”？","options":[{"id":"a","text":"没有 catch 时异常沿栈往上走，线程按未捕获处理器结束。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"JVM 不会替你自动 catch。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"没有 catch 时异常沿栈往上走，线程按未捕获处理器结束。JVM 不会替你自动 catch。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-25","pointId":"mx-java-clone-exception-checked","stem":"选出所有正确的说法。为什么图画了 Cloneable，有人就以为每个对象都有公开 clone，失败时还当成运行时异常？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Cloneable 没有公开方法；Object.clone 是 protected。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"CloneNotSupportedException 是检查异常。"}],"answer":"b","answers":["b","d"],"explain":"Cloneable 没有公开方法；Object.clone 是 protected。CloneNotSupportedException 是检查异常。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-26","pointId":"mx-java-stack-prefer-deque","stem":"选出所有正确的说法。为什么一提到栈就 `new Stack()`，还觉得它继承 Vector 是优点？","options":[{"id":"a","text":"栈结构用 Deque/ArrayDeque。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"Stack 是遗留的 Vector 子类，不是新代码默认。"}],"answer":"a","answers":["a","d"],"explain":"栈结构用 Deque/ArrayDeque。Stack 是遗留的 Vector 子类，不是新代码默认。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-27","pointId":"mx-java-collection-vs-collections","stem":"选出所有正确的说法。为什么图上把 Collection 和 Collections 画在一起，有人就把工具类当成集合根类型？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Collection 是接口；Collections 和 Arrays 是静态工具类。"},{"id":"c","text":"Map 不在 Collection 树上。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"Collection 是接口；Collections 和 Arrays 是静态工具类。Map 不在 Collection 树上。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-28","pointId":"mx-java-arrays-aslist-fixed","stem":"选出所有正确的说法。为什么 asList 之后 add 会失败，也不能把它当成可变 ArrayList？","options":[{"id":"a","text":"asList 是固定大小视图：set 会改底层数组，add/remove 会失败。"},{"id":"b","text":"要增删就拷进真正的 ArrayList。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"asList 是固定大小视图：set 会改底层数组，add/remove 会失败。要增删就拷进真正的 ArrayList。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-29","pointId":"mx-java-foreach-remove-cme","stem":"选出所有正确的说法。为什么觉得 foreach 就是迭代器，所以循环里 `list.remove(s)` 和 `iter.remove()` 一样？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"增强 for 底层仍在 next，循环里直接 list.remove 会坏结构。"},{"id":"d","text":"用 Iterator.remove 或 removeIf。"}],"answer":"c","answers":["c","d"],"explain":"增强 for 底层仍在 next，循环里直接 list.remove 会坏结构。用 Iterator.remove 或 removeIf。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-30","pointId":"mx-hashmap-treeify-need-capacity","stem":"选出所有正确的说法。为什么把 HashMap 冲突背成“链表大于 8 就立刻变红黑树”？","options":[{"id":"a","text":"链表够长还不够，表容量也要达到树化门槛。"},{"id":"b","text":"容量不够时先扩容，不是大于 8 立刻变树。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"链表够长还不够，表容量也要达到树化门槛。容量不够时先扩容，不是大于 8 立刻变树。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-31","pointId":"mx-chm-iterator-weakly-consistent","stem":"选出所有正确的说法。为什么把 java.util.concurrent 一律说成“迭代时拷贝一份，所以永远不抛 ConcurrentModificationException”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"ConcurrentHashMap 迭代不抛 CME，也不保证冻结快照。"},{"id":"d","text":"CopyOnWrite 才是开始时那份数组。"}],"answer":"c","answers":["c","d"],"explain":"ConcurrentHashMap 迭代不抛 CME，也不保证冻结快照。CopyOnWrite 才是开始时那份数组。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-32","pointId":"mx-java-stringbuilder-not-buffer","stem":"选出所有正确的说法。为什么导图写“多线程就用 StringBuffer”，局部循环拼接也跟着换？","options":[{"id":"a","text":"局部拼接用 StringBuilder。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"跨线程不要拿可变缓冲当协议；StringBuffer 的锁只罩单次调用。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"局部拼接用 StringBuilder。跨线程不要拿可变缓冲当协议；StringBuffer 的锁只罩单次调用。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-33","pointId":"mx-java-string-strip-not-trim","stem":"选出所有正确的说法。旧资料常把 trim、无参 getBytes、new String(byte[]) 连成一套。为什么在现行 JDK 里会出错？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"trim 去不掉部分 Unicode 空白；strip 按 Unicode 空白。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"字节转换要写明字符集，不要靠默认。"}],"answer":"b","answers":["b","d"],"explain":"trim 去不掉部分 Unicode 空白；strip 按 Unicode 空白。字节转换要写明字符集，不要靠默认。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-34","pointId":"mx-java-calendar-not-singleton","stem":"选出所有正确的说法。为什么把 Calendar 和 Runtime 一起背成 JDK 里的单例例子会错？","options":[{"id":"a","text":"Calendar.getInstance 每次新建可变实例。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"真正的单例例子是 Runtime.getRuntime，不是日历。"}],"answer":"a","answers":["a","d"],"explain":"Calendar.getInstance 每次新建可变实例。真正的单例例子是 Runtime.getRuntime，不是日历。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-35","pointId":"mx-java-dcl-volatile-enum","stem":"选出所有正确的说法。为什么手写懒汉双重检查却漏掉 volatile，运行时仍可能看到半初始化实例？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"无 volatile 时引用可能先可见、构造未完成。"},{"id":"c","text":"枚举常量由类初始化安全发布，不必自己再套双重检查。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"无 volatile 时引用可能先可见、构造未完成。枚举常量由类初始化安全发布，不必自己再套双重检查。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-36","pointId":"mx-jdk-feature-release-six-months","stem":"选出所有正确的说法。为什么把 Oracle JDK 背成“每三年一版、OpenJDK 每三个月一版、所以 Oracle 更稳定”？","options":[{"id":"a","text":"功能版大约半年一发，LTS 隔几年一个。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"不是 Oracle 三年、OpenJDK 三月那套对照。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"功能版大约半年一发，LTS 隔几年一个。不是 Oracle 三年、OpenJDK 三月那套对照。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-37","pointId":"mx-java-not-every-class-clone-serializable","stem":"选出所有正确的说法。为什么把“经典形式”背成每个类都要实现 equals、hashCode、toString、Cloneable、Serializable？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"equals/hashCode/toString 按需覆盖。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"Cloneable、Serializable 是承诺，不是每个类的五件套。"}],"answer":"b","answers":["b","d"],"explain":"equals/hashCode/toString 按需覆盖。Cloneable、Serializable 是承诺，不是每个类的五件套。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-38","pointId":"mx-java-raw-type-skips-checks","stem":"选出所有正确的说法。为什么把 `List` 和无界 `List<?>` 当成一回事，往 `List<String>` 里 add 整数？","options":[{"id":"a","text":"裸类型 List 跳过泛型检查。"},{"id":"b","text":"List<?> 元素未知，基本不能 add；要装任意对象用 List<Object>。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"裸类型 List 跳过泛型检查。List<?> 元素未知，基本不能 add；要装任意对象用 List<Object>。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-39","pointId":"mx-java-class-newinstance-deprecated","stem":"选出所有正确的说法。为什么反射创建对象还写 `clazz.newInstance()`，并当成“随便实例化、不必知道类名”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"Class.newInstance 已弃用且只走无参。"},{"id":"d","text":"用 Constructor.newInstance；forName 仍需要类名。"}],"answer":"c","answers":["c","d"],"explain":"Class.newInstance 已弃用且只走无参。用 Constructor.newInstance；forName 仍需要类名。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-40","pointId":"mx-java-final-not-fifty-percent","stem":"选出所有正确的说法。为什么优化清单写“类声明成 final，编译器内联所有方法，性能平均提高 50%”？","options":[{"id":"a","text":"final 禁止继承，没有“平均快 50%”的规范。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"内联是 JIT 的事，不要靠赋 null 催 GC。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"final 禁止继承，没有“平均快 50%”的规范。内联是 JIT 的事，不要靠赋 null 催 GC。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-41","pointId":"mx-java-shift-not-times-eight","stem":"选出所有正确的说法。为什么面试把 `2<<3` 当成“最有效率的 2×8”，生产代码也跟着用移位代替乘除？","options":[{"id":"a","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"b","text":"乘除就写乘除，JIT 会折减常数。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"移位留给位图和对齐掩码，不是生产里替代算术的默认写法。"}],"answer":"b","answers":["b","d"],"explain":"乘除就写乘除，JIT 会折减常数。移位留给位图和对齐掩码，不是生产里替代算术的默认写法。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjb1-42","pointId":"mx-java-switch-arrow-no-fall","stem":"选出所有正确的说法。为什么笔试题还在问没写 break 会打印哪几行，有人就把所有 switch 都背成必须 break？","options":[{"id":"a","text":"冒号分支没有 break 会贯穿；箭头分支只跑匹配那一支。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"新代码优先箭头，不是所有 switch 都必须 break。"}],"answer":"a","answers":["a","d"],"explain":"冒号分支没有 break 会贯穿；箭头分支只跑匹配那一支。新代码优先箭头，不是所有 switch 都必须 break。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-1","pointId":"mx-pattern-gof-catalog","stem":"选出所有正确的说法。为什么一上来就写策略模式，却说不清这一章一共有哪些名字？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。"},{"id":"c","text":"指不出变化落在哪一类时，不要先画策略。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。指不出变化落在哪一类时，不要先画策略。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-2","pointId":"mx-pattern-gof-rest","stem":"选出所有正确的说法。为什么二十三里只记住策略和单例，其余都说“用不到可以不看”？","options":[{"id":"a","text":"策略和单例之外仍有撤销、遍历、命令等场景。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"指不出那一块变化时，不要用“用不到”跳过。"}],"answer":"a","answers":["a","d"],"explain":"策略和单例之外仍有撤销、遍历、命令等场景。指不出那一块变化时，不要用“用不到”跳过。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-3","pointId":"mx-pattern-factory-method","stem":"选出所有正确的说法。为什么调用方已经不写 new，方法里却还在按类型 if，就叫工厂方法？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"工厂方法把创建推给子类/创建者。"},{"id":"c","text":"create 里继续按类型 if，名字不成立。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"工厂方法把创建推给子类/创建者。create 里继续按类型 if，名字不成立。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-4","pointId":"mx-pattern-facade-entry","stem":"选出所有正确的说法。为什么调用方要按顺序自己调用库存、支付和写单，还说这是三个策略？","options":[{"id":"a","text":"外观收成一次调用，子系统顺序留在里面。"},{"id":"b","text":"调用方还在选算法时，那一块仍是策略。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"外观收成一次调用，子系统顺序留在里面。调用方还在选算法时，那一块仍是策略。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-5","pointId":"mx-pattern-composite-tree","stem":"选出所有正确的说法。为什么算总价时先 if 这是单品还是套装，套装里再写一遍？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"叶子与容器同一接口，容器转发给子节点。"},{"id":"d","text":"靠 instanceof 判断单品/套装，组合还没成立。"}],"answer":"c","answers":["c","d"],"explain":"叶子与容器同一接口，容器转发给子节点。靠 instanceof 判断单品/套装，组合还没成立。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-6","pointId":"mx-pattern-flyweight-share","stem":"选出所有正确的说法。为什么很多相同的商品规格各 new 一份，就把共享一份叫成单例？","options":[{"id":"a","text":"享元共享不变字段，变化靠参数传入。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"范围内只能有一份对象那是单例，不是享元。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"享元共享不变字段，变化靠参数传入。范围内只能有一份对象那是单例，不是享元。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-7","pointId":"mx-pattern-template-steps","stem":"选出所有正确的说法。为什么把打开、计算、关闭都写成子类可以随便重排的方法？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"模板方法固定步骤顺序，子类只替换某一步。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"需要重排整条流程时改用策略对象。"}],"answer":"b","answers":["b","d"],"explain":"模板方法固定步骤顺序，子类只替换某一步。需要重排整条流程时改用策略对象。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-8","pointId":"mx-pattern-state-transition","stem":"选出所有正确的说法。为什么订单用一个字符串 status，每个方法开头都写一遍 if？","options":[{"id":"a","text":"状态对象持有允许的动作并切换下一状态。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"用字符串 status 到处 if，状态模式没成立。"}],"answer":"a","answers":["a","d"],"explain":"状态对象持有允许的动作并切换下一状态。用字符串 status 到处 if，状态模式没成立。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-9","pointId":"mx-java-buffered-stream-decorator","stem":"选出所有正确的说法。为什么套了 BufferedInputStream 之后，还以为只要关内层的文件流？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"缓冲流是装饰器：关最外层即可连带内层。"},{"id":"c","text":"不要为组合能力去建笛卡尔积子类。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"缓冲流是装饰器：关最外层即可连带内层。不要为组合能力去建笛卡尔积子类。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-10","pointId":"mx-spring-jdbctemplate-callback","stem":"选出所有正确的说法。为什么用了 JdbcTemplate，服务方法上还在声明 throws SQLException？","options":[{"id":"a","text":"JdbcTemplate 把 SQLException 译成 DataAccessException。"},{"id":"b","text":"服务方法不必再声明 throws SQLException。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","b"],"explain":"JdbcTemplate 把 SQLException 译成 DataAccessException。服务方法不必再声明 throws SQLException。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt1-11","pointId":"mx-spring-getbean-hides-deps","stem":"选出所有正确的说法。为什么字段上已经能注入，业务方法里还是 ApplicationContext.getBean？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"依赖写在构造器上，缺了启动就失败。"},{"id":"d","text":"业务方法里 getBean 会把失败推迟并绑死字符串名。"}],"answer":"c","answers":["c","d"],"explain":"依赖写在构造器上，缺了启动就失败。业务方法里 getBean 会把失败推迟并绑死字符串名。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt2-1","pointId":"mx-algo-stable-sort","stem":"选出所有正确的说法。按分数排序后再按姓名排，为什么第一次的相对顺序有时还在、有时乱了？","options":[{"id":"a","text":"稳定排序保住相等元素的相对顺序。"},{"id":"b","text":"分次排多关键字时，只有稳定排序才能从次要关键字排起。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt2-2","pointId":"mx-hash-open-addressing-probe","stem":"选出所有正确的说法。为什么把 Hash 冲突的开放定址只写成“放到冲突位置的下一个空位”会丢探测序列？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"开放定址有线性、二次、双重散列，不是只有“下一个空位”。"},{"id":"d","text":"HashMap 用的是链地址再树化。"}],"answer":"c","answers":["c","d"],"explain":"开放定址有线性、二次、双重散列，不是只有“下一个空位”。HashMap 用的是链地址再树化。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xpt2-3","pointId":"mx-bfs","stem":"选出所有正确的说法。无权图找最少步数，为什么常用 BFS？","options":[{"id":"a","text":"无权图边权都是 1 时，BFS 首次到达就是最少步数。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"visited 应在入队时标记。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-1","pointId":"mx-jvm-method-area-metaspace","stem":"选出所有正确的说法。旧资料常写：方法区等于永久代，JDK7 后常量池挪走了。为什么这不能当现行标准答案？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"规范叫方法区；旧实现是永久代；现行 HotSpot 是 Metaspace。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"OOM 文案指向哪一块就查哪一块。"}],"answer":"b","answers":["b","d"],"explain":"规范叫方法区；旧实现是永久代；现行 HotSpot 是 Metaspace。OOM 文案指向哪一块就查哪一块。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-2","pointId":"mx-jvm-platform-classloader-not-ext","stem":"选出所有正确的说法。为什么还把三层加载器背成 Bootstrap / Extension / Application？","options":[{"id":"a","text":"现行中间层叫平台类加载器，不是 Extension。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"jhat 也不是 Java 21 标配诊断工具。"}],"answer":"a","answers":["a","d"],"explain":"现行中间层叫平台类加载器，不是 Extension。jhat 也不是 Java 21 标配诊断工具。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-3","pointId":"mx-java-heap-not-cpp-manual","stem":"选出所有正确的说法。为什么把“值类型在栈、引用类型在堆、堆上必须手动释放”直接当成 Java 内存模型？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"对象通常在堆，没有手动 free。"},{"id":"c","text":"回收看 GC 根；逃逸分析还可能根本不在堆上留对象。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"对象通常在堆，没有手动 free。回收看 GC 根；逃逸分析还可能根本不在堆上留对象。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-4","pointId":"mx-jvm-gc-choice","stem":"选出所有正确的说法。把默认回收器换成 ZGC，接口就一定会更快吗？","options":[{"id":"a","text":"先抄同一次抖动里的 GC 暂停和接口耗时。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"暂停远小于接口耗时，瓶颈在 SQL、锁或网络，换回收器没有帮助。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"不会。先抄同一次抖动里的 GC 暂停和接口耗时。暂停远小于接口耗时，瓶颈在 SQL、锁或网络，换回收器没有帮助。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-5","pointId":"mx-java-soft-ref-not-oom-proof","stem":"选出所有正确的说法。为什么说“发生 OOM 时肯定已经没有软引用”会过满？","options":[{"id":"a","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"b","text":"软引用清掉仍可能不够，或失败发生在直接内存。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"不能说 OOM 时一定已经没有软引用。"}],"answer":"b","answers":["b","d"],"explain":"软引用清掉仍可能不够，或失败发生在直接内存。不能说 OOM 时一定已经没有软引用。","whyWrong":{"a":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-6","pointId":"mx-jvm-tenuring-threshold-15","stem":"选出所有正确的说法。为什么把 Survivor 预筛选说成“必须经历 16 次 Minor GC 才进老年代”？","options":[{"id":"a","text":"默认晋升阈值看 MaxTenuringThreshold，常见默认 15。"},{"id":"b","text":"不是必须经历 16 次 Minor GC。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"默认晋升阈值看 MaxTenuringThreshold，常见默认 15。不是必须经历 16 次 Minor GC。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-7","pointId":"mx-jvm-full-gc-not-permgen","stem":"选出所有正确的说法。为什么把 Full GC 背成“清年轻代、老年代和永久代”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"Full GC 收的是整个 Java 堆。"},{"id":"d","text":"没有永久代可清；元数据溢出是 Metaspace 上的另一类错误。"}],"answer":"c","answers":["c","d"],"explain":"Full GC 收的是整个 Java 堆。没有永久代可清；元数据溢出是 Metaspace 上的另一类错误。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-8","pointId":"mx-jvm-major-gc-not-always-full","stem":"选出所有正确的说法。为什么把 Minor / Major / Full 三个词当成同一次整堆停顿的别名？","options":[{"id":"a","text":"Young、Major/Old、Mixed、Full 扫的范围不同。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"不要把三个词当成同一次整堆停顿。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"Young、Major/Old、Mixed、Full 扫的范围不同。不要把三个词当成同一次整堆停顿。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-9","pointId":"mx-jvm-cms-removed-g1-default","stem":"选出所有正确的说法。为什么还按 CMS 调 `-XX:+UseConcMarkSweepGC` 和 PermSize，当现行低延迟方案？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器默认已是 G1；CMS 已删除。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"PermSize 也没了，先测暂停再考虑换收集器。"}],"answer":"b","answers":["b","d"],"explain":"服务器默认已是 G1；CMS 已删除。PermSize 也没了，先测暂停再考虑换收集器。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xjv1-10","pointId":"mx-jvm-safepoint","stem":"选出所有正确的说法。为什么堆很大时，有的线程迟迟不进入 GC，整次停顿被它拖长？","options":[{"id":"a","text":"停顿先等所有线程到安全点，再做回收。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"有线程迟到，空等会拉长总停顿，两段要分开记。"}],"answer":"a","answers":["a","d"],"explain":"停顿先等所有线程到安全点，再做回收。有线程迟到，空等会拉长总停顿，两段要分开记。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-1","pointId":"mx-java-concurrency","stem":"选出所有正确的说法。给 count 加上 volatile 之后，两个线程同时 count++，结果为什么仍可能少加？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"volatile 只保证看见这次写，不把读改写收成一步。"},{"id":"c","text":"两个线程各自 ++ 仍可能丢更新。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"volatile 只保证看见这次写，不把读改写收成一步。两个线程各自 ++ 仍可能丢更新。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-2","pointId":"mx-java-lock-flexibility","stem":"选出所有正确的说法。有资料把 Lock 的最大优势说成“读写分开的锁，好写 ConcurrentHashMap”。为什么不准确？","options":[{"id":"a","text":"Lock 的优势是跨块、tryLock、可中断、Condition。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"读写分开属于 ReadWriteLock，不是 Lock 本身。"}],"answer":"a","answers":["a","d"],"explain":"Lock 的优势是跨块、tryLock、可中断、Condition。读写分开属于 ReadWriteLock，不是 Lock 本身。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-3","pointId":"mx-java-wait-sleep","stem":"选出所有正确的说法。为什么“wait 会释放锁，sleep 一直持有锁”必须先说清楚是哪一把锁？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"wait 释放的是当前监视器；sleep 计时期间不放锁。"},{"id":"c","text":"换成显式锁要用 Condition.await。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"wait 释放的是当前监视器；sleep 计时期间不放锁。换成显式锁要用 Condition.await。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-4","pointId":"mx-java-barrier-latch","stem":"选出所有正确的说法。为什么只说“一个能复用一个不能”还不够区分 Latch 和 Barrier？","options":[{"id":"a","text":"Latch 到零不能重置，第二轮要新建。"},{"id":"b","text":"Barrier 同一对象能再跑一轮，破损后要另处理。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"Latch 到零不能重置，第二轮要新建。Barrier 同一对象能再跑一轮，破损后要另处理。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-5","pointId":"mx-java-aqs-not-futuretask","stem":"选出所有正确的说法。为什么说“搞懂 AQS 就搞懂 J.U.C 全部，包括 FutureTask”会过时？","options":[{"id":"a","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"AQS 仍是许多同步器的模板，但 FutureTask 现行实现已不基于它。"},{"id":"d","text":"搞懂队列模板不等于搞懂全部 J.U.C。"}],"answer":"c","answers":["c","d"],"explain":"AQS 仍是许多同步器的模板，但 FutureTask 现行实现已不基于它。搞懂队列模板不等于搞懂全部 J.U.C。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-6","pointId":"mx-java-cas-aba-stamp","stem":"选出所有正确的说法。为什么“内存里还是 A，CAS 就一定安全”以及“原子类底层就是公开 Unsafe”都不能当答案？","options":[{"id":"a","text":"值变回 A 仍可能中间发生过变化。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"要用带戳的引用；业务代码走原子类或 VarHandle，不要直接 Unsafe。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"值变回 A 仍可能中间发生过变化。要用带戳的引用；业务代码走原子类或 VarHandle，不要直接 Unsafe。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-7","pointId":"mx-java-thread-six-states","stem":"选出所有正确的说法。为什么还把 Java 线程背成“运行、就绪、挂起、结束”四种状态？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Thread.State 是六个状态，没有“挂起”。"},{"id":"c","text":"任一项须查实现才能回答，则该项尚未掌握。"},{"id":"d","text":"sleep 是 TIMED_WAITING，抢 synchronized 是 BLOCKED。"}],"answer":"b","answers":["b","d"],"explain":"Thread.State 是六个状态，没有“挂起”。sleep 是 TIMED_WAITING，抢 synchronized 是 BLOCKED。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-8","pointId":"mx-java-executors-factory-oom","stem":"选出所有正确的说法。为什么手册要求不要用 Executors.newFixedThreadPool 这类工厂，而要自己 new ThreadPoolExecutor？","options":[{"id":"a","text":"固定池常用无界队列，缓存池线程数无上限。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"生产要自己写 ThreadPoolExecutor，写清队列和拒绝策略。"}],"answer":"a","answers":["a","d"],"explain":"固定池常用无界队列，缓存池线程数无上限。生产要自己写 ThreadPoolExecutor，写清队列和拒绝策略。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-9","pointId":"mx-java-tpe-execute-order","stem":"选出所有正确的说法。为什么说“没调用 prestartAllCoreThreads 时，工作队列里已有任务也不会执行”会误导？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"execute 会先建到 core、再入队，队列满才涨到 max。"},{"id":"c","text":"prestart 只是预热，不是“有任务才会跑”的开关。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"execute 会先建到 core、再入队，队列满才涨到 max。prestart 只是预热，不是“有任务才会跑”的开关。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-10","pointId":"mx-java-loom-not-absent-coroutine","stem":"选出所有正确的说法。2022 年材料还说 Java 原生没有协程、协程用不了多核。为什么和现在的运行时对不上？","options":[{"id":"a","text":"虚拟线程已由载体调度，可用多核。"},{"id":"b","text":"共享可变结构仍要锁；CPU 密集不会因此自动变快。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"虚拟线程已由载体调度，可用多核。共享可变结构仍要锁；CPU 密集不会因此自动变快。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-11","pointId":"mx-java-threads-not-linear-speedup","stem":"选出所有正确的说法。为什么把多线程背成“一个线程 100ms，十个线程只要 10ms”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"只有能拆开且不抢同一资源时才接近线性。"},{"id":"d","text":"锁、IO、串行段都会让十线程远慢于十分之一。"}],"answer":"c","answers":["c","d"],"explain":"只有能拆开且不抢同一资源时才接近线性。锁、IO、串行段都会让十线程远慢于十分之一。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xcc1-12","pointId":"mx-thread-pool-formula-not-law","stem":"选出所有正确的说法。为什么资料给线程池大小写成 CPU 核数的两倍就完事，上线后延迟和拒绝策略一起炸？","options":[{"id":"a","text":"核数×2 缺等待比和队列/拒绝策略。"},{"id":"b","text":"要看活跃线程、队列深度与拒绝，并用压测校准。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"核数×2 缺等待比和队列/拒绝策略。要看活跃线程、队列深度与拒绝，并用压测校准。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-1","pointId":"mx-mysql-tradeoffs-capacity","stem":"选出所有正确的说法。有人背“单库多少 QPS、单表多少行”当容量定律。为什么不能？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"没有固定的“单库 QPS / 单表行数”定律。"},{"id":"d","text":"容量看缓冲池、查询形态与复制，要用压测。"}],"answer":"c","answers":["c","d"],"explain":"没有固定的“单库 QPS / 单表行数”定律。容量看缓冲池、查询形态与复制，要用压测。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-2","pointId":"mx-mysql-not-null-default-not-absolute","stem":"选出所有正确的说法。为什么规范写“必须把字段定义为 NOT NULL 并且提供默认值”，还列 NULL 难优化、占空间？","options":[{"id":"a","text":"必填用不变量约束；可选允许 NULL，勿用空串/0 冒充未知。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"默认值只表示明确的业务默认，不是填洞。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"必填用不变量约束；可选允许 NULL，勿用空串/0 冒充未知。默认值只表示明确的业务默认，不是填洞。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-3","pointId":"mx-mysql-check-enforced-not-parsed-only","stem":"选出所有正确的说法。为什么老资料说 MySQL 的 CHECK 只解析不执行，新人却在 8.0 上撞上约束失败？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"8.0.16+ 起 InnoDB 强制 CHECK。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"它挡非法写入，不代替索引与查询优化。"}],"answer":"b","answers":["b","d"],"explain":"8.0.16+ 起 InnoDB 强制 CHECK。它挡非法写入，不代替索引与查询优化。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-4","pointId":"mx-sql-outer-join-where","stem":"选出所有正确的说法。LEFT JOIN 之后为什么有的左表行消失了？","options":[{"id":"a","text":"月份条件放在 ON 里时，没有订单的客户仍在结果中，右表是 NULL。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"把月份放进 WHERE 后，这些补齐行因为 NULL 比较不是真而被丢掉，客户消失，行数变得和内连接一样。"}],"answer":"a","answers":["a","d"],"explain":"月份条件放在 ON 里时，没有订单的客户仍在结果中，右表是 NULL。把月份放进 WHERE 后，这些补齐行因为 NULL 比较不是真而被丢掉，客户消失，行数变得和内连接一样。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-5","pointId":"mx-mysql-join-ban-not-absolute","stem":"选出所有正确的说法。为什么资料在高并发规范里写死“禁止使用 JOIN 查询，禁止大表使用子查询”，理由是“会产生临时表”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"有索引、过滤足够的小结果联结可接受。"},{"id":"c","text":"用 EXPLAIN 看是否索引探查、是否危险的 temporary/filesort。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"有索引、过滤足够的小结果联结可接受。用 EXPLAIN 看是否索引探查、是否危险的 temporary/filesort。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-6","pointId":"mx-mysql-or-not-must-become-in","stem":"选出所有正确的说法。为什么规范写“禁止使用 OR 条件，必须改为 IN”，并说旧版 MySQL 的 OR 不能命中索引？","options":[{"id":"a","text":"同列多值 IN 更易读，计划常相近。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"跨列 OR 看 EXPLAIN，必要时 UNION 或补索引。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"同列多值 IN 更易读，计划常相近。跨列 OR 看 EXPLAIN，必要时 UNION 或补索引。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-7","pointId":"mx-mysql-where-having","stem":"选出所有正确的说法。为什么“WHERE 用列名能走索引，HAVING 用别名不能走索引、专门写聚集函数”不能当标准答案？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"WHERE 过滤可以使用索引，type 和 key 按这条行级条件来。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"无分组、无聚集的 HAVING 会被并进 WHERE，计划接近第一条。"}],"answer":"b","answers":["b","d"],"explain":"WHERE 过滤可以使用索引，type 和 key 按这条行级条件来。无分组、无聚集的 HAVING 会被并进 WHERE，计划接近第一条。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-8","pointId":"mx-mysql-text-ban-not-absolute","stem":"选出所有正确的说法。为什么规范写死“禁止使用 TEXT、BLOB”，理由是浪费空间、淘汰热数据？","options":[{"id":"a","text":"长正文用 TEXT（或等价）合理。"},{"id":"b","text":"禁止的是热点路径投影大列、无必要的大字段进缓冲。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"长正文用 TEXT（或等价）合理。禁止的是热点路径投影大列、无必要的大字段进缓冲。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-9","pointId":"mx-mysql-float-ieee-not-8-digits","stem":"选出所有正确的说法。为什么把 FLOAT 背成“8 位精度、4 字节”，把 DOUBLE 背成“18 位、8 字节”会对不上 IEEE 754？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"FLOAT 大约 4 字节，十进制有效数字大约 7 位，划掉 8 位。"},{"id":"d","text":"DOUBLE 大约 8 字节，大约 15 到 16 位十进制，划掉 18 位。"}],"answer":"c","answers":["c","d"],"explain":"FLOAT 大约 4 字节，十进制有效数字大约 7 位，划掉 8 位。DOUBLE 大约 8 字节，大约 15 到 16 位十进制，划掉 18 位。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-10","pointId":"mx-mysql-json-not-document-db","stem":"选出所有正确的说法。为什么加了 JSON 列、会用 JSON_EXTRACT，还不能说“我们已经是 Mongo 那套文档库”？","options":[{"id":"a","text":"JSON 列在关系行上存半结构化字段。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"事务、表结构、备份仍是 MySQL。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"JSON 列在关系行上存半结构化字段。事务、表结构、备份仍是 MySQL。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-11","pointId":"mx-mysql-view-is-stored-query","stem":"选出所有正确的说法。为什么建了视图之后，基表一改，有人以为视图里还是旧快照？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"普通 VIEW 存查询定义，读时对基表现算。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"冻结快照要物化表、导出或专用方案。"}],"answer":"b","answers":["b","d"],"explain":"普通 VIEW 存查询定义，读时对基表现算。冻结快照要物化表、导出或专用方案。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-12","pointId":"mx-mysql-utf8-alias-not-utf8mb4","stem":"选出所有正确的说法。为什么规范写“必须使用 UTF8 字符集”，并说万国码、省空间、无乱码？","options":[{"id":"a","text":"资料说的 UTF8 应对齐 utf8mb4。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"历史别名 utf8 其实是 utf8mb3，emoji 会写入失败或损坏。"}],"answer":"a","answers":["a","d"],"explain":"资料说的 UTF8 应对齐 utf8mb4。历史别名 utf8 其实是 utf8mb3，emoji 会写入失败或损坏。","whyWrong":{"b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-13","pointId":"mx-mysql-fk-ban-not-absolute","stem":"选出所有正确的说法。为什么规范写死禁止外键，理由是耦合、拖垮 update/delete、易死锁？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"高并发路径上外键有成本，但是启发式。"},{"id":"c","text":"去掉外键必须补校验与对账，不是完整性过时。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"高并发路径上外键有成本，但是启发式。去掉外键必须补校验与对账，不是完整性过时。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-14","pointId":"mx-mysql-phone-varchar-length-not-twenty","stem":"选出所有正确的说法。为什么规范写必须用 varchar(20) 存手机号，并举区号、不做数学、可模糊查？","options":[{"id":"a","text":"手机号长度没有固定“必须 20”的定律。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"按实际号码与扩展字段定，别背死数字。"}],"answer":"a","answers":["a","d"],"explain":"手机号长度没有固定“必须 20”的定律。按实际号码与扩展字段定，别背死数字。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-15","pointId":"mx-mysql-catch-sql-exception-not-enough","stem":"选出所有正确的说法。为什么规范写应用程序必须捕获 SQL 异常并有相应处理？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"只 catch SQLException 不够。"},{"id":"c","text":"要区分约束冲突、死锁与可重试，并落到业务语义。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"只 catch SQLException 不够。要区分约束冲突、死锁与可重试，并落到业务语义。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-16","pointId":"mx-table-design-from-facts","stem":"选出所有正确的说法。为什么按页面输入框各做一列，下单提交之后金额和库存仍不一致？","options":[{"id":"a","text":"三件事实应能落到订单、明细和幂等键上，每件对应一种行。"},{"id":"b","text":"按钮状态和未提交的输入不应成为列。"},{"id":"c","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","b"],"explain":"三件事实应能落到订单、明细和幂等键上，每件对应一种行。按钮状态和未提交的输入不应成为列。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-17","pointId":"mx-table-row-one-grain","stem":"选出所有正确的说法。订单表里放了商品一、商品二、商品三，加上自增 id 之后为什么还是难改？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"订单一行、明细两行时，第三件商品是再插入一行明细，表结构不变。"},{"id":"d","text":"一行里放 sku1、sku2 时，第三件要加列，查询也要再写一列。"}],"answer":"c","answers":["c","d"],"explain":"订单一行、明细两行时，第三件商品是再插入一行明细，表结构不变。一行里放 sku1、sku2 时，第三件要加列，查询也要再写一列。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-18","pointId":"mx-table-constraint-holds-rule","stem":"选出所有正确的说法。代码里已经查过这个幂等键不存在，为什么并发两次提交仍有两行订单？","options":[{"id":"a","text":"只有 Java 查询时，两笔都可能插入，行数是 2。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"加上唯一约束后，行数是 1，第二笔在数据库失败，而不是在 if 里被挡住。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"只有 Java 查询时，两笔都可能插入，行数是 2。加上唯一约束后，行数是 1，第二笔在数据库失败，而不是在 if 里被挡住。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-19","pointId":"mx-mysql-unique-change-buffer","stem":"选出所有正确的说法。为什么“唯一索引一定比普通索引快”不成立，尤其是在更新路径上？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"查询路径上唯一和普通都可能走索引，快慢要看选择性和回表。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"写入时唯一索引必须做唯一性检查，通常用不上 change buffer；普通二级索引在缓冲池没有那一页时才可能先记下来再合并。"}],"answer":"b","answers":["b","d"],"explain":"查询路径上唯一和普通都可能走索引，快慢要看选择性和回表。写入时唯一索引必须做唯一性检查，通常用不上 change buffer；普通二级索引在缓冲池没有那一页时才可能先记下来再合并。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-20","pointId":"mx-mysql-implicit-convert-breaks-index","stem":"选出所有正确的说法。为什么规范写“禁止使用属性隐式转换”，并用 phone=13800000000 解释全表扫描？","options":[{"id":"a","text":"坏在字符串列对数字字面量，列被转换。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"改为同类型字面量/绑定，或 CAST 常量侧。"}],"answer":"a","answers":["a","d"],"explain":"坏在字符串列对数字字面量，列被转换。改为同类型字面量/绑定，或 CAST 常量侧。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-21","pointId":"mx-mysql-where-func-blocks-index","stem":"选出所有正确的说法。为什么规范禁止在 WHERE 条件的属性上使用函数或表达式，并举 from_unixtime(day) 的例子？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"禁的是包住索引列导致无法范围匹配。"},{"id":"c","text":"把变换挪到常量侧，或用生成列/函数索引显式建模。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"禁的是包住索引列导致无法范围匹配。把变换挪到常量侧，或用生成列/函数索引显式建模。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-22","pointId":"mx-mysql-generated-column-not-where-wrap","stem":"选出所有正确的说法。为什么规范禁止 WHERE 对索引列套函数，有人却说“MySQL 8 有函数索引，所以 DATE(created_at) 随便写”？","options":[{"id":"a","text":"生成列/函数索引是结构上为表达式建好的访问路径。"},{"id":"b","text":"WHERE 临时包列上函数不会自动获得它们。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"生成列/函数索引是结构上为表达式建好的访问路径。WHERE 临时包列上函数不会自动获得它们。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-23","pointId":"mx-mysql-count-star-innodb-not-always-scan","stem":"选出所有正确的说法。为什么资料对比 MyISAM/InnoDB 时写 InnoDB 的 count(*) 要扫全表，MyISAM 直接读计数器？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"无 WHERE 的精确总数昂贵可用汇总；有 WHERE 看索引。"},{"id":"d","text":"别用旧 MyISAM 对比代替计划。"}],"answer":"c","answers":["c","d"],"explain":"无 WHERE 的精确总数昂贵可用汇总；有 WHERE 看索引。别用旧 MyISAM 对比代替计划。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-24","pointId":"mx-mysql-and-order-optimizer-reorders","stem":"选出所有正确的说法。为什么索引原则写 and 之间可以乱序，优化器会调成索引能识别的形式？","options":[{"id":"a","text":"等值 AND 常可重排匹配索引。"},{"id":"b","text":"索引物理序、范围与 OR 仍关键。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"等值 AND 常可重排匹配索引。索引物理序、范围与 OR 仍关键。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-25","pointId":"mx-mysql-descending-index-not-sort-law","stem":"选出所有正确的说法。为什么资料写 MySQL 8 支持降序索引后，有人就认为所有 ORDER BY col DESC 都不再 filesort？","options":[{"id":"a","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"降序索引让索引顺序与某些 ORDER BY 对齐。"},{"id":"d","text":"是否免排序仍看计划与前缀匹配，要用 EXPLAIN 核对。"}],"answer":"c","answers":["c","d"],"explain":"降序索引让索引顺序与某些 ORDER BY 对齐。是否免排序仍看计划与前缀匹配，要用 EXPLAIN 核对。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-26","pointId":"mx-mysql-slow-sql-locate","stem":"选出所有正确的说法。日志里抄到一条花了 3 秒的 SQL，为什么它不一定是最该先改的？","options":[{"id":"a","text":"按总耗时排序时，高频的 50 毫秒应排在偶发的 3 秒前面。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"记录里应能看到次数、累计时间、检查行数和返回行数。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"按总耗时排序时，高频的 50 毫秒应排在偶发的 3 秒前面。记录里应能看到次数、累计时间、检查行数和返回行数。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-27","pointId":"mx-mysql-resource-group-not-os-cgroup","stem":"选出所有正确的说法。为什么建了 MySQL Resource Group 并把慢查询塞进去，有人就以为“已经做完容器 CPU 隔离，吵闹邻居解决了”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Resource Group 管的是服务器内线程与 CPU 亲和/优先级。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"不是 OS cgroup 配额。"}],"answer":"b","answers":["b","d"],"explain":"Resource Group 管的是服务器内线程与 CPU 亲和/优先级。不是 OS cgroup 配额。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-28","pointId":"mx-mysql-mvcc-not-two-version-columns","stem":"选出所有正确的说法。为什么资料把 MVCC 说成每行后面加创建版本号、删除版本号两列，更新就删旧插新？","options":[{"id":"a","text":"旧版本主要在 undo；一致性读用 Read View 判断可见性。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"FOR UPDATE 是锁定读，不是同一套快照故事。"}],"answer":"a","answers":["a","d"],"explain":"旧版本主要在 undo；一致性读用 Read View 判断可见性。FOR UPDATE 是锁定读，不是同一套快照故事。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-29","pointId":"mx-mysql-isolation-levels","stem":"选出所有正确的说法。为什么“InnoDB 用 MVCC 加间隙锁解决幻读”不能整句套在所有 SELECT 上？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"默认隔离级别是 REPEATABLE READ。"},{"id":"c","text":"RR 下普通 SELECT 是快照读，别的会话插入的行不会出现在这次读视图里，也没有锁住间隙。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"默认隔离级别是 REPEATABLE READ。RR 下普通 SELECT 是快照读，别的会话插入的行不会出现在这次读视图里，也没有锁住间隙。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-30","pointId":"mx-postgresql-read-committed-vacuum","stem":"选出所有正确的说法。同一事务里查了两次余额，为什么第二次看见了别人刚提交的数？","options":[{"id":"a","text":"〔读已提交｜一条语句只看见它开始之前已经提交的数据〕是 PostgreSQL 的默认隔离级别。"},{"id":"b","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"c","text":"后一条 SELECT 用新的快照。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","c"],"explain":"〔读已提交｜一条语句只看见它开始之前已经提交的数据〕是 PostgreSQL 的默认隔离级别。后一条 SELECT 用新的快照。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-31","pointId":"mx-mysql-skip-locked-not-queue","stem":"选出所有正确的说法。用 SELECT … FOR UPDATE SKIP LOCKED 抢任务行之后，为什么还不能说“我们已经有 MQ 了”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"SKIP LOCKED 只是锁定读跳过已锁行。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"状态机、超时与幂等要自建，不是开箱 MQ。"}],"answer":"b","answers":["b","d"],"explain":"SKIP LOCKED 只是锁定读跳过已锁行。状态机、超时与幂等要自建，不是开箱 MQ。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-32","pointId":"mx-mysql-upsert","stem":"选出所有正确的说法。为什么“不存在就插入、存在就更新”不能只背语句，不提唯一索引？","options":[{"id":"a","text":"冲突时更新还是忽略，要写清语义。"},{"id":"b","text":"唯一键冲突不等于业务幂等自动完成。"},{"id":"c","text":"按钮能不能点、库存够不够、失败文案用哪个 type，都要能指出归属其中一件。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"冲突时更新还是忽略，要写清语义。唯一键冲突不等于业务幂等自动完成。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-33","pointId":"mx-mysql-myisam-innodb","stem":"选出所有正确的说法。对比 MyISAM 和 InnoDB 时，哪些句子还能用，哪些已经过时？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"SHOW ENGINES 和建表默认值应看到 InnoDB。"},{"id":"d","text":"对比五项：InnoDB 有事务、外键、行锁、MVCC，无主键时生成 6 字节行 ID 做聚簇；MyISAM 这几项都没有。"}],"answer":"c","answers":["c","d"],"explain":"SHOW ENGINES 和建表默认值应看到 InnoDB。对比五项：InnoDB 有事务、外键、行锁、MVCC，无主键时生成 6 字节行 ID 做聚簇；MyISAM 这几项都没有。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-34","pointId":"mx-mysql-binlog-format","stem":"选出所有正确的说法。面试题说 MySQL 默认按 SQL 语句复制，为什么新环境中看到的却是 ROW？","options":[{"id":"a","text":"binlog 格式影响复制与回放。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"ROW/STATEMENT/MIXED 不是随便换一句就完事。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"binlog 格式影响复制与回放。ROW/STATEMENT/MIXED 不是随便换一句就完事。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-35","pointId":"mx-mysql-replica-parallel-applier","stem":"选出所有正确的说法。为什么把复制延迟只归因于“主从复制是单线程”，在 8.4 上会过时？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"从库可以用多个 worker 按逻辑时钟并行应用。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"并行仍然追不上的两类负载是单条大事务，以及回放时的行锁冲突。"}],"answer":"b","answers":["b","d"],"explain":"从库可以用多个 worker 按逻辑时钟并行应用。并行仍然追不上的两类负载是单条大事务，以及回放时的行锁冲突。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-36","pointId":"mx-mysql-redo-undo-binlog","stem":"选出所有正确的说法。为什么把 binlog 只说成“主从同步”，或把慢日志说成“只记录执行成功”会漏场景？","options":[{"id":"a","text":"redo 用于崩溃后重做已提交变更，不可换成复制日志。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"undo 用于回滚和 MVCC，不可换成 redo。"}],"answer":"a","answers":["a","d"],"explain":"redo 用于崩溃后重做已提交变更，不可换成复制日志。undo 用于回滚和 MVCC，不可换成 redo。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsq1-37","pointId":"mx-mysql-autoinc-persists-8","stem":"选出所有正确的说法。为什么还把“删掉 15–17 行再重启，InnoDB 下一条一定是 15”当成现行默认？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"8.0 起最大计数值写入 redo，并在检查点进入数据字典。"},{"id":"c","text":"正常重启从这份计数继续，默认不再按现存行的 MAX+1 捡回被删掉的末尾。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"b","answers":["b","c"],"explain":"8.0 起最大计数值写入 redo，并在检查点进入数据字典。正常重启从这份计数继续，默认不再按现存行的 MAX+1 捡回被删掉的末尾。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-1","pointId":"mx-redis-geo-on-zset-not-gis","stem":"选出所有正确的说法。为什么用 GEOADD 存了门店，还做不了复杂多边形围栏和投影换算？","options":[{"id":"a","text":"GEO 擅长点与半径/盒的近似附近查。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"复杂多边形与精确空间关系用空间库。"}],"answer":"a","answers":["a","d"],"explain":"GEO 擅长点与半径/盒的近似附近查。复杂多边形与精确空间关系用空间库。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-2","pointId":"mx-redis-hyperloglog-approx","stem":"选出所有正确的说法。为什么用 HyperLogLog 统计 UV 之后，却列不出“都有谁访问过”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"近似 UV 用 HyperLogLog。"},{"id":"c","text":"要成员或精确集合用 Set（或数据库）。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"b","answers":["b","c"],"explain":"近似 UV 用 HyperLogLog。要成员或精确集合用 Set（或数据库）。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-3","pointId":"mx-cache-aside-steps","stem":"选出所有正确的说法。更新了数据库，为什么页面有时还是旧价格？","options":[{"id":"a","text":"旁路缓存（Cache Aside）常见用 Redis（或 Memcached）作缓存服务，应用用客户端管 GET/SET/DEL。"},{"id":"b","text":"读先查缓存，未命中再读库并回填；写成功后删键。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"任一项须查实现才能回答，则该项尚未掌握。"}],"answer":"a","answers":["a","b"],"explain":"旁路缓存（Cache Aside）常见用 Redis（或 Memcached）作缓存服务，应用用客户端管 GET/SET/DEL。读先查缓存，未命中再读库并回填；写成功后删键。键还在时，页面会继续读到旧价格。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-4","pointId":"mx-cache-db-double-write-race","stem":"选出所有正确的说法。为什么资料把 Cache Aside 写成“更新数据库后删除缓存”就结束，线上仍偶发读到旧数据？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"先改库还是先改缓存，并发下都会有窗口。"},{"id":"d","text":"要定失效顺序与对账，不能只喊双写。"}],"answer":"c","answers":["c","d"],"explain":"先改库还是先改缓存，并发下都会有窗口。要定失效顺序与对账，不能只喊双写。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-5","pointId":"mx-redis-hello-resp3-not-just-version","stem":"选出所有正确的说法。为什么资料写 Redis 6 支持 RESP3，团队却只把客户端库升了大版本，客户端缓存失效仍不稳定？","options":[{"id":"a","text":"RESP3 需 HELLO 等协商，且链路组件都要支持。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"客户端缓存还依赖 tracking/失效路径，不是版本号自动附赠。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"RESP3 需 HELLO 等协商，且链路组件都要支持。客户端缓存还依赖 tracking/失效路径，不是版本号自动附赠。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-6","pointId":"mx-redis-client-no-touch-not-expire-off","stem":"选出所有正确的说法。开了 CLIENT NO-TOUCH 做只读扫描。为什么有人以为键就再也不会过期了？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"NO-TOUCH 避免访问刷新热度/空闲。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"过期仍由 TTL 与淘汰策略决定。"}],"answer":"b","answers":["b","d"],"explain":"NO-TOUCH 避免访问刷新热度/空闲。过期仍由 TTL 与淘汰策略决定。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-7","pointId":"mx-redis-eviction-policy-menu","stem":"选出所有正确的说法。为什么把 Redis 淘汰背成“就是 LRU”或只背 volatile-lru 那六项不够？","options":[{"id":"a","text":"对照现行淘汰文档列出政策名，不要停在旧的六项。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"LRU 只是其中一种近似，不是唯一行为。"}],"answer":"a","answers":["a","d"],"explain":"对照现行淘汰文档列出政策名，不要停在旧的六项。LRU 只是其中一种近似，不是唯一行为。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-8","pointId":"mx-cache-local-vs-distributed","stem":"选出所有正确的说法。为什么把 Redis 单机和 MyBatis 一级缓存都列进“本地缓存”，选择时会混？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"进程内举例是 Caffeine，独立缓存服务举例是 Redis。"},{"id":"c","text":"多实例只用本地缓存时，预测各 JVM 一份，一台更新后其它台在 TTL 内仍是旧值。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"b","answers":["b","c"],"explain":"进程内举例是 Caffeine，独立缓存服务举例是 Redis。多实例只用本地缓存时，预测各 JVM 一份，一台更新后其它台在 TTL 内仍是旧值。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-9","pointId":"mx-redis-list-quicklist-listpack","stem":"选出所有正确的说法。为什么还按 Redis 3.0 把 List 背成 ziplist 或 linkedlist？","options":[{"id":"a","text":"3.2 起 List 用 quicklist。"},{"id":"b","text":"7.0 起小结构用 listpack。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"3.2 起 List 用 quicklist。7.0 起小结构用 listpack。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-10","pointId":"mx-redis-sentinel-cluster","stem":"选出所有正确的说法。已经上了哨兵，为什么一个热 key 还是把一台机器打满？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"先写下当前是单机、哨兵还是集群。"},{"id":"d","text":"哨兵只做主从切换，写流量仍在一台主库，热键不会被拆开。"}],"answer":"c","answers":["c","d"],"explain":"先写下当前是单机、哨兵还是集群。哨兵只做主从切换，写流量仍在一台主库，热键不会被拆开。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-11","pointId":"mx-redis-repl-psync-not-sql","stem":"选出所有正确的说法。为什么把 Redis 复制背成“先发内存快照，再把语句当二进制日志发给从库重放”会对不上现行复制？","options":[{"id":"a","text":"全量传的是 RDB 快照，增量传的是快照之后的 Redis 写命令。"},{"id":"b","text":"PSYNC 解决断线后要不要重做全量：复制 ID 一致，且副本报上的偏移还在积压里，就只补命令；否则重新传 RDB。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"全量传的是 RDB 快照，增量传的是快照之后的 Redis 写命令。PSYNC 解决断线后要不要重做全量：复制 ID 一致，且副本报上的偏移还在积压里，就只补命令；否则重新传 RDB。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-12","pointId":"mx-redis-repl-link-down-not-fatal","stem":"选出所有正确的说法。监控里 master_link_status:down，为什么不能当 Redis FATAL、整机挂了？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"master_link_status:down 是复制连接断开，进程常仍在。"},{"id":"d","text":"先查同步与网络，不是先当整机 FATAL。"}],"answer":"c","answers":["c","d"],"explain":"master_link_status:down 是复制连接断开，进程常仍在。先查同步与网络，不是先当整机 FATAL。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-13","pointId":"mx-redis-aof-keeps-rdb","stem":"选出所有正确的说法。为什么思维导图写“AOF 默认关闭；一旦开启，RDB 就不作宕机恢复”？","options":[{"id":"a","text":"重启时若 AOF 开着就优先 AOF。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"复制全量和 AOF 重写仍会用到 RDB。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"重启时若 AOF 开着就优先 AOF。复制全量和 AOF 重写仍会用到 RDB。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-14","pointId":"mx-redis-proxy-hash-not-cluster","stem":"选出所有正确的说法。为什么导图把 Twitter 的代理、Hash 取模和「Redis 集群」画在同一枝上？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"代理取模分的是独立实例，客户端常只看见代理。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"Cluster 分的是 16384 槽，节点互知，客户端要跟 MOVED/ASK。"}],"answer":"b","answers":["b","d"],"explain":"代理取模分的是独立实例，客户端常只看见代理。Cluster 分的是 16384 槽，节点互知，客户端要跟 MOVED/ASK。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-15","pointId":"mx-redis-cluster-incr-not-five-steps","stem":"选出所有正确的说法。为什么资料说开一个五节点集群，把初值设成 1 到 5、步长设成 5，就能并行发号并顺便去掉单点？","options":[{"id":"a","text":"同一个键只落在一台主上，故障转移继续这份计数。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"五段步长是五份独立计数器，客户端要钉死用哪一份，并持久化当前值。"}],"answer":"a","answers":["a","d"],"explain":"同一个键只落在一台主上，故障转移继续这份计数。五段步长是五份独立计数器，客户端要钉死用哪一份，并持久化当前值。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-16","pointId":"mx-redis-functions-not-just-eval","stem":"选出所有正确的说法。为什么资料说 Redis 7 有 Functions，团队却仍把整段 Lua 每次 EVAL 送上服务器？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Functions 先注册进服务端库再 FCALL，可随持久化带走。"},{"id":"c","text":"EVAL 每次带脚本或靠脚本缓存 SHA。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"b","answers":["b","c"],"explain":"Functions 先注册进服务端库再 FCALL，可随持久化带走。EVAL 每次带脚本或靠脚本缓存 SHA。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-17","pointId":"mx-redis-acl-not-just-requirepass","stem":"选出所有正确的说法。为什么只配了 requirepass，应用账号仍能 FLUSHALL、也能读到别的业务前缀？","options":[{"id":"a","text":"ACL 可按用户限制命令集与键/频道模式。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"单 requirepass 通常进门后权限过大。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"ACL 可按用户限制命令集与键/频道模式。单 requirepass 通常进门后权限过大。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-18","pointId":"mx-redis-acl-dryrun-not-enforce","stem":"选出所有正确的说法。为什么安全同学跑了 ACL DRYRUN 显示允许，就以为生产连接已经按该规则收紧？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"DRYRUN 模拟某用户是否被允许某命令。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"落地要让应用真用该用户连接，并实测危险命令被拒。"}],"answer":"b","answers":["b","d"],"explain":"DRYRUN 模拟某用户是否被允许某命令。落地要让应用真用该用户连接，并实测危险命令被拒。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-19","pointId":"mx-redis-command-getkeys-not-acl","stem":"选出所有正确的说法。为什么有人用 COMMAND GETKEYS 看出键名，就以为“已经按键做了权限控制”？","options":[{"id":"a","text":"GETKEYS 解析命令涉及的键。"},{"id":"b","text":"权限由 ACL 与连接用户决定。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"GETKEYS 解析命令涉及的键。权限由 ACL 与连接用户决定。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-20","pointId":"mx-redis-keyspace-notify-not-queue","stem":"选出所有正确的说法。为什么用过期键通知做“订单超时关单”，消费者一重启就漏关？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"键空间通知走 Pub/Sub，无历史无确认。"},{"id":"d","text":"要可靠处理用 Stream 或可扫描的到期结构。"}],"answer":"c","answers":["c","d"],"explain":"键空间通知走 Pub/Sub，无历史无确认。要可靠处理用 Stream 或可扫描的到期结构。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xca1-21","pointId":"mx-redis-sharded-pubsub-not-cluster-queue","stem":"选出所有正确的说法。为什么 Redis Cluster 上开了 Sharded Pub/Sub，有人就说“终于有可靠的集群消息队列了”？","options":[{"id":"a","text":"它优化 Cluster 上的发布扇出。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"仍无队列语义：不持久、无消费组位点、无订阅即丢。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"它优化 Cluster 上的发布扇出。仍无队列语义：不持久、无消费组位点、无订阅即丢。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-1","pointId":"mx-spring-ioc-wiring","stem":"选出所有正确的说法。写了 @Autowired，为什么启动时报找不到 Bean？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"这些失败在启动期，不是第一次请求。"}],"answer":"b","answers":["b","d"],"explain":"找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。这些失败在启动期，不是第一次请求。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-2","pointId":"mx-spring-scope-catalog","stem":"选出所有正确的说法。旧资料常写：Spring 支持五种作用域，其中包括 global-session，且框架里的 bean 都是单件。为什么这不能当现行答案？","options":[{"id":"a","text":"现行内建作用域是 singleton、prototype，Web 还有 request、session、application、websocket。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"global-session 不是通用答案；也不是所有 bean 都是单件。"}],"answer":"a","answers":["a","d"],"explain":"现行内建作用域是 singleton、prototype，Web 还有 request、session、application、websocket。global-session 不是通用答案；也不是所有 bean 都是单件。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-3","pointId":"mx-spring-boot-war-still-ok","stem":"选出所有正确的说法。为什么把“不需要独立容器、完全不需要 XML”理解成不能打 WAR、不能写任何配置文件？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"默认可执行 jar，需要外置容器时仍可打 WAR。"},{"id":"c","text":"自动配置也可用 exclude 关掉；不是“完全不能 XML/配置文件”。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"默认可执行 jar，需要外置容器时仍可打 WAR。自动配置也可用 exclude 关掉；不是“完全不能 XML/配置文件”。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-4","pointId":"mx-spring-boot3-autoconfig-imports","stem":"选出所有正确的说法。有人把 Starter 原理背成：启动时去 Maven 里读每个 starter 的 spring.factories，把里面的 bean 全塞进容器。为什么在 Boot 3 会说错？","options":[{"id":"a","text":"Boot 3 的清单在 AutoConfiguration.imports。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"不是启动时去 Maven 读 spring.factories 把 bean 全塞进容器。"}],"answer":"a","answers":["a","d"],"explain":"Boot 3 的清单在 AutoConfiguration.imports。不是启动时去 Maven 读 spring.factories 把 bean 全塞进容器。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-5","pointId":"mx-tomcat-nio-not-bio-default","stem":"选出所有正确的说法。为什么还把 Connector 默认背成 HTTP/1.1 等于 BIO，并把 maxSpareThreads 当成必须项？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"HTTP/1.1 默认是 NIO，不是 BIO。"},{"id":"c","text":"BIO 已移除；不要再背 maxSpareThreads 当必须项。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"HTTP/1.1 默认是 NIO，不是 BIO。BIO 已移除；不要再背 maxSpareThreads 当必须项。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-6","pointId":"mx-spring-xmlbeanfactory-removed","stem":"选出所有正确的说法。旧资料把 XmlBeanFactory 当最常用 BeanFactory，又说 ApplicationContext 一定会在启动时把所有 Bean 建完。为什么这两句都不成立？","options":[{"id":"a","text":"入口是 ApplicationContext。"},{"id":"b","text":"XmlBeanFactory 已删除；非懒加载单例在刷新时创建，不是“一定会建完所有 Bean”的口诀。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"入口是 ApplicationContext。XmlBeanFactory 已删除；非懒加载单例在刷新时创建，不是“一定会建完所有 Bean”的口诀。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-7","pointId":"mx-spring-mvc-dispatch","stem":"选出所有正确的说法。在 Filter 里抛出的异常，为什么 @ControllerAdvice 接不到？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"Filter 在 DispatcherServlet 之外。"},{"id":"d","text":"Filter 里抛的异常，@ControllerAdvice 接不到；要按 Filter / 拦截器 / 控制器三层各自能看见的范围处理。"}],"answer":"c","answers":["c","d"],"explain":"Filter 在 DispatcherServlet 之外。Filter 里抛的异常，@ControllerAdvice 接不到；要按 Filter / 拦截器 / 控制器三层各自能看见的范围处理。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-8","pointId":"mx-spring-mvc-exception","stem":"选出所有正确的说法。服务方法抛了库存不足，为什么浏览器收到的是一段 Tomcat 的 HTML？","options":[{"id":"a","text":"业务异常若没被收成契约 JSON，容器会吐 HTML 错误页。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"校验、冲突、未知错误要写成同一形状的 JSON 响应。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"业务异常若没被收成契约 JSON，容器会吐 HTML 错误页。校验、冲突、未知错误要写成同一形状的 JSON 响应。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-9","pointId":"mx-spring-validation-binding","stem":"选出所有正确的说法。请求体缺了必填字段，为什么有时进了服务方法，有时直接 400？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"有 @Valid 且不接 BindingResult 时，缺字段直接 400。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"自己接了 BindingResult，就要亲手收成 400，否则可能进了服务方法。"}],"answer":"b","answers":["b","d"],"explain":"有 @Valid 且不接 BindingResult 时，缺字段直接 400。自己接了 BindingResult，就要亲手收成 400，否则可能进了服务方法。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-10","pointId":"mx-spring-mvc-restcontroller","stem":"选出所有正确的说法。为什么说“表现层只能用 @Controller、不能用别的注解代替”不成立？","options":[{"id":"a","text":"@RestController 就是 @Controller 加 @ResponseBody，可以返回 JSON。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"表现层不是只能写 @Controller 这一种。"}],"answer":"a","answers":["a","d"],"explain":"@RestController 就是 @Controller 加 @ResponseBody，可以返回 JSON。表现层不是只能写 @Controller 这一种。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-11","pointId":"mx-spring-mvc-controller-singleton","stem":"选出所有正确的说法。为什么发现并发串数据，就给 Controller 方法加 synchronized，或者改成多例？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Controller 默认单例，请求状态不能放实例字段。"},{"id":"c","text":"加 synchronized 或改成多例都治不好串数据，状态放参数或请求作用域。"},{"id":"d","text":"任一项须查实现才能回答，则该项尚未掌握。"}],"answer":"b","answers":["b","c"],"explain":"Controller 默认单例，请求状态不能放实例字段。加 synchronized 或改成多例都治不好串数据，状态放参数或请求作用域。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-12","pointId":"mx-spring-aop-self-invocation","stem":"选出所有正确的说法。save() 上有事务，内部再调 this.publish()，publish 上的事务为什么可能没有？","options":[{"id":"a","text":"this.方法() 不经过代理，上面的事务/切面可能没有。"},{"id":"b","text":"要独立事务就拆成两个 Bean，或显式走代理。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"this.方法() 不经过代理，上面的事务/切面可能没有。要独立事务就拆成两个 Bean，或显式走代理。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-13","pointId":"mx-spring-boot-aop-cglib-default","stem":"选出所有正确的说法。为什么还背“有接口就一定 JDK 动态代理”会在 Boot 项目里说错？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"Boot 默认常走 CGLIB，不是“有接口就一定 JDK”。"},{"id":"d","text":"final 方法切不中，因为子类覆盖不了。"}],"answer":"c","answers":["c","d"],"explain":"Boot 默认常走 CGLIB，不是“有接口就一定 JDK”。final 方法切不中，因为子类覆盖不了。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg1-14","pointId":"mx-spring-transaction","stem":"选出所有正确的说法。同一个类里 this 调用另一个标了 @Transactional 的方法，事务为什么没包住它？","options":[{"id":"a","text":"同类 this 调用另一个 @Transactional 方法时不经过代理，事务包不住。"},{"id":"b","text":"异常被吃掉不再抛出时，外层也会按成功提交。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"同类 this 调用另一个 @Transactional 方法时不经过代理，事务包不住。异常被吃掉不再抛出时，外层也会按成功提交。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-1","pointId":"mx-mybatis-enter-mapper","stem":"选出所有正确的说法。只写了一个 Java 接口，没有写实现类，谁在运行时执行 SQL？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"MyBatis 给这个接口做绑定。"},{"id":"d","text":"方法对应一条语句，调用时才执行。"}],"answer":"c","answers":["c","d"],"explain":"MyBatis 给这个接口做绑定。方法对应一条语句，调用时才执行。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-2","pointId":"mx-mybatis-dynamic-sql","stem":"选出所有正确的说法。可选条件很多时，为什么不能把整段 WHERE 用字符串拼出来？","options":[{"id":"a","text":"可选条件用动态标签拼结构，值仍用占位符。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"整段 WHERE 字符串拼接会把用户输入写进语句原文。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"可选条件用动态标签拼结构，值仍用占位符。整段 WHERE 字符串拼接会把用户输入写进语句原文。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-3","pointId":"mx-mybatis-type-handler","stem":"选出所有正确的说法。库里是 JSON 字符串，实体是对象，为什么有时写出的是 toString()？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"库类型和 Java 类型之间要成对的 TypeHandler。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"缺了就会落到 toString 或错类型，不要靠方言函数代替。"}],"answer":"b","answers":["b","d"],"explain":"库类型和 Java 类型之间要成对的 TypeHandler。缺了就会落到 toString 或错类型，不要靠方言函数代替。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-4","pointId":"mx-mybatis-lazy-javassist-not-cglib","stem":"选出所有正确的说法。有人把 MyBatis 延迟加载背成一定用 CGLIB 代理、一 get 就再查。为什么不准确？","options":[{"id":"a","text":"默认代理工厂是 JAVASSIST，不是一定 CGLIB。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"延迟 SQL 出现在访问尚未加载的关联时，不是每个 getter 都再查。"}],"answer":"a","answers":["a","d"],"explain":"默认代理工厂是 JAVASSIST，不是一定 CGLIB。延迟 SQL 出现在访问尚未加载的关联时，不是每个 getter 都再查。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-5","pointId":"mx-mybatis-local-cache","stem":"选出所有正确的说法。同一个 Mapper 方法调两次，为什么有时打两条 SQL，有时只打一条？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"一级缓存跟同一次 SqlSession。"},{"id":"c","text":"同一会话连查可能只打一条；会话结束或未开二级缓存时，新请求会再查库。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"b","answers":["b","c"],"explain":"一级缓存跟同一次 SqlSession。同一会话连查可能只打一条；会话结束或未开二级缓存时，新请求会再查库。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-6","pointId":"mx-mybatis-batch-executor","stem":"选出所有正确的说法。循环 insert 一万行，为什么比一条批量 SQL 还慢很多？","options":[{"id":"a","text":"BATCH 把写语句攒到 flush 再发，减少往返。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"循环里穿插查询会打断批；重复键错误常在 flush 时才暴露。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"BATCH 把写语句攒到 flush 再发，减少往返。循环里穿插查询会打断批；重复键错误常在 flush 时才暴露。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-7","pointId":"mx-mybatis-rowbounds-memory","stem":"选出所有正确的说法。为什么把 MyBatis 分页只背成“用 RowBounds 就分页了”会在大结果集上出错？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"默认 RowBounds 仍可能先把大结果读回再跳过。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"数据库分页要写 LIMIT/keyset，不能只背“用了 RowBounds”。"}],"answer":"b","answers":["b","d"],"explain":"默认 RowBounds 仍可能先把大结果读回再跳过。数据库分页要写 LIMIT/keyset，不能只背“用了 RowBounds”。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-8","pointId":"mx-mybatis-second-cache","stem":"选出所有正确的说法。打开 mapper 的 cache 之后，别的事务改了行，为什么这边还读到旧的？","options":[{"id":"a","text":"二级缓存在 namespace 上跨会话，提交后才对其它会话可见。"},{"id":"b","text":"联表带出别的 mapper 改的数据时，不要开二级缓存。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","b"],"explain":"二级缓存在 namespace 上跨会话，提交后才对其它会话可见。联表带出别的 mapper 改的数据时，不要开二级缓存。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-9","pointId":"mx-mybatis-log-preparing-parameters","stem":"选出所有正确的说法。为什么把 Mapper 日志打开了，复制出来的语句里还是问号，贴到客户端就执行不了？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"DEBUG 下语句带问号，参数在下一行。"},{"id":"d","text":"要可执行语句得自己拼，或看会内联参数的 JDBC/池日志。"}],"answer":"c","answers":["c","d"],"explain":"DEBUG 下语句带问号，参数在下一行。要可执行语句得自己拼，或看会内联参数的 JDBC/池日志。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-10","pointId":"mx-mybatis-debug-boundsql","stem":"选出所有正确的说法。为什么在 Mapper 方法上打断点，调试器进不去，也看不到要执行的 SQL？","options":[{"id":"a","text":"Mapper 接口没有方法体，断点打在接口上进不去。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"看代理后的调用，或从 BoundSql 读改写后的语句。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"Mapper 接口没有方法体，断点打在接口上进不去。看代理后的调用，或从 BoundSql 读改写后的语句。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-11","pointId":"mx-mybatis-pagehelper-next-query","stem":"选出所有正确的说法。为什么 startPage 写在前面，分页却落到了另一条 SQL 上，或者下一个请求突然多了 LIMIT？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"startPage 只影响之后第一条查询。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"查询被跳过又不 clearPage，分页会粘到下一线程请求上。"}],"answer":"b","answers":["b","d"],"explain":"startPage 只影响之后第一条查询。查询被跳过又不 clearPage，分页会粘到下一线程请求上。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-12","pointId":"mx-mybatis-plus-page-argument","stem":"选出所有正确的说法。为什么 Mapper 已经传了 Page，SQL 里却有两段 LIMIT，或者已删除的行还能查出来？","options":[{"id":"a","text":"分页拦截器与手写 LIMIT 叠在一起会双 LIMIT。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"逻辑删除条件不会自动进手写 XML；Boot 3 要配对的 starter。"}],"answer":"a","answers":["a","d"],"explain":"分页拦截器与手写 LIMIT 叠在一起会双 LIMIT。逻辑删除条件不会自动进手写 XML；Boot 3 要配对的 starter。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg2-13","pointId":"mx-mybatis-middleware-layers","stem":"选出所有正确的说法。面试问项目里 MyBatis 用了哪些中间件，报出一串名字。为什么这样仍然说不清 SQL 是谁改的？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"先分清谁改连接、谁改 SQL、谁让你看见最终语句。"},{"id":"c","text":"报一串中间件名字，仍要能指出这一次 LIMIT/库名是哪一层写上的。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"先分清谁改连接、谁改 SQL、谁让你看见最终语句。报一串中间件名字，仍要能指出这一次 LIMIT/库名是哪一层写上的。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg3-1","pointId":"mx-jpa-what-it-is","stem":"选出所有正确的说法。对象上的字段要和表上的列对上，Java 这边用的是哪一份规范？","options":[{"id":"a","text":"用 Jakarta Persistence，也就是 JPA。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"它规定实体、持久化上下文和怎样把对象与表对应起来。"}],"answer":"a","answers":["a","d"],"explain":"用 Jakarta Persistence，也就是 JPA。它规定实体、持久化上下文和怎样把对象与表对应起来。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg3-2","pointId":"mx-jpa-enter-entity","stem":"选出所有正确的说法。new 出来的 Order 什么时候才会被当成这张表上的一行来管？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"persist 或由查询加载之后。"},{"id":"c","text":"它进入持久化上下文，会话结束前的改动会被刷到数据库。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"b","answers":["b","c"],"explain":"persist 或由查询加载之后。它进入持久化上下文，会话结束前的改动会被刷到数据库。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsg3-3","pointId":"mx-jpa-not-mybatis","stem":"选出所有正确的说法。要把一条手写的复杂报表 SQL 原样发出去，该先找 JPA 还是 MyBatis？","options":[{"id":"a","text":"JPA 的主模型是实体和持久化上下文。"},{"id":"b","text":"原样写 SQL 是 MyBatis 的路。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"先找 MyBatis。JPA 的主模型是实体和持久化上下文。原样写 SQL 是 MyBatis 的路。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg3-4","pointId":"mx-jpa-entity-identity","stem":"选出所有正确的说法。两个字段完全一样的实体，为什么 equals 仍可能不相等？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"同一上下文里同号实体是同一个；事务外 new 两个同号仍不相等。"},{"id":"d","text":"主键空时不要用会变的业务字段当 equals。"}],"answer":"c","answers":["c","d"],"explain":"持久化身份按主键。同一上下文里同号实体是同一个；事务外 new 两个同号仍不相等。主键空时不要用会变的业务字段当 equals。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg3-5","pointId":"mx-jpa-page-vs-slice","stem":"选出所有正确的说法。列表只要“还有没有下一页”，为什么每次都 COUNT(*) 一遍？","options":[{"id":"a","text":"Page 会多一次 COUNT。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"只要“还有没有下一页”用 Slice；要总页码才值得付那次计数。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"Page 会多一次 COUNT。只要“还有没有下一页”用 Slice；要总页码才值得付那次计数。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg3-6","pointId":"mx-jpa-modifying-clear","stem":"选出所有正确的说法。用 @Query 更新状态后，为什么同一个持久化上下文里还是旧值？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"批量 @Query 改的是库，内存里的托管实体不会自动变。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"要清上下文或 clearAutomatically 后再加载。"}],"answer":"b","answers":["b","d"],"explain":"批量 @Query 改的是库，内存里的托管实体不会自动变。要清上下文或 clearAutomatically 后再加载。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg4-1","pointId":"mx-es-vs-db-search","stem":"选出所有正确的说法。为什么商品名用 `LIKE '%手机%'` 能出结果，却仍常把搜索放到 Elasticsearch？","options":[{"id":"a","text":"LIKE 能出结果也不等于检索系统。"},{"id":"b","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"ES 提供分词相关性与规模化筛选，是可重建投影。"}],"answer":"a","answers":["a","d"],"explain":"LIKE 能出结果也不等于检索系统。ES 提供分词相关性与规模化筛选，是可重建投影。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg4-2","pointId":"mx-elastic-analysis","stem":"选出所有正确的说法。文本里明明有单词，为什么搜索时匹配不到？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"匹配不到先看 mapping 与分析器。"},{"id":"c","text":"索引时和查询时的 token 要对得上。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"匹配不到先看 mapping 与分析器。索引时和查询时的 token 要对得上。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg4-3","pointId":"mx-es-search-after","stem":"选出所有正确的说法。翻到第 1000 页为什么比第 1 页慢很多，还可能报错？","options":[{"id":"a","text":"深分页用 search_after，不要巨大 from。"},{"id":"b","text":"from 会扫前面命中并可能触窗上限。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"深分页用 search_after，不要巨大 from。from 会扫前面命中并可能触窗上限。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsg4-4","pointId":"mx-es-custom-routing","stem":"选出所有正确的说法。按用户 id 路由写入，按默认路由去搜，为什么有时搜不到刚写的文档？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"写入用的 routing 读取也要用。"},{"id":"d","text":"默认路由去 GET 可能落到别的分片找不到。"}],"answer":"c","answers":["c","d"],"explain":"写入用的 routing 读取也要用。默认路由去 GET 可能落到别的分片找不到。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-1","pointId":"mx-browser-security-what","stem":"选出所有正确的说法。Cookie、XSS 和 CSP 这几课，共同在回答哪一件事？","options":[{"id":"a","text":"谁能读到登录凭证，谁能在页面里跑脚本。"},{"id":"b","text":"同源、Cookie 属性和内容安全策略都围着这两问。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-2","pointId":"mx-csrf-boundary","stem":"选出所有正确的说法。接口已经配置了 CORS，为什么状态变更仍要防跨站请求？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"fetch 对 4xx 不抛错。"},{"id":"c","text":"脚本读跨源响应这条路归 CORS：没有允许的源，脚本拿不到响应体。"},{"id":"d","text":"表单把 Cookie 提交到你的源这条路归 Cookie 的 SameSite 和来源校验，CORS 白名单不会取消自动附带。"}],"answer":"c","answers":["c","d"],"explain":"脚本读跨源响应这条路归 CORS：没有允许的源，脚本拿不到响应体。表单把 Cookie 提交到你的源这条路归 Cookie 的 SameSite 和来源校验，CORS 白名单不会取消自动附带。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-3","pointId":"mx-csp-script-src","stem":"选出所有正确的说法。配了 Content-Security-Policy，为什么还要转义用户评论里的标签？","options":[{"id":"a","text":"只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"评论转义仍然要留着，尖括号应显示成文本而不是节点。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。评论转义仍然要留着，尖括号应显示成文本而不是节点。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-4","pointId":"mx-csp-report-only-not-enforce","stem":"选出所有正确的说法。为什么上了 Content-Security-Policy-Report-Only 之后，外源脚本还能执行？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Report-Only 只报告不拦截。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"强制 CSP 才拒绝未允许的脚本。"}],"answer":"b","answers":["b","d"],"explain":"Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-5","pointId":"mx-trusted-types-sink-guard","stem":"选出所有正确的说法。为什么开了 require-trusted-types-for script 之后，innerHTML 赋普通字符串会抛错，有人却以为评论可以不转义了？","options":[{"id":"a","text":"卡住未经策略包装的危险汇点赋值。"},{"id":"b","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"策略若原样 createHTML，等于没防护。"}],"answer":"a","answers":["a","d"],"explain":"卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-6","pointId":"mx-document-policy-not-permissions-policy","stem":"选出所有正确的说法。为什么已经配了 Permissions-Policy 关掉摄像头，安全评审还要你再谈 Document-Policy？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Permissions-Policy 按来源开关能力。"},{"id":"c","text":"Document-Policy 约束文档级行为/预算。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-7","pointId":"mx-referrer-policy-leak-bound","stem":"选出所有正确的说法。为什么设了 Referrer-Policy: no-referrer 之后，跨站表单带 Cookie 改数据仍然可能成功？","options":[{"id":"a","text":"主要限制 Referer 泄露多少。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"CSRF/会话仍靠 SameSite、令牌与服务端校验。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"主要限制 Referer 泄露多少。CSRF/会话仍靠 SameSite、令牌与服务端校验。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-8","pointId":"mx-clear-site-data-not-full-logout","stem":"选出所有正确的说法。为什么响应头带了 Clear-Site-Data: \"cookies\"，服务端 session 表里的行还在，换设备仍可能登着？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"清的是浏览器侧该源的 Cookie/存储/缓存等。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"完整注销还要服务端作废会话与令牌。"}],"answer":"b","answers":["b","d"],"explain":"清的是浏览器侧该源的 Cookie/存储/缓存等。完整注销还要服务端作废会话与令牌。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-9","pointId":"mx-pna-private-network-access","stem":"选出所有正确的说法。为什么公网前端 fetch 到 192.168.x / localhost 时，浏览器报 Private Network Access，而你已经配了 Access-Control-Allow-Origin？","options":[{"id":"a","text":"PNA 拦的是更公开上下文访问更私有网络。"},{"id":"b","text":"普通 CORS 只管跨源读响应。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"PNA 拦的是更公开上下文访问更私有网络。普通 CORS 只管跨源读响应。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-10","pointId":"mx-fenced-frame-embed-boundary","stem":"选出所有正确的说法。为什么广告文档说要用 fencedframe，你却以为改个标签名、照旧同 document 通信就行？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"Fenced Frame 强调与嵌入方的信息隔离，服务隐私广告等场景。"},{"id":"d","text":"普通 iframe 仍适合可控的同产品嵌入与约定通信。"}],"answer":"c","answers":["c","d"],"explain":"Fenced Frame 强调与嵌入方的信息隔离，服务隐私广告等场景。普通 iframe 仍适合可控的同产品嵌入与约定通信。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-11","pointId":"mx-attribution-reporting-not-cookie","stem":"选出所有正确的说法。为什么隐私沙盒说用 Attribution Reporting 做转化归因，运营却还在问“Cookie 没了怎么打通用户”？","options":[{"id":"a","text":"ARA 交付受约束的归因报告（常含延迟与噪声）。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"它不复刻跨站稳定用户标识与完整行为明细。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"ARA 交付受约束的归因报告（常含延迟与噪声）。它不复刻跨站稳定用户标识与完整行为明细。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-12","pointId":"mx-storage-access-api-not-cookie-restore","stem":"选出所有正确的说法。为什么隐私模式拦了第三方 Cookie 之后，有人说“调一下 Storage Access API 就能和以前一样通登”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"嵌入第三方在用户手势等条件下申请自己的存储访问。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"不是宿主代读，也不是无约束的跨站追踪复辟。"}],"answer":"b","answers":["b","d"],"explain":"嵌入第三方在用户手势等条件下申请自己的存储访问。不是宿主代读，也不是无约束的跨站追踪复辟。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-13","pointId":"mx-fedcm-not-oauth-popup","stem":"选出所有正确的说法。为什么隐私沙盒推 FedCM，前端却还在用 window.open 弹 OAuth 回调页并以为等价？","options":[{"id":"a","text":"FedCM 由浏览器中介联合登录流程。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"它不是应用自管 OAuth 弹窗的别名，对第三方 Cookie 的依赖模型也不同。"}],"answer":"a","answers":["a","d"],"explain":"FedCM 由浏览器中介联合登录流程。它不是应用自管 OAuth 弹窗的别名，对第三方 Cookie 的依赖模型也不同。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-14","pointId":"mx-topics-api-not-cookie-segments","stem":"选出所有正确的说法。为什么隐私沙盒说用 Topics 做兴趣广告，运营还按「和第三方 Cookie 细分人群一样准」验收？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Topics 交付粗粒度、受约束的兴趣主题。"},{"id":"c","text":"它不复刻跨站稳定用户标识与精细行为明细。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"Topics 交付粗粒度、受约束的兴趣主题。它不复刻跨站稳定用户标识与精细行为明细。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-15","pointId":"mx-shared-storage-not-third-party-cookie","stem":"选出所有正确的说法。为什么有人听到 Shared Storage 能「跨站存一点东西」，就当成 document.cookie 跨站读写回来了？","options":[{"id":"a","text":"Shared Storage 是受限跨站存储与选择/聚合工作台。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"不是第三方 Cookie 或开放 KV。"}],"answer":"a","answers":["a","d"],"explain":"Shared Storage 是受限跨站存储与选择/聚合工作台。不是第三方 Cookie 或开放 KV。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-16","pointId":"mx-private-state-tokens-not-cookie","stem":"选出所有正确的说法。为什么隐私沙盒文档写 Private State Tokens，有人却当成“又能种一个跨站会话 Cookie”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"PST 证明有限的信任/检查结果。"},{"id":"c","text":"它不是通用会话，也不能当稳定跨站用户标识。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"PST 证明有限的信任/检查结果。它不是通用会话，也不能当稳定跨站用户标识。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-17","pointId":"mx-protected-audience-not-cookie-remarketing","stem":"选出所有正确的说法。为什么关掉第三方 Cookie 后，有人说“Protected Audience 就是以前的再营销名单换个名”？","options":[{"id":"a","text":"PA 以设备侧兴趣群组与受限竞价为核心。"},{"id":"b","text":"它不复刻第三方任意读写的跨站再营销 Cookie 模型。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"PA 以设备侧兴趣群组与受限竞价为核心。它不复刻第三方任意读写的跨站再营销 Cookie 模型。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-18","pointId":"mx-related-website-sets-not-cookie-restore","stem":"选出所有正确的说法。为什么登记了 Related Website Sets（曾名 First-Party Sets）之后，有人以为「组内站点又可以随便共享第三方 Cookie 了」？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"RWS 降低同组内 Storage Access 申请的提示摩擦。"},{"id":"d","text":"仍要显式申请；不自动共享或合并 Cookie。"}],"answer":"c","answers":["c","d"],"explain":"RWS 降低同组内 Storage Access 申请的提示摩擦。仍要显式申请；不自动共享或合并 Cookie。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-19","pointId":"mx-bounce-tracking-mitigation-not-session-bug","stem":"选出所有正确的说法。为什么用户只经过一次跳转站，回来后第三方小部件登录态没了，有人就开单「浏览器会话 bug」？","options":[{"id":"a","text":"缓解针对短访跳转追踪链上的状态。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"一等登录应落在用户停留的站点会话，不靠 bounce 域当跨站 id。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","c"],"explain":"缓解针对短访跳转追踪链上的状态。一等登录应落在用户停留的站点会话，不靠 bounce 域当跨站 id。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xnx1-20","pointId":"mx-reduced-ua-not-stable-device-id","stem":"选出所有正确的说法。为什么浏览器做了 UA reduction，日志里还能看到 User-Agent，有人就继续用整串当“设备唯一 id”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"削减后 UA 仍可能存在但更粗、更不适合当设备主键。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"身份与会话靠服务端凭证；细节用可缺的 Client Hints。"}],"answer":"b","answers":["b","d"],"explain":"削减后 UA 仍可能存在但更粗、更不适合当设备主键。身份与会话靠服务端凭证；细节用可缺的 Client Hints。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-1","pointId":"mx-http-request-enters","stem":"选出所有正确的说法。页面脚本要向服务器要一段 JSON，调用的是哪一个平台接口？","options":[{"id":"a","text":"它发出 HTTP 请求，返回响应。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"读正文之前先看 Content-Type。"}],"answer":"a","answers":["a","d"],"explain":"调用 fetch。它发出 HTTP 请求，返回响应。读正文之前先看 Content-Type。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-2","pointId":"mx-http-methods","stem":"选出所有正确的说法。POST 一定不幂等，而 DELETE 一定能无条件重试吗？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"POST 在 RFC 9110 的方法表里不幂等。"},{"id":"c","text":"DELETE 的预期效果可以重复，但第二次的状态码可以不同，而且只有还没读到响应时才适合自动重试。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"b","answers":["b","c"],"explain":"POST 在 RFC 9110 的方法表里不幂等。DELETE 的预期效果可以重复，但第二次的状态码可以不同，而且只有还没读到响应时才适合自动重试。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-3","pointId":"mx-http-create-post-not-put","stem":"选出所有正确的说法。为什么资料把「插入」写成 PUT，又把 REST 收成「只回 JSON」？","options":[{"id":"a","text":"服务分配 id 的创建用 POST 到集合，返回新 URI。"},{"id":"b","text":"客户端已知最终 URI 时，可对该 URI 做 PUT，效果是创建或覆盖且宜幂等。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","b"],"explain":"服务分配 id 的创建用 POST 到集合，返回新 URI。客户端已知最终 URI 时，可对该 URI 做 PUT，效果是创建或覆盖且宜幂等。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-4","pointId":"mx-http-content-type-body","stem":"选出所有正确的说法。为什么 body 是 JSON.stringify 的结果，却仍被服务端当成表单解析失败？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"任一项须查实现才能回答，则该项尚未掌握。"},{"id":"c","text":"JSON：application/json + stringify。"},{"id":"d","text":"表单字段：urlencoded + URLSearchParams。"}],"answer":"c","answers":["c","d"],"explain":"JSON：application/json + stringify。表单字段：urlencoded + URLSearchParams。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-5","pointId":"mx-http-status-auth","stem":"选出所有正确的说法。登录失败和登录后没有权限，为什么不该都返回 403？","options":[{"id":"a","text":"未登录应返回 401，客户端下一步是按认证方式重新证明身份。"},{"id":"b","text":"已登录但缺权限应返回 403，下一步是停止该操作而不是再登录。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"未登录应返回 401，客户端下一步是按认证方式重新证明身份。已登录但缺权限应返回 403，下一步是停止该操作而不是再登录。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-6","pointId":"mx-fetch-credentials","stem":"选出所有正确的说法。fetch 写了 credentials:include，为什么 Cookie 还是没带到另一个源？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"默认凭证只在同源请求带 Cookie，跨源请求头里没有。"},{"id":"d","text":"改成 include 后请求会带上 Cookie，但响应若是星号源，脚本仍然读不到正文。"}],"answer":"c","answers":["c","d"],"explain":"默认凭证只在同源请求带 Cookie，跨源请求头里没有。改成 include 后请求会带上 Cookie，但响应若是星号源，脚本仍然读不到正文。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-7","pointId":"mx-api-error-contract","stem":"选出所有正确的说法。接口返回 400，前端为什么仍可能把失败当成成功，或把校验错误显示成系统崩溃？","options":[{"id":"a","text":"校验字段用 400，正文类型指向字段错误，页面指到该字段。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"库存不足用 409，类型指向库存耗尽，页面显示缺货。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"校验字段用 400，正文类型指向字段错误，页面指到该字段。库存不足用 409，类型指向库存耗尽，页面显示缺货。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-8","pointId":"mx-http-patch-rfc5789","stem":"选出所有正确的说法。为什么把 PATCH 背成“HTTP/1.1 新定义的六种方法之一”不准确？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"PATCH 来自 RFC 5789，不是 HTTP/1.1 核心六方法之一。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"别把方法注册表背成“六种含 PATCH”。"}],"answer":"b","answers":["b","d"],"explain":"PATCH 来自 RFC 5789，不是 HTTP/1.1 核心六方法之一。别把方法注册表背成“六种含 PATCH”。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-9","pointId":"mx-cookie-prefix-partitioned","stem":"选出所有正确的说法。为什么设了 Secure、SameSite=None，第三方 iframe 里种的 Cookie 仍越来越种不上？","options":[{"id":"a","text":"__Host- 还要求无 Domain、Path=/。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"Partitioned 把第三方 Cookie 按顶层站点分开，减轻跨站共享。"}],"answer":"a","answers":["a","d"],"explain":"__Host- 还要求无 Domain、Path=/。Partitioned 把第三方 Cookie 按顶层站点分开，减轻跨站共享。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-10","pointId":"mx-ajax-page-update-not-a-library","stem":"选出所有正确的说法。为什么说“项目里没有装 Ajax，所以不能局部更新页面”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"链接跳转时地址变了，当前文档卸载。"},{"id":"c","text":"按钮里的 XHR 完成后地址不变，只有那个 span 变成新订单号。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"链接跳转时地址变了，当前文档卸载。按钮里的 XHR 完成后地址不变，只有那个 span 变成新订单号。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-11","pointId":"mx-fetch-method-body-timeout","stem":"选出所有正确的说法。为什么 POST 了一段对象，服务器却说正文是空的，而且慢接口一直不返回？","options":[{"id":"a","text":"错误写法的方法是 GET，或正文不是 JSON 字符串，服务器读不到 sku。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"正确的 POST 在面板里方法是 POST，Content-Type 是 application/json，正文是 {\"sku\":\"A1\"}。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","c"],"explain":"错误写法的方法是 GET，或正文不是 JSON 字符串，服务器读不到 sku。正确的 POST 在面板里方法是 POST，Content-Type 是 application/json，正文是 {\"sku\":\"A1\"}。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-12","pointId":"mx-fetch-response-body-once","stem":"选出所有正确的说法。为什么先 response.text() 再 response.json() 会报 body 已使用？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"每种读取方法都会消费掉 body 流。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"要两次就 clone/tee，或只读一次再自己解析。"}],"answer":"b","answers":["b","d"],"explain":"每种读取方法都会消费掉 body 流。要两次就 clone/tee，或只读一次再自己解析。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-13","pointId":"mx-axios-rejects-http-errors","stem":"选出所有正确的说法。为什么换成 Axios 之后，404 进了 catch，成功时拿到的却不是业务对象？","options":[{"id":"a","text":"200 进 then，订单 id 在 data.id，不在返回值顶层。"},{"id":"b","text":"404 进 catch，状态码在 error.response.status，正文在 error.response.data。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"任一项须查实现才能回答，则该项尚未掌握。"}],"answer":"a","answers":["a","b"],"explain":"200 进 then，订单 id 在 data.id，不在返回值顶层。404 进 catch，状态码在 error.response.status，正文在 error.response.data。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-14","pointId":"mx-tcp-is-l4-not-http-handshake","stem":"选出所有正确的说法。为什么把“HTTP 的七层实现（或者叫三次握手）”写在同一道题里会错位？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"五层里 TCP 在传输层，HTTP 在应用层。"},{"id":"d","text":"划掉 HTTP 七层实现叫三次握手：三次握手建立的是 TCP 连接，发生在请求行之前。"}],"answer":"c","answers":["c","d"],"explain":"五层里 TCP 在传输层，HTTP 在应用层。划掉 HTTP 七层实现叫三次握手：三次握手建立的是 TCP 连接，发生在请求行之前。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-15","pointId":"mx-https-port-443-not-80","stem":"选出所有正确的说法。为什么把端口背成“HTTPS 80、HTTP 443”，又把 TCP 三次握手写成 HTTP 三次握手？","options":[{"id":"a","text":"HTTP 默认 TCP 80，HTTPS 默认 TCP 443。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"划掉“HTTP 三次握手”：三次握手是 TCP 建连，发生在请求行之前。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"HTTP 默认 TCP 80，HTTPS 默认 TCP 443。划掉“HTTP 三次握手”：三次握手是 TCP 建连，发生在请求行之前。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx2-16","pointId":"mx-tcp-reliable-not-never-lose","stem":"选出所有正确的说法。为什么把 TCP 背成“数据不会丢失、没有重复、并且一定按序到达”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"连接存活时，TCP 用校验和、序号、确认和重传，把字节流按顺序交给应用。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"连接会复位或超时，应用会看到错误，在途的数据可能到不了业务。"}],"answer":"b","answers":["b","d"],"explain":"连接存活时，TCP 用校验和、序号、确认和重传，把字节流按顺序交给应用。连接会复位或超时，应用会看到错误，在途的数据可能到不了业务。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx3-1","pointId":"mx-spring-security-what","stem":"选出所有正确的说法。HTTP 请求进应用之后，谁先问「你是谁」和「你能不能做这件事」？","options":[{"id":"a","text":"是 Spring Security。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"它用过滤器链做认证和授权，不是只提供一个登录页。"}],"answer":"a","answers":["a","d"],"explain":"是 Spring Security。它用过滤器链做认证和授权，不是只提供一个登录页。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx3-2","pointId":"mx-spring-oauth2-resource","stem":"选出所有正确的说法。API 只收 Bearer Token，为什么还去配用户名密码登录页？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Bearer API 是资源服务器校验令牌。"},{"id":"c","text":"用户名密码登录页属于授权服务器，不要混成一套。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"b","answers":["b","c"],"explain":"Bearer API 是资源服务器校验令牌。用户名密码登录页属于授权服务器，不要混成一套。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xnx3-3","pointId":"mx-oidc-id-token-pkce","stem":"选出所有正确的说法。拿到 Access Token 就算登录完成了吗？","options":[{"id":"a","text":"登录结果在〔ID Token｜发给客户端、声明这次登录的 JWT〕里。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"Access Token 是交给资源服务器的，不是这次登录的声明。"}],"answer":"a","answers":["a","d"],"explain":"登录结果在〔ID Token｜发给客户端、声明这次登录的 JWT〕里。Access Token 是交给资源服务器的，不是这次登录的声明。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx3-4","pointId":"mx-sshd-rate-limit-not-lastb","stem":"选出所有正确的说法。为什么“每分钟 lastb 计数超过 10 就 iptables DROP”看起来能用，其实不可靠？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"靠 lastb 计数再 iptables 不可靠。"},{"id":"c","text":"先关密码登录并限 MaxAuthTries，再用 Fail2ban 一类组件。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"靠 lastb 计数再 iptables 不可靠。先关密码登录并限 MaxAuthTries，再用 Fail2ban 一类组件。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx3-5","pointId":"mx-spring-csrf-spa","stem":"选出所有正确的说法。前后端分离了，是不是可以关掉 CSRF？","options":[{"id":"a","text":"Cookie 会话仍要 CSRF。"},{"id":"b","text":"只有脚本自己加的 Authorization 头才不走同一条 CSRF。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"不是。Cookie 会话仍要 CSRF。只有脚本自己加的 Authorization 头才不走同一条 CSRF。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx3-6","pointId":"mx-spring-session-stateless","stem":"选出所有正确的说法。接口已经用 JWT，为什么日志里还在写 SESSION 并且发 Set-Cookie？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"STATELESS 不再发会话 Cookie。"},{"id":"d","text":"JWT 认证仍在，只是不为这次请求建服务端会话。"}],"answer":"c","answers":["c","d"],"explain":"STATELESS 不再发会话 Cookie。JWT 认证仍在，只是不为这次请求建服务端会话。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx3-7","pointId":"mx-jwt-payload-not-encrypted","stem":"选出所有正确的说法。为什么把 JWT 说成用解密算法逆向解开用户信息？","options":[{"id":"a","text":"未加密 JWT 的 payload 可直接解码阅读，不是密文。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"踢人靠黑名单或会话，不是“解密观感”。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"未加密 JWT 的 payload 可直接解码阅读，不是密文。踢人靠黑名单或会话，不是“解密观感”。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx4-1","pointId":"mx-netty-not-spring-mvc","stem":"选出所有正确的说法。已经有 Spring MVC，是不是就不需要理解 Netty？反过来能不能用 Netty 代替 @GetMapping？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"MVC 处理 HTTP 请求和控制器。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"多数业务先用 MVC；要自己写协议再下到 Netty。"}],"answer":"b","answers":["b","d"],"explain":"不是一回事。MVC 处理 HTTP 请求和控制器。Netty 处理连接和字节。多数业务先用 MVC；要自己写协议再下到 Netty。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx4-2","pointId":"mx-netty-bytebuf-leak","stem":"选出所有正确的说法。堆看起来还很空，为什么进程已经因为 Direct buffer 崩了？","options":[{"id":"a","text":"Direct buffer 在堆外。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"读完与异常路径都要释放，堆空不代表安全。"}],"answer":"a","answers":["a","d"],"explain":"Direct buffer 在堆外。读完与异常路径都要释放，堆空不代表安全。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xnx4-3","pointId":"mx-epoll-et-must-drain","stem":"选出所有正确的说法。为什么在 EPOLLET 下读了 200 字节还有 300 字节，就以为剩下的会再来一次可读事件？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"边缘触发只在状态变化时通知一次。"},{"id":"c","text":"必须非阻塞读到 EAGAIN，剩下的不会再敲门。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"b","answers":["b","c"],"explain":"边缘触发只在状态变化时通知一次。必须非阻塞读到 EAGAIN，剩下的不会再敲门。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xng1-1","pointId":"mx-nginx-vs-gateway","stem":"选出所有正确的说法。已经用 Nginx 把请求转到后面，还要不要 API 网关？","options":[{"id":"a","text":"还要看第三问：这个接口让不让过。"},{"id":"b","text":"只转上游、只选实例，还不是接口级鉴权和限流。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"还要看第三问：这个接口让不让过。只转上游、只选实例，还不是接口级鉴权和限流。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xng1-2","pointId":"mx-nginx-request-phases","stem":"选出所有正确的说法。两段 location 都能匹配，为什么没走进你改的那一段？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"location 有匹配优先级。"},{"id":"d","text":"没被选中的那段上的超时与反代都不会执行。"}],"answer":"c","answers":["c","d"],"explain":"location 有匹配优先级。没被选中的那段上的超时与反代都不会执行。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xng1-3","pointId":"mx-nginx-ip-hash-session","stem":"选出所有正确的说法。为什么把默认轮询说成“可靠性低、只适合静态文件”，或把 ip_hash 当成通用会话方案？","options":[{"id":"a","text":"ip_hash 在 NAT 下会粘偏。"},{"id":"b","text":"会话放共享存储；无状态接口用加权轮询即可。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","b"],"explain":"ip_hash 在 NAT 下会粘偏。会话放共享存储；无状态接口用加权轮询即可。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xgw1-1","pointId":"mx-gateway-one-hop","stem":"选出所有正确的说法。已经有 Spring Cloud Gateway，为什么每个服务里还要再限流和鉴权一遍？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"网关挡入口，对象级授权仍在服务里。"},{"id":"d","text":"发现只提供地址，不产生这几种拒绝。"}],"answer":"c","answers":["c","d"],"explain":"网关挡入口，对象级授权仍在服务里。发现只提供地址，不产生这几种拒绝。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-1","pointId":"mx-mq-pick-workload","stem":"选出所有正确的说法。邮件要失败重试、关单要等 30 分钟。是不是必须再装 RabbitMQ 和 RocketMQ？","options":[{"id":"a","text":"仓库已经在跑 Kafka 时，发信和关单先留在这一套里：发信用业务键幂等，关单用订单表的到期时间。"},{"id":"b","text":"按钮能不能点、库存够不够、失败文案用哪个 type，都要能指出归属其中一件。"},{"id":"c","text":"现有集群和任务表都做不到的那一条，才加第二套。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"不是。仓库已经在跑 Kafka 时，发信和关单先留在这一套里：发信用业务键幂等，关单用订单表的到期时间。现有集群和任务表都做不到的那一条，才加第二套。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-2","pointId":"mx-mq-consume-idempotent-key","stem":"选出所有正确的说法。消费端只用 Redis SETNX 按消息 id 去重，够不够？有人说占位时没法一并设过期，对吗？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"占位成功后、写库前若崩溃：键还在会挡住重投，库里却没流水（丢处理）；键过期了又可能写两次。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"占位与过期应写在同一条命令里，例如 SET key 1 NX EX 60。"}],"answer":"b","answers":["b","d"],"explain":"不够。占位成功后、写库前若崩溃：键还在会挡住重投，库里却没流水（丢处理）；键过期了又可能写两次。占位与过期应写在同一条命令里，例如 SET key 1 NX EX 60。最终仍要靠库表业务键唯一约束。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-3","pointId":"mx-mq-backlog-expand-queues","stem":"选出所有正确的说法。为什么“Consumer 修好了再慢慢消费”和“只加进程不加队列”都消化不了几千万堆积？","options":[{"id":"a","text":"消费者数大于队列数时，多出来的实例预测空转，领不到分区或队列。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"不丢积压的办法是先修好不消费的原因，再把消息转发到队列更多的临时主题，或增加分区，让更多消费者并行追赶，追上后再缩回。"}],"answer":"a","answers":["a","d"],"explain":"消费者数大于队列数时，多出来的实例预测空转，领不到分区或队列。不丢积压的办法是先修好不消费的原因，再把消息转发到队列更多的临时主题，或增加分区，让更多消费者并行追赶，追上后再缩回。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-4","pointId":"mx-kafka-isr-hwm","stem":"选出所有正确的说法。acks=all 已经返回成功，为什么有的追随者节点上还看不到这条消息？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"图上要标出仍在同步集合里的副本，以及被踢出的落后副本。"},{"id":"c","text":"确认级别为全部等的是同步集合，不是机房里每一台。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"图上要标出仍在同步集合里的副本，以及被踢出的落后副本。确认级别为全部等的是同步集合，不是机房里每一台。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-5","pointId":"mx-kafka-rebalance","stem":"选出所有正确的说法。扩容加了一个消费者，为什么正在处理的消息突然停了，还可能重复？","options":[{"id":"a","text":"成员加入、离开和会话超时都会触发再平衡，期间暂停拉取。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"三种情况下都应在撤销分区前提交位点，否则新成员从更早的位点重读。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"成员加入、离开和会话超时都会触发再平衡，期间暂停拉取。三种情况下都应在撤销分区前提交位点，否则新成员从更早的位点重读。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-6","pointId":"mx-kafka-kraft-not-zk","stem":"选出所有正确的说法。为什么“判断 broker 还活着必须维持 ZooKeeper 心跳，follower 还要及时同步 leader”不能当 Kafka 4 的默认答案？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"现行集群用 KRaft 控制器管元数据，副本是否跟上看 ISR。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"acks=all 等的是 ISR 中的副本，不是集群里每一个 follower。"}],"answer":"b","answers":["b","d"],"explain":"现行集群用 KRaft 控制器管元数据，副本是否跟上看 ISR。acks=all 等的是 ISR 中的副本，不是集群里每一个 follower。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-7","pointId":"mx-rabbit-model","stem":"选出所有正确的说法。为什么说 RabbitMQ 的核心不是“队列名”，而是路由？","options":[{"id":"a","text":"路径是生产者到交换器，再按绑定进入两个队列，然后消费者确认。"},{"id":"b","text":"确认之后消息离开队列，可以删除或在拒绝时重投。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"路径是生产者到交换器，再按绑定进入两个队列，然后消费者确认。确认之后消息离开队列，可以删除或在拒绝时重投。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-8","pointId":"mx-rabbit-ha-queue","stem":"选出所有正确的说法。已经组了三节点 RabbitMQ 集群，单节点宕机时为什么有的队列消息没了？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"先查清关键队列的类型和复制成员。"},{"id":"d","text":"杀掉非成员节点时，已复制的队列仍可消费。"}],"answer":"c","answers":["c","d"],"explain":"先查清关键队列的类型和复制成员。杀掉非成员节点时，已复制的队列仍可消费。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-9","pointId":"mx-rocketmq-store-not-ram-buffer","stem":"选出所有正确的说法。为什么说“RocketMQ 没有内存 Buffer、队列无限长，所以既不丢也不重复”不成立？","options":[{"id":"a","text":"对照存储和重试文档，划掉无限内存 Buffer 和恰好一次。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"预测消息落在磁盘上，超过保留时间被删除。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"对照存储和重试文档，划掉无限内存 Buffer 和恰好一次。预测消息落在磁盘上，超过保留时间被删除。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-10","pointId":"mx-rocketmq-send-oneway-may-drop","stem":"选出所有正确的说法。为什么把 SYNC/ASYNC 对比表里的“不丢失”当成队列保证了可靠投递？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"oneway 预测没有应答、没有回调，失败也不会告诉你。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"同步或异步拿到成功之后，Broker 若配置成异步刷盘，预测断电仍可能丢掉尚未落盘的消息。"}],"answer":"b","answers":["b","d"],"explain":"oneway 预测没有应答、没有回调，失败也不会告诉你。同步或异步拿到成功之后，Broker 若配置成异步刷盘，预测断电仍可能丢掉尚未落盘的消息。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-11","pointId":"mx-pulsar-segment-model","stem":"选出所有正确的说法。已经会了 Kafka，为什么还要知道 Pulsar？","options":[{"id":"a","text":"相似的是都可以按位点消费和重放。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"不同的是服务和持久化段分开，并强调租户、命名空间和地理复制。"}],"answer":"a","answers":["a","d"],"explain":"相似的是都可以按位点消费和重放。不同的是服务和持久化段分开，并强调租户、命名空间和地理复制。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xmq1-12","pointId":"mx-activemq-queue-competing-consumers","stem":"选出所有正确的说法。为什么把 ActiveMQ 的 P2P 说成“一个 Queue 只有一个发送者和一个接收者”会错？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"一个队列可以有多个发送者和多个消费者，每条消息只被其中一个消费者取走。"},{"id":"c","text":"Topic 把一条消息交给各个订阅者；非持久订阅不保留离线消息，持久订阅用固定的 clientId 和订阅名补发。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"一个队列可以有多个发送者和多个消费者，每条消息只被其中一个消费者取走。Topic 把一条消息交给各个订阅者；非持久订阅不保留离线消息，持久订阅用固定的 clientId 和订阅名补发。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-1","pointId":"mx-sca-nacos-intro","stem":"选出所有正确的说法。注册和配置都放在 Nacos，改控制台里的一个名字为什么会同时影响发现和配置？","options":[{"id":"a","text":"发现与配置虽都在 Nacos，键与订阅对象不同。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"改一个名字不应同时搅乱另一类数据。"}],"answer":"a","answers":["a","d"],"explain":"发现与配置虽都在 Nacos，键与订阅对象不同。改一个名字不应同时搅乱另一类数据。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-2","pointId":"mx-sca-nacos-register","stem":"选出所有正确的说法。服务已经注册到 Nacos，调用方为什么还会连到已下线的地址？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"注册中心有摘除延迟，客户端还有名单缓存。"},{"id":"c","text":"已下线实例在窗口内仍可能被打到。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"注册中心有摘除延迟，客户端还有名单缓存。已下线实例在窗口内仍可能被打到。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-3","pointId":"mx-sca-nacos-shared-config","stem":"选出所有正确的说法。应用自己的 yaml 里写了超时，为什么运行时用的是另一份数字？","options":[{"id":"a","text":"共享配置后加载会盖住应用自己的同键。"},{"id":"b","text":"只想改一个应用就改它自己的 dataId。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"共享配置后加载会盖住应用自己的同键。只想改一个应用就改它自己的 dataId。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-4","pointId":"mx-sca-deregister-shutdown","stem":"选出所有正确的说法。发布时直接杀旧实例，为什么网关和 Feign 还会打过来？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"发布先注销发现再排空，最后杀进程。"},{"id":"d","text":"直接杀旧实例，网关缓存仍会打过来。"}],"answer":"c","answers":["c","d"],"explain":"发布先注销发现再排空，最后杀进程。直接杀旧实例，网关缓存仍会打过来。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-5","pointId":"mx-eureka-lease-30-90","stem":"选出所有正确的说法。为什么把服务发现只背成 Eureka 心跳 30/90，还把 Zuul、Hystrix、Ribbon 当成永久内核？","options":[{"id":"a","text":"30/90 是可改默认，不是定律。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"Spring Cloud 也不再把 Zuul/Hystrix/Ribbon 当永久内核。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"30/90 是可改默认，不是定律。Spring Cloud 也不再把 Zuul/Hystrix/Ribbon 当永久内核。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-6","pointId":"mx-spring-cloud-feign-not-lb","stem":"选出所有正确的说法。为什么把 Spring Cloud 背成 Feign 解决负载均衡、Zuul 解决跨域？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Feign 编 HTTP；选实例是 LoadBalancer。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"跨域是 CORS，不是 Zuul 专属职责。"}],"answer":"b","answers":["b","d"],"explain":"Feign 编 HTTP；选实例是 LoadBalancer。跨域是 CORS，不是 Zuul 专属职责。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-7","pointId":"mx-dubbo-serialize-allowlist","stem":"选出所有正确的说法。为什么接口参数里新加了一个内部 DTO，提供方已经部署，消费方一调用就在反序列化阶段失败？","options":[{"id":"a","text":"3.3.5 默认序列化检查级别是 STRICT。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"先把该类纳入信任范围，再查协议和字段。"}],"answer":"a","answers":["a","d"],"explain":"3.3.5 默认序列化检查级别是 STRICT。不在允许列表里的类会被拒绝。先把该类纳入信任范围，再查协议和字段。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-8","pointId":"mx-dubbo-spring-expose","stem":"选出所有正确的说法。提供方写了 version = \"1.0.0\"，消费方注解上没写 version，为什么启动或调用时找不到提供者？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"不写 version 时按 0.0.0 匹配。"},{"id":"c","text":"只有一边写成 1.0.0，消费方就找不到这条服务。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"b","answers":["b","c"],"explain":"不写 version 时按 0.0.0 匹配。只有一边写成 1.0.0，消费方就找不到这条服务。group 也要两边相同。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-9","pointId":"mx-dubbo-register-mode","stem":"选出所有正确的说法。为什么把 Dubbo 3 说成“已经不会再按接口往注册中心写地址”？","options":[{"id":"a","text":"3.3.5 里 register-mode 的代码默认是 all。"},{"id":"b","text":"只留应用级要写成 instance。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"3.3.5 里 register-mode 的代码默认是 all。接口级和应用级都会登记。只留应用级要写成 instance。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-10","pointId":"mx-dubbo-zk-ephemeral","stem":"选出所有正确的说法。提供者进程被杀掉之后，消费方为什么不应再选这台已经不在的地址？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"接口级注册在 dynamic 为 true 时写入临时节点。"},{"id":"d","text":"会话没了，ZooKeeper 删掉节点，消费方订阅到的地址列表里就没有它。"}],"answer":"c","answers":["c","d"],"explain":"接口级注册在 dynamic 为 true 时写入临时节点。会话没了，ZooKeeper 删掉节点，消费方订阅到的地址列表里就没有它。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-11","pointId":"mx-dubbo-loadbalance-random-default","stem":"选出所有正确的说法。为什么只背 RoundRobin，或把 LeastActive 说成“响应最短”，会对不上 Dubbo 的负载均衡？","options":[{"id":"a","text":"Dubbo 默认常见是加权随机。"},{"id":"b","text":"LeastActive 看进行中调用数，不是直接比响应时间。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"Dubbo 默认常见是加权随机。LeastActive 看进行中调用数，不是直接比响应时间。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-12","pointId":"mx-dubbo-cluster-failover","stem":"选出所有正确的说法。扣库存这种写入，为什么只改负载均衡，重复扣减还会出现？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"失败后还会不会再叫另一台，由集群容错决定。"},{"id":"d","text":"默认 failover 会按 retries 再试。"}],"answer":"c","answers":["c","d"],"explain":"负载均衡负责选一台。失败后还会不会再叫另一台，由集群容错决定。默认 failover 会按 retries 再试。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-13","pointId":"mx-dubbo-tag-router","stem":"选出所有正确的说法。灰度发布时，为什么只改 version，灰度流量仍会打到未升级的实例？","options":[{"id":"a","text":"version 是服务匹配键，两边不一致就找不到提供者。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"同版本内按机器划分灰度，用标签路由和 dubbo.tag。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"version 是服务匹配键，两边不一致就找不到提供者。同版本内按机器划分灰度，用标签路由和 dubbo.tag。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-14","pointId":"mx-dubbo-thread-pool","stem":"选出所有正确的说法。提供方日志里出现线程池拒绝之后，为什么先把 threads 从 200 改成 2000 仍会拖垮数据库？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"默认是 fixed 线程池，200 条线程，queues 为 0，底层是 SynchronousQueue。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"池满时请求被拒绝并反馈给消费方。"}],"answer":"b","answers":["b","d"],"explain":"默认是 fixed 线程池，200 条线程，queues 为 0，底层是 SynchronousQueue。池满时请求被拒绝并反馈给消费方。线程加多，只是让更多慢调用同时打到数据库。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-15","pointId":"mx-dubbo-qos-offline","stem":"选出所有正确的说法。为什么直接 kill -9 提供者之后，消费方还会把请求打到这台已经不存在的进程？","options":[{"id":"a","text":"进程被立刻杀掉时，注册中心上的地址还要等会话或心跳超时才消失。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"先执行 QOS 的 offline，把地址注销掉，再停进程。"}],"answer":"a","answers":["a","d"],"explain":"进程被立刻杀掉时，注册中心上的地址还要等会话或心跳超时才消失。先执行 QOS 的 offline，把地址注销掉，再停进程。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-16","pointId":"mx-dubbo-no-provider","stem":"选出所有正确的说法。消费方日志是 No provider available，注册中心里却看得到实例。先查什么？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"先核对 version、group 和协议是否与提供方一致。"},{"id":"c","text":"@DubboReference 的 check 默认为 true 时，启动阶段没有匹配提供者就会失败。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"先核对 version、group 和协议是否与提供方一致。@DubboReference 的 check 默认为 true 时，启动阶段没有匹配提供者就会失败。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsc1-17","pointId":"mx-dubbo-beside-stack","stem":"选出所有正确的说法。浏览器下单时，Nginx、Dubbo、MyBatis、Redis、Kafka 和 ZooKeeper 各接哪一段？","options":[{"id":"a","text":"Nginx 接 HTTP 入口。"},{"id":"b","text":"Dubbo 只接两个 Java 进程之间的同步调用。"},{"id":"c","text":"库存的条件更新在提供方用 MyBatis 提交。"},{"id":"d","text":"会写框架不等于这四件事已经对齐。"}],"answer":"a","answers":["a","b","c"],"explain":"Nginx 接 HTTP 入口。Dubbo 只接两个 Java 进程之间的同步调用。库存的条件更新在提供方用 MyBatis 提交。Redis 不存放这份库存。消息在本地提交之后发出。ZooKeeper 或 Nacos 只提供地址。","whyWrong":{"d":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。"}},
  {"id":"xsc2-1","pointId":"mx-sca-sentinel-block-fallback","stem":"选出所有正确的说法。@SentinelResource 上同时写了 blockHandler 和 fallback，超限时会进哪一个？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"超限走 blockHandler。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"业务方法自己抛错才走 fallback。"}],"answer":"b","answers":["b","d"],"explain":"超限走 blockHandler。业务方法自己抛错才走 fallback。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-1","pointId":"mx-arch-evolution-stages","stem":"选出所有正确的说法。为什么不能把“上微服务”当成架构演进的第一句？","options":[{"id":"a","text":"没有发布冲突、库打满或必须独立扩缩的信号，就停在现在这一站。"},{"id":"b","text":"演进要分清容量线与服务化线；停在单体是正常结果。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","b"],"explain":"没有发布冲突、库打满或必须独立扩缩的信号，就停在现在这一站。演进要分清容量线与服务化线；停在单体是正常结果。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-2","pointId":"mx-arch-monolith-when","stem":"选出所有正确的说法。小团队一上线就拆六个服务，会先痛在哪里？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"先痛在分布式调用、排障和跨服务事务，模块之间却还在直接改对方的表。"},{"id":"d","text":"模块化单体（仍是一个进程，但模块与表边界已划清）往往更合适。"}],"answer":"c","answers":["c","d"],"explain":"先痛在分布式调用、排障和跨服务事务，模块之间却还在直接改对方的表。模块化单体（仍是一个进程，但模块与表边界已划清）往往更合适。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-3","pointId":"mx-arch-soa-classic","stem":"选出所有正确的说法。已经把订单和库存拆成两个远程服务，还共用一个库、走企业服务总线，算不算做成微服务了？","options":[{"id":"a","text":"那是经典 SOA（面向服务架构）常见形态。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"微服务还要尽量独立数据、独立发布与去中心治理。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"不算。那是经典 SOA（面向服务架构）常见形态。微服务还要尽量独立数据、独立发布与去中心治理。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-4","pointId":"mx-arch-sync-vs-async","stem":"选出所有正确的说法。全部改成消息驱动，是不是就没有分布式事务问题了？","options":[{"id":"a","text":"fetch 对 4xx 不抛错。"},{"id":"b","text":"全部改成消息驱动只是把事务换成状态机、幂等、补偿和对账，问题还在。"},{"id":"c","text":"任一项须查实现才能回答，则该项尚未掌握。"},{"id":"d","text":"编排与协同都要这些，上了消息不等于协同做完。"}],"answer":"b","answers":["b","d"],"explain":"不是。全部改成消息驱动只是把事务换成状态机、幂等、补偿和对账，问题还在。编排与协同都要这些，上了消息不等于协同做完。","whyWrong":{"a":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。","c":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-5","pointId":"mx-idempotency","stem":"选出所有正确的说法。按钮已经禁用了，为什么超时重试仍会生成两张订单？","options":[{"id":"a","text":"禁用按钮挡不住超时后的第二次 HTTP。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"服务端要用同一幂等键加唯一约束，冲突时返回第一次的结果。"}],"answer":"a","answers":["a","d"],"explain":"禁用按钮挡不住超时后的第二次 HTTP。服务端要用同一幂等键加唯一约束，冲突时返回第一次的结果。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-6","pointId":"mx-cache","stem":"选出所有正确的说法。更新数据库后立即删缓存，就绝对不会读到旧值吗？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"删缓存只缩短窗口；并发回填仍可能把旧值写回。"},{"id":"c","text":"步骤见 `cache-aside-steps`，竞态见 `cache-db-double-write-race`。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"不会绝对。删缓存只缩短窗口；并发回填仍可能把旧值写回。步骤见 `cache-aside-steps`，竞态见 `cache-db-double-write-race`。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-7","pointId":"mx-message-delivery","stem":"选出所有正确的说法。消息系统承诺“至少一次”后，消费者还需要处理重复吗？","options":[{"id":"a","text":"至少一次允许再投；确认前崩溃，或确认没落到服务端，都会再来。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"业务只做一次靠业务键，不靠投递口号。"}],"answer":"a","answers":["a","d"],"explain":"需要。至少一次允许再投；确认前崩溃，或确认没落到服务端，都会再来。业务只做一次靠业务键，不靠投递口号。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-8","pointId":"mx-k6-threshold-not-check","stem":"选出所有正确的说法。检查项都是绿的，为什么这次压测仍算通过？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"〔check｜记下断言是否成立、本身不改变进程退出码的函数〕不决定成败。"},{"id":"c","text":"要挡住合并，把条件写进〔阈值｜结束时决定整次测试是否失败的条件〕。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"〔check｜记下断言是否成立、本身不改变进程退出码的函数〕不决定成败。要挡住合并，把条件写进〔阈值｜结束时决定整次测试是否失败的条件〕。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-9","pointId":"mx-jmeter-cli-continue-on-error","stem":"选出所有正确的说法。结果树里有一条断言失败，为什么整次负载还在往下跑？","options":[{"id":"a","text":"线程组在取样错误或断言失败后可以选择 Continue。"},{"id":"b","text":"〔JMeter｜用线程组对服务器执行测试计划的负载工具〕会忽略这次错误并继续。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","b"],"explain":"线程组在取样错误或断言失败后可以选择 Continue。〔JMeter｜用线程组对服务器执行测试计划的负载工具〕会忽略这次错误并继续。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdg1-10","pointId":"mx-ddd-repository-one-entry","stem":"选出所有正确的说法。为什么库存模块直接 UPDATE 订单明细，订单上的合计规则没有执行？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"别的模块不要直接 UPDATE 订单明细。"},{"id":"d","text":"走订单应用服务，合计规则才能执行。"}],"answer":"c","answers":["c","d"],"explain":"别的模块不要直接 UPDATE 订单明细。走订单应用服务，合计规则才能执行。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-1","pointId":"mx-base-slogan-not-ban-tx","stem":"选出所有正确的说法。资料把 BASE 写成定理，并说大型系统不可能用分布式事务、必须靠 BASE。为什么这两句都不成立？","options":[{"id":"a","text":"BASE 是权衡口号，不是禁止分布式事务的定理。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"大型系统仍可按边界选用本地事务、Outbox 或协调协议。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"BASE 是权衡口号，不是禁止分布式事务的定理。大型系统仍可按边界选用本地事务、Outbox 或协调协议。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-2","pointId":"mx-distributed-consistency-three-words","stem":"选出所有正确的说法。为什么把库的约束、分区后的读写视图、过一会儿对账成功，都叫成 CAP 的 C？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"混称会用错修法：约束失败去改复制策略，分区冲突用「最终会一致」带过。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"三者是不同承诺；CAP 的 C 只谈分区下能否同一份最新视图（常对应〔线性化｜每次读都读到最新一次已完成的写〕）。"}],"answer":"b","answers":["b","d"],"explain":"混称会用错修法：约束失败去改复制策略，分区冲突用「最终会一致」带过。三者是不同承诺；CAP 的 C 只谈分区下能否同一份最新视图（常对应〔线性化｜每次读都读到最新一次已完成的写〕）。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-3","pointId":"mx-distributed-outbox","stem":"选出所有正确的说法。订单已经提交，但发消息时进程崩溃，怎样恢复？","options":[{"id":"a","text":"若业务行与待发事件已同事务写入 Outbox：靠发布器重试投递，消费端按事件键幂等。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"若只写了库、从未写入 Outbox（先库后消息）：这次发送意图已丢，重试补不回来。"}],"answer":"a","answers":["a","d"],"explain":"若业务行与待发事件已同事务写入 Outbox：靠发布器重试投递，消费端按事件键幂等。若只写了库、从未写入 Outbox（先库后消息）：这次发送意图已丢，重试补不回来。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-4","pointId":"mx-binlog-not-change-event-bus","stem":"选出所有正确的说法。为什么资料写“监听 binlog 就能解耦所有下游”，评审却把它当成正式领域事件平台？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"binlog 是存储复制流，不是正式领域事件总线。"},{"id":"c","text":"下游契约、版本与重放要另建事件平台。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"binlog 是存储复制流，不是正式领域事件总线。下游契约、版本与重放要另建事件平台。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-5","pointId":"mx-zk-linearizable-not-realtime","stem":"选出所有正确的说法。有人把 ZooKeeper 保证写成“实时性（最终一致性）”，又把 zkclient 当成自带客户端。为什么会错？","options":[{"id":"a","text":"ZooKeeper 提供的是线性一致读写语义，不是“实时=最终一致”那句混写。"},{"id":"b","text":"客户端库也不是只有 zkclient。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"ZooKeeper 提供的是线性一致读写语义，不是“实时=最终一致”那句混写。客户端库也不是只有 zkclient。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-6","pointId":"mx-zk-odd-count-not-quorum-law","stem":"选出所有正确的说法。资料写半数以上机器存活才可用，并因此得出“适合装在奇数台”。为什么后半句不是定律？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"可用看多数派法定人数，不是“必须奇数台”本身。"},{"id":"d","text":"偶数年也能配出多数，只是故障容忍度不同。"}],"answer":"c","answers":["c","d"],"explain":"可用看多数派法定人数，不是“必须奇数台”本身。偶数年也能配出多数，只是故障容忍度不同。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-7","pointId":"mx-redis-lock-setnx-expire-race","stem":"选出所有正确的说法。为什么“SETNX 加锁再 expire 自动释放”会在进程崩溃时把锁锁死，或让别人抢到未过期的锁？","options":[{"id":"a","text":"SETNX 与 EXPIRE 拆成两步会中途崩溃锁死。"},{"id":"b","text":"要用原子 SET NX PX，释放还要比对令牌。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"SETNX 与 EXPIRE 拆成两步会中途崩溃锁死。要用原子 SET NX PX，释放还要比对令牌。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-8","pointId":"mx-redis-lock-getset-wall-clock","stem":"选出所有正确的说法。为什么资料在 SETNX 之后改用 get/getset，把「当前时间+超时」写进 value，再和本机系统时间比较？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"靠 GETSET 与墙钟比过期不可靠。"},{"id":"d","text":"时钟漂移会误删别人的锁；应用租约与令牌。"}],"answer":"c","answers":["c","d"],"explain":"靠 GETSET 与墙钟比过期不可靠。时钟漂移会误删别人的锁；应用租约与令牌。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-9","pointId":"mx-mysql-for-update-not-dist-lease","stem":"选出所有正确的说法。为什么资料把 SELECT … FOR UPDATE 当成分布式锁，还说宕机后数据库会自己释放？","options":[{"id":"a","text":"FOR UPDATE 握在事务连接上，不是跨机租约。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"长事务会撑连接池，也不能防持锁进程失踪。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"FOR UPDATE 握在事务连接上，不是跨机租约。长事务会撑连接池，也不能防持锁进程失踪。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-10","pointId":"mx-snowflake-clock-rollback","stem":"选出所有正确的说法。为什么资料写雪花算法可按需改位段，运维回拨 NTP 后却出现重复 ID？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"时钟回拨会让时间部分倒退从而撞号。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"要检测回拨并等待/拒发，不能只改位段。"}],"answer":"b","answers":["b","d"],"explain":"时钟回拨会让时间部分倒退从而撞号。要检测回拨并等待/拒发，不能只改位段。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-11","pointId":"mx-distributed-one-db-first","stem":"选出所有正确的说法。订单和库存刚拆到两个服务，第一件事就该上 Seata 吗？","options":[{"id":"a","text":"刚拆开就上 Seata，是在用全局事务缝本可同库的不变量。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"能一次本地提交先守住；全局事务是拆开之后的补洞，不是拆分的默认起点。"}],"answer":"a","answers":["a","d"],"explain":"不该。刚拆开就上 Seata，是在用全局事务缝本可同库的不变量。能一次本地提交先守住；全局事务是拆开之后的补洞，不是拆分的默认起点。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-12","pointId":"mx-distributed-at-sees-before-global","stem":"选出所有正确的说法。为什么全局事务还没结束，另一个查询已经读到扣过的库存？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"AT 模式可能先看到分支本地提交。"},{"id":"c","text":"全局未决时读侧要接受中间态或换隔离策略。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"AT 模式可能先看到分支本地提交。全局未决时读侧要接受中间态或换隔离策略。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-13","pointId":"mx-distributed-idempotent-key","stem":"选出所有正确的说法。为什么补偿和消息都重试了，库存却被扣了两次？","options":[{"id":"a","text":"跨服务投递是〔至少一次｜at-least-once：同一条可能再投，不能假定只到一次〕。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"重试须带同一业务键，并把去重与扣减放进同一次本地提交；换新键或先改库存再记去重，都会再扣。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","c"],"explain":"跨服务投递是〔至少一次｜at-least-once：同一条可能再投，不能假定只到一次〕。重试须带同一业务键，并把去重与扣减放进同一次本地提交；换新键或先改库存再记去重，都会再扣。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-14","pointId":"mx-graceful-shutdown-not-zero-loss","stem":"选出所有正确的说法。资料把优雅停机写成零丢失。为什么仍可能丢在途请求？","options":[{"id":"a","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"b","text":"优雅停机减少在途丢失，不等于零丢失。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"还要排空、拒绝新请求与下游超时。"}],"answer":"b","answers":["b","d"],"explain":"优雅停机减少在途丢失，不等于零丢失。还要排空、拒绝新请求与下游超时。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-15","pointId":"mx-dns-lb-not-just-round-robin","stem":"选出所有正确的说法。为什么资料把 DNS 负载均衡写成简单轮询，并把刷新时间调得很小？","options":[{"id":"a","text":"DNS 负载还有缓存与 TTL。"},{"id":"b","text":"不是简单轮询就均匀，故障摘除也慢。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"DNS 负载还有缓存与 TTL。不是简单轮询就均匀，故障摘除也慢。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xdi1-16","pointId":"mx-threadlocal-not-distributed-context","stem":"选出所有正确的说法。用 ThreadLocal 存用户上下文后，跨服务却丢了。为什么？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"ThreadLocal 只在本线程。"},{"id":"d","text":"跨进程要把上下文显式放进请求头或消息。"}],"answer":"c","answers":["c","d"],"explain":"ThreadLocal 只在本线程。跨进程要把上下文显式放进请求头或消息。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-1","pointId":"mx-docker-not-a-vm","stem":"选出所有正确的说法。一台机器上的 Docker 已经能跑容器，是不是就已经有了 Kubernetes？","options":[{"id":"a","text":"Docker 管这台机器上的镜像和容器。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"多机调度、服务和 Ingress 是 Kubernetes。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"不是。Docker 管这台机器上的镜像和容器。多机调度、服务和 Ingress 是 Kubernetes。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-2","pointId":"mx-k8s-cluster-enter","stem":"选出所有正确的说法。写好一份 Deployment YAML，怎样让集群里真的出现这些 Pod？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"kubectl apply 把它交给 API。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"只写文件、不 apply，集群不会变。"}],"answer":"b","answers":["b","d"],"explain":"kubectl apply 把它交给 API。控制器在节点上创建 Pod。只写文件、不 apply，集群不会变。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-3","pointId":"mx-k8s-not-docker-engine","stem":"选出所有正确的说法。集群已经能跑 Pod，浏览器怎样打到这些副本？是不是 Docker 自己在做调度？","options":[{"id":"a","text":"从外面进来通常要 Ingress 和它的控制器。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"调度的是 Kubernetes，不是本机 Docker 引擎。"}],"answer":"a","answers":["a","d"],"explain":"集群内用 Service。从外面进来通常要 Ingress 和它的控制器。调度的是 Kubernetes，不是本机 Docker 引擎。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-4","pointId":"mx-gha-workflow-in-dot-github","stem":"选出所有正确的说法。为什么仓库根目录放了 build.yml，推代码却看不到这次运行？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"工作流必须在 .github/workflows。"},{"id":"c","text":"根目录的 yml 不会被 GitHub Actions 捡起来跑。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"工作流必须在 .github/workflows。根目录的 yml 不会被 GitHub Actions 捡起来跑。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-5","pointId":"mx-gha-job-needs-success","stem":"选出所有正确的说法。为什么测试失败了，后面的部署 job 还是启动了？","options":[{"id":"a","text":"默认 needs 要求上游成功。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"测试失败时部署应跳过；always() 不能当发布默认条件。"}],"answer":"a","answers":["a","d"],"explain":"默认 needs 要求上游成功。测试失败时部署应跳过；always() 不能当发布默认条件。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-6","pointId":"mx-jenkins-not-only-ci-tool","stem":"选出所有正确的说法。资料把持续集成的好处写成“使用 Jenkins 等工具”就自动了。为什么 Jenkins 不能当 CI 的同义词？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"CI 是实践，Jenkins 只是工具之一。"},{"id":"c","text":"Actions、GitLab CI 也能跑同一条验证链。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"CI 是实践，Jenkins 只是工具之一。Actions、GitLab CI 也能跑同一条验证链。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-7","pointId":"mx-docker-layer-cache-copy","stem":"选出所有正确的说法。为什么只改了一行 Java，连 apt-get 都重新跑了？","options":[{"id":"a","text":"COPY 顺序决定缓存是否失效。"},{"id":"b","text":"源码 COPY 放安装之前，改一行就会重跑 apt。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"COPY 顺序决定缓存是否失效。源码 COPY 放安装之前，改一行就会重跑 apt。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-8","pointId":"mx-compose-service-name-dns","stem":"选出所有正确的说法。为什么 web 容器里把数据库写成 localhost:8001，连不上？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"Compose 里用服务名做 DNS。"},{"id":"d","text":"容器内的 localhost 是自己，不是宿主机或其它服务。"}],"answer":"c","answers":["c","d"],"explain":"Compose 里用服务名做 DNS。容器内的 localhost 是自己，不是宿主机或其它服务。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-9","pointId":"mx-one-container-one-service-heuristic","stem":"选出所有正确的说法。为什么资料写一个容器运行一种服务，需要时再创建实例？","options":[{"id":"a","text":"一服务一主容器是启发式，允许 sidecar。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"禁止把多个主服务塞进一个巨石容器。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"一服务一主容器是启发式，允许 sidecar。禁止把多个主服务塞进一个巨石容器。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-10","pointId":"mx-k8s-pod-share-localhost","stem":"选出所有正确的说法。为什么把 sidecar 和主容器写成两个 Pod，localhost 却连不上？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"同一 Pod 内才共享 localhost。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"拆成两个 Pod 后要用 IP 或 Service 互联。"}],"answer":"b","answers":["b","d"],"explain":"同一 Pod 内才共享 localhost。拆成两个 Pod 后要用 IP 或 Service 互联。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-11","pointId":"mx-k8s-service-clusterip","stem":"选出所有正确的说法。为什么前端把后端 Pod IP 写进配置，滚动更新之后就全 502？","options":[{"id":"a","text":"客户端连 Service，不要写死 Pod IP。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"滚动更新后 Pod IP 会变。"}],"answer":"a","answers":["a","d"],"explain":"客户端连 Service，不要写死 Pod IP。滚动更新后 Pod IP 会变。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsh1-12","pointId":"mx-k8s-ingress-needs-controller","stem":"选出所有正确的说法。为什么 apply 了 Ingress，浏览器还是打不开这个主机名？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"Ingress 对象本身不开通外网。"},{"id":"c","text":"要先装控制器并写对 class 与后端 Service。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"Ingress 对象本身不开通外网。要先装控制器并写对 class 与后端 Service。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xte1-1","pointId":"mx-vue-test-utils-mount","stem":"选出所有正确的说法。装了 Vitest，为什么直接查询组件文件仍然碰不到输入框？","options":[{"id":"a","text":"〔Vitest｜Vue 官方测试指南推荐的测试运行器〕只调用测试函数。"},{"id":"b","text":"输入框要出现，得用 Vue Test Utils 的 mount 把组件渲染出来。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"〔Vitest｜Vue 官方测试指南推荐的测试运行器〕只调用测试函数。输入框要出现，得用 Vue Test Utils 的 mount 把组件渲染出来。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xte1-2","pointId":"mx-test-mock-boundary","stem":"选出所有正确的说法。把被测函数里的每个调用都 mock 掉，测试为什么还是绿的，线上却是错的？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"找出全是替身的测试，改成只替掉网络，让金额计算真的执行。"},{"id":"d","text":"计算是错的时候，测试不应再保持绿色。"}],"answer":"c","answers":["c","d"],"explain":"找出全是替身的测试，改成只替掉网络，让金额计算真的执行。计算是错的时候，测试不应再保持绿色。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xte1-3","pointId":"mx-test-fake-timers","stem":"选出所有正确的说法。防抖输入要等 300ms，为什么测试套件被 sleep 拖得很慢还发脆？","options":[{"id":"a","text":"假时钟下输入后推进 300 毫秒，搜索请求立刻发出，用例几乎不占等待。"},{"id":"b","text":"改成真实等待时，每个用例都要睡满这段延迟，文件明显更慢。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","b"],"explain":"假时钟下输入后推进 300 毫秒，搜索请求立刻发出，用例几乎不占等待。改成真实等待时，每个用例都要睡满这段延迟，文件明显更慢。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xte1-4","pointId":"mx-react-enzyme-not-default","stem":"选出所有正确的说法。为什么 2019 的 React 路线图还把 Enzyme 画成组件测试必选项？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"现行默认是 Testing Library：按用户能看见的角色和名字查。"},{"id":"d","text":"Enzyme 的 shallow/instance 不是 React 19 的默认答案。"}],"answer":"c","answers":["c","d"],"explain":"那是旧图。现行默认是 Testing Library：按用户能看见的角色和名字查。Enzyme 的 shallow/instance 不是 React 19 的默认答案。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xte1-5","pointId":"mx-playwright-user-journey","stem":"选出所有正确的说法。是不是每个函数都该配一条浏览器测试？","options":[{"id":"a","text":"不是每个函数都该配一条浏览器测试。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"浏览器只守一条用户路径，细分支留在单元测试。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"不是。不是每个函数都该配一条浏览器测试。浏览器只守一条用户路径，细分支留在单元测试。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xte1-6","pointId":"mx-contract-test-path","stem":"选出所有正确的说法。前端用 mock 绿了，后端单测也绿了，联调时为什么字段对不上？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"下单成功和库存不足各有一条契约断言，锁住状态码和失败类型。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"把后端的类型改名后，前端契约测试应失败，而不是 mock 仍返回成功。"}],"answer":"b","answers":["b","d"],"explain":"下单成功和库存不足各有一条契约断言，锁住状态码和失败类型。把后端的类型改名后，前端契约测试应失败，而不是 mock 仍返回成功。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xte1-7","pointId":"mx-msw-http-mock","stem":"选出所有正确的说法。vi.spyOn(global, \"fetch\") 之后，为什么换了一次 URL 封装测试全红？","options":[{"id":"a","text":"按路径返回 JSON 之后，页面应显示 paid。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"把客户端函数改名再跑，测试仍然通过，因为断言的是界面和这份响应，不是 fetch 这个名字被调用了几次。"}],"answer":"a","answers":["a","d"],"explain":"按路径返回 JSON 之后，页面应显示 paid。把客户端函数改名再跑，测试仍然通过，因为断言的是界面和这份响应，不是 fetch 这个名字被调用了几次。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xte2-1","pointId":"mx-junit-instance-lifecycle","stem":"选出所有正确的说法。第二个测试方法为什么看得到第一个测试放进 List 的数据？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"默认每方法新实例只隔离实例字段。"},{"id":"c","text":"静态/共享集合会让测试互相看见数据。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"b","answers":["b","c"],"explain":"默认每方法新实例只隔离实例字段。静态/共享集合会让测试互相看见数据。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xte2-2","pointId":"mx-pit-mutation-killed","stem":"选出所有正确的说法。行覆盖率到了 100%，测试就足够了吗？","options":[{"id":"a","text":"〔行覆盖率｜测试执行过的行占源码行的比例〕只说明这些行被跑过。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"〔变异测试｜往代码里植入故障再跑测试〕要看测试会不会失败。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"〔行覆盖率｜测试执行过的行占源码行的比例〕只说明这些行被跑过。〔变异测试｜往代码里植入故障再跑测试〕要看测试会不会失败。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsp1-1","pointId":"mx-fs-four-layers","stem":"选出所有正确的说法。React 和 Spring 都会写了，为什么同一个下单在页面、接口契约、用例和持久化里仍然不一致？","options":[{"id":"a","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"d","text":"按钮能不能点、库存够不够、失败文案用哪个 type，都要能指出归属其中一件。"}],"answer":"b","answers":["b","c","d"],"explain":"会写框架不等于这四件事已经对齐。页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。按钮能不能点、库存够不够、失败文案用哪个 type，都要能指出归属其中一件。用例指应用服务里的一次业务动作，不是需求文档里的用户场景。","whyWrong":{"a":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsp1-2","pointId":"mx-fs-page-feature","stem":"选出所有正确的说法。把接口结果放进 useState，输入时又改同一份状态，刷新后为什么和服务器上的数据不一致？","options":[{"id":"a","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"b","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","b"],"explain":"服务器状态、表单状态、请求状态是三份数据。晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsp1-3","pointId":"mx-fs-write-ui","stem":"选出所有正确的说法。接口已经返回 409，页面为什么还提示保存成功？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"任一项须查实现才能回答，则该项尚未掌握。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"409 要看状态码和契约 type，不能写在 catch 里，也不能当成保存成功。"}],"answer":"c","answers":["c","d"],"explain":"fetch 对 4xx 不抛错。409 要看状态码和契约 type，不能写在 catch 里，也不能当成保存成功。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「前端这一侧做完，要能不看资料回答六件事」的结论，不是这一问要选的说法。"}},
  {"id":"xsp1-4","pointId":"mx-fs-frontend-done","stem":"选出所有正确的说法。功能能点通，怎样判断自己已经掌握，而不是只完成了一次成功请求？","options":[{"id":"a","text":"用六项验收：资源标识、请求形状、成功字段、失败 type 与表单状态、传输失败与幂等重试、登录态存放位置。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"任一项须查实现才能回答，则该项尚未掌握。"},{"id":"d","text":"fetch 对 4xx 不抛错。"}],"answer":"a","answers":["a","c"],"explain":"用六项验收：资源标识、请求形状、成功字段、失败 type 与表单状态、传输失败与幂等重试、登录态存放位置。任一项须查实现才能回答，则该项尚未掌握。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsp2-1","pointId":"mx-fs-boot-chain","stem":"选出所有正确的说法。在控制器里直接 new 实体并 save，为什么改表字段或业务规则时，HTTP 接口形状也会被动一起改？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"控制器只接收 HTTP、调用用例，并返回状态码与问题详情。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"若在控制器里直接操作实体，表字段会进入请求或响应；改表或改规则就会迫使接口契约一起改。"}],"answer":"b","answers":["b","d"],"explain":"控制器只接收 HTTP、调用用例，并返回状态码与问题详情。实体与表结构留在持久化。若在控制器里直接操作实体，表字段会进入请求或响应；改表或改规则就会迫使接口契约一起改。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsp2-2","pointId":"mx-fs-write-invariant","stem":"选出所有正确的说法。接口返回了 200，为什么仍可能没有订单，或者库存被扣成负数？","options":[{"id":"a","text":"200 只说明这次响应的状态码。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"fetch 对 4xx 不抛错。"},{"id":"d","text":"订单行、库存不小于 0、同一个幂等键只有一行，要在同一次提交里成立。"}],"answer":"a","answers":["a","d"],"explain":"200 只说明这次响应的状态码。订单行、库存不小于 0、同一个幂等键只有一行，要在同一次提交里成立。成功状态码写在这次提交之后。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「写操作要把契约里的成功和失败画成确定的界面」的结论，不是这一问要选的说法。"}},
  {"id":"xsp2-3","pointId":"mx-fs-read-shape","stem":"选出所有正确的说法。详情接口直接返回订单实体，为什么页面会多出内部字段，或者刚下单成功打开详情却像没有这张订单？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"实体上有契约没约定的字段，序列化时还可能再查关联。"},{"id":"c","text":"刚提交、页面必须马上看见的，读主库；从库要写明允许旧多久。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"实体上有契约没约定的字段，序列化时还可能再查关联。详情只返回约定字段。刚提交、页面必须马上看见的，读主库；从库要写明允许旧多久。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xsp2-4","pointId":"mx-fs-ship-bar","stem":"选出所有正确的说法。怎样判断自己可以独立做一个前端加 Java 的功能，而不是只会分别写两边的示例？","options":[{"id":"a","text":"标准是一条竖切（vertical slice）：同一功能从页面到数据库。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"五种失败——字段不合法、业务规则拒绝、唯一约束冲突、事务回滚、请求没到达服务——都能指出落在页面、接口契约、用例还是持久化；前后端各跑通一个互不相关的示例不算。"}],"answer":"a","answers":["a","d"],"explain":"标准是一条竖切（vertical slice）：同一功能从页面到数据库。五种失败——字段不合法、业务规则拒绝、唯一约束冲突、事务回滚、请求没到达服务——都能指出落在页面、接口契约、用例还是持久化；前后端各跑通一个互不相关的示例不算。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk1-1","pointId":"mx-react-ssr-not-fewer-http","stem":"选出所有正确的说法。为什么把服务端渲染概括成“一个 HTML 返回所有数据、因此减少 HTTP 请求、首屏不再依赖 JS”会误导？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"SSR 交出的 HTML 之后仍要拉脚本样式图片。"},{"id":"c","text":"不是“一份 HTML 返回所有数据、减少 HTTP”。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"b","answers":["b","c"],"explain":"SSR 交出的 HTML 之后仍要拉脚本样式图片。不是“一份 HTML 返回所有数据、减少 HTTP”。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk1-2","pointId":"mx-angular-ngonchanges-primitives","stem":"选出所有正确的说法。为什么把 ngOnChanges 说成“只有对象引用变化才触发”，又把 Angular 2+ 说成每次从根脏检查整棵树？","options":[{"id":"a","text":"ngOnChanges 在首次绑定就会进，不限对象引用。"},{"id":"b","text":"Angular 现行检查也不再是“每次从根扫整棵树”那句旧话。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"ngOnChanges 在首次绑定就会进，不限对象引用。Angular 现行检查也不再是“每次从根扫整棵树”那句旧话。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk1-3","pointId":"mx-fe-slow-page-where","stem":"选出所有正确的说法。列表一卡就给每行套 memo，为什么录下来耗时还在？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"卡顿要先分清是等首字节还是主线程长任务。"},{"id":"d","text":"慢在网络时给行套 memo 不改变那一段。"}],"answer":"c","answers":["c","d"],"explain":"卡顿要先分清是等首字节还是主线程长任务。慢在网络时给行套 memo 不改变那一段。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk1-4","pointId":"mx-vite-env-client-prefix","stem":"选出所有正确的说法。把数据库密码写进 .env 再 import.meta.env.VITE_DB_PASSWORD，为什么等于公开？","options":[{"id":"a","text":"带 VITE_ 的变量会进浏览器包，能被搜到。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"密码只能放不带前缀的服务端/构建环境。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","c"],"explain":"带 VITE_ 的变量会进浏览器包，能被搜到。密码只能放不带前缀的服务端/构建环境。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk1-5","pointId":"mx-eslint-error-not-warning","stem":"选出所有正确的说法。规则全是警告，流水线为什么还是绿的？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"warn 默认不改变〔退出码｜进程结束时交给调用方的整数〕。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"要让警告挡住合并，运行时加上 --max-warnings。"}],"answer":"b","answers":["b","d"],"explain":"warn 默认不改变〔退出码｜进程结束时交给调用方的整数〕。要让警告挡住合并，运行时加上 --max-warnings。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-1","pointId":"mx-request-trace-one-hop","stem":"选出所有正确的说法。用户说下单慢，日志、指标、链路各有一段数字，为什么仍定位不到是哪一跳？","options":[{"id":"a","text":"慢要落到同一追踪标识下的某一跳。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"日志、指标、链路数字对不上，就不是同一次请求。"}],"answer":"a","answers":["a","d"],"explain":"慢要落到同一追踪标识下的某一跳。日志、指标、链路数字对不上，就不是同一次请求。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-2","pointId":"mx-jdbc-datasource-not-diy-pool","stem":"选出所有正确的说法。旧资料说 JDBC 没有连接池，只能自己做缓冲池。为什么这不能当现行答案？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"连接池走 DataSource。"},{"id":"c","text":"close 是归还；不要手写 synchronized 空闲列表当 JDBC 标准答案。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"连接池走 DataSource。close 是归还；不要手写 synchronized 空闲列表当 JDBC 标准答案。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-3","pointId":"mx-git-restore-over-checkout","stem":"选出所有正确的说法。为什么还把“git checkout 文件”当成恢复工作区的标准答案？","options":[{"id":"a","text":"还原文件用 restore，切分支用 switch。"},{"id":"b","text":"checkout 旧写法仍能跑，不再当标准答案。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"还原文件用 restore，切分支用 switch。checkout 旧写法仍能跑，不再当标准答案。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-4","pointId":"mx-linux-virtual-memory-isolation","stem":"选出所有正确的说法。为什么把单片机那种“CPU 直接按物理地址读写内存”套到多进程操作系统上，会在两个程序写同一地址时说不通？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"没有操作系统的直访模型里地址就是物理位置。"},{"id":"d","text":"多进程要靠虚拟地址隔离，再由操作系统映射到不同物理页。"}],"answer":"c","answers":["c","d"],"explain":"没有操作系统的直访模型里地址就是物理位置。多进程要靠虚拟地址隔离，再由操作系统映射到不同物理页。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-5","pointId":"mx-linux-multilevel-page-table","stem":"选出所有正确的说法。为什么把“每个进程一张覆盖全部虚拟空间的扁平页表”背成实现现状，会在算内存开销时对不上？","options":[{"id":"a","text":"32 位、4KB 页时单级页表可到约 4MB/进程。"},{"id":"b","text":"多级页表只为用到的区间建下级表。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","b"],"explain":"32 位、4KB 页时单级页表可到约 4MB/进程。多级页表只为用到的区间建下级表。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-6","pointId":"mx-linux-page-fault-swap","stem":"选出所有正确的说法。为什么把“进程一启动就把全部虚拟页装进物理内存”背成现状，会在解释懒加载和 swap 时说不通？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"可以先建映射、访问时再缺页补页。"},{"id":"d","text":"内存紧时把近期不用的页换出到磁盘，需要时再换入。"}],"answer":"c","answers":["c","d"],"explain":"可以先建映射、访问时再缺页补页。内存紧时把近期不用的页换出到磁盘，需要时再换入。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-7","pointId":"mx-k8s-runtime-not-only-docker","stem":"选出所有正确的说法。为什么还把 Node 背成一定跑 Docker，且 Master 默认完全不干活？","options":[{"id":"a","text":"kubelet 走 CRI，不绑定 Docker。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"现行常见 containerd/CRI-O，不是“Node 一定 Docker”。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"kubelet 走 CRI，不绑定 Docker。现行常见 containerd/CRI-O，不是“Node 一定 Docker”。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-8","pointId":"mx-linux-root-group-not-root","stem":"选出所有正确的说法。为什么用 usermod -G root 当“权限介于普通用户和 root 之间”，磁盘满了就 find / 再 rm -rf？","options":[{"id":"a","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"b","text":"进 root 组不等于 uid 0。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"特权看 sudoers；清理磁盘不要 find / 再 rm -rf。"}],"answer":"b","answers":["b","d"],"explain":"进 root 组不等于 uid 0。特权看 sudoers；清理磁盘不要 find / 再 rm -rf。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-9","pointId":"mx-linux-process-states","stem":"选出所有正确的说法。为什么把“创建、就绪、运行、阻塞、结束”背成 Java 线程只有这五种，读 jstack 会对不上？","options":[{"id":"a","text":"那是操作系统教材里的进程调度模型。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"Java 用 Thread.State 六个值；两者名字相近但不是同一套枚举。"}],"answer":"a","answers":["a","d"],"explain":"那是操作系统教材里的进程调度模型。Java 用 Thread.State 六个值；两者名字相近但不是同一套枚举。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-10","pointId":"mx-linux-process-context-switch","stem":"选出所有正确的说法。为什么把“换一个线程跑一下”想成只改程序计数器，会低估进程切换成本？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"CPU 上下文包括寄存器与 PC。"},{"id":"c","text":"进程切换还要换虚拟内存等用户态资源，以及内核栈等内核态资源，且在内核态完成。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"b","answers":["b","c"],"explain":"CPU 上下文包括寄存器与 PC。进程切换还要换虚拟内存等用户态资源，以及内核栈等内核态资源，且在内核态完成。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-11","pointId":"mx-linux-epoll-vs-select","stem":"选出所有正确的说法。为什么连接数上去以后，还把 select 当唯一多路复用答案，会在解释 epoll 时说不通？","options":[{"id":"a","text":"select/poll 每次要带着整份集合进内核并线性扫。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"epoll 在内核里维护关注集合，只返回就绪的那些。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"select/poll 每次要带着整份集合进内核并线性扫。epoll 在内核里维护关注集合，只返回就绪的那些。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-12","pointId":"mx-linux-inode-dentry","stem":"选出所有正确的说法。为什么同一个文件可以有多个名字，却仍是一份数据？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"名字在目录项（dentry）里；元数据与数据块位置在 inode 里。"},{"id":"c","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"},{"id":"d","text":"多个 dentry 可以指向同一个 inode，这就是硬链接。"}],"answer":"b","answers":["b","d"],"explain":"名字在目录项（dentry）里；元数据与数据块位置在 inode 里。多个 dentry 可以指向同一个 inode，这就是硬链接。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-13","pointId":"mx-linux-inode-block-pointers","stem":"选出所有正确的说法。为什么小文件和大文件都能用同一套 inode 结构描述，却不能假设每次读都只跟一次指针？","options":[{"id":"a","text":"inode 里既有直接指向数据块的指针，也有一到三级间接索引。"},{"id":"b","text":"小文件走直接指针；大文件要多查几级索引块。"},{"id":"c","text":"会写框架不等于这四件事已经对齐。"},{"id":"d","text":"晚到的 GET 若写入表单状态，会覆盖用户尚未提交的输入。"}],"answer":"a","answers":["a","b"],"explain":"inode 里既有直接指向数据块的指针，也有一到三级间接索引。小文件走直接指针；大文件要多查几级索引块。","whyWrong":{"c":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-14","pointId":"mx-linux-nic-mtu-rx-errors","stem":"选出所有正确的说法。为什么 IP 包很大时要分片，而 ifconfig 里 dropped 又不能直接当成“网线坏了”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"c","text":"链路有 MTU，超长 IP 包要在 IP 层分片。"},{"id":"d","text":"接口上的 errors/dropped/overruns 等计数指向不同故障面，要分开读。"}],"answer":"c","answers":["c","d"],"explain":"链路有 MTU，超长 IP 包要在 IP 层分片。接口上的 errors/dropped/overruns 等计数指向不同故障面，要分开读。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","b":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-15","pointId":"mx-docker-root-not-host-root","stem":"选出所有正确的说法。为什么把 Docker 安全背成“容器 root 就是宿主机 root，一提升权限就能无限制操作机器”？","options":[{"id":"a","text":"容器 root 不等于无限制的宿主机 root。"},{"id":"b","text":"页面管交互，接口契约管双方字段和失败 type，用例管业务规则和事务，持久化管落盘的行和约束。"},{"id":"c","text":"还有 capabilities、用户命名空间与 rootless。"},{"id":"d","text":"服务器状态、表单状态、请求状态是三份数据。"}],"answer":"a","answers":["a","c"],"explain":"容器 root 不等于无限制的宿主机 root。还有 capabilities、用户命名空间与 rootless。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","d":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-16","pointId":"mx-etcd-v3-grpc-not-rest","stem":"选出所有正确的说法。为什么 k8s 面试题还把 etcd 特点写成“REST 风格的 HTTP+JSON，写 1k/s”？","options":[{"id":"a","text":"会写框架不等于这四件事已经对齐。"},{"id":"b","text":"现行 etcd v3 走 gRPC。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"REST JSON 是旧 v2，也不要当缓存用。"}],"answer":"b","answers":["b","d"],"explain":"现行 etcd v3 走 gRPC。REST JSON 是旧 v2，也不要当缓存用。","whyWrong":{"a":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
  {"id":"xwk2-17","pointId":"mx-git-default-branch-not-master","stem":"选出所有正确的说法。为什么还把 Git 初始化背成一定有一个名叫 master 的默认分支？","options":[{"id":"a","text":"默认分支名可配，现在常见 main。"},{"id":"b","text":"会写框架不等于这四件事已经对齐。"},{"id":"c","text":"服务器状态、表单状态、请求状态是三份数据。"},{"id":"d","text":"不要把初始化背成一定有 master。"}],"answer":"a","answers":["a","d"],"explain":"默认分支名可配，现在常见 main。不要把初始化背成一定有 master。","whyWrong":{"b":"这一句是「一个功能要同时对上页面、接口契约、用例和持久化」的结论，不是这一问要选的说法。","c":"这一句是「页面上要分清 URL 状态、表单状态、服务器状态和请求状态」的结论，不是这一问要选的说法。"}},
]

export const MULTI_GATES = [
  {
    "id": "xla1",
    "courseId": "lang",
    "level": 1,
    "title": "语言基础",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xla1-1",
      "xla1-2",
      "xla1-3",
      "xla1-4",
      "xla1-5",
      "xla1-6",
      "xla1-7",
      "xla1-8",
      "xla1-9",
      "xla1-10",
      "xla1-11",
      "xla1-12",
      "xla1-13",
      "xla1-14",
      "xla1-15",
      "xla1-16",
      "xla1-17",
      "xla1-18",
      "xla1-19",
      "xla1-20"
    ]
  },
  {
    "id": "xla2",
    "courseId": "lang",
    "level": 2,
    "title": "TypeScript",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xla2-1",
      "xla2-2",
      "xla2-3",
      "xla2-4",
      "xla2-5",
      "xla2-6",
      "xla2-7",
      "xla2-8"
    ]
  },
  {
    "id": "xbr1",
    "courseId": "browser",
    "level": 1,
    "title": "浏览器",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xbr1-1",
      "xbr1-2",
      "xbr1-3",
      "xbr1-4",
      "xbr1-5",
      "xbr1-6",
      "xbr1-7",
      "xbr1-8",
      "xbr1-9",
      "xbr1-10",
      "xbr1-11",
      "xbr1-12",
      "xbr1-13",
      "xbr1-14",
      "xbr1-15",
      "xbr1-16",
      "xbr1-17",
      "xbr1-18",
      "xbr1-19"
    ]
  },
  {
    "id": "xbr2",
    "courseId": "browser",
    "level": 2,
    "title": "CSS 与布局",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xbr2-1",
      "xbr2-2",
      "xbr2-3",
      "xbr2-4",
      "xbr2-5",
      "xbr2-6",
      "xbr2-7"
    ]
  },
  {
    "id": "xre1",
    "courseId": "react",
    "level": 1,
    "title": "React",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xre1-1",
      "xre1-2",
      "xre1-3",
      "xre1-4",
      "xre1-5",
      "xre1-6",
      "xre1-7",
      "xre1-8",
      "xre1-9",
      "xre1-10",
      "xre1-11",
      "xre1-12",
      "xre1-13",
      "xre1-14",
      "xre1-15",
      "xre1-16",
      "xre1-17"
    ]
  },
  {
    "id": "xre2",
    "courseId": "react",
    "level": 2,
    "title": "React 生态",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xre2-1",
      "xre2-2",
      "xre2-3",
      "xre2-4",
      "xre2-5",
      "xre2-6",
      "xre2-7",
      "xre2-8",
      "xre2-9",
      "xre2-10",
      "xre2-11",
      "xre2-12"
    ]
  },
  {
    "id": "xvu1",
    "courseId": "vue",
    "level": 1,
    "title": "Vue",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xvu1-1",
      "xvu1-2",
      "xvu1-3",
      "xvu1-4",
      "xvu1-5",
      "xvu1-6",
      "xvu1-7",
      "xvu1-8",
      "xvu1-9",
      "xvu1-10",
      "xvu1-11",
      "xvu1-12",
      "xvu1-13",
      "xvu1-14",
      "xvu1-15"
    ]
  },
  {
    "id": "xvu2",
    "courseId": "vue",
    "level": 2,
    "title": "Vue 生态",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xvu2-1",
      "xvu2-2",
      "xvu2-3",
      "xvu2-4"
    ]
  },
  {
    "id": "xcx1",
    "courseId": "client",
    "level": 1,
    "title": "技术选型",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xcx1-1",
      "xcx1-2",
      "xcx1-3",
      "xcx1-4",
      "xcx1-5",
      "xcx1-6",
      "xcx1-7",
      "xcx1-8",
      "xcx1-9",
      "xcx1-10",
      "xcx1-11",
      "xcx1-12",
      "xcx1-13",
      "xcx1-14",
      "xcx1-15",
      "xcx1-16"
    ]
  },
  {
    "id": "xcx2",
    "courseId": "client",
    "level": 2,
    "title": "微前端",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xcx2-1",
      "xcx2-2",
      "xcx2-3",
      "xcx2-4",
      "xcx2-5"
    ]
  },
  {
    "id": "xcx3",
    "courseId": "client",
    "level": 3,
    "title": "React Native",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xcx3-1",
      "xcx3-2",
      "xcx3-3",
      "xcx3-4",
      "xcx3-5",
      "xcx3-6",
      "xcx3-7",
      "xcx3-8"
    ]
  },
  {
    "id": "xcx4",
    "courseId": "client",
    "level": 4,
    "title": "Flutter",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xcx4-1",
      "xcx4-2",
      "xcx4-3",
      "xcx4-4",
      "xcx4-5",
      "xcx4-6",
      "xcx4-7"
    ]
  },
  {
    "id": "xcx5",
    "courseId": "client",
    "level": 5,
    "title": "UniApp 与 Taro",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xcx5-1",
      "xcx5-2",
      "xcx5-3",
      "xcx5-4"
    ]
  },
  {
    "id": "xcx6",
    "courseId": "client",
    "level": 6,
    "title": "Node.js",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xcx6-1",
      "xcx6-2",
      "xcx6-3",
      "xcx6-4",
      "xcx6-5"
    ]
  },
  {
    "id": "xjb1",
    "courseId": "java",
    "level": 1,
    "title": "Java 基础",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xjb1-1",
      "xjb1-2",
      "xjb1-3",
      "xjb1-4",
      "xjb1-5",
      "xjb1-6",
      "xjb1-7",
      "xjb1-8",
      "xjb1-9",
      "xjb1-10",
      "xjb1-11",
      "xjb1-12",
      "xjb1-13",
      "xjb1-14",
      "xjb1-15",
      "xjb1-16",
      "xjb1-17",
      "xjb1-18",
      "xjb1-19",
      "xjb1-20",
      "xjb1-21",
      "xjb1-22",
      "xjb1-23",
      "xjb1-24",
      "xjb1-25",
      "xjb1-26",
      "xjb1-27",
      "xjb1-28",
      "xjb1-29",
      "xjb1-30",
      "xjb1-31",
      "xjb1-32",
      "xjb1-33",
      "xjb1-34",
      "xjb1-35",
      "xjb1-36",
      "xjb1-37",
      "xjb1-38",
      "xjb1-39",
      "xjb1-40",
      "xjb1-41",
      "xjb1-42"
    ]
  },
  {
    "id": "xpt1",
    "courseId": "pattern",
    "level": 1,
    "title": "设计模式",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xpt1-1",
      "xpt1-2",
      "xpt1-3",
      "xpt1-4",
      "xpt1-5",
      "xpt1-6",
      "xpt1-7",
      "xpt1-8",
      "xpt1-9",
      "xpt1-10",
      "xpt1-11"
    ]
  },
  {
    "id": "xpt2",
    "courseId": "pattern",
    "level": 2,
    "title": "算法",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xpt2-1",
      "xpt2-2",
      "xpt2-3"
    ]
  },
  {
    "id": "xjv1",
    "courseId": "jvm",
    "level": 1,
    "title": "JVM",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xjv1-1",
      "xjv1-2",
      "xjv1-3",
      "xjv1-4",
      "xjv1-5",
      "xjv1-6",
      "xjv1-7",
      "xjv1-8",
      "xjv1-9",
      "xjv1-10"
    ]
  },
  {
    "id": "xcc1",
    "courseId": "conc",
    "level": 1,
    "title": "并发",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xcc1-1",
      "xcc1-2",
      "xcc1-3",
      "xcc1-4",
      "xcc1-5",
      "xcc1-6",
      "xcc1-7",
      "xcc1-8",
      "xcc1-9",
      "xcc1-10",
      "xcc1-11",
      "xcc1-12"
    ]
  },
  {
    "id": "xsq1",
    "courseId": "sql",
    "level": 1,
    "title": "数据库",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsq1-1",
      "xsq1-2",
      "xsq1-3",
      "xsq1-4",
      "xsq1-5",
      "xsq1-6",
      "xsq1-7",
      "xsq1-8",
      "xsq1-9",
      "xsq1-10",
      "xsq1-11",
      "xsq1-12",
      "xsq1-13",
      "xsq1-14",
      "xsq1-15",
      "xsq1-16",
      "xsq1-17",
      "xsq1-18",
      "xsq1-19",
      "xsq1-20",
      "xsq1-21",
      "xsq1-22",
      "xsq1-23",
      "xsq1-24",
      "xsq1-25",
      "xsq1-26",
      "xsq1-27",
      "xsq1-28",
      "xsq1-29",
      "xsq1-30",
      "xsq1-31",
      "xsq1-32",
      "xsq1-33",
      "xsq1-34",
      "xsq1-35",
      "xsq1-36",
      "xsq1-37"
    ]
  },
  {
    "id": "xca1",
    "courseId": "cache",
    "level": 1,
    "title": "缓存",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xca1-1",
      "xca1-2",
      "xca1-3",
      "xca1-4",
      "xca1-5",
      "xca1-6",
      "xca1-7",
      "xca1-8",
      "xca1-9",
      "xca1-10",
      "xca1-11",
      "xca1-12",
      "xca1-13",
      "xca1-14",
      "xca1-15",
      "xca1-16",
      "xca1-17",
      "xca1-18",
      "xca1-19",
      "xca1-20",
      "xca1-21"
    ]
  },
  {
    "id": "xsg1",
    "courseId": "spring",
    "level": 1,
    "title": "Spring",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsg1-1",
      "xsg1-2",
      "xsg1-3",
      "xsg1-4",
      "xsg1-5",
      "xsg1-6",
      "xsg1-7",
      "xsg1-8",
      "xsg1-9",
      "xsg1-10",
      "xsg1-11",
      "xsg1-12",
      "xsg1-13",
      "xsg1-14"
    ]
  },
  {
    "id": "xsg2",
    "courseId": "spring",
    "level": 2,
    "title": "MyBatis",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsg2-1",
      "xsg2-2",
      "xsg2-3",
      "xsg2-4",
      "xsg2-5",
      "xsg2-6",
      "xsg2-7",
      "xsg2-8",
      "xsg2-9",
      "xsg2-10",
      "xsg2-11",
      "xsg2-12",
      "xsg2-13"
    ]
  },
  {
    "id": "xsg3",
    "courseId": "spring",
    "level": 3,
    "title": "JPA",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsg3-1",
      "xsg3-2",
      "xsg3-3",
      "xsg3-4",
      "xsg3-5",
      "xsg3-6"
    ]
  },
  {
    "id": "xsg4",
    "courseId": "spring",
    "level": 4,
    "title": "搜索",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsg4-1",
      "xsg4-2",
      "xsg4-3",
      "xsg4-4"
    ]
  },
  {
    "id": "xnx1",
    "courseId": "secure",
    "level": 1,
    "title": "前端 · 安全",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xnx1-1",
      "xnx1-2",
      "xnx1-3",
      "xnx1-4",
      "xnx1-5",
      "xnx1-6",
      "xnx1-7",
      "xnx1-8",
      "xnx1-9",
      "xnx1-10",
      "xnx1-11",
      "xnx1-12",
      "xnx1-13",
      "xnx1-14",
      "xnx1-15",
      "xnx1-16",
      "xnx1-17",
      "xnx1-18",
      "xnx1-19",
      "xnx1-20"
    ]
  },
  {
    "id": "xnx2",
    "courseId": "secure",
    "level": 2,
    "title": "网络与安全",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xnx2-1",
      "xnx2-2",
      "xnx2-3",
      "xnx2-4",
      "xnx2-5",
      "xnx2-6",
      "xnx2-7",
      "xnx2-8",
      "xnx2-9",
      "xnx2-10",
      "xnx2-11",
      "xnx2-12",
      "xnx2-13",
      "xnx2-14",
      "xnx2-15",
      "xnx2-16"
    ]
  },
  {
    "id": "xnx3",
    "courseId": "secure",
    "level": 3,
    "title": "Java · 安全",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xnx3-1",
      "xnx3-2",
      "xnx3-3",
      "xnx3-4",
      "xnx3-5",
      "xnx3-6",
      "xnx3-7"
    ]
  },
  {
    "id": "xnx4",
    "courseId": "secure",
    "level": 4,
    "title": "Netty",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xnx4-1",
      "xnx4-2",
      "xnx4-3"
    ]
  },
  {
    "id": "xng1",
    "courseId": "nginx",
    "level": 1,
    "title": "Nginx",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xng1-1",
      "xng1-2",
      "xng1-3"
    ]
  },
  {
    "id": "xgw1",
    "courseId": "gateway",
    "level": 1,
    "title": "网关",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xgw1-1"
    ]
  },
  {
    "id": "xmq1",
    "courseId": "mq",
    "level": 1,
    "title": "消息队列",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xmq1-1",
      "xmq1-2",
      "xmq1-3",
      "xmq1-4",
      "xmq1-5",
      "xmq1-6",
      "xmq1-7",
      "xmq1-8",
      "xmq1-9",
      "xmq1-10",
      "xmq1-11",
      "xmq1-12"
    ]
  },
  {
    "id": "xsc1",
    "courseId": "sca",
    "level": 1,
    "title": "Spring Cloud Alibaba",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsc1-1",
      "xsc1-2",
      "xsc1-3",
      "xsc1-4",
      "xsc1-5",
      "xsc1-6",
      "xsc1-7",
      "xsc1-8",
      "xsc1-9",
      "xsc1-10",
      "xsc1-11",
      "xsc1-12",
      "xsc1-13",
      "xsc1-14",
      "xsc1-15",
      "xsc1-16",
      "xsc1-17"
    ]
  },
  {
    "id": "xsc2",
    "courseId": "sca",
    "level": 2,
    "title": "Sentinel",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsc2-1"
    ]
  },
  {
    "id": "xdg1",
    "courseId": "design",
    "level": 1,
    "title": "系统设计",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xdg1-1",
      "xdg1-2",
      "xdg1-3",
      "xdg1-4",
      "xdg1-5",
      "xdg1-6",
      "xdg1-7",
      "xdg1-8",
      "xdg1-9",
      "xdg1-10"
    ]
  },
  {
    "id": "xdi1",
    "courseId": "dist",
    "level": 1,
    "title": "分布式与高并发",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xdi1-1",
      "xdi1-2",
      "xdi1-3",
      "xdi1-4",
      "xdi1-5",
      "xdi1-6",
      "xdi1-7",
      "xdi1-8",
      "xdi1-9",
      "xdi1-10",
      "xdi1-11",
      "xdi1-12",
      "xdi1-13",
      "xdi1-14",
      "xdi1-15",
      "xdi1-16"
    ]
  },
  {
    "id": "xsh1",
    "courseId": "ship",
    "level": 1,
    "title": "交付与运行",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsh1-1",
      "xsh1-2",
      "xsh1-3",
      "xsh1-4",
      "xsh1-5",
      "xsh1-6",
      "xsh1-7",
      "xsh1-8",
      "xsh1-9",
      "xsh1-10",
      "xsh1-11",
      "xsh1-12"
    ]
  },
  {
    "id": "xte1",
    "courseId": "test",
    "level": 1,
    "title": "前端 · 测试",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xte1-1",
      "xte1-2",
      "xte1-3",
      "xte1-4",
      "xte1-5",
      "xte1-6",
      "xte1-7"
    ]
  },
  {
    "id": "xte2",
    "courseId": "test",
    "level": 2,
    "title": "Java · 测试",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xte2-1",
      "xte2-2"
    ]
  },
  {
    "id": "xsp1",
    "courseId": "spine",
    "level": 1,
    "title": "前端 · 全栈主线",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsp1-1",
      "xsp1-2",
      "xsp1-3",
      "xsp1-4"
    ]
  },
  {
    "id": "xsp2",
    "courseId": "spine",
    "level": 2,
    "title": "Java · 全栈主线",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xsp2-1",
      "xsp2-2",
      "xsp2-3",
      "xsp2-4"
    ]
  },
  {
    "id": "xwk1",
    "courseId": "work",
    "level": 1,
    "title": "前端 · 工程实践",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xwk1-1",
      "xwk1-2",
      "xwk1-3",
      "xwk1-4",
      "xwk1-5"
    ]
  },
  {
    "id": "xwk2",
    "courseId": "work",
    "level": 2,
    "title": "Java · 工程实践",
    "lead": "选出所有正确项。少选或多选都算错。",
    "questionIds": [
      "xwk2-1",
      "xwk2-2",
      "xwk2-3",
      "xwk2-4",
      "xwk2-5",
      "xwk2-6",
      "xwk2-7",
      "xwk2-8",
      "xwk2-9",
      "xwk2-10",
      "xwk2-11",
      "xwk2-12",
      "xwk2-13",
      "xwk2-14",
      "xwk2-15",
      "xwk2-16",
      "xwk2-17"
    ]
  }
]
