import { Spin } from 'antd'

/** 路由与课文正文未就绪时的占位：Ant Design 标准加载。 */
export function RouteSkeleton() {
  return (
    <div className="route-loading" role="status" aria-busy="true" aria-live="polite">
      <Spin tip="正在打开…" size="large" />
    </div>
  )
}
