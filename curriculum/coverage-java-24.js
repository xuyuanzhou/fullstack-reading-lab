/* Batch 24: thirty short sources — Vue VNode, miniprogram wx:if, JSON.stringify equality, Angular ngOnChanges, Dubbo cache. */
const COVERAGE_JAVA_24 = [
  {
    track:'frontend', group:'Vue', id:'vue-vnode-not-fragment',
    title:'Vue 的虚拟 DOM 不是 DocumentFragment',
    prompt:'为什么把 Vue 2 说成“用 createDocumentFragment 建虚拟 DOM 树，再用 defineProperty 完成全部响应式”会对不上源码？',
    core:'虚拟 DOM 是普通 JS 对象描述的 VNode 树，不是 document.createDocumentFragment()。Fragment 是真实 DOM 的轻量容器，偶尔用于插入节点，不是 diff 的数据结构。Vue 2 用 Object.defineProperty 劫持对象，数组要用变异方法；Vue 3 主路径是 Proxy，见 `vue-defineproperty-proxy`。key 用来稳定身份，index 在静态列表可用，插入删除会错位，见 `vue-list-key`。组件 data 必须是函数以免共享同一对象。$route 是当前记录，$router 是实例。渐进式是“可以只用视图层”，不是“全面不如 React/Angular”。',
    why:'把虚拟 DOM 说成 createDocumentFragment，diff 会拿真实 DOM 容器去比，内存里的 VNode 和页面节点对不上。区分信号是 h() 得到普通对象，挂载之后才有 Element。',
    example:'h(\'div\', { key: id }, children) 得到的是 VNode 对象。真正挂载才创造 Element。不要把 createDocumentFragment 写成这棵虚拟树，diff 比的是对象。',
    task:'对照 Vue 对 VNode 的说明，划掉 Fragment 就是虚拟 DOM；写出 data 必须是函数的原因。',
    answer:'对照 Vue 对 VNode 的说明，划掉“Fragment 就是虚拟 DOM”：虚拟 DOM 是 JS 对象描述的 VNode，DocumentFragment 是真实 DOM 的轻量容器。data 必须是函数，因为组件选项会被复用，每次返回新对象，实例才不会共享同一份状态。Vue 3 主路径是 Proxy。',
    keywords:'Vue VNode DocumentFragment defineProperty Proxy data',
    points:['虚拟 DOM 是 VNode 对象不是 DocumentFragment','Vue 2 用 defineProperty，Vue 3 主路径是 Proxy','组件 data 必须是工厂函数以免实例共享状态'],
    deep:[
      {title:'比的是对象树',body:'VNode 是普通对象，描述标签、属性和子节点。DocumentFragment 是浏览器里的真实节点容器，偶尔用来插入，不是 diff 的数据结构。组件的 data 如果写成对象，多个实例会共享它；写成函数，每次返回新对象。Vue 2 劫持用 defineProperty，Vue 3 主路径是 Proxy。'},
      {title:'怎样自己验证',body:'对照渲染机制说明，把“Fragment 就是虚拟 DOM”划掉，并确认 h() 的结果是对象，挂载后才有元素。再写两个组件实例，data 用函数各返回一份对象，改其中一个的字段，另一个不应跟着变。'},
    ],
    refs:[['Vue：Rendering Mechanism','https://vuejs.org/guide/extras/rendering-mechanism.html'],['Vue：data','https://vuejs.org/api/options-state.html#data']]
  },
  {
    track:'frontend', group:'浏览器', id:'miniprogram-wx-if-not-wxif',
    title:'小程序条件渲染是 wx:if，不是 wx-if，也没有 window',
    prompt:'为什么把小程序和 Vue 的差别写成“wx-if / 没有 body / getUserInfo 拿 unionId”会过时？',
    core:'WXML 用 `wx:if`、`wx:for`，冒号是指令前缀，不是 `wx-if`。逻辑层跑在 JSCore/V8，没有 DOM、window、document。WXSS 支持 rpx，选择器是子集；本地资源可以用，不是“图片只能外链”。app.json 是全局配置入口；app.js 可以几乎为空，但生命周期和全局数据写在这里。用户唯一标识现行是 wx.login 的 code 换 openid/unionid，getUserInfo 弹窗授权路径已废弃。双绑不是 v-model，要 bindinput 再 setData。',
    why:'把条件渲染写成 wx-if，工具里直接不生效；再用 getUserInfo 取 unionId，会走已废弃的授权，审核过不了。区分信号是指令前缀是冒号 wx:if，登录用 wx.login 的 code 去换身份。',
    example:'页面写 <view wx:if="{{ok}}"> 才会按条件渲染，写成 wx-if 不会生效。登录调用 wx.login，用返回的 code 换 openid 或 unionid，不要再调 getUserInfo。',
    task:'对照官方框架文档，写出条件渲染指令名；划掉 getUserInfo 拿 unionId。',
    answer:'对照官方框架文档，条件渲染指令名是 wx:if，冒号是指令前缀，不是 wx-if；列表是 wx:for。划掉 getUserInfo 拿 unionId：用户身份现行是 wx.login 的 code 去换 openid 或 unionid，旧的弹窗授权已经废弃。逻辑层没有 window 和 document。',
    keywords:'微信小程序 wx:if WXML rpx wx.login',
    points:['条件渲染是 wx:if 不是 wx-if','逻辑层没有 window/document','用户身份走 wx.login，getUserInfo 登录已废弃'],
    deep:[
      {title:'冒号才是指令',body:'wx:if 和 wx:for 的冒号是 WXML 指令前缀，写成 wx-if 不会被当成条件。逻辑层跑在 JSCore 或 V8 里，没有 window 和 document，不能按浏览器页面去找 body。身份用 wx.login 拿到 code，再换 openid 或 unionid；getUserInfo 那条弹窗授权已经废弃。'},
      {title:'怎样自己验证',body:'对照 WXML 文档写出条件渲染的指令名，应是 wx:if，并把 wx-if 划掉。再打开登录文档，确认身份来自 wx.login 的 code，而不是 getUserInfo 里的 unionId。'},
    ],
    refs:[['微信小程序：WXML','https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/'],['微信小程序：登录','https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-json-stringify-not-equal',
    title:'JSON.stringify 比不出两个对象是否相等',
    prompt:'为什么用 JSON.stringify(a)===JSON.stringify(b) 判断对象相等会漏 NaN、undefined 和键顺序？',
    core:'JSON 会丢掉 undefined、函数、symbol，NaN 和 Infinity 会变成 null，键顺序取决于枚举顺序，循环引用会抛错。看起来相等的对象可以一个键在前一个在后、或一边有 undefined。对象相等要看同一引用，或按业务字段逐项比，或用支持 NaN 的深比较。class 语法是原型继承的糖，`Object.create` 能做委托，但不能说 class 没意义。`==` 与 `===` 仍见 `js-equality`。',
    why:'单测里用 JSON.stringify 当深比较，键顺序一变就误报不相等，一边多了 undefined 又会误报相等。区分信号是 undefined 被丢掉、NaN 变成 null，字符串相同不等于对象相同。',
    example:'{a:1, b:undefined} 和 {a:1} 经 stringify 后都只剩下 a，会被当成相等。{a:1, b:1} 和 {b:1, a:1} 人眼字段相同，字符串却可能因为键序不同而不等。',
    task:'写出 stringify 会改写的三类值；给一对“人眼相等但 stringify 不相等”的对象。',
    answer:'stringify 会改写的三类值是：丢掉 undefined、函数和 symbol；把 NaN 与 Infinity 写成 null；键按枚举顺序输出，所以顺序变了字符串就变。人眼相等但 stringify 可能不等的一对是 {a:1, b:1} 和 {b:1, a:1}。对象是否相等要看同一引用，或按业务字段逐项比。',
    keywords:'JSON.stringify 深比较 NaN undefined class',
    points:['stringify 丢 undefined、改写 NaN、依赖键序','对象相等不是字符串相等','class 是原型语法糖，不是没用'],
    deep:[
      {title:'字符串相同不是对象相同',body:'stringify 会丢掉 undefined、函数和 symbol，把 NaN 和 Infinity 写成 null，键的先后跟枚举顺序走。一边多一个 undefined 字段，字符串可以和没有该字段的对象一样。两个字段相同、键顺序相反的对象，字符串又可能不同。循环引用还会直接抛错。'},
      {title:'怎样自己验证',body:'先写出会被改写的三类：undefined、NaN、键顺序。再对 {a:1, b:1} 和 {b:1, a:1} 各 stringify 一次，人眼字段相同但字符串可能不等。相等判断改成同一引用，或按字段逐项比。'},
    ],
    refs:[['MDN：JSON.stringify','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify'],['MDN：Classes','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes']]
  },
  {
    track:'frontend', group:'工程实践', id:'angular-ngonchanges-primitives',
    title:'ngOnChanges 不单是引用变了才跑，也不是整棵树每次必脏检查（Angular v21）',
    prompt:'为什么把 ngOnChanges 说成“只有对象引用变化才触发”，又把 Angular 2+ 说成每次从根脏检查整棵树？',
    core:'ngOnChanges 在输入绑定变化时调用，第一次一定在 ngOnInit 之前。输入是基本类型时，值变就会进 SimpleChanges；对象要引用变才会当输入变了，这是绑定的比较方式，不是钩子自己忽略深变化。OnPush 可以让子树在输入引用不变时跳过检查。新应用从 **Angular v21** 起默认不再带 zone.js，更新靠信号和模板事件安排检查，见 fe-angular-first-party。已有工程仍可能留着 Zone。两种都不是 AngularJS 的 `$digest` 队列。`[(ngModel)]` 是属性绑定加事件绑定的语法糖。指令分组件、属性指令、结构指令，这点资料方向对。',
    why:'把 ngOnChanges 说成只有对象引用变化才触发，number 从 1 改到 2 会以为钩子坏了；再把检查说成每次从根扫整棵树，OnPush 跳过子树就会被漏掉。区分信号是基本类型按值比较，OnPush 看输入引用。',
    example:'@Input() id: number 从 1 到 2 会触发 ngOnChanges。@Input() user 只改 user.name 不换对象则钩子不来，要 OnPush+不可变或自己 ngDoCheck。',
    task:'对照生命周期文档，写出首次 ngOnChanges 相对 ngOnInit 的顺序；说明 OnPush 何时跳过。',
    answer:'对照生命周期文档，首次 ngOnChanges 一定在 ngOnInit 之前，第一次绑定就会进钩子。基本类型输入按值变化也会进入 SimpleChanges，不是只有换了对象引用才触发。OnPush 在输入引用不变时跳过该子树的检查，所以不是每次从根把整棵树都脏检查一遍。',
    keywords:'Angular ngOnChanges OnPush SimpleChanges Zone',
    points:['首次 ngOnChanges 在 ngOnInit 之前','基本类型输入按值，对象输入按引用','OnPush 不会每次从根扫整棵树'],
    deep:[
      {title:'值和引用分开比',body:'输入绑定变化时才调用 ngOnChanges，第一次一定在 ngOnInit 之前。number 从 1 到 2 是值变了，会进 SimpleChanges。对象只改里面的字段、不换引用，绑定认为输入没变，钩子不来。OnPush 则在输入引用不变时整棵子树都可以跳过，不是每次从根扫到叶。'},
      {title:'怎样自己验证',body:'对照生命周期文档，写出首次 ngOnChanges 在 ngOnInit 之前。把一个 number 输入从 1 改到 2，钩子应进来。再打开 OnPush：输入对象引用不变时，该子树应跳过检查。'},
    ],
    refs:[['Angular：Lifecycle','https://angular.dev/guide/components/lifecycle'],['Angular：Skipping subtree checks','https://angular.dev/guide/components/skipping-subtrees']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'dubbo-registry-down-local-cache',
    title:'注册中心全挂后，旧地址还能调，新服务调不到',
    prompt:'为什么说“ZooKeeper 全挂了 Dubbo 就全部不能通信”或反过来“挂了还能无限发现新服务”都会错？',
    core:'消费者启动时把提供者地址拉到本地。注册中心全部宕机后，已缓存的调用还可以按本地列表走；新增的提供者或新订阅的服务不会再出现。提供者无状态时挂一台无妨，全部挂掉则消费者只能重连等待。这不是注册中心对等集群的替代品：集群是为了注册本身高可用。Token 防绕过注册中心直连、黑白名单是额外的访问控制。负载均衡仍在客户端，默认 random。',
    why:'把注册中心当成调用的数据面，ZK 维护时会误杀还在本地列表里的全部流量；反过来以为本地缓存能发现新服务，第四台扩容会一直调不到，流量也扩不出去。区分信号是缓存只保住已经订阅的地址。',
    example:'三个提供者已经在本地列表里，ZooKeeper 维护期间仍可按这个列表调用，新地址不会凭空出现。第四台刚上线的实例，或一个从未订阅过的服务，要等注册中心恢复之后才会被看见。负载均衡仍在客户端，默认是随机。',
    task:'写出全挂后还能做什么、做不了什么；对照默认 RandomLoadBalance。',
    answer:'注册中心全部宕机后，还能做的是按消费者本地已经缓存的提供者地址继续调用。做不了的是发现新上线的提供者，或订阅一个之前没有拉过的服务。对照默认 RandomLoadBalance：负载均衡在客户端，在这份本地列表里随机挑选，不会改到服务端去做均衡。',
    keywords:'Dubbo ZooKeeper 本地缓存 注册中心 RandomLoadBalance',
    points:['消费者本地缓存已订阅的地址','注册中心全挂后不能发现新服务','负载均衡在客户端，默认随机'],
    deep:[
      {title:'缓存不是发现',body:'消费者启动时把已经订阅的提供者地址拉到本地。注册中心全挂之后，这份列表还能继续用，所以旧调用不必停。新上线的提供者、以及从未订阅过的服务，列表里没有，也就调不到。这不能代替注册中心自己的集群：集群是为了注册还在，缓存只是订阅结果的副本。'},
      {title:'怎样自己验证',body:'写下全挂后还能做的事：按本地列表调用已有提供者。再写下做不了的事：看见第四台新实例，或订阅新服务。对照 RandomLoadBalance，确认随机发生在客户端的这份列表上，而不是服务端。'},
    ],
    refs:[['Dubbo：Registry','https://dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/registry/overview/'],['Dubbo：Load Balance','https://dubbo.apache.org/zh-cn/overview/mannual/java-sdk/reference-manual/loadbalance/intro/']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_24) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
