import { useState, useRef } from 'react';
import axios from 'axios';
import { formatMoney } from '../../utils/money';

export function Product({ product, loadCart }) {
	const [quantity, setQuantity] = useState(1);
	const addedToCartRef = useRef();

	const addToCart = async () => {
		await axios.post('/api/cart-items', {
			productId: product.id,
			quantity
		});
		// console.log('Added to cart:', response.data);
		await loadCart();

		addedToCartRef.current.style.opacity = 1;
		setTimeout(() => {
			addedToCartRef.current.style.opacity = 0;
		}, 3000);
	};

	const selectQuantity = async (e) => {
		setQuantity(parseInt(e.target.value));
	};

	return (
		<div className="product-container">
			<div className="product-image-container">
				<img className="product-image" src={product.image} />
			</div>

			<div className="product-name limit-text-to-2-lines">
				{product.name}
			</div>

			<div className="product-rating-container">
				<img
					className="product-rating-stars"
					src={`images/ratings/rating-${product.rating.stars * 10}.png`}
				/>
				<div className="product-rating-count link-primary">
					{product.rating.count}
				</div>
			</div>

			<div className="product-price">
				{formatMoney(product.priceCents)}
				{/* ${(product.priceCents / 100).toFixed(2)} */}
			</div>

			<div className="product-quantity-container">
				<select
					value={quantity}
					onChange={selectQuantity}
				>
					{[...Array(10)].map((_, index) => (
						<option value={index + 1} key={index}>
							{index + 1}
						</option>
					))}
				</select>
			</div>

			<div className="product-spacer"></div>

			<div className="added-to-cart" ref={addedToCartRef}>
				<img src="images/icons/checkmark.png" />
				Added
			</div>

			<button
				className="add-to-cart-button button-primary"
				onClick={addToCart}>
				Add to Cart
			</button>
		</div>
	);
}