/** Short names for the in-lesson outline. Prefer short labels; model uses 核心模型. */
export const LESSON_NAV = [
  ['points', '要点'],
  ['model', '核心模型'],
  ['mechanism', '细节'],
  ['why', '为什么'],
  ['example', '例子'],
  ['practice', '练习'],
  ['references', '依据'],
  ['notes', '笔记'],
] as const

export function lessonNav(hasDeep: boolean) {
  return LESSON_NAV.filter(([id]) => id !== 'mechanism' || hasDeep)
}

/** Sidebar labels: readable first clause, not a single jargon token. */
const MAX_SIDEBAR = 28

/** Soft-trim without cutting a Latin word in half. */
function softTrim(text: string, max = MAX_SIDEBAR): string {
  if (text.length <= max) return text
  const slice = text.slice(0, max)
  const brokenLatin = slice.match(/^(.*\s)([A-Za-z][A-Za-z0-9.+#]*)$/u)
  if (brokenLatin && brokenLatin[1].trim().length >= 6) {
    return `${brokenLatin[1].trimEnd()}…`
  }
  return `${slice.trimEnd()}…`
}

/**
 * Sidebar and lists: keep a readable first clause.
 * Multi-word product names (React Router) may stand alone when a Chinese
 * explanation follows a colon; bare tokens like Proxy keep their Chinese head.
 */
export function shortTitle(title: string): string {
  const trimmed = title.replace(/[。！？]+$/u, '').trim()
  const dropped = trimmed.replace(/[，,](?:不是|不再|而不是|不等于|不要|并非|不由|不必|不能|不会).+$/u, '')

  const productThenExplain = dropped.match(
    /^([A-Za-z][A-Za-z0-9.+#]*(?:[ \-][A-Za-z][A-Za-z0-9.+#]*){1,3})\s*[：:]/u,
  )
  if (productThenExplain) return productThenExplain[1]

  // First clause before Chinese/English colon or Chinese comma — keep 、 lists intact.
  const clause = dropped.split(/[：:，,]/u)[0]?.trim() || dropped
  return softTrim(clause)
}

/** Break a wall of text into short paragraphs a beginner can scan. */
export function splitProse(text: string): string[] {
  const blocks = text.split(/\n{2,}/u).map((part) => part.trim()).filter(Boolean)
  return blocks.flatMap((block) => {
    if (block.length <= 72) return [block]
    const sentences = block.split(/(?<=[。！？])/u).map((part) => part.trim()).filter(Boolean)
    const out: string[] = []
    let buf = ''
    for (const sentence of sentences) {
      const next = buf ? `${buf}${sentence}` : sentence
      if (buf && next.length > 80) {
        out.push(buf)
        buf = sentence
      } else {
        buf = next
      }
    }
    if (buf) out.push(buf)
    return out
  })
}

export type CoreFacet = { label: string; body: string }

export type StructuredCore = {
  lead: string
  facets: CoreFacet[]
  beats: string[]
}

/** Markers may sit mid-sentence (“因此顺序是…”, “使用顺序是…”). */
const FACET_MARKERS: { label: string; re: RegExp }[] = [
  { label: '信号', re: /(?:区分信号是|能分开的信号是)[：:]?\s*/u },
  { label: '边界', re: /边界是[：:]?\s*/u },
  { label: '顺序', re: /顺序是[：:]?\s*/u },
]

function sentencesOf(text: string): string[] {
  return text
    .split(/\n{2,}/u)
    .flatMap((block) => block.split(/(?<=[。！？])/u))
    .map((part) => part.trim())
    .filter(Boolean)
}

function asFacet(sentence: string): CoreFacet | null {
  for (const marker of FACET_MARKERS) {
    const match = marker.re.exec(sentence)
    if (!match) continue
    const body = sentence.slice(match.index + match[0].length).trim()
    if (!body) continue
    return { label: marker.label, body }
  }
  return null
}

/** Turn lesson.core into a lead sentence, labeled facets, and remaining beats. */
export function structureCore(core: string): StructuredCore {
  const sentences = sentencesOf(core)
  if (!sentences.length) return { lead: '', facets: [], beats: [] }

  const facets: CoreFacet[] = []
  const beats: string[] = []
  let lead = ''

  for (const sentence of sentences) {
    const facet = asFacet(sentence)
    if (facet) {
      facets.push(facet)
      continue
    }
    if (!lead) {
      lead = sentence
      continue
    }
    beats.push(sentence)
  }

  if (!lead && facets.length) {
    lead = facets[0].body
    facets.shift()
  }

  // Long first sentences often pack several clauses with ； — peel them into beats.
  if (lead.length > 100 && lead.includes('；')) {
    const parts = lead
      .replace(/[。！？]+$/u, '')
      .split('；')
      .map((part) => part.trim())
      .filter(Boolean)
    if (parts.length >= 2) {
      lead = `${parts[0]}。`
      const extras = parts.slice(1).map((part, index, all) =>
        /[。！？]$/u.test(part) ? part : `${part}${index === all.length - 1 ? '。' : '。'}`,
      )
      beats.unshift(...extras)
    }
  }

  return { lead, facets, beats }
}

export type ProseToken =
  | { type: 'text'; value: string }
  | { type: 'lesson'; id: string }

const LESSON_ID_RE = /[a-z][a-z0-9]*(?:-[a-z0-9]+)+/g

/**
 * Turn backtick lesson ids (and “见 id、id”) into tokens so the UI can show
 * human titles instead of author-facing ids.
 */
export function tokenizeLessonRefs(text: string, knownIds: ReadonlySet<string>): ProseToken[] {
  if (!text) return []
  const marks: { start: number; end: number; id: string }[] = []

  for (const match of text.matchAll(/`([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`/g)) {
    const id = match[1]
    if (!knownIds.has(id) || match.index === undefined) continue
    marks.push({ start: match.index, end: match.index + match[0].length, id })
  }

  for (const match of text.matchAll(/见\s*([a-z][a-z0-9]*(?:-[a-z0-9]+)+(?:\s*[、,]\s*[a-z][a-z0-9]*(?:-[a-z0-9]+)+)*)/g)) {
    if (match.index === undefined) continue
    const listStart = match.index + match[0].indexOf(match[1])
    for (const idMatch of match[1].matchAll(LESSON_ID_RE)) {
      const id = idMatch[0]
      if (!knownIds.has(id) || idMatch.index === undefined) continue
      const start = listStart + idMatch.index
      const end = start + id.length
      if (marks.some((m) => !(end <= m.start || start >= m.end))) continue
      marks.push({ start, end, id })
    }
  }

  marks.sort((a, b) => a.start - b.start || b.end - a.end)
  const filtered: typeof marks = []
  for (const mark of marks) {
    if (filtered.some((m) => !(mark.end <= m.start || mark.start >= m.end))) continue
    filtered.push(mark)
  }

  const tokens: ProseToken[] = []
  let cursor = 0
  for (const mark of filtered) {
    if (mark.start > cursor) tokens.push({ type: 'text', value: text.slice(cursor, mark.start) })
    tokens.push({ type: 'lesson', id: mark.id })
    cursor = mark.end
  }
  if (cursor < text.length) tokens.push({ type: 'text', value: text.slice(cursor) })
  return tokens.length ? tokens : [{ type: 'text', value: text }]
}
