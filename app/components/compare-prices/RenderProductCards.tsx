import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  supermarket_name: string;
  product_name: string;
  price: string;
}

const RenderProductCards = ({
  showLowestPrice,
  lowestPriceProducts,
  highestPriceProducts,
  products,
}: {
  showLowestPrice: boolean;
  lowestPriceProducts: Product[];
  highestPriceProducts: Product[];
  products: Product[];
}) => {
  const productsToRender = showLowestPrice
    ? lowestPriceProducts
    : highestPriceProducts;

  const highestPrice = highestPriceProducts.filter((high) =>
    products.some(
      (product) =>
        product.product_name === high.product_name &&
        product.price !== high.price
    )
  );

  return productsToRender.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      highestPrice={highestPrice}
    />
  ));
};

export default RenderProductCards;
