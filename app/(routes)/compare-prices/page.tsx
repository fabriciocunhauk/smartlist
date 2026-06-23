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
import {
  compareShoppingList,
  Product,
  ComparedItem,
} from "@/app/utils/compare";
import { getCachedProducts } from "@/app/utils/productsCache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

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
        const cached = getCachedProducts();
        if (cached) {
          setProducts(cached);
          setLoading(false);
          return;
        }
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
      const results = compareShoppingList(list, products);
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

  const saveTotal = (
    parseFloat(highestTotal) - parseFloat(lowestTotal)
  ).toFixed(2);

  return (
    <div
      className={classNames(
        "h-screen md:h-screen md:flex md:flex-col md:overflow-hidden pt-24 md:pt-20 relative",
        theme.secondary,
      )}
    >
      <Header />
      <Container
        classes={{
          container:
            "w-full pb-20 md:pb-6 md:flex-grow md:flex md:flex-col md:overflow-hidden md:max-w-4xl md:px-8",
        }}
      >
        <div className="flex flex-col gap-4 overflow-auto md:flex-grow md:overflow-y-auto">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <RenderProductCards
                showLowestPrice={showLowestPrice}
                comparedItems={comparedItems}
              />
            </>
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
