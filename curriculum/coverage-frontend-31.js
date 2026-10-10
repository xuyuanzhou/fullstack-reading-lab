/* Frontend 31: W3CSchool 续扫 — Proxy、class extends/super、私有字段。 */
const COVERAGE_FRONTEND_31 = [
  {
    track:'frontend', group:'语言基础', id:'js-proxy-get-set-trap',
    title:'Proxy 拦截读写，不是给对象加一层“监听魔法”',
    prompt:'用 Proxy 包住对象后，直接改原对象，代理上的 set 为什么不跑？',
    promptAnswer:'只有经代理的操作进陷阱。直接改原对象不触发；响应式必须持有代理引用。',
    core:'`new Proxy(target, handler)` 返回的是**另一对象**。只有通过**代理对象**做的 `get`/`set`/`has`/`deleteProperty` 等操作才会进陷阱。直接改 `target` 的属性，陷阱不跑。陷阱必须按规范返回类型（例如 `set` 要反映是否成功），否则严格模式下抛错。Vue 3 用 Proxy 做响应式，也是拦截对响应式代理的访问，见 `vue-reactivity`、`vue-defineproperty-proxy`。`Reflect.get/set` 常用来把默认行为转发给 target，并带上正确的 receiver。',
    why:'把代理和原对象当同一个引用传来传去，日志里的 set 陷阱偶尔不出现，调试以为 Proxy 坏了。',
    example:'`const t = { n: 0 }; const p = new Proxy(t, { set(obj, key, val) { console.log(key); obj[key] = val; return true; } }); p.n = 1` 会打印。`t.n = 2` 不打印。把 `p` 交给组件、却把 `t` 存进全局，响应式会丢。',
    task:'划掉“Proxy=给原对象装监听”。写出：改代理、改 target，陷阱各是否运行；再写一句 Vue 为什么也要一直拿代理引用。',
    answer:'只有经代理的操作进陷阱。直接改 target 不进。响应式必须持有代理引用，不能混回原对象。',
    keywords:'Proxy Reflect get set trap 响应式',
    points:['Proxy 返回新对象，不是原地给 target 装钩子','只有经代理的操作才进陷阱','用 Reflect 转发默认行为并带上 receiver'],
    deep:[
      {title:'和 defineProperty',body:'Vue 2 用 defineProperty 重定义已有属性；Proxy 能拦截新属性与更多操作。迁移时不要两套混在同一引用上。'},
      {title:'怎样自己验证',body:'对代理与 target 各赋值一次，确认只有代理触发 set。再把代理与 target 用 === 比较，应为 false。'}
    ],
    refs:[['MDN：Proxy','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy'],['MDN：Reflect','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-class-extends-super',
    title:'extends 接上原型链，构造里先 super 再碰 this',
    prompt:'为什么子类构造函数里先写 this.name = x 会直接报错？',
    promptAnswer:'子类构造必须先 super 再碰 this。静态里 super 指向父类构造函数。',
    core:'`class Child extends Parent` 让 `Child.prototype` 的原型指向 `Parent.prototype`，实例查找沿这条链，见 `js-prototype-chain`。派生类的构造函数在使用 `this` 之前必须调用 `super(...)`，以便先完成父类对实例的初始化。`super.method()` 在子类方法里调用父类原型上的方法。静态成员挂在构造函数自身，`super` 在静态方法里指向父类构造函数。不要把 extends 理解成“把父类源码粘进子类”。',
    why:'先赋 this 再 super，引擎抛 ReferenceError；或以为 extends 复制了方法，改父类原型却影响所有子类实例。',
    example:'`class Animal { constructor(n) { this.n = n; } } class Dog extends Animal { constructor(n) { super(n); this.bark = true; } }`。去掉 super 先写 `this.bark` 会报错。',
    task:'写出：实例方法查找走哪条链；构造里 this 与 super 的先后；静态方法里 super 指向谁。',
    answer:'实例沿 Child.prototype → Parent.prototype。构造必须先 super 再碰 this。静态里 super 指向父类构造函数。',
    keywords:'class extends super 原型链',
    points:['extends 连接的是原型链，不是粘贴源码','派生构造必须先 super 再使用 this','super.method 调的是父类原型方法'],
    deep:[
      {title:'和箭头方法',body:'在构造里 `this.handler = () => {}` 是实例自有，不在原型上共享。原型上的方法才能被所有实例共用，见 js-prototype-chain。'},
      {title:'怎样自己验证',body:'打印 Object.getPrototypeOf(Dog.prototype) === Animal.prototype。构造里颠倒 super/this 应抛错。'}
    ],
    refs:[['MDN：extends','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends'],['MDN：super','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-private-field-hash',
    title:'# 私有字段只在类声明内可见，不是下划线约定',
    prompt:'实例上写 obj.#x 或 obj["#x"] 都读不到。为什么下划线也不能当私有？',
    promptAnswer:'运行时私有是 # 字段。下划线挡不住；TS private 默认擦掉后也不挡。',
    core:'以 `#` 开头的字段和方法是**硬私有**：只在声明它们的 class 体词法范围内可访问。子类、类外代码、动态字符串键都拿不到。这和 `_x` 下划线约定不同——后者仍是普通公共属性。私有字段必须先在类里声明再赋值；未声明就写 `#x` 会语法错。TypeScript 的 `private` 只在类型检查期约束，编译后仍可能是普通字段，不要和 `#` 混为一谈。',
    why:'把 `_secret` 当私有，外部照样读写；或以为 TS private 运行时也挡得住。',
    example:'`class Box { #n = 0; inc() { this.#n++; } get() { return this.#n; } }`。`new Box().#n` 语法错。`box._n` 若有人加上则仍是公共的。',
    task:'划掉“下划线=私有”。对比 # 字段、_ 约定、TS private 在运行时谁挡得住外部读取。',
    answer:'只有 # 在运行时挡外部。下划线挡不住。TS private 默认擦掉后挡不住，除非另开真私有字段。',
    keywords:'私有字段 private class TypeScript',
    points:['# 私有只在类体词法范围内可见','下划线只是约定，运行时可被读写','TS private 与 # 不是同一层约束'],
    deep:[
      {title:'和 WeakMap 旧写法',body:'ES 此前常用 WeakMap 模拟实例私有。# 是语言级方案，调试器可见性以实现为准，但语言规则上外部代码访问不到。'},
      {title:'怎样自己验证',body:'对 # 字段尝试类外读取应失败。给同一类加 _x 公共字段，类外赋值应成功。'}
    ],
    refs:[['MDN：私有类字段','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties'],['TypeScript：private','https://www.typescriptlang.org/docs/handbook/2/classes.html#private']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_31) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
