/** Short names for the in-lesson outline. Keep them to two characters when possible. */
export const LESSON_NAV = [
  ['points', '要点'],
  ['model', '说明'],
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

/** Sidebar and lists: keep the product or the first clause, drop the long contrast. */
export function shortTitle(title: string): string {
  const trimmed = title.replace(/[。！？]+$/u, '').trim()
  const dropped = trimmed.replace(/[，,](?:不是|不再|而不是|不等于|不要|并非|不由|不必|不能|不会).+$/u, '')
  const leadingLatin = dropped.match(/^([A-Za-z][A-Za-z0-9.+#]*(?:[ \-][A-Za-z][A-Za-z0-9.+#]*){0,3})/)
  if (leadingLatin && leadingLatin[1].length >= 5 && dropped.length > leadingLatin[1].length + 2) {
    return leadingLatin[1]
  }
  const clause = dropped.split(/[，,]/u)[0]?.trim() || dropped
  if (clause.length <= 14) return clause
  const innerLatin = clause.match(/[A-Za-z][A-Za-z0-9.+#]*(?:[ \-][A-Za-z][A-Za-z0-9.+#]*){0,2}/)
  if (innerLatin && innerLatin[0].length >= 5) return innerLatin[0]
  return clause.slice(0, 12)
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
