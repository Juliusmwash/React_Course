import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import axios from 'axios';
import { Header } from '../../components/Header';
import { HomePageTemplate } from './HomePageTemplate';

import './HomePage.css';

export function HomePage() {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/products')
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching products:', error);
  //     });
  // }, []);

  useEffect(() => { 
    const getProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    getProducts();
  },[]);

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
        <HomePageTemplate products={products} />
      </div>
    </>
  );
}