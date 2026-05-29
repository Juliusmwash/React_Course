import { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from "react-helmet-async";
import { CheckoutHeader } from './CheckoutHeader'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import './CheckoutPage.css'

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const deliveryOptionsResponse = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }
    deliveryOptionsResponse();
  }, []);

  useEffect(() => {
    const paymentSummaryResponse = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    }
    paymentSummaryResponse();
  }, [cart]);

  return (
    <>
      <Helmet>
        <title>Checkout</title>
        <link
          rel="icon"
          type="image/png"
          href="images/favicon/cart-favicon.png"
        />
      </Helmet>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart} />
          <PaymentSummary
            paymentSummary={paymentSummary}
            loadCart={loadCart}
          />
        </div>
      </div>
    </>
  )
}