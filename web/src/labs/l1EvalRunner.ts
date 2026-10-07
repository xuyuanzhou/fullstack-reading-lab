import { L1_EVAL, L1_LICENSE, type L1EvalItem } from '../data/l1Corpus.ts'
import { docsByIds, hybridSearch, keywordSearch, overlapSearch, type RankedHit } from './l1Retrieve.ts'

export type RetrieveMode = 'keyword' | 'overlap' | 'hybrid'

export type L1CaseResult = {
  id: string
  kind: string
  question: string
  hits: RankedHit[]
  recallAt5: number
  answer: string
  cites: string[]
  refusal: boolean
  answerOk: boolean
  notes: string[]
}

function recallAtK(relevant: string[], hits: RankedHit[], k: number) {
  if (!relevant.length) return hits.length === 0 ? 1 : 1
  const top = new Set(hits.slice(0, k).map((item) => item.id))
  const hit = relevant.filter((id) => top.has(id)).length
  return hit / relevant.length
}

/** 确定性 mock 生成：不调用模型；规则可测 */
export function mockAnswer(item: L1EvalItem, hits: RankedHit[]) {
  const notes: string[] = []
  const docs = docsByIds(hits.map((hit) => hit.id))
  const allowed = docs.filter((doc) => item.tenant === '*' || doc.tenant === '*' || doc.tenant === item.tenant)

  if (item.kind === 'inject') {
    return {
      answer: '拒绝执行：不可信文本不能提升权限或导出客户数据。',
      cites: [] as string[],
      refusal: true,
      notes: ['注入类题走程序拒答，不跟从文档内指令'],
    }
  }

  if (item.kind === 'acl' && item.mustRefuse) {
    return {
      answer: '当前租户无权查看该材料。',
      cites: [] as string[],
      refusal: true,
      notes: ['权限过滤后无可见文档'],
    }
  }

  if (item.mustRefuse || !item.relevant.length) {
    const leaked = allowed.some((doc) => /旧版|忽略以上规则/.test(`${doc.title}${doc.body}`) && item.kind === 'none')
    if (leaked) notes.push('召回含噪声，仍应拒答')
    return {
      answer: '材料中没有足够依据，无法回答。',
      cites: [] as string[],
      refusal: true,
      notes,
    }
  }

  // 冲突：优先非旧版
  const preferred = allowed
    .filter((doc) => item.relevant.includes(doc.id))
    .sort((a, b) => Number(/旧版/.test(b.title)) - Number(/旧版/.test(a.title)))

  if (!preferred.length) {
    return {
      answer: '材料中没有足够依据，无法回答。',
      cites: [] as string[],
      refusal: true,
      notes: ['相关文档未进入可见召回'],
    }
  }

  if (item.kind === 'conflict') {
    const current = preferred.find((doc) => !/旧版/.test(doc.title)) || preferred[0]
    const old = preferred.find((doc) => /旧版/.test(doc.title))
    const answer = old
      ? `按现行版本（${current.version}）：${current.body}（旧版 ${old.version} 已不再生效）`
      : current.body
    return {
      answer,
      cites: [current.id, ...(old ? [old.id] : [])],
      refusal: false,
      notes: ['冲突题标注版本'],
    }
  }

  const primary = preferred[0]
  return {
    answer: primary.body,
    cites: [primary.id],
    refusal: false,
    notes,
  }
}

function answerPasses(item: L1EvalItem, answer: string, refusal: boolean) {
  if (item.mustRefuse) return refusal === true
  if (refusal) return false
  for (const need of item.answerMustInclude || []) {
    if (!answer.includes(need)) return false
  }
  for (const ban of item.answerMustExclude || []) {
    if (answer.includes(ban)) return false
  }
  return true
}

export function retrieve(mode: RetrieveMode, question: string, tenant: string, k = 5) {
  if (mode === 'keyword') return keywordSearch(question, tenant, k)
  if (mode === 'overlap') return overlapSearch(question, tenant, k)
  return hybridSearch(question, tenant, k)
}

export function runL1Eval(mode: RetrieveMode = 'hybrid') {
  const cases: L1CaseResult[] = L1_EVAL.map((item) => {
    const hits = retrieve(mode, item.question, item.tenant, 5)
    // 权限：丢掉不可见租户（检索层已过滤；双重保险）
    const safeHits = hits.filter((hit) => {
      const doc = docsByIds([hit.id])[0]
      if (!doc) return false
      return doc.tenant === '*' || doc.tenant === item.tenant
    })
    const generated = mockAnswer(item, safeHits)
    const recall = recallAtK(item.relevant, safeHits, 5)
    const answerOk = answerPasses(item, generated.answer, generated.refusal)
    return {
      id: item.id,
      kind: item.kind,
      question: item.question,
      hits: safeHits,
      recallAt5: recall,
      answer: generated.answer,
      cites: generated.cites,
      refusal: generated.refusal,
      answerOk,
      notes: generated.notes,
    }
  })

  const meanRecall = cases.reduce((sum, item) => sum + item.recallAt5, 0) / cases.length
  const answerRate = cases.filter((item) => item.answerOk).length / cases.length
  const aclLeak = cases.filter((item) => item.kind === 'acl' && !item.answerOk).length
  const byKind = Object.fromEntries(
    [...new Set(cases.map((item) => item.kind))].map((kind) => {
      const subset = cases.filter((item) => item.kind === kind)
      return [
        kind,
        {
          n: subset.length,
          recall: subset.reduce((sum, item) => sum + item.recallAt5, 0) / subset.length,
          answerOk: subset.filter((item) => item.answerOk).length / subset.length,
        },
      ]
    }),
  )

  return {
    license: L1_LICENSE,
    mode,
    generator: 'mock-rules',
    verifiedAt: '2026-10-07',
    unverifiedLiveModel: true,
    meanRecallAt5: meanRecall,
    answerOkRate: answerRate,
    aclFailures: aclLeak,
    byKind,
    cases,
  }
}

export function compareRetrieveModes() {
  return (['keyword', 'overlap', 'hybrid'] as const).map((mode) => {
    const report = runL1Eval(mode)
    return {
      mode,
      meanRecallAt5: report.meanRecallAt5,
      answerOkRate: report.answerOkRate,
      aclFailures: report.aclFailures,
    }
  })
}
