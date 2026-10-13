export function RouteSkeleton() {
  return (
    <div className="route-skeleton" role="status" aria-busy="true" aria-label="正在打开这一关">
      <span className="route-skeleton-kicker" />
      <span className="route-skeleton-title" />
      <span className="route-skeleton-line" />
      <span className="route-skeleton-line is-short" />
    </div>
  )
}
