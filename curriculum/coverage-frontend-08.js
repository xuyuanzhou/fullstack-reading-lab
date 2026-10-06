/* Batch 08: independently written Vue lessons from page-specific review. */
const COVERAGE_FRONTEND_08 = [
  {
    track:'frontend', group:'Vue', id:'vue-design-goals-proxy',
    title:'更小更快：落到编译提示与惰性深层代理',
    prompt:'为什么把 Vue 3 说成“更小更快更友好，而且 Proxy 监听整个对象所以完全不用管深层”不够准确？',
    core:'资料里的「更小更快更友好」是概括，不是可单独背诵的官方版本口号。体积与更新成本要落到可核对的机制：编译期静态节点缓存、补丁标记、块级树扁平化，以及按需具名导入带来的裁剪机会。vuejs/core 以 monorepo 维护，packages 按功能拆分，reactivity 等包可以脱离完整运行时单独使用，这一点与仓库结构一致。响应式对象用 Proxy 拦截属性读写；深层嵌套不会在 reactive() 时无脑走完整棵树，而是在属性被读取时追踪依赖，嵌套对象在被访问时再变成代理。因此「不必初始化深度遍历」成立，但业务仍会在实际访问路径上建立深层代理，也不能把原始对象上的写入当成已追踪。',
    why:'误以为更小更快，并且 Proxy 会在创建时监听整棵树。未使用的具名 API 仍可能留在包里，直接改原始嵌套对象也等不到更新。区分信号是嵌套代理出现在首次读取时，而不是调用返回的那一刻。',
    example:'const state = reactive({ nested: { n: 1 } })；首次读 state.nested.n 才让 nested 进入代理路径。直接改原始对象上的同名结构不会触发依赖。体积对比应看生产构建与未使用 API 是否仍在产物中，而不是只背“更小”。',
    task:'用 watchEffect 分别读取一层与两层属性，观察嵌套对象何时变成代理；再对比生产构建里未使用的具名 API 是否仍在包内，并写出“更快”应对应哪一类成本。',
    answer:'只读一层时，还没访问的 nested 不是代理；再读 nested.n，它才进入代理路径。生产构建里未使用的具名 API 不应留在包内，这对应体积。更新变快对应补丁标记和静态缓存。更快要分开看包体、更新和首屏。monorepo 只说明包可以拆开，reactivity 能单独引用，不能代替这三项测量。',
    vue:'reactivity',
    deep:[
      {title:'体积和更新要分开测',body:'具名导入让未使用的 API 有机会离开生产包，这影响下载和解析。更新变快来自补丁标记、静态节点和块级遍历，只体现在仍会执行的渲染路径上。两句“更快”对上的成本不同，不能合成一句口号。'},
      {title:'怎样自己验证',body:'用 watchEffect 先读外层属性，再读嵌套字段，看内层对象何时变成代理。再打一次生产包，确认没有引用的具名导出不在产物里。不要只凭“更小更快”四个字下结论。'},
    ],
    keywords:'Vue 3 monorepo Proxy 惰性深层 补丁标记 静态缓存 树扁平化 reactivity',
    points:['更小更快要落到编译与构建机制','core 仓库是 monorepo，reactivity 可独立使用','深层代理按访问路径建立，不是初始化无脑遍历'],
    refs:[['Vue：Rendering Mechanism','https://vuejs.org/guide/extras/rendering-mechanism.html'],['Vue：Reactivity in Depth','https://vuejs.org/guide/extras/reactivity-in-depth.html'],['vuejs/core package.json','https://raw.githubusercontent.com/vuejs/core/main/package.json']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-defineproperty-proxy',
    title:'Proxy 取代 defineProperty：能拦什么，仍要拦在代理上',
    prompt:'为什么“Proxy 能监听整个对象，所以比 defineProperty 全面更强，手写一个 Proxy 就等于 Vue 响应式”说不清边界？',
    core:'Vue 2 时代用 Object.defineProperty 给已有属性装 getter/setter，是受当时浏览器能力约束；对对象后来才新增的属性、删除，以及数组下标与 length，都需要额外手段。Vue 3 对响应式对象改用 Proxy，可以拦截 get、set、deleteProperty、has 等操作，因此新增、删除和许多数组变更可以走同一套陷阱；ref 仍然用 getter/setter 持有 .value。Proxy 拦截的是代理对象上的操作：改原始对象、或把属性解构成普通变量后读写，都不会进入陷阱。深层对象仍要在被访问时再代理，手写只打日志的 get/set 也没有依赖收集与触发更新。null 不能做 Proxy 目标、以及 raw.push 不证明数组已被拦截，已在既有课里单独说明。',
    why:'误以为换上 Proxy 就全面超过逐个定义属性，手写一个就算响应式。继续改原始对象时界面不更新，只打日志的陷阱也不会让组件重渲染。区分信号是操作落在代理上，并且真有依赖收集，而不只是多了几种拦截。',
    example:'对 reactive 返回的代理执行 obj.newKey = 1 或 delete obj.newKey 可以进入拦截；对同一份 raw 做同样操作通常不会通知依赖。数组应通过代理调用 push，而不是只改 raw。',
    task:'分别用 defineProperty 版与 Proxy 版最小示例演示“先创建后新增属性”；再用 Vue reactive 对比改代理与改原对象，写出三条不能省略的边界。',
    answer:'Proxy 解决的是对象级拦截面；响应式还要求读写走代理、深层按需代理，以及真正的依赖订阅。defineProperty 的历史限制解释了 Vue 2 的辅助 API，不能用来否定 ref 仍使用 getter/setter。',
    vue:'reactive',
    deep:[
      {title:'新增属性仍要打在代理上',body:'定义属性主要套在当时已经存在的键上，后加的键和数组下标常常要另做处理。Proxy 可以拦住代理上的新增、删除和许多数组操作。改原始对象，或把字段解构成普通变量后再写，都进不了陷阱。'},
      {title:'怎样自己验证',body:'先创建对象再新增一个键，对比定义属性和 Proxy 谁能拦截。再用 reactive 对代理和原对象做同样的赋值与 delete，看只有代理上的操作会通知依赖。手写的日志陷阱不应让页面刷新。'},
    ],
    keywords:'Vue 3 Proxy Object.defineProperty 新增属性 删除 数组 原对象 依赖收集',
    points:['defineProperty 主要作用于已有属性','Proxy 可拦截增删等对象操作，但仍只作用于代理','手写陷阱不等于 Vue 的依赖收集与触发'],
    refs:[['Vue：Reactivity in Depth','https://vuejs.org/guide/extras/reactivity-in-depth.html'],['MDN：Proxy','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy'],['MDN：Object.defineProperty','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-tree-shake-faster',
    title:'树摇能变小，不能直接许诺执行更快',
    prompt:'为什么“Vue 3 引入 tree shaking 后，无用代码被剪掉，程序既更小又更快”不能整句当成结论？',
    core:'Tree shaking 是在保持行为不变的前提下删除未用到的代码，前提是 ESM 静态导入、生产构建和副作用规则允许删除。Vue 3 把许多全局 API 改成具名导出，并配合编译期标志，使未使用的运行时更有机会从打包结果里消失；Vue 2 常见的默认全局构建与实例单例用法，确实更难按 API 裁剪。体积变小主要影响下载、解析与内存占用。CPU 上的“更快”取决于仍然保留并实际执行的路径，以及模板编译给出的补丁标记、静态提升等优化；删掉从未调用的模块，并不会自动加快一条已经在跑的更新路径。业务代码若通过副作用导入、动态拼接或挂到全局，同样摇不掉。Options API 相关运行时默认仍保留，除非构建显式关闭且依赖不再使用它。',
    why:'误以为剪掉无用代码之后，执行也会一起变快。包体小了，同一次点击的更新耗时仍可能不变。区分信号是体积差来自未引用导出的消失，耗时变化要对上补丁标记或静态提升，体积变化和同一次点击的耗时必须分开记录。',
    example:'生产构建里只使用 nextTick，不引入未用的 API；sourcemap 中应看不到未引用导出。同一页面交互的 Performance 条目，应在包体变化之外单独对比，不能把“少打进包里”写成“diff 更快”。',
    task:'记录一次仅改依赖导入的生产构建体积差，再对同一交互测更新耗时；说明哪一项由树摇解释，哪一项应去看编译优化或组件结构。',
    answer:'只去掉未使用的具名导入后，生产构建体积下降，这一项由树摇解释。同一交互的更新耗时若不变，就不能记成执行变快。耗时若下降，应去看补丁标记、静态提升或组件是否少渲染，而不是看被删掉的死代码。先记体积差，再记同一次交互的更新耗时，两项不要写成同一个结论。',
    vue:'compiler',
    deep:[
      {title:'删掉的代码不在热路径上',body:'树摇去掉的是构建时到达不了的导出。已经在跑的更新函数还在包里，它的耗时不会因为旁边少了一个模块就下降。执行更快要看仍会运行的路径，以及编译器有没有给出更小的补丁范围。'},
      {title:'怎样自己验证',body:'只改导入、去掉未使用的 API，记录生产构建体积。再对同一个点击录一次更新耗时。体积下降而耗时不变，就说明快慢不由树摇解释，要改去看编译优化或组件结构。体积下降而耗时不变时，结论就写成树摇只解释了包体。'},
    ],
    keywords:'Vue 3 tree-shaking Dead Code Elimination ESM 包体 执行性能 编译优化',
    points:['树摇删除的是未使用代码，主效果是包体','执行更快要看仍在运行的路径与编译优化','Vue 3 具名导出改善可裁剪性，仍受构建与依赖约束'],
    refs:[['Vue：Compile-Time Flags','https://vuejs.org/api/compile-time-flags.html'],['Vue：Composition API FAQ','https://vuejs.org/guide/extras/composition-api-faq.html'],['Vue：Rendering Mechanism','https://vuejs.org/guide/extras/rendering-mechanism.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_08) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
