import { useEffect, useState } from 'react';
import { Route, Routes, } from 'react-router'
import axios from 'axios';
import { HomePage } from './pages/HomePage'
import { Header } from './components/Header'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
      axios.get('/api/cart-items?expand=product')
        .then((response) => {
          console.log('Cart items fetched successfully:');
          console.log(response.data);
          setCart(response.data);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
  }, []);

  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route
        index // path="/" is the same as index
        element={
          <>
            <Header cart={cart} />
            <HomePage />
          </>
        }
      />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart}/>}
      />
       <Route
        path="/orders"
        element={
          <>
            <Header cart={cart} />
            <OrdersPage />
          </>
        }
      />
      <Route
        path="/tracking"
        element={
          <>
            <Header cart={cart} />
            <TrackingPage />
          </>
        }
      />
    </Routes>
  )
}

export default App
