/** 发散问答。不放进 LEARNING_TASKS，核心挑战仍是原来的三档。 */

export type GateOpenQuestion = {
  id: string
  gateId: string
  title: string
  objective: string
  answer: string
  basis: string
}

export const GATE_OPEN_QUESTIONS: readonly GateOpenQuestion[] = [
  {
    id: 'g3.open-keyset',
    gateId: 'g3',
    title: '键集分页的下一页条件',
    objective: '时间相同时，写出不会在相邻两页重复、也不会漏掉的比较。',
    basis: '键集分页：排序必须稳定且唯一，下一页的比较和 ORDER BY 用同一组键。',
    answer: [
      '只用 created_at 当游标时，时间相同的两行会在相邻两页重复，或被下一页漏掉。',
      '排序要带上能分开两行的列。下面按时间升序，再按主键升序。游标是上一页最后一行的时间和主键。',
      '',
      '```sql',
      'SELECT id, created_at',
      'FROM orders',
      'WHERE created_at > ?',
      '   OR (created_at = ? AND id > ?)',
      'ORDER BY created_at, id',
      'LIMIT ?',
      '```',
      '',
      '两个问号先填上一页最后一行的 created_at，再填它的 id。比较和 ORDER BY 用的是同一组键。',
      '并发插入或删除仍会让后一页相对第一次查询漂移。唯一排序只避免相邻页因相同键重复或漏项。',
    ].join('\n'),
  },
  {
    id: 'g4.open-owner',
    gateId: 'g4',
    title: '这一行是不是这个人的',
    objective: '登录成功之后，写出服务端还要核对的那一次比较。',
    basis: '登录只证明这次请求是谁。服务端仍要核对这个身份能不能动这一条资源。',
    answer: [
      '登录成功只说明这次请求是谁。前端把按钮藏起来，也只影响这一次页面。',
      '读出这一行之后，还要比对它属于谁。对不上就拒绝，不要把订单返回去。',
      '',
      '```java',
      '@GetMapping("/orders/{id}")',
      'Order get(@PathVariable String id) {',
      '  Order order = orders.find(id);',
      '  if (!order.userId().equals(currentUserId())) {',
      '    throw new ResponseStatusException(HttpStatus.FORBIDDEN);',
      '  }',
      '  return order;',
      '}',
      '```',
      '',
      '换一条别人的订单号，比较失败，响应是 403。按钮在不在页面上，改变不了这次比较。',
    ].join('\n'),
  },
  {
    id: 'g5.open-observable',
    gateId: 'g5',
    title: '断言外面看得到的结果',
    objective: '写出库存不足时，测试应该钉住的状态码和订单数。',
    basis: '把内部调用都替成成功，只证明替身按假设走通。断言要钉住可观察的行为。',
    answer: [
      '内部方法都被替成成功时，只说明替身按写好的假设走通了。',
      '库存不足这一次，外面看得到的是拒绝，以及订单没有多出一笔。',
      '',
      '```java',
      'ResponseEntity<ProblemDetail> response = postOrder(sku, 1);',
      '',
      'assertThat(response.getStatusCode().value()).isEqualTo(409);',
      'assertThat(orders.count()).isEqualTo(1);',
      '```',
      '',
      '改一个内部函数的名字，这两条断言仍应成立。它们看的是响应和留下的订单，不是替身被调用了几次。',
    ].join('\n'),
  },
  {
    id: 'g6.open-measure',
    gateId: 'g6',
    title: '先量这次更新再决定缓存',
    objective: '写出包上缓存之后仍要先测量的原因，并给出候选写法。',
    basis: 'React.memo 与 Vue 的缓存都有前提。包上或打开之后，页面不一定更快。先测量这次更新，再决定要不要用。',
    answer: [
      '包上缓存不一定更快。比较本身有成本。传入的对象每次都是新的时，比较会一直失败，更新照样发生。',
      '下面是候选写法，不是已经更快的证明。先量这次更新，没有变快就拿掉。',
      '',
      '```tsx',
      'import { memo } from "react"',
      '',
      'const Row = memo(function Row({ id }: { id: string }) {',
      '  return <li>{id}</li>',
      '})',
      '```',
      '',
      '量的是这一次列表更新的耗时，不是包上之后的感觉。动态依赖每次新建时，先稳定传入的值，再决定留不留这层缓存。',
    ].join('\n'),
  },
]

export function openQuestionsForGate(gateId: string): readonly GateOpenQuestion[] {
  return GATE_OPEN_QUESTIONS.filter((item) => item.gateId === gateId)
}

export function openQuestionById(id: string | undefined): GateOpenQuestion | undefined {
  if (!id) return undefined
  return GATE_OPEN_QUESTIONS.find((item) => item.id === id)
}
