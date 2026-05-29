import { Cart } from './Cart';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        return (
          <Cart
            key={cartItem.productId}
            cartItem={cartItem}
            loadCart={loadCart}
            deliveryOptions={deliveryOptions}
          />
        );
      })}
    </div>
  );
}
