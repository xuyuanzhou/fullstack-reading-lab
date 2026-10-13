/* Visible path stages: testing and security were previously buried in 工程实践. */
const COVERAGE_PATH_03 = [
  {
    track:'frontend', group:'测试', id:'testing-library-role',
    title:'用角色和名字找元素，不用类名',
    prompt:'测试里写 container.querySelector(".submit")，重构样式后为什么会碎？',
    promptAnswer:'把类名点击改成按按钮角色和名称查询后，只改类名、不改按钮文字，测试仍然通过，因为用户看得到的名字没变。',
    core:'Testing Library 建议按用户能感知的方式查询。优先级最高的是 getByRole，再配合可访问名称，例如按钮的文字。类名、测试 id 和组件内部结构会随重构改变，用户却仍然看见同一个按钮。getBy 在找不到时立刻失败。queryBy 用于断言某个元素不存在。找不到时先看元素有没有可访问角色，而不是再加一层选择器。',
    why:'学习者会用类名去点按钮，以为这样更稳定。重构样式后类名变了，测试失败，按钮文字和角色都没变，用户仍然点得了保存。只改类名时按角色和名称的查询仍然通过，按类名的查询失败，才说明测试绑在了实现而不是用户看得到的控件上。',
    example:'保存按钮用角色和名称“保存”去点，测试通过。把类名从 btn-primary 改成 btn-main、文字不变，这个查询仍然找到按钮。改用类名选择器的那条测试在同一次修改后失败。页面上没有“保存”时，按角色的查询会失败并列出当前有哪些角色。',
    task:'把一个用类名点击按钮的测试改成按按钮角色和名称查询，然后只改类名、不改按钮文字，确认测试仍然通过。',
    answer:'把类名点击改成按按钮角色和名称查询后，只改类名、不改按钮文字，测试仍然通过，因为用户看得到的名字没变。类名留给样式，不是契约。断言某个元素不存在时用 queryBy，不要把会立刻失败的 getBy 包进 try 来表示“没有”。只改类名时按名称的查询必须仍然通过。',
    keywords:'Testing Library getByRole accessible name 组件测试',
    points:['优先用角色和可访问名称查询','类名和内部结构不是用户契约','getBy 找不到就失败，queryBy 用来断言不存在'],
    deep:[
      {title:'角色与可访问名称',body:'查询优先用角色，再配合可访问名称，例如按钮上的文字。类名、测试标识和组件内部结构会随重构改变，用户却仍然看见同一个按钮。getBy 找不到就立刻失败，queryBy 才用来断言元素不存在。'},
      {title:'怎样自己验证',body:'写一条用类名点击按钮的测试，再改成按按钮角色和名称查询。只修改类名、不改文字，后一条应仍通过。暂时去掉按钮文字，查询应失败并提示页面上还有哪些角色。去掉按钮文字后，失败信息里应能看到页面上还剩哪些角色。'}
    ],
    refs:[['Testing Library：查询优先级','https://testing-library.com/docs/queries/about/'],['Testing Library：ByRole','https://testing-library.com/docs/queries/byrole/']]
  },
  {
    track:'frontend', group:'测试', id:'vue-test-utils-mount',
    title:'Vue 组件测试用 mount 挂上组件，Vitest 只负责跑断言',
    prompt:'装了 Vitest，为什么直接查询组件文件仍然碰不到输入框？',
    promptAnswer:'〔Vitest｜Vue 官方测试指南推荐的测试运行器〕只调用测试函数。输入框要出现，得用 Vue Test Utils 的 mount 把组件渲染出来。',
    core:'〔Vitest｜Vue 官方测试指南推荐的测试运行器〕负责执行 test 和 expect。它不解析单文件组件，也不会替你生成 DOM。〔mount｜把组件和子组件一起渲染成可查询的包装〕来自 Vue Test Utils，返回的包装才能 get、setValue 和 trigger。〔shallowMount｜渲染当前组件，并把子组件换成桩〕不渲染子组件的模板。wrapper.get 找不到匹配节点就失败。wrapper.find 找不到时 exists 为 false，适合断言某个节点不存在。setValue 写入输入框并更新 v-model。组件测试用的是 DOM 模拟，不是用户打开的浏览器。一条从打开页面到看见结果的路径仍用浏览器测试，见 playwright-user-journey。',
    why:'学习者会以为安装 Vitest 之后，测试函数里就能读到模板上的输入框。运行器只调用了测试函数，组件没有被挂载，查询因此失败。先 mount 再 get 输入框，同一条断言才读得到 v-model 的值。',
    example:'订单备注组件：\n\n```vue\n<script setup>\nimport { ref } from "vue";\nconst memo = ref("");\n</script>\n\n<template>\n  <label>\n    备注\n    <input v-model="memo" />\n  </label>\n  <p>{{ memo }}</p>\n</template>\n```\n\n测试先挂载，再写入输入框：\n\n```javascript\nimport { mount } from "@vue/test-utils";\nimport { expect, test } from "vitest";\nimport MemoNote from "./MemoNote.vue";\n\ntest("typing updates the memo", async () => {\n  const wrapper = mount(MemoNote);\n  await wrapper.get("input").setValue("补一笔");\n  expect(wrapper.text()).toContain("补一笔");\n});\n```',
    task:'用 mount 挂上一个带输入框的组件，setValue 之后断言页面文字。再说明 shallowMount 和这条浏览器路径各自不负责什么。',
    answer:'1. mount 之后 setValue 写入输入框，包装的文字里出现刚写入的备注。\n\n2. shallowMount 不渲染子组件模板，不能用它断言子组件内部的输入框。\n\n3. Vitest 只运行测试函数。从打开页面到看见结果的那一条路径不放在这次挂载里，交给浏览器测试。',
    keywords:'Vue Test Utils mount shallowMount Vitest setValue',
    points:['Vitest 运行测试函数，不负责渲染 Vue 组件','mount 渲染组件及其子组件，shallowMount 把子组件换成桩','wrapper.get 找不到就失败，find 找不到时 exists 为 false'],
    deep:[
      {title:'运行器和挂载',body:'Vitest 调用 test 里的函数并核对 expect。单文件组件要先经过 mount，模板里的输入框才会出现在包装上。只导入 .vue 文件并查询字符串，读不到 v-model 的当前值。'},
      {title:'怎样自己验证',body:'写一个只有备注输入框的组件。测试里先 mount，再 setValue，断言包装文字包含刚写入的备注。把 mount 换成 shallowMount 去查一个子组件内部的输入框，这次应找不到。'}
    ],
    refs:[
      ['Vue：测试','https://vuejs.org/guide/scaling-up/testing.html'],
      ['Vue Test Utils：挂载组件','https://test-utils.vuejs.org/guide/'],
      ['Vitest：入门','https://vitest.dev/guide/']
    ]
  },
  {
    track:'frontend', group:'测试', id:'playwright-user-journey',
    title:'端到端只覆盖一条真正的用户路径',
    prompt:'是不是每个函数都该配一条浏览器测试？',
    core:'Playwright 在真实浏览器里打开页面、操作元素并等待结果。它适合一条用户看得到的路径：打开、填写、提交、看到成功或错误。自动等待减少了手写 sleep，但浏览器测试更慢，也更依赖环境。函数的分支、边界和纯计算放在单元测试。用浏览器测试去锁内部状态，会又慢又脆。顺序是先打开页面、再填写提交、然后等待用户看得到的成功或错误。自动等待代替固定休眠，但每条浏览器测试都更慢，也更依赖环境。边界是函数的分支、纯计算和内部字段留在单元测试；浏览器测试一旦去锁这些实现细节，失败就不再对应一条用户路径。启动一次浏览器只为了守住这条可见路径，细分支的失败必须能在不打开页面时复现。',
    why:'学习者会以为每个函数都该配一条浏览器测试。分支一多，整套反馈变慢，失败时分不清是价格算错了还是页面没出来，于是他把计算也塞进浏览器。浏览器只守住从打开到看见结果的那一条，单元测试仍能单独打出计算错误，才说明两条不该混在一次启动里。',
    example:'登录后看到订单列表，用一条浏览器测试打开页面、提交并等到列表出现，中途不写固定的 sleep。价格四舍五入的四个边界放在单元测试里，不启动浏览器也能失败并指出哪一次舍入错了。把这四个边界塞进浏览器测试后，失败只显示页面超时，看不出是计算问题。',
    task:'选一条从进入页面到看到结果的路径写出浏览器测试，再指出哪三个分支不该放进这条测试。',
    answer:'浏览器测试只覆盖从进入页面到看到结果的这一条路径，等待由运行器处理。价格四舍五入、空列表边界和权限不足这三类分支不该放进这条测试，它们应在单元测试里断言返回值。用浏览器去锁内部状态，会又慢又脆，失败也指不出是哪一个函数算错。三个分支各自的断言不应依赖浏览器是否启动。',
    keywords:'Playwright end to end browser test 用户路径',
    points:['浏览器测试覆盖用户走完的一条路径','等待由测试运行器处理，而不是固定 sleep','细分支留在单元测试，避免每条都启动浏览器'],
    deep:[
      {title:'用户路径与分支',body:'浏览器测试适合一条看得到的路径：打开、填写、提交、看到成功或错误。自动等待减少手写休眠，但启动更慢。函数分支和纯计算放在单元测试。用浏览器去锁内部状态，失败时分不清是计算错了还是页面没出来。'},
      {title:'怎样自己验证',body:'选一条从进入页面到看到结果的路径写成浏览器测试，确认它在结果出现前会等待而不是 sleep 固定秒数。再把三个计算分支留在单元测试里，单独跑它们时应不必启动浏览器。'}
    ],
    refs:[['Playwright：简介','https://playwright.dev/docs/intro'],['Playwright：自动等待','https://playwright.dev/docs/actionability']]
  },
  {
    track:'java', group:'测试', id:'spring-test-slice',
    title:'整容器测试和切片测试解决的不是同一个问题',
    prompt:'每个测试都标 @SpringBootTest，为什么一套测试要跑很久，而且一改无关 Bean 就失败？',
    promptAnswer:'切片只装一层，快且边界清。整容器证明接线；两者失败原因不能互相代替。',
    core:'@SpringBootTest 启动完整应用上下文，适合看几层是否真的连在一起。@WebMvcTest 只装 Web 层，协作的服务用测试替身提供，用来检查路由、参数和状态码。完整上下文更慢，也会因为无关配置或 Bean 缺失而失败。切片测试通过了，也不证明数据库和事务边界是对的。选择哪一种，取决于你要证明的是接线还是这一层的行为。',
    why:'学习者会给每个测试都标上整容器启动。一套测试要跑很久，改一个无关 Bean 就失败，失败栈却在上下文而不是在这条路由上。切片测试在路由改错时失败、在无关配置缺失时仍通过，整容器测试正好相反，才说明两种测试证明的不是同一件事。',
    example:'参数校验用只装 Web 层的测试，缺一个无关的数据库 Bean 时仍能返回 400。把同一个断言放进整容器测试后，缺配置会导致上下文起不来，路由本身没有被执行。订单真正写入数据库的路径另用带数据库的测试，切片通过并不能让这张表里出现新行。',
    task:'为一个控制器分别写切片测试和整容器测试，记录各自会在什么改动下失败。',
    answer:'切片测试在路由、参数和状态码改错时失败，无关 Bean 缺失时仍可通过，因为它只装这一层并用替身代替协作对象。整容器测试在接线或配置缺失时失败，用来证明几层真的连在一起。切片通过并不证明数据库和事务边界，两种失败不能互相代替。无关配置缺失只应让整容器起不来，不应让切片的状态码断言失效。',
    keywords:'Spring Boot @SpringBootTest @WebMvcTest 测试切片',
    points:['完整应用上下文用来证明各层连在一起','Web 切片只装 Web 层，协作对象用替身','切片通过并不证明数据库和事务'],
    deep:[
      {title:'切片与整容器',body:'整容器测试启动完整应用上下文，适合看几层是否连在一起，也更慢，会因无关配置缺失而失败。Web 切片只装 Web 层，协作的服务用替身，用来检查路由、参数和状态码。切片通过了，也不证明数据库和事务是对的。'},
      {title:'怎样自己验证',body:'为同一个控制器写切片和整容器两种测试。删掉一个无关 Bean，切片应仍能断言状态码，整容器应在启动上下文时失败。再改错路由，两条才都应失败。改错路由时两种测试才都应失败，缺无关 Bean 时只有整容器失败。'}
    ],
    refs:[['Spring Boot：测试应用','https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html'],['Spring Boot：切片测试','https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html#testing.spring-boot-applications.slicing']]
  },
  {
    track:'java', group:'测试', id:'test-observable-result',
    title:'断言结果，不断言私有字段',
    prompt:'用反射读 private 字段来判断测试通过，重构后会发生什么？',
    core:'测试要锁定调用方看得到的结果：返回值、抛出的异常、输出和持久化之后能再读到的状态。私有字段和调用次数属于当前实现。实现换成另一种结构后，行为没变，这种测试也会失败。JUnit 的断言表达期望结果。需要异常时断言异常类型和关键信息，而不是抓住 Exception 后看一个内部标志。顺序是先调用公开方法，再断言返回值、抛出的异常或持久化之后能再读到的状态。私有字段和调用次数属于当前实现，结构一换，行为没变也会红。边界是需要异常时断言异常类型和关键信息，而不是抓住笼统异常后检查一个内部布尔。重命名或换成另一种私有结构时测试必须仍然通过，只有调用方看得到的结果变了才允许失败。',
    why:'学习者会用反射读私有字段来判断通过。重命名字段或换成另一种结构后，行为没变，测试却失败，真正的返回值错了时如果忘了断言反而仍是绿的。重命名私有字段后测试仍通过、改返回值后才失败，才说明锁住的是调用方看得到的结果。',
    example:'保存用户后用查询确认邮箱已写入，测试通过。把仓库里的私有 list 字段改名，这条测试仍然通过。若改成反射读取该字段，同一次改名会失败。非法邮箱应抛出约定的异常类型；把某个内部布尔设为 false 而返回值仍是成功时，按结果断言的测试会失败。',
    task:'找一个读取私有字段的测试，改成调用公开方法并断言返回值或异常，再重命名私有字段确认测试仍通过。',
    answer:'读取私有字段的测试在重命名该字段后失败，即使公开行为没变。改成调用公开方法并断言返回值、异常或之后能再读到的状态后，重命名私有字段测试仍通过。异常要断言类型和关键信息，不要抓住一个笼统异常再去看内部标志。重命名私有字段后仍通过，改掉返回值后才失败，这才是该锁住的行为。',
    keywords:'JUnit assertion observable behavior 私有字段 测试',
    points:['断言返回值、异常和之后能读到的状态','私有字段属于实现，不属于契约','异常要断言类型和关键信息'],
    deep:[
      {title:'可观察结果',body:'测试要锁定调用方看得到的结果：返回值、异常、输出，以及保存之后能再读到的状态。私有字段和内部调用次数属于当前实现。实现换成另一种结构后，行为没变，绑在字段上的测试也会失败。'},
      {title:'怎样自己验证',body:'找一个用反射读私有字段的测试，改成调用公开方法并断言返回值或异常。重命名那个私有字段后再跑，测试应仍通过；改掉返回值后才应失败。反射读取字段的旧测试在改名后会失败，公开方法那条不应失败。'}
    ],
    refs:[['JUnit 5：断言','https://junit.org/junit5/docs/current/user-guide/#writing-tests-assertions']]
  },
  {
    track:'java', group:'安全', id:'object-level-authz',
    title:'登录了，也不等于能读这条数据',
    prompt:'接口已经要求登录，为什么还要检查这条订单属于谁？',
    promptAnswer:'已登录不等于能访问任意 id。还要查这条资源是否属于当前用户。',
    core:'认证只说明请求有身份。角色说明这类人可以做哪类操作。对象级授权说明这个身份能不能动这一条数据。只判断“已登录”或“是用户角色”，攻击者换一个订单号就能读到别人的订单。检查要放在服务端，用资源的拥有者或显式权限，而不是相信客户端传来的用户 id。方法安全可以把这个判断放在调用业务之前。顺序是先认证身份，再看角色允许哪类操作，最后核对这个身份能不能动这一条数据。只判断已登录或是用户角色，换一个订单号就能读到别人的订单。边界是检查必须在服务端用拥有者或显式权限完成，不能相信客户端传来的用户 id，前端把入口藏起来也不是这层检查。换一个资源编号就能读到别人的数据时，登录和角色都已经通过，缺的是这一条的拥有者条件。',
    why:'学习者会以为接口要求了登录，就不会读到别人的数据。已登录用户换一个订单号仍返回 200 和别人的订单，角色检查也挡不住，于是他只在前端藏起入口。加上拥有者条件后同一请求变为拒绝，才说明身份和这一条资源的权限是两层。',
    example:'用户 A 和用户 B 都已登录。只校验登录时，A 携带 B 的订单号请求，响应 200，正文是 B 的订单。查询改成当前用户 id 加上这个订单号后，同一请求查不到行，响应变为拒绝，B 自己的请求仍然 200。前端没有改 id，服务端仍要做这一次核对。',
    task:'用两个已登录用户互相访问对方的资源 id，确认只校验登录时会成功，加上拥有者条件后会拒绝。',
    answer:'只校验登录时，两个已登录用户互相访问对方的资源 id 会成功，因为身份已经成立，角色也允许这类操作。加上拥有者条件后，对方的 id 查不到属于自己的那一行，请求被拒绝，自己的 id 仍然成功。资源 id 来自客户端，不能相信客户端传来的用户 id。',
    keywords:'Spring Security 对象级授权 IDOR 水平越权',
    points:['登录只证明身份，不证明能访问这条数据','角色不能代替对具体资源的检查','资源标识来自客户端时仍由服务端核对拥有者'],
    deep:[
      {title:'对象级授权',body:'认证只说明请求有身份。角色说明这类人可以做哪类操作。对象级授权说明这个身份能不能动这一条数据。资源标识来自客户端时，仍要用当前用户核对拥有者。先按订单号取出再指望前端不改 id，挡不住换号访问。'},
      {title:'怎样自己验证',body:'用两个已登录用户互相携带对方的资源 id 访问。只校验登录时应成功并返回对方的数据。加上拥有者条件后，对方的请求应被拒绝，自己的请求仍成功。对方的订单号应被拒绝，自己的订单号仍返回 200，两次要同时记录。'}
    ],
    refs:[['Spring Security：方法安全','https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html']]
  },
  {
    track:'java', group:'安全', id:'abac-subject-object-attributes',
    title:'ABAC 按主体和客体的属性评估规则',
    prompt:'心内科来了第二位护士，为什么不必再为每本病历写一条名单？',
    promptAnswer:'〔ABAC｜按主体、客体、动作和环境的属性来评估规则的访问控制〕写的是属性组合。新人带上同样的属性即可。',
    core:'NIST 把 ABAC 定义为一种逻辑访问控制：对客体的访问，由规则去评估主体属性、客体属性、动作，以及与这次请求相关的环境条件。属性是可以赋值的特征。基本形式是这些属性加上一条写明何种组合可以做何种操作的规则。NIST 的例子是：心内科的执业护士可以查看心脏病患者的病历。规则不给每一位护士和每一本病历各写一条关系。新来的人只要被赋上规则要求的属性，已有规则和客体都不必改。某一条订单属于谁，仍是对象级授权，见 object-level-authz。角色名单独通过，也不等于属性组合已经满足。',
    why:'学习者会给每一位护士单独登记可以打开的病历编号。第二个人入职时要改每一条关系，科室一变又要重写。区分信号是：两位护士的科室和职务相同，同一条规则都允许查看；科室不同的人被拒绝，规则文本没有为新人改过。',
    example:'规则只比较属性，不登记具体的人：\n\n```java\nrecord Subject(String role, String department) {}\nrecord Folder(String kind) {}\n\nstatic boolean allowView(Subject subject, Folder folder, String action) {\n  return "view".equals(action)\n      && "Nurse Practitioner".equals(subject.role())\n      && "Cardiology".equals(subject.department())\n      && "Heart Patients".equals(folder.kind());\n}\n```',
    task:'写出这条查看规则用到的主体属性和客体属性，以及新护士入职时要改规则还是要赋属性。',
    answer:'1. 决策评估主体属性、客体属性、动作，以及与请求相关的环境条件。\n\n2. 查看心脏病历这条规则用的是职务 Nurse Practitioner、科室 Cardiology 和病历种类 Heart Patients。\n\n3. 新护士入职时赋上同样的属性，不必修改已有规则，也不必为每一本病历再写一条关系。某一条记录的拥有者仍另外核对。',
    keywords:'ABAC NIST SP 800-162 主体属性 客体属性 环境条件',
    points:['决策评估主体属性、客体属性、动作和环境条件','规则写属性组合，不为每个人和每条记录各写关系','新主体赋上规则要求的属性即可，不必改已有规则'],
    deep:[
      {title:'和某一条记录的拥有者',body:'对象级授权回答这条订单是不是当前用户的。ABAC 回答一组属性是否满足规则，例如科室和病历种类。两条可以同时存在。只保存角色名、不看科室和病历种类，还不是这条规则。'},
      {title:'怎样自己验证',body:'用两位职务和科室都相同的护士调用 allowView，对心脏病历的查看都应允许，规则源码不变。把其中一位的科室改成别的值，同一次查看应拒绝。环境条件本例没有使用。若规则再要求班次，同一人在班次外应拒绝，仍然不必新增人与病历的对应行。'}
    ],
    refs:[
      ['NIST：Attribute Based Access Control','https://csrc.nist.gov/projects/attribute-based-access-control'],
      ['NIST SP 800-162','https://csrc.nist.gov/pubs/sp/800/162/final']
    ]
  },
  {
    track:'java', group:'安全', id:'runtime-config',
    title:'口令和地址属于运行环境，不属于构建产物',
    prompt:'把生产数据库密码写进打好的 jar，换环境时为什么会带错？',
    promptAnswer:'密钥放运行环境注入，不进 jar 与镜像层。同一制品靠启动配置区分环境。',
    core:'十二要素把配置定义为随环境变化的一切：数据库地址、口令、第三方密钥。这些值应在进程启动时从环境注入，而不是写进仓库或打进同一个制品。同一份构建产物可以部署到测试和生产，差别只在运行环境。前端包里的变量谁都能下载；服务端口令如果进了镜像层或 Git 历史，就不再是秘密。缺配置时应启动失败，而不是静默连上错误的库。顺序是构建出一份不含口令的制品，启动时再按环境注入地址和密钥。同一份产物可以部署到测试和生产。边界是缺配置时应启动失败，而不是静默连上错误的库；口令一旦进了仓库、镜像层或前端包，就跟着构建日志走，不再是只在运行环境里的秘密。测试和生产如果各打一份带口令的包，就已经不是同一制品，泄露面也会跟着镜像走。',
    why:'学习者会把生产数据库口令写进打好的包，以为换环境时不会带错。测试包和生产包不再是同一份，构建日志和镜像里都能搜到口令，换环境却还在用编进去的地址。同一制品在两边只靠启动时注入区分、去掉变量就拒绝启动，才说明口令不属于构建产物。',
    example:'在打好的包和 Git 历史里搜索口令字符串，两边都不应出现。生产进程从环境注入数据源口令，本地用另一组值，两边跑的是同一份包。去掉该变量后进程拒绝启动，而不是静默连上错误的库。把口令写进包再构建，搜索又能在产物里命中。',
    task:'在构建产物和 Git 历史里搜索口令字符串，确认只能在运行环境看到；去掉该变量后，进程应拒绝启动。',
    answer:'构建产物和 Git 历史里搜不到口令，口令只出现在运行环境的注入里。同一份制品部署到测试和生产，差别只是启动时的地址和口令。去掉该变量后进程应拒绝启动，不能用生产值当默认值。前端包里的变量谁都能下载，服务端口令也不能进镜像层。搜不到口令的那份制品才可以同时部署到测试和生产。',
    keywords:'12 factor config secret environment 配置 密钥',
    points:['随环境变化的值放在运行时配置','同一构建产物用不同环境的注入来区分','口令不进入仓库、镜像层和前端包'],
    deep:[
      {title:'运行时注入',body:'随环境变化的地址、口令和第三方密钥应在进程启动时注入，而不是写进仓库或打进同一个制品。同一份构建可以部署到不同环境。前端包里的值谁都能下载。缺配置时应启动失败，不要用生产值当默认。'},
      {title:'怎样自己验证',body:'在构建产物和 Git 历史里搜索口令字符串，应搜不到。只在运行环境里设置该变量时进程能启动；去掉变量后应拒绝启动，而不是连上另一个库。去掉变量后的失败应发生在启动，而不是第一次查询连到错误的库。'}
    ],
    refs:[['十二要素：配置','https://12factor.net/config'],['Spring Boot：外部化配置','https://docs.spring.io/spring-boot/reference/features/external-config.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_PATH_03) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
