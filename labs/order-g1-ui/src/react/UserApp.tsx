import { HashRouter, Link, Route, Routes } from 'react-router'
import { OrderForm, type PlaceOrder } from './OrderForm'
import { SentNote } from './SentNote'

export function UserApp({ place }: { place: PlaceOrder }) {
  return (
    <HashRouter>
      <nav>
        <Link to="/">表单</Link>
        <Link to="/sent/4">查看已提交</Link>
      </nav>
      <Routes>
        <Route path="/" element={<OrderForm place={place} />} />
        <Route path="/sent/:orderId" element={<SentNote />} />
      </Routes>
    </HashRouter>
  )
}
