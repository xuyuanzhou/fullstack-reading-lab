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

export const AI_B3_EXTRAS: Record<string, Extra> = {
  'retrieve-baseline': {
    title: '数据与检索基线（M06）',
    scope: '清洗、版本、切块、BM25、重叠替身、混合召回与换模型重建。',
    outcomes: [
      '能用同一小语料比较关键词 / 重叠 / 混合的 Recall@5',
      '能定位编号查不到、切块边界错两类失败',
      '能说明换嵌入配置后为何要重建索引',
    ],
    prerequisites: ['embeddings', 'hybrid-retrieve', 'l0-verify'],
    terms: [
      { zh: '召回率@K', en: 'Recall@k', meaning: '前 k 个结果里覆盖了多少相关文档' },
      { zh: '混合检索', en: 'hybrid retrieval', meaning: '合并关键词与向量（或替身）名单' },
    ],
    reading: [
      '检索基线先于“完整 RAG”。本课用 L1 合成语料：先关键词，再用字符重叠替身模拟稠密检索（不是真实向量，页面会标明），再 RRF 混合。允许重叠不提升，但必须能解释坏例。',
      '文档要有版本与租户元数据。切块教学上以短篇整篇为单位；生产中块太大带噪声、太碎切答案。换真实嵌入模型时，维度与 query/document 入口变了就要重建。',
      '编号题（如 HT-2024-09、ONCALL-FORM）是关键词强项；同义改写是重叠/向量的强项。逐题看 Recall@5，不要只看平均分。',
    ],
    practice: '打开本页检索对照表，记下三种模式的 meanRecall@5，并点开一道编号题与一道同义题看命中。',
    practiceItems: [
      {
        prompt: '编号查不到时先查哪一层？',
        answer: '先看关键词是否进索引/查询是否被过度归一；再看权限过滤是否丢掉文档。不要先改生成提示。',
        scoring: ['指向检索/元数据', '非先改提示'],
      },
      {
        prompt: '换嵌入模型后旧索引能直接用吗？',
        answer: '通常不能。空间不兼容时分数无意义，需重建并重跑冻结评测。',
        scoring: ['重建', '重测'],
      },
    ],
    quizzes: [
      {
        question: '召回率提高了，最终回答准确性却降低，如何排查？',
        answerShort: '先看噪声块与生成忠实度，再看重排与上下文位置。',
        answerDeep:
          '检索变宽可能塞进旧版/无关段。分开报 Recall 与答案正确率；检查冲突版本是否被优先。',
        followUps: [
          {
            question: '为何本课重叠检索要标明“不是向量”？',
            points: ['避免假冒实测', '只作可复现对照', '上线需真模型与版本'],
          },
        ],
        commonMistakes: ['只看平均分', '把重叠率当 Sentence Transformer'],
        scoring: ['分层指标', '诚实标注'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: 'L1_DOCS + L1_EVAL；运行 compareRetrieveModes()。',
      steps: [
        '运行三种检索模式对照。',
        '记录 meanRecall@5。',
        '任选失败题查看 hits。',
      ],
      expected: '三行对照表；至少一道坏例归因。未接真实向量模型。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Sentence Transformers：语义检索',
        href: 'https://sbert.net/examples/sentence_transformer/applications/semantic-search/README.html',
        terms: '真向量路径对照。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'rag-pipeline': {
    title: '完整 RAG 流水线（M07）',
    scope: '导入→索引→权限→召回→重排→上下文→答案/引用；无答案、冲突、删除同步。',
    outcomes: [
      '能画出带权限过滤的流水线',
      '能解释为何不用“只靠长上下文/微调”替代检索',
      '能用 mock 生成验证契约：拒答、引用、不串租户',
    ],
    prerequisites: ['retrieve-baseline', 'rag', 'rag-layers'],
    terms: [
      { zh: '重排', en: 'rerank', meaning: '对初召回名单再打分收窄' },
      { zh: '串租户', en: 'cross-tenant leak', meaning: '用户看到无权租户的数据' },
    ],
    reading: [
      '完整 RAG 不是“向量库 + 提示词”。权限必须在召回前过滤。生成可用 mock 先验证契约：无答案拒答、冲突标版本、注入不跟从。',
      '长上下文不能替代权限与更新同步；微调不解决每周改制度。重排是否值得，要用冻结集上看答案/延迟/成本，而不是感觉。',
      '删除同步：源文档删了，索引与缓存要失效，否则会引用幽灵条款。本课 L1 以静态快照演示流程，删除操作用检查清单覆盖。',
    ],
    practice: '对照 L1 评测报告：aclFailures 必须为 0；点开冲突题看是否引用现行版。',
    practiceItems: [
      {
        prompt: '如何验证没有串租户？',
        answer: '用无权租户题：相关文档不得出现在 hits；答案不得含对方租户专有字段。自动化断言 aclFailures=0。',
        scoring: ['召回层过滤', '答案断言'],
      },
      {
        prompt: '为什么重排不一定值得？',
        answer: '若冻结集上答案率无提升或延迟/成本超预算，可不上。要用数字，不是默认加组件。',
        scoring: ['指标', '成本/延迟'],
      },
    ],
    quizzes: [
      {
        question: '有两份冲突的报销制度，怎样回答并引用，怎样评测？',
        answerShort: '标明现行版本；评测分开打引用与结论。',
        answerDeep: '元数据带版本；优先非旧版；冲突题同时保留旧版 id 便于审计。',
        followUps: [
          {
            question: '删除旧版文档后索引该怎样？',
            points: ['同步删除或标记失效', '缓存失效', '回归评测'],
          },
        ],
        commonMistakes: ['提示词禁止旧版当作唯一控制', '权限放在生成后'],
        scoring: ['版本', '评测'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: 'runL1Eval(hybrid) 全量报告。',
      steps: [
        '跑 hybrid 评测。',
        '确认 aclFailures=0。',
        '记录 answerOkRate 与 meanRecallAt5。',
      ],
      expected: '权限失败为 0；报告可导出。生成器为 mock-rules，非现场 LLM。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'RAG 原始论文（Lewis 等，2020）',
        href: 'https://arxiv.org/abs/2005.11401',
        terms: '开放预印本。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'eval-runner': {
    title: '评测集与运行器（M09）',
    scope: '开发集/冻结集、分层指标、坏例、消融与回归；LLM judge 偏差。',
    outcomes: [
      '能解释冻结测试集不能拿来调参',
      '能按错误类型列出坏例',
      '能判断“总分升但引用变差”不应上线',
    ],
    prerequisites: ['eval-set', 'rag-pipeline'],
    terms: [
      { zh: '消融', en: 'ablation', meaning: '去掉某一组件看指标变化' },
      { zh: '回归', en: 'regression', meaning: '改动后重跑冻结集防止变差' },
    ],
    reading: [
      'L1_EVAL 是冻结集：改检索参数时不要改题面来凑分。开发阶段可另建扩展集。指标至少分层：Recall@5、答案正确率、拒答、权限失败数。',
      'LLM-as-judge 有偏好与不稳定；本课答案判定用规则与关键词，可重复。人工 rubrics 仍要抽查。重复采样若用真模型，需固定温度并报方差——本环境未跑。',
      '消融：关掉混合只留关键词，看编号题与同义题此消彼长。回归：每次改切分/权限/生成规则都出报告。',
    ],
    practice: '导出一页结果：总体指标 + 至少 3 条 answerOk=false 的坏例。',
    practiceItems: [
      {
        prompt: '总分上升但引用变差，能否上线？',
        answer: '不能仅凭总分。引用/忠实度变差意味着不可审计。应挡住发布并修生成或上下文。',
        scoring: ['否', '分层指标'],
      },
    ],
    quizzes: [
      {
        question: '离线评测很高，上线仍失败，如何检查？',
        answerShort: '查泄漏、分布偏移、指标与业务不一致、权限与延迟截断。',
        answerDeep:
          '冻结集若与演示重叠会虚高；线上查询词不同；超时导致空上下文。要有线上抽样与坏例回流。',
        followUps: [
          {
            question: '为何本课不用 LLM judge 当唯一分数？',
            points: ['偏差', '不可复现', '规则可测'],
          },
        ],
        commonMistakes: ['调参用冻结集改题', '一个总分掩盖权限失败'],
        scoring: ['泄漏/分布', '分层'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: 'L1 评测报告 JSON（页面可复制）。',
      steps: ['跑评测', '按 kind 看 byKind', '列出坏例 id'],
      expected: '坏例可追踪到 question 与 hits。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Anthropic：Demystifying evals for AI agents',
        href: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents',
        terms: '评测方法参考，非本项目认证。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'l1-kb': {
    title: 'L1：可评测知识库助手',
    scope: '25 篇合成文档 + 30 道冻结题；关键词/混合/mock 生成；权限零泄漏门槛。',
    outcomes: [
      '能一键跑通 L1 评测并读懂报告',
      '能说明无凭据路径与 live 路径的差别',
      '能回答答辩：换租户/换版本后设计怎么变',
    ],
    prerequisites: ['retrieve-baseline', 'rag-pipeline', 'eval-runner'],
    reading: [
      'L1 是首个主项目闭环：公开合成语料、license 声明、冻结 30 题、mock 生成。硬门槛：aclFailures 必须为 0。小测试集零泄漏不等于系统已被安全证明。',
      '交付物：语料清单、评测 JSON 结果、三种检索对照、失败复盘。真模型与向量服务需自配，且不得把 mock 报成现场 LLM。',
      '扩展集未写入本题包，留给你自己加近义问法；不要改冻结题凑分。',
    ],
    practice: '在本页跑评测，确认权限失败为 0，并写 3 分钟项目介绍提纲。',
    practiceItems: [
      {
        prompt: '3 分钟介绍应包含什么？',
        answer: '问题边界、数据与权限、流水线、指标与坏例、个人贡献、已知局限（mock 生成/重叠替身）。',
        scoring: ['边界', '证据', '局限'],
      },
    ],
    quizzes: [
      {
        question: '为什么选单 Agent 之前先做 L1 知识库？',
        answerShort: '先证明检索与评测，再加工具循环，否则失败不可归因。',
        answerDeep: '知识库失败时加 Agent 只会叠错。L2 再引入受控工具。',
        followUps: [
          {
            question: '换数据量变大后先改什么？',
            points: ['切块与索引', 'ANN', '评测抽样', '成本'],
          },
        ],
        commonMistakes: ['先堆多 Agent', '无评测上线'],
        scoring: ['顺序', '归因'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: '见页面 L1 工作台。',
      steps: ['查看语料规模', '对照检索', '跑 hybrid 评测', '复制报告'],
      expected: 'aclFailures=0；明白 generator=mock-rules。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'RAG 原始论文（Lewis 等，2020）',
        href: 'https://arxiv.org/abs/2005.11401',
        terms: '开放预印本。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },
}
