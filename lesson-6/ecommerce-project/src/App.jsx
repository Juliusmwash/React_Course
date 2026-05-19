import { Route, Routes, } from 'react-router'
import { HomePage } from './pages/HomePage'
import { Header } from './components/Header'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'

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
        element={
          <>
            <Header />
            <OrdersPage />
          </>
        }
      />
      <Route
        path="/tracking"
        element={
          <>
            <Header />
            <TrackingPage />
          </>
        }
      />
    </Routes>
  )
}

export default App
