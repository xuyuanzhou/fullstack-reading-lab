/* Frontend 50: 语言基础第一遍，语句。定义课，不单开为什么。 */
const COVERAGE_FRONTEND_50 = [
  {
    track:'frontend', group:'语言基础', id:'js-function-return',
    title:'function 划出一段可调用的代码，return 把值交回去',
    prompt:'怎样把“按分算金额”写成可以反复调用的一段？',
    promptAnswer:'用 function 声明。调用时圆括号里的值按顺序对上参数。return 把结果交回调用处。',
    core:'function 声明一个函数。调用时，圆括号里的值按顺序成为参数。return 把一个值交回调用处；函数如果执行到末尾还没有 return，结果是 undefined。函数本身也是值，可以放进变量。箭头函数的 this 和这种 function 不一样，见 `js-arrow-has-no-prototype`。',
    example:'return 交回调用处：\n\n```javascript\nfunction cents(n) {\n  return n;\n}\ncents(100);          // 100\n```',
    task:'写一个函数接收金额并 return 它。不写 return 时，调用结果是什么？',
    answer:'function cents(n) { return n } 在 cents(100) 时得到 100。没有 return 的函数，调用结果是 undefined。箭头函数见 `js-arrow-has-no-prototype`。',
    keywords:'JavaScript function return parameter',
    points:['function 声明可调用的一段代码','参数按调用时的顺序对上','没有 return 时结果是 undefined'],
    deep:[
      {title:'return 会立刻结束函数',body:'return 后面的语句不再执行。需要先算完再交回，就把计算写在 return 之前。'},
      {title:'怎样自己验证',body:'调用一个有 return 的函数和一个没有 return 的函数，打印两个结果。后者应为 undefined。'},
    ],
    refs:[['MDN：function','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function'],['MDN：return','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-if-falsy',
    title:'if 把条件当成真或假，0 和空字符串算假',
    prompt:'if (count) 在 count 为 0 时，为什么走进了 else？',
    promptAnswer:'if 不要求条件已经是布尔值。0、空字符串、null、undefined、NaN 和 false 都算假，所以 0 会走进 else。',
    core:'if 会把条件转成布尔值再决定走哪一支。算假的值（falsy）有 false、0、空字符串、null、undefined 和 NaN。其余值算真，包括空对象和空数组。0 是一个有效数字，但在 if 里算假。要区分 0 和缺失，就写成 count === 0，不要只写 if (count)。== 会先转换类型，见 `js-equality`。',
    example:'0 会走进 else：\n\n```javascript\nconst count = 0;\nif (count) {\n  // 不执行\n} else {\n  // count === 0 时走这里\n}\n```',
    task:'列出算假的值。说明 count 为 0 时怎样写条件才能走进“等于 0”的分支。',
    answer:'算假的是 false、0、空字符串、null、undefined、NaN。if (count) 在 0 时走 else。要认出 0，写成 count === 0。== 的类型转换见 `js-equality`。',
    keywords:'JavaScript if falsy boolean',
    points:['if 把条件转成布尔值','0 和空字符串算假','认出 0 要写 === 0'],
    deep:[
      {title:'空数组算真',body:'[] 和 {} 不是 falsy。if ([]) 会走进真的那一支。缺元素和空容器不是同一件事。'},
      {title:'怎样自己验证',body:'用 if 分别测试 0、""、null、undefined、NaN、1 和 []。前五个进 else，后两个进 if。'},
    ],
    refs:[['MDN：if...else','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else'],['MDN：Falsy','https://developer.mozilla.org/en-US/docs/Glossary/Falsy']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-for-while-break',
    title:'while 和 for 重复一块代码，break 离开循环',
    prompt:'想把 0、1、2 加起来，但跳过 1，循环该怎么写？',
    promptAnswer:'for 或 while 在条件为真时重复。continue 跳过这一轮剩下的语句，break 离开整个循环。',
    core:'while (条件) 在条件为真时重复后面的语句。for (let i = 0; i < n; i = i + 1) 先做一次初始化，之后每轮先看条件，循环体结束再做更新。break 离开它所在的这一层循环。continue 跳过这一轮剩下的语句，for 会先做更新再看条件。按数组元素遍历用 for...of，见 `es6-for-of-iterable`。',
    example:'continue 跳过 1：\n\n```javascript\nlet sum = 0;\nfor (let i = 0; i < 3; i = i + 1) {\n  if (i === 1) continue;\n  sum = sum + i;\n}\n// sum 是 2\n```',
    task:'说明 continue 和 break 的差别。预测上面这段的 sum。',
    answer:'continue 只结束这一轮，循环还在。break 离开整个循环。i 为 0 时加上 0，i 为 1 时跳过，i 为 2 时加上 2，sum 是 2。for...of 见 `es6-for-of-iterable`。',
    keywords:'JavaScript for while break continue',
    points:['while 和 for 在条件为真时重复','break 离开这一层循环','continue 跳过这一轮剩下的语句'],
    deep:[
      {title:'条件每次都会重看',body:'循环体里如果改了条件用到的变量，下一轮用的是改完之后的值。for 的更新在循环体之后执行，continue 也会先走到更新。'},
      {title:'怎样自己验证',body:'跑上面的 for，打印 sum，应为 2。把 continue 改成 break，确认加到 0 就停。'},
    ],
    refs:[['MDN：for','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for'],['MDN：break','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break'],['MDN：continue','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-try-catch-throw',
    title:'throw 抛出一个值，catch 接住它',
    prompt:'读金额失败时，怎样把失败交到调用这段代码的地方？',
    promptAnswer:'throw 抛出一个值，通常是 Error。try 外面的 catch 接到它。函数签名上不用写 throws。',
    core:'throw 抛出一个值，并离开当前这段代码。写在 try 里时，后面的 catch 会接到这个值，括号里的参数就是它。finally 里的代码无论是否抛出都会执行。习惯上抛出 Error 对象，这样有消息和调用栈。函数声明上没有 throws，调用方不会因为你没写 catch 而在解析阶段失败。',
    example:'catch 接到抛出的 Error：\n\n```javascript\ntry {\n  throw new Error("read");\n} catch (err) {\n  err.message;       // "read"\n} finally {\n  // 两条路都会执行\n}\n```',
    task:'说明 throw 和 catch 各做什么。不写 catch 时，抛出会不会在解析阶段就被拒绝？',
    answer:'throw 抛出值并离开当前代码。catch 的参数就是这个值。finally 无论是否抛出都会执行。没有 throws 要声明，不写 catch 不会在解析阶段失败，抛出时才会中断。',
    keywords:'JavaScript try catch throw finally Error',
    points:['throw 抛出值并离开当前代码','catch 接到抛出的值','finally 无论是否抛出都会执行'],
    deep:[
      {title:'抛出的不一定是 Error',body:'throw 1 也合法，catch 接到的就是 1。需要消息和栈时，抛 new Error("...")。'},
      {title:'怎样自己验证',body:'在 try 里 throw new Error("read")，在 catch 里打印 message。再在 finally 里加一条打印，确认抛出时它仍执行。'},
    ],
    refs:[['MDN：try...catch','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch'],['MDN：throw','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-switch-strict',
    title:'switch 用严格相等匹配，没有 break 会继续往下',
    prompt:'case 1 里没有 break，为什么 case 2 的赋值也执行了？',
    promptAnswer:'switch 用 === 匹配。匹配之后会继续执行后面的语句，直到 break。这一支要停住，就写 break。',
    core:'switch 把表达式和每个 case 用严格相等（===）比较。匹配上之后，会继续执行后面的语句，直到 break，或者这个 switch 结束。这种继续和冒号形式的落入是同一件事。default 在没有 case 匹配时执行。case 的值要和表达式用 === 比得上，字符串 "1" 对不上数字 1。',
    example:'没有 break 会继续：\n\n```javascript\nlet name = "";\nswitch (1) {\n  case 1:\n    name = "a";\n  case 2:\n    name = "b";\n    break;\n  default:\n    break;\n}\n// name 是 "b"\n```',
    task:'说明 case 不写 break 时后面的 case 会不会执行。字符串 "1" 能不能匹配数字 1。',
    answer:'匹配之后继续往下，直到 break。上面的例子里 name 最后是 "b"。switch 用 ===，"1" 不等于 1，不会匹配。',
    keywords:'JavaScript switch break strict equality',
    points:['switch 用 === 匹配 case','没有 break 会继续执行后面的 case','default 处理都不匹配的情况'],
    deep:[
      {title:'default 的位置不改变匹配规则',body:'default 写在中间时，落入仍从匹配的 case 往后走。它不是“最后才检查”的特殊步骤，只是没有 case 匹配时的入口。'},
      {title:'怎样自己验证',body:'用数字 1 跑上面的 switch，确认 name 是 "b"。在 case 1 末尾加上 break，确认 name 变成 "a"。'},
    ],
    refs:[['MDN：switch','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_50) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
