/* Batch 11: Spring interview PDF scope catalog correction. */
const COVERAGE_JAVA_11 = [
  {
    track:'java', group:'框架', id:'spring-scope-catalog',
    title:'Spring 内建作用域：别背 global-session 那一套',
    prompt:'为什么“Spring 支持五种作用域，其中包括 global-session，且框架里的 bean 都是单件”不能当现行答案？',
    core:'作用域描述容器如何创建并共享某个 bean 定义的实例，不是“Spring 里只有单例”。默认确实常常是 singleton：每个容器一个共享实例。现行文档列出的常用内建作用域包括 singleton、prototype，以及 Web 环境下的 request、session、application、websocket；还可以注册自定义作用域。旧资料里的 global-session 来自 Portlet 全局会话语境，不应再当作通用 Web 应用的标准五项之一。singleton 属性或 scope 写错，只会改变实例数量与生命周期，不会自动带来字段级线程安全。',
    why:'背过时的五种含 global-session，会在现代 Spring MVC/WebFlux 项目里说错作用域菜单，也会把默认单例理解成“所有 bean 只能单例”。',
    example:'无状态 Service 用默认 singleton；每请求的表单草稿用 request 作用域或干脆放方法局部变量。不要去找一个已不在常规清单里的 global-session 来解释普通浏览器会话。',
    task:'对照当前 Spring Bean Scopes 文档列出内建作用域，划掉资料中的 global-session，并说明为何“都是单件”与 prototype/request 矛盾。',
    answer:'对照现行文档，内建作用域是 singleton、prototype，Web 里还有 request、session、application、websocket。global-session 划掉，它不是这张清单上的通用答案。默认常常是 singleton，但 prototype 每次新建，request 每个请求一份，所以不能说框架里的 bean 都是单件。',
    keywords:'Spring bean scope singleton prototype request session application websocket global-session',
    points:['默认常为 singleton，但存在多种内建作用域','Web 作用域含 request/session/application/websocket','global-session 属旧 Portlet 语境，不宜当通用五项'],
    deep:[
      {title:'默认不是唯一',body:'没写作用域时，容器里的 bean 通常是 singleton，整个容器一份。这只是默认。prototype 每次获取都新建，Web 作用域跟着请求或会话，和“全都是单件”直接矛盾。'},
      {title:'怎样自己验证',body:'打开当前 Bean Scopes 文档，抄下内建名字，把资料里的 global-session 划掉。再声明一个 prototype 和一个 request 作用域，看是不是每次或每个请求都是另一份。'},
    ],
    refs:[['Spring：Bean Scopes','https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_11) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
