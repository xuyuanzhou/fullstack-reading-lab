/* React Native: native views, list window, and the runtime. Facts follow current official docs. */
const COVERAGE_FRONTEND_18 = [
  {
    track:'frontend', group:'React Native', id:'rn-view-not-div',
    title:'View 只是让人想起 div，它不是浏览器里的元素',
    prompt:'为什么把网页卡片里的 div 原样写进组件，打包过不去，document.getElementById 也没有节点可查？',
    core:'React Native 把 React 组件画成各平台的原生视图，不是把一份 DOM 放进手机浏览器。文档说 View 和 Text 像 div 和 p，那只是对照：iOS 上 View 落到 UIView 一类原生容器，Android 上落到 ViewGroup 一类容器，子节点由 Yoga 按 Flexbox 排，不是你手写 LinearLayout。没有 HTML 元素、className、全局 CSS，也没有 document。样式是 StyleSheet 里的数字对象，不是 CSS 字符串。要嵌一个网址才用 WebView，那是另一个组件，和排卡片的 View 不是同一条路。setState 改完这棵 React 树之后，还要经过渲染、提交、挂载，原生视图才更新，见 rn-jsi-not-json-bridge。',
    why:'把网页组件原样搬进来，div 不是宿主组件，className 没有落点。空白或打包失败不是少装了 CSS 框架，是运行时没有文档树。',
    example:'网页卡片是 div 包着 p，字体写在 className 上。到了 React Native，外层是 View，文字是 Text，宽高和间距写在 StyleSheet.create 返回的对象上。document.getElementById 没有这个卡片对应的节点。业务要打开某个网址时，那一块单独用 WebView，不要把整页都当成那个网页。',
    task:'拿一个网页卡片，列出哪些标签必须换成 View 或 Text，样式从 className 改到哪里。再指出哪一块如果真要显示网页，不能用 View 代替。',
    answer:'容器换成 View，文字换成 Text，排列用这个 View 上的 Flexbox，样式用 StyleSheet 的数字对象。className 和 div 不再存在，document 查不到这棵树。要显示网址用 WebView，不能把 View 当成浏览器文档。View 和 Text 只是文档里用来对照 div 和 p 的说法，运行时是平台原生视图。',
    diagram:'diagrams/rn-view-not-div.svg',
    keywords:'React Native View Text Flexbox 原生视图',
    points:['View 和 Text 对应原生视图，不是 HTML 元素','子视图用 Yoga 的 Flexbox 排列，不手写安卓布局类','嵌网页用 WebView，不能用 View 代替'],
    deep:[
      {title:'对照不是同一套运行时',body:'文档用 div 和 p 帮助网页开发者认组件。渲染结果是平台视图。查元素、改 class、读 offsetHeight 这些浏览器动作没有落点。'},
      {title:'怎样自己验证',body:'在组件里写一个 div，确认它不是可用的宿主组件。改成 View 包 Text 后能显示。再全局搜索 document 和 className，界面组件里不应依赖它们来排这个卡片。'}
    ],
    refs:[['React Native：核心组件','https://reactnative.dev/docs/intro-react'],['View','https://reactnative.dev/docs/view']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-text-not-under-view',
    title:'文字必须包在 Text 里，字体也不会从 View 继承下来',
    prompt:'为什么 View 里直接写「请登录」会抛异常，给根 View 设了 fontFamily 里面的字却还是默认字体？',
    core:'文档写明比网页更严格：文本节点必须包在 <Text> 里。写成 <View>请登录</View> 会抛异常，开发模式下红屏。合法结构是 <View><Text>请登录</Text></View>。网页上给 html 或 body 设的 font-family 会沿文档继承；这里没有这棵文档。只有 Text 套 Text 时，内层才继承外层的 fontFamily。fontFamily 只接受一个字体名，不要写成网页那种逗号分隔的回退列表。给 View 设 fontFamily，不能变成子树里所有文字的默认字体。要统一全应用字体，得在自己的 Text 封装上设，或一层层从外层 Text 传下去。',
    why:'把「请登录」直接写在 View 里，失败原因是文本节点不合法，不是字体文件没打进包。把字体只设在页面根 View 上，里面的 Text 仍是系统默认字体，看起来像样式丢了，其实继承根本不到这一层。',
    example:'<View>Some text</View> 是文档标明的错误写法，会抛异常。改成 View 里包 Text 才能显示。外层 Text 设 fontFamily 为某一个已打包的字体名，嵌套的标题和正文继承这份字体；标题可以再写自己的 fontSize。同一份 fontFamily 写在外层 View 上，内层 Text 不会跟着变。',
    task:'先写一段 View 直接包含文字，记下抛出的异常。再改成 View 包 Text。然后只在外层 Text 上设一个 fontFamily，确认内层继承到了；把同一行样式挪到 View 上，确认内层不再跟着变。',
    answer:'<View>请登录</View> 会抛异常。合法结构是 View 里面再放 Text。fontFamily 从外层 Text 继承到内层 Text，不是从 View 继承到整棵子树。字体名只写一个，不要写成网页上那种字体列表。',
    diagram:'diagrams/rn-text-not-under-view.svg',
    keywords:'Text View fontFamily 文本节点 继承',
    points:['文本节点不能直接放在 View 下，会抛异常','嵌套 Text 才继承外层 Text 的 fontFamily','不能靠根 View 给整棵子树设默认字体'],
    deep:[
      {title:'继承停在 Text 这一支',body:'网页的继承沿着文档走。这里只有 Text 套 Text 才传递字体。View 负责布局，不负责把字体传给里面后来才写上的文字。'},
      {title:'怎样自己验证',body:'按文档的错误例子写 View 直接包含文字，应抛异常。套上 Text 后异常消失。只给外层 Text 设一个 fontFamily，内层不另设字体时应呈现同一字体；把这行样式挪到 View 上，内层 Text 不应跟着变。'}
    ],
    refs:[['Text','https://reactnative.dev/docs/text'],['React Native：核心组件','https://reactnative.dev/docs/intro-react']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-flex-defaults',
    title:'Flexbox 能用，但四项默认和网页不一样',
    prompt:'为什么 display:flex; flex-direction:row 贴进 StyleSheet 之后，三个子 View 仍从上往下排，挤在一起也不缩小？',
    core:'Yoga 实现的是 Flexbox，但默认值和网页不同，而且样式对象里没有 display:flex 这一项：View 默认就是 flex 容器，写 display 没有网页那种作用。文档列出四项差别。flexDirection 默认 column，不是 row，所以不写方向时主轴竖直，三个子 View 上下排。alignContent 默认 flex-start，不是 stretch，多行时交叉轴不会先被拉满。flexShrink 默认 0，不是 1，主轴空间不够时子项默认不收缩，看起来像被挤出或溢出。flex 只接受一个数字，表示相对剩余空间的份数；不要写成网页上 flex: 1 1 auto 那种三段缩写。要横排必须显式写 flexDirection: "row"。要在空间不够时缩小，必须把 flexShrink 写成大于 0 的数。',
    why:'子节点竖排时去查 Yoga 是不是坏了，其实没写 flexDirection，默认已经是 column。网页那段 CSS 还带着 display:flex，贴过来并不打开另一套布局。空间不够时子项也不缩小，因为 flexShrink 默认是 0。',
    example:'三个子 View 不写 flexDirection，从上到下排列。加上 flexDirection: "row" 才左右排。父级宽度不够且子项没设 flexShrink 时，它们保持自己的宽度，不会按网页默认去压缩。flex: 1 是这里支持的形式，表示在剩余空间里占一份。',
    task:'不写 flexDirection，记录三个子 View 的方向。再写成 row。把父级收窄且不设 flexShrink，确认子项不收缩。最后把 flex 写成一个数字，不要传三段缩写。',
    answer:'View 默认就是 flex 容器，不需要 display:flex。不写方向时主轴是 column，子节点竖排。alignContent 默认 flex-start，flexShrink 默认 0，flex 只能是一个数字。要横排必须自己写 row。要在空间不够时缩小，必须把 flexShrink 设出来，不能假设网页的默认 1 还在。',
    diagram:'diagrams/rn-flex-defaults.svg',
    keywords:'Flexbox flexDirection column flexShrink StyleSheet',
    points:['flexDirection 默认是 column 不是 row，View 默认就是 flex 容器','flexShrink 默认是 0 不是 1','flex 只接受一个数字，不是三段缩写'],
    deep:[
      {title:'四项要一起记',body:'只改方向，换行后的 alignContent 仍是 flex-start，空间不够时 flexShrink 仍是 0。网页样式表里没写出来的默认值，在这里恰恰是不同的那几项。'},
      {title:'怎样自己验证',body:'放三个子 View 且不写 flexDirection，应上下排列。写成 row 后应左右排列。把内容加宽且不设 flexShrink，子项不应按网页默认去压缩。flex 只传一个数字，不要传三段缩写。'}
    ],
    refs:[['Flexbox','https://reactnative.dev/docs/flexbox'],['StyleSheet','https://reactnative.dev/docs/stylesheet']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-pressable-not-click',
    title:'按压用 Pressable 的 onPress，不是 div 的 onClick',
    prompt:'为什么把提交写成 View 的 onClick，手指按下去日志一条都没有？',
    core:'按压路径是 Pressable 的 onPress。手指按下时先走 onPressIn，抬起且仍在热区内走 onPress，中途划出热区走 onPressOut 且不会触发 onPress。文档的例子是 Pressable 里面放 Text，文字本身仍必须包在 Text 里。这不是浏览器给 div 绑 onClick，也没有 :hover。View 默认不处理按压，写 onClick 不会变成原生触摸。Android 上若外层还有可滚动的父级，需要配合 delayPressIn 等，避免滚动手势把按压吃掉。新代码按 Pressable 写。TouchableOpacity 仍在组件列表里，它是旧的透明度反馈封装，不是另一套「更原生」的事件。',
    why:'onClick 写在 View 上不会挂到触摸系统。点了没反应时去查冒泡，其实函数根本没进 onPress。文字若直接放在 Pressable 里而没有 Text，会先撞上文本节点那条异常，连按都按不到。',
    example:'<Pressable onPress={submit}><Text>提交</Text></Pressable>。按下到抬起都在按钮上，submit 执行。把同一函数写成 <View onClick={submit}>，submit 不会因为这次触摸被调用。Pressable 里若只写裸字符串「提交」，文本节点仍然不合法。',
    task:'用 Pressable 包一段 Text，在 onPress 打日志。再把处理函数改成外层 View 的 onClick，确认日志不再出现。最后去掉内层 Text，确认先抛文本节点异常。',
    answer:'日志应出现在 Pressable 的 onPress。按下在 onPressIn，抬起且仍在热区内才 onPress。View 的 onClick 不是这套按压。文字放在 Text 里，再作为 Pressable 的子节点。已有的 TouchableOpacity 仍在列表中，新代码按 Pressable 写。',
    diagram:'diagrams/rn-pressable-not-click.svg',
    keywords:'Pressable onPress View Text 按压',
    points:['按压处理函数写在 Pressable 的 onPress，按下是 onPressIn','子节点里的文字仍然放在 Text 中','View 的 onClick 不是原生按压'],
    deep:[
      {title:'先有按压容器，再有文字',body:'Pressable 解决的是按下之后调用哪一个函数。文字怎么显示仍是 Text 的规则。两层都写对，按钮才既看得见也能按。'},
      {title:'怎样自己验证',body:'按下 Pressable，日志应打印。把处理函数挪到外层 View 的 onClick 后，再按，日志应消失。去掉内层 Text、把字符串直接放进 Pressable，应出现文本节点不能放在视图下的异常。'}
    ],
    refs:[['Pressable','https://reactnative.dev/docs/pressable'],['Text','https://reactnative.dev/docs/text']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-flatlist-window',
    title:'长列表用 FlatList，它不会把每一行都挂上',
    prompt:'为什么 ScrollView 里 map 出一千行会卡，而且行里输入框的字滑出屏幕再回来就没了？',
    core:'长列表用 FlatList 或 SectionList，它们是 VirtualizedList 的包装。必填的是 data 和 renderItem。FlatList 只把落在渲染窗口里的行挂到树上，窗口大约是可见区域再加一点预渲染。ScrollView 里 map 会把一千个组件全部挂上，没滚到的行也占内存。行滑出窗口后，这个行组件会卸载，它自己的 useState 一起丢掉。未提交的备注必须写回这条 data 上的字段，或放到列表外面的 store，下一次 renderItem 才能再读到。keyExtractor 要给出稳定身份，默认用 item.key，没有就用下标，下标在插入删除时会把错行的状态对到另一条订单。窗口大小由 windowSize、初始渲染条数由 initialNumToRender 控制，默认不是「屏幕上有几条就只挂几条」。',
    why:'ScrollView 一次挂完全部行，首屏和滚动都被这一千棵子树拖住。把输入只放在行组件的 state 里，滑出窗口再滑回来，那份 state 已经随卸载丢掉，看起来像输入框坏了。',
    example:'data 是一千条订单，renderItem 返回一行。屏幕上只挂当前窗口里的那些行。某一行用 useState 存未提交备注，滑走再滑回来，备注空了。把备注写进这条订单的字段之后，再进入窗口仍能读到。keyExtractor 用 order.id，不要用 index。',
    task:'用同一份一千条数据分别放进 ScrollView 的 map 和 FlatList。在一行里用 state 存一个字，滑出窗口再回来，记下这个字在不在。再写进该条 data，确认回来后还在。',
    answer:'长列表用 FlatList，传入 data 和 renderItem。它只挂渲染窗口里的行，不像 ScrollView 一次挂出全部。行滑出窗口后组件卸载，内部 state 不保留。要留下来的备注必须在条目数据或外部存储里。keyExtractor 用稳定 id，不要用下标。',
    diagram:'diagrams/rn-flatlist-window.svg',
    keywords:'FlatList ScrollView VirtualizedList renderItem',
    points:['长列表用 FlatList，而不是 ScrollView 一次 map 全部','FlatList 只挂当前渲染窗口里的行，滑出后行组件卸载','要保留的内容放进条目数据，keyExtractor 用稳定 id'],
    deep:[
      {title:'data 和 renderItem 缺一不可',body:'data 是列表的来源，renderItem 把其中一项画成组件。没有稳定身份的项，滑出再回来会被当成新的一行。要保留的内容放进数据，而不是放进会卸载的那层 state。'},
      {title:'怎样自己验证',body:'用同一份长数组分别放进 ScrollView 的 map 和 FlatList。滚动时 FlatList 不应把每一项同时挂在树上。在一行里用 state 存一个字，滑出窗口再回来，这个字应消失；写进该条 data 后再渲染，这个字还应在。'}
    ],
    refs:[['使用列表视图','https://reactnative.dev/docs/using-a-listview'],['FlatList','https://reactnative.dev/docs/flatlist']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-image-needs-size',
    title:'网络图片必须自己写宽高，静态资源不是同一条路',
    prompt:'为什么 Image 的 source 填了能打开的网址，布局里却量不出这块图的矩形？',
    core:'Image 可以显示网络图、打包进应用的静态资源、临时本地文件和 data 协议的图。文档专门注明：网络图和 data 图必须手动指定 width 和 height。只写 { uri: "https://..." }、样式里没有宽高，组件没有网页那种靠文件自己撑开的盒，这块区域高度可以是 0。onLoad 能告诉你加载完了，甚至能读到像素宽高，那是加载回调，不是布局已经占住矩形。打包进应用的静态资源走 require("./pic.png")，打包器能读到固有尺寸，不和「远程地址却没给尺寸」混成同一个故障。resizeMode 管的是图在已有矩形里怎么裁切或拉伸，补上宽高之前谈它没有意义。',
    why:'从网页习惯写成只有 src 的图片，网络图没有可视区域。于是去查链接是不是 404，链接是好的，缺的是宽高。把静态 require 的图也按网络图的故障去加一套加载失败逻辑，会修错文件。',
    example:'source={{ uri }} 且样式没有 width、height，图不占住预期矩形。补上 width: 200, height: 120 后，同一地址能显示。另一张 require("./logo.png") 的图不靠这个远程地址，也不要用「没写 uri」来解释它。onLoad 里打印出的像素宽高，不会自动写成这一次布局的宽高。',
    task:'用同一张网络图做两次渲染：一次不写尺寸，一次写上 width 和 height。再指出静态资源为什么不属于这次故障，以及 onLoad 和占矩形为什么是两件事。',
    answer:'不写宽高的网络图和 data 图没有你要的矩形，同一 uri 写上 width 和 height 后才能占住布局。onLoad 只说明加载完，不代替样式里的尺寸。打包进来的静态资源是另一条来源，不要按网络图缺尺寸来改它。',
    diagram:'diagrams/rn-image-needs-size.svg',
    keywords:'Image uri width height 网络图片',
    points:['网络图和 data 图必须手动指定宽高','只写 uri 不会像网页图片那样自己撑开','onLoad 成功不等于已经占住布局矩形'],
    deep:[
      {title:'尺寸是布局，不是加载成功',body:'onLoad 能告诉你图片加载完了，甚至能读到像素宽高。组件在布局里占多大，仍由你写的 width 和 height 决定。加载成功和占住矩形是两件事。'},
      {title:'怎样自己验证',body:'网络图不设宽高，应看不到预期矩形。设上数值后同一地址应显示。再换一张应用内静态资源，确认它不依赖这次给 uri 补尺寸的改法。'}
    ],
    refs:[['Image','https://reactnative.dev/docs/image'],['StyleSheet','https://reactnative.dev/docs/stylesheet']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-dimensions-not-cached',
    title:'窗口尺寸会变，不要把第一次读到的宽高存死',
    prompt:'为什么把手机横过来之后，按启动时存下的 window.width 排的卡片还是竖屏那一列的宽度？',
    core:'Dimensions.get("window") 立刻返回当前宽高，但旋转、分屏、折叠会改掉这份值。文档要求依赖这些数的渲染和样式在每次渲染时重新取，而不是在模块顶层调用一次写进常量。模块加载时那一次读取，在旋转之后不会自己更新，所有读这个常量的卡片仍按竖屏宽度算。useWindowDimensions 订阅窗口变化，屏幕尺寸或字体缩放变了会触发重渲染，这次函数组件拿到的 width 才是新的。window 是应用可见区域，screen 是整块物理屏，有状态栏或分屏时这两个宽度可以不同，不要混用。这和 flexDirection 默认 column 不是一件事：方向决定主轴，这里是宽度被存死了。',
    why:'模块加载时 Dimensions.get 一次，然后所有卡片都读这个常量。用户把手机横过来，组件没有再次读取，右边被裁掉。去改 Flexbox 默认方向，宽度仍是旧数。',
    example:'应用启动时 const CARD = Dimensions.get("window").width。竖屏下卡片正常。旋转后 CARD 仍是旧宽度。改成 const { width } = useWindowDimensions()，旋转后这次渲染拿到新宽度，卡片按新宽度重排。',
    task:'把窗口宽度存进模块常量，旋转一次，打印这个常量，确认仍是旧值。再改成 useWindowDimensions，确认旋转后组件拿到新的 width 并重排。',
    answer:'模块顶层存下的宽度在旋转后仍是旧值。每次渲染重新读 Dimensions.get("window")，或直接用 useWindowDimensions。后者在屏幕尺寸或字体缩放变化时更新。window 和 screen 不是同一个矩形。不要把启动时的一次读取当成 CSS 里那种固定的视口单位。',
    diagram:'diagrams/rn-dimensions-not-cached.svg',
    keywords:'Dimensions useWindowDimensions 旋转 窗口宽度',
    points:['窗口尺寸会随旋转、分屏或折叠变化','不要把第一次读到的宽高存进模块常量','useWindowDimensions 会在尺寸或字体缩放变化时更新'],
    deep:[
      {title:'和 flex 默认值不是一件事',body:'竖排是 flexDirection 默认 column。旋转后宽度仍是旧数，是读取被存死了。先看这份宽度是不是每次渲染重新拿的，再谈主轴方向。'},
      {title:'怎样自己验证',body:'打印模块常量里的宽度，旋转设备，这个打印不应变成新宽度。把同一块改成 useWindowDimensions 的 width，旋转后组件应拿到新的 width，并按新宽度重排。'}
    ],
    refs:[['Dimensions','https://reactnative.dev/docs/dimensions'],['useWindowDimensions','https://reactnative.dev/docs/usewindowdimensions']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-platform-extension',
    title:'整份实现不同就拆文件，一个数值不同才用 Platform.OS',
    prompt:'为什么每个组件都写成 Platform.OS === "ios" 时返回一棵树，android 时返回另一棵？',
    core:'平台完全不同的实现放到 BigButton.ios.js 和 BigButton.android.js，导入写 import BigButton from "./BigButton"，不写后缀。Metro 打包当前平台时只编进对应那一份，另一份里的原生模块不会进这次包。和网页或 Node 共用、但两端原生没有差别时，用 Container.js 给网页打包器，用 Container.native.js 给 React Native。只有高度这种一个数值不同，才留在同一文件里用 Platform.OS：iOS 上这个字段是 "ios"，Android 上是 "android"。Platform.select({ ios, android, native, default }) 按这个顺序取最合适的值。整棵树都不同却堆在一个 if 里，两边的实现和未使用的原生导入会缠在同一次检查里。',
    why:'一个文件里两套完整界面，改 iOS 时容易碰到 Android 分支。只在 iOS 存在的模块也会被 Android 打包扫到。文件后缀分开之后，当前平台那一份才进入这次打包。',
    example:'按钮在两端的结构和依赖都不同，分成 BigButton.ios.js 和 BigButton.android.js，调用处只导入 ./BigButton。卡片只是 iOS 上高 200、Android 上高 100，这时留在一个 StyleSheet 里用 Platform.select({ ios: 200, android: 100 })。和网页共用的容器则是 Container.js 与 Container.native.js。',
    task:'找一处整棵界面都按平台分叉的组件，拆成平台文件并保持导入路径不带后缀。再留一处只差一个样式数值的，改用 Platform.select。Android 打包时确认 .ios.js 里独有的导入没有编进来。',
    answer:'整份实现不同的，拆成 .ios.js 和 .android.js，导入路径不写后缀，由 Metro 按当前平台选择。只差一个高度时，用 Platform.OS 或 Platform.select。和网页共用且原生两端相同的，用 .native.js 对网页那份 .js。不要把两棵完整的树塞进同一个函数的 if。',
    diagram:'diagrams/rn-platform-extension.svg',
    keywords:'Platform.OS ios.js android.js native.js',
    points:['整份实现不同时用 .ios.js 和 .android.js，导入不写后缀','一个数值不同才用 Platform.OS 或 Platform.select','和网页共用时用 .native.js，不是再把 iOS 和 Android 拆开'],
    deep:[
      {title:'.native.js 是对网页打包器',body:'Container.js 由网页打包器使用，Container.native.js 由 React Native 使用。它解决的是和 Web 共用代码，不是再把 iOS 和 Android 分成两个原生文件。'},
      {title:'怎样自己验证',body:'在 .ios.js 里写一个只有 iOS 才有的导入，Android 打包不应把这个文件编进去。把高度差留在 Platform.select 里，两端各打一次，高度应分别是那两个数。导入语句里不应出现 .ios 或 .android 后缀。'}
    ],
    refs:[['平台相关代码','https://reactnative.dev/docs/platform-specific-code'],['Platform','https://reactnative.dev/docs/platform']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-hermes-default',
    title:'默认引擎是 Hermes，不是手机浏览器里的那一个（RN 默认）',
    prompt:'为什么在 Chrome 里能跑的写法，到了默认的 React Native 工程却对不上？',
    core:'Hermes 是面向 React Native 的开源 JavaScript 引擎。文档写明**新工程默认使用它**，不必再为了「打开 Hermes」加配置。和 JavaScriptCore 比，文档给出的收益是启动更快、内存更低、包更小。React Native 仍允许按社区说明退出 Hermes 改回 JavaScriptCore，那是可选退路，不是默认。手机里的 Chrome 或 Safari 引擎不负责跑这份应用脚本。哪些函数被补上，看 JavaScript 环境文档的列表，见 rn-fetch-not-document，不由「设备上有没有 Chrome」决定。Hermes 只执行脚本。View 仍然画成原生视图，换引擎不会把界面变成 DOM。',
    why:'用浏览器引擎的某个未在 Hermes 上同样可用的行为来解释线上脚本，会对不上默认运行时。再去工程里找「打开 Hermes」的开关，文档说默认已经启用。',
    example:'新工程不改引擎配置，脚本跑在 Hermes 上。若按社区说明退出，才改回 JavaScriptCore。在 Chrome 控制台里验证通过的冷门语法或引擎差异，不能直接当成这台设备上的结果。',
    task:'对照 Hermes 文档写出默认引擎是哪一个，以及要换成 JavaScriptCore 时是启用还是退出。再确认环境补齐列表和引擎名字不是同一份文档。',
    answer:'默认引擎是 Hermes，文档写明不必再配置才能启用。换成 JavaScriptCore 是退出 Hermes，不是默认路径。不要把手机浏览器的 JavaScript 引擎写成这份应用的运行时。有哪些标准函数可用，看环境文档的补齐列表。换引擎不把 View 变成 DOM。',
    diagram:'diagrams/rn-hermes-default.svg',
    keywords:'Hermes JavaScriptCore 默认引擎 React Native',
    points:['Hermes 默认启用，不必再配一次才打开','换 JavaScriptCore 是退出 Hermes','浏览器引擎不是这份应用脚本的运行时'],
    deep:[
      {title:'引擎和界面树不是一层',body:'Hermes 执行 JavaScript。View 仍然画成原生视图。换引擎不把界面变成 DOM，也不自动补上文档对象。'},
      {title:'怎样自己验证',body:'看 Hermes 文档的默认说明，新工程不应再为了「打开 Hermes」加一套配置。再找到退出到 JavaScriptCore 的步骤，确认那是可选退路。最后在环境文档的补齐列表里核对你要用的函数，而不是只在 Chrome 里试一次。'}
    ],
    refs:[['使用 Hermes','https://reactnative.dev/docs/hermes'],['JavaScript 环境','https://reactnative.dev/docs/javascript-environment']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-jsi-not-json-bridge',
    title:'0.76 起默认走 JSI，调用不必再做桥上的序列化',
    prompt:'为什么还把每一次 JavaScript 调原生都写成先 JSON 序列化、再异步过桥，而 setState 的下一行就去读原生布局？',
    core:'架构文档写明，从 0.76 起新架构在工程里默认开启。新架构用 JavaScript Interface（JSI）替换旧的桥：JavaScript 可以持有 C++ 对象的引用，也可以反过来，于是能直接调方法，不必先把参数编成桥上的 JSON 消息再异步送过去。大块相机帧因此不必先变成那份序列化载荷。这不表示你在脚本里 setState 返回时，原生视图已经画完。界面仍要经过渲染、提交、挂载三步，挂载之后原生节点才对得上这一帧。旧桥那套「每次都先变成消息」不再是默认路径。同步布局读数要等这次提交完成，不要在 setState 的下一行去读屏幕上的宽高。',
    why:'按旧桥去估一次相机帧的开销，会以为几十兆的缓冲区必然先被序列化，从而否定现在默认的调用方式。反过来以为 JSI 让 setState 同步画完原生控件，又会在布局还没提交时就去读界面结果。',
    example:'默认的 0.76 及以后工程走新架构。一次对 C++ 对象的调用不必先把参数编成桥上的 JSON。把一帧图像当消息体塞过旧桥，和现在直接调用不是同一条成本。组件 setState 之后，画面要等这次渲染提交并挂载，不会在赋值语句结束时已经变成原生像素。',
    task:'对照架构文档写出 0.76 的默认，以及 JSI 省掉的是哪一种成本。再写一句界面更新仍然要经过的三步，并标明 setState 的下一行读不到这三步的结果。',
    answer:'0.76 起新架构默认开启。JSI 让 JavaScript 持有 C++ 对象引用并直接调用，不必再按旧桥把这次调用序列化成消息。界面更新仍是渲染、提交、挂载，不是赋值语句结束就等于原生视图已经画完。不要把旧桥的序列化写成现行默认，也不要把 JSI 写成同步画完界面。',
    diagram:'diagrams/rn-jsi-not-json-bridge.svg',
    keywords:'JSI 新架构 0.76 Fabric 桥',
    points:['0.76 起新架构默认开启','JSI 直接调用 C++ 对象，不必先序列化过桥','界面仍要渲染、提交、挂载，setState 返回不等于已画完'],
    deep:[
      {title:'省掉的是桥上的那份拷贝',body:'旧桥把 JavaScript 和原生隔成消息。JSI 用内存引用直接调方法，大块帧数据不必先变成那份序列化载荷。这是调用路径，不是渲染已经结束的证明。'},
      {title:'怎样自己验证',body:'打开架构文档，确认 0.76 的默认是新架构，并找到 JSI 替换桥、避免序列化成本的那一段。再在渲染文档里指出渲染、提交、挂载仍是界面更新的步骤。不要用一次 setState 的下一行去读取「原生已经画完」。'}
    ],
    refs:[['关于新架构','https://reactnative.dev/architecture/landing-page'],['架构概览','https://reactnative.dev/architecture/overview']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-navigate-not-push',
    title:'navigate 到当前这条路由不会再压一层，push 才会',
    prompt:'为什么已经在详情页上，再对另一条订单调用 navigate("Details")，栈深度不变、参数也没换成新的 id？',
    core:'屏幕跳转不是 react-native 包里的组件，常用的是独立的 React Navigation。从 @react-navigation/native 取 navigation，屏幕名登记在 Navigator 的 Screen 上，不是 href，也不是网页的 react-router。navigate("Details", { id }) 的意思是「到名为 Details 的屏幕」：当前已经在这条路由上时，再 navigate 到同一个名字什么都不做，不会用新的 id 再压一层。push("Details", { id }) 每次都往栈里加一条，哪怕屏幕名相同。第一次从 Home 调用 navigate("Details") 仍会打开，因为当时还不在这条路由上。goBack 弹出一层。没有登记过的屏幕名不会变成一页。',
    why:'列表进第一条详情后再点第二条，仍调用 navigate("Details")。人已经在 Details 上，第二次按说明不压栈，屏幕还是第一条的 id。于是去查原生是否丢了点击，其实函数按文档没有做事。',
    example:'当前就在 Details，params.id 是 1。按钮调用 navigation.navigate("Details", { id: 2 })，文档的例子是什么都不发生，id 仍是 1。改成 navigation.push("Details", { id: 2 })，栈上多一层 Details，这一层的 id 是 2，goBack 回到 id 为 1 的那一层。从 Home 第一次 navigate 到 Details 仍会打开它。',
    task:'在详情页上分别调用 navigate 和 push 到同一个屏幕名，带上另一个 id。记下栈是否变深、当前 params 是否换成新 id。再在依赖里确认包名是 React Navigation。',
    answer:'已经在 Details 上时，navigate("Details") 不会再压一层，也不会用新 params 换掉当前屏。push 每次都新增一条路由。第一次从别的屏幕 navigate 过来仍会打开。这些方法从 @react-navigation/native 来，不是 react-native 包，也不是网页路由的 href。',
    diagram:'diagrams/rn-navigate-not-push.svg',
    keywords:'React Navigation navigate push 路由栈',
    points:['已经在该路由上时 navigate 不会再压栈，也不会换 params','push 每次都新增一条路由','这套 API 属于 React Navigation，不是 react-native 包'],
    deep:[
      {title:'同名屏幕要带不同数据时用 push',body:'列表进第一条详情再用 navigate 到详情，人已经在详情上，第二次不会把另一条数据压成新页。要叠一层详情，用 push，并带上这一次的参数。'},
      {title:'怎样自己验证',body:'在详情页按钮里调用 navigate 到当前屏幕名并换一个 id，栈的层数应不变，params 也不应变成新 id。改成 push 后层数应加一，返回一次回到刚才那层。在工程依赖里确认包名是 React Navigation，而不是从 react-native 里导入 navigate。'}
    ],
    refs:[['React Navigation：跳转','https://reactnavigation.org/docs/navigating'],['React Native：核心组件','https://reactnative.dev/docs/intro-react']]
  },
  {
    track:'frontend', group:'React Native', id:'rn-fetch-not-document',
    title:'环境补上了 fetch，没有因此补上 document',
    prompt:'为什么登录请求用 fetch 已经成功，紧接着 localStorage.setItem 存令牌却没有这个对象？',
    core:'JavaScript 环境文档列出各运行时都提供的补齐：require、console、XMLHttpRequest、fetch、定时器和动画帧，以及一批列出的语言方法。这份浏览器小节没有 document，没有 localStorage，也没有 window.location。有 fetch 只说明网络请求在列表里，不说明网页文档对象也在。界面树是原生视图，document.getElementById 找不到 View 对应的节点。令牌不要写入 localStorage，用各平台提供的存储。Hermes 负责执行脚本，不负责提供 DOM，见 rn-hermes-default。',
    why:'登录请求用 fetch 已经成功，于是把令牌写入 localStorage。调用时这个名字不在环境补齐里，脚本在取令牌时失败。网络可用和文档对象可用被当成了同一件事。',
    example:'fetch("/me") 可以按文档里的补齐使用。紧接着的 localStorage.setItem("token", t) 不在该列表中，不能当成已经提供。document.getElementById("card") 同样不在列表里，也找不到 View 对应的 DOM 节点。',
    task:'对照环境文档的浏览器补齐列表，标出 fetch 在不在、document 和 localStorage 在不在。写出令牌不应该存进哪一个网页 API。',
    answer:'fetch 和 XMLHttpRequest 在补齐列表里，可以用来发请求。document 和 localStorage 不在这份列表里，不能用来查界面或存令牌。令牌不要写入 localStorage。界面节点用组件和状态表达，不使用 document。',
    diagram:'diagrams/rn-fetch-not-document.svg',
    keywords:'fetch localStorage document JavaScript 环境',
    points:['fetch 和 XMLHttpRequest 在环境补齐列表里','document 和 localStorage 不在这份列表里','有网络请求不等于有网页文档对象'],
    deep:[
      {title:'列表就是边界',body:'文档按运行时列出了补上的函数。不在列表里的网页 API，不要用「手机里也有浏览器」来推断它存在。Hermes 负责执行脚本，不负责提供 DOM。'},
      {title:'怎样自己验证',body:'打开 JavaScript 环境文档的浏览器补齐，确认能看到 fetch，看不到 document 和 localStorage。在组件里调用 localStorage.setItem，应不能当已有 API 使用。同一组件里的 fetch 仍按列表可用。'}
    ],
    refs:[['JavaScript 环境','https://reactnative.dev/docs/javascript-environment'],['使用 Hermes','https://reactnative.dev/docs/hermes']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_18) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
