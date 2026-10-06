# Java 资料核验记录：Spring 面试题（含答案）（批次 11）

本批结案私人题库 `6-Java专题分类/Spring/Spring面试题（含答案）.pdf`（10 页、约 69 题）。PDF 仅用于本机比对。基线：Spring Framework 当前参考文档；弃用边界对照 5.3 javadoc。此前知识准确性审查已抽查第 2、4、7 页若干题；本批把整份说法级队列结案。

| 范围 | 待核说法（概述） | 结论 | 课程 |
| --- | --- | --- | --- |
| Q5–6 | 最常用 BeanFactory 是 XmlBeanFactory | **过时。** 已由 `spring-legacy-config` 覆盖。 | `spring-legacy-config` |
| Q21、25 | 框架 beans 都是单件；五种作用域含 global-session | **过时/不完整。** 默认常为 singleton，但不是“都是单件”。现行内建作用域含 singleton、prototype、request、session、application、websocket；`global-session` 属旧 Portlet 语境。 | `spring-scope-catalog`；线程安全见 `spring-scopes` |
| Q26 | 单例 bean 不是线程安全的 | **绝对化。** 作用域≠线程安全；见 `spring-scopes`。 | `spring-scopes` |
| Q38–39 | 必须配 annotation-config；@Required 标必需属性 | **过时当通用答案。** 注解驱动在 Boot/Java config 下常见路径不同；@Required 已弃用。见 `spring-legacy-config`。 | `spring-legacy-config` |
| Q3、10 | 模块列表含 Web-Struts 等 | **历史模块图。** 不应当作当前 Spring 发行版模块清单背诵。 | 无（题干级过时清单） |
| Q12–20、IOC/DI | IOC/DI/构造器与 setter | **方向可接受**，细节随版本与 Boot 惯例变化；强制依赖优先构造器与现行文档一致。 | 无单开 |
| Q27–35 | 生命周期、内部 bean、集合、自动装配 | **概要级。** 生命周期更细阶段见既有 `spring-bean-lifecycle`；自动装配方式名有历史包袱，现代更常用 `@Autowired`/构造器。 | `spring-bean-lifecycle`（既有） |
| Q42–50 | JDBC/ORM/事务 | **方向可接受。** 事务细节见既有事务课；HibernateTemplate 等属偏旧集成叙事。 | 既有事务课 |
| Q51–63 | AOP 术语 | **术语级可接受**，不逐条升格为现行最佳实践课。 | 无 |
| Q64–69 | MVC / DispatcherServlet / 注解 | **方向可接受。** 分发细节见 `spring-mvc-dispatch`。 | `spring-mvc-dispatch` |

## 官方依据

- [Spring：Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)
- [Spring：Annotation-based Container Configuration](https://docs.spring.io/spring-framework/reference/core/beans/annotation-config.html)
- [Spring 5.3：Deprecated API](https://docs.spring.io/spring-framework/docs/5.3.x/javadoc-api/deprecated-list.html)
- [Spring 5.3：XmlBeanFactory](https://docs.spring.io/spring-framework/docs/5.3.x/javadoc-api/org/springframework/beans/factory/xml/XmlBeanFactory.html)

本记录不是对题库原文的背书；过时模块名与开放叙述题不单开公开课。整份文件级可标「已核验」。
