/* Deeper public lessons: ecosystems, middleware, queue choice, and retired defaults. */
const COVERAGE_PATH_04 = [
  {
    track:'frontend', group:'语言基础', id:'js-this-callsite',
    title:'this 由调用方式决定，不由定义位置决定',
    prompt:'把对象上的方法取出来再调用，为什么 this 变成了 undefined？',
    core:'普通函数的 this 是这次调用的接收者，不是函数写在哪个对象里面。obj.fn() 的接收者是 obj。const fn = obj.fn 之后再 fn()，调用点没有接收者；在模块和类这类严格模式代码里，this 是 undefined，读 this.id 会抛错。call、apply 和 bind 显式指定接收者。箭头函数没有自己的 this，它使用定义时所在作用域的 this，call 也改不了。React 函数组件没有实例，不要在里面找 this.state。DOM 的 addEventListener 若传入普通函数，调用时 this 是该元素；传入箭头函数则不是。',
    why:'学习者会把拆出来调用后的 undefined 当成框架把状态弄丢了。回调和定时器里一读 this.id 就抛错，他却去查组件有没有卸载。同一次方法用对象调用能拿到名字、拆成变量就抛错，才说明原因是这次调用没有接收者。',
    example:'const user = { name: "Ada", hi() { return this.name; } }; user.hi() 得到 Ada。const hi = user.hi; hi() 在严格模式下抛错。改成 hi: () => this 则箭头函数根本看不到 user。',
    task:'分别用对象调用、拆成变量调用、bind 之后调用，以及箭头函数，记录四次 this。再在按钮的 addEventListener 里对比普通函数和箭头函数。',
    answer:'对象调用时 this 是该对象，能读到名字。拆成变量再调用，严格模式下 this 是 undefined，读属性会抛错。bind 之后再调用，this 固定为绑定时的对象。箭头函数四次里都看不到该对象，因为它用的是定义处的外层 this。按钮上普通函数的 this 是元素，箭头函数则不是。',
    keywords:'JavaScript this call apply bind 箭头函数 严格模式',
    points:['普通函数的 this 是本次调用的接收者','拆开再调用时严格模式下 this 为 undefined','箭头函数使用外层 this，不能被 call 改写'],
    deep:[
      {title:'类字段和回调',body:'类方法若写在原型上，拆出来调用同样丢失接收者。类字段箭头函数在每个实例上创建，能记住实例，但每个实例都有一份函数。把方法传给 setTimeout 或事件前，先决定要保留哪一个 this。'},
      {title:'和 React 的关系',body:'函数组件每次渲染都是一次普通函数调用，没有可供 this 指向的组件实例。状态来自 useState 的闭包。类组件里的 this 才是实例，那是另一套模型。'}
    ],
    refs:[['MDN：this','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this'],['MDN：箭头函数','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-prototype-chain',
    title:'class 只是原型链的写法',
    prompt:'用 class 声明的方法，为什么所有实例共用一份？',
    core:'JavaScript 的对象通过内部的原型链查找属性。自身没有的名字，会到 Object.getPrototypeOf 指向的对象上继续找。class 把构造函数和方法组织成这套机制：实例字段一般在实例自身，方法放在构造函数的 prototype 上，因此所有实例共用同一批方法。instanceof 沿这条链判断，不是比较类名字符串。改原型上的方法会影响已创建的实例。Object.create(null) 没有原型，连 toString 都没有。不要把 __proto__ 当成日常 API。',
    why:'学习者会以为每个实例各自复制了一份方法。在原型上挂一个数组当缓存后，一个实例 push，另一个实例也看见这条数据，于是他以为字段赋值写串了。两个实例的方法用严格相等比较为真、字段却各自一份，才说明共用的是原型上的函数。',
    example:'class Counter { n = 0; inc() { this.n++; } }。两个实例的 n 各自一份，inc 是同一函数。Counter.prototype.inc = function () { this.n += 10; } 之后，两个实例的下一次 inc 都加 10。',
    task:'创建两个实例，比较它们的方法是否用 === 相等，字段是否相等。再改原型方法，观察两个实例。最后用 Object.getPrototypeOf 画出链，直到 null。',
    answer:'两个实例的方法用严格相等比较为真，因为方法在原型上只有一份；计数字段各自一份，比较不为真。改掉原型上的方法后，两个实例的下一次调用都走新行为。沿着 getPrototypeOf 能画到 null。判断类型看这条链，不比较类名字符串。链的尽头是 null，中间没有类名字符串这一层。',
    keywords:'JavaScript prototype class instanceof 原型链',
    diagram:'diagrams/js-prototype-links.svg',
    points:['class 方法放在构造函数的 prototype 上','实例字段在对象自身，会挡住同名原型属性','instanceof 沿原型链判断，直到 null'],
    deep:[
      {title:'遮挡',body:'实例自己有同名属性时，查找停在实例，不再使用原型上的方法。删除实例属性后，原型上的方法又可见。这不是复制了一份方法，只是查找顺序。'},
      {title:'不要用原型保存业务数据',body:'原型上的对象和数组被所有实例共享。把缓存、列表放上去，一个实例 push 会让别的实例看见。每个对象自己的状态放在实例字段。'}
    ],
    refs:[['MDN：继承与原型链','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain'],['MDN：class','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes']]
  },
  {
    track:'frontend', group:'React 生态', id:'react-router-loader',
    title:'路由数据在渲染前装好',
    prompt:'每个页面都在 useEffect 里请求，和路由的 loader 有什么不同？',
    core:'React Router 的数据路由用 loader 在进入路由、渲染对应元素之前加载数据。组件用 useLoaderData 读取结果，而不是先画出空页面再在 effect 里请求。客户端切换路由时，框架可以在导航完成前知道成功或失败，并用 errorElement 接住 loader 抛出的错误。useEffect 请求发生在提交之后，首屏必然先空再填，取消和过期响应还要自己处理。链接用 Link 或 navigate，这样导航走路由，而不是整页刷新。搜索参数属于 URL，刷新和分享要能还原，不要只放在组件 state 里。',
    why:'学习者会把每个页面的请求都放进 effect，以为和路由装数据只是写法不同。刷新、后退或直接打开带查询串的地址时，筛选条件丢了，错误也要等空白页之后才出现。数据在进入页面之前就失败并进到错误元素，才说明装载发生在渲染之前。',
    example:'订单详情路由的 loader 按 params.id 请求。失败时抛出带 status 的响应，errorElement 显示没有这张订单。筛选条件写在 ?status=paid，而不是只保存在 useState。',
    task:'把一个 useEffect 拉详情的页面改成 loader。刷新、点浏览器后退、直接打开带查询串的地址，确认数据条件和错误页面都还在。',
    answer:'改成 loader 后，刷新、后退和直接打开带查询串的地址，数据和错误页面都还在，因为请求在渲染路由元素之前按地址执行。失败抛出带状态的响应，由错误元素显示，而不是先空白再请求。可分享的筛选留在查询串里。进入页面之后才发生的订阅仍放在 effect。',
    keywords:'React Router loader useLoaderData URL 数据路由',
    points:['loader 在渲染路由元素之前执行','失败走路由的错误元素，而不是空白后再请求','可分享的筛选条件放在 URL'],
    deep:[
      {title:'和组件状态的分工',body:'对话框是否打开、输入框草稿，属于这一次界面，用 state。订单号、页码、筛选，属于地址，用路由。把后者放进 state，复制链接的人看不到同一页。'},
      {title:'不要两套一起拉',body:'loader 已经提供的数据，不要在组件里再用 effect 请求一次。两套来源会竞态。需要重新加载时，用路由提供的重新验证，而不是再写一个请求。'}
    ],
    refs:[['React Router：路由','https://reactrouter.com/start/framework/routing'],['React Router：loader','https://reactrouter.com/start/framework/data-loading']]
  },
  {
    track:'frontend', group:'React 生态', id:'query-server-state',
    title:'服务器状态不要再抄进 useState',
    prompt:'请求结果已经在 Query 缓存里，为什么还要 setUsers 存一份？',
    core:'TanStack Query 把服务器数据按 query key 缓存。key 必须包含所有会影响结果的参数，例如资源名、id 和筛选。staleTime 决定多久之内认为数据新鲜、切换页面不必马上重取。组件渲染时读 useQuery 的 data、isPending 和 error，不要再复制进 useState，否则缓存更新了，复制品还是旧的。变更用 useMutation，成功后按 key 让相关查询失效或写入返回值。只存在于界面的状态，例如未提交的表单草稿，继续用 useState 或表单库，不要塞进 Query。',
    why:'学习者会把请求结果再抄进一份 state，以为组件读起来更直接。一处变更并失效后，另一处仍显示旧列表，重试和窗口聚焦时两份各走各的。两处同时换成新数据、而且没有第二份本地数组，才说明服务器结果只留在查询缓存里。',
    example:'queryKey 为 ["orders", status]。切换 status 就是另一个缓存。提交新订单的 mutation 成功后，让 ["orders"] 失效，列表按当前筛选重新取，而不是手写把返回值 push 进一个本地数组。',
    task:'用同一 key 打开两个显示订单的组件，在一处完成变更并失效查询。确认两处一起更新，且没有第二份 useState 列表。',
    answer:'两个组件用同一个 key 读取订单，都不要再 setState 存一份列表。一处变更成功并失效该 key 后，两处一起重新取，显示同一份结果。切换筛选就是另一个 key，不能把返回值推进一个平行数组。界面草稿才用 state。两处显示的列表应来自同一次失效后的重新获取。',
    keywords:'TanStack Query queryKey staleTime mutation 服务器状态',
    points:['query key 包含所有影响结果的参数','组件读取查询结果，不再复制到 useState','mutation 成功后失效或更新对应缓存'],
    deep:[
      {title:'新鲜时间和缓存时间',body:'staleTime 内，挂载新组件可以直接用缓存，不必立刻请求。gcTime 决定无人使用的缓存还能留多久。两个都设成 0，每次进入都会重新请求，缓存就没有意义。'},
      {title:'失败和空数据',body:'isPending 是还没有数据。error 是失败。data 为空数组是成功但没有行。三个状态要分开画，不能只用一个 loading 布尔值盖住。'}
    ],
    refs:[['TanStack Query：概览','https://tanstack.com/query/latest/docs/framework/react/overview'],['TanStack Query：查询键','https://tanstack.com/query/latest/docs/framework/react/guides/query-keys']]
  },
  {
    track:'frontend', group:'Vue 生态', id:'vue-router-reuse',
    title:'只改路由参数时，组件可能不会重建',
    prompt:'从 /orders/1 进到 /orders/2，为什么 setup 没有再次执行？',
    core:'Vue Router 用路径和组件记录页面。从 /orders/1 到 /orders/2 如果命中同一个路由记录和同一个组件，Vue 会复用该实例，setup 不会重新跑。params.id 已经变了，但只在 setup 里读一次的话，页面仍显示第一张订单。要 watch 路由参数，或在路由上设置 key 为完整路径迫使重建。导航守卫 beforeEach 和 beforeEnter 在确认导航时运行，适合登录检查。它们不能代替组件内部对参数变化的响应。查询参数同样在 route.query 上，刷新后还在，不要只写在 ref 里。',
    why:'学习者会以为地址从订单 1 变成订单 2，setup 就会再跑一遍。标题仍是上一张订单，他当成接口没返回。setup 次数仍是 1、加上对参数的观察后标题才跟着变，才说明组件被复用，不是请求没发出。',
    example:'setup 里 const id = route.params.id 只会得到进入时的值。watch(() => route.params.id, load) 才会在 1 变成 2 时重新请求。',
    task:'在两个订单 id 之间用 router-link 切换，记录 setup 次数和页面标题。加上对 params.id 的 watch 后再记一次。',
    answer:'用链接在两个订单 id 之间切换时，setup 只执行一次，标题停在进入时的那张订单。加上对 params.id 的 watch 后，id 从 1 变成 2 会重新请求，标题跟着变。守卫只决定能不能进入，不负责参数变化后的重载。可分享条件放在参数或查询串。',
    vue:'router',
    keywords:'Vue Router params 复用 beforeEach watch',
    points:['同一路由组件在参数变化时可能被复用','setup 不会因此自动再执行','用 watch 路由参数或用路径作为 key 重新加载'],
    deep:[
      {title:'守卫做授权',body:'beforeEach 里没有登录就取消这次导航并转到登录页。不要在每个页面的 onMounted 里各写一遍跳转，那样第一次渲染已经发生。'},
      {title:'和 Pinia 的边界',body:'当前订单内容来自路由 id 对应的请求，不必先复制进一个全局 store。多个不相关页面都要的会话用户，才放进 store。'}
    ],
    refs:[['Vue Router：动态路由','https://router.vuejs.org/guide/essentials/dynamic-matching.html'],['Vue Router：导航守卫','https://router.vuejs.org/guide/advanced/navigation-guards.html']]
  },
  {
    track:'frontend', group:'Vue 生态', id:'pinia-not-vuex',
    title:'新的 Vue 3 应用用 Pinia，不再用 Vuex 当默认',
    prompt:'Vue 3 项目还该新建 Vuex store 吗？',
    core:'Pinia 是 Vue 官方现在的状态库。store 用 defineStore 定义，状态、计算属性和方法都在其中，没有 Vuex 的 mutations。组件用 storeToRefs 解构状态，才能保持响应；直接解构会丢掉响应连接。Vuex 仍能用于已有的 Vue 3 项目，但官方说明它处于维护状态，新应用应使用 Pinia。服务器返回的列表若只用一次，放在页面里请求即可，不必先搬进全局 store。多个页面共享、而且客户端会改的会话和未提交草稿，才放进 store。',
    why:'学习者会在新的 Vue 3 项目里再建一套 Vuex 的 mutation 和模块。笔记和脚手架都停在只维护的默认选择上，解构 store 后视图还不更新。两个组件改同一个计数能同步、页面内的请求结果却不进 store，才说明该进全局的只有跨页面状态。',
    example:'两个组件同时读计数 store，一个加 1，另一个立刻显示新值。订单页自己请求的列表留在页面里，离开页面后不需要手动清空全局空间。把这张列表也提交进 store 后，返回再进来仍是上一页的数据，除非再写清理。',
    task:'写一个计数 store，在两个组件里修改并确认同步。再把一个只属于当前页的请求结果留在页面内，不放进 store。',
    answer:'新应用的计数放在 Pinia，两个组件修改后同步。只属于当前页的请求结果留在页面内，不放进 store。Vuex 的 mutation 和模块不是新项目的默认。解构时要保持响应，否则视图不会跟着计数变。离开页面后再进入，不应还看见上一页放进全局的那份列表。',
    vue:'pinia',
    keywords:'Pinia Vuex defineStore storeToRefs Vue 3',
    points:['Pinia 是 Vue 当前推荐的状态库','Vuex 处于维护状态，不是新项目的默认','storeToRefs 才能在解构后保持响应'],
    deep:[
      {title:'和 props 的分工',body:'父子之间的一块数据用 props 和 emit。隔了多层、而且许多页面都要的会话，用 store。不要为了省事把所有 props 都改成全局 store。'},
      {title:'重置',body:'用户退出时要调用 store 的重置，把令牌和资料清掉。只清 localStorage、不清内存里的 store，下一位使用者会看到上一位的状态。'}
    ],
    refs:[['Pinia：介绍','https://pinia.vuejs.org/introduction.html'],['Pinia：和 Vuex 的比较','https://pinia.vuejs.org/introduction.html#comparison-with-vuex']]
  },
  {
    track:'frontend', group:'Vue 生态', id:'nuxt-payload',
    title:'Nuxt 的数据要进首屏 HTML，而不是只在浏览器里请求',
    prompt:'页面源码里没有文章正文，却在 mounted 里再请求，算完成了服务端渲染吗？',
    core:'Nuxt 的 useFetch 和 useAsyncData 在服务端执行请求，把结果放进传送给客户端的 payload，水合时直接用这份数据，避免浏览器再请求一次才能画出正文。写在 onMounted 里的请求只在浏览器运行，查看源码和禁用 JavaScript 时都没有正文，服务端渲染没有带来内容。key 要能区分不同参数，否则从文章 A 切到文章 B 会复用 A 的 payload。请求地址若依赖登录态，要确认服务端请求带上了该有的 Cookie，并且没有把只存在于浏览器的对象放进请求里。',
    why:'学习者会以为用了 Nuxt，在 mounted 里再请求也算服务端渲染。查看页面源码时正文是空的，慢网络和搜索引擎看到的是壳，切换文章还会沿用上一篇。源码里已经有正文、换 id 后不会留下上一篇，才说明数据进了首屏而不是只在浏览器里取。',
    example:'文章页 useAsyncData(() => $fetch("/api/posts/" + id))。切换 id 时 key 包含 id。不要在 onMounted 里再请求同一篇文章。',
    task:'查看文档源码里是否已经有正文。再改 id 导航一次，确认没有沿用上一篇文章的数据。',
    answer:'文档源码里应已经有正文，说明取数发生在服务端并写进了首屏。只在 mounted 里请求时，源码没有这段正文。改 id 导航一次，key 含有 id，页面应换成新文章，而不是继续显示上一篇。只在浏览器才存在的交互不要放进这次首屏数据。换 id 后源码和页面标题都应该是新的一篇，而不是上一篇残留。',
    vue:'ssr',
    keywords:'Nuxt useFetch useAsyncData payload SSR',
    points:['useFetch 在服务端取数并写入 payload','onMounted 里的请求不会出现在首屏 HTML','不同参数必须使用不同的数据 key'],
    deep:[
      {title:'和水合的关系',body:'服务端 HTML 和客户端第一次渲染必须一致。在 setup 里直接读 window 或本地时间，会和只在服务端算出的 HTML 不一致。浏览器专有逻辑放到客户端组件或水合之后。'},
      {title:'不要双请求',body:'payload 里已经有的数据，客户端水合时不应再自动打同一接口，除非你明确要求刷新。网络面板里同一次进入出现两次相同 GET，就是键或调用方式错了。'}
    ],
    refs:[['Nuxt：数据获取','https://nuxt.com/docs/getting-started/data-fetching'],['Nuxt：useAsyncData','https://nuxt.com/docs/api/composables/use-async-data']]
  },
  {
    track:'frontend', group:'工程实践', id:'retired-frontend-stack',
    title:'这些前端默认项已经退出主线',
    prompt:'教程让新建项目用 Create React App 和 Vuex，现在还该照做吗？',
    core:'Create React App 已由 React 官方日落，不再作为新项目的起点。新的 React 应用使用带数据路由和打包的框架，或用 Vite 自己组装。Vuex 仍可维护旧项目，官方已说明新的 Vue 3 应用使用 Pinia。Vue 2 的 new Vue、Vue.use 全局注册和过滤器不属于 Vue 3 的写法。Core Web Vitals 的交互指标已从 FID 换成 INP，旧文章里的 FID 阈值不能再当现行标准。这些工具有的还能运行，但不能再写成当前默认答案。',
    why:'学习者会照着旧教程用已经卸下的脚手架和全局状态库来建新项目。创建命令、状态写法和交互指标都还是旧的，新工程结构对不上，排障时去找已经不存在的配置。笔记里的创建命令和指标换成现行选择后仍能建起来，才说明旧默认不必再当教材步骤。',
    example:'新的 React 项目用现行工具创建，而不是旧的创建命令。新的 Vue 3 项目状态用 Pinia，计数在两个组件间能同步。性能报告看现行的交互延迟，而不是已经退出主指标的那一项。旧项目可以暂时不迁，教材里的默认步骤要换。',
    task:'列出自己笔记里的创建命令和状态库。凡是 create-react-app、新建 Vuex、以 FID 为现行指标的，改成上面的现行选择，并写明旧项目可以暂时不迁。',
    answer:'笔记里的创建命令若还是已经日落的脚手架，应改成现行创建方式。新建状态库不应再是 Vuex。交互指标不应再把已经退出的那一项当现行指标。旧项目可以暂时不迁，但新项目的默认步骤要换成上面的现行选择。旧项目可以不迁，但新建笔记里的默认命令和指标必须换成现行的。',
    keywords:'Create React App Pinia Vuex INP FID 已淘汰',
    points:['Create React App 已日落，不再作为新项目起点','新的 Vue 3 状态默认用 Pinia，Vuex 只维护旧项目','现行交互体验指标是 INP，不是 FID'],
    deep:[
      {title:'能跑和该学',body:'旧构建今天还能编译，不代表新课要教它的配置文件。学习路径教现行默认；维护旧仓库时再查那一版文档。'},
      {title:'和本站已有课的关系',body:'事件委派不再说成一律绑在 document。静态提升也不是升级到 Vue 3 就自动打开。那些课已经按当前源码改过，不要退回旧笔记。'}
    ],
    refs:[['React：Create React App 日落','https://react.dev/blog/2025/02/14/sunsetting-create-react-app'],['Pinia：介绍','https://pinia.vuejs.org/introduction.html'],['MDN：INP','https://developer.mozilla.org/en-US/docs/Glossary/Interaction_to_next_paint']]
  },
  {
    track:'java', group:'Java 基础', id:'java-interface-contract',
    title:'接口表达能力，抽象类才放共享状态',
    prompt:'为了复用三行代码，就该建一个抽象父类吗？',
    core:'接口描述类型能做什么。一个类可以实现多个接口。接口方法可以有 default 实现，那是在不强迫单一父类的前提下共享行为。抽象类可以有构造器和实例字段，适合一小组类型真正共享的状态和不可分开的骨架。只为了放常量或复用几行工具代码而继承，会把无关类型捆进同一棵继承树。Java 是单继承，父类名额要用在真实的 is-a 关系上。调用方依赖接口，测试才能替换实现，而不必继承生产类。',
    why:'学习者会为了复用三行工具就建一个抽象父类。父类里一旦放进连接和缓存，子类无法单独测试，也不能再继承别的骨架。工具收成接口上的默认方法后，具体类不再被迫继承它，才说明占用唯一父类的是共享状态，不是三行代码。',
    example:'两个支付渠道都实现同一接口，默认方法只做共同的参数检查，测试可以不启动父类里的连接。密钥和连接放在各自的类里。若把这些字段放进抽象父类，子类测试必须带上那份状态，也不能再继承另一个骨架。具体类因此不必再继承那个只提供工具方法的父类。',
    task:'找一个只被继承来调用 protected 工具方法的抽象类。把工具收成默认方法或独立对象，确认具体类不再被迫继承它。',
    answer:'只为调用受保护工具方法而继承的抽象类，应把工具收成默认方法或独立对象，具体类不再继承它，测试仍能做参数检查。能力用接口，一个类可以实现多个。共享的可变状态才考虑抽象类，不要为了复用代码占用唯一的父类。复用三行代码不应占用这一个类唯一的父类位置。',
    keywords:'Java interface default method abstract class 单继承',
    points:['一个类可以实现多个接口，只能继承一个类','default 方法共享行为，不占用父类名额','抽象类用于真正共享的状态和骨架'],
    deep:[
      {title:'常量',body:'把常量堆在接口里再实现它，是旧写法。常量放在最终类或枚举里，需要时静态导入。接口不要变成常量袋。'},
      {title:'和 Spring 的关系',body:'服务依赖接口，容器注入实现。测试提供另一个实现。这不要求实现类继承同一个抽象基类。'}
    ],
    refs:[['Java 教程：接口','https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html'],['Java 教程：默认方法','https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-what',
    title:'Spring Cloud Alibaba 把一组中间件接到 Spring Cloud 的编程模型上',
    prompt:'pom 里加一条 Spring Cloud Alibaba，是不是就同时有了注册、网关、限流和分布式事务？',
    core:'Spring Cloud 只规定几件事怎么接：找服务、选地址、读配置、发 HTTP、接消息。\n\nSpring Cloud Alibaba 是接这些事的一套适配。要用 Nacos、Sentinel、Seata 时，再单独加对应的 starter。\n\nBOM 只对齐版本，不会一次装进七个组件。网关是 Spring Cloud Gateway，不在这组清单里。\n\n版本必须和当前 Spring Boot、Spring Cloud 落在官方同一行。不要把已停更的 Eureka、Ribbon、Hystrix 和新的 Nacos、LoadBalancer、Sentinel 混在一个应用里。',
    map:[
      {title:'保存实例名单',body:'Nacos'},
      {title:'从名单里选一个地址',body:'Spring Cloud LoadBalancer，不是 Alibaba 组件清单里的项'},
      {title:'发出 HTTP',body:'OpenFeign 或 RestClient'},
      {title:'这个进程是否放行',body:'Sentinel，按资源上的规则'},
      {title:'两个库一起提交或回滚',body:'Seata'},
      {title:'入口网关',body:'Spring Cloud Gateway。独立进程，不在这组组件清单里'},
      {title:'版本怎么对',body:'和当前 Spring Boot、Spring Cloud 落在官方发行列车同一行。2023.x 对应 Cloud 2023、Boot 3.2.x，最低 JDK 17'},
    ],
    why:'学习者会以为加一条依赖就同时有了注册、网关、限流和事务。下单链上没人选择地址、也没人拒绝超额流量，版本还和当前启动框架对不齐。进程图里这几件事分属不同项目，才说明依赖清单只对齐版本，组件仍要按需接入。',
    example:'订单服务只导入 BOM，再加入 Nacos 发现、Nacos 配置和 Sentinel。调用库存使用 OpenFeign，地址由 LoadBalancer 从 Nacos 的名单里选择。入口网关跑在另一个进程里。',
    task:'画出一次下单经过的进程，标出谁保存地址、谁选择地址、谁拒绝超额流量、谁提交两个数据库。再对照 BOM 版本和当前 Spring Boot 版本是否落在官方说明的同一行。',
    promptAnswer:'不是。BOM 只对齐版本，不会把注册、网关、限流和分布式事务一起装进进程。网关是 Spring Cloud Gateway，不在这组组件清单里。要注册再加 Nacos，要限流再加 Sentinel，要跨库提交再加 Seata。',
    answer:'进程：浏览器 → 独立的网关进程 → 订单服务 → 库存服务。保存地址的是 Nacos，名单里是库存实例的 IP 和端口。选择地址的是订单进程里的 LoadBalancer，OpenFeign 只按选中的地址发 HTTP。拒绝超额流量的是订单进程里的 Sentinel，请求已经进入这个进程后才按资源规则拦截。提交两个数据库：这一次示例只加了 Nacos 和 Sentinel，没有 Seata，订单库和库存库各自提交，没有人做跨库提交；要两个库一起成功或一起回滚，才接入 Seata。版本：以 2023.x README 为例，Spring Cloud Alibaba BOM 与 Spring Cloud 2023、Spring Boot 3.2.x 同一行，最低 JDK 17；当前项目的 Boot 版本必须落在这一行，对不上就不能混用。',
    keywords:'Spring Cloud Alibaba BOM Nacos Sentinel Seata 版本对齐',
    points:['BOM 只对齐版本，组件要按需单独引入','发现、负载均衡、限流、事务和网关由不同项目负责','版本必须对照官方发行列车，不能混用已停更的 Netflix 组件'],
    deep:[
      {title:'和 Spring Cloud Netflix 的关系',body:'Eureka、Ribbon、Hystrix、Zuul 属于 Spring Cloud 的第一代常用实现，现已停更。当前应用用 Nacos 保存名单和配置，用 LoadBalancer 选择实例，用 Sentinel 做进程内限流和熔断，用 Gateway 做入口。它们不是同一个依赖的四个别名。'},
      {title:'企业版不在开源 starter 里',body:'官方 README 把全链路灰度、无损上下线、离群实例摘除和企业级网关放在配套的商业方案里。阅读开源文档时，不要把这些控制台能力写成默认注解的效果。'}
    ],
    refs:[['Spring Cloud Alibaba README','https://github.com/alibaba/spring-cloud-alibaba/blob/2023.x/README-zh.md'],['Spring Cloud Alibaba：版本说明','https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-component-map',
    title:'七个组件各回答一个问题',
    prompt:'Nacos、Sentinel、Seata 和 RocketMQ 同时出现时，各自解决哪一段？',
    core:'先用一句话放好每个组件。后面的课再展开，每个框只回答一个问题。',
    map:[
      {title:'地址在哪',body:'Nacos 发现：服务名对应的实例列表'},
      {title:'参数是什么',body:'Nacos 配置：dataId 对应的文本。和控制台可以在一起，接口是分开的'},
      {title:'要不要放行',body:'Sentinel：本进程里的资源。不转发请求，也不代替入口网关'},
      {title:'消息发给谁',body:'RocketMQ。Stream 只负责绑定'},
      {title:'两个库是否一起提交',body:'Seata'},
      {title:'文件在哪',body:'OSS。不参与数据库回滚'},
      {title:'定时由谁触发',body:'SchedulerX。同一条定时不会在每个副本里各跑一遍'},
      {title:'短信是否送达',body:'看通道的状态报告。接口受理不算已读'},
    ],
    why:'学习者会把几个中间件的名字堆在同一张图上，排查时用配置去解释限流，或用注册名单去解释事务为什么没回滚。每个框只能回答一个问题，答不上来的框回到对应的一课，才不会把职责串在同一次调用里。',
    example:'下单请求进入订单服务。Sentinel 先看下单资源是否超配额。订单服务按服务名从 Nacos 拿到库存实例，LoadBalancer 选一个，OpenFeign 发起调用。扣库存和写订单若要一起提交，由 Seata 协调两个数据库分支。提交成功后再发 RocketMQ 消息去通知发货，并用短信服务发模板短信。头像文件放在 OSS。超时关单由 SchedulerX 触发一次，而不是三个副本各自的本地定时器。',
    task:'拿一张现有架构图，给每个框写上它回答的问题：地址在哪、参数是什么、要不要放行、消息发给谁、两个库是否一起提交、文件在哪、定时由谁触发、短信是否真的送达。答不上来的框，回到对应的一课。',
    answer:'Nacos 发现回答地址在哪，Nacos 配置回答参数是什么。Sentinel 回答要不要放行。RocketMQ 回答消息发给谁。Seata 回答两个库是否一起提交。OSS 回答文件在哪。SchedulerX 回答定时由谁触发。短信是否送达要看通道的状态报告，接口受理不算已读。答不上来的框不要用相邻组件解释，回到对应的那一课。',
    keywords:'Nacos Sentinel RocketMQ Seata OSS SchedulerX 短信',
    points:['Nacos 同时有实例名单和配置文本，但是两套数据','Sentinel 决定本进程的资源是否放行','Seata、RocketMQ、OSS、SchedulerX 和短信各管提交、事件、文件、定时和触达'],
    deep:[
      {title:'一次调用的顺序',body:'入口网关可以先做认证和总配额。进入订单进程后，Sentinel 看这个资源。需要下游时，先读 Nacos 的实例列表，再由 LoadBalancer 选地址，最后由 HTTP 客户端连接。配置决定阈值和地址参数，不代替这次连接。'},
      {title:'Dubbo 的位置',body:'官方功能说明里，Sentinel 可以接入 Dubbo 的限流降级。服务之间若使用 Dubbo，传输协议和接口定义属于 Dubbo。不要在组件清单里把它写成 Nacos 或 Seata 的一种模式。'}
    ],
    refs:[['Spring Cloud Alibaba README','https://github.com/alibaba/spring-cloud-alibaba/blob/2023.x/README-zh.md'],['Sentinel：介绍','https://sentinelguard.io/zh-cn/docs/introduction.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-nacos-intro',
    title:'Nacos 用命名空间隔开环境，用服务名和 dataId 定位两类数据',
    prompt:'注册和配置都放在 Nacos，改控制台里的一个名字为什么会同时影响发现和配置？',
    core:'Nacos 是服务发现、配置管理和服务管理平台。发现回答“这个服务名下面现在有哪些实例”。配置回答“这个 dataId 的文本现在是什么”。两者都用命名空间做第一层隔离，用分组做第二层，但第三层的键不同。命名空间用来隔开租户或环境，开发和生产应使用不同的命名空间标识。界面上显示的名称不等于标识，应用配置里填的是标识；不填时落到公共命名空间。分组默认是 DEFAULT_GROUP，同一命名空间里可以用分组区分同一应用的多套配置或不同团队的服务。发现侧的键是服务名，通常与 spring.application.name 对应。实例带有 IP、端口、权重、集群和元数据。应用进程通常注册为临时实例：客户端与服务端保持连接并上报心跳，心跳停止后实例从健康列表消失。持久实例不会因心跳停止被自动删除，需要显式下线。消费方订阅服务名，在本地保留一份名单缓存，所以实例刚下线的短时间里仍可能被选中。配置侧的键是 dataId。有激活的 profile 时，默认 dataId 是“应用名-profile.扩展名”；没有 profile 时是“应用名.扩展名”。分组默认 DEFAULT_GROUP。控制台里的 dataId 少了 profile 后缀，或扩展名不一致，应用就会读到另一份或读不到。客户端订阅该 dataId，内容变化后服务端通知订阅者。配置文本可以是 properties 或 yaml。共享配置和扩展配置是额外的 dataId，会按顺序叠到应用自己的配置上。注册中心不转发业务请求，配置中心不保存实例列表。',
    why:'学习者会把命名空间、分组、服务名和配置标识当成同一个搜索框。改控制台里的一个名字后，测试实例进了生产，配置刷新也打到错误的数据上。停掉的临时实例离开的是健康列表，改配置通知的是订阅那份数据的一方，才说明这是两套键。',
    example:'订单服务在 dev 命名空间注册服务名 order，同时读取 dataId 为 order-dev.yaml、分组为 DEFAULT_GROUP 的配置。生产使用另一个命名空间标识。库存服务只订阅 order 这个服务名，不读取那份 yaml。',
    task:'在控制台列出一个应用实际使用的命名空间标识、分组、服务名和 dataId。停掉一个临时实例，观察它何时离开健康列表。改一份配置，确认订阅的是哪个 dataId。',
    answer:'实际使用的命名空间标识和分组要先列出，它同时隔开发现和配置。服务名加上心跳决定实例何时离开健康列表，停掉临时实例后应离开这份名单。配置改动只通知对应的 dataId，库存服务订阅服务名时不应读到那份配置。两类数据不要混用同一个键。服务名的变化不应让另一份配置的订阅者收到通知。',
    keywords:'Nacos namespace group dataId 服务发现 配置管理',
    points:['命名空间和分组同时用于发现与配置，第三层的键不同','临时实例靠心跳维持，消费方本地会缓存名单','配置由 dataId、分组和命名空间定位，变更通知订阅者'],
    deep:[
      {title:'权重和集群',body:'同一服务名下的实例可以带权重和集群名。权重影响被选中的比例，集群可以让调用优先落在同一可用区。这是名单上的属性，不是配置文件里的业务开关。'},
      {title:'和后面两课的关系',body:'名单更新有延迟，所以下线后仍可能被连上。配置通知到了，也不等于已经抄进普通字段的值会变。那两件事分别在后面的注册课和配置课里检查。'}
    ],
    refs:[['Nacos：概念','https://nacos.io/docs/latest/concepts/'],['Spring Cloud Alibaba：Nacos 发现','https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-discovery'],['Spring Cloud Alibaba：Nacos 配置','https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-config']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-nacos-register',
    title:'Nacos 负责找到实例，负载均衡才负责选中一个',
    prompt:'服务已经注册到 Nacos，调用方为什么还会连到已下线的地址？',
    core:'Spring Cloud Alibaba 用 Nacos 保存服务名和实例列表。提供者启动时注册 IP、端口和元数据，并用心跳维持临时实例；心跳停止后，不健康的实例应从列表消失。消费方按服务名查询实例，再由 Spring Cloud LoadBalancer 从健康实例里选一个。这不是 Netflix Ribbon。注册成功只说明名单里曾经有这个地址，不说明此刻端口仍接受连接，也不代替超时和重试。命名空间用来隔开环境，测试实例不应出现在生产命名空间的列表里。',
    why:'学习者会以为控制台里有这个服务，调用就一定会打到活着的实例。实例已经停端口，新请求仍打过去并超时，他却去查业务代码。新请求在名单更新后不再选这个端口，才说明注册中心给的是名单，选择发生在调用方。',
    example:'启动两个库存实例，停掉其中一个且不再发心跳。停掉后的短时间内，订单侧仍可能打到旧端口并超时。名单更新后，新请求只打到仍在发心跳的那一个。连接超时要单独配置，注册中心不会替你结束这次等待。延迟结束后再发的请求不应再出现那个已停端口。',
    task:'启动两个库存实例，停掉其中一个且不再发心跳。观察消费者新请求是否还打到已停的端口，并记下名单更新的延迟。',
    answer:'两个实例都健康时请求会打到它们。停掉一个且不再发心跳后，要记下名单延迟，延迟窗口内仍可能打到已停端口。窗口过后新请求不应再选它。Nacos 提供名单和健康状态，从当前健康实例里选择的是负载均衡。调用超时不由注册中心代替。控制台里仍显示过这个服务，也不能证明新请求还会选中已停实例。',
    keywords:'Spring Cloud Alibaba Nacos LoadBalancer 服务发现 心跳',
    points:['注册中心保存服务名和实例，不直接转发请求','临时实例靠心跳维持，停掉后应离开健康列表','选择实例的是 LoadBalancer，不是已经退出的 Ribbon'],
    deep:[
      {title:'客户端缓存',body:'消费方会缓存实例列表。进程刚下线的短时间内仍可能被选中，所以连接失败要能换下一个实例或重试，不能假设名单瞬间绝对正确。'},
      {title:'和配置的区别',body:'发现回答“这个服务现在有哪些地址”。配置回答“这个应用该用哪些参数”。两套数据都常放在 Nacos，但是不同的接口和数据。'}
    ],
    refs:[['Spring Cloud Alibaba：Nacos 发现','https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-discovery'],['Spring Cloud：LoadBalancer','https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/loadbalancer.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-nacos-config',
    title:'Nacos 配置改了，已经抄进字段的值不会变',
    prompt:'控制台改了开关，为什么运行中的 Bean 仍用旧值？',
    core:'Nacos 配置由 dataId、group 和 namespace 定位。应用在启动时拉取，并在长轮询里收到变更。@RefreshScope 或支持刷新的 @ConfigurationProperties 会在变更后重建或重新绑定。如果在构造器里把值抄进一个普通字段，之后不再读配置对象，这份副本不会更新。配置是运行环境的一部分，生产和测试用不同 namespace，不要把生产口令提交进默认的公开仓库。本地紧急默认值可以留在包里，但应被环境配置覆盖，缺失的关键配置应让启动失败。',
    why:'学习者会以为控制台改了开关，运行中的每个 Bean 都会立刻用新值。构造时抄进字段的阈值一直是旧的，他当成推送失败。可刷新对象读到新值、抄走的字段仍是旧值，才说明刷新只重新绑定，不会改写已经复制的副本。',
    example:'阈值放在可绑定的配置对象里，业务方法每次从该对象读取。控制台改数值后，下一次读取是新值。若在初始化时把阈值抄进一个普通 int 字段，之后只读字段，控制台再改，日志里的仍是启动时的数。测试命名空间的改动不应出现在生产应用日志里。',
    task:'改 Nacos 里的一个数值，分别观察 RefreshScope Bean 和构造时复制的字段。再确认测试 namespace 的改动不会出现在生产应用日志里。',
    answer:'用命名空间、分组和 dataId 定位这份配置。改数值后，可刷新的配置对象下一次读取应为新值。构造时复制进普通字段的值保持旧值，不会跟着变。测试命名空间的改动不应出现在生产日志里。需要热更新的值每次从可刷新对象读，不要在启动时抄走。生产日志里不应出现测试命名空间刚刚改过的那个数。',
    keywords:'Nacos config dataId namespace RefreshScope 配置刷新',
    points:['一份配置由 namespace、group 和 dataId 定位','刷新只影响重新绑定或可刷新作用域的 Bean','构造时复制进普通字段的值不会跟着变'],
    deep:[
      {title:'和环境变量的关系',body:'Nacos 是运行时配置的一种来源，不是把口令写进 Git 的理由。密钥仍由环境或密钥系统注入。仓库里只留没有敏感值的样例。'},
      {title:'灰度',body:'先在单独的 namespace 或 group 验证，再发布到生产数据。直接改生产 dataId，所有正在监听的实例都会收到。'}
    ],
    refs:[['Spring Cloud Alibaba：Nacos 配置','https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-config'],['Spring Cloud：Refresh Scope','https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/application-context-services.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-sentinel-intro',
    title:'Sentinel 先定义资源，再用规则决定放不放行',
    prompt:'依赖加进订单服务之后，是不是每个接口都自动有了熔断？',
    core:'Sentinel 把流量当作切入点，用流控、熔断降级、系统负载保护、来源访问控制和热点参数保护服务稳定性。保护的单位是资源。一次进入资源会累计统计，再沿规则判断：通过就执行业务，不通过就抛出规则拦截，业务方法不会运行。资源不会因为加了依赖就自动出现。Web 适配器可以把 URL 当作资源，OpenFeign、RestTemplate、Spring Cloud Gateway、Dubbo 和 RocketMQ 也有对应适配；没有适配器覆盖的代码，要用注解或手动入口显式包住。规则分几类。流控限制每秒请求数或并发线程数，超了就拒绝。熔断看慢调用比例、异常比例或异常数，打开后在时间窗口内直接拒绝，探测通过后再恢复。系统规则看整个进程的负载、CPU、平均响应时间、总线程数或入口 QPS，保护的是机器而不是某一个 URL。来源规则按调用方白名单或黑名单放行。热点规则按参数值分别计数，一个热门商品不应耗尽其他商品的配额。控制台用来查看监控和编辑规则。只存在内存里的规则在进程重启后消失，要推送到 Nacos 这类规则源，各实例才会拿到同一份。注解上的拦截处理方法和业务降级方法不是一回事：规则拒绝走拦截处理，业务方法自己抛出的异常走降级逻辑。',
    why:'学习者会以为依赖加进服务后，每个接口就自动有了熔断。没有入口的内部方法照常执行，重启后规则也没了，扩容的新实例没有同一套配额。先有资源名、规则放在外部且重启后还在，才说明统计和配额都要单独定义。',
    example:'下单地址形成资源，流控阈值写在外部规则里，超过配额的请求被拒绝，业务方法没有执行。查询详情的方法用单独的资源名做热点规则。没有入口的内部工具方法不受这两条规则影响。重启进程后，若规则只在内存里，新实例上这两条配额都不存在。',
    task:'列出三个要保护的资源名，分别写它用哪一类规则、规则放在哪里、被拒绝时调用方看到什么。再重启进程，确认规则还在。',
    answer:'POST /orders 用流控，规则推到 Nacos，拒绝时调用方看到 BlockException 或约定失败 type。GET /items/{id} 用热点参数，同样在 Nacos。内部对账作业用系统规则护整机 CPU。重启后三条仍在，因为不在单机内存。没有资源名的内部方法不受这三条影响。',
    keywords:'Sentinel 资源 流控 熔断 热点参数 规则持久化',
    points:['资源是被统计和被规则检查的单位','流控、熔断、系统保护、来源和热点参数是不同规则','内存中的规则重启后消失，需要推到外部规则源'],
    deep:[
      {title:'和控制台的关系',body:'控制台是观察和编辑的界面。应用进程自己执行规则。控制台停了，已经装进进程的规则仍按原样判断；没有持久化时，新启动的进程是空的。'},
      {title:'和网关配额的关系',body:'Gateway 上的限流限制进入系统的总量。Sentinel 限制某一个服务进程里的某一个资源。两套数字描述的容量不同，要分别写下来。'}
    ],
    refs:[['Sentinel：介绍','https://sentinelguard.io/zh-cn/docs/introduction.html'],['Sentinel：流量控制','https://sentinelguard.io/zh-cn/docs/flow-control.html'],['Spring Cloud Alibaba：Sentinel','https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-sentinel-block',
    title:'Sentinel 拒绝的是超限，不是下游已经失败',
    prompt:'接口被 Sentinel 挡住时，应该按下游超时去重试吗？',
    core:'Sentinel 在应用进程内按规则决定是否放行。流控看 QPS 或并发线程数，超了就拒绝后续进入。熔断看响应时间或异常比例，打开后在时间窗口内直接拒绝，避免把显然会失败的流量继续打到下游。拒绝时抛出的是规则拦截，不是下游的超时异常。对拦截异常再立即重试，只会继续消耗配额。规则应放在可推送的位置，例如 Nacos，而不是只写在某一次启动的代码常量里。它保护的是本进程里的这个资源，不能自动保护没有接入的其他服务。',
    why:'学习者会把被限流挡住当成下游超时，于是立刻重试。第二次请求在已经过载时又叠上去，业务方法却一次都没进。第二次的异常是拦截、而且没有进入方法，下游故意变慢时熔断打开后请求也不再打到下游，才说明这不是同一种失败。',
    example:'流控阈值调到 1，第一次进入业务方法，第二次抛出拦截异常，业务方法没有日志，接口返回约定的拒绝而不是下游的超时。把下游故意改慢并打开熔断后，后续请求不再打到下游。在捕获拦截的地方马上再调用一次，只会在配额之外再加一次拒绝。',
    task:'把流控阈值调到 1，连续调用两次。记录第二次的异常类型，并确认它没有进入业务方法。再把下游故意改慢，看熔断打开后的请求是否还打到下游。',
    answer:'阈值调到 1 时，第一次通过并进入业务方法，第二次是拦截异常，没有进入方法，不应按下游超时立刻重试。下游故意变慢、熔断打开后，后续请求不再打到下游，停止的是继续调用。拦截返回明确失败。流控是还没执行就拒绝，熔断是下游已经不健康时暂停。捕获到拦截后再立即调用一次，只会在配额之外再被拒绝。',
    keywords:'Sentinel 流控 熔断 BlockException Spring Cloud Alibaba',
    points:['流控按配额拒绝进入资源的请求','熔断在下游异常或过慢时暂停继续调用','规则拦截不是下游超时，不能立刻重试'],
    deep:[
      {title:'和网关限流的分工',body:'网关限制进入整个系统的流量。Sentinel 限制某一个服务里的某一个资源。两层可以同时存在，但阈值表达的不是同一个容量。'},
      {title:'热点参数',body:'按商品 id 限流时，一个热点 id 不应耗尽其他 id 的配额。这是参数级规则，不是整个接口共用一个计数器就能表达的。'}
    ],
    refs:[['Sentinel：介绍','https://sentinelguard.io/zh-cn/docs/introduction.html'],['Sentinel：流量控制','https://sentinelguard.io/zh-cn/docs/flow-control.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-seata-intro',
    title:'Seata 用一个全局编号把多个数据库分支收在一起',
    prompt:'订单库已经提交、库存库失败了，怎样让两边回到同一结果？',
    core:'一个请求改了多个服务的数据库时，每个库自己的本地事务只能保证自己那一段。订单提交成功而库存失败，数据就分开了。能放进同一个库的不变量，先不要拆成这一课，见 `distributed-one-db-first`。Seata 用全局事务把必须一起成功的分支收在一起。发起方是事务管理器，在入口方法上声明全局事务，向事务协调器申请全局编号 XID。持有数据库的一方是资源管理器，执行本地分支并向协调器注册。协调器决定全局提交或全局回滚，再通知每个分支。XID 必须随 RPC 传到下游，否则下游是另一笔本地提交，见 `distributed-xid-must-travel`。AT 记 undo 并在第一阶段本地提交，别人可能先看见，见 `distributed-at-sees-before-global`。TCC 要业务写尝试、确认、取消，乱序见 `sca-seata-tcc-empty`。需要等支付、发短信这种长步骤时，补偿是一笔新业务，见 `distributed-saga-is-new-action`，不要把数据库锁跨过等待。XA 走数据库两阶段，准备后锁更长，见 `distributed-xa`。协调器是单独的服务。全局事务只包必须同时成功的短写入。',
    why:'学习者会只记住一个注解的名字，就以为两个库会自动回到同一结果。库存失败时订单已经提交，他分不清该用镜像回滚、手写补偿还是长流程。分支上能看到同一个全局编号，协调器收到失败后订单库才回滚，才说明两边不是各自提交。',
    example:'下单入口开启全局事务，XID 随调用传到库存服务。订单库和库存库各自注册分支。库存失败时协调器通知订单库回滚。若流程还要等用户支付好几分钟，就改成 Saga，而不是让数据库锁跨过整个等待。',
    task:'写下一笔跨两个库的操作：标出发起方、协调器和两个分支。选择 AT、TCC、Saga 或 XA 中的一种，并写明业务要准备的表或接口。',
    answer:'下单服务是发起方，Seata 服务是协调器，订单库和库存库是两个分支。短写入选 AT：两张业务表各自准备 undo_log，库存失败时协调器通知订单库回滚，而不是订单库自己已经提交就结束。TCC 要准备尝试、确认、取消接口；Saga 适合等支付这种长等待；XA 走数据库两阶段、锁更长。流程若要等用户支付好几分钟，不能让数据库锁跨过整个等待。',
    keywords:'Seata TM TC RM XID AT TCC Saga XA',
    points:['全局事务由发起方、协调器和各数据库分支组成','XID 必须随调用传到下游，分支才能登记到同一笔事务','AT、TCC、Saga 和 XA 用不同方式完成提交与回滚'],
    deep:[
      {title:'和本地事务的关系',body:'每个分支先是所在数据库上的本地事务。AT 在这个本地事务里记录镜像。没有本地事务的写入，协调器没有行可回滚。'},
      {title:'注解覆盖不到的调用',body:'没有把 XID 传到的下游会自己提交，成为全局事务外面的成功。HTTP、消息和短信默认都不在 AT 的镜像里，下一课专门看这条边界。'}
    ],
    refs:[['Seata：什么是 Seata','https://seata.apache.org/docs/overview/what-is-seata/'],['Spring Cloud Alibaba：Seata','https://github.com/alibaba/spring-cloud-alibaba/wiki/Seata']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-seata-at-boundary',
    title:'Seata AT 只能撤销它记录过的数据库修改',
    prompt:'给下单和发短信都套上全局事务，短信已经发出去，数据库回滚后短信会收回吗？',
    core:'Seata 的 AT 模式解析支持的 SQL，在提交前保存前后镜像到 undo log，并用全局锁避免并发改同一行。全局事务回滚时，用 undo log 把数据库行改回去。这个机制不管数据库以外的副作用。已经发出的短信、已经投递的消息、已经调用的外部支付，不会因为 undo 而消失。那些步骤要使用本地消息、补偿或 Seata 的 TCC、Saga 等明确写出的反向操作。AT 也不是把多个服务提升成串行化隔离。全局事务应短，只包必须一起提交的数据库写入。',
    why:'学习者会把全局事务当成所有远程调用的自动回滚。短信已经发出，数据库回滚后用户仍收到短信，他以为事务没有生效。短信不在可撤销的数据库写入里，提交成功后才发送，回滚时短信步骤还没发生，才说明外部副作用不靠镜像收回。',
    example:'扣库存和写订单在各自的数据库分支里，失败时可以按记录的镜像撤销，两张表回到原样。短信若放进同一全局事务，数据库回滚后短信已经发出，收不回来。把短信挪到全局提交成功之后，用可重试的消息发送，回滚的那一次用户不会收到短信。',
    task:'设计一笔会写两张库并调用短信网关的下单。标明哪些写入能靠 undo 撤销，哪一步必须改成提交后的补偿。',
    answer:'两张库里的写入若被记录了撤销信息，回滚时可以撤掉。短信网关这次调用撤不掉，必须标成提交后的补偿或改到提交成功后再发。全局事务只包短的数据库写入。已经发出的短信不能靠数据库回滚收回。数据库回到原样时，短信若已发出就仍然在用户手里，这说明它不在撤销范围内。',
    keywords:'Seata AT undo log 全局事务 TCC 补偿',
    points:['AT 用 undo log 回滚它接管的 SQL','数据库以外的调用不会被 undo 撤销','全局事务保持短，外部副作用用补偿或提交后的消息'],
    deep:[
      {title:'和其他模式',body:'TCC 要业务自己实现尝试、确认和取消。Saga 按正向和反向步骤编排。AT 省去这些接口，代价是只覆盖它能解析的数据库修改。'},
      {title:'和本地事务',body:'每个分支仍先遵守本地数据库事务。没有本地事务的写入，全局事务无从记录前后镜像。'}
    ],
    refs:[['Seata：AT 模式','https://seata.apache.org/docs/user/mode/at/'],['Seata：事务模式','https://seata.apache.org/docs/overview/what-is-seata/']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-rocketmq-intro',
    title:'RocketMQ 用主题和消费组传递事件',
    prompt:'订单服务直接调用发货接口，和先往 RocketMQ 发一条消息，可靠性差在哪里？',
    core:'RocketMQ 是分布式消息系统。生产者把消息发到主题。一个主题分成多个队列，队列是并行和顺序的单位：同一队列里的消息按进入顺序被读取，不同队列之间并行。消费者以消费组加入。集群消费时，同一组里的多个消费者分摊这些队列，一条消息由组内一个消费者处理。广播消费时，组里每个消费者都收到全部消息。标签是主题内的过滤条件，用来只订阅订单创建或只订阅订单取消，不必为每种事件单独建主题。正常投递是至少一次，网络重试会让同一条消息再次到达，所以消费逻辑要用业务键做到重复执行结果不变。延迟或定时消息由服务端在指定时间之后才投递给消费者，用来做超时关单这类“过一会儿再检查”的工作。事务消息把发消息和本地数据库提交连起来：先放一条半消息，本地事务成功后再提交消息，失败则丢弃半消息；消费者不会看到未提交的半消息。这解决的是“数据库写了但消息没发出去”，不是 Seata 那种两个业务库一起回滚。Spring Cloud Alibaba 通过 Spring Cloud Stream 的绑定把应用接到 RocketMQ：绑定的目的地对应主题，应用代码发送或消费，不自己管理队列分配。Kafka、RabbitMQ 和 RocketMQ 怎么按工作负载选择，以及死信如何处理，在消息队列那一组课里。',
    why:'学习者会以为往消息里发一条和直接调用发货一样可靠，只是多了一跳。下游一故障，下单就被同步调用判失败；没有消费组时也不知道谁在读、重复了怎么认。订单提交后消息仍在、重复投递被同一业务键跳过，才说明可靠性差在失败边界和重复，不在多一次网络。',
    example:'订单库提交成功后，向主题发送带标签的消息。发货服务按消费组读取，同一订单号的重复消息被跳过，库存只处理一次。三十分钟未支付用定时消息触发检查，而不是下单线程睡在那里。这条链路不用全局事务去收回已经发出的消息。',
    task:'为“下单成功通知发货”写出主题、标签、消费组和幂等键。说明为什么这条链路不用 Seata 去回滚已经发出的消息。',
    answer:'主题承载“下单成功通知发货”，标签用于过滤，消费组决定由谁分摊这些队列，幂等键用订单号挡住重复投递。下游短时不可用时，下单已经提交，消息可以再投，而不是让下单接口失败。这条链路不用全局事务去回滚已经发出的消息，定时消息只负责推迟投递。下单接口在消息尚未被消费时也应已经返回成功，而不是等发货完成。',
    keywords:'RocketMQ topic queue consumer group 事务消息 定时消息',
    points:['主题下的队列是并行单位，消费组决定如何分摊消息','投递至少一次，消费必须按业务键幂等','定时消息推迟投递，事务消息把本地事务和发送绑在一起'],
    deep:[
      {title:'和同步调用的差别',body:'同步调用要求发货服务此刻可用，否则订单接口失败或长时间等待。消息把“订单已成立”先记下来，发货服务恢复后继续消费。代价是调用方不能在同一个返回值里拿到发货结果。'},
      {title:'和 Seata 的差别',body:'事务消息保证本服务的数据库和这条消息一致。它不回滚发货服务已经写下的数据。跨两个业务库的同时提交仍是 Seata 的问题。'},
      {title:'事务消息的回查',body:'本地事务的结果如果没有及时告诉服务端，服务端会回来询问这笔业务是否已经提交。回查只能回答提交或丢弃，不能在回查里再次下单。'}
    ],
    refs:[['RocketMQ：基本概念','https://rocketmq.apache.org/docs/introduction/02concepts/'],['Spring Cloud Alibaba：RocketMQ','https://github.com/alibaba/spring-cloud-alibaba/wiki/RocketMQ']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-oss-intro',
    title:'OSS 按存储空间和对象键保存文件',
    prompt:'用户头像为什么不放进订单表的二进制字段？',
    core:'对象存储 OSS 用来保存大量文件。存储空间 Bucket 是文件的容器，属于某个地域。对象是文件本身，用对象键定位，键看起来像路径，例如 avatars/42/a.png。上传成功表示这些字节和元数据已经写进该地域的存储，不是数据库插入了一行。访问权限分两种常见情况：公共读允许任何人用地址读取，私有对象必须用带过期时间的签名地址临时授权。应用使用的访问密钥放在环境变量或云账号角色里，不写进仓库。大文件用流式上传，避免把整个文件读进 Java 堆。数据库只保存 Bucket、对象键和必要时的访问方式。OSS 不参与 Seata 的 undo：先上传再回滚数据库，文件仍留在 Bucket 里，要在补偿里删除，或等数据库提交成功后再上传。它也不是配置中心，改一个对象不会刷新 Spring 的配置绑定；也不是消息队列，上传完成不会自动通知消费组，除非另外配置事件。Spring Cloud Alibaba 提供的是访问这个云服务的 starter，容量、权限和地域以对象存储的产品文档为准。',
    why:'学习者会把文件塞进订单表的二进制字段，或把对象存储当成可回滚的事务分支。数据库回滚后，旧地址仍能读到刚上传的文件，备份和权限也跟订单绑在一起。表里只留对象键、回滚时对象被删掉或根本还没上传，才说明文件不在这次数据库提交里。',
    example:'头像上传到私有空间，订单表只记录对象键。页面展示时拿到一段短时有效的签名地址，过期后再读应失败。订单事务失败时，若对象已经上传，需要单独删除，回滚本身不会让这个地址失效。改成事务成功后再上传，失败的那次空间里没有残留对象。',
    task:'选一个现有文件字段，写出它的 Bucket、对象键、谁可以读、密钥放在哪里，以及数据库回滚时文件怎么处理。',
    answer:'空间名加对象键定位文件，数据库只保存这个位置，谁可以读由私有和签名地址决定。密钥放在运行环境，不进仓库。数据库回滚不会删除已上传的对象，所以要么事务失败时补一次删除，要么改成事务成功后再上传。签名地址过期后不能继续读。签名地址过期后的读取应失败，这和订单行还在不在不是同一次提交。',
    keywords:'OSS Bucket 对象键 签名地址 对象存储',
    points:['Bucket 和对象键定位文件，数据库只保存这个位置','私有对象用带过期时间的签名地址访问','上传不受数据库回滚影响，失败时要单独删除或改顺序'],
    deep:[
      {title:'和本地磁盘的差别',body:'文件放在某台应用机器的磁盘上时，其他实例和以后的新实例都读不到。对象存储与具体应用进程分开，任何拿到授权的实例都能按键读取。'},
      {title:'密钥',body:'访问密钥出现在配置仓库或镜像里，就等于 Bucket 的写权限随代码扩散。运行时从环境或角色获取，样例配置里只留占位符。'}
    ],
    refs:[['阿里云：什么是对象存储 OSS','https://help.aliyun.com/zh/oss/user-guide/what-is-oss'],['Spring Cloud Alibaba README','https://github.com/alibaba/spring-cloud-alibaba/blob/2023.x/README-zh.md']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-schedulerx-intro',
    title:'SchedulerX 让定时任务在集群里只被触发一次',
    prompt:'三个订单实例都写了本地定时器，关单任务为什么执行了三次？',
    core:'Spring 的本地定时器跑在加载了该 Bean 的每一个进程里。三个副本就会到点执行三次，除非另外加分布式锁并接受锁失败的那些实例空转。SchedulerX 是分布式任务调度：任务的时间表达式登记在调度平台上，应用里的 worker 负责执行被分配到的任务。一次触发对应一次执行，或对应一批被拆开的子任务。官方说明里的网格任务把大量子任务分到各个 worker 上执行，用来处理“扫全表”这种单机定时器会超时的工作。应用要提供任务处理器，也就是真正跑业务的那段代码；几点执行写在平台上，而不是只写在某个实例的注解里。调度平台不可用时，客户端自己不会变成全集群唯一的计时器。任务可能因为超时或平台重试再次执行，处理器要按业务键忽略重复，例如同一订单只关一次。它是云上的调度服务加客户端，不是一个无需服务端、只在单机内存里计时的库。',
    why:'学习者会把调度平台当成注解的别名，三个副本上的本地定时器就会把关单跑三遍。任务注册、分片和重试都没有记录可查，已关闭的订单被再次关闭。触发记录只有一次、重复执行时同一业务键直接跳过，才说明时间在平台上，不在每个进程里。',
    example:'超时关单登记为每分钟一次的任务。三个订单实例都启动 worker，同一次触发只进入一个处理器。处理器查询未支付订单并关闭，重复触发时已关闭的订单直接跳过。若订单量很大，改成网格任务，把用户 id 区间分成子任务分给多个 worker。',
    task:'找一个会在生产跑多个副本的定时方法。写出它现在会执行几次，改到 SchedulerX 后触发记录应出现几次，以及重复执行时哪一个业务键保证结果不变。',
    answer:'三个副本都写本地定时器时，同一次时刻会执行三次。改到调度平台后，同一次触发记录只应出现一次，由一个处理器进入。订单量很大时可以拆成子任务分给多个执行器。重复执行时，已关闭的订单靠业务键跳过，结果不变。处理器必须承受平台重试。三个副本同时在跑时，同一次触发的处理日志也只能有一份。',
    keywords:'SchedulerX 分布式调度 cron 网格任务 worker',
    points:['本地定时器会在每个应用副本上各执行一次','任务时间在调度平台上，worker 执行被分配的任务','网格任务把大量子任务分给多个 worker，处理器要承受重复执行'],
    deep:[
      {title:'和分布式锁的差别',body:'给本地定时器加锁，可以让多个副本里只有一个跑起来。锁的租约、实例宕机和时钟仍要自己处理。调度平台把“到点触发一次”做成任务记录，执行历史在平台上可查。'},
      {title:'它不替代消息延迟',body:'三十分钟后检查某一笔订单，用消息的定时投递可以带着那笔订单的编号。每分钟扫描所有超时订单，才是调度任务。两种计时不要合成一个注解。'}
    ],
    refs:[['SchedulerX：产品概述','https://help.aliyun.com/zh/schedulerx/schedulerx-xxljob/product-overview/what-is-schedulerx'],['Spring Cloud Alibaba README','https://github.com/alibaba/spring-cloud-alibaba/blob/2023.x/README-zh.md']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-sms-intro',
    title:'短信服务受理的是一次模板发送',
    prompt:'发送接口返回成功，能不能当成用户已经读到短信？',
    core:'短信服务是触达通道。一次发送要有签名、已审核的模板、手机号和模板变量。签名表明是谁在发，模板是预先审过的文本，变量只替换其中的空位，不能在调用时临时拼一整段未审核的内容。接口返回成功并给出消息编号，表示平台受理了这次请求。手机是否收到，要等状态报告或主动查询；运营商拒绝、限流和空号都会在受理之后失败。因此订单状态不能绑在“接口成功”上。发送也不放进指望数据库回滚的事务里：回滚撤不回已经受理的短信。重试要先按业务键查询是否已经受理，否则同一次支付成功会发出两条短信。访问密钥与 OSS 一样放在运行环境，不进仓库。站内通知、邮件和短信是不同通道，短信模板的审核和计费不适用于前两者。Spring Cloud Alibaba 提供接入这个云服务的方式，模板、签名和发送限制以短信产品文档为准。',
    why:'学习者会把发送接口返回成功当成用户已经读到短信。客服在用户没收到时认为已经通知；把发送放进数据库事务后，回滚了用户仍收到一条，重试又再发一条。接口成功只留下受理编号、稍后的状态报告才是失败，才说明送达和受理不是同一次返回。',
    example:'支付成功后记录一条待发送，业务键是支付单号。调用短信接口，保存返回的消息编号。状态报告失败则标记失败并允许人工重发。支付单回滚时，尚未调用接口的待发送记录一并取消；已经受理的不再依赖回滚。',
    task:'选一条真实短信，写出签名、模板、变量、业务幂等键，以及接口成功但稍后投递失败时订单页面显示什么。',
    answer:'签名、模板、变量和业务幂等键一起才构成这一次发送。接口返回成功时，订单页面只能显示已受理，并记下消息编号。稍后状态报告失败，页面应改成失败并允许按同一业务键人工重发，不能再当成已读。支付单回滚时，尚未调用的待发送可以取消，已经受理的短信不会被数据库回滚收回。',
    keywords:'短信服务 模板 签名 状态报告 幂等',
    points:['发送由签名、已审核模板、手机号和变量组成','接口成功表示平台受理，送达要以状态报告为准','重试必须按业务键去重，数据库回滚不会收回短信'],
    deep:[
      {title:'和站内信的差别',body:'站内信写在自己的数据库里，事务可以一起提交或一起取消。短信一旦被平台受理，就离开了这个事务。需要同时存在时，先提交业务，再发送短信。'},
      {title:'模板变量',body:'变量应是验证码、订单号、金额这类短字段。把完整 URL 或用户输入塞进变量，会触发模板审核限制，也会把未检查的内容发给用户。'}
    ],
    refs:[['阿里云：什么是短信服务','https://help.aliyun.com/zh/sms/product-overview/what-is-short-message-service'],['Spring Cloud Alibaba README','https://github.com/alibaba/spring-cloud-alibaba/blob/2023.x/README-zh.md']]
  },
  {
    track:'java', group:'消息队列', id:'mq-pick-workload',
    title:'先定工作负载，再在 Kafka、RabbitMQ、RocketMQ 里选一个',
    prompt:'一个系统里同时装上 Kafka、RabbitMQ 和 RocketMQ，算架构完整吗？',
    core:'三种系统都传消息，但模型不同。Kafka 是按分区保存的日志：吞吐高，分区内有序，消费组用位点重放，适合事件流和可回放的数据。RabbitMQ 把消息发到交换器，再按绑定进队列，单条确认，路由灵活，适合任务分发和中等流量的业务指令。RocketMQ 以主题和队列组织，消费组共同分担队列，支持标签过滤、延迟消息和事务消息，适合 Java 业务里要延迟、要和本地事务衔接的事件。一种工作负载选一种。日志、任务和延迟通知若硬塞进同一个集群，会同时失去重放、路由或延迟能力。选型不替代消费端幂等，三者默认都可能重复投递。',
    why:'学习者会以为同时装上三种消息产品就算架构完整。运维三套集群，流水、发信和延迟关单仍挤在同一种模型里，缺的能力靠业务补。三件事各只留一个产品、另外两个被明确拒绝，才说明选型看的是不可妥协的需求，不是名词堆齐。',
    example:'用户行为流水按用户标识进入可重放的分区日志，消费可以回头读。发送邮件要单独确认、失败再投，走交换器进队列。下单后 30 分钟未支付的关单用延迟消息，到点才投递。三件事若都塞进同一个产品，总会有一种确认、延迟或重放对不上。',
    task:'给流水、发信、延迟关单三件事各写一句不可妥协的需求，然后只选一个产品并说明另两个为什么不合适。',
    answer:'流水不可妥协的是重放和高吞吐，选分区日志，另外两个缺少这种消费方式。发信不可妥协的是路由和单条确认，选交换器模型。延迟关单不可妥协的是到点投递，选带延迟和事务消息的那一个。一种负载只留一个产品，不要三套服务于同一种消息。三套集群同时在线并不能让同一种消息同时获得三种模型。',
    keywords:'Kafka RabbitMQ RocketMQ 消息队列选型 延迟消息',
    points:['Kafka 是可重放的分区日志','RabbitMQ 用交换器把消息路由进队列','RocketMQ 提供队列、延迟和事务消息，一种负载只选一种'],
    deep:[
      {title:'顺序',body:'三者的顺序都不是全局的。Kafka 在分区内有序，RabbitMQ 单队列里按投递顺序，RocketMQ 在同一个队列内有序。需要顺序时，先保证相关消息进入同一个分区或队列。'},
      {title:'重复',body:'确认之前崩溃都会导致再投。选择产品不能去掉业务幂等。幂等键是订单号或事件号，不是“我们选了不会重复的队列”。'}
    ],
    refs:[['Kafka：介绍','https://kafka.apache.org/documentation/#introduction'],['RabbitMQ：交换器','https://www.rabbitmq.com/docs/exchanges'],['RocketMQ：基本概念','https://rocketmq.apache.org/docs/introduction/02concepts/']]
  },
  {
    track:'java', group:'消息队列', id:'rocketmq-queue-order',
    title:'RocketMQ 的顺序只存在于同一个队列',
    prompt:'同一个主题里的消息，为什么消费者看到的顺序和发送顺序不一样？',
    core:'RocketMQ 的主题是逻辑分类，下面有多个队列。队列才是存储、并行和顺序的单位，作用类似 Kafka 的分区。同一个消费组里的消费者分摊这些队列，所以一个组共同处理一份消息。另一个消费组会再得到一整份。标签用来在订阅时过滤，它不是队列，也不能提供顺序。普通发送会把消息散到不同队列，全局发送顺序因此不存在。要让同一订单的事件有序，必须让这些事件进入同一个队列，通常按订单号选择队列。消费成功后再提交位点。提交前失败会再投，所以下游仍按业务键去重。',
    why:'学习者会把同一个主题当成一条全局有序的管道。并发一高，创建、支付、关闭被看到的顺序和发送顺序不同，订单状态来回跳。按订单号固定到同一队列后三条顺序保持、轮询发送时被打乱，才说明顺序只存在于一个队列里。',
    example:'队列数设为 4。按轮询发送创建、支付、关闭时，三条可能落到不同队列，消费顺序和发送顺序不一致。改成按订单号固定队列后，这三条进入同一队列，消费顺序与发送一致。另一个统计消费组单独读，不推进交易组的位点。',
    task:'同一订单连发三条有序事件，队列数设为 4。一次按轮询发送，一次按订单号固定队列。比较消费顺序。',
    answer:'队列数为 4 且按轮询发送时，同一订单的三条事件可能分到不同队列，消费者看到的顺序和发送顺序不同。按订单号固定队列后，三条在该队列内保持发送顺序。消费组之间不共享位点，统计组的读取不改变交易组。标签只负责过滤，不能代替固定队列。统计组读过这些消息后，交易组的消费位置不应被推进。',
    keywords:'RocketMQ topic queue consumer group tag 顺序',
    points:['主题下面的队列才是顺序和并行单位','同一消费组共同分担队列，不同组各自全量消费','标签用于过滤，不能代替固定队列来保证顺序'],
    deep:[
      {title:'延迟消息',body:'延迟消息到点后才可被消费，它不改变队列内其他消息的顺序模型。需要延迟时用产品提供的延迟能力，不要让消费者睡一段时间再处理，那会占住线程。'},
      {title:'事务消息',body:'事务消息用来把本地数据库提交和消息发送扣在一起，避免数据库成功但消息没发出。它不保证下游业务只执行一次，下游仍要幂等。'}
    ],
    refs:[['RocketMQ：基本概念','https://rocketmq.apache.org/docs/introduction/02concepts/'],['RocketMQ：顺序消息','https://rocketmq.apache.org/docs/4.x/producer/03message2/']]
  },
  {
    track:'java', group:'消息队列', id:'rabbit-exchange-binding',
    title:'RabbitMQ 先到交换器，再到绑定的队列',
    prompt:'生产者写的是队列名字，为什么改了绑定以后消息去了别的地方？',
    core:'RabbitMQ 里生产者把消息发给交换器，并带上路由键。队列通过绑定接到交换器上，绑定也可以有绑定键。direct 把路由键和绑定键完全相等的消息送进对应队列。fanout 忽略键，复制到所有绑定队列。topic 按点分的单词做模式匹配。新手示例能“发到队列”，是因为使用了默认交换器：它是一个 direct，路由键等于队列名。消息一旦无法路由又没有设置退回，会被丢掉。消费者的确认是另一件事：入队成功不等于业务已经处理。',
    why:'学习者会记住生产者写的队列名字，以为消息一定进那个队列。改了绑定以后，一条消息进了两个队列，或者发出去队列仍是空的。发送时只写交换器和路由键、两个绑定各自收到或都收不到，才说明目的地是绑定算出来的。',
    example:'主题交换器上，邮件队列绑定 order.*，审计队列绑定 order.#。发送 order.paid 时两个队列都收到，生产者没有写任何一个队列的名字。发送 user.created 时两个订单绑定都接不住，消息没有留在队列里。没有备用策略时，这次发送不会静默变成稍后可见。',
    task:'建一个 topic 交换器和两个绑定不同的队列。发送 order.paid 和 user.created，记录各自进入哪个队列。再发一个没有绑定能接住的键，确认消息没有静默留下来。',
    answer:'发送 order.paid 时，按绑定进入邮件队列和审计队列，生产者不写队列名。发送 user.created 时，这两个绑定都接不住，消息不会留在业务队列里。再发一个没有任何绑定能接住的键，结果同样是没有进入队列，需要显式退回或备用策略。默认交换器才是路由键等于队列名的特例。',
    keywords:'RabbitMQ exchange binding routing key topic fanout',
    points:['生产者发布到交换器而不是直接写入业务队列','direct、fanout、topic 决定绑定如何匹配','默认交换器把路由键当作队列名，无法路由的消息可能被丢弃'],
    deep:[
      {title:'和确认的顺序',body:'消息进入队列只说明路由成功。消费者处理完业务再 ack，进程才算把任务做完。交换器模型不代替消费确认。'},
      {title:'和 Kafka 的差别',body:'Kafka 的消费者自己保存位点并可重放。RabbitMQ 的消息在确认后从队列移除，不是一条可随意回放的日志。需要回放时不要把它当成 Kafka。'}
    ],
    refs:[['RabbitMQ：交换器','https://www.rabbitmq.com/docs/exchanges'],['RabbitMQ：路由教程','https://www.rabbitmq.com/tutorials/tutorial-four-java']]
  },
  {
    track:'java', group:'中间件', id:'nginx-proxy-timeout',
    title:'Nginx 的超时是在等上游，不是 Java 线程池的超时',
    prompt:'Nginx 返回 504，就能说明 Java 方法超过了三秒吗？',
    core:'Nginx 作反向代理时，用 upstream 保存后端地址，用 proxy_pass 把请求转过去。proxy_connect_timeout 只限制连上上游的时间。proxy_read_timeout 限制两次从上游读取之间能等多久，不是整次请求的总预算。后端一直慢慢写出数据，读取超时可以一直不触发。open source Nginx 用 max_fails 和 fail_timeout 做被动摘除：上游连接或读取失败次数够了，才在一段时间内不再选它。这和主动健康检查不是同一功能。Java 侧的连接池等待、语句超时和应用线程超时仍要单独设置。网关先超时断开，后端事务可能还在提交。',
    why:'学习者会把网关返回的 504 当成 Java 方法一定超过了三秒。连不上、读等待和慢查询被合成同一种错误，于是他只加长一个超时。拒绝连接时应用日志还没有慢查询、接受后不响应才等到读取超时，才说明 504 覆盖的阶段不同。',
    example:'上游端口拒绝连接时，错误很快出现在连接阶段，应用日志里没有慢查询。上游接受连接后 30 秒不写字节，才触及读取超时，Java 方法可能仍停在写出之前。池里借不到数据库连接时，应用自己先超时，网关只是还在等响应，加长读取等待不会取消这次借连接。',
    task:'分别制造拒绝连接、接受后不响应、以及应用日志里的慢查询。记录 Nginx 错误和 Java 日志谁先出现。',
    answer:'拒绝连接时，先出现的是网关的连接超时，Java 日志里没有慢查询。接受后不响应时，先等到读取间隔超时，应用可能没有写完。应用日志里的慢查询或借不到连接，是应用自己的超时，读取超时不会代替它。三种记录不能合成“方法超过了三秒”。加长读取等待不会让借不到数据库连接的那次提前结束。',
    keywords:'Nginx proxy_read_timeout proxy_connect_timeout upstream 504',
    points:['proxy_connect_timeout 只限制建立到上游的连接','proxy_read_timeout 限制两次读取之间的等待','被动失败摘除不等于主动健康检查'],
    deep:[
      {title:'和优雅停机',body:'实例退出前应先从 upstream 的可用名单离开，并给已接受的请求留出读取超时以内的完成时间。先杀进程，Nginx 仍会把请求送进去。'},
      {title:'请求体',body:'上传大文件时，Nginx 和后端对请求体大小的限制是两道门。只放宽其中一道，另一道仍会拒绝。'}
    ],
    refs:[['Nginx：proxy 模块','https://nginx.org/en/docs/http/ngx_http_proxy_module.html'],['Nginx：upstream','https://nginx.org/en/docs/http/ngx_http_upstream_module.html']]
  },
  {
    track:'java', group:'中间件', id:'gateway-one-hop',
    title:'网关是明确的一跳，不是所有服务旁边各做一遍',
    prompt:'已经有 Spring Cloud Gateway，为什么每个服务里还要再限流和鉴权一遍？',
    core:'Spring Cloud Gateway 是独立进程。它用谓词匹配路径、方法或请求头，用过滤器改写请求、校验令牌或限流，再代理到后端。后端地址可以来自固定 URI，也可以来自发现服务。它不替代 Nacos 的实例名单，也不替代每个服务里的对象级授权：边缘可以确认令牌有效，订单服务仍要确认这张订单属于该用户。服务网格的边车是另一个模型，代理坐在每个 Pod 旁边。边缘网关和边车不要对同一次请求做两套互相不知道的鉴权。限流同理：入口的总配额和 Sentinel 在单个资源上的配额要分别定义。',
    why:'学习者会以为入口已经有网关，每个服务里就不必再做限流和鉴权。两层都拒绝但规则不一致，排障看不出是网关挡的还是订单服务挡的。网关拒绝时服务没有日志、服务拒绝时网关已经放行，才说明同一件事只能由一层负责。',
    example:'网关校验令牌并把用户标识传给订单服务，令牌无效时网关直接拒绝，订单服务没有访问日志。令牌有效但订单不属于该用户时，拒绝状态由订单服务产生。商品详情这种公开读在网关放行，不在每个服务里复制同一条公开规则。',
    task:'画一次下单请求经过的跳：网关、发现、订单服务、数据库。标明每一跳拒绝请求时的状态码由谁产生。',
    answer:'下单依次经过网关、发现、订单服务和数据库。令牌无效或入口超额时，状态码由网关产生，订单服务没有这条访问。身份已经传到订单服务后，对象不属于该用户的拒绝由订单服务产生。发现只提供地址，不产生这几种拒绝。公开读的放行不要在每一跳各做一遍。同一次下单的拒绝日志只应出现在产生该状态码的那一跳。',
    keywords:'Spring Cloud Gateway 谓词 过滤器 服务网格 鉴权',
    points:['网关按谓词选路由，并在过滤器里处理边缘逻辑','发现服务提供实例，网关负责把请求代理过去','对象级授权仍在拥有该数据的服务里'],
    deep:[
      {title:'超时',body:'网关到后端的响应超时，和 Nginx、应用自己的超时是第三条时钟。边缘先断开时，后端事务可能仍在进行，所以写接口仍要幂等。'},
      {title:'和 Sentinel 的位置',body:'入口限流保护整个下游不被打满。进程内 Sentinel 保护某一个资源。不要用两个相同的 QPS 数字假装它们在保护同一件事。'}
    ],
    refs:[['Spring Cloud Gateway：工作方式','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway-server-webflux/how-it-works.html'],['Spring Cloud Gateway：路由谓词','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway-server-webflux/request-predicates-factories.html']]
  },
  {
    track:'java', group:'工程实践', id:'retired-spring-cloud-netflix',
    title:'Hystrix、Ribbon、Zuul 1 和 javax 前缀已退出当前主线',
    prompt:'示例还在用 @HystrixCommand、Ribbon 和 javax.servlet，能当 Spring Boot 3 的写法吗？',
    core:'Spring Cloud 2020.0 起，发行版移除了 Hystrix、Ribbon 和 Zuul 1 这些 Netflix 模块。进程内限流和熔断用 Sentinel 或 Resilience4j。客户端负载均衡的现行实现是 Spring Cloud LoadBalancer。北向入口用 Spring Cloud Gateway。Spring Boot 3 基于 Jakarta EE，依赖的包名是 jakarta.servlet、jakarta.persistence，不是 javax 下的同名包。MySQL 8 也已经移除查询缓存。旧项目可以留在 Boot 2 维持这些类，新的课程和新建服务按现行组件写。',
    why:'学习者会把旧示例里的熔断注解、客户端负载组件和旧包名前缀写进新服务。依赖解析失败，或者跑起来的是文档已不再维护的行为，他却对照新版本的手册查配置。新建模块里这些名字被换成现行组件后才能启动，才说明它们属于旧栈。',
    example:'新服务里搜到旧熔断注解时，依赖解析失败或行为已无维护文档。改成现行的限流规则、用现行负载均衡按服务名选择、入口走现行网关、过滤器和实体使用 jakarta 包后，新建模块能按现行文档启动。Boot 2 维护分支里可以暂时留着旧导入。',
    task:'在依赖和源码里搜索 Hystrix、Ribbon、Zuul 和 javax.servlet。新建模块中的命中改为现行组件；只在明确的 Boot 2 维护分支里保留旧导入。',
    answer:'新建模块里搜到的旧熔断、旧负载组件、旧网关和 javax 前缀应改成现行组件：负载均衡、网关、限流实现，以及 jakarta 包名。只有明确的旧版本维护分支可以保留旧导入。新的主线不再用这些已经退出的默认项。新建模块按现行文档能启动，旧导入只留在明确的维护分支里。',
    keywords:'Hystrix Ribbon Zuul Spring Cloud Gateway jakarta 已淘汰',
    points:['Hystrix 和 Ribbon 不是当前 Spring Cloud 的默认组件','北向网关用 Spring Cloud Gateway，而不是 Zuul 1','Spring Boot 3 使用 jakarta 包，不再使用 javax.servlet 这套前缀'],
    deep:[
      {title:'维护旧系统',body:'Boot 2 应用不必为了课程立刻重写。它的文档和依赖版本要锁在那一代，不能和 Boot 3 的示例混在同一个新建模块里。'},
      {title:'名字还在的组件',body:'Nacos、Sentinel、Gateway、Kafka、RabbitMQ、RocketMQ 都还在现行文档里，但配置键和默认值要看你选定的发行版本，不能背一篇不写版本的博客。'}
    ],
    refs:[['Spring Boot 3 迁移：Jakarta EE','https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide#jakarta-ee'],['Spring Cloud 2020.0：移除 Netflix 组件','https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes'],['Spring Cloud：LoadBalancer','https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/loadbalancer.html']]
  }
];

const DEEPEN = {
  closure:[
    {title:'调用点决定看见哪一次绑定',body:'函数记住的是它创建时所在的那一次变量环境。渲染函数再次执行会创建新的 count 和新的事件函数。已经挂到按钮上的旧函数仍看旧的 count。函数式更新读的是队列里的最新值，不是旧函数看见的那个变量。'},
    {title:'怎样自己验证',body:'在同一次点击里连续三次 setCount(count + 1)，三次都读到同一次渲染的 count。改成 setCount(n => n + 1) 才依次加。不要背“setState 异步所以是旧的”，异步不是这个结果的原因。'}
  ],
  eventloop:[
    {title:'任务和微任务',body:'一段同步脚本跑完，才会清空由此排入的微任务。微任务里再排微任务，会继续清空，浏览器绘制可以被推迟。setTimeout 是后续的任务，排在当前微任务之后。'},
    {title:'不要背一张通用图',body:'Node 还有 nextTick 和微任务的相对顺序，而且在 CommonJS 与 ES Module 里可能不同。浏览器里的结论不能原样写成 Node 的调度。'}
  ],
  'java-memory':[
    {title:'可达和回收',body:'从 GC Roots 沿引用到得了的对象都还活着。静态字段、运行中的线程栈是常见的根。没有任何根能到达，对象才成为可回收垃圾。收集器在自己的时机回收，不是引用一断就立刻运行终结逻辑。'},
    {title:'泄漏长什么样',body:'静态 Map、未取消的监听和线程池里的任务，都会把业务对象留在可达链上。把字段设为 null 只有在没有别的根时才有用。'}
  ],
  'java-collections':[
    {title:'合约',body:'equals 相等的对象必须有相同 hashCode。hashCode 相同只说明可能落在同一个桶，还要 equals 才算找到。只改其中一个，get 会去错误的桶里找，返回 null。'},
    {title:'键必须稳定',body:'放入 HashMap 之后再改参与哈希的字段，对象还在表里，但按新字段计算的位置找不到它。键用不可变对象，或放入后不再改这些字段。'}
  ],
  'java-concurrency':[
    {title:'三件事分开',body:'可见性是别的线程能不能看到写入。原子性是读改写会不会被拆开。有序性是没有数据依赖的语句会不会被重排到意外的观察顺序。volatile 覆盖指定的可见性和有序性，不把 count++ 变成一个原子步骤。'},
    {title:'选用',body:'一个计数器用原子类。一段必须一起完成的不变式用锁，并在 finally 里释放。不要用 volatile 代替这一段临界区。'}
  ],
  'spring-transaction':[
    {title:'代理只包住外部调用',body:'容器交给别人的是代理对象。外部调用 public 方法时才经过事务拦截器。同类里 this.inner() 走的是目标对象自己，默认不会再套一层事务。'},
    {title:'回滚规则',body:'默认在运行时异常和错误时回滚，受检异常不一定回滚。需要时在注解上写明。捕获异常后不再抛出，拦截器会认为方法成功。'}
  ],
  'mysql-index':[
    {title:'优化器在估计',body:'索引存在，只说明有这条路。优化器按统计信息估计扫描行数和成本。函数包住列、隐式类型转换、选择性很差，都可能让全表扫描更便宜。'},
    {title:'怎样确认',body:'用 EXPLAIN 看预计路径，用 EXPLAIN ANALYZE 看实际行数。估计和实际差一个数量级，就去查统计信息和谓词，而不是再加一条相同的索引。'}
  ],
  idempotency:[
    {title:'谁会重试',body:'用户双击、浏览器重发、网关超时重试、消息再投，都会把同一次业务再送进来。前端禁用按钮只减少其中一种。'},
    {title:'服务器怎么认',body:'用业务键或调用方提供的幂等键，配合数据库唯一约束。第二次插入冲突时读出第一次的结果并返回。不要用“先查再插”而且没有约束，两请求会同时查到不存在。'}
  ],
  cache:[
    {title:'先写允许的陈旧时间',body:'商品文案可以旧几十秒。库存扣减不能靠删缓存碰运气。两种数据不要共用一句“更新数据库后删除缓存”。'},
    {title:'失败窗口',body:'删缓存失败、并发回源、主从延迟，都会让下一次读到旧值或把旧值又写回缓存。策略要写明这个窗口，以及谁是权威数据。'}
  ]
};

for (const {points, refs, ...lesson} of COVERAGE_PATH_04) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
for (const lesson of window.LESSONS) {
  if (DEEPEN[lesson.id] && !lesson.deep) lesson.deep = DEEPEN[lesson.id];
}
