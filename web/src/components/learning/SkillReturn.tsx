import { Link, useLocation } from 'react-router-dom'
import { SKILL_VIEWS, skillReturnId, skillReturnTo } from '@/data/learningSkills'

/** 只有从技能树点进来才出现。回到那一项所在的列，而不是章节目录。 */
export function SkillReturn() {
  const location = useLocation()
  const id = skillReturnId(location.state)
  const title = SKILL_VIEWS.find((item) => item.id === id)?.title
  if (!id || !title) return null
  return (
    <p className="skill-return">
      <Link to={skillReturnTo(id)}>回技能树 · {title}</Link>
    </p>
  )
}
