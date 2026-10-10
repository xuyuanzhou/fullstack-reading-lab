/* Prototype-chain diagrams from library images, rewritten. */
const COVERAGE_FRONTEND_16 = [
  {
    track:'frontend', group:'语言基础', id:'js-not-everything-object',
    title:'不是万物皆对象，链的尽头是 null',
    prompt:'图上写「万物皆对象、万物皆空」，还说每个对象都有 __proto__。为什么不对？',
    promptAnswer:'不是万物皆对象。原始值 typeof 不是 object；null 也不是对象。',
    core:'JavaScript 有对象，也有原始值：undefined、null、布尔、数字、bigint、字符串、symbol。读数字的 toString 时，实现会临时装箱，原始值本身不是对象。`typeof null === "object"` 是历史错误，null 不能当对象用，也不是「空对象」。`Object.create(null)` 才是没有原型的对象，连 `toString` 都没有。原型链查找停在 null，见 `js-prototype-chain`。日常用 `Object.getPrototypeOf`，不要把 `__proto__` 写成必有字段。',
    why:'按「万物皆对象」去给数字赋属性，下次读还是没有。把 Object.create(null) 当字典再调用 toString，会抛错，于是以为对象坏了。',
    example:'const n = 1; n.flag = true; 再读 n.flag 是 undefined。Object.create(null).toString 不是函数。Object.getPrototypeOf({}) 是 Object.prototype，再上一层是 null。',
    task:'划掉「万物皆对象」。分别记录 1、{}、Object.create(null)、null 的 typeof 和 getPrototypeOf。',
    answer:'1 的 typeof 是 number，不是对象。普通对象有原型。create(null) 是对象但原型是 null。null 不是对象，getPrototypeOf(null) 抛错。链停在 null，不是空对象。',
    keywords:'JavaScript primitive Object.create null prototype typeof',
    origin:'本地库「原型链流程图」：万物皆对象口诀',
    diagram:'library-assets/illustrated-basics/prototype-chain-flow.png',
    points:['原始值不是对象，属性访问才会临时装箱','null 不是空对象，typeof 的 object 是历史包袱','没有原型的对象用 Object.create(null)，日常不要读 __proto__'],
    deep:[
      {title:'装箱留不住字段',body:'给原始值写属性只打在临时包装对象上，语句结束就丢掉。需要长期字段就用对象或显式 new Number 这类包装，后者几乎不该出现在新代码里。'},
      {title:'怎样自己验证',body:'对 1、{}、Object.create(null) 打印 typeof 和 Object.getPrototypeOf。对 null 调用 getPrototypeOf 应抛 TypeError。不要用 obj.__proto__ 当判断。'}
    ],
    refs:[['MDN：JavaScript 数据类型','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures'],['MDN：Object.create','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create'],['MDN：Object.getPrototypeOf','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-arrow-has-no-prototype',
    title:'箭头函数没有 prototype，Function.prototype 也不是普通对象',
    prompt:'图上写「只要是构造函数就有 prototype，原型对象都是 Object 构造出来的」。为什么不准确？',
    promptAnswer:'箭头与 bind 后的函数没有 prototype，不能当构造函数。',
    core:'能 `new` 的普通函数和 class 才有 `prototype`，实例的内部原型指向它。箭头函数没有 `prototype`，`new (() => {})` 抛 TypeError。`Function.prototype.bind` 得到的函数同样没有 `prototype`。`Function.prototype` 自己是函数，不是 `new Object()` 出来的普通对象；它的原型才是 `Object.prototype`。函数对象的内部原型通常是 `Function.prototype`，但不要写成「所有函数都是 Function 构造出来的」——箭头函数、方法简写和绑定函数走的是不同创建路径。见 `js-prototype-chain`、`js-this-callsite`。',
    why:'按那张图去 `new` 箭头函数，或去改 Function.prototype 上的 constructor 当普通对象字段，调试信息会对不上。',
    example:'function Person() {} 有 Person.prototype。const f = () => {}; f.prototype 是 undefined。typeof Function.prototype 是 function。Object.getPrototypeOf(Function.prototype) 是 Object.prototype。',
    task:'对比 function、箭头函数、bind 之后的函数有没有 prototype，以及 Function.prototype 的 typeof。划掉「原型都是 Object 构造的」。',
    answer:'只有可 new 的函数才有 prototype。箭头和 bind 没有。Function.prototype 的 typeof 是 function。它的原型才是 Object.prototype。',
    keywords:'JavaScript arrow function prototype Function.prototype bind new',
    origin:'本地库「原型链流程图」：构造函数与原型对象口诀',
    diagram:'library-assets/illustrated-basics/prototype-chain-flow.png',
    points:['箭头函数和 bind 函数没有 prototype，不能 new','Function.prototype 是函数，不是普通对象实例','实例链到构造函数的 prototype，不要靠 __proto__ 口诀'],
    deep:[
      {title:'class 也是函数',body:'class 声明的构造函数仍是函数，方法在 prototype 上。它不能当普通函数不带 new 调用。这和箭头函数「根本没有 prototype」不是同一条限制。'},
      {title:'怎样自己验证',body:'打印 function F(){} 的 F.prototype。打印箭头函数的 prototype，应为 undefined。new 箭头函数应抛错。再看 typeof Function.prototype 和 getPrototypeOf(Function.prototype)。'}
    ],
    refs:[['MDN：箭头函数','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions'],['MDN：Function.prototype','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype'],['ECMA-262：Ordinary Function Objects','https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-ordinary-function-objects']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_16) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
