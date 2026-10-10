/* Fenced code for lesson.example. UI: RichBlocks. Append ids; export:curriculum. */
const EXAMPLE_CODE_BLOCKS = {
  eventloop: [
    '在控制台或点击回调里跑这段，记下打印顺序：',
    '',
    '```js',
    'console.log(1)',
    'Promise.resolve().then(() => console.log(3))',
    'setTimeout(() => console.log(4), 0)',
    'console.log(2)',
    '```',
    '',
    '观察到的顺序是 1、2、3、4。若在微任务里再排一个微任务，它会排在 4 之前。画面最早在 3 之后、4 之前才有机会更新。绘制不会插在 1 和 2 之间。',
  ].join('\n'),

  'js-equality': [
    '同一结构、两次创建：',
    '',
    '```js',
    'const a = { id: 1 }',
    'const b = { id: 1 }',
    'a === b          // false：比的是引用',
    'a.id === b.id    // true：比的是原始值',
    'Object.is(NaN, NaN) // true',
    'Object.is(+0, -0)   // false',
    '```',
    '',
    '把 id 放进依赖时，1 === 1 为 true，effect 不会因为外层对象重造而重跑。',
  ].join('\n'),

  'promise-chain': [
    'catch 正常返回会把链拉回完成态：',
    '',
    '```js',
    'Promise.resolve()',
    '  .then(() => { throw new Error("x") })',
    '  .catch(() => 2)',
    '  .then((v) => v) // 完成态，值为 2',
    '```',
    '',
    '若 catch 里再次 throw，后面的 then 接不到 2，拒绝继续向后传。',
  ].join('\n'),

  'css-cascade': [
    '同一元素两条 color，先比层再比选择器：',
    '',
    '```css',
    '@layer base { #title { color: blue; } }',
    '.title { color: red; } /* 未分层，可能压过层内 #id */',
    '```',
    '',
    '层外那条普通作者样式可以胜出，尽管选择器更弱。把两条放进同一层后，#id 才盖过 .class。在样式面板里记下胜出的层。',
  ].join('\n'),

  closure: [
    '同一次点击里三次更新，闭包里的 count 不会中途变：',
    '',
    '```js',
    '// 渲染时 count === 0',
    'function onClick() {',
    '  setCount(count + 1)      // 排入 1',
    '  setCount(n => n + 1)     // 用队列结果：2',
    '  setCount(5)              // 写成 5',
    '  // 此处 count 仍是 0',
    '}',
    '```',
    '',
    '下一次渲染才是 5。打印发生在调用时，屏幕更新发生在之后的渲染。',
  ].join('\n'),

  'es6-const-binding': [
    'const 锁的是绑定，不是对象内容：',
    '',
    '```js',
    'const order = { amount: 10 }',
    'order.amount = 20          // 可以：仍是同一个对象',
    '// order = { amount: 30 }  // TypeError：不能换绑定',
    'Object.freeze(order)',
    '// order.amount = 40      // 严格模式抛错',
    '```',
  ].join('\n'),

  'js-this-callsite': [
    'this 看调用方式，不看函数写在哪：',
    '',
    '```js',
    'const user = {',
    '  name: "Ada",',
    '  hi() { return this.name },',
    '}',
    'user.hi()                 // "Ada"',
    'const hi = user.hi',
    'hi()                      // 严格模式：TypeError',
    '```',
  ].join('\n'),

  layout: [
    '交错读写会逼出多次 Layout：',
    '',
    '```js',
    '// 差：每轮写完立刻读',
    'nodes.forEach((el) => {',
    '  el.style.width = "100px"',
    '  void el.offsetWidth',
    '})',
    '',
    '// 好：先读完再写',
    'const widths = nodes.map((el) => el.offsetWidth)',
    'nodes.forEach((el, i) => { el.style.width = widths[i] + "px" })',
    '```',
    '',
    '在 Performance 里对比紫色 Layout 的次数，不要只凭页面“感觉还行”。',
  ].join('\n'),

  'java-autoboxing-cache': [
    '包装类型的 == 不等于数值相等：',
    '',
    '```java',
    'Integer a = 127;',
    'Integer b = 127;',
    'Integer c = 128;',
    'Integer d = 128;',
    'System.out.println(a == b);      // 常为 true（缓存）',
    'System.out.println(c == d);      // false',
    'System.out.println(c.equals(d)); // true',
    '```',
    '',
    '业务比较用 equals，或先拆成 int，不要用 == 判断数值。',
  ].join('\n'),

  'java-stream': [
    '中间操作惰性，终端操作才驱动遍历：',
    '',
    '```java',
    'list.stream()',
    '  .filter(x -> { System.out.println("f " + x); return x > 0; })',
    '  .map(x -> { System.out.println("m " + x); return x; })',
    '  .findFirst(); // 找到第一个满足的就可停',
    '```',
    '',
    '不要在中间操作里做“必须执行固定次数”的副作用。',
  ].join('\n'),

  'mysql-mvcc': [
    '最后一件库存，用条件更新而不是“读完再写死数字”：',
    '',
    '```sql',
    'START TRANSACTION;',
    'UPDATE stock SET qty = qty - 1',
    'WHERE id = 1 AND qty > 0;',
    '-- 看 ROW_COUNT()：1 成功，0 库存不足',
    'COMMIT;',
    '```',
    '',
    '两个会话都先普通 SELECT 看到 1 再写成固定 0，可能两笔都提交。条件更新后只有一笔影响 1 行。',
  ].join('\n'),

  'state-queue': [
    '队列按写入顺序算，不是按闭包里的旧变量：',
    '',
    '```js',
    '// 当前 count === 2',
    'setCount(n => n + 1)  // → 3',
    'setCount(10)          // → 10',
    'setCount(n => n * 2)  // → 20',
    '```',
    '',
    '这三次调用期间函数里的 count 仍是 2；下一次渲染才是 20。',
  ].join('\n'),

  'es6-default-param-call-time': [
    '默认参数每次调用都会重新求值：',
    '',
    '```js',
    'function push(item, bucket = []) {',
    '  bucket.push(item)',
    '  return bucket',
    '}',
    'push("a")                 // ["a"]',
    'push("b")                 // ["b"]，不是 ["a","b"]',
    'push("c", undefined)      // 仍新建数组',
    'push("d", null)           // TypeError：null.push',
    '```',
  ].join('\n'),

  'es6-destructure-copies': [
    '解构拷贝顶层；嵌套对象仍共享引用：',
    '',
    '```js',
    'const order = { price: 10, item: { sku: "A1" } }',
    'const { price = 1, item } = order',
    'order.price = 20',
    'price                     // 仍是 10',
    'item.sku = "B2"',
    'order.item.sku            // 也是 "B2"',
    '```',
    '',
    '默认值只在缺失时生效：`price: null` 得到 null，`price: 0` 得到 0。',
  ].join('\n'),

  'es6-for-of-iterable': [
    'for...of 走可迭代协议，for...in 走可枚举键：',
    '',
    '```js',
    'const list = [10, 20]',
    'for (const n of list) { /* 10, 20 */ }',
    'for (const key in list) { /* "0", "1" */ }',
    'Array.prototype.extra = 1',
    'for (const key in list) { /* 还会走到 "extra" */ }',
    'for (const n of list) { /* 仍是 10, 20 */ }',
    '// for (const x of { a: 1 }) → TypeError：不可迭代',
    '```',
  ].join('\n'),

  'es6-rest-spread-position': [
    '剩余参数与展开的位置决定拷贝深度：',
    '',
    '```js',
    'function total(tax, ...prices) {',
    '  return prices.map((n) => n + tax)',
    '}',
    'total(1, 10, 20)           // prices 是 [10, 20]',
    'total(1, ...[10, 20])      // 相同',
    'const copy = [...items]',
    'copy[0].sku = "X"          // items[0].sku 一起变（浅拷贝）',
    'const next = { ...a, id: 2 } // 同名键以后面为准',
    '```',
  ].join('\n'),

  'es6-template-expression': [
    '模板表达式先 ToString，不是自动取字段：',
    '',
    '```js',
    'const order = { id: "A1" }',
    '`${order}`                 // "[object Object]"',
    '`${order.id}`              // "A1"',
    '`${[1, 2]}`                // "1,2"',
    '`${null}`                  // "null"',
    '// tag`${order}` 的插值参数是 order 对象本身',
    '```',
  ].join('\n'),

  'js-microtask-vs-macrotask': [
    '微任务在定时器之前清空：',
    '',
    '```js',
    'console.log(1)',
    'Promise.resolve().then(() => console.log(2))',
    'setTimeout(() => console.log(3), 0)',
    '// 顺序固定：1、2、3',
    '```',
    '',
    '把大量计算塞进 then，帧会卡在 2 跑完之前。',
  ].join('\n'),

  'js-optional-chaining': [
    '?. 遇 null/undefined 短路；?? 只替换 null/undefined：',
    '',
    '```js',
    'const name = res?.user?.name ?? "游客"',
    '// res 为 null → "游客"',
    '// res.user.name 为 "" → ""（不是游客）',
    '```',
    '',
    'fetch 失败仍应进 catch，不要写成 `(await fetch(...))?.ok` 就当成功。',
  ].join('\n'),

  'js-prototype-chain': [
    '字段在实例上，方法在原型上共用：',
    '',
    '```js',
    'class Counter {',
    '  n = 0',
    '  inc() { this.n++ }',
    '}',
    'const a = new Counter()',
    'const b = new Counter()',
    'a.inc === b.inc            // true：同一函数',
    'Counter.prototype.inc = function () { this.n += 10 }',
    '// 之后 a.inc() / b.inc() 都加 10',
    '```',
  ].join('\n'),

  'js-class-extends-super': [
    '派生类构造里先 super，再碰 this：',
    '',
    '```js',
    'class Animal {',
    '  constructor(n) { this.n = n }',
    '}',
    'class Dog extends Animal {',
    '  constructor(n) {',
    '    super(n)',
    '    this.bark = true',
    '  }',
    '}',
    '// 去掉 super 先写 this.bark → 报错',
    '```',
  ].join('\n'),

  'js-generator-yield-pause': [
    'yield 暂停；每次 for-of 会重新取迭代器：',
    '',
    '```js',
    'function* count() {',
    '  yield 1',
    '  yield 2',
    '}',
    'const g = count()',
    'g.next()                   // { value: 1, done: false }',
    'g.next()                   // { value: 2, done: false }',
    'for (const n of count()) { /* 每次重新开始 */ }',
    '// 同一个 g 再 for-of：立刻结束',
    '```',
  ].join('\n'),

  'js-proxy-get-set-trap': [
    '陷阱只拦经过代理的访问：',
    '',
    '```js',
    'const t = { n: 0 }',
    'const p = new Proxy(t, {',
    '  set(obj, key, val) {',
    '    console.log(key)',
    '    obj[key] = val',
    '    return true',
    '  },',
    '})',
    'p.n = 1                    // 打印 "n"',
    't.n = 2                    // 不打印',
    '```',
    '',
    '把 p 交给组件、却把 t 存进全局，响应式会丢。',
  ].join('\n'),

  'js-timer-fn-not-string': [
    '定时器传函数，不要传字符串：',
    '',
    '```js',
    '// 差：到点再解析全局名',
    'setInterval("clock()", 1000)',
    '',
    '// 好：闭包持有函数，卸载时清掉',
    'const id = setInterval(() => clock(), 1000)',
    'clearInterval(id)',
    '```',
  ].join('\n'),

  'js-scope-tdz': [
    '块级声明在执行到声明前不可读：',
    '',
    '```js',
    '{',
    '  // console.log(x)  // ReferenceError：暂时性死区',
    '  let x = 1',
    '  console.log(x)           // 1',
    '}',
    'function f() {',
    '  console.log(y)           // undefined（var 提升）',
    '  var y = 1',
    '}',
    '```',
  ].join('\n'),

  'controlled-input': [
    '受控输入的权威在 state，不在 DOM：',
    '',
    '```jsx',
    '<input',
    '  value={draft}',
    '  onChange={(e) => setDraft(e.target.value)}',
    '/>',
    '// 提交用 draft；成功后 setDraft(响应值) 或离开编辑态',
    '```',
  ].join('\n'),

  identity: [
    'key 决定状态跟谁走：',
    '',
    '```jsx',
    '// 稳定身份',
    'items.map((row) => <Row key={row.id} row={row} />)',
    '// 下标：重排后 state 留在位置上',
    'items.map((row, i) => <Row key={i} row={row} />)',
    '```',
    '',
    '两项键原为 a、b 并各自输入不同文字；顺序变成 b、a 后，稳定键文字跟着人走，下标键则 a 的字留在第一行。',
  ].join('\n'),

  effects: [
    '切换 id 时忽略过期响应：',
    '',
    '```js',
    'useEffect(() => {',
    '  let cancelled = false',
    '  fetchOrder(id).then((data) => {',
    '    if (!cancelled) setOrder(data)',
    '  })',
    '  return () => { cancelled = true }',
    '}, [id])',
    '```',
    '',
    '从 42 切到 43 且 42 更慢：有清理则屏幕停在 43；无清理则后到的 42 会盖住。依赖写成 [] 时切换 id 不会再请求。',
  ].join('\n'),

  'react-setstate-batch': [
    '同一事件里的多次更新会批进一次渲染：',
    '',
    '```js',
    'function onClick() {',
    '  setCount((c) => c + 1)',
    '  setCount((c) => c + 1)',
    '  // 一次渲染里累加两次',
    '}',
    '```',
    '',
    '放到 Promise 回调里，在 React 18+ 仍可能批处理，不能拿“异步就不批”当规律。',
  ].join('\n'),

  'ts-unknown': [
    '入口收 unknown，收窄后再当业务类型用：',
    '',
    '```ts',
    'function parseUser(input: unknown): User | Error {',
    '  if (!input || typeof input !== "object") return new Error("shape")',
    '  const id = (input as { id?: unknown }).id',
    '  if (typeof id !== "string") return new Error("id")',
    '  return { id }',
    '}',
    '```',
    '',
    '收到 `{id:1}` 应返回错误；`{id:"u1"}` 通过后才构造 User。',
  ].join('\n'),

  'ts-satisfies': [
    'satisfies 核对形状并保留字面量键：',
    '',
    '```ts',
    'const colors = {',
    '  primary: "#09f",',
    '  danger: "#f00",',
    '} satisfies Record<string, string>',
    'colors.primary              // 仍是具体键',
    '// colors.primry → 仍报错',
    '```',
  ].join('\n'),

  'formdata-multipart-upload': [
    '让浏览器自己带 multipart 边界：',
    '',
    '```js',
    'const fd = new FormData()',
    'fd.append("file", fileInput.files[0])',
    'fd.append("title", title)',
    'await fetch("/upload", { method: "POST", body: fd })',
    '// 不要再写 Content-Type: multipart/form-data',
    '```',
  ].join('\n'),

  'html5-pushstate-popstate': [
    'pushState 改地址但不卸载文档；后退才有 popstate：',
    '',
    '```js',
    'window.addEventListener("popstate", (e) => {',
    '  console.log(e.state)',
    '})',
    'history.pushState({ id: "2" }, "", "/orders/2")',
    '// 此刻不会触发 popstate',
    '// 用户后退 → popstate，state 回到上一份',
    '```',
    '',
    '`pushState` 不能跨源；`replaceState` 不应增加 `history.length`。',
  ].join('\n'),

  'java-arrays-aslist-fixed': [
    'Arrays.asList 是固定大小的数组视图：',
    '',
    '```java',
    'String[] ids = {"a", "b"};',
    'List<String> view = Arrays.asList(ids);',
    'view.set(0, "x");           // 会改 ids[0]',
    '// view.add("y");          // 失败（不支持）',
    '```',
  ].join('\n'),

  'java-foreach-remove-cme': [
    '增强 for 里直接 remove 会 CME：',
    '',
    '```java',
    '// 差',
    'for (String s : list) {',
    '  if (s.equals("a")) list.remove(s); // ConcurrentModificationException',
    '}',
    '// 好',
    'Iterator<String> it = list.iterator();',
    'while (it.hasNext()) {',
    '  if (it.next().equals("a")) it.remove();',
    '}',
    '```',
  ].join('\n'),

  'java-switch-arrow-no-fall': [
    '冒号 case 会贯穿；箭头 case 不会：',
    '',
    '```java',
    'switch (n) {',
    '  case 1: System.out.print("a");',
    '  case 2: System.out.print("b");',
    '} // n==1 打印 ab',
    '',
    'switch (n) {',
    '  case 1 -> "a";',
    '  case 2 -> "b";',
    '  default -> "z";',
    '} // n==1 只得到 "a"',
    '```',
  ].join('\n'),

  'java-wait-sleep': [
    'wait 释放监视器；sleep 仍持锁：',
    '',
    '```java',
    'synchronized (queue) {',
    '  while (empty) queue.wait(); // 等待时可被 notify',
    '}',
    '// 持锁时 Thread.sleep(1000)：别人进不了同一临界区',
    '```',
  ].join('\n'),

  'ts-narrowing': [
    '判别字段 + default 赋给 never，逼出未处理成员：',
    '',
    '```ts',
    'type Result =',
    '  | { kind: "ok"; data: string }',
    '  | { kind: "error"; message: string }',
    '  // | { kind: "loading" }  // 新增后 default 会炸',
    '',
    'function view(r: Result) {',
    '  switch (r.kind) {',
    '    case "ok": return r.data',
    '    case "error": return r.message',
    '    default: {',
    '      const _exhaustive: never = r',
    '      return _exhaustive',
    '    }',
    '  }',
    '}',
    '```',
  ].join('\n'),

  'ts-generics': [
    '泛型保留输入输出关系；any 会切断：',
    '',
    '```ts',
    'function firstAny(items: any[]) { return items[0] }',
    'firstAny(["ab"]).toUpperCase // 不检查',
    '',
    'function first<T>(items: T[]): T | undefined {',
    '  return items[0]',
    '}',
    'const s = first(["ab"]) // string | undefined',
    '```',
  ].join('\n'),

  'ts-structural': [
    '结构兼容 vs 新鲜字面量的额外属性检查：',
    '',
    '```ts',
    'function greet(p: { name: string }) {}',
    'const person = { name: "a", age: 1 }',
    'greet(person)                 // 通过：多字段 OK',
    '// greet({ name: "a", nmae: "b" }) // 字面量报错',
    '```',
  ].join('\n'),

  'ts-const-readonly': [
    'const 锁绑定；readonly 锁字段：',
    '',
    '```ts',
    'const config = { title: "A" }',
    'config.title = "B"            // 可以',
    '// config = { title: "C" }    // 报错',
    'type Cfg = { readonly title: string }',
    'const c: Cfg = { title: "A" }',
    '// c.title = "B"              // 编译期报错',
    '```',
  ].join('\n'),

  'ts-template-literal-types': [
    '模板字面量类型只约束编译期字符串：',
    '',
    '```ts',
    'type ApiPath = `/api/${"user" | "order"}`',
    'const ok: ApiPath = "/api/user"',
    '// const bad: ApiPath = "/api/users" // 报错',
    '```',
  ].join('\n'),

  'query-invalidate': [
    'mutation 成功后按键失效，相关查询重拉：',
    '',
    '```js',
    'await updateOrder(id, body)',
    'queryClient.invalidateQueries({ queryKey: ["orders"] })',
    '// ["orders"]、["orders", id] 等前缀匹配的都会重拉',
    '```',
  ].join('\n'),

  'query-server-state': [
    '服务器状态放进查询缓存，不要另抄一份数组：',
    '',
    '```js',
    'useQuery({',
    '  queryKey: ["orders", status],',
    '  queryFn: () => api.listOrders(status),',
    '})',
    '// mutation 成功后 invalidate ["orders"]，而不是 push 进本地 state',
    '```',
  ].join('\n'),

  'query-fn-calls-the-client': [
    'queryFn 里调用客户端，并接上 signal：',
    '',
    '```js',
    'queryFn: async ({ signal }) => {',
    '  const response = await fetch("/api/orders/1", { signal })',
    '  if (!response.ok) throw new Error(String(response.status))',
    '  return response.json()',
    '}',
    '// Axios: api.get("/orders/1", { signal }).then(r => r.data)',
    '```',
  ].join('\n'),

  suspense: [
    'lazy + Suspense 只管代码加载，不管 effect 请求：',
    '',
    '```jsx',
    'const Editor = lazy(() => import("./Editor"))',
    '<Suspense fallback={<p>加载中</p>}>',
    '  <Editor />',
    '</Suspense>',
    '// 同页 useEffect 拉详情：fallback 不会因此出现',
    '```',
  ].join('\n'),

  'vue-reactivity': [
    '改代理触发依赖；改原对象不走拦截：',
    '',
    '```js',
    'const raw = { count: 0 }',
    'const state = reactive(raw)',
    'state.count++               // 触发依赖',
    'raw.count++                 // 不走代理',
    '```',
  ].join('\n'),

  'vue-computed-watch': [
    '派生用 computed；异步副作用用 watch：',
    '',
    '```js',
    'const total = computed(() => price.value * count.value)',
    '// price=20,count=3 → 60；count=4 → 80，无需另存 total',
    '',
    'watch(keyword, async (q, _, onCleanup) => {',
    '  const ctrl = new AbortController()',
    '  onCleanup(() => ctrl.abort())',
    '  const data = await search(q, ctrl.signal)',
    '  // 过期响应不要写回',
    '})',
    '```',
  ].join('\n'),

  'vue-array-raw-proxy': [
    '数组也要经过代理写入：',
    '',
    '```js',
    'const raw = [1, 2, 3]',
    'const list = reactive(raw)',
    'list.push(4)                // 触发依赖',
    'raw.push(5)                 // 不触发；proxy 仍可能读到 5',
    '```',
  ].join('\n'),

  'react-memo-when': [
    'memo 只在 props 浅相等时跳过；新函数引用会破功：',
    '',
    '```jsx',
    '// 差：每次父渲染都是新 onClick',
    '<Child onClick={() => doSomething()} />',
    '// 好：稳定引用（或传原始值）',
    'const onClick = useCallback(() => doSomething(), [])',
    '<Child onClick={onClick} />',
    '```',
  ].join('\n'),

  'react-effect-timing': [
    '绘制前量布局用 layout effect；拉数用 effect：',
    '',
    '```js',
    'useLayoutEffect(() => {',
    '  const h = ref.current.getBoundingClientRect().height',
    '  setParentHeight(h)        // 避免先闪错误高度',
    '}, [child])',
    'useEffect(() => { fetchDetail(id) }, [id])',
    '```',
  ].join('\n'),

  'java-concurrent-map': [
    '先 get 再 put 不是原子的；用 computeIfAbsent：',
    '',
    '```java',
    '// 差：两线程都看到 null，各 new 一次',
    'if (map.get(key) == null) {',
    '  map.put(key, createConn());',
    '}',
    '// 好',
    'map.computeIfAbsent(key, k -> createConn());',
    '```',
  ].join('\n'),

  'java-equals-contract': [
    'equals 与 hashCode 必须一起守契约：',
    '',
    '```java',
    '// 只改 equals、hash 不同：HashSet 放得进两个“相等”键',
    '// 补上相同 hash 后，第二个视为已存在，size==1，能 get 到',
    'Set<Id> set = new HashSet<>();',
    'set.add(new Id(1));',
    'set.add(new Id(1)); // 契约正确时 size 仍为 1',
    '```',
  ].join('\n'),

  'java-optional': [
    'orElse 总会求值；orElseGet 惰性：',
    '',
    '```java',
    'Optional.of(1).orElse(expensive());      // 仍调用',
    'Optional.of(1).orElseGet(() -> expensive()); // 不调用',
    'Optional.empty().orElseGet(() -> expensive()); // 会调用',
    '```',
  ].join('\n'),

  'java-generics': [
    '泛型参数编译期擦除；instanceof 不能写具体参数：',
    '',
    '```java',
    'List<String> names = new ArrayList<>();',
    'List<?> any = names;                     // 可以',
    '// if (names instanceof List<String>) {} // 编译失败',
    '// 运行时 names.getClass() 仍是 ArrayList',
    '```',
  ].join('\n'),

  'java-synchronized-monitor': [
    '实例方法锁 this；静态方法锁 Class：',
    '',
    '```java',
    'synchronized void inc() { /* 锁 this */ }',
    'static synchronized void global() { /* 锁 Xxx.class */ }',
    '// 两个不同实例可同时进入各自的 inc()',
    '```',
  ].join('\n'),

  'java-thread-start-run': [
    'run 在调用线程执行；start 才新建线程：',
    '',
    '```java',
    'Thread t = new Thread(() ->',
    '  System.out.println(Thread.currentThread().getName()));',
    't.run();   // 打印主线程名',
    't.start(); // 新线程再跑一遍',
    't.join();',
    '```',
  ].join('\n'),

  'java-dcl-volatile-enum': [
    '双重检查需要 volatile，或改用枚举：',
    '',
    '```java',
    'private static volatile Singleton instance;',
    'public static Singleton get() {',
    '  if (instance == null) {',
    '    synchronized (Singleton.class) {',
    '      if (instance == null) instance = new Singleton();',
    '    }',
    '  }',
    '  return instance;',
    '}',
    '// 枚举常量可避免手写这套检查',
    '```',
  ].join('\n'),

  'java-future-errors': [
    'whenComplete 不吞异常；exceptionally 才给替代值：',
    '',
    '```java',
    'CompletableFuture.supplyAsync(() -> {',
    '  throw new IllegalStateException("x");',
    '})',
    '.whenComplete((v, e) -> System.out.println(e))',
    '.join(); // 仍抛',
    '',
    '// .exceptionally(e -> 0).join() → 0',
    '```',
  ].join('\n'),

  'java-thread-local-leak': [
    '池线程用完必须 remove：',
    '',
    '```java',
    'try {',
    '  USER.set("A");',
    '  handle();',
    '} finally {',
    '  USER.remove();',
    '}',
    '// 不 remove：同线程下一个任务可能 get 到 "A"',
    '```',
  ].join('\n'),

  'hashmap-initial-16-not-max': [
    '默认容量 16，负载因子 0.75，不是“最多 16 个键”：',
    '',
    '```java',
    'Map<Integer, Integer> m = new HashMap<>();',
    '// 第 1 个键后 table.length == 16',
    '// 第 12 个仍是 16；第 13 个超过阈值 12 → 扩到 32',
    '```',
  ].join('\n'),

  'java-record-accessor': [
    '取值方法是括号里的名字，不是 getXxx：',
    '',
    '```java',
    'public record Money(long cents, String currency) {}',
    'var a = new Money(100, "CNY");',
    'var b = new Money(100, "CNY");',
    'a.equals(b);                 // true',
    'a.cents();                   // 不是 getCents()',
    '```',
  ].join('\n'),

  cors: [
    '跨源读响应看的是服务器允许头，不是请求发出去没有：',
    '',
    '```http',
    'GET /api/orders HTTP/1.1',
    'Origin: https://app.example',
    '',
    '# 若响应没有 Access-Control-Allow-Origin: https://app.example',
    '# Network 能看见请求，脚本仍读不到 JSON',
    '```',
  ].join('\n'),

  'cors-credentials-allowlist': [
    '带 Cookie 时 Origin 必须是明确名单，不能反射任意源：',
    '',
    '```http',
    'Access-Control-Allow-Origin: https://app.example',
    'Access-Control-Allow-Credentials: true',
    '# 不要把请求里的 Origin 原样回写给任意站',
    '```',
  ].join('\n'),

  'fetch-credentials': [
    '跨源带 Cookie 要 credentials + 明确允许源：',
    '',
    '```js',
    'await fetch("https://api.example/me", {',
    '  credentials: "include",',
    '})',
    '// 响应须 Allow-Origin: https://app.example 且 Allow-Credentials',
    '```',
  ].join('\n'),

  'fetch-abort': [
    '快速切换查询时 abort，并丢弃过期序号：',
    '',
    '```js',
    'let seq = 0',
    'let ctrl',
    'async function search(q) {',
    '  ctrl?.abort()',
    '  ctrl = new AbortController()',
    '  const my = ++seq',
    '  const data = await fetch(`/s?q=${q}`, { signal: ctrl.signal }).then(r => r.json())',
    '  if (my !== seq) return // 迟到的 A 不写界面',
    '  setResult(data)',
    '}',
    '```',
  ].join('\n'),

  'fetch-platform-client': [
    'HTTP 错误不拒绝；断网才拒绝：',
    '',
    '```js',
    'const r = await fetch("/orders/404")',
    'r.ok                         // false',
    'r.status                     // 404；then 链仍继续',
    '// 拔网线：Promise 拒绝，没有 status',
    'const body = await r.json()  // 另一次异步完成',
    '```',
  ].join('\n'),

  'fetch-response-body-once': [
    '响应体只能消费一次；要两份就 clone：',
    '',
    '```js',
    'const r = await fetch(url)',
    'const t = await r.text()',
    '// await r.json()            // 失败：body 已读',
    'const r2 = r.clone()',
    'await Promise.all([r.text(), r2.json()])',
    '```',
  ].join('\n'),

  'fetch-method-body-timeout': [
    'POST JSON 时写清 method、类型、body 与超时：',
    '',
    '```js',
    'await fetch("/orders", {',
    '  method: "POST",',
    '  headers: { "Content-Type": "application/json" },',
    '  body: JSON.stringify({ sku: "A1" }),',
    '  signal: AbortSignal.timeout(8000),',
    '})',
    '// 204 时不要再 json()',
    '```',
  ].join('\n'),

  'http-content-type-body': [
    'JSON 手写 Content-Type；FormData 交给浏览器：',
    '',
    '```js',
    'fetch(url, {',
    '  method: "POST",',
    '  headers: { "Content-Type": "application/json" },',
    '  body: JSON.stringify({ a: 1 }),',
    '})',
    '// FormData 上传时删掉手写 multipart Content-Type',
    '```',
  ].join('\n'),

  'axios-rejects-http-errors': [
    'Axios 把非 2xx 送进 catch；数据在 data 里：',
    '',
    '```js',
    'const { data } = await axios.get("/orders/1")',
    'data.id',
    'try {',
    '  await axios.get("/orders/missing")',
    '} catch (error) {',
    '  error.response.status      // 404',
    '  error.response.data        // 服务器错误 JSON',
    '}',
    '```',
  ].join('\n'),

  'http-cache': [
    '带哈希的静态资源可长缓存；HTML 应用验证：',
    '',
    '```http',
    '# app.8f3a.js',
    'Cache-Control: public, max-age=31536000, immutable',
    '# index.html',
    'Cache-Control: no-cache',
    '# 未变化 → 304，正文仍用本地副本',
    '```',
  ].join('\n'),

  'cookie-credential': [
    'HttpOnly Cookie 自动上请求头，脚本读不到：',
    '',
    '```http',
    'Set-Cookie: sid=...; HttpOnly; Secure; SameSite=Lax',
    '```',
    '',
    '```js',
    'document.cookie               // 没有 sid',
    '// 若改存 localStorage：请求不会自动带，XSS 却能读出',
    '```',
  ].join('\n'),

  'browser-storage': [
    'storage 事件只通知其它标签，不通知自己：',
    '',
    '```js',
    'window.addEventListener("storage", (e) => {',
    '  if (e.key === "theme") applyTheme(e.newValue)',
    '})',
    'localStorage.setItem("theme", "dark")',
    '// 当前页必须自己改界面；其它同源标签才收到事件',
    '```',
  ].join('\n'),

  'html-dialog-modal': [
    '模态对话框用 showModal，不要只盖一层 div：',
    '',
    '```js',
    'dialog.showModal()',
    '// Tab 焦点困在对话框内；Esc → cancel',
    'dialog.close("ok")',
    '```',
  ].join('\n'),

  'html5-dataset-string': [
    'dataset 全是字符串：',
    '',
    '```html',
    '<button data-user-id="42" data-count="3">',
    '```',
    '',
    '```js',
    'button.dataset.userId        // "42"',
    'button.dataset.count + 1     // "31"',
    'Number(button.dataset.count) + 1 // 4',
    '```',
  ].join('\n'),

  'bfcache-pageshow': [
    '后退可能走往返缓存，用 pageshow.persisted 判断：',
    '',
    '```js',
    'window.addEventListener("pageshow", (e) => {',
    '  if (e.persisted) revalidateCart() // 不是等 load',
    '})',
    '```',
  ].join('\n'),

  'http-status-auth': [
    '401 要身份；403 已认证但无权限；400 指字段：',
    '',
    '```http',
    '# 无会话访问管理接口',
    '401 Unauthorized',
    '# 普通用户停用账号',
    '403 Forbidden',
    '# 字段不合法',
    '400 Bad Request  （不要用 200 塞错误）',
    '```',
  ].join('\n'),

  'spring-transaction': [
    '代理调用才开事务；this.audit() 不走代理：',
    '',
    '```java',
    '@Transactional',
    'public void create(Order o) {',
    '  orderRepo.save(o);',
    '  stockRepo.deduct(o.getSku());',
    '  this.audit(o); // 注解不生效：自调用',
    '}',
    '```',
  ].join('\n'),

  'spring-aop-self-invocation': [
    'REQUIRES_NEW 也要经另一个 Bean 调用：',
    '',
    '```java',
    'public void save(Order o) {',
    '  orderRepo.save(o);',
    '  this.sendEvent(o); // @Transactional(REQUIRES_NEW) 不会新开',
    '}',
    '// 改成 eventPublisher.publish(o)',
    '```',
  ].join('\n'),

  'spring-mvc-restcontroller': [
    'RestController 返回值即 JSON；用户身份取自本次请求：',
    '',
    '```java',
    '@RestController',
    'class OrderController {',
    '  @GetMapping("/orders/{id}")',
    '  OrderResponse get(@PathVariable long id, @AuthenticationPrincipal User u) {',
    '    return service.find(id, u.id());',
    '  }',
    '  // 不要把当前用户 id 放进控制器实例字段',
    '}',
    '```',
  ].join('\n'),

  'spring-filter-vs-interceptor': [
    'Filter 在 Servlet 前；Interceptor 在 DispatcherServlet 内：',
    '',
    '```text',
    '请求 → Filter 链（可挡未登录）',
    '     → Servlet / DispatcherServlet',
    '     → Interceptor.preHandle → Controller',
    '     → Interceptor.afterCompletion',
    '```',
  ].join('\n'),

  'spring-ioc-wiring': [
    '单实现可构造器注入；多实现要标明：',
    '',
    '```java',
    '@Service',
    'class OrderService {',
    '  OrderService(InventoryClient inventory) { ... }',
    '}',
    '// 两个 InventoryClient 实现时用 @Qualifier / @Primary',
    '```',
  ].join('\n'),

  'mybatis-parameters': [
    '#{} 是参数占位；${} 是字符串拼进 SQL：',
    '',
    '```xml',
    '<!-- 安全：1 OR 1=1 仍是一个参数值 -->',
    'select * from t where id = #{id}',
    '<!-- 危险：列名被直接拼进语句 -->',
    'order by ${sort}',
    '```',
  ].join('\n'),

  'mybatis-pagehelper-next-query': [
    'startPage 只影响紧接着的那一次查询：',
    '',
    '```java',
    'PageHelper.startPage(1, 10);',
    'dictMapper.findAll();   // 带 LIMIT',
    'orderMapper.list();     // 没有 LIMIT',
    '// 把 startPage 挪到 list 前；跳过查询时记得 clearPage',
    '```',
  ].join('\n'),

  'mybatis-log-preparing-parameters': [
    'Mapper 包 debug 才能看到 Preparing / Parameters：',
    '',
    '```properties',
    'logging.level.com.example.order.mapper=debug',
    '```',
    '',
    '```text',
    'Preparing: select ... where id=?',
    'Parameters: 42(Long)',
    '```',
  ].join('\n'),

  'jpa-modifying-clear': [
    '批量更新后清掉持久化上下文，再 find 才查库：',
    '',
    '```java',
    '@Modifying(clearAutomatically = true)',
    '@Query("update Order o set o.status = :s where o.id = :id")',
    'int updateStatus(long id, String s);',
    '// 之后 find 会重新查库，不会读到旧快照',
    '```',
  ].join('\n'),

  'jpa-cascade-orphan': [
    'orphanRemoval 删的是集合里拿掉的子行，不是随意级联商品：',
    '',
    '```java',
    '@OneToMany(mappedBy = "order", orphanRemoval = true)',
    'List<OrderItem> items;',
    '// items.remove(line); flush → 明细行删除',
    '// Order.product 只存 product_id 时，删订单不删商品',
    '```',
  ].join('\n'),

  'redis-lock-setnx-expire-race': [
    '锁要用一条 SET 同时写 NX 与 EX，不要拆成 SETNX+EXPIRE：',
    '',
    '```redis',
    'SET lock:order:1 <uuid> NX EX 30',
    '# 崩溃也会在 30s 后过期',
    '# 释放：Lua 比较 uuid 再 DEL，避免删掉别人的锁',
    '```',
  ].join('\n'),

  'redis-lua-atomic': [
    '扣库存用脚本一次判断，避免 GET 与 SET 之间的缝：',
    '',
    '```lua',
    '-- KEYS[1]=库存键',
    'local n = tonumber(redis.call("GET", KEYS[1]) or "0")',
    'if n < 1 then return 0 end',
    'redis.call("DECR", KEYS[1])',
    'return 1',
    '```',
  ].join('\n'),

  'redis-pipeline': [
    'Pipeline 省往返，不保证命令之间不被插队：',
    '',
    '```js',
    'const p = redis.pipeline()',
    'for (const k of keys) p.get(k)',
    'await p.exec()               // ~1 次往返',
    '// 扣库存不要 pipeline 里 GET 再 SET；要原子用 Lua / WATCH',
    '```',
  ].join('\n'),

  'redis-pubsub-pattern-subscribe': [
    'Pub/Sub 不存历史；离线期间的发布补不回来：',
    '',
    '```redis',
    'PSUBSCRIBE order.*',
    'PUBLISH order.created {...}',
    '# 进程挂掉期间的消息，重启后拿不到',
    '# 要补投：XADD + 消费者组',
    '```',
  ].join('\n'),

  'redis-stream-vs-pubsub': [
    'Stream 可重读；Pub/Sub 离线即丢：',
    '',
    '```redis',
    'XADD orders * user 1 amount 9',
    'XREADGROUP GROUP cg1 c1 COUNT 1 STREAMS orders >',
    'XACK orders cg1 <id>',
    '# PUBLISH kick {...}：离线订阅者无 ID 可补',
    '```',
  ].join('\n'),

  'redis-stream-xtrim-bound': [
    '用近似 MAXLEN 限制 Stream 体积：',
    '',
    '```redis',
    'XADD orders MAXLEN ~ 10000 * user 1',
    'XTRIM orders MAXLEN ~ 10000',
    '# 条数 ≈ 峰值写入速率 × 保留窗口',
    '```',
  ].join('\n'),

  'redis-single-thread': [
    'KEYS 会堵住同实例上的其它命令；改用 SCAN：',
    '',
    '```redis',
    '# 差：KEYS order:* 扫完前，旁边的 GET 都要等',
    'SCAN 0 MATCH order:* COUNT 100',
    '# 对账放到从库跑，避免堵主库写路径',
    '```',
  ].join('\n'),

  'redis-hash-field-update': [
    'Hash 可改单字段；String 存 JSON 要整串重写：',
    '',
    '```redis',
    'HSET user:9 name Alice avatar a.png',
    'HSET user:9 name Bob          # 只改名',
    '# STRING 版：GET → 改 JSON → SET 整串',
    '```',
  ].join('\n'),

  'redis-multi-vs-lua-pick': [
    'WATCH/MULTI 是乐观冲突；读完再减用 Lua：',
    '',
    '```redis',
    'WATCH stock:1',
    'GET stock:1',
    'MULTI',
    'DECR stock:1',
    'EXEC                      # 被改过则失败，重读再试',
    '# 秒杀判断：EVAL 一次完成，避免 GET 与 DECR 之间的缝',
    '```',
  ].join('\n'),

  'mq-consume-idempotent-key': [
    '消费幂等靠库唯一键；Redis SETNX 不能当唯一真相：',
    '',
    '```sql',
    'INSERT INTO point_ledger(order_id, points) VALUES (?, ?);',
    '-- order_id 唯一：重投撞约束即可',
    '```',
    '',
    '```redis',
    '# 仅短时防抖，可 NX + EX；写库前崩溃不能只靠占位',
    'SET dedupe:order:9 1 NX EX 60',
    '```',
  ].join('\n'),

  'mq-delete-not-always-idempotent': [
    '终态删除可幂等；带副作用的 UPDATE 重放会超发：',
    '',
    '```sql',
    'DELETE FROM cart WHERE id = 9;   -- 再执行仍无该行',
    '-- 差：每次取消都 stock=stock+1',
    'UPDATE orders SET status = "cancelled", stock = stock + 1',
    'WHERE id = ? AND status = "paid";  -- 好：只从 paid 转一次',
    '```',
  ].join('\n'),

  'distributed-outbox': [
    '业务行与待发布事件同事务；消费端按事件号去重：',
    '',
    '```sql',
    'BEGIN;',
    'INSERT INTO orders ...;',
    'INSERT INTO outbox(event_id, payload, sent) VALUES (?, ?, 0);',
    'COMMIT;',
    '-- 发布成功但未标 sent 时崩溃 → 会再发一次；消费端按 event_id 去重',
    '```',
  ].join('\n'),

  'distributed-kafka-order': [
    '同键进同分区才谈顺序；失败不要先提交位点：',
    '',
    '```text',
    'key=order-9 → 分区 2：Created → Paid → Cancelled',
    'key=order-8 → 其它分区并行',
    '# 支付处理失败若先 commit offset，Cancel 可能越过 Paid',
    '```',
  ].join('\n'),

  'distributed-idempotent-key': [
    '去重行与扣减放进同一本地事务：',
    '',
    '```sql',
    'BEGIN;',
    'INSERT INTO processed(order_id, step) VALUES (?, "deduct");',
    '-- 唯一约束 (order_id, step)：第二次插入冲突则跳过 UPDATE',
    'UPDATE stock SET qty = qty - 1 WHERE sku = ? AND qty >= 1;',
    'COMMIT;',
    '```',
  ].join('\n'),

  idempotency: [
    '页面重试带同一幂等键；库唯一约束挡住双插：',
    '',
    '```http',
    'POST /orders',
    'Idempotency-Key: 7f3a...',
    '```',
    '',
    '```sql',
    'UNIQUE (idempotency_key)',
    '-- 第二次撞约束 → 读回第一张订单，库存只减一次',
    '```',
  ].join('\n'),

  'msw-http-mock': [
    '页面测断言界面结果，不是 fetch 调用次数：',
    '',
    '```js',
    'http.get("/api/orders/:id", () =>',
    '  HttpResponse.json({ id: "1", status: "paid" }),',
    ')',
    '// 断言屏幕出现 paid，而不是 spy 被调用了几次',
    '```',
  ].join('\n'),

  'test-mock-boundary': [
    '只 mock 网络边界；业务计算要真跑：',
    '',
    '```js',
    '// mock 支付 HTTP；不要 stub 掉折扣计算',
    'await render(<Checkout />)',
    'expect(screen.getByText("应付 ¥90")).toBeInTheDocument()',
    '```',
  ].join('\n'),

  'test-one-behavior': [
    '一个测试只问一个问题：',
    '',
    '```js',
    'test("重复幂等键只产生一行订单", async () => { ... })',
    'test("字段缺失返回 400", async () => { ... })',
    '// 不要塞进同一方法：前面失败会挡住后面的断言',
    '```',
  ].join('\n'),

  'playwright-user-journey': [
    '浏览器测一条用户路径；细分支留给单元测试：',
    '',
    '```js',
    'await page.goto("/orders")',
    'await page.getByRole("button", { name: "提交" }).click()',
    'await expect(page.getByText("已创建")).toBeVisible()',
    '// 不要 page.waitForTimeout(3000)',
    '```',
  ].join('\n'),

  'http-methods': [
    'DELETE 终态可幂等；创建 POST 要靠幂等键：',
    '',
    '```http',
    'DELETE /orders/9   → 204',
    'DELETE /orders/9   → 404 亦可（资源已不在）',
    'POST /orders + Idempotency-Key → 第二次返回同一订单号',
    '```',
  ].join('\n'),

  'http-patch-rfc5789': [
    'PATCH 描述修改；PUT 换整份表示：',
    '',
    '```http',
    'PATCH /profile',
    'Content-Type: application/merge-patch+json',
    '{"nickname":"Ada"}',
    '',
    'PUT /profile          # 整份替换',
    'GET /profile          # 查询',
    '```',
  ].join('\n'),

  'http-503-unavailable': [
    '503 表示暂时不可用且进程仍在听；杀进程不是 503：',
    '',
    '```http',
    'HTTP/1.1 503 Service Unavailable',
    'Retry-After: 30',
    '# 发布窗口：端口仍在听',
    '# 直接杀进程：连接被拒/重置，抓包里没有 503',
    '```',
  ].join('\n'),

  'http-create-post-not-put': [
    '无 id 创建用 POST；带 id 的 PUT 是替换：',
    '',
    '```http',
    'POST /orders',
    '{"sku":"A1"}',
    '→ 201 Location: /orders/9',
    '',
    'PUT /orders/9',
    '{...整份订单...}   # 覆盖，不是再插入',
    '```',
  ].join('\n'),

  'tcp-is-l4-not-http-handshake': [
    '先 TCP，再 TLS，最后才是 HTTP：',
    '',
    '```text',
    'TCP 三次握手 → TLS → GET /',
    '# 丢掉 SYN：没有 200/500，连接根本建不起来',
    '# 四次挥手是 TCP 断开，不是 HTTP 方法',
    '```',
  ].join('\n'),

  'mysql-binlog-format': [
    '先查版本与 binlog 开关，再谈格式：',
    '',
    '```sql',
    'SELECT VERSION(),',
    '       @@global.binlog_format,',
    '       @@session.binlog_format,',
    '       @@global.log_bin;',
    '```',
  ].join('\n'),

  'es-inverted-index': [
    '倒排是「词 → 文档号列表」，不是扫全表：',
    '',
    '```text',
    '词「手机」 → [doc1, doc5, doc9]',
    '查询只读这一项；改大小写后若分析器归一，仍落在同一项',
    '# keyword 精确过滤不要走会分词的 text 字段',
    '```',
  ].join('\n'),

  'es-lucene-not-btree': [
    'Lucene 倒排 + 分片并行，不是 B+ 树口诀：',
    '',
    '```text',
    '「耳机」→ postings…  （各分片各有一份）',
    'DELETE 成功 ≠ 立刻从搜索消失（要等 refresh）',
    '# 不要画一棵 MySQL 风格 B+ 树当 Lucene',
    '```',
  ].join('\n'),

  'es-filter-context': [
    '打分与过滤分开：过滤不产生 _score：',
    '',
    '```json',
    '{',
    '  "query": { "match": { "title": "蓝牙耳机" } },',
    '  "post_filter": { "range": { "price": { "lt": 300 } } }',
    '}',
    '```',
    '',
    '把价格塞进打分函数，便宜无关文档可能排到前面。',
  ].join('\n'),

  'es-refresh-visibility': [
    'index 成功不等于马上能搜到：',
    '',
    '```http',
    'PUT /p/_doc/1  → 201',
    'GET  /p/_doc/1  → 有正文（按 id 取）',
    'GET  /p/_search?q=title:x  → 刷新前 hits=0',
    'POST /p/_refresh',
    'GET  /p/_search?q=title:x  → hits=1',
    '```',
  ].join('\n'),

  'es-search-after': [
    '深翻页用 search_after，不用巨大 from：',
    '',
    '```json',
    '{',
    '  "size": 20,',
    '  "sort": [{ "_score": "desc" }, { "id": "asc" }],',
    '  "search_after": [12.3, "sku-88"]',
    '}',
    '```',
    '',
    '导出再用 point-in-time + search_after，不要 from=100000。',
  ].join('\n'),

  'es-aggregations': [
    '聚合在引擎内按桶计数，不要拉 1 万 hits 再 groupBy：',
    '',
    '```json',
    '{',
    '  "size": 0,',
    '  "query": { "range": { "created": { "gte": "now-1d" } } },',
    '  "aggs": { "by_status": { "terms": { "field": "status" } } }',
    '}',
    '```',
  ].join('\n'),

  'nginx-limit-req': [
    '按 IP 限速：超额直接 503，不要靠 reload 防火墙：',
    '',
    '```nginx',
    'limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;',
    'location /login {',
    '  limit_req zone=login burst=5 nodelay;',
    '}',
    '```',
  ].join('\n'),

  'nginx-upstream-passive': [
    '被动健康检查：连不上才摘，HTTP 500 默认仍可能打过去：',
    '',
    '```nginx',
    'upstream api {',
    '  server 10.0.0.1:8080 max_fails=3 fail_timeout=30s;',
    '  server 10.0.0.2:8080;',
    '}',
    '# 端口拒绝：失败累计后摘除；应用返回 500：默认继续分发',
    '```',
  ].join('\n'),

  'nginx-proxy-host': [
    '反代必须把浏览器 Host 传给上游：',
    '',
    '```nginx',
    'proxy_set_header Host              $host;',
    'proxy_set_header X-Forwarded-Proto $scheme;',
    'proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;',
    '# 不写 Host 时，上游常落到 default_server',
    '```',
  ].join('\n'),

  'nginx-ip-hash-session': [
    'ip_hash 粘滞出口 IP，不是分布式会话：',
    '',
    '```nginx',
    'upstream web {',
    '  ip_hash;',
    '  server 10.0.0.1;',
    '  server 10.0.0.2;',
    '}',
    '# 整栋楼一个 NAT → 全粘一台；登录态应放 Redis 再轮询',
    '```',
  ].join('\n'),

  'nginx-load-module': [
    '动态模块可在运行时 load_module，不必整机重编：',
    '',
    '```nginx',
    'load_module modules/ngx_http_image_filter_module.so;',
    '# nginx -t && nginx -s reload',
    '```',
  ].join('\n'),

  'nginx-static-cache-headers': [
    '带哈希的静态可长缓存；入口 HTML 要短缓存或再验证：',
    '',
    '```nginx',
    'location /assets/ {',
    '  expires 30d;',
    '  add_header Cache-Control "public, immutable";',
    '}',
    'location = /index.html {',
    '  add_header Cache-Control "no-cache";',
    '}',
    '```',
  ].join('\n'),

  'spring-security-filter-chain': [
    '先匹配路径再进控制器；健康检查勿挡死：',
    '',
    '```java',
    'http.authorizeHttpRequests(a -> a',
    '    .requestMatchers("/health").permitAll()',
    '    .requestMatchers("/orders/**").authenticated()',
    '    .anyRequest().denyAll());',
    '```',
  ].join('\n'),

  'spring-authn-authz': [
    '认证通过 ≠ 授权允许改别人的资源：',
    '',
    '```text',
    '匿名 → 401/登录（认证前）',
    '已登录读自己的单 → 200',
    '已登录停用他人账号无 ROLE_ADMIN → 403（进不了业务）',
    '```',
  ].join('\n'),

  'spring-oauth2-resource': [
    '资源服务器只验 Bearer，不负责登录页：',
    '',
    '```http',
    'GET /orders/1',
    'Authorization: Bearer <jwt>',
    '# 过期/签名错 → 401，不 302 到表单登录',
    '# 验签通过后仍要做对象级授权',
    '```',
  ].join('\n'),

  'spring-csrf-spa': [
    '跨站带 Cookie 的 POST 要 CSRF 或 SameSite：',
    '',
    '```http',
    'Set-Cookie: SESSION=...; SameSite=Lax; HttpOnly; Secure',
    '# 恶意站 POST /orders 带上 Cookie → 应失败',
    '```',
  ].join('\n'),

  'jwt-payload-not-encrypted': [
    'JWT 中间段是 Base64url，不是加密：',
    '',
    '```bash',
    'echo eyJzdWIiOiIxIiwiZXhwIjoxfQ | base64 -d',
    '# → {"sub":"1","exp":1} 明文可见',
    '# 换 HMAC 密钥后旧票全拒；踢单票要 jti 黑名单',
    '```',
  ].join('\n'),

  'password-adaptive-hash': [
    '同口令也要不同盐；慢哈希防批量撞库：',
    '',
    '```text',
    'userA: argon2id(saltA, password) → hashA',
    'userB: argon2id(saltB, password) → hashB  # 不同',
    '# 登录：取盐+参数重算再比；日志不写口令/哈希',
    '```',
  ].join('\n'),

  'gateway-route-predicate': [
    '谓词匹配后才跑过滤器；健康检查另开路由：',
    '',
    '```yaml',
    'spring.cloud.gateway.routes:',
    '  - id: orders',
    '    predicates: [Path=/orders/**]',
    '    filters: [Auth]',
    '  - id: health',
    '    predicates: [Path=/health]',
    '    # 无 Auth',
    '```',
  ].join('\n'),

  'gateway-retry-idempotent': [
    '只对安全方法自动重试；POST 用幂等键：',
    '',
    '```yaml',
    'filters:',
    '  - name: Retry',
    '    args:',
    '      methods: GET',
    '      retries: 1',
    '      statuses: BAD_GATEWAY,GATEWAY_TIMEOUT',
    '# POST /orders → 不要配 Retry；带 Idempotency-Key 再提交',
    '```',
  ].join('\n'),

  'algo-hash-lookup': [
    '两数之和：一次扫描 + 哈希表，不是双重循环：',
    '',
    '```js',
    'const need = 9, seen = new Map()',
    'for (const [i, n] of [2, 7, 11].entries()) {',
    '  if (seen.has(need - n)) return [seen.get(need - n), i]',
    '  seen.set(n, i)',
    '}',
    '```',
  ].join('\n'),

  'algo-two-pointers': [
    '有序数组两端相向；乱序不能先看两端：',
    '',
    '```js',
    'let l = 0, r = a.length - 1 // a 已排序',
    'while (l < r) {',
    '  const s = a[l] + a[r]',
    '  if (s === target) return [l, r]',
    '  if (s < target) l++; else r--',
    '}',
    '```',
  ].join('\n'),

  'algo-sliding-window': [
    '固定窗口：右进左出，O(n) 维护和：',
    '',
    '```js',
    'let sum = 0',
    'for (let r = 0; r < a.length; r++) {',
    '  sum += a[r]',
    '  if (r >= k - 1) {',
    '    // 窗口 [r-k+1, r] 的和是 sum',
    '    sum -= a[r - k + 1]',
    '  }',
    '}',
    '```',
  ].join('\n'),

  'algo-topo-kahn': [
    'Kahn：入度为 0 入队；剩点说明有环：',
    '',
    '```text',
    '边 A→B, A→C, B→D  → 可排出 A,B,C,D',
    '再加 D→A          → 队列空时结果 < |V|，报有环',
    '```',
  ].join('\n'),

  'jvm-oom-signals': [
    '先看异常名字，再决定加哪一块：',
    '',
    '```text',
    'java.lang.OutOfMemoryError: Java heap space     → -Xmx / 泄漏',
    'java.lang.OutOfMemoryError: Metaspace           → MaxMetaspaceSize',
    'java.lang.OutOfMemoryError: Direct buffer memory → 堆外/Netty',
    'java.lang.StackOverflowError                    → 栈深，不是 pc',
    '```',
  ].join('\n'),

  'jvm-thread-vs-heap-dump': [
    '卡住抓线程；涨内存抓堆——不要先抓错：',
    '',
    '```bash',
    'jcmd <pid> Thread.print          # 超时且 CPU 不高',
    'jcmd <pid> GC.heap_dump /tmp/a.hprof  # 回收后堆不回落',
    '# 先分清：请求卡住 vs 内存回不来',
    '```',
  ].join('\n'),

  'jvm-no-permgen-hotspot': [
    'JDK 8+ 没有永久代；类元数据看 Metaspace：',
    '',
    '```bash',
    'java -XX:MaxPermSize=128m -version   # 无效/已移除',
    'java -XX:MaxMetaspaceSize=256m ...   # 才设得住',
    '```',
  ].join('\n'),

  'jvm-cms-removed-g1-default': [
    'CMS 已移除；服务器模式默认常是 G1：',
    '',
    '```bash',
    'java -XX:+UseConcMarkSweepGC -version  # JDK 21 不可用',
    'java -XX:+UseG1GC -version             # 通常已是默认',
    '```',
  ].join('\n'),

  'jvm-jit-tiered': [
    '冷启动 P99 高 ≠ 业务回归；先预热再比：',
    '',
    '```text',
    '窗口 A：启动后 0–1s   → 含解释/编译',
    '窗口 B：预热后 30s    → 热点已编译',
    '# 只用 A 对比框架/DB，会把 JIT 当成回归',
    '```',
  ].join('\n'),

  'jvm-safepoint': [
    '停顿要等到齐安全点；纯紧循环可能拖长 TTSP：',
    '',
    '```text',
    '日志：Time to safepoint vs 真正清扫时间',
    '长计数循环不调方法 → TTSP 变长',
    '改成能走到安全点后 → TTSP 应下降',
    '```',
  ].join('\n'),

  'jvm-major-gc-not-always-full': [
    'CMS Initial Mark / G1 Mixed ≠ Full GC：',
    '',
    '```text',
    'CMS Initial Mark  → 并发标记阶段，不是 G1 Full',
    'G1 Mixed          → 只收部分老年代分区',
    'Full GC / to-space exhausted → 才按整堆处理',
    '```',
  ].join('\n'),

  'gha-workflow-in-dot-github': [
    '工作流必须在 `.github/workflows/`：',
    '',
    '```yaml',
    '# .github/workflows/ci.yml',
    'on: [push]',
    'jobs:',
    '  build:',
    '    runs-on: ubuntu-latest',
    '    steps: [{ run: echo ok }]',
    '# 挪到仓库根目录 → 这次 push 找不到工作流',
    '```',
  ].join('\n'),

  'gha-job-needs-success': [
    'needs 失败则下游默认跳过；always() 会强行跑：',
    '',
    '```yaml',
    'jobs:',
    '  test: { runs-on: ubuntu-latest, steps: [{ run: exit 1 }] }',
    '  deploy:',
    '    needs: test',
    '    # if: always()  # 打开后 test 失败仍跑 deploy',
    '    runs-on: ubuntu-latest',
    '    steps: [{ run: echo ship }]',
    '```',
  ].join('\n'),

  'gha-artifact-between-jobs': [
    '跨 job 传文件要 upload / download artifact：',
    '',
    '```yaml',
    'jobs:',
    '  make:',
    '    steps:',
    '      - run: echo 42 > out.txt',
    '      - uses: actions/upload-artifact@v4',
    '        with: { name: out, path: out.txt }',
    '  use:',
    '    needs: make',
    '    steps:',
    '      - uses: actions/download-artifact@v4',
    '        with: { name: out }',
    '      - run: cat out.txt',
    '```',
  ].join('\n'),

  'docker-layer-cache-copy': [
    '先装依赖再 COPY 源码，改代码才不重装：',
    '',
    '```dockerfile',
    'RUN apt-get update && apt-get install -y build-essential',
    'COPY main.c .',
    'RUN make',
    '# COPY 放 apt 前面 → 改一行 C 也会重装',
    '```',
  ].join('\n'),

  'compose-service-name-dns': [
    'Compose 里用服务名当主机名，不要记死 IP：',
    '',
    '```yaml',
    'services:',
    '  web: { environment: [DATABASE_URL=postgres://db:5432/app] }',
    '  db:  { image: postgres:16 }',
    '# 本机浏览器仍用 localhost:映射端口',
    '```',
  ].join('\n'),

  'docker-registry-not-just-repo-bucket': [
    'Registry / Repository / tag 三层拆开：',
    '',
    '```bash',
    'docker pull myharbor.example.com/team/api:1.2',
    '#          ^Registry 主机     ^Repository  ^tag',
    '```',
  ].join('\n'),

  'docker-multistage': [
    '多阶段：编译器只留在 builder，运行镜像只要产物：',
    '',
    '```dockerfile',
    'FROM maven:3.9 AS build',
    'COPY . . && mvn -q -DskipTests package',
    'FROM eclipse-temurin:21-jre',
    'COPY --from=build /app/target/app.jar /app.jar',
    '```',
  ].join('\n'),

  'k8s-deploy-not-lone-pod': [
    'Deployment 管副本；删 Pod 会拉回：',
    '',
    '```yaml',
    'apiVersion: apps/v1',
    'kind: Deployment',
    'spec:',
    '  replicas: 3',
    '  selector: { matchLabels: { app: nginx } }',
    '  template:',
    '    metadata: { labels: { app: nginx } }',
    '# 删其中一个 Pod → 很快又出现，总数回到 3',
    '```',
  ].join('\n'),

  'k8s-service-clusterip': [
    'ClusterIP 是集群内稳定入口：',
    '',
    '```yaml',
    'kind: Service',
    'metadata: { name: my-service }',
    'spec:',
    '  selector: { app.kubernetes.io/name: MyApp }',
    '  ports: [{ port: 80, targetPort: 9376 }]',
    '# 集群内：my-service:80 → 后端 Pod 轮换',
    '```',
  ].join('\n'),

  'k8s-ingress-needs-controller': [
    'Ingress 对象自己不开外网；要装控制器：',
    '',
    '```bash',
    'kubectl apply -f ingress.yaml',
    'kubectl describe ingress',
    '# 无 IngressClass 控制器 → ADDRESS 空，规则不生效',
    '```',
  ].join('\n'),

  'k8s-probes': [
    'startup 挡 liveness；readiness 挡流量：',
    '',
    '```yaml',
    'startupProbe:   { httpGet: { path: /readyz }, failureThreshold: 30 }',
    'livenessProbe:  { httpGet: { path: /healthz } }',
    'readinessProbe: { httpGet: { path: /ready } }',
    '# 预热 90s：startup 未过 → 不被 liveness 杀',
    '```',
  ].join('\n'),

  'k8s-memory-limit': [
    'limit 杀进程；request 只影响调度：',
    '',
    '```yaml',
    'resources:',
    '  requests: { memory: 256Mi }',
    '  limits:   { memory: 512Mi }',
    '# 堆应按 512Mi 估算，不要按节点 8Gi 写 -Xmx',
    '```',
  ].join('\n'),

  'sca-nacos-config': [
    '动态配置要读可绑定对象，不要抄进普通字段：',
    '',
    '```java',
    '@RefreshScope',
    '@ConfigurationProperties(\"order\")',
    'class OrderProps { int limit; }',
    '// 业务：每次 props.getLimit()',
    '// 坏：启动时 int limit = props.getLimit(); 之后只读字段',
    '```',
  ].join('\n'),

  'sca-feign-timeout-retry': [
    '客户端超时短于下游时，下游仍可能提交：',
    '',
    '```text',
    'Feign readTimeout=2s，库存 SQL=5s',
    '→ 调用方先超时；库存事务仍可能提交',
    '→ 无幂等键再重试 = 第二单',
    '```',
  ].join('\n'),

  'sca-sentinel-block': [
    '流控挡住的是入口，业务方法不应执行：',
    '',
    '```text',
    'QPS 阈值=1',
    '第 1 次 → 进入业务',
    '第 2 次 → BlockException / blockHandler，无业务日志',
    '# 在 blockHandler 里再调原方法 = 又打一次被限资源',
    '```',
  ].join('\n'),

  'sca-sentinel-circuit-state': [
    '半开探测失败会再次打开，不是规则丢了：',
    '',
    '```text',
    '慢调用比例超阈值 → Open（新请求不进下游）',
    '窗口结束 → Half-Open（放行 1 个探测）',
    '探测仍慢 → 再 Open',
    '```',
  ].join('\n'),

  'dubbo-timeout-retry-idempotent': [
    '默认 retries 会放大超时副作用：',
    '',
    '```text',
    'timeout=1s，提供方睡 3s 再 INSERT',
    'retries 默认 → 最多约 3 行插入日志',
    'retries=0   → 仍可能超时，但行数应为 1',
    '```',
  ].join('\n'),

  'sca-seata-at-boundary': [
    'AT 能回滚库，回不了已发出的短信：',
    '',
    '```text',
    '分支：扣库存 + 写订单 → 失败可按镜像撤销',
    '短信放进同一全局事务 → 库回滚后短信已发出',
    '→ 短信挪到全局提交成功之后，可重试发送',
    '```',
  ].join('\n'),

  'es-custom-routing': [
    '自定义 routing 决定文档落在哪片；读写要带同一值：',
    '',
    '```http',
    'PUT /orders/_doc/1?routing=user-7',
    '{ "user": "user-7", "amount": 9 }',
    '',
    'GET /orders/_doc/1?routing=user-7   # 能读到',
    'GET /orders/_doc/1                 # 可能去错片 → 找不到',
    '```',
  ].join('\n'),

  'es-mapping-reindex': [
    '改字段类型要新索引 + reindex + 别名切换：',
    '',
    '```http',
    'PUT /products_v2',
    '{ "mappings": { "properties": { "price": { "type": "integer" } } } }',
    'POST /_reindex',
    '{ "source": { "index": "products" }, "dest": { "index": "products_v2" } }',
    'POST /_aliases',
    '{ "actions": [',
    '  { "remove": { "index": "products", "alias": "products" } },',
    '  { "add": { "index": "products_v2", "alias": "products" } }',
    '] }',
    '```',
  ].join('\n'),

  'es-term-lookup-not-o1': [
    '词典查找后还要扫倒排表；高频词文档号多得多：',
    '',
    '```text',
    'term "SKU-9"   → 倒排表 ~1 条',
    'term "ON_SALE" → 倒排表可能百万条',
    '# text 字段先分析；整句当 term 可能根本对不上',
    '```',
  ].join('\n'),

  'nginx-request-phases': [
    '精确 location 优先于前缀代理：',
    '',
    '```nginx',
    'location = /api/health { return 200 "ok"; }',
    'location /api/ {',
    '  proxy_pass http://app;',
    '}',
    '# /api/health → 精确段，不进代理',
    '# /api/orders → 前缀代理',
    '```',
  ].join('\n'),

  'nginx-proxy-timeout': [
    '连接失败、读超时、应用自己超时是三段：',
    '',
    '```nginx',
    'proxy_connect_timeout 2s;   # 上游拒连很快失败',
    'proxy_read_timeout 30s;     # 已接通但不写字节',
    '# 借不到 DB 连接：应用先超时，加长 read 等不到取消',
    '```',
  ].join('\n'),

  'nginx-buffer-body': [
    '小 JSON 可缓冲；大上传要单独上限或直接转发：',
    '',
    '```nginx',
    'location /api/ {',
    '  client_max_body_size 1m;',
    '  proxy_request_buffering on;',
    '}',
    'location /upload/ {',
    '  client_max_body_size 20m;',
    '  proxy_request_buffering off;',
    '}',
    '# 超限 → 413，别把半截文件交给应用',
    '```',
  ].join('\n'),

  'nginx-limit-req-not-iptables-loop': [
    '用 limit_req，不要靠扫日志改防火墙重载：',
    '',
    '```nginx',
    'limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;',
    'location / {',
    '  limit_req zone=one burst=20 nodelay;',
    '}',
    '# 超额 → 503；正常连接不被 firewalld --reload 打断',
    '```',
  ].join('\n'),

  'nginx-forward-not-direct': [
    '正向代理、反向代理、直连三件事：',
    '',
    '```text',
    '浏览器设 HTTP 代理 → 正向（外网看见代理机）',
    '浏览器访问 www → Nginx proxy_pass 到内网 → 反向',
    '浏览器直连 :8080、无 proxy_pass → 直连',
    '```',
  ].join('\n'),

  'nginx-gunzip-not-compress': [
    'gunzip 解的是已压缩上游；不是拿它压 POST：',
    '',
    '```nginx',
    'location /static/ {',
    '  gunzip on;   # 上游给 .gz 内容但客户端不会 gzip 时再解',
    '}',
    '# 反向代理动态接口不要靠 gunzip 去压 POST',
    '```',
  ].join('\n'),

  'gateway-auth-where': [
    '网关验身份；对象级权限仍在业务服务：',
    '',
    '```http',
    '# 无令牌',
    'GET /orders/99 → 网关 401',
    '# 令牌有效但订单不属于该用户',
    'GET /orders/99 → 订单服务 403',
    '```',
  ].join('\n'),

  'gateway-timeout-chain': [
    '超时要从外到内收紧，失败侧要幂等：',
    '',
    '```text',
    '网关 2s > Feign 1s > SQL 500ms',
    '# 库存抖到 3s：Feign 先失败；SQL 若更长，语句可能还在跑',
    '```',
  ].join('\n'),

  'gateway-websocket-upgrade': [
    'WebSocket 要升级代理，空闲超时大于心跳：',
    '',
    '```yaml',
    '- id: ws',
    '  uri: lb:ws://notify',
    '  predicates:',
    '    - Path=/ws/**',
    '# 不要把短 HTTP read-timeout 套到 /ws',
    '```',
  ].join('\n'),

  'gateway-body-buffer': [
    '小 JSON 可改写；大上传不要整包缓冲：',
    '',
    '```text',
    '/login JSON → 可 ModifyRequestBody 补跟踪字段',
    '/files 上传 → 不要挂改写 body 的过滤器，流式转发',
    '```',
  ].join('\n'),

  'gateway-one-hop': [
    '网关做令牌校验与路由；公开读与对象权限分开：',
    '',
    '```text',
    '令牌无效 → 网关直接 401（订单服务无访问日志）',
    '令牌有效、订单不属于用户 → 订单服务 403',
    '公开商品详情 → 网关放行，不在每个服务复制同一规则',
    '```',
  ].join('\n'),

  'mw-proxy-lb-gateway': [
    '反代、选实例、鉴权转发是三问，可同机不同配置：',
    '',
    '```text',
    'TLS 终止 + 静态文件 → 反代',
    '按权重转到后面入口 → 负载均衡',
    '校验令牌再转到订单服务某台 → 网关鉴权',
    '```',
  ].join('\n'),

  'spring-security-cors': [
    'CORS 只约束浏览器；curl 仍要鉴权：',
    '',
    '```java',
    'configuration.setAllowedOrigins(List.of("https://app.example"));',
    'configuration.setAllowCredentials(true);',
    '// 不要 * + credentials',
    '```',
    '',
    '```bash',
    'curl -H "Cookie: sid=..." https://api.example/me  # CORS 不管',
    '```',
  ].join('\n'),

  'csrf-boundary': [
    '跨站表单可带 Cookie 提交；CORS 挡的是读响应：',
    '',
    '```html',
    '<!-- evil.example -->',
    '<form action="https://bank.example/transfer" method="POST">',
    '  <input name="to" value="attacker" />',
    '</form>',
    '```',
    '',
    '```text',
    '状态可 200、余额减少；脚本读响应被 CORS 拦住',
    '```',
  ].join('\n'),

  'auth-session-vs-jwt': [
    '浏览器会话用 Cookie；服务间用短时 JWT，别塞 localStorage：',
    '',
    '```js',
    '// Web：Cookie + SameSite / CSRF 字段',
    '// 服务间：Authorization: Bearer <short-lived-jwt>',
    '// 不要：',
    'localStorage.setItem("token", jwt)',
    '```',
  ].join('\n'),

  'algo-tree-walk': [
    '前序建目录、中序出 BST、后序删树：',
    '',
    '```text',
    '前序：根 → 左 → 右   # 先建父',
    '中序：左 → 根 → 右   # BST 从小到大',
    '后序：左 → 右 → 根   # 先删子再删父',
    '```',
  ].join('\n'),

  'algo-stable-sort': [
    '对象排序常稳定；原始数组排序不保证保序：',
    '',
    '```java',
    'List<Student> list = ...; // 两名 90 分，下标 0 再 2',
    'list.sort(Comparator.comparingInt(Student::score));',
    '// 仍是 0 在 2 前（稳定）',
    'int[] a = {90, 80, 90};',
    'Arrays.sort(a); // 两个 90 的“原位置”可能对调',
    '```',
  ].join('\n'),

  bfs: [
    '无权最短路用队列分层；有权边要用别的算法：',
    '',
    '```text',
    '起点入队 → 层 1 邻居 → 层 2 …',
    '第一次进入终点：步数 = 层数',
    '# 某边权改成 5：BFS 仍按边数先到，总代价可能更大',
    '```',
  ].join('\n'),

  'java-binary-search': [
    '找不到时返回 -(插入点)-1：',
    '',
    '```java',
    'int[] a = {1, 3, 5};',
    'Arrays.binarySearch(a, 3); // 1',
    'Arrays.binarySearch(a, 4); // -3  → 插入点 2',
    '// 数组未排序时，返回值不能当插入点契约',
    '```',
  ].join('\n'),

  'quicksort-average-nlogn': [
    '有序输入 + 固定枢轴会退化；随机/三数取中更稳：',
    '',
    '```text',
    '已排序 8 个数，枢轴总取首元素',
    '→ 分区几乎不切开，比较 ~ 8+7+…',
    '随机枢轴 / 三数取中 → 层数接近 log n',
    '# Arrays.sort(int[]) 不走这套单轴退化路径',
    '```',
  ].join('\n'),

  'hash-open-addressing-probe': [
    '开放寻址看探测序列；Java HashMap 是链/树不是这套：',
    '',
    '```text',
    '槽 h：线性 h,h+1,h+2；二次按平方步；双重散列 h+k*h2',
    'HashMap：同桶链过长 → TreeNode，不是开放寻址',
    '```',
  ].join('\n'),

  'jvm-areas': [
    '规范里的区 ≠ 某一版 HotSpot 的物理划分：',
    '',
    '```text',
    '线程私有：pc（JVM 指令地址）+ 虚拟机栈（栈帧）',
    '线程共享：堆（对象）+ 方法区（类结构，实现可不同）',
    '# 不要把 CPU 寄存器画进这张图',
    '```',
  ].join('\n'),

  'jvm-method-area-metaspace': [
    'OOM 文案要对上现行实现：',
    '',
    '```bash',
    '# JDK 8+ HotSpot',
    'java -XX:MaxMetaspaceSize=64m ...   # 类元数据打满 → Metaspace',
    '# -XX:MaxPermSize=… 在 8 起无效；堆打满仍是 Java heap space',
    '```',
  ].join('\n'),

  'jvm-platform-classloader-not-ext': [
    'JDK 9+ 打印平台加载器，不是 ExtClassLoader：',
    '',
    '```java',
    'System.out.println(ClassLoader.getPlatformClassLoader());',
    '// → jdk.internal.loader.ClassLoaders$PlatformClassLoader',
    '// 堆转储：jcmd <pid> GC.heap_dump，不要再找已移除的 jhat',
    '```',
  ].join('\n'),

  'jvm-jmm-not-runtime-areas': [
    '可见性失败加大 -Xmx 也救不了：',
    '',
    '```java',
    'boolean ready; // 无 volatile / 无同步发布',
    '// 线程 A: ready = true;',
    '// 线程 B: while (!ready) {}  // 可能一直见 false',
    '// 这是 JMM，不是堆太小',
    '```',
  ].join('\n'),

  'jvm-pc-no-oom': [
    '无限递归打的是栈，不是 pc：',
    '',
    '```text',
    'void f() { f(); }  → StackOverflowError（虚拟机栈）',
    '类加载泄漏     → OutOfMemoryError: Metaspace',
    'pc 本身        → 不抛 SOE / OOM',
    '```',
  ].join('\n'),

  'jvm-tenuring-threshold-15': [
    '年龄上限 15；动态年龄表可提前晋升：',
    '',
    '```text',
    'MaxTenuringThreshold = 15   # 合法最大值，不是“挺过 16 次”',
    'Survivor 目标已满 → 年龄 ≥ 某动态阈值（如 3）的对象本次晋升',
    '```',
  ].join('\n'),

  'jvm-full-gc-not-permgen': [
    'JDK 8 起没有可用的 PermSize；Full 收的是堆：',
    '',
    '```bash',
    'java -XX:PermSize=32m -version',
    '# → 选项支持已移除（8.0）',
    '# G1 Mixed = 部分老年代分区；Full = 整堆',
    '```',
  ].join('\n'),

  'java-heap-not-cpp-manual': [
    '没有 delete；未逃逸还可能被标量替换：',
    '',
    '```java',
    'void f() {',
    '  byte[] buf = new byte[16]; // 可能被 JIT 放栈上标量',
    '  use(buf);',
    '} // 无 delete[]；回收看可达性',
    '```',
  ].join('\n'),

  'cpu-heap-not-cpu-cache': [
    '-Xmx 管堆，管不到 L3：',
    '',
    '```bash',
    'java -Xmx2g App   # 堆上限 2G',
    '# L3 仍是 CPU 规格上的几十 MB；堆 OOM ≠ 缓存规格错误',
    '```',
  ].join('\n'),

  'jvm-gc-choice': [
    '先对齐「接口慢」是否等于「GC 暂停」：',
    '',
    '```text',
    'P99 请求 40ms，GC pause 5ms  → 先查 SQL / 锁，别先换回收器',
    'pause 常 500ms 且与超时同位 → 再谈停顿目标 / ZGC 等',
    '```',
  ].join('\n'),

  'java-executors-factory-oom': [
    '工厂方法常藏无界队列：',
    '',
    '```java',
    'Executors.newFixedThreadPool(8); // 队列 Integer.MAX_VALUE',
    '// 对外流量改用有界队列 + AbortPolicy / CallerRunsPolicy',
    'new ThreadPoolExecutor(8, 8, 0, SECONDS,',
    '  new ArrayBlockingQueue<>(200), new AbortPolicy());',
    '```',
  ].join('\n'),

  'java-soft-ref-not-oom-proof': [
    '软引用会先被清，仍可能 OOM：',
    '',
    '```java',
    'SoftReference<byte[]> cache = new SoftReference<>(new byte[1 << 20]);',
    'byte[] huge = new byte[Integer.MAX_VALUE / 2]; // 仍可能 OOM',
    '// 不能写成「OOM 前软引用集合一定为空」',
    '```',
  ].join('\n'),

  'java-loom-not-absent-coroutine': [
    '虚拟线程能多核等待，仍要并发安全：',
    '',
    '```java',
    'try (var scope = Executors.newVirtualThreadPerTaskExecutor()) {',
    '  scope.submit(() -> map.put(k, v)); // 仍需 ConcurrentHashMap',
    '}',
    '// 纯 CPU 热循环换成虚拟线程不会 magically 变快',
    '```',
  ].join('\n'),

  'kubeadm-cni-before-coredns': [
    'init 之后先装 CNI，CoreDNS 才会 Running：',
    '',
    '```bash',
    'kubeadm init ...',
    'kubectl apply -f <cni.yaml>   # 必须先有 Pod 网络',
    'kubectl get pods -n kube-system -l k8s-app=kube-dns',
    '# 无 CNI → CoreDNS 一直 Pending / 非 Running',
    '```',
  ].join('\n'),

  'kubeadm-control-plane-taint': [
    '控制面默认 NoSchedule；单机学习才去污点：',
    '',
    '```bash',
    'kubectl describe node | grep Taints',
    '# node-role.kubernetes.io/control-plane:NoSchedule',
    'kubectl taint nodes --all node-role.kubernetes.io/control-plane-',
    '# 三节点生产：保留污点，业务 Pod 应在 worker',
    '```',
  ].join('\n'),

  'k8s-runtime-not-only-docker': [
    '节点 CONTAINER-RUNTIME 常见是 containerd：',
    '',
    '```bash',
    'kubectl get nodes -o wide',
    '# CONTAINER-RUNTIME: containerd://1.x',
    'crictl ps     # 有容器',
    'docker ps     # 可能空（根本没装 Docker Engine）',
    '```',
  ].join('\n'),

  'k8s-pod-share-localhost': [
    '同 Pod 用 localhost；跨 Pod 要 Service / Pod IP：',
    '',
    '```text',
    'Pod A: app:8080 + sidecar → http://localhost:8080/metrics  OK',
    'sidecar 挪到 Pod B → localhost 指向自己，要改 http://app:8080',
    '```',
  ].join('\n'),

  'docker-root-not-host-root': [
    '容器内 uid 0 未必等于宿主机 root：',
    '',
    '```bash',
    'docker run --rm ubuntu id -u   # 常为 0',
    '# userns-remap / rootless 后：容器内仍是 0，宿主机是高位 subuid',
    '```',
  ].join('\n'),

  'container-shares-host-kernel': [
    '共享内核 ≠ 无隔离面：',
    '',
    '```text',
    'VM：客户机内核 + 虚拟硬件',
    '容器：宿主机内核 + ns/cgroup',
    '# 多租户仍要 userns / seccomp / 或微 VM',
    '```',
  ].join('\n'),

  'docker-image-template-not-container': [
    '镜像只读模板；数据进卷：',
    '',
    '```bash',
    'docker run -d --name a app:1.2',
    'docker run -d --name b app:1.2   # 同一镜像，两个可写层',
    'docker run -v data:/var/lib/app app:1.2   # 持久化用卷',
    '```',
  ].join('\n'),

  'vm-vs-container-isolation-tradeoff': [
    '按隔离需求选型，不是新旧站队：',
    '',
    '```text',
    'CI 短任务、同信任域     → 容器（密度高）',
    '强多租户 / 异内核合规   → VM 或微 VM',
    '```',
  ].join('\n'),

  'one-container-one-service-heuristic': [
    '启发式允许 sidecar，禁止巨石容器：',
    '',
    '```text',
    'OK：app + 代理 sidecar',
    'NG：app + MySQL + cron 塞进同一个容器',
    '```',
  ].join('\n'),

  'testcontainers-real-db': [
    '方言级断言用真实引擎；纯计算仍用单元测试：',
    '',
    '```java',
    '@Testcontainers',
    'class JsonbIT {',
    '  @Container static PostgreSQLContainer<?> pg =',
    '      new PostgreSQLContainer<>("postgres:16");',
    '  // JSONB 查询走 pg；价格公式另写无容器单测',
    '}',
    '```',
  ].join('\n'),

  'sca-nacos-ephemeral': [
    '保护阈值会把不健康地址也返回：',
    '',
    '```text',
    '4 台挂 3 台，阈值 0.5 → 健康占比 < 阈值',
    '→ 名单仍含坏地址；调用侧必须有连接超时与重试换节点',
    '```',
  ].join('\n'),

  'sca-nacos-shared-config': [
    '后加载的 dataId 覆盖同名键：',
    '',
    '```yaml',
    '# shared: redis.yaml → pool.size: 8',
    '# app: order-prod.yaml → pool.size: 32',
    '# 生效：32（后加载盖住共享）',
    '```',
  ].join('\n'),

  'sca-sentinel-block-fallback': [
    '限流走 blockHandler；业务异常走 fallback：',
    '',
    '```java',
    '@SentinelResource(value = "order",',
    '  blockHandler = "onBlock", fallback = "onBizFail")',
    'public Order place(...) { /* 业务 */ }',
    '// QPS 超限 → onBlock；库存抛异常 → onBizFail',
    '```',
  ].join('\n'),

  'sca-sentinel-flow-mode': [
    '直接 / 关联 / 链路是三种计数方式：',
    '',
    '```text',
    '直接：只数本资源 QPS',
    '关联：下单过热 → 一并限查询，避免查库拖垮下单',
    '链路：只统计用户入口；定时对账另算配额',
    '```',
  ].join('\n'),

  'sca-seata-tcc-empty': [
    '取消先到要空回滚，并挡住后续悬挂尝试：',
    '',
    '```text',
    '1) cancel(xid) 先到 → 记「已取消」，预留仍为 0',
    '2) try(xid) 后到 → 见标记，拒绝预留（防悬挂）',
    '3) confirm 重复 → 只扣一次',
    '```',
  ].join('\n'),

  'sca-circuit-not-only-hystrix': [
    '现行断路器用 Resilience4j / Sentinel，不是 Hystrix：',
    '',
    '```xml',
    '<!-- 新项目 -->',
    'spring-cloud-starter-circuitbreaker-resilience4j',
    '<!-- 或阿里栈 sentinel；勿默认作业写 Hystrix -->',
    '```',
  ].join('\n'),

  'dubbo-loadbalance-random-default': [
    '默认加权随机；慢节点上 roundrobin 会堆调用：',
    '',
    '```text',
    '未配置 loadbalance → Random（可加权）',
    '一台变慢仍在名单 → roundrobin 仍轮到它，进行中调用堆积',
    'leastactive → 少分给 active 已高的节点',
    '```',
  ].join('\n'),

  'dubbo-registry-down-local-cache': [
    '注册中心全挂：旧名单可调，新实例不可见：',
    '',
    '```text',
    '本地已缓存 3 个提供者 → ZK 维护期间仍可调用',
    '第 4 台刚上线 / 从未订阅的服务 → 等注册中心恢复才看见',
    '```',
  ].join('\n'),

  'spring-cloud-feign-not-lb': [
    'Feign 编 HTTP；选实例是 LoadBalancer：',
    '',
    '```java',
    '@FeignClient("order")',
    'interface OrderClient { @PostMapping("/place") ... }',
    '// Feign 写请求；LoadBalancer 从名单挑一台',
    '// CORS 是浏览器事，与有没有 Gateway 无关',
    '```',
  ].join('\n'),

  'java-memory': [
    '静态字段可达 → 方法返回后对象仍活着：',
    '',
    '```java',
    'static Map<String, Order> cache = new HashMap<>();',
    'void handle(String id) {',
    '  cache.put(id, new Order(id, new byte[1 << 20]));',
    '} // 局部变量没了，heap dump「谁引用了我」仍能走到 cache',
    '```',
  ].join('\n'),

  'java-gc': [
    '年轻代频繁短暂停 ≠ 接口 P99 尖峰：',
    '',
    '```text',
    '每秒大量短命对象 → Young GC 次数↑，单次几 ms，P99 可不变',
    '一次很长 Full / 混合长暂停 → 与延迟尖峰同一时刻',
    '```',
  ].join('\n'),

  'java-classloading': [
    '不同加载器 define 的同名类不相等：',
    '',
    '```java',
    'Class<?> a = loaderA.loadClass("com.demo.User");',
    'Class<?> b = loaderB.loadClass("com.demo.User");',
    'a.getName().equals(b.getName()); // true',
    'a == b; // false（加载器不同）',
    '```',
  ].join('\n'),

  'jmm-not-eight-memory-ops': [
    'volatile 写 happens-before 后续读；不是八条内存操作字节码：',
    '',
    '```java',
    'volatile boolean ready;',
    '// A: ready = true;   // 写',
    '// B: if (ready) …   // 能看见 A 的写',
    '// 字节码里没有名叫 store 的「八操」清单',
    '```',
  ].join('\n'),

  'sca-what': [
    'BOM + 发现 / 配置 / 限流，地址由 LoadBalancer 解析：',
    '',
    '```xml',
    '<!-- 只导入 spring-cloud-alibaba-dependencies BOM -->',
    '<!-- 再加：nacos-discovery、nacos-config、sentinel -->',
    '<!-- @FeignClient("inventory") → LoadBalancer 选实例 -->',
    '```',
  ].join('\n'),

  'sca-component-map': [
    '一跳里各组件各管一段：',
    '',
    '```text',
    '请求 → Sentinel（配额）→ 订单服务',
    '     → Nacos 名单 → LoadBalancer 挑库存实例 → Feign HTTP',
    '```',
  ].join('\n'),

  'sca-nacos-intro': [
    '命名空间 / dataId / group 三元组：',
    '',
    '```text',
    'namespace=dev',
    '服务名 order 注册到同一命名空间',
    'dataId=order-dev.yaml  group=DEFAULT_GROUP',
    '```',
  ].join('\n'),

  'sca-nacos-register': [
    '心跳停后，消费方缓存仍会短暂打到死实例：',
    '',
    '```text',
    '库存 A、B 注册 → 停 A 且停心跳',
    '短窗口：订单仍可能连 A 超时',
    '名单刷新后：新请求只打仍心跳的 B',
    '```',
  ].join('\n'),

  'sca-sentinel-intro': [
    '资源名 + 外部规则；超配额方法体不跑：',
    '',
    '```java',
    '@SentinelResource("order.place")',
    'public Order place(...) { /* 超 QPS 时此处不进入 */ }',
    '// 详情查询用另一个资源名做热点规则',
    '```',
  ].join('\n'),

  'sca-seata-intro': [
    'XID 随调用；分钟级等人不要拖在全局事务里：',
    '',
    '```text',
    '@GlobalTransactional → 订单库 + 库存库各注册分支',
    '库存失败 → 协调器通知订单回滚',
    '等用户支付数分钟 → 改 Saga / 本地消息，别占全局锁',
    '```',
  ].join('\n'),

  'sca-rocketmq-intro': [
    '落库后再发；消费按业务键幂等：',
    '',
    '```text',
    '订单提交成功 → Topic/Tag 发消息',
    '发货组消费：同一 orderId 重复投递 → 跳过，库存只扣一次',
    '30 分钟未支付 → 定时消息触发关单检查',
    '```',
  ].join('\n'),

  'sca-oss-intro': [
    '库只存对象键；展示用短时签名 URL：',
    '',
    '```text',
    '上传私有桶 → orders.avatar_key = "u/9/a.png"',
    '页面：presign(key, 5m) → 过期再 GET 应 403',
    '订单事务失败且对象已传 → 另任务删对象',
    '```',
  ].join('\n'),

  'sca-schedulerx-intro': [
    '多实例 worker，同一次触发只进一个处理器：',
    '',
    '```text',
    '关单任务 cron */1 * * * *',
    '三台 order worker 都在线 → 本次只一台执行',
    '重复触发：已关闭订单再关一次应幂等',
    '```',
  ].join('\n'),

  'sca-sms-intro': [
    '先记待发送，再调供应商；回滚未发可丢弃：',
    '',
    '```text',
    '支付成功 → 写 sms_outbox(pay_id)',
    '调用短信 API → 存 messageId；状态报告失败可人工重发',
    '支付单回滚且尚未调用 → 删/作废 outbox，勿发',
    '```',
  ].join('\n'),

  'sca-seata-lock-timeout': [
    '全局锁不要跨「等人」窗口：',
    '',
    '```text',
    '两单同 sku：A 占全局锁 → B 等待',
    'A 在事务里打开支付页等用户 → B 长时间拿不到锁',
    '→ 扣库存+写订单提交后再进人工业务',
    '```',
  ].join('\n'),

  'sca-dubbo-or-feign': [
    '已经是 HTTP 的调用先留下：',
    '',
    '```text',
    '浏览器 / 网关 / 回调 / 上传：继续 HTTP。Nacos 不是改 Dubbo 的理由。',
    '订单调库存：只有 HTTP 已测出是瓶颈、且两侧都是 Java，才评估 Dubbo。',
    '不要两个栈调同一种业务。',
    '```',
  ].join('\n'),

  'sca-stream-binding': [
    'destination + 消费组 + 业务键幂等：',
    '',
    '```yaml',
    'spring.cloud.stream.bindings.order-out.destination: order',
    '# 发货组集群消费；orderId 哈希同队列',
    '# 监听里按 orderId 幂等，再投递一次不应双发货',
    '```',
  ].join('\n'),

  'sca-deregister-shutdown': [
    '先注销再 SIGTERM，避免杀进程时仍被路由：',
    '',
    '```bash',
    '# 1) 从 Nacos 注销本实例',
    '# 2) 等消费方/网关名单刷新（日志无此 IP）',
    '# 3) SIGTERM 排空已接入请求',
    '# 直接 kill -9 → 缓存窗口内仍打到死地址',
    '```',
  ].join('\n'),

  'sca-one-call': [
    '504 要拆开看哪一层先超时：',
    '',
    '```text',
    '网关已放行；Sentinel 未拦；Nacos 名单正常',
    'Feign 读库存超时 → 库存线程池打满仍在跑 SQL',
    '→ 调线程池 / SQL，不是再加一层重试把火放大',
    '```',
  ].join('\n'),

  'dubbo-hessian-zk-not-frozen': [
    'Dubbo 3 不只有 Hessian + ZooKeeper：',
    '',
    '```text',
    '协议：Triple（或其它）暴露',
    '注册：Nacos / 其它，不必绑死 ZK',
    '跨库扣减：另用 Seata / 消息，不是协议选型本身',
    '```',
  ].join('\n'),

  'retired-spring-cloud-netflix': [
    '旧 Netflix 栈作业改现行组件：',
    '',
    '```text',
    'Hystrix → Resilience4j / Sentinel',
    'Ribbon → Spring Cloud LoadBalancer',
    'Zuul → Spring Cloud Gateway',
    '```',
  ].join('\n'),

  'nio-not-one-thread-per-request': [
    '少量 EventLoop 挂住上千空闲连接：',
    '',
    '```text',
    '1 acceptor + 少数 worker',
    '建 1000 连接后不发包 → Channel 都注册在这几条线程上',
    '≠ 一请求一线程 BIO',
    '```',
  ].join('\n'),

  'tomcat-nio-not-bio-default': [
    'Boot 内嵌 Tomcat 默认是 NIO：',
    '',
    '```text',
    '日志：ProtocolHandler ["http-nio-8080"]',
    '# 可同时挂远多于 200 的连接；不是 http-bio',
    '```',
  ].join('\n'),

  'netty-event-loop': [
    'EventLoop 里 sleep 会堵同环上其它连接：',
    '',
    '```java',
    '// 错误：handler 里 Thread.sleep(1000)',
    '// 正确：业务丢线程池，写回时 eventLoop.execute(() -> ctx.writeAndFlush(...))',
    '```',
  ].join('\n'),

  'netty-pipeline-handler': [
    '入站拆帧 → 解码 → 业务；出站相反：',
    '',
    '```java',
    'pipeline.addLast(new LengthFieldBasedFrameDecoder(...));',
    'pipeline.addLast(new MyDecoder());',
    'pipeline.addLast(new BusinessHandler());',
    '// 只挂业务 → 半包会让字段为空',
    '```',
  ].join('\n'),

  'netty-bytebuf-leak': [
    '读完要 release；进队列忘放会堆外涨：',
    '',
    '```java',
    'ByteBuf buf = ...;',
    'try {',
    '  String s = buf.toString(UTF_8);',
    '} finally {',
    '  buf.release();',
    '}',
    '// offer 进队列却不 release → DirectByteBuffer OOM',
    '```',
  ].join('\n'),

  'netty-idle-heartbeat': [
    '读空闲关连接；写空闲只发小 ping：',
    '',
    '```java',
    'pipeline.addLast(new IdleStateHandler(60, 20, 0, SECONDS));',
    '// READER_IDLE → close；WRITER_IDLE → 写 ping，不查库',
    '```',
  ].join('\n'),

  'netty-codec-shareable': [
    '有状态解码器每 Channel 一份；无缓冲日志可共享：',
    '',
    '```java',
    '// LengthFieldBasedFrameDecoder：不要 @Sharable',
    '@ChannelHandler.Sharable',
    'class LogHandler extends ChannelInboundHandlerAdapter { ... }',
    '```',
  ].join('\n'),

  'netty-watermark-backpressure': [
    '不可写时停读库，水位回来再继续：',
    '',
    '```java',
    'if (!ctx.channel().isWritable()) {',
    '  pauseDbRead();',
    '}',
    '// channelWritabilityChanged → 再 resume',
    '```',
  ].join('\n'),

  'netty-length-field-frame': [
    '前 4 字节大端长度；半包两次 write 仍拼成一条：',
    '',
    '```text',
    '无帧解码：第一次 read → 半个 JSON',
    '+ LengthFieldBasedFrameDecoder → 两次半包合成完整消息再进业务',
    '```',
  ].join('\n'),

  'netty-file-region': [
    '大文件用 FileRegion 指向磁盘，别整文件读进堆：',
    '',
    '```java',
    'channel.writeAndFlush(new DefaultFileRegion(file, 0, length));',
    '// 不要 Files.readAllBytes 再 write',
    '```',
  ].join('\n'),

  'pattern-strategy-swap': [
    '策略对象替换 if-else 分支：',
    '',
    '```java',
    '// 旧：if (满减) … else if (会员) …',
    'Discount d = pick(order); // 满减 / 会员 / 券',
    'money = d.apply(order);',
    '```',
  ].join('\n'),

  'pattern-template-steps': [
    '模板固定顺序，子类只填一步：',
    '',
    '```java',
    'final void export() { open(); writeBody(); close(); }',
    '// 子类只实现 writeBody()；勿把 close 挪到 write 前',
    '```',
  ].join('\n'),

  'pattern-decorator-contract': [
    '装饰后类型仍是原接口：',
    '',
    '```java',
    'DataSource ds = new Retrying(new Timing(raw));',
    'Connection c = ds.getConnection(); // 调用方仍只认 DataSource',
    '```',
  ].join('\n'),

  'pattern-adapter-shape': [
    '新接口包旧客户端：',
    '',
    '```java',
    'class XmlPaymentAdapter implements Payment {',
    '  public void charge(Order o) { old.payByXml(toXml(o)); }',
    '}',
    '```',
  ].join('\n'),

  'pattern-observer-push': [
    '领域事件推送，加审计不必改下单主流程签名：',
    '',
    '```java',
    '// 旧：placeOrder 里 billing.onPaid(); mail.onPaid();',
    'events.publish(new OrderPaid(id)); // 监听方各自订阅',
    '```',
  ].join('\n'),

  'pattern-factory-method': [
    '每种产品自己的创建者，而不是一个大 if：',
    '',
    '```java',
    '// 旧：create() { if 满减… else if 会员… }',
    'interface DiscountFactory { Discount create(); }',
    '// 限时价 → 新增一个工厂实现，结算方只拿 Discount',
    '```',
  ].join('\n'),

  'pattern-builder-assemble': [
    '必填与可选分开，避免位置参数记错：',
    '',
    '```java',
    'Order o = Order.builder()',
    '  .address(addr)           // 必填',
    '  .coupon(c).note(n)       // 可空',
    '  .build();',
    '// 勿 new Order(a, c, n, timeout) 靠参数顺序',
    '```',
  ].join('\n'),

  'pattern-one-variation': [
    '改名 Factory 却仍堆 if，不算引入模式：',
    '',
    '```java',
    'class DiscountFactory {',
    '  Discount create(Type t) {',
    '    if (t == FULL) … else if (t == VIP) … // 还在一个方法里',
    '  }',
    '}',
    '```',
  ].join('\n'),

  'distributed-cap': [
    '分区时「绝不冲突」与「两侧都成功」不能同时要：',
    '',
    '```text',
    '断联写库存：一侧失败 → 成功单 ≤ 可售（偏一致）',
    '断联写资料：两侧都 200 → 恢复后必须合并规则（偏可用）',
    '```',
  ].join('\n'),

  'distributed-consistency-three-words': [
    'ACID 的 C、CAP 取舍、最终一致是三层话：',
    '',
    '```text',
    '转账提交余额≥0          → ACID Consistency（与分区无关）',
    '断联库存一侧必须失败      → CAP 取舍',
    '下单成功、积分稍后到账    → 最终一致（要对账）',
    '```',
  ].join('\n'),

  'distributed-bloom': [
    '位为 0 确定没有；全 1 仍可能误报：',
    '',
    '```text',
    'sku 不存在且某位=0 → 不查库',
    '各位=1           → 仍查权威库（可能有行 / 可能没有）',
    '```',
  ].join('\n'),

  'distributed-xa': [
    '两阶段：准备前崩 ≠ 准备后失联：',
    '',
    '```text',
    'prepare 前协调者崩 → 两侧都不应提交',
    '一侧已 prepared、另一侧失联 → 不能把 prepared 当成功',
    'commit 中崩 → 靠恢复日志续完，不能当业务成功返回',
    '```',
  ].join('\n'),

  'distributed-cache': [
    '集中失效、热点、穿透要分开治：',
    '',
    '```text',
    '整点大批键同过期 → 集中失效（打散 TTL）',
    '单热键过期并发回源 → 热点（互斥回源 / 永不过期+异步刷）',
    '随机假 id 必未命中 → 穿透（布隆 / 空值短 TTL）',
    '```',
  ].join('\n'),

  'distributed-token-bucket': [
    '容量管突发，速率管长期：',
    '',
    '```text',
    'rate=100/s capacity=200 → 空闲后可连过 200，再按 100/s',
    'DB 只扛 50 并发 → 桶参数要对齐下游，不是只对齐网关口号',
    '```',
  ].join('\n'),

  'distributed-consistent-hash': [
    '加节点只迁相邻弧上的键：',
    '',
    '```text',
    '3 节点 + 6 键 → 加第 4 节点',
    '仅「新节点与前驱之间」的键迁移，其余目标不变',
    '热键若落在这段 → 整段打到新节点（虚节点只缓解偏斜）',
    '```',
  ].join('\n'),

  'distributed-seckill': [
    '条件更新影响行数才建单；回补要幂等：',
    '',
    '```sql',
    'UPDATE stock SET qty = qty - 1 WHERE sku=? AND qty >= 1;',
    '-- affected=1 → 建订单；=0 → 拒绝',
    '-- 超时回补执行两次不能让库存高于可售',
    '```',
  ].join('\n'),

  'distributed-lock': [
    '租约过期后旧持有者必须带版本写：',
    '',
    '```text',
    'A 持锁暂停 → 租约过期 → B 获锁写 version=2',
    'A 恢复若不验 version 直写 → 盖掉 B',
    'A 用 WHERE version=1 条件写 → 影响 0 行，放弃',
    '```',
  ].join('\n'),

  'zk-linearizable-not-realtime': [
    '未 sync 的读可以有界落后，不是「最终一致」那句：',
    '',
    '```text',
    '写经 leader；读未 sync → 可能仍见旧配置',
    '先 sync 再读 → 追上写后视图',
    '```',
  ].join('\n'),

  'mysql-uuid-not-clustered-pk': [
    '随机 UUID 主键让插入页号乱跳：',
    '',
    '```text',
    'PK=随机 UUID → 连续 INSERT 页来回跳',
    '号段 / Snowflake → 新行集中在树右端',
    '```',
  ].join('\n'),

  'distributed-one-db-first': [
    '单库单事务先保住原子，再谈拆服务：',
    '',
    '```java',
    '@Transactional',
    'void place() { orderRepo.save(...); itemRepo.save(...); }',
    '// 失败 → 两表都无新行；拆库后要 Saga/Outbox，不是同一注解',
    '```',
  ].join('\n'),

  'distributed-tx-not-cover-rpc': [
    '本地事务罩不住已提交的 Feign：',
    '',
    '```java',
    '@Transactional',
    'void place() {',
    '  insertDraft();',
    '  feign.deduct(); // 库存可能已提交',
    '  confirm();      // 这边超时回滚 → 库存悬空',
    '}',
    '```',
  ].join('\n'),

  'distributed-xid-must-travel': [
    'XID 没传到分支等于各开本地事务：',
    '',
    '```text',
    '入口日志 XID=a1；库存日志无 a1、分支表无行',
    '→ 库存本地已提交；入口回滚只消订单行',
    '→ 传播上下文 / 网关头必须带上 XID',
    '```',
  ].join('\n'),

  'distributed-at-sees-before-global': [
    'AT 本地提交后别的服务已能读到，全局还可能 undo：',
    '',
    '```text',
    '库存 1→0 本地提交 → 他服务读到 0',
    '订单分支失败 → undo 改回 1',
    '不是 XA 的 prepare 屏障',
    '```',
  ].join('\n'),

  'distributed-saga-is-new-action': [
    '补偿是新动作，要幂等，短信不可「回滚」：',
    '',
    '```text',
    '已扣库存+已写订单 → 用户取消',
    '补偿：回补库存 + 订单改取消（重试不能双加）',
    '短信已发 → 发更正通知，不是 undo 短信',
    '```',
  ].join('\n'),

  'distributed-saga-who-drives': [
    '编排者记步骤；协同靠事件，责任不同：',
    '',
    '```text',
    '编排：表里 orderId、步骤=已扣库存、下一步=写订单；失败发补偿',
    '协同：库存发 StockReserved，订单自己订；没有中央步骤表',
    '```',
  ].join('\n'),

  'distributed-read-your-writes': [
    '写后读详情走主；列表投影可短暂落后：',
    '',
    '```text',
    '写主返回 orderId → 详情按 PK 读主：立刻有行',
    '列表读投影：2s 内可没有，标题写「已接受」而非「查无」',
    '```',
  ].join('\n'),

  'distributed-reconcile-last': [
    '对账列差额再按规则修，不是只告警：',
    '',
    '```text',
    '日终：订单已确认 vs 库存已扣，按 sku/orderId 列差',
    '1001 已确认、库存无扣 → 重放扣减或订单改失败（按已定规则）',
    '```',
  ].join('\n'),

  'distributed-mq-not-erase-invariant': [
    '消息堆积不消掉「成功单 ≤ 库存」：',
    '',
    '```text',
    '落单+投递 OrderCreated → 200',
    '库存消费挂 1h → 堆积；可售 10、成功单已 30',
    '→ 对账/限售要拦，不能说「反正异步了」',
    '```',
  ].join('\n'),

  'spring-rollback': [
    'Runtime 默认回滚；受检异常要显式 rollbackFor：',
    '',
    '```java',
    '@Transactional',
    'void create() { save(); throw new RuntimeException(); } // 回滚',
    '@Transactional // 无 rollbackFor',
    'void create2() throws IOException { save(); throw new IOException(); } // 可能提交',
    '```',
  ].join('\n'),

  'spring-propagation': [
    'REQUIRES_NEW 先提交，外层回滚带不走它：',
    '',
    '```java',
    '@Transactional',
    'void place() { order.save(); audit.newTx(); throw boom; }',
    '// audit = REQUIRES_NEW → 审计行还在；订单消失',
    '```',
  ].join('\n'),

  'spring-scopes': [
    'singleton 里别塞请求态字段：',
    '',
    '```java',
    '@Service',
    'class OrderService {',
    '  String currentUser; // 请求甲写入，乙覆盖 → 串单',
    '}',
    '// 用户放方法参数 / SecurityContext，不要当字段',
    '```',
  ].join('\n'),

  'spring-external-config': [
    '启动参数盖过打包里的 yml：',
    '',
    '```bash',
    '# jar 内 application.yml: server.port=8080',
    'java -jar app.jar --server.port=9090',
    '# 进程实际监听 9090',
    '```',
  ].join('\n'),

  'spring-mvc-exception': [
    '领域异常映射成稳定 problem+json：',
    '',
    '```java',
    '@ExceptionHandler(InventoryExhaustedException.class)',
    'ResponseEntity<ProblemDetail> on(InventoryExhaustedException e) {',
    '  // 409 + application/problem+json，type=inventory-exhausted',
    '}',
    '```',
  ].join('\n'),

  'spring-validation-binding': [
    '有 @Valid 无 BindingResult → 进不了方法体：',
    '',
    '```java',
    '@PostMapping',
    'Order create(@Valid @RequestBody CreateOrder req) { ... }',
    '// 缺 sku → 400 字段错误，方法不执行',
    '// 若要自己处理：多一个 BindingResult 参数',
    '```',
  ].join('\n'),

  'mysql-index': [
    '最左前缀：等值 + 排序可用；跳列不行：',
    '',
    '```sql',
    '-- INDEX (status, created_at)',
    'WHERE status=? ORDER BY created_at;  -- 可用',
    'WHERE created_at > ?;                 -- 用不上该联合索引',
    '```',
  ].join('\n'),

  'mysql-isolation': [
    '先查后插要靠唯一约束，不是靠「读到没有」：',
    '',
    '```sql',
    '-- 两事务都 SELECT 无此用户名 → 都 INSERT',
    '-- 无 UNIQUE → 两行；有 UNIQUE(username) → 一行冲突',
    '```',
  ].join('\n'),

  'mysql-deadlock': [
    '交叉加锁顺序 → 一方整笔回滚：',
    '',
    '```text',
    'T1: UPDATE A; UPDATE B;',
    'T2: UPDATE B; UPDATE A;',
    '→ 死锁；输家整事务回滚，只重发最后一条不够',
    '```',
  ].join('\n'),

  'mysql-explain-analyze': [
    '估计行数好看，ANALYZE 才暴露真实扫描：',
    '',
    '```sql',
    'EXPLAIN SELECT ... WHERE created_at > ?;        -- 估 10 行、用索引',
    'EXPLAIN ANALYZE SELECT ...;                     -- 实扫远大于估计时改计划',
    '```',
  ].join('\n'),

  'mysql-select-star': [
    'SELECT * 会逼回表，挡住覆盖索引：',
    '',
    '```sql',
    '-- INDEX(user_id)，表还有 note 大列',
    'SELECT * FROM orders WHERE user_id=?;      -- 回表',
    'SELECT id, user_id, status FROM orders WHERE user_id=?;  -- 可能覆盖',
    '```',
  ].join('\n'),

  'mysql-where-having': [
    '行过滤用 WHERE，组后过滤用 HAVING：',
    '',
    '```sql',
    'SELECT user_id, COUNT(*) c FROM orders',
    'WHERE status="PAID"',
    'GROUP BY user_id',
    'HAVING c > 3;',
    '```',
  ].join('\n'),

  'mysql-upsert': [
    '唯一键冲突时更新，不要先 SELECT 再 INSERT：',
    '',
    '```sql',
    'INSERT INTO checkin(user_id, day, streak) VALUES (?,?,1)',
    'ON DUPLICATE KEY UPDATE streak = streak + 1;',
    '```',
  ].join('\n'),

  'mysql-isolation-levels': [
    'RR 普通读看快照；FOR UPDATE 会锁范围：',
    '',
    '```sql',
    '-- RR：两次普通 SELECT COUNT 同快照',
    'SELECT ... FOR UPDATE;  -- 范围锁；他事务插入间隙可能等待',
    '```',
  ].join('\n'),

  'mysql-index-kinds': [
    'B+ 二级、HASH、FULLTEXT 不是同一把刀：',
    '',
    '```sql',
    '-- InnoDB: INDEX(shop_id, created_at)  范围/排序',
    '-- MEMORY: HASH 适合等值',
    '-- FULLTEXT: MATCH...AGAINST，不是 LIKE %词%',
    '```',
  ].join('\n'),

  'mysql-prepared-statement': [
    '服务端预处理要驱动打开，不是写了 ? 就有：',
    '',
    '```text',
    'JDBC URL: useServerPrepStmts=true',
    '同一连接反复 WHERE id=? → 服务端 prepare',
    '只执行一次的语句要权衡往返成本',
    '```',
  ].join('\n'),

  // batch-complete: auto fences for remaining codeish lessons (317)
  "cors-preflight-max-age": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "Content-Security-Policy: script-src 'self'",
    "Cross-Origin-Resource-Policy: cross-origin",
    "Reporting-Endpoints: csp=\"https://reports.example/r\"",
    "```",
    "",
    "Access-Control-Max-Age 只缓存预检结果，不是跨域通行证"
  ].join('\n'),

  "same-origin-script-still-runs": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# 同源策略拦的是读，不是“外域脚本不能执行”",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "html-form-cross-origin-navigate": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# 表单可以跨源提交，CORS 拦的是脚本读响应",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "sse-one-way-http-stream": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "Content-Type: text/event-stream",
    "data: hello",
    "",
    "data: {\"n\":1}",
    "",
    "```",
    "",
    "单向服务器推流；不是 WebSocket 双工。"
  ].join('\n'),

  "http-connection-reuse": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "TCP 连接复用：多个 HTTP 请求共用一条连接",
    "Keep-Alive / HTTP/2 多路复用 ≠ 应用层幂等",
    "```",
    "",
    "复用省握手，不代替业务超时与幂等。"
  ].join('\n'),

  "http-compression": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "Accept-Encoding: gzip, br",
    "Content-Encoding: gzip",
    "# Vary: Accept-Encoding 要跟着缓存键",
    "```",
    "",
    "压缩协商与缓存键要一起看。"
  ].join('\n'),

  "http-range": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "GET /file HTTP/1.1",
    "Range: bytes=0-1023",
    "",
    "HTTP/1.1 206 Partial Content",
    "Content-Range: bytes 0-1023/5000",
    "```",
    "",
    "先确认 Accept-Ranges，再按 Range 拉片段。"
  ].join('\n'),

  "tls-hostname-verify": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "TLS 要核对证书名/SAN",
    "加密通道 ≠ 一定连对了那台主机",
    "```",
    "",
    "hostname verify 失败应断开。"
  ].join('\n'),

  "tcp-stream-needs-framing": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "TCP = 字节流",
    "粘包要在应用层分帧（长度前缀/分隔符）",
    "```",
    "",
    "可靠传输不负责消息边界。"
  ].join('\n'),

  "tcp-reliable-not-never-lose": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "TCP 尽力可靠 ≠ 应用永不丢业务消息",
    "超时/半开仍要重试与幂等",
    "```"
  ].join('\n'),

  xss: [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# XSS、转义与内容安全策略",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "csp-script-src": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "Content-Security-Policy: script-src 'self'",
    "Cross-Origin-Resource-Policy: cross-origin",
    "Reporting-Endpoints: csp=\"https://reports.example/r\"",
    "```",
    "",
    "CSP 白名单限制脚本从哪来，不是代替转义 HTML"
  ].join('\n'),

  "csp-report-only-not-enforce": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "Content-Security-Policy: script-src 'self'",
    "Cross-Origin-Resource-Policy: cross-origin",
    "Reporting-Endpoints: csp=\"https://reports.example/r\"",
    "```",
    "",
    "Report-Only 只上报违例，不会替你拦住脚本"
  ].join('\n'),

  "trusted-types-sink-guard": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "Content-Security-Policy: script-src 'self'",
    "Cross-Origin-Resource-Policy: cross-origin",
    "Reporting-Endpoints: csp=\"https://reports.example/r\"",
    "```",
    "",
    "Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML"
  ].join('\n'),

  "permissions-policy-feature-gate": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# Permissions-Policy 关的是浏览器能力，不是脚本来源白名单",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "coop-coep-cross-origin-isolated": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# COOP/COEP 换来 crossOriginIsolated，不是普通 CORS 换皮",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "sri-integrity-not-csp": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# SRI 校验这一份资源字节，不是 CSP 脚本来源白名单的换皮",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "reporting-nel-not-csp-enforce": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "Content-Security-Policy: script-src 'self'",
    "Cross-Origin-Resource-Policy: cross-origin",
    "Reporting-Endpoints: csp=\"https://reports.example/r\"",
    "```",
    "",
    "Reporting / NEL 是遥测管道，不是又一道强制 CSP"
  ].join('\n'),

  "corp-embed-gate-not-cors": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "Content-Security-Policy: script-src 'self'",
    "Cross-Origin-Resource-Policy: cross-origin",
    "Reporting-Endpoints: csp=\"https://reports.example/r\"",
    "```",
    "",
    "CORP 管别人能不能嵌你的资源，不是 CORS 读响应的换皮"
  ].join('\n'),

  "rr-mode-gates-data": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```tsx",
    "const router = createBrowserRouter([",
    "  { path: '/', loader: async () => fetch('/api').then(r => r.json()),",
    "    element: <Home /> },",
    "])",
    "```"
  ].join('\n'),

  "rr-outlet-keeps-layout": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```tsx",
    "const router = createBrowserRouter([",
    "  { path: '/', loader: async () => fetch('/api').then(r => r.json()),",
    "    element: <Home /> },",
    "])",
    "```"
  ].join('\n'),

  "rr-redirect-before-render": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```tsx",
    "const router = createBrowserRouter([",
    "  { path: '/', loader: async () => fetch('/api').then(r => r.json()),",
    "    element: <Home /> },",
    "])",
    "```"
  ].join('\n'),

  "query-cache-not-http-client": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```tsx",
    "const router = createBrowserRouter([",
    "  { path: '/', loader: async () => fetch('/api').then(r => r.json()),",
    "    element: <Home /> },",
    "])",
    "```"
  ].join('\n'),

  "vue-vnode-not-fragment": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# Vue 的虚拟 DOM 不是 DocumentFragment",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "fe-pick-by-surface": [
    "这是 src/pages 里的 .astro。上方 --- 在产出 HTML 时跑完，浏览器不执行它：",
    "",
    "```html",
    "---",
    "const title = '如何退款'",
    "const body = '打开订单，点退款。'",
    "---",
    "<article>",
    "  <h1>{title}</h1>",
    "  <p>{body}</p>",
    "</article>",
    "<Search client:load />",
    "```",
    "",
    "默认在构建时预渲染。该页写了 prerender = false 且装了适配器时，改成每次请求再跑。浏览器「查看网页源代码」收到的是填好的 HTML。Search 变成 astro-island：",
    "",
    "```html",
    "<article>",
    "  <h1>如何退款</h1>",
    "  <p>打开订单，点退款。</p>",
    "</article>",
    "<astro-island",
    "  client=\"load\"",
    "  component-url=\"/_astro/Search.xxxx.js\"",
    "  component-export=\"default\"",
    "  renderer-url=\"/_astro/client.xxxx.js\"",
    "  props=\"{}\"",
    "  ssr",
    ">",
    "  <form action=\"/search\"><input type=\"search\" name=\"q\" /></form>",
    "  <!--astro:end-->",
    "</astro-island>",
    "```",
    "",
    "client=\"load\" 是 client:load 编译后的写法，表示页面一加载就去取 component-url 里的 Search 脚本，再用 renderer-url 里的框架挂到这个 form 上。form 随 Search 的内容变化。xxxx 是这次构建的文件名。旁边还可能有 uid、opts、before-hydration-url。后台整页都是表格时，写成 Vue 或 React 应用。",
    "",
    "同一个 .astro 可以再引入第二种界面框架，两份运行时都会下载：",
    "",
    "```html",
    "---",
    "import Search from '../components/Search.vue'",
    "import Vote from '../components/Vote.jsx'",
    "---",
    "<Search client:load />",
    "<Vote client:load />",
    "```",
    "",
    "这样写能编译。新岛只留团队会调试的那一种，另一种在记录里写成旧组件保留。.vue 文件里不能再 import 这个 .jsx。"
  ].join('\n'),

  "fe-ui-update-model": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 框架之间比的是谁负责更新界面",
    "```"
  ].join('\n'),

  "fe-angular-first-party": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// Angular 的路由、HTTP 和表单用自己的包（v21）",
    "```"
  ].join('\n'),

  "fe-ecosystem-follows-model": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 选定界面库之后，生态跟着这一套走",
    "```"
  ].join('\n'),

  "fe-angular-resource-not-ngrx": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// Angular 的 GET 用 HttpClient 这一路，不必先装 NgRx",
    "```"
  ].join('\n'),

  "fe-cross-end-one-runtime": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 跨端先选定一个运行时",
    "```"
  ].join('\n'),

  "rn-view-not-div": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// View 只是让人想起 div，它不是浏览器里的元素",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-text-not-under-view": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 文字必须包在 Text 里，字体也不会从 View 继承下来",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-flex-defaults": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// Flexbox 能用，但四项默认和网页不一样",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-pressable-not-click": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 按压用 Pressable 的 onPress，不是 div 的 onClick",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-flatlist-window": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 长列表用 FlatList，它不会把每一行都挂上",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-image-needs-size": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 网络图片必须自己写宽高，静态资源不是同一条路",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-dimensions-not-cached": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 窗口尺寸会变，不要把第一次读到的宽高存死",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-platform-extension": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 整份实现不同就拆文件，一个数值不同才用 Platform.OS",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-hermes-default": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 默认引擎是 Hermes，不是手机浏览器里的那一个（RN 默认）",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-jsi-not-json-bridge": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 0.76 起默认走 JSI，调用不必再做桥上的序列化",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-navigate-not-push": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// navigate 到当前这条路由不会再压一层，push 才会",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "rn-fetch-not-document": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// 环境补上了 fetch，没有因此补上 document",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "cross-four-who-paints": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# 四套跨端里，像素是谁画的并不相同",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "cross-four-where-it-fits": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# 先看宿主：小程序、自绘 App，还是系统视图",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "uniapp-x-uts-not-vue-page": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// uni-app x 用 uts 和 uvue，旧的 vue 页面进不去",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "uniapp-pages-json-entry": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// uni-app 的页面登记在 pages.json，第一项才是启动页",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "uniapp-onload-vs-onshow": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// onLoad 只在加载时收参，返回页面走的是 onShow",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "uniapp-ifdef-stripped": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// #ifdef 在编译期裁掉，不是运行时的 if",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "taro-react-setdata-bridge": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// Taro 跑的是真 React，小程序界面仍靠 setData",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "taro-pages-in-app-config": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// Taro 的页面在 app.config 的 pages 里，第一项是首页",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "taro-4-compiler-choice": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// Taro 4 可选 webpack5 或 Vite，小程序产物仍是四件套",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "taro-and-uniapp-layers": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "// uni-app 改的是 Vue 数据，Taro 改的是模拟 DOM 再 setData",
    "export default { pages: ['pages/index/index'] }",
    "```"
  ].join('\n'),

  "node-http-cookie": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-unhandled-rejection": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-emitter": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-global-fetch": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-http-close": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-nexttick": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-event-loop-phases": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-libuv-threadpool": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-stream": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-buffer": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "node-worker-cluster": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```js",
    "import http from 'node:http'",
    "const s = http.createServer((req, res) => {",
    "  res.setHeader('Set-Cookie', 'sid=1; HttpOnly')",
    "  res.end(\"ok\")",
    "})",
    "```"
  ].join('\n'),

  "angular-ngonchanges-primitives": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```ts",
    "@Component({...})",
    "export class C implements OnChanges {",
    "  ngOnChanges(ch: SimpleChanges) { /* 原始类型也会触发 */ }",
    "}",
    "```"
  ].join('\n'),

  "retired-frontend-stack": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```bash",
    "# 这些前端默认项已经退出主线",
    "kubectl get pods -o wide",
    "# 或 docker / git 对照本课断言",
    "```"
  ].join('\n'),

  "java-main-launcher": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 启动入口是 public static void main(String[])",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-pass-by-value": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// Java 只有值传递，对象看起来被改是因为复制了引用",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-string-immutability": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// String 不可变，拼接在循环里要换思路",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-string-new-vs-pool": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// new String(\"xyz\") 不一定正好两个对象",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-interface-contract": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 接口表达能力，抽象类才放共享状态",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-polymorphism-not-only-extends": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 多态不必先继承一个类，实现接口也算",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-protected-other-pkg-subclass": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// protected 对别的包里的子类可见，不是“出了包就全看不见”",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-anonymous-extends-or-implements": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 匿名类要么继承一个类，要么实现一个接口",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-default-class-wins-conflict": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 默认方法不是 C++ 那种类多继承，冲突时类方法优先（JDK 8）",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-ctor-implicit-super-noarg": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 构造器里隐式 super() 只调父类无参，不是“总会找到一个父构造器”",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-exceptions": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 异常边界与资源释放",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-unchecked-not-must-catch": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// RuntimeException 不必写进 catch，Error 更不是业务必捕",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-runtime-ex-not-auto-caught": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// RuntimeException 会抛，JVM 不会替你 catch",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-finalize-not-guaranteed": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// finalize 不保证会跑，资源用 try-with-resources",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-clone-exception-checked": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// CloneNotSupportedException 是检查异常，Cloneable 不会公开 cl",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-collections": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// HashMap 与集合选择",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-arraylist-linkedlist": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// ArrayList 随机访问快，LinkedList 不是万能插入",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-stack-prefer-deque": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 栈和队列请用 Deque，不要新写 java.util.Stack",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-set-not-always-sorted": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// Set 不必有序，Map 也不必无序",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-collection-vs-collections": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// Collection 是接口，Collections 是工具类",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-vector-cme-not-because-sync": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "Vector 方法同步，并不能解释迭代器的 ConcurrentModificationExce"
  ].join('\n'),

  "java-enumeration-not-faster": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// Enumeration 并不比 Iterator 快一倍",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-stringbuilder-not-buffer": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 同一线程拼字符串用 StringBuilder，不要默认换 StringBuffer",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-time-instant": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// Instant 是时间线上的一点，LocalDateTime 没有时区（JDK 8）",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-charset-default": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 读写字节必须写明字符集，不要碰默认编码",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-string-strip-not-trim": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// trim 清的不是全部空白，getBytes 必须写字符集（JDK 11 strip）",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-pattern-dot-not-nl": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// Java 正则的点默认不吃换行",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-calendar-not-singleton": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// Calendar.getInstance 每次新建，不是单例",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-long-atomic-on-64bit": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 64 位 Java 里 long 赋值是原子的，不要一律按两次 32 位写",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-not-every-class-clone-serializable": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 不是每个类都要 equals、clone 和 Serializable",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-raw-type-skips-checks": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 裸类型 List 会跳过泛型检查，不是图省事的写法",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-class-newinstance-deprecated": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 不要再用 Class.newInstance，它只能调无参且已弃用",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-final-not-fifty-percent": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 给类加 final 不会让程序快百分之五十",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-shift-not-times-eight": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 2 左移 3 不是“算出 2 乘 8”的正经答案",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-priority-queue": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 优先队列与堆顶语义",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "pattern-gof-catalog": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 先把二十三种名字列全，再打开后面章节",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-family-test": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 先问这一次变的是创建、连接，还是请求怎么走",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-gof-rest": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 名单上还有七个：先写清允许变的那一块，再决定要不要单独立课",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-singleton-scope": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 单例先写明这一份的范围",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-proxy-stand-in": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 代理决定你能不能碰到目标，装饰器在外面加行为",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-facade-entry": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 外观把子系统的顺序收成一次调用",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-bridge-two-axes": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 两个都会变的维度不要乘成子类",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-composite-tree": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 叶子和容器用同一接口，调用方不用先判断是不是目录",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-flyweight-share": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 享元共享的是不变的那一部分，变化的部分调用时再传入",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-chain-stop": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 责任链上的一环可以选择不往后传",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "pattern-state-transition": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 状态自己决定这一步能不能做，以及下一步是谁",
    "interface Payment { void pay(int cents); }",
    "class CardPayment implements Payment { public void pay(int c) { ... } }",
    "```",
    "",
    "先写清允许变的那一块，再套模式名。"
  ].join('\n'),

  "java-comparator-strategy": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 排序规则用 Comparator 传进去，不必改元素类",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-buffered-stream-decorator": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 缓冲流包住原来的流，关闭时里面那一层也会关",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-proxy-needs-interface": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// JDK 动态代理只能站在接口前面",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-unmodifiable-is-view": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 不可修改列表是视图，原列表一改它就跟着变",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "java-runnable-is-command": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 把要做的事放进 Runnable，线程池里不写业务",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "spring-factorybean-product": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "FactoryBean 注入出去的是 getObject 的产品"
  ].join('\n'),

  "spring-event-sync-default": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "Spring 事件默认要等监听器跑完，不是发出去就换线程"
  ].join('\n'),

  "spring-jdbctemplate-callback": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "JdbcTemplate 固定连接和异常转换，回调只提供 SQL"
  ].join('\n'),

  "spring-getbean-hides-deps": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "构造器写出依赖，不要在方法里再 getBean"
  ].join('\n'),

  "java-concurrency": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "线程、可见性与原子性"
  ].join('\n'),

  "java-happens-before": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "happens-before 与可见性"
  ].join('\n'),

  "java-interrupt": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "线程中断是协作信号"
  ].join('\n'),

  "java-reentrant-lock": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "显式锁与 try/finally"
  ].join('\n'),

  "java-lock-flexibility": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "Lock 的优势不是“自带读写锁”"
  ].join('\n'),

  "java-barrier-latch": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "CountDownLatch 一次性，CyclicBarrier 可循环"
  ].join('\n'),

  "java-aqs-not-futuretask": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "AQS 管 state 和等待队列，FutureTask 已不是它"
  ].join('\n'),

  "java-rwlock-no-upgrade": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "读写锁可以降级，不能从读锁升级成写锁"
  ].join('\n'),

  "java-cas-aba-stamp": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "CAS 比的是此刻的值，ABA 要用版本戳"
  ].join('\n'),

  "java-sync-not-all-methods": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "进入一个 synchronized 方法，挡不住同一对象上的普通方法"
  ].join('\n'),

  "java-thread-six-states": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "Thread.State 有六个值，不是运行就绪挂起结束（JDK 5）"
  ].join('\n'),

  "java-executor": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "线程池容量与背压"
  ].join('\n'),

  "java-virtual-threads": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "虚拟线程解决什么问题（JDK 21）"
  ].join('\n'),

  "java-fork-join-pool": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "ForkJoin 适合可拆分的计算，不适合堵住工作线程的 IO（JDK 7）"
  ].join('\n'),

  "java-linked-blocking-unbounded": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "未指定容量的 LinkedBlockingQueue 几乎无界"
  ].join('\n'),

  "java-tpe-execute-order": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "ThreadPoolExecutor 是 execute 时才建线程，不是队列里先堆着不动（JD"
  ].join('\n'),

  "java-threads-not-linear-speedup": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "var pool = Executors.newFixedThreadPool(4);",
    "// 有界队列 + 拒绝策略；虚拟线程另见 JDK 21",
    "pool.execute(task);",
    "```",
    "",
    "十个线程不会把 100 毫秒变成 10 毫秒"
  ].join('\n'),

  "mysql-null-comparison": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SELECT * FROM t WHERE col = NULL;   -- 永远空",
    "SELECT * FROM t WHERE col IS NULL;  -- 才筛未知",
    "```"
  ].join('\n'),

  "mysql-not-null-default-not-absolute": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SELECT * FROM t WHERE col = NULL;   -- 永远空",
    "SELECT * FROM t WHERE col IS NULL;  -- 才筛未知",
    "```"
  ].join('\n'),

  "sql-outer-join-where": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 外连接的条件写进 WHERE，就变成内连接",
    "EXPLAIN SELECT 1;",
    "```",
    "",
    "用计划与手册核对，不靠绝对禁令。"
  ].join('\n'),

  "mysql-inner-join-match": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "INNER JOIN 只保留两表都匹配的行"
  ].join('\n'),

  "mysql-join-ban-not-absolute": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 启发式：大表无索引 JOIN 会很痛",
    "SELECT ... FROM a JOIN b ON a.id = b.a_id",
    "-- 用 EXPLAIN 证明 key，而不是一律禁止 JOIN",
    "```"
  ].join('\n'),

  "mysql-or-not-must-become-in": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "WHERE status = 1 OR status = 2",
    "-- 同列常可写成 IN (1,2)；跨列看 EXPLAIN",
    "WHERE a=1 OR b=2",
    "```"
  ].join('\n'),

  "mysql-group-by-having": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SELECT user_id, COUNT(*) c FROM orders GROUP BY user_id HAVING c > 3;",
    "SELECT id, RANK() OVER (PARTITION BY user_id ORDER BY amt DESC) r FROM orders;",
    "```",
    "",
    "窗口不折叠行数；GROUP BY 才收成一组一行。"
  ].join('\n'),

  "mysql-window-keeps-rows": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SELECT user_id, COUNT(*) c FROM orders GROUP BY user_id HAVING c > 3;",
    "SELECT id, RANK() OVER (PARTITION BY user_id ORDER BY amt DESC) r FROM orders;",
    "```",
    "",
    "窗口不折叠行数；GROUP BY 才收成一组一行。"
  ].join('\n'),

  "mysql-union-distinct": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SELECT a FROM t1",
    "UNION        -- 去重",
    "SELECT a FROM t2;",
    "-- UNION ALL 不去重，通常更便宜",
    "```"
  ].join('\n'),

  "mysql-second-nf": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "第二范式不是“表有主键”"
  ].join('\n'),

  "mysql-text-ban-not-absolute": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 规范数字是启发式，不是语法禁令",
    "EXPLAIN / 行宽 / 缓冲池命中 比口诀优先",
    "```",
    "",
    "“禁止 TEXT/BLOB”禁的是乱查大列，不是禁类型"
  ].join('\n'),

  "mysql-varchar-length": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 规范数字是启发式，不是语法禁令",
    "EXPLAIN / 行宽 / 缓冲池命中 比口诀优先",
    "```",
    "",
    "VARCHAR(50)：50 是字符数，不是字节数"
  ].join('\n'),

  "mysql-varchar-row-max": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 规范数字是启发式，不是语法禁令",
    "EXPLAIN / 行宽 / 缓冲池命中 比口诀优先",
    "```",
    "",
    "单列 VARCHAR 上限由行字节和字符集一起决定"
  ].join('\n'),

  "mysql-wide-column-split": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "大字段拆表：页内更瘦，不是自动更快"
  ].join('\n'),

  "mysql-fk-redundancy": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "外键与冗余：性能借口不能代替约束决策"
  ].join('\n'),

  "mysql-datetime-vs-timestamp": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "DATETIME 不是 8 字节，TIMESTAMP 仍有 2038"
  ].join('\n'),

  "mysql-float-ieee-not-8-digits": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "FLOAT 不是八位十进制精度，DOUBLE 也不是十八位"
  ].join('\n'),

  "mysql-money-decimal-not-ban": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "“禁止小数存货币”不能禁掉 DECIMAL"
  ].join('\n'),

  "mysql-split-not-at-ten-million": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "单表一千万行不是必须拆分的定律"
  ].join('\n'),

  "mysql-json-not-document-db": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "WITH paid AS (SELECT * FROM orders WHERE status='paid')",
    "SELECT * FROM paid;",
    "```",
    "",
    "CTE/视图/过程各有边界，不是自动加速器。"
  ].join('\n'),

  "mysql-view-is-stored-query": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "WITH paid AS (SELECT * FROM orders WHERE status='paid')",
    "SELECT * FROM paid;",
    "```",
    "",
    "CTE/视图/过程各有边界，不是自动加速器。"
  ].join('\n'),

  "mysql-procedure-not-auto-txn": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "WITH paid AS (SELECT * FROM orders WHERE status='paid')",
    "SELECT * FROM paid;",
    "```",
    "",
    "CTE/视图/过程各有边界，不是自动加速器。"
  ].join('\n'),

  "mysql-trigger-side-effect-hidden": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "WITH paid AS (SELECT * FROM orders WHERE status='paid')",
    "SELECT * FROM paid;",
    "```",
    "",
    "CTE/视图/过程各有边界，不是自动加速器。"
  ].join('\n'),

  "mysql-cte-named-subquery": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "WITH paid AS (SELECT * FROM orders WHERE status='paid')",
    "SELECT * FROM paid;",
    "```",
    "",
    "CTE/视图/过程各有边界，不是自动加速器。"
  ].join('\n'),

  "mysql-enum-ban-not-absolute": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 规范数字是启发式，不是语法禁令",
    "EXPLAIN / 行宽 / 缓冲池命中 比口诀优先",
    "```",
    "",
    "“禁止 ENUM 改 TINYINT”是运维启发式，不是类型真理"
  ].join('\n'),

  "mysql-temp-table-vs-cte": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "WITH paid AS (SELECT * FROM orders WHERE status='paid')",
    "SELECT * FROM paid;",
    "```",
    "",
    "CTE/视图/过程各有边界，不是自动加速器。"
  ].join('\n'),

  "mysql-utf8-alias-not-utf8mb4": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW VARIABLES LIKE 'character_set%';",
    "-- utf8 在 MySQL 常是 utf8mb3；完整 Unicode 用 utf8mb4",
    "```"
  ].join('\n'),

  "mysql-fk-ban-not-absolute": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "“禁止外键”是并发启发式，不是完整性过时"
  ].join('\n'),

  "mysql-phone-varchar-length-not-twenty": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 规范数字是启发式，不是语法禁令",
    "EXPLAIN / 行宽 / 缓冲池命中 比口诀优先",
    "```",
    "",
    "“手机号必须 varchar(20)”把长度钉死了"
  ].join('\n'),

  "mysql-insert-must-name-columns": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "INSERT INTO t (id, name) VALUES (1, 'a');  -- 写列名",
    "INSERT INTO t VALUES (1, 'a');           -- 列序一变就错位",
    "```"
  ].join('\n'),

  "mysql-innodb-default-not-ban-others": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "“必须 InnoDB”是默认选型，不是引擎清零"
  ].join('\n'),

  "mysql-db-not-blob-store": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 规范数字是启发式，不是语法禁令",
    "EXPLAIN / 行宽 / 缓冲池命中 比口诀优先",
    "```",
    "",
    "“禁止存大文件”禁的是把库当网盘"
  ].join('\n'),

  "mysql-instance-table-count-not-500": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 规范数字是启发式，不是语法禁令",
    "EXPLAIN / 行宽 / 缓冲池命中 比口诀优先",
    "```",
    "",
    "“单实例表数必须<500”是容量启发式"
  ].join('\n'),

  "mysql-db-features-ban-not-absolute": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "“禁止存储过程/视图/触发器/Event”是算力上移策略"
  ].join('\n'),

  "mysql-ddl-merge-heuristic": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "“同表 DDL 必须合并一条”是锁窗口策略"
  ].join('\n'),

  "mysql-pk-autoinc-not-only-choice": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "“表必须有自增主键”把主键策略收窄了"
  ].join('\n'),

  "mysql-subquery-ban-not-absolute": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "“禁止大表子查询”要看改写与物化"
  ].join('\n'),

  "mysql-scalability-not-hopeless": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "“MySQL 扩展性差”不能当 NoSQL 唯一理由"
  ].join('\n'),

  "mysql-innodb-fulltext": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "InnoDB 全文索引：先确定版本再回答"
  ].join('\n'),

  "mysql-spatial-index-not-full-gis": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-innodb-index-lock": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-unique-change-buffer": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 唯一索引写入通常用不上 change buffer",
    "EXPLAIN SELECT 1;",
    "```",
    "",
    "用计划与手册核对，不靠绝对禁令。"
  ].join('\n'),

  "mysql-prefix-index-and-cost": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-covering-not-index-kind": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SELECT id, title FROM posts WHERE ...;  -- 列表少投影",
    "-- SELECT * 难覆盖，大列进结果集",
    "```"
  ].join('\n'),

  "mysql-innodb-no-user-hash": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "InnoDB 没有用户可建的 Hash 索引"
  ].join('\n'),

  "mysql-index-count-five-not-law": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-implicit-convert-breaks-index": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-where-func-blocks-index": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-generated-column-not-where-wrap": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-negative-predicate-not-always-scan": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-leading-percent-like-heuristic": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-low-selectivity-index-heuristic": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-composite-selectivity-order-heuristic": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-count-star-innodb-not-always-scan": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "“InnoDB 的 count(*) 一定扫全表”说满了"
  ].join('\n'),

  "mysql-extend-index-before-new": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-and-order-optimizer-reorders": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-right-fuzzy-like-can-use-index": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "EXPLAIN SELECT ... WHERE ...;",
    "-- 看 type / key / rows / Extra",
    "-- 列上函数、错类型、前导 % 常挡索引",
    "```"
  ].join('\n'),

  "mysql-slow-sql-locate": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "慢 SQL 先按累计耗时定位，再拿去看执行计划"
  ].join('\n'),

  "mysql-slow-sql-optimize": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "慢 SQL 的优化要让检查行数下降，并再测一次"
  ].join('\n'),

  "mysql-mvcc-not-two-version-columns": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "InnoDB MVCC 不是“行尾两个创建/删除版本列”那么简单"
  ].join('\n'),

  "mysql-acid-c-is-consistency": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "ACID 的 C 是一致性，隔离也不是永远串行"
  ].join('\n'),

  "nosql-label-not-eventual": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# NoSQL 是分类标签，不是「最终一致、没有 ACID」",
    "```",
    "",
    "对照本课 example 自测；能跑的最小片段优先。"
  ].join('\n'),

  "mysql-myisam-innodb": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "MyISAM 与 InnoDB：默认引擎与隐藏行 ID"
  ].join('\n'),

  "mysql-innodb-tablespace": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "InnoDB 表大小：默认 16KB 页对应 64TB 量级，不是 2GB"
  ].join('\n'),

  "mysql-replication-flow": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "复制三步：dump、relay、applier，不是 replay log"
  ].join('\n'),

  "mysql-replica-lag": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "从库读到的是已经追上的数据吗"
  ].join('\n'),

  "mysql-buffer-pool-size": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "Buffer Pool 默认 128MB，比例只属于专用机"
  ].join('\n'),

  "mysql-query-cache-removal": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "MySQL Query Cache：旧调优题的失效边界"
  ].join('\n'),

  "mysql-replica-parallel-applier": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "从库应用不再只能是一条 SQL 线程（MySQL 8.0+）"
  ].join('\n'),

  "mysql-redo-undo-binlog": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "redo/undo/binlog 不是同一本日记"
  ].join('\n'),

  "mysql-pt-checksum-pk": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "主从一致性校验靠分块 checksum，不是直接改从库"
  ].join('\n'),

  "mysql-initialize-not-install-db": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "8.4 用 mysqld --initialize，不是 mysql_install_db"
  ].join('\n'),

  "mysql-autoinc-persists-8": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "InnoDB 自增重启后不再从空洞里捡号，是 8.0 才持久化的"
  ].join('\n'),

  "redis-data-types": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "SET k v EX 60",
    "MEMORY USAGE k",
    "INFO memory",
    "```",
    "",
    "大 key / 热 key / 淘汰策略要分开看。"
  ].join('\n'),

  "redis-zset-rank-range": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "ZADD rank 100 u1 200 u2",
    "ZREVRANGE rank 0 9 WITHSCORES",
    "```"
  ].join('\n'),

  "redis-geo-on-zset-not-gis": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "ZADD rank 100 u1 200 u2",
    "ZREVRANGE rank 0 9 WITHSCORES",
    "```"
  ].join('\n'),

  "redis-hyperloglog-approx": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "PFADD uv:day u1 u2",
    "PFCOUNT uv:day   # 近似基数，列不出成员",
    "```"
  ].join('\n'),

  "redis-client-side-cache-invalidate": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "SET k v EX 60",
    "MEMORY USAGE k",
    "INFO memory",
    "```",
    "",
    "大 key / 热 key / 淘汰策略要分开看。"
  ].join('\n'),

  "redis-big-hot-key": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "SET k v EX 60",
    "MEMORY USAGE k",
    "INFO memory",
    "```",
    "",
    "大 key / 热 key / 淘汰策略要分开看。"
  ].join('\n'),

  "redis-expire": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "SET k v EX 60",
    "MEMORY USAGE k",
    "INFO memory",
    "```",
    "",
    "大 key / 热 key / 淘汰策略要分开看。"
  ].join('\n'),

  "redis-eviction-policy-menu": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "SET k v EX 60",
    "MEMORY USAGE k",
    "INFO memory",
    "```",
    "",
    "大 key / 热 key / 淘汰策略要分开看。"
  ].join('\n'),

  "redis-fifo-not-maxmemory": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "SET k v EX 60",
    "MEMORY USAGE k",
    "INFO memory",
    "```",
    "",
    "大 key / 热 key / 淘汰策略要分开看。"
  ].join('\n'),

  "redis-string-max-512mb": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "SET k v EX 60",
    "MEMORY USAGE k",
    "INFO memory",
    "```",
    "",
    "大 key / 热 key / 淘汰策略要分开看。"
  ].join('\n'),

  "redis-list-quicklist-listpack": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "SET k v EX 60",
    "MEMORY USAGE k",
    "INFO memory",
    "```",
    "",
    "大 key / 热 key / 淘汰策略要分开看。"
  ].join('\n'),

  "redis-persistence": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "INFO persistence",
    "BGSAVE",
    "BGREWRITEAOF",
    "```",
    "",
    "持久化窗口与阻塞点要分开量。"
  ].join('\n'),

  "redis-transaction": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "MULTI",
    "SET a 1",
    "INCR b",
    "EXEC",
    "# 或 EVAL / FCALL / ACL SETUSER",
    "```",
    "",
    "Redis MULTI/EXEC 与 WATCH"
  ].join('\n'),

  "redis-sentinel-cluster": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "CLUSTER NODES",
    "SENTINEL masters",
    "# INCR 只作用在一个槽/一个键",
    "```"
  ].join('\n'),

  "redis-legacy-vm-limits": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "MULTI",
    "SET a 1",
    "INCR b",
    "EXEC",
    "# 或 EVAL / FCALL / ACL SETUSER",
    "```",
    "",
    "Redis 没有 VM 换页，字符串上限也不是 1GB 或 512KB"
  ].join('\n'),

  "redis-repl-psync-not-sql": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "INFO persistence",
    "BGSAVE",
    "BGREWRITEAOF",
    "```",
    "",
    "持久化窗口与阻塞点要分开量。"
  ].join('\n'),

  "redis-aof-keeps-rdb": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "INFO persistence",
    "BGSAVE",
    "BGREWRITEAOF",
    "```",
    "",
    "持久化窗口与阻塞点要分开量。"
  ].join('\n'),

  "redis-cluster-cli-not-trib": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "CLUSTER NODES",
    "SENTINEL masters",
    "# INCR 只作用在一个槽/一个键",
    "```"
  ].join('\n'),

  "redis-proxy-hash-not-cluster": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "CLUSTER NODES",
    "SENTINEL masters",
    "# INCR 只作用在一个槽/一个键",
    "```"
  ].join('\n'),

  "redis-save-blocks-bgsave": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "INFO persistence",
    "BGSAVE",
    "BGREWRITEAOF",
    "```",
    "",
    "持久化窗口与阻塞点要分开量。"
  ].join('\n'),

  "redis-cluster-incr-not-five-steps": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "CLUSTER NODES",
    "SENTINEL masters",
    "# INCR 只作用在一个槽/一个键",
    "```"
  ].join('\n'),

  "redis-functions-not-just-eval": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "MULTI",
    "SET a 1",
    "INCR b",
    "EXEC",
    "# 或 EVAL / FCALL / ACL SETUSER",
    "```",
    "",
    "Redis Functions 是注册后的库，不是每次 EVAL 贴脚本的同义词"
  ].join('\n'),

  "redis-acl-not-just-requirepass": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "MULTI",
    "SET a 1",
    "INCR b",
    "EXEC",
    "# 或 EVAL / FCALL / ACL SETUSER",
    "```",
    "",
    "Redis ACL 按用户裁命令与键，不是只设一个 requirepass"
  ].join('\n'),

  "redis-keyspace-notify-not-queue": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "MULTI",
    "SET a 1",
    "INCR b",
    "EXEC",
    "# 或 EVAL / FCALL / ACL SETUSER",
    "```",
    "",
    "键空间通知是 Pub/Sub 信号，不是可靠工作队列"
  ].join('\n'),

  "spring-bean-lifecycle": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "Bean 先造出来，再注入，然后才初始化"
  ].join('\n'),

  "spring-scope-catalog": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "Spring 内建作用域：别背 global-session 那一套"
  ].join('\n'),

  "spring-legacy-config": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "Spring 旧配置题的版本边界"
  ].join('\n'),

  "spring-boot-war-still-ok": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "Boot 能内嵌 Tomcat，也可以打 WAR 外置"
  ].join('\n'),

  "spring-boot3-autoconfig-imports": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "Boot 3 自动配置不再靠 spring.factories 那一张清单"
  ].join('\n'),

  "spring-xmlbeanfactory-removed": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "XmlBeanFactory 已删除，别把容器说成只有延迟工厂"
  ].join('\n'),

  "spring-mvc-dispatch": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@RestController",
    "@RequestMapping(\"/orders\")",
    "class OrderController {",
    "  @GetMapping(\"/{id}\") Order get(@PathVariable long id) { ... }",
    "}",
    "```"
  ].join('\n'),

  "spring-mvc-controller-singleton": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@RestController",
    "@RequestMapping(\"/orders\")",
    "class OrderController {",
    "  @GetMapping(\"/{id}\") Order get(@PathVariable long id) { ... }",
    "}",
    "```"
  ].join('\n'),

  "spring-aop-proxy-type": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Aspect @Component",
    "class LogAspect {",
    "  @Around(\"execution(* com.app..*(..))\")",
    "  Object around(ProceedingJoinPoint p) { return p.proceed(); }",
    "}",
    "```",
    "",
    "同类 this 调用不进代理。"
  ].join('\n'),

  "spring-boot-aop-cglib-default": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Aspect @Component",
    "class LogAspect {",
    "  @Around(\"execution(* com.app..*(..))\")",
    "  Object around(ProceedingJoinPoint p) { return p.proceed(); }",
    "}",
    "```",
    "",
    "同类 this 调用不进代理。"
  ].join('\n'),

  "jpa-entity-identity": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Entity class Order { @Id Long id; ... }",
    "// 会话内脏检查 / N+1：看 EntityGraph 与 fetch",
    "em.find(Order.class, id);",
    "```",
    "",
    "实体身份靠主键，不等于数据库里的一行快照"
  ].join('\n'),

  "jpa-session-nplus1": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Entity class Order { @Id Long id; ... }",
    "// 会话内脏检查 / N+1：看 EntityGraph 与 fetch",
    "em.find(Order.class, id);",
    "```",
    "",
    "JPA 会话里的对象不是 SQL 行，N+1 是一次循环里的下一次查询"
  ].join('\n'),

  "jpa-flush-transaction": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Entity class Order { @Id Long id; ... }",
    "// 会话内脏检查 / N+1：看 EntityGraph 与 fetch",
    "em.find(Order.class, id);",
    "```",
    "",
    "flush 把脏实体写成 SQL，提交才结束事务"
  ].join('\n'),

  "jpa-osiv-boundary": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Entity class Order { @Id Long id; ... }",
    "// 会话内脏检查 / N+1：看 EntityGraph 与 fetch",
    "em.find(Order.class, id);",
    "```",
    "",
    "会话不要为了懒加载一直开到视图"
  ].join('\n'),

  "jpa-dirty-check": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Entity class Order { @Id Long id; ... }",
    "// 会话内脏检查 / N+1：看 EntityGraph 与 fetch",
    "em.find(Order.class, id);",
    "```",
    "",
    "托管实体改了字段，flush 时自己变成 UPDATE"
  ].join('\n'),

  "jpa-optimistic-lock": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Entity class Order { @Id Long id; ... }",
    "// 会话内脏检查 / N+1：看 EntityGraph 与 fetch",
    "em.find(Order.class, id);",
    "```",
    "",
    "@Version 用版本号发现两人同时改了一行"
  ].join('\n'),

  "jpa-page-vs-slice": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Entity class Order { @Id Long id; ... }",
    "// 会话内脏检查 / N+1：看 EntityGraph 与 fetch",
    "em.find(Order.class, id);",
    "```",
    "",
    "Page 会再查一遍总数，只要下一页有没有时用 Slice"
  ].join('\n'),

  "jpa-entity-graph": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@Entity class Order { @Id Long id; ... }",
    "// 会话内脏检查 / N+1：看 EntityGraph 与 fetch",
    "em.find(Order.class, id);",
    "```",
    "",
    "这一次要加载的关联用实体图声明，不要改成全局 EAGER"
  ].join('\n'),

  "mybatis-mapper-bound": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-resultmap": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-dynamic-sql": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-type-handler": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-lazy-javassist-not-cglib": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-local-cache": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-batch-executor": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-plugin-interceptor": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-rowbounds-memory": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-second-cache": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-jdbc-log-inlines": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-debug-boundsql": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-plus-page-argument": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "mybatis-middleware-layers": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```xml",
    "<select id=\"find\" resultMap=\"OrderMap\">",
    "  SELECT * FROM orders WHERE id = #{id}",
    "</select>",
    "<!-- #{} 参数绑定；${} 是拼接 -->",
    "```"
  ].join('\n'),

  "spring-session-stateless": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "无状态 API 不要再为每次 Bearer 请求创建会话"
  ].join('\n'),

  "mq-why-decouple": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "投递语义：at-most / at-least / exactly-once(说法)",
    "业务幂等要落存储",
    "```",
    "",
    "消息中间件先解耦时间，再谈选型"
  ].join('\n'),

  "mq-delivery-semantics": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "投递语义：at-most / at-least / exactly-once(说法)",
    "业务幂等要落存储",
    "```",
    "",
    "投递语义只有三种说法，业务语义另算"
  ].join('\n'),

  "mq-compare-matrix": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "投递语义：at-most / at-least / exactly-once(说法)",
    "业务幂等要落存储",
    "```",
    "",
    "五种消息中间件的模型纵览"
  ].join('\n'),

  "mq-pick-workload": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "投递语义：at-most / at-least / exactly-once(说法)",
    "业务幂等要落存储",
    "```",
    "",
    "先定工作负载，再在 Kafka、RabbitMQ、RocketMQ 里选一个"
  ].join('\n'),

  "mq-backpressure-producer": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "投递语义：at-most / at-least / exactly-once(说法)",
    "业务幂等要落存储",
    "```",
    "",
    "生产端也要背压，不能只扩消费者"
  ].join('\n'),

  "mq-dlq-backlog": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "投递语义：at-most / at-least / exactly-once(说法)",
    "业务幂等要落存储",
    "```",
    "",
    "处理不了的消息要进死信，积压要能看见，不能靠消费者一直抛错"
  ].join('\n'),

  "mq-backlog-expand-queues": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "投递语义：at-most / at-least / exactly-once(说法)",
    "业务幂等要落存储",
    "```",
    "",
    "堆积时加消费者，受分区或队列数上限"
  ].join('\n'),

  "kafka-model": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → broker (acks) → ISR",
    "consumer: position vs committed offset",
    "rebalance 会暂停拉取",
    "```",
    "",
    "Kafka：主题、分区与消费组"
  ].join('\n'),

  "kafka-producer-acks": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → broker (acks) → ISR",
    "consumer: position vs committed offset",
    "rebalance 会暂停拉取",
    "```",
    "",
    "生产者发出去，还不等于副本都记下了"
  ].join('\n'),

  "kafka-isr-hwm": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → broker (acks) → ISR",
    "consumer: position vs committed offset",
    "rebalance 会暂停拉取",
    "```",
    "",
    "Kafka 的 ISR 与高水位"
  ].join('\n'),

  "kafka-offset": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → broker (acks) → ISR",
    "consumer: position vs committed offset",
    "rebalance 会暂停拉取",
    "```",
    "",
    "Kafka position 与 committed offset"
  ].join('\n'),

  "kafka-rebalance": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → broker (acks) → ISR",
    "consumer: position vs committed offset",
    "rebalance 会暂停拉取",
    "```",
    "",
    "Kafka 消费组再平衡会暂停拉取"
  ].join('\n'),

  "kafka-kraft-not-zk": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → broker (acks) → ISR",
    "consumer: position vs committed offset",
    "rebalance 会暂停拉取",
    "```",
    "",
    "现行 Kafka 用 KRaft 管元数据，活着不再等于连上 ZooKeeper"
  ].join('\n'),

  "kafka-producer-does-batch": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → broker (acks) → ISR",
    "consumer: position vs committed offset",
    "rebalance 会暂停拉取",
    "```",
    "",
    "Kafka 会攒批，也不靠 Scala 才能运维"
  ].join('\n'),

  "kafka-isr-lag-time-not-count": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → broker (acks) → ISR",
    "consumer: position vs committed offset",
    "rebalance 会暂停拉取",
    "```",
    "",
    "踢出 ISR 看落后时间，不是数差了四千条（Kafka lag.time）"
  ].join('\n'),

  "kafka-partitions-increase-only": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → broker (acks) → ISR",
    "consumer: position vs committed offset",
    "rebalance 会暂停拉取",
    "```",
    "",
    "Kafka 分区能加不能减，加完键的映射会变"
  ].join('\n'),

  "rabbit-model": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → exchange --binding--> queue → consumer",
    "ack / nack / 死信",
    "```"
  ].join('\n'),

  "rabbit-exchange-binding": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → exchange --binding--> queue → consumer",
    "ack / nack / 死信",
    "```"
  ].join('\n'),

  "rabbit-ack": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → exchange --binding--> queue → consumer",
    "ack / nack / 死信",
    "```"
  ].join('\n'),

  "rabbit-ha-queue": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → exchange --binding--> queue → consumer",
    "ack / nack / 死信",
    "```"
  ].join('\n'),

  "rabbit-queue-not-unbounded": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "producer → exchange --binding--> queue → consumer",
    "ack / nack / 死信",
    "```"
  ].join('\n'),

  "rocketmq-model": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "topic / queue / consumer group",
    "顺序只在同一 queue；刷盘与 HA 另看",
    "```"
  ].join('\n'),

  "rocketmq-queue-order": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "topic / queue / consumer group",
    "顺序只在同一 queue；刷盘与 HA 另看",
    "```"
  ].join('\n'),

  "rocketmq-flush-ha": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "topic / queue / consumer group",
    "顺序只在同一 queue；刷盘与 HA 另看",
    "```"
  ].join('\n'),

  "rocketmq-store-not-ram-buffer": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "topic / queue / consumer group",
    "顺序只在同一 queue；刷盘与 HA 另看",
    "```"
  ].join('\n'),

  "rocketmq-send-oneway-may-drop": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "topic / queue / consumer group",
    "顺序只在同一 queue；刷盘与 HA 另看",
    "```"
  ].join('\n'),

  "activemq-jms-model": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# ActiveMQ：JMS 的队列与主题",
    "对照 JMS / Pulsar 分段模型文档",
    "```"
  ].join('\n'),

  "pulsar-segment-model": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# Pulsar：计算与存储分离的流",
    "对照 JMS / Pulsar 分段模型文档",
    "```"
  ].join('\n'),

  "activemq-prefetch-limit": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# ActiveMQ 预取会让消息堆在一个消费者里",
    "对照 JMS / Pulsar 分段模型文档",
    "```"
  ].join('\n'),

  "activemq-queue-competing-consumers": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# 点对点队列可以有多个消费者争抢，不是两人专线",
    "对照 JMS / Pulsar 分段模型文档",
    "```"
  ].join('\n'),

  "config-center-poll-needs-watch": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# 配置中心靠定时盲轮询不够，要用变更通知或长轮询",
    "超时 / 重试 / 幂等 要写在同一契约里",
    "```"
  ].join('\n'),

  "eureka-lease-30-90": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# Eureka 默认 30 秒心跳、90 秒摘除，但发现不只有这一家",
    "超时 / 重试 / 幂等 要写在同一契约里",
    "```"
  ].join('\n'),

  "sql-keyset-page": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "-- 深分页不要靠越来越大的 OFFSET",
    "EXPLAIN SELECT 1;",
    "```",
    "",
    "用计划与手册核对，不靠绝对禁令。"
  ].join('\n'),

  "redis-lock-getset-wall-clock": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```redis",
    "MULTI",
    "SET a 1",
    "INCR b",
    "EXEC",
    "# 或 EVAL / FCALL / ACL SETUSER",
    "```",
    "",
    "用本机墙钟做 Redis 锁过期会偏"
  ].join('\n'),

  "mysql-for-update-not-dist-lease": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```sql",
    "SHOW ENGINE INNODB STATUS\\G",
    "-- 或 EXPLAIN / 复制延迟指标",
    "-- 口诀对照官方行为再下结论",
    "```",
    "",
    "FOR UPDATE 是事务行锁，不是跨机租约"
  ].join('\n'),

  "http-redirect-lb-two-hops": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```http",
    "HTTP/1.1 302",
    "Location: https://b.example/x",
    "# 客户端再发第二次请求",
    "```",
    "",
    "302 LB 是两跳，不是单跳反代。"
  ].join('\n'),

  "microservices-not-just-soa-relabel": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```text",
    "# “微服务本质还是 SOA”抹掉了关键差别",
    "超时 / 重试 / 幂等 要写在同一契约里",
    "```"
  ].join('\n'),

  "spring-test-slice": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "整容器测试和切片测试解决的不是同一个问题"
  ].join('\n'),

  "spring-test-transaction-rollback": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "测试里的事务回滚，证明不了提交后别人能不能读到"
  ].join('\n'),

  "spring-dirties-context": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// Spring: @DirtiesContext 会扔掉整个容器，不要当默认清理手段",
    "```"
  ].join('\n'),

  "java-http-timeout": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "// 建连超时管不到整次调用（Java 11 HttpClient）",
    "public static void main(String[] args) {",
    "  // 对照本课 core：写出最小反例",
    "}",
    "```"
  ].join('\n'),

  "spring-graceful-shutdown": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@SpringBootApplication",
    "public class App {",
    "  public static void main(String[] args) {",
    "    SpringApplication.run(App.class, args);",
    "  }",
    "}",
    "```",
    "",
    "停机时先停新请求，再等手里的请求做完"
  ].join('\n'),

  "secrets-not-in-image": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```bash",
    "# 密钥在运行时注入，不要烤进镜像和仓库",
    "kubectl get pods -o wide",
    "# 或 docker / git 对照本课断言",
    "```"
  ].join('\n'),

  "spring-boot-devtools-restarts": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```java",
    "@RestController",
    "@RequestMapping(\"/orders\")",
    "class OrderController {",
    "  @GetMapping(\"/{id}\") Order get(@PathVariable long id) { ... }",
    "}",
    "```"
  ].join('\n'),

  "git-restore-over-checkout": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```bash",
    "# 恢复文件用 git restore，checkout 不再一身二职",
    "kubectl get pods -o wide",
    "# 或 docker / git 对照本课断言",
    "```"
  ].join('\n'),

  "linux-bkl-gone": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```bash",
    "# Linux 已经没有大内核锁，内核也不再“绝对不能抢占”",
    "kubectl get pods -o wide",
    "# 或 docker / git 对照本课断言",
    "```"
  ].join('\n'),

  "linux-root-group-not-root": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```bash",
    "# 加进 root 组不等于得到 root，清日志也不要从根目录 rm",
    "kubectl get pods -o wide",
    "# 或 docker / git 对照本课断言",
    "```"
  ].join('\n'),

  "linux-fork-copies-one-thread": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```bash",
    "# 多线程进程里 fork 只复制调用它的那条线程",
    "kubectl get pods -o wide",
    "# 或 docker / git 对照本课断言",
    "```"
  ].join('\n'),

  "etcd-v3-grpc-not-rest": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```bash",
    "# etcd v3 走 gRPC，不要再背 HTTP+JSON 当默认 API",
    "kubectl get pods -o wide",
    "# 或 docker / git 对照本课断言",
    "```"
  ].join('\n'),

  "git-default-branch-not-master": [
    "对照本课断言，先写出最小可观察片段：",
    "",
    "```bash",
    "# 仓库默认分支常常是 main，不必再叫 master",
    "git symbolic-ref refs/remotes/origin/HEAD",
    "# → refs/remotes/origin/main（常见）",
    "```"
  ].join('\n'),

  'mysql-column-count-thirty-not-law': [
    '列数看访问模式，不是「超过 30 就违法」：',
    '',
    '```text',
    '用户画像 40 个稀疏属性 → 侧表 / JSON',
    '订单核心 12 列 → 主表保持窄，列表少回表',
    '```',
  ].join('\n'),

  'mysql-catch-sql-exception-not-enough': [
    '按错误码分流；别 catch(Exception) 全吞：',
    '',
    '```java',
    'try { place(); }',
    'catch (SQLException e) {',
    '  if (isDeadlock(e)) retryLimited();',
    '  else if (isDuplicateKey(e)) return alreadyOrdered();',
    '  else { alert(e); throw e; }',
    '}',
    '```',
  ].join('\n'),

  'db-proxy-layer-not-only-choice': [
    '中间层与应用侧分片是两条路：',
    '',
    '```text',
    'ProxySQL / 自研代理 → 读写分离、连接池',
    'ShardingSphere 应用侧 → 分片规则在进程内',
    '跨片查询 / 分布式事务仍要单独设计',
    '```',
  ].join('\n'),

  'db-sequence-batch-not-gapless': [
    '批量取号会断号，崩溃丢一段属正常：',
    '',
    '```sql',
    'UPDATE seq SET val = val + 500 WHERE name = "order";',
    '-- 进程拿走 [n, n+499]；崩溃未用完 → 号段空洞',
    '-- 不要当「连续无洞」的业务流水号',
    '```',
  ].join('\n'),

  'db-autoinc-offset-step-needs-ops': [
    '多主 offset/step 是运维契约，不是改完就忘：',
    '',
    '```sql',
    '-- 两主：auto_increment_increment=2',
    '-- 主 A offset=1 → 1,3,5…；主 B offset=2 → 2,4,6…',
    '-- 扩到三主要重算步长与偏移，并核对无冲突',
    '```',
  ].join('\n'),

  'hashmap-treeify-need-capacity': [
    '同桶链够长且表够大才会树化：',
    '',
    '```java',
    '// 一批 hashCode 恒为 1、equals 各不同的键',
    'Map<K,V> m = new HashMap<>(); // 默认容量 16',
    '// 链长到阈值且 table 容量 ≥ 64 才转红黑树',
    '// 容量太小时只会扩容，不一定树化',
    '```',
  ].join('\n'),

  'chm-iterator-weakly-consistent': [
    '迭代中 put 不抛 CME，也不保证看见新键：',
    '',
    '```java',
    'ConcurrentHashMap<Integer,Integer> m = new ConcurrentHashMap<>();',
    'm.put(1, 1);',
    'for (var e : m.entrySet()) {',
    '  m.put(2, 2); // 不抛 ConcurrentModificationException',
    '  // 本轮可能看见也可能看不见 2',
    '}',
    '```',
  ].join('\n'),

  'chm-jdk8-not-segment-lock': [
    'JDK 8+ 默认不是 16 段 Segment：',
    '',
    '```text',
    'JDK 21 源码：无 Segment 默认结构',
    '冲突严重 → 桶级同步 / 树化，不是一把大分段锁',
    '```',
  ].join('\n'),

  'dns-lb-not-just-round-robin': [
    'DNS 双 A 摘不掉客户端缓存里的坏地址：',
    '',
    '```text',
    '双 A → 一台宕机 → 仍有客户端因 TTL 打坏地址',
    '摘流：健康检查负载均衡',
    'DNS：粗粒度容灾 / 就近，不是精细 LB',
    '```',
  ].join('\n'),

  'seckill-js-needs-cache-control': [
    '闸门脚本必须禁止被 CDN 长时间缓存：',
    '',
    '```http',
    'GET /seckill/gate.js',
    'Cache-Control: no-store',
    '{"open":false}',
    '# 未设 Cache-Control → CDN 缓存 5 分钟仍返回 false',
    '```',
  ].join('\n'),

  'seckill-client-gate-not-enough': [
    '按钮禁用挡不住直接 POST：',
    '',
    '```text',
    '页面：整点前 button disabled',
    '攻击：开始前 POST /order',
    '→ 接口必须查活动窗口 + 条件扣库存，不能「来了就扣」',
    '```',
  ].join('\n'),

  'dist-lock-owner-not-mac-pid-tid': [
    '锁值要用随机令牌，不要拼 MAC|pid|tid：',
    '',
    '```text',
    '错误：owner=mac|pid|tid → 进程崩后值可被复用误解锁',
    '正确：SET key uuid NX EX 30；释放用 Lua 比对 uuid',
    '```',
  ].join('\n'),

  'dist-lock-reentrant-not-deadlock-cure': [
    '可重入只方便同线程再进，不治跨线程死锁：',
    '',
    '```text',
    '同线程再抢同一 key → count 1→2（可重入）',
    '线程 A 持 lock:order、等 lock:pay；B 相反 → 仍死锁',
    '```',
  ].join('\n'),

  'lru-capacity-not-ttl-expire': [
    'LRU 管容量；TTL 是另一条过期轴：',
    '',
    '```text',
    'set(k,v) → 移到链表头；满了删尾',
    '无 expireAt → 10 分钟业务失效要另设 TTL / 主动删',
    '```',
  ].join('\n'),

  'base-slogan-not-ban-tx': [
    'BASE 口号不禁止该用事务的地方：',
    '',
    '```text',
    '详情缓存 / 粉丝数 → 可最终一致',
    '下单扣库存 → 同库条件更新，或 Outbox + 幂等对账',
    '```',
  ].join('\n'),

  'split-vs-cluster-not-interchangeable': [
    '拆分与集群扩容不是同义词：',
    '',
    '```text',
    '订单服务三副本 = 集群（同职责）',
    '订单与库存分开部署 = 拆分（不同边界）',
    '常见路径：先拆边界，再对热点服务加副本',
    '```',
  ].join('\n'),

  'service-extract-not-only-connection-math': [
    '连接打满先池化/代理，再谈抽用户服务：',
    '',
    '```text',
    '200 应用直连同一集群 → 先代理、只读拆分、池化',
    '共用用户逻辑清晰后再抽用户服务',
    '不要只算「连接数 / 服务数」就拆',
    '```',
  ].join('\n'),

  'select-not-always-business-idempotent': [
    '只读查询可重试；带副作用的 SELECT 要幂等键：',
    '',
    '```sql',
    'SELECT qty FROM stock WHERE sku=?;           -- 可重试',
    '-- SELECT … FOR UPDATE 并标记「券已展示」→ 有副作用，需幂等键',
    '```',
  ].join('\n'),

  'cap-label-not-product-tattoo': [
    '产品名上的 CP/AP 标签盖不住具体读写语义：',
    '',
    '```text',
    '多数写关注 → 偏一致；主读偏好 → 读可能旧',
    '不要一句「某某是 CP」代替写关注与读偏好配置',
    '```',
  ].join('\n'),

  'hash-skew-not-only-virtual-nodes': [
    '虚节点缓解偏斜，热点键仍要隔离：',
    '',
    '```text',
    '用户 id 哈希较匀 → 虚节点够用',
    '秒杀 item_id → 单独热点键 / 分桶，不是加虚节点就完事',
    '```',
  ].join('\n'),

  'message-order-not-always-required': [
    '只有同一业务键才需要分区有序：',
    '',
    '```text',
    '同一 orderId 的 Created→Paid → 同分区保序',
    '不同订单互相乱序通常可接受',
    '全局单队列保序会牺牲吞吐',
    '```',
  ].join('\n'),

  'sync-replication-not-only-durability': [
    '同步复制换的是延迟与可用性，不只是「更耐久」：',
    '',
    '```text',
    '同步等到从库确认 → 主库写延迟↑，从库挂可能卡住写入',
    '异步 → 主库快，故障可能丢已确认给客户端的数据',
    '```',
  ].join('\n'),

  'snowflake-params-need-capacity-math': [
    '位宽要按峰值算，不能抄默认就上：',
    '',
    '```text',
    'worker 位 / 序列位决定单机 QPS 与机器数上限',
    '时钟回拨策略、机房位数要写进容量表，不是口头「够用」',
    '```',
  ].join('\n'),

  'hot-cold-ratio-not-fixed-one-to-four': [
    '冷热比例用查询统计校准，不是固定 1:4：',
    '',
    '```text',
    '订单：90 天热 / 两年温 / 更早冷备',
    '用访问分布调切点，不要背「热:冷=1:4」',
    '```',
  ].join('\n'),

  'business-split-db-not-only-path': [
    '按域拆库与库内按键分片可叠用：',
    '',
    '```text',
    '交易域一个库；订单表按 shop_id 哈希分片',
    '用户域另一库',
    '不是「要么只拆库要么只分片」',
    '```',
  ].join('\n'),

  cache: [
    '回填与删缓存竞态会写回脏值：',
    '',
    '```text',
    'A 读库得 5，准备回填；B 改库为 4 并删缓存',
    'A 把 5 写回缓存 → 下一请求读到脏 5',
    '→ 延时双删 / 版本号 / 单飞回填',
    '```',
  ].join('\n'),

  'message-delivery': [
    '至少一次投递要用业务唯一键挡重：',
    '',
    '```text',
    '订单 9 积分已写库，ack 前进程退出 → 重投',
    'INSERT 发放记录 UNIQUE(order_id) → 第二次跳过',
    '```',
  ].join('\n'),

  'rate-limit': [
    '全局限流挡不住单个重接口打满池：',
    '',
    '```text',
    '网关每用户 50 QPS，总入口正常',
    '报表每次占连接 2s → 并发>300 池耗尽',
    '→ 按路由单独配额 / 超时 / 隔离池',
    '```',
  ].join('\n'),

  'cache-aside-steps': [
    '旁路：读未命中回填；写成功删键：',
    '',
    '```text',
    '读：get → miss → DB → set',
    '写：更新 DB → DEL key（不要先写缓存新价）',
    '下一笔读未命中再回填',
    '```',
  ].join('\n'),

  'cache-penetration-vs-breakdown': [
    '穿透打空值；击穿打热点过期：',
    '',
    '```text',
    'id=-1 缓存与库都无 → 每次打存储 = 穿透（布隆/空值 TTL）',
    '秒杀 SKU 键刚好过期 → 并发回源 = 击穿（互斥/逻辑过期）',
    '```',
  ].join('\n'),

  'cache-local-vs-distributed': [
    '进程内缓存多副本会短暂不一致：',
    '',
    '```text',
    'A/B 各 Caffeine 缓存 SKU 名 30s',
    'A 更新名字；B 30s 内仍旧值',
    '要强一致读 → 分布式缓存或失效广播',
    '```',
  ].join('\n'),

  'redis-pubsub-not-reliable-queue': [
    'Pub/Sub 不落盘；履约要用队列语义：',
    '',
    '```text',
    '配置变更通知 → Pub/Sub 可',
    '订单履约 → Stream / Kafka（可积压、可消费组）',
    '```',
  ].join('\n'),

  'lru-needs-hash-and-list': [
    'O(1) LRU 要哈希 + 链表两套结构：',
    '',
    '```java',
    '// LinkedHashMap(accessOrder=true) 或手写 map + 双向链表',
    '// 满了删尾；TTL 另开过期轮询，不是 LRU 自带',
    '```',
  ].join('\n'),

  'schema-migration': [
    '迁移要可从空库顺序跑到当前；跳步应失败在缺列：',
    '',
    '```bash',
    'migrate up   # 空库 → 当前版本，应用能启动',
    '# 故意跳过「加幂等键」脚本 → 启动失败在缺列/约束',
    '```',
  ].join('\n'),

  'table-constraint-holds-rule': [
    '唯一约束挡住并发双插，不靠先查后插：',
    '',
    '```sql',
    'UNIQUE(idempotency_key)',
    '-- 两请求同键同时过 Java 查询 → 只有一行 INSERT 成功',
    '```',
  ].join('\n'),

  'jdbc-datasource-not-diy-pool': [
    '用容器管理的 DataSource，不要手写连接池：',
    '',
    '```yaml',
    'spring.datasource.hikari.maximum-pool-size: 20',
    '# 注入 DataSource / JdbcTemplate，勿 new 一堆 DriverManager',
    '```',
  ].join('\n'),

  'hikari-pool-timeout': [
    '借不到连接时异常发生在借池，查询还没开始：',
    '',
    '```text',
    '池 20 条都卡在未提交查询',
    '新请求 → connectionTimeout 内失败（拿不到连接）',
    '已借出的那条查询仍在跑，不是「SQL 超时」同一种错',
    '```',
  ].join('\n'),

  'log-correlation-id': [
    '网关生成请求 id，下游写入 MDC：',
    '',
    '```text',
    '网关：X-Request-Id: 8f3a → 访问日志',
    '订单服务：MDC.put("rid","8f3a") → 业务日志同一字段',
    '排障按 8f3a 串起多跳',
    '```',
  ].join('\n'),

  'otel-three-signals': [
    '指标报警 → 追踪定位慢段 → 日志看细节：',
    '',
    '```text',
    '结账 P99 200ms→2s（指标）',
    '打开一条 trace：支付跨度 1.8s（追踪）',
    '该跨度日志里的错误码（日志）',
    '```',
  ].join('\n'),

  'mfe-when-to-split': [
    '独立发版与独立回滚才值得拆前端：',
    '',
    '```text',
    '商品组每周发 / 结算组两周一发',
    '事故要能只回滚结算 → 两个可独立部署前端 + 壳只做登录导航',
    '```',
  ].join('\n'),

  'mfe-not-for-everything': [
    '同仓同 CI 总一起发时，用路由分包即可：',
    '',
    '```js',
    '// 十五人、一个仓、一条 CI',
    'const Settings = lazy(() => import("./Settings"))',
    '// 不必上微前端运行时',
    '```',
  ].join('\n'),

  'mfe-composition-models': [
    '一起验收用构建时钉版本；每天换活动用运行时加载：',
    '',
    '```text',
    '内部后台：设计系统打进各应用 / 发版清单钉版本',
    '运营活动页：壳运行时拉 remoteEntry',
    '```',
  ].join('\n'),

  'mfe-module-federation': [
    'exposes 映射到真实模块路径：',
    '',
    '```js',
    '// webpack ModuleFederationPlugin',
    'exposes: { "./OrderList": "./src/OrderList.jsx" }',
    '// host: import("orders/OrderList")',
    '```',
  ].join('\n'),

  'mfe-shared-deps': [
    'React 要 singleton，版本区间要对齐：',
    '',
    '```js',
    'shared: {',
    '  react: { singleton: true, requiredVersion: "^18" },',
    '  "react-dom": { singleton: true, requiredVersion: "^18" },',
    '}',
    '```',
  ].join('\n'),

  'mfe-runtime-lifecycle': [
    '匹配挂载，离开卸载并清定时器：',
    '',
    '```js',
    'if (match("/orders/*")) app.mount("#slot")',
    'else {',
    '  app.unmount()',
    '  clearInterval(timer)',
    '}',
    '```',
  ].join('\n'),

  'mfe-routing-one-history': [
    '子应用 basename 对齐壳的前缀：',
    '',
    '```js',
    '// 壳：/、/orders/*、/goods/*',
    '// 订单 remote：',
    'createBrowserRouter(routes, { basename: "/orders" })',
    '```',
  ].join('\n'),

  'mfe-style-isolation': [
    '样式限定在子应用根，或用 Shadow/CSS Modules：',
    '',
    '```css',
    '#orders-root .btn { color: blue; }',
    '/* 营销可用 Web Component / Shadow DOM */',
    '```',
  ].join('\n'),

  'mfe-shared-auth': [
    '同站会话用父域 HttpOnly Cookie；模块由壳注入用户：',
    '',
    '```http',
    'Set-Cookie: sid=...; Domain=.example.com; HttpOnly; Secure',
    '```',
    '',
    '```js',
    '// 壳 mount(remote, { user })，勿让每个 remote 各自存 token',
    '```',
  ].join('\n'),

  'mfe-independent-deploy': [
    '先上传带哈希的 remoteEntry，探活后再切指针：',
    '',
    '```bash',
    'upload /orders/remoteEntry.a1b2.js + chunks',
    '# 探活 OK → 把 orders 指针指到 a1b2',
    '# 回滚：指针改回上一哈希',
    '```',
  ].join('\n'),

  'mfe-perf-cost': [
    '按路由懒拉 remote，共享依赖只加载一次：',
    '',
    '```text',
    '进入 /orders/list → 只拉订单 remote',
    '点商品菜单 → 再拉商品 remote',
    'react singleton → 不重复下两份 React',
    '```',
  ].join('\n'),

  'mfe-contract-version': [
    '契约写清暴露名、props 与前缀版本：',
    '',
    '```json',
    '{',
    '  "orders": {',
    '    "exposes": ["./OrderList"],',
    '    "props": { "id": "string" },',
    '    "prefix": "orders@1"',
    '  }',
    '}',
    '```',
  ].join('\n'),

  'css-box-sizing': [
    'content-box 会把 padding/border 加出父宽：',
    '',
    '```css',
    '.parent { width: 320px; }',
    '.child {',
    '  width: 100%;',
    '  padding: 16px;',
    '  border: 1px solid;',
    '  box-sizing: content-box; /* 实际占位 > 320 */',
    '}',
    '/* border-box 时宽仍落在 320 内 */',
    '```',
  ].join('\n'),

  'css-flex': [
    'flex 子项默认 min-width:auto，长词会撑破：',
    '',
    '```css',
    '.row { display: flex; }',
    '.item { width: 50%; flex: 1 1 auto; }',
    '.item:last-child { /* 不换行长串 */ min-width: 0; }',
    '```',
  ].join('\n'),

  'css-stacking': [
    '子元素再高的 z-index 也出不了父上下文：',
    '',
    '```css',
    '.a { position: relative; z-index: 1; }',
    '.b { position: relative; z-index: 2; }',
    '.a .child { z-index: 9999; } /* 仍在 .b 下面 */',
    '```',
  ].join('\n'),

  'css-grid-flex': [
    '窄屏：Flex 换行保顺序；Grid 可重排轨道：',
    '',
    '```css',
    '.flex { display: flex; flex-wrap: wrap; gap: 8px; }',
    '.grid {',
    '  display: grid;',
    '  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));',
    '}',
    '```',
  ].join('\n'),

  'css-containing-block': [
    'transform 会让 fixed 相对该元素定位：',
    '',
    '```css',
    '.card { transform: translateZ(0); } /* 含块变了 */',
    '.dialog { position: fixed; inset: 0; } /* 铺满 .card 而非窗口 */',
    '```',
  ].join('\n'),

  'css-position-flow': [
    '绝对定位贴最近的定位祖先：',
    '',
    '```css',
    '.parent { /* 无 position → 弹层贴更外层 */ }',
    '.parent { position: relative; }',
    '.pop { position: absolute; top: 100%; left: 0; }',
    '```',
  ].join('\n'),

  'css-container-query': [
    '按容器宽度改内部布局，不是只看视口：',
    '',
    '```css',
    '.card { container-type: inline-size; }',
    '@container (min-width: 400px) {',
    '  .meta { display: flex; }',
    '}',
    '```',
  ].join('\n'),

  'css-has-parent': [
    '子节点出现即可匹配父级，不必脚本加 class：',
    '',
    '```css',
    'article:has(.error) { border-color: red; }',
    '```',
  ].join('\n'),

  'css-aspect-ratio': [
    '先占位再出图，避免标题被顶下去：',
    '',
    '```css',
    'img.hero {',
    '  width: 100%;',
    '  aspect-ratio: 16 / 9;',
    '  height: auto;',
    '}',
    '```',
  ].join('\n'),

  'linked-list': [
    'Hooks 按调用顺序对应链表节点，不能条件跳过：',
    '',
    '```jsx',
    'function Comp({ flag }) {',
    '  const [n, setN] = useState(0)',
    '  // if (flag) useState("a")  // 禁止：下次渲染顺序乱',
    '  const [s, setS] = useState("a")',
    '}',
    '```',
  ].join('\n'),

  'event-system': [
    'React 里先子后父；stopPropagation 挡住外层：',
    '',
    '```jsx',
    '<div onClick={() => console.log("outer")}>',
    '  <button onClick={(e) => {',
    '    e.stopPropagation()',
    '    console.log("inner")',
    '  }}>ok</button>',
    '</div>',
    '// 点按钮只打 inner',
    '```',
  ].join('\n'),

  context: [
    '内层 Provider value 换新对象，只惊动读它的消费者：',
    '',
    '```jsx',
    '<Theme.Provider value="light">',
    '  <Draft.Provider value={draftObj}>',
    '    <Editor /> {/* 只订 Draft 时，Theme 不变不重渲 */}',
    '  </Draft.Provider>',
    '</Theme.Provider>',
    '```',
  ].join('\n'),

  'react-event-root': [
    '合成事件在根委托；stopPropagation 仍挡外层 React 监听：',
    '',
    '```jsx',
    '<div onClick={onOuter}>',
    '  <button onClick={(e) => e.stopPropagation()}>x</button>',
    '</div>',
    '// 原生 document 捕获另说，见本课 deep',
    '```',
  ].join('\n'),

  'react-fiber-interrupt': [
    '低优先级工作可被输入打断后重做：',
    '',
    '```text',
    '打字 → 高优更新输入',
    '列表过滤（低优）协调到一半被丢弃',
    '稍后重做 → 一次提交同时带上最新输入与过滤结果',
    '```',
  ].join('\n'),

  'react-vdom-perf-bound': [
    '改一个文案，直接改 DOM 往往短于整树协调：',
    '',
    '```js',
    'button.textContent = "已提交" // 通常短于',
    '// render(<HugeTree/>) 再 diff 整棵子树',
    '```',
  ].join('\n'),

  'react-props-state-sync': [
    '能派生就别复制进 state：',
    '',
    '```jsx',
    '// 好：直接用 props.columns',
    '// 或 const visible = columns.filter(...)',
    '// 避免：useEffect(() => setCols(columns), [columns])',
    '```',
  ].join('\n'),

  'react-version-checklist': [
    '现行入口与过渡更新：',
    '',
    '```jsx',
    'createRoot(el).render(<App />)',
    'startTransition(() => setQuery(q)) // 列表过滤',
    '// 不要再 ReactDOM.render',
    '```',
  ].join('\n'),

  'react-gdsfp-copy': [
    '用 key 重置，或直接渲染 props，别抄进 state：',
    '',
    '```jsx',
    '<Editor key={userId} user={user} />',
    '// 或 render props.user；勿 getDerivedStateFromProps 同步复制',
    '```',
  ].join('\n'),

  'react-createclass-gone': [
    '新文件用函数组件 + Hooks：',
    '',
    '```jsx',
    'function Hello({ name }) {',
    '  const [n, setN] = useState(0)',
    '  return <p>{name}{n}</p>',
    '}',
    '// React.createClass 已移除',
    '```',
  ].join('\n'),

  'react-hooks-over-hoc': [
    '横切逻辑用自定义 Hook，少包一层 HOC：',
    '',
    '```jsx',
    'function useWindowWidth() {',
    '  const [w, setW] = useState(innerWidth)',
    '  useEffect(() => {',
    '    const on = () => setW(innerWidth)',
    '    addEventListener("resize", on)',
    '    return () => removeEventListener("resize", on)',
    '  }, [])',
    '  return w',
    '}',
    '```',
  ].join('\n'),

  'react-context-stable': [
    '稳定 value，避免无意义重渲染：',
    '',
    '```jsx',
    'const ThemeContext = createContext("light")',
    '// 坏：value={{ theme }} 每次新对象',
    '// 好：value={theme} 或 memo 后的对象',
    '```',
  ].join('\n'),

  'arch-evolution-stages': [
    '停在现在这一级，除非有你们自己的线上数字：',
    '',
    '```text',
    '现在：一个仓库，一次部署。没有多团队抢发布。停在这里。',
    '库 CPU 或锁等待打满 → 先优化 SQL。加应用副本可能更差。',
    '拆服务：订单和库存要各自发布、各自的库。没有这条就不拆。',
    '```',
  ].join('\n'),

  'arch-monolith-when': [
    '同应用用包隔开；慢先查索引缓存：',
    '',
    '```text',
    '下单/库存/支付同进程，package 边界',
    '库存变慢 → 索引与缓存，不是先拆三仓库',
    '订单代码直接改库存表 → 边界已破，再谈拆',
    '```',
  ].join('\n'),

  'arch-scale-before-split': [
    '先分清瓶颈在应用还是在库：',
    '',
    '```text',
    '应用 CPU 高、库闲 → 加副本，吞吐↑',
    '库行锁高、应用闲 → 再加副本锁更挤，要优化/拆库',
    '```',
  ].join('\n'),

  'arch-microservice-split': [
    '一服务一库；跨服务靠消息或幂等调用：',
    '',
    '```text',
    '订单服务 → 订单库；库存服务 → 库存库',
    '落单 → 消息/幂等调用扣库存',
    '支付失败 → 明确补偿，不是分布式大事务默认项',
    '```',
  ].join('\n'),

  'arch-split-order-case': [
    '预留库存同步；履约异步：',
    '',
    '```text',
    '创建订单 → 同步预留库存 → 成功才待支付',
    '库存不够 → 当场错误，不进消息',
    '支付成功事件 → 异步履约；履约失败走补偿',
    '```',
  ].join('\n'),

  'arch-sync-vs-async': [
    '用户必须当场知道的用同步；可稍后的用事件：',
    '',
    '```text',
    '库存校验 = 同步（不够立刻失败）',
    '积分发放 = 异步（不挡支付成功页）',
    '库存也改异步 → 用户可能看到「成功」后尚未扣减',
    '```',
  ].join('\n'),

  'arch-modular-boundary': [
    '模块边界要有 API、表前缀和独立测试：',
    '',
    '```text',
    'InventoryService + inventory_* 表 + 集成测试',
    '订单只调 API，不直写库存表',
    '```',
  ].join('\n'),

  'arch-design-one-path': [
    '先写清读写量与权威数据，再选手段：',
    '',
    '```text',
    '写 ~200/s，读订单 ~2000/s，成功 <300ms',
    '权威：订单表已支付状态',
    '→ 读可用缓存；写仍打权威库 + 幂等',
    '```',
  ].join('\n'),

  rendering: [
    '读布局在绘制前可能仍是旧尺寸：',
    '',
    '```js',
    'el.style.height = "200px"',
    'el.offsetHeight // 可能仍是提交前的值',
    'requestAnimationFrame(() => {',
    '  el.offsetHeight // 下一帧才稳',
    '})',
    '```',
  ].join('\n'),

  'html-form-semantics': [
    'label 的 for 必须对上 input 的 id：',
    '',
    '```html',
    '<label for="email">邮箱</label>',
    '<input id="email" type="email" />',
    '<!-- 无 for/id：点「邮箱」二字焦点进不去 -->',
    '```',
  ].join('\n'),

  'image-loading': [
    '首屏图不要 lazy；列表缩略图才 lazy：',
    '',
    '```html',
    '<img src="hero.jpg" alt="" /> <!-- 首屏：不加 lazy -->',
    '<img src="thumb.jpg" loading="lazy" alt="" />',
    '```',
  ].join('\n'),

  'html5-main-landmark': [
    '一页一个 main；页头 nav、帖子用 article：',
    '',
    '```html',
    '<header>...</header>',
    '<nav>...</nav>',
    '<main><form>...</form></main>',
    '<article>...</article>',
    '```',
  ].join('\n'),

  'html5-constraint-before-submit': [
    '浏览器约束失败时，提交监听不会跑：',
    '',
    '```html',
    '<form>',
    '  <input type="email" required />',
    '  <button>提交</button>',
    '</form>',
    '```',
    '',
    '```js',
    'form.addEventListener("submit", () => console.log("submit"))',
    '// 填 "a" 点提交 → 浏览器提示，控制台无 submit',
    '```',
  ].join('\n'),

  'html5-media-play-promise': [
    '自动播放常被拦；muted 才更容易成功：',
    '',
    '```html',
    '<video autoplay muted playsinline src="intro.mp4"></video>',
    '```',
    '',
    '```js',
    'video.play().catch(() => { /* 需用户手势 */ })',
    '```',
  ].join('\n'),

  'html5-canvas-buffer': [
    '宽高属性决定缓冲像素，别只靠 CSS 拉大：',
    '',
    '```html',
    '<canvas width="600" height="300"></canvas>',
    '```',
    '',
    '```css',
    'canvas { width: 600px; height: 300px; }',
    '/* 只设 CSS、不设属性 → 默认 300×150 被拉伸发虚 */',
    '```',
  ].join('\n'),

  'html5-picture-source': [
    '按 type 协商格式，浏览器选第一个能解码的：',
    '',
    '```html',
    '<picture>',
    '  <source type="image/avif" srcset="a.avif" />',
    '  <source type="image/webp" srcset="a.webp" />',
    '  <img src="a.jpg" alt="" />',
    '</picture>',
    '```',
  ].join('\n'),

  'html5-drop-prevent-default': [
    'drop 要先在 dragover 里 preventDefault：',
    '',
    '```js',
    'li.addEventListener("dragstart", (e) => {',
    '  e.dataTransfer.setData("text/plain", id)',
    '})',
    'zone.addEventListener("dragover", (e) => e.preventDefault())',
    'zone.addEventListener("drop", (e) => {',
    '  const id = e.dataTransfer.getData("text/plain")',
    '})',
    '```',
  ].join('\n'),

  'session-storage-tab-only': [
    'sessionStorage 按标签页隔离：',
    '',
    '```js',
    '// 标签 A',
    'sessionStorage.setItem("wizard", "2")',
    '// 标签 B 打开同 URL → getItem("wizard") === null',
    '```',
  ].join('\n'),

  'indexeddb-when-needed': [
    '小配置用 localStorage；大量结构化离线用 IDB：',
    '',
    '```text',
    '主题色 / 侧栏折叠 → localStorage',
    '数千封邮件摘要按时间查 → IndexedDB',
    '接口 GET 缓存策略 → 另见 SW / HTTP 缓存课',
    '```',
  ].join('\n'),

  'sw-cache-strategy-pick': [
    '带哈希静态资源 cache-first；API 默认走网络：',
    '',
    '```js',
    '// /assets/app.a1b2.js → cache-first',
    '// /api/orders → network-only（失败再决定离线提示）',
    '```',
  ].join('\n'),

  performance: [
    'memo 挡不住每次新建的 props 对象：',
    '',
    '```jsx',
    'const Child = memo(function Child({ style }) { ... })',
    '// 坏：<Child style={{ color: "red" }} /> 每次新对象',
    'const style = useMemo(() => ({ color: "red" }), [])',
    '<Child style={style} />',
    '```',
  ].join('\n'),

  accessibility: [
    '可点控件用 button，不要 div + 点击：',
    '',
    '```html',
    '<button type="button">保存</button>',
    '<!-- Tab 可聚焦；Space / Enter 触发 -->',
    '<div onclick="...">保存</div> <!-- 缺键盘与角色 -->',
    '```',
  ].join('\n'),

  'build-code-splitting': [
    '路由级动态 import，首屏不带图表包：',
    '',
    '```js',
    '// 首页',
    'const Chart = lazy(() => import("./Chart"))',
    '// 进 /reports 才出现图表 chunk',
    '```',
  ].join('\n'),

  'build-cache': [
    '无改动命中缓存；改依赖会使缓存键失效：',
    '',
    '```text',
    '再构建无改动 → 耗时很短（缓存命中）',
    '只改一文案 → 增量有限',
    '升级依赖 → 缓存键变，相关图重编',
    '```',
  ].join('\n'),

  'react-ssr-not-fewer-http': [
    'SSR 仍要拉 JS 才能交互：',
    '',
    '```text',
    '首屏 HTML 已有标题',
    '浏览器仍下载 JS → hydrate 后才能点「加入购物车」',
    '≠ 更少的 HTTP 请求',
    '```',
  ].join('\n'),

  'webpack-eval-sourcemap-dev-only': [
    'eval 类 sourcemap 只给开发：',
    '',
    '```js',
    '// 开发',
    'devtool: "cheap-module-eval-source-map"',
    '// 生产',
    'devtool: "source-map" // 或 hidden-source-map，勿 eval',
    '```',
  ].join('\n'),

  'ssr-hydration': [
    '服务端与客户端首渲文本必须一致：',
    '',
    '```jsx',
    '// 坏：服务端 "12:00"，客户端 Date.now() → "12:01"',
    '// 好：服务端写入固定 ISO，客户端挂载后再 format',
    '```',
  ].join('\n'),

  'web-vitals': [
    '图无宽高推布局；长任务拖高交互延迟：',
    '',
    '```html',
    '<img width="1200" height="630" src="hero.jpg" alt="" />',
    '```',
    '',
    '```js',
    '// 点击里跑 300ms 同步计算 → INP / 旧 FID 变差',
    '```',
  ].join('\n'),

  'vite-module-graph': [
    '改一个组件只热更新相关模块图：',
    '',
    '```js',
    '// Vite 开发：保存 Button.tsx → 只编译依赖它的模块',
    'const Chart = () => import("./Chart.tsx") // 图表路由另图',
    '```',
  ].join('\n'),

  'fe-slow-page-where': [
    '先看瀑布：TTFB 长还是主线程长：',
    '',
    '```text',
    '文档等待首字节 ~2s、下载很短 → 慢在服务器',
    '点击后主线程 300ms 长任务 → 慢在前端脚本',
    '```',
  ].join('\n'),

  'fe-tune-one-layer': [
    '证据是哪一层，就只动那一层：',
    '',
    '```text',
    '英雄图 1.8MB，TTFB 40ms → 只压图/换尺寸',
    '复测下载↓；别同时改一堆无关配置',
    '```',
  ].join('\n'),

  'vite-env-client-prefix': [
    '只有 VITE_ 前缀会进客户端包：',
    '',
    '```bash',
    'VITE_API_BASE=https://api.example.com   # 可进包',
    'DATABASE_URL=secret                     # 勿加 VITE_',
    '```',
  ].join('\n'),

  'vue-list-key': [
    '用稳定 id 作 key，输入状态才跟对行：',
    '',
    '```vue',
    '<input v-for="item in list" :key="item.id" v-model="item.text" />',
    '<!-- key 用 index：A/B 对调后输入会串行 -->',
    '```',
  ].join('\n'),

  'vue-nexttick': [
    '改完 ref 立刻读 DOM 可能仍是旧值：',
    '',
    '```js',
    'count.value++',
    'el.textContent // 可能仍是 "1"',
    'await nextTick()',
    'el.textContent // "2"',
    '```',
  ].join('\n'),

  'vue-proxy-null-guard': [
    '响应式包装前先挡住 null/非对象：',
    '',
    '```js',
    'function reactive(value) {',
    '  if (value === null || typeof value !== "object") return value',
    '  return new Proxy(value, { ... })',
    '}',
    '```',
  ].join('\n'),

  'vue-composition-options': [
    '多状态交织时 Composition 把相关逻辑放一块：',
    '',
    '```js',
    '// Options：data / methods / watch 来回跳',
    '// Composition：useSearch() + useModal() 各自内聚',
    '```',
  ].join('\n'),

  'vue-tree-shake-options': [
    '关掉 Options API 可减小未用运行时：',
    '',
    '```js',
    '// 构建定义',
    '__VUE_OPTIONS_API__: false',
    '// 生产包里不应再留未引用的 Options 路径',
    '```',
  ].join('\n'),

  'vue-patch-hoist': [
    '静态 vnode 可提升到 render 外创建一次：',
    '',
    '```text',
    '静态 <p>说明</p> + 一处 {{ count }}',
    'hoistStatic 开 → 段落 vnode 在模块级创建',
    '更新只补丁插值',
    '```',
  ].join('\n'),

  'vue-modal-programmatic': [
    '对话框 Teleport 到 body，并管好焦点与 Escape：',
    '',
    '```vue',
    '<Teleport to="body">',
    '  <div role="dialog" aria-modal="true" @keydown.esc="close">',
    '    <h2 tabindex="-1">标题</h2>',
    '  </div>',
    '</Teleport>',
    '```',
  ].join('\n'),

  'vue-design-goals-proxy': [
    '嵌套对象按需变成响应式代理：',
    '',
    '```js',
    'const state = reactive({ nested: { n: 1 } })',
    'state.nested.n // 首次访问才代理 nested',
    '```',
  ].join('\n'),

  'vue-defineproperty-proxy': [
    'Proxy 能拦新增/删除；旧 defineProperty 不能：',
    '',
    '```js',
    'const obj = reactive({ a: 1 })',
    'obj.newKey = 1',
    'delete obj.newKey // Vue 3 Proxy 可追踪',
    '```',
  ].join('\n'),

  'vue-tree-shake-faster': [
    '只用到的 API 才会进生产包：',
    '',
    '```js',
    'import { nextTick } from "vue"',
    '// 未引用的 ref/reactive 不应出现在 sourcemap 导出列表',
    '```',
  ].join('\n'),

  'vue-props-one-way': [
    '子组件不要直接改 prop，要 emit：',
    '',
    '```js',
    '// 坏：props.title = "x" → 警告，父界面不变',
    'emit("update:title", "x")',
    '```',
  ].join('\n'),

  'fs-four-layers': [
    '页面、接口契约、用例、持久化，各守一件事：',
    '',
    '```text',
    '下单页提交 sku/qty',
    'POST /orders → 201+订单号 / 409 inventory-exhausted',
    '应用服务事务写订单+扣库存',
    '```',
  ].join('\n'),

  'fs-page-feature': [
    'URL 上的 id 拉服务器状态；输入是表单状态：',
    '',
    '```js',
    '// GET /orders/42 → 服务器状态',
    '// 备注输入 = 表单状态；保存才 PATCH',
    '```',
  ].join('\n'),

  'fs-write-ui': [
    '按状态码分流跳转与错误展示：',
    '',
    '```js',
    'if (res.status === 201) navigate(`/orders/${body.id}`)',
    'else if (body.type === "inventory-exhausted") toast("库存不足")',
    '```',
  ].join('\n'),

  'fs-frontend-done': [
    '成功用响应刷新 UI；4xx/5xx 保留输入：',
    '',
    '```text',
    'PATCH 昵称 200 → 标题换成响应里的昵称',
    '400 → 标字段；500 → 保留输入可重试',
    '```',
  ].join('\n'),

  'fs-boot-chain': [
    '控制器校验 → 应用服务事务 → 返回订单号：',
    '',
    '```java',
    '@PostMapping("/orders")',
    'OrderId place(@Valid CreateOrder req) {',
    '  return orderApp.place(req); // @Transactional 内写单+扣库存',
    '}',
    '```',
  ].join('\n'),

  'fs-write-invariant': [
    '最后一件用条件更新，影响行数分胜负：',
    '',
    '```sql',
    'UPDATE stock SET qty = qty - 1 WHERE sku=? AND qty >= 1;',
    '-- affected=1 成功；=0 失败返回',
    '```',
  ].join('\n'),

  'fs-read-shape': [
    '详情 DTO 只含需要的字段，一次查清：',
    '',
    '```text',
    '返回：id、status、amount、productName',
    'productName 来自联接/明确查询，不是序列化时懒加载 N+1',
    '无权 → 404/403，不泄露存在性细节按约定',
    '```',
  ].join('\n'),

  'fs-ship-bar': [
    '契约改名要让前后端测试一起红：',
    '',
    '```text',
    '故意把失败 type 改名',
    '→ 前端契约测 + 后端测同时失败',
    '页面不会把冲突当成功',
    '```',
  ].join('\n'),

  'document-policy-not-permissions-policy': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```http',
    'Permissions-Policy: camera=()',
    'Document-Policy: ...   # 文档行为约束，不是能力换皮',
    '```',
    '',
    '两套头可并存；清单要分列。'
  ].join('\n'),

  'pna-private-network-access': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```js',
    '// 公网站点 → 内网 IP 可能触发 PNA 预检',
    "await fetch('http://192.168.1.1/api')",
    '// 仅配 CORS Allow-Origin 往往仍不够',
    '```'
  ].join('\n'),

  'mysql-check-enforced-not-parsed-only': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```sql',
    'ALTER TABLE t ADD CONSTRAINT chk_qty CHECK (qty >= 0);',
    'INSERT INTO t(qty) VALUES (-1);  -- 8.0.16+ 应失败',
    '```'
  ].join('\n'),

  'redis-wait-replicas-not-durability': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```redis',
    'INCR order:seq',
    'WAIT 1 1000',
    '# 副本确认 ≠ AOF/RDB 已落盘',
    '```'
  ].join('\n'),

  'thread-pool-formula-not-law': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```java',
    '// 坏：corePoolSize = Runtime.getRuntime().availableProcessors() * 2;',
    '// 好：按 CPU/IO 拆池 + 有界队列 + 拒绝策略，再用压测调',
    'new ThreadPoolExecutor(n, n, 60, SECONDS, new ArrayBlockingQueue<>(256), handler);',
    '```'
  ].join('\n'),

  'rw-split-not-strong-consistency': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    'UPDATE profile ...  → 主库',
    'SELECT profile ...     → 从库（可能落后）',
    '读己之写：读主 / 等位点 / 缓存刚写键',
    '```'
  ].join('\n'),

  esm: [
    '静态 import 是绑定；顶层循环依赖会踩时序：',
    '',
    '```js',
    '// a.js',
    'import { b } from "./b.js"',
    'export const a = 1',
    '// 两边顶层互调对方导出 → 可能读到未初始化绑定',
    '```',
  ].join('\n'),

  'js-not-everything-object': [
    '原始值临时装箱，赋属性留不住：',
    '',
    '```js',
    'const n = 1',
    'n.flag = true',
    'n.flag // undefined',
    'Object(n).flag = true // 另一个对象',
    '```',
  ].join('\n'),

  'js-arrow-has-no-prototype': [
    '箭头函数没有 prototype，不能 new：',
    '',
    '```js',
    'function Person() {}',
    'Person.prototype // 对象',
    'const f = () => {}',
    'f.prototype // undefined',
    '// new f() → TypeError',
    '```',
  ].join('\n'),

  'es6-map-set-keys': [
    'Map 用引用当键；对象键会被转成字符串：',
    '',
    '```js',
    'const bag = {}',
    'const a = {}, b = {}',
    'bag[a] = 1',
    'bag[b] // 1（都变成 "[object Object]"）',
    'const m = new Map([[a, 1]])',
    'm.get(b) // undefined',
    '```',
  ].join('\n'),

  'es6-symbol-key': [
    '同描述的 Symbol 仍不相等：',
    '',
    '```js',
    'const a = Symbol("id")',
    'const b = Symbol("id")',
    'a === b // false',
    'obj[a] = 1; obj[b] // undefined',
    '```',
  ].join('\n'),

  'promise-all-and-settled': [
    'all 一失败就整组失败；settled 等全部落定：',
    '',
    '```js',
    'Promise.all([loadUser(), loadOrders(), loadAds()])',
    '// 广告失败 → 整组 reject，用户/订单也拿不到',
    'Promise.allSettled([...]) // 三条各自 fulfilled/rejected',
    '```',
  ].join('\n'),

  'js-private-field-hash': [
    '真私有字段外层读不到：',
    '',
    '```js',
    'class Box {',
    '  #n = 0',
    '  inc() { this.#n++ }',
    '  get() { return this.#n }',
    '}',
    '// new Box().#n → SyntaxError',
    '```',
  ].join('\n'),

  'js-async-generator-for-await': [
    '异步生成器用 for await 消费：',
    '',
    '```js',
    'async function* pages() {',
    '  yield await fetchPage(1)',
    '  yield await fetchPage(2)',
    '}',
    'for await (const p of pages()) { ... }',
    '```',
  ].join('\n'),

  'js-regex-dot-not-newline': [
    '默认点不匹配换行；加 s 才跨行：',
    '',
    '```js',
    '/a.b/.test("a\\nb") // false',
    '/a.b/s.test("a\\nb") // true',
    '```',
  ].join('\n'),

  'js-json-stringify-not-equal': [
    'stringify 丢掉 undefined，不能当深相等：',
    '',
    '```js',
    'JSON.stringify({ a: 1, b: undefined })',
    'JSON.stringify({ a: 1 })',
    '// 都是 \'{"a":1}\'，对象语义并不相同',
    '```',
  ].join('\n'),

  'js-async-await': [
    '有依赖就串行；无依赖就一起发：',
    '',
    '```js',
    'const user = await loadUser()',
    'const orders = await loadOrders(user.id) // 串行',
    'const [a, b] = await Promise.all([loadA(), loadB()]) // 并行',
    '```',
  ].join('\n'),

  'js-iteration-protocol': [
    'for-of / 展开都会要新的迭代器：',
    '',
    '```js',
    'const range = {',
    '  *[Symbol.iterator]() { yield 1; yield 2 }',
    '}',
    'for (const x of range) { ... } // 新迭代器',
    '[...range] // 再要一个新迭代器',
    '```',
  ].join('\n'),

  'js-weakmap-lifetime': [
    '键被回收后条目消失，不阻止 GC：',
    '',
    '```js',
    'let el = document.getElementById("x")',
    'const wm = new WeakMap()',
    'wm.set(el, meta)',
    'el = null // 无其它引用时，条目可被收回',
    '```',
  ].join('\n'),

  'ajax-page-update-not-a-library': [
    'XHR 改 DOM 不等于上了框架：',
    '',
    '```js',
    'const xhr = new XMLHttpRequest()',
    'xhr.open("GET", "/api/order/1")',
    'xhr.onload = () => { span.textContent = xhr.responseText }',
    'xhr.send()',
    '// 地址仍是 /orders，只是局部刷新',
    '```',
  ].join('\n'),

  'axios-shared-instance': [
    '共享实例统一 baseURL、超时与拦截器：',
    '',
    '```js',
    'const api = axios.create({ baseURL: "/api", timeout: 8000 })',
    'api.interceptors.response.use(r => r, err => Promise.reject(err))',
    'api.get("/orders")',
    '```',
  ].join('\n'),

  'cookie-set-attributes': [
    '登录 Cookie 要 HttpOnly + Secure + SameSite：',
    '',
    '```http',
    'Set-Cookie: sid=...; HttpOnly; Secure; SameSite=Lax; Path=/',
    '```',
  ].join('\n'),

  'long-poll-vs-websocket': [
    '低频状态用长轮询；高频增量用 WS：',
    '',
    '```text',
    '坐席状态：长轮询 25s 超时返回',
    '行情推送：WebSocket 推增量',
    '角标每分钟变：短轮询或 SSE',
    '```',
  ].join('\n'),

  'cookie-prefix-partitioned': [
    '__Host- 前缀强制安全属性：',
    '',
    '```http',
    'Set-Cookie: __Host-session=...; Secure; Path=/; HttpOnly',
    '# 不能带 Domain=；必须 Secure + Path=/',
    '```',
  ].join('\n'),

  'https-tls13-not-12-packets': [
    '先 TLS 握手，再有 HTTP；1.3 更少往返：',
    '',
    '```text',
    'TCP 连接 → TLS 1.3 握手 → 才发 HTTP',
    '不是「HTTPS 比 HTTP 多 12 个神秘包」那种背法',
    '```',
  ].join('\n'),

  'https-port-443-not-80': [
    'https:// 默认连 443，不是 80：',
    '',
    '```bash',
    'curl -v https://example.com',
    '# Connected to example.com port 443',
    '# 随后 ClientHello…',
    '```',
  ].join('\n'),

  'api-error-contract': [
    '业务冲突用稳定 type，不只靠文案：',
    '',
    '```http',
    'HTTP/1.1 409 Conflict',
    'Content-Type: application/problem+json',
    '{"type":"inventory-exhausted","title":"库存不足"}',
    '```',
  ].join('\n'),

  'http2-multiplex': [
    '同连接多流并行，不再按 HTTP/1 队头堵：',
    '',
    '```text',
    '页面 + CSS + API → 一条 HTTP/2 连接多路复用',
    '单流严重阻塞仍可能影响连接，但不是每请求一条队',
    '```',
  ].join('\n'),

  'react-router-element-api': [
    '现行用 element，不再 component={About}：',
    '',
    '```jsx',
    '// 旧',
    '<Route path="/about" component={About} />',
    '// 新',
    '<Route path="/about" element={<About />} />',
    '```',
  ].join('\n'),

  'redux-rtk-today': [
    '新项目用 configureStore，少手写 createStore：',
    '',
    '```js',
    'export const store = configureStore({',
    '  reducer: { todos: todosReducer },',
    '})',
    '```',
  ].join('\n'),

  'state-kind-picks-home': [
    'UI 本地态、服务器态、主题分家：',
    '',
    '```text',
    '主题 → Context',
    '弹层开关 → 页面 useState',
    '订单列表 → queryKey ["orders", status]',
    '```',
  ].join('\n'),

  'state-reducer-context-screen': [
    '跨屏共享用 Provider + useReducer：',
    '',
    '```jsx',
    'function TasksProvider({ children }) {',
    '  const [state, dispatch] = useReducer(tasksReducer, initial)',
    '  return <TasksCtx.Provider value={{ state, dispatch }}>{children}</TasksCtx.Provider>',
    '}',
    '```',
  ].join('\n'),

  'react-router-loader': [
    'loader 取数；失败抛带 status 的 Response：',
    '',
    '```js',
    'export async function loader({ params }) {',
    '  const res = await fetch(`/api/orders/${params.id}`)',
    '  if (!res.ok) throw new Response("Not Found", { status: 404 })',
    '  return res.json()',
    '}',
    '```',
  ].join('\n'),

  'react-rsc-vs-client': [
    '服务端组件取数进首屏；带事件的才进客户端包：',
    '',
    '```text',
    '标题/库存数字 → Server Component 取数进 HTML',
    '「加入购物车」按钮 → Client Component（有 onClick）',
    '```',
  ].join('\n'),

  'react-router-error-element': [
    '路由级 errorElement 只替换出错区域：',
    '',
    '```jsx',
    '{',
    '  path: "orders/:id",',
    '  element: <OrderDetail />,',
    '  errorElement: <OrderError />, // 侧栏布局还在',
    '}',
    '```',
  ].join('\n'),

  'vue-router-reuse': [
    '同组件换参要 watch；setup 里读一次不够：',
    '',
    '```js',
    'const id = route.params.id // 只得进入时的值',
    'watch(() => route.params.id, load)',
    '```',
  ].join('\n'),

  'pinia-not-vuex': [
    '共享客户端状态用 Pinia；列表请求可留页面：',
    '',
    '```js',
    'const counter = useCounterStore()',
    'counter.inc() // 另一组件立刻见新值',
    '// 订单页自己的列表 → 页面状态，离开可丢',
    '```',
  ].join('\n'),

  'nuxt-payload': [
    'useAsyncData 在导航间复用 payload：',
    '',
    '```js',
    'const { data } = await useAsyncData(',
    '  "posts-" + id,',
    '  () => $fetch("/api/posts/" + id),',
    ')',
    '```',
  ].join('\n'),

  'vue-router-guard': [
    '未登录在 beforeEach 重定向并带 redirect：',
    '',
    '```js',
    'router.beforeEach((to) => {',
    '  if (!token && to.name !== "login") {',
    '    return { name: "login", query: { redirect: to.fullPath } }',
    '  }',
    '})',
    '```',
  ].join('\n'),

  'vue-keep-alive': [
    '缓存实例再进入不重跑 created：',
    '',
    '```vue',
    '<keep-alive>',
    '  <router-view />',
    '</keep-alive>',
    '<!-- 列表→详情→回列表：created 不再执行，用 activated -->',
    '```',
  ].join('\n'),

  'pinia-store-to-refs': [
    '解构要用 storeToRefs 才保持响应式：',
    '',
    '```js',
    'const store = useCartStore()',
    'const { items } = storeToRefs(store)',
    '// const { items } = store → items 丢失响应式',
    '```',
  ].join('\n'),

  'vue-router-scroll': [
    '进新模块回顶；浏览器后退用 savedPosition：',
    '',
    '```js',
    'scrollBehavior(to, from, saved) {',
    '  if (saved) return saved',
    '  return { top: 0 }',
    '}',
    '```',
  ].join('\n'),

  'frontend-testing': [
    '断言用户可见结果，不断言内部字段名：',
    '',
    '```js',
    'await userEvent.type(screen.getByLabelText("邮箱"), "not-an-email")',
    'expect(screen.getByText("邮箱格式不正确")).toBeInTheDocument()',
    '// 不断言 component.state.emailError',
    '```',
  ].join('\n'),

  'react-enzyme-not-default': [
    '现行默认 Testing Library，不写 Enzyme：',
    '',
    '```js',
    'render(<SaveButton />)',
    'await userEvent.click(screen.getByRole("button", { name: "保存" }))',
    '```',
  ].join('\n'),

  'testing-library-role': [
    '按角色和可访问名点，改 class 测不过才对：',
    '',
    '```js',
    'screen.getByRole("button", { name: "保存" })',
    '// 不写 container.querySelector(".btn-primary")',
    '```',
  ].join('\n'),

  'contract-test-path': [
    '前后端共认同一 409 type：',
    '',
    '```js',
    '// 契约：POST /orders 409 → type inventory-exhausted',
    'expect(body.type).toBe("inventory-exhausted")',
    '```',
  ].join('\n'),

  'test-fake-timers': [
    '防抖测试推进假时钟，不必真等：',
    '',
    '```js',
    'vi.useFakeTimers()',
    'await userEvent.type(input, "咖啡")',
    'await vi.advanceTimersByTimeAsync(300)',
    'expect(fetchMock).toHaveBeenCalled()',
    '```',
  ].join('\n'),

  'react-flow-not-default': [
    '组件 props 用类型标注，不必上 Flow：',
    '',
    '```tsx',
    'function Hello({ name }: { name: string }) {',
    '  return <p>{name}</p>',
    '}',
    '```',
  ].join('\n'),

  'ts-type-vs-interface': [
    '联合用 type；可合并的对象形状用 interface：',
    '',
    '```ts',
    'type Result = { ok: true; data: T } | { ok: false; error: string }',
    'interface Options { timeout?: number }',
    '// 另一文件可再 interface Options { retries?: number }',
    '```',
  ].join('\n'),

  'ts-utility-types': [
    '更新体先 Omit 再 Partial：',
    '',
    '```ts',
    'type UserUpdate = Partial<Omit<User, "id" | "createdAt">>',
    '// 可只带 nickname，不能带 id',
    '```',
  ].join('\n'),

  'ts-module-resolution': [
    '打包器用 bundler 解析，贴近 Vite/webpack：',
    '',
    '```json',
    '{ "compilerOptions": { "moduleResolution": "bundler" } }',
    '```',
  ].join('\n'),

  'referrer-policy-leak-bound': [
    '跨站少带路径，降低 Referer 泄露：',
    '',
    '```http',
    'Referrer-Policy: strict-origin-when-cross-origin',
    '# 同站保留完整 URL；跨站只送 origin',
    '```',
  ].join('\n'),

  'clear-site-data-not-full-logout': [
    '清站点数据配合删会话，不是替代登出：',
    '',
    '```http',
    'Clear-Site-Data: "cookies", "storage"',
    '# 服务端仍要删除 session 行',
    '```',
  ].join('\n'),

  'client-env-public': [
    '带 VITE_ 的密钥会出现在产物里：',
    '',
    '```bash',
    'VITE_DB_PASSWORD=secret npm run build',
    '# dist 里能搜到 secret → 不要这样',
    '```',
  ].join('\n'),

  'fe-react-framework-first': [
    '新全栈页优先官方框架脚手架：',
    '',
    '```bash',
    'npx create-next-app@latest',
    '# 或 create-react-router 框架模式',
    '# 不要先空 Vite + 自拼 SSR/路由',
    '```',
  ].join('\n'),

  'fe-vue-official-slots': [
    '后台用官方 create-vue；内容站用 Nuxt：',
    '',
    '```bash',
    'npm create vue@latest   # 勾 Router + Pinia',
    'npx nuxi@latest init    # 文章站看源码正文',
    '```',
  ].join('\n'),

  'fe-sveltekit-runes': [
    '路由文件 + load；计数用 rune：',
    '',
    '```svelte',
    '<!-- src/routes/+page.svelte -->',
    '<script>',
    '  let count = $state(0)',
    '</script>',
    '```',
  ].join('\n'),

  'fe-react-one-slot': [
    '框架管路由与服务器数据；浏览器复用 GET 用 Query：',
    '',
    '```tsx',
    '// Next / RR 框架：loader 或 server 取首屏',
    'useQuery({ queryKey: ["orders", status], queryFn })',
    '```',
  ].join('\n'),

  'fe-server-state-one-owner': [
    '列表只放一处服务器状态，不要再抄进 Redux：',
    '',
    '```ts',
    'useQuery({ queryKey: ["orders", status], queryFn: fetchOrders })',
    '// 不要再 setOrders 进全局 store 当第二真相源',
    '```',
  ].join('\n'),

  'fe-vue-data-one-slot': [
    'Nuxt/页面数据用 useAsyncData 一个钥匙：',
    '',
    '```ts',
    'const { data } = await useAsyncData(',
    '  "orders-" + status,',
    '  () => $fetch("/api/orders", { query: { status } }),',
    ')',
    '```',
  ].join('\n'),

  'fe-svelte-load-not-store': [
    '列表过滤条件走 load，不塞全局 store：',
    '',
    '```js',
    '// src/routes/orders/+page.server.js',
    'export function load({ url }) {',
    '  return { status: url.searchParams.get("status") }',
    '}',
    '```',
  ].join('\n'),

  'fe-expo-router-one-nav': [
    'Expo Router 文件即路由：',
    '',
    '```bash',
    'npx create-expo-app',
    '# app/orders/[id].tsx → 路径 /orders/:id',
    '# 跳转用 router.push，不要再挂第二套导航库',
    '```',
  ].join('\n'),

  'fe-flutter-state-one-approach': [
    '路由用 GoRouter；状态选一种主方案：',
    '',
    '```dart',
    'MaterialApp.router(routerConfig: GoRouter(routes: [',
    '  GoRoute(path: "/order/:id", builder: ...),',
    ']))',
    '// 不要同时上两套全局状态框架抢同一真相',
    '```',
  ].join('\n'),

  'mfe-pick-by-constraint': [
    '仓库已经是 qiankun，菜单跟路径走：',
    '',
    '```text',
    '已有加载方式：qiankun。不因为 Federation 更新就换。',
    '做不到的事：第三方报表必须是独立 document。这一块用 iframe。',
    '不引入 Module Federation。共享同一份 React 单例这件事，现有 HTML 入口做得到，就不加。',
    '```',
  ].join('\n'),

  'mfe-compare-matrix': [
    '已有 qiankun 时，表用来核对它做不到什么，不用来换名字：',
    '',
    '```text',
    'qiankun 做得到：路径激活一整页 HTML。菜单继续用它。',
    '它做不到：第三方页的独立 document。这一块才写 iframe。',
    'Federation 的主缝是 shared 单例。这次不需要，就不装。',
    '```',
  ].join('\n'),

  'mfe-pick-one-path': [
    '主路径留下已有的加载方式，例外写范围：',
    '',
    '```text',
    '中台主路径：继续 qiankun',
    '报表子域：iframe，仅这一块',
    '不新开 Module Federation',
    '```',
  ].join('\n'),

  'mfe-mf-host-setup': [
    'host remotes 指向订单 remoteEntry：',
    '',
    '```js',
    'remotes: {',
    '  orders: "orders@https://cdn.example/orders/remoteEntry.js",',
    '}',
    '// orders exposes: { "./OrderList": "./src/OrderList.jsx" }',
    '```',
  ].join('\n'),

  'mfe-vite-federation': [
    'Vite Federation 同样 exposes / remotes：',
    '',
    '```js',
    'federation({',
    '  name: "orders",',
    '  filename: "remoteEntry.js",',
    '  exposes: { "./OrderList": "./src/OrderList.vue" },',
    '})',
    '```',
  ].join('\n'),

  'mfe-singlespa-register': [
    '按路径 activity 注册子应用：',
    '',
    '```js',
    'registerApplication({',
    '  name: "orders",',
    '  app: () => System.import("orders"),',
    '  activeWhen: ["/orders"],',
    '})',
    'start()',
    '```',
  ].join('\n'),

  'mfe-qiankun-html-entry': [
    'html entry 挂到容器节点：',
    '',
    '```js',
    'registerMicroApps([{',
    '  name: "orders",',
    '  entry: "//localhost:7101",',
    '  container: "#subapp",',
    '  activeRule: "/orders",',
    '}])',
    '```',
  ].join('\n'),

  'mfe-wujie-startapp': [
    '无界按 name + url 启动子应用：',
    '',
    '```js',
    'startApp({',
    '  name: "marketing",',
    '  url: "https://m.example/campaign/",',
    '  el: document.querySelector("#slot"),',
    '})',
    '```',
  ].join('\n'),

  'mfe-iframe-postmessage': [
    '跨源用 postMessage，校验 origin：',
    '',
    '```js',
    'iframe.src = "https://report.example/app"',
    'iframe.contentWindow.postMessage({ type: "token", v }, "https://report.example")',
    'window.addEventListener("message", (e) => {',
    '  if (e.origin !== "https://report.example") return',
    '})',
    '```',
  ].join('\n'),

  'flutter-widget-not-html': [
    'Flutter 是 Widget 树，不是 div/p：',
    '',
    '```dart',
    'Column(children: [',
    '  Text("标题", style: Theme.of(context).textTheme.titleLarge),',
    '  Text("正文"),',
    '])',
    '// 不是 <div><p>',
    '```',
  ].join('\n'),

  'flutter-impeller-own-pixels': [
    '同一主题按钮由引擎自绘，不靠系统 HTML：',
    '',
    '```text',
    'iOS / Android 同一 ElevatedButton',
    '像素由 Impeller（或旧 Skia）按主题画出',
    '```',
  ].join('\n'),

  'flutter-constraints-down': [
    'ListView 在 Column 里要拿有界高度：',
    '',
    '```dart',
    'Column(children: [',
    '  Text("标题"),',
    '  Expanded(child: ListView(...)), // 无 Expanded 会纵向无限约束报错',
    '])',
    '```',
  ].join('\n'),

  'flutter-setstate-rebuilds': [
    '改字段后要 setState，否则 Text 不刷新：',
    '',
    '```dart',
    'onPressed: () {',
    '  // count += 1; // 只改字段，界面仍显示旧值',
    '  setState(() { count += 1; });',
    '}',
    '```',
  ].join('\n'),

  'flutter-gorouter-not-named': [
    '深链用 GoRouter 路径，避免命名路由叠栈：',
    '',
    '```dart',
    'context.go("/order/42")',
    '// 反复 pushNamed 同链 → 首页/订单/订单… 栈膨胀',
    '```',
  ].join('\n'),

  complexity: [
    '小 n 常数项主导；大 n 才看出阶：',
    '',
    '```text',
    'n=100：插入排序可能快于归并',
    'n=1e6：O(n²) 明显慢于 O(n log n)',
    '```',
  ].join('\n'),

  'elastic-analysis': [
    '索引与查询必须同一套分析器：',
    '',
    '```http',
    'PUT /products',
    '{ "mappings": { "properties": {',
    '  "name": { "type": "text", "analyzer": "ik_max_word",',
    '            "search_analyzer": "ik_smart" }',
    '} } }',
    '# 索引一种、查询另一种 → 「无线鼠标」可能搜不到',
    '```',
  ].join('\n'),

  'mongo-multi-doc-txn': [
    '跨文档同成同败用会话事务：',
    '',
    '```js',
    'const s = client.startSession()',
    'await s.withTransaction(async () => {',
    '  await stock.updateOne({ sku }, { $inc: { qty: -1 } }, { session: s })',
    '  await orders.insertOne(order, { session: s })',
    '})',
    '```',
  ].join('\n'),

  'mongo-bson-use-lazy': [
    'use 只切换上下文，有数据写入才出现在 show dbs：',
    '',
    '```javascript',
    'use demo',
    'show dbs          // 可能还没有 demo',
    'db.x.insertOne({})',
    'show dbs          // 现有 demo',
    '```',
  ].join('\n'),

  'table-design-from-facts': [
    '只持久化已发生的事实，未提交的输入不入库：',
    '',
    '```text',
    '提交后：订单 + 明细 + 幂等键',
    '未提交的备注 / 按钮是否灰 → 不入库',
    '```',
  ].join('\n'),

  'table-row-one-grain': [
    '一张订单两件商品：订单 1 行、明细 2 行：',
    '',
    '```text',
    'orders: 1 行 order_id=9',
    'order_items: 2 行，都带 order_id=9',
    '// 错：一行里 sku1,qty1,sku2,qty2',
    '```',
  ].join('\n'),

  'ddd-same-word-two-contexts': [
    '同名「订单」在不同上下文模型不同：',
    '',
    '```text',
    '销售：成交价、支付状态（无库位）',
    '仓储：拣货状态、库位（用销售单号当外部 id）',
    '不要合成一张上帝表',
    '```',
  ].join('\n'),

  'ddd-aggregate-transaction-boundary': [
    '聚合内同事务；聚合外别硬绑：',
    '',
    '```text',
    '改明细数量 1→2 → 同事务更新订单合计',
    '商品标价、库存预留 → 另一聚合/服务，不进同一事务默认',
    '```',
  ].join('\n'),

  'ddd-entity-or-value': [
    '金额是值对象：改了等于换新值：',
    '',
    '```text',
    'Money(10, CNY) → Money(12, CNY) 是新值',
    '明细行是实体：同一行 id 不变，只改属性',
    '```',
  ].join('\n'),

  'ddd-repository-one-entry': [
    '改数量走应用服务 + 仓储一次保存：',
    '',
    '```text',
    'OrderApp.changeQty(id, 2)',
    '→ 仓储一次保存订单+明细，合计更新',
    '// 禁止另一路径直接 UPDATE 明细绕过合计',
    '```',
  ].join('\n'),

  'arch-slo-budget': [
    '先定义成功与错误预算再谈优化：',
    '',
    '```text',
    '成功 = 返回成功且库存已扣',
    '30 天 1e6 次、99.9% → 错误预算 1000 次',
    '用预算决定要不要上更贵的同步方案',
    '```',
  ].join('\n'),

  'arch-queue-wait': [
    '处理很快也会被排队拖死：',
    '',
    '```text',
    '单次处理 20ms，线程池 200 打满',
    '第 201 个在队列等 → 用户看到的是排队+处理',
    '```',
  ].join('\n'),

  'design-review': [
    '容量变了方案要重评，不是永远唯一约束：',
    '',
    '```text',
    '日 1000 单：单库 UNIQUE 可不超卖',
    '峰值 10000/s：连接与锁先打满 → 再谈削峰/分片',
    '```',
  ].join('\n'),

  'zabbix-active-at-scale': [
    '大规模用主动上报，减轻 Server 轮询：',
    '',
    '```text',
    '1000 台被动检查 → Server 连各 agent，CPU/延迟↑',
    '改主动模式：agent 推指标到 Server',
    '```',
  ].join('\n'),

  'cpu-cache-line-sharing': [
    '相邻 volatile 会伪共享，要填充或拆开：',
    '',
    '```java',
    'class Counters {',
    '  volatile long a;',
    '  // long pad0, pad1, ... 或 @Contended',
    '  volatile long b;',
    '}',
    '// 两线程分别写 a/b 仍可能抢同一缓存行',
    '```',
  ].join('\n'),

  'request-trace-one-hop': [
    '同一追踪 id 串起网关、服务、SQL：',
    '',
    '```text',
    '浏览器带幂等键下单 ~3s',
    '网关 / 服务 / SQL 日志同一 trace id',
    '跨度：网关几 ms，慢在服务内某段',
    '```',
  ].join('\n'),

  'server-slow-which-resource': [
    'vmstat 分清 CPU 忙还是 IO 等：',
    '',
    '```bash',
    'vmstat 1',
    '# 运行队列短、wa 高、id 高 → 慢在磁盘',
    '# us 打满、wa 低 → 慢在算/锁',
    '```',
  ].join('\n'),

  'backend-tune-the-span': [
    '总耗时里占比最大的跨度优先动：',
    '',
    '```text',
    '下单 3s：SQL 2.8s，借连接 20ms，GC 可忽略',
    '→ 先优化那条 SQL，不是先把堆调到 8G',
    '```',
  ].join('\n'),

  'junit-instance-lifecycle': [
    '默认每方法新实例；静态字段会串测：',
    '',
    '```java',
    'static List<String> bag = new ArrayList<>();',
    '@Test void a() { bag.add("x"); assertEquals(1, bag.size()); }',
    '@Test void b() { assertTrue(bag.isEmpty()); } // 全量跑失败',
    '```',
  ].join('\n'),

  'test-observable-result': [
    '断言可观察结果，不要反射私有字段：',
    '',
    '```java',
    'repo.save(user);',
    'assertEquals("a@b.com", repo.findById(id).email());',
    '// 勿 Field f = repo.getClass().getDeclaredField("list")',
    '```',
  ].join('\n'),

  'object-level-authz': [
    '登录不够，还要校验资源归属：',
    '',
    '```java',
    'Order o = orders.get(id);',
    'if (!o.ownerId().equals(currentUserId())) throw new Forbidden();',
    '// 只 @Authenticated → A 可读 B 的订单号',
    '```',
  ].join('\n'),

  'runtime-config': [
    '口令只从环境注入，不进包与 Git：',
    '',
    '```bash',
    'grep -R "password" dist/ .git/  # 不应命中生产口令',
    'export SPRING_DATASOURCE_PASSWORD=...',
    '```',
  ].join('\n'),

  'sshd-rate-limit-not-lastb': [
    '限流看失败计数接口，不要 parse lastb 日期：',
    '',
    '```text',
    'locale 一变 lastb 日期格式变 → grep 失效',
    '用 fail2ban / sshd 自带限速或 journal 结构化字段',
    '```',
  ].join('\n'),

  'dom-event-flow': [
    '委托挂在祖先；捕获在目标之前：',
    '',
    '```js',
    'document.addEventListener("click", handler) // 冒泡委托',
    'document.addEventListener("click", handler, true) // 捕获先于按钮',
    '```',
  ].join('\n'),

  'browser-event-loop-frame': [
    '滚动里同步读布局再改样式会卡帧：',
    '',
    '```js',
    'onscroll = () => {',
    '  const h = el.offsetHeight // 读',
    '  el.style.width = h + "px" // 写 → 强制布局拉长帧',
    '}',
    '// 先批量读，rAF 里再写',
    '```',
  ].join('\n'),

  'service-worker-stale': [
    '带哈希静态可 cache-first；API 别进这层：',
    '',
    '```js',
    '// app.a1b2.js → cache-first',
    '// /api/orders → network，不要 SW 缓存当真相',
    '// 新 Worker：skipWaiting + clients.claim 按策略',
    '```',
  ].join('\n'),

  'miniprogram-wx-if-not-wxif': [
    '条件渲染是 wx:if，不是 wx-if：',
    '',
    '```html',
    '<view wx:if="{{ok}}">可见</view>',
    '<!-- wx-if 不会按条件渲染 -->',
    '```',
  ].join('\n'),

  'react-error-boundary': [
    '渲染抛错由边界接住，其余页面仍在：',
    '',
    '```jsx',
    '<ErrorBoundary fallback={<p>这段暂时不可用</p>}>',
    '  <BuggyChild />',
    '</ErrorBoundary>',
    '```',
  ].join('\n'),

  'ci-gate-not-only-build': [
    '合并门禁含类型与测试，不只打包：',
    '',
    '```yaml',
    'jobs:',
    '  gate:',
    '    steps:',
    '      - run: npm run typecheck',
    '      - run: npm test',
    '      - run: npx playwright test login',
    '# 打包成功但 typecheck 失败 → 仍应红',
    '```',
  ].join('\n'),

  'vite-sourcemap-prod': [
    '生产打开 sourcemap 会产出 .map 与尾注：',
    '',
    '```js',
    '// vite.config',
    'build: { sourcemap: true }',
    '// dist 有 .js.map；js 尾可能有 sourceMappingURL',
    '```',
  ].join('\n'),

  'epoll-et-must-drain': [
    'ET 模式一次事件要读到 EAGAIN：',
    '',
    '```c',
    '// EPOLLIN | EPOLLET，非阻塞 fd',
    'while ((n = read(fd, buf, sizeof buf)) > 0) { ... }',
    '// n == -1 && errno == EAGAIN → 暂时读完',
    '// 只 read 一次留下字节 → 可能再无事件',
    '```',
  ].join('\n'),

  'jdk-feature-release-six-months': [
    '功能版六个月一发；生产锁 LTS：',
    '',
    '```text',
    '功能线：22 → 23 → 24 → 25 …',
    '生产常见锁 21 或 25 LTS',
    '不是等「下一个三年大版本」才升级特性',
    '```',
  ].join('\n'),

  'cdn-not-just-reverse-proxy-cache': [
    '静态走 CDN；写请求回源站反代：',
    '',
    '```text',
    '商品 HTML/CSS → CDN 边缘',
    'POST /orders → 源站域名 → Nginx 反代应用',
    '不要把下单 POST 丢给「静态缓存」语义',
    '```',
  ].join('\n'),

  'uuid-not-only-random-string': [
    '主键优先有序方案；UUID 也有版本差异：',
    '',
    '```text',
    '业务主键：雪花 / 号段',
    '若用 UUID：评估 v7 + BINARY(16)，不是只能随机字符串 PK',
    '```',
  ].join('\n'),

  'jenkins-not-only-ci-tool': [
    '同一测试可挂不同 CI 产品：',
    '',
    '```bash',
    './gradlew test',
    '# GitHub Actions: .github/workflows/ci.yml',
    '# 或 Jenkinsfile / .gitlab-ci.yml — 实践目标相同',
    '```',
  ].join('\n'),

  'db-insert-unique-cron-not-lease': [
    '唯一插入 + cron 清表不是租约：',
    '',
    '```sql',
    '-- 坏：无 TTL，靠每分钟',
    'DELETE FROM locks WHERE updated_at < NOW() - INTERVAL 30 SECOND;',
    '-- 好：锁行带过期 + 随机 token，释放比对 token',
    '```',
  ].join('\n'),

  'leaky-bucket-not-no-critical-edge': [
    '漏桶稳出水；突发靠桶深排队：',
    '',
    '```text',
    '下游稳 200 QPS → 漏桶出水 200/s',
    '桶深限制排队长度；超深拒绝或降级',
    '不是「没有临界边缘」的无限蓄水',
    '```',
  ].join('\n'),

  'zk-odd-count-not-quorum-law': [
    '奇数是常见部署，法定人数是公式：',
    '',
    '```text',
    '常用 3 或 5；quorum = floor(n/2)+1',
    '临时 4 台迁移可以，但要算清 quorum 变成 3',
    '```',
  ].join('\n'),

  'jvm-xmx-not-container-limit': [
    '-Xmx 不是容器内存上限：',
    '',
    '```bash',
    '# cgroup 512Mi',
    'java -Xmx256m -XX:+UseContainerSupport ...',
    '# 还要看 RSS / 直接内存，别把 Xmx 当容器唯一极限',
    '```',
  ].join('\n'),

  'cache-db-double-write-race': [
    '删缓存与回填竞态要用版本或延时双删：',
    '',
    '```text',
    '坏：更新后 DEL 一次，忽略并发回填旧值',
    '好：更新带版本；回填比较版本；或延时再 DEL',
    '```',
  ].join('\n'),

  'distributed-clock-skew': [
    '跨地冲突比版本，不比本地毫秒：',
    '',
    '```text',
    '两地写同一配置 → 比较 version',
    '显示时再格式化当地时区',
    '勿 if (localMillisA > localMillisB) 覆盖',
    '```',
  ].join('\n'),

  'distributed-unique-id': [
    '分片内自增会撞全局 id：',
    '',
    '```text',
    '两分片都插入 id=100 → 报表去重丢单',
    '改全局唯一（号段/雪花），并保证趋势可排序若需要',
    '```',
  ].join('\n'),

  'distributed-bulkhead': [
    '下游隔离线程池，别拖垮登录：',
    '',
    '```text',
    '库存调用：独立 20 线程，超时失败',
    '登录：另一组连接',
    '库存打满不影响登录池',
    '```',
  ].join('\n'),

  'fenced-frame-embed-boundary': [
    'fencedframe 宿主读不到创意 DOM：',
    '',
    '```html',
    '<fencedframe src="https://ad.example/creative"></fencedframe>',
    '<!-- 宿主不能 query 内部 DOM；按规范收有限报告 -->',
    '```',
  ].join('\n'),

  'attribution-reporting-not-cookie': [
    '归因用 Attribution Reporting，不是第三方 Cookie：',
    '',
    '```text',
    '落地注册 attribution source',
    '转化页 trigger',
    '聚合报告回广告主 — 不是读第三方 Cookie',
    '```',
  ].join('\n'),
  'mysql-invisible-index-not-drop': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```sql',
    'ALTER TABLE t ALTER INDEX idx_user INVISIBLE;',
    'EXPLAIN SELECT ...;  -- 通常不再选该索引',
    '-- 仍占空间；确认后再 DROP INDEX idx_user',
    '```'
  ].join('\n'),

  'redis-hello-resp3-not-just-version': [
    'HELLO 协商 RESP3，不是只看 redis-server 版本号：',
    '',
    '```redis',
    'HELLO 3',
    'CLIENT TRACKING ON',
    '# RESP3 需协商；代理仍可能停在 RESP2',
    '```',
  ].join('\n'),

  'mysql-invisible-index-not-drop': [
    '先 INVISIBLE 观察计划，确认后再 DROP：',
    '',
    '```sql',
    'ALTER TABLE t ALTER INDEX idx_user INVISIBLE;',
    'EXPLAIN SELECT ...;  -- 通常不再选该索引',
    '-- 仍占空间；确认后再 DROP INDEX idx_user',
    '```',
  ].join('\n'),

  // batch15: polish worst template mismatches (later key wins)
  'java-happens-before': [
    '同一把锁上的解锁 happens-before 加锁后的读：',
    '',
    '```java',
    'synchronized (lock) { flag = true; }  // 写线程',
    'synchronized (lock) { /* 能看见 true */ }',
    '// 两边都去掉锁 → 读线程可能一直见 false',
    '```',
  ].join('\n'),

  'java-interrupt': [
    '中断是协作信号；catch 后要决定退出还是恢复标志：',
    '',
    '```java',
    'try {',
    '  while (!Thread.currentThread().isInterrupted()) {',
    '    Thread.sleep(100);',
    '  }',
    '} catch (InterruptedException e) {',
    '  Thread.currentThread().interrupt(); // 恢复标志',
    '  break; // 勿只打印后继续 sleep',
    '}',
    '```',
  ].join('\n'),

  'java-reentrant-lock': [
    'lock 后必须在 finally unlock，否则别人永远等：',
    '',
    '```java',
    'lock.lock();',
    'try {',
    '  work(); // 即使抛异常',
    '} finally {',
    '  lock.unlock();',
    '}',
    '// 无 finally → B 在 lock() 上一直等待',
    '```',
  ].join('\n'),

  'java-virtual-threads': [
    '虚拟线程擅长阻塞等待，不加速纯 CPU：',
    '',
    '```java',
    'try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {',
    '  // 1000 个阻塞 JDBC：可同时挂起，瓶颈常在连接池',
    '  // 1000 个纯计算：仍打满 CPU，完成时间不降',
    '}',
    '```',
  ].join('\n'),

  'java-executor': [
    '无界队列会堆任务；有界队列才有背压：',
    '',
    '```java',
    '// 坏：FixedThreadPool 默认无界队列 → 堆随提交涨',
    'new ThreadPoolExecutor(4, 4, 0, SECONDS,',
    '  new ArrayBlockingQueue<>(10), new AbortPolicy());',
    '// 队列满 → 拒绝，而不是无限堆积',
    '```',
  ].join('\n'),

  'java-concurrency': [
    'volatile 保可见不保复合操作原子：',
    '',
    '```java',
    'volatile int count;',
    '// 两线程各 count++ 1000 次 → 结果可 < 2000',
    'AtomicInteger n = new AtomicInteger();',
    'n.incrementAndGet(); // 单变量原子',
    '// 两字段一起更新仍要锁/事务',
    '```',
  ].join('\n'),

  'java-collections': [
    '作键的对象改了 equals/hashCode 字段就丢桶：',
    '',
    '```java',
    'Map<Person, String> m = new HashMap<>();',
    'Person p = new Person("a@b.com");',
    'm.put(p, "x");',
    'p.setEmail("c@d.com"); // 坏：改了参与 hash 的字段',
    'm.get(new Person("c@d.com")); // null',
    '```',
  ].join('\n'),

  'java-exceptions': [
    '吞掉运行时异常会假成功；资源两条路径都要关：',
    '',
    '```java',
    'try {',
    '  deduct(); // 抛 RuntimeException',
    '} catch (RuntimeException e) {',
    '  return ok(null); // 坏：页面成功、事务已乱',
    '}',
    '// 好：继续抛出 → 统一处理 + 回滚',
    '```',
  ].join('\n'),

  'java-priority-queue': [
    '堆只保证 peek/poll 顺序，for-each 不是排序：',
    '',
    '```java',
    'PriorityQueue<Integer> q = new PriorityQueue<>();',
    'q.offer(3); q.offer(1); q.offer(2);',
    'q.peek(); // 1',
    '// for (x : q) 顺序不定',
    'q.poll(); q.poll(); q.poll(); // 1,2,3',
    '```',
  ].join('\n'),

  'java-barrier-latch': [
    'Latch 一次性；Barrier 可多轮汇合：',
    '',
    '```java',
    'CountDownLatch done = new CountDownLatch(n);',
    '// 工人结束 countDown；主线程 await 一次',
    'CyclicBarrier round = new CyclicBarrier(n, this::merge);',
    '// 每轮结束 await，可进入下一轮',
    '```',
  ].join('\n'),

  'node-emitter': [
    'emit 同步调用监听器，在返回前跑完：',
    '',
    '```js',
    'ee.on("ready", () => console.log("handler"))',
    'console.log("before")',
    'ee.emit("ready")',
    'console.log("after")',
    '// 输出：before → handler → after',
    '```',
  ].join('\n'),

  'node-buffer': [
    'alloc 清零；allocUnsafe 可能有残留；中文按字节计：',
    '',
    '```js',
    'Buffer.alloc(8)        // 全 0',
    'Buffer.allocUnsafe(8)  // 写入前可能非零残留',
    '"中".length            // 1',
    'Buffer.byteLength("中", "utf8") // > 1',
    '```',
  ].join('\n'),

  'node-nexttick': [
    'nextTick 与微任务顺序依赖模块格式，勿混用一次结论：',
    '',
    '```js',
    'console.log("sync")',
    'process.nextTick(() => console.log("tick"))',
    'queueMicrotask(() => console.log("micro"))',
    '// CJS 与 ESM 顶层相对顺序可能不同',
    '```',
  ].join('\n'),

  'node-stream': [
    'write 返回 false 要暂停，等 drain 再继续：',
    '',
    '```js',
    'readable.on("data", (chunk) => {',
    '  if (!writable.write(chunk)) readable.pause()',
    '})',
    'writable.on("drain", () => readable.resume())',
    '// 忽略 false → 缓冲线性上涨',
    '```',
  ].join('\n'),

  'query-cache-not-http-client': [
    'Query 缓存结果；发 HTTP 的是你的 client：',
    '',
    '```ts',
    'useQuery({',
    '  queryKey: ["orders"],',
    '  queryFn: () => api.get("/orders").then(r => r.data),',
    '})',
    '// api 换成 fetch → 缓存行为仍属 Query，变的是谁解析 HTTP',
    '```',
  ].join('\n'),

  xss: [
    'textContent 当文本；innerHTML 会解析成节点：',
    '',
    '```js',
    'el.textContent = "<b>甲</b>" // 看见尖括号',
    'el.innerHTML = "<b>甲</b>"   // 出现 b 元素；onclick 也可执行',
    '```',
  ].join('\n'),

  'mysql-second-nf': [
    '非主属性不能只依赖复合键的一部分：',
    '',
    '```sql',
    '-- 候选键 (order_id, product_id)',
    '-- 坏：明细表同时存 product_name（只依赖 product_id）',
    '-- 好：商品表存名称；明细只留商品键（或有意识的历史快照）',
    '```',
  ].join('\n'),

  'mysql-query-cache-removal': [
    '8.x 没有 Query Cache，慢查询看执行计划：',
    '',
    '```sql',
    'SELECT VERSION();              -- 8.4 勿找 query_cache_size',
    'EXPLAIN ANALYZE SELECT ...;   -- 看是否走索引',
    '-- 结果缓存放到应用：键、TTL、写入失效点',
    '```',
  ].join('\n'),

  'mysql-innodb-fulltext': [
    '全文用 MATCH AGAINST，不是普通二级索引等值：',
    '',
    '```sql',
    'ALTER TABLE article ADD FULLTEXT idx_body (body);',
    'SELECT * FROM article',
    'WHERE MATCH(body) AGAINST ("无线鼠标" IN NATURAL LANGUAGE MODE);',
    '-- WHERE body = "整句" 走不了这套分词计划',
    '```',
  ].join('\n'),

  'mysql-replication-flow': [
    '复制是 dump → relay → apply，切换前看位点：',
    '',
    '```sql',
    'SHOW REPLICA STATUS\\G   -- Seconds_Behind / GTID',
    '-- 源上 PROCESSLIST 可见 Binlog Dump',
    '-- 切只读到副本前确认应用位点，不是「能连就一致」',
    '```',
  ].join('\n'),

  'mysql-myisam-innodb': [
    '默认 InnoDB；无主键会用隐藏行 ID，勿当业务键：',
    '',
    '```sql',
    'CREATE TABLE t (name VARCHAR(20)); -- 默认 InnoDB',
    'SHOW ENGINES;  -- 看默认引擎',
    '-- 无 PK 时二级索引靠隐藏行 ID 回表；业务主键应显式声明',
    '```',
  ].join('\n'),

  'mysql-buffer-pool-size': [
    '默认约 128MB；专用机才谈自动比例：',
    '',
    '```sql',
    'SHOW VARIABLES LIKE "innodb_buffer_pool_size";',
    '-- 专用 32G + innodb_dedicated_server ≈ 自动抬高',
    '-- 同机还跑应用：从默认调起，看命中与换页，勿先乘 80%',
    '```',
  ].join('\n'),

  'mysql-union-distinct': [
    'UNION 去重不保证顺序；要序就 ORDER BY：',
    '',
    '```sql',
    'SELECT city FROM a',
    'UNION',
    'SELECT city FROM b',
    'ORDER BY city;   -- 需要稳定顺序时写上',
    '-- 确认无重复用 UNION ALL',
    '```',
  ].join('\n'),

  'mysql-innodb-index-lock': [
    '行锁加在索引记录上；无合适索引会锁很多行：',
    '',
    '```sql',
    'UPDATE t SET x=1 WHERE name=?;  -- 无 name 索引 → 可能扫聚簇并锁大量记录',
    'SHOW ENGINE INNODB STATUS\\G     -- 仍见 RECORD LOCKS',
    '-- 给 name 建索引后，锁集合通常缩小到匹配项/间隙',
    '```',
  ].join('\n'),

  'redis-expire': [
    '整点齐过期会打穿库；TTL 加抖动摊开：',
    '',
    '```redis',
    'SET product:1 ... EX 3600',
    '-- 一万键都在 12:00:00 过期 → DB QPS 尖峰',
    '-- EX 3600 + random(0..30) 摊开过期',
    '```',
  ].join('\n'),

  'redis-persistence': [
    '每秒 fsync 仍有不足一秒的丢失窗口：',
    '',
    '```redis',
    'INFO persistence',
    'CONFIG GET appendfsync   -- everysec',
    '-- 确认后、下次 fsync 前断电 → 窗口内写入可丢',
    '-- 缓存可回源；只写在 Redis 的扣减会丢',
    '```',
  ].join('\n'),

  'redis-transaction': [
    'WATCH 发现被改则 EXEC 失败，避免瞎覆盖：',
    '',
    '```redis',
    'WATCH stock',
    'GET stock          # 甲读到 5',
    '# 乙 SET stock 4',
    'MULTI',
    'SET stock 6',
    'EXEC               # 失败，仍为 4；无 WATCH 会盖成 6',
    '```',
  ].join('\n'),

  'rabbit-ack': [
    '先落库再 ack；用业务键挡重投：',
    '',
    '```text',
    '写订单成功 → 断线（未 ack）→ 消息重投',
    '按 orderId 发现已有行 → 跳过插入 → 再 ack',
    '写库前就 ack → 断线后消息不来、订单也不存在',
    '```',
  ].join('\n'),

  'kafka-offset': [
    '先处理再提交位移；崩溃会至少再消费一次：',
    '',
    '```text',
    'poll 到 offset 10 → 写库成功 → 提交 11 前崩溃',
    '重启后再 poll → 仍从已提交位置读到 10',
    '写库前就 commit 11 → 10 不再出现，订单也没写成',
    '```',
  ].join('\n'),

  'http-range': [
    '续传要 206；收到 200 整包不能接着 append：',
    '',
    '```http',
    'GET /file HTTP/1.1',
    'Range: bytes=1000-',
    '',
    'HTTP/1.1 206 Partial Content',
    '# 若 200 整文件 → 勿往旧本地文件后面焊',
    '# 416 → 核对本地长度再决定重下',
    '```',
  ].join('\n'),

  'http-compression': [
    '压缩内容进缓存必须带 Vary: Accept-Encoding：',
    '',
    '```http',
    'Accept-Encoding: gzip',
    'Content-Encoding: gzip',
    'Vary: Accept-Encoding',
    '# 缺 Vary → 不支持 gzip 的客户端可能拿到压缩正文',
    '```',
  ].join('\n'),

  'spring-legacy-config': [
    '旧 XML 先对版本；新服务用构造器注入必需依赖：',
    '',
    '```java',
    '// 新服务',
    '@Service',
    'class OrderService {',
    '  OrderService(OrderRepository repo) { this.repo = repo; }',
    '}',
    '// 勿为校验 setter 再引入已过时的 @Required',
    '```',
  ].join('\n'),

  // batch16: polish MySQL SHOW ENGINE / varchar-heuristic template cluster
  'mysql-innodb-tablespace': [
    '页大小决定内部表空间上限，不是「表空间=2GB」：',
    '',
    '```sql',
    'SHOW VARIABLES LIKE "innodb_page_size";  -- 常见 16384',
    '-- 16KB 页 → 内部上限约 64TB（手册）',
    '-- 文件系统单文件 16TB 可能先撞上',
    '```',
  ].join('\n'),

  'mysql-fk-redundancy': [
    '计数冗余要对账；去掉外键就要有同等严格的应用规则：',
    '',
    '```text',
    '帖子 reply_count：事务内更新或异步重建',
    '定期 COUNT(*) 校准',
    '无 FK 的父子订单：删父时挡并发插子',
    '```',
  ].join('\n'),

  'mysql-wide-column-split': [
    '列表不取正文才值得拆宽列；先 EXPLAIN 再拆：',
    '',
    '```sql',
    '-- 列表：id, title, summary 留主表',
    'SELECT id, title, summary FROM article WHERE ...;',
    '-- 若仍 SELECT 正文 → 拆子表前后都要读，还多一次回表',
    '```',
  ].join('\n'),

  'mysql-datetime-vs-timestamp': [
    'DATETIME 存字面值；TIMESTAMP 按会话时区转 UTC：',
    '',
    '```sql',
    '-- DATETIME 无小数秒约 5 字节；2039-01-01 可存',
    '-- TIMESTAMP 约 4 字节；传统上限 ~2038-01-19 UTC',
    'SET time_zone = "+08:00";',
    'INSERT ... TIMESTAMP ...;  -- 按会话时区解释',
    '```',
  ].join('\n'),

  'mysql-replica-parallel-applier': [
    '并行回放能降延迟；大事务与读己之写另说：',
    '',
    '```sql',
    'SET GLOBAL replica_parallel_workers = 4;',
    '-- 主库可并行的小事务 → 从库延迟下降',
    '-- 主库一次改几百万行 → 延迟再拉大',
    '-- 「我的订单」仍读主，不读还在追的从库',
    '```',
  ].join('\n'),

  'mysql-redo-undo-binlog': [
    'redo / undo / binlog / relay 四本日志不能互相代替：',
    '',
    '```text',
    'redo：崩溃后重做已提交变更',
    'undo：回滚 + MVCC 读旧版本',
    'binlog：逻辑事件（复制/恢复）',
    'relay：从库 IO 线程落地后再由 applier 回放',
    '```',
  ].join('\n'),

  'mysql-pt-checksum-pk': [
    '校验按主键切块；修复语句从主库复制出去：',
    '',
    '```bash',
    'pt-table-checksum ...  # 按 PK chunk，主从各算',
    'pt-table-sync ...      # 修复在主库产生再复制',
    '# 无主键 → 切块窗口变大',
    '```',
  ].join('\n'),

  'mysql-initialize-not-install-db': [
    '8.x 用 mysqld --initialize，不是 mysql_install_db：',
    '',
    '```bash',
    'mysqld --initialize --datadir=/var/lib/mysql-3306',
    'mysqld --defaults-file=3307.cnf  # 另一 datadir/port/socket/server_id',
    '# 客户端连各自 socket，勿写进对方数据目录',
    '```',
  ].join('\n'),

  'mysql-innodb-no-user-hash': [
    'InnoDB 二级索引是 B+ 树，不要写 USING HASH：',
    '',
    '```sql',
    'KEY (email)  -- B+：等值与 BETWEEN 同一有序叶子',
    '-- USING HASH 不会让范围查询变快',
    '-- 自适应哈希不是这条 DDL 能声明的',
    '```',
  ].join('\n'),

  'mysql-autoinc-persists-8': [
    '8.0+ Auto_increment 持久化，删行重启不会捡回空洞：',
    '',
    '```sql',
    '-- 插入 1..17，删掉 ≥15',
    'SHOW TABLE STATUS LIKE "t";  -- Auto_increment 仍为 18',
    '-- 重启后再 INSERT → id=18（5.7 重启才可能捡回 15）',
    '```',
  ].join('\n'),

  'mysql-float-ieee-not-8-digits': [
    'FLOAT 列累加会漂；钱用 DECIMAL / 分：',
    '',
    '```sql',
    'INSERT INTO t(f) VALUES (0.1),...(×10);',
    'SELECT SUM(f) FROM t;           -- 常 ≠ 1',
    'SELECT SUM(d) FROM t_dec;       -- DECIMAL(10,1) → 1.0',
    '-- 客户端里 0.1 连加十次可能显示 1（未进 FLOAT 列）',
    '```',
  ].join('\n'),

  'mysql-acid-c-is-consistency': [
    '一致性是不变量；隔离不是「全局单线程」：',
    '',
    '```text',
    '转账结束：余额非负、收支相抵 → Consistency',
    'RR 下两会话改不同订单 → 都可提交',
    '勿把隔离做成「同一时间只有一个请求」',
    '```',
  ].join('\n'),

  'mysql-split-not-at-ten-million': [
    '行数不是拆分阈值；看访问形态与运维指标：',
    '',
    '```text',
    'WHERE id=? 且热数据在缓冲池 → 两千万行也可不拆',
    '大范围扫描 / 复制延迟升 / 备份超窗 → 再谈按时间或键拆',
    '```',
  ].join('\n'),

  'mysql-inner-join-match': [
    'INNER 只要匹配行；要全用户加计数用 LEFT JOIN：',
    '',
    '```sql',
    'SELECT u.id FROM users u',
    'INNER JOIN orders o ON u.id = o.user_id;  -- 只下过单的',
    'SELECT u.id, COUNT(o.id) FROM users u',
    'LEFT JOIN orders o ON u.id = o.user_id',
    'GROUP BY u.id;',
    '```',
  ].join('\n'),

  'mysql-for-update-not-dist-lease': [
    'FOR UPDATE 是同库短保护，不是跨机租约：',
    '',
    '```sql',
    'SELECT * FROM stock WHERE sku=? FOR UPDATE;',
    '-- 本地减库存后立刻 COMMIT',
    '-- 持锁调支付网关 → 连接随 RTT 线性涨',
    'UPDATE stock SET qty=qty-1 WHERE sku=? AND qty>=1;',
    '```',
  ].join('\n'),

  'mysql-money-decimal-not-ban': [
    '金额用 DECIMAL 或按分 BIGINT，别用 FLOAT：',
    '',
    '```sql',
    'amount DECIMAL(12,2)  -- 19.90 ×10 → 199.00',
    '-- 或 BIGINT 存分：1990，展示 /100',
    '-- FLOAT 再 SUM 常对不上',
    '```',
  ].join('\n'),

  'mysql-mvcc-not-two-version-columns': [
    'MVCC 靠 Read View + undo，不是表上多一列版本：',
    '',
    '```text',
    'A 开启后普通 SELECT 见价格 10',
    'B 提交改成 12 → A 在 RR 仍可能见 10',
    '靠 undo 链，不是 delete_version 业务列',
    'A 若 SELECT … FOR UPDATE → 锁定读，行为不同',
    '```',
  ].join('\n'),

  'mysql-fk-ban-not-absolute': [
    '外键按场景：单库可挡悬空；热点表可去掉并加对账：',
    '',
    '```text',
    '订单/明细单库 → FK 挡悬空明细',
    '秒杀库存热点 → 可无 FK + 对账任务',
    '不要用「禁止」代替这两种设计',
    '```',
  ].join('\n'),

  'mysql-innodb-default-not-ban-others': [
    '新建默认 InnoDB；迁 MyISAM 前确认表级依赖：',
    '',
    '```sql',
    'CREATE TABLE orders (...);  -- 不写 ENGINE → InnoDB',
    '-- 遗留 MyISAM：先确认表级特性，再 ALTER ENGINE=InnoDB',
    '```',
  ].join('\n'),

  'mysql-db-features-ban-not-absolute': [
    '视图/触发器/Event 按职责放行，不是一刀切禁令：',
    '',
    '```text',
    '允许：报表只读 VIEW',
    '禁止：触发器维护库存',
    'Event：若用则当生产任务管理，不是默认首选',
    '```',
  ].join('\n'),

  'mysql-ddl-merge-heuristic': [
    '无关 DDL 评估能否合并；冲突就分发并看延迟：',
    '',
    '```sql',
    '-- 加索引 + 改无关列：评估 ALGORITHM=INPLACE 一条做完',
    '-- 冲突 → 分开发布，观察复制延迟',
    '```',
  ].join('\n'),

  'mysql-count-star-innodb-not-always-scan': [
    '带条件的 COUNT 应走索引；全局精确总数用汇总表：',
    '',
    '```sql',
    'SELECT COUNT(*) FROM orders WHERE shop_id=?;  -- 应走索引',
    '-- 全表精确总数 → 汇总表定时刷新，勿每次扫堆',
    '```',
  ].join('\n'),

  'mysql-pk-autoinc-not-only-choice': [
    '聚簇主键可选雪花或代理自增，避免无序 UUID：',
    '',
    '```text',
    '雪花 / 号段 BIGINT 作 PK',
    '或 AUTO_INCREMENT 代理键 + 业务 UNIQUE',
    '避免无序 UUID 直接当聚簇主键',
    '```',
  ].join('\n'),

  'mysql-subquery-ban-not-absolute': [
    '可索引 IN 子查询可能 semi-join；相关子查询按行要改写：',
    '',
    '```sql',
    'WHERE id IN (SELECT id FROM t WHERE ...可索引...)',
    '-- EXPLAIN 看是否 semi-join',
    '-- 坏的相关子查询：按外层行执行 → 改 JOIN/派生表',
    '```',
  ].join('\n'),

  'mysql-scalability-not-hopeless': [
    '读多先副本与缓存；写热点再分片：',
    '',
    '```text',
    '读多 → 副本 + 缓存',
    '写热点 → 再谈分片',
    '文档模型适合稀疏属性，不是「MySQL 差所以换」',
    '```',
  ].join('\n'),

  'mysql-replica-lag': [
    '延迟估计为 0 仍可能读不到刚写的行：',
    '',
    '```text',
    '暂停从库应用 → 主库 INSERT 订单',
    '主立刻可见；从库行数 0（Seconds_Behind 仍可能显示 0）',
    '恢复并追上位点后从库才有行',
    '列表若要读己之写 → 查主',
    '```',
  ].join('\n'),

  'mysql-slow-sql-locate': [
    '先按累计耗时找摘要，不是只盯单次最慢：',
    '',
    '```text',
    'A：3s × 10 次 ≈ 30s',
    'B：50ms × 100000 ≈ 5000s  → 先开 B',
    '看检查行数与摘要文本',
    '```',
  ].join('\n'),

  'mysql-slow-sql-optimize': [
    '等值+排序用联合索引左前缀，ANALYZE 看实扫行数：',
    '',
    '```sql',
    '-- WHERE status=? ORDER BY created_at',
    'INDEX (status, created_at)',
    'EXPLAIN ANALYZE ...;  -- 实扫接近该状态行数',
    '-- 只有 created_at → 等值用不上左前缀，行数仍大',
    '```',
  ].join('\n'),

  'mysql-group-by-having': [
    'WHERE 先滤行，HAVING 滤分组后的聚合：',
    '',
    '```sql',
    'SELECT user_id, COUNT(*) c FROM orders',
    'WHERE status = "paid"',
    'GROUP BY user_id',
    'HAVING c > 10;',
    '```',
  ].join('\n'),

  'mysql-varchar-length': [
    '同 VARCHAR(50)，字符集不同字节占用不同：',
    '',
    '```sql',
    'SELECT CHAR_LENGTH(col), LENGTH(col) FROM t;',
    '-- ASCII 与 utf8mb4 汉字：字符数可同，字节数不同',
    '```',
  ].join('\n'),

  'mysql-varchar-row-max': [
    '单行 65535 预算含字符集与长度前缀：',
    '',
    '```text',
    'latin1 NOT NULL：65533 成功、65535 失败（手册对照）',
    'utf8mb3 VARCHAR(255)：255×3 超 255 → 2 字节长度前缀',
    'utf8mb4 按 4 字节计入同一预算',
    '```',
  ].join('\n'),

  'mysql-unique-change-buffer': [
    '普通二级索引可进 change buffer；唯一索引每次要查重：',
    '',
    '```text',
    '日志表 INDEX(user_id) 批量插入 → 可进 change buffer',
    'UNIQUE(email) → 每次插入都要确认无重复，不能先缓冲再返回',
    '```',
  ].join('\n'),

  'mysql-prefix-index-and-cost': [
    '前缀太短没选择性；ORDER BY 列不在索引里会 filesort：',
    '',
    '```sql',
    '-- email 前 8 字符都落在同一域名 → 区分度差',
    'UNIQUE (email)  -- 整列才有选择性',
    '-- INDEX(name, created_at) + WHERE name=? ORDER BY id',
    '-- id 不在索引 → filesort',
    '```',
  ].join('\n'),

  'mysql-covering-not-index-kind': [
    '覆盖是「查询列都在索引里」，不是一种索引类型：',
    '',
    '```sql',
    '-- INDEX(email)；InnoDB 叶子带主键',
    'SELECT id, email FROM user WHERE email=?;  -- Using index',
    'SELECT * FROM user WHERE email=?;          -- 回表，非覆盖',
    '-- 没有 CREATE COVERING INDEX',
    '```',
  ].join('\n'),

  'mysql-text-ban-not-absolute': [
    '大文本可页外存；列表勿 SELECT 正文：',
    '',
    '```sql',
    '-- 正文 TEXT/页外：列表只取摘要列',
    'SELECT id, title FROM article;',
    '-- 「禁止 TEXT」是启发式，不是语法禁令',
    '```',
  ].join('\n'),

  'mysql-enum-ban-not-absolute': [
    '稳定短枚举可用；常变状态更宜表或字符串+约束：',
    '',
    '```sql',
    'status ENUM("draft","paid")  -- 很少变时可',
    '-- 业务状态常增删 → 字典表 / VARCHAR + CHECK',
    '```',
  ].join('\n'),

  'mysql-phone-varchar-length-not-twenty': [
    '电话长度按实际格式与区号，不是背「必须 20」：',
    '',
    '```sql',
    'phone VARCHAR(32)  -- E.164 / 分机按产品定',
    '-- 「电话=VARCHAR(20)」是口诀不是规范',
    '```',
  ].join('\n'),

  'mysql-db-not-blob-store': [
    '库存元数据与对象键；大文件放对象存储：',
    '',
    '```text',
    'orders.avatar_key = "u/9/a.png"',
    '文件本体 → OSS / S3',
    '勿把多 MB BLOB 当默认附件方案',
    '```',
  ].join('\n'),
  'storage-access-api-not-cookie-restore': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```js',
    '// 嵌入第三方 iframe 内，需用户手势',
    'await document.requestStorageAccess()',
    '// 成功后才能读本第三方的存储；不是宿主代读',
    '```'
  ].join('\n'),
  'fedcm-not-oauth-popup': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```js',
    '// FedCM：浏览器中介账户选择（示意）',
    "const cred = await navigator.credentials.get({ identity: { providers: [...] } })",
    '// ≠ window.open(idp/authorize) 自管弹窗',
    '```'
  ].join('\n'),
  'mysql-histogram-not-index': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```sql',
    'ANALYZE TABLE t UPDATE HISTOGRAM ON status;',
    'EXPLAIN SELECT * FROM t WHERE status = \'closed\';',
    '-- 统计更准 ≠ 自动变成索引查找',
    '```'
  ].join('\n'),
  'redis-sharded-pubsub-not-cluster-queue': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```redis',
    'SSUBSCRIBE orders:events',
    'SPUBLISH orders:events "{...}"',
    '# 无订阅者仍丢；可靠投递看 Stream/MQ',
    '```'
  ].join('\n'),
  'qps-formula-not-capacity': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    '心算：吞吐 ≈ 并发 / 平均延迟',
    '批复：压测拐点 + P99 + 错误率 + 依赖饱和',
    '```'
  ].join('\n'),
  'circuit-breaker-not-retry': [
    '熔断打开应快速失败；不要在打开态疯狂重试：',
    '',
    '```text',
    '熔断打开 → 快速失败 / 降级',
    '重试 → 单次调用再执行（有预算）',
    '# 不要在打开态疯狂重试同一依赖',
    '```',
  ].join('\n'),

  // batch17: polish MyBatis / Spring / Java concurrency / Node / JPA template clusters
  'mybatis-rowbounds-memory': [
    '小表可用 RowBounds；大列表用 LIMIT / 键集分页：',
    '',
    '```sql',
    '-- 小字典：RowBounds(0,20) 尚可',
    'SELECT ... WHERE id > #{lastId} ORDER BY id LIMIT 20',
    '-- 或插件改写 LIMIT；勿对大结果集先全载再截断',
    '```',
  ].join('\n'),

  'mybatis-lazy-javassist-not-cglib': [
    '懒加载默认触发方法含 toString；aggressive 会更凶：',
    '',
    '```text',
    'lazyLoadingEnabled=true, aggressiveLazyLoading=false',
    'user.getName() → 只有用户 SQL',
    'log.print(user) → toString 触发订单 SQL',
    '只调 getOrders() → 订单 SQL 应出现在这次调用',
    '```',
  ].join('\n'),

  'mybatis-jdbc-log-inlines': [
    '分页 LIMIT 可能出在 JDBC 可执行日志，不在 XML 原文：',
    '',
    '```text',
    'XML 无 LIMIT；p6spy/Druid 见 ... limit ?, ?',
    '关掉分页插件 → limit 消失',
    'Preparing 打在哪一层，决定你看到的是原文还是改写后',
    '```',
  ].join('\n'),

  'mybatis-debug-boundsql': [
    '断在带 BoundSql 的 query，再单步到 setXxx：',
    '',
    '```java',
    '// 条件：ms.getId().endsWith("OrderMapper.findById")',
    'boundSql.getSql(); // 含 ?',
    '// 再步进 PreparedStatement.setLong(...)',
    '// 分页查询：此处 SQL 末尾可能已有 LIMIT',
    '```',
  ].join('\n'),

  'mybatis-plus-page-argument': [
    'MP 的 Page 参数自带 COUNT+LIMIT；勿再叠 PageHelper：',
    '',
    '```java',
    'orderMapper.selectPage(new Page<>(1, 20), wrapper);',
    '// 日志：数据 SQL + COUNT，一段 LIMIT',
    '// 再 PageHelper.startPage → 可能出现两次 limit',
    '```',
  ].join('\n'),

  'mybatis-middleware-layers': [
    '一次请求可叠数据源、分页、分片；Generator 不在链上：',
    '',
    '```text',
    '@DS("slave") → 分页 LIMIT → Sharding 改表名',
    'Druid 慢日志见最终语句',
    '同一事务里先主库再 @DS("slave") → 常仍走已开事务连接',
    '```',
  ].join('\n'),

  'mybatis-mapper-bound': [
    '复杂读归映射文件；写聚合归有会话的领域对象：',
    '',
    '```text',
    '三表联接列表 → Mapper XML 定列与排序',
    '改库存聚合 → 实体 + 事务，会话跟踪脏状态',
    '两边各改同一行 → 后提交盖前，无统一脏检查',
    '```',
  ].join('\n'),

  'mybatis-resultmap': [
    '一对多要折叠；别名错了字段仍空：',
    '',
    '```xml',
    '<resultMap id="OrderMap" type="Order">',
    '  <id property="id" column="oid"/>',
    '  <collection property="items" ofType="Item">',
    '    <id property="id" column="iid"/>',
    '  </collection>',
    '</resultMap>',
    '<!-- 三行同一订单 → 折成 1 订单 + 3 明细 -->',
    '```',
  ].join('\n'),

  'mybatis-dynamic-sql': [
    '动态条件用标签+占位符；排序列必须白名单：',
    '',
    '```xml',
    '<where>',
    '  <if test="name != null">AND name = #{name}</if>',
    '  <if test="status != null">AND status = #{status}</if>',
    '</where>',
    '<!-- ORDER BY 只允许枚举列名，勿拼用户字符串 -->',
    '```',
  ].join('\n'),

  'mybatis-local-cache': [
    '一级缓存在同一 SqlSession/事务内；提交后失效：',
    '',
    '```text',
    '同一事务按 id 查两次 → 一条 SELECT',
    '提交后再查 → 再发 SELECT',
    '不在事务里连续两次调用 → 通常各一条',
    '```',
  ].join('\n'),

  'mybatis-batch-executor': [
    'BATCH 减少往返；flush 才抛错；中途 select 会打断：',
    '',
    '```java',
    '// ExecutorType.BATCH，每 500 行 flush',
    '// 往返远少于 1000 次单条 insert',
    '// 中途 select 刚插入的 id → 批处理被打断',
    '// 重复键异常常出现在 flush，不是 insert 返回时',
    '```',
  ].join('\n'),

  'mybatis-plugin-interceptor': [
    '拦截签名要对上；插件里勿再开会话查库：',
    '',
    '```java',
    '@Intercepts(@Signature(type = Executor.class,',
    '  method = "update", args = {MappedStatement.class, Object.class}))',
    '// 只打 UPDATE；SELECT 不进',
    '// 插件里再 openSession 查询 → 递归进拦截',
    '```',
  ].join('\n'),

  'mybatis-second-cache': [
    '二级缓存在 namespace；别的 mapper 改数不会自动清它：',
    '',
    '```text',
    '订单 namespace 开二级缓存',
    '会话 A 提交 → 详情进缓存',
    '库存 mapper 改库存并提交 → 再查订单详情仍可能旧',
    '直到过期或同 namespace 写入清掉',
    '```',
  ].join('\n'),

  'mybatis-type-handler': [
    'TypeHandler 管读写映射；未知码应显式失败：',
    '',
    '```java',
    '// PAID ↔ TINYINT 1；null → setNull / wasNull',
    '// 库里出现未知 code 9 → 显式失败',
    '// 不要变成 "9" 或枚举 toString()',
    '```',
  ].join('\n'),

  'spring-scope-catalog': [
    '无状态用 singleton；请求里的表单数据用 request 或局部变量：',
    '',
    '```text',
    '@Service → 默认 singleton',
    '每请求的表单数据 → request 作用域或方法局部',
    '勿拿已淡出的 global-session 解释普通浏览器会话',
    '```',
  ].join('\n'),

  'spring-boot-war-still-ok': [
    '默认可执行 jar；外置 Tomcat 用 war + ServletInitializer：',
    '',
    '```java',
    '// java -jar → 内嵌 Tomcat',
    'public class ServletInit extends SpringBootServletInitializer {',
    '  @Override protected SpringApplicationBuilder configure(...) { ... }',
    '}',
    '// 自动配置仍可用 exclude 关掉',
    '```',
  ].join('\n'),

  'spring-boot3-autoconfig-imports': [
    'Boot 3 用 AutoConfiguration.imports，不是只看 factories：',
    '',
    '```text',
    'META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports',
    'com.example.FooAutoConfiguration',
    '@ConditionalOnClass → 缺类则条件报告未匹配',
    '// 2.6 及更早才只看 spring.factories',
    '```',
  ].join('\n'),

  'spring-xmlbeanfactory-removed': [
    'singleton 默认急加载；@Lazy / prototype 启动时不创建：',
    '',
    '```java',
    '@Service class Eager { Eager() { log("创建"); } }',
    '// run 返回前已打印',
    '@Lazy @Service class LazyS { ... } // 首次注入才创建',
    '// prototype：每次 getBean 各创建一次',
    '```',
  ].join('\n'),

  'spring-factorybean-product': [
    'getBean(name) 是产品；&name 才是 FactoryBean：',
    '',
    '```java',
    'getBean("client");   // Client（getObject 产品）',
    'getBean("&client");  // 那个 FactoryBean',
    '// 构造器参数写 Client → 注入的是产品',
    '```',
  ].join('\n'),

  'spring-event-sync-default': [
    '默认同步派发；@Async 才换线程且调用方不等：',
    '',
    '```java',
    'publishEvent(new OrderPlaced(...));',
    '// 无 @Async：监听器在 publishEvent 返回前跑完',
    '// 监听器抛错 → placeOrder 能看见',
    '// @Async → 别的线程，placeOrder 不再等',
    '```',
  ].join('\n'),

  'spring-jdbctemplate-callback': [
    'JdbcTemplate 把 SQLException 翻成 DataAccessException：',
    '',
    '```java',
    'jdbcTemplate.query(sql, rowMapper);',
    '// 方法签名无 SQLException',
    '// SQL 写错 → DataAccessException',
    '// rowMapper 只取字段；无 Connection try/finally',
    '```',
  ].join('\n'),

  'spring-getbean-hides-deps': [
    '构造器注入可测；方法里 getBean 把依赖藏进容器：',
    '',
    '```java',
    '// 好：OrderService(InventoryClient c)',
    '// 坏：context.getBean("inventory", InventoryClient.class)',
    '// 测试必须先有装好该名的容器，失败在 getBean 而非构造',
    '```',
  ].join('\n'),

  'spring-bean-lifecycle': [
    '构造器参数在创建时已可用；字段注入构造期仍是 null：',
    '',
    '```java',
    'OrderService(Config c) { Objects.requireNonNull(c); }',
    '// @Autowired Config c; 构造器里 c 仍可能 null',
    '// 两构造器互相依赖 → 启动失败，不会交半成品',
    '```',
  ].join('\n'),

  'spring-graceful-shutdown': [
    '先摘流再排空；超时才打断；无关后台任务不在等待里收尾：',
    '',
    '```text',
    '就绪失败 → 新请求不再进来',
    '停机等待内：慢请求写完响应',
    '超时仍在跑 → 中断',
    '未绑本次请求的后台任务 ≠ 这段等待的职责',
    '```',
  ].join('\n'),

  'spring-test-slice': [
    'Web 切片缺 DB Bean 仍可测 400；整容器缺配置起不来：',
    '',
    '```java',
    '@WebMvcTest // 只装 Web：校验 400 可通过',
    '// @SpringBootTest 缺配置 → 上下文起不来，路由未执行',
    '// 真写入另用带库测试；切片绿 ≠ 表里有行',
    '```',
  ].join('\n'),

  'spring-test-transaction-rollback': [
    '测试事务结束回滚；afterCommit 不会跑：',
    '',
    '```java',
    '@Transactional',
    '@Test void save() {',
    '  repo.save(...); // 同事务能查到',
    '} // 结束回滚；库干净；afterCommit 发消息未跑',
    '// 真提交另开测试 + 另一连接才能看见行',
    '```',
  ].join('\n'),

  'spring-session-stateless': [
    'STATELESS 不写会话 Cookie；JWT 主体仍在 SecurityContext：',
    '',
    '```java',
    'http.sessionManagement(s ->',
    '  s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));',
    '// 默认链可能 Set-Cookie；STATELESS 后不再写',
    '// 表单登录要会话 → 另一条过滤器链',
    '```',
  ].join('\n'),

  'java-lock-flexibility': [
    '按场景选锁：超时失败、读写锁、或 CHM 原子方法：',
    '',
    '```java',
    'if (!lock.tryLock(200, MILLISECONDS)) failFast();',
    'ReentrantReadWriteLock // 多读少写',
    'map.computeIfAbsent(k, this::load); // 勿手持写锁 get/put',
    '```',
  ].join('\n'),

  'java-aqs-not-futuretask': [
    'AQS 用 state+队列；FutureTask 是另一套状态机：',
    '',
    '```java',
    '// 自定义锁：state 0→1，tryAcquire CAS，失败进等待队列',
    '// CountDownLatch / Semaphore / ReentrantLock 同模板',
    '// FutureTask：看自己的状态枚举，勿在里面找 AQS 内部类',
    '```',
  ].join('\n'),

  'java-rwlock-no-upgrade': [
    '不能持读锁直接升级写锁；先放读再抢写并复查：',
    '',
    '```java',
    'r.unlock();',
    'w.lock();',
    'try {',
    '  if (stillMissing) fill();',
    '  r.lock(); // 降级：先拿读再放写',
    '} finally { w.unlock(); }',
    '```',
  ].join('\n'),

  'java-cas-aba-stamp': [
    'ABA 要版本戳；单 AtomicInteger 代替不了业务约束：',
    '',
    '```java',
    'AtomicStampedReference<Node> top;',
    '// 期望 (A,1)；他线程弹 A 再压回 → (A,2)',
    '// compareAndSet(A, next, 1, 2) 失败',
    '// 余额 AtomicInteger 只管这一个 int',
    '```',
  ].join('\n'),

  'java-linked-blocking-unbounded': [
    '无界 LinkedBlockingQueue 会先 OOM；有界才背压：',
    '',
    '```java',
    'new LinkedBlockingQueue<>(); // put 一直涨 → OOM',
    'new ArrayBlockingQueue<>(256);',
    '// 第 257 次 put 阻塞；offer 立刻 false 可拒绝',
    '```',
  ].join('\n'),

  'java-tpe-execute-order': [
    '先填满 core，再进队列，队列满才扩到 max，再拒绝：',
    '',
    '```text',
    'core=2, queue=10, max=4',
    '1–2 → 建线程；3–12 → 进队列',
    '13–14 → 队列满且 <max → 再建线程',
    '15 → 拒绝（未 prestart）',
    '```',
  ].join('\n'),

  'java-threads-not-linear-speedup': [
    '抢同一锁不会线性加速；独立 I/O 才可能并行：',
    '',
    '```text',
    '10 线程 synchronized 写同一计数器 → 往往更慢',
    '10 个独立 HTTP 调用 → 才可能接近十路并行',
    '```',
  ].join('\n'),

  'java-vector-cme-not-because-sync': [
    'Vector 同步挡不住单线程 for-each 里 add 的 CME：',
    '',
    '```java',
    'for (String x : vector) {',
    '  vector.add("y"); // 单线程也可 CME',
    '}',
    '// Hashtable 的 Enumeration 不走这套 fail-fast',
    '```',
  ].join('\n'),

  'java-sync-not-all-methods': [
    'synchronized 方法只护这一把实例锁上的入口：',
    '',
    '```java',
    '// A 在 synchronized set() 里',
    '// B 仍可调未加锁的 get()',
    '// 两个 Foo 实例可同时进各自的 synchronized 方法',
    '```',
  ].join('\n'),

  'java-thread-six-states': [
    'sleep / 抢锁 / wait 对应不同状态：',
    '',
    '```java',
    'Thread.sleep(1000);     // TIMED_WAITING',
    '// 抢不到 synchronized → BLOCKED',
    'lock.wait();            // WAITING（无超时）',
    '```',
  ].join('\n'),

  'java-fork-join-pool': [
    '公共池别塞阻塞 I/O；阻塞任务应离开 parallelStream：',
    '',
    '```java',
    'list.parallelStream().forEach(this::httpCall);',
    '// 下游慢 → 公共池线程堵在网络读',
    '// 纯 CPU 计算才适合；阻塞 I/O 换专用池',
    '```',
  ].join('\n'),

  'node-unhandled-rejection': [
    '未捕获的 Promise 拒绝会拖垮进程：',
    '',
    '```js',
    '// 坏：查询失败无 catch → 未处理拒绝、退出码非 0',
    'try {',
    '  await db.query(...)',
    '} catch (e) {',
    '  res.status(500).end()',
    '}',
    '// 只这条 500；其它请求仍 200',
    '```',
  ].join('\n'),

  'node-worker-cluster': [
    '主线程死循环堵事件循环；重活丢 Worker：',
    '',
    '```js',
    '// 主线程 while(true) → HTTP 一直挂起',
    'const { Worker } = require("node:worker_threads")',
    'new Worker("./heavy.js").on("message", send200)',
    '// cluster 多进程：各进程死循环只堵自己',
    '```',
  ].join('\n'),

  'node-http-cookie': [
    '会话用 HttpOnly Cookie；/me 不从 Authorization 读前端 JWT：',
    '',
    '```http',
    'HTTP/1.1 200',
    'Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax',
    '```',
    '',
    '```js',
    '// GET /me → 解析 Cookie 会话，不是 Authorization Bearer',
    '```',
  ].join('\n'),

  'node-event-loop-phases': [
    'I/O 回调里 setImmediate 通常先于 setTimeout(0)：',
    '',
    '```js',
    'fs.readFile(path, () => {',
    '  setTimeout(() => console.log("timeout"), 0)',
    '  setImmediate(() => console.log("immediate"))',
    '})',
    '// 通常 immediate 先；顶层两者顺序不稳定',
    '// nextTick 插在阶段之间，更早',
    '```',
  ].join('\n'),

  'node-libuv-threadpool': [
    '默认线程池排满后 CPU 型异步会排队：',
    '',
    '```js',
    '// 大量 crypto.pbkdf2 → 池满后延迟升',
    '// 短网络回调仍可被循环处理',
    '// 同步大计算堵的是循环本身，不是线程池',
    '```',
  ].join('\n'),

  'node-global-fetch': [
    'fetch 要绝对 URL；长时间等待用 AbortSignal：',
    '',
    '```js',
    'await fetch(url, { signal: AbortSignal.timeout(100) })',
    '// 无 signal：慢接口可让进程挂在 await',
    '// 相对地址无网页基址 → 必须绝对 URL',
    '```',
  ].join('\n'),

  'node-http-close': [
    'SIGTERM 先 server.close 排空，再关库退出：',
    '',
    '```js',
    'process.on("SIGTERM", () => {',
    '  server.close(async () => {',
    '    await db.end()',
    '    process.exit(0)',
    '  })',
    '})',
    '// 直接 exit → 客户端半截正文',
    '```',
  ].join('\n'),

  'jpa-session-nplus1': [
    '列表序列化关联会 N+1；一次取出或 DTO：',
    '',
    '```text',
    'GET /orders → 50 单',
    '序列化 items → 1 + 50 条 SQL',
    '→ join fetch / 按 id 批量明细 / 列表 DTO',
    '```',
  ].join('\n'),

  'jpa-entity-identity': [
    '同持久化上下文同一主键是同一实例：',
    '',
    '```java',
    'Order a = em.find(Order.class, 1L);',
    'Order b = em.find(Order.class, 1L);',
    'a == b; // true（托管）',
    'a.setNote("x"); // b 也看见',
    '// 事务外 new 两个同主键 → == 为 false',
    '```',
  ].join('\n'),

  'jpa-flush-transaction': [
    'persist 不等于对别的连接已提交：',
    '',
    '```text',
    '@Transactional 内 save 后',
    '另一连接 COUNT → 0',
    '方法正常结束提交 → 另一连接见 1',
    '抛错回滚 → 又没有',
    '```',
  ].join('\n'),

  'jpa-osiv-boundary': [
    '关掉 OSIV 后懒加载不能拖到视图：',
    '',
    '```text',
    'OSIV 关 → 模板碰 items → LazyInitializationException',
    '服务里 join fetch / DTO 取完再返回',
    'SQL 只出现在服务方法，不在渲染阶段',
    '```',
  ].join('\n'),

  'jpa-dirty-check': [
    '托管实体改字段，提交时自动 UPDATE：',
    '',
    '```java',
    '@Transactional',
    'void rename(Long id) {',
    '  Order o = repo.findById(id).orElseThrow();',
    '  o.setNote("x"); // 可不调 save',
    '} // 提交出现 UPDATE',
    '// 提交后再 set → 游离，表不更新',
    '```',
  ].join('\n'),

  'jpa-optimistic-lock': [
    '版本对不上则更新 0 行 / 抛乐观锁冲突：',
    '',
    '```text',
    'A、B 都读到 version=3',
    'A 先提交 → version=4',
    'B 仍带 3 更新 → 影响 0 或 OptimisticLockException',
    'B 盖不掉 A',
    '```',
  ].join('\n'),

  'jpa-page-vs-slice': [
    'Page 带 COUNT；Slice 多取一行判有无下一页：',
    '',
    '```java',
    'Page<Order> p = repo.findAll(PageRequest.of(0, 20));',
    '// 数据 SQL + COUNT',
    'Slice<Order> s = repo.findSlice(...);',
    '// 取 21 行判 hasNext，无总数；无限滚动用 Slice',
    '```',
  ].join('\n'),

  'jpa-entity-graph': [
    '按需 EntityGraph；列表勿全局 EAGER：',
    '',
    '```java',
    '@EntityGraph(attributePaths = "items")',
    'Optional<Order> findById(Long id);',
    '// findAll 不挂图 → 只有订单头',
    '// 列表改全局 EAGER → 每单多一次明细',
    '```',
  ].join('\n'),
  'topics-api-not-cookie-segments': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```js',
    '// Topics：少量粗粒度兴趣主题（示意）',
    'const topics = await document.browsingTopics?.()',
    '// ≠ 第三方 Cookie 精细人群包',
    '```'
  ].join('\n'),
  'shared-storage-not-third-party-cookie': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```js',
    '// Shared Storage：受限写入 + selectURL 等出口',
    'await window.sharedStorage.set("bucket", "a")',
    '// ≠ document.cookie 跨站开放读写',
    '```'
  ].join('\n'),
  'mysql-descending-index-not-sort-law': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```sql',
    'CREATE INDEX idx_created ON t (created_at DESC);',
    'EXPLAIN SELECT * FROM t ORDER BY created_at DESC LIMIT 20;',
    '-- 看是否 Using filesort，勿背定律',
    '```'
  ].join('\n'),
  'redis-acl-dryrun-not-enforce': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```redis',
    'ACL DRYRUN order GET order:1',
    '# 演练通过 ≠ 应用已用该用户连接',
    'AUTH order ***',
    '```'
  ].join('\n'),
  'binlog-not-change-event-bus': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    'binlog/CDC → 缓存失效、索引同步（行级）',
    'Outbox + MQ → OrderPaid 领域事件（契约）',
    '# 能订变更 ≠ 事件总线',
    '```'
  ].join('\n'),
  'threadlocal-not-distributed-context': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```java',
    'UserContext.set(uid); // 仅当前线程',
    '// 调下游：Header / token；MQ：消息属性',
    '// 线程池复用：finally remove',
    '```'
  ].join('\n'),
  'private-state-tokens-not-cookie': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    '发行方签发 Private State Token（有限信任）',
    '验证方赎回 → 得到“通过检查”类信号',
    '# ≠ 跨站登录 Cookie / 稳定用户 id',
    '```'
  ].join('\n'),
  'protected-audience-not-cookie-remarketing': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    '加入 interest group（设备侧）',
    '发布商页：浏览器侧竞价 → fencedframe 展示',
    '# ≠ 第三方 Cookie 再营销名单',
    '```'
  ].join('\n'),
  'mysql-multi-valued-index-not-json-db': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```sql',
    'CREATE INDEX idx_tags ON t ((CAST(tags AS CHAR(32) ARRAY)));',
    'EXPLAIN SELECT * FROM t WHERE \'red\' MEMBER OF (tags);',
    '-- 仍是 InnoDB 索引，不是文档库',
    '```'
  ].join('\n'),
  'redis-command-getkeys-not-acl': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```redis',
    'COMMAND GETKEYS DEL a b',
    'ACL DRYRUN app DEL a   # 授权另看 ACL',
    '```'
  ].join('\n'),
  'graceful-shutdown-not-zero-loss': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    '摘流 → 等在途（超时）→ 退出',
    '超时强杀仍可能截断；业务靠幂等/Outbox',
    '```'
  ].join('\n'),
  'connection-pool-not-thread-pool': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    '线程池 100 ≠ 连接池必须 100',
    '连接池按 DB max_connections 与持有时长定',
    '```'
  ].join('\n'),

  // batch18: polish Kafka/RocketMQ/Redis/CSP/EXPLAIN/MQ shared templates
  'mysql-spatial-index-not-full-gis': [
    "SPATIAL 索引粗筛几何谓词；精细行政区仍查 PostGIS：",
    '',
    "```sql",
    "CREATE SPATIAL INDEX idx_g ON shop (g);",
    "SELECT id FROM shop WHERE ST_Contains(area, point);",
    "-- EXPLAIN 看是否走 spatial；不规则边界 → PostGIS / 外置 GIS",
    "```",
  ].join('\n'),

  'mysql-index-count-five-not-law': [
    "索引条数看 EXPLAIN 与写放大，不是背「≤5」：",
    '',
    "```sql",
    "-- 已有 PK、(shop_id,created_at)、order_no UNIQUE",
    "CREATE INDEX idx_mobile ON orders (mobile);  -- 客服按手机查",
    "EXPLAIN SELECT * FROM orders WHERE mobile = ?;",
    "-- 六列组合却从不最左匹配 → 应删，不是「刚好 5」保留",
    "```",
  ].join('\n'),

  'mysql-implicit-convert-breaks-index': [
    "错类型比较挡索引；绑同类型字符串：",
    '',
    "```sql",
    "-- phone VARCHAR(20)",
    "EXPLAIN SELECT * FROM t WHERE phone = 13800000000;  -- 坏：隐式转换",
    "EXPLAIN SELECT * FROM t WHERE phone = '13800000000'; -- 好",
    "-- 对比 key 是否命中 phone 索引",
    "```",
  ].join('\n'),

  'mysql-where-func-blocks-index': [
    "函数包住索引列会挡范围；把常量侧改写或建生成列：",
    '',
    "```sql",
    "-- 坏：WHERE from_unixtime(day) >= '2017-01-15'",
    "WHERE day >= unix_timestamp('2017-01-15 00:00:00')",
    "-- 或 day_date DATE AS (...) STORED + INDEX(day_date)",
    "```",
  ].join('\n'),

  'mysql-generated-column-not-where-wrap': [
    "生成列是显式建模；WHERE 里 DATE() 包列仍可能扫表：",
    '',
    "```sql",
    "-- 坏：WHERE DATE(created_at) = '2026-10-09'",
    "WHERE created_at >= '2026-10-09' AND created_at < '2026-10-10'",
    "-- 或 created_day DATE AS (DATE(created_at)) STORED + INDEX",
    "```",
  ].join('\n'),

  'mysql-negative-predicate-not-always-scan': [
    "负向谓词看选择性；短列表 NOT IN 主键仍可能合理：",
    '',
    "```sql",
    "EXPLAIN SELECT * FROM t WHERE status != 'deleted';  -- 低基数列常扫",
    "EXPLAIN SELECT * FROM t WHERE id NOT IN (1,2,3);   -- 高基数短列表",
    "-- 用 EXPLAIN 对比改写前后，勿背「负向必全表」",
    "```",
  ].join('\n'),

  'mysql-leading-percent-like-heuristic': [
    "前缀 LIKE 可走 B+ 树；域名尾缀应倒排/冗余列：",
    '',
    "```sql",
    "EXPLAIN SELECT * FROM u WHERE name LIKE 'alex%';  -- 可范围",
    "EXPLAIN SELECT * FROM u WHERE email LIKE '%@gmail.com'; -- 前导 %",
    "-- 尾缀搜 → ES / email_domain 列索引",
    "```",
  ].join('\n'),

  'mysql-low-selectivity-index-heuristic': [
    "低区分度单列常无用；组合里靠后可以：",
    '',
    "```sql",
    "CREATE INDEX idx_gender ON u (gender);  -- 常无用",
    "CREATE INDEX idx_shop_st_ct ON orders (shop_id, status, created_at);",
    "-- 查询总带 shop_id 时 status 可靠后；用 count(distinct)/count(*) 估",
    "```",
  ].join('\n'),

  'mysql-composite-selectivity-order-heuristic': [
    "组合列序服从查询形态，不是「乱的列必须在前」：",
    '',
    "```sql",
    "WHERE shop_id = ? AND created_at > ?",
    "-- → INDEX (shop_id, created_at)",
    "-- 勿只因 created_at「更乱」就颠倒",
    "```",
  ].join('\n'),

  'mysql-extend-index-before-new': [
    "能扩展就扩展；等值另一路径仍要独立索引：",
    '',
    "```sql",
    "-- 已有 (shop_id)，常查 (shop_id, created_at) → 扩展",
    "ALTER TABLE orders DROP INDEX idx_shop, ADD INDEX idx_shop_ct (shop_id, created_at);",
    "-- 按 order_no 等值 → 单独 UNIQUE，勿塞进 shop 索引末尾",
    "```",
  ].join('\n'),

  'mysql-and-order-optimizer-reorders': [
    "AND 等值常可乱序；范围形态仍看最左：",
    '',
    "```sql",
    "INDEX (a, b)",
    "WHERE b = 1 AND a = 1;   -- 常仍能用 (a,b)",
    "WHERE a > 1 AND b = 1;   -- 对 (a,b) 利用不同于双等值",
    "```",
  ].join('\n'),

  'mysql-right-fuzzy-like-can-use-index': [
    "右模糊（前缀%）常可走索引；左模糊另方案：",
    '',
    "```sql",
    "EXPLAIN SELECT * FROM u WHERE mobile LIKE '138%';  -- 友好",
    "EXPLAIN SELECT * FROM u WHERE mobile LIKE '%138';  -- 换方案",
    "```",
  ].join('\n'),

  'kafka-model': [
    "主题分区 + 消费组各自位点；跨分区无全局顺序：",
    '',
    "```text",
    "topic orders → P0 P1 P2",
    "group A / group B 各维护位点；同条记录每组各处理一次",
    "把 A 位点拨回昨天 → 只有 A 重放，B 不动",
    "跨分区两条记录 → 无全局先后",
    "```",
  ].join('\n'),

  'kafka-producer-acks': [
    "acks=1 领导写本地即成功；acks=all 等 ISR：",
    '',
    "```text",
    "acks=1 → leader 本地落盘即 OK；follower 未复制前宕机可能丢",
    "acks=all → 等 ISR 确认；失败以错误返回，不是静默丢",
    "```",
  ].join('\n'),

  'kafka-isr-hwm': [
    "消费者只读到高水位；新追随者不在 ISR：",
    '',
    "```text",
    "ISR = leader + 两追随者；acks=all 等这三份",
    "刚加入尚未追上 → 不在 ISR，暂时没有最新记录正常",
    "水位之外切换后可能被截断",
    "```",
  ].join('\n'),

  'kafka-rebalance': [
    "再平衡暂停拉取；未提交位点会至少再消费一次：",
    '',
    "```text",
    "两人分四分区 → 第三人加入 → 某分区甲→丙",
    "丙从甲最后 commit 继续；甲已处理未 commit → 丙再做一遍",
    "处理过长被踢组 → 再次再平衡，拉取暂停",
    "```",
  ].join('\n'),

  'kafka-kraft-not-zk': [
    "现行 Kafka 用 KRaft 管元数据，不靠 ZooKeeper 活着：",
    '',
    "```text",
    "KRaft 格式化存储 → 启 controller + broker；无 ZK",
    "看 ISR 是否够副本，不是看 ZK 临时节点",
    "acks=all 只等 ISR，不要求每个 follower 都跟上",
    "```",
  ].join('\n'),

  'kafka-producer-does-batch': [
    "客户端攒批提吞吐；运维用发行包命令即可：",
    '',
    "```text",
    "batch.size ↑ + linger.ms → 同分区多条客户端攒批再送",
    "看消费组滞后：发行包 CLI，不必写 Scala",
    "广播：加另一个消费者组，不是换产品才叫批量",
    "```",
  ].join('\n'),

  'kafka-isr-lag-time-not-count': [
    "踢出 ISR 看落后时间，不是数差了四千条：",
    '',
    "```text",
    "落后 5000 条但两秒追上末端 → 仍可留在 ISR",
    "超过 replica.lag.time.ms 仍没消费到末端 → 移出 ISR",
    "超过时间根本不 fetch → 同样离开；acks=all 不再等它",
    "```",
  ].join('\n'),

  'kafka-partitions-increase-only': [
    "分区能加不能减；加完键的映射会变：",
    '',
    "```text",
    "3 分区 → 6 分区",
    "订单号哈希换组 → 同单后续消息可能进新分区",
    "与旧消息不在同一分区顺序里；规划宽度时要想到键迁移",
    "```",
  ].join('\n'),

  'redis-data-types': [
    "先选结构：Hash 改字段、ZSet 排行、List 流水：",
    '',
    "```redis",
    "HSET user:1 email a@x.com          # 只改邮箱，名字仍在",
    "ZADD rank 100 u1 200 u2",
    "ZREVRANGE rank 0 9 WITHSCORES      # 按分数",
    "LPUSH audit e1  /  LRANGE audit 0 0",
    "```",
  ].join('\n'),

  'redis-client-side-cache-invalidate': [
    "本地缓存省往返；改价要删 Redis + 通知各实例：",
    '',
    "```text",
    "读：本地 → miss → Redis",
    "写库成功 → DEL cache:sku → tracking/广播丢本地副本",
    "只删 Redis、不通知 → 其它实例本地仍可能旧值到 TTL",
    "```",
  ].join('\n'),

  'redis-big-hot-key': [
    "大 key 拖单次；热 key 打满一个分片：",
    '',
    "```text",
    "时间线 LIST 8MB → 大键；拆小后单次字节下降",
    "秒杀计数器 QPS 十万、值很小 → 热键打满一分片 CPU",
    "只加机器而键仍落同槽 → 热键 CPU 不散",
    "```",
  ].join('\n'),

  'redis-eviction-policy-menu': [
    "淘汰不止旧六名；无 TTL 键不参与 volatile-*：",
    '',
    "```redis",
    "CONFIG SET maxmemory-policy allkeys-lru",
    "# 配置键不能丢 → 别指望 volatile-lru 腾无 TTL 键",
    "# 拼写：noeviction（不是 no-enviction）",
    "```",
  ].join('\n'),

  'redis-fifo-not-maxmemory': [
    "官方策略没有 FIFO；无 TTL 时 volatile-lru 腾不出空间：",
    '',
    "```redis",
    "CONFIG SET maxmemory-policy allkeys-lfu",
    "# 名单无 FIFO",
    "CONFIG SET maxmemory-policy volatile-lru",
    "# 全键无过期 → 像 noeviction，写入失败",
    "```",
  ].join('\n'),

  'redis-string-max-512mb': [
    "STRING 上限 512MB；淘汰名单要含 LFU：",
    '',
    "```redis",
    "SET blob:<id> <bytes>   # 远小于 512MB；勿按 1GB 预留",
    "# 分片：Cluster 哈希槽",
    "# 淘汰：含 allkeys-lfu 等，勿只背旧六项",
    "```",
  ].join('\n'),

  'redis-list-quicklist-listpack': [
    "短 List 多段 listpack；不是一根双向链表：",
    '',
    "```redis",
    "LRANGE shortlist 0 -1",
    "# 内部：几段 listpack（quicklist）",
    "# 超长 List 分段，不是从头链表走到尾",
    "```",
  ].join('\n'),

  'mq-why-decouple': [
    "消息先解耦时间：下游宕机下单仍可成功：",
    '',
    "```text",
    "下单 OK → 发 OrderCreated",
    "发货宕机 → 消息留通道；恢复后再消费",
    "同步调用发货 → 下单失败/超时",
    "若必须当场拿发货单号 → 不能改事后消费",
    "```",
  ].join('\n'),

  'mq-delivery-semantics': [
    "投递三种说法；业务仍要幂等：",
    '',
    "```text",
    "生产者事务/幂等 → 分区较少重复写",
    "消费写积分后、提交位点前崩溃 → 至少再处理一次",
    "积分表无订单号唯一 → 多一行",
    "确认后再崩 → 不应再写同一笔积分",
    "```",
  ].join('\n'),

  'mq-compare-matrix': [
    "仓库已经在运维 Kafka。表只用来核对它做不到什么：",
    '',
    "```text",
    "Kafka 做得到：按位点重放流水。新流水继续进它。",
    "发邮件、到点关单：用现有消费者和订单表上的到期时间。不为此新装 RabbitMQ 或 RocketMQ。",
    "它做不到：已有 JMS 客户端只能认 javax.jms。这一段才评估 ActiveMQ 或适配层。",
    "```",
  ].join('\n'),

  'mq-pick-workload': [
    "仓库已经在运维 Kafka：",
    '',
    "```text",
    "行为流水：继续进 Kafka。不另起 Pulsar。",
    "发邮件：现有消费者处理，用业务键挡住重复。不新装 RabbitMQ。",
    "30 分钟关单：订单表加到期时间，定时任务扫描。不新装 RocketMQ。",
    "第二套：这次没有「现有集群和任务表都做不到」的那一条。不加。",
    "```",
  ].join('\n'),

  'mq-backpressure-producer': [
    "分区/队列宽度封顶；生产端也要限速：",
    '',
    "```text",
    "12 分区 + 30 消费者 → 仍只有 12 在干活",
    "非关键埋点限生产速率 → 消费 > 生产，积压年龄降",
    "下游库跟不上 → 加消费者只是把压力打到库",
    "```",
  ].join('\n'),

  'mq-dlq-backlog': [
    "必失败进死信；主队列不被堵死：",
    '',
    "```text",
    "1 条必失败 + 9 条成功",
    "必失败重试几次 → DLQ；主队列吞完 9 条",
    "死信无人处理 → 年龄仍涨，超阈值告警",
    "重试期间业务键幂等仍有效",
    "```",
  ].join('\n'),

  'mq-backlog-expand-queues': [
    "堆积加消费者受队列/分区数上限：",
    '',
    "```text",
    "RocketMQ 8 队列、堆积 3 千万；消费者 8→64 → 只有 8 干活",
    "临时主题 64 队列转发 → 64 消费者都能领",
    "追上后缩回；Kafka 同理受分区数限制",
    "```",
  ].join('\n'),

  'cors-preflight-max-age': [
    "Max-Age 只缓存预检；实际响应仍要带允许 Origin：",
    '',
    "```http",
    "Access-Control-Allow-Methods: PUT",
    "Access-Control-Allow-Headers: X-Request-Id",
    "Access-Control-Max-Age: 600",
    "# 十分钟内可跳过 OPTIONS；PUT 响应仍须允许 Origin",
    "```",
  ].join('\n'),

  'csp-script-src': [
    "CSP 限制脚本来源；评论 HTML 仍要转义：",
    '',
    "```http",
    "Content-Security-Policy: script-src 'self'",
    "# 外源 <script src=https://evil/x.js> → 控制台拒绝、不执行",
    "# 评论尖括号 → textContent/转义，不是靠 CSP 代替",
    "```",
  ].join('\n'),

  'csp-report-only-not-enforce': [
    "Report-Only 只上报；改成强制 CSP 才拦住：",
    '',
    "```http",
    "Content-Security-Policy-Report-Only: script-src 'self'",
    "# evil/x.js 仍执行，可能出现违例报告",
    "Content-Security-Policy: script-src 'self'",
    "# 脚本被拒",
    "```",
  ].join('\n'),

  'trusted-types-sink-guard': [
    "Trusted Types 卡住危险汇点；默认用 textContent：",
    '',
    "```js",
    "// require-trusted-types-for 'script'",
    "el.innerHTML = userInput  // TypeError",
    "el.textContent = userInput",
    "policy.createHTML(sanitized)  // 富文本经净化库",
    "```",
  ].join('\n'),

  'reporting-nel-not-csp-enforce': [
    "Reporting / NEL 是遥测，不是强制 CSP：",
    '',
    "```http",
    "Reporting-Endpoints: csp-endpoint=\"https://reports.example/csp\"",
    "Content-Security-Policy-Report-Only: script-src 'self'",
    "# 外源脚本仍执行；NEL 记 CDN TLS 失败",
    "# 页面逻辑错误仍看应用日志",
    "```",
  ].join('\n'),

  'corp-embed-gate-not-cors': [
    "CORP 管嵌入；fetch 读 JSON 仍看 CORS：",
    '',
    "```http",
    "Cross-Origin-Resource-Policy: cross-origin",
    "# require-corp 页才能嵌字体等资源",
    "# 无 CORP 且不可 CORS 用 → COEP 页加载失败",
    "# fetch JSON 放行读体靠 CORS，不靠 CORP",
    "```",
  ].join('\n'),

  'mysql-json-not-document-db': [
    "JSON 仍是关系行上一列；JOIN/事务照旧：",
    '',
    "```sql",
    "ALTER TABLE user ADD profile JSON;",
    "SELECT * FROM user WHERE profile->>'$.city' = 'SH';",
    "-- 用户行仍与订单 JOIN/事务；≠ 无固定表的文档集合",
    "```",
  ].join('\n'),

  'mysql-view-is-stored-query': [
    "VIEW 是存起来的查询，默认不物化：",
    '',
    "```sql",
    "CREATE VIEW v_paid AS SELECT * FROM orders WHERE status='paid';",
    "INSERT INTO orders (...) VALUES (..., 'paid', ...);",
    "SELECT * FROM v_paid;  -- 立刻可见，无「刷新视图」",
    "-- 昨日冻结报表 → 报表表/导出，不是普通 VIEW",
    "```",
  ].join('\n'),

  'mysql-procedure-not-auto-txn': [
    "存储过程不会自动包一整段事务：",
    '',
    "```sql",
    "-- 过程内：扣库存 → 抛错 → 写订单",
    "-- autocommit=1 且无显式事务 → 库存已扣、订单没有",
    "START TRANSACTION; ...; ROLLBACK;  -- 过程或调用方显式开",
    "```",
  ].join('\n'),

  'mysql-trigger-side-effect-hidden': [
    "触发器是隐蔽副作用；异常要查 SHOW TRIGGERS：",
    '',
    "```sql",
    "-- INSERT orders 触发器里 UPDATE stock",
    "-- 应用日志只有 insertOrder",
    "SHOW TRIGGERS LIKE 'orders';",
    "-- 禁用触发器时：库存扣减写在同一应用事务",
    "```",
  ].join('\n'),

  'mysql-cte-named-subquery': [
    "WITH 是命名结果；RECURSIVE 要限深度：",
    '',
    "```sql",
    "WITH paid AS (SELECT * FROM orders WHERE status='paid')",
    "SELECT * FROM paid JOIN ...;",
    "-- 与直接子查询语义相近，不是自动物化加速",
    "WITH RECURSIVE tree AS (...)  -- 限制深度/边条件",
    "```",
  ].join('\n'),

  'mysql-temp-table-vs-cte': [
    "临时表跨语句可见；CTE 只活在这一条语句：",
    '',
    "```sql",
    "CREATE TEMPORARY TABLE t AS SELECT ...;",
    "SELECT * FROM t;  -- 仍可见",
    "WITH t AS (SELECT ...) SELECT * FROM t;",
    "-- 结束后 SELECT * FROM t → 不存在（除非另有基表）",
    "```",
  ].join('\n'),

  'redis-legacy-vm-limits': [
    "无 VM 换页；STRING 上限 512MB，大文件放对象存储：",
    '',
    "```redis",
    "SET session:u1 \"{...}\"   # KB 级",
    "# 大文件 → 对象存储/DB，不进 Redis",
    "# 勿指望冷数据换到 Redis 自有 VM 文件",
    "# 命令原子 ≠ RDBMS 失败回滚事务",
    "```",
  ].join('\n'),

  'redis-functions-not-just-eval': [
    "Functions 注册一次；对照每次 EVAL 贴长脚本：",
    '',
    "```redis",
    "FUNCTION LOAD \"#!lua name=stock\\n...\"",
    "FCALL stock_decr 1 key:sku",
    "# 重启后若已持久，不必每次塞整段源码",
    "EVAL \"…很长…\" 1 key   # 旧路径",
    "```",
  ].join('\n'),

  'redis-acl-not-just-requirepass': [
    "ACL 按用户裁命令与键；不只一个 requirepass：",
    '',
    "```redis",
    "ACL SETUSER order on >*** ~order:* +@read +@write -@dangerous",
    "# 订单服务用 order；运维另用管理用户",
    "# 仅 requirepass → 同一密码可 FLUSHALL",
    "```",
  ].join('\n'),

  'redis-keyspace-notify-not-queue': [
    "键空间通知是 Pub/Sub；可靠到期用 ZSet/Stream：",
    '',
    "```redis",
    "SET order:9 1 EX 60",
    "PSUBSCRIBE __keyevent@0__:expired",
    "# 消费者宕机期间过期 → 不补发",
    "# 到期：ZADD due <ts> order:9 或 Stream + 组 + XACK",
    "```",
  ].join('\n'),

  'redis-lock-getset-wall-clock': [
    "锁过期看 Redis TTL；勿用本机墙钟 GETSET：",
    '',
    "```redis",
    "# 坏：value=now+30s，B 时钟快 → GETSET 误抢",
    "SET lock:order:9 <uuid> NX EX 30",
    "# 释放：脚本确认 uuid 再 DEL",
    "```",
  ].join('\n'),

  'rocketmq-model': [
    "事务消息、延迟关单、同单进同队列：",
    '',
    "```text",
    "事务消息：本地库提交后消息才可见",
    "延迟消息：30 分钟未支付 → 到点关单检查",
    "创建/支付/关闭按订单号固定队列 → 顺序一致",
    "三种都可能重复 → 下游业务键幂等",
    "```",
  ].join('\n'),

  'rocketmq-queue-order': [
    "顺序只存在于同一队列；按订单号固定：",
    '',
    "```text",
    "队列数=4；轮询发送创建/支付/关闭 → 可能不同队列",
    "按订单号固定队列 → 三条同队列、消费顺序=发送顺序",
    "统计消费组单独读，不推进交易组位点",
    "```",
  ].join('\n'),

  'rocketmq-flush-ha': [
    "同步刷盘+同步复制才扛主立刻断电：",
    '',
    "```text",
    "支付通知：同步刷盘 + 同步复制 → 主断电从仍可读",
    "点击日志：异步刷盘 → 未刷下可能不可读",
    "从断电、主在：同步复制发送失败/等待；异步成功仅主侧",
    "```",
  ].join('\n'),

  'rocketmq-store-not-ram-buffer': [
    "消息落 CommitLog；不是堆里无限 Buffer：",
    '',
    "```text",
    "保留 3 天 → 磁盘 CommitLog",
    "失败未 ack → 重试主题再来",
    "关单：固定 delay level，非任意毫秒",
    "磁盘满 → 发送挡住，不是继续堆内存",
    "```",
  ].join('\n'),

  'rocketmq-send-oneway-may-drop': [
    "oneway 可不达；同步成功仍可能未刷盘：",
    '',
    "```text",
    "访问日志 sendOneway → 立刻返回，Broker 未答应可丢",
    "积分：异步发送，成功回调才标已发送",
    "订单：同步 send OK + 异步刷盘 → 断电仍可能不在盘上",
    "```",
  ].join('\n'),
  'fe-pick-decision-order': [
    '帮助中心《如何退款》。仓库已经是 Vue，没有人维护 React：',
    '',
    '```text',
    '仓库和团队：继续 Vue。不因为问卷里 React 用过的人更多就换。',
    '谁打开：浏览器。不做小程序，不做 App。',
    '源代码：要有标题「如何退款」。用 Nuxt，不用 Next。',
    '路由和数据：useAsyncData。登录态用 Pinia。不装 react-router。',
    '```',
  ].join('\n'),
  'captcha-challenge-not-authn': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    '验证码通过 ≠ 已认证 ≠ 已授权',
    '删除订单仍要验「是不是所有者」',
    '```'
  ].join('\n'),
  'bot-mitigation-not-only-widget': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    '挂件挑战 token：短时、单次、交给服务端校验',
    '≠ localStorage 长期登录态',
    '防刷还要限流 / WAF / 风险分',
    '```'
  ].join('\n'),
  'mysql-skip-locked-not-queue': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```sql',
    'SELECT id FROM jobs WHERE status=\'ready\' LIMIT 1',
    '  FOR UPDATE SKIP LOCKED;',
    '-- 并发领取行；不是 Kafka/ACK 队列',
    '```'
  ].join('\n'),
  'redis-client-no-touch-not-expire-off': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```redis',
    'CLIENT NO-TOUCH ON',
    'GET key   # 不刷新空闲/热度',
    'TTL key   # 过期仍在倒计时',
    '```'
  ].join('\n'),
  'idempotency-key-not-only-uuid': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```http',
    'Idempotency-Key: checkout:user:req:978',
    '# 服务端 UNIQUE/占位去重；重试必须同一键',
    '```'
  ].join('\n'),
  'snowflake-clock-rollback': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    'if (now < lastTs) wait or refuse',
    '# 回拨可能撞号；改位段不能代替检测',
    '```'
  ].join('\n'),
  'related-website-sets-not-cookie-restore': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```js',
    '// 同 RWS 内嵌入方仍要申请，不会自动合并 Cookie',
    'await document.requestStorageAccess()',
    '// ≠ brandA Cookie 自动出现在 brandB 请求里',
    '```'
  ].join('\n'),
  'bounce-tracking-mitigation-not-session-bug': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    '短访 bounce 域种状态 → 缓解可清理',
    '≠ 浏览器随机 session bug',
    '一等登录落在用户停留的站点',
    '```'
  ].join('\n'),
  'mysql-clone-not-backup': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```sql',
    'CLONE INSTANCE FROM \'user\'@\'donor:3306\';',
    '-- 供给 InnoDB 副本；≠ 可回档备份',
    '-- 不带 binlog / 完整配置；日常备份另做',
    '```'
  ].join('\n'),
  'redis-repl-link-down-not-fatal': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    'INFO replication → master_link_status:down',
    '# 断连/重同步窗口；进程常仍在',
    '# ≠ FATAL 配置错误退出',
    '```'
  ].join('\n'),
  'ua-client-hints-need-accept-ch': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```http',
    'Accept-CH: Sec-CH-UA-Platform-Version',
    '# 高熵要声明；浏览器仍可拒绝',
    '# ≠ 每次必带完整 User-Agent 细节',
    '```'
  ].join('\n'),
  'reduced-ua-not-stable-device-id': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```text',
    'hash(userAgent) 当设备主键 → 削减后易撞车',
    '身份：服务端会话 / 登录 Cookie',
    '细节：可选 Client Hints（可缺）',
    '```'
  ].join('\n'),
  'mysql-resource-group-not-os-cgroup': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```sql',
    'SET RESOURCE GROUP batch_low;',
    'SELECT /*+ RESOURCE_GROUP(batch_low) */ ...;',
    '-- mysqld 内线程 CPU/优先级；≠ 容器 cgroup',
    '```'
  ].join('\n'),
  'redis-cluster-slots-not-app-shard-key': [
    '对照本课断言，先写出最小可观察片段：',
    '',
    '```redis',
    'CLUSTER SLOTS          # 槽→节点拓扑',
    'CLUSTER KEYSLOT user:{42}:cart',
    '# 同槽靠 hash tag；≠ 业务分片方案本身',
    '```'
  ].join('\n'),
};

for (const lesson of window.LESSONS) {
  const next = EXAMPLE_CODE_BLOCKS[lesson.id];
  if (next) lesson.example = next;
}
