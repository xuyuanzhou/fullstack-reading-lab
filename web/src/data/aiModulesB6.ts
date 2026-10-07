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

export const AI_B6_EXTRAS: Record<string, Extra> = {
  'algo-track': {
    title: '算法支线地图（A 线入口）',
    scope: '应用线先了解取舍；算法岗再完成训练/架构实验。算力与未验证项必须标明。',
    outcomes: [
      '能说出 A01–A08 各自最低证据，不把读文档当完成实验',
      '能区分本机可跑的小实验与“大规模结论未验证”',
      '能按岗位决定跳过或深入哪几单元',
    ],
    prerequisites: ['math-ml-min', 'python-prep', 'model-mechanics'],
    terms: [
      { zh: '算力标注', en: 'compute note', meaning: '写清 CPU/GPU、是否代跑、能否复现' },
      { zh: '留出评测', en: 'held-out eval', meaning: '调参没用过的测试划分' },
    ],
    reading: [
      '算法支线不是第一天必做。应用开发主线（L0–L2、M 课）先闭环。A 线最低证据见进度文档：训练流程、Transformer 深入、LoRA、对齐、推理系统、训练系统、多模态选修、研究复现卡。',
      '本站公开路径以讲解 + 纸面/CPU 小实验为主。任何“准确率提升 X%”若未在本环境跑出，一律标未验证。无 GPU 时用小模型/小数据只验证流程。',
      '推荐顺序：A01 → A02 → A03/L3 → A04–A08 按岗位选修（课已齐，实验证据须自配算力）。U03 可跳过先修提示，答辩要说清跳过了什么。',
    ],
    practice: '在纸上勾选你要完成的 A 单元，并写下可用硬件（仅 CPU / 有 GPU / 只用 API）。',
    practiceItems: [
      {
        prompt: '为什么不能把“看完 HF 课程”当成 A01 完成？',
        answer: 'A01 要有自己的 Dataset/循环/checkpoint/复现证据；课程链接是入口不是证据。',
        scoring: ['自己的脚本/步骤', '复现'],
      },
    ],
    quizzes: [
      {
        question: '应用岗要不要做完 A01–A08？',
        answerShort: '不必。了解取舍即可；算法岗才按单元交证据。',
        answerDeep: '应用岗优先 L1/L2/评测/安全。A05 推理系统可作选修阅读。',
        followUps: [
          { question: '无 GPU 怎么交代？', points: ['标 CPU 小实验', '不宣称大模型效果', '流程仍要完整'] },
        ],
        commonMistakes: ['堆论文名词无实验', '编造收益'],
        scoring: ['岗位分流'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '本页清单 + PyTorch Learn the Basics 链接。',
      steps: ['勾选单元', '写硬件', '打开 A01'],
      expected: '有个人范围声明。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'PyTorch Learn the Basics',
        href: 'https://docs.pytorch.org/tutorials/beginner/basics/intro.html',
        terms: '官方基础路线。核查日期 2026-10-07。',
      },
      {
        title: 'Hugging Face LLM Course 前置',
        href: 'https://huggingface.co/learn/llm-course/chapter1/1',
        terms: '需 Python/深度学习基础。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'pytorch-train': {
    title: 'PyTorch 训练闭环（A01）',
    scope: 'Dataset/DataLoader、autograd、optimizer、train/eval、checkpoint、复现；不是只调 pipeline。',
    outcomes: [
      '能写出训练一步与评估一步的数据流',
      '能说明 checkpoint 恢复要保存什么',
      '能固定数据划分并报告是否本机跑通',
    ],
    prerequisites: ['algo-track', 'math-ml-min', 'python-prep'],
    terms: [
      { zh: '检查点', en: 'checkpoint', meaning: '权重与优化器等可恢复状态' },
      { zh: '数据泄漏', en: 'leakage', meaning: '用测试信息做了训练期决策' },
    ],
    reading: [
      '完整流程：固定划分 → Dataset → DataLoader → 模型 → loss → backward → optimizer.step → eval → 存 checkpoint。只调用 transformers pipeline 不算 A01。',
      '复现：seed、依赖版本、数据路径、配置写入笔记。恢复训练要能从 checkpoint 续跑（至少纸面写出字段清单）。',
      '本课默认 CPU 小任务说明流程。若你本机未跑，实验状态保持 unverified，不要填假曲线。',
    ],
    practice: '按实验清单勾选；有环境则跑官方 basics 中的一小例并记录版本。',
    practiceItems: [
      {
        prompt: 'checkpoint 至少应包含什么？',
        answer: '模型权重、优化器状态、步数/epoch、配置与数据划分标识；只存权重不够稳健恢复。',
        scoring: ['权重', '优化器', '步数'],
      },
      {
        prompt: '如何避免预处理泄漏？',
        answer: '标准化等统计量只在训练集拟合，再变换到验证/测试；划分先于拟合。',
        scoring: ['先划分', 'fit 仅 train'],
      },
    ],
    quizzes: [
      {
        question: '训练损失低为何不等于上线好？',
        answerShort: '过拟合、泄漏、分布偏移、指标与业务不一致。',
        answerDeep: '要有留出集与坏例；上线还有延迟与权限。见 M03/M09。',
        followUps: [
          { question: '本课有没有代跑 GPU？', points: ['没有', '须自标未验证'] },
        ],
        commonMistakes: ['用测试调参', '无版本记录'],
        scoring: ['泛化', '证据'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: 'PyTorch Basics；可选本机一小 MLP。',
      steps: [
        '列出 Dataset 字段',
        '写 train/eval 伪代码',
        '写 checkpoint 字段表',
        '若本机跑通，记录 torch 版本与是否 CPU',
      ],
      expected: '清单完整；未跑则标未验证。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'PyTorch Learn the Basics',
        href: 'https://docs.pytorch.org/tutorials/beginner/basics/intro.html',
        terms: '官方。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'transformer-deep': {
    title: 'Transformer 深入（A02）',
    scope: 'MHA/GQA、RoPE、Norm、FFN、参数量与掩码；区分架构选择与普遍现象。',
    outcomes: [
      '能做一组注意力 shape 推导',
      '能说明 GQA 改的是 KV 头',
      '能区分“这篇架构的选择”与“一般规律”',
    ],
    prerequisites: ['algo-track', 'attention-who', 'kv-cache', 'transformer'],
    reading: [
      '在已有注意力/KV 课上补：多头与分组、位置编码族、预/后 Norm、FFN 宽度。参数量估算要写假设（层数、宽、词表）。',
      '掩码测试：因果与 padding 分开。不要把某一模型的 RoPE 细节说成所有 Transformer 定律。',
    ],
    practice: '纸面推导 batch=1、seq=4、heads=2、dim=8 时 Q/K/V 的 shape。',
    practiceItems: [
      {
        prompt: 'GQA 主要省哪项显存？',
        answer: 'KV 头数量（从而 KV cache），不是消灭序列长度线性项。',
        scoring: ['kv_heads'],
      },
    ],
    quizzes: [
      {
        question: '用三位置说明因果 mask 在哪？',
        answerShort: '见题库 q08：未来位置不可见。',
        answerDeep: '上三角 mask；与 padding mask 相与。',
        followUps: [{ question: '漏 mask 的风险？', points: ['泄漏未来', '虚高'] }],
        commonMistakes: ['混 padding'],
        scoring: ['因果'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '纸笔或小矩阵。',
      steps: ['画 QK^T', '标 mask', '写 GQA 头数假设'],
      expected: 'shape 表一张。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Attention Is All You Need',
        href: 'https://arxiv.org/abs/1706.03762',
        terms: '开放预印本。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'lora-sft': {
    title: 'SFT 与 LoRA 对照（A03）',
    scope: '数据、rank/alpha、遗忘与泄漏；无 GPU 时只验证流程叙事。',
    outcomes: [
      '能说明 LoRA 改哪类参数',
      '能设计 base / prompt / LoRA 对照表（含硬件声明）',
      '能拒绝无留出评测的“提升”说法',
    ],
    prerequisites: ['algo-track', 'change-how', 'pytorch-train'],
    terms: [
      { zh: '低秩适配', en: 'LoRA', meaning: '在冻结底座上注入可训练低秩更新' },
      { zh: '监督微调', en: 'SFT', meaning: '用指令-回答对继续训练' },
    ],
    reading: [
      '对照 PEFT 概念：rank、alpha、目标模块。同一任务比较 base、只改提示、LoRA；评测必须留出。硬件、步数、数据量写进笔记。',
      '无 GPU：完成数据审查 + 对照表 + 假想资源账单，并标明未训练。禁止编造准确率。',
    ],
    practice: '填一张三列对照表（方法 / 改动层 / 评测计划）。',
    practiceItems: [
      {
        prompt: '为何 DPO 不必须先训奖励模型？',
        answer: 'DPO 直接用偏好对优化策略；PPO-RLHF 才典型依赖奖励模型。不要混谈。',
        scoring: ['区分目标'],
      },
    ],
    quizzes: [
      {
        question: '提示、RAG、微调仍分不清时先做哪？',
        answerShort: '回 M04/选型课；材料常变优先 RAG。',
        answerDeep: 'LoRA 解决默认写法/风格，不替代检索更新。',
        followUps: [{ question: '遗忘风险？', points: ['旧能力下降', '要回归集'] }],
        commonMistakes: ['微调替代检索', '无留出集报提升'],
        scoring: ['选型'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: 'PEFT LoRA 文档；可选小任务（未代跑）。',
      steps: ['写对照表', '声明硬件', '标未验证'],
      expected: '无假指标。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'PEFT：LoRA',
        href: 'https://huggingface.co/docs/peft/main/en/conceptual_guides/lora',
        terms: '官方概念。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'l3-finetune': {
    title: 'L3：微调实验卡（流程版）',
    scope: '固定小任务划分；对比 base/提示/LoRA；质量、退化、资源。默认不代跑 GPU。',
    outcomes: [
      '能填完一张可追踪实验卡（数据、seed、配置、评测）',
      '能解释为何不设“必须涨点”的造假诱因',
      '能区分论文数字、自己测量与推测',
    ],
    prerequisites: ['lora-sft', 'pytorch-train', 'eval-runner'],
    reading: [
      'L3 验收重在设计合理与结果诚实。CPU 小模型只验证流程。输出：数据划分说明、配置、若未训练则明确未验证、若训练则曲线与坏例。',
      '与 L1/L2 不同：这里不提供假准确率。工作台是检查清单，不是伪装跑完的训练器。',
    ],
    practice: '在 L3 工作台勾选实验卡字段并导出 JSON。',
    practiceItems: [
      {
        prompt: '为什么不设准确率必须提高 X%？',
        answer: '会造成编造或泄漏刷分；应报告真实增益或退化并解释。',
        scoring: ['诚实', '可解释'],
      },
    ],
    quizzes: [
      {
        question: '实验卡最少要有哪些可追踪项？',
        answerShort: '数据划分、tokenizer/模型 id、依赖、seed、配置、checkpoint、评测脚本或步骤。',
        answerDeep: '缺任一项都难复现；未跑项写未验证。',
        followUps: [
          { question: '论文数字能直接当自己的结果吗？', points: ['不能', '分开写'] },
        ],
        commonMistakes: ['抄论文曲线', '无 seed'],
        scoring: ['可追踪'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: 'L3 实验卡工作台（清单，非训练器）。',
      steps: ['填卡', '导出', '若本机训练另附真实日志'],
      expected: 'JSON 含 unverified 标记。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'PEFT：LoRA',
        href: 'https://huggingface.co/docs/peft/main/en/conceptual_guides/lora',
        terms: '对照。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'a04-preference-align': {
    title: '偏好与对齐（A04）',
    scope: '奖励、RLHF/PPO、DPO、GRPO 的目标与假设；偏好数据审查。',
    outcomes: [
      '能比较 RLHF 与 DPO 各需要什么数据与组件',
      '能说明 DPO 不必须先训独立奖励模型',
      '能列出偏好集审查要点（一致、泄漏、代表谁）',
    ],
    prerequisites: ['lora-sft', 'algo-track', 'math-ml-min'],
    terms: [
      { zh: '偏好对', en: 'preference pair', meaning: '同一输入下 chosen/rejected 回答' },
      { zh: '对齐', en: 'alignment', meaning: '让模型行为符合人类或政策偏好' },
    ],
    reading: [
      '典型 RLHF：SFT → 奖励模型 → PPO 优化策略。DPO 直接用偏好对优化，省 RM+PPO 环，但不省高质量偏好数据。',
      'GRPO 等变体是算法目标差异，不是“更高级就默认更好”。小规模数值例子理解目标即可；大规模收益须自测并标未验证。',
      '应用岗多数场景对齐不是必做；先 RAG/门禁/评测。算法岗要会读偏好样本并找冲突与泄漏。',
    ],
    practice: '审查 5 条合成偏好对：标出 chosen 是否真更好、是否泄漏答案。',
    practiceItems: [
      {
        prompt: 'DPO 与 PPO-RLHF 各多什么组件？',
        answer: 'PPO 路径多奖励模型与在线 RL 环；DPO 离线偏好损失直接更新策略（仍要基座与数据）。',
        scoring: ['RM', '数据'],
      },
    ],
    quizzes: [
      {
        question: '偏好数据里 chosen 总是更长，会怎样？',
        answerShort: '模型可能学会“更长=更好”，与任务无关。',
        answerDeep: '审查长度/格式偏置；评测要有反例与长度无关题。',
        followUps: [{ question: '能否用 LLM 自动生成偏好？', points: ['可辅助', '须人工抽审', '防自嗨'] }],
        commonMistakes: ['DPO 免数据', '忽略偏置'],
        scoring: ['审查', '偏置'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '5 条合成偏好对 + 审查表。',
      steps: ['标 chosen/rejected', '写偏置', '写评测如何抓偏置'],
      expected: '至少 1 条发现偏置。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Hugging Face：RLHF',
        href: 'https://huggingface.co/docs/trl/main/en/rloo_trainer',
        terms: '文档入口；核查日期 2026-10-07。本课未代跑 TRL。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'a05-inference-system': {
    title: '推理系统（A05）',
    scope: 'KV 估算、量化、batching、PagedAttention、prefix cache；prefill/decode 与 TTFT。',
    outcomes: [
      '能分开说 TTFT 与每 token 延迟',
      '能列出 KV 显存主要因子',
      '能说明哪些优化需固定模型 revision 才可比',
    ],
    prerequisites: ['kv-cache', 'algo-track', 'transformer-deep'],
    terms: [
      { zh: 'TTFT', en: 'time to first token', meaning: '从请求到首个输出 token 的时间' },
      { zh: '连续批处理', en: 'continuous batching', meaning: 'decode 阶段动态拼 batch 提吞吐' },
    ],
    reading: [
      '推理账单分 prefill 与 decode。KV cache、量化、FlashAttention、PagedAttention、prefix cache 各改不同项；不要混成一个“加速魔法”。',
      '对比实验须固定模型 revision、硬件、输入长度分布。本站不代跑 vLLM；读文档 + 纸面估算即可，标 unverified。',
      '应用岗选修：能解释 p95 升高与排队、KV 占显存、429 限流的关系即可。',
    ],
    practice: '用 kv-cache 课公式估一层 KV 随 seq 增长；写 prefill/decode 各受什么影响。',
    practiceItems: [
      {
        prompt: 'GQA 在推理账单里改哪项？',
        answer: 'KV 头数；查询头可多于 KV 头以省 cache。',
        scoring: ['kv_heads'],
      },
    ],
    quizzes: [
      {
        question: 'prefill 和 decode 谁更吃首包延迟？',
        answerShort: 'prefill 决定 TTFT；decode 决定后续每 token。',
        answerDeep: '长提示 TTFT 高；高并发 decode 受 batching 与 KV 内存影响。',
        followUps: [{ question: '量化主要省什么？', points: ['权重/激活显存', '可能伤质量'] }],
        commonMistakes: ['cache=无长度成本'],
        scoring: ['两阶段'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '纸面 KV 表 + vLLM 文档目录。',
      steps: ['填因子', '写对比要固定什么', '标未跑'],
      expected: 'revision 与硬件写进笔记。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'vLLM 文档',
        href: 'https://docs.vllm.ai/en/latest/',
        terms: '服务对照。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'a06-train-scale': {
    title: '训练系统与扩展（A06）',
    scope: '混合精度、梯度累积/checkpoint、DDP/FSDP/ZeRO、MoE；显存账单。',
    outcomes: [
      '能画单机训练数据流（forward/backward/optim）',
      '能说明 ZeRO/FSDP 大致分什么',
      '能声明大规模结论是否本机验证',
    ],
    prerequisites: ['pytorch-train', 'algo-track'],
    terms: [
      { zh: '梯度累积', en: 'gradient accumulation', meaning: '多 micro-batch 再一步 optimizer' },
      { zh: '分片优化器', en: 'ZeRO', meaning: '把优化器状态分片到多卡降显存' },
    ],
    reading: [
      '混合精度与梯度 checkpoint Trade-off 算力/显存。DDP 同步梯度；FSDP/ZeRO 分片参数与优化器状态。',
      'MoE 是架构+系统问题：路由、负载均衡、通信。大规模 MFU 数字不要抄论文当自己的。',
      '玩具单机实验只验证“懂数据流”；集群结论标未验证。',
    ],
    practice: '写 micro-batch=4、accum=2 时 optimizer.step 频率。',
    practiceItems: [
      {
        prompt: 'gradient checkpoint 换什么？',
        answer: '用重算换激活显存；训练变慢。',
        scoring: ['显存', '重算'],
      },
    ],
    quizzes: [
      {
        question: 'OOM 先砍什么？',
        answerShort: 'batch/seq、checkpoint、精度、ZeRO；不是盲目加卡。',
        answerDeep: '看是激活还是优化器状态；再调累积与 offload。',
        followUps: [{ question: '多卡仍 OOM？', points: ['FSDP/ZeRO stage', 'seq 长度'] }],
        commonMistakes: ['只加 GPU 不调 batch'],
        scoring: ['账单'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '纸面数据流图。',
      steps: ['画 forward/backward', '标 ZeRO 分片对象', '标未验证'],
      expected: '无编造 MFU。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'PyTorch FSDP',
        href: 'https://pytorch.org/docs/stable/fsdp.html',
        terms: '官方。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'a07-multimodal-elective': {
    title: '多模态与现代选修（A07）',
    scope: '选一个真实任务 + 简单基线；何时不值得加复杂度；MCP 等按官方规范核验。',
    outcomes: [
      '能说明为何不是“能接图就该上多模态”',
      '能设计 OCR/布局 vs 纯文本 RAG 的对照',
      '能写“不值得做”的退出条件',
    ],
    prerequisites: ['algo-track', 'rag-pipeline'],
    terms: [
      { zh: '基线', en: 'baseline', meaning: '最简单可测方案，用于对照增益' },
      { zh: 'MCP', en: 'Model Context Protocol', meaning: '工具/上下文协议，字段以官方为准' },
    ],
    reading: [
      '选修：图文/OCR、语音、文档布局、GraphRAG、agentic retrieval。每加一个组件要有对照与成本。',
      '例：扫描 PDF 先 OCR+文本 RAG 基线，再考虑布局模型。若基线已满足 SLA，不必上更复杂管线。',
      '协议类（MCP）只链接官方说明，不编造字段；集成前核对版本。',
    ],
    practice: '选一个任务写两列：基线方案 vs 复杂方案，各写评测与成本。',
    practiceItems: [
      {
        prompt: '何时不值得 GraphRAG？',
        answer: '数据小、关系可 SQL/规则表达、或基线 RAG 已达标且维护成本过高。',
        scoring: ['基线', '成本'],
      },
    ],
    quizzes: [
      {
        question: '多模态上线还要什么非模型门槛？',
        answerShort: '权限、PII、延迟、失败降级、可观测。',
        answerDeep: '图像/音频存储与脱敏；OCR 错误传播；与 L1 权限同原则。',
        followUps: [{ question: 'OCR 错字 RAG 会怎样？', points: ['索引噪声', '要校验层'] }],
        commonMistakes: ['堆模型无基线'],
        scoring: ['对照', '退出条件'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '自选任务对照表。',
      steps: ['写基线', '写复杂方案', '写退出条件'],
      expected: '有“不做”的理由。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Model Context Protocol',
        href: 'https://modelcontextprotocol.io/',
        terms: '官方站点。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'a08-research-repro': {
    title: '研究复现卡（A08）',
    scope: '读论文、假设与局限、消融、区分论文结果/自测/推测。',
    outcomes: [
      '能填复现卡：环境、数据、指标、与论文差异',
      '能写一条消融计划',
      '能拒绝编造收益',
    ],
    prerequisites: ['algo-track', 'eval-runner', 'l3-finetune'],
    terms: [
      { zh: '消融', en: 'ablation', meaning: '去掉/替换组件看指标变化' },
      { zh: '复现卡', en: 'repro card', meaning: '追踪复现尝试的结构化记录' },
    ],
    reading: [
      '读论文先找：任务、数据、指标、假设、局限。复现只 claim 自己跑过的；推测单独标注。',
      '消融一次改一个因素；与 L3 实验卡字段对齐。统计不确定性：小样本不要过度解读。',
      '面试/答辩：说清“论文说 / 我测 / 我猜”。',
    ],
    practice: '选一篇公开论文摘要，填复现卡（可不跑代码，但标未验证）。',
    practiceItems: [
      {
        prompt: '复现失败最常见三类原因？',
        answer: '数据/划分不一致、实现细节、算力与超参不同；不是“论文错了”就完事。',
        scoring: ['数据', '实现', '资源'],
      },
    ],
    quizzes: [
      {
        question: '论文 +5% 你能直接写进简历吗？',
        answerShort: '不能；除非同一设置下你测到并说明差异。',
        answerDeep: '引用论文结果要标注来源；自己的测量单独写。',
        followUps: [{ question: '和 L3 卡关系？', points: ['同一追踪字段', '诚实标记'] }],
        commonMistakes: ['抄表格当自己的'],
        scoring: ['来源分离'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '复现卡模板（可导出 L3 类似 JSON）。',
      steps: ['填假设/局限', '填计划消融', '标未跑'],
      expected: '三类陈述分开写。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'scikit-learn Common Pitfalls',
        href: 'https://scikit-learn.org/stable/common_pitfalls.html',
        terms: '泄漏与评估。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },
}
