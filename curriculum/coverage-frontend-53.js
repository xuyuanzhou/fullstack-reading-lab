/* Frontend 53: React 第一遍，组件、props、useState。定义课，不单开为什么。 */
const COVERAGE_FRONTEND_53 = [
  {
    track:'frontend', group:'React', id:'react-function-component',
    title:'函数组件返回要显示的元素',
    prompt:'页面上的一段价格，在 React 里写成什么？',
    promptAnswer:'写成一个大写开头的函数，return 里放要显示的元素。JSX 会变成创建元素的调用，不是一段 HTML 字符串。',
    core:'函数组件是一个函数，返回 React 元素。JSX 里的 <p>100</p> 会编译成创建元素的调用，浏览器拿到的不是这串标签文本。组件名要以大写字母开头，JSX 才把它当成组件；小写开头会被当成 HTML 标签。页面这次显示的，就是函数这次返回的元素。组件里的 Hook 按调用顺序记在链表上，见 `linked-list`。',
    example:'大写函数返回元素：\n\n```jsx\nfunction Price() {\n  return <p>100</p>;\n}\n```',
    task:'说明函数组件返回什么，以及组件名为什么要大写。JSX 是不是直接交给浏览器的 HTML 字符串？',
    answer:'函数返回 React 元素。组件名大写，JSX 才把它当成组件。JSX 会变成创建元素的调用，不是交给浏览器的 HTML 字符串。Hook 的顺序见 `linked-list`。',
    keywords:'React function component JSX',
    points:['函数组件返回 React 元素','组件名大写才会被当成组件','JSX 会编译成创建元素的调用'],
    deep:[
      {title:'一次返回就是这一次的界面',body:'函数再执行一次，就会用新的返回值描述界面。不要在函数外面改已经返回的那个元素来指望下次还是旧对象。'},
      {title:'怎样自己验证',body:'写 function Price() { return <p>100</p> }，把它放进应用里。把名字改成小写再编译，确认它不再被当成组件。'},
    ],
    refs:[['React：Your First Component','https://react.dev/learn/your-first-component'],['React：Writing Markup with JSX','https://react.dev/learn/writing-markup-with-jsx']]
  },
  {
    track:'frontend', group:'React', id:'react-props-argument',
    title:'props 是调用组件时传入的参数',
    prompt:'同一个价格组件要显示 100 和 200，数字从哪里来？',
    promptAnswer:'调用时写成 cents={100}。函数的参数 props.cents 就是这个值。不要在组件里改 props。',
    core:'调用组件时写在标签上的 cents={100}，会放进函数的第一个参数，习惯上叫 props。props.cents 就是 100。props 按只读使用，组件里不要给 props.cents 重新赋值。父组件传入新的值时，这个函数会再用新参数执行一次。列表里每个子组件需要稳定的 key，身份见 `identity`。',
    example:'标签上的值进 props：\n\n```jsx\nfunction Price(props) {\n  return <p>{props.cents}</p>;\n}\n// <Price cents={100} />\n```',
    task:'说明 <Price cents={100} /> 里的 100 在函数里从哪个名字读到。组件里能不能把 props.cents 改成别的数？',
    answer:'从 props.cents 读到 100。props 不要在组件里改。父组件传入新值时，函数会再用新参数执行。列表身份见 `identity`。',
    keywords:'React props component argument',
    points:['标签上的属性放进 props','props 按只读使用','父组件传入新值时函数会再执行'],
    deep:[
      {title:'花括号里是表达式',body:'cents={100} 的花括号里是 JavaScript 表达式。cents="100" 则是字符串。数字要用花括号。'},
      {title:'怎样自己验证',body:'渲染 <Price cents={100} /> 和 <Price cents={200} />。确认两处文字不同，而且函数读的是 props.cents。'},
    ],
    refs:[['React：Passing Props to a Component','https://react.dev/learn/passing-props-to-a-component']]
  },
  {
    track:'frontend', group:'React', id:'react-usestate-pair',
    title:'useState 返回当前值和一个安排更新的函数',
    prompt:'按钮每点一次，数字要加 1，这个数字放在哪里？',
    promptAnswer:'用 useState(0) 取出当前值和更新函数。调用更新函数会安排组件再执行一次，这一次函数里的值不会当场变成新的。',
    core:'useState(0) 返回两项：当前状态，以及用来安排更新的函数。const [count, setCount] = useState(0) 里，count 是这次执行读到的值。调用 setCount(count + 1) 会安排组件再执行，这次执行过程中的 count 仍是调用前的值。同一个组件里，useState 的调用次数和顺序要保持稳定，见 `linked-list`。多次更新怎样并到同一次渲染，见 `react-setstate-batch`。输入框的值要不要跟 state 走，见 `controlled-input`。',
    example:'更新安排下一次执行：\n\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      {count}\n    </button>\n  );\n}\n```',
    task:'说明 useState 返回的两项各做什么。setCount 之后，这一次函数里的 count 变了没有？',
    answer:'第一项是这次的状态，第二项用来安排更新。setCount 不会改掉这次执行里的 count，组件会再用新值执行一次。调用顺序见 `linked-list`。',
    keywords:'React useState setState',
    since:'React 16.8',
    points:['useState 返回当前值和更新函数','更新函数安排组件再执行一次','同一次执行里的状态值不会被 set 改掉'],
    deep:[
      {title:'初值只在第一次使用',body:'useState(0) 的 0 只在这个状态第一次创建时使用。之后每次执行读到的是已经保存的值，不会反复把 count 重置成 0。'},
      {title:'怎样自己验证',body:'渲染 Counter，点一次按钮，确认文字从 0 变成 1。在 setCount 下一行打印 count，确认打印出来的仍是更新前的值。'},
    ],
    refs:[['React：useState','https://react.dev/reference/react/useState'],['React：State: A Component\'s Memory','https://react.dev/learn/state-a-components-memory']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_53) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
