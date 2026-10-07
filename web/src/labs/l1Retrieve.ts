import { L1_DOCS, type L1Doc } from '../data/l1Corpus.ts'

/** 极简分词：英文词 + 中文双字 + 原始串中的编号 */
export function tokenize(text: string): string[] {
  const lower = text.toLocaleLowerCase()
  const words = lower.match(/[a-z0-9][a-z0-9._-]*/g) || []
  const hans = lower.replace(/[^\u4e00-\u9fff]/g, '')
  const grams: string[] = []
  for (let i = 0; i < hans.length; i += 1) {
    grams.push(hans[i])
    if (i + 1 < hans.length) grams.push(hans.slice(i, i + 2))
  }
  return [...words, ...grams]
}

function visibleDocs(tenant: string): L1Doc[] {
  return L1_DOCS.filter((doc) => doc.tenant === '*' || doc.tenant === tenant)
}

export type RankedHit = { id: string; score: number; title: string }

/** 关键词基线（类 BM25 的 TF 打分，教学用） */
export function keywordSearch(question: string, tenant: string, k = 5): RankedHit[] {
  const q = tokenize(question)
  if (!q.length) return []
  const scored = visibleDocs(tenant).map((doc) => {
    const bag = tokenize(`${doc.title} ${doc.body} ${doc.tags.join(' ')}`)
    let score = 0
    for (const term of q) {
      const tf = bag.filter((item) => item === term).length
      if (tf) score += 1 + Math.log(1 + tf)
    }
    // 轻微偏好新版本号
    if (/旧版/.test(doc.title)) score *= 0.85
    return { id: doc.id, score, title: doc.title }
  })
  return scored.filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, k)
}

/**
 * 稠密检索的可复现替身：字符重叠率（不是真实向量）。
 * 用于对照“同义改写”，并标明 mode=mock-overlap。
 */
export function overlapSearch(question: string, tenant: string, k = 5): RankedHit[] {
  const q = new Set(tokenize(question))
  if (!q.size) return []
  const scored = visibleDocs(tenant).map((doc) => {
    const bag = tokenize(`${doc.title} ${doc.body}`)
    let hit = 0
    for (const term of bag) if (q.has(term)) hit += 1
    const score = hit / (q.size + 0.1)
    return { id: doc.id, score, title: doc.title }
  })
  return scored.filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, k)
}

/** Reciprocal Rank Fusion */
export function hybridSearch(question: string, tenant: string, k = 5): RankedHit[] {
  const a = keywordSearch(question, tenant, 20)
  const b = overlapSearch(question, tenant, 20)
  const scores = new Map<string, { score: number; title: string }>()
  const add = (list: RankedHit[], weight: number) => {
    list.forEach((item, index) => {
      const prior = scores.get(item.id) || { score: 0, title: item.title }
      prior.score += weight / (60 + index + 1)
      prior.title = item.title
      scores.set(item.id, prior)
    })
  }
  add(a, 1)
  add(b, 1)
  return [...scores.entries()]
    .map(([id, value]) => ({ id, score: value.score, title: value.title }))
    .sort((x, y) => y.score - x.score)
    .slice(0, k)
}

export function docsByIds(ids: string[]): L1Doc[] {
  const map = new Map(L1_DOCS.map((doc) => [doc.id, doc]))
  return ids.map((id) => map.get(id)).filter((item): item is L1Doc => !!item)
}
