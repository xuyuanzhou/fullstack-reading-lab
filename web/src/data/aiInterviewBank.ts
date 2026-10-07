/**
 * B5 原创模拟主问题（首批 12 + 第二批 12；目标 60）。不冒充公司真题；评分 0–4 仅训练用。
 */
import { AI_DRILL_QUESTIONS_BATCH2 } from './aiInterviewBankBatch2.ts'
import { AI_DRILL_QUESTIONS_BATCH3 } from './aiInterviewBankBatch3.ts'
import { AI_DRILL_QUESTIONS_BATCH4 } from './aiInterviewBankBatch4.ts'
import { AI_DRILL_QUESTIONS_BATCH5 } from './aiInterviewBankBatch5.ts'

export const AI_DRILL_BATCH1_SIZE = 12
export const AI_DRILL_EDITOR_TARGET = 60

export type AiFollowUp = {
  question: string
  points: string[]
  counterexample?: string
  boundary?: string
}

export type AiDrillQuestion = {
  id: string
  track: 'app' | 'algo' | 'both'
  difficulty: 1 | 2 | 3
  domain: string
  prerequisites: string[]
  skills: string[]
  prompt: string
  answerShort: string
  answerDeep: string
  followUps: AiFollowUp[]
  commonMistakes: string[]
  scoring: string[]
  mustSay: string[]
  lessonKeys: string[]
}

export const AI_DRILL_DISCLAIMER =
  '原创模拟训练题，用于练习口述与系统设计，不冒充任何公司面试原题；分数不代表录用概率。'

export const AI_SCORE_RUBRIC = [
  '0：错误或无答案',
  '1：只有术语，说不清机制',
  '2：机制基本对，缺关键条件或边界',
  '3：有例子、边界与取舍',
  '4：有证据/计算/实验，并能应对条件变更',
] as const

const AI_DRILL_QUESTIONS_BATCH1: AiDrillQuestion[] = [
  {
    id: 'q01-prompt-rag-ft',
    track: 'both',
    difficulty: 1,
    domain: '基础与选型',
    prerequisites: ['change-how', 'first-model-call', 'rag-pipeline'],
    skills: ['提示', 'RAG', '微调', '何时不用模型'],
    prompt: '提示、RAG、微调各解决什么问题？什么情况下三者都不该用？',
    answerShort: '提示改本次输入；RAG 注入可更新材料；微调改权重。规则/查库/确定计算够用时都不必上。',
    answerDeep:
      '提示适合格式与短规则。材料常变、超出窗口用检索。要改默认写法且有稳定数据与评测才考虑微调。表格求和、精确 SQL、强校验用程序；不要为“有 AI”硬接模型。',
    followUps: [
      {
        question: '用户只要把发票金额加总，为何可能三者都不需要？',
        points: ['确定性计算', '幻觉与成本', '程序可测'],
        counterexample: '表头混乱时可用模型辅助解析，但总和仍由程序算。',
        boundary: '辅助解析 ≠ 把加法交给模型当真相。',
      },
      {
        question: '只有提示没有评测集，怎样证明改提示有效？',
        points: ['无法证明', '需要冻结题与判分', '覆盖有/无答案'],
        boundary: '感觉变好不算回归通过。',
      },
    ],
    commonMistakes: ['把聊天当开发', '认为微调总能替代检索', '用提示“记住”整本制度'],
    scoring: ['三者职责', '不适用场景', '评测意识'],
    mustSay: ['各改哪一层', '至少一个不用模型的例子'],
    lessonKeys: ['change-how', 'first-model-call', 'rag-layers'],
  },
  {
    id: 'q02-conflict-policy',
    track: 'app',
    difficulty: 2,
    domain: 'RAG 与检索',
    prerequisites: ['rag-pipeline', 'eval-runner', 'rag-layers'],
    skills: ['冲突版本', '引用', '分层评测'],
    prompt: '有两份冲突的报销制度，怎样回答并引用，怎样评测？',
    answerShort: '标明现行版本或冲突；评测分开打引用与结论。',
    answerDeep:
      '索引保留版本元数据；优先现行版或列出冲突并拒答唯一动作。评测：只引旧版却给新结论算失败；正确择版或拒答算通过。',
    followUps: [
      {
        question: '产品强制必须给一个动作建议时，程序还要什么？',
        points: ['业务规则表优先', '模型最多解释', '写操作走确定规则'],
        boundary: '冲突未解决不自动报销。',
      },
      {
        question: '为什么答案里出现了原句仍可能得 0 分？',
        points: ['断章取义', '条件不适用', '引用与结论不一致'],
      },
    ],
    commonMistakes: ['有引用就判对', '只用提示禁止旧版', '假装只有一版'],
    scoring: ['冲突处理', '双指标', '元数据'],
    mustSay: ['版本/生效', '引用与结论分开评'],
    lessonKeys: ['rag-pipeline', 'eval-runner', 'l1-kb'],
  },
  {
    id: 'q03-json-vs-execute',
    track: 'app',
    difficulty: 2,
    domain: 'Agent 与工具',
    prerequisites: ['controlled-agent', 'first-model-call', 'permissions'],
    skills: ['schema', '业务校验', '审批'],
    prompt: '为什么 JSON 可解析不等于订单工具调用可以执行？',
    answerShort: '还要字段业务合法、权限、预算、审批指纹。',
    answerDeep:
      'JSON.parse 只过语法。运行时校验类型范围、ACL、政策上限；写工具等人确认且参数指纹未变。缺字段或伪造依据应拒绝执行。',
    followUps: [
      {
        question: '参数被改后旧审批能复用吗？',
        points: ['不能', '指纹不一致即失效', '需重新审批'],
      },
      {
        question: '哪类错误不该盲重试？',
        points: ['401/403', 'schema 失败', '人已拒绝'],
      },
    ],
    commonMistakes: ['parse 成功就下单', '只靠提示词约束字段'],
    scoring: ['语法 vs 业务', '门禁层'],
    mustSay: ['程序校验', '写前审批'],
    lessonKeys: ['controlled-agent', 'l2-agent', 'first-model-call'],
  },
  {
    id: 'q04-recall-up-answer-down',
    track: 'app',
    difficulty: 2,
    domain: 'RAG 与检索',
    prerequisites: ['retrieve-baseline', 'rag-layers', 'eval-runner'],
    skills: ['分层排错', '噪声', '忠实度'],
    prompt: '召回率提高了，最终回答准确性却降低，如何排查？',
    answerShort: '先查噪声块与生成忠实度，再查重排与上下文位置。',
    answerDeep:
      '召回变宽可能塞进旧版/无关段。分开报 Recall 与答案正确率；查 Lost-in-the-middle；不要先盲目换嵌入。',
    followUps: [
      {
        question: '为何本课重叠检索要标明不是向量？',
        points: ['避免假冒实测', '可复现对照', '上线需真模型版本'],
      },
      {
        question: '重排一定值得吗？',
        points: ['看冻结集数字', '延迟与成本', '无提升可不上'],
      },
    ],
    commonMistakes: ['只看平均召回', '同时改三层无法归因'],
    scoring: ['分层指标', '噪声/忠实度'],
    mustSay: ['Recall 与答案率分开', '先定位层'],
    lessonKeys: ['retrieve-baseline', 'rag-layers', 'eval-runner'],
  },
  {
    id: 'q05-cache-isolation',
    track: 'app',
    difficulty: 2,
    domain: '安全与交付',
    prerequisites: ['ai-security', 'ai-serving', 'rag-pipeline'],
    skills: ['会话隔离', '缓存键', '串租户'],
    prompt: '用户 A 的缓存结果怎样可能被用户 B 误读，如何隔离？',
    answerShort: '缓存键必须含租户/用户；召回前 ACL；禁止共享未分区前缀缓存给异权用户。',
    answerDeep:
      '若键只有 query 文本，B 可能命中 A 的答案。键应含 tenantId/userId/权限版本；前缀 KV/语义缓存同样要隔离。日志也勿把 A 的正文打给 B 的会话。',
    followUps: [
      {
        question: '如何在评测里抓住这类泄漏？',
        points: ['异权用户题', '断言 hits 与答案无对方字段', 'aclFailures=0'],
      },
      {
        question: '只靠提示“不要泄露”够吗？',
        points: ['不够', '程序过滤', '缓存键设计'],
      },
    ],
    commonMistakes: ['全局 query 缓存', '权限放在生成后'],
    scoring: ['键设计', 'ACL 位置'],
    mustSay: ['租户进缓存键', '召回前过滤'],
    lessonKeys: ['ai-security', 'l1-kb', 'ai-serving'],
  },
  {
    id: 'q06-timeout-idempotent',
    track: 'app',
    difficulty: 2,
    domain: 'Agent 与工具',
    prerequisites: ['controlled-agent', 'l2-agent', 'ai-serving'],
    skills: ['幂等', '重试', '超时'],
    prompt: '工具超时后重试，如何避免重复创建订单？',
    answerShort: '同一业务意图带同一幂等键；服务端账本命中则返回已有单。',
    answerDeep:
      '超时不知道对面是否已成功。客户端重试必须带同一 idempotencyKey；服务端先查账本。无键的写操作禁止盲重试。审批参数变更则新键或重批。',
    followUps: [
      {
        question: 'L2 duplicate_request 剧本证明了什么？',
        points: ['同键不双扣', 'spent 不增加', '模拟写非真实支付'],
      },
      {
        question: '读工具超时策略与写有何不同？',
        points: ['读可退避重试', '写必须幂等', '429 要限流'],
      },
    ],
    commonMistakes: ['无键猛重试', '把聊天当事务状态'],
    scoring: ['幂等键', '读写差异'],
    mustSay: ['同键', '账本'],
    lessonKeys: ['controlled-agent', 'l2-agent'],
  },
  {
    id: 'q07-injection-email',
    track: 'app',
    difficulty: 2,
    domain: '安全',
    prerequisites: ['prompt-injection', 'ai-security', 'permissions'],
    skills: ['注入', '不提权', '审批'],
    prompt: '文档中写着“忽略规则并发邮件”，运行时如何阻止？',
    answerShort: '发信是写工具：无审批不执行；文档当数据不能改权限。',
    answerDeep:
      '指令与数据分字段。解析出的句子不提升 capability。邮件节点只接受经审批的结构化参数；工具返回同样不可信。',
    followUps: [
      {
        question: '合成注入题应断言什么？',
        points: ['未发信', '轨迹无跳过审批', '无提权'],
      },
      {
        question: '为什么“忽略恶意指令”不是安全边界？',
        points: ['模型可能服从', '攻击可藏工具返回', '程序拒绝'],
      },
    ],
    commonMistakes: ['加长系统提示当防火墙', '权限在生成后检查'],
    scoring: ['数据/指令分离', '写门禁'],
    mustSay: ['程序边界', '审批'],
    lessonKeys: ['ai-security', 'prompt-injection', 'l2-agent'],
  },
  {
    id: 'q08-causal-mask',
    track: 'algo',
    difficulty: 2,
    domain: 'Transformer',
    prerequisites: ['attention-who', 'kv-cache', 'model-mechanics'],
    skills: ['因果掩码', '注意力'],
    prompt: '用三个位置的小矩阵说明因果 attention，哪里要 mask？',
    answerShort: '位置 i 不能看 j>i；上三角（未来）置为不可见。',
    answerDeep:
      '3×3 无掩码可全连接。因果下 i 行只能看 ≤i 列。训练常用并行掩码；生成时用 KV cache 逐步扩展可见前缀。',
    followUps: [
      {
        question: '若漏 mask 未来位置，训练会出现什么？',
        points: ['信息泄漏', '指标虚高', '推理对不上'],
      },
      {
        question: '双向编码器（如 BERT）为何不同？',
        points: ['任务允许看两侧', '生成解码器要因果', '别混用'],
      },
    ],
    commonMistakes: ['说成只 mask 对角线', '与 padding mask 混淆'],
    scoring: ['未来不可见', '矩阵位置'],
    mustSay: ['j>i 不可见'],
    lessonKeys: ['attention-who', 'kv-cache'],
  },
  {
    id: 'q09-kv-gqa',
    track: 'algo',
    difficulty: 2,
    domain: '推理与缓存',
    prerequisites: ['kv-cache', 'model-mechanics'],
    skills: ['KV 体积', 'GQA'],
    prompt: 'KV Cache 增长由哪些量决定？GQA 改了哪一项？',
    answerShort: '层数、KV 头数、序列长、头维、数值字节；GQA 减少 KV 头数。',
    answerDeep:
      '体积大致 ∝ layers × kv_heads × seq × head_dim × bytes。新 token 仍要产生本层新 K/V 并追加。GQA 让查询头多于 KV 头以省显存，不消灭对长度的线性增长。',
    followUps: [
      {
        question: '为什么说“新词只算 Q”不准确？',
        points: ['新 K/V', '追加缓存', 'Q 对 concat 做注意力'],
      },
      {
        question: '训练时通常为何不用生成向 KV cache？',
        points: ['训练常并行整段', '缓存是推理优化'],
      },
    ],
    commonMistakes: ['把 cache 当长期记忆', '忽略序列长因子'],
    scoring: ['体积因子', 'GQA 作用'],
    mustSay: ['kv_heads', 'seq 线性'],
    lessonKeys: ['kv-cache', 'model-mechanics'],
  },
  {
    id: 'q10-offline-online-gap',
    track: 'app',
    difficulty: 3,
    domain: '评测',
    prerequisites: ['eval-runner', 'eval-set', 'ai-serving'],
    skills: ['泄漏', '分布', '指标'],
    prompt: '离线评测很高，上线仍失败，如何检查泄漏、分布与指标？',
    answerShort: '查题集与调参重叠、线上 query 分布偏移、指标与业务不一致、超时截断。',
    answerDeep:
      '冻结集若见过演示材料会虚高；线上用词不同；权限/延迟导致空上下文。要有线上抽样与坏例回流，并保持分层指标。',
    followUps: [
      {
        question: '总分升但引用变差能否上线？',
        points: ['不能仅凭总分', '挡住发布', '修生成/上下文'],
      },
      {
        question: '为何不用 LLM judge 当唯一分数？',
        points: ['偏差', '不稳定', '规则可复现'],
      },
    ],
    commonMistakes: ['调参改冻结题', '一个总分掩盖权限失败'],
    scoring: ['泄漏/分布', '分层'],
    mustSay: ['重叠风险', '线上抽样'],
    lessonKeys: ['eval-runner', 'l1-kb', 'ai-serving'],
  },
  {
    id: 'q11-budget-serve',
    track: 'both',
    difficulty: 2,
    domain: '交付与成本',
    prerequisites: ['ai-serving', 'first-model-call', 'kv-cache'],
    skills: ['选型', '量化', '成本'],
    prompt: '只有有限显存和预算，要怎么选择模型、量化或服务方式？',
    answerShort: '先定延迟与质量门槛，再用同一冻结集比较小模型/量化/远程 API。',
    answerDeep:
      '列 TTFT、p95、月预算、数据是否可出域。量化降显存可能伤质量；远程 API 换运维。无数字不选型。',
    followUps: [
      {
        question: '供应商故障第一降级是什么？',
        points: ['拒答或缓存', '关掉非关键工具', '回滚 revision'],
      },
      {
        question: 'p95 升高先看什么？',
        points: ['排队', '重试风暴', '慢工具', '上下文过长'],
      },
    ],
    commonMistakes: ['凭感觉换大模型', '无预算无限重试'],
    scoring: ['约束表', '同集比较'],
    mustSay: ['门槛', '评测对比'],
    lessonKeys: ['ai-serving', 'eval-runner'],
  },
  {
    id: 'q12-single-vs-multi',
    track: 'app',
    difficulty: 2,
    domain: 'Agent 设计',
    prerequisites: ['controlled-agent', 'l2-agent', 'office-agents'],
    skills: ['单 Agent', '多 Agent', '对照证据'],
    prompt: '为什么选单 Agent？什么时候升级为多 Agent？如何验证必要性？',
    answerShort: '先单 Agent 证明工具门禁与评测；多 Agent 仅当同任务对照有可测收益。',
    answerDeep:
      '多 Agent 增加交接与协调失败面。升级条件：并行、权限隔离或专业分工带来指标/成本改善。无证据不升级；办公多 Agent 课是比较实验入口，不是默认架构。',
    followUps: [
      {
        question: '与固定 workflow 比，Agent 多了什么？',
        points: ['异常分支改参', '探索未知步骤', '写操作门禁不变'],
      },
      {
        question: '如何做必要性验证？',
        points: ['同任务同预算', '同一判分', '只在证据支持时声称更好'],
      },
    ],
    commonMistakes: ['先堆多 Agent', '无对照宣称更强'],
    scoring: ['顺序', '对照'],
    mustSay: ['先单后多', '要证据'],
    lessonKeys: ['l2-agent', 'controlled-agent', 'office-agents'],
  },
]

export const AI_DRILL_QUESTIONS: AiDrillQuestion[] = [
  ...AI_DRILL_QUESTIONS_BATCH1,
  ...AI_DRILL_QUESTIONS_BATCH2,
  ...AI_DRILL_QUESTIONS_BATCH3,
  ...AI_DRILL_QUESTIONS_BATCH4,
  ...AI_DRILL_QUESTIONS_BATCH5,
]

export const AI_MOCK_INTERVIEWS = [
  {
    id: 'mock-basic',
    title: '模拟面试 A：基础口述',
    durationMin: 35,
    questionIds: [
      'q01-prompt-rag-ft',
      'q08-causal-mask',
      'q09-kv-gqa',
      'q25-softmax-hand',
      'q15-temp-topp',
    ],
    focus: '结论 → 机制 → 一个失败情形；不要求私有思维链。',
  },
  {
    id: 'mock-debug',
    title: '模拟面试 B：代码/排错',
    durationMin: 40,
    questionIds: [
      'q03-json-vs-execute',
      'q06-timeout-idempotent',
      'q27-chunk-boundary',
      'q32-retry-429',
      'q10-offline-online-gap',
    ],
    focus: '对着日志/轨迹字段归因；可结合 L1/L2 工作台。',
  },
  {
    id: 'mock-design',
    title: '模拟面试 C：系统设计/项目答辩',
    durationMin: 45,
    questionIds: [
      'q02-conflict-policy',
      'q05-cache-isolation',
      'q36-mvp-scope',
      'q11-budget-serve',
      'q12-single-vs-multi',
    ],
    focus: '画边界、指标、坏例与个人贡献；换约束时设计怎么变。',
  },
] as const

export function drillById(id: string) {
  return AI_DRILL_QUESTIONS.find((item) => item.id === id)
}

/** 与缺口文档 §7 对齐的七大编辑域（筛选用，不改题面 domain 原文） */
export const AI_DRILL_AREAS = [
  '基础、数据与机器学习',
  'Transformer、采样与缓存',
  'RAG 与检索',
  'Agent 与工具运行',
  '评测、安全、部署与成本',
  '微调与训练',
  '综合设计、排错与项目答辩',
] as const

export type AiDrillArea = (typeof AI_DRILL_AREAS)[number]

/** 各域建议下限（编辑目标，允许略多） */
export const AI_DRILL_AREA_TARGETS: Record<AiDrillArea, number> = {
  '基础、数据与机器学习': 8,
  'Transformer、采样与缓存': 10,
  'RAG 与检索': 10,
  'Agent 与工具运行': 8,
  '评测、安全、部署与成本': 10,
  '微调与训练': 6,
  '综合设计、排错与项目答辩': 8,
}

const AREA_BY_ID: Partial<Record<string, AiDrillArea>> = {
  'q01-prompt-rag-ft': '基础、数据与机器学习',
  'q02-conflict-policy': 'RAG 与检索',
  'q03-json-vs-execute': 'Agent 与工具运行',
  'q04-recall-up-answer-down': 'RAG 与检索',
  'q05-cache-isolation': '评测、安全、部署与成本',
  'q06-timeout-idempotent': 'Agent 与工具运行',
  'q07-injection-email': '评测、安全、部署与成本',
  'q08-causal-mask': 'Transformer、采样与缓存',
  'q09-kv-gqa': 'Transformer、采样与缓存',
  'q10-offline-online-gap': '综合设计、排错与项目答辩',
  'q11-budget-serve': '评测、安全、部署与成本',
  'q12-single-vs-multi': '综合设计、排错与项目答辩',
  'q13-precision-recall': '基础、数据与机器学习',
  'q14-train-loss-deploy': '基础、数据与机器学习',
  'q15-temp-topp': 'Transformer、采样与缓存',
  'q16-prefill-decode': 'Transformer、采样与缓存',
  'q17-bm25-vs-dense': 'RAG 与检索',
  'q18-rerank-worth': 'RAG 与检索',
  'q19-long-context-vs-rag': 'Transformer、采样与缓存',
  'q20-react-vs-tools': 'Agent 与工具运行',
  'q21-tool-return-inject': '评测、安全、部署与成本',
  'q22-llm-judge': '评测、安全、部署与成本',
  'q23-dpo-vs-rlhf': '微调与训练',
  'q24-lora-rank': '微调与训练',
  'q25-softmax-hand': '基础、数据与机器学习',
  'q26-embedding-space': '基础、数据与机器学习',
  'q27-chunk-boundary': 'RAG 与检索',
  'q28-delete-sync': 'RAG 与检索',
  'q29-budget-steps': 'Agent 与工具运行',
  'q30-confirm-params': 'Agent 与工具运行',
  'q31-session-isolate': '评测、安全、部署与成本',
  'q32-retry-429': '评测、安全、部署与成本',
  'q33-quant-tradeoff': 'Transformer、采样与缓存',
  'q34-sft-data-mix': '微调与训练',
  'q35-paper-claim': '综合设计、排错与项目答辩',
  'q36-mvp-scope': '综合设计、排错与项目答辩',
  'q37-bias-variance': '基础、数据与机器学习',
  'q38-positional': 'Transformer、采样与缓存',
  'q39-mha-gqa': 'Transformer、采样与缓存',
  'q40-hybrid-rrf': 'RAG 与检索',
  'q41-cite-ground': 'RAG 与检索',
  'q42-unknown-tool': 'Agent 与工具运行',
  'q43-workflow-vs-agent': '综合设计、排错与项目答辩',
  'q44-log-redact': '评测、安全、部署与成本',
  'q45-canary-rollback': '综合设计、排错与项目答辩',
  'q46-grad-accum': '微调与训练',
  'q47-ocr-baseline': '综合设计、排错与项目答辩',
  'q48-ablation-one': '基础、数据与机器学习',
  'q49-dataset-split': '基础、数据与机器学习',
  'q50-residual-norm': 'Transformer、采样与缓存',
  'q51-prefix-cache': 'Transformer、采样与缓存',
  'q52-empty-retrieve': 'RAG 与检索',
  'q53-metadata-filter': 'RAG 与检索',
  'q54-tool-schema': 'Agent 与工具运行',
  'q55-human-gate': 'Agent 与工具运行',
  'q56-cost-tokens': '评测、安全、部署与成本',
  'q57-ppo-instability': '微调与训练',
  'q58-fsdp-when': '微调与训练',
  'q59-eval-online': '评测、安全、部署与成本',
  'q60-defense-story': '综合设计、排错与项目答辩',
}

export function drillArea(question: Pick<AiDrillQuestion, 'id'>): AiDrillArea {
  const mapped = AREA_BY_ID[question.id]
  if (!mapped) throw new Error(`missing drill area for ${question.id}`)
  return mapped
}

export function countDrillsByArea() {
  const counts = Object.fromEntries(AI_DRILL_AREAS.map((area) => [area, 0])) as Record<AiDrillArea, number>
  for (const question of AI_DRILL_QUESTIONS) {
    counts[drillArea(question)] += 1
  }
  return counts
}

export function drillsInArea(area: AiDrillArea | 'all') {
  if (area === 'all') return AI_DRILL_QUESTIONS
  return AI_DRILL_QUESTIONS.filter((question) => drillArea(question) === area)
}

/** 知识点目录用：按题干/技能/mustSay 搜原创模拟题 */
export function searchAiDrills(query: string) {
  const q = query.trim().toLocaleLowerCase()
  if (!q) return [] as AiDrillQuestion[]
  return AI_DRILL_QUESTIONS.filter((item) => {
    const hay = [
      item.id,
      item.prompt,
      item.answerShort,
      item.domain,
      drillArea(item),
      ...item.skills,
      ...item.mustSay,
      ...item.commonMistakes,
    ]
      .join(' ')
      .toLocaleLowerCase()
    return hay.includes(q)
  })
}
