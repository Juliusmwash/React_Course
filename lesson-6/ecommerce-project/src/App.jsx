import { useEffect, useState } from 'react';
import { Route, Routes, } from 'react-router'
import axios from 'axios';
import { HomePage } from './pages/homepage/HomePage'
import { Header } from './components/Header'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/tracking/TrackingPage'

function App() {
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //     axios.get('/api/cart-items?expand=product')
  //       .then((response) => {
  //         console.log('Cart items fetched successfully:');
  //         console.log(response.data);
  //         setCart(response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching cart items:', error);
  //       });
  // }, []);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.get('/api/cart-items?expand=product');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    
    getCartItems();
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
