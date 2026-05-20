import React from "react";
import SupermarketLogo from "./SupermarketLogo";
import { classNames } from "@/app/utils/appearance";

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

const ProductCard = ({
  item,
  showLowestPrice,
}: {
  item: ComparedItem;
  showLowestPrice: boolean;
}) => {
  if (!item) return null;

  const {
    shoppingListItem,
    cheapestProduct,
    expensiveProduct,
    hasDifference,
    savings,
    savingsPercent,
  } = item;

  const activeProduct = (showLowestPrice || !hasDifference) ? cheapestProduct : expensiveProduct;

  const formatTitle = (text: string) => {
    if (!text) return "";
    return text
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatProductName = (text: string) => {
    if (!text) return "";
    let formatted = text
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((word) => {
        if (word === "js" || word === "js'") return "Sainsbury's";
        if (word === "med") return "Medium";
        if (word === "bkg") return "Bag";
        if (word === "toms" || word === "tomatoes") return "Tomatoes";
        if (word === "stwb" || word === "strawb") return "Strawberry";
        if (word === "choc") return "Chocolate";
        if (word === "veg") return "Vegetables";
        if (word === "hzlnut") return "Hazelnut";
        if (word === "procecco") return "Prosecco";
        if (word === "blnc") return "Blanc";
        if (word === "dble") return "Double";
        if (word === "ft") return "Fairtrade";
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    formatted = formatted
      .replace(/\s+[xX](\d+)/g, " x$1")
      .replace(/\s+[xX]\s+(\d+)/g, " x$1")
      .replace(/\s+x\s*[a-zA-Z]/g, (m) => m.toLowerCase());

    return formatted;
  };

  const cardTitle = formatTitle(shoppingListItem);
  const matchedProductName = formatProductName(activeProduct.product_name);
  const activeSupermarket = activeProduct.supermarket_name;

  return (
    <div
      className={classNames(
        "flex items-center justify-between w-full rounded-2xl p-4 border transition-all duration-300 shadow-sm hover:shadow-md bg-white/95 hover:bg-white",
        hasDifference
          ? showLowestPrice
            ? "border-emerald-200 bg-gradient-to-r from-emerald-50/10 to-transparent animate-fade-in-left"
            : "border-rose-200 bg-gradient-to-r from-rose-50/10 to-transparent animate-fade-in-left"
          : "border-slate-100"
      )}
    >
      <div className="flex items-center gap-4 min-w-0 flex-grow">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1.5 border border-slate-100 shadow-sm shrink-0">
          <SupermarketLogo supermarketName={activeSupermarket || ""} />
        </div>
        
        <div className="flex flex-col min-w-0 pr-2">
          <h3 className="font-extrabold text-sm md:text-base text-slate-800 tracking-wide truncate">
            {cardTitle}
          </h3>
          <span className="text-[10px] font-medium text-slate-400 truncate mt-0.5">
            Matched: <strong className="font-semibold text-slate-600">{matchedProductName}</strong> at {activeSupermarket}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {hasDifference ? (
          showLowestPrice ? (
            <div className="flex items-center bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-sm shadow-emerald-500/10 uppercase tracking-wider select-none shrink-0">
              <span>Save £{savings}</span>
              <span className="bg-white/20 px-1 rounded ml-1 font-bold text-[8px]">
                {savingsPercent}%
              </span>
            </div>
          ) : (
            <div className="bg-rose-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-sm shadow-rose-500/10 uppercase tracking-wider select-none shrink-0">
              <span>Alternative</span>
            </div>
          )
        ) : (
          <span className="text-[8px] md:text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-widest select-none shrink-0">
            Flat Price
          </span>
        )}

        <span
          className={classNames(
            "text-base md:text-lg font-black tracking-tight",
            hasDifference
              ? showLowestPrice
                ? "text-emerald-600"
                : "text-rose-600"
              : "text-slate-700"
          )}
        >
          £{parseFloat(activeProduct.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
