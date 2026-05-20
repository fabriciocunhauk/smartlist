import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  supermarket_name: string;
  product_name: string;
  price: string;
}

interface ComparedItem {
  shoppingListItem: string;
  cheapestProduct: Product;
  expensiveProduct: Product;
  hasDifference: boolean;
  savings: string;
  savingsPercent: number;
}

const RenderProductCards = ({
  showLowestPrice,
  comparedItems,
}: {
  showLowestPrice: boolean;
  comparedItems: ComparedItem[];
}) => {
  return comparedItems.map((item, index) => (
    <ProductCard
      key={index}
      item={item}
      showLowestPrice={showLowestPrice}
    />
  ));
};

export default RenderProductCards;
