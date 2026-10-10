/* Frontend 51: TypeScript 第一遍，类型标注。定义课，不单开为什么。 */
const COVERAGE_FRONTEND_51 = [
  {
    track:'frontend', group:'TypeScript', id:'ts-type-annotation',
    title:'冒号后面写类型，编译器按它检查赋值',
    prompt:'怎样让一个变量只能放数字，放字符串时在运行前就失败？',
    promptAnswer:'在名字后面写 : number。对不上的赋值会在编译时失败。这些标注不会留在生成的 JavaScript 里。',
    core:'类型标注（type annotation）写在名字后面的冒号之后。let n: number = 1 表示 n 的值按 number 检查。函数的参数和返回值同样写：function cents(n: number): number { return n }。把字符串赋给 n，编译失败。编译通过之后，生成的 JavaScript 里这些标注会被擦掉，运行时不再按它们检查。any 会关掉这一处检查。还不能确定类型时用 unknown，见 `ts-unknown`。',
    example:'对不上的赋值在编译时失败：\n\n```typescript\nlet n: number = 1;\nn = 2;\nfunction cents(n: number): number {\n  return n;\n}\n// n = "a" 编译失败\n```',
    task:'给金额变量和函数参数写上 number。说明标注在生成的 JavaScript 里还在不在。',
    answer:'变量、参数和返回值都用冒号写上 number。把字符串赋给 number 会编译失败。生成的 JavaScript 不再保留这些标注。unknown 见 `ts-unknown`。',
    keywords:'TypeScript type annotation number erase',
    points:['冒号后面是类型标注','参数和返回值同样写标注','生成的 JavaScript 不再保留标注'],
    deep:[
      {title:'和导论',body:'TypeScript 是什么、怎样编成 JavaScript、类型在运行时消失见 ts-what-it-is、ts-compile-to-js、ts-not-runtime-check。本课专讲标注写法。'},
      {title:'有初值时可以省略',body:'let n = 1 时，编译器把 n 推断为 number。写出 : number 是在声明处把这个决定固定下来。'},
      {title:'怎样自己验证',body:'写 let n: number = 1，再赋一个字符串。确认报错出现在编译，而不是页面打开之后。'},
    ],
    refs:[['TypeScript：Everyday Types','https://www.typescriptlang.org/docs/handbook/2/everyday-types.html'],['TypeScript：The Basics','https://www.typescriptlang.org/docs/handbook/2/basic-types.html']]
  },
  {
    track:'frontend', group:'TypeScript', id:'ts-object-array-type',
    title:'对象类型写出字段，数组类型写出元素',
    prompt:'订单要有一个数字金额，列表里的每一项都是字符串，类型怎么写？',
    promptAnswer:'对象写成 { amount: number }。数组写成 string[]。多写的字段能不能过，还要看是不是对象字面量。',
    core:'对象类型把字段名和类型写在花括号里。{ amount: number } 表示这个值要有 amount，而且 amount 是 number。数组类型把元素类型写在方括号前面，string[] 表示每一项按 string 检查。把数字放进 string[] 会编译失败。对象字面量如果多写了类型里没有的字段，编译也会拒绝；这个值若先放进变量再传，检查会少一层，见 `ts-structural`。interface 和 type 怎么选，见 `ts-type-vs-interface`。',
    example:'字段和元素分开写：\n\n```typescript\nconst order: { amount: number } = { amount: 100 };\nconst lines: string[] = ["a"];\n// lines.push(1) 编译失败\n```',
    task:'写出带 amount 的订单类型，以及字符串数组类型。数字推进 string[] 会在什么时候失败？',
    answer:'订单类型是 { amount: number }，数组类型是 string[]。推进数字会编译失败。字面量多出来的字段见 `ts-structural`。interface 和 type 见 `ts-type-vs-interface`。',
    keywords:'TypeScript object type array type',
    points:['对象类型列出字段和字段的类型','数组类型写成元素类型加方括号','不符合的元素在编译时被拒绝'],
    deep:[
      {title:'字段可以标成可选',body:'name?: string 表示这个字段可以不写。读到它时，类型里会带上 undefined。和“必须有、值可以是 null”不是同一种写法。'},
      {title:'怎样自己验证',body:'声明 { amount: number } 和 string[]。给 amount 赋字符串，或给数组 push 数字，确认都是编译错误。'},
    ],
    refs:[['TypeScript：Object Types','https://www.typescriptlang.org/docs/handbook/2/objects.html'],['TypeScript：Everyday Types','https://www.typescriptlang.org/docs/handbook/2/everyday-types.html']]
  },
  {
    track:'frontend', group:'TypeScript', id:'ts-union-annotation',
    title:'竖线表示值可以是列出的类型之一',
    prompt:'金额有时是数字，有时还没有，类型怎么写才不会把它当成永远有数？',
    promptAnswer:'写成 number | null。使用之前要先判断是哪一种。可选字段读出来会带上 undefined。',
    core:'联合类型（union type）用竖线把几种可能写在一起。number | null 表示这个值可以是 number，也可以是 null。把它赋成字符串会编译失败。在还没判断是哪一种之前，不能直接把它当 number 做运算。判断之后只留下一种类型，这叫收窄，见 `ts-narrowing`。可选字段 name?: string 读出来的类型是 string | undefined。',
    example:'只接受列出来的类型：\n\n```typescript\nlet amount: number | null = 100;\namount = null;\n// amount = "x" 编译失败\n```',
    task:'把“可能还没有的金额”写成联合类型。说明和可选字段读出来的 undefined 差在哪里。',
    answer:'可能没有的金额写成 number | null，null 是这个值自己的一种可能。可选字段不存在时，读出来是 string | undefined，见标注里的问号。使用联合类型前要收窄，见 `ts-narrowing`。',
    keywords:'TypeScript union type null undefined',
    points:['竖线连接一个值允许的几种类型','没列出的类型不能赋值','可选字段读出来带 undefined'],
    deep:[
      {title:'null 和 undefined 都要写进去才允许',body:'number 不包含 null，也不包含 undefined。需要缺席时，把 null 或 undefined 写进联合类型，或者把字段标成可选。'},
      {title:'怎样自己验证',body:'声明 number | null，依次赋数字和 null，确认可以通过。再赋字符串，确认编译失败。'},
    ],
    refs:[['TypeScript：Union Types','https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types'],['TypeScript：Narrowing','https://www.typescriptlang.org/docs/handbook/2/narrowing.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_51) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
