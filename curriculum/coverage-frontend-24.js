/* Frontend 24: the HTML5 column under 浏览器. */
const COVERAGE_FRONTEND_24 = [
  {
    track:'frontend', group:'浏览器', id:'html5-main-landmark',
    title:'没有 hidden 的 main 一页只能有一个',
    prompt:'为什么页头、正文、页脚都用 div，读屏的地标列表里却是空的？',
    promptAnswer:'可见的 main 只有一个，并且不在 header、nav、article、aside、footer 里。',
    core:'header、nav、main、article、section、aside、footer 给文档划出区域。没有 hidden 的 main 一页只能有一个，而且不能放进 header、nav、article、aside 或 footer 里面。section 是同一主题的一块，应有自己的标题；只为了样式包一层时用 div。article 是可以单独拿走的一块，例如一篇帖子。写在 article 里的 header 和 footer 属于这篇文章，不属于整页。nav 放主要导航，不是每一组链接都要套。按钮和链接的键盘行为见 `accessibility`，输入框的名字见 `html-form-semantics`，模态层见 `html-dialog-modal`。',
    why:'整页都是 div 时，读屏的地标列表是空的，用户只能逐行往下走。反过来一页放两个可见的 main，地标里会出现两个“主内容”，不知道哪一个才是正文。',
    example:'登录页用一个 main 包住表单，页头用 header，主导航用 nav。文章页的每篇帖子是 article，文章自己的标题写在它内部的 header 里。侧栏链接如果只是一组相关文章，用 aside，不要再套一个 nav。',
    task:'给当前页标出唯一的可见 main。检查它有没有被包进 header、nav 或 article。再把只为了留白的盒子改回 div，给每个 section 补上标题。',
    answer:'可见的 main 只有一个，并且不在 header、nav、article、aside、footer 里。section 带有自己的标题。纯样式容器仍是 div。文章内部的 header 只命名这篇文章。',
    keywords:'HTML main section article nav 地标',
    points:['没有 hidden 的 main 一页只能有一个','section 要有标题，纯样式容器用 div','article 里的 header 属于这篇文章'],
    deep:[
      {title:'地标是区域，不是样式名',body:'这些元素让辅助技术能按区域跳转。给 div 起一个 class 叫 main，样式可以一样，地标列表里仍然没有它。隐藏的 main 可以另有一个，用来切换视图；两个同时可见就不合法。'},
      {title:'怎样自己验证',body:'用读屏或浏览器的无障碍树查看地标。应能看到一个 main。把第二个可见 main 放进页面，地标里会出现两个主内容。把 main 挪进 header，对照规范它不应再待在那里。'}
    ],
    refs:[['MDN：main','https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main'],['HTML：main 元素','https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element']]
  },
  {
    track:'frontend', group:'浏览器', id:'html5-constraint-before-submit',
    title:'校验没过时不会触发 submit',
    prompt:'为什么邮箱格式不对，提交按钮的监听却一次都没执行？',
    promptAnswer:'按钮和 requestSubmit() 在校验失败时不触发 submit。novalidate 或 formnovalidate 跳过校验。',
    core:'点提交按钮，或调用 form.requestSubmit()，浏览器先做约束校验。required、type="email"、pattern、min、max 没过，就显示提示并停下来，submit 事件不会发生。空的 email 在没有 required 时是通过的。form 上的 novalidate，或这个提交按钮上的 formnovalidate，会跳过这一步。form.submit() 更直接：既不校验，也不触发 submit。setCustomValidity("说明") 让控件无效，传空字符串才清掉这条自定义错误。禁用和 readonly 的控件不参与约束校验。浏览器这道门挡不住绕过页面的请求，服务端仍要再查一遍。标签怎么绑到控件上，见 `html-form-semantics`。',
    why:'在 submit 监听里提示“邮箱格式不对”，格式错误时监听根本不跑，页面像没有脚本。换成 form.submit() 之后，空的必填项也会被发出去。',
    example:'input type="email" required，填入 "a" 后点提交，浏览器提示格式，控制台里的 submit 监听不打印。改成 form.noValidate = true 再点，submit 会打印，请求照样发出。form.submit() 即使邮箱是 "a" 也不会打印监听。setCustomValidity("已被占用") 后，格式正确也会被拦住，直到再设成空字符串。',
    task:'用一个必填邮箱，分别点提交按钮、调用 requestSubmit() 和调用 submit()。记下哪几次出现原生提示、哪几次进了 submit 监听。再设一条自定义错误并清掉。',
    answer:'按钮和 requestSubmit() 在校验失败时不触发 submit。novalidate 或 formnovalidate 跳过校验。form.submit() 不校验也不触发 submit。自定义错误要用空字符串清掉。服务端仍要校验同一份数据。',
    keywords:'HTML 约束校验 required novalidate requestSubmit',
    points:['校验失败时 submit 事件不会发生','form.submit() 跳过校验和 submit 事件','setCustomValidity 的空字符串才表示没有自定义错误'],
    deep:[
      {title:'检查和展示是两个方法',body:'checkValidity() 只返回是否通过，并为无效控件触发 invalid，不弹出提示。reportValidity() 在此之外还显示浏览器的提示。提交按钮走的是会显示提示的那条路。invalid 监听可以换文案，但不能当成提交已经开始。'},
      {title:'怎样自己验证',body:'必填邮箱留空，点按钮，确认没有 submit 日志、有原生提示。调用 requestSubmit() 应相同。调用 submit() 应没有提示、也没有 submit 日志，但导航或请求会发生。加上 novalidate 后再点按钮，submit 日志应出现。'}
    ],
    refs:[['MDN：约束校验','https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation'],['MDN：HTMLFormElement.submit','https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit']]
  },
  {
    track:'frontend', group:'浏览器', id:'html5-media-play-promise',
    title:'带声音的自动播放会被拒绝，play() 要看 Promise',
    prompt:'为什么写了 autoplay，桌面上仍要点一下才有声音？',
    promptAnswer:'带声音的 autoplay 被拒绝，元素停住。muted 和 playsinline 之后可以无声、页内播放。',
    core:'video 和 audio 用 controls 交出浏览器自己的控件。元素上有 src 时，子级 source 会被忽略；没有 src 时，浏览器选用第一个自己能解码的 source。带声音的自动播放通常被策略拒绝。muted 的 autoplay 才常被允许，手机上还要加 playsinline，否则可能直接全屏。脚本调用 media.play() 得到的是 Promise：允许播放时完成，被策略拒绝时以 NotAllowedError 拒绝。捕获这个拒绝，再提供一个真正的播放按钮。多个 source 的顺序就是候选顺序。',
    why:'标签上写了 autoplay 却没有声音，就会去查文件坏了。网络里文件是好的，被拒绝的是带声音的自动播放。play() 的 Promise 没人接，控制台只有一条未处理的拒绝。',
    example:'<video autoplay src="intro.mp4"> 在桌面浏览器里往往停在第一帧。改成 autoplay muted playsinline 后可以无声播放。按钮里 const pending = video.play(); pending.catch(...) 在策略拒绝时把按钮留在页面上。source 先写 webm 再写 mp4 时，能播 webm 的浏览器不会再请求 mp4。',
    task:'先给带声音的视频加 autoplay，确认它没有自己出声。再改成静音并加 playsinline。最后用按钮调用 play()，分别在允许和拒绝时看 Promise。',
    answer:'带声音的 autoplay 被拒绝，元素停住。muted 和 playsinline 之后可以无声、页内播放。play() 成功时 Promise 完成，被拒绝时是 NotAllowedError。元素自己带 src 时，子级 source 不参与选择。',
    keywords:'HTML video autoplay play Promise muted playsinline',
    points:['带声音的自动播放通常会被策略拒绝','play() 返回 Promise，拒绝时要自己接住','有 src 属性时子级 source 被忽略'],
    deep:[
      {title:'静音和内联是播放策略的条件',body:'策略看的是这次播放有没有声音、是不是用户手势触发的。muted 去掉声音，playsinline 让手机不必为了播放切到全屏。用户点过一次之后，后面的 play() 才比较容易成功。文件能下载，只说明字节到了，不说明允许出声。'},
      {title:'怎样自己验证',body:'无手势地加载带 autoplay 和声音的视频，确认没有出声，play() 的 Promise 被拒绝。加上 muted playsinline 后再加载，应能无声播放。在元素上写 src 的同时放一个不会解码的 source，确认浏览器没有按那个 source 去换文件。'}
    ],
    refs:[['MDN：视频元素','https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video'],['MDN：自动播放指南','https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay']]
  },
  {
    track:'frontend', group:'浏览器', id:'html5-canvas-buffer',
    title:'canvas 的宽高属性才是像素缓冲',
    prompt:'为什么把 canvas 的 CSS 拉到 600 像素，线却发糊，点击也对不准？',
    promptAnswer:'只改 CSS 时缓冲仍是 300×150，位图被拉伸。设置 width 和 height 属性后缓冲变大，已绘内容被清空，要重画。',
    core:'canvas 是一块位图。默认缓冲是宽 300、高 150。CSS 的 width 和 height 只把这块位图拉开，不增加像素，所以线条变糊，鼠标坐标也对不上缓冲。要改分辨率，设置 canvas.width 和 canvas.height，这会清空已经画上的内容。绘制用 getContext("2d") 的路径和像素，画出来的圆不是 DOM 节点，不能对它 addEventListener。点中检测要自己用坐标算。设备像素比大于 1 时，缓冲按 CSS 尺寸乘上 devicePixelRatio，再用 setTransform 把单位缩回去。SVG 里的形状才是元素。位图和矢量不是同一套命中方式。',
    why:'只在样式里把画布拉大，导出的图是糊的，点击位置也偏。检查元素里 CSS 已经是 600，缓冲仍是 300×150。',
    example:'canvas 不写宽高属性，CSS 设成 600×300。画一条 1 像素的线，看起来像 2 像素并且发虚。把 canvas.width 设为 600、canvas.height 设为 300 后，线变清楚，但刚才画的内容没了，需要再画一次。对画布上的圆点击，目标始终是 canvas 元素本身。',
    task:'用 CSS 把默认画布拉大并画一条线，记下缓冲宽高和模糊情况。再把 width、height 属性设成同样的 CSS 像素并重画。最后点击图中的圆，看事件目标是不是 canvas。',
    answer:'只改 CSS 时缓冲仍是 300×150，位图被拉伸。设置 width 和 height 属性后缓冲变大，已绘内容被清空，要重画。点击落在 canvas 元素上，不是落在某个圆形节点上。高分屏还要按 devicePixelRatio 放大缓冲。',
    keywords:'canvas width height 位图 devicePixelRatio SVG',
    points:['CSS 尺寸只拉伸位图，不改变缓冲','设置 width 或 height 属性会清空画布','画上的形状不是元素，命中要自己算'],
    deep:[
      {title:'标签里的内容不是图形的节点',body:'写在 canvas 开始和结束标签之间的文字，是画布不可用时的后备，不是已经画出来的形状。画布可用时，这些后备不显示，也不接收点击。需要可访问名称时，另给 canvas 加标题或旁白，不要指望圆自己出现在无障碍树里。'},
      {title:'怎样自己验证',body:'打印 canvas.width，只设 CSS 时应仍是 300。设完属性后再打印，应为新宽度，并且画面被清空。在 2x 屏幕上把缓冲乘以 devicePixelRatio，1 像素线应重新变锐。点击圆形时 event.target 应是 canvas。'}
    ],
    refs:[['MDN：canvas 基本用法','https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage'],['HTML：canvas 元素','https://html.spec.whatwg.org/multipage/canvas.html#the-canvas-element']]
  },
  {
    track:'frontend', group:'浏览器', id:'html5-pushstate-popstate',
    title:'pushState 改地址，这次调用不触发 popstate',
    prompt:'为什么地址已经变成 /orders/2，监听 popstate 的函数却没运行？',
    promptAnswer:'pushState 只改当前文档的地址和历史，不触发 popstate。后退或前进才触发，state 是存进去的那份克隆。',
    core:'history.pushState(state, "", url) 在当前文档上新增一条历史记录并改掉地址，不重新加载文档。第二个参数目前被忽略，传空字符串。url 必须是同源的，跨源会抛 SecurityError。这次调用不触发 popstate，也不触发 hashchange。用户后退或前进时才触发 popstate，event.state 是当时存入的状态的克隆。replaceState 替换当前这一条，不增加长度。直接改 location 或点链接会加载文档，那是另一次导航。路由库也坐在这套历史上，但列表数据不会因为地址变了就自己到来。',
    why:'在 popstate 里请求订单详情，调用 pushState 后地址对了，详情仍是上一笔。后退时监听才跑，于是感觉“前进不刷新、后退才刷新”。',
    example:'history.pushState({ id: "2" }, "", "/orders/2") 之后，地址是 /orders/2，popstate 监听没有日志，文档也没卸载。按后退，popstate 触发，event.state 回到上一份。pushState("https://other.example/") 抛 SecurityError。replaceState 后再看 history.length，不应比调用前增加。',
    task:'调用 pushState 改到一个同源路径，确认 popstate 没触发、文档没刷新。再后退一次，读 event.state。最后试一个跨源地址，并对比 replaceState 是否增加历史长度。',
    answer:'pushState 只改当前文档的地址和历史，不触发 popstate。后退或前进才触发，state 是存进去的那份克隆。跨源 URL 抛 SecurityError。replaceState 不增加历史条数。进入新地址后要自己拉数据。',
    keywords:'history pushState replaceState popstate 同源',
    points:['pushState 不加载文档，也不触发 popstate','popstate 发生在后退和前进','url 必须同源，replaceState 不增加历史长度'],
    deep:[
      {title:'状态要能被结构化克隆',body:'放进 pushState 的值会被克隆。函数、DOM 节点和带循环的特殊对象会失败。后退时拿到的是克隆，不是当时内存里的那个对象。刷新之后，浏览器可能丢弃这份状态，所以订单详情仍要以地址为准再请求一次。'},
      {title:'怎样自己验证',body:'pushState 前后各打一条日志，中间不应出现 popstate，performance 或网络面板里也不应有整页文档请求。后退时应出现 popstate，并且 state.id 是推入时的值。把 url 换成另一个源，应在调用处抛 SecurityError。'}
    ],
    refs:[['MDN：History.pushState','https://developer.mozilla.org/en-US/docs/Web/API/History/pushState'],['MDN：popstate','https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event']]
  },
  {
    track:'frontend', group:'浏览器', id:'html5-dataset-string',
    title:'dataset 读出来的都是字符串',
    prompt:'为什么 data-count="3" 取出来之后，加一变成了 31？',
    promptAnswer:'直接相加得到 "31"。Number 转换后得到 4。',
    core:'data-* 属性通过元素的 dataset 读写。data-user-id 对应 dataset.userId，横线后面的字母变成大写。读到的值永远是字符串，没有这个属性时是 undefined，不是空字符串。dataset.count = 3 会把属性写成 "3"。删除用 delete dataset.userId。要把 "3" 当数量，先用数值转换，再做加法。属性里放一整段 JSON 时要自己 JSON.parse，解析失败要单独处理。这不是存储区，大块数据和令牌不应写进 HTML。跨标签的偏好见 `browser-storage`。',
    why:'拿到 dataset.count 直接加 1，"3" + 1 得到 "31"，角标越加越长。属性里明明写着数字 3。',
    example:'<button data-user-id="42" data-count="3">。button.dataset.userId 是 "42"，button.dataset.count + 1 是 "31"。Number(button.dataset.count) + 1 是 4。button.dataset.count = 4 之后，getAttribute("data-count") 是 "4"。没有 data-role 时 dataset.role 是 undefined。',
    task:'读取 data-count 并加一，先按字符串拼接做一次，再按数值做一次。然后写入 dataset，用 getAttribute 看属性上的文本。最后删除这个 dataset 属性。',
    answer:'直接相加得到 "31"。Number 转换后得到 4。写入 dataset 后属性值是字符串 "4"。delete 之后属性消失，再读是 undefined。名字从 data-user-id 映射到 userId。',
    keywords:'dataset data-* 字符串 驼峰',
    points:['dataset 的值一律是字符串','data-user-id 映射为 dataset.userId','删除属性用 delete，缺失时读到 undefined'],
    deep:[
      {title:'属性文本和页面数据不是同一层',body:'dataset 只是 DOM 属性的一层方便写法。刷新、改模板、服务端再渲染，都会换掉这些字符串。数量的真相如果在接口里，就从接口取数字，不要把 HTML 属性当成状态库。'},
      {title:'怎样自己验证',body:'对 data-count="3" 打印 typeof，应为 string。和 1 相加应得到 "31"。Number 后再加应得到 4。赋值后再 getAttribute，引号里应是新的数字文本。delete 后 hasAttribute 应为 false。'}
    ],
    refs:[['MDN：HTMLElement.dataset','https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset'],['HTML：dataset','https://html.spec.whatwg.org/multipage/dom.html#dom-dataset']]
  },
  {
    track:'frontend', group:'浏览器', id:'html5-picture-source',
    title:'picture 里第一个匹配的 source 胜出',
    prompt:'为什么同时写了 avif 和 jpg，网络里却只请求了 jpg？',
    promptAnswer:'顺序在前且 media、type 都匹配的 source 被选中，后面的不请求。',
    core:'picture 按源码顺序看每个 source。media 匹配并且 type 是浏览器能解码的类型时，这个 source 入选，后面的不再看。一个都不匹配时，用末尾 img 的 src。真正显示的是那个 img，source 只提供候选。srcset 配合 sizes 描述不同宽度的文件；w 描述符需要 sizes，否则按整窗宽度来选。同一条 srcset 里不要混用 w 和 x。img 自己带了 src、又被 CSS 拉大时，选文件的依据仍是 sizes 或默认的视口宽度，不是事后量出来的渲染尺寸。懒加载和占位见 `image-loading`。',
    why:'把 jpg 的 source 写在 avif 前面，支持 avif 的浏览器也只请求 jpg。或者 type 写成 image/jpg，没有这种类型，候选被跳过。',
    example:'picture 里第一个 source 是 type="image/avif"，第二个是 type="image/jpeg"，最后 img src 指向 jpeg。支持 avif 的浏览器只请求 avif。把 jpeg 的 source 挪到前面，就只请求 jpeg。srcset="a.jpg 480w, b.jpg 800w" 且 sizes="(min-width: 800px) 480px, 100vw" 时，宽屏按 sizes 给出的 480 CSS 像素去选，不会因为窗口是 1400 像素就拿 800w 那张。',
    task:'调换 avif 和 jpeg 两个 source 的顺序，各刷新一次，记下网络里的文件。再把 type 改错一次。最后用带 sizes 的 srcset，在宽屏和窄屏各看选中的宽度。',
    answer:'顺序在前且 media、type 都匹配的 source 被选中，后面的不请求。type 写错则跳过该 source。都不匹配时用 img 的 src。w 描述符按 sizes 给出的布局宽度选文件，不按元素最后被拉成的像素。',
    keywords:'picture source srcset sizes type avif',
    points:['picture 按顺序采用第一个匹配的 source','type 或 media 不匹配就跳过','w 描述符按 sizes 给出的布局宽度选文件'],
    deep:[
      {title:'img 仍然是那个被布局的元素',body:'source 不单独生成一个可替换元素。宽高、alt、loading 写在 img 上。没有 img，picture 就没有可显示的后备。艺术方向用 media 换裁切，同一裁切的不同分辨率用 srcset，两件事不要写进同一条没有 sizes 的属性里。'},
      {title:'怎样自己验证',body:'在支持 avif 的浏览器里把 avif source 放第一，网络面板应只有 avif。对调后应只有 jpeg。把 type 改成 image/jpg，这个 source 应被跳过。改 sizes 后再看选中的文件名是否跟着布局宽度变，而不是跟着 CSS 放大变。'}
    ],
    refs:[['MDN：picture','https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture'],['MDN：响应式图片','https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images']]
  },
  {
    track:'frontend', group:'浏览器', id:'html5-drop-prevent-default',
    title:'dragover 不取消默认行为，drop 就不会发生',
    prompt:'为什么 dragstart 里已经 setData，松手时 drop 监听却不执行？',
    promptAnswer:'没有取消 dragover 的默认行为时，drop 不发生。取消之后，getData 能取回同一类型的文本。',
    core:'拖放从 dragstart 开始，在这里用 dataTransfer.setData 放入文本。经过目标时，浏览器默认不允许放下。目标要在 dragover 里调用 preventDefault，drop 才会接着发生。drop 里再 preventDefault，避免浏览器把放下的文件当成导航。文本用 getData 取回。从桌面拖进页面的文件在 drop 时放在 dataTransfer.files 里，dragover 阶段往往还读不到这份列表。setData 的类型和 getData 的类型要一致。这是浏览器的拖放通道，不是给一个元素写 mousemove 就能得到的那些坐标。',
    why:'只监听 drop，列表项怎么拖到区域上松手都没反应。dragstart 的日志有了，drop 的日志没有。补上 dragover 的 preventDefault 之后，同一次松手才进 drop。',
    example:'li 在 dragstart 里 setData("text/plain", id)。区域只写 drop 监听时，松手没有日志。给区域加上 dragover 且 preventDefault 后，drop 里 getData("text/plain") 得到同一个 id。从桌面拖入一个 png，drop 事件的 dataTransfer.files[0] 是这个文件；在 dragover 里读 files，长度常常仍是 0。',
    task:'先只绑定 drop，拖动并松手，确认监听不跑。再在 dragover 里 preventDefault，确认 drop 能读到 setData 的文本。最后从桌面拖入文件，比较 dragover 和 drop 里 files 的长度。',
    answer:'没有取消 dragover 的默认行为时，drop 不发生。取消之后，getData 能取回同一类型的文本。桌面文件要在 drop 里读 files。drop 里也要 preventDefault，避免浏览器打开这个文件。',
    keywords:'dragover drop dataTransfer preventDefault files',
    points:['dragover 里要 preventDefault，drop 才会发生','setData 和 getData 使用同一类型','桌面文件在 drop 的 files 里读取'],
    deep:[
      {title:'默认行为是不允许放下',body:'浏览器要保护页面，随便拖过一段文字不应变成一次放置。只有目标明确取消 dragover，这次放置才成立。drop 上再取消一次，是为了挡住“导航到本地文件”那个默认动作。两个 preventDefault 解决的是先后两件默认事。'},
      {title:'怎样自己验证',body:'dragover 里暂时不要 preventDefault，drop 不应打印。加上之后应打印，并且文本和 dragstart 里放入的一致。从桌面拖文件时，在 dragover 打印 files.length，再在 drop 里打印，后者才应大于 0。'}
    ],
    refs:[['MDN：拖放 API','https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API'],['MDN：dragover','https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_24) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
