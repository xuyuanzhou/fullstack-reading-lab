/* Deeper public lessons: ecosystems, middleware, queue choice, and retired defaults. */
const COVERAGE_PATH_04 = [
  {
    track:'frontend', group:'语言基础', id:'js-this-callsite',
    title:'this 由调用方式决定，不由定义位置决定',
    prompt:'把对象上的方法取出来再调用，为什么 this 变成了 undefined？',
    core:'普通函数的 this 是这次调用的接收者，不是函数写在哪个对象里面。obj.fn() 的接收者是 obj。const fn = obj.fn 之后再 fn()，调用点没有接收者；在模块和类这类严格模式代码里，this 是 undefined，读 this.id 会抛错。call、apply 和 bind 显式指定接收者。箭头函数没有自己的 this，它使用定义时所在作用域的 this，call 也改不了。React 函数组件没有实例，不要在里面找 this.state。DOM 的 addEventListener 若传入普通函数，调用时 this 是该元素；传入箭头函数则不是。',
    why:'回调、解构方法和定时器都会把方法从对象上摘下来。不看调用点，就会把 undefined 当成框架随机丢了状态。',
    example:'const user = { name: "Ada", hi() { return this.name; } }; user.hi() 得到 Ada。const hi = user.hi; hi() 在严格模式下抛错。改成 hi: () => this 则箭头函数根本看不到 user。',
    task:'分别用对象调用、拆成变量调用、bind 之后调用，以及箭头函数，记录四次 this。再在按钮的 addEventListener 里对比普通函数和箭头函数。',
    answer:'先找调用点有没有接收者。需要固定接收者就用 bind 或包一层箭头函数去调用原方法。箭头函数的 this 在定义时已经确定。',
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
    why:'共用方法是内存模型，也是污染来源。在原型上挂业务状态，所有实例会串数据。',
    example:'class Counter { n = 0; inc() { this.n++; } }。两个实例的 n 各自一份，inc 是同一函数。Counter.prototype.inc = function () { this.n += 10; } 之后，两个实例的下一次 inc 都加 10。',
    task:'创建两个实例，比较它们的方法是否用 === 相等，字段是否相等。再改原型方法，观察两个实例。最后用 Object.getPrototypeOf 画出链，直到 null。',
    answer:'字段看实例自身，方法看原型。改原型等于改所有实例的行为。判断类型用原型链，不用类名字符串。',
    keywords:'JavaScript prototype class instanceof 原型链',
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
    why:'列表页、详情页的加载、错误和返回，如果散落在每个 effect 里，后退和分享链接都会丢条件。',
    example:'订单详情路由的 loader 按 params.id 请求。失败时抛出带 status 的响应，errorElement 显示没有这张订单。筛选条件写在 ?status=paid，而不是只保存在 useState。',
    task:'把一个 useEffect 拉详情的页面改成 loader。刷新、点浏览器后退、直接打开带查询串的地址，确认数据条件和错误页面都还在。',
    answer:'路由负责“进入页面前要有什么数据”。URL 保存可分享的条件。effect 留给进入页面之后才发生的订阅和副作用。',
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
    why:'两份状态会在失效、重试和窗口重新聚焦时各走各的，用户看到的列表和服务器不一致。',
    example:'queryKey 为 ["orders", status]。切换 status 就是另一个缓存。提交新订单的 mutation 成功后，让 ["orders"] 失效，列表按当前筛选重新取，而不是手写把返回值 push 进一个本地数组。',
    task:'用同一 key 打开两个显示订单的组件，在一处完成变更并失效查询。确认两处一起更新，且没有第二份 useState 列表。',
    answer:'服务器结果只放 Query，用 key 区分参数。界面草稿用 state。变更之后失效对应的 key，而不是维护一份平行数组。',
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
    why:'详情页串单、标题不更新，经常是组件被复用，而不是接口没返回。',
    example:'setup 里 const id = route.params.id 只会得到进入时的值。watch(() => route.params.id, load) 才会在 1 变成 2 时重新请求。',
    task:'在两个订单 id 之间用 router-link 切换，记录 setup 次数和页面标题。加上对 params.id 的 watch 后再记一次。',
    answer:'同一组件被复用时，要显式观察路由参数。守卫管能不能进，不管参数变了以后如何重载数据。可分享条件放在 params 或 query。',
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
    why:'新建项目再学一套 mutation 和 module，学的是已经停在维护状态的默认选择。',
    example:'用户会话放在 useSessionStore。订单页自己请求订单。不要把每一张订单列表都提交进全局 store，离开页面后再手动清空。',
    task:'写一个计数 store，在两个组件里修改并确认同步。再把一个只属于当前页的请求结果留在页面内，不放进 store。',
    answer:'新应用用 Pinia。共享且跨页面的客户端状态进 store。一次性的请求结果留在使用它的页面。',
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
    why:'看起来用了 Nuxt，首屏仍要等客户端请求，搜索引擎和慢网络看到的是空壳。',
    example:'文章页 useAsyncData(() => $fetch("/api/posts/" + id))。切换 id 时 key 包含 id。不要在 onMounted 里再请求同一篇文章。',
    task:'查看文档源码里是否已经有正文。再改 id 导航一次，确认没有沿用上一篇文章的数据。',
    answer:'要出现在首屏 HTML 里的数据，用 useFetch 或 useAsyncData。只在浏览器才存在的交互，放在客户端。key 必须跟着参数变。',
    keywords:'Nuxt useFetch useAsyncData payload SSR',
    points:['useFetch 在服务端取数并写入 payload','onMounted 里的请求不会出现在首屏 HTML','不同参数必须使用不同的数据 key'],
    deep:[
      {title:'和水合的关系',body:'服务端 HTML 和客户端第一次渲染必须一致。在 setup 里直接读 window 或本地时间，会和只在服务端算出的 HTML 不一致。浏览器专有逻辑放到客户端组件或水合之后。'},
      {title:'不要双请求',body:'payload 里已经有的数据，客户端水合时不应再自动打同一接口，除非你明确要求刷新。网络面板里同一次进入出现两次相同 GET，就是键或调用方式错了。'}
    ],
    refs:[['Nuxt：数据获取','https://nuxt.com/docs/getting-started/data-fetching'],['Nuxt：useAsyncData','https://nuxt.com/docs/api/composables/use-async-data']]
  },
  {
    track:'frontend', group:'版本边界', id:'retired-frontend-stack',
    title:'这些前端默认项已经退出主线',
    prompt:'教程让新建项目用 Create React App 和 Vuex，现在还该照做吗？',
    core:'Create React App 已由 React 官方日落，不再作为新项目的起点。新的 React 应用使用带数据路由和打包的框架，或用 Vite 自己组装。Vuex 仍可维护旧项目，官方已说明新的 Vue 3 应用使用 Pinia。Vue 2 的 new Vue、Vue.use 全局注册和过滤器不属于 Vue 3 的写法。Core Web Vitals 的交互指标已从 FID 换成 INP，旧文章里的 FID 阈值不能再当现行标准。这些工具有的还能运行，但不能再写成当前默认答案。',
    why:'照着过期脚手架学习，会把已经卸下的配置、全局 API 和指标当成现在的工程结构。',
    example:'新 React 项目用 Vite 或一个现行框架创建。新 Vue 3 项目用 Pinia。性能报告看 INP，而不是 FID。',
    task:'列出自己笔记里的创建命令和状态库。凡是 create-react-app、新建 Vuex、以 FID 为现行指标的，改成上面的现行选择，并写明旧项目可以暂时不迁。',
    answer:'新项目不用 Create React App，不用 Vuex 当默认，不用 FID 当现行交互指标。旧项目维持运行可以，教材里的默认步骤要换。',
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
    why:'基类一旦装入数据库、配置和静态缓存，所有子类都难以单独测试，也难以再继承别的骨架。',
    example:'支付渠道各自实现 Payment，默认方法只提供共同的参数检查。渠道私有的密钥和连接放在各自的类里，不放进一个 AbstractPayment 的字段。',
    task:'找一个只被继承来调用 protected 工具方法的抽象类。把工具收成默认方法或独立对象，确认具体类不再被迫继承它。',
    answer:'能力用接口，必要时加 default。共享的可变状态才考虑抽象类。不要为了复用代码占用唯一的父类。',
    keywords:'Java interface default method abstract class 单继承',
    points:['一个类可以实现多个接口，只能继承一个类','default 方法共享行为，不占用父类名额','抽象类用于真正共享的状态和骨架'],
    deep:[
      {title:'常量',body:'把常量堆在接口里再实现它，是旧写法。常量放在最终类或枚举里，需要时静态导入。接口不要变成常量袋。'},
      {title:'和 Spring 的关系',body:'服务依赖接口，容器注入实现。测试提供另一个实现。这不要求实现类继承同一个抽象基类。'}
    ],
    refs:[['Java 教程：接口','https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html'],['Java 教程：默认方法','https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-nacos-register',
    title:'Nacos 负责找到实例，负载均衡才负责选中一个',
    prompt:'服务已经注册到 Nacos，调用方为什么还会连到已下线的地址？',
    core:'Spring Cloud Alibaba 用 Nacos 保存服务名和实例列表。提供者启动时注册 IP、端口和元数据，并用心跳维持临时实例；心跳停止后，不健康的实例应从列表消失。消费方按服务名查询实例，再由 Spring Cloud LoadBalancer 从健康实例里选一个。这不是 Netflix Ribbon。注册成功只说明名单里曾经有这个地址，不说明此刻端口仍接受连接，也不代替超时和重试。命名空间用来隔开环境，测试实例不应出现在生产命名空间的列表里。',
    why:'只检查“控制台里有这个服务”，会把已死实例、错环境和客户端缓存当成发现功能正常。',
    example:'订单服务只写 spring.application.name 对应的服务名。库存服务下线后，订单侧应在实例摘除后不再选它。连接超时仍然要单独配置。',
    task:'启动两个库存实例，停掉其中一个且不再发心跳。观察消费者新请求是否还打到已停的端口，并记下名单更新的延迟。',
    answer:'Nacos 提供名单和健康状态。LoadBalancer 从当前健康实例里选择。环境用命名空间隔开。调用超时不由注册中心代替。',
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
    why:'以为改了控制台就全网生效，实际上只有重新绑定的 Bean 会变，抄走的副本一直是旧的。',
    example:'阈值放在 ConfigurationProperties 里，业务方法每次从该对象读取。不要在 @PostConstruct 里把阈值存进 int 字段再只用字段。',
    task:'改 Nacos 里的一个数值，分别观察 RefreshScope Bean 和构造时复制的字段。再确认测试 namespace 的改动不会出现在生产应用日志里。',
    answer:'用 dataId、group、namespace 定位。需要热更新的值每次从可刷新的配置对象读。不要在启动时复制成不可更新的字段。',
    keywords:'Nacos config dataId namespace RefreshScope 配置刷新',
    points:['一份配置由 namespace、group 和 dataId 定位','刷新只影响重新绑定或可刷新作用域的 Bean','构造时复制进普通字段的值不会跟着变'],
    deep:[
      {title:'和环境变量的关系',body:'Nacos 是运行时配置的一种来源，不是把口令写进 Git 的理由。密钥仍由环境或密钥系统注入。仓库里只留没有敏感值的样例。'},
      {title:'灰度',body:'先在单独的 namespace 或 group 验证，再发布到生产数据。直接改生产 dataId，所有正在监听的实例都会收到。'}
    ],
    refs:[['Spring Cloud Alibaba：Nacos 配置','https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-config'],['Spring Cloud：Refresh Scope','https://docs.spring.io/spring-cloud-commons/reference/spring-cloud-commons/application-context-services.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-sentinel-block',
    title:'Sentinel 拒绝的是超限，不是下游已经失败',
    prompt:'接口被 Sentinel 挡住时，应该按下游超时去重试吗？',
    core:'Sentinel 在应用进程内按规则决定是否放行。流控看 QPS 或并发线程数，超了就拒绝后续进入。熔断看响应时间或异常比例，打开后在时间窗口内直接拒绝，避免把显然会失败的流量继续打到下游。拒绝时抛出的是规则拦截，不是下游的超时异常。对拦截异常再立即重试，只会继续消耗配额。规则应放在可推送的位置，例如 Nacos，而不是只写在某一次启动的代码常量里。它保护的是本进程里的这个资源，不能自动保护没有接入的其他服务。',
    why:'把限流当成下游故障去重试，会在已经过载时再叠加请求。',
    example:'下单资源每秒最多 100 个通过。第 101 个得到拦截异常，接口返回 429 或约定的降级结果。不要在 catch 里马上再调用一次下单。',
    task:'把流控阈值调到 1，连续调用两次。记录第二次的异常类型，并确认它没有进入业务方法。再把下游故意改慢，看熔断打开后的请求是否还打到下游。',
    answer:'流控是还没执行就拒绝。熔断是下游已经不健康时停止继续调用。拦截异常返回明确失败，不立即重试。',
    keywords:'Sentinel 流控 熔断 BlockException Spring Cloud Alibaba',
    points:['流控按配额拒绝进入资源的请求','熔断在下游异常或过慢时暂停继续调用','规则拦截不是下游超时，不能立刻重试'],
    deep:[
      {title:'和网关限流的分工',body:'网关限制进入整个系统的流量。Sentinel 限制某一个服务里的某一个资源。两层可以同时存在，但阈值表达的不是同一个容量。'},
      {title:'热点参数',body:'按商品 id 限流时，一个热点 id 不应耗尽其他 id 的配额。这是参数级规则，不是整个接口共用一个计数器就能表达的。'}
    ],
    refs:[['Sentinel：介绍','https://sentinelguard.io/zh-cn/docs/introduction.html'],['Sentinel：流量控制','https://sentinelguard.io/zh-cn/docs/flow-control.html']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'sca-seata-at-boundary',
    title:'Seata AT 只能撤销它记录过的数据库修改',
    prompt:'给下单和发短信都套上全局事务，短信已经发出去，数据库回滚后短信会收回吗？',
    core:'Seata 的 AT 模式解析支持的 SQL，在提交前保存前后镜像到 undo log，并用全局锁避免并发改同一行。全局事务回滚时，用 undo log 把数据库行改回去。这个机制不管数据库以外的副作用。已经发出的短信、已经投递的消息、已经调用的外部支付，不会因为 undo 而消失。那些步骤要使用本地消息、补偿或 Seata 的 TCC、Saga 等明确写出的反向操作。AT 也不是把多个服务提升成串行化隔离。全局事务应短，只包必须一起提交的数据库写入。',
    why:'把 AT 当成所有 RPC 的自动两阶段提交，会在回滚后留下已经发生的外部副作用。',
    example:'扣库存和写订单在各自的数据库分支里，可以评估 AT。发送短信放在全局提交成功之后，用可重试的消息完成，不放进指望自动回滚的分支。',
    task:'设计一笔会写两张库并调用短信网关的下单。标明哪些写入能靠 undo 撤销，哪一步必须改成提交后的补偿。',
    answer:'AT 撤销的是它解析并记录了 undo 的 SQL。外部调用要单独设计补偿。全局事务只包短的数据库写入。',
    keywords:'Seata AT undo log 全局事务 TCC 补偿',
    points:['AT 用 undo log 回滚它接管的 SQL','数据库以外的调用不会被 undo 撤销','全局事务保持短，外部副作用用补偿或提交后的消息'],
    deep:[
      {title:'和其他模式',body:'TCC 要业务自己实现尝试、确认和取消。Saga 按正向和反向步骤编排。AT 省去这些接口，代价是只覆盖它能解析的数据库修改。'},
      {title:'和本地事务',body:'每个分支仍先遵守本地数据库事务。没有本地事务的写入，全局事务无从记录前后镜像。'}
    ],
    refs:[['Seata：AT 模式','https://seata.apache.org/docs/user/mode/at/'],['Seata：事务模式','https://seata.apache.org/docs/overview/what-is-seata/']]
  },
  {
    track:'java', group:'消息队列', id:'mq-pick-workload',
    title:'先定工作负载，再在 Kafka、RabbitMQ、RocketMQ 里选一个',
    prompt:'一个系统里同时装上 Kafka、RabbitMQ 和 RocketMQ，算架构完整吗？',
    core:'三种系统都传消息，但模型不同。Kafka 是按分区保存的日志：吞吐高，分区内有序，消费组用位点重放，适合事件流和可回放的数据。RabbitMQ 把消息发到交换器，再按绑定进队列，单条确认，路由灵活，适合任务分发和中等流量的业务指令。RocketMQ 以主题和队列组织，消费组共同分担队列，支持标签过滤、延迟消息和事务消息，适合 Java 业务里要延迟、要和本地事务衔接的事件。一种工作负载选一种。日志、任务和延迟通知若硬塞进同一个集群，会同时失去重放、路由或延迟能力。选型不替代消费端幂等，三者默认都可能重复投递。',
    why:'按公司名词堆中间件，运维三套集群，业务仍要在每套里补齐本来该由另一种模型提供的能力。',
    example:'用户行为流水用 Kafka，按用户 id 分区。发送邮件这种要单独确认、失败重投的任务用 RabbitMQ。下单后 30 分钟未支付关单，用 RocketMQ 的延迟消息。',
    task:'给流水、发信、延迟关单三件事各写一句不可妥协的需求，然后只选一个产品并说明另两个为什么不合适。',
    answer:'要重放和高吞吐日志用 Kafka。要路由和单条确认的任务用 RabbitMQ。要延迟和事务消息的业务事件用 RocketMQ。不要三套服务于同一种消息。',
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
    why:'把主题当成一条全局有序的管道，并发一提高，订单状态事件就会前后颠倒。',
    example:'创建、支付、关闭三件事使用同一个订单号选择队列。消费时按订单号串行更新状态。另一个“统计”消费组可以独立读取，不影响交易组的位点。',
    task:'同一订单连发三条有序事件，队列数设为 4。一次按轮询发送，一次按订单号固定队列。比较消费顺序。',
    answer:'顺序只在一个队列内成立。相关消息必须固定到该队列。消费组之间互不共享位点。标签只负责过滤。',
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
    why:'只记得队列名，就解释不了同一条消息为何进了两个队列，或为什么发出去后队列仍是空的。',
    example:'订单事件发到订单交换器，路由键是 order.paid。邮件队列绑定 order.*，审计队列绑定 order.#。两边都收到，生产者没有写任何一个队列的名字。',
    task:'建一个 topic 交换器和两个绑定不同的队列。发送 order.paid 和 user.created，记录各自进入哪个队列。再发一个没有绑定能接住的键，确认消息没有静默留下来。',
    answer:'生产者面向交换器和路由键。队列用绑定声明自己要什么。默认交换器只是路由键等于队列名的特例。无法路由的消息要显式退回或进入备用策略。',
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
    why:'只加长 Nginx 的一个数字，会把连不上、读等待和慢 SQL 合成同一种 504。',
    example:'上游端口拒绝连接，应很快触及连接超时。上游接受后 30 秒不写字节，才触及读取超时。池里借不到 JDBC 连接，则是应用自己的超时，Nginx 只是还在等响应。',
    task:'分别制造拒绝连接、接受后不响应、以及应用日志里的慢查询。记录 Nginx 错误和 Java 日志谁先出现。',
    answer:'连接超时和读取间隔超时覆盖的阶段不同。被动失败计数才会暂时跳过上游。应用自己的超时不会被 proxy_read_timeout 代替。',
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
    why:'两层都拒绝，但规则不一致时，排障无法判断是网关挡的还是服务挡的。',
    example:'网关校验令牌并把用户 id 传给订单服务。订单服务按该身份检查订单拥有者。商品详情这种公开读，在网关放行，不在每个服务里复制同一条公开规则。',
    task:'画一次下单请求经过的跳：网关、发现、订单服务、数据库。标明每一跳拒绝请求时的状态码由谁产生。',
    answer:'网关处理边缘的路由、令牌和入口限额。服务处理自己的对象权限和资源限额。发现服务只提供地址。同一件事只由一层负责。',
    keywords:'Spring Cloud Gateway 谓词 过滤器 服务网格 鉴权',
    points:['网关按谓词选路由，并在过滤器里处理边缘逻辑','发现服务提供实例，网关负责把请求代理过去','对象级授权仍在拥有该数据的服务里'],
    deep:[
      {title:'超时',body:'网关到后端的响应超时，和 Nginx、应用自己的超时是第三条时钟。边缘先断开时，后端事务可能仍在进行，所以写接口仍要幂等。'},
      {title:'和 Sentinel 的位置',body:'入口限流保护整个下游不被打满。进程内 Sentinel 保护某一个资源。不要用两个相同的 QPS 数字假装它们在保护同一件事。'}
    ],
    refs:[['Spring Cloud Gateway：工作方式','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway-server-webflux/how-it-works.html'],['Spring Cloud Gateway：路由谓词','https://docs.spring.io/spring-cloud-gateway/reference/spring-cloud-gateway-server-webflux/request-predicates-factories.html']]
  },
  {
    track:'java', group:'版本边界', id:'retired-spring-cloud-netflix',
    title:'Hystrix、Ribbon、Zuul 1 和 javax 前缀已退出当前主线',
    prompt:'示例还在用 @HystrixCommand、Ribbon 和 javax.servlet，能当 Spring Boot 3 的写法吗？',
    core:'Spring Cloud 2020.0 起，发行版移除了 Hystrix、Ribbon 和 Zuul 1 这些 Netflix 模块。进程内限流和熔断用 Sentinel 或 Resilience4j。客户端负载均衡的现行实现是 Spring Cloud LoadBalancer。北向入口用 Spring Cloud Gateway。Spring Boot 3 基于 Jakarta EE，依赖的包名是 jakarta.servlet、jakarta.persistence，不是 javax 下的同名包。MySQL 8 也已经移除查询缓存。旧项目可以留在 Boot 2 维持这些类，新的课程和新建服务按现行组件写。',
    why:'把退出主线的注解写进新服务，依赖解析会失败，或运行的是文档已不再维护的行为。',
    example:'新服务的熔断用 Sentinel 规则。服务名调用走 LoadBalancer 和 Nacos。入口用 Gateway。实体和过滤器用 jakarta 包。',
    task:'在依赖和源码里搜索 Hystrix、Ribbon、Zuul 和 javax.servlet。新建模块中的命中改为现行组件；只在明确的 Boot 2 维护分支里保留旧导入。',
    answer:'新的主线是 LoadBalancer、Gateway、Sentinel 或 Resilience4j，以及 jakarta 包名。Hystrix、Ribbon、Zuul 1 和 javax 前缀属于旧栈。',
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
