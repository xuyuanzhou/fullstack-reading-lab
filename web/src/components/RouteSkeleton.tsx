/** 路由与课文正文未就绪时的占位。落在正文将出现的位置，不用转圈。 */
export function RouteSkeleton() {
  return (
    <div className="route-loading" role="status" aria-busy="true" aria-live="polite">
      <p className="route-loading-label">正在打开</p>
      <div className="route-opening" aria-hidden="true">
        <span className="route-opening-rule" />
        <span className="route-opening-line is-title" />
        <span className="route-opening-line" />
        <span className="route-opening-line is-short" />
      </div>
    </div>
  )
}
