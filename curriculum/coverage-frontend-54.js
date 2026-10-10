/* Frontend 54: Vue 第一遍，模板和 ref。定义课，不单开为什么。 */
const COVERAGE_FRONTEND_54 = [
  {
    track:'frontend', group:'Vue', id:'vue-sfc-template',
    title:'单文件组件用 template 写要显示的结构',
    prompt:'一个显示数字的 Vue 组件，模板和脚本各写什么？',
    promptAnswer:'template 写结构和插值。script setup 里声明的名字可以直接写在模板里。选项式和组合式怎么拆大组件是另一课。',
    core:'单文件组件（SFC）把一个组件的模板和脚本放在同一个 .vue 文件里。template 里写要显示的结构，{{ count }} 这种插值（interpolation）会显示 count 当前的值。script 使用 setup 时，里面顶层声明的名字可以直接在模板里用，这是 Vue 3 的写法。选项式 API 把数据和函数分开放进 data 和 methods，它仍然可用。两种写法怎样组织复杂组件，见 `vue-composition-options`。',
    example:'模板读取脚本里的名字：\n\n```vue\n<script setup>\nconst count = 0;\n</script>\n\n<template>\n  <p>{{ count }}</p>\n</template>\n```',
    task:'指出数字显示在文件的哪一段，脚本里的 count 怎样出现在模板里。复杂组件选哪种 API，去看哪一课。',
    answer:'数字写在 template 的插值里。script setup 的顶层名字可以直接放进 {{ }}。选项式和组合式的组织方式见 `vue-composition-options`。',
    keywords:'Vue SFC template script setup interpolation',
    points:['template 写要显示的结构','插值显示当前的值','script setup 的顶层名字可以直接用在模板里'],
    deep:[
      {title:'模板不是字符串拼接',body:'{{ count }} 在渲染时读取这个名字的当前值。不要把它理解成写文件时就已经拼进 HTML 的一段固定文字。'},
      {title:'怎样自己验证',body:'写一个 script setup，声明 const count = 0，模板里放 {{ count }}。确认页面上出现 0。'},
    ],
    refs:[['Vue：Template Syntax','https://vuejs.org/guide/essentials/template-syntax.html'],['Vue：Single-File Components','https://vuejs.org/guide/scaling-up/sfc.html']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-ref-value',
    title:'ref 把值放在 value 上，模板里会自动拆开',
    prompt:'改了 count，模板为什么没有变？脚本里读的是 count 还是 count.value？',
    promptAnswer:'要用 ref 包住会变的值。脚本里读写 .value。模板里写 count，不用写 .value。',
    core:'ref(0) 返回一个响应式引用（ref），当前值放在 value 上。脚本里要写 count.value = 1，读也用 count.value。模板里的 {{ count }} 会自动拆开这个引用，不要写成 count.value。改 value 之后，用到它的模板会再渲染。这个通知发生在 Vue 包过的值上；直接改一个普通对象，页面不会跟着变，见 `vue-reactivity`。',
    example:'脚本用 .value，模板不用：\n\n```vue\n<script setup>\nimport { ref } from "vue";\nconst count = ref(0);\nfunction add() {\n  count.value = count.value + 1;\n}\n</script>\n\n<template>\n  <button @click="add">{{ count }}</button>\n</template>\n```',
    task:'说明脚本和模板里分别怎样读到 ref 里的数字。把 count 换成普通的 0 再加 1，模板会不会变？',
    answer:'脚本读写 count.value。模板写 count，会自动拆开。普通数字加 1 不会通知模板。代理和原始对象的差别见 `vue-reactivity`。',
    keywords:'Vue ref value template unwrap',
    since:'Vue 3',
    points:['ref 的当前值在 value 上','脚本里要写 .value','模板里会自动拆开 ref'],
    deep:[
      {title:'替换整个 value 也会通知',body:'count.value = count.value + 1 换的是里面的数字。把 value 设成一个新对象，同样会通知模板。不要去改 ref 外面的另一个普通变量。'},
      {title:'怎样自己验证',body:'用 ref(0) 和按钮把 value 加 1，确认按钮文字跟着变。再改成 let count = 0，在点击时只做 count = count + 1，确认文字停在 0。'},
    ],
    refs:[['Vue：ref','https://vuejs.org/api/reactivity-core.html#ref'],['Vue：Reactivity Fundamentals','https://vuejs.org/guide/essentials/reactivity-fundamentals.html']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_54) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
