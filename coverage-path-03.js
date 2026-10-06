/* Visible path stages: testing and security were previously buried in 工程实践. */
const COVERAGE_PATH_03 = [
  {
    track:'frontend', group:'测试', id:'testing-library-role',
    title:'用角色和名字找元素，不用类名',
    prompt:'测试里写 container.querySelector(".submit")，重构样式后为什么会碎？',
    core:'Testing Library 建议按用户能感知的方式查询。优先级最高的是 getByRole，再配合可访问名称，例如按钮的文字。类名、测试 id 和组件内部结构会随重构改变，用户却仍然看见同一个按钮。getBy 在找不到时立刻失败。queryBy 用于断言某个元素不存在。找不到时先看元素有没有可访问角色，而不是再加一层选择器。',
    why:'测试如果绑在实现细节上，改一个类名就失败，真正的交互坏了却可能仍然通过。',
    example:'保存按钮用 getByRole("button", { name: "保存" })。不要用 .btn-primary。页面上没有“保存”时，这个查询会失败并指出有哪些角色。',
    task:'把一个用类名点击按钮的测试改成按按钮角色和名称查询，然后只改类名、不改按钮文字，确认测试仍然通过。',
    answer:'查询用户看得到的角色和名称。类名留给样式。断言元素不存在时用 queryBy，而不是把 getBy 包进 try。',
    keywords:'Testing Library getByRole accessible name 组件测试',
    points:['优先用角色和可访问名称查询','类名和内部结构不是用户契约','getBy 找不到就失败，queryBy 用来断言不存在'],
    refs:[['Testing Library：查询优先级','https://testing-library.com/docs/queries/about/'],['Testing Library：ByRole','https://testing-library.com/docs/queries/byrole/']]
  },
  {
    track:'frontend', group:'测试', id:'playwright-user-journey',
    title:'端到端只覆盖一条真正的用户路径',
    prompt:'是不是每个函数都该配一条浏览器测试？',
    core:'Playwright 在真实浏览器里打开页面、操作元素并等待结果。它适合一条用户看得到的路径：打开、填写、提交、看到成功或错误。自动等待减少了手写 sleep，但浏览器测试更慢，也更依赖环境。函数的分支、边界和纯计算放在单元测试。用浏览器测试去锁内部状态，会又慢又脆。',
    why:'全部堆进浏览器，反馈变慢，失败时也不知道是计算错了还是页面没出来。',
    example:'登录后看到订单列表，用一条 Playwright 测试守住。价格计算的四舍五入用单元测试，不启动浏览器。',
    task:'选一条从进入页面到看到结果的路径写出浏览器测试，再指出哪三个分支不该放进这条测试。',
    answer:'浏览器测试守住关键路径和真实等待。分支和计算留在更快的测试里。',
    keywords:'Playwright end to end browser test 用户路径',
    points:['浏览器测试覆盖用户走完的一条路径','等待由测试运行器处理，而不是固定 sleep','细分支留在单元测试，避免每条都启动浏览器'],
    refs:[['Playwright：简介','https://playwright.dev/docs/intro'],['Playwright：自动等待','https://playwright.dev/docs/actionability']]
  },
  {
    track:'java', group:'测试', id:'spring-test-slice',
    title:'整容器测试和切片测试解决的不是同一个问题',
    prompt:'每个测试都标 @SpringBootTest，为什么一套测试要跑很久，而且一改无关 Bean 就失败？',
    core:'@SpringBootTest 启动完整应用上下文，适合看几层是否真的连在一起。@WebMvcTest 只装 Web 层，协作的服务用测试替身提供，用来检查路由、参数和状态码。完整上下文更慢，也会因为无关配置或 Bean 缺失而失败。切片测试通过了，也不证明数据库和事务边界是对的。选择哪一种，取决于你要证明的是接线还是这一层的行为。',
    why:'把所有测试都变成启动整个应用，失败难定位，提交一次要等整套上下文反复起来。',
    example:'参数校验和 400 响应用 @WebMvcTest。订单服务真正写入数据库的路径，另用包含数据库的测试，而不是假装切片已经证明了持久化。',
    task:'为一个控制器分别写切片测试和整容器测试，记录各自会在什么改动下失败。',
    answer:'切片证明这一层。整容器证明接线。不要用一种测试代替另一种要证明的事。',
    keywords:'Spring Boot @SpringBootTest @WebMvcTest 测试切片',
    points:['完整应用上下文用来证明各层连在一起','Web 切片只装 Web 层，协作对象用替身','切片通过并不证明数据库和事务'],
    refs:[['Spring Boot：测试应用','https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html'],['Spring Boot：切片测试','https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html#testing.spring-boot-applications.slicing']]
  },
  {
    track:'java', group:'测试', id:'test-observable-result',
    title:'断言结果，不断言私有字段',
    prompt:'用反射读 private 字段来判断测试通过，重构后会发生什么？',
    core:'测试要锁定调用方看得到的结果：返回值、抛出的异常、输出和持久化之后能再读到的状态。私有字段和调用次数属于当前实现。实现换成另一种结构后，行为没变，这种测试也会失败。JUnit 的断言表达期望结果。需要异常时断言异常类型和关键信息，而不是抓住 Exception 后看一个内部标志。',
    why:'测试一旦绑死实现，每次整理代码都要改测试，真正的行为回归却可能没有断言。',
    example:'保存用户后，用查询确认邮箱已写入。不要反射读取 repository 里的 list 字段。非法邮箱应抛出约定的异常，而不是把某个 boolean 设为 false。',
    task:'找一个读取私有字段的测试，改成调用公开方法并断言返回值或异常，再重命名私有字段确认测试仍通过。',
    answer:'断言调用方能观察到的结果。私有结构可以变。异常用断言表达，不要靠内部标志。',
    keywords:'JUnit assertion observable behavior 私有字段 测试',
    points:['断言返回值、异常和之后能读到的状态','私有字段属于实现，不属于契约','异常要断言类型和关键信息'],
    refs:[['JUnit 5：断言','https://junit.org/junit5/docs/current/user-guide/#writing-tests-assertions']]
  },
  {
    track:'java', group:'安全', id:'object-level-authz',
    title:'登录了，也不等于能读这条数据',
    prompt:'接口已经要求登录，为什么还要检查这条订单属于谁？',
    core:'认证只说明请求有身份。角色说明这类人可以做哪类操作。对象级授权说明这个身份能不能动这一条数据。只判断“已登录”或“是用户角色”，攻击者换一个订单号就能读到别人的订单。检查要放在服务端，用资源的拥有者或显式权限，而不是相信客户端传来的用户 id。方法安全可以把这个判断放在调用业务之前。',
    why:'水平越权是已登录用户访问不属于自己的资源。登录校验发现不了这件事。',
    example:'读取订单时，用当前认证用户的 id 查询“该用户的这张订单”。查不到就拒绝。不要先按订单号取出，再指望前端不会改 id。',
    task:'用两个已登录用户互相访问对方的资源 id，确认只校验登录时会成功，加上拥有者条件后会拒绝。',
    answer:'身份、角色、这一条资源的权限是三层。资源 id 来自客户端时，仍要在服务端核对拥有者或权限。',
    keywords:'Spring Security 对象级授权 IDOR 水平越权',
    points:['登录只证明身份，不证明能访问这条数据','角色不能代替对具体资源的检查','资源标识来自客户端时仍由服务端核对拥有者'],
    refs:[['Spring Security：方法安全','https://docs.spring.io/spring-security/reference/servlet/authorization/method-security.html']]
  },
  {
    track:'java', group:'安全', id:'runtime-config',
    title:'口令和地址属于运行环境，不属于构建产物',
    prompt:'把生产数据库密码写进打好的 jar，换环境时为什么会带错？',
    core:'十二要素把配置定义为随环境变化的一切：数据库地址、口令、第三方密钥。这些值应在进程启动时从环境注入，而不是写进仓库或打进同一个制品。同一份构建产物可以部署到测试和生产，差别只在运行环境。前端包里的变量谁都能下载；服务端口令如果进了镜像层或 Git 历史，就不再是秘密。缺配置时应启动失败，而不是静默连上错误的库。',
    why:'制品里夹带生产口令，测试包和生产包就再也不是同一份，泄露面也跟着构建日志和镜像走。',
    example:'jar 不包含密码。生产环境用环境变量或平台的密钥注入 SPRING_DATASOURCE_PASSWORD。本地用另一组值。换环境不重新编译。',
    task:'在构建产物和 Git 历史里搜索口令字符串，确认只能在运行环境看到；去掉该变量后，进程应拒绝启动。',
    answer:'同一制品，不同环境注入不同配置。口令不进仓库、不进包。缺了就失败，不要用生产值当默认。',
    keywords:'12 factor config secret environment 配置 密钥',
    points:['随环境变化的值放在运行时配置','同一构建产物用不同环境的注入来区分','口令不进入仓库、镜像层和前端包'],
    refs:[['十二要素：配置','https://12factor.net/config'],['Spring Boot：外部化配置','https://docs.spring.io/spring-boot/reference/features/external-config.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_PATH_03) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
