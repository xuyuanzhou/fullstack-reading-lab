/**
 * B2：M01–M05 与 L0 的扩展正文。与 aiSamples 合并加载，避免继续膨胀单文件。
 */
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

export const AI_B2_EXTRAS: Record<string, Extra> = {
  'ai-map': {
    title: 'AI 全景与学习诊断',
    scope: '分清 AI / 机器学习 / 深度学习 / 生成式 AI / LLM；做 10 道不计排名的诊断，选一条主线。',
    outcomes: [
      '能用自己的话区分训练与推理、分类/搜索/生成各适合什么',
      '能指出至少一类“不必上大模型”的任务',
      '能根据诊断结果说出自己下一步读哪几节',
    ],
    terms: [
      { zh: '人工智能', en: 'AI', meaning: '让机器表现出智能行为的宽泛目标与方法集合' },
      { zh: '机器学习', en: 'machine learning', meaning: '用数据拟合可改进预测的模型，不必手写全部规则' },
      { zh: '深度学习', en: 'deep learning', meaning: '用多层神经网络做表示学习的一类机器学习' },
      { zh: '大语言模型', en: 'LLM', meaning: '在大规模文本上训练、以生成下一个词元为主的生成模型' },
    ],
    reading: [
      '本公开课默认主线是：零基础 → 能交付的 LLM 应用开发者。CV、语音、推荐、强化学习等只作全景，不宣称已覆盖整个 AI 学科。',
      '关系可以记成包含与焦点：AI ⊃ 机器学习 ⊃ 深度学习；生成式 AI 是其中一类任务；LLM 是当前应用课的重点。训练改权重；推理（生成）用已有权重接词元。岗位上，应用岗要会检索、工具、评测与权限；算法岗还要推导、训练实验与论文级复现。',
      '选型先问任务：标签固定用分类器；精确编号/关键词用搜索；需要组织语言且接受不确定性时才用生成。表格求和、状态机审批、强规则校验，优先普通程序。',
      '下面诊断不计排名、不预测录用。答完看推荐路径：使用 / 补编程 / 应用主线 / 算法进阶。有 Java/前端基础可跳过重复语法，但不能跳过评测、数据与安全。',
    ],
    practice: '做完页面上的 10 道诊断。把推荐路径与你自己决定的下一步三节，写进笔记。',
    practiceItems: [
      {
        prompt: '解释题：什么任务不需要 LLM？分类器、搜索与生成怎样选？',
        answer:
          '规则清晰、输入输出可确定的任务（求和、权限判断、固定表单）不必上 LLM。标签集合稳定用分类器；要精确匹配编号/专有词用搜索；要组织自然语言且可接受拒答与评测时再用生成。三者可组合：搜索召回 + 生成组织，但真相仍以可校验依据为准。',
        scoring: ['举出不必上 LLM 的例子', '三类选型', '可组合但需校验'],
      },
    ],
    quizzes: [
      {
        question: '提示、RAG、微调各解决什么问题，什么情况下三者都不该用？',
        answerShort: '提示改本次输入；RAG 注入材料；微调改权重。规则可用程序算清时都不必用。',
        answerDeep:
          '提示适合短约束。材料会变、超窗口用检索。要改默认文风且有数据与评测才微调。确定性计算、强一致交易、可用 SQL 的查询，用程序更稳。',
        followUps: [
          {
            question: '用户只要“把两列金额相加”，为什么可能三者都不需要？',
            points: ['确定性算术', '模型增加幻觉风险', '成本与延迟无收益'],
            boundary: '表结构混乱时可用模型辅助解析，加法仍应程序做。',
          },
          {
            question: '诊断推荐了“补编程”，但你投算法岗，怎么走？',
            points: ['编程与数学是算法先修', '应用主线仍建议碰评测', '再进入 A01 支线'],
          },
        ],
        commonMistakes: ['会聊天等于会开发', '一切问题先微调', '把诊断分当成能力证明'],
        scoring: ['三者职责', '不适用场景'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '本页 10 道诊断题；无需密钥与 GPU。',
      steps: [
        '逐题选择最接近现状的一项。',
        '查看主推荐与次推荐路径说明。',
        '写下下周只推进的三节课 key。',
      ],
      expected: '笔记里有路径名称与三节 key；不把诊断分截图当证书。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Hugging Face LLM Course：课程介绍与前置',
        href: 'https://huggingface.co/learn/llm-course/chapter1/1',
        terms: 'Apache-2.0。注明需要较好 Python，最好有深度学习入门。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'python-prep': {
    title: 'Python 与工程预备',
    scope: '环境、函数与容器、异常、文件与 JSON、HTTP、依赖与 Git。为模型请求的失败与重试打底。',
    outcomes: [
      '能说清：读 JSON、校验字段、HTTP 超时，各在哪一层处理',
      '能列出缺文件 / 坏 JSON / 超时三类测试要断言什么',
      '能说明模型请求的重试为什么不应放在“再问一句提示”里',
    ],
    prerequisites: ['ai-map'],
    terms: [
      { zh: '依赖', en: 'dependency', meaning: '项目声明的第三方库及其版本' },
      { zh: '超时', en: 'timeout', meaning: '等待响应超过上限后中止，避免线程永久挂起' },
      { zh: '重试', en: 'retry', meaning: '对可恢复错误再次请求，通常带退避' },
    ],
    reading: [
      '应用课不要求你先背完语言全书，但要能：建虚拟环境、读写文件、解析 JSON、用 HTTP 客户端设超时、看懂堆栈、用 Git 保存可复现版本。Hugging Face 课程也写明需要较好的 Python 基础。',
      '一次“读公开 JSON → 校验 → HTTP 返回”的最小服务，把边界拆开：文件不存在返回 404 类错误；JSON 坏了返回 400；上游超时返回 504 或可重试标记。模型调用慢、失败、重试，应落在这一层程序，而不是让用户改提示词碰运气。',
      '异步基础只需建立印象：并发等待多个 I/O 时不要阻塞整进程；本课验收以同步脚本 + 超时参数也可。密钥只放环境变量，不进仓库与静态前端。',
      '无本机 Python 时，先用纸面走通：给定假响应，写出校验伪代码与三类错误分支。有环境后再按实验步骤自跑；本站静态页不代跑你的本机进程。',
    ],
    practice:
      '按实验步骤在本机（或纸面）完成：读取一份公开 JSON、校验必填字段、用假 HTTP 返回。补三类失败用例。',
    practiceItems: [
      {
        prompt: '解释题：模型请求慢、失败、重试该放哪里？',
        answer:
          '放在调用供应商的客户端/服务层：超时、退避、对 429/5xx 的有限重试、日志与取消。业务校验（schema、权限）在重试之前或单独失败。不要把重试实现成“再生成一次更长的提示”。',
        scoring: ['指向程序层', '错误分类', '对比提示重试'],
      },
      {
        prompt: '排错题：日志显示 JSON 解析失败，但同事说“模型偶尔抽风”。你先查什么？',
        answer:
          '先固定本次原始响应字节与 Content-Type，用同一校验函数单测。若假供应商稳定复现，是契约/校验问题；若仅真实供应商偶发，再查截断、温度与结构化输出设置。',
        scoring: ['先固定原始响应', '区分契约与模型', '不先改提示'],
      },
    ],
    quizzes: [
      {
        question: '为什么 JSON 可解析不等于订单工具可以执行？',
        answerShort: '语法合法≠字段合法≠业务允许执行。',
        answerDeep:
          'parse 成功只过语法。还要必填字段、类型、范围、幂等键、权限。写操作必须程序校验通过后才执行。',
        followUps: [
          {
            question: '超时后重试，如何避免重复创建订单？',
            points: ['幂等键', '先查后写', '重试只用于安全的读或带幂等的写'],
            boundary: '无幂等的写不应盲目重试。',
          },
        ],
        commonMistakes: ['把 HTTP 200 当业务成功', '密钥写进前端'],
        scoring: ['分层校验', '写操作边界'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials:
        '示例 payload：{"id":"doc-1","title":"报销","body":"须附发票"}。缺文件 / {"title":} / 模拟超时 三种分支用假对象即可。',
      steps: [
        '写或纸演函数 load_doc(path)：文件不存在 → 明确错误；json 坏 → 明确错误；成功 → 返回 dict。',
        '写 validate(doc)：缺 id/title/body → 失败。',
        '写 fetch_upstream(fake)：可抛 Timeout；成功返回 200 与 body。',
        '为三失败各写一条断言（测试名即可）。',
      ],
      expected: '三类失败有可观察断言；成功路径返回校验后的对象。本环境未代跑你的解释器。',
      commonErrors: ['把异常吞掉只返回 None', '超时不设上限', '真实密钥写进脚本提交'],
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Hugging Face LLM Course：前置要求',
        href: 'https://huggingface.co/learn/llm-course/chapter1/1',
        terms: 'Apache-2.0。核查日期 2026-10-07。',
      },
      {
        title: 'Python：json 模块',
        href: 'https://docs.python.org/3/library/json.html',
        terms: '官方文档。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'math-ml-min': {
    title: '最小数学与机器学习',
    scope: '向量与 shape、softmax、交叉熵、梯度直觉；训练/测试拆分、过拟合、基线与 precision/recall。',
    outcomes: [
      '能手算一个三分类 softmax 与交叉熵',
      '能说明训练损失低为什么不等于上线好',
      '能指出预处理泄漏的一种典型做法并改正',
    ],
    prerequisites: ['python-prep'],
    terms: [
      { zh: '归一化指数', en: 'softmax', meaning: '把一组分数变成总和为 1 的非负概率' },
      { zh: '交叉熵', en: 'cross-entropy', meaning: '衡量预测分布与正确类别之间的差距' },
      { zh: '过拟合', en: 'overfitting', meaning: '训练集表现好、未见数据变差' },
    ],
    reading: [
      '应用开发者不必先推完所有证明，但要会：向量/矩阵的 shape 是否可乘；softmax 把 logits 变成概率；交叉熵在正确类上惩罚低概率；梯度指出参数该往哪边挪一点。',
      '机器学习最小闭环：数据拆成训练与测试（测试不参与调参）；先立一个非 ML 基线；再看准确率之外的 precision/recall 取舍。训练损失很低但测试差，就是过拟合或泄漏。',
      '预处理泄漏：用含测试样本的统计量做归一化，再拆分——测试信息漏进训练。正确顺序是先拆分，只在训练集上拟合预处理，再变换测试集。',
      '手算比背公式重要。下面练习给出三分类小数，请自己算一遍再对折叠答案。',
    ],
    practice: '完成手算练习；用一句话写清你岗位更关心 precision 还是 recall。',
    practiceItems: [
      {
        prompt: '手算：logits = [2.0, 1.0, 0.1]，正确类是第 0 类。写出 softmax 概率（保留两位小数）与交叉熵 −log p0 的约值。',
        answer:
          'exp≈[7.39, 2.72, 1.11]，和≈11.22；softmax≈[0.66, 0.24, 0.10]。交叉熵≈ −log(0.66)≈0.42。允许四舍五入误差；关键是步骤：指数→归一→取正确类→取负对数。',
        scoring: ['softmax 步骤', '用对正确类', '数量级合理'],
      },
      {
        prompt: '解释题：训练损失很低，上线却很差，可能有哪些原因？',
        answer:
          '过拟合；训练/上线分布不一致；评测集泄漏或与演示材料重叠；指标与业务不一致（如只看准确率忽略拒答）；线上延迟导致截断。需要冻结测试集与坏例，而不是只看训练曲线。',
        scoring: ['过拟合或分布', '泄漏', '指标/业务'],
      },
    ],
    quizzes: [
      {
        question: 'precision / recall 如何取舍？',
        answerShort: 'precision 高表示报出的正例更准；recall 高表示真实正例更少漏掉。看漏报与误报谁更贵。',
        answerDeep:
          '风控漏放（假阴性）很贵时抬 recall；客服误报骚扰很贵时抬 precision。阈值与业务损失绑定，不是越高越好。',
        followUps: [
          {
            question: 'RAG 里“召回率升、答案正确率降”和分类的 recall 有何不同？',
            points: ['检索 recall@k 是候选是否进名单', '答案正确还依赖生成忠实度', '两者要分开报'],
          },
        ],
        commonMistakes: ['只报一个总分', '在测试集上调阈值假装泛化'],
        scoring: ['定义', '业务取舍'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '纸笔；可选对照 scikit-learn 常见陷阱文档（预处理泄漏）。',
      steps: [
        '手算上面 softmax/交叉熵。',
        '写两行伪代码：错误的“先全局标准化再拆分”与正确的“先拆分再 fit”。',
        '自拟一个二分类场景，写清更怕假阳性还是假阴性。',
      ],
      expected: '手算步骤可复查；泄漏对比写得出。未在本机训练真实模型。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'scikit-learn：常见陷阱（泄漏）',
        href: 'https://scikit-learn.org/stable/common_pitfalls.html',
        terms: '官方文档。核查日期 2026-10-07。',
      },
      {
        title: 'PyTorch：Learn the Basics',
        href: 'https://docs.pytorch.org/tutorials/beginner/basics/intro.html',
        terms: '张量到训练循环核对表。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'l0-verify': {
    title: 'L0：无密钥第一次成功',
    scope: '用公开短材料与标注样例，验证有答案 / 无答案 / 格式错误。预录结果标“样例”。',
    outcomes: [
      '能独立判分三道题的样例与坏例',
      '能写出输入、输出、依据、错误分类四列表',
      '知道真实调用需要自配服务，且不得把样例伪装成现场运行',
    ],
    prerequisites: ['three-parts', 'one-success', 'first-task'],
    reading: [
      'L0 的目标是第一次成功闭环，而不是接上最贵的模型。无密钥路径：材料三句 + 预录输出（样例）+ 坏例。你做的是判分与分类，不是“让模型现场再生成一次”。',
      '三题覆盖：有依据的事实题、格式题、材料没有答案的拒答题。坏例分别演示：引用在但结论反；格式漂；无依据编造。',
      '进一步（可选 live）：按 first-model-call 的真实调用说明自配密钥。成功标准仍是同一张判分表。成本与供应商条款自行负责；本站不代管密钥。',
    ],
    practice: '打开本页实验区，对照样例与坏例的自动检查结果，把四列表抄进笔记。',
    practiceItems: [
      {
        prompt: '解释题：为什么预录样例必须标明“样例”？',
        answer:
          '避免读者或演示把静态结果当成刚跑通的真实模型输出，从而高估系统可靠性。教学允许 mock，但状态要诚实。',
        scoring: ['诚实标注', '区分 mock/live'],
      },
    ],
    quizzes: [
      {
        question: '有引用但结论错误，应记哪类错误？',
        answerShort: '生成/忠实度错误，不是“没找到材料”。',
        answerDeep:
          '召回可能成功，但结论与依据矛盾或条件不适用。日志应同时保留 cite 与 support 判断。',
        followUps: [
          {
            question: '无答案题模型编造计薪规则，产品界面应显示什么？',
            points: ['未找到依据/材料没有', '不展示编造句当正式答复', '记入坏例集'],
          },
        ],
        commonMistakes: ['有 cite 就给分', '把 L0 样例当线上 SLA'],
        scoring: ['错误分类', '产品行为'],
      },
    ],
    experiment: {
      mode: 'mock',
      materials: '内置 L0_MATERIALS 与 L0_CASES（见页面实验区）。全部为合成教学数据。',
      steps: [
        '阅读三句材料。',
        '查看每题样例检查是否全过。',
        '查看坏例哪些检查失败，并对照 whyWrong。',
        '可选：自配密钥后用同一判分表跑 live（未代跑）。',
      ],
      expected: '样例检查通过；坏例至少暴露一类失败；笔记有四列表。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Hugging Face LLM Course：课程介绍',
        href: 'https://huggingface.co/learn/llm-course/chapter1/1',
        terms: 'Apache-2.0。L0 无密钥路径不依赖此课，仅作后续对照。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },

  'model-mechanics': {
    title: '模型机制一张图（M05）',
    scope: '把分词、嵌入、QKV、掩码、位置、残差、FFN、训练目标、prefill/decode、KV、采样串成可检查的清单。',
    outcomes: [
      '能按清单指出一次生成经过的主要块',
      '能解释为何注意力分数要除以根号维度',
      '能说明上下文变长如何影响 KV 显存与延迟',
    ],
    prerequisites: ['tokens', 'attention-who', 'loss', 'decode-params', 'kv-cache'],
    terms: [
      { zh: '残差连接', en: 'residual', meaning: '把子层输入加到输出上，缓解深层难训练' },
      { zh: '前馈网络', en: 'FFN', meaning: '注意力之后对每个位置做的逐位置非线性变换' },
      { zh: '预填充', en: 'prefill', meaning: '对提示整段前向并建立初始缓存' },
    ],
    reading: [
      '把已有卡片收成一条链：文字 → 分词 ID → 嵌入向量 →（位置）→ 多层（注意力 + 残差/归一化 + FFN）→ logits → 采样得到下一词元。训练时用正确下一词元算损失并更新权重；推理时固定权重做 prefill 与逐步 decode。',
      'Q/K 点积过大时 softmax 变尖，故除以 √d。因果掩码挡住未来。KV cache 复用已算 K/V，但新位置仍产生新的 K/V。采样（温度、Top-p）不增加知识。',
      '资源：上下文长度同时推高 prefill 计算、decode 注意力长度与 KV 显存。面试回答要带条件：固定模型、头数/KV 头、精度字节。',
      '实验：分词对照、3×3 因果掩码、KV shape 表——不必 GPU。有环境可再对照 PyTorch 基础教程，仍属可选。',
    ],
    practice: '用一页纸画出链路上的方框，并完成练习中的掩码与 shape 题。',
    practiceItems: [
      {
        prompt: '为什么注意力要除以 √d？',
        answer:
          '点积方差随维度增大；不缩放时 softmax 易极端，梯度变差。除以键维度平方根是原论文采用的稳定技巧。',
        scoring: ['点积随维变大', 'softmax 变尖', '稳定训练/数值'],
      },
      {
        prompt: '上下文从 1k 到 8k，KV 缓存大概怎样变？',
        answer:
          '在层数、KV 头数、头维、精度不变时，缓存体积大致随序列长度线性变长（约 8 倍量级）。并发请求时显存按会话叠加。不等于权重体积变 8 倍。',
        scoring: ['随长度线性', '区分权重与缓存', '并发'],
      },
    ],
    quizzes: [
      {
        question: '用三个位置说明因果 attention 哪里要 mask？KV 增长由哪些量决定？',
        answerShort: '不能看未来位置；体积≈层×KV头×长度×头维×字节。',
        answerDeep:
          '三 token 下三角可见、上三角为 0。GQA 减少 KV 头数。训练阶段通常不用生成向 cache。',
        followUps: [
          {
            question: '单头能否同时给多个位置非零权重？',
            points: ['能', 'softmax 分布可多峰', '多头是不同子空间'],
          },
        ],
        commonMistakes: ['说新词不算 K/V', '把注意力图当完整因果'],
        scoring: ['mask', '体积因子'],
      },
    ],
    experiment: {
      mode: 'explain',
      materials: '纸笔；可回顾 tokens / attention-who / kv-cache / decode-params。',
      steps: [
        '画链路方框并标注训练 vs 推理。',
        '填 3×3 因果掩码表。',
        '写 prefill 长度 n、decode 一步后缓存长度 n+1 的 shape 示意。',
      ],
      expected: '掩码上三角为屏蔽；shape 示意含长度维。未跑大模型。',
      verifiedAt: '2026-10-07',
      unverified: true,
    },
    sources: [
      {
        title: 'Attention Is All You Need',
        href: 'https://arxiv.org/abs/1706.03762',
        terms: '原论文。核查日期 2026-10-07。',
      },
      {
        title: 'Hugging Face：How caching works',
        href: 'https://huggingface.co/docs/transformers/cache_explanation',
        terms: '官方缓存说明。核查日期 2026-10-07。',
      },
      {
        title: 'PyTorch：Learn the Basics',
        href: 'https://docs.pytorch.org/tutorials/beginner/basics/intro.html',
        terms: '可选实验能力核对。核查日期 2026-10-07。',
      },
    ],
    verifiedAt: '2026-10-07',
  },
}
