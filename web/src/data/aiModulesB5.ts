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

export const AI_B5_EXTRAS: Record<string, Extra> = {
  'project-defense': {
    title: '项目与面试表达（M12）',
    scope: '需求澄清、设计取舍、个人贡献、证据、失败复盘与系统设计口述。',
    outcomes: [
      '能在 3 分钟内讲清一个项目的边界、指标与坏例',
      '能回答“换数据量/权限/成本后设计怎么变”',
      '能区分训练分与录用概率（后者不做承诺）',
    ],
    prerequisites: ['l1-kb', 'l2-agent', 'eval-runner', 'you-own'],
    terms: [
      { zh: '答辩证据', en: 'defense evidence', meaning: '可指着的评测报告、轨迹、坏例，而非形容词' },
      { zh: '约束变更', en: 'constraint change', meaning: '面试官改 QPS/权限/预算时设计如何收缩' },
    ],
    reading: [
      'M12 不背公司题。开口顺序：问题与用户 → 非目标 → 架构一张图 → 你负责的模块 → 指标与坏例 → 已知局限（例如 mock 生成）。L1/L2 报告是证据源。',
      '取舍要说清：为何先 RAG 再 Agent；为何写操作模拟；为何冻结集不能调参。个人贡献避免“我们做了 AI”，要落到你改的过滤、评测或门禁。',
      '失败复盘：挑一条 acl/注入/超时轨迹，说明停机原因与修复层。系统设计追问用题库 q05/q11/q12 练约束变更。',
    ],
    practice: '按题库模拟面试 C 走一遍，录音；对照评分点自评 0–4，并记下待补课 key。',
    practiceItems: [
      {
        prompt: '3 分钟项目介绍应包含什么？',
        answer: '边界、数据与权限、流水线、指标与坏例、个人贡献、局限（mock/未接真模型）。',
        scoring: ['边界', '证据', '局限'],
      },
      {
        prompt: '面试官把权限从单租户改成多租户，你先改哪？',
        answer: '召回前 ACL、缓存键、评测加越权题；不先加多 Agent。',
        scoring: ['ACL', '评测', '不堆代理'],
      },
    ],
    quizzes: [
      {
        question: '为什么选单 Agent，什么时候升级多 Agent，如何验证？',
        answerShort: '先单后多；同任务同预算有证据再升级。',
        answerDeep: '见题库 q12；办公多 Agent 是比较实验，不是默认。',
        followUps: [
          {
            question: '没有评测报告能不能谈“效果很好”？',
            points: ['不能当证据', '至少坏例与指标', '标明未验证项'],
          },
        ],
        commonMistakes: ['堆名词', '隐瞒 mock'],
        scoring: ['证据', '顺序'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: 'L1/L2 导出 JSON + 题库模拟面试 C。',
      steps: ['写 3 分钟提纲', '答一道约束变更', '自评并链到补课'],
      expected: '提纲含局限声明；分数仅训练用。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Anthropic：Building effective agents',
        href: 'https://www.anthropic.com/engineering/building-effective-agents',
        terms: '工程取舍对照。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'interview-bank': {
    title: '可训练主问题（24/60）',
    scope: '原创模拟题两批共 24 题；目标 60。结论/机制/追问/错因/补课；0–4 自评。',
    outcomes: [
      '能按题完成 30 秒结论与 2–3 分钟机制',
      '能应对至少两层追问要点',
      '能根据缺失点跳到对应课程',
    ],
    prerequisites: ['project-defense', 'llm-interview'],
    reading: [
      '题库从“提问方向”变成可训练回答：每题有岗位路线、难度、先修、必须说到的条件。明确原创模拟，不冒充真题。',
      '评分 0–4 只用于训练反馈；界面不宣传录用概率。数学/机制题可用纸面推演；Agent 题可对照 L2 轨迹。',
      '60 题是编辑目标：已发布 24 道（两批），后续按域扩展，禁止答案占位。',
    ],
    practice: '打开本页题库工作台，任选 4 题闭卷答，再展开参考并自评。',
    practiceItems: [
      {
        prompt: '答卷最低要覆盖哪些块？',
        answer: '结论版、机制版、一层追问、一个常见错因、一个补课 key。',
        scoring: ['结构完整'],
      },
    ],
    quizzes: [
      {
        question: '提示、RAG、微调各解决什么？何时都不用？',
        answerShort: '见 q01；规则/查库/确定计算可不用模型。',
        answerDeep: '打开题库 q01 对照 mustSay。',
        followUps: [
          { question: '本批还有哪道安全题？', points: ['q07 注入发信', 'q05 缓存隔离'] },
        ],
        commonMistakes: ['背名词无失败例'],
        scoring: ['选型'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: 'AI_DRILL_QUESTIONS 12 题。',
      steps: ['抽 4 题', '闭卷', '自评', '记下 <3 分的补课'],
      expected: '每题能指到 lessonKeys。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [],
    verifiedAt: '2026-10-07',
  },

  'mock-interview-basic': {
    title: '模拟面试 A：基础口述',
    scope: '约 35 分钟；结论→机制→失败情形。',
    outcomes: ['能在限时内答完 4 道口述题并自评'],
    prerequisites: ['interview-bank', 'kv-cache', 'change-how'],
    reading: [
      '套题：q01、q08、q09、q04。不要求展示模型私有思维链；评可见答案与例子。',
      '计时建议：每题 6–8 分钟含追问。结束后把 <3 分题链回课程。',
    ],
    practice: '用工作台筛选“模拟 A”四题，录音作答。',
    practiceItems: [
      {
        prompt: '口述最低标准是什么？',
        answer: '每点带一个失败情形；因果 mask 与 KV 因子说得出。',
        scoring: ['失败情形'],
      },
    ],
    quizzes: [
      {
        question: 'KV Cache 增长因子？',
        answerShort: '见 q09。',
        answerDeep: 'layers×kv_heads×seq×head_dim×bytes。',
        followUps: [{ question: 'GQA 改哪项？', points: ['kv_heads'] }],
        commonMistakes: ['当长期记忆'],
        scoring: ['因子'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: 'mock-basic 题单。',
      steps: ['计时', '答完', '自评表'],
      expected: '四题均有自评分数。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    verifiedAt: '2026-10-07',
  },

  'mock-interview-debug': {
    title: '模拟面试 B：代码/排错',
    scope: '约 40 分钟；对着轨迹与指标归因。',
    outcomes: ['能用 L1/L2 字段解释停机与泄漏'],
    prerequisites: ['interview-bank', 'l2-agent', 'eval-runner'],
    reading: [
      '套题：q03、q06、q07、q10。允许打开 L2 工作台指轨迹，但先自己说再对照。',
    ],
    practice: '先闭卷答幂等与注入，再跑对应 fault 验证。',
    practiceItems: [
      {
        prompt: '超时重试如何不双下单？',
        answer: '同幂等键 + 账本；见 q06 / L2 duplicate_request。',
        scoring: ['幂等'],
      },
    ],
    quizzes: [
      {
        question: 'JSON 可解析能否直接执行订单？',
        answerShort: '否；见 q03。',
        answerDeep: 'schema、ACL、审批指纹。',
        followUps: [{ question: '批后改参？', points: ['stale_approval'] }],
        commonMistakes: ['parse 即执行'],
        scoring: ['门禁'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: 'L2 故障套件 + 题单 B。',
      steps: ['答题', '跑 fault', '对照 stop reason'],
      expected: '口述与轨迹一致。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    verifiedAt: '2026-10-07',
  },

  'mock-interview-design': {
    title: '模拟面试 C：系统设计/项目答辩',
    scope: '约 45 分钟；边界、指标、约束变更。',
    outcomes: ['能完成项目答辩结构并应对换约束'],
    prerequisites: ['project-defense', 'interview-bank', 'l1-kb'],
    reading: [
      '套题：q02、q05、q11、q12。结合 M12 提纲；强调证据与局限声明。',
    ],
    practice: '3 分钟项目介绍 + 两道约束变更追问。',
    practiceItems: [
      {
        prompt: '换多租户先改什么？',
        answer: 'ACL、缓存键、越权评测；见 q05。',
        scoring: ['隔离'],
      },
    ],
    quizzes: [
      {
        question: '何时升级多 Agent？',
        answerShort: '有对照证据时；见 q12。',
        answerDeep: '同任务同预算同判分。',
        followUps: [{ question: '无证据呢？', points: ['保持单 Agent/workflow'] }],
        commonMistakes: ['默认多 Agent'],
        scoring: ['证据'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: 'M12 提纲 + mock-design。',
      steps: ['介绍', '答约束变更', '自评'],
      expected: '含坏例与局限。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    verifiedAt: '2026-10-07',
  },
}
