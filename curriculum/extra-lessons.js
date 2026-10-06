/* Original lessons selected from recurring topic areas in the private library.
   Source documents are never copied into this public file. */
window.LESSONS.push(
{
    track:'frontend',
    group:'语言基础',
    id:'js-equality',
    title:'相等、身份与 Object.is',
    prompt:'为什么 NaN !== NaN，而 React 会用 Object.is 比较某些值？',
    core:'=== 比较两个值是否严格相等，但 NaN 与自身不相等，+0 与 -0 相等。Object.is 对这两个边界给出不同结果。对象比较的是引用身份，而不是递归内容。顺序是：先看两边的类型和是否为特殊数字，再决定用哪条相等规则；对象不展开字段，只看是不是同一个引用。边界是：React 的依赖比较使用 Object.is，所以 NaN 与 NaN 会被当成没变，+0 换成 -0 会被当成变了。内容相同的两个对象每次渲染都是新引用，浅比较不会认为它们相等。依赖比较若用 Object.is，NaN 与 NaN 算没变，正零换成负零算变了。结构相同的新对象每次渲染都是新引用，浅比较不会当成相等。',
    why:'错把 === 当成覆盖所有相等，就会以为 NaN 能比出相等、+0 和 -0 能被分开。依赖数组因此漏掉更新或误触发。能分开的信号是：比较用的是 === 还是 Object.is，以及比的是值还是引用。',
    example:'Object.is(NaN, NaN) 得到 true，NaN === NaN 得到 false。Object.is(+0, -0) 得到 false，+0 === -0 得到 true。两次写出的 {} === {} 得到 false。',
    task:'预测 Object.is(+0,-0)、Object.is({}, {}) 和 1 === 1。',
    answer:'Object.is(+0, -0) 是 false，因为 Object.is 把正零和负零当成不同值。Object.is({}, {}) 是 false，两次字面量是两个引用。1 === 1 是 true，同一数字按严格相等成立。三个结果依次是 false、false、true。',
    keywords:'JavaScript Object.is equality identity',
    deep:[
      {
        title:'值和引用',
        body:'数字和字符串比的是值，对象和数组比的是引用。结构一样的两个对象仍然不相等。依赖数组里放对象，每次新字面量都会被看成变化。NaN 和正负零是两条例外，不要用 === 的结果去套 Object.is。'
      },
      {
        title:'怎样自己验证',
        body:'在控制台分别打印 NaN === NaN、Object.is(NaN, NaN)、Object.is(+0, -0) 和两次 {} 的比较。再把对象放进 useMemo 的依赖，看每次渲染是否都重算。'
      }
    ]
  },
{
    track:'frontend',
    group:'语言基础',
    id:'promise-chain',
    title:'Promise 链与错误传播',
    prompt:'then 回调抛错后，下一个 then 还能执行吗？',
    core:'then 会返回新的 Promise。回调返回普通值会使下一环完成；抛出异常会使下一环拒绝。catch 处理后若正常返回，链又进入完成态。顺序是：前一环完成才进成功回调，前一环拒绝才进失败回调，回调的返回值决定再下一环的状态。边界是：catch 不是终点。它返回的值会变成完成，后面的 then 仍执行；它再抛出，后面的 then 成功分支仍跳过。fetch 收到 404 时本身往往是完成，不会自动进 catch，要自己根据状态抛错。链上每一步的返回值决定下一步是完成还是拒绝。catch 打印后若没有再抛，后面的 then 仍会执行，不能把它理解成错误到此为止。',
    why:'错把 catch 当成链的终点，就会以为它后面的 then 不会再跑。catch 若正常返回，链回到完成态，后面的 then 仍会执行。能分开的信号是：拒绝处理器是继续抛，还是返回了一个普通值。',
    example:'Promise.resolve().then(() => { throw Error("x") }).catch(() => 2).then(console.log) 会打印 2。',
    task:'给第二个 then 与 catch 交换位置，判断哪一个回调会执行。',
    answer:'then 抛错后，下一个 then 的成功回调不执行，最近的 catch 执行。把 catch 换到第二个 then 前面时，仍然是先进入这个 catch。catch 若返回普通值，它后面的 then 会接到该值；若 catch 再抛，拒绝继续向后传。没有处理器时错误留在链的末尾。',
    keywords:'Promise then catch async error',
    deep:[
      {
        title:'恢复和继续拒绝',
        body:'catch 返回普通值，链回到完成，后面的 then 能接到这个值。catch 里再 throw，拒绝继续向后。打印日志但不返回，也会把链带回完成，后面的成功回调仍会跑。'
      },
      {
        title:'怎样自己验证',
        body:'写一条 then 抛错、catch 返回 2、再 then 打印的链，确认打印 2。把 catch 的返回改成 throw，确认最后的 then 不再打印。再交换 then 与 catch 的位置看谁先执行。'
      }
    ]
  },
{
    track:'frontend',
    group:'语言基础',
    id:'esm',
    title:'ES Module 与运行时依赖',
    prompt:'import 是把另一个文件的文字粘贴进来吗？',
    core:'ES Module 声明模块依赖和导入绑定。打包器可在构建期分析依赖图，浏览器也支持原生模块加载；最终如何分块和加载由工具配置决定。顺序是：先建立依赖图，再按依赖顺序求值每个模块一次，import 得到的是活绑定而不是把源码贴进来。边界是：循环依赖时，后执行的模块可能读到对方尚未初始化的导出。拆成多个 chunk 也不改变“每个模块只求值一次”的规则。配置决定分块，不决定语言层面的粘贴。先画出谁导入谁，再在顶层打印求值顺序。循环里先执行的模块读对方导出时，绑定可能还没有完成初始化，这和把源码粘贴两份不是同一件事。不要把 chunk 数量当成循环是否存在的证据。',
    why:'错把 import 当成把文件文字粘进当前文件，就会以为循环依赖只是复制了两份代码。实际模块只求值一次，后导入的绑定可能还是未初始化。能分开的信号是：看的是源码里的依赖箭头，还是运行时绑定已经赋值没有。',
    example:'main.js 导入 App.js，App.js 又导入 main.js 的常量。构建后可能仍是两个 chunk。循环里先执行的模块在对方求值完成前读到的是尚未初始化的绑定。构建分块改变不了求值次数。',
    task:'画出入口、UI 模块和工具模块的依赖箭头，并指出一个循环依赖。',
    answer:'箭头从导入方指向被导入方：入口指向 UI 模块，UI 模块指向工具模块。若工具模块再导入入口，或 A 导入 B 且 B 又导入 A，就构成循环。循环不等于把文字粘贴两遍，而是两个模块在求值完成前互相读绑定。分块只影响加载，不把循环消掉。绑定未初始化时读取会失败。',
    keywords:'ESM import export bundler Vite',
    deep:[
      {
        title:'图和求值不是一回事',
        body:'依赖箭头表示谁导入谁。执行时每个模块只跑一遍，循环里先开始的那个会在对方完成前继续执行。此时读取对方的绑定，可能还是未初始化。静态导入的绑定会在赋值后更新，但未初始化时读取会失败。'
      },
      {
        title:'怎样自己验证',
        body:'做 a.js 与 b.js 互相导入，在两边顶层打印并读取对方导出。看哪个日志在前，以及先执行的一方读到的值是不是还没赋值。再看构建产物被分成了几个 chunk。'
      }
    ]
  },
{
    track:'frontend',
    group:'浏览器',
    id:'http-cache',
    title:'HTTP 缓存与重新验证',
    prompt:'Cache-Control: no-cache 是“完全不存”吗？',
    core:'no-cache 允许保存响应，但再次使用前需要向服务器验证；no-store 表示不应存储。带版本号的静态资源可配置较长的新鲜期，HTML 则常需更及时的验证。顺序是：先看 Cache-Control 决定能不能存、要不要验证，再用 ETag 或 Last-Modified 发条件请求，未变化则 304。边界是：长缓存只适合文件名随内容变化的资源。HTML 若也被长缓存，用户会一直要旧的哈希文件。回滚时必须留得住旧 HTML 所引用的那些文件。哈希文件名变了才是另一份资源，所以脚本可以长缓存。HTML 必须更早验证，否则用户一直要旧的文件名。回滚时旧名字还要能取到。',
    why:'错把 no-cache 当成完全不存储，就会以为页面旧是因为浏览器没保存响应。实际副本还在，只是用之前没向服务器验证。能分开的信号是：响应头是 no-cache 还是 no-store，以及第二次请求是 304 还是直接命中。',
    example:'脚本 app.8f3a.js 带长新鲜期，刷新两次，第二次从缓存读取。index.html 为 no-cache 时，每次都带 ETag 验证，未变化则返回 304，正文仍用本地副本。文件名不变时旧副本会继续被使用。',
    task:'为带内容哈希的 JS 文件和入口 HTML 分别提出缓存策略，并解释回滚时的影响。',
    answer:'带内容哈希的 JS 可以长缓存，因为内容变了文件名就变。入口 HTML 用 no-cache 或很短的新鲜期，让用户尽快拿到新文件名。回滚时旧 HTML 指向的哈希文件必须还在，否则页面缺资源。no-cache 仍会保存，只是复用前要验证；不保存的是 no-store。',
    keywords:'HTTP Cache-Control ETag 304 cache',
    deep:[
      {
        title:'304 仍是命中',
        body:'304 表示服务器确认本地副本还能用，没有新的正文。页面应继续用缓存。把它当成失败再强制拉全量，等于把一次验证做成了两次传输。no-store 才是不留副本。no-cache 仍存储，no-store 才不留副本。'
      },
      {
        title:'怎样自己验证',
        body:'连续刷新两次带哈希的脚本，第二次应是缓存命中。再看 HTML 是否每次都向服务器确认，未变化时状态码是不是 304。把 HTML 改成长期新鲜后，应能复现一直拿到旧页面。'
      }
    ]
  },
{
    track:'frontend',
    group:'浏览器',
    id:'cors',
    title:'同源策略与 CORS',
    prompt:'前端设置 Access-Control-Allow-Origin 请求头就能跨域吗？',
    core:'同源策略由浏览器执行。允许跨源读取的 CORS 响应头由服务器返回；某些跨源请求会先发预检请求，服务器要声明允许的方法和请求头。顺序是：浏览器判断是不是简单请求，不是则先发 OPTIONS，服务器允许后再发实际请求，最后检查响应头才把正文交给脚本。边界是：请求到达服务器不等于脚本能读取。带凭据时允许的源不能是星号。前端请求头里写允许源不会改变浏览器的检查。简单请求可以先发出去，没有允许头时脚本仍读不到正文。非简单请求会先 OPTIONS。带凭据时允许的源不能写成星号，否则浏览器同样不把响应交给脚本。预检失败时实际请求不会发出；没有允许头时请求可能已经产生副作用，只是脚本读不到。',
    why:'错把 Access-Control-Allow-Origin 写在前端请求头上，就会以为跨域已经放行。浏览器只看服务器响应里的允许头，脚本仍然读不到正文。能分开的信号是：失败发生在预检 OPTIONS，还是发生在实际响应缺少允许源。',
    example:'页面在 https://app.example，请求 https://api.example。api 的响应没有允许 app 这个源时，Network 里能看到请求，控制台报跨域，脚本拿不到 JSON。',
    task:'在 Network 面板区分一次 OPTIONS 预检与实际请求。',
    answer:'OPTIONS 是预检，询问服务器是否允许后续的方法、请求头和源，它本身通常不是业务数据。预检通过后浏览器才发实际请求，业务数据在那一次响应里。请求上自己写 Access-Control-Allow-Origin 不起作用，允许与否看服务器返回的头。',
    keywords:'CORS Origin preflight OPTIONS credentials',
    deep:[
      {
        title:'读不到和没发出去',
        body:'没有允许头时，请求仍可能到达服务器并产生副作用，只是脚本读不到响应。预检失败则实际请求不会发出。这两类要在 Network 里分开看，不能都当成接口没写。看响应头，不要看请求上自己加的允许源。'
      },
      {
        title:'怎样自己验证',
        body:'在 Network 里筛选 OPTIONS。有预检时先看它的状态和允许的方法、头，再看后面的实际请求。没有预检时，直接看实际响应是否允许当前源。再试着把允许头写到请求上，确认仍然失败。'
      }
    ]
  },
{
    track:'frontend',
    group:'安全',
    id:'xss',
    title:'XSS、转义与内容安全策略',
    prompt:'把用户输入直接拼进 innerHTML 有什么风险？',
    core:'浏览器会把 innerHTML 解释为标记。未经可信净化的输入可能改变页面结构并运行攻击者控制的脚本。输出编码、避免危险 DOM 接口、可信净化和 CSP 是不同层面的防护。顺序是：先确定数据进入的是正文、属性、URL 还是脚本，再选用该上下文的编码；默认用文本接口。边界是：删掉 script 四个字母盖不住其他标签和事件属性。CSP 限制能执行的脚本来源，代替不了不要把不可信字符串送进 innerHTML。React 默认插值走文本，dangerouslySetInnerHTML 才相当于 innerHTML。CSP 限制脚本来源，代替不了文本接口。先选定上下文。',
    why:'错把“删掉 script 字样”当成已经安全，换一种标签或事件属性仍能执行。昵称进了 innerHTML 就会变成节点，而不是文字。能分开的信号是：同一串字符变成了文本节点，还是变成了元素。',
    example:'昵称是 <b>甲</b>。赋给 textContent 时，页面上能看见尖括号和 b。赋给 innerHTML 时，元素面板里出现 b 元素，可见文字只剩甲。事件属性 onclick 同样会被 innerHTML 解析成可执行标记。',
    task:'指出 textContent 与 innerHTML 对同一含尖括号字符串的不同处理。',
    answer:'同一串含尖括号的字符串交给 textContent，原样显示为文本，不创建元素。交给 innerHTML，按 HTML 解析，尖括号成为标记。不可信输入不能直接进 innerHTML。需要富文本时先做可信净化，并用内容安全策略限制脚本来源。',
    keywords:'XSS HTML escaping CSP security',
    deep:[
      {
        title:'上下文决定编码',
        body:'HTML 正文、属性、URL 和脚本里的转义规则不同。在正文里安全的处理，放进事件属性或 javascript: 链接仍可能执行。先选定上下文，再决定编码或改用文本接口。'
      },
      {
        title:'怎样自己验证',
        body:'用一段带尖括号的字符串分别赋给 textContent 和 innerHTML。在元素面板里看产生的是文本节点还是子元素。再确认显示昵称的代码没有走 innerHTML。'
      }
    ]
  },
{
    track:'frontend',
    group:'浏览器',
    id:'layout',
    title:'布局抖动与性能定位',
    prompt:'为什么循环里交替读尺寸、写样式可能很慢？',
    core:'写入样式可能使布局信息失效，紧接着读取几何尺寸可能迫使浏览器提前计算布局。频繁交错会重复这项工作。顺序是：写样式或改 DOM 把布局标脏，随后读 offsetWidth 或 getBoundingClientRect 时浏览器必须先算完才能回答。边界是：只读不写，或先把读做完再集中写，不会每一轮都强制布局。React 提交 DOM 之后的测量若立刻读布局，也会落在这段浏览器工作里，Profiler 的组件时间看不出它。先把需要的尺寸读完，再集中改样式，中间不要交错。React 提交之后立刻测量，也会落在这段浏览器工作里，组件 Profiler 看不到这串 Layout。',
    why:'错把输入卡顿都记成组件重渲染，就会只加 memo，循环里的强制布局仍在。React Profiler 看不到浏览器反复计算布局的时间。能分开的信号是：性能记录里脚本旁边有没有一串 Layout。',
    example:'100 个节点，每轮设置 width 再读 offsetWidth，性能记录里出现一串 Layout。改成先读完所有 offsetWidth 再写 width，这串收成一次布局。读 getBoundingClientRect 也会触发同一次强制布局。',
    task:'用 Performance 面板找出脚本附近的 Layout 记录，并改变读写顺序再比较。',
    answer:'交错读写时，Performance 里脚本旁边会出现重复的 Layout，因为每次读几何值前都要把刚弄脏的布局算完。改成先批量读、再批量写之后，重复的 Layout 应明显减少，总时长下降。结论以这次记录为准，不凭页面感觉说已经优化了。以记录里的次数为准。',
    keywords:'Layout reflow performance DOM browser',
    deep:[
      {
        title:'脏布局和强制计算',
        body:'改 width、类名或 DOM 结构会把布局标脏。紧接着的几何读取必须先算完才能返回。循环里一写一读，就把同一次布局拆成许多次。先读完再写，中间不再交错。只读不写不会每一轮都强制重算。'
      },
      {
        title:'怎样自己验证',
        body:'打开 Performance，录一次循环里交替写样式和读 offsetWidth，再录一次先读完再写。对比 Layout 的次数和总时长，而不是只看页面是否还觉得卡。'
      }
    ]
  },
{
    track:'frontend',
    group:'React',
    id:'state-queue',
    title:'状态快照与更新队列',
    prompt:'同一次点击里连续三次 setCount(count + 1) 为什么常得到 1？',
    core:'事件处理器读到的是当前渲染的 count 快照，三次传入的都是同一个新值。函数式更新把计算函数加入队列，React 在后续渲染中依次计算。顺序是：点击函数只负责入队，替换更新写入一个算好的数字，函数式更新写入一个函数；渲染前按队列顺序计算，函数拿到的是前一个结果。边界是：这次函数里的 count 变量不会中途变成新值。要等这次调用结束、下一次渲染创建新函数，才能读到新的快照。替换更新三次写入的是同一个快照算出来的数字。函数式更新三次写入的是函数，渲染前依次用前一个结果调用。当前点击函数里的变量两种写法都不会被改掉。界面上的新数字要等下一次渲染。不要提前读。',
    why:'错把 setState 说成异步所以会合并成一次，仍然解释不了为什么三次都停在 1。三次传入的是同一个快照算出来的数。能分开的信号是：入队的是数字还是函数，以及函数看到的是闭包还是队列。',
    example:'count 为 0。先 setCount(5)，再 setCount(n => n + 1)。下一次渲染是 6。点击函数里打印 count，在这次调用结束前仍是 0。若三次都传入 count + 1，下一次渲染停在 1，而不是 3。',
    task:'从 0 开始先 setCount(5)，再 setCount(n => n + 1)，预测新值。',
    answer:'从 0 开始先 setCount(5)，队列结果被写成 5。再 setCount(n => n + 1)，用队列里的 5 算出 6。下一次渲染是 6。当前处理器中的 count 仍是 0，因为 setCount 不会改写这次渲染的快照变量。',
    react:'hooks',
    keywords:'React state snapshot UpdateQueue functional update',
    deep:[
      {
        title:'入队的是什么',
        body:'setCount(count + 1) 入队的是数字，三次都是同一个快照加一。setCount(n => n + 1) 入队的是函数，渲染前用上一个结果调用。当前闭包里的变量两种都不会改。'
      },
      {
        title:'怎样自己验证',
        body:'从 0 开始在一次点击里先 setCount(5)，再 setCount(n => n + 1)，看界面是否变成 6。同一函数里打印 count，确认打印出来的仍是 0。'
      }
    ]
  },
{
    track:'frontend',
    group:'React',
    id:'controlled-input',
    title:'受控输入与数据流',
    prompt:'为什么输入框的 value 不能只绑定 state 却不更新 state？',
    core:'受控输入的显示值由 React state 提供。用户编辑触发事件后，处理器需要同步更新对应 state；若值始终不变，后续渲染会把旧值写回输入框。顺序是：击键产生事件，处理器读 event 里的新文字并 setState，再渲染时把 value 写回 DOM。边界是：不写 setState，DOM 上刚打的字会被下一次渲染覆盖。非受控输入没有这条回路，值留在 DOM，重置不能只改 state。同一输入不要一会儿受控一会儿不受控。受控输入每次渲染都用 state 覆盖 DOM。非受控输入的字留在 DOM，重置要清那个节点，而不是只改一个 React 没绑定上去的变量。',
    why:'错把输入框当成自己保存文字，value 绑了 state 却不 setState，键盘输入会在下一次渲染被旧值盖掉。看起来像输入坏了。能分开的信号是：屏幕上的字来自 React state，还是来自 DOM 自己持有的值。',
    example:'input 的 value 固定为 name，name 一直是空字符串，onChange 不调用 setName。每打一个字，随后渲染都把输入框写回空字符串。补上 setName(event.target.value) 后，同一次打字会留在输入框里。',
    task:'分别实现受控与非受控输入，比较重置表单时的处理。',
    answer:'受控输入的 value 来自 state，onChange 里 setState 后下一次渲染把新值写回，重置时把 state 设回空即可。非受控输入不绑 value，文字由 DOM 持有，重置要用 ref 清空该 DOM 或调用表单的 reset。两边的权威来源不同，不能只清变量却指望 DOM 跟着变。',
    react:'pipeline',
    keywords:'React controlled input form state onChange',
    deep:[
      {
        title:'谁是权威',
        body:'受控输入每次渲染都用 state 覆盖 DOM。state 不变，用户的击键留不住。非受控输入的权威在 DOM，React 不知道里面的字，除非去读 ref 或提交表单。'
      },
      {
        title:'怎样自己验证',
        body:'做一个 value 绑定 state 但不 setState 的输入框，打字应被写回旧值。补上 onChange 里的 setState 后应能输入。再做不绑 value 的输入框，只改 state 应不能清空它。'
      }
    ]
  },
{
    track:'frontend',
    group:'React',
    id:'context',
    title:'Context、作用域与重新渲染',
    prompt:'Context 能自动解决所有属性传递和性能问题吗？',
    core:'Context 让后代读取最近的 Provider 值，适合跨层传递共同数据。Provider 的 value 改变会影响读取该 Context 的组件；需要按数据变化频率和职责划分边界。顺序是：渲染 Provider 时确定 value，后代 useContext 向上找到最近的那一个，value 按 Object.is 变化后这些读者再渲染。边界是：Context 不跳过没读它的组件，也挡不住读者自己的 state。每次渲染都新建 value 对象，会让所有读者更新。高频草稿和很少变的主题应分成两个 Provider。按变化频率拆开 Provider。',
    why:'错把 Context 当成既少传参又少渲染，高频 value 一变，所有读取它的组件都会跟着更新。输入草稿放进主题上下文时，整个子树被拖着渲染。能分开的信号是：消费者读的是哪一个 Provider，以及这个 value 的引用变不变。',
    example:'主题 Provider 包在外层，输入草稿 Provider 包在内层。只有草稿 value 换成新对象时，读取草稿的输入框重渲染；只读主题的标题不重渲染。把两个值合成一个对象后，草稿一变，只关心主题的标题也会重渲染。',
    task:'画出两个 Provider 和三个消费者，预测各自依赖哪个值。',
    answer:'每个消费者读取组件树上方最近的对应 Provider，不读取更远处的同名 Provider。主题消费者只依赖主题值，草稿消费者只依赖草稿值。value 引用变了，读取该 Context 的组件会重渲染；没读这个 Context 的组件不会因为这次 value 变化而重渲染，但它自己的 state 仍会让它渲染。',
    react:'architecture',
    keywords:'React Context Provider rerender',
    deep:[
      {
        title:'最近的 Provider',
        body:'消费者不会把外层和内层的值合并。树上方最近的那个 Provider 赢。value 每次都是新对象时，即使字段没变，读者也会更新。按变化频率拆开 Provider，才能让慢数据和快数据分开。'
      },
      {
        title:'怎样自己验证',
        body:'放两个 Provider 和三个消费者，给每个消费者打渲染日志。只改内层 value，确认读内层的更新、只读外层的不更新。再把 value 写成每次渲染的新对象，看读者是否每次都渲染。'
      }
    ]
  },
{
    track:'frontend',
    group:'React',
    id:'suspense',
    title:'Suspense 的等待与重试',
    prompt:'Suspense 是任意异步请求的通用 loading 开关吗？',
    core:'Suspense 处理支持 Suspense 的渲染资源在渲染时挂起的情况，边界可显示 fallback 并在资源就绪后重试。普通 useEffect 内发起请求不会自动触发该边界。顺序是：渲染读到会挂起的资源时中断，显示 fallback，资源就绪后再从该边界重试。边界是：挂起必须发生在渲染期间。effect、事件处理器里的 Promise 不会自动变成 fallback。代码分割用 lazy 可以挂起；手写数据请求要自己管理加载、失败和过期响应。fallback 只接得住渲染期间的挂起。effect 里的 Promise 已经错过渲染，加载态必须写进自己的 state，失败和过期响应也要自己处理。',
    why:'错把 Suspense 当成任意请求的 loading 开关，useEffect 里的 fetch 失败或等待时 fallback 并不出现。界面要自己画加载态。能分开的信号是：这个资源在渲染期间抛出挂起，还是在 effect 里自己 setLoading。',
    example:'用 lazy 加载图表组件时，代码还在下载，Suspense 显示 fallback，下载完成后换成图表。同一边界里用 useEffect 发请求，fallback 不出现，必须自己根据 loading 状态渲染。',
    task:'分别用 lazy 与 Effect 请求构造例子，观察 fallback 何时出现。',
    answer:'lazy 的组件在渲染时挂起，最近的 Suspense 显示 fallback，模块就绪后重试渲染并换成组件。普通 useEffect 请求发生在提交之后，不会抛出挂起，fallback 不出现，加载和失败都要自己写入 state 再渲染。两种等待不要写成同一种机制。',
    react:'architecture',
    keywords:'React Suspense lazy fallback retry',
    deep:[
      {
        title:'挂起发生在渲染',
        body:'lazy 在渲染到该组件时还没有模块，于是挂起。effect 在渲染已经结束之后才发请求，来不及也不该用抛出来切换 fallback。数据请求若要走 Suspense，需要支持挂起的集成，而不是普通 fetch。'
      },
      {
        title:'怎样自己验证',
        body:'用 lazy 包一个慢加载组件，确认 fallback 出现再消失。再在同一边界里只放 useEffect 请求，确认 fallback 不出现，加载文字来自你自己的 state。'
      }
    ]
  },
{
    track:'frontend',
    group:'测试',
    id:'frontend-testing',
    title:'从行为出发设计测试',
    prompt:'组件测试应该断言内部 state 字段，还是用户能观察到的行为？',
    core:'先定义输入、操作与可见结果，再选择单元、组件和端到端测试层级。只复制实现步骤的断言容易随重构失效，却不能保证实际体验。顺序是：用角色和名称找到控件，执行用户会做的操作，再断言屏幕上的文字、禁用状态或请求是否发出。边界是：单元测试锁纯函数，组件测试锁界面契约，端到端测试锁关键路径。不要在组件测试里把服务端所有分支重写一遍，也不要只断言 setState 被调用过。三条场景都从用户操作写到看得见的结果：正常结果、空状态、失败后还能重试。断言角色和文字，不断言内部字段名。重构变量名不应让测试变红。空输入不要留下上一次的结果。网络失败不要伪装成没有数据。重试也要断言。',
    why:'错把断言内部 state 字段当成测了用户行为，重构改了变量名测试就红，按钮其实仍能用。反过来行为坏了，内部字段却还是对的。能分开的信号是：断言的是屏幕上的文字和控件，还是组件里的变量名。',
    example:'输入邮箱 not-an-email 后，屏幕出现“邮箱格式不正确”，提交按钮不再发出请求。测试不断言组件里名为 error 的字段，只断言这段可见文字。再断掉网络，应看到失败说明和重试按钮，而不是空列表。',
    task:'为一个搜索框写出正常输入、空输入和网络失败三条用户行为场景。',
    answer:'正常输入：填关键字并提交，列表换成这批结果。空输入：不发请求或按约定查询，出现空状态，而不是留下上一次的结果。网络失败：列表不伪装成没有数据，出现失败说明，并且可以再试一次。每条都写用户操作、看得见的反馈和最终状态，不断言内部 state 的字段名。',
    keywords:'frontend testing behavior unit integration e2e',
    deep:[
      {
        title:'契约而不是形状',
        body:'按钮文案或角色变了，按名称找的测试会失败，这是它该失败的时候。按 class 或 state 字段找的测试，可能在用户已经看不见结果时仍然通过。失败场景要能恢复或重试。'
      },
      {
        title:'怎样自己验证',
        body:'把错误提示的变量名改掉但文字不变，按文字写的测试应仍通过。再把提示从屏幕上去掉但留下该变量，按内部字段写的测试会通过，按可见文字写的测试会失败。按可见文字断言。'
      }
    ]
  },
{
    track:'frontend',
    group:'工程实践',
    id:'accessibility',
    title:'可访问性与语义 HTML',
    prompt:'点击事件加在 div 上，为什么还不能等同于 button？',
    core:'button 自带键盘激活、焦点行为和辅助技术语义。非语义元素要额外实现这些交互；优先选择符合用途的原生元素。顺序是：先选对元素，浏览器才把焦点、键盘和角色一起给你；再用 CSS 改外观。边界是：div 补上 role 和 tabIndex 仍要自己处理 Space、Enter、禁用和焦点样式，很容易漏。提交用 button type 为 submit，导航用带 href 的 a。链接和按钮不是互换的。补 role 和 tabIndex 之后还要自己处理 Space、Enter 和禁用。提交用 button，跳转用带 href 的链接。不要用一个 div 同时假装这两种控件。',
    why:'错把能点的 div 当成按钮，鼠标用户没问题，键盘用户 Tab 不到它，读屏也不报按钮。Enter 和 Space 都不会激活。能分开的信号是：拔掉鼠标后，Tab 能不能聚焦，Space 能不能激活。',
    example:'工具栏的保存是 button，Tab 可以聚焦，Space 和 Enter 都会触发点击。旁边用 div 加 onClick 做的保存，Tab 会跳过它，Space 没有反应。读屏对 button 报按钮，对这个 div 不报按钮。',
    task:'用键盘 Tab 和 Enter/Space 测试一个自制按钮，再与原生 button 比较。',
    answer:'原生 button 在 Tab 顺序里，Enter 和 Space 都会触发点击，读屏报出按钮。只有 onClick 的 div 默认不能聚焦，键盘也不会激活。比较时看三件事：能不能聚焦、键盘能不能激活、角色是不是按钮。链接去一个地址，用 a href，不要用 div 同时假装按钮和链接。',
    keywords:'accessibility button keyboard semantics a11y',
    deep:[
      {
        title:'三件套要同时在',
        body:'能点击只覆盖指针。按钮还要能被 Tab 聚焦，能被 Enter 和 Space 激活，并让辅助技术知道角色。缺任何一件，这个控件对一部分用户就不存在。缺一件，键盘或读屏就会停在外面。'
      },
      {
        title:'怎样自己验证',
        body:'拔掉鼠标，只用 Tab 和 Enter 或 Space 完成一次提交。完不成的那个控件就是还缺原生语义。再听读屏报出的是按钮、链接，还是一片没有名字的分组。和原生 button 对照。'
      }
    ]
  }
);
window.LESSONS.push(
{
    track:'java',
    group:'Java 基础',
    id:'java-generics',
    title:'泛型、类型擦除与运行时',
    prompt:'为什么 List<String> 和 List<Integer> 不能用 instanceof 区分？',
    core:'Java 泛型主要在编译期提供类型检查；多数类型参数在运行时会被擦除。实际对象的运行时类型不会因为元素类型参数而变成两个不同的 List 类。顺序是：编译器按类型参数检查调用，再擦掉这些参数，运行时只留下原始类型和必要的强制转换。边界是：instanceof 不能带具体类型参数。List<?> 可以安全读取为 Object，但不能写入任意非 null 值，因为真实元素类型可能更窄。反射里看到的也不是 List<String> 这个类。运行时要用类型信息，就另存 Class 对象，不要指望擦除后的 List 还带着 String 或 Integer。通配符能安全读成 Object，写入非 null 会被编译器拒绝。',
    why:'错把 List<String> 和 List<Integer> 当成运行时的两个类，instanceof 仍分不开它们，强转也不会按元素类型检查。擦除之后都只是 List。能分开的信号是：报错发生在编译期，还是运行时根本没有这个类型参数。',
    example:'List<String> names = new ArrayList<>(); 可以赋给 List<?>。写 names instanceof List<String> 不能通过编译。运行时 names 的类仍是 ArrayList，元素类型参数已经不在。',
    task:'解释为什么向 List<?> 直接添加任意非 null 元素会被限制。',
    answer:'List<?> 表示元素类型未知，可能是任何引用类型。直接添加非 null 元素时，编译器无法证明这个元素就是那个未知类型，所以拒绝添加。null 是唯一允许的写入，因为任何引用类型都能装下它。读取时可以安全当成 Object，不能当成 String 或 Integer。',
    keywords:'Java generics erasure List wildcard',
    deep:[
      {
        title:'擦除后还剩什么',
        body:'类型参数用来在编译期拒绝错误的 add。擦除之后，List<String> 和 List<Integer> 的运行时类相同。需要在运行时区分时，得另存一个 Class 标记，不能靠 instanceof。'
      },
      {
        title:'怎样自己验证',
        body:'把 List<String> 赋给 List<?>，尝试 add 一个字符串，确认编译失败。再对原始 List 做一次强制转换并加入整数，运行时取出来当字符串用会在使用处失败。'
      }
    ]
  },
{
    track:'java',
    group:'Java 基础',
    id:'java-exceptions',
    title:'异常边界与资源释放',
    prompt:'捕获 Exception 后只打印日志并继续，可能掩盖什么问题？',
    core:'异常是失败信号。处理器应明确是恢复、转换、补偿还是继续传播；资源需要在确定的生命周期关闭，try-with-resources 能在退出作用域时调用 close。顺序是：失败处抛出，边界上决定恢复还是包装后继续抛，资源在离开 try 时关闭。边界是：捕获后既不抛也不返回失败，上游会当成成功。只捕获能处理的类型，不要用一个空的 catch Exception 盖住所有问题。关闭资源放在 finally 或 try-with-resources，不要放在可能被跳过的成功路径末尾。资源关闭放在 try-with-resources，不要放在可能被异常跳过的最后一行。捕获时只处理确实能恢复的类型，其余继续传播。',
    why:'错把 catch Exception 后只打日志当成已经处理，调用方会收到正常返回，用户看见下单成功而库里没有订单。失败信号被吞掉。能分开的信号是：异常是继续传播，还是被转换成了明确的失败结果。',
    example:'写入订单时 IOException 被 catch 后只打印，方法返回成功。用户看到下单成功，订单表没有新行，文件流也没有关闭。改成 try-with-resources 后，同一异常路径上 close 仍被调用，调用方收到的是失败而不是成功。',
    task:'为文件读取失败设计用户可见错误、日志上下文和资源关闭方式。',
    answer:'文件读取失败时保留原始异常作为原因，向调用者返回明确失败，不要返回空内容假装读到了。日志带上路径和失败类型。用 try-with-resources 声明流，无论返回还是抛出，离开作用域时都会 close。用户可见的是失败说明，不是一条被吞掉的栈。',
    keywords:'Java exception try-with-resources error',
    deep:[
      {
        title:'吞掉等于报告成功',
        body:'日志不是处理。调用方只看返回值时，会把失败当成成功并继续后续步骤。要么继续抛，要么返回明确的失败，并带上原始原因，方便边界处决定补偿。空 catch 会让上游继续做下一步。'
      },
      {
        title:'怎样自己验证',
        body:'让读取在中途抛错，确认调用方收到的是失败而不是空结果。在 finally 或 try-with-resources 里记录 close 是否被调用。去掉关闭后再跑，确认流在异常路径上泄漏。'
      }
    ]
  },
{
    track:'java',
    group:'并发',
    id:'java-happens-before',
    title:'happens-before 与可见性',
    prompt:'两个线程读写同一个普通变量，为什么不能只凭代码顺序推断结果？',
    core:'线程内顺序不等于跨线程可见顺序。Java 内存模型用 happens-before 关系描述某次写入何时必须对另一线程可见；锁、volatile 和线程启动结束建立不同的同步边。顺序是：同一线程里前面的动作先行发生于后面的动作；跨线程要另有同步边把两边连起来。边界是：没有边时，另一个线程可以一直看不到这次写入，也可以看到。数据竞争不是“偶尔慢一点”，而是可见性没有保证。先指出那条边，再谈性能。同一把锁上，解锁先行发生于之后的加锁，解锁前的写入对加锁后的读取可见。没有这把锁、也没有 volatile 或线程的启动与结束，源码顺序给不出跨线程的可见性。先指出那条边。',
    why:'错把源码里的先后写成跨线程一定能看见，读线程会一直看到旧值或默认值。线程内的顺序不会自动跑到另一个线程。能分开的信号是：两次访问之间有没有锁、volatile 或线程启动结束建立的同步边。',
    example:'写线程在 synchronized(lock) 里把 flag 设为 true。读线程在同一把 lock 上同步后再读 flag，能够看见 true。去掉两边的锁之后，读线程可能一直看见 false。',
    task:'画出写线程 unlock 与读线程 lock 的先后关系，说明读线程能看到什么。',
    answer:'写线程先写入共享变量，再 unlock。读线程之后 lock 同一把监视器。这次解锁先行发生于这次加锁，写线程在解锁之前的写入对读线程可见。若读线程的 lock 发生在写线程 unlock 之前，它不在这条边的后面，不能凭代码顺序断定一定看见新值。',
    keywords:'Java memory model happens-before volatile synchronized',
    deep:[
      {
        title:'同步边才跨线程',
        body:'同一监视器上，解锁先行发生于随后的加锁。volatile 写先行发生于随后对同一变量的读。线程 start 之前的写入对新线程可见，join 之后的读取能看见该线程的写入。没有这些边就不能推断。'
      },
      {
        title:'怎样自己验证',
        body:'一个线程在锁内写 flag，另一个线程在同一把锁内读。确认 lock 发生在 unlock 之后时能读到新值。去掉锁再跑一段时间，观察是否出现一直读到旧值的情况。'
      }
    ]
  },
{
    track:'java',
    group:'并发',
    id:'java-executor',
    title:'线程池容量与背压',
    prompt:'线程池任务队列无限增长会发生什么？',
    core:'线程池的线程数、队列容量和拒绝策略共同决定过载行为。无界队列可能把处理不过来的任务积压到内存中，让延迟和内存占用持续上升。顺序是：先定下游能承受的并发，再定池大小和有界队列，最后定队列满时的拒绝或退让。边界是：无界队列让拒绝策略几乎不触发，过载变成内存问题。调用者执行、丢弃或抛异常是不同的反馈，要和超时、重试一起设计。只加大线程数而不看下游，会把压力原样推过去。线程数对齐下游容量，队列必须有上限，满了要拒绝或退让并带超时。无界队列让拒绝策略几乎不执行，过载变成内存和延迟一起涨。只加大线程数而不看下游，会把压力原样推过去，队列却仍在内存里变长。先定上限。再量。',
    why:'错把线程池队列设成无界当成不会丢任务，任务会堆在内存里，延迟越来越长，最后内存先被打满。拒绝没有发生，系统已经不可用。能分开的信号是：队列有没有上限，满了之后是拒绝、阻塞还是继续分配。',
    example:'固定 4 个线程、队列无界，每秒提交 100 个各睡 1 秒的任务。队列长度持续上升，任务从提交到开始的等待越来越长，堆占用跟着涨。把队列改成容量 10 后，多出来的提交走拒绝策略，堆不再随提交一直增长。',
    task:'为外部 API 调用设计最大并发、排队上限和超时策略。',
    answer:'先估算下游 API 能承受的并发，例如连接池大小，把最大线程数限制在这个容量附近。队列设上限，满了就拒绝或让调用者退让，而不是无限排队。每次调用带超时，超时后不再继续占着连接。超载时返回明确失败，调用方退避，而不是在内存里把任务存起来。无界排队不叫保护。',
    keywords:'Java ExecutorService ThreadPoolExecutor queue backpressure',
    deep:[
      {
        title:'队列是内存',
        body:'排队的任务对象都活在堆上。队列没有上限时，生产快过消费，堆和延迟一起涨。有界队列把这个增长停住，满了必须给出失败或退让，而不是继续接收。拒绝策略在队列有界时才会经常执行。'
      },
      {
        title:'怎样自己验证',
        body:'用一个很小的池和有界队列，提交速度超过处理速度，确认队列到顶后走拒绝策略。再换成无界队列，观察队列长度和堆占用持续上升，任务开始前的等待变长。同时看堆占用和排队等待。'
      }
    ]
  },
{
    track:'java',
    group:'并发',
    id:'java-virtual-threads',
    title:'虚拟线程解决什么问题',
    prompt:'虚拟线程会让 CPU 密集型计算本身更快吗？',
    core:'虚拟线程让大量等待 I/O 的任务以较低线程资源成本并发执行；它不会加速单个 CPU 任务。下游连接池、数据库和限流边界仍然存在。顺序是：任务遇到阻塞等待时挂起虚拟线程，平台线程去干别的；计算时仍占用载体线程直到算完。边界是：适合大量互相独立的阻塞 I/O。CPU 密集任务不会更快，还可能因为调度更碎而更慢。连接池、锁里面做长时间 I/O，仍会把下游或载体钉住。限流要按下游容量设，不按虚拟线程个数设。等待 I/O 时虚拟线程可以让出载体；纯计算仍占着核直到算完。连接池和外部限流不会因为线程变轻而变多，这两个上限要单独设置。在重量级锁里做长时间阻塞 I/O，还可能把载体线程钉住。',
    why:'错把虚拟线程当成让 CPU 计算本身变快，密集循环的耗时仍由核数决定，1000 个虚拟线程不会变成 1000 核。下游连接池也会先满。能分开的信号是：任务时间主要花在等待 I/O，还是花在占着 CPU 算。',
    example:'1000 个各自等待数据库的阻塞调用，虚拟线程可以同时挂起等待，瓶颈转到连接池大小。1000 个纯计算任务仍把 CPU 打满，完成时间不因换成虚拟线程而下降。把数据库连接池上限降到 20 后，多出来的虚拟线程堵在取连接，而不是继续提高吞吐。',
    task:'比较 1000 个等待数据库的请求与 1000 个密集计算任务的瓶颈。',
    answer:'1000 个等待数据库的请求，瓶颈是连接池和数据库能承受的并发，虚拟线程减少的是为等待而占用的平台线程，不提高数据库容量。1000 个密集计算任务的瓶颈是 CPU 和算法，虚拟线程不缩短单次计算。两种都要单独设置限流，不能只换线程实现。限流按池的大小设。',
    keywords:'Java 21 virtual threads IO throughput',
    deep:[
      {
        title:'等待和计算分开',
        body:'虚拟线程便宜的是等待时不必占着一条平台线程。计算仍要核。数据库连接、外部限流没有因为线程变轻而变多。在 synchronized 里做阻塞 I/O 还可能把载体线程钉住。'
      },
      {
        title:'怎样自己验证',
        body:'用相同的 1000 个睡眠或阻塞调用比较平台线程和虚拟线程的开销。再跑 1000 个纯计算，确认完成时间不缩短。最后把连接池调小，确认等待任务会堵在池上而不是继续加速。'
      }
    ]
  },
{
    track:'java',
    group:'JVM',
    id:'java-gc',
    title:'GC 延迟与分配压力',
    prompt:'“垃圾回收越少越好”一定正确吗？',
    core:'GC 策略要在吞吐、停顿、内存占用和分配速率之间权衡。只看回收次数无法说明用户请求是否变慢；还需结合暂停时间、堆使用和业务延迟。顺序是：先定延迟和吞吐目标，再同时采集分配速率、堆占用和暂停，最后看它们是否在时间上重合。边界是：回收频繁不等于暂停伤害用户。短命对象可以回收很多次而每次很短。相反，次数少但一次停顿很长，会直接出现在尾延迟里。调优从测量目标开始，不能只换一个收集器名称。先记录延迟分布和暂停时间，再看它们是否同时抬起。短暂停即使频繁也可能不影响接口；一次长暂停会直接出现在尾延迟里。只比回收次数会把短而勤和少而长看成同一类现象，接口延迟却完全不同。',
    why:'错把回收次数少当成一定更快，短命对象回收得很勤，每次暂停仍可能很短，接口却不抖。次数少的那次若停顿很长，用户反而感觉卡。能分开的信号是：暂停时间是否和请求延迟的尖峰对得上，次数本身不是目标。',
    example:'每秒分配大量活不过年轻代的对象，年轻代收集次数上升，但单次暂停只有几毫秒，接口 P99 不变。一次很长的全堆暂停则和延迟尖峰出现在同一时刻。对齐时间戳后才能判断抖动是不是回收造成的，而不是下游变慢。再对时间。',
    task:'列出一次接口抖动需同时查看的应用与 JVM 指标。',
    answer:'同时看请求延迟分布、分配速率、堆占用、GC 暂停和 CPU。把暂停时间和延迟尖峰对齐：对得上，才说明抖动来自回收；对不上，就去看锁、下游或自身计算。只减少回收次数而暂停变长，不能当成已经变快。对不上就去看锁、下游或自身计算，不要先换收集器。',
    keywords:'JVM GC pause throughput allocation',
    diagram:'diagrams/jvm-gc-pause.svg',
    deep:[
      {
        title:'次数不是暂停',
        body:'年轻代收集可以很频繁但很短。用户感觉到的是暂停落在请求路径上的那一段。把 GC 日志的暂停和延迟直方图对齐，对不上就不要先改收集器。对齐时间戳，而不是只比两列总数。'
      },
      {
        title:'怎样自己验证',
        body:'压测时同时记录接口延迟、分配速率和 GC 暂停。制造一次明显的长暂停，看 P99 是否在同一时间抬起。再制造大量短命分配，确认次数上升时延迟不一定上升。长暂停才对得上尖峰。'
      }
    ]
  },
{
    track:'java',
    group:'框架',
    id:'spring-rollback',
    title:'事务回滚规则与异常类型',
    prompt:'@Transactional 遇到所有异常都会自动回滚吗？',
    core:'Spring 声明式事务默认对 RuntimeException 和 Error 回滚，对受检异常默认不回滚；可以通过 rollbackFor 配置。事务是否进入还依赖调用是否经过代理。顺序是：代理开启事务，目标方法抛出，拦截器按异常类型决定提交或回滚。边界是：捕获异常后不再抛出，拦截器看到正常返回，事务提交。受检异常要显式列入回滚规则。自调用绕过代理时，这些规则都不会执行。业务上要一起成败的写入，必须真的在同一个已生效的事务里。默认回滚运行时异常和 Error。受检异常要写 rollbackFor。异常被 catch 后不再抛出，拦截器看到正常返回，写入会提交。',
    why:'错把 @Transactional 当成遇到任何异常都会回滚，受检异常抛出后事务仍可能提交。订单已经写入，支付失败的记录却不在同一原子边界里。能分开的信号是：抛出的是运行时异常，还是受检异常且没有 rollbackFor。',
    example:'create 抛出 RuntimeException，默认回滚，订单行消失。把同一失败改成受检异常且不配置 rollbackFor，方法抛出后订单行仍在。调用若改成 this 自调用，两种异常都不会按注解回滚，因为根本没进拦截器。',
    task:'设计一个调用：先写订单再调用支付，分别讨论受检异常和运行时异常。',
    answer:'先写订单再调用支付，两者要在同一事务里才一起提交或一起回滚。支付抛运行时异常时，默认回滚，订单也不留。支付抛受检异常时，默认不回滚，订单会提交，除非声明 rollbackFor 包含该异常。还要确认调用经过代理，否则注解根本没有进入。以提交后的行是否还在为准。',
    keywords:'Spring Transactional rollbackFor checked exception',
    deep:[
      {
        title:'异常类型和还抛不抛',
        body:'默认只回滚运行时异常和 Error。受检异常要写 rollbackFor。方法里 catch 之后正常返回，拦截器认为成功，已经执行的写入会提交。要回滚就必须继续抛，或显式标记只回滚。'
      },
      {
        title:'怎样自己验证',
        body:'在写入之后分别抛运行时异常和受检异常，查表确认哪种还留着行。给受检异常加上 rollbackFor 后再查，行应消失。在方法里把异常吃掉再查，行应仍在。再试一次自调用。'
      }
    ]
  },
{
    track:'java',
    group:'框架',
    id:'spring-propagation',
    title:'事务传播与业务边界',
    prompt:'REQUIRES_NEW 是把当前事务变成嵌套事务吗？',
    core:'REQUIRES_NEW 会挂起现有事务并启动独立事务；内部事务提交后，外部事务仍可能回滚。具体资源连接和事务管理器会影响可行性。顺序是：外层开启并持有资源，遇到 REQUIRES_NEW 时挂起外层，内层提交或回滚后恢复外层。边界是：内层提交对外层不可见地已经生效，外层失败不会撤销它。若业务要求审计和订单一起消失，就不能用独立提交。连接和事务管理器不支持挂起时，这个传播也无法照字面工作。REQUIRES_NEW 挂起外层并单独提交。外层随后回滚，撤销不了内层已经提交的行。它不是保存点。连接或事务管理器不能挂起时，这个传播也不会照字面发生。审计若必须和外层一起消失，就应加入外层事务，而不是另起一笔。',
    why:'错把 REQUIRES_NEW 当成嵌套进当前事务，外层回滚时会以为内层审计也撤销了。审计行已经独立提交，对不上已回滚的订单。能分开的信号是：内层提交之后，外层再回滚，那一行还在不在。',
    example:'外层事务写订单，内层 REQUIRES_NEW 写审计并提交。外层随后抛错回滚。订单行消失，审计行还在。审计方法改成 REQUIRED 加入外层后，同一实验里审计行会随订单一起消失。两行结果相反。记下来。',
    task:'画出外层事务、内层 REQUIRES_NEW、外层回滚的时间线。',
    answer:'外层事务开始后，内层 REQUIRES_NEW 把外层挂起并提交自己的事务。时间线后半段外层回滚，只能撤销外层尚未提交的写入。内层已经提交的审计不会被外层回滚自动撤销。它不是保存点式的嵌套，而是另一笔独立事务。要一起撤销就不要用独立事务。以表为准。',
    keywords:'Spring transaction propagation REQUIRES_NEW',
    deep:[
      {
        title:'独立提交不是保存点',
        body:'嵌套保存点仍属于外层事务，外层回滚会一起撤销。REQUIRES_NEW 是另一笔事务，提交后就脱离外层。补偿得另写，不能靠外层回滚捎带完成。保存点仍属于外层。以表为准。'
      },
      {
        title:'怎样自己验证',
        body:'外层写订单，内层用 REQUIRES_NEW 写审计。让外层在内层返回后抛错。查表：订单应消失，审计应仍在。若两边都必须消失，改成同一事务再跑一次对比。查两张表的行。'
      }
    ]
  },
{
    track:'java',
    group:'数据库',
    id:'mysql-mvcc',
    title:'MVCC、快照读与锁定读',
    prompt:'普通 SELECT 与 SELECT FOR UPDATE 在并发事务中有何不同？',
    core:'InnoDB 普通一致性读可基于版本视图读取；锁定读会取得相应锁并读取适用于当前操作的版本。行为还受隔离级别、条件和索引影响。顺序是：一致性读按事务开始时的视图找历史版本，不阻止别人修改；锁定读先加锁再读当前版本。边界是：先 SELECT 再在应用里减一，中间可以被另一事务插进来。库存扣减要用条件更新或锁定读，让数据库裁决谁影响了一行。隔离级别的名字不能代替这条原子条件。一致性读按视图找历史版本，不阻止别人改当前行。锁定读或条件更新才把“看到”和“占住”连在一起。隔离级别的名字代替不了这条原子条件。先 SELECT 再在应用里减一，两个事务可以读到同一个 1，然后各写各的。',
    why:'错把普通 SELECT 读到的库存当成已经占住，两个事务都会以为自己买到了最后一件。一致性读没有为这次修改加锁。能分开的信号是：读的是历史版本，还是锁住了当前行，快照里的数字不是锁。',
    example:'两个事务都用普通 SELECT 读到库存 1，再各自把库存更新成 0。两笔都可能提交，库存停在后一次写入，最后一件被卖出两次。改成 UPDATE 库存且要求原值为 1，只有一笔影响一行，另一笔影响 0 行，最终库存为 0。',
    task:'设计两个事务同时读取并扣减同一库存的实验，对比普通读与锁定读。',
    answer:'普通 SELECT 两边都看到库存 1，再按自己算出的数字更新，两笔都可能提交，最终库存取决于后写的人。改成 SELECT FOR UPDATE 或条件更新后，只有一笔把 1 改成 0 且影响一行，另一笔等到锁或影响 0 行。最终库存是 0，失败的那笔回滚订单。普通一致性读没有锁住后续修改。',
    keywords:'MySQL InnoDB MVCC consistent read FOR UPDATE',
    deep:[
      {
        title:'快照不是占用',
        body:'一致性读看见的数字只说明视图里的旧版本，不阻止另一个事务修改当前行。FOR UPDATE 才会堵住并发修改。条件更新则把判断和写入合成一条语句。应用里减一再写回，中间可以插入另一笔。'
      },
      {
        title:'怎样自己验证',
        body:'开两个事务，都普通 SELECT 同一库存再更新。看最终库存和两笔是否都提交。再改成条件更新或 FOR UPDATE，确认只有一笔影响一行，另一笔失败或等待。看影响行数。'
      }
    ]
  },
{
    track:'java',
    group:'数据库',
    id:'mysql-isolation',
    title:'隔离级别与业务不变量',
    prompt:'用了 REPEATABLE READ 就不需要考虑并发冲突了吗？',
    core:'隔离级别约束事务之间可见性，但业务不变量仍需具体的锁、唯一约束、条件更新或重试策略。不同数据库与查询形态的行为不能只靠级别名称推断。顺序是：先写出不允许破坏的规则，再选约束或原子语句去执行它，隔离级别只说明没有约束时能看见什么。边界是：可重复读不阻止两个事务同时通过“不存在”检查。唯一约束让第二次插入失败。应用识别冲突后返回已有结果或明确失败，而不是再插一次。可重复读约束的是能看见什么，不阻止两个事务同时通过“不存在”检查。唯一约束让第二次写入失败。应用再按这个键读出已有结果或返回明确冲突。订单号、用户名这类规则都要落到唯一约束上，不能只写在事务的 if 里。',
    why:'错把 REPEATABLE READ 当成不会再有并发冲突，两个事务仍会同时认为用户名不存在并都去插入。隔离级别约束的是能看见什么，不是业务规则自动成立。能分开的信号是：不变量靠唯一约束裁决，还是只靠事务里先读再判断。',
    example:'两个事务都查询用户名不存在，然后都插入。没有唯一约束时出现两行。加上用户名唯一约束后，只有一行成功，另一行报冲突。第二笔插入失败后按同一订单号再查，应读到第一笔已经插入的那一行，而不是再插一次。行数是一。',
    task:'给订单号设计唯一约束与冲突后返回策略。',
    answer:'订单号用唯一约束当最终裁决，而不是靠事务里先查再插。冲突的一方插入失败，应用按该订单号读出已有行，返回已有结果或明确的冲突失败。REPEATABLE READ 不能代替这道约束。两边都没看见对方未提交的插入时，仍会同时认为可以创建。先查再插挡不住并发。',
    keywords:'MySQL isolation unique constraint transaction',
    deep:[
      {
        title:'级别不是不变量',
        body:'隔离级别回答的是另一个事务的写入何时可见。用户名不能重复、库存不能为负，要由唯一约束或条件更新来拒绝。只提高隔离级别，这两条规则不会自动出现。提高隔离级别不会自动出现唯一约束。'
      },
      {
        title:'怎样自己验证',
        body:'在可重复读下开两个事务，都先查订单号不存在再插入。没有唯一索引时应插入两行。加上唯一索引后，第二笔应失败，应用再按该键读出第一笔的结果。对照有无唯一索引的行数。'
      }
    ]
  },
{
    track:'java',
    group:'缓存',
    id:'redis-expire',
    title:'TTL、缓存穿透与热键',
    prompt:'给所有缓存键设置相同 TTL 可能造成什么问题？',
    core:'大量键若同时到期，缓存命中率会一起下降，回源压力突然升高。需要根据访问模式设置过期、预热或请求合并；空值缓存也要考虑误伤与时效。顺序是：先定允许陈旧的时间，再写 TTL 和主动失效，最后给回源加单飞或锁，避免失效瞬间把数据库打满。边界是：TTL 相同会把过期对齐到同一时刻。空值缓存能挡住不存在的键，但缓存太久会把刚创建的数据继续当成没有。热键失效和整批失效不是同一个容量问题。相同 TTL 会把过期对齐到同一时刻，命中率一起掉下去。抖动、预热和单飞解决的是不同范围：单飞只管同一个键，错开时间才管得了一万个键同时消失。空值缓存要短，否则刚写入的数据会继续被当成不存在。',
    why:'错把相同 TTL 当成均匀过期，整批键会在同一秒失效，请求一起打到数据库。命中率曲线是一条悬崖，不是缓坡。能分开的信号是：过期时间是同一个绝对时刻，还是加了抖动的不同时刻，对齐与否看得到。',
    example:'一万个商品详情键都在 12:00:00 过期。这一秒内缓存命中掉下去，数据库 QPS 出现尖峰。给 TTL 加上随机抖动后，尖峰被摊开。TTL 加上 0 到 30 秒的随机值后，同一批键的过期被摊开，数据库尖峰下降。',
    task:'为高频商品详情设计过期、更新和回源保护。',
    answer:'先定详情允许旧多久，再设基础 TTL，并给每个键加上小范围随机抖动，避免同时到期。更新时主动删除对应键。回源时用单次加载把并发请求合成一次查询，空值也短时间缓存以免穿透，但要能区分“确实没有”和“刚刚被删”。热键还要能提前刷新。空值的 TTL 要比正常详情更短。',
    keywords:'Redis TTL cache stampede hot key',
    deep:[
      {
        title:'对齐的过期时刻',
        body:'同一时刻写入且 TTL 相同，就会同一时刻消失。抖动让它们错开。单飞只减少同一键的并发回源，挡不住一万个不同键同时过期，那种情况要靠错开 TTL 或预热。单飞代替不了抖动。'
      },
      {
        title:'怎样自己验证',
        body:'给一批键设置相同 TTL，到期时看数据库 QPS 是否出现尖峰。再加上随机秒数后重试，尖峰应摊开。对一个不存在的键连续请求，确认空值缓存生效，并在数据插入后不会被空值挡太久。'
      }
    ]
  },
{
    track:'java',
    group:'系统设计',
    id:'message-delivery',
    title:'消息重试与消费幂等',
    prompt:'消息系统承诺“至少一次”后，消费者还需要处理重复吗？',
    core:'至少一次交付允许重复投递。消费者应根据业务键判断处理是否已完成，并让状态修改与去重记录处在可靠的事务边界；失败后可安全重试。顺序是：处理业务并在同一事务里记下已处理的键，成功后再确认消息。边界是：确认前失败会重投，所以确认不能早于业务提交。先确认再写库，崩溃会丢掉这次业务。去重记录若和加积分不在同一事务，仍可能加两次或记下了却没加上。至少一次只保证消息还会再来，不保证业务函数只跑一次。确认必须晚于业务提交。去重键要和加积分写在同一事务里，否则仍可能加两次，或记下了键却没加上。三种崩溃都用同一张发放表核对：积分只增加一次，订单号只有一行。确认点就是边界。再核对。',
    why:'错把至少一次当成业务只执行一次，消费者崩溃在确认前，积分会被再加一遍。投递保证不等于处理保证。能分开的信号是：确认发生在业务提交之前，还是之后，以及重投时能不能认出已经加过，重投是预期路径。',
    example:'订单 9 的积分消息处理完并提交数据库，确认前进程退出。消息被重新投递。以订单号为唯一键的发放记录已经存在，第二次返回原结果，积分不再增加。发放表以订单号做唯一约束，第二次插入冲突后读出原记录，积分余额与第一次相同。',
    task:'列出消费者崩溃发生在写库前、写库后、确认消息前的三种结果。',
    answer:'写库前崩溃：业务没提交，确认也没发生，重投会再处理一次，结果应补上这一次发放。写库后、确认前崩溃：发放已经提交，重投必须发现这张订单已经发过，不再加积分。确认之后崩溃：消息不会因为这次崩溃而重投。三种都要让积分只增加一次。确认前都要假定还会再来一次。',
    keywords:'message queue at least once retry idempotency',
    deep:[
      {
        title:'确认点就是边界',
        body:'确认表示这封消息可以不再投。业务还没提交就确认，崩溃后不会重来，结果丢失。业务提交了还没确认，重投一定发生，必须靠业务键认出已经做过。先确认再写库，崩溃后不会重来。'
      },
      {
        title:'怎样自己验证',
        body:'在写库前、写库后确认前分别杀掉消费者。第一种应重投并最终有且仅有一笔积分。第二种也应重投，但积分不再增加。核对发放表上的订单号唯一约束。看积分是否只加了一次。以余额为准。'
      }
    ]
  },
{
    track:'java',
    group:'系统设计',
    id:'rate-limit',
    title:'限流与背压',
    prompt:'限流是只在 API 网关返回 429 吗？',
    core:'限流可以设置在入口、用户、租户或下游资源边界。它需要可观测的容量指标、清晰的拒绝或退避反馈，并与队列容量和超时共同设计。顺序是：先量出被保护资源的容量，再在它前面设并发或速率上限，满了就拒绝或退让，并记录拒绝次数。边界是：入口 429 保护不了没经过网关的内部调用。队列若无界，限流等于没做，压力变成延迟。超时、重试和限流要一起看，否则被拒绝的请求会立刻重试把限制打穿。先量被保护资源的容量，再在它前面设并发上限。入口的每用户限额保公平，连接池限额保资源。队列无界时限流等于没做，被拒绝的请求若立刻重试，也会把限制打穿。超时和重试要跟限制一起设计，否则拒绝会变成立即重试。',
    why:'错把限流当成网关统一返回 429，数据库连接仍可能被某个内部调用打满。入口没超，下游已经排队。能分开的信号是：限制的是用户请求速率，还是某个资源的并发占用，入口计数正常时下游仍可能先满。',
    example:'网关允许每个用户每秒 50 次，总入口看起来正常。其中报表接口每次占用数据库连接 2 秒，并发超过 300 后，连接池耗尽，其他短查询也开始超时。给报表查询单独设最多 20 个在途后，第 21 个被拒绝，短查询不再一起等连接。',
    task:'设计一个用户级 API 限流和一个数据库连接级并发限制。',
    answer:'用户级限流按用户或租户计数，超过窗口就返回 429，用来保证公平，不让一个用户占满入口。数据库连接级限制按资源并发，超过就排队到上限或立即失败，用来保护连接池。两者阈值、反馈码和要看的指标都不同：一个看每用户速率，一个看该资源的在途数量。两个阈值不要合成一个 429。',
    keywords:'rate limiting backpressure 429 system design',
    deep:[
      {
        title:'公平和容量不是一个阈值',
        body:'按用户限流解决的是谁占用过多。按连接或下游并发限流解决的是资源会被打坏。一个用户远低于个人配额时，仍可能因为查询太重而占满连接池。两个限制都要有。重查询可以在个人配额之内打满连接。'
      },
      {
        title:'怎样自己验证',
        body:'单独压一个重查询接口，看连接池在途数是否先到顶，而网关的每用户计数还没到。给该资源加上并发上限后再压，确认超限被拒绝，短查询不再一起超时。分开看两个指标。再看。'
      }
    ]
  },
{
    track:'java',
    group:'算法',
    id:'complexity',
    title:'复杂度与输入规模',
    prompt:'O(n log n) 一定比 O(n²) 在任何输入上都快吗？',
    core:'大 O 描述增长趋势的上界，不包含常数、内存访问和输入规模。实际选择还要看数据量、分布、空间开销与基准测量。顺序是：先证明结果正确，包括稳定性这类要求，再写出时间和额外空间如何随 n 增长，最后用目标规模测量。边界是：阶只在 n 足够大时主导。小数组上常数和缓存更重要，二次算法可以更快。最坏分布和平均分布也不同，不能把某一个 n 上的测量写成对所有输入都成立。大 O 丢掉常数，只在规模足够大时主导。小数组上要测量。稳定性等正确性要求先满足，再比较增长阶和额外空间。某一次的秒数不能写成对所有输入都成立。空间上的额外数组也要算进选择，不能只比时间阶。再测一次。',
    why:'错把 O(n²) 在任何输入上都比 O(n log n) 慢，一百个元素时简单的二次排序可能更快。大 O 比的是增长趋势，不是这一次的秒数。能分开的信号是：输入规模落在常数还没被阶盖住的区间，还是已经到了大规模。',
    example:'100 个整数用插入排序和归并排序都在毫秒内完成，插入排序可能更快。100 万个整数时，二次算法的耗时明显长于 n log n 的实现。几乎有序的 100 万个元素上，插入排序的常数优势仍盖不住二次增长，耗时仍明显更长。',
    task:'为 100 个和 100 万个元素分别选排序方案，并说明验证方式。',
    answer:'100 个元素先满足稳定性等正确性要求，简单算法往往够用，以这次测量为准。100 万个元素增长阶会盖过常数，通常选 n log n 一类，并实际计时确认。两种规模不要用同一句“阶更低就一定更快”来回答。先写正确性，再写阶，最后用这两个规模各测一次。',
    keywords:'algorithm Big O time complexity',
    deep:[
      {
        title:'阶和这一次的耗时',
        body:'大 O 丢掉常数和低阶项，也假定 n 趋向很大。小 n 时被丢掉的常数可以决定胜负。空间额外占用、数据是否几乎有序，都会改变这次测量，但不改变阶的定义。几乎有序会改变这次耗时，不改变最坏阶。'
      },
      {
        title:'怎样自己验证',
        body:'用同一组 100 个和 100 万个整数分别计时两种排序。小规模允许简单算法更快。大规模应看到二次算法明显落后。再换一组几乎有序的数据，看平均情况是否偏离最坏阶。'
      }
    ]
  },
{
    track:'java',
    group:'算法',
    id:'bfs',
    title:'BFS、队列与最短步数',
    prompt:'无权图找最少步数，为什么常用 BFS？',
    core:'BFS 按距离起点的层数扩展节点。在每条边代价相同且正确维护访问状态时，首次到达目标对应最少边数。带不同权重时不能直接套用此结论。顺序是：起点入队并标记，每次取出队头，把它尚未访问的邻居以加一的距离入队。边界是：标记要在入队时做，否则同一节点会多次进队。边权不同要用按代价扩展的算法，第一层先到不代表总代价最小。队列空了还没到，就是不可达。起点入队并立刻标记。每次取出队头，把未访问邻居以距离加一入队并标记。边权都是 1 时，第一次出队碰到目标就是最少步数。边权不同，这个层序不再等于代价顺序。队列空了还没到目标，就是不可达，不要再猜一条更短的路。层数即步数。',
    why:'错把 BFS 当成任何图的最少代价，边权不同时先扩到的那层不一定最便宜。无权迷宫里第一步相等，带权图里不是。能分开的信号是：每条边的代价是不是相同，以及是不是第一次到达目标，边权必须相同。',
    example:'四方向迷宫从起点开始，队列第一层是上右下左里能走的格子，第二层是它们尚未访问的邻居。第一次进入终点时，步数等于层数，少一步的路径已经在前面试过。把通往终点的一条边代价改成 5 后，BFS 仍先走到步数少的那条，总代价却更高。',
    task:'给四方向迷宫画出前两层队列，并记录 visited。',
    answer:'第一层是起点四个方向上可走且未访问的格子，距离为 1。第二层是这些格子的未访问邻居，距离为 2。visited 在入队时记下，避免同一格进队多次。边权都是 1 时，首次到达目标的层数就是最少步数。若某条边代价不是 1，这个结论不再成立。visited 若拖到出队才标记，同一格会进队多次。',
    keywords:'BFS queue graph shortest path unweighted',
    deep:[
      {
        title:'层数等于步数的条件',
        body:'每条边代价相同，先入队的节点距离一定不大于后入队的。第一次到达目标时，更短的路径已经扩展过了。边权不同，这个单调性没有了，队列顺序不再是代价顺序。标记晚了，队列里会有重复格子。'
      },
      {
        title:'怎样自己验证',
        body:'在纸上画一个小迷宫，手写前两层队列和 visited。再跑程序打印出队顺序，核对层数。把其中一条边的代价改成 5，确认 BFS 先到的路径不是总代价最小的那条。'
      }
    ]
  }
);
Object.assign(window.LESSON_REFERENCES,{
  'js-equality':[['MDN：Object.is','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is']],
  'promise-chain':[['MDN：Using promises','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises']],
  esm:[['MDN：JavaScript modules','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules']],
  'http-cache':[['MDN：HTTP caching','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching']],
  cors:[['MDN：CORS','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS']],
  xss:[['MDN：CSP implementation','https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP']],
  layout:[['MDN：Rendering performance','https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Rendering_performance']],
  'state-queue':[['React：Queueing state updates','https://react.dev/learn/queueing-a-series-of-state-updates']],
  'controlled-input':[['React：input','https://react.dev/reference/react-dom/components/input']],
  context:[['React：useContext','https://react.dev/reference/react/useContext']],
  suspense:[['React：Suspense','https://react.dev/reference/react/Suspense'],['React：lazy','https://react.dev/reference/react/lazy']],
  'frontend-testing':[['Testing Library：Guiding Principles','https://testing-library.com/docs/guiding-principles/']],
  accessibility:[['MDN：button element','https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button']],
  'java-generics':[['Oracle：Generics and erasure','https://docs.oracle.com/javase/tutorial/java/generics/erasure.html']],
  'java-exceptions':[['Oracle：try-with-resources','https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html']],
  'java-happens-before':[['Java SE 21：Memory Model','https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html']],
  'java-executor':[['Java SE 21：ThreadPoolExecutor','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html']],
  'java-virtual-threads':[['Oracle：Virtual Threads','https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html']],
  'java-gc':[['Oracle：GC Tuning Guide','https://docs.oracle.com/en/java/javase/21/gctuning/']],
  'spring-rollback':[['Spring：Using @Transactional','https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html']],
  'spring-propagation':[['Spring：Transaction Propagation','https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/tx-propagation.html']],
  'mysql-mvcc':[['MySQL 8.4：InnoDB Transaction Model','https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html']],
  'mysql-isolation':[['MySQL 8.4：Transaction Isolation','https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html']],
  'redis-expire':[['Redis：EXPIRE','https://redis.io/docs/latest/commands/expire/'],['Redis：Cache-aside','https://redis.io/docs/latest/develop/use-cases/cache-aside/']],
  'message-delivery':[['Apache Kafka：Delivery Semantics','https://kafka.apache.org/documentation/#semantics']],
  'rate-limit':[['IETF：HTTP 429','https://www.rfc-editor.org/rfc/rfc6585#section-4']],
  complexity:[['MIT OpenCourseWare：Asymptotic Notation','https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/']],
  bfs:[['MIT OpenCourseWare：Breadth-First Search','https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/']]
});
