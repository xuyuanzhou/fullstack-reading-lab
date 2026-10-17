/** 由 scripts/build-drill-cover.mjs 生成。正确项是课文结论，接在已有卷之后。 */
import type { MoreAsk } from './drillMoreDesign.ts'

export const COVER_COURSES = [
  {
    "id": "lang",
    "title": "语言与类型",
    "lead": "先分清这门语言在哪跑、值怎么存、名字能不能再赋值，再谈类型标注。"
  },
  {
    "id": "browser",
    "title": "浏览器与样式",
    "lead": "先分清文档、事件和样式各做哪一步，再谈弹层、表单和滚动。"
  },
  {
    "id": "react",
    "title": "React",
    "lead": "组件、参数和状态各管一件事。Hook 按调用顺序挂上，更新不会当场改掉这一次的值。"
  },
  {
    "id": "vue",
    "title": "Vue",
    "lead": "模板描述要输出的 HTML。脚本里改的是 ref 的 value，页面绑的是代理上的属性。"
  },
  {
    "id": "client",
    "title": "跨端与选型",
    "lead": "先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。"
  },
  {
    "id": "java",
    "title": "Java 基础",
    "lead": "字节码在虚拟机里跑。基本类型存的是值，局部变量必须先赋值。"
  },
  {
    "id": "pattern",
    "title": "模式与算法",
    "lead": "先指出变化落在创建、结构还是行为，再谈某一种模式或某一种查找。"
  },
  {
    "id": "spring",
    "title": "Spring 与数据访问",
    "lead": "容器负责把对象接上。超卖、映射和检索仍要按这一次的写入和查询核对。"
  },
  {
    "id": "secure",
    "title": "安全与 Netty",
    "lead": "先分清谁校验、谁持有连接、字节在哪一层被读走。"
  },
  {
    "id": "rest",
    "title": "其余课程",
    "lead": "这些结论还没有单独成卷。每一题仍只回答这一问。"
  }
] as const

export const COVER_POINTS = [
  {
    "id": "cv-js-what-it-is",
    "courseId": "lang",
    "title": "JavaScript 是给网页加行为的编程语言",
    "lessonId": "js-what-it-is",
    "summary": "是 JavaScript。它是网页里用来写行为的编程语言。"
  },
  {
    "id": "cv-js-run-in-page",
    "courseId": "lang",
    "title": "脚本通过 script 进入已经打开的文档",
    "lessonId": "js-run-in-page",
    "summary": "写在 script 元素里，或用 src 指向一个 .js 文件。"
  },
  {
    "id": "cv-js-not-java-around",
    "courseId": "lang",
    "title": "JavaScript 不是 Java，旁边是 HTML…",
    "lessonId": "js-not-java-around",
    "summary": "不是。JavaScript 和 Java 是两门语言。"
  },
  {
    "id": "cv-js-value-kinds",
    "courseId": "lang",
    "title": "值分成原始值和对象，typeof 报告大类",
    "lessonId": "js-value-kinds",
    "summary": "原始值是 undefined、null、boolean、number、bigint、string、symbol。"
  },
  {
    "id": "cv-js-let-const-decl",
    "courseId": "lang",
    "title": "let 可以再赋值，const 不能把名字指到别处",
    "lessonId": "js-let-const-decl",
    "summary": "会再赋值就用 let。名字不能再指向别的值就用 const。"
  },
  {
    "id": "cv-js-number-ieee",
    "courseId": "lang",
    "title": "普通数字都是 number，除法会留下小数",
    "lessonId": "js-number-ieee",
    "summary": "得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。"
  },
  {
    "id": "cv-js-string-length",
    "courseId": "lang",
    "title": "字符串是原始值，引号里的内容用 length 量长度",
    "lessonId": "js-string-length",
    "summary": "它是字符串原始值。length 是长度。"
  },
  {
    "id": "cv-js-array-grows",
    "courseId": "lang",
    "title": "数组按下标存放值，length 会随 push 变大",
    "lessonId": "js-array-grows",
    "summary": "下标从 0 开始。push 把元素加到末尾并增大 length。"
  },
  {
    "id": "cv-js-object-property",
    "courseId": "lang",
    "title": "对象用属性名存放值，点号和方括号都能读",
    "lessonId": "js-object-property",
    "summary": "写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。"
  },
  {
    "id": "cv-js-function-return",
    "courseId": "lang",
    "title": "function 划出一段可调用的代码，return …",
    "lessonId": "js-function-return",
    "summary": "用 function 声明。调用时圆括号里的值按顺序对上参数。"
  },
  {
    "id": "cv-js-if-falsy",
    "courseId": "lang",
    "title": "if 把条件当成真或假，0 和空字符串算假",
    "lessonId": "js-if-falsy",
    "summary": "if 不要求条件已经是布尔值。0、空字符串、null、undefined、NaN 和 false 都算假，所以 0 会走进 else。"
  },
  {
    "id": "cv-js-for-while-break",
    "courseId": "lang",
    "title": "while 和 for 重复一块代码，break 离开…",
    "lessonId": "js-for-while-break",
    "summary": "for 或 while 在条件为真时重复。continue 跳过这一轮剩下的语句，break 离开整个循环。"
  },
  {
    "id": "cv-js-try-catch-throw",
    "courseId": "lang",
    "title": "throw 抛出一个值，catch 接住它",
    "lessonId": "js-try-catch-throw",
    "summary": "throw 抛出一个值，通常是 Error。try 外面的 catch 接到它。"
  },
  {
    "id": "cv-js-switch-strict",
    "courseId": "lang",
    "title": "switch 用严格相等匹配，没有 break 会继续…",
    "lessonId": "js-switch-strict",
    "summary": "switch 用 === 匹配。匹配之后会继续执行后面的语句，直到 break。"
  },
  {
    "id": "cv-js-equality",
    "courseId": "lang",
    "title": "相等、身份与 Object.is",
    "lessonId": "js-equality",
    "summary": "依赖要比值身份。NaN、±0、新对象各有规则；依赖整份对象会因每次新身份反复触发。"
  },
  {
    "id": "cv-es6-const-binding",
    "courseId": "lang",
    "title": "const 锁住的是绑定，对象里的字段仍能改",
    "lessonId": "es6-const-binding",
    "summary": "const 管的是绑定不能换目标，不冻结对象字段。要字段不可改用 freeze 或只读类型。"
  },
  {
    "id": "cv-es6-destructure-copies",
    "courseId": "lang",
    "title": "解构取出的是当时的值，缺省才用默认值",
    "lessonId": "es6-destructure-copies",
    "summary": "解构出的基本类型是拷贝；对象/数组取出的是同一引用。默认值只替换 undefined。"
  },
  {
    "id": "cv-es6-default-param-call-time",
    "courseId": "lang",
    "title": "默认参数在调用时求值，前面的形参后面可以用",
    "lessonId": "es6-default-param-call-time",
    "summary": "默认参数在调用时求值。省略或传 undefined 会再造一份，null 不会触发默认。"
  },
  {
    "id": "cv-es6-template-expression",
    "courseId": "lang",
    "title": "模板字符串会把表达式收成字符串",
    "lessonId": "es6-template-expression",
    "summary": "模板会调用 toString。对象常变成 [object Object]，应插入具体字段。"
  },
  {
    "id": "cv-js-scope-tdz",
    "courseId": "lang",
    "title": "作用域和暂时性死区",
    "lessonId": "js-scope-tdz",
    "summary": "let/const 有暂时性死区，声明前读取抛错。var 提升后是 undefined。"
  },
  {
    "id": "cv-js-this-callsite",
    "courseId": "lang",
    "title": "this 由调用方式决定，不由定义位置决定",
    "lessonId": "js-this-callsite",
    "summary": "this 看调用方式。拆出来单独调在严格模式是 undefined；箭头用定义处外层 this。"
  },
  {
    "id": "cv-js-prototype-chain",
    "courseId": "lang",
    "title": "class 只是原型链的写法",
    "lessonId": "js-prototype-chain",
    "summary": "class 方法挂在原型上共享；实例字段各自一份。类型看原型链，不比类名字符串。"
  },
  {
    "id": "cv-js-not-everything-object",
    "courseId": "lang",
    "title": "不是万物皆对象，链的尽头是 null",
    "lessonId": "js-not-everything-object",
    "summary": "不是万物皆对象。原始值 typeof 不是 object；null 也不是对象。"
  },
  {
    "id": "cv-js-arrow-has-no-prototype",
    "courseId": "lang",
    "title": "箭头函数没有 prototype，Function.p…",
    "lessonId": "js-arrow-has-no-prototype",
    "summary": "箭头与 bind 后的函数没有 prototype，不能当构造函数。"
  },
  {
    "id": "cv-js-class-extends-super",
    "courseId": "lang",
    "title": "extends 接上原型链，构造里先 super 再碰…",
    "lessonId": "js-class-extends-super",
    "summary": "子类构造必须先 super 再碰 this。静态里 super 指向父类构造函数。"
  },
  {
    "id": "cv-js-private-field-hash",
    "courseId": "lang",
    "title": "# 私有字段只在类声明内可见，不是下划线约定",
    "lessonId": "js-private-field-hash",
    "summary": "运行时私有是 # 字段。下划线挡不住；TS private 默认擦掉后也不挡。"
  },
  {
    "id": "cv-es6-rest-spread-position",
    "courseId": "lang",
    "title": "剩余参数收在末尾，展开用在调用和字面量里",
    "lessonId": "es6-rest-spread-position",
    "summary": "剩余参数收成数组，展开把数组拆开。剩余参数必须在末尾。"
  },
  {
    "id": "cv-es6-map-set-keys",
    "courseId": "lang",
    "title": "Map 的键保持原值，对象的键会被收成字符串",
    "lessonId": "es6-map-set-keys",
    "summary": "普通对象键会变成字符串，不同对象可能撞键。Map 用引用当键互不覆盖。"
  },
  {
    "id": "cv-es6-symbol-key",
    "courseId": "lang",
    "title": "Symbol 是不会和字符串键撞名的键",
    "lessonId": "es6-symbol-key",
    "summary": "Symbol 键互不相等，Object.keys 看不见。"
  },
  {
    "id": "cv-js-optional-chaining",
    "courseId": "lang",
    "title": "可选链 ?. 只短路属性访问，不吞掉业务错误",
    "lessonId": "js-optional-chaining",
    "summary": "?. 只在中间为 null/undefined 时短路。"
  },
  {
    "id": "cv-js-proxy-get-set-trap",
    "courseId": "lang",
    "title": "Proxy 拦截读写，不是给对象加一层“监听魔法”",
    "lessonId": "js-proxy-get-set-trap",
    "summary": "只有经代理的操作进陷阱。直接改原对象不触发；响应式必须持有代理引用。"
  },
  {
    "id": "cv-eventloop",
    "courseId": "lang",
    "title": "事件循环与微任务",
    "lessonId": "eventloop",
    "summary": "微任务在同步之后、宏任务之前清空。then 早于 setTimeout(0)。"
  },
  {
    "id": "cv-js-microtask-vs-macrotask",
    "courseId": "lang",
    "title": "then 是微任务，setTimeout 是后续任务，…",
    "lessonId": "js-microtask-vs-macrotask",
    "summary": "两者都叫异步但分属微任务与宏任务队列。then 通常早于 setTimeout(0)。"
  },
  {
    "id": "cv-promise-all-and-settled",
    "courseId": "lang",
    "title": "Promise.all 一拒绝就全停；要等全部结束用 …",
    "lessonId": "promise-all-and-settled",
    "summary": "all 一失败就整组拒绝。要分别记账用 allSettled；race 只取最快落定的一个。"
  },
  {
    "id": "cv-es6-for-of-iterable",
    "courseId": "lang",
    "title": "for...of 走可迭代协议，for...in 走可…",
    "lessonId": "es6-for-of-iterable",
    "summary": "for...of 走迭代协议拿值；for...in 枚举键且含可枚举原型名。"
  },
  {
    "id": "cv-js-iteration-protocol",
    "courseId": "lang",
    "title": "for-of 走的是可迭代协议，不是下标从 0 数到 …",
    "lessonId": "js-iteration-protocol",
    "summary": "能 for-of 的对象要实现迭代器方法。普通对象默认不是 iterable。"
  },
  {
    "id": "cv-js-generator-yield-pause",
    "courseId": "lang",
    "title": "生成器是可暂停的迭代器，不是异步魔法",
    "lessonId": "js-generator-yield-pause",
    "summary": "调用生成器只得到对象，要用 next/for-of 推进。"
  },
  {
    "id": "cv-js-async-generator-for-await",
    "courseId": "lang",
    "title": "async function* 用 for await…",
    "lessonId": "js-async-generator-for-await",
    "summary": "async 生成器用 for await...of。同步 for-of 不对。"
  },
  {
    "id": "cv-js-weakmap-lifetime",
    "courseId": "lang",
    "title": "WeakMap 的键随对象一起被回收，不能枚举",
    "lessonId": "js-weakmap-lifetime",
    "summary": "Map 强引用键会挡住回收。DOM 节点旁路缓存用 WeakMap。"
  },
  {
    "id": "cv-js-regex-dot-not-newline",
    "courseId": "lang",
    "title": ". 默认不匹配换行，\\d 也不总等于 0-9 的全部数字",
    "lessonId": "js-regex-dot-not-newline",
    "summary": "默认点号不匹配换行。要跨行开 s/DOTALL；\\d 也不等于永远 [0-9]。"
  },
  {
    "id": "cv-js-json-stringify-not-equal",
    "courseId": "lang",
    "title": "JSON.stringify 比不出两个对象是否相等",
    "lessonId": "js-json-stringify-not-equal",
    "summary": "stringify 会丢 undefined/函数、把 NaN 写成 null，且键顺序影响字符串。"
  },
  {
    "id": "cv-closure",
    "courseId": "lang",
    "title": "闭包、状态快照与函数组件",
    "lessonId": "closure",
    "summary": "同一次事件里多次 setState(count+1) 常基于同一快照。"
  },
  {
    "id": "cv-ts-what-it-is",
    "courseId": "lang",
    "title": "TypeScript 是带类型语法的 JavaScri…",
    "lessonId": "ts-what-it-is",
    "summary": "用 TypeScript。它是带类型语法的 JavaScript。"
  },
  {
    "id": "cv-ts-compile-to-js",
    "courseId": "lang",
    "title": "tsc 把 TypeScript 编译成 JavaSc…",
    "lessonId": "ts-compile-to-js",
    "summary": "执行的是 JavaScript。tsc 读取 .ts，检查类型，写出 .js。"
  },
  {
    "id": "cv-ts-not-runtime-check",
    "courseId": "lang",
    "title": "类型在编译后消失，旁边仍是 JavaScript",
    "lessonId": "ts-not-runtime-check",
    "summary": "不会。类型在编译后消失。"
  },
  {
    "id": "cv-ts-type-annotation",
    "courseId": "lang",
    "title": "冒号后面写类型，编译器按它检查赋值",
    "lessonId": "ts-type-annotation",
    "summary": "在名字后面写 : number。对不上的赋值会在编译时失败。"
  },
  {
    "id": "cv-ts-object-array-type",
    "courseId": "lang",
    "title": "对象类型写出字段，数组类型写出元素",
    "lessonId": "ts-object-array-type",
    "summary": "对象写成 { amount: number }。数组写成 string[]。"
  },
  {
    "id": "cv-ts-union-annotation",
    "courseId": "lang",
    "title": "竖线表示值可以是列出的类型之一",
    "lessonId": "ts-union-annotation",
    "summary": "写成 number | null。使用之前要先判断是哪一种。"
  },
  {
    "id": "cv-ts-unknown",
    "courseId": "lang",
    "title": "unknown 与 any：先验证再使用（TS 3.0）",
    "lessonId": "ts-unknown",
    "summary": "不可信数据用 unknown，先收窄再当具体类型。any 会把错误往后传。"
  },
  {
    "id": "cv-ts-const-readonly",
    "courseId": "lang",
    "title": "const 锁住绑定，readonly 锁住属性",
    "lessonId": "ts-const-readonly",
    "summary": "const 只锁绑定。字段要只读加类型或 freeze；类型挡不住任意绕过。"
  },
  {
    "id": "cv-css-what-it-is",
    "courseId": "browser",
    "title": "CSS 是描述文档怎么呈现的样式语言",
    "lessonId": "css-what-it-is",
    "summary": "写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。"
  },
  {
    "id": "cv-css-attach-to-document",
    "courseId": "browser",
    "title": "样式表挂到文档上，选择器才找得到元素",
    "lessonId": "css-attach-to-document",
    "summary": "用 link 引入外部样式表，或用 style 元素写在文档里。"
  },
  {
    "id": "cv-css-not-the-engine",
    "courseId": "browser",
    "title": "CSS 描述呈现，排版和绘制由浏览器做",
    "lessonId": "css-not-the-engine",
    "summary": "CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"
  },
  {
    "id": "cv-css-rule-syntax",
    "courseId": "browser",
    "title": "一条规则用选择器选中元素，用声明设置属性",
    "lessonId": "css-rule-syntax",
    "summary": "选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"
  },
  {
    "id": "cv-css-selector-simple",
    "courseId": "browser",
    "title": "类型、类和 id 选择器匹配的范围不同",
    "lessonId": "css-selector-simple",
    "summary": "p 匹配所有段落。 .price 匹配带这个类的元素。"
  },
  {
    "id": "cv-css-box-sizing",
    "courseId": "browser",
    "title": "width 含不含 padding",
    "lessonId": "css-box-sizing",
    "summary": "content-box 的 padding/border 加在 width 外。"
  },
  {
    "id": "cv-css-position-flow",
    "courseId": "browser",
    "title": "定位如何脱离或锚定在文档流",
    "lessonId": "css-position-flow",
    "summary": "absolute 相对最近非 static 祖先；找不到就相对初始包含块。"
  },
  {
    "id": "cv-css-containing-block",
    "courseId": "browser",
    "title": "fixed 不一定相对视口",
    "lessonId": "css-containing-block",
    "summary": "祖先 transform 等会改写 fixed 的包含块，不再贴视口。"
  },
  {
    "id": "cv-css-cascade",
    "courseId": "browser",
    "title": "层叠、权重与样式覆盖",
    "lessonId": "css-cascade",
    "summary": "层叠先比来源/重要性/层，再比选择器权重，最后才是顺序。"
  },
  {
    "id": "cv-css-stacking",
    "courseId": "browser",
    "title": "层叠上下文与 z-index",
    "lessonId": "css-stacking",
    "summary": "先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。"
  },
  {
    "id": "cv-css-flex",
    "courseId": "browser",
    "title": "Flex 项为什么不按 width 收缩",
    "lessonId": "css-flex",
    "summary": "先看 flex-basis 形成的初始主轴尺寸，再按 grow 和 shrink 分配多余或不足的空间。"
  },
  {
    "id": "cv-css-grid-flex",
    "courseId": "browser",
    "title": "Flex 排一条轴，Grid 排行列",
    "lessonId": "css-grid-flex",
    "summary": "不是。不是所有布局都该改成 Grid。"
  },
  {
    "id": "cv-css-container-query",
    "courseId": "browser",
    "title": "容器查询按组件自己的宽度换布局，不是只看视口",
    "lessonId": "css-container-query",
    "summary": "两处都用媒体查询时，主栏和侧栏的卡片跟着视口一起变，窄侧栏里也会横排。"
  },
  {
    "id": "cv-css-has-parent",
    "courseId": "browser",
    "title": ":has() 让父级按后代有没有某元素换样子",
    "lessonId": "css-has-parent",
    "summary": "article:has(.error) 在错误节点出现时给卡片换边框，节点移除后样式回到原样。"
  },
  {
    "id": "cv-css-aspect-ratio",
    "courseId": "browser",
    "title": "给图片和视频先写高宽比，减少加载时把页面撑开",
    "lessonId": "css-aspect-ratio",
    "summary": "图片没占位时，加载完成后高度突然变大，下面内容会被顶下去。"
  },
  {
    "id": "cv-browser-what-it-is",
    "courseId": "browser",
    "title": "浏览器是取出文档、交给引擎呈现的用户代理",
    "lessonId": "browser-what-it-is",
    "summary": "浏览器作为用户代理发出请求、取回文档，再解析成 DOM，套上 CSS，跑脚本，画到窗口里。"
  },
  {
    "id": "cv-browser-document-enters",
    "courseId": "browser",
    "title": "导航取出文档，解析之后才有 DOM",
    "lessonId": "browser-document-enters",
    "summary": "浏览器按网址导航，取出 HTML，解析成 DOM。脚本和样式都作用在这棵树上。"
  },
  {
    "id": "cv-browser-not-node",
    "courseId": "browser",
    "title": "浏览器里有文档和窗口，Node.js 里没有",
    "lessonId": "browser-not-node",
    "summary": "会失败。Node.js 没有窗口，也没有文档。"
  },
  {
    "id": "cv-dom-event-flow",
    "courseId": "browser",
    "title": "事件先捕获，再到达目标，然后冒泡",
    "lessonId": "dom-event-flow",
    "summary": "祖先上的捕获监听最先执行，接着是目标上的监听，最后才是祖先和文档上的冒泡监听。"
  },
  {
    "id": "cv-html-dialog-modal",
    "courseId": "browser",
    "title": "模态对话框用 dialog.showModal，不要自…",
    "lessonId": "html-dialog-modal",
    "summary": "普通绝对定位 div 不会自动困住焦点。用 dialog.showModal，Tab 留在框内，Esc 可关，背景不再点。"
  },
  {
    "id": "cv-html5-constraint-before-submit",
    "courseId": "browser",
    "title": "校验没过时不会触发 submit",
    "lessonId": "html5-constraint-before-submit",
    "summary": "按钮和 requestSubmit() 在校验失败时不触发 submit。"
  },
  {
    "id": "cv-formdata-multipart-upload",
    "courseId": "browser",
    "title": "文件上传用 FormData，不要手写 multipa…",
    "lessonId": "formdata-multipart-upload",
    "summary": "append 字段与文件，fetch POST body 用 FormData，不要手写 multipart Content-Type。"
  },
  {
    "id": "cv-html5-main-landmark",
    "courseId": "browser",
    "title": "没有 hidden 的 main 一页只能有一个",
    "lessonId": "html5-main-landmark",
    "summary": "可见的 main 只有一个，并且不在 header、nav、article、aside、footer 里。"
  },
  {
    "id": "cv-html5-media-play-promise",
    "courseId": "browser",
    "title": "带声音的自动播放会被拒绝，play() 要看 Prom…",
    "lessonId": "html5-media-play-promise",
    "summary": "带声音的 autoplay 被拒绝，元素停住。muted 和 playsinline 之后可以无声、页内播放。"
  },
  {
    "id": "cv-html5-canvas-buffer",
    "courseId": "browser",
    "title": "canvas 的宽高属性才是像素缓冲",
    "lessonId": "html5-canvas-buffer",
    "summary": "只改 CSS 时缓冲仍是 300×150，位图被拉伸。设置 width 和 height 属性后缓冲变大，已绘内容被清空，要重画。"
  },
  {
    "id": "cv-html5-pushstate-popstate",
    "courseId": "browser",
    "title": "pushState 改地址，这次调用不触发 popst…",
    "lessonId": "html5-pushstate-popstate",
    "summary": "pushState 只改当前文档的地址和历史，不触发 popstate。"
  },
  {
    "id": "cv-html5-dataset-string",
    "courseId": "browser",
    "title": "dataset 读出来的都是字符串",
    "lessonId": "html5-dataset-string",
    "summary": "直接相加得到 \"31\"。Number 转换后得到 4。"
  },
  {
    "id": "cv-html5-picture-source",
    "courseId": "browser",
    "title": "picture 里第一个匹配的 source 胜出",
    "lessonId": "html5-picture-source",
    "summary": "顺序在前且 media、type 都匹配的 source 被选中，后面的不请求。"
  },
  {
    "id": "cv-html5-drop-prevent-default",
    "courseId": "browser",
    "title": "dragover 不取消默认行为，drop 就不会发生",
    "lessonId": "html5-drop-prevent-default",
    "summary": "没有取消 dragover 的默认行为时，drop 不发生。"
  },
  {
    "id": "cv-miniprogram-wx-if-not-wxif",
    "courseId": "browser",
    "title": "小程序条件渲染是 wx:if，不是 wx-if，也没有…",
    "lessonId": "miniprogram-wx-if-not-wxif",
    "summary": "if，冒号是指令前缀，不是 wx-if；列表是 wx:for。"
  },
  {
    "id": "cv-browser-event-loop-frame",
    "courseId": "browser",
    "title": "一帧里：脚本、样式、布局、绘制",
    "lessonId": "browser-event-loop-frame",
    "summary": "用性能记录标出脚本、布局和绘制谁最长。脚本最长是长任务占住主线程，输入和绘制都要等。"
  },
  {
    "id": "cv-rendering",
    "courseId": "browser",
    "title": "JSX 到浏览器像素",
    "lessonId": "rendering",
    "summary": "不是。setState 返回只表示更新已排队，用户这时还没看见新像素。"
  },
  {
    "id": "cv-layout",
    "courseId": "browser",
    "title": "布局抖动与性能定位",
    "lessonId": "layout",
    "summary": "交错读写时，Performance 里脚本旁边会出现重复的 Layout，因为每次读几何值前都要把刚弄脏的布局算完。"
  },
  {
    "id": "cv-session-storage-tab-only",
    "courseId": "browser",
    "title": "sessionStorage 跟标签页走，不是跟用户账…",
    "lessonId": "session-storage-tab-only",
    "summary": "session 不跨标签；刷新常保留；关标签清空。local 同源共享且靠 storage 事件通知别人。"
  },
  {
    "id": "cv-indexeddb-when-needed",
    "courseId": "browser",
    "title": "IndexedDB 给结构化大数据，不是默认缓存层",
    "lessonId": "indexeddb-when-needed",
    "summary": "开关用 Web Storage。可查询离线大数据用 IndexedDB。"
  },
  {
    "id": "cv-bfcache-pageshow",
    "courseId": "browser",
    "title": "后退可能整页从往返缓存里拿出来，脚本不一定重跑",
    "lessonId": "bfcache-pageshow",
    "summary": "后退常从往返缓存恢复，不一定再跑 load。用 pageshow 看 persisted，别假定每次都重新挂载。"
  },
  {
    "id": "cv-service-worker-stale",
    "courseId": "browser",
    "title": "Service Worker 能先给旧缓存，更新代码不…",
    "lessonId": "service-worker-stale",
    "summary": "新脚本装好后可能还在 waiting，旧 Worker 仍在接管。"
  },
  {
    "id": "cv-sw-cache-strategy-pick",
    "courseId": "browser",
    "title": "Service Worker 缓存策略要按资源选，不是…",
    "lessonId": "sw-cache-strategy-pick",
    "summary": "带哈希静态：cache-first。订单 API：网络优先/只网络。"
  },
  {
    "id": "cv-cors-credentials-allowlist",
    "courseId": "browser",
    "title": "带 Cookie 的 CORS 不能回显任意 Orig…",
    "lessonId": "cors-credentials-allowlist",
    "summary": "带 Cookie 时不能把 Origin 无校验回写，也不能用 *。"
  },
  {
    "id": "cv-cors-preflight-max-age",
    "courseId": "browser",
    "title": "Access-Control-Max-Age 只缓存预…",
    "lessonId": "cors-preflight-max-age",
    "summary": "Max-Age 只缓存预检（OPTIONS）结论。实际响应仍要正确的 CORS 允许头。"
  },
  {
    "id": "cv-react-what-it-is",
    "courseId": "react",
    "title": "React 是渲染用户界面的 JavaScript 库",
    "lessonId": "react-what-it-is",
    "summary": "由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。"
  },
  {
    "id": "cv-react-dom-mount",
    "courseId": "react",
    "title": "react-dom 把组件放进已有的页面节点",
    "lessonId": "react-dom-mount",
    "summary": "从 react-dom/client 取出 createRoot，对这个节点建根，再调用 root.render，把组件画进节点内部。"
  },
  {
    "id": "cv-react-app-around-library",
    "courseId": "react",
    "title": "新的网站从框架开始，react 包负责界面",
    "lessonId": "react-app-around-library",
    "summary": "文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。"
  },
  {
    "id": "cv-react-function-component",
    "courseId": "react",
    "title": "函数组件返回要显示的元素",
    "lessonId": "react-function-component",
    "summary": "写成一个大写开头的函数，return 里放要显示的元素。"
  },
  {
    "id": "cv-react-props-argument",
    "courseId": "react",
    "title": "props 是调用组件时传入的参数",
    "lessonId": "react-props-argument",
    "summary": "调用时写成 cents={100}。函数的参数 props.cents 就是这个值。"
  },
  {
    "id": "cv-react-usestate-pair",
    "courseId": "react",
    "title": "useState 返回当前值和一个安排更新的函数",
    "lessonId": "react-usestate-pair",
    "summary": "用 useState(0) 取出当前值和更新函数。调用更新函数会安排组件再执行一次，这一次函数里的值不会当场变成新的。"
  },
  {
    "id": "cv-linked-list",
    "courseId": "react",
    "title": "链表、树与位运算",
    "lessonId": "linked-list",
    "summary": "Hook 按调用顺序挂在链表上。中间少调或多调一次，后面的 state 会对错节点。"
  },
  {
    "id": "cv-react-setstate-batch",
    "courseId": "react",
    "title": "setState 批处理：别再背 isBatching…",
    "lessonId": "react-setstate-batch",
    "summary": "默认批处理不限合成事件。基于旧 count 的两次自增会入同一队列，结果仍只加 1；要连加要用更新函数。"
  },
  {
    "id": "cv-controlled-input",
    "courseId": "react",
    "title": "受控输入与数据流",
    "lessonId": "controlled-input",
    "summary": "受控输入的画面只听 value。变更函数不写回 state，或晚到的详情覆盖表单状态，字都留不住。"
  },
  {
    "id": "cv-identity",
    "courseId": "react",
    "title": "key、身份与列表状态",
    "lessonId": "identity",
    "summary": "key 决定节点身份。用下标时，state 跟位置走；用业务 id 时，state 跟这项业务走。"
  },
  {
    "id": "cv-effects",
    "courseId": "react",
    "title": "Effect、清理与提交时序",
    "lessonId": "effects",
    "summary": "切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。"
  },
  {
    "id": "cv-react-effect-timing",
    "courseId": "react",
    "title": "useLayoutEffect 在绘制前，但不是无条件…",
    "lessonId": "react-effect-timing",
    "summary": "要在绘制前量布局、避免闪一帧时用 useLayoutEffect。"
  },
  {
    "id": "cv-react-context-stable",
    "courseId": "react",
    "title": "Context 已是稳定 API，不是实验功能（Rea…",
    "lessonId": "react-context-stable",
    "summary": "现行写法是 createContext、Provider 和 useContext。"
  },
  {
    "id": "cv-react-props-state-sync",
    "courseId": "react",
    "title": "props 变了不必先拷进 state 再 useEf…",
    "lessonId": "react-props-state-sync",
    "summary": "多数情况应在渲染期直接用 props，或用 key 换身份重置。"
  },
  {
    "id": "cv-react-gdsfp-copy",
    "courseId": "react",
    "title": "getDerivedStateFromProps 不是…",
    "lessonId": "react-gdsfp-copy",
    "summary": "派生时会把本地更新打回 props。请求也不该放进已标 UNSAFE 的接收 props 方法；渲染期用 props 或用 key 重置。"
  },
  {
    "id": "cv-react-hooks-over-hoc",
    "courseId": "react",
    "title": "复用状态逻辑：自定义 Hook 优先，HOC 不是 m…",
    "lessonId": "react-hooks-over-hoc",
    "summary": "复用状态的现行默认是 Hook。HOC 会多一层包装并展开 props；Hook 在组件里直接取返回值。"
  },
  {
    "id": "cv-react-event-root",
    "courseId": "react",
    "title": "React 事件委托在根上，stopPropagati…",
    "lessonId": "react-event-root",
    "summary": "委托在根容器，不在 document。停止冒泡仍用 stopPropagation；取消默认行为才用 preventDefault。"
  },
  {
    "id": "cv-react-fiber-interrupt",
    "courseId": "react",
    "title": "Fiber：可中断的渲染工作，不是操作系统协程",
    "lessonId": "react-fiber-interrupt",
    "summary": "Fiber 让渲染阶段可中断；提交阶段才改 DOM。它不是操作系统协程，也不负责 JIT 或修正 reflow。"
  },
  {
    "id": "cv-react-vdom-perf-bound",
    "courseId": "react",
    "title": "虚拟 DOM 保证的是下限，不是永远更快",
    "lessonId": "react-vdom-perf-bound",
    "summary": "虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。"
  },
  {
    "id": "cv-react-error-boundary",
    "courseId": "react",
    "title": "错误边界只管渲染，不管点击里的异步（React 16）",
    "lessonId": "react-error-boundary",
    "summary": "错误边界只接渲染期间的抛错。事件回调和 Promise 拒绝要在各自路径上处理。"
  },
  {
    "id": "cv-react-version-checklist",
    "courseId": "react",
    "title": "不要把 React 16 特性清单当成“最新版答卷”",
    "lessonId": "react-version-checklist",
    "summary": "useMutationEffect 等已不在现行清单。留下 createRoot、函数组件加 Hooks，以及 lazy、Suspense 与错误边界。"
  },
  {
    "id": "cv-react-createclass-gone",
    "courseId": "react",
    "title": "React.createClass 不是现行三种声明方…",
    "lessonId": "react-createclass-gone",
    "summary": "createClass 已移出核心包。今天默认是函数组件加 Hooks；类组件是仍支持的遗留写法。"
  },
  {
    "id": "cv-react-eco-chapter-aim",
    "courseId": "react",
    "title": "React 生态章回答地址、客户端状态和服务器状态各放哪",
    "lessonId": "react-eco-chapter-aim",
    "summary": "补路由、客户端状态和服务器状态。react 包只负责组件和把组件放进页面。"
  },
  {
    "id": "cv-react-router-element-api",
    "courseId": "react",
    "title": "现行 React Router：Routes + el…",
    "lessonId": "react-router-element-api",
    "summary": "现行默认是 Routes、element 和 Navigate。"
  },
  {
    "id": "cv-react-router-error-element",
    "courseId": "react",
    "title": "路由错误要画在这一层的 errorElement，不要…",
    "lessonId": "react-router-error-element",
    "summary": "loader 抛错若没有 errorElement，会整页失败。"
  },
  {
    "id": "cv-rr-mode-gates-data",
    "courseId": "react",
    "title": "loader 只在数据模式和框架模式里生效",
    "lessonId": "rr-mode-gates-data",
    "summary": "loader 只在 createBrowserRouter 这一档、于渲染前执行。"
  },
  {
    "id": "cv-rr-outlet-keeps-layout",
    "courseId": "react",
    "title": "子路由画进父级的 Outlet，布局不用复制",
    "lessonId": "rr-outlet-keeps-layout",
    "summary": "子路由画在父级的 Outlet 里，父级不卸载，侧栏状态才能留下。"
  },
  {
    "id": "cv-rr-redirect-before-render",
    "courseId": "react",
    "title": "未登录时在 loader 里抛出重定向（RR 6.4+）",
    "lessonId": "rr-redirect-before-render",
    "summary": "在 loader 里 redirect，组件不会先渲染。"
  },
  {
    "id": "cv-state-kind-picks-home",
    "courseId": "react",
    "title": "先分清这个值属于谁，再决定进哪个库",
    "lessonId": "state-kind-picks-home",
    "summary": "主题、弹层、服务端列表不是同一种状态。塞进同一个 store 后，备注更新可能打不到真正存放它的地方。"
  },
  {
    "id": "cv-state-reducer-context-screen",
    "courseId": "react",
    "title": "一屏里多处改同一份列表时，用 reducer 和 Co…",
    "lessonId": "state-reducer-context-screen",
    "summary": "单页任务列表用 reducer 加 Context 就够。"
  },
  {
    "id": "cv-vue-what-it-is",
    "courseId": "vue",
    "title": "Vue 是构建用户界面的 JavaScript 框架",
    "lessonId": "vue-what-it-is",
    "summary": "模板按当前的 JavaScript 状态描述要输出的 HTML。"
  },
  {
    "id": "cv-vue-create-app-mount",
    "courseId": "vue",
    "title": "createApp 把应用挂到已有的页面节点",
    "lessonId": "vue-create-app-mount",
    "summary": "createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。"
  },
  {
    "id": "cv-vue-app-around-core",
    "courseId": "vue",
    "title": "换地址和跨页状态用 Vue 旁边的库",
    "lessonId": "vue-app-around-core",
    "summary": "地址用 Vue Router，多个页面共用的状态用 Pinia。"
  },
  {
    "id": "cv-vue-sfc-template",
    "courseId": "vue",
    "title": "单文件组件用 template 写要显示的结构",
    "lessonId": "vue-sfc-template",
    "summary": "template 写结构和插值。script setup 里声明的名字可以直接写在模板里。"
  },
  {
    "id": "cv-vue-ref-value",
    "courseId": "vue",
    "title": "ref 把值放在 value 上，模板里会自动拆开",
    "lessonId": "vue-ref-value",
    "summary": "要用 ref 包住会变的值。脚本里读写 .value。"
  },
  {
    "id": "cv-vue-reactivity",
    "courseId": "vue",
    "title": "Vue ref、reactive 与代理身份",
    "lessonId": "vue-reactivity",
    "summary": "页面绑的是代理上的属性。改原始对象或解构出来的普通数字，都不会通知依赖。"
  },
  {
    "id": "cv-vue-defineproperty-proxy",
    "courseId": "vue",
    "title": "Proxy 取代 defineProperty，仍要拦…",
    "lessonId": "vue-defineproperty-proxy",
    "summary": "Proxy 只解决拦截面。响应式还要读写走代理、深层按需代理，以及真正的依赖订阅。"
  },
  {
    "id": "cv-vue-proxy-null-guard",
    "courseId": "vue",
    "title": "手写 Proxy 要先守住 null 与类型边界",
    "lessonId": "vue-proxy-null-guard",
    "summary": "null 的 typeof 是 object，但仍不能作为 Proxy 目标。"
  },
  {
    "id": "cv-vue-array-raw-proxy",
    "courseId": "vue",
    "title": "数组 push 改的是原数组还是代理",
    "lessonId": "vue-array-raw-proxy",
    "summary": "raw.push 走原生数组，不通知依赖。只有对代理的写入才会触发已经读过代理的 effect。"
  },
  {
    "id": "cv-vue-nexttick",
    "courseId": "vue",
    "title": "Vue 更新批次与 nextTick",
    "lessonId": "vue-nexttick",
    "summary": "状态更新后 DOM 在微任务里才刷。同步立刻量到的仍是旧内容；要等 nextTick。"
  },
  {
    "id": "cv-vue-props-one-way",
    "courseId": "vue",
    "title": "子组件改 prop，父组件不会跟着变",
    "lessonId": "vue-props-one-way",
    "summary": "props 由父传入，子组件直接赋值会警告且父数据不变。"
  },
  {
    "id": "cv-vue-list-key",
    "courseId": "vue",
    "title": "Vue 列表 key 与输入状态",
    "lessonId": "vue-list-key",
    "summary": "没有稳定 key 时，输入状态按位置复用。重排后字会留在原格子上，串到另一项。"
  },
  {
    "id": "cv-vue-composition-options",
    "courseId": "vue",
    "title": "组合式 API 与选项式 API：复杂组件怎么组织",
    "lessonId": "vue-composition-options",
    "summary": "Composition 便于按功能拆函数，不是淘汰 Options。"
  },
  {
    "id": "cv-vue-teleport-dom-not-logical",
    "courseId": "vue",
    "title": "Teleport 把片段搬到组件 DOM 之外，逻辑父…",
    "lessonId": "vue-teleport-dom-not-logical",
    "summary": "祖先若有 transform、perspective 或 filter，position: fixed 不再相对视口。"
  },
  {
    "id": "cv-vue-vnode-not-fragment",
    "courseId": "vue",
    "title": "Vue 的虚拟 DOM 不是 DocumentFrag…",
    "lessonId": "vue-vnode-not-fragment",
    "summary": "虚拟 DOM 是 JS 对象描述的 VNode；DocumentFragment 是真实 DOM 容器。"
  },
  {
    "id": "cv-vue-design-goals-proxy",
    "courseId": "vue",
    "title": "更小更快：落到编译提示与惰性深层代理",
    "lessonId": "vue-design-goals-proxy",
    "summary": "未访问的嵌套对象不会立刻变成代理。体积、更新和首屏要分开看，不能收成一句更快。"
  },
  {
    "id": "cv-vue-tree-shake-options",
    "courseId": "vue",
    "title": "Vue 体积：树摇依赖构建条件，不是框架名称",
    "lessonId": "vue-tree-shake-options",
    "summary": "树摇要 ESM、生产构建和无副作用标记。Options API 相关代码默认保留，除非显式关掉且工程里已无选项式组件。"
  },
  {
    "id": "cv-vue-tree-shake-faster",
    "courseId": "vue",
    "title": "树摇能变小，不能直接许诺执行更快",
    "lessonId": "vue-tree-shake-faster",
    "summary": "剪掉未使用代码主要减体积。更新是否变快要另测，不能和树摇写成同一个结论。"
  },
  {
    "id": "cv-vue-patch-hoist",
    "courseId": "vue",
    "title": "编译期补丁标记：更快有前提，不是框架保证",
    "lessonId": "vue-patch-hoist",
    "summary": "标记和缓存有条件：监听捕获局部变量时不能缓存。静态提升与补丁标记要分开看编译结果。"
  },
  {
    "id": "cv-vue-eco-chapter-aim",
    "courseId": "vue",
    "title": "Vue 生态章回答换地址、跨页状态和首屏数据各用谁",
    "lessonId": "vue-eco-chapter-aim",
    "summary": "去这一章。换地址用 Vue Router，跨页状态用 Pinia，首屏 HTML 里的数据常见于 Nuxt。"
  },
  {
    "id": "cv-fe-pick-decision-order",
    "courseId": "client",
    "title": "选型没有打分公式：先看仓库和团队，再看打开方式",
    "lessonId": "fe-pick-decision-order",
    "summary": "没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。"
  },
  {
    "id": "cv-fe-pick-by-surface",
    "courseId": "client",
    "title": "人从哪打开、源代码里要不要正文",
    "lessonId": "fe-pick-by-surface",
    "summary": "React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。"
  },
  {
    "id": "cv-fe-meta-framework-tradeoffs",
    "courseId": "client",
    "title": "查看网页源代码时，正文在不在 HTML 里",
    "lessonId": "fe-meta-framework-tradeoffs",
    "summary": "先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"
  },
  {
    "id": "cv-fe-framework-tradeoffs",
    "courseId": "client",
    "title": "四种界面库：官方自带什么，你还要自己装什么",
    "lessonId": "fe-framework-tradeoffs",
    "summary": "选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"
  },
  {
    "id": "cv-fe-ui-update-model",
    "courseId": "client",
    "title": "改一个数字时，四种框架各自要写哪一行",
    "lessonId": "fe-ui-update-model",
    "summary": "React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"
  },
  {
    "id": "cv-fe-ecosystem-slot-tradeoffs",
    "courseId": "client",
    "title": "路由、接口列表、登录态，各只留一个地方",
    "lessonId": "fe-ecosystem-slot-tradeoffs",
    "summary": "这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"
  },
  {
    "id": "cv-fe-react-framework-first",
    "courseId": "client",
    "title": "新的 React 应用从文档列出的框架起",
    "lessonId": "fe-react-framework-first",
    "summary": "React 文档把路由、取数和打包放在已经集成好的框架里。"
  },
  {
    "id": "cv-fe-vue-official-slots",
    "courseId": "client",
    "title": "Vue 新项目：Vite 构建，Vue Router …",
    "lessonId": "fe-vue-official-slots",
    "summary": "官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。"
  },
  {
    "id": "cv-fe-angular-first-party",
    "courseId": "client",
    "title": "Angular 的路由、HTTP 和表单用自己的包（v…",
    "lessonId": "fe-angular-first-party",
    "summary": "Angular 的路由、HTTP、表单都在 @angular 自己的包里。"
  },
  {
    "id": "cv-fe-sveltekit-runes",
    "courseId": "client",
    "title": "Svelte 应用用 SvelteKit，状态用 ru…",
    "lessonId": "fe-sveltekit-runes",
    "summary": "Svelte 页面要先由 Svelte 编译。Vue Router 出口里的 .svelte 没有走这条编译链。"
  },
  {
    "id": "cv-fe-ecosystem-follows-model",
    "courseId": "client",
    "title": "选定界面库之后，生态跟着这一套走",
    "lessonId": "fe-ecosystem-follows-model",
    "summary": "选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。"
  },
  {
    "id": "cv-fe-react-one-slot",
    "courseId": "client",
    "title": "React 里路由、接口列表、登录态各只留一个库",
    "lessonId": "fe-react-one-slot",
    "summary": "每个职责只留一个库。路由一格、服务端列表缓存一格、客户端会话一格。"
  },
  {
    "id": "cv-fe-vue-data-one-slot",
    "courseId": "client",
    "title": "Vue 的服务端列表不要再抄进 Pinia",
    "lessonId": "fe-vue-data-one-slot",
    "summary": "列表被写进了两处。useAsyncData 的结果进了首屏 payload，模板却绑着 Pinia 里另一份数组。"
  },
  {
    "id": "cv-fe-angular-resource-not-ngrx",
    "courseId": "client",
    "title": "Angular 的 GET 用 HttpClient …",
    "lessonId": "fe-angular-resource-not-ngrx",
    "summary": "列表走 HttpClient 或 httpResource 即可。"
  },
  {
    "id": "cv-fe-svelte-load-not-store",
    "courseId": "client",
    "title": "SvelteKit 的页面数据从 load 返回，不要…",
    "lessonId": "fe-svelte-load-not-store",
    "summary": "load 跑在服务端时，写入模块级 store 会留到下一次请求。"
  },
  {
    "id": "cv-fe-server-state-one-owner",
    "courseId": "client",
    "title": "同一份订单列表只放在一个地方",
    "lessonId": "fe-server-state-one-owner",
    "summary": "同一份列表被放进了两个地方。网络里新响应已经回来，模板绑的是没有跟着失效的那一份旧缓存。"
  },
  {
    "id": "cv-fe-cross-end-one-runtime",
    "courseId": "client",
    "title": "跨端先选定一个运行时",
    "lessonId": "fe-cross-end-one-runtime",
    "summary": "网页画到 DOM，小程序和 App 是另外的运行时。同一份带 document 或 div 的组件不能同时当这三端的唯一实现。"
  },
  {
    "id": "cv-fe-expo-router-one-nav",
    "courseId": "client",
    "title": "新的 Expo 应用用 Expo Router 做路由",
    "lessonId": "fe-expo-router-one-nav",
    "summary": "Expo 新模板默认用 Expo Router 做文件路由。"
  },
  {
    "id": "cv-fe-flutter-state-one-approach",
    "courseId": "client",
    "title": "Flutter 深链用 go_router，共享状态只…",
    "lessonId": "fe-flutter-state-one-approach",
    "summary": "跨页状态只留文档里的一种做法。深链用 go_router 的 context.go 按路径配栈；只靠命名路由再 push，同一次分享会在栈上再压一层。"
  },
  {
    "id": "cv-mfe-what-it-is",
    "courseId": "client",
    "title": "微前端是多个可独立发布的前端，在运行时或构建时拼成一个…",
    "lessonId": "mfe-what-it-is",
    "summary": "不算。微前端要能独立构建、独立发布，再拼成一个产品。"
  },
  {
    "id": "cv-mfe-when-to-split",
    "courseId": "client",
    "title": "先写清谁独立发版，再决定要不要拆应用",
    "lessonId": "mfe-when-to-split",
    "summary": "共用仓库、同一次发版时，微前端解决不了独立发版。先写清团队、节奏和失败可见性，写不出就这次不拆。"
  },
  {
    "id": "cv-mfe-not-for-everything",
    "courseId": "client",
    "title": "小团队同仓同发，不要为了时髦上微前端",
    "lessonId": "mfe-not-for-everything",
    "summary": "不是。行数本身不是拆应用的理由。"
  },
  {
    "id": "cv-mfe-composition-models",
    "courseId": "client",
    "title": "组合发生在构建时、运行时还是服务端，不是同一种集成",
    "lessonId": "mfe-composition-models",
    "summary": "不是。构建时组合在发版前锁定版本；运行时组合在浏览器里再加载；服务端或边缘组合在返回 HTML 时拼接。"
  },
  {
    "id": "cv-mfe-pick-by-constraint",
    "courseId": "client",
    "title": "已有的加载方式先留下，做不到的那一块才另加",
    "lessonId": "mfe-pick-by-constraint",
    "summary": "qiankun 只说明现有壳。菜单仍跟路径走就先留下；只有它做不到的那一块才另加 iframe 或 Federation。"
  },
  {
    "id": "cv-mfe-compare-matrix",
    "courseId": "client",
    "title": "对照表：按约束选组合方式，不要按星数",
    "lessonId": "mfe-compare-matrix",
    "summary": "不是。表只写每种方案的主缝和做不到的事。"
  },
  {
    "id": "cv-mfe-pick-one-path",
    "courseId": "client",
    "title": "选定一条路径后，写出这次不做的清单",
    "lessonId": "mfe-pick-one-path",
    "summary": "对照表填完还要写出不做项。两套壳同时在，等于主路径还没选完。"
  },
  {
    "id": "cv-mfe-vite-federation",
    "courseId": "client",
    "title": "Vite 或 Rspack 上的 Federation…",
    "lessonId": "mfe-vite-federation",
    "summary": "不是。换的是插件与构建入口，host 消费 remote、exposes、shared 的语义仍在。"
  },
  {
    "id": "cv-mfe-singlespa-register",
    "courseId": "client",
    "title": "single-spa：registerApplicat…",
    "lessonId": "mfe-singlespa-register",
    "summary": "不是。还要检查是否调用了 start，以及 app 加载函数是否返回带 bootstrap/mount/unmount 的应用。"
  },
  {
    "id": "cv-mfe-qiankun-html-entry",
    "courseId": "client",
    "title": "qiankun：HTML entry，路由登记与手动 …",
    "lessonId": "mfe-qiankun-html-entry",
    "summary": "单独能开只说明子应用自己的入口在。挂到壳上还要正确的 HTML entry、真正的 container 元素，以及 URL 激活或手动挂载二选一。"
  },
  {
    "id": "cv-mfe-wujie-startapp",
    "courseId": "client",
    "title": "无界：startApp 用 WebComponent …",
    "lessonId": "mfe-wujie-startapp",
    "summary": "不是。无界用 Web Component 做样式容器、用 iframe 跑子应用脚本，和 qiankun 的 HTML entry 沙箱不是同一套实现。"
  },
  {
    "id": "cv-mfe-iframe-postmessage",
    "courseId": "client",
    "title": "iframe：独立文档嵌入，契约走 postMessa…",
    "lessonId": "mfe-iframe-postmessage",
    "summary": "不可以。跨源读窗体会被浏览器拦住。"
  },
  {
    "id": "cv-mfe-module-federation",
    "courseId": "client",
    "title": "Module Federation：host 消费 r…",
    "lessonId": "mfe-module-federation",
    "summary": "不是。只有 exposes 声明并被 host 的 remotes 引用的模块才会在运行时加载。"
  },
  {
    "id": "cv-mfe-shared-deps",
    "courseId": "client",
    "title": "共享依赖要约定单例和版本，否则会加载两份 React",
    "lessonId": "mfe-shared-deps",
    "summary": "不是。未配置 shared，或双方版本进不了同一共享策略时，运行时可以同时存在多份 React，钩子与上下文会坏掉。"
  },
  {
    "id": "cv-mfe-runtime-lifecycle",
    "courseId": "client",
    "title": "子应用要有加载、挂载和卸载，离开后不能留下监听",
    "lessonId": "mfe-runtime-lifecycle",
    "summary": "不会。没有卸载钩子时，定时器、window 监听和残留 DOM 会留在壳里，表现为泄漏或串扰。"
  },
  {
    "id": "cv-mfe-style-isolation",
    "courseId": "client",
    "title": "样式隔离要靠边界，全局 CSS 会串到别人的按钮",
    "lessonId": "mfe-style-isolation",
    "summary": "不会。同一文档里未隔离的全局选择器会互相覆盖，后加载的往往赢。"
  },
  {
    "id": "cv-mfe-independent-deploy",
    "courseId": "client",
    "title": "独立发布要有可回滚的入口地址与兼容窗口",
    "lessonId": "mfe-independent-deploy",
    "summary": "覆盖同一个 remoteEntry.js 无法回滚。产物要带版本，壳要能捕获加载失败并降级。"
  },
  {
    "id": "cv-mfe-perf-cost",
    "courseId": "client",
    "title": "微前端的首屏成本要单独立账：重复框架与多次加载",
    "lessonId": "mfe-perf-cost",
    "summary": "不是。先核对是否加载了多份框架、是否串行拉多个 remoteEntry，再查业务组件。"
  },
  {
    "id": "cv-mfe-contract-version",
    "courseId": "client",
    "title": "跨应用契约要版本化：导出名称、路由前缀与共享依赖",
    "lessonId": "mfe-contract-version",
    "summary": "导出路径是契约的一部分。remote 改名而壳未跟上时，只有加载到新产物的用户会炸。"
  },
  {
    "id": "cv-rn-what-it-is",
    "courseId": "client",
    "title": "React Native 用 React 组件画出平台…",
    "lessonId": "rn-what-it-is",
    "summary": "落到平台自己的视图。React Native 用 React 组件描述界面，再画成 iOS、Android 上的原生视图。"
  },
  {
    "id": "cv-rn-enter-app",
    "courseId": "client",
    "title": "新的原生应用从 Expo 开始",
    "lessonId": "rn-enter-app",
    "summary": "用 Expo。它是建立在 React Native 上的框架，负责创建、运行和一部分原生能力。"
  },
  {
    "id": "cv-rn-not-webview-app",
    "courseId": "client",
    "title": "React Native 不是把网站装进 WebView",
    "lessonId": "rn-not-webview-app",
    "summary": "要原生控件、原生导航和平台能力时才用。只是打开一个网址，用 WebView 就够，不必整页都当 React Native。"
  },
  {
    "id": "cv-rn-view-not-div",
    "courseId": "client",
    "title": "View 只是让人想起 div，它不是浏览器里的元素",
    "lessonId": "rn-view-not-div",
    "summary": "容器换成 View，文字换成 Text，排列用这个 View 上的 Flexbox，样式用 StyleSheet 的数字对象。"
  },
  {
    "id": "cv-rn-text-not-under-view",
    "courseId": "client",
    "title": "文字必须包在 Text 里，字体也不会从 View 继…",
    "lessonId": "rn-text-not-under-view",
    "summary": "<View>请登录</View> 会抛异常。合法结构是 View 里面再放 Text。"
  },
  {
    "id": "cv-rn-flex-defaults",
    "courseId": "client",
    "title": "Flexbox 能用，但四项默认和网页不一样",
    "lessonId": "rn-flex-defaults",
    "summary": "View 默认就是 flex 容器，不需要 display:flex。"
  },
  {
    "id": "cv-rn-pressable-not-click",
    "courseId": "client",
    "title": "按压用 Pressable 的 onPress，不是 …",
    "lessonId": "rn-pressable-not-click",
    "summary": "日志应出现在 Pressable 的 onPress。按下在 onPressIn，抬起且仍在热区内才 onPress。"
  },
  {
    "id": "cv-rn-flatlist-window",
    "courseId": "client",
    "title": "长列表用 FlatList，它不会把每一行都挂上",
    "lessonId": "rn-flatlist-window",
    "summary": "长列表用 FlatList，传入 data 和 renderItem。"
  },
  {
    "id": "cv-rn-image-needs-size",
    "courseId": "client",
    "title": "网络图片必须自己写宽高，静态资源不是同一条路",
    "lessonId": "rn-image-needs-size",
    "summary": "不写宽高的网络图和 data 图没有你要的矩形，同一 uri 写上 width 和 height 后才能占住布局。"
  },
  {
    "id": "cv-rn-dimensions-not-cached",
    "courseId": "client",
    "title": "窗口尺寸会变，不要把第一次读到的宽高存死",
    "lessonId": "rn-dimensions-not-cached",
    "summary": "模块顶层存下的宽度在旋转后仍是旧值。每次渲染重新读 Dimensions.get(\"window\")，或直接用 useWindowDimensions。"
  },
  {
    "id": "cv-rn-platform-extension",
    "courseId": "client",
    "title": "整份实现不同就拆文件，一个数值不同才用 Platfor…",
    "lessonId": "rn-platform-extension",
    "summary": "整份实现不同的，拆成 .ios.js 和 .android.js，导入路径不写后缀，由 Metro 按当前平台选择。"
  },
  {
    "id": "cv-rn-hermes-default",
    "courseId": "client",
    "title": "默认引擎是 Hermes，不是手机浏览器里的那一个（R…",
    "lessonId": "rn-hermes-default",
    "summary": "默认引擎是 Hermes，文档写明不必再配置才能启用。换成 JavaScriptCore 是退出 Hermes，不是默认路径。"
  },
  {
    "id": "cv-rn-jsi-not-json-bridge",
    "courseId": "client",
    "title": "0.76 起默认走 JSI，调用不必再做桥上的序列化",
    "lessonId": "rn-jsi-not-json-bridge",
    "summary": "0.76 起新架构默认开启。JSI 让 JavaScript 持有 C++ 对象引用并直接调用，不必再按旧桥把这次调用序列化成消息。"
  },
  {
    "id": "cv-rn-navigate-not-push",
    "courseId": "client",
    "title": "navigate 到当前这条路由不会再压一层，push…",
    "lessonId": "rn-navigate-not-push",
    "summary": "已经在 Details 上时，navigate(\"Details\") 不会再压一层，也不会用新 params 换掉当前屏。"
  },
  {
    "id": "cv-rn-fetch-not-document",
    "courseId": "client",
    "title": "环境补上了 fetch，没有因此补上 document",
    "lessonId": "rn-fetch-not-document",
    "summary": "fetch 和 XMLHttpRequest 在补齐列表里，可以用来发请求。"
  },
  {
    "id": "cv-flutter-what-it-is",
    "courseId": "client",
    "title": "Flutter 用一份 Dart 代码在多平台上自绘界面",
    "lessonId": "flutter-what-it-is",
    "summary": "引擎自己画出来的。Flutter 用 Dart 写出 Widget，由引擎画到一块自绘表面上。"
  },
  {
    "id": "cv-flutter-enter-app",
    "courseId": "client",
    "title": "flutter create 做出可以跑起来的工程",
    "lessonId": "flutter-enter-app",
    "summary": "用 flutter create。它生成 Dart 工程和各平台目录。"
  },
  {
    "id": "cv-flutter-not-html",
    "courseId": "client",
    "title": "Flutter 没有文档树，也不是 React Nat…",
    "lessonId": "flutter-not-html",
    "summary": "不能。build 返回的是 Widget。"
  },
  {
    "id": "cv-flutter-widget-not-html",
    "courseId": "client",
    "title": "Flutter 的界面是 Widget，不是 HTML…",
    "lessonId": "flutter-widget-not-html",
    "summary": "外层用 Column 或 Container，文字用 Text。"
  },
  {
    "id": "cv-flutter-impeller-own-pixels",
    "courseId": "client",
    "title": "Flutter 自己画像素，iOS 上只用 Impel…",
    "lessonId": "flutter-impeller-own-pixels",
    "summary": "界面是引擎画在自己表面上的像素，不是 OEM 控件，也不是 WebView。"
  },
  {
    "id": "cv-flutter-constraints-down",
    "courseId": "client",
    "title": "约束向下传，尺寸向上报，位置由父级决定",
    "lessonId": "flutter-constraints-down",
    "summary": "Column 给普通孩子的竖直最大高度是无穷。ListView 因此抛出 Vertical viewport was given unbounded height。"
  },
  {
    "id": "cv-flutter-setstate-rebuilds",
    "courseId": "client",
    "title": "setState 安排的是这棵子树再 build 一次",
    "lessonId": "flutter-setstate-rebuilds",
    "summary": "setState 的回调同步改字段，同时把这个 State 标脏，build 发生在随后的帧，paint 更在 build 之后。"
  },
  {
    "id": "cv-flutter-gorouter-not-named",
    "courseId": "client",
    "title": "多数应用用 go_router，不要只靠命名路由",
    "lessonId": "flutter-gorouter-not-named",
    "summary": "命名路由收到深链会再 push 一页，并且没有浏览器前进。"
  },
  {
    "id": "cv-cross-four-who-paints",
    "courseId": "client",
    "title": "四套跨端里，像素是谁画的并不相同",
    "lessonId": "cross-four-who-paints",
    "summary": "React Native 是 JavaScript 加平台视图，setState 之后还要渲染、提交、挂载。"
  },
  {
    "id": "cv-cross-four-where-it-fits",
    "courseId": "client",
    "title": "先看宿主：小程序、自绘 App，还是系统视图",
    "lessonId": "cross-four-where-it-fits",
    "summary": "小程序打不开先看 pages.json 或 app.config。"
  },
  {
    "id": "cv-uniapp-what-it-is",
    "courseId": "client",
    "title": "uni-app 用 Vue 写出一套代码，再编译到各端",
    "lessonId": "uniapp-what-it-is",
    "summary": "常用 Vue 的 .vue 页面。不是同一套运行时：编译器按目标端出小程序、H5 或 App 的产物。"
  },
  {
    "id": "cv-taro-what-it-is",
    "courseId": "client",
    "title": "Taro 用 React 写出一套代码，再编译到各端",
    "lessonId": "taro-what-it-is",
    "summary": "不直接跑 React DOM。Taro 把 React 树桥到小程序的 setData 和模板上。"
  },
  {
    "id": "cv-uniapp-taro-not-same-runtime",
    "courseId": "client",
    "title": "uni-app 和 Taro 都是编译层，不是同一种运…",
    "lessonId": "uniapp-taro-not-same-runtime",
    "summary": "不是。源码习惯、页面配置和桥到原生或小程序的方式都不同。"
  },
  {
    "id": "cv-uniapp-x-uts-not-vue-page",
    "courseId": "client",
    "title": "uni-app x 用 uts 和 uvue，旧的 v…",
    "lessonId": "uniapp-x-uts-not-vue-page",
    "summary": "uni-app 继续用 Vue 3 的 .vue。uni-app x 只认 .uvue 和 uts：Android 产物是 Kotlin，iOS 是 Swift，鸿蒙 Next 是 ArkTS，Web 和小程序才是 JavaScript。"
  },
  {
    "id": "cv-uniapp-pages-json-entry",
    "courseId": "client",
    "title": "uni-app 的页面登记在 pages.json，第…",
    "lessonId": "uniapp-pages-json-entry",
    "summary": "冷启动进 pages 第一项。navigateTo 的 url 必须是已登记路径，形如 /pages/order/order?id=42，query 的值是字符串。"
  },
  {
    "id": "cv-uniapp-onload-vs-onshow",
    "courseId": "client",
    "title": "onLoad 只在加载时收参，返回页面走的是 onSh…",
    "lessonId": "uniapp-onload-vs-onshow",
    "summary": "返回后列表 onLoad 和 onMounted 仍是 1，onShow 加 1，刷新请求应放在 onShow。"
  },
  {
    "id": "cv-uniapp-ifdef-stripped",
    "courseId": "client",
    "title": "#ifdef 在编译期裁掉，不是运行时的 if",
    "lessonId": "uniapp-ifdef-stripped",
    "summary": "编译期宏做完之后，微信产物只有 MP-WEIXIN 那段，H5 产物只有 WEB 那段，另一段连标识符都没有。"
  },
  {
    "id": "cv-taro-react-setdata-bridge",
    "courseId": "client",
    "title": "Taro 跑的是真 React，小程序界面仍靠 set…",
    "lessonId": "taro-react-setdata-bridge",
    "summary": "setState 先改逻辑层的模拟 DOM。界面要等序列化结果 setData 到视图层，静态模板才画出新节点。"
  },
  {
    "id": "cv-taro-pages-in-app-config",
    "courseId": "client",
    "title": "Taro 的页面在 app.config 的 page…",
    "lessonId": "taro-pages-in-app-config",
    "summary": "没写进 pages 的组件不是页面，第一项才是冷启动首页。"
  },
  {
    "id": "cv-taro-4-compiler-choice",
    "courseId": "client",
    "title": "Taro 4 可选 webpack5 或 Vite，小…",
    "lessonId": "taro-4-compiler-choice",
    "summary": "Taro 4 的 framework 决定 React 还是 Vue 3，compiler 决定 webpack5 还是 Vite。"
  },
  {
    "id": "cv-taro-and-uniapp-layers",
    "courseId": "client",
    "title": "uni-app 改的是 Vue 数据，Taro 改的是…",
    "lessonId": "taro-and-uniapp-layers",
    "summary": "打不开先看 pages.json 或 app.config，url 必须已经登记。"
  },
  {
    "id": "cv-node-what-it-is",
    "courseId": "client",
    "title": "Node.js 是在浏览器外执行 JavaScript…",
    "lessonId": "node-what-it-is",
    "summary": "在 Node.js 里跑。它是浏览器外的 JavaScript 运行时，建立在 V8 上，用来写服务和工具。"
  },
  {
    "id": "cv-node-run-process",
    "courseId": "client",
    "title": "node 命令启动一个进程，入口是一份脚本",
    "lessonId": "node-run-process",
    "summary": "写 node 加上文件路径。这会启动一个进程，从这份入口脚本开始执行。"
  },
  {
    "id": "cv-node-not-browser",
    "courseId": "client",
    "title": "Node.js 提供进程和文件，不提供页面文档",
    "lessonId": "node-not-browser",
    "summary": "不是。Node.js 没有 document。"
  },
  {
    "id": "cv-node-http-cookie",
    "courseId": "client",
    "title": "Node 自己返回会话时，也要会写 Cookie 和读…",
    "lessonId": "node-http-cookie",
    "summary": "登录成功后，响应应设置 HttpOnly 的会话 Cookie，而不是在 JSON 里给一段让脚本保存的令牌。"
  },
  {
    "id": "cv-node-http-close",
    "courseId": "client",
    "title": "停进程要先 server.close，等已有请求结束，…",
    "lessonId": "node-http-close",
    "summary": "SIGTERM 后应先 server.close 拒新连接并排空在途。"
  },
  {
    "id": "cv-node-nexttick",
    "courseId": "client",
    "title": "Node 的 nextTick 与微任务",
    "lessonId": "node-nexttick",
    "summary": "先标出同步打印，它一定在两个队列之前。再分别看 nextTick 队列和 Promise 微任务队列，不要把它们合成浏览器那一张图。"
  },
  {
    "id": "cv-java-what-it-is",
    "courseId": "java",
    "title": "Java 是一门语言，也是一套能跑字节码的平台",
    "lessonId": "java-what-it-is",
    "summary": "先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。"
  },
  {
    "id": "cv-java-enter-main",
    "courseId": "java",
    "title": "java 命令从 main 启动一个进程",
    "lessonId": "java-enter-main",
    "summary": "先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。"
  },
  {
    "id": "cv-java-not-javascript",
    "courseId": "java",
    "title": "Java 不是 JavaScript，旁边是 JVM …",
    "lessonId": "java-not-javascript",
    "summary": "不是。Java 编译成字节码，在 JVM 里跑。"
  },
  {
    "id": "cv-java-eight-primitives",
    "courseId": "java",
    "title": "八种基本类型存的是值，整数相除会丢掉小数",
    "lessonId": "java-eight-primitives",
    "summary": "基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"
  },
  {
    "id": "cv-java-reference-and-null",
    "courseId": "java",
    "title": "引用类型存的是指向对象的引用，null 表示没有指向",
    "lessonId": "java-reference-and-null",
    "summary": "s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。"
  },
  {
    "id": "cv-java-field-default-var",
    "courseId": "java",
    "title": "字段有默认值，局部变量没有；var 是推断出来的类型",
    "lessonId": "java-field-default-var",
    "summary": "字段和数组元素有默认值。局部变量必须先赋值。"
  },
  {
    "id": "cv-java-widening-cast",
    "courseId": "java",
    "title": "加宽可以自动转换，变窄必须写强制转换",
    "lessonId": "java-widening-cast",
    "summary": "加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。"
  },
  {
    "id": "cv-java-wrapper-type",
    "courseId": "java",
    "title": "包装类把基本类型包成对象",
    "lessonId": "java-wrapper-type",
    "summary": "List 和泛型要的是对象。Integer 是 int 的包装类。"
  },
  {
    "id": "cv-java-array-length",
    "courseId": "java",
    "title": "数组的长度在创建时定下，下标从 0 开始",
    "lessonId": "java-array-length",
    "summary": "长度在 new 的时候定下，放在 length 里。合法下标是 0 到 length - 1。"
  },
  {
    "id": "cv-java-string-type",
    "courseId": "java",
    "title": "String 是类，字面量的类型就是 String",
    "lessonId": "java-string-type",
    "summary": "String 是类，变量里是指向字符串对象的引用。字面量 \"CNY\" 的类型就是 String。"
  },
  {
    "id": "cv-java-list-set-map",
    "courseId": "java",
    "title": "List 按位置放元素，Set 不放重复，Map 用键…",
    "lessonId": "java-list-set-map",
    "summary": "要顺序、也允许重复，用 List。只要每个元素出现一次，用 Set。"
  },
  {
    "id": "cv-java-operator-result",
    "courseId": "java",
    "title": "算术得到数，比较和逻辑得到 boolean",
    "lessonId": "java-operator-result",
    "summary": "== 比较是否相等，结果是 boolean。算术运算的结果才是数。"
  },
  {
    "id": "cv-java-if-else",
    "courseId": "java",
    "title": "if 的条件必须是 boolean，else 配最近的…",
    "lessonId": "java-if-else",
    "summary": "if 的条件必须是 boolean。n = 0 是赋值，n 是 int，结果也是 int。"
  },
  {
    "id": "cv-java-switch-colon",
    "courseId": "java",
    "title": "冒号 switch 匹配之后继续往下执行，直到 bre…",
    "lessonId": "java-switch-colon",
    "summary": "冒号形式匹配之后会继续执行后面的语句，这叫落入。这一支要停住，就写 break。"
  },
  {
    "id": "cv-java-loop-break",
    "courseId": "java",
    "title": "循环重复一块代码，break 离开，continue …",
    "lessonId": "java-loop-break",
    "summary": "continue 跳过这一轮剩下的语句，然后进入下一轮。"
  },
  {
    "id": "cv-java-method-overload",
    "courseId": "java",
    "title": "方法由名字和参数类型一起区分，返回类型不算",
    "lessonId": "java-method-overload",
    "summary": "参数个数或类型不同，就是重载，可以共存。参数一样、只改返回类型，签名相同，不能共存。"
  },
  {
    "id": "cv-java-class-new-this",
    "courseId": "java",
    "title": "class 声明类型，new 调用构造器，this 是…",
    "lessonId": "java-class-new-this",
    "summary": "new 创建对象，并调用参数匹配的构造器。构造器里的 this 就是正在创建的这个对象。"
  },
  {
    "id": "cv-java-static-member",
    "courseId": "java",
    "title": "static 属于类，实例成员属于对象",
    "lessonId": "java-static-member",
    "summary": "启动时还没有你创建的对象。static 方法属于类，启动器可以直接调用。"
  },
  {
    "id": "cv-java-package-access",
    "courseId": "java",
    "title": "类放在包里，访问权限分四档",
    "lessonId": "java-package-access",
    "summary": "不写修饰符就是包访问，只有同一个包能用。另外三档是 public、protected 和 private。"
  },
  {
    "id": "cv-java-extends-override",
    "courseId": "java",
    "title": "extends 得到父类的实例方法，同签名才是覆盖",
    "lessonId": "java-extends-override",
    "summary": "实例方法签名相同才是覆盖，调用看对象的实际类型。参数不同是重载。"
  },
  {
    "id": "cv-java-interface-implements",
    "courseId": "java",
    "title": "interface 规定方法，implements 由…",
    "lessonId": "java-interface-implements",
    "summary": "一个类只能 extends 一个父类。interface 规定调用方能用哪些方法，一个类可以实现多个接口。"
  },
  {
    "id": "cv-java-try-catch-throws",
    "courseId": "java",
    "title": "throw 现在抛出异常，throws 声明可能交给调…",
    "lessonId": "java-try-catch-throws",
    "summary": "throw 是现在抛出一个异常对象。throws 写在方法上，表示这个方法可能把异常交给调用方。"
  },
  {
    "id": "cv-java-generic-diamond",
    "courseId": "java",
    "title": "尖括号写上类型参数，右边的 <> 沿用左边",
    "lessonId": "java-generic-diamond",
    "summary": "左边已经写了 String。右边的空尖括号叫 diamond，编译器沿用左边的类型参数。"
  },
  {
    "id": "cv-java-enum-constants",
    "courseId": "java",
    "title": "enum 把固定的几个值声明成类型自己的常量",
    "lessonId": "java-enum-constants",
    "summary": "enum 把允许的值写成这个类型自己的常量。别的整数不能赋给它。"
  },
  {
    "id": "cv-java-main-launcher",
    "courseId": "java",
    "title": "启动入口是 public static void ma…",
    "lessonId": "java-main-launcher",
    "summary": "启动契约要的是标准签名的 main。静态块会跑，但不是入口；别的签名的 main 只是重载。"
  },
  {
    "id": "cv-java-pass-by-value",
    "courseId": "java",
    "title": "Java 只有值传递，对象看起来被改是因为复制了引用",
    "lessonId": "java-pass-by-value",
    "summary": "参数一律按值传递。引用类型复制的是引用，所以能改对象字段，改不了调用方手里的那个变量绑定。"
  },
  {
    "id": "cv-java-autoboxing-cache",
    "courseId": "java",
    "title": "装箱拆箱与整数缓存",
    "lessonId": "java-autoboxing-cache",
    "summary": "常见缓存只到 127。同值在缓存里 == 可能碰上同一实例；出了缓存区间，== 比的是两个不同对象。"
  },
  {
    "id": "cv-java-string-immutability",
    "courseId": "java",
    "title": "String 不可变，拼接在循环里要换思路",
    "lessonId": "java-string-immutability",
    "summary": "每次 + 都在造新串并复制旧字符。循环里积累文本要用可变缓冲，短的固定拼接可以继续用加号。"
  },
  {
    "id": "cv-java-string-new-vs-pool",
    "courseId": "java",
    "title": "new String(\"xyz\") 不一定正好两个对象",
    "lessonId": "java-string-new-vs-pool",
    "summary": "字面量进池；new 再多一个堆上的 String。池里已有该字面量时，新增的是那一个实例，不是固定两个。"
  },
  {
    "id": "cv-java-generics",
    "courseId": "java",
    "title": "泛型、类型擦除与运行时",
    "lessonId": "java-generics",
    "summary": "擦除之后运行时看不见元素类型，instanceof 区分不了。"
  },
  {
    "id": "cv-java-record-accessor",
    "courseId": "java",
    "title": "record 按括号里的名字生成 equals，不适合…",
    "lessonId": "java-record-accessor",
    "summary": "record 按圆括号里列出的名字比较相等。这些名字在 JEP 395 里叫 component。"
  },
  {
    "id": "cv-java-polymorphism-not-only-extends",
    "courseId": "java",
    "title": "多态不必先继承一个类，实现接口也算",
    "lessonId": "java-polymorphism-not-only-extends",
    "summary": "接口实现也是多态。不必先 extends 一个类；重载不是运行时多态。"
  },
  {
    "id": "cv-java-protected-other-pkg-subclass",
    "courseId": "java",
    "title": "protected 对别的包里的子类可见，不是“出了包…",
    "lessonId": "java-protected-other-pkg-subclass",
    "summary": "protected 对本包可见，也允许其他包的子类访问继承成员。"
  },
  {
    "id": "cv-java-anonymous-extends-or-implements",
    "courseId": "java",
    "title": "匿名类要么继承一个类，要么实现一个接口",
    "lessonId": "java-anonymous-extends-or-implements",
    "summary": "匿名类可以 new 父类(){}，就是在继承。只是没有名字，不能再写 extends/implements 关键字。"
  },
  {
    "id": "cv-java-default-class-wins-conflict",
    "courseId": "java",
    "title": "默认方法不是 C++ 那种类多继承，冲突时类方法优先（…",
    "lessonId": "java-default-class-wins-conflict",
    "summary": "仍是单继承类。两个接口同名默认方法要自己覆盖；类里的方法压过接口默认方法。"
  },
  {
    "id": "cv-java-ctor-implicit-super-noarg",
    "courseId": "java",
    "title": "构造器里隐式 super() 只调父类无参，不是“总会…",
    "lessonId": "java-ctor-implicit-super-noarg",
    "summary": "编译器默认只插无参 super()。父类没有无参时必须显式 super(实参)，不是永远会调到某个父构造。"
  },
  {
    "id": "cv-java-unchecked-not-must-catch",
    "courseId": "java",
    "title": "RuntimeException 不必写进 catch…",
    "lessonId": "java-unchecked-not-must-catch",
    "summary": "RuntimeException 是未检查异常，编译器不强制 catch。"
  },
  {
    "id": "cv-java-runtime-ex-not-auto-caught",
    "courseId": "java",
    "title": "RuntimeException 会抛，JVM 不会替…",
    "lessonId": "java-runtime-ex-not-auto-caught",
    "summary": "没有 catch 时异常沿栈往上走，线程按未捕获处理器结束。"
  },
  {
    "id": "cv-java-finalize-not-guaranteed",
    "courseId": "java",
    "title": "finalize 不保证会跑，资源用 try-with…",
    "lessonId": "java-finalize-not-guaranteed",
    "summary": "finalize 不保证会跑。释放资源用 try-with-resources（AutoCloseable），不要靠终结方法。"
  },
  {
    "id": "cv-java-clone-exception-checked",
    "courseId": "java",
    "title": "CloneNotSupportedException …",
    "lessonId": "java-clone-exception-checked",
    "summary": "Cloneable 没有公开方法；Object.clone 是 protected。"
  },
  {
    "id": "cv-java-collections",
    "courseId": "java",
    "title": "HashMap 与集合选择",
    "lessonId": "java-collections",
    "summary": "键参与哈希的字段放入后不能改。只重写 equals 不重写 hashCode，相等对象可能落进不同桶，get 会空。"
  },
  {
    "id": "cv-java-arraylist-linkedlist",
    "courseId": "java",
    "title": "ArrayList 随机访问快，LinkedList …",
    "lessonId": "java-arraylist-linkedlist",
    "summary": "不是。中间插入很多元素，也不一定用 LinkedList。"
  },
  {
    "id": "cv-java-stack-prefer-deque",
    "courseId": "java",
    "title": "栈和队列请用 Deque，不要新写 java.util…",
    "lessonId": "java-stack-prefer-deque",
    "summary": "栈结构用 Deque/ArrayDeque。Stack 是遗留的 Vector 子类，不是新代码默认。"
  },
  {
    "id": "cv-java-set-not-always-sorted",
    "courseId": "java",
    "title": "Set 不必有序，Map 也不必无序",
    "lessonId": "java-set-not-always-sorted",
    "summary": "Hash 系列不保证顺序。要插入序用 Linked，要排序用 Tree；不是 Set 都排序、Map 都无序。"
  },
  {
    "id": "cv-java-collection-vs-collections",
    "courseId": "java",
    "title": "Collection 是接口，Collections …",
    "lessonId": "java-collection-vs-collections",
    "summary": "Collection 是接口；Collections 和 Arrays 是静态工具类。"
  },
  {
    "id": "cv-java-arrays-aslist-fixed",
    "courseId": "java",
    "title": "Arrays.asList 返回固定大小的列表，不是 …",
    "lessonId": "java-arrays-aslist-fixed",
    "summary": "asList 是固定大小视图：set 会改底层数组，add/remove 会失败。"
  },
  {
    "id": "cv-java-foreach-remove-cme",
    "courseId": "java",
    "title": "增强 for 里不能直接 list.remove，要用…",
    "lessonId": "java-foreach-remove-cme",
    "summary": "增强 for 底层仍在 next，循环里直接 list.remove 会坏结构。"
  },
  {
    "id": "cv-hashmap-initial-16-not-max",
    "courseId": "java",
    "title": "HashMap 默认容量 16，不是最大只能 16",
    "lessonId": "hashmap-initial-16-not-max",
    "summary": "16 只是默认初始容量。上限远更大，装载因子触发扩容后还可以继续翻倍。"
  },
  {
    "id": "cv-hashmap-treeify-need-capacity",
    "courseId": "java",
    "title": "链表变红黑树不只看长度 8，还要桶数组够大",
    "lessonId": "hashmap-treeify-need-capacity",
    "summary": "链表够长还不够，表容量也要达到树化门槛。容量不够时先扩容，不是大于 8 立刻变树。"
  },
  {
    "id": "cv-chm-jdk8-not-segment-lock",
    "courseId": "java",
    "title": "JDK 8 起 ConcurrentHashMap 不…",
    "lessonId": "chm-jdk8-not-segment-lock",
    "summary": "JDK 8 起是 CAS 加桶级同步，不是再背 Segment 分段锁。"
  },
  {
    "id": "cv-chm-iterator-weakly-consistent",
    "courseId": "java",
    "title": "ConcurrentHashMap 的迭代器不是整表拷…",
    "lessonId": "chm-iterator-weakly-consistent",
    "summary": "ConcurrentHashMap 迭代不抛 CME，也不保证冻结快照。"
  },
  {
    "id": "cv-java-vector-cme-not-because-sync",
    "courseId": "java",
    "title": "Vector 方法同步，并不能解释迭代器的 Concu…",
    "lessonId": "java-vector-cme-not-because-sync",
    "summary": "fail-fast 看的是结构修改计数，不是“类声明了 synchronized”。"
  },
  {
    "id": "cv-java-enumeration-not-faster",
    "courseId": "java",
    "title": "Enumeration 并不比 Iterator 快一倍",
    "lessonId": "java-enumeration-not-faster",
    "summary": "没有官方“快一倍”说法。遍历用 Iterator；Enumeration 是遗留 API。"
  },
  {
    "id": "cv-java-stringbuilder-not-buffer",
    "courseId": "java",
    "title": "同一线程拼字符串用 StringBuilder，不要默…",
    "lessonId": "java-stringbuilder-not-buffer",
    "summary": "局部拼接用 StringBuilder。跨线程不要拿可变缓冲当协议；StringBuffer 的锁只罩单次调用。"
  },
  {
    "id": "cv-java-string-strip-not-trim",
    "courseId": "java",
    "title": "trim 清的不是全部空白，getBytes 必须写字…",
    "lessonId": "java-string-strip-not-trim",
    "summary": "trim 去不掉部分 Unicode 空白；strip 按 Unicode 空白。"
  },
  {
    "id": "cv-java-pattern-dot-not-nl",
    "courseId": "java",
    "title": "Java 正则的点默认不吃换行",
    "lessonId": "java-pattern-dot-not-nl",
    "summary": "点默认不含换行。要跨行匹配用 DOTALL；MULTILINE 只改 ^ 和 $ 的行首行尾语义。"
  },
  {
    "id": "cv-java-calendar-not-singleton",
    "courseId": "java",
    "title": "Calendar.getInstance 每次新建，不…",
    "lessonId": "java-calendar-not-singleton",
    "summary": "Calendar.getInstance 每次新建可变实例。"
  },
  {
    "id": "cv-java-dcl-volatile-enum",
    "courseId": "java",
    "title": "双重检查单例要 volatile，枚举更不容易写错（J…",
    "lessonId": "java-dcl-volatile-enum",
    "summary": "无 volatile 时引用可能先可见、构造未完成。枚举常量由类初始化安全发布，不必自己再套双重检查。"
  },
  {
    "id": "cv-java-long-atomic-on-64bit",
    "courseId": "java",
    "title": "64 位 Java 里 long 赋值是原子的，不要一…",
    "lessonId": "java-long-atomic-on-64bit",
    "summary": "规范允许把非 volatile 的 long 拆成两次写，但 64 位 HotSpot 单次写是原子的。"
  },
  {
    "id": "cv-jdk-feature-release-six-months",
    "courseId": "java",
    "title": "现行 JDK 功能版大约半年一发，不是三年对三月",
    "lessonId": "jdk-feature-release-six-months",
    "summary": "功能版大约半年一发，LTS 隔几年一个。不是 Oracle 三年、OpenJDK 三月那套对照。"
  },
  {
    "id": "cv-algo-hash-lookup",
    "courseId": "pattern",
    "title": "要反复查找时，先用哈希表记住见过的值",
    "lessonId": "algo-hash-lookup",
    "summary": "两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。"
  },
  {
    "id": "cv-java-binary-search",
    "courseId": "pattern",
    "title": "二分查找的不变量与边界",
    "lessonId": "java-binary-search",
    "summary": "找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。"
  },
  {
    "id": "cv-algo-stable-sort",
    "courseId": "pattern",
    "title": "对象排序稳定，基本类型排序不稳定，相等元素会不会换位要…",
    "lessonId": "algo-stable-sort",
    "summary": "稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"
  },
  {
    "id": "cv-hash-open-addressing-probe",
    "courseId": "pattern",
    "title": "开放定址不是“冲突了就放右边那个空位”",
    "lessonId": "hash-open-addressing-probe",
    "summary": "开放定址有线性、二次、双重散列，不是只有“下一个空位”。"
  },
  {
    "id": "cv-quicksort-average-nlogn",
    "courseId": "pattern",
    "title": "快排平均是 n log n，最坏仍是平方，不是线性",
    "lessonId": "quicksort-average-nlogn",
    "summary": "快排平均是 O(n log n)，最坏可到 O(n²)，不是线性。"
  },
  {
    "id": "cv-algo-two-pointers",
    "courseId": "pattern",
    "title": "有序数组用左右指针往中间收",
    "lessonId": "algo-two-pointers",
    "summary": "有序数组上两端往中间走即可。打乱顺序后同一步会漏解；要原下标用哈希，不要先排序打乱。"
  },
  {
    "id": "cv-bfs",
    "courseId": "pattern",
    "title": "BFS、队列与最短步数",
    "lessonId": "bfs",
    "summary": "无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。"
  },
  {
    "id": "cv-algo-sliding-window",
    "courseId": "pattern",
    "title": "连续一段的最值或计数，用窗口两端移动，不要每次重扫",
    "lessonId": "algo-sliding-window",
    "summary": "固定窗口靠加减进出元素更新，不要每个位置从头加一遍。"
  },
  {
    "id": "cv-pattern-gof-catalog",
    "courseId": "pattern",
    "title": "先把二十三种名字列全，再打开后面章节",
    "lessonId": "pattern-gof-catalog",
    "summary": "先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。"
  },
  {
    "id": "cv-pattern-family-test",
    "courseId": "pattern",
    "title": "先问这一次变的是创建、连接，还是请求怎么走",
    "lessonId": "pattern-family-test",
    "summary": "工厂解决怎么造，策略解决怎么算，装饰器解决怎么套能力。分不清就先别两个类都建上。"
  },
  {
    "id": "cv-pattern-gof-rest",
    "courseId": "pattern",
    "title": "名单上还有七个：先写清允许变的那一块，再决定要不要单独…",
    "lessonId": "pattern-gof-rest",
    "summary": "策略和单例之外仍有撤销、遍历、命令等场景。指不出那一块变化时，不要用“用不到”跳过。"
  },
  {
    "id": "cv-pattern-one-variation",
    "courseId": "pattern",
    "title": "先指出哪一块允许变，再决定叫什么模式",
    "lessonId": "pattern-one-variation",
    "summary": "类名带 Factory 不够。调用方还要改一长串 if，工厂就没成立；变化应进可替换对象。"
  },
  {
    "id": "cv-pattern-factory-method",
    "courseId": "pattern",
    "title": "工厂方法换的是创建哪一个产品",
    "lessonId": "pattern-factory-method",
    "summary": "工厂方法把创建推给子类/创建者。create 里继续按类型 if，名字不成立。"
  },
  {
    "id": "cv-pattern-builder-assemble",
    "courseId": "pattern",
    "title": "建造者把可选部件留在组装过程，build 才交出产品",
    "lessonId": "pattern-builder-assemble",
    "summary": "可选部件用建造者分步放，缺必填在 build 失败。不要靠越来越长的构造器重载。"
  },
  {
    "id": "cv-pattern-singleton-scope",
    "courseId": "pattern",
    "title": "单例先写明这一份的范围",
    "lessonId": "pattern-singleton-scope",
    "summary": "进程级一份、容器一份、每次 new 不是同一种单例。范围内唯一也不保护可变字段。"
  },
  {
    "id": "cv-pattern-adapter-shape",
    "courseId": "pattern",
    "title": "适配器改变的是接口形状，不添加一层同一接口的行为",
    "lessonId": "pattern-adapter-shape",
    "summary": "适配器对接方法名形状。业务只调自己的接口；缓冲重试别塞进转换类。"
  },
  {
    "id": "cv-pattern-decorator-contract",
    "courseId": "pattern",
    "title": "装饰器套在同一接口上，调用方的类型不用改",
    "lessonId": "pattern-decorator-contract",
    "summary": "装饰器同接口层层加能力，可拆可组合。用子类笛卡尔积会把组合写死。"
  },
  {
    "id": "cv-pattern-proxy-stand-in",
    "courseId": "pattern",
    "title": "代理决定你能不能碰到目标，装饰器在外面加行为",
    "lessonId": "pattern-proxy-stand-in",
    "summary": "代理可以跳过或推迟目标；装饰器总是转发再加行为。同接口包一层不等于同一模式。"
  },
  {
    "id": "cv-pattern-facade-entry",
    "courseId": "pattern",
    "title": "外观把子系统的顺序收成一次调用",
    "lessonId": "pattern-facade-entry",
    "summary": "外观收成一次调用，子系统顺序留在里面。调用方还在选算法时，那一块仍是策略。"
  },
  {
    "id": "cv-pattern-bridge-two-axes",
    "courseId": "pattern",
    "title": "两个都会变的维度不要乘成子类",
    "lessonId": "pattern-bridge-two-axes",
    "summary": "两个变化维度分开继承。种类×通道用桥接，避免普通加急短信邮件那种子类爆炸。"
  },
  {
    "id": "cv-pattern-composite-tree",
    "courseId": "pattern",
    "title": "叶子和容器用同一接口，调用方不用先判断是不是目录",
    "lessonId": "pattern-composite-tree",
    "summary": "叶子与容器同一接口，容器转发给子节点。靠 instanceof 判断单品/套装，组合还没成立。"
  },
  {
    "id": "cv-pattern-flyweight-share",
    "courseId": "pattern",
    "title": "享元共享的是不变的那一部分，变化的部分调用时再传入",
    "lessonId": "pattern-flyweight-share",
    "summary": "享元共享不变字段，变化靠参数传入。范围内只能有一份对象那是单例，不是享元。"
  },
  {
    "id": "cv-pattern-strategy-swap",
    "courseId": "pattern",
    "title": "策略换掉的是算法，调用那一行保持不变",
    "lessonId": "pattern-strategy-swap",
    "summary": "策略用同一接口替换算法。结算方法里继续堆 else if，策略就没成立。"
  },
  {
    "id": "cv-pattern-template-steps",
    "courseId": "pattern",
    "title": "模板定死步骤顺序，只换其中一步的正文",
    "lessonId": "pattern-template-steps",
    "summary": "模板方法固定步骤顺序，子类只替换某一步。需要重排整条流程时改用策略对象。"
  },
  {
    "id": "cv-pattern-observer-push",
    "courseId": "pattern",
    "title": "观察者自己登记，主体不把每个响应者写进返回值",
    "lessonId": "pattern-observer-push",
    "summary": "旁路通知让下游自己登记。每加一个模块就往业务方法里注入调用，观察者还没成立。"
  },
  {
    "id": "cv-pattern-chain-stop",
    "courseId": "pattern",
    "title": "责任链上的一环可以选择不往后传",
    "lessonId": "pattern-chain-stop",
    "summary": "责任链可以中途停下不往后传。每一环都无条件转发，更像装饰器。"
  },
  {
    "id": "cv-pattern-state-transition",
    "courseId": "pattern",
    "title": "状态自己决定这一步能不能做，以及下一步是谁",
    "lessonId": "pattern-state-transition",
    "summary": "状态对象持有允许的动作并切换下一状态。用字符串 status 到处 if，状态模式没成立。"
  },
  {
    "id": "cv-java-comparator-strategy",
    "courseId": "pattern",
    "title": "排序规则用 Comparator 传进去，不必改元素类",
    "lessonId": "java-comparator-strategy",
    "summary": "排序规则用 Comparator 传入，不要改元素的 compareTo。"
  },
  {
    "id": "cv-java-buffered-stream-decorator",
    "courseId": "pattern",
    "title": "缓冲流包住原来的流，关闭时里面那一层也会关",
    "lessonId": "java-buffered-stream-decorator",
    "summary": "缓冲流是装饰器：关最外层即可连带内层。不要为组合能力去建笛卡尔积子类。"
  },
  {
    "id": "cv-java-proxy-needs-interface",
    "courseId": "pattern",
    "title": "JDK 动态代理只能站在接口前面",
    "lessonId": "java-proxy-needs-interface",
    "summary": "JDK 动态代理只代理接口，不会给具体类生成子类。没有接口就换别的代理方式。"
  },
  {
    "id": "cv-spring-what-it-is",
    "courseId": "spring",
    "title": "Spring 是给 Java 应用装配对象的应用框架",
    "lessonId": "spring-what-it-is",
    "summary": "是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。"
  },
  {
    "id": "cv-spring-enter-boot",
    "courseId": "spring",
    "title": "Spring Boot 启动一个已经装配好的应用",
    "lessonId": "spring-enter-boot",
    "summary": "用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。"
  },
  {
    "id": "cv-spring-not-the-business",
    "courseId": "spring",
    "title": "Spring 装配对象，不代替业务规则和 SQL",
    "lessonId": "spring-not-the-business",
    "summary": "不是。容器只保证对象被接上。"
  },
  {
    "id": "cv-spring-ioc-wiring",
    "courseId": "spring",
    "title": "容器先造对象，再按类型或名字注入依赖",
    "lessonId": "spring-ioc-wiring",
    "summary": "找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"
  },
  {
    "id": "cv-spring-bean-lifecycle",
    "courseId": "spring",
    "title": "Bean 先造出来，再注入，然后才初始化",
    "lessonId": "spring-bean-lifecycle",
    "summary": "构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。"
  },
  {
    "id": "cv-spring-scope-catalog",
    "courseId": "spring",
    "title": "Spring 内建作用域：别背 global-sess…",
    "lessonId": "spring-scope-catalog",
    "summary": "现行内建作用域是 singleton、prototype，Web 还有 request、session、application、websocket。"
  },
  {
    "id": "cv-spring-external-config",
    "courseId": "spring",
    "title": "Spring Boot 配置优先级与环境",
    "lessonId": "spring-external-config",
    "summary": "同一属性会按来源顺序覆盖。要看激活的 profile、加载位置和启动参数，不以仓库里那一个 yml 为准。"
  },
  {
    "id": "cv-spring-boot-war-still-ok",
    "courseId": "spring",
    "title": "Boot 能内嵌 Tomcat，也可以打 WAR 外置",
    "lessonId": "spring-boot-war-still-ok",
    "summary": "默认可执行 jar，需要外置容器时仍可打 WAR。自动配置也可用 exclude 关掉；不是“完全不能 XML/配置文件”。"
  },
  {
    "id": "cv-spring-boot3-autoconfig-imports",
    "courseId": "spring",
    "title": "Boot 3 自动配置不再靠 spring.facto…",
    "lessonId": "spring-boot3-autoconfig-imports",
    "summary": "Boot 3 的清单在 AutoConfiguration.imports。"
  },
  {
    "id": "cv-tomcat-nio-not-bio-default",
    "courseId": "spring",
    "title": "现行 Tomcat HTTP 连接器默认是 NIO，不…",
    "lessonId": "tomcat-nio-not-bio-default",
    "summary": "HTTP/1.1 默认是 NIO，不是 BIO。BIO 已移除；不要再背 maxSpareThreads 当必须项。"
  },
  {
    "id": "cv-spring-xmlbeanfactory-removed",
    "courseId": "spring",
    "title": "XmlBeanFactory 已删除，别把容器说成只有…",
    "lessonId": "spring-xmlbeanfactory-removed",
    "summary": "入口是 ApplicationContext。XmlBeanFactory 已删除；非懒加载单例在刷新时创建，不是“一定会建完所有 Bean”的口诀。"
  },
  {
    "id": "cv-spring-mvc-dispatch",
    "courseId": "spring",
    "title": "过滤器、拦截器和控制器不是同一层",
    "lessonId": "spring-mvc-dispatch",
    "summary": "Filter 在 DispatcherServlet 之外。"
  },
  {
    "id": "cv-spring-validation-binding",
    "courseId": "spring",
    "title": "校验发生在绑定之后，失败要变成 400 而不是业务异常",
    "lessonId": "spring-validation-binding",
    "summary": "有 @Valid 且不接 BindingResult 时，缺字段直接 400。"
  },
  {
    "id": "cv-spring-mvc-restcontroller",
    "courseId": "spring",
    "title": "@RestController 可以替代只返回 JSO…",
    "lessonId": "spring-mvc-restcontroller",
    "summary": "@RestController 就是 @Controller 加 @ResponseBody，可以返回 JSON。"
  },
  {
    "id": "cv-spring-mvc-controller-singleton",
    "courseId": "spring",
    "title": "Controller 默认单例，可变字段会串请求",
    "lessonId": "spring-mvc-controller-singleton",
    "summary": "Controller 默认单例，请求状态不能放实例字段。"
  },
  {
    "id": "cv-spring-aop-proxy-type",
    "courseId": "spring",
    "title": "切面加在代理上，接口走 JDK 代理，类走 CGLIB",
    "lessonId": "spring-aop-proxy-type",
    "summary": "切面只拦从外面进来的调用。同类内部调用不经过代理；先看这次调用有没有走过代理，再谈 JDK 还是 CGLIB。"
  },
  {
    "id": "cv-spring-aop-self-invocation",
    "courseId": "spring",
    "title": "同类里 this.方法() 不会再进一次代理",
    "lessonId": "spring-aop-self-invocation",
    "summary": "this.方法() 不经过代理，上面的事务/切面可能没有。"
  },
  {
    "id": "cv-spring-boot-aop-cglib-default",
    "courseId": "spring",
    "title": "Spring Boot 默认按类做 CGLIB 代理",
    "lessonId": "spring-boot-aop-cglib-default",
    "summary": "Boot 默认常走 CGLIB，不是“有接口就一定 JDK”。"
  },
  {
    "id": "cv-mybatis-what-it-is",
    "courseId": "spring",
    "title": "MyBatis 把你写的 SQL 映射到对象",
    "lessonId": "mybatis-what-it-is",
    "summary": "是 MyBatis。它是 SQL 映射框架：语句写在映射里，运行时绑定参数并映射结果。"
  },
  {
    "id": "cv-mybatis-enter-mapper",
    "courseId": "spring",
    "title": "映射器接口绑到一条语句，调用才执行",
    "lessonId": "mybatis-enter-mapper",
    "summary": "MyBatis 给这个接口做绑定。方法对应一条语句，调用时才执行。"
  },
  {
    "id": "cv-mybatis-parameters",
    "courseId": "spring",
    "title": "MyBatis 参数绑定与 SQL 拼接",
    "lessonId": "mybatis-parameters",
    "summary": "#{} 才是参数绑定。${} 拼进 SQL 原文，用户输入不能当普通占位符；标识符只能来自后端白名单。"
  },
  {
    "id": "cv-mybatis-dynamic-sql",
    "courseId": "spring",
    "title": "动态 SQL 用标签拼结构，值仍走占位符",
    "lessonId": "mybatis-dynamic-sql",
    "summary": "可选条件用动态标签拼结构，值仍用占位符。整段 WHERE 字符串拼接会把用户输入写进语句原文。"
  },
  {
    "id": "cv-mybatis-type-handler",
    "courseId": "spring",
    "title": "Java 类型和 JDBC 类型对不上时，用 Type…",
    "lessonId": "mybatis-type-handler",
    "summary": "库类型和 Java 类型之间要成对的 TypeHandler。"
  },
  {
    "id": "cv-mybatis-lazy-javassist-not-cglib",
    "courseId": "spring",
    "title": "延迟加载默认不是 CGLIB，空关联才会再发 SQL",
    "lessonId": "mybatis-lazy-javassist-not-cglib",
    "summary": "默认代理工厂是 JAVASSIST，不是一定 CGLIB。"
  },
  {
    "id": "cv-mybatis-batch-executor",
    "courseId": "spring",
    "title": "批量执行器把多条写语句收在一起发",
    "lessonId": "mybatis-batch-executor",
    "summary": "BATCH 把写语句攒到 flush 再发，减少往返。循环里穿插查询会打断批；重复键错误常在 flush 时才暴露。"
  },
  {
    "id": "cv-mybatis-plugin-interceptor",
    "courseId": "spring",
    "title": "插件拦的是执行器，不是业务方法",
    "lessonId": "mybatis-plugin-interceptor",
    "summary": "插件拦的是执行器/语句处理器，不是 Mapper 业务方法。"
  },
  {
    "id": "cv-mybatis-rowbounds-memory",
    "courseId": "spring",
    "title": "RowBounds 默认是结果集上跳过，不是数据库 L…",
    "lessonId": "mybatis-rowbounds-memory",
    "summary": "默认 RowBounds 仍可能先把大结果读回再跳过。数据库分页要写 LIMIT/keyset，不能只背“用了 RowBounds”。"
  },
  {
    "id": "cv-mybatis-second-cache",
    "courseId": "spring",
    "title": "二级缓存跨会话，默认往往得不偿失",
    "lessonId": "mybatis-second-cache",
    "summary": "二级缓存在 namespace 上跨会话，提交后才对其它会话可见。"
  },
  {
    "id": "cv-mybatis-log-preparing-parameters",
    "courseId": "spring",
    "title": "打印 SQL 时 DEBUG 打出 Preparing…",
    "lessonId": "mybatis-log-preparing-parameters",
    "summary": "DEBUG 下语句带问号，参数在下一行。要可执行语句得自己拼，或看会内联参数的 JDBC/池日志。"
  },
  {
    "id": "cv-mybatis-jdbc-log-inlines",
    "courseId": "spring",
    "title": "能对着看的 SQL 在 JDBC 日志里，问号行只是预…",
    "lessonId": "mybatis-jdbc-log-inlines",
    "summary": "MyBatis 打的是 XML 原文参数行；连接池/JDBC 日志里可能已有分页改写后的 LIMIT。"
  },
  {
    "id": "cv-mybatis-debug-boundsql",
    "courseId": "spring",
    "title": "SQL 断点打在带 BoundSql 的 Execut…",
    "lessonId": "mybatis-debug-boundsql",
    "summary": "Mapper 接口没有方法体，断点打在接口上进不去。看代理后的调用，或从 BoundSql 读改写后的语句。"
  },
  {
    "id": "cv-mybatis-pagehelper-next-query",
    "courseId": "spring",
    "title": "PageHelper.startPage 只分页本线程…",
    "lessonId": "mybatis-pagehelper-next-query",
    "summary": "startPage 只影响之后第一条查询。查询被跳过又不 clearPage，分页会粘到下一线程请求上。"
  },
  {
    "id": "cv-mybatis-plus-page-argument",
    "courseId": "spring",
    "title": "MyBatis-Plus 用 Page 参数分页，不要…",
    "lessonId": "mybatis-plus-page-argument",
    "summary": "分页拦截器与手写 LIMIT 叠在一起会双 LIMIT。"
  },
  {
    "id": "cv-mybatis-middleware-layers",
    "courseId": "spring",
    "title": "中间件按层分工：日志、分页、池、选库、分片",
    "lessonId": "mybatis-middleware-layers",
    "summary": "先分清谁改连接、谁改 SQL、谁让你看见最终语句。报一串中间件名字，仍要能指出这一次 LIMIT/库名是哪一层写上的。"
  },
  {
    "id": "cv-es-what-and-when",
    "courseId": "spring",
    "title": "Elasticsearch 是分布式搜索与分析引擎，不…",
    "lessonId": "es-what-and-when",
    "summary": "ES 适合全文检索与分析。订单主账本仍在数据库，不能当万能库。"
  },
  {
    "id": "cv-es-tradeoffs-capacity",
    "courseId": "spring",
    "title": "优缺点与容量要按分片和查询形态估，没有全站通用并发数",
    "lessonId": "es-tradeoffs-capacity",
    "summary": "没有固定的并发/容量口号。看分片体积与查询形态，用压测。"
  },
  {
    "id": "cv-es-vs-db-search",
    "courseId": "spring",
    "title": "DB 的 LIKE 与 ES 检索解决的不是同一类问题",
    "lessonId": "es-vs-db-search",
    "summary": "LIKE 能出结果也不等于检索系统。ES 提供分词相关性与规模化筛选，是可重建投影。"
  },
  {
    "id": "cv-es-inverted-index",
    "courseId": "spring",
    "title": "倒排索引是“词指向哪些文档”",
    "lessonId": "es-inverted-index",
    "summary": "倒排是词指向文档列表。写入与查询要用同一套分析，精确值别走分词字段。"
  },
  {
    "id": "cv-es-lucene-not-btree",
    "courseId": "spring",
    "title": "Lucene 和 ES 都是倒排索引，不是 B+ 树对比",
    "lessonId": "es-lucene-not-btree",
    "summary": "Lucene 与 ES 检索都是倒排，不是“Lucene=B+树、ES 才倒排”。"
  },
  {
    "id": "cv-elastic-analysis",
    "courseId": "spring",
    "title": "全文检索的分词与映射",
    "lessonId": "elastic-analysis",
    "summary": "匹配不到先看 mapping 与分析器。索引时和查询时的 token 要对得上。"
  },
  {
    "id": "cv-browser-security-what",
    "courseId": "secure",
    "title": "浏览器安全管的是谁能读凭证、谁能跑脚本",
    "lessonId": "browser-security-what",
    "summary": "谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。"
  },
  {
    "id": "cv-csp-script-src",
    "courseId": "secure",
    "title": "CSP 白名单限制脚本从哪来，不是代替转义 HTML",
    "lessonId": "csp-script-src",
    "summary": "只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。"
  },
  {
    "id": "cv-csp-report-only-not-enforce",
    "courseId": "secure",
    "title": "Report-Only 只上报违例，不会替你拦住脚本",
    "lessonId": "csp-report-only-not-enforce",
    "summary": "Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"
  },
  {
    "id": "cv-trusted-types-sink-guard",
    "courseId": "secure",
    "title": "Trusted Types 卡住危险汇点，不是替你洗掉…",
    "lessonId": "trusted-types-sink-guard",
    "summary": "卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"
  },
  {
    "id": "cv-permissions-policy-feature-gate",
    "courseId": "secure",
    "title": "Permissions-Policy 关的是浏览器能力…",
    "lessonId": "permissions-policy-feature-gate",
    "summary": "Permissions-Policy 管强大 API 是否可用。"
  },
  {
    "id": "cv-document-policy-not-permissions-policy",
    "courseId": "secure",
    "title": "Document-Policy 管文档行为预算，不是 …",
    "lessonId": "document-policy-not-permissions-policy",
    "summary": "Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。"
  },
  {
    "id": "cv-coop-coep-cross-origin-isolated",
    "courseId": "secure",
    "title": "COOP/COEP 换来 crossOriginIso…",
    "lessonId": "coop-coep-cross-origin-isolated",
    "summary": "COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。"
  },
  {
    "id": "cv-referrer-policy-leak-bound",
    "courseId": "secure",
    "title": "Referrer-Policy 管带多少来源信息，不是…",
    "lessonId": "referrer-policy-leak-bound",
    "summary": "主要限制 Referer 泄露多少。CSRF/会话仍靠 SameSite、令牌与服务端校验。"
  },
  {
    "id": "cv-sri-integrity-not-csp",
    "courseId": "secure",
    "title": "SRI 校验这一份资源字节，不是 CSP 脚本来源白名…",
    "lessonId": "sri-integrity-not-csp",
    "summary": "SRI 核对子资源字节摘要。CSP script-src 限制允许的脚本来源。"
  },
  {
    "id": "cv-clear-site-data-not-full-logout",
    "courseId": "secure",
    "title": "Clear-Site-Data 清浏览器存的数据，不是…",
    "lessonId": "clear-site-data-not-full-logout",
    "summary": "清的是浏览器侧该源的 Cookie/存储/缓存等。完整注销还要服务端作废会话与令牌。"
  },
  {
    "id": "cv-reporting-nel-not-csp-enforce",
    "courseId": "secure",
    "title": "Reporting / NEL 是遥测管道，不是又一道…",
    "lessonId": "reporting-nel-not-csp-enforce",
    "summary": "Reporting/NEL 提供违例与网络失败的遥测。挡未允许脚本靠强制 CSP。"
  },
  {
    "id": "cv-corp-embed-gate-not-cors",
    "courseId": "secure",
    "title": "CORP 管别人能不能嵌你的资源，不是 CORS 读响…",
    "lessonId": "corp-embed-gate-not-cors",
    "summary": "CORP 管嵌入/加载许可。CORS 管脚本读跨源响应。"
  },
  {
    "id": "cv-pna-private-network-access",
    "courseId": "secure",
    "title": "公网站点访问内网要过 Private Network …",
    "lessonId": "pna-private-network-access",
    "summary": "PNA 拦的是更公开上下文访问更私有网络。普通 CORS 只管跨源读响应。"
  },
  {
    "id": "cv-fenced-frame-embed-boundary",
    "courseId": "secure",
    "title": "Fenced Frame 是更严的嵌入边界，不是 if…",
    "lessonId": "fenced-frame-embed-boundary",
    "summary": "Fenced Frame 强调与嵌入方的信息隔离，服务隐私广告等场景。"
  },
  {
    "id": "cv-attribution-reporting-not-cookie",
    "courseId": "secure",
    "title": "Attribution Reporting 是浏览器归…",
    "lessonId": "attribution-reporting-not-cookie",
    "summary": "ARA 交付受约束的归因报告（常含延迟与噪声）。它不复刻跨站稳定用户标识与完整行为明细。"
  },
  {
    "id": "cv-storage-access-api-not-cookie-restore",
    "courseId": "secure",
    "title": "Storage Access API 是嵌入方按需申请…",
    "lessonId": "storage-access-api-not-cookie-restore",
    "summary": "嵌入第三方在用户手势等条件下申请自己的存储访问。不是宿主代读，也不是无约束的跨站追踪复辟。"
  },
  {
    "id": "cv-fedcm-not-oauth-popup",
    "courseId": "secure",
    "title": "FedCM 是浏览器中介的联合登录，不是自家 OAut…",
    "lessonId": "fedcm-not-oauth-popup",
    "summary": "FedCM 由浏览器中介联合登录流程。它不是应用自管 OAuth 弹窗的别名，对第三方 Cookie 的依赖模型也不同。"
  },
  {
    "id": "cv-topics-api-not-cookie-segments",
    "courseId": "secure",
    "title": "Topics API 给的是粗兴趣主题，不是旧 Coo…",
    "lessonId": "topics-api-not-cookie-segments",
    "summary": "Topics 交付粗粒度、受约束的兴趣主题。它不复刻跨站稳定用户标识与精细行为明细。"
  },
  {
    "id": "cv-shared-storage-not-third-party-cookie",
    "courseId": "secure",
    "title": "Shared Storage 是受限跨站存储工作台，不…",
    "lessonId": "shared-storage-not-third-party-cookie",
    "summary": "Shared Storage 是受限跨站存储与选择/聚合工作台。"
  },
  {
    "id": "cv-private-state-tokens-not-cookie",
    "courseId": "secure",
    "title": "Private State Tokens 是有限信任凭…",
    "lessonId": "private-state-tokens-not-cookie",
    "summary": "PST 证明有限的信任/检查结果。它不是通用会话，也不能当稳定跨站用户标识。"
  },
  {
    "id": "cv-protected-audience-not-cookie-remarketing",
    "courseId": "secure",
    "title": "Protected Audience 是设备侧兴趣群组…",
    "lessonId": "protected-audience-not-cookie-remarketing",
    "summary": "PA 以设备侧兴趣群组与受限竞价为核心。它不复刻第三方任意读写的跨站再营销 Cookie 模型。"
  },
  {
    "id": "cv-related-website-sets-not-cookie-restore",
    "courseId": "secure",
    "title": "Related Website Sets 只降低同组申…",
    "lessonId": "related-website-sets-not-cookie-restore",
    "summary": "RWS 降低同组内 Storage Access 申请的提示摩擦。"
  },
  {
    "id": "cv-bounce-tracking-mitigation-not-session-bug",
    "courseId": "secure",
    "title": "跳转追踪缓解会清短访站点的状态，不是浏览器随机登出",
    "lessonId": "bounce-tracking-mitigation-not-session-bug",
    "summary": "缓解针对短访跳转追踪链上的状态。一等登录应落在用户停留的站点会话，不靠 bounce 域当跨站 id。"
  },
  {
    "id": "cv-ua-client-hints-need-accept-ch",
    "courseId": "secure",
    "title": "UA Client Hints 要服务器声明才给高熵，…",
    "lessonId": "ua-client-hints-need-accept-ch",
    "summary": "高熵 Client Hints 通常要 Accept-CH 声明且浏览器可拒绝。"
  },
  {
    "id": "cv-reduced-ua-not-stable-device-id",
    "courseId": "secure",
    "title": "削减后的 User-Agent 字符串还在，但不能当稳…",
    "lessonId": "reduced-ua-not-stable-device-id",
    "summary": "削减后 UA 仍可能存在但更粗、更不适合当设备主键。身份与会话靠服务端凭证；细节用可缺的 Client Hints。"
  },
  {
    "id": "cv-captcha-challenge-not-authn",
    "courseId": "secure",
    "title": "验证码不是登录认证，也替不了授权",
    "lessonId": "captcha-challenge-not-authn",
    "summary": "验证码提高机器滥用成本。登录认证与对象授权另做。"
  },
  {
    "id": "cv-bot-mitigation-not-only-widget",
    "courseId": "secure",
    "title": "防刷不能只靠页面上的验证码挂件",
    "lessonId": "bot-mitigation-not-only-widget",
    "summary": "挑战 token 证明单次反滥用通过。会话靠服务端登录凭证。"
  },
  {
    "id": "cv-spring-security-what",
    "courseId": "secure",
    "title": "Spring Security 是认证和授权的框架",
    "lessonId": "spring-security-what",
    "summary": "是 Spring Security。它用过滤器链做认证和授权，不是只提供一个登录页。"
  },
  {
    "id": "cv-spring-security-enter-chain",
    "courseId": "secure",
    "title": "过滤器链在控制器之前拦住请求",
    "lessonId": "spring-security-enter-chain",
    "summary": "更早。Security 过滤器链在 DispatcherServlet 之前处理，未认证就回 401 或登录页。"
  },
  {
    "id": "cv-spring-security-filter-chain",
    "courseId": "secure",
    "title": "认证发生在过滤链上，控制器里的 if 登录不能代替这一层",
    "lessonId": "spring-security-filter-chain",
    "summary": "认证在过滤链完成。控制器里 if user==null 挡不住未登录；对象归属还要在服务里查。"
  },
  {
    "id": "cv-spring-authn-authz",
    "courseId": "secure",
    "title": "登录成功还不等于可以调用",
    "lessonId": "spring-authn-authz",
    "summary": "登录是认证，管理接口还要授权。已登录仍可能因缺权限被拒绝。"
  },
  {
    "id": "cv-abac-subject-object-attributes",
    "courseId": "secure",
    "title": "ABAC 按主体和客体的属性评估规则",
    "lessonId": "abac-subject-object-attributes",
    "summary": "〔ABAC｜按主体、客体、动作和环境的属性来评估规则的访问控制〕写的是属性组合。"
  },
  {
    "id": "cv-spring-oauth2-resource",
    "courseId": "secure",
    "title": "资源服务器校验令牌，不是再做一遍登录表单",
    "lessonId": "spring-oauth2-resource",
    "summary": "Bearer API 是资源服务器校验令牌。用户名密码登录页属于授权服务器，不要混成一套。"
  },
  {
    "id": "cv-oidc-id-token-pkce",
    "courseId": "secure",
    "title": "OpenID Connect 用 ID Token 表…",
    "lessonId": "oidc-id-token-pkce",
    "summary": "登录结果在〔ID Token｜发给客户端、声明这次登录的 JWT〕里。"
  },
  {
    "id": "cv-ssrf-allowlist-before-fetch",
    "courseId": "secure",
    "title": "SSRF：服务器代取地址之前，先核对允许名单",
    "lessonId": "ssrf-allowlist-before-fetch",
    "summary": "登录只说明是谁。〔SSRF｜服务器按收到的地址去取内容，却没有核对目标是不是预期的〕看的是取回的目标。"
  },
  {
    "id": "cv-sshd-rate-limit-not-lastb",
    "courseId": "secure",
    "title": "SSH 防爆破用 sshd 和限流，不要靠 lastb…",
    "lessonId": "sshd-rate-limit-not-lastb",
    "summary": "靠 lastb 计数再 iptables 不可靠。先关密码登录并限 MaxAuthTries，再用 Fail2ban 一类组件。"
  },
  {
    "id": "cv-password-adaptive-hash",
    "courseId": "secure",
    "title": "口令只存慢哈希，不存原文，也不存快哈希",
    "lessonId": "password-adaptive-hash",
    "summary": "一次 SHA-256 太快。口令要盐加自适应慢哈希，不能可逆加密当方案。"
  },
  {
    "id": "cv-spring-csrf-spa",
    "courseId": "secure",
    "title": "Cookie 会话的浏览器请求仍要防 CSRF，SPA…",
    "lessonId": "spring-csrf-spa",
    "summary": "不是。Cookie 会话仍要 CSRF。"
  },
  {
    "id": "cv-spring-security-cors",
    "courseId": "secure",
    "title": "CORS 是浏览器的跨源限制，不能代替服务端鉴权",
    "lessonId": "spring-security-cors",
    "summary": "不是。网关允许 Origin 只约束浏览器跨源读响应，不等于接口已经鉴权。"
  },
  {
    "id": "cv-runtime-config",
    "courseId": "secure",
    "title": "口令和地址属于运行环境，不属于构建产物",
    "lessonId": "runtime-config",
    "summary": "密钥放运行环境注入，不进 jar 与镜像层。同一制品靠启动配置区分环境。"
  },
  {
    "id": "cv-spring-session-stateless",
    "courseId": "secure",
    "title": "无状态 API 不要再为每次 Bearer 请求创建会话",
    "lessonId": "spring-session-stateless",
    "summary": "STATELESS 不再发会话 Cookie。JWT 认证仍在，只是不为这次请求建服务端会话。"
  },
  {
    "id": "cv-jwt-payload-not-encrypted",
    "courseId": "secure",
    "title": "JWT 载荷是编码不是加密，改密钥才算作废所有票",
    "lessonId": "jwt-payload-not-encrypted",
    "summary": "未加密 JWT 的 payload 可直接解码阅读，不是密文。"
  },
  {
    "id": "cv-netty-what-it-is",
    "courseId": "secure",
    "title": "Netty 是异步事件驱动的网络应用框架",
    "lessonId": "netty-what-it-is",
    "summary": "用 Netty。它是异步、事件驱动的网络应用框架，用来写协议和连接，不是现成的业务 HTTP 服务器。"
  },
  {
    "id": "cv-netty-enter-bootstrap",
    "courseId": "secure",
    "title": "Bootstrap 绑定事件循环和管道，才开始接连接",
    "lessonId": "netty-enter-bootstrap",
    "summary": "用 ServerBootstrap 配上 EventLoopGroup、Channel 类型和管道，再 bind 端口。"
  },
  {
    "id": "cv-netty-not-spring-mvc",
    "courseId": "secure",
    "title": "Netty 不管控制器和事务，Spring MVC 不…",
    "lessonId": "netty-not-spring-mvc",
    "summary": "不是一回事。MVC 处理 HTTP 请求和控制器。"
  },
  {
    "id": "cv-netty-pipeline-handler",
    "courseId": "secure",
    "title": "Pipeline 是一串入站出站处理器",
    "lessonId": "netty-pipeline-handler",
    "summary": "先拆帧再解码再进业务。半包说明拆帧缺了或顺序错了。"
  },
  {
    "id": "cv-netty-bytebuf-leak",
    "courseId": "secure",
    "title": "ByteBuf 要释放，泄漏会吃掉堆外内存",
    "lessonId": "netty-bytebuf-leak",
    "summary": "Direct buffer 在堆外。读完与异常路径都要释放，堆空不代表安全。"
  },
  {
    "id": "cv-nio-not-one-thread-per-request",
    "courseId": "secure",
    "title": "NIO 是一条线程盯多个通道，不是一个请求一条线程",
    "lessonId": "nio-not-one-thread-per-request",
    "summary": "NIO 用少量线程在 Selector 上等就绪，不是一请求一线程。"
  },
  {
    "id": "cv-epoll-et-must-drain",
    "courseId": "secure",
    "title": "边沿触发要把缓冲读干，剩下的不会再敲门",
    "lessonId": "epoll-et-must-drain",
    "summary": "边缘触发只在状态变化时通知一次。必须非阻塞读到 EAGAIN，剩下的不会再敲门。"
  },
  {
    "id": "cv-netty-idle-heartbeat",
    "courseId": "secure",
    "title": "空闲检测用来发现死连接，不要靠业务线程去 ping",
    "lessonId": "netty-idle-heartbeat",
    "summary": "对端断电要靠空闲检测与心跳关连接，不要等操作系统很久才回收。"
  },
  {
    "id": "cv-ts-satisfies",
    "courseId": "rest",
    "title": "satisfies 核对形状，但不把字面量放宽成宽类型…",
    "lessonId": "ts-satisfies",
    "summary": "satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。"
  },
  {
    "id": "cv-react-flow-not-default",
    "courseId": "rest",
    "title": "React 文档用 TypeScript，不再把 Fl…",
    "lessonId": "react-flow-not-default",
    "summary": "新 React 代码默认 TypeScript。Flow 不是现行并列必学。"
  },
  {
    "id": "cv-ts-structural",
    "courseId": "rest",
    "title": "结构类型与多余属性检查",
    "lessonId": "ts-structural",
    "summary": "TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"
  },
  {
    "id": "cv-ts-utility-types",
    "courseId": "rest",
    "title": "Partial、Pick、Omit 是改形状，不是改运…",
    "lessonId": "ts-utility-types",
    "summary": "Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"
  },
  {
    "id": "cv-ts-template-literal-types",
    "courseId": "rest",
    "title": "模板字面量类型能拼出合法字符串，拼不出的键会在编译期失…",
    "lessonId": "ts-template-literal-types",
    "summary": "模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。"
  },
  {
    "id": "cv-same-origin-script-still-runs",
    "courseId": "rest",
    "title": "同源策略拦的是读，不是“外域脚本不能执行”",
    "lessonId": "same-origin-script-still-runs",
    "summary": "外域 script src 会执行，权限属于当前文档的源。"
  },
  {
    "id": "cv-html-form-cross-origin-navigate",
    "courseId": "rest",
    "title": "表单可以跨源提交，CORS 拦的是脚本读响应",
    "lessonId": "html-form-cross-origin-navigate",
    "summary": "表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。"
  },
  {
    "id": "cv-react-rsc-vs-client",
    "courseId": "rest",
    "title": "服务端组件负责这次要渲染的数据，客户端组件负责这次要交…",
    "lessonId": "react-rsc-vs-client",
    "summary": "loader 解决路由取数。服务端组件决定哪一块不进客户端包；有按钮和本地状态的块才标成客户端组件。"
  },
  {
    "id": "cv-query-cache-not-http-client",
    "courseId": "rest",
    "title": "TanStack Query 缓存服务器结果，自己不发…",
    "lessonId": "query-cache-not-http-client",
    "summary": "Query 管缓存和重试，不代替发请求。queryFn 里仍要调用 fetch 或 Axios。"
  },
  {
    "id": "cv-query-fn-calls-the-client",
    "courseId": "rest",
    "title": "queryFn 里要让 HTTP 失败变成抛错，并带上…",
    "lessonId": "query-fn-calls-the-client",
    "summary": "不检查 ok 时，404 也会进 data。默认还会重试多次；失败要 throw，并按需要关掉 retry。"
  },
  {
    "id": "cv-query-server-state",
    "courseId": "rest",
    "title": "服务器状态不要再抄进 useState",
    "lessonId": "query-server-state",
    "summary": "Query 里已有列表就不要再 setUsers 抄一份。"
  },
  {
    "id": "cv-redux-rtk-today",
    "courseId": "rest",
    "title": "今天写 Redux 默认走 Toolkit，不是手写 …",
    "lessonId": "redux-rtk-today",
    "summary": "今天写 Redux 用 Toolkit：configureStore 和 createSlice。"
  },
  {
    "id": "cv-vue-router-reuse",
    "courseId": "rest",
    "title": "只改路由参数时，组件可能不会重建",
    "lessonId": "vue-router-reuse",
    "summary": "同一组件实例会被复用，setup 不重跑。参数变了要 watch params，或靠守卫之外的数据重载。"
  },
  {
    "id": "cv-vue-router-guard",
    "courseId": "rest",
    "title": "导航守卫决定去不去，不是在页面里再偷偷改路由",
    "lessonId": "vue-router-guard",
    "summary": "守卫在确认导航前拦截，页面不会先出现。写在 onMounted 里再跳转，会先闪一下内容。"
  },
  {
    "id": "cv-vue-router-scroll",
    "courseId": "rest",
    "title": "换页后的滚动位置要自己约定，浏览器不会总回到顶部",
    "lessonId": "vue-router-scroll",
    "summary": "滚动位置由 scrollBehavior 决定。后退用 savedPosition，新开模块滚到顶，不能指望浏览器默认每次一样。"
  },
  {
    "id": "cv-pinia-store-to-refs",
    "courseId": "rest",
    "title": "从 store 解构状态要用 storeToRefs，…",
    "lessonId": "pinia-store-to-refs",
    "summary": "直接解构会断开响应式。要用 storeToRefs 取状态；方法可以普通解构。"
  },
  {
    "id": "cv-vue-keep-alive",
    "courseId": "rest",
    "title": "keep-alive 缓存的是实例，切走不是销毁",
    "lessonId": "vue-keep-alive",
    "summary": "缓存时实例不销毁，回来走 activated，滚动能留下。"
  },
  {
    "id": "cv-node-event-loop-phases",
    "courseId": "rest",
    "title": "定时器、poll、check 是不同阶段，不要按浏览器…",
    "lessonId": "node-event-loop-phases",
    "summary": "setTimeout(0) 与 setImmediate 的先后取决于调用所处阶段，不是固定谁先。"
  },
  {
    "id": "cv-node-libuv-threadpool",
    "courseId": "rest",
    "title": "看起来异步的 fs 和 crypto，背后常占用线程池",
    "lessonId": "node-libuv-threadpool",
    "summary": "走线程池的例如某些文件操作和加密。会堵住循环本身的是同步死循环和长时间的纯计算。"
  },
  {
    "id": "cv-node-buffer",
    "courseId": "rest",
    "title": "Buffer 的字节与初始化边界",
    "lessonId": "node-buffer",
    "summary": "Buffer.alloc(8) 会把 8 个字节填成 0，读出来是确定的。"
  },
  {
    "id": "cv-java-not-every-class-clone-serializable",
    "courseId": "rest",
    "title": "不是每个类都要 equals、clone 和 Seri…",
    "lessonId": "java-not-every-class-clone-serializable",
    "summary": "equals/hashCode/toString 按需覆盖。"
  },
  {
    "id": "cv-java-raw-type-skips-checks",
    "courseId": "rest",
    "title": "裸类型 List 会跳过泛型检查，不是图省事的写法",
    "lessonId": "java-raw-type-skips-checks",
    "summary": "裸类型 List 跳过泛型检查。List<?> 元素未知，基本不能 add；要装任意对象用 List<Object>。"
  },
  {
    "id": "cv-java-class-newinstance-deprecated",
    "courseId": "rest",
    "title": "不要再用 Class.newInstance，它只能调…",
    "lessonId": "java-class-newinstance-deprecated",
    "summary": "Class.newInstance 已弃用且只走无参。用 Constructor.newInstance；forName 仍需要类名。"
  },
  {
    "id": "cv-java-final-not-fifty-percent",
    "courseId": "rest",
    "title": "给类加 final 不会让程序快百分之五十",
    "lessonId": "java-final-not-fifty-percent",
    "summary": "final 禁止继承，没有“平均快 50%”的规范。内联是 JIT 的事，不要靠赋 null 催 GC。"
  },
  {
    "id": "cv-java-shift-not-times-eight",
    "courseId": "rest",
    "title": "2 左移 3 不是“算出 2 乘 8”的正经答案",
    "lessonId": "java-shift-not-times-eight",
    "summary": "乘除就写乘除，JIT 会折减常数。移位留给位图和对齐掩码，不是生产里替代算术的默认写法。"
  },
  {
    "id": "cv-java-switch-arrow-no-fall",
    "courseId": "rest",
    "title": "冒号分支会贯穿，箭头分支不会（JDK 14）",
    "lessonId": "java-switch-arrow-no-fall",
    "summary": "冒号分支没有 break 会贯穿；箭头分支只跑匹配那一支。"
  },
  {
    "id": "cv-java-unmodifiable-is-view",
    "courseId": "rest",
    "title": "不可修改列表是视图，原列表一改它就跟着变",
    "lessonId": "java-unmodifiable-is-view",
    "summary": "不可修改是视图，不是快照。改原列表，视图也会变；要隔离就先拷贝再包视图。"
  },
  {
    "id": "cv-java-runnable-is-command",
    "courseId": "rest",
    "title": "把要做的事放进 Runnable，线程池里不写业务",
    "lessonId": "java-runnable-is-command",
    "summary": "任务用 Runnable/Callable 提交，池子不写业务步骤。"
  },
  {
    "id": "cv-spring-factorybean-product",
    "courseId": "rest",
    "title": "FactoryBean 注入出去的是 getObjec…",
    "lessonId": "spring-factorybean-product",
    "summary": "注入默认拿到 getObject 的产品；要工厂本身才加 &。"
  },
  {
    "id": "cv-spring-event-sync-default",
    "courseId": "rest",
    "title": "Spring 事件默认要等监听器跑完，不是发出去就换线程",
    "lessonId": "spring-event-sync-default",
    "summary": "默认监听器同步跑在发布调用里。不是下单返回后自动换线程慢慢处理。"
  },
  {
    "id": "cv-spring-jdbctemplate-callback",
    "courseId": "rest",
    "title": "JdbcTemplate 固定连接和异常转换，回调只提…",
    "lessonId": "spring-jdbctemplate-callback",
    "summary": "JdbcTemplate 把 SQLException 译成 DataAccessException。"
  },
  {
    "id": "cv-spring-getbean-hides-deps",
    "courseId": "rest",
    "title": "构造器写出依赖，不要在方法里再 getBean",
    "lessonId": "spring-getbean-hides-deps",
    "summary": "依赖写在构造器上，缺了启动就失败。业务方法里 getBean 会把失败推迟并绑死字符串名。"
  },
  {
    "id": "cv-es-filter-context",
    "courseId": "rest",
    "title": "过滤回答是不是，查询回答有多像",
    "lessonId": "es-filter-context",
    "summary": "关键词打分，分类价格做过滤。过滤不参与相关性分数，还可被缓存。"
  },
  {
    "id": "cv-es-refresh-visibility",
    "courseId": "rest",
    "title": "写入成功后，搜索仍可能看不到",
    "lessonId": "es-refresh-visibility",
    "summary": "索引 201 只表示接受。搜索可见要等 refresh 打开新段，不等于已落盘。"
  },
  {
    "id": "cv-es-term-lookup-not-o1",
    "courseId": "rest",
    "title": "倒排能避开全文扫描，查一个词仍不是 O(1)",
    "lessonId": "es-term-lookup-not-o1",
    "summary": "词典查找不是整库一次哈希的 O(1)。倒排表与打分随命中变贵。"
  },
  {
    "id": "cv-es-search-after",
    "courseId": "rest",
    "title": "深分页不要用 from 跳过前面的命中",
    "lessonId": "es-search-after",
    "summary": "深分页用 search_after，不要巨大 from。"
  },
  {
    "id": "cv-es-mapping-reindex",
    "courseId": "rest",
    "title": "映射改了类型，旧索引不会跟着变，要重建",
    "lessonId": "es-mapping-reindex",
    "summary": "已有字段改类型要建新索引、reindex、切别名。只改模板不改历史文档。"
  },
  {
    "id": "cv-es-aggregations",
    "courseId": "rest",
    "title": "聚合是在匹配文档上分桶或算指标，不是再把每条文档取回来",
    "lessonId": "es-aggregations",
    "summary": "分组计数放引擎里做 terms 聚合，不要搜一万行回应用里 groupBy。"
  },
  {
    "id": "cv-es-custom-routing",
    "courseId": "rest",
    "title": "自定义 routing 把相关文档放到同一分片，查错分…",
    "lessonId": "es-custom-routing",
    "summary": "写入用的 routing 读取也要用。默认路由去 GET 可能落到别的分片找不到。"
  },
  {
    "id": "cv-netty-codec-shareable",
    "courseId": "rest",
    "title": "编解码器能不能共享，看它有没有连接级状态",
    "lessonId": "netty-codec-shareable",
    "summary": "带半包缓冲的解码器不能做成所有连接共享的单例，否则会串包。"
  }
]

export const COVER_ASKS: MoreAsk[] = [
  {"id":"k1-1","pointId":"cv-js-what-it-is","stem":"HTML 画出结构、CSS 画出样子之后，按钮被点、列表被改，是哪一门语言在做？","texts":["得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","是 JavaScript。它是网页里用来写行为的编程语言。","下标从 0 开始。push 把元素加到末尾并增大 length。","写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。"],"answer":"b","explain":"是 JavaScript。它是网页里用来写行为的编程语言。语言标准叫 ECMAScript。","whyWrong":{"a":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。","c":"这一句是「数组按下标存放值，length 会随 push 变大」的结论，答的不是这一问。","d":"这一句是「对象用属性名存放值，点号和方括号都能读」的结论，答的不是这一问。"}},
  {"id":"k1-2","pointId":"cv-js-run-in-page","stem":"一段 JavaScript 怎样出现在浏览器已经打开的那份 HTML 里？","texts":["得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","写在 script 元素里，或用 src 指向一个 .js 文件。","它是字符串原始值。length 是长度。","写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。"],"answer":"b","explain":"写在 script 元素里，或用 src 指向一个 .js 文件。模块脚本把 type 写成 module。","whyWrong":{"a":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。","c":"这一句是「字符串是原始值，引号里的内容用 length 量长度」的结论，答的不是这一问。","d":"这一句是「对象用属性名存放值，点号和方括号都能读」的结论，答的不是这一问。"}},
  {"id":"k1-3","pointId":"cv-js-not-java-around","stem":"名字里有 Java，是不是同一门语言？类型标注要写在哪一层？","texts":["会再赋值就用 let。名字不能再指向别的值就用 const。","不是。JavaScript 和 Java 是两门语言。","得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","它是字符串原始值。length 是长度。"],"answer":"b","explain":"不是。JavaScript 和 Java 是两门语言。类型标注写在 TypeScript 里，编译后仍是 JavaScript。","whyWrong":{"a":"这一句是「let 可以再赋值，const 不能把名字指到别处」的结论，答的不是这一问。","c":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。","d":"这一句是「字符串是原始值，引号里的内容用 length 量长度」的结论，答的不是这一问。"}},
  {"id":"k1-4","pointId":"cv-js-value-kinds","stem":"一段数据放进变量之后，怎样知道它是数字、字符串还是对象？","texts":["写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。","原始值是 undefined、null、boolean、number、bigint、string、symbol。","依赖要比值身份。NaN、±0、新对象各有规则；依赖整份对象会因每次新身份反复触发。","class 方法挂在原型上共享；实例字段各自一份。类型看原型链，不比类名字符串。"],"answer":"b","explain":"原始值是 undefined、null、boolean、number、bigint、string、symbol。其余日常用的数组、函数和普通对象都是对象。typeof 返回这一大类的名字。","whyWrong":{"a":"这一句是「对象用属性名存放值，点号和方括号都能读」的结论，答的不是这一问。","c":"这一句是「相等、身份与 Object.is」的结论，答的不是这一问。","d":"这一句是「class 只是原型链的写法」的结论，答的不是这一问。"}},
  {"id":"k1-5","pointId":"cv-js-let-const-decl","stem":"声明一个会变的计数，和声明一个不能换掉的名字，各用哪个？","texts":["不是。JavaScript 和 Java 是两门语言。","会再赋值就用 let。名字不能再指向别的值就用 const。","得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。"],"answer":"b","explain":"会再赋值就用 let。名字不能再指向别的值就用 const。const 并不冻住对象里的字段。","whyWrong":{"a":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。","c":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。","d":"这一句是「对象用属性名存放值，点号和方括号都能读」的结论，答的不是这一问。"}},
  {"id":"k1-6","pointId":"cv-js-number-ieee","stem":"5 / 2 在 JavaScript 里得到什么？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。算失败的结果是 NaN。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k1-7","pointId":"cv-js-string-length","stem":"\"CNY\" 是对象吗？怎样知道它有几个字符？","texts":["写在 script 元素里，或用 src 指向一个 .js 文件。","它是字符串原始值。length 是长度。","不是。JavaScript 和 Java 是两门语言。","得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。"],"answer":"b","explain":"它是字符串原始值。length 是长度。用 + 连接会得到一个新字符串。","whyWrong":{"a":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","c":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。","d":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。"}},
  {"id":"k1-8","pointId":"cv-js-array-grows","stem":"创建一个空数组之后，怎样放进第一个元素？越界读取会抛错吗？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","下标从 0 开始。push 把元素加到末尾并增大 length。","不是。JavaScript 和 Java 是两门语言。","得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。"],"answer":"b","explain":"下标从 0 开始。push 把元素加到末尾并增大 length。越过末尾去读，得到 undefined，不抛错。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。","d":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。"}},
  {"id":"k1-9","pointId":"cv-js-object-property","stem":"订单号和金额怎样放在同一个值里？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。没有这个属性时得到 undefined。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k1-10","pointId":"cv-js-function-return","stem":"怎样把“按分算金额”写成可以反复调用的一段？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","用 function 声明。调用时圆括号里的值按顺序对上参数。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"用 function 声明。调用时圆括号里的值按顺序对上参数。return 把结果交回调用处。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k2-1","pointId":"cv-js-if-falsy","stem":"if (count) 在 count 为 0 时，为什么走进了 else？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","if 不要求条件已经是布尔值。0、空字符串、null、undefined、NaN 和 false 都算假，所以 0 会走进 else。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"if 不要求条件已经是布尔值。0、空字符串、null、undefined、NaN 和 false 都算假，所以 0 会走进 else。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k2-2","pointId":"cv-js-for-while-break","stem":"想把 0、1、2 加起来，但跳过 1，循环该怎么写？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","for 或 while 在条件为真时重复。continue 跳过这一轮剩下的语句，break 离开整个循环。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"for 或 while 在条件为真时重复。continue 跳过这一轮剩下的语句，break 离开整个循环。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k2-3","pointId":"cv-js-try-catch-throw","stem":"读金额失败时，怎样把失败交到调用这段代码的地方？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","throw 抛出一个值，通常是 Error。try 外面的 catch 接到它。","不是。JavaScript 和 Java 是两门语言。","会再赋值就用 let。名字不能再指向别的值就用 const。"],"answer":"b","explain":"throw 抛出一个值，通常是 Error。try 外面的 catch 接到它。函数签名上不用写 throws。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。","d":"这一句是「let 可以再赋值，const 不能把名字指到别处」的结论，答的不是这一问。"}},
  {"id":"k2-4","pointId":"cv-js-switch-strict","stem":"case 1 里没有 break，为什么 case 2 的赋值也执行了？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","switch 用 === 匹配。匹配之后会继续执行后面的语句，直到 break。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"switch 用 === 匹配。匹配之后会继续执行后面的语句，直到 break。这一支要停住，就写 break。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k2-5","pointId":"cv-js-equality","stem":"两个看起来一样的对象，为什么依赖数组每次都认为变了？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","依赖要比值身份。NaN、±0、新对象各有规则；依赖整份对象会因每次新身份反复触发。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"依赖要比值身份。NaN、±0、新对象各有规则；依赖整份对象会因每次新身份反复触发。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k2-6","pointId":"cv-es6-const-binding","stem":"为什么 const 声明的订单改了金额，运行却没有报错？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","const 管的是绑定不能换目标，不冻结对象字段。要字段不可改用 freeze 或只读类型。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"const 管的是绑定不能换目标，不冻结对象字段。要字段不可改用 freeze 或只读类型。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k2-7","pointId":"cv-es6-destructure-copies","stem":"为什么从对象里解构出 price 之后，再改对象，变量却不变？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","解构出的基本类型是拷贝；对象/数组取出的是同一引用。默认值只替换 undefined。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"解构出的基本类型是拷贝；对象/数组取出的是同一引用。默认值只替换 undefined。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k2-8","pointId":"cv-es6-default-param-call-time","stem":"为什么默认参数写成一个数组，每次没传时都是新的？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","默认参数在调用时求值。省略或传 undefined 会再造一份，null 不会触发默认。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"默认参数在调用时求值。省略或传 undefined 会再造一份，null 不会触发默认。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k2-9","pointId":"cv-es6-template-expression","stem":"为什么反引号里放一个对象，页面上出现的是 [object Object]？","texts":["会再赋值就用 let。名字不能再指向别的值就用 const。","模板会调用 toString。对象常变成 [object Object]，应插入具体字段。","得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","switch 用 === 匹配。匹配之后会继续执行后面的语句，直到 break。"],"answer":"b","explain":"模板会调用 toString。对象常变成 [object Object]，应插入具体字段。","whyWrong":{"a":"这一句是「let 可以再赋值，const 不能把名字指到别处」的结论，答的不是这一问。","c":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。","d":"这一句是「switch 用严格相等匹配，没有 break 会继续往下」的结论，答的不是这一问。"}},
  {"id":"k2-10","pointId":"cv-js-scope-tdz","stem":"为什么在 let 声明前读取会报错，而 var 却是 undefined？","texts":["写在 script 元素里，或用 src 指向一个 .js 文件。","let/const 有暂时性死区，声明前读取抛错。var 提升后是 undefined。","得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","throw 抛出一个值，通常是 Error。try 外面的 catch 接到它。"],"answer":"b","explain":"let/const 有暂时性死区，声明前读取抛错。var 提升后是 undefined。","whyWrong":{"a":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","c":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。","d":"这一句是「throw 抛出一个值，catch 接住它」的结论，答的不是这一问。"}},
  {"id":"k3-1","pointId":"cv-js-this-callsite","stem":"把对象上的方法取出来再调用，为什么 this 变成了 undefined？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","this 看调用方式。拆出来单独调在严格模式是 undefined；箭头用定义处外层 this。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"this 看调用方式。拆出来单独调在严格模式是 undefined；箭头用定义处外层 this。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k3-2","pointId":"cv-js-prototype-chain","stem":"用 class 声明的方法，为什么所有实例共用一份？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","class 方法挂在原型上共享；实例字段各自一份。类型看原型链，不比类名字符串。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"class 方法挂在原型上共享；实例字段各自一份。类型看原型链，不比类名字符串。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k3-3","pointId":"cv-js-not-everything-object","stem":"图上写「万物皆对象、万物皆空」，还说每个对象都有 __proto__。为什么不对？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","不是万物皆对象。原始值 typeof 不是 object；null 也不是对象。","写在 script 元素里，或用 src 指向一个 .js 文件。","会再赋值就用 let。名字不能再指向别的值就用 const。"],"answer":"b","explain":"不是万物皆对象。原始值 typeof 不是 object；null 也不是对象。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「let 可以再赋值，const 不能把名字指到别处」的结论，答的不是这一问。"}},
  {"id":"k3-4","pointId":"cv-js-arrow-has-no-prototype","stem":"图上写「只要是构造函数就有 prototype，原型对象都是 Object 构造出来的」。为什么不准确？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","箭头与 bind 后的函数没有 prototype，不能当构造函数。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"箭头与 bind 后的函数没有 prototype，不能当构造函数。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k3-5","pointId":"cv-js-class-extends-super","stem":"为什么子类构造函数里先写 this.name = x 会直接报错？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","子类构造必须先 super 再碰 this。静态里 super 指向父类构造函数。","不是。JavaScript 和 Java 是两门语言。","写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。"],"answer":"b","explain":"子类构造必须先 super 再碰 this。静态里 super 指向父类构造函数。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。","d":"这一句是「对象用属性名存放值，点号和方括号都能读」的结论，答的不是这一问。"}},
  {"id":"k3-6","pointId":"cv-js-private-field-hash","stem":"实例上写 obj.#x 或 obj[\"#x\"] 都读不到。为什么下划线也不能当私有？","texts":["会再赋值就用 let。名字不能再指向别的值就用 const。","运行时私有是 # 字段。下划线挡不住；TS private 默认擦掉后也不挡。","得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","它是字符串原始值。length 是长度。"],"answer":"b","explain":"运行时私有是 # 字段。下划线挡不住；TS private 默认擦掉后也不挡。","whyWrong":{"a":"这一句是「let 可以再赋值，const 不能把名字指到别处」的结论，答的不是这一问。","c":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。","d":"这一句是「字符串是原始值，引号里的内容用 length 量长度」的结论，答的不是这一问。"}},
  {"id":"k3-7","pointId":"cv-es6-rest-spread-position","stem":"为什么同样三个点，有时得到一个数组，有时却把数组拆开？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","剩余参数收成数组，展开把数组拆开。剩余参数必须在末尾。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"剩余参数收成数组，展开把数组拆开。剩余参数必须在末尾。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k3-8","pointId":"cv-es6-map-set-keys","stem":"为什么用两个不同的对象当字典的键，后面的值盖掉了前面的？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","普通对象键会变成字符串，不同对象可能撞键。Map 用引用当键互不覆盖。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"普通对象键会变成字符串，不同对象可能撞键。Map 用引用当键互不覆盖。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k3-9","pointId":"cv-es6-symbol-key","stem":"为什么加了一个描述也叫 id 的 Symbol，Object.keys 却看不见它？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","Symbol 键互不相等，Object.keys 看不见。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"Symbol 键互不相等，Object.keys 看不见。要用 getOwnPropertySymbols 或 for。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k3-10","pointId":"cv-js-optional-chaining","stem":"写了 user?.profile?.name 之后，接口 500 也看不见了。为什么可选链代替不了错误处理？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","?. 只在中间为 null/undefined 时短路。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"?. 只在中间为 null/undefined 时短路。方法不是函数仍抛错；也不代替 Promise.catch。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k4-1","pointId":"cv-js-proxy-get-set-trap","stem":"用 Proxy 包住对象后，直接改原对象，代理上的 set 为什么不跑？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","只有经代理的操作进陷阱。直接改原对象不触发；响应式必须持有代理引用。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"只有经代理的操作进陷阱。直接改原对象不触发；响应式必须持有代理引用。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k4-2","pointId":"cv-eventloop","stem":"Promise.then 里的日志，为什么总在当前函数的日志之后、setTimeout 之前？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","微任务在同步之后、宏任务之前清空。then 早于 setTimeout(0)。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"微任务在同步之后、宏任务之前清空。then 早于 setTimeout(0)。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k4-3","pointId":"cv-js-microtask-vs-macrotask","stem":"为什么 Promise.then 里的日志总比 setTimeout(0) 早，有人却说两者都是“异步”？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","两者都叫异步但分属微任务与宏任务队列。then 通常早于 setTimeout(0)。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"两者都叫异步但分属微任务与宏任务队列。then 通常早于 setTimeout(0)。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k4-4","pointId":"cv-promise-all-and-settled","stem":"三个并行请求里有一个 500，为什么用 Promise.all 时另外两个结果也拿不到？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","all 一失败就整组拒绝。要分别记账用 allSettled；race 只取最快落定的一个。","不是。JavaScript 和 Java 是两门语言。","得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。"],"answer":"b","explain":"all 一失败就整组拒绝。要分别记账用 allSettled；race 只取最快落定的一个。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。","d":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。"}},
  {"id":"k4-5","pointId":"cv-es6-for-of-iterable","stem":"为什么 for...in 遍历数组会得到下标，还会带上原型上的名字？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","for...of 走迭代协议拿值；for...in 枚举键且含可枚举原型名。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"for...of 走迭代协议拿值；for...in 枚举键且含可枚举原型名。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k4-6","pointId":"cv-js-iteration-protocol","stem":"为什么有的对象能 for-of，有的却报不是 iterable？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","能 for-of 的对象要实现迭代器方法。普通对象默认不是 iterable。","写在 script 元素里，或用 src 指向一个 .js 文件。","用 function 声明。调用时圆括号里的值按顺序对上参数。"],"answer":"b","explain":"能 for-of 的对象要实现迭代器方法。普通对象默认不是 iterable。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「function 划出一段可调用的代码，return 把值交回去」的结论，答的不是这一问。"}},
  {"id":"k4-7","pointId":"cv-js-generator-yield-pause","stem":"写了 function* 还要 next()。为什么直接调用并不自动跑完全部 yield？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","调用生成器只得到对象，要用 next/for-of 推进。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"调用生成器只得到对象，要用 next/for-of 推进。默认同步，不是自动异步。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k4-8","pointId":"cv-js-async-generator-for-await","stem":"为什么对 async function* 写 for (const x of g()) 会报错或行为不对？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","async 生成器用 for await...of。同步 for-of 不对。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"async 生成器用 for await...of。同步 for-of 不对。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k4-9","pointId":"cv-js-weakmap-lifetime","stem":"把 DOM 节点当 Map 的键缓存数据，节点删了为什么内存还在？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","Map 强引用键会挡住回收。DOM 节点旁路缓存用 WeakMap。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"Map 强引用键会挡住回收。DOM 节点旁路缓存用 WeakMap。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k4-10","pointId":"cv-js-regex-dot-not-newline","stem":"为什么把正则背成“. 匹配任意单个字符、\\d 就是 [0-9]”会在开了 Unicode 或 DOTALL 时出错？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","默认点号不匹配换行。要跨行开 s/DOTALL；\\d 也不等于永远 [0-9]。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"默认点号不匹配换行。要跨行开 s/DOTALL；\\d 也不等于永远 [0-9]。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k5-1","pointId":"cv-js-json-stringify-not-equal","stem":"为什么用 JSON.stringify(a)===JSON.stringify(b) 判断对象相等会漏 NaN、undefined 和键顺序？","texts":["switch 用 === 匹配。匹配之后会继续执行后面的语句，直到 break。","stringify 会丢 undefined/函数、把 NaN 写成 null，且键顺序影响字符串。","剩余参数收成数组，展开把数组拆开。剩余参数必须在末尾。","Symbol 键互不相等，Object.keys 看不见。"],"answer":"b","explain":"stringify 会丢 undefined/函数、把 NaN 写成 null，且键顺序影响字符串。","whyWrong":{"a":"这一句是「switch 用严格相等匹配，没有 break 会继续往下」的结论，答的不是这一问。","c":"这一句是「剩余参数收在末尾，展开用在调用和字面量里」的结论，答的不是这一问。","d":"这一句是「Symbol 是不会和字符串键撞名的键」的结论，答的不是这一问。"}},
  {"id":"k5-2","pointId":"cv-closure","stem":"同一次点击里三次 setCount(count + 1)，为什么经常只加 1？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","同一次事件里多次 setState(count+1) 常基于同一快照。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"同一次事件里多次 setState(count+1) 常基于同一快照。要连加用更新函数。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k5-3","pointId":"cv-ts-what-it-is","stem":"要在编写时标出参数和返回值的类型，用的是哪一层？","texts":["得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","用 TypeScript。它是带类型语法的 JavaScript。","下标从 0 开始。push 把元素加到末尾并增大 length。","写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。"],"answer":"b","explain":"用 TypeScript。它是带类型语法的 JavaScript。类型在编译时检查，不代替运行时的值。","whyWrong":{"a":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。","c":"这一句是「数组按下标存放值，length 会随 push 变大」的结论，答的不是这一问。","d":"这一句是「对象用属性名存放值，点号和方括号都能读」的结论，答的不是这一问。"}},
  {"id":"k5-4","pointId":"cv-ts-compile-to-js","stem":"浏览器和 Node 要执行的是哪一种文件？.ts 怎样变成它？","texts":["得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。","执行的是 JavaScript。tsc 读取 .ts，检查类型，写出 .js。","它是字符串原始值。length 是长度。","下标从 0 开始。push 把元素加到末尾并增大 length。"],"answer":"b","explain":"执行的是 JavaScript。tsc 读取 .ts，检查类型，写出 .js。类型标注在这一步被拿掉。","whyWrong":{"a":"这一句是「普通数字都是 number，除法会留下小数」的结论，答的不是这一问。","c":"这一句是「字符串是原始值，引号里的内容用 length 量长度」的结论，答的不是这一问。","d":"这一句是「数组按下标存放值，length 会随 push 变大」的结论，答的不是这一问。"}},
  {"id":"k5-5","pointId":"cv-ts-not-runtime-check","stem":"接口返回的 JSON 已经标成 User，运行时还会不会按这个类型拦住错误字段？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","不会。类型在编译后消失。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"不会。类型在编译后消失。不可信的数据要在运行时自己检查，常用 unknown 再收窄。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k5-6","pointId":"cv-ts-type-annotation","stem":"怎样让一个变量只能放数字，放字符串时在运行前就失败？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","在名字后面写 : number。对不上的赋值会在编译时失败。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"在名字后面写 : number。对不上的赋值会在编译时失败。这些标注不会留在生成的 JavaScript 里。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k5-7","pointId":"cv-ts-object-array-type","stem":"订单要有一个数字金额，列表里的每一项都是字符串，类型怎么写？","texts":["switch 用 === 匹配。匹配之后会继续执行后面的语句，直到 break。","对象写成 { amount: number }。数组写成 string[]。","class 方法挂在原型上共享；实例字段各自一份。类型看原型链，不比类名字符串。","all 一失败就整组拒绝。要分别记账用 allSettled；race 只取最快落定的一个。"],"answer":"b","explain":"对象写成 { amount: number }。数组写成 string[]。多写的字段能不能过，还要看是不是对象字面量。","whyWrong":{"a":"这一句是「switch 用严格相等匹配，没有 break 会继续往下」的结论，答的不是这一问。","c":"这一句是「class 只是原型链的写法」的结论，答的不是这一问。","d":"这一句是「Promise.all 一拒绝就全停；要等全部结束用 allSettled」的结论，答的不是这一问。"}},
  {"id":"k5-8","pointId":"cv-ts-union-annotation","stem":"金额有时是数字，有时还没有，类型怎么写才不会把它当成永远有数？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","写成 number | null。使用之前要先判断是哪一种。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"写成 number | null。使用之前要先判断是哪一种。可选字段读出来会带上 undefined。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k5-9","pointId":"cv-ts-unknown","stem":"接口返回值的形状不可信，为什么不直接写成 any？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","不可信数据用 unknown，先收窄再当具体类型。any 会把错误往后传。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"不可信数据用 unknown，先收窄再当具体类型。any 会把错误往后传。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"k5-10","pointId":"cv-ts-const-readonly","stem":"变量用了 const，为什么对象里的字段还能改？","texts":["是 JavaScript。它是网页里用来写行为的编程语言。","const 只锁绑定。字段要只读加类型或 freeze；类型挡不住任意绕过。","写在 script 元素里，或用 src 指向一个 .js 文件。","不是。JavaScript 和 Java 是两门语言。"],"answer":"b","explain":"const 只锁绑定。字段要只读加类型或 freeze；类型挡不住任意绕过。","whyWrong":{"a":"这一句是「JavaScript 是给网页加行为的编程语言」的结论，答的不是这一问。","c":"这一句是「脚本通过 script 进入已经打开的文档」的结论，答的不是这一问。","d":"这一句是「JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript」的结论，答的不是这一问。"}},
  {"id":"br1-1","pointId":"cv-css-what-it-is","stem":"一份 HTML 已经有标题和按钮，字号、颜色和排列写在哪一种语言里？","texts":["选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","p 匹配所有段落。 .price 匹配带这个类的元素。","content-box 的 padding/border 加在 width 外。"],"answer":"b","explain":"写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。一条规则由选择器和一组声明组成。","whyWrong":{"a":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","c":"这一句是「类型、类和 id 选择器匹配的范围不同」的结论，答的不是这一问。","d":"这一句是「width 含不含 padding」的结论，答的不是这一问。"}},
  {"id":"br1-2","pointId":"cv-css-attach-to-document","stem":"写好的 CSS 怎样作用到已经打开的那份 HTML 上？","texts":["祖先 transform 等会改写 fixed 的包含块，不再贴视口。","用 link 引入外部样式表，或用 style 元素写在文档里。","层叠先比来源/重要性/层，再比选择器权重，最后才是顺序。","不是。不是所有布局都该改成 Grid。"],"answer":"b","explain":"用 link 引入外部样式表，或用 style 元素写在文档里。选择器按这份文档里的元素匹配。","whyWrong":{"a":"这一句是「fixed 不一定相对视口」的结论，答的不是这一问。","c":"这一句是「层叠、权重与样式覆盖」的结论，答的不是这一问。","d":"这一句是「Flex 排一条轴，Grid 排行列」的结论，答的不是这一问。"}},
  {"id":"br1-3","pointId":"cv-css-not-the-engine","stem":"写了 display:flex 之后，谁去算每个盒子的宽高，谁去画到屏幕上？","texts":["选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","p 匹配所有段落。 .price 匹配带这个类的元素。","absolute 相对最近非 static 祖先；找不到就相对初始包含块。"],"answer":"b","explain":"CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。这两步由浏览器做。","whyWrong":{"a":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","c":"这一句是「类型、类和 id 选择器匹配的范围不同」的结论，答的不是这一问。","d":"这一句是「定位如何脱离或锚定在文档流」的结论，答的不是这一问。"}},
  {"id":"br1-4","pointId":"cv-css-rule-syntax","stem":"想把段落文字改成蓝色，样式表里要写哪几部分？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","content-box 的 padding/border 加在 width 外。"],"answer":"b","explain":"选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。后面的规则怎样盖过前面的，由层叠决定。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「width 含不含 padding」的结论，答的不是这一问。"}},
  {"id":"br1-5","pointId":"cv-css-selector-simple","stem":"页面上有很多价格，只想给带 price 类的那几个上色，选择器怎么写？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","p 匹配所有段落。 .price 匹配带这个类的元素。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","content-box 的 padding/border 加在 width 外。"],"answer":"b","explain":"p 匹配所有段落。 .price 匹配带这个类的元素。#order 匹配这一个 id。谁更优先见层叠。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「width 含不含 padding」的结论，答的不是这一问。"}},
  {"id":"br1-6","pointId":"cv-css-box-sizing","stem":"元素设了 width:100%，为什么一加 padding 就溢出父元素？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","content-box 的 padding/border 加在 width 外。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","p 匹配所有段落。 .price 匹配带这个类的元素。"],"answer":"b","explain":"content-box 的 padding/border 加在 width 外。border-box 把它们算进设定宽度。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","d":"这一句是「类型、类和 id 选择器匹配的范围不同」的结论，答的不是这一问。"}},
  {"id":"br1-7","pointId":"cv-css-position-flow","stem":"子元素设 absolute 后，为什么有时相对父级，有时相对整页？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","absolute 相对最近非 static 祖先；找不到就相对初始包含块。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"absolute 相对最近非 static 祖先；找不到就相对初始包含块。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br1-8","pointId":"cv-css-containing-block","stem":"元素写了 position:fixed，为什么没有贴在窗口上？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","祖先 transform 等会改写 fixed 的包含块，不再贴视口。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"祖先 transform 等会改写 fixed 的包含块，不再贴视口。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"br1-9","pointId":"cv-css-cascade","stem":"一个更长的选择器为什么有时仍赢不了另一条规则？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","层叠先比来源/重要性/层，再比选择器权重，最后才是顺序。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"层叠先比来源/重要性/层，再比选择器权重，最后才是顺序。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"br1-10","pointId":"cv-css-stacking","stem":"子元素 z-index:9999 为什么仍盖不过旁边的弹层？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","content-box 的 padding/border 加在 width 外。"],"answer":"b","explain":"先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。子元素的 9999 只在 A 内部竞争，不能越过 A 去跟 B 比。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「width 含不含 padding」的结论，答的不是这一问。"}},
  {"id":"br2-1","pointId":"cv-css-flex","stem":"两个 width 相同的 Flex 子项，最终宽度为什么可能不同？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","先看 flex-basis 形成的初始主轴尺寸，再按 grow 和 shrink 分配多余或不足的空间。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","祖先 transform 等会改写 fixed 的包含块，不再贴视口。"],"answer":"b","explain":"先看 flex-basis 形成的初始主轴尺寸，再按 grow 和 shrink 分配多余或不足的空间。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","d":"这一句是「fixed 不一定相对视口」的结论，答的不是这一问。"}},
  {"id":"br2-2","pointId":"cv-css-grid-flex","stem":"页面布局是不是都应该改成 Grid？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","不是。不是所有布局都该改成 Grid。","用 link 引入外部样式表，或用 style 元素写在文档里。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"不是。不是所有布局都该改成 Grid。一条轴上的控件用 Flex，二维轨道用 Grid。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br2-3","pointId":"cv-css-container-query","stem":"卡片在侧栏里变窄了，为什么媒体查询还按整页宽度给宽屏样式？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","两处都用媒体查询时，主栏和侧栏的卡片跟着视口一起变，窄侧栏里也会横排。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"两处都用媒体查询时，主栏和侧栏的卡片跟着视口一起变，窄侧栏里也会横排。改成容器查询后，宽主栏里的卡片横排，窄于阈值的侧栏仍上下排。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"br2-4","pointId":"cv-css-has-parent","stem":"表单里出现错误提示时，为什么以前必须靠 JS 给外层加 class？","texts":["选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","article:has(.error) 在错误节点出现时给卡片换边框，节点移除后样式回到原样。","层叠先比来源/重要性/层，再比选择器权重，最后才是顺序。","先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。"],"answer":"b","explain":"article:has(.error) 在错误节点出现时给卡片换边框，节点移除后样式回到原样。","whyWrong":{"a":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","c":"这一句是「层叠、权重与样式覆盖」的结论，答的不是这一问。","d":"这一句是「层叠上下文与 z-index」的结论，答的不是这一问。"}},
  {"id":"br2-5","pointId":"cv-css-aspect-ratio","stem":"图片没设高度，加载完成后为什么整页往下跳？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","图片没占位时，加载完成后高度突然变大，下面内容会被顶下去。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"图片没占位时，加载完成后高度突然变大，下面内容会被顶下去。用宽高比或固定尺寸先留出空间。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"br2-6","pointId":"cv-browser-what-it-is","stem":"地址栏里输入网址之后，谁去取回 HTML，谁把它变成可以点的页面？","texts":["选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","浏览器作为用户代理发出请求、取回文档，再解析成 DOM，套上 CSS，跑脚本，画到窗口里。","p 匹配所有段落。 .price 匹配带这个类的元素。","content-box 的 padding/border 加在 width 外。"],"answer":"b","explain":"浏览器作为用户代理发出请求、取回文档，再解析成 DOM，套上 CSS，跑脚本，画到窗口里。","whyWrong":{"a":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","c":"这一句是「类型、类和 id 选择器匹配的范围不同」的结论，答的不是这一问。","d":"这一句是「width 含不含 padding」的结论，答的不是这一问。"}},
  {"id":"br2-7","pointId":"cv-browser-document-enters","stem":"点开一个链接之后，页面上的元素从哪来？","texts":["CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","浏览器按网址导航，取出 HTML，解析成 DOM。脚本和样式都作用在这棵树上。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","p 匹配所有段落。 .price 匹配带这个类的元素。"],"answer":"b","explain":"浏览器按网址导航，取出 HTML，解析成 DOM。脚本和样式都作用在这棵树上。","whyWrong":{"a":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","c":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","d":"这一句是「类型、类和 id 选择器匹配的范围不同」的结论，答的不是这一问。"}},
  {"id":"br2-8","pointId":"cv-browser-not-node","stem":"同一段调用 document.getElementById 的脚本，放到 node 命令下跑，会怎样？","texts":["CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","会失败。Node.js 没有窗口，也没有文档。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","p 匹配所有段落。 .price 匹配带这个类的元素。"],"answer":"b","explain":"会失败。Node.js 没有窗口，也没有文档。文件和 HTTP 服务用 Node 自己的模块。","whyWrong":{"a":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","c":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","d":"这一句是「类型、类和 id 选择器匹配的范围不同」的结论，答的不是这一问。"}},
  {"id":"br2-9","pointId":"cv-dom-event-flow","stem":"点在按钮上，为什么父元素的监听器也会执行？","texts":["CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","祖先上的捕获监听最先执行，接着是目标上的监听，最后才是祖先和文档上的冒泡监听。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","p 匹配所有段落。 .price 匹配带这个类的元素。"],"answer":"b","explain":"祖先上的捕获监听最先执行，接着是目标上的监听，最后才是祖先和文档上的冒泡监听。stopPropagation 之后，其他节点不再收到这次事件，但同一按钮上还没跑的第二个监听仍然执行。","whyWrong":{"a":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","c":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","d":"这一句是「类型、类和 id 选择器匹配的范围不同」的结论，答的不是这一问。"}},
  {"id":"br2-10","pointId":"cv-html-dialog-modal","stem":"用绝对定位的 div 做弹层，为什么焦点还能跑到后面的按钮上？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","普通绝对定位 div 不会自动困住焦点。用 dialog.showModal，Tab 留在框内，Esc 可关，背景不再点。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"普通绝对定位 div 不会自动困住焦点。用 dialog.showModal，Tab 留在框内，Esc 可关，背景不再点。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"br3-1","pointId":"cv-html5-constraint-before-submit","stem":"为什么邮箱格式不对，提交按钮的监听却一次都没执行？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","按钮和 requestSubmit() 在校验失败时不触发 submit。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"按钮和 requestSubmit() 在校验失败时不触发 submit。novalidate 或 formnovalidate 跳过校验。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br3-2","pointId":"cv-formdata-multipart-upload","stem":"为什么 fetch 上传文件时自己拼 Content-Type: multipart/... 反而传坏了？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","append 字段与文件，fetch POST body 用 FormData，不要手写 multipart Content-Type。","用 link 引入外部样式表，或用 style 元素写在文档里。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"append 字段与文件，fetch POST body 用 FormData，不要手写 multipart Content-Type。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br3-3","pointId":"cv-html5-main-landmark","stem":"为什么页头、正文、页脚都用 div，读屏的地标列表里却是空的？","texts":["选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","可见的 main 只有一个，并且不在 header、nav、article、aside、footer 里。","层叠先比来源/重要性/层，再比选择器权重，最后才是顺序。","先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。"],"answer":"b","explain":"可见的 main 只有一个，并且不在 header、nav、article、aside、footer 里。","whyWrong":{"a":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","c":"这一句是「层叠、权重与样式覆盖」的结论，答的不是这一问。","d":"这一句是「层叠上下文与 z-index」的结论，答的不是这一问。"}},
  {"id":"br3-4","pointId":"cv-html5-media-play-promise","stem":"为什么写了 autoplay，桌面上仍要点一下才有声音？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","带声音的 autoplay 被拒绝，元素停住。muted 和 playsinline 之后可以无声、页内播放。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","层叠先比来源/重要性/层，再比选择器权重，最后才是顺序。"],"answer":"b","explain":"带声音的 autoplay 被拒绝，元素停住。muted 和 playsinline 之后可以无声、页内播放。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「层叠、权重与样式覆盖」的结论，答的不是这一问。"}},
  {"id":"br3-5","pointId":"cv-html5-canvas-buffer","stem":"为什么把 canvas 的 CSS 拉到 600 像素，线却发糊，点击也对不准？","texts":["用 link 引入外部样式表，或用 style 元素写在文档里。","只改 CSS 时缓冲仍是 300×150，位图被拉伸。设置 width 和 height 属性后缓冲变大，已绘内容被清空，要重画。","p 匹配所有段落。 .price 匹配带这个类的元素。","absolute 相对最近非 static 祖先；找不到就相对初始包含块。"],"answer":"b","explain":"只改 CSS 时缓冲仍是 300×150，位图被拉伸。设置 width 和 height 属性后缓冲变大，已绘内容被清空，要重画。","whyWrong":{"a":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","c":"这一句是「类型、类和 id 选择器匹配的范围不同」的结论，答的不是这一问。","d":"这一句是「定位如何脱离或锚定在文档流」的结论，答的不是这一问。"}},
  {"id":"br3-6","pointId":"cv-html5-pushstate-popstate","stem":"为什么地址已经变成 /orders/2，监听 popstate 的函数却没运行？","texts":["CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","pushState 只改当前文档的地址和历史，不触发 popstate。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。","p 匹配所有段落。 .price 匹配带这个类的元素。"],"answer":"b","explain":"pushState 只改当前文档的地址和历史，不触发 popstate。后退或前进才触发，state 是存进去的那份克隆。","whyWrong":{"a":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","c":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。","d":"这一句是「类型、类和 id 选择器匹配的范围不同」的结论，答的不是这一问。"}},
  {"id":"br3-7","pointId":"cv-html5-dataset-string","stem":"为什么 data-count=\"3\" 取出来之后，加一变成了 31？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","直接相加得到 \"31\"。Number 转换后得到 4。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"直接相加得到 \"31\"。Number 转换后得到 4。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"br3-8","pointId":"cv-html5-picture-source","stem":"为什么同时写了 avif 和 jpg，网络里却只请求了 jpg？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","顺序在前且 media、type 都匹配的 source 被选中，后面的不请求。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"顺序在前且 media、type 都匹配的 source 被选中，后面的不请求。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br3-9","pointId":"cv-html5-drop-prevent-default","stem":"为什么 dragstart 里已经 setData，松手时 drop 监听却不执行？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","没有取消 dragover 的默认行为时，drop 不发生。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"没有取消 dragover 的默认行为时，drop 不发生。取消之后，getData 能取回同一类型的文本。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"br3-10","pointId":"cv-miniprogram-wx-if-not-wxif","stem":"为什么把小程序和 Vue 的差别写成“wx-if / 没有 body / getUserInfo 拿 unionId”会过时？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","if，冒号是指令前缀，不是 wx-if；列表是 wx:for。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"if，冒号是指令前缀，不是 wx-if；列表是 wx:for。划掉 getUserInfo 拿 unionId：用户身份现行是 wx.login 的 code 去换 openid 或 unionid，旧的弹窗授权已经废弃。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"br4-1","pointId":"cv-browser-event-loop-frame","stem":"为什么有时脚本不长，页面仍然掉帧？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","用性能记录标出脚本、布局和绘制谁最长。脚本最长是长任务占住主线程，输入和绘制都要等。","用 link 引入外部样式表，或用 style 元素写在文档里。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"用性能记录标出脚本、布局和绘制谁最长。脚本最长是长任务占住主线程，输入和绘制都要等。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br4-2","pointId":"cv-rendering","stem":"setState 返回之后，用户是不是已经看见新像素了？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","不是。setState 返回只表示更新已排队，用户这时还没看见新像素。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"不是。setState 返回只表示更新已排队，用户这时还没看见新像素。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"br4-3","pointId":"cv-layout","stem":"为什么循环里交替读尺寸、写样式可能很慢？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","交错读写时，Performance 里脚本旁边会出现重复的 Layout，因为每次读几何值前都要把刚弄脏的布局算完。","用 link 引入外部样式表，或用 style 元素写在文档里。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"交错读写时，Performance 里脚本旁边会出现重复的 Layout，因为每次读几何值前都要把刚弄脏的布局算完。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br4-4","pointId":"cv-session-storage-tab-only","stem":"为什么换一个标签打开同站，刚才 sessionStorage 里的向导进度没了？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","session 不跨标签；刷新常保留；关标签清空。local 同源共享且靠 storage 事件通知别人。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"session 不跨标签；刷新常保留；关标签清空。local 同源共享且靠 storage 事件通知别人。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br4-5","pointId":"cv-indexeddb-when-needed","stem":"为什么一上来就用 IndexedDB 存三个开关，最后读写比 localStorage 还难查？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","开关用 Web Storage。可查询离线大数据用 IndexedDB。","用 link 引入外部样式表，或用 style 元素写在文档里。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"开关用 Web Storage。可查询离线大数据用 IndexedDB。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br4-6","pointId":"cv-bfcache-pageshow","stem":"用户点后退，为什么有的页面还是离开前的滚动位置，onLoad 却没再执行？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","后退常从往返缓存恢复，不一定再跑 load。用 pageshow 看 persisted，别假定每次都重新挂载。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"后退常从往返缓存恢复，不一定再跑 load。用 pageshow 看 persisted，别假定每次都重新挂载。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br4-7","pointId":"cv-service-worker-stale","stem":"部署了新前端，为什么有人还在用昨天的脚本？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","新脚本装好后可能还在 waiting，旧 Worker 仍在接管。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"新脚本装好后可能还在 waiting，旧 Worker 仍在接管。用户会继续跑昨天的脚本，直到激活策略换人。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br4-8","pointId":"cv-sw-cache-strategy-pick","stem":"为什么静态脚本用缓存优先没问题，订单列表也 cache-first 就会出事？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","带哈希静态：cache-first。订单 API：网络优先/只网络。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"带哈希静态：cache-first。订单 API：网络优先/只网络。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br4-9","pointId":"cv-cors-credentials-allowlist","stem":"为什么 Spring 拦截器里把 Origin 原样写回并 Allow-Credentials=true，看起来能跨域，其实把登录态让出去了？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","带 Cookie 时不能把 Origin 无校验回写，也不能用 *。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。","选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。"],"answer":"b","explain":"带 Cookie 时不能把 Origin 无校验回写，也不能用 *。Allow-Origin 必须是明确的那一个源。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。","d":"这一句是「一条规则用选择器选中元素，用声明设置属性」的结论，答的不是这一问。"}},
  {"id":"br4-10","pointId":"cv-cors-preflight-max-age","stem":"为什么加了 Access-Control-Max-Age=86400 之后，有人以为以后都不用再配 CORS？","texts":["写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。","Max-Age 只缓存预检（OPTIONS）结论。实际响应仍要正确的 CORS 允许头。","用 link 引入外部样式表，或用 style 元素写在文档里。","CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。"],"answer":"b","explain":"Max-Age 只缓存预检（OPTIONS）结论。实际响应仍要正确的 CORS 允许头。","whyWrong":{"a":"这一句是「CSS 是描述文档怎么呈现的样式语言」的结论，答的不是这一问。","c":"这一句是「样式表挂到文档上，选择器才找得到元素」的结论，答的不是这一问。","d":"这一句是「CSS 描述呈现，排版和绘制由浏览器做」的结论，答的不是这一问。"}},
  {"id":"re1-1","pointId":"cv-react-what-it-is","stem":"页面上的按钮和整页，在 React 里由什么拼起来？","texts":["文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","Hook 按调用顺序挂在链表上。中间少调或多调一次，后面的 state 会对错节点。","key 决定节点身份。用下标时，state 跟位置走；用业务 id 时，state 跟这项业务走。"],"answer":"b","explain":"由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。标记用 JSX 写。","whyWrong":{"a":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。","c":"这一句是「链表、树与位运算」的结论，答的不是这一问。","d":"这一句是「key、身份与列表状态」的结论，答的不是这一问。"}},
  {"id":"re1-2","pointId":"cv-react-dom-mount","stem":"组件写好之后，怎样出现在浏览器页面上已经存在的那个节点里？","texts":["切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。","从 react-dom/client 取出 createRoot，对这个节点建根，再调用 root.render，把组件画进节点内部。","虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。","子路由画在父级的 Outlet 里，父级不卸载，侧栏状态才能留下。"],"answer":"b","explain":"从 react-dom/client 取出 createRoot，对这个节点建根，再调用 root.render，把组件画进节点内部。","whyWrong":{"a":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。","c":"这一句是「虚拟 DOM 保证的是下限，不是永远更快」的结论，答的不是这一问。","d":"这一句是「子路由画进父级的 Outlet，布局不用复制」的结论，答的不是这一问。"}},
  {"id":"re1-3","pointId":"cv-react-app-around-library","stem":"只装了 react 和 react-dom，页面地址和向服务器取数要自己找哪一类工具？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","写成一个大写开头的函数，return 里放要显示的元素。","调用时写成 cents={100}。函数的参数 props.cents 就是这个值。"],"answer":"b","explain":"文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。手机原生界面用 Expo。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。","d":"这一句是「props 是调用组件时传入的参数」的结论，答的不是这一问。"}},
  {"id":"re1-4","pointId":"cv-react-function-component","stem":"页面上的一段价格，在 React 里写成什么？","texts":["文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","写成一个大写开头的函数，return 里放要显示的元素。","Hook 按调用顺序挂在链表上。中间少调或多调一次，后面的 state 会对错节点。","key 决定节点身份。用下标时，state 跟位置走；用业务 id 时，state 跟这项业务走。"],"answer":"b","explain":"写成一个大写开头的函数，return 里放要显示的元素。JSX 会变成创建元素的调用，不是一段 HTML 字符串。","whyWrong":{"a":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。","c":"这一句是「链表、树与位运算」的结论，答的不是这一问。","d":"这一句是「key、身份与列表状态」的结论，答的不是这一问。"}},
  {"id":"re1-5","pointId":"cv-react-props-argument","stem":"同一个价格组件要显示 100 和 200，数字从哪里来？","texts":["文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","调用时写成 cents={100}。函数的参数 props.cents 就是这个值。","key 决定节点身份。用下标时，state 跟位置走；用业务 id 时，state 跟这项业务走。","切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。"],"answer":"b","explain":"调用时写成 cents={100}。函数的参数 props.cents 就是这个值。不要在组件里改 props。","whyWrong":{"a":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。","c":"这一句是「key、身份与列表状态」的结论，答的不是这一问。","d":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。"}},
  {"id":"re1-6","pointId":"cv-react-usestate-pair","stem":"按钮每点一次，数字要加 1，这个数字放在哪里？","texts":["多数情况应在渲染期直接用 props，或用 key 换身份重置。","用 useState(0) 取出当前值和更新函数。调用更新函数会安排组件再执行一次，这一次函数里的值不会当场变成新的。","Fiber 让渲染阶段可中断；提交阶段才改 DOM。它不是操作系统协程，也不负责 JIT 或修正 reflow。","虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。"],"answer":"b","explain":"用 useState(0) 取出当前值和更新函数。调用更新函数会安排组件再执行一次，这一次函数里的值不会当场变成新的。","whyWrong":{"a":"这一句是「props 变了不必先拷进 state 再 useEffect」的结论，答的不是这一问。","c":"这一句是「Fiber：可中断的渲染工作，不是操作系统协程」的结论，答的不是这一问。","d":"这一句是「虚拟 DOM 保证的是下限，不是永远更快」的结论，答的不是这一问。"}},
  {"id":"re1-7","pointId":"cv-linked-list","stem":"为什么 Hook 顺序会影响 state 身份？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","Hook 按调用顺序挂在链表上。中间少调或多调一次，后面的 state 会对错节点。","写成一个大写开头的函数，return 里放要显示的元素。","默认批处理不限合成事件。基于旧 count 的两次自增会入同一队列，结果仍只加 1；要连加要用更新函数。"],"answer":"b","explain":"Hook 按调用顺序挂在链表上。中间少调或多调一次，后面的 state 会对错节点。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。","d":"这一句是「setState 批处理：别再背 isBatchingUpdates（React 18）」的结论，答的不是这一问。"}},
  {"id":"re1-8","pointId":"cv-react-setstate-batch","stem":"资料说合成事件里异步批、setTimeout 里同步。为什么这套说法解释不了 React 19 里两次自增只加 1？","texts":["Hook 按调用顺序挂在链表上。中间少调或多调一次，后面的 state 会对错节点。","默认批处理不限合成事件。基于旧 count 的两次自增会入同一队列，结果仍只加 1；要连加要用更新函数。","key 决定节点身份。用下标时，state 跟位置走；用业务 id 时，state 跟这项业务走。","切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。"],"answer":"b","explain":"默认批处理不限合成事件。基于旧 count 的两次自增会入同一队列，结果仍只加 1；要连加要用更新函数。","whyWrong":{"a":"这一句是「链表、树与位运算」的结论，答的不是这一问。","c":"这一句是「key、身份与列表状态」的结论，答的不是这一问。","d":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。"}},
  {"id":"re1-9","pointId":"cv-controlled-input","stem":"输入框已经绑了 value，为什么打字打不进去？","texts":["切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。","受控输入的画面只听 value。变更函数不写回 state，或晚到的详情覆盖表单状态，字都留不住。","要在绘制前量布局、避免闪一帧时用 useLayoutEffect。","派生时会把本地更新打回 props。请求也不该放进已标 UNSAFE 的接收 props 方法；渲染期用 props 或用 key 重置。"],"answer":"b","explain":"受控输入的画面只听 value。变更函数不写回 state，或晚到的详情覆盖表单状态，字都留不住。","whyWrong":{"a":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。","c":"这一句是「useLayoutEffect 在绘制前，但不是无条件定理」的结论，答的不是这一问。","d":"这一句是「getDerivedStateFromProps 不是把 props 再存一份的默认通道（React 16.3）」的结论，答的不是这一问。"}},
  {"id":"re1-10","pointId":"cv-identity","stem":"列表用下标当 key，交换两项后输入框里的字为什么跟错了人？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","key 决定节点身份。用下标时，state 跟位置走；用业务 id 时，state 跟这项业务走。","写成一个大写开头的函数，return 里放要显示的元素。","调用时写成 cents={100}。函数的参数 props.cents 就是这个值。"],"answer":"b","explain":"key 决定节点身份。用下标时，state 跟位置走；用业务 id 时，state 跟这项业务走。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。","d":"这一句是「props 是调用组件时传入的参数」的结论，答的不是这一问。"}},
  {"id":"re2-1","pointId":"cv-effects","stem":"获取详情的请求写在 useEffect 里，为什么快速切换 id 后屏幕上是上一条的数据？","texts":["从 react-dom/client 取出 createRoot，对这个节点建根，再调用 root.render，把组件画进节点内部。","切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。","文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","写成一个大写开头的函数，return 里放要显示的元素。"],"answer":"b","explain":"切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。","whyWrong":{"a":"这一句是「react-dom 把组件放进已有的页面节点」的结论，答的不是这一问。","c":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。","d":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。"}},
  {"id":"re2-2","pointId":"cv-react-effect-timing","stem":"为什么不能写成：useEffect 总在改完像素之后，而且一定比 useLayoutEffect 晚？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","要在绘制前量布局、避免闪一帧时用 useLayoutEffect。","写成一个大写开头的函数，return 里放要显示的元素。","调用时写成 cents={100}。函数的参数 props.cents 就是这个值。"],"answer":"b","explain":"要在绘制前量布局、避免闪一帧时用 useLayoutEffect。默认副作用仍用 useEffect；服务端没有布局。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。","d":"这一句是「props 是调用组件时传入的参数」的结论，答的不是这一问。"}},
  {"id":"re2-3","pointId":"cv-react-context-stable","stem":"旧资料说 Context 还在实验、中间 shouldComponentUpdate 为 false 会丢更新。为什么这不能当 React 19 的答案？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","现行写法是 createContext、Provider 和 useContext。","虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。","子路由画在父级的 Outlet 里，父级不卸载，侧栏状态才能留下。"],"answer":"b","explain":"现行写法是 createContext、Provider 和 useContext。中间组件跳过渲染时，深层仍能读到新的 Context 值。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「虚拟 DOM 保证的是下限，不是永远更快」的结论，答的不是这一问。","d":"这一句是「子路由画进父级的 Outlet，布局不用复制」的结论，答的不是这一问。"}},
  {"id":"re2-4","pointId":"cv-react-props-state-sync","stem":"为什么「useState(props) 只在第一次生效，所以必须用 useEffect 同步 props」常常是错的？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","多数情况应在渲染期直接用 props，或用 key 换身份重置。","写成一个大写开头的函数，return 里放要显示的元素。","用 useState(0) 取出当前值和更新函数。调用更新函数会安排组件再执行一次，这一次函数里的值不会当场变成新的。"],"answer":"b","explain":"多数情况应在渲染期直接用 props，或用 key 换身份重置。用 Effect 把 props 抄进 state，容易先闪旧值再被覆盖。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。","d":"这一句是「useState 返回当前值和一个安排更新的函数」的结论，答的不是这一问。"}},
  {"id":"re2-5","pointId":"cv-react-gdsfp-copy","stem":"为什么用 getDerivedStateFromProps 把 props 写回 state，或把请求放进 componentWillReceiveProps，不能当现行默认？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","派生时会把本地更新打回 props。请求也不该放进已标 UNSAFE 的接收 props 方法；渲染期用 props 或用 key 重置。","文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","写成一个大写开头的函数，return 里放要显示的元素。"],"answer":"b","explain":"派生时会把本地更新打回 props。请求也不该放进已标 UNSAFE 的接收 props 方法；渲染期用 props 或用 key 重置。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。","d":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。"}},
  {"id":"re2-6","pointId":"cv-react-hooks-over-hoc","stem":"为什么「class 之后 mixins 不能用了，所以 HOC 完全等价替代」不够当现行答案？","texts":["文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","复用状态的现行默认是 Hook。HOC 会多一层包装并展开 props；Hook 在组件里直接取返回值。","写成一个大写开头的函数，return 里放要显示的元素。","key 决定节点身份。用下标时，state 跟位置走；用业务 id 时，state 跟这项业务走。"],"answer":"b","explain":"复用状态的现行默认是 Hook。HOC 会多一层包装并展开 props；Hook 在组件里直接取返回值。","whyWrong":{"a":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。","c":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。","d":"这一句是「key、身份与列表状态」的结论，答的不是这一问。"}},
  {"id":"re2-7","pointId":"cv-react-event-root","stem":"为什么「事件都绑在 document 上，所以要用 preventDefault 代替 stopPropagation」不能当 React 19 的答案？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","委托在根容器，不在 document。停止冒泡仍用 stopPropagation；取消默认行为才用 preventDefault。","文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。"],"answer":"b","explain":"委托在根容器，不在 document。停止冒泡仍用 stopPropagation；取消默认行为才用 preventDefault。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。","d":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。"}},
  {"id":"re2-8","pointId":"cv-react-fiber-interrupt","stem":"为什么把 Fiber 背成「操作系统协程，并顺便做 JIT、修正 reflow」容易误导？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","Fiber 让渲染阶段可中断；提交阶段才改 DOM。它不是操作系统协程，也不负责 JIT 或修正 reflow。","调用时写成 cents={100}。函数的参数 props.cents 就是这个值。","用 useState(0) 取出当前值和更新函数。调用更新函数会安排组件再执行一次，这一次函数里的值不会当场变成新的。"],"answer":"b","explain":"Fiber 让渲染阶段可中断；提交阶段才改 DOM。它不是操作系统协程，也不负责 JIT 或修正 reflow。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「props 是调用组件时传入的参数」的结论，答的不是这一问。","d":"这一句是「useState 返回当前值和一个安排更新的函数」的结论，答的不是这一问。"}},
  {"id":"re2-9","pointId":"cv-react-vdom-perf-bound","stem":"为什么“上了虚拟 DOM 就一定比直接操作 DOM 更快”不能当面试标准答案？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。","从 react-dom/client 取出 createRoot，对这个节点建根，再调用 root.render，把组件画进节点内部。","文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。"],"answer":"b","explain":"虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。小改文案和海量插入都要以实测为准。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「react-dom 把组件放进已有的页面节点」的结论，答的不是这一问。","d":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。"}},
  {"id":"re2-10","pointId":"cv-react-error-boundary","stem":"组件出错了，为什么错误边界有时完全看不到？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","错误边界只接渲染期间的抛错。事件回调和 Promise 拒绝要在各自路径上处理。","文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","写成一个大写开头的函数，return 里放要显示的元素。"],"answer":"b","explain":"错误边界只接渲染期间的抛错。事件回调和 Promise 拒绝要在各自路径上处理。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。","d":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。"}},
  {"id":"re3-1","pointId":"cv-react-version-checklist","stem":"为什么背「最新 React = Time Slicing + Suspense + Hooks，再加 useMutationEffect」对 React 19 不够？","texts":["切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。","useMutationEffect 等已不在现行清单。留下 createRoot、函数组件加 Hooks，以及 lazy、Suspense 与错误边界。","派生时会把本地更新打回 props。请求也不该放进已标 UNSAFE 的接收 props 方法；渲染期用 props 或用 key 重置。","虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。"],"answer":"b","explain":"useMutationEffect 等已不在现行清单。留下 createRoot、函数组件加 Hooks，以及 lazy、Suspense 与错误边界。","whyWrong":{"a":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。","c":"这一句是「getDerivedStateFromProps 不是把 props 再存一份的默认通道（React 16.3）」的结论，答的不是这一问。","d":"这一句是「虚拟 DOM 保证的是下限，不是永远更快」的结论，答的不是这一问。"}},
  {"id":"re3-2","pointId":"cv-react-createclass-gone","stem":"为什么把“函数组件、createClass、extends Component”并列为今天声明组件的三种方式会过时？","texts":["切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。","createClass 已移出核心包。今天默认是函数组件加 Hooks；类组件是仍支持的遗留写法。","要在绘制前量布局、避免闪一帧时用 useLayoutEffect。","多数情况应在渲染期直接用 props，或用 key 换身份重置。"],"answer":"b","explain":"createClass 已移出核心包。今天默认是函数组件加 Hooks；类组件是仍支持的遗留写法。","whyWrong":{"a":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。","c":"这一句是「useLayoutEffect 在绘制前，但不是无条件定理」的结论，答的不是这一问。","d":"这一句是「props 变了不必先拷进 state 再 useEffect」的结论，答的不是这一问。"}},
  {"id":"re3-3","pointId":"cv-react-eco-chapter-aim","stem":"react 包本身不管地址和取数，这一章补的是哪三类工具？","texts":["调用时写成 cents={100}。函数的参数 props.cents 就是这个值。","补路由、客户端状态和服务器状态。react 包只负责组件和把组件放进页面。","Hook 按调用顺序挂在链表上。中间少调或多调一次，后面的 state 会对错节点。","默认批处理不限合成事件。基于旧 count 的两次自增会入同一队列，结果仍只加 1；要连加要用更新函数。"],"answer":"b","explain":"补路由、客户端状态和服务器状态。react 包只负责组件和把组件放进页面。","whyWrong":{"a":"这一句是「props 是调用组件时传入的参数」的结论，答的不是这一问。","c":"这一句是「链表、树与位运算」的结论，答的不是这一问。","d":"这一句是「setState 批处理：别再背 isBatchingUpdates（React 18）」的结论，答的不是这一问。"}},
  {"id":"re3-4","pointId":"cv-react-router-element-api","stem":"为什么把 Switch、Route 的 component={About}、Redirect、activeClassName 当作现行默认 API 会过时？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","现行默认是 Routes、element 和 Navigate。","写成一个大写开头的函数，return 里放要显示的元素。","切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。"],"answer":"b","explain":"现行默认是 Routes、element 和 Navigate。Switch、component={About}、Redirect、activeClassName 是旧 API。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。","d":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。"}},
  {"id":"re3-5","pointId":"cv-react-router-error-element","stem":"loader 抛错之后，为什么整页白屏，而不是只坏这一段路由？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","loader 抛错若没有 errorElement，会整页失败。","写成一个大写开头的函数，return 里放要显示的元素。","用 useState(0) 取出当前值和更新函数。调用更新函数会安排组件再执行一次，这一次函数里的值不会当场变成新的。"],"answer":"b","explain":"loader 抛错若没有 errorElement，会整页失败。错误元素写在哪一层，失败就停在哪一层。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「函数组件返回要显示的元素」的结论，答的不是这一问。","d":"这一句是「useState 返回当前值和一个安排更新的函数」的结论，答的不是这一问。"}},
  {"id":"re3-6","pointId":"cv-rr-mode-gates-data","stem":"为什么路由上已经写了 loader，进入页面时组件仍然先空着？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","loader 只在 createBrowserRouter 这一档、于渲染前执行。","切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。","虚拟 DOM 保住协调的下限，不保证每次都比直接改 DOM 更快。"],"answer":"b","explain":"loader 只在 createBrowserRouter 这一档、于渲染前执行。外层仍是 BrowserRouter 时，组件会先空着。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。","d":"这一句是「虚拟 DOM 保证的是下限，不是永远更快」的结论，答的不是这一问。"}},
  {"id":"re3-7","pointId":"cv-rr-outlet-keeps-layout","stem":"为什么从仪表盘进到设置页，侧栏的折叠状态会丢？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","子路由画在父级的 Outlet 里，父级不卸载，侧栏状态才能留下。","从 react-dom/client 取出 createRoot，对这个节点建根，再调用 root.render，把组件画进节点内部。","调用时写成 cents={100}。函数的参数 props.cents 就是这个值。"],"answer":"b","explain":"子路由画在父级的 Outlet 里，父级不卸载，侧栏状态才能留下。两条平级各自复制侧栏，切换就会丢。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「react-dom 把组件放进已有的页面节点」的结论，答的不是这一问。","d":"这一句是「props 是调用组件时传入的参数」的结论，答的不是这一问。"}},
  {"id":"re3-8","pointId":"cv-rr-redirect-before-render","stem":"为什么未登录打开订单页，会先闪一下订单骨架，再进登录页？","texts":["调用时写成 cents={100}。函数的参数 props.cents 就是这个值。","在 loader 里 redirect，组件不会先渲染。","Hook 按调用顺序挂在链表上。中间少调或多调一次，后面的 state 会对错节点。","默认批处理不限合成事件。基于旧 count 的两次自增会入同一队列，结果仍只加 1；要连加要用更新函数。"],"answer":"b","explain":"在 loader 里 redirect，组件不会先渲染。放到 useEffect 里再跳转，会先闪订单骨架。","whyWrong":{"a":"这一句是「props 是调用组件时传入的参数」的结论，答的不是这一问。","c":"这一句是「链表、树与位运算」的结论，答的不是这一问。","d":"这一句是「setState 批处理：别再背 isBatchingUpdates（React 18）」的结论，答的不是这一问。"}},
  {"id":"re3-9","pointId":"cv-state-kind-picks-home","stem":"为什么订单列表、主题和弹层开放进了同一个 store，备注却不更新？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","主题、弹层、服务端列表不是同一种状态。塞进同一个 store 后，备注更新可能打不到真正存放它的地方。","文档建议新的网站或应用从框架开始。列出的是 Next.js，以及配上 Vite 的 React Router 框架模式。","调用时写成 cents={100}。函数的参数 props.cents 就是这个值。"],"answer":"b","explain":"主题、弹层、服务端列表不是同一种状态。塞进同一个 store 后，备注更新可能打不到真正存放它的地方。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「新的网站从框架开始，react 包负责界面」的结论，答的不是这一问。","d":"这一句是「props 是调用组件时传入的参数」的结论，答的不是这一问。"}},
  {"id":"re3-10","pointId":"cv-state-reducer-context-screen","stem":"为什么一个任务页就要新建 Redux store？","texts":["由组件拼起来。组件是一段有自己的逻辑和外观的界面，在代码里是返回标记的函数。","单页任务列表用 reducer 加 Context 就够。","切换 id 后，上一次请求仍可能返回。没有清理时，慢请求会写进已经离开的那一页。","要在绘制前量布局、避免闪一帧时用 useLayoutEffect。"],"answer":"b","explain":"单页任务列表用 reducer 加 Context 就够。多页多人同时改、规则已经复杂时，再上 Redux Toolkit。","whyWrong":{"a":"这一句是「React 是渲染用户界面的 JavaScript 库」的结论，答的不是这一问。","c":"这一句是「Effect、清理与提交时序」的结论，答的不是这一问。","d":"这一句是「useLayoutEffect 在绘制前，但不是无条件定理」的结论，答的不是这一问。"}},
  {"id":"vu1-1","pointId":"cv-vue-what-it-is","stem":"Vue 用什么描述要显示的 HTML，数据变了之后谁去改 DOM？","texts":["页面绑的是代理上的属性。改原始对象或解构出来的普通数字，都不会通知依赖。","模板按当前的 JavaScript 状态描述要输出的 HTML。","Proxy 只解决拦截面。响应式还要读写走代理、深层按需代理，以及真正的依赖订阅。","null 的 typeof 是 object，但仍不能作为 Proxy 目标。"],"answer":"b","explain":"模板按当前的 JavaScript 状态描述要输出的 HTML。Vue 跟踪这些状态，状态变了就更新 DOM。","whyWrong":{"a":"这一句是「Vue ref、reactive 与代理身份」的结论，答的不是这一问。","c":"这一句是「Proxy 取代 defineProperty，仍要拦在代理上」的结论，答的不是这一问。","d":"这一句是「手写 Proxy 要先守住 null 与类型边界」的结论，答的不是这一问。"}},
  {"id":"vu1-2","pointId":"cv-vue-create-app-mount","stem":"一个 Vue 应用挂到页面上的哪一块？","texts":["Proxy 只解决拦截面。响应式还要读写走代理、深层按需代理，以及真正的依赖订阅。","createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","null 的 typeof 是 object，但仍不能作为 Proxy 目标。","状态更新后 DOM 在微任务里才刷。同步立刻量到的仍是旧内容；要等 nextTick。"],"answer":"b","explain":"createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。之后这一块内部由 Vue 更新。","whyWrong":{"a":"这一句是「Proxy 取代 defineProperty，仍要拦在代理上」的结论，答的不是这一问。","c":"这一句是「手写 Proxy 要先守住 null 与类型边界」的结论，答的不是这一问。","d":"这一句是「Vue 更新批次与 nextTick」的结论，答的不是这一问。"}},
  {"id":"vu1-3","pointId":"cv-vue-app-around-core","stem":"换页面地址、多个页面共用的状态、正文要出现在服务端发出的 HTML 里，各用什么？","texts":["Proxy 只解决拦截面。响应式还要读写走代理、深层按需代理，以及真正的依赖订阅。","地址用 Vue Router，多个页面共用的状态用 Pinia。","null 的 typeof 是 object，但仍不能作为 Proxy 目标。","raw.push 走原生数组，不通知依赖。只有对代理的写入才会触发已经读过代理的 effect。"],"answer":"b","explain":"地址用 Vue Router，多个页面共用的状态用 Pinia。正文要出现在服务端发出的 HTML 里，用 Nuxt 这一类框架。vue 包负责组件、模板和响应式。","whyWrong":{"a":"这一句是「Proxy 取代 defineProperty，仍要拦在代理上」的结论，答的不是这一问。","c":"这一句是「手写 Proxy 要先守住 null 与类型边界」的结论，答的不是这一问。","d":"这一句是「数组 push 改的是原数组还是代理」的结论，答的不是这一问。"}},
  {"id":"vu1-4","pointId":"cv-vue-sfc-template","stem":"一个显示数字的 Vue 组件，模板和脚本各写什么？","texts":["页面绑的是代理上的属性。改原始对象或解构出来的普通数字，都不会通知依赖。","template 写结构和插值。script setup 里声明的名字可以直接写在模板里。","Proxy 只解决拦截面。响应式还要读写走代理、深层按需代理，以及真正的依赖订阅。","null 的 typeof 是 object，但仍不能作为 Proxy 目标。"],"answer":"b","explain":"template 写结构和插值。script setup 里声明的名字可以直接写在模板里。选项式和组合式怎么拆大组件是另一课。","whyWrong":{"a":"这一句是「Vue ref、reactive 与代理身份」的结论，答的不是这一问。","c":"这一句是「Proxy 取代 defineProperty，仍要拦在代理上」的结论，答的不是这一问。","d":"这一句是「手写 Proxy 要先守住 null 与类型边界」的结论，答的不是这一问。"}},
  {"id":"vu1-5","pointId":"cv-vue-ref-value","stem":"改了 count，模板为什么没有变？脚本里读的是 count 还是 count.value？","texts":["页面绑的是代理上的属性。改原始对象或解构出来的普通数字，都不会通知依赖。","要用 ref 包住会变的值。脚本里读写 .value。","null 的 typeof 是 object，但仍不能作为 Proxy 目标。","状态更新后 DOM 在微任务里才刷。同步立刻量到的仍是旧内容；要等 nextTick。"],"answer":"b","explain":"要用 ref 包住会变的值。脚本里读写 .value。模板里写 count，不用写 .value。","whyWrong":{"a":"这一句是「Vue ref、reactive 与代理身份」的结论，答的不是这一问。","c":"这一句是「手写 Proxy 要先守住 null 与类型边界」的结论，答的不是这一问。","d":"这一句是「Vue 更新批次与 nextTick」的结论，答的不是这一问。"}},
  {"id":"vu1-6","pointId":"cv-vue-reactivity","stem":"为什么改了原始对象，页面不一定更新？","texts":["模板按当前的 JavaScript 状态描述要输出的 HTML。","页面绑的是代理上的属性。改原始对象或解构出来的普通数字，都不会通知依赖。","template 写结构和插值。script setup 里声明的名字可以直接写在模板里。","要用 ref 包住会变的值。脚本里读写 .value。"],"answer":"b","explain":"页面绑的是代理上的属性。改原始对象或解构出来的普通数字，都不会通知依赖。","whyWrong":{"a":"这一句是「Vue 是构建用户界面的 JavaScript 框架」的结论，答的不是这一问。","c":"这一句是「单文件组件用 template 写要显示的结构」的结论，答的不是这一问。","d":"这一句是「ref 把值放在 value 上，模板里会自动拆开」的结论，答的不是这一问。"}},
  {"id":"vu1-7","pointId":"cv-vue-defineproperty-proxy","stem":"为什么「Proxy 能监听整个对象，所以比 defineProperty 全面更强，手写一个就等于 Vue 响应式」说不清？","texts":["模板按当前的 JavaScript 状态描述要输出的 HTML。","Proxy 只解决拦截面。响应式还要读写走代理、深层按需代理，以及真正的依赖订阅。","createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","地址用 Vue Router，多个页面共用的状态用 Pinia。"],"answer":"b","explain":"Proxy 只解决拦截面。响应式还要读写走代理、深层按需代理，以及真正的依赖订阅。","whyWrong":{"a":"这一句是「Vue 是构建用户界面的 JavaScript 框架」的结论，答的不是这一问。","c":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","d":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。"}},
  {"id":"vu1-8","pointId":"cv-vue-proxy-null-guard","stem":"为什么 typeof null 是 object，却不能 new Proxy(null)？手写 reactive 示例还缺什么？","texts":["模板按当前的 JavaScript 状态描述要输出的 HTML。","null 的 typeof 是 object，但仍不能作为 Proxy 目标。","createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","地址用 Vue Router，多个页面共用的状态用 Pinia。"],"answer":"b","explain":"null 的 typeof 是 object，但仍不能作为 Proxy 目标。示例若只有日志陷阱，也不等于依赖追踪与触发更新。","whyWrong":{"a":"这一句是「Vue 是构建用户界面的 JavaScript 框架」的结论，答的不是这一问。","c":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","d":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。"}},
  {"id":"vu1-9","pointId":"cv-vue-array-raw-proxy","stem":"raw 数组传给 reactive 后，为什么 raw.push() 与 proxy.push() 不是同一条响应式路径？","texts":["模板按当前的 JavaScript 状态描述要输出的 HTML。","raw.push 走原生数组，不通知依赖。只有对代理的写入才会触发已经读过代理的 effect。","地址用 Vue Router，多个页面共用的状态用 Pinia。","template 写结构和插值。script setup 里声明的名字可以直接写在模板里。"],"answer":"b","explain":"raw.push 走原生数组，不通知依赖。只有对代理的写入才会触发已经读过代理的 effect。","whyWrong":{"a":"这一句是「Vue 是构建用户界面的 JavaScript 框架」的结论，答的不是这一问。","c":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。","d":"这一句是「单文件组件用 template 写要显示的结构」的结论，答的不是这一问。"}},
  {"id":"vu1-10","pointId":"cv-vue-nexttick","stem":"修改 ref 后立刻读取 DOM，为什么可能还是旧内容？","texts":["createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","状态更新后 DOM 在微任务里才刷。同步立刻量到的仍是旧内容；要等 nextTick。","template 写结构和插值。script setup 里声明的名字可以直接写在模板里。","要用 ref 包住会变的值。脚本里读写 .value。"],"answer":"b","explain":"状态更新后 DOM 在微任务里才刷。同步立刻量到的仍是旧内容；要等 nextTick。","whyWrong":{"a":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","c":"这一句是「单文件组件用 template 写要显示的结构」的结论，答的不是这一问。","d":"这一句是「ref 把值放在 value 上，模板里会自动拆开」的结论，答的不是这一问。"}},
  {"id":"vu2-1","pointId":"cv-vue-props-one-way","stem":"在子组件里给 props 赋值，为什么父组件的数据没变，控制台却出现警告？","texts":["模板按当前的 JavaScript 状态描述要输出的 HTML。","props 由父传入，子组件直接赋值会警告且父数据不变。","createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","地址用 Vue Router，多个页面共用的状态用 Pinia。"],"answer":"b","explain":"props 由父传入，子组件直接赋值会警告且父数据不变。要改应 emit，由父写入自己的状态。","whyWrong":{"a":"这一句是「Vue 是构建用户界面的 JavaScript 框架」的结论，答的不是这一问。","c":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","d":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。"}},
  {"id":"vu2-2","pointId":"cv-vue-list-key","stem":"列表重排后输入值为什么可能留在原位置？","texts":["createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","没有稳定 key 时，输入状态按位置复用。重排后字会留在原格子上，串到另一项。","template 写结构和插值。script setup 里声明的名字可以直接写在模板里。","要用 ref 包住会变的值。脚本里读写 .value。"],"answer":"b","explain":"没有稳定 key 时，输入状态按位置复用。重排后字会留在原格子上，串到另一项。","whyWrong":{"a":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","c":"这一句是「单文件组件用 template 写要显示的结构」的结论，答的不是这一问。","d":"这一句是「ref 把值放在 value 上，模板里会自动拆开」的结论，答的不是这一问。"}},
  {"id":"vu2-3","pointId":"cv-vue-composition-options","stem":"复杂组件里，为什么不能把“改用 Composition API”说成解决所有问题？Options API 会被淘汰吗？","texts":["createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","Composition 便于按功能拆函数，不是淘汰 Options。","地址用 Vue Router，多个页面共用的状态用 Pinia。","要用 ref 包住会变的值。脚本里读写 .value。"],"answer":"b","explain":"Composition 便于按功能拆函数，不是淘汰 Options。Options 仍受支持；不能说换 API 就解决所有问题。","whyWrong":{"a":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","c":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。","d":"这一句是「ref 把值放在 value 上，模板里会自动拆开」的结论，答的不是这一问。"}},
  {"id":"vu2-4","pointId":"cv-vue-teleport-dom-not-logical","stem":"对话框已经写在按钮旁边，为什么固定定位还会被外层挡住？","texts":["模板按当前的 JavaScript 状态描述要输出的 HTML。","祖先若有 transform、perspective 或 filter，position: fixed 不再相对视口。","要用 ref 包住会变的值。脚本里读写 .value。","页面绑的是代理上的属性。改原始对象或解构出来的普通数字，都不会通知依赖。"],"answer":"b","explain":"祖先若有 transform、perspective 或 filter，position: fixed 不再相对视口。〔Teleport｜把模板片段渲染到组件 DOM 层次之外的内置组件〕把片段搬到 body。","whyWrong":{"a":"这一句是「Vue 是构建用户界面的 JavaScript 框架」的结论，答的不是这一问。","c":"这一句是「ref 把值放在 value 上，模板里会自动拆开」的结论，答的不是这一问。","d":"这一句是「Vue ref、reactive 与代理身份」的结论，答的不是这一问。"}},
  {"id":"vu2-5","pointId":"cv-vue-vnode-not-fragment","stem":"为什么「Vue 2 用 DocumentFragment 建虚拟 DOM，再用 defineProperty 完成全部响应式」对不上源码？","texts":["地址用 Vue Router，多个页面共用的状态用 Pinia。","虚拟 DOM 是 JS 对象描述的 VNode；DocumentFragment 是真实 DOM 容器。","template 写结构和插值。script setup 里声明的名字可以直接写在模板里。","要用 ref 包住会变的值。脚本里读写 .value。"],"answer":"b","explain":"虚拟 DOM 是 JS 对象描述的 VNode；DocumentFragment 是真实 DOM 容器。响应式也不止 defineProperty 那一句。","whyWrong":{"a":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。","c":"这一句是「单文件组件用 template 写要显示的结构」的结论，答的不是这一问。","d":"这一句是「ref 把值放在 value 上，模板里会自动拆开」的结论，答的不是这一问。"}},
  {"id":"vu2-6","pointId":"cv-vue-design-goals-proxy","stem":"为什么「Vue 3 更小更快，而且 Proxy 监听整个对象所以完全不用管深层」不够准确？","texts":["模板按当前的 JavaScript 状态描述要输出的 HTML。","未访问的嵌套对象不会立刻变成代理。体积、更新和首屏要分开看，不能收成一句更快。","createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","地址用 Vue Router，多个页面共用的状态用 Pinia。"],"answer":"b","explain":"未访问的嵌套对象不会立刻变成代理。体积、更新和首屏要分开看，不能收成一句更快。","whyWrong":{"a":"这一句是「Vue 是构建用户界面的 JavaScript 框架」的结论，答的不是这一问。","c":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","d":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。"}},
  {"id":"vu2-7","pointId":"cv-vue-tree-shake-options","stem":"为什么“用了 Composition API 就会自动剪掉无用代码”并不完整？","texts":["createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","树摇要 ESM、生产构建和无副作用标记。Options API 相关代码默认保留，除非显式关掉且工程里已无选项式组件。","地址用 Vue Router，多个页面共用的状态用 Pinia。","要用 ref 包住会变的值。脚本里读写 .value。"],"answer":"b","explain":"树摇要 ESM、生产构建和无副作用标记。Options API 相关代码默认保留，除非显式关掉且工程里已无选项式组件。","whyWrong":{"a":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","c":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。","d":"这一句是「ref 把值放在 value 上，模板里会自动拆开」的结论，答的不是这一问。"}},
  {"id":"vu2-8","pointId":"cv-vue-tree-shake-faster","stem":"为什么“Vue 3 引入 tree shaking 后，无用代码被剪掉，程序既更小又更快”不能整句当成结论？","texts":["模板按当前的 JavaScript 状态描述要输出的 HTML。","剪掉未使用代码主要减体积。更新是否变快要另测，不能和树摇写成同一个结论。","createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","地址用 Vue Router，多个页面共用的状态用 Pinia。"],"answer":"b","explain":"剪掉未使用代码主要减体积。更新是否变快要另测，不能和树摇写成同一个结论。","whyWrong":{"a":"这一句是「Vue 是构建用户界面的 JavaScript 框架」的结论，答的不是这一问。","c":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","d":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。"}},
  {"id":"vu2-9","pointId":"cv-vue-patch-hoist","stem":"为什么「用了静态标记，更新就不再比较、按钮事件也会直接复用」并不完整？","texts":["模板按当前的 JavaScript 状态描述要输出的 HTML。","标记和缓存有条件：监听捕获局部变量时不能缓存。静态提升与补丁标记要分开看编译结果。","createApp 创建应用实例，mount 把它挂到页面上已经写好的元素，例如 id 为 app 的节点。","地址用 Vue Router，多个页面共用的状态用 Pinia。"],"answer":"b","explain":"标记和缓存有条件：监听捕获局部变量时不能缓存。静态提升与补丁标记要分开看编译结果。","whyWrong":{"a":"这一句是「Vue 是构建用户界面的 JavaScript 框架」的结论，答的不是这一问。","c":"这一句是「createApp 把应用挂到已有的页面节点」的结论，答的不是这一问。","d":"这一句是「换地址和跨页状态用 Vue 旁边的库」的结论，答的不是这一问。"}},
  {"id":"vu2-10","pointId":"cv-vue-eco-chapter-aim","stem":"vue 包负责组件和响应式，换地址和跨页状态要去哪一章？","texts":["页面绑的是代理上的属性。改原始对象或解构出来的普通数字，都不会通知依赖。","去这一章。换地址用 Vue Router，跨页状态用 Pinia，首屏 HTML 里的数据常见于 Nuxt。","Proxy 只解决拦截面。响应式还要读写走代理、深层按需代理，以及真正的依赖订阅。","null 的 typeof 是 object，但仍不能作为 Proxy 目标。"],"answer":"b","explain":"去这一章。换地址用 Vue Router，跨页状态用 Pinia，首屏 HTML 里的数据常见于 Nuxt。","whyWrong":{"a":"这一句是「Vue ref、reactive 与代理身份」的结论，答的不是这一问。","c":"这一句是「Proxy 取代 defineProperty，仍要拦在代理上」的结论，答的不是这一问。","d":"这一句是「手写 Proxy 要先守住 null 与类型边界」的结论，答的不是这一问。"}},
  {"id":"cx1-1","pointId":"cv-fe-pick-decision-order","stem":"会上给 React、Vue、Angular、Svelte 各打一分，再乘上「要不要服务端渲染」，为什么这样定不下来？","texts":["选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。","Angular 的路由、HTTP、表单都在 @angular 自己的包里。"],"answer":"b","explain":"没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。人从微信打开，换的是小程序运行时，不是把 Vue 换成 React。正文要出现在源代码里时，用这个库自己的服务端方案。","whyWrong":{"a":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","c":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。","d":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。"}},
  {"id":"cx1-2","pointId":"cv-fe-pick-by-surface","stem":"公司已经在用 React。为什么这句还是决定不了：这次要新建的是浏览器里的内容站、微信小程序，还是手机 App？","texts":["官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","Angular 的路由、HTTP、表单都在 @angular 自己的包里。","选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。"],"answer":"b","explain":"React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。小程序和 App 要换运行时。Nuxt 是 Vue 的方案，不是从「用 React」推出来的。","whyWrong":{"a":"这一句是「Vue 新项目：Vite 构建，Vue Router 管地址，Pinia 管跨页状态」的结论，答的不是这一问。","c":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。","d":"这一句是「选定界面库之后，生态跟着这一套走」的结论，答的不是这一问。"}},
  {"id":"cx1-3","pointId":"cv-fe-meta-framework-tradeoffs","stem":"都说要服务端渲染。为什么有的页面用 Next，有的用 Astro，登录后的表格用 Vite 就够？","texts":["选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。","官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。"],"answer":"b","explain":"先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。文章标题必须已经写在这份 HTML 里时，用这个库自己的服务端方案。不要因为「要服务端渲染」这五个字，同时建出 Next、Nuxt 和 Astro。","whyWrong":{"a":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","c":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。","d":"这一句是「Vue 新项目：Vite 构建，Vue Router 管地址，Pinia 管跨页状态」的结论，答的不是这一问。"}},
  {"id":"cx1-4","pointId":"cv-fe-framework-tradeoffs","stem":"界面库已经选定。为什么还要打开官方文档，看路由和请求是自带的，还是要再装？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","Svelte 页面要先由 Svelte 编译。Vue Router 出口里的 .svelte 没有走这条编译链。"],"answer":"b","explain":"选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。Vue 新项目用 Vite、Vue Router、Pinia。Angular 的路由、HTTP、表单都在 @angular 里。Svelte 的应用框架是 SvelteKit。这些句子不能反过来当成「谁的包更全就选谁」。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「Svelte 应用用 SvelteKit，状态用 runes（Svelte 5）」的结论，答的不是这一问。"}},
  {"id":"cx1-5","pointId":"cv-fe-ui-update-model","stem":"按钮一点，页面上的数字加一。React、Vue、Angular、Svelte 各自要改哪一行，数字才会变？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","Angular 的路由、HTTP、表单都在 @angular 自己的包里。"],"answer":"b","explain":"React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。Vue 在脚本里改 ref 的 .value。Angular 调用 signal 的 set，并且模板要读到这个 signal。Svelte 5 先用 $state 声明变量，再给它赋值。同一个按钮只留其中一种。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。"}},
  {"id":"cx1-6","pointId":"cv-fe-ecosystem-slot-tradeoffs","stem":"已经选定 React。为什么接口列表不能同时放进 React Query 和 Redux？","texts":["Angular 的路由、HTTP、表单都在 @angular 自己的包里。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。","每个职责只留一个库。路由一格、服务端列表缓存一格、客户端会话一格。","同一份列表被放进了两个地方。网络里新响应已经回来，模板绑的是没有跟着失效的那一份旧缓存。"],"answer":"b","explain":"这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。列表留在 Query 或路由加载器里的一处。Redux 只放登录态这类不来自这一次 GET 的数据。","whyWrong":{"a":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。","c":"这一句是「React 里路由、接口列表、登录态各只留一个库」的结论，答的不是这一问。","d":"这一句是「同一份订单列表只放在一个地方」的结论，答的不是这一问。"}},
  {"id":"cx1-7","pointId":"cv-fe-react-framework-first","stem":"只装了 Vite、react 和 react-dom，开发服务器已经能开。为什么还要再决定路由和取数用谁？","texts":["Svelte 页面要先由 Svelte 编译。Vue Router 出口里的 .svelte 没有走这条编译链。","React 文档把路由、取数和打包放在已经集成好的框架里。","列表被写进了两处。useAsyncData 的结果进了首屏 payload，模板却绑着 Pinia 里另一份数组。","load 跑在服务端时，写入模块级 store 会留到下一次请求。"],"answer":"b","explain":"React 文档把路由、取数和打包放在已经集成好的框架里。只有这两个包时，路由和数据获取还没选定，要自己选定，或改用文档列出的 Next.js、React Router 框架模式。","whyWrong":{"a":"这一句是「Svelte 应用用 SvelteKit，状态用 runes（Svelte 5）」的结论，答的不是这一问。","c":"这一句是「Vue 的服务端列表不要再抄进 Pinia」的结论，答的不是这一问。","d":"这一句是「SvelteKit 的页面数据从 load 返回，不要在 load 里写全局状态（SvelteKit）」的结论，答的不是这一问。"}},
  {"id":"cx1-8","pointId":"cv-fe-vue-official-slots","stem":"新的 Vue 3 工程里，为什么还能看到 Vue CLI、Vuex，以及自己写的 history？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","load 跑在服务端时，写入模块级 store 会留到下一次请求。"],"answer":"b","explain":"官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。Vue CLI、Vuex 和手写 history 是旧仓库留下的，或误加的第二套。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「SvelteKit 的页面数据从 load 返回，不要在 load 里写全局状态（SvelteKit）」的结论，答的不是这一问。"}},
  {"id":"cx1-9","pointId":"cv-fe-angular-first-party","stem":"新的 Angular 工程为什么还要再装 React Query、Redux 和 react-router？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","Angular 的路由、HTTP、表单都在 @angular 自己的包里。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"Angular 的路由、HTTP、表单都在 @angular 自己的包里。React 的请求缓存和路由接不上这套变更检测，装上之后会出现两套跳转和两份列表缓存。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx1-10","pointId":"cv-fe-sveltekit-runes","stem":"选了 Svelte，为什么又装上 Vue Router，编译却仍然不管那些路由组件？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","Svelte 页面要先由 Svelte 编译。Vue Router 出口里的 .svelte 没有走这条编译链。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","React 文档把路由、取数和打包放在已经集成好的框架里。"],"answer":"b","explain":"Svelte 页面要先由 Svelte 编译。Vue Router 出口里的 .svelte 没有走这条编译链。新应用用官方的 SvelteKit 管路由和取数；状态用 runes（如 $state）在编译期标出依赖。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「新的 React 应用从文档列出的框架起」的结论，答的不是这一问。"}},
  {"id":"cx2-1","pointId":"cv-fe-ecosystem-follows-model","stem":"已经选定 Vue。为什么仓库里还会同时出现 React Router、Pinia 和 HttpClient？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"],"answer":"b","explain":"选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。React Router 和 Angular 的 HttpClient 是另一套框架的包，不应出现在同一张表的路径上。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。"}},
  {"id":"cx2-2","pointId":"cv-fe-react-one-slot","stem":"新仓库里为什么会同时出现 Redux、Zustand、React Query，以及两套路由？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","每个职责只留一个库。路由一格、服务端列表缓存一格、客户端会话一格。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"],"answer":"b","explain":"每个职责只留一个库。路由一格、服务端列表缓存一格、客户端会话一格。热门库都装上时，同一份订单会有两套失效写法。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。"}},
  {"id":"cx2-3","pointId":"cv-fe-vue-data-one-slot","stem":"Nuxt 页已经用了 useAsyncData。为什么表格仍显示 Pinia 里那份旧订单？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","列表被写进了两处。useAsyncData 的结果进了首屏 payload，模板却绑着 Pinia 里另一份数组。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"列表被写进了两处。useAsyncData 的结果进了首屏 payload，模板却绑着 Pinia 里另一份数组。刷新只清了其中一处。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx2-4","pointId":"cv-fe-angular-resource-not-ngrx","stem":"新的 Angular 应用（默认不用 zone.js）还没写出第一张订单表，为什么已经加了 Store、Effects 和 React Query？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","列表走 HttpClient 或 httpResource 即可。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","Angular 的路由、HTTP、表单都在 @angular 自己的包里。"],"answer":"b","explain":"列表走 HttpClient 或 httpResource 即可。NgRx 不是新应用默认。React Query 是 React 生态的钩子，装进这个工程和 Angular 的变更检测不是一套。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。"}},
  {"id":"cx2-5","pointId":"cv-fe-svelte-load-not-store","stem":"load 里已经取到订单。为什么组件里的全局 store 在服务端会串到别人的请求？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","load 跑在服务端时，写入模块级 store 会留到下一次请求。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"load 跑在服务端时，写入模块级 store 会留到下一次请求。列表应由 load return，页面读 data，不要在 load 里给全局 store 赋值。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx2-6","pointId":"cv-fe-server-state-one-owner","stem":"接口已经返回新订单，为什么页面仍显示改之前的列表？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","同一份列表被放进了两个地方。网络里新响应已经回来，模板绑的是没有跟着失效的那一份旧缓存。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"],"answer":"b","explain":"同一份列表被放进了两个地方。网络里新响应已经回来，模板绑的是没有跟着失效的那一份旧缓存。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。"}},
  {"id":"cx2-7","pointId":"cv-fe-cross-end-one-runtime","stem":"同一份 React 组件打进了网页。为什么还期望小程序和手机 App 都不用改？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","网页画到 DOM，小程序和 App 是另外的运行时。同一份带 document 或 div 的组件不能同时当这三端的唯一实现。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"网页画到 DOM，小程序和 App 是另外的运行时。同一份带 document 或 div 的组件不能同时当这三端的唯一实现。每一端只留一个运行时。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"cx2-8","pointId":"cv-fe-expo-router-one-nav","stem":"create-expo-app 之后又装了一套 React Navigation。为什么两个地方都在改同一条地址？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","Expo 新模板默认用 Expo Router 做文件路由。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"Expo 新模板默认用 Expo Router 做文件路由。再挂一套独立的 React Navigation 去管同一条地址，同一次点击会走两套栈。应用层只留一个入口。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx2-9","pointId":"cv-fe-flutter-state-one-approach","stem":"同一份订单既进了 Provider，又进了 Riverpod。深链打开时，为什么还会再叠一层页面？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","跨页状态只留文档里的一种做法。深链用 go_router 的 context.go 按路径配栈；只靠命名路由再 push，同一次分享会在栈上再压一层。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","不算。微前端要能独立构建、独立发布，再拼成一个产品。"],"answer":"b","explain":"跨页状态只留文档里的一种做法。深链用 go_router 的 context.go 按路径配栈；只靠命名路由再 push，同一次分享会在栈上再压一层。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「微前端是多个可独立发布的前端，在运行时或构建时拼成一个产品」的结论，答的不是这一问。"}},
  {"id":"cx2-10","pointId":"cv-mfe-what-it-is","stem":"把仓库拆成 src/orders 和 src/pay，算不算已经做了微前端？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不算。微前端要能独立构建、独立发布，再拼成一个产品。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"不算。微前端要能独立构建、独立发布，再拼成一个产品。只拆目录、仍同一次发版，还不是。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx3-1","pointId":"cv-mfe-when-to-split","stem":"为什么两个业务线共用一个仓库、同一次发版，却要上微前端？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","共用仓库、同一次发版时，微前端解决不了独立发版。先写清团队、节奏和失败可见性，写不出就这次不拆。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"],"answer":"b","explain":"共用仓库、同一次发版时，微前端解决不了独立发版。先写清团队、节奏和失败可见性，写不出就这次不拆。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。"}},
  {"id":"cx3-2","pointId":"cv-mfe-not-for-everything","stem":"是不是前端一超过十万行就必须上微前端？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不是。行数本身不是拆应用的理由。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"不是。行数本身不是拆应用的理由。同小队、同发版窗口时，模块边界和构建拆分通常更便宜。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx3-3","pointId":"cv-mfe-composition-models","stem":"把子应用的 JS 用 script 标签挂上，和发版前打进同一个包，解决的是同一件事吗？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","不是。构建时组合在发版前锁定版本；运行时组合在浏览器里再加载；服务端或边缘组合在返回 HTML 时拼接。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"不是。构建时组合在发版前锁定版本；运行时组合在浏览器里再加载；服务端或边缘组合在返回 HTML 时拼接。失败点和回滚面不同。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"cx3-4","pointId":"cv-mfe-pick-by-constraint","stem":"公司已经在用 qiankun。为什么这句还是决定不了：这次要上 Module Federation，还是 iframe？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","qiankun 只说明现有壳。菜单仍跟路径走就先留下；只有它做不到的那一块才另加 iframe 或 Federation。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","React 文档把路由、取数和打包放在已经集成好的框架里。"],"answer":"b","explain":"qiankun 只说明现有壳。菜单仍跟路径走就先留下；只有它做不到的那一块才另加 iframe 或 Federation。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「新的 React 应用从文档列出的框架起」的结论，答的不是这一问。"}},
  {"id":"cx3-5","pointId":"cv-mfe-compare-matrix","stem":"Module Federation、single-spa、qiankun、无界、iframe 是不是越新越好？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不是。表只写每种方案的主缝和做不到的事。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"不是。表只写每种方案的主缝和做不到的事。仓库里已有的加载方式先留下，不按发布时间换成更新的那一个。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx3-6","pointId":"cv-mfe-pick-one-path","stem":"对照表填完了，为什么仓库里还会同时出现 qiankun 和 Module Federation 两套壳？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","对照表填完还要写出不做项。两套壳同时在，等于主路径还没选完。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"对照表填完还要写出不做项。两套壳同时在，等于主路径还没选完。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx3-7","pointId":"cv-mfe-vite-federation","stem":"从 webpack 换到 Vite 之后，是不是就不能做 Module Federation 了？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不是。换的是插件与构建入口，host 消费 remote、exposes、shared 的语义仍在。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"不是。换的是插件与构建入口，host 消费 remote、exposes、shared 的语义仍在。以你正在用的插件文档为准。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx3-8","pointId":"cv-mfe-singlespa-register","stem":"注册了子应用却一直不出现，是不是 activeWhen 写错了就够解释？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不是。还要检查是否调用了 start，以及 app 加载函数是否返回带 bootstrap/mount/unmount 的应用。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"不是。还要检查是否调用了 start，以及 app 加载函数是否返回带 bootstrap/mount/unmount 的应用。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx3-9","pointId":"cv-mfe-qiankun-html-entry","stem":"子应用已经能单独打开，为什么挂到 qiankun 主应用后白屏，控制台却在抱怨 container？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","单独能开只说明子应用自己的入口在。挂到壳上还要正确的 HTML entry、真正的 container 元素，以及 URL 激活或手动挂载二选一。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","React 文档把路由、取数和打包放在已经集成好的框架里。"],"answer":"b","explain":"单独能开只说明子应用自己的入口在。挂到壳上还要正确的 HTML entry、真正的 container 元素，以及 URL 激活或手动挂载二选一。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「新的 React 应用从文档列出的框架起」的结论，答的不是这一问。"}},
  {"id":"cx3-10","pointId":"cv-mfe-wujie-startapp","stem":"已经上了 qiankun，为什么还要再了解无界？两者是不是同一个沙箱？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不是。无界用 Web Component 做样式容器、用 iframe 跑子应用脚本，和 qiankun 的 HTML entry 沙箱不是同一套实现。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"不是。无界用 Web Component 做样式容器、用 iframe 跑子应用脚本，和 qiankun 的 HTML entry 沙箱不是同一套实现。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx4-1","pointId":"cv-mfe-iframe-postmessage","stem":"把第三方后台塞进 iframe 之后，直接读 iframe.contentWindow.user 可以吗？","texts":["选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","不可以。跨源读窗体会被浏览器拦住。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"不可以。跨源读窗体会被浏览器拦住。状态交接用 postMessage，并校验 event.origin。","whyWrong":{"a":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","c":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"cx4-2","pointId":"cv-mfe-module-federation","stem":"配了 ModuleFederationPlugin 之后，是不是子应用的所有页面都会自动挂到主应用？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不是。只有 exposes 声明并被 host 的 remotes 引用的模块才会在运行时加载。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"不是。只有 exposes 声明并被 host 的 remotes 引用的模块才会在运行时加载。没有声明的路由不会自动出现。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx4-3","pointId":"cv-mfe-shared-deps","stem":"host 和 remote 的 package.json 都写了 react，运行时是不是自动只用一份？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不是。未配置 shared，或双方版本进不了同一共享策略时，运行时可以同时存在多份 React，钩子与上下文会坏掉。","官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。","Svelte 页面要先由 Svelte 编译。Vue Router 出口里的 .svelte 没有走这条编译链。"],"answer":"b","explain":"不是。未配置 shared，或双方版本进不了同一共享策略时，运行时可以同时存在多份 React，钩子与上下文会坏掉。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「Vue 新项目：Vite 构建，Vue Router 管地址，Pinia 管跨页状态」的结论，答的不是这一问。","d":"这一句是「Svelte 应用用 SvelteKit，状态用 runes（Svelte 5）」的结论，答的不是这一问。"}},
  {"id":"cx4-4","pointId":"cv-mfe-runtime-lifecycle","stem":"用户从订单页切到商品页，订单子应用的定时器和全局监听会不会自己消失？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","不会。没有卸载钩子时，定时器、window 监听和残留 DOM 会留在壳里，表现为泄漏或串扰。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"不会。没有卸载钩子时，定时器、window 监听和残留 DOM 会留在壳里，表现为泄漏或串扰。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx4-5","pointId":"cv-mfe-style-isolation","stem":"两个子应用都写了 .button { color: red }，上线后会不会各管各的？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不会。同一文档里未隔离的全局选择器会互相覆盖，后加载的往往赢。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"不会。同一文档里未隔离的全局选择器会互相覆盖，后加载的往往赢。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx4-6","pointId":"cv-mfe-independent-deploy","stem":"子应用一发版就改掉 CDN 上的 remoteEntry.js，壳不发版，为什么有时全站白屏？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","覆盖同一个 remoteEntry.js 无法回滚。产物要带版本，壳要能捕获加载失败并降级。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"覆盖同一个 remoteEntry.js 无法回滚。产物要带版本，壳要能捕获加载失败并降级。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx4-7","pointId":"cv-mfe-perf-cost","stem":"拆成三个子应用之后，首屏变慢，是不是只能怪业务组件太重？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不是。先核对是否加载了多份框架、是否串行拉多个 remoteEntry，再查业务组件。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","Angular 的路由、HTTP、表单都在 @angular 自己的包里。"],"answer":"b","explain":"不是。先核对是否加载了多份框架、是否串行拉多个 remoteEntry，再查业务组件。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。"}},
  {"id":"cx4-8","pointId":"cv-mfe-contract-version","stem":"remote 把 exposes 的 ./OrderList 改成 ./OrderTable，壳没改，为什么只在部分用户那里炸？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","导出路径是契约的一部分。remote 改名而壳未跟上时，只有加载到新产物的用户会炸。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"导出路径是契约的一部分。remote 改名而壳未跟上时，只有加载到新产物的用户会炸。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx4-9","pointId":"cv-rn-what-it-is","stem":"同一套 React 组件，在手机上落到的是网页，还是平台自己的视图？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","落到平台自己的视图。React Native 用 React 组件描述界面，再画成 iOS、Android 上的原生视图。","官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。","选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。"],"answer":"b","explain":"落到平台自己的视图。React Native 用 React 组件描述界面，再画成 iOS、Android 上的原生视图。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「Vue 新项目：Vite 构建，Vue Router 管地址，Pinia 管跨页状态」的结论，答的不是这一问。","d":"这一句是「选定界面库之后，生态跟着这一套走」的结论，答的不是这一问。"}},
  {"id":"cx4-10","pointId":"cv-rn-enter-app","stem":"文档建议新的 React Native 应用用哪一套工具创建？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","用 Expo。它是建立在 React Native 上的框架，负责创建、运行和一部分原生能力。","官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。","Angular 的路由、HTTP、表单都在 @angular 自己的包里。"],"answer":"b","explain":"用 Expo。它是建立在 React Native 上的框架，负责创建、运行和一部分原生能力。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「Vue 新项目：Vite 构建，Vue Router 管地址，Pinia 管跨页状态」的结论，答的不是这一问。","d":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。"}},
  {"id":"cx5-1","pointId":"cv-rn-not-webview-app","stem":"手机里已经能用 WebView 打开现有网站，还要不要 React Native？","texts":["Angular 的路由、HTTP、表单都在 @angular 自己的包里。","要原生控件、原生导航和平台能力时才用。只是打开一个网址，用 WebView 就够，不必整页都当 React Native。","选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。","load 跑在服务端时，写入模块级 store 会留到下一次请求。"],"answer":"b","explain":"要原生控件、原生导航和平台能力时才用。只是打开一个网址，用 WebView 就够，不必整页都当 React Native。","whyWrong":{"a":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。","c":"这一句是「选定界面库之后，生态跟着这一套走」的结论，答的不是这一问。","d":"这一句是「SvelteKit 的页面数据从 load 返回，不要在 load 里写全局状态（SvelteKit）」的结论，答的不是这一问。"}},
  {"id":"cx5-2","pointId":"cv-rn-view-not-div","stem":"为什么把网页卡片里的 div 原样写进组件，打包过不去，document.getElementById 也没有节点可查？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","容器换成 View，文字换成 Text，排列用这个 View 上的 Flexbox，样式用 StyleSheet 的数字对象。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"容器换成 View，文字换成 Text，排列用这个 View 上的 Flexbox，样式用 StyleSheet 的数字对象。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx5-3","pointId":"cv-rn-text-not-under-view","stem":"为什么 View 里直接写「请登录」会抛异常，给根 View 设了 fontFamily 里面的字却还是默认字体？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","<View>请登录</View> 会抛异常。合法结构是 View 里面再放 Text。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"<View>请登录</View> 会抛异常。合法结构是 View 里面再放 Text。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx5-4","pointId":"cv-rn-flex-defaults","stem":"为什么 display:flex; flex-direction:row 贴进 StyleSheet 之后，三个子 View 仍从上往下排，挤在一起也不缩小？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","View 默认就是 flex 容器，不需要 display:flex。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"View 默认就是 flex 容器，不需要 display:flex。不写方向时主轴是 column，子节点竖排。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx5-5","pointId":"cv-rn-pressable-not-click","stem":"为什么把提交写成 View 的 onClick，手指按下去日志一条都没有？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","日志应出现在 Pressable 的 onPress。按下在 onPressIn，抬起且仍在热区内才 onPress。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"日志应出现在 Pressable 的 onPress。按下在 onPressIn，抬起且仍在热区内才 onPress。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx5-6","pointId":"cv-rn-flatlist-window","stem":"为什么 ScrollView 里 map 出一千行会卡，而且行里输入框的字滑出屏幕再回来就没了？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","长列表用 FlatList，传入 data 和 renderItem。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"长列表用 FlatList，传入 data 和 renderItem。它只挂渲染窗口里的行，不像 ScrollView 一次挂出全部。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx5-7","pointId":"cv-rn-image-needs-size","stem":"为什么 Image 的 source 填了能打开的网址，布局里却量不出这块图的矩形？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","不写宽高的网络图和 data 图没有你要的矩形，同一 uri 写上 width 和 height 后才能占住布局。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"不写宽高的网络图和 data 图没有你要的矩形，同一 uri 写上 width 和 height 后才能占住布局。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"cx5-8","pointId":"cv-rn-dimensions-not-cached","stem":"为什么把手机横过来之后，按启动时存下的 window.width 排的卡片还是竖屏那一列的宽度？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","模块顶层存下的宽度在旋转后仍是旧值。每次渲染重新读 Dimensions.get(\"window\")，或直接用 useWindowDimensions。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"模块顶层存下的宽度在旋转后仍是旧值。每次渲染重新读 Dimensions.get(\"window\")，或直接用 useWindowDimensions。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx5-9","pointId":"cv-rn-platform-extension","stem":"为什么每个组件都写成 Platform.OS === \"ios\" 时返回一棵树，android 时返回另一棵？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","整份实现不同的，拆成 .ios.js 和 .android.js，导入路径不写后缀，由 Metro 按当前平台选择。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"整份实现不同的，拆成 .ios.js 和 .android.js，导入路径不写后缀，由 Metro 按当前平台选择。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx5-10","pointId":"cv-rn-hermes-default","stem":"为什么在 Chrome 里能跑的写法，到了默认的 React Native 工程却对不上？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","默认引擎是 Hermes，文档写明不必再配置才能启用。换成 JavaScriptCore 是退出 Hermes，不是默认路径。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"默认引擎是 Hermes，文档写明不必再配置才能启用。换成 JavaScriptCore 是退出 Hermes，不是默认路径。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx6-1","pointId":"cv-rn-jsi-not-json-bridge","stem":"为什么还把每一次 JavaScript 调原生都写成先 JSON 序列化、再异步过桥，而 setState 的下一行就去读原生布局？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","0.76 起新架构默认开启。JSI 让 JavaScript 持有 C++ 对象引用并直接调用，不必再按旧桥把这次调用序列化成消息。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"0.76 起新架构默认开启。JSI 让 JavaScript 持有 C++ 对象引用并直接调用，不必再按旧桥把这次调用序列化成消息。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx6-2","pointId":"cv-rn-navigate-not-push","stem":"为什么已经在详情页上，再对另一条订单调用 navigate(\"Details\")，栈深度不变、参数也没换成新的 id？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","已经在 Details 上时，navigate(\"Details\") 不会再压一层，也不会用新 params 换掉当前屏。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"已经在 Details 上时，navigate(\"Details\") 不会再压一层，也不会用新 params 换掉当前屏。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"cx6-3","pointId":"cv-rn-fetch-not-document","stem":"为什么登录请求用 fetch 已经成功，紧接着 localStorage.setItem 存令牌却没有这个对象？","texts":["Angular 的路由、HTTP、表单都在 @angular 自己的包里。","fetch 和 XMLHttpRequest 在补齐列表里，可以用来发请求。","网页画到 DOM，小程序和 App 是另外的运行时。同一份带 document 或 div 的组件不能同时当这三端的唯一实现。","Expo 新模板默认用 Expo Router 做文件路由。"],"answer":"b","explain":"fetch 和 XMLHttpRequest 在补齐列表里，可以用来发请求。document 和 localStorage 不在这份列表里，不能用来查界面或存令牌。","whyWrong":{"a":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。","c":"这一句是「跨端先选定一个运行时」的结论，答的不是这一问。","d":"这一句是「新的 Expo 应用用 Expo Router 做路由」的结论，答的不是这一问。"}},
  {"id":"cx6-4","pointId":"cv-flutter-what-it-is","stem":"Flutter 的按钮是平台原生控件，还是引擎自己画出来的？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","引擎自己画出来的。Flutter 用 Dart 写出 Widget，由引擎画到一块自绘表面上。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"引擎自己画出来的。Flutter 用 Dart 写出 Widget，由引擎画到一块自绘表面上。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx6-5","pointId":"cv-flutter-enter-app","stem":"要把一份 Flutter 应用在设备上跑起来，先用哪一条命令建工程？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","用 flutter create。它生成 Dart 工程和各平台目录。","选定 Vue 之后，路由、客户端状态、服务端列表缓存都跟 Vue 这一套。","每个职责只留一个库。路由一格、服务端列表缓存一格、客户端会话一格。"],"answer":"b","explain":"用 flutter create。它生成 Dart 工程和各平台目录。再用 flutter run 跑在连接的设备或模拟器上。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「选定界面库之后，生态跟着这一套走」的结论，答的不是这一问。","d":"这一句是「React 里路由、接口列表、登录态各只留一个库」的结论，答的不是这一问。"}},
  {"id":"cx6-6","pointId":"cv-flutter-not-html","stem":"把网页里的 div 和 className 写进 build，能不能当成 Flutter 界面？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不能。build 返回的是 Widget。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"不能。build 返回的是 Widget。没有 div，没有 className，也没有 document。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx6-7","pointId":"cv-flutter-widget-not-html","stem":"为什么 build 里写了 div 和 className，卡片既编不过，也没有一棵文档可以查？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","外层用 Column 或 Container，文字用 Text。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"外层用 Column 或 Container，文字用 Text。build 交出的是新的 Widget 配置，状态在 Element 上，布局和绘制在 RenderObject 上。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx6-8","pointId":"cv-flutter-impeller-own-pixels","stem":"为什么按钮长得不像系统控件，可页面也不是一个 WebView？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","界面是引擎画在自己表面上的像素，不是 OEM 控件，也不是 WebView。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"界面是引擎画在自己表面上的像素，不是 OEM 控件，也不是 WebView。iOS 只用 Impeller。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"cx6-9","pointId":"cv-flutter-constraints-down","stem":"为什么 Column 里放了 ListView，报的是高度无界，而不是子组件写错了宽度？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","Column 给普通孩子的竖直最大高度是无穷。ListView 因此抛出 Vertical viewport was given unbounded height。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"Column 给普通孩子的竖直最大高度是无穷。ListView 因此抛出 Vertical viewport was given unbounded height。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx6-10","pointId":"cv-flutter-setstate-rebuilds","stem":"为什么计数已经变成 2，按钮上的 Text 仍显示 1？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","setState 的回调同步改字段，同时把这个 State 标脏，build 发生在随后的帧，paint 更在 build 之后。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"setState 的回调同步改字段，同时把这个 State 标脏，build 发生在随后的帧，paint 更在 build 之后。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"cx7-1","pointId":"cv-flutter-gorouter-not-named","stem":"为什么分享链接每次打开，订单页都会在当前栈上再压一层？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","命名路由收到深链会再 push 一页，并且没有浏览器前进。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。","列表走 HttpClient 或 httpResource 即可。"],"answer":"b","explain":"命名路由收到深链会再 push 一页，并且没有浏览器前进。同一链接要用 go_router 的 context.go，让栈按路径声明配好。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。","d":"这一句是「Angular 的 GET 用 HttpClient 这一路，不必先装 NgRx」的结论，答的不是这一问。"}},
  {"id":"cx7-2","pointId":"cv-cross-four-who-paints","stem":"为什么都说一套代码，同一颗提交按钮却分别落在系统视图、自绘表面和小程序模板上？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","React Native 是 JavaScript 加平台视图，setState 之后还要渲染、提交、挂载。","Angular 的路由、HTTP、表单都在 @angular 自己的包里。","每个职责只留一个库。路由一格、服务端列表缓存一格、客户端会话一格。"],"answer":"b","explain":"React Native 是 JavaScript 加平台视图，setState 之后还要渲染、提交、挂载。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「Angular 的路由、HTTP 和表单用自己的包（v21）」的结论，答的不是这一问。","d":"这一句是「React 里路由、接口列表、登录态各只留一个库」的结论，答的不是这一问。"}},
  {"id":"cx7-3","pointId":"cv-cross-four-where-it-fits","stem":"为什么四套都能做移动界面，页面打不开或返回不刷新时却要查不同的文件？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","小程序打不开先看 pages.json 或 app.config。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"小程序打不开先看 pages.json 或 app.config。Flutter 打不开先看 go_router 的路径或这次有没有 Navigator.push。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"cx7-4","pointId":"cv-uniapp-what-it-is","stem":"uni-app 的页面在源码里是哪一种文件，编译之后还是不是同一套运行时？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","常用 Vue 的 .vue 页面。不是同一套运行时：编译器按目标端出小程序、H5 或 App 的产物。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"],"answer":"b","explain":"常用 Vue 的 .vue 页面。不是同一套运行时：编译器按目标端出小程序、H5 或 App 的产物。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。"}},
  {"id":"cx7-5","pointId":"cv-taro-what-it-is","stem":"Taro 里写的 JSX，在微信小程序里直接跑 React DOM 吗？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","不直接跑 React DOM。Taro 把 React 树桥到小程序的 setData 和模板上。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。"],"answer":"b","explain":"不直接跑 React DOM。Taro 把 React 树桥到小程序的 setData 和模板上。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「Vue 新项目：Vite 构建，Vue Router 管地址，Pinia 管跨页状态」的结论，答的不是这一问。"}},
  {"id":"cx7-6","pointId":"cv-uniapp-taro-not-same-runtime","stem":"两个框架都能出微信小程序，是不是选一个就等于另一个？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","不是。源码习惯、页面配置和桥到原生或小程序的方式都不同。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"],"answer":"b","explain":"不是。源码习惯、页面配置和桥到原生或小程序的方式都不同。它们是两条编译层。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。"}},
  {"id":"cx7-7","pointId":"cv-uniapp-x-uts-not-vue-page","stem":"为什么把现有 uni-app 工程的编译目标改成 Android，原来的 .vue 页面却编译不过？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","uni-app 继续用 Vue 3 的 .vue。uni-app x 只认 .uvue 和 uts：Android 产物是 Kotlin，iOS 是 Swift，鸿蒙 Next 是 ArkTS，Web 和小程序才是 JavaScript。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","React 文档把路由、取数和打包放在已经集成好的框架里。"],"answer":"b","explain":"uni-app 继续用 Vue 3 的 .vue。uni-app x 只认 .uvue 和 uts：Android 产物是 Kotlin，iOS 是 Swift，鸿蒙 Next 是 ArkTS，Web 和小程序才是 JavaScript。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「新的 React 应用从文档列出的框架起」的结论，答的不是这一问。"}},
  {"id":"cx7-8","pointId":"cv-uniapp-pages-json-entry","stem":"为什么订单页文件已经在磁盘上，冷启动和分享卡片都进不去？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","冷启动进 pages 第一项。navigateTo 的 url 必须是已登记路径，形如 /pages/order/order?id=42，query 的值是字符串。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"冷启动进 pages 第一项。navigateTo 的 url 必须是已登记路径，形如 /pages/order/order?id=42，query 的值是字符串。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx7-9","pointId":"cv-uniapp-onload-vs-onshow","stem":"为什么订单 id 只在第一次进来时打印得出来，从详情返回后列表仍是离开前的数据？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","返回后列表 onLoad 和 onMounted 仍是 1，onShow 加 1，刷新请求应放在 onShow。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"返回后列表 onLoad 和 onMounted 仍是 1，onShow 加 1，刷新请求应放在 onShow。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx7-10","pointId":"cv-uniapp-ifdef-stripped","stem":"为什么微信登录写在判断里，H5 产物搜得到 wx.login，一运行就报这个对象不存在？","texts":["React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。","编译期宏做完之后，微信产物只有 MP-WEIXIN 那段，H5 产物只有 WEB 那段，另一段连标识符都没有。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。","React 文档把路由、取数和打包放在已经集成好的框架里。"],"answer":"b","explain":"编译期宏做完之后，微信产物只有 MP-WEIXIN 那段，H5 产物只有 WEB 那段，另一段连标识符都没有。","whyWrong":{"a":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。","c":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。","d":"这一句是「新的 React 应用从文档列出的框架起」的结论，答的不是这一问。"}},
  {"id":"cx8-1","pointId":"cv-taro-react-setdata-bridge","stem":"为什么 setState 已经返回，滚动区却要再等一拍才换上新列表？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","setState 先改逻辑层的模拟 DOM。界面要等序列化结果 setData 到视图层，静态模板才画出新节点。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"setState 先改逻辑层的模拟 DOM。界面要等序列化结果 setData 到视图层，静态模板才画出新节点。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"cx8-2","pointId":"cv-taro-pages-in-app-config","stem":"为什么订单组件已经 export，小程序里仍然没有 /pages/order/order 这条路由？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","没写进 pages 的组件不是页面，第一项才是冷启动首页。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"没写进 pages 的组件不是页面，第一项才是冷启动首页。url 形如 /pages/order/order?id=42。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx8-3","pointId":"cv-taro-4-compiler-choice","stem":"为什么 compiler 改成 vite 之后，微信开发者工具仍要等整包，而不是浏览器那种换一个模块？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","Taro 4 的 framework 决定 React 还是 Vue 3，compiler 决定 webpack5 还是 Vite。","每个职责只留一个库。路由一格、服务端列表缓存一格、客户端会话一格。","同一份列表被放进了两个地方。网络里新响应已经回来，模板绑的是没有跟着失效的那一份旧缓存。"],"answer":"b","explain":"Taro 4 的 framework 决定 React 还是 Vue 3，compiler 决定 webpack5 还是 Vite。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「React 里路由、接口列表、登录态各只留一个库」的结论，答的不是这一问。","d":"这一句是「同一份订单列表只放在一个地方」的结论，答的不是这一问。"}},
  {"id":"cx8-4","pointId":"cv-taro-and-uniapp-layers","stem":"为什么两个都能进微信，返回后列表不刷新时却要打开不同的文件？","texts":["选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","打不开先看 pages.json 或 app.config，url 必须已经登记。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。","官方新项目是构建用 Vite、路由用 Vue Router、跨页状态用 Pinia。"],"answer":"b","explain":"打不开先看 pages.json 或 app.config，url 必须已经登记。","whyWrong":{"a":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","c":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。","d":"这一句是「Vue 新项目：Vite 构建，Vue Router 管地址，Pinia 管跨页状态」的结论，答的不是这一问。"}},
  {"id":"cx8-5","pointId":"cv-node-what-it-is","stem":"没有窗口、也没有文档的时候，同一门 JavaScript 在哪一套环境里跑？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","在 Node.js 里跑。它是浏览器外的 JavaScript 运行时，建立在 V8 上，用来写服务和工具。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"],"answer":"b","explain":"在 Node.js 里跑。它是浏览器外的 JavaScript 运行时，建立在 V8 上，用来写服务和工具。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。"}},
  {"id":"cx8-6","pointId":"cv-node-run-process","stem":"要把一份 .js 在 Node.js 里跑起来，命令行里写什么？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","写 node 加上文件路径。这会启动一个进程，从这份入口脚本开始执行。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"写 node 加上文件路径。这会启动一个进程，从这份入口脚本开始执行。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx8-7","pointId":"cv-node-not-browser","stem":"在 Node.js 里写登录态，是不是也可以用 document.cookie？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","不是。Node.js 没有 document。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。"],"answer":"b","explain":"不是。Node.js 没有 document。HTTP 服务里的 Cookie 写在请求和响应的头字段上。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","d":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。"}},
  {"id":"cx8-8","pointId":"cv-node-http-cookie","stem":"用 Node 写一个登录接口，为什么把 token 放进 JSON 交给前端存，仍会回到 JWT 塞 localStorage 的模型？","texts":["React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","登录成功后，响应应设置 HttpOnly 的会话 Cookie，而不是在 JSON 里给一段让脚本保存的令牌。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","React 要调用 useState 返回的修改函数，只写 count = 1 画面不变。"],"answer":"b","explain":"登录成功后，响应应设置 HttpOnly 的会话 Cookie，而不是在 JSON 里给一段让脚本保存的令牌。","whyWrong":{"a":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「改一个数字时，四种框架各自要写哪一行」的结论，答的不是这一问。"}},
  {"id":"cx8-9","pointId":"cv-node-http-close","stem":"kill 之后为什么有的请求写到一半，有的新请求还被接进来？","texts":["没有这样一张可乘的分数表。仓库已经在用 Vue，新的浏览器页面就继续用 Vue。","SIGTERM 后应先 server.close 拒新连接并排空在途。","React 只说明浏览器里的界面用什么来更新。内容站、微信小程序、手机 App 是人从哪里打开。","先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。"],"answer":"b","explain":"SIGTERM 后应先 server.close 拒新连接并排空在途。只 exit 会把写到一半的响应切断。","whyWrong":{"a":"这一句是「选型没有打分公式：先看仓库和团队，再看打开方式」的结论，答的不是这一问。","c":"这一句是「人从哪打开、源代码里要不要正文」的结论，答的不是这一问。","d":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。"}},
  {"id":"cx8-10","pointId":"cv-node-nexttick","stem":"把 nextTick 理解成浏览器微任务，为什么会误判执行顺序？","texts":["先看仓库里已经是哪种界面库，再打开「查看网页源代码」。登录后的表格可以只有一个空的 div。","先标出同步打印，它一定在两个队列之前。再分别看 nextTick 队列和 Promise 微任务队列，不要把它们合成浏览器那一张图。","选定之后才看官方包。React 本身不带路由和取数，文档让新项目用列出的框架，或自己装。","这是两处存储。筛选条件变了，如果只让 Query 按新的 queryKey 重新请求，Redux 里那份数组还是旧的，表格仍显示旧订单。"],"answer":"b","explain":"先标出同步打印，它一定在两个队列之前。再分别看 nextTick 队列和 Promise 微任务队列，不要把它们合成浏览器那一张图。","whyWrong":{"a":"这一句是「查看网页源代码时，正文在不在 HTML 里」的结论，答的不是这一问。","c":"这一句是「四种界面库：官方自带什么，你还要自己装什么」的结论，答的不是这一问。","d":"这一句是「路由、接口列表、登录态，各只留一个地方」的结论，答的不是这一问。"}},
  {"id":"jb1-1","pointId":"cv-java-what-it-is","stem":"写好的 .java 文件，最后是在哪一层上跑起来的？","texts":["基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。","字段和数组元素有默认值。局部变量必须先赋值。"],"answer":"b","explain":"先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","whyWrong":{"a":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","c":"这一句是「引用类型存的是指向对象的引用，null 表示没有指向」的结论，答的不是这一问。","d":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。"}},
  {"id":"jb1-2","pointId":"cv-java-enter-main","stem":"要把一个类跑起来，命令行里写什么？从哪一个方法开始？","texts":["基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","字段和数组元素有默认值。局部变量必须先赋值。","加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。"],"answer":"b","explain":"先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","whyWrong":{"a":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","c":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。","d":"这一句是「加宽可以自动转换，变窄必须写强制转换」的结论，答的不是这一问。"}},
  {"id":"jb1-3","pointId":"cv-java-not-javascript","stem":"名字里都有 Java，这两门语言是不是在同一个虚拟机里跑？","texts":["基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","不是。Java 编译成字节码，在 JVM 里跑。","s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。","字段和数组元素有默认值。局部变量必须先赋值。"],"answer":"b","explain":"不是。Java 编译成字节码，在 JVM 里跑。JavaScript 在浏览器引擎或 Node.js 里跑。","whyWrong":{"a":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","c":"这一句是「引用类型存的是指向对象的引用，null 表示没有指向」的结论，答的不是这一问。","d":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。"}},
  {"id":"jb1-4","pointId":"cv-java-eight-primitives","stem":"5 / 2 为什么得到 2，而不是 2.5？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb1-5","pointId":"cv-java-reference-and-null","stem":"String s = null 之后，为什么 s.length() 会失败？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。","不是。Java 编译成字节码，在 JVM 里跑。","字段和数组元素有默认值。局部变量必须先赋值。"],"answer":"b","explain":"s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。"}},
  {"id":"jb1-6","pointId":"cv-java-field-default-var","stem":"为什么字段不赋值就能读，方法里的 int n 不赋值却编不过？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","字段和数组元素有默认值。局部变量必须先赋值。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"字段和数组元素有默认值。局部变量必须先赋值。var 只表示让编译器推断这个局部变量的类型。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb1-7","pointId":"cv-java-widening-cast","stem":"为什么 int 能直接赋给 long，long 赋给 int 却要写 (int)？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。装箱是另一件事。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb1-8","pointId":"cv-java-wrapper-type","stem":"已经有 int，为什么还要 Integer？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","List 和泛型要的是对象。Integer 是 int 的包装类。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"List 和泛型要的是对象。Integer 是 int 的包装类。两个 Integer 是否同一个对象，见整数缓存那一课。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb1-9","pointId":"cv-java-array-length","stem":"new int[3] 之后，为什么不能再把长度改成 4？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","长度在 new 的时候定下，放在 length 里。合法下标是 0 到 length - 1。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"长度在 new 的时候定下，放在 length 里。合法下标是 0 到 length - 1。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb1-10","pointId":"cv-java-string-type","stem":"String 为什么能写 s.length()，int 却不能？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","String 是类，变量里是指向字符串对象的引用。字面量 \"CNY\" 的类型就是 String。","不是。Java 编译成字节码，在 JVM 里跑。","加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。"],"answer":"b","explain":"String 是类，变量里是指向字符串对象的引用。字面量 \"CNY\" 的类型就是 String。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「加宽可以自动转换，变窄必须写强制转换」的结论，答的不是这一问。"}},
  {"id":"jb2-1","pointId":"cv-java-list-set-map","stem":"订单行、去重后的用户号、订单号到金额，各该用哪一种？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","要顺序、也允许重复，用 List。只要每个元素出现一次，用 Set。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"要顺序、也允许重复，用 List。只要每个元素出现一次，用 Set。要用键查出值，用 Map。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb2-2","pointId":"cv-java-operator-result","stem":"为什么 n == 0 的结果不能赋给 int？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","== 比较是否相等，结果是 boolean。算术运算的结果才是数。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"== 比较是否相等，结果是 boolean。算术运算的结果才是数。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb2-3","pointId":"cv-java-if-else","stem":"为什么 if (n = 0) 编不过？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","if 的条件必须是 boolean。n = 0 是赋值，n 是 int，结果也是 int。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"if 的条件必须是 boolean。n = 0 是赋值，n 是 int，结果也是 int。比较要写 n == 0。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb2-4","pointId":"cv-java-switch-colon","stem":"case 1 里面没有 break，为什么 case 2 的代码也跑了？","texts":["先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","冒号形式匹配之后会继续执行后面的语句，这叫落入。这一支要停住，就写 break。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"冒号形式匹配之后会继续执行后面的语句，这叫落入。这一支要停住，就写 break。","whyWrong":{"a":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb2-5","pointId":"cv-java-loop-break","stem":"写在 for 里面的 continue 和 break，分别跳到哪里？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","continue 跳过这一轮剩下的语句，然后进入下一轮。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"continue 跳过这一轮剩下的语句，然后进入下一轮。break 离开整个循环。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb2-6","pointId":"cv-java-method-overload","stem":"两个都叫 add 的方法，为什么有的能同时存在，有的编不过？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","参数个数或类型不同，就是重载，可以共存。参数一样、只改返回类型，签名相同，不能共存。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"参数个数或类型不同，就是重载，可以共存。参数一样、只改返回类型，签名相同，不能共存。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb2-7","pointId":"cv-java-class-new-this","stem":"new Order(10) 调用的是哪一段代码？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","new 创建对象，并调用参数匹配的构造器。构造器里的 this 就是正在创建的这个对象。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"new 创建对象，并调用参数匹配的构造器。构造器里的 this 就是正在创建的这个对象。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb2-8","pointId":"cv-java-static-member","stem":"为什么启动用的 main 要写成 static？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","启动时还没有你创建的对象。static 方法属于类，启动器可以直接调用。","不是。Java 编译成字节码，在 JVM 里跑。","字段和数组元素有默认值。局部变量必须先赋值。"],"answer":"b","explain":"启动时还没有你创建的对象。static 方法属于类，启动器可以直接调用。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。"}},
  {"id":"jb2-9","pointId":"cv-java-package-access","stem":"字段什么修饰符都不写，别的包为什么读不到？","texts":["基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","不写修饰符就是包访问，只有同一个包能用。另外三档是 public、protected 和 private。","字段和数组元素有默认值。局部变量必须先赋值。","加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。"],"answer":"b","explain":"不写修饰符就是包访问，只有同一个包能用。另外三档是 public、protected 和 private。","whyWrong":{"a":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","c":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。","d":"这一句是「加宽可以自动转换，变窄必须写强制转换」的结论，答的不是这一问。"}},
  {"id":"jb2-10","pointId":"cv-java-extends-override","stem":"子类写了同名方法，为什么有时跑的仍是父类那一版？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","实例方法签名相同才是覆盖，调用看对象的实际类型。参数不同是重载。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"实例方法签名相同才是覆盖，调用看对象的实际类型。参数不同是重载。static 同名只是隐藏。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb3-1","pointId":"cv-java-interface-implements","stem":"类已经可以 extends，为什么还要 interface？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","一个类只能 extends 一个父类。interface 规定调用方能用哪些方法，一个类可以实现多个接口。","不是。Java 编译成字节码，在 JVM 里跑。","字段和数组元素有默认值。局部变量必须先赋值。"],"answer":"b","explain":"一个类只能 extends 一个父类。interface 规定调用方能用哪些方法，一个类可以实现多个接口。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。"}},
  {"id":"jb3-2","pointId":"cv-java-try-catch-throws","stem":"方法签名上的 throws 和方法里的 throw 各做什么？","texts":["先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","throw 是现在抛出一个异常对象。throws 写在方法上，表示这个方法可能把异常交给调用方。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"throw 是现在抛出一个异常对象。throws 写在方法上，表示这个方法可能把异常交给调用方。","whyWrong":{"a":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb3-3","pointId":"cv-java-generic-diamond","stem":"List<String> names = new ArrayList<>(); 右边的尖括号为什么是空的？","texts":["字段和数组元素有默认值。局部变量必须先赋值。","左边已经写了 String。右边的空尖括号叫 diamond，编译器沿用左边的类型参数。","加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。","要顺序、也允许重复，用 List。只要每个元素出现一次，用 Set。"],"answer":"b","explain":"左边已经写了 String。右边的空尖括号叫 diamond，编译器沿用左边的类型参数。","whyWrong":{"a":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。","c":"这一句是「加宽可以自动转换，变窄必须写强制转换」的结论，答的不是这一问。","d":"这一句是「List 按位置放元素，Set 不放重复，Map 用键找值」的结论，答的不是这一问。"}},
  {"id":"jb3-4","pointId":"cv-java-enum-constants","stem":"订单状态为什么不写成 int 的 0 和 1？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","enum 把允许的值写成这个类型自己的常量。别的整数不能赋给它。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"enum 把允许的值写成这个类型自己的常量。别的整数不能赋给它。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb3-5","pointId":"cv-java-main-launcher","stem":"有人说没有 main 也能靠静态初始化块跑起来，还有人说 main 可以终结。为什么这两句都不能当现行启动答案？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","启动契约要的是标准签名的 main。静态块会跑，但不是入口；别的签名的 main 只是重载。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","字段和数组元素有默认值。局部变量必须先赋值。"],"answer":"b","explain":"启动契约要的是标准签名的 main。静态块会跑，但不是入口；别的签名的 main 只是重载。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","d":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。"}},
  {"id":"jb3-6","pointId":"cv-java-pass-by-value","stem":"为什么说“对象是引用传递、基本类型是值传递”会和 JLS 打架？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","参数一律按值传递。引用类型复制的是引用，所以能改对象字段，改不了调用方手里的那个变量绑定。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"参数一律按值传递。引用类型复制的是引用，所以能改对象字段，改不了调用方手里的那个变量绑定。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb3-7","pointId":"cv-java-autoboxing-cache","stem":"两个 Integer 都是 127 时 == 为 true，128 时为什么可能为 false？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","常见缓存只到 127。同值在缓存里 == 可能碰上同一实例；出了缓存区间，== 比的是两个不同对象。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"常见缓存只到 127。同值在缓存里 == 可能碰上同一实例；出了缓存区间，== 比的是两个不同对象。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb3-8","pointId":"cv-java-string-immutability","stem":"在循环里用 + 拼字符串，为什么又慢又产生大量临时对象？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","每次 + 都在造新串并复制旧字符。循环里积累文本要用可变缓冲，短的固定拼接可以继续用加号。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"每次 + 都在造新串并复制旧字符。循环里积累文本要用可变缓冲，短的固定拼接可以继续用加号。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb3-9","pointId":"cv-java-string-new-vs-pool","stem":"为什么把 `String s = new String(\"xyz\");` 固定背成“一定创建两个对象”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","字面量进池；new 再多一个堆上的 String。池里已有该字面量时，新增的是那一个实例，不是固定两个。","字段和数组元素有默认值。局部变量必须先赋值。","加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。"],"answer":"b","explain":"字面量进池；new 再多一个堆上的 String。池里已有该字面量时，新增的是那一个实例，不是固定两个。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。","d":"这一句是「加宽可以自动转换，变窄必须写强制转换」的结论，答的不是这一问。"}},
  {"id":"jb3-10","pointId":"cv-java-generics","stem":"为什么 List<String> 和 List<Integer> 不能用 instanceof 区分？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","擦除之后运行时看不见元素类型，instanceof 区分不了。","不是。Java 编译成字节码，在 JVM 里跑。","加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。"],"answer":"b","explain":"擦除之后运行时看不见元素类型，instanceof 区分不了。List<?> 元素类型未知，基本不能往里 add 非 null。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「加宽可以自动转换，变窄必须写强制转换」的结论，答的不是这一问。"}},
  {"id":"jb4-1","pointId":"cv-java-record-accessor","stem":"为什么把实体改成 record 之后，懒加载和脏检查都乱了？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","record 按圆括号里列出的名字比较相等。这些名字在 JEP 395 里叫 component。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"record 按圆括号里列出的名字比较相等。这些名字在 JEP 395 里叫 component。它默认不可变，不适合当要代理的 JPA 实体。值对象用 record，要脏检查的实体用 class。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb4-2","pointId":"cv-java-polymorphism-not-only-extends","stem":"为什么把多态背成必须同时满足“继承、重写、父类引用指向子类”三件套？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","接口实现也是多态。不必先 extends 一个类；重载不是运行时多态。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"接口实现也是多态。不必先 extends 一个类；重载不是运行时多态。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb4-3","pointId":"cv-java-protected-other-pkg-subclass","stem":"为什么权限表把 protected 的“其他 package”打叉，又把“子孙类”打勾，让人以为跨包子类不能用？","texts":["先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","protected 对本包可见，也允许其他包的子类访问继承成员。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"protected 对本包可见，也允许其他包的子类访问继承成员。Java 没有 friendly 关键字。","whyWrong":{"a":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb4-4","pointId":"cv-java-anonymous-extends-or-implements","stem":"为什么说匿名内部类“不能 extends 其它类，只能当接口让别人实现”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","匿名类可以 new 父类(){}，就是在继承。只是没有名字，不能再写 extends/implements 关键字。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"匿名类可以 new 父类(){}，就是在继承。只是没有名字，不能再写 extends/implements 关键字。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb4-5","pointId":"cv-java-default-class-wins-conflict","stem":"为什么把 Java 8 默认方法背成“终于有多继承了，两个接口同名方法随便用”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","仍是单继承类。两个接口同名默认方法要自己覆盖；类里的方法压过接口默认方法。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"仍是单继承类。两个接口同名默认方法要自己覆盖；类里的方法压过接口默认方法。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb4-6","pointId":"cv-java-ctor-implicit-super-noarg","stem":"为什么把“子类构造器无论有参无参都会调用父类无参构造”当成永远成立？","texts":["基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","编译器默认只插无参 super()。父类没有无参时必须显式 super(实参)，不是永远会调到某个父构造。","长度在 new 的时候定下，放在 length 里。合法下标是 0 到 length - 1。","String 是类，变量里是指向字符串对象的引用。字面量 \"CNY\" 的类型就是 String。"],"answer":"b","explain":"编译器默认只插无参 super()。父类没有无参时必须显式 super(实参)，不是永远会调到某个父构造。","whyWrong":{"a":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","c":"这一句是「数组的长度在创建时定下，下标从 0 开始」的结论，答的不是这一问。","d":"这一句是「String 是类，字面量的类型就是 String」的结论，答的不是这一问。"}},
  {"id":"jb4-7","pointId":"cv-java-unchecked-not-must-catch","stem":"笔试题常写：RuntimeException 必须 try/catch，非 RuntimeException 都是外部错误。为什么这不能当标准答案？","texts":["基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","RuntimeException 是未检查异常，编译器不强制 catch。","字段和数组元素有默认值。局部变量必须先赋值。","长度在 new 的时候定下，放在 length 里。合法下标是 0 到 length - 1。"],"answer":"b","explain":"RuntimeException 是未检查异常，编译器不强制 catch。必须处理的是检查异常；Error 不该当业务分支。","whyWrong":{"a":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","c":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。","d":"这一句是「数组的长度在创建时定下，下标从 0 开始」的结论，答的不是这一问。"}},
  {"id":"jb4-8","pointId":"cv-java-runtime-ex-not-auto-caught","stem":"为什么把运行时异常背成“虚拟机会自动抛出并自动捕获，就算没写 catch 也会处理掉”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","没有 catch 时异常沿栈往上走，线程按未捕获处理器结束。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"没有 catch 时异常沿栈往上走，线程按未捕获处理器结束。JVM 不会替你自动 catch。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb4-9","pointId":"cv-java-finalize-not-guaranteed","stem":"为什么 Effective Java 里“避免终结方法、用 try/finally”在现行 JDK 还要再改一刀？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","finalize 不保证会跑。释放资源用 try-with-resources（AutoCloseable），不要靠终结方法。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","字段和数组元素有默认值。局部变量必须先赋值。"],"answer":"b","explain":"finalize 不保证会跑。释放资源用 try-with-resources（AutoCloseable），不要靠终结方法。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","d":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。"}},
  {"id":"jb4-10","pointId":"cv-java-clone-exception-checked","stem":"为什么图画了 Cloneable，有人就以为每个对象都有公开 clone，失败时还当成运行时异常？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","Cloneable 没有公开方法；Object.clone 是 protected。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"Cloneable 没有公开方法；Object.clone 是 protected。CloneNotSupportedException 是检查异常。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb5-1","pointId":"cv-java-collections","stem":"对象放进 HashMap 之后改了字段，为什么 get 返回 null？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","键参与哈希的字段放入后不能改。只重写 equals 不重写 hashCode，相等对象可能落进不同桶，get 会空。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"键参与哈希的字段放入后不能改。只重写 equals 不重写 hashCode，相等对象可能落进不同桶，get 会空。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb5-2","pointId":"cv-java-arraylist-linkedlist","stem":"要在中间插入很多元素，是不是一定用 LinkedList？","texts":["基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","不是。中间插入很多元素，也不一定用 LinkedList。","加宽是规范允许自动做的转换。变窄可能丢掉高位或小数，必须自己写强制转换。","长度在 new 的时候定下，放在 length 里。合法下标是 0 到 length - 1。"],"answer":"b","explain":"不是。中间插入很多元素，也不一定用 LinkedList。先看是不是按下标访问。","whyWrong":{"a":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","c":"这一句是「加宽可以自动转换，变窄必须写强制转换」的结论，答的不是这一问。","d":"这一句是「数组的长度在创建时定下，下标从 0 开始」的结论，答的不是这一问。"}},
  {"id":"jb5-3","pointId":"cv-java-stack-prefer-deque","stem":"为什么一提到栈就 `new Stack()`，还觉得它继承 Vector 是优点？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","栈结构用 Deque/ArrayDeque。Stack 是遗留的 Vector 子类，不是新代码默认。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。"],"answer":"b","explain":"栈结构用 Deque/ArrayDeque。Stack 是遗留的 Vector 子类，不是新代码默认。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","d":"这一句是「引用类型存的是指向对象的引用，null 表示没有指向」的结论，答的不是这一问。"}},
  {"id":"jb5-4","pointId":"cv-java-set-not-always-sorted","stem":"为什么把 Set 背成“内部会排序”，把 Map 背成“数据没有顺序”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","Hash 系列不保证顺序。要插入序用 Linked，要排序用 Tree；不是 Set 都排序、Map 都无序。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","字段和数组元素有默认值。局部变量必须先赋值。"],"answer":"b","explain":"Hash 系列不保证顺序。要插入序用 Linked，要排序用 Tree；不是 Set 都排序、Map 都无序。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","d":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。"}},
  {"id":"jb5-5","pointId":"cv-java-collection-vs-collections","stem":"为什么图上把 Collection 和 Collections 画在一起，有人就把工具类当成集合根类型？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","Collection 是接口；Collections 和 Arrays 是静态工具类。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"Collection 是接口；Collections 和 Arrays 是静态工具类。Map 不在 Collection 树上。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb5-6","pointId":"cv-java-arrays-aslist-fixed","stem":"为什么 asList 之后 add 会失败，也不能把它当成可变 ArrayList？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","asList 是固定大小视图：set 会改底层数组，add/remove 会失败。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"asList 是固定大小视图：set 会改底层数组，add/remove 会失败。要增删就拷进真正的 ArrayList。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb5-7","pointId":"cv-java-foreach-remove-cme","stem":"为什么觉得 foreach 就是迭代器，所以循环里 `list.remove(s)` 和 `iter.remove()` 一样？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","增强 for 底层仍在 next，循环里直接 list.remove 会坏结构。","不是。Java 编译成字节码，在 JVM 里跑。","s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。"],"answer":"b","explain":"增强 for 底层仍在 next，循环里直接 list.remove 会坏结构。用 Iterator.remove 或 removeIf。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「引用类型存的是指向对象的引用，null 表示没有指向」的结论，答的不是这一问。"}},
  {"id":"jb5-8","pointId":"cv-hashmap-initial-16-not-max","stem":"为什么把 HashMap 背成“最大承载量是 16，由 Entry[] 控制”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","16 只是默认初始容量。上限远更大，装载因子触发扩容后还可以继续翻倍。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","不是。Java 编译成字节码，在 JVM 里跑。"],"answer":"b","explain":"16 只是默认初始容量。上限远更大，装载因子触发扩容后还可以继续翻倍。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。"}},
  {"id":"jb5-9","pointId":"cv-hashmap-treeify-need-capacity","stem":"为什么把 HashMap 冲突背成“链表大于 8 就立刻变红黑树”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","链表够长还不够，表容量也要达到树化门槛。容量不够时先扩容，不是大于 8 立刻变树。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"链表够长还不够，表容量也要达到树化门槛。容量不够时先扩容，不是大于 8 立刻变树。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb5-10","pointId":"cv-chm-jdk8-not-segment-lock","stem":"为什么还把 CHM 背成“把数组切成若干段，每段一把锁”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","JDK 8 起是 CAS 加桶级同步，不是再背 Segment 分段锁。","先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"JDK 8 起是 CAS 加桶级同步，不是再背 Segment 分段锁。迭代器是弱一致。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb6-1","pointId":"cv-chm-iterator-weakly-consistent","stem":"为什么把 java.util.concurrent 一律说成“迭代时拷贝一份，所以永远不抛 ConcurrentModificationException”？","texts":["先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","ConcurrentHashMap 迭代不抛 CME，也不保证冻结快照。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"ConcurrentHashMap 迭代不抛 CME，也不保证冻结快照。CopyOnWrite 才是开始时那份数组。","whyWrong":{"a":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb6-2","pointId":"cv-java-vector-cme-not-because-sync","stem":"为什么把 Vector 的 fail-fast 说成“因为它是同步的，别的线程一改就会抛异常”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","fail-fast 看的是结构修改计数，不是“类声明了 synchronized”。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","字段和数组元素有默认值。局部变量必须先赋值。"],"answer":"b","explain":"fail-fast 看的是结构修改计数，不是“类声明了 synchronized”。要并发遍历换并发集合。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","d":"这一句是「字段有默认值，局部变量没有；var 是推断出来的类型」的结论，答的不是这一问。"}},
  {"id":"jb6-3","pointId":"cv-java-enumeration-not-faster","stem":"为什么“Enumeration 速度是 Iterator 的两倍、也更省内存”不能当集合框架答案？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","没有官方“快一倍”说法。遍历用 Iterator；Enumeration 是遗留 API。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"没有官方“快一倍”说法。遍历用 Iterator；Enumeration 是遗留 API。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb6-4","pointId":"cv-java-stringbuilder-not-buffer","stem":"为什么导图写“多线程就用 StringBuffer”，局部循环拼接也跟着换？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","局部拼接用 StringBuilder。跨线程不要拿可变缓冲当协议；StringBuffer 的锁只罩单次调用。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"局部拼接用 StringBuilder。跨线程不要拿可变缓冲当协议；StringBuffer 的锁只罩单次调用。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb6-5","pointId":"cv-java-string-strip-not-trim","stem":"旧资料常把 trim、无参 getBytes、new String(byte[]) 连成一套。为什么在现行 JDK 里会出错？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","trim 去不掉部分 Unicode 空白；strip 按 Unicode 空白。","不是。Java 编译成字节码，在 JVM 里跑。","s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。"],"answer":"b","explain":"trim 去不掉部分 Unicode 空白；strip 按 Unicode 空白。字节转换要写明字符集，不要靠默认。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「引用类型存的是指向对象的引用，null 表示没有指向」的结论，答的不是这一问。"}},
  {"id":"jb6-6","pointId":"cv-java-pattern-dot-not-nl","stem":"为什么用 `.*` 去匹配跨行 HTML，结果只吃到第一行？","texts":["先 javac 编译，再 java 加上类名。虚拟机从 public static void main(String[]) 开始。","点默认不含换行。要跨行匹配用 DOTALL；MULTILINE 只改 ^ 和 $ 的行首行尾语义。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"点默认不含换行。要跨行匹配用 DOTALL；MULTILINE 只改 ^ 和 $ 的行首行尾语义。","whyWrong":{"a":"这一句是「java 命令从 main 启动一个进程」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb6-7","pointId":"cv-java-calendar-not-singleton","stem":"为什么把 Calendar 和 Runtime 一起背成 JDK 里的单例例子会错？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","Calendar.getInstance 每次新建可变实例。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"Calendar.getInstance 每次新建可变实例。真正的单例例子是 Runtime.getRuntime，不是日历。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb6-8","pointId":"cv-java-dcl-volatile-enum","stem":"为什么手写懒汉双重检查却漏掉 volatile，运行时仍可能看到半初始化实例？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","无 volatile 时引用可能先可见、构造未完成。枚举常量由类初始化安全发布，不必自己再套双重检查。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"无 volatile 时引用可能先可见、构造未完成。枚举常量由类初始化安全发布，不必自己再套双重检查。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb6-9","pointId":"cv-java-long-atomic-on-64bit","stem":"为什么把“32 位机器上 long 要写两次”推广成所有 JVM 里 long 都可能撕成两半？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","规范允许把非 volatile 的 long 拆成两次写，但 64 位 HotSpot 单次写是原子的。","不是。Java 编译成字节码，在 JVM 里跑。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。"],"answer":"b","explain":"规范允许把非 volatile 的 long 拆成两次写，但 64 位 HotSpot 单次写是原子的。跨线程可见仍要同步。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「Java 不是 JavaScript，旁边是 JVM 和类库」的结论，答的不是这一问。","d":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。"}},
  {"id":"jb6-10","pointId":"cv-jdk-feature-release-six-months","stem":"为什么把 Oracle JDK 背成“每三年一版、OpenJDK 每三个月一版、所以 Oracle 更稳定”？","texts":["先编译成字节码，再交给 Java 虚拟机执行。Java 既指这门语言，也指这套平台。","功能版大约半年一发，LTS 隔几年一个。不是 Oracle 三年、OpenJDK 三月那套对照。","基本类型直接存值。两个整数相除仍是整数除法，小数部分被丢掉。","s 里没有指向任何对象。对 null 调用方法，会抛出 NullPointerException。"],"answer":"b","explain":"功能版大约半年一发，LTS 隔几年一个。不是 Oracle 三年、OpenJDK 三月那套对照。","whyWrong":{"a":"这一句是「Java 是一门语言，也是一套能跑字节码的平台」的结论，答的不是这一问。","c":"这一句是「八种基本类型存的是值，整数相除会丢掉小数」的结论，答的不是这一问。","d":"这一句是「引用类型存的是指向对象的引用，null 表示没有指向」的结论，答的不是这一问。"}},
  {"id":"pt1-1","pointId":"cv-algo-hash-lookup","stem":"在一组数里找两数之和，为什么两层循环经常不是好答案？","texts":["找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。"],"answer":"b","explain":"两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","whyWrong":{"a":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","c":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。","d":"这一句是「BFS、队列与最短步数」的结论，答的不是这一问。"}},
  {"id":"pt1-2","pointId":"cv-java-binary-search","stem":"有序数组查找不到目标时，为什么返回位置仍有用？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。"],"answer":"b","explain":"找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。","d":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。"}},
  {"id":"pt1-3","pointId":"cv-algo-stable-sort","stem":"按分数排序后再按姓名排，为什么第一次的相对顺序有时还在、有时乱了？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","快排平均是 O(n log n)，最坏可到 O(n²)，不是线性。"],"answer":"b","explain":"稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「快排平均是 n log n，最坏仍是平方，不是线性」的结论，答的不是这一问。"}},
  {"id":"pt1-4","pointId":"cv-hash-open-addressing-probe","stem":"为什么把 Hash 冲突的开放定址只写成“放到冲突位置的下一个空位”会丢探测序列？","texts":["找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。","无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。","工厂解决怎么造，策略解决怎么算，装饰器解决怎么套能力。分不清就先别两个类都建上。"],"answer":"b","explain":"开放定址有线性、二次、双重散列，不是只有“下一个空位”。HashMap 用的是链地址再树化。","whyWrong":{"a":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","c":"这一句是「BFS、队列与最短步数」的结论，答的不是这一问。","d":"这一句是「先问这一次变的是创建、连接，还是请求怎么走」的结论，答的不是这一问。"}},
  {"id":"pt1-5","pointId":"cv-quicksort-average-nlogn","stem":"有人把快速排序复杂度直接写成 O(n)，当成最优秀所以一定是线性。为什么不对？","texts":["找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","快排平均是 O(n log n)，最坏可到 O(n²)，不是线性。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。"],"answer":"b","explain":"快排平均是 O(n log n)，最坏可到 O(n²)，不是线性。稳定需求不要默认这种原地划分。","whyWrong":{"a":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","c":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。","d":"这一句是「BFS、队列与最短步数」的结论，答的不是这一问。"}},
  {"id":"pt1-6","pointId":"cv-algo-two-pointers","stem":"数组已经从小到大排好，找两数之和为什么不必再建哈希表？","texts":["无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。","有序数组上两端往中间走即可。打乱顺序后同一步会漏解；要原下标用哈希，不要先排序打乱。","先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。","工厂解决怎么造，策略解决怎么算，装饰器解决怎么套能力。分不清就先别两个类都建上。"],"answer":"b","explain":"有序数组上两端往中间走即可。打乱顺序后同一步会漏解；要原下标用哈希，不要先排序打乱。","whyWrong":{"a":"这一句是「BFS、队列与最短步数」的结论，答的不是这一问。","c":"这一句是「先把二十三种名字列全，再打开后面章节」的结论，答的不是这一问。","d":"这一句是「先问这一次变的是创建、连接，还是请求怎么走」的结论，答的不是这一问。"}},
  {"id":"pt1-7","pointId":"cv-bfs","stem":"无权图找最少步数，为什么常用 BFS？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。"],"answer":"b","explain":"无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。"}},
  {"id":"pt1-8","pointId":"cv-algo-sliding-window","stem":"每次求最近 k 个数的和，为什么从下标 0 再加一遍会超时？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","固定窗口靠加减进出元素更新，不要每个位置从头加一遍。","无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。","先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。"],"answer":"b","explain":"固定窗口靠加减进出元素更新，不要每个位置从头加一遍。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「BFS、队列与最短步数」的结论，答的不是这一问。","d":"这一句是「先把二十三种名字列全，再打开后面章节」的结论，答的不是这一问。"}},
  {"id":"pt1-9","pointId":"cv-pattern-gof-catalog","stem":"为什么一上来就写策略模式，却说不清这一章一共有哪些名字？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。指不出变化落在哪一类时，不要先画策略。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt1-10","pointId":"cv-pattern-family-test","stem":"为什么分不清该用工厂还是策略，就把两个类都建上？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","工厂解决怎么造，策略解决怎么算，装饰器解决怎么套能力。分不清就先别两个类都建上。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。"],"answer":"b","explain":"工厂解决怎么造，策略解决怎么算，装饰器解决怎么套能力。分不清就先别两个类都建上。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。"}},
  {"id":"pt2-1","pointId":"cv-pattern-gof-rest","stem":"为什么二十三里只记住策略和单例，其余都说“用不到可以不看”？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","策略和单例之外仍有撤销、遍历、命令等场景。指不出那一块变化时，不要用“用不到”跳过。","先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。","工厂方法把创建推给子类/创建者。create 里继续按类型 if，名字不成立。"],"answer":"b","explain":"策略和单例之外仍有撤销、遍历、命令等场景。指不出那一块变化时，不要用“用不到”跳过。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「先把二十三种名字列全，再打开后面章节」的结论，答的不是这一问。","d":"这一句是「工厂方法换的是创建哪一个产品」的结论，答的不是这一问。"}},
  {"id":"pt2-2","pointId":"cv-pattern-one-variation","stem":"为什么类名写成 DiscountFactory，里面仍是一长串 if，就觉得已经用了工厂？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","类名带 Factory 不够。调用方还要改一长串 if，工厂就没成立；变化应进可替换对象。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"类名带 Factory 不够。调用方还要改一长串 if，工厂就没成立；变化应进可替换对象。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt2-3","pointId":"cv-pattern-factory-method","stem":"为什么调用方已经不写 new，方法里却还在按类型 if，就叫工厂方法？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","工厂方法把创建推给子类/创建者。create 里继续按类型 if，名字不成立。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"工厂方法把创建推给子类/创建者。create 里继续按类型 if，名字不成立。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt2-4","pointId":"cv-pattern-builder-assemble","stem":"为什么参数可有可无时，就去加一套越来越长的构造器？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","可选部件用建造者分步放，缺必填在 build 失败。不要靠越来越长的构造器重载。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。"],"answer":"b","explain":"可选部件用建造者分步放，缺必填在 build 失败。不要靠越来越长的构造器重载。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。","d":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。"}},
  {"id":"pt2-5","pointId":"cv-pattern-singleton-scope","stem":"为什么类上有 getInstance，就把 Calendar、Spring Bean 和进程级对象都叫成同一个单例？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","进程级一份、容器一份、每次 new 不是同一种单例。范围内唯一也不保护可变字段。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"进程级一份、容器一份、每次 new 不是同一种单例。范围内唯一也不保护可变字段。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt2-6","pointId":"cv-pattern-adapter-shape","stem":"为什么第三方客户端的方法对不上自己的接口，就去改业务代码里的每一个调用？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","适配器对接方法名形状。业务只调自己的接口；缓冲重试别塞进转换类。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"适配器对接方法名形状。业务只调自己的接口；缓冲重试别塞进转换类。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt2-7","pointId":"cv-pattern-decorator-contract","stem":"为什么每加一种能力，就再建一个子类，最后出现缓冲加密文件流这种类？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","装饰器同接口层层加能力，可拆可组合。用子类笛卡尔积会把组合写死。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"装饰器同接口层层加能力，可拆可组合。用子类笛卡尔积会把组合写死。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt2-8","pointId":"cv-pattern-proxy-stand-in","stem":"代理和装饰器都是同一接口再包一层。为什么不能当成同一个模式？","texts":["找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","代理可以跳过或推迟目标；装饰器总是转发再加行为。同接口包一层不等于同一模式。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。"],"answer":"b","explain":"代理可以跳过或推迟目标；装饰器总是转发再加行为。同接口包一层不等于同一模式。","whyWrong":{"a":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","c":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。","d":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。"}},
  {"id":"pt2-9","pointId":"cv-pattern-facade-entry","stem":"为什么调用方要按顺序自己调用库存、支付和写单，还说这是三个策略？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","外观收成一次调用，子系统顺序留在里面。调用方还在选算法时，那一块仍是策略。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。","快排平均是 O(n log n)，最坏可到 O(n²)，不是线性。"],"answer":"b","explain":"外观收成一次调用，子系统顺序留在里面。调用方还在选算法时，那一块仍是策略。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。","d":"这一句是「快排平均是 n log n，最坏仍是平方，不是线性」的结论，答的不是这一问。"}},
  {"id":"pt2-10","pointId":"cv-pattern-bridge-two-axes","stem":"为什么消息种类再乘上发送通道，子类就变成普通加急短信、普通加急邮件这一串？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","两个变化维度分开继承。种类×通道用桥接，避免普通加急短信邮件那种子类爆炸。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"两个变化维度分开继承。种类×通道用桥接，避免普通加急短信邮件那种子类爆炸。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt3-1","pointId":"cv-pattern-composite-tree","stem":"为什么算总价时先 if 这是单品还是套装，套装里再写一遍？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","叶子与容器同一接口，容器转发给子节点。靠 instanceof 判断单品/套装，组合还没成立。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。"],"answer":"b","explain":"叶子与容器同一接口，容器转发给子节点。靠 instanceof 判断单品/套装，组合还没成立。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。","d":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。"}},
  {"id":"pt3-2","pointId":"cv-pattern-flyweight-share","stem":"为什么很多相同的商品规格各 new 一份，就把共享一份叫成单例？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","享元共享不变字段，变化靠参数传入。范围内只能有一份对象那是单例，不是享元。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"享元共享不变字段，变化靠参数传入。范围内只能有一份对象那是单例，不是享元。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt3-3","pointId":"cv-pattern-strategy-swap","stem":"为什么每加一种计价规则，都去结算方法里再写一个 else if？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","策略用同一接口替换算法。结算方法里继续堆 else if，策略就没成立。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"策略用同一接口替换算法。结算方法里继续堆 else if，策略就没成立。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt3-4","pointId":"cv-pattern-template-steps","stem":"为什么把打开、计算、关闭都写成子类可以随便重排的方法？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","模板方法固定步骤顺序，子类只替换某一步。需要重排整条流程时改用策略对象。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。"],"answer":"b","explain":"模板方法固定步骤顺序，子类只替换某一步。需要重排整条流程时改用策略对象。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。"}},
  {"id":"pt3-5","pointId":"cv-pattern-observer-push","stem":"为什么每增加一个要通知的模块，就去订单方法里再注入一个服务并调用它？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","旁路通知让下游自己登记。每加一个模块就往业务方法里注入调用，观察者还没成立。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"旁路通知让下游自己登记。每加一个模块就往业务方法里注入调用，观察者还没成立。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt3-6","pointId":"cv-pattern-chain-stop","stem":"为什么每个处理者都调用下一个，就和装饰器分不开？","texts":["找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","责任链可以中途停下不往后传。每一环都无条件转发，更像装饰器。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。"],"answer":"b","explain":"责任链可以中途停下不往后传。每一环都无条件转发，更像装饰器。","whyWrong":{"a":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","c":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。","d":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。"}},
  {"id":"pt3-7","pointId":"cv-pattern-state-transition","stem":"为什么订单用一个字符串 status，每个方法开头都写一遍 if？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","状态对象持有允许的动作并切换下一状态。用字符串 status 到处 if，状态模式没成立。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"状态对象持有允许的动作并切换下一状态。用字符串 status 到处 if，状态模式没成立。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"pt3-8","pointId":"cv-java-comparator-strategy","stem":"为什么要按姓名排序就去改 User 的 compareTo，按编号排序又得再改回来？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","排序规则用 Comparator 传入，不要改元素的 compareTo。","无权图边权都是 1 时，BFS 首次到达就是最少步数。visited 应在入队时标记。","先能按创建/结构/行为三列说出二十三个名字，再谈某一个模式。"],"answer":"b","explain":"排序规则用 Comparator 传入，不要改元素的 compareTo。第三种顺序只加比较器。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「BFS、队列与最短步数」的结论，答的不是这一问。","d":"这一句是「先把二十三种名字列全，再打开后面章节」的结论，答的不是这一问。"}},
  {"id":"pt3-9","pointId":"cv-java-buffered-stream-decorator","stem":"为什么套了 BufferedInputStream 之后，还以为只要关内层的文件流？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","缓冲流是装饰器：关最外层即可连带内层。不要为组合能力去建笛卡尔积子类。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。","开放定址有线性、二次、双重散列，不是只有“下一个空位”。"],"answer":"b","explain":"缓冲流是装饰器：关最外层即可连带内层。不要为组合能力去建笛卡尔积子类。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。","d":"这一句是「开放定址不是“冲突了就放右边那个空位”」的结论，答的不是这一问。"}},
  {"id":"pt3-10","pointId":"cv-java-proxy-needs-interface","stem":"为什么对一个没有接口的具体类调用 Proxy.newProxyInstance，期望得到它的子类？","texts":["两层循环是平方级。哈希记下见过的数，用目标去减再查，平均接近线性；小数据可以保持简单循环。","JDK 动态代理只代理接口，不会给具体类生成子类。没有接口就换别的代理方式。","找不到时返回值可解释为插入点。开闭区间不要混用；有重复时另写边界才保证第一次出现。","稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。"],"answer":"b","explain":"JDK 动态代理只代理接口，不会给具体类生成子类。没有接口就换别的代理方式。","whyWrong":{"a":"这一句是「要反复查找时，先用哈希表记住见过的值」的结论，答的不是这一问。","c":"这一句是「二分查找的不变量与边界」的结论，答的不是这一问。","d":"这一句是「对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚」的结论，答的不是这一问。"}},
  {"id":"sg1-1","pointId":"cv-spring-what-it-is","stem":"订单服务、库存客户端这些对象，是谁在启动时创建并接上依赖的？","texts":["构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","Boot 3 的清单在 AutoConfiguration.imports。","入口是 ApplicationContext。XmlBeanFactory 已删除；非懒加载单例在刷新时创建，不是“一定会建完所有 Bean”的口诀。"],"answer":"b","explain":"是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","whyWrong":{"a":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。","c":"这一句是「Boot 3 自动配置不再靠 spring.factories 那一张清单」的结论，答的不是这一问。","d":"这一句是「XmlBeanFactory 已删除，别把容器说成只有延迟工厂」的结论，答的不是这一问。"}},
  {"id":"sg1-2","pointId":"cv-spring-enter-boot","stem":"现在新建一个 Web 应用，文档建议用哪一套来启动 Spring 容器？","texts":["构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","切面只拦从外面进来的调用。同类内部调用不经过代理；先看这次调用有没有走过代理，再谈 JDK 还是 CGLIB。","this.方法() 不经过代理，上面的事务/切面可能没有。"],"answer":"b","explain":"用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","whyWrong":{"a":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。","c":"这一句是「切面加在代理上，接口走 JDK 代理，类走 CGLIB」的结论，答的不是这一问。","d":"这一句是「同类里 this.方法() 不会再进一次代理」的结论，答的不是这一问。"}},
  {"id":"sg1-3","pointId":"cv-spring-not-the-business","stem":"容器启动成功了，是不是订单能不能超卖也已经由框架保证？","texts":["构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","不是。容器只保证对象被接上。","现行内建作用域是 singleton、prototype，Web 还有 request、session、application、websocket。","同一属性会按来源顺序覆盖。要看激活的 profile、加载位置和启动参数，不以仓库里那一个 yml 为准。"],"answer":"b","explain":"不是。容器只保证对象被接上。超卖、库存和事务边界仍要你写清楚。","whyWrong":{"a":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。","c":"这一句是「Spring 内建作用域：别背 global-session 那一套」的结论，答的不是这一问。","d":"这一句是「Spring Boot 配置优先级与环境」的结论，答的不是这一问。"}},
  {"id":"sg1-4","pointId":"cv-spring-ioc-wiring","stem":"写了 @Autowired，为什么启动时报找不到 Bean？","texts":["构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。","现行内建作用域是 singleton、prototype，Web 还有 request、session、application、websocket。","同一属性会按来源顺序覆盖。要看激活的 profile、加载位置和启动参数，不以仓库里那一个 yml 为准。"],"answer":"b","explain":"找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。这些失败在启动期，不是第一次请求。","whyWrong":{"a":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。","c":"这一句是「Spring 内建作用域：别背 global-session 那一套」的结论，答的不是这一问。","d":"这一句是「Spring Boot 配置优先级与环境」的结论，答的不是这一问。"}},
  {"id":"sg1-5","pointId":"cv-spring-bean-lifecycle","stem":"构造器里调用另一个 Bean 的方法，为什么有时对象还没准备好？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg1-6","pointId":"cv-spring-scope-catalog","stem":"旧资料常写：Spring 支持五种作用域，其中包括 global-session，且框架里的 bean 都是单件。为什么这不能当现行答案？","texts":["不是。容器只保证对象被接上。","现行内建作用域是 singleton、prototype，Web 还有 request、session、application、websocket。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。","构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。"],"answer":"b","explain":"现行内建作用域是 singleton、prototype，Web 还有 request、session、application、websocket。global-session 不是通用答案；也不是所有 bean 都是单件。","whyWrong":{"a":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","c":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。","d":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。"}},
  {"id":"sg1-7","pointId":"cv-spring-external-config","stem":"为什么打包时的 application.yml 值被启动参数覆盖？","texts":["不是。容器只保证对象被接上。","同一属性会按来源顺序覆盖。要看激活的 profile、加载位置和启动参数，不以仓库里那一个 yml 为准。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。","默认可执行 jar，需要外置容器时仍可打 WAR。自动配置也可用 exclude 关掉；不是“完全不能 XML/配置文件”。"],"answer":"b","explain":"同一属性会按来源顺序覆盖。要看激活的 profile、加载位置和启动参数，不以仓库里那一个 yml 为准。","whyWrong":{"a":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","c":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。","d":"这一句是「Boot 能内嵌 Tomcat，也可以打 WAR 外置」的结论，答的不是这一问。"}},
  {"id":"sg1-8","pointId":"cv-spring-boot-war-still-ok","stem":"为什么把“不需要独立容器、完全不需要 XML”理解成不能打 WAR、不能写任何配置文件？","texts":["构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","默认可执行 jar，需要外置容器时仍可打 WAR。自动配置也可用 exclude 关掉；不是“完全不能 XML/配置文件”。","现行内建作用域是 singleton、prototype，Web 还有 request、session、application、websocket。","同一属性会按来源顺序覆盖。要看激活的 profile、加载位置和启动参数，不以仓库里那一个 yml 为准。"],"answer":"b","explain":"默认可执行 jar，需要外置容器时仍可打 WAR。自动配置也可用 exclude 关掉；不是“完全不能 XML/配置文件”。","whyWrong":{"a":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。","c":"这一句是「Spring 内建作用域：别背 global-session 那一套」的结论，答的不是这一问。","d":"这一句是「Spring Boot 配置优先级与环境」的结论，答的不是这一问。"}},
  {"id":"sg1-9","pointId":"cv-spring-boot3-autoconfig-imports","stem":"有人把 Starter 原理背成：启动时去 Maven 里读每个 starter 的 spring.factories，把里面的 bean 全塞进容器。为什么在 Boot 3 会说错？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","Boot 3 的清单在 AutoConfiguration.imports。","不是。容器只保证对象被接上。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"Boot 3 的清单在 AutoConfiguration.imports。不是启动时去 Maven 读 spring.factories 把 bean 全塞进容器。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg1-10","pointId":"cv-tomcat-nio-not-bio-default","stem":"为什么还把 Connector 默认背成 HTTP/1.1 等于 BIO，并把 maxSpareThreads 当成必须项？","texts":["构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","HTTP/1.1 默认是 NIO，不是 BIO。BIO 已移除；不要再背 maxSpareThreads 当必须项。","Boot 3 的清单在 AutoConfiguration.imports。","有 @Valid 且不接 BindingResult 时，缺字段直接 400。"],"answer":"b","explain":"HTTP/1.1 默认是 NIO，不是 BIO。BIO 已移除；不要再背 maxSpareThreads 当必须项。","whyWrong":{"a":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。","c":"这一句是「Boot 3 自动配置不再靠 spring.factories 那一张清单」的结论，答的不是这一问。","d":"这一句是「校验发生在绑定之后，失败要变成 400 而不是业务异常」的结论，答的不是这一问。"}},
  {"id":"sg2-1","pointId":"cv-spring-xmlbeanfactory-removed","stem":"旧资料把 XmlBeanFactory 当最常用 BeanFactory，又说 ApplicationContext 一定会在启动时把所有 Bean 建完。为什么这两句都不成立？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","入口是 ApplicationContext。XmlBeanFactory 已删除；非懒加载单例在刷新时创建，不是“一定会建完所有 Bean”的口诀。","构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","切面只拦从外面进来的调用。同类内部调用不经过代理；先看这次调用有没有走过代理，再谈 JDK 还是 CGLIB。"],"answer":"b","explain":"入口是 ApplicationContext。XmlBeanFactory 已删除；非懒加载单例在刷新时创建，不是“一定会建完所有 Bean”的口诀。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。","d":"这一句是「切面加在代理上，接口走 JDK 代理，类走 CGLIB」的结论，答的不是这一问。"}},
  {"id":"sg2-2","pointId":"cv-spring-mvc-dispatch","stem":"在 Filter 里抛出的异常，为什么 @ControllerAdvice 接不到？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","Filter 在 DispatcherServlet 之外。","不是。容器只保证对象被接上。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"Filter 在 DispatcherServlet 之外。Filter 里抛的异常，@ControllerAdvice 接不到；要按 Filter / 拦截器 / 控制器三层各自能看见的范围处理。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg2-3","pointId":"cv-spring-validation-binding","stem":"请求体缺了必填字段，为什么有时进了服务方法，有时直接 400？","texts":["不是。容器只保证对象被接上。","有 @Valid 且不接 BindingResult 时，缺字段直接 400。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。","同一属性会按来源顺序覆盖。要看激活的 profile、加载位置和启动参数，不以仓库里那一个 yml 为准。"],"answer":"b","explain":"有 @Valid 且不接 BindingResult 时，缺字段直接 400。自己接了 BindingResult，就要亲手收成 400，否则可能进了服务方法。","whyWrong":{"a":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","c":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。","d":"这一句是「Spring Boot 配置优先级与环境」的结论，答的不是这一问。"}},
  {"id":"sg2-4","pointId":"cv-spring-mvc-restcontroller","stem":"为什么说“表现层只能用 @Controller、不能用别的注解代替”不成立？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","@RestController 就是 @Controller 加 @ResponseBody，可以返回 JSON。","不是。容器只保证对象被接上。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"@RestController 就是 @Controller 加 @ResponseBody，可以返回 JSON。表现层不是只能写 @Controller 这一种。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg2-5","pointId":"cv-spring-mvc-controller-singleton","stem":"为什么发现并发串数据，就给 Controller 方法加 synchronized，或者改成多例？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","Controller 默认单例，请求状态不能放实例字段。","不是。容器只保证对象被接上。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"Controller 默认单例，请求状态不能放实例字段。加 synchronized 或改成多例都治不好串数据，状态放参数或请求作用域。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg2-6","pointId":"cv-spring-aop-proxy-type","stem":"同类里两个方法，为什么事务切面有时根本套不上？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","切面只拦从外面进来的调用。同类内部调用不经过代理；先看这次调用有没有走过代理，再谈 JDK 还是 CGLIB。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"切面只拦从外面进来的调用。同类内部调用不经过代理；先看这次调用有没有走过代理，再谈 JDK 还是 CGLIB。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg2-7","pointId":"cv-spring-aop-self-invocation","stem":"save() 上有事务，内部再调 this.publish()，publish 上的事务为什么可能没有？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","this.方法() 不经过代理，上面的事务/切面可能没有。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"this.方法() 不经过代理，上面的事务/切面可能没有。要独立事务就拆成两个 Bean，或显式走代理。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg2-8","pointId":"cv-spring-boot-aop-cglib-default","stem":"为什么还背“有接口就一定 JDK 动态代理”会在 Boot 项目里说错？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","Boot 默认常走 CGLIB，不是“有接口就一定 JDK”。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。","构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。"],"answer":"b","explain":"Boot 默认常走 CGLIB，不是“有接口就一定 JDK”。final 方法切不中，因为子类覆盖不了。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。","d":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。"}},
  {"id":"sg2-9","pointId":"cv-mybatis-what-it-is","stem":"接口方法一调用，谁去执行那条 SQL，并把列填进对象？","texts":["不是。容器只保证对象被接上。","是 MyBatis。它是 SQL 映射框架：语句写在映射里，运行时绑定参数并映射结果。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。","默认可执行 jar，需要外置容器时仍可打 WAR。自动配置也可用 exclude 关掉；不是“完全不能 XML/配置文件”。"],"answer":"b","explain":"是 MyBatis。它是 SQL 映射框架：语句写在映射里，运行时绑定参数并映射结果。","whyWrong":{"a":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","c":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。","d":"这一句是「Boot 能内嵌 Tomcat，也可以打 WAR 外置」的结论，答的不是这一问。"}},
  {"id":"sg2-10","pointId":"cv-mybatis-enter-mapper","stem":"只写了一个 Java 接口，没有写实现类，谁在运行时执行 SQL？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","MyBatis 给这个接口做绑定。方法对应一条语句，调用时才执行。","不是。容器只保证对象被接上。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"MyBatis 给这个接口做绑定。方法对应一条语句，调用时才执行。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg3-1","pointId":"cv-mybatis-parameters","stem":"把用户输入放进 ${name}，为什么不能当成普通参数绑定？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","#{} 才是参数绑定。${} 拼进 SQL 原文，用户输入不能当普通占位符；标识符只能来自后端白名单。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"#{} 才是参数绑定。${} 拼进 SQL 原文，用户输入不能当普通占位符；标识符只能来自后端白名单。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg3-2","pointId":"cv-mybatis-dynamic-sql","stem":"可选条件很多时，为什么不能把整段 WHERE 用字符串拼出来？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","可选条件用动态标签拼结构，值仍用占位符。整段 WHERE 字符串拼接会把用户输入写进语句原文。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"可选条件用动态标签拼结构，值仍用占位符。整段 WHERE 字符串拼接会把用户输入写进语句原文。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg3-3","pointId":"cv-mybatis-type-handler","stem":"库里是 JSON 字符串，实体是对象，为什么有时写出的是 toString()？","texts":["用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","库类型和 Java 类型之间要成对的 TypeHandler。","不是。容器只保证对象被接上。","构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。"],"answer":"b","explain":"库类型和 Java 类型之间要成对的 TypeHandler。缺了就会落到 toString 或错类型，不要靠方言函数代替。","whyWrong":{"a":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。"}},
  {"id":"sg3-4","pointId":"cv-mybatis-lazy-javassist-not-cglib","stem":"有人把 MyBatis 延迟加载背成一定用 CGLIB 代理、一 get 就再查。为什么不准确？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","默认代理工厂是 JAVASSIST，不是一定 CGLIB。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"默认代理工厂是 JAVASSIST，不是一定 CGLIB。延迟 SQL 出现在访问尚未加载的关联时，不是每个 getter 都再查。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg3-5","pointId":"cv-mybatis-batch-executor","stem":"循环 insert 一万行，为什么比一条批量 SQL 还慢很多？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","BATCH 把写语句攒到 flush 再发，减少往返。循环里穿插查询会打断批；重复键错误常在 flush 时才暴露。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"BATCH 把写语句攒到 flush 再发，减少往返。循环里穿插查询会打断批；重复键错误常在 flush 时才暴露。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg3-6","pointId":"cv-mybatis-plugin-interceptor","stem":"想给所有 SQL 打上耗时日志，为什么切 Mapper 接口不够？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","插件拦的是执行器/语句处理器，不是 Mapper 业务方法。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。","构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。"],"answer":"b","explain":"插件拦的是执行器/语句处理器，不是 Mapper 业务方法。签名写错就完全没有日志。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。","d":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。"}},
  {"id":"sg3-7","pointId":"cv-mybatis-rowbounds-memory","stem":"为什么把 MyBatis 分页只背成“用 RowBounds 就分页了”会在大结果集上出错？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","默认 RowBounds 仍可能先把大结果读回再跳过。数据库分页要写 LIMIT/keyset，不能只背“用了 RowBounds”。","不是。容器只保证对象被接上。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"默认 RowBounds 仍可能先把大结果读回再跳过。数据库分页要写 LIMIT/keyset，不能只背“用了 RowBounds”。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg3-8","pointId":"cv-mybatis-second-cache","stem":"打开 mapper 的 cache 之后，别的事务改了行，为什么这边还读到旧的？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","二级缓存在 namespace 上跨会话，提交后才对其它会话可见。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"二级缓存在 namespace 上跨会话，提交后才对其它会话可见。联表带出别的 mapper 改的数据时，不要开二级缓存。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg3-9","pointId":"cv-mybatis-log-preparing-parameters","stem":"为什么把 Mapper 日志打开了，复制出来的语句里还是问号，贴到客户端就执行不了？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","DEBUG 下语句带问号，参数在下一行。要可执行语句得自己拼，或看会内联参数的 JDBC/池日志。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"DEBUG 下语句带问号，参数在下一行。要可执行语句得自己拼，或看会内联参数的 JDBC/池日志。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg3-10","pointId":"cv-mybatis-jdbc-log-inlines","stem":"为什么 MyBatis 已经打了 Parameters，数据库里慢日志里的语句却多了 LIMIT？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","MyBatis 打的是 XML 原文参数行；连接池/JDBC 日志里可能已有分页改写后的 LIMIT。","不是。容器只保证对象被接上。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"MyBatis 打的是 XML 原文参数行；连接池/JDBC 日志里可能已有分页改写后的 LIMIT。慢日志看最终发到库的那条。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg4-1","pointId":"cv-mybatis-debug-boundsql","stem":"为什么在 Mapper 方法上打断点，调试器进不去，也看不到要执行的 SQL？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","Mapper 接口没有方法体，断点打在接口上进不去。看代理后的调用，或从 BoundSql 读改写后的语句。","不是。容器只保证对象被接上。","同一属性会按来源顺序覆盖。要看激活的 profile、加载位置和启动参数，不以仓库里那一个 yml 为准。"],"answer":"b","explain":"Mapper 接口没有方法体，断点打在接口上进不去。看代理后的调用，或从 BoundSql 读改写后的语句。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「Spring Boot 配置优先级与环境」的结论，答的不是这一问。"}},
  {"id":"sg4-2","pointId":"cv-mybatis-pagehelper-next-query","stem":"为什么 startPage 写在前面，分页却落到了另一条 SQL 上，或者下一个请求突然多了 LIMIT？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","startPage 只影响之后第一条查询。查询被跳过又不 clearPage，分页会粘到下一线程请求上。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","有 @Valid 且不接 BindingResult 时，缺字段直接 400。"],"answer":"b","explain":"startPage 只影响之后第一条查询。查询被跳过又不 clearPage，分页会粘到下一线程请求上。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「校验发生在绑定之后，失败要变成 400 而不是业务异常」的结论，答的不是这一问。"}},
  {"id":"sg4-3","pointId":"cv-mybatis-plus-page-argument","stem":"为什么 Mapper 已经传了 Page，SQL 里却有两段 LIMIT，或者已删除的行还能查出来？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","分页拦截器与手写 LIMIT 叠在一起会双 LIMIT。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"分页拦截器与手写 LIMIT 叠在一起会双 LIMIT。逻辑删除条件不会自动进手写 XML；Boot 3 要配对的 starter。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg4-4","pointId":"cv-mybatis-middleware-layers","stem":"面试问项目里 MyBatis 用了哪些中间件，报出一串名字。为什么这样仍然说不清 SQL 是谁改的？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","先分清谁改连接、谁改 SQL、谁让你看见最终语句。报一串中间件名字，仍要能指出这一次 LIMIT/库名是哪一层写上的。","不是。容器只保证对象被接上。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"先分清谁改连接、谁改 SQL、谁让你看见最终语句。报一串中间件名字，仍要能指出这一次 LIMIT/库名是哪一层写上的。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg4-5","pointId":"cv-es-what-and-when","stem":"为什么一说“全文搜索、日志检索”，资料就推 Elasticsearch，却又不能把它当订单主库？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","ES 适合全文检索与分析。订单主账本仍在数据库，不能当万能库。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"ES 适合全文检索与分析。订单主账本仍在数据库，不能当万能库。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg4-6","pointId":"cv-es-tradeoffs-capacity","stem":"为什么面试常问“ES 并发多少、能撑多少数据”，却很难有一句标准答案？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","没有固定的并发/容量口号。看分片体积与查询形态，用压测。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"没有固定的并发/容量口号。看分片体积与查询形态，用压测。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg4-7","pointId":"cv-es-vs-db-search","stem":"为什么商品名用 `LIKE '%手机%'` 能出结果，却仍常把搜索放到 Elasticsearch？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","LIKE 能出结果也不等于检索系统。ES 提供分词相关性与规模化筛选，是可重建投影。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"LIKE 能出结果也不等于检索系统。ES 提供分词相关性与规模化筛选，是可重建投影。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg4-8","pointId":"cv-es-inverted-index","stem":"为什么搜索“手机”不用把每一篇商品描述都扫一遍？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","倒排是词指向文档列表。写入与查询要用同一套分析，精确值别走分词字段。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","不是。容器只保证对象被接上。"],"answer":"b","explain":"倒排是词指向文档列表。写入与查询要用同一套分析，精确值别走分词字段。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「Spring 装配对象，不代替业务规则和 SQL」的结论，答的不是这一问。"}},
  {"id":"sg4-9","pointId":"cv-es-lucene-not-btree","stem":"资料写 Lucene 用 B+ 树只能一个库，ES 才用倒排做分布式。为什么不能当答案？","texts":["是 Spring 容器。Spring 是给 Java 应用装配对象的应用框架，核心是控制反转。","Lucene 与 ES 检索都是倒排，不是“Lucene=B+树、ES 才倒排”。","用 Spring Boot。主类上的 SpringApplication.run 启动容器，并按类路径自动配置。","找不到 Bean 多半是还没进容器（扫描包不对），或类型有多个候选说不清。"],"answer":"b","explain":"Lucene 与 ES 检索都是倒排，不是“Lucene=B+树、ES 才倒排”。","whyWrong":{"a":"这一句是「Spring 是给 Java 应用装配对象的应用框架」的结论，答的不是这一问。","c":"这一句是「Spring Boot 启动一个已经装配好的应用」的结论，答的不是这一问。","d":"这一句是「容器先造对象，再按类型或名字注入依赖」的结论，答的不是这一问。"}},
  {"id":"sg4-10","pointId":"cv-elastic-analysis","stem":"文本里明明有单词，为什么搜索时匹配不到？","texts":["构造器里只有构造参数已经存在。字段注入发生在构造之后，所以构造器里读字段常为 null；初始化回调才适合做依赖齐全后的检查。","匹配不到先看 mapping 与分析器。索引时和查询时的 token 要对得上。","同一属性会按来源顺序覆盖。要看激活的 profile、加载位置和启动参数，不以仓库里那一个 yml 为准。","默认可执行 jar，需要外置容器时仍可打 WAR。自动配置也可用 exclude 关掉；不是“完全不能 XML/配置文件”。"],"answer":"b","explain":"匹配不到先看 mapping 与分析器。索引时和查询时的 token 要对得上。","whyWrong":{"a":"这一句是「Bean 先造出来，再注入，然后才初始化」的结论，答的不是这一问。","c":"这一句是「Spring Boot 配置优先级与环境」的结论，答的不是这一问。","d":"这一句是「Boot 能内嵌 Tomcat，也可以打 WAR 外置」的结论，答的不是这一问。"}},
  {"id":"nx1-1","pointId":"cv-browser-security-what","stem":"Cookie、XSS 和 CSP 这几课，共同在回答哪一件事？","texts":["Permissions-Policy 管强大 API 是否可用。","谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。","COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。"],"answer":"b","explain":"谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","whyWrong":{"a":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。","c":"这一句是「Document-Policy 管文档行为预算，不是 Permissions-Policy 换皮」的结论，答的不是这一问。","d":"这一句是「COOP/COEP 换来 crossOriginIsolated，不是普通 CORS 换皮」的结论，答的不是这一问。"}},
  {"id":"nx1-2","pointId":"cv-csp-script-src","stem":"配了 Content-Security-Policy，为什么还要转义用户评论里的标签？","texts":["Permissions-Policy 管强大 API 是否可用。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。","主要限制 Referer 泄露多少。CSRF/会话仍靠 SameSite、令牌与服务端校验。"],"answer":"b","explain":"只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。评论转义仍然要留着，尖括号应显示成文本而不是节点。","whyWrong":{"a":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。","c":"这一句是「Document-Policy 管文档行为预算，不是 Permissions-Policy 换皮」的结论，答的不是这一问。","d":"这一句是「Referrer-Policy 管带多少来源信息，不是防 CSRF 的主闸」的结论，答的不是这一问。"}},
  {"id":"nx1-3","pointId":"cv-csp-report-only-not-enforce","stem":"为什么上了 Content-Security-Policy-Report-Only 之后，外源脚本还能执行？","texts":["卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","Permissions-Policy 管强大 API 是否可用。","清的是浏览器侧该源的 Cookie/存储/缓存等。完整注销还要服务端作废会话与令牌。"],"answer":"b","explain":"Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","whyWrong":{"a":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","c":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。","d":"这一句是「Clear-Site-Data 清浏览器存的数据，不是服务端会话注销本身」的结论，答的不是这一问。"}},
  {"id":"nx1-4","pointId":"cv-trusted-types-sink-guard","stem":"为什么开了 require-trusted-types-for script 之后，innerHTML 赋普通字符串会抛错，有人却以为评论可以不转义了？","texts":["Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","Permissions-Policy 管强大 API 是否可用。","Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。"],"answer":"b","explain":"卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","whyWrong":{"a":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","c":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。","d":"这一句是「Document-Policy 管文档行为预算，不是 Permissions-Policy 换皮」的结论，答的不是这一问。"}},
  {"id":"nx1-5","pointId":"cv-permissions-policy-feature-gate","stem":"为什么配了 Permissions-Policy: camera=() 之后，第三方脚本还在跑，只是 getUserMedia 失败？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","Permissions-Policy 管强大 API 是否可用。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"Permissions-Policy 管强大 API 是否可用。脚本来源与执行仍靠 CSP。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"nx1-6","pointId":"cv-document-policy-not-permissions-policy","stem":"为什么已经配了 Permissions-Policy 关掉摄像头，安全评审还要你再谈 Document-Policy？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx1-7","pointId":"cv-coop-coep-cross-origin-isolated","stem":"为什么只配了 CORS，SharedArrayBuffer 仍不可用，控制台却提 cross-origin isolated？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。"],"answer":"b","explain":"COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。CORS 管脚本读跨源响应。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","d":"这一句是「Document-Policy 管文档行为预算，不是 Permissions-Policy 换皮」的结论，答的不是这一问。"}},
  {"id":"nx1-8","pointId":"cv-referrer-policy-leak-bound","stem":"为什么设了 Referrer-Policy: no-referrer 之后，跨站表单带 Cookie 改数据仍然可能成功？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","主要限制 Referer 泄露多少。CSRF/会话仍靠 SameSite、令牌与服务端校验。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。"],"answer":"b","explain":"主要限制 Referer 泄露多少。CSRF/会话仍靠 SameSite、令牌与服务端校验。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「COOP/COEP 换来 crossOriginIsolated，不是普通 CORS 换皮」的结论，答的不是这一问。"}},
  {"id":"nx1-9","pointId":"cv-sri-integrity-not-csp","stem":"为什么 CDN 脚本加了 integrity，CSP 的 script-src 仍可能拒绝加载？","texts":["Permissions-Policy 管强大 API 是否可用。","SRI 核对子资源字节摘要。CSP script-src 限制允许的脚本来源。","清的是浏览器侧该源的 Cookie/存储/缓存等。完整注销还要服务端作废会话与令牌。","PNA 拦的是更公开上下文访问更私有网络。普通 CORS 只管跨源读响应。"],"answer":"b","explain":"SRI 核对子资源字节摘要。CSP script-src 限制允许的脚本来源。","whyWrong":{"a":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。","c":"这一句是「Clear-Site-Data 清浏览器存的数据，不是服务端会话注销本身」的结论，答的不是这一问。","d":"这一句是「公网站点访问内网要过 Private Network Access，不是普通 CORS 放行就够」的结论，答的不是这一问。"}},
  {"id":"nx1-10","pointId":"cv-clear-site-data-not-full-logout","stem":"为什么响应头带了 Clear-Site-Data: \"cookies\"，服务端 session 表里的行还在，换设备仍可能登着？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","清的是浏览器侧该源的 Cookie/存储/缓存等。完整注销还要服务端作废会话与令牌。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"清的是浏览器侧该源的 Cookie/存储/缓存等。完整注销还要服务端作废会话与令牌。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx2-1","pointId":"cv-reporting-nel-not-csp-enforce","stem":"为什么配了 Report-To 和 NEL 之后，外源脚本和失败的请求仍然发生，安全同学却说“已经接上报”？","texts":["卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","Reporting/NEL 提供违例与网络失败的遥测。挡未允许脚本靠强制 CSP。","Permissions-Policy 管强大 API 是否可用。","Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。"],"answer":"b","explain":"Reporting/NEL 提供违例与网络失败的遥测。挡未允许脚本靠强制 CSP。","whyWrong":{"a":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","c":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。","d":"这一句是「Document-Policy 管文档行为预算，不是 Permissions-Policy 换皮」的结论，答的不是这一问。"}},
  {"id":"nx2-2","pointId":"cv-corp-embed-gate-not-cors","stem":"为什么静态资源加了 Access-Control-Allow-Origin: *，在 COEP 页面里仍加载失败，提示 CORP？","texts":["卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","CORP 管嵌入/加载许可。CORS 管脚本读跨源响应。","Permissions-Policy 管强大 API 是否可用。","Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。"],"answer":"b","explain":"CORP 管嵌入/加载许可。CORS 管脚本读跨源响应。","whyWrong":{"a":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","c":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。","d":"这一句是「Document-Policy 管文档行为预算，不是 Permissions-Policy 换皮」的结论，答的不是这一问。"}},
  {"id":"nx2-3","pointId":"cv-pna-private-network-access","stem":"为什么公网前端 fetch 到 192.168.x / localhost 时，浏览器报 Private Network Access，而你已经配了 Access-Control-Allow-Origin？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","PNA 拦的是更公开上下文访问更私有网络。普通 CORS 只管跨源读响应。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"PNA 拦的是更公开上下文访问更私有网络。普通 CORS 只管跨源读响应。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"nx2-4","pointId":"cv-fenced-frame-embed-boundary","stem":"为什么广告文档说要用 fencedframe，你却以为改个标签名、照旧同 document 通信就行？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","Fenced Frame 强调与嵌入方的信息隔离，服务隐私广告等场景。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"Fenced Frame 强调与嵌入方的信息隔离，服务隐私广告等场景。普通 iframe 仍适合可控的同产品嵌入与约定通信。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"nx2-5","pointId":"cv-attribution-reporting-not-cookie","stem":"为什么隐私沙盒说用 Attribution Reporting 做转化归因，运营却还在问“Cookie 没了怎么打通用户”？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","ARA 交付受约束的归因报告（常含延迟与噪声）。它不复刻跨站稳定用户标识与完整行为明细。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","Permissions-Policy 管强大 API 是否可用。"],"answer":"b","explain":"ARA 交付受约束的归因报告（常含延迟与噪声）。它不复刻跨站稳定用户标识与完整行为明细。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","d":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。"}},
  {"id":"nx2-6","pointId":"cv-storage-access-api-not-cookie-restore","stem":"为什么隐私模式拦了第三方 Cookie 之后，有人说“调一下 Storage Access API 就能和以前一样通登”？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","嵌入第三方在用户手势等条件下申请自己的存储访问。不是宿主代读，也不是无约束的跨站追踪复辟。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"嵌入第三方在用户手势等条件下申请自己的存储访问。不是宿主代读，也不是无约束的跨站追踪复辟。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx2-7","pointId":"cv-fedcm-not-oauth-popup","stem":"为什么隐私沙盒推 FedCM，前端却还在用 window.open 弹 OAuth 回调页并以为等价？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","FedCM 由浏览器中介联合登录流程。它不是应用自管 OAuth 弹窗的别名，对第三方 Cookie 的依赖模型也不同。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"FedCM 由浏览器中介联合登录流程。它不是应用自管 OAuth 弹窗的别名，对第三方 Cookie 的依赖模型也不同。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx2-8","pointId":"cv-topics-api-not-cookie-segments","stem":"为什么隐私沙盒说用 Topics 做兴趣广告，运营还按「和第三方 Cookie 细分人群一样准」验收？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","Topics 交付粗粒度、受约束的兴趣主题。它不复刻跨站稳定用户标识与精细行为明细。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"Topics 交付粗粒度、受约束的兴趣主题。它不复刻跨站稳定用户标识与精细行为明细。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"nx2-9","pointId":"cv-shared-storage-not-third-party-cookie","stem":"为什么有人听到 Shared Storage 能「跨站存一点东西」，就当成 document.cookie 跨站读写回来了？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","Shared Storage 是受限跨站存储与选择/聚合工作台。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Permissions-Policy 管强大 API 是否可用。"],"answer":"b","explain":"Shared Storage 是受限跨站存储与选择/聚合工作台。不是第三方 Cookie 或开放 KV。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。"}},
  {"id":"nx2-10","pointId":"cv-private-state-tokens-not-cookie","stem":"为什么隐私沙盒文档写 Private State Tokens，有人却当成“又能种一个跨站会话 Cookie”？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","PST 证明有限的信任/检查结果。它不是通用会话，也不能当稳定跨站用户标识。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"PST 证明有限的信任/检查结果。它不是通用会话，也不能当稳定跨站用户标识。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"nx3-1","pointId":"cv-protected-audience-not-cookie-remarketing","stem":"为什么关掉第三方 Cookie 后，有人说“Protected Audience 就是以前的再营销名单换个名”？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","PA 以设备侧兴趣群组与受限竞价为核心。它不复刻第三方任意读写的跨站再营销 Cookie 模型。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"PA 以设备侧兴趣群组与受限竞价为核心。它不复刻第三方任意读写的跨站再营销 Cookie 模型。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx3-2","pointId":"cv-related-website-sets-not-cookie-restore","stem":"为什么登记了 Related Website Sets（曾名 First-Party Sets）之后，有人以为「组内站点又可以随便共享第三方 Cookie 了」？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","RWS 降低同组内 Storage Access 申请的提示摩擦。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"RWS 降低同组内 Storage Access 申请的提示摩擦。仍要显式申请；不自动共享或合并 Cookie。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx3-3","pointId":"cv-bounce-tracking-mitigation-not-session-bug","stem":"为什么用户只经过一次跳转站，回来后第三方小部件登录态没了，有人就开单「浏览器会话 bug」？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","缓解针对短访跳转追踪链上的状态。一等登录应落在用户停留的站点会话，不靠 bounce 域当跨站 id。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"缓解针对短访跳转追踪链上的状态。一等登录应落在用户停留的站点会话，不靠 bounce 域当跨站 id。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx3-4","pointId":"cv-ua-client-hints-need-accept-ch","stem":"为什么文档写了 Sec-CH-UA，有人还按「每次请求都会带上完整浏览器/系统细节」来做兼容分支？","texts":["卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","高熵 Client Hints 通常要 Accept-CH 声明且浏览器可拒绝。","主要限制 Referer 泄露多少。CSRF/会话仍靠 SameSite、令牌与服务端校验。","CORP 管嵌入/加载许可。CORS 管脚本读跨源响应。"],"answer":"b","explain":"高熵 Client Hints 通常要 Accept-CH 声明且浏览器可拒绝。","whyWrong":{"a":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","c":"这一句是「Referrer-Policy 管带多少来源信息，不是防 CSRF 的主闸」的结论，答的不是这一问。","d":"这一句是「CORP 管别人能不能嵌你的资源，不是 CORS 读响应的换皮」的结论，答的不是这一问。"}},
  {"id":"nx3-5","pointId":"cv-reduced-ua-not-stable-device-id","stem":"为什么浏览器做了 UA reduction，日志里还能看到 User-Agent，有人就继续用整串当“设备唯一 id”？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","削减后 UA 仍可能存在但更粗、更不适合当设备主键。身份与会话靠服务端凭证；细节用可缺的 Client Hints。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"削减后 UA 仍可能存在但更粗、更不适合当设备主键。身份与会话靠服务端凭证；细节用可缺的 Client Hints。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx3-6","pointId":"cv-captcha-challenge-not-authn","stem":"为什么登录页过了验证码，安全评审还说「你并没有做授权」？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","验证码提高机器滥用成本。登录认证与对象授权另做。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","Permissions-Policy 管强大 API 是否可用。"],"answer":"b","explain":"验证码不是登录认证，也替不了授权。验证码提高机器滥用成本。登录认证与对象授权另做。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","d":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。"}},
  {"id":"nx3-7","pointId":"cv-bot-mitigation-not-only-widget","stem":"为什么页面嵌了验证码挂件，安全仍说防刷不够，而且有人还把挑战 token 当成登录态？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","挑战 token 证明单次反滥用通过。会话靠服务端登录凭证。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"挑战 token 证明单次反滥用通过。会话靠服务端登录凭证。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx3-8","pointId":"cv-spring-security-what","stem":"HTTP 请求进应用之后，谁先问「你是谁」和「你能不能做这件事」？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","是 Spring Security。它用过滤器链做认证和授权，不是只提供一个登录页。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"是 Spring Security。它用过滤器链做认证和授权，不是只提供一个登录页。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx3-9","pointId":"cv-spring-security-enter-chain","stem":"没带登录态的请求，是在控制器方法里才失败，还是更早？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","更早。Security 过滤器链在 DispatcherServlet 之前处理，未认证就回 401 或登录页。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。"],"answer":"b","explain":"更早。Security 过滤器链在 DispatcherServlet 之前处理，未认证就回 401 或登录页。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「COOP/COEP 换来 crossOriginIsolated，不是普通 CORS 换皮」的结论，答的不是这一问。"}},
  {"id":"nx3-10","pointId":"cv-spring-security-filter-chain","stem":"控制器第一行写了 if (user == null) return 401，为什么未登录请求仍可能进到业务方法？","texts":["Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","认证在过滤链完成。控制器里 if user==null 挡不住未登录；对象归属还要在服务里查。","COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。","SRI 核对子资源字节摘要。CSP script-src 限制允许的脚本来源。"],"answer":"b","explain":"认证在过滤链完成。控制器里 if user==null 挡不住未登录；对象归属还要在服务里查。","whyWrong":{"a":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","c":"这一句是「COOP/COEP 换来 crossOriginIsolated，不是普通 CORS 换皮」的结论，答的不是这一问。","d":"这一句是「SRI 校验这一份资源字节，不是 CSP 脚本来源白名单的换皮」的结论，答的不是这一问。"}},
  {"id":"nx4-1","pointId":"cv-spring-authn-authz","stem":"用户已经登录，为什么管理接口仍可能返回拒绝？","texts":["卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","登录是认证，管理接口还要授权。已登录仍可能因缺权限被拒绝。","Permissions-Policy 管强大 API 是否可用。","Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。"],"answer":"b","explain":"登录是认证，管理接口还要授权。已登录仍可能因缺权限被拒绝。","whyWrong":{"a":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","c":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。","d":"这一句是「Document-Policy 管文档行为预算，不是 Permissions-Policy 换皮」的结论，答的不是这一问。"}},
  {"id":"nx4-2","pointId":"cv-abac-subject-object-attributes","stem":"心内科来了第二位护士，为什么不必再为每本病历写一条名单？","texts":["Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","〔ABAC｜按主体、客体、动作和环境的属性来评估规则的访问控制〕写的是属性组合。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","Permissions-Policy 管强大 API 是否可用。"],"answer":"b","explain":"〔ABAC｜按主体、客体、动作和环境的属性来评估规则的访问控制〕写的是属性组合。新人带上同样的属性即可。","whyWrong":{"a":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","c":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","d":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。"}},
  {"id":"nx4-3","pointId":"cv-spring-oauth2-resource","stem":"API 只收 Bearer Token，为什么还去配用户名密码登录页？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Bearer API 是资源服务器校验令牌。用户名密码登录页属于授权服务器，不要混成一套。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","Reporting/NEL 提供违例与网络失败的遥测。挡未允许脚本靠强制 CSP。"],"answer":"b","explain":"Bearer API 是资源服务器校验令牌。用户名密码登录页属于授权服务器，不要混成一套。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Reporting / NEL 是遥测管道，不是又一道强制 CSP」的结论，答的不是这一问。"}},
  {"id":"nx4-4","pointId":"cv-oidc-id-token-pkce","stem":"拿到 Access Token 就算登录完成了吗？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","登录结果在〔ID Token｜发给客户端、声明这次登录的 JWT〕里。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"登录结果在〔ID Token｜发给客户端、声明这次登录的 JWT〕里。Access Token 是交给资源服务器的，不是这次登录的声明。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx4-5","pointId":"cv-ssrf-allowlist-before-fetch","stem":"用户已经登录，为什么仍不能把对方传来的地址直接拿去下载？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","登录只说明是谁。〔SSRF｜服务器按收到的地址去取内容，却没有核对目标是不是预期的〕看的是取回的目标。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"登录只说明是谁。〔SSRF｜服务器按收到的地址去取内容，却没有核对目标是不是预期的〕看的是取回的目标。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx4-6","pointId":"cv-sshd-rate-limit-not-lastb","stem":"为什么“每分钟 lastb 计数超过 10 就 iptables DROP”看起来能用，其实不可靠？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","靠 lastb 计数再 iptables 不可靠。先关密码登录并限 MaxAuthTries，再用 Fail2ban 一类组件。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"靠 lastb 计数再 iptables 不可靠。先关密码登录并限 MaxAuthTries，再用 Fail2ban 一类组件。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx4-7","pointId":"cv-password-adaptive-hash","stem":"把口令做一次 SHA-256 再入库，为什么仍然不够？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","一次 SHA-256 太快。口令要盐加自适应慢哈希，不能可逆加密当方案。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"一次 SHA-256 太快。口令要盐加自适应慢哈希，不能可逆加密当方案。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"nx4-8","pointId":"cv-spring-csrf-spa","stem":"前后端分离了，是不是可以关掉 CSRF？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","不是。Cookie 会话仍要 CSRF。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。","Permissions-Policy 管强大 API 是否可用。"],"answer":"b","explain":"不是。Cookie 会话仍要 CSRF。只有脚本自己加的 Authorization 头才不走同一条 CSRF。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。","d":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。"}},
  {"id":"nx4-9","pointId":"cv-spring-security-cors","stem":"网关配了允许的 Origin，是不是就等于接口安全了？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","不是。网关允许 Origin 只约束浏览器跨源读响应，不等于接口已经鉴权。","Permissions-Policy 管强大 API 是否可用。","主要限制 Referer 泄露多少。CSRF/会话仍靠 SameSite、令牌与服务端校验。"],"answer":"b","explain":"不是。网关允许 Origin 只约束浏览器跨源读响应，不等于接口已经鉴权。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。","d":"这一句是「Referrer-Policy 管带多少来源信息，不是防 CSRF 的主闸」的结论，答的不是这一问。"}},
  {"id":"nx4-10","pointId":"cv-runtime-config","stem":"把生产数据库密码写进打好的 jar，换环境时为什么会带错？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","密钥放运行环境注入，不进 jar 与镜像层。同一制品靠启动配置区分环境。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"密钥放运行环境注入，不进 jar 与镜像层。同一制品靠启动配置区分环境。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx5-1","pointId":"cv-spring-session-stateless","stem":"接口已经用 JWT，为什么日志里还在写 SESSION 并且发 Set-Cookie？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","STATELESS 不再发会话 Cookie。JWT 认证仍在，只是不为这次请求建服务端会话。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"STATELESS 不再发会话 Cookie。JWT 认证仍在，只是不为这次请求建服务端会话。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx5-2","pointId":"cv-jwt-payload-not-encrypted","stem":"为什么把 JWT 说成用解密算法逆向解开用户信息？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","未加密 JWT 的 payload 可直接解码阅读，不是密文。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"未加密 JWT 的 payload 可直接解码阅读，不是密文。踢人靠黑名单或会话，不是“解密观感”。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"nx5-3","pointId":"cv-netty-what-it-is","stem":"要在 Java 里自己管连接、字节和编解码，而不是先上一个 HTTP 框架，用的是哪一套？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","用 Netty。它是异步、事件驱动的网络应用框架，用来写协议和连接，不是现成的业务 HTTP 服务器。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"用 Netty。它是异步、事件驱动的网络应用框架，用来写协议和连接，不是现成的业务 HTTP 服务器。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"nx5-4","pointId":"cv-netty-enter-bootstrap","stem":"写好了 Handler，怎样让它开始在某个端口上收连接？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","用 ServerBootstrap 配上 EventLoopGroup、Channel 类型和管道，再 bind 端口。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"用 ServerBootstrap 配上 EventLoopGroup、Channel 类型和管道，再 bind 端口。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx5-5","pointId":"cv-netty-not-spring-mvc","stem":"已经有 Spring MVC，是不是就不需要理解 Netty？反过来能不能用 Netty 代替 @GetMapping？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","不是一回事。MVC 处理 HTTP 请求和控制器。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","Permissions-Policy 管强大 API 是否可用。"],"answer":"b","explain":"不是一回事。MVC 处理 HTTP 请求和控制器。Netty 处理连接和字节。多数业务先用 MVC；要自己写协议再下到 Netty。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Permissions-Policy 关的是浏览器能力，不是脚本来源白名单」的结论，答的不是这一问。"}},
  {"id":"nx5-6","pointId":"cv-netty-pipeline-handler","stem":"为什么解码还没完成，业务 handler 就拿到了半包？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","先拆帧再解码再进业务。半包说明拆帧缺了或顺序错了。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"先拆帧再解码再进业务。半包说明拆帧缺了或顺序错了。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"nx5-7","pointId":"cv-netty-bytebuf-leak","stem":"堆看起来还很空，为什么进程已经因为 Direct buffer 崩了？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Direct buffer 在堆外。读完与异常路径都要释放，堆空不代表安全。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。"],"answer":"b","explain":"Direct buffer 在堆外。读完与异常路径都要释放，堆空不代表安全。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「COOP/COEP 换来 crossOriginIsolated，不是普通 CORS 换皮」的结论，答的不是这一问。"}},
  {"id":"nx5-8","pointId":"cv-nio-not-one-thread-per-request","stem":"为什么把 NIO 说成一个请求一个线程，只是先注册到多路复用器？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","NIO 用少量线程在 Selector 上等就绪，不是一请求一线程。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"NIO 用少量线程在 Selector 上等就绪，不是一请求一线程。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx5-9","pointId":"cv-epoll-et-must-drain","stem":"为什么在 EPOLLET 下读了 200 字节还有 300 字节，就以为剩下的会再来一次可读事件？","texts":["只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","边缘触发只在状态变化时通知一次。必须非阻塞读到 EAGAIN，剩下的不会再敲门。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。","卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。"],"answer":"b","explain":"边缘触发只在状态变化时通知一次。必须非阻塞读到 EAGAIN，剩下的不会再敲门。","whyWrong":{"a":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","c":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。","d":"这一句是「Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML」的结论，答的不是这一问。"}},
  {"id":"nx5-10","pointId":"cv-netty-idle-heartbeat","stem":"对端已经断电，为什么这条连接在服务端还一直占着？","texts":["谁能读到登录凭证，谁能在页面里跑脚本。同源、Cookie 属性和内容安全策略都围着这两问。","对端断电要靠空闲检测与心跳关连接，不要等操作系统很久才回收。","只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。","Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。"],"answer":"b","explain":"对端断电要靠空闲检测与心跳关连接，不要等操作系统很久才回收。","whyWrong":{"a":"这一句是「浏览器安全管的是谁能读凭证、谁能跑脚本」的结论，答的不是这一问。","c":"这一句是「CSP 白名单限制脚本从哪来，不是代替转义 HTML」的结论，答的不是这一问。","d":"这一句是「Report-Only 只上报违例，不会替你拦住脚本」的结论，答的不是这一问。"}},
  {"id":"rs1-1","pointId":"cv-ts-satisfies","stem":"给主题对象加 as Theme，为什么会丢掉“这个键一定是这几个颜色”？","texts":["新 React 代码默认 TypeScript。Flow 不是现行并列必学。","satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","外域 script src 会执行，权限属于当前文档的源。","表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。"],"answer":"b","explain":"satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","whyWrong":{"a":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","c":"这一句是「同源策略拦的是读，不是“外域脚本不能执行”」的结论，答的不是这一问。","d":"这一句是「表单可以跨源提交，CORS 拦的是脚本读响应」的结论，答的不是这一问。"}},
  {"id":"rs1-2","pointId":"cv-react-flow-not-default","stem":"2019 路线图把 Flow 和 TypeScript 画成并列必学。为什么今天不能再这么背？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。","模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。"],"answer":"b","explain":"新 React 代码默认 TypeScript。Flow 不是现行并列必学。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。","d":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。"}},
  {"id":"rs1-3","pointId":"cv-ts-structural","stem":"两个类型名称不同，但字段相同，为何仍可赋值？","texts":["表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","loader 解决路由取数。服务端组件决定哪一块不进客户端包；有按钮和本地状态的块才标成客户端组件。","Query 管缓存和重试，不代替发请求。queryFn 里仍要调用 fetch 或 Axios。"],"answer":"b","explain":"TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","whyWrong":{"a":"这一句是「表单可以跨源提交，CORS 拦的是脚本读响应」的结论，答的不是这一问。","c":"这一句是「服务端组件负责这次要渲染的数据，客户端组件负责这次要交互的状态」的结论，答的不是这一问。","d":"这一句是「TanStack Query 缓存服务器结果，自己不发 HTTP」的结论，答的不是这一问。"}},
  {"id":"rs1-4","pointId":"cv-ts-utility-types","stem":"为什么把更新接口写成 Partial<User> 之后，id 也会变成可选？","texts":["新 React 代码默认 TypeScript。Flow 不是现行并列必学。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。","外域 script src 会执行，权限属于当前文档的源。","表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。"],"answer":"b","explain":"Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。","whyWrong":{"a":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","c":"这一句是「同源策略拦的是读，不是“外域脚本不能执行”」的结论，答的不是这一问。","d":"这一句是「表单可以跨源提交，CORS 拦的是脚本读响应」的结论，答的不是这一问。"}},
  {"id":"rs1-5","pointId":"cv-ts-template-literal-types","stem":"事件名必须是 on 加字段名，为什么还要用 string 然后运行时再检查？","texts":["新 React 代码默认 TypeScript。Flow 不是现行并列必学。","模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。","外域 script src 会执行，权限属于当前文档的源。","loader 解决路由取数。服务端组件决定哪一块不进客户端包；有按钮和本地状态的块才标成客户端组件。"],"answer":"b","explain":"模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。","whyWrong":{"a":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","c":"这一句是「同源策略拦的是读，不是“外域脚本不能执行”」的结论，答的不是这一问。","d":"这一句是「服务端组件负责这次要渲染的数据，客户端组件负责这次要交互的状态」的结论，答的不是这一问。"}},
  {"id":"rs1-6","pointId":"cv-same-origin-script-still-runs","stem":"为什么把同源策略说成“只有百度自己的脚本才会被执行、浏览器拒收外域响应”会错？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","外域 script src 会执行，权限属于当前文档的源。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。","模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。"],"answer":"b","explain":"外域 script src 会执行，权限属于当前文档的源。CORS 拦的是脚本读取跨源响应，不是拦 TCP 发包。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。","d":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。"}},
  {"id":"rs1-7","pointId":"cv-html-form-cross-origin-navigate","stem":"为什么一道题问“表单可以跨域吗”，用 CORS 的对错去答会偏？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"],"answer":"b","explain":"表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","d":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。"}},
  {"id":"rs1-8","pointId":"cv-react-rsc-vs-client","stem":"已经有 React Router 的 loader，为什么还要理解服务端组件？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","loader 解决路由取数。服务端组件决定哪一块不进客户端包；有按钮和本地状态的块才标成客户端组件。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"loader 解决路由取数。服务端组件决定哪一块不进客户端包；有按钮和本地状态的块才标成客户端组件。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs1-9","pointId":"cv-query-cache-not-http-client","stem":"为什么装了 TanStack Query，组件里仍要写 fetch 或 Axios？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","Query 管缓存和重试，不代替发请求。queryFn 里仍要调用 fetch 或 Axios。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"],"answer":"b","explain":"Query 管缓存和重试，不代替发请求。queryFn 里仍要调用 fetch 或 Axios。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","d":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。"}},
  {"id":"rs1-10","pointId":"cv-query-fn-calls-the-client","stem":"为什么 404 的页面仍显示成功，而且网络面板里同一条查询打了四次？","texts":["Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。","不检查 ok 时，404 也会进 data。默认还会重试多次；失败要 throw，并按需要关掉 retry。","模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。","外域 script src 会执行，权限属于当前文档的源。"],"answer":"b","explain":"不检查 ok 时，404 也会进 data。默认还会重试多次；失败要 throw，并按需要关掉 retry。","whyWrong":{"a":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。","c":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。","d":"这一句是「同源策略拦的是读，不是“外域脚本不能执行”」的结论，答的不是这一问。"}},
  {"id":"rs2-1","pointId":"cv-query-server-state","stem":"请求结果已经在 Query 缓存里，为什么还要 setUsers 存一份？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","Query 里已有列表就不要再 setUsers 抄一份。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"],"answer":"b","explain":"Query 里已有列表就不要再 setUsers 抄一份。两份缓存失效时只清一个，界面会读到旧数组。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","d":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。"}},
  {"id":"rs2-2","pointId":"cv-redux-rtk-today","stem":"为什么把 createStore + 手写 switch reducer + 自行 applyMiddleware(thunk) 当作现行标准答案不够？","texts":["模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。","今天写 Redux 用 Toolkit：configureStore 和 createSlice。","表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。","loader 解决路由取数。服务端组件决定哪一块不进客户端包；有按钮和本地状态的块才标成客户端组件。"],"answer":"b","explain":"今天写 Redux 用 Toolkit：configureStore 和 createSlice。手写 createStore、switch 和自行拼 thunk 不是现行默认。","whyWrong":{"a":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。","c":"这一句是「表单可以跨源提交，CORS 拦的是脚本读响应」的结论，答的不是这一问。","d":"这一句是「服务端组件负责这次要渲染的数据，客户端组件负责这次要交互的状态」的结论，答的不是这一问。"}},
  {"id":"rs2-3","pointId":"cv-vue-router-reuse","stem":"从 /orders/1 进到 /orders/2，为什么 setup 没有再次执行？","texts":["新 React 代码默认 TypeScript。Flow 不是现行并列必学。","同一组件实例会被复用，setup 不重跑。参数变了要 watch params，或靠守卫之外的数据重载。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。"],"answer":"b","explain":"同一组件实例会被复用，setup 不重跑。参数变了要 watch params，或靠守卫之外的数据重载。","whyWrong":{"a":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。"}},
  {"id":"rs2-4","pointId":"cv-vue-router-guard","stem":"登录校验写在页面 onMounted 里跳转，为什么会先闪一下再回来？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","守卫在确认导航前拦截，页面不会先出现。写在 onMounted 里再跳转，会先闪一下内容。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"],"answer":"b","explain":"守卫在确认导航前拦截，页面不会先出现。写在 onMounted 里再跳转，会先闪一下内容。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","d":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。"}},
  {"id":"rs2-5","pointId":"cv-vue-router-scroll","stem":"从详情返回列表，为什么有时停在半页、有时冲到顶？","texts":["Query 里已有列表就不要再 setUsers 抄一份。","滚动位置由 scrollBehavior 决定。后退用 savedPosition，新开模块滚到顶，不能指望浏览器默认每次一样。","同一组件实例会被复用，setup 不重跑。参数变了要 watch params，或靠守卫之外的数据重载。","走线程池的例如某些文件操作和加密。会堵住循环本身的是同步死循环和长时间的纯计算。"],"answer":"b","explain":"滚动位置由 scrollBehavior 决定。后退用 savedPosition，新开模块滚到顶，不能指望浏览器默认每次一样。","whyWrong":{"a":"这一句是「服务器状态不要再抄进 useState」的结论，答的不是这一问。","c":"这一句是「只改路由参数时，组件可能不会重建」的结论，答的不是这一问。","d":"这一句是「看起来异步的 fs 和 crypto，背后常占用线程池」的结论，答的不是这一问。"}},
  {"id":"rs2-6","pointId":"cv-pinia-store-to-refs","stem":"const { cart } = useCartStore() 之后改购物车，为什么界面不更新？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","直接解构会断开响应式。要用 storeToRefs 取状态；方法可以普通解构。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"直接解构会断开响应式。要用 storeToRefs 取状态；方法可以普通解构。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs2-7","pointId":"cv-vue-keep-alive","stem":"列表滚到一半进详情，回来为什么有时从头开始，有时还在原地？","texts":["TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","缓存时实例不销毁，回来走 activated，滚动能留下。","模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。","外域 script src 会执行，权限属于当前文档的源。"],"answer":"b","explain":"缓存时实例不销毁，回来走 activated，滚动能留下。未缓存则重新创建，列表从头开始。","whyWrong":{"a":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","c":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。","d":"这一句是「同源策略拦的是读，不是“外域脚本不能执行”」的结论，答的不是这一问。"}},
  {"id":"rs2-8","pointId":"cv-node-event-loop-phases","stem":"setTimeout(0) 和 setImmediate 谁先跑，为什么有时答案会换？","texts":["TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","setTimeout(0) 与 setImmediate 的先后取决于调用所处阶段，不是固定谁先。","外域 script src 会执行，权限属于当前文档的源。","loader 解决路由取数。服务端组件决定哪一块不进客户端包；有按钮和本地状态的块才标成客户端组件。"],"answer":"b","explain":"setTimeout(0) 与 setImmediate 的先后取决于调用所处阶段，不是固定谁先。","whyWrong":{"a":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","c":"这一句是「同源策略拦的是读，不是“外域脚本不能执行”」的结论，答的不是这一问。","d":"这一句是「服务端组件负责这次要渲染的数据，客户端组件负责这次要交互的状态」的结论，答的不是这一问。"}},
  {"id":"rs2-9","pointId":"cv-node-libuv-threadpool","stem":"大量加密和读文件同时进行，为什么事件循环自己没堵，延迟却上去了？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","走线程池的例如某些文件操作和加密。会堵住循环本身的是同步死循环和长时间的纯计算。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"],"answer":"b","explain":"走线程池的例如某些文件操作和加密。会堵住循环本身的是同步死循环和长时间的纯计算。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","d":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。"}},
  {"id":"rs2-10","pointId":"cv-node-buffer","stem":"Buffer.allocUnsafe(10) 的十个字节为什么不能直接发给客户端？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","Buffer.alloc(8) 会把 8 个字节填成 0，读出来是确定的。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。"],"answer":"b","explain":"Buffer.alloc(8) 会把 8 个字节填成 0，读出来是确定的。Buffer.allocUnsafe(8) 只分配，不保证清掉原来的内存，未写满就发给别人可能带出残留字节，所以对外使用前要写满，或再 fill。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。"}},
  {"id":"rs3-1","pointId":"cv-java-not-every-class-clone-serializable","stem":"为什么把“经典形式”背成每个类都要实现 equals、hashCode、toString、Cloneable、Serializable？","texts":["模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。","equals/hashCode/toString 按需覆盖。","表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。","Query 里已有列表就不要再 setUsers 抄一份。"],"answer":"b","explain":"equals/hashCode/toString 按需覆盖。Cloneable、Serializable 是承诺，不是每个类的五件套。","whyWrong":{"a":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。","c":"这一句是「表单可以跨源提交，CORS 拦的是脚本读响应」的结论，答的不是这一问。","d":"这一句是「服务器状态不要再抄进 useState」的结论，答的不是这一问。"}},
  {"id":"rs3-2","pointId":"cv-java-raw-type-skips-checks","stem":"为什么把 `List` 和无界 `List<?>` 当成一回事，往 `List<String>` 里 add 整数？","texts":["Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。","裸类型 List 跳过泛型检查。List<?> 元素未知，基本不能 add；要装任意对象用 List<Object>。","外域 script src 会执行，权限属于当前文档的源。","表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。"],"answer":"b","explain":"裸类型 List 跳过泛型检查。List<?> 元素未知，基本不能 add；要装任意对象用 List<Object>。","whyWrong":{"a":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。","c":"这一句是「同源策略拦的是读，不是“外域脚本不能执行”」的结论，答的不是这一问。","d":"这一句是「表单可以跨源提交，CORS 拦的是脚本读响应」的结论，答的不是这一问。"}},
  {"id":"rs3-3","pointId":"cv-java-class-newinstance-deprecated","stem":"为什么反射创建对象还写 `clazz.newInstance()`，并当成“随便实例化、不必知道类名”？","texts":["TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Class.newInstance 已弃用且只走无参。用 Constructor.newInstance；forName 仍需要类名。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。","模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。"],"answer":"b","explain":"Class.newInstance 已弃用且只走无参。用 Constructor.newInstance；forName 仍需要类名。","whyWrong":{"a":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","c":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。","d":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。"}},
  {"id":"rs3-4","pointId":"cv-java-final-not-fifty-percent","stem":"为什么优化清单写“类声明成 final，编译器内联所有方法，性能平均提高 50%”？","texts":["新 React 代码默认 TypeScript。Flow 不是现行并列必学。","final 禁止继承，没有“平均快 50%”的规范。内联是 JIT 的事，不要靠赋 null 催 GC。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","外域 script src 会执行，权限属于当前文档的源。"],"answer":"b","explain":"final 禁止继承，没有“平均快 50%”的规范。内联是 JIT 的事，不要靠赋 null 催 GC。","whyWrong":{"a":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「同源策略拦的是读，不是“外域脚本不能执行”」的结论，答的不是这一问。"}},
  {"id":"rs3-5","pointId":"cv-java-shift-not-times-eight","stem":"为什么面试把 `2<<3` 当成“最有效率的 2×8”，生产代码也跟着用移位代替乘除？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","乘除就写乘除，JIT 会折减常数。移位留给位图和对齐掩码，不是生产里替代算术的默认写法。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"乘除就写乘除，JIT 会折减常数。移位留给位图和对齐掩码，不是生产里替代算术的默认写法。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs3-6","pointId":"cv-java-switch-arrow-no-fall","stem":"为什么笔试题还在问没写 break 会打印哪几行，有人就把所有 switch 都背成必须 break？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","冒号分支没有 break 会贯穿；箭头分支只跑匹配那一支。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"冒号分支没有 break 会贯穿；箭头分支只跑匹配那一支。新代码优先箭头，不是所有 switch 都必须 break。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs3-7","pointId":"cv-java-unmodifiable-is-view","stem":"为什么 Collections.unmodifiableList 之后，还往原列表里加元素，只读的那一份也变了？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","不可修改是视图，不是快照。改原列表，视图也会变；要隔离就先拷贝再包视图。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"不可修改是视图，不是快照。改原列表，视图也会变；要隔离就先拷贝再包视图。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs3-8","pointId":"cv-java-runnable-is-command","stem":"为什么把发货步骤直接写进线程池的实现，每换一种任务就改池子？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","任务用 Runnable/Callable 提交，池子不写业务步骤。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"],"answer":"b","explain":"任务用 Runnable/Callable 提交，池子不写业务步骤。换任务不应改线程池类。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","d":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。"}},
  {"id":"rs3-9","pointId":"cv-spring-factorybean-product","stem":"为什么实现了 FactoryBean，注入时期望拿到的却是工厂自己？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","注入默认拿到 getObject 的产品；要工厂本身才加 &。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"注入默认拿到 getObject 的产品；要工厂本身才加 &。别把工厂类型写进业务构造器。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs3-10","pointId":"cv-spring-event-sync-default","stem":"为什么把 ApplicationEvent 当成下单方法返回之后，监听器会在别的线程里慢慢处理？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","默认监听器同步跑在发布调用里。不是下单返回后自动换线程慢慢处理。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"默认监听器同步跑在发布调用里。不是下单返回后自动换线程慢慢处理。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs4-1","pointId":"cv-spring-jdbctemplate-callback","stem":"为什么用了 JdbcTemplate，服务方法上还在声明 throws SQLException？","texts":["模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。","JdbcTemplate 把 SQLException 译成 DataAccessException。","表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。","loader 解决路由取数。服务端组件决定哪一块不进客户端包；有按钮和本地状态的块才标成客户端组件。"],"answer":"b","explain":"JdbcTemplate 把 SQLException 译成 DataAccessException。服务方法不必再声明 throws SQLException。","whyWrong":{"a":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。","c":"这一句是「表单可以跨源提交，CORS 拦的是脚本读响应」的结论，答的不是这一问。","d":"这一句是「服务端组件负责这次要渲染的数据，客户端组件负责这次要交互的状态」的结论，答的不是这一问。"}},
  {"id":"rs4-2","pointId":"cv-spring-getbean-hides-deps","stem":"为什么字段上已经能注入，业务方法里还是 ApplicationContext.getBean？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","依赖写在构造器上，缺了启动就失败。业务方法里 getBean 会把失败推迟并绑死字符串名。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"依赖写在构造器上，缺了启动就失败。业务方法里 getBean 会把失败推迟并绑死字符串名。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs4-3","pointId":"cv-es-filter-context","stem":"分类、价格区间和关键词，为什么不要全写成同一种查询？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","关键词打分，分类价格做过滤。过滤不参与相关性分数，还可被缓存。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"],"answer":"b","explain":"关键词打分，分类价格做过滤。过滤不参与相关性分数，还可被缓存。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","d":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。"}},
  {"id":"rs4-4","pointId":"cv-es-refresh-visibility","stem":"索引请求返回 201，下一次搜索为什么还查不到这篇文档？","texts":["新 React 代码默认 TypeScript。Flow 不是现行并列必学。","索引 201 只表示接受。搜索可见要等 refresh 打开新段，不等于已落盘。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"索引 201 只表示接受。搜索可见要等 refresh 打开新段，不等于已落盘。","whyWrong":{"a":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs4-5","pointId":"cv-es-term-lookup-not-o1","stem":"为什么把倒排索引背成“词典查找一定是 O(1)，所以检索文章也是常数时间”？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","词典查找不是整库一次哈希的 O(1)。倒排表与打分随命中变贵。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","Partial 会让所有键可选。更新补丁应 Omit id，运行时仍要自己挑字段。"],"answer":"b","explain":"词典查找不是整库一次哈希的 O(1)。倒排表与打分随命中变贵。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「Partial、Pick、Omit 是改形状，不是改运行时对象」的结论，答的不是这一问。"}},
  {"id":"rs4-6","pointId":"cv-es-search-after","stem":"翻到第 1000 页为什么比第 1 页慢很多，还可能报错？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","深分页用 search_after，不要巨大 from。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","走线程池的例如某些文件操作和加密。会堵住循环本身的是同步死循环和长时间的纯计算。"],"answer":"b","explain":"深分页用 search_after，不要巨大 from。from 会扫前面命中并可能触窗上限。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","d":"这一句是「看起来异步的 fs 和 crypto，背后常占用线程池」的结论，答的不是这一问。"}},
  {"id":"rs4-7","pointId":"cv-es-mapping-reindex","stem":"把价格从 text 改成 integer，为什么已经在的文档还是按词搜？","texts":["新 React 代码默认 TypeScript。Flow 不是现行并列必学。","已有字段改类型要建新索引、reindex、切别名。只改模板不改历史文档。","表单跨源提交是导航，不靠 CORS。fetch 读跨源正文才要 CORS 允许头。","Query 管缓存和重试，不代替发请求。queryFn 里仍要调用 fetch 或 Axios。"],"answer":"b","explain":"已有字段改类型要建新索引、reindex、切别名。只改模板不改历史文档。","whyWrong":{"a":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","c":"这一句是「表单可以跨源提交，CORS 拦的是脚本读响应」的结论，答的不是这一问。","d":"这一句是「TanStack Query 缓存服务器结果，自己不发 HTTP」的结论，答的不是这一问。"}},
  {"id":"rs4-8","pointId":"cv-es-aggregations","stem":"要看每个状态有多少订单，为什么把一万行搜出来在应用里 groupBy？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","分组计数放引擎里做 terms 聚合，不要搜一万行回应用里 groupBy。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"],"answer":"b","explain":"分组计数放引擎里做 terms 聚合，不要搜一万行回应用里 groupBy。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","d":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。"}},
  {"id":"rs4-9","pointId":"cv-es-custom-routing","stem":"按用户 id 路由写入，按默认路由去搜，为什么有时搜不到刚写的文档？","texts":["TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。","写入用的 routing 读取也要用。默认路由去 GET 可能落到别的分片找不到。","模板字面量类型在编译期约束字符串组合，不在运行时生成或校验路径。","外域 script src 会执行，权限属于当前文档的源。"],"answer":"b","explain":"写入用的 routing 读取也要用。默认路由去 GET 可能落到别的分片找不到。","whyWrong":{"a":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。","c":"这一句是「模板字面量类型能拼出合法字符串，拼不出的键会在编译期失败（TS 4.1）」的结论，答的不是这一问。","d":"这一句是「同源策略拦的是读，不是“外域脚本不能执行”」的结论，答的不是这一问。"}},
  {"id":"rs4-10","pointId":"cv-netty-codec-shareable","stem":"把一个解码器做成单例给所有连接用，为什么会解出别人的半包？","texts":["satisfies 核对类型又保留字面量键。as 会放宽，拼错键可能不再报错。","带半包缓冲的解码器不能做成所有连接共享的单例，否则会串包。","新 React 代码默认 TypeScript。Flow 不是现行并列必学。","TypeScript 是结构类型。字段够用就能赋；对象字面量另有多余属性检查。"],"answer":"b","explain":"带半包缓冲的解码器不能做成所有连接共享的单例，否则会串包。","whyWrong":{"a":"这一句是「satisfies 核对形状，但不把字面量放宽成宽类型（TS 4.9）」的结论，答的不是这一问。","c":"这一句是「React 文档用 TypeScript，不再把 Flow 当默认」的结论，答的不是这一问。","d":"这一句是「结构类型与多余属性检查」的结论，答的不是这一问。"}},
]

export const COVER_GATES = [
  {
    "id": "k1",
    "courseId": "lang",
    "level": 1,
    "title": "语言基础 1",
    "lead": "先分清这门语言在哪跑、值怎么存、名字能不能再赋值，再谈类型标注。",
    "questionIds": [
      "k1-1",
      "k1-2",
      "k1-3",
      "k1-4",
      "k1-5",
      "k1-6",
      "k1-7",
      "k1-8",
      "k1-9",
      "k1-10"
    ]
  },
  {
    "id": "k2",
    "courseId": "lang",
    "level": 2,
    "title": "语言基础 2",
    "lead": "先分清这门语言在哪跑、值怎么存、名字能不能再赋值，再谈类型标注。",
    "questionIds": [
      "k2-1",
      "k2-2",
      "k2-3",
      "k2-4",
      "k2-5",
      "k2-6",
      "k2-7",
      "k2-8",
      "k2-9",
      "k2-10"
    ]
  },
  {
    "id": "k3",
    "courseId": "lang",
    "level": 3,
    "title": "语言基础 3",
    "lead": "先分清这门语言在哪跑、值怎么存、名字能不能再赋值，再谈类型标注。",
    "questionIds": [
      "k3-1",
      "k3-2",
      "k3-3",
      "k3-4",
      "k3-5",
      "k3-6",
      "k3-7",
      "k3-8",
      "k3-9",
      "k3-10"
    ]
  },
  {
    "id": "k4",
    "courseId": "lang",
    "level": 4,
    "title": "语言基础 4",
    "lead": "先分清这门语言在哪跑、值怎么存、名字能不能再赋值，再谈类型标注。",
    "questionIds": [
      "k4-1",
      "k4-2",
      "k4-3",
      "k4-4",
      "k4-5",
      "k4-6",
      "k4-7",
      "k4-8",
      "k4-9",
      "k4-10"
    ]
  },
  {
    "id": "k5",
    "courseId": "lang",
    "level": 5,
    "title": "语言基础 5",
    "lead": "先分清这门语言在哪跑、值怎么存、名字能不能再赋值，再谈类型标注。",
    "questionIds": [
      "k5-1",
      "k5-2",
      "k5-3",
      "k5-4",
      "k5-5",
      "k5-6",
      "k5-7",
      "k5-8",
      "k5-9",
      "k5-10"
    ]
  },
  {
    "id": "br1",
    "courseId": "browser",
    "level": 1,
    "title": "CSS 与布局 1",
    "lead": "先分清文档、事件和样式各做哪一步，再谈弹层、表单和滚动。",
    "questionIds": [
      "br1-1",
      "br1-2",
      "br1-3",
      "br1-4",
      "br1-5",
      "br1-6",
      "br1-7",
      "br1-8",
      "br1-9",
      "br1-10"
    ]
  },
  {
    "id": "br2",
    "courseId": "browser",
    "level": 2,
    "title": "CSS 与布局 2",
    "lead": "先分清文档、事件和样式各做哪一步，再谈弹层、表单和滚动。",
    "questionIds": [
      "br2-1",
      "br2-2",
      "br2-3",
      "br2-4",
      "br2-5",
      "br2-6",
      "br2-7",
      "br2-8",
      "br2-9",
      "br2-10"
    ]
  },
  {
    "id": "br3",
    "courseId": "browser",
    "level": 3,
    "title": "浏览器 3",
    "lead": "先分清文档、事件和样式各做哪一步，再谈弹层、表单和滚动。",
    "questionIds": [
      "br3-1",
      "br3-2",
      "br3-3",
      "br3-4",
      "br3-5",
      "br3-6",
      "br3-7",
      "br3-8",
      "br3-9",
      "br3-10"
    ]
  },
  {
    "id": "br4",
    "courseId": "browser",
    "level": 4,
    "title": "浏览器 4",
    "lead": "先分清文档、事件和样式各做哪一步，再谈弹层、表单和滚动。",
    "questionIds": [
      "br4-1",
      "br4-2",
      "br4-3",
      "br4-4",
      "br4-5",
      "br4-6",
      "br4-7",
      "br4-8",
      "br4-9",
      "br4-10"
    ]
  },
  {
    "id": "re1",
    "courseId": "react",
    "level": 1,
    "title": "React 1",
    "lead": "组件、参数和状态各管一件事。Hook 按调用顺序挂上，更新不会当场改掉这一次的值。",
    "questionIds": [
      "re1-1",
      "re1-2",
      "re1-3",
      "re1-4",
      "re1-5",
      "re1-6",
      "re1-7",
      "re1-8",
      "re1-9",
      "re1-10"
    ]
  },
  {
    "id": "re2",
    "courseId": "react",
    "level": 2,
    "title": "React 2",
    "lead": "组件、参数和状态各管一件事。Hook 按调用顺序挂上，更新不会当场改掉这一次的值。",
    "questionIds": [
      "re2-1",
      "re2-2",
      "re2-3",
      "re2-4",
      "re2-5",
      "re2-6",
      "re2-7",
      "re2-8",
      "re2-9",
      "re2-10"
    ]
  },
  {
    "id": "re3",
    "courseId": "react",
    "level": 3,
    "title": "React 3",
    "lead": "组件、参数和状态各管一件事。Hook 按调用顺序挂上，更新不会当场改掉这一次的值。",
    "questionIds": [
      "re3-1",
      "re3-2",
      "re3-3",
      "re3-4",
      "re3-5",
      "re3-6",
      "re3-7",
      "re3-8",
      "re3-9",
      "re3-10"
    ]
  },
  {
    "id": "vu1",
    "courseId": "vue",
    "level": 1,
    "title": "Vue 1",
    "lead": "模板描述要输出的 HTML。脚本里改的是 ref 的 value，页面绑的是代理上的属性。",
    "questionIds": [
      "vu1-1",
      "vu1-2",
      "vu1-3",
      "vu1-4",
      "vu1-5",
      "vu1-6",
      "vu1-7",
      "vu1-8",
      "vu1-9",
      "vu1-10"
    ]
  },
  {
    "id": "vu2",
    "courseId": "vue",
    "level": 2,
    "title": "Vue 2",
    "lead": "模板描述要输出的 HTML。脚本里改的是 ref 的 value，页面绑的是代理上的属性。",
    "questionIds": [
      "vu2-1",
      "vu2-2",
      "vu2-3",
      "vu2-4",
      "vu2-5",
      "vu2-6",
      "vu2-7",
      "vu2-8",
      "vu2-9",
      "vu2-10"
    ]
  },
  {
    "id": "cx1",
    "courseId": "client",
    "level": 1,
    "title": "技术选型 1",
    "lead": "先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。",
    "questionIds": [
      "cx1-1",
      "cx1-2",
      "cx1-3",
      "cx1-4",
      "cx1-5",
      "cx1-6",
      "cx1-7",
      "cx1-8",
      "cx1-9",
      "cx1-10"
    ]
  },
  {
    "id": "cx2",
    "courseId": "client",
    "level": 2,
    "title": "技术选型 2",
    "lead": "先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。",
    "questionIds": [
      "cx2-1",
      "cx2-2",
      "cx2-3",
      "cx2-4",
      "cx2-5",
      "cx2-6",
      "cx2-7",
      "cx2-8",
      "cx2-9",
      "cx2-10"
    ]
  },
  {
    "id": "cx3",
    "courseId": "client",
    "level": 3,
    "title": "微前端 3",
    "lead": "先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。",
    "questionIds": [
      "cx3-1",
      "cx3-2",
      "cx3-3",
      "cx3-4",
      "cx3-5",
      "cx3-6",
      "cx3-7",
      "cx3-8",
      "cx3-9",
      "cx3-10"
    ]
  },
  {
    "id": "cx4",
    "courseId": "client",
    "level": 4,
    "title": "微前端 4",
    "lead": "先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。",
    "questionIds": [
      "cx4-1",
      "cx4-2",
      "cx4-3",
      "cx4-4",
      "cx4-5",
      "cx4-6",
      "cx4-7",
      "cx4-8",
      "cx4-9",
      "cx4-10"
    ]
  },
  {
    "id": "cx5",
    "courseId": "client",
    "level": 5,
    "title": "React Native 5",
    "lead": "先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。",
    "questionIds": [
      "cx5-1",
      "cx5-2",
      "cx5-3",
      "cx5-4",
      "cx5-5",
      "cx5-6",
      "cx5-7",
      "cx5-8",
      "cx5-9",
      "cx5-10"
    ]
  },
  {
    "id": "cx6",
    "courseId": "client",
    "level": 6,
    "title": "React Native 6",
    "lead": "先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。",
    "questionIds": [
      "cx6-1",
      "cx6-2",
      "cx6-3",
      "cx6-4",
      "cx6-5",
      "cx6-6",
      "cx6-7",
      "cx6-8",
      "cx6-9",
      "cx6-10"
    ]
  },
  {
    "id": "cx7",
    "courseId": "client",
    "level": 7,
    "title": "Flutter 7",
    "lead": "先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。",
    "questionIds": [
      "cx7-1",
      "cx7-2",
      "cx7-3",
      "cx7-4",
      "cx7-5",
      "cx7-6",
      "cx7-7",
      "cx7-8",
      "cx7-9",
      "cx7-10"
    ]
  },
  {
    "id": "cx8",
    "courseId": "client",
    "level": 8,
    "title": "UniApp 与 Taro 8",
    "lead": "先写清这一次要在浏览器、原生还是服务端跑，再选路由、状态和打包。",
    "questionIds": [
      "cx8-1",
      "cx8-2",
      "cx8-3",
      "cx8-4",
      "cx8-5",
      "cx8-6",
      "cx8-7",
      "cx8-8",
      "cx8-9",
      "cx8-10"
    ]
  },
  {
    "id": "jb1",
    "courseId": "java",
    "level": 1,
    "title": "Java 基础 1",
    "lead": "字节码在虚拟机里跑。基本类型存的是值，局部变量必须先赋值。",
    "questionIds": [
      "jb1-1",
      "jb1-2",
      "jb1-3",
      "jb1-4",
      "jb1-5",
      "jb1-6",
      "jb1-7",
      "jb1-8",
      "jb1-9",
      "jb1-10"
    ]
  },
  {
    "id": "jb2",
    "courseId": "java",
    "level": 2,
    "title": "Java 基础 2",
    "lead": "字节码在虚拟机里跑。基本类型存的是值，局部变量必须先赋值。",
    "questionIds": [
      "jb2-1",
      "jb2-2",
      "jb2-3",
      "jb2-4",
      "jb2-5",
      "jb2-6",
      "jb2-7",
      "jb2-8",
      "jb2-9",
      "jb2-10"
    ]
  },
  {
    "id": "jb3",
    "courseId": "java",
    "level": 3,
    "title": "Java 基础 3",
    "lead": "字节码在虚拟机里跑。基本类型存的是值，局部变量必须先赋值。",
    "questionIds": [
      "jb3-1",
      "jb3-2",
      "jb3-3",
      "jb3-4",
      "jb3-5",
      "jb3-6",
      "jb3-7",
      "jb3-8",
      "jb3-9",
      "jb3-10"
    ]
  },
  {
    "id": "jb4",
    "courseId": "java",
    "level": 4,
    "title": "Java 基础 4",
    "lead": "字节码在虚拟机里跑。基本类型存的是值，局部变量必须先赋值。",
    "questionIds": [
      "jb4-1",
      "jb4-2",
      "jb4-3",
      "jb4-4",
      "jb4-5",
      "jb4-6",
      "jb4-7",
      "jb4-8",
      "jb4-9",
      "jb4-10"
    ]
  },
  {
    "id": "jb5",
    "courseId": "java",
    "level": 5,
    "title": "Java 基础 5",
    "lead": "字节码在虚拟机里跑。基本类型存的是值，局部变量必须先赋值。",
    "questionIds": [
      "jb5-1",
      "jb5-2",
      "jb5-3",
      "jb5-4",
      "jb5-5",
      "jb5-6",
      "jb5-7",
      "jb5-8",
      "jb5-9",
      "jb5-10"
    ]
  },
  {
    "id": "jb6",
    "courseId": "java",
    "level": 6,
    "title": "Java 基础 6",
    "lead": "字节码在虚拟机里跑。基本类型存的是值，局部变量必须先赋值。",
    "questionIds": [
      "jb6-1",
      "jb6-2",
      "jb6-3",
      "jb6-4",
      "jb6-5",
      "jb6-6",
      "jb6-7",
      "jb6-8",
      "jb6-9",
      "jb6-10"
    ]
  },
  {
    "id": "pt1",
    "courseId": "pattern",
    "level": 1,
    "title": "算法 1",
    "lead": "先指出变化落在创建、结构还是行为，再谈某一种模式或某一种查找。",
    "questionIds": [
      "pt1-1",
      "pt1-2",
      "pt1-3",
      "pt1-4",
      "pt1-5",
      "pt1-6",
      "pt1-7",
      "pt1-8",
      "pt1-9",
      "pt1-10"
    ]
  },
  {
    "id": "pt2",
    "courseId": "pattern",
    "level": 2,
    "title": "设计模式 2",
    "lead": "先指出变化落在创建、结构还是行为，再谈某一种模式或某一种查找。",
    "questionIds": [
      "pt2-1",
      "pt2-2",
      "pt2-3",
      "pt2-4",
      "pt2-5",
      "pt2-6",
      "pt2-7",
      "pt2-8",
      "pt2-9",
      "pt2-10"
    ]
  },
  {
    "id": "pt3",
    "courseId": "pattern",
    "level": 3,
    "title": "设计模式 3",
    "lead": "先指出变化落在创建、结构还是行为，再谈某一种模式或某一种查找。",
    "questionIds": [
      "pt3-1",
      "pt3-2",
      "pt3-3",
      "pt3-4",
      "pt3-5",
      "pt3-6",
      "pt3-7",
      "pt3-8",
      "pt3-9",
      "pt3-10"
    ]
  },
  {
    "id": "sg1",
    "courseId": "spring",
    "level": 1,
    "title": "Spring 1",
    "lead": "容器负责把对象接上。超卖、映射和检索仍要按这一次的写入和查询核对。",
    "questionIds": [
      "sg1-1",
      "sg1-2",
      "sg1-3",
      "sg1-4",
      "sg1-5",
      "sg1-6",
      "sg1-7",
      "sg1-8",
      "sg1-9",
      "sg1-10"
    ]
  },
  {
    "id": "sg2",
    "courseId": "spring",
    "level": 2,
    "title": "Spring 2",
    "lead": "容器负责把对象接上。超卖、映射和检索仍要按这一次的写入和查询核对。",
    "questionIds": [
      "sg2-1",
      "sg2-2",
      "sg2-3",
      "sg2-4",
      "sg2-5",
      "sg2-6",
      "sg2-7",
      "sg2-8",
      "sg2-9",
      "sg2-10"
    ]
  },
  {
    "id": "sg3",
    "courseId": "spring",
    "level": 3,
    "title": "MyBatis 3",
    "lead": "容器负责把对象接上。超卖、映射和检索仍要按这一次的写入和查询核对。",
    "questionIds": [
      "sg3-1",
      "sg3-2",
      "sg3-3",
      "sg3-4",
      "sg3-5",
      "sg3-6",
      "sg3-7",
      "sg3-8",
      "sg3-9",
      "sg3-10"
    ]
  },
  {
    "id": "sg4",
    "courseId": "spring",
    "level": 4,
    "title": "MyBatis 4",
    "lead": "容器负责把对象接上。超卖、映射和检索仍要按这一次的写入和查询核对。",
    "questionIds": [
      "sg4-1",
      "sg4-2",
      "sg4-3",
      "sg4-4",
      "sg4-5",
      "sg4-6",
      "sg4-7",
      "sg4-8",
      "sg4-9",
      "sg4-10"
    ]
  },
  {
    "id": "nx1",
    "courseId": "secure",
    "level": 1,
    "title": "安全 1",
    "lead": "先分清谁校验、谁持有连接、字节在哪一层被读走。",
    "questionIds": [
      "nx1-1",
      "nx1-2",
      "nx1-3",
      "nx1-4",
      "nx1-5",
      "nx1-6",
      "nx1-7",
      "nx1-8",
      "nx1-9",
      "nx1-10"
    ]
  },
  {
    "id": "nx2",
    "courseId": "secure",
    "level": 2,
    "title": "安全 2",
    "lead": "先分清谁校验、谁持有连接、字节在哪一层被读走。",
    "questionIds": [
      "nx2-1",
      "nx2-2",
      "nx2-3",
      "nx2-4",
      "nx2-5",
      "nx2-6",
      "nx2-7",
      "nx2-8",
      "nx2-9",
      "nx2-10"
    ]
  },
  {
    "id": "nx3",
    "courseId": "secure",
    "level": 3,
    "title": "安全 3",
    "lead": "先分清谁校验、谁持有连接、字节在哪一层被读走。",
    "questionIds": [
      "nx3-1",
      "nx3-2",
      "nx3-3",
      "nx3-4",
      "nx3-5",
      "nx3-6",
      "nx3-7",
      "nx3-8",
      "nx3-9",
      "nx3-10"
    ]
  },
  {
    "id": "nx4",
    "courseId": "secure",
    "level": 4,
    "title": "安全 4",
    "lead": "先分清谁校验、谁持有连接、字节在哪一层被读走。",
    "questionIds": [
      "nx4-1",
      "nx4-2",
      "nx4-3",
      "nx4-4",
      "nx4-5",
      "nx4-6",
      "nx4-7",
      "nx4-8",
      "nx4-9",
      "nx4-10"
    ]
  },
  {
    "id": "nx5",
    "courseId": "secure",
    "level": 5,
    "title": "安全 5",
    "lead": "先分清谁校验、谁持有连接、字节在哪一层被读走。",
    "questionIds": [
      "nx5-1",
      "nx5-2",
      "nx5-3",
      "nx5-4",
      "nx5-5",
      "nx5-6",
      "nx5-7",
      "nx5-8",
      "nx5-9",
      "nx5-10"
    ]
  },
  {
    "id": "rs1",
    "courseId": "rest",
    "level": 1,
    "title": "TypeScript 1",
    "lead": "这些结论还没有单独成卷。每一题仍只回答这一问。",
    "questionIds": [
      "rs1-1",
      "rs1-2",
      "rs1-3",
      "rs1-4",
      "rs1-5",
      "rs1-6",
      "rs1-7",
      "rs1-8",
      "rs1-9",
      "rs1-10"
    ]
  },
  {
    "id": "rs2",
    "courseId": "rest",
    "level": 2,
    "title": "React 生态 2",
    "lead": "这些结论还没有单独成卷。每一题仍只回答这一问。",
    "questionIds": [
      "rs2-1",
      "rs2-2",
      "rs2-3",
      "rs2-4",
      "rs2-5",
      "rs2-6",
      "rs2-7",
      "rs2-8",
      "rs2-9",
      "rs2-10"
    ]
  },
  {
    "id": "rs3",
    "courseId": "rest",
    "level": 3,
    "title": "Java 基础 3",
    "lead": "这些结论还没有单独成卷。每一题仍只回答这一问。",
    "questionIds": [
      "rs3-1",
      "rs3-2",
      "rs3-3",
      "rs3-4",
      "rs3-5",
      "rs3-6",
      "rs3-7",
      "rs3-8",
      "rs3-9",
      "rs3-10"
    ]
  },
  {
    "id": "rs4",
    "courseId": "rest",
    "level": 4,
    "title": "设计模式 4",
    "lead": "这些结论还没有单独成卷。每一题仍只回答这一问。",
    "questionIds": [
      "rs4-1",
      "rs4-2",
      "rs4-3",
      "rs4-4",
      "rs4-5",
      "rs4-6",
      "rs4-7",
      "rs4-8",
      "rs4-9",
      "rs4-10"
    ]
  }
]
