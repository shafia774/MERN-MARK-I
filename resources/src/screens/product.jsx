import React from 'react';
import { useParams } from 'react-router-dom';

const ProductScreen = () => {
  const { productId } = useParams();

  // Here you can fetch product data based on the productId or use it as needed

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
      {/* Add more elements to display product details */}
    </div>
  );
};

export default ProductScreen;
