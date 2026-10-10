/* Frontend 23: Flutter lessons restored after coverage-frontend-20 was reused. */
const COVERAGE_FRONTEND_23 = [
  {
    track: "frontend",
    group: "Flutter",
    id: "flutter-widget-not-html",
    title: "Flutter 的界面是 Widget，不是 HTML 元素",
    prompt: "为什么 build 里写了 div 和 className，卡片既编不过，也没有一棵文档可以查？",
    promptAnswer:"外层用 Column 或 Container，文字用 Text。build 交出的是新的 Widget 配置，状态在 Element 上，布局和绘制在 RenderObject 上。",
    core: "一次界面要经过三层。build 返回的 Widget 是不可变配置，描述这一帧该长什么样。框架用 Element 把新旧 Widget 对上，State 挂在 Element 上，所以 Widget 重建不等于状态丢失。真正布局、绘制、命中测试在 RenderObject 上。文字要写成 Text，它背后是负责排字的渲染对象；排孩子用 Row、Column 这类布局 Widget。没有 div，没有 className，没有 document，也没有沿文档继承的全局 CSS。样式要从 Theme 或显式参数走进 Widget，不会因为外层写了字体就自动落到里面的文字上。和 React Native 的差别见 rn-view-not-div：那边 View 会变成平台原生视图，这边 Widget 只是配置，像素由引擎再画。",
    why: "把网页组件原样搬进来，div 不是 Widget，编译直接失败。空白不是少装了一个 CSS 框架，是运行时根本没有文档树。",
    example: "网页卡片是 div 包着 p，字体写在 body 上。Flutter 里外层是 Column 或 Container，文字是 Text(订单号)。build 每次可以返回新的 Text 实例，Element 仍对得上原来那一格，RenderObject 再按新配置去画。全局搜索 document 和 className，界面文件里没有落点。",
    task: "拿一个网页卡片，写出外层和文字各换成哪个 Widget。再指出 build 返回的对象、挂状态的对象、真正 paint 的对象分别是哪一层。",
    answer: "外层用 Column 或 Container，文字用 Text。build 交出的是新的 Widget 配置，状态在 Element 上，布局和绘制在 RenderObject 上。没有 div、className 和 document，字体也不会沿一棵文档继承下来。",
    keywords: "Flutter Widget Element RenderObject Text",
    deep: [
      {
        title: "手里的 Widget 不是屏幕上的像素",
        body: "build 可以每次 new 一个 Text。框架按运行时类型和 key 更新 Element，再让对应的 RenderObject 布局和 paint。拿 Widget 实例去比「是不是同一个 DOM 节点」没有意义。"
      },
      {
        title: "怎样自己验证",
        body: "在 build 里写 div，应不能通过编译。改成 Column 包 Text 后能显示。在 Widget 上读 document 应没有这个对象。把字体只写在外层 Container 上，里面的 Text 不应自动变成那份字体。"
      }
    ],
    points: [
      "build 返回的 Widget 是配置，状态在 Element 上",
      "布局和绘制发生在 RenderObject，文字用 Text",
      "没有 div、className、document，也没有全局 CSS 继承"
    ],
    refs: [
      ["Flutter：Widget 简介", "https://docs.flutter.dev/ui/widgets-intro"],
      ["Flutter：架构概览", "https://docs.flutter.dev/resources/architectural-overview"]
    ]
  },
  {
    track: "frontend",
    group: "Flutter",
    id: "flutter-impeller-own-pixels",
    title: "Flutter 自己画像素，iOS 上只用 Impeller",
    prompt: "为什么按钮长得不像系统控件，可页面也不是一个 WebView？",
    promptAnswer:"界面是引擎画在自己表面上的像素，不是 OEM 控件，也不是 WebView。iOS 只用 Impeller。",
    core: "Flutter 不把每个按钮换成系统的 OEM 控件，也不把页面放进 WebView。Widget 配置交给引擎，引擎把像素画到自己的表面上。Material 和 Cupertino 是两套由引擎绘制的主题，不是去套 iOS 或 Android 系统按钮的默认皮。绘制后端按端分开：iOS 只有 Impeller，不能再切回 Skia。Android 从 3.27 起，API 29 及以上默认 Impeller；系统更低或设备没有 Vulkan 时，引擎自己退回原来的 OpenGL，应用不必为此再分叉一套界面。调试时可以用 flutter run --no-enable-impeller 临时关掉，发行包不要靠这个开关当默认。Web 目前仍是 Skia，渲染器是 canvaskit 和 skwasm，文档写明以后才可能换 Impeller。桌面端从 3.47 起默认也是 Impeller。不要把 Web 的 canvaskit 写成手机上的现行引擎。",
    why: "按系统控件的样式表去改 Flutter 按钮，属性对不上，因为像素是引擎画的。再把 Web 上的 Skia 当成 iOS 上也还在用 Skia，后端已经对不上。",
    example: "同一颗提交按钮在 iOS 和 Android 上都由引擎按主题画出来。iOS 产物走 Impeller。一台 Android API 29 且支持 Vulkan 的设备默认也是 Impeller；更老的设备由引擎退回 OpenGL，界面代码仍是同一套 Widget。浏览器里的 Flutter Web 才是 canvaskit 或 skwasm。",
    task: "对照 Impeller 文档，分别写下 iOS、Android API 29+、不支持 Vulkan 的 Android、Web 各用哪一个后端。再确认发行包没有依赖 --no-enable-impeller。",
    answer: "界面是引擎画在自己表面上的像素，不是 OEM 控件，也不是 WebView。iOS 只用 Impeller。Android API 29+ 默认 Impeller，更低版本或没有 Vulkan 时引擎退回 OpenGL。Web 仍是 Skia 的 canvaskit 和 skwasm。--no-enable-impeller 只用于调试。",
    keywords: "Flutter Impeller Skia canvaskit OpenGL",
    deep: [
      {
        title: "退回是引擎自己做的",
        body: "Android 上不支持 Vulkan 或系统版本更低时，文档写明会退回 OpenGL。不需要为了这条退路再写一套界面。调试开关不能当成发行包的默认后端。"
      },
      {
        title: "怎样自己验证",
        body: "在 Impeller 文档里标出 iOS 不能切回 Skia、Android API 29+ 默认开启、Web 仍是两套 Skia 渲染器。用 --no-enable-impeller 跑一次调试，确认这是命令行开关，而不是应用里要长期保留的分支。"
      }
    ],
    points: [
      "Flutter 把像素画在自己的表面上，不是系统控件或 WebView",
      "iOS 只用 Impeller，Android API 29+ 默认 Impeller，否则引擎退回 OpenGL",
      "Web 仍用 Skia 的 canvaskit 和 skwasm"
    ],
    refs: [
      ["Flutter：Impeller", "https://docs.flutter.dev/perf/impeller"],
      ["Flutter：架构概览", "https://docs.flutter.dev/resources/architectural-overview"]
    ]
  },
  {
    track: "frontend",
    group: "Flutter",
    id: "flutter-constraints-down",
    title: "约束向下传，尺寸向上报，位置由父级决定",
    prompt: "为什么 Column 里放了 ListView，报的是高度无界，而不是子组件写错了宽度？",
    promptAnswer:"Column 给普通孩子的竖直最大高度是无穷。ListView 因此抛出 Vertical viewport was given unbounded height。",
    core: "布局和 HTML 不是同一套。官方的顺序是：约束向下传，尺寸向上报，位置由父级设置。父级交给孩子的是最小和最大宽高。孩子只能在这组约束里选一个尺寸报回去，不能自己决定坐标，因为坐标是它返回之后父级才定的。Column 对非 Expanded、非 Flexible 的孩子，竖直方向给出的最大高度是无穷，让孩子按内容自己报高度。ListView 却要在滚动方向上撑满父级给的最大高度。最大高度是无穷时，它无法选定视口，运行期抛出 Vertical viewport was given unbounded height。用 Expanded 包住 ListView 之后，Column 先量完其他孩子，再把剩余的有限高度作为紧约束传给列表，列表才能在这块高度里滚动。另一类失败才是溢出：孩子报出的尺寸大于父级允许的最大宽或高，画面上出现超出条纹。孩子写了一个自己希望的宽度，只要仍落在父级的最小和最大之间，最终用的是它报上去的尺寸，不是那句 CSS 权重。",
    why: "把无界视口当成父级太紧，就会去改 ListView 的宽度。真正缺的是一个有限的最大高度。反过来，在已经有限的高度里再塞一个更高的孩子，那才是溢出。",
    example: "Column 的孩子是标题 Text 和 ListView。ListView 没有 Expanded 时，竖直约束的最大高度是无穷，控制台出现 viewport was given unbounded height。标题外包一层 Expanded 并不能让列表获得有限高度，Expanded 必须包在 ListView 外面，而且这个 Column 自己得先有有限高度。包上之后，列表的视口高度是减去标题之后剩下的那一段，多出来的行在这段里滚动。",
    task: "先复现无界高度那句报错，写出 ListView 收到的最大高度是什么。再用 Expanded 包住它，确认报错消失且滚动发生在剩余高度里。最后单独做一个比父级最大宽度更宽的孩子，确认那一次才是溢出。",
    answer: "Column 给普通孩子的竖直最大高度是无穷。ListView 因此抛出 Vertical viewport was given unbounded height。Expanded 把剩余的有限高度传给它，滚动发生在这块高度里。溢出是另一件事：报上去的尺寸超出了父级的最大约束。位置始终由父级在收到尺寸之后设置。",
    keywords: "Flutter constraints Expanded ListView unbounded overflow",
    deep: [
      {
        title: "一次向下、一次向上",
        body: "一帧里父级传入约束，孩子返回尺寸，父级再摆位置。孩子的布局不能依赖自己的坐标。Expanded 必须是 Flex（Column 或 Row）的直接孩子；Column 自己若也处在竖直无界里，它的 Expanded 同样没有剩余空间可分。"
      },
      {
        title: "怎样自己验证",
        body: "Column 里直接放 ListView，应看到 unbounded height，而不是黄色溢出条纹。Expanded 包住 ListView 后，这条断言应消失。再放一个宽度大于父级最大宽度的盒子，这时才应出现溢出。不要用网页的 height 百分比去解释这两次结果。"
      }
    ],
    points: [
      "约束向下传，尺寸向上报，位置由父级设置",
      "Column 里未限制的 ListView 会收到无界高度并报错",
      "Expanded 分到的是有限剩余高度，溢出则是尺寸超出最大约束"
    ],
    refs: [
      ["Flutter：理解约束", "https://docs.flutter.dev/ui/layout/constraints"],
      ["Flutter：常见错误", "https://docs.flutter.dev/testing/common-errors"]
    ]
  },
  {
    track: "frontend",
    group: "Flutter",
    id: "flutter-setstate-rebuilds",
    title: "setState 安排的是这棵子树再 build 一次",
    prompt: "为什么计数已经变成 2，按钮上的 Text 仍显示 1？",
    promptAnswer:"setState 的回调同步改字段，同时把这个 State 标脏，build 发生在随后的帧，paint 更在 build 之后。",
    core: "State.setState 的回调是同步执行的：回调里的 count += 1 返回前字段已经是新值。它通知的是框架把这个 Element 标脏，并安排后续帧里对这个 State 再调用一次 build。build 读到新的 count，返回新的 Text 配置，RenderObject 再在这帧里更新。只写 count += 1 而不调用 setState，字段同样会变成 2，但 Element 不会标脏，下一帧不会因为这次赋值来 build，Text 仍是上一次的配置。setState 返回也不等于像素已经画完，绘制还在这帧后面的 paint。不要在 build 里面调用 setState，那会在构建过程中又把自己标脏。Widget 从树里卸下后，State.dispose 之后再 setState 会失败。父级重建时，标成 const 的子 Widget 可以因为还是同一个实例而被跳过。这不是小程序把序列化结果 setData 到视图层，也不是过桥去改系统控件，见 taro-react-setdata-bridge 和 rn-jsi-not-json-bridge。",
    why: "在 onPressed 里把计数加一，调试器里看到字段已是 2，界面仍是 1。于是去查 Impeller 有没有画完，其实这帧的 build 根本没被安排。",
    example: "onPressed 里只有 count += 1。回调结束时 count 是 2，Text 仍显示 1。改成 setState(() { count += 1; })，回调结束时字段已是 2，随后那一帧的 build 把 Text 的 data 配成 2，屏幕才变。标题写成 const Text，按按钮只重建计数这一支，标题那一段不会因为这次标脏再 build。",
    task: "先只改字段，在赋值的下一行打印 count，并看 Text 是否仍是旧数字。再包进 setState，确认字段立刻变、Text 在随后的帧里变。最后确认没有在 build 里调用 setState。",
    answer: "setState 的回调同步改字段，同时把这个 State 标脏，build 发生在随后的帧，paint 更在 build 之后。只改字段不会标脏，Text 保持旧配置。不要在 build 里调用 setState，dispose 之后也不能再调用。const Widget 可以在父级重建时被跳过。这不是 setData，也不是去改系统控件。",
    keywords: "Flutter setState build Element const",
    deep: [
      {
        title: "标脏和画出像素是两步",
        body: "回调返回时能打印到新的 count，只能说明字段改了。Text 要等这次 build 交出新配置，RenderObject 完成 paint，屏幕才变。在 setState 的下一行去读「已经画完」会读早。"
      },
      {
        title: "怎样自己验证",
        body: "不加 setState 时，打印是新数字，界面是旧数字。加上之后，打印仍是新数字，下一帧界面跟上。在 build 里调用 setState 应出现构建期间 setState 的报错。标题写成 const Text 后，按按钮不应再构建标题那一段。"
      }
    ],
    points: [
      "setState 同步执行回调，并把这个 State 标脏",
      "build 在随后的帧，只改字段不会安排这次 build",
      "const Widget 可以在父级重建时被跳过"
    ],
    refs: [
      ["State.setState", "https://api.flutter.dev/flutter/widgets/State/setState.html"],
      ["Flutter：Widget 简介", "https://docs.flutter.dev/ui/widgets-intro"]
    ]
  },
  {
    track: "frontend",
    group: "Flutter",
    id: "flutter-gorouter-not-named",
    title: "多数应用用 go_router，不要只靠命名路由",
    prompt: "为什么分享链接每次打开，订单页都会在当前栈上再压一层？",
    promptAnswer:"命名路由收到深链会再 push 一页，并且没有浏览器前进。同一链接要用 go_router 的 context.go，让栈按路径声明配好。",
    core: "导航文档写明，大多数应用不推荐只用命名路由。简单跳转是 Navigator.push(context, MaterialPageRoute(builder: ...))，弹出用 pop，参数是你传进下一页构造函数的值。需要深链、多个 Navigator，或在 Web 上直接打开某个路径时，用 go_router：MaterialApp.router 接上路由配置，路径写成 GoRoute。声明式的意思是同一条路径对应同一组屏幕。context.go(\"/order/42\") 按声明把栈配成订单页，而不是在未知栈顶再叠一层；context.push 才会额外压入。只在 MaterialApp 里登记命名路由时，系统送来 /order/42，框架会再 push 一条路由，不能按应用状态改这个行为，也不支持浏览器的前进按钮。go_router 不是网页的 react-router，也不是小程序 pages.json 里的那张页面表。",
    why: "用命名路由接住分享链接，每次打开都在现有栈上再压一层，返回会回到打开链接之前的页面，前进按钮也没有落点。看起来像路由重复注册，其实是深链的默认动作就是再 push。",
    example: "栈里已经有首页。命名路由收到 /order/42，栈变成首页、订单。再打开一次同一链接，栈变成首页、订单、订单。改成 go_router 后，context.go(\"/order/42\") 两次都停在声明的那组屏幕，而不是叠两层。登录拦截写成重定向，而不是等页面 build 之后再 push 登录页。",
    task: "用命名路由打开同一条深链两次，记下栈的层数。再换成 go_router 的 context.go 打开两次，确认仍是声明的那一组。最后写一个必须每次加层的跳转，改用 context.push。",
    answer: "命名路由收到深链会再 push 一页，并且没有浏览器前进。同一链接要用 go_router 的 context.go，让栈按路径声明配好。context.push 和 Navigator.push 加 MaterialPageRoute 才是额外压一层。需要登录时用重定向改路径。这不是 react-router，也不是 pages.json。",
    keywords: "Flutter go_router context.go 命名路由 深链",
    deep: [
      {
        title: "go 和 push 改的栈不一样",
        body: "context.go 按当前路径把 Navigator 配成声明的那组屏幕。context.push 在现有栈上再加一条。深链希望「打开这个订单就看到这个订单」，用 go。从列表再叠一个详情，用 push。"
      },
      {
        title: "怎样自己验证",
        body: "命名路由打开同一深链两次，栈应多两层订单。换成 context.go 后再打开两次，应仍是声明的那一组，返回不应先回到第一次深链压上去的副本。浏览器前进在命名路由方案里没有对应行为。"
      }
    ],
    points: [
      "大多数应用不推荐只用命名路由接深链",
      "context.go 按路径把栈配成声明的那组屏幕",
      "命名路由收到深链会再 push 一页，且没有浏览器前进"
    ],
    refs: [
      ["Flutter：导航与路由", "https://docs.flutter.dev/ui/navigation"],
      ["go_router", "https://pub.dev/documentation/go_router/latest/"]
    ]
  },
  {
    track: "frontend",
    group: "Flutter",
    id: "cross-four-who-paints",
    title: "四套跨端里，像素是谁画的并不相同",
    prompt: "为什么都说一套代码，同一颗提交按钮却分别落在系统视图、自绘表面和小程序模板上？",
    promptAnswer:"React Native 是 JavaScript 加平台视图，setState 之后还要渲染、提交、挂载。",
    core: "先追这一帧像素从哪来，再追数字改完之后要等哪一步才画上去。顺序是：先问像素是谁画的——系统原生视图、自绘表面，还是小程序模板；再决定调试时看哪一层。边界是：四套可以各做一款产品，同一页不要同时承诺四种运行时。React Native 的脚本默认跑在 Hermes 上。0.76 起 JavaScript 经 JSI 持有 C++ 对象直接调用，不再默认把这次调用编成桥上的 JSON。View 和 Text 会变成平台原生视图，样式是数字而不是 CSS 字符串，见 `rn-view-not-div`、`rn-jsi-not-json-bridge`。setState 返回之后还要等渲染、提交、挂载，原生像素才更新。Flutter 用 Dart。build 交出 Widget 配置，Element 挂状态，RenderObject 做布局和 paint，引擎把像素画到自己的表面：iOS 只用 Impeller，Android API 29+ 默认 Impeller，Web 仍是 Skia，见 `flutter-impeller-own-pixels`。setState 只是把 State 标脏，build 在随后的帧。Taro 在小程序逻辑层用模拟 DOM 跑 React 或 Vue，静态 wxml 要等 setData 送来的序列化结果才重画，见 `taro-react-setdata-bridge`。uni-app 的 Vue 3 改的是响应式数据，编译结果对接小程序模板或 Web；要在 Android 上编成 Kotlin，那是另一个 uni-app x 工程的 uts，见 `uniapp-x-uts-not-vue-page`。",
    why: "在 Flutter 里按系统控件找样式，或在 Taro 里按 Impeller 找绘制后端，查到的是另一套运行时。数字已经变了而界面没变时，修的等待点也不一样。",
    example: "同一颗提交。React Native 是 Pressable 的 onPress，子节点是 Text，按下后改 state，原生视图要等这次提交挂载。Flutter 是引擎按主题画出来的按钮，onPressed 里要 setState，下一帧的 build 才交出新 Text。Taro 打到微信时，节点在 wxml 模板上，setState 之后还要等 setData。uni-app 打到微信时，改的是 Vue 数据，由编译后的模板接住；若工程是 uni-app x 的 Android，页面得是 uvue，产物是 Kotlin，不是这颗 Flutter 按钮。",
    task: "给四套各写三句：语言是什么，像素落在系统视图、自绘表面还是小程序模板，状态改完后还要等哪一步屏幕才变。",
    answer: "React Native 是 JavaScript 加平台视图，setState 之后还要渲染、提交、挂载。Flutter 是 Dart 加自绘，手机上是 Impeller，setState 同步改字段，build 在随后的帧。Taro 和 uni-app 打到小程序时像素在模板上：Taro 还要等 setData，uni-app 改的是 Vue 数据。uni-app x 的 Android 把 uts 编成 Kotlin，不是 Flutter 的 Widget，也不是 React Native 的 View。",
    keywords: "Flutter React Native Taro uni-app Impeller setData",
    deep: [
      {
        title: "更新路径跟着绘制走",
        body: "Flutter 等的是下一帧 build 和 paint。Taro 等的是逻辑层模拟树再 setData。uni-app 等的是 Vue 数据驱动编译后的模板。React Native 等的是提交到原生视图。数字已经打印出来而界面没变，先对到自己的那一步，再谈绘制引擎。"
      },
      {
        title: "怎样自己验证",
        body: "各打开一课里的官方链接：Impeller、React Native 核心组件、Taro 实现原理、uni-app x 编译器。每份文档只解释自己的那一层。用其中一份去证明另一套也在用系统按钮或也在用 setData，应找不到依据。"
      }
    ],
    points: [
      "React Native 画的是平台视图，Flutter 画的是自己的表面",
      "Taro 的小程序像素要等 setData，uni-app 改的是 Vue 数据",
      "uni-app x 的 Android 把 uts 编成 Kotlin，不是 Widget 或 View"
    ],
    refs: [
      ["Flutter：Impeller", "https://docs.flutter.dev/perf/impeller"],
      ["React Native：核心组件", "https://reactnative.dev/docs/intro-react"],
      ["Taro：实现原理", "https://docs.taro.zone/docs/implement-note"]
    ]
  },
  {
    track: "frontend",
    group: "Flutter",
    id: "cross-four-where-it-fits",
    title: "先看宿主：小程序、自绘 App，还是系统视图",
    prompt: "为什么四套都能做移动界面，页面打不开或返回不刷新时却要查不同的文件？",
    promptAnswer:"小程序打不开先看 pages.json 或 app.config。Flutter 打不开先看 go_router 的路径或这次有没有 Navigator.push。",
    core: "先选定宿主，再打开那一套的路由文件和刷新钩子。顺序是：先写宿主（小程序、自绘 App、系统视图），再选对应运行时，最后才谈组件和导航写法。边界是：宿主决定你能不能用 div、页面登记在哪个文件、返回时走哪个钩子。主场是微信等小程序时，用 uni-app 的 Vue 3 加 pages.json，或 Taro 4 的 React / Vue 3 加 app.config。两边都是页面数组，第一项是冷启动页，url 没登记就打不开。uni-app 从详情返回只再走 onShow，query 是 onLoad 里那次字符串。Taro 函数组件从详情返回走 useDidShow，参数在 useLoad，界面还要等 setData。要 iOS 和 Android 上像素一致、自己画界面，用 Flutter：简单跳转是 Navigator.push 加 MaterialPageRoute，深链用 go_router 的 context.go，命名路由接深链会再压一层，见 `flutter-gorouter-not-named`。返回后数字不变，先看 onPressed 里有没有 setState，再看下一帧 build 有没有读到新字段。团队已是 React、要系统控件和原生模块，用 React Native，导航来自 React Navigation，不是 react-native 包：已经停在该屏时 navigate 不会再压栈，要叠一层用 push，见 `rn-navigate-not-push`。已有的 .vue 要编成 Android 的 Kotlin，另开 uni-app x，不能把 Flutter 的 Widget 或 Taro 的小程序页混进那个工程。",
    why: "用 pages.json 去管 Flutter 的深链，或用 onShow 去管 React Native 的返回，文件对不上，改完页面仍打不开或仍不刷新。",
    example: "返回列表要刷新。uni-app 把请求放到 onShow，onLoad 次数保持 1。Taro 把请求放到 useDidShow，并等到 setData 把新数组交到模板。Flutter 在 setState 之后的 build 里读新列表。React Native 让这次 state 进入渲染并提交到原生列表。页面打不开时，小程序先看页面数组的第一项和这条 url，Flutter 看 go_router 的路径或 Navigator 有没有 push，React Native 看 React Navigation 的屏幕表里有没有这个名字。",
    task: "写「打不开」和「返回不刷新」。每个症状下给四套各写一个先打开的文件或钩子，空着的格子不要用另一套的答案填上。",
    answer: "小程序打不开先看 pages.json 或 app.config。Flutter 打不开先看 go_router 的路径或这次有没有 Navigator.push。React Native 先看 React Navigation 的屏幕表，navigate 和 push 不是同一个动作。返回不刷新：uni-app 看 onShow，Taro 看 useDidShow 和 setData，Flutter 看 setState 之后那一帧的 build，React Native 看这次 state 有没有提交到原生视图。Android 上要 Kotlin 时另开 uni-app x。",
    keywords: "Flutter Taro uni-app React Native 路由 onShow",
    deep: [
      {
        title: "一套代码指的是源码复用",
        body: "复用的是你写的界面和请求。产物仍是小程序模板、自绘引擎的表面，或平台视图。浏览器的 DOM、history，以及只在某一端存在的登录 API，都进不了另一套宿主。"
      },
      {
        title: "怎样自己验证",
        body: "列一张四行的表：宿主、语言、路由入口、返回时刷新的钩子。Flutter 那一行不应出现 pages.json。uni-app 那一行不应出现 Impeller。React Native 那一行不应从 react-native 包里导入 navigate。"
      }
    ],
    points: [
      "小程序主场用 uni-app 或 Taro，页面先登记，第一项是冷启动页",
      "像素要一致的 App 用 Flutter 自绘，系统控件用 React Native",
      "返回刷新分别查 onShow、useDidShow 加 setData、setState、以及原生视图那次提交"
    ],
    refs: [
      ["Flutter：导航与路由", "https://docs.flutter.dev/ui/navigation"],
      ["Taro：全局配置", "https://docs.taro.zone/docs/app-config"],
      ["uni-app：pages.json", "https://uniapp.dcloud.net.cn/collocation/pages.html"]
    ]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_23) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
