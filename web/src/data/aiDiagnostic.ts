/** M01：不计排名的学习诊断。分数只用于推荐路径，不是面试分。 */

export type AiPathId = 'use' | 'code' | 'app' | 'algo'

export type AiDiagChoice = {
  id: string
  text: string
  /** 选中后给各路径加分 */
  scores: Partial<Record<AiPathId, number>>
}

export type AiDiagQuestion = {
  id: string
  prompt: string
  choices: AiDiagChoice[]
}

export const AI_PATHS: Record<
  AiPathId,
  { label: string; next: string; skipHint: string }
> = {
  use: {
    label: '使用与理解',
    next: '先完成入门：three-parts → first-task → l0-verify。暂不要求写服务。',
    skipHint: '有编程基础可跳过 python-prep，但不要跳过评测与安全。',
  },
  code: {
    label: '先补编程',
    next: '先做 python-prep 与 math-ml-min，再回 first-model-call。',
    skipHint: '若已会 Python/HTTP/JSON，可把编程补课压成自测清单。',
  },
  app: {
    label: '应用开发主线',
    next: '入门后走 first-model-call → 基础机制 → rag-layers；目标是 RAG/Agent 交付。',
    skipHint: '不要把“会调框架”当成懂训练；算法岗另看进阶支线。',
  },
  algo: {
    label: '算法与训练进阶',
    next: '在应用主线之外加 math-ml-min、model-mechanics，再按文档 A01 起做实验。',
    skipHint: '做过一个 RAG 不等于覆盖算法岗；需要推导与可复现实验。',
  },
}

export const AI_DIAGNOSTIC: AiDiagQuestion[] = [
  {
    id: 'q1',
    prompt: '你现在最想立刻做到哪一件？',
    choices: [
      { id: 'a', text: '更会提问、核验回答、保护敏感材料', scores: { use: 2 } },
      { id: 'b', text: '写出能调模型、检索、部署的小服务', scores: { app: 2, code: 1 } },
      { id: 'c', text: '搞懂训练/微调/推理优化，面向算法岗', scores: { algo: 2, code: 1 } },
      { id: 'd', text: '还不确定，先建立地图', scores: { use: 1, app: 1 } },
    ],
  },
  {
    id: 'q2',
    prompt: 'Python 读写 JSON、发 HTTP、看报错栈，你现在怎样？',
    choices: [
      { id: 'a', text: '几乎没写过', scores: { use: 1, code: 2 } },
      { id: 'b', text: '能写脚本，HTTP/异常还不熟', scores: { code: 2, app: 1 } },
      { id: 'c', text: '能独立写小服务与测试', scores: { app: 2 } },
      { id: 'd', text: '还能写训练循环/张量代码', scores: { algo: 2, app: 1 } },
    ],
  },
  {
    id: 'q3',
    prompt: '向量、矩阵 shape、softmax、交叉熵，你能否手算一个三分类小例子？',
    choices: [
      { id: 'a', text: '完全陌生', scores: { use: 1, code: 1 } },
      { id: 'b', text: '听过名词，算不出来', scores: { code: 1, app: 1 } },
      { id: 'c', text: '能手算或用纸笔推一遍', scores: { app: 1, algo: 1 } },
      { id: 'd', text: '能联系过拟合/指标取舍', scores: { algo: 2 } },
    ],
  },
  {
    id: 'q4',
    prompt: '下面哪类任务你认为通常不需要上大模型？',
    choices: [
      {
        id: 'a',
        text: '把表格两列数字按规则求和并入库',
        scores: { use: 1, app: 1 },
      },
      {
        id: 'b',
        text: '根据模糊需求起草一封邮件',
        scores: { use: 1 },
      },
      {
        id: 'c',
        text: '从制度里找“报销要不要发票”并引用',
        scores: { app: 1 },
      },
      {
        id: 'd',
        text: '我分不清，觉得都能用聊天解决',
        scores: { use: 2, code: 1 },
      },
    ],
  },
  {
    id: 'q5',
    prompt: '分类器、关键词搜索、生成式回答，你怎么选？',
    choices: [
      { id: 'a', text: '标签固定用分类器；精确编号用搜索；要组织语言再生成', scores: { app: 2, algo: 1 } },
      { id: 'b', text: '一律生成最省事', scores: { use: 2 } },
      { id: 'c', text: '只会搜索，不会生成', scores: { use: 1, code: 1 } },
      { id: 'd', text: '只有微调一条路', scores: { algo: 1, code: 1 } },
    ],
  },
  {
    id: 'q6',
    prompt: '你有没有配置过 API 密钥并真正打通过一次模型接口？',
    choices: [
      { id: 'a', text: '没有，也不想先碰密钥', scores: { use: 2 } },
      { id: 'b', text: '没有，但愿意按说明自配', scores: { app: 1, code: 1 } },
      { id: 'c', text: '打通过，会看超时/429', scores: { app: 2 } },
      { id: 'd', text: '还能区分 fake/real provider', scores: { app: 2, algo: 1 } },
    ],
  },
  {
    id: 'q7',
    prompt: '“引用了原句”和“答案正确”你是否当成一回事？',
    choices: [
      { id: 'a', text: '以前当成一回事', scores: { use: 2, app: 1 } },
      { id: 'b', text: '知道可能断章取义，但不会出题验证', scores: { app: 1 } },
      { id: 'c', text: '会分开评引用与结论，并做冲突题', scores: { app: 2 } },
      { id: 'd', text: '还会看数据泄漏与指标', scores: { algo: 1, app: 1 } },
    ],
  },
  {
    id: 'q8',
    prompt: '你的时间预算更接近？',
    choices: [
      { id: 'a', text: '每周几小时，先会用', scores: { use: 2 } },
      { id: 'b', text: '能投入做一两个小项目', scores: { app: 2, code: 1 } },
      { id: 'c', text: '准备系统学数学与训练', scores: { algo: 2, code: 1 } },
      { id: 'd', text: '已有 Java/前端，只差 AI 这一截', scores: { app: 2 } },
    ],
  },
  {
    id: 'q9',
    prompt: '岗位目标？',
    choices: [
      { id: 'a', text: '非研发，但要可靠使用 AI', scores: { use: 2 } },
      { id: 'b', text: '应用/后端，做 RAG/Agent', scores: { app: 2, code: 1 } },
      { id: 'c', text: '算法/模型相关', scores: { algo: 2 } },
      { id: 'd', text: '还在探索', scores: { use: 1, app: 1 } },
    ],
  },
  {
    id: 'q10',
    prompt: '遇到模型答错时，你第一反应更像？',
    choices: [
      { id: 'a', text: '换个提示再问', scores: { use: 2 } },
      { id: 'b', text: '先看材料有没有、程序有没有截断', scores: { app: 2 } },
      { id: 'c', text: '先怀疑训练数据或损失', scores: { algo: 2 } },
      { id: 'd', text: '不知道从哪查', scores: { use: 1, code: 1 } },
    ],
  },
]

export function scoreDiagnostic(answers: Record<string, string>) {
  const totals: Record<AiPathId, number> = { use: 0, code: 0, app: 0, algo: 0 }
  for (const question of AI_DIAGNOSTIC) {
    const choiceId = answers[question.id]
    const choice = question.choices.find((item) => item.id === choiceId)
    if (!choice) continue
    for (const [path, value] of Object.entries(choice.scores) as [AiPathId, number][]) {
      totals[path] += value
    }
  }
  const ranked = (Object.keys(totals) as AiPathId[]).sort((a, b) => totals[b] - totals[a])
  return { totals, primary: ranked[0], secondary: ranked[1] }
}
