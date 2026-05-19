import { Route, Routes, } from 'react-router'
import { HomePage } from './assets/pages/HomePage'
import { Header } from './assets/pages/Header'
import { CheckoutPage } from './assets/pages/CheckoutPage'
import { OrdersPage } from './assets/pages/OrdersPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route
        index // path="/" is the same as index
        element={
          <>
            <Header />
            <HomePage />
          </>
        }
      />
      <Route
        path="checkout"
        element={<CheckoutPage />}
      />
       <Route
        path="/orders"
        element={<OrdersPage />}
      />
    </Routes>
  )
}

export default App
