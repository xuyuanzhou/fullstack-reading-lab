/* Batch 07: independently written lessons from Vue compiler and modal review. */
const COVERAGE_FRONTEND_07 = [
  {
    track:'frontend', group:'Vue', id:'vue-patch-hoist',
    title:'编译期补丁标记：更快有前提，不是框架保证',
    prompt:'为什么「用了静态标记，更新就不再比较、按钮事件也会直接复用」并不完整？',
    promptAnswer:'标记和缓存有条件：监听捕获局部变量时不能缓存。静态提升与补丁标记要分开看编译结果。',
    core:'模板编译器把动态更新种类写进 vnode 的补丁标记，块在优化路径里只遍历带标记的后代，静态部分因此被跳过。顺序是：先分清三个开关——补丁标记、静态提升（hoistStatic）、事件缓存（cacheHandlers）；再看当前构建有没有打开它们；最后才读编译结果里节点还带不带动态标记。边界是：打开 Vue 3 不等于三个开关都开；正数标记表示只做这一类更新，不是节点免于比较；捕获 v-for 局部变量的内联监听不能缓存。正数按位组合：文本 1、class 2、style 4、其他动态属性 8、动态键 16、需要水合 32、稳定片段 64、有 key 片段 128、无 key 片段 256、只需非属性修补 512、动态插槽 1024；开发环境根片段还有 2048。负整数单独判断：缓存静态节点是 -1，退出优化模式是 -2。当前 main 上，32 叫 NEED_HYDRATION，-1 叫 CACHED。hoistStatic 在编译器核心默认关闭，单文件 compileTemplate 常会打开；提升出去的静态 vnode 前后是同一个对象。cacheHandlers 核心默认关闭，且要有 prefixIdentifiers；单文件编译常打开。缓存成功时，稳定 click 监听可以不带补丁标记，这是少一次补丁遍历，不是把按钮提升成只创建一次的 vnode。',
    why:'误以为升级之后补丁标记、静态提升和事件缓存会自动生效。监听若捕获了循环里的局部变量，按钮仍会每次新建函数并进入补丁。区分信号是编译结果里这个节点还带不带动态标记，而不是框架名字或旧枚举名。',
    example:'一个静态段落加一处插值：打开 hoistStatic 后，段落 vnode 在 render 外创建一次，更新只处理插值。同一文件里的按钮若监听是稳定方法，单文件编译会缓存监听，更新文案时按钮不进入动态子节点。把这个监听写成 v-for 内部的内联语句，编译器会放弃缓存，按钮仍按动态属性更新。',
    task:'分别在 hoistStatic、cacheHandlers 开与关时看同一按钮的补丁标记；再把监听放进 v-for，说明为何不能缓存。最后核对 32 和 -1 在当前源码里的名字。',
    answer:'cacheHandlers 关闭时，按钮带动态属性标记；打开且监听是稳定方法时，可以不带补丁标记。监听放进 v-for 并捕获局部变量时不能缓存，否则会读到旧值。32 的名字是 NEED_HYDRATION，-1 的名字是 CACHED。hoistStatic 打开时静态段落只创建一次，关掉后每次渲染都重建；按钮的标记主要看事件缓存。',
    vue:'optimization',
    deep:[
      {title:'三个开关各管一段',body:'补丁标记告诉运行时要做哪一类更新，静态提升把不变节点挪到渲染函数外，事件缓存让稳定监听不再算动态属性。三者都要编译选项成立。捕获循环变量的内联函数必须每次新建，否则闭包里是旧值。'},
      {title:'怎样自己验证',body:'把 hoistStatic 和 cacheHandlers 分别打开、关闭，看同一按钮的补丁标记是否变化。再把监听放进 v-for。最后在当前补丁标记定义里核对 32 与 -1 的名字，不要沿用旧枚举名。'},
    ],
    keywords:'Vue 3 PatchFlags NEED_HYDRATION CACHED hoistStatic cacheHandlers createStaticVNode 静态提升 事件缓存',
    points:['正数补丁标记标出动态更新种类，静态部分靠块跳过','静态提升和事件缓存由编译选项打开，不是框架保底','内联监听和稳定方法引用的缓存条件不同'],
    refs:[['Vue：Rendering Mechanism','https://vuejs.org/guide/extras/rendering-mechanism.html'],['Vue 3 源码：PatchFlags','https://github.com/vuejs/core/blob/main/packages/shared/src/patchFlags.ts'],['Vue 3 源码：编译器选项','https://github.com/vuejs/core/blob/main/packages/compiler-core/src/options.ts'],['Vue 3 源码：compileTemplate','https://github.com/vuejs/core/blob/main/packages/compiler-sfc/src/compileTemplate.ts']]
  },
  {
    track:'frontend', group:'Vue', id:'vue-modal-programmatic',
    title:'编程式 Modal：挂到 body 还不是对话框',
    prompt:'Vue 3 里怎样打开一个对话框？只把它挂到 body 上算完成吗？',
    core:'Vue 3 移除了组件构造函数。迁移指南用 createApp(组件).mount(容器) 代替 Vue.extend 之后的实例挂载。顺序是：先决定声明式还是命令式打开；声明式用 Teleport 把片段搬到 body；命令式用 createApp 挂到独立容器，关闭时 unmount。边界是：挂到 body 只解决定位，不等于对话框语义；这样创建的 vnode 不会自动继承另一个应用的 provide 和全局组件。defineComponent 主要服务类型推断。需要更底层挂载时，用 h()/createVNode 再 render(vnode, 容器)；render(null, 容器) 卸载。WAI-ARIA 模态对话框要有 dialog 角色和 aria-modal，打开时焦点进入内部，Tab 在内部循环，Escape 关闭，关闭后焦点归还。setup() 里的 this 是 undefined。全局能力用 app.provide 或谨慎使用 globalProperties，不要在 setup 里找 this.$modal。',
    why:'把 Vue 2 的 extend、prototype 和一次 appendChild 当成 Vue 3 的 Modal 标准答案，会漏掉卸载、应用上下文，以及键盘和读屏用户需要的对话框语义。',
    example:'声明式组件用 Teleport 把对话框放到 body，打开时把焦点放到标题或第一个按钮，监听 Escape，关闭后把焦点还给触发按钮。若必须命令式打开，用 createApp 挂到独立容器，关闭时 unmount。调用方导入打开函数，不在 setup 里写 this 上的全局方法。',
    task:'写出打开、Tab 循环、Escape 关闭、焦点归还四步，并说明为什么只 render 一个组件再把容器放进 body，仍然缺少应用上下文和对话框语义。',
    answer:'定位用 Teleport，命令式挂载用 createApp 或带 render(null) 卸载的 vnode。对话框还要 dialog 角色、aria-modal、焦点和 Escape。全局能力用 globalProperties 或 provide，不使用 Vue.extend 和 vue.prototype。',
    vue:'teleport',
    deep:[
      {title:'定位和对话框不是同一步',body:'Teleport 只把片段搬到已经存在的 body，不带来焦点、Tab 循环和 Escape。createApp 挂出来的是另一棵应用，读不到调用方的 provide。对话框还要有 dialog 角色和 aria-modal，关闭后把焦点还回去。'},
      {title:'怎样自己验证',body:'打开对话框后连续按 Tab，焦点应留在内部；按 Escape 应关闭，并把焦点还给触发按钮。若用命令式挂载，关闭时要卸载容器里的树。再在 setup 里确认没有 this 上的全局方法。'},
    ],
    keywords:'Vue 3 createApp createVNode render Teleport globalProperties dialog aria-modal Escape 焦点',
    points:['Vue.extend 和 vue.prototype 不能再当 Vue 3 写法','Teleport 只搬动 DOM，挂载不等于无障碍对话框','setup 里没有 this，全局属性出现在模板和选项式 this 上'],
    refs:[['Vue 3 迁移：Global API','https://v3-migration.vuejs.org/breaking-changes/global-api.html'],['Vue：Teleport','https://vuejs.org/guide/built-ins/teleport.html'],['Vue：Application API','https://vuejs.org/api/application.html'],['Vue：setup()','https://vuejs.org/api/composition-api-setup.html'],['WAI-ARIA：Dialog (Modal) Pattern','https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_07) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
