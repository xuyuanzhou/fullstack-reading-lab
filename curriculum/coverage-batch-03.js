/* Batch 03: independently written lessons; private source files supplied topic coverage only. */
const COVERAGE_BATCH_03 = [
{
    track:'frontend',
    group:'TypeScript',
    id:'ts-unknown',
    title:'unknown 与 any：先验证再使用',
    prompt:'接口返回值的形状不可信，为什么不直接写成 any？',
    core:'any 会绕过许多静态检查；unknown 可接收任意值，但在读取属性或调用前必须缩小类型。JSON 解析结果即使语法正确，也不代表符合业务对象结构。顺序是：入口收 unknown，先判断非 null 对象，再逐个检查必需字段的类型，通过后才收窄成 User。边界是：any 会让后面的属性访问全部跳过检查，风险从边界扩散到所有调用方。JSON.parse 只保证文本合法，不保证有 id，更不保证 id 是字符串。缺少字段和类型不对都要停在 parseUser 里。调用方拿到的要么是 User，要么是错误，不能是一个还可以点出任意属性的值。不要把未知值传进去。',
    why:'错把接口 JSON 标成 any，字段缺失或类型不对会一直传到调用方，直到运行时才崩。编译器不再提醒。能分开的信号是：入口类型是 unknown，并且在读取属性之前有没有缩小类型。',
    example:'parseUser 收到 {id:1}。检查发现 id 不是字符串，函数返回错误，不构造 User。收到 {id:"u1"} 且其余字段通过后，才返回 User。缺少 id 的 {} 同样在边界失败。',
    task:'把一个返回 unknown 的 parseUser 函数改成安全读取，并测试缺少 id、id 为数字和正确对象三种输入。',
    answer:'三种输入都先做运行时检查，不直接当 User。缺少 id 失败。id 为数字失败。id 是字符串且对象非 null 时，返回明确的 User。失败给出错误，不把 any 继续传给调用方。语法正确的 JSON 不等于字段形状正确。失败要停在入口。',
    keywords:'TypeScript unknown any runtime validation 类型守卫',
    points:['any 如何绕过检查','unknown 的缩小流程','运行时输入验证与静态类型的边界'],
    refs:[['TypeScript：More on Functions','https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown']],
    deep:[
      {
        title:'先缩小再使用',
        body:'unknown 可以接收任意值，但不能读属性或调用。先排除 null，再确认每个字段的类型，收窄之后才能当 User。any 把这一步整个跳过。收窄之前不能访问字段。'
      },
      {
        title:'怎样自己验证',
        body:'用缺少 id、id 为数字、id 为字符串三种输入调用 parseUser。前两种应得到错误且不出现 User。第三种才返回 User。临时改成 any 后，错误输入会静默通过编译。'
      }
    ]
  },
{
    track:'frontend',
    group:'TypeScript',
    id:'ts-narrowing',
    title:'判别联合与穷尽检查',
    prompt:'新增一种状态后，怎样让编译器提醒漏掉的分支？',
    core:'用共同的字面量字段区分联合类型，switch 可按该字段缩小到具体成员。在 default 分支把剩余值赋给 never，新增成员而未处理时会产生类型错误。顺序是：用共同的字面量字段区分联合成员，switch 按这个字段缩小，每个分支只访问该成员有的字段，default 把剩下的值赋给 never。边界是：新增成员而不改 switch 时，never 赋值会失败。若 default 什么都不做，新状态会漏到运行时变成空白界面。ok 分支不能读 message，error 分支不能读 data。缩小发生在判别字段之后，不是因为类型名字不同。新成员必须有分支。',
    why:'错把 switch 写成已经覆盖所有状态，新增 loading 后界面落到空白，编译器却没响。漏分支要到运行时才看见。能分开的信号是：default 里有没有把剩余值赋给 never，以及新增成员后这里是否报错。',
    example:'Result 原来只有 ok 和 error。加入 {kind:"loading"} 后，default 里的值不能赋给 never，编译失败。补上 loading 分支返回加载界面后，检查重新通过。',
    task:'再加入 {kind:"loading"}，观察原有 switch 的穷尽检查，再补上加载界面。',
    answer:'未处理 loading 时，default 中的剩余值不是 never，赋值报错，这就是漏分支的信号。补上 kind 为 loading 的分支并画出加载界面后，剩余值重新变成 never，检查通过。不要用宽泛的 default 把新状态显示成空白。',
    keywords:'TypeScript discriminated union narrowing never exhaustive',
    points:['字面量字段识别联合成员','控制流缩小后的字段访问','never 进行穷尽检查'],
    refs:[['TypeScript：Narrowing','https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking']],
    deep:[
      {
        title:'never 是漏网检查',
        body:'default 里若还能赋给某个具体成员，说明 switch 没有写完。把剩余值赋给 never，新增 kind 时编译器会指出漏掉的分支，而不是让界面落到空白。'
      },
      {
        title:'怎样自己验证',
        body:'在 ok 和 error 之外加 loading，先不补分支，确认 never 赋值报错。补上加载界面后再编译，错误应消失。在 ok 分支里访问 message，也应被类型检查拒绝。'
      }
    ]
  },
{
    track:'frontend',
    group:'TypeScript',
    id:'ts-generics',
    title:'泛型保留输入输出关系',
    prompt:'identity(value:any):any 和 identity<T>(value:T):T 的区别是什么？',
    core:'泛型参数把输入和输出的类型关系保留下来，调用方可得到具体类型；any 则丢掉这层关系。约束 T extends ... 用来表达函数确实需要的能力，而不是把所有值强转为某个类型。顺序是：用类型参数把输入和输出连起来，调用时从实参推断 T，返回值保持 T。边界是：any 切断这根线。约束 T extends 只写函数真正要用的能力，不要为了少写断言把值强转成某个具体类型。空数组使首元素可能缺失，推断结果里要留下 undefined。string[] 进去仍应是 string 出来。若返回值变成 any，说明这条关系已经断了，后面的调用都在没有检查的状态下进行。',
    why:'错把 identity 写成 any 进 any 出，字符串数组取到的首元素就不再是字符串，后面调用字符串方法要靠断言。类型关系在入口被丢掉。能分开的信号是：返回值还能不能点出输入元素才有的方法。',
    example:'first 写成 any 时，first(["ab"]) 的结果是 any，.toUpperCase 不会被检查。改成 function first<T>(items:T[]):T|undefined 后，同一调用的结果是 string|undefined，空数组必须先判断。',
    task:'为读取数组首元素的函数分别写 any 版与泛型版，检查返回值是否还能安全调用字符串方法。',
    answer:'any 版返回 any，字符串方法能写上去，但空数组和数字数组也不会被拦住。泛型版把 string[] 的元素类型留在返回值里，可以在确认不是 undefined 之后调用字符串方法。空数组返回 undefined，这一支要单独处理，不能当成一定有字符串。',
    keywords:'TypeScript generics extends inference 泛型 约束',
    points:['类型参数表达关联','泛型约束表达必需能力','空值与推断结果'],
    refs:[['TypeScript：Generics','https://www.typescriptlang.org/docs/handbook/2/generics.html']],
    deep:[
      {
        title:'参数记住关系',
        body:'泛型不是把值变成某种万能类型。它让返回值跟着输入走。any 则让输入输出都失去具体类型。约束只描述函数体内真正用到的属性，多写的断言会把错误留到运行时。空数组要单独处理。'
      },
      {
        title:'怎样自己验证',
        body:'对 string[] 调用 any 版和泛型版的 first。泛型版在未判断 undefined 时不能调用 toUpperCase。传入空数组，确认返回 undefined，而不是空字符串或 any。'
      }
    ]
  },
{
    track:'frontend',
    group:'TypeScript',
    id:'ts-structural',
    title:'结构类型与多余属性检查',
    prompt:'两个类型名称不同，但字段相同，为何仍可赋值？',
    core:'TypeScript 通常按成员结构比较兼容性，而非只看声明名称。变量拥有额外字段仍可赋给只要求少量字段的目标类型；新鲜对象字面量还会受到额外属性检查。顺序是：赋值时按目标类型要求的成员检查兼容，多余字段不自动使变量不兼容；若传入的是新鲜对象字面量，再做额外属性检查。边界是：类型名字不同但成员够用，仍然可以赋值。把字面量先放进变量会绕过额外属性检查，拼写错误要靠别的约束才能看见。目标要 name，变量有 name 和 age，可以传。字面量把 name 写成 nmae，应在调用处报错，而不是等到运行时才发现没有名字。名字不同但成员够用，仍然可以赋。字面量多出来的错字段才会被额外抓住。',
    why:'错把“字面量报错、变量却能传”当成编译器不稳定，其实是两条不同的检查。变量多出来的字段可以赋给只要求 name 的目标，新鲜字面量拼错字段会更早被指出。能分开的信号是：传入的是变量，还是对象字面量。',
    example:'函数只要 {name:string}。变量 person 带 name 和 age，调用通过。直接写 {name:"a", nmae:"b"} 被额外属性检查拒绝。把这个对象先赋给变量再传，拼写错误就不再在这一层被抓住。',
    task:'分别把变量和对象字面量传给只要求 name 的函数，对比多出 age 与拼错 nmae 的情况。',
    answer:'变量多出 age 仍可传给只要求 name 的函数，因为结构类型只看目标需要的成员在不在。对象字面量多出 nmae 或拼错字段会触发额外属性检查，用来抓住可疑字段。两条路径不矛盾：一个看结构是否够用，一个额外防止字面量写错。两条检查不要混成一句。',
    keywords:'TypeScript structural typing excess property check 结构类型',
    points:['按成员结构判断兼容性','变量额外字段与目标要求','对象字面量的额外属性检查'],
    refs:[['TypeScript：Type Compatibility','https://www.typescriptlang.org/docs/handbook/type-compatibility'],['TypeScript：Object Types','https://www.typescriptlang.org/docs/handbook/2/objects.html#excess-property-checks']],
    deep:[
      {
        title:'结构和新鲜字面量',
        body:'兼容看的是目标要的成员是否都有，不看类型声明的名字。变量上多出来的字段可以存在。只有直接写出的对象字面量会因为未声明的字段被额外检查，这是在抓拼写错误。先看是不是字面量。'
      },
      {
        title:'怎样自己验证',
        body:'写一个只接收 name 的函数。用带 age 的变量调用，应通过。用字面量故意写错字段名，应报错。先把写错的字面量赋给变量再传，观察这一层的额外检查消失。再传一次变量对照。'
      }
    ]
  },
{
    track:'frontend',
    group:'Vue',
    id:'vue-reactivity',
    title:'Vue ref、reactive 与代理身份',
    prompt:'为什么改了原始对象，页面不一定更新？',
    core:'reactive 返回对象的代理；依赖追踪发生在代理的属性读取与写入上。ref 通过 value 持有值，模板里会自动解包。把原始对象和代理混用，或把 reactive 的原始类型属性直接解构，可能失去预期的响应连接。顺序是：reactive 返回代理，读属性时收集依赖，写属性时通知。ref 把值放在 value 上，模板里自动解包。边界是：原始对象和代理不是同一条写入路径，改原始对象不会通知。把 reactive 对象的数字属性解构到本地变量，拿到的是当前值，之后不再连接。替换整个对象时也要确认替换的是代理还是丢掉了代理的原始引用。模板不变时，先断定写的是哪一个引用，再谈 Vue 有没有检测到变化。检测发生在代理的读写上，不发生在原始对象上。',
    why:'错把改了原始对象当成页面会更新，raw.count 加一并不走代理，依赖收集时记下的是另一条路径。界面停在旧数字。能分开的信号是：赋值发生在 reactive 返回的代理上，还是发生在原来的那个对象上。',
    example:'const raw={count:0}; const state=reactive(raw)；修改 state.count 可触发依赖，直接修改 raw.count 不走代理拦截。',
    task:'写一个计数器，分别修改 raw、state 和从 state 解构出的 count，观察模板变化。',
    answer:'改 state.count 会通知依赖，模板更新。改 raw.count 不经过代理，模板不变。从 state 解构出的 count 是当时的数字，再改这个数字也不会更新模板。要保持连接，继续通过 state 访问，或用 toRef、toRefs 取出保持响应的引用。',
    vue:'reactive',
    keywords:'Vue3 ref reactive Proxy 原始对象 解构 响应式',
    points:['ref 的 value 与模板解包','reactive 代理和原对象身份','解构基本类型导致连接丢失'],
    refs:[['Vue：Reactivity Fundamentals','https://vuejs.org/guide/essentials/reactivity-fundamentals.html']],
    deep:[
      {
        title:'写在代理上',
        body:'依赖记的是对代理属性的读取。写入必须打在同一个代理上才会通知。原始对象、解构出来的数字、以及丢掉 .value 的 ref，都接不上这条依赖。先看写入打在哪个对象上。'
      },
      {
        title:'怎样自己验证',
        body:'用同一个 raw 创建 state。分别给 raw.count、state.count 和从 state 解构出的 count 加一，看模板哪一次变化。再用 toRefs 解构后修改，确认模板恢复更新。'
      }
    ]
  },
{
    track:'frontend',
    group:'Vue',
    id:'vue-computed-watch',
    title:'computed 与 watch 的职责',
    prompt:'计算商品总价时应该用 watch 同步另一个状态吗？',
    core:'computed 适合从响应式输入派生值，并按依赖缓存；watch 适合在状态变化时执行副作用，如请求、写存储或与外部系统同步。用 watch 维护本可计算的重复状态，会增加不一致机会。顺序是：能从现有响应式数据算出来的用 computed，依赖变了才重算并缓存；必须请求、写存储或同步外部系统的用 watch，并在依赖再变或组件卸载时清理。边界是：用 watch 维护一份本可计算的 total，会多一次写，也会短暂不一致。computed 里不要发请求。watch 不负责替代派生值。价格或数量一变，总价应马上由计算得到。搜索则要能说出哪一次请求作废，不能把慢响应写进新的关键字下面。',
    why:'错把 watch 同步出一个 total，价格和数量已经变了，total 仍可能停在上一次写入。派生状态变成第二份真相。能分开的信号是：这个值能不能由现有状态算出来，还是必须去碰外部系统。',
    example:'price 为 20、count 为 3 时，computed 的 total 是 60，改 count 为 4 后变为 80，没有单独的 total 状态。搜索词变化时 watch 发请求，旧请求返回后被序号丢弃，不写回新词的结果。',
    task:'将“监听 price 和 count 后写 total”的代码改为 computed，再为异步搜索设计 watch 清理。',
    answer:'总价改为 computed，由 price 和 count 直接算出，不再用 watch 写另一份 total。异步搜索仍用 watch：词变化时发请求，并在清理里取消或忽略过期响应。总价没有副作用，不需要可变状态；请求有副作用，必须处理过期结果。',
    vue:'computed',
    keywords:'Vue computed watch watchEffect cache side effect',
    points:['computed 的依赖缓存','watch 处理外部副作用','避免派生状态重复存储'],
    refs:[['Vue：Computed Properties','https://vuejs.org/guide/essentials/computed.html'],['Vue：Watchers','https://vuejs.org/guide/essentials/watchers.html']],
    deep:[
      {
        title:'派生和副作用',
        body:'computed 没有自己的第二份状态，读的时候按依赖给出结果。watch 在依赖变化后做事，做事可以失败、可以迟到。迟到的请求必须能被丢掉，不能回写成新的界面。'
      },
      {
        title:'怎样自己验证',
        body:'把 watch 写 total 改成 computed，改价格后看总价是否还要等一次赋值。再让搜索请求故意迟到，快速改两次关键字，确认只有最后一次的结果留在界面上。'
      }
    ]
  },
{
    track:'frontend',
    group:'Vue',
    id:'vue-list-key',
    title:'Vue 列表 key 与输入状态',
    prompt:'列表重排后输入值为什么可能留在原位置？',
    core:'Vue 默认可就地修补列表位置；有状态子组件或临时 DOM 状态需要稳定的 key 让节点身份跟随业务项。key 应来自稳定的原始值，不应在每次渲染随机生成。顺序是：有 key 时按 key 对应旧节点和新节点，状态跟着这个身份走；没有稳定 key 时按位置修补。边界是：下标在插入、删除、重排后会指向别的项。随机 key 每次都对不上，节点被销毁重建。key 应来自稳定的原始值，不要在渲染函数里现造。交换两项就足以区分：文字跟着 id，还是留在原来的格子。留在格子上，就是位置被当成了身份。交换顺序就能看见：文字跟着 id，还是留在原来那一格。留在格子上，说明复用的是位置。',
    why:'错把列表下标当成项的身份，重排后输入文字留在原来的格子里，看起来像数据串行。随机 key 则让节点每次重建，输入被清空。能分开的信号是：重排之后文字跟着 id 走，还是跟着位置走。',
    example:'A、B 各有输入，A 里是“甲”。新顺序为 B、A。key 用 item.id 时“甲”仍在 A。key 用下标时“甲”留在第一格，出现在 B 上。key 用每次渲染的随机数时，两格的输入都被清空。随机 key 会清空。',
    task:'分别用稳定 id、数组下标与随机值作为 key 重排两项，记录 DOM 和状态变化。',
    answer:'稳定 id 让输入状态跟着业务项走，A 的字仍在 A。数组下标在重排后仍指向原来的位置，状态留在格子上，于是串到另一项。每次渲染都变的随机 key 使节点被当成新的，DOM 和输入状态都重建。默认的就地修补在没有稳定 key 时按位置复用。',
    vue:'diff',
    keywords:'Vue v-for key state identity list rendering',
    points:['就地修补的默认行为','稳定 key 对应业务身份','下标与随机 key 的风险'],
    refs:[['Vue：List Rendering','https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key']],
    deep:[
      {
        title:'位置不是身份',
        body:'就地修补复用的是这个下标上的节点。业务项已经换到别处，输入状态还在原节点上。稳定 id 让 Vue 把节点和状态一起挪到新位置。随机值则让每次都新建。下标在重排后会指向别的项。'
      },
      {
        title:'怎样自己验证',
        body:'两项各带输入框，在第一项打字后交换顺序。分别用 id、下标和随机数当 key，记录文字留在哪一项、DOM 是否被重建。只有 id 应让文字跟着原来的项。三种 key 各做一次。'
      }
    ]
  },
{
    track:'frontend',
    group:'Vue',
    id:'vue-nexttick',
    title:'Vue 更新批次与 nextTick',
    prompt:'修改 ref 后立刻读取 DOM，为什么可能还是旧内容？',
    core:'Vue 缓冲并批量应用 DOM 更新；修改响应式值后同步代码继续执行时，DOM 更新可能尚未完成。nextTick 等待下一次 DOM 更新刷新完成，适合需要在更新后测量或操作节点的场景。顺序是：修改响应式数据只更新状态，Vue 把 DOM 更新攒到这一轮刷新；同步代码继续走时文档可能还是旧的；nextTick 等到这次刷新完成后再继续。边界是：状态已变不等于节点已变。在刷新前测量会得到旧尺寸。setTimeout 的延迟和刷新时机没有对应关系，不能拿来代替 nextTick。先改列表，再在同步代码和 nextTick 里各量一次高度。两次不同，就说明不能在赋值后面立刻读 DOM。',
    why:'错把 ref 已经改完当成 DOM 已经是新内容，紧接着读 textContent 仍是旧文字，高度也是旧的。状态和文档不在同一步更新。能分开的信号是：读 DOM 发生在赋值的同一段同步代码里，还是发生在 nextTick 之后。',
    example:'count 为 1，点击里执行 count.value++ 后立刻读文本，得到“1”。await nextTick() 后再读，得到“2”。用固定的短 setTimeout 有时读到新值，有时仍是旧值。',
    task:'按钮点击时更新列表并测量高度，分别在同步代码和 nextTick 后记录结果。',
    answer:'同步代码里测量，高度和文本仍是更新前的。nextTick 之后 DOM 已按这批状态刷新，再测量才是新高度。不要用固定 setTimeout 猜刷新时机，它可能早于刷新，也可能多等一截。依赖新 DOM 的焦点、滚动和尺寸都放在 nextTick 之后。',
    vue:'scheduler',
    keywords:'Vue nextTick DOM flush batch 更新时序',
    points:['状态修改与 DOM 刷新分离','批量更新减少重复工作','nextTick 后执行 DOM 测量'],
    refs:[['Vue：nextTick','https://vuejs.org/api/general.html#nexttick']],
    deep:[
      {
        title:'状态先于文档',
        body:'赋值立刻改变的是 ref 或代理里的值。DOM 文本要等刷新。刷新是一批一起做的，不是每改一个字段就重绘一次。要读新节点，就得排到这批刷新之后。赋值改的是状态，不是节点文本。'
      },
      {
        title:'怎样自己验证',
        body:'点击时增加列表项，分别在同步代码和 await nextTick() 之后打印容器高度。同步读数应仍是旧高度。再把 nextTick 换成一个很短的 setTimeout，多次点击，观察读数并不稳定。'
      }
    ]
  },
{
    track:'frontend',
    group:'工程实践',
    id:'build-code-splitting',
    title:'动态导入与代码分割',
    prompt:'把所有路由代码都放在首屏 bundle 会发生什么？',
    core:'动态 import 可让构建工具把部分模块拆成按需加载的代码块。它降低初始下载与解析成本的前提是边界设计合理；过多碎片也会增加请求、缓存和加载失败处理复杂度。顺序是：先量首屏下载和解析成本，再把低频大模块放到动态 import 后面，然后量进入该路由时的额外请求和失败情况。边界是：拆分只是把成本挪到后面，不让成本消失。过多小块会增加请求和缓存复杂度。当前页必需的代码留在首屏，否则第一次绘制会等一个本可避免的往返。用网络面板看进入路由前后多了哪些 chunk。只比较打包文件个数，看不出用户是更快还是在导航时被挡住。当前页必需的代码留在首屏，其余大块等到进入路由再取。',
    why:'错把所有路由打进首屏当成更简单所以更快，首屏要下载和解析用户这次用不到的图表和管理页。拆得过碎又会在切换时多一串请求。能分开的信号是：这块代码是当前页必需的，还是进入某条路由才需要。',
    example:'首屏只加载首页 chunk。进入报表路由时网络面板才出现图表 chunk。把图表静态 import 进首页后，首次加载的字节上升，报表路由不再单独请求这块。首页文档里不应提前出现图表包的请求。再对比一次。',
    task:'在构建结果中找出首屏 chunk 与按需 chunk，记录进入相关路由前后网络请求。',
    answer:'把体积大、当前页用不到的模块改成动态 import，首屏 chunk 不再包含它们。进入对应路由时再请求，并测量切换时间。加载失败要有重试或提示，不能是一块空白。碎片太多时把同一路由的依赖收成一块，而不是每个函数一个请求。失败时要能重试，不能停在白屏。',
    keywords:'webpack dynamic import code splitting chunk lazy loading',
    points:['动态 import 创建加载边界','首屏和后续路由的成本转移','chunk 加载失败的恢复'],
    refs:[['webpack：Code Splitting','https://webpack.js.org/guides/code-splitting/']],
    deep:[
      {
        title:'成本被挪走',
        body:'动态 import 让构建工具另开一个加载边界。首屏变小的同时，进入功能时要再付一次加载。失败、重复请求和过于破碎的包都是这次搬家的代价，要一起看。看的是用户何时付这笔加载成本。'
      },
      {
        title:'怎样自己验证',
        body:'构建后区分首屏 chunk 和按需 chunk。刷新首页，确认图表包不在这次下载里。点进报表路由，确认这时才请求它。再把动态 import 改回静态 import，对比首屏字节。'
      }
    ]
  },
{
    track:'frontend',
    group:'工程实践',
    id:'build-cache',
    title:'构建缓存与依赖层次',
    prompt:'只改一个业务组件，为什么整个构建仍可能很慢？',
    core:'构建工具依据输入和配置判断哪些结果可复用。模块依赖变化、工具配置、锁文件或缓存键改变，都可能让较大范围的产物失效；不能只看修改的文件数。顺序是：构建用输入、配置和依赖图计算哪些产物还能复用，改动沿依赖向外传，缓存键变了则整块失效。边界是：文件数少不等于工作量少。锁文件、编译选项和工具版本都在缓存键里。本地有缓存而 CI 没有时，两边的耗时不能直接对比。三次构建挨着做：什么都不改、只改组件、只升级依赖。耗时和命中日志对不上“改了几个文件”时，就去查缓存键而不是再猜。锁文件和工具版本进了缓存键时，业务文件一个没改也会大范围重来。对比要在同一台机器、同一缓存目录上做。',
    why:'错把只改一个组件当成构建只会重做那一个文件，依赖图上的上游和缓存键一变，整片产物都会失效。CI 时间因此不稳定，能分开的信号是：变的是业务文件，还是锁文件、工具版本或缓存键。文件数说明不了范围。',
    example:'无改动再构建，命中缓存，耗时很短。只改一个组件的文案，增量耗时上升但范围有限。升级一个依赖后，缓存键变化，同一环境下变为接近全量的耗时。记下三次的耗时和命中条数，升级依赖那一次应明显更接近全量。写下来。',
    task:'在相同环境下依次进行无改动、单组件改动、依赖升级，比较命中缓存和耗时。',
    answer:'无改动应命中缓存。单组件改动只让依赖它的那部分失效。依赖升级或工具配置变化会扩大失效范围，甚至接近全量。记录每次的输入、工具版本和缓存状态，才能指出是哪一个变化把重建范围拉大，而不是只看改了几个文件。三次结果分别对应命中、局部失效和缓存键变化。没有这三行记录，就还不知道是谁把构建拉长。',
    keywords:'webpack build cache module graph dependency CI 构建缓存',
    points:['模块依赖图传播改动','缓存键与构建环境','增量与全量构建对比'],
    refs:[['webpack：Build Performance','https://webpack.js.org/guides/build-performance/'],['webpack：Cache','https://webpack.js.org/configuration/cache/']],
    deep:[
      {
        title:'失效沿图传播',
        body:'一个模块变了，依赖它的模块都要重新考虑。缓存还看工具版本和配置。这些键变了，业务文件一个没改也会全量重来。增量快是因为键没变，不是因为项目小。键变了，增量就不成立。'
      },
      {
        title:'怎样自己验证',
        body:'在同一台机器上连续做无改动构建、单组件改动和依赖升级，记下命中缓存的数量和耗时。依赖升级那一次若接近全量，就对照是锁文件还是工具版本进了缓存键。三次耗时写在一起再下结论。'
      }
    ]
  },
{
    track:'frontend',
    group:'浏览器',
    id:'html-form-semantics',
    title:'表单语义与可访问输入',
    prompt:'输入框旁边放一段文字，就等于有 label 吗？',
    core:'label 与表单控件建立程序可识别的关联；fieldset 和 legend 为一组控件提供名称。原生 button 和表单提交语义还包含键盘与辅助技术行为，不能只靠视觉位置和 click 回调替代。顺序是：先用 label 或包裹把名字绑到控件上，再用 fieldset 和 legend 给一组控件起名，最后把错误信息关联到那个输入。边界是：视觉上摆在旁边不等于程序能认出标签。div 加点击代替不了 button 的提交和键盘行为。占位符不是标签，它在输入后会消失。用键盘走一遍登录：Tab 应进入每个框，读屏应说出名字。说不出名字的那个框，就是还没有关联上 label。',
    why:'错把输入框旁边的一段文字当成已经有了 label，读屏报不出这个框的名字，点击文字也不能聚焦。视觉上像有标签，程序上没有关联。能分开的信号是：label 的 for 是否等于输入的 id，或者输入是否包在 label 里面。',
    example:'没有 for 和 id 时，点击“邮箱”二字，焦点不进入输入框，读屏只报一个编辑框。加上 label for="email" 和 input id="email" 后，点击文字即聚焦，读屏报出“邮箱”。',
    task:'用键盘和读屏检查一个没有 label 的登录表单，再添加 label 与错误提示关联。',
    answer:'每个控件用 label 关联，让它有可访问名称。一组相关控件用 fieldset 和 legend 标出组名。错误信息用 aria-describedby 或等价关系和对应输入连上。提交用原生 button，保留键盘提交。旁边的普通文字若没有这层关联，就不算标签。',
    keywords:'HTML form label fieldset legend accessibility semantic',
    points:['label 与控件显式关联','fieldset/legend 组织输入组','原生提交与键盘语义'],
    refs:[['MDN：How to structure a web form','https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form']],
    deep:[
      {
        title:'名字要写进关联',
        body:'可访问名称来自 label 的关联，不来自旁边碰巧摆着的文字。for 和 id 必须一致。一组单选或相关字段再用 legend 说明这组是什么，不要只靠视觉分组。'
      },
      {
        title:'怎样自己验证',
        body:'先用一个没有 label 的登录表单，Tab 并打开读屏，确认名字缺失、点击旁边文字不能聚焦。加上 for 和 id、以及错误信息和输入的关联后，再走一遍，名字和错误都应被读出来。'
      }
    ]
  },
{
    track:'frontend',
    group:'浏览器',
    id:'image-loading',
    title:'图片懒加载与布局稳定',
    prompt:'给首屏大图也加 loading="lazy" 就一定更快吗？',
    core:'loading="lazy" 让浏览器延后加载距视口较远的图片；首屏关键图片延后可能损害显示时机。设置 width、height 或稳定宽高比可在图片到达前预留空间，减少布局位移。顺序是：先分清图片是否接近首屏，再决定是否懒加载，并用明确尺寸预留空间，最后用瀑布和布局位移核对。边界是：lazy 推迟的是请求，不是把解码变便宜。首屏图被推迟会直接拖后内容出现。没有尺寸时，后到的图片把已经排好的版面顶开。横幅和缩略图不要用同一句策略。一个要早，一个可以晚，但两者都要在到达前占住高度。首屏图提前请求，屏外图可以懒加载，两者都用宽高占住盒子，避免到达时把版面顶开。',
    why:'错把所有图片都加上 loading="lazy" 当成一定更快，首屏大图被推迟，用户先看到空白。下面的列表图懒加载才减少初次传输。能分开的信号是：这张图在不在首屏，以及它到达前有没有留出稳定尺寸。',
    example:'首屏横幅也设 lazy 时，网络瀑布里它排在折叠线以下的图之后，首次绘制更晚。列表缩略图设 lazy 后，初次只请求视口内的几张。去掉宽高后，图片到达时页面往下跳。横幅应出现在最先的那一批请求里，缩略图可以晚。',
    task:'比较首屏图与列表图启用懒加载前后的网络瀑布和布局位移。',
    answer:'首屏关键图不要懒加载，让它尽早请求。离视口远的列表图可以懒加载。两种都写上 width 和 height 或稳定宽高比，在图片到达前占住空间，避免布局位移。以网络瀑布和布局位移记录为准，不凭“加了 lazy”下结论。两条策略分开写，再用瀑布和位移核对。',
    keywords:'HTML img loading lazy CLS width height 图片懒加载',
    points:['首屏图与非首屏图的加载策略','width/height 预留布局空间','网络瀑布和布局位移验证'],
    refs:[['MDN：img element','https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img']],
    deep:[
      {
        title:'早加载和预留空间',
        body:'懒加载适合折叠线以下的图。首屏图推迟等于把最大的内容也推迟。宽高或宽高比让浏览器先留出盒子，图片随后填进去，页面不再跟着跳动。lazy 推迟请求，不预留空间。宽高才负责不跳动。'
      },
      {
        title:'怎样自己验证',
        body:'对首屏横幅和长列表缩略图分别开关 lazy，看网络瀑布里谁先请求、首次看到横幅的时间有没有变晚。去掉 width 和 height 后再加载，观察图片到达时布局是否下移。'
      }
    ]
  },
{
    track:'java',
    group:'框架',
    id:'mybatis-parameters',
    title:'MyBatis 参数绑定与 SQL 拼接',
    prompt:'把用户输入放进 ${name}，为什么不能当成普通参数绑定？',
    core:'MyBatis 的 #{...} 会形成 PreparedStatement 参数；${...} 是文本替换，适用于受控的 SQL 片段，但不应直接接收不可信值。列名、排序方向等不能用普通值占位时，应通过严格白名单映射。顺序是：先分清这个位置是值还是 SQL 标识符；值用 #{}，标识符先做白名单映射再拼接。边界是：${} 是文本替换，预编译保护不到它。排序、表名、列名都是常见的拼接点。枚举之外的输入应拒绝，而不是转义后碰运气。用一条正常字段和一条带分号的字符串分别打 ORDER BY。白名单之前，第二条会改变语句；白名单之后，它进不了 SQL。枚举之外拒绝。',
    why:'错把 ${sort} 当成和 #{id} 一样的参数绑定，排序字段上的恶意字符串会拼进 SQL。注入不在 WHERE 的值里，也照样发生。能分开的信号是：这段文字是预编译参数，还是拼进语句的原始片段。',
    example:'按 id 查询使用 #{id}，传入 id 为 1 OR 1=1 时它仍是一个参数值，不会改变语句结构。ORDER BY ${sort} 传入 name;drop 时，这段文本直接进了 SQL。改成只允许枚举里的列名后，恶意字符串被拒绝。',
    task:'检查一个 ORDER BY ${sort} 接口，分别提交正常字段和恶意字符串，改成白名单。',
    answer:'值用 #{}，交给 PreparedStatement，不改变 SQL 结构。列名和排序方向不能用普通占位符时，只能从后端白名单映射成固定的列名再拼进去。用户提交的字符串无论放在 WHERE 还是 ORDER BY，都不能直接进入 ${}。',
    keywords:'MyBatis #{} ${} PreparedStatement SQL injection 参数绑定',
    points:['#{} 的预编译参数语义','${} 文本替换的注入边界','动态排序字段白名单'],
    refs:[['MyBatis：Mapper XML Files','https://mybatis.org/mybatis-3/sqlmap-xml.html#Parameters']],
    deep:[
      {
        title:'值和标识符',
        body:'#{} 把输入当成数据。${} 把输入当成 SQL 文本。数据里的引号可以被参数化吃掉，拼进 ORDER BY 的文本不能。列名只能从固定映射里选。看最终 SQL 有没有被拼进新的语句。'
      },
      {
        title:'怎样自己验证',
        body:'对 ORDER BY ${sort} 先提交合法列名，再提交带分号或注释的字符串，看语句是否被改写。改成枚举到固定列名的映射后，第二条应被拒绝，SQL 里只出现映射中的列。'
      }
    ]
  },
{
    track:'java',
    group:'框架',
    id:'spring-external-config',
    title:'Spring Boot 配置优先级与环境',
    prompt:'为什么打包时的 application.yml 值被启动参数覆盖？',
    core:'Spring Boot 可以从配置文件、环境变量、系统属性和命令行等来源读取配置，并按定义的优先级合并。最终值取决于当前激活的 profile、配置位置与来源顺序；不能只看仓库中的一个文件。顺序是：收集配置文件、环境变量、系统属性和命令行，按定义的优先级合并，再看当前 profile 启用了哪一份。边界是：仓库里的文件只是来源之一。命令行在默认顺序里可以盖过打包文件。同名键在多处出现时，以合并后的最终值为准，并要能指出它来自哪一层。线上端口和本地文件不一致时，先打印实际值和来源。猜“配置没加载”之前，先看有没有更高优先级的来源写过同一个键。先找更高优先级的来源。',
    why:'错把仓库里的 application.yml 当成进程真正用的值，启动参数或环境变量已经把它盖掉。本机和线上端口不一致，文件却没改。能分开的信号是：最终值来自哪一个属性源，而不是哪份文件里写过它。',
    example:'打包的 application.yml 里 server.port 是 8080，启动参数是 --server.port=9090。进程实际监听 9090。只读仓库文件会以为还是 8080。来源要一起打印。',
    task:'给同一属性配置基础文件、profile 文件与启动参数，记录实际值和来源。',
    answer:'先确认激活了哪个 profile、配置文件从哪几个位置加载。同一属性在基础文件、profile 文件和启动参数里都有时，按 Spring Boot 的来源顺序看谁覆盖谁。记录实际生效的值和它的来源，而不是只打开仓库里的那一个 yml。以合并结果为准。',
    keywords:'Spring Boot external configuration profile property source 优先级',
    points:['配置来源及覆盖顺序','profile 对配置的影响','运行时追踪最终属性值'],
    refs:[['Spring Boot：Externalized Configuration','https://docs.spring.io/spring-boot/reference/features/external-config.html']],
    deep:[
      {
        title:'来源有顺序',
        body:'同一个键可以来自文件、环境变量和命令行。后盖过前的规则是固定的，不是谁离代码近谁赢。profile 还会换一组文件。不看激活的 profile，就会读错那一份。'
      },
      {
        title:'怎样自己验证',
        body:'给同一属性在基础文件、profile 文件和启动参数里写三个不同的值。启动后打印实际值。逐个去掉更高优先级的来源，确认值按预期落回下一层。去掉启动参数后，值应落回文件。'
      }
    ]
  },
{
    track:'java',
    group:'工程实践',
    id:'docker-multistage',
    title:'Docker 多阶段构建与镜像内容',
    prompt:'为什么不应把编译工具和临时源码都带进最终运行镜像？',
    core:'多阶段 Dockerfile 可在构建阶段安装工具并生成产物，再只把运行需要的文件复制进最终阶段。镜像内容、构建缓存与运行权限应分别检查；多阶段构建不是自动的安全保证。顺序是：构建阶段安装工具并产出产物，最终阶段从干净的运行时镜像开始，只复制要运行的文件。边界是：多阶段不是安全开关。复制了整个构建目录，源码和工具仍会进去。缓存可能让你以为改了源码却在跑旧产物。运行用户若仍是 root，体积变小也不等于风险变小。对比两个镜像的文件清单和大小，再分别启动。清单里不应再出现编译器和源码树，启动结果应与单阶段一致。体积变小只说明少复制了一些层，不说明权限和产物来源已经正确。',
    why:'错把编译用的 JDK 和源码留在最终镜像里当成无所谓，运行镜像因此更大，也多出不需要的工具。出问题时分不清哪一层是构建、哪一层是运行。能分开的信号是：最终镜像的文件清单里还有没有编译器和源码树。',
    example:'单阶段镜像里能看到编译工具和源码目录，体积包含它们。多阶段只把打好的 JAR 复制进运行时基础镜像后，清单里不再有编译器，镜像变小，用同一命令仍能启动。在最终镜像里查找编译器和源码目录，应找不到，应用仍能启动。',
    task:'对比单阶段与多阶段镜像的文件清单、大小和启动结果。',
    answer:'最终阶段只保留运行需要的 JAR 和资源，不复制编译工具和源码。同时核对基础镜像、运行用户权限，以及 JAR 确实来自构建阶段而不是上下文里的旧文件。多阶段缩小了内容，但不会自动保证权限和来源正确。还要核对运行用户不是多余的 root，以及 JAR 来自构建阶段而不是上下文里的旧文件。',
    keywords:'Docker multi-stage build image cache runtime 镜像',
    points:['构建阶段与运行阶段分离','复制产物而非全部源码','镜像体积与内容核验'],
    refs:[['Docker：Multi-stage builds','https://docs.docker.com/build/building/multi-stage/']],
    deep:[
      {
        title:'运行阶段是另一份镜像',
        body:'构建阶段的层不会自动进入最终镜像，除非你把它复制过去。最终镜像从运行时基础镜像重新开始。该留的是产物和运行依赖，不是工具链。最终阶段从运行时镜像重新开始。不要把构建层算进运行镜像。'
      },
      {
        title:'怎样自己验证',
        body:'分别构建单阶段和多阶段镜像，比较体积，并在最终镜像里查找编译器和源码路径。确认应用仍能启动。再看进程用户是不是运行所需的非特权用户，而不是默认 root。清单和启动都要看。'
      }
    ]
  },
{
    track:'java',
    group:'工程实践',
    id:'k8s-probes',
    title:'Kubernetes 三类探针的职责',
    prompt:'服务正在初始化但尚不能接流量，应该让 liveness 失败吗？',
    core:'startup 探针给慢启动过程留出时间；readiness 表示是否可接收流量；liveness 判断容器是否需要重启。把“下游暂时不可用”直接当成 liveness 失败，可能造成反复重启。顺序是：慢启动期间靠 startup 给时间，启动成功后用 readiness 决定是否接流量，用 liveness 决定是否重启。边界是：下游暂时不可用不是进程死亡。把它写成 liveness 失败会造成重启循环。readiness 失败只是不接新流量，容器继续活着。探针路径本身若依赖那个不稳定的下游，三种探针会一起误判。先问这个失败要不要杀掉进程。不要，就不是 liveness。只是先别把请求送进来，那是 readiness。还在启动，那是 startup。',
    why:'错把还在初始化或下游短暂失败写成 liveness 失败，kubelet 会反复重启一个本可以继续等的进程。重启把预热清掉，故障被放大。能分开的信号是：失败的是进程已经卡死，还是只是还不能接流量。',
    example:'应用预热索引需要 90 秒。这段时间 startup 未通过，容器不被 liveness 杀掉。预热完成后 readiness 通过，才开始接流量。数据库抖动几秒时只有 readiness 失败，进程不重启。',
    task:'为一个启动需 90 秒、数据库偶尔抖动的服务设计三类探针和失败阈值。',
    answer:'启动的 90 秒交给 startup，在它成功之前 liveness 不应因为还没就绪而重启容器。readiness 表示现在能不能接流量，数据库短暂不可用时让它失败、从服务端点摘掉即可。liveness 只在进程卡死、无法自己恢复时失败。阈值要允许那种短暂抖动，而不是一次失败就杀进程。',
    keywords:'Kubernetes readiness liveness startup probe 健康检查',
    points:['startup 保护慢启动','readiness 决定接流量','liveness 决定是否重启'],
    refs:[['Kubernetes：Probes','https://kubernetes.io/docs/concepts/workloads/pods/probes/']],
    deep:[
      {
        title:'三种失败三种动作',
        body:'startup 失败表示还在允许的启动窗口里。readiness 失败表示从负载均衡拿掉。liveness 失败表示杀掉并拉起新进程。把同一条下游检查同时绑到后两者上，抖动就会变成重启。'
      },
      {
        title:'怎样自己验证',
        body:'让应用先睡过启动阈值，确认 startup 未通过时容器还在。启动后再让数据库拒绝几秒，确认 Pod 只是未就绪而不重启。最后让进程真的死锁，确认这时 liveness 才重启它。'
      }
    ]
  },
{
    track:'java',
    group:'消息队列',
    id:'rabbit-ack',
    title:'RabbitMQ 消费确认与重复消息',
    prompt:'消费者处理完成前就 ack，进程崩溃会发生什么？',
    core:'消费确认告诉 Broker 该投递可以视为处理完成；过早 ack 可能丢失尚未持久化的业务结果。手动 ack、拒绝重排和预取数量需要与业务事务和幂等处理配合。顺序是：处理业务并提交，成功后再手动 ack。失败则拒绝或重排，并设重试上限和死信。边界是：ack 表示 Broker 可以忘掉这次投递，不表示数据库已经提交。自动 ack 把这个点提前到收到时。重投是预期路径，所以消费者必须幂等。预取太大时，未确认的消息会堆在一个慢消费者上。画出写库前崩溃和写库后崩溃。前一种靠重投补写，后一种靠业务键避免写两次。ack 的位置决定走哪一种。重投是正常路径，插入必须认得已经写过的键。',
    why:'错把收到消息就 ack 当成已经可靠，进程在写库前崩溃，这单不会再被投递。业务结果丢了，队列却认为已经完成，能分开的信号是：ack 发生在数据库提交之前，还是之后。队列已经忘掉的消息不会再来。',
    example:'写订单成功后、ack 之前断线。消息被重新投递。消费者按订单号找到已提交的行，不再插入第二张，然后再次 ack。若在写库前就 ack，断线后消息不再回来，订单也不存在。订单表里应只有一行，余额也不要加两次。',
    task:'模拟写库前崩溃和写库后 ack 前崩溃，画出两条恢复路径。',
    answer:'写库前崩溃：还没 ack，消息会重投，恢复时把订单写上。写库后、ack 前崩溃：订单已在，重投必须按业务键认出并跳过插入，再 ack。过早 ack 则两条路都不会重来。还要限制重试次数、把失败消息送进死信，并按消费者处理速度设置预取，避免一次拿太多。',
    keywords:'RabbitMQ consumer acknowledgement prefetch duplicate 消费确认',
    points:['自动确认与手动确认','业务成功后再 ack','重投与消费幂等'],
    refs:[['RabbitMQ：Consumer Acknowledgements','https://www.rabbitmq.com/docs/confirms'],['RabbitMQ：Reliability Guide','https://www.rabbitmq.com/docs/reliability']],
    deep:[
      {
        title:'ack 晚于提交',
        body:'手动确认要放在事务成功之后。提前确认，崩溃就没有重投。确认晚了会重投，所以插入必须能认出已经写过的订单。自动确认适合丢了也没关系的消息，不适合订单。确认点放在提交之后。'
      },
      {
        title:'怎样自己验证',
        body:'在写库前杀掉消费者，消息应重新出现并最终有且仅有一张订单。在写库提交后、ack 前杀掉，重投不应再插入。把 ack 挪到写库之前再杀一次，订单应丢失且队列里不再有这封消息。'
      }
    ]
  },
{
    track:'java',
    group:'消息队列',
    id:'kafka-offset',
    title:'Kafka position 与 committed offset',
    prompt:'poll 已经拿到消息，为什么重启后还会读到它？',
    core:'消费者当前位置会随 poll 推进，已提交位置才是故障重启时恢复的依据。若先处理后提交，崩溃窗口可导致重复；若先提交后处理，则可能漏掉尚未完成的业务工作。顺序是：poll 推进的是当前消费位置，提交之后重启才从新位置恢复。先处理后提交，崩溃窗口是重复；先提交后处理，崩溃窗口是丢失。边界是：自动提交按时间提交，和业务是否完成无关。同一分区内的顺序也不能代替幂等，因为重试和再均衡都会把已经见过的记录再送一次。在 poll、写库、提交这三个缝里分别假设崩溃。只有业务提交和 offset 提交的先后，能决定是重复还是丢失。重启之后只认已经提交的位置，内存里 poll 到的数字会一起消失。',
    why:'错把 poll 到的位置当成重启后的起点，提交前崩溃会把同一条再读出来。若先提交再处理，崩溃则会把还没做完的业务跳过。能分开的信号是：恢复用的是已提交位置，还是内存里刚 poll 到的位置。',
    example:'poll 得到 offset 10 的订单事件。写库成功，提交下一位置 11 之前崩溃。重启后再 poll，仍从已提交的位置读到 10。若在写库前就提交了 11，重启后 10 不会再出现，订单也没写成。',
    task:'画出“poll→写数据库→提交 offset”的三个步骤，在每个间隙注入崩溃。',
    answer:'poll 之后、写库之前崩溃：还没提交，重启会再读到这批消息，业务应补做。写库成功、提交之前崩溃：业务已在，再读到时按业务键跳过，不能再下一单。提交之后崩溃：从下一位置继续，这条不会因为这次崩溃重来。offset 记的是读取进度，去重仍要靠业务键。',
    keywords:'Kafka consumer position committed offset auto commit 重复消费',
    points:['poll 后的当前位置','故障恢复使用已提交位置','提交时序与重复/丢失窗口'],
    refs:[['Kafka 4.2：KafkaConsumer','https://kafka.apache.org/42/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html']],
    deep:[
      {
        title:'两个位置',
        body:'当前位置跟着 poll 走，进程一停就丢。已提交位置才写在外部。重启只认后者。把两者当成同一个数，就会在自动提交的时间点上要么丢业务，要么重复执行。两个数字不要写成一个。'
      },
      {
        title:'怎样自己验证',
        body:'处理 offset 10 并在提交前停掉进程，重启后应再读到 10。先提交再写库，在写库前停掉，重启后不应再读到 10，库里也没有这张订单。用业务键后再读到 10，订单仍只能有一张。'
      }
    ]
  },
{
    track:'java',
    group:'数据库',
    id:'mysql-explain-analyze',
    title:'EXPLAIN 估计与 EXPLAIN ANALYZE 实测',
    prompt:'执行计划估计只扫描 10 行，实际却扫描很多，怎样确认？',
    core:'EXPLAIN 展示优化器预计的访问路径；EXPLAIN ANALYZE 真正执行可支持的语句并报告迭代器的实际行数与时间。估计与实际差距可指向统计信息、数据分布或谓词问题。顺序是：EXPLAIN 看优化器打算怎么走、估计多少行；EXPLAIN ANALYZE 真正执行并报告实际行数和时间；两者差得远就检查统计和谓词。边界是：ANALYZE 会执行语句，更新类语句不能拿去对生产随便跑。测试库行数少时，估计和实际都会偏乐观。用了索引只说明走了这条路径，不说明行数够少。把估计行数、实际行数和耗时写在一起。只剩“type 是 range”时，还不能说这条查询在生产上够快。',
    why:'错把 EXPLAIN 里估计的 10 行当成真的只扫了 10 行，生产数据下实际扫描会大得多，查询仍慢。估计被当成测量。能分开的信号是：数字来自优化器估计，还是来自语句真正执行之后的计数。',
    example:'测试库里范围条件估计扫描 10 行，EXPLAIN 显示用了索引。换到分布更宽的数据上，EXPLAIN ANALYZE 报出的实际行数远大于 10，耗时随之上升。只看“用了索引”发现不了这次差距。再换一份分布不同的数据。',
    task:'对同一查询记录估计行数、实际行数和耗时，再改变数据分布比较。',
    answer:'在安全环境执行 EXPLAIN ANALYZE，它会真正跑语句并给出实际行数和耗时。和 EXPLAIN 的估计对比，差距大就去查统计信息、数据分布和谓词是否把索引用窄了。然后再决定改索引还是改写法。估计很小不能代替这次实测。估计很小也不能代替实测行数。',
    keywords:'MySQL EXPLAIN ANALYZE estimated actual rows SQL 优化',
    points:['EXPLAIN 是优化器估计','ANALYZE 会实际执行','估计与实际行数差异'],
    refs:[['MySQL 8.4：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html']],
    deep:[
      {
        title:'估计要和实际对一下',
        body:'EXPLAIN 不跑语句，行数是成本模型算的。ANALYZE 跑了才有实际迭代次数。统计过期或测试数据和生产不像时，两边会差一个数量级。索引名出现在计划里也不能省略这次对比。'
      },
      {
        title:'怎样自己验证',
        body:'对同一条 SELECT 先 EXPLAIN 再在副本上 EXPLAIN ANALYZE，记下估计行数和实际行数。然后加进一批选择性不同的数据再跑。实际行数明显变大时，耗时也应一起看，而不是只看有没有用到索引。'
      }
    ]
  },
{
    track:'java',
    group:'缓存',
    id:'redis-transaction',
    title:'Redis MULTI/EXEC 与 WATCH',
    prompt:'MULTI 里的每条命令会立刻执行吗？',
    core:'MULTI 后的命令先入队，EXEC 才按顺序执行；其他客户端不会插入到该批命令之间。WATCH 提供乐观条件检查。它与关系数据库事务的回滚语义不同，不能把失败命令想成自动撤销前面已执行命令。顺序是：WATCH 感兴趣的键，读取并计算，MULTI 把写命令入队，EXEC 时检查 WATCH 并顺序执行。边界是：入队期间命令还没生效。EXEC 开始后这一批不会被别的命令插入，但失败的命令不会把本批已经执行的命令回滚掉。它不是数据库那种全部撤销的事务。乐观检查失败就整批不执行，这和执行到一半失败不是一回事。两个客户端交错修改同一键时，后 EXEC 且被 WATCH 到的那一个应失败。没有 WATCH 时，后执行的队列会盖掉前一个写入。',
    why:'错把 MULTI 里的每条命令当成已经执行，中间别的客户端仍能改这个键，直到 EXEC。也错把失败当成会回滚前面的命令，Redis 这段原子和数据库事务不是同一套。能分开的信号是：命令是进了队列，还是已经作用到键上。',
    example:'客户端甲 WATCH 库存后读到 5。客户端乙把库存改成 4。甲再 MULTI，把算出的 6 入队并 EXEC。EXEC 失败，库存仍是 4。若甲没 WATCH，EXEC 会在队列执行时把库存写成 6，盖掉乙。',
    task:'两个客户端同时 WATCH 同一键，交错修改并比较 EXEC 结果。',
    answer:'MULTI 之后命令先入队，EXEC 才按顺序执行，别的客户端插不进这一批的中间。WATCH 发现键在 EXEC 前被改过，这次 EXEC 失败，需要重读再试。某一条命令失败不会自动撤销同一批里已经执行的前面几条。跨 Redis 和数据库的扣减还要另有设计，这段队列包不住数据库。',
    keywords:'Redis MULTI EXEC WATCH transaction CAS 乐观锁',
    points:['MULTI 入队与 EXEC 执行','WATCH 的乐观冲突检测','与数据库回滚语义的差异'],
    refs:[['Redis：Transactions','https://redis.io/docs/latest/develop/using-commands/transactions/']],
    deep:[
      {
        title:'入队、执行、乐观检查',
        body:'MULTI 到 EXEC 之间是排队。EXEC 才改数据，并且这一段不被别人插入。WATCH 在 EXEC 时发现键变了就放弃整批。批里某一条的运行时错误不会按数据库的方式撤销已经执行的兄弟命令。'
      },
      {
        title:'怎样自己验证',
        body:'两个客户端 WATCH 同一库存键。让乙先改并完成，再让甲 EXEC。甲应失败，值保持乙写下的结果。去掉 WATCH 再交错一次，确认后执行的写入盖掉前者。不要用这次实验代替跨库事务。'
      }
    ]
  },
{
    track:'java',
    group:'搜索',
    id:'elastic-analysis',
    title:'全文检索的分词与映射',
    prompt:'文本里明明有单词，为什么搜索时匹配不到？',
    core:'全文检索先把 text 字段和查询文本经过分析器转换为 token，再匹配索引项。分词、大小写、词形与同义词规则不一致会改变结果；keyword 字段则适合精确值等用途。顺序是：文本进入 text 字段时被分析成 token，查询文本再被分析一次，两边的 token 相同才匹配。边界是：分析器、大小写、词形和同义词只要有一边不同，原文里有这个词也会落空。keyword 不做这套分词，适合精确值。改分析器不会自动改写已经进索引的 token。先把两边的 token 打出来再改查询。没看见 token 之前，不要先判断是数据没写进去。没重建索引时，旧 token 还在，查询改了分析器也不会马上对上。',
    why:'错把文档里明明有这个词当成查询一定能命中，索引时和查询时的分析器不一致，词被切成了不同的 token。搜的是原文，对上的是另一套词条。能分开的信号是：分析 API 对同一句话给出的 token 是否一致。',
    example:'产品名“无线鼠标”用一种分析器索引成两个 token，查询却用另一种分析器变成别的 token。搜索这四个字没有命中。两边改成同一分析器后命中。精确过滤则走 keyword 子字段，不再做这套分词。先对照 token。',
    task:'用分析 API 比较同一句话在两种分析器下的 token，再做查询。',
    answer:'先看字段 mapping 是 text 还是 keyword，再用分析 API 对同一段文字看索引时和查询时的 token。不一致就调整分析器，使两边产生能对上的词条。精确过滤和排序用 keyword，不要拿分词字段去做。改了分析规则后，已写入的文档要按重建索引的成本重新处理才会生效。',
    keywords:'Elasticsearch text keyword analyzer tokenization mapping 搜索',
    points:['text 与 keyword 的用途','索引时和查询时分词','分析器不一致导致漏匹配'],
    refs:[['Elastic：Text analysis','https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-analysis.html'],['Elastic：Mapping','https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-mapper.html']],
    deep:[
      {
        title:'匹配的是 token',
        body:'倒排索引里是分析之后的词条，不是原始句子。索引和查询各走一次分析。任何一边多切、少切或换了同义词，精确的原文搜索都会失败。keyword 子字段保留另一套精确用途。'
      },
      {
        title:'怎样自己验证',
        body:'用分析 API 对同一句话跑索引分析器和查询分析器，对照 token。故意让两边不同，确认搜索落空。改成一致后再搜，确认命中。再对 keyword 子字段做精确过滤，确认它不依赖这套分词。'
      }
    ]
  },
{
    track:'java',
    group:'算法',
    id:'java-binary-search',
    title:'二分查找的不变量与边界',
    prompt:'有序数组查找不到目标时，为什么返回位置仍有用？',
    core:'二分查找依靠区间不变量，每次排除不可能包含目标的一半区间。Java Arrays.binarySearch 要求输入按相同规则排序；未找到时返回负值编码插入点，而非固定 -1。顺序是：确认数组按同一比较规则排好，用区间不变量丢掉不可能的一半，空了还没相等就把插入点编码成负数。边界是：没排序时结果无意义。负数不是统一的失败码，-(插入点+1) 才能还原位置。重复元素不要假设返回最左边。溢出的中点写法和开闭区间必须跟不变量一致，不能混用。用空数组、只有一个元素、目标在两端、目标缺失、目标重复各测一次。每一种都要能说出下标或插入点，而不是只说找到了没有。端点要单独测。',
    why:'错把找不到就返回 -1 当成二分的全部结果，插入点信息被丢掉，调用方只能再扫一遍。也错把没排序的数组拿去二分，返回值不再表示任何位置。能分开的信号是：返回值是非负的下标，还是负数编码的插入点。',
    example:'有序数组 [1,3,5] 查找 4。插入点是下标 2。Arrays.binarySearch 返回 -(2+1)，也就是 -3。查找 3 返回下标 1。对未排序的 [3,1,5] 查找，返回值不能再当成这个插入点契约。',
    task:'分别写闭区间与半开区间实现，测试空数组、首尾、缺失值和重复值。',
    answer:'先写清区间是闭区间还是半开，每次循环都保持“目标只可能在区间内”。空数组、目标小于首元素、大于尾元素都要停在约定的边界。找不到时按插入点解释负数，而不是一律当成 -1。有重复值时，这个实现不保证返回第一次出现的位置，需要的话要另写边界。开闭区间不要混用。',
    keywords:'Java Arrays.binarySearch sorted insertion point 二分查找',
    points:['有序输入与相同比较规则','区间不变量及边界收缩','负返回值编码插入点'],
    refs:[['Oracle：Arrays.binarySearch','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Arrays.html#binarySearch(int%5B%5D,int)']],
    deep:[
      {
        title:'不变量比中点重要',
        body:'每次只保留可能含有目标的那段区间。中点公式只是在这段里取样。开闭区间混用会漏掉端点或死循环。返回负数时先还原插入点，再决定插在哪里。中点只是在当前区间里取样，不变量才决定哪一半留下。'
      },
      {
        title:'怎样自己验证',
        body:'用 [1,3,5] 查找 4，确认返回值是 -3，插入点是 2。再测空数组、目标等于首尾、以及重复的 3。打乱顺序后再查，确认不能再按这个返回值解释位置。打乱后再查一次。'
      }
    ]
  },
{
    track:'java',
    group:'算法',
    id:'java-priority-queue',
    title:'优先队列与堆顶语义',
    prompt:'把元素放入 PriorityQueue 后，迭代顺序一定从小到大吗？',
    core:'Java PriorityQueue 基于堆，队首是按自然顺序或 Comparator 定义的最小元素；其迭代器不保证排序遍历。要按优先级依次取出，应重复 poll。顺序是：插入按堆调整，队首始终是比较规则下的最小元素；要按优先级处理就反复 poll。边界是：迭代器、toArray 都不承诺排序后的顺序。poll 会删除元素。比较器必须和业务优先级一致，并且满足比较契约，否则堆的调整本身就不可靠。需要第 K 大而不是全部排序时，可以用有限大小的堆，但取出时仍然要 poll。同一批数字分别打印迭代顺序和 poll 顺序。只有后者可以交给调度。若两者碰巧相同，再多插几个数，迭代顺序仍不能当结论。',
    why:'错把 PriorityQueue 的迭代顺序当成从小到大，for-each 打出来的序列被当成排序结果，调度顺序就错了。堆只保证队首是当前最小。能分开的信号是：取值用的是 poll，还是迭代器。',
    example:'依次 offer 3、1、2。peek 返回 1。for-each 可能不是 1、2、3。连续 poll 三次得到 1、2、3，队列随之变空。再插入 5 和 0，迭代顺序仍然不能当成从小到大，poll 则先得到 0。',
    task:'插入一批乱序数字，对比 iterator 输出和连续 poll 输出。',
    answer:'迭代器的输出不能当排序结果，它不保证按优先级遍历。需要有序取出时连续 poll，每次得到当前最小，队列里的元素被移除。还要保留原队列时先复制再 poll。Comparator 决定谁算最小，比较器写反，队首就变成业务上最不该先处理的那一个。',
    keywords:'Java PriorityQueue heap peek poll iterator Top K 优先队列',
    points:['堆顶是比较规则的最小项','poll 与迭代器顺序不同','Comparator 决定业务优先级'],
    refs:[['Oracle：PriorityQueue','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/PriorityQueue.html']],
    deep:[
      {
        title:'队首才有序',
        body:'堆保证的是顶端，不是遍历顺序。peek 看当前最小且不删除，poll 取出并让下一个最小浮上来。迭代器走的是内部数组，中间节点不必比后面的小。只保证顶端，不保证遍历。'
      },
      {
        title:'怎样自己验证',
        body:'插入 3、1、2 和更多乱序数字。打印一次迭代器，再在副本上连续 poll。确认 peek 始终是比较规则下的最小项，而迭代器的第一项之外没有排序保证。把比较器反过来，队首应变成另一端。'
      }
    ]
  },
{
    track:'java',
    group:'Java 基础',
    id:'java-optional',
    title:'Optional 的惰性默认值（JDK 8）',
    prompt:'值已经存在，orElse(expensive()) 还会调用 expensive 吗？',
    core:'Optional（JDK 8 起）里，orElse 的参数在调用前就求值，哪怕 Optional 有值；orElseGet 接收 Supplier，只在缺值时调用。Optional 旨在明确返回值可能缺失，不应靠 get() 把空值风险换成另一种异常。顺序是：先看 Optional 里有没有值；orElse 在这一步之前就已经把参数算出来了；orElseGet 把计算包进 Supplier，缺值时才调用。边界是：默认值若会访问数据库或改状态，必须用 orElseGet。有值时多跑一次不是优化问题，而是错误的副作用。get 在空值上抛异常，只是把缺失换成了另一条失败路径。给 expensive 加计数器。有值走 orElse，计数应增加；有值走 orElseGet，计数应不变。空值两种都应增加。',
    why:'错把 orElse 的参数当成缺值时才计算，值已经存在时 expensive 仍会先执行，多打一次数据库或带上副作用。默认值的成本发生在不需要它的时候。能分开的信号是：传入的是已经算好的结果，还是一个 Supplier。',
    example:'Optional.of(1).orElse(expensive()) 仍把计数器加一。Optional.of(1).orElseGet(() -> expensive()) 计数器不变。Optional.empty() 时两种都会调用，计数器都加一。',
    task:'给 expensive() 加计数器，分别测有值和空值时的 orElse、orElseGet。',
    answer:'有值时，orElse 的参数在调用前已经求值，expensive 仍运行。orElseGet 只在缺值时调用 Supplier，有值时不运行。空 Optional 两种都会取默认值。不要用 get 把缺失换成另一种异常，缺值应在这条分支上显式处理。',
    keywords:'Java Optional orElse orElseGet lazy default 缺值',
    points:['orElse 参数立即求值','orElseGet 延迟调用 Supplier','缺值分支的业务处理'],
    refs:[['Oracle：Optional','https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/Optional.html']],
    deep:[
      {
        title:'参数先求值',
        body:'Java 在进入 orElse 之前就计算那个参数。Optional 里有没有值，都来不及阻止这次调用。orElseGet 收到的是函数，调用与否由 Optional 决定。有副作用的默认值只能走后者。'
      },
      {
        title:'怎样自己验证',
        body:'让 expensive 每次把计数器加一。对有值的 Optional 分别调用 orElse(expensive()) 和 orElseGet。只有前者应增加计数。再对 empty 调用两种，计数都应增加。确认没有用 get 把空值变成异常。'
      }
    ]
  }
];

for (const {points,refs,...lesson} of COVERAGE_BATCH_03) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
