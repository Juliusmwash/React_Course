import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import './CheckoutPage.css'
import { CheckoutHeader } from './CheckoutHeader'
import { Helmet } from "react-helmet-async";
import { formatMoney } from '../../utils/money';

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOptions(response.data);
        // console.log('Delivery options:');
        // console.log(response.data);
      });

    axios.get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data);
        // console.log('Payment summary:');
        // console.log(response.data);
      });
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
          <div className="order-summary">
            {cart.map((cartItem) => {
              return (
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    {(() => {
                      const option = deliveryOptions.find(
                        option => option.id === cartItem.deliveryOptionId
                      );

                      return option
                        ? `Delivery date: ${dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}`
                        : 'Choose a delivery option';
                    })()}
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={cartItem.product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((option) => {
                        return (
                          <div key={option.id} className="delivery-option">
                            <input type="radio" checked={option.id === cartItem.deliveryOptionId}
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`} />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                              </div>
                              <div className="delivery-option-price">
                                {option.priceCents === 0 ? 'FREE Shipping' : `${formatMoney(option.priceCents)} - Shipping`}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}