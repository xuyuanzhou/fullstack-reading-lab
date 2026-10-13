import type { ReactNode } from 'react'
import { ChevronDown, Lock, Map, Signpost, Star, Swords, type LucideIcon } from 'lucide-react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import type { QuestDef } from '@/data/questBoard'

const kindIcon: Record<'main' | QuestDef['kind'], LucideIcon> = {
  main: Map,
  sub: Map,
  side: Signpost,
  boss: Swords,
}

/** 关卡页才挂 Motion。系统要求减少动效时不挂，子组件改用静态标签。 */
export function QuestMotionRoot({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return children
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

export function QuestSurface({
  pulse,
  className,
  children,
}: {
  pulse?: boolean
  className: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  if (reduce || !pulse) return <article className={className}>{children}</article>
  return (
    <m.article
      className={className}
      initial={{ y: 8, opacity: 0.6 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
    >
      {children}
    </m.article>
  )
}

export function QuestMeter({ step, total }: { step: number; total: number }) {
  const reduce = useReducedMotion()
  const width = total === 0 ? 0 : Math.round((step / total) * 100)
  return (
    <div className="quest-meter" role="meter" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step} aria-label="进度">
      {reduce ? <span style={{ width: `${width}%` }} /> : (
        <m.span
          style={{ width: '100%', originX: 0 }}
          initial={false}
          animate={{ scaleX: width / 100 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}

export function QuestStars({ count }: { count: number }) {
  return (
    <span className="quest-stars" aria-label={`${count} 星`}>
      {[1, 2, 3].map((item) => (
        <Star
          key={item}
          size={14}
          strokeWidth={1.75}
          aria-hidden="true"
          className={item <= count ? 'is-on' : undefined}
          fill={item <= count ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  )
}

export function QuestKindIcon({ kind }: { kind: 'main' | QuestDef['kind'] }) {
  const Icon = kindIcon[kind]
  return <Icon size={15} strokeWidth={1.75} aria-hidden="true" className="quest-icon" />
}

export function QuestLockIcon() {
  return <Lock size={14} strokeWidth={1.75} aria-hidden="true" className="quest-icon" />
}

export function QuestChevron() {
  return <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" className="quest-chevron" />
}
