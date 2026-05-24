import { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from "react-helmet-async";
import { CheckoutTemplate } from './CheckoutTemplate'
import { CheckoutHeader } from './CheckoutHeader'
import './CheckoutPage.css'

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    // axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    //   .then((response) => {
    //     setDeliveryOptions(response.data);
    //     // console.log('Delivery options:');
    //     // console.log(response.data);
    //   });

    const deliveryOptionsResponse = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }
    deliveryOptionsResponse();

    // axios.get('/api/payment-summary')
    //   .then((response) => {
    //     setPaymentSummary(response.data);
    //     // console.log('Payment summary:');
    //     // console.log(response.data);
    //   });

    const paymentSummaryResponse = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    }
    paymentSummaryResponse();
  }, []);

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
          <CheckoutTemplate
            cart={cart}
            deliveryOptions={deliveryOptions}
            paymentSummary={paymentSummary}
          />
        </div>
      </div>
    </>
  )
}