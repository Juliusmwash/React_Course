import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DeliveryOptions } from './DeliveryOptions';
import { formatMoney } from '../../utils/money';

export function Cart({ cartItem, loadCart, deliveryOptions }) {
	const [openMenuId, setOpenMenuId] = useState(null);
	const [quantity, setQuantity] = useState(cartItem.quantity);

	const deleteCartItem = async () => {
		await axios.delete(`/api/cart-items/${cartItem.productId}`);
		await loadCart();
	};

	const updateCartItemQuantity = async () => {
		await axios.put(`/api/cart-items/${cartItem.productId}`, {
			quantity
		});
		await loadCart();
		setOpenMenuId(null);
	};

	return (
		<div className="cart-item-container">
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
						<span
							onClick={() => setOpenMenuId(cartItem.productId)}
							className="update-quantity-link link-primary"
						>
							Update
						</span>
						<span
							className="delete-quantity-link link-primary"
							onClick={deleteCartItem}>
							Delete
						</span>
					</div>

					{openMenuId && (
						<div className="update-product-quantity">
							<button
								className="quantity-update-close-button"
								onClick={() => setOpenMenuId(null)}
							>
								x
							</button>
							<div className="quantity-update-box">
								<button
									className="add-subtract subtract-quantity"
									onClick={() => {
										setQuantity(prev => Math.max(1, prev - 1));
									}}
								>
									-
								</button>

								<div
									className="quantity-show"
								>
									{quantity}
								</div>

								<button
									className="add-subtract add-quantity"
									onClick={() => {
										setQuantity(prev => Math.min(50, prev + 1));
									}}
								>
									+
								</button>

								<button onClick={updateCartItemQuantity} className="update-quantity-button">OK</button>
							</div>
						</div>
					)}

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
}