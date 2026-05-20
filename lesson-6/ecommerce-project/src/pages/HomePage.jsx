import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import axios from 'axios';

import './HomePage.css';

export function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Ecommerce</title>
        <link
          rel="icon"
          type="image/png"
          href="images/favicon/home-favicon.png"
        />
      </Helmet>

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-container" key={product.id}>
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
                ${(product.priceCents / 100).toFixed(2)}
              </div>

              <div className="product-quantity-container">
                <select>
                  {[...Array(10)].map((_, index) => (
                    <option value={index + 1} key={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="product-spacer"></div>

              <div className="added-to-cart">
                <img src="images/icons/checkmark.png" />
                Added
              </div>

              <button className="add-to-cart-button button-primary">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}