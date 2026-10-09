/* Java 64: W3CSchool 续扫 — 触发器副作用边界（Pipeline≠原子见既有 redis-pipeline）。 */
const COVERAGE_JAVA_64 = [
  {
    track:'java', group:'数据库', id:'mysql-trigger-side-effect-hidden',
    title:'触发器是隐蔽副作用，不是自动正确的业务层',
    prompt:'为什么应用只写了一条 INSERT，库存却被改了，代码里找不到 UPDATE？',
    core:'**触发器**在指定表上对 INSERT/UPDATE/DELETE（及时机 BEFORE/AFTER）自动跑的一段 SQL。它和语句通常处在**同一事务**里：外层回滚，触发器改动一并撤销（具体以引擎与语句类型为准）。好处是库内强制约束；代价是**调用方源码看不见**这条路径，排障、性能和权限都变难。不要用触发器代替明确的应用用例与事务边界，见 `mysql-procedure-not-auto-txn`。团队“禁止触发器”多半是容量与可维护性启发式，不是 SQL 真理——和“禁止 JOIN”同类，见 `mysql-join-ban-not-absolute`。',
    why:'以为业务只在 Java 服务里，库内 BEFORE INSERT 又改了别的表，对账对不上；或误以为禁触发器是数据库定律。',
    example:'订单 INSERT 触发器里 UPDATE 库存。应用日志只有 insertOrder。库存异常时要查 `SHOW TRIGGERS` / information_schema，而不是只搜 Java。若团队禁用触发器，库存扣减应显式写在同一应用事务里。',
    task:'划掉“触发器=隐形微服务，永远更安全”和“触发器绝对禁止=SQL 规定”。写出：触发器相对应用代码的可见性；禁令通常保护什么。',
    answer:'触发器在库内自动跑，应用源码默认看不见。禁令多为可维护性/容量启发式。业务不变量仍应能在显式路径上讲清。',
    keywords:'MySQL 触发器 副作用 事务 可维护性',
    points:['触发器在 DML 时自动执行，源码侧常不可见','通常与语句同事务，但排障成本高','禁止触发器是团队启发式，不是语法禁令'],
    deep:[
      {title:'和存储过程',body:'过程要 CALL 才跑；触发器挂在表事件上。两者都不是“自动分布式事务”。'},
      {title:'怎样自己验证',body:'建 AFTER INSERT 触发器改另一表，应用只 INSERT 后查第二表。SHOW TRIGGERS 应列出。关掉触发器后同样 INSERT 不应再改第二表。'}
    ],
    refs:[['MySQL：触发器','https://dev.mysql.com/doc/refman/8.4/en/triggers.html'],['MySQL：TRIGGER 语法','https://dev.mysql.com/doc/refman/8.4/en/create-trigger.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_64) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
