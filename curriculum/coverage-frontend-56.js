/* Frontend 56: JS / TS / CSS / 浏览器 / HTTP / Node 是什么。定义课，不单开为什么。 */
const COVERAGE_FRONTEND_56 = [
  {
    track:'frontend', group:'语言基础', id:'js-what-it-is',
    title:'JavaScript 是给网页加行为的编程语言',
    prompt:'HTML 画出结构、CSS 画出样子之后，按钮被点、列表被改，是哪一门语言在做？',
    promptAnswer:'是 JavaScript。它是网页里用来写行为的编程语言。语言标准叫 ECMAScript。',
    core:'JavaScript（JS）是给网页加行为的编程语言。HTML 描述文档里有哪些元素，CSS 描述这些元素长什么样，JavaScript 描述用户点了什么、数据变了要改哪一块。语言的标准名字是 ECMAScript。浏览器里的 JavaScript 由引擎执行，常见的是 V8、SpiderMonkey、JavaScriptCore。值分成原始值和对象，见 `js-value-kinds`。',
    example:'按钮上的字来自脚本，不是写死在 HTML 里：\n\n```html\n<button id="pay">Pay</button>\n<script>\ndocument.getElementById("pay").textContent = "Pay 100";\n</script>\n```',
    task:'用文档里的说法说明 JavaScript 是什么。HTML、CSS、JavaScript 各管哪一件事？语言标准叫什么？',
    answer:'JavaScript 是给网页加行为的编程语言。HTML 管结构，CSS 管样子，JavaScript 管行为。语言标准叫 ECMAScript。',
    keywords:'JavaScript ECMAScript HTML CSS scripting',
    points:['JavaScript 是给网页加行为的编程语言','HTML 管结构，CSS 管样子，脚本管行为','语言标准叫 ECMAScript'],
    deep:[
      {title:'引擎执行的是这门语言',body:'页面上的 script 交给浏览器里的引擎。引擎实现的是 ECMAScript。页面上另外还有 DOM、fetch 这些由浏览器提供的接口，不是语言正文里的每一种值。'},
      {title:'怎样自己验证',body:'打开 MDN 的 JavaScript 技术概览，对上它是编程语言、用在网页上。再打开一份只含 HTML 和 CSS 的页面，确认按钮上的字不会自己变；加上 script 之后才会变。'},
    ],
    refs:[['MDN：JavaScript','https://developer.mozilla.org/en-US/docs/Web/JavaScript'],['ECMA-262','https://tc39.es/ecma262/']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-run-in-page',
    title:'脚本通过 script 进入已经打开的文档',
    prompt:'一段 JavaScript 怎样出现在浏览器已经打开的那份 HTML 里？',
    promptAnswer:'写在 script 元素里，或用 src 指向一个 .js 文件。模块脚本把 type 写成 module。',
    core:'浏览器打开的是一份 HTML 文档。脚本要进入这份文档，用 script 元素。内联脚本写在标签中间。外部脚本把地址写在 src 上。type="module" 的脚本按 ECMAScript 模块加载，可以用 import。script 出现在文档里之后，引擎才开始跑。模块怎么导出，见 `esm`。页面上的元素怎样被脚本找到，见 `dom-event-flow`。',
    example:'外部模块脚本：\n\n```html\n<script type="module" src="/pay.js"></script>\n```\n\n```javascript\n// pay.js\nconst button = document.getElementById("pay");\nbutton.textContent = "Pay 100";\n```',
    task:'说明脚本进入文档的两种写法。模块脚本要把 type 写成什么？',
    answer:'一种写在 script 标签中间，一种用 src 指向 .js 文件。模块脚本把 type 写成 module。脚本出现在文档里之后，引擎才开始跑。',
    keywords:'script src module HTML document',
    points:['脚本通过 script 元素进入文档','src 指向外部文件，中间可以写内联脚本','type 为 module 时按模块加载'],
    deep:[
      {title:'先有文档再有脚本',body:'getElementById 找到的是这份 HTML 已经解析出来的节点。脚本在节点之前执行，会拿到 null。把 script 放在要找的元素后面，或等 DOMContentLoaded。'},
      {title:'怎样自己验证',body:'写一个带 id 的按钮和一段改 textContent 的脚本。先把 script 放在按钮前面，确认拿到 null。再放到按钮后面，确认字变了。'},
    ],
    refs:[['HTML：The script element','https://html.spec.whatwg.org/multipage/scripting.html#the-script-element'],['MDN：<script>','https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-not-java-around',
    title:'JavaScript 不是 Java，旁边是 HTML、CSS 和 TypeScript',
    prompt:'名字里有 Java，是不是同一门语言？类型标注要写在哪一层？',
    promptAnswer:'不是。JavaScript 和 Java 是两门语言。类型标注写在 TypeScript 里，编译后仍是 JavaScript。',
    core:'JavaScript 和 Java 名字接近，但语法、类型和运行环境都不是同一套。网页上和它一起出现的是 HTML 与 CSS。要在编写时标类型，用 TypeScript：它是带类型语法的 JavaScript，编译后类型被拿掉，见 `ts-what-it-is`。在服务器或工具里跑同一门语言，用 Node.js，见 `node-what-it-is`。原始值和对象的分法见 `js-value-kinds`。',
    example:'三份文件各做一件事：\n\n```html\n<button id="pay">Pay</button>\n```\n\n```css\n#pay { font-size: 16px; }\n```\n\n```javascript\ndocument.getElementById("pay").onclick = () => { /* 付款 */ };\n```',
    task:'说明 JavaScript 和 Java 是不是同一门语言。类型标注、页面结构、样式各写在哪一层？',
    answer:'不是同一门语言。类型标注写在 TypeScript 里。页面结构写在 HTML 里，样式写在 CSS 里。JavaScript 写行为。',
    keywords:'JavaScript Java TypeScript HTML CSS',
    points:['JavaScript 和 Java 不是同一门语言','旁边是 HTML 与 CSS','类型标注属于 TypeScript，编译后仍是 JavaScript'],
    deep:[
      {title:'Node 里也没有网页那一套',body:'同一门语言可以在 Node.js 里跑。那里没有 document，也没有 CSS。文件和网络用 Node 自己的模块。不要把浏览器接口当成语言的一部分。'},
      {title:'怎样自己验证',body:'打开 MDN 的 JavaScript 概览，对上它和 Java 没有实现关系。再看一份前端工程：.html / .css / .js 或 .ts 分开。TypeScript 文件编译产物里没有类型标注。'},
    ],
    refs:[['MDN：JavaScript 技术概览','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview'],['ECMA-262','https://tc39.es/ecma262/']]
  },
  {
    track:'frontend', group:'TypeScript', id:'ts-what-it-is',
    title:'TypeScript 是带类型语法的 JavaScript',
    prompt:'要在编写时标出参数和返回值的类型，用的是哪一层？',
    promptAnswer:'用 TypeScript。它是带类型语法的 JavaScript。类型在编译时检查，不代替运行时的值。',
    core:'TypeScript 是带类型语法的 JavaScript。文档第一句写的是：TypeScript is JavaScript with syntax for types。你在参数、返回值和对象上写下类型，编译器在转换成 JavaScript 之前检查它们。检查通过的文件，运行时仍是 JavaScript。类型标注怎么写，见 `ts-type-annotation`。联合类型见 `ts-union-annotation`。',
    example:'给参数标上类型：\n\n```typescript\nfunction price(cents: number): string {\n  return (cents / 100).toFixed(2);\n}\n```',
    task:'用文档里的说法说明 TypeScript 是什么。类型是在哪一步检查的？跑起来还是不是 JavaScript？',
    answer:'TypeScript 是带类型语法的 JavaScript。类型在编译时检查。跑起来仍是 JavaScript，类型标注不会留在运行时的值上。',
    keywords:'TypeScript JavaScript types compiler',
    points:['TypeScript 是带类型语法的 JavaScript','类型在编译时检查','运行时仍是 JavaScript'],
    deep:[
      {title:'类型描述的是编写时的约定',body:'function price(cents: number) 告诉编译器：调用时应当传入数字。运行时如果从 JSON 里读到字符串，类型标注拦不住，见 `ts-unknown`。'},
      {title:'怎样自己验证',body:'打开 TypeScript 手册 The TypeScript Handbook 的开头，对上 JavaScript with syntax for types。把上面的函数存成 .ts，用 tsc 编译，打开生成的 .js，确认没有 number。'},
    ],
    refs:[['TypeScript：The TypeScript Handbook','https://www.typescriptlang.org/docs/handbook/intro.html'],['TypeScript：What is TypeScript','https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html']]
  },
  {
    track:'frontend', group:'TypeScript', id:'ts-compile-to-js',
    title:'tsc 把 TypeScript 编译成 JavaScript',
    prompt:'浏览器和 Node 要执行的是哪一种文件？.ts 怎样变成它？',
    promptAnswer:'执行的是 JavaScript。tsc 读取 .ts，检查类型，写出 .js。类型标注在这一步被拿掉。',
    core:'浏览器和 Node 执行的是 JavaScript，不是 .ts 源文件本身。tsc 是 TypeScript 编译器：读入 .ts 或 .tsx，做类型检查，再写出 .js。类型标注、接口和类型别名在这一步消失。工程里也可以让构建工具调用同一套检查，例如 Vite 配上 typescript。模块怎么解析，见 `ts-module-resolution`。',
    example:'一行命令把当前目录的 .ts 编成 .js：\n\n```bash\nnpx tsc pay.ts --target es2020\n```',
    task:'指出 tsc 读入什么、写出什么。类型标注在写出的文件里还在不在？',
    answer:'tsc 读入 .ts，写出 .js。类型标注在写出的文件里被拿掉。浏览器和 Node 执行的是这份 JavaScript。',
    keywords:'tsc compiler emit JavaScript',
    points:['浏览器和 Node 执行的是 JavaScript','tsc 读入 .ts 并写出 .js','类型标注在编译时被拿掉'],
    deep:[
      {title:'检查和写出可以分开',body:'tsc --noEmit 只检查不写文件。构建工具可以只转译语法、把类型检查留给 CI。两种安排都还是「先 TypeScript，再 JavaScript」。'},
      {title:'怎样自己验证',body:'写一个带类型标注的函数，运行 tsc。打开生成的 .js，确认标注消失、函数还在。把参数类型改错再编译，确认报错且可以加上 --noEmit 只看检查。'},
    ],
    refs:[['TypeScript：tsc CLI','https://www.typescriptlang.org/docs/handbook/compiler-options.html'],['TypeScript：Intro','https://www.typescriptlang.org/docs/handbook/intro.html']]
  },
  {
    track:'frontend', group:'TypeScript', id:'ts-not-runtime-check',
    title:'类型在编译后消失，旁边仍是 JavaScript',
    prompt:'接口返回的 JSON 已经标成 User，运行时还会不会按这个类型拦住错误字段？',
    promptAnswer:'不会。类型在编译后消失。不可信的数据要在运行时自己检查，常用 unknown 再收窄。',
    core:'TypeScript 的类型不进入运行时。编译后的 JavaScript 里没有 User 这个类型对象，JSON.parse 的结果也不会自动变成你标的形状。不可信的输入先当成 unknown，再在运行时检查字段，见 `ts-unknown`。和 Java 不同：Java 的基本类型和类在虚拟机里还在。TypeScript 站在 JavaScript 旁边，不替换它。',
    example:'编译前后对照：\n\n```typescript\nfunction id(user: { id: string }) {\n  return user.id;\n}\n```\n\n```javascript\nfunction id(user) {\n  return user.id;\n}\n```',
    task:'说明类型标注在运行时还在不在。从接口拿到的 JSON 要先当成哪种类型再检查？',
    answer:'类型标注在运行时不在。从接口拿到的 JSON 要先当成 unknown，再检查字段。标成 User 不会在运行时拦住错误字段。',
    keywords:'TypeScript type erasure unknown JavaScript',
    points:['类型在编译后消失','不可信数据要运行时检查','TypeScript 站在 JavaScript 旁边，不替换它'],
    deep:[
      {title:'接口和类型别名都不会变成值',body:'interface User { id: string } 只给编译器看。不能写 new User()，也不能用 typeof 在运行时问它是不是 User。要保留一份形状，另写运行时的检查函数。'},
      {title:'怎样自己验证',body:'把 JSON.parse 的结果标成 User，传入缺 id 的对象。编译通过，运行时读 id 得到 undefined。改成 unknown 并先检查 id，缺字段时停在检查函数里。'},
    ],
    refs:[['TypeScript：Type Erasure','https://www.typescriptlang.org/docs/handbook/2/everyday-types.html'],['TypeScript：unknown','https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown']]
  },
  {
    track:'frontend', group:'CSS 与布局', id:'css-what-it-is',
    title:'CSS 是描述文档怎么呈现的样式语言',
    prompt:'一份 HTML 已经有标题和按钮，字号、颜色和排列写在哪一种语言里？',
    promptAnswer:'写在 CSS 里。CSS 是描述文档怎么呈现的样式语言。一条规则由选择器和一组声明组成。',
    core:'CSS（Cascading Style Sheets，层叠样式表）是描述文档怎么呈现的样式语言。文档通常是 HTML。一条规则左边是选择器，右边是一组声明（declaration）：属性名和值。浏览器按选择器找到元素，再按层叠算出每个属性的值。选择器怎么写，见 `css-selector-simple`。规则的写法见 `css-rule-syntax`。',
    example:'选中按钮并设定字号：\n\n```css\nbutton {\n  font-size: 16px;\n  color: black;\n}\n```',
    task:'用文档里的说法说明 CSS 是什么。一条规则左边和右边各是什么？',
    answer:'CSS 是描述文档怎么呈现的样式语言。左边是选择器，右边是一组声明，每条声明是属性名和值。',
    keywords:'CSS stylesheet selector declaration',
    points:['CSS 是描述文档怎么呈现的样式语言','规则由选择器和声明组成','声明是属性名和值'],
    deep:[
      {title:'呈现不是另写一套 HTML',body:'结构仍在 HTML 里。CSS 不负责说出页面上有没有这个按钮，只负责这个按钮看起来多大、什么颜色、排在哪一条轴上。'},
      {title:'怎样自己验证',body:'打开 MDN 的 CSS 入门，对上 stylesheet language。写一份只有 HTML 的按钮，再挂上上面那条规则，确认字号变了、按钮还是同一个元素。'},
    ],
    refs:[['MDN：CSS','https://developer.mozilla.org/en-US/docs/Web/CSS'],['CSS Snapshot：CSS','https://www.w3.org/TR/CSS/']]
  },
  {
    track:'frontend', group:'CSS 与布局', id:'css-attach-to-document',
    title:'样式表挂到文档上，选择器才找得到元素',
    prompt:'写好的 CSS 怎样作用到已经打开的那份 HTML 上？',
    promptAnswer:'用 link 引入外部样式表，或用 style 元素写在文档里。选择器按这份文档里的元素匹配。',
    core:'CSS 必须挂到文档上才生效。常见写法是 link 的 rel="stylesheet" 指向一个 .css 文件，或在文档里放 style 元素。挂上之后，选择器在这份文档的元素上匹配。元素上的 style 属性只作用于那一个元素。选择器怎么写，见 `css-selector-simple`。层叠谁赢，见 `css-cascade`。',
    example:'外部样式表：\n\n```html\n<link rel="stylesheet" href="/pay.css">\n<button>Pay</button>\n```',
    task:'写出把样式表挂到文档上的两种办法。选择器匹配的是哪一份文档里的元素？',
    answer:'用 link 引入外部文件，或用 style 元素写在文档里。选择器匹配的是已经挂上这份样式表的文档里的元素。',
    keywords:'link stylesheet style element',
    points:['样式表通过 link 或 style 挂到文档','选择器匹配这份文档里的元素','style 属性只作用于那一个元素'],
    deep:[
      {title:'没有挂上就没有规则',body:'CSS 文件放在工程里但没有 link，页面上的按钮不会读到这些分量。开发工具的 Network 面板能看到样式表有没有作为文档的一部分被请求。'},
      {title:'怎样自己验证',body:'同一份 HTML 先不写 link，确认按钮是浏览器默认样子。加上 link 后再刷新，确认字号变成规则里的值。把 href 改成不存在的路径，确认样式消失。'},
    ],
    refs:[['HTML：The link element','https://html.spec.whatwg.org/multipage/semantics.html#the-link-element'],['MDN：Getting started with CSS','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started']]
  },
  {
    track:'frontend', group:'CSS 与布局', id:'css-not-the-engine',
    title:'CSS 描述呈现，排版和绘制由浏览器做',
    prompt:'写了 display:flex 之后，谁去算每个盒子的宽高，谁去画到屏幕上？',
    promptAnswer:'CSS 只写出要用 Flexbox。算宽高是布局，画到屏幕是绘制。这两步由浏览器做。',
    core:'CSS 写出元素应当怎样呈现：用哪种布局、多大、什么颜色。真正算出盒子宽高的是浏览器的布局（layout），画到屏幕上的是绘制（paint）。这两步不是另一门要你手写的语言。Flex 与 Grid 是 CSS 里的布局方式，见 `css-flex`、`css-grid-flex`。布局和绘制的时机见 `layout`、`rendering`。JavaScript 改的是文档或样式，随后仍由浏览器再走布局和绘制。',
    example:'规则只描述要用 Flexbox：\n\n```css\n.row {\n  display: flex;\n  gap: 8px;\n}\n```',
    task:'说明 CSS、布局、绘制各负责哪一步。display:flex 有没有代替浏览器去算宽高？',
    answer:'CSS 描述呈现。布局算出盒子宽高，绘制画到屏幕。display:flex 只声明用 Flexbox，不算也不画。',
    keywords:'CSS layout paint browser Flexbox',
    points:['CSS 描述呈现，不算盒子也不画像素','布局和绘制由浏览器做','Flex 与 Grid 是 CSS 里的布局方式'],
    deep:[
      {title:'和 JavaScript 的分工',body:'脚本可以改 className 或 element.style。改完之后，仍是浏览器按新的 CSS 做布局和绘制。脚本不是第二套排版引擎。'},
      {title:'怎样自己验证',body:'打开开发工具的 Performance，点一次改 class 的按钮。确认有 Recalculate Style，随后才是 Layout 和 Paint。CSS 文件本身不会出现「算出 120px」这一行代码。'},
    ],
    refs:[['CSS Display Module','https://www.w3.org/TR/css-display-3/'],['MDN：CSS 布局','https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout']]
  },
  {
    track:'frontend', group:'浏览器', id:'browser-what-it-is',
    title:'浏览器是取出文档、交给引擎呈现的用户代理',
    prompt:'地址栏里输入网址之后，谁去取回 HTML，谁把它变成可以点的页面？',
    promptAnswer:'浏览器作为用户代理发出请求、取回文档，再解析成 DOM，套上 CSS，跑脚本，画到窗口里。',
    core:'浏览器是一种用户代理（user agent）：按网址取出资源，把 HTML 解析成文档对象模型（DOM），把 CSS 套到这份文档上，执行脚本，再把结果画到窗口里。它还提供会话、存储和权限这些页面之外的能力。文档里的事件怎么冒泡，见 `dom-event-flow`。一帧里布局和绘制的顺序见 `rendering`。',
    example:'地址栏里的一次打开：\n\n```text\nhttps://shop.example/pay\n  → 取出 HTML\n  → 解析成 DOM\n  → 套上 CSS，执行脚本\n  → 窗口里出现页面\n```',
    task:'用文档里的说法说明浏览器是什么。取回 HTML 之后，还要经过哪三步才出现可以点的页面？',
    answer:'浏览器是取出文档并呈现它的用户代理。取回 HTML 之后，要解析成 DOM，套上 CSS 并执行脚本，再画到窗口里。',
    keywords:'browser user agent DOM CSS HTML',
    points:['浏览器是取出并呈现文档的用户代理','HTML 被解析成 DOM','CSS 和脚本在这份文档上生效，再画到窗口'],
    deep:[
      {title:'一个窗口里可以有多份文档',body:'iframe 和打开的标签页各有自己的文档。脚本默认只能碰同一源的文档。跨源请求见 `cors`。'},
      {title:'怎样自己验证',body:'打开任意页面的开发工具 Elements，确认看到的是解析后的 DOM。再看 Network，确认第一份文档是这次导航取回的 HTML。'},
    ],
    refs:[['HTML：Browsing the web','https://html.spec.whatwg.org/multipage/browsing-the-web.html'],['MDN：How browsers work','https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work']]
  },
  {
    track:'frontend', group:'浏览器', id:'browser-document-enters',
    title:'导航取出文档，解析之后才有 DOM',
    prompt:'点开一个链接之后，页面上的元素从哪来？',
    promptAnswer:'浏览器按网址导航，取出 HTML，解析成 DOM。脚本和样式都作用在这棵树上。',
    core:'点链接或改地址栏会开始一次导航（navigation）。浏览器按网址取回 HTML，解析器一边读字节一边造出 DOM。随后才加载样式表和脚本。脚本里的 document 指向这棵树。地址变化但不要整页替换时，用 history.pushState，见 `html5-pushstate-popstate`。表单提交也会导航，见 `html-form-semantics`。',
    example:'一次导航的入口是网址：\n\n```text\nGET /pay HTTP/1.1\nHost: shop.example\n```\n\n响应体是 HTML，解析后才有 document.getElementById("pay") 能找到的节点。',
    task:'说明导航、HTML、DOM 的顺序。脚本里的 document 指向什么？',
    answer:'先按网址导航并取出 HTML，再解析成 DOM。脚本里的 document 指向这棵解析出来的树。',
    keywords:'navigation HTML parse DOM',
    points:['导航按网址取出 HTML','解析之后才有 DOM','脚本里的 document 指向这棵树'],
    deep:[
      {title:'刷新会再走一遍导航',body:'刷新不是「只再跑一遍脚本」。浏览器会按缓存策略再取文档，再解析。bfcache 恢复的是整页快照，见 `bfcache-pageshow`。'},
      {title:'怎样自己验证',body:'打开 Network，勾选 Preserve log，点一个站内链接。确认有一次文档请求，Elements 里的树随之换成新文档。'},
    ],
    refs:[['HTML：Navigating across documents','https://html.spec.whatwg.org/multipage/browsing-the-web.html#navigate'],['MDN：Document','https://developer.mozilla.org/en-US/docs/Web/API/Document']]
  },
  {
    track:'frontend', group:'浏览器', id:'browser-not-node',
    title:'浏览器里有文档和窗口，Node.js 里没有',
    prompt:'同一段调用 document.getElementById 的脚本，放到 node 命令下跑，会怎样？',
    promptAnswer:'会失败。Node.js 没有窗口，也没有文档。文件和 HTTP 服务用 Node 自己的模块。',
    core:'浏览器给脚本的是窗口（window）和文档（document），以及 fetch、DOM 这些页面接口。Node.js 是另一套运行时：默认没有 window 和 document，有的是 process、fs 和 http。同一门 JavaScript 语言可以在两边跑，接口不同。Node 是什么见 `node-what-it-is`。浏览器里的事件循环还要迁就一帧的绘制，见 `browser-event-loop-frame`。',
    example:'两边各自的入口：\n\n```javascript\n// 浏览器\ndocument.getElementById("pay");\n\n// Node.js\nimport { readFile } from "node:fs/promises";\nawait readFile("pay.json", "utf8");\n```',
    task:'说明浏览器脚本能用、Node 默认没有的两样东西。读文件该去哪一边？',
    answer:'浏览器有 window 和 document，Node 默认没有。读文件用 Node 的 fs。两边跑的是同一门 JavaScript，接口不同。',
    keywords:'browser window document Node.js',
    points:['浏览器给脚本窗口和文档','Node.js 默认没有 DOM','同一门语言，两套接口'],
    deep:[
      {title:'不要用浏览器接口去写服务端',body:'在 Node 里调用 document 会报 document is not defined。要在服务端渲染 HTML，用框架提供的渲染函数，不要假装自己在窗口里。'},
      {title:'怎样自己验证',body:'把 document.getElementById("pay") 存成文件，用 node 跑，确认报错。同一段放进页面的 script，确认能找到元素。'},
    ],
    refs:[['HTML：The Window object','https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-window-object'],['Node.js：About','https://nodejs.org/docs/latest/api/documentation.html']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http-what-it-is',
    title:'HTTP 是传输超文本的应用层协议',
    prompt:'浏览器要拿回一份 HTML 或一段 JSON，和服务器之间用的是哪一种协议？',
    promptAnswer:'用 HTTP。它是传输超文本的应用层协议。一次交换是请求加响应。',
    core:'HTTP（Hypertext Transfer Protocol）是传输超文本的应用层协议。客户端发出请求，服务器返回响应。请求里有方法、目标、头字段，需要时还有消息体。响应里有状态码、头字段和消息体。方法怎么选，见 `http-methods`。状态码里的认证失败见 `http-status-auth`。',
    example:'取回付款页：\n\n```http\nGET /pay HTTP/1.1\nHost: shop.example\n\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\n```',
    task:'用文档里的说法说明 HTTP 是什么。一次交换的两边各叫什么？请求里至少有哪三样？',
    answer:'HTTP 是传输超文本的应用层协议。一次交换是请求和响应。请求里至少有方法、目标和头字段。',
    keywords:'HTTP request response application protocol',
    points:['HTTP 是传输超文本的应用层协议','一次交换是请求加响应','请求里有方法、目标和头字段'],
    deep:[
      {title:'HTTPS 是套上 TLS 的 HTTP',body:'地址写成 https:// 时，仍是 HTTP 的请求和响应，只是先在传输上加上 TLS。证书和主机名核对见 `tls-hostname-verify`。'},
      {title:'怎样自己验证',body:'打开 MDN 的 HTTP 概述，对上 application-layer protocol。再在开发工具 Network 里点一条文档请求，对照方法、状态码和头字段。'},
    ],
    refs:[['MDN：HTTP','https://developer.mozilla.org/en-US/docs/Web/HTTP'],['RFC 9110：HTTP Semantics','https://www.rfc-editor.org/rfc/rfc9110']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http-request-enters',
    title:'fetch 发出请求，响应体按 Content-Type 读',
    prompt:'页面脚本要向服务器要一段 JSON，调用的是哪一个平台接口？',
    promptAnswer:'调用 fetch。它发出 HTTP 请求，返回响应。读正文之前先看 Content-Type。',
    core:'页面脚本发出 HTTP 请求，用的是平台提供的 fetch。调用时写上方法、路径和需要的头字段。服务器返回 Response 之后，用 response.json() 或 response.text() 读正文。正文能当 JSON 读，是因为 Content-Type 对得上，见 `http-content-type-body`。带上 Cookie 要写 credentials，见 `fetch-credentials`。fetch 本身见 `fetch-platform-client`。',
    example:'取回订单 JSON：\n\n```javascript\nconst response = await fetch("/api/orders/1", {\n  method: "GET",\n  credentials: "same-origin",\n});\nconst order = await response.json();\n```',
    task:'说明页面脚本用什么发出 HTTP 请求。读 JSON 之前要看响应上的哪一类字段？',
    answer:'用 fetch 发出请求。读 JSON 之前看 Content-Type。credentials 决定这次请求带不带 Cookie。',
    keywords:'fetch request Content-Type response',
    points:['页面脚本用 fetch 发出 HTTP 请求','响应体按 Content-Type 来读','带 Cookie 要写 credentials'],
    deep:[
      {title:'方法和路径都在请求里',body:'创建资源用 POST，不要把创建写成 PUT，见 `http-create-post-not-put`。路径是资源的标识，不是方法的别名。'},
      {title:'怎样自己验证',body:'在页面里对一个会返回 JSON 的路径调用 fetch。在 Network 里确认方法和状态码。把接收改成 response.text() 再 JSON.parse，对照 Content-Type。'},
    ],
    refs:[['Fetch Standard','https://fetch.spec.whatwg.org/'],['MDN：fetch()','https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch']]
  },
  {
    track:'frontend', group:'网络与安全', id:'http-not-tcp',
    title:'HTTP 在应用层，TCP 只保证这一层下面的字节流',
    prompt:'TCP 已经可靠传输，是不是就不需要再谈 HTTP 的方法、状态码和头字段？',
    promptAnswer:'不是。TCP 管的是字节流。方法、状态码和头字段属于 HTTP。HTTP 不是 TCP 握手。',
    core:'TCP 在传输层提供可靠的字节流，见 `tcp-is-l4-not-http-handshake`。HTTP 在应用层规定这些字节怎么读成方法、目标、头字段和正文。TLS 握手也不是 HTTP 握手，见 `https-tls13-not-12-packets`。一条 TCP 连接上可以复用多次 HTTP 交换，见 `http-connection-reuse`、`http2-multiplex`。可靠不等于应用层消息一定到达业务，见 `tcp-reliable-not-never-lose`。',
    example:'层次不要写反：\n\n```text\nHTTP  GET /pay   应用层\nTLS   记录层     保护字节\nTCP   字节流     传输层\n```',
    task:'说明 TCP 和 HTTP 各在哪一层。方法与状态码属于哪一层？HTTP 是不是 TCP 握手？',
    answer:'TCP 在传输层，HTTP 在应用层。方法与状态码属于 HTTP。HTTP 不是 TCP 握手。',
    keywords:'HTTP TCP TLS application layer',
    points:['HTTP 在应用层，TCP 在传输层','方法、状态码和头字段属于 HTTP','HTTP 不是 TCP 握手'],
    deep:[
      {title:'QUIC 上仍是 HTTP',body:'HTTP/3 跑在 QUIC 上，不再用 TCP。请求和响应的语义仍是 HTTP。不要把「换了传输」写成「没有 HTTP 了」。'},
      {title:'怎样自己验证',body:'打开开发工具 Network，点一条请求。Headers 里看到的是 HTTP 字段。在 Wireshark 或浏览器的协议列里，同一条还叠着 TLS 和 TCP 或 QUIC。'},
    ],
    refs:[['RFC 9110：HTTP Semantics','https://www.rfc-editor.org/rfc/rfc9110'],['MDN：OSI 模型里的 HTTP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-what-it-is',
    title:'Node.js 是在浏览器外执行 JavaScript 的运行时',
    prompt:'没有窗口、也没有文档的时候，同一门 JavaScript 在哪一套环境里跑？',
    promptAnswer:'在 Node.js 里跑。它是浏览器外的 JavaScript 运行时，建立在 V8 上，用来写服务和工具。',
    core:'Node.js 是在浏览器外执行 JavaScript 的运行时（runtime）。它嵌入 V8 引擎，再加上文件、网络、进程这些模块。文档把它写成 asynchronous event-driven JavaScript runtime。常见用途是 HTTP 服务、命令行工具和构建脚本。事件循环的阶段见 `node-event-loop-phases`。用它收 HTTP 请求见 `node-http-cookie`。',
    example:'命令行里跑一份脚本：\n\n```bash\nnode pay.js\n```\n\n```javascript\nimport { createServer } from "node:http";\ncreateServer((req, res) => {\n  res.end("ok");\n}).listen(3000);\n```',
    task:'用文档里的说法说明 Node.js 是什么。它建立在哪一个引擎上？有没有窗口？',
    answer:'Node.js 是在浏览器外执行 JavaScript 的运行时，建立在 V8 上。没有窗口，也没有文档。用来写服务和工具。',
    keywords:'Node.js runtime V8 JavaScript',
    points:['Node.js 是浏览器外的 JavaScript 运行时','建立在 V8 上，并提供文件和网络模块','没有窗口和文档'],
    deep:[
      {title:'运行时不是另一门语言',body:'pay.js 里仍是 JavaScript。换的是宿主提供的接口：process、fs、http，而不是 window。语言本身的值、函数和模块规则见语言基础。'},
      {title:'怎样自己验证',body:'打开 Node.js About 文档，对上 JavaScript runtime。写一份只调用 console.log 的文件用 node 跑通。再写 document.getElementById，确认报错。'},
    ],
    refs:[['Node.js：About this documentation','https://nodejs.org/docs/latest/api/documentation.html'],['Node.js：Introduction','https://nodejs.org/en/learn/getting-started/introduction-to-nodejs']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-run-process',
    title:'node 命令启动一个进程，入口是一份脚本',
    prompt:'要把一份 .js 在 Node.js 里跑起来，命令行里写什么？',
    promptAnswer:'写 node 加上文件路径。这会启动一个进程，从这份入口脚本开始执行。',
    core:'命令行里的 node 启动一个操作系统进程，入口是你给出的脚本。进程里有 event loop，把回调、定时器和 I/O 排进不同阶段，见 `node-event-loop-phases`。没有处理的 Promise 拒绝会进 unhandledRejection，见 `node-unhandled-rejection`。要停掉正在听端口的服务，先停接受新连接，见 `node-http-close`。',
    example:'启动入口：\n\n```bash\nnode server.js\n```\n\n```javascript\n// server.js\nimport { createServer } from "node:http";\nconst server = createServer((req, res) => res.end("ok"));\nserver.listen(3000);\n```',
    task:'写出启动一份入口脚本的命令。这个命令会启动哪一种操作系统对象？',
    answer:'命令是 node 加上文件路径。它启动一个进程，从这份入口脚本开始执行。',
    keywords:'node process listen event loop',
    points:['node 命令启动一个进程','入口是命令行里的那份脚本','进程里有事件循环'],
    deep:[
      {title:'监听端口的是这个进程',body:'server.listen(3000) 让这个进程接受连接。多个终端各跑一次 node，就是多个进程，端口不能重复占用。关掉终端却没停进程时，端口仍被占着。'},
      {title:'怎样自己验证',body:'把上面的服务存成 server.js，运行 node server.js。用 curl http://127.0.0.1:3000 看到 ok。再开一个终端跑同一条命令，确认端口占用失败。'},
    ],
    refs:[['Node.js：Command-line API','https://nodejs.org/docs/latest/api/cli.html'],['Node.js：http.Server','https://nodejs.org/docs/latest/api/http.html#class-httpserver']]
  },
  {
    track:'frontend', group:'Node.js', id:'node-not-browser',
    title:'Node.js 提供进程和文件，不提供页面文档',
    prompt:'在 Node.js 里写登录态，是不是也可以用 document.cookie？',
    promptAnswer:'不是。Node.js 没有 document。HTTP 服务里的 Cookie 写在请求和响应的头字段上。',
    core:'Node.js 没有 document、window，也没有浏览器里的 Cookie 罐。读文件用 fs，开服务用 http 或 fetch。请求里的 Cookie 是头字段，见 `node-http-cookie`。全局 fetch 在 Node 18 之后可用，见 `node-global-fetch`。和浏览器的分工见 `browser-not-node`。',
    example:'服务端读 Cookie 头：\n\n```javascript\nimport { createServer } from "node:http";\ncreateServer((req, res) => {\n  const cookie = req.headers.cookie ?? "";\n  res.end(cookie);\n}).listen(3000);\n```',
    task:'说明 Node.js 里有没有 document.cookie。登录态的 Cookie 写在哪一类字段上？',
    answer:'没有 document.cookie。登录态的 Cookie 写在 HTTP 请求和响应的头字段上。读文件用 fs，不在文档里。',
    keywords:'Node.js document cookie fs http',
    points:['Node.js 没有 document 和 window','Cookie 是 HTTP 头字段','文件用 fs，服务用 http'],
    deep:[
      {title:'同一段语言，不要混宿主',body:'可以把校验函数写成两边都能 import 的纯函数。碰到 document 或 fs 的代码，按宿主拆开，不要在一份文件里同时假设两种环境。'},
      {title:'怎样自己验证',body:'在 Node 里打印 typeof document，确认是 undefined。写一个只读 req.headers.cookie 的服务，用 curl -H "Cookie: a=1" 打过去，确认读到的是头字段。'},
    ],
    refs:[['Node.js：http.IncomingMessage','https://nodejs.org/docs/latest/api/http.html#class-httpincomingmessage'],['Node.js：File system','https://nodejs.org/docs/latest/api/fs.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_56) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
