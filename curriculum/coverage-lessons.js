/* Batch 02: original lessons drafted from topic coverage, then checked against official documentation.
   No purchased source text, questions, or illustrations are reproduced here. */
const COVERAGE_LESSONS = [
{
    track:'frontend',
    group:'CSS 与布局',
    id:'css-cascade',
    title:'层叠、权重与样式覆盖',
    prompt:'一个更长的选择器为什么有时仍赢不了另一条规则？',
    promptAnswer:'层叠先比来源/重要性/层，再比选择器权重，最后才是顺序。',
    core:'浏览器先按来源、重要性和层叠层确定候选规则，再比较同一优先层级内的选择器权重；仍相同时才看作用域距离与出现顺序。选择器“看起来长”不是完整判断依据。顺序是：先看来源、重要性和层叠层，决定哪些声明有资格比较；再在同一优先层级里比选择器权重；仍相同才看作用域距离和源码顺序。边界是：未分层规则可能压过层内权重更高的普通规则，选择器写得更长不能单独决定胜负。important 会抬高优先级，但会让后续覆盖更难，不要用它代替分层。调试时在样式面板里看胜出声明属于哪一层，而不是先把选择器写得更长。同一层里才比权重。层已经不同时，选择器分数没有资格参与这场比较。先看层。',
    why:'错把选择器更长当成一定胜出，未分层的普通规则仍可能盖过层内更高权重的声明。样式不生效时继续堆 !important，后面的规则也会被锁死。能分开的信号是：开发者工具里胜出的那条来自哪一层，而不是选择器看起来有多长。',
    example:'同一元素两条 color：层内的 #id 规则和层外的 .class 规则。层外那条普通作者样式胜出，尽管它的选择器更弱。把两条放进同一层后，#id 才盖过 .class。再把层去掉，胜负会跟着变。记下胜出的层。',
    task:'在开发者工具中为同一元素写两条冲突的 color，分别改变层、选择器和顺序，记录胜出的规则。',
    answer:'先比来源、重要性和层叠层，这些不同就不用再比选择器长短。它们相同之后才比权重，#id 通常高于 .class。权重仍相同，才用作用域距离和出现顺序打破平局。更长的选择器如果输在层上，把选择器再写长也不会翻盘。层不同时，不要再比选择器分数。顺序不能倒过来。',
    keywords:'CSS cascade specificity layer 选择器 权重 层叠',
    deep:[
      {
        title:'先判断比赛资格',
        body:'不同来源、important 声明或层叠层中的规则，不应只拿选择器分数直接比较。'
      },
      {
        title:'控制复杂度',
        body:'用清晰的层级、较低的选择器权重和语义类名，比不断追加覆盖规则更容易维护。'
      }
    ]
  },
{
    track:'frontend',
    group:'CSS 与布局',
    id:'css-stacking',
    title:'层叠上下文与 z-index',
    prompt:'子元素 z-index:9999 为什么仍盖不过旁边的弹层？',
    promptAnswer:'先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。子元素的 9999 只在 A 内部竞争，不能越过 A 去跟 B 比。',
    core:'层叠上下文会把内部后代作为一个整体参与父上下文的排序。子元素的 z-index 只能在所属上下文内竞争，无法直接越过父上下文与外部兄弟比较。顺序是：先看谁建立了新的层叠上下文，再在那个上下文内部用 z-index 排序，最后把整个上下文当作一个整体去跟外部兄弟比。边界是：opacity、transform 等也可能建立上下文，子元素再大的 z-index 都出不去。数字调到 9999 仍被挡时，要抬容器或换顶层机制，而不是再加一位。transform 或小于 1 的 opacity 也会新建上下文，这时子元素的 z-index 同样出不去。数字再大也出不去。',
    why:'错把子元素的 z-index 当成可以跟外部弹层直接比大小，9999 仍盖不过旁边更高的兄弟上下文。弹层被挡时只把数字调大，遮挡不会消失。能分开的信号是：两个元素是不是已经分属不同的层叠上下文。',
    example:'A 的 z-index 为 1，B 为 2，都建立了上下文。A 的子元素设成 9999，视觉上仍在 B 下面。把 A 的 z-index 提高到 3 之后，A 和它的子元素一起到了 B 前面。子元素并未单独越过去。',
    task:'创建两个定位容器和一个弹层，逐级检查 transform、opacity、position 与 z-index。',
    answer:'先找两个元素各自最近的层叠上下文，再比这两个上下文在父级里的顺序。子元素的 9999 只在 A 内部竞争，不能越过 A 去跟 B 比。要盖过 B，应提高 A 的层级，或把弹层放到更高的上下文里，而不是继续加大子元素的数字。先抬上下文，再谈子元素。',
    keywords:'CSS stacking context z-index transform opacity 弹层',
    deep:[
      {
        title:'上下文是一扇门',
        body:'子元素只在所属上下文里比 z-index。父上下文在外面的顺序已经输了，内部的数字不会被拿出去再比一次。先找最近的上下文，再决定抬哪一层。先改父级，而不是把子元素改成更大的数。'
      },
      {
        title:'怎样自己验证',
        body:'做两个定位容器，z-index 分别是 1 和 2。在较低的容器里放一个 z-index 为 9999 的子元素，确认仍被挡住。再提高容器本身，观察子元素是否一起过来。'
      }
    ]
  },
{
    track:'frontend',
    group:'CSS 与布局',
    id:'css-flex',
    title:'Flex 项为什么不按 width 收缩',
    prompt:'两个 width 相同的 Flex 子项，最终宽度为什么可能不同？',
    promptAnswer:'先看 flex-basis 形成的初始主轴尺寸，再按 grow 和 shrink 分配多余或不足的空间。',
    core:'Flex 布局以 flex-basis 形成初始主轴尺寸，再按 grow、shrink 分配空闲或不足空间；内容的固有最小尺寸也可能阻止进一步收缩。width 只是参与某些基准计算，并非最终宽度保证。顺序是：用 flex-basis 得到初始主轴尺寸，空间有余就按 grow 分配，空间不足就按 shrink 收缩，收缩时还要受最小尺寸限制。边界是：min-width:auto 会用内容的最小尺寸当下限，长单词或代码块因此撑开容器。width 相同不能保证最终宽度相同。min-width:0 只解除这个下限，不改变 grow 和 shrink 的比例。再量一次最终宽度。',
    why:'错把 width 相同当成最终宽度相同，长文本的最小尺寸会撑开其中一项，另一项继续收缩。溢出被当成百分比算错。能分开的信号是：该项的 min-width 是不是 auto，以及 flex-basis 有没有先被算进去。',
    example:'两个子项都写 width:50% 且 flex:1 1 auto。第二项放一段不换行的长字符串，它的宽度大于第一项，容器出现横向滚动。给第二项 min-width:0 后，两项才一起收缩到容器内。滚动条消失。',
    task:'用两个子项比较 flex:1 与 flex:1 1 auto，加入长文本后再测试 min-width:0。',
    answer:'先看 flex-basis 形成的初始主轴尺寸，再按 grow 和 shrink 分配多余或不足的空间。width 只参与基准，不是最终宽度。长内容配 min-width:auto 时，该项不能缩到比内容最小尺寸更小。min-width:0 允许它继续收缩。flex:1 与 flex:1 1 auto 的基准不同，要分开测。',
    keywords:'CSS flex-basis flex-shrink min-width overflow 弹性布局',
    deep:[
      {
        title:'基准、伸缩和最小尺寸',
        body:'最终宽度不是 width 一个属性。先有 flex-basis，再按剩余空间伸缩，最后被最小尺寸挡住。长文本配自动最小宽度时，shrink 即使不为 0 也可能缩不动。'
      },
      {
        title:'怎样自己验证',
        body:'两个子项都设 flex:1 1 auto，给其中一个放不换行的长字符串，看它是否撑开容器。再只给该项加 min-width:0，确认两项回到容器以内，并比较 flex-basis 不同时的宽度。'
      }
    ]
  },
{
    track:'frontend',
    group:'浏览器',
    id:'fetch-abort',
    title:'Fetch 取消与过期响应',
    prompt:'搜索框连续发送 A、B 请求，A 最后返回时怎样避免覆盖 B？',
    core:'AbortController 可把取消信号传给 fetch，停止不再需要的请求；但已完成的响应、其它异步步骤和业务回调仍需检查“这是不是最新一次搜索”。取消资源与拒绝过期结果是两个边界。顺序是：每次输入递增序号并取消上一次控制器，发起新请求，响应回来时先看序号是否仍是最新，是才写入界面。边界是：取消的是网络工作，不是已经完成的回调。只靠 loading 布尔值分不清是哪一次请求结束。序号对上了才提交，对不上就丢弃，即使那次响应更晚到达。序号在发起时加一，在写入前比较。不相等就返回，即使这次响应的网络耗时更长。abort 只减少还在飞的请求，写界面仍要看序号。',
    why:'错把 loading 标志当成能挡住旧响应，慢的 A 后返回仍会把 B 的结果盖掉。取消请求也挡不住已经进回调的那一次。能分开的信号是：写界面之前有没有核对这是不是最新一次搜索，序号能分开。',
    example:'先搜 A 并让它延迟返回，再搜 B 且 B 先回到“乙”。A 随后返回“甲”。若只 abort 没对上序号，界面停在甲；写入前核对序号后，界面保持乙。序号从 1 变成 2 后，迟到的 1 被丢弃，界面保持乙。',
    task:'人为让第一次请求比第二次慢，分别测试仅取消和仅检查序号的行为。',
    answer:'过期的 A 不应再改界面，即使它的响应已经到了。可以在发起 B 时 abort 掉 A，减少无用流量，但 abort 不保证回调不再发生。提交结果前还要用递增序号或同一把最新标记核对，不是最新的就丢弃。只做其中一件，另一种失败仍会留下。两步都要留下。',
    keywords:'fetch AbortController race stale response 请求竞态',
    deep:[
      {
        title:'取消和丢弃是两步',
        body:'AbortController 用来停掉还在飞的请求。已经返回的响应、超时回调和其他异步步骤仍可能执行。写界面前必须再核对请求身份，两步缺一都会把旧结果留在屏幕上。'
      },
      {
        title:'响应体只读一次',
        body:'同一 Response 的 body 是流，json/text 会读干，见 fetch-response-body-once。取消读到一半后不要假定还能再读剩余块。'
      },
      {
        title:'怎样自己验证',
        body:'让第一次搜索故意慢于第二次。只 abort 时看慢响应还会不会写界面。只核对序号、不 abort 时，界面应保持新结果，但网络面板里旧请求仍会跑完。两步一起做再对比。'
      }
    ]
  },
{
    track:'frontend',
    group:'网络与安全',
    id:'http-methods',
    title:'HTTP 方法：安全与幂等',
    prompt:'POST 一定不幂等，而 DELETE 一定能无条件重试吗？',
    core:'HTTP 的安全和幂等描述方法的语义约定：安全方法不应请求改变服务器状态；幂等方法重复执行的预期效果与一次执行相同。业务副作用、鉴权、失败窗口和响应内容仍须具体设计。顺序是：先看方法约定的安全与幂等，再看这次业务有没有额外副作用，最后用唯一键把重试收成同一次效果。边界是：幂等说的是预期效果相同，不保证第二次状态码相同。DELETE 可以是幂等的，创建订单的 POST 默认不是。没有业务键时，方法名本身挡不住超时重试。安全方法失败后可以再读。幂等方法重复执行的预期效果与一次相同，但第二次的状态码仍可能不同。创建订单看唯一键和表里的行数，不看这次用的是不是 POST。',
    why:'错把 POST 当成一定不能重试、DELETE 当成一定可以盲目重试，重复创建会出两张订单，重复删除却可能第二次返回不同状态码。方法名不是重试策略。能分开的信号是：服务器用不用业务键保证效果只发生一次。',
    example:'对同一资源发两次 DELETE，资源最终都不存在，但第二次可以是 404 而不是 204。创建订单的 POST 若没有幂等键，超时后重试会插入第二张订单。同一幂等键的第二次 POST 返回第一次的订单号，表里仍是一行。',
    task:'为查询、覆盖更新、扣款三个接口分别说明方法、重试条件和服务器防重措施。',
    answer:'查询用安全方法，重复执行不应要求改服务器状态，失败后可以再读。覆盖式 PUT 按资源标识写整份表示，重复写的预期效果与一次相同。扣款不能只看 POST 这个名字，必须用业务键和持久化约束让重试返回第一次的结果，而不是再扣一次。状态码可以不同，效果不能再来一次。',
    keywords:'HTTP safe idempotent GET PUT DELETE POST 重试',
    origin:'本地库《图解 HTTP》方法一览页',
    diagram:'library-assets/illustrated-basics/http-p0034.png',
    deep:[
      {
        title:'语义和实现要分开',
        body:'安全和幂等是方法的约定，不是某个框架自动加上的锁。查询不应靠它改状态。覆盖更新可以设计成幂等。扣款、下单必须另有业务键，否则 POST 重试就会重复生效。看表里的行数，不要只看方法名。'
      },
      {
        title:'创建与正文类型',
        body:'服务分配 id 的创建常用 POST，不要默认背成 PUT，见 http-create-post-not-put。正文是 JSON、表单还是 multipart，见 http-content-type-body、formdata-multipart-upload。'
      },
      {
        title:'怎样自己验证',
        body:'对同一资源连续 DELETE 两次，记录两次状态码和资源是否还在。再对创建订单连续 POST 两次相同正文：没有幂等键时应有两张单，加上唯一键后应只剩一张并返回同一结果。'
      }
    ]
  },
{
    track:'frontend',
    group:'网络与安全',
    id:'http-range',
    title:'Range 请求与断点续传',
    prompt:'客户端下载了前半段文件后，凭什么能安全接着下载？',
    core:'Range 请求指定所需字节区间，服务器可用 206 Partial Content 和 Content-Range 返回片段。续传前还应核对资源标识或验证器，防止文件已改变却把新旧片段拼在一起。顺序是：请求里写明字节区间，并带上资源验证器；响应若是 206，核对 Content-Range 和验证器后再追加；若是 200，按完整响应重来；若是 416，停下来核对长度。边界是：文件已改变时，旧片段和新片段不能拼接。没有验证器的续传只在资源保证不变时才安全。状态码相同也不要跳过区间检查。续传前核对验证器。文件已换代时，旧的前半段必须丢掉。200 不能追加。',
    why:'错把已经下载的前半段当成可以无条件接上，文件在服务器上换过内容后，新旧字节会拼成损坏文件。续传失败表现为能打开但内容错。能分开的信号是：响应是 206 且验证器仍匹配，还是 200 整份新内容。',
    example:'本地已有前 1000 字节，请求 bytes=1000-。服务器若返回 206 且验证器未变，追加是安全的。若返回 200 和整份新文件，继续追加会把两代内容焊在一起。416 时先打印本地已有长度，再决定重下，不要从旧偏移继续 append。',
    task:'模拟服务端分别返回 206、200 与 416，设计客户端如何保存或重启下载。',
    answer:'206 且区间、验证器都和本地文件对得上时，才把片段追加到已有字节后面。200 表示服务器给了完整表示，应丢弃旧片段，按这份重新保存。416 表示区间不被接受，先核对本地长度和资源是否还存在，再决定从头下载还是停在错误。三种都不要盲目追加。',
    keywords:'HTTP Range 206 Content-Range If-Range 断点续传',
    origin:'本地库《图解 HTTP》Range 字节范围页',
    diagram:'library-assets/illustrated-basics/http-p0049.png',
    deep:[
      {
        title:'三段响应三种处理',
        body:'206 才是协商好的片段。200 是整份新表示，追加会损坏文件。416 说明区间无效，先看本地已经有多长、资源是否被换掉，再决定重下还是报错。三种状态码不要共用一段追加逻辑。'
      },
      {
        title:'怎样自己验证',
        body:'先下载前半段，再请求剩余区间。对照 206 时文件能拼完整。把服务器文件换成另一份内容后用同一偏移续传，确认客户端拒绝追加并改为整份重下。换过内容后再续传，文件应被整份替换。'
      }
    ]
  },
{
    track:'frontend',
    group:'浏览器',
    id:'browser-storage',
    title:'localStorage 与跨标签页状态',
    prompt:'同一页面调用 localStorage.setItem 后会收到自己的 storage 事件吗？',
    core:'localStorage 按源保存数据，storage 事件通知共享该存储区的其他文档，不在执行写入的当前文档触发。它适合少量客户端偏好，不是可靠的跨标签页事务或服务端真相来源。顺序是：当前文档 setItem 后自己更新界面，其他同源文档通过 storage 事件得知新值再更新。边界是：事件不在写入的文档上触发，也不跨源。它适合少量偏好，不能当成跨标签事务或服务器上的真相。两个标签同时写，后一次覆盖前一次，没有合并。隐私模式和容量上限也会让写入直接失败。当前页要在 setItem 的同一函数里改界面。只等 storage 事件，自己这个标签不会刷新。自己改。',
    why:'错把 storage 事件当成写入页面自己也会收到，标签 A 更新主题后只等事件，自己的界面不会变。另一个标签却会收到。能分开的信号是：事件出现在别的文档，还是出现在执行 setItem 的这一页。',
    example:'同源的标签 A 和 B 都监听 storage。A 执行 setItem("theme","dark")。B 的回调收到新值并改主题，A 的监听函数不执行。A 必须在 setItem 之后自己改界面。',
    task:'打开两个同源标签页，记录 A 写入后两个页面的事件与显示状态。',
    answer:'B 能收到 storage 事件，事件里有 key 和新值，B 用它刷新主题。A 不会收到自己这次写入的事件，所以 A 要在写入的同一段代码里直接更新自己的状态。两边同时写同一个键时，后写的值留下，storage 不是事务，冲突要另定谁更新。',
    keywords:'localStorage storage event same origin tabs 本地存储',
    deep:[
      {
        title:'事件给别人',
        body:'storage 通知的是共享这个源的其他文档。写入者不会收到自己的事件。只在监听里更新界面，当前标签就会停在旧状态。写入函数里要同步改自己的那一份。写入和收事件是两个文档。'
      },
      {
        title:'和 session / IndexedDB',
        body:'跨标签共享用 localStorage。只跟当前标签的向导进度用 sessionStorage，见 session-storage-tab-only。结构化大数据与索引用 IndexedDB，见 indexeddb-when-needed。不要把三种都当成“浏览器缓存”一个词。'
      },
      {
        title:'登出清本地',
        body:'响应可用 Clear-Site-Data 清 Cookie/storage，那只是浏览器侧，见 clear-site-data-not-full-logout。服务端会话仍要作废。'
      },
      {
        title:'怎样自己验证',
        body:'打开两个同源标签，两边都给 storage 打日志。在 A 里 setItem，确认只有 B 打印事件，A 的界面要靠写入代码自己更新。再在两个标签同时写同一个键，看最后留下的是哪一次。'
      }
    ]
  },
{
    track:'frontend',
    group:'Node.js',
    id:'node-stream',
    title:'Node Stream 与背压',
    prompt:'不断调用 writable.write 会自动把内存控制在固定上限吗？',
    core:'write 返回 false 表示内部缓冲达到阈值，生产方应暂停，等待 drain 后再继续。继续写通常仍会缓冲数据，可能造成内存和延迟失控；pipeline 可协调流转与错误传播。顺序是：生产方 write，返回 true 可以继续，返回 false 必须停，等到 drain 再恢复。边界是：false 不是拒绝写入，而是“先别再给”。继续 write 仍会堆积。高水位是阈值不是硬上限。pipeline 负责在错误和关闭时拆掉两端，手写暂停时也要把 error 和 close 接上，否则会留下挂起的流。false 之后继续 write，长度仍会涨。等 drain 再写，才把速度交给慢的那一端。',
    why:'错把 writable.write 返回 false 当成数据被拒收，继续写仍会把块堆进内存，慢消费者拖垮进程。背压信号被忽略后，内存先涨。能分开的信号是：write 返回 false 之后有没有停下来等 drain。',
    example:'读一个大文件，向一个每次只消化 1 字节的 Writable 连续 write。忽略 false 时缓冲长度一直上升。改成 false 就暂停读取、drain 后再继续，缓冲停在高水位附近。缓冲不再线性上涨。',
    task:'构造一个低速 Writable，对比忽略 false 与等待 drain 时的缓冲增长。',
    answer:'write 返回 false 表示内部缓冲到了阈值，生产方应暂停，等 drain 再继续写。忽略 false 时数据通常仍被收进缓冲，内存和延迟一起涨。用 pipeline 可以把暂停、错误和关闭串起来。无论哪条路，错误、提前关闭和取消都要传到另一端，不能只处理快乐路径。',
    keywords:'Node.js Stream backpressure highWaterMark drain pipeline 背压',
    deep:[
      {
        title:'false 是减速不是丢弃',
        body:'返回 false 说明缓冲到了高水位，这次数据通常已经收下。生产方再写就会继续堆内存。正确反应是暂停来源，等 drain。高水位不是进程内存的硬顶。把它当成丢弃，就会把背压写反。'
      },
      {
        title:'怎样自己验证',
        body:'写一个每次延迟才消费的 Writable，上游不停 write。记录返回 false 后的缓冲长度，忽略时它应持续增长。改成等待 drain 或改用 pipeline 后，缓冲应停在阈值附近，并在错误时两端都结束。'
      }
    ]
  },
{
    track:'frontend',
    group:'Node.js',
    id:'node-emitter',
    title:'EventEmitter 的同步派发与错误',
    prompt:'emit 之后才打印日志，监听器会先执行吗？',
    core:'EventEmitter 通常按注册顺序同步调用监听器，emit 返回后才继续执行调用方后续代码。once 只监听下一次事件；未处理的 error 事件有特殊失败行为。顺序是：emit 时按注册顺序同步调用当前监听器，全部返回后 emit 才返回，后面的代码才继续。边界是：这不是事件循环里的下一轮任务。once 在第一次调用后移除。error 没有监听器时有特殊失败行为，不能靠事后补一个监听来接住已经发出的错误。监听器里再 emit 同一个事件，要防止同步递归堆爆栈。在 emit 前后各打一条日志，监听器应夹在中间。它不在下一次事件循环。error 另算。',
    why:'错把 emit 当成异步队列，就会以为 emit 后面的日志先打印、监听器稍后才跑。实际监听器在 emit 返回前已经按注册顺序跑完。能分开的信号是：日志是夹在 emit 前后，还是出现在 emit 返回之后。',
    example:'先 on("ready", () => log("handler"))，再 log("before")、emit("ready")、log("after")。输出是 before、handler、after。handler 出现在 emit 返回之前，不是下一轮。',
    task:'给同一事件注册两个 on 和一个 once，连续 emit 两次并记录顺序；再测试 error 事件。',
    answer:'两个 on 按注册顺序在每次 emit 里同步执行，所以两次 emit 都会看到它们。once 只在第一次 emit 里运行，第二次不再出现。error 事件如果没有监听器，会按 EventEmitter 的错误路径失败，不能当成普通事件等着有人稍后订阅。',
    keywords:'Node.js EventEmitter emit on once error 同步事件',
    deep:[
      {
        title:'同步调用栈',
        body:'emit 不把监听器排进队列。调用栈上先跑完监听器，再回到 emit 后面的那一行。把监听器里的日志理解成“稍后”，会把异常边界和顺序都判错。once 第二次就没有了。'
      },
      {
        title:'怎样自己验证',
        body:'给同一事件注册两个 on 和一个 once，连续 emit 两次并打印。核对两次都有 on、once 只有一次，且都发生在 emit 返回前。再 emit("error") 且不监听，确认失败路径和普通事件不同。'
      }
    ]
  },
{
    track:'frontend',
    group:'Node.js',
    id:'node-buffer',
    title:'Buffer 的字节与初始化边界',
    prompt:'Buffer.allocUnsafe(10) 的十个字节为什么不能直接发给客户端？',
    promptAnswer:'Buffer.alloc(8) 会把 8 个字节填成 0，读出来是确定的。Buffer.allocUnsafe(8) 只分配，不保证清掉原来的内存，未写满就发给别人可能带出残留字节，所以对外使用前要写满，或再 fill。',
    core:'Buffer 表示原始字节；alloc 初始化内存，而 allocUnsafe 分配的内容未初始化。未写满就发送可能泄露残留数据。文本解码还需要明确编码与字节边界。顺序是：需要确定内容时用 alloc 或写满后再使用；allocUnsafe 只保证长度，不保证字节值。边界是：没写到的下标仍可能留着进程里的旧数据，直接发给客户端就是泄露。UTF-8 里一个字符可以占多个字节，按字符串 length 去切 Buffer 会切断字符。解码时还要处理落在边界上的半个字符。发出去之前逐字节核对。没写过的位置不能假设是 0，除非用的是 alloc 或已经 fill。',
    why:'错把字符串长度当成字节长度，或者把 allocUnsafe 的缓冲区直接发出去，未写满的字节可能带上残留数据。客户端收到的不是你以为的那 10 个零。能分开的信号是：这块内存有没有被填满或显式填零。',
    example:'Buffer.alloc(8) 的每个字节都是 0。Buffer.allocUnsafe(8) 在写入前打印，可以看到非零残留。字符串“中”的 length 是 1，Buffer.byteLength 按 UTF-8 得到的字节数大于 1。',
    task:'比较 Buffer.alloc(8) 与 Buffer.allocUnsafe(8) 的初始化保证，再测一个中文字符串的字节长度。',
    answer:'Buffer.alloc(8) 保证 8 个字节都被填成 0，可以直接作为已知内容使用。Buffer.allocUnsafe(8) 不保证内容，发出去之前必须写满 8 个字节，或改用 alloc 与 fill。只写了前几个字节就发送，其余字节可能是旧数据。字符数不能代替 UTF-8 字节数。',
    keywords:'Node.js Buffer UTF-8 allocUnsafe bytes 字节',
    deep:[
      {
        title:'长度不是内容',
        body:'alloc 会填零。allocUnsafe 只给你一块指定长度的内存。没被你的写入覆盖的字节不能外发。文本进出 Buffer 时用明确编码，并用 byteLength 而不是字符串 length 计算大小。'
      },
      {
        title:'怎样自己验证',
        body:'分别打印 alloc(8) 和刚分配的 allocUnsafe(8)。前者应为 0。后者在写满前不要发送。再对“中”比较字符串 length 和 Buffer.byteLength，确认字节数更大，按字符下标去 slice 会切坏编码。'
      }
    ]
  },
{
    track:'frontend',
    group:'Node.js',
    id:'node-nexttick',
    title:'Node 的 nextTick 与微任务',
    prompt:'把 nextTick 理解成浏览器微任务，为什么会误判执行顺序？',
    promptAnswer:'先标出同步打印，它一定在两个队列之前。再分别看 nextTick 队列和 Promise 微任务队列，不要把它们合成浏览器那一张图。',
    core:'Node 有 next tick 队列与 Promise/queueMicrotask 使用的微任务队列。它们在不同模块上下文中的相对顺序可能不同，递归排入 nextTick 还会延迟事件循环推进。顺序是：当前栈先跑完，再按 Node 当时的规则排空 next tick 与微任务，然后事件循环才继续。边界是：这两种队列不是同一个队列，模块求值上下文可能改变它们的相对顺序。递归 nextTick 会一直占用检查点，I/O 和定时器进不来。浏览器里微任务与渲染的关系不能原样画到 Node 上，换版本或换模块格式都要重新打日志。换一种模块格式就要重新记录，不能把上一次的顺序写成 Node 的固定规则。',
    why:'错把 process.nextTick 当成浏览器里的 queueMicrotask，同一段日志顺序被抄到另一种模块格式里就会对不上。递归 nextTick 还会饿死后续 I/O。能分开的信号是：这段代码跑在 CommonJS 还是 ES Module，以及队列有没有被递归填满。',
    example:'在 CommonJS 顶层和 ES Module 顶层各跑一次：同步打印、nextTick 打印、queueMicrotask 打印。两种模块格式下，nextTick 和微任务的相对顺序可能不同，不能拿一次结果代表另一次。',
    task:'分别在 CJS 与 ESM 运行同一组 nextTick、Promise.then 和同步日志，记录顺序。',
    answer:'先标出同步打印，它一定在两个队列之前。再分别看 nextTick 队列和 Promise 微任务队列，不要把它们合成浏览器那一张图。同一组调用在 CommonJS 和 ES Module 顶层可能顺序不同。递归只往 nextTick 里加回调时，事件循环推不到定时器和 I/O。结论不要从一个文件推广到所有入口。',
    keywords:'Node process.nextTick queueMicrotask Promise event loop',
    deep:[
      {
        title:'两个队列',
        body:'nextTick 和 queueMicrotask 不在同一条队列里。谁先谁后还跟当前是 CommonJS 还是 ES Module 有关。把一次顶层日志背成固定口诀，换一个入口就会判错后续 I/O 的时机。'
      },
      {
        title:'怎样自己验证',
        body:'同一组同步日志、nextTick 和 Promise.then 分别用 CommonJS 和 ES Module 运行，记下顺序是否一致。再在 nextTick 里继续排 nextTick，确认定时器回调迟迟不执行。'
      }
    ]
  },
{
    track:'frontend',
    group:'网络与安全',
    id:'http-compression',
    title:'HTTP 压缩协商与缓存',
    prompt:'服务器对同一 URL 返回 gzip 和未压缩版，缓存怎样区分？',
    core:'客户端用 Accept-Encoding 声明可接受的内容编码，服务端用 Content-Encoding 说明实际响应编码。若同一 URL 按该请求头变化，缓存应依据 Vary: Accept-Encoding 区分表示。顺序是：客户端用 Accept-Encoding 说出能接受的编码，服务器选一种并写上 Content-Encoding，缓存根据 Vary 决定哪些请求头参与区分表示。边界是：没有 Vary 时，同一 URL 的不同编码可能被当成同一份缓存。已经压缩的图片再套一层通用压缩往往收益很小。HTML 这类文本更适合压缩，但缓存键必须把编码算进去。',
    why:'错把同一 URL 的压缩版和未压缩版放进同一个缓存项，后一个用户会拿到自己解不了的那一份。协商失败表现为乱码或重复下载。能分开的信号是：响应有没有 Vary: Accept-Encoding。',
    example:'第一个客户端接受 gzip，缓存记下压缩正文。第二个客户端不接受 gzip，若缺少 Vary，缓存把 gzip 正文交给它，客户端无法按明文解码。带上 Vary 后，两份表示分开存放。第二个客户端收到的应是自己能解码的那一份。',
    task:'对比浏览器发送 Accept-Encoding、服务端的 Content-Encoding 与 Vary，解释缓存键。',
    answer:'Accept-Encoding 是客户端声明能收的编码，Content-Encoding 是这份响应实际用的编码。缓存若按 URL 区分，必须再看 Vary 里列出的请求头。Vary 包含 Accept-Encoding 时，gzip 和未压缩是两个表示，不能混用。编码是表示的一部分，不是可选的传输装饰。',
    keywords:'HTTP compression gzip br Accept-Encoding Content-Encoding Vary',
    deep:[
      {
        title:'表示不止 URL',
        body:'同一 URL 可以有 gzip 和明文两种表示。缓存只看 URL 时会把其中一种交给不能解码的客户端。Vary 告诉缓存：Accept-Encoding 不同，就要分开放。'
      },
      {
        title:'怎样自己验证',
        body:'用两个请求访问同一 URL，一个接受 gzip，一个不接受。看两份响应的 Content-Encoding 是否不同，以及响应头有没有 Vary: Accept-Encoding。去掉 Vary 后再看缓存是否把压缩正文交给了第二个客户端。'
      }
    ]
  },
{
    track:'java',
    group:'JVM',
    id:'jvm-areas',
    title:'JVM 运行时数据区：规范与实现',
    prompt:'JVM 的程序计数器是不是 CPU 寄存器里“下一条机器指令地址”？',
    core:'JVM 规范定义每个线程有自己的 pc 寄存器：执行非 native 方法时记录当前 JVM 指令地址；执行 native 方法时其值未定义。它是抽象机的运行时数据区，不应直接等同 CPU 物理程序计数器。虚拟机栈、堆和方法区也需按规范与具体实现区分。顺序是：先按规范画出线程私有的 pc 和虚拟机栈、线程共享的堆和方法区，再对照正在用的虚拟机说明这些区域落在哪里。边界是：pc 在执行 Java 方法时指向 JVM 指令，执行 native 方法时未定义，它不是 CPU 的程序计数器。调优参数和溢出报错必须绑定具体实现，不能把一张混合了硬件和抽象机的图当成诊断依据。',
    why:'错把 JVM 的 pc 寄存器当成 CPU 里的下一条机器指令地址，排障时会去看硬件计数器，而栈帧和堆才是这次失败所在的抽象区域。能分开的信号是：这个名字来自规范里的逻辑区域，还是来自某个虚拟机的实现布局。',
    example:'调用一个 Java 方法时，当前线程出现新的栈帧，pc 记录的是这条方法里的 JVM 指令，不是 CPU 指令。对象分配出现在堆的实现里。类的元数据放在方法区语义下，具体占用哪块内存要看这个虚拟机。不要把这张图和 CPU 寄存器画在一起。',
    task:'画出线程私有与共享区域，并标注哪些是 JVM 规范定义、哪些是特定虚拟机实现。',
    answer:'每个线程有自己的 pc 和 Java 虚拟机栈，栈帧随方法调用创建。堆和方法区由线程共享，对象通常在堆上，类的相关结构属于方法区语义。这些是规范里的逻辑区域。某个虚拟机把方法区放在哪块物理内存、用什么参数调节，都是实现，不能写成规范本身。native 方法执行时 pc 的值未定义。',
    keywords:'JVM pc register stack heap method area 运行时数据区',
    origin:'《JVM内存区域划分.pdf》的运行时数据区章节',
    diagram:'diagrams/jvm-areas.svg',
    deep:[
      {
        title:'规范层',
        body:'JVM 规范描述可观察的逻辑区域与行为边界，例如 pc、虚拟机栈、堆和方法区。'
      },
      {
        title:'实现层',
        body:'具体虚拟机可以用不同内存布局和优化策略实现这些语义；调优参数与异常信息需要绑定实际实现及版本。'
      }
    ]
  },
{
    track:'java',
    group:'JVM',
    id:'java-classloading',
    title:'类加载器与类身份',
    prompt:'两个同名同字节码类为什么可能不能互相强转？',
    core:'Java 类的运行时身份涉及类的二进制名称和定义它的类加载器。常见类加载器按父委派寻找类，但自定义加载器可改变加载路径；仅看类名不足以判断是否同一类型。顺序是：需要类型时先由定义它的加载器决定身份，再谈类名是否相同；常见加载器先委派给父加载器，父加载器没有才自己定义。边界是：自定义加载器可以打破你以为的唯一性。同名同类文件被两个加载器各加载一次，就得到两个 Class。强转、静态字段和单例都按这个身份分开，不会因为源码长得一样就合并。静态字段和单例也按加载器分开。字节码文件相同，不会自动合成一个 Class。强转失败就去比加载器，而不是去改类名。再打印。',
    why:'错把类名相同当成类型相同，两个加载器各定义一份 com.demo.User 时，强转会失败。插件和热更新问题被误判成普通的类型写错。能分开的信号是：两个 Class 对象的定义加载器是不是同一个。',
    example:'加载器 A 和 B 各自 define 一份字节码相同的 com.demo.User。两个 Class 的名字都打印成 com.demo.User。把 A 的实例交给只接受 B 的类型的变量，运行时抛出 ClassCastException。',
    task:'用两个自定义加载器加载同一类，打印各自 ClassLoader 并尝试转换。',
    answer:'先比定义类加载器，再比类名。加载器不同，即使字节码一样也是两种类型，强转失败。类名相同不能作为转换成功的依据。父委派只说明常见查找会先问父加载器，自定义加载器仍可以改变这条路径。隔离插件时应预期它们的同名类不能互相赋值。打印加载器引用，不要只打印类名。',
    keywords:'Java ClassLoader delegation type identity 类加载器',
    diagram:'diagrams/jvm-class-identity.svg',
    deep:[
      {
        title:'名字加加载器',
        body:'运行时类型身份包含定义加载器。只打印 getName 会看到相同字符串。比较两个 Class 的 getClassLoader，不同就不要强转。父委派是常见查找顺序，不是类型相同的证明。'
      },
      {
        title:'怎样自己验证',
        body:'用两个自定义加载器加载同一份类文件，打印各自的 ClassLoader，并尝试把一个实例转成另一个加载器定义的类型。应看到名字相同但转换失败。再让其中一个委派给另一个，确认只会定义一次。'
      }
    ]
  },
{
    track:'java',
    group:'Java 基础',
    id:'java-stream',
    title:'Stream 懒执行与副作用（JDK 8）',
    prompt:'只调用 map 却没有终端操作，转换函数会运行吗？',
    core:'Stream（java.util.stream）是延迟执行的流水线。map、filter 这些中间操作只是串起来，不立刻跑；collect、findFirst 这些终端操作才开始拉元素。没有终端操作，map 里的函数一次都不运行。findFirst 会短路，只处理需要的前缀。不要在中间操作里改外部变量。',
    example:'list 含 1、2、3。只调用 stream().map(x -> { log(x); return x * 2; })，日志不出现。接上 collect 后，1、2、3 都打印。把终端改成 findFirst，往往只打印 1。',
    task:'给 Stream 加 filter、map、findFirst 和日志，观察哪些元素真正经过各步。',
    answer:'filter、map 都是中间操作，在 findFirst 这种终端操作启动前不会为了副作用跑完整表。findFirst 短路，找到第一个符合的元素就可以停，后面的元素可能不经过 map。因此日志里出现的只是需要的前缀，不是整份列表。不要把中间操作写成必然会执行固定次数。',
    keywords:'Java Stream JDK 8 lazy intermediate terminal short circuit 懒执行',
    deep:[
      {
        title:'拉的时候才算',
        body:'中间操作只是描述。终端操作才拉动流水线。短路让拉动提前停。副作用若写在 map 或 peek 里，次数会随短路、并行和实现变化，不能当成业务步骤。次数不稳定，就不要拿它做计数。'
      },
      {
        title:'怎样自己验证',
        body:'给 map 加日志，先不接终端操作，确认没有日志。再接 collect，确认每个元素都出现。换成 findFirst 或 limit，确认后面的元素不再打印。最后不要依赖这些日志去改外部计数器。'
      }
    ]
  },
{
    track:'java',
    group:'并发',
    id:'java-interrupt',
    title:'线程中断是协作信号',
    prompt:'调用 Thread.interrupt() 会立即“杀死”目标线程吗？',
    core:'interrupt 是中断请求，不是强制终止。部分阻塞方法抛 InterruptedException 并清除中断标志；普通计算代码需主动检查并决定退出或继续。吞掉异常会丢失取消信号。顺序是：调用 interrupt 设置取消请求；阻塞在可中断方法上的线程抛出 InterruptedException 并清除标志；普通循环必须自己看 isInterrupted 并决定返回。边界是：没有检查点的纯计算不会马上停。捕获后既不恢复标志也不退出，池和调用方都失去取消信号。关闭线程池依赖的就是这条约定，吞掉一次中断会让关闭一直等待。恢复标志或继续抛，二选一，不要只打印。',
    why:'错把 interrupt 当成立刻杀死线程，目标还在纯计算里时会继续跑完当前逻辑。吞掉 InterruptedException 之后，取消信号也没了，线程池以为任务还在正常工作。能分开的信号是：代码有没有在循环里看中断标志，或在捕获后恢复标志。',
    example:'任务在循环里 sleep。另一个线程调用 interrupt。sleep 抛出 InterruptedException 并清掉标志。catch 里若只打印然后继续 sleep，任务不退出。catch 里恢复标志并 break，循环结束。',
    task:'写一个 sleep 循环任务，调用 interrupt 后比较“直接吞异常”与“退出并恢复标志”的结果。',
    answer:'interrupt 不会强行拆掉正在跑的普通计算，它只是把取消请求送到对方。sleep 这类阻塞会抛 InterruptedException 并清除标志，所以捕获后若还要让上层知道，必须恢复中断标志或继续抛。直接吞掉异常再循环，任务看起来还活着。退出还是继续，由任务自己的契约决定，但不能假设线程已经被杀死。',
    keywords:'Java Thread interrupt InterruptedException cancellation 中断',
    deep:[
      {
        title:'请求不是杀死',
        body:'interrupt 只送达请求。可中断的阻塞会抛异常并清标志。不算阻塞的代码要自己轮询标志。吞掉异常等于把请求擦掉，上层再看 isInterrupted 已经是 false。'
      },
      {
        title:'怎样自己验证',
        body:'写一个 sleep 循环，启动后调用 interrupt。一种 catch 只打印并继续，线程应仍在跑。另一种恢复中断标志并跳出循环，线程应结束。再在纯计算循环里不检查标志，确认它不会立刻停。'
      }
    ]
  },
{
    track:'java',
    group:'并发',
    id:'java-future-errors',
    title:'CompletableFuture 的错误恢复（JDK 8）',
    prompt:'whenComplete 打印了异常，后续阶段就恢复正常了吗？',
    core:'CompletableFuture（**JDK 8**）里，whenComplete 主要观察完成结果，通常不会把原有异常替换成正常值；exceptionally 可从异常产生替代结果，handle 同时接收结果与异常并计算新结果。不同 *Async 方法还涉及执行器选择。顺序是：前一阶段异常完成后，whenComplete 能看见它但不替换它；exceptionally 只在异常时计算替代结果；handle 无论成败都计算一个新结果。边界是：打印栈不会改变完成状态。替代函数若再抛，链继续异常。*Async 变体把回调放到执行器上，默认执行器和业务池不是一回事，阻塞回调会占住池里的线程。下游是成功还是失败，看替代值有没有返回，不看日志里有没有栈。',
    why:'错把 whenComplete 里打印了异常当成链已经恢复，后面的 join 仍会抛出原来的失败。日志有了，结果没有。能分开的信号是：这一步是在观察异常，还是返回了一个替代值，看 join。',
    example:'supplyAsync 里抛出 IllegalStateException。whenComplete 打印了原因，接着 join 仍然抛出这个异常。在 whenComplete 前面接 exceptionally 返回 0 之后，join 得到 0，不再抛。',
    task:'分别用 whenComplete、exceptionally、handle 处理同一个失败 Future，观察下游完成状态。',
    answer:'whenComplete 观察失败，不把结果换成成功，下游仍然异常完成。exceptionally 在失败时返回替代值，下游变成成功。handle 同时拿到结果和异常，由返回值决定下游是成功还是继续失败。记录日志本身不等于恢复。选 *Async 时还要看回调跑在哪个执行器上。',
    keywords:'CompletableFuture whenComplete exceptionally handle async errors',
    deep:[
      {
        title:'观察、替代、变换',
        body:'whenComplete 适合记日志，原异常继续往下传。exceptionally 把失败换成一个值。handle 两边都要写：有异常时的替代，以及正常值要不要改。返回后的完成状态看这个返回值，不看有没有打印。'
      },
      {
        title:'怎样自己验证',
        body:'用同一个失败的 supplyAsync 分别接 whenComplete、exceptionally 和 handle。对每条链 join 或看 isCompletedExceptionally。只有返回了替代值的那几条应正常完成，只打印的那条应仍然失败。'
      }
    ]
  },
{
    track:'java',
    group:'并发',
    id:'java-concurrent-map',
    title:'ConcurrentHashMap 的复合操作（JDK 8 compute*）',
    prompt:'先 get，发现没有，再 put，就保证只初始化一次吗？',
    core:'即使用线程安全 Map，两次独立操作之间也可能被其他线程插入。需要单个原子复合操作，如 putIfAbsent 或 ConcurrentHashMap.computeIfAbsent（**JDK 8** 起的 compute 族）；映射函数应保持简短且避免递归修改同一 Map。顺序是：需要“缺席才计算并放入”时调用一次复合方法，让映射表在这个键上串行完成检查和插入。边界是：两次独立的 get 与 put 之间，别的线程可以插入。映射函数里再调用同一个 Map 的更新可能死锁或重入。函数返回 null 通常表示不放入，已经产生的副作用不会自动撤销。线程安全的单个方法不会把你外面的一段业务事务变原子。再统计创建次数。',
    why:'错把线程安全的 get 和 put 当成合在一起也安全，两个线程都看到缺键，就会各创建一次昂贵对象并互相覆盖。容器安全不等于业务复合操作安全。能分开的信号是：创建函数是不是放进了单次原子方法里。',
    example:'两个线程同时对同一键 get，都得到 null，然后都 new 一个连接并 put。创建函数跑了两次，Map 里只留下后放入的那一个，前一个连接被丢掉。改成 computeIfAbsent 后，这个键只创建一次。',
    task:'并发运行两个初始化任务，统计创建函数调用次数并检查最终值。',
    answer:'用 putIfAbsent 或 computeIfAbsent 把“没有才放入”收成一次原子操作，不要自己 get 再 put。computeIfAbsent 的函数应短，不要再去改同一个 Map，也不要把失败吞掉后返回一个不完整的值。函数抛错时键不应留下半成品。空返回和副作用都要按这个方法的约定处理，而不是按单线程的 if 来写。',
    keywords:'ConcurrentHashMap computeIfAbsent putIfAbsent atomic 复合操作',
    deep:[
      {
        title:'复合操作要一次做完',
        body:'get 原子、put 也原子，两步合起来不是原子。两个线程可以同时看见缺席。putIfAbsent 和 computeIfAbsent 把检查和放入放进同一次调用。函数里不要再递归改这张表。'
      },
      {
        title:'怎样自己验证',
        body:'两个线程同时对空 Map 的同一键做 get 后创建再 put，统计创建次数，应可能大于 1。改成 computeIfAbsent 后再跑，创建次数应为 1，最终值只有一个。让函数抛错，确认键没有留下半成品。'
      }
    ]
  },
{
    track:'java',
    group:'并发',
    id:'java-reentrant-lock',
    title:'显式锁与 try/finally',
    prompt:'使用 ReentrantLock 时，异常会自动释放锁吗？',
    core:'Lock 接口不会因为离开作用域自动释放。成功获取锁后应在 finally 中 unlock；tryLock 可以避免无限等待或执行替代路径。公平锁配置也不意味着所有获取方式都严格排队。顺序是：lock 或 tryLock 成功之后才进入保护区，保护区用 try，finally 里 unlock。边界是：Lock 不会因为方法返回或抛异常而自动释放。没拿到锁就 unlock 是错误。tryLock 可以超时失败并去做别的事，这条路径上没有锁要放。公平锁只约束它声明要排队的获取，不能把所有重入和试锁都理解成严格排队。没拿到就不要放。finally 只包已经持有的那一段。',
    why:'错把 ReentrantLock 当成离开代码块就会释放，更新抛异常后另一个线程会一直停在 lock 上。公平参数也被当成所有获取方式都在排队。能分开的信号是：unlock 是不是放在成功获取之后的 finally 里。',
    example:'线程 A 执行 lock，进入 try 后抛异常，finally 里 unlock。线程 B 随后能拿到同一把锁。去掉 finally 后，B 在 lock 上一直等待，A 已经结束。B 的等待因此结束。',
    task:'让更新函数抛异常，比较有无 finally 时另一线程能否获得同一锁。',
    answer:'先成功获取锁，再进入更新。更新抛异常时，finally 仍会 unlock，另一线程才能拿到锁。若 lock 或 tryLock 没有成功，不要调用 unlock，否则会把没持有的锁释放错。tryLock 失败时应走替代路径，而不是继续更新。公平构造参数也不表示每一种获取都会严格按队列来。',
    keywords:'Java ReentrantLock tryLock unlock finally fairness 显式锁',
    deep:[
      {
        title:'获取成功才释放',
        body:'unlock 必须配对成功的获取。异常跳过 unlock 时，其他线程永久等待。tryLock 返回 false 时不要解锁。把 unlock 放在 finally 里，并放在确认已经持有之后。'
      },
      {
        title:'怎样自己验证',
        body:'让持锁线程在更新时抛异常。有 finally 时，另一线程应能在随后拿到锁。去掉 finally 后，另一线程应一直阻塞。再让 tryLock 失败，确认这段路径没有调用 unlock。'
      }
    ]
  },
{
    track:'java',
    group:'框架',
    id:'spring-scopes',
    title:'Spring Bean 作用域与共享状态',
    prompt:'给一个 Spring Bean 标了 singleton，就等于它的字段线程安全吗？',
    core:'Spring singleton 表示同一容器中该 Bean 定义通常对应一个共享实例，不提供字段的并发保护。prototype 是按获取创建实例；request 等作用域绑定 Web 上下文。作用域决定实例生命周期，不直接决定业务状态安全。顺序是：先看 Bean 在容器里有几个实例、活多久，再看状态放在实例字段还是调用栈上。边界是：singleton 表示通常只有一个共享实例，不表示字段有锁。request 作用域绑在 Web 请求上，离开请求就不能拿。把请求数据放进单例字段，会在并发时互相覆盖。改注解代替不了把状态移出共享对象。并发时字段会互相覆盖，这不是事务能补上的。',
    why:'错把 singleton 当成字段也会线程安全，两个请求把 currentUser 写进同一个 Bean 字段，后一个请求会读到前一个用户。作用域只决定有几个实例。能分开的信号是：这份数据放在方法栈上，还是放在共享实例的字段里。',
    example:'singleton Service 有字段 currentUser。请求甲把它设成甲，请求乙在甲还没读完时设成乙。甲随后用这个字段下单，订单落在乙的名下。改成方法参数后，两笔订单各归各的用户。订单上的用户与请求一致。',
    task:'检查一个 Service 是否把 currentUser 存为成员字段，并设计并发请求测试。',
    answer:'共享 Bean 的可变字段会被并发请求交替读写，只标 singleton 不提供同步。这一次请求的表单数据、当前用户这类请求数据应放在方法参数、局部变量或请求作用域里，不要放进单例字段。prototype 是每次获取新建，也不是“字段自动安全”。并发测试要同时发两个请求，看结果有没有串用户。',
    keywords:'Spring bean singleton prototype request scope thread safety',
    deep:[
      {
        title:'作用域不是锁',
        body:'singleton 是一个共享实例。它的字段对所有请求可见。prototype 每次取一个新实例，也不保护你后来放进别的单例里的那个引用。请求数据放在参数和局部变量上才跟请求走。'
      },
      {
        title:'怎样自己验证',
        body:'给 Service 加一个 currentUser 字段，并发发两个用户的请求，看是否出现串用户。把该值改成方法参数后再发，两笔结果应各自正确。再确认这个 Bean 的作用域注解并没有代替这次修改。'
      }
    ]
  },
{
    track:'java',
    group:'数据库',
    id:'mysql-deadlock',
    title:'InnoDB 死锁与整笔事务重试',
    prompt:'出现死锁后，只重发最后一条 UPDATE 就够了吗？',
    core:'InnoDB 检测到死锁时会回滚一个受害事务；应用需要重试整笔事务，而不是只补最后一条语句。锁等待超时的默认回滚范围又可能不同，应按错误类别处理。顺序是：发现死锁就认定受害事务整笔作废，从业务入口重新执行整个事务，而不是从失败的那条语句续上。边界是：另一类锁等待超时不一定按同样范围回滚，要看错误码。重试必须有次数上限和退避，否则两个事务会反复按相反顺序撞上。统一更新顺序、缩短持锁时间，比无限重试更能减少死锁。从业务入口再读再写。只补最后一条 UPDATE，会在订单已经消失时把余额再改一次。重试有次数上限。相反的加锁顺序不改，重试只会再撞上。整笔重来。再跑。',
    why:'错把死锁后的重试当成只重发最后一条 UPDATE，前面已经回滚的写入不会还在。订单行丢了，余额更新却被单独再执行一次。能分开的信号是：错误是整笔事务回滚，还是只回滚了其中一条语句。',
    example:'T1 先更新行 A 再更新行 B，T2 先更新行 B 再更新行 A。死锁后其中一个事务整笔回滚，A 和 B 都回到它开始前。只重发最后一条 UPDATE，会在没有订单的情况下改余额。整笔重跑后，订单和余额要么一起在，要么一起不在。',
    task:'用两个连接反向更新两行制造死锁，记录受害事务状态和重试结果。',
    answer:'捕获死锁错误后，按有界次数和退避重跑整笔事务：重新读取，再按同一顺序完成全部写入。不要只重放最后一条语句，因为受害事务的前面几条也已经撤销。同时把两个事务改成相同的加锁顺序，并缩短事务，减少再撞上的机会。锁等待超时的回滚范围可能不同，要按错误种类分开处理。',
    keywords:'MySQL InnoDB deadlock retry transaction rollback 死锁',
    origin:'本地库《图解系统》交叉加锁死锁示例页（对照加锁顺序；重试语义以 InnoDB 文档为准）',
    diagram:'library-assets/illustrated-basics/os-p0245.png',
    deep:[
      {
        title:'整笔作废',
        body:'死锁牺牲者的事务全部回滚，包括已经执行过的前几条语句。只重发最后一条，会把业务做成一半新、一半旧。重试要从读取和判断重新开始，并限制次数。看事务开始后的每一条写入，不只看报错的那一句。'
      },
      {
        title:'怎样自己验证',
        body:'开两个连接，按相反顺序更新同一对行，直到出现死锁。看受害事务里前面的更新是否也消失了。只重发最后一条应得到不完整结果。整笔重试且顺序一致后，两边应都能完成或有界失败。'
      }
    ]
  },
{
    track:'java',
    group:'缓存',
    id:'redis-persistence',
    title:'Redis 持久化与数据丢失窗口',
    prompt:'打开 AOF 后，Redis 每次写成功都意味着磁盘绝不会丢数据吗？',
    core:'Redis 的 RDB 是时间点快照，AOF 记录写操作；实际持久性取决于 fsync 策略、重写、故障方式和部署。不能只凭“开启 AOF”承诺零丢失。顺序是：先写这份数据允许丢多少、能不能重建，再选 RDB 快照或 AOF 以及 fsync 频率。边界是：开启 AOF 不等于每次命令都已经落盘。重写、宕机和磁盘故障都会留下不同窗口。缓存可以丢，因为权威在数据库。账务不能把 Redis 的本机持久化当成唯一记录。恢复演练要真的杀掉进程看文件里少了什么。缓存丢了可以重建。账务少了一笔就不能用“已经开了持久化”来解释，权威记录应在数据库事务里。先写能丢多少。',
    why:'错把打开 AOF 当成每次写成功都已经在磁盘上，崩溃仍可能丢掉最近一段已确认的写入。库存若只活在 Redis 里，这段窗口就是账对不上。能分开的信号是：fsync 策略允许丢多久，以及这份数据能不能从权威库重建。',
    example:'AOF 每秒同步。写入在进程确认之后、下一次 fsync 之前断电。重启后这不足一秒的写入不在文件里。商品缓存可以从数据库装回来；同一窗口里的扣减若只写了 Redis，就会丢。重启后缺失的键要能说出来自哪一种 fsync 窗口。',
    task:'为可重建商品缓存与不可重复扣减的账务记录分别选择权威数据源和恢复策略。',
    answer:'商品详情缓存可以由数据库重建，Redis 持久化只是加速，丢一段可以接受。不可重复的扣减和账务必须以有事务保证的权威库为准，不能把“开了 AOF”当成零丢失。每秒 fsync 仍有最近一小段窗口。恢复目标要先写明能丢多少，再选 RDB、AOF 或干脆不把 Redis 当权威。',
    keywords:'Redis RDB AOF fsync durability persistence 持久化',
    deep:[
      {
        title:'策略决定窗口',
        body:'RDB 丢的是上次快照之后的写入。AOF 丢多少取决于多久 fsync 一次。每秒同步仍可能丢最近一秒。没有一种开关等于绝对不丢，尤其不能拿来当唯一账本。窗口大小跟 fsync 频率走。'
      },
      {
        title:'怎样自己验证',
        body:'在测试实例写入一批键后立刻停掉进程，再启动，核对哪些键还在。对缓存键，确认能从数据库装回。对扣减，确认权威余额在数据库事务里，Redis 里的数字丢掉也不改变账。'
      }
    ]
  }
];

const COVERAGE_POINTS = {
  'css-cascade':['来源、重要性与层叠层','选择器权重和作用域距离','样式覆盖的调试顺序'],
  'css-stacking':['哪些属性建立层叠上下文','子元素 z-index 的局部边界','弹层遮挡的排查路径'],
  'css-flex':['flex-basis 的初始尺寸','grow 与 shrink 的分配','自动最小尺寸和 min-width:0'],
  'fetch-abort':['AbortController 取消网络工作','旧响应覆盖新结果的竞态','提交结果时核对请求身份'],
  'http-methods':['安全方法与幂等方法','方法语义和实际业务副作用','失败重试与幂等键'],
  'http-range':['Range 与 206 部分响应','Content-Range 校验区间','资源变更时的续传安全'],
  'browser-storage':['localStorage 的同源范围','storage 事件只通知其他文档','跨标签页状态冲突'],
  'node-stream':['Writable.write 返回 false','drain 与生产者背压','pipeline 的错误和关闭处理'],
  'node-emitter':['emit 同步执行监听器','on 与 once 的生命周期','error 事件的特殊处理'],
  'node-buffer':['字符数与 UTF-8 字节数','Buffer.alloc 的初始化','allocUnsafe 的数据泄露边界'],
  'node-nexttick':['next tick 队列与微任务队列','CJS 和 ESM 的上下文差异','递归调度导致事件循环饥饿'],
  'http-compression':['Accept-Encoding 内容协商','Content-Encoding 响应编码','Vary 与缓存表示区分'],
  'jvm-areas':['JVM pc 寄存器不是 CPU 寄存器','线程私有的栈与栈帧','共享堆与方法区的规范语义'],
  'java-classloading':['类名与定义加载器组成身份','常见父委派查找路径','插件隔离与类型转换失败'],
  'java-stream':['中间操作的懒执行','终端操作与短路','副作用不可依赖固定执行次数'],
  'java-interrupt':['interrupt 是协作请求','InterruptedException 与标志清除','取消信号的传播与恢复'],
  'java-future-errors':['whenComplete 观察完成','exceptionally 替代失败结果','handle 统一处理正常和异常'],
  'java-concurrent-map':['线程安全单操作与业务复合操作','computeIfAbsent 原子计算','映射函数副作用和异常'],
  'java-reentrant-lock':['显式获取和释放锁','finally 防止异常泄锁','tryLock 与公平性边界'],
  'spring-scopes':['singleton 是容器内共享实例','prototype 与 request 生命周期','共享可变字段的并发风险'],
  'mysql-deadlock':['交叉加锁形成等待环','死锁回滚整笔事务','有界重试与统一加锁顺序'],
  'redis-persistence':['RDB 快照与 AOF 日志','fsync 策略决定丢失窗口','缓存与权威数据的恢复目标']
};

const COVERAGE_REFERENCES = {
  'css-cascade':[['MDN：CSS Cascade','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction'],['MDN：Specificity','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity']],
  'css-stacking':[['MDN：Stacking context','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context']],
  'css-flex':[['MDN：Flexbox 基础','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts'],['MDN：Flex 项比例','https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Controlling_flex_item_ratios']],
  'fetch-abort':[['MDN：AbortController','https://developer.mozilla.org/en-US/docs/Web/API/AbortController'],['MDN：Fetch API','https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch']],
  'http-methods':[['RFC 9110：HTTP Semantics','https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2']],
  'http-range':[['MDN：Range requests','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests'],['RFC 9110：Range Requests','https://www.rfc-editor.org/rfc/rfc9110.html#section-14']],
  'browser-storage':[['MDN：storage event','https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event'],['MDN：localStorage','https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage']],
  'node-stream':[['Node.js：Stream','https://nodejs.org/api/stream.html']],
  'node-emitter':[['Node.js：Events','https://nodejs.org/api/events.html']],
  'node-buffer':[['Node.js：Buffer','https://nodejs.org/api/buffer.html']],
  'node-nexttick':[['Node.js：process.nextTick','https://nodejs.org/api/process.html#processnexttickcallback-args']],
  'http-compression':[['MDN：Compression in HTTP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Compression']],
  'jvm-areas':[['JVM 规范：运行时数据区','https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-2.html#jvms-2.5']],
  'java-classloading':[['Oracle：ClassLoader','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/ClassLoader.html']],
  'java-stream':[['Oracle：Stream','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/Stream.html']],
  'java-interrupt':[['Oracle：Thread.interrupt','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Thread.html#interrupt()']],
  'java-future-errors':[['Oracle：CompletionStage','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/CompletionStage.html']],
  'java-concurrent-map':[['Oracle：ConcurrentHashMap','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html']],
  'java-reentrant-lock':[['Oracle：ReentrantLock','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html']],
  'spring-scopes':[['Spring：Bean Scopes','https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html']],
  'mysql-deadlock':[['MySQL 8.4：InnoDB Deadlocks','https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks.html'],['MySQL 8.4：Error Handling','https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html']],
  'redis-persistence':[['Redis：Persistence','https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/']]
};

for (const lesson of COVERAGE_LESSONS) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=COVERAGE_POINTS[lesson.id];
  window.LESSON_REFERENCES[lesson.id]=COVERAGE_REFERENCES[lesson.id];
}
