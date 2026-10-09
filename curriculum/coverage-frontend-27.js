/* Frontend 27: micro-frontend selection matrix and concrete usage of each approach.
   Complements coverage-frontend-26 (boundary / seams / ship). Not a star ranking. */
const COVERAGE_FRONTEND_27 = [
  {
    track:'frontend', group:'微前端', id:'mfe-pick-by-constraint',
    title:'选型先写三问：隔离、异构、谁决定挂载',
    prompt:'为什么「公司都在用 qiankun」仍然选不出该上 Module Federation 还是 iframe？',
    core:'选型不是先定框架名，而是先写下三条约束。隔离要多强：只要约定 CSS 前缀，还是必须 Shadow / 独立文档。栈是否长期异构：同一 React 大版本可共享，还是 Vue 与 React 要共存多年。谁决定挂载：完全由 URL 前缀驱动，还是弹层、页签由壳状态手动加载。三问写清之后，才对照 mfe-compare-matrix。独立发版仍不成立时，先回到 mfe-not-for-everything，不要为了选型表硬拆。构建时钉版本、运行时 remote、服务端拼 HTML 见 mfe-composition-models。',
    why:'先按热度装框架，再发现第三方报表必须强隔离、或弹层根本不跟路由走，只好叠第二套加载器。',
    example:'内部中台、全员 React 19、菜单跟路径一一对应：偏 Module Federation 或 single-spa。外包营销页、样式不可控：iframe 或无界。仪表盘里一个页签按按钮打开：qiankun 的 loadMicroApp 或手写挂载，而不是只配 activeRule。',
    task:'给当前产品填三格：隔离强度、是否异构、挂载由 URL 还是壳状态。每一格只留一种答案，空着的写「未决」。',
    answer:'三格示例：隔离写「约定前缀即可」；异构写「同一 React」；挂载写「URL 前缀」。第三方报表那一格单独写成「独立文档」。未决的格不要先写框架名。',
    keywords:'微前端选型 隔离 异构 挂载',
    points:['先写隔离、异构、挂载三问，再写框架名','同栈同发版时优先 Federation 或 single-spa 一类','强隔离或不跟路由的挂载另选 iframe / 手动加载'],
    deep:[
      {title:'和「技术选型」章的关系',body:'fe-pick-by-surface 决定交付面；本课决定多应用怎么拼。同一产品面仍应只留一种 UI 更新模型，见 fe-ui-update-model。'},
      {title:'怎样自己验证',body:'拿掉框架名后，三格仍能填满才进入对照表。只能说出「别人都用 X」时，先停选型。'}
    ],
    refs:[['webpack：Module Federation','https://webpack.js.org/concepts/module-federation/'],['single-spa：Getting started','https://single-spa.js.org/docs/getting-started-overview']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-compare-matrix',
    title:'对照表：按约束选组合方式，不要按星数',
    prompt:'Module Federation、single-spa、qiankun、无界、iframe 是不是越新越好？',
    promptAnswer:'不是。它们解决的缝不同：模块共享、生命周期编排、HTML 入口、原生隔离、独立文档。按三问对照，不是按发布时间。',
    core:'把常见方案按「主缝」对齐。Module Federation：独立构建在运行时共享模块，适合同栈、要 shared 单例，见 mfe-mf-host-setup。single-spa：根配置登记应用与 activeWhen，编排 bootstrap/mount/unmount，加载器可换，见 mfe-singlespa-register。qiankun：在 single-spa 模型上强调 HTML entry，路由用 registerMicroApps，按需用 loadMicroApp，见 mfe-qiankun-html-entry。无界：Web Component 容器加 iframe 沙箱，startApp 打开子应用，偏强隔离与保活，见 mfe-wujie-startapp。iframe：浏览器原生独立文档，通信走 postMessage，见 mfe-iframe-postmessage。构建时包或 npm 工作区：发版前钉死，不是运行时容器。一张表里每格只写「主缝」和「不擅长」，不要写成万能评分。',
    why:'把五个名字排成先进程度，落地时既要 shared，又要 HTML 入口沙箱，仓库出现两套生命周期。',
    example:'React 中台共享设计系统：Federation。已有多个 Webpack 应用只要统一挂卸载：single-spa。子应用交付整页 HTML、主应用用路径激活：qiankun。第三方 Vue 活动页要样式与 JS 强隔离：无界或 iframe。后台把报表嵌进固定区域且跨域：iframe。',
    task:'画出六行对照：Federation、single-spa、qiankun、无界、iframe、构建时包。每行写主缝一句、不适合一句。',
    answer:'Federation 主缝是运行时模块与 shared；不擅长强文档隔离。single-spa 主缝是生命周期与 activeWhen；不自带 HTML 拉取。qiankun 主缝是 HTML entry；容器要传真实元素。无界主缝是 WebComponent+iframe；不要当成轻量 shared。iframe 主缝是独立文档；通信贵。构建时包主缝是钉版本；壳不发版子应用也不能单独换。',
    keywords:'微前端对照 Module Federation qiankun 无界 iframe',
    diagram:'diagrams/mfe-compare.svg',
    map:[
      {title:'Module Federation',body:'运行时共享模块与 singleton；弱于独立文档隔离'},
      {title:'single-spa',body:'登记应用与 activeWhen；加载方式可换'},
      {title:'qiankun',body:'HTML entry + 路由或手动挂载'},
      {title:'无界 / iframe',body:'强隔离；通信与首屏成本另算'}
    ],
    points:['按主缝对照，不要按新旧排序','Federation 管模块共享，single-spa 管生命周期','HTML entry、无界、iframe 各解决更强隔离或整页入口'],
    deep:[
      {title:'可以组合',body:'壳用 single-spa 编排，个别远程用 Federation 加载模块；第三方角落仍 iframe。组合时在架构图上分开标注回滚面。'},
      {title:'学完还常外查的邻接点',body:'shared 版本冲突症状见 mfe-shared-deps、mfe-mf-host-setup。HTML entry 与 container 元素见 mfe-qiankun-html-entry。独立文档通信见 mfe-iframe-postmessage。选型三问见 mfe-pick-by-constraint。'},
      {title:'怎样自己验证',body:'把「要 shared 单例」和「要独立 document」写成两张卡片，看哪一行同时满足；两行都勾上同一框架时，对照表写错了。'}
    ],
    refs:[['webpack：Module Federation','https://webpack.js.org/concepts/module-federation/'],['qiankun：指南','https://qiankun.umijs.org/guide'],['无界：文档','https://wujie-micro.github.io/doc/']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-pick-one-path',
    title:'选定一条路径后，写出这次不做的清单',
    prompt:'对照表填完了，为什么仓库里还会同时出现 qiankun 和 Module Federation 两套壳？',
    core:'选型结束要留下唯一主路径，并写明不做项。主路径写：入口文件、子应用怎么被发现、共享依赖谁说了算、失败降级写在哪。不做清单写：不在同一产品再引入第二种运行时容器、不把每个页面拆成 remote、不把第三方页既 Federation 又 iframe。例外必须带删除日期或范围（例如「仅报表域 iframe」）。主路径与契约见 mfe-contract-version；独立发布指针见 mfe-independent-deploy。',
    why:'表上五个都「可考虑」，落地五个都开工。联调要记两套 API，故障不知该看 remoteEntry 还是 HTML entry。',
    example:'决议：中台主路径 Module Federation；报表子域 iframe；不引入 qiankun。三个月后若报表改为同栈组件，删除 iframe 分支。',
    task:'写出主路径一句话、不做三项、一个带范围的例外。缺任何一项就标「选型未结束」。',
    answer:'主路径只留一个运行时容器名。不做项包含第二种容器与过度拆分。例外写清范围或到期日。写不出不做项等于还没选完。',
    keywords:'微前端选型 主路径 不做清单',
    points:['选型结束要有唯一主路径','不做清单与例外范围要写下来','第二种容器只能作为带边界的例外'],
    deep:[
      {title:'和发版节奏',body:'主路径确定后，CI 只认一种产物形态：remoteEntry 或 HTML entry 或 iframe URL，不要三条流水线并行却无主人。'},
      {title:'怎样自己验证',body:'搜索 package.json：qiankun 与 @module-federation 与 wujie 不应同时出现在「新功能默认路径」上，除非例外清单写明。'}
    ],
    refs:[['webpack：Module Federation','https://webpack.js.org/concepts/module-federation/'],['single-spa：Configuration','https://single-spa.js.org/docs/configuration/']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-mf-host-setup',
    title:'Module Federation 落地：host、remote 与 shared 清单',
    prompt:'只知道有 ModuleFederationPlugin，怎样判断这一次已经接通而不是「配了个空壳」？',
    core:'落地清单四项必须对齐。remote：name、filename（常见 remoteEntry.js）、exposes 至少一个模块、shared 里 React 等 singleton。host：remotes 写容器名与入口 URL、相同 shared 策略、页面里出现 import("容器/暴露键")。两端 output.uniqueName 互不相同。本地用两个开发服务器验证：改 remote 暴露的文案，host 刷新后应看到；拿掉 exposes 键，host 导入应失败。版本与指针发布见 mfe-independent-deploy；概念见 mfe-module-federation。Rspack / Vite 插件换入口文件，语义仍是 host/remote/shared，见 mfe-vite-federation。',
    why:'插件从文档复制进两端，却从未 import 暴露键，菜单上空空，却以为 Federation 已上线。',
    example:'orders 暴露 ./OrderList。host remotes 为 orders@http://localhost:3002/remoteEntry.js。页面路由里 React.lazy(() => import("orders/OrderList"))。shared 双方 react、react-dom singleton。',
    task:'写出 remote 的 name、一个 expose 键、host 的 remotes 一行、以及页面上的 import 字符串。再写出少配 shared 时的预期症状。',
    answer:'四项对齐才算接通。少配 shared 时预期双 React 与钩子报错。只配插件没有 import，页面上不会出现子模块。',
    keywords:'Module Federation host remote exposes shared',
    diagram:'diagrams/mfe-federation.svg',
    points:['接通标准是 remotes、exposes、import、shared 四项对齐','uniqueName 两端不能碰撞','本地用加键与删键验证加载边界'],
    deep:[
      {title:'动态 remotes',body:'运行时改入口 URL 时仍走容器的 init/get，不要另发明全局变量传组件。'},
      {title:'shared 版本冲突症状',body:'少配 singleton 时常见双 React、钩子报 Invalid hook call、Context 穿不透。requiredVersion 对不上可能各自打包一份。治理清单见 mfe-shared-deps；契约升级见 mfe-contract-version。'},
      {title:'怎样自己验证',body:'Network 里应出现 remoteEntry；React 模块对象身份两端相同。删 expose 后错误应指向缺失模块。'}
    ],
    refs:[['webpack：ModuleFederationPlugin','https://webpack.js.org/plugins/module-federation-plugin/'],['webpack：Module Federation 概念','https://webpack.js.org/concepts/module-federation/']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-vite-federation',
    title:'Vite 或 Rspack 上的 Federation：换打包器，不换 host/remote 语义',
    prompt:'从 webpack 换到 Vite 之后，是不是就不能做 Module Federation 了？',
    promptAnswer:'不是。换的是插件与构建入口，host 消费 remote、exposes、shared 的语义仍在。以你正在用的插件文档为准。',
    core:'Module Federation 的核心约定是容器、暴露模块、共享作用域，不是「必须 webpack 这个文件名」。Vite、Rspack 等通过各自的 Federation 插件产出可被加载的入口；配置里同样出现 name、exposes 或 remotes、shared。核对时打开你锁定版本的插件说明，确认开发服务器的 public 路径与入口文件名。不要把「用了 Vite」写成「只能上 qiankun」。同栈共享仍要 singleton，见 mfe-shared-deps。异构或强隔离仍按 mfe-compare-matrix 另选。',
    why:'团队迁到 Vite 后放弃独立发布，或误以为只能整页 HTML entry，重复造一套加载器。',
    example:'文档中的 Vite Federation 插件为 remote 配置 exposes，为 host 配置 remotes。浏览器里仍是异步加载远程模块。共享 react 仍声明 singleton。',
    task:'写出当前打包器名称、Federation 插件包名或文档链接、以及 remote 入口文件名。缺文档链接就标「未锁定版本」。',
    answer:'打包器与插件名要写死版本。入口文件名以该插件为准。语义仍是 host/remote/shared，不是换汤换菜放弃 Federation。',
    keywords:'Vite Rspack Module Federation 插件',
    points:['换打包器不取消 host/remote/shared','以锁定版本的插件文档为准','Vite 不能单独当作必须改用 HTML entry 的理由'],
    deep:[
      {title:'和 HTML entry 的差别',body:'Federation 加载的是模块工厂；qiankun 拉取的是整页 HTML。两者都能独立发布，失败点与缓存策略不同。'},
      {title:'怎样自己验证',body:'在 Vite 或 Rspack 文档里定位 exposes/remotes 示例，对照自己的配置键名一致。跑通一次跨应用 import。'}
    ],
    refs:[['webpack：Module Federation','https://webpack.js.org/concepts/module-federation/'],['Rspack：Module Federation','https://rspack.rs/guide/features/module-federation']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-singlespa-register',
    title:'single-spa：registerApplication 与 start 之后才会挂载',
    prompt:'注册了子应用却一直不出现，是不是 activeWhen 写错了就够解释？',
    promptAnswer:'不是。还要检查是否调用了 start，以及 app 加载函数是否返回带 bootstrap/mount/unmount 的应用。',
    core:'根配置调用 registerApplication：name、app（应用对象或返回 Promise 的加载函数）、activeWhen（路径前缀、函数或数组）。可选 customProps 在每次生命周期传入。登记之后必须调用 start，应用才会按活动状态挂载；start 之前可以先加载但不会挂载，以便主应用自己先准备。字符串形式的 activeWhen 默认当路径前缀；需要精确匹配时用 pathToActiveWhen 的 exactMatch。子应用导出 bootstrap、mount、unmount。single-spa 不管你的打包器，也不自带 HTML 拉取，见 mfe-qiankun-html-entry。路由前缀纪律见 mfe-routing-one-history。',
    why:'只 register 不 start，或 mount 里没挂到壳的 DOM，路径对了页面仍空白。',
    example:'registerApplication({ name: "orders", app: () => import("./orders/main.js"), activeWhen: "/orders" }); start();。orders/main.js 导出三个生命周期，mount 时在 #orders 里 render。',
    task:'写出 name、activeWhen、是否调用 start、以及子应用三个生命周期导出。少一项标「未接通」。',
    answer:'登记含 name、加载函数、activeWhen。根配置要 start。子应用导出 bootstrap、mount、unmount。只登记不 start 不会挂载。',
    keywords:'single-spa registerApplication activeWhen start',
    points:['registerApplication 之后要 start','activeWhen 可为前缀、函数或数组','子应用必须导出三段生命周期'],
    deep:[
      {title:'customProps',body:'可把 getUser 或 authToken 注入子应用，避免 window 全局变量，见 mfe-shared-auth。'},
      {title:'怎样自己验证',body:'activeWhen 改成永假，应用应卸载。注释掉 start，路径匹配也不应挂载。'}
    ],
    refs:[['single-spa：Applications API','https://single-spa.js.org/docs/api/'],['single-spa：Configuration','https://single-spa.js.org/docs/configuration/']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-qiankun-html-entry',
    title:'qiankun：HTML entry，路由登记与手动 loadMicroApp',
    prompt:'子应用已经能单独打开，为什么挂到 qiankun 主应用后白屏，控制台却在抱怨 container？',
    core:'qiankun 的 entry 是子应用 HTML 的 URL，运行时拉取该文档并加载其中脚本。路由驱动用 registerMicroApps：name、entry、container、activeRule，再 start。按需、弹层、页签用 loadMicroApp，返回句柄，用完 unmount；这类场景不要硬套 activeRule。container 必须是真实 HTMLElement（getElementById 或框架 ref 的当前节点），不要传选择器字符串——新版本类型与运行时都按元素处理。跨源 entry 需要 CORS。HTML entry 与 Federation 模块入口是两条缝，见 mfe-compare-matrix。生命周期卸载纪律见 mfe-runtime-lifecycle。',
    why:'container 写成 "#root" 字符串，或框架因 key 重建拆掉了注册时保存的节点，挂载静默失败。',
    example:'const el = document.getElementById("subapp"); registerMicroApps([{ name: "shop", entry: "//localhost:7100", container: el, activeRule: "/shop" }]); start();。弹层里则 loadMicroApp({ name: "shop", entry, container: panelEl })，关闭时 unmount。',
    task:'写出 entry URL、container 如何取得元素、用的是 registerMicroApps 还是 loadMicroApp。再写出跨源时要有的响应头。',
    answer:'entry 是 HTML 地址。container 是元素不是选择器。URL 激活走 registerMicroApps+start；手动区域走 loadMicroApp。跨源要 CORS。',
    keywords:'qiankun HTML entry registerMicroApps loadMicroApp container',
    diagram:'diagrams/mfe-qiankun.svg',
    points:['entry 是子应用 HTML URL','container 必须是 HTMLElement','路由用 registerMicroApps，按需用 loadMicroApp'],
    deep:[
      {title:'v2 与 v3 的入口形态',body:'现行文档以字符串 HTML 入口为准。若你锁在旧版对象形态 entry，以该主版本 API 页为准，升级时单独验收。'},
      {title:'container 与生命周期',body:'框架因 key 重建拆掉节点后，旧 HTMLElement 引用失效。卸载监听与全局补丁见 mfe-runtime-lifecycle。路由前缀纪律见 mfe-routing-one-history。'},
      {title:'怎样自己验证',body:'把 container 改成字符串选择器，应类型失败或挂载失败。改回元素并匹配 activeRule，子应用 DOM 出现在该节点下。'}
    ],
    refs:[['qiankun：registerMicroApps','https://qiankun.umijs.org/api#registermicroappsapps-lifecycles'],['qiankun：loadMicroApp','https://qiankun.umijs.org/api#loadmicroappapp-configuration'],['qiankun：指南','https://qiankun.umijs.org/guide']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-wujie-startapp',
    title:'无界：startApp 用 WebComponent 容器加 iframe 沙箱',
    prompt:'已经上了 qiankun，为什么还要再了解无界？两者是不是同一个沙箱？',
    promptAnswer:'不是。无界用 Web Component 做样式容器、用 iframe 跑子应用脚本，和 qiankun 的 HTML entry 沙箱不是同一套实现。',
    core:'无界把子应用放到 iframe 里执行脚本，界面经 Web Component / Shadow DOM 挂到主应用容器，强调原生物理隔离与保活。主应用调用 startApp：name（唯一）、url（子应用地址）、el（容器）、可按文档打开 sync 等选项。子应用往往较少改入口，但通信、保活、销毁仍要按文档使用 bus 与销毁 API，不能假设「开箱后从未泄漏」。强隔离成本与 iframe 类似：通信与首屏要单独立账，见 mfe-perf-cost、mfe-iframe-postmessage。同栈要细粒度 shared 模块时，仍更适合 Federation，见 mfe-compare-matrix。',
    why:'把无界当成「更快的 qiankun」，结果既要 HTML entry 又要 iframe 双栈，问题定位时分不清脚本跑在哪一个 window。',
    example:'startApp({ name: "marketing", url: "https://m.example.com/campaign", el: document.getElementById("slot"), sync: true });。主应用切换菜单离开时按文档销毁或保活，不留下多余 iframe。',
    task:'写出 name、url、el。再写一句：脚本跑在 iframe 还是主 window。最后写出何时该选无界而不是 Federation。',
    answer:'startApp 三项对齐。脚本在 iframe，样式边界在 WebComponent。要强隔离或不便改子应用入口时选无界；要同栈模块共享时选 Federation。',
    keywords:'无界 wujie startApp WebComponent iframe',
    points:['startApp 需要唯一 name、url、容器 el','隔离模型是 WebComponent + iframe','与 qiankun HTML entry 不是同一沙箱'],
    deep:[
      {title:'保活',body:'保活能减少白屏，也会占住 iframe 与监听。离开产品区要有明确销毁策略。'},
      {title:'怎样自己验证',body:'挂载后检查页面里是否出现 iframe 与自定义元素。卸载后节点与监听应按文档释放。'}
    ],
    refs:[['无界：文档','https://wujie-micro.github.io/doc/'],['无界：GitHub','https://github.com/Tencent/wujie']]
  },
  {
    track:'frontend', group:'微前端', id:'mfe-iframe-postmessage',
    title:'iframe：独立文档嵌入，契约走 postMessage',
    prompt:'把第三方后台塞进 iframe 之后，直接读 iframe.contentWindow.user 可以吗？',
    promptAnswer:'不可以。跨源读窗体会被浏览器拦住。状态交接用 postMessage，并校验 event.origin。',
    core:'iframe 提供独立的 document 与 window，样式默认不穿透，适合不信任或不便改造的第三方页。主页用 iframe 的 src 指向子应用 URL；跨源时不能直接读子窗体的 DOM 或全局变量。双方用 window.postMessage 传消息，接收方校验 event.origin，必要时校验 source。约定消息形状：type、requestId、payload，超时与失败要有码。不要把 token 长期挂在可被任意脚本读的全局变量上，见 mfe-shared-auth。首屏多一次文档加载，性能账单独立算，见 mfe-perf-cost。',
    why:'同源时图省事直接调子页面函数，一换独立域名整段报错；或不校验 origin，任意站点都能 post 进主应用。',
    example:'主应用 iframe.src = "https://report.example.com/board"。子页加载后 postMessage({ type: "report/ready" }, "https://host.example.com")。主应用只接受 origin 为报表域的消息，再回传一次性票据。',
    task:'写出 iframe 的 src、两条消息的 type、以及接收方要校验的 origin。出现 contentWindow.xxx 直读就划掉。',
    answer:'src 指向子应用。消息带 type 与 origin 校验。划掉跨源直读 contentWindow。token 不进长期全局变量。',
    keywords:'iframe postMessage origin 微前端',
    points:['iframe 是独立文档，样式默认隔离','跨源通信用 postMessage 并校验 origin','直读跨源 contentWindow 不是可选捷径'],
    deep:[
      {title:'sandbox 属性',body:'需要时用 iframe sandbox 限制脚本与表单，放开项要逐个写明，不要一揽子允许。'},
      {title:'怎样自己验证',body:'用错误 origin 发消息，主应用不应处理。同源直读在改成跨源后应失败，证明不能依赖直读。'}
    ],
    refs:[['MDN：iframe','https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe'],['MDN：window.postMessage','https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage']]
  }
];

for (const {points, refs, map, ...lesson} of COVERAGE_FRONTEND_27) {
  const row = map ? {...lesson, map} : lesson;
  window.LESSONS.push(row);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
