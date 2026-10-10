/* Frontend 49: 语言基础第一遍，值。定义课，不单开为什么。 */
const COVERAGE_FRONTEND_49 = [
  {
    track:'frontend', group:'语言基础', id:'js-value-kinds',
    title:'值分成原始值和对象，typeof 报告大类',
    prompt:'一段数据放进变量之后，怎样知道它是数字、字符串还是对象？',
    promptAnswer:'原始值是 undefined、null、boolean、number、bigint、string、symbol。其余日常用的数组、函数和普通对象都是对象。typeof 返回这一大类的名字。',
    core:'语言里的值分成原始值（primitive value）和对象。原始值有七种：undefined、null、boolean、number、bigint、string、symbol。数组、函数和 { } 写出来的都是对象。typeof 运算的结果是一个字符串，用来看大类，例如 typeof 1 是 "number"，typeof {} 是 "object"。typeof null 也得到 "object"，这是早期留下的结果，null 并不是对象，见 `js-not-everything-object`。=== 和 Object.is 的差别见 `js-equality`。',
    example:'typeof 看大类：\n\n```javascript\ntypeof 1;          // "number"\ntypeof "CNY";      // "string"\ntypeof {};         // "object"\ntypeof null;       // "object"，null 仍不是对象\n```',
    task:'列出七种原始值。写出 typeof 1、typeof {} 和 typeof null 的结果。',
    answer:'七种原始值是 undefined、null、boolean、number、bigint、string、symbol。typeof 1 是 "number"，typeof {} 是 "object"。typeof null 也是 "object"，但 null 不是对象，见 `js-not-everything-object`。',
    keywords:'JavaScript primitive typeof null object',
    points:['值分成原始值和对象','原始值有七种','typeof 报告大类，typeof null 仍是 object'],
    deep:[
      {title:'函数的 typeof 是 function',body:'函数属于对象，但 typeof function () {} 得到 "function"，不是 "object"。这是 typeof 多出来的一个结果，不表示函数不是对象。'},
      {title:'怎样自己验证',body:'在控制台对 1、"a"、true、undefined、null、{} 和 function () {} 打印 typeof。确认 null 的结果是 object。'},
    ],
    refs:[['MDN：JavaScript data types','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures'],['ECMA-262：ECMAScript Data Types and Values','https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-let-const-decl',
    title:'let 可以再赋值，const 不能把名字指到别处',
    prompt:'声明一个会变的计数，和声明一个不能换掉的名字，各用哪个？',
    promptAnswer:'会再赋值就用 let。名字不能再指向别的值就用 const。const 并不冻住对象里的字段。',
    core:'let 和 const 都声明块级绑定。let count = 1 之后可以写 count = 2。const name = "a" 必须在声明时赋值，之后不能再把 name 指到别的值，再赋值会抛出 TypeError。const 锁住的是这个名字，对象里的字段仍能改，见 `es6-const-binding`。名字在声明之前不能读，见 `js-scope-tdz`。var 是函数作用域里的旧写法，新代码用 let 或 const。',
    example:'let 能改，const 不能换绑定：\n\n```javascript\nlet count = 1;\ncount = 2;\nconst name = "a";\n// name = "b" 抛出 TypeError\n```',
    task:'说明计数器该用 let 还是 const。const 声明的对象，改一个字段会不会抛错。',
    answer:'计数器要再赋值，用 let。const 不能把名字再指到新值，再赋值抛出 TypeError。const 对象的字段仍能改，见 `es6-const-binding`。',
    keywords:'JavaScript let const binding',
    since:'ES6',
    points:['let 声明之后可以再赋值','const 不能把名字再指到别的值','const 不冻住对象字段'],
    deep:[
      {title:'var 不要再当默认声明',body:'var 的作用域是函数，而且声明会被抬到函数顶部。let 和 const 的作用域是一对花括号，声明前读取会失败，见 `js-scope-tdz`。'},
      {title:'怎样自己验证',body:'用 let 把 1 改成 2，确认可以。用 const 声明字符串后再赋值，确认抛出 TypeError。'},
    ],
    refs:[['MDN：let','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let'],['MDN：const','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-number-ieee',
    title:'普通数字都是 number，除法会留下小数',
    prompt:'5 / 2 在 JavaScript 里得到什么？',
    promptAnswer:'得到 2.5。日常数字只有 number 这一种，除法不把小数丢掉。算失败的结果是 NaN。',
    core:'没有单独的 int。1 和 1.5 的类型都是 number，按 IEEE 754 双精度浮点存放。5 / 2 得到 2.5。运算得不出数字时，结果是 NaN（Not-a-Number）。NaN 用 === 和自己比较并不为真，见 `js-equality`。超过这种浮点能精确表示的整数时，用 bigint，字面量写成 1n，bigint 和 number 不能直接相加。',
    example:'除法留下小数：\n\n```javascript\n5 / 2;            // 2.5\ntypeof 1;         // "number"\nNumber("x");      // NaN\n1n + 1n;          // 2n\n```',
    task:'预测 5 / 2 和 typeof 1。说明 NaN 是什么时候出现的结果。',
    answer:'5 / 2 是 2.5。typeof 1 是 "number"，整数和小数是同一种类型。NaN 表示这次运算没有得到数字，例如 Number("x")。bigint 的字面量带 n，不能和 number 直接相加。',
    keywords:'JavaScript number NaN bigint IEEE 754',
    points:['整数和小数都是 number','除法保留小数','失败的数值结果是 NaN'],
    deep:[
      {title:'很大的整数会不再精确',body:'number 能精确表示的整数有上限。超过之后两个相邻整数可能变成同一个 number。需要精确的大整数时用 bigint。'},
      {title:'怎样自己验证',body:'打印 5 / 2 和 typeof 1.5。再打印 Number("x")，确认结果是 NaN。'},
    ],
    refs:[['MDN：Number','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'],['MDN：BigInt','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-string-length',
    title:'字符串是原始值，引号里的内容用 length 量长度',
    prompt:'"CNY" 是对象吗？怎样知道它有几个字符？',
    promptAnswer:'它是字符串原始值。length 是长度。用 + 连接会得到一个新字符串。',
    core:'字符串是原始值，不是字符数组。单引号和双引号都可以写出它，"CNY" 和 \'CNY\' 是同一种值。length 给出 UTF-16 码元的个数，"CNY".length 是 3。用 + 把字符串和别的值连起来，会得到一个新字符串，"CNY" + 1 是 "CNY1"。反引号里可以嵌入表达式，见 `es6-template-expression`。',
    example:'引号写出字符串：\n\n```javascript\nconst currency = "CNY";\ncurrency.length;          // 3\ncurrency + 1;             // "CNY1"\n```',
    task:'说明 "CNY" 的类型和 length。预测 "CNY" + 1。',
    answer:'"CNY" 是 string 原始值，不是对象。length 是 3。"CNY" + 1 得到新字符串 "CNY1"。模板字符串见 `es6-template-expression`。',
    keywords:'JavaScript string length concatenation',
    points:['字符串是原始值','length 是码元个数','+ 连接得到新字符串'],
    deep:[
      {title:'引号要成对',body:'字符串从引号开始，到同一种引号结束。里面要出现这种引号，就换另一种引号包住，或者在前面加反斜杠。'},
      {title:'怎样自己验证',body:'打印 "CNY".length 和 "CNY" + 1。再用 typeof 确认结果是 string。'},
    ],
    refs:[['MDN：String','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'],['MDN：String length','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-array-grows',
    title:'数组按下标存放值，length 会随 push 变大',
    prompt:'创建一个空数组之后，怎样放进第一个元素？越界读取会抛错吗？',
    promptAnswer:'下标从 0 开始。push 把元素加到末尾并增大 length。越过末尾去读，得到 undefined，不抛错。',
    core:'数组是对象，用从 0 开始的下标存放值。length 是数组自己报告的长度。push 把值加到末尾，length 随之变大。读取 a[a.length] 得到 undefined，不会抛出异常。按顺序取出每个元素可以用 for...of，见 `es6-for-of-iterable`。',
    example:'长度会变：\n\n```javascript\nconst lines = [];\nlines.push("a");\nlines[0];          // "a"\nlines.length;      // 1\nlines[1];          // undefined\n```',
    task:'写出空数组放入一个字符串之后的 length，以及再下一个下标读到什么。',
    answer:'push 一次之后 length 是 1，下标 0 是这个字符串。下标 1 读到 undefined，不抛异常。for...of 见 `es6-for-of-iterable`。',
    keywords:'JavaScript array length push index',
    points:['数组下标从 0 开始','push 增大 length','越过末尾读取得到 undefined'],
    deep:[
      {title:'length 可以人为改小',body:'把 length 设成更小的数，后面的元素就不再从数组里读到。这和 push 加长是同一字段的两种改法。'},
      {title:'怎样自己验证',body:'创建 []，push 一个字符串，打印 length 和下标 0。再读下一个下标，确认是 undefined。'},
    ],
    refs:[['MDN：Array','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array'],['MDN：Array.prototype.push','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-object-property',
    title:'对象用属性名存放值，点号和方括号都能读',
    prompt:'订单号和金额怎样放在同一个值里？',
    promptAnswer:'写成对象字面量。点号读取标识符属性，方括号用表达式当属性名。没有这个属性时得到 undefined。',
    core:'对象字面量写成 { amount: 100 }。点号 order.amount 读取名字是合法标识符的属性。方括号 order["amount"] 用一个表达式当属性名，名字来自变量时必须用方括号。对象上没有这个属性时，读取得到 undefined。两次写出的 { } 是两个对象，=== 比的是不是同一个对象，见 `js-equality`。属性在自己身上找不到时，还会沿原型链找，见 `js-prototype-chain`。',
    example:'点号和方括号读的是同一属性：\n\n```javascript\nconst order = { amount: 100 };\norder.amount;            // 100\norder["amount"];         // 100\norder.missing;           // undefined\n```',
    task:'用对象写下金额。说明点号和方括号何时都能用，缺失的属性读到什么。',
    answer:'{ amount: 100 } 把金额放在 amount 上。属性名是固定标识符时，点号和方括号结果相同。名字存在变量里时用方括号。没有的属性读到 undefined。两个字面量是不是同一个对象，见 `js-equality`。',
    keywords:'JavaScript object literal property bracket',
    points:['对象字面量用属性名存放值','点号读取标识符属性','缺失的属性读到 undefined'],
    deep:[
      {title:'方括号用于算出来的名字',body:'const key = "amount"; 之后要写 order[key]。order.key 找的是名字就叫 key 的属性，不会把变量的内容当成名字。'},
      {title:'怎样自己验证',body:'创建 { amount: 100 }，用点号和方括号各读一次。再读一个没写过的属性，确认是 undefined。'},
    ],
    refs:[['MDN：Object initializer','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer'],['MDN：Property accessors','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_49) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
