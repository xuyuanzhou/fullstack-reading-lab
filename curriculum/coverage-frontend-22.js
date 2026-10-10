/* Frontend 22: the ES6 column under 语言基础. */
const COVERAGE_FRONTEND_22 = [
  {
    track:'frontend', group:'语言基础', id:'es6-const-binding',
    title:'const 锁住的是绑定，对象里的字段仍能改',
    prompt:'为什么 const 声明的订单改了金额，运行却没有报错？',
    promptAnswer:'const 管的是绑定不能换目标，不冻结对象字段。要字段不可改用 freeze 或只读类型。',
    core:'const 要求声明时就赋值，之后不能把这个名字再指向别的值。锁住的是绑定，不是值内部的字段。const order = { amount: 10 } 之后，order.amount = 20 合法，order = {} 会抛 TypeError。要挡住字段修改，得另外用 Object.freeze，而且它只冻当前这一层。块级作用域和声明前不能读，见 `js-scope-tdz`。箭头函数、Promise 和模块各自有课：`js-arrow-has-no-prototype`、`promise-chain`、`esm`。',
    why:'把 const 理解成“这份数据不能变”，就会在对象字段被改掉之后去查框架。报错只出现在重新赋值那一行，字段赋值没有报错。',
    example:'const order = { amount: 10 }; order.amount = 20; 对象仍是同一个，amount 变成 20。下一行 order = { amount: 30 } 抛 TypeError。Object.freeze(order) 之后再写 amount，严格模式下抛错，非严格模式下静默失败，字段保持 20。',
    task:'用 const 声明一个带 amount 的对象。先改 amount，再把名字重新指到新对象。最后 freeze 之后再改一次字段，记下哪一步抛错。',
    answer:'改 amount 成功，绑定仍指向原来的对象。重新赋值抛 TypeError。freeze 之后字段不再被改掉。const 管的是这个名字还能不能换目标。',
    keywords:'const 绑定 Object.freeze 重新赋值',
    points:['const 不能重新赋值，声明时必须有初值','对象字段仍可通过原绑定修改','Object.freeze 只冻结当前这一层'],
    deep:[
      {title:'每一轮循环都是新绑定',body:'for (const item of list) 里，每一轮的 item 都是新绑定，不能在循环体里给 item 重新赋值，但可以改 item 指向的对象字段。用 var 时闭包会共享同一个绑定，用 const 或 let 时每一轮各看各的值。'},
      {title:'怎样自己验证',body:'先改字段，确认没有异常且读到新数字。再整份重新赋值，确认 TypeError 指向赋值那一行。freeze 后再改字段，确认值停在冻结前。'}
    ],
    refs:[['MDN：const','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const'],['MDN：Object.freeze','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze']]
  },
  {
    track:'frontend', group:'语言基础', id:'es6-destructure-copies',
    title:'解构取出的是当时的值，缺省才用默认值',
    prompt:'为什么从对象里解构出 price 之后，再改对象，变量却不变？',
    promptAnswer:'解构出的基本类型是拷贝；对象/数组取出的是同一引用。默认值只替换 undefined。',
    core:'解构按名字或位置声明新绑定，放进去的是当时读到的值。数字和字符串放的是值本身，之后改原对象的这个字段，新绑定不变。放进去的若是对象，两边拿的是同一引用，改这个引用上的字段两边都看得见。默认值只在读到的是 undefined 时使用，包括属性缺失和显式传入 undefined。null、0 和空字符串会原样留下。重命名写成 { price: cost }，冒号左边是来源，右边是新名字。对 null 做解构会抛 TypeError。',
    why:'改了 order.price 却看见页面上的数字不动，就会去查渲染。变量里留着解构那一刻的 10，对象上已经是 20。反过来把 null 当成“没有”，默认值不生效，后面再读属性就抛错。',
    example:'const order = { price: 10, item: { sku: "A1" } }; const { price = 1, item } = order; order.price = 20; price 仍是 10。item.sku = "B2" 之后，order.item.sku 也是 "B2"。{ price = 1 } 对缺失字段得到 1，对 price: null 得到 null，对 price: 0 得到 0。',
    task:'解构出 price 和 item。先改原对象的 price，再改 item.sku。另用默认值分别接住缺失、undefined、null 和 0，记下四个结果。',
    answer:'price 停在解构时的数字。item.sku 两边一起变，因为取出的是同一个对象。默认值只替换 undefined：缺失和 undefined 用默认值，null 和 0 保留原值。对 null 做解构会抛错。',
    keywords:'解构 默认值 undefined null 重命名',
    points:['解构放进新绑定的是当时读到的值','对象字段取出的是引用，原始值不会跟着变','默认值只在结果为 undefined 时生效'],
    deep:[
      {title:'重命名和嵌套',body:'{ price: cost } 不会声明 price。嵌套写成 { item: { sku } }，中间的 item 没有被声明。某一层是 null，解构在这一层抛 TypeError，默认值要写在会变成 undefined 的那一层上。'},
      {title:'怎样自己验证',body:'解构后改数字字段，局部变量应不变。改取出的对象字段，原对象应跟着变。用四个输入试默认值：缺字段、undefined、null、0。只有前两个用上默认值。'}
    ],
    refs:[['MDN：解构赋值','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment'],['MDN：undefined','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined']]
  },
  {
    track:'frontend', group:'语言基础', id:'es6-rest-spread-position',
    title:'剩余参数收在末尾，展开用在调用和字面量里',
    prompt:'为什么同样三个点，有时得到一个数组，有时却把数组拆开？',
    promptAnswer:'剩余参数收成数组，展开把数组拆开。剩余参数必须在末尾。',
    core:'三个点在形参或解构的末尾是剩余：把还没被点名的项收进一个新数组，形参里只能有一个，而且必须放在最后。三个点出现在调用的参数位置，或数组、对象字面量里，是展开：把可迭代对象的项逐个放进去。对象展开复制的是自身可枚举属性，后写的同名键覆盖先写的，只复制一层。剩余参数是真正的数组，有 map；旧的 arguments 没有数组方法。展开数组得到的是浅拷贝，元素仍是原来的引用。',
    why:'把参数里的 ...items 再展开一次，函数收到的是多条参数而不是一个数组，length 对不上。把展开当成深拷贝，改了元素对象的字段，原数组也变了。',
    example:'function total(tax, ...prices) { return prices.map(n => n + tax); }。total(1, 10, 20) 里 prices 是 [10, 20]。调用 total(1, ...[10, 20]) 结果相同。const copy = [...items] 后改 copy[0].sku，items[0].sku 一起变。{ ...a, id: 2 } 里 id 以 2 为准。',
    task:'写一个剩余参数放在末尾的函数，分别用逐个参数和展开数组调用。再展开成新数组后修改元素对象的字段，看原数组变不变。最后把剩余参数挪到形参中间，看语法是否通过。',
    answer:'两种调用得到同一个数组，map 可用。新数组里的对象字段改动会反映到原数组。剩余参数不在末尾时语法错误。对象展开里后写的键覆盖先写的键。',
    keywords:'剩余参数 展开 浅拷贝 arguments',
    points:['剩余参数必须放在形参或解构的末尾','展开发生在调用和字面量里','对象和数组的展开都只复制一层'],
    deep:[
      {title:'位置决定是收还是放',body:'function f(...xs) 和 const [head, ...tail] = list 都是在收。f(...list) 和 [0, ...list] 都是在放。对象上的剩余 const { id, ...rest } = order 得到的 rest 是新对象，不含 id。'},
      {title:'怎样自己验证',body:'对剩余参数调用 map，应成功。把 ... 挪到第一个形参以外的更前位置，解析应失败。展开后修改元素对象，原数组同一字段应变成新值。'}
    ],
    refs:[['MDN：剩余参数','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters'],['MDN：展开语法','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax']]
  },
  {
    track:'frontend', group:'语言基础', id:'es6-default-param-call-time',
    title:'默认参数在调用时求值，前面的形参后面可以用',
    prompt:'为什么默认参数写成一个数组，每次没传时都是新的？',
    promptAnswer:'默认参数在调用时求值。省略或传 undefined 会再造一份，null 不会触发默认。',
    core:'默认参数的表达式在这次调用缺少该参数、或传入值是 undefined 时才执行，不是在定义函数时执行一次。所以 function push(item, bucket = []) 每次省略 bucket 都会得到新数组，不会像定义期就造好的那一个数组被各次调用共享。传入 null 不会触发默认值，bucket 就是 null。后面的形参可以读前面的，function area(w, h = w) 合法；前面的形参不能读后面的，那样会落在暂时性死区，见 `js-scope-tdz`。',
    why:'以为默认数组是函数创建时的那一个，就会在两次调用之间看见残留元素。其实每次省略参数都会再执行一遍表达式。传入 null 时默认值不跑，接着 push 就抛错。',
    example:'function push(item, bucket = []) { bucket.push(item); return bucket; }。push("a") 得到 ["a"]，再 push("b") 得到 ["b"]，不是 ["a","b"]。push("c", undefined) 同样新建数组。push("d", null) 在 null.push 处抛 TypeError。area(3) 得到宽 3、高 3。',
    task:'写一个默认参数为新数组的函数，省略参数连续调用两次，看第一次放进的元素还在不在。再分别传入 undefined 和 null。最后让后面的形参使用前面的形参。',
    answer:'两次省略参数得到两个数组，第二次没有第一次的元素。undefined 会再求值一次默认表达式。null 留下 null，不会替换成新数组。后面的形参可以读到前面已经传入的值。',
    keywords:'默认参数 undefined 调用时求值 TDZ',
    points:['默认表达式在每次需要时重新求值','只有 undefined 会触发默认值','后面的形参可以读取前面的形参'],
    deep:[
      {title:'求值发生在调用，不发生在定义',body:'函数对象创建时并不跑这些表达式。某一次调用若自己传了值，这次的默认表达式被跳过。下一次又省略，表达式再跑，闭包里的计数也会再加一。'},
      {title:'怎样自己验证',body:'默认参数里放一个会自增的计数，连续省略调用两次，计数应变成 2，两次数组应互不影响。传入 0 或 null 时计数不应增加。让第一个形参的默认值去读第二个形参，应在调用时抛错。'}
    ],
    refs:[['MDN：默认参数','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters'],['MDN：let 与暂时性死区','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let']]
  },
  {
    track:'frontend', group:'语言基础', id:'es6-template-expression',
    title:'模板字符串会把表达式收成字符串',
    prompt:'为什么反引号里放一个对象，页面上出现的是 [object Object]？',
    promptAnswer:'模板会调用 toString。对象常变成 [object Object]，应插入具体字段。',
    core:'普通模板字符串先求值 ${} 里的表达式，再按 ToString 收成字符串，然后和两边的文本拼成一个字符串。普通对象走 Object.prototype.toString，结果是 [object Object]。数组会按逗号拼成 "1,2"。null 变成 "null"，undefined 变成 "undefined"，都不会留成空。要给人看的字段得自己取出来，例如 ${order.id}。标签模板是另一条路：标签函数收到各段原文和未拼接的值，不会先收成一个字符串。',
    why:'把订单对象直接塞进模板，按钮上写着 [object Object]，接口其实是好的。把 undefined 拼进去会得到单词 undefined，而不是空白。',
    example:'const order = { id: "A1" }; `${order}` 是 "[object Object]"。`${order.id}` 是 "A1"。`${[1, 2]}` 是 "1,2"。`${null}` 是 "null"。标签函数 tag`${order}` 的第二个参数是订单对象本身，不是那段 [object Object]。',
    task:'用同一个对象分别插进普通模板和标签模板。再插 null、undefined 和一个两元素数组，记下拼出来的字符串。',
    answer:'普通模板里对象变成 [object Object]，数组变成用逗号连接的文本，null 和 undefined 变成同名单词。标签函数拿到的是原始值和各段文本，没有先拼接。要显示订单号，应插入 order.id。',
    keywords:'模板字符串 ToString 标签模板',
    points:['普通模板把插值收成字符串再拼接','对象、null、undefined 各有固定的字符串结果','标签模板拿到原文片段和未拼接的值'],
    deep:[
      {title:'插入 HTML 之前要转义',body:'模板只负责拼接字符串，不会把 < 变成实体。把用户输入放进 innerHTML 之前，先做 HTML 转义，或改用 textContent。标签模板可以自己决定怎么拼，也不会自动转义。'},
      {title:'怎样自己验证',body:'打印 `${order}`、`${order.id}`、`${null}`、`${undefined}`、`${[1, 2]}`。再写一个标签函数，确认参数里是对象而不是 [object Object]。'}
    ],
    refs:[['MDN：模板字符串','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals'],['MDN：Object.prototype.toString','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString']]
  },
  {
    track:'frontend', group:'语言基础', id:'es6-map-set-keys',
    title:'Map 的键保持原值，对象的键会被收成字符串',
    prompt:'为什么用两个不同的对象当字典的键，后面的值盖掉了前面的？',
    promptAnswer:'普通对象键会变成字符串，不同对象可能撞键。Map 用引用当键互不覆盖。',
    core:'普通对象的键只有字符串和 Symbol。数字、对象这些值被放进键时会先收成字符串，所以 1 和 "1" 是同一个键，两个不同对象都会变成 "[object Object]"，后写的值盖掉前一个。Map 用 SameValueZero 比较键：对象按引用区分，NaN 等于 NaN，+0 等于 -0，插入顺序会被保留。Set 用同一套相等来去重。JSON.stringify 遇到 Map 或 Set 会得到 "{}"，因为它们没有可枚举的自有数据属性。键只为了避免和字符串撞车时用 Map；键必须能被 JSON 保存时，先把键定成字符串。',
    why:'用对象当普通字典的键，两个订单共享同一个槽，查出来的数量是后写入的那笔。换成 Map 后两笔都在，因为键仍是原来的对象。',
    example:'const bag = {}; const a = {}; const b = {}; bag[a] = 1; bag[b] = 2; Object.keys(bag) 只有 "[object Object]"，bag[a] 是 2。const map = new Map(); map.set(a, 1); map.set(b, 2); map.get(a) 是 1。map.set(NaN, "x"); map.get(NaN) 是 "x"。new Set([1, 1, NaN, NaN]).size 是 2。',
    task:'用两个不同对象先后写入普通对象和 Map。再往 Map 里用 NaN 写两次。用 Set 放入两个 1 和两个 NaN，记下 size。',
    answer:'普通对象只剩一个字符串键，值为后写的 2。Map 里两个对象各保留自己的值。NaN 作为 Map 的键能再取回。Set 的 size 是 2，因为 1 只留一个，NaN 也只留一个。',
    keywords:'Map Set SameValueZero 对象键',
    points:['普通对象的键会被收成字符串或 Symbol','Map 按引用保存对象键，并保留插入顺序','Set 用 SameValueZero 去重，NaN 只留一个'],
    deep:[
      {title:'序列化留不住 Map',body:'JSON.stringify(new Map([["a", 1]])) 得到 "{}"，因为 Map 没有可枚举的自有数据属性。要交给接口，先 Array.from(map) 或写成普通对象。键是对象时，刷新页面后引用对不上，数组形式也留不住原来的键。'},
      {title:'怎样自己验证',body:'对两个对象键读 Object.keys，应看到一个 "[object Object]"。同一对键放进 Map，size 应为 2，先写入的值仍能 get 到。JSON.stringify 这个 Map，结果应是 "{}"。'}
    ],
    refs:[['MDN：Map','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map'],['MDN：Set','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set']]
  },
  {
    track:'frontend', group:'语言基础', id:'es6-for-of-iterable',
    title:'for...of 走可迭代协议，for...in 走可枚举的键',
    prompt:'为什么 for...in 遍历数组会得到下标，还会带上原型上的名字？',
    promptAnswer:'for...of 走迭代协议拿值；for...in 枚举键且含可枚举原型名。',
    core:'for...of 向值索取迭代器，按 next 的 value 逐个给出元素。数组给出元素，Map 给出 [键, 值]，字符串给出一个个码元。for...in 枚举的是可枚举的字符串键，包括原型链上的，数组上因此得到 "0"、"1" 这种下标字符串。普通对象没有默认迭代器，对它 for...of 会抛 TypeError。要列出对象自己的键，用 Object.keys 或 Object.entries。迭代器协议本身见 `js-iteration-protocol`。',
    why:'用 for...in 累加数组，下标字符串被加进总和，或者原型上多出来的枚举属性也进了循环。换成 for...of 之后加的才是元素。',
    example:'const list = [10, 20]; for (const n of list) 依次得到 10 和 20。for (const key in list) 依次得到 "0" 和 "1"。给 Array.prototype 加一个可枚举字段 extra 后，for...in 还会走到 "extra"，for...of 仍然只有 10 和 20。for (const x of { a: 1 }) 抛 TypeError。',
    task:'对同一个数组分别用 for...of 和 for...in，记下绑定到的是元素还是下标。给 Array.prototype 加一个可枚举属性后再跑两遍。最后对普通对象使用 for...of。',
    answer:'for...of 得到 10 和 20。for...in 得到下标字符串，加上原型上的可枚举名字。普通对象的 for...of 抛 TypeError。对象自己的键用 Object.keys。',
    keywords:'for...of for...in 迭代器 Object.keys',
    points:['for...of 消费迭代器给出的值','for...in 枚举字符串键，含原型链','普通对象不能 for...of，除非自己实现迭代器'],
    deep:[
      {title:'每一轮的 const 是新绑定',body:'for (const n of list) 里闭包抓住的是这一轮的 n。改成 var，循环结束后各个闭包读到的是同一个最终值。这和 const 锁住绑定是同一件事，见 `es6-const-binding`。'},
      {title:'怎样自己验证',body:'数组里放两个数字，两种循环分别打印。再给 Array.prototype 加可枚举属性，只有 for...in 应多打出这个名字。对 { a: 1 } 使用 for...of 应抛 TypeError，Object.keys 应得到 ["a"]。测完删掉加在原型上的属性。'}
    ],
    refs:[['MDN：for...of','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of'],['MDN：for...in','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in']]
  },
  {
    track:'frontend', group:'语言基础', id:'es6-symbol-key',
    title:'Symbol 是不会和字符串键撞名的键',
    prompt:'为什么加了一个描述也叫 id 的 Symbol，Object.keys 却看不见它？',
    promptAnswer:'Symbol 键互不相等，Object.keys 看不见。要用 getOwnPropertySymbols 或 for。',
    core:'Symbol() 每次返回一个新的值，描述只是调试用的字符串，Symbol("id") === Symbol("id") 为 false。作为对象的键时写成计算属性 { [id]: 1 }，不会和字符串键 "id" 占同一个槽。Object.keys、for...in 和 JSON.stringify 都不列出 Symbol 键。Object.getOwnPropertySymbols 和 Reflect.ownKeys 能看见它们，所以这不是访问控制。需要跨文件拿到同一个 Symbol 时用 Symbol.for("id")，登记在全局表里；Symbol.keyFor 只能查这张表里的项。内建协议用的是众所周知的 Symbol，例如迭代器的 Symbol.iterator，见 `js-iteration-protocol`。',
    why:'用描述相同的两个 Symbol 当键，第二个写不回第一个的值。用 Object.keys 检查“字段有没有写上”，Symbol 键被漏掉，于是以为赋值失败。',
    example:'const a = Symbol("id"); const b = Symbol("id"); a === b 为 false。const row = { id: "A1", [a]: 7 }; row[a] 是 7，row[b] 是 undefined，row.id 仍是 "A1"。Object.keys(row) 是 ["id"]。JSON.stringify(row) 是 {"id":"A1"}。Symbol.for("id") === Symbol.for("id") 为 true。',
    task:'创建两个描述都是 id 的 Symbol，写进同一个对象，再用字符串 id 写一个字段。分别用 Object.keys、getOwnPropertySymbols 和 JSON.stringify 看结果。最后用 Symbol.for 取两次，比较是否相等。',
    answer:'两个 Symbol("id") 互不相等，各自占一个键。Object.keys 和 JSON 只有字符串 id。getOwnPropertySymbols 能列出那两个 Symbol。Symbol.for("id") 两次返回同一个值。',
    keywords:'Symbol Symbol.for 计算属性 Object.keys',
    points:['每次 Symbol() 都是新值，描述不参与相等','Symbol 键不会出现在 Object.keys 和 JSON 里','Symbol.for 按字符串在全局表里复用同一个值'],
    deep:[
      {title:'看得见，只是普通枚举不到',body:'Reflect.ownKeys 同时列出字符串键和 Symbol 键。库可以用 Symbol 避免和业务字段撞名，调用方仍然可以取到这个键。要藏数据，Symbol 做不到。'},
      {title:'怎样自己验证',body:'断言两个 Symbol("id") 不相等，Symbol.for("id") 两次相等。对象同时有字符串 id 和 Symbol 键时，Object.keys 只有 "id"，getOwnPropertySymbols 的长度应等于写入的 Symbol 个数，JSON 里没有 Symbol 的值。'}
    ],
    refs:[['MDN：Symbol','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol'],['MDN：Symbol.for','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_22) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
