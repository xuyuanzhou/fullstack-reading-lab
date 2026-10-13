/* CSS/JS protocols, algorithms, JPA paging, ES aggs, OAuth2, CSP, MSW, SLO. */
const COVERAGE_CORE_16 = [
  {
    track:'frontend', group:'CSS 与布局', id:'css-container-query',
    title:'容器查询按组件自己的宽度换布局，不是只看视口',
    prompt:'卡片在侧栏里变窄了，为什么媒体查询还按整页宽度给宽屏样式？',
    promptAnswer:'两处都用媒体查询时，主栏和侧栏的卡片跟着视口一起变，窄侧栏里也会横排。改成容器查询后，宽主栏里的卡片横排，窄于阈值的侧栏仍上下排。',
    core:'@media 看的是视口。卡片嵌在窄侧栏里时，页面仍可能很宽，媒体查询不会改卡片内部。容器查询先给祖先设容器类型，再用 @container 按这个容器的宽度改子项。组件在主栏和侧栏各出现一次时，可以各走一套布局。没有容器祖先时，查询对不上。容器查询解决的是组件所在的容器，不是用户屏幕尺寸。落地顺序是：先把这块区域上的祖先标成容器，再让后代按这个容器的 inline 宽度写条件，宽度跨过阈值才换子项布局。同一张卡片放进宽主栏和窄侧栏时，两处宽度不同，规则各自匹配。边界是：查询改的是后代，改不了容器自己，也看不到视口；没有容器祖先时条件对不上，卡片保持默认排法。整页按屏幕断开时，仍用媒体查询。',
    why:'误以为宽度断点只看整页视口就够了。侧栏里的窄卡片仍会拿到宽屏的横排，文字被挤出卡片。区分信号是同一张卡片在宽主栏和窄侧栏是否各走一套布局，整页明明很宽时，窄侧栏里的卡片仍会被排成横排。',
    example:'卡片根上 container-type: inline-size。内部 @container (min-width: 280px) 把图和字排成一行。侧栏窄于 280px 时仍上下排。',
    task:'同一卡片组件放进宽主栏和窄侧栏。分别用媒体查询和容器查询，对比两处布局。',
    answer:'两处都用媒体查询时，主栏和侧栏的卡片跟着视口一起变，窄侧栏里也会横排。改成容器查询后，宽主栏里的卡片横排，窄于阈值的侧栏仍上下排。可复用卡片要看所在容器的宽度。媒体查询的两处布局会一起变；容器查询只让跨过容器宽度阈值的那一张卡片换排法。没有容器祖先时，后一种条件对不上。',
    deep:[
      {title:'条件读的是容器宽度',body:'媒体查询在视口宽度上判断，侧栏变窄不会单独触发它。容器查询要先有一个容器祖先，子项再按这个祖先的宽度选规则。没有这样的祖先时，条件没有宽度可读，布局保持默认，不会偷偷改用视口。'},
      {title:'怎样自己验证',body:'把同一张卡片放进宽主栏和窄侧栏。先只写媒体查询，看两处是否一起变成横排；再改成容器查询，看窄侧栏是否仍保持上下排列，宽主栏是否单独横排。没有容器祖先时，两处都应保持默认排法。'},
    ],
    keywords:'CSS container query @container container-type 媒体查询',
    points:['媒体查询看视口，不看组件所在的容器','容器查询按最近容器的宽度改子布局','没有容器祖先时，容器查询不会生效'],
    refs:[['MDN：Container queries','https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries'],['MDN：@container','https://developer.mozilla.org/en-US/docs/Web/CSS/@container']]
  },
  {
    track:'frontend', group:'CSS 与布局', id:'css-has-parent',
    title:':has() 让父级按后代有没有某元素换样子',
    prompt:'表单里出现错误提示时，为什么以前必须靠 JS 给外层加 class？',
    promptAnswer:'article:has(.error) 在错误节点出现时给卡片换边框，节点移除后样式回到原样。',
    core:':has() 是父级选择器：外层在后代满足条件时匹配。例如表单 :has(.error) 可以改边框，不必用脚本给父节点加状态类。它仍是选择器，specificity 按参数里的选择器计算，写太宽会让大片 DOM 失效后重算。不是所有旧浏览器都有；关键路径要看支持度。它不能代替无障碍：错误仍要和输入用 aria 关联。',
    why:'误以为父级变样必须由脚本同步 class。错误提示出现或消失时，外层边框容易漏改，重构再丢一层。区分信号是选择器能否直接按后代里有没有错误来匹配父级，错误节点刚挂上或刚卸下时，外层边框最容易漏改。',
    example:'卡片写 article:has(.error) 时边框变红。错误节点一出现，父级立刻匹配，不必在脚本里给 article 加上 is-invalid。输入合法、错误节点移除后，红框一起消失。父级选择器上不必再写一行 classList 的添加或删除。',
    task:'写一个 :has(.error) 的卡片样式。再对比用 JS 加 class 的版本，列出 :has 省掉的那次状态同步。',
    answer:'article:has(.error) 在错误节点出现时给卡片换边框，节点移除后样式回到原样。脚本版必须在错误挂上和卸下时各改一次父级 class，这一次同步可以省掉。选择器不要写得过宽，错误仍要有可访问名称。颜色不能单独充当错误说明，读屏仍要能读到错误文本。',
    deep:[
      {title:'匹配发生在后代变化时',body:'错误节点进入或离开子树时，:has 的父级选择器重新匹配，边框可以跟着变。脚本版要自己在这两次时刻改 class，漏一次就和真实状态不一致。写得过宽的 :has 会让大片子树在失效后重算。'},
      {title:'怎样自己验证',body:'写好卡片的 :has(.error)，打开再关闭错误提示，看边框是否跟着出现和消失。再列出脚本版必须加上和清除的那次 class，确认样式版没有这两行赋值。过宽的选择器不要用来代替这次对比。'},
    ],
    keywords:'CSS :has 父选择器 specificity 表单校验',
    points:[':has 让祖先按后代条件匹配','选择器过宽会扩大失效范围','视觉状态不能代替可访问的错误关联'],
    refs:[['MDN：:has()','https://developer.mozilla.org/en-US/docs/Web/CSS/:has'],['Selectores Level 4：:has','https://www.w3.org/TR/selectors-4/#relational']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-iteration-protocol',
    title:'for-of 走的是可迭代协议，不是下标从 0 数到 length',
    prompt:'为什么有的对象能 for-of，有的却报不是 iterable？',
    promptAnswer:'能 for-of 的对象要实现迭代器方法。普通对象默认不是 iterable。',
    core:'可迭代对象要实现 @@iterator 方法，返回一个带 next() 的迭代器。for-of、展开语法、Array.from 都走这套协议。Array 和 Map 自带。普通对象没有默认迭代器，不能 for-of 自己的键，除非写了方法或用 Object.keys。生成器函数返回的就是迭代器。不要用 for-in 去遍历数组下标当协议。',
    why:'误以为有 length 就能用 for-of 从头数到尾。普通对象和类数组会在循环开始时抛出不可迭代。区分信号是对象有没有返回迭代器的方法，而不是有没有下标或长度，循环还没开始取元素，就会先因为缺少迭代器而抛错。',
    example:'范围对象的迭代器方法按起点到终点依次 next。for-of 会先要一个新迭代器再走完。展开同一对象会再要一个迭代器，从头得到同样的序列，而不是接着上次剩下的 next。若复用同一个迭代器，第二次展开只会得到剩余的数。',
    task:'给一个范围对象实现 [Symbol.iterator]。用 for-of 和展开各消费一次，观察 next 是否共享同一迭代器。',
    answer:'范围对象实现迭代器方法后，for-of 和展开都会重新要一个迭代器，因此各消费一次都能走完整个范围。若把同一次迭代器交给第二个消费者，第二次从剩下的位置继续。普通对象默认没有这个方法。for-in 遍历下标并不是这套协议。生成器和 Map、Array 已经实现了迭代器方法。',
    deep:[
      {title:'每次消费都重新要迭代器',body:'for-of、展开和 Array.from 都是先调用迭代器方法，再不断 next。普通对象没有这个方法。生成器函数的返回值本身就是迭代器。一次拿到的迭代器被消费到结束之后，不会自动回到起点。'},
      {title:'生成器',body:'function* 用 yield 写这种状态机，调用本身不跑完，见 js-generator-yield-pause。不要把 * 当成异步。'},
      {title:'怎样自己验证',body:'给范围对象写上迭代器方法，用 for-of 和展开各走一遍，两次都应从起点走完。再手动保存一个迭代器，连续交给两段循环，第二段应接着上次的 next，而不是从头。'},
    ],
    keywords:'JavaScript iterable iterator Symbol.iterator for-of',
    points:['可迭代对象提供 @@iterator','for-of 和展开走同一套协议','普通对象默认不可 for-of'],
    refs:[['MDN：迭代协议','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols'],['MDN：for...of','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-weakmap-lifetime',
    title:'WeakMap 的键随对象一起被回收，不能枚举',
    prompt:'把 DOM 节点当 Map 的键缓存数据，节点删了为什么内存还在？',
    promptAnswer:'Map 强引用键会挡住回收。DOM 节点旁路缓存用 WeakMap。',
    core:'Map 强引用键，对象即使离开 DOM，Map 还握着它，回收不了。WeakMap 的键是弱引用：对象别处都不可达时，这条记录可以消失。不能遍历 WeakMap，也不能拿键列表，所以不能当普通字典来枚举。值仍是强引用；若值又指回键，要自己避免环。WeakSet 同理只弱持有对象。不是加密或隐藏数据的手段。使用顺序是：以节点为键写入附加数据，别处仍可持有该节点；当节点从文档和其余变量都不可达，弱引用不阻止回收，记录可以消失。边界是：手里还握着键时 get 仍然成功；值若反向指回节点，要自己拆掉强引用。键必须是对象。它不能列出存活的键，也不能当作加密或隐藏存储。',
    why:'误以为节点离开文档后，用它做键的缓存会自动消失。全局 Map 仍握着节点，堆快照里对象还在。区分信号是键被强引用还是可以随对象一起回收，以及能不能列出全部键，节点离开文档之后，强引用的键仍会把它留在堆上。',
    example:'extra.set(node, {opened:true}) 之后，只要还拿着 node 就能 get 到这份数据。把节点移出文档并丢掉所有变量后，不能再列出这条记录。换成 Map 时，键仍被握着，对象留在堆里。',
    task:'分别用 Map 和 WeakMap 以对象为键。放开对象引用后，对照能否 get 到，以及能否列出所有键。',
    answer:'Map 在放开其它变量后仍能列出键，对象也因此留着，get 得到原值。WeakMap 列不出键。键还在手里时 get 仍成功；键从各处都不可达之后，不能再拿它去 get，这条记录可以被回收。节点缓存用 WeakMap。普通字典仍然用 Map。WeakMap 也不能当作加密存储。',
    deep:[
      {title:'回收要等键真的不可达',body:'WeakMap 不增加键的可达性，但值是强引用。手里还留着节点，记录就不会消失。值里如果又存回这个节点，等于另做了一条强引用，要自己断开。不能用它来枚举当前缓存了哪些节点，也不能拿它当隐藏存储。'},
      {title:'怎样自己验证',body:'同一对象分别作 Map 和 WeakMap 的键。列出全部键只对 Map 成功。丢掉对象的其它引用后，Map 仍能从键列表里 get 到原值；WeakMap 没有列表，也不能再凭空把那个键找回来。'},
    ],
    keywords:'WeakMap 弱引用 垃圾回收 Map DOM 泄漏',
    points:['Map 强引用键，可能挡住回收','WeakMap 的键可随对象一起消失','WeakMap 不可遍历，不能当普通字典'],
    refs:[['MDN：WeakMap','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap'],['MDN：WeakSet','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet']]
  },
  {
    track:'java', group:'算法', id:'algo-sliding-window',
    title:'连续一段的最值或计数，用窗口两端移动，不要每次重扫',
    prompt:'每次求最近 k 个数的和，为什么从下标 0 再加一遍会超时？',
    promptAnswer:'固定窗口靠加减进出元素更新，不要每个位置从头加一遍。',
    core:'窗口表示当前关心的连续区间。右端纳入新元素，左端丢掉过期元素，用变量或双端队列维护和、计数或单调最值。区间长度固定时，每次 O(1) 更新。不要对每个右端再从左边 for 一遍。窗口不适合“任意子序列、不要求连续”的题，那是另一类选或不选。计算顺序是：右端先纳入新元素，更新和、计数或单调队列中的最值，再从左端丢掉过期元素。固定长度时先加满第一个窗口，之后每步加新数、减离开的数，答案只在窗口已经合法时读取。边界是：左端不能越过右端；只适用于连续下标，不连续的子序列不能套用；丢掉过期下标后，队列仍要保持单调。答案只在区间长度已经满足题意、并且左端没有越过右端时读取一次。',
    why:'误以为每个右端都要从左边重新加一遍才算正确。长度为 k 的区间一多，加法次数随数据上涨，随即超时。区分信号是区间连续时，能否只在右端进入、左端离开时更新，每一步只加减刚进出窗口的那一个数。',
    example:'数组 [1,2,3,4]，窗口长度为 3。先得到 6，右端纳入 4、左端丢掉 1，下一步是 9。双重循环对每个右端都重加三个数，窗口每步只做一次加和一次减。窗口长度不合法时不要读取结果，左端也不能越过右端。',
    task:'写最近 3 个的和。对比双重循环和窗口移动的计算次数。',
    answer:'最近 3 个数先加出第一个窗口，之后每步加新数、减离开的数。[1,2,3,4] 得到 6，再得到 9。双重循环每个位置都重加 3 次，窗口每步只更新两次。数组变长后，重扫的计算次数明显更多。不连续的挑选不能套这个窗口。固定长度为 3 时，每步是常数次加减。',
    deep:[
      {title:'每步只改进入和离开的元素',body:'窗口始终是一段连续下标。右端前进时加上新元素，左端前进时撤掉过期元素，区间和不用从头算。最值可以用单调队列，仍然是在两端维护。不连续地挑选元素，要换成别的做法，不能沿用这段窗口。'},
      {title:'怎样自己验证',body:'用最近 3 个数，记下双重循环和窗口各自的加法次数。把数组加长再数一次。重扫的次数应明显上涨，窗口仍接近每个元素只进入一次、离开一次。窗口每步应仍接近一次加和一次减。'},
    ],
    keywords:'滑动窗口 双端队列 连续子数组',
    points:['窗口表示一段连续区间','右进左出维护和或最值','不连续的子序列不能套窗口'],
    refs:[['Deque','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Deque.html'],['ArrayDeque','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html']]
  },
  {
    track:'java', group:'算法', id:'algo-topo-kahn',
    title:'有向图要排先后时，先把入度为 0 的点拿掉',
    prompt:'课程必须先修完 A 才能修 B，怎样排出一种合法顺序，又怎样发现有环？',
    core:'拓扑序是有向无环图上的先后。Kahn：统计入度，把入度为 0 的放进队列，拿出来后把它指出去的边删掉，邻居入度减一。能拿出的点数等于全部点，就有一种合法顺序；少了说明有环，不存在拓扑序。DFS 染色也能判环，但队列法更直观对应“当前没有未完成前置的任务”。有环时不要输出半截顺序当成功。执行顺序是：先统计每个点的入度，把零放进队列，取出时删掉它指出的边，邻居减到零再入队，直到队列空。取出个数等于点数才是一种拓扑序。边界是：有环时队列会提前空，缺掉的点不能凑成合法顺序，半截结果不能当成功；同时为零的点之间没有强制先后，合法顺序可以不只一种。先修课没有完成时，后继不能提前出队。',
    why:'误以为随便深度优先走一遍就能排出先后。图里有环时会漏掉点，半截顺序仍被当成成功。区分信号是取出的点数是否等于全部点数，少了就是有环，有环时随便走的深度优先仍可能走出一条看起来已经完整的路径。',
    example:'边为 A 到 B、A 到 C、B 到 D 时，可以取出 A、B、C、D 四个点。再加一条 D 回到 A 之后，入度再也减不干净，队列空时结果只有三个点，应报有环。A、C、B、D 也是合法顺序，但带环时连四个点都取不齐。',
    task:'用入度数组实现 Kahn。给一组带环边，确认输出长度小于点数。',
    answer:'入度为 0 的点出队，邻居减到 0 再入队。无环时取出的长度等于点数，得到一种合法顺序。加上回头边后，队列提前空，输出长度小于点数，应判断为有环，不能把半截顺序当成功。同时入度为 0 的点可以有多种合法顺序，但有环时不要输出半截，缺掉的点就说明有环。',
    deep:[
      {title:'入度为零表示前置已经完成',body:'点进队列时，指向它的边都已经处理完。取出后减少后继的入度，新的零入度点才能开始。有环时总有一批点互相等待，入度降不到零，队列会在拿齐全部点之前空掉。半截名单不能交给调用方当成功。'},
      {title:'怎样自己验证',body:'先对无环的先修关系跑一遍，确认取出个数等于课程数。再加上一条回到已修课程的边，看输出长度是否小于点数，并因此判为有环，而不是输出半截顺序。无环样例的长度必须先等于点数。'},
    ],
    keywords:'拓扑排序 Kahn 入度 有向无环图 环',
    points:['拓扑序只存在于有向无环图','Kahn 用入度为 0 的队列推进','拿不齐全部点就说明有环'],
    refs:[['Topological sorting','https://en.wikipedia.org/wiki/Topological_sorting'],['ArrayDeque 作队列','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayDeque.html']]
  },
  {
    track:'java', group:'算法', id:'algo-stable-sort',
    title:'对象排序稳定，基本类型排序不稳定，相等元素会不会换位要看清楚',
    prompt:'按分数排序后再按姓名排，为什么第一次的相对顺序有时还在、有时乱了？',
    promptAnswer:'稳定排序保住相等元素的相对顺序。分次排多关键字时，只有稳定排序才能从次要关键字排起。',
    core:'稳定排序保证：比较结果相等的元素，排序后相对位置不变。Java 的 Arrays.sort / List.sort 对对象使用稳定算法；对 int[] 等基本类型数组用的是不稳定的双轴快排，相等值可能换位。要按多关键字排，应一次比较器写全，或对对象做多次稳定排序且先排次要关键字。不要假设 int[] 排序能保留原下标顺序。',
    why:'误以为排序之后，相等元素原来的相对顺序总会留下。先按姓名再按分数，若第二次排序不稳定，姓名的相对次序会被打乱。区分信号是被排序的是对象，还是基本类型数组，第二次若不稳定，相等分数上的姓名次序会被换掉。',
    example:'两名分数同为 90 的学生，原来下标是 0 然后 2。对象列表排序后，这两名仍保持 0 在 2 之前。对 int 数组做排序时，两个 90 的原下标可能对调。比较器若同时看分数和姓名，就不必依赖第二次排序稳定。',
    task:'对含重复数字的 int[] 和 Integer[] 分别排序，标记原来的下标，看重复值的相对顺序还在不在。',
    answer:'Integer 数组或对象列表排序后，重复值仍保持原来的相对下标。int 数组排序后，相等值的原下标可能对调。多个关键字应写进同一次比较；若分成几次排，只有稳定排序才能从次要关键字排起并保住前一次顺序。不要假设 int 数组能保留原来的下标次序。',
    deep:[
      {title:'稳定性只约束比较结果相等的项',body:'比较器给出不相等时，顺序由比较结果决定，和稳不稳定无关。只有分数相同的学生，才需要问原来的姓名次序还在不在。对象排序承诺留下这次序，基本类型数组不承诺，相等值可能换位。'},
      {title:'怎样自己验证',body:'给重复数字标上原来的下标，分别排序 int 数组和 Integer 数组。相等值的下标次序应只在对象排序里保持。再改成一个比较器同时写上分数和姓名，一次排完。相等值才比较原下标，不相等的顺序由比较器决定。'},
    ],
    keywords:'稳定排序 TimSort 双轴快排 Arrays.sort Comparator',
    points:['稳定排序保留相等元素的原相对位置','对象 sort 稳定，int[] 等不稳定','多关键字优先写在一个比较器里'],
    refs:[['Arrays.sort 对象','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html#sort(java.lang.Object%5B%5D)'],['List.sort','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html#sort(java.util.Comparator)']]
  },
  {
    track:'java', group:'JPA', id:'jpa-page-vs-slice',
    title:'Page 会再查一遍总数，只要下一页有没有时用 Slice',
    prompt:'列表只要“还有没有下一页”，为什么每次都 COUNT(*) 一遍？',
    promptAnswer:'Page 会多一次 COUNT。只要“还有没有下一页”用 Slice；要总页码才值得付那次计数。',
    core:'Page 同时要这一页的数据和总条数，通常多一条 COUNT 查询。总条数随过滤条件变，大表上 COUNT 可能比取 20 行还贵。Slice / Limit 只要这一页，再多取 1 行就能判断有没有下一页，不做总数。要显示“第 x / y 页”才需要 Page。深度翻页还是不要 OFFSET，见 keyset 那一课。',
    why:'误以为分页接口总要带回总条数。只要加载更多的列表，每一页仍多一次计数查询，大表上比取数据还贵。区分信号是界面出不出总页码：不出就不必为总数再付一次查询，大表上的计数常常比取二十行数据还要贵。',
    example:'同一条件查第 1 页、每页 20 行。返回 Page 时，日志里除了取数据，还有一条 COUNT。返回 Slice 时只取 21 行来判断有没有下一页，没有总数查询。无限滚动的界面上没有总页码，因此这页不需要 COUNT。',
    task:'同一个查询分别返回 Page 和 Slice。看日志里有没有 COUNT。写出界面上是否真的需要总数。',
    answer:'返回 Page 时，日志里除取本页数据外还有一条 COUNT。返回 Slice 时没有这条总数查询，只多取一行判断下一页。界面若只是加载更多、不显示总页码，就不需要总数，应使用 Slice。要显示第几页共几页时才值得为 Page 付出那次计数。',
    deep:[
      {title:'总条数是另一条查询',body:'Page 要回答共有多少条，通常再发一条 COUNT，过滤条件必须和列表一致。Slice 只要这一页，多取一行就能知道有没有下一页。深度翻页时 OFFSET 仍然贵，那是另一件事，不会因为改用 Slice 就消失。'},
      {title:'怎样自己验证',body:'同一个条件分别请求 Page 和 Slice，在 SQL 日志里找有没有 COUNT。再看界面是否真的画出了总页码。没有总页码时，日志里仍出现 COUNT，就把返回类型换成 Slice。'},
    ],
    keywords:'Spring Data Page Slice COUNT 分页',
    points:['Page 通常额外查总条数','Slice 只取本页，用多取一行判断下一页','界面不展示总页数就不要付 COUNT 的成本'],
    refs:[['Spring Data：Page','https://docs.spring.io/spring-data/commons/reference/repositories/core-concepts.html#repositories.core-concepts.page'],['Spring Data：Limiting query results','https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods.html#repositories.limit-query-result']]
  },
  {
    track:'java', group:'JPA', id:'jpa-modifying-clear',
    title:'@Modifying 的批量改写不会自动更新内存里的实体',
    prompt:'用 @Query 更新状态后，为什么同一个持久化上下文里还是旧值？',
    promptAnswer:'批量 @Query 改的是库，内存里的托管实体不会自动变。要清上下文或 clearAutomatically 后再加载。',
    core:'批量 UPDATE/DELETE 直接发 SQL，绕过脏检查。上下文里已经加载的实体不会跟着变，除非 clearAutomatically 在执行后清空上下文，或自己再刷新。没有 @Modifying 时，@Query 被当成查询。执行完立刻读同一上下文的实体，会看到更新前的字段。需要实体状态时，要么清上下文再加载，要么别混用批量 SQL 和托管实体。',
    why:'误以为批量更新语句会顺便改掉内存里的实体。同一上下文里马上按 id 读取，打印出来的仍是更新前的字段。区分信号是读到的是已经加载的实体，还是清空之后重新查库的结果，马上打印的是上下文里的旧对象，不是库里的新行。',
    example:'@Modifying(clearAutomatically = true) @Query("update Order o set o.status = :s where o.id = :id")。之后再 find，会重新查库。',
    task:'批量更新后不 clear，打印实体字段。再打开 clearAutomatically，对比。',
    answer:'不清理上下文时，批量更新后打印的仍是更新前的字段，因为内存里的实体没有跟着 SQL 变。打开 clearAutomatically 后再查找，会重新查库，读到新状态。这条改写语句必须标上 Modifying，否则会被当成查询。需要实体状态时，清空后再加载，不要混用批量 SQL 和仍在上下文里的旧对象。',
    deep:[
      {title:'批量语句不改托管实体的字段',body:'批量更新直接发到数据库，持久化上下文里的对象还是加载时的值。clearAutomatically 在语句之后清空上下文，下次访问会重新加载。不清空就在同一上下文里读，看到的仍是旧字段。没有改写注解时，语句会被当成查询。'},
      {title:'怎样自己验证',body:'先加载实体，再执行批量更新且不清理，打印字段，应仍是旧值。打开 clearAutomatically 后重新查找并打印，应变成库里的新状态。去掉改写注解时，这条语句不应再作为更新执行。'},
    ],
    keywords:'JPA @Modifying clearAutomatically 批量更新 持久化上下文',
    points:['@Modifying 发出的是 UPDATE/DELETE，不是查询','已加载实体不会自动变成新值','需要时可清空上下文再读'],
    refs:[['Spring Data JPA：Modifying queries','https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.modifying-queries'],['Jakarta Persistence：Bulk update','https://jakarta.ee/specifications/persistence/3.1/jakarta-persistence-spec-3.1#a4604']]
  },
  {
    track:'java', group:'搜索', id:'es-aggregations',
    title:'聚合是在匹配文档上分桶或算指标，不是再把每条文档取回来',
    prompt:'要看每个状态有多少订单，为什么把一万行搜出来在应用里 groupBy？',
    promptAnswer:'分组计数放引擎里做 terms 聚合，不要搜一万行回应用里 groupBy。',
    core:'聚合在查询命中的文档上做。terms 按字段分桶计数，avg/sum 在桶里算指标。它返回的是桶和数字，不是完整订单列表。字段要可聚合：keyword 或 numeric，analyzed text 往往不行。聚合看的是查询当时可见的文档，refresh 和过滤条件都会影响。大基数 terms 要设大小，否则只看到一部分桶。',
    why:'误以为统计之前要把命中文档都取回应用里分组。一万行拉过网络再做分组，集群和内存一起被拖住。区分信号是响应里是分桶计数，还是一整页原始文档，一万行文档先过网络再在应用里分组，内存和耗时一起涨。',
    example:'查询最近一天的订单，再按 status 做 terms。响应的桶里是 paid、cancelled 和各自的 doc_count。这一万张订单不会作为 hits 返回给应用再分组。分词后的 text 字段通常进不了这个 terms 桶。',
    task:'写一个 terms 聚合。对比把 hits.size 开到 10000 再在程序里计数的代价。',
    answer:'terms 聚合返回的是每个状态的桶和 doc_count，不是订单列表。把 hits 调到一万再在程序里计数，要把命中文档都传回应用。统计应放在引擎里做。用来分桶的字段要能聚合，分词文本通常不行。聚合看的是查询当时可见的文档，大基数时还要限制桶的数量。',
    deep:[
      {title:'桶里是统计，不是订单正文',body:'查询先圈定当时可见的文档，聚合再在这些文档上分桶或算指标。terms 返回的是键和 doc_count。刷新间隔和过滤会改变能看见的集合。基数很大时要限制桶的数量，否则响应里只有一部分桶。'},
      {title:'和导论',body:'聚合/facet 是 ES 典型能力，见 es-what-and-when；重聚合吃容量见 es-tradeoffs-capacity。'},
      {title:'怎样自己验证',body:'写一个按 status 的 terms，看响应里有没有订单正文。再把 hits 调大到一万，在程序里计数，对比传输量和内存。统计结果应来自分桶，而不是来自这批文档。'},
    ],
    keywords:'Elasticsearch aggregations terms 分桶 keyword',
    points:['聚合在命中文档上算桶和指标','返回统计结果，不是整行文档列表','text 分词字段通常不能直接 terms'],
    refs:[['Elasticsearch：Aggregations','https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html'],['terms aggregation','https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html']]
  },
  {
    track:'java', group:'搜索', id:'es-custom-routing',
    title:'自定义 routing 把相关文档放到同一分片，查错分片会找不到',
    prompt:'按用户 id 路由写入，按默认路由去搜，为什么有时搜不到刚写的文档？',
    promptAnswer:'写入用的 routing 读取也要用。默认路由去 GET 可能落到别的分片找不到。',
    core:'默认按文档 _id 哈希选分片。自定义 routing 把同一用户的文档放到同一分片，可缩小查询范围。读的时候也必须带同一个 routing，否则会去错分片或扫全部分片。routing 值不能变来变去，变了等于换分片，旧文档还在原地。它优化的是“总是一起查的那一组”，不是全局更快。读写顺序是：写入时带上 routing，文档按这个值进入分片；按 id 读取时必须再带同一个值，才会打开那一片。搜索若不带 routing，会扫过全部分片，因而可能仍能找到，但范围没有缩小；带了错误的值则会打开别的分片。边界是：routing 一旦改变，旧文档仍留在原片，不会自动搬家。它只收拢总是一起查的那一组，不是全局加速。',
    why:'误以为写入时带了路由值，按默认规则读取也能命中同一分片。按 id 读取却去了另一个分片，刚写入的文档像是丢失。区分信号是读和写是否带了同一个、且没有中途改过的路由值，按 id 读取会按另一套规则选片，刚写入的文档像丢失了。',
    example:'订单以 routing 等于 user-7 写入。带同一个值的 GET 能读到刚写的文档。不带 routing 的 GET 会去另一片，返回找不到。带错路由值的搜索同样落在错误的分片上。不带路由值的搜索会扫过全部分片，因而仍可能找到它。',
    task:'同一文档带 routing 写入，分别用有无 routing 的 GET/SEARCH，记录命中差异。',
    answer:'带同一 routing 的 GET 能读到刚写入的文档。不带 routing 的 GET 会按 id 另选分片，结果找不到。不带 routing 的搜索会扫全部分片，仍可能命中，但已经不是收拢后的查询。路由值必须稳定，改了以后旧文档还在原地。',
    deep:[
      {title:'读写要打开同一片',body:'routing 在写入时参与选择分片。按 id 读取若带了另一个值，或者根本不带，就会按别的规则打开分片，文档像是没写进去。搜索不带值时会扫全部片，可能找得到，但失去了收拢的意义。值改了，旧文档也不会跟着搬。'},
      {title:'和导论',body:'分片是水平扩展检索的基础，见 es-what-and-when、es-tradeoffs-capacity；routing 是进阶优化不是入门必选项。'},
      {title:'怎样自己验证',body:'用固定 routing 写入一条文档。分别用相同值、不带值和错误值做 GET，记下只有相同值命中。再做一次不带 routing 的搜索，看它是否因扫过全部分片而仍能找到。'},
    ],
    keywords:'Elasticsearch routing 分片 _id',
    points:['routing 决定文档落在哪一个分片','读写必须使用同一个 routing 值','routing 一变，旧文档不会跟着搬家'],
    refs:[['Elasticsearch：Routing','https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-routing-field.html'],['Index API routing','https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html#index-routing']]
  },
  {
    track:'java', group:'安全', id:'spring-oauth2-resource',
    title:'资源服务器校验令牌，不是再做一遍登录表单',
    prompt:'API 只收 Bearer Token，为什么还去配用户名密码登录页？',
    promptAnswer:'Bearer API 是资源服务器校验令牌。用户名密码登录页属于授权服务器，不要混成一套。',
    core:'资源服务器的职责是：取出 Authorization 里的 Bearer，校验签名或 introspection，把主体放进 SecurityContext。登录（拿授权码换令牌）是授权服务器或网关的事。JWT 校验看签发者、受众、过期。令牌有效不等于这个主体能改这行订单，对象级授权仍要做。浏览器 cookie 会话和 Bearer API 不要混成同一套过滤器还以为都是表单登录。',
    why:'误以为收 Bearer 的接口也要配一套用户名密码登录页。调用方把 JSON 打到登录表单上，拿到的是 HTML 而不是资源。区分信号是这里只校验令牌，换令牌的登录发生在另一类应用。',
    example:'订单 API 只配置资源服务器的 JWT 校验。请求带过期 Bearer 时返回未授权，不会重定向到登录页。登录页在另一套认证服务里，负责用授权码换令牌。有效令牌还要再查这张订单是不是该主体的，验签本身不包含这一步。',
    task:'对照资源服务器文档，列出校验令牌与重定向登录各发生在哪一类应用。',
    answer:'校验 Bearer、核对签发者、受众和过期，发生在资源服务器这种 API 上。用户名密码或重定向登录发生在授权服务器，不在订单 API 里。令牌有效之后，仍要在订单服务里做这行数据的对象级授权。浏览器里的表单登录和 Bearer 接口不要装成同一套过滤器。',
    deep:[
      {title:'验令牌和换令牌不在同一个应用',body:'资源服务器确认令牌是谁签发、签给谁、有没有过期，然后把主体放进安全上下文。它不渲染登录表单。令牌通过之后，改某一行订单仍要看这个主体是不是这行数据的所有者，这一步不在验签里。'},
      {title:'怎样自己验证',body:'对照文档，把验签标到资源服务器，把重定向登录标到授权服务器。用过期令牌调用订单 API，应得到未授权的响应，而不是一张登录页。再换一个有效令牌，确认不会因此跳到登录页。'},
    ],
    keywords:'OAuth2 资源服务器 JWT Bearer Spring Security',
    points:['资源服务器校验 Bearer，不负责表单登录','要核对签发者、受众和过期','令牌有效仍要做对象级权限'],
    refs:[['Spring Security：OAuth2 Resource Server','https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html'],['Spring Security：JWT','https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html']]
  },
  {
    track:'java', group:'安全', id:'oidc-id-token-pkce',
    title:'OpenID Connect 用 ID Token 表示登录，公开客户端还要 PKCE',
    prompt:'拿到 Access Token 就算登录完成了吗？',
    promptAnswer:'登录结果在〔ID Token｜发给客户端、声明这次登录的 JWT〕里。Access Token 是交给资源服务器的，不是这次登录的声明。',
    core:'〔OpenID Connect｜在 OAuth 2.0 之上增加登录身份的协议〕要求认证请求的 scope 含有 openid。没有这个值，就不是一次 OpenID Connect 认证请求。授权服务器返回的〔ID Token｜发给客户端、声明这次登录的 JWT〕必须带签发者、主体、受众和过期时间，受众里要有这个客户端的 client id。Access Token 按 OAuth 2.0 交给资源服务器，见 spring-oauth2-resource。浏览器或手机这种保管不了客户端密钥的公开客户端，授权码还要带〔PKCE｜换授权码前先提交口令摘要〕。客户端先生成 code_verifier，授权请求里放它的 S256 摘要 code_challenge。换令牌时再交回 code_verifier。摘要与口令不一致时，授权服务器拒绝。Spring Security 的 oauth2Login 走授权码，scope 要包含 openid。',
    why:'学习者会把 Access Token 交给浏览器页面，当成用户已经登录。页面读不到这次认证的受众和过期声明，资源服务器却拿到了本该只证明登录的材料。区分信号是：证明这次登录的是 ID Token，调用订单 API 的才是 Access Token。',
    example:'依赖方只打开 OAuth2 登录，并声明 openid：\n\n```java\n@Configuration\n@EnableWebSecurity\npublic class OidcLoginConfig {\n  @Bean\n  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n    http\n        .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())\n        .oauth2Login(org.springframework.security.config.Customizer.withDefaults());\n    return http.build();\n  }\n}\n```\n\n```properties\nspring.security.oauth2.client.registration.orders.client-id=order-web\nspring.security.oauth2.client.registration.orders.scope=openid,profile\nspring.security.oauth2.client.provider.orders.issuer-uri=https://idp.example/realms/orders\n```',
    task:'写出授权请求里必须出现的 scope，以及公开客户端换授权码时两段口令各自放在哪一次请求。',
    answer:'1. 认证请求的 scope 必须包含 openid。没有它，这次请求不是 OpenID Connect 认证。\n\n2. ID Token 发给客户端，受众包含 client id。Access Token 交给资源服务器，不拿它代替登录声明。\n\n3. 公开客户端在授权请求里提交 code_challenge，在换令牌时提交 code_verifier。摘要与口令不一致时，授权服务器拒绝发出令牌。',
    keywords:'OpenID Connect ID Token PKCE code_verifier oauth2Login openid',
    points:['认证请求的 scope 必须包含 openid','ID Token 的受众是客户端，Access Token 交给资源服务器','公开客户端用授权码和 PKCE，口令不一致就拒绝换令牌'],
    deep:[
      {title:'两张令牌',body:'ID Token 声明授权服务器对这个客户端完成了一次认证，受众要包含 client id，过期后客户端不得再接受。Access Token 的校验在资源服务器。对象级授权仍在订单服务里做，不在 ID Token 的验签里。'},
      {title:'怎样自己验证',body:'看一次认证请求的 scope 里有没有 openid。再看令牌响应：ID Token 的 aud 是不是这个 client id。公开客户端再核对授权请求里的 code_challenge 和换令牌请求里的 code_verifier 能否按 S256 还原为同一口令。'}
    ],
    refs:[
      ['OpenID Connect Core 1.0','https://openid.net/specs/openid-connect-core-1_0.html'],
      ['RFC 7636：PKCE','https://www.rfc-editor.org/rfc/rfc7636.html'],
      ['Spring Security：OAuth 2.0 Login','https://docs.spring.io/spring-security/reference/servlet/oauth2/login/core.html']
    ]
  },
  {
    track:'java', group:'安全', id:'ssrf-allowlist-before-fetch',
    title:'SSRF：服务器代取地址之前，先核对允许名单',
    prompt:'用户已经登录，为什么仍不能把对方传来的地址直接拿去下载？',
    promptAnswer:'登录只说明是谁。〔SSRF｜服务器按收到的地址去取内容，却没有核对目标是不是预期的〕看的是取回的目标。',
    core:'CWE-918 的情形是：服务器从上游拿到一个地址并取回内容，却没有充分确认请求发往预期的目标。调用方到不了的主机，可能经这台服务器被访问，防火墙只看见服务器自己。目标事先能点名时，OWASP 的做法是〔允许名单｜事先写明可以取的完整地址〕。取回前用完整地址核对，不在名单里就拒绝，然后再发请求。HTTP 客户端要关闭自动跟随重定向，避免核对过的地址被带到名单之外。目标不能事先点名时，这一份名单不够用。对象级授权仍见 object-level-authz，它不代替这道核对。',
    why:'学习者看见接口已经要登录，就把请求里的地址交给 HTTP 客户端。服务器所在的网络能到达调用方到不了的服务，取回的内容却回到了调用方。区分信号是：名单里的完整地址可以取回，名单外的地址在发出请求之前被拒绝。',
    example:'只取事先写明的发票地址，并且不跟随重定向：\n\n```java\nstatic final java.util.Set<String> ALLOWED = java.util.Set.of(\n    "https://files.example/invoices/sample.pdf");\n\nstatic byte[] fetchInvoice(String url) throws Exception {\n  if (!ALLOWED.contains(url)) {\n    throw new IllegalArgumentException("url");\n  }\n  java.net.http.HttpClient client = java.net.http.HttpClient.newBuilder()\n      .followRedirects(java.net.http.HttpClient.Redirect.NEVER)\n      .build();\n  java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder(java.net.URI.create(url)).build();\n  return client.send(request, java.net.http.HttpResponse.BodyHandlers.ofByteArray()).body();\n}\n```',
    task:'写出取回之前要核对什么，以及 HTTP 客户端对重定向应怎样设置。',
    answer:'1. 服务器按收到的地址取内容之前，必须确认目标是预期的那一个。登录通过不代替这道确认。\n\n2. 目标事先能点名时，用完整地址的允许名单核对。不在名单里就拒绝，请求还没有发出。\n\n3. HTTP 客户端关闭自动跟随重定向。核对过的地址不能再被带到名单之外。',
    keywords:'SSRF CWE-918 允许名单 followRedirects NEVER',
    points:['服务器取回地址之前必须确认目标是预期的','目标能点名时用完整地址的允许名单，不在名单里就拒绝','HTTP 客户端关闭自动跟随重定向'],
    deep:[
      {title:'名单核对的是完整地址',body:'允许名单写的是可以取的那几个完整地址。只比较主机名、或取回之后再看结果，都晚于请求已经发出。名单外的地址应在发出之前拒绝。'},
      {title:'怎样自己验证',body:'用名单里的发票地址调用 fetchInvoice，应取回字节。把地址改成名单外的另一个 https 地址，应在抛出 IllegalArgumentException 时还没有发出请求。再确认 HttpClient 的重定向策略是 NEVER。'}
    ],
    refs:[
      ['CWE-918：SSRF','https://cwe.mitre.org/data/definitions/918.html'],
      ['OWASP：SSRF Prevention','https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html']
    ]
  },
  {
    track:'java', group:'安全', id:'spring-session-stateless',
    title:'无状态 API 不要再为每次 Bearer 请求创建会话',
    prompt:'接口已经用 JWT，为什么日志里还在写 SESSION 并且发 Set-Cookie？',
    promptAnswer:'STATELESS 不再发会话 Cookie。JWT 认证仍在，只是不为这次请求建服务端会话。',
    core:'Spring Security 默认可能创建 HTTP Session。纯 Bearer API 应把会话策略设成无状态，避免每个请求都占一份会话存储，也避免 CSRF 按 cookie 会话那套来。无状态不是“没有认证”，认证信息每次从令牌重建。需要服务端会话的浏览器应用则不要硬套无状态。WebSocket 或登录表单仍可能要会话，按入口分开配置。',
    why:'误以为令牌接口可以继续沿用默认会话。响应里仍出现会话 Cookie，会话存储被每次请求写满。区分信号是改成无状态之后没有 Set-Cookie，身份仍能从这次令牌重建，主体不再来自一块新的会话。',
    example:'同一条 JWT 请求，默认过滤器链的响应里有 Set-Cookie。改成 STATELESS 之后，这份响应不再写会话 Cookie。安全上下文里仍能读到从令牌解析出的主体。表单登录若仍要会话，应走另一条过滤器链，而不是这条 API。',
    task:'打开无状态前后的响应头，看有没有 Set-Cookie。再确认 SecurityContext 是否仍能从 JWT 建起来。',
    answer:'打开无状态之前，响应里有会话用的 Set-Cookie。改成 STATELESS 之后，同一条 Bearer 请求不再写这个 Cookie。安全上下文仍能按这次 JWT 建立，身份不是从会话里拿的。表单登录不要和这条链混用。无状态不是取消认证，只是不再为这次请求创建会话。',
    deep:[
      {title:'无状态仍要每次重建身份',body:'无状态是不为 Bearer 请求创建会话，不是跳过认证。过滤器从令牌重建安全上下文，响应不必再写会话 Cookie。浏览器上的表单登录如果还要会话，应放在另一条过滤器链上，而不是套进这条 API 链。'},
      {title:'怎样自己验证',body:'同一条 JWT 请求在改策略前后各发一次，看响应头里有没有 Set-Cookie。再读取安全上下文，确认主体仍然来自这份令牌，而不是来自一块新的会话。身份应仍在，Cookie 应消失。'},
    ],
    keywords:'SessionCreationPolicy STATELESS JWT Set-Cookie Spring Security',
    points:['默认过滤器链可能创建 Session','无状态 API 每次从令牌重建认证','浏览器表单登录不要硬套同一条无状态链'],
    refs:[['Spring Security：Session Management','https://docs.spring.io/spring-security/reference/servlet/authentication/session-management.html'],['Spring Security：Architecture','https://docs.spring.io/spring-security/reference/servlet/architecture.html']]
  },
  {
    track:'frontend', group:'安全', id:'csp-script-src',
    title:'CSP 白名单限制脚本从哪来，不是代替转义 HTML',
    prompt:'配了 Content-Security-Policy，为什么还要转义用户评论里的标签？',
    promptAnswer:'只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。评论转义仍然要留着，尖括号应显示成文本而不是节点。',
    core:'CSP 告诉浏览器：脚本、样式、连接允许从哪些源加载。默认拦截未列出的脚本，能挡住很多注入的外挂脚本。它不把已经进 DOM 的 HTML 变回文本。用户评论仍要在输出时编码。inline 脚本和 javascript: 地址常被禁掉，内联事件处理也会失效。开发时用 report-only 先看误伤。nonce 或 hash 允许指定的内联，不要为了省事 script-src *。',
    why:'误以为配了脚本来源白名单，就可以把用户评论直接写进 HTML。策略一松，或内容本身就是标记，危险节点仍会出现。区分信号是控制台里的加载拦截，和评论是否仍按文本转义，两件事都要在，标记一旦被当成 HTML 解析，策略不会把它变回纯文本。',
    example:'响应头只允许同源脚本。页面插入一条其它来源的脚本文件时，控制台出现拒绝加载，脚本不执行。评论里的尖括号仍被转义成文本，没有变成元素。评论字符串是尖括号加上 script。转义后用户看见这些字符，外源地址则在控制台被拒绝，两条结果要同时成立。',
    task:'加一条只允许同源脚本的 CSP。再尝试插入外源 script，看控制台报告。同时确认评论转义仍然存在。',
    answer:'只允许同源脚本之后，插入外源脚本会被拒绝，控制台有策略报告，脚本不执行。评论转义仍然要留着，尖括号应显示成文本而不是节点。不要用通配符把脚本来源放空，那会把这条限制掏空。开发时可以先用只报告的模式看有没有误伤，但评论编码不能省，通配符也会把限制掏空。',
    deep:[
      {title:'白名单管的是脚本从哪加载',body:'script-src 决定浏览器肯执行哪些来源的脚本。外源地址不在名单里就拒绝加载。已经作为 HTML 解析出来的节点，不会因为这条策略变回纯文本。评论仍要在输出时编码，策略只是另一层限制。'},
      {title:'Report-Only',body:'只报告不拦截的是 Content-Security-Policy-Report-Only，见 csp-report-only-not-enforce。有报告不等于已挡住。'},
      {title:'Trusted Types',body:'危险汇点还可要求可信类型，见 trusted-types-sink-guard。能力开关见 permissions-policy-feature-gate。'},
      {title:'和 SRI',body:'脚本来源靠 CSP；CDN 字节是否被篡改靠 integrity，见 sri-integrity-not-csp。两层不要互相替代。'},
      {title:'怎样自己验证',body:'加上只允许同源脚本的策略，再插入一条外源脚本，看控制台的拒绝报告并且脚本不执行。同时提交带尖括号的评论，确认页面上仍是转义后的文本，而不是新的元素。两条都要通过，才算策略和转义同时在。'},
    ],
    keywords:'CSP Content-Security-Policy script-src XSS nonce',
    points:['CSP 限制允许加载的脚本源','它不能代替 HTML 转义','不要用通配符把策略放空'],
    refs:[['MDN：Content Security Policy','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP'],['MDN：script-src','https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src']]
  },
  {
    track:'frontend', group:'测试', id:'msw-http-mock',
    title:'组件测试拦的是 HTTP，不要把 fetch 整个替换成假函数就完事',
    prompt:'vi.spyOn(global, "fetch") 之后，为什么换了一次 URL 封装测试全红？',
    promptAnswer:'按路径返回 JSON 之后，页面应显示 paid。把客户端函数改名再跑，测试仍然通过，因为断言的是界面和这份响应，不是 fetch 这个名字被调用了几次。',
    core:'MSW 在网络边界按方法和路径返回约定好的响应，组件仍走真实的客户端代码。假的 fetch 绑在全局函数名上，封装一换测试就碎。拦截器描述的是契约：状态码、JSON 形状、错误 type。不要在 MSW 里复制一整套后端规则。端到端仍打真实或预发环境，MSW 给组件和集成测试。测试顺序是：先打开拦截，按方法和路径写好状态码与 JSON，再渲染组件并操作界面，最后断言用户看得见的结果。组件仍走自己的请求代码，所以封装函数改名不会碰碎这条契约。边界是：未写明的路径不要假装成功；断言对着界面和响应字段，不对着某个函数被调用了几次。端到端仍打真实或预发环境，不要在拦截器里复制一整套后端规则。',
    why:'误以为替换全局 fetch 就算把接口模拟好了。客户端改了封装函数的名字之后，断言调用次数的测试全部变红。区分信号是按方法和路径返回约定响应后，函数改名测试仍能通过，界面仍显示约定好的状态字段。',
    example:'http.get("/api/orders/:id", () => HttpResponse.json({id:"1",status:"paid"}))。页面测的是展示 paid，而不是 fetch 被调用了几次。',
    task:'把一个 spyOn fetch 的测试改成 MSW 按路径返回 JSON。再把客户端改名，确认测试仍过。',
    answer:'按路径返回 JSON 之后，页面应显示 paid。把客户端函数改名再跑，测试仍然通过，因为断言的是界面和这份响应，不是 fetch 这个名字被调用了几次。未在拦截器里约定的路径不要假装成功。端到端仍打真实或预发环境，拦截器里不要复制一整套后端规则。',
    deep:[
      {title:'拦截的是离开应用的请求',body:'匹配发生在请求离开应用的边界，路径和方法对上才返回准备好的 JSON。客户端内部函数叫什么，不影响这条匹配，所以可以改名重构。不要在拦截器里重写库存、权限和一整套业务规则。'},
      {title:'怎样自己验证',body:'把监视 fetch 的测试换成按订单路径返回 paid，页面应显示已支付。再给客户端函数改一个名字重跑，测试应仍然通过。断言里不应再出现调用次数。改名后仍显示已支付，才说明没有绑死函数名。'},
    ],
    keywords:'MSW mock service worker HttpResponse 组件测试',
    points:['MSW 按方法和路径拦截请求','测试应断言界面和契约，而不是 fetch 调用次数','不要用它冒充整套后端规则'],
    refs:[['MSW：Intercepting requests','https://mswjs.io/docs/network-behavior/rest'],['MSW：HTTP','https://mswjs.io/docs/basics/intercepting-requests']]
  },
  {
    track:'frontend', group:'测试', id:'test-fake-timers',
    title:'假时钟推进定时器，不要在测试里真的 sleep 三秒',
    prompt:'防抖输入要等 300ms，为什么测试套件被 sleep 拖得很慢还发脆？',
    promptAnswer:'假时钟下输入后推进 300 毫秒，搜索请求立刻发出，用例几乎不占等待。改成真实等待时，每个用例都要睡满这段延迟，文件明显更慢。',
    core:'假时钟替换 setTimeout/setInterval，测试里前进 300ms 即刻到期，不必真等。用户事件若也用定时器，要和测试库的假时钟配置一致，否则会挂起。测真实时间相关的动画或竞态，不要到处用假时钟掩盖。用完要恢复真时钟，避免后面的用例互相影响。执行顺序是：先启用假时钟，再做出会注册定时器的操作，然后把时间推进到延迟长度，最后断言副作用已经发生。和测试库一起用时，用户事件内部的时钟也要走同一套，否则操作会停在等待上。边界是：没推进到延迟，回调不应出现；推进过头可能把无关定时器也放出来。测真实动画或竞态时不要用假时钟掩盖，用完必须恢复真时钟。回调是否出现以推进后的断言为准。',
    why:'误以为防抖只能在测试里真的睡满延迟。每个输入用例都要等待几百毫秒，整份文件变慢，还容易偶发超时。区分信号是推进假时钟后请求马上出现，而不必真的等到延迟结束，整份文件会多出几十秒等待，持续集成还容易偶发超时。',
    example:'输入“咖啡”后，防抖注册 300 毫秒的定时器。把假时钟推进 300 毫秒，请求立刻发出，测试不必真等。若只推进 200 毫秒，这次请求不应出现。推进过头时，文件里其它更长的定时器也可能被提前放出来，所以只推进到阈值。',
    task:'给防抖搜索写测试。分别用假时钟和真实等待，对比耗时。',
    answer:'假时钟下输入后推进 300 毫秒，搜索请求立刻发出，用例几乎不占等待。改成真实等待时，每个用例都要睡满这段延迟，文件明显更慢。断言之后恢复真时钟，避免下一条用例仍停在假时钟上。用户事件若也依赖定时器，要和假时钟用同一套配置，否则会停在等待上。',
    deep:[
      {title:'时间不前进，回调就不会到期',body:'假时钟替换定时器。防抖在输入时注册回调，时间停着，回调就不执行。推进到延迟长度，回调立刻发生。若测试库的用户事件也在用定时器，两套时钟必须是同一套，否则测试会停住。'},
      {title:'怎样自己验证',body:'写一条防抖搜索：推进到 300 毫秒应发出请求，只推进一部分则不应发出。再改成真实等待跑一遍，对比两个用例的耗时。结束后恢复真时钟，下一条用例不应再被提前拨快。'},
    ],
    keywords:'fake timers setTimeout Testing Library Vitest 防抖',
    points:['假时钟立刻推进定时器，不必真睡','要和测试库的异步工具配在一起用','用完恢复真时钟'],
    refs:[['Testing Library：Fake timers','https://testing-library.com/docs/using-fake-timers/'],['Vitest：Timers','https://vitest.dev/guide/mocking.html#timers']]
  },
  {
    track:'java', group:'系统设计', id:'arch-slo-budget',
    title:'SLO 是用户能容忍的目标，错误预算决定能不能再发版',
    prompt:'可用性 99.9% 是口号，还是可以拿来决定本周能不能上线？',
    promptAnswer:'能拿来决定，不是口号。先定 SLI（测量）、窗口和 SLO（目标），再看本月错误预算还剩多少。',
    core:'SLI（Service Level Indicator，服务水平指标）是测量值，例如成功请求比例。SLO（Service Level Objective，服务水平目标）是目标，例如 30 天成功比例 ≥ 99.9%。剩下的失败份额是错误预算（error budget）。预算耗尽时应放慢发版、先修可靠性。SLO 要对着用户可感知的路径写，不要把 CPU 当 SLI。100% 不是目标，那会禁止一切变更。窗口太短会抖，太长会反应迟钝。决策顺序是：先定用户可感知的 SLI，再定窗口和目标，用一减去目标、乘上窗口内的请求量，得到错误预算。预算还在可以变更，耗尽就先修可靠性。',
    why:'误以为可用性百分比只是口号，不能约束发版。预算烧完仍继续上线，故障和发布没有共同的尺子。区分信号是先有用户可感知的测量和窗口，再用剩下的失败份额决定能不能变更。',
    example:'下单成功定义为返回成功并且库存已经扣减。三十天内一百万次请求、目标 99.9% 时，失败预算大约一千次。本周预算快用完，就先停掉非紧急发布。',
    task:'给下单接口选一个 SLI、一个窗口、一个 SLO。算出一个月允许失败多少次（按预估流量粗算）。',
    answer:[
      'SLI：下单成功次数 ÷ 总下单次数（用户可感知）。',
      '窗口：30 天。',
      'SLO：≥ 99.9%。',
      '按每月一百万次粗算，错误预算约一千次失败。',
      '预算还在可以变更；快用完就暂停非紧急发布。',
      '不要把 CPU 占用当成这个 SLI；百分之百不是目标。',
    ].join('\n'),
    deep:[
      {title:'剩下的失败份额决定还能不能发',body:'SLI 是一段窗口里量到的成功比例，SLO 是这条比例的目标，差额才是还能失败多少。预算充足时可以发版，耗尽时先修可靠性。目标写成百分之百会让任何变更都超支。'},
      {title:'怎样自己验证',body:'写下单的测量、30 天窗口和目标。用预估的月流量乘上允许失败的比例，算出大约能失败多少次。再写一句：预算快用完时，本周停掉哪一类非紧急发布。'},
    ],
    keywords:'SLO SLI 错误预算 SRE 可用性',
    points:['SLI（服务水平指标）是用户可感知的测量','SLO（服务水平目标）是目标，不是 100%','错误预算是目标之外还能失败的份额，用来权衡发版'],
    refs:[['SRE：Service Level Objectives','https://sre.google/sre-book/service-level-objectives/'],['Google Cloud：SLI SLO 错误预算','https://cloud.google.com/blog/products/devops-sre/sre-fundamentals-slis-slos-and-error-budgets']]
  },
  {
    track:'java', group:'系统设计', id:'arch-queue-wait',
    title:'池或队列一满，延迟从处理时间变成排队时间',
    prompt:'单次处理只要 20ms，为什么一到晚高峰 P99 变成两秒？',
    promptAnswer:'到达快过处理时，P99 多是排队时间。先看队列与利用率，再谈加机器。',
    core:'请求先排队再被处理。容量够时，延迟接近处理时间。到达快过处理，队列变长，等待时间主导 P99。线程池、连接池、消息积压都是队列。加超时如果只砍调用方、不限制队列，会在池里堆满已经注定失败的任务。先看利用率、队列长度和拒绝策略，再谈加机器。这和限流、隔离舱一起用：限制进入，隔开依赖。观察顺序是：先看到达是否快过处理，再看队列长度和拒绝次数，最后才决定要不要加机器。容量够时，延迟接近处理时间；队列变长之后，等待主导尾延迟。边界是：超时若只通知调用方、不限制入口，池里会堆满已经注定失败的任务。处理时间已经很短时，再把函数优化几毫秒，救不了排在几千个请求之后的那一个。',
    why:'误以为把单次处理再缩短几毫秒，就能拉下尾延迟。队列里已经排了很多请求时，用户等的是前面的任务。区分信号是超时发生在排队阶段还是处理阶段，以及入口有没有拒绝，队列里已经排了很长时，用户等的是前面那些还没开始的任务。',
    example:'处理一次只要 20 毫秒，但 200 个线程都已占满，第 201 个请求在队列里等。它的超时发生在排队，而不是发生在那 20 毫秒的处理函数里。把处理改成 15 毫秒，也填不满已经排在队列里的那些等待。',
    task:'画到达速率、处理速率、队列长度。标出超时发生在排队还是处理。给出拒绝或限流的位置。',
    answer:'到达快过处理时队列变长，尾延迟变成排队时间加上大约 20 毫秒的处理。超时应标在排队阶段，而不是标在处理函数里。拒绝或限流放在进入池之前，避免池里堆满已经来不及完成的任务。先看利用率和队列长度，再谈加机器。只把处理缩到 15 毫秒填不满这些等待。',
    deep:[
      {title:'饱和之后等待时间占掉尾延迟',body:'工作者有空时，耗时接近处理时间。到达比处理快，请求在池或队列里等待，尾延迟被等待拉长。只把处理从 20 毫秒再削掉几毫秒，排在很长队列之后的请求几乎感觉不到。拒绝和限流要放在进入池之前。'},
      {title:'怎样自己验证',body:'画出到达速率、处理速率和队列长度。标出超时落在排队还是落在那一小段处理里。再写明拒绝或限流放在进入线程池之前的哪一个位置，而不是只加在调用方的超时上。图上要能看出等待已经大于那 20 毫秒。'},
    ],
    keywords:'排队论 线程池 P99 利用率 拒绝策略',
    points:['延迟 = 排队 + 处理','池满之后等待时间会主导尾延迟','超时和拒绝要作用在入口，避免无效堆积'],
    refs:[['SRE：Queueing','https://sre.google/sre-book/addressing-cascading-failures/'],['Java Executor 拒绝策略','https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ThreadPoolExecutor.html']]
  },
  {
    track:'java', group:'系统设计', id:'k6-threshold-not-check', since:'k6',
    title:'k6 的阈值失败才让进程失败，check 不改变退出码',
    prompt:'检查项都是绿的，为什么这次压测仍算通过？',
    promptAnswer:'〔check｜记下断言是否成立、本身不改变进程退出码的函数〕不决定成败。要挡住合并，把条件写进〔阈值｜结束时决定整次测试是否失败的条件〕。',
    core:'〔k6｜用脚本发起并发请求并按阈值判定成败的工具〕用 options.vus 指定同时运行的〔VU｜在指定时长内循环执行默认函数的并发执行者〕数量，默认是 1。duration 表示这次运行持续多久，这段时间里每个 VU 循环执行默认函数。两者一起是恒定 VU 场景的简写。阈值写在 options.thresholds 里，表达式在结束时为假，整次测试失败，退出码非 0。表达式为真则退出码是 0。check 只记录断言是否成立，不改变退出码。要让检查失败挡住这次运行，再给 checks 指标加一条阈值，例如成功率要高于 0.9。http_req_failed 用 rate 看错误比例，http_req_duration 用 p(95) 看时长。阶梯升降要另写 stages 或 scenarios。一次 duration 不是三次可比运行。排队时间见 arch-queue-wait。',
    why:'学习者看见每个 check 都通过，就让流水线放行。没有阈值时，慢响应和错误请求仍让进程以 0 结束。区分信号是：阈值表达式为假时退出码非 0；只有 check 失败、没有对应阈值时，退出码仍是 0。',
    example:'五名虚拟用户跑十秒，错误率和尾延迟写进阈值，检查也要达到成功率：\n\n```javascript\nimport http from "k6/http";\nimport { check } from "k6";\n\nexport const options = {\n  vus: 5,\n  duration: "10s",\n  thresholds: {\n    http_req_failed: ["rate<0.01"],\n    http_req_duration: ["p(95)<200"],\n    checks: ["rate>0.9"],\n  },\n};\n\nexport default function () {\n  const res = http.get("http://127.0.0.1:8080/orders");\n  check(res, { "status is 200": (r) => r.status === 200 });\n}\n```',
    task:'写出只有 check 失败时的退出码，以及怎样让检查成功率也决定整次测试的成败。',
    answer:'1. vus 是同时循环执行默认函数的虚拟用户数，duration 是这次运行的时长。\n\n2. 阈值表达式在结束时为假，整次测试失败，退出码非 0。全部成立时退出码是 0。\n\n3. 只有 check 失败时，退出码仍是 0。给 checks 加上 rate>0.9 之后，成功率不够才会让进程失败。',
    keywords:'k6 vus duration threshold check http_req_duration 退出码',
    points:['vus 与 duration 让固定数量的虚拟用户在时长内循环执行','阈值表达式为假时整次测试失败，退出码非 0','check 不改变退出码，要另给 checks 写阈值'],
    deep:[
      {title:'一次运行说明不了容量',body:'恒定的 vus 和 duration 只覆盖这一段负载。阶梯要写在 stages 或 scenarios 里。一次脚本通过，还不是同一数据上的三次可比运行。尾延迟变长时，先看排队，见 arch-queue-wait。'},
      {title:'怎样自己验证',body:'先只留 check、不写 thresholds，让接口返回非 200。check 失败，进程退出码仍是 0。再写上 checks 的 rate>0.9，同一失败应使退出码非 0。阈值全部成立时退出码是 0。'}
    ],
    refs:[
      ['Grafana k6：Thresholds','https://grafana.com/docs/k6/latest/using-k6/thresholds/'],
      ['Grafana k6：Options','https://grafana.com/docs/k6/latest/using-k6/k6-options/reference/']
    ]
  },
  {
    track:'java', group:'系统设计', id:'jmeter-cli-continue-on-error', since:'JMeter',
    title:'JMeter 负载用命令行跑，断言失败后可以继续',
    prompt:'结果树里有一条断言失败，为什么整次负载还在往下跑？',
    promptAnswer:'线程组在取样错误或断言失败后可以选择 Continue。〔JMeter｜用线程组对服务器执行测试计划的负载工具〕会忽略这次错误并继续。',
    core:'〔线程组｜规定模拟用户数、启动用时和重复次数的执行池〕用线程数表示要模拟的用户。〔Ramp-up｜把全部线程启动完毕所用的时间〕是这些线程陆续启动的总时长。10 个线程、100 秒时，后一个线程在前一个之后 10 秒启动，第一个立刻启动，第十个在 90 秒时启动。循环次数是每条线程把用例做几遍。取样本身失败，或断言失败，都算取样错误。选择 Continue 时，忽略该错误并继续测试。计划的编写和单线程验证用 GUI。负载测试用命令行模式，jmeter -n -t 计划.jmx -l 结果.jtl。手册写明不要用 GUI 跑负载。k6 的阈值会让退出码非 0，见 k6-threshold-not-check。一次命令行运行仍不是三次可比的阶梯负载。',
    why:'学习者在 GUI 的结果树里看见断言失败，就以为进程已经失败并停住。选择 Continue 时，其余线程还在发请求，失败只留在结果文件里。区分信号是：命令行仍在输出汇总，结果文件里同时有失败样本。',
    example:'编写好的计划用命令行跑，结果写入 jtl：\n\n```bash\njmeter -n -t orders.jmx -l orders.jtl\n```',
    task:'写出 10 个线程、Ramp-up 100 秒时第十个线程何时启动，以及断言失败且动作为 Continue 时测试会不会停。',
    answer:'1. 线程数是模拟用户数。Ramp-up 是把这些线程全部启动所用的时间。10 个线程、100 秒时，第十个线程在 90 秒时启动。\n\n2. 负载测试用 jmeter -n -t 计划.jmx -l 结果.jtl。GUI 用来编写和验证，不用来跑负载。\n\n3. 取样错误或断言失败后若选择 Continue，JMeter 忽略该错误并继续。失败记在结果里，整个计划不因此停下。',
    keywords:'JMeter Thread Group Ramp-up Continue jmeter -n -t jtl',
    points:['线程数是模拟用户数，Ramp-up 是全部线程启动完毕的时间','负载测试用命令行 jmeter -n -t 计划 -l 结果','Continue 在断言失败后忽略错误并继续测试'],
    deep:[
      {title:'和 k6 阈值',body:'k6 的阈值表达式为假时，整次测试失败且退出码非 0。JMeter 的 Continue 让断言失败后的线程继续取样。两条都要看结果文件，一次运行都不是三次可比的阶梯负载。'},
      {title:'怎样自己验证',body:'线程组设 10 个线程、Ramp-up 100 秒，在日志里核对第十个线程约在 90 秒启动。把错误后动作设为 Continue，让一条断言失败，确认命令行汇总仍在继续，结果文件里有这条失败。负载用 jmeter -n -t 跑，不用 GUI。'}
    ],
    refs:[
      ['JMeter：Thread Group','https://jmeter.apache.org/usermanual/component_reference.html#Thread_Group'],
      ['JMeter：Getting Started','https://jmeter.apache.org/usermanual/get-started.html']
    ]
  },
  {
    track:'frontend', group:'Vue 生态', id:'pinia-store-to-refs',
    title:'从 store 解构状态要用 storeToRefs，否则丢掉响应式',
    prompt:'const { cart } = useCartStore() 之后改购物车，为什么界面不更新？',
    promptAnswer:'直接解构会断开响应式。要用 storeToRefs 取状态；方法可以普通解构。',
    core:'Pinia 的 state 和 getter 是响应式的。直接解构会把值从 proxy 拿出来，变成普通数据，再改 store 也跟不上。storeToRefs 给出仍然连着 store 的 ref。方法可以直接解构，它们不是响应式状态。在模板里用 store.cart 不必这一步。setup 里要拆成局部变量才用 storeToRefs。',
    why:'误以为可以像解构 props 一样，从 store 里直接取出状态。解构之后再调用增加商品，store 里的数据变了，界面却不更新。区分信号是局部变量还连不连着 store：状态要经 storeToRefs，方法可以直接拿。',
    example:'const store = useCartStore(); const { items } = storeToRefs(store); store.add() 后 items 仍更新。',
    task:'对比直接解构和 storeToRefs。改 store 后看模板有没有更新。',
    answer:'直接解构出的 cart，在 store 更新后模板不变。改用 storeToRefs 取出的 cart 会跟着更新。增加商品的方法可以直接解构，调用后界面仍会变。模板里如果写 store.cart，也不必先解构。setup 里要拆成局部变量时才需要 storeToRefs，模板上直接写 store 的字段也可以。',
    deep:[
      {title:'解构会把当时的值抄出来',body:'直接写出大括号取出 cart，拿到的是当时的普通数据，后面和 store 的响应式联系就断了。storeToRefs 给出的 ref 仍指向 store。方法不是状态，解构方法只是换个名字调用，不会把响应式弄丢。'},
      {title:'怎样自己验证',body:'同一页面先直接解构 cart，调用增加后再看模板，应不更新。换成 storeToRefs 重做一次，模板应更新。方法用解构调用，商品仍然加得进去，并且界面跟着变。'},
    ],
    keywords:'Pinia storeToRefs 响应式 解构',
    points:['直接解构 state 会丢掉响应式','storeToRefs 保持和 store 的连接','action 方法可以直接解构'],
    refs:[['Pinia：Destructuring','https://pinia.vuejs.org/core-concepts/#destructuring-from-a-store'],['Pinia：storeToRefs','https://pinia.vuejs.org/api/modules/pinia.html#storetorefs']]
  },
  {
    track:'frontend', group:'Vue 生态', id:'vue-router-scroll',
    title:'换页后的滚动位置要自己约定，浏览器不会总回到顶部',
    prompt:'从详情返回列表，为什么有时停在半页、有时冲到顶？',
    promptAnswer:'滚动位置由 scrollBehavior 决定。后退用 savedPosition，新开模块滚到顶，不能指望浏览器默认每次一样。',
    core:'路由切换时滚动由 scrollBehavior 决定：回顶部、恢复 savedPosition，或滚到锚点。浏览器自己的后退恢复和 keep-alive、异步组件加载时机叠在一起，默认往往不符合列表页预期。详情进列表若总 scrollTo(0)，用户会丢进度；一律不滚，长页面又会停在半空。要等页面渲染完再滚时，可返回回调或 Promise。这和 keep-alive 缓存实例是两件事，但会一起影响“看上去还在原地”。',
    why:'误以为每次换页，浏览器都会回到顶部。从详情退回列表时，有的停在半页，有的又跳到顶，像是路由不稳定。区分信号是前进、后退和带锚点这三种导航，各自落到哪一个滚动位置，从详情退回列表时，位置会在半页和顶部之间来回跳。',
    example:'从列表进入另一个模块时，滚动行为返回顶部。浏览器后退时使用 savedPosition，回到离开前的纵坐标。地址带锚点时滚到对应元素，而不是再次回到顶部。内容还没渲染出高度时就滚，纵坐标会落在错误的位置。',
    task:'实现 scrollBehavior。分别测 push 新页、后退、带 hash 三种，记下滚动位置。',
    answer:'push 到另一个模块时滚到顶部。后退时使用 savedPosition，回到离开前的位置。带锚点时滚到对应元素。三种结果都写在 scrollBehavior 里。内容要等渲染完再滚时，返回回调或 Promise，不要指望每次都和浏览器默认相同。',
    deep:[
      {title:'三种导航各有一个落点',body:'新开一页通常要到顶部，后退要回到保存的位置，锚点要滚到对应元素。异步页面若在高度出来之前就滚，位置会错。这时可以返回回调或 Promise，等渲染完再滚。这和是否缓存了组件实例是两件事，但会一起影响看起来像没动。'},
      {title:'怎样自己验证',body:'实现 scrollBehavior 后，分别做一次 push、一次浏览器后退和一次带锚点的跳转，记下三个滚动位置。再把页面改成异步渲染，确认滚动发生在内容高度出来之后。'},
    ],
    keywords:'Vue Router scrollBehavior savedPosition 滚动',
    points:['换页滚动由 scrollBehavior 约定','后退常用 savedPosition 恢复','异步渲染完再滚时要返回延迟结果'],
    refs:[['Vue Router：Scroll Behavior','https://router.vuejs.org/guide/advanced/scroll-behavior.html'],['Vue Router：RouterScrollBehavior','https://router.vuejs.org/api/interfaces/RouterScrollBehavior.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_CORE_16) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
