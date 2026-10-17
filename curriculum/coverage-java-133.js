/* 系统设计：TCC 的画法。空回滚和悬挂的结论与 evo-tx-tcc、sca-seata-tcc-empty 一致。 */
const COVERAGE_JAVA_133 = [
  {
    track:'java', group:'系统设计', id:'draw-tx-tcc',
    title:'TCC 图画尝试、确认、取消，支付留在框外',
    prompt:'取消先于尝试到达，还能不能让后到的尝试增加预留？',
    promptAnswer:'不能。取消先到时空成功并记下已取消。后到的尝试看见这个标记必须拒绝，预留数量不变。',
    core:'这张图只回答短预留的三套接口。虚线框里只放 Try：写入预留数量，然后这一轮〔全局事务｜Seata 里用一个 XID 串起的短事务〕结束。Confirm 和 Cancel 画在框外，是后来的两次调用。用户支付也画在框外，不要放进 `reserveOnly`。\n\n〔TCC｜Try 预留，Confirm 确认，Cancel 取消〕三步都按〔XID｜这一轮全局事务的编号〕只生效一次。Confirm 把预留转成扣减。Cancel 在已经有预留时把数量还回去。\n\n取消可能比尝试先到。这叫〔空回滚｜Cancel 发现还没有 Try，直接成功，并记下这个 XID 已取消〕。后到的 Try 看见已取消必须拒绝，否则预留会〔悬挂｜数量已经占住，却没有人再来确认或取消〕。远程库存的接口不加 `@LocalTCC`；这个注解只加在库存进程里的参与者上。见 `evo-tx-tcc`。',
    example:'调用方这一轮只做 Try。确认、取消和支付都不在这个方法里：\n\n```java\npublic interface StockTcc {\n  @TwoPhaseBusinessAction(name = "stockTcc", commitMethod = "confirm", rollbackMethod = "cancel")\n  boolean tryReserve(BusinessActionContext ctx,\n      @BusinessActionContextParameter(paramName = "orderId") String orderId,\n      @BusinessActionContextParameter(paramName = "qty") int qty);\n\n  boolean confirm(BusinessActionContext ctx);\n\n  boolean cancel(BusinessActionContext ctx);\n}\n\n@GlobalTransactional\npublic void reserveOnly(String orderId, int qty) {\n  stockTcc.tryReserve(null, orderId, qty);\n}\n```\n\n库存进程里的三个方法。取消先到只记账，尝试后到直接拒绝：\n\n```java\n@LocalTCC\npublic class StockTccAction implements StockTcc {\n  public boolean tryReserve(BusinessActionContext ctx, String orderId, int qty) {\n    String xid = ctx == null ? io.seata.core.context.RootContext.getXID() : ctx.getXid();\n    if (fence.isCancelled(xid)) return false;\n    if (fence.seen(xid, "TRIED")) return true;\n    if (stock.reserveIfEnough(orderId, qty) != 1) return false;\n    fence.save(xid, orderId, "TRIED");\n    return true;\n  }\n\n  public boolean confirm(BusinessActionContext ctx) {\n    String xid = ctx.getXid();\n    if (fence.seen(xid, "CONFIRMED")) return true;\n    stock.confirmReserved(ctx.getActionContext("orderId").toString());\n    fence.save(xid, null, "CONFIRMED");\n    return true;\n  }\n\n  public boolean cancel(BusinessActionContext ctx) {\n    String xid = ctx.getXid();\n    if (fence.seen(xid, "CANCELLED")) return true;\n    if (!fence.seen(xid, "TRIED")) {\n      fence.save(xid, null, "CANCELLED");\n      return true;\n    }\n    stock.releaseReserved(ctx.getActionContext("orderId").toString());\n    fence.save(xid, null, "CANCELLED");\n    return true;\n  }\n}\n```\n\n取消先到、尝试后到，预留数量都不变。正常 Try 返回后，支付库仍没有这一单：\n\n```sql\nSELECT status FROM tcc_fence WHERE xid = ?;\nSELECT reserved FROM stock_lock WHERE order_id = ?;\nSELECT COUNT(*) FROM payment WHERE order_id = ?;\n```',
    task:'画出短框里的 Try，以及框外的 Confirm、Cancel 和用户支付。再写取消先到、尝试后到时预留数量和 fence 状态。标明远程接口加不加 @LocalTCC。',
    answer:[
      '```text',
      '短框：Try 预留 +n，然后这一轮结束',
      '框外：Confirm 预留转扣减，按 XID 一次',
      '框外：Cancel 有预留则还回去；没有预留则空成功',
      '框外：用户支付。超时另一次调用 Cancel',
      '```',
      '',
      '1. 取消先到：预留数量不变，fence 记为 CANCELLED。',
      '2. 尝试后到：返回拒绝，预留数量仍不变。',
      '3. 远程接口不加 @LocalTCC。这个注解在库存进程的参与者上。',
      '4. reserveOnly 返回后，支付库按这笔订单计数为 0。',
    ].join('\n'),
    keywords:'TCC diagram empty rollback payment outside',
    diagram:'diagrams/draw-tx-tcc.svg',
    points:['Try 写在短全局事务里并在返回时结束，Confirm、Cancel 和用户支付都画在框外','Confirm 把预留转成扣减，Cancel 有预留时还回去，两步都按 XID 只生效一次','取消先到时空成功并记下已取消，后到的尝试必须拒绝'],
    deep:[
      {title:'怎样校验',body:'先调用 Cancel，再调用 Try。预留数量应与调用前相同，fence 状态是已取消，Try 的返回值是拒绝。reserveOnly 返回后查支付库，这一单的计数应为 0。Confirm 连续调用两次，扣减只发生一次。'},
      {title:'和 Saga 图怎么分',body:'能接受已预留被看见，并用一次新的释放纠正，就用 Saga 图。必须画出 Try、Confirm、Cancel，以及取消先到时的空成功，才用这张图。'},
    ],
    refs:[['Seata：TCC 模式','https://seata.apache.org/docs/user/mode/tcc/'],['Seata：什么是 Seata','https://seata.apache.org/docs/overview/what-is-seata/']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_133) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
