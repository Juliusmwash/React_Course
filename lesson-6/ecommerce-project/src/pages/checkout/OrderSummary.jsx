import dayjs from 'dayjs';
import { DeliveryOptions } from './DeliveryOptions';
import { formatMoney } from '../../utils/money';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
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

                {/* Delivery options component goes here */}
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  loadCart={loadCart}
                />

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
