import type { SkillNode } from './learningGraph'

/** React and Vue are separate. One frontend group does not satisfy both. */
export const LEARNING_SKILLS: readonly SkillNode[] = [
  { id: 'R01' },
  { id: 'V01' },
  { id: 'J02' },
  { id: 'D01' },
  { id: 'S01' },
  { id: 'dual-framework', allOf: ['R01', 'V01'] },
]

export const SKILL_LESSONS: Record<string, readonly string[]> = {
  R01: ['react-router-loader', 'closure'],
  V01: ['vue-reactivity', 'vue-composition-options'],
  J02: ['java-happens-before', 'java-executor'],
  D01: ['mysql-acid-c-is-consistency', 'mysql-isolation-levels', 'mysql-mvcc'],
  S01: ['object-level-authz', 'password-adaptive-hash', 'xss', 'csrf-boundary'],
}
