/* Original explanations. Source collection supplies topic coverage, not licensed text. */
window.LESSONS=[
{
    track:'frontend',
    group:'语言基础',
    id:'closure',
    title:'闭包、状态快照与函数组件',
    prompt:'为什么事件处理器可能读到旧 state？',
    core:'JavaScript 函数能访问创建它那一次调用中的变量。React 组件每次渲染都会再次执行函数，形成新的变量绑定；旧事件处理器仍可能引用旧渲染的值。一次点击的顺序是：先读这次渲染的快照，再把更新排进队列，等这次函数结束、下一次渲染才创建新的处理器。边界是：函数式更新不读取当前闭包里的旧数字，而是用队列里已经算出的上一个结果继续算；直接传入 count + 1 则三次都用同一个快照。异步回调若仍引用这次渲染创建的函数，读到的也是当时的快照。日志若打在点击函数里，count 仍是 0；界面上的 1 或 3 要等下一次渲染。函数式更新读队列里的上一个结果，不读这次闭包中的 count。',
    why:'错把 setState 当成会立刻改写当前变量，三次 count + 1 就会被预测成 3。实际三次都读到同一次渲染的 0，界面停在 1。能分开的信号是：传入的是已经算好的数字，还是一个接收上一次队列结果的函数。',
    example:'count 为 0 时，同一次点击执行三次 setCount(count + 1)，三次入队的都是 1，下一次渲染是 1。换成三次 setCount(n => n + 1)，队列依次算出 1、2、3。',
    task:'从 count=0 开始，在一次点击中连续调用三次 setCount(count + 1)，再换成三次函数式更新。分别预测结果。',
    answer:'三次 setCount(count + 1) 都读取这次渲染的快照 0，入队的新值都是 1，下一次渲染得到 1。换成三次 setCount(n => n + 1) 后，函数依次用队列里的前一个结果计算，得到 1、2、3。当前点击函数里的 count 变量在这期间一直是 0。',
    react:'hooks',
    keywords:'闭包 state react hooks setState',
    deep:[
      {
        title:'快照和队列',
        body:'处理器闭包里的 count 在本次调用期间不会被 setCount 改写。替换更新把算好的数字入队；函数式更新把函数入队，渲染前按顺序用上一个结果调用它。不要在同一次点击里用 count 的当前值推断最终界面。'
      },
      {
        title:'怎样自己验证',
        body:'从 0 开始，在按钮里连续三次 setCount(count + 1)，看界面是否变成 1。再改成三次函数式更新，看是否变成 3。渲染时打日志，确认点击函数里的 count 仍是 0。'
      }
    ]
  },
{
    track:'frontend',
    group:'语言基础',
    id:'eventloop',
    title:'事件循环与微任务',
    prompt:'Promise.then 和浏览器绘制的先后关系是什么？',
    core:'同步 JavaScript 先运行。当前任务结束后，事件循环处理微任务检查点；浏览器随后可能进行渲染。微任务过多也可能延迟绘制。顺序是：调用栈清空，再清空微任务队列，然后浏览器才可能计算样式、布局和绘制，之后才轮到定时器一类的后续任务。边界是：微任务不是“稍后随便某个时刻”；它插在当前任务和绘制之间。React 的根调度会使用微任务整理待处理根，但真正执行同步工作还是安排任务，取决于当前优先级与条件。在微任务回调里再排 queueMicrotask，新的微任务仍属于这一轮检查点，绘制继续等待。只有微任务清空，浏览器才得到绘制机会。绘制要等微任务检查点清空之后才会到来。',
    why:'错把 Promise.then 当成和 setTimeout 一样的下一轮宏任务，就会以为绘制可以插在微任务前面。实际同步代码结束后会先清空微任务，绘制被推迟。能分开的信号是：回调进的是微任务队列，还是后续的任务队列。',
    example:'点击处理里先 console.log(1)，再 queueMicrotask 打印 3，再 console.log(2)。控制台先看到 1、2，然后才是 3；3 完成前浏览器还没得到绘制机会。setTimeout 打印 4 会排在 3 之后。',
    task:'画出一次点击处理器、同步日志、queueMicrotask 回调、浏览器获得绘制机会的顺序。',
    answer:'点击处理器里的同步日志先全部完成。接着事件循环到达微任务检查点，把 queueMicrotask 的回调跑完。微任务清空之后，浏览器才可能绘制。若微任务里继续排入新的微任务，绘制会继续被推迟。setTimeout 回调要再等一轮任务，不能插进尚未清空的微任务前面。',
    react:'scheduler',
    keywords:'事件循环 微任务 Promise Scheduler',
    deep:[
      {
        title:'微任务和绘制',
        body:'一次点击任务里的同步代码先跑完。Promise.then 和 queueMicrotask 在这次任务结束后立即执行。浏览器绘制要等这一轮微任务清空，不能插在 then 回调之前。'
      },
      {
        title:'怎样自己验证',
        body:'在点击函数里依次打印同步日志、queueMicrotask 和 setTimeout。再打开性能面板看绘制是否出现在微任务之后、定时器之前。递归排入微任务时，绘制应继续后移。'
      }
    ]
  },
{
    track:'frontend',
    group:'React',
    id:'linked-list',
    title:'链表、树与位运算',
    prompt:'为什么 Hook 顺序会影响 state 身份？',
    core:'Hook 节点通过 next 串联，Fiber.memoizedState 指向链表头。更新时 React 依次读取旧节点，调用顺序提供了位置身份。Lane 用不同二进制位表达更新集合。顺序是：渲染时按调用次序创建或对上 Hook 节点，提交后这些节点留在 Fiber 上；下次渲染再从头沿 next 读取。边界是：条件里增减 Hook 会让链表错位，类型相同但位置不同的节点不能靠变量名找回。child、sibling、return 描述树的遍历，alternate 才指向同一身份的另一版本。Lane 的某一二进制位表示一批更新，不是节点在树上的位置。遍历用 child 走到第一个孩子，再用 sibling 走向兄弟。',
    why:'错把 Hook 当成按变量名保存，就会以为多写一个 useState 只是多一个字段。实际调用顺序变了，后面的状态会读到别人的节点。能分开的信号是：组件函数里 Hook 的调用次序有没有在各分支间保持一致。',
    example:'组件先调用 useState(0) 再调用 useState("a")。下次渲染若跳过第一个，第二个 useState 会读到原先存 0 的节点，字符串状态错位。条件恢复后，两次 useState 又按原顺序对上各自的节点。',
    task:'画 App 的两个子节点 Header、Main 的 child/sibling/return 关系，并指出它们的 alternate。',
    answer:'App.child 指向 Header，Header.sibling 指向 Main，Header 和 Main 的 return 都指向 App。alternate 不是父子关系，而是另一棵树上同一组件身份的对应节点：Header.alternate 指向另一棵树的 Header，Main.alternate 指向另一棵树的 Main。',
    react:'fiber',
    keywords:'链表 Fiber tree lane bitmask',
    deep:[
      {
        title:'调用顺序即身份',
        body:'memoizedState 只保存链表头。每个 Hook 靠“第几次调用”对上旧节点，不靠变量名。条件调用会让后面的 useState 读到前一个 Hook 留下的状态。'
      },
      {
        title:'怎样自己验证',
        body:'在组件里连续写两个 useState，把第二个放进 if 并来回切换条件。观察第二个状态是否串到第一个的值上。再画 App、Header、Main 的 child、sibling、return 和 alternate。'
      }
    ]
  },
{
    track:'frontend',
    group:'浏览器',
    id:'rendering',
    title:'JSX 到浏览器像素',
    prompt:'React Render 和浏览器 Paint 是一回事吗？',
    core:'JSX 先被工具转换成 JavaScript。执行时创建 React Element；React 协调 Fiber 并提交 DOM；浏览器再计算样式和布局、绘制并合成。顺序是：编译期把 JSX 变成 createElement 一类调用，渲染期得到 Element 和 Fiber，提交期才操作 DOM，浏览器随后才做样式、布局、绘制和合成。边界是：React 的 Render 不等于浏览器的 Paint。root.render 只是安排更新，函数返回时像素可能还没画出来。性能问题要按这几层分别看耗时，不能把卡顿都算进组件函数。测量布局要等浏览器完成 Layout，不能紧跟在 render 调用后面读几何尺寸。',
    why:'错把 root.render 的返回当成像素已经画完，就会在下一行立刻测量布局并得到旧尺寸。实际这时往往只有 React 更新被排上日程。能分开的信号是：卡顿出现在 JavaScript 调用栈，还是浏览器的 Layout 和 Paint 记录。',
    example:'调用 root.render(<App />) 后立刻读 offsetHeight，常得到更新前的高度。React 提交 DOM 且浏览器完成布局之后，同一读数才变成新高度。性能面板里 Paint 出现在提交脚本之后，而不是在 render 那一行返回时。',
    task:'指出 createElement、appendChild、Layout 和 Paint 分别属于哪一层。',
    answer:'createElement 属于 JavaScript 层，产出的是 React Element，还没有 DOM。appendChild 属于 React 提交时的宿主操作，把节点放进文档。Layout 和 Paint 属于浏览器渲染：先算几何，再画像素。root.render 返回时，这四步通常还没有全部发生。',
    react:'pipeline',
    keywords:'JSX React DOM CSSOM Layout Paint',
    deep:[
      {
        title:'四层不要并成一层',
        body:'createElement 只产生描述。提交阶段才 appendChild。浏览器随后单独做 Layout 和 Paint。某一层慢，优化要落在那一层，而不是笼统地减少渲染次数。'
      },
      {
        title:'怎样自己验证',
        body:'在 root.render 前后各读一次 offsetHeight，并在性能面板里标出脚本、Layout 和 Paint。确认 render 返回时读数仍可能是旧的，Paint 出现在提交之后。'
      }
    ]
  },
{
    track:'frontend',
    group:'React',
    id:'identity',
    title:'key、身份与列表状态',
    prompt:'为什么使用数组下标作为 key 可能让输入框内容错位？',
    core:'同一父节点下，React 用 key 和元素类型识别旧节点与新节点。用下标当 key 时，重排后相同位置可能代表不同业务项，旧组件状态却被复用。顺序是：先按 key 配对旧 Fiber，再决定复用、移动或新建；对上之后，输入框里的 state 留在那个 Fiber 上。边界是：key 只在同一父节点的兄弟之间比较，不能拿它做全局身份。每次渲染都变的随机 key 会让节点被当成全新的，输入被清空。类型变了，即使 key 相同也会重建。列表过滤掉一项时，稳定 key 会卸载该项并带走它的 state；下标 key 则可能把下一项装进留下的格子。key 只在同一父节点的兄弟之间比较。',
    why:'错把 key 当成消除警告的装饰，重排后仍用下标，输入文字就会留在原来的格子里。业务项已经换成另一行，状态却还是上一行的。能分开的信号是：重排之后文字跟着业务 id 走，还是跟着格子位置走。',
    example:'A、B 两个输入框，A 里写了“甲”。顺序换成 B、A 后，稳定 key 下“甲”仍在 A；用下标当 key 时，“甲”留在第一个格子，跟到了 B。在列表开头插入 C 后，下标 key 会让原来 A 的文字出现在 C 上。',
    task:'给 A、B 各一个输入状态，交换顺序后预测稳定 key 与 index key 的状态归属。',
    answer:'给 A、B 各一个输入状态后交换顺序：稳定 key 让文字跟着 A 和 B 走，A 里的字仍在 A。用下标当 key 时，位置 0 沿用原来位置 0 的状态，文字留在第一个格子，不跟着业务项走。原因是 React 用 key 和类型认旧节点，下标没变就被当成同一个人。',
    react:'diff',
    keywords:'React key reconciliation diff',
    deep:[
      {
        title:'位置和业务身份',
        body:'下标 key 表达的是格子，不是业务项。插入或交换后，同一下标对上另一个项，旧输入状态被这个新项继承。稳定 id 才能让状态跟着项走。插入、删除和拖拽都会改变下标，所以下标不能当身份。'
      },
      {
        title:'怎样自己验证',
        body:'做两个带输入框的列表项，先在第一项打字，再交换顺序。分别用 id 和下标当 key，看文字留在哪一项。再把 key 改成每次渲染的随机数，输入应被清空。随机 key 会在每次渲染时清空输入。'
      }
    ]
  },
{
    track:'frontend',
    group:'React',
    id:'effects',
    title:'Effect、清理与提交时序',
    prompt:'useEffect 一定在浏览器绘制后运行吗？',
    core:'React 在 Render 记录 Effect，在提交后刷新 Passive Effect。常见情况下它晚于绘制，但某些交互或布局阶段触发的更新可使其在绘制前刷新。Layout Effect 在 DOM 变更后、重绘前运行。顺序是：渲染只登记依赖和清理函数，提交 DOM 之后先刷新 layout effect，浏览器可能绘制，再刷新 passive effect。边界是：effect 不能在可能被放弃的 Render 阶段执行，也不适合充当“每次渲染都同步算出来的值”。依赖没变就不会重跑；依赖变了或卸载时才清理。开发构建里的 StrictMode 会多跑一轮 setup 和 cleanup，用来检查对称性，这不是生产环境的时序。',
    why:'错把 useEffect 当成“绘制之后必定执行”，就会在布局测量里用它并读到已经画完的旧帧。某些交互或布局阶段触发的更新可以在绘制前刷新被动效果。能分开的信号是：这次刷新发生在 Paint 之前还是之后。',
    example:'依赖从 42 变成 43 时，先执行 42 那次 effect 返回的 cleanup，再执行 43 的 setup。屏幕还停在 42 时，慢返回的响应不应再 setState。卸载组件后，cleanup 里的 abort 使后到的响应不再 setState。',
    task:'解释依赖变化、卸载、StrictMode 开发检查时 cleanup 分别何时发生。',
    answer:'依赖从旧值变成新值时，先跑上一次 setup 返回的 cleanup，再跑新的 setup。组件卸载时也会跑最后一次 cleanup。开发环境的 StrictMode 还可能额外执行一轮 setup 和 cleanup，用来检查清理是否对称；生产环境没有这一轮额外检查。',
    react:'effects',
    keywords:'useEffect useLayoutEffect cleanup',
    deep:[
      {
        title:'清理先于下一次订阅',
        body:'依赖变化时，旧 cleanup 先执行，新 setup 后执行。卸载走最后一次清理。若 cleanup 漏掉取消请求，慢响应仍会写入已经离开的那次状态。空依赖数组不会因为 id 变化而重新订阅。'
      },
      {
        title:'怎样自己验证',
        body:'用一个随 id 变化的 effect 打日志：setup、cleanup、绘制。切换 id 时确认先看到旧 cleanup。在开发 StrictMode 下再看是否多一轮成对的 setup 和 cleanup。'
      }
    ]
  },
{
    track:'frontend',
    group:'React',
    id:'event-system',
    title:'React 事件与原生事件',
    prompt:'React 19 仍把所有 click 处理器委派到 document 吗？',
    core:'现代 React DOM 为许多事件在根容器注册监听，也存在针对 document 或特定目标的特殊处理。合成事件包装了浏览器事件，stopPropagation 控制传播，preventDefault 控制默认行为。顺序是：浏览器在注册点收到原生事件，React 再按树派发合成事件，先沿捕获路径，再沿冒泡路径。边界是：不能再说所有 click 都委派到 document，也不能说 stopPropagation 对 React 监听无效。它拦住的是后续传播；默认动作要靠 preventDefault。原生监听和 React 监听不在同一层时，要分别看注册位置。',
    why:'错把旧资料里的“事件一律绑在 document 上，stopPropagation 无效”当成现状，就会在内层按钮上拦不住外层。能分开的信号是：调用的是 stopPropagation 还是 preventDefault，以及监听是在根容器还是 document。',
    example:'外层 div 和内层 button 都监听 click。点按钮时先走内层；内层 stopPropagation 后，外层的 React 处理函数不再执行。preventDefault 不会去掉这层冒泡。',
    task:'用一个内外两层按钮容器，分别测试 stopPropagation 与 preventDefault 的效果。',
    answer:'stopPropagation 控制传播：内层调用后，外层监听不到这次点击继续冒泡。preventDefault 控制默认动作：它能拦住链接跳转或表单提交，但不负责拦住外层的点击处理函数。两者可以同时用，解决的是两件不同的事。链接上的 preventDefault 能停住跳转，外层 onClick 仍会执行。',
    react:'events',
    keywords:'SyntheticEvent React 事件 委派',
    deep:[
      {
        title:'传播和默认动作',
        body:'stopPropagation 让后面的监听器收不到这次事件。preventDefault 留下传播，但取消链接、提交等浏览器默认行为。根容器上的委托不等于 document 上只有一个监听器。'
      },
      {
        title:'怎样自己验证',
        body:'做内外两层都打印日志的按钮容器。只在内层 stopPropagation，确认外层日志消失。再给链接只调用 preventDefault，确认不跳转但外层点击日志仍在。'
      }
    ]
  },
{
    track:'frontend',
    group:'工程实践',
    id:'performance',
    title:'性能诊断：测量再优化',
    prompt:'memo 为什么不能解决所有慢渲染？',
    core:'memo 比较 props，并在合适条件下让组件跳过某些重算。组件自己的 state、context、外部 store 和昂贵浏览器布局仍可能造成工作。顺序是：先用 Profiler 量组件渲染，再用浏览器 Performance 量提交后的布局和绘制，确认最贵的一层，再改那一层。边界是：memo 挡不住组件内部 setState，也挡不住 context 或外部 store 的更新；props 每次都是新对象时，浅比较会失败。没有测量之前不要先加 memo。输入卡顿时先分清三次证据：Profiler 的渲染耗时、提交的 DOM 变更、Performance 里的 Layout。对不上的优化不要做。',
    why:'错把 memo 当成所有卡顿的开关，props 没变时仍可能因自己的 state、context 或布局而慢。优化加在错误的一层，Profiler 里的耗时不会下降。能分开的信号是：时间花在组件渲染、DOM 提交，还是浏览器 Layout。',
    example:'子组件用 memo，父组件每次传入新的对象字面量 style={{}}。浅比较失败，子组件仍重渲染。改成稳定引用后，Profiler 里该子组件被跳过。把 style 提到组件外变成常量后再录一次，跳过才出现。',
    task:'列出一次输入卡顿可能来自计算、DOM 提交和布局的三种证据。',
    answer:'计算成本看 Profiler 里该组件的渲染耗时，渲染次数高且函数本身重，才考虑减少重算。DOM 提交成本看提交阶段的变更数量和耗时。布局成本看浏览器 Performance 里的 Layout 和 Paint。三种证据对上之后，再决定用 memo、减少提交，还是改读写顺序。',
    react:'architecture',
    keywords:'memo Profiler 性能',
    deep:[
      {
        title:'跳过的条件',
        body:'memo 只在 props 浅比较相等、且没有自身 state、context 或外部 store 更新时才可能跳过。新的对象字面量、内联函数会让比较失败。布局成本它完全看不见。'
      },
      {
        title:'怎样自己验证',
        body:'用 Profiler 录一次输入。若子组件在 props 没变时仍渲染，检查它是否读了 context 或自己的 state。再在 Performance 里看耗时落在脚本还是 Layout。'
      }
    ]
  },
{
    track:'java',
    group:'JVM',
    id:'java-memory',
    title:'JVM 内存、对象与可达性',
    prompt:'对象没有变量引用就立刻被回收吗？',
    core:'垃圾回收判断对象是否从 GC Roots 可达。对象何时被收集由收集器和内存压力等因素决定，不保证无人引用后立即回收。顺序是：先从线程栈、静态字段等根出发标记可达对象，标记不到的才是可回收垃圾，然后在某次收集里被清掉。边界是：不可达只说明可以回收，不说明已经回收；本地变量消失后，静态 Map、缓存、监听器仍可能让对象活着。分析泄漏时要画引用链，而不是看“变量是不是出了作用域”。监听器、ThreadLocal 和未取消的任务同样可以当根。画链时从这些根走，不要只看业务代码里的局部变量。收集器何时运行由堆压力和收集策略决定，不是由引用断开的那一行决定。先画链再谈回收。',
    why:'错把“没有局部变量指向它”当成已经释放内存，就会在泄漏仍可达时去调 GC 参数。实际静态集合还握着引用，回收根本不会开始。能分开的信号是：从 GC Root 出发还能不能走到这个对象。',
    example:'静态 Map 放入一个用户对象后，去掉方法里的局部变量，堆转储里该对象仍从静态字段可达。删除这个 Map 键之后，同一条链断开。用 VisualVM 或 jmap 看引用链，根是那个静态 Map 的类字段，而不是已经返回的方法。',
    task:'画出静态缓存 → 集合 → 用户对象的引用链，再说明删除缓存键的影响。',
    answer:'静态缓存指向集合，集合指向用户对象，这条链从 GC Root 可达，对象不会被回收。删除缓存键之后，若没有线程栈、静态字段或其他根再指向它，用户对象变为不可达，满足回收条件。实际回收仍要等收集器运行，删除键不等于立刻腾出内存。把缓存键删掉后再看引用链，用户对象不再从该静态字段可达。',
    keywords:'Java JVM GC roots 内存',
    deep:[
      {
        title:'可达和回收时机',
        body:'没有局部变量不等于不可达。静态集合、线程栈和类静态字段都可能是根。不可达之后仍要等收集器决定何时清扫，不能把删引用写成立刻释放。ThreadLocal 忘记 remove 时，线程池里的线程会把对象一直留着。'
      },
      {
        title:'怎样自己验证',
        body:'建一个静态 Map，放入对象后去掉局部变量，做一次堆转储，看该对象是否仍从静态字段可达。删除键后再转储，确认这条引用链消失。删除键之后再转储，该对象不应再挂在静态字段下面。'
      }
    ]
  },
{
    track:'java',
    group:'Java 基础',
    id:'java-collections',
    title:'HashMap 与集合选择',
    prompt:'HashMap 的键为什么要正确实现 equals 与 hashCode？',
    core:'哈希值决定桶的候选位置，equals 判定逻辑相等。相等对象必须有相同哈希值，否则查找会落入不同桶。顺序是：put 时用当时的 hashCode 选桶，get 时用现在的 hashCode 再选桶，只有落在同一桶并用 equals 对上才算找到。边界是：只重写 equals 不重写 hashCode 会破坏这个契约；用可变字段做键时，放入后修改字段等于把钥匙改了，条目还挂在旧桶上。身份相等和业务相等不是一回事，要先选定哪一组字段定义同一个人。HashSet 同样依赖这条约定：hashCode 不同的相等对象会变成两个元素。比较时用同一组字段，放入之后不要再改它们。',
    why:'错把 HashMap 当成按字段内容自动认人，equals 和 hashCode 只改一个，查找就会进错桶或对不上。键放进去之后再改参与哈希的字段，原来的条目还在，却按新值找不到。能分开的信号是：相等的两个对象，hashCode 是否相同。',
    example:'Person 以 name 计算 hashCode 并放入 Map。随后把 name 从“甲”改成“乙”，再用“乙”或“甲”去 get，都可能得不到刚放进去的值。改回用不可变 id 做 hashCode 和 equals 后，用同一个 id 可以 get 到原值。',
    task:'设计一个 Person 键，说明哪些字段参与 equals/hashCode，以及何时应避免可变字段。',
    answer:'equals 和 hashCode 使用同一组稳定字段，例如工号，不要一边比姓名一边只哈希工号。姓名若会改，就不要放进这组字段。键放进 HashMap 之后，这些字段必须保持不变。否则哈希桶和相等判断不再指向放入时的位置，get 会失败。姓名会变就不要参与哈希。',
    keywords:'Java HashMap equals hashCode',
    deep:[
      {
        title:'桶和相等是两步',
        body:'hashCode 只负责把查找带到候选桶。桶里仍要用 equals 确认是不是同一个键。两个方法必须使用同一组字段，并且这组字段在键进入集合后不再变化。只改 equals 不改 hashCode，contains 会因为桶不同而返回 false。'
      },
      {
        title:'怎样自己验证',
        body:'写一个只改 name 的 Person，放入 HashMap 后修改 name，再分别用旧名和新名 get。确认都拿不到原值。改成以不可变工号做键后，同一查找应成功。'
      }
    ]
  },
{
    track:'java',
    group:'并发',
    id:'java-concurrency',
    title:'线程、可见性与原子性',
    prompt:'volatile 能让 count++ 线程安全吗？',
    core:'volatile 提供特定的可见性和有序性保证；count++ 包括读、加、写多个步骤，整体不因 volatile 变成原子操作。顺序是：线程读出当前值，在寄存器里加一，再把结果写回。两步之间另一个线程可以读到同一个旧值。边界是：可见性解决“写了能不能看见”，原子性解决“三步会不会被拆开”。只加 volatile 仍可能丢更新。计数要用原子类或锁；更复杂的不变量还要看临界区里是否包含了全部相关读写。锁或原子类把读和写放进同一个临界区，另一个线程必须等这次写完才能读。volatile 做不到这一点。临界区必须盖住全部相关的读和写，少包一步，不变量仍会破。先分清是哪一种。',
    why:'错把 volatile 当成让 count++ 变成原子操作，两个线程会各自加一得到 2。实际两边都读到 0，后写的人把结果盖成 1。能分开的信号是：丢的是可见性，还是读、改、写中间被别人插了一脚。',
    example:'两个线程都读到 count 为 0，各自算出 1 并写回。最后打印是 1，其中一次加一被盖掉。改成 AtomicInteger.incrementAndGet 后得到 2。循环一万次后，volatile 计数经常小于两万，原子自加则等于两万。',
    task:'模拟两个线程都读到 0、各自加 1 并写回，最终结果是多少？',
    answer:'两个线程都读到 0，各自加 1 再写回，后完成的写入把结果写成 1，最终是 1 而不是 2。volatile 只保证这次写入对别的线程可见，不把读、加、写收成一步。要得到 2，需要原子自增或用锁把这三步包在一起。两次写回只有一次留下，丢失的那次加一不会补回来。',
    keywords:'Java volatile CAS synchronized 线程',
    deep:[
      {
        title:'三步不是一步',
        body:'count++ 先读再加再写。volatile 让单次读写可见，却不锁住这三步。两个线程读到同一个值时，两次写回只会留下一个结果。看字节码或拆开写成读、加、写三行，更容易看见中间可以被打断。'
      },
      {
        title:'怎样自己验证',
        body:'用两个线程对 volatile int 各做大量自增，打印最终值，它经常小于预期和。换成 AtomicInteger.incrementAndGet 后再跑，结果应等于两边次数之和。'
      }
    ]
  },
{
    track:'java',
    group:'框架',
    id:'spring-transaction',
    title:'Spring 事务边界',
    prompt:'同一个类里的方法直接调用另一个 @Transactional 方法一定生效吗？',
    core:'常见 Spring 声明式事务经由代理拦截方法调用。对象内部的 self-invocation 可能绕过代理，因此事务行为还取决于代理方式和调用路径。顺序是：容器交给外部的是代理，外部调用先进入拦截器，再转到目标方法；目标方法里的 this 指向目标本身，内部调用不再包一层。边界是：自调用绕过代理是常见 JDK 或 CGLIB 代理的行为，不能写成所有事务技术都如此。private 方法、从别的类直接 new 出来的对象，同样不在这条代理链上。先画调用栈，再判断事务开没开。从容器外 new 出来的 Service 没有代理，注解同样不会生效。事务是否开启，以调用是否经过代理为准。',
    why:'错把类上有 @Transactional 当成内部调用也会开事务，this.inner() 失败时外层却已经提交。回滚没发生，库里留下半截数据。能分开的信号是：这次调用经过代理，还是目标对象上的直接调用。',
    example:'Controller 调用 service.create()，进入代理，事务拦截器生效。create 里执行 this.audit()，调用栈上没有再次进入代理，audit 自己的注解不生效。在两边都打印 TransactionSynchronizationManager.isActualTransactionActive()。',
    task:'画出控制器经代理调用和 this 调用两条链。',
    answer:'控制器经注入的 Service 调用时，箭头经过代理和事务拦截器，public 方法上的事务生效。同一对象里的 this.inner() 在常见代理模式下直接进入目标对象，不经过拦截器，inner 上的 @Transactional 不会另开或加入事务。是否生效先看调用路径，再看注解。',
    keywords:'Spring @Transactional proxy self invocation',
    deep:[
      {
        title:'代理只包外部入口',
        body:'注入得到的引用才是代理。目标对象内部用 this 调用另一个方法时，拦截器不会再执行。注解写在内部方法上，也改变不了这条直接调用。final 类或 private 方法上的注解，常见代理也拦截不到。'
      },
      {
        title:'怎样自己验证',
        body:'在事务方法里打印是否处于事务中，再从控制器调用和从 this 调用各打一次。外部调用应为真，自调用在常见代理模式下应为假。对照日志看提交还是回滚。对比两次打印：外部入口为 true，this 调用为 false。'
      }
    ]
  },
{
    track:'java',
    group:'数据库',
    id:'mysql-index',
    title:'SQL 索引与执行计划',
    prompt:'建了索引就一定会走吗？',
    core:'优化器根据选择性、统计信息、谓词形态和成本选择访问路径。组合索引与查询条件的关系需要看具体计划，而非只背最左前缀。顺序是：先看 WHERE、ORDER BY 和选择出来的列，再设计索引列的次序，然后用 EXPLAIN 看它是否被选中，最后用真实数据量核对耗时。边界是：索引存在不等于被使用；对列套函数、隐式类型转换、选择性极低，都可能让扫描更便宜。测试库只有几行时的计划，不能直接代表生产分布。用 EXPLAIN 看 type、key 和 rows，再用真实耗时核对。统计信息过期时先更新统计，而不是先加一条重复索引。生产分布和测试库不同，计划就要重新看一次。',
    why:'错把“建了索引就一定会走”当成规则，低选择性或列上套了函数时优化器仍可能扫表。查询不慢在“没有索引”，而慢在计划没选它。能分开的信号是：EXPLAIN 里的访问类型和预计行数，而不是建索引的语句本身。',
    example:'WHERE YEAR(created_at) = 2024 时，EXPLAIN 可能显示全表扫描。改成 created_at 的范围条件后，同一列上的索引才出现在计划里。status 只有两个取值时，EXPLAIN 的 rows 接近全表，优化器可能放弃该索引。',
    task:'为用户表的 status、created_at 查询设计索引，并比较两个过滤条件的选择性。',
    answer:'status 等值且按 created_at 排序时，组合索引把 status 放前面、created_at 放后面，等值能用左列，排序才有机会用右列。若 status 几乎人人相同，选择性很差，优化器可能仍不走这条索引。先按真实查询和分布设计，再用 EXPLAIN 看访问类型，用耗时确认，而不是只背最左前缀。',
    keywords:'MySQL index explain SQL',
    deep:[
      {
        title:'计划不是口诀',
        body:'最左前缀只描述索引列怎样被利用，不保证优化器一定选用。统计信息过期、选择性太低或谓词写在函数里，计划都会改道。以 EXPLAIN 的访问类型为准。测试库只有几十行时，全表扫描可能比索引更便宜。'
      },
      {
        title:'怎样自己验证',
        body:'对 status 加 created_at 的查询看 EXPLAIN。再把条件改成对 created_at 套函数，比较 type 和 rows。换一份选择性不同的数据后重跑，确认计划会变。'
      }
    ]
  },
{
    track:'java',
    group:'系统设计',
    id:'idempotency',
    title:'接口幂等与重试',
    prompt:'为什么支付或创建订单接口不能只靠前端防重复点击？',
    core:'请求可能因网络超时被重试，后端必须让同一业务操作的重复提交得到一致结果。常用业务唯一键、幂等键和持久化状态机。顺序是：先用键查找是否已有结果，没有则在同一事务里写入业务数据和这条键，冲突时读回第一次的结果。边界是：只在内存里记“处理过”挡不住多实例和重启；键必须落在数据库唯一约束上。幂等不是“第二次返回成功就行”，而是业务效果只发生一次，响应与第一次一致。前端防重复点击只减少连发，不是这个保证。超时后客户端分不清第一次有没有成功，只能用同一个键再试。服务必须把“已创建”和“正在创建”都记在这个键上。键要在所有实例之间共享，不能只放在某一台机器的内存里。否则重启就丢。',
    why:'错把前端禁用按钮当成只提交了一次，超时重试仍会再打一笔创建。两次都成功时出现两张订单，能分开的信号是：第二次带着同一个幂等键，返回的是不是第一次那张单。按钮状态变了，订单表仍可能多出一行。',
    example:'两次创建请求都带 Idempotency-Key: order-9。第一次插入订单并扣库存；第二次命中同一键，不再插入，响应里的订单号仍是第一次的。并发两个相同键的请求，订单表只有一行，两次响应的订单号相同，库存只减一次。',
    task:'设计订单创建的幂等键、持久化位置和并发冲突处理。',
    answer:'幂等键用业务唯一键或客户端带来的键，持久化在订单表的唯一列上。并发时两个请求都先查到没有记录，也只有一个插入成功，另一个撞上唯一约束后按键读出原订单并返回。库存只减一次。禁用按钮挡不住超时后的重试和并发到达。前端把按钮禁用只能减少连点，不能代替这次唯一约束。',
    keywords:'分布式 幂等 重试 订单',
    deep:[
      {
        title:'唯一约束才是兜底',
        body:'先查再插在两个请求之间会同时看到“没有”。没有唯一约束时两次都能插入。约束让第二次失败，服务再按同一键读出已提交的那一行返回。先查后插的两步要放在同一个事务里，冲突由唯一索引裁决。'
      },
      {
        title:'怎样自己验证',
        body:'用同一个幂等键并发发两次创建。看订单表是否只有一行、库存是否只减一次，以及两次响应的订单号是否相同。去掉唯一索引后再发，应能看到重复行。去掉唯一索引再发一次，应看到两行订单。加上之后再发，回到一行。'
      }
    ]
  },
{
    track:'java',
    group:'系统设计',
    id:'cache',
    title:'缓存一致性与失效',
    prompt:'更新数据库后立即删缓存，就绝对不会读到旧值吗？',
    core:'并发读写、传播延迟与故障会产生窗口。先定义允许的过期时间和一致性要求，再选择失效、版本号或读写协调策略。顺序是：写权威存储，再失效缓存，读的时候未命中则回源并回填。边界是：回填可能把更早读到的旧值写回去；主从延迟会让回源仍读到旧行。详情文案可以容忍这个窗口。库存、余额这类不变量不能交给缓存，必须由权威存储上的原子条件来保证。先写数据库再删缓存，只能缩短窗口，不能关掉窗口。读请求若在删除前拿到旧值、在删除后写回，缓存就又旧了。版本号或短 TTL 用来限制这段时间，不负责库存正确。权威数字在数据库。缓存命中只说明刚才有人写入，不说明现在仍然正确。不能拿它扣库存。',
    why:'错把“更新数据库后立刻删缓存”当成不会再读到旧值，并发窗口里另一个请求会把刚删掉的旧值写回去。详情可以短暂旧，库存这样用就会超卖。能分开的信号是：这条数据允许陈旧多久，权威数字到底在库里还是在缓存里。',
    example:'请求 A 读到库存 5 并准备回填缓存；请求 B 把数据库改成 4 并删除缓存。A 随后把 5 写回缓存，下一次读仍是 5。A 回填完成后 GET 缓存得到 5，而数据库已经是 4。详情页会短暂显示旧文案。',
    task:'区分商品详情与库存余额的缓存策略。',
    answer:'商品详情允许短暂旧值，可以用较短 TTL 加上更新后删除缓存。库存余额不能靠同一套缓存当权威：扣减走数据库条件更新或带版本的原子路径，缓存里的数字只做展示。删除缓存缩小窗口，不能把它说成绝对读不到旧值。库存接口不要读这层缓存来决定能不能扣减。',
    keywords:'Redis 缓存 一致性 失效',
    deep:[
      {
        title:'失效不是互斥',
        body:'删缓存和回填之间没有天然的锁。先读到旧值的请求可以在删除之后把旧值写回。TTL 只限制这段错误能活多久，不能取消这个交错。把回填延迟到删除之后，就能稳定复现旧值回写。'
      },
      {
        title:'怎样自己验证',
        body:'让一个请求先读旧值并暂停，另一个请求更新数据库并删除缓存，再让第一个请求回填。读缓存应能看到旧值。库存改成条件更新后，并发扣减不应出现负库存。库存路径改成条件更新后，并发两笔扣减只有一笔成功。'
      }
    ]
  },
{
    track:'java',
    group:'工程实践',
    id:'design-review',
    title:'系统设计题的回答框架',
    prompt:'如何避免一上来就说“上 Redis、MQ、分库分表”？',
    core:'先澄清规模、吞吐、延迟、一致性和故障目标；设计数据模型及最简单可行路径；再指出瓶颈、演进策略和验证方式。顺序是：问清峰值和正确性底线，画出一次请求碰到的数据，给出能满足不变量的最小设计，最后写明哪个指标到了阈值才引入新组件。边界是：组件名称不是架构。Redis 解决不了没定义的一致性，队列解决不了没定义的容量。每加一层都要说清它去掉的瓶颈和带来的失败模式。最小设计先用数据库条件更新保住库存不为负。只有连接数、锁等待或延迟分布证明数据库先到顶，才加缓存或队列，并写明新组件失败时订单怎样恢复。每加一个组件，都要写明它去掉的瓶颈，以及它自己失败时订单怎样恢复。',
    why:'错把“上 Redis、消息队列、分库分表”当成设计的第一句，规模还没问清就把复杂度加上去。每日一千次请求和每秒一万次请求被当成同一个方案。能分开的信号是：约束里有没有峰值、延迟和错误预算这些数。',
    example:'每日 1000 次下单，单库加唯一约束就能保住不超卖。改成峰值每秒 10000 次后，同一方案的连接和锁等待先被打满，才需要再谈削峰。先写出峰值 QPS、库存行数和允许的下单延迟，再决定要不要队列。没有这些数时，队列只是多了一个故障点。',
    task:'为秒杀服务列出 5 个必须先问的量化问题。',
    answer:'先问五个数：峰值 QPS、库存规模、是否允许超卖、下单延迟目标、故障后要恢复到什么程度。没有这些数，就不能决定要不要缓存、队列或拆库。最小路径是一笔带条件更新的订单事务；只有测量证明某个资源先到瓶颈，才加对应的组件。五个数分别约束入口流量、数据量、正确性、体验和故障。缺一个，对应的组件就还不能定。',
    keywords:'系统设计 QPS 需求 权衡',
    deep:[
      {
        title:'数在名词前面',
        body:'没有峰值、数据量和失败预算时，缓存、队列、分库都只是名词。先写最小路径如何保住库存不变量，再写哪一个测量结果才会迫使设计变复杂。把组件名字盖住后，仍要能指出哪条约束会先被打破。'
      },
      {
        title:'怎样自己验证',
        body:'把方案里的每个组件盖住，看剩余路径能否在给定 QPS 下保住不超卖。不能回答峰值和延迟目标时，这个组件就是提前加上去的。补上五个量化问题再重画。补上五个数再画一次。说不出峰值和超卖是否允许时，方案还停在名词列表。'
      }
    ]
  }
];
window.LESSON_REFERENCES={
closure:[['React：State as a Snapshot','https://react.dev/learn/state-as-a-snapshot'],['React：Queueing a Series of State Updates','https://react.dev/learn/queueing-a-series-of-state-updates']],
eventloop:[['MDN：JavaScript event loop','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model']],
'linked-list':[['React v19.3.0：ReactFiberHooks.js','https://github.com/facebook/react/blob/v19.3.0/packages/react-reconciler/src/ReactFiberHooks.js']],
rendering:[['React：createRoot','https://react.dev/reference/react-dom/client/createRoot'],['MDN：Critical rendering path','https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path']],
identity:[['React：Preserving and Resetting State','https://react.dev/learn/preserving-and-resetting-state']],
effects:[['React：useEffect','https://react.dev/reference/react/useEffect'],['React：useLayoutEffect','https://react.dev/reference/react/useLayoutEffect']],
'event-system':[['React：Responding to Events','https://react.dev/learn/responding-to-events'],['React v19.3.0：DOMPluginEventSystem.js','https://github.com/facebook/react/blob/v19.3.0/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js']],
performance:[['React：memo','https://react.dev/reference/react/memo'],['React：Profiler','https://react.dev/reference/react/Profiler']],
'java-memory':[['Oracle：GC Roots','https://docs.oracle.com/en/java/javase/21/gctuning/other-considerations.html']],
'java-collections':[['Oracle：Object equals/hashCode contract','https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html']],
'java-concurrency':[['Oracle：Atomic Access','https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html']],
'spring-transaction':[['Spring：Using @Transactional','https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html']],
'mysql-index':[['MySQL 8.4：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html'],['MySQL 8.4：Optimizer-related issues','https://dev.mysql.com/doc/refman/8.4/en/optimizer-issues.html']],
idempotency:[],cache:[['Microsoft Learn：Cache-Aside pattern','https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside'],['Redis：Cache aside','https://redis.io/docs/latest/develop/use-cases/cache-aside/']],'design-review':[]
};
