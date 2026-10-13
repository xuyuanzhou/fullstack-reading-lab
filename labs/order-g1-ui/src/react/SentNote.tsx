import { useState } from 'react'
import { Link, useParams } from 'react-router'

export function SentNote() {
  const { orderId } = useParams()
  const [seen, setSeen] = useState(false)

  return (
    <section>
      <p>路由订单 {orderId}</p>
      <button type="button" onClick={() => setSeen(true)}>{seen ? '已看到' : '标成已看到'}</button>
      <Link to="/">返回表单</Link>
    </section>
  )
}
