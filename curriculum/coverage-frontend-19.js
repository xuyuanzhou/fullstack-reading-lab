/* 2019 React roadmap image: Enzyme and Flow are not current defaults. */
const COVERAGE_FRONTEND_19 = [
  {
    track:'frontend', group:'测试', id:'react-enzyme-not-default',
    title:'组件测试默认 Testing Library，不是 Enzyme',
    prompt:'为什么 2019 的 React 路线图还把 Enzyme 画成组件测试必选项？',
    promptAnswer:'那是旧图。现行默认是 Testing Library：按用户能看见的角色和名字查。Enzyme 的 shallow/instance 不是 React 19 的默认答案。',
    core:'Enzyme 用 shallow、wrapper.state、instance() 去读组件内部。那是实现细节，类名和内部方法一改测试就碎。Testing Library 按用户能感知的角色和名字查询，见 `testing-library-role`。React 19 的函数组件没有可供 Enzyme 依赖的实例；维护者也已转向 Testing Library。2019 图上并列的 Jest 仍常用，但断言目标应是页面上的控件，不是组件实例。端到端仍用 Playwright 走一条用户路径，见 `playwright-user-journey`。',
    why:'按 Enzyme 去 shallow 再读 state，Hooks 组件没有 instance，一升级 React 测试全红，按钮文字其实没变。',
    example:'render(<SaveButton />) 后 getByRole("button", { name: "保存" })。不要 wrapper.state("busy")。把按钮文字改成“提交”时，按角色的测试应失败；只改内部变量名时不应失败。',
    task:'把一条读 instance 或 state 的测试改成按按钮角色查询。只改内部字段名，确认测试仍过。',
    answer:'按角色和名称查询。内部字段名不是契约。Enzyme 的 shallow/instance 不是 React 19 的默认答案。Jest 可以留，断言目标换成用户能看见的控件。',
    keywords:'Enzyme Testing Library getByRole React 组件测试',
    origin:'本地库 2019 React 开发者路线图把 Enzyme 列为组件测试',
    diagram:'diagrams/react-enzyme-rtl.svg',
    points:['现行组件测试按用户能感知的角色查询','Enzyme 绑在实例和内部状态上，函数组件对不上','Jest 仍可用，断言目标不要写成 wrapper.state'],
    deep:[
      {title:'shallow 不是更快的用户',body:'shallow 故意不渲染子树，测到的是当前文件的实现边界。用户点的是整棵树画出来的按钮。需要隔离子组件时用假模块，而不是回到 Enzyme。'},
      {title:'怎样自己验证',body:'写一条 getByRole 点按钮的测试。只改内部 state 字段名，测试应仍通过。再改按钮可见文字，测试应失败。不要用 instance()。'}
    ],
    refs:[['Testing Library：从 Enzyme 迁移','https://testing-library.com/docs/react-testing-library/migrate-from-enzyme/'],['Testing Library：查询优先级','https://testing-library.com/docs/queries/about/']]
  },
  {
    track:'frontend', group:'TypeScript', id:'react-flow-not-default',
    title:'React 文档用 TypeScript，不再把 Flow 当默认',
    prompt:'2019 路线图把 Flow 和 TypeScript 画成并列必学。为什么今天不能再这么背？',
    promptAnswer:'新 React 代码默认 TypeScript。Flow 不是现行并列必学。',
    core:'Flow 是当时 Facebook 的类型检查器，注释写在 JS 里。现行 react.dev 的类型示例是 TypeScript：组件 props、Hooks 返回值都按 TS 讲解。PropTypes 是运行时检查，编译期帮不上忙，也不是 Flow 的替代品。遗留 Flow 仓库可以继续跑，新文件不要再开一条和文档不一致的类型工具链。类型边界见 `ts-unknown`、`ts-type-vs-interface`。',
    why:'新项目同时装 Flow 和 TypeScript，CI 两套检查互相打架，文档示例却全是 .tsx。',
    example:'function Hello({ name }: { name: string }) { return <p>{name}</p>; }。不要在新文件顶部写 // @flow。运行时 PropTypes.string 挡不住把数字传进 name 的编译错误。',
    task:'对照 react.dev 的 TypeScript 页，划掉“Flow 仍是 React 官方并列默认”。写出遗留代码可以暂留、新代码用哪种。',
    answer:'新代码用 TypeScript，跟文档示例走。Flow 只留在已经在用的仓库。PropTypes 是运行时，不能代替类型检查。不要为了 2019 图再装一套 Flow。',
    keywords:'React TypeScript Flow PropTypes 类型检查',
    origin:'本地库 2019 React 开发者路线图把 Flow 与 TypeScript 并列',
    diagram:'diagrams/react-flow-ts.svg',
    points:['react.dev 的类型示例是 TypeScript','Flow 不是现行默认，遗留仓库可以暂留','PropTypes 是运行时检查，不是编译期类型'],
    deep:[
      {title:'和 JSDoc',body:'不想上 TS 时，编辑器也能读 JSDoc。那仍不是 Flow。选一种工具链，不要三种注释一起写。'},
      {title:'怎样自己验证',body:'打开 react.dev 的 TypeScript 页，确认示例是 .tsx 或 TS 语法。新项目的类型检查只保留 TypeScript 一条。'}
    ],
    refs:[['React：Using TypeScript','https://react.dev/learn/typescript'],['TypeScript：Everyday Types','https://www.typescriptlang.org/docs/handbook/2/everyday-types.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_19) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
