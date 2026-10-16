/** 总图进课文：剑客走向石门，举剑，门开。窄屏改成自下而上，避免横穿被裁掉。 */
export function ChallengeFx() {
  return (
    <div className="fx-duel">
      <div className="fx-duel-stage">
        <span className="fx-duel-road" />
        <div className="fx-duel-gate">
          <span className="fx-duel-glow" />
          <span className="fx-duel-opening">
            <span className="fx-duel-door is-left" />
            <span className="fx-duel-door is-right" />
          </span>
          <span className="fx-duel-post is-left" />
          <span className="fx-duel-post is-right" />
          <span className="fx-duel-lintel" />
          <span className="fx-duel-slash" />
        </div>
        <svg className="fx-duel-walker" viewBox="0 0 72 110" aria-hidden="true">
          <ellipse className="fx-duel-shadow" cx="34" cy="104" rx="22" ry="4" />
          <path className="fx-duel-cape" d="M30 40 C8 50 4 82 16 100 L32 72 Z" />
          <path className="fx-duel-leg is-back" d="M28 74 L14 102 L24 104 L36 76 Z" />
          <path className="fx-duel-leg is-front" d="M36 74 L50 102 L60 98 L44 72 Z" />
          <path className="fx-duel-cloak" d="M22 38 C20 74 28 86 38 86 C52 82 56 52 48 36 C40 26 28 28 22 38 Z" />
          <path className="fx-duel-hood" d="M26 42 L24 24 C30 12 50 12 52 26 L48 42 Z" />
          <path className="fx-duel-visor" d="M36 28 L48 26" />
          <path className="fx-duel-arm" d="M42 46 L56 40 L58 46 L44 52 Z" />
          <g className="fx-duel-sword">
            <path className="fx-duel-blade" d="M50 48 L62 40 L72 0 L58 10 Z" />
            <path className="fx-duel-edge" d="M63 34 L65 8" />
            <path className="fx-duel-guard" d="M46 46 L68 38" />
            <path className="fx-duel-grip" d="M52 48 L58 40" />
            <circle className="fx-duel-pommel" cx="50" cy="50" r="2.4" />
          </g>
        </svg>
      </div>
    </div>
  )
}

/** 总图打开课表：纸页在正文栏展开，不铺满屏幕。 */
export function RosterFx() {
  return (
    <div className="fx-roster">
      <span className="fx-roster-dim" />
      <div className="fx-roster-slot">
        <div className="fx-roster-sheet">
          <span className="fx-roster-roll" />
          <span className="fx-roster-kicker">课表</span>
          <span className="fx-roster-row" />
          <span className="fx-roster-row" />
          <span className="fx-roster-row" />
        </div>
      </div>
    </div>
  )
}
