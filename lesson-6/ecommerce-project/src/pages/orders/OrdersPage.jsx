import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { Helmet } from "react-helmet-async";
import { OrdersPageTemplate } from './OrdersPageTemplate';
import './OrdersPage.css';

export function OrdersPage() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders</title>
        <link
          rel="icon"
          type="image/png"
          href="images/favicon/orders-favicon.png"
        />
      </Helmet>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        {orders && <OrdersPageTemplate orders={orders} />}
      </div>
    </>
  )
}