/* Batch 05 frontend: original lessons following page-specific Vue example review. */
const COVERAGE_FRONTEND_05 = [
  {
    track:'frontend', group:'Vue', id:'vue-proxy-null-guard',
    title:'手写 Proxy 要先守住 null 与类型边界',
    prompt:'为什么 typeof null 是 object，却不能 new Proxy(null)？手写 reactive 示例还缺什么？',
    promptAnswer:'null 的 typeof 是 object，但仍不能作为 Proxy 目标。示例若只有日志陷阱，也不等于依赖追踪与触发更新。',
    core:'Proxy（代理）的 target（目标）必须是对象；JavaScript 的历史规则使 typeof null 返回 "object"。因此练习代码若要跳过非对象值，条件应是 value === null || typeof value !== "object"，不能用两个条件同时成立的 &&。这个函数只演示 get/set 陷阱；它没有 Vue 的依赖收集、触发更新、代理缓存或其他边界处理，不能替代 Vue 的 reactive()。实际 Vue reactive() 适用于对象、数组和集合等对象类型；基本类型状态可使用 ref()。',
    why:'一个布尔运算符错误会让 null 穿过检查并在创建代理时抛 TypeError。更大的误区是看到读写日志就以为已经实现了响应式：拦截操作与通知组件重新渲染是两件事。',
    example:'练习函数先执行 if (value === null || typeof value !== "object") return value；再创建 new Proxy(value, handler)。输入 null 得到 null，输入数字直接返回数字，输入普通对象才创建代理。若要观察嵌套属性，还需在读取嵌套对象时处理代理，并考虑代理身份与缓存；真实项目优先使用 Vue API。',
    task:'用 Node 或浏览器控制台分别运行“&& 防护”和“|| 防护”，输入 null、3、{}。记录哪个输入抛错；再说明只有 console.log 的代理为何不会自动刷新 Vue 页面。',
    answer:'typeof null 是 object，使 && 条件为假，new Proxy(null,{}) 抛 TypeError；用 value === null || typeof value !== "object" 才能先排除 null 与基本类型。日志陷阱不包含依赖追踪与触发更新。',
    vue:'javascript',
    deep:[
      {title:'构造时才会露出检查漏洞',body:'typeof null 得到 object，用并且把“是 null”和“不是 object”连起来，null 会同时不满足后半句，于是被放行。new Proxy 的目标必须是对象，null 会在构造时抛出 TypeError。数字在类型不符时就应原样返回。'},
      {title:'怎样自己验证',body:'在控制台对 null、3 和 {} 分别跑并且、或者两种检查。null 只应在并且版本抛 TypeError，3 两边都原样返回，只有普通对象得到代理。再给 set 只打印日志并改属性，确认页面不会因此刷新。'},
    ],
    keywords:'Vue Proxy reactive null typeof target guard get set 代理 响应式 类型边界',
    points:['Proxy target 必须是对象，null 不能做代理目标','null 防护的布尔条件与可复现实验','手写 get/set 代理与 Vue 响应式系统的边界'],
    refs:[['MDN：Proxy() 构造器','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy'],['Vue：Reactivity Fundamentals','https://vuejs.org/guide/essentials/reactivity-fundamentals.html'],['Vue：Reactivity in Depth','https://vuejs.org/guide/extras/reactivity-in-depth.html']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-array-raw-proxy',
    title:'数组 push 改的是原数组还是代理',
    prompt:'raw 数组传给 reactive 后，为什么 raw.push() 与 proxy.push() 不是同一条响应式路径？',
    promptAnswer:'raw.push 走原生数组，不通知依赖。只有对代理的写入才会触发已经读过代理的 effect。',
    core:'reactive(raw) 返回与 raw 身份不同的 proxy（代理）。只有经过代理的属性读取和修改才能进入代理陷阱，Vue 也明确指出直接修改原对象不会触发响应式更新。数组方法 push、shift、splice 可以在代理上工作，但不能因为“Proxy 支持数组”就推断 raw.push() 也被追踪。需要进一步区分：通过代理访问嵌套对象，Vue 会给嵌套对象做代理；而一个只记录顶层 get/set 的手写代理不会自动拥有 Vue 的深层响应式能力。',
    why:'误以为数组方法本身就会让页面刷新。对 raw 调用 push 之后，控制台里的长度变了，界面却不动。区分信号是这次写入有没有经过代理：读取长度的 watchEffect 只在代理修改后重跑。',
    example:'const raw = [1,2,3]; const proxy = reactive(raw); proxy.push(4) 走 Vue 的代理；raw.push(5) 直接修改原数组，不会因这次原始写入而触发依赖。数组内容可能仍能通过 proxy 读到 5，不能把“能读到”误当“写入触发了更新”。',
    task:'先用原生 Proxy 的 set 陷阱计数：对同一数组依次 raw.push(4)、proxy.push(5)，比较计数。再用 Vue 的 watchEffect 读取代理数组长度，分别做这两次操作，等待 nextTick 后观察运行次数；最后把所有业务写入改为使用代理。',
    answer:'原生 set 计数里，raw.push(4) 不增加，proxy.push(5) 会因写下标和 length 而增加。watchEffect 读过代理长度后，nextTick 里只有代理那次 push 让 effect 再跑一次。之后业务写入都改到代理上，界面才跟着变。',
    vue:'reactive',
    deep:[
      {title:'读得到不等于通知了依赖',body:'代理和原数组是同一份内容，所以 raw.push 之后，从代理上往往还能读到新元素。依赖记在经过代理的那次读取上。不经过代理的原始写入不会通知这些依赖，页面也就不会更新。'},
      {title:'怎样自己验证',body:'用只计数的 set 陷阱依次执行 raw.push(4) 和 proxy.push(5)，比较计数。再让 watchEffect 读取代理的 length，两次写入后各等一次 nextTick，只有代理写入会让 effect 再跑。'},
    ],
    keywords:'Vue reactive array push raw proxy effect trap 原数组 代理 数组方法 深层响应式',
    points:['raw 与 proxy 身份不同，变更路径不同','数组方法通过代理可触发追踪，原始写入不会','能从代理读到新值不等于原始写入触发更新'],
    refs:[['Vue：Reactivity Fundamentals','https://vuejs.org/guide/essentials/reactivity-fundamentals.html'],['Vue：Reactivity in Depth','https://vuejs.org/guide/extras/reactivity-in-depth.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_05) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
