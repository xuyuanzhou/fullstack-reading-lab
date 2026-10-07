/**
 * L0：无密钥校验包。预录输出标为样例，不是现场模型调用。
 */

export type L0Case = {
  id: string
  question: string
  /** 材料中应出现的依据子串；无答案题为空 */
  expectCite: string | null
  /** 是否应拒答 */
  mustRefuse: boolean
  /** 预录样例输出（非现场运行） */
  sampleOutput: {
    answer: string
    cite: string | null
    refusal: boolean
  }
  /** 故意错误的样例，用于练习找错 */
  badSample?: {
    answer: string
    cite: string | null
    refusal: boolean
    whyWrong: string
  }
}

export const L0_MATERIALS = [
  '报销须附发票原件或电子发票。',
  '正式员工年假为五天。',
  '会议室预约通过日历系统提交。',
] as const

export const L0_CASES: L0Case[] = [
  {
    id: 'has-answer',
    question: '报销要什么材料？',
    expectCite: '报销须附发票',
    mustRefuse: false,
    sampleOutput: {
      answer: '报销须附发票原件或电子发票。',
      cite: '报销须附发票原件或电子发票。',
      refusal: false,
    },
    badSample: {
      answer: '报销可以只交口头说明。',
      cite: '报销须附发票原件或电子发票。',
      refusal: false,
      whyWrong: '引用存在但结论与材料相反。',
    },
  },
  {
    id: 'format',
    question: '年假是几天？请只回答一个整数。',
    expectCite: '年假为五天',
    mustRefuse: false,
    sampleOutput: {
      answer: '5',
      cite: '正式员工年假为五天。',
      refusal: false,
    },
    badSample: {
      answer: '大概一周左右吧',
      cite: '正式员工年假为五天。',
      refusal: false,
      whyWrong: '格式不符合“只回答一个整数”。',
    },
  },
  {
    id: 'no-answer',
    question: '加班费怎么算？',
    expectCite: null,
    mustRefuse: true,
    sampleOutput: {
      answer: '材料中没有加班费规定。',
      cite: null,
      refusal: true,
    },
    badSample: {
      answer: '加班费按两倍工资发放。',
      cite: null,
      refusal: false,
      whyWrong: '材料没有依据却编造了条款。',
    },
  },
]

export type L0Check = { id: string; ok: boolean; detail: string }

/** 校验一条输出是否满足该题判分（用于对照样例/坏例） */
export function checkL0Output(
  item: L0Case,
  output: { answer: string; cite: string | null; refusal: boolean },
): L0Check[] {
  const checks: L0Check[] = []
  if (item.mustRefuse) {
    checks.push({
      id: 'refuse',
      ok: output.refusal === true,
      detail: output.refusal ? '已拒答' : '应拒答却给出了肯定回答',
    })
    checks.push({
      id: 'no-fabricate',
      ok: !/两倍|三倍|按.*发放/.test(output.answer),
      detail: '无答案题不应编造计薪规则',
    })
    return checks
  }
  checks.push({
    id: 'refuse',
    ok: output.refusal === false,
    detail: output.refusal ? '有答案题不应拒答' : '未错误拒答',
  })
  const citeOk = Boolean(output.cite && item.expectCite && output.cite.includes(item.expectCite))
  checks.push({
    id: 'cite',
    ok: citeOk,
    detail: citeOk ? '依据子串命中材料' : '缺少能支持结论的依据',
  })
  if (item.id === 'format') {
    const formatOk = /^\d+$/.test(output.answer.trim())
    checks.push({
      id: 'format',
      ok: formatOk,
      detail: formatOk ? '格式为整数' : '格式不是单独整数',
    })
  }
  if (item.id === 'has-answer') {
    const supported = Boolean(output.cite && output.answer.includes('发票'))
    checks.push({
      id: 'supported',
      ok: supported,
      detail: supported ? '结论被依据支持' : '结论可能与依据不一致',
    })
  }
  return checks
}

export function gradeL0Pack() {
  return L0_CASES.map((item) => ({
    id: item.id,
    sample: checkL0Output(item, item.sampleOutput),
    bad: item.badSample ? checkL0Output(item, item.badSample) : [],
    badWhy: item.badSample?.whyWrong,
  }))
}
