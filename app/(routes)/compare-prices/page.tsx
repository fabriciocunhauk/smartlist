"use client";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Spinner from "@/app/components/Spinner";
import { classNames } from "@/app/utils/appearance";
import { useTheme } from "@/app/context/ThemeContext";
import { getDataFromIndexedDb } from "@/app/utils/getDataFromIndexedDb";
import { useToastMessage } from "@/app/context/ToastMessageContext";
import PriceComparisonFooter from "@/app/components/compare-prices/PriceComparisonFooter";
import RenderProductCards from "@/app/components/compare-prices/RenderProductCards";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

const Compare = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [list, setList] = useState<{ name: string; status: boolean }[]>([]);
  const [comparedItems, setComparedItems] = useState<ComparedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLowestPrice, setShowLowestPrice] = useState(true);
  const { theme } = useTheme();
  const { setToastContent } = useToastMessage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (BASE_URL) {
          const response = await fetch(`${BASE_URL}/api/price-list`);
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
          const fetchedProducts: Product[] = await response.json();
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setToastContent({
          active: true,
          color: "error",
          message: "Error fetching products, please try again later!",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [setToastContent]);

  useEffect(() => {
    const getListFromIndexDb = async () => {
      const dbName = "list_db";
      const storeName = "list_store";
      const storedList = await getDataFromIndexedDb(dbName, storeName);
      if (storedList) setList(storedList);
    };

    getListFromIndexDb();
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0 && list.length > 0) {
      const results: ComparedItem[] = list
        .map((item) => {
          const keyword = item.name.toLowerCase().trim();
          if (!keyword) return null;

          // Find all products matching this keyword using strict word-boundary matching.
          // This prevents partial matches like "milk" matching "milkybar" or "milkshake",
          // while supporting common singular/plural matching.
          const matches = products
            .map((product) => ({
              ...product,
              cleaned_name: product.product_name
                .replace(/£\d+\.\d+[a-zA-Z]?/g, "")
                .trim()
                .toLowerCase(),
            }))
            .filter((product) => {
              const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              
              // 1. Try matching with optional plural suffix (s or es) at word boundary
              const regexKeywordPlural = new RegExp(`\\b${escapedKeyword}(?:es|s)?\\b`, "i");
              if (regexKeywordPlural.test(product.cleaned_name)) return true;

              // 2. If search keyword is plural (ends in s/es), try matching the singular form
              if (keyword.endsWith("s")) {
                let singularKeyword = keyword;
                if (keyword.endsWith("es")) {
                  singularKeyword = keyword.slice(0, -2);
                } else {
                  singularKeyword = keyword.slice(0, -1);
                }
                const escapedSingular = singularKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const regexSingular = new RegExp(`\\b${escapedSingular}\\b`, "i");
                if (regexSingular.test(product.cleaned_name)) return true;
              }

              return false;
            });

          if (matches.length === 0) return null;

          // Find cheapest matching product
          const cheapestProduct = matches.reduce((min, current) =>
            parseFloat(current.price) < parseFloat(min.price) ? current : min
          , matches[0]);

          // Find most expensive matching product
          const expensiveProduct = matches.reduce((max, current) =>
            parseFloat(current.price) > parseFloat(max.price) ? current : max
          , matches[0]);

          const cheapestPrice = parseFloat(cheapestProduct.price);
          const expensivePrice = parseFloat(expensiveProduct.price);
          const hasDifference = expensivePrice > cheapestPrice;
          const savings = (expensivePrice - cheapestPrice).toFixed(2);
          const savingsPercent =
            expensivePrice > 0
              ? Math.round(((expensivePrice - cheapestPrice) / expensivePrice) * 100)
              : 0;

          return {
            shoppingListItem: item.name,
            cheapestProduct,
            expensiveProduct,
            hasDifference,
            savings,
            savingsPercent,
          };
        })
        .filter(Boolean) as ComparedItem[];

      setComparedItems(results);
    } else {
      setComparedItems([]);
    }
  }, [products, list, loading]);

  const lowestTotal = comparedItems
    .reduce((acc, item) => acc + parseFloat(item.cheapestProduct.price), 0)
    .toFixed(2);

  const highestTotal = comparedItems
    .reduce((acc, item) => acc + parseFloat(item.expensiveProduct.price), 0)
    .toFixed(2);

  const saveTotal = (parseFloat(highestTotal) - parseFloat(lowestTotal)).toFixed(2);

  return (
    <div className={classNames("h-full relative pb-52 pt-24", theme.secondary)}>
      <Header />
      <Container>
        <div className="flex flex-col gap-4 overflow-auto">
          {loading ? (
            <Spinner />
          ) : (
            <RenderProductCards
              showLowestPrice={showLowestPrice}
              comparedItems={comparedItems}
            />
          )}
        </div>
      </Container>
      <Navbar />
      <PriceComparisonFooter
        lowestTotal={lowestTotal}
        highestTotal={highestTotal}
        saveTotal={saveTotal}
        setShowLowestPrice={setShowLowestPrice}
        theme={theme}
      />
    </div>
  );
};

export default Compare;
