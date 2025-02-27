import React from "react";
import Card from "../Card";
import SupermarketLogo from "./SupermarketLogo";
import ProductPrice from "./ProductPrice";

interface Product {
  id: number;
  supermarket_name: string;
  product_name: string;
  price: string;
}

const ProductCard = ({
  product,
  highestPrice,
}: {
  product: Product;
  highestPrice: Product[];
}) => (
  <Card>
    <SupermarketLogo supermarketName={product.supermarket_name} />
    <p className="font-semibold text-xs md:text-base uppercase">
      {product.product_name}
    </p>
    <ProductPrice
      price={product.price}
      isHighest={highestPrice.some((p) => p.id === product.id)}
    />
  </Card>
);

export default ProductCard;
