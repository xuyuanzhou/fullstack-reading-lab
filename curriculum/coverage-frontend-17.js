/* Frontend 17: uni-app / uni-app x and Taro 4, from current official docs. */
const COVERAGE_FRONTEND_17 = [
  {
    track:'frontend', group:'UniApp 与 Taro', id:'uniapp-x-uts-not-vue-page',
    title:'uni-app x 用 uts 和 uvue，旧的 vue 页面进不去',
    prompt:'为什么把现有 uni-app 工程的编译目标改成 Android，原来的 .vue 页面却编译不过？',
    promptAnswer:'uni-app 继续用 Vue 3 的 .vue。uni-app x 只认 .uvue 和 uts：Android 产物是 Kotlin，iOS 是 Swift，鸿蒙 Next 是 ArkTS，Web 和小程序才是 JavaScript。',
    core:'这是两个工程，不是同一个 Vue 工程上的开关。uni-app 的页面是 .vue，新项目在 manifest.json 根上写 vueVersion 为 3，运行时仍是 Vue。uni-app x 的页面是 .uvue，脚本是 uts。编译器按目标端出不同语言：Web 和小程序出 JavaScript，Android 出 Kotlin，iOS 出 Swift，鸿蒙 Next 出 ArkTS。Android 端没有内置 JS 引擎，所以同一份 uni-app x 工程不能把旧的 .vue 丢进去继续跑 Vue。条件编译用 UNI-APP-X 区分，这个宏只在 uni-app x 工程里成立，不是运行时去探测。小程序侧官方写明微信从 HBuilderX 4.41 起、支付宝从 5.31 起，其他小程序还在适配。蒸汽模式从 2026 年起按平台替换旧的 VDOM，鸿蒙和 iOS 已有版本线，不要写成所有端都已经换成蒸汽模式。',
    why:'把 uni-app x 当成「勾上就能把现有 Vue 打成原生」。Android 编译要的是 uts 编出来的 Kotlin，旧页面仍是 Vue 运行时才能执行的 .vue，两边对不上。',
    example:'订单页在 uni-app 里是 pages/order/order.vue，script 里用 ref。迁到 uni-app x 要改成同路径的 .uvue，脚本用 uts。选 Android 编译，产物侧是 Kotlin，包里没有一份仍在跑的 Vue。微信小程序产物仍是 js、wxml、wxss、json，因为这一端 uts 编成的是 JavaScript。',
    task:'先看页面后缀和 manifest 的 vueVersion。若目标是已有的 Vue 小程序或 H5，留在 uni-app。若目标是 Android 上的 Kotlin，单独开 uni-app x，把页面改成 uvue 再编，确认产物里出现的是 Kotlin 而不是原样的 .vue。',
    answer:'uni-app 继续用 Vue 3 的 .vue。uni-app x 只认 .uvue 和 uts：Android 产物是 Kotlin，iOS 是 Swift，鸿蒙 Next 是 ArkTS，Web 和小程序才是 JavaScript。旧 .vue 不能放进同一个 uni-app x 工程在 Android 上跑。小程序以微信 4.41、支付宝 5.31 的官方支持为准。蒸汽模式按平台落地，不是已经全端替换。',
    keywords:'uni-app uni-app x uts uvue vueVersion UNI-APP-X',
    points:['uni-app 新项目用 Vue 3 的 vue 页面，uni-app x 用 uvue 和 uts','uts 在 Web 和小程序编成 JS，Android 编成 Kotlin，iOS 编成 Swift，鸿蒙 Next 编成 ArkTS','Android 没有内置 JS 引擎，旧 vue 页面不能直接混进 uni-app x'],
    deep:[
      {title:'和导论',body:'uni-app / Taro 是什么、两条编译层见 uniapp-what-it-is、taro-what-it-is、uniapp-taro-not-same-runtime。本课专讲 uni-app x 与旧 vue 页的边界。'},
      {title:'两套项目用条件编译分开',body:'UNI-APP-X 只在 uni-app x 工程里成立。想在源码里区分，用这个宏，而不是在运行时探测「是不是 x」。Web 和小程序上 uts 会变成 JS，所以那边仍能调用该端的 JS API。'},
      {title:'怎样自己验证',body:'打开 manifest，确认 Vue 工程的 vueVersion 是 3，页面后缀是 vue。再打开 uni-app x 工程，页面后缀应是 uvue。选 Android 编译，产物侧应出现 Kotlin，而不是把原 .vue 原样打进包里。'}
    ],
    refs:[['uni-app x 编译器','https://doc.dcloud.net.cn/uni-app-x/compiler/'],['uni-app：条件编译','https://uniapp.dcloud.net.cn/tutorial/platform.html']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'uniapp-pages-json-entry',
    title:'uni-app 的页面登记在 pages.json，第一项才是启动页',
    prompt:'为什么订单页文件已经在磁盘上，冷启动和分享卡片都进不去？',
    promptAnswer:'冷启动进 pages 第一项。navigateTo 的 url 必须是已登记路径，形如 /pages/order/order?id=42，query 的值是字符串。',
    core:'路由表是 pages.json 的 pages 数组，不是文件系统，也不是另装的 vue-router。每一项的 path 不带后缀，例如 pages/order/order。数组第一项是冷启动页。uni.navigateTo 的 url 要写成 /pages/order/order?id=42，前导斜杠加上和 path 一致的路径；问号后面的值到了 onLoad 都是字符串，42 会变成 "42"。没写进 pages 的 url，这次跳转打不开页面。应用级 onPageNotFound 不是给这种 API 跳未登记路径用的。tabBar.list 里的页面只能用 uni.switchTab，url 不能再带 query；对 tab 页调用 navigateTo 不会把它打开。微信上 navigateTo 的页面栈最多 10 层，再 push 会失败，这时要 redirectTo 或先返回。只在一个平台存在的页，用 pages.json 里的条件编译裁掉，其他端的清单里就没有这一项。',
    why:'文件在，数组里没有，启动和跳转都按清单找。第一项写成了订单页，冷启动就会进订单而不是首页。用 navigateTo 去开 tab 页，失败原因在 API 和 tabBar 的对应关系，不在组件有没有导出。',
    example:'pages 第一项是 pages/index/index，后面才是 pages/order/order。首页按钮调用 uni.navigateTo({ url: "/pages/order/order?id=42" })。订单页 onLoad 读到的 query.id 是字符串 42。底部「首页」在 tabBar.list 里，返回首页要 uni.switchTab({ url: "/pages/index/index" })，不能 navigateTo，也不能在这条 url 上拼筛选条件。',
    task:'冷启动一次，确认落到 pages 第一项。用带 query 的 navigateTo 打开订单页，在 onLoad 里打印 id 的类型。再对一个 tabBar 页面调用 navigateTo，确认打不开，改成 switchTab。',
    answer:'冷启动进 pages 第一项。navigateTo 的 url 必须是已登记路径，形如 /pages/order/order?id=42，query 的值是字符串。未登记的路径打不开，onPageNotFound 不承接这种 API 跳转。tabBar 页面用 switchTab，而且这条 url 不带 query。微信页面栈超过 10 层时 navigateTo 会失败。平台专属页在 pages.json 里条件编译裁掉。',
    keywords:'uni-app pages.json navigateTo switchTab 启动页',
    points:['页面必须写进 pages.json，第一项是冷启动页','navigateTo 的 url 带前导斜杠，query 到 onLoad 时是字符串','tabBar 页面用 switchTab，不能用 navigateTo，也不能在这条 url 上带 query'],
    deep:[
      {title:'四种跳转改的栈不一样',body:'navigateTo 保留当前页并压入新页，当前页会 onHide。redirectTo 关掉当前页再打开。reLaunch 关掉全部再打开。switchTab 只能跳 tabBar 里的页，并关掉非 tab 页。页面打不开时先看它在 pages 里还是在 tabBar.list 里，再选这四个 API。'},
      {title:'怎样自己验证',body:'把第一项换成订单页，冷启动应进入订单。删掉订单登记后再 navigateTo，应打不开。对 tab 页 navigateTo 应失败，switchTab 应成功且 query 带不过去。连续 navigateTo 到第 11 层，微信上应失败。'}
    ],
    refs:[['uni-app：pages.json','https://uniapp.dcloud.net.cn/collocation/pages.html'],['uni-app：页面','https://uniapp.dcloud.net.cn/tutorial/page.html']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'uniapp-onload-vs-onshow',
    title:'onLoad 只在加载时收参，返回页面走的是 onShow',
    prompt:'为什么订单 id 只在第一次进来时打印得出来，从详情返回后列表仍是离开前的数据？',
    promptAnswer:'返回后列表 onLoad 和 onMounted 仍是 1，onShow 加 1，刷新请求应放在 onShow。',
    core:'Vue 3 的页面钩子从 @dcloudio/uni-app 导入，写在页面的 script setup 或 setup 里。一次「列表进详情再返回」的顺序是：列表 onLoad(query) 一次，接着 onShow，初次渲染完是 onReady；跳走时列表 onHide；详情再走自己的 onLoad、onShow、onReady；返回并卸载详情后，列表只再走 onShow。onLoad 的 query 每个值都是字符串，onShow 不再收这份 query。onMounted 是 Vue 挂载，返回已经创建过的页面实例不会再挂载。写在子组件上的 onLoad、onShow 不会按页面生命周期执行。子组件要听页面再次出现，用 onPageShow、onPageHide，避免和页面的 onShow 重名。应用的 onLaunch、应用级 onShow 只在 App.vue 里监听，应用进前台不是某一个页面的 onShow。不要依赖 created 和 onLoad 谁先谁后。',
    why:'把重新请求写在 onLoad 或 onMounted，返回时这两个次数仍是 1，列表继续显示离开前的数组。去改详情页的返回参数，列表根本没再读。',
    example:'列表页 onLoad 里保存 query.status。请求写在 onShow。进入详情再返回：onLoad 仍是 1，onShow 变成 2，请求再发出。筛选条件用 onLoad 存下来的那个字符串，不要等 onShow 再传一次。弹层写在子组件里，返回时用 onPageShow 收起。',
    task:'列表和详情各打印 onLoad、onShow、onMounted。从详情返回，记下列表这三个次数。把请求从 onLoad 挪到 onShow，确认返回后网络请求再走一次，且 onLoad 的次数不变。',
    answer:'返回后列表 onLoad 和 onMounted 仍是 1，onShow 加 1，刷新请求应放在 onShow。query 只在 onLoad 的参数里，而且是字符串，onShow 不会再带这份 query。子组件用 onPageShow。应用 onLaunch 和应用级 onShow 只写在 App.vue。页面钩子写在子组件上不会跟着页面加载执行。',
    keywords:'uni-app onLoad onShow onPageShow @dcloudio/uni-app',
    points:['页面钩子从 @dcloudio/uni-app 导入，写在页面里才按页面执行','onLoad 收一次字符串 query，返回只再走 onShow','子组件用 onPageShow，应用钩子只在 App.vue'],
    deep:[
      {title:'页面实例还在，所以不会重新挂载',body:'navigateTo 把列表留在栈里，只是 onHide。返回时实例还是原来那个，Vue 不会再 onMounted，uni-app 也不会再 onLoad。要刷新，就在再次 onShow 时用已经存下的 query 重新请求。'},
      {title:'怎样自己验证',body:'从详情返回，列表 onShow 的计数加一，onLoad 仍是 1，onMounted 仍是 1。子组件里的 onPageShow 应执行；把 onShow 写进子组件，不应当成页面显示。App.vue 的 onShow 在应用进前台时执行，不要和页面 onShow 记成同一次。'}
    ],
    refs:[['uni-app：页面','https://uniapp.dcloud.net.cn/tutorial/page.html'],['uni-app：Vue3 组合式 API','https://uniapp.dcloud.net.cn/tutorial/vue3-composition-api.html']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'uniapp-ifdef-stripped',
    title:'#ifdef 在编译期裁掉，不是运行时的 if',
    prompt:'为什么微信登录写在判断里，H5 产物搜得到 wx.login，一运行就报这个对象不存在？',
    promptAnswer:'编译期宏做完之后，微信产物只有 MP-WEIXIN 那段，H5 产物只有 WEB 那段，另一段连标识符都没有。',
    core:'#ifdef、#ifndef、#endif 由编译器在出包前删除，不是运行到 if 再跳过。写法必须单独成行，而且注释形式跟着文件：脚本里是 // #ifdef MP-WEIXIN，模板里是 <!-- #ifdef MP-WEIXIN -->，样式里是 /* #ifdef MP-WEIXIN */。被裁掉的那一段连同标记都不会出现在另一端的产物里。所以 H5 包中应搜不到 wx.login。用 if (平台) 包住同一次调用，函数体仍会打进 H5，运行时才发现没有这个对象。WEB 是现行的 Web 平台值（HBuilderX 3.6.3 起），H5 仍表示同一端。VUE3 要在 manifest.json 根上把 vueVersion 配成 3 才成立。pages.json 里的条件编译也在编译期生效，代码里导入 pages.json 得到的是裁完之后的对象。各端都要执行的请求留在宏外面。',
    why:'运行时 if 只是不调用，包里仍有 wx.login，H5 一执行这条路径就抛错。再去 polyfill 一个 wx，是把不该进这个包的调用留了下来。',
    example:'登录按钮两段并列：// #ifdef MP-WEIXIN 里调用 wx.login，// #ifdef WEB 里走浏览器登录，中间用 // #endif 关上。下单请求写在两段外面。编译 H5 后全文搜索 wx.login 应没有命中；编译微信后应能命中，并且搜不到浏览器那段。',
    task:'按脚本的注释形式写两段宏，分别编译微信和 H5。在两个产物里搜索 wx.login 和浏览器登录各出现几次。再改成运行时 if，确认 H5 产物里仍能搜到 wx.login。',
    answer:'编译期宏做完之后，微信产物只有 MP-WEIXIN 那段，H5 产物只有 WEB 那段，另一段连标识符都没有。运行时 if 两端都还带着函数体。脚本、模板、样式的注释形式不同，宏要单独成行。VUE3 取决于 manifest 根上的 vueVersion 为 3。导入的 pages.json 已是当前端裁完的结果。',
    keywords:'uni-app ifdef MP-WEIXIN WEB 条件编译 vueVersion',
    points:['#ifdef 在编译期删除其他端的源码，产物里没有那段调用','脚本、模板、样式的注释形式不同，宏必须单独成行','WEB 是现行 Web 平台值，VUE3 依赖 manifest 里的 vueVersion'],
    deep:[
      {title:'和运行时分支的差别',body:'运行时 if 两端都会带上函数体，只是不执行。条件编译是这一端的包里根本没有另一次调用，包体积和「这端有没有这个 API」都由裁剪决定。'},
      {title:'怎样自己验证',body:'H5 产物搜 wx.login 应为 0 次，微信产物应大于 0。把宏写成行内接在代码后面，裁剪会失效，两端产物都会留下调用。交换 MP-WEIXIN 和 WEB 后再编译，两次调用应换到对面的产物。'}
    ],
    refs:[['uni-app：条件编译','https://uniapp.dcloud.net.cn/tutorial/platform.html'],['uni-app：迁移到 Vue 3','https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'taro-react-setdata-bridge',
    title:'Taro 跑的是真 React，小程序界面仍靠 setData',
    prompt:'为什么 setState 已经返回，滚动区却要再等一拍才换上新列表？',
    promptAnswer:'setState 先改逻辑层的模拟 DOM。界面要等序列化结果 setData 到视图层，静态模板才画出新节点。',
    core:'Taro 3 起在小程序逻辑层模拟 DOM 和 BOM。React 通过 @tarojs/react 的自定义渲染器提交到这棵模拟树上，不是 ReactDOM，也不是直接改小程序的渲染层节点。视图层的 wxml 是编译期写好的静态模板。一次更新的顺序是：setState 触发渲染，协调器改模拟树，Taro 把变更序列化，再 setData 到视图层，模板按这份数据把节点画出来。所以 setState 返回时，屏幕上还可以是旧列表。createSelectorQuery 读的是渲染层节点，要等页面 onReady 之后；写在首次 useEffect 里，逻辑层已经提交，渲染层节点仍可能查不到。组件从 @tarojs/components 引入 View、Text。View 上的 onClick 会编成小程序的 bindtap，回调在逻辑层执行，事件里的 detail 和 dataset 从视图层传回，不是浏览器里那个带 offsetWidth 的 DOM 事件。频繁更新的一块用 CustomWrapper 包住，setData 的范围收在这个包装里，而不是整页数据都过桥。',
    why:'按浏览器的成本每帧替换一大段数组，setData 载荷变大，滑动掉帧。在首次 effect 里立刻做选择器查询，会以为节点没渲染，其实是查询早于 onReady。',
    example:'列表 setState 换成一千条的新数组。React 在逻辑层很快提交完，视图要等这次 setData 把序列化结果送到模板。把只变的那一项收进 CustomWrapper 再更新，过桥的数据变少。同一页在 onReady 之前调用 createSelectorQuery，拿不到渲染层节点；挪到 onReady 之后再查，才能拿到。',
    task:'对比整表替换和只改一项的卡顿。把 createSelectorQuery 从首次 useEffect 挪到页面 onReady，确认只有后者能取到节点。再看模板是编译好的 wxml，而不是运行时拼出来的 HTML。',
    answer:'setState 先改逻辑层的模拟 DOM。界面要等序列化结果 setData 到视图层，静态模板才画出新节点。选择器查询等 onReady，查的是渲染层，不是模拟树上的对象。标签用 @tarojs/components。onClick 变成 bindtap，回调在逻辑层，不能把事件目标当成 DOM 去读尺寸。大块频繁更新用 CustomWrapper 收窄 setData 的范围。',
    keywords:'Taro React setData @tarojs/react onReady CustomWrapper',
    points:['React 提交到逻辑层的模拟 DOM，渲染器不是 ReactDOM','界面要等 setData 把序列化结果交到静态模板','选择器查询等 onReady，读的是渲染层节点'],
    deep:[
      {title:'两棵树不是同一个对象',body:'逻辑层那棵树给 React 协调器用。小程序 API 要的是渲染层节点，拿不到模拟节点上的字段。dataset 按模板准备，不是浏览器 Dataset 的原样。'},
      {title:'怎样自己验证',body:'在 setState 的下一行读界面，应仍可能是旧列表；放到 setData 完成之后再读，应是新列表。createSelectorQuery 放在首次 effect 应取不到，放在 onReady 之后应取到。包上 CustomWrapper 后，同一次小更新不应再把整页数据都送过桥。'}
    ],
    refs:[['Taro：React 总体','https://docs.taro.zone/docs/react-overall'],['Taro：实现原理','https://docs.taro.zone/docs/implement-note']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'taro-pages-in-app-config',
    title:'Taro 的页面在 app.config 的 pages 里，第一项是首页',
    prompt:'为什么订单组件已经 export，小程序里仍然没有 /pages/order/order 这条路由？',
    promptAnswer:'没写进 pages 的组件不是页面，第一项才是冷启动首页。url 形如 /pages/order/order?id=42。',
    core:'全局配置是 app.config，Taro 3.4 起用 defineAppConfig 包起来才能拿到类型提示。pages 是必填字符串数组，项里不写文件后缀，第一项是冷启动首页。组件文件在 src/pages 下却没写进这个数组，就不会变成页面。跳转是 Taro.navigateTo({ url: "/pages/order/order?id=42" })，不是 React Router 的 history，也没有 href。路由参数在函数组件的 useLoad 入参里，从 @tarojs/taro 导入，值是字符串。页面再次出现用 useDidShow，隐藏用 useDidHide；类组件才是 componentDidShow 和 componentDidHide。useDidShow 表示页面又显示了，不要把它当成会再送一次页面 query 的 onLoad。类组件和函数组件都不要把「返回后刷新」写进只在挂载时执行的逻辑。多端差异用编译期替换的 process.env.TARO_ENV，打微信时它是 weapp。app.config 不支持 app.weapp.ts 这种按端拆文件名；平台后缀用于普通源码文件，不用于这份全局配置。',
    why:'只新建了目录，pages 没改，启动和跳转都不会进入它。返回后的请求写在 useLoad 或挂载里，从下一页回来不会再跑，因为页面实例还在栈上。',
    example:'defineAppConfig 里 pages 第一项是 pages/index/index，后面是 pages/order/order。首页调用 Taro.navigateTo 打开 /pages/order/order?id=42。订单页 useLoad 打印的 id 是字符串。从订单返回首页，首页的 useDidShow 再执行一次，useLoad 不执行。微信专用分支看编译进包里的 TARO_ENV 是否为 weapp。',
    task:'把订单路径从 pages 去掉再编译，确认入口消失。加回并放到第一项，冷启动应进入订单。从子页返回，数 useDidShow 是否加一、useLoad 是否仍为 1。',
    answer:'没写进 pages 的组件不是页面，第一项才是冷启动首页。url 形如 /pages/order/order?id=42。函数组件用 useLoad 接字符串参数，返回刷新写在 useDidShow，不要等它再带一次 query。类组件对应 componentDidShow。端差异用编译期的 TARO_ENV，不要拆一个 app.weapp.ts 指望全局配置按端生效。',
    keywords:'Taro app.config defineAppConfig useLoad useDidShow TARO_ENV',
    points:['pages 必填且不写后缀，第一项是冷启动首页','跳转用 Taro.navigateTo，参数在 useLoad 里是字符串','返回时走 useDidShow，端差异用编译期的 TARO_ENV'],
    deep:[
      {title:'配置在编译期就定下',body:'pages 决定哪些文件会变成小程序页面。TARO_ENV 在编译时被替换成 weapp、h5 等字面量，打完包再改这个变量，不会把另一端的页面补进去。tabBar.list 里点名的页面也必须出现在 pages 里。'},
      {title:'怎样自己验证',body:'去掉订单路径后，navigateTo 应打不开。把它放到第一项，冷启动应进入订单。返回时 useDidShow 计数加一，useLoad 仍为 1。在产物里搜索 TARO_ENV，应看到被替换后的端名称，而不是运行时还能改的变量。'}
    ],
    refs:[['Taro：全局配置','https://docs.taro.zone/docs/app-config'],['Taro：Hooks','https://docs.taro.zone/docs/hooks']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'taro-4-compiler-choice',
    title:'Taro 4 可选 webpack5 或 Vite，小程序产物仍是四件套',
    prompt:'为什么 compiler 改成 vite 之后，微信开发者工具仍要等整包，而不是浏览器那种换一个模块？',
    promptAnswer:'Taro 4 的 framework 决定 React 还是 Vue 3，compiler 决定 webpack5 还是 Vite。',
    core:'现行主线是 Taro 4，不要把补丁版本写死。framework 和 compiler 是两项：framework 选 react、vue3、preact 等，决定你写哪种组件；compiler 选 webpack5 或 vite，决定用哪条打包链。小程序不能从网络按需加载业务 JS，所以即使用 Vite，打 weapp 仍是一次打包，产物还是该页的 js、模板、样式和 json 四件套。Vite 开发服务器那种原生 ESM 主要出现在 H5。样式按设计稿宽度换算，官方示例的 designWidth 是 750：源码里写的尺寸相对这条设计稿，不是浏览器里未换算的 CSS 像素。换 Vite 不会换成浏览器 DOM，逻辑层模拟树再 setData 的那条路还在，见 taro-react-setdata-bridge。Taro 1、2 以 Nerv 为主的写法不是新项目的入口。',
    why:'以为选了 Vite，预览就会按单个模块热替换进小程序。小程序 IDE 打开的仍是整包，等待时间在编译和预览，不在浏览器的 ESM。',
    example:'配置里 framework 是 react，compiler 是 vite，目标是 weapp。dist 里一个页面目录同时有 js、wxml、wxss、json。同一配置打 h5，开发时才是 Vite 服务打开的网页。源码里按 750 宽写的尺寸，换算后才是设备上的长度。',
    task:'读出 framework 和 compiler。打 weapp，确认一个页面目录是四件套，并且没有按需从网络加载的业务模块。再打 h5，确认打开的是网页开发服务器。',
    answer:'Taro 4 的 framework 决定 React 还是 Vue 3，compiler 决定 webpack5 还是 Vite。小程序产物仍是 js、模板、样式、json 的整包，Vite 在这里是打包器。原生 ESM 的开发体验主要在 H5。designWidth 按官方示例是 750。新项目不再从 Nerv 那代写法起步。',
    keywords:'Taro 4 compiler vite webpack5 designWidth framework',
    points:['framework 和 compiler 是两项，Taro 4 的编译器是 webpack5 或 vite','小程序产物仍是 js、模板、样式和 json，Vite 在这里是整包打包','designWidth 官方示例是 750，Vite 开发服务器主要用于 H5'],
    deep:[
      {title:'换编译器不换运行时',body:'compiler 只影响怎么打出那个包。打到微信后，页面仍由逻辑层的 React 或 Vue 更新模拟树，再 setData 给模板。不会因为用了 Vite 就变成浏览器文档。'},
      {title:'怎样自己验证',body:'编译 weapp 后打开 dist 的一个页面目录，应同时有脚本、模板、样式、json。启动 h5，地址应是网页开发服务器，而不是小程序模拟器。在配置里应能分别指出 framework 和 compiler，两者不要写成同一个字段。'}
    ],
    refs:[['Taro：编译配置','https://docs.taro.zone/docs/config'],['Taro：实现原理','https://docs.taro.zone/docs/implement-note']]
  },
  {
    track:'frontend', group:'UniApp 与 Taro', id:'taro-and-uniapp-layers',
    title:'uni-app 改的是 Vue 数据，Taro 改的是模拟 DOM 再 setData',
    prompt:'为什么两个都能进微信，返回后列表不刷新时却要打开不同的文件？',
    promptAnswer:'打不开先看 pages.json 或 app.config，url 必须已经登记。',
    core:'先分两层：页面打不打得开，看登记；界面更不更新，看数据怎么交到模板。打不开时，uni-app 打开 pages.json 的 pages，Taro 打开 app.config 的 pages，第一项都是冷启动页，没登记的 url 不会变成页面。返回后不刷新时，uni-app 的页面实例还在，onLoad 不会再走，请求要放在 onShow，query 用第一次 onLoad 存下的字符串。Taro 函数组件同样是 useLoad 只走一次，返回时走 useDidShow；而且 setState 改完模拟树之后，还要等这次 setData 把序列化结果送到 wxml，setState 的下一行还不能当成屏幕已更新。平台专有 API：uni-app 用单独成行的 #ifdef 在编译期裁掉，Taro 用编译期写死的 TARO_ENV。要在 Android 上编成 Kotlin，那是另一个 uni-app x 工程的 uvue 和 uts，不是把 Taro 的 React 树或旧的 .vue 放进同一个包。',
    why:'在 Taro 里按 uni-app 的 onLoad 找参数，或在 uni-app 里按 setData 查为什么没重绘，查到的是另一套框架的层，所以改完仍不刷新。',
    example:'同一个「从详情返回列表仍是旧数据」。uni-app：onLoad 次数保持 1，把请求挪到 onShow 后次数变 2，列表更新。Taro：useLoad 保持 1，useDidShow 变 2，并且要等 setData 把新数组交到模板，列表才换。页面 404：两边都是页面数组里没有这条 path，不是组件文件没保存。',
    task:'写「打不开」和「返回不刷新」两个症状。每个症状下面写出 uni-app 和 Taro 先打开的文件、钩子，以及 Taro 在钩子之外还要等的那一次传输。',
    answer:'打不开先看 pages.json 或 app.config，url 必须已经登记。返回不刷新：uni-app 看 onShow 有没有用第一次 onLoad 的字符串 query 重新请求；Taro 看 useDidShow，还要看这次数据有没有 setData 到模板。专有 API 分别用 #ifdef 和 TARO_ENV 在编译期分开。Android 上要 Kotlin 时另开 uni-app x，不把两套页面文件放进同一个工程。',
    keywords:'uni-app Taro pages.json app.config setData onShow useDidShow',
    points:['打不开先看两边的页面数组，第一项是冷启动页','返回不刷新时 uni-app 看 onShow，Taro 看 useDidShow 以及 setData','编成 Android 的 Kotlin 是 uni-app x 的 uts，不和 Taro 的 React 树混用'],
    deep:[
      {title:'一套代码指的是源码复用',body:'复用的是页面和请求。产物仍是小程序的模板加脚本，或 H5，或 uni-app x 的原生语言。浏览器的 DOM、history，以及只在某一端存在的登录 API，都进不了另一端的包。'},
      {title:'怎样自己验证',body:'uni-app 把请求从 onLoad 改到 onShow，返回后请求次数应加一。Taro 把请求放到 useDidShow，并在 setData 完成后再读列表，应看到新数据。各删一条页面登记，两端都应打不开，而不是文件系统自动变成路由。'}
    ],
    refs:[['uni-app：页面','https://uniapp.dcloud.net.cn/tutorial/page.html'],['Taro：Hooks','https://docs.taro.zone/docs/hooks']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_17) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
