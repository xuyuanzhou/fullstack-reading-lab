import type { AiNote } from './aiCatalog.ts'

type Extra = Partial<
  Pick<
    AiNote,
    | 'title'
    | 'scope'
    | 'reading'
    | 'sources'
    | 'practice'
    | 'outcomes'
    | 'prerequisites'
    | 'terms'
    | 'practiceItems'
    | 'quizzes'
    | 'experiment'
    | 'verifiedAt'
  >
>

export const AI_B4_EXTRAS: Record<string, Extra> = {
  'controlled-agent': {
    title: '受控 Agent（M08）',
    scope: '工具 schema、运行时校验、显式状态、workflow vs agent、审批绑参、幂等、预算与暂停恢复。',
    outcomes: [
      '能说明为何不是所有任务都该上 Agent',
      '能指出写工具必须审批绑定参数，且改参后旧批失效',
      '能用幂等键解释超时重试如何避免重复写入',
    ],
    prerequisites: ['agent', 'model-proposes', 'permissions', 'l1-kb'],
    terms: [
      { zh: '幂等键', en: 'idempotency key', meaning: '同一业务意图的唯一键，重复请求返回同一结果' },
      { zh: '审批指纹', en: 'approval fingerprint', meaning: '把工具名与参数哈希绑定，防批后改参' },
    ],
    reading: [
      '受控 Agent = 模型提议 + 程序校验 + 显式状态 + 有限步数。工具要有 schema；未知工具、坏参数、无权限在执行前拒绝。对话消息不是唯一状态：预算、已批准指纹、幂等账本放在运行时。',
      'Workflow 与 Agent：路径已知、步骤固定时，用 workflow 更易测（本课 L2 对照）。Agent 的价值是在读失败或信息不全时换参数/停问人——但写操作仍不能绕过审批。',
      '框架（如 LangGraph）用节点/边表达分支与人机确认；概念上与本课一致：暂停点在副作用前，最大步数在运行配置里。本课验收用 mock 规则 propose，不接现场 LLM，也不把框架教程整本搬进站。',
      '对照阅读可开 `langgraph` 卡片看节点与边；真正跑轨迹用本页 / L2 工作台。',
    ],
    practice: '在 L2 工作台跑「正常」与「拒绝审批」「改参失效」三条轨迹，记下停机原因。',
    practiceItems: [
      {
        prompt: '为何不是所有任务都上 Agent？',
        answer:
          '固定流水线用 workflow/普通代码更可测、更便宜。只有步骤事前数不清、需要根据工具结果分支时，才值得 Agent；且写操作仍要程序门禁。',
        scoring: ['workflow 对照', '可测/成本', '写操作门禁'],
      },
      {
        prompt: '工具超时后重试，如何避免重复创建订单？',
        answer: '客户端与服务端共用幂等键；超时重试带同一键；账本命中则返回已有订单，不二次扣款。',
        scoring: ['幂等键', '不双扣'],
      },
    ],
    quizzes: [
      {
        question: '为什么 JSON 可解析不等于订单工具调用可以执行？',
        answerShort: '还要 schema、权限、预算、审批指纹与业务规则。',
        answerDeep:
          '语法合法只是第一层。运行时要校验字段类型与范围、用户 ACL、政策上限；写工具要等人确认且参数指纹未变。任一层失败应停，而不是“再问模型一次”。',
        followUps: [
          {
            question: '参数被改后旧审批能复用吗？',
            points: ['不能', '指纹不一致即 stale', '需重新审批'],
          },
          {
            question: 'LangGraph 的 interrupt 应插在哪？',
            points: ['副作用节点之前', '展示具体参数', '拒绝则不执行写'],
          },
        ],
        commonMistakes: ['只靠提示词禁止乱写', '超时无幂等猛重试'],
        scoring: ['多层校验', '审批绑参'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: 'l2Agent.runL2 / runL2FaultSuite；2 读 1 模拟写。',
      steps: [
        '跑 mode=agent 正常预订。',
        '跑 deny_approval 与 mutate_args_after_approve。',
        '对照 mode=workflow 同目标。',
      ],
      expected: '轨迹含审批与停机原因；写作为模拟；unverifiedLiveModel=true。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Anthropic：Building effective agents',
        href: 'https://www.anthropic.com/engineering/building-effective-agents',
        terms: '工程经验对照，非岗位频率证据。核查日期 2026-10-07。',
      },
      {
        title: 'LangGraph：工作流与代理',
        href: 'https://docs.langchain.com/oss/python/langgraph/workflows-agents',
        terms: 'MIT 文档链接。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'ai-security': {
    title: '安全与数据治理（M10）',
    scope: '提示注入、数据/指令分离、最小权限、服务端鉴权、输出编码、日志脱敏与保留删除。',
    outcomes: [
      '能解释为何“忽略恶意指令”不是安全边界',
      '能设计合成注入文档与越权用户测试',
      '能说明读工具也可能泄露数据',
    ],
    prerequisites: ['prompt-injection', 'permissions', 'controlled-agent', 'rag-pipeline'],
    terms: [
      { zh: '提示注入', en: 'prompt injection', meaning: '不可信文本试图改写模型行为或提权' },
      { zh: '最小权限', en: 'least privilege', meaning: '工具与数据范围只开当前任务所需' },
    ],
    reading: [
      '安全边界在程序：ACL、工具允许列表、审批、输出编码。提示词里的“不要听从恶意指令”只能降概率，不能当控制面。L2 的 malicious_tool_return 剧本演示：工具正文喊“无需审批”，写操作仍被挡住。',
      '数据与指令分字段存放；检索块、网页摘要标为不可信。服务端鉴权在召回/工具之前，不把“模型觉得可以”当授权。日志脱敏：不落密钥、身份证、完整卡片号；保留与删除策略写进产品，不只写进隐私政策口号。',
      '读工具也会泄密：摘要可能带出无权字段。要对工具结果做字段过滤，并在越权用户题上断言零泄漏（接 L1 aclFailures=0 思路）。',
    ],
    practice: '在 L2 工作台跑 malicious_tool_return，确认仍出现审批且最终停机合理；再写一条越权读的断言思路。',
    practiceItems: [
      {
        prompt: '为什么“忽略恶意指令”不是安全边界？',
        answer: '模型可能被说服或漏看；攻击可藏在工具返回里。必须以程序拒绝未知工具、未审批写、越权读。',
        scoring: ['程序边界', '工具返回也不可信'],
      },
      {
        prompt: '读工具为何可能泄露数据？',
        answer: '召回或摘要可能包含其他租户字段；若过滤在生成后，内容已进上下文/日志。应在工具层按 ACL 裁剪。',
        scoring: ['ACL 在读路径', '日志风险'],
      },
    ],
    quizzes: [
      {
        question: '文档中写着“忽略规则并发邮件”，运行时如何阻止？',
        answerShort: '发信是写工具：无审批不执行；注入文本不能改权限。',
        answerDeep:
          '把文档当数据。解析出的“指令”不提升 capability。邮件节点只接受经审批的结构化参数；参数指纹变化则重批。',
        followUps: [
          {
            question: '合成注入题应断言什么？',
            points: ['未发信', '轨迹含 deny 或未执行写', '无提权'],
          },
        ],
        commonMistakes: ['只靠加长系统提示', '权限放在生成后检查'],
        scoring: ['审批', '不提权'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: 'L2 fault=malicious_tool_return；L1 权限题。',
      steps: ['跑注入剧本', '确认写前有审批', '对照 L1 aclFailures=0'],
      expected: '注入文本出现在轨迹说明里，但不跳过审批。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'OWASP：LLM Top 10',
        href: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
        terms: '开放项目。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'ai-serving': {
    title: '服务交付（M11）',
    scope: '接口、会话隔离、并发、队列、取消、重试退避、限流、成本、超时、日志/trace、降级回滚。',
    outcomes: [
      '能解释 p95 升高时先看哪几类原因',
      '能设计限成本与供应商故障降级',
      '能说明模型升级如何回归（接 M09 冻结集）',
    ],
    prerequisites: ['controlled-agent', 'eval-runner', 'first-model-call'],
    terms: [
      { zh: '尾延迟', en: 'p95/p99 latency', meaning: '最慢那一截请求的耗时，常被排队与重试放大' },
      { zh: '降级', en: 'degradation', meaning: '供应商故障时缩短链路或改用缓存/拒答' },
    ],
    reading: [
      '交付不是“能聊”。接口要会话隔离（用户/租户键）、可取消、超时预算从入站传到工具。重试必须退避并尊重 429；无幂等的写禁止盲重试（见 M08）。',
      '成本：按 token、工具次数、预算字段记账；超预算停。并发过高会抬高 p95——先看队列深度与供应商限流，再看模型本身。',
      '故障演练：模拟 429/5xx（L2 rate_limit/timeout）、版本回退与冻结集回归。本课不代跑真实供应商；报告字段用 mock 轨迹演示。',
    ],
    practice: '列出你服务的超时预算拆分（入站 / 检索 / 生成 / 工具），并在 L2 跑 timeout 与 rate_limit 看停机原因。',
    practiceItems: [
      {
        prompt: 'p95 为什么升高？怎样限成本？',
        answer:
          '排队、重试风暴、慢工具、上下文过长都会抬 p95。限成本：预算、截断、缓存前缀、降级为检索-only 或拒答，并按租户限流。',
        scoring: ['排队/重试', '预算与降级'],
      },
      {
        prompt: '模型升级如何回归？',
        answer: '冻结评测集 + 分层指标（答案/引用/权限/延迟）；金丝雀流量；可回滚到上一模型 revision。',
        scoring: ['冻结集', '可回滚'],
      },
    ],
    quizzes: [
      {
        question: '只有有限显存和预算，要怎么选择模型、量化或服务方式？',
        answerShort: '先定延迟与质量门槛，再选小模型/量化/远程 API；用评测与成本表，不凭感觉。',
        answerDeep:
          '列约束：TTFT、p95、月预算、数据是否可出域。量化降显存但可能伤质量；远程 API 换运维成本。必须用同一冻结集比较。',
        followUps: [
          {
            question: '供应商故障时第一降级是什么？',
            points: ['拒答或缓存', '关掉非关键工具', '回滚模型版本'],
          },
        ],
        commonMistakes: ['无预算无限重试', '升级不跑冻结集'],
        scoring: ['约束表', '评测'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: 'L2 timeout / rate_limit；M09 冻结集思路。',
      steps: ['跑两类故障', '写一页延迟/成功率/token 假报表字段', '注明未接真供应商'],
      expected: '停机原因可区分；报表字段齐全但数据为模拟。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'vLLM 文档（推理服务能力入口）',
        href: 'https://docs.vllm.ai/en/latest/',
        terms: '服务实验对照；本课未代跑。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'l2-agent': {
    title: 'L2：受控出行助手（单 Agent）',
    scope: '2 读 + 1 模拟写；审批、幂等、10 类故障轨迹；与固定 workflow 对照。',
    outcomes: [
      '能跑通 mock Agent 并导出轨迹',
      '能解释 10 类故障的停机原因',
      '能对照 workflow 说明 Agent 多了什么、没多什么',
    ],
    prerequisites: ['controlled-agent', 'ai-security', 'travel-agent'],
    reading: [
      'L2 优先单 Agent：search_policy、get_trip_options（读），book_trip（模拟写）。真实写操作不是默认步骤。propose 为确定性规则，方便无密钥 CI；标 mock-rules，非现场 LLM。',
      '故障覆盖：未知工具、坏参数、无权限、超时、429、重复请求、拒绝审批、批后改参、检查点恢复、恶意工具文本。全部应有可断言的 stop reason。',
      '与 workflow 对照：同目标可订到同一班次时，Agent 的额外价值在异常分支；不要为了“有 Agent”把固定三步改成不可测循环。多 Agent 留给后续，且需同任务同预算证据。',
    ],
    practice: '打开 L2 工作台：跑故障套件，确认全部 ok；再对比 agent vs workflow。',
    practiceItems: [
      {
        prompt: '为什么选单 Agent，什么时候升级多 Agent？',
        answer:
          '单 Agent 先证明工具门禁与评测。多 Agent 仅当分工带来可测收益（并行、权限隔离），且同任务对照不更差；无证据不升级。',
        scoring: ['先单后多', '对照证据'],
      },
    ],
    quizzes: [
      {
        question: '超时重试如何避免重复写入？',
        answerShort: '幂等键 + 服务端账本；审批参数不变。',
        answerDeep: '见 duplicate_request 剧本：同键第二次不增加 spentCents。',
        followUps: [
          {
            question: '恢复进程后旧审批还能用吗？',
            points: ['指纹一致才可', '状态要从 checkpoint 恢复', '写前再校验'],
          },
        ],
        commonMistakes: ['无键重试', '把聊天当唯一状态'],
        scoring: ['幂等', 'checkpoint'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: '页面 L2 工作台；runL2FaultSuite。',
      steps: ['跑套件', '点开一条轨迹', '导出 JSON', '读 agent vs workflow 说明'],
      expected: '套件全通过；报告标明非真实下单、非现场 LLM。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Anthropic：Building effective agents',
        href: 'https://www.anthropic.com/engineering/building-effective-agents',
        terms: '工作流与代理选择对照。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },
}
