/**
 * B1 样板课：完整练习、答案、追问与实验状态。
 * 与 aiCatalog 中的概念卡合并，避免把所有正文继续堆进单一巨型数组。
 */
import type { AiNote } from './aiCatalog.ts'
import { AI_B2_EXTRAS } from './aiModulesB2.ts'
import { AI_B3_EXTRAS } from './aiModulesB3.ts'
import { AI_B4_EXTRAS } from './aiModulesB4.ts'
import { AI_B5_EXTRAS } from './aiModulesB5.ts'
import { AI_B6_EXTRAS } from './aiModulesB6.ts'

type SampleExtra = Partial<
  Pick<
    AiNote,
    | 'outcomes'
    | 'prerequisites'
    | 'terms'
    | 'practiceItems'
    | 'quizzes'
    | 'experiment'
    | 'verifiedAt'
    | 'reading'
    | 'practice'
    | 'sources'
    | 'scope'
    | 'title'
  >
>

/** B1 样板 + B2 模块扩展；key 与 AiNote.key 对齐 */
export const AI_SAMPLE_EXTRAS: Record<string, SampleExtra> = {
  ...AI_B2_EXTRAS,
  ...AI_B3_EXTRAS,
  ...AI_B4_EXTRAS,
  ...AI_B5_EXTRAS,
  ...AI_B6_EXTRAS,
  'first-model-call': {
    title: '第一次真实模型调用（样板）',
    scope: '用假供应商跑通消息、超时与 JSON 校验；有密钥时再换真实调用。分清样例结果与现场运行。',
    outcomes: [
      '能画出一次请求：消息列表 → 供应商 → 文本/结构化输出 → 校验',
      '能说明 JSON 合法与业务字段正确的区别',
      '能标出哪些错误可重试（如 429/5xx），哪些应停（如密钥错误、schema 失败）',
    ],
    prerequisites: ['three-parts', 'prompt-once', 'one-success', 'l0-verify', 'python-prep'],
    terms: [
      { zh: '消息', en: 'message', meaning: '发给模型的一条角色内容，常见 role 为 system / user / assistant' },
      { zh: '假供应商', en: 'fake provider', meaning: '本地按固定规则返回，不调用外网模型，用于测契约' },
      { zh: '结构化输出', en: 'structured output', meaning: '要求模型按约定字段返回，再用程序校验' },
    ],
    reading: [
      '第一次“会调用模型”，不是会聊天。你要能指出：谁组装消息、谁发出 HTTP、谁校验返回、密钥存在哪、失败时停还是重试。',
      '无密钥路径：用假供应商。给定固定材料与三个问题（含一题无答案），返回预录样例，并在界面标“样例，非现场运行”。有密钥路径：换成真实供应商时，记录模型名、日期、延迟与是否触发限流；密钥只放在用户本机环境变量，不进静态前端。',
      '输出分两层检查。第一层：是不是合法 JSON（或约定格式）。第二层：字段是否满足业务——例如金额是数字、依据能指回材料原句、无答案题必须拒答。第一层通过、第二层失败，不能算交付成功。',
      '错误分类要事先写好：超时与 5xx 可退避重试；429 要限流与排队；401/403 与 schema 失败应停并告警。不要用“再问一遍模型”掩盖程序边界。',
    ],
    practice:
      '按实验步骤先跑 mock：三题中无答案题必须拒答。再（可选）用自己的密钥跑一次真实调用，把请求摘要与错误码记进笔记。预录结果必须标样例。',
    practiceItems: [
      {
        prompt: '解释题：为什么“返回的字符串能 JSON.parse”还不能直接拿去创建订单？',
        answer:
          'JSON 合法只说明括号与类型大致对。业务还要校验必填字段、数值范围、依据是否来自给定材料、无答案是否拒答。缺字段或依据伪造时，程序应拒绝执行写操作。',
        scoring: ['区分语法合法与业务正确', '提到写操作前的程序校验', '提到无答案/拒答'],
      },
      {
        prompt: '排错题：日志里先出现 429，你立刻重试三次仍失败。下一步应改调用方的哪一类策略？',
        answer:
          '429 表示被限流。应降低并发、加退避与队列，而不是无间隔猛重试。同时记录是否打满 token/分钟配额。密钥错误（401）则不应重试同一密钥。',
        scoring: ['识别限流', '提出退避/限流/排队', '对比不可重试错误'],
      },
    ],
    quizzes: [
      {
        question: '提示、RAG、微调各解决什么问题？什么情况下三者都不该用？',
        answerShort: '提示改本次输入；RAG 注入可检索材料；微调改权重。材料稳定且规则可用普通代码时，不必上模型。',
        answerDeep:
          '提示适合短规则与格式。材料会更新、超出窗口时用检索。要改模型默认写法且有稳定数据与评测时才考虑微调。分类、精确查库、强规则校验用普通程序更合适；不要为了“有 AI”硬接模型。',
        followUps: [
          {
            question: '用户只要“把发票金额从这张表里加总”，为什么可能三者都不需要？',
            points: ['可用确定性表格计算', '模型增加幻觉与成本', '规则清晰时程序更可测'],
            counterexample: '表结构混乱、字段名语义不清时，可用模型辅助解析，但仍要程序校验总和。',
            boundary: '辅助解析 ≠ 把加法交给模型当唯一真相。',
          },
          {
            question: '只有提示没有评测集，上线后怎样证明“改提示有效”？',
            points: ['无法证明', '需要冻结题目与判分', '至少覆盖有答案/无答案/格式'],
            boundary: '感觉变好不算回归通过。',
          },
        ],
        commonMistakes: ['把会聊天当成会开发', '认为微调总能替代检索', '用提示“记住”整本制度'],
        scoring: ['三者职责', '不适用场景', '评测意识'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials:
        '公开短材料三句：①报销须附发票；②年假 5 天；③会议室预约走日历。另附预录模型输出样例（标“样例”）。',
      steps: [
        '用假供应商接收 system+user 消息，返回预录 JSON：{answer, cite, refusal}。',
        '跑三题：报销要什么；年假几天；加班费怎么算（应 refusal=true）。',
        '校验：cite 必须是材料子串；无答案题 answer 不得编造条款。',
        '可选 live：设置用户本机 API 密钥，换真实供应商，记录模型 revision 与是否 429（本课未代跑）。',
      ],
      expected: 'mock 三题判分通过；live 路径若未配置密钥则跳过并标注未验证。',
      commonErrors: [
        '把预录样例当成现场模型输出展示',
        '密钥写进前端代码或提交到仓库',
        '只检查 JSON.parse 成功就放行',
      ],
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Hugging Face LLM Course（前置说明）',
        href: 'https://huggingface.co/learn/llm-course/chapter1/1',
        terms: 'Apache-2.0。说明课程需要 Python/深度学习基础。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'rag-layers': {
    outcomes: [
      '能按索引 / 召回 / 生成三层定位一条失败日志该改哪一层',
      '能区分“引用正确”与“答案正确”',
      '能对冲突材料与无答案题写出期望行为',
    ],
    prerequisites: ['find-then-answer', 'embeddings', 'rag'],
    terms: [
      { zh: '召回', en: 'recall', meaning: '从索引里取出候选块的过程' },
      { zh: '忠实度', en: 'groundedness', meaning: '答案是否被给定材料支持' },
      { zh: '消融', en: 'ablation', meaning: '关掉某一环（如重排）看指标是否变差' },
    ],
    practiceItems: [
      {
        prompt: '解释题：召回率（相关块进了前 k）升高，最终答案正确率却下降，先查哪一层？',
        answer:
          '先看生成与上下文组织：是否塞进过多噪声块、重要句落在中间被忽略、或模型未遵守“只依据材料”。同时核对引用是否支持结论。不要先盲目换嵌入模型。',
        scoring: ['指向生成/上下文而非只改检索', '提到噪声与忠实度', '提到引用是否支持结论'],
      },
      {
        prompt:
          '排错题：制度 A 写“差旅需事先审批”，制度 B（更新）写“市内交通免审批”。模型引用了 A 却按 B 的结论答。怎样评测与修复？',
        answer:
          '这是冲突版本。评测应同时打“引用了哪一版”和“结论是否符合生效规则”。修复：元数据带生效日期/版本，召回时过滤旧版，或要求模型列出冲突并拒答单一结论。',
        scoring: ['识别冲突', '版本/元数据', '评测双指标'],
      },
    ],
    quizzes: [
      {
        question: '有两份冲突的报销制度，怎样回答并引用，怎样评测？',
        answerShort: '标明冲突与生效版本；不能只抄一句就给唯一结论。评测分开打引用与结论。',
        answerDeep:
          '先在索引里保留版本元数据。召回两版时，回答应指出冲突或只采用生效版，并引用对应块。评测集要有冲突题：只引用旧版却给新结论算失败；拒答或正确择版算通过。',
        followUps: [
          {
            question: '如果产品强制必须给一个动作建议，程序层还要什么？',
            points: ['业务规则表优先于模型自由发挥', '模型最多解释', '写操作走确定规则'],
            boundary: '冲突未解决时不应自动执行报销。',
          },
          {
            question: '为什么“答案里出现了原句”仍可能得 0 分？',
            points: ['断章取义', '条件不适用', '引用与结论不一致'],
            counterexample: '抄了“需发票”却回答“可以无发票报销”。',
          },
        ],
        commonMistakes: ['有引用就判对', '只用提示词禁止提旧版', '冲突时假装只有一版'],
        scoring: ['冲突处理', '双指标评测', '元数据/版本'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials:
        '三块合成制度（报销发票 / 年假 / 会议室）+ 一道冲突版差旅规则（旧/新）。无需向量库也可纸面完成。',
      steps: [
        '为每道失败题填表：块在索引？进前 3？引用子串？结论被支持？',
        '构造三败例：有引用结论错；材料冲突；条件不适用。',
        '写下每一败例只改一层的修复动作。',
      ],
      expected: '三败例都能指出失败层；不把全部失败都写成“提示不够严”。',
      commonErrors: ['同时改切分、嵌入和提示导致无法归因', '用总分掩盖单题失败'],
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    verifiedAt: '2026-10-07',
  },

  'kv-cache': {
    outcomes: [
      '能说明新 token 仍要产生本层新的 K/V，并追加进缓存',
      '能区分一次前向、单步 decode 与整段生成的代价说法',
      '能指出缓存随长度增长占显存，不是永久记忆',
    ],
    prerequisites: ['tokens', 'attention-who'],
    terms: [
      { zh: '预填充', en: 'prefill', meaning: '对提示整段做一次前向，写入初始 KV' },
      { zh: '解码', en: 'decode', meaning: '逐步生成新词元，每步追加 K/V' },
      { zh: '键值缓存', en: 'KV cache', meaning: '推理时复用已算过的键与值，避免重算前缀' },
    ],
    practiceItems: [
      {
        prompt: '解释题：为什么说“新词只算自己的查询”不准确？',
        answer:
          '新位置要算本层新的 Q、K、V。K/V 写入缓存，Q 对已缓存（含新建）的 K/V 做注意力。只算 Q、不算新 K/V 无法正确更新缓存。',
        scoring: ['提到新 K/V', '提到追加缓存', '提到 Q 对缓存做注意力'],
      },
      {
        prompt: '迁移题：序列从长度 n 到 n+1，画出本步新增的 K/V，并写出单头时 K 的大致 shape。',
        answer:
          '新增长度为 1 的 K 与 V。常见 shape 近似 (batch, num_heads, 1, head_dim) 再拼到长度维变成 n+1。具体以所选实现为准。',
        scoring: ['长度维 +1', 'shape 含头数与 head_dim', '标明是推理缓存'],
      },
    ],
    quizzes: [
      {
        question: '用三个位置的小矩阵说明因果 attention，哪里要 mask？KV Cache 增长由哪些量决定？',
        answerShort: '位置 i 不能看 j>i；缓存随层数、头数（或 KV 头数）、长度、头维增长。',
        answerDeep:
          '三 token 时，无掩码矩阵可全连接；因果掩码下上三角（未来）为 0。KV 体积大致与层数 × KV 头数 × 序列长 × 头维 × 数值字节成正比；GQA 减少的是 KV 头数这一项。',
        followUps: [
          {
            question: 'GQA 改了显存账单里的哪一项？',
            points: ['键值头数量', '查询头可多于 KV 头', '不消灭对长度的线性增长'],
            boundary: '不是把缓存变成永久记忆。',
          },
          {
            question: '为什么训练时通常不用这种生成向 KV cache？',
            points: ['训练常并行看整段', '缓存是推理优化', '官方注明主要用于 inference'],
            boundary: '训练开启 cache 可能导致意外错误。',
          },
        ],
        commonMistakes: ['说新词不算 K/V', '把平方代价说成有缓存后每步仍平方', '把 cache 当长期记忆'],
        scoring: ['因果 mask', '新 K/V', '体积因子'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '纸笔或表格：假设 batch=1，层=1，头=2，head_dim=4，提示长度 3，再生成 1 个词。',
      steps: [
        '写出 prefill 后 K/V 长度维 = 3。',
        'decode 一步后长度维 = 4，标出本步新增的那一行。',
        '对照 HF cache 说明：新 Q 对 concat(past, current) 的 K/V 做注意力。',
      ],
      expected: '表中能指出新增 K/V；口头区分无缓存重算与有缓存的单步代价。',
      commonErrors: ['画成只追加 Q', '把整段生成复杂度与单步混为一谈'],
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    verifiedAt: '2026-10-07',
  },
}

export function withSampleExtras(note: AiNote): AiNote {
  const extra = AI_SAMPLE_EXTRAS[note.key]
  if (!extra) return note
  return {
    ...note,
    ...extra,
    sources: extra.sources ?? note.sources,
    reading: extra.reading ?? note.reading,
    practice: extra.practice ?? note.practice,
  }
}

export const AI_SAMPLE_KEYS = Object.keys(AI_SAMPLE_EXTRAS)

/** B1 三节完整样板（验收用） */
export const AI_B1_SAMPLE_KEYS = ['first-model-call', 'rag-layers', 'kv-cache'] as const

/** B2 主线模块课 */
export const AI_B2_MODULE_KEYS = [
  'ai-map',
  'python-prep',
  'math-ml-min',
  'l0-verify',
  'model-mechanics',
] as const

/** B3 检索 / RAG / 评测 / L1 */
export const AI_B3_MODULE_KEYS = [
  'retrieve-baseline',
  'rag-pipeline',
  'eval-runner',
  'l1-kb',
] as const

/** B4 受控 Agent / 安全 / 交付 / L2 */
export const AI_B4_MODULE_KEYS = [
  'controlled-agent',
  'ai-security',
  'ai-serving',
  'l2-agent',
] as const

/** B5 面试表达 / 题库样板 / 三套模拟 */
export const AI_B5_MODULE_KEYS = [
  'project-defense',
  'interview-bank',
  'mock-interview-basic',
  'mock-interview-debug',
  'mock-interview-design',
] as const

/** B6 算法支线 A01–A08 / L3 / U03·U06 */
export const AI_B6_MODULE_KEYS = [
  'algo-track',
  'pytorch-train',
  'transformer-deep',
  'lora-sft',
  'l3-finetune',
  'a04-preference-align',
  'a05-inference-system',
  'a06-train-scale',
  'a07-multimodal-elective',
  'a08-research-repro',
] as const
