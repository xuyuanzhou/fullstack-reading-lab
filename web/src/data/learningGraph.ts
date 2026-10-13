export type Requirement = 'required' | 'supplement'

export type LessonNode = {
  id: string
  requirement?: Requirement
  alternativeGroup?: string
}

export type SkillNode = {
  id: string
  allOf?: readonly string[]
  anyOf?: readonly string[]
}

export type GraphIssue =
  | { kind: 'empty-group'; group: string }
  | { kind: 'duplicate-id'; id: string }
  | { kind: 'dangling'; id: string; missing: string }
  | { kind: 'cycle'; path: string[] }

export function isSupplementNode(lesson: LessonNode) {
  return lesson.requirement === 'supplement'
}

export type PathSlotLesson = LessonNode & { note?: string }

export function pathSlots(lessons: readonly PathSlotLesson[], requiredOnly = false): string[][] {
  const source = requiredOnly
    ? lessons.filter((lesson) => lesson.requirement !== 'supplement' && !lesson.note?.includes('补读'))
    : lessons
  const slots: string[][] = []
  let group: string[] = []
  let groupName = ''
  const flush = () => {
    if (!group.length) return
    slots.push(group)
    group = []
    groupName = ''
  }
  for (const lesson of source) {
    const alternative = lesson.alternativeGroup || (lesson.note?.includes('二选一') ? 'either' : '')
    if (alternative) {
      if (groupName && groupName !== alternative) flush()
      groupName = alternative
      group.push(lesson.id)
      continue
    }
    flush()
    slots.push([lesson.id])
  }
  flush()
  return slots
}

/** Required slots. A shared alternativeGroup is one slot. Supplements are omitted. */
export function requiredSlots(lessons: readonly LessonNode[]): string[][] {
  const slots: string[][] = []
  let groupId = ''
  let group: string[] = []
  const flush = () => {
    if (!group.length) return
    slots.push(group)
    group = []
    groupId = ''
  }
  for (const lesson of lessons) {
    if (isSupplementNode(lesson)) {
      flush()
      continue
    }
    if (lesson.alternativeGroup) {
      if (groupId && groupId !== lesson.alternativeGroup) flush()
      groupId = lesson.alternativeGroup
      group.push(lesson.id)
      continue
    }
    flush()
    slots.push([lesson.id])
  }
  flush()
  return slots
}

export function supplementIds(lessons: readonly LessonNode[]) {
  return lessons.filter(isSupplementNode).map((lesson) => lesson.id)
}

export function requiredMet(lessons: readonly LessonNode[], done: ReadonlySet<string>) {
  return requiredSlots(lessons).every((slot) => slot.some((id) => done.has(id)))
}

export function validateLessons(lessons: readonly LessonNode[], knownIds?: ReadonlySet<string>): GraphIssue[] {
  const issues: GraphIssue[] = []
  const seen = new Set<string>()
  const groups = new Map<string, number>()
  for (const lesson of lessons) {
    if (seen.has(lesson.id)) issues.push({ kind: 'duplicate-id', id: lesson.id })
    seen.add(lesson.id)
    if (lesson.alternativeGroup === '') issues.push({ kind: 'empty-group', group: lesson.id })
    else if (lesson.alternativeGroup) groups.set(lesson.alternativeGroup, (groups.get(lesson.alternativeGroup) ?? 0) + 1)
    if (knownIds && !knownIds.has(lesson.id)) issues.push({ kind: 'dangling', id: lesson.id, missing: lesson.id })
  }
  for (const [group, count] of groups) {
    if (count < 1) issues.push({ kind: 'empty-group', group })
  }
  return issues
}

export function validateSkills(skills: readonly SkillNode[]): GraphIssue[] {
  const issues: GraphIssue[] = []
  const ids = new Set(skills.map((skill) => skill.id))
  const seen = new Set<string>()
  for (const skill of skills) {
    if (seen.has(skill.id)) issues.push({ kind: 'duplicate-id', id: skill.id })
    seen.add(skill.id)
    if ((skill.anyOf?.length ?? 0) === 0 && skill.anyOf) issues.push({ kind: 'empty-group', group: skill.id })
    for (const dep of [...(skill.allOf ?? []), ...(skill.anyOf ?? [])]) {
      if (!ids.has(dep)) issues.push({ kind: 'dangling', id: skill.id, missing: dep })
    }
  }
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const byId = new Map(skills.map((skill) => [skill.id, skill]))
  const walk = (id: string, path: string[]) => {
    if (visiting.has(id)) {
      issues.push({ kind: 'cycle', path: [...path, id] })
      return
    }
    if (visited.has(id)) return
    visiting.add(id)
    const skill = byId.get(id)
    for (const dep of [...(skill?.allOf ?? []), ...(skill?.anyOf ?? [])]) walk(dep, [...path, id])
    visiting.delete(id)
    visited.add(id)
  }
  for (const skill of skills) walk(skill.id, [])
  return issues
}

export function skillSatisfied(skill: SkillNode, passed: ReadonlySet<string>, skills: readonly SkillNode[]): boolean {
  const byId = new Map(skills.map((item) => [item.id, item]))
  const seen = new Set<string>()
  const ok = (id: string): boolean => {
    if (passed.has(id)) return true
    if (seen.has(id)) return false
    seen.add(id)
    const node = byId.get(id)
    if (!node) return false
    const all = (node.allOf ?? []).every(ok)
    const any = !node.anyOf || node.anyOf.some(ok)
    return all && any && ((node.allOf?.length ?? 0) > 0 || (node.anyOf?.length ?? 0) > 0 || passed.has(id))
  }
  return ok(skill.id)
}
