import axios from 'axios';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';    

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  return (
    deliveryOptions.map((option) => {
      const updateDeliveryOptions = async () => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
          deliveryOptionId: option.id
        });

        await loadCart();
      };

      return (
        <div
          key={option.id}
          className="delivery-option"
          onClick={updateDeliveryOptions}>
          <input
            type="radio"
            checked={option.id === cartItem.deliveryOptionId}
            onChange={() => {}} // Prevent React warning about controlled input without onChange handler
            className="delivery-option-input"
            name={`delivery-option-${cartItem.productId}`}
          />
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
    })
  );
}